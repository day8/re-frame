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


null

### clear-subscription-cache!


null

### query-v-for-reaction


null

### live-query-vs


null

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


null

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


null

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


null

### inject-cofx


null

## Miscellaneous

### add-post-event-callback


null

### remove-post-event-callback


null

### make-restore-fn


null

### purge-event-queue


null

### version


null

## Writing Interceptors

### enqueue


null

### get-coeffect


null

### assoc-coeffect


null

### get-effect


null

### assoc-effect


null

### ->interceptor


null

## Global Interceptors

### clear-global-interceptor


null

### reg-global-interceptor


null

## Interceptors

### path


null

### enrich


null

### after


null

### on-changes


null

### debug


null

### unwrap


null

### trim-v


null

## Logging

### set-loggers!


null

### console


null

## Tracing

### tag-schema


null

### validate-trace?


null

### set-validate-trace!


null

### register-trace-cb


null

### remove-trace-cb


null

### register-epoch-cb


null

### remove-epoch-cb


null

### assemble-epochs


null

## Deprecated

### register-handler


null

### register-sub


null

