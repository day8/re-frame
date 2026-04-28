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

   The dispatch-and-settle tests cover both root-only dispatches and
   `:fx [:dispatch ...]` cascades so the JVM queue boundary stays honest
   when `re-frame.interop/next-tick` captures dynamic bindings."
  (:require [clojure.test    :refer [deftest is testing use-fixtures]]
            [re-frame.alpha  :as rfa]
            [re-frame.core   :as rf]
            [re-frame.events :as events]
            [re-frame.interop :as interop]
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

(deftest dispatch-and-settle-captures-fx-dispatch-cascade-on-jvm
  (testing "with tracing on, a child queued from a dispatch-sync root is
            handled as a fresh queue event while retaining explicit
            parent-dispatch-id metadata for cascade attribution"
    (with-tracing-on
      (let [child-ran? (atom false)]
        (rf/reg-event-fx :trace-cascade/parent
                         (fn [_ _]
                           {:fx [[:dispatch [:trace-cascade/child]]]}))
        (rf/reg-event-db :trace-cascade/child
                         (fn [db _]
                           (reset! child-ran? true)
                           db))
        (let [p           (router/dispatch-and-settle [:trace-cascade/parent]
                                                      {:timeout-ms       2000
                                                       :settle-window-ms 1000})
              result      (deref p 3000 ::timed-out)
              root-id     (-> result :root-epoch :dispatch-id)
              child-epoch (first (:cascaded-epochs result))]
          (is (not= ::timed-out result))
          (is (true? (:ok? result)))
          (is (= [:trace-cascade/parent] (-> result :root-epoch :event)))
          (is (some? root-id))
          (is (= [:trace-cascade/child] (:event child-epoch)))
          (is (= root-id (:parent-dispatch-id child-epoch))
              "the child remains attributed to the dispatch-sync root")
          (is (true? @child-ran?)))))))

(deftest dispatch-and-settle-waits-for-declared-fx-dispatch-children-on-jvm
  (testing "trace-on dispatch-and-settle does not resolve from the
            root-only quiet window when the root epoch's effects declare
            a child dispatch that has not reached the queue yet"
    (with-tracing-on
      (let [child-ran? (atom false)]
        (rf/reg-event-fx :trace-cascade-delayed/parent
                         (fn [_ _]
                           {:fx [[:dispatch [:trace-cascade-delayed/child]]]}))
        (rf/reg-event-db :trace-cascade-delayed/child
                         (fn [db _]
                           (reset! child-ran? true)
                           db))
        (with-redefs [interop/next-tick
                      (fn [f]
                        (interop/set-timeout! f 75)
                        nil)]
          (let [p           (router/dispatch-and-settle
                             [:trace-cascade-delayed/parent]
                             {:timeout-ms       1000
                              :settle-window-ms 10})
                result      (deref p 1500 ::timed-out)
                root-id     (-> result :root-epoch :dispatch-id)
                child-epoch (first (:cascaded-epochs result))]
            (is (not= ::timed-out result))
            (is (true? (:ok? result)))
            (is (= [:trace-cascade-delayed/child] (:event child-epoch)))
            (is (= root-id (:parent-dispatch-id child-epoch)))
            (is (true? @child-ran?))))))))

(deftest dispatch-and-settle-resolves-ok-with-tracing-off
  (testing "dispatch-and-settle resolves {:ok? true} when tracing is
            DISABLED. Pre-fix, the only resolution path was the
            register-epoch-cb branch, which is gated on trace-enabled?
            and thus never fired in the default-off configuration —
            every call sat for the full :timeout-ms before returning
            {:ok? false :reason :timeout}. Post-fix, dispatch-and-settle
            falls back to add-post-event-callback when tracing is off
            so it works in the configuration most CLJ test suites
            actually run in."
    ;; trace-enabled? defaults to false; the fixture restores it after.
    (rf/reg-event-db :settle-traceless/touch
                     (fn [db _] (assoc db :touched true)))
    (let [p      (router/dispatch-and-settle [:settle-traceless/touch]
                                              {:timeout-ms       2000
                                               :settle-window-ms 50})
          result (deref p 3000 ::timed-out)]
      (is (false? trace/trace-enabled?)
          "sanity: this test runs with tracing off (the bug path)")
      (is (not= ::timed-out result)
          "promise resolved before the deref's 3s wall-clock timeout")
      (is (true? (:ok? result))
          ":ok? true — dispatch-and-settle now works when tracing is off")
      (is (= [:settle-traceless/touch] (-> result :root-epoch :event))
          ":root-epoch carries the dispatched event vector even on the
           trace-off fallback path (built from add-post-event-callback,
           not from the trace stream)")
      (is (vector? (:cascaded-epochs result))
          ":cascaded-epochs is present (default include-cascaded? true)")
      (is (empty? (:cascaded-epochs result))
          "no children dispatched — :cascaded-epochs is empty"))))

(deftest dispatch-and-settle-captures-fx-dispatch-cascade-with-tracing-off
  (testing "with tracing off, add-post-event-callback observes the root
            dispatch-sync event and its queued :fx dispatch child"
    (let [child-ran? (atom false)]
      (rf/reg-event-fx :settle-cascade/parent
                       (fn [_ _]
                         {:fx [[:dispatch [:settle-cascade/child]]]}))
      (rf/reg-event-db :settle-cascade/child
                       (fn [db _]
                         (reset! child-ran? true)
                         db))
      (let [p      (router/dispatch-and-settle [:settle-cascade/parent]
                                               {:timeout-ms       2000
                                                :settle-window-ms 1000})
            result (deref p 3000 ::timed-out)]
        (is (false? trace/trace-enabled?)
            "sanity: this test runs through the trace-off fallback")
        (is (not= ::timed-out result))
        (is (true? (:ok? result)))
        (is (= [:settle-cascade/parent] (-> result :root-epoch :event)))
        (is (= [[:settle-cascade/child]]
               (mapv :event (:cascaded-epochs result))))
        (is (true? @child-ran?))))))

(deftest dispatch-and-settle-omits-cascaded-when-disabled-with-tracing-off
  (testing "the include-cascaded? false opt-out works on the trace-off path"
    (rf/reg-event-db :settle-traceless/quiet
                     (fn [db _] db))
    (let [p      (router/dispatch-and-settle [:settle-traceless/quiet]
                                              {:timeout-ms        2000
                                               :settle-window-ms  50
                                               :include-cascaded? false})
          result (deref p 3000 ::timed-out)]
      (is (true? (:ok? result)))
      (is (not (contains? result :cascaded-epochs))
          "include-cascaded? false suppresses the key on the fallback path
           the same way it does on the trace-on path"))))

(deftest dispatch-and-settle-cancels-pending-timeouts-on-success
  (testing "Pre-fix, a successful dispatch-and-settle left its overall
            :timeout-ms timer (default 5s) sitting in the scheduler queue
            until expiry — one orphan per call. Post-fix, finish! cancels
            both the overall timer and any in-flight settle-checks via
            `interop/clear-timeout!` so the scheduler queue empties
            promptly after resolve.

            We instrument `interop/set-timeout!` and
            `interop/clear-timeout!` to count scheduled vs. cancelled
            tasks, then assert that the success path actually exercises
            the cancel API. Pre-fix this count was zero (no cancel API
            existed); post-fix it's at least one (the overall timer)."
    (let [scheduled  (atom 0)
          cancelled  (atom 0)
          orig-set   re-frame.interop/set-timeout!
          orig-clear re-frame.interop/clear-timeout!]
      (with-redefs [re-frame.interop/set-timeout!
                    (fn [f ms]
                      (swap! scheduled inc)
                      (orig-set f ms))
                    re-frame.interop/clear-timeout!
                    (fn [h]
                      (when (some? h)
                        (swap! cancelled inc))
                      (orig-clear h))]
        (rf/reg-event-db :leak-check/touch
                         (fn [db _] (assoc db :touched true)))
        (let [p      (router/dispatch-and-settle
                      [:leak-check/touch]
                      {:timeout-ms       5000
                       :settle-window-ms 50})
              result (deref p 3000 ::timed-out)]
          (is (true? (:ok? result))
              "dispatch-and-settle resolves on the success path (not :timeout)")
          (is (>= @scheduled 2)
              "at minimum the overall timer + the initial settle-check were scheduled")
          (is (>= @cancelled 1)
              "finish! cancels at least the overall :timeout-ms timer on success
               — pre-fix this was zero because no cancel API existed"))))))

;; ---------------------------------------------------------------------------
;; re-frame.core public re-exports
;; ---------------------------------------------------------------------------

(deftest core-dispatch-and-settle-default-arity-resolves-ok
  (testing "the public re-frame.core/dispatch-and-settle 1-arg arity
            delegates to the router implementation and returns the
            documented result shape"
    (rf/reg-event-db :core-public/settle-default
                     (fn [db _] (assoc db :settled true)))
    (let [p      (rf/dispatch-and-settle [:core-public/settle-default])
          result (deref p 6000 ::timed-out)]
      (is (not= ::timed-out result)
          "promise resolved before the public arity's default 5s timeout")
      (is (true? (:ok? result)))
      (is (= [:core-public/settle-default] (-> result :root-epoch :event)))
      (is (vector? (:cascaded-epochs result)))
      (is (empty? (:cascaded-epochs result))))))

(deftest core-dispatch-and-settle-two-arg-matches-router
  (testing "the public 2-arg re-export behaves like router/dispatch-and-settle
            for the same event and opts"
    (rf/reg-event-db :core-public/settle-explicit
                     (fn [db _] (update db :settle-count (fnil inc 0))))
    (let [opts          {:timeout-ms       2000
                         :settle-window-ms 50}
          public-result (deref (rf/dispatch-and-settle [:core-public/settle-explicit] opts)
                               3000
                               ::timed-out)
          router-result (deref (router/dispatch-and-settle [:core-public/settle-explicit] opts)
                               3000
                               ::timed-out)]
      (is (not= ::timed-out public-result))
      (is (not= ::timed-out router-result))
      (is (= {:ok? true
              :event [:core-public/settle-explicit]
              :cascaded-epochs []}
             {:ok? (:ok? public-result)
              :event (-> public-result :root-epoch :event)
              :cascaded-epochs (:cascaded-epochs public-result)})
          "public re-export returns the expected trace-off shape")
      (is (= {:ok? (:ok? router-result)
              :event (-> router-result :root-epoch :event)
              :cascaded-epochs (:cascaded-epochs router-result)}
             {:ok? (:ok? public-result)
              :event (-> public-result :root-epoch :event)
              :cascaded-epochs (:cascaded-epochs public-result)})
          "public wrapper and router implementation agree on observable result shape"))))

(deftest core-public-dispatch-with-symbols-are-callable
  (testing "the public dispatch-with APIs are reachable from re-frame.core"
    (let [async-delivered (promise)
          rf-ns           (get (ns-aliases 're-frame.trace-delivery-test) 'rf)]
      (rf/reg-event-db :core-public/override-smoke
                       (fn [db _]
                         (deliver async-delivered :handled)
                         (assoc db :override-smoke true)))
      (is (= #'rf/dispatch-and-settle
             (some-> rf-ns (ns-resolve 'dispatch-and-settle)))
          "alias target resolve catches public symbol drift")
      (is (nil? (rf/dispatch-with [:core-public/override-smoke] {}))
          "dispatch-with is callable through re-frame.core and matches dispatch's nil return")
      (is (= :handled (deref async-delivered 1000 ::timed-out))
          "the dispatch-with smoke event ran before fixture cleanup")
      (is (nil? (rf/dispatch-sync-with [:core-public/override-smoke] {}))
          "dispatch-sync-with is callable through re-frame.core and matches dispatch-sync's nil return"))))

(deftest core-tracing-re-exports-match-source-of-truth
  (testing "the public tracing APIs are reachable from re-frame.core"
    (is (= trace/tag-schema rf/tag-schema))
    (is (identical? trace/validate-trace? rf/validate-trace?))
    (is (identical? trace/set-validate-trace! rf/set-validate-trace!))
    (is (identical? trace/register-trace-cb rf/register-trace-cb))
    (is (identical? trace/remove-trace-cb rf/remove-trace-cb))
    (is (identical? trace/register-epoch-cb rf/register-epoch-cb))
    (is (identical? trace/remove-epoch-cb rf/remove-epoch-cb))
    (is (identical? trace/assemble-epochs rf/assemble-epochs))))

;; ---------------------------------------------------------------------------
;; re-frame.alpha public re-exports
;; ---------------------------------------------------------------------------

(deftest alpha-public-dispatch-with-symbols-are-callable
  (testing "the public dispatch-with APIs are reachable from re-frame.alpha"
    (let [async-delivered (promise)
          rfa-ns          (get (ns-aliases 're-frame.trace-delivery-test) 'rfa)]
      (rf/reg-event-db :alpha-public/override-smoke
                       (fn [db _]
                         (deliver async-delivered :handled)
                         (assoc db :alpha-override-smoke true)))
      (is (= #'rfa/dispatch-with
             (some-> rfa-ns (ns-resolve 'dispatch-with)))
          "alias target resolve catches dispatch-with symbol drift")
      (is (= #'rfa/dispatch-sync-with
             (some-> rfa-ns (ns-resolve 'dispatch-sync-with)))
          "alias target resolve catches dispatch-sync-with symbol drift")
      (is (= #'rfa/dispatch-and-settle
             (some-> rfa-ns (ns-resolve 'dispatch-and-settle)))
          "alias target resolve catches dispatch-and-settle symbol drift")
      (is (nil? (rfa/dispatch-with [:alpha-public/override-smoke] {}))
          "dispatch-with is callable through re-frame.alpha and matches dispatch's nil return")
      (is (= :handled (deref async-delivered 1000 ::timed-out))
          "the dispatch-with smoke event ran before fixture cleanup")
      (is (nil? (rfa/dispatch-sync-with [:alpha-public/override-smoke] {}))
          "dispatch-sync-with is callable through re-frame.alpha and matches dispatch-sync's nil return"))))

(deftest alpha-dispatch-and-settle-default-arity-resolves-ok
  (testing "the public re-frame.alpha/dispatch-and-settle 1-arg arity
            delegates to the router implementation and returns the
            documented result shape"
    (rf/reg-event-db :alpha-public/settle-default
                     (fn [db _] (assoc db :settled true)))
    (let [p      (rfa/dispatch-and-settle [:alpha-public/settle-default])
          result (deref p 6000 ::timed-out)]
      (is (not= ::timed-out result)
          "promise resolved before the public arity's default 5s timeout")
      (is (true? (:ok? result)))
      (is (= [:alpha-public/settle-default] (-> result :root-epoch :event)))
      (is (vector? (:cascaded-epochs result)))
      (is (empty? (:cascaded-epochs result))))))

;; ---------------------------------------------------------------------------
;; *on-dispatch-id* — deterministic root-id capture
;; ---------------------------------------------------------------------------

(deftest on-dispatch-id-receives-handle-allocated-id
  (testing "binding `events/*on-dispatch-id*` to a callback causes
            `handle` to call it with the freshly-allocated dispatch-id
            BEFORE the trace fires. This is the hook
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
          (binding [events/*on-dispatch-id* #(reset! captured %)]
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
              (binding [events/*on-dispatch-id* #(reset! captured-2 %)]
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

;; ---------------------------------------------------------------------------
;; tag-schema key-presence pins
;;
;; The `tag-schema` map at re-frame.trace is the canonical contract
;; third-party consumers (re-frame-10x, re-frame-pair, re-frame-debux,
;; custom devtools) read as the answer to "what keys can I rely on
;; for op-type X?". Several keys were added incrementally — the
;; structural pins below catch the regression where a future cleanup
;; commit silently drops a documented key from `:optional`, leaving
;; consumers reading a key that no longer matches the schema.
;;
;; Companion to validate-trace-test (which exercises the validation
;; FLOW behaviourally — set-validate-trace! true + dispatch + capture
;; warns). These are structural — they read the schema map directly,
;; so a regression in the validation flow itself can't mask them.
;; ---------------------------------------------------------------------------

(deftest tag-schema-pins-event-and-sub-run-optional-keys
  (testing ":event :optional contains :event/original — the dispatched
            event vector pinned at handle entry, before any
            interceptor runs. Consumers walking the trace tree rely
            on this being readable independently of any later
            :event-tag rewrite."
    (is (contains? (get-in trace/tag-schema [:event :optional]) :event/original)))

  (testing ":event :optional does not contain the stale pre-trace
            coeffect key :original-event. Trace consumers should read
            the emitted :event/original tag instead."
    (is (not (contains? (get-in trace/tag-schema [:event :optional]) :original-event))))

  (testing ":event :optional contains :dispatch-id — auto-generated
            UUID per `re-frame.events/handle` call. Documented as the
            cascade-correlation channel third-party tooling reads."
    (is (contains? (get-in trace/tag-schema [:event :optional]) :dispatch-id)))

  (testing ":event :optional contains :parent-dispatch-id — set on
            traces dispatched from inside an event handler (i.e. via
            :fx [:dispatch ...]). Consumers cross-reference dispatch-
            id ↔ parent-dispatch-id to rebuild the cascade tree."
    (is (contains? (get-in trace/tag-schema [:event :optional]) :parent-dispatch-id)))

  (testing ":sub/run :optional contains :input-query-vs — query-vs of
            inputs alongside :input-signals (reagent-ids). Consumers
            need both: the reagent-ids identify the reaction objects,
            the query-vs identify the *subscription* the reaction was
            built for (independent of any caching round-trips)."
    (is (contains? (get-in trace/tag-schema [:sub/run :optional]) :input-query-vs))))

(deftest event-trace-tags-stay-within-schema
  (testing "for a normal dispatch-sync, every key emitted on the
            :event trace's :tags map is in (union :required :optional)
            of the :event op-type schema entry. The inverse drift to
            the structural pins above: schema declares X but code
            emits Y. Catches the case where a future commit attaches
            a new tag at the emit site without registering it in the
            schema."
    (with-tracing-on
      (let [received (atom [])
            cb-key   (UUID/randomUUID)]
        (rf/reg-event-db :tag-schema-pin/touch
                         (fn [db _] (assoc db :touched true)))
        (try
          (trace/register-trace-cb cb-key (fn [batch] (swap! received into batch)))
          (rf/dispatch-sync [:tag-schema-pin/touch])
          (let [event-trace  (some #(when (= :event (:op-type %)) %) @received)
                emitted-keys (set (keys (:tags event-trace)))
                schema       (get trace/tag-schema :event)
                allowed      (into (:required schema) (:optional schema))
                undocumented (filterv (complement allowed) emitted-keys)]
            (is (some? event-trace)
                "sanity: an :event trace was actually delivered on the trace stream")
            (is (empty? undocumented)
                (str ":event trace emit must not carry keys absent from "
                     "(union :required :optional) of (:event tag-schema). "
                     "Undocumented keys: " undocumented)))
          (finally
            (trace/remove-trace-cb cb-key)))))))
