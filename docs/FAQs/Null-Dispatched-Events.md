
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

If I `dispatch` a js event object (from a view), it is nullified 
by the time it gets to the event-handler. What gives? 

```cljs
  :on-click  (fn [event] (dispatch [:clicked event]))
```

## Short Answer

If you want to `dispatch` a js event object to a re-frame 
event handler, you must call `(.persist event)` before the `dispatch`. 
React recycles events (using a pool), and re-frame event handlers 
run async.  [Find out more here](https://facebook.github.io/react/docs/events.html)
  
  
## Longer Answer

It is better to extract the salient details from the event 
and `dispatch` them, rather than the entire js event object. When you 
`dispatch` pure, simple ClojureScript data (ie. rather than js objects) testing 
and debugging will be easier. 

To put this point even more strongly again, think about it like this:

 - a DOM `on-click` `callback` might tell us "a button was clicked"
 - our application must then interpret that click. The click means 
   the user wanted to achieve something. They had "intent".
 - it is this "intent" which should be captured in the re-frame `event` 
   which is dispatched.  It is this intent which the event handler must 
   later facilitate.
   

So, in summary, re-frame view functions should transform DOM events 
into re-frame `events` which capture user intent: "a button was clicked"
becomes `user wants to delete item with id 42`

As a result, philosophically, low-level DOM objects have no place in an event.
