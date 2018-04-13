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
`defrecord` `Frame` and that you can call it as often as you want 
to create as many re-frame apps as needed.

So, that was the easy bit.

### The Two Problems

Now the design work starts in earnest and there's
two problems to solve:    
  1. how to associate handlers with a `Frame`  
  2. within a view fucntion, how to `subscribe`
     or `dispatch` from/to the right `Frame`

We'll start with problem #1.

### On Lynch Mobs

A re-frame app is defined collectively by its handlers.

It is the many calls to registration functions like `reg-event-db` and `reg-sub` which 
collectively "build up" an app, infusing it with behaviour and capability.

This "building up" process happens via the progressive 
mutation of a global `registrar` (map) held internally within `re-frame`. That's 
where an `id` and its associated handler are maintained.   

Egads! Say it isn't true. Mutation of a global? Summon the functional lynch mob!

Except, except ... yes, we all "get" the dangers of mutation, 
particularly of globals but, as a Clojure program starts, I note that we're happy enough allowing `defn` 
to `intern` a symbol and function in a structure representing a `namespace`. 
The lynch mob stays home for that. The pitch forks remain in their rack. 
 
So, I would put it to you that `re-frame` handler registration 
is exactly the same pattern - an `id` and `handler function` are interned in a `registrar`, 
once, on program load.

For more background on this thinking, read [On DSLs and Machines](https://github.com/Day8/re-frame/blob/master/docs/MentalModelOmnibus.md#on-dsls-and-machines). 
The registration process represents the act of creating the re-frame VM. 
 
I'm glad we've cleared that up. Moving on.

### Problem 1:  Frames And Registrars

The first design challenge to explore: what's the new relationship between 
`Frames` and `registrars`.

Currently, `re-frame` holds a global `registrar` of handlers.

But if there are to be different `Frame` instances on the one page, should each 
now have its own `registrar` of handlers? And, if so, how and when 
should handlers be injected into these `registrars`? 

And, more subtly, to support the dev experience, later, when figwheel reloads  
handler registrations, how would the `registrar` within a given `Frame` be updated?

Let's explore this via usecases ...

In the case where there are multiple `Frames` on a page and they are 
all instances of the **same app** - for example, multiple TodoMVC - then all the  
`Frames` will have an identical set of handlers. So there need be only one central
`registrar` (continue to use re-frame's global one?) and all `Frames` can look up 
handlers in this global `registrar`, and not hold one themselves. That would work.

But, not quite. More design is reqired when the usecase is harder. Imagine that 
there are many `Frames` on a page, but each is for a **different 
apps**. Each `Frame` instance would need a different set of handlers. 
Imagine that one app on the page is TodoMVC and the other is a MemeCreator tool.
The handlers for one should not be present in the other to even call accidentally.
Could we still put all handlers 
into a central `registrar`?  Maybe. But it would "safer" if each app's `Frame` only had 
access to the subset of handlers specific to its app. 

Perhaps if the handler `ids` were organised into app specific collections, a 
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


