(ns re-frame.tooling
  "Discoverability namespace for re-frame tooling consumers
   (re-frame-pair, re-frame-10x, debux, AI agents, observability).

   This namespace re-exports — without renaming or moving — the
   symbols tooling code reaches for when it needs to introspect or
   hook into re-frame's runtime: the dispatch override entrypoints,
   the trace callback and schema-validation API, the live subscription
   cache, and the registrar atom. Consumers can require ONE namespace
   and discover the supported tooling surface, instead of grepping
   across `re-frame.core` / `re-frame.trace` / `re-frame.subs` /
   `re-frame.registrar`.

   STABILITY CONTRACT
   ==================
   This is the supported surface for tooling. Every symbol here is a
   commitment to keep that name + shape stable across re-frame
   releases — within the same compatibility guarantees the source-of-
   truth namespace already gives. Source-of-truth definitions stay in
   their original namespaces; this is the discoverability INDEX, not
   a redirect or shim. Internal callers should keep referencing the
   source-of-truth namespaces directly. Adding a symbol here is a
   public-API commitment: do not add a re-export until the underlying
   symbol's contract is itself public/stable.

   USAGE
   =====

       (require '[re-frame.tooling :as rft])

       (rft/dispatch-with [:my-event] {:effect-id (fn [_] ...)})
       (rft/register-trace-cb :my-tooling (fn [traces] ...))
       @rft/query->reaction               ;; live subscription cache
       @rft/kind->id->handler             ;; registrar atom"
  (:require
   [re-frame.core      :as core]
   [re-frame.registrar :as registrar]
   [re-frame.subs      :as subs]
   [re-frame.trace     :as trace]))

(def dispatch-with        core/dispatch-with)
(def dispatch-sync-with   core/dispatch-sync-with)
(def dispatch-and-settle  core/dispatch-and-settle)
(def query-v-for-reaction core/query-v-for-reaction)
(def live-query-vs        core/live-query-vs)
(def version              core/version)

(def tag-schema                 trace/tag-schema)
(def validate-trace?            trace/validate-trace?)
(def set-validate-trace!        trace/set-validate-trace!)
(def check-trace-against-schema trace/check-trace-against-schema)
(def register-trace-cb          trace/register-trace-cb)
(def remove-trace-cb            trace/remove-trace-cb)
(def register-epoch-cb          trace/register-epoch-cb)
(def remove-epoch-cb            trace/remove-epoch-cb)
(def assemble-epochs            trace/assemble-epochs)

(def query->reaction   subs/query->reaction)
(def kind->id->handler registrar/kind->id->handler)
