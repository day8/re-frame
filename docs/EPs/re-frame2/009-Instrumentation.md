# EP 009 — Instrumentation, Tracing, and Performance Integration

> Status: Drafting. **v1-required.** Tracing is the substrate that re-frame-10x consumes; without it, 10x is broken in re-frame2. This EP locks the trace event model, subscription mechanism, hot-path discipline, Chrome Performance API integration, and the forward-compatibility commitments that let 10x and re-frame-pair evolve without re-litigating the framework.

## Abstract

re-frame2 emits a stream of **trace events** describing what's happening at runtime — dispatches, interceptor steps, effect handler calls, subscription updates, frame lifecycle, machine transitions. Tools subscribe to this stream; current tools include re-frame-10x (the visual dev panel) and re-frame-pair (the nREPL-attached AI/REPL agent). Future tools will be different.

The tracing surface is designed to be **stable** (required fields don't change), **extensible** (open maps; new fields are additive), **cheap on the hot path** (near-zero overhead with no listeners), and **cross-platform** (JVM-runnable for the data; Chrome Performance integration is CLJS-side).

## Why this is its own EP

Tracing is the connective tissue between the runtime and every tool that observes it. Splitting it into its own EP:

- Locks the data shape independently of any specific tool.
- Documents the forward-compat commitments tools depend on.
- Separates "framework emits events" (002 territory) from "framework provides a tap surface" (this EP).
- Makes the Chrome Performance API integration explicit rather than implicit.

It's v1-required because:

- 10x has to work in re-frame2 from day one; 10x consumes traces.
- re-frame-pair already attaches to running re-frame apps via nREPL; the trace surface is part of what it reads.
- Without explicit forward-compat commitments, future 10x/re-frame-pair work is risky.

## The trace event model

A trace event is an immutable map describing one *span* of work in the runtime — an event's processing, a sub computation, a render, an effect. Events flow into a single per-application trace stream; subscribers listen.

The shape inherits current re-frame's trace convention (preserved for tool compatibility) and adds re-frame2 fields additively.

### Core fields (required on every event)

```clojure
{:id        <int>            ;; auto-incrementing trace id; unique per process
 :operation <kw-or-vec>      ;; what's being traced — typically the event-id, sub-id, etc.
 :op-type   <kw>             ;; discriminator: :event, :sub/run, :sub/create, :render, :raf,
                              ;;   :event/do-fx, :reagent/quiescent, :machine/transition, etc.
 :start     <ms>             ;; start timestamp (host clock)
 :end       <ms>             ;; end timestamp (set by finish-trace)
 :duration  <ms>             ;; end - start
 :child-of  <id>             ;; parent trace id, for cascade correlation
 :tags      {...}}           ;; open-ended bag for op-type-specific fields
```

### Re-frame2 additions (additive, optional)

```clojure
{:frame  :todo            ;; frame keyword — multi-frame disambiguation
 :source :ui}             ;; :ui, :timer, :http, :machine, :repl — origin of the trigger
```

These are top-level fields on every event for re-frame2-aware traces; tools written against pre-v2 traces ignore them.

### `:op-type` vocabulary

Existing values consumed by re-frame-10x today: `:event`, `:sub/run`, `:sub/create`, `:render`, `:raf`, `:event/do-fx`, `:reagent/quiescent`, `:sync`, `::fsm-trigger`.

re-frame2 adds new `:op-type` values for new concerns:

- `:frame/created` / `:frame/reset` / `:frame/destroyed` — frame lifecycle.
- `:machine.lifecycle/created` / `:machine.lifecycle/destroyed` — machine instance lifecycle.
- `:machine/event-received` / `:machine/transition` / `:machine/snapshot-updated` — machine activity.
- `:registry/handler-registered` / `:registry/handler-cleared` — registration changes (hot reload).
- `:error/handler` / `:error/interceptor` / `:error/fx` / `:error/drain-depth-exceeded` — errors.

Consumers filter by `:op-type` (or `:frame`, or `:source`) to get the slice they care about. Adding new `:op-type` values is non-breaking — tools ignore what they don't understand.

### `:tags` is the open-ended bag

Variable per-event data goes in `:tags`. Existing examples: `:app-db-before`, `:app-db-after`, `:input-signals`, `:cached?`, `:value`, `:error`, `:reaction`. New tags can be added without breaking consumers. Use `:tags` for op-type-specific data; reserve top-level keys for fields universal across all events.

### Open shape; new fields are additive

The map is open. New fields can be added by future versions without breaking consumers — listeners read what they understand and ignore the rest. The forward-compat commitments:

- **Required top-level fields** (`:id`, `:operation`, `:op-type`, `:start`, `:end`, `:duration`, `:child-of`, `:tags`) are stable across all re-frame2 versions. Removing or renaming any is a breaking change.
- **Re-frame2 additions** (`:frame`, `:source`) are stable once shipped; they are present on every re-frame2 trace event.
- **Op-type-specific fields inside `:tags`** are stable within their op-type. New optional tag keys are additive; existing keys don't change shape.
- **New `:op-type` values** can be added without breaking existing tools — tools filter the values they recognise.

Tools written against re-frame2 v1 continue to work against v1.x and v2 unless they read fields that haven't been promised stable.

## Subscription / consumption

The current re-frame trace API uses **batched, debounced delivery** — listeners receive collections of trace events at a regular cadence (default 50ms) rather than per-event. This is essential for performance: per-event delivery on a hot dispatch loop would slow the host application; batching amortises cost and gives consumers a chance to coalesce updates.

re-frame2 keeps this model.

### The listener API

```clojure
(rf/register-trace-cb key callback-fn)
;; Subscribes callback-fn to receive batched trace events.
;; callback-fn signature: (fn [traces] ...) — traces is a collection.
;; Same key replaces any previously-registered listener under that key.

(rf/remove-trace-cb key)
;; Unsubscribes.
```

Conventional keys: `:re-frame.10x/main`, `:re-frame.pair/main`, `:my-app/recorder`.

### Listener invocation rules

- **Batched delivery.** Listeners receive a collection of trace events accumulated over the debounce window (default 50ms). Tools that want to react to a specific event can scan the batch.
- **Debounced.** A 25ms grace window after the most recent emit before delivery, capped at 50ms total. Avoids constant timeout setting/cancelling on busy dispatch loops.
- **After settle.** A trace event lands in the batch only after its underlying span completes (`finish-trace` runs). Listeners see fully-formed events with `:end` and `:duration` populated.
- **Exception isolation.** An exception thrown by a listener is caught, logged via `re-frame.loggers`, and does *not* propagate to the framework or other listeners. One broken tool can't break the app or block other tools.
- **Buffer flush after delivery.** After a batch is delivered to all listeners, the framework's internal trace buffer is reset. The framework holds no long-term history; tools that want one (e.g., 10x's epoch buffer) maintain their own.

