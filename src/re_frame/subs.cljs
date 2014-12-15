(ns re-frame.subs
 (:require
  [re-frame.db :refer [app-db]]
  [re-frame.utils :refer [first-in-vector]]))


;; mappings from handler-id to handler-fn
(def ^:private key->fn (atom {}))


(defn register
  "register a function for a handler id"
  [key-v handler-fn]
  (if (contains? @key->fn key-v)
   (println "Warning: overwritting a subscription-handler: " key-v))     ;; TODO: more generic logging
  (swap! key->fn assoc key-v handler-fn))


(defn subscribe
  "returns a reagent/reaction which observes a part of the "
  [v]
  (let [key-v       (first-in-vector v)
       handler-fn  (get @key->fn key-v)]
    (assert (not (nil? handler-fn)) (str "No subscription handler registered for key: " key-v))
    (handler-fn app-db v)))
