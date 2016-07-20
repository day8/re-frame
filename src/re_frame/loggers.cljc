(ns re-frame.loggers
  (:require
    [clojure.set :refer [difference]]))

;; "loggers" holds the current set of logging functions.
;; By default, re-frame uses the functions provided by js/console.
;; Use set-loggers! to change these defaults.

(def ^:private loggers
  (atom {:log       #?(:cljs (js/console.log.bind   js/console)
                       :clj  println)
         :warn      #?(:cljs (js/console.warn.bind  js/console)
                       :clj  (partial println "WARN: "))
         :error     #?(:cljs (js/console.error.bind js/console)
                       :clj  (partial println "ERROR: "))
         :group     #?(:cljs (if (.-group js/console) ;; console.group does not exist  < IE 11
                               (js/console.group.bind js/console)
                               (js/console.log.bind   js/console))
                       :clj  println)
         :groupEnd  #?(:cljs (if (.-groupEnd js/console) ;; console.groupEnd does not exist  < IE 11
                               (js/console.groupEnd.bind js/console)
                               #())
                       :clj  #())}))

(defn console
  [level & args]
  (assert (contains? @loggers level) (str "re-frame: log called with unknown level: " level))
  (apply (level @loggers) args))


(defn set-loggers!
  "Change the set (or a subset) of logging functions used by re-frame.
  'new-loggers' should be a map which looks like default-loggers"
  [new-loggers]
  (assert  (empty? (difference (set (keys new-loggers)) (-> @loggers keys set))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))
