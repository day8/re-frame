(ns re-frame.loggers
  (:require
   [clojure.set :refer [difference]]
   #?@(:clj [[clojure.string :as str]
             [clojure.tools.logging :as log]])))

#?(:clj (defn log [level & args]
          (log/log level (if (= 1 (count args))
                           (first args)
                           (str/join " " args)))))


;; XXX should loggers be put in the registrar ??
(def ^:private loggers
  "Holds the current set of logging functions.
   By default, re-frame uses the functions provided by js/console.
   Use `set-loggers!` to change these defaults
  "
  (atom #?(:cljs {:log       (js/console.log.bind   js/console)
                  :warn      (js/console.warn.bind  js/console)
                  :error     (js/console.error.bind js/console)
                  :group     (if (.-group js/console)         ;; console.group does not exist  < IE 11
                               (js/console.group.bind js/console)
                               (js/console.log.bind   js/console))
                  :groupEnd  (if (.-groupEnd js/console)        ;; console.groupEnd does not exist  < IE 11
                               (js/console.groupEnd.bind js/console)
                               #())})
        ;; clojure versions
        #?(:clj {:log      (partial log :info)
                 :warn     (partial log :warn)
                 :error    (partial log :error)
                 :group    (partial log :info)
                 :groupEnd  #()})))

(defn console
  [level & args]
  (assert (contains? @loggers level) (str "re-frame: log called with unknown level: " level))
  (apply (level @loggers) args))


(defn set-loggers!
  "Change the set (or a subset) of logging functions used by re-frame.
  `new-loggers` should be a map with the same keys as `loggers` (above)"
  [new-loggers]
  (assert  (empty? (difference (set (keys new-loggers)) (-> @loggers keys set))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))

(defn get-loggers
  "Get the current logging functions used by re-frame."
  []
  @loggers)
