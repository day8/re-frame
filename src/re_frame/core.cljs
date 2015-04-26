(ns re-frame.core
  (:require
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.router     :as router]
    [re-frame.middleware :as middleware]))


;; --  API  -------

(def dispatch         router/dispatch)
(def dispatch-sync    router/dispatch-sync)

(def register-sub        subs/register)
(def clear-sub-handlers! subs/clear-handlers!)
(def subscribe           subs/subscribe)


(def clear-event-handlers!  handlers/clear-handlers!)


(def pure        middleware/pure)
(def debug       middleware/debug)
(def undoable    middleware/undoable)
(def path        middleware/path)
(def enrich      middleware/enrich)
(def trim-v      middleware/trim-v)
(def after       middleware/after)
(def log-ex      middleware/log-ex)


;; ALPHA - EXPERIMENTAL MIDDLEWARE
(def on-changes  middleware/on-changes)


;; --  Logging -----
;; re-frame uses a few utility logging functions: warn, log, error, group and groupEnd
;; By default they use the js/console implementations
;; But you can override:
;;   (set-loggers!  {:warn  my-warn   :log  my-looger ...})
;; The functions you supply will be given a string.
(def set-loggers! utils/set-loggers!)

;; --  Convenience API -------

;; Almost 100% of handlers will be pure, so make it easy to
;; register with "pure" middleware in the correct (left-hand-side) position.
(defn register-handler
  ([id handler]
    (handlers/register-base id pure handler))
  ([id middleware handler]
    (handlers/register-base id [pure middleware] handler)))



