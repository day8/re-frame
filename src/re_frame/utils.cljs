(ns re-frame.utils)

;; -- Logging -------------------------------------------------------------------------------------

(def ^:dynamic *log-level*
  "The current log level.  Can be one of [:trace :debug :info :log :warn :error], or nil to disable.
  Defaults to :debug.  Change with binding or set!."
  :debug)

(let [levels [:trace :debug :info :log :warn :error]
      valid-level?   (set levels)
      ordered-levels (zipmap levels (next (range)))
      sufficient?    (fn [level]
                       (and (valid-level? level) (valid-level? *log-level*)
                            (>= (ordered-levels level) (ordered-levels *log-level*))))]
  (def ^:dynamic *log-fn*
    "The log function to use, takes two args:
  
      level - one of [:trace :debug :info :log :warn :error]
      xs    - a collection of items to log."
    (fn default-log-fn                                      ; Name for traces
      [level xs]
      (let [level      (or (valid-level? level) :log)
            console-fn (or (aget js/console (name level)) (.-log js/console))]
        (if (sufficient? level)
          (.apply console-fn js/console (into-array (map str xs))))))))

(let [do-log #(if *log-fn* (*log-fn* %1 %2) nil)]
  (defn trace [& args] (do-log :trace args))
  (defn dbg [& args] (do-log :debug args))
  (defn info [& args] (do-log :info args))
  (defn log [& args] (do-log :log args))
  (defn warn [& args] (do-log :warn args))
  (defn error [& args] (do-log :error args)))


;; -- Misc ----------------------------------------------------------------------------------------

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (warn "re-frame: expected a vector event, but got: " v)))