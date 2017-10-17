
## Talking To Servers 

This page describes how a re-frame app might "talk" to a backend HTTP server.

We'll assume there's a json-returning server endpoint 
at "http://json.my-endpoint.com/blah". We want to GET from that 
endpoint and put a processed version of the returned json into `app-db`. 

## Triggering The Request

The user often does something to trigger the process. 

Here's a button which the user could click: 
```clj
(defn request-it-button
  []
  [:div {:class "button-class"
         :on-click  #(dispatch [:request-it])}  ;; get data from the server !!
         "I want it, now!"])
```

Notice the `on-click` handler - it `dispatch`es the event `[:request-it]`.

## The Event Handler

That `:request-it` event will need to be "handled", which means an event handler must be registered for it.

We want this handler to:
  1. Initiate the HTTP GET
  2. Update a flag in `app-db` which will trigger a modal "Loading ..." message for the user to see
  
We're going to create two versions of this event handler.  First, we'll create a
problematic version of the event handler and then, realising our sins, we'll write
a second version which is a soaring paragon of virtue. Both versions 
will teach us something.


### Version 1

We're going to use the [cljs-ajax library](https://github.com/JulianBirch/cljs-ajax) as the HTTP workhorse.

Here's the event handler: 
```clj
(ns my.app.events                   ;; <1>
   (:require [ajax.core :refer [GET]]
             [re-frame.core :refer [reg-event-db]))

(reg-event-db        ;; <-- register an event handler
  :request-it        ;; <-- the event id
  (fn                ;; <-- the handler function
    [db _]
   
    ;; kick off the GET, making sure to supply a callback for success and failure
    (GET
      "http://json.my-endpoint.com/blah"
      {:handler       #(dispatch [:process-response %1])   ;; <2> further dispatch !!
       :error-handler #(dispatch [:bad-response %1])})     ;; <2> further dispatch !!
      
     ;; update a flag in `app-db` ... presumably to cause a "Loading..." UI 
     (assoc db :loading? true)))    ;; <3> return an updated db 
```

Further Notes:
  1. Event handlers are normally put into an `events.cljs` namespace
  2. Notice that the GET callbacks issue a further `dispatch`. Such callbacks 
   should never attempt to close over `db` themselves, or make
   any changes to it because, by the time these callbacks happen, the value 
   in `app-db` may have changed.  Whereas, if they `dispatch`, then the event 
   handlers looking after the event they dispatch will be given the latest copy of the db.
  3. event handlers registered using `reg-event-db` must return a new value for 
   `app-db`.  In our case, we set a flag which will presumably cause a "Loading ..."
   UI to show.

### Successful GET

As we noted above, the on-success handler itself is just
`(dispatch [:process-response RESPONSE])`.  So we'll need to register a handler
for this event too.

Like this:
```clj
(reg-event-db                   
  :process-response             
  (fn
    [db [_ response]]           ;; destructure the response from the event vector
    (-> db
        (assoc :loading? false) ;; take away that "Loading ..." UI 
        (assoc :data (js->clj response))))  ;; fairly lame processing
```

A normal handler would have more complex processing of the response. But we're 
just sketching here, so we've left it easy.

There'd also need to be a handler for the `:bad-response` event too.  Left as an exercise.

### Problems In Paradise? 

This approach will work, and it is useful to take time to understand why it 
would work, but it has a problem:  the event handler isn't pure.  

That `GET` is a side effect, and side effecting functions are like a 
well salted paper cut. We try hard to avoid them.

### Version 2 

The better solution is, of course, to use an effectful handler. This 
is explained in detail in the previous tutorials: [Effectful Handlers](EffectfulHandlers.md) 
and [Effects](Effects.md).  

In the 2nd version, we use the alternative registration function, `reg-event-fx` , and we'll use an 
"Effect Handler" supplied by this library 
[https://github.com/Day8/re-frame-http-fx](https://github.com/Day8/re-frame-http-fx).
You may soon feel confident enough to write your own.
 
Here's our rewrite:

```clj
(ns my.app.events                  
   (:require
      [ajax.core :as ajax]        
      [day8.re-frame.http-fx]  
      [re-frame.core :refer [reg-event-fx]))

(reg-event-fx        ;; <-- note the `-fx` extension
  :request-it        ;; <-- the event id
  (fn                ;; <-- the handler function
    [{db :db} _]     ;; <-- 1st argument is coeffect, from which we extract db 
   
    ;; we return a map of (side) effects
    {:http-xhrio {:method          :get
                  :uri             "http://json.my-endpoint.com/blah"
                  :format          (ajax/json-request-format)
                  :response-format (ajax/json-response-format {:keywords? true}) 
                  :on-success      [:process-response]
                  :on-failure      [:bad-response]}
     :db  (assoc db :loading? true)}))
```

Notes:
  1. Our event handler "describes" side effects, it does not "do" side effects
  2. The event handler we wrote for `:process-response` stays as it was
  
  
  
***

Previous:  [Loading Initial Data](Loading-Initial-Data.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Subscribing to External Data](Subscribing-To-External-Data.md)  



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
