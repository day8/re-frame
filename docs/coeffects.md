## Introduction

This tutorial explains `coeffects`.

It explains what they are, how they help, how they can be "injected", and how 
to manage them in tests.

## Table Of Contexts
 
- [Introduction](#introduction)
- [Table Of Contexts](#table-of-contexts)
- [Coeffects](#coeffects)
  * [What Are They?](#what-are-they-)
  * [An Example](#an-example)
  * [Let's Fix It](#let-s-fix-it)
  * [How Are Coeffect Babies Made?](#how-are-coeffect-babies-made-)
  * [So, Next Step](#so--next-step)
  * [`coeffect` the function](#-coeffect--the-function)
  * [Other Example Uses of `coeffects`](#other-example-uses-of--coeffects-)
  * [Meet `reg-cofx`](#meet--reg-cofx-)
  * [Examples](#examples)
  * [The 4 Point Summary](#the-4-point-summary)
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

This handler obtains data directly from LocalStore
```clj
(reg-event-db
   :load-defaults
   (fn [coeffects _]
     (let [val (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <-- Problem
       (assoc db :defaults val))))
```

Because it has accessed LocalStore, this event handler is not 
pure, and impure functions cause well-documented paper cuts. 

### How We Want It

Our goal in this tutorial is to rewrite this event handler so 
that data _only_ comes from the arguments. 
 
Our first change is to start using `reg-event-fx`  (instead of 
`reg-event-db`).  

Then we'll seek to have ALL the necessary extra data available in the 
first argument, typically called `coeffects`.  

Previous tutorials have show us that we can obtain `:db` from 
`coeffects`.  Well, not we want it to contain other useful data too. 
```clj
(reg-event-fx                     ;; note: -fx 
   :load-defaults
   (fn [cofx event]                 ;; cofx means coeffects
     (let [val (:local-store cofx)  ;; <-- get data from cofx
           db  (:db cofx)]          ;; <-- more data from cofx
       {:db (assoc db :defaults val))})) ;; returns an effect
```

If we can find a way to achieve this, then we are back to 
writing pure event handlers. 

But what must we do to data into cofx?  How do we organise for it 
to contain a `:local-store` key, with the right value? 
 
### How Are Coeffect Babies Made?

Well, when two coeffects love each other very much ... no, stop ... this 
is a G-rated framework. Instead ...

Each time an event handler is executed, a brand new `context` is created, and within that 
`context` is a brand new `:coeffect` map, which is initially totally empty.  

That pristine `context` value (containing a pristine `:coeffect` map) is then threaded 
through a chain of Interceptors before it is finally handled to our event handler
which will be sitting on the end of chain, itself wrapped up in an interceptor. We know  
this story well from a previous tutorial. 

So, all members of the Interceptor chain have the opportunity to add to `:coeffects` 
via their `:before` function.  This is where `:coeffect` gets made.  This is where 
new keys are added to `:coeffect`, so that later our handler magically finds the 
right data in its parameter.

### So, Next Step

If Interceptors put data in `:coeffect`, then we'd better put the right ones on 
our handler when we register it. 

This handler is the same as before, except for one addition:    
```clj
(reg-event-fx                     
   :load-defaults
   [ (inject-cofx :local-store "defaults-key") ]     ;; <-- this is new
   (fn [cofx event]         
     (let [val (:local-store cofx)
           db  (:db cofx)]  
       {:db (assoc db :defaults val))})) 
```

So we've added one Interceptor. It will inject the right value into `context's` `:coeffeects`
and that `:coeffects` ends up being the first parameter to our handler. 


### `inject-cofx`

`inject-cofx` is part of re-frame API. 

It is a function which returns an Interceptor whose `:before` function loads 
a value into a `context's` `:coeffect` map.
 

`inject-cofx` takes either one or two arguments. The first is always the `id` of the coeffect 
required (called a `cofx-id`). The 2nd is an optional addition value. 
.

So, in the case above, the `cofx-id` was `:local-store`  and the additional value 
was "defaults-key" which was presumable the place to look in LocalStore 

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

Creating 3 coeffects for the one handler is probably just showing off, and not generally necessary.  

And so to the final piece in the puzzle.  How does `inject-cofx` know what to do when 
it is given `:now` or `:local-store` ? Each `cofx-id` requires a different action.

### Meet `reg-cofx`

This function allows you associate a`cofx-id` (like `:now` or `:local-store`) with a 
handler function that you supply.   

The handler function you register for a given `cofx-id` will be passed two arguments:
  - a `:coeffects` map, and 
  - the optional value supplied
and it is expected to return a modified `:coeffects` map, presumably with an 
added key and value. 

### Examples

Above we wrote an event handler that wanted `:now` data to be available.  Here 
is how a handler could be registered for `:now`:
```clj 
(reg-cofx               ;; using this new registration function
   :now                 ;; what cofx-id are we registering
   (fn [cofx _]    ;; second parameter not used in this case
      (assoc cofx :now (js.Date.))))   ;; add :now key, with value
```

And then there's this example:
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

### The 4 Point Summary

Here's the overall picture, summarised, in note form ...

  1. Event handlers should only source data from their arguments
  2. So we have to "inject" required data into coeffect argument
  3. So we use `(inject-cofx :key)` interceptor in registration of the event handler
  4. There has to be a coefx handler registered for that `:key`  (using `reg-cofx`)
  
 
### Secret Interceptors

In a previous tutorial we learned that `reg-events-db` 
and `reg-events-fx` add Interceptors to front of any chain during registration.

We found they inserted an Interceptor called `do-fx`. I can now reveal that 
they also add `(inject-cofx :db)` at the front of each chain. (Last surprise, I promise) 

Guess what that adds to the `:coeffects` of every event handler?   

### Testing

During testing, you may want to stub out certain 


   
