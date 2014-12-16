(ns re-frame.handlers
  (:require [re-frame.db :refer [app-db]]
            [re-frame.utils :refer [first-in-vector]]))




;; Why do we need this?
;; If we do need it, use peak-db so as to avoid reactive redraws.
;; TODO: Still under design dicussion with MT. Reinstated to get things working for now
(defn get-in-db
  "Direct lookup of arbitrary path in state/db without subscription/reaction.
    NOTE: While it is convenient to not have to pass values through function chains,
          by definition this also incourages non pure functional style, so resist."
  [path-v]
  (get-in @app-db path-v))


(def ^:private id->fn  (atom {}))


(defn register
  "register a handler for an event"
  [event-id handler-fn]
  (if (contains? @id->fn event-id)
    (println "Warning: overwritting an event-handler" event-id))     ;; TODO: more generic logging
  (swap! id->fn
         assoc event-id handler-fn))


(defn dispatch
  "reagent components handle events by calling this function.
  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (get @id->fn event-id)]
    (assert (not (nil? handler-fn)) (str "No event handler registered for event: " event-id ))
    (handler-fn app-db event-v)))


(defn transaction!
  "A helper fucntion to be used when writting event handlers.
  Allows a handler to perform an atomic modification of the atom.
  Modification consist of one or more mutations, wrapped by a function,
  followed by a call to a validation fucntion which may also annotate the
  data structures with further information.

  XXX This feels a bit too nested."

  ([db description mutation-fn]
    (transaction! db description mutation-fn identity))

  ([db description mutation-fn validation-fn]
    (reset! db
            (-> @db
                (assoc :undo-description description)
                mutation-fn
                validation-fn))))

