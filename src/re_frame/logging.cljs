(ns re-frame.logging)

(defn no-op [& _])

(defn js-console-log [& args]
  (.apply (.-log js/console) js/console (into-array args)))

(defn js-console-warn [& args]
  (.apply (.-warn js/console) js/console (into-array args)))

(defn js-console-error [& args]
  (.apply (.-error js/console) js/console (into-array args)))

(defn js-console-group [& args]
  (if (.-group js/console)                                  ;; group does not exist  < IE 11
    (.apply (.-group js/console) js/console (into-array args))
    (apply js-console-log args)))

(defn js-console-group-end [& args]
  (if (.-groupEnd js/console)                               ;; groupEnd does not exist  < IE 11
    (.apply (.-groupEnd js/console) js/console (into-array args))))

;; -- Logging -----------------------------------------------------------------
;;
;; re-frame internally uses a set of logging functions which, by default,
;; print to js/console.
;; Use set-loggers! if you want to change this default behaviour.
;; In production environment, you may want to capture exceptions and POST
;; them somewhere.  to , you might want to override the way that exceptions are
;; handled by overridding "error"
;;
(def default-loggers
  {:log      js-console-log
   :warn     js-console-warn
   :error    js-console-error
   :group    js-console-group
   :groupEnd js-console-group-end})

(def no-loggers
  {:log      no-op
   :warn     no-op
   :error    no-op
   :group    no-op
   :groupEnd no-op})
