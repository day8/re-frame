
<div class="sidebar secondary" style="width: 218px; left: 161px;">
    <h3 class="current">
        <a href="api-builtin-effects.html#top">
            <span class="inner">Builtin Effects</span>
        </a>
    </h3>
    <ul>
        <li class="depth-1">
            <a href="api-builtin-effects.html#db">
                <div class="inner">
                    <span>:db</span>
                </div>
            </a>
        </li>    
        <li class="depth-1">
            <a href="api-builtin-effects.html#fx">
                <div class="inner">
                    <span>:fx</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="api-builtin-effects.html#dispatch">
                <div class="inner">
                    <span>:dispatch</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="api-builtin-effects.html#dispatch-later">
                <div class="inner">
                    <span>:dispatch-later</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="api-builtin-effects.html#deregister-event-handler">
                <div class="inner">
                    <span>:deregister-event-handler</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="api-builtin-effects.html#dispatch-n">
                <div class="inner">
                    <span>:dispatch-n</span>
                </div>
            </a>
        </li>                            
    </ul>
</div>


# Builtin Effects

In addition to the API provided in `re-frame.core`, re-frame supplies a small number of 
built-in effects which also contribute to the API.

## Ordering

An event handler (registered via `reg-event-fx`) can return a map containing many effects. But maps have no inherent ordering. So, in what order will re-frame action effets?

For example, an event handler might return:
```clj 
{:dispatch [:some-id]
 :http     {:method :GET  :url "http://somewhere.com/"}
 :db       new-db}
``` 
Will the `:dispatch` effect be actioned before `:http`, and what about `:db`?

***Prior to v1.1.0***, the answer is: no guarantees were provided about ordering. Actual order is an implementation detail upon which you should not rely.

***From v1.1.0 onwards***, two things changed:

  - re-frame guaranteed that the `:db` effect will always be actioned first, if present. But other than that, no guarantee is given for the other effects.
  - a new effect called `:fx` was added, and it provides a way for effects to be ordered.

In fact, with v1.1.0 ***best practice changed*** to event handlers should only return two effects `:db` and `:fx`, in which case `:db` was always done first and then `:fx`, and within `:fx` the ordering is sequential. This new approach is more about making it easier to compose event handlers from many smaller functions, but more specificity around ordering was  a consequence. 

The new approach:
```clj
{:db new-db 
 :fx [...]    ;; <-- optional, contains one effect after another
```

Note: the latest, new method is backward compatible. All your existing code will continue to work (with `:db` always getting done first now).

## <a name="db"></a> :db

`reset!` `app-db` to be a new value. 

The associated `value` is expected to be a map. This is always
executed first before any other effect.

usage:
```clojure
{:db  {:key1 value1 key2 value2}}   
```

Normal usage would look like this: 
```clojure
(reg-event-fx
  : token 
  (fn [{:keys [db]} event]
    {:db  (assoc db :some-key some-val)}))     ;; <-- new value computed
```

> Note: when present, a `:db` effect will be actioned before other sibling effects. But prior to v1.1.0 this was not the case.

## <a name="fx"></a> :fx

An effect which actions other effects, sequentially. 

Expects a value which is a sequence, typically a vector. Each element in the sequence represents one effect. Each element is a 2-tuple of (1) an effect id and (2) the payload of the effect (the value given to the registered effect handler as an argument). 

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

## <a name="dispatch-later"></a> :dispatch-later

`dispatch` one or more events after a given delay. Expects a payload which is a 
map with two keys `:ms` (milliseconds) and `:dispatch` (the event).

usage:
```clj
{:db  new-db 
 :fx  [[:dispatch-later {:ms 200 :dispatch [:event-id "param"]}]]}  ;; dispatch in 200ms
```
   
## <a name="deregister-event-handler"></a> :deregister-event-handler

Removes a previously registered event handler. Expects either a single id
(typically a keyword), or a seq of ids.

usage:
```clojure
{:db new-db
 :fx [[:deregister-event-handler :my-id]])}
```

or:
```clojure
{:db new-db
 :fx [[:deregister-event-handler [:one-id :another-id]]]}
```

## <a name="dispatch-n"></a> :dispatch-n (Deprecated)

Deprecated in favour of `:fx` with multiple `:dispatch` tuples.

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
