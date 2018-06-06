### Question

I feel offended by re-frame's `reg-*` API.  How is it functional to side effect globally? 

### Background

A re-frame app is defined collectively by its handlers. As an app boots, calls to registration 
functions like `reg-event-db` and `reg-sub`
collectively "build up" an app, infusing it with behaviour and capability.

Currently, this "building up" process involves
progressive mutation of a global `registrar` (map) held internally within `re-frame`. 
Each registration adds a new entry to this `registrar`.

How should we analyse this from a functional point of view?

### Answer 

There's three ways to view this:

  1. Egads! Say it isn't true. Mutation of a global? Summon the functional lynch mob!
  
  2. In theory, top level side effects will introduce some pain points, 
     but re-frame's design represents a conscious decision to trade off 
     functional purity for simplicity of everyday developer experience. 
     So, yes, re-frame represents a point in 
     the possible design space, with associated pros and cons. But the cons tend to be 
     theoretical and the pros are real.  
     
  3. Actually, there's no purity problem! As a Clojure program 
     starts, each `defn` (becomes a `def` which) happily
     `interns` a symbol and function in [a map-ish structure](https://clojuredocs.org/clojure.core/ns-interns) representing a `namespace`. 
     The lynch mob stays home for that. The pitchforks remain in their rack. 
     `re-frame` handler registration 
     is the same pattern - an `id` and `handler function` are interned
     within a map-ish structure (a `registrar`), once, on program load.
     So, if you feel uncomfortable with what re-frame does, you should also feel uncomfortable about using `defn`.
     Also, it would be useful to understand 
     [how you are creating a virtual machine when you program re-frame](https://github.com/Day8/re-frame/blob/master/docs/MentalModelOmnibus.md#on-dsls-and-machines)   


While Point 3 is valid, and perhaps interesting to consider, the real discussion should be around 
points 1 and 2: is it a good idea for re-frame to tradeoff purity for simplicity?  You can't really 
judge this properly until you have used it and experienced the simplicity, and/or found pain points.
For most people it never comes up as a problem. 

-------- 

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
