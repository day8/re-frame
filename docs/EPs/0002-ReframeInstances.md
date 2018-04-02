## EP 002 - Multiple re-frame Instances  

> Status: WIP. Incomplete

### Abstract

This EP proposes changes to allow more than one instance 
of re-frame app on the same (HTML) page.
 
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

Simplicity is a must.  The more advanced features are nice to have.

So, the challenge here is to facilitate these harder, more complicated usecases 
but, in the process, to not lose the currently simplicity which is enjoyed most of the time. 

### Global State As A Frame

re-frame has some global state in the form of a few atoms. 

It would be completely straightforward to scoop up that state and 
put it into somesort of defrecord - let's call each "a frame object" - and 
then allow the programmer to create instances of such "frame", to 
create instances of a re-frame app.

That's the easy bit.  Let's imagine that there is a new piece of API 
called: `create-frame`

What requires more design, thought and tradeoffs is: 
   - VM creation - bringing together the right combination of handlers 
   - within a view fucntions, knowing to which "frame" a given `subscribe`
     or `dispatch` applies. 

### Building The re-frame VM

A re-frame app is defined by its handlers.

It is all the calls to registration functions like `reg-event-db` and `reg-sub` which collectively
"build up" an app, and it is these handlers which give the app its behaviour.

So, if we are to support different apps on the same page, how then 
to have handlers register themselves with different "frames"?

How then, for example, to have the `undo` library in one app, but not in another,
on the same page?  Or include an effects handler in one app, but not the other. 



### Views 

have to dispatch to a frame 
have to subscribe from a frame 





But it is hard to make it simple, 
and it carries the risk of making the normal usercase more complicated. 

 
Scooping up the global variables in easy, but using these instances 
turns out to impose a burden on the programmer creating simple applications.  

By the author's priority is deliver an easy mental model for
the programmer, and all approaches involving instances seem to add
too much complexity for the occasional
benifit they deliver. The tradeoff has never seemed to warrant the
functional snobbery.


### Packages  

The hard thing is to have more than one "app" on a page at once. 

Registration of handlers is tricky. 

A re-frame app is defined by the set of handlers. 

How do you get isolation.



