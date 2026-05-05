# EP 005 — State Machines

> Status: Drafting. Builds on the foundation hooks in [002-Frames.md §State machines are just event handlers](002-Frames.md). This EP is the per-area design that the foundation supports — patterns, grammar, library API. Disposition is **post-v1**: ship the foundation in v1, prototype the machine library against it, promote when stable.

## Abstract

A state machine in re-frame2 is an event handler whose body interprets a transition table. The framework provides nothing new for machines beyond the foundation hooks already in 002 — drain semantics, the snapshot shape, the `:machine-path` metadata convention, and the inspection trace surface. This EP fills in the *patterns and grammar* that turn those hooks into a usable state-machine library.

The design draws on xstate where xstate's choices fit re-frame's grain (definition/instance split, pure transition function, serialisable transition data, inspection events) and diverges where they don't (no `ActorRef` runtime objects, no per-actor mailbox, no `raise`/`sendTo` distinction). See "Lessons from xstate" at the bottom for the deliberate divergences.

## Why machines

Two distinct use cases that the original EP 005 conflated:

1. **High-level workflow.** Multi-step user flows (signup → verify → onboard → home), modal dismissal logic, wizard navigation. Today these get smeared across many event handlers and an `:app/screen` keyword in `app-db`. The smearing is the pain.
2. **Low-level protocols.** Async resource lifecycles (HTTP request: `idle → loading → success/error/retry`), websocket connection states, animation transitions. Today these live as ad-hoc keywords in some sub-tree of `app-db`, with handlers that have to remember "if state is `:loading`, ignore another `:fetch`."

Both want the same primitive but the ergonomics matter differently — workflow machines are few and named (one per major subsystem); protocol machines may have many concurrent instances (one per active resource).

## What 002 already gives us (recap)

[002 §State machines are just event handlers](002-Frames.md) commits the following at the foundation level:

- **Three-way conceptual split:** definition (data), instance (snapshot at a path), frame (actor-system boundary).
- **Snapshot shape:** `{:state <discrete> :context <extended>}`, with `:state` supporting flat/hierarchical/parallel forms.
- **Pure transition contract:** `(machine-transition definition snapshot event) → [next-snapshot effects]`.
- **Glue helper:** `(machine-handler path definition)` returns an event-handler fn for `reg-event-fx`.
- **Definition shape:** transition table is pure data; guards/actions/delays referenced by id; implementations co-located but separable.
- **Inspection:** lifecycle/transition events emitted on the existing trace surface with `:source :machine`.
- **Composition:** ordinary `dispatch` between machines, made deterministic by drain semantics.
- **Discipline:** no new registries, no new dispatch types, no new effect substrate, no `ActorRef` runtime objects.

This EP describes everything else.

## Lifecycle patterns

xstate has two lifecycle modes — `invoke` (state-scoped, automatic) and `spawn` (dynamic, manual). re-frame2 collapses these to a single mechanism (machine state at a path; presence of state means the instance exists) with two **patterns** layered on top.

### Pattern A — state-scoped child machines (xstate's "invoke")

A child machine that exists only while its parent is in a particular state. Encoded as entry/exit actions that create and destroy the child snapshot:

```clojure
;; explicit form
{:states
 {:loading {:entry [{:assoc-in [[:request :state-machine] initial-request-snapshot]}]
            :exit  [{:dissoc-in [[:request :state-machine]]}]
            :on    {...}}}}

;; with library sugar
{:states
 {:loading {:child-machine {:definition request-machine-table
                            :impls      request-machine-impls
                            :path       [:request :state-machine]}
            :on            {...}}}}
```

`:child-machine` desugars at registration time to entry/exit actions that materialise/destroy the child instance, and to a `:machine-path` registration for the child handler. The child's own events route to its handler via the standard pipeline.

### Pattern B — dynamic long-lived child machines (xstate's "spawn")

Many concurrent instances of a definition, each with an independent lifetime — one per active HTTP request, one per chat connection, one per animation in flight. State lives under a collection at a parent path; instance ids gensym'd or supplied; cleanup is explicit.

