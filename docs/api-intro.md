# Overview

The re-frame API consists of: 

  - the namespace `re-frame.core`
  - a set of built-in effects

In the navigation to the left, you'll see a link to both. 

## Dependency Information 

Please review both the [releases page](http://day8.github.io/re-frame/releases/2021) and the [Clojars page](https://clojars.org/re-frame/) to discover the version you should be using. 


## Using re-frame

To use the re-frame API within your namespace, you'll 
need to `require` it, perhaps like this:
```clj
(ns my-app.some-namespace
  (:require [re-frame.core :as rf]))

;; your code here
```

You'll then be able to use the functions in the API, perhaps like this: `#!clj rf/dispatch`.


## The Most Commonly Used Part Of The API

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

  - register them via `reg-global-interceptors` 
  - rarely, remove them via `clear-global-interceptor`

## More Rarely Used Part

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
