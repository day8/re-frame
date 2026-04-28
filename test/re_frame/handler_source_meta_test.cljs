(ns re-frame.handler-source-meta-test
  "CLJS coverage for source metadata on the re-frame.macros reg-* API."
  (:require [cljs.test :refer-macros [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.db :as db]
            [re-frame.interop :as interop]
            [re-frame.macros :as rf.m]
            [re-frame.registrar :as registrar]))

(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)]
    {:before #(reset! restore-re-frame (rf/make-restore-fn))
     :after  #(when-let [restore @restore-re-frame]
                (restore))}))

(use-fixtures :each (fixture-re-frame))

(deftest core-reg-stars-are-functions
  (testing "re-frame.core registration entry points remain value-position-safe functions"
    (is (fn? rf/reg-event-db))
    (is (fn? rf/reg-event-fx))
    (is (fn? rf/reg-event-ctx))
    (is (fn? rf/reg-sub))
    (is (fn? rf/reg-fx))))

(deftest core-reg-event-db-attaches-no-source-meta
  (testing "the function form does not capture call-site metadata"
    (rf/reg-event-db :test-meta/plain-fn-path (fn [d _] d))
    (is (nil? (meta (registrar/get-handler :event :test-meta/plain-fn-path)))
        "no &form is available to a defn, so no source metadata is attached")))

(deftest core-reg-stars-work-in-value-position
  (testing "apply and map over re-frame.core reg-* fns still work in CLJS"
    (let [recorded (atom {})]
      (apply rf/reg-event-fx
             [:test-meta/applied
              (fn [_ [_ tag]]
                (swap! recorded assoc :applied tag)
                {})])
      (dorun (map rf/reg-sub
                  [:test-meta/m1 :test-meta/m2 :test-meta/m3]
                  [(fn [d _] (:a d))
                   (fn [d _] (:b d))
                   (fn [d _] (:c d))]))
      (reset! db/app-db {:a 1 :b 2 :c 3})
      (rf/dispatch-sync [:test-meta/applied :ok])
      (is (= :ok (:applied @recorded))
          "apply registers a handler that responds to dispatch-sync")
      (is (= [1 2 3]
             [@(rf/subscribe [:test-meta/m1])
              @(rf/subscribe [:test-meta/m2])
              @(rf/subscribe [:test-meta/m3])])
          "map registers each subscription id with its computation function"))))

(deftest macros-reg-event-db-attaches-source-meta
  (testing "re-frame.macros/reg-event-db attaches source metadata to the registered event chain"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-event-db :test-meta/db-handler (fn [d _] d)))
    (let [m (meta (registrar/get-handler :event :test-meta/db-handler))]
      (is (some? m)
          "registered handler carries metadata")
      (is (string? (:file m))
          ":file is a string from the CLJS macro expansion environment")
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m))
          ":file points at this test file")
      (is (pos-int? (:line m))
          ":line is a positive int from (:line (meta &form))"))))

(deftest macros-reg-event-fx-attaches-source-meta
  (testing "re-frame.macros/reg-event-fx attaches source metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-event-fx :test-meta/fx-handler (fn [_ _] {})))
    (let [m (meta (registrar/get-handler :event :test-meta/fx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-reg-event-ctx-attaches-source-meta
  (testing "re-frame.macros/reg-event-ctx attaches source metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-event-ctx :test-meta/ctx-handler identity))
    (let [m (meta (registrar/get-handler :event :test-meta/ctx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-reg-sub-attaches-source-meta
  (testing "re-frame.macros/reg-sub attaches source metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-sub :test-meta/sub-handler (fn [d _] (:n d))))
    (let [m (meta (registrar/get-handler :sub :test-meta/sub-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-reg-fx-attaches-source-meta
  (testing "re-frame.macros/reg-fx attaches source metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-fx :test-meta/fx-effect (fn [_] nil)))
    (let [m (meta (registrar/get-handler :fx :test-meta/fx-effect))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-different-call-sites-have-different-line-numbers
  (testing "two re-frame.macros/reg-event-db calls get distinct line metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-event-db :test-meta/site-a (fn [d _] d))
      (rf.m/reg-event-db :test-meta/site-b (fn [d _] d)))
    (let [a (:line (meta (registrar/get-handler :event :test-meta/site-a)))
          b (:line (meta (registrar/get-handler :event :test-meta/site-b)))]
      (is (pos-int? a))
      (is (pos-int? b))
      (is (not= a b)
          "macros capture the concrete CLJS call-site line"))))

(deftest macros-reg-event-db-with-interceptors-attaches-meta
  (testing "the 3-ary form also captures source metadata"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-event-db :test-meta/with-interceptors []
                         (fn [d _] d)))
    (let [m (meta (registrar/get-handler :event :test-meta/with-interceptors))]
      (is (some? m))
      (is (string? (:file m))))))

(deftest macros-reg-sub-with-sugar-pair-still-meta
  (testing "the variadic :<- sugar form composes and source metadata lands on the derived sub"
    (with-redefs [interop/debug-enabled? true]
      (rf.m/reg-sub :test-meta/sugared-leaf (fn [d _] (:n d)))
      (rf.m/reg-sub :test-meta/sugared-derived
                    :<- [:test-meta/sugared-leaf]
                    (fn [n _] (* 2 n))))
    (reset! db/app-db {:n 21})
    (is (= 42 @(rf/subscribe [:test-meta/sugared-derived]))
        ":<- sugar pair routes the upstream sub's value to the computation fn")
    (let [m (meta (registrar/get-handler :sub :test-meta/sugared-derived))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.cljs$" (:file m))))))

(deftest production-branch-does-not-decorate-handler-meta
  (testing "with debug disabled, the macro registers via core without decorating metadata"
    (with-redefs [interop/debug-enabled? false]
      (rf.m/reg-event-db :test-meta/prod-handler (fn [d _] d)))
    (is (nil? (meta (registrar/get-handler :event :test-meta/prod-handler)))
        "production branch does not call -decorate-handler-meta!")))

(deftest decorate-handler-meta-skips-opaque-handler
  (testing "-decorate-handler-meta! silently skips a handler value that cannot carry metadata"
    (let [opaque #js {}]
      (registrar/register-handler :fx :test-meta/opaque-handler opaque)
      (is (nil? (registrar/-decorate-handler-meta!
                 :fx :test-meta/opaque-handler {:file "opaque.cljs" :line 1}))
          "decorate returns nil and does not throw")
      (is (identical? opaque (registrar/get-handler :fx :test-meta/opaque-handler))
          "opaque handler remains registered")
      (is (nil? (meta (registrar/get-handler :fx :test-meta/opaque-handler)))
          "no metadata was attached"))))
