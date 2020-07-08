(ns re-frame.core
  (:require
    [re-frame.events           :as events]
    [re-frame.subs             :as subs]
    [re-frame.interop          :as interop]
    [re-frame.db               :as db]
    [re-frame.fx               :as fx]
    [re-frame.cofx             :as cofx]
    [re-frame.router           :as router]
    [re-frame.settings         :as settings]
    [re-frame.loggers          :as loggers]
    [re-frame.registrar        :as registrar]
    [re-frame.interceptor      :as interceptor]
    [re-frame.std-interceptors :as std-interceptors :refer [db-handler->interceptor
                                                             fx-handler->interceptor
                                                             ctx-handler->interceptor]]
    [re-frame.utils            :as utils]
    [clojure.set               :as set]))


;; -- API ---------------------------------------------------------------------
;;
;; This namespace represents the re-frame API

;; -- dispatch ----------------------------------------------------------------
(defn dispatch
  "Enqueue `event` for processing by event handling machinery.

  `event` is a vector of length >= 1. The 1st element identifies the kind of event.

  Note: the event handler is not run immediately - it is not run
  synchronously. It will likely be run 'very soon', although it may be
  added to the end of a FIFO queue which already contain events.

  Usage:
     (dispatch [:order-pizza {:supreme 2 :meatlovers 1 :veg 1}])"
  [event]
  (router/dispatch event))

(defn dispatch-sync
  "Synchronously (immediately) process `event`. Do not queue.

  Generally, don't use this. Instead use `dispatch`. It is an error
  to use `dispatch-sync` within an event handler.

  Useful when any delay in processing is a problem:
     1. the `:on-change` handler of a text field where we are expecting fast typing.
     2  when initialising your app - see 'main' in todomvc examples
     3. in a unit test where we don't want the action 'later'

  Usage:
     (dispatch-sync [:sing :falsetto 634])"
  [event-v]
  (router/dispatch-sync event-v))


