
In re-frame, there are two kinds of Component:

- **Reagent Components** - widgets representing a single value, like a number or choice or string
- **re-frame Components** - larger widget complexes, often representing an entity

## The Essence Of A Component

All Components have:

  - two responsibilities
  - and two associated requirements

The two responsibilities:

1. **to render a value**<br>
   That value could be as simple as a string or as complicated as an entire Pivot Table. 
   It may, optionally, also render affordances allowing the user to modify the value. E.g. a spinner supplies up/down buttons. 
   Or, for a pivot table, the user can drag "dimension fields" from one place to another to configure the data rollups it displays.

2. **to capture and communicate user intent**<br>
   if the user interacts with the Component to modify the value, then it must communicate the user's intent 
   to the surrounding application logic, so it can be interpreted and acted upon.

To fulfil these two responsibilities, Components have **two associated requirements**:

1. a way to **obtain the value** they represent
2. a way to **communicate user intent**

One of these requirements relates to `Input` (obtaining), and the other to `Output` (communicating intent), so we'll 
collectively refer to them as the Component's **I/O requirements**. 

## Reagent Components 

The simplest Components are **Widgets**, which represent a single value like an integer, string or selection.

You can create them from base HTML elements such as `<input>` or `<select>`
using only **Reagent** (no re-frame) and,
for that reason, they are referred to as `Reagent Components`. 

Here's an example:
```clj
(defn simple-text-input
  [value callback-fn]
  [:input 
   {:type      "text"
    :value     value                                     ;; initial value
    :on-change #(callback-fn (-> % .-target .-value))}]) ;; callback with value
```

You'll notice that both of this Component's **I/O requirements** are provided via two positional arguments:

1. a value (input)
2. a callback function - a means of communicating the user's intent for change (output)

Because both of these requirements are satisfied via arguments, this Component
is quite reusable. We could use it for any string value.

But, of course, the responsibility for providing I/O requirements doesn't disappear. It has just been shifted to the parent Component. This parent will have to act as the glue which "wires" this 
reusable Component into an application context, providing the value and actioning user intent.

<!-- 
When something is reusable, something has to "bind" or ground it into the application. Wire it in. 
-->


## re-frame Components 

A `re-frame Component` is different from a `Reagent Component`.
because of how it satisfies its **I/O requirements**:

-  it will use `subscribe` to obtain values  (input)
- it will use `dispatch` to communicate events modelling user intent  (output)

re-frame Components tend to be larger. They often represent  **an entire entity**
(not just a single, simple value) and they might involve a "complex of widgets"
with a cohesive purpose.

Here's an example:

```clj
(defn customer-names
  []                                                   
  (let [customer @(subscribe [:customer])]              ;; obtain the customer entity
    [:div "Name:"

      ; first name
      [simple-text-input 
        (:first-name customer)                          ;; first-name from entity
        #(dispatch [:change-customer :first-name %])]   ;; first name changed

       ;; last name
       [simple-text-input 
        (:last-name customer)                           ;; last-name from entity
        #(dispatch [:change-customer :last-name %])]])) ;; last name changed
```

Notes:

- This is a `re-frame Component` because it uses `subscribe` and `dispatch` to provide its I/O requirements
- It composes two other components - Reagent components - the reusable `simple-text-input` we created above
- It parameterises the I/O requirements for the two sub-components by supplying a `value` and a `callback` to each

## Many Instances

But this re-frame Component only works when there is one `Customer` - you'll notice it contained the code:

```clj
(subscribe [:customer])
```

What if our application has many `Customers`? We'd want a Component that can represent 
any one of them, or we might need to render many Customers in the UI at once
(not just one at a time).

How then should we rewrite this Component so it can represent Customer entity `A` one time, and 
Customer entity `B` another time?  A Component instance representing entity `A` would have to `subscribe` 
to the `value` representing `A`. And any events it dispatches must cause changes to 
`A`, not `B`.

Method: 

- supply each `Component` instance with the **identity** of the Customer entity it should represent
- this `identity` is supplied as an argument  (typically)
- each Component instance will use this `identity` within the query vector given to `subscribe` - so the query is parameterised by the `identity`
- the subscription handler will use this `identity` to obtain the entity's value
- likewise, when events are `dispatched`, they too will include `identity`, so the `event handler` knows which entity to modify

