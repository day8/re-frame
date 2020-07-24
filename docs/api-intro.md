# Overview

The re-frame API is provided by the single namespace `re-frame.core`. To use re-frame, you'll 
need to `require` it, perhaps like this: 

  ```clj
    (ns app.namespace
      (:require [re-frame.core :as rf]))

     ... now use rf/reg-event-fx or rf/subscribe
  ```

When you are writing an app's `View Functions`, you'll use 
`dispatch` and `subscribe` and, very occasionally, `dispatch-sync`.

Other code will register handlers using `reg-event-db`, `reg-event-fx` and `reg-sub`.  
Very occasionally  you might use `reg-fx` and `reg-cofx`. 

And, finally, you may perhaps use builtin `Interceptors` like `path`, `on-change`, `enrich`, `after`, etc.
