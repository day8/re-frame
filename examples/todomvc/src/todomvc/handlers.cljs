(ns todomvc.handlers
  (:require
    [todomvc.db    :refer [default-value ls->todos todos->ls!]]
    [re-frame.core :refer [def-event path trim-v after debug]]
    [cljs.spec     :as s]))


;; -- Middleware --------------------------------------------------------------
;;
;; See https://github.com/Day8/re-frame/wiki/Using-Handler-Middleware
;;

(defn check-and-throw
  "throw an exception if db doesn't match the spec."
  [a-spec db]
  (if-not (s/valid? a-spec db)
    (throw (ex-info "spec check failed: " {:problems
                                             (s/explain-str a-spec db)}))))

;; Event handlers change state, that's their job. But what happens if there's
;; a bug and it corrupts this state in some subtle way? This middleware is run after
;; each event handler has finished, and it checks app-db against a spec.  This
;; helps us detect event handler bugs early.
(def check-spec-mw (after (partial check-and-throw :todomvc.db/db)))


(def ->ls (after todos->ls!))    ;; middleware to store todos into local storage


;; middleware for any handler that manipulates todos
(def todo-middleware [check-spec-mw   ;; ensure the spec is still valid
                      (path :todos)   ;; 1st param to handler will be the value from this path
                      ->ls            ;; write to localstore each time
                      (when ^boolean js/goog.DEBUG debug)       ;; look in your browser console
                      trim-v])        ;; remove the first (event id) element from the event vec


;; -- Helpers -----------------------------------------------------------------

(defn allocate-next-id
  "Returns the next todo id.
  Assumes todos are sorted.
  Returns one more than the current largest id."
  [todos]
  ((fnil inc 0) (last (keys todos))))


;; -- Event Handlers ----------------------------------------------------------

                                  ;; usage:  (dispatch [:initialise-db])
(def-event                        ;; On app startup, create initial state
  :initialise-db                  ;; event id being handled
  check-spec-mw                   ;; afterwards: check that app-db matches the spec
  (fn [_ _]                       ;; the handler being registered
    (merge default-value (ls->todos))))  ;; all hail the new state


                                  ;; usage:  (dispatch [:set-showing  :active])
(def-event                        ;; this handler changes the todo filter
  :set-showing                    ;; event-id
  [check-spec-mw (path :showing) trim-v]  ;; middleware  (wraps the handler)

  ;; Because of the path middleware above, the 1st parameter to
  ;; the handler below won't be the entire 'db', and instead will
  ;; be the value at a certain path within db, namely :showing.
  ;; Also, the use of the 'trim-v' middleware means we can omit
  ;; the leading underscore from the 2nd parameter (event vector).
  (fn [old-kw [new-filter-kw]]    ;; handler
    new-filter-kw))               ;; return new state for the path


                                  ;; usage:  (dispatch [:add-todo  "Finsih comments"])
(def-event                        ;; given the text, create a new todo
  :add-todo
  todo-middleware
  (fn [todos [text]]              ;; "path" middlware in "todo-middleware" means 1st parameter is :todos
    (let [id (allocate-next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


(def-event
  :toggle-done
  todo-middleware
  (fn [todos [id]]
    (update-in todos [id :done] not)))


(def-event
  :save
  todo-middleware
  (fn [todos [id title]]
    (assoc-in todos [id :title] title)))


(def-event
  :delete-todo
  todo-middleware
  (fn [todos [id]]
    (dissoc todos id)))


(def-event
  :clear-completed
  todo-middleware
  (fn [todos _]
    (->> (vals todos)                ;; remove all todos where :done is true
         (filter :done)
         (map :id)
         (reduce dissoc todos))))    ;; returns the new version of todos


(def-event
  :complete-all-toggle
  todo-middleware
  (fn [todos _]
    (let [new-done (not-every? :done (vals todos))]   ;; toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] new-done)
              todos
              (keys todos)))))
