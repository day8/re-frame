(ns re-frame.interceptor
  (:require
    [re-frame.interop :refer [ratom?]]
    [re-frame.loggers :refer [console]]
    [re-frame.interop :refer [empty-queue debug-enabled?]]
    [re-frame.db      :refer [app-db]]
    [re-frame.registrar :as  registrar]
    [clojure.data       :as data]))



(def mandatory-interceptor-keys #{:name :after :before})

;; XXX use defrecord ??

(defn interceptor?
  [m]
  (and (map? m)
       (= mandatory-interceptor-keys (-> m keys set))))


(defn ->interceptor
  "Create an interceptor from named arguements"
  [& {:as m :keys [name before after]}]
  (when debug-enabled?
    (if-let [unknown-keys  (seq (clojure.set/difference
                             (-> m keys set)
                             mandatory-interceptor-keys))]
      (console :error "re-frame: unknown interceptor keys: " unknown-keys)))
  {:name   (or name :unnamed)
   :before before
   :after  after })

;; -- Helpers  ------------------------------------------------------------------------------------


(defn get-coeffect
  [context key]
  (get-in context [:coeffects key]))

(defn get-effect
  ([context key]
  (get-in context [:effects key]))
  ([context]
   (:effects context)))


(defn assoc-effect
  [context key value]
  (assoc-in context [:effects key] value))


(defn assoc-coeffect
  [context key value]
  (assoc-in context [:coeffects key] value))


;; -- Execute Interceptor Chain  ------------------------------------------------------------------


(defn- invoke-fn
  [context interceptor direction]
  (if-let [f (get interceptor direction)]
    (f context)
    context))

;; XXX on figwheel reload, should invalidate all re-frame subscriptions

(defn clean-context
  [context]
  (if (map? context)
    (dissoc context :stack :queue)
    context))

(defn- invoke-interceptors
  "Loop over all interceptors, calling `direction` function on each,
  threading the value of `context` through every call.

  `direction` is one of `:before` or `:after`.

  Each iteration, the next interceptor to process is obtained from
  context's `:queue`. After they are processed, interceptors are popped
  from `:queue` and added to into `:stack`.

  After sufficient iteration, `:queue` will be empty, and `:stack` will
  contain all interceptors processed.

  Returns updated context."
  ([context direction]
   (loop [context context]
     (let [queue (:queue context)      ;; future interceptors
           stack (:stack context)]     ;; already completed interceptors
       (if (empty? queue)
         context
         (let [interceptor (peek queue)]
           (recur (-> context
                      (assoc :queue (pop queue))
                      (assoc :stack (conj stack interceptor))
                      (invoke-fn interceptor direction)))))))))


(defn enqueue
  "Adds a collection of interceptors to the end of context's execution queue.
  Returns updated context.

  In advanced cases, where an interceptor itself wanted to add to the queue,
  it would call this function (on the context provided to it)"
  [context interceptors]
  (update context :queue
          (fnil into empty-queue)
          interceptors))


(defn- context
  "Return a fresh context"
  ([event interceptors]
  (-> {}
      (assoc-coeffect :event event)
      (enqueue interceptors)))

  ([event interceptors db]
   (-> (context event interceptors)
       (assoc-coeffect :db db))))


(defn- change-direction
  "Called on completion of `:before` processing, this function prepares/modifies
   `context` for the backwards sweep of processing in which `:after` fns are
   called.

  At this point in processing, the `:queue` is empty and `:stack` holds all
  interceptors. To enable a backwards walk, the job is to prime the `:queue`
  with the reverse of what's in `:stack`"
  [context]
  (-> context
      (dissoc :queue)
      (enqueue (-> context :stack ))))


(defn execute
  "Executes a queue of interceptors for a given event.

   An interceptor has this form:
       {:before  (fn [context] ...)     ;; identity would be a noop
        :after   (fn [context] ...)}

   Walk the queue of iterceptors from beginning to end calling the `:before` fn on
   each, then reverse direction, and walk backwards, calling the `:after` fn on each.

   The last interceptor in the chain presumably wraps an event handler fn.

   Thread a `context` through all calls. `context` has this form:

     {:coeffects {:event event
                  :db    <original contents of app-db>}
      :effects   {:db    <new value for app-db>}
      :queue     <a collection of further interceptors>
      :stack     <a collection of interceptors already walked>}

   `context` has `:coeffects` and `:effects` which, if this was a web server, would
   be somewhat anologous to `request` and `response`.

   `coeffects` contains information like `event` and the initial state of `db` - ie. the
   inputs required by the event handler (sitting presumably on the end of the chain),
   while handler-required side effects are assoc-ed in `:effects` including, but not limited
   to, new values for `db`.

   The first interceptor in a chain will likely have a  :before function
   which adds the current state of app-db into `:coeffects`. OR, it might instead
   add the connection for a DataScript database, or any other inputs required.
   And subsequent interceptors may further add to coeffects via their :before too.

   Equally, this same first interceptor will likely have an `:after` fn which can process
   all the side effects accumulated into `:effects` including but, not limited to,
   updates to app-db.

   Through both stages (before and after), `context` contains a `:queue` of interceptors yet to be
   processed, and a `:stack` of interceptors already done.  In advanced cases,
   these values can be modified by the functions through which the context is threaded."
  [event-v interceptors]
  (-> (context event-v interceptors)
      (invoke-interceptors :before)
      change-direction
      (invoke-interceptors :after)))


;; -- Standard Interceptors -----------------------------------------------------------------------
;; these could be in their own library

(def base
  "An interceptor which injects/extracts the value of app-db intto/from a context.
Used for XXXX "
  (->interceptor
    :name   :base
    :before (fn base-before
              [context]
              (assoc-coeffect context :db @app-db))   ;; a coeffect for the handler
    :after  (fn base-after
              [context]
              (->> (:effects context)
                   (map (fn [[key val]]
                          (if-let [effect-fn  (registrar/get-handler :fx key)]    ;; XXX shouldn't be using raw :fx
                            (effect-fn val))))
                   doall))))


;; XXX how to stub this out for testing purposes??

#_(def now
  "An example interceptor (of dubious utility) which is an example of adding
  to a handler's coeffects.  This interceptor adds the current datetime to coeffects under
  the `:now` key.

  Why?  We want out handlers to be as pure as possible.  If a handler calls `js/Date.`  then
  it stops being as pure.  What if it needs a random number?  These kinds of needed
  \"inputs\" are referred to `coeffects` (sometimes called side-causes).

  usage:
     (reg-event-fx            ;; notice use of `-fx` registration
        :some-id
        [i1 i2 now]           ;; notice use of `now` as one of the handler's interceptors
        (fn [world event]     ;; world is the handler's coeffect
           (let [dt (:now world)]    ;; `:now` is available becaue `now` put it there.
              ...)))

  As an exercise, consider how you would write a `random` interceptor which adds a random
  number into a handler's coeffect?
  "
  (->interceptor
    :name   :now
    :before (fn now-before
              [context]
              (assoc-coeffect context :now (js/Date.)))))