### Per-event delivery — opt out of batching

A listener that genuinely needs per-event delivery (rare) can opt out:

```clojure
(rf/register-trace-cb :my/realtime callback-fn {:batched? false})
;; callback-fn receives one trace event per call instead of a batch.
```

Use sparingly — most tools should batch.

## Emitting trace events — the macro suite

re-frame2 emits traces using a small macro suite (inherited from current re-frame):

```clojure
(trace/with-trace {:operation event-id
                   :op-type   :event
                   :tags      {:event event-v}}
  ;; ... do work ...
  (trace/merge-trace! {:tags {:app-db-before @db}})
  (run-handlers!)
  (trace/merge-trace! {:tags {:app-db-after @db}}))
```

### `with-trace`

Opens a trace span, runs the body, automatically closes. The trace's `:start` is set on entry; `:end` and `:duration` are computed on exit (via `finish-trace`).

Nested `with-trace` calls are linked: each inner trace's `:child-of` is the enclosing trace's `:id`. The mechanism is a dynamic var (`*current-trace*`) holding the innermost open trace; `merge-trace!` uses it to know which trace to update.

### `merge-trace!`

Adds tags or top-level fields to the *currently-open* trace span. Useful for capturing data that's only available partway through the span (e.g., the new `app-db` value after a handler runs). Tags merge into the existing tags; top-level keys overwrite.

