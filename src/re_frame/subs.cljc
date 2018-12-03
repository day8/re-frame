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
     1. running `on-dispose` on all cached subscriptions
     2. Each `on-dispose` will perform the removal of themselves.

  This is for development time use. Useful when reloading Figwheel code
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
    (add-on-dispose! r #(trace/with-trace {:operation (first-in-vector query-v)
                                           :op-type   :sub/dispose
                                           :tags      {:query-v  query-v
                                                       :reaction (reagent-id r)}}
                                          (swap! query->reaction
                                                 (fn [query-cache]
                                                   (if (and (contains? query-cache cache-key) (identical? r (get query-cache cache-key)))
                                                     (dissoc query-cache cache-key)
                                                     query-cache)))))
    ;; cache this reaction, so it can be used to deduplicate other, later "=" subscriptions
    (swap! query->reaction (fn [query-cache]
                             (when debug-enabled?
                               (when (contains? query-cache cache-key)
                                 (console :warn "re-frame: Adding a new subscription to the cache while there is an existing subscription in the cache" cache-key)))
                             (assoc query-cache cache-key r)))
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
  it returns a `Signal`.

  To obtain the returned Signal/Stream's current value, it must be `deref`ed.

  `query` is a vector of at least one element. The first element is the
  `query-id`, typically a namespaced keyword. The rest of the vector's
  elements are optional, additional values which parameterise the query
  performed.

  `dynv` is an optional 3rd argument, which is a vector of further input
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
               (console :error (str "re-frame: no subscription handler registered for: " query-id ". Returning a nil subscription.")))
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
               (console :error (str "re-frame: no subscription handler registered for: " query-id ". Returning a nil subscription.")))
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

