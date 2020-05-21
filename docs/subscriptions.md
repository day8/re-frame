# On Derived Data

The UI is just derived data. 

At each moment, the DOM displayed is a "materialised view" of what is in `app-db`. 

Domino 3 modifies `app-db` and then boom, boom, boom go dominoes 4, 5 & 6, automatically producing this "materialised view", via a data flow. 

## How Exactly?

Data flows through **The Signal Graph**.

`app-db` is the ground truth of a re-frame app,
and it is at the root of a Directed Acyclic Graph (DAG) called the **Signal Graph**.  At the other extent of this graph - at the leaves -
are the `ViewFunctions`, which calculate hiccup.

Typically, the Signal Graph is not deep, with only a few interior layers of nodes
between root and leaves. These interior nodes are the subscription nodes 
that you create via `regsub`. Or, more accurately, you use `regsub` to register 
how such nodes should be created, if and when they are needed.

Data flows through this graph, being transformed by the journey and, as a result, the data which 
arrives at the leaf `ViewFunctions` will be **a materialised view** of what was originally in `app-db`. 

The nodes of the graph are pure functions. When data flows along an arc and into a node, 
it becomes "an argument" to that node's pure function. That function will be "called" with 
the input arguments from input arcs, and it will produce a return value, which then flows along 
that node's output arcs to child nodes, where the process repeats.

It is derived data all the way through the graph. Even the hiccup produced by leaf nodes is 
just more derived data. A re-frame app is 75% derived data. I just made that number up, 
but you get the idea: there's a bit of it. 

Indeed, the process doesn't stop with leaf `ViewFunctions`. Hiccup is turned into DOM, which is more derived data. 
And the browser turns DOM into pixels - yep, more data.
And a monitor turns pixels into photons (data, don't fight me here, I'm on a roll), 
which your eye cells detect and turn into chemicals reactions (data) which cause nerve cell signals (totally data),
which reaches the priors in your brain (data). Derived data all the way, baby!  Your brain is domino 12. 

Too much? Okay, fine, back to the more limited picture.

## The Four Layers

Conceptually, all nodes in the `Signal Graph` are a part of the same dataflow, but it will
be instructive to label them as follows:

   - **layer 1** - `ground truth` - is the root node, `app-db`
   - **layer 2** - `extractors` - subscriptions which extract data directly from `app-db`, but do no further computation.
   - **layer 3** - `materialised views` - subscriptions which obtain data from other subscriptions (never `app-db` directly), and compute derived data from their inputs
   - **layer 4** - `leaf nodes` - the `ViewFunctions` which compute hiccup.


The simplest version of the Signal Graph has no `layer 3` nodes.
It only has `layer 2` subscriptions which extract data from `app-db`, and those values 
then flow unchanged into `ViewFunctions`.

In more complex cases, a `ViewFunction` needs a materialised view 
of the data in `app-db` and means `layer 3` subscription nodes. 
An extractor (layer 2) subscription will extract a fragment of `app-db` 
which will then flow into a `layer 3` node which will compute 
the materialised view of that fragment and, only then,
does data flow into the  `ViewFunction`. 


## As Infographic

<img src="../images/subscriptions.png?raw=true">

## Graph Creation

Although data flows through the `Signal Graph` from `app-db` towards the 
`ViewFunctions`, graph formation happens in the opposite direction.

When a `ViewFunction` uses a subscription, like this `(subscribe [:something :needed])`, 
the sub-graph of nodes needed to service
that subscription is created. The necessary sub-graph will "grow backwards" from the `ViewFunction` 
all the way to `app-db`. So it is "the data thirsty demands" of currently rendered
`ViewFunctions` which dictate what nodes exist in the `Signal Graph`. 

And, when a `ViewFunction` is no longer rendered, the sub-graph needed to service 
its needs will be destroyed, unless it is still needed to 
service the needs of another, current `ViewFunction`.

## Propogation Pruning 

The Signal Graph is reactive. When a node's inputs change, the node's subscription handler (function)
re-runs automatically. The value it returns then becomes the node's new output value, and it will 
flow to downstream nodes in the graph, causing them to also re-run. 

But this only happens if the handler's output is different to the "last time" it ran.
If a handler's return value "this time" is 
the same as "last time", data is not propagated to the sub-graph. No need. Nothing has changed. 

The computation for each node is performed by a pure fucntion and a pure function will return 
the same value each time it is called with the same arguments. So, if we were to give a downstream node
the same inputs as last time, it would produce the same outputs as last time, including the same hiccup at the leaves.

## Different How?

Data values "this time" and "last time" are regarded as "being the same" if CojureScript's `=` says they are.


## Why Layer 2?

Why is a layer of "extractors" necessary? 

**It is an efficiency thing.** `app-db` will be changed by almost every `event`, often in a small, 
partial way. But any change whatsoever will cause `Layer 2` subscription to be automatically re-run.
All of them. Every time. This is because `app-db` is their input value, and subscriptions re-run when 
one of their inputs change. 

`Layer 2` handlers extract a fragment from `app-db` and then immediately prune
further propagation through their sub-graph graph if the fragment hasn't changed from "last time". As a consequence, 
the CPU intensive work in `layer 3` and `layer 4` is only performed when necessary.

`Layer 2` nodes act as the Signal Graph's circuit breakers. We want them to be as computationally simple as possible.

## reg-sub 

Subscription handlers are registered using `reg-sub`. These handlers are the functions which take 
input values, flowing into the node, and calculate a derived value to be the node's output.


`Layer 2` subscriptions are registered like this:
```clj
(re-frame.core/reg-sub  ;; a part of the re-frame API
  :id                   ;; usage: (subscribe [:id])
  (fn [db _]            ;; `db` is the map out of `app-db`
    (:something db)))   ;; trival extraction - no computation
```

This registers a `computation function` - a pretty simple one which just does an extraction.

`Layer 3` subscriptions depend on other subscriptions for their inputs, and they are registered like this:
```clj
(reg-sub 
  :id

  ;; signals function
  (fn [_ _]
    [(subscribe [:a]) (subscribe [:b 2])])     ;; <-- these are the inputs

  ;; computation function
  (fn [[a b] _]                   ;; input values supplied in a vector
      (calulate-it a b)))
```
You supply two functions: 

1. a `signals function` which returns the input signals for this kind of node. It 
   can return either a single signal, or a vector of signals, or a map where the 
   values are the signals. In the example above, it is returning a vector of signals.

2. a `computation function` which takes 
  the input values provided by the `signals function`, supplied as the first argument,
  and it produces a new derived value which will be the output of the node. 


!!! Note "Registration Doesn't Mean A Node Exists"
    When you use `reg-sub` to register a handler, you are not immediately 
    creating a node in the Signal Graph. 
    At any one time, only those nodes required to service the needs of **current** `ViewFunctions` will exist. 
    Registering a handler only says how to create a Signal Graph node when and if it is needed.

## Syntactic Sugar

The layer `Layer 3` subscription above can be rewritten using some syntactic sugar:
```clj
(reg-sub 
  :id

  ;; input signals 
  :<- [:a]        ;; means (subscribe [:a] is an input)
  :<- [:b 2]      ;; means (subscribe [:b 2] is an input)

  ;; computation function
  (fn [[a b] _]
       (calulate-it a b)))
```

## Review TodoMVC

Please carefully review the heavily commented subscription code
[in the todomvc example](https://github.com/day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs). 
It will provide more perspective and explanation on how to use `reg-sub` to create `Layer 2` and `Layer 3` subscriptions. Plus real examples of how to use `:<-`

