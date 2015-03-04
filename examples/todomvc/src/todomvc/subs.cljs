(ns todomvc.subs
  (:require-macros [reagent.ratom :refer [reaction]])   ;; remove for v0.2.0-alpha2
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

(register-sub                    ;; has app-db been initialised yet?
  :initialised?                  ;; usage:  (subscribe [:initialised?])
  (fn [db _]
    (reaction (not (empty? @db)))))

;; in v0.2.0-alpha2 will be
#_(register-sub                    ;; has app-db been initialised yet?
  :initialised?                    ;; usage:  (subscribe [:initialised?])
  (complement empty? deref))


(register-sub
  :visible-todos
  (fn [db _]
    (reaction
      (let [filter-fn (filter-fn-for (:showing @db))
            todos     (vals (:todos @db))]
        (filter filter-fn todos)))))


;; in v0.2.0-alpha2 will be
#_(register-sub
  :visible-todos
  [(from [:showing]) (from [:todos])]
  (fn [showing todos]
     (filter (filter-fn-for @showing) @todos)))


(register-sub
  :completed-count
  (fn [db _]
    (reaction (completed-count (:todos @db)))))


;; in v0.2.0-alpha2 will be
#_(register-sub
  :completed-count
  (fn [db _]
    (completed-count (:todos @db))))


(register-sub
  :footer-stats
  (fn
    [db _]
    (reaction
      (let [todos (:todos @db)
            completed-count (completed-count todos)
            active-count    (- (count todos) completed-count)
            showing         (:showing @db)]
        [active-count completed-count showing]))))  ;; tuple


;; in v0.2.0-alpha2 will be
#_(register-sub
  :footer-stats
  [(from [:showing]) (from [:todos])]
  (fn
    [showing todos _]
      (let [completed-count (completed-count @todos)
            active-count    (- (count @todos) completed-count)]
        [active-count completed-count @showing])))  ;; tuple

