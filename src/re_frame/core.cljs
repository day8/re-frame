(ns re-frame.core
  (:require
    [re-frame.events     :as events]
    [re-frame.subs       :as subs]
    [re-frame.fx         :as fx]
    [re-frame.router     :as router]
    [re-frame.loggers    :as loggers]
    [re-frame.undo       :as undo]
    [re-frame.middleware :as middleware]))


;; --  API  -------

(def dispatch         router/dispatch)
(def dispatch-sync    router/dispatch-sync)

(def def-sub-raw         subs/register)
(def def-sub             subs/register-pure)
(def clear-sub-handlers! subs/clear-all-handlers!)
(def subscribe           subs/subscribe)

(def pure        middleware/pure)
(def fx          middleware/fx)
(def debug       middleware/debug)
(def path        middleware/path)
(def enrich      middleware/enrich)
(def trim-v      middleware/trim-v)
(def after       middleware/after)
(def on-changes  middleware/on-changes)


(def def-fx      fx/register)


;; -- Undo API -----
;; The docs are here: https://github.com/Day8/re-frame/wiki/Undo-&-Redo

(def undoable     undo/undoable)
(def undo-config! undo/undo-config!)


;; --  Logging -----
;; Internally, re-frame uses the logging functions: warn, log, error, group and groupEnd
;; By default, these functions map directly to the js/console implementations,
;; but you can override with your own fns (set or subset).
;; Example Usage:
;;   (defn my-fn [& args]  (post-it-somewhere (apply str args)))
;;   (re-frame.core/set-loggers!  {:warn my-fn :log my-fn})    ;; I should override the rest of them too.
(def set-loggers! loggers/set-loggers!)


;; --  Events API -------

(def clear-all-event-handlers!  events/clear-all-handlers!)
(def clear-event-handler!       events/clear-handler!)

;; Registers a pure event handler. Places pure middleare in the correct, LHS position.
(defn def-event
  ([id handler]
    (events/register-base id pure handler))
  ([id middleware handler]
    (events/register-base id [pure middleware] handler)))


;; Registers an effectful event handler. Places fx middleare in the correct, LHS position.
(defn def-event-fx
  ([id handler]
   (events/register-base id fx handler))
  ([id middleware handler]
   (events/register-base id [fx middleware] handler)))



;; -- Event Procssing Callbacks

(defn add-post-event-callback
  "Registers a callback function 'f'.
  f will be called after each dispatched event is procecessed
  f will be called with two arguments:
    - the event's vector. That which was dispatched orignally.
    - the further event queue - what is still to be processed. A PersistentQueue.

  This is useful in advanced cases like:
    - you are implementing a complex bootstrap pipeline
    - you want to create your own handling infrastructure, with perhaps multiple
      handlers for the one event, etc.  Hook in here.
    - libraries providing 'isomorphic javascript' rendering on  Nodejs or Nashorn.
  "
  [f]
  (router/add-post-event-callback re-frame.router/event-queue f))


(defn remove-post-event-callback
  [f]
  (router/remove-post-event-callback re-frame.router/event-queue f))
