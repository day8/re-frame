(ns re-frame.macros
  "Compile-time `dispatch` / `dispatch-sync` macros that capture the
   call-site `{:file :line}` and attach it to the event vector as
   `:re-frame/source` metadata — for 'why did this event fire?'
   diagnostics that don't depend on stack traces or source maps.

   Read inside handlers via `(:re-frame/source (meta event))`. Trace
   consumers (re-frame-10x, re-frame-pair, custom devtools) see the
   meta automatically because the `:event` trace tag IS the dispatched
   vector — `(-> trace :tags :event meta :re-frame/source)` works
   without any new emission machinery.

   In CLJS production builds (`goog.DEBUG=false`), the meta-wrapping
   branch is eliminated by Closure dead-code elimination: the macro
   reduces to a bare `re-frame.core/dispatch` call with zero
   allocation overhead. The runtime gate is the same one
   `re-frame.registrar` uses for its DCE-friendly debug warnings —
   `re-frame.interop/debug-enabled?`, aliased to `goog/DEBUG` under
   CLJS and hardcoded `true` under CLJ.

   Opt-in via `(:require [re-frame.macros :as rf.m])` — the namespace
   self-requires its macros so a CLJS `:require` is sufficient.

   Sibling pattern to `reg-event-*` source-meta capture in
   `re-frame.core` — same mechanism (`*file*` + `(:line (meta &form))`
   at expansion time), different surface."
  #?(:cljs (:require-macros [re-frame.macros])))

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
  (let [src-meta {:file *file* :line (:line (meta &form))}]
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
  (let [src-meta {:file *file* :line (:line (meta &form))}]
    `(if re-frame.interop/debug-enabled?
       (re-frame.core/dispatch-sync
         (vary-meta ~event-v assoc :re-frame/source ~src-meta))
       (re-frame.core/dispatch-sync ~event-v))))
