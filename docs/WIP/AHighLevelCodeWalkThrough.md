## An Initial Code Walk Through

Now you are armed with a high level, conceptual understanding
of the 5 domino process, and an understanding of application state, 
we'll look at some code.

All 80 lines of the "simple" example application is given below, 
in domino order, heavily annotated with explanation.

### What this App Does 

This app displays the time at second resolution. It also allows 
has one input field, into which you can input the colour to 
use in the display of the time. 
   
XXX screenshot

XXX How to run it

### Namespace

Because this example is so simple, all the code is in a single namespace. 
Within it, we'll need access to both `reagent` and `re-frame`. So, we start like this: 
```clj
(ns simple.core
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))
```

### Data Schema 

I recommended you always write a good quality schema for your application
state. But, here, I'm going to break my rule to keep things simple and stay 
focused on the domino code. 

Suffice it to say the application state for "simple" looks like this
map with two keys:
```cljs
{:time       (js/Date.)
 :time-color "#f88"}
```

Remember that re-frame holds/manages application state for you, 
supplying it to your various handlers when it is needed.

## Events (domino 1)

Events are data. You choose the format.

In our re-frame reference implementation we choose a vector 
format for events. For example:
```clj
[:delete-item 42]
```

The first element in the vector identifies the kind of event. The
further elements are optional, additional data associated with the event 
-- the additional value above (42) is presumably the id
of the item to delete.

Here are some other example events:
```clj
   [:yes-button-clicked]
   [:set-spam-wanted false :user-override "hello"]
   [:some-ns/on-success response] 
```

**Rule**:  events are pure data. No dirty tricks like putting callback functions on the wire.
You know who you are.

### dispatch

To send an event you call `dispatch` with the event as the argument: 
```clj
   (dispatch [:event-id  value1 value2])
```

In this "simple" app, a `:timer` event is sent every second:
```clj
(defn dispatch-timer-event
  []
  (let [now (js/Date.)]
    (rf/dispatch [:timer now])))

;; call the dispatching function every second
(defonce time-updater (js/setInterval dispatch-timer-event 1000))
```
This is a little unusual. Normally, it is an app's UI widgets which 
`dispatch` events (in response to user actions), or an HTTP POST's 
`on-success` handler, or a web socket which gets a new packet.

### After dispatch 

When `dispatch` is passed an event vector, it just puts that 
event onto a conveyor belt for processing.

The event is not processes synchronously. It happens **later**. 

The consumer on the end of the conveyor is a `router` which will organise for that
event to be processed by the right handler.


## Event Handlers (domino 2)

Collectively, event handlers provide the control logic in a re-frame application.

We must next register functions to "handle events". 

This application has three events, identified by keywords:
  :initialise
  :time-color-change
  :timer

Because there's 3 events, below you'll see 3 calls to `reg-event-db`, 
each registering a handler for an event, and each occurrence like this:
```clj
(reg-event-db
  :id-for-the-event
  function-to-handle-the-event)
```

An `event handler` registered via `reg-event-db` looks like this
`(fn [db v] ...)`. 
It takes two parameters, the current application state `db`
and the event vector `v` originally dispatched.

re-frame will ensure the right 

An event handler must compute and return the new state of 
the application, which means it normally returns a  
modified version of `db`. 

Below, you'll sometimes see the event handlers written:
```clj
(fn [db [_ something]]  <-- 2nd vec param destructured to get payload value
  ...)
``

Note: technically, an event handler return `effects`.  We're using
`reg-event-db` here which assumes the only `effect` required (for this event)
is a change to application state.  When you need to do other effects,
like sending emails, or http POSTing, or writing to localstore, you
would use the more sophisticated `reg-event-fx`  (note the trailing -fx) which
is described in more advanced tutorials. We're keeping it simple for the moment.

```clj
(rf/reg-event-db              ;; sets up initial application state
  :initialize                 ;; usage:  (dispatch [:initialize])
  (fn [_ _]                   ;; the two parameters are not important here, so use _
    {:time (js/Date.)         ;; What it returns becomes the new application state
     :time-color "#f88"}))    ;; so the application state will initially be a map with two keys


