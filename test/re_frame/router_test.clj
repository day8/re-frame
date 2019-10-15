(ns re-frame.router-test
  (:require [clojure.test :refer :all]
            [re-frame.core :as rf]
            [re-frame.db :as db]))

(defn fixture-re-frame
  [f]
  (let [restore-re-frame (re-frame.core/make-restore-fn)]
    (f)
    (restore-re-frame)))

(use-fixtures :each fixture-re-frame)

(rf/reg-event-db
  ::test
  (fn [db [_ i]]
    (update db ::test (fnil conj []) i)))

(rf/reg-fx
 ::promise
 (fn [{:keys [p val]}]
   (deliver p val)))

(rf/reg-event-fx
 ::sentinel
 (fn [cofx [_ p val]]
   {::promise {:p p :val val}}))

(deftest dispatching-race-condition-469-test
  ;; Checks for day8/re-frame#469
  (let [p (promise)]
    (is (nil? (dotimes [i 1000]
                (rf/dispatch [::test i]))))
    (is (nil? (rf/dispatch [::sentinel p ::done])))
    (let [val (deref p 1000 ::timed-out)]
      (is (= ::done val)))
    (is (= (::test @db/app-db)
           (range 1000)))))
