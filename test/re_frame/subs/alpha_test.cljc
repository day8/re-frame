(ns re-frame.subs.alpha-test
  (:require [cljs.test         :as test :refer-macros [is deftest testing]]
            [reagent.ratom     :as r :refer-macros [reaction]]
            [re-frame.db       :as db]
            [re-frame.core     :as re-frame]
            [re-frame.interop  :refer [reactive?]]
            [re-frame.subs :refer [clear-all-handlers!]]
            [re-frame.subs.alpha :as subs]))

(test/use-fixtures :each {:before #(do (clear-all-handlers!)
                                       (subs/clear-all-methods!))})

(deftest test-sub-method-registration
  (let [q {}]
    (testing "Method registration"
      (subs/reg :sub-method ::test-method identity)
      (is (= (get @subs/lifecycle->method ::test-method) identity)))

    (testing "Strategy lookup"
      (is (every? #{::test-method} [(subs/lifecycle q)])))
    (testing "Method lookup"
      (is (= identity (subs/method q))))

    (testing "Subscription registration"
      (subs/reg :sub ::test-sub (fn [_ _] 42))
      (is (= @(subs/sub q) 42)))))

(deftest test-caching
  (testing "Caching a subscription value"
    (let [test-query {:test-sub "cache"}]
      (subs/cache! test-query 123)
      (is (= (subs/cached test-query) 123))))

  (testing "Clearing cache"
    (subs/clear!)
    (is (= @subs/cache {}))))

(deftest test-subscription-methods
  (testing "sub-reactive"
    (let [test-query {:test-sub "reactive"}]
      ;; Mock a reactive environment for the purpose of this test
      (with-redefs [reactive? (constantly true)]
        (subs/reg :sub :test-sub (fn [_ _] 999))
        (is (= (subs/sub test-query) 999)))))

  (testing "sub-safe"
    (let [test-query {:test-sub "safe"}]
      ;; Mock a non-reactive environment for the purpose of this test
      (with-redefs [reactive? (constantly false)]
        (subs/reg :sub :test-sub (fn [_ _] 888))
        (is (= (subs/sub test-query) 888)))))

  (testing "sub-default"
    ;; Since sub-default points to sub-safe, this test is optional.
    ;; Keeping it here for potential future changes.
    (let [test-query {:test-sub "default"}]
      ;; Mock a non-reactive environment for the purpose of this test
      (with-redefs [reactive? (constantly false)]
        (subs/reg :sub :test-sub (fn [_ _] 777))
        (is (= (subs/sub test-query) 777))))))

(deftest test-new-lifecycle-strategy-feature
  ;; TODO: Define tests here based on the new lifecycle strategy features.
  ;; You'd need to provide more specific details about this feature to write corresponding tests.
  )
