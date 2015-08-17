(ns re-frame.test.middleware
  (:require-macros [cemerick.cljs.test :refer (is deftest)])
  (:require [cemerick.cljs.test]
            [reagent.ratom :refer [atom]]
            [re-frame.core :as re-frame]))

(deftest trim-v
  (let [handler (fn [db vect] vect)]
    (is (= (handler nil [:a :b :c])
          [:a :b :c]))
    (is (= ((re-frame/trim-v handler) nil [:a :b :c])
          [:b :c]))))

(deftest path
  (let [db {:a true}
        handler (fn
                  [a [_]]
                  (not a))]
    (let [new-db (((re-frame/path [:a])
                    handler) db [nil])]
      (is (= (:a new-db)
            false)))))


(deftest on-changes
  (let [set-a (fn [db v] (assoc db :a v))                   ;; handler
        mid-ware (re-frame/on-changes + [:c] [:a] [:b])     ;; api
        wrapped (mid-ware set-a)]                           ;; wrapped api
    (is (= (wrapped {:a 0 :b 2} 0)                          ;; no change in 'a'
          {:a 0 :b 2}))
    (is (= (wrapped {:a 4 :b 2} 0)                          ;; 'a' changed to 0
          {:c 2 :a 0 :b 2}))))                              ;; 'c' is a + b
