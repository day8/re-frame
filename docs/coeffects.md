## Introduction

This tutorial explains `coeffects`.

It explains what they are, how they are created, how they help, and how 
to manage them in tests. There's also an adults-only moment.

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

`coeffects` are the input resources that an event handler requires 
to perform its computation.  By "resources" I mean "data".

Because the majority of event handlers require only `db` and 
`event`, there's a registration function, called `reg-event-db`, 
which delivers these two coeffects as arguments to an event 
handler, making it easy.

But sometimes an event handler needs other inputs
to perform their computation.  Things like a random number, or a GUID,
or the current datetime. It might even need access to a
DataScript connection.


###  An Example

This handler obtains data directly from LocalStore
```clj
(reg-event-fx
   :load-defaults
   (fn [coeffects _]
     (let [val (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <-- Problem
       (assoc db :defaults val))))
```

Because it has accessed LocalStore, this event handler is not 
pure, which will trigger well documented paper cuts. 

### Let's Fix It

Here's how __we'd like to rewrite that handler__. Data should 
only come from the `coeffects` argument:
```clj
(reg-event-fx                     ;; using -fx registration
   :load-defaults
   (fn [coeffects event]         ;; 1st argument is coeffects
     (let [val (:local-store coeffects)  ;; <-- get value from argument
           db   (:db coeffects)]  
       {:db (assoc db :defaults val))})) ;; returns an effect
```

Problem solved? Well, yes, the handler is now pure.  But we have a 
new problem: how do we arrange for the right `:local-store` value 
to be available in `coeffects`.

### How Are Coeffect Babies Made?

Well, when two coeffects love each other very much ... no, stop ... this 
is a G-rated framework. Instead ...

Every time an event handler is executed, a new `context` is created, and within that 
`context` is a new `:coeffect` map, which is initially totally empty.  

That pristine `context` value is then threaded through a chain of Interceptors, and sitting 
on the end of chain is the event handler, wrapped up as the final interceptor. We know  
this story well from a previous tutorial. 

So all members of the Interceptor chain have the opportunity to add to `:coeffects` 
via their `:before` function. 

### So, Next Step

Armed with that mindset, let's add an interceptor to the registration, which 
puts the right  localstore value into coeffect. 

Here's a sketch:   
```clj
(reg-event-fx                     
   :load-defaults
   [ (coeffect :local-store "defaults-key") ]     ;; <-- this is new
   (fn [coeffects event]         
     (let [val (:local-store coeffects)
           db  (:db coeffects)]  
       {:db (assoc db :defaults val))})) 
```

Problem solved? Well, no, but closer. We're assuming a `coeffects` function. How would it work?


### `coeffect` the function 

The `coeffect` function is part of re-frame API. 

It returns an Interceptor whose `:before` function loads a value into a `context's` `:coeffect` map. 

It takes either one or two arguments. The first is always the `id` of the coeffect 
required (called a `cofx-id`). The 2nd is an optional addition value.

So in the case above, the `cofx-id` was `:local-store`  and the additional value was "defaults-key". 

### Other Example Uses of `coeffects` 
 
Here's some other examples of its use:

  -  `(coeffects :random-int 10)` 
  -  `(coeffects :guid)`
  -  `(coeffects :now)`
  
So, if I wanted to,  I could create an event handler which has access to 3 coeffects:
```clj
(reg-event-fx 
    :some-id 
    [(coeffects :random-int 10) (coeffects :now)  (coeffects :local-store "blah")]  ;; 3
    (fn [coeffects _]
       ... in here I can access coeffect's keys :now :local-store and :random-int)) 
```

Creating 3 coeffects is probably just showing off, and not generally necessary.  

And we still have the final piece to put in place. How do we tell this `coeffect` function what to do when  
it is given `:now` or `:random-int` ?

### Meet `reg-cofx`

This function allows you associate a`cofx-id` (like `:now` or `:local-store`) with a handler function.  

The handler function registered for a `cofx-id` will be passed a `:coeffects` map, and it 
is expected to return a modified map, presumably with an added key and value. 

### Examples

You saw above the use of `:now`.  He're is how a `cofx` handler could be registered:
```clj 
(reg-cofx               ;; using this new registration function
   :now                 ;; what cofx-id are we registering
   (fn [coeffects _]    ;; second parameter not used in this case
      (assoc coeffects :now (js.Date.))))   ;; add :now key, with value to coeffects
```

And then there's this example:
```clj 
(reg-cofx               ;; new registration function
   :local-store 
   (fn [coeffects lsk]    ;; second parameter is the local store key
      (assoc coeffects 
             :local-store
             (js->clj (.getItem js/localStorage lsk))))
```


With these two registrations in place, I can now use `(coefect :now)` and 
`(coeffect :local-store "blah")` in an effect handler's inteerceptor chain. 

### The 4 Point Summary

Here is the overall picture, summarised, in note form ...

  1. Event handlers should only source data from their arguments
  2. So we have to "inject" required data into coeffect argument
  3. So we use `(coeffects :key)` interceptor in registration 
  4. There has to be a coefx handler registered for that `:key`
  
XXX should "coeffect" function be called  "inject" ... otherwise there just too many different coeffects 

 
### Secret Interceptors

In a previous tutorial we learned that `reg-events-db` 
and `reg-events-fx` add Interceptors to front of any chain during registration.

We found they inserted an Interceptor called `do-effects`. I can now reveal that 
they also add `(coeffect :db)` at the front of each chain. (Last surprise, I promise) 

Guess what that adds to coeffects? 

### Testing

XXX 


   
