(ns re-frame.core
  (:require
    [re-frame.events     :as events]
    [re-frame.subs       :as subs]
    [re-frame.fx         :as fx]
    [re-frame.router     :as router]
    [re-frame.loggers    :as loggers]
    [re-frame.middleware :as middleware]))


;; --  dispatch
(def dispatch         router/dispatch)
(def dispatch-sync    router/dispatch-sync)


;; --  subscribe
(def reg-sub-raw         subs/register)
(def reg-sub             subs/register-pure)
(def clear-all-subs!     subs/clear-all-handlers!)
(def subscribe           subs/subscribe)

;; --  effects
(def reg-fx         fx/register)
(def clear-fx!      fx/clear-handler!)
(def clear-all-fx!  fx/clear-all-handlers!)


;; --  middleware
(def pure        middleware/pure)
(def fx          fx/fx)
(def debug       middleware/debug)
(def path        middleware/path)
(def enrich      middleware/enrich)
(def trim-v      middleware/trim-v)
(def after       middleware/after)
(def on-changes  middleware/on-changes)

;; --  Events
(def clear-all-events!   events/clear-all-handlers!)
(def clear-event!        events/clear-handler!)

;; Registers a pure event handler. Places pure middleware in the correct, LHS position.

(defn reg-event
  ([id handler]
    (events/register-base id pure handler))
  ([id middleware handler]
    (events/register-base id [pure middleware] handler)))


;; Registers an effectful event handler. Places fx middleware in the correct, LHS position.
(defn reg-event-fx
  ([id handler]
   (events/register-base id fx handler))
  ([id middleware handler]
   (events/register-base id [fx middleware] handler)))


;; --  Logging -----
;; Internally, re-frame uses the logging functions: warn, log, error, group and groupEnd
;; By default, these functions map directly to the js/console implementations,
;; but you can override with your own fns (set or subset).
;; Example Usage:
;;   (defn my-fn [& args]  (post-it-somewhere (apply str args)))
;;   (re-frame.core/set-loggers!  {:warn my-fn :log my-fn})    ;; I should override the rest of them too.
(def set-loggers! loggers/set-loggers!)

;; If you are writing an extension to re-frame, like perhaps
;; an effeects handler, you may want to use re-frame logging.
;;
;; usage:  (console :error "this is bad: " a-variable " and " anotherv)
;;         (console :warn "possible breach of containment wall at: " dt)
(def console loggers/console)


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


;; --  Helpful Message
;; Assisting the v0.0.7 ->  v0.0.8 tranistion.  Remove in v0.0.9
(defn register-handler
  [& args]
  (console :error  "re-frame:  \"register-handler\" has been renamed \"reg-event\""))

(defn register-sub
  [& args]
  (console :error  "re-frame:  \"register-sub\" has been renamed \"reg-sub-raw\"."))

;; v0.0.8 alpha2 -> alpha3
(defn def-fx    [& args]  (console :error  "re-frame:  in v0.0.8-alpha3 \"def-fx\" was renamed \"reg-fx\"."))
(defn def-event [& args]  (console :error  "re-frame:  in v0.0.8-alpha3 \"def-event\" was renamed \"reg-event\"."))
(defn def-sub   [& args]  (console :error  "re-frame:  in v0.0.8-alpha3 \"def-sub\" was renamed \"reg-sub\"."))

