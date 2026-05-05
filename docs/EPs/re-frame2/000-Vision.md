# EP 000 — re-frame2 Vision

> Status: Drafting. Captures the load-bearing decisions that govern the rest of the re-frame2 EPs. Do not treat individual sentences as final — the structure and stances are the contract; details inside are working drafts.

## Abstract

re-frame2 is the next major version of re-frame. It consolidates the long-Drafting/Placeholder Enhancement Proposals (EPs 001–005) into a coherent, ship-able design. This document is the meta-EP: it states the goals, the principles that resolve trade-offs between them, and the architectural decisions that the per-EP documents must respect.

The headline shape of re-frame2:

- **Frames** become first-class, keyword-identified entities (EP 002).
- **Registration** gains rich metadata via opt-in metadata maps (EP 001).
- **Views** can be registered (`reg-view`) so they become frame-aware (EP 004).
- Existing re-frame code keeps working subject to a **small, well-defined set of breakages** (enumerated in C1 below and detailed in [MIGRATION.md](MIGRATION.md)); new features are additive opt-ins.

## Constraints and goals

re-frame2's design is governed by **two hard constraints** that must always hold, and **five goals** the design optimises for. When a constraint conflicts with a goal, the constraint wins. When goals conflict, the higher-priority goal wins. The architectural disciplines (downstream EPs consume foundation; no core.async; MIGRATION.md kept in sync) are derived from these.

## Hard constraints

A constraint is binary: a design either satisfies it or fails the spec.

### C1. Backwards compatibility via mechanical migration

re-frame2 may make API changes that break existing re-frame code, but **every breaking change must be mechanically repairable by an AI agent following [MIGRATION.md](MIGRATION.md).** The combination of a clean API surface and a reliable upgrade prompt replaces the older "minimise breakage in the artefact" stance — users upgrade by running the migration agent against their codebase, not by hoping their code happens to still compile.

The aim is still to *minimise* breaking changes — every additional rule the agent has to apply is a footprint of disruption. But breakage is no longer disqualifying when the alternative is a worse API.

#### A breaking change is acceptable if all of these hold:

- **Detectable.** The pattern in user code is unambiguously identifiable by static inspection (e.g., a particular keyword in an effect map; a particular function-as-value used in `apply`; a specific call shape).
- **Mechanically rewritable.** The replacement is a structural transform — `(old-form ...)` → `(new-form ...)` — not a judgment call about intent.
- **Behaviour-preserving** in the common case. The rewrite produces code that observably behaves identically for typical usage.

#### A breaking change is *not* acceptable (and is a design failure) when:

- The pattern requires dynamic analysis to detect (runtime types, timing-sensitive control flow).
- The rewrite requires understanding intent (e.g., "did this code rely on the order in which two `:dispatch` effects fired?").
- Side-effects can be silently reordered with observable consequences.

Such cases must either be solved *without* breakage, or documented as a **flag-for-human-review** migration where the agent halts, explains the situation, and asks the user to decide.

#### Migration classification

Each migration rule in [MIGRATION.md](MIGRATION.md) is tagged **Type A** (fully mechanical; agent applies without asking) or **Type B** (semantic flag; agent identifies call sites and asks for human review). The current rule set, classifications, and detection patterns are documented there; this section's contract is the *concept*, not the enumeration.

#### Failure mode

A breaking change that the agent can't reliably handle is a design failure: the constraint is to keep MIGRATION.md *executable*. New design decisions get vetted by asking "could the agent rewrite this?" before they land.

#### Upgrade-with-tests assumption

For AI-driven migration to be reliably safe, the user's codebase needs a working test suite. Users with tests get clean upgrades; users without tests are at higher risk for the Type-B rules. MIGRATION.md should make this expectation explicit.

### C2. Cross-platform: JVM interop preserved

re-frame currently uses `re-frame.interop` (with separate `.clj` and `.cljs` implementations) to allow tests and headless evaluation to run on the JVM, not just in JavaScript runtimes. **re-frame2 preserves this.** The benefits are real: faster test runs, cleaner test setup, easier integration with JVM-side tooling, and headless agent/test scenarios that don't need a JS runtime.

