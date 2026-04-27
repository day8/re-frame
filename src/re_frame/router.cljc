(ns re-frame.router
  (:require [re-frame.events  :as events :refer [handle]]
            [re-frame.interop :as interop :refer [after-render empty-queue next-tick]]
            [re-frame.loggers :refer [console]]
            [re-frame.trace   :as trace :include-macros true])
  #?(:clj (:import [java.util UUID])))

;; -- Router Loop ------------------------------------------------------------
;;
;; A call to "re-frame.core/dispatch" places an event on a queue for processing.
;; A short time later, the handler registered to handle this event will be run.
;; What follows is the implementation of this process.
;;
;; The task is to process queued events in a perpetual loop, one after
;; the other, FIFO, calling the registered event-handler for each, being idle when
;; there are no events, and firing up when one arrives.
;;
;; But browsers only have a single thread of control and we must be
;; careful to not hog the CPU. When processing events one after another, we
;; must regularly hand back control to the browser, so it can redraw, process
;; websockets, etc. But not too regularly! If we are in a de-focused browser
;; tab, our app will be CPU throttled. Each time we get back control, we have
;; to process all queued events, or else something like a bursty websocket
;; (producing events) might overwhelm the queue. So there's a balance.
;;
;; The processing/handling of an event happens "asynchronously" sometime after
;; that event was enqueued via "dispatch". The original implementation of this router loop
;; used `core.async`. As a result, it was fairly simple, and it mostly worked,
;; but it did not give enough control. So now we hand-roll our own,
;; finite-state-machine and all.
;;
;; In what follows, the strategy is this:
;;   - maintain a FIFO queue of `dispatched` events.
;;   - when a new event arrives, "schedule" processing of this queue using
;;     goog.async.nextTick, which means it will happen "very soon".
;;   - when processing events, one after the other, do ALL the currently
;;     queued events. Don't stop. Don't yield to the browser. Hog that CPU.
;;   - but if any new events are dispatched during this cycle of processing,
;;     don't do them immediately. Leave them queued. Yield first to the browser,
;;     and do these new events in the next processing cycle. That way we drain
;;     the queue up to a point, but we never hog the CPU forever. In
;;     particular, we handle the case where handling one event will beget
;;     another event. The freshly begotten event will be handled next cycle,
;;     with yielding in-between.
;;   - In some cases, an event should not be handled until after the GUI has been
;;     updated, i.e., after the next Reagent animation frame. In such a case,
;;     the event should be dispatched with :flush-dom metadata like this:
;;       (dispatch ^:flush-dom [:event-id other params])
;;     Such an event will temporarily block all further processing because
;;     events are processed sequentially: we handle one event completely
;;     before we handle the ones behind it.
;;
;; Implementation notes:
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
  {:flush-dom (fn [f] (after-render #(next-tick f)))   ;; one tick after the end of the next animation frame
   :yield     next-tick})               ;; almost immediately

;; Event Queue Abstraction
(defprotocol IEventQueue

  ;; -- API
  (push [this event])
  (add-post-event-callback [this id callback-fn])
  (remove-post-event-callback [this id])
  (purge [this])

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
  (-call-post-event-callbacks [this event]))

;; Concrete implementation of IEventQueue
(deftype EventQueue [#?(:cljs ^:mutable fsm-state               :clj ^:volatile-mutable fsm-state)
                     #?(:cljs ^:mutable queue                   :clj ^:volatile-mutable queue)
                     #?(:cljs ^:mutable post-event-callback-fns :clj ^:volatile-mutable post-event-callback-fns)]
  IEventQueue

  ;; -- API ------------------------------------------------------------------

  (push [this event]         ;; presumably called by dispatch
    (-fsm-trigger this :add-event event))

  ;; register a callback function which will be called after each event is processed
  (add-post-event-callback [_ id callback-fn]
    (if (contains? post-event-callback-fns id)
      (console :warn "re-frame: overwriting existing post event call back with id:" id))
    (->> (assoc post-event-callback-fns id callback-fn)
         (set! post-event-callback-fns)))

  (remove-post-event-callback [_ id]
    (if-not (contains? post-event-callback-fns id)
      (console :warn "re-frame: could not remove post event call back with id:" id)
      (->> (dissoc post-event-callback-fns id)
           (set! post-event-callback-fns))))

  (purge [_]
    (set! queue empty-queue))

  ;; -- FSM Implementation ---------------------------------------------------

  (-fsm-trigger
    [this trigger arg]

    ;; The following "case" implements the Finite State Machine.
    ;; Given a "trigger", and the existing FSM state, it computes the
    ;; new FSM state and the transition action (function).

    (locking this
      (trace/with-trace {:op-type ::fsm-trigger}
        (let [[new-fsm-state action-fn]
              (case [fsm-state trigger]

                ;; You should read the following "case" as:
                ;; [current-FSM-state trigger] -> [new-FSM-state action-fn]
                ;;
                ;; So, for example, the next line should be interpreted as:
                ;; if you are in state ":idle" and a trigger ":add-event"
                ;; happens, then move the FSM to state ":scheduled" and execute
                ;; that two-part "do" function.
                [:idle :add-event] [:scheduled #(do (-add-event this arg)
                                                    (-run-next-tick this))]

                ;; State: :scheduled  (the queue is scheduled to run, soon)
                [:scheduled :add-event] [:scheduled #(-add-event this arg)]
                [:scheduled :run-queue] [:running #(-run-queue this)]

                ;; State: :running (the queue is being processed one event after another)
                [:running :add-event] [:running #(-add-event this arg)]
                [:running :pause] [:paused #(-pause this arg)]
                [:running :exception] [:idle #(-exception this arg)]
                [:running :finish-run] (if (empty? queue)     ;; FSM guard
                                         [:idle]
                                         [:scheduled #(-run-next-tick this)])

                ;; State: :paused (:flush-dom metadata on an event has caused a temporary pause in processing)
                [:paused :add-event] [:paused #(-add-event this arg)]
                [:paused :resume] [:running #(-resume this)]

                (throw (ex-info (str "re-frame: router state transition not found. " fsm-state " " trigger)
                                {:fsm-state fsm-state, :trigger trigger})))]

          ;; The "case" above computed both the new FSM state, and the action. Now, make it happen.

          (trace/merge-trace! {:operation [fsm-state trigger]
                               :tags      {:current-state fsm-state
                                           :new-state     new-fsm-state}})
          (set! fsm-state new-fsm-state)
          (when action-fn (action-fn))))))

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
        (catch #?(:cljs :default :clj Exception) ex
          (-fsm-trigger this :exception ex)))))

  (-run-next-tick
    [this]
    (next-tick #(-fsm-trigger this :run-queue nil)))

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
    [this ex]
    (purge this)   ;; purge the queue
    (throw ex))

  (-pause
    [this later-fn]
    (later-fn #(-fsm-trigger this :resume nil)))

  (-call-post-event-callbacks
    [_ event-v]
    (doseq [callback (vals post-event-callback-fns)]
      (callback event-v queue)))

  (-resume
    [this]
    (-process-1st-event-in-queue this)  ;; do the event which paused processing
    (-run-queue this)))                 ;; do the rest of the queued events

;; ---------------------------------------------------------------------------
;; Event Queue
;; When "dispatch" is called, the event is added into this event queue.  Later,
;;  the queue will "run" and the event will be "handled" by the registered function.
;;
(def event-queue (->EventQueue :idle empty-queue {}))

;; ---------------------------------------------------------------------------
;; Dispatching
;;

;; Dispatch correlation. When `dispatch` is called
;; from within a handler (typically via the `:dispatch` fx), tag the
;; queued event with the parent's dispatch-id as metadata so
;; `re-frame.events/handle` can read it back when the event eventually
;; runs and emit `:parent-dispatch-id` on the new event's trace. The
;; metadata key is namespaced (`:re-frame/parent-dispatch-id`) so
;; user-supplied event metadata can't collide. dispatch-sync doesn't
;; need this — it calls `handle` synchronously, so binding flows
;; (and re-frame already forbids dispatch-sync from within an event
;; handler anyway, so the parent-chain across dispatch-sync is
;; structurally a non-issue).
(defn- tag-with-parent-dispatch-id [event]
  (if-let [parent-id events/*current-dispatch-id*]
    (vary-meta event assoc :re-frame/parent-dispatch-id parent-id)
    event))

;; Fx-overrides cascade propagation. When a child is
;; dispatched from inside a handler whose root carried
;; `:re-frame/fx-overrides` meta (set by `dispatch-with`), copy
;; the override map to the child so the cascade inherits the
;; substitutions. The currently-handling event is reachable via
;; `re-frame.events/*handling*`; we read its meta and pass it
;; through. Idempotent — if the child already has overrides set
;; (multi-level dispatch-with), we keep the existing one.
(defn- tag-with-fx-overrides [event]
  (if (some-> event meta :re-frame/fx-overrides)
    event
    (if-let [overrides (some-> events/*handling* meta :re-frame/fx-overrides)]
      (vary-meta event assoc :re-frame/fx-overrides overrides)
      event)))

(defn dispatch
  [event]
  (if (nil? event)
    (throw (ex-info "re-frame: you called \"dispatch\" without an event vector." {}))
    (push event-queue (-> event
                          tag-with-parent-dispatch-id
                          tag-with-fx-overrides)))
  nil)                                           ;; Ensure nil return. See https://github.com/day8/re-frame/wiki/Beware-Returning-False

(defn dispatch-sync
  [event-v]
  (handle event-v)
  (-call-post-event-callbacks event-queue event-v)  ;; slightly ugly hack. Run the registered post event callbacks.
  (trace/with-trace {:op-type :sync})
  nil)                                              ;; Ensure nil return. See https://github.com/day8/re-frame/wiki/Beware-Returning-False

;; ---------------------------------------------------------------------------
;; dispatch-and-settle
;; ---------------------------------------------------------------------------
;;
;; Fire-and-await primitive for tests, devtools, and AI-driven
;; experiment loops. Dispatches `event` and returns a deferred value
;; that resolves once the event AND its synchronous cascade of
;; `:fx [:dispatch ...]` children settle.
;;
;; SHAPE
;;
;;   (dispatch-and-settle event)
;;   (dispatch-and-settle event opts)
;;     opts:
;;       :timeout-ms       int  ; default 5000 — overall budget;
;;                              ; rejects with :reason :timeout if exceeded
;;       :settle-window-ms int  ; default 100 — quiet period before
;;                              ; declaring the cascade settled (i.e.
;;                              ; how long to wait after the latest
;;                              ; cascade epoch landed before resolving)
;;       :include-cascaded? bool ; default true — emit :cascaded-epochs
;;                               ; (children fired via :fx [:dispatch ...])
;;
;; Resolves to:
;;   {:ok? true :root-epoch <epoch> :cascaded-epochs [<epoch> ...]}
;;   {:ok? false :reason :timeout :event ev :captured-epochs [...]}
;;
;; CLJS returns a JS Promise; CLJ returns a `clojure.core/promise`
;; (deref-able). Avoids a core.async dep on either platform.
;;
;; Q1 — settle definition (operator default): SYNC chain only for
;; v1. The cascade tracker waits for all children whose
;; `:parent-dispatch-id` chains back to root via the dispatch-id
;; correlation. In-flight async effects (`:http-xhrio` returning
;; later, etc.) are NOT awaited — their downstream `:dispatch`
;; callbacks fire whenever, and don't appear in this cascade.
;; Apps that want to await async effects should compose:
;; `(dispatch-and-settle [:my/event])` then a separate await on
;; whatever signal their async fx fires.
;;
;; Q2 — cascade depth (operator default): RECURSIVE through any
;; depth. Children of children of children all chain back via
;; :parent-dispatch-id (propagated across
;; queue-pushes via event metadata). The tracker walks the full
;; subtree.
;;
;; Q3 — promise vs channel (operator default): JS Promise on CLJS,
;; clojure.core/promise on CLJ. No core.async dep.
;;
;; Q4 — leverage register-epoch-cb: YES. The settle signal
;; rides on epoch-cb deliveries; we don't reimplement the assembly
;; pipeline. Each cb delivery brings 0+ cascade epochs; once a
;; quiet period (`:settle-window-ms`) elapses without a cascade
;; epoch landing, we resolve.
;;
;; LIMITATIONS (documented for the v1 release)
;;
;; - Root must be dispatched via dispatch-sync internally so its
;;   :dispatch-id is captured deterministically. dispatch-and-settle
;;   inherits the dispatch-sync constraint — calling it from inside
;;   an event handler is forbidden (re-frame.events/handle errors).
;; - Async effects with no synchronous re-frame trace footprint
;;   are invisible to the cascade tracker.
;; - The quiet-period heuristic can mis-classify a cascade as
;;   settled if a slow async chain pauses for longer than
;;   `:settle-window-ms` before re-firing a child :dispatch.
;;   Bump the window for those cases.

(defn- new-uuid []
  #?(:cljs (random-uuid)
     :clj  (UUID/randomUUID)))

(defn- mk-deferred []
  ;; Cross-platform deferred: returns
  ;;   {:value <promise/atom>      ; what we hand back to the caller
  ;;    :resolve! (fn [v] ...)     ; idempotent, single-shot}
  ;; CLJS uses a JS Promise (resolve! captured from the executor).
  ;; CLJ uses clojure.core/promise (deliver is idempotent under guard).
  #?(:cljs
     (let [resolve-fn (volatile! nil)
           p (js/Promise. (fn [resolve _reject]
                            (vreset! resolve-fn resolve)))
           done? (atom false)]
       {:value     p
        :resolve!  (fn [v]
                     (when (compare-and-set! done? false true)
                       (@resolve-fn (clj->js v :keyword-fn name))))})
     :clj
     (let [p (promise)]
       {:value    p
        :resolve! (fn [v] (when-not (realized? p) (deliver p v)))})))

(defn dispatch-and-settle
  "Dispatch `event` synchronously, then await the cascade of
   `:fx [:dispatch ...]` children. See the long comment above for
   shape, semantics, and limitations."
  ([event] (dispatch-and-settle event {}))
  ([event {:keys [timeout-ms settle-window-ms include-cascaded?]
           :or   {timeout-ms 5000 settle-window-ms 100 include-cascaded? true}}]
   (let [{:keys [value resolve!]} (mk-deferred)
         cascade-ids    (atom #{})
         cascade-epochs (atom [])
         root-id        (atom nil)
         settle-tick    (atom 0) ;; bumped on each cascade-epoch arrival
         cb-key         (new-uuid)
         finish!        (fn [result]
                          (trace/remove-epoch-cb cb-key)
                          (resolve! result))
         schedule-settle-check
                        (fn schedule-settle-check []
                          (let [tick @settle-tick]
                            (interop/set-timeout!
                             (fn []
                               (when (and (= tick @settle-tick)
                                          (some? @root-id))
                                 (let [eps     @cascade-epochs
                                       root-ep (some #(when (= @root-id (:dispatch-id %)) %) eps)
                                       cascaded (filterv #(not= @root-id (:dispatch-id %)) eps)]
                                   (finish! (cond-> {:ok?        true
                                                     :root-epoch root-ep}
                                              include-cascaded?
                                              (assoc :cascaded-epochs cascaded))))))
                             settle-window-ms)))]
     (trace/register-epoch-cb cb-key
                              (fn [epochs]
                                ;; Match by dispatch-id only:
                                ;; (a) :dispatch-id == root-id (root, set
                                ;; inside `handle` via *dispatch-id-capture*
                                ;; before any cb fires), or
                                ;; (b) :parent-dispatch-id ∈ cascade-ids
                                ;; (already-matched ancestor).
                                ;; No event-vector fallback: when two
                                ;; callers dispatch the same vector,
                                ;; vector equality is ambiguous and would
                                ;; mis-attribute one caller's epoch to the
                                ;; other.
                                (let [our (filter (fn [e]
                                                    (or (= @root-id (:dispatch-id e))
                                                        (contains? @cascade-ids (:parent-dispatch-id e))))
                                                  epochs)]
                                  (when (seq our)
                                    (doseq [e our]
                                      (swap! cascade-ids conj (:dispatch-id e))
                                      (swap! cascade-epochs conj e))
                                    (swap! settle-tick inc)
                                    (schedule-settle-check)))))
     ;; Overall timeout — fires regardless of cascade activity.
     (interop/set-timeout!
      (fn []
        (finish! {:ok?              false
                  :reason           :timeout
                  :event            event
                  :captured-epochs  @cascade-epochs}))
      timeout-ms)
     ;; Dispatch the root synchronously, binding `*dispatch-id-capture*`
     ;; so `handle` writes the freshly-allocated dispatch-id directly
     ;; into `root-id` BEFORE the trace fires the cb. Children queued
     ;; via :fx [:dispatch ...] fire later via the router queue;
     ;; epoch-cb picks them up as they land and matches them by
     ;; :parent-dispatch-id ∈ cascade-ids.
     (binding [events/*dispatch-id-capture* root-id]
       (dispatch-sync event))
     ;; Seed cascade-ids with the root so descendants whose
     ;; :parent-dispatch-id == root match on first cb fire. (Idempotent
     ;; with the cb's own swap! when the root epoch arrives.)
     (when-let [id @root-id]
       (swap! cascade-ids conj id))
     ;; Even with no children queued, schedule an initial settle
     ;; check so the root-only case resolves promptly.
     (schedule-settle-check)
     value)))
