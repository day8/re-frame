<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Flow](#flow)
- [1 -> 2](#1---2)
- [2 -> 3](#2---3)
- [3->4->5->6](#3-4-5-6)
- [On Flow](#on-flow)
  - [How Flow Happens In Reagent](#how-flow-happens-in-reagent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Flow

It is time to talk of the reactive flow through dominoes 4-5-6. through dominoes It is time to talk about de-duplicated signal graphs. 


This tutorial focuses mainly on how data flows between dominoes 3-4-5-6.
We'll look at the underlying reactive mechanism.
 
BUT we'll start by looking at the overall picture ...


## Interconnections

Ask a Systems Theorist, and they'll tell you that a system has **parts** and **interconnections**. 

Human brains tend to focus first on the **parts**, and then, later, maybe on
**interconnections**. But we know better, right? We 
know interconnections are often critical to a system.
"Focus on the lines between the boxes" we lecture anyone kind enough to listen (in my case, glassy-eyed family members).

In the case of re-frame, dominoes are the **parts**, so, tick, yes, we have
looked at them first. Our brains are happy. But what about the **interconnections**?

If the **parts** are functions, what does it even mean to talk about **interconnections between functions?** 
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

But re-frame has no universal method for this. The technique it uses varies from one domino neighbour 
pair to the next. 

## Between 1 and 2

There's a queue. 

When you `dispatch` an event, it is put into a FIFO queue to be processed "vey soon". 

It is important to the design of re-frame that event processing is async. 

On the end of the queue, is a `router` which (very soon) will:
 - pick up events one after the other
 - for each, it extracts `kind` of event (first element of the event vector)
 - for each, it looks up the associated event handler and called it
  
 
## Between 2 and 3

I lied above.

I said the `router` called the event handler associated with an event.  This is a 
useful simplification but we'll see in future tutorials that there's more going on.

I'll wave my hands about now and give you a sense of the real story. 

Instead of there being a single handler function, there's actually a pipeline of functions which 
we call an interceptor chain. 

This pipeline manages three things things:
  - it prepares the `coeffect` for the event handler (the set of inputs required by the handler)
  - it calls the handlerevent 
  - it handles the `effects` produced by the 
 

The router actually looks up the associated "interceptor chain", which happens to have the handler wrapped on the end. 

And then it processes the interceptor chain. Which is to say it calls a 


There's 
 - calls the handler , looks at their first , looks at their 
first element, and runs the associated 

Between 1 and 2 it is a queue & router, 
between 2 and 3 it is an interceptor pipeline, and along the 3-4-5-6 domino axis there's a reactive signal graph.  The right 
tool for the job in each case, I'd argue.

While interconnections are critical to how **re-frame works**, 
you can happily **use re-frame** for a long time and be mostly ignorant of their details.

Which is a good thing - back we go to happy brains focusing on the **parts**.



## 1 -> 2

`dispatch` queues events and they are not immediately processed. Event handling is done async.
 
A router reads events from this queue, looks up the associated handler and calls it.

## 2 -> 3

Except I lied in the previous section. The router doesn't really look 
up a single "handler". Instead it looks up an interceptor chain. The method by which 
an Interceptor chain is executed is discussed in great detail shortly. 
 
 
## 3->4->5->6

So now we are at the meat and potatoes. The real subject of this tutorial. 

## On Flow

Arguments from authority ...

> Everything flows, nothing stands still.   (Panta rhei)

> No man ever steps in the same river twice for it's not the same river and he's not the same man.

[Heraclitus 500 BC](http://en.wikiquote.org/wiki/Heraclitus). Who, being Greek, had never seen a frozen river. [alt version](http://farm6.static.flickr.com/5213/5477602206_ecb78559ed.jpg).


> Think of an experience from your childhood. Something you remember clearly, something you can see,
feel, maybe even smell, as if you were really there. After all you really were there at the time,
weren’t you? How else could you remember it? But here is the bombshell: you weren’t there. Not a
single atom that is in your body today was there when that event took place .... Matter flows
from place to place and momentarily comes together to be you. Whatever you are, therefore, you
are not the stuff of which you are made. If that does not make the hair stand up on the back of
your neck, read it again until it does, because it is important.

Steve Grand


### How Flow Happens In Reagent

To implement a reactive flow, Reagent provides a `ratom` and a `reaction`.
re-frame uses both of these
building blocks, so let's now make sure we understand them.

`ratoms` behave just like normal ClojureScript atoms. You can `swap!` and `reset!` them, `watch` them, etc.

From a ClojureScript perspective, the purpose of an atom is to hold mutable data.  From a re-frame
perspective, we'll tweak that paradigm slightly and **view a `ratom` as having a value that
changes over time.**  Seems like a subtle distinction, I know, but because of it, re-frame sees a
`ratom` as a Signal. [Pause and read this](http://elm-lang.org:1234/guide/reactivity).

The 2nd building block, `reaction`, acts a bit like a function. It's a macro which wraps some
`computation` (a block of code) and returns a `ratom` holding the result of that `computation`.

The magic thing about a `reaction` is that the `computation` it wraps will be automatically
re-run  whenever 'its inputs' change, producing a new output (return) value.

Eh, how?

Well, the `computation` is just a block of code, and if that code dereferences one or
more `ratoms`, it will be automatically re-run (recomputing a new return value) whenever any
of these dereferenced `ratoms` change.

To put that yet another way, a `reaction` detects a `computation's` input Signals (aka input `ratoms`)
and it will `watch` them, and when, later, it detects a change in one of them,  it will re-run that
computation, and it will `reset!` the new result of that computation into the `ratom` originally returned.

So, the `ratom` returned by a `reaction` is itself a Signal. Its value will change over time when
the `computation` is re-run.

So, via the interplay between `ratoms` and `reactions`,  values 'flow' into computations and out
again, and then into further computations, etc.  "Values" flow (propagate) through the Signal graph.

But this Signal graph must be without cycles, because cycles cause mayhem!  re-frame achieves
a unidirectional flow.

Right, so that was a lot of words. Some code to clarify:

```Clojure
(ns example1
 (:require-macros [reagent.ratom :refer [reaction]])  ;; reaction is a macro
 (:require        [reagent.core  :as    reagent]))

(def app-db  (reagent/atom {:a 1}))           ;; our root ratom  (signal)

(def ratom2  (reaction {:b (:a @app-db)}))    ;; reaction wraps a computation, returns a signal
(def ratom3  (reaction (condp = (:b @ratom2)  ;; reaction wraps another computation
                             0 "World"
                             1 "Hello")))

;; Notice that both computations above involve de-referencing a ratom:
;;   - app-db in one case
;;   - ratom2 in the other
;; Notice that both reactions above return a ratom.
;; Those returned ratoms hold the (time varying) value of the computations.

(println @ratom2)    ;; ==>  {:b 1}       ;; a computed result, involving @app-db
(println @ratom3)    ;; ==> "Hello"       ;; a computed result, involving @ratom2

(reset!  app-db  {:a 0})       ;; this change to app-db, triggers re-computation
                               ;; of ratom2
                               ;; which, in turn, causes a re-computation of ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is result of {:b (:a @app-db)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
```

So, in FRP-ish terms, a `reaction` will produce a "stream" of values over time (it is a Signal),
accessible via the `ratom` it returns.


Okay, that was all important background information for what is to follow. 