(defn map-signals
  "Runs f over signals. Signals may take several
  forms, this function handles all of them."
  [f signals]
  (cond
    (sequential? signals) (map f signals)
    (map? signals) (map-vals f signals)
    (deref? signals) (f signals)
    :else '()))

(defn to-seq
  "Coerces x to a seq if it isn't one already"
  [x]
  (if (sequential? x)
    x
    (list x)))

(defn- deref-input-signals
  [signals query-id]
  (let [dereffed-signals (map-signals deref signals)]
    (cond
      (sequential? signals) (map deref signals)
      (map? signals) (map-vals deref signals)
      (deref? signals) (deref signals)
      :else (console :error "re-frame: in the reg-sub for" query-id ", the input-signals function returns:" signals))
    (trace/merge-trace! {:tags {:input-signals (doall (to-seq (map-signals reagent-id signals)))}})
    dereffed-signals))


(defn reg-sub
  "For a given `query-id`, register two functions: a `computation` function and an `input signals` function.
  
  During program execution, a call to `subscribe`, such as `(subscribe [:sub-id 3 \"blue\"])`,
  will create a new `:sub-id` node in the Signal Graph. And, at that time, re-frame
  needs to know how to create the node.   By calling `reg-sub`, you are registering 
  'the template' or 'the mechanism' by which nodes in the Signal Graph can be created. 

  Repeating: calling `reg-sub` does not create a node. It only creates the template
  from which nodes can be created later. 
  
  `reg-sub` arguments are:  
    - a `query-id` (typically a namespaced keyword)
    - a function which returns the inputs required by this kind of node (can be supplied  in one of three ways) 
    - a function which computes the value of this kind of node 

  The `computation function` is always the last argument supplied and it is expected to have the signature: 
    `(input-values, query-vector) -> a-value`
  
  When `computation function` is called, the `query-vector` argument will be the vector supplied to the 
  the `subscribe` which caused the node to be created. So, if the call was `(subscribe [:sub-id 3 \"blue\"])`, 
  then the `query-vector` supplied to the computaton function will be `[:sub-id 3 \"blue\"]`.

  The arguments supplied between the `query-id` and the `computation-function` can vary in 3 ways, 
  but whatever is there defines the `input signals` part of the template, controlling what input 
 values \"flow into\" the `computation function` gets when it is called. 

  `reg-sub` can be called in one of three ways, because there are three ways to define the input signals part.
  But note, the 2nd method, in which a `signal-fn` is explicitly supplied, is the most canonical and instructive. The other 
  two are really just sugary variations. 

  1. No input signals given:
      ```clj
     (reg-sub
       :query-id
       a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```

     In the absence of an explicit `input-fn`, the node's input signal defaults to `app-db`
     and, as a result, the value within `app-db` (a map) is
     is given as the 1st argument when `a-computation-fn` is called.   
 

  2. A signal function is explicitly supplied:
     ```clj
     (reg-sub
       :query-id
       signal-fn     ;; <-- here
       computation-fn)
     ```
     
     This is the most canonical and instructive of the three variations.
     
     When a node is created from the template, the `signal-fn` will be called and it
     is expected to return the input signal(s) as either a singleton, if there is only
     one, or a sequence if there are many, or a map with the signals as the values.

     The values from returned nominated signals will be supplied as the 1st argument to  
     the `a-computation-fn` when it is called - and subject to what this `signal-fn` returns, 
     this value will be either a singleton, sequence or map of them (paralleling
     the structure returned by the `signal-fn`).

     This example `signal-fn` returns a vector of input signals.
       ```clj
       (fn [query-vec dynamic-vec]
         [(subscribe [:a-sub])
          (subscribe [:b-sub])])
       ```
     The associated computation function must be written
     to expect a vector of values for its first argument:
       ```clj
       (fn [[a b] query-vec]     ;; 1st argument is a seq of two values
         ....)
        ```

     If, on the other hand, the signal function was simpler and returned a singleton, like this:
        ```clj
        (fn [query-vec dynamic-vec]
          (subscribe [:a-sub]))
        ```
     then the associated computation function must be written to expect a single value
     as the 1st argument:
        ```clj
        (fn [a query-vec]       ;; 1st argument is a single value
          ...)
        ```
 
     Further Note: variation #1 above, in which an `input-fn` was not supplied, like this:
       ```clj
     (reg-sub
       :query-id
       a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```
     is the equivalent of using this
     2nd variation and explicitly suppling a `signal-fn` which returns `app-db`:
     ```clj
     (reg-sub
       :query-id
       (fn [_ _]  re-frame/app-db)   ;; <--- explicit input-fn 
       a-computation-fn)             ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```
 
  3. Syntax Sugar

     ```clj
     (reg-sub
       :a-b-sub
       :<- [:a-sub]
       :<- [:b-sub]
       (fn [[a b] query-vec]    ;; 1st argument is a seq of two values
         {:a a :b b}))
     ```

     This 3rd variation is just syntactic sugar for the 2nd.  Instead of providing an
     `signals-fn` you provide one or more pairs of `:<-` and a subscription vector.

     If you supply only one pair a singleton will be supplied to the computation function, 
     as if you had supplied a `signal-fn` returning only a single value:

     ```clj
     (reg-sub
       :a-sub
       :<- [:a-sub]
       (fn [a query-vec]      ;; only one pair, so 1st argument is a single value
         ...))
     ```

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
                               (fn []
                                 (trace/with-trace {:operation (first-in-vector query-vec)
                                                    :op-type   :sub/run
                                                    :tags      {:query-v    query-vec
                                                                :reaction   @reaction-id}}
                                                   (let [subscription (computation-fn (deref-input-signals subscriptions query-id) query-vec)]
                                                     (trace/merge-trace! {:tags {:value subscription}})
                                                     subscription))))]

           (reset! reaction-id (reagent-id reaction))
           reaction))
        ([db query-vec dyn-vec]
         (let [subscriptions (inputs-fn query-vec dyn-vec)
               reaction-id   (atom nil)
               reaction      (make-reaction
                               (fn []
                                 (trace/with-trace {:operation (first-in-vector query-vec)
                                                    :op-type   :sub/run
                                                    :tags      {:query-v   query-vec
                                                                :dyn-v     dyn-vec
                                                                :reaction  @reaction-id}}
                                                   (let [subscription (computation-fn (deref-input-signals subscriptions query-id) query-vec dyn-vec)]
                                                     (trace/merge-trace! {:tags {:value subscription}})
                                                     subscription))))]

           (reset! reaction-id (reagent-id reaction))
           reaction))))))
