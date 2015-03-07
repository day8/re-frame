(ns todomvc.db)


;; -- Default app-db Value  ---------------------------------------------------

(def default-value            ;; what gets put into app-db by default.
  {:todos   (sorted-map)      ;; use the (int) :id as the key
   :showing :all})            ;; one of :all :done :completed


;; -- Local Storage  ----------------------------------------------------------

(def lsk "ls-key")      ;; local store key

(defn ls->todos
  "Read in a list of todos from local storage, and process into a
  sorted-map, suitable for merging into app-db.
  LocalStorage can only keep strings, so we loose keywords on the way in.
  Here, on load, we struggle to recreate the lost keywords. But we'll stay
  strong, and refuse to to wimp out and go with string keys"
  []
  (some->> (.getItem js/localStorage lsk)
          (js/JSON.parse) 
          (#(js->clj %1 :keywordize-keys true))
          (map (juxt :id identity))
          (flatten)
          (apply sorted-map)
          (hash-map :todos)))

(defn todos->ls!
  [todos]
  (->> (clj->js (vals todos))        ;;  Write just the todos, not the sorted-map
       (js/JSON.stringify)
       (.setItem js/localStorage lsk)))