## Introduction

This tutorial explains `coeffects`.

It explains what they are, how they are created, how they help, and how 
to manage them in tests. There's an adults-only moment.

## Table Of Contexts



## Coeffects
 
### What Are They?

`coeffects` are the input resources required by an event handler
to perform its computation.  By "resources" I mean "data".

Because the majority of event handlers require only `db` and 
`event`, there's a registration function called `reg-event-db` 
which delivers these two inputs as arguments to an event 
handler, making it easy.

But sometimes an event handler needs other inputs
to perform their computation.  Things like a random number, or a GUID,
or the current datetime. Perhaps it might need access to an in-memory 
DataScript database.


###  An Example  

This handler is obtaining data directly from LocalStore
```clj
(reg-event-fx
   :load-localstore
   (fn [coeffect _]
     (let [val (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <-- Problem
       (assoc db :defaults val))))
```

Because this event handler has directly accessed a resources, it has stopped being 
pure, causing well documented problems to to accrue.

### Let's Fix It Up 

Here's how we'd like to write it. Data should only come from the coeffects argument:
```clj
(reg-event-fx                     ;; using -fx registration
   :load-localstore
   (fn [coeffects event]         ;; 1st argument is coeffects
     (let [val (:local-store coeffects)
           db   (:db coeffects)]  ;; <-- get value from argument
       {:db (assoc db :defaults val))})) ;; returns an effect
```

Problem solved? 

Well, no. We must still arrange for the right LocalStore value to be put  
into coeffects.

### How Are Coeffect Babies Made?

Awkward moment, but it is now time for THAT talk. Err, hurm. When two 
coeffects love each other very much ... no, stop ... it doesn't happen that way. This 
is a G rated framework. Instead ...

Every time an event handler is executed, a new `context` is created, and within that 
`context` is a new `:coeffect` map, which is initially totally empty.  

That pristine `context` value is then threaded through a chain of Interceptors, and sitting 
on the end of chain is the handler, wrapped up as the final interceptor. We know  
this story well from a previous tutorials. 

So it becomes obvious that Interceptors put coeffects in place. Or more specifically, the 
`:before` functions of Interceptors.

### So, Next Step

So now we now tweak our localstore-consuming event handler in one way: 
```clj
(reg-event-fx                     
   :load-localstore
   [ (coeffect :local-store "defaults-key") ]     ;; <-- this is new
   (fn [coeffects event]         
     (let [val (:local-store coeffects)
           db  (:db coeffects)]  
       {:db (assoc db :defaults val))})) 
```

Problem solved? 

Well, no, not yet. What's this `coeffects` function returning and how does it know to load LocalStore.   


### `coeffect` the function 

`coeffect` is a part of re-frame. 

It returns an Interceptor whos `:before` fucntion loads a value into a `context's` `:coeffect`. 

It takes either one or two arguments. The first is always the `id` of the coeffect required (called a `cofx-id`). The 2nd is optional 
addition value.

So in the case above, the `cofx-id` was `:local-store`  and the additional calue was "defaults-key". 
 

### Other Uses of `coeffects`
 
Here's a couple of other examples:

  -  `(coeffects :random-int 10)` 
  -  `(coeffects :guid)`

In a previous tutorial we also learned that `reg-events-db` and `reg-events-fx` 
add Interceptors to front of any chain during registration.  They insert an Interceptor 
called `do-effects`, which ultimately actions effects. 
 
And it turns out that they also add Interceptors which cause the value of `app-db` 
to be placed in `coeffects`.  They do it by adding this to any events Interceptor chain:
```
(coeffects :db)
```

`coeffects` is a function, which takes one parameter, and that's the "coeffects handler"
which will summon the right value. The function returns an Interceptor.

Okay, let me explain that a bit more.  I've gone a bit fast.
 
 
 Notes:
 
  1. `(coeffects {:something value})`  or  `{coeffects :something)` will look up a `cofx` handler for `:something`
  2. An Interceptor is returned from the 
  2. It will call this handler passing in value.
  3. It will take the returned value and add it to the `:coffect` of the context under the 
     key.  

  

So it will come as no surprise to you to learn that it is Interceptors which 
fill `:coeffects` with "necessary inputs". 
 
The `:coeffect`  might start pristine and empty, but it is threaded through the 
`:before` functions of each Interceptor in the chain prior to the handler 
interceptor sitting at the end.
  
But which Interceptors?

We saw in a previous tutorial that both
.  At the time, 
also add another interceptor and it looks like this: 
```
(coeffects :db)
```

So that interceptor is added to every one of your registered event handlers. And it 
adds `:db` to the `coeffect`.

So how does `(coffects :db`)` work?  How could I create my own. 


 


From previous tutorials we are familiar with `reg-event-db` and `reg-event-fx` add 
 their own Interceptors to any chain you provide.  Well, one of the interceptors XXX
 
 
XXXX




specifically a map of data. the inputs required by an event handler. 

At a more pragmatic level, coeffects is a map in `context`


### How 

An Interceptor factory called `coeffect`


### reg-cofx


### Examples

XXX need a random number???




### Testing

It immedaitely becomes harder to test, etc.
   