;; -- subscriptions -----------------------------------------------------------
(defn reg-sub
  "For a given `query-id`, register two functions: a `computation` function and an `input signals` function.

  During program execution, a call to `subscribe`, such as `(subscribe [:sub-id 3 \"blue\"])`,
  will create a new `:sub-id` node in the Signal Graph. And, at that time, re-frame
  needs to know how to create the node.   By calling `reg-sub`, you are registering
  'the template' or 'the mechanism' by which nodes in the Signal Graph can be created.

  Repeating: calling `reg-sub` does not create a node. It only creates the template
  from which nodes can be created later.

  `reg-sub` arguments are:
    - a `query-id` (typically a namespaced keyword)
    - a function which returns the inputs required by this kind of node (can be supplied  in one of three ways)
    - a function which computes the value of this kind of node

  The `computation function` is always the last argument supplied and it is expected to have the signature:
    `(input-values, query-vector) -> a-value`

  When `computation function` is called, the `query-vector` argument will be the vector supplied to the
  the `subscribe` which caused the node to be created. So, if the call was `(subscribe [:sub-id 3 \"blue\"])`,
  then the `query-vector` supplied to the computaton function will be `[:sub-id 3 \"blue\"]`.

  The arguments supplied between the `query-id` and the `computation-function` can vary in 3 ways,
  but whatever is there defines the `input signals` part of the template, controlling what input
 values \"flow into\" the `computation function` gets when it is called.

  `reg-sub` can be called in one of three ways, because there are three ways to define the input signals part.
  But note, the 2nd method, in which a `signal-fn` is explicitly supplied, is the most canonical and instructive. The other
  two are really just sugary variations.

  1. No input signals given:
      ```clj
     (reg-sub
       :query-id
       a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```

     In the absence of an explicit `input-fn`, the node's input signal defaults to `app-db`
     and, as a result, the value within `app-db` (a map) is
     is given as the 1st argument when `a-computation-fn` is called.


  2. A signal function is explicitly supplied:
     ```clj
     (reg-sub
       :query-id
       signal-fn     ;; <-- here
       computation-fn)
     ```

     This is the most canonical and instructive of the three variations.

     When a node is created from the template, the `signal-fn` will be called and it
     is expected to return the input signal(s) as either a singleton, if there is only
     one, or a sequence if there are many, or a map with the signals as the values.

     The values from returned nominated signals will be supplied as the 1st argument to
     the `a-computation-fn` when it is called - and subject to what this `signal-fn` returns,
     this value will be either a singleton, sequence or map of them (paralleling
     the structure returned by the `signal-fn`).

     This example `signal-fn` returns a vector of input signals.
       ```clj
       (fn [query-vec dynamic-vec]
         [(subscribe [:a-sub])
          (subscribe [:b-sub])])
       ```
     The associated computation function must be written
     to expect a vector of values for its first argument:
       ```clj
       (fn [[a b] query-vec]     ;; 1st argument is a seq of two values
         ....)
        ```

     If, on the other hand, the signal function was simpler and returned a singleton, like this:
        ```clj
        (fn [query-vec dynamic-vec]
          (subscribe [:a-sub]))
        ```
     then the associated computation function must be written to expect a single value
     as the 1st argument:
        ```clj
        (fn [a query-vec]       ;; 1st argument is a single value
          ...)
        ```

     Further Note: variation #1 above, in which an `input-fn` was not supplied, like this:
       ```clj
     (reg-sub
       :query-id
       a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```
     is the equivalent of using this
     2nd variation and explicitly suppling a `signal-fn` which returns `app-db`:
     ```clj
     (reg-sub
       :query-id
       (fn [_ _]  re-frame/app-db)   ;; <--- explicit input-fn
       a-computation-fn)             ;; has signature:  (fn [db query-vec]  ... ret-value)
     ```

  3. Syntax Sugar

     ```clj
     (reg-sub
       :a-b-sub
       :<- [:a-sub]
       :<- [:b-sub]
       (fn [[a b] query-vec]    ;; 1st argument is a seq of two values
         {:a a :b b}))
     ```

     This 3rd variation is just syntactic sugar for the 2nd.  Instead of providing an
     `signals-fn` you provide one or more pairs of `:<-` and a subscription vector.

     If you supply only one pair a singleton will be supplied to the computation function,
     as if you had supplied a `signal-fn` returning only a single value:

     ```clj
     (reg-sub
       :a-sub
       :<- [:a-sub]
       (fn [a query-vec]      ;; only one pair, so 1st argument is a single value
         ...))
     ```

  For further understanding, read `/docs`, and look at the detailed comments in
  /examples/todomvc/src/subs.cljs
  "
  [query-id & args]
  (apply subs/reg-sub (into [query-id] args)))

