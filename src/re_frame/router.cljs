(ns re-frame.router
  (:require [reagent.core]
            [re-frame.events :refer [handle]]
            [goog.async.nextTick]))


;; -- Router Loop ------------------------------------------------------------
;;
;; A call to "re-frame.core/dispatch" places an event on a queue for processing.
;; A short time later, the handler registered to handle this event will be run.
;; What follows is the implemtation of this process.
;;
;; The task is to process queued events in a perpetual loop, one after
;; the other, FIFO, calling the registered event-handler for each, being idle when
;; there are no events, and firing up when one arrives.
;;
;; But browsers only have a single thread of control and we must be
;; careful to not hog the CPU. When processing events one after another, we
;; must hand back control to the browser regularly, so it can redraw, process
;; websockets, etc. But not too regularly! If we are in a de-focused browser
;; tab, our app will be CPU throttled. Each time we get back control, we have
;; to process all queued events, or else something like a bursty websocket
;; (producing events) might overwhelm the queue. So there's a balance.
;;
;; The processing/handling of an event happens "asynchronously" sometime after
;; that event was enqueued via "dispatch". The original implementation of this router loop
;; used core.async. It was fairly simple, and it mostly worked, but it did not
;; give enough control. So now we hand-roll our own, finite-state-machine and all.
;;
;; The strategy is this:
;;   - maintain a FIFO queue of `dispatched` events.
;;   - when a new event arrives, "schedule" processing of this queue using
;;     goog.async.nextTick, which means it will happen "very soon".
;;   - when processing events, one after the other, do ALL the those currently
;;     queued. Don't stop. Don't yield to the browser. Hog that CPU.
;;   - but if any new events are dispatched during this cycle of processing,
;;     don't do them immediately. Leave them queued. Yield first to the browser,
;;     and do these new events in the next processing cycle. That way we drain
;;     the queue up to a point, but we never hog the CPU forever. In
;;     particular, we handle the case where handling one event will beget
;;     another event. The freshly begat event will be handled next cycle,
;;     with yielding in-between.
;;   - In some cases, an event should not be handled until after the GUI has been
;;     updated, i.e., after the next Reagent animation frame. In such a case,
;;     the event should be dispatched with :flush-dom metadata like this:
;;       (dispatch ^:flush-dom [:event-id other params])
;;     Such an event will temporarily block all further processing because
;;     events are processed sequentially: we handle one event completely
;;     before we handle the ones behind it.
;;
;; Implementation Notes:
;;   - queue processing can be in a number of states: scheduled, running, paused
;;     etc. So it is modeled as a Finite State Machine.
;;     See "-fsm-trigger" (below) for the states and transitions.
;;   - the scheduling is done via "goog.async.nextTick" which is pretty quick
;;   - when the event has :flush-dom metadata we schedule via
;;       "reagent.core.after-render"
;;     which will run event processing after the next Reagent animation frame.
;;

