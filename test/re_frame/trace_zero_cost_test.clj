(ns re-frame.trace-zero-cost-test
  "Asserts that trace-only bookkeeping (auto :dispatch-id +
   :input-query-vs) is INERT when tracing is disabled.

   Dispatch tracing allocates a fresh UUID per `re-frame.events/handle`
   call; subscription tracing walks input signals in
   `deref-input-signals`. Both were initially unconditional —
   contradicting re-frame's load-bearing guarantee that tracing-off ==
   zero cost. Subs re-run on every transitive deref change and dispatches
   fire on every user action, so even a few microseconds per call shows
   up under profiling.

   Strategy: redefine the per-call work (`new-uuid`, `to-seq`)
   to counter functions, exercise the hot path with `trace-enabled?`
   in both states, and assert the call count is 0 when off."
  (:require [clojure.test    :refer [deftest is testing use-fixtures]]
            [re-frame.core   :as rf]
            [re-frame.db     :as db]
            [re-frame.events :as events]
            [re-frame.fx     :as fx]
            [re-frame.interop :as interop]
            [re-frame.router :as router]
            [re-frame.subs   :as subs]
            [re-frame.trace  :as trace]))

(defn fixture-clean-state
  "Restore handlers, app-db, and trace flag between tests so a flag
   left flipped by an assertion failure can't poison the next test."
  [f]
  (let [restore (rf/make-restore-fn)
        before  trace/trace-enabled?]
    (try
      (f)
      (finally
        (alter-var-root #'trace/trace-enabled? (constantly before))
        (restore)))))

(use-fixtures :each fixture-clean-state)

(defmacro ^:private with-tracing-on
  "Flip trace-enabled? true for the body, restore on exit."
  [& body]
  `(do
     (alter-var-root #'trace/trace-enabled? (constantly true))
     (try
       ~@body
       (finally
         (alter-var-root #'trace/trace-enabled? (constantly false))))))

(deftest handle-skips-new-uuid-when-tracing-off
  (testing "re-frame.events/handle MUST NOT call (new-uuid) when
            tracing is disabled — UUID generation is cryptographically
            expensive (SecureRandom on JVM) and must not run on every
            dispatch in production"
    (let [calls (atom 0)]
      (rf/reg-event-db
        :trace-zero/sink
        (fn [db _] (assoc db :touched true)))
      (with-redefs [interop/new-uuid (fn [] (swap! calls inc) (java.util.UUID/randomUUID))]
        (alter-var-root #'trace/trace-enabled? (constantly false))
        (rf/dispatch-sync [:trace-zero/sink])
        (is (zero? @calls)
            "with tracing off, (new-uuid) is not called — the cost
             of trace-tag UUID generation belongs only on the trace path")

        (with-tracing-on
          (reset! calls 0)
          (rf/dispatch-sync [:trace-zero/sink])
          (is (= 1 @calls)
              "with tracing on, (new-uuid) IS called exactly once
               per handle — confirms the gate flips work back on (the
               test is meaningful, not always-zero by accident)"))))))

(deftest current-dispatch-id-stays-nil-when-tracing-off
  (testing "*current-dispatch-id* stays nil when tracing is off — no
            dispatch id is generated or propagated on the fast path"
    (let [observed (atom ::unset)]
      (rf/reg-event-db
        :trace-zero/peek-dispatch-id
        (fn [db _]
          (reset! observed events/*current-dispatch-id*)
          db))
      (alter-var-root #'trace/trace-enabled? (constantly false))
      (rf/dispatch-sync [:trace-zero/peek-dispatch-id])
      (is (nil? @observed)
          "tracing off → handle binds no dispatch id, so no parent-id
           propagation work happens at all")

      (with-tracing-on
        (reset! observed ::unset)
        (rf/dispatch-sync [:trace-zero/peek-dispatch-id])
        (is (uuid? @observed)
            "tracing on → handle binds *current-dispatch-id* to the
             generated UUID; the handler observes a real id")))))

(deftest dispatch-skips-tag-with-fx-overrides-when-no-handling-event
  (testing "router/dispatch MUST NOT call tag-with-fx-overrides on the
            top-level path (no event handler currently running). The
            dispatch-with override propagation is only meaningful when
            cascading from a parent that carries `:re-frame/fx-overrides`
            meta — apps that never call dispatch-with (i.e. ~all
            production apps) must not pay the meta-walk on every dispatch."
    (let [calls (atom 0)
          orig  @#'router/tag-with-fx-overrides]
      (rf/reg-event-db :overrides-zero/sink
                       (fn [db _] (assoc db :touched true)))
      (rf/reg-event-fx :overrides-zero/parent
                       (fn [_ _] {:fx [[:dispatch [:overrides-zero/sink]]]}))
      (with-redefs-fn
        {#'router/tag-with-fx-overrides
         (fn [event] (swap! calls inc) (orig event))}
        (fn []
          (reset! calls 0)
          (rf/dispatch [:overrides-zero/sink])
          (is (zero? @calls)
              "*handling* nil at top-level dispatch → tag-with-fx-overrides
               skipped via the cond-> gate; no per-call meta-walk.")

          (reset! calls 0)
          (rf/dispatch-sync [:overrides-zero/parent])
          (is (pos? @calls)
              "dispatch from inside a handler (*handling* bound) → the
               cond-> gate flips back on; tag-with-fx-overrides DOES fire
               so cascade propagation still works (test isn't trivially
               always-zero)."))))))

(deftest do-fx-after-skips-current-overrides-binding-when-no-event-meta
  (testing "do-fx-after MUST NOT push `*current-overrides*` into the
            thread bindings when the event carries no
            `:re-frame/fx-overrides` meta. Binding push/pop is
            ~50–100ns per event; dispatch-with is dev/test/REPL-only,
            so the production hot path must skip it entirely.

            White-box check: `(get-thread-bindings)` returns the map of
            currently-bound dynamic vars on this thread; a var is
            present only when a `binding` frame has been pushed for
            it. We probe from inside an fx-handler, which runs WITHIN
            do-fx-after's body — so the observation reflects whether
            the binding was pushed."
    (let [observed (atom ::unset)]
      (rf/reg-fx :overrides-zero/peek-bindings
                 (fn [_]
                   (reset! observed
                           (contains? (get-thread-bindings)
                                      #'fx/*current-overrides*))))
      (rf/reg-event-fx :overrides-zero/touch
                       (fn [_ _] {:overrides-zero/peek-bindings nil}))

      (reset! observed ::unset)
      (rf/dispatch-sync [:overrides-zero/touch])
      (is (false? @observed)
          "no fx-overrides meta on event → fast path; *current-overrides*
           is at root, NOT in thread-bindings — no binding push happened.")

      (reset! observed ::unset)
      (rf/dispatch-sync-with [:overrides-zero/touch] {})
      (is (true? @observed)
          "with fx-overrides meta (even an empty map) → binding IS pushed;
           confirms the gate flips back on (test isn't trivially
           always-false)."))))

(deftest cache-and-return-skips-reaction-reverse-map-when-unobserved
  (testing "cache-and-return MUST NOT swap! into reaction->query-v
            when tracing and debug tooling are both disabled — that
            reverse map is read only by deref-input-signals under
            tracing and by query-v-for-reaction under debug tooling, so
            populating it when neither consumer is present is wasted
            work AND the map grows unbounded in apps that never enable
            either path"
    (rf/reg-sub :trace-zero/leaf (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (alter-var-root #'trace/trace-enabled? (constantly false))
    (with-redefs [interop/debug-enabled? false]
      (let [rev @#'subs/reaction->query-v]
        (is (empty? @rev)
            "fixture-clean-state restored a fresh subs cache; the reverse
             map starts empty")
        (rf/subscribe [:trace-zero/leaf])
        (is (empty? @rev)
            "trace/debug off → cache-and-return skipped the reaction->query-v
             assoc; no entry leaked into the reverse map")

        (with-tracing-on
          (rf/reg-sub :trace-zero/leaf-on (fn [db _] (:n db)))
          (let [r (rf/subscribe [:trace-zero/leaf-on])]
            (is (= [:trace-zero/leaf-on] (get @rev r))
                "trace on → cache-and-return DID swap! into the reverse map;
                 confirms the gate flips back on (the test isn't trivially
                 always-empty)")))))))

(deftest deref-input-signals-skips-input-query-vs-work-when-tracing-off
  (testing "deref-input-signals MUST NOT walk reaction->query-v when
            tracing is disabled — subs re-run on every transitive deref
            change, so even a single atom deref + mapv per call shows
            up in hot graphs"
    (let [calls (atom 0)
          orig  subs/to-seq]
      (rf/reg-sub :trace-zero/leaf  (fn [db _] (:n db)))
      (rf/reg-sub :trace-zero/derived
                  (fn [_ _] (rf/subscribe [:trace-zero/leaf]))
                  (fn [n _] (* 2 n)))
      (reset! db/app-db {:n 5})
      (with-redefs [subs/to-seq (fn [x] (swap! calls inc) (orig x))]
        (alter-var-root #'trace/trace-enabled? (constantly false))
        (let [r (rf/subscribe [:trace-zero/derived])]
          (is (= 10 @r)
              "sanity — the sub graph computes correctly with tracing off")
          (is (zero? @calls)
              "with tracing off, the input-ids/input-qvs let block does
               not run — to-seq is only reached inside the trace gate")

          (with-tracing-on
            (reset! calls 0)
            (swap! db/app-db assoc :n 7)        ;; force a sub-run
            (is (= 14 @r))
            (is (pos? @calls)
                "with tracing on, the input-query-vs work runs — confirms
                 the gate is real and the production path is what's gated")))))))
