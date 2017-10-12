### Question

When the user switches to a particular panel, I'd like to start regularly polling my 
backend (database) - say every 60 seconds.  And, then later, when the user switches 
away from that panel, I want to stop that polling.

### First, An Architectural Note 

The broader React community often uses a "load data on mount" approach. 
They collocate queries with view components 
and initiate these queries (via a GET?) within the View's `componentDidMount` lifecycle method.
And then, later, they might cleanup/stop any database polling in `componentWillUnmount`.

This arrangement is not idiomatic for re-frame. Views are not imperative and 
they don't initiate database queries. Instead, views simply render current application state.
[Read more in PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/)

With re-frame, "imperative stuff" only ever happens
because an `event` is dispatched.  When the user clicks on a panel-changing widget 
(perhaps a button or a tab?),
an event is dispatched, and it is the event handler associated with this event which 
computes the effects of the user's action. First, it might change application state so 
the panel is shown, and then it might further change application state so that a
"twirly busy" thing is shown and, finally, it might issue a database query.

So, having got that issue out the way ... 
 
### An Answer 

We'll create an effect. It will be general in nature. 

It will start and stop the timed/scheduled dispatch of an event. 
For this FAQ,
we want an event dispatched every 60 seconds and each event will
trigger a backend poll, but the effect we are about to create 
will be useful well beyond this narrow case. 

We'll be creating an `effect` called, say, `:interval`. So, event handlers 
will be returning: 
```clj
  {:interval  <something>}
```
So now we design the `<something>` bit. It will be a data format (DSL) which
allows an event handler to start and stop a regular event dispatch.

To `:start` a regular dispatch, an event handler would return 
data in this format:
```clj
{:interval  {:action    :start
             :id        :panel-1-query     ;; my id for this (so I can cancel later)
             :frequency 60000              ;; how many ms between dispatches 
             :event     [:panel-query 1]}} ;; what to dispatch 
```

And to later cancel the regular dispatch, an event handler would return this:
```clj
{:interval  {:action    :cancel
             :id        :panel-1-query}}   ;; the id provided to :start  
```

With that design work done, let's now implement it by registering an 
`effect handler`: 
```clj
(re-frame.core/reg-fx        ;; the re-frame API for registering effect handlers
  :interval                  ;; the effect id
  (let [live-intervals (atom {})]                 ;; storage for live intervals
    (fn [{:keys [action id frequency event]}]     ;; the handler
      (if (= action :start) 
        (swap! live-intervals assoc id (js/setInterval #(dispatch event) frequency))) 
        (do (js/clearInterval (get @live-intervals id)) 
            (swap! live-intervals dissoc id))))
```

You'd probably want a bit more error checking, but that's the (untested) sketch.

### A Side Note About Effect Handlers and Figwheel 

[Figwheel](https://github.com/bhauman/lein-figwheel) provides for the hot reloading of code, which 
is terrific.

But, during development, as Figwheel is reloading code, effectful handlers, like the 
one above, can be get into a messed up state - existing timers might be lost (and 
become never-stoppable). 

Stateful things are grubby in the face of reloading, and all we can do is 
try to manage for it as best we can, on a case by case basis.

One strategy is to put all your grubby effect handlers into their own 
separate namespace `effects.cljs` - one that isn't edited often, removing 
the trigger for a Figwheel reload. 

OR, you can code defensively for reloading, perhaps like this:
```clj
(defonce interval-handler                ;; notice the use of defonce
  (let [live-intervals (atom {})]        ;; storage for live intervals
    (fn handler [{:keys [action id frequency event]}]     ;; the effect handler
      (condp = action
         :clean   (doseq                ;; <--- new. clean up all existing 
                     #(handler {:action :end  :id  %1}) 
                     (keys @live-intervals))
         :start   (swap! live-intervals assoc id (js/setInterval #(dispatch event) frequency))) 
         :end     (do (js/clearInterval (get @live-intervals id)) 
                      (swap! live-intervals dissoc id))))

;; when this code is reloaded `:clean` existing intervals
(interval-handler {:action :clean})

;; now register            
(re-frame.core/reg-fx        ;; the re-frame API for registering effect handlers
  :interval                  ;; the effect id
  interval-handler)
```

**Key takeaway:**  every effect handler is statefully grubby in its own special way. So you'll have to 
come up with strategies to handle Figwheel reloads on a case by case basis. Sometimes
there's no escaping an application restart.


***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

