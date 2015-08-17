(ns re-frame.core
  (:require [re-frame.scaffold :as scaffold]))

; this file provides public API to default re-frame setup
; note: by including this namespace, you will get default app-db, default app-frame
; and start default router-loop automatically

(def app-db scaffold/app-db)                                ; the default instance of app-db
(def app-frame scaffold/app-frame)                          ; the default instance of re-frame

;; --  API  -------

(def router-loop scaffold/router-loop)
(def set-loggers! scaffold/set-loggers!)
(def register-sub scaffold/register-sub)
(def unregister-sub scaffold/unregister-sub)
(def clear-sub-handlers! scaffold/clear-sub-handlers!)
(def subscribe scaffold/subscribe)
(def clear-event-handlers! scaffold/clear-event-handlers!)
(def dispatch scaffold/dispatch)
(def dispatch-sync scaffold/dispatch-sync)
(def register-handler scaffold/register-handler)
(def unregister-handler scaffold/unregister-handler)

(def pure scaffold/pure)
(def debug scaffold/debug)
;(def undoable scaffold/undoable)
(def path scaffold/path)
(def enrich scaffold/enrich)
(def trim-v scaffold/trim-v)
(def after scaffold/after)
(def log-ex scaffold/log-ex)
(def on-changes scaffold/on-changes)

;; start event processing
(scaffold/router-loop)
