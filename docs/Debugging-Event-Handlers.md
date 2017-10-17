## Debugging Event Handlers

This page describes techniques for debugging re-frame's event handlers.

Event handlers are quite central to a re-frame app.  Only event handlers 
can update `app-db` to "step" an application "forward" from one state
to the next.


## The `debug` Interceptor

You might wonder: is my event handler making the right changes to `app-db`?  

During development, the built-in `re-frame.core/debug` interceptor can help. 
It writes to `console.log`:
  1. the event being processed, for example:   `[:attempt-world-record true]`
  2. the changes made to `db` by the handler in processing the event

`debug` uses `clojure.data/diff` to compare the value of `app-db` 
before and after the handler ran, showing what changed. 

[clojure.data/diff returns a triple](https://clojuredocs.org/clojure.data/diff) 
, the first two entries of which 
`debug` will display in `console.log` (the 3rd says what has not changed and isn't interesting).

The output produced by `clojure.data/diff` can take some getting used to, 
but you should stick with it -- your effort will be rewarded.

### Using `debug`

So, you will add this Interceptor like this:
```clj
(re-frame.core/reg-event-db
   :some-id
   [re-frame.core/debug]         ;;  <----  added here! 
   some-handler-fn)
```

Except, of course, we need to be more deft - we only want 
`debug` in development builds. We don't 
want the overhead of those `clojure.data/diff` calculations in production.
So, this is better: 
```clj
(re-frame.core/reg-event-db
   :some-id
   [(when ^boolean goog.DEBUG re-frame.core/debug)]   ;;  <----  conditional! 
   some-handler-fn)
```

`goog.DEBUG` is a compile time constant provided by the `Google Closure Compiler`. 
It will be `true` when the build within `project.clj` is `:optimization :none` and `false`
otherwise.

Ha! I see a problem, you say.  In production, that `when` is going to 
leave a `nil` in the interceptor vector. So the Interceptor vector will be `[nil]`.
Surely that's a problem?  

Well, actually, no it isn't. re-frame filters out any `nil` from interceptor vectors. 

### Too Much Repetition - Part 1

Each event handler has its own interceptor stack. 

That might be all very flexible, but does that mean we have to put this `debug` 
business on every single handler?  That would be very repetitive. 

Yes, you will have to put it on each handler.  And, yes, that could be repetitive,  unless 
you take some steps.

One thing you can do is to define standard interceptors at the top of the `event.cljs` namespace:
```clj
(def standard-interceptors  [(when ^boolean goog.DEBUG debug)  another-interceptor])
```

And then, for any one event handler, the code would look like:
```clj
(re-frame.core/reg-event-db
   :some-id
   standard-interceptors        ;; <--- use the common definition
   some-handler-fn)
```

or perhaps:
```clj
(re-frame.core/reg-event-db
   :some-id
   [standard-interceptors specific-interceptor]  ;; mix with something specific
   some-handler-fn)
```

So that `specific-interceptor` could be something required for just this one
event handler, and it can be combined the standard ones.

Wait on! "I see a problem", you say.  `standard-interceptors` is a `vector`, and it
is within another `vector` along side `specific-interceptor` - so that's
nested vectors of interceptors!  

No problem, re-frame uses `flatten` to take out all the nesting - the 
result is a simple chain of interceptors. And, as we have discussed,
`nil`s are removed.

## 3. Checking DB Integrity

Always have a detailed schema for the data in `app-db`!

Why?

**First**, schemas serve as invaluable documentation. When I come to 
a new app, the first thing I want to look at is the underlying 
information model - the schema of the data.  I hope it is well 
commented and I expect it to be rigorous and complete, using 
[Clojure spec](http://clojure.org/about/spec)
or, perhaps, [a Prismatic Schema](https://github.com/Prismatic/schema).


**Second** a good spec allows you to assert the integrity and correctness of 
the data in `app-db`.  Because all the data is in one place, that means you 
are asserting the integrity of ALL the data in your app, at one time. All of it.

When should we do this?  Ideally, every time a change is made!

Well, it turns out that only event handlers can change the value in
`app-db`, so only an event handler could corrupt it. So, we'd like to
**recheck the integrity of `app-db` immediately
after *every* event handler has run**.

All of it, every time. This allows us to catch any errors very early, 
easily assigning blame (to the rouge event handler).

Schemas are typically put into `db.cljs` (see the todomvc example in the re-frame repo). Here's 
an example using Prismatic Schema
(although a more modern choice would be to use [Clojure spec](http://clojure.org/about/spec)):
```clj
(ns my.namespace.db
  (:require
    [schema.core :as s]))

;; As exactly as possible, describe the correct shape of app-db 
;; Add a lot of helpful comments. This will be an important resource
;; for someone looking at you code for the first time.
(def schema           
  {:a {:b s/Str
       :c s/Int}
   :d [{:e s/Keyword
        :f [s/Num]}]})
```

And a function which will check a db value against that schema:
```clj
(defn valid-schema?
  "validate the given db, writing any problems to console.error"
  [db]
  (let [res (s/check schema db)]
    (if (some? res)
      (.error js/console (str "schema problem: " res)))))
```

Now, let's organise for `valid-schema?` to be run **after** every handler. 
We'll use the built-in  `after` Interceptor factory function:
```clj
(def standard-interceptors [(when ^boolean goog.DEBUG debug)
                           (when ^boolean goog.DEBUG (after db/valid-schema?))]) ;; <-- new
```

Now, the instant a handler messes up the structure of `app-db` you'll be alerted.
But this overhead won't be there in production.

### Too Much Repetition - Part 2

Above, we discussed a way of "factoring out" common interceptors into `standard-interceptors`. 

There's an additional technique we can use to ensure that all event handlers get certain Interceptors: 
you write a custom registration function -- a replacement for `reg-event-db` -- like this:
```clj
(defn my-reg-event-db          ;; alternative to reg-event-db
  ([id handler-fn]
    (re-frame.core/reg-event-db id standard-interceptors handler-fn))
  ([id interceptors handler-fn]
    (re-frame.core/reg-event-db
        id
        [standard-interceptors interceptors]
        handler-fn)))
```

Notice how this registration function inserts our standard interceptors every time.

From now on, you can register your event handlers like this and know that the two standard Interceptors have been inserted:
```clj
(my-reg-event-db      ;; <-- adds std interceptors automatically
  :some-id 
  some-handler-fn)
```

### What about the -fx variation?
 
Above we created `my-reg-event-db` as a new registration function for `-db` handlers.
Now, `-db` handlers take `db` and `event` arguments, and return a new `db`.
So, they MUST return a new `db` value.   

But what if we tried to do the same for `-fx` handlers which, instead, return 
an `effects` map which may, or may not, contain a `:db`?  Our solution would 
have to allow for the absence of a new `db` value (by doing no validity check, because nothing 
was being changed). 

```clj
(def debug? ^boolean goog.DEBUG)
(def standard-interceptors-fx
  [(when debug?  debug)    ;; as before
   (when debug? (after #(if % (db/valid-schema? %)))]) ;; <-- different after
```
and then:
```clj
(defn my-reg-event-fx          ;; alternative to reg-event-db
  ([id handler-fn]
    (re-frame.core/reg-event-fx id standard-interceptors-fx handler-fn))
  ([id interceptors handler-fn]
    (re-frame.core/reg-event-fx
        id
        [standard-interceptors-fx interceptors]
        handler-fn)))
```


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
