(ns re-frame.subs
 (:require
   [re-frame.db        :refer [app-db]]
   [re-frame.interop   :refer [add-on-dispose! debug-enabled? make-reaction ratom? deref? dispose! reagent-id]]
   [re-frame.loggers   :refer [console]]
   [re-frame.utils     :refer [first-in-vector]]
   [re-frame.registrar :refer [get-handler clear-handlers register-handler]]
   [re-frame.trace     :as trace :include-macros true]))

(def kind :sub)
(assert (re-frame.registrar/kinds kind))

;; -- cache -------------------------------------------------------------------
;;
;; De-duplicate subscriptions. If two or more equal subscriptions
;; are concurrently active, we want only one handler running.
;; Two subscriptions are "equal" if their query vectors test "=".
(def query->reaction (atom {}))

(defn clear-subscription-cache!
  "Causes all subscriptions to be removed from the cache.
  Does this by:
     1. running on-dispose on all cached subscriptions
     2. These on-dispose will then do the removal of themselves.

  This is a development time tool. Useful when reloading Figwheel code
  after a React exception, because React components won't have been
  cleaned up properly. And this, in turn, means the subscriptions within those
  components won't have been cleaned up correctly. So this forces the issue."
  []
  (doseq [[k rxn] @query->reaction]
    (dispose! rxn))
  (if (not-empty @query->reaction)
    (console :warn "Subscription cache should be empty after clearing it.")))

(defn clear-all-handlers!
  "Unregisters all existing subscription handlers"
  []
  (clear-handlers kind)
  (clear-subscription-cache!))

(defn cache-and-return
  "cache the reaction r"
  [query-v dynv r]
  (let [cache-key [query-v dynv]]
    ;; when this reaction is no longer being used, remove it from the cache
    (add-on-dispose! r #(do (swap! query->reaction dissoc cache-key)
                            (trace/with-trace {:operation (first-in-vector query-v)
                                               :op-type   :sub/dispose
                                               :tags      {:query-v  query-v
                                                           :reaction (reagent-id r)}}
                              nil)))
    ;; cache this reaction, so it can be used to deduplicate other, later "=" subscriptions
    (swap! query->reaction assoc cache-key r)
    (trace/merge-trace! {:tags {:reaction (reagent-id r)}})
    r)) ;; return the actual reaction

(defn cache-lookup
  ([query-v]
   (cache-lookup query-v []))
  ([query-v dyn-v]
   (get @query->reaction [query-v dyn-v])))


;; -- subscribe ---------------------------------------------------------------