### `finish-trace`

Closes the open trace, computes its duration, pushes it onto the trace buffer, and triggers the debounce-scheduler. Called automatically by `with-trace` on exit (including exceptional exit).

### Compile-time elision

All three macros expand to `(when (is-trace-enabled?) ...emit...)` gates. `is-trace-enabled?` reads the `re-frame.trace/trace-enabled?` closure-define (default `false`); when the constant is `false` in a production build, the closure compiler eliminates the gated branch and the macros become no-ops. See "Production builds" below for the full mechanism.

### Where trace emission lives

The framework emits traces from these call sites (inherited from current re-frame, with new ones for re-frame2):

- `events.cljc` — `:event` traces wrap each handler's interceptor pipeline.
- `subs.cljc` — `:sub/create` and `:sub/run` traces wrap subscription materialisation and recompute.
- `fx.cljc` — `:event/do-fx` traces wrap effect handler iteration; `:reagent/quiescent` for the post-render moment.
- `interceptor.cljc` — `merge-trace!` adds `:interceptors` tag to the surrounding event trace.
- `router.cljc` — `:sync` for `dispatch-sync`; FSM-trigger traces for the router state machine.
- `std_interceptors.cljc` — `path`, `enrich`, `after`, `on-changes` interceptors emit their own traces.

re-frame2 adds emit sites for new concerns:

- Frame lifecycle (`reg-frame`, `make-frame`, `reset-frame`, `destroy-frame`).
- Machine handlers (`machine-handler` emits transition / lifecycle / snapshot-update traces).
- Run-to-completion drain (drain-start / drain-end / drain-depth-exceeded).
- Per-frame override application (which fx was overridden, by what).

User code can also emit traces — `with-trace` and `merge-trace!` are public.

## Production builds: zero overhead, zero code

**Trace emission is a development-only concern.** In production builds, all tracing code — every emit call site, the listener registry, the late-subscriber buffer, the Performance API bridge — is compile-time eliminated. The closure compiler's dead-code elimination removes everything; production binaries contain no trace machinery at all.

### The mechanism: `goog-define trace-enabled?` + `is-trace-enabled?`

Following the convention already in current re-frame's `re-frame.trace`:

```clojure
(ns re-frame.trace)
#?(:cljs (goog-define trace-enabled? false)
   :clj  (def ^boolean trace-enabled? false))

(defn ^boolean is-trace-enabled? [] trace-enabled?)
```

Every framework-internal trace emit is wrapped in `(when (is-trace-enabled?) ...)`. The macros (`with-trace`, `merge-trace!`, `finish-trace`) all expand to this gate.

When `trace-enabled?` is `false` (the default), the closure compiler's advanced-compilation pass treats the constant as dead and elides the gated branch from the output bundle. Production builds:

- Allocate no trace event maps.
- Hold no listener registry.
- Never invoke listener predicates.
- Don't include the trace buffer in the bundle.
- Don't include the Performance API bridge.

### How users opt in (dev builds)

Tools that consume traces (10x, re-frame-pair) instruct users to set the `trace-enabled?` closure-define to `true` in their dev build:

```edn
;; shadow-cljs.edn (dev build)
{:closure-defines {re-frame.trace/trace-enabled? true}}
```

Closure compiler with the constant set to `true` keeps the gated branches; trace emission runs and listeners receive batches.

### User-side listener registration

User-side `(rf/register-trace-cb ...)` calls should also be elided in production. Wrap them with the same predicate:

```clojure
(when (rf/is-trace-enabled?)
  (rf/register-trace-cb :my/listener callback-fn))
```

In production (closure-define `false`), `is-trace-enabled?` is a constant `false`, the `when` is dead, and the entire registration is elided.

### JVM builds

For JVM builds, `trace-enabled?` is a plain `^boolean` def; production artefacts use a build-time flag (or reader conditional) to set it. JVM doesn't have the closure compiler's elision — the dead code stays in the bytecode — but the runtime cost is one boolean check on each emit, near-zero overhead.

