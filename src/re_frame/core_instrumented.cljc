(ns re-frame.core-instrumented
  "Opt-in mirror of `re-frame.core` that captures the call-site
   `{:file :line}` at macro-expansion time and attaches it as
   `:re-frame/source` metadata — for 'why did this event fire?' /
   'which view asked for this sub?' / 'where was this handler
   registered?' diagnostics that don't depend on stack traces or
   source maps.

   Also passes through every other public `re-frame.core` symbol so
   migration is alias-only:

       ;; function API — no source-meta
       (:require [re-frame.core   :as rf])

       ;; macro API — same call shape, source-meta on dispatches
       ;; and registrations, every other core symbol still resolves
       (:require [re-frame.core-instrumented :as rf])

   Source-meta capturing macros (a CLJS production build with
   `goog.DEBUG=false` Closure-DCEs each one to a bare
   `re-frame.core/...` call — zero allocation overhead):

   - dispatch, dispatch-sync, dispatch-with, dispatch-sync-with,
     dispatch-and-settle — `vary-meta` on the event vector
     (`(:re-frame/source (meta event))` in handlers).
   - subscribe — `vary-meta` on the query vector before lookup;
     recover via `(re-frame.subs/query-v-for-reaction r)`. Cache
     identity is unaffected (vector equality ignores meta).
   - reg-event-db / -fx / -ctx, reg-sub, reg-sub-raw, reg-fx,
     reg-cofx, reg-event-error-handler — meta is attached to the
     *registered* value, so
     `(meta (re-frame.registrar/get-handler kind id))` returns
     `{:file :line}`. The mechanics live in
     `re-frame.registrar/-decorate-handler-meta!`.

   Trace consumers (re-frame-10x, re-frame-pair, custom devtools)
   see the dispatch/subscribe meta automatically because the
   `:event` and `:query-v` / `:input-query-vs` trace tags ARE the
   dispatched / subscribed vectors — `(-> trace :tags :event meta
   :re-frame/source)` works without any new emission machinery.

   Every other public `re-frame.core` symbol (interceptor builders,
   clear-* fns, trace-cb registration, app-db utilities, etc.) is
   re-exported here as a `def` so the alias swap covers a real-world
   re-frame app — the rest of the surface doesn't need source-meta
   so it passes through unchanged.

   Macros cannot be used in value position. If you need
   `(map reg-event-db ...)` / `(apply reg-sub ...)` / `(partial
   reg-fx ...)`, keep using `re-frame.core` — it remains the
   higher-order-safe surface. The `def` re-exports CAN be used in
   value position (they're vars holding the same fn value as
   `re-frame.core/...`)."
  #?(:cljs (:require-macros [re-frame.core-instrumented]))
  (:require [re-frame.core]
            [re-frame.interop]
            [re-frame.registrar]))

