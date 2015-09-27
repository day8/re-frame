(ns todomvc.handlers
  (:require
    [todomvc.db    :refer [default-value ls->todos todos->ls! schema]]
    [re-frame.core :refer [register-handler path trim-v after]]
    [schema.core   :as s]))


;; -- Middleware --------------------------------------------------------------
;;
;; See https://github.com/Day8/re-frame/wiki/Using-Handler-Middleware
;;

(defn check-and-throw
  "throw an exception if db doesn't match the schema."
  [a-schema db]
  (if-let [problems  (s/check a-schema db)]
    (throw (js/Error. (str "schema check failed: " problems)))))

;; after an event handler has run, this middleware can check that
;; it the value in app-db still correctly matches the schema.
(def check-schema-mw (after (partial check-and-throw schema)))


(def ->ls (after todos->ls!))    ;; middleware to store todos into local storage

;; middleware for any handler that manipulates todos
(def todo-middleware [check-schema-mw ;; ensure the schema is still valid
                      (path :todos)   ;; 1st param to handler will be value from this path
                      ->ls            ;; write to localstore each time
                      trim-v])        ;; remove event id from event vec


;; -- Helpers -----------------------------------------------------------------

(defn allocate-next-id
  "Returns the next todo id.
  Assumes todos are sorted.
  Returns one more than the current largest id."
  [todos]
  ((fnil inc 0) (last (keys todos))))


;; -- Event Handlers ----------------------------------------------------------

                                  ;; usage:  (dispatch [:initialise-db])
(register-handler                 ;; On app startup, ceate initial state
  :initialise-db                  ;; event id being handled
  check-schema-mw                 ;; afterwards: check that app-db matches the schema
  (fn [_ _]                       ;; the handler being registered
    (merge default-value (ls->todos))))  ;; all hail the new state


                                  ;; usage:  (dispatch [:set-showing  :active])
(register-handler                 ;; this handler changes the todo filter
  :set-showing                    ;; event-id
  [check-schema-mw (path :showing) trim-v]  ;; middleware  (wraps the handler)

  ;; Because of the path middleware above, the 1st parameter to
  ;; the handler below won't be the entire 'db', and instead will
  ;; be the value at a certain path within db, namely :showing.
  ;; Also, the use of the 'trim-v' middleware means we can omit
  ;; the leading underscore from the 2nd parameter (event vector).
  (fn [old-kw [new-filter-kw]]    ;; handler
    new-filter-kw))               ;; return new state for the path


                                   ;; usage:  (dispatch [:add-todo  "Finsih comments"])
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
