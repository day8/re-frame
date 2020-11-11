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

(defn -replace-global-interceptor
  [global-interceptors interceptor]
  (reduce
    (fn [ret existing-interceptor]
      (if (= (:id interceptor)
             (:id existing-interceptor))
        (do
          (when interop/debug-enabled?
            (when (not (loaded?))
              (console :warn "re-frame: replacing duplicate global interceptor id: " (:id interceptor))))
          (conj ret interceptor))
        (conj ret existing-interceptor)))
    interop/empty-queue
    global-interceptors))

(defn reg-global-interceptor
  [{:keys [id] :as interceptor}]
  (swap! store update :global-interceptors
         (fn [global-interceptors]
           (let [ids (map :id global-interceptors)]
             (if (some #{id} ids)
               ;; If the id already exists we replace it in-place to maintain the ordering of
               ;; global interceptors esp during hot-code reloading in development.
               (-replace-global-interceptor global-interceptors interceptor)
               (conj global-interceptors interceptor))))))

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
