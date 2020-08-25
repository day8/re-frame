# Builtin Effects

In addition to the API provided in `re-frame.core`, re-frame supplies a small number of 
built-in effects which also contribute to the API.

## Ordering

An event handler (registered via `reg-event-fx`) can return a map containing many effects, but maps are unordered. So, in what order will re-frame action effects?

For example, if an event handler returned:
```clj 
{:dispatch [:some-id]
 :http     {:method :GET  :url "http://somewhere.com/"}
 :db       new-db}
``` 
Will the `:dispatch` effect be actioned before `:http`, and what about `:db`?

!!! tip "Prior to v1.1.0"
    re-frame provided no guarantees regarding ordering. It was an implementation
    detail on which you couldn't rely.

!!! tip "From v1.1.0 onwards"
    two things changed:
    
    - re-frame guarantees that the `:db` effect will be actioned first, if present. But there remains no guarantee for other effects.
    - a new effect, called `:fx`, is added. It allows you to specify an ordered sequence of effects.

With v1.1.0 ***best practice*** probably changed: an event handler should return only two effects `:db` and `:fx`. The `:db` effect will be actioned first, and then `:fx`, but within `:fx` effects will be actioned in the sequence provided. The true reason for this change is that it makes it easier to compose event handlers from a number of smaller functions, but it incidently also allowed more specificity around ordering. So that was a bonus. 

So, the new approach encourages effects to be something like:
```clj
{:db new-db 
 :fx [...]}   ;; <-- optional, contains one effect after another
```

## <a name="db"></a> :db

`reset!` `app-db` to be a new value. 

The associated `value` is expected to be a map. This is always
actioned first, before any other effect.

usage:
```clojure
{:db  {:key1 value1 key2 value2}}   
```

Real usage might look like this: 
```clojure
(reg-event-fx
  :token 
  (fn [{:keys [db]} event]
    {:db  (assoc db :some-key some-val)}))     ;; <-- new value computed
```

## <a name="fx"></a> :fx

An effect which actions other effects, sequentially. 

Expects a value which is a sequence, typically a vector. 
Each element in the sequence represents one effect. 
Each element is a 2-tuple of (1) an effect id and (2) the payload of the effect (the value ultimately given to the registered effect handler as an argument). 

For example:
```clj
{:db  new-db 
 :fx  [[:dispatch   [:some-id]]
       [:http-xhrio {:method :GET  :url "http://somewhere.com/"}]
       (when (> 2 3) [:some-effect-id  some-payload])]}
```

You'll notice the use of `when` to conditionally include or exclude an effect. Any `nil` found in the `:fx` sequence will be ignored. 

## <a name="dispatch"></a> :dispatch

`dispatch` one event. Expects a single vector.

usage:
```clojure
{:fx [[:dispatch [:event-id "param1" :param2]]] }
```

Dispatch multiple events:
```clojure
{:fx [[:dispatch [:event1 "param1" :param2]]
      [:dispatch [:second]]}
```

## <a name="dispatch-later"></a> :dispatch-later

`dispatch` one or more events after a given delay. Expects a payload which is a 
map with two keys `:ms` (milliseconds) and `:dispatch` (the event).

usage:
```clj
{:db  new-db 
 :fx  [[:dispatch-later {:ms 200 :dispatch [:event-id "param"]}]]}  ;; dispatch in 200ms
```

!!! warning "Deprecation"
    Prior to re-frame v1.1.1 `:dispatch-later` required a collection of maps, 
    since v1.1.1 it has required a single map. 

Multiple with `:fx` introduced in re-frame v1.1.1:
```clojure
{:fx [[:dispatch-later {:ms 200 :dispatch [:event-id "param"]}]
      [:dispatch-later {:ms 100 :dispatch [:event-id "param"]}]]}
```

Or deprecated variation prior to re-frame v1.1.0
```clojure
{:dispatch-later [{:ms 200 :dispatch [:event-id "param"]}
                  {:ms 100 :dispatch [:event-id "param"]}]}
```

   
## <a name="deregister-event-handler"></a> :deregister-event-handler

Removes a previously registered event handler. Expects the id of the event handler. 

usage:
```clojure
{:db new-db
 :fx [[:deregister-event-handler :my-id]])}
```


## <a name="dispatch-n"></a> :dispatch-n (Deprecated)

This effect is deprecated in favour of using `:fx` with multiple `:dispatch` tuples.

`dispatch` more than one events. Expects a seq of event vectors (typically a list of them). 

usage:
```clojure
{:db new-db
 :fx [[:dispatch-n (list [:do :all] [:three :of] [:these])]]}
```

Notes:

  1. The events will be dispatched in the order provided. And, because events are handled FIFO, the events will subsequently be processed in the order provided.
  2. nils in the event collection are ignored which means events can be added
conditionally:

     ```clojure
     {:db new-db
      :fx [[:dispatch-n (list (when (> 3 5) [:conditioned-out])
                           [:another-one])]]}
     ```
