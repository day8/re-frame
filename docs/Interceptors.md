
The last tutorial looked at **how to write event handlers** and
introduced the idea of `effects` and `coeffects`.

In this tutorial, we'll understand how event handlers are "called" - the mechanics of a  `dispatch`.

We need to understand Interceptors.


### Why Interceptors?

We want simple event handlers.  

Interceptors can look after "cross-cutting" concerns like undo, tracing and validation. 
They help us to factor out commonality, hide complexity and introduce further steps into the "Derived Data, 
Flowing" story promoted by re-frame. 

So, you'll want to use Interceptors - they're helpful.

There's a second reason. Under the covers, Interceptors are central to 
how event handlers are executed. So actually, there's not much choice. 

So, for both reasons, an understanding of Interceptors is well worth your time.

### What Does An Interceptor Do?

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

Traditional middleware - often seen in web server - creates a data 
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

Data. It flows through being progressively transformed. 

Fine. But what data?

With a web server, the middleware "stack" progressively 
transforms a `request` in one direction, and, then in the backwards 
sweep, it progressively produces a `response`. 

In re-frame, the forwards sweep progressively creates the `coeffects` 
(inputs to the handler), while the backwards sweep processes the `effects`
(outputs from the handler).  

I'll pause while you read that sentence again. That's the key 
concept, right there. 

### Show Me Use

You can provide a chain of interceptors when 
you register the event handler.
 
Using a 3-arity registration function:
```clj 
(reg-event-db          
   :some-id
   [in1 in2]       ;; <--- a chain of 2 interceptors  
   (fn [db v]      ;; <-- real handler here
      ....)))
```

> Each Event Handler can have its own tailored interceptor chain. 

### Handler Are Interceptors

You'll might see that registration above as associating `:some-id` with (1) a chain of interceptors 
and (2) a handler.  
 
Except, the handler is turned into an interceptor too.  (We'll see that in a minute). 
 
So what's really going on, is that `:some-id` is being associated with a 3-chain of interceptors, 
with the handler wrapped in an interceptor and put on the end of the other two.  
 
Except, except, the registration function itself, `reg-event-db`, actually takes this 3-chain 
and adds its own interceptors 
(which do useful things) at the front (more on this soon too), 
so ACTUALLY, there's about 5 interceptors in the chain that is registered for `:some-id`. 

And that's all that is registered for `:some-id` - a 5-chain of interceptors. 

### Brass Tacks

Each interceptor has this form:
```clj
{:id      :something             ;; decorative
 :before  (fn [context] ...)     ;; returns possibly modified context
 :after   (fn [context] ...)}    ;; `identity` would be a noop
```

That's essentially a map of two functions. Now imagine a vector of these maps - that's an  
an interceptor chain. 

To "execute" a chain:
  1. create a `context` (a map, described below)
  2. iterate forrwards over the chain, calling the `:before` function on each interceptor
  3. iterate over the chain in the opposite direction calling the `:after` function on each iterator

Remember that the last interceptor in the chain is the handler itself (wrapped up to be the `:before`).

Some data called a `context` is threaded through all the calls. That means it 
is passed as the argument to every `:before` and `:after` function and it is returned, 
possibly modified, by each of them too. 

### What Is Context 

A `context` is a map with this form: 
```clj
{:coeffects {:event [:a-query-id :some-param]
             :db    <original contents of app-db>}
 :effects   {:db    <new value for app-db>
             :dispatch  [:an-event-id :param1]}
 :queue     <a collection of further interceptors>
 :stack     <a collection of interceptors already walked>}
```

`context` has `:coeffects` and `:effects` which, if this was a web
server, would be somewhat anologous to `request` and `response`
respectively.

`:coeffects` will contain data like the `:event` being processed, 
and the initial
state of `db`. These are the inputs required by the event handler
(sitting presumably on the end of the chain).

The handler-returned side effects are put into `:effects` including, 
but not limited to, new values for `db`.

The first few interceptors in a chain (put there by `reg-event-db`) 
have `:before` functions which __prime__ the `:coeffects`
by adding in `:event`, and `:db`. Other interceptors in the chain can
can also add to `:coeffect` too.  Perhaps the event handler needs
data from localstore, or a random number, or a 
DataScript connection. Interceptors can build up the coeffect, via their 
`:before`. 

Equally, some interceptors in the chain will have `:after` functions
which can process the side effects accumulated into `:effects`
including but, not limited to, updates to app-db.

### Fancy

Through both stages (before and after), `context` contains a `:queue`
of interceptors yet to be processed, and a `:stack` of interceptors
already done.  

In advanced cases, these values can be modified by the
functions through which the `context` is threaded. 

What I'm saying is that interceptros can be dynamically added 
and removed from the `:queue` by the very interceptors already 
in the chain. 

### Credit

This beautifully simple and flexible arrangement was originally 
designed by the talented 
[Pedestal Team](https://github.com/pedestal/pedestal/blob/master/guides/documentation/service-interceptors.md).

Thanks!  We really like the way it has turned out for re-frame.


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
passive aggressive understated thing it has going on!! Co-workers
have said I'm "being overly sensitive", perhaps even horizontalist, but 
you can see it, right?  Of course you can.

Let's remove it.  We'll write an interceptor: `trim-event`

Once we have written `trim-event`, our registration will change to look like this:
```clj
(def-event-db 
  :delete-item
  [trim-event]                ;;  <--- interceptor added
  (fn 
     [db [key-to-delete]]     ;;  <--- no leading underscore necessary
     (dissoc db key-to-delete)))
```

So, `trim-event` is going to be changing the `:coeffect` (of `context`).  More specifically, it will be 
changing the `:event` value within the `:coeffect`. 

`:event` will start as `[:delete-item 42]`, but will end up `[42]`.  We remove that 
leading `:delete-item` because, by the time the event is 
being processed, we already know what id is has.

```clj
(def trim-event
  (re-frame.core/->interceptor
    :name    :trim-v
    :before  (fn [context]
               (let [new-event (-> context 
                                   :coeffects 
                                   :event
                                   rest          ;; remove first element
                                   vec)          ;; list->vector
                  (assoc-in context [:coeffects :event] new-event)))))
```

As you read this, look back to what a `context` looks like.   

Notes:
  1. We use `->interceptor` to create an interceptor  (but it just a map)
  2. Our interceptor only has a `:before` function 
  3. Our `:before` is given `context`.  It modifies it and returns it.
  4. There is no `:after` for this Interceptor. It has nothing to do 
     with the backwards processing flow of effects. It is concerned only 
     with coeffects in the forward flow.
      
#### Wrapping Handlers

Earlier, I explained that your handler is turned into an interceptor, and 
added to the end of the chain.
 
Let's think about how your handler could be wrapped in an interceptor.  

First, note that there's two kinds of handler:
   - the `-db` variety registered by `reg-event-db`
   - the `-fx` variety registered by `reg-event-fx`
   
Here how you'd do the `-db` variety: 
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


### Summary

XXX

In the next Tutorial, we look at how you can add coeffects.  
 


      
      

 
 








### Free Beer

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
