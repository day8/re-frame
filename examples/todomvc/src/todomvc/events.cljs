(ns todomvc.events
  (:require
    [cljs.spec.alpha :as s]
    [re-frame.core :as rf]
    [todomvc.db :as todo-db] ))

; #todo :before    => :enter       to match pedestal
; #todo :after     => :leave

; #todo coeffects  =>  global state
; #todo   effects  =>     app state

; #todo   maybe rename interceptor chain to intc-chain, proc-chain, transform-chain

; #todo   unify [:dispatch ...] effect handlers
; #todo     {:do-effects [  ; <= always a vector param, else a single effect
; #todo        {:effect/id :eff-tag-1  :par1 1  :par2 2}
; #todo        {:effect/id :eff-tag-2  :effect/delay {:value 200  :unit :ms} ;
; #todo         :some-param "hello"  :another-param :italics } ] }

; #todo make all routes define an intc chain.
; #todo each intc is {:id ...  :enter ...  :leave ...} (coerce if :before/:after found - strictly)
; #todo each :enter/:leave fn is (fn [params-map] ...)
; #todo    where params-map  =>  {:event {:event/id ...  :param1 <val1>  :param2 <val2> ...}
; #todo                           :state {:app          ...
; #todo                                   :local-store  ...
; #todo                                   :datascript   ... }}

; #todo replace (reg-cofx ...)  =>  (definterceptor ...)  ; defines a regular fn

; #todo [:delete-item 42] => {:event/id :delete-item :value 42}
; #todo   {:event/id :add-entry  :key :name :value "Joe"}
; #todo   {:event/id :set-timer  :units :ms :value 50 :action (fn [] (js/alert "Expired!") }

; #todo (dispatch-event {:event/id <some-id> ...} )   => event map
; #todo (add-effect ctx {:effect/id <some-id> ...} )  => updated ctx


; -- Interceptors --------------------------------------------------------------
;
; Interceptors are a more advanced topic. So, we're plunging into the deep
; end here.
;
; There is a tutorial on Interceptors in re-frame's `/docs`, but to get
; you going fast, here's a very high level description ...
;
; Every event handler can be "wrapped" in a chain of interceptors. A
; "chain of interceptors" is actually just a "vector of interceptors". Each
; of these interceptors can have a `:before` function and an `:after` function.
; Each interceptor wraps around the "handler", so that its `:before`
; is called before the event handler runs, and its `:after` runs after
; the event handler has run.
;
; Interceptors with a `:before` action, can be used to "inject" values
; into what will become the `coeffects` parameter of an event handler.
; That's a way of giving an event handler access to certain resources,
; like values in LocalStore.
;
; Interceptors with an `:after` action, can, among other things,
; process the effects produced by the event handler. One could
; check if the new value for `app-db` correctly matches a Spec.

; -- First Interceptor ------------------------------------------------------
;
; Event handlers change state, that's their job. But what happens if there's
; a bug in the event handler and it corrupts application state in some subtle way?
; First, we create an interceptor called `check-spec-interceptor`. Then,
; we use this interceptor in the interceptor chain of all event handlers.
; When included in the interceptor chain of an event handler, this interceptor
; runs `check-and-throw` `after` the event handler has finished, checking
; the value for `app-db` against a spec.
; If the event handler corrupted the value for `app-db` an exception will be
; thrown. This helps us detect event handler bugs early.
; Because all state is held in `app-db`, we are effectively validating the
; ENTIRE state of the application after each event handler runs.  All of it.
(defn check-and-throw
  "Throws an exception if `db` doesn't match the Spec `a-spec`."
  [a-spec db]
  (when-not (s/valid? a-spec db)
    (throw (ex-info (str "spec check failed: " (s/explain-str a-spec db)) {}))))

; now we create an interceptor using `after`
(def check-spec-intc (rf/after (partial check-and-throw :todomvc.db/db)))

; -- Second Interceptor -----------------------------------------------------
;
; Part of the TodoMVC challenge is to store todos in local storage.
; Next, we define an interceptor to help with this challenge.
; This interceptor runs `after` an event handler, and it stores the current todos into local storage.
; Later, we include this interceptor into the interceptor chain
; of all event handlers which modify todos.  In this way, we ensure that
; every change to todos is written to local storage.
(def ->local-store-intc (rf/after todo-db/todos->local-store))

; -- Interceptor Chain ------------------------------------------------------
;
; Each event handler can have its own chain of interceptors.
; We now create the interceptor chain shared by all event handlers
; which manipulate todos. A chain of interceptors is a vector of interceptors.
; Explanation of the `path` Interceptor is given further below.
(def std-interceptors
  [check-spec-intc      ; ensure the spec is still valid  (rf/after)
   (rf/path :todos)     ; the 1st param given to handler will be the value from this path within db
   ->local-store-intc]) ; write todos to localstore  (rf/after)

; #todo kill off rf/path  ???   keep it simple & explicit

; -- Helpers -----------------------------------------------------------------
(defn allocate-next-id
  "Returns the next todo id. Assumes todos are sorted.
  Returns one more than the current largest id."
  [todos]
  ((fnil inc 0) (last (keys todos))))

; -- Event Handlers ----------------------------------------------------------

