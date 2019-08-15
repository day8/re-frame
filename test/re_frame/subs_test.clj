(ns re-frame.subs-test
  (:require [clojure.test  :refer :all]
            [re-frame.subs :as subs]
            [re-frame.db   :as db]))

(defn fixture-re-frame
  [f]
  (let [restore-re-frame (re-frame.core/make-restore-fn)]
    (f)
    (restore-re-frame)))

(use-fixtures :each fixture-re-frame)

(deftest test-reg-sub-clj-repl
  (subs/reg-sub
   :a-sub
   (fn [db _] (:a db)))

  (subs/reg-sub
   :b-sub
   (fn [db _] (:b db)))

  (subs/reg-sub
   :a-b-sub
   (fn [_ _]
     [(subs/subscribe [:a-sub])
      (subs/subscribe [:b-sub])])
   (fn [[a b] _]
     {:a a :b b}))

  (let [test-sub (subs/subscribe [:a-b-sub])]
    (reset! db/app-db {:a 1 :b 2})
    (is (= {:a 1 :b 2} @test-sub))
    (swap! db/app-db assoc :b 3)
    (is (= {:a 1 :b 3} @test-sub))))