(defn subscribe
  "Given a `query` vector, returns a Reagent `reaction` which, over
  time, reactively delivers a stream of values. So in FRP-ish terms,
  it returns a `Signal`.

  To obtain the returned Signal/Stream's current value, it must be `deref`ed.

  `query` is a vector of at least one element. The first element is the
  `query-id`, typically a namespaced keyword. The rest of the vector's
  elements are optional, additional values which parameterise the query
  performed.

  `dynv` is an optional 3rd argument, which is a vector of further input
  signals (atoms, reactions, etc), NOT values. This argument exists for
  historical reasons and is borderline deprecated these days.

  Example Usage:
  --------------

    (subscribe [:items])
    (subscribe [:items \"blue\" :small])
    (subscribe [:items {:colour \"blue\"  :size :small}])

  Note: for any given call to `subscribe` there must have been a previous call
  to `reg-sub`, registering the query handler (function) for the `query-id` given.

  Hint
  ----

  When used in a view function BE SURE to `deref` the returned value.
  In fact, to avoid any mistakes, some prefer to define:

     (def <sub  (comp deref re-frame.core/subscribe))

  And then, within their views, they call  `(<sub [:items :small])` rather
  than using `subscribe` directly.

  De-duplication
  --------------

  Two, or more, concurrent subscriptions for the same query will source reactive
  updates from the one executing handler.
  "
  ([query]
   (subs/subscribe query))
  ([query dynv]
   (subs/subscribe query dynv)))

(defn clear-sub ;; think unreg-sub
  "When called with no args, unregisters all subscription handlers. When given
   one arg, assumed to be a `query-id` of a registered subscription handler,
   unregisters the associated handler.

   NOTE: Depending on the usecase it may also be necessary to call 
         `clear-subscription-cache!`."
  ([]
   (registrar/clear-handlers subs/kind))
  ([query-id]
   (registrar/clear-handlers subs/kind query-id)))

(defn clear-subscription-cache!
  "Causes all subscriptions to be removed from the cache.
  Does this by:
     1. running `on-dispose` on all cached subscriptions
     2. Each `on-dispose` will perform the removal of themselves.

  This is for development time use. Useful when reloading Figwheel code
  after a React exception, because React components won't have been
  cleaned up properly. And this, in turn, means the subscriptions within those
  components won't have been cleaned up correctly. So this forces the issue."
  []
  (subs/clear-subscription-cache!))

(defn reg-sub-raw
  "This is a low level, advanced function.  You should probably be
  using reg-sub instead.
  Docs in https://github.com/day8/re-frame/blob/master/docs/flow-mechanics.md"
  [query-id handler-fn]
  (registrar/register-handler subs/kind query-id handler-fn))


;; -- effects -----------------------------------------------------------------
(defn reg-fx
  "Register the given effect `handler` for the given `id`.

  `id` is keyword, often namespaced.
  `handler` is a side-effecting function which takes a single argument and whose return
  value is ignored.

  Example Use
  -----------

  First, registration ... associate `:effect2` with a handler.

  (reg-fx
     :effect2
     (fn [value]
        ... do something side-effect-y))

  Then, later, if an event handler were to return this effects map ...

  {...
   :effect2  [1 2]}

   ... then the `handler` `fn` we registered previously, using `reg-fx`, will be
   called with an argument of `[1 2]`."
  [id handler]
  (fx/reg-fx id handler))

(defn clear-fx ;; think unreg-fx
  "When called with no args, unregisters all effect handlers. When given one arg,
   assumed to be the `id` of a registered effect handler, unregisters the 
   associated handler."
  ([]
   (registrar/clear-handlers fx/kind))
  ([id]
   (registrar/clear-handlers fx/kind id)))

;; -- coeffects ---------------------------------------------------------------
(defn reg-cofx
  "Register the given coeffect `handler` for the given `id`, for later use
  within `inject-cofx`.

  `id` is keyword, often namespaced.
  `handler` is a function which takes either one or two arguements, the first of which is
  always `coeffects` and which returns an updated `coeffects`.

  See the docs for `inject-cofx` for example use."
  [id handler]
  (cofx/reg-cofx id handler))

(defn inject-cofx
  "Given an `id`, and an optional, arbitrary `value`, returns an interceptor
   whose `:before` adds to the `:coeffects` (map) by calling a pre-registered
   'coeffect handler' identified by the `id`.

   The previous association of a `coeffect handler` with an `id` will have
   happened via a call to `re-frame.core/reg-cofx` - generally on program startup.

   Within the created interceptor, this 'looked up' `coeffect handler` will
   be called (within the `:before`) with two arguments:
     - the current value of `:coeffects`
     - optionally, the originally supplied arbitrary `value`

   This `coeffect handler` is expected to modify and return its first, `coeffects` argument.

   Example Of how `inject-cofx` and `reg-cofx` work together
   ---------------------------------------------------------

   1. Early in app startup, you register a `coeffect handler` for `:datetime`:

      (re-frame.core/reg-cofx
        :datetime                        ;; usage  (inject-cofx :datetime)
        (fn coeffect-handler
          [coeffect]
          (assoc coeffect :now (js/Date.))))   ;; modify and return first arg

   2. Later, add an interceptor to an -fx event handler, using `inject-cofx`:

      (re-frame.core/reg-event-fx        ;; we are registering an event handler
         :event-id
         [ ... (inject-cofx :datetime) ... ]    ;; <-- create an injecting interceptor
         (fn event-handler
           [coeffect event]
           ... in here can access (:now coeffect) to obtain current datetime ... )))

   Background
   ----------

   `coeffects` are the input resources required by an event handler
   to perform its job. The two most obvious ones are `db` and `event`.
   But sometimes an event handler might need other resources.

   Perhaps an event handler needs a random number or a GUID or the current
   datetime. Perhaps it needs access to a DataScript database connection.

   If an event handler directly accesses these resources, it stops being
   pure and, consequently, it becomes harder to test, etc. So we don't
   want that.

   Instead, the interceptor created by this function is a way to 'inject'
   'necessary resources' into the `:coeffects` (map) subsequently given
   to the event handler at call time."
  ([id]
   (cofx/inject-cofx id))
  ([id value]
   (cofx/inject-cofx id value)))

(defn clear-cofx ;; think unreg-cofx
  "When called with no args, unregisters all coeffect handlers. When given one arg,
   assumed to be the `id` of a registered coeffect handler, unregisters the 
   associated handler." 
  ([]
   (registrar/clear-handlers cofx/kind))
  ([id]
   (registrar/clear-handlers cofx/kind id)))

;; -- Events ------------------------------------------------------------------

(defn reg-event-db
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain.
  `id` is typically a namespaced keyword  (but can be anything)
  `handler` is a function: (db event) -> db
  `interceptors` is a collection of interceptors. Will be flattened and nils removed.
  `handler` is wrapped in its own interceptor and added to the end of the interceptor
   chain, so that, in the end, only a chain is registered.
   Special effects and coeffects interceptors are added to the front of this
   chain."
  ([id handler]
   (reg-event-db id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (db-handler->interceptor handler)])))


(defn reg-event-fx
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain.
  `id` is typically a namespaced keyword  (but can be anything)
  `handler` is a function: (coeffects-map event-vector) -> effects-map
  `interceptors` is a collection of interceptors. Will be flattened and nils removed.
  `handler` is wrapped in its own interceptor and added to the end of the interceptor
   chain, so that, in the end, only a chain is registered.
   Special effects and coeffects interceptors are added to the front of the
   interceptor chain.  These interceptors inject the value of app-db into coeffects,
   and, later, action effects."
  ([id handler]
   (reg-event-fx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (fx-handler->interceptor handler)])))


(defn reg-event-ctx
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain.
  `id` is typically a namespaced keyword  (but can be anything)
  `handler` is a function: (context-map event-vector) -> context-map

  This form of registration is almost never used. "
  ([id handler]
   (reg-event-ctx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (ctx-handler->interceptor handler)])))

(defn clear-event ;; think unreg-event-*
  "When called with no args, unregisters all event handlers. When given one arg,
   assumed to be the `id` of a registered event handler, unregisters the 
   associated handler."  
  ([]
   (registrar/clear-handlers events/kind))
  ([id]
   (registrar/clear-handlers events/kind id)))

;; -- interceptors ------------------------------------------------------------

;; Standard interceptors.
;; Detailed docs on each in std-interceptors.cljs
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
  std-interceptors/debug)

