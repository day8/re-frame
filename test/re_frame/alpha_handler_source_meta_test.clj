(ns re-frame.alpha-handler-source-meta-test
  "Mirrors `handler_source_meta_test` but exercises the
   `re-frame.alpha` registration entry points. The alpha namespace has
   its own reg-event-db / reg-event-fx / reg-event-ctx / reg-sub /
   reg-fx (interceptor chains differ from `re-frame.core` — alpha
   appends `flow/do-fx` after user interceptors). These tests confirm
   the alpha macros capture call-site `{:file :line}` the same way the
   core macros do, and that the `-fn` run-time variants register
   without source meta — the same contract documented for core."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.alpha :as rfa]
            [re-frame.db :as db]
            [re-frame.registrar :as registrar]
            [re-frame.subs :as subs]))

(defn fixture-clear-test-handlers
  [f]
  (try
    (f)
    (finally
      (doseq [kind [:event :sub :fx]]
        (doseq [id (filter #(= "test-alpha-meta" (namespace %))
                           (keys (get @registrar/kind->id->handler kind)))]
          (registrar/clear-handlers kind id)))
      (subs/clear-subscription-cache!)
      (reset! db/app-db {}))))

(use-fixtures :each fixture-clear-test-handlers)

(deftest alpha-reg-event-db-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after re-frame.alpha/reg-event-db"
    (rfa/reg-event-db :test-alpha-meta/db-handler (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-alpha-meta/db-handler))]
      (is (some? m)
          "registered chain carries metadata")
      (is (string? (:file m)))
      (is (re-find #"alpha_handler_source_meta_test\.clj$" (:file m))
          ":file points at this test file")
      (is (pos-int? (:line m))))))

