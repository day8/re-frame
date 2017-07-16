## Debugging

This page describes a technique for 
debugging re-frame apps. It proposes a particular combination 
of tools.

## Know The Beast!

re-frame apps are **event driven**.

Event driven apps have this core, perpetual loop:
   1. your app is in some quiescent state, patiently waiting for the next event
   2. an event arrives (because the user presses a button, a websocket gets data, etc)
   3. computation/processing follows as the event is handled, leading to changes in app state, the UI, etc
   4. Goto 1

When debugging an event driven system, our focus will be step 3. 

## re-frame's Step 3

With re-frame, step 3 happens like a **domino sequence**: an event arrives and 
then bang, bang, bang, one domino triggers the next:
  - Event dispatch
  - Event handling
  - Effects handling 
  - subscription handlers
  - view functions

Every single event is processed in the same way.  Every single one.  A delightfully 
regular environment to understand and debug!

## Observe The Beast

Bret Victor has explained to us the importance of **observability**.
In which case, when we are debugging re-frame, what do we want to observe?

re-frame's domino process involves *data values flowing in 
and out of relatively simple, pure functions*.  Derived data flowing. 
So, to debug we want to observe:
  - which functions are called
  - what data flowed in and out of them

Functions and data:  What data was in the event?  What event handler 
was then called?  What interceptors then ran? What state changes did 
that event handler cause?  What subscription handlers were then 
triggered?  What new values did they then return? And which Reagent 
components then rerendered? What hiccup did they return?  It's all 
just functions processing data.

So, in Clojurescript, how do we observe functions and data?  Well, 
as luck would have it, ClojureScript is a lisp and it is readily **traceable**.  


##  How To Trace?

Below, I suggest a particular combination of technologies which, working together,
will write a trace to the devtools console. Sorry, but there's no fancy 
SVG dashboard.  We said simple, right?

First, use `clairvoyant` to trace function calls and data flow. We've had 
a couple of Clairvoyant PRs accepted, and they make it work well for us.
We've also written a specific Clairvoyant tracer tuned for our re-frame 
needs. https://clojars.org/day8/re-frame-tracer. 

Second, use cljs-devtools because it allows you to inspect traced data. 
<s>That means you'll need to be using a very fresh version of Chrome. 
But it is worth it.</s>

Finally, because we want you to easily scan, parse and drill into trace 
data, we'll be using Chrome devtool's `console.group()` and `console.endGroup()`.

## Your browser

You'll need to install `clj-devtools` by following these [instructions](https://github.com/binaryage/cljs-devtools).

## Your Project

Add these to your project.clj `:dependencies`. First up a private fork of clairvoyant.

