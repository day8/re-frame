

## It Does Physics

Remember this diagram from school? The water cycle.
Two stages, involving water in different phases, being acted upon
by different forces: gravity working one way, evaporation/convection the other.

![logo](/images/the-water-cycle.png?raw=true)

To understand re-frame, **imagine data flowing instead of water**. re-frame
provides the "conveyance" of the data - the gravity, evaporation and convection.
You design what's flowing and then you hang functions off the loop at
various points to look after the data's phase changes.

Sure, right now, you're thinking "lazy sods - make a proper Computer Science-y diagram". But, no.
Joe Armstrong says "don't break the laws of physics" - I'm sure 
you've seen the videos - and if he says to do something, you do it
(unless Rich Hickey disagrees, and says to do something else). So,
this diagram, apart from being a plausible analogy, and bordering on useful,
is practically PROOF that re-frame is doing physics.

## Finite State Machines

This perspective can be useful ... 

> Any sufficiently complicated GUI contains an ad hoc, 
> informally-specified, bug-ridden, slow implementation 
> of a hierarchical FSM  <br>
> -- my eleventh rule (see [Greenspun's tenth rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule))

Previously, I commented that `event handlers` (domino 2) collectively 
represent the "control layer" of the application. They contain logic 
which interprets arriving events in the context of existing state, 
and they "step" the application state "forward".

In this way, `events` act like the `triggers` in a finite state machine, and 
the event handlers act like the rules which govern how a the state machine
moves from one logical state to the next.

Not every app has lots of logical states, but some do, and if you are implementing 
one of them, then formally recognising it and using a technique like 
[State Charts](https://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782)
will help greatly in getting a clean design and a nice data model.

So, in this section, I'm suggesting that this perspective is useful sometimes:
  - the first 3 dominoes implement an [Event-driven finite-state machine](https://en.wikipedia.org/wiki/Event-driven_finite-state_machine)
  - the last 2 dominoes reactively render the current state of this FSM for the user to observe
 
Events - that's the way we roll.

## Dumb Views - Part 1

A lot of events are dispatched by the DOM in response to user actions.  

For example, a button view might be like this:
```clj
(defn yes-button
  []
  [:div  {:class "button-class"
          :on-click  #(dispatch [:yes-button-clicked])}
          "Yes"])
```

Notice that `on-click` DOM handler:
```clj
  #(dispatch [:yes-button-clicked])
```

With re-frame, we want the DOM as passive as possible. We do 
not want our views containing any imperative control logic. 
All of that should be computed by event handlers.

We want that "on-click" as simple as we can make it.

**Rule**:  `views` are as passive and minimal as possible when it 
comes to handling events. They `dispatch` pure data and nothing more.

## Dumb Views - Part 2

Neither do we want views computing the data they render.  
That's the job of a subscription:

So this is bad:
```clj
(defn show-items
  []
  (let [sorted-items (sort @(subscribe [:items]))]  ;; <--
    (into [:div] (for [i sorted-items] [item-view i]))))
```

The view is not simply taking the data supplied by the 
