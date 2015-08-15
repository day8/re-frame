(ns re-frame.frame
  (:require [re-frame.utils :refer [get-event-id get-subscription-id]]))

; re-frame meat reimplemented in terms of pure functions (with help of transducers)

(defn frame-xform
  "Returns a transducer: state, event -> state.
This transducer reads event-id and applies matching handler on input state."
  [handlers loggers db-selector]
  (fn [rf]
    (fn
      ([] (rf))
      ([result] (rf result))
      ([state event]
       (let [event-id (get-event-id event)
             handler-fn (event-id handlers)]
         (if (nil? handler-fn)
           (let [error (:error loggers)]
             (error "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")
             state)
           (rf state (handler-fn (db-selector state) event))))))))


; TODO: this should be implemented as deftype/defrecord in future
(defn frame-factory
  "Constructs independent frame instance."
  [handlers subscriptions loggers db-selector]
  {:handlers      handlers
   :subscriptions subscriptions
   :loggers       loggers
   :db-selector   db-selector})

; see http://clojure.org/transducers
(defn get-frame-transducer [frame]
  (frame-xform (:handlers frame) (:loggers frame) (:db-selector frame)))

(defn subscribe
  "Returns a reagent/reaction which observes state."
  [frame subscription-spec]
  (.log js/console "in-subscribe" frame)
  (let [subscription-id (get-subscription-id subscription-spec)
        handler-fn (get-in frame [:subscriptions subscription-id])]
    (if (nil? handler-fn)
      (let [error (get-in frame [:loggers :error])]
        (error "re-frame: no subscription handler registered for: \"" subscription-id "\".  Returning a nil subscription."))
      (apply handler-fn subscription-spec))))

; TODO: figure out what to do here, re-frame should not be aware of app-db here, this is for backward compatibility
(defn legacy-subscribe
  "Returns a reagent/reaction which observes state."
  [frame app-db subscription-spec]
  (.log js/console "in-subscribe" frame)
  (let [subscription-id (get-subscription-id subscription-spec)
        handler-fn (get-in frame [:subscriptions subscription-id])]
    (if (nil? handler-fn)
      (let [error (get-in frame [:loggers :error])]
        (error "re-frame: no subscription handler registered for: \"" subscription-id "\".  Returning a nil subscription."))
      (handler-fn app-db subscription-spec))))

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
