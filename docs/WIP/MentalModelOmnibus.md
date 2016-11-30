<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Mental Model Omnibus](#mental-model-omnibus)
- [What is the problem?](#what-is-the-problem)
- [Guiding Philosophy](#guiding-philosophy)
- [It Does Physics](#it-does-physics)
- [It does Event Sourcing](#it-does-event-sourcing)
- [It does a reduce](#it-does-a-reduce)
- [It does FSM](#it-does-fsm)
- [Data Oriented Design](#data-oriented-design)
- [Derived Data](#derived-data)
- [Prefer Dumb Views - Part 1](#prefer-dumb-views---part-1)
- [Prefer Dumb Views - Part 2](#prefer-dumb-views---part-2)
- [Full Stack](#full-stack)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Mental Model Omnibus

> If a factory is torn down but the rationality which produced it is
left standing, then that rationality will simply produce another
factory. If a revolution destroys a government, but the systematic
patterns of thought that produced that government are left intact,
then those patterns will repeat themselves. <br>
> -- Robert Pirsig, Zen and the Art of Motorcycle Maintenance

The re-frame docs initially focus on the **domino cascade
narrative**. The goal was to efficiently explain the mechanics,
and get you reading and writing code ASAP.

**But** there's other interesting perspectives on re-frame
which will considerably deepen your understanding of its design,
and how to get the best from it.

This tutorial is a tour 
of these ideas, justifications and insights.  It is a little rambling, but I
believe you'll be glad you persisted. By the end, I'm hoping you'll have had an
"Oh, now I get it" moment.


## What is the problem?

First, we decided to build our SPA apps with ClojureScript, then we
choose [Reagent], then we had a problem. It was mid to late 2014.

For all its considerable brilliance,  Reagent (+ React)
delivers only the 'V' part of a traditional MVC framework.

But apps involve much more than V. We tend to build quite complicated
apps. Where does the control logic go? How is state stored & manipulated? etc.

We read up on [Pedestal App], [Flux], 
[Hoplon], [Om], early [Elm], etc and re-frame is the architecture that
emerged.  Since then, we've tried to kept an eye on further developments like the
Elm Architecture, Om.Next, BEST, Cycle.js, Redux, etc.  They have taught us much
although we have often made different choices.

re-frame does have M, V, and C parts but they aren't objects.
It is sufficiently different in nature
from (traditional, Smalltalk) MVC that calling it MVC would be confusing.  I'd
love an alternative.

Perhaps it is a RAVES framework - Reactive-Atom Views Event
Subscription framework (I love the smell of acronym in the morning).

Or, if we distill to pure essence, `DDATWD` - Derived Data All The Way Down.

*TODO:* get acronym down to 3 chars! Get an image of stacked Turtles for `DDATWD`
insider's joke, conference T-Shirt.

## Guiding Philosophy

__First__, above all we believe in the one true [Dan Holmsand], creator of Reagent, and
his divine instrument the `ratom`.  We genuflect towards Sweden once a day.

__Second__, we believe in ClojureScript, immutable data and the process of building
a system out of pure functions.

__Third__, we believe in the primacy of data, for the reasons already described in
the main README. re-frame has a data oriented architecture. It 
implements an infinite loop of Derived data.

__Fourth__, we believe that Reactive Programming is one honking great idea. 
How did we ever live without it? It is a quite beautiful solution to one half of re-frame's 
data conveyance needs, **but** we're cautious about taking it too far - as far as, say, cycle.js. 
It doesn't take over everything in re-frame - it just does part of the job.

__Finally__, many years ago I programmed briefly in Eiffel where I learned 
about [command-query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation). 
Each generation of
programmers seems destined to rediscover this principle - CQRS is a recent re-rendering. 
And yet we still see read/write `cursors` and two way data binding being promoted as a good thing. 
Just say no. As programs get bigger, their use will encourage control logic into all the 
wrong places and you'll end up with a tire fire of an Architecture. IMO.

## It Does Physics

Remember this diagram from school? The water cycle.
Two stages, involving water in different phases, being acted upon
by different forces: gravity working one way, evaporation/convection the other.

![logo](/images/the-water-cycle.png?raw=true)

To understand re-frame, **imagine data flowing instead of water**. re-frame
provides the "conveyance" of the data - the gravity, evaporation and convection.
You design what's flowing and then you hang functions off the loop at
various points to look after the data's phase changes.

Sure, right now, you're thinking "lazy sod - make a proper Computer Science-y diagram". But, no.
Joe Armstrong says "don't break the laws of physics" - I'm sure
you've seen the videos - and if he says to do something, you do it
(unless Rich Hickey disagrees, and says to do something else). So,
this diagram, apart from being a plausible analogy which encourages
you to look differently at re-frame, is **practically proof** it does physics.

## It does Event Sourcing

How did that error happen, you puzzle, shaking your head ruefully?
What did the user do immediately prior?  What
state was the app in that this event was so problematic?

To debug, you need to know this information:
 1. the state of the app immediately before the exception
 2. What final `event` then caused your app to error

Well, with re-frame you need to record (have available):
 1. A recent checkpoint of the application state in `app-db` (perhaps the initial state)
 2. all the events `dispatch`ed since the last checkpoint, up to the point where the error occurred

Note: that's all just data. **Pure, lovely loggable data.**

If you have that data, then you can reproduce the error.

re-frame allows you to time travel, even in a production setting. 
Install the "checkpoint" state into `app-db`
and then "play forward" through the collection dispatched events.

The only way the app "moves forwards" is via events. "Replaying events" moves you
step by step towards the error causing problem.

This is perfect for debugging assuming, of course, you are in a position to capture
an app state checkpoint, and the events since then.

Here's Martin Fowler's [description of Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html).

## It does a reduce 

Here's an interesting way of thinking about the re-frame 
data flow ...

**First**, imagine that all the events ever dispatched in a 
certain running app were stored in a collection (yes, event sourcing again).
So, if when the app started, the user clicked on button X 
the first item in this collection would be the event 
generated by that button, and then, if next the user moved 
a slider, the associated event would be the next item in 
the collection, and so on and so on. We'd end up with a
collection of event vectors.

**Second**, remind yourself that the `combining function` 
of a `reduce` takes two parameters:
  1. the current state of the reduction and
  2. the next collection member to fold in.

Then notice that `reg-event-db` event handlers take two parameters also:
  1. `db` - the current state of `app-db`
  2. `v` - the next event to fold in

Interesting. That's the same as a `combining function` in a `reduce`!!

So now we can introduce the new mental model:  at any point in time, 
the value in `app-db` is the result of performing a `reduce` over
the entire `collection` of events dispatched in the app up until 
that time. The combining function for this reduce is the set of event handlers.

It is almost like `app-db` is the temporary place where this 
imagined `perpetual reduce` stores its on-going reduction.

Now, in the general case, this perspective breaks down a bit, 
because of `reg-event-fx` (has `-fx` on the end, not `-db`) which 
allows:
  1. event handlers can produce `effects` beyond just application state 
     changes.
  2. Event handlers sometimes need coeffects (arguments) in addition to `db` and `v`. 

But, even if it isn't the full picture, it is a very useful 
and interesting mental model. We first saw it in Elm's early use 
of `foldp` (fold from the past), which was later enshrined in the 
Elm Architecture.

And for the love of all that is good, please watch this terrific
[StrangeLoop presentation ](https://www.youtube.com/watch?v=fU9hR3kiOK0) (40 mins). 
See what happens when you re-imagine a database as a stream!! Look at 
all the problems that are solved.
Think about that: shared mutable state (the root of all evil),
re-imagined as a stream!!  Blew my socks off.

If, by chance, you do watched that video, you might twig to 
the idea that `app-db` is really a derived value .. the video tals 
 a lot about derived values. So, yes, app-db is a derived value of the `perpetual reduce`.

And yet, it acts as the authoritative source of state in the app. And yet, 
it isn't, it is simply a piece of derived state.  And yet, it is the source.

This is an infinite loop of sorts. An infinite loop of derived data.

## It does FSM

> Any sufficiently complicated GUI contains an ad hoc, 
> informally-specified, bug-ridden, slow implementation 
> of a hierarchical Finite State Machine  <br>
> -- [my 11th rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule)

`event handlers` collectively
implement the "control" part of an application. Their logic
interprets arriving events in the context of existing state,
and they compute what the new state of the application.  

`events` act, then, a bit like the `triggers` in a finite state machine, and 
the event handlers act like the rules which govern how the state machine
moves from one logical state to the next.

In the simplest
case, `app-db` will contain a single value which represents the current "logical state".
For example, there might be a single `:phase` key which can have values like `:loading`, 
`:not-authenticated` `:waiting`, etc.  Or, the "logical state" could be a function 
of many values in `app-db`. 

Not every app has lots of logical states, but some do, and if you are implementing 
one of them, then formally recognising it and using a technique like 
[State Charts](https://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782)
will help greatly in getting a clean design and fewer bugs.

The beauty of re-frame from a FSM point of view is that all the state is 
in one place - unlike OO systems where the state is distributed (and synchronized) 
across many objects. So implementing your control logic as a FSM is
fairly natural in re-frame, whereas it is often difficult and 
contrived in other kinds of architecture (in my experience).

So, members of the jury, I put it to you that:
  - the first 3 dominoes implement an [Event-driven finite-state machine](https://en.wikipedia.org/wiki/Event-driven_finite-state_machine)
  - the last 2 dominoes a rendering of the FSM's current state for the user to observe

Depending on your app, this may or may not be a useful mental model,
but one thing is for sure ... 

Events - that's the way we roll.

## Data Oriented Design

In the readme ... XXX

Events are data -  `[:delete-item 42]` 

That's almost like a function call `(delete-item 42)`. Kinda. So why prefer data?

Using data gives us:
  - easier hot reloading ??
  - late binding 
  - logability and event sourcing
  - a more flexible version of "partial" (curring)

## Derived Data

 **Derived data is flowing around the
loop, reactively, through pure functions.**  There is a pause in the loop whenever we wait
for a new event, but the moment we get it, it's another iteration of the "derived data" FRP loop.

Derived values, all the way down, forever.



Good news.  If you've read this far,
your insiders T-shirt will be arriving soon - it
will feature turtles
and [xkcd](http://xkcd.com/1416/). We're still working on the hilarious caption bit. Open a
repo issue with a suggestion.



## Prefer Dumb Views - Part 1

Many events are dispatched by the DOM in response to user actions.

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


## Full Stack


Commander Pattern 
https://www.youtube.com/watch?v=B1-gS0oEtYc 
