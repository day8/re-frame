(ns todomvc.handlers
  (:require
    [todomvc.db    :refer [default-value ls->todos todos->ls!]]
    [re-frame.core :refer [register-handler path trim-v after]]))


;; -- Middleware --------------------------------------------------------------
;;

(def ->ls (after todos->ls!))    ;; middleware to put todos into local storage

;; middleware for any handler which manipulates todos.
(def todo-ware [(path :todos) ->ls trim-v])


;; -- Helpers -----------------------------------------------------------------

(defn next-id
  [todos]
  ((fnil inc 0) (last (keys todos))))


;; -- Handlers ----------------------------------------------------------------

(register-handler                 ;; disptached to on app startup
  :initialise-db                  ;; event id being handled
  (fn  [_ _]                      ;; the handler
    (merge default-value (ls->todos))))  ;; all hail the new state


(register-handler                 ;; handlers changes the footer filter
  :set-showing                    ;; event-id
  [(path :showing) trim-v]        ;; middleware  (wraps the handler)
  (fn                             ;; handler
    [db [filter-kw]]
    filter-kw))


(register-handler                  ;; given the text, create a new todo
  :add-todo
  todo-ware
  (fn [todos [text]]               ;; "path" middlware means we are given :todo
    (let [id  (next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


(register-handler
  :toggle-done
  todo-ware
  (fn [todos [id]]
    (update-in todos [id :done] not)))


(register-handler
  :save
  todo-ware
  (fn [todos [id title]]
    (assoc-in todos [id :title] title)))


(register-handler
  :delete-todo
  todo-ware
  (fn [todos [id]]
    (dissoc todos id)))


(register-handler
  :clear-completed
  todo-ware
  (fn [todos _]
    (->> (vals todos)                ;; remove all todos where :done is true
         (filter :done)
         (map :id)
         (reduce dissoc todos))))


(register-handler
  :complete-all-toggle
  todo-ware
  (fn [todos]
    (let [new-done (not-every? :done (vals todos))]   ;; toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] new-done)
              todos
              (keys todos)))))
