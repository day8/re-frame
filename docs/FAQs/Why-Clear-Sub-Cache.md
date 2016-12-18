### Question

Why do we call `clear-subscription-cache!` when reloading code with Figwheel?

### Answer 

Pour yourself a drink, as this is a circuitous tale involving one of the hardest
problems in Computer Science.
 
**1: Humble beginnings**

When React is rendering, if an exception is thrown, it doesn't catch or 
handle the errors gracefully. Instead, all of the React components up to 
the root are destroyed. When these components are destroyed, none of their 
standard lifecycle methods are called, like `ComponentDidUnmount`.
 

**2: Simple assumptions**

Reagent tracks the watchers of a Reaction to know when no-one is watching and 
it can call the Reaction's `on-dispose`. Part of the book-keeping involved in
this requires running the `on-dispose` in a React `ComponentWillUnmount` lifecycle
method.

At this point, your spidey senses are probably tingling.

**3: The hardest problem in CS**

re-frame subscriptions are created as Reactions. re-frame helpfully deduplicates
subscriptions if multiple parts of the view request the same subscription. This
is a big efficiency boost. When re-frame creates the subscription Reaction, it 
sets the `on-dispose` method of that subscription to remove itself from the
subscription cache. This means that when that subscription isn't being watched
by any part of the view, it can be disposed. 

**4: The gnarly implications**

If you are 

1. Writing a re-frame app 
2. Write a bug in your subscription code (your one bug for the year)
3. Which causes an exception to be thrown in your rendering code

then:

1. React will destroy all of the components in your view without calling `ComponentWillUnmount`.
2. Reagent will not get notified that some subscriptions are not needed anymore.
3. The subscription on-dispose functions that should have been run, are not.
4. re-frame's subscription cache will not be invalidated correctly, and the subscription with the bug
   is still in the cache.

At this point you are looking at a blank screen. After debugging, you find the problem and fix it.
You save your code and Figwheel recompiles and reloads the changed code. Figwheel attempts to re-render
from the root. This causes all of the Reagent views to be rendered and to request re-frame subscriptions
if they need them. Because the old buggy subscription is still sitting around in the cache, re-frame
will return that subscription instead of creating a new one based on the fixed code. The only way around
this (once you realise what is going on) is to reload the page.

**5: Coda**

re-frame 0.9.0 provides a new function: `re-frame.core/clear-subscription-cache!` which will run the
on-dispose function for every subscription in the cache, emptying the cache, and causing new subscriptions
to be created after reloading.

***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
