(ns todomvc.events
  (:require
    [todomvc.db    :refer [default-db todos->local-store]]
    [re-frame.core :refer [reg-event-db reg-event-fx inject-cofx path trim-v
                           after debug]]
    [cljs.spec.alpha :as s]))


;; -- Interceptors --------------------------------------------------------------
;; Interceptors are an advanced topic. So, we're plunging into the deep end here.
;;
;; There are full tutorials on Interceptors in re-frame's /docs. But to get
;; you going, here's a very high level description of them ...
;;
;; Every event handler can be "wrapped" in a chain of interceptors. Each of these
;; interceptors can do things "before" and/or "after" the event handler is executed.
;; They are like the "middleware" of web servers, wrapping around the "handler".
;; Interceptors are a useful way of factoring out commonality (across event
;; handlers) and looking after cross-cutting concerns like logging or validation.
;;
;; They are also used to "inject" values into the `coeffects` parameter of
;; an event handler, when that handler needs access to certain resources.
;;

(defn check-and-throw
  "Throws an exception if `db` doesn't match the Spec `a-spec`."
  [a-spec db]
  (when-not (s/valid? a-spec db)
    (throw (ex-info (str "spec check failed: " (s/explain-str a-spec db)) {}))))

;; Event handlers change state, that's their job. But what happens if there's
;; a bug in the event handler and it corrupts application state in some subtle way?
;; Next, we create an interceptor called `check-spec-interceptor`.
;; Later, we use this interceptor in the interceptor chain of all event handlers.
;; When included in the interceptor chain of an event handler, this interceptor
;; runs `check-and-throw` `after` the event handler has finished, checking
;; the value for `app-db` against a spec.
;; If the event handler corrupted the value for `app-db` an exception will be
;; thrown. This helps us detect event handler bugs early.
;; Because all state is held in `app-db`, we are effectively validating the
;; ENTIRE state of the application after each event handler runs.  All of it.
(def check-spec-interceptor (after (partial check-and-throw :todomvc.db/db)))

;; Part of the TodoMVC challenge is to store todos in local storage.
;; Next, we define an interceptor to help with this challenge.
;; This interceptor runs `after` an event handler, and it stores the
;; current todos into local storage.
;; Later, we include this interceptor into the interceptor chain
;; of all event handlers which modify todos.  In this way, we ensure that
;; any change to todos is written to local storage.
(def ->local-store (after todos->local-store))

;; Each event handler can have its own chain of interceptors.
;; Below we create the interceptor chain shared by all event handlers
;; which manipulate todos.
;; A chain of interceptors is a vector.
;; Explanation of `path` and `trim-v` is given further below.
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
;; This event is dispatched in the app's `main` (core.cljs).
;; It establishes initial application state in `app-db`.
;; That means merging:
;;   1. Any todos stored in LocalStore (from the last session of this app)
;;   2. Default initial values
;;
;; Advanced topic:  we inject the todos currently stored in LocalStore
;; into the first, coeffect parameter via use of the interceptor
;;    `(inject-cofx :local-store-todos)`
;;
;; To fully understand this advanced topic, you'll have to read the tutorials
;; and look at the bottom of `db.cljs` for the `:local-store-todos` cofx
;; registration.
(reg-event-fx                 ;; part of the re-frame API
  :initialise-db              ;; event id being handled

  ;; the interceptor chain (a vector of interceptors)
  [(inject-cofx :local-store-todos)  ;; gets todos from localstore, and puts into coeffects arg
   check-spec-interceptor]           ;; after the event handler runs, check app-db matches Spec

  ;; the event handler (function) being registered
  (fn [{:keys [db local-store-todos]} _]                    ;; take 2 vals from coeffects. Ignore event vector itself.
    {:db (assoc default-db :todos local-store-todos)}))     ;; all hail the new state


;; usage:  (dispatch [:set-showing  :active])
;; This event is dispatched when the user clicks on one of the 3
;; filter buttons at the bottom of the display.
(reg-event-db      ;; part of the re-frame API
  :set-showing     ;; event-id
  [check-spec-interceptor]
  (fn [db [_ new-filter-kw]]     ;; new-filter-kw is one of :all, :active or :done
    (assoc db :showing new-filter-kw)))

;; NOTE: here is a rewrite of the event handler above using `path` and `trim-v`
;; These interceptors are useful, but they are an advanced topic.
;; It will be illuminating if you compare this rewrite with the original above.
#_(reg-event-db
  :set-showing

  ;; this chain of 3 interceptors wrap the handler. Note use of `path` and `trim-v`
  [check-spec-interceptor (path :showing) trim-v]

  ;; The event handler
  ;; Because of the `path` interceptor above, the 1st parameter to
  ;; the handler below won't be the entire 'db', and instead will
  ;; be the value at the path `[:showing]` within db.
  ;; Also, the use of the `trim-v` interceptor means we can omit
  ;; the leading underscore from the 2nd parameter (event vector).
  (fn [old-keyword [new-filter-kw]]
    new-filter-kw))                  ;; return new state for the path


;; usage:  (dispatch [:add-todo  "a description string"])
(reg-event-db                     ;; given the text, create a new todo
  :add-todo

  ;; The standard set of interceptors, defined above, which we
  ;; use for all todos-modifying event handlers. Looks after
  ;; writing todos to LocalStore, etc.
  ;; NOTE: this chain includes `path` and `trim-v`
  todo-interceptors

  ;; The event handler function.
  ;; The "path" interceptor in `todo-interceptors` means 1st parameter is the
  ;; value at `:todos` path within `db`, rather than the full `db`.
  ;; And, further, it means the event handler returns just the value to be
  ;; put into `:todos` path, and not the entire `db`.
  ;; So, a path interceptor makes the event handler act more like clojure's `update-in`
  (fn [todos [text]]   ;; because of trim-v,  the 2nd parameter is NOT [_ text]
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
