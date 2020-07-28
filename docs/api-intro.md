# Overview

The re-frame API is provided by the single namespace `re-frame.core`. To use re-frame, you'll 
need to `require` it, perhaps like this:
```clj
(ns app.namespace
  (:require [re-frame.core :as rf]))

;; now you can use rf/reg-event-fx or rf/subscribe
```

## Commonly Used

When you are writing `View Functions`: 

  - `dispatch` (or very occasionally, `dispatch-sync`)
  - `subscribe`

When you are registering handlers:

  - event handlers - `reg-event-db` and `reg-event-fx`
  - subscription handlers - `reg-sub` (and rarely `reg-sub-raw`)
  - rarely, effect handlers - `reg-fx` 
  - rarely, coeffect handlers - `reg-cofx` with `inject-cofx`

There is API to clear all these registrations, but this is almost never used.

When you register `event handlers`, you might use builtin interceptors: 

  - `path`
  - `on-change`
  - `enrich`
  - `after`
  - `trim-v`
  - `debug`

Global interceptors can be very useful:

  - register then via `reg-global-interceptors` 
  - rarely, remove them via `clear-global-interceptor`

And, when you are writing event handlers, you might want to use 
the **builtin effects**. These are detailed on their own page - see navigation on the left.

## More Rarely Used

Testing or dev-time related utilities:

  - `clear-subscription-cache!`
  - `make-restore-fn`
  - `purge-event-queue`

Logging/debugging:

  - `console`
  - `set-loggers`


If you write an Interceptor, use these utilities. To see how they are used, look 
at the [re-frame code for builtin Interceptors](https://github.com/day8/re-frame/blob/master/src/re_frame/std_interceptors.cljc):

  - `->interceptor`
  - `get-coeffect` 
  - `assoc-coeffect`
  - `get-effect`
  - `assoc-effect`
  - `enqueue`
