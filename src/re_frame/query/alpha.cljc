(ns re-frame.query.alpha
  (:require
   [re-frame :as-alias rf]
   [re-frame.subs :as subs]
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
        :safe)))

(defn legacy-query-id [q]
  (when (vector? q) (first q)))

(def id (some-fn legacy-query-id :re-frame/q))

(def flow-lifecycle (comp #{:flow} id))

(def lifecycle (some-fn flow-lifecycle
                        legacy-lifecycle
                        :re-frame/lifecycle
                        (constantly :safe)))

(defn legacy->map [q]
  (merge
   {::rf/q         (id q)
    ::rf/query-v   q
    ::rf/lifecycle (lifecycle q)}
   (::rf/query-m (meta q))))

(defn method [q] (@lifecycle->method (lifecycle q)))

(defn clear-all-methods! [] (reset! lifecycle->method {}))

(def cache subs/query->reaction)

(def default-dynv [])

(defn cache-key [q] [q default-dynv])

(defn cached [q]
  (if-some [r (get @cache (cache-key q))]
                   (do (trace/merge-trace! {:tags {:cached? true
                                                   :reaction (reagent-id r)}})
                       r)
                   (trace/merge-trace! {:tags {:cached? false}})))

(defn cache! [q r]
  (swap! cache assoc (cache-key q) r)
  r)

(defn clear!
  ([] (reset! cache {}))
  ([q] (swap! cache dissoc (cache-key q))))

(defn handle [q]
  (if-some [handler (get-handler :sub (id q))]
      (handler app-db q)
      (do (trace/merge-trace! {:error true})
          (console :error
                   "re-frame: no subscription handler registered for: "
                   (id q)
                 ". Returning a nil subscription."))))

(defn query? [q]
  (some? (and (id q)
              (lifecycle q))))
