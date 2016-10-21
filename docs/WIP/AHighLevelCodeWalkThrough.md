## An Initial Code Walk Through

At this point, you are armed with:
 - a high level understanding of the 5 domino process (from the repo's README)
 - an understanding of application state (from the previous Tutorial) 
 
In this tutorial, **we'll write re-frame code**.

### What Code?

This repo contains an `/example` application called "simple",
which has around 70 lines of code. We'll look at every line
and understand what they do. 

You are currently about 60% the way to understanding re-frame. By the
end of this tutorial, you'll be about at around 80%, which is good
enough to start coding by yourself.

### What Does It Do?

This app:
 - displays the current time at second resolution in a nice big font
 - provides one text input field into which you can type a hex colour code, 
   like "#CCC", for the time display. 
      
XXX screenshot

XXX How to run it

XXX path to code

### Namespace

Because this example is so "simple", the code is in a single namespace. 
Within it, we'll need access to both `reagent` and `re-frame`. So, we start like this: 
```clj
(ns simple.core
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))
```

### Data Schema 

I recommended you always write a quality schema for your application
state. But, here, to keep things simple, I'm going to break that rule 
and stay focused on the domino functions only. 

Suffice it to say the application state for "simple" looks like this
map with two keys:
```cljs
{:time       (js/Date.)
 :time-color "#f88"}
```

re-frame holds/manages application state for you, 
supplying it to your various handlers when it is needed.

## Events (domino 1)

Events are data. You choose the format.

In our re-frame reference implementation, we choose a vector 
format for events. For example:
```clj
[:delete-item 42]
```

The first element in the vector identifies the kind of event. The
further elements are optional, and can provide additional data 
associated with the event. The additional value above, `42` is presumably the id
of the item to delete.

Here's some other example events:
```clj
[:yes-button-clicked]
[:set-spam-wanted false :continue-harassment-nevertheless-flag]
[:some-ns/on-success response] 
```

**Rule**:  events are pure data. No dirty tricks like putting
callback functions on the wire. You know who you are.

### dispatch

To send an event, you call `dispatch` with the event vector as argument: 
```clj
   (dispatch [:event-id  value1 value2])
```

In this "simple" app, a `:timer` event is sent every one second:
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
event into a queue for processing.

So, the event is not processed synchronously, like a function call. The processing
happens **later** - asynchronously. Very soon, but not now.

The consumer on the end of the `dispatch` queue is a `router` which
will organise for the event to be processed by the right `event handler`.

The `router`:
1. inspects the 1st element of an event vector
2. looks in a registry for the event handler which is **registered**
   for this kind of event
3. calls that event handler with the right arguments  

As a re-frame app developer, your job then is to write and register a handler 
for each kind of event. 

## Event Handlers (domino 2)

Collectively, event handlers provide the control logic in a re-frame application.

In this "simple" application, 3 kinds of event are dispatched: 
  `:initialise`
  `:time-color-change`
  `:timer`
  
Because there's 3 events, below we'll register 3 event handlers.  

### reg-event-db

We register event 
handlers using re-frame's `reg-event-db`.

`reg-event-db` is used like this:
```clj
(reg-event-db
  :id-for-the-event
  function-to-handle-the-event)
```
The handler function you provide should expect two parameters:
   - `db` the current application state
   - `v`  the event vector
    
So it will have a signature like this: `(fn [db v] ...)`. 

It must compute and return the new state of 
the application, which means it normally returns a
modified version of `db`. 

> **Note**: event handlers return `effects`. `reg-event-db` is used 
when (1) the only inputs (`coeffects`) 
required for the computation are `db and `v`, and (2) the only `effect` 
returned is an update to app state. 

> There is a more sophisticated registration function called 
`reg-event-fx` which allows more varied `coeffects` and `effects`
to be computed. More on this soon. 

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

This particular handler `fn` ignores the two parameters
(`db` and `v`) and simply returns 
a map literal, which becomes the application 
state. Later, we'll see how to `dispatch` this event early in the app's startup. 

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
  1. the 2nd `v` parameter is destructured to extract the `new-time` value
  2. the handler computes a new application state from `db`, and returns it

### And Another

When the user enters a new colour value (via an input text box):
```clj
(rf/reg-event-db                
  :time-color-change            ;; usage:  (dispatch [:time-color-change 34562])
  (fn [db [_ new-color-value]]  
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state
```
  
## Effect Handlers (domino 3)

Domino 3 is about actioning the `effects` returned by event handlers.

In this "simple" application, our event handlers only return 
one effect: "please update application state". 

This particular `effect` is actioned by a re-frame supplied 
`effect handler`. Nothing for us to do. 

And this is not unusual. You'll seldom have to write `effect handlers`, but 
we'll understand more about them in a later tutorial.

## Subscription Handlers (domino 4)

In essence, subscription handlers take application state as an argument, 
and they compute and return a query over it.  So they return something of
a "materialised view" of that application state.

Subscription functions must be re-run when the application state changes, to 
compute new values. But re-frame looks after this for you.  All you need do is
write the query. 

The data returned by these `query` functions is used 
in the `view` functions (Domino 5) which render DOM.

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

Here's teh code:

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
into `Hiccup formatted` data.  `view` 
functions collectively render the entire DOM.

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
