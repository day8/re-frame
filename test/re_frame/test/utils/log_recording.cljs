(ns re-frame.test.utils.log-recording)

(def log-transcript (atom {}))

(defn record-log-call [key args]
  (swap! log-transcript (fn [transcript]
                          (update transcript key
                            (fn [record]
                              (-> (or record {})
                                (update :counter inc)
                                (update :history conj (vec args))))))))

(defn last-log* [key]
  (last (get-in @log-transcript [key :history])))

(def last-log (partial last-log* :log))
(def last-warn (partial last-log* :warn))
(def last-error (partial last-log* :error))

(defn make-log-recorder-for-key [key]
  (fn [& args] (record-log-call key args)))

(def recording-loggers
  (into {} (map (fn [key] [key (make-log-recorder-for-key key)]) [:log :warn :error :group :groupEnd])))

(defn reset-log-recorder! []
  (reset! log-transcript {}))
