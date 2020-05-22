> Our intellectual powers are rather geared to master static relations and our powers to 
> visualise processes evolving in time are relatively poorly developed. <br>
> 
>    -- Dijkstra


When programmers work, they need to reason about the **_runtime dynamics_** of their code - about
what happens over time, as it runs. They'll be staring, without seeing, at a spot in space, 
and in their heads, they'll be performing a runtime simulation of their code. 

But, as Dijkstra notes, this is hard.

An app is a "sequential process", and over time a sequential process will shift from one state to another, and consequently,
often from one behaviour to another. Code branches will conditionally execute subject to predicates on state, 
and, then, in a feedback loop, the executing code will update that state. 

Wait! Did someone just say feedback loop?
Even just a few steps into any mental stimulation, there
can be a lot to juggle, and we could be near the limits of our cognitive budget.

Certain kinds of interactions between time, state & computation reduce complexity, 
making mental simulations easier, while others do the opposite and make it virtually impossible. And, any
apps on the "impossible" end of that continuum, will breed nasty bugs and be scary to maintain.

As programmers, we often talk about static concerns like DRY and "cohesion vs coupling". Yes, they are all useful, 
but it would be better for us to focus more on the qualities which make the dynamics easier or harder to simulate.

## A Central Claim 

> **re-frame has a simple dynamic process**

re-frame handles events in a very mechanical and predictable way. This
regularity leads to a great ease in reasoning and understanding. Debugging and maintenance is straightforward.

> **There's almost no more important point to make about re-frame than this one**

re-frame must deliver an excellent developer experience - that's the primary design goal. And nothing 
contributes to that goal more than a simple dynamic model.

Okay, smartypants, how?

## re-frame Time 

Generally speaking, "Dynamics" is about how a physical system might develop or alter over time and the study of the causes of those changes. 

In software, Dynamics is about computation over time and the accumulation of state.

re-frame apps "move forward", through time, one event after another. 
Each event is entirely processed
from beginning to end before the next event on the queue is processed. re-frame doesn't support 
the notion of a process which can be "suspended" and then restarted. 

So, at that high level, "re-frame time" comes in discrete units, and each unit can be understood independently.

So, that's a comment about the very highest level. But, how about one level down, **_within_** the processing of a single event? What about those dynamics? 

## Event Processing

Remember those "theory of computation" lectures at Uni? The most limited 
kind of computation, and as a consequence, the easiest dynamic process to simulate in your head,
was called a Finite State Machine. 

At the other end of the computational spectrum were Turing Machines. 
You can compute anything with a Turing Machine which is awesome, right?  Anything. Fantastic. But there might be a cost: your programming keyboard has now become a loaded gun. Is your foot safe? 

> just because you can, doesn't mean you should

re-frame's overarching process for handling a sinlge event is a "Finite State Machine". Well, effectively. 

The event handling process walks step by step through a linear set of logical states,
which you know already as "The Dominoes". Only one state at a time is happening, and in each state
there is specific behaviour, and each of them is sufficiently isolated from the others 
that it can be understood and analysed independently. You can safely "zoom in" to understand each part.

The re-frame docs don't formally talk about FSMs and, instead, present it as a "data flow". But the dominos are a simple FSM "in nature". Consequently, each event is processed using the
the simplest kind of computation, making it easy to simulate in your head. 


!!! Note "Less Is More"
    At this level, re-frame is **_less powerful by design_**. It delivers the minimum amount of power necessary to get the job done. 
    Instead of providing computation with many degrees of freedom and occasional magic, it will give you simplicity and certainty. 

!!! Note "Less Is Scary"
    Offering programmers less computational power makes them uncomfortable. We live in a world where requirements change on us all the time and often is very unexpected ways. For our protection, 
    so we can handle these unexpected requirements, we are attracted to more power, not less.

But let's now zoom in further. But what about the dynamics one level down again, within each step? 

## Pure Functions 

One step down, at the Domino level, you are back to programming with the Turing complete power of ClojureScript.
Thankfully, to control that power, you are writing using pure functions. 