(deftest alpha-reg-event-fx-attaches-source-meta
  (testing "alpha reg-event-fx attaches {:file :line}"
    (rfa/reg-event-fx :test-alpha-meta/fx-handler (fn [_ _] {}))
    (let [m (meta (registrar/get-handler :event :test-alpha-meta/fx-handler))]
      (is (some? m))
      (is (re-find #"alpha_handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest alpha-reg-event-ctx-attaches-source-meta
  (testing "alpha reg-event-ctx attaches {:file :line}"
    (rfa/reg-event-ctx :test-alpha-meta/ctx-handler identity)
    (let [m (meta (registrar/get-handler :event :test-alpha-meta/ctx-handler))]
      (is (some? m))
      (is (re-find #"alpha_handler_source_meta_test\.clj$" (:file m))))))

(deftest alpha-reg-sub-attaches-source-meta
  (testing "alpha reg-sub attaches {:file :line} on the registered subs handler"
    (rfa/reg-sub :test-alpha-meta/sub-handler (fn [db _] (:n db)))
    (let [m (meta (registrar/get-handler :sub :test-alpha-meta/sub-handler))]
      (is (some? m))
      (is (re-find #"alpha_handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest alpha-reg-fx-attaches-source-meta
  (testing "alpha reg-fx attaches {:file :line}"
    (rfa/reg-fx :test-alpha-meta/fx-effect (fn [_] nil))
    (let [m (meta (registrar/get-handler :fx :test-alpha-meta/fx-effect))]
      (is (some? m))
      (is (re-find #"alpha_handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest alpha-different-call-sites-have-different-line-numbers
  (testing "two adjacent alpha reg-event-db calls capture distinct :line"
    (rfa/reg-event-db :test-alpha-meta/site-a (fn [db _] db))
    (rfa/reg-event-db :test-alpha-meta/site-b (fn [db _] db))
    (let [a (:line (meta (registrar/get-handler :event :test-alpha-meta/site-a)))
          b (:line (meta (registrar/get-handler :event :test-alpha-meta/site-b)))]
      (is (pos-int? a))
      (is (pos-int? b))
      (is (not= a b)))))

(deftest alpha-reg-event-db-with-interceptors-also-attaches-meta
  (testing "the 3-ary form (id interceptors handler) also captures source meta"
    (rfa/reg-event-db :test-alpha-meta/with-interceptors []
                      (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-alpha-meta/with-interceptors))]
      (is (some? m))
      (is (string? (:file m))))))

(deftest alpha-reg-event-db-fn-registers-without-meta
  (testing "alpha run-time -fn variant: registration works, no source meta"
    (rfa/reg-event-db-fn :test-alpha-meta/programmatic (fn [db _] db))
    (let [handler (registrar/get-handler :event :test-alpha-meta/programmatic)]
      (is (some? handler))
      (is (nil? (meta handler))
          "programmatic path skips meta-attach"))))

(deftest alpha-reg-event-fx-fn-registers-and-dispatches-without-meta
  (testing "alpha reg-event-fx-fn registers a handler that dispatches normally; no source meta"
    (let [seen (atom nil)]
      (rfa/reg-fx :test-alpha-meta/fx-spy (fn [v] (reset! seen v)))
      (rfa/reg-event-fx-fn :test-alpha-meta/fx-handler-fn
                           (fn [_ [_ payload]]
                             {:test-alpha-meta/fx-spy payload}))
      (rfa/dispatch-sync [:test-alpha-meta/fx-handler-fn :hello])
      (is (= :hello @seen))
      (is (nil? (meta (registrar/get-handler :event :test-alpha-meta/fx-handler-fn)))))))

(deftest alpha-reg-event-ctx-fn-registers-without-meta
  (testing "alpha reg-event-ctx-fn registers a ctx handler that receives full context"
    (let [seen-event (atom nil)
          seen-db    (atom nil)]
      (reset! db/app-db {:test-alpha-meta/marker :present})
      (rfa/reg-event-ctx-fn :test-alpha-meta/ctx-handler-fn
                            (fn [ctx]
                              (reset! seen-event (get-in ctx [:coeffects :event]))
                              (reset! seen-db    (get-in ctx [:coeffects :db]))
                              ctx))
      (rfa/dispatch-sync [:test-alpha-meta/ctx-handler-fn :payload])
      (is (= [:test-alpha-meta/ctx-handler-fn :payload] @seen-event))
      (is (= {:test-alpha-meta/marker :present} @seen-db))
      (is (nil? (meta (registrar/get-handler :event :test-alpha-meta/ctx-handler-fn)))))))

(deftest alpha-reg-sub-fn-registers-without-meta
  (testing "alpha reg-sub-fn registers a sub whose deref returns the computation against app-db"
    (rfa/reg-sub-fn :test-alpha-meta/sub-via-fn (fn [d _] (:n d)))
    (reset! db/app-db {:n 42})
    (let [r (rfa/subscribe [:test-alpha-meta/sub-via-fn])]
      (is (= 42 @r)))
    (is (nil? (meta (registrar/get-handler :sub :test-alpha-meta/sub-via-fn))))))

(deftest alpha-reg-fx-fn-registers-without-meta
  (testing "alpha reg-fx-fn registers an effect handler that fires when an event returns it"
    (let [seen (atom nil)]
      (rfa/reg-fx-fn :test-alpha-meta/fx-via-fn (fn [v] (reset! seen v)))
      (rfa/reg-event-fx :test-alpha-meta/dispatcher
                        (fn [_ _] {:test-alpha-meta/fx-via-fn [1 2 3]}))
      (rfa/dispatch-sync [:test-alpha-meta/dispatcher])
      (is (= [1 2 3] @seen))
      (is (nil? (meta (registrar/get-handler :fx :test-alpha-meta/fx-via-fn)))))))

(deftest alpha-programmatic-registration-via-apply-and-map
  (testing "alpha -fn variants support `apply` and `map` registration paths"
    (let [recorded (atom {})]
      (apply rfa/reg-event-fx-fn
             [:test-alpha-meta/applied
              (fn [_ [_ tag]]
                (swap! recorded assoc :applied tag)
                {})])
      (let [ids [:test-alpha-meta/m1 :test-alpha-meta/m2 :test-alpha-meta/m3]
            fs  [(fn [d _] (:a d))
                 (fn [d _] (:b d))
                 (fn [d _] (:c d))]]
        (dorun (map rfa/reg-sub-fn ids fs)))
      (reset! db/app-db {:a 1 :b 2 :c 3})
      (rfa/dispatch-sync [:test-alpha-meta/applied :ok])
      (is (= :ok (:applied @recorded)))
      (is (= [1 2 3]
             [@(rfa/subscribe [:test-alpha-meta/m1])
              @(rfa/subscribe [:test-alpha-meta/m2])
              @(rfa/subscribe [:test-alpha-meta/m3])])))))
