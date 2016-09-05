## Debugging Event Handlers

This page describes useful techniques for debugging re-frame's event handlers.

Event handlers are quite central to a re-frame app.  Only event handlers 
can update app-db, to "step" an application "forward" from one state to the next.

## The `debug` Interceptor

You might wonder: is my handler making the right changes to the 
value in `app-db`?  Does it remove that entry? Does it increment that 
value?

During development, the built-in `debug` interceptor can be helpful 
in this regard. It shows, via `console.log`:
  1. the event being processed, for example:   `[:attempt-world-record true]`
  2. the changes made to `db` by the handler in processing the event.

Regarding point 2, `debug` uses `clojure.data/diff` to compare the 
state of `db` before and after the handler ran. If you [look at the docs](https://clojuredocs.org/clojure.data/diff), 
you'll notice that `diff` returns a triple, the first two of which 
are displayed by `debug` in `console.log` (the 3rd says what hasn't changed 
and isn't interesting).

### Interceptors

So, now we have two middlewares to put on every handler: `debug` and `log-ex`.

At the top of our `handlers.cljs` we might define:
```clj
(def standard-middlewares  [log-ex debug])
```

And then include this `standard-middlewares` in every handler registration below:
```clj
(register-handler 
    :some-id
    standard-middlewares      ;;  <----  here!
    some-handler-fn)
```

No, wait. I don't want this `debug` middleware hanging about in my production version, just at develop time. And we still need those runtime exceptions going to airbrake.

So now, we make it:
```clj
(def standard-middlewares [ (if ^boolean goog.DEBUG log-ex log-ex-to-airbrake) 
                            (when ^boolean goog.DEBUG debug)]) 
```

Ha! I see a problem, you say.  In production, that `when` is going to leave a `nil` in the vector.  No problem. re-frame filters out nils. 

Ha! Ha! I see another problem, you say.  Some of my handlers have other middleware. One of them looks like this:

```clj
(register-handler 
    :ev-id
    (path :todos)       ;;  <-- already has middleware
    todos-fn)
```

How can I add this `standard-middlewares` where there is already middleware?  

Like this:
```clj
(register-handler 
    :ev-id
    [standard-middlewares (path :todos)]       ;;  <--  put both in a vector
    todos-fn)
```

But that's a vector in a vector?  Surely, that a problem?.  Actually, no, re-frame will `flatten` any level of vector nesting, and remove `nils` before composing the resulting middleware. 

## 3. Checking DB Integrity

I'd recommend always having a schema for your `app-db`, specifically [a Prismatic Schema](https://github.com/Prismatic/schema).  If ever [herbert](https://github.com/miner/herbert) is ported to clojurescript, it might be a good candidate too but, for the moment, a Prismatic Schema. 

Schemas serve as invaluable documentation, **plus ...**

Once you have a schema for your `app-db`, you can check it is valid at any time. The most obvious time to recheck the integrity of `app-db` is immediately after a handler has changed it. In effect, we want to recheck after **any** handler has run. 

Let's start with a schema and a way to validate a db against that schema. I would typically put this stuff in `db.cljs`.
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

Now, let's organise for our `app-db` to be validated against the schema after every handler. We'll use the built-in  `after` middleware factory:
```clj
(def standard-middlewares [(if ^boolean goog.DEBUG log-ex log-ex-to-airbrake) 
                           (when ^boolean goog.DEBUG debug)
                           (when ^boolean goog.DEBUG (after db/valid-schema?))]) ;; <-- new
```

BTW, we could have written it without vectors, using `comp`: 
```clj
(def standard-middlewares (if ^boolean goog.DEBUG               ;; not a vector
                            (comp log-ex debug (after db/valid-schema?))  ;; comp used
                            log-ex-to-airbrake))
```

Now, the instant a handler messes up the structure of `app-db` you'll be alerted.  But this overhead won't be there in production.

These 3 steps will go a very long way in helping you to debug your event handlers. 
