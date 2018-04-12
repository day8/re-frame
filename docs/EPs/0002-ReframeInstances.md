## EP 002 - Multiple re-frame Instances  

> Status: Drafting. May be incorrehent and/or wrong. Don't read.

### Abstract

This EP proposes changes to allow more than one instance 
of a re-frame app to coexist on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` on a page.
This design limitation simplifies the programmer's development
experience in 98% of usecases.

But there are some problematic usecases: 
  1. when two instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances can coexist 
     - when unittesting, it might be useful to create re-frame "instances" serially, 
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


### On Lynching Mobs

A re-frame app is defined collectively by its handlers.

It is the many calls to registration functions like `reg-event-db` and `reg-sub` which 
collectively "build up" an app, infusing it with behaviour and capability.

This "building up" process happens via the progressive 
mutation of a global `registrar` (map) held internally within `re-frame`. That's 
where an `id` and its associated handler are `interned`.   

Egads! Say it isn't true. Mutation of a global? Summon the functional lynch mob!

Except, wait. Yes, we all know the dangers of mutation, 
particularly of globals, but `re-frame` handler registration 
is the same pattern as using `defn` to intern a symbol and
function in a namespace. 

Moving on.

### Problem 1: Associating Handlers With Frames

If there are different `Frame` instances on the one page, how then
should handlers be injected into the `registrar` within each of them?
Should there even be a `registrar` within a `Frame`?

And, more subtly, when figwheel reloads a namespace containing  
handler registrations, all existing `Frames` should be updated.
How to do this if each `Frame` contains its own `registrar`? 

In the case where all `Frames` on a page 
are instances of the **same app** - for example, multiple TodoMVC - then all the  
`Frames` could share the same set of handlers. Perhaps there is only one central
`registrar` (still use re-frame's one?) and all `Frames` lookup handlers in this global 
`registrar` and don't have one to themselves. That would work.

Well, not quite. More design is reqired when the `Frames` on the page are for **different 
apps** and each `Frame` instance needs a different set of handlers. 
Imagine that one app on the page is TodoMVC and the other is a MemeCreator tool.
The handlers for one should not be present in the other. Can we still put all handlers 
into a central `registrar`?  Maybe. 

If the handler `ids` are organised into collections, a 
central registrar could work.  The collection mechanism could be as simple as insisting 
on `ids` with namespaces.  Or if ==t could be that registration puts handlers into `packages`. 


And then, when we created a `Frame`, we'd need 
to indicate which of these "packages" (collections of handlers) should be 
brought together for that `Frame`? 

But keep in mind the need for updates as figwheel reloads handlers. Which `Frame`
should get which udpated handlers?

Also remember that there are libraries of handlers. `re-frame-undo` is a library 
which has event handlers, subsciption handlers, etc. How could one `Frame` on a page 
include handlers from this library, but another `Frame` not? 

### Problem 1 - Solutiuons


Registration calls (to `reg-event-db`, etc) could be adjusted to 
take an additional `Frame` argument. So, Handlers get registered "into" a `Frame`. 
 
But what to do if we have two `Frames` on a page? Does that mean a handler has to be
registered twice?   And what ahout using libraires 
like [`re-frame-http-fx`](https://github.com/Day8/re-frame-http-fx). Should 
frames explicitly  


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

In an HTML page containing multiple `devcard` instances,
all for exactly the same app, there will be one `Frame`  
for each `devcard`.

In this scenario, how can a view know to which 
`Frame` it should `subscribe`? And to which `Frame` it should 
`dispatch`?

### Problem 2: Minimal Design Solution 

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