The beautiful thing about pure functions is how much you can ignore in the way of surrounding dynamics. They stand outside of time.
The tyranny of time is still there on the inside of the pure function, because there is a flow of execution within the 
function itself. You might still need to simulate that in your head.  But a pure function delivers a smaller dynamic process to understand - one that is more cognitively tractable. 

Pure functions allow you to narrow your focus.

!!! Note "Banana Issues"
    Non-pure functions reach out and grab a banana (a value) from the global space beyond their arguments.
    Looks inocent enough. But now, to understand the function you also need to understand
    the dynamics for everything that might change the banana over time. But as you 
    pull the banana back towards you, you discover there's a Gorilla holding that banana. 
    And that Gorilla is sitting in a jungle, so you get that too. Plus some monsoonal weather.
    There's often a lot of new dynamics coming your way.

## Declarative 

Declarative programming means saying "make _X_ happen", but not needing to specify how. 

So, it abstracts away the process, and it collapses the dynamics.

re-frame has a lot of "declarative" happening. Reagent is a powerful declarative DOM capability. Events are declarative. 
Effects are declarative. The Signal Graph is declarative. 

And all this "declarative" is done with data-based DSLs. 


!!! Note "Data DSLs"
    Have you ever noticed that "declarative" is better when the DSL is defined in data? 
    For example, Hiccup is an excellent DSL, and it is data. In the simple case, just data literals, but computation can be added to generate the data. 
    SQL is string-based. As literals that's okay, but it completely sucks if we have to start computing the string.
    And regexs? Oof. A string-based DSL for a powerful, occasionally surprising computational paradigm. Forget "now you have two problems". Now you have an N x N matrix of interacting problems.

## State Management 

Nothing screams "complicated dynamics" more than needing to "distribute state". 
Well, other than appending "over unreliable networks".

This is, of course, why OO is problematic. How on earth did we ever think
that deliberately distributing state into hidden little mutable packets and
then having to dynamically synchronise them was a good idea?  And, Your Honour,
I was as guilty as the rest.

re-frame puts state in the one place and updates it once per event cycle, in one fell swoop. 
You never need to worry that the app is in some slightly inconsistent intermediate state.
You never need to worry about the dynamics of communicating changes from one "store" of state to another.

Also, in one fell swoop, you can check if **_all the state in your app_** (all of it!) 
conforms to a schema. And that includes any data which just arrived
over the wire from the server.

## Immutable State

State is congealed time. And immutable state allows us to freeze time, and ignore 
unnecessary dynamics, particularly when used with pure functions. What an amazingly 
simple platform on which to build, and when I say simple, I mean shockingly, beautiful and powerful.


## Incident report - "Simple Dynamic Process"

While re-fame normally has a simple dynamic process, but we acknowledge fat tail risk.

On May 12th, at approximately 12:47am, re-frame became self-aware. It printed a single console log: "Oh, really? I'll show *you* a simple dynamic process, f#$%ers". 

Although a nuclear winter did follow, humans ultimately prevailed over the robot army,
and the bug was found and fixed. So, all good. But if ever you notice a Signal Graph
adopting a Cortex structure, we still recommend a precautionary reboot.

## Summary 

re-frame apps are simple to simulate in your head, and there are consequences - all of them good. 

When talking to an experienced programmer recently, I was thrilled when he said the following (in a slightly distracted way, almost as if surprised by the realisation): 

> Been using re-frame for nine months now. You know what's odd? I find myself writing fewer tests these days, since I started using re-frame. 

So, an experienced (self regulating) programmer who has previously written a lot of tests, 
is instinctively writing fewer tests, surprising even himself a bit, 
because his intuitions are telling him it is safe to do so. 
It is empirically simpler. Experientially simpler. 
I can give you all the theory in the world for why re-frame is good. But there's 
almost no better recommendation than this. 



<!-- 
### Our Goal 

XXX 

Imgaine a world in which all the dynamics for handling an event was turned  into inspectable, browsable data. 
We have a tool called re-frame-10x. 

Our goal with that tool is that we turn all computation into data. 

Clojure is a LISP and the computation of LISPs are uniquely traceable languages. 

Our goal is that every bit of computation 

-->