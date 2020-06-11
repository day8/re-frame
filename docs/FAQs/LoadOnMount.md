
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

How do I load the data for a view, when the user navigates to that view? 

## For Javascript The Developer

Are you from the Javascript/React world?  If so, this first section is for you.

In re-frame, Components are functions. They compute a materialized view of values which are reactively delivered,  and they don't have state.

On the other hand, React has a more OO sense of Components. They are classes with state and behaviour.  And even React's more modern, so-called function components come with Hooks which are ordered, and often imperative and effectful. 

So, with respect to Components, re-frame and React are technically different.  But it is on a philosophical point that they differ the most:

- In re-frame, **Components are not causal**, they are reactive. 
- Whereas React Components are often deeply causal, via Collocated queries, ComponentDidMount, Hooks and Suspense, etc.  In React, Components initiate things - like HTTP requests.  
- In re-frame, ***it is events which are causal*** (never components).

### Why this difference?

>  Humans have a cognitive bias: "what is focal is presumed causal".  

Political leaders know this. They like presenting good news themselves because they like to 
be "seen" as causal of good stuff, but they'll get a press secretary to deliver bad news.
Movie directors know how to use this when framing their protagonists within the story.

Unfortunately, the React team have lost themselves in this bias. They keep trying to make the
most focal part of the system (components) also be the causal part. Please stop doing that! It is a mistake. Events are what's causal - they embody the user's intent.

Just to be clear, I love React.  What an utterly brilliant idea and great execution.
I'm deeply grateful because, wow!, did it change things.
It is just that I preferred React when it was only trying to be the V part of MVC. Everything since has been downhill. 

Perhaps read the further explanation in [PurelyFunctional.tv's writeup](https://purelyfunctional.tv/article/react-vs-re-frame/) under the heading "Reacters load data on mount". 

## Do This Instead 

With re-frame, imperative, effectful stuff only ever happens during the handling of an event. 

When the user clicks on a tab to change what is shown 
to them in the UI, an event is dispatched, and it is 
the associated event handler which will compute the 
effects of the user's request. That might include:

  1. change application state so the panel is shown
  2. further change application state so that a "twirly busy" thing is shown
  3. issue a database query or open a websocket

Also, remember that events should model "user intent", like 
"review overdue items". Be sure to never model events like
"load overdue items from database" because that's just a
low level operation performed in the service of fulfilling
the user's intent.

There's a useful effect handler available for HTTP work:
<https://github.com/day8/re-frame-http-fx>

Look at the "Real World App" example for inspiration: 
<https://github.com/jacekschae/conduit>


