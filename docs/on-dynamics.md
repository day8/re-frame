> Our intellectual powers are rather geared to master static relations and our powers to 
> visualise processes evolving in time are relatively poorly developed. <br>
> 
>    -- Dijkstra


When programmers work, they need to reason about the **runtime dynamics** of their code - about
what happens over time, as it runs. They'll be staring, without seeing, at a spot in space, 
and in their heads, they'll be performing a runtime simulation of their code.

But, as Dijkstra notes, this is hard.

## The Claim 

> **re-frame has a simple dynamic process**

It is the purpose of this page to explore and justify this claim. 


> **There's almost no more important point to make about re-frame than this one**

The primary design goal for re-frame is that it delivers an excellent developer experience. 
I believe that nothing contributes to this goal more than it having "a simple dynamic model".
Almost nothing makes a programmer's job easier than 
a simple dynamic model. Almost nothing reduces bugs more than a simple dynamic model.

## On Dynamics

When scientists or engineers study "Dynamics" they look at how a system develops or
changes over time/space, and at the causes of those changes. Think of Hydrodynamics, Thermodynamics and Social Dynamics.

A Web App is a "sequential process", and over time a sequential process will shift from one `State` to another, and consequently,
often from one behaviour to another. The system "Dynamics" involve interactions between `Computation` and `State`, across time.

`State` is effectively congealed time -  history materialised - and it is accreted by rounds of `Computation`. Although it is 
Computation which creates the state, this Computation is itself controlled by the State because, for example, predicates on State 
determine which branches of Computation are executed. So, there's a feedback loop between these two. 

For a programmer, even just a few steps into any mental stimulation, there
can be a lot to juggle, and we could be near the limits of our cognitive budget. Which leads to Dijkstra's lament. 

Certain kinds of interactions between time, `State` & `Computation` reduce dynamic complexity, 
making mental simulations easier, while others do the opposite and make it virtually impossible. And, any
systems on the "impossible" end of that continuum, will breed nasty bugs and be scary to maintain.

As programmers, we often talk about static concerns like DRY, line count, and "cohesion vs coupling". 
And while, yes, they are all useful, perhaps we should pay more attention to the qualities which 
make runtimes easier or harder to simulate in our heads.


## re-frame Time 

re-frame apps "move forward", through this computational/state space, 
one event after another. Time is discrete. 

Each event is entirely processed
from beginning to end before the next event on the queue is processed.
re-frame does not support the idea that an event can be "suspended" 
and then, later, restarted. It is only ever doing one thing at a time.

And, when one of these events changes application state, it does so 
transactionally (instantly), in one fell swoop, not incrementally.

So, at the highest level, re-frame delivers dynamics in discrete units, 
which can be understood and analysed independently. This serves to simplify 
the dynamics. 

But, how about one level down, **_within_** the processing of a single event? What about those dynamics? 

## Processing An Event

Do you remember those "theory of computation" lectures at Uni? The most limited 
kind of computation, and as a consequence, the easiest dynamic process to simulate in your head,
was called a Finite State Machine. 

At the other end of the computational spectrum were Turing Machines. 
You can compute anything with a Turing Machine, which is awesome, right?  Anything. Fantastic. 
But there might be a cost: your programming keyboard has now become a loaded gun. Is your foot safe? 

> just because you can, doesn't mean you should

re-frame's overarching process for handling a single event is one part "Finite State Machine" and one part dataflow.

The event-handling process proceeds step by step through a linear set of logical states,
which you know already as "The Dominoes". Only one state at a time is happening, and in each state
there is specific behaviour/computation, and each of them is sufficiently isolated from the others 
that it can be understood and analysed independently. You can comfortably "zoom in" to understand each part.

The re-frame docs don't formally talk about FSMs and, instead, present it as a "data flow" which 
causes transitions from one state to another. 
But the dominos are a simple FSM "in nature". Consequently, each event is processed using a
simple kind of computation, making it easy to simulate in your head. 


!!! Note "Less Is More"
    At this level, re-frame is **_less powerful by design_**. It delivers the minimum amount of power necessary to get the job done. 
    Instead of providing computation with many degrees of freedom and occasional magic, it will give you simplicity and certainty. 

!!! Note "Less Is Scary"
    Offering programmers less computational power makes them uncomfortable. 
    We live in a world where requirements change on us all the time and often 
    in unexpected and unwelcome ways. For our protection, 
    so we can handle these unexpected requirements, we are attracted to more power, not less.

But let's now go deeper again. But what about the dynamics within each Domino? 

## Pure Functions 

Within a Domino, we are back to programming with the Turing complete power of ClojureScript.
Thankfully, to harness and control that frightening power, you write pure functions and use immutable data.

Pure functions stand outside of "time". To understand them, you don't need to know "when" they were run and
the state of the system at that point. Instead, you need only know the value of their actual arguments.

