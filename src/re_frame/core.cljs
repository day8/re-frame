(ns re-frame.core
  (:require
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.router     :as router]
    [re-frame.utils      :as utils]
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
(def on-changes  middleware/on-changes)


;; --  Logging -----
;; re-frame uses the logging functions: warn, log, error, group and groupEnd
;; By default, these functions map directly to the js/console implementations
;; But you can override with your own (set or subset):
;;   (set-loggers!  {:warn  my-warn   :log  my-looger ...})
(def set-loggers! utils/set-loggers!)


;; --  Convenience API -------

;; Almost 100% of handlers will be pure, so make it easy to
;; register with "pure" middleware in the correct (left-hand-side) position.
(defn register-handler
  ([id handler]
    (handlers/register-base id pure handler))
  ([id middleware handler]
    (handlers/register-base id [pure middleware] handler)))



;; -- Event Procssing Callbacks

(defn add-post-event-callback
  "Normal users of re-frame can ignore this part of the API. Useful
  only to libraries providing 'isomorphic javascript' rendering on
  Nodejs or Nashorn.

  Registers a callback function 'f'.
  f will be called after each dispatched event is procecessed
  f will be called with two parameters:
    - the event's vector. That which was dispatched orignally.
    - the further event queue - what is still to be processed. A PersistentQueue.
  "
  [f]
  (router/add-post-event-callback re-frame.router/event-queue f))

