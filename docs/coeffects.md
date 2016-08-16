## Introduction

This tutorial explains `coeffects`.

It explains what they are, how they help, how they can be "injected", and how 
to manage them in tests.

## Table Of Contexts
 
  * [What Are They?](#what-are-they-)
  * [An Example](#an-example)
  * [How We Want It](#how-we-want-it)
  * [Abracadabra](#abracadabra)
  * [Which Interceptors?](#which-interceptors-)
  * [`inject-cofx`](#-inject-cofx-)
  * [More `inject-cofx`](#more--inject-cofx-)
  * [Meet `reg-cofx`](#meet--reg-cofx-)
  * [Examples](#examples)
  * [The 5 Point Summary](#the-5-point-summary)
  * [Secret Interceptors](#secret-interceptors)
  * [Testing](#testing)

## Coeffects
 
### What Are They?

`coeffects` are the data resources that an event handler needs 
to perform its computation.

Because the majority of event handlers only need `db` and 
`event`, there's a specific registration function, called `reg-event-db`, 
which delivers these two coeffects as arguments to an event 
handler, making this common case easy to program.

But sometimes an event handler needs other data inputs
to perform its computation.  Things like a random number, or a GUID,
or the current datetime. It might even need access to a
DataScript connection.


###  An Example

This handler obtains data directly from LocalStore:
```clj
(reg-event-db
   :load-defaults
   (fn [coeffects _]
     (let [val (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <-- Problem
       (assoc db :defaults val))))
```

Because it has directly accessed LocalStore, this event handler is not 
pure, and impure functions cause well-documented paper cuts. 

### How We Want It

Our goal in this tutorial is to rewrite this event handler so 
that data _only_ comes from the arguments.
 
To make this happen, our first change is to switch to
using `reg-event-fx` (instead of `reg-event-db`).

Event handlers registered via `reg-event-fx` are slightly 
different to those registered via `reg-event-fx`. `-fx` handlers 
get two arguments, but the first is not `db`. Instead it is an argument which, in 
this tutorial,  we will call `cofx` (that's a nice distinct name which will aid communication). 

Previous tutorials have show us that we can obtain `:db` from 
`cofx`.  Well, in addition we now want it to contain other useful data too. 
```clj
(reg-event-fx                     ;; note: -fx 
   :load-defaults
   (fn [cofx event]                 ;; cofx means coeffects
     (let [val (:local-store cofx)  ;; <-- get data from cofx
           db  (:db cofx)]          ;; <-- more data from cofx
       {:db (assoc db :defaults val))})) ;; returns an effect
```

Notice how `cofx` magically contains a `:local-store` key with the 
right value.  How do we organise for this magic to happen? 
 
### Abracadabra 

Each time an event handler is executed, a brand new `context` is created, and within that 
`context` is a brand new `:coeffect` map, which is initially totally empty.

That pristine `context` value (containing a pristine `:coeffect` map) is then threaded 
through a chain of Interceptors before it is finally handled to our event handler,
sitting on the end of a chain, itself wrapped up in an interceptor. We know  
this story well from a previous tutorial. 

So, all members of the Interceptor chain have the opportunity to add to `:coeffects` 
via their `:before` function.  This is where `:coeffect` magic happens. This is where 
new keys can be added to `:coeffect`, so that later our handler magically finds the 
right data (like `:local-store`) in its `cofx` argument.

### Which Interceptors?

If Interceptors put data in `:coeffect`, then we'll need to add the right ones to 
our event handler when we register it. 

Something like this (this handler is the same as before, except for one addition):    
```clj
(reg-event-fx                     
   :load-defaults
   [ (inject-cofx :local-store "defaults-key") ]     ;; <-- this is new
   (fn [cofx event]         
     (let [val (:local-store cofx)
           db  (:db cofx)]  
       {:db (assoc db :defaults val))})) 
```

So we've added one Interceptor and it will do the magic. It will inject the right 
value into `context's` `:coeffeects` which then goes on to be the first argument 
to our event handler (`cofx`) 


### `inject-cofx`

`inject-cofx` is part of re-frame API. 

It is a function which returns an Interceptor whose `:before` function loads 
a value into a `context's` `:coeffect` map.
 
`inject-cofx` takes either one or two arguments. The first is always the `id` of the coeffect 
required (called a `cofx-id`). The 2nd is an optional addition value. 

So, in the case above, the `cofx-id` was `:local-store`  and the additional value 
was "defaults-key" which was presumably the LocalStore key. 

### More `inject-cofx` 
 
Here's some other examples of its use:

  -  `(inject-cofx :random-int 10)` 
  -  `(inject-cofx :guid)`
  -  `(inject-cofx :now)`
  
So, if I wanted to,  I could create an event handler which has access to 3 coeffects:
```clj
(reg-event-fx 
    :some-id 
    [(inject-cofx :random-int 10) (inject-cofx :now)  (inject-cofx :local-store "blah")]  ;; 3
    (fn [cofx _]
       ... in here I can access cofx's keys :now :local-store and :random-int)) 
```

Adding 3 coeffects for the one handler is probably just showing off, and not generally necessary.  

And so, the final piece in the puzzle: how does `inject-cofx` know what to do when 
it is given `:now` or `:local-store` ? Each `cofx-id` requires a different action.

### Meet `reg-cofx`

Allows you associate a`cofx-id` (like `:now` or `:local-store`) with a 
handler function that injects the right data.    

The function you register will be passed two arguments:
  - a `:coeffects` map, and 
  - optionally, the additional value supplied
and it is expected to return a modified `:coeffects` map, presumably with an 
added key and value. 

### Examples

Above we wrote an event handler that wanted `:now` data to be available.  Here 
is how a handler could be registered for `:now`:
```clj 
(reg-cofx               ;; uses this new registration function
   :now                 ;; what cofx-id are we registering
   (fn [coeffects _]    ;; second parameter not used in this case
      (assoc coeffects :now (js.Date.))))   ;; add :now key, with value
```

And there's this example:
```clj 
(reg-cofx               ;; new registration function
   :local-store 
   (fn [coeffects local-store-key]
      (assoc coeffects 
             :local-store
             (js->clj (.getItem js/localStorage local-store-key))))
```


With these two registrations in place, I can now use `(inject-cofx :now)` and 
`(inject-cofx :local-store "blah")` in an effect handler's interceptor chain. 

### The 5 Point Summary

In note form:

  1. Event handlers should only source data from their arguments
  2. We want to "inject" required data into the first, cofx argument
  3. We use the `(inject-cofx :key)` interceptor in registration of the event handler
  4. It will the registered cofx handler for that `:key` to do the injection
  5. We must have previously registered a cofx handler via `reg-cofx`
  
 
### Secret Interceptors

In a previous tutorial we learned that `reg-events-db` 
and `reg-events-fx` add Interceptors to front of any chain during registration.

We found they inserted an Interceptor called `do-fx`. I can now reveal that 
they also add `(inject-cofx :db)` at the front of each chain.

Guess what that injects into the `:coeffects` of every event handler?

Okay, so that was the last surprise. Now you know everything.  Hopefully 
the pizzle pieces fit nicely together   

### Testing

During testing, you may want to stub out certain coeffets.

You may, for example, want to test that an event handler works 
using a specific `random number`.  


   