(rf/reg-event-db                ;; usage:  (dispatch [:time-color-change 34562])
  :time-color-change            ;; dispatched when the user enters a new colour into the UI
  (fn [db [_ new-color-value]]  ;; -db event handlers given 2 parameters:  current application state and event (a vector)
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state


(rf/reg-event-db                 ;; usage:  (dispatch [:timer a-js-Date])
  :timer                         ;; every second an event of this kind will be dispatched
  (fn [db [_ new-time]]          ;; note how the 2nd parameter is desctructure to obtain the data value
    (assoc db :time new-time)))  ;; compute and return the new application state
```

## Effect Handlers (domino 3)

Event handlers produce `effects` which have to be actioned. 

In this "simple" application, we're using the simplest kind of 
event handlers. They produce only one effect "please update application state". 

This is handled for us automatically by re-frame. Nothing for us to do. 

This is not unusual. You'll almost never have to write effect handlers, but 
we'll understand more about them in a later tutorial. 

## Subscription Handlers (domino 4)

These handlers are given application state as a parameter, and they 
perform a query (computation) over it, returning a "materialised view" 
of that state. 

These queries are used in the view functions which need to render 
DOM.

Now, the examples below are utterly trivial. They just extract part of the application
state and return it. So, virtually no computation. More interesting 
subscriptions and more explanation can be found in the todomvc example.

`reg-sub` associates a `query identifier` with a function which computes
 that query. It's use looks like this: 
```clj
(reg-sub
  :some-query-id      ;; query identifier
  some-function)      ;; the function which will compute the query
```
If ever a view requests data like this:
    `(listen [:some-query-id])`   ;; note use of `:some-query-id`
then `some-function` will be used to perform the query over applciation state
when a

Each time application state changes, `some-function` will be
called again to compute a new materialised view (a new computation)
and that new value will be given to any view function which is subscribed
to `:some-query-id`. The view function itself will then also be called again
to create new DOM (because it depends on a query value which changed).

re-frame will ensure the necessary calls are made, at the right time.

```clj
(rf/reg-sub
  :time
  (fn [db _]     ;; db is current app state. 2nd usused param is query vector
    (:time db))) ;; return a query computation over the application state

(rf/reg-sub
  :time-color
  (fn [db _]
    (:time-color db)))
```


## View Functions (domino 5)

This is where we render the application's UI using Reagent/React.  

As functions do, these `views` transform data into data. They source 
data from subscriptions (queries across application state), and 
the data they return is hiccup-formatted, which is a proxy for DOM.

Data -> HTML

They source data from:
  1. arguments   (aka props in the React world)
  2. queries which obtain data from the application state

Because of the 2nd source, these functions are not pure. XXX

Notice that color-input below does a `dispatch`. It is very common for UI widgets 
to be event-dispatching. The user interacting with the GUI is a major source of 
events.
 

```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color (rf/listen [:time-color])}}
   (-> (rf/listen [:time])
       .toTimeString
       (clojure.string/split " ")
       first)])

(defn color-input
  []
  [:div.color-input
   "Time color: "
   [:input {:type "text"
            :value (rf/listen [:time-color])
            :on-change #(rf/dispatch [:time-color-change (-> % .-target .-value)])}]])  ;; <---

(defn ui
  []
  [:div
   [:h1 "Hello world, it is now"]
   [clock]
   [color-input]])
```


## Kick Starting The App

Below, `run` is the function called when the HTML loads. It kicks off the
application.

It has two tasks:
  1. load the initial application state
  2. "mount" the GUI on an existing DOM element. Causes an initial render.

```clj
(defn ^:export run
  []
  (dispatch-sync [:initialize])     ;; puts a value into application state
  (reagent/render [ui]              ;; mount the application's ui into '<div id="app" />'
                  (js/document.getElementById "app")))
```

After `run` is called, the app passively waits for events. 
Nothing happens without an `event`.

When it comes to establishing initial application state, you'll 
notice the use of `dispatch-sync`, rather than `dispatch`.  This is
the synchronous 
