### Question

When the user switches to a certain panel, I'd like to kickoff a regular poll of my 
backend (database) - say every 60 seconds.
 
And, then later, when the user switches away from that panel, I want to stop that polling.

How do I do it?


### First, An Architectural Note 

The broader React community often uses the "load data from server on Component mount" 
model of architecture. They'll collocate queries with view components and perform a 
GET (to the server) within the View's `componentDidMount`.

This approach is not idiomatic for re-frame. Views are not imperative in nature 
(they don't issue database queries), they simply render current application state. 
This and more 
[is discussed in PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/)

re-frame is CQRS in nature - "imperative stuff" only ever happens 
because of an `event`.  When the user clicks on a panel-changing widget (a button or a tab?),
an event is dispatched, and it is the event handler for this event which knows 
that action X, Y and Z needs to happen. X might be change application state so 
that the view displayed changes, Y might be change application state so that a
"twirly thing" is shown over the top, and Z might be to issue a database query. 

So, having got that out the way ... 
 
### Answer 

We'll create an effect. It will be general in nature. 

It will start and stop the timed/scheduled dispatch of an event. For this FAQ,
this event will poll the backend but this is a general pattern
and the regularly dispatched event could do anything we wanted.

We first create an `effect` called, say, `:interval`. We must 
design the data format (micro DSL) returned by an 
event handler for this effect. This data format must allow an event handler to 
start and stop a regular dispatch.

To `:start` a regular dispatch, an event handler would return 
data in this format:
```clj
{:interval  {:action    :start
             :id        :panel-1-query     ;; my id for this (so I cancel later)
             :frequency 60000              ;; how many millisecsbetween dispatches 
             :event     [:panel-query 1]}} ;; what to dispatch 
```

And to later cancel the regular dispatch, an event handler would return this:
```clj
{:interval  {:action    :cancel
             :id        :panel-1-query}}   ;; my id for this (provided to :start)  
```

Now, register an effect handler for `:interval`:
```clj
(re-frame.core/reg-fx 
  :interval 
  (let [live-intervals (atom {})] 
    (fn [{:keys [action id frequency event]}]
      (if (= action :start) 
        (swap! live-intervals assoc id (js/setInterval #(dispatch event) frequency))) 
        (do (js/clearInterval (get live-intervals id)) 
            (swap! live-intervals dissoc id))))
```

You'd probably want a bit more error checking, but that's the (untested) sketch.


