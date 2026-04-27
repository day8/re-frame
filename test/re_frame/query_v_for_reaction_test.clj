(ns re-frame.query-v-for-reaction-test
  "Tests for `re-frame.core/query-v-for-reaction` — the public lookup
   that takes a reaction (the value returned by `subscribe`) and
   returns the query-v that produced it.

   Runs CLJ-side under cognitect.test-runner. The reverse map is keyed
   by reaction object identity (not reagent-id), so the lookup works
   on the JVM where `reagent-id` collapses every reaction to the same
   constant string."
  (:require [clojure.test  :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.subs :as subs]
            [re-frame.db   :as db]))

(defn fixture-clear-subs
  [f]
  (let [restore (rf/make-restore-fn)]
    (try (f) (finally (restore)))))

(use-fixtures :each fixture-clear-subs)

(deftest returns-query-v-for-known-reaction
  (testing "subscribe creates a reaction; query-v-for-reaction returns its query-v"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo 42])]
      (is (some? r) "subscribe returned a reaction")
      (is (= [:qvfr/echo 42] (rf/query-v-for-reaction r))
          "lookup returns the exact query-v passed to subscribe"))))

(deftest distinct-reactions-have-distinct-query-vs
  (testing "two subscribes with different query-vs map back to their own query-vs"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :a])
          r2 (rf/subscribe [:qvfr/echo :b])]
      (is (not (identical? r1 r2)) "different params → different reactions")
      (is (= [:qvfr/echo :a] (rf/query-v-for-reaction r1)))
      (is (= [:qvfr/echo :b] (rf/query-v-for-reaction r2))))))

(deftest cached-resubscribe-returns-same-query-v
  (testing "the cache returns the same reaction on a second subscribe; lookup is stable"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :same])
          r2 (rf/subscribe [:qvfr/echo :same])]
      (is (identical? r1 r2) "subscription cache returns the same reaction")
      (is (= [:qvfr/echo :same] (rf/query-v-for-reaction r1))))))

(deftest unknown-reaction-returns-nil
  (testing "a reaction not produced by subscribe (or already disposed) returns nil"
    (let [bare (reify clojure.lang.IDeref (deref [_] :not-a-sub))]
      (is (nil? (rf/query-v-for-reaction bare))
          "object never registered with the subs cache → nil"))))

(deftest disposed-reaction-drops-from-reverse-map
  (testing "after clear-subscription-cache!, the reaction's entry is gone"
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 7})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
          "registered before clear")
      (rf/clear-subscription-cache!)
      (is (nil? (rf/query-v-for-reaction r))
          "dispose callback removed the reverse-map entry"))))

(deftest subs-namespace-fn-matches-core-export
  (testing "the re-export in re-frame.core delegates to re-frame.subs unchanged"
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= (rf/query-v-for-reaction r)
             (subs/query-v-for-reaction r))
          "core re-export and subs fn agree"))))