Here's the rewrite which implements this method:
```clj
(defn customer-names
  [id]                                                  ;; customer `id` as argument
  (let [customer @(subscribe [:customer id])]           ;; obtain the value using `id`
    [:div "Name:"

      ; first name
      [simple-text-input 
        (:first-name customer)                             
        #(dispatch [:change-customer id :first-name %])]   ;;  include `id`

       ;; last name
       [simple-text-input 
        (:last-name customer)                              
        #(dispatch [:change-customer id :last-name %])]])) ;; include `id`
```

## What Is Identity?

An `identity` distinguishes one entity from
another - it is something that distinguishes the entity `A` from entity `B`. 
In a different technology context, it might be called "a pointer" 
(a memory address), "a reference" or "a unique key".

Every entity is stored in `app-db` 
and, consequently, one reliable `identity` is the  **path** to that
entity's location within  `app-db`.  Such paths are vectors - paths are data. They are like a pointer to a place within `app-db`.

So, the `identity` for entity `A` could be the path vector 
to `A`'s location, for example `[:entities :customers 123]`.  In effect, if you did:
```clj
   (get-in db [:entities :customers 123])
```
you would get the entity. And the `identity` for `B` might be 
the same other than for the last element, `[:entities :customers 456]`. In this fictional 
scenario, the entities `A` and `B` are both stored in a map the location `[:entities :customers]` within `app-db`,
but you would access them via different keys in that map (`123` vs `456`).

Sometimes, the `identity` need only be the last part of the `path` - the `123` or `456` part
in the example above. The location of the map, `[:entities :customers]`, within `app-db` could be "known" by the 
subscription handlers and event handlers, so it doesn't have to be provided, and only the final part of 
the path (a key in the map at that location) is needed to distinguish two identities.

So, in summary, an `identity` is usually a path or a path segment.

## Using Identity

Here's how we could use our reusable Component multiple times on one page to show many customers:
```clj
(defn customer-list
  []
  [:div
   (for [id @(subscribe [:all-customer-ids])]
     ^{:key id} [customer-names id])]) 
```

Notice that `id` is provided for each instance (see the code `[customer-names id]`). That's the entity identity.

## Multiple Identities

Sometimes we need to provide more than one `identity` to a Component.

For example, a dropdown Component might need:

- one `identity` for the list of alternative "choices" available to the user to select 
- one `identity` for the current choice (value) held elsewhere within `app-db`

Such a Component would need two arguments (props) for these two `identities`, and it would need 
a way to use the identities in subscriptions.

## Computed Identities

`identities` are data, and you can compute data. 

When a parent Component has a child sub-component, the parent 
might provide its child with an `identity` which is derivative of the `id`
supplied to it.  Perhaps this `identity` is built by `conj`-ing a further 
value onto the original `id`.  

There are many possibilities.

In another situation, the `id` provided to a component might reference an entity that itself
"contains" the `identity` of a different entity - a reference to a reference.
So, the Component might have to subscribe to the primary entity and then, in a second step, 
subscribe to the derived entity.

If we explore these ideas far enough, we leave behind discussions about re-frame and start, instead, to
discuss the pros and cons of the "data model" you have created within `app-db`.

## Components In A Library

Have you noticed the need for close coordination between a re-frame Component 
and the subscriptions and dispatches which service it's I/O Requirements?

A re-frame Component doesn't stand by itself - it isn't the unit of reuse.

Because a Component has two `I/O` requirements, the unit of reuse is the re-frame Component 
plus the mechanism needed to service those `I/O` requirements. That's what should be 
packaged up and put in your library if you want to reuse a Component across multiple applications.

So, just to be clear: the unit of reuse is the combination of:

- the Component
- the subscription handlers which service its need to obtain values 
- the event handlers which service the user intent it captures


## Implications

Because a reusable `re-frame Component` has three parts, there is another level of abstraction possible.  

Until now, I've said that a `re-frame Component` is defined by its use of `subscribe` and `dispatch`, but maybe it doesn't have to be that way. 

Here is a rewrite of that earlier Component:

```Clojure
(defn customer-names
  [id get-customer-fn cust_change-fn]       
  (let [customer (get-customer-fn id)]      ;; obtain the value
    [:div "Name:"

      ;; first name
      [simple-text-input 
        (:first-name customer)                ;; obtain first-name from the entity
        #(cust_change-fn id :first-name %)]   ;; first name has changed

      ;; last name
      [simple-text-input
        (:last-name customer)                 ;; obtain last-name from the entity
        #(cust_change-fn id :last-name %)]])) ;; last name has changed
```

Notes:

- there's now no sign of `dispatch` or `subscribe`
- instead, the Component is parameterised by two extra function arguments
- these functions handle the I/O requirements

> it is almost as if we have gone full circle now, and we're back to something 
> which looks like a Reagent Component.  Remember that one at the very top?  
> The I/O requirements were handled via arguments, which shifts "knowledge" about the 
> application context to the parent. 


Let's rewrite `customer-list` in terms of this new Component:
```Clojure
(defn customer-list
  []
  (let [get-customer (fn [id] @(subscribe [:customer id]))
        put-customer (fn [id field val] (dispatch [:cust-change id field val]))])
  [:div
   (for [id @(subscribe [:all-customer-ids])]
     ^{:key id} [customer-names id get-customer put-customer])])
```
Notes:

- we create `I/O functions` which wrap `subscribe` and `dispatch`
- these two functions are passed into the sub-component as arguments

But does this approach mean the `customer-names` Component is now more reusable? Well, yes, probably. 
The exact subscription query to use is now no longer embedded in 
the Component itself. The surrounding application supplies that. The Component 
has become even more independent of its context. It is even more reusable and flexible. 
On the downside, the parent context has more "knowledge" and responsibility. It has to "wire" the Component into the application.

Obviously, there's always a cost to abstraction. So, you'll have to crunch
the cost-benefit analysis for your situation. 

## Reusability 

There are two levels of reusability:

  - reusability within a particular application. 
    You want to use a Component across multiple entities and perhaps in different widget ensembles within the one application.
  - reusability across applications. Put the Component in a library. 

`Reagent components` are reusable in both ways - just look at a library like `re-com`. 

With `re-frame Components`, reuse is fairly easy 
within the one 
application, but when you try to put them in a library for use across multiple 
applications you run into a challenge to solve: ***placefulness***.

We noted earlier that re-frame Components extend to include the handlers which look after the I/O requirements. And those I/O handlers 
have to know **where**, within `app-db` to obtain and update data.

But, from one application to another, the path (the place) where entities are 
stored can change. A library Component should not be dictating this "place" to the applications which use it. 

## Solving Placefulness

**First**, you could ignore the issue because either:
  1. you have a single app to maintain, and you are optimising for simplicity  (over generality and reusability)
  2. you will avoid using re-frame components, and instead, you just use Reagent Components
     (e.g. we have a rather complicated Table Component which is just a Reagent Component)

**Second**, to solve placefulness, you could standardise where entities are placed within `app-db`. You could 
mandate that entities are always stored at a known place (eg. `[:entities :Customers]` or `[:entities :Products]`). 
You could then write your reusable components with this assumption, and all your applications adhere to this stipulation. 
You could perhaps use [Subgraph](https://github.com/den1k/subgraph).

**Third**, you can parameterise the Component with base-path information via:
  - React context (probably not)
  - via args to the Component - ie. quite literally pass in the base path as an argument 
    to the Component and then pass that along to the handlers by including that path in 
    the dispatched event and subscription query vectors.

**Fourth**, more radically, you could choose not to use the `map` in `ratom` approach that is `app-db`. 
We could use a data structure that is less placeful. Perhaps use a `DataScript` database via [re-posh](https://github.com/denistakeda/re-posh). 


**Not doing** - one thing we won't be doing is storing state in the Component itself, away from the 
central "data store". The moment we did that, we would have created multiple "stores of state", and then we'd have responsibility for coordinating the sync-ing of those data stores, 
a process which starts off looking simple enough but which soon envelops your architecture like an octopus. Managing distributed state is a much more difficult problem than placefulness.


## Summary 

Reagent components are readily reusable, and re-frame Components can be made reusable, subject to solving the placefulness issue. 
