(ns re-frame.trace-delivery-test
  "Tests that CLJ-side trace delivery actually fires the cbs registered
   via `register-trace-cb` / `register-epoch-cb` — the prerequisite for
   `dispatch-and-settle` to resolve via its `{:ok? true}` branch on JVM
   at all.

   Pre-fix history: `re-frame.trace/schedule-debounce` was bound at
   namespace load to `(reset! traces [])`'s return value (the empty
   vector) because the CLJ branch of `debounce` read `(f)` instead of
   returning a callable. Subsequent `(schedule-debounce)` calls threw
   ArityException, silently breaking trace delivery on JVM.
   `register-epoch-cb` registered cbs never fired; `dispatch-and-settle`
   could only resolve via its timeout branch.

   Post-fix: CLJ delivers synchronously inside `run-tracing-callbacks!`
   when the outermost trace finishes (`:child-of` nil). Same delivery
   boundary as one dispatch-sync's worth of traces, no timer dependency.

   COVERAGE LIMITATION

   These tests cover only the no-cascade case: a single dispatch-sync
   with no `:fx [:dispatch ...]` children. The cascade case
   (parent dispatched via dispatch-sync triggers child via :fx [:dispatch])
   is currently broken on JVM by an unrelated pre-existing issue —
   `re-frame.interop/next-tick` uses `bound-fn`, which over-captures the
   parent's `re-frame.events/*handling*` binding onto the executor
   thread; when the executor runs `handle :child`, the spurious
   *handling* trips re-frame's reentry check and the child silently
   never runs. Tracked separately under rf-9wg."
  (:require [clojure.test    :refer [deftest is testing use-fixtures]]
            [re-frame.core   :as rf]
            [re-frame.events :as events]
            [re-frame.router :as router]
            [re-frame.trace  :as trace])
  (:import [java.util UUID]))

