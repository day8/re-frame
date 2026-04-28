# Overview

The re-frame API consists of: 

  - the namespace `re-frame.core` — the stable, value-position-safe function API. All registration entry points (`reg-event-*`, `reg-sub`, `reg-fx`, `reg-cofx`) and dispatch / subscribe are `defn`s, so `(map reg-event-db ...)`, `(apply reg-sub ...)`, `(partial reg-fx ...)` work as written.
  - the namespace `re-frame.macros` — opt-in macro mirror with the same call shape, plus call-site `{:file :line}` source-meta captured at macro-expansion time. Use this in dev / devtools when you want handler provenance on the registered values; switch back to `re-frame.core` for production builds where you need higher-order use.
  - a set of built-in effects

In the navigation to the left, you'll see a link to both. 

## Dependency Information 

Please review both the [releases page](http://day8.github.io/re-frame/releases/2022) and the [Clojars page](https://clojars.org/re-frame/) to discover the version you should be using. 


## Using re-frame

To use the re-frame API within your namespace, you'll 
need to `require` it, perhaps like this:
```clj
(ns my-app.some-namespace
  (:require [re-frame.core :as rf]))

;; your code here
```

You'll then be able to use the functions in the API, perhaps like this: `rf/dispatch`.


## The Most Commonly Used Part Of The API

When you are dispatching events:

  - `dispatch` (or occasionally, `dispatch-sync`)
  - `dispatch-with` / `dispatch-sync-with` when you want selected effect handlers stubbed for one dispatch
  - `dispatch-and-settle` when tests or diagnostics need to wait for a dispatch cascade to finish

When you are writing `View Functions`: 

  - `subscribe`

When you are registering:

  - event handlers - `reg-event-db` and `reg-event-fx`
  - subscription handlers - `reg-sub` (and rarely `reg-sub-raw`)
  - rarely, effect handlers - `reg-fx` 
  - rarely, coeffect handlers - `reg-cofx` with `inject-cofx`

When you register `event handlers`, you might use builtin interceptors: 

  - `path`
  - `on-change`
  - `enrich`
  - `after`
  - `trim-v`
  - `debug`

Global interceptors can be very useful:

  - register them via `reg-global-interceptors` 
  - rarely, remove them via `clear-global-interceptor`

When errors arise:

  - Catch them from events and interceptors via `reg-event-error-handler`

## Diagnostics & Instrumentation

Programmatic tooling can use these APIs without reaching into private
implementation details:

  - `version` reports the running re-frame artifact version.
  - `live-query-vs` returns a snapshot of every currently-live subscription query vector.
  - `query-v-for-reaction` returns the query vector that produced a known reaction.
  - `register-trace-cb` and `remove-trace-cb` subscribe to the raw trace stream.
  - `register-epoch-cb` and `remove-epoch-cb` subscribe to assembled per-dispatch epoch records.
  - `tag-schema` documents the trace `:tags` contract for downstream tooling.
  - `validate-trace?`, `set-validate-trace!`, and `check-trace-against-schema`
    provide opt-in trace tag validation for development and CI.

See [Debugging & Instrumentation](Debugging.md) and
[re-frame.tooling](api-re-frame.tooling.md) for the longer-form story.

## Source-meta Macros

`re-frame.macros` is an opt-in macro mirror for diagnostics that need
call-site `{:file :line}` metadata on dispatched events, subscription
queries, or registered handlers:

```clj
(ns my-app.some-namespace
  (:require [re-frame.macros :as rf]))
```

The macros have the same call shape as their `re-frame.core` counterparts
(`dispatch`, `dispatch-sync`, `subscribe`, `reg-event-db`,
`reg-event-fx`, `reg-event-ctx`, `reg-sub`, and `reg-fx`). In DEBUG builds
they attach `:re-frame/source` metadata; in production CLJS builds the
metadata path is removed by Closure dead-code elimination.

## More Rarely Used Part

Testing or dev-time related utilities:

  - `clear-subscription-cache!`
  - `make-restore-fn`
  - `purge-event-queue`

Logging/debugging:

  - `console`
  - `set-loggers`


If you write an Interceptor, use these utilities. To see how they are used, look 
at the [re-frame code for builtin Interceptors](https://github.com/day8/re-frame/blob/master/src/re_frame/std_interceptors.cljc):

  - `->interceptor`
  - `get-coeffect` 
  - `assoc-coeffect`
  - `get-effect`
  - `assoc-effect`
  - `enqueue`
