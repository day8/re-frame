# re-frame.core-instrumented

A mirror of [`re-frame.core`](api-re-frame.core.md).

This namespace exposes every public symbol from `core` with the same
call shape, so adopting it is just an alias swap:

```clojure
;; before
(:require [re-frame.core              :as rf])

;; after — same calls, same code
(:require [re-frame.core-instrumented :as rf])
```

What changes: the entry points you reach for most often (`dispatch`,
`subscribe`, `reg-event-db`, …) are wrapped so that tooling like
[re-frame-10x](https://github.com/day8/re-frame-10x) and
[re-frame-pair](https://github.com/day8/re-frame-pair) can show you
which file and line each call came from.

See [`re-frame.core`](api-re-frame.core.md) for the documentation of
each symbol — this namespace mirrors its contract.

## Dispatching Events

### dispatch

```clojure
(dispatch event-v)
```


Like `re-frame.core/dispatch` but in DEBUG builds attaches
 `{:file :line}` on the event vector as `:re-frame/source`
 metadata. Production CLJS builds (`goog.DEBUG=false`) emit a bare
 `re-frame.core/dispatch` call after Closure DCE — no `if`, no
 `vary-meta`, no allocation.

 Read inside handlers via `(:re-frame/source (meta event))` or via
 the existing trace's `:event` tag.

 The macro uses standard `vary-meta` so any user-supplied event
 metadata survives the merge.

### dispatch-sync

```clojure
(dispatch-sync event-v)
```


Like `re-frame.core/dispatch-sync` but attaches call-site source
 meta in DEBUG builds. See `dispatch` for the rationale and DCE
 behaviour.

### dispatch-with

```clojure
(dispatch-with event-v overrides)
```


Like `re-frame.core/dispatch-with` but attaches call-site source
 meta on the event vector in DEBUG builds. See `dispatch` for the
 rationale and DCE behaviour. `overrides` is passed through
 unchanged.

### dispatch-sync-with

```clojure
(dispatch-sync-with event-v overrides)
```


Like `re-frame.core/dispatch-sync-with` but attaches call-site
 source meta on the event vector in DEBUG builds. See `dispatch`
 for the rationale and DCE behaviour. `overrides` is passed through
 unchanged.

### dispatch-and-settle

```clojure
(dispatch-and-settle event-v)
```

```clojure
(dispatch-and-settle event-v opts)
```


Like `re-frame.core/dispatch-and-settle` but attaches call-site
 source meta on the event vector in DEBUG builds. See `dispatch`
 for the rationale and DCE behaviour. `opts` is passed through
 unchanged.

## Subscriptions

### subscribe

```clojure
(subscribe query-v)
```

```clojure
(subscribe query-v dynv)
```


Like `re-frame.core/subscribe` but in DEBUG builds attaches
 `{:file :line}` on the query vector as `:re-frame/source`
 metadata before lookup. Production CLJS builds
 (`goog.DEBUG=false`) emit a bare `re-frame.core/subscribe` call
 after Closure DCE.

 Cache identity is unaffected: vector and map equality in CLJ/CLJS
 ignore metadata, and `re-frame.subs/cache-key` keys on plain `=`
 so `^{:re-frame/source ...} [:foo]` and bare `[:foo]` resolve to
 the same cached reaction.

 Recover the meta'd query-v via `re-frame.subs/query-v-for-reaction`
 on the returned reaction, or read the `:input-query-vs` tag on
 `:sub/run` traces.

 Supports the same arities as `re-frame.core/subscribe`, including
 the historical `[query-v dynv]` form. Source metadata is attached
 to `query-v`; `dynv` is passed through unchanged.

### reg-sub

```clojure
(reg-sub query-id & args)
```


Like `re-frame.core/reg-sub` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered subscription
 handler so `(meta (re-frame.registrar/get-handler :sub query-id))`
 returns the call-site location. Production CLJS builds emit a
 bare `re-frame.core/reg-sub` call after Closure DCE.

 Variadic — supports the same `:<-` / `:->` / `:=>` sugar pairs as
 `re-frame.core/reg-sub`. Macro, so `(apply reg-sub ...)` won't
 compile; use `re-frame.core/reg-sub` for that.

### reg-sub-raw

```clojure
(reg-sub-raw query-id handler-fn)
```


Like `re-frame.core/reg-sub-raw` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered subscription
 handler. Source-meta is decorated under the same `:sub` kind as
 `reg-sub`, so existing tooling reads it the same way.

### clear-sub

```clojure
(clear-sub)
```

```clojure
(clear-sub query-id)
```


Unregisters subscription handlers (presumably registered previously via the use of `reg-sub`).

When called with no args, it will unregister all currently registered subscription handlers.

When given one arg, assumed to be the `id` of a previously registered
subscription handler, it will unregister the associated handler. Will produce a warning to
console if it finds no matching registration.

NOTE: Depending on the usecase, it may be necessary to call `clear-subscription-cache!` afterwards

### clear-subscription-cache!

```clojure
(clear-subscription-cache!)
```


Removes all subscriptions from the cache.

This function can be used at development time or test time. Useful when hot reloading
namespaces containing subscription handlers. Also call it after a React/render exception,
because React components won't have been cleaned up properly. And this, in turn, means
the subscriptions within those components won't have been cleaned up correctly. So this
forces the issue.


### query-v-for-reaction

```clojure
(query-v-for-reaction reaction)
```


Returns the query-v that produced `reaction`, or nil if the reaction
 is unknown to re-frame's subscription cache.

 The inverse of `subscribe`: given a reaction held by tooling or a
 diagnostic recipe, recover the query-v that originally produced it.
 Backed by an object-identity-keyed reverse map maintained alongside
 the subscription cache; entries are cleared when the reaction is
 disposed.

### live-query-vs

```clojure
(live-query-vs)
```


Returns a sequence of all currently-live query-vectors — one entry
 per active cached subscription.

 A snapshot of the subscription cache at call time; does not update
 reactively. Useful for devtools and diagnostic tools that need to
 enumerate active subscriptions without relying on internal cache
 structure details.

## Event Handlers

### reg-event-db

```clojure
(reg-event-db id handler)
```

```clojure
(reg-event-db id interceptors handler)
```


Like `re-frame.core/reg-event-db` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered interceptor chain so
 `(meta (re-frame.registrar/get-handler :event id))` returns the
 call-site location. Production CLJS builds (`goog.DEBUG=false`)
 emit a bare `re-frame.core/reg-event-db` call after Closure DCE.

 Macro — cannot be used in value position. For
 `(map reg-event-db ...)` or `(apply reg-event-db ...)` use
 `re-frame.core/reg-event-db` instead.

### reg-event-fx

```clojure
(reg-event-fx id handler)
```

```clojure
(reg-event-fx id interceptors handler)
```


Like `re-frame.core/reg-event-fx` but attaches call-site source
 meta on the registered interceptor chain in DEBUG builds. See
 `reg-event-db` for the rationale and DCE behaviour.

### reg-event-ctx

```clojure
(reg-event-ctx id handler)
```

```clojure
(reg-event-ctx id interceptors handler)
```


Like `re-frame.core/reg-event-ctx` but attaches call-site source
 meta on the registered interceptor chain in DEBUG builds. See
 `reg-event-db` for the rationale and DCE behaviour.

### reg-event-error-handler

```clojure
(reg-event-error-handler handler)
```


Like `re-frame.core/reg-event-error-handler` but in DEBUG builds
 attaches `{:file :line}` as metadata on the registered handler so
 `(meta (re-frame.registrar/get-handler :error :event-handler))`
 returns the call-site location. Production CLJS builds emit a bare
 `re-frame.core/reg-event-error-handler` call after Closure DCE.

 The error handler is registered under the fixed registrar entry
 `[:error :event-handler]` (only one error handler is supported
 re-frame-wide); the macro mirrors that contract.

### clear-event

```clojure
(clear-event)
```

```clojure
(clear-event id)
```


Unregisters event handlers (presumably registered previously via the use of `reg-event-db` or `reg-event-fx`).

When called with no args, it will unregister all currently registered event handlers.

When given one arg, assumed to be the `id` of a previously registered
event handler, it will unregister the associated handler. Will produce a warning to
console if it finds no matching registration.

## Effect Handlers

### reg-fx

```clojure
(reg-fx id handler)
```


Like `re-frame.core/reg-fx` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered effect handler so
 `(meta (re-frame.registrar/get-handler :fx id))` returns the
 call-site location. Production CLJS builds emit a bare
 `re-frame.core/reg-fx` call after Closure DCE.

### clear-fx

```clojure
(clear-fx)
```

```clojure
(clear-fx id)
```


Unregisters effect handlers (presumably registered previously via the use of `reg-fx`).

When called with no args, it will unregister all currently registered effect handlers.

When given one arg, assumed to be the `id` of a previously registered
effect handler, it will unregister the associated handler. Will produce a warning to
console if it finds no matching registration.


## Coeffects

### reg-cofx

```clojure
(reg-cofx id handler)
```


Like `re-frame.core/reg-cofx` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered coeffect handler so
 `(meta (re-frame.registrar/get-handler :cofx id))` returns the
 call-site location. Production CLJS builds emit a bare
 `re-frame.core/reg-cofx` call after Closure DCE.

### clear-cofx

```clojure
(clear-cofx)
```

```clojure
(clear-cofx id)
```


Unregisters coeffect handlers (presumably registered previously via the use of `reg-cofx`).

When called with no args, it will unregister all currently registered coeffect handlers.

When given one arg, assumed to be the `id` of a previously registered
coeffect handler, it will unregister the associated handler. Will produce a warning to
console if it finds no matching registration.

### inject-cofx

```clojure
(inject-cofx id)
```

```clojure
(inject-cofx id value)
```


Given an `id`, and an optional, arbitrary `value`, returns an interceptor
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

    
    (re-frame.core/reg-cofx
      :datetime                        ;; usage  (inject-cofx :datetime)
      (fn coeffect-handler
        [coeffect]
        (assoc coeffect :now (js/Date.))))   ;; modify and return first arg

Second - Later, add an interceptor to an -fx event handler, using `inject-cofx`:

    
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


## Miscellaneous

### add-post-event-callback

```clojure
(add-post-event-callback f)
```

```clojure
(add-post-event-callback id f)
```


Registers the given function `f` to be called after each event is processed.

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


### remove-post-event-callback

```clojure
(remove-post-event-callback id)
```


Unregisters a post event callback function, identified by `id`.

Such a function must have been previously registered via `add-post-event-callback`

### make-restore-fn

```clojure
(make-restore-fn)
```


This is a utility function, typically used in testing.

It checkpoints the current state of re-frame and returns a function which, when
later called, will restore re-frame to the checkpointed state.

The checkpoint includes `app-db`, all registered handlers and all subscriptions.


### purge-event-queue

```clojure
(purge-event-queue)
```


Removes all events currently queued for processing

### version


Runtime-readable string identifying the deployed re-frame artifact —
 useful for devtools, instrumentation, and version-floor probes that
 need to know which re-frame they're running against without parsing
 pom.xml.

 Re-exported from `re-frame.config/version`; see that namespace for
 the build-time override hook (`:closure-defines` in shadow-cljs).

## Writing Interceptors

### enqueue

```clojure
(enqueue context interceptors)
```


A utility function, used when writing an interceptor's `:before` function.

Adds the given collection of `interceptors` to those already in `context's`
execution `:queue`. It returns the updated `context`.

So, it provides a way for one interceptor to add more interceptors to the
currently executing interceptor chain.


### get-coeffect

```clojure
(get-coeffect context)
```

```clojure
(get-coeffect context key)
```

```clojure
(get-coeffect context key not-found)
```


A utility function, typically used when writing an interceptor's `:before` function.

 When called with one argument, it returns the `:coeffects` map from within that `context`.

 When called with two or three arguments, behaves like `clojure.core/get` and
 returns the value mapped to `key` in the `:coeffects` map within `context`, `not-found` or
 `nil` if `key` is not present.

### assoc-coeffect

```clojure
(assoc-coeffect context key value)
```


A utility function, typically used when writing an interceptor's `:before` function.

 Adds or updates a key/value pair in the `:coeffects` map within `context`. 

### get-effect

```clojure
(get-effect context)
```

```clojure
(get-effect context key)
```

```clojure
(get-effect context key not-found)
```


A utility function, used when writing interceptors, typically within an `:after` function.

 When called with one argument, returns the `:effects` map from the `context`.

 When called with two or three arguments, behaves like `clojure.core/get` and
 returns the value mapped to `key` in the effects map, `not-found` or
 `nil` if `key` is not present.

### assoc-effect

```clojure
(assoc-effect context key value)
```


A utility function, typically used when writing an interceptor's `:after` function.

 Adds or updates a key/value pair in the `:effects` map within `context`. 

### ->interceptor

```clojure
(->interceptor & {:as m, :keys [id before after]})
```


A utility function for creating interceptors.

Accepts three optional, named arguments:

   - `:id` - an id for the interceptor (decorative only)
   - `:before` - the interceptor's before function
   - `:after`  - the interceptor's after function

Example use:

    
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
    and `assoc-effect`

## Global Interceptors

### clear-global-interceptor

```clojure
(clear-global-interceptor)
```

```clojure
(clear-global-interceptor id)
```


Unregisters global interceptors (presumably registered previously via the use of `reg-global-interceptor`).

When called with no args, it will unregister all currently registered global interceptors.

When given one arg, assumed to be the `id` of a previously registered
global interceptors, it will unregister the associated interceptor. Will produce a warning to
console if it finds no matching registration.

### reg-global-interceptor

```clojure
(reg-global-interceptor interceptor)
```


Registers the given `interceptor` as a global interceptor. Global interceptors are
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
                            (assoc :id :my-unique-id)))

