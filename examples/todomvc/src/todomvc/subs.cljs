(ns todomvc.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub
                                   subscribe ]]))


;; -- Helpers -----------------------------------------------------------------


(defn filter-fn-for
  [showing-kw]
  (case showing-kw
    :active (complement :done)
    :done   :done
    :all    identity))


(defn completed-count
  "return the count of todos where :done is true"
  [todos]
  (count (filter :done (vals todos))))


;; -- Subscriptions -----------------------------------------------------------

(register-sub                    ;; has app-db been initialised yet?
  :initialised?                  ;; usage:  (subscribe [:initialised?])
  (fn [db _]
    (reaction (not (empty? @db)))))


(register-sub
  :visible-todos
  (fn [db _]
    (reaction
      (let [filter-fn (filter-fn-for (:showing @db))
            todos     (:todos @db)]
        (filter filter-fn todos)))))


(register-sub
  :completed-count
  (fn [db _]
    (reaction (completed-count (:todos @db)))))


(register-sub
  :footer-stats
  (fn
    [db _]
    (reaction
      (let [todos (:todos @db)
            completed-count (completed-count todos)
            active-count    (- (count todos) completed-count)
            showing         (:showing db)]
        [active-count completed-count showing]))))  ;; tuple

