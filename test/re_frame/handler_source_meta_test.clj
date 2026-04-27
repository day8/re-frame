(ns re-frame.handler-source-meta-test
  "Tests that the reg-event-db / reg-event-fx / reg-event-ctx / reg-sub
   / reg-fx macros attach `{:file :line}` source meta to the registered
   handler so `(meta (re-frame.registrar/get-handler kind id))` returns
   the call-site location.

   These run CLJ-side under cognitect.test-runner — the meta-attach
   path is identical between CLJ and CLJS, and the test runner doesn't
   require Chrome."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.registrar :as registrar]))

(defn fixture-clear-test-handlers
  "Clean up any handlers a test registered so the registrar atom
   doesn't accumulate :test-meta/* entries across deftests."
  [f]
  (try
    (f)
    (finally
      (doseq [kind [:event :sub :fx]]
        (doseq [id (filter #(= "test-meta" (namespace %))
                           (keys (get @registrar/kind->id->handler kind)))]
          (registrar/clear-handlers kind id))))))

(use-fixtures :each fixture-clear-test-handlers)

(deftest reg-event-db-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after reg-event-db"
    (rf/reg-event-db :test-meta/db-handler (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-meta/db-handler))]
      (is (some? m)
          "registered handler carries metadata after reg-event-db")
      (is (string? (:file m))
          ":file is a string from *file* at expansion time")
      (is (re-find #"handler_source_meta_test\.clj$" (:file m))
          ":file points at this test file")
      (is (pos-int? (:line m))
          ":line is a positive int from (:line (meta &form))"))))

(deftest reg-event-fx-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after reg-event-fx"
    (rf/reg-event-fx :test-meta/fx-handler (fn [_ _] {}))
    (let [m (meta (registrar/get-handler :event :test-meta/fx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest reg-event-ctx-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after reg-event-ctx"
    (rf/reg-event-ctx :test-meta/ctx-handler identity)
    (let [m (meta (registrar/get-handler :event :test-meta/ctx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m))))))

(deftest reg-sub-attaches-source-meta
  (testing "(meta (get-handler :sub id)) returns {:file :line} after reg-sub"
    (rf/reg-sub :test-meta/sub-handler (fn [db _] (:n db)))
    (let [m (meta (registrar/get-handler :sub :test-meta/sub-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest reg-fx-attaches-source-meta
  (testing "(meta (get-handler :fx id)) returns {:file :line} after reg-fx"
    (rf/reg-fx :test-meta/fx-effect (fn [_] nil))
    (let [m (meta (registrar/get-handler :fx :test-meta/fx-effect))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest different-call-sites-have-different-line-numbers
  (testing "two reg-event-db calls in this test get distinct :line meta"
    (rf/reg-event-db :test-meta/site-a (fn [db _] db))
    (rf/reg-event-db :test-meta/site-b (fn [db _] db))
    (let [a (:line (meta (registrar/get-handler :event :test-meta/site-a)))
          b (:line (meta (registrar/get-handler :event :test-meta/site-b)))]
      (is (pos-int? a))
      (is (pos-int? b))
      (is (not= a b)
          "macros capture &form line — two adjacent call sites get different lines"))))

(deftest reg-event-db-with-interceptors-also-attaches-meta
  (testing "the 3-ary form (id interceptors handler) also captures source meta"
    (rf/reg-event-db :test-meta/with-interceptors []
                     (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-meta/with-interceptors))]
      (is (some? m))
      (is (string? (:file m))))))

(deftest meta-survives-registration-cycle-through-the-runtime-fn
  (testing "the run-time `*-fn` variants are exposed as a fallback for programmatic registration (no source meta)"
    ;; reg-event-db-fn is the run-time variant — used by callers
    ;; needing programmatic registration (e.g. apply, map). It does
    ;; NOT capture source meta because there's no &form to read.
    (rf/reg-event-db-fn :test-meta/programmatic (fn [db _] db))
    (let [handler (registrar/get-handler :event :test-meta/programmatic)]
      (is (some? handler)
          "programmatic registration via reg-event-db-fn still works")
      (is (nil? (meta handler))
          "programmatic path skips meta-attach — no &form available"))))