## Hot path in dev builds

Even with tracing compiled in, the hot path stays fast when no listeners are registered. Dev iteration matters; you don't want trace machinery to slow ordinary feedback loops.

### Cheap-path discipline (dev builds only)

- **Listener registry is a single atom.** Reading it is one deref.
- **Trace events are constructed lazily** — when no listeners are registered, no event map is built. The emit macro skips the body entirely.
- **No string formatting or other expensive work** happens in framework emit code; tools format if they want to.
- **Debounce avoids per-event listener invocation** — accumulating into a single collection per batch amortises the cost across many events.

## Chrome Performance API integration

The Chrome Performance API ([User Timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)) lets dev tools see custom timing alongside React renders, network, paint, etc. re-frame2 ships a built-in trace listener that bridges trace events to `performance.mark` / `performance.measure`. The bridge is part of the trace machinery: it activates whenever tracing is active (dev builds) and is compiled out entirely in production along with the rest of tracing.

### How it maps

The bridge is itself a trace listener. When a batch of trace events arrives, the bridge translates each into Performance API calls:

For each trace event in the batch:
- `performance.mark("re-frame:<op-type>:<id>:start")` is emitted at the trace's `:start` time.
- `performance.mark("re-frame:<op-type>:<id>:end")` is emitted at the trace's `:end` time.
- `performance.measure("re-frame: <op-type> <operation>", start-mark, end-mark)` ties them together with the trace's `:duration`.

The `:id` and `:child-of` fields let the Performance panel render the cascade hierarchy: child measures nest visually under their parent.

The naming convention: `re-frame:<op-type>:<id>:<phase>` for marks; `re-frame: <op-type> <operation>` for measures (human-readable in the DevTools UI).

Result in Chrome DevTools:

- Performance panel shows re-frame events as bars in the timeline, alongside React renders.
- Hover shows the human-readable measure name.
- Custom events can be cross-referenced with paint, layout, network.

### Activation

The Performance API bridge is part of the trace machinery — when tracing is active (dev builds), the bridge is active too. There is no separate opt-in: if you can see traces, you can see them in Chrome's Performance panel. Production builds elide tracing entirely (per "Production builds" above), and with it the Performance API bridge.

### CLJS-only

The Chrome Performance API is browser-specific. JVM-side has its own profiling (clj-async-profiler, JFR); we don't bridge to those in v1. The CLJS-only nature is documented; users running tests on JVM see all the trace events but not Performance marks.

### Forward compat

If Chrome's Performance API changes (e.g., adds new measure types), the bridge implementation updates internally; user code is unaffected because there is no user-facing API for the bridge — it's a trace-listener implementation detail. Browsers that don't expose `performance.mark`/`measure` (or expose only a subset) see the bridge no-op gracefully.

## Forward compatibility with re-frame-10x

re-frame-10x is the visual dev panel. It reads trace events to render its UI. Future 10x versions will read more, present differently, integrate with new tooling. The forward-compat commitments below let 10x evolve without re-frame2 changes.

### Commitments to 10x

1. **The trace event surface is stable.** New fields are additive; existing fields don't change shape; required fields don't disappear. 10x written against v1 traces continues to work against v1.x traces.
2. **The public registrar query API is stable** — `(rf/handlers kind)`, `(rf/handler-meta kind id)`, `(rf/frame-meta id)`, `(rf/get-frame-db id)`. 10x reads these to render handler lists, frame inspectors, app-db viewers.
3. **The late-subscriber buffer** lets 10x open after the app has been running and catch up to recent state.
4. **Hot-reload notifications** (`:registry/handler-registered`, `:frame/registry-updated`) let 10x refresh its state when handlers re-register.
5. **Per-frame trace tagging** (the `:frame` field) lets 10x split its UI by frame for multi-frame apps.

### What 10x can change without re-frame2 changes

- Visual layout, panels, theming.
- New summary views derived from existing trace events.
- Integration with Chrome Performance, Sentry, Slack, etc.
- Snapshot/replay UI (using the late-subscriber buffer).

### What requires re-frame2 changes

