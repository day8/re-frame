<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Derived Values, Flowing](#derived-values-flowing)
- [Why Should You Care?](#why-should-you-care)
- [re-frame](#re-frame)
  - [It Is A Loop](#it-is-a-loop)
  - [It Has 5 Dominoes](#it-has-5-dominoes)
  - [A Dominoes Walk Through](#a-dominoes-walk-through)
  - [A Simple Loop Of Simple Functions](#a-simple-loop-of-simple-functions)
- [It Leverages Data](#it-leverages-data)
  - [It is both mature and successful in the large](#it-is-both-mature-and-successful-in-the-large)
  - [Where Do I Go Next?](#where-do-i-go-next)
  - [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
    and you have a re-frame/reagent assignment due.  You've left the reading a bit late, right? I remember those days.
4.  re-frame is impressively buzzword compliant: it has reactivity,
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
"McCoy, you damn trouble maker, why even mention an OO pattern? 
re-frame is a **functional framework**."

Being a functional framework, it is about data, and the pure functions 
which transform that data.

## It solves a dilemma

SPAs are fundamentally mutative in nature.

They change the DOM, databases, localstore, cookies, etc. Horrifically mutative. Carnage.
But this is a good thing. The user of these SPAs wants to be changing the world, 
right, otherwise what's the point?
 
But we are crazed, wide-eyed functional zealots, heroically resisting the 
entire notion of mutation, and insisting instead on the wonders of pure functions.

This is something of a dilemma.

re-frame's lets you compose a mutative application from pure functions.

### It is a loop

Architecturally, re-frame implements "a perpetual loop".

To build an app, you hang pure functions on certain parts of this loop, 
and re-frame looks after the `conveyance of data` (flow of data) 
around the loop, into and out of the transforming functions you 
provide - hence the tag line "Derived Data, Flowing".

### It is a 6-domino cascade

Computationally, each iteration of the loop involves a
6 domino cascade.  One domino triggering the next, which triggers the next, etc,
until we are back at the beginning of the loop. Each iteration has the same cascade.

<img align="right" src="/images/Readme/Dominoes-small.jpg?raw=true">

#### 1st Domino 

An `event` is sent when something happens - the user 
clicks a button, or a websocket receives a new message.

Without the impulse of a triggering `event`, no 6 domino cascade occurs.
It is only because of `events` that a re-frame app is propelled,
loop iteration after loop iteration, from one state to the next.

re-frame is `event` driven.

#### 2nd Domino

In response to an `event`, an application must compute 
its ramification (its ambition, its intent) - what should 
happen as a result. This is known as `event handling`.

Event handler functions compute `effects`. Or, more accurately, they compute
a **description of `effects`**, which is to say they say, declaratively, 
how the world should change (because of the event). 

Much of the time, only the state of the SPA itself need
change, but sometimes the outside world too must be effected
(localstore, cookies, databases, emails, logs, etc).

#### 3rd Domino

These descriptions of `effects` are actioned. The intent is made real.

Now, to a functional programmer, `effects` are scary in a 
[xenomorph kind of way](https://www.google.com.au/search?q=xenomorph).
Nothing messes with functional purity
quite like the need for effects and coeffects. But, on the other hand, `effects` are equally 
marvelous because they take the app forward. Without them, an app stays stuck in one state forever,
never achieving anything.

So re-frame embraces the protagonist nature of `effects` - the entire, unruly zoo of them - but
it does so in a controlled, debuggable, auditable, mockable, plugable way.

#### Then what happens, Grandpa?

That 3rd domino just changed the world and, very often, that involves 
**changing the app's state**.
  
You'll soon see that re-frame `app state` is held in one place - think of it like you 
would an in-memory, central database for the app.

While the domino cascade 1-2-3 represents the event handling process, 
it is not the end of the overall story - it is the first chapter.  When 
domino 3 changes `app state` it triggers another chapter, involving the 4-5-6 domino cascade.

#### The view formula 

The 4-5-6 domino cascade implements the formula made famous by Facebook's ground-breaking React library: 
`v = f(s)`. A view `v` is a function `f` of the app state `s`.

Said another way: there are functions `f` which compute what DOM nodes, `v`,
which should be displayed to the user when the application is in a given state, `s`.

**Over time**, when `s` changes, `f`
will be called again to compute new `v`, forever keeping `v` up to date with the current `s`.

In our case, it is domino 3 which changes `s`, the application state,
and, in response, dominoes 4-5-6 are about re-running `f` to compute the new `v` 
shown to the user.

Except, of course, it is more subtle than that.  There is no single `f` to run.
There may be many functions which collectively build the overall DOM, 
and only part of `s` may change at any one time, so only part of the 
`v` (DOM) need be re-computed and updated. And some parts of `v` might not 
even be showing right now.

#### Domino 4

**Domino 4** is a novel and efficient de-duplicated signal graph which 
runs query functions on the app state, `s`, efficiently computing 
reactive, multi-layered, "materialised views" of `s`.

(Relax about any unfamiliar terminology, you'll soon 
see how very simple the code actually is)


#### Domino 5

**Domino 5** is one or more **view functions** (Reagent) which compute what 
UI DOM should be displayed for the user. 

They take data, delivered reactively by the queries of domino 4, 
and compute hiccup-formatted data, which is a description of the DOM required. 
More on hiccup soon.

#### Domino 6

**Domino 6** is not something you need write yourself - instead it is handled for you 
by Reagent/Rect. I mention it here 
for completeness in order to fully close the loop. 

It is the step in which the hiccup-formatted 
"descriptions of required DOM", returned by Domino 5, is made real. The  
browser DOM nodes are mutated by React.
 
#### Similar cascades

Cascades 1-2-3 and 4-5-6 have a similarity.

The last domino is each is mutative - it does the dirty work.  The step immediately 
prior computes "descriptions" of the mutations required, and these final dominoes 
make it real.

But you seldom need to worry about 3 and 6 yourself. It is up to re-frame 
to look after such mutations for you, allowing you to focus on the pure function 
part earlier in the chains. That's where your programming work will be done.

### A Dominoes Walk Through

Here's an example. 

The UI of an SPA is showing the user a list of items, and 
they click the "delete" button for the 3rd item in a list. 

In response, 
what happens within this re-frame app? Here's a sketch of the 6 domino cascade:

1. The `on-click` handler for that delete button uses the re-frame supplied function, 
   `dispatch`, to emit an `event`. That event might be `[:delete-item 2]`.
   Yes, that's a vector of two elements. The first element says what kind of event it is, 
   and the `rest` are further details of the event.  More detail soon. 
2. The `event handler` (function) associated with `:delete-item` (the first
   element of the event) is called to compute what `effect` the `event`
   should have.
   In this case, it computes that new application state should
   result (this new state will not include the deleted item).
3. an `effect handler` (function) actions the `effect`, and 
   resets application state to the newly computed value. This is a mutative
   step, facilitated by re-frame, which you won't have to do explicitly.
4. because the application state changed, a query (function) over the application 
   state is called (reactively), and it computes the list of items (which 
   now, because of domino 3, nolonger contains the 3rd item)
5. because the query function computed a new value, a view (function) which subscribes
   to that value, is called (reactively) to re-compute DOM.  It produces a hiccup-formatted 
   data structure which describing the DOM nodes required (no DOM nodes for the deleted item, obviously,
   but otherwise the same DOM as last time).  
6. Reagent/React takes the description of required DOM, and makes it real. The DOM "this
   time" is pretty much the same as last time, except fo the absence of the DOM for that
   deleted item. This is 
   a mutative step, which you don't have to worry about, it happens for you.

At this point, the re-frame app returns to a quiescent state, 
waiting for the next event. When a new one happens, another 
6 domino cascade will follow. 


### A Simple Loop Of Simple Functions

**Each of the dominoes you supply are simple, pure functions** which 
can be be described, understood and 
tested independently. They take data, transform it and return new data.

The loop itself is utterly predictable and very mechanical in operation.
So, there's a regularity, simplicity and
certainty to how a re-frame app goes about its business,
which leads, in turn, to a great ease in reasoning and debugging.

## It Leverages Data

You might already know that ClojureScript is a modern lisp, and that
lisps are **homoiconic**.  If not, you do now.

The homoiconic bit is significant. It means you program in a lisp by creating and
assembling lisp data structures. Think about that. You are **programming in data**. 
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

### It is mature and proven in the large

re-frame was released in early 2015, and has since [been](https://www.fullcontact.com)
successfully
[used](https://www.nubank.com.br) 
by
[quite](http://open.mediaexpress.reuters.com/)
a 
[few](https://rokt.com/) companies and
individuals to build complex apps, many running beyond 40K lines of
ClojureScript.

<img align="right" src="/images/scale-changes-everything.jpg?raw=true">

**Scale changes everything.** Frameworks
are just pesky overhead at small scale - measure them instead by how they help
you tame the complexity of bigger apps, and in this regard re-frame has
worked out well. Some have been effusive in their praise.

Having said that, re-frame remains a work in progress and it falls
short in a couple of ways - for example it doesn't work as well as we'd
like with devcards (which is a library vs framework issue) - we're still
puzzling over some aspects and tweaking as we go. All libraries
represent a point in the possible design space, with pros and cons.

And, yes, re-frame is fast, straight out of the box. And, yes, it has 
a good testing story (unit and behavioural). And, yes, it works in with figwheel to create
a delightful hot-loading development story. And, yes, it has 
a fun specialist tooling, and a community,
and useful 3rd party libraries.

### Where Do I Go Next?

We haven't yet looked at code, but **at this point you 
already know 40% of re-frame.**  There's detail to fill in, for sure,
but the core concepts are now known to you.

Next, you need to do the code walk-through in the docs. This
will quickly get your knowledge to about 70%. The
final 30% always comes incrementally with use and by reading the rest of the 
docs (of which there's a few).

So, next, go here: <br>
https://github.com/Day8/re-frame/blob/master/docs/README.md

Experiment with these examples: <br>
https://github.com/Day8/re-frame/tree/master/examples

Use a template to create your own project: <br>
Client only:  https://github.com/Day8/re-frame-template  <br>
Front and back: http://www.luminusweb.net/

Use these resources: <br>
https://github.com/Day8/re-com
XXX 

### What Of This Romance?

My job is to be a relentless cheerleader for re-frame, right?
The gyrations of my Pom Poms should be tectonic,
but the following quote just makes me smile. It should
be taught in all CompSci courses.

> We begin in admiration and end by organizing our disappointment <br>
> &nbsp;&nbsp;&nbsp; -- Gaston Bachelard (French philosopher)

Of course, it only applies if you get passionate about your technologies.

But, no. Those French Philosophers and their pessimism - ignore him!!
Your love for re-frame will be deep, abiding and enriching.

### Licence

Copyright © 2015 Michael Thompson

Distributed under The MIT License (MIT) - See LICENSE.txt


[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[SPA]:http://en.wikipedia.org/wiki/Single-page_application
[Reagent]:http://reagent-project.github.io/
