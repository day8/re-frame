## An Initial Code Walk Through

At this point, you are now armed with both:
 - a high level understanding of the 5 domino process (the repo README)
 - an understanding of application state  (the previous ApplicationState doc)
 
You are about 60% the way to understanding re-frame.

In this tutorial, we'll look at some code which will get us to about 80% knowledge.

We'll be looking at real example application from
this repo. It is only 60 lines of code, but there's
plenty of surrounding explanation.

### What It Does

This app:
 - displays the current time at second resolution in a nice big font
 - provides one text input field into which you can type a hex colour code, 
   like "#CCC", for the time display. 
      
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
state. But, here, to keep things simple, I'm going to break my own rule 
and stay focused on the domino code only. 

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

In our re-frame reference implementation, we choose a vector 
format for events. For example:
```clj
[:delete-item 42]
```

The first element in the vector identifies the kind of event. The
further elements are optional, additional data associated with the event 
-- the additional value above, `42` is presumably the id
of the item to delete.

Here's some other example events:
```clj
   [:yes-button-clicked]
   [:set-spam-wanted false :continue-harassment-nevertheless]
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
    (rf/dispatch [:timer now])))  ;; <--- dispatch used

;; call the dispatching function every second
(defonce time-updater (js/setInterval dispatch-timer-event 1000))
```
This arrangement is a little unusual. Normally, it is an app's UI widgets which 
`dispatch` events (in response to user actions), or an HTTP POST's 
`on-success` handler, or a web socket which gets a new packet.

### After dispatch 

When `dispatch` is passed an event vector, it just puts that 
event onto a conveyor belt for processing.

So, the event is not processed synchronously, like a function call. The processing
happens **later** - asynchronously.

The consumer on the end of the `dispatch` conveyor is a `router` which
will organise for that event to be processed by the right `event handler`.

The `router`:
1. inspects the 1st element of the arriving event vector
2. look in its registry for the event handler which is registered for this kind of event
3. it calls that event handler. 

As a re-frame app developer, your job is to write and register a handler 
for each kind of event. 

## Event Handlers (domino 2)

Collectively, event handlers provide the control logic in a re-frame application.

This "simple" application has three events, identified by keywords:
  `:initialise`
  `:time-color-change`
  `:timer`
  
Because there's 3 events, below you'll see 3 handler registrations. 

### reg-event-db

For this simple application, we will register handlers using re-frame's `reg-event-db`.

`reg-event-db` is used like this:
```clj
(reg-event-db
  :id-for-the-event
  function-to-handle-the-event)
```
The handler you supply should expect two parameters:
   - `db` the current application state
   - `v`  the event vector
    
So the function being registered is expected to have a signature like this: `(fn [db v] ...)`. 

It must compute and return the new state of 
the application, which means it normally returns a
modified version of `db`. 

### Init

Here's a very simple example: 
```clj
(rf/reg-event-db              ;; sets up initial application state
  :initialize                 
  (fn [_ _]                   ;; the two parameters are not important here, so use _
    {:time (js/Date.)         ;; What it returns becomes the new application state
     :time-color "#f88"}))    ;; so the application state will initially be a map with two keys
```
So, when `(dispatch [:initialize])` happens, the handler function registered above will
be called. 

This handler `fn` ignores the two parameters (`db` and `v`) and it simply returns 
a map literal, which will become the first application 
state. Later, we'll see how we `dispatch` this event early in the app's startup. 

### Another example:

Remember earlier, we set up a timer function to `(dispatch [:timer ...])` every second?

Let's now register the event handler for this `event`:
```clj
(rf/reg-event-db                 ;; usage:  (dispatch [:timer a-js-Date])
  :timer                         
  (fn [db [_ new-time]]          ;; <-- de-structure the event vector
    (assoc db :time new-time)))  ;; compute and return the new application state
```

Notes:
  1. the `v` parameter is destructured to extract the `now` value
  2. the handler computes a new application state, and returns it


### And Another

When the user enters a new colour value (via an input text box):
```clj
(rf/reg-event-db                
  :time-color-change            ;; usage:  (dispatch [:time-color-change 34562])
  (fn [db [_ new-color-value]]  
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state
```


> **Note**: technically, event handlers return `effects`. `reg-event-db` 
assumes (1) the only inputs (coeffect) 
required for the computation are db and v, and (2) the only effect 
returned are an update to app state. 

> There is a more sophisticated registration method called 
`reg-event-fx` which allows more varied coeffects and effects to be computed. More later. 
  
## Effect Handlers (domino 3)

Event handlers produce `effects` and domino 3 is about actioning them. 

In this "simple" application, we're using the simplest kind of 
event handlers which return only one effect "please update application state". 

This `effect` is actioned for by a re-frame supplied `effect handler`. Nothing for us to do. 

And this is not unusual. You'll seldom have to write `effect handlers`, but 
we'll understand more about them in a later tutorial.

## Subscription Handlers (domino 4)

These handlers are given application state as a parameter, and they 
perform a query (computation) over it, returning a "materialised view" 
of that state.

The data from these queries are later used in the view functions which need to render 
DOM.

Now, the two examples below are utterly trivial. They just extract part of the application
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
    `(listen [:some-query-id])`   ;; note use of `:some-query-id`     XXX using listen
then `some-function` will be used to perform the query over application state. 

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


## Summary

**Your job**, when building an app, is to: 
 - design your app's information model (data and schema layer)
 - write and register event handler functions  (control and transition layer)  (domino 2)    
 - (once in a blue moon) write and register effect and coeffect handler 
   functions (domino 3) which do the mutative dirty work of which we dare not 
   speak in a pure, immutable functional context. Most of the time, you'll be 
   using standard, supplied ones.
 - write and register query functions which implement nodes in a signal graph (query layer) (domino 4)
 - write Reagent view functions  (view layer)  (domino 5)
 
re-frame's job is to XXX
