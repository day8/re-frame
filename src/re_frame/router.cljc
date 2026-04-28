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
        ;; On the JVM, `next-tick` uses `bound-fn`, so a queued run can
        ;; inherit dynamic event/trace bindings from the handler that scheduled it.
        ;; Each queue entry is handled as a fresh top-level event; cascade
        ;; relationships are carried explicitly on event metadata.
        (binding [events/*handling* nil
                  events/*current-dispatch-id* nil
                  events/*dispatch-id-capture* nil
                  trace/*current-trace* nil]
          (handle event-v))
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
    ;; Both helpers only do useful work when there is a parent context
    ;; to propagate FROM. `tag-with-parent-dispatch-id` reads
    ;; `*current-dispatch-id*`, which `events/handle` sets to a real id
    ;; only when tracing is enabled. `tag-with-fx-overrides` reads the
    ;; currently-handling event's `:re-frame/fx-overrides` meta, set
    ;; only by `dispatch-with`. Production hot path: tracing off + no
    ;; dispatch-with in use → both `cond->` clauses are false and
    ;; neither helper runs. Cascade hot path (dispatched from inside a
    ;; handler): `*handling*` is bound, so tag-with-fx-overrides fires
    ;; — but a single nil meta-lookup, not a full propagation, when
    ;; dispatch-with isn't in play.
    (push event-queue (cond-> event
                        events/*current-dispatch-id* tag-with-parent-dispatch-id
                        events/*handling*            tag-with-fx-overrides)))
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
;;       :overrides map         ; fx-id -> stub-fn, as in dispatch-with;
;;                              ; inherited by the synchronous cascade
;;
;; Resolves to:
;;   {:ok? true :root-epoch <epoch> :cascaded-epochs [<epoch> ...]}
;;   {:ok? false :reason :timeout :event ev :captured-epochs [...]}
;;
;; CLJS returns a JS Promise; CLJ returns a `clojure.core/promise`
;; (deref-able). Avoids a core.async dep on either platform. The
;; resolved value is a Clojure map on both platforms — JS Promises
;; carry opaque values, so CLJS callers receive the same map as CLJ
;; callers without a lossy js->clj conversion.
;;
;; Settles when the synchronous cascade quietens — the root event
;; plus every descendant whose `:parent-dispatch-id` chains back to
;; it, recursive through any depth. In-flight async effects
;; (`:http-xhrio`, etc.) are NOT awaited; their downstream
;; `:dispatch` callbacks fire later and are invisible to the
;; cascade. Callers that need to await async fx should compose a
;; separate await on whatever signal those fx fire.
;;
;; With tracing enabled the settle signal rides on
;; `register-epoch-cb` deliveries — attribution is exact, by
;; dispatch-id chain. With tracing disabled (CLJ tests, CLJS
;; production, any caller that hasn't opted in) the tracker falls
;; back to `add-post-event-callback`, which fires on every handled
;; event regardless of tracing; attribution there is by-window —
;; every event handled inside `:settle-window-ms` counts. That is
;; correct for the common test/REPL case where dispatch-and-settle
;; is the sole dispatcher, and conflated by concurrent unrelated
;; dispatches in the same isolate. Fallback-path epochs carry only
;; `{:event ev}`; trace-only fields (`:dispatch-id`,
;; `:app-db/before`, ...) are absent.
;;
;; LIMITATIONS
;;
;; - Root is dispatched via dispatch-sync internally so its
;;   :dispatch-id is captured deterministically. Calling
;;   dispatch-and-settle from inside an event handler is forbidden
;;   (re-frame.events/handle errors).
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
  ;; CLJS uses a JS Promise (resolve! captured from the executor); the
  ;; resolved value is the raw Clojure map — JS Promises carry opaque
  ;; values fine, and re-frame's CLJS callers want Clojure data without
  ;; a lossy js->clj round-trip (clj->js's :keyword-fn name strips
  ;; namespaces, collapsing keys like :app-db/before and :event/before
  ;; into the same string).
  ;; CLJ uses clojure.core/promise (deliver is idempotent under guard).
  #?(:cljs
     (let [resolve-fn (volatile! nil)
           p (js/Promise. (fn [resolve _reject]
                            (vreset! resolve-fn resolve)))
           done? (atom false)]
       {:value     p
        :resolve!  (fn [v]
                     (when (compare-and-set! done? false true)
                       (@resolve-fn v)))})
     :clj
     (let [p (promise)]
       {:value    p
        :resolve! (fn [v] (when-not (realized? p) (deliver p v)))})))

;; ---------------------------------------------------------------------------
;; Cascade tracker — abstracts trace-on vs trace-off plumbing
;;
;; Two parallel mechanisms can drive `dispatch-and-settle`:
;;   - trace-on:  trace/register-epoch-cb delivers assembled epoch records;
;;                attribution is by dispatch-id chains.
;;   - trace-off: add-post-event-callback fires after every handled event;
;;                attribution is by-window (everything in the settle window
;;                counts, since no dispatch-id is allocated).
;;
;; Both paths share the same outer state machine (settle-tick, scheduled
;; settle-checks, overall timer, cleanup). Only the subscription wiring,
;; record-keeping, and result shape differ — and that's what the tracker
;; abstracts. The body of `dispatch-and-settle` reduces to one call into
;; the tracker per phase: register, after-root-dispatched, build-result,
;; unregister.
;; ---------------------------------------------------------------------------

(defprotocol ICascadeTracker
  (-register! [_ on-cascade]
    "Subscribe to event/epoch arrivals. Calls `on-cascade` once per
     delivery that contributed something to the cascade.")
  (-unregister! [_]
    "Tear down the subscription and reset internal collections.")
  (-after-root-dispatched! [_]
    "Hook fired after `dispatch-sync` returns. Trackers that key off
     a captured root-id seed their bookkeeping here.")
  (-result [_ include-cascaded?]
    "Build the success result map, or nil if the cascade hasn't started
     yet (root not seen). Honours `include-cascaded?`.")
  (-captured [_]
    "Snapshot of collected records for the timeout result's
     `:captured-epochs` key."))

(defn- immediate-dispatch-events
  "Return event vectors synchronously queued by re-frame's built-in
   dispatch effects. `:dispatch-later` is intentionally excluded: it is
   timer-driven async work, not part of dispatch-and-settle's synchronous
   cascade contract."
  [effects]
  (letfn [(event-vectors [effect-key effect-value]
            (case effect-key
              :dispatch
              (if (vector? effect-value) [effect-value] [])

              :dispatch-n
              (if (sequential? effect-value)
                (filterv vector? (remove nil? effect-value))
                [])

              :fx
              (if (sequential? effect-value)
                (mapcat (fn [[k v]] (event-vectors k v))
                        (remove nil? effect-value))
                [])

              []))]
    (vec (mapcat (fn [[k v]] (event-vectors k v)) effects))))

(defn- decrement-pending-child [pending parent-id]
  (if parent-id
    (let [n (get pending parent-id 0)]
      (cond
        (> n 1) (assoc pending parent-id (dec n))
        (= n 1) (dissoc pending parent-id)
        :else pending))
    pending))

(defn- trace-tracker-initial-state []
  {:cascade-ids      #{}
   :seen-ids         #{}
   :cascade-epochs   []
   :pending-children {}})

(defn- accept-trace-epoch [root-id changed? state epoch]
  (let [id        (:dispatch-id epoch)
        parent-id (:parent-dispatch-id epoch)]
    (if (and (not (contains? (:seen-ids state) id))
             (or (= root-id id)
                 (contains? (:cascade-ids state) parent-id)))
      (let [expected (count (immediate-dispatch-events (:effects epoch)))]
        (reset! changed? true)
        (cond-> (-> state
                    (update :seen-ids conj id)
                    (update :pending-children decrement-pending-child parent-id)
                    (update :cascade-epochs conj epoch))
          (pos? expected) (update-in [:pending-children id] (fnil + 0) expected)
          true            (update :cascade-ids conj id)))
      state)))

(deftype TraceTracker [cb-key root-id state]
  ICascadeTracker
  (-register! [_ on-cascade]
    ;; Match by dispatch-id only: (a) :dispatch-id == root-id (root, set
    ;; inside `handle` via *dispatch-id-capture* before any cb fires), or
    ;; (b) :parent-dispatch-id ∈ cascade-ids (already-matched ancestor).
    ;; No event-vector fallback: when two callers dispatch the same vector,
    ;; vector equality is ambiguous and would mis-attribute one caller's
    ;; epoch to the other.
    (trace/register-epoch-cb cb-key
                             (fn [epochs]
                               (let [changed? (atom false)]
                                 (swap! state
                                        (fn [s]
                                          (reduce (fn [s e]
                                                    (accept-trace-epoch @root-id changed? s e))
                                                  s
                                                  epochs)))
                                 (when @changed?
                                   (on-cascade))))))
  (-unregister! [_]
    (trace/remove-epoch-cb cb-key)
    (reset! state (trace-tracker-initial-state))
    (reset! root-id nil))
  (-after-root-dispatched! [_]
    ;; Seed cascade-ids with the root so descendants whose
    ;; :parent-dispatch-id == root match on first cb fire. Idempotent
    ;; with the cb's own swap! when the root epoch arrives.
    (when-let [id @root-id]
      (swap! state update :cascade-ids conj id)))
  (-result [_ include-cascaded?]
    (when (some? @root-id)
      (let [{:keys [cascade-epochs pending-children]} @state
            eps      cascade-epochs
            root-ep  (some #(when (= @root-id (:dispatch-id %)) %) eps)
            cascaded (filterv #(not= @root-id (:dispatch-id %)) eps)]
        (when (and root-ep (empty? pending-children))
          (cond-> {:ok?        true
                   :root-epoch root-ep}
            include-cascaded? (assoc :cascaded-epochs cascaded))))))
  (-captured [_] (:cascade-epochs @state)))

(deftype PostEventTracker [post-cb-key cascade-events]
  ICascadeTracker
  (-register! [_ on-cascade]
    ;; Trace-off fallback: ride on add-post-event-callback, which fires on
    ;; every handled event regardless of trace state. Window-based
    ;; attribution — every event handled inside the settle window counts.
    (add-post-event-callback event-queue post-cb-key
                             (fn [event-v _queue]
                               (swap! cascade-events conj event-v)
                               (on-cascade))))
  (-unregister! [_]
    (remove-post-event-callback event-queue post-cb-key)
    (reset! cascade-events []))
  (-after-root-dispatched! [_])
  (-result [_ include-cascaded?]
    ;; cascade-events is in handled-order, so its head is the root we
    ;; just dispatch-sync'd. Synthesise minimal {:event ev} records —
    ;; the trace-derived :dispatch-id, :app-db/before, etc. are
    ;; trace-machinery-only.
    (let [evs @cascade-events]
      (when (seq evs)
        (cond-> {:ok?        true
                 :root-epoch {:event (first evs)}}
          include-cascaded? (assoc :cascaded-epochs (mapv (fn [ev] {:event ev}) (rest evs)))))))
  ;; The trace-off path doesn't accumulate epoch records, only raw
  ;; event vectors. The timeout result's :captured-epochs key is
  ;; documented as a vec of epoch records, so report empty on this
  ;; path rather than mixing shapes — preserves the shape contract
  ;; that the old single-fn implementation inherited by always reading
  ;; the (untouched-on-trace-off) cascade-epochs atom.
  (-captured [_] []))

(defn- mk-tracker [root-id]
  (if (trace/is-trace-enabled?)
    (->TraceTracker (new-uuid) root-id (atom (trace-tracker-initial-state)))
    (->PostEventTracker (new-uuid) (atom []))))

(defn dispatch-and-settle
  "Dispatch `event` synchronously, then await the cascade of
   `:fx [:dispatch ...]` children. See the long comment above for
   shape, semantics, and limitations."
  ([event] (dispatch-and-settle event {}))
  ([event opts]
   (let [opts (or opts {})
         {:keys [timeout-ms settle-window-ms include-cascaded?]
          :or   {timeout-ms 5000 settle-window-ms 100 include-cascaded? true}} opts
         dispatch-event (if (contains? opts :overrides)
                          (vary-meta event assoc :re-frame/fx-overrides (:overrides opts))
                          event)
         {:keys [value resolve!]} (mk-deferred)
         root-id        (atom nil)
         tracker        (mk-tracker root-id)
         settle-tick    (atom 0)            ;; bumped on each cascade signal
         cleaned?       (atom false)
         overall-timer  (atom nil)              ;; handle for the :timeout-ms timer
         settle-timers  (atom [])               ;; handles for in-flight settle-checks
         ;; Cleanup is single-shot: settle-check and the overall
         ;; timeout both call `finish!`, but only the first wins
         ;; (deliver/resolve! is idempotent). Without the guard, the
         ;; second finish! re-removes the post-event-callback —
         ;; harmless on the trace-on path where remove-epoch-cb is a
         ;; bare `swap! ... dissoc`, but `remove-post-event-callback`
         ;; warns if the id is already gone.
         ;;
         ;; On cleanup we cancel the still-pending scheduled tasks
         ;; (overall :timeout-ms timer + any in-flight settle-checks)
         ;; AND empty the tracker's collections. The cancel keeps the
         ;; scheduler queue clean — pre-fix, every successful
         ;; `dispatch-and-settle` left an orphan timer pending up to
         ;; :timeout-ms (default 5s) past resolve. The tracker reset is
         ;; defence-in-depth: if a task fires concurrently with cancel
         ;; (or `clear-timeout!` is no-op for an already-running
         ;; task), it observes empty atoms instead of stale state.
         finish!        (fn [result]
                          (when (compare-and-set! cleaned? false true)
                            (-unregister! tracker)
                            (interop/clear-timeout! @overall-timer)
                            (doseq [h @settle-timers]
                              (interop/clear-timeout! h))
                            (reset! settle-timers []))
                          (resolve! result))
         schedule-settle-check
                        (fn schedule-settle-check []
                          (let [tick @settle-tick
                                handle (interop/set-timeout!
                                        (fn []
                                          ;; Belt-and-suspenders gate: `finish!`
                                          ;; cancels in-flight settle-checks, but a
                                          ;; task already mid-execution when cancel
                                          ;; lands still runs — `(not @cleaned?)`
                                          ;; keeps it from working off cleared state.
                                          (when (and (not @cleaned?)
                                                     (= tick @settle-tick))
                                            (when-let [result (-result tracker include-cascaded?)]
                                              (finish! result))))
                                        settle-window-ms)]
                            (swap! settle-timers conj handle)))]
     (-register! tracker
                 (fn []
                   (swap! settle-tick inc)
                   (schedule-settle-check)))
     ;; Overall timeout — fires regardless of cascade activity.
     ;; Capture the handle so `finish!` can cancel it on the success path.
     (reset! overall-timer
             (interop/set-timeout!
              (fn []
                (finish! {:ok?             false
                          :reason          :timeout
                          :event           event
                          :captured-epochs (-captured tracker)}))
              timeout-ms))
     ;; Dispatch the root synchronously, binding `*dispatch-id-capture*`
     ;; so `handle` writes the freshly-allocated dispatch-id directly
     ;; into `root-id` BEFORE the trace fires the cb. Children queued
     ;; via :fx [:dispatch ...] fire later via the router queue;
     ;; epoch-cb picks them up as they land and matches them by
     ;; :parent-dispatch-id ∈ cascade-ids. With tracing off, `handle`
     ;; leaves root-id nil because it only reads *dispatch-id-capture*
     ;; when tracing is enabled; the
     ;; post-event-callback fallback path picks up events by ordering
     ;; instead.
     (binding [events/*dispatch-id-capture* root-id]
       (dispatch-sync dispatch-event))
     (-after-root-dispatched! tracker)
     ;; Even with no children queued, schedule an initial settle
     ;; check so the root-only case resolves promptly.
     (schedule-settle-check)
     value)))
