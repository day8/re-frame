### Question

How do I load the data for a view on navigation to that view? 

### Don't Do This 

The broader React community often uses a "load data on mount" approach. They 
collocate queries with view components and initiate these queries (via a GET?)
within the View's componentDidMount lifecycle method. And then, later, perhaps they
cleanup/stop any database polling in componentWillUnmount.

This arrangement is not idiomatic for re-frame. Views are not imperative 
and they don't initiate database queries. Instead, views are simply a rendering of the 
current application state. 

Read more in [PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/)

### Do This Instead 

With re-frame, "imperative stuff" only ever happens because an event 
is dispatched. 

When the user clicks on a button or tab to change what is shown 
to them in the UI, an event is dispatched, and it is 
the associated event handler which will compute the 
effects of the user's request. It might:
  1. change application state so the panel is shown
  2. further change application state so that a "twirly busy" thing is shown
  3. issue a database query

Also, remember that events are meant to model "user intent", like 
"I'd now like to view overdue items". Be sure to never model events like
"load overdue items from database" because that's just a  
low level operation which might be performed in the service of fulfilling
the user's intent.

There's a useful effect handler available for HTTP work:
https://github.com/Day8/re-frame-http-fx

Look at the "Real World App" example for inspiration: 
https://github.com/gothinkster/clojurescript-reframe-realworld-example-app/blob/master/src/conduit/events.cljs


***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
