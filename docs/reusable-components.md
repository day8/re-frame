
There are two kinds of Components:

- **Reagent Components**
- **re-frame Components**

Roughly speaking, `Reagent Components` handle the simple stuff and  `re-frame Components` look after the larger and more complex work. 

## What does a Component do?

Components have two responsibilities, and two needs.

The responsibilities:

1. **rendering**:

    - provide a way for the user to observe a value. That value could be as simple as a string, or as complicated as an entire Pivot Table. 
    - optionally, show editing affordances to facilitate user modification of the value.
      A spinner supplies up/down buttons. A text input draws a box and has subtle colour
      changes on mouse-over to imply editability, 
      and, of course, a "click" will initiate editing. Or the value could be a complete 
      Pivot Table component which allows the user to drag "fields" to certain destinations 
      to indicate how rollups should happen. 

2. **communicate  user intent**: if the value is editted, communicate the user's intent
   to the surrounding app.

In order to fulfil these two responsibilities, Components have **two requirements**:

1. a way to get `the value`  (input)
2. a way to communicate events which represent `user intent` (output)

One requirement is `I` and the other is `O` so, not surprisingly, we 
describe them as the Component's **I/O requirements**. 

## Reagent Components 

The simplest Components are **Widgets** which represent a single value like an integer, string or selection.

They are easily created from base HTML elements, like `<input>` or `<select>`, 
or there are libraries like `re-com` which has dropdowns, Text Input fields 
and radio buttons.

You can create these Components using only **Reagent** (no re-frame) and,
for that reason they are called `Reagent Components`. Here's an example:

```clojure
(defn simple-text-input
  [value callback-fn]
  [:input 
   {:type      "text"
    :value     value                                     ;; initial value
    :on-change #(callback-fn (-> % .-target .-value))}]) ;; callback with value
```

You'll notice that the **I/O requirements** of this Component, are satisfied by the two arguments:

