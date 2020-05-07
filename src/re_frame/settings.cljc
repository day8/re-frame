(ns re-frame.settings
  (:require
    [re-frame.interop :as interop]
    [re-frame.loggers :refer [console]]))

(def defaults
  {:loaded?             false
   :global-interceptors interop/empty-queue})

(def store
  (atom defaults))

(interop/on-load
  #(swap! store (fn [m] (assoc m :loaded? true))))

(defn loaded?
  []
  (:loaded? @store))

(defn reg-global-interceptor
  [{:keys [id] :as interceptor}]
  (swap! store update :global-interceptors
         (fn [global-interceptors]
           (let [ids (map :id global-interceptors)]
             (when interop/debug-enabled?
               (when (and (not (loaded?)) (some #{id} ids))
                 (console :warn "re-frame: duplicate global interceptor id: " id)))
             (conj global-interceptors interceptor)))))

(defn get-global-interceptors
  []
  (:global-interceptors @store))

(defn clear-global-interceptors
  ([]
   (swap! store assoc :global-interceptors interop/empty-queue))
  ([id]
   (swap! store update :global-interceptors
          (fn [global-interceptors]
            (into interop/empty-queue (remove #(= id (:id %)) global-interceptors))))))
