# EP 007 — Stories, Variants, and Workspaces

> Status: Drafting. **Post-v1.** Builds on the frame foundation in [002-Frames.md](002-Frames.md) and the testing infrastructure in [008-Testing.md](008-Testing.md) — stories *use* the same primitives tests use, layered with rendering, args/controls, decorators, play functions, and a Storybook-class UI. The framework hooks ship in v1; the story library is prototyped externally and promoted when stable.

## Abstract

A re-frame2 component-development tool surfaces re-frame components in isolation, in specific states, with rich tooling around them — Storybook for re-frame, but data-oriented and frame-native. This EP captures the design space, drawing on Storybook (CSF, args, decorators, play), Histoire (the story/variant split), Workspaces (the workspace layout concept), and devcards (the meta-application philosophy).

The unit of design is a **three-way split** that prior art across these libraries supports:

- **Story** — a topic / component / slice. Defines what's being shown and the surrounding fixtures.
- **Variant** — one concrete scenario of a Story. Each variant is the Story rendered in a specific state.
- **Workspace** — a layout that arranges stories/variants on screen for browsing, documentation, or comparison.

This split is the single most important learning from prior art; the rest of the design — args, decorators, play, tags — slots cleanly into one of the three.

## Why a separate EP

Stories/variants/workspaces are downstream concerns. They are *enabled by* the frame and view designs in 002 and 004; they shouldn't drive those decisions. Keeping the design here:

- Lets 002 and 004 stay focused on the foundation.
- Lets the story-tool design evolve independently of v1 framework decisions.
- Makes it easy to defer past v1 if other work takes priority — `reg-story`/`reg-variant`/`reg-workspace` are sugar; everything is doable by hand with `reg-frame` + `reg-view` + `frame-provider`.

## The three concepts

### Story

A story is the **topic** — typically a component, slice, or screen. It declares what's being demonstrated, the *shared* fixtures across its variants, decorators, args, play, and metadata. A story without variants is a degenerate case.

```clojure
(rf/reg-story :story.auth.login-form
  {:doc        "The login form component."
   :component  login-form               ;; the view at the centre of the story
   :decorators [[centered-layout]
                [theme :light]]
   :args       {:placeholder "you@example.com"
                :submit-label "Sign in"}
   :argtypes   {:placeholder  {:control :text}
                :submit-label {:control :text}}
   :tags       #{:dev :docs}})          ;; inclusion tags — see below
```

The story is registered under a hierarchical keyword: `:story.<path>` where path segments organise the story tree.

### Variant

A variant is a **specific scenario** — one state of a story. Variants register against a parent story and inherit its decorators, args, etc.; variants override or extend.

```clojure
(rf/reg-variant :story.auth.login-form/empty
  {:doc    "Fresh form, nothing entered."
   :events [[:auth/initialise]]})

(rf/reg-variant :story.auth.login-form/validation-error
  {:doc    "Invalid email shown inline after submit."
   :events [[:auth/initialise]
            [:auth/email-changed "not-an-email"]
            [:auth/login-pressed]]
   :tags   #{:dev :docs :test}})        ;; this one is also used as a test fixture

(rf/reg-variant :story.auth.login-form/loading
  {:doc       "Submit pressed, server response pending."
   :events    [[:auth/initialise]
               [:auth/email-changed "alice@example.com"]
               [:auth/login-pressed]]
   :decorators [[force-fx-stub :http {:status :pending}]]})
```

The keyword convention `:story.<path>/<variant>` keeps stories and their variants discoverable as a group, while still being a single keyword for re-frame's purposes.

### Workspace

A workspace is a **layout** — multiple stories/variants arranged on screen for browsing, documentation, or side-by-side comparison.

```clojure
(rf/reg-workspace :Workspace.Auth/all-states
  {:doc    "Every login-form state side by side, for QA review."
   :layout :grid
   :variants [:story.auth.login-form/empty
              :story.auth.login-form/validation-error
              :story.auth.login-form/loading
              :story.auth.login-form/rate-limited]})

(rf/reg-workspace :Workspace.Auth/docs
  {:doc       "Auth flow documentation page."
   :layout    :prose                  ;; markdown-flavoured layout
   :content   [{:type :prose :body "## The login flow\n\n..."}
               {:type :variant :id :story.auth.login-form/empty}
               {:type :prose :body "When the email is invalid:"}
               {:type :variant :id :story.auth.login-form/validation-error}]})
```

Workspaces are themselves rendered like other re-frame views; the workspace tool reads the registry and lays them out.

## Args and controls

Storybook's headline UX is the **controls** panel — interactive props that re-render the story. We need an equivalent.

### Args at three levels

Following Storybook's inheritance:

1. **Global args** — re-frame2 doesn't have a global default beyond what frames give us. Story-tool config can supply defaults (theme, locale).
2. **Story-level args** — declared on `reg-story`; inherited by every variant.
3. **Variant-level args** — override or extend the story's args.

```clojure
(rf/reg-variant :story.auth.login-form/customised
  {:args {:placeholder "your.email@company.com"      ;; override story default
          :submit-label "Authenticate"}
   :events [[:auth/initialise]]})
```

### Argtypes describe controls

`:argtypes` is a map of arg-name → control specification. The story tool reads this to render sidebar widgets.

```clojure
{:argtypes
 {:placeholder  {:control :text}
  :submit-label {:control :text}
  :variant      {:control {:type :select
                           :options [:primary :secondary :danger]}}
  :disabled?    {:control :boolean}
  :max-length   {:control {:type :number :min 1 :max 100}}}}
```

Control types map to common widgets: `:text`, `:textarea`, `:number`, `:boolean`, `:select`, `:radio`, `:date`, `:color`. The tool can extend with custom controls.

### Args mapping to state

Args are passed to the view as data. By default the view renders with the current args:

```clojure
(rf/reg-view :login-form
  (fn [args]                                   ;; receives the current args
    [:form
     [:input {:placeholder (:placeholder args)}]
     [:button (:submit-label args)]]))
```

When a control mutates an arg, the story tool dispatches `[:story/set-arg <story-id> <arg-key> <new-value>]` into the variant's frame; the view re-renders with the new args.

For variants that need args to map into `app-db` (e.g., a `:logged-in?` arg controls whether the auth section is rendered), the variant declares an explicit mapping:

```clojure
(rf/reg-variant :story.auth.login-form/logged-in-arg
  {:args         {:logged-in? false}
   :args->events {:logged-in? (fn [v] (if v
                                        [:auth/restore-session {:user "alice"}]
                                        [:auth/log-out]))}
   :events [[:auth/initialise]]})
```

Most stories don't need `:args->events` — args going to the view directly is enough.

## Decorators

Decorators wrap stories with shared infrastructure: themes, layout containers, mocked providers, fixed widths. Story-level decorators apply to every variant; variants can add their own.

### Three kinds of decorator

1. **Hiccup wrapper.** A vector that wraps the rendered view.
2. **Frame setup.** A function that mutates the story's frame at creation — pre-populates `app-db`, registers per-frame interceptors.
3. **Fx override.** A declaration that swaps an fx for the lifetime of the variant — `[force-fx-stub :http canned-response]`.

```clojure
;; Hiccup wrapper — pure visual
[centered-layout]
[theme :light]
[fixed-width 480]

;; Frame setup — affects state
[mock-auth {:user {:id 42 :name "Alice"}}]
[mock-router {:current-path "/dashboard"}]

;; Fx override — affects effects
[force-fx-stub :http (fn [args] {:status 200 :body {...}})]
[force-fx-stub :localstorage (constantly nil)]
```

Decorators are themselves re-frame artefacts — usually small libraries that ship as `re-frame.decorators.theme`, `re-frame.decorators.auth`, etc. Story authors require what they need; decorators register hooks against the framework's interceptor and fx surfaces (no new framework primitives required).

### Decorator-as-frame-config-merger

A decorator's *frame setup* mode generalises into "things that should be true of any frame using this decorator." For complex apps, common decorators (auth context, router, theme) get factored into the team's design system — story authors compose them, don't reinvent them.

## Play functions

Storybook's play functions execute after render to simulate user interaction. In re-frame2, play is a **sequence of events fired after the variant has rendered**, distinct from `:events` (which run before render to set up state).

```clojure
(rf/reg-variant :story.auth.login-form/login-flow
  {:doc    "Full happy-path login interaction."
   :events [[:auth/initialise]]                    ;; setup before render
   :play   [[:auth/email-changed "alice@example.com"]
            [:auth/password-changed "hunter2"]
            [:auth/login-pressed]
            [:assert/path-equals [:auth :status] :authenticated]
            [:assert/path-equals [:nav :route] :dashboard]]})
```

`:assert/...` events are themselves dispatches, handled by the story tool's test runner. In dev/docs mode they're rendered as a checked-step list; in test mode they fail loudly when assertions don't hold; in agent mode they're simulation breakpoints.

### Story-as-test duality

This is the most important consequence of the play model: **a variant with `:events` + `:play` + `:assert/...` is a complete component test**. Same artefact serves dev-time visualisation, regression testing, and AI-agent input. Test runners just iterate over `:story.*/*` variants tagged `:test` and run their setup + play, asserting on the resulting state.

This collapses several artefacts a typical project maintains separately: the dev-time playground, the test suite, the regression-screenshot fixtures, and the documentation. They become facets of one registered thing.

## Inclusion tags

