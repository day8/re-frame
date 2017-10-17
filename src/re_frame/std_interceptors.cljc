(ns re-frame.std-interceptors
  "contains re-frame supplied, standard interceptors"
  (:require
    [re-frame.interceptor :refer [->interceptor get-effect get-coeffect assoc-coeffect assoc-effect]]
    [re-frame.loggers :refer [console]]
    [re-frame.registrar :as registrar]
    [re-frame.db :refer [app-db]]
    [clojure.data :as data]
    [re-frame.cofx :as cofx]
    [re-frame.utils :as utils]))


(def debug
  "An interceptor which logs/instruments an event handler's actions to
  `js/console.debug`. See examples/todomvc/src/events.cljs for use.

  Output includes:
  1. the event vector
  2. a `clojure.data/diff` of db, before vs after, which shows
     the changes caused by the event handler.  You will absolutely have
     to understand https://clojuredocs.org/clojure.data/diff to
     understand the output.

  You'd typically include this interceptor after (to the right of) any
  path interceptor.

  Warning:  calling clojure.data/diff on large, complex data structures
  can be slow. So, you won't want this interceptor present in production
  code. So condition it out like this :

    (re-frame.core/reg-event-db
       :evt-id
       [(when ^boolean goog.DEBUG re-frame.core/debug)]  ;; <-- conditional
       (fn [db v]
         ...))

  To make this code fragment work, you'll also have to set goog.DEBUG to
  false in your production builds - look in `project.clj` of /examples/todomvc.
  "
  (->interceptor
    :id     :debug
    :before (fn debug-before
              [context]
              (console :log "Handling re-frame event:" (get-coeffect context :event))
              context)
    :after  (fn debug-after
              [context]
              (let [event   (get-coeffect context :event)
                    orig-db (get-coeffect context :db)
                    new-db  (get-effect   context :db ::not-found)]
                (if (= new-db ::not-found)
                  (console :log "No :db changes caused by:" event)
                  (let [[only-before only-after] (data/diff orig-db new-db)
                        db-changed?    (or (some? only-before) (some? only-after))]
                    (if db-changed?
                      (do (console :group "db clojure.data/diff for:" event)
                          (console :log "only before:" only-before)
                          (console :log "only after :" only-after)
                          (console :groupEnd))
                      (console :log "no app-db changes caused by:" event))))
                context))))


(def trim-v
  "An interceptor which removes the first element of the event vector,
  allowing you to write more aesthetically pleasing event handlers. No
  leading underscore on the event-v!
  Your event handlers will look like this:

      (defn my-handler
        [db [x y z]]    ;; <-- instead of [_ x y z]
        ....)"
  (->interceptor
    :id      :trim-v
    :before  (fn trimv-before
               [context]
               (-> context
                   (update-in [:coeffects :event] subvec 1)
                   (assoc-in [:coeffects ::untrimmed-event] (get-coeffect context :event))))
    :after   (fn trimv-after
               [context]
               (-> context
                   (utils/dissoc-in [:coeffects ::untrimmed-event])
                   (assoc-in [:coeffects :event] (get-coeffect context ::untrimmed-event))))))


;; -- Interceptor Factories - PART 1 ---------------------------------------------------------------
;;
;; These 3 factories wrap the 3 kinds of event handlers.
;;

(defn db-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-db`.

  These handlers take two arguments;  `db` and `event`, and they return `db`.

  (fn [db event]
     ....)

  So, the interceptor wraps the given handler:
     1. extracts two `:coeffects` keys: db and event
     2. calls handler-fn
     3. stores the db result back into context's `:effects`"
  [handler-fn]
  (->interceptor
    :id     :db-handler
    :before (fn db-handler-before
              [context]
              (let [{:keys [db event]} (:coeffects context)]
                (->> (handler-fn db event)
                     (assoc-effect context :db))))))


(defn fx-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-fx`.

  These handlers take two arguments;  `coeffects` and `event`, and they return `effects`.

  (fn [coeffects event]
     {:db ...
      :dispatch ...})

   Wrap handler in an interceptor so it can be added to (the RHS) of a chain:
     1. extracts `:coeffects`
     2. call handler-fn giving coeffects
     3. stores the result back into the `:effects`"
  [handler-fn]
(->interceptor
  :id     :fx-handler
  :before (fn fx-handler-before
            [context]
            (let [{:keys [event] :as coeffects} (:coeffects context)]
              (->> (handler-fn coeffects event)
                   (assoc context :effects))))))


