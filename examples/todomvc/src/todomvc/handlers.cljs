(ns todomvc.handlers
  (:require
    [todomvc.db    :refer [default-value ls->todos todos->ls! schema]]
    [re-frame.core :refer [register-handler path trim-v after]]
    [schema.core   :as s]))


;; -- Middleware --------------------------------------------------------------
;;

(defn schema-checker
      "throw error with schema details if schema does not match.
      For better errors, tag your schema with :ref metadata
      e.g. (def my-schema ^{:ref (ns-line)} {...my schema....}"
      [db]
      (if-let [problems  (s/check schema db)]
          (throw (js/Error. (str "schema check failed: " problems)))))

(def check-schema (after schema-checker))


(def ->ls (after todos->ls!))    ;; middleware to store todos into local storage

;; middleware for any handler that manipulates todos
(def todo-middleware [check-schema    ;; after ever event handler make sure the schema is still valid
                      (path :todos)   ;; 1st param to handler will be value from this path
                      ->ls            ;; write to localstore each time
                      trim-v])        ;; remove event id from event vec


;; -- Helpers -----------------------------------------------------------------

(defn allocate-next-id
  "Returns the next daypart id.
  Assumes dayaprts are sorted.
  Returns one more than the current largest id."
  [todos]
  ((fnil inc 0) (last (keys todos))))


;; -- Handlers ----------------------------------------------------------------

                                  ;; usage:  (dispatch [:initialise-db])
(register-handler                 ;; On app startup, ceate initial state
  :initialise-db                  ;; event id being handled
  check-schema
  (fn [_ _]                       ;; the handler being registered
    (merge default-value (ls->todos))))  ;; all hail the new state


(register-handler                 ;; this handler changes the footer filter
  :set-showing                    ;; event-id
  [check-schema (path :showing) trim-v]        ;; middleware  (wraps the handler)

  ;; Because of the path middleware above, the 1st parameter to
  ;; the handler below won't be the entire 'db', and instead will
  ;; be the value at a certain path within db, namely :showing.
  ;; Also, the use of the 'trim-v' middleware means we can omit
  ;; the leading underscore from the 2nd parameter (event vector).
  (fn [old-kw [new-filter-kw]]    ;; handler
    new-filter-kw))               ;; return new state for the path


(register-handler                  ;; given the text, create a new todo
  :add-todo
  todo-middleware
  (fn [todos [text]]               ;; "path" middlware in "todo-middleware" means 1st parameter is :todos
    (let [id (allocate-next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


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
         (reduce dissoc todos))))    ;; returns the new version of todos


(register-handler
  :complete-all-toggle
  todo-middleware
  (fn [todos _]
    (let [new-done (not-every? :done (vals todos))]   ;; toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] new-done)
              todos
              (keys todos)))))
