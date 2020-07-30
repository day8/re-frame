# Overview

The re-frame API is composed of: 

  - the namespace `re-frame.core`
  - a set of built-in effects

If you look to the left, in the navigation panel, you'll see a link to both. 

To use re-frame, you'll 
need to `require` it, perhaps like this:
```clj
(ns my-app.namespace
  (:require [re-frame.core :as rf]))

;;  use API like rf/reg-event-fx or rf/subscribe
```

The `re-frame.core` page provides, alphabetically all functions in that namespace, together with their docstrings. An alternative view is provided below - one which presents the API in terms of purpose and importance.

## Commonly Used

When you are writing `View Functions`: 

  - `dispatch` (or occasionally, `dispatch-sync`)
  - `subscribe`

When you are registering:

  - event handlers - `reg-event-db` and `reg-event-fx`
  - subscription handlers - `reg-sub` (and rarely `reg-sub-raw`)
  - rarely, effect handlers - `reg-fx` 
  - rarely, coeffect handlers - `reg-cofx` with `inject-cofx`

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
