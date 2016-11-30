
## Interconnections

Ask a systems theorist, and they'll tell you that a system has **parts** and **interconnections**. 

Human brains tend to focus first on the **parts**, and then, later, the
**interconnections**. 

In the case of re-frame, the dominoes are the parts, so, tick, yes, we have
looked at them first.  So, if the parts are functions, what then of 
the **interconnections**?  What does it mean to talk about **interconnections between functions?**

To answer that question I think we need to rephrase it as:  
how are the domino functions **composed**.  How does `f ∘ g` happen?

At the language level, we know how function composition works. 
A function such as `count` composes like this:  
```clj
(str (count (filter odd?  [1 2 3 4 5])))
```
Clojure's semantics tell us when `count` is called, and with what 
argument, and how the value it computes becomes the arg for a further function. 
We know how data "flows" into and out of the functions.

Sometimes, to show "this data flow", we'd rewrite the code above as: 
```clj
(->>  [1 2 3 4 5]
      (filter odd?)
      count
      str)
``` 
When we arrange our code like this, we talk of "threading" data 
through functions - flowing data through functions.

In pseudo ClojurScript terms, if you squint, you can see the 6 domino cascade like this:
```clj 
(->>  event                 ;; domino 1
     event-handler          ;; 2
     effect-handler         ;; 3
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

## 2 -> 3

Except I lied in the previous section. The router doesn't really look up a single "handler". Insted it looks up an interceptor chain (described later). 

That interceptor chain is a pipeline of functions. The last of them  
 