The tyranny of time is still present on the inside of the pure function, because there is an internal flow of execution.
So, you might still need to simulate that in your head.  But a pure function delivers a smaller
dynamic process to understand - one that is more cognitively tractable. 

What is provided as arguments to a function is data, and what they return is data. Using immutable data for both 
acts to insulate pure functions from "place" - where data is put.

Once functions are decoupled from both "time" and "place" they can be composed in a maximally mathematical way.
I asked earlier what simplifying "abstractions" might exist to help us dampen the complexity
of runtime dynamics, and these two are a very potent duo. 


!!! Note "Banana Issues"
    Non-pure functions "reach out" and grab a banana (a value) from the global space beyond their arguments.

    Initially, it can seem innocent enough. But now, to understand the function's internal dynamics, you also need to understand
    the dynamics for everything that might change that banana over time. Unfortunately, as you 
    pull the banana back towards you, you might discover a Gorilla is holding it. 
    And that Gorilla is sitting in a jungle, so you get that too. Plus some Monsoonal weather.
    There's often a lot of new runtime dynamics coming your way, attached to that initial banana. 

## Declarative 

Declarative programming means saying "make _X_ happen", but not needing to specify how. 

So, it abstracts away the process, and it collapses the associated dynamics.

re-frame has a lot of "declarative" happening. Reagent is a powerful declarative DOM capability. Events are declarative. 
Effects are declarative. The Signal Graph is declarative. 

And all this "declarative" is done with data-based DSLs, as is the Lisp way. 


!!! Note "Data DSLs"
    Have you noticed that "declarative" is better when the DSL is defined in data? 

    For example, Hiccup is an excellent DSL, and it is data. In the simple case, just data literals, but computation can be added to generate the data. 
    SQL is string-based. As literals that's okay, but it completely sucks if we have to start computing the string.
    And regexs? Oof. A string-based DSL for a powerful, occasionally surprising computational paradigm. Forget "now you have two problems". Now you have an N x N matrix of interacting problems.

## State Management 

Nothing screams "complicated dynamics" more than needing to "distribute state". 
Well, other than appending "... over unreliable networks".

This is, of course, why OO can be problematic. How on earth did we ever think
that deliberately distributing state into hidden little mutable packets and
then having to dynamically synchronise them was a good idea?  And, Your Honour,
I was as guilty as the rest.

re-frame puts state in the one place and updates it once per event cycle, in one fell swoop. 
You never need to worry that the app is in some slightly inconsistent intermediate state.
And you don't need to worry about the dynamics of communicating changes from one "store" of state to another.

Also, in one fell swoop, you can check if **_all the state in your app_** (all of it!) 
conforms to a schema. And that includes any data which just arrived
over the wire from the server.


## Incident report - "Simple Dynamic Process"

While re-fame normally has a simple dynamic process, but we acknowledge fat tail risk.

On May 12th, at approximately 12:47am, re-frame became self-aware. It printed a single console log: "Oh, really? I'll show *you* a simple dynamic process, f#$%ers". 

Although a nuclear winter did follow, humans ultimately prevailed over the robot army,
and the bug was found and fixed. So, all good. But if ever you notice a Signal Graph
adopting a Cortex structure, we still recommend a precautionary reboot.

## Summary 

re-frame apps are simple to simulate in your head, and there are consequences - all of them good.

This simplicity arises from a combination of factors. On this page, we have reviewed re-frame layer by layer, starting at a high level with how
events are handled one after the other in a discrete way. Then, how a single event is handled step by step in a FSM-like way. Then, how 
pure functions and immutable data dramatically dampen dynamics. Then, through to how declarative data-based DSLs are used 
in multiple places. An, finally, at how there is only one store of State and how it is updated only once per event cycle in a transactional way.

Recently, at a local Clojure meetup, I was talking to an experienced programmer, and I was thrilled to hear him say the following (in a slightly distracted way, almost as if surprised by the realisation): 

> Been using re-frame for nine months now. Do you know what's odd? I find myself writing fewer tests these days since I started using re-frame. 

So, an experienced (self-regulating) programmer who has previously written a lot of tests, 
is instinctively writing fewer tests, surprising even himself a bit with the decision. 
I believe his intuitions are telling him it is safe to do so. He is reacting to the simplicity he is experiencing.

N of 1, sure. But there's almost no better recommendation than this. I was delighted.



<!-- 
### Reified Dynamics

Our goal is to turn Dynamics into data. 
By tracing all forms. 
End up with a data structure for each event which completely captures all the execution trace. 



XXX 

Imgaine a world in which all the dynamics for handling an event was turned  into inspectable, browsable data. 
We have a tool called re-frame-10x. 

Our goal with that tool is that we turn all computation into data. 

Clojure is a LISP and the computation of LISPs are uniquely traceable languages. 

Our goal is that every bit of computation 

-->