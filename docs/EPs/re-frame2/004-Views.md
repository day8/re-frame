# EP 004 — Views

> Status: Drafting. **v1-required.** `reg-view` is the boundary where re-frame inserts frame awareness; without it, views inside non-default `frame-provider` subtrees can't see their frame. EP 004 was originally a Placeholder (a nice-to-have for tooling and hiccup-as-data); the multi-frame goal in [002-Frames.md](002-Frames.md) lifts it to load-bearing v1.

## Abstract

A **registered view** is a render fn associated with a keyword via `reg-view`. Registration:

- Captures source coords and `:doc`/`:spec` metadata for tooling.
- Wraps the fn so that, on each render, frame-bound `dispatch` and `subscribe` are injected as lexical locals — the body reads exactly like today's re-frame.
- Returns the wrapped fn so the user can `def` it as a Var if they want Reagent-style hiccup invocation.

Registered views can be invoked in hiccup three ways. Plain (unregistered) Reagent functions continue to work in v1 with a documented frame-routing limitation; `reg-view` is the staged-adoption path for multi-frame correctness.

The frame-routing mechanics that `reg-view` consumes (React-context resolution, `frame-provider`, `bound-fn`/`bound-dispatcher` for callbacks crossing the render→callback boundary) live in [002-Frames.md §View ergonomics](002-Frames.md#view-ergonomics-the-hard-part). EP 004 owns the view-side API surface; 002 owns the frame-side mechanics.

## `reg-view` is the multi-frame contract

`reg-view` registers a render function under a keyword. Inside the registered view's body, `dispatch` and `subscribe` are **frame-bound locals** injected by `reg-view` (the implicit-lexical-injection style):

```clojure
(rf/reg-view :counter
  {:doc "Counter widget."}
  (fn [label]
    (let [n @(subscribe [:count])]
      [:button {:on-click #(dispatch [:inc])}
       (str label ": " n)])))
```

Inside the body:

- `subscribe` and `dispatch` are **lexically bound** to closures that know the surrounding frame.
- The `:on-click` lambda closes over the local `dispatch` — it carries the frame into the callback automatically. No render-time-binding-vs-callback-time problem.
- Code reads identically to today's re-frame view (per G1 — no cultural shift).

The body's `subscribe`/`dispatch` are *unqualified*. Qualified `re-frame.core/dispatch` continues to refer to the global function targeting `:re-frame/default` — useful at the REPL and outside views.

The injection mechanism is detailed in [002-Frames.md §What `reg-view` injects](002-Frames.md#what-reg-view-injects).

## Three injected names

Inside the body, the macro injects three names:

- `dispatch` — frame-bound `(fn [event] ...)` building an envelope tagged with the surrounding frame's id.
- `subscribe` — frame-bound `(fn [query-v] ...)` consulting the surrounding frame's sub-cache.
- `frame-id` — the keyword itself, useful for debugging, logging, or passing to non-frame-aware children.

## How registered views are used in hiccup

v1 ships **three forms** for invoking a registered view:

```clojure
;; (1) Explicit function-position — always works, no macro, no Reagent extension
[(rf/get-view :counter) "Hello"]

;; (2) Var reference — user defs a var from reg-view's return value, then uses Reagent-style
(def counter (rf/reg-view :counter {…} (fn [label] ...)))
[counter "Hello"]

;; (3) Opt-in macro — walks hiccup at compile time, substitutes registered keywords
(rf/h [:counter "Hello"])
```

`reg-view` returns the wrapped (frame-aware) render fn, so form (2) is "just like Reagent today" — `def` the var if you want the ergonomic. Form (3) is the most data-oriented but requires opting into the `h` wrapper at the call site.

**Bare `[:counter "Hello"]` in raw hiccup** (without an `h` wrapper, where Reagent itself would have to interpret the keyword as a registered view) is **not supported in v1**. It requires modifying or extending Reagent's keyword-tag interpretation, which is deferred to OQ-7 (the substrate decoupling work). It can ship later as a non-breaking addition once the substrate decision is settled.

### The `h` macro

`(rf/h hiccup-form)` walks the hiccup at compile time, substituting `[:registered-keyword args ...]` with `[(rf/get-view :registered-keyword) args ...]` for every keyword present in the view registry at expansion time. Unregistered keywords pass through unchanged (so DOM tags like `:div` are untouched).

```clojure
;; user writes
(rf/h
  [:div.page
   [:counter "Left"]
   [:counter "Right"]
   [:label "Hello"]])              ;; :label is a DOM tag; passes through

;; expands to
[:div.page
 [(rf/get-view :counter) "Left"]
 [(rf/get-view :counter) "Right"]
 [:label "Hello"]]
```

Compile-time expansion means the registry must be populated when the macro fires — typically at REPL or build time, after `reg-view` calls have run. For dynamic dispatch (where the keyword isn't known at compile time), use form (1) directly.

`h` is opt-in: hiccup outside `(rf/h ...)` retains today's Reagent semantics (DOM tags + Var references + anonymous fns).

## Plain Reagent fns: staged adoption

Plain Reagent fns (`(defn my-view [args] ...)`) continue to work in re-frame2. They are not registered, so they do not get frame-injection. Their `subscribe`/`dispatch` calls (qualified `rf/`) target `:re-frame/default`.

This means plain fns are safe in single-frame apps (no different from today) and in default-frame portions of multi-frame apps, but they will silently route to `:re-frame/default` if rendered inside a non-default `frame-provider`. Documented as a known limitation; `reg-view` is the recommended pattern for any view that may live under a non-default frame.

A future re-frame2.x or v2 may make `reg-view` mandatory if the ecosystem follows. Not in v1.

### Affordance for plain fns: `(rf/dispatcher)` / `(rf/subscriber)`

For users who want frame awareness in a plain fn without registering it, two render-time helpers:

```clojure
(defn my-plain-view [label]
  (let [d (rf/dispatcher)              ;; reads context now (during render), returns frame-bound fn
        s (rf/subscriber)              ;; ditto for subscribe
        n @(s [:count])]
    [:button {:on-click #(d [:inc])}
     (str label ": " n)]))
```

Same closure mechanic as `reg-view`, just opt-in per-call. Slightly more verbose; useful as an escape hatch.

## Form-1, Form-2, Form-3 components

`reg-view` supports all three Reagent component forms.

### Form-1 (simple render fn)

```clojure
(rf/reg-view :counter
  (fn [label]
    [:button (str label)]))
```

Each render invocation runs the body fresh.

### Form-2 (closure)

A view returning a fn (Form-2) closes over the outer scope, so the injected locals are captured by both inner-render invocations and any callbacks created in either form:

```clojure
(rf/reg-view :counter-with-init
  (fn [label]
    (dispatch [:counter/initialise label])           ;; outer fires once on mount
    (fn [label]                                       ;; render fn, called on each render
      (let [n @(subscribe [:count])]
        [:button {:on-click #(dispatch [:inc])}
         (str label ": " n)]))))
```

The `dispatch` and `subscribe` in both the outer and inner fn refer to the same locals — Clojure lexical closure does the right thing.

### Form-3 (class)

Class-form views that return a map of lifecycle methods (`:reagent-render`, `:component-did-mount`, etc.) — supported, but the injected locals are only in scope for the lifecycle methods themselves, not for any user code outside the registered fn. Consistent treatment with Form-2; the macro injects the `let` once around the entire returned map's body.

## View registry — tooling surface

Registered views live in re-frame's handler registrar (kind `:view`). The public registrar query API ([002-Frames.md §The public registrar query API](002-Frames.md#the-public-registrar-query-api)) provides:

- `(rf/handlers :view)` — map of view-id → metadata (`:doc`, `:ns`/`:line`/`:file`, args info, source).
- `(rf/handler-meta :view :counter)` — single view's metadata.

Tools (10x, story tools, agents) read these to render view inspectors, pick views for stories, generate documentation. Source coords let tools navigate to the view's source.

## Composing registered views

Registered views referenced from hiccup inherit the surrounding frame from React context:

```clojure
(rf/reg-view :outer
  (fn []
    [:div
     [counter "Inner"]                  ;; or [:counter "Inner"] under EP 004's `h` macro
     [rf/frame-provider {:frame :other}
      [counter "Other-frame inner"]]])) ;; nested provider re-points
```

Nested `frame-provider`s re-point children. The deepest provider in scope wins. Cross-frame dispatching from inside a view uses the qualified `rf/dispatch` with an explicit `:frame` opt — see [002 §Cross-frame dispatching from a view](002-Frames.md#cross-frame-dispatching-from-a-view).

## EP 003 (Reusable Components) subsumption

The original EP 003 wanted React-context-style sharing for reusable components. Two concerns motivated it:

1. **Reusable widgets need to subscribe and dispatch** — solved by `reg-view`'s frame-bound injection.
2. **Reusable widgets need access to surrounding context** (theme, locale, router, frame) — solved by [002's `frame-provider`](002-Frames.md#what-frame-provider-is) plus user-defined React contexts for non-frame state.

EP 003 is therefore subsumed by EP 002 + EP 004; no separate doc planned.

## Open questions

### V-1. Should `reg-view` def the Var by default?

Currently `reg-view` returns the wrapped fn, and the user opts into Var-style hiccup by writing `(def counter (rf/reg-view ...))`. Alternative: `reg-view` is a macro that defs the Var as a side effect, the way `defn` does. Trade-off: less ceremony for users who want Var-style; more magic; potential conflict with namespace-level `def` discipline. Currently leaning toward "user opts in explicitly" for explicitness; revisit if the ecosystem prefers the auto-def form.

### V-2. The `h` macro's expansion strategy

`h` walks hiccup at compile time. Two questions: (a) does it walk recursively into nested vectors, or only the top level? (b) does it look up keywords against the *current* registry at expansion time, or use a deferred runtime lookup? Recommend recursive walk + compile-time lookup for the common case (deterministic; faster) with a runtime escape hatch for dynamic cases.

### V-3. Form-3 (`reagent.core/create-class`) — full lifecycle exposure

Supported, but the locked design says injected locals are scoped to the entire returned-map's body. Whether all lifecycle methods (`:component-did-mount`, `:component-did-update`, `:component-will-unmount`, etc.) see the injected `dispatch`/`subscribe` consistently — including across Reagent's various class-creation paths (legacy `r/create-class` vs newer hooks-flavoured) — needs an implementation walk-through before locking.

### V-4. Hot-reload behaviour for re-registered views

When `reg-view` is re-evaluated against the same keyword (developer saved a file), the new render fn replaces the old. Mounted components automatically pick up the new fn on next render via the registry indirection (`get-view`). Confirm: does this work cleanly with Reagent's component cache? Probably yes (Reagent re-creates components on render); empirical confirmation needed.

### V-5. `h` macro and dynamic keyword tags

`(rf/h [first-tag-var label])` where `first-tag-var` is a runtime-resolved keyword — does the macro fall through gracefully (treating the keyword as a DOM tag) or error? Recommendation: fall through; runtime substitution is the user's responsibility.

## Disposition

**v1.** `reg-view` ships in v1 as the multi-frame contract. The three hiccup invocation forms ship in v1. The `h` macro ships in v1 as opt-in sugar. Plain Reagent fns continue to work; staged adoption.

The bare `[:my-view "args"]` form in raw hiccup is deferred to OQ-7 (substrate decoupling work) — it requires Reagent extension and is out of scope for v1.
