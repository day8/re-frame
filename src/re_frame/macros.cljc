(ns re-frame.macros
  "Compile-time `dispatch` / `dispatch-sync` / `subscribe` macros that
   capture the call-site `{:file :line}` and attach it as
   `:re-frame/source` metadata on the event-vector or query-vector
   — for 'why did this event fire?' / 'which view asked for this
   sub?' diagnostics that don't depend on stack traces or source
   maps.

   Read inside event handlers via `(:re-frame/source (meta event))`.
   For subscriptions, recover the meta'd query-v via
   `(re-frame.subs/query-v-for-reaction r)` and read its meta. Trace
   consumers (re-frame-10x, re-frame-pair, custom devtools) see the
   meta automatically because the `:event` and `:query-v` /
   `:input-query-vs` trace tags ARE the dispatched / subscribed
   vectors — `(-> trace :tags :event meta :re-frame/source)` works
   without any new emission machinery.

   In CLJS production builds (`goog.DEBUG=false`), the meta-wrapping
   branch is eliminated by Closure dead-code elimination: the macro
   reduces to a bare `re-frame.core/dispatch` (or `subscribe`) call
   with zero allocation overhead. The runtime gate is the same one
   `re-frame.registrar` uses for its DCE-friendly debug warnings —
   `re-frame.interop/debug-enabled?`, aliased to `goog/DEBUG` under
   CLJS and hardcoded `true` under CLJ.

   Opt-in via `(:require [re-frame.macros :as rf.m])` — the namespace
   self-requires its macros so a CLJS `:require` is sufficient, and
   transitively pulls in `re-frame.core` / `re-frame.interop` so the
   fully-qualified symbols emitted by the macro expansions resolve
   without the user needing to require those namespaces themselves.

   Sibling pattern to `reg-event-*` source-meta capture in
   `re-frame.core` — same mechanism (`(:file &env)` with `*file*`
   fallback, plus `(:line (meta &form))` at expansion time), different
   surface."
  #?(:cljs (:require-macros [re-frame.macros]))
  (:require [re-frame.core]
            [re-frame.interop]))

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
