# re-frame.core-instrumented

## null

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

### subscribe

```clojure
(subscribe query-v)
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
 `:sub/run` traces (downstream consumers see the meta'd vectors
 without any new emission).

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

### reg-fx

```clojure
(reg-fx id handler)
```


Like `re-frame.core/reg-fx` but in DEBUG builds attaches
 `{:file :line}` as metadata on the registered effect handler so
 `(meta (re-frame.registrar/get-handler :fx id))` returns the
 call-site location. Production CLJS builds emit a bare
 `re-frame.core/reg-fx` call after Closure DCE.

