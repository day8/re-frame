# re-frame.tooling

This namespace provides a Stable surface for tooling consumers such as `re-frame-pair`, `re-frame-10x`. 

It re-exports symbols defined in `re-frame.core`, `re-frame.trace`, `re-frame.subs`, and
`re-frame.registrar`. Source-of-truth lives in those namespaces; this page
is the discoverability index, not a redirect or shim.


## Usage

```clojure
(require '[re-frame.tooling :as rft])

(rft/dispatch-with [:my-event] {:effect-id (fn [_] ...)})
(rft/register-trace-cb :my-tooling (fn [traces] ...))
@rft/query->reaction          ;; live subscription cache
@rft/kind->id->handler        ;; registrar atom
```

## Symbol Catalog

### Dispatch primitives

Substitute `:fx` handlers for the duration of a dispatch (and any
`:fx [:dispatch ...]` cascade); await a dispatch + cascade settling.

- [`dispatch-with`](api-re-frame.core.md#dispatch-with) — dispatch `event` with selected fx handlers temporarily substituted; overrides propagate through the cascade and expire when the event finishes.
- [`dispatch-sync-with`](api-re-frame.core.md#dispatch-sync-with) — synchronous variant of `dispatch-with`.
- [`dispatch-and-settle`](api-re-frame.core.md#dispatch-and-settle) — dispatch and return a deferred (CLJS Promise / CLJ promise) that resolves once the event AND its synchronous cascade settle.

### Trace channel

Subscribe to the trace stream as raw batches, or as assembled per-dispatch
epoch records.

- [`register-trace-cb`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L199) — register a callback that receives every batch of finished traces; gated on `trace-enabled?`.
- [`remove-trace-cb`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L207) — unregister a trace callback by key.
- [`register-epoch-cb`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L269) — register a callback that receives assembled epoch records (one per `:event` trace) — the partitioned, per-dispatch view downstream tools want.
- [`remove-epoch-cb`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L283) — unregister an epoch callback by key.
- [`assemble-epochs`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L326) — partition a trace batch into epoch records via `:child-of` linkage; the building block behind `register-epoch-cb`.

### Schema + validation

The contract that downstream tooling reads `:tags` against, plus an opt-in
runtime check.

- [`tag-schema`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L32) — schema describing required and optional `:tags` for every op-type re-frame emits; the load-bearing contract for downstream tooling.
- [`validate-trace?`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L137) — read the current trace-validation flag (off by default).
- [`set-validate-trace!`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L147) — toggle trace-tag validation on or off (intended for dev / CI).
- [`check-trace-against-schema`](https://github.com/day8/re-frame/blob/master/src/re_frame/trace.cljc#L154) — walks one finished trace against `tag-schema` and warns on missing required or unknown tag keys; called by the trace machinery when `validate-trace?` is on.

### Live state accessors

Read-only handles into the live subscription cache and handler registry.

- [`query->reaction`](https://github.com/day8/re-frame/blob/master/src/re_frame/subs.cljc#L18) — atom holding the live subscription cache (`{cache-key reaction}`); deref to enumerate active subscriptions.
- [`live-query-vs`](api-re-frame.core.md#live-query-vs) — snapshot sequence of every currently-live query-vector; one entry per active cached subscription.
- [`kind->id->handler`](https://github.com/day8/re-frame/blob/master/src/re_frame/registrar.cljc#L15) — atom holding the central handler registry (`{kind {id handler-fn}}` over `:event`, `:fx`, `:cofx`, `:sub`, `:error`).

### Reverse lookups

Recover a query-v from a reaction held by tooling.

- [`query-v-for-reaction`](api-re-frame.core.md#query-v-for-reaction) — given a reaction, return the query-v that produced it (or nil if the reaction is unknown to the cache).

### Version

- [`version`](api-re-frame.core.md#version) — runtime-readable string identifying the deployed re-frame artifact; useful for instrumentation and version-floor probes.
