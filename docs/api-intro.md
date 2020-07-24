## API Overview

The re-frame API is provided by the single namespace `re-frame.core`. To use re-frame, you'll 
need to `require` it, perhaps like this ...

  ```clj
  (ns app.namespace
    (:require [re-frame.core :as rf]))

    ... now use rf/reg-event-fx or rf/subscribe
  ```

When you are writing an app's `View Functions`, you'll use: 
`dispatch` and `subscribe`.  Very occasionally `dispatch-sync`.

Your other code will register handlers using: `reg-event-db`, `reg-event-fx` and `reg-sub`.  
Very occasionally  you might use `reg-fx` and `reg-cofx`. 

And, finally, you may perhaps use builtin `Interceptors` like `path`, `on-change`, `enrich`, `after`, etc.
  

## Built-in Effect Handlers

In addition to the functions is `re-frame.core`, re-frame provides built-in 
effects which also contribute to the API: 

### :dispatch-later

`dispatch` one or more events after given delays. Expects a collection
of maps with two keys: `:ms` and `:dispatch`

Example usage:
```clj
{:dispatch-later [{:ms 200 :dispatch [:event-id "param"]}    
                  {:ms 100 :dispatch [:also :this :in :100ms]}]}
```

Which means: in 200ms do this: `(dispatch [:event-id "param"])` and in 100ms ...

Note: nil entries in the collection are ignored which means events can be added
conditionally:

```clj
{:dispatch-later [ (when (> 3 5) {:ms 200 :dispatch [:conditioned-out]})
                   {:ms 100 :dispatch [:another-one]}]}
```

*** 

### :dispatch

`dispatch` one event. Expects a single vector.

usage:
```clj
{:dispatch [:event-id "param1" :param2] }
```

***
 
### :dispatch-n

`dispatch` one or more events. Expects a seq of events, typically a `list`. 

Example usage:
```clj
{:dispatch-n (list [:do :all] [:three :of] [:these])}
```
Notes:

  1. The events will be dispatched in the order provided. And, because events are handled FIFO, the events will subsequently be processed in the order provided.
  2. nils in the event collection are ignored which means events can be added
conditionally:
  ```clj
  {:dispatch-n (list (when (a-predicate?) [:conditioned-out])
                     [:another-one])}
  ```

*** 
### :deregister-event-handler

Removes a previously registered event handler. Expects either a single id
(typically a keyword), or a seq of ids.

Example usage:
```clj
{:deregister-event-handler :my-id)}
```
or:
```clj
{:deregister-event-handler [:one-id :another-id]}
```

*** 
### :db

reset! app-db with a new value. Expects a map. 

Example usage:
```clj
{:db  {:key1 value1 :key2 value2}}
```
