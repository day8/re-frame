(ns re-frame.core
  (:require
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.middleware :as middleware]))


;; --  API  -------

(def register-handler handlers/register)
(def dispatch         handlers/dispatch)
(def dispatch-sync    handlers/dispatch-sync)

(def register-sub  subs/register)
(def subscribe     subs/subscribe)



(def pure        middleware/pure)
(def debug       middleware/debug)
(def undoable    middleware/undoable)
(def path        middleware/path)
(def validate    middleware/validate)
(def trim-v      middleware/trim-v)
; (def log-events  middleware/log-events)



;; --  Convienience  -------

;; virtually ever handler will be pure, make it easy
(defn register-pure-handler
  ([id handler]
    (register-handler id pure handler))
  ([id middleware handler]
    (register-handler id [pure middleware] handler)))