## Interceptors

### path

```clojure
(path & args)
```


Returns an interceptor which acts somewhat like `clojure.core/update-in`, in the sense that
the event handler is given a specific part of `app-db` to change, not all of `app-db`.

The interceptor has both a `:before` and `:after` functions. The `:before` replaces
the `:db` key within coeffects with a sub-path within `app-db`. The `:after` reverses the process,
and it grafts the handler's return value back into db, at the right path.

Examples:

    
    (path :some :path)
    (path [:some :path])
    (path [:some :path] :to :here)
    (path [:some :path] [:to] :here)

Example Use:

    
    (reg-event-db
      :event-id
      (path [:a :b])  ;; <-- used here, in interceptor chain
      (fn [b v]       ;; 1st arg is not db. Is the value from path [:a :b] within db
        ... new-b))   ;; returns a new value for that path (not the entire db)

Notes:

  1. `path` may appear more than once in an interceptor chain. Progressive narrowing.
  2. if `:effects` contains no `:db` effect, can't graft a value back in.


### enrich

```clojure
(enrich f)
```


Returns an interceptor which will run the given function `f` in the `:after`
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

<a href="https://twitter.com/nathanmarz/status/879722740776939520" target="_blank">https://twitter.com/nathanmarz/status/879722740776939520</a>

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

    
    (def set-last-update
      (core/enrich
        (fn [{db :db} [_ {user :user}]]
          (when (active-user? user)  ;; <- Only perform an update if user is active
            ...))))


