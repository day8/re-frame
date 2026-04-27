(ns re-frame.live-query-vs-test
  "Tests for `re-frame.subs/live-query-vs` and its re-exports in
   `re-frame.core` and `re-frame.alpha` — the public accessor that
   returns all currently-live query-vectors from the subscription cache.

   Runs CLJ-side under cognitect.test-runner."
  (:require [clojure.test  :refer [deftest is testing use-fixtures]]
            [re-frame.core  :as rf]
            [re-frame.alpha :as rfa]
            [re-frame.subs  :as subs]
            [re-frame.db    :as db]))

(defn fixture-clear-subs
  [f]
  (let [restore (rf/make-restore-fn)]
    (try (f) (finally (restore)))))

(use-fixtures :each fixture-clear-subs)

(deftest empty-when-no-subscriptions
  (testing "returns empty seq when no subscriptions are active"
    (rf/clear-subscription-cache!)
    (is (empty? (subs/live-query-vs))
        "no active subs → empty seq")))

(deftest single-sub-appears-in-live-query-vs
  (testing "after subscribing, the query-v appears in live-query-vs"
    (rf/reg-sub :lqv/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (rf/subscribe [:lqv/echo])
    (is (some #{[:lqv/echo]} (subs/live-query-vs))
        "subscribed query-v appears in the live set")))

(deftest multiple-subs-all-appear
  (testing "multiple distinct active subscriptions all appear"
    (rf/reg-sub :lqv/a (fn [db _] (:a db)))
    (rf/reg-sub :lqv/b (fn [db _] (:b db)))
    (reset! db/app-db {:a 1 :b 2})
    (rf/subscribe [:lqv/a])
    (rf/subscribe [:lqv/b])
    (let [vs (set (subs/live-query-vs))]
      (is (contains? vs [:lqv/a]))
      (is (contains? vs [:lqv/b])))))

(deftest parameterised-query-v-preserved
  (testing "query-v including params is preserved as-is"
    (rf/reg-sub :lqv/echo (fn [db [_ x]] x))
    (reset! db/app-db {})
    (rf/subscribe [:lqv/echo 42 :extra])
    (is (some #{[:lqv/echo 42 :extra]} (subs/live-query-vs)))))

(deftest clears-after-cache-clear
  (testing "cleared cache returns empty seq"
    (rf/reg-sub :lqv/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (rf/subscribe [:lqv/echo])
    (is (some? (seq (subs/live-query-vs))) "has entries before clear")
    (rf/clear-subscription-cache!)
    (is (empty? (subs/live-query-vs)) "empty after clear")))

(deftest core-export-delegates-to-subs
  (testing "re-frame.core/live-query-vs delegates to re-frame.subs/live-query-vs"
    (rf/reg-sub :lqv/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (rf/subscribe [:lqv/echo])
    (is (= (set (rf/live-query-vs))
           (set (subs/live-query-vs)))
        "core re-export and subs fn return the same set")))

(deftest alpha-export-delegates-to-subs
  (testing "re-frame.alpha/live-query-vs delegates to re-frame.subs/live-query-vs"
    (rf/reg-sub :lqv/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (rf/subscribe [:lqv/echo])
    (is (= (set (rfa/live-query-vs))
           (set (subs/live-query-vs)))
        "alpha re-export and subs fn return the same set")))
