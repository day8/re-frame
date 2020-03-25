## EP 001 - Better Capture Of Handler Metadata  

> Status: Drafting. May be incoherent and/or wrong. Don't read.

### Abstract 

This EP proposes changes to the way re-frame handlers are registered, 
to allow for the capture of richer handler metadata. 
These changes also lay the groundwork for tooling advances, and EPs to follow.


### Background  

re-frame's API currently includes 7 functions for registering handlers:
  - event: `reg-event-db`, `reg-event-fx` and `reg-event-ctx`
  - subscription: `reg-sub` and `reg-sub-raw`
  - effects: `reg-fx`
  - coeffects: `reg-cofx`
 
Two others are on the drawing board: 
  - `reg-view`
  - `reg-interceptor`
  
So, there are potentially 9 `kinds` of handlers.

Internally, re-frame manages registered handlers in a `registrar`, which is a two-level map, 
keyed at the first level by the `kind` of handler and, at the second level,\by the (keyword) 
`id` of the handler. The leaf values are the handler functions themselves.
 
 
## Introduction 

This EP proposes that:
  1. all current registration functions in the API be superseded by a new single macro `reg`
  2. the leaf nodes of the `registrar`, which are currently the handler functions themselves, 
     become instead a map of values related to the handler, 
     including a doc string, the file/line where defined, specs, etc, and, of course, 
     the handler itself.


## Motivations

There's pressure from multiple directions to collect and retain more metadata about handlers: 
  - tickets like [#457](https://github.com/day8/re-frame/issues/457) want docstrings for handlers
  - adding specs for events, so they can be checked at dev time
  - when re-frame becomes less of a framework and more of a library, handlers might 
    need be "grouped" into "packages". So "package" information about handlers need to be supplied and retained.
  - Tooling support - we'd like `re-frame-10x` to actively help programmers when they are learning a 
    new codebase. That's one of [the four stated goals](https://github.com/day8/re-frame-10x#helps-me-how). 
    Ideally, re-frame would be capable of providing tooling with "a complete 
    inventory" of an app's handlers, along with useful
    metadata on each handles. When an event is processed, the audit trail of 
    handlers involved should be rich with information.

## Macro

As part of the retained handler metadata, we'd like to automatically capture 
source code coordinates, like namespace and line number.
To make this happen, a macro will need to be introduced for registration, and that's a shift in 
approach because, until now, macros have been manfully resisted.

Introducing docstrings into registrations also encourages 
a macro solution because docstrings should be removed from 
production builds.

## Method 

A new macro `reg` will become the method 
of registering handlers. The existing 7 registration functions
will ultimately be deprecated.

`reg` will take one argument, a map, which captures all aspects of 
the handler. 

## Examples

Previously, `reg-event-db` was used like this:
```clj
(rf/reg-event-db 
   :event-id 
   (fn [db event]
     (assoc db :some :thing)))
```

now, use `reg` would be used like this:
```clj
(rf/reg
  {:kind  :event-db
   :id    :event-id 
   :fn    (fn [db event]
            (assoc db :some :thing))})
```

The map argument must contain the keys `:kind`, `:id` and `:fn`, 
with other valid keys being dependent on the `kind` of 
handler being registered.

The value `:kind` can be one these 7 (mapping to 7 existing `reg-*` functions): 
  - `:event-db` `:event-fx` `:event-ctx`
  - `:sub` `:sub-raw`
  - `:fx`
  - `:cofx`
  
Optionally, for all `kinds` of handlers the 
the map can also have these additional keys:
   - `:doc` a doc string
   - `:ns` the namespace where the handler was registered 
   - `:line` line number where the handler was registered
   - `:file` the name file where the handler was registered

In a dev build, the `reg` macro will supply the final 3 (source code coordinates), 
if not explicitly supplied in the map. 

In a production build, the `:doc` string will be elided, so we do not
appear in the final source code at all. 

The key `:pkg` is reserved for future use, and might eventually indicate the 
"package" to which this handler belongs. See EP 002. 

Other keys:  XXX
  - `:cept` for interceptors (when registering events)
  - `:ins` for input signals (when registering subscriptions)
  - `:ret` for return spec (subscriptions and events)
  - `:spec` for event spec (when registering events)  ???  Too much ??

XXX I'm not entirely happy about using short names like `:cept`.  But, then 
again, there's the aesthetics of formatting the code and lining things up.  

XXX could have a `:cofx` key for event handlers to make them more explicit. 

### Multiple Registrations

The argument to `reg` can also be a vector of maps to allow
for multiple handlers to be registered at once:

```clj 
(rf/reg
  [{:kind :event-db ...}
   {:kind :event-db ...}
   {:kind :event-fx ...}
   {:kind :sub ...])
```

Or maybe move the registration keyword outside the map, to avoid repetition. 

```clj 
(rf/reg :event-db 
  [{...}
   {...}
   {...}
   {...])
```

XXX maybe not needed. Provide the most minimal API? Then let towers of abstraction be built on top.

### Registrar 

Each entry stored in the registrar will become a map instead of just a handler. 

Map keys:
  - `:kind`  - somehow redundant 
  - `:id`
  - `:doc`
  - `:line`
  - `:ns`
  - `:doc`
  - `:fn` the handler
  
XXX look into reg-sub 

### Backwards Compatibility 

XXX

## Issues/Questions/Todos 

  - XXX implications for Cursive - it currently special-cases re-frame registration function -- give ColinF a heads up?? 
  - XXX Dear God, consider changes to documentation/tutorials 
  - XXX means giving up syntax sugar for reg-sub ?
  - XXX any format for `:doc` for display in HTML?  Or just texual. 