### after

```clojure
(after f)
```


Returns an interceptor which runs the given function `f` in the `:after`
position, presumably for side effects.

`f` is called with two arguments: the `:effects` value for `:db`
(or the `:coeffect` value of `:db` if no `:db` effect is returned) and the event.
Its return value is ignored, so `f` can only side-effect.

An example of use can be seen in the re-frame github repo in `/examples/todomvc/events.cljs`:

   - `f` runs schema validation (reporting any errors found).
   - `f` writes to localstorage.

### on-changes

```clojure
(on-changes f out-path & in-paths)
```


Returns an interceptor which will observe N paths within `db`, and if any of them
test not `identical?` to their previous value  (as a result of a event handler
being run), then it will run `f` to compute a new value, which is then assoc-ed
into the given `out-path` within `db`.

Example Usage:

    
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


### debug


An interceptor which logs/instruments an event handler's actions to
`re-frame/console` at the `:log` level.

Output includes:

  1. the event vector
  2. a `clojure.data/diff` of db, before vs after, which shows
     the changes caused by the event handler. To understand the output,
     you should understand:
     <a href="https://clojuredocs.org/clojure.data/diff" target="_blank">https://clojuredocs.org/clojure.data/diff</a>.

You'd typically include this interceptor after (to the right of) any
`path` interceptor.

