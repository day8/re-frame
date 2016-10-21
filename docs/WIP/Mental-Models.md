
## What Problem Does It Solve?

First, we decided to build our SPA apps with ClojureScript, then we
choose [Reagent], then we had a problem.

For all its considerable brilliance,  Reagent (+ React)
delivers only the 'V' part of a traditional MVC framework.

But apps involve much more than V. Where
does the control logic go? How is state stored & manipulated? etc.

We read up on [Pedestal App], [Flux], 
[Hoplon], [Om], early [Elm], etc and re-frame is the architecture that
emerged.  Since then, we've kept a close eye on further developments like the
Elm Architecture, Om.Next, BEST, Cycle.js, Redux, etc.  They have taught us much
although we have often made different choices.

re-frame does have M, V, and C parts but they aren't objects.  
It is sufficiently different in nature
from (traditional, Smalltalk) MVC that calling it MVC would be confusing.  I'd
love an alternative.

Perhaps it is a RACES framework - Reactive-Atom Component Event
Subscription framework (I love the smell of acronym in the morning).

Or, if we distill to pure essence, `DDATWD` - Derived Data All The Way Down.

*TODO:* get acronym down to 3 chars! Get an image of stacked Turtles for `DDATWD`
insider's joke, conference T-Shirt.


## Guiding Philosophy

__First__, above all we believe in the one true [Dan Holmsand], creator of Reagent, and
his divine instrument the `ratom`.  We genuflect towards Sweden once a day.

__Second__, we believe in ClojureScript, immutable data and the process of building
a system out of pure functions.

__Third__, we believe in the primacy of data, for the reasons described in
 the main README. re-frame implements an infinite loop of Derived data.

__Fourth__, we believe that Reactive Programming is one honking great idea. 
It is a quite beautiful solution to one half of re-frame's 
data conveyance needs, but we don't take reactivity as far as, say, cycle.js. 
It doesn't take over everything in re-frame - it just does part of the job.

__Finally__, many years ago I programmed briefly in Eiffel where I learned 
about [command-query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation). 
Each generation of
programmers seems destined to rediscover this principle - CQRS is a recent re-rendering. 
And yet we still see read/write `cursors` and two way data binding being promoted as a good thing. 
Just say no. As programs get bigger, their use will encourage control logic into all the 
wrong places and you'll end up with a tire fire of an Architecture. IMHO.

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

## It does Event Sourcing 

How did that exception happen, you wonder, shaking your head?  
What did the user do immediately prior to the exception?  What
state was the app in that this event was so disastrous?

To debug it, you need to know this information:
 1. the state of the app immediately before the exception
 2. What final event then caused your app to fall in a screaming mess.

Well, with re-frame you need to record (have available):
 1. A recent checkpoint of the app state in `app-db` (perhaps the initial state)
 2. all the events `dispatch`ed since the last checkpoint, up to the point where the exception occurred.

Note: that's all just data. **Pure, lovely loggable data.**

If you have that data, then you can reproduce the exception.

re-frame allows you to time travel, even in a production setting. Install the "checkpoint" state into `app-db`
and then "play forward" through the collection dispatched events.

The only way the app "moves forwards" is via events. "Replaying events" moves you
step by step towards the exception causing problem.

This is perfect for debugging assuming, of course, you are in a position to capture
a checkpoint, and the events since then.

Here's Martin Fowler's [description of Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html).

## It does a reduce 

Here's another useful way of thinking about the re-frame 
data flow. 

**First**, imagine that all the events ever dispatched by a 
certain running app were stored in a collection.
So, if when the app started, the user clicked on button X 
then the first item in this collection would be the event 
generated by that button, and then, if next the user moved 
a slider, the associated event would be the next item in 
the collection, and so on and so on. We'd end up with a
collection of event vectors.

**Second**, remind yourself that the `combining function` 
of a `reduce` takes two parameters:

  1. the current state of the reduction and
  2. the next collection member to fold in.

Then notice that `reg-event-db` event handlers take two parameters too:

1. the current state of `app-db`
2. the next event to fold in

Which is the same as a `combining function` in a `reduce`!!

So now we can introduce the new mental model:  at any point in time, 
the value in `app-db` is the result of performing a `reduce` over
the entire `collection` of events dispatched in the app up until 
that time. The combining function for this reduce is the set of handlers.

It is almost like `app-db` is the temporary place where this 
imagined `perpetual reduce` stores its on-going reduction.

Now, this perspective only goes so far, because `reg-event-fx`
event handlers produce effects beyond just application state changes. 
But it is a very interesting mental model. 

## It does FSM 

And this perspective can be useful ... 

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

## Prefer Dumb Views - Part 1

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

## Prefer Dumb Views - Part 2

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
