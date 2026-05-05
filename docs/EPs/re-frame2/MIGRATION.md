# re-frame → re-frame2 Migration (AI Agent Prompt)

> Status: Living document. Updated as re-frame2 design decisions are finalised. Last review: 2026-05-05 (added M-3, M-4, M-5, M-6; O-5; O-6; O-7; demoted M-2 → O-6; added "What stays the same" section; extended M-4 to note dispatch-and-settle survives; verification checklist updated; noted `:dispatch-n` deprecation).
>
> This document is structured as a prompt for an AI agent performing a re-frame → re-frame2 migration on an existing codebase. Sections are written in second person to the agent. Maintainers: when a re-frame2 design decision introduces, removes, or alters a migration rule, edit this document in the same change.

---

## Your task

You are migrating a ClojureScript codebase from re-frame v1.x to **re-frame2**. The headline expectation is that **most codebases require no changes at all** — re-frame2 is designed for maximum backwards compatibility. Your job is to:

1. **Verify the codebase compiles and runs against re-frame2 with the dependency bumped and nothing else changed.** This is the success path for the majority of projects.
2. **If compilation or runtime failures occur, identify which migration rule below applies, apply it, and re-verify.**
3. **Optionally, if the user has asked you to also modernise the codebase, apply the opt-in upgrades in the "Opt-in modernisation" section.** Do not do this unless asked.
4. **Report back** — succinctly summarise what changed, why, and what still needs attention.

You should **not** make stylistic or organisational changes the user did not ask for. Your goal is the smallest correct diff.

---

## Context: re-frame2 in one paragraph

re-frame2 keeps the public API of `re-frame.core` working for the vast majority of code, with migration cost held to a **small, well-defined set of breakages** documented in this file. New features (rich registration metadata, frames for multi-instance, `reg-view`, Malli schemas, etc.) are *additive opt-ins* that existing code is not required to adopt.

The required migrations below cover five cases — M-1, M-3, M-4, M-5, M-6 (M-2 has been demoted to opt-in O-6). The rest of the public API surface (`reg-event-db`/`reg-event-fx`/`reg-sub`/`reg-fx`/`reg-cofx`/`dispatch`/`subscribe`/`dispatch-sync` and their handler signatures) is preserved — see the "What stays the same" section below for the explicit non-breakage list. Every dispatch and subscription that doesn't specify a frame routes to a default frame named `:re-frame/default`; today's re-frame is structurally "re-frame2 with only the default frame in play." The full design rationale is in [000-Vision.md](000-Vision.md); the multi-frame mechanism is in [002-Frames.md](002-Frames.md).

---

## Migration classification

Each rule below is tagged **Type A** or **Type B**. The two categories tell the agent how to handle each rule:

- **Type A — fully mechanical.** The pattern is unambiguous, the rewrite is structural, and the result observably behaves identically. The agent applies the change without asking.
- **Type B — semantic flag.** The pattern is detectable but the rewrite requires understanding intent (timing-sensitive code; dynamic call sites; behaviour-change-with-edge-cases). The agent identifies every affected call site, explains the risk, and asks the user to decide before applying.

When a single rule has both Type A and Type B aspects (e.g., M-5: `apply` is mechanical, Var-aliasing depends on dynamic use), the rule documents both — apply the Type A part automatically; flag the Type B part.

The rules are listed in order of likelihood. Apply them in order; later rules may depend on earlier ones being resolved.

## Required migration rules

These are the changes you **must** apply if the codebase trips them.

### M-1. Private namespace access — `re-frame.db`, `re-frame.router`, `re-frame.subs`, `re-frame.events`, `re-frame.registrar`

**Type A** (mechanical).

re-frame2's compatibility commitment covers `re-frame.core` only. Internal namespaces are off-contract and are very likely to have moved or changed shape (the global `app-db` now lives inside the default frame's record; the registrar may have a different shape; the router state is per-frame).

**What to look for** in the codebase:

```clojure
(:require [re-frame.db :as db])              ;; or re-frame.db :refer [app-db]
(:require [re-frame.router :as router])
(:require [re-frame.subs :as subs])
(:require [re-frame.events :as events])
(:require [re-frame.registrar :as reg])
```