(defn subscribe
  "Given a `query`, returns a Reagent `reaction` which, over
  time, reactively delivers a stream of values. So in FRP-ish terms,
  it returns a Signal.

  To obtain the returned Signal/Stream's current value, it must be `deref`ed.

  `query` is a vector of at least one element. The first element is the
  `query-id`, typically a namespaced keyword. The rest of the vector's
  elements are optional, additional values which parameterise the query
  performed.

  `dynv` is an optional 3rd argument, `which is a vector of further input
  signals (atoms, reactions, etc), NOT values. This argument exists for
  historical reasons and is borderline deprecated these days.

  Example Usage:
  --------------

    (subscribe [:items])
    (subscribe [:items \"blue\" :small])
    (subscribe [:items {:colour \"blue\"  :size :small}])

  Note: for any given call to `subscribe` there must have been a previous call
  to `reg-sub`, registering the query handler (function) for the `query-id` given.

  Hint
  ----

  When used in a view function BE SURE to `deref` the returned value.
  In fact, to avoid any mistakes, some prefer to define:

     (def <sub  (comp deref re-frame.core/subscribe))

  And then, within their views, they call  `(<sub [:items :small])` rather
  than using `subscribe` directly.

  De-duplication
  --------------

  XXX
  "

  ([query]
   (trace/with-trace {:operation (first-in-vector query)
                      :op-type   :sub/create
                      :tags      {:query-v query}}
     (if-let [cached (cache-lookup query)]
       (do
         (trace/merge-trace! {:tags {:cached?  true
                                     :reaction (reagent-id cached)}})
         cached)

       (let [query-id   (first-in-vector query)
             handler-fn (get-handler kind query-id)]
         (trace/merge-trace! {:tags {:cached? false}})
         (if (nil? handler-fn)
           (do (trace/merge-trace! {:error true})
               (console :error (str "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription.")))
           (cache-and-return query [] (handler-fn app-db query)))))))

  ([query dynv]
   (trace/with-trace {:operation (first-in-vector query)
                      :op-type   :sub/create
                      :tags      {:query-v query
                                  :dyn-v   dynv}}
     (if-let [cached (cache-lookup query dynv)]
       (do
         (trace/merge-trace! {:tags {:cached?  true
                                     :reaction (reagent-id cached)}})
         cached)
       (let [query-id   (first-in-vector query)
             handler-fn (get-handler kind query-id)]
         (trace/merge-trace! {:tags {:cached? false}})
         (when debug-enabled?
           (when-let [not-reactive (not-empty (remove ratom? dynv))]
             (console :warn "re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom:" not-reactive)))
         (if (nil? handler-fn)
           (do (trace/merge-trace! {:error true})
               (console :error (str "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription.")))
           (let [dyn-vals (make-reaction (fn [] (mapv deref dynv)))
                 sub      (make-reaction (fn [] (handler-fn app-db query @dyn-vals)))]
             ;; handler-fn returns a reaction which is then wrapped in the sub reaction
             ;; need to double deref it to get to the actual value.
             ;(console :log "Subscription created: " v dynv)
             (cache-and-return query dynv (make-reaction (fn [] @@sub))))))))))

;; -- reg-sub -----------------------------------------------------------------

(defn- map-vals
  "Returns a new version of 'm' in which 'f' has been applied to each value.
  (map-vals inc {:a 4, :b 2}) => {:a 5, :b 3}"
  [f m]
  (into (empty m)
        (map (fn [[k v]] [k (f v)]))
        m))


(defn- deref-input-signals
  [signals query-id]
  (let [signals (cond
                  (sequential? signals) (map deref signals)
                  (map? signals) (map-vals deref signals)
                  (deref? signals) @signals
                  :else (console :error "re-frame: in the reg-sub for " query-id ", the input-signals function returns: " signals))]
    (trace/merge-trace! {:tags {:input-signals (map reagent-id signals)}})
    signals))


(defn reg-sub
  "For a given `query-id`, register a `computation` function and input `signals`.

  At an abstract level, a call to this function allows you to register 'the mechanism'
  to later fulfil a call to `(subscribe [query-id ...])`.

  To say that another way, reg-sub allows you to create a template for a node
  in the signal graph. But note: reg-sub does not cause a node to be created.
  It simply allows you to register the template from which such a
  node could be created, if it were needed, sometime later, when the call
  to `subscribe` is made.

  reg-sub needs three things:
    - a `query-id`
    - the required inputs for this node
    - a computation function for this node

  The `query-id` is always the 1st argument to reg-sub and it is typically
  a namespaced keyword.

  A computation function is always the last argument and it has this general form:
    `(input-signals, query-vector) -> a-value`

  What goes in between the 1st and last args can vary, but whatever is there will
  define the input signals part of the template, and, as a result, it will control
  what values the computation functions gets as a first argument.

  There's 3 ways this function can be called - 3 ways to supply input signals:

  1. No input signals given:

     (reg-sub
       :query-id
       a-computation-fn)   ;; (fn [db v]  ... a-value)

     The node's input signal defaults to `app-db`, and the value within `app-db` is
     is given as the 1st argument to the computation function.

  2. A signal function is supplied:

     (reg-sub
       :query-id
       signal-fn     ;; <-- here
       computation-fn)

     When a node is created from the template, the `signal-fn` will be called and it
     is expected to return the input signal(s) as either a singleton, if there is only
     one, or a sequence if there are many, or a map with the signals as the values.

     The values from the nominated signals will be supplied as the 1st argument to the
     computation function - either a singleton, sequence or map of them, paralleling
     the structure returned by the signal function.

     Here, is an example signal-fn, which returns a vector of input signals.

       (fn [query-vec dynamic-vec]
         [(subscribe [:a-sub])
          (subscribe [:b-sub])])

     For that signal function, the computation function must be written
     to expect a vector of values for its first argument.
       (fn [[a b] _] ....)

     If the signal function was simpler and returned a singleton, like this:
        (fn [query-vec dynamic-vec]
          (subscribe [:a-sub]))

     then the computation function must be written to expect a single value
     as the 1st argument:

        (fn [a _] ...)

  3. Syntax Sugar

     (reg-sub
       :a-b-sub
       :<- [:a-sub]
       :<- [:b-sub]
       (fn [[a b] [_]] {:a a :b b}))

  This 3rd variation is syntactic sugar for the 2nd. Pairs are supplied instead
  of an `input signals` functions. Each pair starts with a `:<-` and a subscription
  vector follows.

  For further understanding, read `/docs`, and look at the detailed comments in
  /examples/todomvc/src/subs.cljs
  "
  [query-id & args]
  (let [computation-fn (last args)
        input-args     (butlast args) ;; may be empty, or one signal fn, or pairs of  :<- / vector
        err-header     (str "re-frame: reg-sub for " query-id ", ")
        inputs-fn      (case (count input-args)
                         ;; no `inputs` function provided - give the default
                         0 (fn
                             ([_] app-db)
                             ([_ _] app-db))

                         ;; a single `inputs` fn
                         1 (let [f (first input-args)]
                             (when-not (fn? f)
                               (console :error err-header "2nd argument expected to be an inputs function, got:" f))
                             f)

                         ;; one sugar pair
                         2 (let [[marker vec] input-args]
                             (when-not (= :<- marker)
                               (console :error err-header "expected :<-, got:" marker))
                             (fn inp-fn
                               ([_] (subscribe vec))
                               ([_ _] (subscribe vec))))

                         ;; multiple sugar pairs
                         (let [pairs   (partition 2 input-args)
                               markers (map first pairs)
                               vecs    (map last pairs)]
                           (when-not (and (every? #{:<-} markers) (every? vector? vecs))
                             (console :error err-header "expected pairs of :<- and vectors, got:" pairs))
                           (fn inp-fn
                             ([_] (map subscribe vecs))
                             ([_ _] (map subscribe vecs)))))]
    (register-handler
      kind
      query-id
      (fn subs-handler-fn
        ([db query-vec]
         (let [subscriptions (inputs-fn query-vec)
               reaction-id   (atom nil)
               reaction      (make-reaction
                               (fn [] (trace/with-trace {:operation (first-in-vector query-vec)
                                                         :op-type   :sub/run
                                                         :tags      {:query-v  query-vec
                                                                     :reaction @reaction-id}}
                                        (computation-fn (deref-input-signals subscriptions query-id) query-vec))))]
           (reset! reaction-id (reagent-id reaction))
           reaction))
        ([db query-vec dyn-vec]
         (let [subscriptions (inputs-fn query-vec dyn-vec)
               reaction-id   (atom nil)
               reaction      (make-reaction
                               (fn []
                                 (trace/with-trace {:operation (first-in-vector query-vec)
                                                    :op-type   :sub/run
                                                    :tags      {:query-v  query-vec
                                                                :dyn-v    dyn-vec
                                                                :reaction @reaction-id}}
                                   (computation-fn (deref-input-signals subscriptions query-id) query-vec dyn-vec))))]
           (reset! reaction-id (reagent-id reaction))
           reaction))))))
