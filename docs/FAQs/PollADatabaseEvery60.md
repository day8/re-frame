### Question

When the user switches to a certain panel, I'd like to kickoff a regular poll of my 
backend database - say every 60 seconds.
 
And, then later, when the user switches away from that panel, I want to stop that polling.

How do i do it?


### Before I Answer - An Architectural Note 

The boarder React community often uses the "load data from server on Component mount" 
model of architecture. They'll often collocate queries with view components and perform a 
GET (to the server) within the View's `componentDidMount`. 

This is not idiomatic re-frame. Views are not imperative in nature (they don't issue 
database queries), they simply provide a rendering of the current application state. 
For this and 
more browse [PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/)

Instead, re-frame is CQRS in nature - "stuff" only happens 
because of an `event`.  When the user clicks on a panel-changing widget,  
an event is dispatched, and it is the handler for this event which knows 
that X, Y and Z needs to happen  (assume one of these letters is "load data from server"). 

So, having got that out the way ... 
 
### An Answer 

We'll create an effect. It will general in nature. 

It will schedule and unschedule the regular dispatch of an event.  That 
event could do the server poll, or ... it could do other things. So  
this is effect could be used to achieve more than what was asked for 
in this FAQ. 

We must first design our `effect` - a data format (micro DSL) returned by an 
event handler, which specifies the scheduled/regular dispatch. To `:start` 
a regular dispatch, an event handler would return data in this format:
```clj
{:interval  {:action    :start
             :id        :panel-1-query     ;; my id for this (so I cancel later)
             :frequency 60000              ;; how many millisecsbetween dispatches 
             :event     [:panel-query 1]}} ;; what to dispatch 
```

And to later cancel the regular dispatch, an event handler would do this:
```clj
{:interval  {:action    :cancel
             :id        :panel-1-query}}   ;; my id for this (provided to :start)  
```

Now, register an effect handler for `:interval`:
```clj
re-frame.core/(reg-fx 
  :interval 
  (let [live-intervals (atom {})] 
    (fn [{:keys [action id frequency event]}]
      (if (= action :start) 
        (swap! live-intervals assoc id (js/setInterval #(dispatch event) frequency))) 
        (do (js/clearInterval (get live-intervals id)) 
            (swap! live-intervals dissoc id))))
```

You'd probably want a bit more error checking, but that's the (untested) sketch.