- New trace event *types* the framework would have to emit.
- New required fields on existing trace events.
- New introspection APIs (e.g., "give me the active sub-graph nodes for frame X").

These would be 002 / 009 changes, not 10x changes.

## Forward compatibility with re-frame-pair

re-frame-pair is the nREPL-attached AI/REPL companion. It reads runtime state, dispatches events, and hot-swaps handlers. The forward-compat commitments below ensure agent-driven workflows survive future re-frame2 changes.

### Commitments to re-frame-pair

1. **Public registrar query API is stable** (same as for 10x).
2. **`(rf/get-frame-db id)`** returns a deref-able snapshot. Agents can read app-db without permissions or special access.
3. **`(rf/dispatch-sync ev opts)`** is the canonical way to drive an event from the REPL. Returns `nil` (matching today); the cascade settles before the call returns.
4. **`(rf/snapshot-of path opts)`** reads a slice (typically a machine snapshot) without traversing app-db manually.
5. **`(rf/handlers kind)`** lets the agent enumerate registered handlers and their metadata. Source coords (`:ns`/`:line`/`:file`) help the agent point at code.
6. **The trace event stream** is available to the agent via `register-trace-cb` if it wants to observe the running app.
7. **Hot-swap re-registration** is observable via `:registry/handler-registered`. Agents that hot-swap a handler can verify their change took effect.

### What re-frame-pair can do without re-frame2 changes

- Generate test cases from trace history.
- Suggest refactors based on registry inspection.
- Drive interaction sequences via `dispatch-sync`.
- Snapshot state, modify, restore.
- Read state in any frame; `frame-ids` enumerates them.

### What requires re-frame2 changes

