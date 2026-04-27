(ns re-frame.trace-zero-cost-test
  "Asserts that the trace machinery added by rf-3p7 (auto :dispatch-id +
   :input-query-vs) is INERT when tracing is disabled.

   The af024c3 commit introduced a fresh UUID per `re-frame.events/handle`
   call; the fa90f70 commit added an atom deref + `mapv` per
   `deref-input-signals` call. Both were initially unconditional —
   contradicting re-frame's load-bearing guarantee that tracing-off ==
   zero cost. Subs re-run on every transitive deref change and dispatches
   fire on every user action, so even a few microseconds per call shows
   up under profiling.

   Strategy: redefine the per-call work (`new-dispatch-id`, `to-seq`)
   to counter functions, exercise the hot path with `trace-enabled?`
   in both states, and assert the call count is 0 when off."
  (:require [clojure.test    :refer [deftest is testing use-fixtures]]
            [re-frame.core   :as rf]
            [re-frame.db     :as db]
            [re-frame.events :as events]
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

(deftest handle-skips-new-dispatch-id-when-tracing-off
  (testing "re-frame.events/handle MUST NOT call (new-dispatch-id) when
            tracing is disabled — UUID generation is cryptographically
            expensive (SecureRandom on JVM) and must not run on every
            dispatch in production"
    (let [calls (atom 0)]
      (rf/reg-event-db
        :trace-zero/sink
        (fn [db _] (assoc db :touched true)))
      (with-redefs [events/new-dispatch-id (fn [] (swap! calls inc) (java.util.UUID/randomUUID))]
        (alter-var-root #'trace/trace-enabled? (constantly false))
        (rf/dispatch-sync [:trace-zero/sink])
        (is (zero? @calls)
            "with tracing off, (new-dispatch-id) is not called — the cost
             of trace-tag UUID generation belongs only on the trace path")

        (with-tracing-on
          (reset! calls 0)
          (rf/dispatch-sync [:trace-zero/sink])
          (is (= 1 @calls)
              "with tracing on, (new-dispatch-id) IS called exactly once
               per handle — confirms the gate flips work back on (the
               test is meaningful, not always-zero by accident)"))))))

(deftest current-dispatch-id-stays-nil-when-tracing-off
  (testing "*current-dispatch-id* is NOT bound by handle when tracing is
            off — confirms the binding (an extra thread-local push) is
            elided on the fast path, not just the UUID"
    (let [observed (atom ::unset)]
      (rf/reg-event-db
        :trace-zero/peek-dispatch-id
        (fn [db _]
          (reset! observed events/*current-dispatch-id*)
          db))
      (alter-var-root #'trace/trace-enabled? (constantly false))
      (rf/dispatch-sync [:trace-zero/peek-dispatch-id])
      (is (nil? @observed)
          "tracing off → handle takes the binding-free branch, so the
           handler sees the var at its default nil — no parent-id
           propagation work happens at all")

      (with-tracing-on
        (reset! observed ::unset)
        (rf/dispatch-sync [:trace-zero/peek-dispatch-id])
        (is (uuid? @observed)
            "tracing on → handle binds *current-dispatch-id* to the
             generated UUID; the handler observes a real id")))))

(deftest deref-input-signals-skips-input-query-vs-work-when-tracing-off
  (testing "deref-input-signals MUST NOT walk reaction-id->query-v when
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