1. a value  (input)
2. a callback function (a means of communicating the user's intent to change the value). 

Because both needs are satisfied via arguments, this Component is quite reusable. It works for any string value.

## re-frame components 

What defines a `re-frame component` is that it uses `dispatch` and `subscribe` to satisfy its **I/O requirements**:

- `subscribe` is used to obtain values
- and `dispatch` is used to communicate events carrying user intent

re-frame Components tend to be larger. They often represent  **an entire entity**
(not just a single, simple value) and they will probably involve a "complex of widgets"
with a cohesive purpose. 

Here's an example:

```clj
(defn customer-names
  [id]                                                   ;; customer id
  (let [customer @(subscribe [:customer id])]            ;; obtain the value
    [:div "Name:"

      [simple-text-input 
        (:first-name customer)                             ;; obtain first-name from the entity
        #(dispatch [:customer-change id :first-name %])]   ;; first name changed

       ;; last name
       [simple-text-input 
        (:last-name customer)                              ;; obtain last-name from the entity
        #(dispatch [:customer-change id :last-name %])]])) ;; last name changed
```

Notes:

- This is a `re-frame Component` because it uses `subscribe` and `dispatch` for I/O
- It has two Reagent sub-components - the reusable `simple-text-input` component we created above
- It parameterises the I/O for the sub-components by passing in a value and a callback to each

## Many Instances

If an app displays multiple instances of a `re-frame Component`, how do these 
instances `subscribe` to their specific value?  

One instance might represent entity `A` 
and will need to subscribe to data for that entity, and another instance might represent entity `B`,
meaning its subscription will be different. 
How should they each obtain the value for their entity?

Answer: 

- instances of a reusable re-frame Component must be supplied with an argument which is the **identity** of the entity they should represent
- a component will use this `identity` within the query vector given to `subscribe`
- the subscription handler will know how to use this `identity` to obtain the entity's value
- likewise, any events dispatched will also include this `identity`  (and the event handler will know how to use it)

## What Is Identity?

An `identity` is something that can be used to differentiate one entity from 
another, within `app-db`. In a different technology stack, it might be 
called "a pointer" or "a reference" or "a foreign key".

Within re-frame, an `identity` could be:

- a  map `key` like "1278" or `:warnings` (for a map within `app-db`)
- an integer index into a vector (again, somewhere within `app-db`)
- a multi-part `path` from the root of `app-db` right down to some leaf element, like `[:lavish :cloth 187]`
- a `sub-path` of `app-db`

Ultimately, all these example `identities` are sub-paths within `app-db`. 
An `identity` is always a piece of data. If it is a vector, it is likely a path or subpath.
If it is a simple value, it is probably the key of a map or the index of a vector.

## Providing Identity 

When we create an instance of a re-frame Component, we supply it with the  `identity` of an entity,
via an argument which, for discussion purposes, we'll call `id`. 

The `customer-names` Component above takes an `id` argument. The query vector it provides
to `subscribe` includes this `id`, so too does the event given to `dispatch`.

As a result, this Component is reusable - our application can have many instances of it,
and each can represent a different customer - just supply the customer `id`.

Here's how we could use it multiple times on the one page to show many customers:

```clj
(defn customer-list
  []
  [:div
   (for [id @(subscribe [:all-customer-ids])]
     ^{:key id} [customer-names id])])
```

## Multiple Identities

Some Components need more than one `identity`.

For example, a Component might need:

- one `identity` for the list of alternative "things" a user can choose (think items in a dropdown)
- one `identity` for the current choice (value) held elsewhere within `app-db`

This Component will need two args/props for these two `identities`. 

## Derived Identities

Imagine a Component (parent) which has a sub-component (child). 

The parent might need to provide its child with a `sub-identity` derived/computed from the `id `
supplied to the parent.  Perhaps the `sub-identity` is built by `conj` -ing a further 
value onto the original `id`.  There are many possibilities.

Or, in another situation, an `id` provided to a component might reference an entity which 
"contains", within its value, the `identity` of a further entity - a reference to a reference.
So, the Component might have to subscribe to the primary entity and then, in a second step, 
subscribe to the derived entity. 

If we take these ideas far enough, we leave behind discussions about re-frame and start, instead, to
discuss the pros and cons of the "data model" you have created in `app-db`.

## The Unit Of Reuse

Have you noticed the need for close coordination between a re-frame Component and the subscriptions and dispatches which service it?  

A re-frame Component doesn't stand by itself - it isn't actually the unit of reuse. 

The unit of reuse is:

- the Component
- the subscription handlers which service its need to obtain values 
- the events handler which handles the user intent it captures

I noted at the beginning that a Component had two `I/O` needs. So the unit of reuse is the re-frame Component 
plus the mechanism for servicing those needs. That's what should be packaged up and put in your library.


## Implications

Once you internalise that there are three parts to a reusable Component, you might realise that there is another level of abstraction possible.  

Up until now, I've said that a re-frame Component is defined by its use of `subscribe` and `dispatch`. But, maybe it doesn't have to be. 

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

- there's no sign of `dispatch` or `subscribe` anymore
- instead, the Component is parameterised by two extra functions arguments
- these functions handle the I/O 
- it is almost as if we have gone full circle now, and we're back to building a Reagent Component. 


Let's rewrite the `customer-list` in terms of this new component: 
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

- we create the `I/O functions` which wrap the subscribes and dispatches
- these two functions are passed into the sub-component as arguments

Does this approach mean the `customer-names` Component is now more reusable? Yes it does. 
The exact subscription query vector to use is now no longer embedded in 
the Component itself. The surrounding application supplies that. The Component 
has become even more independent of its context. It is even more reusable and flexible. 

Obviously there's always a cost to abstraction. You'll have to crunch
the cost benefit analysis for your situation. 

BTW, in a more complicated case, you can imagine a Component being provided
with more than just a couple of `I/O` functions. Instead, it could be supplied
with a `map` which nominates many, many `I/O` functions which provide to it
the necessary "access" it requires. 

<!-- 

### Sufficiently Complex Components

For any sufficiently complex component, passing `ids` down through layers of components can become clumsy. In a bad case, we might end up with the old "prop drilling" problem in which `id` is passed deeply into nested layers of a complicated set of sub-components. 

In such cases, we could use BranchScope.  XXXX

That would allow us to place `id` into the "environment" of the entire branch representing the re-frame Component. 

This process can nest. High-level identities can be combined with next-level sub-identities. 

-->