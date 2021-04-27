## EP 003 - Enabling Creation Of Reusable Components

> Status: Placeholder. Don't bother reading yet. 

### Abstract 

This EP proposes changes to facilitate easier use of React's Context feature. 
XXX to make it easier to write more complex Reusable components.  

### Background

React components form a tree, with values being passed down 
through the hierarchy in the form of `props`.  All very functional.

Except there are some problems:
  - it can be a PITA to pass every little bit of data through many, many layers. 
    Manual and time-consuming.
  - often we don't want to burden intermediate layers with knowledge about 
    what leaf nodes needed. That kind of "unnecessary knowing" leads to
    various kinds of fragility.
  - if we are using someone else's layout components, we may have not have
    control over what they pass to children.

[Algebraic Effects](http://math.andrej.com/eff/) are intended to help solve
these kinds of problems in a functional way, but that's not our world.

The solution available in React is called `Context`. It is a mechanism for allowing  
data to be "shared" globally within a given tree of React components
(without it needing for it to be passed/threaded through all layers of that tree).

[React's context docs are here](https://reactjs.org/docs/context.html).

### Components 

`re-com` is a library which supplies reusable Reagent widgets. And `widgets`, 
like a datepicker, are the simplest kind of components.

`re-com` components are reusability because they take `an input stream` of data
and they 

achieves reusablity by passing in values and supplying callbacks. This works at
the level of simple widgets. 
 
But re-frame components need to subscribe and dispatch.  

XXX talk about `dispatch back` rather than `callback`  

XXX need to identify the part of `app-db` on which `event handlers` and `subscriptions` should operate.  


