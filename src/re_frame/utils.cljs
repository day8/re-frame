(ns re-frame.utils)


;; -- Logging -----------------------------------------------------------------
;;
;; re-frame uses various kinds of logging.
;; Call set-loggers! if you want to override what it uses.
;;
(def default-loggers
  {:log       js/console.log
   :warn      js/console.warn
   :error     js/console.error
   :group     (or js/console.group js/console.log)    ;; group does not exist  < IE 11
   :groupEnd  (or js/console.groupEnd #())})          ;; groupEnd does not exist  < IE 11

;; holds the current set of loggers.
(def loggers (atom default-loggers))

(defn set-loggers!
  "new-loggers should be a map which looks like default-loggers"
  [new-loggers]
  (assert  (empty? (clojure.set/difference (set (keys new-loggers)) (set (keys default-loggers)))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))


(defn log      [& args] ({:log loggers}      (apply str args)))
(defn warn     [& args] ({:warn loggers}     (apply str args)))
(defn error    [& args] ({:error loggers}    (apply str args)))
(defn group    [& args] ({:group loggers}    (apply str args)))
(defn groupEnd [& args] ({:groupEnd loggers} (apply str args)))


;; -- Misc --------------------------------------------------------------------

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (warn "re-frame: expected a vector event, but got: " v)))

