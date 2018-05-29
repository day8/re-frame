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

(deftest dispatching-race-condition-469-test
  ;; Checks for Day8/re-frame#469
  (is (nil? (dotimes [i 1000]
              (rf/dispatch [::test i]))))
  (is (= (::test @db/app-db)
         (range 1000))))
