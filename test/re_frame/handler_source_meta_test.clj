(ns re-frame.handler-source-meta-test
  "Tests that the reg-event-db / reg-event-fx / reg-event-ctx / reg-sub
   / reg-fx macros attach `{:file :line}` source meta to the registered
   handler so `(meta (re-frame.registrar/get-handler kind id))` returns
   the call-site location.

   Also covers the run-time companion fns `reg-event-db-fn` /
   `reg-event-fx-fn` / `reg-event-ctx-fn` / `reg-sub-fn` / `reg-fx-fn`
   — the documented escape hatch for programmatic registration
   (`apply`, `map`) introduced when the reg-* names became macros. The
   contract for the -fn variants is: registration semantics identical
   to the macro form, but no source meta is attached (no &form).

   These run CLJ-side under cognitect.test-runner — the meta-attach
   path is identical between CLJ and CLJS, and the test runner doesn't
   require Chrome."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.db :as db]
            [re-frame.registrar :as registrar]
            [re-frame.subs :as subs]))

(defn fixture-clear-test-handlers
  "Clean up any handlers a test registered so the registrar atom
   doesn't accumulate :test-meta/* entries across deftests; clear the
   subscription cache so re-registered query-ids don't return a stale
   cached reaction; and reset app-db so dispatch-driven tests don't
   leak state into sibling tests."
  [f]
  (try
    (f)
    (finally
      (doseq [kind [:event :sub :fx]]
        (doseq [id (filter #(= "test-meta" (namespace %))
                           (keys (get @registrar/kind->id->handler kind)))]
          (registrar/clear-handlers kind id)))
      (subs/clear-subscription-cache!)
      (reset! db/app-db {}))))

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

(deftest reg-event-fx-fn-registers-and-dispatches-without-meta
  (testing "reg-event-fx-fn registers an fx-style event handler whose effects are processed under dispatch-sync, with no source meta on the registered chain"
    (let [seen (atom nil)]
      (rf/reg-fx :test-meta/fx-spy (fn [v] (reset! seen v)))
      (rf/reg-event-fx-fn :test-meta/fx-handler
                          (fn [_ [_ payload]]
                            {:test-meta/fx-spy payload}))
      (rf/dispatch-sync [:test-meta/fx-handler :hello])
      (is (= :hello @seen)
          "fx event-handler fired and the returned effect map was processed by do-fx")
      (is (nil? (meta (registrar/get-handler :event :test-meta/fx-handler)))
          "no &form is available to the run-time fn — the registered chain carries no source meta"))))

(deftest reg-event-ctx-fn-registers-and-dispatches-without-meta
  (testing "reg-event-ctx-fn registers a ctx-style event handler that receives the full context under dispatch-sync"
    (let [seen-event (atom nil)
          seen-db    (atom nil)]
      (reset! db/app-db {:test-meta/marker :present})
      (rf/reg-event-ctx-fn :test-meta/ctx-handler
                           (fn [ctx]
                             (reset! seen-event (get-in ctx [:coeffects :event]))
                             (reset! seen-db    (get-in ctx [:coeffects :db]))
                             ctx))
      (rf/dispatch-sync [:test-meta/ctx-handler :payload])
      (is (= [:test-meta/ctx-handler :payload] @seen-event)
          "ctx-handler received the original event vector via :coeffects")
      (is (= {:test-meta/marker :present} @seen-db)
          "ctx-handler received app-db via the inject-db cofx")
      (is (nil? (meta (registrar/get-handler :event :test-meta/ctx-handler)))
          "run-time fn skips meta-attach"))))

(deftest reg-sub-fn-2-ary-registers-and-derefs-without-meta
  (testing "reg-sub-fn (id, computation-fn) registers a sub whose deref returns the computation-fn result against app-db"
    (rf/reg-sub-fn :test-meta/sub-2ary (fn [d _] (:n d)))
    (reset! db/app-db {:n 42})
    (let [r (rf/subscribe [:test-meta/sub-2ary])]
      (is (= 42 @r)
          "the 2-ary form computes against app-db like the macro form does"))
    (is (nil? (meta (registrar/get-handler :sub :test-meta/sub-2ary)))
        "run-time fn skips meta-attach")))

(deftest reg-sub-fn-N-ary-signal-fn-form-via-sugar-pair
  (testing "reg-sub-fn N-ary :<- form composes over an upstream sub via the same kv-list path the reg-sub macro uses"
    (rf/reg-sub-fn :test-meta/sub-leaf    (fn [d _] (:n d)))
    (rf/reg-sub-fn :test-meta/sub-derived
                   :<- [:test-meta/sub-leaf]
                   (fn [n _] (* 2 n)))
    (reset! db/app-db {:n 21})
    (let [r (rf/subscribe [:test-meta/sub-derived])]
      (is (= 42 @r)
          ":<- sugar pair routes the upstream sub's value to the computation-fn"))))

(deftest reg-fx-fn-registers-effect-handler-without-meta
  (testing "reg-fx-fn registers an effect handler that fires when an event returns the registered effect"
    (let [seen (atom nil)]
      (rf/reg-fx-fn :test-meta/fx-via-fn (fn [v] (reset! seen v)))
      (rf/reg-event-fx :test-meta/dispatcher
                       (fn [_ _] {:test-meta/fx-via-fn [1 2 3]}))
      (rf/dispatch-sync [:test-meta/dispatcher])
      (is (= [1 2 3] @seen)
          "do-fx invoked the registered effect handler with its payload")
      (is (nil? (meta (registrar/get-handler :fx :test-meta/fx-via-fn)))
          "run-time fn skips meta-attach"))))

(deftest programmatic-registration-via-apply-and-map
  (testing "callers can register handlers by `apply` and `map` over the -fn variants — the documented escape hatch from the macro conversion"
    (let [recorded (atom {})]
      (apply rf/reg-event-fx-fn
             [:test-meta/applied
              (fn [_ [_ tag]]
                (swap! recorded assoc :applied tag)
                {})])
      (let [ids [:test-meta/m1 :test-meta/m2 :test-meta/m3]
            fs  [(fn [d _] (:a d))
                 (fn [d _] (:b d))
                 (fn [d _] (:c d))]]
        (dorun (map rf/reg-sub-fn ids fs)))
      (reset! db/app-db {:a 1 :b 2 :c 3})
      (rf/dispatch-sync [:test-meta/applied :ok])
      (is (= :ok (:applied @recorded))
          "(apply reg-event-fx-fn ...) registers a handler that responds to dispatch-sync")
      (is (= [1 2 3]
             [@(rf/subscribe [:test-meta/m1])
              @(rf/subscribe [:test-meta/m2])
              @(rf/subscribe [:test-meta/m3])])
          "(map reg-sub-fn ids fns) registers each id with its corresponding computation-fn"))))
