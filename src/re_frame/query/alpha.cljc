(ns re-frame.query.alpha
  (:require
   [re-frame :as-alias rf]
   [re-frame.db :refer [app-db]]
   [re-frame.interop :refer [reagent-id]]
   [re-frame.loggers :refer [console]]
   [re-frame.register.alpha :refer [lifecycle->method]]
   [re-frame.registrar :refer [get-handler]]
   [re-frame.trace :as trace :include-macros true]))

(declare lifecycle)

(defn legacy-lifecycle [v]
  (when (vector? v)
    (or (lifecycle (meta v))
        ::rf/sub-default)))

(def lifecycle (some-fn legacy-lifecycle
                        ::rf/lifecycle
                        (constantly ::rf/sub-default)))

(defn legacy-query-id [q]
  (when (vector? q) (first q)))

(def id (some-fn legacy-query-id ::rf/q))

(defn method [q] (@lifecycle->method (lifecycle q)))

(defn clear-all-methods! [] (reset! lifecycle->method {}))

(def cache (atom {}))

(defn cached [q] (if-some [r (get-in @cache [(lifecycle q) q])]
                   (do (trace/merge-trace! {:tags {:cached? true
                                                   :reaction (reagent-id r)}})
                       r)
                   (trace/merge-trace! {:tags {:cached? false}})))

(defn cache! [q r] (swap! cache assoc-in [(lifecycle q) q] r) r)

(defn clear!
  ([] (reset! cache {}))
  ([q] (clear! q (lifecycle q)))
  ([q strat] (swap! cache update strat dissoc q)))

(defn handle [q]
  (let [handler (get-handler :sub (id q))]
    (if-not (nil? handler)
      (handler app-db q)
      (do (trace/merge-trace! {:error true})
          (console :error
                   "re-frame: no subscription handler registered for: "
                   (id q)
                   ". Returning a nil subscription.")))))

(defn query? [q]
  (some? (and (id q)
              (lifecycle q))))
