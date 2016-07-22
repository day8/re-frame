(ns re-frame.subs
 (:require
   [re-frame.db    :refer [app-db]]
   [re-frame.interop :refer [add-on-dispose! debug-enabled? make-reaction ratom?]]
   [re-frame.loggers :refer [console]]
   [re-frame.utils :refer [first-in-vector]]))


;; -- Subscription Handler Lookup and Registration --------------------------------------------------

;; Maps from a query-id to a handler function.
(def ^:private qid->fn (atom {}))

(defn register
  "Registers a subscription handler function for an query id"
  [query-id handler-fn]
  (if (contains? @qid->fn query-id)
    (console :warn "re-frame: overwriting subscription handler for: " query-id))  ;; allow it, but warn. Happens on figwheel reloads.
  (swap! qid->fn assoc query-id handler-fn))


;; -- Subscription cache -----------------------------------------------------
;;
;; De-duplicate subscriptions. If two or more identical subscriptions
;; are concurrently active, we want only one handler running.
;; Two subscriptions are "identical" if their query vectors
;; test "=".
(def ^:private query->reaction (atom {}))

(defn clear-all-handlers!
  "Unregisters all existing subscription handlers"
  []
  (reset! qid->fn {})
  (reset! query->reaction {}))

(defn cache-and-return
  "cache the reaction r"
  [query-v dynv r]
  (let [cache-key [query-v dynv]]
    ;; when this reaction is nolonger being used, remove it from the cache
    (add-on-dispose! r #(do (swap! query->reaction dissoc cache-key)
                            (console :log "Removing subscription: " cache-key)))
    ;; cache this reaction, so it can be used to deduplicate other, identical subscriptions
    (swap! query->reaction assoc cache-key r)

    r))  ;; return the actual reaction

(defn cache-lookup
  ([query-v]
   (cache-lookup query-v []))
  ([query-v dyn-v]
   (get @query->reaction [query-v dyn-v])))


;; -- Subscription cache -----------------------------------------------------

(defn subscribe
  "Returns a Reagent/reaction which contains a computation"
  ([query-v]
   (if-let [cached (cache-lookup query-v)]
     (do (console :log "Using cached subscription: " query-v)
         cached)
     (let [query-id   (first-in-vector query-v)
           handler-fn (get @qid->fn query-id)]
       (console :log "Subscription created: " query-v)
       (if-not handler-fn
         (console :error "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription."))
       (cache-and-return query-v [] (handler-fn app-db query-v)))))

  ([v dynv]
   (if-let [cached (cache-lookup v dynv)]
     (do (console :log "Using cached subscription: " v " and " dynv)
         cached)
     (let [query-id   (first-in-vector v)
           handler-fn (get @qid->fn query-id)]
       (when debug-enabled?
         (when-let [not-reactive (not-empty (remove ratom? dynv))]
           (console :warn "re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom: " not-reactive)))
       (if (nil? handler-fn)
         (console :error "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription.")
         (let [dyn-vals (make-reaction (fn [] (mapv deref dynv)))
               sub (make-reaction (fn [] (handler-fn app-db v @dyn-vals)))]
           ;; handler-fn returns a reaction which is then wrapped in the sub reaction
           ;; need to double deref it to get to the actual value.
           (console :log "Subscription created: " v dynv)
           (cache-and-return v dynv (make-reaction (fn [] @@sub)))))))))

;; -- Helper code for register-pure -------------------

(defn- fmap
  "Returns a new version of 'm' in which f has been applied to each value.
  (fmap inc {:a 4, :b 2}) => {:a 5, :b 3}"
  [f m]
  (into {} (for [[k val] m] [k (f val)])))

(defn- multi-deref
  "derefs a map sequence or a singleton"
  [data]
  (cond
    (map? data)  (fmap deref data)
    (coll? data) (map deref data)
    :else @data))

(defn register-pure
  "This fn allows the user to write a 'pure' subscription
  i.e. that is a subscription that operates on the values within app-db
  rather than the atom itself
  Note there are 3 ways this function can be called

    ```(register-pure
         :test-sub
         (fn [db [_]] db))```
  In this example the entire app-db is derefed and passed to the subscription
  function as a singleton

      ```(subs/register-pure
           :a-b-sub
           (fn [q-vec d-vec]
               [(subs/subscribe [:a-sub])
                (subs/subscribe [:b-sub])]
           (fn [[a b] [_]] {:a a :b b}))```
  In this example the the first function is called with the query vector
  and the dynamic vector as arguements the return value of this function
  can be singleton reaction or a list or map of reactions. Note that `q-vec`
  and `d-vec` can be destructured and used in the subscriptions (this is the point
  actually). Again the subscriptions are derefed and passed to the subscription
  function

      ```(subs/register-pure
           :a-b-sub
           :<- [:a-sub]
           :<- [:b-sub]
           (fn [[a b] [_]] {:a a :b b}))```
  In this example the convienent syntax of `:<-` is used to cover the majority
  of cases where only a simple subscription is needed without any parameters

  "
  [sub-name & args]
  (let [f                        (last args)  ;; grab the last arg
        middle-args              (butlast args)    ;; grab the middle args
        maybe-func               (first middle-args)
        sub-fn                   (when (fn? maybe-func) maybe-func)
        arrow-args               (if (fn? maybe-func)
                                   (rest middle-args)
                                   middle-args)
        arrow-subs               (->> arrow-args
                                      (partition 2)
                                      (map last))]
    (cond
      sub-fn                   ;; first case the user provides a custom sub-fn
      (register
        sub-name
        (fn subs-handler-fn    ;; multi-arity to match the arities `subscribe` might invoke.
          ([db q-vec]
           (let [subscriptions (sub-fn q-vec)]
             (make-reaction
              (fn [] (f (multi-deref subscriptions) q-vec)))))
          ([db q-vec d-vec]
           (let [subscriptions (sub-fn q-vec d-vec)]
             (make-reaction
              (fn [] (f (multi-deref subscriptions) q-vec d-vec)))))))
      (seq arrow-args)              ;; the user uses the :<- sugar
      (register
        sub-name
        (letfn [(get-subscriptions []
                  (let [subscriptions (map subscribe arrow-subs)]
                    (if (< 1 (count subscriptions))
                      subscriptions
                      (first subscriptions))))] ;; automatically provide a singleton
         (fn subs-handler-fn
           ([db q-vec]
            (let [subscriptions (get-subscriptions)]
              (make-reaction
               (fn [] (f (multi-deref subscriptions) q-vec)))))
           ([db q-vec d-vec]
            (let [subscriptions (get-subscriptions)]
              (make-reaction
               (fn [] (f (multi-deref subscriptions) q-vec d-vec))))))))
      :else
      (register ;; the simple case with no subs
        sub-name
        (fn subs-handler-fn
          ([db q-vec]
           (make-reaction (fn [] (f @db q-vec))))
          ([db q-vec d-vec]
           (make-reaction (fn [] (f @db q-vec d-vec))))))))())