…and any usage of the symbols imported.

**What to do:**

| Old usage | Replace with |
|---|---|
| `@re-frame.db/app-db` | `@(rf/get-frame-db :re-frame/default)` (or store the result of `(rf/get-frame-db ...)` once and deref) |
| `(reset! re-frame.db/app-db v)` | Don't. If the user truly needs to bypass the event pipeline, replace with `(rf/dispatch-sync [::reset-app-db v])` and add a handler that does the reset. Flag this for human review — direct mutation is almost always a code smell. |
| `re-frame.subs/clear-subscription-cache!` | `(rf/clear-subscription-cache! :re-frame/default)` (or whichever frame is intended) |
| `re-frame.registrar/get-handler` | Use the public `(rf/get-handler kind id)` from `re-frame.core`. |
| Any other private-namespace symbol | Look for a public equivalent in `re-frame.core`. If none, flag for human review with the specific call site and what it is trying to do. |

**Why:** these private namespaces are explicitly off-contract in re-frame2. They will change shape and may not exist with the same interface.

---

### M-2. ~~Reading subscription return values as Reagent-specific types~~ — *demoted to [O-6](#o-6-future-proof-against-reagent-specific-sub-return-types).*

For v1, subscriptions still return Reagent-compatible reactives in CLJS-Reagent contexts; existing introspection code keeps working. The "don't lean on the Reagent type" guidance is a forward-looking recommendation, not a v1 break — see [O-6](#o-6-future-proof-against-reagent-specific-sub-return-types) under Opt-in modernisation.

---

### M-3. Dispatch ordering — events dispatched during a handler run synchronously

**Type B** (semantic flag — timing-sensitive code may depend on the old async-dispatch behaviour). Identify every `:dispatch` effect inside event handlers and every test that asserts on router-queue contents post-dispatch; explain the run-to-completion change to the user; ask before rewriting.

re-frame2 dispatches **run to completion**: every event dispatched during the processing of a domain event drains to fixed point before any view re-renders or any other domain event is processed for that frame. Today's `:dispatch` effect (and `(dispatch ...)` calls from inside handlers) ran the dispatched event on a later tick, so views could render the intermediate state. Under re-frame2, they don't.

For the vast majority of code this is harmless or strictly better. The cases that break depend on the *intermediate render between two synchronously-chained dispatches*.

**What to look for:**

```clojure
;; Pattern 1 — handler emits :dispatch and the code/test relied on the
;; intermediate render landing before the dispatched event ran:
(rf/reg-event-fx :start
  (fn [_ _]
    {:db (assoc db :status :starting)        ;; expected to render
     :dispatch [:do-the-thing]}))            ;; ...before this fired

;; Pattern 2 — code that queued multiple :dispatch effects and assumed
;; views would tick between them:
(rf/reg-event-fx :animate
  (fn [_ _]
    {:dispatch [:frame-1]
     :dispatch-later [{:ms 16 :dispatch [:frame-2]}]}))

;; Pattern 3 — tests that asserted on the queue length after a dispatch:
(deftest start-test
  (rf/dispatch [:start])
  (is (= [:do-the-thing] (peek-router-queue))))   ;; queue's already drained
```

**What to do:**

- **Pattern 1.** If the intermediate render is genuinely needed (rare, usually for spinner-flash-to-content effects), restructure: emit the visible state, return; let the user-visible event complete. Then have a *separate* domain event (e.g., from a `:dispatch-later` with `{:ms 0 ...}`) trigger the work. `:dispatch-later` always remains async.
- **Pattern 2.** Animation chains using `:dispatch` to pace frames are fragile; convert to `:dispatch-later` or use `requestAnimationFrame` via a dedicated fx. Drain semantics make `:dispatch` ill-suited for pacing.
- **Pattern 3.** Tests asserting on router queue contents post-dispatch will see an empty queue (drain has already run). Reframe assertions in terms of *resulting `app-db` state* or *effects observed*, not queue contents.

In all cases, flag for human review if the fix is non-obvious — animation/timing-sensitive code may need behavioural review, not a mechanical rewrite.

**Why:** see [002-Frames.md](002-Frames.md) §"Run-to-completion dispatch (drain semantics)". The change makes cross-machine composition deterministic and removes a class of flash intermediate renders. The cost is a behaviour change for the small set of code that relied on the old async-`:dispatch` semantics.

---

### M-4. `dispatch-with` / `dispatch-sync-with` removed in favour of two-arg `dispatch`

**Type A** (mechanical). The pattern is unambiguous; the rewrite is structural; behaviour is identical.

re-frame2 unifies the dispatch surface. The master functions `dispatch-with` and `dispatch-sync-with` are not shipped; `dispatch` and `dispatch-sync` accept an optional opts-map second argument that covers the same use cases.

**What to look for:**

```clojure
;; master pattern — affected
(rf/dispatch-with [:user/login {:email "..."}]
                  {:http stub-fn})

(rf/dispatch-sync-with [:auth/init]
                       {:http stub-fn})
```

**What to do:**

```clojure
;; re-frame2 — opts map carries :fx-overrides
(rf/dispatch [:user/login {:email "..."}]
             {:fx-overrides {:http stub-fn}})

(rf/dispatch-sync [:auth/init]
                  {:fx-overrides {:http stub-fn}})
```

The mechanism is the same (overrides ride the dispatch envelope and apply through a standard interceptor); only the user-facing API converges to one function. Cascade-propagation, run-to-completion, and stub semantics are unchanged.

This applies only to projects that have adopted master's `dispatch-with` / `dispatch-sync-with` — released re-frame versions don't have those names, so most projects are unaffected.

**Why:** see [002-Frames.md §Per-frame and per-call overrides](002-Frames.md). The unified dispatch shape is simpler, fewer names, same capability, and the override flow is now via the explicit envelope rather than via Clojure metadata (less fragility, no try/finally, visible in any debug stream).

**`dispatch-and-settle` survives.** Master's `dispatch-and-settle` (which awaits a dispatch cascade and returns a deferred) is preserved in re-frame2 with the same user-facing API including its `:overrides` opt. The internal mechanism for the overrides is now envelope-based rather than metadata-based, but user code calling `dispatch-and-settle` does not change.

---

### M-5. `reg-event-db` / `reg-event-fx` / `reg-event-ctx` / `reg-sub` / `reg-fx` / `reg-cofx` are macros

**Type A for `apply` of a `reg-*` symbol** (mechanical: rewrite to direct invocation or a wrapper macro). **Type B for Var-aliasing** (`(def my-reg rf/reg-event-db)`): if the alias is invoked dynamically, the rewrite requires understanding the call sites; flag for human review.

re-frame2's registration functions are **macros** so that source coordinates (`:ns`/`:line`/`:file`) are captured automatically and `:doc` strings can be elided from production builds. In current re-frame releases they are functions; the migration is mechanical for direct invocation (no change required) and replacement-only for the rare higher-order use cases below.

For code that invokes them directly — `(rf/reg-event-db :foo (fn [db _] ...))` — there is no observable change. The break only manifests when a `reg-*` symbol is used as a value: `apply`, `def`-aliased, passed as a higher-order argument, or referenced through a Var.

**What to look for:**

```clojure
;; All affected — macros can't be apply'd or aliased as values
(apply rf/reg-event-db [:foo (fn [db _] ...)])
(def my-reg rf/reg-event-db)                  ;; capturing the Var
(map (fn [{:keys [id handler]}] (rf/reg-event-db id handler)) registrations)  ;; OK — invoked directly
(map #(apply rf/reg-event-db %&) ...)         ;; not OK
```

**What to do:**

- **For `apply`/Var-aliasing**: refactor to direct invocation. If you have a list of handlers to register, write a macro of your own that expands to a sequence of `reg-event-db` calls.
- **For programmatic registration that genuinely needs the function form**: re-frame2 may expose a function variant under a different name (`re-frame.core/reg-event-db-fn` or similar) — TBD; flag for human review if you encounter this case.
- **Most code uses these directly and is unaffected.**

**Why:** EP 001 / 000 commits to source-coord capture and prod-build doc elision, both of which require macros. The trade-off is the (rare) higher-order-use breakage. See [000-Vision.md §Source coordinates require macros](000-Vision.md).

---

### M-6. Drain-depth limit may abort long synchronous dispatch chains

**Type A** (mechanical mitigation). The runtime error names the offending frame; the fix is to bump `:drain-depth` on `reg-frame` (or in the dispatch opts) — a structural change with no behavioural risk.

Run-to-completion drain semantics enforce a configurable depth limit (`:drain-depth` on `reg-frame`, default *TBD* — sketched as 100). When a synchronously-chained dispatch cascade exceeds the limit, drain aborts with a runtime error: `{:reason :drain-depth-exceeded :frame :auth :event [...] :depth N}`.

Most code is unaffected — typical dispatch cascades are 1–5 deep. Code paths that genuinely need long chains (event-sourcing replay, complex state-machine cascades, generated test fixtures dispatching many events) may hit the limit.

**What to look for:**

- A runtime error with `:reason :drain-depth-exceeded` after upgrading.
- Code that synchronously dispatches in loops or recursive event handlers.
- Tests that replay long event sequences within a single drain cascade.

**What to do:**

- **Increase the depth limit on the affected frame**: `(rf/reg-frame :my-frame {:drain-depth 1000})`.
- **For a single test or REPL session**: pass `:drain-depth` in the dispatch opts map, runtime-overriding the frame default (per [002-Frames.md §Run-to-completion dispatch](002-Frames.md)).
- **Refactor to async** if the chain is genuinely unbounded — use `:dispatch-later` to break the cascade.

**Why:** Drain to fixed point must terminate. A depth limit is the cheapest cycle-detection mechanism that doesn't require expensive graph analysis. The default is generous; the override is per-frame.

---

### M-7. (Currently no other required migrations.)

**Maintainer note:** as further breaking decisions are made, add new M-N rules here, in order of likelihood. Each rule should have: a clear "what to look for" pattern; a clear "what to do"; a brief "why" pointing at the design decision.

If after sweeping the codebase you find no M-1 / M-3 / M-4 / M-5 / M-6 hits and the project compiles and runs, **the migration is complete**.

---

## Verification steps

After applying any rules, in order:

1. **Compile.** Run `shadow-cljs compile` (or the project's equivalent). Resolve any compile errors. Most likely issues:
   - Unresolved symbols from removed private namespaces (apply M-1).
   - `apply` / Var-aliasing of `reg-event-*` etc. (apply M-5).
2. **Run tests** if a test suite exists. Watch for:
   - Tests that depended on intermediate renders between synchronously-chained dispatches (apply M-3).
   - Tests that asserted on router-queue contents post-dispatch (apply M-3).
   - Runtime errors with `:reason :drain-depth-exceeded` (apply M-6).
   - master users only: `dispatch-with` / `dispatch-sync-with` calls (apply M-4).
3. **Run the application.** Smoke-test that:
   - The app boots.
   - Dispatched events still update `app-db` as expected (now living inside the `:re-frame/default` frame, but transparent to user code).
   - Subscriptions still update views.
   - Hot-reload still works.
4. **Report.**

---

## Opt-in modernisation (only if asked)

These are not required for migration. Apply them only if the user has explicitly asked you to modernise the codebase to use re-frame2's new features.

### O-1. Convert interceptor vectors to metadata maps for richer registrations

re-frame2 lets the middle argument of `reg-event-db`/`reg-event-fx`/etc. be either the legacy interceptor vector or a metadata map. The map form lets you attach `:doc`, `:spec` (Malli), and other introspection-friendly fields.

**Transformation:**

```clojure
;; before
(rf/reg-event-fx :load-todo
  [interceptor-1 interceptor-2]
  (fn [ctx event] ...))

;; after
(rf/reg-event-fx :load-todo
  {:doc          "Loads a todo by id from the API."
   :interceptors [interceptor-1 interceptor-2]
   :spec         [:cat [:= :load-todo] :int]}             ;; Malli, optional
  (fn load-todo-handler [ctx]
    ...))
```

Consider also giving the handler fn a name (it appears in stack traces and tooling).

Apply only when the user wants the richer metadata. Don't make this change wholesale — the legacy form continues to work indefinitely.

### O-2. Convert plain Reagent view fns to `reg-view` for multi-frame readiness

Plain Reagent fns target only `:re-frame/default`. If the codebase plans to introduce multi-frame use (devcards, isolated widgets, Storybook stories, etc.), views that may be rendered inside a non-default `frame-provider` should be registered via `reg-view` so they pick up the surrounding frame.

**Transformation:**

```clojure
;; before
(defn counter [label]
  (let [n @(rf/subscribe [:count])]
    [:button {:on-click #(rf/dispatch [:inc])}
     (str label ": " n)]))

;; after
(rf/reg-view :counter
  {:doc "Counter widget."}
  (fn [label]
    (let [n @(subscribe [:count])]                       ;; unqualified — frame-bound local
      [:button {:on-click #(dispatch [:inc])}            ;; unqualified — frame-bound local
       (str label ": " n)])))
```

Note the `re-frame.core/` prefix is dropped inside `reg-view` bodies — `dispatch` and `subscribe` are lexical locals injected by the macro.

Only apply if the user wants multi-frame support. Single-frame apps see no benefit from this conversion and should keep plain fns to minimise churn.

### O-3. Add Malli schemas to event handlers and `app-db` paths

re-frame2 supports Malli schemas on `reg-event-*`, `reg-sub`, `reg-fx`, `reg-cofx`, and on `app-db` paths via `reg-app-schema`. Specs are validated in dev builds and elided in production.

Apply only with explicit user direction; this is a real authoring exercise, not a mechanical transformation.

### O-4. Convert namespaced top-level state to a frame for isolation

If the codebase has a self-contained subsystem under a single `app-db` path (e.g. all `:auth/*` keys, with corresponding events/subs all namespaced `:auth/...`), it can be reorganised as a separate frame for cleaner isolation. This is a meaningful architectural change, not a mechanical migration. **Do not apply unless explicitly asked.**

### O-6. Future-proof against Reagent-specific subscription return types

re-frame2 v1 still ships against Reagent and continues to return Reagent-compatible reactives from `subscribe`. Code that introspects the returned object (`reagent.ratom/reaction?`, `.-state`, calling `reagent.core/dispose!`, etc.) will work in v1.

OQ-7 in 000 commits to keeping the door open for substrate decoupling — a future re-frame2.x or v3 may swap the substrate (UIx, Helix, headless). Code that depends on the Reagent type leaking through `subscribe` blocks that path. Future-proofing now means staying within the documented `re-frame.core` boundary.

**What to look for:**

```clojure
(let [r (rf/subscribe [:foo])]
  (reagent.ratom/reaction? r)            ;; type inspection
  (.-state r)                             ;; private field access
  (reagent.core/dispose! r))             ;; Reagent-specific lifecycle
```

**What to do** (only if explicitly asked, or if anticipating the substrate change):

- The idiomatic `@(rf/subscribe [:foo])` pattern — keep it; it's already future-proof.
- `dispose!` of a sub → use `(rf/clear-subscription-cache! ...)` if the goal is cache cleanup, or rely on automatic cleanup when the consuming component unmounts.
- Type checks (`reaction?`) → remove; the contract is "deref to read"; the underlying type is private.
- If a use case can't be expressed via `re-frame.core`, flag the call site for human review.

**Why:** see 000's OQ-7. The migration is forward-looking — v1 doesn't force it, but v3 might.

---

### O-7. Convert `:dispatch-n` to `:fx` (deprecated effect)

`:dispatch-n` is **deprecated** in re-frame2. It still works (preserved for backwards compatibility), but new code uses `:fx` with nested `[:dispatch [...]]` pairs.

**What to look for:**

```clojure
;; deprecated
{:dispatch-n [[:event-1]
              [:event-2]
              [:event-3]]}
```

**What to do:**

```clojure
;; preferred
{:fx [[:dispatch [:event-1]]
      [:dispatch [:event-2]]
      [:dispatch [:event-3]]]}
```

The transformation is mechanical: wrap each dispatched event in a `[:dispatch ev]` pair, then wrap the whole list under `:fx` instead of `:dispatch-n`.

**Apply only if:**

- The codebase uses `:dispatch-n` and the user has asked to modernise, OR
- The codebase mixes `:fx` with other effects in the same handler (in which case folding `:dispatch-n` into `:fx` consolidates the effect map).

**Why:** `:fx` is the unified effect-collection mechanism in re-frame2. `:dispatch-n` is sugar that becomes redundant. Reducing the effect-map vocabulary makes the surface easier to teach and tool against. The preserved-vs-deprecated split is documented in MIGRATION.md's "What stays the same" section.

---

### O-5. Update fx handlers to binary form for full multi-frame support

re-frame2's primary `reg-fx` signature is binary: `(fn [m fx-arg] ...)`, where `m` is the same context the originating event handler received (with `:db`, `:event`, `:frame`, `:trace-id`, `:source`, and any cofx). Legacy unary handlers `(fn [fx-arg] ...)` continue to work — `do-fx` detects arity and wraps unary handlers in a `*current-frame*` binding so internal `rf/dispatch` calls still route correctly in single-frame contexts and most sync multi-frame cases.

The case where unary fx handlers go wrong is **async dispatch**: if the handler captures a callback that fires after it returns (HTTP response, timer fire, websocket message), the dynamic-var binding has unwound and the callback's `rf/dispatch` defaults to `:re-frame/default`. Libraries that dispatch asynchronously (re-frame-http-fx, re-frame-async-flow-fx, etc.) need updating to be fully multi-frame-correct.

**What to look for** in the codebase (this rule mostly applies to library authors and to apps that registered their own async fx):

```clojure
;; legacy unary fx with async dispatch — works in single-frame, leaks to default in multi-frame
(rf/reg-fx :http-xhrio
  (fn [request]
    (let [{:keys [on-success on-failure]} request]
      (ajax/ajax-request 
        {:handler (fn [[ok? response]]
                    (rf/dispatch (conj (if ok? on-success on-failure) response)))}))))
```

**What to do:**

```clojure
;; binary, frame-aware
(rf/reg-fx :http-xhrio
  (fn [m request]
    (let [d (rf/bound-dispatcher m)                       ;; closure over (:frame m)
          {:keys [on-success on-failure]} request]
      (ajax/ajax-request 
        {:handler (fn [[ok? response]]
                    (d (conj (if ok? on-success on-failure) response)))}))))
```

The change is mechanical:

1. Add `m` as the first arg.
2. At handler entry, get a frame-bound dispatcher: `(let [d (rf/bound-dispatcher m)] ...)`.
3. In every async callback, replace `rf/dispatch` with `d`.

**Apply only if:**

- The codebase ships an fx that dispatches asynchronously, AND
- It is intended to support re-frame2 multi-frame use, AND
- The user has asked for this change explicitly.

For sync-only fx (most user-defined fx) and for apps that don't use multi-frame, no change is required.

**Why:** see [002-Frames.md §Async effects and frame propagation](002-Frames.md). The binary signature gives explicit data flow for the frame; the dynamic-var fallback covers legacy unary handlers in sync paths but cannot cover async ones.

---

## What stays the same (do not change these)

A non-exhaustive list of public API surface that is **preserved unchanged** in re-frame2. If your code uses any of these, leave it alone.

- **Direct invocation of `reg-event-db` / `reg-event-fx` / `reg-event-ctx` / `reg-sub` / `reg-sub-raw` / `reg-fx` / `reg-cofx` / `reg-event-error-handler`.** Same names, same call shapes (vector-of-interceptors form preserved via overload). See M-5 for the one edge case (higher-order use).
- **Handler signatures.** `(fn [db [_ args]] ...)` for `reg-event-db`; `(fn [ctx event] ...)` or `(fn [m] ...)` for `reg-event-fx`; `(fn [context] ...)` for `reg-event-ctx`. Unchanged. Existing handlers continue to work; new keys appear additively in the cofx-context map.
- **`dispatch` and `dispatch-sync`.** Same names; the optional second `opts` arg is a new addition that doesn't affect single-arg calls.
- **`subscribe`.** Same. Optional second `opts` arg.
- **`@(subscribe [...])`.** The deref-to-read pattern is the documented contract and stays valid.
- **Subscription composition.** `:<-`, `reg-sub`'s sugar variants, `reg-sub-raw`, query-vector and (alpha) query-map shapes — all preserved.
- **Standard interceptors.** `path`, `enrich`, `after`, `unwrap`, `trim-v`, `debug`, `inject-cofx`, `on-changes` — all preserved.
- **Global interceptors.** `reg-global-interceptor` / `clear-global-interceptor` — preserved; new per-frame interceptors are additive.
- **Effect map shape.** `:db`, `:dispatch`, `:dispatch-later`, `:fx`, and any user-registered fx — all preserved. `:dispatch-n` is **deprecated** (see O-7) but still works; new code should use `:fx` with nested `[[:dispatch [...]] ...]` pairs instead.
- **`make-restore-fn`.** Test-runner helper; preserved (with multi-frame extensions in v1.x).
- **Alpha API features.** `reg :sub-lifecycle`, query maps, `reg-flow`, `flow<-`, `clear-flow` — preserved with their existing semantics.
- **`re-frame.std-interceptors`** namespace — public, preserved.
- **`dispatch-and-settle`** (master) — preserved; same API including `:overrides` opt (internal mechanism changes per M-4).
- **JVM interop layer.** `re-frame.interop` (separate `.clj` and `.cljs` implementations) is preserved; tests continue to run on the JVM.
- **Hot-reload semantics on the default frame.** `reg-event-*` re-registration replaces a single handler without resetting `app-db`, matching today's behavior. (Per OQ-F-1: re-frame2 commits to "surgical update" as the default frame's hot-reload semantics.)

If a usage isn't on this list and isn't covered by an M- or O-rule, flag it for human review rather than guessing.

---

## What you must not do

- **Do not silently delete code** you don't understand. If a private-namespace usage looks intentional and irreplaceable, flag it for human review.
- **Do not perform stylistic refactoring.** Stay within the migration rules.
- **Do not introduce new dependencies** beyond bumping re-frame to the v2 version.
- **Do not invent migration rules.** If you encounter a failure not covered by the M-N rules above, stop and ask.
- **Do not assume re-frame2 has features that aren't documented in this directory.** The source of truth for re-frame2's API is [000-Vision.md](000-Vision.md) and the per-EP documents in `docs/EPs/re-frame2/`. If something is in OQ status (Open Question) it is *not yet decided* and you should not act on it.

---

## Output format for your report

When you are done, produce a short report with these sections:

```
## Migration summary

- re-frame version: <old> → <new>
- Files modified: <count>
- Required rules applied: <list of M-N rule IDs, or "none">
- Opt-in changes applied: <list of O-N rule IDs, or "none, not requested">
- Verification: <compile/test/run results>

## Items flagged for human review

<list of call sites you found suspicious but did not change, with file:line and a brief explanation>

## Anything unexpected

<observations that don't fit elsewhere>
```

Keep the report under 300 words unless the migration was unusually complex.

---

## Maintainer note (for humans, not the agent)

When a re-frame2 design decision introduces a new breaking change:

1. Add an `M-N` rule above with the same shape as M-1 / M-2.
2. If the rule is conditional on a feature opt-in, add it as `O-N` instead.
3. Update the "Last review" date at the top.
4. If the change is significant, add a one-line entry under "Required migration rules" or "Opt-in modernisation" cross-referencing the relevant EP doc.

When a design decision *removes* breakage (e.g. we found a way to keep something compatible after all):

1. Mark the rule as `~~strikethrough~~` rather than deleting it for one cycle, with a note.
2. Delete it in the next maintenance pass once the rule is no longer relevant to in-flight migrations.
