---
klipse: true
---


Forget overviews from 60,000 feet or 30,000 feet. Now we're at 0 feet. 

We're writing code for a real app - live, in this document.


## Which App?

The "simple" one. 

Within the re-frame repository's `/examples` folder is an app 
called [/simple](https://github.com/day8/re-frame/tree/master/examples/simple).

It has 70 lines of code in a single [namespace](https://github.com/day8/re-frame/blob/master/examples/simple/src/simple/core.cljs).
We'll look at all 70 lines.

!!! Info ""
    Below, you should see the app running live. <br>
    Try changing the display colour to `magenta`, `#f00` or `#02a6f2`.
      
<div id="dominoes-live-app">
  <div class="preload">  
    The live application should start here in 60 seconds ...
    <br><br>
    Doesn't work? Maybe try disabling your adblocker for this site. 

  
  </div>
</div>

!!! Info ""
    When you change the live code on this page, the app will change. But that means 
    we'll be loading a ClojureScript compiler into the browser, so be patient. <br>
    This live coding is powered by [Klipse](https://github.com/viebel/klipse).


## The Namespace

Within our single namespace (of 70 lines), we'll need access to both `reagent` and `re-frame`. 
So, at the top we need this: 
<code class="klipse-clojure">
(ns simple.core
  (:require [reagent.core :as reagent]
            [reagent.dom :as rdom]
            [re-frame.core :as rf]))
</code>

!!! Note "Live Code Fragment"
    Above, you'll see two vertically stacked boxes. The top one contains the live code. You can edit that code, if you want. 
    The one below shows the result of evaluating that code. In this particular case, evaluating a `ns` gives nil which is not that interesting. 

## The Data Schema

Now, normally, I'd strongly recommended that you write a quality schema
for your application state (the data stored in `app-db`). But,
here, to minimise cognitive load, we'll cut that corner.

But, we can't cut it completely. You'll still need an
informal description, and here it is ... `app-db` will contain
a two-key map like this:
```clj
{:time       (js/Date.)  ;; current time for display
 :time-color "#f88"}     ;; the colour in which the time should be shown
```

## Event Dispatch

Events are data.

re-frame uses a vector format for events. For example:
```clj
[:time-color-change "red"]
```

The first element in the vector is a keyword which identifies the `kind` of `event`.
Further elements are optional, and can provide additional data
associated with the event. The additional value above, `"red"`, is
presumably the colour.

Here are some other example events:
```clj
[:admit-to-being-satoshi false]
[:dressing/put-pants-on  "velour flares" {:method :left-leg-first :belt false}]
```

For non-trivial applications, the `kind` keyword will be namespaced, as it is in the 2nd example.

### dispatch

To send an event, call `dispatch` with the event vector as the argument. 
```clj
(dispatch [:kind-of-event value1 value2])
```

For our simple app, we do this ... 
<code class="klipse-clojure">
(defn dispatch-timer-event        ;; <-- defining a function
  []                              ;; <-- no args
  (let [now (js/Date.)]           ;; <-- obtain the current time
    (rf/dispatch [:timer now])))  ;; <-- dispatch an event
</code>

Notes: 

  - ignore the lower box. When defining a function, the return value is not interesting.
  - current time is obtained with `(js/Date.)` which is like `new Date()` in javascript
  - uses `rf/dispatch` - the re-frame API is aliased as `rf` in the namespace declaration above

<code class="klipse-clojure">
(defonce do-timer (js/setInterval dispatch-timer-event 1000))
</code>

Notes:

  - `setInterval` is used to call `dispatch-timer-event` every second 
  - `defonce` is like `def` but it will ensure that only one timer is ever created. Even when doing hot reloading.

A timer is an unusual source of events. Usually, it is an app's UI widgets which dispatch events 
(in response to user actions), or an HTTP POST's on-success handler, or a websocket which gets a new packet. 
So, "simple" is a little unusual. Moving on. 


### After dispatch 

`dispatch` puts an event onto a queue for processing.

So, an event is not processed synchronously, like a function call. The processing
happens later - asynchronously. Very soon, but not now.

The consumer of the queue is the re-frame `router` which looks after the event's processing.

The `router` will:

1. inspect the 1st element of an event vector
2. look up the event handler (function) **registered** for this kind of event
3. call this event handler (function) with the necessary arguments

Our job, then, is to register an event handler function for 
each kind of event, including this `:timer` event. 

## Event Handlers

Collectively, event handlers provide the control logic in a re-frame application.

In this application, three kinds of event are dispatched:

  - `:initialize` - once when the program boots up
  - `:time-color-change` - whenever the user changes the colour text field
  - `:timer` - once a second 

Having 3 events means we'll be registering 3 event handlers.

### Registering Event Handlers

Event handler functions:

  - take two arguments `coeffects` and `event`
  - return `effects`

Conceptually, you can think of the argument `coeffects` as being "the current state of the world". 
And you can think of event handlers as computing how the world should be changed 
by the arriving event. They return (as data) how the world should be changed by the event - `the side effects` of the event.

Event handlers can be registered in two ways:

  - `reg-event-fx`
  - `reg-event-db`  
  
 One ends in `-fx` and the other in `-db`.

  - `reg-event-fx` can take many `coeffects` and can return many `effects`
  - `reg-event-db` allows you to write simpler handlers for the common case where you want 
  them to take only one `coeffect` - the current app state - and return one `effect` - the 
  updated app state.

Many vs One. Because of its simplicity, we'll be using the latter one here: `reg-event-db`.

### reg-event-db

We register event handlers using re-frame's API: 

```clj
(rf/reg-event-db           ;; <-- the re-frame API function to use
  :the-event-id            ;; <-- the event id 
  the-event-handler-fn)    ;; <-- the handler function
```
The handler function you provide should expect two arguments:

   - `db` - the current application state  (the map value contained in `app-db`)
   - `e` - the event vector  (given to `dispatch`)
    
So, your handler function will have a signature like this: `(fn [db e] ...)`.

These event handlers must compute and return the new state of
the application, which means they return a modified version of `db`.


### :timer

<code class="klipse-clojure">
(rf/reg-event-db                 
  :timer
  (fn [db [_ new-time]]          ;; notice how we destructure the event vector
    (assoc db :time new-time)))  ;; compute and return the new application state
</code>

Notes:

1. the `event` (2nd parameter) will be like `[:timer a-js-time]`
2. [sequence destructuring](https://clojure.org/guides/destructuring) 
   is used to extract the 2nd element of that event vector (ignores first with `_`)
3. `db` is a map, containing two keys (see description above)
4. this handler computes a new application state from `db`, and returns it
5. it just `assocs` in the `new-time` value

### :initialize

Once on startup, application state must be initialised. We
want to put a sensible value into `app-db`, which starts out containing an empty map `{}`.

A single `(dispatch [:initialize])` will happen early in the 
app's life (more on this below), and we need to register an `event handler`
for it. 

This event handler is slightly unusual because it ignores both of its arguments. 
There's nothing in the `event` vector which it needs. Nor is the existing value in 
`db`. It just wants to plonk a completely new value into `app-db`

<code class="klipse-clojure">
(rf/reg-event-db              ;; sets up initial application state
  :initialize
  (fn [ _ _ ]                 ;; arguments not important, so use _
    {:time (js/Date.)         ;; returned value put into app-db 
     :time-color "orange"}))  ;; so the app state will be a map with two keys
nil
</code>


For comparison, here's how we could have written this if we **did** care about the existing value in `db`: 
```clj
(rf/reg-event-db
  :initialize
  (fn [db _]                 ;; we use db this time, so name it
    (-> db                   ;; db is initially just {}
      (assoc :time (js/Date.))
      (assoc :time-color "orange")))
```


### :time-color-change

When the user enters a new colour value (into the input field) the view will `(dispatch [:time-color-change new-colour])` (more on this below). 

<code class="klipse-clojure">
(rf/reg-event-db
  :time-color-change            
  (fn [db [_ new-color-value]]
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state
nil
</code>

Notes:

1. it updates `db` to contain the new colour, provided as the 2nd element of the event 

## Effect Handlers

Domino 3 actions the `effects` returned by event handlers.

In this "simple" application, our event handlers are implicitly returning 
only one effect: "update application state". 

This particular `effect` is accomplished by a re-frame-supplied 
`effect` handler. So, there's nothing for us to do for this domino. We are 
using a standard re-frame effect handler.

And this is not unusual. You seldom write `effect` handlers. But it is covered in 
a later tutorial. 

## Subscription Handlers

Subscription handlers, or `query` functions, take application state as an argument 
and run a query over it, returning something called
a "materialised view" of that application state.

When the application state changes, subscription functions are 
re-run by re-frame, to compute new values (new materialised views).

Ultimately, the data returned by these `query` functions flow through into 
the `view` functions (Domino 5).
 
One subscription can
source data from other subscriptions. So it is possible to
create a tree structure of data flow. 
 
The Views (Domino 5) are the leaves of this tree.  The tree's 
root is `app-db` and the intermediate nodes between the two 
are computations being performed by the query functions of Domino 4.

Now, the two subscriptions below are trivial. They just extract part of the application
state and return it. So, there's virtually no computation - the materialised view they
produce is the same as that stored in `app-db`. A more interesting tree
of subscriptions, and more explanation, can be found in the todomvc example.

### reg-sub 

`reg-sub` associates a `query id` with a function that computes
 that query, like this:
```clj
(rf/reg-sub
  :some-query-id  ;; query id (used later in subscribe)
  a-query-fn)     ;; the function which will compute the query
```
Later, a view function (domino 5) will subscribe to a query like this:
`(subscribe [:some-query-id])`, and `a-query-fn` will be used 
to perform the query over the application state.

Each time application state changes, `a-query-fn` will be
called again to compute a new materialised view (a new computation over `app-db`)
and that new value will be given to all `view` functions which are subscribed
to `:some-query-id`. These `view` functions will then be called to compute the 
new DOM state (because the views depend on query results which have changed).

Along this reactive chain of dependencies, re-frame will ensure the 
necessary calls are made, at the right time.

Here's the code for defining our 2 subscription handlers:
<code class="klipse-clojure">
(rf/reg-sub
  :time
  (fn [db _]     ;; db is current app state. 2nd unused param is query vector
    (:time db))) ;; return a query computation over the application state
</code>

<code class="klipse-clojure">
(rf/reg-sub
  :time-color
  (fn [db _]
    (:time-color db)))
</code>

Both of these queries are trivial. They are known as "accessor", or layer 2, subscriptions. More on that soon.

## View Functions

`view` functions compute Hiccup.  They are "Data in, Hiccup out" and they are Reagent 
components. 

A SPA will have lots of `view` functions, and collectively, 
they render the app's UI.
 
## Subscribing

To render a hiccup representation of some part of the app state, view functions must query 
for that part of `app-db`, by using `subscribe`.

`subscribe` is used like this:
```clj
   (rf/subscribe  [query-id some optional query parameters])
```
So `subscribe` takes one argument, assumed to be a vector.

The first element in the vector identifies the query, 
and the other elements are optional
query parameters. With a traditional database a query might be:
```sql
select * from customers where name="blah"
```

In re-frame, that would look like:
   `(subscribe  [:customer-query "blah"])`,
which would return a `ratom` holding the customer state (a value which might change over time!).

!!! Warning "Rookie Mistake"
    Because subscriptions return a `ratom` (a Reagent atom), they must always be dereferenced to 
    obtain the value (using [deref](https://clojuredocs.org/clojure.core/deref) or [the reader macro](https://en.wikibooks.org/wiki/Learning_Clojure/Reader_Macros)  `@`). Forgetting to do this is a recurring papercut for newbies.

## The View Functions 

This view function renders the clock:
<code class="klipse-clojure">
(defn clock
  []
  (let [colour @(rf/subscribe [:time-color])
        time   (-> @(rf/subscribe [:time])
                    .toTimeString
                    (clojure.string/split " ")
                    first)]
  [:div.example-clock {:style {:color colour}} time]))
</code>

As you can see, it uses `subscribe` twice to obtain two pieces of data from `app-db`. 
If either value changes, reagent will automatically re-run this view function, 
computing new hiccup, which means new DOM.

Using the power of `klipse`, we can render just the `clock` component: 
<code class="klipse-reagent">
[clock]
</code>

When an event handler changes a value in `app-db`, `clock` will rerender. Try it. 
Uncomment the following `dispatch` to change the colour. 
<code class="klipse-clojure">
(comment (rf/dispatch  [:time-color-change "green"]))
</code>

And this view function renders the input field:
<code class="klipse-clojure">
(defn color-input
  []
  (let [gettext (fn [e] (-> e .-target .-value))
        emit    (fn [e] (rf/dispatch [:time-color-change (gettext e)]))]
    [:div.color-input
      "Display color: "
      [:input {:type "text"
               :style {:border "1px solid #CCC" }
               :value @(rf/subscribe [:time-color])        ;; subscribe
               :on-change emit}]]))              ;; <---
</code>

Notice how it does BOTH a `subscribe` to obtain the current value AND 
a `dispatch` to say when it has changed (look for `emit`). 

It is very common for view functions to render event-dispatching functions into the DOM.
The user's interaction with the UI is usually a large source of events.

Notice also how we use `@` in front of `subscribe` to obtain the value out of the subscription. It is almost as if the subscription is an atom holding a value (which can change over time). 

We can render the `color-input` as any other reagent component:
<code class="klipse-reagent">
[color-input]
</code>

And then there's a parent `view` to arrange the others. It contains no 
subscriptions or dispatching of its own:
<code class="klipse-clojure">
(defn ui
  []
  [:div
   [:h1 "The time is now:"]
   [clock]
   [color-input]])
</code>

!!! Note ""
    `view` functions form a hierarchy, often with 
    data flowing from parent to child via
    arguments (props in React). So, not every view needs a subscription if the 
    values passed in from a parent component are sufficient.

!!! Note ""
    `view` functions never directly access `app-db`. Data is 
    only ever sourced via subscriptions. 


## Kick Starting The App

Below, the function `run` is called to kick off the application once the HTML page has loaded.

It has two tasks:

1. Load the initial application state
2. Load the GUI by "mounting" the root-level  
   `view` - in our case, `ui` -
   onto an existing DOM element (with id `app`). 

<code class="klipse-clojure">
(defn mount-ui
  []
  (rdom/render [ui]                 ;; mount the application's ui
                  (js/document.getElementById "dominoes-live-app")))
(defn run
  []
  (rf/dispatch-sync [:initialize])     ;; puts a value into application state
  (mount-ui))
</code>

When it comes to establishing initial application state, you'll
notice the use of `dispatch-sync`, rather than `dispatch`. This is a simplifying cheat
which ensures that a correct
structure exists in `app-db` before any subscriptions or event handlers run. 

After `run` is called, the app passively waits for `events`. 
Nothing happens without an `event`.

<code class="klipse-clojure">
(run)
</code>

The run function renders the app in the DOM element whose id is `dominoes-live-app`: this DOM element is located at the top of the page. 
This is the element we used to show how the app looks at the top of this page

To save you the trouble of scrolling up to the top of the page, I decided to render the whole app as a 
reagent element, just here:

<code class="klipse-reagent">
[ui]
</code>

## T-Shirt Unlocked

Good news.  If you've read this far,
your insider's T-shirt will be arriving soon - it will feature turtles, 
[xkcd](http://xkcd.com/1416/) and something about "data all the way down". 
But we're still working on the hilarious caption bit. Open a
repo issue with a suggestion.

