## Flows 


## The Story So Far 

re-frame's process: 
  1. Users cause Events.
  2. Events cause Effects
  3. Effects cause State Changes
  4. State Changes cause View rerendering.

We're about to add a new capability to step 3. 

## Flows 

`Flows` compute derived values "automatically".  

A `Flow` "observes" N paths within `app-db`, and if any of them changes,
then that `flow` will compute a new derivative value and store that value
at another path within `app-db`.

Error state is often derivative, so we'll use that as our motivating example. 

Imagine an app that maintains a vector at path `p` and imagine that it should 
contain between 1 and 5 elements. When it has 0 items, 
the app should display one message (and perhaps disable the "continue" button). And when it is over 
5 elements, the app should show a warning saying that only the first 5 will be used. 

Yes, sorry, all very contrived.

Now imagine that there are three different events (buttons?) that change the state of the vector:
  - `:clear-all`
  - `:add-item`
  - `:delete-item`
  
So, the error state controls the messages shown to the user and the button enabled/disabled state.
This error state needs to be updated each time any of the three events happen. 

With a `flow`:
  - it would observe the path to the vector with `app-db`
  - any time it was changed, the flow would calculate the new error state (messages, etc)
  - it would then store this new error state at some path within `app-db`
  - it would happen automatically, irrespective of how the vector got updated (any of the event handlers)

Subscriptions could then deliver this error state to the appropriate view,
which might show the messages and disable/enable the necessary buttons.

Of course, without a flow, we could achieve the same thing by calling an error state calculation function inside of all three event handlers
that update the vector. Certainly possible. But what if, at some time in the future, someone added a fourth event handler, which changed the vector but they forgot
to calculate the error state?  It would be a bit more fragile WRT to change. 

Of course, it's all tradeoffs. Using a flow automates certain updates, but it is also less explicit. Automation can make code more abstract, perhaps to the point where it causes "spooky action at a distance". 

## How? 

To register a flow, you have to supply 3 things: 
   - a set of N inputs to watch  (path to the vector)
   - a function to call (takes inputs as args) to compute the derived state (error state?) 
   - a path to put the derived value after it is computed.

```
(re-flow
  {

```
  
Flows are something that happens after an event handler runs. Why?  Because flows 
