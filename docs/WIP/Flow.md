## Flow

This tutorial focuses mainly on how data flows between dominoes 3-4-5-6.
We'll look at the underlying mechanism reactive mechanism.
 
BUT we'll start by looking at the overall picture ...

## Interconnections

Ask a systems theorist, and they'll tell you that a system has **parts** and **interconnections**. 

Human brains tend to focus first on the **parts**, and then, later, the
**interconnections**.

In the case of re-frame, dominoes are the parts, so, tick, yes, we have
looked at them first.  But, if the parts are functions, what then of 
the **interconnections**?  

What does it even mean to talk about **interconnections between functions?** To answer that question, I'll rephrase it as:  
how are the domino functions **composed**.  How does `f ∘ g` happen?

At the language level, we know how function composition works. 
A function such as `count` composes like this:  
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
through functions. It somehow helps comprehension to frame function composition as a data flow. 

In a similar spirit, you can almost see re-frame 6 domino cascade like this:
```clj 
(->>  event                 ;; domino 1
     event-handler          ;; 2
     effect-handler         ;; 3
     -- app state ---       ;; 
     queries                ;; 4
     view-fns               ;; 5
     React)                 ;; 6
```

Fine. So how, then, does data get threaded through the domino functions of re-frame?
How does data flow out of one function (domino) 
into the next?  What theory of computation is driving this bus?

My first, weak answer is:  how wonderful is it that you don't need to worry about
this too much, re-frame looks
after it for you. It will thread (convey) data from one domino function to the next.
It will call your functions at the right time, with the right (data) arguments.

My second answer is: the method varies from domino to domino. Read on. 

## 1 -> 2

`dispatch` queues events and they are not immediately processed. So event handling is done async.
 
A router reads events from this queue, looks up the right handler and calls it.
xxx 

## 2 -> 3

Except I lied in the previous section. The router doesn't really look up a single "handler". Instead it looks up an interceptor chain (described later). 

That interceptor chain is a pipeline of functions. The last of them  
xxx
 
## 3->4->5->6


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
