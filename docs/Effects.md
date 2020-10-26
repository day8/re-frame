Maybe 20% of the time, event handlers need to cause side effects.

This tutorial explains how side effects are actioned,
how you can create your own side effects, and how you can
make side effects a noop in testing and event replays.

## Where Effects Come From

When an event handler is registered via `reg-event-fx`, it must return effects. Like this:
```clj
(reg-event-fx              ;; -fx registration, not -db registration
  :my-event
  (fn [cofx [_ a]]        ;; 1st argument is coeffects, instead of db
    {:db       (assoc (:db cofx) :flag  a)
     :fx       [[:dispatch [:do-something-else 3]]]})) ;; return effects
```

`-fx` handlers return a description of the side-effects required, and that description is a map.

## The Effects Map

An effects map contains instructions.

Each key/value pair in the map is one instruction - the key uniquely identifies
the particular side effect required, and the value for that key provides
further data. The type of value depends on the specific side-effect.

Here's the two instructions from the example above:
```clj
{:db       (assoc db :flag  a)         ;; side effect on app-db
 :fx       [[:dispatch [:do-something-else 3]]]}     ;; dispatch this event
```

The `:db` key instructs that "app-db" should be `reset!` to the
value supplied.

And the `:fx` key instructs that an ordered list of other effects should be
executed. In this case a `:dispatch` key instructs that an event should be
dispatched. The value is the vector to dispatch.

There are many other possible
effects, like for example `:dispatch-later`, `dispatch-n`, `:set-local-store`, etc.

And so on. And so on. Which brings us to a problem.

## Infinite Effects

Although re-frame supplies a number of built-in effect handlers, the set of
possible effects is open ended.

What if you use PostgreSQL and want an effect which issues mutating
queries?  Or what if you want to send logs to Logentries or metrics to DataDog.
Or write values to `windows.location`. Or save cookies.

The list of effects is long and varied, with everyone needing to use a
different combination.

So effect handling has to be extensible. You need a way to define
your own side effects.

## Extensible Side Effects

re-frame provides a function `reg-fx` through which you can register
your own `Effect Handlers`. Use it like this:
```clj
(reg-fx         ;; <-- registration function
   :butterfly   ;;  <1> effect key
   (fn [value]  ;;  <2> effect handler
      ...
      ))
```

__<1>__  __Effect Key__  Later, when an effects map contains
the key `:butterfly`, the function we are registering will be used to action it.

__<2>__  __Effect handler__ The function which actions the side effect. Later, it will be called
with one argument - the value associated with the key in the effects map.

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

## Writing An Effect Handler

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

Right. So, this advice coming from the guy who named effects `fx` ... Oh, the hypocrisy.

In my defence, here's the built-in effect handler for `:db`:
```clj
(reg-fx
  :db
  (fn [value]
    (reset! re-frame.db/app-db value)))
```

So, yeah, simple ... and, because of it, I can almost guarantee there's no bug in ... bang, crash, smoke, flames.

!!! note
    The return value of an effect handler is ignored.

## :db Not Always Needed

An effects map does not need to include the `effect key` `:db`.

It is perfectly valid for an event handler
to not change `app-db`.

In fact, it is perfectly valid for an event handler to return
an effects map of `{}`.  Slightly puzzling, but not a problem.

## What Makes This Work?

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
its `:after` function would be the final act when the chain is executed
(forwards and then backwards, as described in the Interceptor Tutorial).

In this final act, the `:after` function extracts `:effects` from `context`
and simply iterates across the key/value pairs it contains, calling the
registered "effect handlers" for each.

!!! Note "For the record"
    The FISA Court requires that we deny all claims
    that `do-fx` is secretly injected NSA surveillance-ware. <br>
    We also note that you've been sloppy with your personal
    grooming again, including, but not limited to, forgetting to clean your teeth on one occassion last week.

If ever you want to take control of the way effect handling is done,
create your own alternative to `reg-event-fx` and, in it, inject
your own version of the `do-fx` interceptor at the front
of the interceptor chain.  It is only a few lines of code.


## Order Of Effects?

***Prior to v1.1.0***, the answer is: no guarantees were provided about ordering. Actual order is an implementation detail upon which you should not rely.

***From v1.1.0 onwards***, two things changed:

  - re-frame guaranteed that the `:db` effect will always be actioned first, if present. But other than that, no guarantee is given for the other effects.
  - a new effect called `:fx` was added, and it provides a way for effects to be ordered.

In fact, with v1.1.0 ***best practice changed*** to event handlers should only return two effects `:db` and `:fx`, in which case `:db` was always done first and then `:fx`, and within `:fx` the ordering is sequential. This new approach is more about making it easier to compose event handlers from many smaller functions, but more specificity around ordering was  a consequence. 

## Effects With No Data

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

## Testing And Noops

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

## Existing Effect Handlers

`re-frame's` built-in effect handlers, like `dispatch-n` and `dispatch-later`, are detailed in [the API](https://day8.github.io/re-frame/api-builtin-effects/) document.

And please review the [External-Resources document](https://day8.github.io/re-frame/External-Resources/) for a list of 3rd party Effect Handlers.

## Summary

The 4 Point Summary in note form:

1. Event handlers should only return a description of required effects 
2. They return a map like `{:effect1 value1 :effect2 value2}`
3. Keys of this map can refer to builtin effect handlers (see below) or custom ones
4. We use `reg-fx` to register our own effect handlers, built-in ones are already registered
