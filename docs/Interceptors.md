## Introduction 

This is an interceptors tutorial 

## Table Of Contents

- [Introduction](#introduction)
- [Table Of Contents](#table-of-contents)
- [Interceptors](#interceptors)
  * [Why Interceptors?](#why-interceptors-)
  * [What Do Interceptors Do?](#what-do-interceptors-do-)
  * [Wait, I know That Pattern!](#wait--i-know-that-pattern-)
  * [What's In The Pipeline?](#what-s-in-the-pipeline-)
  * [Show Me](#show-me)
  * [Handlers Are Interceptors Too](#handlers-are-interceptors-too)
- [Executing A Chain](#executing-a-chain)
  * [The Links](#the-links)
  * [What Is Context?](#what-is-context-)
  * [Self Modifing](#self-modifing)
  * [Credit](#credit)
  * [Write An Interceptor](#write-an-interceptor)
  * [Wrapping Handlers](#wrapping-handlers)
- [Summary](#summary)
- [Appendix](#appendix)
  * [The Builtin Interceptors](#the-builtin-interceptors)

## Interceptors
### Why Interceptors?

Two reasons.

__First__, we want simple event handlers.  

Interceptors can look after "cross-cutting" concerns like undo, tracing and validation. 
They help us to factor out commonality, hide complexity and introduce further steps into the "Derived Data, 
Flowing" story promoted by re-frame. 

So, you'll want to use Interceptors - they're helpful.

__Second__, under the covers, Interceptors are the means by which 
event handlers are executed (when you `dispatch`).  You'll 
want to understand how that happens. 

### What Do Interceptors Do?

They wrap. 

Specifically, they wrap event handlers. 

Imagine your event handler is like a piece of ham. An interceptor would be
like bread either side of your ham, which makes a sandwich.

And two Interceptors, in a chain, would be like you put another 
pair of bread slices around the outside of the existing sandwich to make 
a sandwich of the sandwich. Now it is a very thick sandwich. 

Interceptors wrap on both sides of a handler, layer after layer.

### Wait, I know That Pattern!

Interceptors implement middleware.  But differently.

Traditional middleware - often seen in web servers - creates a data 
processing pipeline via the nested composition of higher order functions. 
The result is a "stack" of functions. Data flows through this pipeline, 
first forwards from one end to the other, and then backwards.

Interceptors achieve the same outcome by assembling functions, as data, 
in a collection (a chain, rather than a stack). Data can then be iteratively
pipelined, first forwards through the functions in the chain, 
and then backwards along the same chain. 

Because the interceptor pipeline is composed via data, rather than 
higher order functions, it is a more flexible arrangement.  

### What's In The Pipeline?

Data. It flows through the pipeline being progressively transformed. 

Fine. But what data?

With a web server, the middleware "stack" progressively 
transforms a `request` in one direction, and, then in the backwards 
sweep, it progressively produces a `response`. 

In re-frame, the forwards sweep progressively creates the `coeffects` 
(inputs to the handler), while the backwards sweep processes the `effects`
(outputs from the handler).  

I'll pause while you read that sentence again. That's the key 
concept, right there. 

### Show Me

You can provide a chain of interceptors when 
you register an event handler.
 
Using a 3-arity registration function:
```clj 
(reg-event-db          
   :some-id
   [in1 in2]       ;; <--- a chain of 2 interceptors  
   (fn [db v]      ;; <-- the handler here, as before
      ....)))
```

> Each Event Handler can have its own tailored interceptor chain, provided at registration-time. 

### Handlers Are Interceptors Too

You might see that registration above as associating `:some-id` with two things: (1) a chain of interceptors 
and (2) a handler.  
 
Except, the handler is turned into an interceptor too.  (We'll see how later) 
 
So `:some-id` is only associated with one thing: a 3-chain of interceptors, 
with the handler wrapped in an interceptor and put on the end of the other two.  
 
Except, the registration function itself, `reg-event-db`, actually takes this 3-chain 
and inserts its own interceptors 
(which do useful things) at the front (more on this soon too), 
so ACTUALLY, there's about 5 interceptors in the chain.

So, ultimately, that event registration associates the event id `some-id` 
with a chain of interceptors.
 
Later, when a `dispatch` for `:some-id` is done, that 5-chain of 
interceptors will be "executed".  And that's how events get handled. 


## Executing A Chain

### The Links

Each interceptor has this form:
```clj
{:id      :something             ;; decorative only
 :before  (fn [context] ...)     ;; returns possibly modified context
 :after   (fn [context] ...)}    ;; `identity` would be a noop
```

That's essentially a map of two functions. Now imagine a vector of these maps - that's an  
an interceptor chain.

To "execute" an interceptor chain:
  1. create a `context` (a map, described below)
  2. iterate forwards over the chain, calling the `:before` function on each interceptor
  3. iterate over the chain in the opposite direction calling the `:after` function on each interceptor

Remember that the last interceptor in the chain is the handler itself (wrapped up to be the `:before`).

That's it. That's how an event gets handled.


### What Is Context?

Some data called a `context` is threaded through all the calls. 

This value is passed as the argument to every `:before` and `:after` 
function and they returned it, possibly modified. 

A `context` is a map with this structure: 
```clj
{:coeffects {:event [:some-id :some-param]
             :db    <original contents of app-db>}
             
 :effects   {:db    <new value for app-db>
             :dispatch  [:an-event-id :param1]}
             
 :queue     <a collection of further interceptors>
 :stack     <a collection of interceptors already walked>}
```

`context` has `:coeffects` and `:effects` which, if this was a web
server, would be somewhat analogous to `request` and `response`
respectively.

`:coeffects` will contain the inputs required by the event handler
(sitting presumably on the end of the chain). So that's 
data like the `:event` being processed, and the initial state of `db`. These are .

The handler-returned side effects are put into `:effects` including, 
but not limited to, new values for `db`.

The first few interceptors in a chain (inserted by `reg-event-db`) 
have `:before` functions which __prime__ the `:coeffects`
by adding in `:event`, and `:db`.  Of course, other interceptors can
add further to `:coeffect`.  Perhaps the event handler needs
data from localstore, or a random number, or a 
DataScript connection. Interceptors can build up the coeffect, via their 
`:before`. 

Equally, some interceptors in the chain will have `:after` functions
which process the side effects accumulated into `:effects`
including but, not limited to, updates to app-db.

### Self Modifing

Through both stages (before and after), `context` contains a `:queue`
of interceptors yet to be processed, and a `:stack` of interceptors
already done.

In advanced cases, these values can be modified by the Interceptor
functions through which the `context` is threaded. 

What I'm saying is that interceptors can be dynamically added 
and removed from the `:queue` by existing Interceptors. 

### Credit

> All truths are easy to understand once they are discovered <br>
>   -- Galileo Galilei

This elegant and flexible arrangement was originally 
designed by the talented 
[Pedestal Team](https://github.com/pedestal/pedestal/blob/master/guides/documentation/service-interceptors.md). Thanks! 

### Write An Interceptor

Dunno about you, but I'm easily offended by underscores.

If our components did this: 
```clj
(dispatch [:delete-item 42])
```

We'd have to write this handler: 
```clj
(def-event-db 
  :delete-item
  (fn 
     [db [_  key-to-delete]]     ;;  <---- Arrgggghhh underscore
     (dissoc db key-to-delete)))
```

Do you see it there? In the event destructing!!! Almost mocking us with that
passive aggressive, understated thing it has going on!! Co-workers
have said I'm "being overly sensitive", perhaps even horizontalist, but 
you can see it, right?  Of course you can.

Let's remove the need for it.  We'll write an interceptor: `trim-event`

Once we have written `trim-event`, our registration will change to look like this:
```clj
(def-event-db 
  :delete-item
  [trim-event]                ;;  <--- interceptor added
  (fn 
     [db [key-to-delete]]     ;;  <--- no leading underscore necessary
     (dissoc db key-to-delete)))
```

`trim-event` will need to change the `:coeffects` (of `context`).  More specifically, it will be 
changing the `:event` value within the `:coeffects`. 

`:event` will start off as `[:delete-item 42]`, but will end up `[42]`.  `trim-event`  will remove that 
leading `:delete-item` because, by the time the event is 
being processed, we already know what id is has.

And, here it is: 
```clj
(def trim-event
  (re-frame.core/->interceptor
    :id      :trim-event
    :before  (fn [context]
               (let [new-event (-> context 
                                   :coeffects 
                                   :event        ;; extra event from coeffects
                                   rest          ;; remove first element
                                   vec)          ;; list->vector
                  (assoc-in context [:coeffects :event] new-event)))))
```

As you read this, look back to what a `context` looks like.   

Notes:
  1. We use `->interceptor` to create an interceptor (but it just a map)
  2. Our interceptor only has a `:before` function 
  3. Our `:before` is given `context`.  It modifies it and returns it.
  4. There is no `:after` for this Interceptor. It has nothing to do 
     with the backwards processing flow of effects. It is concerned only 
     with coeffects in the forward flow.
      
####Wrapping Handlers

We're going well. Let's do an advanced wrapping. 

How would you wrap a handler in an interceptor?

There's two kinds of handler:
   - the `-db` variety registered by `reg-event-db`
   - the `-fx` variety registered by `reg-event-fx`
   
Let's do a `-db` variety. We'll be wrapping a function like this:
```clj
(fn [db event]               ;;  takes two params
  (assoc db :flag true))     ;; returns a new db
```
   
Here a function which turns a given handler into an interceptor:  
```clj
(defn db-handler->interceptor
  [db-handler-fn]
  (->interceptor
    :id     :db-handler
    :before (fn [context]
              (let [{:keys [db event]} (:coeffects context)    ;; extract db and event from coeffects
                    new-db (db-handler-fn db event)]           ;; call the handler 
                 (assoc-in context [:effects :db] new-db)))))) ;; put db back into :effects
```


## Summary

In this tutorial, we've learned: 
 
__1.__ When you register a handler, you can supply a collection of interceptors:
```
 (reg-event-db          
    :some-id
    [in1 in2]       ;; <--- a chain of 2 interceptors  
    (fn [db v]      ;; <-- real handler here
       ....)))
```

__2.__ That will associate `:some-id` with a chain of about 5 interceptors because:
  - there are two interceptors supplied
  - the handler is wrapped as an interceptor and added to the end
  - the registration function inserts a couple of interceptors at the front
  
__3.__ Interceptors can do interesting things:
   - add to coeffects  (inputs to the handler)
   - process effects (make side effects happen)
   - produce logs 
   - further process    

In the next Tutorial, we'll look at Effects   
 

## Appendix

### The Builtin Interceptors

re-frame comes with some builtin Interceptors:
  - __debug__: log each event as it is processed. Shows incremental [`clojure.data/diff`](https://clojuredocs.org/clojure.data/diff) reports.
  - __trim-v__:  a convenience. More readable handlers.  

And some Interceptor factories (functions that return Interceptors):
  - __enrich__:  perform additional computations (validations?), after the handler has run. More derived data flowing.
  - __after__: perform side effects, after a handler has run.  Eg: use it to report if the data in `app-db` matches a schema.   
  - __path__:  a convenience. Simplifies our handlers. Acts almost like `update-in`.
  
In addition, [a Library like re-frame-undo](https://github.com/Day8/re-frame-undo) provides an Interceptor 
factory called `undoable` which checkpoints app state.
 

To use them, first require them:
```Clojure
(ns my.core
  (:require
    [re-frame.core :refer [debug path]])
```
