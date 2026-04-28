(ns re-frame.macros
  "Opt-in macro mirror of `re-frame.core` that captures the call-site
   `{:file :line}` at macro-expansion time and attaches it as
   `:re-frame/source` metadata — for 'why did this event fire?' /
   'which view asked for this sub?' / 'where was this handler
   registered?' diagnostics that don't depend on stack traces or
   source maps.

   `re-frame.core` is the stable function API. This namespace is the
   meta-capturing alternative for callers (devtools, dev builds) who
   want source provenance baked into the runtime values they
   register and consume. Migration is alias-only:

       ;; function API — no source-meta
       (:require [re-frame.core   :as rf])

       ;; macro API — same call shape, source-meta captured
       (:require [re-frame.macros :as rf])

   Symbols re-exported here as macros: `dispatch`, `dispatch-sync`,
   `subscribe`, `reg-event-db`, `reg-event-fx`, `reg-event-ctx`,
   `reg-sub`, `reg-fx`. Each emits a call to the corresponding
   `re-frame.core` function, plus a meta-attach step.

   Where the meta lands:

   - `dispatch` / `dispatch-sync` — `vary-meta` on the event vector
     (`(:re-frame/source (meta event))` in handlers).
   - `subscribe` — `vary-meta` on the query vector before lookup;
     recover via `(re-frame.subs/query-v-for-reaction r)`. Cache
     identity is unaffected (vector equality ignores meta).
   - `reg-event-db` / `-fx` / `-ctx` / `reg-sub` / `reg-fx` — meta is
     attached to the *registered* value, so
     `(meta (re-frame.registrar/get-handler kind id))` returns
     `{:file :line}`. The mechanics live in
     `re-frame.registrar/-decorate-handler-meta!`.

   Trace consumers (re-frame-10x, re-frame-pair, custom devtools)
   see the dispatch/subscribe meta automatically because the
   `:event` and `:query-v` / `:input-query-vs` trace tags ARE the
   dispatched / subscribed vectors — `(-> trace :tags :event meta
   :re-frame/source)` works without any new emission machinery.

   In CLJS production builds (`goog.DEBUG=false`), the
   meta-capturing branch is eliminated by Closure dead-code
   elimination: each macro reduces to a bare `re-frame.core/...`
   call with zero allocation overhead. The runtime gate is
   `re-frame.interop/debug-enabled?` (aliased to `goog/DEBUG` under
   CLJS, hardcoded `true` under CLJ) — the same gate
   `re-frame.registrar` uses for its DCE-friendly debug warnings.

   Macros cannot be used in value position. If you need
   `(map reg-event-db ...)` / `(apply reg-sub ...)` / `(partial
   reg-fx ...)`, keep using `re-frame.core` — it remains the
   higher-order-safe surface.

   Opt-in via `(:require [re-frame.macros :as rf.m])` — the
   namespace self-requires its macros so a CLJS `:require` is
   sufficient, and transitively pulls in `re-frame.core` /
   `re-frame.interop` / `re-frame.registrar` so the fully-qualified
   symbols emitted by macro expansions resolve without the user
   needing to require those namespaces themselves."
  #?(:cljs (:require-macros [re-frame.macros]))
  (:require [re-frame.core]
            [re-frame.interop]
            [re-frame.registrar]))

(defmacro dispatch
  "Like `re-frame.core/dispatch` but in DEBUG builds attaches
   `{:file :line}` on the event vector as `:re-frame/source`
   metadata. Production CLJS builds (`goog.DEBUG=false`) emit a bare
   `re-frame.core/dispatch` call after Closure DCE — no `if`, no
   `vary-meta`, no allocation.

   Read inside handlers via `(:re-frame/source (meta event))` or via
   the existing trace's `:event` tag.

   The macro uses standard `vary-meta` so any user-supplied event
   metadata survives the merge."
  {:arglists '([event-v])}
  [event-v]
  (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (re-frame.core/dispatch
         (vary-meta ~event-v assoc :re-frame/source ~src-meta))
       (re-frame.core/dispatch ~event-v))))

(defmacro dispatch-sync
  "Like `re-frame.core/dispatch-sync` but attaches call-site source
   meta in DEBUG builds. See `dispatch` for the rationale and DCE
   behaviour."
  {:arglists '([event-v])}
  [event-v]
  (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (re-frame.core/dispatch-sync
         (vary-meta ~event-v assoc :re-frame/source ~src-meta))
       (re-frame.core/dispatch-sync ~event-v))))

