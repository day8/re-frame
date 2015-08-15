(ns re-frame.logging)

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
  {:log       #(.log js/console %)
   :warn      #(.warn js/console %)
   :error     #(.error js/console %)
   :group     #(if (.group js/console) (.group js/console %) (.log js/console %))  ;; group does not exist  < IE 11
   :groupEnd  #(when (.groupEnd js/console) (.groupEnd js/console))})              ;; groupEnd does not exist  < IE 11
