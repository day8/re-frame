(ns re-frame.handlers
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core :refer [flush]]
            [re-frame.db :refer [app-db]]
            [re-frame.utils :refer [first-in-vector warn]]
            [cljs.core.async :refer [chan put! <! timeout]]))


;; -- register of event handlers ------------------------------------------------------------------------

(def ^:private id->fn  (atom {}))

(defn register
  "register a handler for an event"
  [event-id handler-fn]
  (when (contains? @id->fn event-id)
    (warn "re-frame: overwriting an event-handler" event-id))   ;; allow it, but warn.
  (swap! id->fn assoc event-id handler-fn))


;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Key architecutal purpose is to cause aysnc handling of events.
(def ^:private event-chan (chan))    ;; TODO: how big should we make the buffer?


;; -- lookup and call -----------------------------------------------------------------------------

(defn- handle
  "Look up the handler for the given event, then call it, passing in 2 parameters."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (get @id->fn event-id)]
    (if (nil? handler-fn)
      (warn "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")   ;; TODO: make exception
      (handler-fn app-db event-v))))


;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a loop, read events from the dispatch channel, and route them
;; to the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In odd cases, we need to pause for an entire annimationFrame, to ensure that
;; the DOM is fully flushed, before thencalling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should have metadata
;; Example usage:
;;   (dispatch ^:flush-dom  [:event-id other params])
;;
;; router loop
(go-loop []
   (let [event-v  (<! event-chan)                   ;; wait for an event
         _        (if (:flush-dom (meta event-v))
                    (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is done.
                    (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the GUI a chance to do its stuff.
     (handle event-v)
     (recur)))


;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch
  "reagent components use this function to send events.
  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (if (nil? event-v)
    (warn "re-frame: \"dispatch\" is ignoring a nil event.")     ;; nil would close the channel
    (put! event-chan event-v)))


;; TODO: remove sync handling.  I don't like it, even for testing.
(defn dispatch-sync
  "Invoke the event handler sycronously, avoiding the async-inducing use of core.async/chan"
  [event-v]
  (handle event-v))


;; -- helper --------------------------------------------------------------------------------------

;; TODO: Yuck. this has to go.
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

