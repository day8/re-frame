(ns re-frame.utils
  (:require
    [clojure.set :refer [difference]]))


;; -- Logging -----------------------------------------------------------------
;;
;; re-frame uses a set of logging functions which are, by default, those from
;; js/console.
;; Use set-loggers! if you want to change this default behaviour.
;;
(def default-log   (js/console.log.bind   js/console))
(def default-warn  (js/console.warn.bind  js/console))
(def default-error (js/console.error.bind js/console))
(def default-group (if (.-group js/console) (js/console.group.bind js/console) default-log))  ;; group does not exist  < IE 11
(def default-groupEnd (if (.-groupEnd js/console) (js/console.groupEnd.bind js/console) #()))  ;; groupEnd does not exist  < IE 11

(def default-loggers
  {:log       #(apply default-log %)
   :warn      #(apply default-warn %)
   :error     #(apply default-error %)
   :group     #(apply default-group %)
   :groupEnd  #(apply default-groupEnd %)})

;; holds the current set of loggin functions.
(def loggers (atom default-loggers))

(defn set-loggers!
  "Change the set (subset?) of logging functions used by re-frame.
  'new-loggers' should be a map which looks like default-loggers"
  [new-loggers]
  (assert  (empty? (difference (set (keys new-loggers)) (set (keys default-loggers)))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))


(defn log      [& args] ((:log @loggers)      args))
(defn warn     [& args] ((:warn @loggers)     args))
(defn group    [& args] ((:group @loggers)    args))
(defn groupEnd [& args] ((:groupEnd @loggers) args))
(defn error    [& args] ((:error @loggers)    args))

;; -- Misc --------------------------------------------------------------------

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (error "re-frame: expected a vector, but got: " v)))

