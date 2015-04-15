(ns todomvc.db
  (:require [cljs.reader]))


;; -- Default app-db Value  ---------------------------------------------------

(def default-value            ;; what gets put into app-db by default.
  {:todos   (sorted-map)      ;; use the (int) :id as the key
   :showing :all})            ;; one of :all :done :completed


;; -- Local Storage  ----------------------------------------------------------

(def lsk "todos-reframe")     ;; local store key

(defn ls->todos
  "Read in todos from LS, and process into a form we can merge into app-db."
  []
  (some->> (.getItem js/localStorage lsk)
           (cljs.reader/read-string)
           (into (sorted-map))         ;; map -> sorted-map
           (hash-map :todos)))

(defn todos->ls!
  [todos]
  (.setItem js/localStorage lsk (str todos)))   ;; sorted-map writen as a map
