## Effects

About 10% of the time, event handlers need to cause side effects.

This tutorial explains how side effects are actioned,
how you can create your own side effects, and how you can 
make side effects a noop in tests.

### Where Effects Come From

When an event handler is registered via `reg-event-fx`, it returns effects.

Like this:  
```clj
(reg-event-fx              ;; -fx version, not the -db version
  :my-event
  (fn [coeffects [_ a]]    ;; 1st argument is coeffects, instead of db     
    {:db       (assoc (:db coeffects) :flag  a)         
     :dispatch [:do-something-else 3]}))   ;; return effects
```

`-fx` handlers return a description of the side-effects required, and that description is a map. 

### The Effects Map 

An effects map contains instructions.

Each key/value pair in the map is one instruction - the key identifies 
the particular side effect required, and the value for that key provides 
further information. The structure of the value varies with the side 
effect itself.

Here's two instructions: 
```cljs 
  {:db       (assoc db :flag  a)         ;; side effect on app-db
   :dispatch [:do-something-else 3]}     ;; dispatch this event
```

That `:db` key instructs that "app-db" should be reset to the
value supplied.  

That `:dispatch` key instructs that an event should be  
dispatched. The value is the vector to dispatch.
 
In addition to those two shown above, there's other possible
effects, like for example `dispatch-n` whose value is
expected to be a vector of vectors to dispatch.
 
And so on. And so on. Which brings us to a problem. 
 
### Infinite Possible Effects

While re-frame supplies a some builtin effects, the set of 
possible effects is open ended.
 
What if you use Postgress and want an effect which issues mutating 
queries?  On the other hand, maybe you want to send logs to Logentries.  
Or write values to a LocalStore key. 

The list is long, and everyone will have different needs.

So effect handling has to be extensible. You need to a way to define your own side effects. 
 
### Extensible Side Effects

re-frame provides a function `reg-fx` through which you can register your own `Effect Handlers`.

Use it like this:
```clj
(reg-fx         ;; <-- registration function
   :my-key      ;;  <1> 
   (fn [value]  ;;  <2>
      ...
      ))
```
 
__<1>__  the key for the effect.  When an effects map contains 
the key `:my-key`, the registered function should be used to action it. <br>

__<2>__  a function which actions the side effect. It is called 
with one argument - the value for this key, in the effects map. 

So, if an event handler returned these effects:
```clj
{:dispatch   [:ev1 42]
 :my-key     "blah"}
```

Then the function we registered for `:my-key` would be called to handle that effect. And it would be
called with the parameter "blah".

So, terminology:
  - `:my-key` is known as an "effect key"
  - and the function registered is known as an "effect handler"
 
### Writing An Effect Handler

A word of advice - make them as simple as possible, and  
then simplify them further.  You don't want them containing any fancy logic.  
 
Why?  Well, because they all side-effecty they will be a pain to 
test rigorously. And the combination of fancy logic 
and limited testing is ... well, it always ends in tears, right?

A second word of advice - when you create an effect handler, 
you also have to design (and document!) the structure of the 
value expected. 

Realise that you are creating a nano DSL when designing this value. 
Make it simple too.  Create as little cognitive overhead as possible 
for the eventual readers of your effectful code.


Here's the builtin one for `:db`:
```clj
(reg-fx
  :db
  (fn [value]
    (reset! re-frame.db/app-db value)))
```

So, yeah, pretty simple.  

> Note: the return value of an effect handler is ignored.

### :db Not Always Needed

An effects map does not have to include the `effect key` :db`. 

It is perfectly okay to perform a series of side effects 
and not update `app-db` in the process.
 
### Order Of Effects

There isn't one.

re-frame does not allow you to control the order in 
which side effects occur. The `:db` side effect 
might happen before `:dispatch`, or not. 

If you feel you need ordering, then please 
open an issue and explain the usecase. It is the current absence of 
good usecases which have lead to this not being implemented. 

If ever ordering was needed, it might be handled via metadata on `:effects`. And 
perhaps allow `reg-fx` to optionally take two functions:
  - an effects pre-process fn <--- new
  - the effects handler, as already discussed.

Anyway, these are all just possibilities. But not needed yet. 


### Noops

Sometimes when running tests, you need to turn a side effect into a noop. 

Easy. Prove an effect handler which does nothing. 

```clj
(reg-fx
  :my-key 
  (fn [_] ))    ;; noop
```


### Builtin Effect Handlers

re-frame has these effect handlers built-in:
  - `:db`
  - `:dispatch`
  - `dispatch-n`
  - XXX
  
### What's Out There Already

  - https://github.com/Day8/re-frame-http-fx   (GETs and POSTs)
  - https://github.com/Day8/re-frame-forward-events-fx  (slightly exotic)
  - https://github.com/Day8/re-frame-async-flow-fx  (more complicated)

Create a PR to include yours in this list. 
