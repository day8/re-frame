(ns todomvc.db
  (:require [cljs.reader]))


;; -- Default app-db Value  ---------------------------------------------------

(def default-value            ;; what gets put into app-db by default.
  {:todos   (sorted-map)      ;; use the (int) :id as the key
   :showing :all})            ;; one of :all :done :completed


;; -- Local Storage  ----------------------------------------------------------

(def lsk "todos-reframe")     ;; local store key

(defn ls->todos
  "Read in a map of todos from local storage, and process into a
  sorted-map, suitable for merging into app-db."
  []
  (some->> (.getItem js/localStorage lsk)
           (cljs.reader/read-string)
           (into (sorted-map))         ;; map -> sorted-map
           (hash-map :todos)))

(defn todos->ls!
  [todos]
  (.setItem js/localStorage lsk (str todos)))   ;; sorted-map writen as a map