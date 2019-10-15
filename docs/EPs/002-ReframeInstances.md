## EP 002 - Multiple re-frame Instances  

> Status: Drafting. May be incoherent and/or wrong. Probably don't read.

### Abstract

This EP proposes changes to allow multiple
re-frame apps to coexist on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` on a page.
This design limitation simplifies the programmer's development
experience in 98.3% of usecases (yes, I just pulled that number out of my keyboard). 

But there are some problematic usecases: 
  1. when two or more instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances should coexist 
     - when unittesting, it might be useful to create re-frame "instances" serially, 
       use them, and then throw them away.
  2. when two or more instances of **different** re-frame apps need to coexist on the one page. Different, as in, 
     one is TodoMVC and the other is a MemeCreator.

The challenge is to facilitate these more complicated usecases 
while not, in the process, losing the current simplicity which is
enjoyed most of the time. 


### Global State As A Frame

Currently, re-frame has some global state in the form of various atoms scattered about internal namespaces. The best known is `app-db`. 

It would be completely straightforward to scoop up this state and 
put it into some sort of `defrecord` whole - let's call it `Frame` - and 
then allow the programmer to create instances of `Frame` when they
want to create a new instance of a re-frame app.

Imagine there's a new API function 
called `create-frame`, which creates a new instance of this 
`defrecord` `Frame` and that you can call it as often as you want 
to create as many re-frame apps as needed.

So, that was the easy bit.

### The Two Problems

Now the design work has to start in earnest and there's
two problems to solve:
  1. how to associate/register handlers with a `Frame`  
  2. within a view function, how to `subscribe`
     or `dispatch` from/to the right `Frame`

We'll start with problem #1.

### On Mutating registrars

A re-frame app is defined collectively by its handlers. As an app boots, 
calls to registration functions like `reg-event-db` and `reg-sub` 
collectively "build up" an app, infusing it with behaviour and capability.

This "building up" process currently involves  
progressive mutation of a global `registrar` (map) held internally within `re-frame`. 
Each registration adds a new entry to this `registrar`. 

If you are troubled by the thought of side effects on globals, there's 
an [FAQ entry you may find interesting](https://github.com/day8/re-frame/blob/master/docs/FAQs/ViewsOnGlobalRegistration.md).

### Problem 1:  Frames And Registrars

The first design challenge to explore is: what's the new relationship between 
`Frames` and `registrars`.

`re-frame` currently holds a global `registrar` of handlers, but in our new world,
where there are different `Frame` instances on a page, should each of these `Frames`
have its own `registrar` of handlers?  And, if so, how and when
should handlers be added to their `registrars`?

And, to support the developer experience, how should this 
work with `figwheel` reloads of namespace containing registrations? 
How should the `registrar` within a given `Frame` be updated?

Let's explore via usecases ...

In the usecase where there are multiple `Frames` on a page and they are 
all instances of the **same app** - for example, multiple TodoMVC apps - then all the
`Frames` will have an identical set of handlers. So there need be only one central
`registrar` (continue to use re-frame's global one?) and all `Frames` can look up 
handlers in this global `registrar`, and not hold one themselves. So continuing with 
a global registrar would work.

But there are harder usecases to contend with. Ones where 
there are many `Frames` on a page, but each is for a **different 
app**.
Imagine that one app on the page is TodoMVC and the other is a MemeCreator tool.
Each `Frame` needs a different set of handlers.
In which case, can we still put all handlers
into a central `registrar`?  Maybe. But it would "safer" if each app's `Frame` only had 
access to the subset of handlers specific to *that* app.

More ideas. Perhaps when registering a handler, the "package" to which it belongs can be nominated. 
Collections of related handlers would all belong to the same package.  So all of the 
handlers for `re-frame-undo` would be registered as part of the package `:re-frame-undo`.

And then, `create-frame` could, optionally, take a set of `packages` as an argument 
indicating which of them should be included/imported into the `Frame` being created.  Its almost as 
if we are `importing` packages of handlers into a `Frame`. 

Keep in mind that there are libraries of handlers. `re-frame-undo` is a library 
which has event handlers, subscription handlers, etc. So one `Frame` on a page 
might need to include the `package` of `re-frame-undo` handlers, but another 
`Frame` on the same page might not.

Alternatively, we could drop the notion of `:package` and simply work from the 
namespace of the registration `id`.

XXX Perhaps if the handler `ids` were organised into app-specific collections, a 
central registrar could work.  The collection mechanism could be as simple as insisting 
on `ids` with namespaces.  Or if ==t could be that registration puts handlers into `packages`.

And then, when we created a `Frame`, we'd need 
to indicate which of these "packages" (collections of handlers) should be 
"imported" into that `Frame`?

But keep in mind the need for updates to handlers being reloaded by figwheel (or the like). 
A `Frame` will need to "get" these updated handlers. 

And also k

### Problem 1 - Solutions

Registration calls (to `reg-event-db`, etc) could be adjusted to 
take an additional `Frame` argument. So, Handlers get registered "into" a `Frame`.



**Solution sketch #2**: all handlers are registered as they are now 
using `reg-event-db` etc, and are
stored (as now) in a central registrar (as now). But each handler belongs to a 
"package" (which defaults to `:default`). When a `frame` is created, you 
can, optionally, supply the `set of packages`. When the `Frame` is created 
all handlers in the nominated `packages` are injected into the 
`Frame`. If not set is provided, then all handlers are injected. 

At this point, I favour sketch #2 from a backwards compatibility 
point of view. It is the least disruptive. 

### Problem 2: Views, dispatch and subscription 

In an HTML page containing multiple `devcard` instances,
all for exactly the same app, there will be one `Frame`  
for each `devcard`.

In this scenario, how can a view know to which 
`Frame` it should `subscribe`? And to which `Frame` it should 
`dispatch`?

### Problem 2: Minimal Design Solution 

The "minimal design" approach is to say that 
`Frames` are passed as an argument into 
each view function, and then further passed down into 
child views, and so on, and so on.

Then, when using `dispatch` or `subscribe` a view will 
use the arg given to it called, say, `frame` like this:
`(dispatch frame [:event-id arg])`.

This approach is certainly simple. But it does get laborious
and tedious pretty quickly. Every view needs to accept a `frame`
and then pass it down to all children. Even intermediate

### Problem 2: Better Design Solution 



**Solution sketch #2**: Hack Reagent so that a given node in 
the hierarchy can "register" a Frame, and then provide a 
a way so that any given view can "query upwards" through its 
the parent/owner hierarchy of views 
looking for the `frame` to which it should subscribe and dispatch. 

**Solution sketch #3**: The Algebraic  Effects approach is to 
piggyback on React's `context` facility. `context` only works for simple values, so 
this path would passing down the `id` of the frame, and then 
looking it up.



### Problem

if we `subscribe` in a view, and that subscription needs to causes other subscriptions to be created, how to get at the associated frame at the point when we want to create the further subscriptions?