;; Events can have metadata which says to pause event processing.
;; event metadata -> "run later" functions
(def later-fns
  {:flush-dom (fn [f] ((.-after-render reagent.core) #(goog.async.nextTick f)))   ;; one tick after the end of the next annimation frame
   :yield     goog.async.nextTick})           ;; almost immediately


;; Abstract representation of the Event Queue
(defprotocol IEventQueue

  ;; -- API
  (push [this event])
  (add-post-event-callback [this f])
  (remove-post-event-callback [this f])

  ;; -- Implementation via a Finite State Machine
  (-fsm-trigger [this trigger arg])

  ;; -- Finite State Machine actions
  (-add-event [this event])
  (-process-1st-event-in-queue [this])
  (-run-next-tick [this])
  (-run-queue [this])
  (-exception [this ex])
  (-pause [this later-fn])
  (-resume [this])
  (-call-post-event-callbacks[this event]))


;; Concrete implementation of IEventQueue
(deftype EventQueue [^:mutable fsm-state
                     ^:mutable queue
                     ^:mutable post-event-callback-fns]
  IEventQueue

  ;; -- API ------------------------------------------------------------------

  (push [this event]         ;; presumably called by dispatch
    (-fsm-trigger this :add-event event))

  (add-post-event-callback [_ callback-fn]
    ;; register a callback function which will be called after each event is processed
    (set! post-event-callback-fns (conj post-event-callback-fns callback-fn)))

  (remove-post-event-callback [_ callback-fn]
    (set! post-event-callback-fns (remove #(= % callback-fn) post-event-callback-fns)))


  ;; -- FSM Implementation ---------------------------------------------------

  (-fsm-trigger
    [this trigger arg]

    ;; The following "case" impliments the Finite State Machine.
    ;; Given a "trigger", and the existing FSM state, it computes the
    ;; new FSM state and the tranistion action (function).

    (let [[new-fsm-state action-fn]
          (case [fsm-state trigger]

            ;; You should read the following "case" as:
            ;; [current-FSM-state trigger] -> [new-FSM-state action-fn]
            ;;
            ;; So, for example, the next line should be interpreted as:
            ;; if you are in state ":idle" and a trigger ":add-event"
            ;; happens, then move the FSM to state ":scheduled" and execute
            ;; that two-part "do" fucntion.
            [:idle :add-event] [:scheduled #(do (-add-event this arg)
                                                (-run-next-tick this))]

            ;; State: :scheduled  (the queue is scheduled to run, soon)
            [:scheduled :add-event] [:scheduled #(-add-event this arg)]
            [:scheduled :run-queue] [:running   #(-run-queue this)]

            ;; State: :running (the queue is being processed one event after another)
            [:running :add-event ] [:running  #(-add-event this arg)]
            [:running :pause     ] [:paused   #(-pause this arg)]
            [:running :exception ] [:idle     #(-exception this arg)]
            [:running :finish-run] (if (empty? queue)       ;; FSM guard
                                     [:idle]
                                     [:scheduled #(-run-next-tick this)])

            ;; State: :paused (:flush-dom metadata on an event has caused a temporary pause in processing)
            [:paused :add-event] [:paused  #(-add-event this arg)]
            [:paused :resume   ] [:running #(-resume this)]

            (throw (js/Error. (str "re-frame: router state transition not found. " fsm-state " " trigger))))]

      ;; The "case" above computed both the new FSM state, and the action. Now, make it happen.
      (set! fsm-state new-fsm-state)
      (when action-fn (action-fn))))

  (-add-event
    [_ event]
    (set! queue (conj queue event)))

  (-process-1st-event-in-queue
    [this]
    (let [event-v (peek queue)]
      (try
        (handle event-v)
        (set! queue (pop queue))
        (-call-post-event-callbacks this event-v)
        (catch :default ex
          (-fsm-trigger this :exception ex)))))

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
          (do (-process-1st-event-in-queue this)
              (recur (dec n)))))))

  (-exception
    [_ ex]
    (set! queue #queue [])     ;; purge the queue
    (throw ex))

  (-pause
    [this later-fn]
    (later-fn #(-fsm-trigger this :resume nil)))

  (-call-post-event-callbacks
    [_ event-v]
    ;; Call each registed post-event callback.
    (doseq [callback post-event-callback-fns]
      (callback event-v queue)))

  (-resume
    [this]
    (-process-1st-event-in-queue this)  ;; do the event which paused processing
    (-run-queue this)))        ;; do the rest of the queued events


;; ---------------------------------------------------------------------------
;; Event Queue
;; When "dispatch" is called, the event is added into this event queue.  Later,
;;  the queue will "run" and the event will be "handled" by the registered function.
;;
(def event-queue (->EventQueue :idle  #queue [] []))


;; ---------------------------------------------------------------------------
;; Dispatching
;;

(defn dispatch
  "Queue an event to be processed by the registered handler function.

  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (let [stack  (->> (js/Error.
                      (str "Error thrown in event handler " (first event-v)))
                    .-stack
                    clojure.string/split-lines
                    (remove #(re-find #"react.inc.js|\(native\)" %))  ;; get rid of the react frames
                    (clojure.string/join "\n"))]  ;; grab a stack here so that give it to events
    (if (nil? event-v)
      (throw (js/Error. "re-frame: you called \"dispatch\" without an event vector."))
      (push event-queue (with-meta event-v {:stack stack}))))
  nil)                                           ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


(defn dispatch-sync
  "Immediately process an event using the registered handler.

  Generally, you shouldn't use this. Use \"dispatch\" instead.  It
  is an error to even try and use it within an event handler.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [event-v]
  (handle event-v)
  (-call-post-event-callbacks event-queue event-v)  ;; ugly hack.  Just so post-event-callbacks get called
  nil)                                              ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False
