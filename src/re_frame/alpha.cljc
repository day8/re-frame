(ns re-frame.alpha
  (:require
   [re-frame.events           :as events]
   [re-frame.subs             :as subs]
   [re-frame.subs.alpha       :as subs.alpha]
   [re-frame.interop          :as interop]
   [re-frame.db               :as db]
   [re-frame.fx               :as fx]
   [re-frame.cofx             :as cofx]
   [re-frame.router           :as router]
   [re-frame.settings         :as settings]
   [re-frame.loggers          :as loggers]
   [re-frame.registrar        :as registrar]
   [re-frame.register.alpha   :as register.alpha]
   [re-frame.interceptor      :as interceptor]
   [re-frame.std-interceptors :as std-interceptors :refer [db-handler->interceptor
                                                           fx-handler->interceptor
                                                           ctx-handler->interceptor]]
   [re-frame.utils            :as utils]
   [clojure.set               :as set]))

(defn reg
  "Register a handler. Possible vals:

  `:sub`: subscription handler, function of [signals query-map].

  `:legacy-sub`: subscription handler, function of [signals query-vector].

  `:sub-lifecycle`: UNDOCUMENTED. See https://github.com/day8/re-frame/issues/680."
  [kind & args]
  (apply register.alpha/reg kind args))

;; -- dispatch ----------------------------------------------------------------

