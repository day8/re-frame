(ns re-frame.dispatch-source-meta-test
  "CLJS coverage for re-frame.core-instrumented/dispatch and dispatch-sync source
   metadata. These tests exercise both the dev branch and a
   goog.DEBUG=false-equivalent runtime branch via interop/debug-enabled?."
  (:require [cljs.test :refer-macros [async deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.interop :as interop :refer [set-timeout!]]
            [re-frame.core-instrumented :as rf.m]))

(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)]
    {:before #(reset! restore-re-frame (rf/make-restore-fn))
     :after  #(when-let [restore @restore-re-frame]
                (restore))}))

(use-fixtures :each (fixture-re-frame))

(deftest dispatch-sync-attaches-source-meta-on-event-vector
  (testing "rf.m/dispatch-sync attaches {:file :line} as :re-frame/source in CLJS dev mode"
    (let [captured (atom nil)]
      (with-redefs [interop/debug-enabled? true]
        (rf/reg-event-db
         :dispatch-test/recv-sync
         (fn [_ event]
           (reset! captured (meta event))
           {}))
        (rf.m/dispatch-sync [:dispatch-test/recv-sync :payload]))
      (let [m @captured]
        (is (some? m)
            "event handler received an event with metadata")
        (is (some? (:re-frame/source m))
            ":re-frame/source is present on the event meta")
        (is (string? (-> m :re-frame/source :file))
            ":file is a string from the CLJS macro expansion environment")
        (is (re-find #"dispatch_source_meta_test\.cljs$"
                     (-> m :re-frame/source :file))
            ":file points at this test file")
        (is (pos-int? (-> m :re-frame/source :line))
            ":line is a positive int from (:line (meta &form))")))))

(deftest dispatch-sync-different-call-sites-have-different-line-numbers
  (testing "adjacent rf.m/dispatch-sync calls capture distinct :line metadata"
    (let [a (atom nil)
          b (atom nil)]
      (with-redefs [interop/debug-enabled? true]
        (rf/reg-event-db :dispatch-test/recv-a (fn [_ event] (reset! a (meta event)) {}))
        (rf/reg-event-db :dispatch-test/recv-b (fn [_ event] (reset! b (meta event)) {}))
        (rf.m/dispatch-sync [:dispatch-test/recv-a])
        (rf.m/dispatch-sync [:dispatch-test/recv-b]))
      (let [la (-> @a :re-frame/source :line)
            lb (-> @b :re-frame/source :line)]
        (is (pos-int? la))
        (is (pos-int? lb))
        (is (not= la lb)
            "macros capture the concrete CLJS call-site line")))))

(deftest dispatch-sync-preserves-user-meta-in-dev-mode
  (testing "user-supplied event metadata survives the macro's vary-meta call"
    (let [captured (atom nil)]
      (with-redefs [interop/debug-enabled? true]
        (rf/reg-event-db :dispatch-test/recv-merge (fn [_ event] (reset! captured (meta event)) {}))
        (rf.m/dispatch-sync ^:my-flag [:dispatch-test/recv-merge]))
      (let [m @captured]
        (is (some? (:re-frame/source m))
            "macro-added :re-frame/source is present")
        (is (true? (:my-flag m))
            "user-supplied :my-flag survives the vary-meta merge")))))

(deftest dispatch-sync-production-branch-does-not-add-source-meta
  (testing "with debug disabled, the macro branch is a no-op for source metadata"
    (let [captured (atom nil)]
      (with-redefs [interop/debug-enabled? false]
        (rf/reg-event-db :dispatch-test/recv-prod (fn [_ event] (reset! captured (meta event)) {}))
        (rf.m/dispatch-sync ^:my-flag [:dispatch-test/recv-prod]))
      (let [m @captured]
        (is (nil? (:re-frame/source m))
            "production branch does not attach :re-frame/source")
        (is (true? (:my-flag m))
            "production branch passes through the user's event value unchanged")))))

(deftest dispatch-async-source-meta-survives-router-cycle
  (testing "rf.m/dispatch preserves :re-frame/source through the CLJS async router"
    (async done
      (let [captured (atom ::pending)]
        (with-redefs [interop/debug-enabled? true]
          (rf/reg-event-db
           :dispatch-test/recv-async
           (fn [db event]
             (reset! captured (meta event))
             db))
          (rf.m/dispatch [:dispatch-test/recv-async]))
        (set-timeout!
         (fn []
           (let [m @captured]
             (is (not= ::pending m)
                 "async dispatch reached the handler")
             (is (some? (:re-frame/source m))
                 ":re-frame/source survives the router push/pop cycle")
             (is (re-find #"dispatch_source_meta_test\.cljs$"
                          (-> m :re-frame/source :file))
                 ":file points at this test file after the queue round-trip")
             (done)))
         1000)))))
