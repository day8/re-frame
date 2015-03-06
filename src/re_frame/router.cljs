(ns re-frame.router
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core        :refer [flush]]
            [re-frame.handlers   :refer [handle]]
            [re-frame.utils      :refer [warn]]
            [cljs.core.async     :refer [chan put! <! timeout]]))

;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Using core.async means we can have the aysnc handling of events.
;;
(def ^:private event-chan (chan))    ;; TODO: set buffer size?


;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpretual loop, read events from "event-chan", and call the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In some cases, we need to pause for an entire annimationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;
(go-loop []
         (let [event-v  (<! event-chan)                   ;; wait for an event
               _        (if (:flush-dom (meta event-v))   ;; check the event for metadata
                          (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
                          (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
           (handle event-v)
           (recur)))


;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch
  "Send an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])
  "
  [event-v]
  (if (nil? event-v)
    (warn "re-frame: \"dispatch\" is ignoring a nil event.")     ;; nil would close the channel
    (put! event-chan event-v))
  nil)   ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Returning-False


(defn dispatch-sync
  "Send an event to be processed by the registered handler, but avoid the async-inducing
  use of core.async/chan.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [event-v]
  (handle event-v)
  nil)    ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Returning-False