(def debug
  "An interceptor which logs data about the handling of an event.

  Includes a `clojure.data/diff` of the db, before vs after, showing the changes
  caused by the event handler.

  You'd typically want this interceptor after (to the right of) any path interceptor.

  Warning:  calling clojure.data/diff on large, complex data structures can be slow.
  So, you won't want this interceptor present in production code. See the todomvc
  example to see how to exclude interceptors from production code."
  (->interceptor
    :name :debug

    :before (fn [context]
              #_(console :log "Handling re-frame event: " (-> context :coeffects :event))
              context)

    :after  (fn [context]
              (let [event          (get-coeffect context :event)
                    orig-db        (get-coeffect context :db)
                    new-db         (get-effect   context :db)]
                (if-not new-db
                  (do
                    (console :log "no app-db changes caused by: " event)
                    context)
                  (let [[only-before only-after] (data/diff orig-db new-db)         ;; diff between effe
                        db-changed?    (or (some? only-before) (some? only-after))]
                    (if db-changed?
                      (do (console :group "db clojure.data/diff for: " event)
                          (console :log "only before: " only-before)
                          (console :log "only after : " only-after)
                          (console :groupEnd))
                      (console :log "no app-db changes caused by: " event))
                    context))))))


(def trim-v
  "An interceptor which removes the first element of the event vector, allowing you to write
  more aesthetically pleasing db handlers. No leading underscore on the event-v!
  Your event handlers will look like this:

      (defn my-handler
        [db [x y z]]    ;; <-- instead of [_ x y z]
        ....)"
  (->interceptor
    :name :trim-v

    :before  (fn [context]
               (->>  (get-coeffect context :event)
                     rest
                     vec
                     (assoc-coeffect context :event)))))


;; -- Interceptor Factories - PART 1 ---------------------------------------------------------------
;;
;; These factories wrap handlers.

;; XXX add names to annonomous `fn`
;;
(defn db-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-db`.

  These handlers take two arguments;  `db` and `event`, and they return `db`.

  (fn [db event]
     ....)

  So, the interceptor wraps the given handler:
     1. extracts two coeffects (from context): db and event
     2. calls handler-fn
     3. stores the db result back into context's effects"
  [handler-fn]
  (->interceptor
    :name   :db-handler

    :before (fn handler-wrapper
              [context]
              (let [{:keys [db event]} (:coeffects context)
                    context' (->>  (handler-fn db event)
                                   (assoc-effect context :db))]
                context'))))


(defn fx-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-fx`.

  These handlers take two arguments;  `world` and `event`, and they return `effects`.

  (fn [world event]
     {:db ...
      :dispatch ...})

   Wrap handler in an interceptor so it can be added to (the RHS) of a chain:
     1. extracts necessary coeffects
     2. call handler-fn
     3. stores the result backinto the effects"
  [handler-fn]
  (->interceptor
    :name   :fx-handler

    :before (fn [context]
              (let [{:keys [event] :as coeffects} (:coeffects context)]
                (->> (handler-fn coeffects event)
                     (assoc context :effects))))))