(defmacro subscribe
  "Like `re-frame.core/subscribe` but in DEBUG builds attaches
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
   without any new emission)."
  {:arglists '([query-v])}
  [query-v]
  (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (re-frame.core/subscribe
         (vary-meta ~query-v assoc :re-frame/source ~src-meta))
       (re-frame.core/subscribe ~query-v))))

;; -- registration macros -----------------------------------------------------
;;
;; Each `reg-*` macro below expands to a call to the corresponding
;; `re-frame.core` *function* (the stable, value-position-safe surface)
;; followed by a `-decorate-handler-meta!` step that re-registers the
;; just-registered value with `{:file :line}` attached as metadata.
;; Reading the meta back is `(meta (re-frame.registrar/get-handler
;; kind id))`.
;;
;; The DCE gate is the same pattern dispatch/subscribe use: an `if` on
;; `re-frame.interop/debug-enabled?` so production CLJS reduces to the
;; bare `re-frame.core/reg-*` call. Registration runs once at app
;; boot, so the runtime cost matters less than for dispatch/subscribe,
;; but the gate keeps the symmetry and lets builds that flip
;; `goog.DEBUG=false` shed the `-decorate-handler-meta!` call entirely.

(defmacro reg-event-db
  "Like `re-frame.core/reg-event-db` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered interceptor chain so
   `(meta (re-frame.registrar/get-handler :event id))` returns the
   call-site location. Production CLJS builds (`goog.DEBUG=false`)
   emit a bare `re-frame.core/reg-event-db` call after Closure DCE.

   Macro — cannot be used in value position. For
   `(map reg-event-db ...)` or `(apply reg-event-db ...)` use
   `re-frame.core/reg-event-db` instead."
  {:arglists '([id handler] [id interceptors handler])}
  ([id handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-db ~id ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-db ~id ~handler))))
  ([id interceptors handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-db ~id ~interceptors ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-db ~id ~interceptors ~handler)))))

(defmacro reg-event-fx
  "Like `re-frame.core/reg-event-fx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])}
  ([id handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-fx ~id ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-fx ~id ~handler))))
  ([id interceptors handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-fx ~id ~interceptors ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-fx ~id ~interceptors ~handler)))))

(defmacro reg-event-ctx
  "Like `re-frame.core/reg-event-ctx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])}
  ([id handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-ctx ~id ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-ctx ~id ~handler))))
  ([id interceptors handler]
   (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
     `(if re-frame.interop/debug-enabled?
        (let [r# (re-frame.core/reg-event-ctx ~id ~interceptors ~handler)]
          (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
          r#)
        (re-frame.core/reg-event-ctx ~id ~interceptors ~handler)))))

(defmacro reg-sub
  "Like `re-frame.core/reg-sub` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered subscription
   handler so `(meta (re-frame.registrar/get-handler :sub query-id))`
   returns the call-site location. Production CLJS builds emit a
   bare `re-frame.core/reg-sub` call after Closure DCE.

   Variadic — supports the same `:<-` / `:->` / `:=>` sugar pairs as
   `re-frame.core/reg-sub`. Macro, so `(apply reg-sub ...)` won't
   compile; use `re-frame.core/reg-sub` for that."
  {:arglists '([query-id & args])}
  [query-id & args]
  (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (let [r# (re-frame.core/reg-sub ~query-id ~@args)]
         (re-frame.registrar/-decorate-handler-meta! :sub ~query-id ~src-meta)
         r#)
       (re-frame.core/reg-sub ~query-id ~@args))))

(defmacro reg-fx
  "Like `re-frame.core/reg-fx` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered effect handler so
   `(meta (re-frame.registrar/get-handler :fx id))` returns the
   call-site location. Production CLJS builds emit a bare
   `re-frame.core/reg-fx` call after Closure DCE."
  {:arglists '([id handler])}
  [id handler]
  (let [src-meta {:file (or (:file &env) *file*) :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (let [r# (re-frame.core/reg-fx ~id ~handler)]
         (re-frame.registrar/-decorate-handler-meta! :fx ~id ~src-meta)
         r#)
       (re-frame.core/reg-fx ~id ~handler))))
