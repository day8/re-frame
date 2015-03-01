(ns re-frame.handlers
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core     :refer [flush]]
            [re-frame.db      :refer [app-db]]
            [re-frame.utils   :refer [first-in-vector warn]]
            [cljs.core.async  :refer [chan put! <! timeout]]))


;; -- the register of event handlers --------------------------------------------------------------

(def ^:private id->fn  (atom {}))

(defn register
  "register a handler for an event"
  ([event-id handler-fn]
    (when (contains? @id->fn event-id)
      (warn "re-frame: overwriting an event-handler for: " event-id))   ;; allow it, but warn.
    (swap! id->fn assoc event-id handler-fn))

  ([event-id middleware handler-fn]
    (let  [mware  (if (vector? middleware)
                    (apply comp middleware)   ;; compose the vector of middleware
                    middleware)
           hander-fn (mware handler-fn)]
      (register event-id hander-fn))))


;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Allows for the aysnc handling of events.
;;
(def ^:private event-chan (chan))    ;; TODO: how big should we make the buffer?


;; -- lookup and call -----------------------------------------------------------------------------

(defn- handle
  "Given an event vector, look up the right handler, then call it.
  By default, handlers are not assumed to be pure. They are called with
  two paramters:
  - the `app-db` atom and
  - the event vector
  The handler is assumed to side-effect on the atom, the return value is ignored.
   To write handlers that are pure functions, use the \"pure\" middleware at handler
   registration time."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (get @id->fn event-id)]
    (if (nil? handler-fn)
      (warn "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")   ;; TODO: make exception
      (handler-fn app-db event-v))))


;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpretual loop, read events from the dispatch channel, and route them
;; to the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In odd cases, we need to pause for an entire annimationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;
;; router loop
(go-loop []
         (let [event-v  (<! event-chan)                   ;; wait for an event
               _        (if (:flush-dom (meta event-v))   ;; check the event for metadata
                          (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
                          (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
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
    (put! event-chan event-v))
  nil)   ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Returning-False


;; TODO: remove sync handling.  I don't like it much, even for testing.
(defn dispatch-sync
  "Invoke the event handler sycronously, avoiding the async-inducing use of core.async/chan"
  [event-v]
  (handle event-v))


