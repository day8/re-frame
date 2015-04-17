(ns todomvc.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]))


;; -- Helpers -----------------------------------------------------------------


(defn filter-fn-for
      [showing-kw]
      (case showing-kw
            :active (complement :done)
            :done   :done
            :all    identity))


(defn completed-count
      "return the count of todos for which :done is true"
      [todos]
      (count (filter :done (vals todos))))


;; -- Subscription handlers and registration  ---------------------------------

(register-sub
  :todos                ;; usage:  (subscribe [:todos])
  (fn [db _]
      (reaction (vals (:todos @db)))))

(register-sub
  :visible-todos
  (fn [db _]
      (reaction (let [filter-fn (filter-fn-for (:showing @db))
                      todos     (vals (:todos @db))]
                     (filter filter-fn todos)))))

(register-sub
  :completed-count
  (fn [db _]
      (reaction (completed-count (:todos @db)))))

(register-sub
  :footer-stats
  (fn [db _]
      (reaction
        (let [todos (:todos @db)
              completed-count (completed-count todos)
              active-count    (- (count todos) completed-count)
              showing         (:showing @db)]
             [active-count completed-count showing]))))  ;; tuple