(def path
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
  std-interceptors/path)

(def enrich
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
  std-interceptors/enrich)

(def trim-v
  "An interceptor which removes the first element of the event vector,
  allowing you to write more aesthetically pleasing event handlers. No
  leading underscore on the event-v!
  Your event handlers will look like this:

      (defn my-handler
        [db [x y z]]    ;; <-- instead of [_ x y z]
        ....)"
  std-interceptors/trim-v)

(def after
  "returns an interceptor which runs a given function `f` in the `:after`
  position, presumably for side effects.

  `f` is called with two arguments: the `:effects` value for `:db`
  (or the `coeffect` value of db if no db effect is returned) and the event.
  Its return value is ignored, so `f` can only side-effect.

  Examples use can be seen in the /examples/todomvc:
     - `f` runs schema validation (reporting any errors found).
     - `f` writes to localstorage."
  std-interceptors/after)

(def on-changes
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
  std-interceptors/on-changes)


(defn reg-global-interceptor
  "Registers `interceptor` as a global interceptor. Global interceptors are
   included in the processing of every event.

   When you register an event handler you have the option of supplying an
   interceptor chain. Any global interceptors you register are effectively
   prepending to this chain in the order that they are registered."
  [interceptor]
  (settings/reg-global-interceptor interceptor))