The standardised inclusion-tag vocabulary controls which contexts include a variant:

| Tag | Meaning |
|---|---|
| `:dev` | Visible in the development story tool. |
| `:docs` | Included in generated documentation pages. |
| `:test` | Run as a test in the test suite (`:play` + `:assert/...`). |
| `:screenshot` | Captured in screenshot/visual-regression runs. |
| `:experimental` | Hidden in production-ish views; visible in dev. |
| `:internal` | Excluded from public-facing docs. |
| `:agent` | Surfaced to AI agents as canonical examples. |

A variant's tags default to `#{:dev :docs}`. Custom tags work for project-specific filters. Tools intersect their requested tag set with the variant's tags.

```clojure
:tags #{:dev :docs :test :screenshot}      ;; full coverage
:tags #{:dev :experimental}                ;; in dev only, marked experimental
:tags #{:dev :test}                        ;; not in docs (e.g., edge case)
```

## Loaders (advanced — async setup)

Storybook loaders run asynchronously before stories render to fetch data. We prefer **deterministic `:events`** because they're reproducible and replayable. Loaders are an escape hatch for cases that genuinely need async setup (e.g., generating a test image from a remote service).

```clojure
(rf/reg-variant :story.charts.heatmap/with-real-data
  {:doc      "Renders against a fixture fetched from disk."
   :loaders  [(fn [] (-> (js/fetch "/fixtures/heatmap.json")
                         (.then ...)))]
   :events   [[:charts/load-fixture]]
   :tags     #{:dev :docs}})
```

Mark loaders as advanced in docs. The vast majority of variants should use `:events`.

## Effect mocking — hook design, not policy

Stubbing `:http` and similar effects for stories uses **hooks for per-variant interceptors and fx overrides** — not mocking policy baked into `reg-variant`.

The framework hooks (added at the foundation level — see 002 §Per-frame drain mode, but expanded):

- `:on-create` events run at frame creation (already in 002).
- **Per-frame fx override** — a variant can declare fx replacements active for its frame's lifetime. Available via `reg-frame :fx-overrides` (see [002 §Per-frame and per-call overrides](002-Frames.md)).
- **Per-frame interceptor injection** — a variant can register interceptors that run only for its frame.

Decorators expose these hooks as composable building blocks (`force-fx-stub`, `inject-interceptor`, etc.). Story authors compose decorators; they don't manually wire interceptors. The framework provides the hooks; the decorator library provides the ergonomics.

## Portable into tests

Variants are runnable outside the story UI. The library exposes a function form for each:

```clojure
(rf/run-variant :story.auth.login-form/validation-error)
;; → {:frame   :story.auth.login-form/validation-error
;;    :app-db  {...}                        ;; final state after :events + :play
;;    :assertions [{:passed? true ...} ...]
;;    :rendered-hiccup [...]                ;; if :render? true was supplied
;;    :elapsed-ms 12.4}
```

Use cases:

- **Component tests** (`deftest` in CLJS test suites) — call `run-variant`, assert on `:assertions` or `:app-db`.
- **Screenshot tests** — render `:rendered-hiccup` to JSDOM/Playwright, capture image, diff.
- **Agent input** — pass the variant id to a re-frame-pair-flavoured agent; agent reads `:app-db` and `:assertions` to reason about behaviour.
- **Manual REPL exploration** — call `run-variant` interactively to see what state events produce.

The same data drives every consumer. No artefact duplication.

## v1 framework support vs. post-v1 library

### What the v1 framework supplies (in 002)

The foundation hooks the story library *consumes* — all in the v1 framework:

- **Frames + `make-frame` + `destroy-frame` + `reset-frame`** — per-variant lifecycle.
- **Per-frame `:fx-overrides`, `:interceptor-overrides`, `:interceptors`** on `reg-frame` — the override seam decorators compose into.
- **Run-to-completion drain** — variant setup events drain to fixed point per drain semantics.
- **Public registrar query API** (`handlers`, `frame-meta`, `frame-ids`, `get-frame-db`, `snapshot-of`, `sub-topology`) — the inspection surface tools/agents use.
- **Hot-reload notifications** — story tools refresh their state when a variant or view re-registers.

That's it. The framework does not ship `reg-story`, `reg-variant`, `reg-workspace`, `run-variant`, `reset-variant`, or `variants-with-tags`.

### What the post-v1 story library adds

Layered on top of the v1 framework, in `re-frame.stories` (or whatever name):

- **`reg-story` / `reg-variant` / `reg-workspace`** — the three-way registration API.
- **Side-table registries** for stories, variants, workspaces — lookup, enumerate, filter by tag.
- **`run-variant`** — programmatic execution: `make-frame`, dispatch the events, run the play, capture assertions, return a result map.
- **`reset-variant`** — sugar for `reset-frame` on the variant's underlying frame, plus re-firing `:on-create` setup.
- **`variants-with-tags`** — filter helper for tooling.
- **The Storybook-class UI** that consumes all of the above.

