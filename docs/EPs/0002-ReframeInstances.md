## EP 002 - Multiple re-frame Instances  

> Status: WIP. Incomplete. Don't read.

### Abstract

This EP proposes changes to allow more than one instance 
of a re-frame app on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` at a time on a page.
This limitation greately simplifies the programmer's
experience of re-frame in 99% of usecases.

But there are usecases where this is a problem: 
  1. when two instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances can coexist 
     - when unittesting, it might be useful to create re-frame "instances", 
       use them, and then throw them away.
  2. when **different** re-frame apps need to coexist on the one page. 

While the more advanced features are nice to have, simplicity is a must.
So, the challenge here is to facilitate these more complicated usecases 
but, in the process, to not lose the currently simplicity which is
enjoyed most of the time. 

### Global State As A Frame

re-frame has some global state in the form of a few atoms. 

It would be completely straightforward to scoop up that state and 
put it into somesort of defrecord - let's call each "a frame object" - and 
then allow the programmer to create instances of such "frame", to 
create instances of a re-frame app.

That's the easy bit.  Let's imagine that there is a new piece of API 
called `create-frame` which created a `defrecord` which captured all 
that state. Easy. 

But the moment there's potentially more than one frame, the design  
problem shifts to:  
   - registering handlers "into" a frame (aka VM creation)
   - within a view fucntions, accessing the right "frame" so as to `subscribe`
     or `dispatch`. 

### Building The re-frame VM

A re-frame app is defined collectively by its handlers.

It is the many calls to registration functions like `reg-event-db` and `reg-sub` which 
"build up" an app, infusing it with behaviour and function.

If we are now to support different `frames` on the same page, how  
should handlers be registered with one or more of these `frames`?

Solution sketch #1: all registration calls take another argument which is 
the `frame` into which they should be registered?  If so, what 
about effect handlers, like handlers in libraries like [`re-frame-http-fx`](https://github.com/Day8/re-frame-http-fx). 
They can't know of the app `fraems` into which they'll eventually be 
used. Maybe the library provides a "inject all my handlers" kinda
function which takes a `frame` argument?  Maybe?  Getting a bit
disruptive to existing code bases. 

Solution sketch #2: all handlers are registered into a central 
place, as is currently the case. Each handler belongs to a 
"package" (defaults to `:default`) which can be supplied at 
registrration time. When a `frame` is created, it takes the 
`set of packages` which should be injected into it (to be found in 
the central registrar). When you create the `frame` you 
are "pulling together" all the namespaces/packages to form 
a functioning app.  Of course, by default, you get all handlers
registered, which means this is all very backwards compatable. 

At this point I favour sketch #2 from a backwards compatability 
point of view. It is the least disruptive method.

Remember: the hard usecase is the one where there are two 
distinct apps on a page. They share nothing.  

### Views

Consider a page containing multiple `devcards` on the one page. 
There will be one `frames` for each devcard, each frame for the 
same app.  

Now to the design puzzle: how will a given view know to which 
`frame` it should `subscribe`? And to which frame should it 
`dispatch`?

**Solution sketch #1**: the `frame` is passed as an arguement to 
each view function.  And then down into child view functions. 
Certainly very functional. But laborious. Every single time. 
Every single view. And not at all what is done now, so 
disruptive. A lot of work, for the few times needed. 

**Solution sketch #2**: Hack Reagent so that any given view can 
"reach up" through parent hierarchy of views looking for a `frame` to which it
can subscribe and dispatch. This avoids the horror of having 
to pass frames everywhere. 

**Solution sketch #3**: Similar to #2, except piggyback on React's
`context` facility. `context` only works for simple values, so 
this path would passing down the `id` of the frame, and then 
looking it up.


