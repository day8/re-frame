## EP 002 - Multiple re-frame Instances  

> Status: WIP. Incomplete. Don't read.

### Abstract

This EP proposes changes to allow more than one instance 
of a re-frame app on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` on a page.
This limitation greately simplifies the programmer's
experience of re-frame in 99% of usecases.

But there are usecases where this is a problem: 
  1. when two instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances can coexist 
     - when unittesting, it might be useful to create re-frame "instances", 
       use them, and then throw them away.
  2. when **different** re-frame apps need to coexist on the one page. 

While these more advanced features are nice to have, the current 
simplicity is a must.
So, the challenge here is to facilitate these more complicated usecases 
but, in the process, to not lose the current simplicity which is
enjoyed most of the time. 

### Global State As A Frame

re-frame has some global state in the form of a few atoms scattered 
about internal namespaces. The best externally-known one of 
these is `app-db`. 

It would be completely straightforward to scoop up that state and 
put it into some sort of `defrecord` - let's call a `Frame` - and 
then allow the programmer to create instances of `Frame` when they  
want to create a new instances of a re-frame app.

Imagine that there's is a new API function 
called `create-frame` - use it to create as many re-frame instances
as you want.

That's the easy bit.  Now the design work starts in earnest. 
Two problems to solve:    
   - how to register handlers "into" a `Frame` (aka VM creation)
   - within a view fucntion, how to `subscribe`
     or `dispatch` from/to the right `Frame`.

### Building The re-frame VM

A re-frame app is defined collectively by its handlers.

It is the many calls to registration functions like `reg-event-db` and `reg-sub` which 
"build up" an app, infusing it with behaviour and function.

To support different `Frame` instances on the same page, how  
should handlers be registered with one or more of them?

The difficult usecase here is where there there are two or more
different apps on a page. Apps that share nothing. The handlers for one `Frame`
should not be present in the other.

**Solution sketch #1**: registration calls (`reg-event-db`, etc) 
apply to a `Frame`. Either the current functions, like `reg-event-db`
are checged to take a `Frame` argument OR a `Frame` has `reg-event-db`
method.  So each time you create a `Frame` you have to add all the 
handlers to it? And what about handlers in libraries 
like [`re-frame-http-fx`](https://github.com/Day8/re-frame-http-fx). 


**Solution sketch #2**: all handlers are registered as they are now 
using `reg-event-db` etc, and are
stored (as now) in a central registrar (as now). But each handler belongs to a 
"package" (which defaults to `:default`). When a `frame` is created, you 
can, optionally, supply the `set of packages`. When the `Frame` is created 
all handlers in the nominated `packages` are injected into the 
`Frame`. If not set is provided, then all handlers areinjected. 


Solution #2 has clear advantages. , If you had `devcards` on a Page you'd 

At this point I favour sketch #2 from a backwards compatability 
point of view. It is the least disruptive method.

### Views

Consider an HTML page containing multiple `devcard` instances. 
There will be one `Frame` for each `devcard`, with each `Frame`
for the same app.  

Now to the design puzzle: how can a given view know to which 
`Frame` it should `subscribe`? And to which `Frame` it should 
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


