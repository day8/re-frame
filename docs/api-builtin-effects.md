
<div class="sidebar secondary" style="width: 218px; left: 161px;">
    <h3 class="current">
        <a href="api-builtin-effects.html#top">
            <span class="inner">Builtin Effects</span>
        </a>
    </h3>
    <ul>
        <li class="depth-1">
            <a href="api-builtin-effects.html#dispatch-later">
                <div class="inner">
                    <span>:dispatch-later</span>
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
            <a href="api-builtin-effects.html#dispatch-n">
                <div class="inner">
                    <span>:dispatch-n</span>
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
            <a href="api-builtin-effects.html#db">
                <div class="inner">
                    <span>:db</span>
                </div>
            </a>
        </li>                                
    </ul>
</div>


# Builtin Effects


In addition to the API provided by `re-frame.core`, re-frame provides a small number of 
built-in effects which also contribute to the API. 


## <a name="dispatch-later"></a> :dispatch-later

`dispatch` one or more events after given delays. Expects a collection
of maps, each with two keys: `:ms` (milliseconds) and `:dispatch` (the event).

usage:
```clojure
{:dispatch-later [;; in 200ms do this: (dispatch [:event-id "param"])
                  {:ms       200
                   :dispatch [:event-id "param"]}
		          {:ms       100
		        :dispatch [:also :this :in :100ms]}]}
```

Note: `nil` entries in the collection are ignored which means events can be added
conditionally:
```clojure
{:dispatch-later [ (when (> 3 5) {:ms 200 :dispatch [:conditioned-out]})
                   {:ms 100 :dispatch [:another-one]}]}
```

## <a name="dispatch"></a> :dispatch

`dispatch` one event. Expects a single vector.

usage:
```clojure
{:dispatch [:event-id "param1" :param2] }
```
   
## <a name="dispatch-n"></a> :dispatch-n

`dispatch` more than one events. Expects a seq of event vectors (typically a list of them). 

usage:
```clojure
{:dispatch-n (list [:do :all] [:three :of] [:these])}
```

Notes:

  1. The events will be dispatched in the order provided. And, because events are handled FIFO, the events will subsequently be processed in the order provided.
  2. nils in the event collection are ignored which means events can be added
conditionally:

     ```clojure
     {:dispatch-n (list (when (> 3 5) [:conditioned-out])
                         [:another-one])}
     ```

## <a name="deregister-event-handler"></a> :deregister-event-handler

Removes a previously registered event handler. Expects either a single id
(typically a keyword), or a seq of ids.

usage:
```clojure
{:deregister-event-handler :my-id)}
```

or:
```clojure
{:deregister-event-handler [:one-id :another-id]}
```

## <a name="db"></a> :db

reset! app-db with a new value. `value` is expected to be a map.

usage:
```clojure
{:db  {:key1 value1 key2 value2}}
```