```clojure
(rf/make-machine-instance
  {:definition request-machine-table
   :impls      request-machine-impls
   :collection [:requests]              ;; instances live under [:requests <id>]
   :id-fn      gensym})
;; → returns the assigned id

;; later:
(rf/destroy-machine-instance [:requests <id>])
```

Parallel to OQ-F-10's `make-frame` for frames. Cleanup is the user's responsibility (or wired via component unmount in views).

### When to use which

- **Pattern A** when the child machine's existence is *logically tied* to a parent state. The state-bound lifetime guarantees no leaks.
- **Pattern B** when the count and lifetime are dynamic and not tied to a parent's state. Pay the cleanup tax in exchange for flexibility.

These names — A and B, or "state-scoped" and "dynamic" — are how the docs should explain it. Use "invoke" and "spawn" only in prose to bridge for readers from xstate; don't bake those names into the API.

## Transition table grammar

The full grammar a `machine-handler` is expected to interpret. Each subsection is one feature; deferred features explicitly marked.

### State nodes

Every state in `:states` is a map with optional keys:

```clojure
{:on        {<event-id> <transition-spec>, ...}     ;; event-driven transitions
 :entry     [<action-id-or-effect> ...]              ;; ran on entering this state
 :exit      [<action-id-or-effect> ...]              ;; ran on exiting this state
 :always    [<eventless-transition> ...]             ;; eventless transitions — see deferred
 :child-machine {...}                                ;; pattern A
 :states    {...}                                    ;; for compound (hierarchical) states
 :type      :parallel}                               ;; for parallel state nodes
```

### Transitions

A transition spec for `:on` may be:

```clojure
;; minimal — just a target
{:on {:auth/login-pressed :validating}}

;; with guard and actions
{:on {:auth/login-pressed
      {:target  :validating
       :guard   :email-valid?
       :actions [:record-attempt :clear-form]}}}

;; multiple candidates with guards (first matching wins)
{:on {:auth/login-pressed
      [{:target :rate-limited :guard :over-limit?}
       {:target :validating   :guard :email-valid?}
       {:target :rejected}]}}                        ;; fallthrough
```

### Guards

Predicates over snapshot + event. Referenced by id in the definition; functions live in `:impls/:guards`:

```clojure
{:guards
 {:email-valid? (fn [snapshot event] ...)
  :over-limit?  (fn [snapshot event] ...)}}
```

Guards return truthy/falsy; no side effects; pure functions of the inputs.

### Actions

Functions returning effect maps. Referenced by id; live in `:impls/:actions`:

```clojure
{:actions
 {:record-attempt  (fn [snapshot event] {:dispatch [:audit/attempt ...]})
  :fire-validation (fn [snapshot event] {:http {:url "..."} :dispatch [...]})}}
```

Action effect maps are merged into the event-handler's output by `machine-handler`. Multiple actions on a transition merge (later actions overlay earlier on conflict; the merge strategy is configurable per fx if needed).

### Entry / exit / transition action ordering

For each event, the runtime applies actions in this order:

1. `:exit` actions of the state being left (in reverse-hierarchy order — innermost first).
2. Transition `:actions` (in declaration order).
3. `:entry` actions of the state being entered (in hierarchy order — outermost first).

This matches xstate and is the standard SCXML order. Worth committing to so users coming from any statechart literature have predictable behaviour.

### Hierarchical state

Compound states have their own `:states` map; the snapshot's `:state` value is a map showing the active path:

```clojure
{:initial :loading
 :states  {:loading {:initial :requesting
                     :states  {:requesting {:on {:got-data :idle.parent->next, ...}}
                               :retrying   {:initial :backoff
                                            :states  {:backoff {...}}}}
                     :on      {:cancel :idle}}      ;; bubbles up
           :idle    {...}}}
```

Snapshot value while in `:loading.retrying.backoff`:

```clojure
{:state {:loading {:retrying :backoff}} :context {...}}
```

### Parallel state

`:type :parallel` says regions are simultaneously active:

