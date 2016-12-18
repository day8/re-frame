### Question

If I `dispatch` a js event object (from a view), it is nullified 
by the time it gets to the event-handler. What gives? 

### Answer

So there's two things to say about this:
- if you want to `dispatch` a js event object to a re-frame 
  event handler, you must call `(.persist event)` before the `dispatch`. 
  React recycles events (using a pool), and re-frame event handlers 
  run async.  [Find out more here](https://facebook.github.io/react/docs/events.html)
  
- it is probably more idiomatic to extract the salient data from the event 
  and `dispatch` that, rather than the js event object itself. When you 
  `dispatch` pure, simple cljs data (ie. rather than js objects) testing 
  and debugging will become easier. 
  
  
***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