- Sandboxed execution mode (e.g., "run this dispatch but undo any side-effects after").
- Speculative execution (`simulate-dispatch` that doesn't commit).
- Write-then-rollback transactions.

The first is partially expressible today via per-frame `:fx-overrides` (override every fx with a no-op or a recorder). The second is open territory — possibly an EP-future deliverable.

## JVM vs. CLJS scope

All trace functionality below is **dev-build only** — production builds elide the entire trace surface on both platforms (per "Production builds" above).

| Capability (dev builds) | JVM | CLJS |
|---|---|---|
| Trace event emission | ✓ | ✓ |
| `register-trace-cb` / `remove-trace-cb` | ✓ | ✓ |
| Late-subscriber buffer | ✓ | ✓ |
| Hot-reload trace events | ✓ | ✓ |
| Chrome Performance API integration | ✗ | ✓ |
| 10x panel itself | ✗ | ✓ |
| re-frame-pair attachment | ✓ | ✓ |

Trace data is just data; both platforms emit it during dev. The Performance API bridge is browser-specific; everything else works headless. Production binaries contain none of this.

## Compatibility with re-frame-10x

This section confirms the specific shapes re-frame-10x consumes today and that re-frame2 preserves them (or extends additively). 10x will need adjustments for re-frame2-specific concerns (multi-frame, machines), but its core consumption pattern remains valid.

### What 10x consumes from the trace surface

| 10x consumes | re-frame2 ships |
|---|---|
| `register-trace-cb` / `remove-trace-cb` API | ✓ Preserved |
| Batched delivery with debounce | ✓ Preserved (50ms default) |
| Trace event shape: `:id`, `:operation`, `:op-type`, `:start`, `:end`, `:duration`, `:child-of`, `:tags` | ✓ Preserved exactly |
| `:op-type` discriminator vocabulary (`:event`, `:sub/run`, `:sub/create`, `:render`, `:raf`, `:event/do-fx`, ...) | ✓ Preserved; re-frame2 adds new values additively |
| `:tags` for op-type-specific data (`:app-db-before`, `:app-db-after`, `:input-signals`, `:cached?`, `:value`, `:error`) | ✓ Preserved |
| `is-trace-enabled?` for feature detection | ✓ Preserved |
| Compile-time elision via `goog-define trace-enabled?` | ✓ Preserved |

### What 10x will need to adapt

| Concern | Adjustment in 10x |
|---|---|
| Multi-frame UI | Add a frame selector; per-frame trace stream slicing using `:frame` field; per-frame app-db inspection via `(rf/get-frame-db id)`. |
| Drain semantics in epochs | More events drain into a single epoch than before (run-to-completion). 10x's `:child-of` chain logic mostly works as-is; visual layout may want to indicate the drain boundary. |
| Machine trace types | Render new `:op-type` values (`:machine/transition`, etc.) — additive, can ignore initially. |
| Per-frame override visibility | Show frame's `:fx-overrides` / `:interceptor-overrides` config in the frame inspector panel, read via `(rf/frame-meta id)`. |

### Versioned trace surface

re-frame2 ships `(rf/trace-api-version)` returning an integer that bumps with contract revisions. 10x can branch on it the same way 10x's own `public/api-version` works:

```clojure
(when (and (rf/loaded?) (>= (rf/trace-api-version) 1))
  ;; safe to use re-frame2's trace surface
  ...)
```

### What 10x reads beyond the trace stream

10x also reads:

| Surface | re-frame2 supports via |
|---|---|
| `app-db` inspection | `(rf/get-frame-db id)` per-frame |
| Registered handlers + metadata | `(rf/handlers kind)`, `(rf/handler-meta kind id)` |
| Sub-graph topology | `(rf/sub-topology)` (static; JVM-runnable) |
| Sub-cache state | `(rf/sub-cache id)` (CLJS-only) |
| Frame enumeration | `(rf/frame-ids)` |
| Frame metadata | `(rf/frame-meta id)` |
| Hot-reload notifications | Trace events: `:registry/handler-registered`, `:registry/handler-cleared`, `:frame/created`, `:frame/destroyed` |

All of this is in [002-Frames.md §The public registrar query API](002-Frames.md#the-public-registrar-query-api). 10x's existing reading patterns (against `rf.db/app-db` directly) need updating to use the public query API in a multi-frame world; the private `re-frame.db/app-db` is off-contract per M-1.

## Open questions

### I-1. Trace allocation cost in dev when no listeners

When a listener is *never* registered, the macros' compile-time gate doesn't help — `is-trace-enabled?` is true (dev), so the body runs. The body should fast-fail when `(empty? @trace-cbs)`. Confirm the emit macros do this check before allocating the trace map; profile against eager allocation if uncertain.

### I-2. Listener ordering

Multiple listeners exist (10x + re-frame-pair + custom). Order is by registration time (FIFO map iteration). Locked: tools should not depend on order, since batched delivery means each listener gets the same collection independently.

### I-3. ~~Trace correlation across the cascade~~ — *resolved.*

Use the existing `:child-of` field (parent trace id). 10x's epoch grouping already relies on this; re-frame2 preserves it.

### I-4. Trace event for app-db changes

`:db` mutations happen inside `do-fx`. Today's re-frame already captures `:app-db-before` and `:app-db-after` in the `:event` trace's `:tags`. Sufficient for 10x's purposes; no separate `:app-db/changed` event needed. Locked.

### I-5. Privacy / sensitive data in traces

Trace events contain dispatched event vectors, which may include user input (passwords, PII). Tools that ship traces (e.g., to Sentry) must redact. Recommendation: provide a `:sensitive?` tag that handlers can set; a `with-redacted` interceptor pattern that strips sensitive args before emit. Worth a documented pattern in v1.x; not blocking for v1.

## Disposition

**v1.** Tracing ships in v1 because 10x depends on it. The Chrome Performance API integration ships in v1 as opt-in (small to add; useful for early adopters profiling). The forward-compat commitments are stated now and locked.

The substrate is small — trace events are data, listeners are functions, cheap-path is one atom-deref. Most of the work is in defining the event taxonomy and getting the discipline right.

Post-v1 work this enables:

- 10x evolution (UI changes, new panels, new integrations) without re-frame2 changes.
- re-frame-pair evolution (smarter agent workflows) without re-frame2 changes.
- New tools (custom dev panels, observability platforms, learning agents) using the same trace surface.

The forward-compat commitments turn this from "current tooling support" into "infrastructure for any future tool."
