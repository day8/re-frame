# re-frame2 Enhancement Proposals

This directory holds the design documents for **re-frame2** — the next major version of re-frame.

The **load-bearing decisions** live in [000-Vision.md](000-Vision.md). Each per-area EP consumes those decisions; downstream EPs must not reshape the foundation. The discipline is recorded in 000's principles section and enforced across these documents.

The original placeholder/drafting EPs at `docs/EPs/00X-*.md` are the historical drafts that motivated re-frame2; the documents in *this* directory supersede them for design purposes.

## Status legend

| Status | Meaning |
|---|---|
| **Placeholder** | Skeleton or stub. Captures intent but may be incoherent or empty. |
| **Drafting** | Real writing and thinking. Subject to revision; may be wrong in places. |
| **UnderReview** | Ready for broader discussion in a tracking issue. |
| **Accepted** / **Rejected** | Decision made; reasons recorded. |
| **Released** | Shipped in re-frame2. |

## Documents

| # | Title | Status | One-liner |
|---|---|---|---|
| — | [README](README.md) | — | This file. |
| 000 | [Vision](000-Vision.md) | Drafting | Governing principles, locked decisions, scope, open questions. The contract every other doc consumes. |
| 001 | Registration | Contract locked in 000; standalone doc not yet drafted | The metadata-map shape for `reg-event-*`/`reg-sub`/`reg-fx`/`reg-cofx`; source-coord capture; Malli specs; named handler fns. **The contract is locked in [000-Vision.md §Registration shape](000-Vision.md#registration-shape-ep-001-territory) and consumed by 002 (frames), 005 (machines), 007 (stories).** A dedicated 001 doc will formalise the write-up; until then, 000 is authoritative for handler metadata. |
| 002 | [Frames](002-Frames.md) | Drafting | The load-bearing EP. Multi-frame (instances of the same app sharing a global registrar), keyword identity, `:re-frame/default` fallback, `reg-view` injection, run-to-completion drain semantics, machines-as-event-handlers foundation hooks. |
| 003 | Reusable Components | Subsumed | Subsumed by 002 (frames + `frame-provider`) and 004 (view registration). No separate doc planned. |
| 004 | [Views](004-Views.md) | Drafting (v1-required) | `reg-view` mechanics, frame-bound `dispatch`/`subscribe` injection, three hiccup invocation forms (`(get-view :id)`, Var reference, opt-in `(rf/h [...])` macro), Form-1/2/3 component handling, plain-Reagent-fn boundary, view-registry tooling surface, EP 003 subsumption. Bare `[:my-view ...]` in raw hiccup deferred to OQ-7. |
| 005 | [State Machines](005-StateMachines.md) | Drafting | Patterns and grammar for state-machine-flavoured event handlers, layered on the foundation hooks in 002 (machines as event handlers; transition-table-as-handler-body; pure transition contract). Independent of EP 004 and EP 007 — stories may *use* machines but don't structurally depend on them. Disposition: post-v1. |
| 006 | Reactive Substrate | Not yet drafted | Decouple re-frame from Reagent (substrate-agnostic re-frame and/or cooperative rendering substrate). Cost-benefit gated; post-v1. |
| 007 | [Stories, Variants, and Workspaces](007-Stories.md) | Drafting | Storybook/Histoire/devcards-class tooling. Three-way split: Story (topic) / Variant (state) / Workspace (layout). Disposition: framework hooks in v1, library post-v1. Builds on EP 008's testing infrastructure. |
| 008 | [Testing](008-Testing.md) | Drafting (v1-required) | Test fixtures (`make-frame`/`destroy-frame`/`with-frame`), synchronous triggers, per-test fx/interceptor stubbing, headless sub/machine evaluation, framework adapters (cljs.test, clojure.test, kaocha, re-frame-test compat), JVM-runnable test suites. v1 ships this. Forward-compatible with EP 007. |
| 009 | [Instrumentation, Tracing, Performance](009-Instrumentation.md) | Drafting (v1-required) | The trace event model (open-map shape, stable required fields, per-frame tagging, late-subscriber buffer), the listener subscription API, hot-path discipline, Chrome Performance API integration, and the forward-compat commitments to re-frame-10x and re-frame-pair. v1 ships this. |
| 010 | [Schemas](010-Schemas.md) | Drafting (v1-required) | Malli-based schemas attached to every `reg-*` via `:spec`; path-based `app-db` schemas via `reg-app-schema` (including `[]` for a root schema); validation timing, dev-vs-prod elision, boundary-validation interceptor for system-boundary use cases; tooling integration. v1 ships this. |
| — | [MIGRATION](MIGRATION.md) | Living | Maintained AI-agent prompt for migrating re-frame v1.x codebases to re-frame2. Updated whenever a design decision creates, alters, or removes breakage. |

## Reading order

For someone new to the re-frame2 design:

1. [000-Vision.md](000-Vision.md) — the principles and locked decisions.
2. [002-Frames.md](002-Frames.md) — the foundation.
3. [005-StateMachines.md](005-StateMachines.md) and [007-Stories.md](007-Stories.md) — examples of how downstream EPs consume the foundation.
4. [MIGRATION.md](MIGRATION.md) — the migration story.

## Conventions

- **Cross-references between EPs use Markdown links** to make the dependency graph navigable.
- **Locked decisions** are stated as imperatives in 000's principles section; per-EP docs reference them rather than restating.
- **Open questions** are recorded in each doc with stable IDs (`OQ-N` in 000, `OQ-F-N` in 002, `OQ-M-N` in 005, `S-N` in 007). When an OQ resolves, mark the resolution in the doc; don't delete the OQ until a maintenance pass.
- **MIGRATION.md is updated in the same change** as any design decision that introduces, alters, or removes breakage. See its "Maintainer note" section.
- **Discipline:** downstream EPs (003, 004, 005, 006, 007) **consume** the 000+002 foundation; they **do not** introduce new global registries, dispatch types, effect substrates, or component substrates. If a downstream design seems to need such a primitive, refit the design rather than reshape the foundation.

## Versioning

These documents are versioned alongside the re-frame source in this repository. Each merge that updates a design decision also updates the relevant EP and MIGRATION.md.
