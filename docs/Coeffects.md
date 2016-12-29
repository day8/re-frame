## Coeffects

This tutorial explains `coeffects`.

It explains what they are, how they can be "injected", and how 
to manage them in tests.
 
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
### Table Of Contents

* [What Are They?](#what-are-they-)
* [An Example](#an-example)
* [How We Want It](#how-we-want-it)
* [Abracadabra](#abracadabra)
* [Which Interceptors?](#which-interceptors-)
* [`inject-cofx`](#-inject-cofx-)
* [More `inject-cofx`](#more--inject-cofx-)
* [Meet `reg-cofx`](#meet--reg-cofx-)
* [Example Of `reg-cofx`](#example-of--reg-cofx-)
* [Another Example Of `reg-cofx`](#another-example-of--reg-cofx-)
* [Secret Interceptors](#secret-interceptors)
* [Testing](#testing)
* [The 5 Point Summary](#the-5-point-summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
 
### What Are They?

`coeffects` are the data resources that an event handler needs 
to perform its computation.

Because the majority of event handlers only need `db` and 
`event`, there's a specific registration function, called `reg-event-db`, 
which delivers ONLY these two coeffects as arguments to an event 
handler, making this common case easy to program.

But sometimes an event handler needs other data inputs
to perform its computation.  Things like a random number, or a GUID,
or the current datetime. Perhaps it needs access to a
DataScript connection.


###  An Example

This handler obtains data directly from LocalStore:
```clj
(reg-event-db
   :load-defaults
   (fn [db _]
     (let [val (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <-- Problem
       (assoc db :defaults val))))
```

This works, but there's a cost.

Because it has directly accessed LocalStore, this event handler is not 
pure, and impure functions cause well-documented paper cuts.

### How We Want It

Our goal in this tutorial will be to rewrite this event handler so 
that it __only__ uses data from arguments. This will take a few steps.
 
The first is that we switch to
using `reg-event-fx` (instead of `reg-event-db`).

Event handlers registered via `reg-event-fx` are slightly 
different to those registered via `reg-event-db`. `-fx` handlers 
get two arguments, but the first is not `db`. Instead it 
is an argument which we will call `cofx` (that's a nice distinct 
name which will aid communication). 

Previous tutorials showed there's a `:db` key in `cofx`.  We 
now want `cofx` to have other keys and values, like this: 
```clj
(reg-event-fx                     ;; note: -fx 
   :load-defaults
   (fn [cofx event]                 ;; cofx means coeffects
     (let [val (:local-store cofx)  ;; <-- get data from cofx
           db  (:db cofx)]          ;; <-- more data from cofx
       {:db (assoc db :defaults val))})) ;; returns an effect
```

Notice how `cofx` magically contains a `:local-store` key with the 
right value. Nice! But how do we make this magic happen? 
 
### Abracadabra 

Each time an event handler is executed, a brand new `context` 
is created, and within that `context` is a brand new `:coeffects` 
map, which is initially totally empty.

That pristine `context` value (containing a pristine `:coeffects` map) is threaded 
through a chain of Interceptors before it finally reaches our event handler,
sitting on the end of a chain, itself wrapped up in an interceptor. We know  
this story well from a previous tutorial. 

So, all members of the Interceptor chain have the opportunity to add to `:coeffects` 
via their `:before` function.  This is where `:coeffects` magic happens. This is how 
new keys can be added to `:coeffects`, so that later our event handler magically finds the 
right data (like `:local-store`) in its `cofx` argument. It is the Interceptors.

### Which Interceptors?

If Interceptors put data in `:coeffects`, then we'll need to add the right ones
when we register our event handler. 

Something like this (this handler is the same as before, except for one detail):    
```clj
(reg-event-fx                     
   :load-defaults
   [ (inject-cofx :local-store "defaults-key") ]     ;; <-- this is new
   (fn [cofx event]         
     (let [val (:local-store cofx)
           db  (:db cofx)]  
       {:db (assoc db :defaults val))})) 
```

Look at that - my event handler has a new Interceptor!  It is injecting the 
right key/value pair (`:local-store`)
into `context's` `:coeffeects`, which itself then goes on to be the first argument 
to our event handler (`cofx`).

### `inject-cofx`

`inject-cofx` is part of the re-frame API.

It is a function which returns an Interceptor whose `:before` function loads 
a key/value pair into a `context's` `:coeffects` map.
 
`inject-cofx` takes either one or two arguments. The first is always the `id` of the coeffect 
required (called a `cofx-id`). The 2nd is an optional addition value. 

So, in the case above, the `cofx-id` was `:local-store`  and the additional value 
was "defaults-key" which was presumably the LocalStore key. 

### More `inject-cofx` 
 
Here's some other usage examples:

  -  `(inject-cofx :random-int 10)` 
  -  `(inject-cofx :guid)`
  -  `(inject-cofx :now)`
  
I could create an event handler which has access to 3 coeffects:
```clj
(reg-event-fx 
    :some-id 
    [(inject-cofx :random-int 10) (inject-cofx :now)  (inject-cofx :local-store "blah")]  ;; 3
    (fn [cofx _]
       ... in here I can access cofx's keys :now :local-store and :random-int)) 
```

But that's probably just greedy, and not very useful.   

And so, to the final piece in the puzzle: how does `inject-cofx` 
know what to do when it is given `:now` or `:local-store`? 
Each `cofx-id` requires a different action.

### Meet `reg-cofx`

This function is also part of the re-frame API.

It allows you to associate a `cofx-id` (like `:now` or `:local-store`) with a 
handler function that injects the right key/value pair.

The function you register will be passed two arguments:
  - a `:coeffects` map (to which it should add a key/value pair), and 
  - optionally, the additional value supplied to `inject-cofx`
and it is expected to return a modified `:coeffects` map.

### Example Of `reg-cofx`

Above, we wrote an event handler that wanted `:now` data to be available.  Here 
is how a handler could be registered for `:now`:
```clj 
(reg-cofx               ;; registration function
   :now                 ;; what cofx-id are we registering
   (fn [coeffects _]    ;; second parameter not used in this case
      (assoc coeffects :now (js.Date.))))   ;; add :now key, with value
```

The outcome is:    
  1. because that cofx handler above is now registered for `:now`, I can 
  2. add an Interceptor to an event handler which 
  3. looks like `(inject-cofx :now)`
  4. which means within that event handler I can access a `:now` value from `cofx`

As a result, my event handler is pure.

### Another Example Of `reg-cofx`

This: 
```clj 
(reg-cofx               ;; new registration function
   :local-store 
   (fn [coeffects local-store-key]
      (assoc coeffects 
             :local-store
             (js->clj (.getItem js/localStorage local-store-key)))))
```


With these two registrations in place, I could now use both `(inject-cofx :now)` and 
`(inject-cofx :local-store "blah")` in an event handler's interceptor chain. 

To put this another way:  I can't use `(inject-cofx :blah)` UNLESS I have previously 
used `reg-cofx` to register a handler for `:blah`. Otherwise `inject-cofx` doesn't 
know how to inject a `:blah`. 
 
### Secret Interceptors

In a previous tutorial we learned that `reg-events-db` 
and `reg-events-fx` add Interceptors to the front of any chain 
during registration. We found they inserted an Interceptor called `do-fx`. 

I can now reveal that 
they also add `(inject-cofx :db)` at the front of each chain.

Guess what that injects into the `:coeffects` of every event handler? This is how `:db`
is always available to event handlers. 

Okay, so that was the last surprise. Now you know everything.

If ever you wanted to use DataScript, instead of an atom-containing-a-map
like `app-db`, you'd replace `reg-event-db` and `reg-event-fx` with your own
registration functions and have them auto insert the DataScript connection.


### Testing

During testing, you may want to stub out certain coeffects.

You may, for example, want to test that an event handler works 
using a specific `now`, not a true random number. 

In your test, you'd mock out the cofx handler:
```clj
(reg-cofx
   :now
   (fn [coeffects _]
      (assoc coeffects :now (js/Date. 2016 1 1)))   ;; now was then
```

If your test does alter registered coeffect handlers, and you are using `cljs.test`,
then you can use a `fixture` to restore all coeffects at the end of your test: 
```clj
(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)]
    {:before #(reset! restore-re-frame (re-frame.core/make-restore-fn))
     :after  #(@restore-re-frame)}))

(use-fixtures :each (fixture-re-frame))
```

`re-frame.core/make-restore-fn` creates a checkpoint for re-frame state (including 
registered handlers) to which you can return. 

### The 5 Point Summary

In note form:

  1. Event handlers should only source data from their arguments
  2. We want to "inject" required data into the first, cofx argument
  3. We use the `(inject-cofx :key)` interceptor in registration of the event handler
  4. It will look up the registered cofx handler for that `:key` to do the injection
  5. We must have previously registered a cofx handler via `reg-cofx`
  
   
***

Previous:  [Effects](Effects.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Infographic](SubscriptionInfographic.md)