;; -- shared expansion helpers ------------------------------------------------

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
      through unchanged after that first value."
     [target-sym v form env & args]
     (let [src-meta (-source-meta form env)]
       `(let [v# ~v]
          (if re-frame.interop/debug-enabled?
            (~target-sym (vary-meta v# assoc :re-frame/source ~src-meta) ~@args)
            (~target-sym v# ~@args))))))

#?(:clj
   (defn- -reg-event-call
     "Emit the macroexpansion form for a reg-event-XX macro that
      captures call-site source metadata on the registered interceptor
      chain in DEBUG builds. `target-sym` is the fully-qualified
      `re-frame.core/reg-event-XX` symbol; `id` is the registration id;
      `args` is the vector of trailing user-supplied args to splice
      into the call."
     [target-sym id args form env]
     (let [src-meta (-source-meta form env)]
       `(if re-frame.interop/debug-enabled?
          (let [r# (~target-sym ~id ~@args)]
            (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
            r#)
          (~target-sym ~id ~@args)))))

#?(:clj
   (defn- -reg-decorated-call
     "Generic macro expansion for any reg-* fn whose decoration target
      is `(kind id)` in the registrar. Used by reg-sub-raw (`:sub`),
      reg-cofx (`:cofx`), and reg-event-error-handler (`:error`,
      `:event-handler`)."
     [target-sym kind id args form env]
     (let [src-meta (-source-meta form env)]
       `(if re-frame.interop/debug-enabled?
          (let [r# (~target-sym ~@args)]
            (re-frame.registrar/-decorate-handler-meta! ~kind ~id ~src-meta)
            r#)
          (~target-sym ~@args)))))

;; -- dispatch / dispatch-sync / dispatch-with / dispatch-sync-with -----------
;; -- dispatch-and-settle / subscribe -----------------------------------------

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
  {:arglists '([event-v])
   :api-docs/heading "Dispatching Events"}
  [event-v]
  (-source-meta-call 're-frame.core/dispatch event-v &form &env))

(defmacro dispatch-sync
  "Like `re-frame.core/dispatch-sync` but attaches call-site source
   meta in DEBUG builds. See `dispatch` for the rationale and DCE
   behaviour."
  {:arglists '([event-v])
   :api-docs/heading "Dispatching Events"}
  [event-v]
  (-source-meta-call 're-frame.core/dispatch-sync event-v &form &env))

(defmacro dispatch-with
  "Like `re-frame.core/dispatch-with` but attaches call-site source
   meta on the event vector in DEBUG builds. See `dispatch` for the
   rationale and DCE behaviour. `overrides` is passed through
   unchanged."
  {:arglists '([event-v overrides])
   :api-docs/heading "Dispatching Events"}
  [event-v overrides]
  (-source-meta-call 're-frame.core/dispatch-with event-v &form &env overrides))

(defmacro dispatch-sync-with
  "Like `re-frame.core/dispatch-sync-with` but attaches call-site
   source meta on the event vector in DEBUG builds. See `dispatch`
   for the rationale and DCE behaviour. `overrides` is passed through
   unchanged."
  {:arglists '([event-v overrides])
   :api-docs/heading "Dispatching Events"}
  [event-v overrides]
  (-source-meta-call 're-frame.core/dispatch-sync-with event-v &form &env overrides))

(defmacro dispatch-and-settle
  "Like `re-frame.core/dispatch-and-settle` but attaches call-site
   source meta on the event vector in DEBUG builds. See `dispatch`
   for the rationale and DCE behaviour. `opts` is passed through
   unchanged."
  {:arglists '([event-v] [event-v opts])
   :api-docs/heading "Dispatching Events"}
  ([event-v]
   (-source-meta-call 're-frame.core/dispatch-and-settle event-v &form &env))
  ([event-v opts]
   (-source-meta-call 're-frame.core/dispatch-and-settle event-v &form &env opts)))

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
   `:sub/run` traces.

   Supports the same arities as `re-frame.core/subscribe`, including
   the historical `[query-v dynv]` form. Source metadata is attached
   to `query-v`; `dynv` is passed through unchanged."
  {:arglists '([query-v] [query-v dynv])
   :api-docs/heading "Subscriptions"}
  ([query-v]
   (-source-meta-call 're-frame.core/subscribe query-v &form &env))
  ([query-v dynv]
   (-source-meta-call 're-frame.core/subscribe query-v &form &env dynv)))

;; -- registration macros (event / sub / fx / cofx / error) -------------------

(defmacro reg-event-db
  "Like `re-frame.core/reg-event-db` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered interceptor chain so
   `(meta (re-frame.registrar/get-handler :event id))` returns the
   call-site location. Production CLJS builds (`goog.DEBUG=false`)
   emit a bare `re-frame.core/reg-event-db` call after Closure DCE.

   Macro — cannot be used in value position. For
   `(map reg-event-db ...)` or `(apply reg-event-db ...)` use
   `re-frame.core/reg-event-db` instead."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Event Handlers"}
  ([id handler]
   (-reg-event-call 're-frame.core/reg-event-db id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.core/reg-event-db id [interceptors handler] &form &env)))

(defmacro reg-event-fx
  "Like `re-frame.core/reg-event-fx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Event Handlers"}
  ([id handler]
   (-reg-event-call 're-frame.core/reg-event-fx id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.core/reg-event-fx id [interceptors handler] &form &env)))

(defmacro reg-event-ctx
  "Like `re-frame.core/reg-event-ctx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds. See
   `reg-event-db` for the rationale and DCE behaviour."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Event Handlers"}
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
   compile; use `re-frame.core/reg-sub` for that."
  {:arglists '([query-id & args])
   :api-docs/heading "Subscriptions"}
  [query-id & args]
  (-reg-decorated-call 're-frame.core/reg-sub :sub query-id (cons query-id args) &form &env))

(defmacro reg-sub-raw
  "Like `re-frame.core/reg-sub-raw` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered subscription
   handler. Source-meta is decorated under the same `:sub` kind as
   `reg-sub`, so existing tooling reads it the same way."
  {:arglists '([query-id handler-fn])
   :api-docs/heading "Subscriptions"}
  [query-id handler-fn]
  (-reg-decorated-call 're-frame.core/reg-sub-raw :sub query-id [query-id handler-fn] &form &env))

(defmacro reg-fx
  "Like `re-frame.core/reg-fx` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered effect handler so
   `(meta (re-frame.registrar/get-handler :fx id))` returns the
   call-site location. Production CLJS builds emit a bare
   `re-frame.core/reg-fx` call after Closure DCE."
  {:arglists '([id handler])
   :api-docs/heading "Effect Handlers"}
  [id handler]
  (-reg-decorated-call 're-frame.core/reg-fx :fx id [id handler] &form &env))

(defmacro reg-cofx
  "Like `re-frame.core/reg-cofx` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered coeffect handler so
   `(meta (re-frame.registrar/get-handler :cofx id))` returns the
   call-site location. Production CLJS builds emit a bare
   `re-frame.core/reg-cofx` call after Closure DCE."
  {:arglists '([id handler])
   :api-docs/heading "Coeffect Handlers"}
  [id handler]
  (-reg-decorated-call 're-frame.core/reg-cofx :cofx id [id handler] &form &env))

(defmacro reg-event-error-handler
  "Like `re-frame.core/reg-event-error-handler` but in DEBUG builds
   attaches `{:file :line}` as metadata on the registered handler so
   `(meta (re-frame.registrar/get-handler :error :event-handler))`
   returns the call-site location. Production CLJS builds emit a bare
   `re-frame.core/reg-event-error-handler` call after Closure DCE.

   The error handler is registered under the fixed registrar entry
   `[:error :event-handler]` (only one error handler is supported
   re-frame-wide); the macro mirrors that contract."
  {:arglists '([handler])
   :api-docs/heading "Event Handlers"}
  [handler]
  (-reg-decorated-call 're-frame.core/reg-event-error-handler :error :event-handler [handler] &form &env))

;; -- pure passthroughs (no source-meta needed) -------------------------------
;;
;; Every other public re-frame.core symbol is re-exported here as a `def`
;; so the alias swap from re-frame.core → re-frame.core-instrumented covers a
;; real-world re-frame app. These have no user-handler bodies to capture
;; (they're either bookkeeping fns, interceptor-builders whose results
;; flow through reg-event-* macros that DO capture, or config-style
;; vals). Defs preserve value-position usage —
;; `(map clear-event ...)` / `(swap! foo update :int conj path)` work
;; against the re-export the same as against the original.

;; Dispatch / app-db plumbing not covered by source-meta macros above
(def add-post-event-callback re-frame.core/add-post-event-callback)
(def remove-post-event-callback re-frame.core/remove-post-event-callback)
(def make-restore-fn re-frame.core/make-restore-fn)
(def purge-event-queue re-frame.core/purge-event-queue)
(def enqueue re-frame.core/enqueue)

;; Clear / unregister
(def clear-event re-frame.core/clear-event)
(def clear-sub re-frame.core/clear-sub)
(def clear-fx re-frame.core/clear-fx)
(def clear-cofx re-frame.core/clear-cofx)
(def clear-subscription-cache! re-frame.core/clear-subscription-cache!)
(def clear-global-interceptor re-frame.core/clear-global-interceptor)

;; Sub-cache accessors (used by tooling)
(def query-v-for-reaction re-frame.core/query-v-for-reaction)
(def live-query-vs re-frame.core/live-query-vs)

;; Coeffect / effect map accessors
(def get-coeffect re-frame.core/get-coeffect)
(def assoc-coeffect re-frame.core/assoc-coeffect)
(def get-effect re-frame.core/get-effect)
(def assoc-effect re-frame.core/assoc-effect)

;; Interceptor builders + standard interceptors
(def ->interceptor re-frame.core/->interceptor)
(def inject-cofx re-frame.core/inject-cofx)
(def path re-frame.core/path)
(def enrich re-frame.core/enrich)
(def after re-frame.core/after)
(def on-changes re-frame.core/on-changes)
(def debug re-frame.core/debug)
(def unwrap re-frame.core/unwrap)
(def trim-v re-frame.core/trim-v)

;; Global interceptors — registrar uses settings, not the kind/id
;; decoration mechanism, so this passes through as a fn rather than a
;; source-meta macro. clear-global-interceptor sits with the other
;; clear-* exports above.
(def reg-global-interceptor re-frame.core/reg-global-interceptor)

;; Logging
(def set-loggers! re-frame.core/set-loggers!)
(def console re-frame.core/console)

;; Trace contract
(def tag-schema re-frame.core/tag-schema)
(def validate-trace? re-frame.core/validate-trace?)
(def set-validate-trace! re-frame.core/set-validate-trace!)
(def register-trace-cb re-frame.core/register-trace-cb)
(def remove-trace-cb re-frame.core/remove-trace-cb)
(def register-epoch-cb re-frame.core/register-epoch-cb)
(def remove-epoch-cb re-frame.core/remove-epoch-cb)
(def assemble-epochs re-frame.core/assemble-epochs)

;; Diagnostics
(def version re-frame.core/version)

;; Deprecated legacy aliases — kept so the alias swap doesn't bite
;; codebases that still use them. Users will see re-frame.core's own
;; deprecation notices the same as if they imported them directly.
(def register-handler re-frame.core/register-handler)
(def register-sub re-frame.core/register-sub)
