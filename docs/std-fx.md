
<div class="sidebar secondary" style="width: 218px; left: 161px;">
    <h3 class="current">
        <a href="#top">
            <span class="inner">Builtin Effects</span>
        </a>
    </h3>
    <ul>
        <li class="depth-1">
            <a href="#dispatch-later">
                <div class="inner">
                    <span>:dispatch-later</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="#dispatch">
                <div class="inner">
                    <span>:dispatch</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="#dispatch-n">
                <div class="inner">
                    <span>:dispatch-n</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="#deregister-event-handler">
                <div class="inner">
                    <span>:deregister-event-handler</span>
                </div>
            </a>
        </li>
        <li class="depth-1">
            <a href="#db">
                <div class="inner">
                    <span>:db</span>
                </div>
            </a>
        </li>                                
    </ul>
</div>


# Builtin Effects

## <a name="dispatch-later"></a> :dispatch-later

`dispatch` one or more events after given delays. Expects a collection
of maps with two keys: `ms` and `:dispatch`

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
{:dispatch [:event-id "param"] }
```
   
## <a name="dispatch-n"></a> :dispatch-n

`dispatch` more than one event. Expects a list or vector of events. Something for which
`sequential?` returns true.

usage:
```clojure
{:dispatch-n (list [:do :all] [:three :of] [:these])}
```

Note: `nil` events are ignored which means events can be added conditionally:
```clojure
{:dispatch-n (list (when (> 3 5) [:conditioned-out])
                      [:another-one])}
```

## <a name="deregister-event-handler"></a> :deregister-event-handler

removes a previously registered event handler. Expects either a single id (typically a namespaced keyword),
 or a seq of ids.

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

