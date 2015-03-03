(ns todomvc.handlers
  (:require [re-frame.core :refer [register-pure-handler
                                   path
                                   trim-v
                                   debug]]))


;; -- Middleware --------------------------------------------------------------
;; To be used for handlers operating solely on todos
;;
(def todo-middleware [(path [:todos])  debug trim-v])


;; -- Helpers -----------------------------------------------------------------

(defn next-id
  [todos]
  (if (empty? todos)
    0
    (inc (apply max (keys todos)))))  ;; hillariously inefficient, but yeah


;; -- Handlers ----------------------------------------------------------------

(register-pure-handler            ;; disptached to on program startup
  :initialise-db                  ;; event id being handled
  (fn  [_ _]                      ;; the handler
    default-initial-state))       ;; all hail the new state


(register-pure-handler            ;; disptached to when
  :set-showing                    ;; event-id
  [debug trim-v]                  ;; middleware  (wraps the handler)
  (fn                             ;; handler
    [db [filter-kw]]
    (assoc db :showing filter-kw)))


(register-pure-handler             ;; given only the text, create a new todo
  :add-todo
  todo-middleware                  ;; only 'todo' part of db provided
  (fn [todos [text]]
    (let [id  (next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


(register-pure-handler
  :complete-all-toggle
  todo-middleware
  (fn [todos]
    (let [val (not-every? :done (vals todos))]
      (reduce #(assoc-in %1 [%2 :done] val)
              todos
              (keys todos)))))


(register-pure-handler
  :toggle-done
  todo-middleware
  (fn [todos [id]]
    (update-in todos [id :done] not)))


(register-pure-handler
  :save
  todo-middleware
  (fn [todos [id title]]
    (assoc-in todos [id :title] title)))


(register-pure-handler
  :delete-todo
  todo-middleware
  (fn [todos [id]]
    (dissoc todos id)))


(register-pure-handler
  :clear-completed
  todo-middleware
  (fn [todos _]
    (->> (vals todos)                ;; remove all todos where :done is true
         (filter :done)
         (map :id)
         (reduce dissoc todos))))
