(ns todomvc.handlers
  (:require
    [todomvc.db    :refer [default-value valid-schema?
                           get-local-storage set-local-storage!]]
    [re-frame.core :refer [register-handler
                           path after
                           trim-v debug]]))


;; -- Middleware --------------------------------------------------------------
;;
;; checks that the structure in app-db matches the schema
(def schema-ok? (after valid-schema?))

;; store todos in local storage
(def write-ls-todos (after #(set-local-storage! :todos %)))

;; middleware for a handler which manipulates todos.
(def todo-middleware [schema-ok? (path :todos) write-ls-todos debug  trim-v])


;; -- Helpers -----------------------------------------------------------------

(defn next-id
  [todos]
  (if (empty? todos)
    0
    (inc (last (keys todos)))))


;; -- Handlers ----------------------------------------------------------------

(register-handler                 ;; disptached to on app startup
  :initialise-db                  ;; event id being handled
  check-schema                    ;; middleware
  (fn  [_ _]                      ;; the handler
    (merge default-value
           #_(get-local-storage))))    ;; all hail the new state


(register-handler                 ;; handlers changes the footer filter
  :set-showing                    ;; event-id
  [(path :showing) check-schema debug trim-v]     ;; middleware  (wraps the handler)
  (fn                             ;; handler
    [db [filter-kw]]
    filter-kw))


(register-handler                  ;; given the text, create a new todo
  :add-todo
  todo-middleware
  (fn [todos [text]]               ;; "path" middlware means we are given :todo
    (let [id  (next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


(register-handler
  :complete-all-toggle
  todo-middleware
  (fn [todos]
    (let [val (not-every? :done (vals todos))]   ;; toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] val)
              todos
              (keys todos)))))


(register-handler
  :toggle-done
  todo-middleware
  (fn [todos [id]]
    (update-in todos [id :done] not)))


(register-handler
  :save
  todo-middleware
  (fn [todos [id title]]
    (assoc-in todos [id :title] title)))


(register-handler
  :delete-todo
  todo-middleware
  (fn [todos [id]]
    (dissoc todos id)))


(register-handler
  :clear-completed
  todo-middleware
  (fn [todos _]
    (->> (vals todos)                ;; remove all todos where :done is true
         (filter :done)
         (map :id)
         (reduce dissoc todos))))
