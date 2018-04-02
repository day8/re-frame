## EP 001 - Better Capture Handler Metadata  

> Status: WIP. Incomplete

### Abstract 

This EP proposes changes to the way re-frame handlers are registered. These changes
lay the groundwork for tooling advances, and EPs to follow.


### Background  

At the time of writing, re-frame's API includes 7 functions for registering handlers:
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
  1. all current registration fucntions in th API be superceeded by a new single function `reg`
  2. that a new macro be introduces XXX
  2. the leaf nodes of the `registrar` which are currently just the handler function, 
     become instead a map of values related to the handler, 
     including a doc string, the file/line where defined, specs, etc, and, of course, 
     the handler itself.


## Motivation #1

There's preasure from multiple directions to collect and retain more metadata about handlers: 
  - see tickets like [#457](https://github.com/Day8/re-frame/issues/457) arguing for docstrings
  - adding a specs for events, so they can be checked at dev time?
  - when re-frame becomes less of a framework and more of a library, handler registrations will 
    likely be "grouped" into "packages". So that 'package' information about handlers will need to be 
    retained.

## Motivation #2A

We'd like tooling, like `re-frame-10x`, to help programmers when they are learning a 
new code base. That's one of [the four stated goals](https://github.com/Day8/re-frame-10x#helps-me-how). 

re-frame should be capable of providing these tools with "the complete 
inventory" of handlers available within an application. This would allow 
`re-frame-10x` to, for example, provide details for all handlers used in the processing 
of an event. 
 
## Motivation #2B

As part of this retained handler inventory, we'd like to capture 
the namespace and line number for each registered handler automatically.
This will necessitate the introduction of a macro for registrations. 
(Up until now, macros have been resisted)

## Method 

A new API registration macro `reg` will be added and  
it will become the prefered method of registering all handlers. 
The existing 7 registration functions will ultimately be deprecated.

`reg` will take one argument, a map, which defines all aspects of 
the handler. The argument can also be a vector of maps to allows
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

The key `:pkg` is reserved for future use, and will eventually indicate the 
"package" to which this handler belongs. See EP XXX. 

Other keys:  XXX
  - `:cept` for interceptors (when registering events)
  - `:ins` for input signals (when registering subscriptions)
  - `:ret` for return spec (subscriptions and events)
  - `:spec` for event spec (when registering events)  ???  Too much ??


### Code Coordinate Capture 

  - 

  
2-arity:  easy to replace
  - reg-fx
  - reg-cofx
  - reg-sub-raw

2-3-arity:
  - reg-event-db, reg-event-fx and reg-event-ctx
  XXX flatten and remove nils interceptors 
  XXX add special interceptors to beginning
  XXX in the end handler is just a vector of interceptors 
  
  
  
2-3-N-arity
  - reg-sub 
  
  
With one exception, `reg-sub`, all registration functions are 2-arity: they 
take an id and a handler fucntion.

```clj
(reg-event-db 
    :some-id)
    some-handler-fn)
```

An optional 3-arity version of all registration functions will be added,
one which takes an additional map argument, which can carry additional 
information about the registration.

```clj
(reg-event-db 
    :some-id
    {:file XXX
     :line XXX
     :doc  "doc string"}
    some-handler-fn)
    
OR   
```

```clj
(reg-event-db 
    :some-id
    {:file XXX
     :line XXX
     :doc  "doc"}
     :fn some-handler-fn})
```

### Stored 

Each entry stored in the registrar will become a map:

```clj
{:file f
 :line l 
 :doc  d
 :fn   f}
```

what about reg-sub XXX

### New Macros 
 
1. This proposal would create 7 mirror macros
2. Would change all registration functions so they take a dictionary 
   file, line, key, namespace, etc. 
 
While working on the design of re-frame-10x we've 


```clj
(reg-event-db 
    :keyword-id)
    {:file XXX
     :line XXX}
    (fn [db event]
       ....))
```

XXX One registration fucntion to Rule them all 

```clj
(rf/reg :event-db 
  :id   :event-id
  :doc  "something"
  :espec 
  :rspec 
  :fn   (fn [db event]
           ....))
```
           

(rf/reg :event-db     ;; others here might be `:fx`  `:sub`
  {:pkg   :re-frame/undo       ;; altnerative:  `:unit` `:scope`  `:pkg`  `:blundle` `:lot`  `:furl`
   :id    :some-id 
   :doc   "Some docs here" 
   :e-spec XXX
   :r-spec YYY
   :interceptors    [(path [:todos])]
   :fn   (fn [db v]
           ....)})
           
           
(rf/reg :view 
   :id  :item-viewer
   :ins (fn [])            ;; obtains dispatch, and context ... no need for subscribe not really needed  
   :fn  (fn [item ] 
          )
   )


[:item-viewer  item]


### Backwards Compatibility 


## Also 

XXX implications for Cursive ??
XXX how do we drop doc strings from production builds ???
XXX changes to documentation/tutorials
XXX means giving up syntax sugar for reg-sub ?  Or keep it and get macro to  



## Options Considered

Have `kind` lead befoer the rest of the map:
```clj
(rf/reg    :event-db        ;; :event-fx  :sub   :fx   :cofx
  {:id     :event-id 
   :ceptrs [(path [:a]) trimv]
   :fn     (fn [db event]
             (assoc db .....))})
```

Merge `kind` and `id` into one map entry:
```clj
(rf/reg  
  {:evt-db :event-id      ;; <-- merged
   :cepts  [(path [:a]) trimv]
   :fn     (fn [db event]
              (assoc db .....))})
```


`reg` could take an initial arg which identified the `kind`, removing a line:
```clj
(rf/reg  :event-db   ;; :event-fx  :sub   :fx   :cofx
  {:id    :event-id 
   :cepts [(path [:a]) trimv]
   :fn    (fn [db event]
            (assoc db .....))})

XXX map or named args?
XXX maps enable more than one at a time registration 
XXX what about just 

```clj
(rf/reg :event-db     ;; there is no `kind`
   :id    :event-id 
   :ceptrs [(path [:a]) trimv]
   :sig-fn 
   :fn   (fn [db event]
          (assoc db .....)))
```
