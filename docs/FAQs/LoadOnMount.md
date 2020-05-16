
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

How do I load the data for a view, on navigation to that view? 

## Just Don't

Are you from the React world?  If so, this first section is for you. I'm going to start by attempting to disabuse you of some "problematic" React ideas. We need to be clear about what Components are and do. And, also, what they aren't and don't do.  

In re-frame, Components are functions, not classes. They compute a materialized view of reactively delivered values. They don't have state.  (And, yes, there are exceptions to every rule)

React has a more OO sense of Components: they have state and behavior.  And even React's more modern, function components come with Hooks which are ordered, and sometimes imperative and effectful. 

So, re-frame and React are different philosophically regarding Components.  But there is one point above all others on which they differ the most:

- In re-frame, **Components are not causal**, they are reactive. 
- Whereas React Components are often deeply causal, via Collocated queries, ComponentDidMount, Hooks and Suspense, etc.  In React, Components initiate things - like HTTP requests.  
- In re-frame, ***it is events which are causal***. 

So the difference is over what is causal. 

>  We humans have a cognitive bias: "what is focal is presumed causal".  

Political leaders know this. They like presenting good news themselves, because they like to be seen as causal of good stuff, but they'll get a press secretary to deliver bad news. Movie directors know how to use this when framing their protagonists.

Unfortunately, it seems to me that the React team have lost themselves in this bias. They seem intent on trying to make the most visual part of the system (the most focal part) also be the most causal. Bad idea, IMHO.

Just to be clear, I love React.  What an utterly brilliant idea and a great execution. I'm deeply grateful because, wow!, did it change things.  It is just that I preferred React when it was only trying to be the V part of MVC. 

Perhaps read the further explanation in [PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/) under the heading "Reacters load data on mount". 

## Do This Instead 

With re-frame, "imperative stuff" only ever happens because an event 
is dispatched.

When the user clicks on a button or tab to change what is shown 
to them in the UI, an event is dispatched, and it is 
the associated event handler which will compute the 
effects of the user's request. It might:

  1. change application state so the panel is shown
  2. further change application state so that a "twirly busy" thing is shown
  3. issue a database query or open a websocket

Also, remember that events should model "user intent", like 
"I'd now like to view overdue items". Be sure to never model events like
"load overdue items from database" because that's just a
low level operation performed in the service of fulfilling
the user's intent.

There's a useful effect handler available for HTTP work:
<https://github.com/day8/re-frame-http-fx>

Look at the "Real World App" example for inspiration: 
<https://github.com/jacekschae/conduit>


