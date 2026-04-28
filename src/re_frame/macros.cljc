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

;; -- dispatch / dispatch-sync / subscribe ------------------------------------
;;
;; All three forward a single user-supplied vector to a `re-frame.core` fn
;; and, in DEBUG builds, attach a `{:file :line}` `:re-frame/source` meta
;; first. The shape is identical across the three; only the target fn
;; differs — so `-source-meta-call` builds the expansion form and the
;; public macros are 1-line delegates.

#?(:clj
   (defn- -source-meta
     "Return call-site source metadata for a macro invocation.

      In CLJS builds, shadow-cljs does not reliably populate `:file`
      in `&env`, while the reader does attach `:file` and `:line` to
      the invocation form. Prefer form metadata for both fields, then
      fall back to `&env` / `*file*` for macro-generated forms that
      lack reader metadata."
     [form env]
     (let [form-meta (meta form)]
       {:file (or (:file form-meta) (:file env) *file*)
        :line (:line form-meta)})))

#?(:clj
   (defn- -source-meta-call
     "Emit the macroexpansion form for a call to `target-sym`, wrapping
      the first user-supplied value `v` with `:re-frame/source` meta in
      DEBUG builds and passing it through bare in non-DEBUG builds. The
      first user expression is bound once so both branches reuse the same
      value without re-evaluating side-effects. Any extra args are passed
      through unchanged after that first value.

   `target-sym` is the fully-qualified `re-frame.core/...` symbol;
   `form`/`env` are the calling macro's `&form` / `&env`. `:file` and
   `:line` both come from `(meta form)` — that's the metadata the
   CLJS reader attaches to the macro-invocation form when reading
   from a source file (mirrors `re-com.core/at`, which has captured
   call-site file/line in CLJS this way for years). `:file env` is
   tried as a secondary fallback in case form-meta is missing (e.g.
   macro called from inside another macro's expansion); `*file*` is
   the JVM-side last-resort, useful only when the CLJS reader didn't
   reach this form (rare)."
     [target-sym v form env & args]
     (let [src-meta (-source-meta form env)]
       `(let [v# ~v]
          (if re-frame.interop/debug-enabled?
            (~target-sym (vary-meta v# assoc :re-frame/source ~src-meta) ~@args)
            (~target-sym v# ~@args))))))

(defmacro dispatch
  "Like `re-frame.core/dispatch` but in DEBUG builds attaches
   `{:file :line}` on the event vector as `:re-frame/source`
   metadata. Production CLJS builds (`goog.DEBUG=false`) emit a bare
   `re-frame.core/dispatch` call after Closure DCE — no `if`, no
   `vary-meta`, no allocation.

   Read inside handlers via `(:re-frame/source (meta event))` or via
   the existing trace's `:event` tag.

   The macro uses standard `vary-meta` so any user-supplied event
   metadata survives the merge.

   See also: `dispatch-sync` and `subscribe` in this namespace for
   the other DEBUG source-meta call-site macros."
  {:arglists '([event-v])}
  [event-v]
  (-source-meta-call 're-frame.core/dispatch event-v &form &env))

(defmacro dispatch-sync
  "Like `re-frame.core/dispatch-sync` but attaches call-site source
   meta in DEBUG builds. See `dispatch` for the rationale and DCE
   behaviour.

   See also: `dispatch` and `subscribe` in this namespace for the
   other DEBUG source-meta call-site macros."
  {:arglists '([event-v])}
  [event-v]
  (-source-meta-call 're-frame.core/dispatch-sync event-v &form &env))

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
   without any new emission).

   Supports the same arities as `re-frame.core/subscribe`, including
   the historical `[query-v dynv]` form. Source metadata is attached
   to `query-v`; `dynv` is passed through unchanged.

   See also: `dispatch` and `dispatch-sync` in this namespace for the
   event-dispatch source-meta call-site macros."
  {:arglists '([query-v] [query-v dynv])}
  ([query-v]
   (-source-meta-call 're-frame.core/subscribe query-v &form &env))
  ([query-v dynv]
   (-source-meta-call 're-frame.core/subscribe query-v &form &env dynv)))

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
;;
;; The three reg-event-XX macros share their expansion shape — only
;; the target symbol and the trailing arguments differ — so
;; `-reg-event-call` builds the form once and the public macros are
;; 1-line delegates per arity. `reg-sub` and `reg-fx` keep their own
;; bodies because their handler-kind tag (`:sub` / `:fx`) and call
;; shape differ from the event family.

#?(:clj
(defn- -reg-event-call
  "Emit the macroexpansion form for a reg-event-XX macro that captures
   call-site source metadata on the registered interceptor chain in
   DEBUG builds. `target-sym` is the fully-qualified
   `re-frame.core/reg-event-XX` symbol; `id` is the registration id;
   `args` is the vector of trailing user-supplied args to splice into
   the call (handler, or interceptors + handler). `form` / `env` are
   the calling macro's `&form` / `&env`."
  [target-sym id args form env]
  (let [src-meta (-source-meta form env)]
    `(if re-frame.interop/debug-enabled?
       (let [r# (~target-sym ~id ~@args)]
         (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
         r#)
       (~target-sym ~id ~@args)))))

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
   (-reg-event-call 're-frame.core/reg-event-db id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.core/reg-event-db id [interceptors handler] &form &env)))

(defmacro reg-event-fx
  "Like `re-frame.core/reg-event-fx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])}
  ([id handler]
   (-reg-event-call 're-frame.core/reg-event-fx id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.core/reg-event-fx id [interceptors handler] &form &env)))

(defmacro reg-event-ctx
  "Like `re-frame.core/reg-event-ctx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])}
  ([id handler]
   (-reg-event-call 're-frame.core/reg-event-ctx id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.core/reg-event-ctx id [interceptors handler] &form &env)))

(defmacro reg-sub
  "Like `re-frame.core/reg-sub` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered subscription
   handler so `(meta (re-frame.registrar/get-handler :sub query-id))`
   returns the call-site location. Production CLJS builds emit a
   bare `re-frame.core/reg-sub` call after Closure DCE.

   Variadic — supports the same `:<-` / `:->` / `:=>` sugar pairs as
   `re-frame.core/reg-sub`. Macro, so `(apply reg-sub ...)` won't
   compile; use `re-frame.core/reg-sub` for that.

   See also: `reg-event-db` and `reg-fx` in this namespace for the
   sibling registration source-meta macros."
  {:arglists '([query-id & args])}
  [query-id & args]
  (let [src-meta (-source-meta &form &env)]
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
   `re-frame.core/reg-fx` call after Closure DCE.

   See also: `reg-event-db` and `reg-sub` in this namespace for the
   sibling registration source-meta macros."
  {:arglists '([id handler])}
  [id handler]
  (let [src-meta (-source-meta &form &env)]
    `(if re-frame.interop/debug-enabled?
       (let [r# (re-frame.core/reg-fx ~id ~handler)]
         (re-frame.registrar/-decorate-handler-meta! :fx ~id ~src-meta)
         r#)
       (re-frame.core/reg-fx ~id ~handler))))
