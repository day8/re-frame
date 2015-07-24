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


(deftest on-changes
         (let [set-a     (fn [db v] (assoc db :a v))      ;; handler
               mid-ware  (middleware/on-changes + [:c] [:a] [:b])   ;; middleware
               wrapped   (mid-ware set-a)]                ;; wrapped middleware
             (is (= (wrapped {:a 0 :b 2} 0)               ;; no change in 'a'
                    {:a 0 :b 2}))
             (is (= (wrapped {:a 4 :b 2} 0)               ;; 'a' changed to 0
                    {:c 2 :a 0 :b 2}))))                  ;; 'c' is a + b
