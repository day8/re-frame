(ns re-frame.loggers
  (:require
    [clojure.set :refer [difference]]))

;;
;; By default, re-frame uses the functions provided by js/console.
;; Use set-loggers! to change these defaults.
;;

;; holds the current set of loggin functions.
(def loggers (atom {:log       (js/console.log.bind   js/console)
                    :warn      (js/console.warn.bind  js/console)
                    :error     (js/console.error.bind js/console)
                    :group     (if (.-group js/console) (js/console.group.bind js/console) default-log)  ;; group does not exist  < IE 11
                    :groupEnd  (if (.-groupEnd js/console) (js/console.groupEnd.bind js/console) #())}))  ;; groupEnd does not exist  < IE 11


(defn log      [& args] (apply (:log @loggers)      args))
(defn warn     [& args] (apply (:warn @loggers)     args))
(defn group    [& args] (apply (:group @loggers)    args))
(defn groupEnd [& args] (apply (:groupEnd @loggers) args))
(defn error    [& args] (apply (:error @loggers)    args))


(defn set-loggers!
  "Change the set (or a subset) of logging functions used by re-frame.
  'new-loggers' should be a map which looks like default-loggers"
  [new-loggers]
  (assert  (empty? (difference (set (keys new-loggers)) (-> @loggers keys set))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))