The library is prototyped externally; promoted to in-tree if it stabilises. The framework v1 ship is sufficient for any team to build their own equivalent if they want to roll their own.

## Relationship with frames

A variant *is* a frame, registered under its variant keyword. But variant `:events` are NOT desugared to `reg-frame :on-create` — `reg-frame :on-create` is single-event by design ([002 §reg-frame](002-Frames.md#reg-frame-is-atomic)), while variant `:events` is an explicitly multi-step setup sequence (the whole point of stories is to express setup as a list of user-flavoured steps). The story library handles its own iteration:

```clojure
;; conceptual setup logic for reg-variant
(defn setup-variant! [variant-id]
  (let [{:keys [events]} (variant-meta variant-id)
        story-events     (story-events-for variant-id)
        all-events       (concat story-events events)]
    (rf/reg-frame variant-id {:doc ...})           ;; frame starts with app-db = {}
    (doseq [ev all-events]
      (rf/dispatch-sync ev {:frame variant-id}))   ;; iterate events, dispatch each
    (record-variant-meta variant-id {:view ..., :decorators ..., :play ..., :tags ...})))
```

So the variant's *frame* is a normal frame (no `:on-create`); the variant *library* handles the multi-event setup. This keeps `reg-frame :on-create` semantically simple (one event) while letting stories express their richer setup pattern.

Workspaces are *not* frames (or not necessarily — they may be ordinary frames containing nested `frame-provider`s, one per included variant). Each variant included in a workspace renders inside its own `frame-provider`, isolated from siblings. This falls out of 002's design without extra machinery.

## Open questions

### S-1. Should `reg-story` and `reg-variant` be separate, or unified?

Two macros (`reg-story` declares the topic + shared fixtures; `reg-variant` declares each scenario) is cleaner but verbose for simple cases. A combined form (`reg-story` with `:variants {...}` map) is terser but harder to hot-reload variant-by-variant.

Recommendation: **both forms, with the combined form desugaring to separate registrations**. Single source of truth, two ergonomics.

### S-2. Hierarchy convention — keyword segments or `:title`?

Storybook uses `title: "Components/Forms/LoginForm"`. Histoire uses file paths. We can use namespaced-keyword segments (`:story.components.forms/login-form`) parsed by the tool — Clojure-native, no separate field.

Recommendation: keyword segments. Tools split on `.` to build the tree; the part after `/` is the variant name within a story; story-only ids end in just the story name.

### S-3. Args mapping — view-direct or via app-db?

Args go to the view directly by default; explicit `:args->events` for variants that need state changes. Simple cases stay simple; complex cases have an opt-in mechanism.

Resolution: implemented as sketched above.

### S-4. Test integration — built-in runner or test-framework adapter?

The story library (post-v1) can ship a `run-variant`-flavoured runner. Test-framework adapters (`re-frame-test`, etc.) consume `run-variant` and produce framework-specific test cases. The built-in runner is part of the story library, not the v1 framework; adapters layer on top of it.

### S-5. Workspaces — generic or specialised?

A `:layout` field with `:grid`, `:prose`, `:tabs` etc. covers common cases. Custom layouts are just custom views referencing variant ids. Generic enough for v1; rich enough for most uses.

### S-6. Screenshot / visual-regression integration

Out of scope for the framework; the test runner integration is enough. Visual-regression tools (Chromatic-flavoured) consume the variant registry and `run-variant`'s rendered hiccup.

### S-7. Devcards / Workspaces interop

Existing CLJS projects using devcards or Wilker Lúcio's workspaces should be able to consume re-frame2 stories with adapter shims. Not v1 work; possible community contribution.

### S-8. Story composition across libraries

Storybook supports federating multiple Storybook instances on one page. We can do the same with the existing namespace mechanism — multiple `:story.*` namespaces can come from different libraries. The story tool reads all registered `:story.*` ids.

## Disposition

**Not v1.** The framework hooks needed are small (per-frame fx override + interceptor injection; the variants/workspaces registries can live in user-space first). Path:

1. **v1** ships the foundation hooks (frames, `:on-create`/`:on-destroy`, `reset-frame`, the inclusion-tag concept folded into the registrar metadata, hook surface for fx override).
2. **Post-v1**, prototype `re-frame.stories` as an external library against the foundation. Iterate on `reg-story`/`reg-variant`/`reg-workspace` and the runner.
3. **Once stable**, evaluate promoting to in-tree (or document as the recommended companion library).

The same path xstate took: external library, became standard, stayed external. The framework provides the substrate; the experience-layer libraries thrive on top.
