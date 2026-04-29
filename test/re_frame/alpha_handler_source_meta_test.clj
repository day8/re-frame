(ns re-frame.alpha-handler-source-meta-test
  "Alpha mirror of `handler_source_meta_test`. After the rf-7zdx
   revert, `re-frame.alpha`'s reg-* are plain `defn`s (not macros) —
   higher-order use (`apply`, `map`) works, and no source-meta is
   attached.

   Source-meta capture is opt-in via `re-frame.core-instrumented`, which targets
   `re-frame.core` (alpha has its own interceptor chain that the core
   macros don't reach). Alpha consumers needing source-meta should
   wire an alpha-specific macro layer downstream — out of scope for
   this revert."
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

(deftest alpha-reg-stars-are-functions
  (testing "re-frame.alpha registration entry points are defns, not macros"
    (is (fn? rfa/reg-event-db))
    (is (fn? rfa/reg-event-fx))
    (is (fn? rfa/reg-event-ctx))
    (is (fn? rfa/reg-sub))
    (is (fn? rfa/reg-fx))))

(deftest alpha-reg-event-db-attaches-no-source-meta
  (testing "alpha defn form does not capture call-site meta"
    (rfa/reg-event-db :test-alpha-meta/db-handler (fn [db _] db))
    (is (nil? (meta (registrar/get-handler :event :test-alpha-meta/db-handler)))
        "no &form available to a defn — no meta on the registered chain")))

(deftest alpha-reg-event-fx-dispatches
  (testing "alpha reg-event-fx (defn form) registers a handler that dispatches normally"
    (let [seen (atom nil)]
      (rfa/reg-fx :test-alpha-meta/fx-spy (fn [v] (reset! seen v)))
      (rfa/reg-event-fx :test-alpha-meta/fx-handler
                        (fn [_ [_ payload]]
                          {:test-alpha-meta/fx-spy payload}))
      (rfa/dispatch-sync [:test-alpha-meta/fx-handler :hello])
      (is (= :hello @seen)))))

(deftest alpha-reg-event-ctx-receives-context
  (testing "alpha reg-event-ctx (defn form) registers a ctx handler that receives full context"
    (let [seen-event (atom nil)
          seen-db    (atom nil)]
      (reset! db/app-db {:test-alpha-meta/marker :present})
      (rfa/reg-event-ctx :test-alpha-meta/ctx-handler
                         (fn [ctx]
                           (reset! seen-event (get-in ctx [:coeffects :event]))
                           (reset! seen-db    (get-in ctx [:coeffects :db]))
                           ctx))
      (rfa/dispatch-sync [:test-alpha-meta/ctx-handler :payload])
      (is (= [:test-alpha-meta/ctx-handler :payload] @seen-event))
      (is (= {:test-alpha-meta/marker :present} @seen-db)))))

(deftest alpha-reg-sub-derefs
  (testing "alpha reg-sub (defn form) registers a sub whose deref returns the computation against app-db"
    (rfa/reg-sub :test-alpha-meta/sub-via-fn (fn [d _] (:n d)))
    (reset! db/app-db {:n 42})
    (let [r (rfa/subscribe [:test-alpha-meta/sub-via-fn])]
      (is (= 42 @r)))))

(deftest alpha-reg-fx-fires-on-effect-return
  (testing "alpha reg-fx (defn form) registers an effect handler that fires when an event returns it"
    (let [seen (atom nil)]
      (rfa/reg-fx :test-alpha-meta/fx-via-fn (fn [v] (reset! seen v)))
      (rfa/reg-event-fx :test-alpha-meta/dispatcher
                        (fn [_ _] {:test-alpha-meta/fx-via-fn [1 2 3]}))
      (rfa/dispatch-sync [:test-alpha-meta/dispatcher])
      (is (= [1 2 3] @seen)))))

(deftest alpha-reg-stars-work-in-value-position
  (testing "the regression we're guarding against — apply / map over the alpha reg-* fns"
    (let [recorded (atom {})]
      (apply rfa/reg-event-fx
             [:test-alpha-meta/applied
              (fn [_ [_ tag]]
                (swap! recorded assoc :applied tag)
                {})])
      (let [ids [:test-alpha-meta/m1 :test-alpha-meta/m2 :test-alpha-meta/m3]
            fs  [(fn [d _] (:a d))
                 (fn [d _] (:b d))
                 (fn [d _] (:c d))]]
        (dorun (map rfa/reg-sub ids fs)))
      (reset! db/app-db {:a 1 :b 2 :c 3})
      (rfa/dispatch-sync [:test-alpha-meta/applied :ok])
      (is (= :ok (:applied @recorded)))
      (is (= [1 2 3]
             [@(rfa/subscribe [:test-alpha-meta/m1])
              @(rfa/subscribe [:test-alpha-meta/m2])
              @(rfa/subscribe [:test-alpha-meta/m3])])))))
