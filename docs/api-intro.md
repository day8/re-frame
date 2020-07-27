# Overview

The re-frame API is provided by the single namespace `re-frame.core`. To use re-frame, you'll 
need to `require` it, perhaps like this:
```clj
  (ns app.namespace
    (:require [re-frame.core :as rf]))

    ... now use rf/reg-event-fx or rf/subscribe
```

## A Rough Map 

When you are writing an app's `View Functions`, you'll use:

  - `dispatch` (or very occasionally, `dispatch-sync`)
  - `subscribe`

In your other namespaces, you register:

  - event handlerss - `reg-event-db` and `reg-event-fx`
  - subscription handlers - `reg-sub` (and rarely `reg-sub-raw`)
  - rarely, effect handlers - `reg-fx` 
  - rarely, coeffect handlers - `reg-cofx` with `inject-cofx`

There is API to clear all these registrations, but this is almost never used.

When registering `event handlers`, you might use builtin interceptors: 

  - `path`
  - `on-change`
  - `enrich`
  - `after`
  - `trim-v`
  - `debug`

Install global interceptors via `reg-global-interceptors` and remove them via `clear-global-interceptor`.

And, when writing event handlers you might want to use the **builtin effects**. These are supplied on their own page - see navigation on the left.

## More Obscure

Testing or dev-time related utilities:

  - `clear-subscription-cache!`
  - `make-restore-fn`
  - `purge-event-queue`

Logging/debugging:

  - `console`
  - `set-loggers`


If you need to write an Interceptor, use these utilities (see how they are used in re-frame code for builtin Interceptors):

  - `->interceptor`
  - `get-coeffect` 
  - `assoc-coeffect`
  - `get-effect`
  - `assoc-effect`
  - `enqueue`
