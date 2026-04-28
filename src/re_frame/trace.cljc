(ns re-frame.trace
  "Tracing for re-frame.
  Alpha quality, subject to change/break at any time."
  #?(:cljs (:require-macros [net.cgrand.macrovich :as macros]
                            [re-frame.trace :refer [finish-trace with-trace merge-trace!]]))
  (:require [clojure.set]
            [re-frame.interop :as interop]
            [re-frame.loggers :refer [console]]
            #?(:clj [net.cgrand.macrovich :as macros])
            #?(:cljs [goog.functions])))

(defonce id (atom 0))
(def ^:dynamic *current-trace* nil)

(defn reset-tracing! []
  (reset! id 0))

;; Trace-tag schema. The shape of `:tags` for each
;; `:op-type` is, today, a contract by inspection: every downstream
;; consumer (re-frame-10x, re-frame-debux, re-frame-pair, custom
;; devtools) reads these keys, but the trace ns docstring still
;; self-labels as "Alpha quality". This var is the doc-only
;; contract — the canonical answer to "what keys can I rely on?".
;;
;; Doc-only by default. With `validate-trace?` true (a runtime atom
;; flag, opt-in for dev), `finish-trace` will assert that emitted
;; tags conform — required keys present, no unknown keys without
;; explicit allowance. Production builds leave the flag false; the
;; whole machinery is gated on `(is-trace-enabled?)` which itself
;; defaults false.

(def tag-schema
  "Schema for `:tags` of every op-type re-frame emits. Entries:

       <op-type> {:required #{<key> ...}    ; tags every emit MUST carry
                  :optional #{<key> ...}    ; tags an emit MAY carry
                  :doc      \"...\"}        ; one-liner — what the trace marks

   `:tags` is a map; keys not listed under `:required` or `:optional`
   for the matching op-type are 'unknown' and (when
   `(validate-trace?)` is true) raise a console warning so consumers
   can spot drift early.

   This schema is the load-bearing contract for downstream tooling.
   Adding a key = additive, no version bump. Renaming or removing a
   key = breaking, must be staged with a deprecation cycle. The
   doc-only / opt-in posture means production builds pay zero cost
   for the contract — the schema lives here as a reference, and
   only flips on under explicit dev opt-in."
  {:event
   {:required #{:event}
    :optional #{:app-db-before :app-db-after :coeffects :effects
                :interceptors
                ;; Auto-generated dispatch correlation.
                :dispatch-id :parent-dispatch-id
                ;; Dispatched event vector pinned at `handle` entry,
                ;; before any interceptor runs. Always present on
                ;; re-frame core's `:event` traces; listed under
                ;; `:optional` so third-party emitters of `:event`
                ;; op-type aren't forced to set it.
                :event/original
                ;; debux's `:code` payload — written via merge-trace!
                ;; from outside re-frame core (re-frame-debux's
                ;; common/util.cljc). Documented here as the channel
                ;; downstream consumers can rely on.
                :code}
    :doc "Top-level dispatch — fired by re-frame.router/dispatch / dispatch-sync."}

   :event/handler
   {:required #{}
    ;; Core re-frame's std_interceptors open `:event/handler` with no
    ;; `:tags` map — `:effects` / `:coeffects` are merged onto the
    ;; PARENT `:event` trace by the immediately-following
    ;; `merge-trace!` (the comment at the emit site documents the
    ;; intent). `:event` listed under `:optional` so third-party
    ;; emitters that DO attach the dispatched vector at handler
    ;; scope aren't flagged as unknown.
    :optional #{:event :dispatch-id :parent-dispatch-id}
    :doc "The user's reg-event-* fn body, fired inside the event interceptor chain."}

   :event/do-fx
   {:required #{}
    :optional #{:dispatch-id :parent-dispatch-id}
    :doc "do-fx interceptor — fires registered fx handlers for the event's :effects map."}

   :sub/create
   {:required #{:query-v}
    :optional #{:cached? :reaction
                ;; Legacy 2-arity (dynv) path: `(subscribe [::sub]
                ;; [reagent-atom ...])` opens `:sub/create` with the
                ;; dynv vector attached. Documented here so the lint
                ;; doesn't fire on every dynv subscribe.
                :dyn-v}
    :doc "Subscribe call — either resolves from the reaction cache (`:cached? true`) or builds a new reaction."}

   :sub/run
   {:required #{:query-v :reaction}
    :optional #{:value :input-signals
                ;; Query-vs of inputs, alongside :input-signals (reagent-ids).
                :input-query-vs
                ;; Set on the dynv path — see `:sub/create` above.
                :dyn-v}
    :doc "Subscription compute fn ran. Result is in :value."}

   :sub/dispose
   {:required #{:query-v :reaction}
    :optional #{}
    :doc "Reaction garbage-collected (Reagent on-dispose)."}

   :render
   {:required #{}
    :optional #{:component-name :reaction}
    :doc "Component render — emitted by re-frame-10x's reagent patch (NOT by re-frame core); included here so the schema covers what consumers actually read."}

   :raf
   {:required #{}
    :optional #{}
    :doc "Reagent next-tick boundary — emitted by re-frame-10x's batching patch."}

   :raf-end
   {:required #{}
    :optional #{}
    :doc "End of the reagent next-tick batch — emitted by re-frame-10x's batching patch."}

   :reagent/quiescent
   {:required #{}
    :optional #{}
    :doc "Reagent render queue is idle — emitted by re-frame-10x's batching patch."}

   :sync
   {:required #{}
    :optional #{}
    :doc "End-of-`dispatch-sync` marker."}})

