# EP 002 — Frames

> Status: Drafting. Builds on the locked stances in [000-Vision.md](000-Vision.md). The hardest part of re-frame2; in particular, view ergonomics is the section that makes or breaks the whole design.

## Abstract

A **frame** is a first-class re-frame entity, identified by keyword, that owns the runtime state of a re-frame application: its `app-db`, its event router/queue, and its subscription cache. Multiple frames can coexist on the same page, allowing multiple instances of the same app (devcards, isolated widgets, serial test instances) to live independently.

All frames share **one global handler registrar**. Multi-frame means "multiple instances of the same app's handlers" — devcards, isolated widgets, story variants, test fixtures — not "multiple different apps with different handler sets on one page." The latter use case (micro-frontends, embedded white-label widgets) is out of scope; iframes already serve it.

**Backwards compatibility:** existing single-frame apps need no migration. A pre-registered `:re-frame/default` catches every dispatch and subscription that doesn't specify a frame; today's re-frame is structurally re-frame2 with only the default frame in play.

## Goals

This EP inherits the constraints and goals from 000 and adds two frame-specific design rules:

- **Frame plurality is invisible to single-frame apps.** No new API surfaces in user code unless the user opts in.
- **Frame identity is a value, not a reference.** Frames are addressed by keyword in user code; runtime frame *records* are an internal detail.

## API at a glance

```clojure
;; Registration (lifecycle)
(rf/reg-frame   :todo {:on-create [:todo/initialise]})   ;; create + register, atomic; app-db starts {}
(rf/reg-frame   :todo {:on-create [:todo/initialise]})   ;; against existing — surgical update (config replaced; runtime state preserved)
(rf/reset-frame :todo)                                    ;; explicit full replace — app-db cleared, :on-create re-fires
(rf/destroy-frame :todo)                                  ;; tear down — remove from registry

;; View ergonomics
[rf/frame-provider {:frame :todo}       ;; React context: keyword in, not value
 [todo-list]]
(rf/reg-view :counter {,,,} (fn [label] ,,,))   ;; injects frame-bound `dispatch`/`subscribe`

;; Plain (non-view) APIs — frame-aware variants
(rf/dispatch      [:foo])                          ;; defaults to :re-frame/default
(rf/dispatch      [:foo] {:frame :todo             ;; opts map extends the dispatch envelope
                          :fx-overrides {:http stub-fn}})
(rf/dispatch-sync [:foo] {:fx-overrides {...}})    ;; same opts-arg shape, sync variant
(rf/subscribe     [:bar])                          ;; defaults to :re-frame/default
(rf/subscribe     [:bar] {:frame :todo})           ;; opts arg targets a specific frame

;; Test/REPL helper
(rf/with-frame :todo
  (rf/dispatch-sync [:init])
  @(rf/subscribe [:status]))
```

## What lives in a frame

```clojure
{:id           :todo                    ;; the keyword identifier
 :app-db       <atom>                   ;; this frame's app-db
 :router       {...}                    ;; this frame's event queue/scheduler state
 :sub-cache    {...}                    ;; this frame's signal-graph cache
 :lifecycle    {:created-at <ts>
                :destroyed? false
                :listeners  [...]}
 :config       {...}}                   ;; whatever was passed to `reg-frame`
```

Three observations:

1. **Handlers are not in the frame.** The handler registrar is global, shared across all frames. Frames isolate *state*, not *behaviour*.
2. **The signal graph is per-frame.** Two frames running the same `:total` subscription compute against their own `app-db`s, cache against their own sub-caches; they are independent.
3. **Frames are mutable runtime objects.** They are not values. User code holds keywords; the framework holds frame records.

## Frame lifecycle

### `reg-frame` is atomic

```clojure
(rf/reg-frame :todo {:on-create [:todo/initialise]})
;; creates a frame record (app-db starts {}), registers it under :todo,
;; dispatch-syncs :todo/initialise into it, returns the keyword.
```

Atomic create-and-register. There is no way to obtain an unregistered frame; this matches the rest of re-frame's `reg-*` family and avoids orphan-frame states.

`reg-frame` accepts a metadata map mirroring other registrations:

```clojure
(rf/reg-frame :todo
  {:doc          "..."                          ;; like all reg-*
   :on-create    [:todo/initialise]             ;; single event dispatched after creation
   :on-destroy   [:todo/cleanup]                ;; single event dispatched before teardown
   :fx-overrides {:http http-stub-fn}           ;; per-frame fx replacements
   :interceptors [recorder validator]           ;; prepended to every event in this frame
   :drain-depth  100                            ;; depth limit for run-to-completion drain
   :ns :line :file})                            ;; auto-supplied
```

**Frames always start with `app-db = {}`.** There is no `:db` config key — initialisation happens via the `:on-create` event. This keeps "events are the unit of state change" as a single, consistent mechanism: the initial state is built by the same dispatch pipeline that handles all subsequent state changes.

`:on-create` accepts a **single** event vector. The framework dispatch-syncs it into the freshly-created frame, draining to fixed point per run-to-completion. By the time `reg-frame` returns, the cascade has settled and `app-db` is in whatever state the cascade produced.

If the frame's initialisation needs to fire multiple events, the single `:on-create` event's handler does so via its effect map:

```clojure
(rf/reg-event-fx :todo/initialise
  (fn [{:keys [db]}]
    {:db (assoc db :items [] :status :idle)
     :fx [[:dispatch [:todo/restore-session]]
          [:dispatch [:todo/load-preferences]]]}))
```

`:on-destroy` is symmetric: a single event dispatched before teardown.

The framework stamps the dispatch envelope with the frame's id automatically — the user doesn't write `dispatch` or specify `:frame`. If the event handler needs the frame-id at runtime, it reads `(:frame m)` from its context.

[EP 007 — Stories](007-Stories.md) builds on this for variants but uses its own multi-event setup sequence (not desugared to `:on-create`, which is single-event by design).

### Destroy

```clojure
(rf/destroy-frame :todo)
```

- Drops the frame from the registry.
- Disposes the sub-cache (each cached reactive is torn down so nothing leaks listeners).
- Stops the router.
- Fires `:on-destroy` events before teardown if specified.
- Subsequent `(dispatch [...] {:frame :todo})` / `(subscribe [...] {:frame :todo})` to a destroyed frame throws a clear, machine-readable error: `{:reason :frame-destroyed :frame :todo}`.

### Re-registration — surgical update

`reg-frame` against an already-registered keyword performs a **surgical update**: existing runtime state (`app-db`, sub-cache, router queue, in-flight events) is preserved; only the metadata/config is replaced. This is what makes hot-reload Just Work — figwheel/shadow-cljs recompile triggers re-evaluation of `reg-frame` forms, the page doesn't blink, the user's state survives.

**What gets replaced on surgical update:**

- `:fx-overrides` map — applied to envelopes built *after* re-registration.
- `:interceptor-overrides` map — applied to envelopes built after re-registration.
- `:interceptors` vector — applied to events handled after re-registration.
- `:doc`, `:ns`/`:line`/`:file` metadata.
- `:drain-depth` — applied to subsequent drains.
- `:on-create` / `:on-destroy` — recorded for future `reset-frame` / `destroy-frame` calls; not re-fired on surgical update.

**What does NOT change on surgical update:**

