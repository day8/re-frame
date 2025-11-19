(ns re-frame.alpha
  (:require
   [re-frame.subs.alpha     :as subs.alpha]
   [re-frame.subs           :as subs]
   [re-frame.register.alpha :as register.alpha]
   [re-frame.interceptor    :as interceptor]
   [re-frame.flow.alpha     :as flow]
   [re-frame.events           :as events]
   [re-frame.fx               :as fx]
   [re-frame.cofx             :as cofx]
   [re-frame.registrar        :as registrar]
   [re-frame.settings         :as settings]
   [re-frame.utils            :as utils]
   [re-frame.router           :as router]
   [re-frame.loggers          :as loggers]
   [re-frame.db               :as db]
   [re-frame.interop          :as interop]
   [re-frame.query.alpha      :as q]
   [clojure.set               :as set]
   [re-frame.std-interceptors :as std-interceptors :refer [db-handler->interceptor
                                                           fx-handler->interceptor
                                                           ctx-handler->interceptor]]))
(defn reg
  "Registers a handler.

`kind`: what kind of handler to register. Possible vals:

- `:sub`: runs a subscription query which is a map.
- `:legacy-sub`: runs a subscription query which is a vector.
- `:sub-lifecycle`: creates dataflow nodes, optionally caching them.

#### reg :sub

`(reg :sub query-id signal-fn computation-fn)`

Register a `signal-fn` and a `computation-fn` for a given `query-id`.
`computation-fn` is a function of `[signals query-map]`.

The two functions provide a \"mechanism\" for creating a node
in the Signal Graph. When a node of type `query-id` is needed,
the two functions can be used to create it.

- `query-id` - typically a namespaced keyword (later used in subscribe).
- `signal-fn` - optional. Returns the input signals required by this kind of node.
- `computation-fn` - computes the value (output) of the node from the input signals and the query.

Later, during app execution, a call to `(sub {:re-frame/q ::greet :name \"dave\"})`
will trigger the need for a new `::greet` Signal Graph node (matching the
query `{:re-frame/q ::greet :name \"dave\"}`). Re-frame will look up the
associated `signal-fn` and `computation-fn`, combining them to create the node.

Just to be clear: calling `reg :sub` does not immediately create a node.
It only registers a \"mechanism\" (the two functions) by which nodes
can be created later, when a node is bought into existence by the
use of `sub`.

##### Declaring the `computation-fn`

The last argument to `reg` must be the actual `computation-fn`, but the
full declaration can be done in two ways:

1. The standard way:
A function accepting two arguments, `input-values` and `query`:

```clojure
(reg :sub :query-id
 (fn [input-values query]
   (:foo input-values)))
```

2. Syntactic sugar:
The keyword `:->`, followed by a 1-arity `computation-function`:

`(reg :sub :query-id :-> computation-fn)`

This sugary variation allows you to pass a function that will expect only one argument,
namely the `input-values`, and entirely omit the `query`. A typical `computation-function`
expects two arguments, which can cause unfortunate results when attempting to use
clojure standard library functions, or other functions, in a functional manner.
	
For example, a significant number of subscriptions exist only to get a value
from the `input-values`. As shown below, this subscription will simply retrieve
the value associated with the `:foo` key in our db:

```clojure
(reg :sub
 :query-id
 (fn [db _] (:foo db))) ;; :<---- boilerplate
```

This is slightly more boilerplate than we might want. 
Instead, we could use a keyword directly as a function:

`(reg :sub :query-id :foo)`

However, this could be dangerous. Remember that re-frame passes 
two arguments to the `computation-fn`: `input-values` and `query`. 
If the keyword `:foo` is missing from the `input-values`, our `:foo`
getter will use its second argument as a default value, returning the
`query`. That would be nonsense - the query is not the computation.

In other words, the computation should have no default output.
To achieve that, we use the token `:->`.

`(reg :sub :query-id :-> :foo)`

This form tells re-frame to pass only one argument to your `computation-fn`,
the `input-values`. Thus, your `:foo` getter will safely return `nil`
when the key is not found.

Beyond keywords, you can provide any 1-arity function.
For more complicated use cases, `partial`, `comp`, and anonymous functions 
will work as expected.

##### Declaring the `signal-fn`

The argument(s) declared after `query-id` and before `computation-fn`
  define the `input signals` part of the \"mechanism\". They specify what input values 
\"flow\" into the `computation-fn` (as the 1st argument) when it is called.

So, there are three ways to declare the input signals.
But note, the 2nd way, in which a
`signal-fn` is explicitly supplied, is the most canonical and
instructive. The other two are really just sugary variations.

**First Variation**: No input signal function given:

```clojure
(reg :sub :query-id
 computation-fn)   ;; has signature:  (fn [db query]  ... ret-value)
```

the node's input signal defaults to `app-db`
and, as a result, the value within `app-db` (a map) is
given as the 1st argument when `a-computation-fn` is called.

**Second Variation**: A signal function is explicitly supplied.

```clojure
(reg :sub :query-id
 signal-fn     ;; <-- here
 computation-fn)
```

This is the most canonical and instructive of the three variations.

When a node is created, the `signal-fn` will be called, returning the input signal(s).
as either a singleton, if there is only one, or a sequence if there are many,
or a map with the signals as the values.

The current values of the returned signals will be supplied as the 1st argument to
the `computation-fn` when it is called - and subject to what this `signal-fn` returns,
this value will be either a singleton, sequence or map of them (paralleling
the structure returned by the `signal function`).

This example `signal function` returns a 2-vector of input signals.

```clojure
(fn [query]
  [(sub {:re-frame/q :a})
   (sub {:re-frame/q :b})])
```

The associated computation function must be written
to expect a 2-vector of values for its first argument:

```clojure
(fn [[a b] query]  ;; 1st argument is a seq of two values
  ...)
```

If, on the other hand, the signal function was simpler and returned a singleton, like this:

```clojure
(fn [query]
  (sub {:re-frame/q :a}))   ;; <-- returning a singleton
```
then the associated computation function must be written to expect a single value
as the 1st argument:

```clojure
(fn [a query]    ;; 1st argument is a single value
  ...)
```

Further Note: variation #1 above, in which an `signal-fn` was not supplied, like this:

```clojure
(reg :sub :query-id
 computation-fn)   ;; has signature:  (fn [db query]  ... ret-value)
```

is the equivalent of using this
2nd variation and explicitly supplying a `signal-fn` which returns `app-db`:

```clojure
(reg :sub :query-id
 (fn [_ _] re-frame/app-db)   ;; <-- explicit signal-fn
 a-computation-fn)             ;; has signature:  (fn [db query-vec]  ... ret-value)
```

**Third variation**: Syntactic sugar

```clojure
(reg :sub :a-b-sub
 :<- [:a-sub]
 :<- [:b-sub]
 (fn [[a b] query]    ;; 1st argument is a seq of two values
   {:a a :b b}))
```

This 3rd variation is just syntactic sugar for the 2nd.  Instead of providing an
`signals-fn` you provide one or more pairs of `:<-` and a subscription vector.

If you supply only one pair, a singleton will be supplied to the computation function,
as if you had supplied a `signal-fn` returning only a single value:

```clojure
(reg :sub :a-sub
 :<- [:a-sub]
 (fn [a query]      ;; only one pair, so 1st argument is a single value
   ...))
```

Syntactic sugar for both the `signal-fn` and `computation-fn` can be used together
and the direction of arrows shows the flow of data and functions. The example from
directly above is reproduced here:

```clojure
(reg :sub :a-b-sub
 :<- [:a-sub]
 :<- [:b-sub]
 :-> (partial zipmap [:a :b]))
```
  
For further understanding, read the tutorials, and look at the detailed comments in
/examples/todomvc/src/subs.cljs.

#### reg :legacy-sub

`(reg :legacy-sub query-id signal computation-fn)`

Register a `signal-fn` and a `computation-fn` for a given `query-id`.
For details, see `:sub`, above. Compared with `:sub`, `:legacy-sub`
supports a vector as the `query`, rather than a map. For instance:

`(sub [::greet {:name \"dave\"}])`

In this case, `::greet` is the `query-id`. Re-frame looks up the associated 
`signal-fn` and `computation-fn` and computes the output of the node,
creating it if necessary. It passes the entire vector to your `computation-fn`
as the second argument.

##### Declaring the `computation-fn` (:sub-legacy)

Legacy subscriptions have another kind of syntactic sugar,
in addition to those supported by `:sub`:

The token `:=>`, followed by a multi-arity `computation-function`.

`(reg :sub :query-id :=> computation-fn)`

A vector `query` can be broken into two components, `[query-id & optional-values]`.
Some subscriptions require the `optional-values` for extra work within the subscription.
Canonically, we'd need to destructure these `optional-values`:

```clojure
(reg :sub :query-id
 (fn [db [_ foo]] [db foo]))
```

Again, we are writing boilerplate just to reach our values. Instead, we might prefer to
have direct access through a parameter vector like `[input-values optional-values]`.
That way, we could provide a multi-arity function directly as our `computation-fn`:

`(reg :sub :query-id :=> vector)  ;; :<---- Could also be (fn [db foo] [db foo])`

##### Compatibility:

Query-maps are a more recent development for re-frame.
They are implemented in a backwards-compatible way.
That means you you can pass either a vector or a map to `sub`,
  regardless of what kind of \"mechanism\" was registered for
that `query-id` (whether via `:sub` or `:legacy-sub`).

If you call `(reg :sub ...)`, you have registered a `computation-fn`
and `signal-fn` which both expect to be passed a `query-map`.
If you then call `(sub [...])`, passing a `query-vector`, re-frame will
transparently adapt your vector, passing an equivalent map to your functions.

Likewise, invoking a `:legacy-sub` mechanism with a `query-map`
will cause re-frame to pass along an equivalent vector.

When this conversion is done, re-frame includes the original form
in the metadata (using either `:re-frame/query-m` or `:re-frame/query-v`).

When converting from a map to a vector, `:re-frame/query-v` is used, if present.
Otherwise, the original map is included as the
second item (commonly thought of as the \"params\" of that query).

For instance, the query:

`{:re-frame/q ::items}`

converts to:

```clojure
^{:re-frame/query-m {:re-frame/q ::items}}
[::items {:re-frame/q ::items}]
```

Likewise, the query:

`[::items 1 2 3]`

converts to:

```clojure
{:re-frame/q         ::items
 :re-frame/lifecycle :safe
 :re-frame/query-v   [::items 1 2 3]}
```

Note that since `1 2 3` aren't named, there's no way to represent them
in the map. Instead, they can be destructured from the `:re-frame/query-v` key.

This `:re-frame/query-v` is also taken into consideration when converting a
map to a vector. For instance:

```clojure
{:re-frame/q         ::items
 :re-frame/lifecycle :reactive
 :re-frame/query-v   [::items 1 2 3]}
```

converts to:

```clojure
^{:re-frame/query-m {:re-frame/q         ::items
                     :re-frame/lifecycle :reactive}}
[::items 1 2 3]
```

#### reg :sub-lifecycle

`(reg :sub-lifecycle lifecycle-id lifecycle-fn)`

A lifecycle-fn controls how dataflow nodes are created,
sometimes managing their lifecycle within a cache (i.e. the signal graph).

When `sub` (or `subscribe`) is called, re-frame uses information within the `query`
to look up and call the associated lifecycle-fn. The lifecycle-fn returns the actual dataflow node.

It can do other things along the way - primarily, it can make use of a cache. This cache of nodes
can make a subscription more performant. Instead of creating a node and calculating
its value every time you call `sub`, re-frame can look up nodes it has already created,
along with their previous calculations.

The `lifecycle-id` determines which lifecycle-fn a subscription will use.
When `(sub query)` is called, re-frame always derives the `lifecycle-id` from the `query`:

  - Map queries can specify this with a `:re-frame/lifecycle` key.
  - Vector queries can include the `:re-frame/lifecycle` key in the vector's metadata.

When a `query` does not explicitly declare a lifecycle,
re-frame uses the `:safe` lifecycle by default.

##### Writing a `lifecycle-fn`

Whenever `sub` is called, re-frame determines the `lifecycle-id` from the `query`.
Then, it calls the associated `lifecycle-fn`, passing it the `query`.

The task of a `lifecycle-fn` is return the dataflow node necessary to calculate
the output value for `query`. Along the way, it can also store the node
within a cache (a.k.a. the signal graph).

The `re-frame.query` namespace provides some helper functions for this:

**`cached`**
Accepts a `query`.
Returns the matching dataflow node from the signal graph,
or `nil` if it is not found.

**`handle`**
Accepts a `query`.
Returns a new dataflow node.

**`cache!`**
Accepts a `query` and a dataflow node.
Adds the dataflow node to the signal graph.
The node can be looked up later, using `cached`.

**`clear!`**
Accepts a `query`.
Removes the associated dataflow-node from the signal graph.

##### `lifecycle-fn` example

For demonstration, here is a \"sliding\" lifecycle-fn which caches the last three queries:

```clojure
(def history (atom []))
(def size 3)
(def overflow? #(> (count @history) size))
(def slide! #(swap! history (comp vec rest)))

(defn sub-sliding [q]
  (if-let [cached-node (q/cached q)]
    cached-node
    (let [new-node (q/handle q)]
      (q/cache! q new-node)
      (swap! history conj q)
      (when (overflow?)
        (q/clear! (first @history))
        (slide!))
      new-node)))

(reg :sub-lifecycle :sliding sub-sliding)
```

You can use your new lifecycle by declaring `:re-frame/lifecycle`:

  `(re-frame.alpha/sub ^{:re-frame/lifecycle :sliding} [:hi 1]})`

After subscribing to more than three different queries, the sliding behavior will happen,
clearing some of the corresponding dataflow nodes from the cache.

  ```clojure
  (re-frame.alpha/sub ^{:re-frame/lifecycle :sliding} [:hi 2]})
  (re-frame.alpha/sub ^{:re-frame/lifecycle :sliding} [:hi 3]})
  (re-frame.alpha/sub ^{:re-frame/lifecycle :sliding} [:hi 4]}) ;; now [:hi 1] is cleared
  ```
Note: Lifecycles are an alpha feature. Don't expect `re-frame.core` to work the same way.
It's totally valid to add metadata to a query, but `re-frame.core` will ignore it.
For instance, this subscription creates a dataflow node with the `:reactive` lifecycle,
even though you've \"declared\" something else:

`(re-frame.core/subscribe ^{:re-frame/lifecycle :sliding} [:hi 4]})`

On the other hand, re-frame.alpha can make use of nodes created by re-frame.core.
Specifically, the `:safe` lifecycle also checks for an equivalent query
in the cache of `:reactive` nodes.
That way, you can subscribe to a query using plain old `re-frame.core/subscribe` within a view function,
and, elsewhere, subscribe to that same query using `re-frame.alpha/sub`, without needing to recalculate.
  
##### Standard lifecycles

Re-frame provides these lifecycles. The default lifecycle is `:safe`.

**`:no-cache`** Creates a dataflow node and eagerly computes a subscription's value,
without storing the node in the signal graph.

If the subscription depends on other subscriptions, then re-frame will try to dispose them,
effectively making them `:no-cache` as well (as long as nothing else depends on them).
Thus, input signals are also cleared from memory when they aren't needed.

Note: Technically, if an input subscription has inputs of its own, those won't get cleared from memory.
In practice, these deps-of-deps will be layer-2 subscriptions,
which should be simple enough to avoid leaking memory anyway.
Otherwise, you could write a new lifecycle-fn to recursively cleanup the full dependency tree.

**`:safe`** subscribes in a memory-safe way, using the cache when it can,
and eagerly computing its output when it can't.

Re-frame uses `:safe` by default, whenever you use `re-frame.alpha/sub`
or `re-frame.alpha/subscribe` without declaring a lifecycle explicitly.

There is one exception to this memory-safety, which should be negligible (see `:no-cache` for details).

If your dataflow-node is already cached (for instance, by calling `sub` in the render-fn of a mounted component),
then `:safe` will use the cached node, skipping the eager computation and cleanup.

Re-frame also checks checks the cache for an equivalent node with the `:reactive` lifecycle.
If such a node exists, re-frame uses it directly, without re-calculating or touching the cache.

Consequently:
When there are no reagent components mounted which depend on the subscription,
then the subscription will recalculate its output each time it's called,
even when its inputs are the same.

But, as long as there are reagent components, then cacheing and deduplication will
work as normal. In most cases, we expect `:safe` to be a reasonable tradeoff
between performance and memory-safety.

**`:forever`** Creates a long-lived subscription.
Re-frame looks up the cached subscription, creating it if necessary.
The subscription is permanently cached, never cleared. Re-frame eagerly
runs the subscription on creation, to create its input signals.

This behavior extends to input signals, making `:forever` effectively \"contagious\".
If the subscription depends on other subscriptions,
those subscriptions will be permanently stored in the cache,
despite other mechanisms' attempts to clear them (see `:no-cache` and `:reactive`).
This is because reagent's internals prevent disposal of \"watched\" reactions, and
a `:forever` subscription \"watches\" its inputs forever.

**`:reactive`** Looks up subscription from a cache, creating it if necessary.
The subscription stays in the cache for as long as one or more reagent
components depend on it.

Given a specific `query`, re-frame stores a set of back-references to
each reagent component which depends on its dataflow node - in other
words, each component which called `(sub query)` within its render
function. References are added when components call `sub`, and
removed when they unmount.  When the last component unmounts, and no
components depend on the node, then re-frame clears the node.

`:reactive` is unsafe when called outside a reactive context (in other
words, not inside a reagent component's render function). Since
there is no component, there is no way to clear the node. In cases
where sub is called many times with many different queries, this
effectively leaks memory. Re-frame prints a warning in this case.

Note: for more details on reactive context, see https://day8.github.io/re-frame/flows-advanced-topics/#reactive-context
"
  {:api-docs/heading "Registration"}
  [kind & args]
  (apply register.alpha/reg kind args))

(defn sub
  "Given a `query`, returns a Reagent `reaction` which will, over
  time, reactively deliver a stream of values. So, in FRP-ish terms,
  it returns a `Signal`.

  To obtain the current value from the Signal, it must be dereferenced:


      (let [signal (sub {:re-frame/q ::items})
            value  (deref signal)]     ;; could be written as @signal
        ...)

   which is typically written tersely as simple:

      (let [items  @(sub {:re-frame/q ::items})]
        ...)

  `query` is a map containing:

  - `:re-frame/q`:         Required. Names the query. Typically a namespaced keyword.
  - `:re-frame/lifecycle`: Optional. See docs for `reg :sub-lifecycle`.

  The entire `query` is passed to the subscription handler. This means you can use
  additional keys to parameterise the query it performs.

  **Example Usage**:

```clojure
(require '[re-frame :as-alias rf])
(sub {::rf/q         ::items
      ::rf/lifecycle ::rf/reactive
      :color         \"blue\"
      :size          :small})
```
  Note: for any given call to `sub there must have been a previous call
  to `reg`, registering the query handler (functions) associated with
  `query-id`.

  **Flows**

  Flows have their own lifecycle, and you don't need to provide an `::rf/lifecycle` key.
  To subscribe to a flow, simply call:

      
      (sub :flow {:id :your-flow-id})

  **Legacy support**

  `dyn-v` is not supported.

  See also: `reg`
"
  {:api-docs/heading "Subscription"}
  ([q]
   (subs.alpha/sub q))
  ([id q]
   (subs.alpha/sub id q)))

(defn reg-flow
  "Registers a `flow`.

A full tutorial can be found at https://day8.github.io/re-frame/Flows

Re-frame uses the flow registry to execute a dataflow graph.

On every event, re-frame runs each registered `flow`.
It resolves the flow's inputs, determines if the flow is live, and if so,
evaluates the output function, putting the result in `app-db` at the `:path`.

A `flow` is a map, specifying one dataflow node. It has keys:

**`:id`**: uniquely identifies the node.

- When a `flow` is already registered with the same `:id`, replaces it.
- You can provide an `id` argument to `reg-flow`, instead of including `:id`.

**`:inputs`**: a map of `keyword->input`. An input can be one of two types:

- vector: expresses a path in `app-db`.
- map: expresses the output of another flow, identified by a `::re-frame.flow.alpha/flow<-` key.
  Call the `re-frame.alpha/flow<-` function to construct this map.

**`:output`**: a function of the `keyword->resolved-input` map returning the output value of the node.

- A resolved vector input is the value in `app-db` at that path.
- A resolved `flow<-` input is the value in `app-db` at the path of the named flow.
- Re-frame topologically sorts the flows, to make sure any input flows always run first.
- Re-frame throws an error at registration time if any flow inputs form a cycle.

**`:path`**: specifies the `app-db` location where the `:output` value is stored.

- `:live-inputs`: a map of `keyword->live-input` for the `:live?` function.
- A `live-input` works the same way an `input`.
- `:live?`: a predicate function of the `keyword->resolved-live-input` map,
  returning the current lifecycle state of the node.

**`:cleanup`**: a function of `app-db` and the `:path`.

- Returns a new `app-db`.
- Runs the first time `:live?` returns `false`
- Runs when the flow is cleared (see `re-frame.alpha/clear-flow`).

The only required key is `:id`. All others have a default value:

- `:path`: `id` if `id` is sequential, otherwise `[id]`.
- `:inputs`: `{}`
- `:output`: `(constantly true)`
- `:live?`: `(constantly true)`
- `:live-inputs`: `{}`
- `:cleanup`: `re-frame.utils/dissoc-in`
"
  {:api-docs/heading "Flows"}
  ([flow] (flow/reg-flow flow))
  ([id flow] (flow/reg-flow id flow)))

(defn clear-flow
  "Arguments: `[id]`
  Deregisters a flow, identified by `id`.

  Later, re-frame will update `app-db` with the flow's `:cleanup` function.

  If `clear-flow` is invoked by the `:clear-flow` effect, this cleanup happens in the `:after` phase of the same event returning `:clear-flow`.

  If you call `clear-flow` directly, cleanup will happen on the next event."
  {:api-docs/heading "Flows"}
  ([] (flow/clear-flow))
  ([id] (flow/clear-flow id)))

(defn get-flow
  "Returns the value within `db` at the `:path` given by the registered flow
  with an `:id` key equal to `id`, if it exists. Otherwise, returns nil."
  {:api-docs/heading "Flows"}
  [db id] (flow/resolve-input db @flow/flows (flow/flow<- id)))

(defn flow<-
  "Creates an input from a flow id."
  {:api-docs/heading "Flows"}
  [id]
  (flow/flow<- id))

(reg :sub :flow
     (fn [db input]
       (flow/resolve-input db @flow/flows input)))

(reg :sub :live?
     (fn [db input]
       (flow/resolve-input db @flow/flows input)))

(def ^{:api-docs/heading "Legacy Compatibility"} subscribe
  "Equivalent to `sub`.

  Uses a different the `:safe` lifecyle by default, compared with `re-frame.core`, which uses `:reactive`.

  Flows each have their own lifecycle and are not cached using the same mechanism as subscriptions.
  Call `(subscribe [:flow {:id :your-flow-id}])` to subscribe to a flow."
  sub)

(defn ^:api-docs/hide reg-sub
  "Equivalent to `reg` `:legacy-sub`."
  [& args]
  (apply reg :legacy-sub args))

(defn ^:api-docs/hide dispatch
  [event]
  (router/dispatch event))

(defn ^:api-docs/hide dispatch-sync
  [event]
  (router/dispatch-sync event))

(defn ^:api-docs/hide reg-event-db
  ([id handler]
   (reg-event-db id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db
                        fx/do-fx
                        flow/interceptor
                        std-interceptors/inject-global-interceptors
                        interceptors
                        flow/do-fx
                        (db-handler->interceptor handler)])))

(defn ^:api-docs/hide reg-event-fx
  ([id handler]
   (reg-event-fx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db
                        fx/do-fx
                        flow/interceptor
                        std-interceptors/inject-global-interceptors
                        interceptors
                        flow/do-fx
                        (fx-handler->interceptor handler)])))

(defn ^:api-docs/hide reg-event-ctx
  ([id handler]
   (reg-event-ctx id nil handler))
  ([id interceptors handler]
   (events/register id [cofx/inject-db
                        fx/do-fx
                        flow/interceptor
                        std-interceptors/inject-global-interceptors
                        interceptors
                        flow/do-fx
                        (ctx-handler->interceptor handler)])))

(defn ^:api-docs/hide clear-event
  ([]
   (registrar/clear-handlers events/kind))
  ([id]
   (registrar/clear-handlers events/kind id)))

(defn ^:api-docs/hide reg-event-error-handler
  [handler]
  (registrar/register-handler :error :event-handler handler))

(reg-event-error-handler interceptor/default-error-handler)

(defn ^:api-docs/hide clear-sub
  ([]
   (registrar/clear-handlers subs/kind))
  ([query-id]
   (registrar/clear-handlers subs/kind query-id)))

(defn ^:api-docs/hide reg-sub-raw
  [query-id handler-fn]
  (registrar/register-handler
   subs/kind
   query-id
   (fn raw-subs-handler-fn [db q]
     (handler-fn db (subs.alpha/compat q)))))

(defn ^:api-docs/hide clear-subscription-cache!
  []
  (subs/clear-subscription-cache!))

(defn ^:api-docs/hide reg-fx [id handler]
  (assert (not (#{:reg-flow :clear-flow} id))
          "The effect keys `:reg-flow` and `:clear-flow` are reserved for `re-frame.alpha`")
  (fx/reg-fx id handler))

(defn ^:api-docs/hide clear-fx
  ([]
   (registrar/clear-handlers fx/kind))
  ([id]
   (registrar/clear-handlers fx/kind id)))

(defn ^:api-docs/hide reg-cofx
  [id handler]
  (cofx/reg-cofx id handler))

(defn ^:api-docs/hide inject-cofx
  ([id]
   (cofx/inject-cofx id))
  ([id value]
   (cofx/inject-cofx id value)))

(defn ^:api-docs/hide clear-cofx
  ([]
   (registrar/clear-handlers cofx/kind))
  ([id]
   (registrar/clear-handlers cofx/kind id)))

(def ^:api-docs/hide debug std-interceptors/debug)

(defn ^:api-docs/hide path
  [& args]
  (apply std-interceptors/path args))

(defn ^:api-docs/hide enrich
  [f]
  (std-interceptors/enrich f))

(def ^:api-docs/hide unwrap std-interceptors/unwrap)

(def ^:api-docs/hide trim-v std-interceptors/trim-v)

(defn ^:api-docs/hide after
  [f]
  (std-interceptors/after f))

(defn ^:api-docs/hide on-changes
  [f out-path & in-paths]
  (apply std-interceptors/on-changes f out-path in-paths))

(defn ^:api-docs/hide reg-global-interceptor
  [interceptor]
  (settings/reg-global-interceptor interceptor))

(defn ^:api-docs/hide clear-global-interceptor
  ([]
   (settings/clear-global-interceptors))
  ([id]
   (settings/clear-global-interceptors id)))

(defn ^:api-docs/hide ->interceptor
  [& {:as m :keys [id before after]}]
  (utils/apply-kw interceptor/->interceptor m))

(defn ^:api-docs/hide get-coeffect
  ([context]
   (interceptor/get-coeffect context))
  ([context key]
   (interceptor/get-coeffect context key))
  ([context key not-found]
   (interceptor/get-coeffect context key not-found)))

(defn ^:api-docs/hide assoc-coeffect
  [context key value]
  (interceptor/assoc-coeffect context key value))

(defn ^:api-docs/hide get-effect
  ([context]
   (interceptor/get-effect context))
  ([context key]
   (interceptor/get-effect context key))
  ([context key not-found]
   (interceptor/get-effect context key not-found)))

(defn ^:api-docs/hide assoc-effect
  [context key value]
  (interceptor/assoc-effect context key value))

(defn ^:api-docs/hide enqueue
  [context interceptors]
  (interceptor/enqueue context interceptors))

(defn ^:api-docs/hide set-loggers!
  [new-loggers]
  (loggers/set-loggers! new-loggers))

(defn ^:api-docs/hide console
  [level & args]
  (apply loggers/console level args))

(defn ^:api-docs/hide make-restore-fn
  []
  (let [handlers @registrar/kind->id->handler
        app-db   @db/app-db
        subs-cache @subs/query->reaction]
    (fn []
      ;; call `dispose!` on all current subscriptions which
      ;; didn't originally exist.
      (let [original-subs (set (vals subs-cache))
            current-subs  (set (vals @subs/query->reaction))]
        (doseq [sub (set/difference current-subs original-subs)]
          (interop/dispose! sub)))

      ;; Reset the atoms
      ;; We don't need to reset subs/query->reaction, as
      ;; disposing of the subs removes them from the cache anyway
      (reset! registrar/kind->id->handler handlers)
      (reset! db/app-db app-db)
      nil)))

(defn ^:api-docs/hide purge-event-queue
  []
  (router/purge router/event-queue))

(defn ^:api-docs/hide add-post-event-callback
  ([f]
   (add-post-event-callback f f))   ;; use f as its own identifier
  ([id f]
   (router/add-post-event-callback router/event-queue id f)))

(defn ^:api-docs/hide remove-post-event-callback
  [id]
  (router/remove-post-event-callback router/event-queue id))

(defn ^:api-docs/hide register-handler
  [& args]
  (console :warn  "re-frame: \"register-handler\" has been renamed \"reg-event-db\" (look for registration of " (str (first args)) ")")
  (apply reg-event-db args))

(defn ^:api-docs/hide register-sub
  [& args]
  (console :warn  "re-frame: \"register-sub\" is used to register the event " (str (first args)) " but it is a deprecated part of the API. Please use \"reg-sub-raw\" instead.")
  (apply reg-sub-raw args))
