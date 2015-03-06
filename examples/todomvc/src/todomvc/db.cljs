(ns todomvc.db)


;; -- Default Value  ----------------------------------------------------------

(def default-value
  {:todos   (sorted-map)
   :showing :all})


;; -- Local Storage  ----------------------------------------------------------

(def lsk "todos-key")  ;; local store key

(defn ls->todos       ;; read in todos from local storage
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
  (->> (clj->js (vals todos))
       (js/JSON.stringify)
       (.setItem js/localStorage lsk)))