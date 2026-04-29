(ns re-frame.subscribe-source-meta-test
  "CLJS coverage for re-frame.core-instrumented/subscribe source metadata and the
   production no-op branch."
  (:require [cljs.test :refer-macros [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.db :as db]
            [re-frame.interop :as interop]
            [re-frame.core-instrumented :as rf.m]
            [re-frame.subs :as subs]
            [re-frame.trace :as trace]))

(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)
        trace-before     (atom nil)]
    {:before #(do
                (reset! restore-re-frame (rf/make-restore-fn))
                (reset! trace-before trace/trace-enabled?)
                (set! trace/trace-enabled? false))
     :after  #(do
                (set! trace/trace-enabled? @trace-before)
                (when-let [restore @restore-re-frame]
                  (restore)))}))

(use-fixtures :each (fixture-re-frame))

(deftest subscribe-attaches-source-meta-on-query-v
  (testing "rf.m/subscribe attaches {:file :line} as :re-frame/source in CLJS dev mode"
    (with-redefs [interop/debug-enabled? true]
      (rf/reg-sub :sub-test/echo (fn [d _] (:val d)))
      (reset! db/app-db {:val 99})
      (let [r  (rf.m/subscribe [:sub-test/echo])
            qv (subs/query-v-for-reaction r)
            m  (meta qv)]
        (is (some? m)
            "the query-v stored against the reaction carries metadata")
        (is (some? (:re-frame/source m))
            ":re-frame/source is present on the query-v meta")
        (is (string? (-> m :re-frame/source :file))
            ":file is a string from the CLJS macro expansion environment")
        (is (re-find #"subscribe_source_meta_test\.cljs$"
                     (-> m :re-frame/source :file))
            ":file points at this test file")
        (is (pos-int? (-> m :re-frame/source :line))
            ":line is a positive int from (:line (meta &form))")))))

(deftest subscribe-dynv-arity-attaches-source-meta-on-query-v
  (testing "rf.m/subscribe supports core's [query-v dynv] arity in CLJS dev mode"
    (with-redefs [interop/debug-enabled? true]
      (rf/reg-sub :sub-test/dyn (fn [_ _ dynv] (first dynv)))
      (let [dyn-arg (atom 42)
            r       (rf.m/subscribe [:sub-test/dyn] [dyn-arg])
            qv      (subs/query-v-for-reaction r)
            m       (meta qv)]
        (is (= 42 @r)
            "dynv is passed through to re-frame.core/subscribe")
        (is (= [:sub-test/dyn] qv))
        (is (some? (:re-frame/source m))
            "source metadata is attached to query-v for the dynv arity")))))

(deftest subscribe-different-call-sites-have-different-line-numbers
  (testing "two rf.m/subscribe calls with different query ids capture distinct line metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf/reg-sub :sub-test/a (fn [d _] (:a d)))
      (rf/reg-sub :sub-test/b (fn [d _] (:b d)))
      (reset! db/app-db {:a 1 :b 2})
      (let [ra (rf.m/subscribe [:sub-test/a])
            rb (rf.m/subscribe [:sub-test/b])
            la (-> ra subs/query-v-for-reaction meta :re-frame/source :line)
            lb (-> rb subs/query-v-for-reaction meta :re-frame/source :line)]
        (is (pos-int? la))
        (is (pos-int? lb))
        (is (not= la lb)
            "macros capture the concrete CLJS call-site line")))))

(deftest subscribe-preserves-user-supplied-query-v-meta
  (testing "user-supplied query-v metadata survives the macro's vary-meta call"
    (with-redefs [interop/debug-enabled? true]
      (rf/reg-sub :sub-test/echo (fn [d _] (:val d)))
      (reset! db/app-db {:val 1})
      (let [r  (rf.m/subscribe ^:my-flag [:sub-test/echo])
            qv (subs/query-v-for-reaction r)
            m  (meta qv)]
        (is (some? (:re-frame/source m))
            "macro-added :re-frame/source is present")
        (is (true? (:my-flag m))
            "user-supplied :my-flag survives the vary-meta merge")))))

(deftest subscribe-cache-key-ignores-meta
  (testing "a meta'd query-v and a bare query-v resolve to the same cached reaction"
    (with-redefs [interop/debug-enabled? true]
      (rf/reg-sub :sub-test/echo (fn [d _] (:val d)))
      (reset! db/app-db {:val 1})
      (let [r-meta (rf.m/subscribe [:sub-test/echo])
            r-bare (rf/subscribe [:sub-test/echo])]
        (is (identical? r-meta r-bare)
            "macro-meta'd and bare-call subscribe paths return the same cached reaction")
        (is (some? (:re-frame/source (meta (subs/query-v-for-reaction r-meta))))
            "the cached query-v retains :re-frame/source meta from the first caller")))))

(deftest subscribe-production-branch-does-not-add-source-meta
  (testing "with debug disabled, the macro passes the query-v through without source metadata"
    (rf/reg-sub :sub-test/prod (fn [d _] (:val d)))
    (reset! db/app-db {:val 1})
    (set! trace/trace-enabled? true)
    (with-redefs [interop/debug-enabled? false]
      (let [r  (rf.m/subscribe ^:my-flag [:sub-test/prod])
            qv (subs/query-v-for-reaction r)
            m  (meta qv)]
        (is (= [:sub-test/prod] qv)
            "trace keeps the production query-v visible for inspection")
        (is (nil? (:re-frame/source m))
            "production branch does not attach :re-frame/source")
        (is (true? (:my-flag m))
            "production branch passes through the user's query-v unchanged")))))
