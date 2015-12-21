(ns re-frame.router
  (:require [reagent.impl.batching]
            [reagent.core]
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
;; control. So now we hand-roll our own, finite-state-machine and all.
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
;;
;; Implementation
;;   - queue processing can be in a number of states: scheduled, running, paused
;;     etc. So it is modeled explicitly as a FSM.
;;     See "-fsm-trigger" (below) for the states and transitions.
;;   - the scheduling is done via "goog.async.nextTick" which is pretty quick
;;   - when the event has :flush-dom we schedule via
;;       "reagent.impl.batching.do-later"
;;     which will run event processing after the next reagent animation frame.
;;


;; A map from event metadata keys to the corresponding "run later" functions
(def later-fns
  {:flush-dom (if (exists? reagent.core/after-render)              ;; after next annimation frame
                (.-after-render reagent.core)                      ;; reagent >= 0.6.0
                (.-do-later reagent.impl.batching))                ;; reagent < 0.6.0
   :yield     goog.async.nextTick}) ;; almost immediately

(defprotocol IEventQueue
  (enqueue [this event])

  (add-post-event-callback [this f])

  ;; Finite State Machine transitions
  (-fsm-trigger [this trigger arg])

  ;; Finite State Machine (FSM) actions
  (-add-event [this event])
  (-process-1st-event [this])
  (-run-next-tick [this])
  (-run-queue [this])
  (-exception [this ex])
  (-pause [this later-fn])
  (-resume [this]))


;;
(deftype EventQueue [^:mutable fsm-state
                     ^:mutable queue
                     ^:mutable post-event-callback-fns]
  IEventQueue

  ;; -- API ------------------------------------------------------------------
  (enqueue [this event]
    (-fsm-trigger this :add-event event))

  (add-post-event-callback [this f]
    (set! post-event-callback-fns (conj post-event-callback-fns f)))


  ;; -- FSM ------------------------------------------------------------------
  (-fsm-trigger
    [this trigger arg]

    ;; work out new FSM state and action function for the transition
    (let [[new-state action-fn]
          (case [fsm-state trigger]

            ;; The following specifies all FSM states, tranistions and actions
            ;; [current-state trigger] [new-state action-fn]

            ;; the queue is idle
            [:idle :add-event] [:scheduled #(do (-add-event this arg)
                                                (-run-next-tick this))]

            ;; processing has already been scheduled to run in the future
            [:scheduled :add-event] [:scheduled #(-add-event this arg)]
            [:scheduled :run-queue] [:running   #(-run-queue this)]

            ;; processing one event after another
            [:running :add-event ] [:running  #(-add-event this arg)]
            [:running :pause     ] [:paused   #(-pause this arg)]
            [:running :exception ] [:idle     #(-exception this arg)]
            [:running :finish-run] (if (empty? queue)       ;; FSM guard
                                     [:idle]
                                     [:scheduled #(-run-next-tick this)])

            ;; event processing is paused - probably by :flush-dom metadata
            [:paused :add-event] [:paused  #(-add-event this arg)]
            [:paused :resume   ] [:running #(-resume this)]

            (throw (str "re-frame: state transition not found. " fsm-state " " trigger)))]

      ;;  change state and run the action fucntion
      (set! fsm-state new-state)
      (when action-fn (action-fn))))

  (-add-event
    [this event]
    (set! queue (conj queue event)))

  (-process-1st-event
    [this]
    (let [event-v (peek queue)]
      (try
        (handle event-v)
        (catch :default ex
          (-fsm-trigger this :exception ex)))
      (set! queue (pop queue))

      ;; Tell all registed callbacks that an event was just processed.
      ;; Pass in the event just handled and the new state of the queue
      (doseq [f post-event-callback-fns] (f event-v queue))))

  (-run-next-tick
    [this]
    (goog.async.nextTick #(-fsm-trigger this :run-queue nil)))

  ;; Process all the events currently in the queue, but not any new ones.
  ;; Be aware that events might have metadata which will pause processing.
  (-run-queue
    [this]
    (loop [n (count queue)]
      (if (zero? n)
        (-fsm-trigger this :finish-run nil)
        (if-let [later-fn (some later-fns (-> queue peek meta keys))]  ;; any metadata which causes pausing?
          (-fsm-trigger this :pause later-fn)
          (do (-process-1st-event this)
              (recur (dec n)))))))

  (-exception
    [_ ex]
    (set! queue #queue [])     ;; purge the queue
    (throw ex))

  (-pause
    [this later-fn]
    (later-fn #(-fsm-trigger this :resume nil)))

  (-resume
    [this]
    (-process-1st-event this)  ;; do the event which paused processing
    (-run-queue this)))        ;; do the rest of the queued events


;; ---------------------------------------------------------------------------
;; This is the global queue for events
;; When an event is dispatched, it is put into this queue.  Later the queue
;; will "run" and the event will be "handled" by the registered event handler.
;;

(def event-queue (->EventQueue :idle  #queue [] []))


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