;; -- Interceptors Factories -  PART 2 ------------------------------------------------------------
;;
;; I.e. functions which return interceptors
;;


(defn path
  "An interceptor factory which supplies a sub-path of `:db` to the handler.
  Is somewhat annologous to `update-in`. It grafts the return value from the handler
  back into db.

  Usage:
    (path :some :path)
    (path [:some :path])
    (path [:some :path] :to :here)
    (path [:some :path] [:to] :here)

  Implementation:
    - in :before, store the original db in within `context`
    - ib :after, re-establish original db with modification
    - remember, there's a chance that path may be used twice in the one interceptor chain.

  XXX what if path is used twice XXX  Adjust implementation to allow for it.
  "
  [& args]
  (let [path   (flatten args)
        hidden-conext-path [:re-frame-internal :path-original-db]]   ;; this is where, within context, we hide the original db
    (when (empty? path)
      (console :error "re-frame: \"path\" interceptor given no params."))

    (->interceptor
      :name    :path

      :before  (fn [context]
                 (let [original-db (get-coeffect context :db)]
                   (-> context
                       (assoc-in  hidden-conext-path original-db)
                       (assoc-coeffect :db (get-in original-db path)))))

      :after   (fn [context]
                 (let [original-db (get-in context hidden-conext-path)]
                   (->> (get-effect context :db)
                        (assoc-in original-db path)
                        (assoc-effect context :db)))))))



;; XXX in todomvc what about a coeffect which is the value in LocalStore ??

(defn enrich
  "Interceptor factory which runs a given function \"f\" in the  \"after handler\"
  position.  \"f\" is (db v) -> db

  Unlike the \"after\" inteceptor which is only about side effects, \"enrich\"
  expects f to process and alter the :db coeffect in some useful way, contributing
  to the derived data, flowing vibe.

  Imagine that todomvc needed to do duplicate detection - if any two todos had
  the same text, then highlight their background, and report them in a warning
  down the bottom.

  Almost any action (edit text, add new todo, remove a todo) requires a
  complete reassesment of duplication errors and warnings. Eg: that edit
  update might have introduced a new duplicate or removed one. Same with a
  todo removal.

  And to perform this enrichment, a function has to inspect all the todos,
  possibly set flags on each, and set some overall list of duplicates.
  And this duplication check might just be one check among many.

  \"f\" would need to be both adding and removing the duplicate warnings.
  By applying \"f\" in middleware, we keep the handlers simple and yet we
  ensure this important step is not missed."
  [f]
  (->interceptor
    :name  :enrich

    :after (fn [context]
             (let [event (get-coeffect context :event)
                   db    (get-effect context :db)]
               (->> (f db event)
                    (assoc-effect context :db))))))



(defn after
  "Interceptor factory which runs a given function `f` in the \"after\"
  position presumably for side effects.

  `f` is called with two arguments: the `effects` value of `:db` and the event. It's return
  value is ignored so `f` can only side-effect. Example uses:
     - `f` runs schema validation (reporting any errors found)
     - `f` writes some aspect of db to localstorage."
  [f]
  (->interceptor
    :name  :after

    :after (fn [context]
             (let [db    (get-effect context :db)
                   event (get-coeffect context :event)]
               (f db event)    ;; call f for side effects
               context))))     ;; context is unchanged


(defn  on-changes
  "Interceptor factory which acts a bit like `reaction`  (but it flows into `db`, rather than out)
  It observes N paths in  `db` and if any of them test not indentical? to their previous value
  (as a result of a handler being run) then it runs 'f' to compute a new value, which is
  then assoced into the given `out-path` within `db`.

  Usage:

  (defn my-f
    [a-val b-val]
    ... some computation on a and b in here)

  (on-changes my-f [:c]  [:a] [:b])

  Put this Interceptor on the right handlers (ones which might change :a or :b).
  It will:
     - call 'f' each time the value at path [:a] or [:b] changes
     - call 'f' with the values extracted from [:a] [:b]
     - assoc the return value from 'f' into the path  [:c]
  "
  [f out-path & in-paths]
  (->interceptor
    :name  :enrich

    :after (fn [context]
             (let [new-db   (get-effect context :db)
                   old-db   (get-coeffect context :db)

                   ;; work out if any "inputs" have changed
                   new-ins      (map #(get-in new-db %) in-paths)
                   old-ins      (map #(get-in old-db %) in-paths)
                   changed-ins? (some false? (map identical? new-ins old-ins))]

               ;; if one of the inputs has changed, then run 'f'
               (if changed-ins?
                 (->>  (apply f new-ins)
                       (assoc-in new-db out-path)
                       (assoc-effect context :db))
                 context)))))

