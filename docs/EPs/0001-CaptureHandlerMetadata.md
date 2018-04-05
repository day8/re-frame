## EP 001 - Better Capture Of Handler Metadata  

> Status: WIP. Incomplete. Don't read.

### Abstract 

This EP proposes changes to the way re-frame handlers are registered, 
to allow for the capture of richer handler metadata. 
These changes also lay the groundwork for tooling advances, and EPs to follow.


### Background  

re-frame's API currently includes 7 functions for registering handlers:
  - reg-event-db, reg-event-fx and reg-event-ctx
  - reg-sub and reg-sub-raw
  - reg-fx
  - reg-cofx
 
Two others are on the drawing board: 
  - reg-view
  - reg-interceptor
  
So there are potentially 9 `kinds` of handlers.

Internally, re-frame manages registered handlers in a `registrar`, which is a two level map, 
keyed at the first level by the `kind` of handler and at the second level by the (keyword) 
`id` of the handler. The leaf values are the handler functions themselves.
 
 
## Introduction 

This EP proposes that:
  1. all current registration fucntions in th API be superceeded by a new single macro `reg`
  2. the leaf nodes of the `registrar` which are currently just the handler function, 
     become instead a map of values related to the handler, 
     including a doc string, the file/line where defined, specs, etc, and, of course, 
     the handler itself.


## Motivations

There's preasure from multiple directions to collect and retain more metadata about handlers: 
  - tickets like [#457](https://github.com/Day8/re-frame/issues/457) argue for handler docstrings
  - adding specs for events, so they can be checked at dev time
  - when re-frame becomes less of a framework and more of a library, handler registrations might 
    need be "grouped" into "packages". So that "package" information about handlers will need to be 
    retained.

We'd like `re-frame-10x` to actively help programmers when they are learning a 
new code base. That's one of [the four stated goals](https://github.com/Day8/re-frame-10x#helps-me-how). 
Ideally, re-frame would be capable of providing tooling with "a complete 
inventory" of all handlers available within an application, along with useful
metadata on these handlers. When an event is processed, the audit trail of 
handlerd involved should be rich with information.
 
## Macro?

As part of the retained handler metadata, we'd like to capture 
the namespace and line number for each registered handler automatically.
This will necessitate the introduction of a macro for registrations. 
(Up until now, macros have been resisted)

Introducing docstrings into registrations also pushes us towards 
a macro solution because we'd like to remove the docstring in production 
builds.

## Method 

A new API registration macro `reg` will be added and  
it will become the prefered method of registering all handlers. 
The existing 7 registration functions will ultimately be deprecated.

`reg` will take one argument, a map, which captures the handler aspects of 
the handler. 

The argument to `reg` can also be a vector of maps to allow
for multiple handlers to be registered at once.

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

The map argument must contains the keys `:kind`, `:id` and `:fn`, 
with other valid keys being dependent on the `kind` of 
handler being registered.

The value `:kind` can be one these 7 (mapping to 7 existing `reg-*` functions): 
  - `:event-db` `:event-fx` `:event-ctx`
  - `:sub` `:sub-raw`
  - `:fx`
  - `:cofx`

Optionally, for all `kinds` of handlers the map can have these additional keys:
   - `:ns` the namespace where the handler was registered 
   - `:line` line number where the handler was registered
   - `:file` the name file where the handler was registered
   - `:doc` a doc string

The key `:pkg` is reserved for future use, and will eventually indicate the 
"package" to which this handler belongs. See EP XXX. 

Other keys:  XXX
  - `:cept` for interceptors (when registering events)
  - `:ins` for input signals (when registering subscriptions)
  - `:ret` for return spec (subscriptions and events)
  - `:spec` for event spec (when registering events)  ???  Too much ??

XXX I'm not too happy about using short names like `:cept`.  But, then 
again, there's the asthetics of formatting the code and lining things up.  


### Registrar 

Each entry stored in the registrar will become a map instead of just a handler. 

XXX

XXX look into reg-sub 


### Backwards Compatibility 

XXX

## Consider 

XXX implications for Cursive - it currently special-cases re-frame registration function -- give him a leads up??
XXX dear god, consider changes to documentation/tutorials
XXX means giving up syntax sugar for reg-sub ?



