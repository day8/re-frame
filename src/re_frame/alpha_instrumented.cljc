(ns re-frame.alpha-instrumented
  "A mirror of [`re-frame.alpha`](api-re-frame.alpha.md).

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
API stabilises."
  #?(:cljs (:require-macros [re-frame.alpha-instrumented]))
  (:require [re-frame.alpha]
            [re-frame.interop]
            [re-frame.registrar]))

;; -- shared expansion helpers ------------------------------------------------
;;
;; Same shape as `re-frame.core-instrumented` — kept self-contained here so
;; alpha-instrumented stays loadable without core-instrumented. The two
;; namespaces deliberately don't share a private helper ns (one might evolve
;; in a way that affects the other if they did).

#?(:clj
   (defn- -source-meta
     [form env]
     (let [form-meta (meta form)]
       {:file (or (:file form-meta) (:file env) *file*)
        :line (:line form-meta)})))

#?(:clj
   (defn- -source-meta-call
     "Like `re-frame.core-instrumented/-source-meta-call` but emits a
      call to a `re-frame.alpha/...` symbol."
     [target-sym v form env & args]
     (let [src-meta (-source-meta form env)]
       `(let [v# ~v]
          (if re-frame.interop/debug-enabled?
            (~target-sym (vary-meta v# assoc :re-frame/source ~src-meta) ~@args)
            (~target-sym v# ~@args))))))

#?(:clj
   (defn- -reg-event-call
     [target-sym id args form env]
     (let [src-meta (-source-meta form env)]
       `(if re-frame.interop/debug-enabled?
          (let [r# (~target-sym ~id ~@args)]
            (re-frame.registrar/-decorate-handler-meta! :event ~id ~src-meta)
            r#)
          (~target-sym ~id ~@args)))))

#?(:clj
   (defn- -reg-decorated-call
     [target-sym kind id args form env]
     (let [src-meta (-source-meta form env)]
       `(if re-frame.interop/debug-enabled?
          (let [r# (~target-sym ~@args)]
            (re-frame.registrar/-decorate-handler-meta! ~kind ~id ~src-meta)
            r#)
          (~target-sym ~@args)))))

;; -- dispatch / subscribe ----------------------------------------------------

(defmacro dispatch
  "Like `re-frame.alpha/dispatch` but in DEBUG builds attaches
   `{:file :line}` on the event vector as `:re-frame/source`
   metadata. Production CLJS builds (`goog.DEBUG=false`) emit a bare
   `re-frame.alpha/dispatch` call after Closure DCE."
  {:arglists '([event-v])
   :api-docs/heading "Dispatching Events"}
  [event-v]
  (-source-meta-call 're-frame.alpha/dispatch event-v &form &env))

(defmacro dispatch-sync
  "Like `re-frame.alpha/dispatch-sync` but attaches call-site source
   meta in DEBUG builds. See `dispatch` for the rationale and DCE
   behaviour."
  {:arglists '([event-v])
   :api-docs/heading "Dispatching Events"}
  [event-v]
  (-source-meta-call 're-frame.alpha/dispatch-sync event-v &form &env))

(defmacro dispatch-with
  "Like `re-frame.alpha/dispatch-with` but attaches call-site source
   meta on the event vector in DEBUG builds. `overrides` is passed
   through unchanged."
  {:arglists '([event-v overrides])
   :api-docs/heading "Dispatching Events"}
  [event-v overrides]
  (-source-meta-call 're-frame.alpha/dispatch-with event-v &form &env overrides))

(defmacro dispatch-sync-with
  "Like `re-frame.alpha/dispatch-sync-with` but attaches call-site
   source meta on the event vector in DEBUG builds. `overrides` is
   passed through unchanged."
  {:arglists '([event-v overrides])
   :api-docs/heading "Dispatching Events"}
  [event-v overrides]
  (-source-meta-call 're-frame.alpha/dispatch-sync-with event-v &form &env overrides))

(defmacro dispatch-and-settle
  "Like `re-frame.alpha/dispatch-and-settle` but attaches call-site
   source meta on the event vector in DEBUG builds. `opts` is passed
   through unchanged."
  {:arglists '([event-v] [event-v opts])
   :api-docs/heading "Dispatching Events"}
  ([event-v]
   (-source-meta-call 're-frame.alpha/dispatch-and-settle event-v &form &env))
  ([event-v opts]
   (-source-meta-call 're-frame.alpha/dispatch-and-settle event-v &form &env opts)))

(defmacro subscribe
  "Like `re-frame.alpha/subscribe` but in DEBUG builds attaches
   `{:file :line}` on the query vector as `:re-frame/source`
   metadata before lookup. Production CLJS builds emit a bare
   `re-frame.alpha/subscribe` call after Closure DCE.

   Cache identity is unaffected: vector and map equality in CLJ/CLJS
   ignore metadata.

   Supports the same arities as `re-frame.alpha/subscribe`, including
   the historical `[query-v dynv]` form. Source metadata is attached
   to `query-v`; `dynv` is passed through unchanged."
  {:arglists '([query-v] [query-v dynv])
   :api-docs/heading "Legacy Compatibility"}
  ([query-v]
   (-source-meta-call 're-frame.alpha/subscribe query-v &form &env))
  ([query-v dynv]
   (-source-meta-call 're-frame.alpha/subscribe query-v &form &env dynv)))

;; -- registration macros (event / sub / fx / cofx / error) -------------------

(defmacro reg-event-db
  "Like `re-frame.alpha/reg-event-db` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered interceptor chain."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Legacy Compatibility"}
  ([id handler]
   (-reg-event-call 're-frame.alpha/reg-event-db id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.alpha/reg-event-db id [interceptors handler] &form &env)))

(defmacro reg-event-fx
  "Like `re-frame.alpha/reg-event-fx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Legacy Compatibility"}
  ([id handler]
   (-reg-event-call 're-frame.alpha/reg-event-fx id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.alpha/reg-event-fx id [interceptors handler] &form &env)))

(defmacro reg-event-ctx
  "Like `re-frame.alpha/reg-event-ctx` but attaches call-site source
   meta on the registered interceptor chain in DEBUG builds."
  {:arglists '([id handler] [id interceptors handler])
   :api-docs/heading "Legacy Compatibility"}
  ([id handler]
   (-reg-event-call 're-frame.alpha/reg-event-ctx id [handler] &form &env))
  ([id interceptors handler]
   (-reg-event-call 're-frame.alpha/reg-event-ctx id [interceptors handler] &form &env)))

(defmacro reg-sub
  "Like `re-frame.alpha/reg-sub` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered subscription
   handler. Variadic — supports the same `:<-` / `:->` / `:=>` sugar
   as `re-frame.alpha/reg-sub`."
  {:arglists '([query-id & args])
   :api-docs/heading "Legacy Compatibility"}
  [query-id & args]
  (-reg-decorated-call 're-frame.alpha/reg-sub :sub query-id (cons query-id args) &form &env))

(defmacro reg-sub-raw
  "Like `re-frame.alpha/reg-sub-raw` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered subscription
   handler. Source-meta is decorated under the same `:sub` kind as
   `reg-sub`, so existing tooling reads it the same way."
  {:arglists '([query-id handler-fn])
   :api-docs/heading "Legacy Compatibility"}
  [query-id handler-fn]
  (-reg-decorated-call 're-frame.alpha/reg-sub-raw :sub query-id [query-id handler-fn] &form &env))

(defmacro reg-fx
  "Like `re-frame.alpha/reg-fx` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered effect handler."
  {:arglists '([id handler])
   :api-docs/heading "Legacy Compatibility"}
  [id handler]
  (-reg-decorated-call 're-frame.alpha/reg-fx :fx id [id handler] &form &env))

(defmacro reg-cofx
  "Like `re-frame.alpha/reg-cofx` but in DEBUG builds attaches
   `{:file :line}` as metadata on the registered coeffect handler."
  {:arglists '([id handler])
   :api-docs/heading "Legacy Compatibility"}
  [id handler]
  (-reg-decorated-call 're-frame.alpha/reg-cofx :cofx id [id handler] &form &env))

(defmacro reg-event-error-handler
  "Like `re-frame.alpha/reg-event-error-handler` but in DEBUG builds
   attaches `{:file :line}` as metadata on the registered handler.
   Decorates under the fixed `[:error :event-handler]` registrar
   entry — only one error handler is supported re-frame-wide."
  {:arglists '([handler])
   :api-docs/heading "Legacy Compatibility"}
  [handler]
  (-reg-decorated-call 're-frame.alpha/reg-event-error-handler :error :event-handler [handler] &form &env))

;; -- pure passthroughs -------------------------------------------------------
;;
;; Every other public re-frame.alpha symbol is re-exported here as a `def`
;; so the alias swap from re-frame.alpha → re-frame.alpha-instrumented covers
;; a real-world re-frame app.
;;
;; The :api-docs/heading metadata mirrors re-frame.alpha so the generated
;; api-re-frame.alpha-instrumented.md groups vars under the same sections
;; as api-re-frame.alpha.md. Legacy core-mirror passthroughs are tagged
;; :api-docs/hide to match alpha's curation — users who want the full
;; legacy surface should reach for re-frame.core-instrumented.

;; Alpha-specific (instrumentation deferred — see ns docstring)
(def ^{:api-docs/heading "Registration"} reg        re-frame.alpha/reg)
(def ^{:api-docs/heading "Subscription"} sub        re-frame.alpha/sub)
(def ^{:api-docs/heading "Flows"}        reg-flow   re-frame.alpha/reg-flow)
(def ^{:api-docs/heading "Flows"}        clear-flow re-frame.alpha/clear-flow)
(def ^{:api-docs/heading "Flows"}        get-flow   re-frame.alpha/get-flow)
(def ^{:api-docs/heading "Flows"}        flow<-     re-frame.alpha/flow<-)

;; Legacy core-mirror passthroughs — hidden to match re-frame.alpha's
;; curation. The alpha API is a curated alternative to core; users who
;; need the full legacy surface should reach for re-frame.core-instrumented.
(def ^:api-docs/hide add-post-event-callback    re-frame.alpha/add-post-event-callback)
(def ^:api-docs/hide remove-post-event-callback re-frame.alpha/remove-post-event-callback)
(def ^:api-docs/hide make-restore-fn            re-frame.alpha/make-restore-fn)
(def ^:api-docs/hide purge-event-queue          re-frame.alpha/purge-event-queue)
(def ^:api-docs/hide enqueue                    re-frame.alpha/enqueue)
(def ^:api-docs/hide clear-event                re-frame.alpha/clear-event)
(def ^:api-docs/hide clear-sub                  re-frame.alpha/clear-sub)
(def ^:api-docs/hide clear-fx                   re-frame.alpha/clear-fx)
(def ^:api-docs/hide clear-cofx                 re-frame.alpha/clear-cofx)
(def ^:api-docs/hide clear-subscription-cache!  re-frame.alpha/clear-subscription-cache!)
(def ^:api-docs/hide clear-global-interceptor   re-frame.alpha/clear-global-interceptor)
(def ^:api-docs/hide query-v-for-reaction       re-frame.alpha/query-v-for-reaction)
(def ^:api-docs/hide live-query-vs              re-frame.alpha/live-query-vs)
(def ^:api-docs/hide get-coeffect               re-frame.alpha/get-coeffect)
(def ^:api-docs/hide assoc-coeffect             re-frame.alpha/assoc-coeffect)
(def ^:api-docs/hide get-effect                 re-frame.alpha/get-effect)
(def ^:api-docs/hide assoc-effect               re-frame.alpha/assoc-effect)
(def ^:api-docs/hide ->interceptor              re-frame.alpha/->interceptor)
(def ^:api-docs/hide inject-cofx                re-frame.alpha/inject-cofx)
(def ^:api-docs/hide path                       re-frame.alpha/path)
(def ^:api-docs/hide enrich                     re-frame.alpha/enrich)
(def ^:api-docs/hide after                      re-frame.alpha/after)
(def ^:api-docs/hide on-changes                 re-frame.alpha/on-changes)
(def ^:api-docs/hide debug                      re-frame.alpha/debug)
(def ^:api-docs/hide unwrap                     re-frame.alpha/unwrap)
(def ^:api-docs/hide trim-v                     re-frame.alpha/trim-v)
(def ^:api-docs/hide reg-global-interceptor     re-frame.alpha/reg-global-interceptor)
(def ^:api-docs/hide set-loggers!               re-frame.alpha/set-loggers!)
(def ^:api-docs/hide console                    re-frame.alpha/console)
(def ^:api-docs/hide version                    re-frame.alpha/version)
(def ^:api-docs/hide register-handler           re-frame.alpha/register-handler)
(def ^:api-docs/hide register-sub               re-frame.alpha/register-sub)
