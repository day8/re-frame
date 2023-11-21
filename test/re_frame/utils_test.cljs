(ns re-frame.utils-test
  (:require
   [cljs.test :refer [is deftest async use-fixtures testing]]
   [re-frame.utils :as u]))

(deftest topsort
  (testing "acyclic graph"
    (let [acyclic-graph {:A [:B :C]
                         :B [:D]
                         :C [:D]
                         :D []}]
      (is (= '(:A :B :C :D) (u/topsort-kahn acyclic-graph)))))
  (testing "cyclic graph"

    (let [cyclic-graph  {:A [:B]
                         :B [:C]
                         :C [:A]}
          e (atom nil)]
      (is (thrown-with-msg? js/Error
                            #"Graph has a cycle:"
                            (u/topsort-kahn cyclic-graph)))))
  (testing "orphaned edges"
    (is (= {:A [:B] :B []} (u/remove-orphans {:A [:B :C]
                                              :B []})))))

(testing "deep dissoc"
  (is (= {} (u/deep-dissoc {:a {:b {:c {:d 1}}}}
                           [:a :b :c :d])))
  (is (= {:a {:x 2}} (u/deep-dissoc {:a {:x 2 :b {:c {:d 1}}}}
                                    [:a :b :c :d]))))