(defn clear-global-interceptor ;; think unreg-global-interceptor
  "When called with no args, unregisters all global interceptors. When given
   one arg, assumed to be the `id` of a currently registered global
   interceptor, it unregisters the associated interceptor."
  ([]
   (settings/clear-global-interceptors))
  ([id]
   (settings/clear-global-interceptors id)))

;; Utility functions for creating your own interceptors
;;
;;  (def my-interceptor
;;     (->interceptor                ;; used to create an interceptor
;;       :id     :my-interceptor     ;; an id - decorative only
;;       :before (fn [context]                         ;; you normally want to change :coeffects
;;                  ... use get-coeffect  and assoc-coeffect
;;                       )
;;       :after  (fn [context]                         ;; you normally want to change :effects
;;                 (let [db (get-effect context :db)]  ;; (get-in context [:effects :db])
;;                   (assoc-effect context :http-ajax {...}])))))
;;
(defn ->interceptor
  "Create an interceptor from named arguments"
  [& {:as m :keys [id before after]}]
  (utils/apply-kw interceptor/->interceptor m))

(defn get-coeffect
  "When called with one arg, returns the coeffects map from the `context`.
   When called with two or three args, behaves like `clojure.core/get`, 
   returns the value mapped to `key` in the coeffects map, `not-found` or
   `nil` if `key` is not present."
  ([context]
   (interceptor/get-coeffect context))
  ([context key]
   (interceptor/get-coeffect context key))
  ([context key not-found]
   (interceptor/get-coeffect context key not-found)))

(defn assoc-coeffect
  "Returns a new `context` with a new coeffects map that contains `key`
   mapped to the `value`."
  [context key value]
  (interceptor/assoc-coeffect context key value))

(defn get-effect
  "When called with one arg, returns the effects map from the `context`.
   When called with two or three args, behaves like `clojure.core/get`, 
   returns the value mapped to `key` in the effects map, `not-found` or
   `nil` if `key` is not present."
  ([context]
   (interceptor/get-effect context))
  ([context key]
   (interceptor/get-effect context key))
  ([context key not-found]
   (interceptor/get-effect context key not-found)))

(defn assoc-effect
  "Returns a new `context` with a new effects map that contains `key`
   mapped to the `value`."
  [context key value]
  (interceptor/assoc-effect context key value))

(defn enqueue
  "Add a collection of `interceptors` to the end of `context's` execution `:queue`.
  Returns the updated `context`.

  In an advanced case, this function could allow an interceptor to add new
  interceptors to the `:queue` of a context."
  [context interceptors]
  (interceptor/enqueue context interceptors))