```clojure
{:type   :parallel
 :states {:network {:initial :checking, :states {...}}
          :form    {:initial :pristine, :states {...}}}}
```

Snapshot value:

```clojure
{:state {:network :checking, :form :pristine} :context {...}}
```

Each region transitions independently; events broadcast to all regions; each region's transitions are applied per the standard order.

### Deferred for v1.x

- **Eventless / `:always` transitions.** Self-firing transitions taken when their guard becomes true with no event. Useful but introduce microsteps that complicate the trace and the drain. Defer.
- **Delayed transitions / `:after`.** Time-based transitions. Encodable via `dispatch-later` from entry actions; the framework convenience can come later.
- **History states.** "Return to last sub-state of this compound state." Genuinely useful, especially for navigation, but a non-trivial implementation. Defer.
- **Final states with `onDone`.** xstate's pattern for parent-machine notification when a child completes. Encodable as a regular transition that dispatches a parent-targeted event. Library can sugar this when patterns shake out.

## Reply patterns

xstate's `sendTo` + `sender` lets a child reply to a specific request. In re-frame, no new API: include the reply event in the request:

```clojure
(rf/dispatch [:request/get-data
              {:url   "/data"
               :reply [:got-data <correlation-id>]}])
```

The handler dispatches `:got-data` (with the correlation id) when the response arrives. The drain cascade keeps the request and reply in the same atomic unit. This is just convention; document it.

## Library API surface

The `re-frame.machines` library exposes its operations in **two symmetric forms**, consistent with re-frame's data-oriented approach: a **function** for callers outside the dispatch pipeline (REPL, tests, view code, agent inspection), and an **fx** for callers inside a handler/action that returns an effect map. Both forms do the same work.

### Pure logic (no re-frame dependency)

```clojure
(rf/machine-transition definition snapshot event)
;; → [next-snapshot effects]
;; Pure. Testable, simulatable, agent-friendly.
```

### Glue (for `reg-event-fx`)

```clojure
(rf/machine-handler path definition)
;; → (fn [ctx event] ...) suitable as the body of reg-event-fx
;; Reads snapshot from ctx's :db at path, calls machine-transition, returns the effect map.
```

### Lifecycle — function and fx forms

```clojure
;; function form
(rf/make-machine-instance {:definition def :impls impls :collection [:requests]})
;; → instance-id

(rf/destroy-machine-instance [:requests <id>])
;; → nil
```

```clojure
;; fx form — returned from a machine action or any reg-event-fx body
{:spawn-machine   {:definition def :impls impls :collection [:requests]}
 :destroy-machine [:requests <id>]}
```

Both are registered `reg-fx` handlers. The fx forms are sugar over what the user could write manually as `:db` updates — they exist for clarity and tooling visibility, not because the framework requires them.

### Inspection

```clojure
;; function — for REPL/test/agent
(rf/snapshot-of path)
;; → {:state ... :context ...}
```

Plus the inspection events flowing on the standard trace surface with `:source :machine`.

### The data-oriented commitment

**Every machine operation is expressible as a value returned from a handler.** Spawning, sending, destroying, mutating — all return as data in an effect map. Functions exist as conveniences for non-handler callers; they are not the primary interface. This means:

- A machine action can spawn another machine simply by returning `{:spawn-machine {...}}` in its effect map.
- A machine action can destroy itself by returning `{:destroy-machine path}`.
- Tools and agents see *every* state-machine operation flow through the same data inspection surface as ordinary re-frame effects.

## Visualisation compatibility

Stately.ai's visualisation tools accept JSON descriptions of xstate machines. If our transition-table data shape is close enough, we can:

1. Provide a `(rf/machine->xstate-json definition)` converter that emits a stately-compatible JSON.
2. Document the shape correspondence so the reverse direction also works (paste an xstate JSON, get a re-frame machine definition).

This makes our machines visualisable in stately.ai's editor *for free*. The shape correspondence depends on us not gratuitously diverging from xstate's vocabulary in the transition table — keeping `:initial`, `:states`, `:on`, `:entry`, `:exit`, `:guard`, `:actions`, `:type :parallel` all aligned.

