(ns re-frame.test.subs
  (:require [cljs.test         :refer-macros [is deftest]]
            [reagent.ratom     :refer-macros [reaction]]
            [re-frame.subs     :as subs]
            [re-frame.db       :as db]
            [re-frame.core     :as re-frame]))

;=====test basic subscriptions  ======

(deftest test-reg-sub
  (subs/clear-handlers!)

  (subs/register
    :test-sub
    (fn [db [_]] (reaction (deref db))))

  (let [test-sub (subs/subscribe [:test-sub])]
    (is (= @db/app-db @test-sub))
    (reset! db/app-db 1)
    (is (= 1 @test-sub))))

(deftest test-chained-subs
  (subs/clear-handlers!)

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

(deftest test-sub-parameters
  (subs/clear-handlers!)

  (subs/register
    :test-sub
    (fn [db [_ b]] (reaction [(:a @db) b])))

  (let [test-sub (subs/subscribe [:test-sub :c])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= [1 :c] @test-sub))))


(deftest test-sub-chained-parameters
  (subs/clear-handlers!)

  (subs/register
    :a-sub
    (fn [db [_ a]] (reaction [(:a @db) a])))

  (subs/register
    :b-sub
    (fn [db [_ b]] (reaction [(:b @db) b])))

  (subs/register
    :a-b-sub
    (fn [db [_ c]]
      (let [a (subs/subscribe [:a-sub c])
            b (subs/subscribe [:b-sub c])]
        (reaction {:a @a :b @b}))))

  (let [test-sub (subs/subscribe [:a-b-sub :c])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a [1 :c], :b [2 :c]} @test-sub))))


;============== test cached-subs ================
(def side-effect-atom (atom 0))

(deftest test-cached-subscriptions
  (subs/clear-handlers!)
  (reset! side-effect-atom 0)

  (subs/register
    :side-effecting-handler
    (fn side-effect
      [db [_] [_]]
      (swap! side-effect-atom inc)
      (reaction @db)))

 (let [test-sub (subs/subscribe [:side-effecting-handler])]
    (reset! db/app-db :test)
    (is (= :test @test-sub))
    (is (= @side-effect-atom 1))
    (subs/subscribe [:side-effecting-handler])  ;; this should be handled by cache
    (is (= @side-effect-atom 1))
    (subs/subscribe [:side-effecting-handler :a]) ;; should fire again because of the param
    (is (= @side-effect-atom 2))
    (subs/subscribe [:side-effecting-handler :a]) ;; this should be handled by cache
    (is (= @side-effect-atom 2))))

;============== test register-pure macros ================

(deftest test-reg-sub-macro
  (subs/clear-handlers!)

  (subs/register-pure
    :test-sub
    (fn [db [_]] db))

  (let [test-sub (subs/subscribe [:test-sub])]
    (is (= @db/app-db @test-sub))
    (reset! db/app-db 1)
    (is (= 1 @test-sub))))

(deftest test-reg-sub-macro-singleton
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_]] (:a db)))

  (subs/register-pure
    :a-b-sub
    (fn [_ _ _]
      (subs/subscribe [:a-sub]))
    (fn [a [_]]
      {:a a}))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1} @test-sub))
    (swap! db/app-db assoc :b 3)
    (is (= {:a 1} @test-sub))))

(deftest test-reg-sub-macro-vector
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_]] (:a db)))

  (subs/register-pure
    :b-sub
    (fn [db [_]] (:b db)))

  (subs/register-pure
    :a-b-sub
    (fn [_ _ _]
      [(subs/subscribe [:a-sub])
       (subs/subscribe [:b-sub])])
    (fn [[a b] [_]]
      {:a a :b b}))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1 :b 2} @test-sub))
    (swap! db/app-db assoc :b 3)
    (is (= {:a 1 :b 3} @test-sub))))

(deftest test-reg-sub-macro-map
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_]] (:a db)))

  (subs/register-pure
    :b-sub
    (fn [db [_]] (:b db)))

  (subs/register-pure
    :a-b-sub
    (fn [_ _ _]
      {:a (subs/subscribe [:a-sub])
       :b (subs/subscribe [:b-sub])})
    (fn [{:keys [a b]} [_]]
      {:a a :b b}))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1 :b 2} @test-sub))
    (swap! db/app-db assoc :b 3)
    (is (= {:a 1 :b 3} @test-sub))))

(deftest test-sub-macro-parameters
  (subs/clear-handlers!)

  (subs/register-pure
    :test-sub
    (fn [db [_ b]] [(:a db) b]))

  (let [test-sub (subs/subscribe [:test-sub :c])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= [1 :c] @test-sub))))

(deftest test-sub-macros-chained-parameters
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_ a]] [(:a db) a]))

  (subs/register-pure
    :b-sub
    (fn [db [_ b]] [(:b db) b]))

  (subs/register-pure
    :a-b-sub
    (fn [[_ c] _]
      [(subs/subscribe [:a-sub c])
       (subs/subscribe [:b-sub c])])
    (fn [[a b] [_ c]] {:a a :b b}))

  (let [test-sub (subs/subscribe [:a-b-sub :c])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a [1 :c] :b [2 :c]} @test-sub))))

(deftest test-sub-macros-<-
  "test the syntactial sugar"
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_]] (:a db)))

  (subs/register-pure
        :a-b-sub
        :<- [:a-sub]
        (fn [a [_]] {:a a}))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1} @test-sub) )))

(deftest test-sub-macros-chained-parameters-<-
  "test the syntactial sugar"
  (subs/clear-handlers!)

  (subs/register-pure
    :a-sub
    (fn [db [_]] (:a db)))

  (subs/register-pure
    :b-sub
    (fn [db [_]] (:b db)))

  (subs/register-pure
        :a-b-sub
        :<- [:a-sub]
        :<- [:b-sub]
        (fn [[a b] [_ c]] {:a a :b b}))

  (let [test-sub (subs/subscribe [:a-b-sub :c])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1 :b 2} @test-sub) )))