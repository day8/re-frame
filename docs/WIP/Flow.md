## Flow

This tutorial focuses mainly on how data flows between dominoes 3-4-5-6.
We'll look at the underlying reactive mechanism.
 
BUT we'll start by looking at the overall picture ...

## Interconnections

Ask a Systems Theorist, and they'll tell you that a system has **parts** and **interconnections**. 

Human brains tend to focus first on **parts**, and then, later,
**interconnections**. But we Software Architect might focus on
the interconnections earlier because they're so often critical to an understanding of the system. 
"Focus on the lines between the boxes" we might lecture anyone kind enough to listen. 

In the case of re-frame, dominoes are the **parts**, so, tick, yes, we have
looked at them first. So, I hope your brain is happy. But, let's now 
indulge our inner Systems Architect and think more about **interconnections**.

So, if the **parts** are functions, what then are 
the **interconnections**?

What does it even mean to talk about **interconnections between functions?** 
To answer that question, I'll rephrase it as:  
how are the domino functions **composed**?

At the language level, 
Uncle Alonzo and Uncle John say a function such as `count` composes like this:  
```clj
(str (count (filter odd?  [1 2 3 4 5])))
```
Clojure's semantics tell us when `count` is called, and with what 
argument, and how the value it computes becomes the arg for a further function. 
We know how data "flows" into and out of the functions.

Sometimes, we'd rewrite the code above as: 
```clj
(->>  [1 2 3 4 5]
      (filter odd?)
      count
      str)
```
When we arrange our code like this, we talk of "threading" data 
through functions. **It seems to help our comprehension to frame function 
composition in terms of data flow**.

re-frame delivers architecture 
by supplying the interconnections - it threads the data - it lives in the gaps.

But there's no one method of threading. The flow varies from one domino neighbour pair to the next. One time it is a queue, 
another a pipeline, and along the 3-4-5-6 axis there's a reactive signal graph. 

Fine. So how, then, does data get threaded through the domino functions of re-frame?
How does data flow out of one function (domino) 
into the next?  What theory of computation is driving this bus?

My first, weak answer is:  how wonderful is it that you don't need to worry about
this too much, re-frame looks
after it for you. It will thread (convey) data from one domino function to the next.
It will call your functions at the right time, with the right (data) arguments.

My second, equally unsatisfactory answer is: the method/transport varies 
from one domino pair to the next.  There's no one method. You'll need to read the further docs on "Flow". 

At this point, my goal was to start you thinking about "the lines between the boxes". That's where re-frame lives. 

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

