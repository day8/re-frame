(ns re-frame.test.utils.log-recording)

(def log-transcript (atom {}))

(defn record-log-call [what args]
  (swap! log-transcript (fn [transcript]
                          (update transcript what
                            (fn [record]
                              (-> (or record {})
                                (update :counter inc)
                                (update :history conj (vec args))))))))

(defn last-log* [what]
  (last (get-in @log-transcript [what :history])))

(def last-log (partial last-log* :log))
(def last-warn (partial last-log* :warn))
(def last-error (partial last-log* :error))

(def recording-loggers
  {:log      (fn [& args] (record-log-call :log args))
   :warn     (fn [& args] (record-log-call :warn args))
   :error    (fn [& args] (record-log-call :error args))
   :group    (fn [& args] (record-log-call :group args))
   :groupEnd (fn [& args] (record-log-call :groupEnd args))})

(defn reset-log-recorder! []
  (reset! log-transcript {}))
