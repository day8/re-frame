(ns re-frame.flow.alpha-test
  (:require
   [cljs.test :refer [is deftest async use-fixtures testing]]
   [re-frame.alpha :as rf]
   [re-frame.flow.alpha :as f]))

(use-fixtures :each (fn [f] (f) (f/clear-flow)))

(deftest abstractions
  (is (f/db-path? []))
  (is (f/flow? {}))
  (is (f/flow-input? {::f/input :a}))
  (is (= :a (f/id {:id :a}))))

(deftest helpers
  (let [c {:id :c
           :inputs {:db-path [:some :path]
                    :flow-a (rf/flow-input :a)}
           :live-inputs {:db-path [:some :path]
                         :flow-b (rf/flow-input :b)}
           :path [:x :y :z]}]
    (rf/reg-flow c)
    (rf/reg-flow {:id :a})
    (rf/reg-flow {:id :b})
    (testing "registration"
      (is (= :a (f/id (rf/flow :a)))))
    (testing "topological sort"
      (is (= #{:a :b} (set (f/input-ids c))))
      (is (= :c (last (map :id (f/topsort @f/flows))))))
    (testing "deep cleanup"
      (is (= {} (f/deep-cleanup {:a {:b {:c {:d 1}}}} [:a :b :c :d])))
      (is (= {:a {:x 2}} (f/deep-cleanup {:a {:x 2 :b {:c {:d 1}}}} [:a :b :c :d]))))
    (testing "stale dependencies"
      (is (= {:flow-a [:a]} (f/stale-dependencies {:flow-a {:path [:a]}}
                                                  {:inputs {:a [:a]}})))

      (is (= {:flow-a {:b [:b]}} (f/stale-dependents {:flow-a {:inputs {:b [:b]}}}
                                                     {:path [:b]}))))))
