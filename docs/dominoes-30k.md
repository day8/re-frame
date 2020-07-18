

Previously, we looked at the dominoes from 60,000 feet. We will now shift 
down to 30,000 feet and look in more detail, this time with code fragments.

<img align="right" width="360px" src="../images/Readme/todolist.png">
## The Setup



Imagine this: our app displays a list of items. 

The user clicks the "delete" button next to the 3rd item in the list.

In response, let's track what happens within our imaginary re-frame app? Let's manually step through
the resulting six domino cascade.

!!! note ""
    Don't expect 
    to completely grok the terse code presented below. We're still at 30,000 feet. More details later. 

## Domino 1 - Event Dispatch

In order for it to be clicked, that 3rd delete button must have already been rendered. And rendering 
in re-frame is done by a `ViewFunction`. Perhaps it was rendered like this: 
```clj
(defn delete-button 
  [item-id]
  [:div.garbage-bin 
    :on-click #(re-frame.core/dispatch [:delete-item item-id])])
```

It is that `on-click` handler (function) which interests us. When the user clicks on the garbage-bin icon, that function is called. 
```clj
#(re-frame.core/dispatch [:delete-item item-id])
```
This function calls re-frame's `dispatch` to emit an `event`.

Every re-frame `event` is a vector and, in this case, the dispatched `event` has two elements: 
```clj
[:delete-item 2486]
```
where `2486` is an `id` I just made up for that 3rd item.  
 
The first element of an event vector,
`:delete-item`, is the kind of event. The rest is optional data, salient to the 
`event`.

Events express user intent in a domain-specific way.
They are the language of your re-frame system. 

## Domino 2 - Event Handling

An `event handler` (function), which we'll name `h`, is now called to 
compute the `effect` of the event `[:delete-item 2486]`.

On startup, re-frame apps register handlers for events using `reg-event-fx`. So,
in our imaginary app, because `h` is the handler function for `:delete-item` events, 
it must have been registered like this:
```clj 
(re-frame.core/reg-event-fx   ;; a part of the re-frame API
  :delete-item                ;; the kind of event
  h)                          ;; the handler function for this kind of event
```

Because `h` is an event handler, it is written to take two arguments:

  1. a `coeffects` map. This data describes the current state of "the world". In the simplest case, it is a trivial map like this: `{:db a-value}` where `a-value` is the current application state held in `app-db`. 
  2. the `event` to handle, which would be `[:delete-item 2486]` in this case.

`h` will compute effects as data. That means: it computes how the world should be changed 
by the event, and it returns a map of `effects` which describe the necessary changes.

Here's a sketch (we are at 30,000 feet):
```clj
(defn h                          ;; maybe choose a better name like `delete-item`
 [coeffects event]               ;; `coeffects` holds the current state of the world
 (let [item-id  (second event)   ;; extract id from event vector
       db       (:db coeffects)  ;; extract the current application state
       new-db   (dissoc-in db [:items item-id])]   ;; new app state
   {:db new-db}))                ;; a map of the necessary effects 
```

There are ways (described in later tutorials) for you to inject necessary aspects
of "the world" into that first `coeffects` argument (map). Different
event handlers need to know different "things" about the world to do their job. But 
current "application state" is one aspect of the world which is 
invariably needed, and it is available by default in the `:db` key. So 
the current value in `app-db` is available via the expression `(:db coeffects)`.

The value returned by `h` is a map with only one key, like this:
```clj
{:db new-db}     ;; `new-db` is the newly computed application state
```
So, `h` computes one effect, and returns it. And that effect says to make a change to 
application state.

Please pay particular attention to this overall flow, within `h`:

  1. `h` obtains the current application state (a map) via `(:db coeffects)` 
  2. it computes a modified application state via `(dissoc-in db [:items item-id])`
  3. it returns this modified application state in an effects map `{:db new-db}`


