> Document is WIP 
<br>

> To understand how something works, figure out how to break it
>   -- N.N.Talib

All libraries/frameworks should come with a "what breaks this" section - this is that document for re-frame. 

The essence of science is earnestness of inquiry. 

> Eddington defined science as “the earnest endeavour to put into order the facts of experience” 

So what are we doing here?  Marketing (Narative warefare) for the re-frame framework or computer science. 

## Pros

  - is very productive 
    - has simple dynamics  (#1 importance)
    - you write your app in less lines of code (#2 importance)
    - sits in a sea of tranquility, compared to the technical churn elsewhere
    - best in breed hot reloading process, because of tooling and pervasive immutable data

  - it leverages 
    - pure functions
    - immutable data 
    - declarative style, useing data-based DSLs
    - a shockingly effective and beautiful language (50 years of refinement by the finest minds in computer science) 
    - React's entire ecosystem of components - although Hooks is starting to bimodalate (?word) the ecosystem.
    - full interop with js
    - reactive data flows
    - a data oriented design 
    - excellent tooling
       - shadow-clj and figwheel 
       - clj-devtools
       - re-frame-10x
       - Google's "Closure Compiler" (tree shaking) 

  Also benefits from:

  - acceptable performance
  - acceptable bundle size
  - is mature
  - is easily learned (sometimes Clojure itself can be an initial hurdle, if you don't know functional programming)
  - an enthusiastic community, video training and 3rd party libraries
  

  - re-frame-10x is only half finished. It is entirely useful and functional, but I'd love to take it the rest of the way. 
  - is functional and has a data oriented design  (has unique features)

It is Boringly simple



## Cons 


As the framework author, I should be a relentless chearleader, right?. The gyrations of my pompoms should be tecktonic.

But one of the best ways for me to help you, an evaluator of this framework, is explain where and how it doesn't work well? That's this section. 

Every design represents a point in design space, with pros and cons. The tradeoffs are the intersting bit.

So I'll do that now. 


I will not try to contrast re-frame with your other framework options. I wish I could provide you with
that, but to do that well, i would need deep knowledge of all the frameworks, and I don't know of
anyone who really has that. Certainly not me. I try to keep an eye on them, but by "deep knowledge"
I mean you need to have used it in anger, professionally for a couple of years. Anything less and 
the comparisions tend to be too shallow and misleading - which means: not unsful - particularly when they
are written by someone with a 



Rather than telling you what's awesome, I should take Talib's advice and tell you what breaks re-frame. What doesn't work. In that way you will know it better than any amount of "its so awesome". 

What breaks re-frame:

  - too many events - maybe a telemetary app?
  - if you want to use components which use React hooks
  - it might not be a good fit if your app is a very thin venier over a remote database, and forms dominate the process.  re-frame can do forms, but it is probably better when the UI get's more complex. 
  - I'm not sure the testing story is as strong as it could be. Mind you, it seems good enough that I haven't been tempted to improve it. 
  - A lot of chat with a server HTTP results in too many (we plan to fix this, but right now XXXX)
  - Server side rendering. Is possible if you use node, but other platforms, maybe not. 
  - We'd like a better FSM story 
  - framework vs library. 
  - dynamically typed



A Framework should be invisible and boring. So, where you notice it ... that's an example of it being broken.  Connection with server?? 


XXX I will say that I don't think React is on the right track with hooks, Suspense. React was at its best when it tried to be the `V` in `MVC`. 