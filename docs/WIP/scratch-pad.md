<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [It solves a dilemma](#it-solves-a-dilemma)
- [Implements Reactive Data Flows](#implements-reactive-data-flows)
- [Flow](#flow)
- [Reactive Programming](#reactive-programming)
- [Components](#components)
  - [Truth Interlude](#truth-interlude)
  - [React etc.](#react-etc)
- [Subscribe](#subscribe)
- [The Signal Graph](#the-signal-graph)
- [A More Efficient Signal Graph](#a-more-efficient-signal-graph)
- [](#)
- [Prefer Dumb Views - Part 1](#prefer-dumb-views---part-1)
- [Prefer Dumb Views - Part 2](#prefer-dumb-views---part-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## It solves a dilemma

SPAs are fundamentally mutative in nature.

They change the DOM, databases, localstore, cookies, send emails etc. Its a veritable frenzy of mutation. And 
this is a good thing. Any user of these SPAs wants to be changing the world, 
right, otherwise what's the point?
 
But we are wide-eyed functional zealots, heroically resisting the 
entire notion of mutation, and insisting instead on the wonders of pure functions.

re-frame solves this dilemma and allows you 
compose a mutative application from pure functions.


XXX

I'll be using [Reagent] at an intermediate level, so you will need to have done some
introductory Reagent tutorials before going on. Try:
  - [The Introductory Tutorial](http://reagent-project.github.io/) or
  - [this one](https://github.com/jonase/reagent-tutorial) or
  - [Building Single Page Apps with Reagent](http://yogthos.net/posts/2014-07-15-Building-Single-Page-Apps-with-Reagent.html).

##  Implements Reactive Data Flows

This document describes how re-frame implements 
the reactive data flows in dominoes 4 and 5 (queries and views). 

It explains 
the low level mechanics of the process which not something you 
need to know initially. So, you can defer reading and understanding 
this until later, if you wish.  But you should at some point circle
back and grok it.  It isn't hard at all. 
 



## Flow



## Reactive Programming 



We'll get to the meat in a second, I promise, but first one final, useful diversion ...

Terminology in the FRP world seems to get people hot under the collar. Those who believe in continuous-time
semantics might object to me describing re-frame as having FRP-nature. They'd claim that it does something
different from pure FRP, which is true.

But, these days, FRP seems to have become a
["big tent"](http://soft.vub.ac.be/Publications/2012/vub-soft-tr-12-13.pdf)
(a broad church?).
Broad enough perhaps that re-frame can be in the far, top, left paddock of the tent, via a series of
qualifications: re-frame has "discrete, dynamic, asynchronous, push FRP-ish-nature" without "glitch free" guarantees.
(Surprisingly, "glitch" has specific meaning in FRP).

**If you are new to FRP, or reactive programming generally**, browse these resources before
going further (certainly read the first two):
- [Creative Explanation](http://paulstovell.com/blog/reactive-programming)
- [Reactive Programming Backgrounder](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [presentation (video)](http://www.infoq.com/presentations/ClojureScript-Javelin) by Alan Dipert (co-author of Hoplon)
- [serious pants Elm thesis](https://www.seas.harvard.edu/sites/default/files/files/archived/Czaplicki.pdf)




## Components

Extending the diagram, we introduce `components`:

```
app-db  -->  components  -->  Hiccup
```

When using Reagent, your primary job is to write one or more `components`. 
This is the view layer.

Think about `components` as `pure functions` - data in, Hiccup out.  `Hiccup` is
ClojureScript data structures which represent DOM. Here's a trivial component:

```Clojure
(defn greet
  []
  [:div "Hello ratoms and reactions"])
```

And if we call it:
```Clojure
(greet)
;; ==>  [:div "Hello ratoms and reactions"]
```

You'll notice that our component is a regular Clojure function, nothing special. In this case, it takes
no parameters and it returns a ClojureScript vector (formatted as Hiccup).

Here is a slightly more interesting (parameterised) component (function):

```Clojure
(defn greet                    ;; greet has a parameter now
  [name]                       ;; 'name' is a ratom  holding a string
  [:div "Hello "  @name])      ;; dereference 'name' to extract the contained value

;; create a ratom, containing a string
(def n (reagent/atom "re-frame"))

;; call our `component` function, passing in a ratom
(greet n)
;; ==>  [:div "Hello " "re-frame"]    returns a vector
```

So components are easy - at core they are a render function which turns data into
Hiccup (which will later become DOM).

Now, let's introduce `reaction` into this mix.  On the one hand, I'm complicating things
by doing this, because Reagent allows you to be ignorant of the mechanics I'm about to show
you. (It invisibly wraps your components in a `reaction` allowing you to be blissfully
ignorant of how the magic happens.)

On the other hand, it is useful to understand exactly how the Reagent Signal graph is wired,
because in a minute, when we get to `subscriptions`, we'll be directly using `reaction`, so we
might as well bite the bullet here and now ... and, anyway, it is pretty easy...

```Clojure
(defn greet                ;; a component - data in, Hiccup out.
  [name]                   ;; name is a ratom
  [:div "Hello "  @name])  ;; dereference name here, to extract the value within

(def n (reagent/atom "re-frame"))

;; The computation '(greet n)' returns Hiccup which is stored into 'hiccup-ratom'
(def hiccup-ratom  (reaction (greet n)))    ;; <-- use of reaction !!!

;; what is the result of the initial computation ?
(println @hiccup-ratom)
;; ==>  [:div "Hello " "re-frame"]    ;; returns hiccup  (a vector of stuff)

;; now change 'n'
;; 'n' is an input Signal for the reaction above.
;; Warning: 'n' is not an input signal because it is a parameter. Rather, it is
;; because 'n' is dereferenced within the execution of the reaction's computation.
;; reaction notices what ratoms are dereferenced in its computation, and watches
;; them for changes.
(reset! n "blah")            ;;    n changes

;; The reaction above will notice the change to 'n' ...
;; ... and will re-run its computation ...
;; ... which will have a new "return value"...
;; ... which will be "reset!" into "hiccup-ratom"
(println @hiccup-ratom)
;; ==>   [:div "Hello " "blah"]    ;; yep, there's the new value
```

So, as `n` changes value over time (via a `reset!`), the output of the computation `(greet n)`
changes, which in turn means that the value in `hiccup-ratom` changes. Both `n` and
`hiccup-ratom` are FRP Signals. The Signal graph we created causes data to flow from
`n` into `hiccup-ratom`.

Derived Data, flowing.


### Truth Interlude

I haven't been entirely straight with you:

 1. Reagent re-runs `reactions` (re-computations) via requestAnimationFrame. So a
re-computation happens about 16ms after an input Signals change is detected, or after the
current thread of processing finishes, whichever is the greater. So if you are in a bREPL
and you run the lines of code above one after the other too quickly,  you might not see the
re-computation done immediately after `n` gets reset!, because the next animationFrame
hasn't run (yet).  But you could add a `(reagent.core/flush)` after the reset! to force
re-computation to happen straight away.

 2. `reaction` doesn't actually return a `ratom`.  But it returns something that has
ratom-nature, so we'll happily continue believing it is a `ratom` and no harm will come to us.

On with the rest of my lies and distortions...


### React etc.

Okay, so we have some unidirectional, dynamic, async, discrete FRP-ish data flow happening here.

Question: To which ocean does this river of data flow?  Answer: The DOM ocean.

The full picture:
```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each
function takes data from the
previous step, and produces (derived!) data for the next step.  In the next
diagram, the three functions are marked (f1, f2, f3). The unmarked nodes are derived data,
produced by one step, to be input to the following step.  Hiccup,
VDOM and DOM are all various forms of HTML markup (in our world that's data).

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
               f1                           f2                      f3
```

In abstract ClojureScript syntax terms, you could squint and imagine the process as:

```Clojure
(-> app-db
   components    ;; produces Hiccup
   Reagent       ;; produces VDOM   (virtual DOM that React understands)
   React         ;; produces HTML   (which magically and efficiently appears on the page).
   Browser       ;; produces pixels
   Monitor)      ;; produces photons?
```


Via the interplay between `ratom` and `reaction`, changes to `app-db` stream into the pipeline, where it
undergoes successive transformations, until pixels colour the monitor you to see.

Derived Data, flowing.  Every step is acting like a pure function and turning data into new data.

All well and good, and nice to know, but we don't have to bother ourselves with most of the pipeline.
We just write the `components`
part and Reagent/React will look after the rest.  So back we go to that part of the picture ...


## Subscribe



`components` (view layer) need to query aspects of `app-db` (data layer).

But how?

Let's pause to consider **our dream solution** for this part of the flow. `components` would:
  * obtain data from `app-db`  (their job is to turn this data into hiccup).
  * obtain this data via a (possibly parameterised) query over `app-db`. Think database kind of  query.
  * automatically recompute their hiccup output, as the data returned by the query changes, over time
  * use declarative queries. Components should know as little as possible about the structure of `app-db`. SQL?  Datalog?

re-frame's `subscriptions` are an attempt to live this dream. As you'll see, they fall short on the declarative
query part, but they comfortably meet the other requirements.

As a re-frame app developer, your job will be to write and register one or more
"subscription handlers" - functions that do a named query.

Your subscription functions must return a value that changes over time (a Signal). I.e. they'll
be returning a reaction or, at least, the `ratom` produced by a `reaction`.

Rules:
 - `components` never source data directly from `app-db`, and instead, they use a subscription.
 - subscriptions are only ever used by components  (they are never used in, say, event handlers).

Here's a component using a subscription:

```Clojure
(defn greet         ;; outer, setup function, called once
  []
  (let [name-ratom  (subscribe [:name-query])]    ;; <---- subscribing happens here
     (fn []        ;; the inner, render function, potentially called many times.
         [:div "Hello" @name-ratom])))
```

First, note this is a [Form-2](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-2--a-function-returning-a-function)
`component` ([there are 3 forms](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components)).

Previously in this document, we've used the simplest, `Form-1` components (no setup was required, just render).
With `Form-2` components, there's a function returning a function:
- the returned function is the render function. Behind the scenes, Reagent will wrap this render function
 in a `reaction` to make it produce new Hiccup when its input Signals change.  In our example above, that
 means it will rerun every time `name-ratom` changes.
- the outer function is a setup function, called once for each instance of the component. Notice the use of
 'subscribe' with the parameter `:name-query`. That creates a Signal through which new values are supplied
 over time; each new value causing the returned function (the actual renderer) to be run.

>It is important to distinguish between a new instance of the component versus the same instance of a component reacting to a new value. Simplistically, a new component is returned for every unique value the setup function (i.e. the outer function) is called with. This allows subscriptions based on initialisation values to be created, for example:
``` Clojure
  (defn my-cmp [row-id]
    (let [row-state (subscribe [row-id])]
      (fn [row-id]
        [:div (str "Row: " row-id " is " @row-state)])))
```
In this example, `[my-cmp 1][my-cmp 2]` will create two instances of `my-cmp`. Each instance will re-render when its internal `row-state` signal changes.

`subscribe` is always called like this:

```Clojure
   (subscribe  [query-id some optional query parameters])
```

There is only one (global) `subscribe` function and it takes one parameter, assumed to be a vector.

The first element in the vector (shown as `query-id` above) identifies/names the query and the other elements are optional
query parameters. With a traditional database a query might be:

```
select * from customers where name="blah"
```

In re-frame, that would be done as follows:
   `(subscribe  [:customer-query "blah"])`
which would return a `ratom` holding the customer state (a value which might change over time!).

So let's now look at how to write and register the subscription handler for `:customer-query`

```Clojure
(defn customer-query     ;; a query over 'app-db' which returns a customer
   [db, [sid cid]]      ;; query fns are given 'app-db', plus vector given to subscribe
   (assert (= sid :customer-query))   ;; subscription id was the first element in the vector
   (reaction (get-in @db [:path :to :a :map cid])))    ;; re-runs each time db changes

;; register our query handler
(register-sub
   :customer-query       ;; the id (the name of the query)
   customer-query)       ;; the function which will perform the query
```

Notice how the handler is registered to handle `:customer-query` subscriptions.

**Rules and Notes**:
 - you'll be writing one or more handlers, and you will need to register each one.
 - handlers are functions which take two parameters:  the db atom, and the vector given to subscribe.
 - `components` tend to be organised into a hierarchy, often with data flowing from parent to child via
parameters. So not every component needs a subscription. Very often the values passed in from a parent component
are sufficient.
 - subscriptions can only be used in `Form-2` components and the subscription must be in the outer setup
function and not in the inner render function.  So the following is **wrong** (compare to the correct version above)

```Clojure
(defn greet         ;; a Form-1 component - no inner render function
  []
  (let [name-ratom  (subscribe [:name-query])]    ;; Eek! subscription in renderer
    [:div "Hello" @name-ratom]))
```

Why is this wrong?  Well, this component would be re-rendered every time `app-db` changed, even if the value
in `name-ratom` (the result of the query) stayed the same. If you were to use a `Form-2` component instead, and put the
subscription in the outer functions, then there'll be no re-render unless the value queried (i.e. `name-ratom`) changed.


## The Signal Graph

Let's sketch out the situation described above ...

`app-db` would be a bit like this (`items` is a vector of maps):
```Clojure
(def L  [{:name "a" :val 23 :flag "y"}
        {:name "b" :val 81 :flag "n"}
        {:name "c" :val 23 :flag "y"}])

(def  app-db (reagent/atom  {:items L
                            :sort-by :name}))     ;; sorted by the :name attribute
```

The subscription-handler might be written:

```Clojure
(register-sub
 :sorted-items      ;; the query id  (the name of the query)
 (fn [db [_]]       ;; the handler for the subscription
   (reaction
      (let [items      (get-in @db [:items])     ;; extract items from db
            sort-attr  (get-in @db [:sort-by])]  ;; extract sort key from db
          (sort-by sort-attr items)))))          ;; return them sorted
```


Subscription handlers are given two parameters:

  1. `app-db` - that's a reagent/atom which holds ALL the app's state. This is the "database"
     on which we perform the "query".
  2. the vector originally supplied to `subscribe`.  In our case, we ignore it.

In the example above, notice that the `reaction` depends on the input Signal:  `db`.
If `db` changes, the query is re-run.

In a component, we could use this query via `subscribe`:

```Clojure
(defn items-list         ;; Form-2 component - outer, setup function, called once
  []
  (let [items   (subscribe [:sorted-items])   ;; <--   subscribe called with name
        num     (reaction (count @items))     ;; Woh! a reaction based on the subscription
        top-20  (reaction (take 20 @items))]  ;; Another dependent reaction
     (fn []
       [:div
           (str "there's " @num " of these suckers. Here's top 20")     ;; rookie mistake to leave off the @
           (into [:div ] (map item-render @top-20))])))   ;; item-render is another component, not shown
```

There's a bit going on in that `let`, most of it tortuously contrived, just so I can show off chained
reactions. Okay, okay, all I wanted really was an excuse to use the phrase "chained reactions".

The calculation of `num` is done by a `reaction` which has `items` as an input Signal. And,
as we saw, `items` is itself a reaction over two other signals (one of them the `app-db`).

So this is a Signal Graph. Data is flowing through computation into renderer, which produce Hiccup, etc.

## A More Efficient Signal Graph

But there is a small problem. The approach above might get inefficient, if `:items` gets long.

Every time `app-db` changes, the `:sorted-items` query is
going to be re-run and it's going to re-sort `:items`.  But `:items` might not have changed. Some other
part of `app-db` may have changed.

We don't want to perform this computationally expensive re-sort
each time something unrelated in `app-db` changes.

Luckily, we can easily fix that up by tweaking our subscription function so
that it chains `reactions`:

```Clojure
(register-sub
 :sorted-items             ;; the query id
 (fn [db [_]]
   (let [items      (reaction (get-in @db [:some :path :to :items]))]  ;; reaction #1
         sort-attr  (reaction (get-in @db [:sort-by]))]                ;; reaction #2
       (reaction (sort-by @sort-attr @items)))))                       ;; reaction #3
```

The original version had only one `reaction` which would be re-run completely each time `app-db` changed.
This new version, has chained reactions.
The 1st and 2nd reactions just extract from `db`.  They will run each time `app-db` changes.
But they are cheap. The 3rd one does the expensive
computation using the result from the first two.

That 3rd, expensive reaction will be re-run when either one of its two input Signals change, right?  Not quite.
`reaction` will only re-run the computation when one of the inputs has **changed in value**.

`reaction` compares the old input Signal value with the new Signal value using `identical?`. Because we're
using immutable data structures
(thank you ClojureScript), `reaction` can perform near instant checks for change on even
deeply nested and complex
input Signals. And `reaction` will then stop unneeded propagation of `identical?` values through the
Signal graph.

In the example above, reaction #3 won't re-run until `:items` or `:sort-by` are different
(do not test `identical?`
to their previous value), even though `app-db` itself has changed (presumably somewhere else).

Hideously contrived example, but I hope you get the idea. It is all screamingly efficient.

Summary:
 - you can chain reactions.
 - a reaction will only be re-run when its input Signals test not `identical?` to previous value.
 - As a result, unnecessary Signal propagation is eliminated using highly efficient  checks,
   even for large, deep nested data structures.





Back to the more pragmatic world ...



[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[SPA]:http://en.wikipedia.org/wiki/Single-page_application
[Reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://twitter.com/holmsand
[Flux]:http://facebook.github.io/flux/docs/overview.html#content
[Hiccup]:https://github.com/weavejester/hiccup
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[OM]:https://github.com/swannodette/om
[Prismatic Schema]:https://github.com/Prismatic/schema
[Hoplon]:http://hoplon.io/
[Pedestal App]:https://github.com/pedestal/pedestal-app


-----------------

## Prefer Dumb Views - Part 1

Many events are dispatched by the DOM in response to user actions.

For example, a button view might be like this:
```clj
(defn yes-button
  []
  [:div  {:class "button-class"
          :on-click  #(dispatch [:yes-button-clicked])}
          "Yes"])
```

Notice that `on-click` DOM handler:
```clj
  #(dispatch [:yes-button-clicked])
```

With re-frame, we want the DOM as passive as possible. We do 
not want our views containing any imperative control logic. 
All of that should be computed by event handlers.

We want that "on-click" as simple as we can make it.

**Rule**:  `views` are as passive and minimal as possible when it 
comes to handling events. They `dispatch` pure data and nothing more.

## Prefer Dumb Views - Part 2

Neither do we want views computing the data they render.  
That's the job of a subscription:

So this is bad:
```clj
(defn show-items
  []
  (let [sorted-items (sort @(subscribe [:items]))]  ;; <--
    (into [:div] (for [i sorted-items] [item-view i]))))
```

The view is not simply taking the data supplied by the 