BTW, here is a more idiomatic (and terser) rewrite of `h` using [destructuring](https://clojure.org/guides/destructuring) of the args: 
```clj
(defn h 
  [{:keys [db]} [_ item-id]]    ;; <--- new: obtain db and item-id directly
  {:db  (dissoc-in db [:items item-id])})    ;; 
```


## Domino 3 - Effect Handling

`effect handler` functions action the `effects` returned by `h`.

In Domino 2, `h` returned: 
```clj
{:db  new-db}   ;; `new-db` is the new, computed application state
```

Each key of this returned map identifies one kind 
of `effect`, and the value for that key supplies further details. 
The map returned by `h` only has one key, `:db`, so it is specifying only one effect.

On startup, a re-frame app can register `effects handlers` using `reg-fx`. For example, 
the effect handler function for the `:db` effect could be registered like this: 
```clj 
(re-frame.core/reg-fx       ;; part of the re-frame API
  :db                       ;; the effects key 
  (fn [val]                 ;; the handler function for the effect
    (reset! app-db val)))   ;; put the new value into the ratom app-db
```

Just to be clear, this `reset!` of `app-db` is a mutative, effectful action. That's
what effect handlers do. They change the world. They are not pure functions.

Now, you don't need to ever register an effects handler for `:db`
because re-frame supplies one built in. re-frame manages `app-db` and so it 
will look for any changes (effects) to it.

But if, instead, `h` had returned: 
```clj
{:wear  {:pants "velour flares"  :belt false}
 :tweet "Okay, yes, I am Satoshi. #coverblown"}
```
Then, the two effects handlers registered for `:wear` and `:tweet` would 
be called to action those two effects. And, no, re-frame 
does not supply standard effect handlers for either, so you would need to have
written them yourself, and then registered them. 

For example:
```clj
(re-frame.core/reg-fx    ;; re-frame API
  :wear        ;; the effects key which this handler can action
  (fn [val]    ;; val would be, eg, {:pants "velour flares"  :belt false}
    ...))      ;; do what's necessary to action the side effect
```

## Domino 4 - Query

The action of updating `app-db` (in Domino 3) will trigger the `v = f(s)` part of the flow. 

The application state
`s` has just changed (in Domino 3) and now boom, boom go Dominoes 4, 5, 
and 6, at the end of which we have a new view, `v`, being shown to the user.

In this domino 4, a query (function) over this app state is automatically
called.  This query function "extracts" data from application state, and 
then computes "a materialised view" of the application state - producing
data which is useful to the view functions in domino, 5.

Now, in this particular case, the query function is pretty trivial.
Because the items are stored in app state, there's not a lot 
to compute and, instead, it acts like a simple extractor or accessor,
just plucking the list of items out of application state:
```clj
(defn query-fn
  [db v]         ;; db is the current value in app-db, v the query vector
  (:items db))   ;; not much of a materialised view
```

On program startup, such a `query-fn` must be associated with a `query-id`, 
(so it can be used via `subscribe` in domino 5) using `re-frame.core/reg-sub`, 
like this:
```clj
(re-frame.core/reg-sub  ;; part of the re-frame API
   :query-items         ;; query id  
   query-fn)            ;; function to perform the query 
```
Which says "if, in domino 5, you see a `(subscribe [:query-items])`, then 
call `query-fn` to compute it".

## Domino 5 - View

Because the query function for `:query-items` just re-computed a new value, 
any view (function) which uses a `(subscribe [:query-items])` 
is called automatically (reactively) to re-compute new DOM (in response to a change in its source data).

View functions compute a data structure, in hiccup format, describing
the DOM nodes required. In this "items" case, the view functions will *not* be generating 
hiccup for the just-deleted item obviously but, other than this, 
the hiccup computed "this time" will be the same as "last time".

```clj
(defn items-view
  []
  (let [items  (subscribe [:query-items])]  ;; source items from app state
    [:div (map item-render @items)]))   ;; assume item-render already written
```

Notice how `items` is "sourced" from "app state" via `re-frame.core/subscribe`.
It is called with a vector argument, and the first element of that vector is
a query-id which identifies the "materialised view" required by the view.

Note: `subscribe` queries can be parameterised. So, in real-world apps
you might have this:<br>
  `(subscribe [:items "blue"])`

The vector identifies, first, the query, and then
supplies further arguments. You could think of that as
representing `select * from Items where colour="blue"`.

Except there's no SQL available and you would be the one to implement
the more sophisticated `query-fn` capable of handling the 
"where" argument. More in later tutorials.

## Domino 6 - DOM

The hiccup returned by the view function
is made into real browser DOM by Reagent/React. No code from you required. Just happens.

The DOM computed "this
time" will be the same as "last time", **except** for the absence of DOM for the
deleted item, so the mutation will be to remove those now-missing
DOM nodes from the browser.

## 3-4-5-6 Summary

The key point to understand about our 3-4-5-6 example is:

  - a change to app state ...
  - triggers query functions to rerun ...
  - which triggers view functions to rerun
  - which causes modified browser DOM 

Boom, boom, boom go the dominoes. It is a reactive data flow.

## Aaaaand we're done 

At this point, the re-frame app returns to a quiescent state, 
waiting for the next event.


## Two Sub-Cascades

You might have noticed that there's actually two sub-cascades 1-2-3 and 4-5-6, and they have a similar structure.

In each, it is the second to last domino which 
computes "data descriptions" of the changes required, and it is 
the last domino which does the dirty work and actions these descriptions.

But you seldom need to worry yourself about the dirty work dominos. re-frame 
mostly takes care of them for you.


> One is only fruitful at the price of being rich in oppositions <br>
>
>   -- Nietzsche, Twilight of the Idols

Pragmatically, in functional systems, the most interesting part is how and when you arrange to not be pure. 
