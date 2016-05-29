(ns re-frame.subs
 (:require
   [reagent.ratom  :as ratom :refer [make-reaction] :refer-macros [reaction]]
   [re-frame.db    :refer [app-db]]
   [re-frame.utils :refer [first-in-vector warn error]]))


;; -- Subscription Handler Lookup and Registration --------------------------------------------------

;; Maps from a query-id to a handler function.
(def ^:private qid->fn (atom {}))

(defn clear-handlers!
  "Unregisters all existing subscription handlers"
  []
  (reset! qid->fn {}))

(defn register
  "Registers a subscription handler function for an query id"
  [query-id handler-fn]
  (if (contains? @qid->fn query-id)
    (warn "re-frame: overwriting subscription handler for: " query-id))  ;; allow it, but warn. Happens on figwheel reloads.
  (swap! qid->fn assoc query-id handler-fn))


;; -- Subscription cache -----------------------------------------------------
;;
;; De-duplicate subscriptions. If two or more identical subscriptions
;; are concurrently active, we want only one handler running.
;; Two subscriptions are "identical" if their query vectors
;; test "=".
(def ^:private query->reaction (atom {}))

(defn cache-and-return
  "cache the reaction r"
  [v dynv r]
  (let [cache-key [v dynv]]
    ;; when this reaction is nolonger being used, remove it from the cache
    (ratom/add-on-dispose! r #(do (swap! query->reaction dissoc cache-key)
                                  (warn "Removing subscription: " cache-key)))

    ;; cache this reaction, so it can be used for identical subscriptions
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
  ([v]
   (if-let [cached (cache-lookup v)]
     (do (warn "Using cached subscription: " v)
         cached)
     (let [query-id   (first-in-vector v)
           handler-fn (get @qid->fn query-id)]
       (warn "Subscription crerated: " v)
       (if-not handler-fn
         (error "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription."))
       (cache-and-return v [] (handler-fn app-db v)))))

  ([v dynv]
    (if-let [cached (cache-lookup v dynv)]
      (do (warn "Using cached subscription: " v " and " dynv)
          cached)
      (let [query-id   (first-in-vector v)
            handler-fn (get @qid->fn query-id)]
        (when ^boolean js/goog.DEBUG
          (when-let [not-reactive (remove #(implements? reagent.ratom/IReactiveAtom %) dynv)]
            (warn "re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom: " not-reactive)))
        (if (nil? handler-fn)
          (error "re-frame: no subscription handler registered for: \"" query-id "\". Returning a nil subscription.")
          (let [dyn-vals (reaction (mapv deref dynv))
                sub (reaction (handler-fn app-db v @dyn-vals))]
            ;; handler-fn returns a reaction which is then wrapped in the sub reaction
            ;; need to double deref it to get to the actual value.
            (warn "Subscription created: " v dynv)
            (cache-and-return v dynv (reaction @@sub))))))))