(defonce ^:private validate-trace?-flag (atom false))

(defn validate-trace?
  "True iff the runtime should validate that emitted trace `:tags`
   conform to `tag-schema`. Off by default; toggle with
   `set-validate-trace!`. Intended for dev / CI; production builds
   should leave it off (the trace machinery is itself gated on
   `is-trace-enabled?`, but validation adds a per-trace map-walk
   that's not free)."
  []
  @validate-trace?-flag)

(defn set-validate-trace!
  "Enable / disable trace-tag validation. When true, every
   `finish-trace` checks `:tags` against `tag-schema` and warns via
   `console :warn` on missing required keys or unknown keys."
  [enabled?]
  (reset! validate-trace?-flag (boolean enabled?)))

(defn check-trace-against-schema
  "Walk a finished trace map and warn about missing/unknown tag
   keys for its op-type. No-op when op-type isn't in the schema —
   third-party op-types stay unconstrained.

   Public because `finish-trace` is a macro that expands in the
   caller's namespace (`re-frame.events`, custom instrumentation,
   etc.); a private var here would fail the var-resolution check
   when the expansion's `(check-trace-against-schema ...)` form
   compiles in the caller. Callers shouldn't invoke this directly
   — it's part of the validation flow gated by
   `validate-trace?`."
  [trace]
  (when-let [{:keys [required optional doc]} (get tag-schema (:op-type trace))]
    (let [tags    (or (:tags trace) {})
          present (set (keys tags))
          missing (clojure.set/difference required present)
          allowed (clojure.set/union required optional)
          unknown (clojure.set/difference present allowed)]
      (when (seq missing)
        (console :warn "re-frame.trace: trace" (:id trace) "of op-type"
                 (:op-type trace) "is missing required tag key(s)"
                 missing "— see re-frame.trace/tag-schema."))
      (when (seq unknown)
        (console :warn "re-frame.trace: trace" (:id trace) "of op-type"
                 (:op-type trace) "carries unknown tag key(s)" unknown
                 "— either register them in re-frame.trace/tag-schema"
                 "or treat them as not-part-of-the-public-contract.")))))

#?(:cljs (goog-define trace-enabled? false)
   :clj  (def ^boolean trace-enabled? false))

(defn ^boolean is-trace-enabled?
  "See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details"
  ;; We can remove this extra step of type hinting indirection once our minimum CLJS version includes
  ;; https://dev.clojure.org/jira/browse/CLJS-1439
  ;; r1.10.63 is the first version with this:
  ;; https://github.com/clojure/clojurescript/commit/9ec796d791b1b2bd613af2f62cdecfd25caa6482
  []
  trace-enabled?)

(defonce trace-cbs (atom {}))
(defonce traces (atom []))
(defonce next-delivery (atom 0))

(defn register-trace-cb
  "Registers a tracing callback function which will receive a collection of one or more traces.
  Will replace an existing callback function if it shares the same key."
  [key f]
  (if trace-enabled?
    (swap! trace-cbs assoc key f)
    (console :warn "Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation.")))

(defn remove-trace-cb [key]
  (swap! trace-cbs dissoc key)
  nil)