- The live `app-db` keeps its current value.
- `:on-create` events do not re-fire (they fired on the original creation and don't re-run on re-registration).
- `:on-destroy` events do not fire (they only fire on `destroy-frame`).
- Sub-cache, router queue, in-flight events all remain.

**Trade-off:** there's some "config drift" between what `reg-frame` literally says and what's running. A developer who edits `:on-create` and re-saves will not see the new init event re-fire — they need to call `reset-frame` to apply it. This matches today's re-frame: `app-db` doesn't reset when you save a file, and developers expect that.

### `reset-frame` — full replace, opt-in

For developers who want a fresh start (a test fixture, an explicit "reset to initial state" action, or a story that re-runs setup on demand):

```clojure
(rf/reset-frame :todo)
```

Equivalent to `(destroy-frame :todo)` followed by `(reg-frame :todo <current-config>)`:

- Existing `app-db` is reset to `{}`.
- Sub-cache is disposed; live subscriptions re-materialise on next deref.
- Router queue is cleared; any unprocessed events are dropped.
- The configured `:on-create` event re-fires as if it were a fresh creation, draining its cascade synchronously.

`reset-frame` is the right tool for "I want this back to its initial state." Tests use it between test cases. Story tools use it for "reset" buttons.

`destroy-frame` (covered above) goes one step further — the frame keyword is removed from the registry; subsequent dispatch/subscribe with that frame throws `:reason :frame-destroyed`.

### `:re-frame/default`

Registered by re-frame at load time, under the keyword `:re-frame/default`, as a regular registry entry. No special-casing in the lookup path. Listable in tooling. Overridable by re-registration if a user really wants different default behaviour (rare; documented).

### Per-instance frames — anonymous `make-frame`

Some use cases need a frame *per mount* rather than a named singleton — devcards, modal stacks, multiple live instances of a `[counter-widget]`, dynamic tabs. The keyword-identity scheme would make per-mount unique IDs awkward without a helper, so re-frame2 ships `make-frame` alongside `reg-frame`:

```clojure
(rf/make-frame opts) → :rf.frame/123     ;; gensyms a unique keyword, registers, returns it
(rf/destroy-frame :rf.frame/123)         ;; same destroy as named frames

(rf/reg-event-db :counter/init (fn [_ _] {:count 0}))    ;; init event registered once

(defn counter-widget [label]
  (r/with-let [f (rf/make-frame {:on-create [:counter/init]})]
    [rf/frame-provider {:frame f}
     [counter-view label]]
    (finally
      (rf/destroy-frame f))))
```

`make-frame` shares the `reg-frame` code path; the only difference is the generated keyword (with a `:rf.frame/` namespace to avoid colliding with user-chosen names). The naming pun parallels `gensym` vs. explicit symbols. Lifecycle is the user's responsibility — pair `make-frame` with a `destroy-frame` in `:finally` of `r/with-let` (or equivalent unmount hook).

Tests use this pattern as their fixture lifecycle:

```clojure
(rf/reg-event-db :auth/init-idle (fn [_ _] {:auth/state :idle}))

(deftest auth-flow
  (let [f (rf/make-frame {:on-create [:auth/init-idle]})]
    (try
      (rf/dispatch-sync [:auth/login-pressed] {:frame f})
      (is (= :validating (get-in @(rf/get-frame-db f) [:auth :state])))
      (finally
        (rf/destroy-frame f)))))
```

## Routing: the dispatch envelope

The mechanism that gets a dispatch to the right frame is **frame identity carried on the in-flight event**.

User-facing event shape stays a vector — `[:add-todo "milk"]` — for backwards compat. *Internally*, every dispatch becomes a **dispatch envelope**:

```clojure
{:event        [:add-todo "milk"]      ;; the user-facing vector, unchanged
 :frame        :todo                   ;; resolved frame keyword
 :fx-overrides {:http stub-fn}         ;; per-dispatch fx replacements (master's dispatch-with)
 :trace-id     "..."                   ;; tooling/agent fields
 :source       :ui                     ;; e.g. :ui, :timer, :http, :repl, :machine
 :dispatched-at <ts>}
```

The envelope is just a map. Any field can be set by:

- **The two-arg dispatch form** — `(dispatch [:foo] {:frame :todo :fx-overrides {...}})`. The opts map's keys flow into the envelope. `dispatch-sync` takes the same opts arg.
- **Frame-level config** — `reg-frame` keys (`:fx-overrides`, `:interceptor-overrides`, etc.) are merged into the envelope by the routing layer when an event is routed to that frame.
- **Lexical injection** — `reg-view`-injected `dispatch` closures carry `:frame` from React context.

re-frame2 does **not** ship `dispatch-to`, `dispatch-with`, or `dispatch-sync-with` — the two-arg `dispatch` form covers all of these cases. Master's `dispatch-with` users migrate to `(dispatch event {:fx-overrides overrides})`. (Clojure metadata still works as a backwards-compat shim — see MIGRATION.md.)

The router reads the envelope's `:frame`, looks up the frame in the registry, and runs the interceptor pipeline against that frame's `app-db`/router context. Handlers receive the same shape they always have (`db`+`event-vec` for `reg-event-db`, context map for `reg-event-fx`); the envelope is not exposed to user handlers in v1.

### How `:frame` gets attached

In priority order, where the frame keyword comes from:

1. **Explicit `:frame` in the dispatch opts map.** `(dispatch [:foo] {:frame :todo})` always wins. The opts map's keys flow straight into the dispatch envelope.
2. **Lexical `dispatch` injected by `reg-view`.** The closure carries the frame keyword resolved from React context at render. (See View Ergonomics, below.) Internally, the injected `dispatch` is `(fn [event] (dispatch event {:frame <captured>}))`.
3. **Dynamic binding.** Inside `(with-frame :todo ...)` (test/REPL helper), a Clojure dynamic var carries the frame; the bare `(rf/dispatch [:foo])` in the body picks it up. This makes `(with-frame :todo (rf/dispatch [:foo]))` Just Work without an opts map.
4. **Default.** `:re-frame/default`.

(Note: master's `dispatch-with [event] {overrides}` attaches overrides via Clojure metadata. re-frame2 drops `dispatch-with` in favour of the unified two-arg form: `(dispatch event {:fx-overrides overrides})`. See [MIGRATION.md](MIGRATION.md) for the migration rule.)

## View ergonomics (the hard part)

### The problem

A view inside a `frame-provider` for `:todo` writes:

```clojure
[:button {:on-click #(dispatch [:inc])} "+"]
```

The lambda is **constructed during render** but **invoked at click time** — long after render has unwound. Whatever mechanism re-frame uses to know "the surrounding frame is `:todo`" must survive that boundary.

The mechanisms available:

- **React context** is read via `useContext`-like hooks — render-only. Gone by the time `:on-click` fires.
- **Clojure dynamic binding** (`*current-frame*`) — also render-only. Unwound when the binding form returns.
- **Closures** — survive arbitrarily. If render-time code captures the frame keyword into a closure, the callback that closes over that closure has the frame.

So the design has to **convert render-time frame knowledge into a closure** that the callback closes over. The question is *who does the conversion*.

### Resolution: `reg-view` is the boundary

`reg-view` is the registered, frame-aware view abstraction. Inside a registered view's body, `dispatch` and `subscribe` are **lexically bound locals** — closures pre-bound to the frame resolved from React context at render time. Callbacks that close over these locals automatically carry the frame.

```clojure
(rf/reg-view :counter
  {:doc "A counter widget with isolated state."}
  (fn [label]
    (let [n @(subscribe [:count])]                  ;; frame-bound subscribe
      [:button {:on-click #(dispatch [:inc])}        ;; frame-bound dispatch closed over
       (str label ": " n)])))
```

Naming convention: **unqualified `dispatch`/`subscribe` inside `reg-view` are the frame-bound locals.** Qualified `re-frame.core/dispatch` continues to refer to the global function (defaults to `:re-frame/default`, also useful at the REPL).

This is the *implicit lexical injection* style chosen in 000 (the (α) option). It reads identically to today's re-frame view code. No env-arg change to view signatures.

### What `reg-view` injects

The macro wraps the user's render fn so that, on each invocation:

1. The current frame keyword is resolved from React context (via the rendering library's context-read primitive).
2. A `let` binds `dispatch`, `subscribe`, and `frame-id` to frame-bound closures (and a value, respectively).
3. The user's body runs inside that `let`.

Conceptually:

```clojure
;; user wrote
(rf/reg-view :counter
  (fn [label]
    (let [n @(subscribe [:count])]
      [:button {:on-click #(dispatch [:inc])}
       (str label ": " n)])))

;; macro produces, roughly
(register :view :counter
  (fn [label]
    (let [frame-id  (read-frame-from-context)         ;; via Reagent/UIx/etc. context-read
          dispatch  (frame-dispatch-fn frame-id)
          subscribe (frame-subscribe-fn frame-id)]
      ;; user's body, unmodified
      (let [n @(subscribe [:count])]
        [:button {:on-click #(dispatch [:inc])}
         (str label ": " n)]))))
```

Three injected names:

- `dispatch` — `(fn [event] ...)` that builds a dispatch envelope tagged with `frame-id` and pushes it.
- `subscribe` — `(fn [query-v] ...)` that consults `frame-id`'s sub-cache.
- `frame-id` — the keyword itself, useful for debugging, logging, or passing to non-frame-aware children.

Implementation note: the public frame-aware API (`dispatch`, `subscribe`, `dispatch-sync`, `clear-sub`, ...) can be generated from a single set of frame-explicit primitives by an `import-with-frame`-style macro that wraps each primitive with `(apply primitive (current-frame) args)`. freerange uses this pattern; it scales the API surface without per-fn duplication.

### Reading the frame from React context (implementation)

The `read-frame-from-context` function is implemented as a tiered lookup, with the dynamic-binding tier and default tier flanking the actual context read:

```clojure
(defonce ^:private frame-context
  (.createContext js/React :re-frame/default))

(defn- read-frame-from-context []
  (or *current-frame*                                ;; tier: dynamic var (set by `with-frame`)
      (when-let [cmp (reagent.core/current-component)]
        (let [ctx (.-context cmp)]
          (when (and ctx (not= "object" (goog/typeOf ctx)))
            ctx)))                                   ;; tier: closest enclosing `frame-provider`
      :re-frame/default))                            ;; tier: default
```

How the React-context tier wires up:

1. `frame-provider` is a React Context Provider whose `value` is the **keyword** (`:todo`), not a frame record.
2. `reg-view` attaches `^{:context-type frame-context}` metadata to its inner fn. Reagent picks this up and assigns it to the React class's `contextType` static field, so the class subscribes to the context.
3. During render, React makes the current context value available as `this.context`. Reagent exposes `this` via `reagent.core/current-component`. `(.-context cmp)` returns the keyword set by the closest enclosing `frame-provider`.

For other rendering substrates the same function differs only in lines 4–7:

- **UIx / Helix** (function components, hooks-first): replace the `current-component`/`.-context` block with `(.useContext js/React frame-context)`.
- **Tests / headless / non-React contexts:** the React-context tier is skipped entirely; the dynamic var or default carries the frame.

The substrate-decoupling work in [000-Vision.md](000-Vision.md) §OQ-7 is largely a matter of parameterising *this single function* across rendering libraries — the rest of re-frame2 doesn't care.

#### Why the keyword-in-context choice pays off

freerange puts the *frame value* in React context. On hot reload the embedded value is stale until the provider re-renders, and consumers may need to be invalidated explicitly. Putting the keyword in context and resolving it against the global frame registry on every read sidesteps this: `(reg-frame :todo {…new-config…})` swaps the registry entry, and every consumer picks up the new frame on next render automatically, with no React-side invalidation needed. Re-registration of `:re-frame/default` works the same way — context's default value is the keyword, not a record, so swapping the underlying frame is transparent.

#### Edge cases

- **No `frame-provider` in scope.** When `contextType` is set on a class but no Provider sits above the component, React leaves `this.context` as Reagent's empty default object (`#js {}`). The `(not= "object" (goog/typeOf ctx))` check filters that out and we fall through to `:re-frame/default`. (freerange uses an equivalent `(not (object? ctx))` test.)
- **Render fn invoked outside Reagent** (REPL, tests). `reagent.core/current-component` returns `nil`; the React-context tier is skipped. `with-frame` covers tests that need a non-default frame; bare invocations get `:re-frame/default`.
- **Concurrent rendering.** React 18 may render the same component multiple times before commit. The context read is idempotent — same provider value across re-renders — so this is safe. Closures captured during render hold the keyword by value; re-render produces a new closure with the same keyword. (See OQ-F-7.)

### Form-2 (closure) components

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

### Form-3 (class) components

Class-form views that return a map of lifecycle methods (`:reagent-render`, `:component-did-mount`, etc.) — supported, but the injected locals are only in scope for the lifecycle methods themselves, not for any user code outside the registered fn. Consistent treatment with Form-2; the macro injects the `let` once around the entire returned map's body.

### Plain Reagent fns

Plain `(defn my-view [args] ...)` continues to work in re-frame2.

- Calls to qualified `(rf/dispatch ...)` and `@(rf/subscribe ...)` inside such fns target `:re-frame/default`.
- If rendered inside a non-default `frame-provider`, the calls **silently route to `:re-frame/default`** — this is the known footgun.

This is the **staged-adoption** path agreed in 000. v1 documents the limitation; `reg-view` is the recommended pattern for any view that may live inside a non-default frame-provider.

#### Affordance for plain fns: `(rf/dispatcher)` / `(rf/subscriber)`

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

#### `bound-fn` macro for non-callback async closures

Sometimes a function created during render isn't a hiccup callback but is invoked later — e.g. an async result handler set up inside `r/with-let`, an interval handle, a websocket subscription. For these, `bound-fn` captures the surrounding frame at definition time and re-establishes it when the fn is later invoked:

```clojure
(rf/reg-view :stream-watcher
  (fn []
    (r/with-let [handler (rf/bound-fn [msg]
                           (rf/dispatch [:incoming msg]))    ;; sees the captured frame at call-time
                 _       (subscribe-to-stream! handler)]
      [:div ...])))
```

`bound-fn` produces a `(fn ...)` that, when called, runs in a `binding [*current-frame* <captured-frame>]` block. The same mechanism freerange uses; it composes with the resolution chain because `*current-frame*` is tier 4 of the priority list above.

### Cross-frame dispatching from a view

Inside a registered view bound to `:left`, dispatching to `:right`:

```clojure
(rf/reg-view :something
  (fn []
    [:button {:on-click #(rf/dispatch [:reset] {:frame :right})}
     "Reset right"]))
```

Use the qualified `rf/dispatch` with an explicit `:frame` opt. The injected unqualified `dispatch` is for the *surrounding* frame; the explicit two-arg form bypasses it.

### Composing registered views across frames

Registered views are referenced in hiccup either as a Var or — if EP 004 lands the keyword-tag form — via `[:my-view ...]`. They inherit the surrounding frame from React context:

```clojure
(rf/reg-view :outer
  (fn []
    [:div
     [counter "Inner"]                  ;; or [:counter "Inner"] under EP 004
     [rf/frame-provider {:frame :other}
      [counter "Other-frame inner"]]])) ;; nested provider re-points
```

Nested `frame-provider`s re-point children. The deepest provider in scope wins.

### Subscriptions composing across the signal graph

Subs can compose via `:<-`. All composition stays within a single frame's sub-cache and `app-db`:

```clojure
(rf/reg-sub :all-todos
  (fn [db _] (:items db)))

(rf/reg-sub :pending
  :<- [:all-todos]
  (fn [items _] (filter pending? items)))
```

When a view in frame `:todo` derefs `[:pending]`:

1. The frame-bound `subscribe` resolves `[:pending]` against `:todo`'s sub-cache.
2. The cache, on miss, builds the reactive chain — `[:all-todos]` is also resolved within `:todo`.
3. Both reactives close over `:todo`'s `app-db`.
4. A different frame `:other` has its own independent chain.

The signal graph is therefore per-frame. Sub-caches do not leak across frames, even though the *handler functions* (the registered `(fn [db _] ...)` bodies) are shared globally.

### Async effects and frame propagation

The trickiest correctness question. Consider:

```clojure
(rf/reg-event-fx :load-todo
  (fn [{:keys [db event]}]
    {:http {:url "/todo/1"
            :on-success [:todo-loaded]}}))
```

When `:load-todo` is dispatched in frame `:todo`, the `:http` effect fires. Some time later, the HTTP machinery dispatches `[:todo-loaded ...]`. **It must dispatch into `:todo`, not `:re-frame/default`** — otherwise the response lands in the wrong app-db.

The mechanism is symmetric with how event handlers receive their context: **fx handlers receive the same `m` that the originating event handler received**, including `:frame`. Routing follows from explicit data, not implicit state.

#### The binary fx-handler signature

`reg-fx`'s primary signature in re-frame2 is binary:

```clojure
;; re-frame2's standard :dispatch fx, frame-aware
(reg-fx :dispatch
  (fn [m event]
    (rf/dispatch event {:frame (:frame m)})))

;; multiple dispatches are expressed via :fx (nested pairs) — :dispatch-n is deprecated
;; e.g., handler returns:
;;   {:fx [[:dispatch [:event-1]]
;;         [:dispatch [:event-2]]]}
```

`m` is the same map the originating event handler received — same `:db`, `:event`, `:frame`, `:trace-id`, `:source`, plus any cofx. fx handlers ignore the keys they don't care about.

For sync fx that dispatch (or otherwise need to know the frame), the pattern is `(rf/dispatch event {:frame (:frame m)})`.

#### Async fx capture the frame in a closure

When the actual dispatching happens after the fx handler has returned (HTTP callback, websocket message, timer, deferred promise), the fx handler captures `(:frame m)` into the closure that fires later:

```clojure
(reg-fx :http
  (fn [m {:keys [url on-success on-failure]}]
    (let [frame (:frame m)]
      (-> (js/fetch url)
          (.then  #(rf/dispatch on-success {:frame frame}))
          (.catch #(rf/dispatch on-failure {:frame frame}))))))
```

The `bound-dispatcher` helper makes this a one-liner:

```clojure
(reg-fx :http
  (fn [m {:keys [url on-success on-failure]}]
    (let [d (rf/bound-dispatcher m)]                ;; closure over (:frame m)
      (-> (js/fetch url)
          (.then  #(d on-success))
          (.catch #(d on-failure))))))
```

#### Backwards compatibility — legacy unary fx handlers

Existing fx libraries shipping unary handlers `(fn [args] (rf/dispatch ...))` continue to work without update:

```clojure
;; legacy unary, no update needed for re-frame2 to compile or run
(reg-fx :dispatch
  (fn [event]
    (rf/dispatch event)))
```

`do-fx` detects arity at registration. When invoking a unary handler, it wraps the call in `(binding [*current-frame* (:frame m)] ...)`, so any internal `(rf/dispatch event)` is frame-aware via the dynamic-var fallback. **The dynamic var is a compatibility shim, not the primary mechanism** — new fx code uses the binary form.

The async case is the one place where unary legacy handlers can still get multi-frame routing wrong: if the library captures a callback that fires after the handler returns, the dynamic-var binding has unwound. Library authors targeting re-frame2's multi-frame use cases should update to binary; the migration is small (one extra arg, one `:frame` lookup, swap `(rf/dispatch ev)` for `(rf/dispatch ev {:frame frame})` or use `bound-dispatcher` in async callbacks).

#### Why this design

- **Explicit data flow.** The frame is a value in `m`, not state pulled from elsewhere. Symmetric with event handlers; consistent with re-frame's data orientation.
- **Agent-friendly and test-friendly.** An agent simulating fx calls the handler with synthetic `m`; a test passes whatever frame it wants. No `binding` setup.
- **Async safety.** Capturing `(:frame m)` into a closure is plain Clojure — values close over cleanly.
- **Backwards compatible.** Legacy unary handlers run inside a `*current-frame*` binding so internal `rf/dispatch` calls still route correctly in single-frame contexts and most sync multi-frame cases. Libraries don't have to update on day one.

#### What library authors of async fx have to know

- **Update to binary signature** when targeting re-frame2 multi-frame.
- **Read `(:frame m)` once** at handler entry; pass it into closures.
- **Pass `:frame` explicitly** in callbacks — `(rf/dispatch ev {:frame frame})` — or use `bound-dispatcher`. Don't rely on plain `dispatch` in callbacks; the binding is gone.

`bound-dispatcher` (in fx) and `bound-fn` (in view callbacks) are the same idea applied at different boundaries: capture the frame at definition time, re-establish it when the closure fires.

### What `frame-provider` is

```clojure
[rf/frame-provider {:frame :todo}
 [counter "Hello"]]
```

A thin wrapper over the rendering library's React context. It puts the **keyword** `:todo` into context, so any `reg-view`-registered descendant resolves to `:todo` at render time.

Implementation skeleton (Reagent flavour):

```clojure
(defonce ^:private frame-context (js/React.createContext :re-frame/default))

(defn frame-provider [{:keys [frame]} & children]
  (into [:> (.-Provider frame-context) {:value frame}] children))
```

For other rendering substrates (UIx, Helix), the same shape with that library's context primitive — adapter-style. Anticipated by OQ-7 in 000.

## REPL and test ergonomics

### v1 testing — see EP 008

The concrete API and patterns for v1 testing — fixture lifecycle, per-test stubbing, headless evaluation, framework adapters — live in [008-Testing.md](008-Testing.md). The foundation primitives this EP defines (`make-frame`, `destroy-frame`, `with-frame`, `dispatch-sync` with opts, per-frame and per-call overrides, registrar query API, `machine-transition`, `compute-sub`) are what 008 composes into a test-friendly experience.

If you're writing tests, start at 008. If you're designing a new framework primitive, check 008's "Forward compatibility with stories" section to ensure your design doesn't preclude what the post-v1 story library will need.

### Frame-targeted dispatch and subscribe (no provider needed)

Always available, frame-keyword-targeted via the opts arg:

```clojure
(rf/dispatch  [:add-todo "milk"] {:frame :todo})
@(rf/subscribe [:items]          {:frame :todo})
```

These are also the right APIs from non-Reagent contexts (server-side, headless tests, agents). No `dispatch-to` / `subscribe-to` sugar functions exist — the two-arg form is the one mechanism.

### `with-frame`

A helper macro for tests/REPL that establishes an implicit current frame for a block. It has **two shapes**:

#### Shape 1 — bare keyword (operate on an existing frame)

```clojure
(rf/with-frame :scratch
  (rf/dispatch-sync [:init])
  @(rf/subscribe [:status]))
```

Used when the frame already exists (registered via `reg-frame` or created earlier via `make-frame`). The macro binds the dynamic-frame var for the body's duration; plain `dispatch`/`subscribe` route to `:scratch` via the dynamic-binding tier of the resolution chain. The frame is **not** created or destroyed by the macro.

Use case: REPL sessions, tests that share a fixture across multiple `deftest` blocks.

#### Shape 2 — let-binding (create, use, destroy)

```clojure
(rf/with-frame [f (rf/make-frame {:on-create [:auth/init]})]
  (rf/dispatch-sync [:auth/login])
  (is (= :authenticated (get-in @(rf/get-frame-db f) [:auth :state]))))
```

Used when the frame's lifetime is exactly the body. The macro creates the frame from the given expression, binds the resulting frame keyword to the local symbol, runs the body in that frame's dynamic context, and **destroys** the frame on exit (success or exception).

The expression may be `(make-frame opts)`, `(reg-frame :id opts)` (returns the keyword), or any expression returning a frame keyword. The macro destroys whatever was bound on exit.

Use case: per-test fixtures, devcard widgets, REPL sessions where you want a guaranteed clean frame and guaranteed teardown.

#### Discriminator

The macro inspects its first argument:

- Keyword → Shape 1 (bare keyword form).
- Vector `[sym expr]` → Shape 2 (let-binding form, with create-and-destroy).

#### Async work outliving `with-frame`

For async closures that fire after the body returns, capture the frame keyword explicitly via `bound-fn` (above) — the `with-frame` body's dynamic binding has unwound by then. Shape 2's `destroy-frame` runs immediately on body exit; an outstanding async callback that fires after that will hit a destroyed frame.

### `dispatch-sync`

`dispatch-sync` continues to exist with its existing semantics ("skip the router queue when called from outside any handler") and gains the same opts-arg shape as `dispatch`:

```clojure
(rf/dispatch-sync [:foo] {:frame :todo
                          :fx-overrides {:http stub-fn}})
```

Useful for tests, REPL exploration, and event-bootstrapping at app startup. Inside a handler, `dispatch` and `dispatch-sync` converge in observable behaviour because the cascade is already running synchronously under the run-to-completion drain rule.

## Run-to-completion dispatch (drain semantics)

re-frame2 dispatches **run to completion**: when an external event is processed, every event dispatched (synchronously) during its handler — and every event those handlers dispatch in turn — drains to fixed point before any further external event is processed *for this frame*, and before any view re-renders.

This is the dispatch semantics, not a mode. There is no opt-out. The guarantee gives actor-style machine composition determinism for free ([EP 005](005-StateMachines.md), when drafted) and removes a class of "flash" intermediate renders that today's async dispatch can cause.

### Terminology

- **Domain events** — dispatches whose source is the outside world (user input, timer fire, websocket message, REPL). These are the "external events" that drive re-frame.
- **Actor messages** (or just "messages") — dispatches one machine emits to another within a single domain-event's processing. Same `(rf/dispatch [...])` API, distinguished only by the envelope's `:source` field (`:source :machine`) and by naming convention. There is no separate `message` primitive.

The distinction is documentary and conceptual, not technical. One dispatch pipeline, one event shape; "message" is a role a dispatched event plays in a particular context.

### Rules

1. **No cross-frame drain.** Drain runs against the frame's own router queue. A dispatch tagged with a *different* frame goes through the ordinary async path — drain does not span frames. Cross-frame coordination uses regular async `(dispatch ev {:frame other})`.
2. **Every actor message sent during a domain-event's processing drains before the next domain event for that frame.** Once drain is engaged, no further external events are processed for that frame until the cascade settles.
3. **Depth-limited (dynamic).** The drain enforces a configurable depth limit (`:drain-depth`). When exceeded, drain aborts with a machine-readable error: `{:reason :drain-depth-exceeded :frame :auth :event [...] :depth N}`. The limit is per-frame and runtime-overridable for debugging.

```clojure
(rf/reg-frame :auth
  {:on-create   [:auth/initialise]
   :drain-depth 100})       ;; default and runtime-overridable
```

### What is and isn't drained

- **Synchronous re-dispatches (machine-to-machine messages)** are drained.
- **Async effects** — `:http`, timer-based, websocket-flavoured — are *not*. Their responses arrive later as fresh domain events, which then re-engage drain for their own cascade.
- **Domain events from outside the frame** wait until the current drain cascade settles.

### Why per-frame, not per-app

Per-frame is the only granularity with clean semantics. Per-app would force every subsystem to share one drain queue. Per-event flags would let one event drain and the next not, leaving visible state inconsistent. Frames already isolate state and routing; drain naturally lives at the frame level.

### Behaviour change vs. today's re-frame

Today's `:dispatch` effect runs the dispatched event on a later tick — views may render between the originator and the dispatchee. Under run-to-completion, the dispatchee runs synchronously *before* the originator returns; views do not render the intermediate state.

For the vast majority of code this is harmless or strictly better — fewer flash renders, more deterministic ordering. Apps that *depended* on the intermediate render are broken; this is recorded as a migration rule in [MIGRATION.md](MIGRATION.md).

`dispatch-sync` continues to mean "skip the router queue when called from outside any handler." Inside a handler, ordinary `dispatch` and `dispatch-sync` converge in observable behaviour because the cascade is already running synchronously.

### Implementation note

Drain semantics fit naturally onto the transducer-shaped router sketched in OQ-F-9: the reducing function processes all queued events to fixed point and yields once.

## Per-frame and per-call overrides

> **Expected use case: testing.** Overrides are designed for tests, story fixtures, REPL exploration, and dev-time scenarios. They are *not* a production behaviour-routing mechanism — production code should use ordinary fx and interceptors registered globally. Overrides exist so tests can run without monkey-patching the global registry; they leave no trace once the test ends.

Three things can be overridden per-call (via the dispatch opts map) and per-frame (via `reg-frame` keys):

| Envelope key             | What it does                                  | Source: per-call            | Source: per-frame                       |
|--------------------------|-----------------------------------------------|-----------------------------|------------------------------------------|
| `:fx-overrides`          | Replace registered fx handlers (by id)        | dispatch opts               | `reg-frame :fx-overrides`                |
| `:interceptor-overrides` | Replace interceptors in the event's chain (by `:id`) | dispatch opts        | `reg-frame :interceptor-overrides`       |
| `:interceptors`          | *Add* interceptors to the chain (prepend)     | dispatch opts (rare)        | `reg-frame :interceptors`                |

All three flow through the dispatch envelope. Per-call and per-frame merge with **per-call winning** on key conflict.

### `:fx-overrides` — replace fx handlers by id

```clojure
;; per-call
(rf/dispatch [:user/login {:email "..."}]
             {:fx-overrides {:http         (fn [m args] (canned-response args))
                             :localstorage nil}})                       ;; nil = noop

;; per-frame
(rf/reg-frame :story.auth.login-form/loading
  {:on-create    [:auth/show-loading]
   :fx-overrides {:http (fn [m args] {:status :pending})}})
```

A standard interceptor in re-frame2's default chain reads `:fx-overrides` from the envelope and consults it before the global fx registrar at fx-resolution time:

```clojure
;; effect-handler resolution (conceptual)
(defn- effect-handler [effect-key envelope]
  (or (get (:fx-overrides envelope) effect-key)
      (get-fx-handler effect-key)))
```

### `:interceptor-overrides` — replace interceptors in the chain by id

```clojure
;; per-call — turn off the logging interceptor for this dispatch
(rf/dispatch [:user/login {:email "..."}]
             {:interceptor-overrides {:my-app/logging nil}})

;; per-frame — disable logging for everything in a test frame
(rf/reg-frame :Test.Auth/silent
  {:on-create             [:auth/test-init]
   :interceptor-overrides {:my-app/logging nil}})
```

When the router builds the interceptor chain for the event, a small step walks it and substitutes by `:id`:

```clojure
(defn- apply-icpt-overrides [chain overrides]
  (->> chain
       (mapv #(if (contains? overrides (:id %))
                (get overrides (:id %))
                %))
       (filter some?)))   ;; nil-substituted entries are removed
```

Use cases (all testing-flavoured):

- **Turn off a logging interceptor in tests** — `{:my-app/logging nil}` removes it for the test's events.
- **Swap a real-clock cofx-injector for a fixed-time one** — `{:re-frame/inject-cofx-now (constantly fixed-time-icpt)}`.
- **Replace a remote-call validator with a relaxed one** for stories that intentionally violate the schema for visualisation.
- **Wrap a specific interceptor with timing** for a perf test.

Caveat: **interceptors must have stable `:id`s** for override-by-id to find them. Anonymous interceptors (created via `->interceptor` without `:id`) cannot be overridden. Tooling can warn when an override targets an id that isn't present in any chain.

### `:interceptors` — *add* interceptors to a frame's events

Distinct from override: `:interceptors` *prepends* interceptors to the chain rather than replacing existing ones. Useful for monitoring/recording without modifying registered behaviour.

```clojure
(rf/reg-frame :Dev.Recorder/active
  {:interceptors [event-recorder-icpt
                  app-db-validator-icpt]})
```

Use cases:

- **Action recorder** — capture every dispatched event for a story's "actions" panel.
- **App-db schema validator** — run Malli check after every event.
- **Tracing decorator** — emit fine-grained trace events scoped to a particular frame.
- **Effect recorder** — capture but don't fire effects, for dry-run/documentation modes (often combined with `:fx-overrides` to also disable real firing).

### Cascade propagation

All three override types propagate transitively through any depth of `:fx [:dispatch ...]` cascade. When a handler returns an effect map containing `:dispatch`, the dispatched child inherits the parent envelope's overrides (and `:frame`, `:trace-id`, etc.). One mechanism: envelope-field-copying when queueing children; same as `:frame` propagation.

### Why ship in v1

- **Tests want all three.** Frame-scoped fx stubs, interceptor swaps, and interceptor injection together let tests run with full isolation: no global state spilled, no coordination between concurrent tests, no monkey-patching.
- **Stories want them too.** EP 007 decorators compose into these three keys.
- **Implementation is small.** Each reduces to envelope-field manipulation: the routing layer merges frame config into envelopes; standard interceptors read envelopes; chain-rewriting happens once per event entry.
- **No new substrate.** Envelopes and interceptors are existing concepts; we're sourcing envelope fields from a frame config (additive) and adding override-by-id semantics over an existing chain (also additive).

### Discoverability

`(rf/frame-meta :my-frame)` returns the override and interceptor maps, so 10x and agents can see what's been scoped and why a particular fx or interceptor didn't behave as expected.

## State machines are just event handlers

The drain semantics above were motivated by actor-style machine composition. Worth making the unifying insight explicit, because it dissolves a class of design questions that would otherwise pull foundation upward:

> **A state machine has the same contract as an event handler.** Given current state + an event, it produces new state + effects. That is exactly what `reg-event-fx` is. A machine is an event handler whose *body* happens to be a transition-table interpreter.

This means re-frame2 needs **no new registration kind, no new dispatch pipeline, no new effect substrate** for machines. EP 005, when drafted, is a small library on top of the foundation, not a reshaping of it.

### Three-way conceptual split

When discussing machines, distinguish:

- **Machine definition** — the static description: transition table, named guards, named actions, named delays. Pure data; serialisable; the artifact you visualise, share, ask an AI to reason about.
- **Machine instance** — a particular machine's runtime state, living at a path in some frame's `app-db`. There may be many instances of one definition.
- **Frame** — the actor-system boundary. All machines in a frame share its router queue and run-to-completion cascade; cross-frame messaging is async (per the [no-cross-frame-drain rule](#run-to-completion-dispatch-drain-semantics)).

The "no cross-frame drain" rule is, in this framing, the statement that **a frame is the actor-system boundary**. Each frame is one actor system; multi-frame apps host multiple independent actor systems on the same page.

### Snapshot shape

A machine instance's state at its path is a **snapshot** with two parts:

```clojure
{:state    <discrete-state>     ;; the state node — see shapes below
 :context  <extended-state>}    ;; an arbitrary map of variables that persist across states
```

The discrete `:state` value can take three shapes, supporting flat, hierarchical, and parallel state machines respectively:

```clojure
;; flat
{:state :idle :context {...}}

;; hierarchical (compound — currently in :loading.retrying.backoff)
{:state {:loading {:retrying :backoff}} :context {...}}

;; parallel (orthogonal regions active simultaneously)
{:state {:network :checking, :form :pristine} :context {...}}
```

Locking the snapshot shape early prevents users from encoding "context" by hanging keys off the state node — that mixes discrete and continuous state and breaks pattern matching on `:state`.

### Where machine instances live

The path is chosen by whoever wires up the handler:

- **A named singleton** (one auth machine for the app) lives at a stable path: `[:auth :state-machine]`.
- **Many instances of a definition** (one per active HTTP request) live under a collection: `[:requests <req-id> :state-machine]`. The instance id is part of every event the instance receives.
- **Multiple machines in one frame** each live at their own paths and are independent unless they explicitly dispatch to one another. Such cross-machine dispatching benefits from the run-to-completion semantics above.

### Pure transition + effect glue

The contract for the body of a machine-flavoured event handler is in two layers:

```clojure
;; Pure — testable without re-frame in scope, simulatable cheaply
(machine-transition definition snapshot event) => [next-snapshot effects]

;; Glue — turns the pure result into an ordinary re-frame effect map
(machine-handler path definition) => (fn [ctx event] {:db (assoc-in db path next-snapshot) ...effects...})
```

`machine-transition` is a pure function with no re-frame dependencies. Agents can call it directly to simulate "what would happen if event E arrived in snapshot S?" without committing to anything. Test harnesses exercise machines without spinning up a frame.

`machine-handler` is the re-frame glue: it reads the snapshot from `app-db` at the configured path, calls `machine-transition`, writes the new snapshot back, and returns the effects in standard `reg-event-fx` shape. **Both are library functions, not framework primitives** — they can live in re-frame2 or in a separate `re-frame.machines` library; the choice is purely a packaging question.

### Definition shape: serialisable data + co-located implementations

Following xstate's `setup(...).createMachine(...)` split, a machine definition keeps the transition table as pure data and references guards/actions/delays by id; implementations are supplied alongside but separately:

```clojure
(def auth-machine-table
  ;; pure data — fully serialisable, sharable, AI-readable, devtools-renderable
  {:initial :idle
   :states  {:idle       {:on {:auth/login-pressed
                                {:target  :validating
                                 :guard   :email-valid?
                                 :actions [:record-attempt]}}}
             :validating {:entry  [:fire-validation]
                          :on     {:auth/credentials-valid   :authenticated
                                   :auth/credentials-invalid :rejected}}
             :authenticated {...}
             :rejected      {...}}})

(def auth-machine-impls
  ;; the functions, separately
  {:guards  {:email-valid?   (fn [snap evt] ...)}
   :actions {:record-attempt (fn [snap evt] {:dispatch [:audit/login-attempt]})
             :fire-validation (fn [snap evt] {:http {:url "/auth/check" ...}})}})

(rf/reg-event-fx :auth/event
  {:doc          "Auth subsystem state machine."
   :machine-path [:auth :state-machine]}
  (rf/machine-handler [:auth :state-machine]
    (merge auth-machine-table auth-machine-impls)))
```

The wins:

- **Tables are sharable artifacts** — paste in a Slack snippet, an AI prompt, a stately.ai visualisation; persist them; review them.
- **Implementations are swappable** — tests stub out `:fire-validation` without touching the transition graph.
- **Definitions are reviewable** — you can read the machine's logic without knowing what its actions actually do.
- **No new registries** — the definition is a value, the implementations are a value, the registration is the existing event-handler registry. Stays inside the discipline.

### Composition via the existing dispatch pipeline

Two machines composing — machine A's transition emits a dispatch that machine B handles — uses ordinary `(rf/dispatch [...])`. The drain semantics above guarantee both machines settle before any view re-renders, so the composition is deterministic.

We do *not* distinguish "self-messages" (xstate's `raise`) from "actor-to-actor messages" (xstate's `sendTo`). xstate distinguishes them because actors have per-actor mailboxes and `raise` puts an event at the front of *this* actor's mailbox. We have one per-frame queue with FIFO drain — there is no "this actor's mailbox" to put events at the front of. One pipeline, one mental model.

### Inspection rides the existing trace surface

Machine lifecycle and transition events ride the same dispatch trace tools already consume (10x, re-frame-pair). The inspection events emitted by `machine-handler`:

- `:machine.lifecycle/created` — instance written into `app-db` at its path.
- `:machine.lifecycle/destroyed` — instance dissoc'd.
- `:machine/event-received` — every event arriving at a machine handler.
- `:machine/transition` — each transition taken: from-state → to-state, guard/actions invoked.
- `:machine/snapshot-updated` — the snapshot at the path was written.
- `:machine.microstep/transient` — a single step inside an eventless cascade (when EP 005 enables eventless transitions).

These are emitted as *ordinary trace events* with `:source :machine` and a `:kind` tag. Tools that want machine-specific views filter by kind; everything else gets them for free in their existing trace stream. **No new inspection mechanism is required at the framework level.**

### Tooling discoverability

Tools find machines by walking the existing event registrar and filtering by presence of `:machine-path`:

```clojure
(rf/handlers :event-fx (fn [h] (:machine-path h)))
;; → registered machine handlers, with paths and definitions
```

A Storybook-class tool reads the transition table (it's data), renders it as a diagram, reads the current snapshot from the frame's `app-db` at `:machine-path`, and highlights the active state. An agent inspects the same data to reason about transitions. Stately.ai-style visualisation compatibility falls out if the data shape is close enough to xstate's — a question 005 will answer.

### What this leaves to EP 005

The foundation gives definition/instance/frame split, snapshot shape, pure-transition contract, glue helper, inspection events on the trace surface, and tooling discoverability. [EP 005](005-StateMachines.md) details:

- Lifecycle patterns: state-scoped child machines (xstate's "invoke" pattern) vs. dynamic long-lived child machines (xstate's "spawn" pattern), encoded as conventions over `app-db` structure.
- The full transition-table grammar (guards, actions, entry/exit, eventless transitions, history, etc.).
- Hierarchical and parallel state node interpretation.
- Reply patterns (the request/response analog to xstate's `sender`).
- Library packaging (in-tree vs separate).

005 stays small because the foundation does the heavy lifting.

## Interaction with libraries

Library authors **do not need to know about frames** if they only register handlers and interceptors:

- **re-frame-undo** registers an interceptor that records pre/post `db` snapshots. When the interceptor runs, the context's `:db` is whichever frame's `app-db` is in play; undo state lives at some path inside *that* frame's app-db. Each frame ends up with its own independent undo history. The library does no extra work.
- **re-frame-async-flow** schedules events via the standard `:dispatch` effect; frame propagation is automatic per the rule above.
- **re-pressed**, **re-frame-http-fx**, etc. — same story, provided their fx implementations use the standard dispatch effect or the `bound-dispatcher` helper.

Authors of fx that escape into async land *do* have to use `bound-dispatcher` to forward the frame. This is a small, well-defined obligation; documented in [§Async effects and frame propagation](#async-effects-and-frame-propagation) and as opt-in rule O-5 in [MIGRATION.md](MIGRATION.md).

## Tooling and agent-amenability

### The public registrar query API

re-frame2 commits to a queryable public registrar for every kind of registered entity (frames, events, subs, fx, cofx, views, interceptors). [G2 in 000](000-Vision.md#g2-instrumentation--introspection-are-first-class) says this is first-class; the concrete contract:

| Query | Returns | JVM-runnable? |
|---|---|---|
| `(rf/handlers kind)` | Map of id → metadata for every handler of the given kind (`:event-db`, `:event-fx`, `:event-ctx`, `:sub`, `:sub-raw`, `:fx`, `:cofx`, `:view`, `:interceptor`). | Yes |
| `(rf/handlers kind pred-fn)` | Same, filtered by `pred-fn` applied to each metadata map. | Yes |
| `(rf/handler-meta kind id)` | Metadata for a single handler (config, source coords, doc, spec, etc.). | Yes |
| `(rf/frame-ids)` | Seq of all registered frame keywords. | Yes |
| `(rf/frame-ids prefix)` | Seq filtered by namespace prefix (e.g., `(rf/frame-ids :story)` returns all `:story.*` frames). | Yes |
| `(rf/frame-meta id)` | Metadata for a single frame (config, source coords, lifecycle, doc, override maps, interceptor list). | Yes |
| `(rf/get-frame-db id)` | Atom-deref-able handle to a frame's `app-db`. | Yes |
| `(rf/snapshot-of path)` | Snapshot value at a path in the current frame's `app-db` (typically a machine snapshot). | Yes |
| `(rf/sub-topology)` | **Static** dependency graph from `:<-` declarations: a map of `sub-id → {:inputs [<input-sub-ids>], :doc, :ns/:line/:file}`. Pure data derived from the registrar at registration time. | Yes |
| `(rf/sub-cache id)` | **Runtime** cache state for a frame: which subs are currently materialised, their current cached values, dependent components if any. Requires the reactive runtime. | **No** — CLJS-only |

Most queries are JVM-runnable because they read from the registrar (which is data) and from `app-db` (which is data). One query is not, and the table marks it: `sub-cache` reads runtime state from the reactive substrate (currently Reagent-specific). Static topology and snapshot reads stay pure-data.

The metadata maps returned by `handler-meta` and `frame-meta` follow a documented shape — see [§Registration shape](000-Vision.md#registration-shape-ep-001-territory) in 000-Vision for handler metadata, and [§reg-frame is atomic](#reg-frame-is-atomic) above for frame metadata. (EP 001 is the formal write-up for the handler-metadata contract; the contract itself is locked in 000 and consumed by this section.) Tools (10x, re-frame-pair, agents, story tools) read these and present them however they want.

### Per-frame and trace surface

- **Per-frame app-db inspection** — covered by `get-frame-db` above.
- **Trace per frame.** Each frame's router emits a stream of trace events (event in, interceptors, effects out) that 10x and other tools subscribe to. Coordination point with 10x: epochs are tagged with their frame.
- **Hot-reload notifications.** `reg-frame`/`reg-event-*`/etc. re-registration fires notifications on a re-frame-internal pub/sub that tools can listen to and refresh their state.

## Storybook-style tooling

A purpose-built CLJS analog of Storybook (story-by-story rendering of components in isolation, with discoverable metadata and isolated state) maps almost directly onto re-frame2's foundation. Full design lives in [EP 007 — Stories, Variants, and Workspaces](007-Stories.md); the foundation hooks 007 consumes are:

- **Each story/variant is a frame.** Multiple stories on one page share the global handler registry; each has isolated `app-db`/router/sub-cache.
- **Discovery is free** — frame and view registries both expose `:doc`, source coords, args info.
- **Hot reload is free** — keyword-in-context means edits to a view re-register and every story picks up the new fn next render.
- **Action logging is straightforward** — the dispatch envelope already carries the originating frame; Storybook's "Actions" panel filters by the `story` namespace prefix.
- **Per-story isolation is automatic** — click in story A, only A's `app-db` changes.
- **Per-frame fx and interceptor overrides** ([§Per-frame and per-call overrides](#per-frame-and-per-call-overrides)) handle the test/story stubbing case directly.
- **`make-frame`** (§OQ-F-10) handles per-mount isolation when stories want unique-per-mount frames rather than named-and-shared.

The principle worth highlighting: the introspection surface that supports Storybook is **the same surface** that supports 10x, re-frame-pair, and AI agents. Designing well for Storybook is designing well for all of them — and vice versa.

## Open questions

### OQ-F-1. ~~`reg-frame` re-registration semantics~~ — *resolved.*

**Surgical update is the default.** `reg-frame` against an existing keyword preserves runtime state (`app-db`, sub-cache, router) and replaces only the config. `reset-frame` does full replace as an opt-in. `destroy-frame` removes from registry. See [§Re-registration — surgical update](#re-registration--surgical-update) above.

### OQ-F-2. ~~Initial-`:db` shape — value or fn?~~ — *resolved.*

**`reg-frame` does not take a `:db` config.** Frames always start with `app-db = {}`. Initialisation happens via the single `:on-create` event, which is dispatch-synced into the frame at creation. The init event's handler can set initial state (`:db {...}` in its effect map) and chain follow-ups via `:fx` (nested-pair form). See [§reg-frame is atomic](#reg-frame-is-atomic) above. Single mechanism (events) for all state changes; no value-vs-fn discriminator; no special static-init path.

### OQ-F-3. Event-id collisions on re-registration

Hot-reloading the same handler under the same id is normal and expected. But re-registering the same id with a *different* handler function — accidentally, e.g. two namespaces colliding — is silent last-write-wins. Should re-frame2 warn at registration time when an id is being re-registered with a function whose source coords don't match the previous registration? Probably yes, with a configurable threshold.

### OQ-F-4. Sub-cache invalidation across frames

If two frames depend on a shared piece of *registry* state (handler definitions), and a sub is hot-reloaded, both frames' caches need invalidation for any cached reactives derived from that sub. Mechanism: registry change fires a notification that frame sub-caches subscribe to. Detail-level design; flagged here so it is not forgotten.

### OQ-F-5. Plain Reagent fns: how loud is the footgun warning?

Should `dispatch` (the qualified, default-frame-targeted one) detect when it is being called from inside a non-default `frame-provider` subtree and warn? Detection is non-trivial (requires a render-side hook). A cheaper alternative: 10x and tooling highlight cross-frame dispatches that landed in `:re-frame/default` from a non-default subtree. Cheaper, possibly enough.

### OQ-F-6. ~~Frame-aware events outside views~~ — *resolved.*

The canonical spelling is the **two-arg dispatch with an opts map**: `(rf/dispatch [:foo] {:frame :todo})`. Metadata-on-event-vector still works as a backwards-compat shim but is not the documented mechanism. `dispatch-to` and `dispatch-with` are not shipped — the unified two-arg form covers their use cases.

### OQ-F-7. Concurrent React rendering

React 18's concurrent rendering can render the same component multiple times before committing. `reg-view`'s injected `dispatch` is a value, so it survives this fine. But any `dispatch` *executed during render* (Form-2's outer fn, `:on-create`-style patterns) may run more than once. Confirm with the substrate (Reagent today; possibly UIx tomorrow per OQ-7) and document.

### OQ-F-8. Sub-cache disposal on frame destroy

When `destroy-frame` runs, every cached reactive needs its `dispose!`-equivalent called. With Reagent reactions today, this is direct. With a future substrate-agnostic substrate (per 000's OQ-7), the disposal contract becomes part of the adapter API. Flagged so the adapter-layer design includes it.

### OQ-F-9. Transducer-shaped event processing (substrate-agnostic router)

pure-frame implements event processing as a transducer parameterised by the frame: `(frame-transducer-factory frame) → transducer`, with the reducing function determining how state flows (sync, queued, batch). The transducer captures the per-event step (resolve handler → run interceptor pipeline → produce new state); the reducing function decides how successive states are accumulated and committed.

Worth considering for v1 even if the broader substrate-decoupling work in 000's OQ-7 is deferred. A transducer-shaped router is reusable, testable, and extensible without exposing rendering or scheduling primitives at the public API — it doesn't pull in core.async or any other concurrency machinery (re-frame doesn't use core.async today and re-frame2 should not introduce it). Flagged for an EP-level design pass alongside the router work.

### OQ-F-10. ~~Per-instance frames via anonymous `make-frame`~~ — *resolved; see "Per-instance frames" below.*

### OQ-F-11. ~~Per-frame fx override and interceptor injection~~ — *resolved; see [§Per-frame and per-call overrides](#per-frame-and-per-call-overrides).*

## Migration

See [MIGRATION.md](MIGRATION.md) for the maintained, AI-agent-facing migration prompt with concrete rules. Short version: single-frame apps need no changes; private-namespace access (`re-frame.db/app-db` etc.) breaks; everything else is additive opt-in.
