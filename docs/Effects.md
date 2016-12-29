## Effects

About 10% of the time, event handlers need to cause side effects.

This tutorial explains how side effects are actioned,
how you can create your own side effects, and how you can 
make side effects a noop in event replays.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
### Table Of Contents

- [Where Effects Come From](#where-effects-come-from)
- [The Effects Map](#the-effects-map)
- [Infinite Effects](#infinite-effects)
- [Extensible Side Effects](#extensible-side-effects)
- [Writing An Effect Handler](#writing-an-effect-handler)
- [:db Not Always Needed](#db-not-always-needed)
- [What Makes This Work?](#what-makes-this-work)
- [Order Of Effects?](#order-of-effects)
- [Effects With No Data](#effects-with-no-data)
- [Testing And Noops](#testing-and-noops)
- [Summary](#summary)
- [Builtin Effect Handlers](#builtin-effect-handlers)
  - [:dispatch-later](#dispatch-later)
  - [:dispatch](#dispatch)
  - [:dispatch-n](#dispatch-n)
  - [:deregister-event-handler](#deregister-event-handler)
  - [:db](#db)
- [External Effects](#external-effects)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Where Effects Come From

When an event handler is registered via `reg-event-fx`, it must return effects.

Like this:  
```clj
(reg-event-fx              ;; -fx registration, not -db registration
  :my-event
  (fn [cofx [_ a]]        ;; 1st argument is coeffects, instead of db     
    {:db       (assoc (:db cofx) :flag  a)         
     :dispatch [:do-something-else 3]}))   ;; return effects
```

`-fx` handlers return a description of the side-effects required, and that description is a map. 

### The Effects Map 

An effects map contains instructions.

Each key/value pair in the map is one instruction - the `key` uniquely identifies
the particular side effect required, and the `value` for that `key` provides
further data. The structure of `value` is different for each side-effect.

Here's the two instructions from the example above:
```cljs 
{:db       (assoc db :flag  a)         ;; side effect on app-db
 :dispatch [:do-something-else 3]}     ;; dispatch this event
```

The `:db` `key` instructs that "app-db" should be `reset!` to the
`value` supplied.

And the `:dispatch` `key` instructs that an event should be
dispatched. The `value` is the vector to dispatch.

There's many other possible
effects, like for example `:dispatch-later` or `:set-local-store`. 

And so on. And so on. Which brings us to a problem.

### Infinite Effects

While re-frame supplies a number of builtin effects, the set of
possible effects is open ended.

What if you use PostgreSQL and want an effect which issues mutating
queries?  Or what if you want to send logs to Logentries or metrics to DataDog.
Or write values to windows.location. And what happens if your database is
X, Y or Z?

The list of effects is long and varied, with everyone needing to use a
different combination.

So effect handling has to be extensible. You need a way to define 
your own side effects.

### Extensible Side Effects

re-frame provides a function `reg-fx` through which you can register 
your own `Effect Handlers`.

Use it like this:
```clj
(reg-fx         ;; <-- registration function
   :butterfly   ;;  <1> 
   (fn [value]  ;;  <2>
      ...
      ))
```

__<1>__  the key for the effect.  When later an effects map contains 
the key `:butterfly`, the function we are registering will be used to action it. <br>

__<2>__  the function which actions the side effect. Later, it will be called 
with one argument - the value in the effects map, for this key. 

So, if an event handler returned these two effects:
```clj
{:dispatch   [:save-maiden 42]
 :butterfly  "Flapping"}         ;; butterfly effect, but no chaos !!
```

Then the function we registered for `:butterfly` would be called to handle 
that effect. And it would be called with the parameter "Flapping".

So, terminology:
- `:butterfly` is an "effect key"
- and the function registered is an "effect handler".

So re-frame has both `event` handlers and `effect` handlers and they are 
different, despite them both starting with `e` and ending in `t`!!

### Writing An Effect Handler

A word of advice - make them as simple as possible, and then 
simplify them further.  You don't want them containing any fancy logic.

Why?  Well, because they are all side-effecty they will be a pain 
to test rigorously. And the combination of fancy logic and limited 
testing always ends in tears.  If not now, later.

A second word of advice - when you create an effect handler, 
you also have to design (and document!) the structure of the 
`value` expected. 

When you do, realise that you are designing a nano DSL for `value` and try to
make that design simple too. If you resist being terse and smart, and instead, favor slightly 
verbose and obvious, your future self will thank you. Create as little 
cognitive overhead as possible for the eventual readers of your effectful code.

This advice coming from the guy who named effects `fx` ... Oh, the hypocrisy.

In my defence, here's the built-in effect handler for `:db`:
```clj
(reg-fx
  :db
  (fn [value]
    (reset! re-frame.db/app-db value)))
```

So, yeah, simple ... and, because of it, I can almost guarantee there's no bug in ... bang, crash, smoke, flames.

> Note: the return value of an effect handler is ignored.

### :db Not Always Needed

An effects map does not need to include the `effect key` `:db`. 

It is perfectly valid for an event handler 
to not change `app-db`. 

In fact, it is perfectly valid for an event handler to return 
an effects map of `{}`.  Slightly puzzling, but not a problem.  

### What Makes This Work?

A silently inserted interceptor.

Whenever you register an event handler via __either__ `reg-event-db` 
or `reg-event-fx`, an interceptor, cunningly named `do-fx`,  
is inserted at the beginning of the chain. 

Example: if your event handler registration looked like this:
```clj
(reg-event-fx
  :some-id
  [debug (path :right)]     ;; <-- two interceptors, apparently
  (fn [cofx _] 
     {})                    ;; <-- imagine returned effects here
```

While it might look like you have registered with 2 interceptors, 
`reg-event-fx` will make it 3: 
```clj 
[do-fx debug (path :right)]
```

It silently inserts `do-fx` at the front, and this is a good thing. 

The placement of `do-fx` at the beginning of the interceptor chain means 
it's  `:after` function would be the final act when the chain is executed 
(forwards and then backwards, as described in the Interceptor Tutorial).

In this final act, the `:after` function extracts `:effects` from `context` 
and simply iterates across the key/value pairs it contains, calling the 
registered "effect handlers" for each.

> For the record, the FISA Court requires that we deny all claims 
> that `do-fx` is secretly injected NSA surveillance-ware. <br>
> We also note that you've been particularly sloppy with your personal 
> grooming today, including that you forgot to clean your teeth. Again.

If ever you want to take control of the way effect handling is done, 
create your own alternative to `reg-event-fx` and, in it, inject
your own version of the `do-fx` interceptor at the front 
of the interceptor chain.  It is only a few lines of code. 


### Order Of Effects?

There isn't one.

`do-fx` does not currently provide you with control over the order in 
which side effects occur. The `:db` side effect 
might happen before `:dispatch`, or not. You can't rely on it.

*Note:* if you feel you need ordering, then please 
open an issue and explain the usecase. The current absence of 
good usecases is the reason ordering isn't implemented. So give 
us a usercase and we'll revisit, maybe. 

*Further Note:* if later ordering was needed, it might be handled via 
metadata on `:effects`. Also, perhaps by allowing `reg-fx` to optionally 
take two functions:
- an effects pre-process fn  <-- new. Takes `:effects` returns `:effects`
- the effects handler (as already described above). 

Anyway, these are all just possibilities. But not needed or implemented yet. 


### Effects With No Data
 
Some effects have no associated data:
```clj
(reg-event-fx
  :some-id
  (fn [coeffect _] 
     {:exit-fullscreen nil}))    ;;   <--- no data, use a nil
```

In these cases, although it looks odd, just supply `nil` as the value for this key.

The associated effect handler would look like:
```clj
(reg-fx
  :exit-fullscreen
  (fn [_]             ;; we don't bother with that nil value
     (.exitFullscreen js/document)))
```

### Testing And Noops

When you are running tests or replaying events, it is sometimes 
useful to stub out effects.

This is easily done - you simply register a noop effect handler. 

Want to stub out the `:dispatch` effect?  Do this:
```clj
(reg-fx
  :dispatch
  (fn [_] ))    ;; a noop
```

If your test does alter registered effect handlers, and you are using `cljs.test`,
then you can use a `fixture` to restore all effect handlers at the end of your test: 
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

### Summary 

XXX


### Builtin Effect Handlers

#### :dispatch-later

`dispatch` one or more events after given delays. Expects a collection
of maps with two keys: `:ms` and `:dispatch`

usage:
```clj
{:dispatch-later [{:ms 200 :dispatch [:event-id "param"]}    
                  {:ms 100 :dispatch [:also :this :in :100ms]}]}
```

Which means: in 200ms do this: `(dispatch [:event-id "param"])` and in 100ms ...

#### :dispatch

`dispatch` one event. Expects a single vector.

usage:
```clj
{:dispatch [:event-id "param"] }
```

#### :dispatch-n

`dispatch` more than one event. Expects a collection events.

usage:
```clj
{:dispatch-n (list [:do :all] [:three :of] [:these])}
```

#### :deregister-event-handler

removes a previously registered event handler. Expects either a single id (
typically a keyword), or a seq of ids.

usage:
```clj
{:deregister-event-handler :my-id)}
```
or:
```clj
{:deregister-event-handler [:one-id :another-id]}
```

#### :db

reset! app-db with a new value. Expects a map. 

usage:
```clj
{:db  {:key1 value1 key2 value2}}
```

### External Effects

Please see the [External-Resources document](External-Resources.md) for a list of 3rd part Effect Handlers.


***

Previous:  [Interceptors](Interceptors.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Coeffects](Coeffects.md)  