[![Clojars Project](http://clojars.org/org.clojars.stumitchell/clairvoyant/latest-version.svg)](http://clojars.org/org.clojars.stumitchell/clairvoyant)

Then the customised tracer for cljs-devtools that includes a colour choice
[![Clojars Project](http://clojars.org/day8/re-frame-tracer/latest-version.svg)](http://clojars.org/day8/re-frame-tracer)


Next, we're going to assume that you have structured you app in the [recommended way](https://github.com/Day8/re-frame/tree/master/examples/todomvc/src/todomvc),
meaning you have the namespaces `events.cljs`, `subs.cljs` and `views.cljs`.
It is the functions within these namespaces that we wish to trace.  

1. At the top of each add these namespaces, add these requires:

   ```cljs
    [clairvoyant.core :refer-macros [trace-forms]]
    [re-frame-tracer.core :refer [tracer]]
   ```

2. Then, immediately after the `ns` form add (if you want a green colour):

   ```cljs
   (trace-forms {:tracer (tracer :color "green")}
   ```

3. Finally, put in a closing `)` at the end of the file. Now all functions within the 
`ns` will be traced.  It that is too noisy -- perhaps you won't want to trace all the helper functions --
then you can move the wrapping macros `trace-froms`
around to suit your needs.

4. Colour choice

   We have sauntered in the direction of the following colours

   |    file      | colour|
   |--------------|-------|
   |`handlers.clj`| green |
   |`subs.cljs`   | brown |
   |`views.clj`   | gold  |

   But I still think orange, flared pants are a good look.  So, yeah.  You may end up choosing others. 


## Say No To Anonymous

To get good quality tracing, you need to provide names for all 
your functions.  So, don't let handlers be anonymous when registering them. 

For example, make sure you name the renderer in a Form2 component:
```clj
(defn my-view
  []
  (let [name   (subscribe [:name])]
    (fn my-view-renderer []                ;;   <--  name it!! 
      [:div @name])))
```

And name those event handlers:
```clj
(reg-event-db
  :blah
  [interceptors]
  (fn blah-handler    ;;   <-- name it
    [db v]       
    (assoc db :blah true)))
```

## IMPORTANT

**By default, our clairvoyant fork does not produce any trace!!** 

You must throw a compile-time switch for tracing to be included into development builds. 

If you are using `lein`, do this in your `project.clj` file:

```clj
:cljsbuild {:builds [{:id "dev"            ;; for the development build, turn on tracing
                      ....
                      :closure-defines {"clairvoyant.core.devmode" true}
                      }]}
```

So, just to be clear, if you see no tracing when you are debugging, it 
is almost certainly because you haven't successfully turned on this switch. 
Your production builds need to nothing because, by default, all trace 
is compiled out of the code. 


## The result

Load your app, and open the dev-tools console.  Make an event happen (click a button?). 
Notice the colour coded tracing showing the functions being called and the derived data flowing. 

Do you see the dominos?

## Warning

If the functions you are tracing take large data-structures as parameters, or 
return large values, then you will be asking clairvoyant to push/log a LOT 
of data into the `js/console`. This can take a while and might mean devtools 
takes a lot of RAM.  

For example, if your `app-db` was big and complicated, you might use `path` 
middleware to "narrow" that part of `app-db` passed into your event handler 
because logging all of `app-db` to `js/console` might take a while (and not 
be that useful).


## React Native

If you have not enabled Remote JS Debugging in the emulator you will 
get the following error related to console.groupCollapsed:
```
[TypeError: console.groupCollapsed is not a function. (In 'console.groupCollapsed("%c%s",[cljs.core.str("color:"),cljs.core.str(self__.color),cljs.core.str(";")].join(''),title)', 'console.groupCollapsed' is undefined)] line: 112, column: 23
```
Enable **Debug JS Remotely** to fix this.

## Appendix A - Prior to V0.8.0

If you are using v0.8.0 or later, then you can ignore this section.

Prior to v0.8.0, subscriptions were done using `re-frame.core/reg-sub-raw`, 
instead of `re-frame.core/reg-sub` (which is now the preferred method). 

Details of the changes can [be found here](https://github.com/Day8/re-frame/blob/master/CHANGES.md#080--20160819).

When using `re-frame.core/reg-sub-raw`, you must explicitly use `reaction`.  And 
unfortunately both `trace-forms` and `reaction` are macros and they don't work well together.
So there is some necessary changes to your `reg-sub-raw` code to get them to work with clairvoyant, 
you need to replace the macro `reaction` with the function `make-reaction`.

Do the following code:

```cljs
(ns my.ns
 (:require-macros [reagent.ratom :refer [reaction]]))

;; ...

(re-frame.core/reg-sub-raw
 :my-sub
 (fn
   [db _]
   (reaction (get-in @db [db-root :my-sub]))))
```

needs to become

```cljs
(ns my.ns
 (:require [reagent.ratom :refer [make-reaction]]))

;; ...

(subs/register
 :my-sub
 (fn
   [db _]
   (make-reaction (fn my-subscription 
                    []
                   (get-in @db [db-root :my-sub])))))
```
   
From @mccraigmccraig we get the following (untested by me, but they look great):

> I finally had enough of all the boilerplate required to use clairvoyant with 
> re-frame subs & handlers and wrote some code to tidy it up...

```clj
(ns er-webui.re-frame
  (:require
   [clojure.string :as str]
   [clojure.pprint :as pp]
   [clairvoyant.core]
   [cljs.analyzer :as analyzer]))

(def expand-macros
  #{`reaction
    `regsub
    `reghandler})

(defn expand-op?
  "should the op represented by the sym be expanded...
   expands the sym to its fully namespaced version and
   checks against expand-macros"
  [sym env]
  (when-let [{var-name :name} (analyzer/resolve-macro-var env sym)]
    ;; (pp/pprint ["expand-op?" sym var-name] *err*)
    (expand-macros var-name)))

(defn maybe-expand
  "recursively descend forms calling macroexpand-1
   on any forms with a symbol from expand-macros in
   first position"
  [form env]
  (if (and (seq? form)
           (symbol? (first form)))
    (let [[op & r] form
          resolved-op (expand-op? op env)]
      (if resolved-op
        (maybe-expand
         (macroexpand-1 (cons resolved-op r))
         env)
        (cons op
              (doall (for [f r]
                       (maybe-expand
                        f
                        env))))))
    form))

(defn maybe-expand-forms
  [forms env]
  (doall
   (for [form forms]
     (let [exp (maybe-expand form env)]
       (when (not= exp form)
         ;; (pp/pprint exp *err*)
         )
       exp))))

(defn fn-name
  "make a sensible fn name from
   a possibly namespaced symbol or keyword"
  ([k] (fn-name k ""))
  ([k suffix]
   (assert (or (keyword? k) (symbol? k)))
   (-> k
       (str suffix)
       (str/replace #"^:" "")
       (str/replace #"\." "-")
       (str/replace "/" "--")
       symbol)))

(defmacro reaction
  "like reagent.core/reaction except it gives the fn a name
   which makes for useful tracing"
  [reaction-name & body]
  (let [reaction-fn-name# (fn-name reaction-name)]
    `(reagent.ratom/make-reaction
      (~'fn ~reaction-fn-name#
       []
       ~@body))))

(defmacro regsub
  "like re-frame.core/register-sub except it creates
   the fn with a name for better tracing"
  [sub-key params & body]
  (assert (vector? params))
  (let [sub-fn-name# (fn-name sub-key)]
    `(re-frame.core/register-sub
      ~sub-key
      (~'fn ~sub-fn-name#
       ~params
       ~@body))))

(defmacro reghandler
  "like re-frame.core/register-handler except it
   creates an fn with a name which makes for better tracing"
  [handler-key middleware-or-params & body]
  (let [handler-fn-name (fn-name handler-key "-h")
        middleware (when (and (not (vector? middleware-or-params))
                              (vector? (first body)))
                     middleware-or-params)
        params (if middleware
                 (first body)
                 middleware-or-params)
        body (if middleware
               (rest body)
               body)]
    (assert (vector? params))
    `(re-frame.core/register-handler
      ~handler-key
      ~middleware
      (~'fn ~handler-fn-name
        ~params
        ~@body))))

(defmacro trace-subs
  [& body]
  (let [body-forms# (maybe-expand-forms body &env)]
    `(clairvoyant.core/trace-forms
      {:tracer (re-frame-tracer.core/tracer :color "brown")}

      ~@body-forms#)))

(defmacro trace-handlers
  [& body]
  (let [body-forms# (maybe-expand-forms body &env)]
    `(clairvoyant.core/trace-forms
      {:tracer (re-frame-tracer.core/tracer :color "blue")}

      ~@body-forms#)))

(defmacro trace-views
  [& body]
  (let [body-forms# (maybe-expand-forms body &env)]
    `(clairvoyant.core/trace-forms
      {:tracer (re-frame-tracer.core/tracer :color "green")}

      ~@body-forms#)))
```

> gives you subs like this - 

```clj
 (regsub :initialised
   [db _]
   (reaction initialised-r
     (get-in @db [:initialised])))
```

> and handlers like this - 

```clj
 (reghandler
  :after-init
   er-middleware
   [db [_]]
   (code-push/sync)
   db)
```


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
