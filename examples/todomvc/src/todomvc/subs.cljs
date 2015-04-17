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

(def register-sub-2 (fn [a b c]))   ;; XXXremove
(def fetch (fn [a]))   ;; XXXremove

(register-sub-2
  :todos                ;; usage:  (subscribe [:todos])
  (fetch :todos)
  (fn [todos _]
    (vals todos)))

(register-sub-2
  :visible-todos
  [(fetch :todos) (fetch :showing)]
  (fn [todos showing _]
     (filter (filter-fn-for showing) (vals todos))))

(register-sub-2
  :completed-count
  (fetch :todos)
  (fn [todos _]
   (completed-count todos)))

(register-sub-2
  :footer-stats
  [(fetch :todos)  (fetch :showing)]
  (fn [todos showing _]
      (let [completed-count (completed-count todos)
            active-count    (- (count todos) completed-count)]
        [active-count completed-count showing])))  ;; tuple


;; So [:todos  :showing]   is the same as [(pull [:todos]) (from [:showing])]
;; a keyword  or vector is wrapped in "from"
;; a fucntion is called with 'app-db' and 'v'

;; What about the base case:   no accessors