(defn fixture-clean-state
  "Restore handlers and the trace flag between tests so a flag left
   flipped by an assertion failure can't poison the next test."
  [f]
  (let [restore (rf/make-restore-fn)
        before  trace/trace-enabled?]
    (try
      (f)
      (finally
        (alter-var-root #'trace/trace-enabled? (constantly before))
        (reset! trace/traces [])
        (restore)))))

(use-fixtures :each fixture-clean-state)

(defmacro ^:private with-tracing-on
  "Flip trace-enabled? true for body and restore on exit."
  [& body]
  `(do
     (alter-var-root #'trace/trace-enabled? (constantly true))
     (try
       ~@body
       (finally
         (alter-var-root #'trace/trace-enabled? (constantly false))))))

;; ---------------------------------------------------------------------------
;; register-trace-cb — raw trace delivery
;; ---------------------------------------------------------------------------

(deftest register-trace-cb-fires-after-dispatch-sync-on-jvm
  (testing "a register-trace-cb cb is invoked with the dispatch's traces
            after dispatch-sync on JVM — confirms the basic delivery
            path works end-to-end (the lower-level guarantee that
            register-epoch-cb and dispatch-and-settle ride on).

            CLJ delivery is sync per-burst: dispatch-sync produces TWO
            bursts (the :event burst from `handle`, then the trailing
            :sync trace), so the cb fires more than once. The test
            accumulates."
    (with-tracing-on
      (let [received (atom [])
            cb-key   (UUID/randomUUID)]
        (rf/reg-event-db :trace-delivery/inc
                         (fn [db _] (update db :n (fnil inc 0))))
        (try
          (trace/register-trace-cb cb-key (fn [batch] (swap! received into batch)))
          (rf/dispatch-sync [:trace-delivery/inc])
          (let [all @received]
            (is (pos? (count all))
                "delivery happened — pre-fix, schedule-debounce was [] and (schedule-debounce) threw")
            (is (some #(= :event (:op-type %)) all)
                "the :event trace from the dispatch is in the accumulated traces")
            (is (some #(= :sync (:op-type %)) all)
                "dispatch-sync's trailing :sync trace is in the accumulated traces"))
          (finally
            (trace/remove-trace-cb cb-key)))))))

;; ---------------------------------------------------------------------------
;; register-epoch-cb — assembled-epoch delivery
;; ---------------------------------------------------------------------------

(deftest register-epoch-cb-fires-after-dispatch-sync-on-jvm
  (testing "a register-epoch-cb cb is invoked with the assembled epoch
            after dispatch-sync — pre-fix, this never fired on JVM
            (the trace-delivery callsite was broken so assemble-epochs
            never ran).

            CLJ delivery may fire the cb more than once per dispatch-sync
            (one per burst: :event burst, then the :sync trace burst);
            assemble-epochs on the :sync-only batch returns []. Test
            accumulates non-empty epoch deliveries."
    (with-tracing-on
      (let [received (atom [])
            cb-key   (UUID/randomUUID)]
        (rf/reg-event-db :trace-delivery/touch
                         (fn [db _] (assoc db :touched true)))
        (try
          (trace/register-epoch-cb cb-key (fn [epochs] (swap! received into epochs)))
          (rf/dispatch-sync [:trace-delivery/touch])
          (is (= 1 (count @received))
              "exactly one epoch — one dispatch-sync, one :event trace, one epoch")
          (let [epoch (first @received)]
            (is (= [:trace-delivery/touch] (:event epoch))
                ":event tag carries the dispatched vector")
            (is (= [:trace-delivery/touch] (:event/original epoch))
                ":event/original carries the dispatched vector")
            (is (some? (:dispatch-id epoch))
                "an auto-generated :dispatch-id rides on the epoch")
            (is (nil? (:parent-dispatch-id epoch))
                "user-fired top-level event has no parent dispatch id"))
          (finally
            (trace/remove-epoch-cb cb-key)))))))

;; ---------------------------------------------------------------------------
;; dispatch-and-settle — end-to-end {:ok? true} branch on JVM
;; ---------------------------------------------------------------------------

(deftest dispatch-and-settle-resolves-ok-on-jvm
  (testing "dispatch-and-settle returns {:ok? true ...} on JVM (not just
            :timeout). Pre-fix, the epoch cb never fired so the cascade
            tracker never matched the root, never set root-id, and the
            settle-check skipped the resolve — every call timed out."
    (with-tracing-on
      (rf/reg-event-db :trace-delivery/settle-touch
                       (fn [db _] (assoc db :touched true)))
      (let [p      (router/dispatch-and-settle [:trace-delivery/settle-touch]
                                               {:timeout-ms       2000
                                                :settle-window-ms 50})
            result (deref p 3000 ::timed-out)]
        (is (not= ::timed-out result)
            "promise resolved before the deref's 3s wall-clock timeout")
        (is (true? (:ok? result))
            ":ok? true — the cascade settled normally, not via the timeout branch")
        (is (= [:trace-delivery/settle-touch] (-> result :root-epoch :event))
            ":root-epoch carries the dispatched event vector")
        (is (vector? (:cascaded-epochs result))
            ":cascaded-epochs is present (default include-cascaded? true)")
        (is (empty? (:cascaded-epochs result))
            "no children dispatched — :cascaded-epochs is empty")))))

;; ---------------------------------------------------------------------------
;; *dispatch-id-capture* — deterministic root-id capture
;; ---------------------------------------------------------------------------

(deftest dispatch-id-capture-receives-handle-allocated-id
  (testing "binding `events/*dispatch-id-capture*` to an atom causes
            `handle` to reset! that atom with the freshly-allocated
            dispatch-id BEFORE the trace fires. This is the hook
            dispatch-and-settle uses to identify the root of its
            cascade WITHOUT relying on event-vector equality.

            Cross-checks the captured id against the :dispatch-id tag
            on the :event trace via a register-trace-cb side-channel —
            we can't read @trace/traces post-dispatch on JVM because the
            sync delivery resets it at end-of-burst."
    (with-tracing-on
      (rf/reg-event-db :capture-test/touch
                       (fn [db _] (assoc db :touched true)))
      (let [captured  (atom nil)
            seen-tags (atom [])
            cb-key    (UUID/randomUUID)]
        (try
          (trace/register-trace-cb cb-key
                                   (fn [batch]
                                     (doseq [t batch
                                             :when (and (= :event (:op-type t))
                                                        (= [:capture-test/touch]
                                                           (-> t :tags :event)))]
                                       (swap! seen-tags conj (:tags t)))))
          (binding [events/*dispatch-id-capture* captured]
            (rf/dispatch-sync [:capture-test/touch]))
          (is (uuid? @captured)
              "the captured value is the UUID handle allocated for this dispatch")
          (is (= 1 (count @seen-tags))
              "exactly one matching :event trace fired for this dispatch")
          (is (= @captured (-> @seen-tags first :dispatch-id))
              "the captured id is the same UUID `handle` wrote into the :event trace tags")
          (testing "two consecutive captures yield distinct ids — proves the hook
                    fires per-dispatch, not once-and-cached"
            (let [captured-2 (atom nil)]
              (binding [events/*dispatch-id-capture* captured-2]
                (rf/dispatch-sync [:capture-test/touch]))
              (is (uuid? @captured-2))
              (is (not= @captured @captured-2))))
          (finally
            (trace/remove-trace-cb cb-key)))))))

;; ---------------------------------------------------------------------------
;; dispatch-and-settle — concurrent same-vector regression (rf-6q6)
;; ---------------------------------------------------------------------------

(deftest dispatch-and-settle-distinguishes-concurrent-same-vector
  (testing "two dispatch-and-settle calls with identical event vectors
            resolve to DISTINCT root epochs (matched by :dispatch-id,
            not event-vector). Pre-fix, the cb's event-vector-equality
            bootstrap could adopt the first batch entry's id as root
            for both callers, collapsing the two cascades into one."
    (with-tracing-on
      (rf/reg-event-db :concurrent/foo
                       (fn [db _] (update db :foo-count (fnil inc 0))))
      (let [p1 (router/dispatch-and-settle [:concurrent/foo]
                                           {:timeout-ms       2000
                                            :settle-window-ms 50})
            p2 (router/dispatch-and-settle [:concurrent/foo]
                                           {:timeout-ms       2000
                                            :settle-window-ms 50})
            r1 (deref p1 3000 ::timed-out)
            r2 (deref p2 3000 ::timed-out)]
        (is (true? (:ok? r1)) "first call resolves :ok?")
        (is (true? (:ok? r2)) "second call resolves :ok?")
        (let [id1 (-> r1 :root-epoch :dispatch-id)
              id2 (-> r2 :root-epoch :dispatch-id)]
          (is (some? id1) "first call's root epoch carries a dispatch-id")
          (is (some? id2) "second call's root epoch carries a dispatch-id")
          (is (not= id1 id2)
              "each call gets its OWN root epoch — vector-equality match
               would have collided here, since both event vectors are equal"))))))
