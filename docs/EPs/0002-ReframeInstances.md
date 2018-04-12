## EP 002 - Multiple re-frame Instances  

> Status: Draft. WIP. Incomplete. Don't read.

### Abstract

This EP proposes changes to allow more than one instance 
of a re-frame app to coexist on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` on a page.
This design limitation simplifies the programmer's development
experience in 98% of usecases.

But there are problematic usecases: 
  1. when two instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances can coexist 
     - when unittesting, it might be useful to create re-frame "instances", 
       use them, and then throw them away.
  2. when **different** re-frame apps need to coexist on the one page. Different, as in, 
     completely different apps - like one is TodoMVC and the other is a meme creator. 

So, the challenge is to facilitate these more complicated usecases 
but, in the process, to not lose the current simplicity which is
enjoyed most of the time. 

### Global State As A Frame

re-frame has some global state in the form of various atoms scattered 
about internal namespaces. The best known is `app-db`. 

It would be completely straightforward to scoop up this state and 
put it into some sort of `defrecord` whole - let's call a `Frame` - and 
then allow the programmer to create instances of `Frame` when they  
want to create a new instances of a re-frame app.

Imagine that there's a new API function 
called `create-frame`, which creates a new instance of this 
`defrecord` `Frame` and you can use it to create as many re-frame apps 
as you want.

### The Two Problems

So, that was the easy bit.  Now the design work starts in earnest and there's
two problems to solve:    
  1. how to associate handlers with a `Frame`  
  2. within a view fucntion, how to `subscribe`
     or `dispatch` from/to the right `Frame`

### Problem 1: Associating Handlers

A re-frame app is defined collectively by its handlers.

It is the many calls to registration functions like `reg-event-db` and `reg-sub` which 
"build up" an app, infusing it with behaviour and capability.

So, if there are different `Frame` instances on the same page, how  
should handlers be "added into" one or more of them?

This is made easier if all `Frames` on the one page 
are instances of the same app - for example, if all the `Frames` were TodoMVC apps - 
because all `Frames` will share the same set of handlers. In this case, all the `Frames` 
can still use those handlers registered with a central "registrar". 

But more design is reqired when the `Frames` are for different 
apps - each instance needs a different set of handlers. The handlers for one `Frame`
should not be present in the other. Imagine that one app is TodoMVC and the other is
a meme creator tool.  Here, handlers have to be partitioned into independent 
collections, let's call them `packages`, and when we create a `Frame` we need 
to indicate which of these "packages" (collections of handlers) should be 
brought together.
  



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

At this point I favour sketch #2 from a backwards compatability 
point of view. It is the least disruptive from abackwards compatability.

### Problem 2: Views, dispatch and subscription 

In an HTML page, containing multiple `devcard` instances,
all for exactly the same app, there will be one `Frame`  
for each `devcard`.

In this scenario, how can a view know to which 
`Frame` it should `subscribe`? And to which `Frame` it should 
`dispatch`?

**Solution sketch #1**:

The "minimal design" approach is to say that 
`Frames` are passed as an arguement into 
each view function, and then further passed down into 
child views, and so on, and so on.

Then, when using `dispatch` or `subscribe` a view will 
use the arg given to it called, say, `frame` like this:
`(dispatch frame [:event-id arg])`.

This approach is certainly simple. But it does get labourious
and tedious pretty quickly. Every view needs to accept a `frame`
and every XXX further supply that frame to child 

**Solution sketch #2**: Hack Reagent so that a given node in 
the hierarchy can "register" a Frame, and then provide a 
way so that any given view can "query upwards" through its 
the parent/owner hierarchy of views 
looking for the `frame` to which it should subscribe and dispatch. 

**Solution sketch #3**: The Algebric Effects approach is to 
piggyback on React's `context` facility. `context` only works for simple values, so 
this path would passing down the `id` of the frame, and then 
looking it up.


