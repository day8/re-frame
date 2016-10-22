[logo](/images/logo/re-frame_128w.png?raw=true)

## Derived Values, Flowing

> This, milord, is my family's axe. We have owned it for almost nine hundred years, see. Of course,
sometimes it needed a new blade. And sometimes it has required a new handle, new designs on the
metalwork, a little refreshing of the ornamentation ... but is this not the nine hundred-year-old
axe of my family? And because it has changed gently over time, it is still a pretty good axe,
y'know. Pretty good.

> -- Terry Pratchett, The Fifth Elephant <br>
> &nbsp;&nbsp;&nbsp; Reflecting on identity, flow and derived values


[![Clojars Project](https://img.shields.io/clojars/v/re-frame.svg)](https://clojars.org/re-frame)
[![GitHub license](https://img.shields.io/github/license/Day8/re-frame.svg)](license.txt)
[![Circle CI](https://circleci.com/gh/Day8/re-frame/tree/develop.svg?style=shield&circle-token=:circle-ci-badge-token)](https://circleci.com/gh/Day8/re-frame/tree/develop)
[![Circle CI](https://circleci.com/gh/Day8/re-frame/tree/master.svg?style=shield&circle-token=:circle-ci-badge-token)](https://circleci.com/gh/Day8/re-frame/tree/master)


## Why Should You Care?

Perhaps:

1.  You want to develop an [SPA] in ClojureScript, and you are looking for a framework
2.  You believe Facebook did something magnificent when it created React, and
    you are curious about the further implications. Is the combination of
    `reactive programming`, `functional programming` and `immutable data` going to
    **completely change everything**?  And, if so, what would that look like in a language
    that embraces those paradigms?
3.  You're taking a [Functional Design and Programming course at San Diego State University](http://www.eli.sdsu.edu/courses/fall15/cs696/index.html)
    and you have to learn re-frame to do an assignment.  You've left it a bit late, right? 
    Good news, there is a quick start guide coming up shortly. 
4.  You like a bit of social proof!!  I can report that 
    re-frame is impressively buzzword compliant: it has reactivity, 
    unidirectional data flow, pristinely pure functions, 
    interceptors, coeffects, conveyor belts, statechart-friendliness (FSM)
    and claims an immaculate hammock conception. It also has a charming 
    xkcd reference (soon) and a hilarious, insiders-joke T-shirt, 
    ideal for conferences (in design).  What could possibly go wrong?

## re-frame

re-frame is a pattern for writing [SPAs] in ClojureScript, using [Reagent].

This repo contains both a **description of this pattern** and 
a **reference implementation**.

McCoy might report "It's MVC, Jim, but not as we know it".  And you would respond 
"McCoy, you trouble maker, why even mention an OO pattern? 
re-frame is a **functional framework**."

Being a functional framework, you program it by:
 - designing data and
 - writing pure functions which transform this data

### It Is A Loop

Architecturally, re-frame implements "a perpetual loop".

To build an app, you hang pure functions on certain parts of this loop, 
and re-frame looks after the `conveyance of data` (flow of data) 
around the loop, into and out of the transforming functions you 
provide - hence the tag line "Derived Data, Flowing".

### It Has 5 Dominoes

Computationally, each iteration of the loop involves the same 
5 domino cascade.  One domino triggering the next, which triggers the next, etc, 
until we are back at the beginning of the loop. Each iteration has the same cascade.

<img align="right" src="/images/Readme/Dominoes-small.jpg?raw=true">

An `event` acts as the **1st domino**. 

An event might be initiated by a user clicking a button, or entering a field, 
or it might be caused by another agent, such as a websocket which just
receiving a new message.
Without the impulse of a triggering `event`, no 5 domino cascade occurs.
So, it is only because of `events` that a re-frame app is propelled, 
loop iteration after loop iteration, from one state to the next. 

re-frame is `event` driven.

The **2nd domino**, `event handling`, involves computing how the 
application should respond/change to the new `event` occurrence.

Event handlers produce `effects` or, more accurately,
a **description** of `effects`.  These descriptions say how the state of
an SPA itself should change, and sometimes they also say how the 
outside world should change (localstore, cookies, databases, emails, etc).

The **3rd domino** takes these descriptions (of `effects`) and actions them. Makes them real.

Now, to a functional programmer, `effects` are scary, in a [xenomorph kind of way](https://www.google.com.au/search?q=xenomorph).
Nothing messes with functional purity
quite like the need for effects and coeffects. But, on the other hand, `effects` are equally 
marvelous because they take the app forward. Without them, an app stays stuck in one state forever,
never achieving anything.

So re-frame embraces the protagonist nature of `effects` - the entire, unruly zoo of them - but
it does so in a controlled, debuggable, auditable, mockable, plugable way.

After the effectful 3rd domino handlers have run, 
something about the world will have changed, often the app's state. **Dominoes 4 and 5** close
the re-frame loop by re-rendering the UI to reflect any change in application state. 

These two dominoes combine to implement the formula made famous by React: `v = f(s)` - a view `v` 
is a function `f` of the app state `s`.  **Over time**, when `s` changes, `f`
will be called again to compute new `v`, forever keeping `v` up to date with the current `s`.

In our case, it is domino 3 which changes `s`, the application state, 
so dominos 4 and 5 are conceptually about re-running `f` so as to produce a new `v`. 

Except, of course, it is more subtle than that.  There is no one `f` to run, 
there may be many functions which collectively build the overall DOM, 
and only part of `s` may change at any one time, so only part of the 
DOM need be updated.
 
Domino 4 is a novel, simple and efficient de-duplicated signal graph which 
runs query functions on the application state, `s`, efficiently computing 
reactive, multi-layered, "materialised views" of `s`. 

And, finally, Domino 5 are view functions (Reagent/React) which turn data 
into DOM reactively (efficiently & declaratively). The data is supplied 
by the query functions in domino 4.
  
Do not be alarmed by any terminology which isunfamiliar, you'll see how simple
the code is shortly. 

### A Dominoes Walk Through

Imagine the following scenario: the user sees a list of items, and 
clicks the delete button for the 3rd item in a list. In response, 
what happens within a re-frame app?

The 5 domino cascade:

1. The on-click handler for that button uses the re-frame supplied function, 
   `dispatch`, to send an `event`, which might look like this `[:delete-item 2]`.
   Yes, that's a vector of two elements. 
2. The `event handler` (function) associated with `:delete-item` (the first
   element of the event) is called to compute the `effect` of the `event`.
   In this case, it computes that new application state should
   result (this state will not include the deleted item).
3. an `effect handler` (function) resets application state to the newly computed value.
4. a query (function) over the application state is called (reactively), computing a new 
   list of items (result) containing no 3rd item!.
5. a view (function) is called to re-compute DOM (reactively), because the 
   query state to which it is subscribed has changed.

At this point, the re-frame app returns to a quiescent state, 
waiting for the next event. When one comes, a 
similar 5 domino cascade will happen again.

### A Simple Loop Of Simple Functions

**Each of the dominoes you supply are simple, pure functions** which 
can be be described, understood and 
tested independently (other than domino 3). They take data, transform it and return new data.

The loop itself is utterly predictable and very mechanical in operation.
So, there's a regularity, simplicity and
certainty to how a re-frame app goes about its business,
which leads, in turn, to a great ease in reasoning and debugging.

## It Leverages Data

You might already know that ClojureScript is a modern lisp, and that
lisps are **homoiconic**.  If not, you do now.

The homoiconic bit is significant. It means you program in a lisp by creating and
assembling lisp data structures. So you are **programming in data**. 
The functions which later manipulate data, start as data.

Clojure programmers place particular 
emphasis on the primacy of data. When they aren't re-watching Rich Hickey videos, 
and wishing their hair was darker and more curly, 
they meditate on aphorisms like "Data is the ultimate in late binding".

I cannot stress too much what a big deal this is. It can seem 
like a syntax curiosity at first but, when the penny drops for 
you on this, it tends to be a profound moment. And once you 
understand the importance of this concept at the language level, 
you naturally want to leverage similar power at the library level.

So, it will come as no surprise, then, to know that re-frame has a 
data oriented design. Events are data. Effects are data. DOM is data.
The functions which transform data are registered and looked up via 
data. Interceptors (data) are preferred over middleware (higher 
order functions). Etc.

Data - that's the way we roll.

### It is both mature and used in the large

re-frame was released early 2015, and has subsequently been happily
used by a number of companies - [large](http://open.mediaexpress.reuters.com/), 
[medium](https://rokt.com/) and
[smaller](https://www.fullcontact.com) - as well 
as individuals to build complex apps which run to 50K lines of code, and beyond.

Frameworks
are just pesky overhead at small scale - measure them instead by how they help
you tame the complexity of bigger apps, and in this regard re-frame has
worked out well. Some have even praised it effusively.

Having said that, re-frame remains a work in progress and it falls
short in a couple of ways - for example it doesn't work as well as we'd
like with devcards - we're still
puzzling over some aspects and tweaking as we go. All libraries
represent a point in the possible design space, with pros and cons.

And, yes, re-frame is fast, straight out of the box. And, yes, it has 
a good testing story. And, yes, it works in with figwheel to create
a delightful hot-loading development story. And, yes, it has 
a fun specialist tooling, and a community,
and some 3rd part libraries.


### Where Do I Go Next?

**At this point you already know 40% of re-frame.**  There's detail to fill in,
but the core concepts are now known to you.

Next, you need to do the code walk through in the docs. This
will quickly get your knowledge to about 80%. The
final 20% always comes with use and carefully reading the rest of the 
docs (of which there's a few). 

Read these docs: <br>
https://github.com/Day8/re-frame/blob/master/docs/README.md

Experiment with these examples: <br>
https://github.com/Day8/re-frame/tree/master/examples

Use a template to create your own project: <br>
Client only:  https://github.com/Day8/re-frame-template  <br>
Front and back: http://www.luminusweb.net/

Use these resources: <br>
https://github.com/Day8/re-com
XXX 

### Licence

Copyright © 2015 Michael Thompson

Distributed under The MIT License (MIT) - See LICENSE.txt


[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[SPA]:http://en.wikipedia.org/wiki/Single-page_application
[Reagent]:http://reagent-project.github.io/
