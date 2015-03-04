(ns re-frame.test.middleware
  (:require-macros [cemerick.cljs.test :refer (is deftest)])
  (:require [cemerick.cljs.test :as t]
            [reagent.ratom  :refer [atom]]
            [re-frame.middleware :as middleware]))

(enable-console-print!)

(deftest pure
  (let [db (atom {:a true})
        handler (fn [db [_ key value]]
                  (assoc db key value))]
    ((middleware/pure handler) db [nil :a false])
    (is (= (:a @db) false))))

(deftest trim-v
  (let [handler (fn [db vect] vect)]
    (is (= (handler nil [:a :b :c]) 
           [:a :b :c]))
    (is (= ((middleware/trim-v handler) nil [:a :b :c]) 
           [:b :c]))))

(deftest path
  (let [db  {:a true}
        handler (fn 
                  [a [_]] 
                  (not a))] 
    (let [new-db (((middleware/path [:a])
                   handler) db [nil])]
      (is (= (:a new-db) 
             false)))))
