## Initial Code Walk-through

At this point in your reading, you are armed with:
 - a high level understanding of the 5 domino process (from re-frame's README)
 - an understanding of application state (from the previous tutorial) 
 
In this tutorial, **we'll look at re-frame code**.

### What Code?

This repo contains an `/example` application called "simple",
which has around 70 lines of code. We'll look at every line
and understand what it does.

You are currently about 50% the way to understanding re-frame. By the
end of this tutorial, you'll be at 70%, which is good
enough to start coding by yourself.

### What Does It Do?

This app:
 - displays the current time in a nice big font
 - provides a text input field into which you can type a hex colour code, 
   like "#CCC", for the time display
      
XXX screenshot

XXX How to run it

XXX path to code

### Namespace

Because this example is so "simple", the code is in a single namespace. 
Within it, we'll need access to both `reagent` and `re-frame`. 
So, we start like this: 
```clj
(ns simple.core
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))
```

### Data Schema

Generally, I'd strongly recommended you write a quality schema
for your application state (the data stored in `app-db`). But,
here, to minimise cognitive load, we'll cut that corner.

But we can't cut it completely. You'll still need an
informal description ... for this app `app-db` will contain
a two-key map like this:
```cljs
{:time       (js/Date.)    ;; current time for display
 :time-color "#f88"}       ;; what colour should the time be shown in
```

re-frame itself owns/manages `app-db` (see FAQ #1),
supplying the value within it (a two-key map in this case)
to your various handlers as required.

## Events (domino 1)

Events are data. You choose the format.

The re-frame reference implementation uses a vector
format for events. For example:
```clj
[:delete-item 42]
```

The first element in the vector identifies the `kind` of `event`. The
further elements are optional, and can provide additional data 
associated with the event. The additional value above, `42`, is 
presumably the id of the item to delete.

Here's some other example events:
```clj
[:yes-button-clicked]
[:set-spam-wanted false :continue-harassment-nevertheless-flag]
[:some-ns/on-success response] 
```

The `kind` of event is always a keyword, and for non-trivial 
applications it tends to be namespaced.  

**Rule**:  events are pure data. No dirty tricks like putting
callback functions on the wire. You know who you are.

### dispatch

To send an event, call `dispatch` with the event vector as argument: 
```clj
   (dispatch [:event-id  value1 value2])
```

In this "simple" app, a `:timer` event is sent every one second:
```clj
(defn dispatch-timer-event
  []
  (let [now (js/Date.)]
    (rf/dispatch [:timer now])))  ;; <-- dispatch used

;; call the dispatching function every second
(defonce do-timer (js/setInterval dispatch-timer-event 1000))
```
This is an unusual source of events. Normally, it is an app's UI widgets which 
`dispatch` events (in response to user actions), or an HTTP POST's 
`on-success` handler, or a websocket which gets a new packet.

### After dispatch 

`dispatch` puts an event into a queue for processing.

So, the event is not processed synchronously, like a function call. The processing
happens **later** - asynchronously. Very soon, but not now.

The consumer of the queue is a `router` which looks after the event's processing.

The `router`:
1. inspects the 1st element of an event vector
2. looks in a registry for the event handler which is **registered**
   for this kind of event
3. calls that event handler with the necessary arguments

As a re-frame app developer, your job then is to write and register a handler 
for each kind of event. 

## Event Handlers (domino 2)

Collectively, event handlers provide the control logic in a re-frame application.

In this "simple" application, 3 kinds of event are dispatched: 
  `:initialise`
  `:time-color-change`
  `:timer`
  
3 events means we'll be registering 3 event handlers.  

### reg-event-db

We register event handlers using re-frame's `reg-event-db`.

`reg-event-db` is used like this:
```clj
(reg-event-db
  :the-event-id
  the-event-handler-fn)
```
The handler function you provide should expect two parameters:
   - `db` the current application state
   - `v`  the event vector
    
So it will have a signature like this: `(fn [db v] ...)`. 

Each event handler must compute and return the new state of 
the application, which means it normally returns a
modified version of `db`. 

> **Note**: generally event handlers return `effects`. `reg-event-db` is used 
to register a certain kind of simple event handler, one where 
(1) the only inputs (`coeffects`) 
required for the computation are `db and `v`, and (2) the only `effect` 
returned is an update to app state. 

> There is a more sophisticated registration function called 
`reg-event-fx` which allows more varied `coeffects` and `effects`
to be computed. More on this soon. 

### :initialize

On startup, application state must be initialised. We
want to put a sensible value into `app-db`.

So a `(dispatch [:initialize])` will happen early in the 
apps life (more on this later), and we need to write an `event handler`
for it. 

Now this event handler is slightly unusual because it doesn't 
much care what the original `db` was, it just wants to plonk 
in a new complete value. 

Like this: 
```clj
(rf/reg-event-db              ;; sets up initial application state
  :initialize                 
  (fn [_ _]                   ;; the two parameters are not important here, so use _
    {:time (js/Date.)         ;; What it returns becomes the new application state
     :time-color "#f88"}))    ;; so the application state will initially be a map with two keys
```

This particular handler `fn` ignores the two parameters
(`db` and `v`) and simply returns 
a map literal, which becomes the application 
state.

Here's an alternative way of writing it: 
```clj
(rf/reg-event-db
  :initialize              
  (fn [db _]                 ;; we use db this time, so name it        
    (-> db          
      (assoc :time (js/Date.))
      (assoc :time-color "#f88")))
```

`app-db` starts off holding a `{}` value. So we assume `db` will be `{}` 
but, irrespective, we just assoc into it. 

### :timer

Earlier, we set up a timer function to `(dispatch [:timer ...])` every second.

Here's how we handle it: 
```clj
(rf/reg-event-db                 ;; usage:  (dispatch [:timer a-js-Date])
  :timer                         
  (fn [db [_ new-time]]          ;; <-- de-structure the event vector
    (assoc db :time new-time)))  ;; compute and return the new application state
```

Notes:
  1. the `event` will be like `[:timer a-time]`, so the 2nd `v` parameter 
     destructures to extract the `a-time` value
  2. the handler computes a new application state from `db`, and returns it

### :time-color-change

When the user enters a new colour value (via an input text box):
```clj
(rf/reg-event-db                
  :time-color-change            ;; usage:  (dispatch [:time-color-change 34562])
  (fn [db [_ new-color-value]]  
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state
```
  
## Effect Handlers (domino 3)

Domino 3 is about actioning the `effects` returned by event handlers.

In this "simple" application, our event handlers are implicitly returning 
only one effect: "please update application state". 

This particular `effect` is actioned by a re-frame supplied 
`effect handler`. **So, nothing for us to do.**

And this is not unusual. You'll seldom have to write `effect handlers`, but 
we'll understand more about them in a later tutorial.

## Subscription Handlers (domino 4)

In essence, subscription handlers take application state as an argument, 
and they compute and return a query over it.  So they return something of
a "materialised view" of that application state.

Subscription functions must be re-run when the application state changes, to 
compute new values. But re-frame looks after this for you.  All you need do is
write the query function.

The data returned by `query` functions is used ultimately
in the `view` functions (Domino 5). 

Each query is identified by an `id` XXXX

Now, the two examples below are utterly trivial. They just extract part of the application
state and return it. So, virtually no computation. More interesting 
subscriptions and more explanation can be found in the todomvc example.

`reg-sub` associates a `query id` with a function which computes
 that query. It's use looks like this: 
```clj
(reg-sub
  :some-query-id      ;; query identifier
  some-function)      ;; the function which will compute the query
```
If, later, we see a view function requesting data like this:
    `(listen [:some-query-id])`   ;; note use of `:some-query-id`     XXX using listen
then `some-function` will be used to perform the query over application state. 

Each time application state changes, `some-function` will be
called again to compute a new materialised view (a new computation)
and that new value will be given to any view function which is subscribed
to `:some-query-id`. The view function itself will then also be called again
to compute new DOM (because it depends on a query value which changed).

Along this reactive chain, re-frame will ensure the necessary calls are 
made, at the right time.

Here's the code:

```clj
(rf/reg-sub
  :time
  (fn [db _]     ;; db is current app state. 2nd unused param is query vector
    (:time db))) ;; return a query computation over the application state

(rf/reg-sub
  :time-color
  (fn [db _]
    (:time-color db)))
```

Like I said, both of these queries are trivial.

## View Functions (domino 5)

`view` functions transform application state  
into `Hiccup formatted` data.  Collectively, `view` 
functions  render the apps entire DOM.

`hiccup` is data which represent DOM. 

Here's a trivial view function:
 ```clj
(defn greet
  []
  [:div "Hello viewers"])
```

And if we call it:
```clj
(greet)
;; ==>  [:div "Hello viewers"]
```

XXX sourcing data. 

So view functions render a DOM representation of the application state, 
obtained by subscriptions. 

transform data into data. They source 
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
   {:style {:color @(rf/subscribe [:time-color])}}
   (-> (rf/listen [:time])
       .toTimeString
       (clojure.string/split " ")
       first)])

(defn color-input
  []
  [:div.color-input
   "Time color: "
   [:input {:type "text"
            :value @(rf/subscribe [:time-color])
            :on-change #(rf/dispatch [:time-color-change (-> % .-target .-value)])}]])  ;; <---

(defn ui
  []
  [:div
   [:h1 "Hello world, it is now"]
   [clock]
   [color-input]])
```

Naming: sub-val ???  sub-r

### Components Like Templates?

A `component` such as `greet` is like the templates you'd find in
Django, Rails, Handlebars or Mustache -- it maps data to HTML -- except for two massive differences:

  1. you have the full power of ClojureScript available to you (generating a Clojure data structure). The
     downside is that these are not "designer friendly" HTML templates.
  2. these templates are reactive.  When their input Signals change, they
     are automatically rerun, producing new DOM. Reagent adroitly shields you from the details, but
     the renderer of any `component` is wrapped by a `reaction`.  If any of the the "inputs"
     to that render change, the render is rerun.


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
