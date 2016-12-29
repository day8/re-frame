
> In a rush? You can get away with skipping this page on the first pass. <br>
> But remember to cycle back to it later. It contains useful insights.<br>
> Next page: [Effectful Handlers](EffectfulHandlers.md)

## Mental Model Omnibus

<img height="450px" align="right" src="/images/mental-model-omnibus.jpg?raw=true">

> All models are wrong, but some are useful

The re-frame tutorials initially focus on the **domino
narrative**. The goal is to efficiently explain the mechanics of re-frame,
and to get you reading and writing code ASAP.

But **there are other perspectives** on re-frame
which will deepen your understanding.

This tutorial is a tour of these ideas, justifications and insights.  
It is a little rambling, but I'm hoping it will deliver for you 
at least one "Aaaah, I see" moment before the end.

> If a factory is torn down but the rationality which produced it is
left standing, then that rationality will simply produce another
factory. If a revolution destroys a government, but the systematic
patterns of thought that produced that government are left intact,
then those patterns will repeat themselves. <br>
> -- Robert Pirsig, Zen and the Art of Motorcycle Maintenance


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
### Table Of Contents

- [What is the problem?](#what-is-the-problem-)
- [Guiding Philosophy](#guiding-philosophy)
- [It does Event Sourcing](#it-does-event-sourcing)
- [It does a reduce](#it-does-a-reduce)
- [Derived Data All The Way Down](#derived-data-all-the-way-down)
- [It does FSM](#it-does-fsm)
- [Interconnections](#interconnections)
- [Full Stack](#full-stack)
- [What Of This Romance?](#what-of-this-romance-)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is the problem?

First, we decided to build our SPA apps with ClojureScript, then we
chose [Reagent], then we had a problem. It was mid 2014.

For all its considerable brilliance,  Reagent (+ React)
delivers only the 'V' part of a traditional MVC framework.

But apps involve much more than V. We build quite complicated
SPAs which can run to 50K lines of code. So, I wanted to know: 
where does the control logic go? How is state stored & manipulated? etc.

We read up on [Pedestal App], [Flux], 
[Hoplon], [Om], early [Elm], etc., and re-frame is the architecture that
emerged.  Since then, we've tried to keep an eye on further developments like the
Elm Architecture, Om.Next, BEST, Cycle.js, Redux, etc.  They have taught us much
although we have often made different choices.

re-frame does have parts which correspond to M, V, and C, but they aren't objects.
It is sufficiently different in nature
from (traditional, Smalltalk) MVC that calling it MVC would be confusing.  I'd
love an alternative.

Perhaps it is a RAVES framework - Reactive-Atom Views Event
Subscription framework (I love the smell of acronym in the morning).

Or, if we distill to pure essence, `DDATWD` - Derived Data All The Way Down.

*TODO:* get acronym down to 3 chars! Get an image of stacked Turtles for `DDATWD`
insider's joke, conference T-Shirt.

## Guiding Philosophy

__First__, above all, we believe in the one true [Dan Holmsand], creator of Reagent, and
his divine instrument: the `ratom`.  We genuflect towards Sweden once a day.

__Second__, we believe in ClojureScript, immutable data and the process of building
a system out of pure functions.

__Third__, we believe in the primacy of data, for the reasons described in
the main README. re-frame has a data oriented, functional architecture.

__Fourth__, we believe that Reactive Programming is one honking good idea. 
How did we ever live without it? It is a quite beautiful solution to one half of re-frame's 
data conveyance needs, **but** we're cautious about taking it too far - as far as, say, cycle.js. 
It doesn't take over everything in re-frame - it just does part of the job.

__Finally__, many years ago I programmed briefly in Eiffel where I learned 
about [command-query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation). 
Each generation of
programmers seems destined to rediscover this principle - CQRS is the recent re-rendering. 
And yet we still see read/write `cursors` and two way data binding being promoted as a good thing. 
Please, just say no. As your programs get bigger, the use of these two-way constructs 
will encourage control logic into all the 
wrong places and you'll end up with a tire fire of an Architecture.


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
and then "play forward" through the collection of dispatched events.

The only way the app "moves forwards" is via events. "Replaying events" moves you
step by step towards the error causing problem.

This is perfect for debugging assuming, of course, you are in a position to capture
a checkpoint of `app-db`, and the events since then.

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
of a `reduce` takes two arguments:
  1. the current state of the reduction and
  2. the next collection member to fold in

Then notice that `reg-event-db` event handlers take two arguments also:
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
  1. Event handlers to produce `effects` beyond just application state 
     changes.
  2. Event handlers to have `coeffects` (arguments) in addition to `db` and `v`. 

But, even if it isn't the full picture, it is a very useful 
and interesting mental model. We were first exposed to this idea
via Elm's early use of `foldp` (fold from the past), which was later enshrined in the 
Elm Architecture.

## Derived Data All The Way Down

For the love of all that is good, please watch this terrific
[StrangeLoop presentation](https://www.youtube.com/watch?v=fU9hR3kiOK0) (40 mins). 
See what happens when you re-imagine a database as a stream!! Look at 
all the problems that evaporate.
Think about that: shared mutable state (the root of all evil),
re-imagined as a stream!!  Blew my socks off.

If, by chance, you ever watched that video (you should!), you might then twig to 
the idea that `app-db` is really a derived value ... the video talks 
a lot about derived values. So, yes, app-db is a derived value of the `perpetual reduce`.

And yet, it acts as the authoritative source of state in the app. And yet, 
it isn't, it is simply a piece of derived state.  And yet, it is the source. Etc.

This is an infinite loop of sorts - an infinite loop of derived data.

## It does FSM

> Any sufficiently complicated GUI contains an ad hoc, 
> informally-specified, bug-ridden, slow implementation 
> of a hierarchical Finite State Machine  <br>
> -- me, trying too hard to impress my two twitter followers

`event handlers` collectively
implement the "control" part of an application. Their logic
interprets arriving events in the context of existing state,
and they compute the new state of the application.  

`events` act a bit like the `triggers` in a finite state machine, and
the `event handlers` act like the rules which govern how the state machine
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

The beauty of re-frame, from a FSM point of view, is that all the state is 
in one place - unlike OO systems where the state is distributed (and synchronized) 
across many objects. So implementing your control logic as a FSM is
fairly natural in re-frame, whereas it is often difficult and 
contrived in other kinds of architecture (in my experience).

So, members of the jury, I put it to you that:
  - the first 3 dominoes implement an [Event-driven finite-state machine](https://en.wikipedia.org/wiki/Event-driven_finite-state_machine)
  - the last 3 dominoes render of the FSM's current state for the user to observe

Depending on your app, this may or may not be a useful mental model,
but one thing is for sure ... 

Events - that's the way we roll.


## Interconnections

Ask a Systems Theorist, and they'll tell you that a system has **parts** and **interconnections**. 

Human brains tend to focus first on the **parts**, and then, later, maybe on
**interconnections**. But we know better, right? We 
know interconnections are often critical to a system.
"Focus on the lines between the boxes" we lecture anyone kind enough to listen (in my case, glassy-eyed family members).

In the case of re-frame, dominoes are the **parts**, so, tick, yes, we have
looked at them first. Our brains are happy. But what about the **interconnections**?

If the **parts** are functions, as is the case with re-frame, 
what does it even mean to talk about **interconnections between functions?** 
To answer that question, I'll rephrase it as:
how are the domino functions **composed**?

At the language level, 
Uncle Alonzo and Uncle John tell us how a function like `count` composes:   
```clj
(str (count (filter odd?  [1 2 3 4 5])))
```
We know when `count` is called, and with what 
argument, and how the value it computes becomes the arg for a further function. 
We know how data "flows" into and out of the functions.

Sometimes, we'd rewrite this code as: 
```clj
(->>  [1 2 3 4 5]
      (filter odd?)
      count
      str)
```
With this arrangement, we talk of "threading" data 
through functions. **It seems to help our comprehension to frame function 
composition in terms of data flow**.

re-frame delivers architecture 
by supplying the interconnections - it threads the data - it composes the dominoes - it is the lines between the boxes. 

But it has no universal method for this. The technique it uses varies from one domino neighbour 
pair to the next.  Initially, it uses a queue/router, then a pipeline of interceptors 
and finally a Signal Graph.


## Full Stack

If you like re-frame and want to take the principles full-stack, then
these resource might be interesting to you:

Commander Pattern  
https://www.youtube.com/watch?v=B1-gS0oEtYc 

Datalog All The Way Down  
https://www.youtube.com/watch?v=aI0zVzzoK_E

## What Of This Romance?

My job is to be a relentless cheerleader for re-frame, right?
The gyrations of my Pom-Poms should be tectonic,
but the following quote makes me smile. It should
be taught in all ComSci courses.

> We begin in admiration and end by organizing our disappointment <br>
> &nbsp;&nbsp;&nbsp; -- Gaston Bachelard (French philosopher)

Of course, that only applies if you get passionate about a technology
(a flaw of mine).

But, no. No! Those French Philosophers and their pessimism - ignore him!!
Your love for re-frame will be deep, abiding and enriching.

*** 

Previous:  [First Code Walk-Through](CodeWalkthrough.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Infographic Overview](EventHandlingInfographic.md)


[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[SPA]:http://en.wikipedia.org/wiki/Single-page_application
[Reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://twitter.com/holmsand
[Flux]:http://facebook.github.io/flux/docs/overview.html#content
[Hiccup]:https://github.com/weavejester/hiccup
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[OM]:https://github.com/swannodette/om
[Prismatic Schema]:https://github.com/Prismatic/schema
[Hoplon]:http://hoplon.io/
[Pedestal App]:https://github.com/pedestal/pedestal-app
