(ns re-frame.frame
  (:require [re-frame.utils :refer [get-event-id get-subscription-id simple-inflection]]
            [re-frame.logging :as logging]))

; re-frame meat reimplemented in terms of pure functions (with help of transducers)

; see http://clojure.org/transducers[1]
(defn get-frame-transducer
  "Returns a transducer: state, event -> state.
This transducer resolves event-id, selects matching handler and calls it with old db state to produce a new db state.
Tranducer must have no knowledge of underlying app-db-atom, reagent, core.async or anything else out there.
All business of queuing events and application of their effects must be baked into reducing-fn and provided from outside
by the process doing actual transduction. See scaffold's transduce-by-resetting-atom for an example."
  [frame]
  (let [{:keys [handlers loggers db-selector]} frame]
    (fn [reducing-fn]
      (fn
        ([] (reducing-fn))                                  ; transduction initialization, see [1]
        ([result] (reducing-fn result))                     ; transduction completion, see [1]
        ([state event]
         (let [event-id (get-event-id event)
               handler-fn (event-id handlers)]
           (if (nil? handler-fn)
             (let [error (:error loggers)]
               (error "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")
               state)
             (let [old-db (db-selector state)               ; db-selector is responsible for retrieving actual db from current state
                   new-db (handler-fn old-db event)]        ; calls selected handler (including all composed middlewares)
               (if (nil? new-db)                            ; TODO: this test should be optional, there could be valid use-cases for nil db
                 (let [error (:error loggers)]
                   (error "re-frame: your handler returned nil. It should return the new db state. Ignoring.")
                   state)
                 (reducing-fn state new-db))))))))))        ; reducing function prepares new transduction state


(defn frame-summary-description [frame]
  (let [handlers-count (count (:handlers frame))
        subscriptions-count (count (:subscriptions frame))]
    (str
      handlers-count " " (simple-inflection "handler" handlers-count) ", "
      subscriptions-count " " (simple-inflection "subscription" subscriptions-count))))

(defprotocol IFrame)

(defrecord Frame [handlers subscriptions db-selector loggers]
  IFrame)

(extend-protocol IPrintWithWriter
  Frame
  (-pr-writer [this writer opts]
    (-write writer (str "#<Frame " (frame-summary-description this)))
    (-write writer " | handlers ")
    (pr-writer (keys (.-handlers this)) writer opts)
    (-write writer " | subscriptions ")
    (pr-writer (keys (.-subscriptions this)) writer opts)
    (-write writer ">")))

(defn make-frame
  "Constructs independent frame instance."
  ([] (make-frame nil))
  ([handlers] (make-frame handlers nil))
  ([handlers subscriptions] (make-frame handlers subscriptions deref))
  ([handlers subscriptions db-selector] (make-frame handlers subscriptions db-selector logging/default-loggers))
  ([handlers subscriptions db-selector loggers]
   {:pre [(or (map? handlers) (nil? handlers))
          (or (map? subscriptions) (nil? subscriptions))
          (fn? db-selector)
          (map? loggers)]}
   (Frame. handlers subscriptions db-selector loggers)))

(defn subscribe
  "Returns a reagent/reaction which observes state."
  [frame subscription-spec]
  (let [subscription-id (get-subscription-id subscription-spec)
        handler-fn (get-in frame [:subscriptions subscription-id])]
    (if (nil? handler-fn)
      (let [error (get-in frame [:loggers :error])]
        (error "re-frame: no subscription handler registered for: \"" subscription-id "\".  Returning a nil subscription.")
        nil)
      (handler-fn subscription-spec))))

(defn register-subscription-handler
  "Registers a handler function for an id."
  [frame subscription-id handler-fn]
  (let [existing-subscriptions (get frame :subscriptions)]
    (if (contains? existing-subscriptions subscription-id)
      (let [warn (get-in frame [:loggers :warn])]
        (warn "re-frame: overwriting subscription-handler for: " subscription-id))))
  (assoc-in frame [:subscriptions subscription-id] handler-fn))

(defn clear-subscription-handlers
  "Unregisters all subscription handlers."
  [frame]
  (assoc frame :subscriptions {}))

(defn register-event-handler
  "Register a handler for an event."
  ([frame event-id handler-fn]
   (let [existing-handlers (get frame :handlers)]
     (if (contains? existing-handlers event-id)
       (let [warn (get-in frame [:loggers :warn])]
         (warn "re-frame: overwriting an event-handler for: " event-id)))
     (assoc-in frame [:handlers event-id] handler-fn))))

(defn clear-event-handlers
  "Unregisters all event handlers."
  [frame]
  (assoc frame :handlers {}))

(defn set-loggers
  "Resets loggers."
  [frame new-loggers]
  (assoc frame :loggers new-loggers))
