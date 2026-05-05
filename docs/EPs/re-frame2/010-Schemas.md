# EP 010 — Schemas

> Status: Drafting. **v1-required.** Schemas are first-class per [G6 in 000](000-Vision.md#g6-enable-the-use-of-schemas). re-frame2 makes schema attachment a uniform, opt-in capability across every registered entity, with **Malli** as the preferred library and a path-based `app-db` schema model that fits re-frame's data-oriented grain.

## Abstract

A schema describes the *shape* of data flowing through a re-frame app:

- The dispatched event a handler expects.
- The value a subscription returns.
- The arguments an effect handler receives.
- The data a coeffect injector produces.
- The structure of `app-db` at any path.

re-frame2 lets users attach a Malli schema to any of these via the `:spec` metadata key on the relevant `reg-*` registration, plus a dedicated `reg-app-schema` API for `app-db`. In dev builds the framework validates against schemas at well-defined points; in production validation elides (or is restricted to system boundaries) to keep the hot path cheap.

This EP collects the spec/schema material that previously lived in 000's "Specs (Malli)" section and adds the validation-timing, dev-vs-prod, and tooling-integration details.

## Why Malli

Malli is the preferred schema library over `clojure.spec`:

- **Data-first.** Schemas are EDN data, not function calls. Inspectable, transmittable, AI-readable, queryable.
- **Decomposable.** Schemas compose by reference; sub-schemas can be named and reused.
- **Performant.** Validation is fast; schema-to-validator compilation is cheap.
- **Multi-format generation.** Malli generates JSON Schema, OpenAPI, type signatures, generators for property-based testing.
- **Modern feature set.** Open/closed maps, regex schemas, function schemas, ref support, transformers.

Users may use a different library if they prefer (the `:spec` value is opaque to re-frame; only the registered validator function is invoked). Malli is the documented and supported default.

## Where schemas attach

### On every `reg-*`

Every registration accepts an optional `:spec` in its metadata map:

```clojure
(rf/reg-event-fx :auth/login
  {:doc  "Submit credentials for verification."
   :spec [:cat [:= :auth/login]
              [:map [:email :string] [:password :string]]]}
  (fn auth-login-handler [m] ...))

(rf/reg-sub :pending-todos
  {:doc  "Filter todos to those still pending."
   :spec [:vector TodoSchema]}                 ;; sub return value
  (fn [db _] (filter pending? (:items db))))

(rf/reg-fx :http-xhrio
  {:spec [:map [:method :keyword] [:url :string]]}
  http-xhrio-handler)

(rf/reg-cofx :now
  {:spec inst?}
  (fn [coeffects _] (assoc coeffects :now (js/Date.))))
```

### `app-db` schemas — path-based

Rather than one giant schema for the whole `app-db`, schemas are registered **at paths**:

```clojure
(rf/reg-app-schema [:user]   UserSchema)
(rf/reg-app-schema [:todos]  TodosSchema)
(rf/reg-app-schema [:auth]   AuthSchema)
```

This fits re-frame's grain — code already accesses `app-db` via paths; schemas are similarly path-anchored. Composable. Hot-reload-friendly per slice. Tooling and agents can ask "what's the schema at path P?" and get a precise local answer.

### A schema for the whole `app-db`

The empty path `[]` means "the whole `app-db`" — same convention as `get-in`/`assoc-in`. Use it to register a root schema:

```clojure
(rf/reg-app-schema [] WholeAppDbSchema)
```

The root schema validates against the entire `app-db` after every handler. It composes with sub-path schemas: both validate; either failing reports a violation.

Use cases:

- The team wants strict closed-map semantics on top-level keys (`[:map {:closed true} ...]`) to catch typos.
- A simple flat `app-db` shape doesn't warrant per-slice schemas.
- An umbrella schema documents the overall shape while sub-path schemas detail individual slices.

Open vs closed map semantics is the team's choice; Malli supports both.

### Multiple schemas at the same path

Re-registering a schema at a path replaces the previous one (last-write-wins, same as handler re-registration). Tooling warns when the new source coords differ from the previous registration — a same-form re-register (hot reload) is benign; a different-source re-register at the same path is probably a bug.

## Validation timing

### When schemas are checked

| Schema attached to | Validates |
|---|---|
| `reg-event-*` `:spec` | The dispatched event vector, *before* the handler runs. Failure aborts the dispatch with a structured error. |
| `reg-sub` `:spec` | The sub's return value, *after* compute. Failure raises a runtime error with sub-id and computed-value context. |
| `reg-fx` `:spec` | The effect's argument data, *before* the fx handler runs. Failure aborts the effect. |
| `reg-cofx` `:spec` | The coeffect's data, *after* injection. Failure aborts the dispatch. |
| `reg-app-schema` (path-based) | The slice at the registered path, *after every handler* completes a state mutation. Failure raises a structured error naming the path, the offending value, and the rule violated. |

All validation points emit machine-readable errors per [G2's introspection commitments](000-Vision.md#g2-instrumentation--introspection-are-first-class) — `{:reason :spec-violation :spec <id> :path [...] :value <bad> :explanation ...}`.

### Validation order on event processing

For a single dispatched event, schema checks fire in this order:

1. Event-vector schema (from `reg-event-*` `:spec`) — before any handler runs.
2. Cofx schemas (from `reg-cofx` `:spec`) — after each cofx injects, before the handler sees the merged context.
3. Handler runs.
4. `app-db` path schemas — after the handler's `:db` effect commits.
5. Effect schemas (from `reg-fx` `:spec`) — before each fx handler runs.
6. Sub return-value schemas — after each materialisation/recompute that involves a schema'd sub.

A failure at any step aborts the dispatch with a structured error.

## Dev vs production

### Dev builds

All registered schemas are checked at every validation point. The intent is to catch shape violations as early as possible. Performance cost is real but tolerable for dev iteration.

### Production builds

Validation is **elided** by default — schemas remain registered (so tooling can introspect them) but the validation calls are compile-time-eliminated, similar to trace emission. The mechanism: a closure-define `re-frame.spec/validation-enabled?` (default `false` in production) gates each validation site.

For users who want production validation at *system boundaries* — typically incoming events from untrusted sources (HTTP responses, websocket messages, postMessage) — re-frame2 ships a `:spec/validate-at-boundary` interceptor that the user adds to specific event handlers. Boundary validation runs even when global validation is elided.

```clojure
(rf/reg-event-fx :api/response-received
  {:interceptors [rf/spec/validate-at-boundary]
   :spec         ApiResponseSchema}
  (fn [m] ...))
```

Production builds in this configuration: 99% of code has zero validation overhead; the few system-boundary handlers validate every incoming payload.

## Schemas as a tooling and agent surface

Schemas registered against handlers and `app-db` paths are queryable via the public registrar query API ([002 §The public registrar query API](002-Frames.md#the-public-registrar-query-api)):

```clojure
(rf/handler-meta :event-fx :auth/login)
;; → {:doc "..." :spec [:cat ...] :ns ... :line ... :file ...}

(rf/app-schema-at [:user])
;; → UserSchema (the registered Malli schema)

(rf/app-schemas)
;; → {[:user] UserSchema, [:todos] TodosSchema, [:auth] AuthSchema, [] WholeAppDbSchema}
```

Tools and agents read these to:

- Render shape information in 10x's panel.
- Validate intent before dispatching (an agent simulating "what would happen if I dispatch [:auth/login {…}]?" can pre-check against the spec).
- Generate test data via Malli's generators (`(mg/generate sub-schema)` produces a value matching the sub's return shape).
- Generate JSON Schema or OpenAPI from registered schemas — useful for cross-platform contracts.
- Diff schemas across versions to detect breaking shape changes in app-db structure.

## What schemas don't do

- **They don't enforce non-shape invariants.** Malli describes shapes (this is a string of length ≥ 8; this is a vector of TodoItems). Higher-level invariants (this user's email matches their account; this request's signature is valid) live in handlers, not schemas.
- **They don't replace tests.** Schemas catch shape violations; tests catch behavioural correctness. Both are needed.
- **They don't make `app-db` rigid.** Open-map schemas are the default; teams opt into closed-map semantics where they want strict typo-prevention.

## Open questions

### S-1. Default-frame `app-db` schema vs per-frame schemas

Multi-frame apps may want a different `app-db` schema per frame (a story frame's `:db` shape is different from production's). Current `reg-app-schema` registers globally. Should it accept an opt-in `:frame` arg?

```clojure
(rf/reg-app-schema [:user] UserSchema {:frame :production})
(rf/reg-app-schema [:user] StoryUserSchema {:frame :story.auth.login-form/empty})
```

Recommendation: yes, with default-frame as the default. Path + frame-id is the registration key; tools query "what schema applies at path P in frame F?"

### S-2. Schema-driven generative tests

Malli generators can produce values matching a schema. A natural pattern: "for every event with a `:spec`, generate inputs and run the handler against a fixture frame, asserting `app-db` schemas hold." Worth documenting as a property-based-testing pattern in [008-Testing.md](008-Testing.md).

### S-3. Schema migration on hot-reload

When a sub-path schema changes during dev (file save), the live `app-db` may now violate the new schema. Should the framework warn loudly, soft-fail, or just log? Recommendation: log + emit a `:spec/violation` trace event so 10x highlights it; don't abort the live app.

### S-4. Boundary-validation interceptor naming

`:spec/validate-at-boundary` is a placeholder name. Worth bikeshedding — `:spec/strict`, `:spec/always`, `:spec/at-boundary` are alternatives. Lock with the v1 release.

### S-5. Schema versioning

Apps evolve; `app-db` shapes evolve; schemas evolve. Should re-frame2 ship a versioning convention (e.g., `(reg-app-schema [:user] UserSchema {:version 3})`) for schema-aware migration tooling? Likely post-v1.

### S-6. Non-Malli library support

If a user wants to use `clojure.spec` or a custom validator, the `:spec` value is opaque to re-frame; only validators (registered via `reg-spec-validator` or similar) interpret it. Worth a documented extension point. Out of scope for v1; Malli is the default and supported library.

## Disposition

**v1.** Schemas ship in v1 as opt-in per-registration metadata plus the `reg-app-schema` API. Validation runs in dev; elides in production with the boundary-validation interceptor for system-boundary use cases. Malli is the default library; `re-frame.spec` namespace ships as the small validation-machinery layer.

The tooling/agent surface (querying schemas via the registrar) is part of [G2](000-Vision.md#g2-instrumentation--introspection-are-first-class) and lives there; this EP defines the validation contract.
