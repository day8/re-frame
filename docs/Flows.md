> This feature is proposed for re-frame. But it isn't available yet.  

## Flows 

re-frame's process: 
  1. Users cause Events.
  2. Events cause Effects
  3. Effects cause State Changes
  4. State Changes cause View rerendering.

We're about to add a new capability to step 3. 

## Flows 

`Flows` re-calculate derived values "automatically".

A `Flow` "observes" N paths within `app-db`, and if any of them changes,
then that `flow` will compute a new derivative value and store that value
at another path within `app-db`.

Error state is often derivative, so we'll now use that as our animating example. 

## Imaginary Example

Imagine an app that maintains a vector at path `p` and imagine this vector must 
contain between 1 and 5 elements. 
When it has 0 items, the app should display a message like "No items. Please add one" and 
disable the "Continue" button. And, if the vector has more than 5 elements, the app should
show a warning "Only the first 5 items will be used".  Yeah, I know, all very contrived.

Further, imagine that there are three different events (dispatched because of user button clicks) that change the state of the vector:
  - `:clear-all`
  - `:add-item`
  - `:delete-item`
  
So, this app has to re-calculate the error state each time one of these events happens.  It has to work out what messages to show 
and what ones to remove, and if buttons should be enabled etc. 

A `flow` defines an automatic re-calculation. In the example above, a flow:
  - would observe the path to the vector within `app-db`
  - any time it was changed, the flow would re-calculate the new error state (messages, etc)
  - it would then store this new error state at some path within `app-db`
  - this process would happen automatically, irrespective of how the vector got changed (via any of the three event handlers)

Subscriptions could then deliver the error state (held in app-db) to the appropriate view,
which might show the messages and disable/enable the necessary buttons.

Of course, without a flow, we could achieve the same thing by calling an error state calculation function inside the three event handlers
that update the vector. While possible, it would be fragile WRT to certain changes: what if, at some time in the future,
someone added a fourth event handler that changed the vector, but they forgot
to calculate the error state?

Having said that, design is all tradeoffs. Using a flow to automate the recalculations might be more resilient to changes, but it is less explicit. Such
automation can make code more abstract, perhaps to the point where it causes "spooky action at a distance" (it gets hard to figure out what
is causing specific changes). 

## How? 

To register a flow, you have to supply 3 things: 

   - `inputs` a set of N input paths within app-db to watch  (path to the vector)
   - `calc` - a function to re-calculate the derived value (takes inputs as args) to compute the derived state (error state?) 
   - `path` - the path at which to put the derived value after it is computed.

You call the `reg-flow` with a map that provides the flow specification. 
```
(re-flow
  {:value {
     :inputs  {:v  [:some :path :into :app-db]}
              
     :calc    (fn [{:keys [v] :as inputs}]
                (let [len (count v)]
                    })}
   :path [:errors :path]})     
```

The inputs are given to the calc function.  


XXX explain that :inputs path can be something more than a vector.  It can be the output of another flow. 

XXX Explain that 
XXX Explain that :calc actually takes three args. 

XXX 

XXX 
XXX see also the `on-change` interceptor 


Flows are something that happens after an event handler runs. Why?  Because flows 
