(ns re-frame.handlers
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [re-frame.db :refer [app-db]]
            [re-frame.utils :refer [first-in-vector]]
            [cljs.core.async :refer [chan put! <! timeout]]))


;; -- register of handlers ------------------------------------------------------------------------

(def ^:private id->fn  (atom {}))


(defn register
  "register a handler for an event"
  [event-id handler-fn]
  (if (contains? @id->fn event-id)
    (println "Warning: overwritting an event-handler" event-id))     ;; TODO: more generic logging
  (swap! id->fn
         assoc event-id handler-fn))


;; -- dispatching and routing ---------------------------------------------------------------------

(def ^:private dispatch-chan  (chan))

(defn dispatch
  "components send events by calling this function.
  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (assert (some? event-v))         ;; nil would close the channel
  (put! dispatch-chan event-v))

(defn dispatch-sync
  "sync version of above that actually does the dispatch"
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (get @id->fn event-id)]
    (assert (some? handler-fn) (str "No event handler registered for event: " event-id ))
    (handler-fn app-db event-v)))


(defn- router
  "route an event, arriving on the dispatch channel, to the right handler"
  []
  (go-loop []
      (let [event-v     (<! dispatch-chan)]
        (dispatch-sync event-v)
        (<! (timeout 0))     ;; just in case we are handling one dispatch after an other, give the GU a chance to do its stuff.
        (recur))))

(router)  ;; run the router loop it


;; -- helper --------------------------------------------------------------------------------------

;; TODO: this has to go.
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