(defn ctx-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-ctx`.
  These advanced handlers take one argument: `context` and they return a modified `context`.
  Example:
     (fn [context]
        (enqueue context [more interceptors]))"
  [handler-fn]
  (->interceptor
    :id     :ctx-handler
    :before handler-fn))


;; -- Interceptors Factories -  PART 2 ------------------------------------------------------------


(defn path
  "returns an interceptor whose `:before` substitutes the coeffects `:db` with
  a sub-path of `:db`. Within `:after` it grafts the handler's return value
  back into db, at the right path.

  So, its overall action is to make the event handler behave like the function
  you might give to clojure's `update-in`.

  Examples:
    (path :some :path)
    (path [:some :path])
    (path [:some :path] :to :here)
    (path [:some :path] [:to] :here)

  Example Use:

    (reg-event-db
      :event-id
      (path [:a :b])  ;; used here, in interceptor chain
      (fn [b v]       ;; 1st arg is now not db. Is the value from path [:a :b] within db
        ... new-b))   ;; returns a new value for that path (not the entire db)

  Notes:
    1. `path` may appear more than once in an interceptor chain. Progressive narrowing.
    2. if `:effects` contains no `:db` effect, can't graft a value back in.
  "
  [& args]
  (let [path (flatten args)
        db-store-key :re-frame-path/db-store]    ;; this is where, within `context`, we store the original dbs
    (when (empty? path)
      (console :error "re-frame: \"path\" interceptor given no params"))
    (->interceptor
      :id      :path
      :before  (fn
                 [context]
                 (let [original-db (get-coeffect context :db)]
                   (-> context
                       (update db-store-key conj original-db)
                       (assoc-coeffect :db (get-in original-db path)))))
      :after   (fn [context]
                 (let [db-store     (db-store-key context)
                       original-db  (peek db-store)
                       new-db-store (pop db-store)
                       context'     (-> (assoc context db-store-key new-db-store)
                                        (assoc-coeffect :db original-db))     ;; put the original db back so that things like debug work later on
                       db           (get-effect context :db ::not-found)]
                   (if (= db ::not-found)
                     context'
                     (->> (assoc-in original-db path db)
                          (assoc-effect context' :db))))))))




(defn enrich
  "Interceptor factory which runs the given function `f` in the `after handler`
  position.  `f` is called with two arguments: `db` and `v`, and is expected to
  return a modified `db`.

  Unlike the `after` interceptor which is only about side effects, `enrich`
  expects `f` to process and alter the given `db` coeffect in some useful way,
  contributing to the derived data, flowing vibe.

  Example Use:
  ------------

  Imagine that todomvc needed to do duplicate detection - if any two todos had
  the same text, then highlight their background, and report them via a warning
  at the bottom of the panel.

  Almost any user action (edit text, add new todo, remove a todo) requires a
  complete reassessment of duplication errors and warnings. Eg: that edit
  just made might have introduced a new duplicate, or removed one. Same with
  any todo removal. So we need to re-calculate warnings after any CRUD events
  associated with the todos list.

  Unless we are careful, we might end up coding subtly different checks
  for each kind of CRUD operation.  The duplicates check made after
  'delete todo' event might be subtly different to that done after an
  editing operation. Nice and efficient, but fiddly. A bug generator
  approach.

  So, instead, we create an `f` which recalculates ALL warnings from scratch
  every time there is ANY change. It will inspect all the todos, and
  reset ALL FLAGS every time (overwriting what was there previously)
  and fully recalculate the list of duplicates (displayed at the bottom?).

  https://twitter.com/nathanmarz/status/879722740776939520

  By applying `f` in an `:enrich` interceptor, after every CRUD event,
  we keep the handlers simple and yet we ensure this important step
  (of getting warnings right) is not missed on any change.

  We can test `f` easily - it is a pure function - independently of
  any CRUD operation.

  This brings huge simplicity at the expense of some re-computation
  each time. This may be a very satisfactory trade-off in many cases."
  [f]
  (->interceptor
    :id    :enrich
    :after (fn enrich-after
             [context]
             (let [event (get-coeffect context :event)
                   db    (or (get-effect context :db)
                             ;; If no db effect is returned, we provide the original coeffect.
                             (get-coeffect context :db))]
               (->> (f db event)
                    (assoc-effect context :db))))))



(defn after
  "returns an interceptor which runs a given function `f` in the `:after`
  position, presumably for side effects.

  `f` is called with two arguments: the `:effects` value for `:db`
  (or the `coeffect` value of db if no db effect is returned) and the event.
  Its return value is ignored, so `f` can only side-effect.

  Examples use can be seen in the /examples/todomvc:
     - `f` runs schema validation (reporting any errors found).
     - `f` writes to localstorage."
  [f]
  (->interceptor
    :id    :after
    :after (fn after-after
             [context]
             (let [db    (or (get-effect context :db)
                             ;; If no db effect is returned, we provide the original coeffect.
                             (get-coeffect context :db))
                   event (get-coeffect context :event)]
               (f db event)    ;; call f for side effects
               context))))     ;; context is unchanged


(defn  on-changes
  "Interceptor factory which acts a bit like `reaction`  (but it flows into
  `db`, rather than out). It observes N paths within `db` and if any of them
  test not identical? to their previous value  (as a result of a event handler
  being run) then it runs `f` to compute a new value, which is then assoc-ed
  into the given `out-path` within `db`.

  Usage:

  (defn my-f
    [a-val b-val]
    ... some computation on a and b in here)

  (on-changes my-f [:c]  [:a] [:b])

  Put this Interceptor on the right handlers (ones which might change :a or :b).
  It will:
     - call `f` each time the value at path [:a] or [:b] changes
     - call `f` with the values extracted from [:a] [:b]
     - assoc the return value from `f` into the path  [:c]
  "
  [f out-path & in-paths]
  (->interceptor
    :id    :on-changes
    :after (fn on-change-after
             [context]
             (let [new-db   (get-effect context :db)
                   old-db   (get-coeffect context :db)

                   ;; work out if any "inputs" have changed
                   new-ins      (map #(get-in new-db %) in-paths)
                   old-ins      (map #(get-in old-db %) in-paths)
                   ;; make sure the db is actually set in the effect
                   changed-ins? (and (contains? (get-effect context) :db)
                                     (some false? (map identical? new-ins old-ins)))]

               ;; if one of the inputs has changed, then run 'f'
               (if changed-ins?
                 (->> (apply f new-ins)
                      (assoc-in new-db out-path)
                      (assoc-effect context :db))
                 context)))))
