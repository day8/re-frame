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
                            (u/topsort-kahn cyclic-graph))))))