;; register-epoch-cb. Higher-
;; level callback that delivers ASSEMBLED EPOCH records — one per
;; `:event` trace — instead of the raw trace stream that
;; `register-trace-cb` exposes. Downstream consumers (re-frame-pair,
;; re-frame-10x, custom devtools) want the "this dispatch's full
;; cascade is here, partitioned for me" surface; shipping it once
;; in re-frame core means each tool stops re-implementing the
;; partition logic.
;;
;; The epoch shape:
;;
;;   {:id                 <int>      ; the :event trace's id
;;    :event              [<kw> ...] ; event vector as carried on the :event tag (may have been rewritten by an interceptor)
;;    :event/original     [<kw> ...] ; dispatched event vector, pinned at handle entry — pre-interceptor
;;    :dispatch-id        <uuid>
;;    :parent-dispatch-id <uuid|nil> ; nil for user-fired top-level
;;    :app-db/before      {...}      ; pulled from the :event trace's :tags
;;    :app-db/after       {...}
;;    :coeffects          {...}
;;    :effects            {...}
;;    :interceptors       [<map> ...] ; full records (callers can project to ids)
;;    :sub-runs           [<trace> ...] ; child traces by op-type
;;    :sub-creates        [<trace> ...]
;;    :event-handler      <trace>
;;    :event-do-fx        <trace>
;;    :start :end :duration            ; from the :event trace}
;;
;; Fires once per `:event` trace — one cb invocation per
;; `re-frame.events/handle` entry, whether the event was user-fired
;; or queued by a parent's `:fx [:dispatch ...]`. Each record carries
;; its own `:dispatch-id` and `:parent-dispatch-id`; consumers that
;; want a tree-shaped view of "user-fired event + all chained
;; children" build it post-delivery by walking parent-id pointers.
;;
;; Lives alongside `register-trace-cb` — same gating
;; (`is-trace-enabled?` + `trace-enabled?`), same delivery
;; (debounce-based `schedule-debounce`, ~50ms after the last trace).
;; The cascade-settled signal that some consumers want (after async
;; fx like HTTP return) lives separately under `dispatch-and-settle`
;; — keeping the two decoupled is what lets register-epoch-cb ship
;; without depending on async-settle infrastructure.

(defonce epoch-cbs (atom {}))

(defn register-epoch-cb
  "Register a callback `f` keyed on `key` that will receive a
   collection of one or more assembled EPOCH records — one per
   `:event` trace in each delivery batch. See the namespace docstring
   above `epoch-cbs` for the epoch shape and the four cascade /
   assembly-location decisions.

   Like `register-trace-cb`: gated on `trace-enabled?`; replaces an
   existing cb sharing the same key; warns when tracing is disabled."
  [key f]
  (if trace-enabled?
    (swap! epoch-cbs assoc key f)
    (console :warn "re-frame.trace: register-epoch-cb skipped — tracing is not enabled. Set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines.")))

(defn remove-epoch-cb [key]
  (swap! epoch-cbs dissoc key)
  nil)

(defn next-id [] (swap! id inc))

(defn start-trace [{:keys [operation op-type tags child-of]}]
  {:id        (next-id)
   :operation operation
   :op-type   op-type
   :tags      tags
   :child-of  (or child-of (:id *current-trace*))
   :start     (interop/now)})

;; On delivering traces to registered cbs
;;
;; CLJS: debounced batches. `goog.functions/debounce` coalesces a
;; burst of trace fires (event + sub/runs + handler + do-fx) and
;; delivers them all at once 10–50 ms after the LAST trace lands.
;; Batches efficiently and keeps cb work off the critical path.
;; A lightweight `next-delivery` gate sits on top of the debouncer
;; to avoid constant set/cancel of timeouts.
;;
;; CLJ: synchronous on the outermost trace's finish. There is no
;; goog.functions on JVM and no event loop to schedule a debounced
;; deliver against. `*current-trace*` is the trace whose
;; `finish-trace` is firing; if its `:child-of` is nil, no enclosing
;; trace remains on the stack — the burst is complete and we deliver
;; the accumulated batch then. Same delivery boundary as CLJS (one
;; dispatch-sync's worth of traces, end-to-end), no timer dependency.
;;
;; History: the CLJ branch of `debounce` previously read `(f)` —
;; INVOKING f at namespace load and binding `schedule-debounce` to
;; `(reset! traces [])`'s return value (`[]`). Every subsequent
;; `(schedule-debounce)` call threw ArityException, silently breaking
;; CLJ-side `register-epoch-cb` and `dispatch-and-settle`.

(def debounce-time 50)

(defn debounce [f interval]
  #?(:cljs (goog.functions/debounce f interval)
     :clj  f))

