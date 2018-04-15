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
  
  2. We all understand the potential dangers of mutation, particularly of globals
     but re-frame's design represents a conscious decision to trade off 
     some functional theory for simplicity of developer experience. 
     So, yes, it represents a point in 
     the possible design space with associated pros and cons. But the cons are 
     theoretical and the pros are real.  
     
  3. There's no purity problem. As a Clojure program 
     starts, each `defn` (becomes a `def` which) happily
     `interns` a symbol and function in [a map-ish structure](https://clojuredocs.org/clojure.core/ns-interns) representing a `namespace`. 
     The lynch mob stays home for that. The pitchforks remain in their rack. 
     `re-frame` handler registration 
     is the same pattern - an `id` and `handler function` are interned
     within a map-ish structure (a `registrar`), once, on program load.
     If you hate on what re-frame does, you should also hate on `defn`.
     I claim your discomfort only arises because you don't understand
     [how you are creating a virtual machine when you program re-frame](https://github.com/Day8/re-frame/blob/master/docs/MentalModelOmnibus.md#on-dsls-and-machines)   
   
-------- 

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
