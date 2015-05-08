(ns re-frame.router
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core        :refer [flush]]
            [re-frame.handlers   :refer [handle]]
            [re-frame.utils      :refer [warn error]]
            [cljs.core.async     :refer [chan put! <! timeout]]))

;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Using core.async means we can have the aysnc handling of events.
;;
(def ^:private event-chan (chan))    ;; TODO: set buffer size?

(defn purge-chan
  "read all pending events from the channel and drop them on the floor"
  []
  #_(loop []                          ;; TODO commented out until poll! is a part of the core.asyc API
    (when (go (poll! event-chan))     ;; progress: https://github.com/clojure/core.async/commit/d8047c0b0ec13788c1092f579f03733ee635c493
      (recur))))

;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpetual loop, read events from "event-chan", and call the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In some cases, we need to pause for an entire animationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;

(defn router-loop
  []
  (go-loop []
           (let [event-v  (<! event-chan)                   ;; wait for an event
                 _        (if (:flush-dom (meta event-v))   ;; check the event for metadata
                            (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
                            (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
             (try
               (handle event-v)

               ;; If the handler throws:
               ;;   - allow the exception to bubble up because the app, in production,
               ;;     may have hooked window.onerror and perform special processing.
               ;;   - But an exception which bubbles up will break the enclosing go-loop.
               ;;     So we'll need to start another one.
               ;;   - purge any pending events, because they are probably related to the
               ;;     event which just fell in a screaming heap. Not sane to handle further
               ;;     events if the prior event failed.
               (catch js/Object e
                 (do
                   ;; try to recover from this (probably uncaught) error as best we can
                   (purge-chan)        ;; get rid of any pending events
                   (router-loop)       ;; Exception throw will cause termination of go-loop. So, start another.

                   (throw e)))))        ;; re-throw so the rest of the app's infrastructure (window.onerror?) gets told
           (recur)))

;; start event processing
(router-loop)


;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch
  "Send an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])
  "
  [event-v]
  (if (nil? event-v)
    (error "re-frame: \"dispatch\" is ignoring a nil event.")     ;; nil would close the channel
    (put! event-chan event-v))
  nil)   ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


(defn dispatch-sync
  "Send an event to be processed by the registered handler, but avoid the async-inducing
  use of core.async/chan.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [event-v]
  (handle event-v)
  nil)    ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


