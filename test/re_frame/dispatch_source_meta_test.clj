(ns re-frame.dispatch-source-meta-test
  "Tests that the `re-frame.macros/dispatch` and
   `re-frame.macros/dispatch-sync` macros capture the call-site
   `{:file :line}` at macro-expansion time and attach it as
   `:re-frame/source` metadata on the event vector.

   These run CLJ-side under cognitect.test-runner — the macro-expansion
   path is identical between CLJ and CLJS, and CLJ-side
   `re-frame.interop/debug-enabled?` is hardcoded `true` so the
   meta-wrap branch is always exercised."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.macros :as rf.m]
            [re-frame.registrar :as registrar]))

(defn fixture-clear-test-handlers
  "Clean up handlers a test registered so the registrar atom doesn't
   accumulate :dispatch-test/* entries across deftests."
  [f]
  (try
    (f)
    (finally
      (doseq [kind [:event :sub :fx]]
        (doseq [id (filter #(and (keyword? %)
                                 (= "dispatch-test" (namespace %)))
                           (keys (get @registrar/kind->id->handler kind)))]
          (registrar/clear-handlers kind id))))))

(use-fixtures :each fixture-clear-test-handlers)

(deftest dispatch-macroexpand-emits-debug-gate
  (testing "(macroexpand-1 '(rf.m/dispatch [:foo])) emits an `if` on debug-enabled? wrapping a vary-meta call"
    (let [expanded (macroexpand-1 '(re-frame.macros/dispatch [:foo 42]))
          flat     (tree-seq coll? seq expanded)]
      (is (some #(= 'if %) flat)
          "expanded form contains an `if` (the DCE-friendly debug gate)")
      (is (some #(= 're-frame.interop/debug-enabled? %) flat)
          "expanded form references re-frame.interop/debug-enabled? as the gate")
      (is (some #(= :re-frame/source %) flat)
          "expanded form mentions :re-frame/source meta key")
      (is (some #(= 'clojure.core/vary-meta %) flat)
          "expanded form uses vary-meta to merge meta onto the event"))))

(deftest dispatch-sync-attaches-source-meta-on-event-vector
  (testing "rf.m/dispatch-sync attaches {:file :line} as :re-frame/source on the dispatched event"
    (let [captured (atom nil)]
      (rf/reg-event-db
        :dispatch-test/recv-sync
        (fn [_ event]
          (reset! captured (meta event))
          {}))
      (rf.m/dispatch-sync [:dispatch-test/recv-sync :payload])
      (let [m @captured]
        (is (some? m)
            "event handler received an event with metadata")
        (is (some? (:re-frame/source m))
            ":re-frame/source is present on the event meta")
        (is (string? (-> m :re-frame/source :file))
            ":file is a string from *file* at expansion time")
        (is (re-find #"dispatch_source_meta_test\.clj$"
                     (-> m :re-frame/source :file))
            ":file points at this test file")
        (is (pos-int? (-> m :re-frame/source :line))
            ":line is a positive int from (:line (meta &form))")))))

(deftest dispatch-sync-different-call-sites-have-different-line-numbers
  (testing "two adjacent rf.m/dispatch-sync calls capture distinct :line meta"
    (let [a (atom nil)
          b (atom nil)]
      (rf/reg-event-db :dispatch-test/recv-a (fn [_ event] (reset! a (meta event)) {}))
      (rf/reg-event-db :dispatch-test/recv-b (fn [_ event] (reset! b (meta event)) {}))
      (rf.m/dispatch-sync [:dispatch-test/recv-a])
      (rf.m/dispatch-sync [:dispatch-test/recv-b])
      (let [la (-> @a :re-frame/source :line)
            lb (-> @b :re-frame/source :line)]
        (is (pos-int? la))
        (is (pos-int? lb))
        (is (not= la lb)
            "macros capture &form line — adjacent call sites get different lines")))))

(deftest dispatch-sync-preserves-user-supplied-event-meta
  (testing "user-supplied meta on the event vector survives the macro's vary-meta call"
    (let [captured (atom nil)]
      (rf/reg-event-db :dispatch-test/recv-merge (fn [_ event] (reset! captured (meta event)) {}))
      (rf.m/dispatch-sync ^:my-flag [:dispatch-test/recv-merge])
      (let [m @captured]
        (is (some? (:re-frame/source m))
            "macro-added :re-frame/source is present")
        (is (true? (:my-flag m))
            "user-supplied :my-flag survives the vary-meta merge")))))

(deftest dispatch-async-source-meta-survives-router-cycle
  (testing "rf.m/dispatch (async, queue-based) preserves :re-frame/source meta through router push/pop"
    (let [captured (promise)]
      (rf/reg-event-db
        :dispatch-test/recv-async
        (fn [db event]
          (deliver captured (meta event))
          db))
      (rf.m/dispatch [:dispatch-test/recv-async])
      (let [m (deref captured 1000 ::timed-out)]
        (is (not= ::timed-out m)
            "async dispatch reached the handler within 1s")
        (is (some? (:re-frame/source m))
            ":re-frame/source survives the router push/pop cycle")
        (is (re-find #"dispatch_source_meta_test\.clj$"
                     (-> m :re-frame/source :file))
            ":file points at this test file after the queue round-trip")))))

(deftest dispatch-and-dispatch-sync-emit-distinct-target-fns
  (testing "rf.m/dispatch expands to re-frame.core/dispatch, dispatch-sync to re-frame.core/dispatch-sync"
    (let [d-flat  (tree-seq coll? seq (macroexpand-1 '(re-frame.macros/dispatch [:foo])))
          ds-flat (tree-seq coll? seq (macroexpand-1 '(re-frame.macros/dispatch-sync [:foo])))]
      (is (some #(= 're-frame.core/dispatch %) d-flat)
          "dispatch macro targets re-frame.core/dispatch")
      (is (some #(= 're-frame.core/dispatch-sync %) ds-flat)
          "dispatch-sync macro targets re-frame.core/dispatch-sync"))))
