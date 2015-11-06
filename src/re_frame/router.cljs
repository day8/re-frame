(ns re-frame.router
  (:require [reagent.impl.batching :refer [do-later]]
            [re-frame.handlers :refer [handle]]
            [re-frame.utils :refer [error]]
            [goog.async.nextTick]))


;; -- Router Loop ------------------------------------------------------------
;;
;; Conceptually, the task is to process events in a perpetual loop, one after
;; the other, FIFO, calling the right event-handler for each, being idle when
;; there are no events, and firing up when one arrives, etc. The processing
;; of an event happens "asynchronously" sometime after the event is
;; dispatched.
;;
;; In practice, browsers only have a single thread of control and we must be
;; careful to not hog the CPU. When processing events one after another, we
;; must hand back control to the browser regularly, so it can redraw, process
;; websockets, etc. But not too regularly! If we are in a de-focused browser
;; tab, our app will be CPU throttled. Each time we get back control, we have
;; to process all queued events, or else something like a bursty websocket
;; (producing events) might overwhelm the queue. So there's a balance.
;;
;; The original implementation of this router loop used core.async. It was
;; fairly simple, and it mostly worked, but it did not give enough
;; control. So now we hand-roll our own.
;;
;; The strategy is this:
;;   - maintain a queue of `dispatched` events.
;;   - when a new event arrives, "schedule" processing of this queue using
;;     goog.async.nextTick, which means it will happen "very soon".
;;   - when processing events, do ALL the ones currently queued. Don't stop.
;;     Don't yield to the browser. Hog that CPU.
;;   - but if any new events arrive during this cycle of processing, don't do
;;     them immediately. Leave them queued. Yield first to the browser, and
;;     do these new events in the next processing cycle. That way we drain
;;     the queue up to a point, but we never hog the CPU forever. In
;;     particular, we handle the case where handling one event will beget
;;     another event. The freshly begat event will be handled next cycle,
;;     with yielding in between.
;;   - In some cases, an event should not be run until after the GUI has been
;;     updated, i.e., after the next reagent animation frame. In such a case,
;;     the event should be dispatched with :flush-dom metadata like this:
;;       (dispatch ^:flush-dom [:event-id other params])
;;     Such an event will temporarily block all further processing because
;;     events are processed sequentially: we handle each event before we
;;     handle the ones behind it.
;;   - It's also possible to request a much shorter duration yield to the
;;     browser before handling an event. The event should be dispatched with
;;     :yield metadata like this:
;;       (dispatch ^:yield [:event-id other params])
;;     This ends the current processing cycle early. The event and those
;;     queued up after it will be processed in the next processing cycle.
;;
;; Implementation
;;   - a simple finite state machine where the only state that affects
;;     decisions (around scheduling) is whether or not the queue is
;;     empty.
;;   - most scheduling is done via "goog.async.nextTick" which is pretty quick
;;   - when the event has :flush-dom metadata we schedule via
;;     "reagent.impl.batching.do-later" which will run event processing after
;;     the next reagent animation frame.
;;


;; A map from event metadata keys to the corresponding "run later" functions
(def later-fns
  {:flush-dom do-later              ;; after next annimation frame
   :yield     goog.async.nextTick}) ;; almost immediately

(defprotocol IEventQueue
  (enqueue [this event])

  (-schedule-run [this])
  (-run-queue [this])
  (-run-first [this])
  (-resume [this]))

;; EventQueue invariant:
;; - queue processing is in progress if and only if the queue is not empty
;;   - where "in progress" means either:
;;     - running now, or
;;     - waiting for a callback to run
;; Queue processing starts when an event is added to an empty queue, and
;; stops when the queue has been drained.

(deftype EventQueue [^:mutable queue]
  IEventQueue

  (enqueue
    [this event]
    (when (empty? queue)
      (-schedule-run this))
    (set! queue (conj queue event)))

  (-schedule-run
    [this]
    (goog.async.nextTick #(-run-queue this)))

  ;; Process all the events currently in the queue, but not any new ones.
  ;; Be aware that events might have metadata which will pause processing.
  (-run-queue
    [this]
    (loop [n (count queue)]
      (if (zero? n)
        (when (seq queue)
          (-schedule-run this))
        (if-let [later-fn (some later-fns (-> queue peek meta keys))]
          (later-fn #(-resume this))
          (do (-run-first this)
              (recur (dec n)))))))

  (-run-first
    [this]
    (try
      (handle (peek queue))
      (catch :default ex
        (set! queue #queue []) ;; purge the queue
        (throw ex)))
    (set! queue (pop queue)))

  (-resume
    [this]
    (-run-first this)   ;; process the event that generated the pause
    (-run-queue this))) ;; continue with a new queue full of events


;; ---------------------------------------------------------------------------
;; This is the global queue for events
;; When an event is dispatched, it is put into this queue.  Later the queue
;; will "run" and the event will be "handled" by the registered event handler.
;;

(def event-queue (->EventQueue #queue []))


;; ---------------------------------------------------------------------------
;; Dispatching
;;

(defn dispatch
  "Queue an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (if (nil? event-v)
    (error "re-frame: \"dispatch\" is ignoring a nil event.")
    (enqueue event-queue event-v))
  nil)                                                      ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


(defn dispatch-sync
  "Send an event to be processed by the registered handler
  immediately. Note: dispatch-sync may not be called while another
  event is being handled.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [event-v]
  (handle event-v)
  nil)                                                      ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False
