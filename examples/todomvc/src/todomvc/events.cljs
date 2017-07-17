(ns todomvc.events
  (:require
    [todomvc.db    :refer [default-value todos->local-store]]
    [re-frame.core :refer [reg-event-db reg-event-fx inject-cofx path trim-v
                           after debug]]
    [cljs.spec     :as s]))


;; -- Interceptors --------------------------------------------------------------
;; Interceptors are an advanced topic. So, we're plunging into the deep end.
;;
;; There are full tutorials on Interceptors. But I'll try here to get you
;; going enough information so that you can proceed without reading those
;; docs for the moment.
;;
;; Every event handler can be "wrapped" in a chain of interceptors. Each of these
;; interceptors can do things "before" and/or "after" the event handler itself.
;; Think of them like the "middleware" that is often used in web servers.
;; Interceptors are a useful way of handling crosscutting concerns like
;; logging, or debugging, and factoring out commonality.
;;
;; They are also used to "inject" values into the `coeffects` parameter of
;; an event handler, when that handler needs access to certain resources.
;;
;; Yeah, so that's just enough information to get you going.  But read the
;; /docs for full information. This is an advanced topic.
;;
;;

(defn check-and-throw
  "Throws an exception if `db` doesn't match the Spec `a-spec`."
  [a-spec db]
  (when-not (s/valid? a-spec db)
    (throw (ex-info (str "spec check failed: " (s/explain-str a-spec db)) {}))))

;; Event handlers change state, that's their job. But what happens if there's
;; a bug in the event handler which corrupts application state in some subtle way?
;; Next, we create an interceptor `check-spec-interceptor`.
;; Later, we use this interceptor in the interceptor chain of all event handlers.
;; When included in the interceptor chain of an event handler, this interceptor
;; runs `check-and-throw` `after` the event handler has finished, checking
;; the contents of `app-db` against a spec.
;; If the event handler messed up `app-db` an exception will be thrown. This
;; helps us detect event handler bugs early.
;; Because all state is held in `app-db`, we are effectively checking the
;; ENTIRE state of the application after each event handler runs.
(def check-spec-interceptor (after (partial check-and-throw :todomvc.db/db)))

;; Part of the TodoMVC challenge is to remember todos in Local Storage.
;; Next, we define an interceptor to help with this challenge.
;; This interceptor runs `after` an event handler, and it stores the
;; current todos into local storage.
;; Later, we include this interceptor into the interceptor chain
;; of all event handlers which modify todos.
(def ->local-store (after todos->local-store))

;; Each event handler can have its own chain of interceptors.
;; Below we create the interceptor chain shared by all event handlers
;; which manipulate todos.
;; A chain of interceptors is a vector.
;; Explanation of `path` and `trimv` is given further below.
(def todo-interceptors [check-spec-interceptor               ;; ensure the spec is still valid  (after)
                        (path :todos)                        ;; 1st param to handler will be the value from this path within db
                        ->local-store                        ;; write todos to localstore  (after)
                        (when ^boolean js/goog.DEBUG debug)  ;; look at the js browser console for debug logs
                        trim-v])                             ;; removes first (event id) element from the event vec


;; -- Helpers -----------------------------------------------------------------

(defn allocate-next-id
  "Returns the next todo id.
  Assumes todos are sorted.
  Returns one more than the current largest id."
  [todos]
  ((fnil inc 0) (last (keys todos))))


;; -- Event Handlers ----------------------------------------------------------

;; usage:  (dispatch [:initialise-db])
;;
;; You'll see this event dispatched in the app's `main` (core.cljs)
;; It's job is to establish initial application state in `app-db`.
;; That means merging:
;;   1. Any todos stored in LocalStore (from the last session of this app)
;;   2. The default initial value
;;
;; Advanced topic:  we inject the todos currently stored in LocalStore
;; into the first, coeffect parameter via `(inject-cofx :local-store-todos)`
;; To fully understand how that works, you'll have to review the tutorials.
;; But, if you are interested, look at the bottom of `db.cljs` to see how this is done.
;;
(reg-event-fx                     ;; part of the re-frame API
  :initialise-db                  ;; event id being handled
  [(inject-cofx :local-store-todos)  ;; <-- advanced: obtain todos from localstore
   check-spec-interceptor]                                  ;; after the event handler runs, check that app-db matches the spec
  (fn [{:keys [db local-store-todos]} _]                    ;; the handler being registered
    {:db (assoc default-value :todos local-store-todos)}))  ;; all hail the new state


;; usage:  (dispatch [:set-showing  :active])
;; This event is dispatched when the user clicks on the various
;; filter buttons at the bottom of the panel. All, showing, done.
(reg-event-db      ;; part of the re-frame API
  :set-showing     ;; event-id
  [check-spec-interceptor]
  (fn [db [_ new-filter-kw]]
    (assoc db :showing new-filter-kw)))

;; NOTE: here is a rewrite of the event handler above using `path` or `trimv`
;; These interceptors can be interesting and useful, but they are a little advanced
#_(reg-event-db
  :set-showing                    ;; event-id

  ;; this chain of 3 interceptors wrap the handler. Note use of path and trimv
  [check-spec-interceptor (path :showing) trim-v]

  ;; The event handler
  ;; Because of the `path` interceptor above, the 1st parameter to
  ;; the handler below won't be the entire 'db', and instead will
  ;; be the value at the path `[:showing]` within db.
  ;; Also, the use of the `trim-v` interceptor means we can omit
  ;; the leading underscore from the 2nd parameter (event vector).
  (fn [old-keyword [new-filter-kw]]  ;; handler
    new-filter-kw))                  ;; return new state for the path


;; usage:  (dispatch [:add-todo  "a string"])
(reg-event-db                     ;; given the text, create a new todo
  :add-todo

  ;; The standard set of interceptors, defined above, which we
  ;; apply to all todos-modifying event handlers. Looks after
  ;; writing todos to local store, etc.
  ;; NOTE: the interceptors include `path` and `trimv`
  todo-interceptors

  ;; The event handler function.
  ;; The "path" interceptor in `todo-interceptors` means 1st parameter is the
  ;; value at `:todos` within `db`, rather than the full `db`.
  ;; And, further, it means the event handler returns just the value to be
  ;; put into `:todos` and not the entire `db`.
  ;; So, a path interceptor makea the event handler act more like clojure's `update-in`
  (fn [todos [text]]
    (let [id (allocate-next-id todos)]
      (assoc todos id {:id id :title text :done false}))))


(reg-event-db
  :toggle-done
  todo-interceptors
  (fn [todos [id]]
    (update-in todos [id :done] not)))


(reg-event-db
  :save
  todo-interceptors
  (fn [todos [id title]]
    (assoc-in todos [id :title] title)))


(reg-event-db
  :delete-todo
  todo-interceptors
  (fn [todos [id]]
    (dissoc todos id)))


(reg-event-db
  :clear-completed
  todo-interceptors
  (fn [todos _]
    (->> (vals todos)                ;; find the ids of all todos where :done is true
         (filter :done)
         (map :id)
         (reduce dissoc todos))))    ;; now delete these ids


(reg-event-db
  :complete-all-toggle
  todo-interceptors
  (fn [todos _]
    (let [new-done (not-every? :done (vals todos))]   ;; work out: toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] new-done)
              todos
              (keys todos)))))
