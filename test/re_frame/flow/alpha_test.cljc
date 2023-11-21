(ns re-frame.flow.alpha-test
  (:require
   [cljs.test :refer [is deftest async use-fixtures testing]]
   [re-frame.alpha :as rf]
   [re-frame.flow.alpha :as f]))

(use-fixtures :each (fn [f] (f) (f/clear-flow)))

(deftest abstractions
  (is (f/db-path? []))
  (is (f/flow? {}))
  (is (f/flow<-? {::f/input :a})))

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
      (is (= :a (:id (rf/flow :a)))))
    (testing "topological sort"
      (is (= #{:a :b} (set (f/input-ids c))))
      (is (= :c (last (map :id (f/topsort @f/flows))))))

    (testing "stale inputs & outputs"
      (is (= {:flow-a [:a]} (f/stale-in-flows {:flow-a {:path [:a]}}
                                              {:inputs {:a [:a]}})))

      (is (= {:flow-a {:b [:b]}} (f/stale-out-flows {:flow-a {:inputs {:b [:b]}}}
                                                    {:path [:b]}))))))
