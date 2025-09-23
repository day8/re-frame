Re-frame provides some experimental features with the `re-frame.alpha` namespace.
This being a Clojure project, the "experimental" features should actually be quite stable.
We just don't guarantee that they'll become part of `re-frame.core`, or that their API won't change.

### Get started
Simply require `re-frame.alpha`. It can be used alongside `re-frame.core`:

```clojure
(ns my-app
  (:require
	[re-frame.core :as rf]
	[re-frame.alpha :as rfa]))
```

#### Drop-in replacement

You can also completely replace *core* with *alpha*. Every function offered by *core* is replicated in *alpha*.
Either use `(:require [re-frame.alpha :as rf])`, or use an alias in your tooling.
For instance, if you use shadow-cljs, merge this into your config:

```clojure
{...
 :builds
 {:my-app
  {...
   :build-options
   {:ns-aliases {re-frame.core re-frame.alpha}}}}}
```

After setting up the alpha, see the [api docs](/re-frame/api-re-frame.alpha) for full documentation of the new (or updated) functions.
These are summarized below:

### Benefit: Shorthand Function Names

A small keyboard convenience:

- `sub`: shorthand for `subscribe`.
- `reg`: shorthand for `reg-sub` and more (see [API docs](/re-frame/api-re-frame.alpha/#sub)).

### Benefit: Map queries

In *core*, you pass a vector to `subscribe`, like this: `(subscribe [:the-answer {:x 42}])`.
In other words, you pass a vector as the `query`.
Re-frame uses the first item (e.g. `:my-subscription`) to look up the corresponding subscription handler-fn.

In *alpha*, passing a vector is still supported, but the `query` can also be a map:

```clojure
(sub {:re-frame/q :the-answer
      :x          42})
```

Re-frame uses the `:re-frame/q` key to look up the subscription handler.
To register that handler, use `reg :sub`. For instance:

```clojure
(reg :sub :the-answer
	(fn empty-inputs [])
	(fn [_ {:keys [x]}]
		(str "The answer is: " x)))
```

For details, see the API docs for
[sub](/re-frame/api-re-frame.alpha/#sub)
and
[reg :legacy-sub](/re-frame/api-re-frame.alpha/#reg-legacy-sub).

### Benefit: Safe Subscriptions

In *core*, under some circumstances, subscriptions can leak memory.
See this [FAQ](/re-frame/FAQs/UseASubscriptionInAnEventHandler/) for details.

In *alpha*, the `subscribe` function works differently. It uses caching when it can guarantee memory-safety,
and computes eagerly when it can't.
**That means you can safely call `re-frame.alpha/subscribe` anywhere, even within an event handler!**

### Caveat: Safe Subscriptions

In *alpha*, subscriptions may need slow down to avoid leaking memory.
Calling `subscribe` outside a view-fn causes re-frame to bypass the cache.
Then, re-frame has to recalculate your subscription's output, even when its inputs haven't changed.

Be aware that this can slow down your app, if your subscriptions do heavy calculations.
There are a few workarounds:

- Use the `:forever` lifecycle (see [Benefit: More Lifecycles](/re-frame/FAQs/alpha/#benefit-more-lifecycles), below).
- Call `subscribe` (with the exact same arguments) inside a reagent component's render function.
  Then, re-frame can use the cache for as long as that component is mounted.
- Define your own lifecycle (see [Writing a lifecycle-fn](/re-frame/api-re-frame.alpha/#writing-a-lifecycle-fn)).

### Benefit: More Lifecycles

To use a lifecycle in your existing `re-frame.core` project, simply change the
fn from `re-frame.core/subscribe` to `re-frame.alpha/sub`, and add the `:re-frame/lifecycle` key
as metadata on the argument (see examples below). This should "just work",
even when your subscription connects to other non-*alpha* nodes.
**That means you don't need to do any refactoring to try out a lifecycle!**

In *core*, re-frame manages subscriptions in a cache (i.e. the "signal graph" state).
When you call `(subscribe query)` within a view-fn, re-frame creates a reaction (i.e. a "dataflow node")
and adds it to the cache. Subsequent calls to the same `(subscribe query)` don't require any calculation
(as long as the inputs haven't changed). Instead, re-frame just looks it up in the cache.
In effect, the subscription is "memoized" for as long as the view is mounted.
When that view unmounts, re-frame destroys the node, freeing memory
(assuming no other views depend on it).

In *alpha*, this behavior can be customized, by declaring a keyword on the `query` argument to your `subscribe` call.

- For map queries, that means including `:re-frame/lifecycle` as a key.
- For vector queries, that means including the key `:re-frame/lifecycle` in the metadata for that vector.

The lifecycles built into re-frame.alpha include:

- `:no-cache` - Eagerly computes the value every time, doing no caching.
- `:safe` - Uses the cache when it can guarantee memory-safety, and `:no-cache` when it can't.
- `:forever` - Adds a node to the signal graph once, and never removes it (similar to `re-frame.core/memoize`).
- `:reactive` - Re-frame's old behavior. Only use this lifecycle when calling `subscribe` in a render-fn.

For example:

`(sub ^{:re-frame/lifecycle :forever} [:the-answer 43])`

Oops, we've created a node which calculates 43 as its "answer", forever.
It will never leave the memory of your running app. On the bright side,
we'll never need to recalculate its output value (as long as its inputs haven't changed),
since re-frame will always look it up from the cache.

`(sub ^{:re-frame/lifecycle :no-cache} [:the-answer 69])`

Nice, we've created another node. Except it wasn't really "created", since re-frame didn't cache it.
Instead, re-frame recalculates the node's output every time you call `sub`
(even when the input signals haven't changed).

### Benefit: User-defined Lifecycles

See API docs for [Writing a lifecycle-fn](/re-frame/api-re-frame.alpha/#writing-a-lifecycle-fn)

### Benefit: Flows

Flows deconstruct subscriptions, offering a simpler alternative. See [Flows](/re-frame/Flows).

### Caveat: Flow Effects

To use the `:reg-flow` and `:clear-flow` effects, you must register your event handler
using a registration functions from `re-frame.alpha`. Otherwise, re-frame will handle these
as normal (unregistered) effects. For instance, this works:

```clojure
(re-frame.alpha/reg-sub-fx
 :flow-fx-test
 (fn [_ _]
   {:fx [[:reg-flow {:id :my-flow}]]}))
```

However, this will throw an error (that `:reg-flow` is an unregistered effect):

```clojure
(re-frame.core/reg-sub-fx
 :flow-fx-test
 (fn [_ _]
   {:fx [[:reg-flow {:id :my-flow}]]}))
```
