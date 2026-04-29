(ns re-frame.subscribe-source-meta-test
  "Tests that the `re-frame.core-instrumented/subscribe` macro captures the
   call-site `{:file :line}` at macro-expansion time and attaches it
   as `:re-frame/source` metadata on the query vector before the
   subscribe lookup. The reaction's stored query-v carries the meta
   forward, recoverable via `re-frame.subs/query-v-for-reaction`.

   Also verifies the critical cache-identity property: vector
   equality in CLJ/CLJS ignores metadata, so a meta'd query-v and a
   bare one resolve to the same cached reaction.

   Runs CLJ-side under cognitect.test-runner — the macro-expansion
   path is identical between CLJ and CLJS, and CLJ-side
   `re-frame.interop/debug-enabled?` is hardcoded `true` so the
   meta-wrap branch is always exercised."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.core-instrumented :as rf.m]
            [re-frame.subs :as subs]
            [re-frame.db :as db]))

(defn fixture-re-frame
  "Snapshot/restore the registrar, app-db, and subscription cache so
   each deftest starts clean."
  [f]
  (let [restore (rf/make-restore-fn)]
    (try (f) (finally (restore)))))

(use-fixtures :each fixture-re-frame)

(deftest subscribe-macroexpand-emits-debug-gate
  (testing "(macroexpand-1 '(rf.m/subscribe [:foo])) emits the if/debug-enabled? wrapping a vary-meta call"
    (let [expanded (macroexpand-1 '(re-frame.core-instrumented/subscribe [:foo 42]))
          flat     (tree-seq coll? seq expanded)]
      (is (some #(= 'if %) flat)
          "expanded form contains an `if` (the DCE-friendly debug gate)")
      (is (some #(= 're-frame.interop/debug-enabled? %) flat)
          "expanded form references re-frame.interop/debug-enabled? as the gate")
      (is (some #(= :re-frame/source %) flat)
          "expanded form mentions :re-frame/source meta key")
      (is (some #(= 'clojure.core/vary-meta %) flat)
          "expanded form uses vary-meta to merge meta onto the query-v")
      (is (some #(= 're-frame.core/subscribe %) flat)
          "expanded form targets re-frame.core/subscribe"))))

(deftest subscribe-macroexpand-binds-user-query-expression-once
  (testing "subscribe binds the user query expression once, then reuses it in both debug-gate branches"
    (let [expanded (macroexpand-1 '(re-frame.core-instrumented/subscribe (build-query)))
          flat     (tree-seq coll? seq expanded)]
      (is (= 1 (count (filter #(= '(build-query) %) flat)))
          "subscribe expansion contains the user query expression once"))))

(deftest subscribe-macroexpand-supports-dynv-arity
  (testing "(rf.m/subscribe query-v dynv) targets the two-arity core subscribe call"
    (let [expanded (macroexpand-1 '(re-frame.core-instrumented/subscribe [:foo] [dyn]))
          flat     (tree-seq coll? seq expanded)]
      (is (some #(= 're-frame.core/subscribe %) flat)
          "expanded form targets re-frame.core/subscribe")
      (is (some #(= '[dyn] %) flat)
          "expanded form passes dynv through")
      (is (some #(= :re-frame/source %) flat)
          "expanded form still attaches source metadata to query-v"))))

(deftest subscribe-attaches-source-meta-on-query-v
  (testing "rf.m/subscribe attaches {:file :line} as :re-frame/source on the query-v stored against the reaction"
    (rf/reg-sub :sub-test/echo (fn [db _] (:val db)))
    (reset! db/app-db {:val 99})
    (let [r  (rf.m/subscribe [:sub-test/echo])
          qv (subs/query-v-for-reaction r)
          m  (meta qv)]
      (is (some? m)
          "the query-v stored against the reaction carries metadata")
      (is (some? (:re-frame/source m))
          ":re-frame/source is present on the query-v meta")
      (is (string? (-> m :re-frame/source :file))
          ":file is a string from *file* at expansion time")
      (is (re-find #"subscribe_source_meta_test\.clj$"
                   (-> m :re-frame/source :file))
          ":file points at this test file")
      (is (pos-int? (-> m :re-frame/source :line))
          ":line is a positive int from (:line (meta &form))"))))

(deftest subscribe-dynv-arity-attaches-source-meta-on-query-v
  (testing "rf.m/subscribe mirrors core's [query-v dynv] arity while meta-tagging query-v"
    (rf/reg-sub :sub-test/dyn (fn [_db _ dynv] (first dynv)))
    (let [dyn-arg (atom 42)
          r       (rf.m/subscribe [:sub-test/dyn] [dyn-arg])
          qv      (subs/query-v-for-reaction r)
          m       (meta qv)]
      (is (= 42 @r)
          "dynv is passed through to re-frame.core/subscribe")
      (is (= [:sub-test/dyn] qv))
      (is (some? (:re-frame/source m))
          "source metadata is attached to query-v for the dynv arity"))))

(deftest subscribe-different-call-sites-have-different-line-numbers
  (testing "two adjacent rf.m/subscribe calls (different sub-ids to avoid cache reuse) capture distinct :line meta"
    (rf/reg-sub :sub-test/a (fn [db _] (:a db)))
    (rf/reg-sub :sub-test/b (fn [db _] (:b db)))
    (reset! db/app-db {:a 1 :b 2})
    (let [ra (rf.m/subscribe [:sub-test/a])
          rb (rf.m/subscribe [:sub-test/b])
          la (-> ra subs/query-v-for-reaction meta :re-frame/source :line)
          lb (-> rb subs/query-v-for-reaction meta :re-frame/source :line)]
      (is (pos-int? la))
      (is (pos-int? lb))
      (is (not= la lb)
          "macros capture &form line — adjacent call sites get different lines"))))

(deftest subscribe-preserves-user-supplied-query-v-meta
  (testing "user-supplied meta on the query-v survives the macro's vary-meta call"
    (rf/reg-sub :sub-test/echo (fn [db _] (:val db)))
    (reset! db/app-db {:val 1})
    (let [r  (rf.m/subscribe ^:my-flag [:sub-test/echo])
          qv (subs/query-v-for-reaction r)
          m  (meta qv)]
      (is (some? (:re-frame/source m))
          "macro-added :re-frame/source is present")
      (is (true? (:my-flag m))
          "user-supplied :my-flag survives the vary-meta merge"))))

(deftest subscribe-cache-key-ignores-meta
  (testing "a meta'd query-v and a bare query-v resolve to the same cached reaction (vector equality ignores metadata)"
    (rf/reg-sub :sub-test/echo (fn [db _] (:val db)))
    (reset! db/app-db {:val 1})
    (let [r-meta (rf.m/subscribe [:sub-test/echo])
          r-bare (rf/subscribe [:sub-test/echo])]
      (is (identical? r-meta r-bare)
          "macro-meta'd and bare-call subscribe paths return the SAME cached reaction")
      (is (some? (:re-frame/source (meta (subs/query-v-for-reaction r-meta))))
          "the cached query-v retains :re-frame/source meta from the first (macro) caller"))))

(deftest subscribe-cache-hit-keeps-first-callers-source-meta
  (testing "two rf.m/subscribe calls with the same query-v hit the cache; reaction reflects FIRST caller's meta"
    (rf/reg-sub :sub-test/echo (fn [db _] (:val db)))
    (reset! db/app-db {:val 1})
    (let [r1   (rf.m/subscribe [:sub-test/echo])
          r2   (rf.m/subscribe [:sub-test/echo])
          src1 (-> r1 subs/query-v-for-reaction meta :re-frame/source)
          src2 (-> r2 subs/query-v-for-reaction meta :re-frame/source)]
      (is (identical? r1 r2)
          "both calls hit the cache (cache key uses vector =, ignoring meta)")
      (is (= src1 src2)
          "query-v-for-reaction returns the same query-v for both — meta is the first caller's")
      (is (some? src1)
          ":re-frame/source is present on the first caller's query-v"))))
