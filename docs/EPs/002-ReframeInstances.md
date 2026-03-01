## EP 002 - Multiple re-frame Instances

> Status: Draft

## Abstract

This EP defines the programmer-facing ergonomics for running multiple `re-frame`
instances on one page. The goal is to support isolation where needed, while
preserving the familiar single-app feel in normal usage.

## Problem

Today, `re-frame` effectively behaves as one runtime per page. That is simple,
but it blocks important scenarios:

1. Multiple instances of the same app side-by-side (`devcards`, embedded widgets).
2. Multiple instances of the same app embedded in different areas of a host page.
3. Test and REPL flows that create and discard isolated app worlds.

The design question is ergonomic first: how should this feel to a programmer?

## Design goals

1. Keep existing `re-frame` habits mostly intact.
2. Avoid prop-drilling frame values through every view.
3. Make isolation explicit when needed, implicit when obvious.
4. Preserve an explicit API path for tests, integration, and non-UI code.
5. Make "which app world am I talking to?" easy to reason about.

## Non-goals

1. This EP does not prescribe timelines, rollout steps, or migration plans.
2. This EP does not lock in internal implementation details.
3. This EP does not attempt to support multiple different application types
   on one page.

## Programmer mental model

Each `[rf/frame-provider {:frame f} ...]` subtree is its own `re-frame` world.
Inside that subtree, plain `rf/subscribe` and `rf/dispatch` should feel normal.

Programmers should not have to thread `frame` through component arguments just to
perform routine subscriptions and dispatches.

## Proposed ergonomic API

```clojure
;; lifecycle + explicit frame values
(rf/make-frame opts?)        ;; => frame
(rf/destroy-frame frame)

;; view boundary
(rf/frame-provider {:frame f} & children)

;; ergonomic defaults (frame resolved from current context/binding)
(rf/dispatch event)
(rf/dispatch-sync event)
(rf/subscribe query-v)

;; ergonomic callback path for handlers/async callbacks
(rf/use-dispatch)            ;; => (fn [event])

;; explicit path for tests/integration/non-UI code
(rf/dispatch-to frame event)
(rf/dispatch-sync-to frame event)
(rf/subscribe-to frame query-v)
(rf/with-frame frame & body)
```

## Usage patterns

### 1) Two isolated widgets on one page

```clojure
(defonce left-frame  (rf/make-frame {:id :left}))
(defonce right-frame (rf/make-frame {:id :right}))

(defn page []
  [:div
   [rf/frame-provider {:frame left-frame}
    [counter-widget "Left"]]
   [rf/frame-provider {:frame right-frame}
    [counter-widget "Right"]]])
```

```clojure
(defn counter-widget [label]
  (let [dispatch! (rf/use-dispatch)
        count     @(rf/subscribe [:counter/value])]
    [:div
     [:h3 label]
     [:button {:on-click #(dispatch! [:counter/inc])}
      (str "Count: " count)]]))
```

### 2) Same app mounted in two host-page regions

```clojure
(defonce top-frame    (rf/make-frame {:id :top}))
(defonce sidebar-frame (rf/make-frame {:id :sidebar}))

(defn host-page []
  [:main
   [rf/frame-provider {:frame top-frame}
    [dashboard/root]]
   [rf/frame-provider {:frame sidebar-frame}
    [dashboard/root]]])
```

### 3) Explicit frame control outside UI code

```clojure
(let [frame (rf/make-frame {:id :batch})]
  (rf/dispatch-sync-to frame [:init])
  @(rf/subscribe-to frame [:status]))
```

## Handler and interceptor model

All frames in this EP are instances of the same application type and therefore
share the same registered handlers and interceptors.

Registration remains global (`reg-event-*`, `reg-sub`, interceptor setup), just
as in current `re-frame`. Frame isolation applies to runtime state and event
processing context, not to registration ownership.

## Behavioral expectations

1. Isolation: state, event processing, and subscriptions are frame-local.
2. Familiarity: inside a `frame-provider`, everyday code looks like normal
   `re-frame`.
3. Explicit escape hatch: `*-to` APIs always target a specific frame.
4. Callback clarity: event handlers and async callbacks should use
   `rf/use-dispatch` (or explicit `dispatch-to`) so the target frame is
   unambiguous.
5. Safety: using a destroyed frame should fail clearly.

## Alternatives considered

### Pass `frame` through every view as an argument

This is explicit but too noisy in practice. It creates repetitive plumbing,
couples intermediate components to frame routing concerns, and degrades
readability.

### Keep one global app world only

This keeps simplicity, but it does not satisfy the core use cases of isolated
coexisting app instances.

## Open ergonomic questions

1. Should `rf/use-subscribe` exist as an optional convenience, or is plain
   `rf/subscribe` sufficient?
2. Should the default behavior outside any provider always target a designated
   default frame, or should this be configurable?
