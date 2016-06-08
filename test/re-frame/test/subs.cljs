(ns re-frame.test.subs
  (:require [cljs.test         :refer-macros [is deftest]]
            [reagent.ratom     :refer-macros [reaction]]
            [re-frame.subs     :as subs]
            [re-frame.db       :as db]
            [re-frame.core     :as re-frame]))


;=====test basic subscriptions  ======

(deftest test-reg-sub

  (subs/register
    :test-sub
    (fn [db [_]] (reaction (deref db))))

  (let [test-sub (subs/subscribe [:test-sub])]
    (is (= @db/app-db @test-sub))
    (reset! db/app-db 1)
    (is (= 1 @test-sub))))

(deftest test-chained-subs

  (subs/register
    :a-sub
    (fn [db [_]] (reaction (:a @db))))

  (subs/register
    :b-sub
    (fn [db [_]] (reaction (:b @db))))

  (subs/register
    :a-b-sub
    (fn [db [_]]
      (let [a (subs/subscribe [:a-sub])
            b (subs/subscribe [:b-sub])]
        (reaction {:a @a :b @b}))))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1 :b 2} @test-sub))
    (swap! db/app-db assoc :b 3)
    (is (= {:a 1 :b 3} @test-sub))))