(ns re-frame.validate-trace-test
  "Asserts `set-validate-trace! true` does not warn on traces re-frame
   core itself emits — the lint feature must be silent on correct
   emits, otherwise it drowns real third-party drift in noise.

   Regression guard for rf-vwm: the schema for `:sub/create` /
   `:sub/run` omitted `:dyn-v` (always emitted on the legacy 2-arity
   dynv subscribe path), and `:event/handler` required `:event` while
   the three `std_interceptors` emit sites pass no `:tags` map at all
   — `:effects` / `:coeffects` are merged onto the parent `:event`
   trace, not onto `:event/handler` itself. Every dispatch with
   `set-validate-trace! true` tripped 'missing required' /
   'unknown tag key' warnings on re-frame's own traces pre-fix.

   Strategy: swap a capturing logger into `re-frame.loggers/loggers`,
   flip `trace-enabled?` and `set-validate-trace! true`, exercise the
   dispatch + 1-arity-subscribe + 2-arity-dynv-subscribe paths, filter
   the captured warns for the `re-frame.trace:` prefix, and assert
   empty."
  (:require [clojure.test     :refer [deftest is testing use-fixtures]]
            [re-frame.core    :as rf]
            [re-frame.interop :as interop]
            [re-frame.loggers :as loggers]
            [re-frame.trace   :as trace]))

(defn- fixture-clean-state
  "Restore handlers, app-db, the trace flag, the validate flag, and
   the loggers between tests so any one test that leaves a flipped
   flag behind can't poison the next."
  [f]
  (let [restore         (rf/make-restore-fn)
        trace-before    trace/trace-enabled?
        validate-before (trace/validate-trace?)
        loggers-before  (loggers/get-loggers)]
    (try
      (f)
      (finally
        (alter-var-root #'trace/trace-enabled? (constantly trace-before))
        (trace/set-validate-trace! validate-before)
        (loggers/set-loggers! loggers-before)
        (reset! trace/traces [])
        (restore)))))

(use-fixtures :each fixture-clean-state)

(defmacro ^:private with-tracing-on
  "Flip `trace-enabled?` true for the body and restore on exit. The
   var is also reset by the fixture, but flipping it locally keeps
   the on-window scoped to the assertion's exercise rather than
   leaking across `let` boundaries."
  [& body]
  `(do
     (alter-var-root #'trace/trace-enabled? (constantly true))
     (try ~@body
          (finally
            (alter-var-root #'trace/trace-enabled? (constantly false))))))

(deftest finish-trace-end-and-duration-use-same-clock-read
  (testing "finished traces keep :end, :start, and :duration self-consistent"
    (let [ticks (atom [100 125 999])]
      (with-redefs [interop/now (fn []
                                  (let [n (first @ticks)]
                                    (swap! ticks rest)
                                    n))
                    trace/run-tracing-callbacks! (fn [_])]
        (with-tracing-on
          (trace/with-trace {:operation ::timed :op-type :sync})
          (let [{:keys [start end duration]} (last @trace/traces)]
            (is (= 100 start))
            (is (= 125 end))
            (is (= 25 duration))
            (is (= duration (- end start)))))))))

(defn- capture-trace-warns
  "Run `f` with `:warn` redirected to a collector that keeps only
   `re-frame.trace:`-prefixed warns — the schema-validation messages
   from `check-trace-against-schema`. Other warns (e.g. 'no :event
   handler registered for') pass through to the previous logger so a
   test that genuinely registers no handler still surfaces noise
   rather than swallowing it.

   Returns the collected schema-warn strings."
  [f]
  (let [warns     (atom [])
        prev-warn (:warn (loggers/get-loggers))]
    (loggers/set-loggers!
     {:warn (fn [& args]
              (let [msg (apply print-str args)]
                (if (re-find #"^re-frame\.trace:" msg)
                  (swap! warns conj msg)
                  (apply prev-warn args))))})
    (try (f)
         (finally
           (loggers/set-loggers! {:warn prev-warn})))
    @warns))

(deftest no-warns-on-event-and-event-handler
  (testing "set-validate-trace! true does not warn on the :event,
            :event/handler, or :event/do-fx traces re-frame opens
            for a normal dispatch-sync. Pre-fix, :event/handler
            schema required :event but the std_interceptors
            with-trace at :event/handler scope passes no :tags map
            (the :effects / :coeffects merge-trace! immediately
            following intentionally targets the PARENT :event trace,
            not :event/handler)."
    (rf/reg-event-db ::sink (fn [db _] (assoc db :touched true)))
    (with-tracing-on
      (let [warns (capture-trace-warns
                   (fn []
                     (trace/set-validate-trace! true)
                     (rf/dispatch-sync [::sink])))]
        (is (empty? warns)
            (str ":event / :event/handler / :event/do-fx traces "
                 "should validate clean against tag-schema; got: "
                 (vec warns)))))))

(deftest no-warns-on-sub-create-and-sub-run
  (testing "set-validate-trace! true does not warn on the 1-arity
            subscribe path's :sub/create and :sub/run traces.
            Sanity-baseline for the dynv test below — confirms the
            non-dynv path is already clean (the bug is dynv-only)."
    (rf/reg-sub ::s (fn [_db _] :ok))
    (with-tracing-on
      (let [warns (capture-trace-warns
                   (fn []
                     (trace/set-validate-trace! true)
                     ;; deref triggers :sub/run inside the
                     ;; reaction's compute fn.
                     @(rf/subscribe [::s])))]
        (is (empty? warns)
            (str "1-arity subscribe traces should validate clean; got: "
                 (vec warns)))))))

(deftest no-warns-on-dynv-sub-create-and-sub-run
  (testing "set-validate-trace! true does not warn on the 2-arity
            dynv subscribe path's :sub/create and :sub/run traces —
            both carry :dyn-v in :tags, which pre-fix was in
            neither :required nor :optional in the schema."
    (rf/reg-sub ::dyn (fn [_db _ dynv] (first dynv)))
    (with-tracing-on
      (let [dyn-arg (atom 42)
            warns   (capture-trace-warns
                     (fn []
                       (trace/set-validate-trace! true)
                       @(rf/subscribe [::dyn] [dyn-arg])))]
        (is (empty? warns)
            (str "Dynv subscribe traces should validate clean — "
                 ":dyn-v belongs in the schema for :sub/create and "
                 ":sub/run; got: " (vec warns)))))))