#### What is JVM-runnable in v1

- Dispatch pipeline (router, queue, run-to-completion drain).
- Frame registry, frame lifecycle (`reg-frame`, `make-frame`, `destroy-frame`).
- Event handler invocation (`reg-event-db` / `-fx` / `-ctx`).
- Override application (`:fx-overrides`, `:interceptor-overrides`, `:interceptors`).
- `app-db` mutation and snapshot reading.
- Cofx injection.
- Machine transition evaluation (`machine-transition` is a pure function; `machine-handler` produces a JVM-runnable event handler body).
- Sub-graph *static topology* (`sub-topology` — the dependency graph derived from `:<-` declarations, pure data from the registrar).
- Sub-graph *computation* (computing a sub's value from `app-db` directly, without the reactive-tracking layer).
- The public registrar query API (`handlers`, `handler-meta`, `frame-ids`, `frame-meta`, `get-frame-db`, `snapshot-of`, `sub-topology`).

These cover the entire business-logic layer — enough for `deftest`-style unit and integration tests without a JS runtime.

#### What is *not* JVM-runnable in v1

- **View rendering.** `reg-view`, `frame-provider`, hiccup interpretation, React/Reagent — all CLJS-only. The substrate-decoupling work in OQ-7 may eventually move some of this into JVM-runnable territory, but it's out of scope for v1.
- **Reactive subscription tracking.** The signal-graph reactivity (auto-tracking, dispose lifecycle) is currently Reagent-specific and CLJS-only. Subscription *computation* (running a sub's body against an `app-db` value) and *static topology* (the dependency graph from `:<-` declarations, queryable via `sub-topology`) are JVM-runnable; the reactive-update mechanism and the runtime cache state (`sub-cache`) are not.

#### Implementation rules

- New code lives in `.cljc` files where possible; platform-specific bits stay behind the `re-frame.interop` namespace.
- Any per-EP design that adds a new primitive must either (a) be pure data and `.cljc`, or (b) clearly identify what goes into `interop.clj` vs `interop.cljs`.
- The substrate-decoupling work in OQ-7 must consider both targets — any new reactive substrate primitive needs JVM and CLJS implementations behind the interop seam.

**Failure mode:** any v1 primitive that's listed as "JVM-runnable" but accidentally requires a JS runtime is a design failure. The API surface is cross-platform-friendly because everything is data; the discipline is keeping platform-specifics behind the interop seam.

## Goals (in priority order)

A goal is an optimization axis: the design tries to maximise it, and may fall short. Higher-priority goals win when goals conflict.

### G1. No cultural shift in single-frame ergonomics

A single-frame app written from scratch in re-frame2 looks identical to today's re-frame. Plain `(rf/dispatch [:foo])` and `@(rf/subscribe [:bar])` work without any frame argument and without `frame-provider` ceremony. The multi-frame use case never makes the single-frame case worse.

### G2. Instrumentation & introspection are first-class

Every registered entity (event, sub, fx, cofx, frame, view, interceptor) carries rich metadata: source coordinates, docstrings, optional Malli schemas. The registrar is a queryable public API, not a private detail. Tooling (re-frame-10x and others) is a *primary client of re-frame's API*, not an afterthought.

A motivating use case for this goal: a CLJS-purposed **Storybook-class tool** — story-by-story rendering of components in isolation, with discoverable metadata, isolated state, and hot reload — should fall out of the introspection surface, not require parallel infrastructure. See [007-Stories.md](007-Stories.md) for the design sketch.

### G3. Agent-amenability

re-frame-pair-shaped interaction (an AI agent attached via nREPL, inspecting/dispatching/hot-swapping a running app) must continue to work in the multi-frame world, and benefit from the richer metadata. re-frame2 does not reinvent agent-facing transports — re-frame-pair handles that — but its architecture must not block or degrade the interactions re-frame-pair already supports.

### G4. Testing is first-class

Tests are a primary use case re-frame2 designs for, not a workflow developers reverse-engineer. The framework provides the substrate to write small, fast, isolated tests without ceremony or global-state pollution.

The substrate, in summary:

- **Frames isolate test state.** Each test runs in its own frame; no leakage. `make-frame` + `destroy-frame` is the fixture lifecycle.
- **Per-call and per-frame overrides** (`:fx-overrides`, `:interceptor-overrides`, `:interceptors`) — primary use case is testing.
- **Run-to-completion drain** makes tests deterministic.
- **Pure machine transitions** — `(machine-transition def snapshot event)` callable without a frame.
- **Headless evaluation** of subs and machines doesn't need a rendering substrate.
- **JVM-runnable** — test suites run on JVM (per C2).

The concrete v1 API, patterns, framework adapters, and forward-compatibility with stories live in [EP 008 — Testing](008-Testing.md). Stories layer on top post-v1 ([EP 007](007-Stories.md)).

When designing any per-EP feature, ask: "how is this tested? does it need a JS runtime? does it leak state between tests?" If the answer to either of the latter two is "yes," reconsider the design.

### G5. State machines and actors are first-class at the foundation; the library is post-v1

re-frame2 commits to making state-machine-flavoured code and actor-style composition *expressible* in v1 directly via the foundation hooks. The *ergonomic library* that turns them into one-liners ships post-v1.

**v1 (locked, in [002-Frames.md](002-Frames.md)):**

- **Run-to-completion drain semantics** provide the determinism actor-style composition needs. Two machines composing within a frame settle atomically per external event; views never see the intermediate state.
- **Machines are event handlers.** The transition-table-as-handler-body pattern, `:machine-path` metadata, and pure transition contract are foundation hooks. No new substrate is introduced — machines consume the foundation.
- **Frames are actor-system boundaries.** All machines in a frame share its router queue and run-to-completion cascade; cross-frame dispatch is async. Multi-frame apps host multiple independent actor systems on one page.
- **Definition shape is data.** Transition tables are pure data: serialisable, sharable, AI-readable, visualisable. Implementations (guards, actions) are co-located but separable, following xstate's `setup(...).createMachine(...)` split.
- **Inspection rides the existing trace surface.** Machine lifecycle and transitions emit ordinary trace events with `:source :machine`; tools (10x, re-frame-pair, agents) get them for free.

In v1, writing a machine looks like a `reg-event-fx` with a metadata-tagged handler whose body interprets a transition table — verbose but coherent.

**Post-v1 (per [EP 005](005-StateMachines.md)):**

- The `re-frame.machines` library — `machine-handler` helper, `make-machine-instance`, transition-table grammar (guards, actions, hierarchy, parallel, history), `:child-machine` declaration sugar, paste-and-render compatibility with stately.ai. Prototyped externally; promoted to in-tree once stable.

When designing any per-EP feature in v1, ask: "does this design make state-machine and actor patterns harder to express *at the foundation level*?" If yes, reconsider — even if the library is post-v1, the foundation must support the patterns.

### G6. Enable the use of schemas

Schemas describe shapes — of `app-db`, of dispatched events, of subscription return values, of fx args, of cofx data. re-frame2 makes schemas a first-class, opt-in capability across every registered entity, with a documented preference for **Malli** as the spec library.

Concretely:

- Every `reg-*` accepts an optional `:spec` (Malli schema) in its metadata map. Absent → no validation, identical to today's behaviour.
- `app-db` schemas register at paths via `reg-app-schema`, including the empty path `[]` for a whole-`app-db` root schema.
- In dev builds, schemas validate at appropriate points (event before handler runs; sub return after compute; `app-db` after each handler). In prod builds, validation is elided or restricted to system boundaries.
- Schemas are queryable from the registrar — tools (10x, agents) read them to render shape information, validate intent before dispatching, generate test data.

The full design — registration shape, validation timing, dev-vs-prod elision, JSON-Schema/OpenAPI generation, agent reasoning — lives in [010-Schemas.md](010-Schemas.md).

When designing any per-EP feature, ask: "is the data this introduces describable as a schema, and is there a way to attach one?" Schema-friendliness is a design tiebreaker.

## Scope

re-frame2 v1 consolidates the original EPs 001–005 plus two new EPs (008 and 009) that are required for the v1 contract.

**v1-required (ships with v1):**

1. **EP 001 — Capture Handler Metadata.** Registration calls accept a metadata map. Foundation for everything below.
2. **EP 002 — Multiple re-frame Instances.** Frames become keyword-identified, registered runtime entities sharing one global handler registrar.
3. **EP 003 — Reusable Components.** Subsumed by EP 002 + EP 004 — the React-context mechanism EP 003 wanted is delivered by `frame-provider` and `reg-view`.
4. **EP 004 — View Registration.** `reg-view` becomes the multi-frame contract for views.
5. **EP 008 — Testing.** Test fixtures, synchronous triggers, per-test stubbing, headless sub/machine evaluation, framework adapters. v1 cannot ship without a coherent testing story.
6. **EP 009 — Instrumentation, Tracing, Performance.** Trace event stream, `register-trace-cb` API, hot-path discipline, Chrome Performance API integration, forward-compat commitments to re-frame-10x and re-frame-pair. v1 cannot ship without it because 10x depends on traces.
7. **EP 010 — Schemas.** Malli-based schemas on every `reg-*` and on `app-db` paths; validation timing, dev-vs-prod elision, boundary-validation interceptor, tooling integration. v1 ships this so apps can specify and validate shapes from day one.

**Post-v1 (foundation hooks ship in v1; ergonomic libraries land later):**

7. **EP 005 — State Machines.** Builds on the foundation hooks in 002 (machines are event handlers; transition-table interpreter as handler body; `:machine-path` metadata; pure transition contract; inspection events on the trace surface). Independent of EP 004 — machines emit ordinary effects; views are rendered like any other state. Deferred for ecosystem-maturity reasons, not technical dependency.
8. **EP 007 — Stories, Variants, Workspaces.** Storybook-class tooling. Layered on EPs 002 and 008. Library is post-v1; foundation hooks ship in v1.

**Feasibility-gated:**

9. **EP 006 — Reactive Substrate.** Substrate-agnostic re-frame and/or cooperative rendering substrate (Reagent decoupling). Cost-benefit gated; investigated post-v1.

## Out of Scope for v1

- **Multiple different apps on one page** (a Todos app and a Fitness app with disjoint handler sets sharing a single page). Real demand exists (micro-frontends, embedded white-label widgets), but the design tax — every library author having to think about which apps it installs into; per-frame handler registries; package/scope filters — is too high. iframes already serve this need and are the recommended approach. Out of scope, full stop. (Multi-frame in re-frame2 is "multiple instances of the *same* app's handlers" — devcards, widgets, story variants, test fixtures — which is a different and well-supported case.)
- **State machines as a shipped library** — EP 005 (state machines) is post-v1 for ecosystem-maturity reasons. The foundation hooks it consumes (machines as event handlers; transition-table-as-handler-body; `:machine-path` metadata; pure transition contract) ship in v1 inside [002-Frames.md](002-Frames.md); the actual `re-frame.machines` library prototypes against those hooks externally and gets promoted once stable. EP 005 does **not** depend on EP 004.

## Backwards compatibility

### Namespace strategy

The default plan is **a single `re-frame.core` namespace**, with backwards compatibility achieved by *overloading*: registration macros inspect their arguments and dispatch to the legacy or new code path based on argument shape.

```clj
;; old form — vector of interceptors in the middle slot
(reg-event-fx :foo
  [interceptor-1 interceptor-2]
  (fn [ctx event] ...))

;; new form — metadata map in the middle slot
(reg-event-fx :foo
  {:doc          "..."
   :interceptors [interceptor-1 interceptor-2]
   :spec         FooEventSchema}
  (fn my-foo-handler [ctx]
    ...))
```

The macro discriminates on the type of the second argument: vector → legacy path, map → new path. Both forms live in the same `reg-event-fx` symbol.

### `re-frame.core-legacy` as a safety valve

A `re-frame.core-legacy` namespace exists as an escape hatch for any feature that genuinely cannot be made backwards-compatible via overloading. It is not the default migration path — it is the place we put things that turn out to be irreducibly incompatible. If nothing ends up there, the namespace can be omitted entirely.

### Coexistence of old and new code

Because everything defaults to `:re-frame/default` (see Frames, below), an app mid-migration — some namespaces using the legacy form, some using the new metadata-map form — automatically shares one `app-db`, one event queue, and one sub-graph. No bridge is needed.

### Compat scope = public API only

Backwards-compatibility commitments cover the public API at `re-frame.core`. Private namespaces (`re-frame.db`, `re-frame.router`, `re-frame.subs`, `re-frame.events`, etc.) carry no compat guarantee. Clients reaching into them are off-contract; they migrate at their own cost. This frees re-frame2 to restructure internals freely — `app-db` can move into the default-frame's record, internal queue/sub-cache shapes can change, etc.

## Frames (EP 002 territory)

### Single global handler registrar; multiple frames share it

re-frame2 supports **multiple instances of the same app** (devcards, isolated widgets, story variants, serial test fixtures). All frames share **one global handler registrar**. Frames isolate `app-db`, router, and sub-cache — not handlers.

Library implication: re-frame-undo and friends need **no awareness of frames**. They register handlers/interceptors globally as today; their interceptors read the *event's* frame metadata at runtime and operate on the right `app-db`. Zero ecosystem disruption.

The "multiple different apps with different handler sets on one page" case is explicitly out of scope — see [§Out of Scope](#out-of-scope-for-v1).

### Frames are keyword-identified

Frames are identified by keyword and stored in a global frame registry mapping `:keyword → frame`. This mirrors how every other re-frame entity (events, subs, fx, cofx) is identified: by keyword, looked up in a registry. Frame *values* are an internal detail; user code holds keywords.

Wins from keyword-identity:

- **Hot reload:** re-register the frame under the same keyword, every consumer picks up the new frame on next render.
- **Tooling/10x:** keywords serialize over the wire; frame records don't.
- **Closures over identifiers:** callbacks closing over `:todo` are trivial; closures over frame values are awkward.

A frame's runtime contents are roughly:

```clojure
{:id           :todo
 :app-db       (reagent/atom {})
 :router       ...   ;; per-frame queue/scheduler state
 :sub-cache    ...   ;; per-frame reactions/sub graph
 :lifecycle    {...} ;; created/destroyed status, listeners
 :config       {...}}
```

### `:re-frame/default` is the universal fallback

A default frame is registered at re-frame load time under the keyword `:re-frame/default`. It is a **regular registry entry** — same lookup path as any other frame, listable in tooling, in principle overridable.

If no frame is otherwise specified — no metadata on the event, no surrounding `frame-provider`, no other entries in the registry — every dispatch and subscription routes to `:re-frame/default`. Today's re-frame is, structurally, "re-frame2 with only the default frame, and all events go there."

This is the cornerstone of backwards compatibility: existing code with zero awareness of frames continues to work because everything it does flows through `:re-frame/default`.

### Events carry frame identity

The runtime mechanism that routes a dispatch to the correct frame is **frame identity carried on the event itself**. Conceptually each in-flight event is a "dispatch envelope" that includes the frame keyword (alongside the user-facing event vector and any system fields like trace ids). The router reads the envelope's frame, looks up the frame in the registry, and processes accordingly.

User-facing event shape stays as a **vector** (per C1 — backwards compatibility). The richer envelope is an internal detail. Tooling and agents read the envelope; user handlers see the vector they always saw.

### Frame routing in views: React context carries the keyword

`frame-provider` is a React Context provider that puts a **frame keyword** (not a frame value) into context:

```clojure
[rf/frame-provider {:frame :todo}
 [todo-list]]
```

Inside that subtree, `reg-view`-registered views read the keyword from context at render time and use it to look up the frame. Multiple frames coexist in one React tree because each subtree can have its own context value.

## Views

`reg-view` is the multi-frame contract for views. Registered views get frame-bound `dispatch`/`subscribe` injected as lexical locals; plain Reagent fns continue to work but target `:re-frame/default`. Hiccup invocation is via explicit `(get-view :id)`, Var reference, or the opt-in `(h [:my-view ...])` macro.

Full design — `reg-view` API, hiccup forms, Form-1/2/3 component handling, plain-Reagent-fn boundary, EP 003 subsumption, view registry — lives in [004-Views.md](004-Views.md). Frame-side mechanics (React-context resolution, `frame-provider`, callback closure capture) live in [002-Frames.md §View ergonomics](002-Frames.md#view-ergonomics-the-hard-part).

## Registration shape (EP 001 territory)

### Metadata map replaces the interceptors-vector slot

For every `reg-*` function, the middle "interceptors" slot can now be either a vector (legacy) or a metadata map (new). The handler signature itself is preserved from master:
- `reg-event-db` takes `(fn [db [_ args]] ...)`.
- `reg-event-fx` accepts **either** `(fn [m] ...)` (single-arg, the recommended re-frame2 form) **or** `(fn [m event-vec] ...)` (two-arg, master/legacy form). Both are first-class and behave identically — `event-vec` in the two-arg form is just `(:event m)`. The agent can mechanically migrate two-arg to single-arg if the user wants to modernise (purely cosmetic).
- `reg-event-ctx` takes `(fn [context] ...)`.

```clj
(reg-event-fx :foo
  {:id           :foo                 ;; informational; the explicit first-arg id is authoritative
   :doc          "..."
   :interceptors [...]
   :spec         FooEventSchema}
  (fn my-foo-handler [ctx]            ;; named for tooling/stack traces
    ...))
```

Metadata map keys (initial set; extensible):

- `:doc` — docstring. Captured at registration; queryable from the registrar; **elided from production builds**.
- `:interceptors` — the existing interceptor vector, just relocated into the map.
- `:spec` — Malli schema (see Specs, below).
- `:ns` / `:line` / `:file` — source coordinates. Auto-supplied by the macro; explicit override permitted.

Handler functions should be **named** (not anonymous lambdas) so their names appear in stack traces and tooling. The handler's name is informational only; the explicit first-argument keyword is the registered id.

### Source coordinates require macros

Capturing `:ns`/`:line`/`:file` and eliding `:doc` from production builds requires the registration functions to be **macros**. EP 001's macro budget is accepted: the existing `reg-*` functions become macros (overloaded to accept legacy and new shapes). `re-frame.core` exposes them under their existing names — there is no separate `reg` macro that supersedes them. The macros remain function-shaped to callers; the macro behaviour is transparent.

## Schemas

Malli is re-frame2's preferred schema library. Schemas are opt-in: every `reg-*` accepts a `:spec` metadata key; `app-db` schemas register at paths via `reg-app-schema` (including `[]` for a root schema). Validation runs in dev, elides in production, with a boundary-validation interceptor for system-boundary use cases.

Full design — registration shape, validation timing, dev-vs-prod elision, boundary-validation interceptor, tooling integration, JSON Schema/OpenAPI generation — lives in [010-Schemas.md](010-Schemas.md).

## Tooling and agent surface

### Source coordinates everywhere

Every registration captures `:ns`/`:line`/`:file`. The registrar is a queryable public API; tooling reads it to build app maps, navigate to source, render docstrings, validate intent, etc.

### Per-frame inspection

The frame registry is REPL-accessible. Tools and agents can ask:

- "What frames exist?" — `(rf/frame-ids)`, optionally filtered by namespace prefix.
- "Give me the `app-db` of frame `:todo`." — `(rf/get-frame-db :todo)`.
- "Show me a frame's metadata (config, source coords, lifecycle status)." — `(rf/frame-meta :todo)`.
- "Dispatch this event into frame `:todo`." — `(rf/dispatch [:foo] {:frame :todo})`.
- "Re-register frame `:todo` with new config." — `(rf/reg-frame :todo {…new-config…})`; frame-level hot-swap (see OQ-F-1).

Runtime frame *records* are an internal detail; user code holds keywords and uses public helper functions to read frame state. There is no public `(get-frame :todo)` returning a record.

### Six-dominoes trace and 10x

Each frame has its own router queue and sub-cache, so traces are per-frame. 10x's epoch buffer extends to identify which frame an epoch belongs to. This requires coordination with 10x — flagged as a parallel work-stream, not part of 000.

### Hot-swap remains observable

Re-registering a handler, sub, or frame is observable: a notification fires that re-frame-pair, 10x, and other tools can subscribe to and refresh their state. (Concrete shape: a re-frame-internal pub/sub or a tap-style hook — design detail for a per-EP doc.)

### Machine-readable errors

re-frame2 errors at runtime are maps with documented keys, not formatted strings: `{:phase :event-handler :event [:foo 1 2] :frame :todo :handler-id :foo :reason ...}`. Stringification is a presentation detail; the error data is the contract.

## Migration

The full migration spec — the M-rules, O-rules, classifications, what stays the same, agent verification steps — lives in [MIGRATION.md](MIGRATION.md). It is the executable contract for the AI-driven upgrade path under [C1](#c1-backwards-compatibility-via-mechanical-migration). 000 records the principle (mechanical AI-repair); MIGRATION.md owns the details.

## Open questions

These are deliberately not resolved in 000. They are recorded so per-EP documents can address them.

### OQ-1. Closure-capture for plain Reagent fns inside multi-frame subtrees

`reg-view` solves the closure-capture problem for registered views via lexical injection. Plain Reagent fns rendered inside a non-default `frame-provider` silently route to `:re-frame/default` — a footgun. Options for v1:

- (a) Document the limitation; fix in a future version.
- (b) Provide a render-time helper (`(rf/dispatcher)`) plain fns can use when authors want frame-awareness without registering.
- (c) Reagent-level cooperation that captures frame at every component mount.

Working assumption: (a) for v1, with (b) considered as a small affordance.

### OQ-2. Event shape: vector vs. richer envelope — *resolved*

Public shape is a vector (locked). The internal dispatch envelope adds `:frame`, `:trace-id`, `:source` alongside the user-facing `:event` vector. Handlers see these as additional keys in their `m`; they don't see the envelope as a separate shape. Detailed in [002-Frames.md §Routing: the dispatch envelope](002-Frames.md).

### OQ-3. Exact contents of the handler's context map — *resolved*

`reg-event-fx`-style handlers receive `m`, the existing cofx-context map, with re-frame2 *additively* gaining three new keys: `:frame` (always present), `:trace-id` (optional), `:source` (optional, e.g., `:ui`/`:timer`/`:http`/`:machine`/`:repl`). Both single-arg `(fn [m] ...)` and two-arg `(fn [m event-vec] ...)` forms are first-class — the two-arg form's `event-vec` is just `(:event m)`. Existing handlers continue to work; the new keys are additive. `reg-event-db` and `reg-event-ctx` handler signatures unchanged.

### OQ-4. ~~`reg-frame` shape~~ — *resolved.*

Both ship: `reg-frame` is atomic (named, register-and-create, matches every other `reg-*`); `make-frame` (anonymous, gensym'd-keyword, register-and-create) covers per-instance widget/test/devcard cases. See [002 §Per-instance frames](002-Frames.md#per-instance-frames--anonymous-make-frame).

### OQ-5. Macro budget — final accounting

Confirmed macros: `reg-event-db`, `reg-event-fx`, `reg-event-ctx`, `reg-sub`, `reg-sub-raw`, `reg-fx`, `reg-cofx`, `reg-view`, `reg-frame`, `reg-app-schema`. (All registration is macro-based to capture source coords and elide docstrings in prod.)

Possibly macros: `with-frame` (test/REPL helper, dynamic-binding flavored).

Not macros: `dispatch`, `dispatch-sync`, `subscribe`. All are functions accepting an optional opts-map second argument. `reg-view`'s lexical injection handles the multi-frame ergonomics inside views without making them macros. re-frame2 does **not** ship `dispatch-to`, `dispatch-with`, or `dispatch-sync-with` — the two-arg form covers those cases.

### OQ-6. Event-id re-registration warnings

Hot-reloading the same handler under the same id is normal and expected (figwheel/shadow-cljs save). But re-registering with a *different* function — accidentally, e.g. two namespaces colliding on `:save` — is silent last-write-wins. Open question: how loud should re-frame2 warn at registration time, and is the warning on by default? Linked: 002 §OQ-F-3.

### OQ-7. The re-frame / Reagent fusion (worth considering, cost-benefit gated)

Today's re-frame is tightly coupled to Reagent — subscriptions *are* Reagent reactions, `app-db` is a Reagent ratom, the signal graph is built from Reagent's reactive primitives. This couples re-frame to Reagent's release cadence, locks out non-Reagent consumers (UIx, Helix, headless/server-side, simpler test harnesses), and forces re-frame's view-side ergonomics to work *around* Reagent rather than *with* a cooperative substrate.

This open question has two ends — both leading to the same outcome of re-frame and Reagent being unfused.

#### (a) Substrate-agnostic re-frame

re-frame2 decouples from Reagent at the architectural level, while keeping Reagent as the default rendering adapter so existing apps don't break.

Feasibility read:

- **Tractable:** subscription graph topology, cache, and `app-db` can all live as re-frame-owned data structures with no Reagent dependency. Headless evaluation of subs against a given `app-db` becomes a straightforward public API.
- **Harder:** auto-tracking deref dependencies during view render is library-specific. re-frame2 either reimplements a small reactive system end-to-end (real engineering project) or stays pluggable at the leaf — a Reagent adapter, a UIx adapter, a tests adapter, etc.
- **Backwards compat:** the user-facing `@(subscribe [:foo])` must keep returning something Reagent-compatible when used inside Reagent views. The pluggable-adapter approach handles this naturally.

#### (b) Cooperative rendering substrate

A rendering layer designed to cooperate with re-frame natively, instead of re-frame wrapping Reagent. Either a Reagent rewrite or a partnership/fork of UIx/Helix. What such a layer could deliver:

- **Native keyword-tagged views in hiccup.** `[:my-view ...]` resolves to a registered render fn at the rendering-layer level — EP 004 becomes trivial; hiccup becomes truly data-oriented (a precondition EP 005 wants).
- **First-class frame context.** No `frame-provider` ceremony — the frame keyword flows through the component tree natively.
- **Closure-capture for callbacks solved at the layer with visibility into hiccup construction**, not via macros.
- **Modern React 18+ usage**, concurrent-rendering-aware. Reagent's reaction model dates from React 16 and has some friction with newer React.
- **Better source-coord preservation** through compilation.

#### Disposition

**Not a v1 principle.** This is recorded as a direction worth considering — the benefits of either (a) or (b) must clearly outweigh the engineering and ecosystem-disruption costs before any commitment is made. The two ends of the axis are complementary; (a) and (b) could even be pursued together (substrate-agnostic re-frame *plus* a cooperative substrate as one of several adapters).

If feasibility work on (a) confirms the pluggable-adapter approach is tractable, promote it to a v1 deliverable as **EP 006 — Reactive Substrate**. (b) is a multi-version horizon question, not v1.

#### Provisional v1 commitment regardless

Design the public API of subscriptions so it does not *foreclose* on this decoupling. Specifically — never expose Reagent-specific types or methods at the `re-frame.core` boundary (no leaking of `reagent.core/atom`, `reagent.ratom/Reaction`, etc. as documented return types). This keeps the option open even if v1 ships fused with Reagent.