(defn dispatch
  "Queue `event` for processing (handling).

  `event` is a vector and the first element is typically a keyword
  which identifies the kind of event.

  The event will be added to a FIFO processing queue, so event
  handling does not happen immediately. It will happen 'very soon'
  but not now. And if the queue already contains events, they
  will be processed first.

  Usage:

      #!clj
      (dispatch [:order \"pizza\" {:supreme 2 :meatlovers 1 :veg 1}])
  "
  [event]
  (router/dispatch event))

(defn dispatch-sync
  "Synchronously (immediately) process `event`. It does **not** queue
  the event for handling later as `dispatch` does.

  `event` is a vector and the first element is typically a keyword
  which identifies the kind of event.

  It is an error to use `dispatch-sync` within an event handler because
  you can't immediately process an new event when one is already
  part way through being processed.

  Generally, avoid using this function, and instead, use `dispatch`.
  Only use it in the narrow set of cases where any delay in
  processing is a problem:

    1. the `:on-change` handler of a text field where we are expecting fast typing
    2. when initialising your app - see 'main' in examples/todomvc/src/core.cljs
    3. in a unit test where immediate, synchronous processing is useful

  Usage:

      #!clj
      (dispatch-sync [:sing :falsetto \"piano accordion\"])
  "
  [event]
  (router/dispatch-sync event))

;; -- Events ------------------------------------------------------------------

(defn reg-event-db
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain:

    - `id` is typically a namespaced keyword  (but can be anything)
    - `handler` is a function: (db event) -> db
    - `interceptors` is a collection of interceptors. Will be flattened and nils removed.

  Example Usage:

      #!clj
      (reg-event-db
        :token
        (fn [db event]
          (assoc db :some-key (get event 2)))  ;; return updated db

  Or perhaps:

      #!clj
      (reg-event-db
        :namespaced/id           ;; <-- namespaced keywords are often used
        [one two three]          ;; <-- a seq of interceptors
        (fn [db [_ arg1 arg2]]   ;; <-- event vector is destructured
          (-> db
            (dissoc arg1)
            (update :key + arg2))))   ;; return updated db
  "
  ([id handler]
   (reg-event-db id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (db-handler->interceptor handler)])))

(defn reg-event-fx
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain:

    - `id` is typically a namespaced keyword  (but can be anything)
    - `handler` is a function: (coeffects-map event-vector) -> effects-map
    - `interceptors` is a collection of interceptors. Will be flattened and nils removed.


  Example Usage:

      #!clj
      (reg-event-fx
        :event-id
        (fn [cofx event]
          {:db (assoc (:db cofx) :some-key (get event 2))}))   ;; return a map of effects


  Or perhaps:

      #!clj
      (reg-event-fx
        :namespaced/id           ;; <-- namespaced keywords are often used
        [one two three]          ;; <-- a seq of interceptors
        (fn [{:keys [db] :as cofx} [_ arg1 arg2]] ;; destructure both arguments
          {:db (assoc db :some-key arg1)          ;; return a map of effects
           :fx [[:dispatch [:some-event arg2]]]}))
  "
  ([id handler]
   (reg-event-fx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (fx-handler->interceptor handler)])))

(defn reg-event-ctx
  "Register the given event `handler` (function) for the given `id`. Optionally, provide
  an `interceptors` chain:

    - `id` is typically a namespaced keyword  (but can be anything)
    - `handler` is a function: context-map -> context-map

  You can explore what is provided in `context` [here](https://day8.github.io/re-frame/Interceptors/#what-is-context).

  Example Usage:

      #!clj
      (reg-event-ctx
        :event-id
        (fn [{:keys [coeffects] :as context}]
          (let [initial  {:db     (:db coeffects)
                          :event  (:event coeffects)
                          :fx     []}
                result   (-> initial
                             function1
                             function2
                             function3)
                effects  (select-keys result [:db :fx])]
             (assoc context :effects effects))))
  "
  ([id handler]
   (reg-event-ctx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db fx/do-fx std-interceptors/inject-global-interceptors interceptors (ctx-handler->interceptor handler)])))

(defn clear-event
  "Unregisters event handlers (presumably registered previously via the use of `reg-event-db` or `reg-event-fx`).

  When called with no args, it will unregister all currently registered event handlers.

  When given one arg, assumed to be the `id` of a previously registered
  event handler, it will unregister the associated handler. Will produce a warning to
  console if it finds no matching registration."
  ([]
   (registrar/clear-handlers events/kind))
  ([id]
   (registrar/clear-handlers events/kind id)))

;; -- subscriptions -----------------------------------------------------------

(defn sub
  "Given a `query` map, returns a Reagent `reaction` which will, over
  time, reactively deliver a stream of values. So, in FRP-ish terms,
  it returns a `Signal`.

  To obtain the current value from the Signal, it must be dereferenced:

      #!clj
      (let [signal (sub {:re-frame/q ::items})
            value  (deref signal)]     ;; could be written as @signal
        ...)

   which is typically written tersely as simple:

      #!clj
      (let [items  @(sub {:re-frame/q ::items})]
        ...)


  `query` is a map containing:
    `:re-frame/q`:         Required. Names the query. Typically a namespaced keyword.
    `:re-frame/lifecycle`: Optional. See docs for `reg-sub-lifecycle`.

  The entire `query` is passed to the subscription handler. This means you can use
  additional keys to parameterise the query it performs.

  **Example Usage**:

      #!clj
      (require '[re-frame :as-alias rf])
      (sub {::rf/q ::items
                  ::rf/lifecycle ::rf/reactive
                  :color \"blue\"
                  :size :small})

  Note: for any given call to `sub there must have been a previous call
  to `reg`, registering the query handler (functions) associated with
  `query-id`.

  **De-duplication**

  Two, or more, concurrent subscriptions for the same query will
  source reactive updates from the one executing handler.

  See also: `reg-sub`

  **Legacy Support**

  Earlier versions of re-frame used vectors for queries. When passed a vector,
  `sub` passes an equivalent map to your handler. For example:

  `[::items 1 2 3]`
  converts to:
  `{::rf/q ::items ::rf/query-v [::items 1 2 3]}`

  To subscribe with a particular lifecycle, use metadata:

  `^{::rf/lifecycle ::rf/sub-reactive} [::items 1 2 3]`
  converts to:
  ```
  {::rf/q ::items
   ::rf/lifecycle ::rf/sub-reactive
   ::rf/query-v [::items 1 2 3]}
  ```

  `dyn-v` is no longer supported.
  "
  ([q]
   (subs.alpha/sub q))
  ([id q]
   (subs.alpha/sub id q)))

(defn clear-sub ;; think unreg-sub
  "Unregisters subscription handlers (presumably registered previously via the use of `reg-sub`).

  When called with no args, it will unregister all currently registered subscription handlers.

  When given one arg, assumed to be the `id` of a previously registered
  subscription handler, it will unregister the associated handler. Will produce a warning to
  console if it finds no matching registration.

  NOTE: Depending on the usecase, it may be necessary to call `clear-subscription-cache!` afterwards"
  ([]
   (registrar/clear-handlers subs/kind))
  ([query-id]
   (registrar/clear-handlers subs/kind query-id)))

(defn reg-sub-raw
  "This is a low level, advanced function.  You should probably be
  using `reg-sub` instead.

  Some explanation is available in the docs at
  <a href=\"http://day8.github.io/re-frame/flow-mechanics/\" target=\"_blank\">http://day8.github.io/re-frame/flow-mechanics/</a>"
  [query-id handler-fn]
  (registrar/register-handler subs/kind query-id handler-fn))

;; XXX
(defn clear-subscription-cache!
  "Removes all subscriptions from the cache.

  This function can be used at development time or test time. Useful when hot reloading
  namespaces containing subscription handlers. Also call it after a React/render exception,
  because React components won't have been cleaned up properly. And this, in turn, means
  the subscriptions within those components won't have been cleaned up correctly. So this
  forces the issue.
  "
  []
  (subs/clear-subscription-cache!))

;; -- effects -----------------------------------------------------------------

(defn reg-fx
  "Register the given effect `handler` for the given `id`:

    - `id` is keyword, often namespaced.
    - `handler` is a side-effecting function which takes a single argument and whose return
      value is ignored.

  To use, first, associate `:effect2` with a handler:

      #!clj
      (reg-fx
         :effect2
         (fn [value]
            ... do something side-effect-y))

  Then, later, if an event handler were to return this effects map:

      #!clj
      {:effect2  [1 2]}

  then the `handler` `fn` we registered previously, using `reg-fx`, will be
  called with an argument of `[1 2]`.
  "
  [id handler]
  (fx/reg-fx id handler))

(defn clear-fx ;; think unreg-fx
  "Unregisters effect handlers (presumably registered previously via the use of `reg-fx`).

  When called with no args, it will unregister all currently registered effect handlers.

  When given one arg, assumed to be the `id` of a previously registered
  effect handler, it will unregister the associated handler. Will produce a warning to
  console if it finds no matching registration.
  "
  ([]
   (registrar/clear-handlers fx/kind))
  ([id]
   (registrar/clear-handlers fx/kind id)))

;; -- coeffects ---------------------------------------------------------------

(defn reg-cofx
  "Register the given coeffect `handler` for the given `id`, for later use
  within `inject-cofx`:

    - `id` is keyword, often namespaced.
    - `handler` is a function which takes either one or two arguments, the first of which is
       always `coeffects` and which returns an updated `coeffects`.

  See also: `inject-cofx`
  "
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

  **Example of `inject-cofx` and `reg-cofx` working together**


  First - Early in app startup, you register a `coeffect handler` for `:datetime`:

      #!clj
      (re-frame.core/reg-cofx
        :datetime                        ;; usage  (inject-cofx :datetime)
        (fn coeffect-handler
          [coeffect]
          (assoc coeffect :now (js/Date.))))   ;; modify and return first arg

  Second - Later, add an interceptor to an -fx event handler, using `inject-cofx`:

      #!clj
      (re-frame.core/reg-event-fx            ;; when registering an event handler
        :event-id
        [ ... (inject-cofx :datetime) ... ]  ;; <-- create an injecting interceptor
        (fn event-handler
          [coeffect event]
            ;;... in here can access (:now coeffect) to obtain current datetime ...
          )))

  **Background**

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
  to the event handler at call time.

  See also `reg-cofx`
  "
  ([id]
   (cofx/inject-cofx id))
  ([id value]
   (cofx/inject-cofx id value)))

(defn clear-cofx ;; think unreg-cofx
  "Unregisters coeffect handlers (presumably registered previously via the use of `reg-cofx`).

  When called with no args, it will unregister all currently registered coeffect handlers.

  When given one arg, assumed to be the `id` of a previously registered
  coeffect handler, it will unregister the associated handler. Will produce a warning to
  console if it finds no matching registration."
  ([]
   (registrar/clear-handlers cofx/kind))
  ([id]
   (registrar/clear-handlers cofx/kind id)))

;; -- interceptors ------------------------------------------------------------

(def debug
  "An interceptor which logs/instruments an event handler's actions to
  `re-frame/console` at the `:log` level.

  Output includes:

    1. the event vector
    2. a `clojure.data/diff` of db, before vs after, which shows
       the changes caused by the event handler. To understand the output,
       you should understand:
       <a href=\"https://clojuredocs.org/clojure.data/diff\" target=\"_blank\">https://clojuredocs.org/clojure.data/diff</a>.

  You'd typically include this interceptor after (to the right of) any
  `path` interceptor.

  Warning:  calling `clojure.data/diff` on large, complex data structures
  can be slow. So, you won't want this interceptor present in production
  code. So, you should condition it out like this:

      #!clj
      (re-frame.core/reg-event-db
        :evt-id
        [(when ^boolean goog.DEBUG re-frame.core/debug)]  ;; <-- conditional
        (fn [db v]
           ...))

  To make this code fragment work, you'll also have to set `goog.DEBUG` to
  `false` in your production builds. For an example, look in `project.clj` of /examples/todomvc.
  "
  std-interceptors/debug)

(defn path
  "Returns an interceptor which acts somewhat like `clojure.core/update-in`, in the sense that
  the event handler is given a specific part of `app-db` to change, not all of `app-db`.

  The interceptor has both a `:before` and `:after` functions. The `:before` replaces
  the `:db` key within coeffects with a sub-path within `app-db`. The `:after` reverses the process,
  and it grafts the handler's return value back into db, at the right path.

  Examples:

      #!clj
      (path :some :path)
      (path [:some :path])
      (path [:some :path] :to :here)
      (path [:some :path] [:to] :here)

  Example Use:

      #!clj
      (reg-event-db
        :event-id
        (path [:a :b])  ;; <-- used here, in interceptor chain
        (fn [b v]       ;; 1st arg is not db. Is the value from path [:a :b] within db
          ... new-b))   ;; returns a new value for that path (not the entire db)

  Notes:

    1. `path` may appear more than once in an interceptor chain. Progressive narrowing.
    2. if `:effects` contains no `:db` effect, can't graft a value back in.
  "
  [& args]
  (apply std-interceptors/path args))

(defn enrich
  "Returns an interceptor which will run the given function `f` in the `:after`
  position.

  `f` is called with two arguments: `db` and `event`, and is expected to
  return a modified `db`.

  Unlike the `after` interceptor which is only about side effects, `enrich`
  expects `f` to process and alter the given `db` coeffect in some useful way,
  contributing to the derived data, flowing vibe.

  If `f` returns `nil`, the `db` value passed to `f` will be returned instead.

  #### Example Use:

  Imagine that todomvc needed to do duplicate detection - if any two todos had
  the same text, then highlight their background, and report them via a warning
  at the bottom of the panel.

  Almost any user action (edit text, add new todo, remove a todo) requires a
  complete reassessment of duplication errors and warnings. E.g. that edit
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

  <a href=\"https://twitter.com/nathanmarz/status/879722740776939520\" target=\"_blank\">https://twitter.com/nathanmarz/status/879722740776939520</a>

  By applying `f` in an `:enrich` interceptor, after every CRUD event,
  we keep the handlers simple and yet we ensure this important step
  (of getting warnings right) is not missed on any change.

  We can test `f` easily - it is a pure function - independently of
  any CRUD operation.

  This brings huge simplicity at the expense of some re-computation
  each time. This may be a very satisfactory trade-off in many cases.

  #### Returning nil

  In some cases, it's useful to apply a change to specific situations that can
  be determined at runtime instead of when defining the handler with an
  `:enrich` interceptor. Instead of forcing you to return the `db` from every
  non-applicable branch, you can return `nil` to use the given `db` value:

      #!clj
      (def set-last-update
        (core/enrich
          (fn [{db :db} [_ {user :user}]]
            (when (active-user? user)  ;; <- Only perform an update if user is active
              ...))))
  "
  [f]
  (std-interceptors/enrich f))

(def unwrap
  "> New in v1.2.0

   An interceptor which decreases the amount of destructuring necessary in an
   event handler where the event is structured as a 2-vector of
   [event-id payload-map].

   It promotes the `payload-map` part to be the event ultimately given to the
   event handler. Should you want the full original event, it can be found in
   `coeffects` under the key `:original-event`.

   If a dispatch looked like this:

      #!clj
       (dispatch [:event-id {:x 1 :y 2 :z 3}])

   Your event handlers can look like this:

      #!clj
       (reg-event-fx
         :event-id
         [... unwrap ...]                    ;; <-- added to the interceptors
         (fn [{:keys [db]} {:keys [x y z]}]  ;; <-- instead of [_ {:keys [x y z]}]
           ...)
   "
  std-interceptors/unwrap)

(def trim-v
  "An interceptor which removes the first element of the event vector,
  before it is supplied to the event handler, allowing you to write more
   aesthetically pleasing event handlers. No leading underscore on the event-v!

  Should you want the full original event, it can be found in `coeffects` under
  the key `:original-event`.

  Your event handlers will look like this:

      #!clj
      (reg-event-db
        :event-id
        [... trim-v ...]    ;; <-- added to the interceptors
        (fn [db [x y z]]    ;; <-- instead of [_ x y z]
          ...)
    "
  std-interceptors/trim-v)

(defn after
  "Returns an interceptor which runs the given function `f` in the `:after`
  position, presumably for side effects.

  `f` is called with two arguments: the `:effects` value for `:db`
  (or the `:coeffect` value of `:db` if no `:db` effect is returned) and the event.
  Its return value is ignored, so `f` can only side-effect.

  An example of use can be seen in the re-frame github repo in `/examples/todomvc/events.cljs`:

     - `f` runs schema validation (reporting any errors found).
     - `f` writes to localstorage."
  [f]
  (std-interceptors/after f))

(defn on-changes
  "Returns an interceptor which will observe N paths within `db`, and if any of them
  test not `identical?` to their previous value  (as a result of a event handler
  being run), then it will run `f` to compute a new value, which is then assoc-ed
  into the given `out-path` within `db`.

  Example Usage:

      #!clj
      (defn my-f
        [a-val b-val]
        ... some computation on a and b in here)

      ;; use it
      (def my-interceptor (on-changes my-f [:c] [:a] [:b]))

      (reg-event-db
        :event-id
        [... my-interceptor ...]  ;; <-- ultimately used here
        (fn [db v]
           ...))


  If you put this interceptor on handlers which might change paths `:a` or `:b`,
  it will:

    - call `f` each time the value at path `[:a]` or `[:b]` changes
    - call `f` with the values extracted from `[:a]` `[:b]`
    - assoc the return value from `f` into the path  `[:c]`
  "
  [f out-path & in-paths]
  (apply std-interceptors/on-changes f out-path in-paths))

(defn reg-global-interceptor
  "Registers the given `interceptor` as a global interceptor. Global interceptors are
   included in the processing chain of every event.

   When you register an event handler, you have the option of supplying an
   interceptor chain. Any global interceptors you register are effectively
   prepending to this chain.

   Global interceptors are run in the order that they are registered.

   Global interceptors are unique by :id. If a global interceptor with the same :id
   key as `interceptor` is already registered, `interceptor` will take its place in the
   global interceptor chain. This facilitates hot-reloading.

   Note: members of re-frame.std-interceptors do not have unique ids. To register
   more than one, consider:

  (reg-global-interceptor (-> (re-frame.std-interceptors/on-changes + [:a] [:b])
                              (assoc :id :my-unique-id)))"

  [interceptor]
  (settings/reg-global-interceptor interceptor))

(defn clear-global-interceptor
  "Unregisters global interceptors (presumably registered previously via the use of `reg-global-interceptor`).

  When called with no args, it will unregister all currently registered global interceptors.

  When given one arg, assumed to be the `id` of a previously registered
  global interceptors, it will unregister the associated interceptor. Will produce a warning to
  console if it finds no matching registration."
  ([]
   (settings/clear-global-interceptors))
  ([id]
   (settings/clear-global-interceptors id)))

(defn ->interceptor
  "A utility function for creating interceptors.

  Accepts three optional, named arguments:

     - `:id` - an id for the interceptor (decorative only)
     - `:before` - the interceptor's before function
     - `:after`  - the interceptor's after function

  Example use:

      #!clj
      (def my-interceptor
        (->interceptor
         :id     :my-interceptor
         :before (fn [context]
                   ... modifies and returns `context`)
         :after  (fn [context]
                   ... modifies and returns `context`)))

  Notes:

    - `:before` functions modify and return their `context` argument. Sometimes they
      only side effect, in which case, they'll perform the side effect and return
      `context` unchanged.
    - `:before` functions often modify the `:coeffects` map within `context` and,
      if they do, then they should use the utility functions `get-coeffect` and
      `assoc-coeffect`.
    - `:after` functions modify and return their `context` argument. Sometimes they
      only side effect, in which case, they'll perform the side effect and return
      `context` unchanged.
    - `:after` functions often modify the `:effects` map within `context` and,
      if they do, then they should use the utility functions `get-effect`
      and `assoc-effect`"
  [& {:as m :keys [id before after]}]
  (utils/apply-kw interceptor/->interceptor m))

(defn get-coeffect
  "A utility function, typically used when writing an interceptor's `:before` function.

   When called with one argument, it returns the `:coeffects` map from within that `context`.

   When called with two or three arguments, behaves like `clojure.core/get` and
   returns the value mapped to `key` in the `:coeffects` map within `context`, `not-found` or
   `nil` if `key` is not present."
  ([context]
   (interceptor/get-coeffect context))
  ([context key]
   (interceptor/get-coeffect context key))
  ([context key not-found]
   (interceptor/get-coeffect context key not-found)))

(defn assoc-coeffect
  "A utility function, typically used when writing an interceptor's `:before` function.

   Adds or updates a key/value pair in the `:coeffects` map within `context`. "
  [context key value]
  (interceptor/assoc-coeffect context key value))

(defn get-effect
  "A utility function, used when writing interceptors, typically within an `:after` function.

   When called with one argument, returns the `:effects` map from the `context`.

   When called with two or three arguments, behaves like `clojure.core/get` and
   returns the value mapped to `key` in the effects map, `not-found` or
   `nil` if `key` is not present."
  ([context]
   (interceptor/get-effect context))
  ([context key]
   (interceptor/get-effect context key))
  ([context key not-found]
   (interceptor/get-effect context key not-found)))

(defn assoc-effect
  "A utility function, typically used when writing an interceptor's `:after` function.

   Adds or updates a key/value pair in the `:effects` map within `context`. "
  [context key value]
  (interceptor/assoc-effect context key value))

(defn enqueue
  "A utility function, used when writing an interceptor's `:before` function.

  Adds the given collection of `interceptors` to those already in `context's`
  execution `:queue`. It returns the updated `context`.

  So, it provides a way for one interceptor to add more interceptors to the
  currently executing interceptor chain.
  "
  [context interceptors]
  (interceptor/enqueue context interceptors))

;; --  logging ----------------------------------------------------------------

(defn set-loggers!
  "re-frame outputs warnings and errors via the API function `console`
   which, by default, delegates to `js/console`'s default implementation for
  `log`, `error`, `warn`, `debug`, `group` and `groupEnd`. But, using this function,
   you can override that behaviour with your own functions.

  The argument `new-loggers` should be a map containing a subset of they keys
  for the standard `loggers`, namely  `:log` `:error` `:warn` `:debug` `:group`
  or `:groupEnd`.

  Example Usage:

      #!clj
      (defn my-logger      ;; my alternative logging function
        [& args]
        (post-it-somewhere (apply str args)))

      ;; now install my alternative loggers
      (re-frame.core/set-loggers!  {:warn my-logger :log my-logger})
   "
  [new-loggers]
  (loggers/set-loggers! new-loggers))

(defn console
  "A utility logging function which is used internally within re-frame to produce
  warnings and other output. It can also be used by libraries which
  extend re-frame, such as effect handlers.

  By default, it will output the given `args` to `js/console` at the given log `level`.
  However, an application using re-frame can redirect `console` output via `set-loggers!`.

  `level` can be one of `:log`, `:error`, `:warn`, `:debug`, `:group` or `:groupEnd`.

  Example usage:

      #!clj
      (console :error \"Sure enough it happened:\" a-var \"and\" another)
      (console :warn \"Possible breach of containment wall at:\" dt)
  "
  [level & args]
  (apply loggers/console level args))

;; -- unit testing ------------------------------------------------------------

(defn make-restore-fn
  "This is a utility function, typically used in testing.

  It checkpoints the current state of re-frame and returns a function which, when
  later called, will restore re-frame to the checkpointed state.

  The checkpoint includes `app-db`, all registered handlers and all subscriptions.
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
  "Removes all events currently queued for processing"
  []
  (router/purge re-frame.router/event-queue))

;; -- Event Processing Callbacks  ---------------------------------------------

(defn add-post-event-callback
  "Registers the given function `f` to be called after each event is processed.

   `f` will be called with two arguments:

    - `event`: a vector. The event just processed.
    - `queue`: a PersistentQueue, possibly empty, of events yet to be processed.

   This facility is useful in advanced cases like:

     - you are implementing a complex bootstrap pipeline
     - you want to create your own handling infrastructure, with perhaps multiple
       handlers for the one event, etc.  Hook in here.
     - libraries providing 'isomorphic javascript' rendering on  Nodejs or Nashorn.

  `id` is typically a keyword. If it supplied when an `f` is added, it can be
  subsequently be used to identify it for removal. See `remove-post-event-callback`.
  "
  ([f]
   (add-post-event-callback f f))   ;; use f as its own identifier
  ([id f]
   (router/add-post-event-callback re-frame.router/event-queue id f)))

(defn remove-post-event-callback
  "Unregisters a post event callback function, identified by `id`.

  Such a function must have been previously registered via `add-post-event-callback`"
  [id]
  (router/remove-post-event-callback re-frame.router/event-queue id))

;; --  Deprecation ------------------------------------------------------------

(def subscribe "Equivalent to `sub`." sub)

(defn reg-sub
  "Equivalent to `reg` `:legacy-sub`."
  [& args]
  (apply reg :legacy-sub args))

;; Assisting the v0.7.x ->  v0.8.x transition.
(defn register-handler
  "Deprecated. Use `reg-event-db` instead."
  {:deprecated "0.8.0"}
  [& args]
  (console :warn  "re-frame: \"register-handler\" has been renamed \"reg-event-db\" (look for registration of " (str (first args)) ")")
  (apply reg-event-db args))

(defn register-sub
  "Deprecated. Use `reg-sub-raw` instead."
  {:deprecated "0.8.0"}
  [& args]
  (console :warn  "re-frame: \"register-sub\" is used to register the event " (str (first args)) " but it is a deprecated part of the API. Please use \"reg-sub-raw\" instead.")
  (apply reg-sub-raw args))
