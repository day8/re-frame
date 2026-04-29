# re-frame.alpha-instrumented

A mirror of [`re-frame.alpha`](api-re-frame.alpha.md).

The alpha-side twin of
[`re-frame.core-instrumented`](api-re-frame.core-instrumented.md):
every public symbol from `alpha` is available here with the same call
shape, so adopting it is just an alias swap:

```clojure
;; before
(:require [re-frame.alpha              :as rf])

;; after — same calls, same code
(:require [re-frame.alpha-instrumented :as rf])
```

What changes: the dispatch and registration entry points that `alpha`
re-exports from `core` are wrapped so that tooling like
[re-frame-10x](https://github.com/day8/re-frame-10x) and
[re-frame-pair](https://github.com/day8/re-frame-pair) can show you
which file and line each call came from.

The alpha-only surface (`reg`, `sub`, `reg-flow`) passes through
unwrapped for now; instrumentation there is deferred until the alpha
API stabilises.

## Dispatching Events

### dispatch

```clojure
(dispatch event-v)
```


Like `re-frame.alpha/dispatch` but in DEBUG builds attaches
 `{:file :line}` on the event vector as `:re-frame/source`
 metadata. Production CLJS builds (`goog.DEBUG=false`) emit a bare
 `re-frame.alpha/dispatch` call after Closure DCE.

### dispatch-sync

```clojure
(dispatch-sync event-v)
```


Like `re-frame.alpha/dispatch-sync` but attaches call-site source
 meta in DEBUG builds. See `dispatch` for the rationale and DCE
 behaviour.

### dispatch-with

```clojure
(dispatch-with event-v overrides)
```


Like `re-frame.alpha/dispatch-with` but attaches call-site source
 meta on the event vector in DEBUG builds. `overrides` is passed
 through unchanged.

### dispatch-sync-with

```clojure
(dispatch-sync-with event-v overrides)
```


Like `re-frame.alpha/dispatch-sync-with` but attaches call-site
 source meta on the event vector in DEBUG builds. `overrides` is
 passed through unchanged.

### dispatch-and-settle

```clojure
(dispatch-and-settle event-v)
```

```clojure
(dispatch-and-settle event-v opts)
```


Like `re-frame.alpha/dispatch-and-settle` but attaches call-site
 source meta on the event vector in DEBUG builds. `opts` is passed
 through unchanged.

## Legacy Compatibility

### subscribe

```clojure
(subscribe query-v)
```

```clojure
(subscribe query-v dynv)
```


Like `re-frame.alpha/subscribe` but in DEBUG builds attaches
 `{:file :line}` on the query vector as `:re-frame/source`
 metadata before lookup. Production CLJS builds emit a bare
 `re-frame.alpha/subscribe` call after Closure DCE.

 Cache identity is unaffected: vector and map equality in CLJ/CLJS
 ignore metadata.

 Supports the same arities as `re-frame.alpha/subscribe`, including
 the historical `[query-v dynv]` form. Source metadata is attached
 to `query-v`; `dynv` is passed through unchanged.

### reg-event-db

```clojure
(reg-event-db id handler)
```

```clojure
(reg-event-db id interceptors handler)
```


Like `re-frame.alpha/reg-event-db` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered interceptor chain.

### reg-event-fx

```clojure
(reg-event-fx id handler)
```

```clojure
(reg-event-fx id interceptors handler)
```


Like `re-frame.alpha/reg-event-fx` but attaches call-site source
 meta on the registered interceptor chain in DEBUG builds.

### reg-event-ctx

```clojure
(reg-event-ctx id handler)
```

```clojure
(reg-event-ctx id interceptors handler)
```


Like `re-frame.alpha/reg-event-ctx` but attaches call-site source
 meta on the registered interceptor chain in DEBUG builds.

### reg-sub

```clojure
(reg-sub query-id & args)
```


Like `re-frame.alpha/reg-sub` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered subscription
 handler. Variadic — supports the same `:<-` / `:->` / `:=>` sugar
 as `re-frame.alpha/reg-sub`.

### reg-sub-raw

```clojure
(reg-sub-raw query-id handler-fn)
```


Like `re-frame.alpha/reg-sub-raw` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered subscription
 handler. Source-meta is decorated under the same `:sub` kind as
 `reg-sub`, so existing tooling reads it the same way.

### reg-fx

```clojure
(reg-fx id handler)
```


Like `re-frame.alpha/reg-fx` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered effect handler.

### reg-cofx

```clojure
(reg-cofx id handler)
```


Like `re-frame.alpha/reg-cofx` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered coeffect handler.

### reg-event-error-handler

```clojure
(reg-event-error-handler handler)
```


Like `re-frame.alpha/reg-event-error-handler` but in DEBUG builds
 attaches `{:file :line}` as metadata on the registered handler.
 Decorates under the fixed `[:error :event-handler]` registrar
 entry — only one error handler is supported re-frame-wide.

## Registration

### reg


null

## Subscription

### sub


null

## Flows

### reg-flow


null

### clear-flow


null

### get-flow


null

### flow<-


null

