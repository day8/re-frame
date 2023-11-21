(ns re-frame.flow.alpha-test
  (:require
   [cljs.test :refer [is deftest async use-fixtures testing]]
   [re-frame.alpha :as rf]
   [re-frame.flow.alpha :as f]))

(use-fixtures :each (fn [f] (f) (reset! f/flows {})))

(deftest abstractions
  (is (f/db-path? []))
  (is (f/flow? {}))
  (is (f/flow<-? {::f/flow<- :a}))
  (is (f/flow<-? (f/flow<- :a))))

(deftest helpers
  (let [c {:id :c
           :inputs {:db-path [:some :path]
                    :flow-a (rf/flow<- :a)}
           :live-inputs {:db-path [:some :path]
                         :flow-b (rf/flow<- :b)}
           :path [:x :y :z]}]
    (rf/reg-flow c)
    (rf/reg-flow {:id :a})
    (rf/reg-flow {:id :b})
    (testing "registration"
      (is (= :a (:id (f/lookup :a)))))
    (testing "topological sort"
      (is (= #{:a :b} (set (f/input-ids c))))
      (is (= :c (last (map :id (f/topsort @f/flows))))))

    (testing "stale inputs & outputs"
      (is (= {:flow-a [:a]} (f/stale-in-flows {:flow-a {:path [:a]}}
                                              {:inputs {:a [:a]}})))

      (is (= {:flow-a {:b [:b]}} (f/stale-out-flows {:flow-a {:inputs {:b [:b]}}}
                                                    {:path [:b]}))))))

(deftest registry
  (testing "reg-flow"
    (rf/reg-flow {:id :a})
    (is (some? (f/lookup :a)))
    (rf/reg-flow :b {})
    (is (some? (f/lookup :b))))
  (testing "clear-flow"
    (rf/clear-flow :a)
    (is (nil? (f/lookup :a)))
    (rf/reg-flow {:id :c})
    (rf/clear-flow)
    (is (nil? (f/lookup :b)))
    (is (nil? (f/lookup :c)))))

(deftest get-flow
  (rf/reg-flow {:id :x :path [:a :b]})
  (let [db {:a {:b :y}}]
    (is (= :y (rf/get-flow db :x)))))

(deftest run-flow
  (rf/reg-flow {:id :x
                :inputs {}
                :output (fn [db] {})
                :path [:a :b]}))