(defn assemble-epochs
  "Walk a batch of finished traces; emit one epoch record per
   `:event` trace. Child traces are partitioned via the
   `:child-of` link `start-trace` already populates from
   `*current-trace*`.

   KNOWN LIMITATIONS

   - `:render` traces fire on a later RAF tick (after the user's
     event handler has returned), with `*current-trace*` either
     unbound or in some outer scope. They typically have
     `:child-of` nil, so this assembly DOESN'T attach them to the
     parent epoch. Consumers that want renders should subscribe
     to `register-trace-cb` and correlate by time / op-type — same
     as 10x does today via its own batching patch.

   - Only direct `:child-of` children are picked up. Grandchildren
     (e.g. a `:sub/run` whose ratom-deref triggers another
     `:sub/run`) live as separate `:sub/run` entries on this same
     epoch — flat, not nested. The trace tree's full shape is in
     the underlying trace stream for callers that want it."
  [batch]
  (let [by-parent (group-by :child-of batch)
        events    (filter #(= :event (:op-type %)) batch)]
    (mapv (fn [event-tr]
            (let [event-id (:id event-tr)
                  children (get by-parent event-id [])
                  by-op    (group-by :op-type children)
                  tags     (:tags event-tr)]
              {:id                 event-id
               :event              (:event tags)
               :event/original     (:event/original tags)
               :dispatch-id        (:dispatch-id tags)
               :parent-dispatch-id (:parent-dispatch-id tags)
               :app-db/before      (:app-db-before tags)
               :app-db/after       (:app-db-after tags)
               :coeffects          (:coeffects tags)
               :effects            (:effects tags)
               :interceptors       (:interceptors tags)
               :sub-runs           (vec (:sub/run by-op))
               :sub-creates        (vec (:sub/create by-op))
               :event-handler      (first (:event/handler by-op))
               :event-do-fx        (first (:event/do-fx by-op))
               :start              (:start event-tr)
               :end                (:end event-tr)
               :duration           (:duration event-tr)}))
          events)))

(def schedule-debounce
  (debounce
   (fn tracing-cb-debounced []
     (let [batch @traces]
       (doseq [[k cb] @trace-cbs]
         (try (cb batch)
              #?(:clj (catch Exception e
                        (console :error "Error thrown from trace cb" k "while storing" batch e)))
              #?(:cljs (catch :default e
                         (console :error "Error thrown from trace cb" k "while storing" batch e)))))
       ;; Also deliver assembled epochs to register-epoch-cb
       ;; consumers. Only assemble when at least one cb is registered;
       ;; otherwise skip the per-batch group-by walk entirely.
       (when (seq @epoch-cbs)
         (let [epochs (assemble-epochs batch)]
           (doseq [[k cb] @epoch-cbs]
             (try (cb epochs)
                  #?(:clj (catch Exception e
                            (console :error "Error thrown from epoch cb" k "while delivering" (count epochs) "epoch(s)" e)))
                  #?(:cljs (catch :default e
                             (console :error "Error thrown from epoch cb" k "while delivering" (count epochs) "epoch(s)" e))))))))
     (reset! traces []))
   debounce-time))

#?(:cljs
   (defn run-tracing-callbacks! [now]
     ;; Optimised debounce — only re-arm when we're close to the next
     ;; delivery, to avoid constant set/cancel of timeouts. The actual
     ;; deliver happens debounce-time ms after the LAST call, batching
     ;; the whole burst.
     (when (< (- @next-delivery 25) now)
       (schedule-debounce)
       ;; next-delivery is not perfectly accurate (scheduling itself
       ;; takes time) but good enough for the gate.
       (reset! next-delivery (+ now debounce-time))))

   :clj
   (defn run-tracing-callbacks! [_now]
     ;; Sync delivery on the outermost trace's finish — `:child-of` nil
     ;; means no enclosing trace remains on the stack, so the burst is
     ;; complete. Inner trace finishes accumulate into `traces` and
     ;; skip delivery; the outermost finish ships the whole batch.
     (when (nil? (:child-of *current-trace*))
       (schedule-debounce))))

(macros/deftime
  (defmacro finish-trace [trace]
    `(when (is-trace-enabled?)
       (let [end#      (interop/now)
             duration# (- end# (:start ~trace))
             finished# (assoc ~trace
                              :duration duration#
                              :end (interop/now))]
         (when (validate-trace?)
           (check-trace-against-schema finished#))
         (swap! traces conj finished#)
         (run-tracing-callbacks! end#))))

  (defmacro with-trace
    "Create a trace inside the scope of the with-trace macro

          Common keys for trace-opts
          :op-type - what kind of operation is this? e.g. :sub/create, :render.
          :operation - identifier for the operation, for a subscription it would be the subscription keyword
          :tags - a map of arbitrary kv pairs"
    [{:keys [operation op-type tags child-of] :as trace-opts} & body]
    `(if (is-trace-enabled?)
       (binding [*current-trace* (start-trace ~trace-opts)]
         (try ~@body
              (finally (finish-trace *current-trace*))))
       (do ~@body)))

  (defmacro merge-trace! [m]
     ;; Overwrite keys in tags, and all top level keys.
    `(when (is-trace-enabled?)
       (let [new-trace# (-> (update *current-trace* :tags merge (:tags ~m))
                            (merge (dissoc ~m :tags)))]
         (set! *current-trace* new-trace#))
       nil)))