Warning:  calling `clojure.data/diff` on large, complex data structures
can be slow. So, you won't want this interceptor present in production
code. So, you should condition it out like this:

    
    (re-frame.core/reg-event-db
      :evt-id
      [(when ^boolean goog.DEBUG re-frame.core/debug)]  ;; <-- conditional
      (fn [db v]
         ...))

To make this code fragment work, you'll also have to set `goog.DEBUG` to
`false` in your production builds. For an example, look in `project.clj` of /examples/todomvc.


### unwrap


> New in v1.2.0

 An interceptor which decreases the amount of destructuring necessary in an
 event handler where the event is structured as a 2-vector of
 [event-id payload-map].

 It promotes the `payload-map` part to be the event ultimately given to the
 event handler. Should you want the full original event, it can be found in
 `coeffects` under the key `:original-event`.

 If a dispatch looked like this:

    
     (dispatch [:event-id {:x 1 :y 2 :z 3}])

 Your event handlers can look like this:

    
     (reg-event-fx
       :event-id
       [... unwrap ...]                    ;; <-- added to the interceptors
       (fn [{:keys [db]} {:keys [x y z]}]  ;; <-- instead of [_ {:keys [x y z]}]
         ...)
 

### trim-v


An interceptor which removes the first element of the event vector,
before it is supplied to the event handler, allowing you to write more
 aesthetically pleasing event handlers. No leading underscore on the event-v!

Should you want the full original event, it can be found in `coeffects` under
the key `:original-event`.

Your event handlers will look like this:

    
    (reg-event-db
      :event-id
      [... trim-v ...]    ;; <-- added to the interceptors
      (fn [db [x y z]]    ;; <-- instead of [_ x y z]
        ...)
  

## Logging

### set-loggers!

```clojure
(set-loggers! new-loggers)
```


re-frame outputs warnings and errors via the API function `console`
 which, by default, delegates to `js/console`'s default implementation for
`log`, `error`, `warn`, `debug`, `group` and `groupEnd`. But, using this function,
 you can override that behaviour with your own functions.

The argument `new-loggers` should be a map containing a subset of they keys
for the standard `loggers`, namely  `:log` `:error` `:warn` `:debug` `:group`
or `:groupEnd`.

Example Usage:

    
    (defn my-logger      ;; my alternative logging function
      [& args]
      (post-it-somewhere (apply str args)))

    ;; now install my alternative loggers
    (re-frame.core/set-loggers!  {:warn my-logger :log my-logger})
 

### console

```clojure
(console level & args)
```


A utility logging function which is used internally within re-frame to produce
warnings and other output. It can also be used by libraries which
extend re-frame, such as effect handlers.

By default, it will output the given `args` to `js/console` at the given log `level`.
However, an application using re-frame can redirect `console` output via `set-loggers!`.

`level` can be one of `:log`, `:error`, `:warn`, `:debug`, `:group` or `:groupEnd`.

Example usage:

    
    (console :error "Sure enough it happened:" a-var "and" another)
    (console :warn "Possible breach of containment wall at:" dt)


## Tracing

### tag-schema


Schema for `:tags` of every op-type re-frame emits.

### validate-trace?


True iff runtime trace-tag validation is enabled.

### set-validate-trace!


Enable or disable runtime trace-tag validation.

### register-trace-cb


Register a callback that receives each batch of finished traces.

### remove-trace-cb


Remove a trace callback by key.

### register-epoch-cb


Register a callback that receives assembled epoch records.

### remove-epoch-cb


Remove an epoch callback by key.

### assemble-epochs


Partition a finished trace batch into event epoch records.

## Deprecated

### register-handler

```clojure
(register-handler & args)
```


Deprecated. Use `reg-event-db` instead.

### register-sub

```clojure
(register-sub & args)
```


Deprecated. Use `reg-sub-raw` instead.