;; --  logging ----------------------------------------------------------------
;; Internally, re-frame uses the logging functions: warn, log, error, group and groupEnd
;; By default, these functions map directly to the js/console implementations,
;; but you can override with your own fns (set or subset).
;; Example Usage:
;;   (defn my-fn [& args]  (post-it-somewhere (apply str args)))  ;; here is my alternative
;;   (re-frame.core/set-loggers!  {:warn my-fn :log my-fn})       ;; override the defaults with mine
(defn set-loggers!
  "Change the set (or a subset) of logging functions used by re-frame.
  `new-loggers` should be a map with the same keys as `loggers` (above)"
  [new-loggers]
  (loggers/set-loggers! new-loggers))

(defn console
  "Logs `args` to the console at `level`. 
   Level can be one of `:log` `:error` `:warn` `:debug` `:group` `:groupEnd`.
   If you are writing an extension to re-frame, like prehaps an effect handler,
   you may want to use re-frame logging so that users can configure logging 
   from a central location.

   usage: (console :error \"Oh, dear God, it happened:\" a-var \"and\" another)
          (console :warn \"Possible breach of containment wall at:\" dt)"
  [level & args]
  (apply loggers/console (into [level] args)))

;; -- unit testing ------------------------------------------------------------

(defn make-restore-fn
  "Checkpoints the state of re-frame and returns a function which, when
  later called, will restore re-frame to that checkpointed state.

  Checkpoint includes app-db, all registered handlers and all subscriptions.
  "
  []
  (let [handlers @registrar/kind->id->handler
        app-db   @db/app-db
        subs-cache @subs/query->reaction]
    (fn []
      ;; call `dispose!` on all current subscriptions which
      ;; didn't originally exist.
      (let [original-subs (set (vals subs-cache))
            current-subs  (set (vals @subs/query->reaction))]
        (doseq [sub (set/difference current-subs original-subs)]
          (interop/dispose! sub)))

      ;; Reset the atoms
      ;; We don't need to reset subs/query->reaction, as
      ;; disposing of the subs removes them from the cache anyway
      (reset! registrar/kind->id->handler handlers)
      (reset! db/app-db app-db)
      nil)))

(defn purge-event-queue
  "Remove all events queued for processing"
  []
  (router/purge re-frame.router/event-queue))

;; -- Event Processing Callbacks  ---------------------------------------------

(defn add-post-event-callback
  "Registers a function `f` to be called after each event is processed
   `f` will be called with two arguments:
    - `event`: a vector. The event just processed.
    - `queue`: a PersistentQueue, possibly empty, of events yet to be processed.

   This is useful in advanced cases like:
     - you are implementing a complex bootstrap pipeline
     - you want to create your own handling infrastructure, with perhaps multiple
       handlers for the one event, etc.  Hook in here.
     - libraries providing 'isomorphic javascript' rendering on  Nodejs or Nashorn.

  'id' is typically a keyword. Supplied at \"add time\" so it can subsequently
  be used at \"remove time\" to get rid of the right callback.
  "
  ([f]
   (add-post-event-callback f f))   ;; use f as its own identifier
  ([id f]
   (router/add-post-event-callback re-frame.router/event-queue id f)))


(defn remove-post-event-callback
  "Unregisters the function identified by `id` to be called after each event is
   processed."
  [id]
  (router/remove-post-event-callback re-frame.router/event-queue id))


;; --  Deprecation ------------------------------------------------------------
;; Assisting the v0.7.x ->  v0.8.x transition.
(defn register-handler
  "Deprecated. Use `reg-event-db` instead."
  {:deprecated "0.8.0"}
  [& args]
  (console :warn  "re-frame:  \"register-handler\" has been renamed \"reg-event-db\" (look for registration of" (str (first args)) ")")
  (apply reg-event-db args))

(defn register-sub
  "Deprecated. Use `reg-sub-raw` instead."
  {:deprecated "0.8.0"}
  [& args]
  (console :warn  "re-frame:  \"register-sub\" is deprecated. Use \"reg-sub-raw\" (look for registration of" (str (first args)) ")")
  (apply reg-sub-raw args))