## Open questions

### OQ-M-1. Library packaging — in-tree or separate?

The pure-transition + glue-helper APIs are small. They could ship inside `re-frame` itself (alongside the existing handlers) or as a separate `re-frame.machines` library. Arguments either way:

- **In-tree:** discoverable; any re-frame app can use machines with no extra dep.
- **Separate:** keeps re-frame core small; lets machines evolve faster than re-frame.

Recommendation: prototype as separate, promote to in-tree once the API stabilises.

### OQ-M-2. Stately.ai compatibility — exact or approximate?

Aim for *paste-and-render* compatibility (a re-frame machine definition pastes into stately.ai and renders correctly), accepting some superficial vocabulary differences (e.g. our `:impls` vs stately's `:context.guards`). Or aim for *full bidirectional* compatibility (exact JSON shape parity)?

Recommendation: paste-and-render is the realistic target; full bidirectional is overinvestment unless someone wants to write a stately-driven authoring tool.

### OQ-M-3. Eventless transitions — microsteps inside drain

If we add `:always` transitions, the drain cascade has to handle "this snapshot just changed; check for eventless transitions; re-run." Trace events get noisier (microsteps). Drain depth limits become harder to reason about (each microstep counts toward depth). Probably fine, but worth a careful look when implementing.

### OQ-M-4. Multiple machine instances at one path

What if two `reg-event-fx` handlers register `:machine-path [:foo]`? Probably an error — paths are unique within a frame's app-db. Detection at registration time. Open question: is the detection per-frame or global? Probably per-frame, evaluated at frame-creation time, which catches most realistic cases.

### OQ-M-5. Action effects that themselves dispatch events to the same machine

A transition's action dispatches an event to the same machine. That event arrives during drain, possibly triggering another transition. Fine in principle (matches xstate's eventless cascades), but worth a worked example to make sure the model holds. Specifically: do actions execute *before* the new snapshot is committed (so their dispatched events see the *old* snapshot) or *after* (the new snapshot)? Standard order says actions are part of the transition; they execute as part of producing the new snapshot. Their dispatched events arrive *after* the snapshot is committed, in the next drain step. Document explicitly.

### OQ-M-6. Conditional context updates

xstate has `assign` actions that mutate context as part of a transition. We can model these as actions that return `{:db (update-in db [path :context] f)}`. But this means context mutation goes through the standard fx pipeline, alongside other effects. Fine; just make sure the convention is documented.

## Lessons from xstate (deliberate divergences)

For readers familiar with xstate, the explicit list of where re-frame2 chose differently and why:

| xstate | re-frame2 | Why |
|---|---|---|
| `ActorRef` runtime objects | Paths in `app-db` | Data orientation; agent-friendliness; no leak footguns |
| Per-actor mailboxes | One per-frame router queue | Simpler model; drain at the frame level is the granularity that matters |
| `raise` (self-event) vs `sendTo` (other-actor) | Single `dispatch` | One pipeline; no per-actor mailbox to put events at the front of |
| Three creation modes (`createActor` / `invoke` / `spawn`) | One mechanism, two patterns | Lifetime is encoded in `app-db` shape; modes collapse to patterns |
| Machine hierarchy as a structural concept | Hierarchy encoded in `app-db` nested structure | Stay data-oriented; no new framework primitive |
| Event-as-object API | Event vector + envelope metadata | Compatible with re-frame's existing event shape |

Convergences: machines-as-actors, run-to-completion, encapsulated state, snapshots, definition/implementation split, transition tables as data.

## Disposition

- **v1 ships the foundation in 002.** No machine library in v1 core.
- **A `re-frame.machines` library is prototyped post-v1** against the foundation. It validates the design under real use.
- **Once stable, promote** the library to in-tree (or document it as the recommended companion).
- **Stately.ai paste-and-render compatibility** is a stretch goal; aim for it, don't over-invest.

This is consistent with the post-v1 staging agreed in [000-Vision.md](000-Vision.md): EP 005 may slip past v1; the foundation hooks land in v1 so the library work doesn't require framework changes later.