; usage:  (dispatch [:initialise-db])
;
; This event is dispatched when the app's `main` ns is loaded (todomvc.core).
; It establishes initial application state in `app-db`. That means merging:
;   1. Any todos stored in LocalStore (from the last session of this app)
;   2. Default initial values
;
; Advanced topic:  we inject the todos currently stored in LocalStore
; into the first, coeffect parameter via use of the interceptor
;    `(rf/inject-cofx :local-store-todos)`
;
; To fully understand this advanced topic, you'll have to read the tutorials
; and look at the bottom of `db.cljs` for the `:local-store-todos` cofx registration.
(rf/reg-event-fx ; #todo reg-event-fx => subscribe-to
  :initialise-db   ; event id being handled
  ; #todo is there just one handler per event?
  ; #todo   => (sethandler!    :evt-name  (fn [& args] ...))
  ; #todo   => (clearhandler!  :evt-name)
  ; #todo is there just one handler per event? => sethandler!

  ; #todo can there be multiple event subscribers?
  ; #todo   =>  (def subscriber-ref (event-subscription :evt-name (fn [& args] ...)))
  ; #todo   =>  (clear-subscriber  :evt-name  subscriber-ref)
  ; #todo   =>  (clear-subscribers :evt-name)
  ; #todo   =>  (subscribers :evt-name)
  ; #todo same for db-topic subscriptions

  ; the interceptor chain (a vector of 2 interceptors in this case)
  [(rf/inject-cofx :local-store-todos) ; gets todos from localstore, and puts value into coeffects arg
   check-spec-intc]  ; after event handler runs, check app-db for correctness. Does it still match Spec?
  ; #todo  coeffects -> global state

  ; the event handler being registered
  (fn [{:keys [db local-store-todos]} _]                  ; take 2 values from coeffects. Ignore event vector itself.
    {:db (assoc todo-db/default-db :todos local-store-todos)}))   ; all hail the new state to be put in app-db

; usage:  (rf/dispatch [:set-showing :active])
; This event is dispatched when the user clicks on one of the 3
; filter buttons at the bottom of the display.
  ; #todo #awt merge => global state (old cofx)
(rf/reg-event-db :set-showing     ; event-id
  ; only one interceptor
  [check-spec-intc]  ; after event handler runs, check app-db for correctness. Does it still match Spec?

  ; handler
  (fn [db [_ new-filter-kw]]     ; new-filter-kw is one of :all, :active or :done
    (assoc db :showing new-filter-kw)))

; NOTE: below is a rewrite of the event handler (above) using a `path` Interceptor
; You'll find it illuminating to compare this rewrite with the original.
;
; A `path` interceptor has BOTH a before and after action.
; When you create one, you supply "a path" into `app-db`, like:
; [:a :b 1]
; The job of "before" is to replace the app-db with the value
; of `app-db` at the nominated path. And, then, "after" to
; take the event handler returned value and place it back into
; app-db at the nominated path.  So the event handler works
; with a particular, narrower path within app-db, not all of it.
;
; So, `path` operates a little like `update-in`
(rf/reg-event-db :set-showing-using-path
  ; this now a chain of 2 interceptors. Note use of `path`
  [check-spec-intc (rf/path :showing)] ; #todo kill rf/path (duplication of api ability)

  ; The event handler. Because of the `path` interceptor above, the 1st parameter to
  ; the handler below won't be the entire 'db', and instead will
  ; be the value at the path `[:showing]` within db.
  ; Equally the value returned will be the new value for that path within app-db.
  (fn [old-showing-value [_ new-showing-value]]
    new-showing-value))                  ; return new state for the path

; usage:  (rf/dispatch [:add-todo  "a description string"])
; #todo rf/reg-event-db/fx  =>  set-event-handler!    (add to global state?) ; clear-event-handler!
; #todo rf/reg-event-db/fx  =>  set-effect-handler!   (add to global state?) ; clear-effect-handler!
(rf/reg-event-db :add-todo  ; given the text, create a new todo
  ; Use the standard interceptors, defined above, which we use for all todos-modifying
  ; event handlers. Looks after writing todos to LocalStore, etc.
  std-interceptors

  ; The event handler function.
  ; The "path" interceptor in `std-interceptors` means 1st parameter is the
  ; value at `:todos` path within `db`, rather than the full `db`.
  ; And, further, it means the event handler returns just the value to be
  ; put into the `[:todos]` path, and not the entire `db`.
  ; So, againt, a path interceptor acts like clojure's `update-in`
  (fn [todos [_ text]] ; => {:global-state xxx   :event {:event-name xxx  :arg1 yyy  :arg2 zzz ...}}
    (let [id (allocate-next-id todos)]
      (assoc todos id {:id id :title text :done false}))))
; #todo event handlers take only params-map (fn [params :- tsk/Map] ...)

(rf/reg-event-db
  :toggle-done
  std-interceptors
  (fn [todos [_ id]]
    (update-in todos [id :done] not)))

(rf/reg-event-db
  :save
  std-interceptors
  (fn [todos [_ id title]]
    (assoc-in todos [id :title] title)))

(rf/reg-event-db
  :delete-todo
  std-interceptors
  (fn [todos [_ id]]
    (dissoc todos id)))

(rf/reg-event-db
  :clear-completed
  std-interceptors
  (fn [todos _]
    (let [done-ids (->> (vals todos)         ; find id's for todos where (:done -> true)
                        (filter :done)
                        (map :id))]
      (reduce dissoc todos done-ids))))      ; delete todos which are done

(rf/reg-event-db
  :complete-all-toggle
  std-interceptors
  (fn [todos _]
    (let [new-done (not-every? :done (vals todos))]   ; work out: toggle true or false?
      (reduce #(assoc-in %1 [%2 :done] new-done)
              todos
              (keys todos)))))
