## Debugging Event Handlers

This page describes techniques for debugging re-frame's event handlers.

Event handlers are quite central to a re-frame app.  Only event handlers 
can update `app-db`, to "step" an application "forward" from one state
to the next.

## The `debug` Interceptor

You might wonder: is my handler making the right changes to the 
value in `app-db`?  Does it remove that entry? Does it increment that 
value?

During development, the built-in `debug` interceptor can be helpful 
in this regard. It shows, via `console.log`:
  1. the event being processed, for example:   `[:attempt-world-record true]`
  2. the changes made to `db` by the handler in processing the event.

Regarding point 2, `debug` uses `clojure.data/diff` to compare the 
state of `db` before and after the handler ran, showing exactly what 
mutation has happened.

If you [look at the docs for diff](https://clojuredocs.org/clojure.data/diff), 
you'll notice it returns a triple, the first two of which 
`debug` will display in `console.log` (the 3rd says what hasn't changed 
and isn't interesting).

The output produced by `clojure.data/diff` can take some getting used to, 
but you should stick with it -- your effort will be rewarded.

### Using `debug`

So, you will add this interceptor to your event handlers like this:
```clj
(re-frame.core/reg-event-db
   :some-id
   [debug]         ;;  <----  here! 
   some-handler-fn)
```

Except, of course, we need a bit more subtly than that because
we only want `debug` to be present in development builds.
So it should be like this:   
```clj
(re-frame.core/reg-event-db
   :some-id
   [(when ^boolean goog.DEBUG debug)]   ;;  <----  conditional! 
   some-handler-fn)
```

`goog.DEBUG` is a compile time constant provided by the `Google Closure Compiler`. 
It will be `true` when the build within `project.clj` is `:optimization :none` and `false`
otherwise.

Ha! I see a problem, you say.  In production, that `when` is going to 
leave a `nil` in the interceptor vector.  No problem. re-frame filters out nils. 

### Too Much Repetition - Part 1

Remember that each event handler has its own interceptor stack. 
All very flexible, but does that mean we have to repeat this `debug` 
business on every single handler?  Yes, it does.  But there are 
a couple of ways to make this pretty easy. 

Normally, standard interceptors are defined up the top of the `event.cljs` namespace:
```clj
(def standard-interceptors  [(when ^boolean goog.DEBUG debug)  other-interceptor])
```

And then, any one event handler, would look like:
```clj
(re-frame.core/reg-event-db
   :some-id
   [standard-interceptors specific-interceptor]
   some-handler-fn)
```

Wait on! I see a problem, you say.  `standard-interceptors` is a `vector`, and it 
is within another `vector` allongside `specific-interceptor` - so that's 
nested vectors of interceptors!  

No problem, re-frame uses `flatten` to take out all the nesting - the 
result is a simple chain of interceptors. Also, of course, nils are removed.

## 3. Checking DB Integrity

Always have a detailed schema for the data in `app-db`.

**First**, schemas serve as invaluable documentation. When I come to 
a new app, the first thing I want to look at is the underlying 
information model - the schema of the data.  I hope it is well 
commented and I expect it to be rigorous and complete, using 
[Clojure spec](http://clojure.org/about/spec)
or, perhaps, [a Prismatic Schema](https://github.com/Prismatic/schema).


**Second** a good spec allows you to assert the integrity and correctness of 
the data in app-db. 

When? Well, only event handlers can change what's in `app-db`, so only an event handler
could corrupt it. So, we'd like to recheck the integrity of `app-db` immediately 
after  **every** event handler has run.

This allows us to catch any errors very early, and easily assign blame (to an event handler).  

Schemas are typically put into `db.cljs`. Here's an example using Prismatic Schema 
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

(defn valid-schema?
  "validate the given db, writing any problems to console.error"
  [db]
  (let [res (s/check schema db)]
    (if (some? res)
      (.error js/console (str "schema problem: " res)))))
```

Now, let's organise for `valid-schema?` to be run after every handler. We'll use the built-in  `after` interceptor factory:
```clj
(def standard-interceptors [(when ^boolean goog.DEBUG debug)
                           (when ^boolean goog.DEBUG (after db/valid-schema?))]) ;; <-- new
```


Now, the instant a handler messes up the structure of `app-db` you'll be alerted.  But this overhead won't be there in production.

### Too Much Repetition - Part 2

Above we discussed a way of "factoring out" common interceptors into `standard-interceptors`. 
But there's a 2nd way to ensure that all event handlers get certain Interceptors: you write a custom registration function, like this:
```clj 
(defn my-reg-event-db          ;; alternative to reg-event-db
  ([id handler-fn] 
    (my-reg-event-db id nil handler-fn))
  ([id interceptors handler-fn]
    (re-frame.core/reg-event-db 
        id
        [(when ^boolean goog.DEBUG debug)
         (when ^boolean goog.DEBUG (after db/valid-schema?)) 
         interceptors]
        handler-fn)))
```

From now on, you can register your event handlers like this:
```clj
(my-reg-event-db      ;; <-- adds std interceptors automatically
  :some-id 
  some-handler-fn)
```
