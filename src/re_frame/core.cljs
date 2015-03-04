(ns re-frame.core
  (:require
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.router     :as router]
    [re-frame.middleware :as middleware]))


;; --  API  -------

(def register-handler handlers/register)
(def dispatch         router/dispatch)
(def dispatch-sync    router/dispatch-sync)

(def register-sub  subs/register)
(def subscribe     subs/subscribe)



(def pure        middleware/pure)
(def debug       middleware/debug)
(def undoable    middleware/undoable)
(def path        middleware/path)
(def validate    middleware/validate)
(def trim-v      middleware/trim-v)
(def after       middleware/after)
; (def log-events  middleware/log-events)



;; --  Convenience API -------

;; virtually every handler will be pure, ao make it easy
(defn register-pure-handler
  ([id handler]
    (register-handler id pure handler))
  ([id middleware handler]
    (register-handler id [pure middleware] handler)))



