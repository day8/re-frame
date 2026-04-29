(ns re-frame.core-instrumented
  "A mirror of [`re-frame.core`](api-re-frame.core.md).

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
each symbol — this namespace mirrors its contract."
  #?(:cljs (:require-macros [re-frame.core-instrumented]
                             [re-frame.instrumented-macros :refer [defalias]]))
  #?(:clj  (:require [re-frame.instrumented-macros :refer [defalias]]))
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
   :api-docs/heading "Coeffects"}
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

;; `defalias` copies each target var's :doc and :arglists into the local
;; def's metadata so the generated api-re-frame.core-instrumented.md
;; page renders the same documentation as api-re-frame.core.md. Heading
;; tags mirror re-frame.core's groupings.

;; Dispatch / app-db plumbing not covered by source-meta macros above
(defalias add-post-event-callback    re-frame.core/add-post-event-callback    "Miscellaneous")
(defalias remove-post-event-callback re-frame.core/remove-post-event-callback "Miscellaneous")
(defalias make-restore-fn            re-frame.core/make-restore-fn            "Miscellaneous")
(defalias purge-event-queue          re-frame.core/purge-event-queue          "Miscellaneous")
(defalias enqueue                    re-frame.core/enqueue                    "Writing Interceptors")

;; Clear / unregister — sit with the kind they unregister.
(defalias clear-event               re-frame.core/clear-event                "Event Handlers")
(defalias clear-sub                 re-frame.core/clear-sub                  "Subscriptions")
(defalias clear-fx                  re-frame.core/clear-fx                   "Effect Handlers")
(defalias clear-cofx                re-frame.core/clear-cofx                 "Coeffects")
(defalias clear-subscription-cache! re-frame.core/clear-subscription-cache!  "Subscriptions")
(defalias clear-global-interceptor  re-frame.core/clear-global-interceptor   "Global Interceptors")

;; Sub-cache accessors (used by tooling)
(defalias query-v-for-reaction re-frame.core/query-v-for-reaction "Subscriptions")
(defalias live-query-vs        re-frame.core/live-query-vs        "Subscriptions")

;; Coeffect / effect map accessors
(defalias get-coeffect   re-frame.core/get-coeffect   "Writing Interceptors")
(defalias assoc-coeffect re-frame.core/assoc-coeffect "Writing Interceptors")
(defalias get-effect     re-frame.core/get-effect     "Writing Interceptors")
(defalias assoc-effect   re-frame.core/assoc-effect   "Writing Interceptors")

;; Interceptor builders + standard interceptors
(defalias ->interceptor re-frame.core/->interceptor "Writing Interceptors")
(defalias inject-cofx   re-frame.core/inject-cofx   "Coeffects")
(defalias path          re-frame.core/path          "Interceptors")
(defalias enrich        re-frame.core/enrich        "Interceptors")
(defalias after         re-frame.core/after         "Interceptors")
(defalias on-changes    re-frame.core/on-changes    "Interceptors")
(defalias debug         re-frame.core/debug         "Interceptors")
(defalias unwrap        re-frame.core/unwrap        "Interceptors")
(defalias trim-v        re-frame.core/trim-v        "Interceptors")

;; Global interceptors — registrar uses settings, not the kind/id
;; decoration mechanism, so this passes through as a fn rather than a
;; source-meta macro. clear-global-interceptor sits with the other
;; clear-* exports above.
(defalias reg-global-interceptor re-frame.core/reg-global-interceptor "Global Interceptors")

;; Logging
(defalias set-loggers! re-frame.core/set-loggers! "Logging")
(defalias console      re-frame.core/console      "Logging")

;; Trace contract
(defalias tag-schema          re-frame.core/tag-schema          "Tracing")
(defalias validate-trace?     re-frame.core/validate-trace?     "Tracing")
(defalias set-validate-trace! re-frame.core/set-validate-trace! "Tracing")
(defalias register-trace-cb   re-frame.core/register-trace-cb   "Tracing")
(defalias remove-trace-cb     re-frame.core/remove-trace-cb     "Tracing")
(defalias register-epoch-cb   re-frame.core/register-epoch-cb   "Tracing")
(defalias remove-epoch-cb     re-frame.core/remove-epoch-cb     "Tracing")
(defalias assemble-epochs     re-frame.core/assemble-epochs     "Tracing")

;; Diagnostics
(defalias version re-frame.core/version "Miscellaneous")

;; Deprecated legacy aliases — kept so the alias swap doesn't bite
;; codebases that still use them. Users will see re-frame.core's own
;; deprecation notices the same as if they imported them directly.
(defalias register-handler re-frame.core/register-handler "Deprecated")
(defalias register-sub     re-frame.core/register-sub     "Deprecated")
