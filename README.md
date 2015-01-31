## Status 

Still Alpha. But getting closer.  

Todo:
  - implement pure event handlers.  A macro will be needed.
  - <s>ensure no [memory leaks](https://github.com/reagent-project/reagent/issues/81#issuecomment-71940515)</s>  

## re-frame

re-frame is a tiny [Reagent] framework for writing [SPAs] using ClojureScript.

This document proposes a **pattern** for structuring an SPA using ClojureScript and Reagent. This repo also contains a **reference implementation**.

re-frame is not MVC. There are no objects, just data and pure functions. It is a RACES framework - Reactive-Atom Component Event Subscription framework (I love the smell of acronym in the morning).

### Overview

The re-frame pattern is delightfully simple, yet powerful. 

To build an app using re-frame, you:
  - design your app's data structure (data layer)
  - write and register subscription functions (query layer)
  - write Reagent component functions  (view layer)
  - write and register event handler functions  (control layer and/or state transition layer)

All the functions you write are pure, so the pieces of your app can be 
described, understood and tested independently.

Despite its simplicity, re-frame is impressively buzzword compliant:  it has FRP-nature, unidirectional data flow, pristinely pure functions, conveyor belts, statechart-friendliness and claims an immaculate hammock conception.

### Client Side Bias

We write larger, more complicated SPAs which have a Parisian's indifference for servers.

Unsurprising, re-frame's design reflects our needs. So there's nothing in re-frame about, say, routes, or sessions or syncing client state with server state, etc.  It is just about writing browser-based apps which are desktop-like. That doesn't mean re-frame wouldn't work well when servers are more centrally involved, its just that we haven't tweaked it in that direction.

Remember, re-frame is more of a pattern than an implementation, so you can easily fork it in whatever direction you need.

At small scale, any framework seems like pesky overhead. The 
explanatory examples in here are necessarily small scale, so you'll need to
squint a little to see the benefits that accrue at larger scale.

### Nothing New

Nothing about re-frame is particularly original or clever. You'll find
no ingenious use of functional zippers, transducers or `core.async`. 

And this is a good thing (although, for the record, one day I'd love to develop
something original and clever).

### Guiding Philosophy

First, above all we believe in the one true [Dan Holmsand], creator of Reagent, and his divine instrument the `ratom`.  We genuflect towards Sweden once a day.

Second, we believe in ClojureScript, immutable data and the process of building a system out of pure functions.

Third, we believe that [FRP] is a honking great idea.  You might be tempted to see 
Reagent as simply another of the React wrappers - a sibling to [OM] and [quiescent](https://github.com/levand/quiescent). But you'll only really "get" 
Reagent when you view it as an FRP-ish library. To put that another way, we think 
that Reagent, at its best, is closer in 
nature to [Hoplon] or [Elm] than it is OM.

Finally, we believe in one-way data flow. No cycles!  We don't like read/write `cursors` which promote two way flow of data. re-frame does implement two way data flow, but it
uses two, separate, one-way flows to achieve it, and those two flows 
are different in nature.

### FRP Clarifications

Terminology in the FRP space seems to get people hot under the collar, especially those who believe in continuous-time semantics who'd object to me describing re-frame as having FRP-nature. They'd claim that it does something quite different from pure FRP, which is true, and then they'd testily point out that they'd invented the term. Harrumph.

But, these days, despite the originating purists,  FRP seems to have become a "big tent" (a broad church?). Broad enough perhaps that re-frame can be in the far, top, left paddock of the tent, via a string of qualifications like: re-frame has "discrete, asynchronous, push FRP-ish-nature" without "glitch free" guarantees.  (Surprisingly, "glitch" has specific meaning in FRP).

If you are new to FRP, or reactive programming  generally, I'd recommend browsing these resources before going further (certainly the first):
- [reactive programming backgrounder](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) 
- [presentation (video)](http://www.infoq.com/presentations/ClojureScript-Javelin) by Alan Dipert (co-author of Hoplon)
- [2012 taxonomy and survey](http://soft.vub.ac.be/Publications/2012/vub-soft-tr-12-13.pdf)
- [serious pants thesis](https://www.seas.harvard.edu/sites/default/files/files/archived/Czaplicki.pdf)

## Explaining re-frame

To explain re-frame, I'll incrementally develop a diagram, explaining each part as it is added.

Along the way, I'll be using [Reagent] at an intermediate to advanced level.  But this is no introductory reagent tutorial and you will need to have done one of those before continuing here. Try
[The Introductory Tutorial](http://reagent-project.github.io/) or 
[this one](https://github.com/jonase/reagent-tutorial) or
[Building Single Page Apps with Reagent](http://yogthos.net/posts/2014-07-15-Building-Single-Page-Apps-with-Reagent.html).

##### On Data

<blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

##### The Big Ratom 

Our re-frame diagram starts (very modestly) with  Fogus' ***well-formed data at rest*** bit:

```
app-db
```

re-frame says that you put your data into one place which we'll call `app-db`. Structure the data in that place, of course, and [give it a schema](https://github.com/Prismatic/schema).

Now, this advice is not the slightest bit controversial for 'real' databases, right? 
You'd happily put all your well-formed data into PostgreSQL or MySQL. But within a running application (in memory), it is different. If you have a background in OO, this data-in-one-place business is a hard one to swallow.  You've
spent your life breaking systems into pieces, organised around behaviour and trying
to hide the data.  I still wake up in a sweat some nights thinking about all
that Clojure data lying around exposed and passive.

But, as Fogus reminds us, data at rest is the easy bit. 

From here on in this document, we'll assume `app-db` is one of these: 

```Clojure
(def app-db  (reagent/atom {}))    ;; a Reagent atom, containing a map
```

Although it is a `Reagent atom` (hereafter `ratom`), I'd encourage you to think of it as an in-memory database. 
It will contain structured data. You will need to query that data. You will perform CRUD 
and other transformations on it. You'll often want to transact on this
database atomically, etc.  So "in-memory database"
seems a more useful paradigm than plain old map-in-atom.

Finally, a clarification:  `app-db` doesn't actually have to be a reagent/atom containing
a map. In theory, re-frame
imposes no requirement here.  It could be a [datascript] database (approach untested).  But, as you'll see, it
does have to be a "reactive datastore" (one that can tell you when it has changed).  In fact, `app-db` doesn't have to be a single atom either -- the pattern allows for as many as you like,  although our implementation assumes one.

##### Benefits Arising From This Approach

I'm going to quote verbatim from Elm's website:

1. There is a single source of truth. Traditional approaches force you to write a decent amount of custom and error prone code to synchronize state between many different stateful components. (The state of this widget needs to be synced with the application state, which needs to be synced with some other widget, etc.) By placing all of your state in one location, you eliminate an entire class of bugs in which two components get into inconsistent states. We also think you will end up writing much less code. That has been our observation in Elm so far.

2. Save and Undo become quite easy. Many applications would benefit from the ability to save all application state and send it off to the server so it can be reloaded at some later date. This is extremely difficult when your application state is spread all over the place and potentially tied to objects that cannot be serialized. With a central store, this becomes very simple. Many applications would also benefit from the ability to easily undo user's actions. For example, a painting app is better with Undo. Since everything is immutable in Elm, this is also very easy. Saving past states is trivial, and you will automatically get pretty good sharing guarantees to keep the size of the snapshots down.

[Hoplon] takes the same approach via what they called `stem cells`, whch is a root source of data.

#### Flow
Arguments From Authority
> Everything flows, nothing stands still.   (Panta rhei)

> No man ever steps in the same river twice for it's not the same river and he's not the same man.

[Heraclitus 500 BC](http://en.wikiquote.org/wiki/Heraclitus). Who, being Greek, never saw a frozen river. [alt version](http://farm6.static.flickr.com/5213/5477602206_ecb78559ed.jpg).

> This, milord, is my family's axe. We have owned it for almost nine hundred years, see. Of course, sometimes it needed a new blade. And sometimes it has required a new handle, new designs on the metalwork, a little refreshing of the ornamentation . . . but is this not the nine hundred-year-old axe of my family? And because it has changed gently over time, it is still a pretty good axe, y'know. Pretty good.

Terry Pratchett, The Fifth Elephant

> Think of an experience from your childhood. Something you remember clearly, something you can see, feel, maybe even smell, as if you were really there. After all you really were there at the time, weren’t you? How else could you remember it? But here is the bombshell: you weren’t there. Not a single atom that is in your body today was there when that event took place .... Matter flows from place to place and momentarily comes together to be you. Whatever you are, therefore, you are not the stuff of which you are made. If that does not make the hair stand up on the back of your neck, read it again until it does, because it is important.

Richard Dawkins

#### How Flow Happens In Reagent

To implement FRP-ish-ness, Reagent provides a `ratom` and a `reaction`. re-frame uses both of these building blocks, so let's now make sure we understand them before going further.

`ratoms` behave just like normal ClojureScript atoms. You can `swap!` and `reset!` them, `watch` them, etc.

From a ClojureScript perspective, the purpose of an atom is to hold mutable data.  From an re-frame perspective, we'll tweak that paradigm ever so slightly and **view a `ratom` as being a value that changes over time.**  Seems like a subtle distinction, I know, but because of it, re-frame sees a `ratom` as a Signal. [Pause and read this](http://elm-lang.org/learn/What-is-FRP.elm).

The 2nd building block, `reaction`, acts a bit like a function. It's a macro which wraps some `computation` (a block of code) and returns a `ratom` holding the result of that `computation`.

The magic thing about a `reaction` is that the `computation` it wraps will be automatically re-run  whenever 'its inputs' change, producing a new output (return) value.

Eh, how?

Well, the `computation` is just a block of code (some forms), and if that code dereferences one or more `ratoms`, it will be automatically re-run (recomputing a new return value) whenever any of these dereferenced `ratoms` change.

To put that yet another way, a `reaction` detects a `computation's` input Signals (aka input `ratoms`) and it will `watch` them, and when, later, it detects a change in one of them,  it will re-run that computation, and it will `reset!` the new result of that computation into the `ratom` originally returned. 

So, the `ratom` returned by a `reaction` is itself a Signal. Its value will change over time when the `computation` is re-run.

So, via the interplay between `ratoms` and `reactions`,  values 'flow' into computations and out again, and then into other computations, etc.  "Values" flow (propagate) through the Signal graph. 

But this Signal graph will be one without cycles, because cycles cause mayhem!  re-frame achieves a unidirectional flow.

While the mechanics are different, `reaction` has the intent of `lift` in [Elm] and `defc=` in [Hoplon].

Right, so that was a lot of words. Some code to clarify: 

```Clojure
(ns example1
  (:require-macros [reagent.ratom :refer [reaction]])  ;; reaction is a macro
  (:require        [reagent.core  :as    reagent]))
    
(def app-db  (reagent/atom {:a 1}))           ;; our root ratom  (signal)

(def ratom2  (reaction {:b (:a @app-db)}))    ;; reaction wraps a computation, returns a signal
(def ratom3  (reaction (cond = (:b @ratom2)   ;; reaction wraps another computation
                             0 "World"
                             1 "Hello")))

;; Notice that both computations above involve de-referencing a ratom:
;;   - app-db in one case
;;   - ratom2 in the other
;; Notice that both reactions above return a ratom.
;; Those returned ratoms hold the (time varying) value of the computations.

(println @ratom2)    ;; ==>  {:b 1}       ;; a computed result, involving @app-db
(println @ratom3)    ;; ==> "Hello"       ;; a computed result, involving @ratom2

(reset!  app-db  {:a 0})        ;; this change to app-db, triggers re-computation
                                ;; of ratom2
                                ;; which, in turn, causes a re-computation of ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is result of {:b (:a @app-db)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
```

So, in FRP-ish terms, a `reaction` will produce a "stream" of values over time (it is a Signal), accessible via the `ratom` it returns.

Okay, that was all important background information for what is to follow. Back to the diagram ...

### Components

Extending the diagram, we introduce `components`:

```
app-db  -->  components  -->  Hiccup
```

When using Reagent, your primary job is to write one or more `components`.

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

You'll notice that our component is a regular Clojure function, nothing special. In this case, it takes no parameters and it returns a ClojureScript vector (formatted as Hiccup).

Here is a slightly more interesting (parameterised) component (function): 

```Clojure
(defn greet                     ;; greet has a parameter now
   [name]                       ;; 'name' is a ratom  holding a string
   [:div "Hello "  @name])      ;; dereference 'name' to extract the contained value 

;; create a ratom, containing a string
(def n (reagent/atom "re-frame")) 

;; call our `component` function, passing in a ratom
(greet n)                   
;; ==>  [:div "Hello " "re-frame"]    returns a vector 
```

So components are easy - at core they are a render functions which turn data into Hiccup (which will later become DOM). 

Now, let's introduce `reaction` into this mix.  On the one hand, I'm complicating things by doing this, because Reagent allows you to be ignorant of the mechanics I'm about to show you. (It invisibly wraps your components in a `reaction` allowing you to be blissfully ignorant of how the magic happens.)

On the other hand, it is useful to understand exactly how the Reagent Signal graph is wired, because in a minute, when we get to subscriptions, we'll be directly using `reaction`, so we might as well bite the bullet here and now ... and, anyway, it is pretty easy...

```Clojure
(defn greet                 ;; a component - data in, Hiccup out.
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

So, as `n` changes value over time (`reset!`), the output of the computation `(greet n)` changes, which in turn means that the value in `hiccup-ratom` changes. Both `n` and `hiccup-ratom` are FRP Signals. The Signal graph we created causes data to flow from `n` into `hiccup-ratom`.

This is one-way data flow, with FRP-nature.

### Truth Interlude

I haven't been entirely straight with you:  
1. Reagent re-runs `reactions` (re-computations) via requestAnimationFrame. So a re-computation happens about 16ms after changed input Signals are detected, or after the current thread of processing finishes, whichever is the greater. So if you are in a bREPL and you run the lines of code above one after the other too quickly,  you might not see the re-computation done immediately after `n` gets reset!, because the next animationFrame hasn't run (yet).  But you could add a `(reagent.core/flush)` after the reset! to force re-computation to happen straight away.
2. `reaction` doesn't actually return a `ratom`.  But it returns something that has ratom-nature, so we'll happily continue believing it is a `ratom` and no harm will come to us.

On with the rest of my lies and distortions...

### Components Like Templates?

A `component` like `greet` is like the templates you'd find in
Django, Rails, Handlebars or Mustache -- it maps data to HTML -- except for two massive differences:
- you have the full power of ClojureScript available to you (generating a Clojure data structure). The downside is that these are not "designer friendly" HTML templates.
- these templates are reactive.  When their input Signals change, they
  are automatically rerun, producing new DOM. Reagent adroitly shields you from the details, but the renderer of any `component` is wrapped by a `reaction`.  If any of the the "inputs" to that render change, the render is rerun.

### React etc.

Okay, so we have some unidirectional, reactive, async, discrete FRP-ish data flow happening here.

Question: To which ocean does this river flow?  Answer: The DOM ocean.  

Here's the flow in full: 
```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each
function takes data from the
previous step, and produces data for the next step.  In the next
diagram, the three functions are marked (f1, f2, f3). The unmarked nodes are data,
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
    Reagent       ;; produces VDOM  (virtual DOM that React understands)
    React)        ;; produces HTML (which magically and efficiently appears on the page).
```

Via the interplay between `ratom` and `reaction`, changes to `app-db` are pushed into the pipeline, causing new DOM to pop out the other end, and be displayed on our page. 

But we don't have to bother ourselves with most of the pipeline. We just write the `components` part and Reagent/React will look after the rest.

### Subscribe

Whilst it is interesting to get the big picture, most of it happens "for free".  We don't have to do much other than to kick start it correctly. That means understanding `subscribe`. 

```
app-db  -->  components 
```

`components` render the app's GUI. They render the state of the app. They render `app-db` because it **is** the state of the app.

So, `components` (view layer) need to query aspects of `app-db` (data layer).

Let's pause to consider **our dream solution** for this part of the flow. `components` would:
   * obtain data from `app-db`  (their job is to turn this data into hiccup).
   * obtain this data via a (possibly parameterised) query over `app-db`. Think database kinda query.
   * automatically recompute their hiccup output, as the data returned by the query changes, over time. 
   * use declarative queries. Components should know as little as possible about the structure of `app-db`. SQL?  Datalog?

re-frame's `subscriptions` are an attempt to live this dream. They fall short on the declarative query part, but they are close to the dream solution. 

As a re-frame app developer, your job will be to write and register one or more "subscription handlers" - functions that do a named query.  Your subscription functions must return a value that changes over time (a Signal). I.e. they'll be returning a reaction or, at least, the `ratom` produced by a `reaction`.

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

First, note this is a [Form-2](https://github.com/reagent-project/reagent/wiki/Creating-Components#form-2--a-function-returning-a-function) `component` ([there are 3 forms](https://github.com/reagent-project/reagent/wiki/Creating-Components)).

Previously in this document, we've used the simplest, Form-1 components (no setup was required, just render). With Form-2 components, there's a function returning a function:
- the returned function is the render function. Behind the scenes, Reagent will wrap this render function in a `reaction` to make it produce new Hiccup when its input Signals change.  In our example above, that means it will rerun every time `name-ratom` changes. 
- the outer function is a setup function, called once to initialise the component. Notice the use of 'subscribe' with the parameter `:name-query`. That creates a Signal through which new values are supplied over time.

`subscribe` is called like this: 

```Clojure
    (subscribe  [query-id some optional query parameters])
```

There is only one `subscribe` function and it takes one parameter, assumed to be a vector. 

The first element in the vector (shown as `query-id`) identifies/names the query and the other elements are optional, query parameters. With a traditional database a query might be:

```
select * from customers where name="blah"
```

In re-frame land, that would be done as follows:
    (subscribe  [:customer-query "blah"])
which would return a `ratom` holding the customer state (a value which might change over time!). 

For this to work, we must write and register a subscription handler for `:customer-query`

```Clojure
(defn customer-query     ;; a query over 'app-db' which returns a customer
    [db, [sid cid]]      ;; query fns are given 'app-db', plus vector given to subscribe
    (assert (= sid :customer-query))   ;; subscription id was the first vector
    (reaction (get-in @db [:path :to :a :map cid])))    ;; re-runs each time db changes
    
;; register our query handler
(register
    :customer-query       ;; the id (the name of the query()
    customer-query)       ;; the function which will perform the query
```

**Note**: `components` tend to be organised into a hierarchy, often with data flowing from parent to child via parameters. So not every component needs a subscription. Very often the values passed in from a parent component are sufficient.

**Rule**: subscriptions can only be used in `Form-2` components and the subscription must be in the outer setup function and not in the inner render function.  So the following is **wrong** (compare to the correct version above)

```Clojure
(defn greet         ;; a Form-1 component - no inner render function
   []
   (let [name-ratom  (subscribe [:name-query])]    ;; Eek! subscription in renderer
        [:div "Hello" @name-ratom]))
```

Why is this wrong?  Well, this component would get re-rendered every time `db-app` changed, even if the value in `name-ratom` (query result) stayed the same. Use a `Form-2` component instead, and put the subscription in the outer functions. 

### The Signal Graph

A bigger example ...

Imagine that our `app-db` contains some `items` - a vector of maps. And imagine that we must display these items sorted by one of their attributes. 

Think of it like this:
```Clojure
(def i-list  [{:name "a" :val 23 :} 
              {:name "b" :val 81
              {:name "c" :val 23}])
(def  db-app (reagent/atom  {:items i-list})
``

We could write this query-handler:

```Clojure
(register
  :sorted-items              ;; the query id  
  (fn [db [_ sort-kw]]       ;; sort-kw is a ratom, contains a keyword. 
    (assert (keyword? @sort-kw))
    (reaction
       (let [items (get-in @db [:some :path :items])]  ;; extract items from db
           (sort-by @sort-kw items)))))                ;; return them sorted
```


Subscription handlers are given two parameters:
1. `app-db` - that's a reagent/atom which holds ALL the app's state. This is the "database" on which we perform the "query". 
2. the vector originally supplied to `subscribe`.

In the example above, notice that the reaction wraps 2 input Signals:  `db` and `sort-kw`. 
If either changes, the query is re-run.

In a component, we could use this query via `subscribe`:

```Clojure
(defn items-list         ;; Form-2 component - outer, setup function, called once
   []
   (let [by-this (reagent/atom :name)    ;; sort by :name attribute, GUI might reset! this somehow
         items   (subscribe [:sorted-items by-this])   ;; <--   subscribe called here
         num     (reaction (count @items))]    ;; Woh! a reaction based on the subscription
      (fn []
        [:div  
            (str "there's " @num " of these suckers")     ;; rookie mistake to leave off the @
            (into [:div ] (map item-render @items))])))   ;; item-render is another component
```

There's a bit going on in that `let`, most of it highly contrived, just so I can show off chained reactions. Okay, okay. All I wanted really was an excuse to use the phrase "chained reactions". 

The calculation of `num` is done by a `reaction` which has `items` as a an input Signal. And, as we saw, `items` is itself a reaction over two other signals (one of them the `app-db`).

In reality, the approach taken above is inefficient. Every time `app-db` changes, the `:sorted-items` query is going to be re-run and it's going to re-sort items.  But items might not have changed. Some other part of `app-db` may have changed. We don't want to re-sort items each time something unrelated changes.

We can fix that up by slightly changing our subscription function:
 
```Clojure
(register
  :sorted-items               ;; the query id  
  (fn [db [_ sort-kw]]        ;; sort-kw is a ratom containing the attribute to sort on
    (assert (keyword? @sort-kw))
    (let [items (reaction (get-in @db [:some :path :items]))]    ;; reaction #1
        (reaction (sort-by @sort-kw @items)))))                  ;; reaction #2
```

So now there's one reaction which uses the result of another reaction. The 1st reaction just extracts `items`. The 2nd one does the CPU-expensive sort.

That 2nd, expensive reaction will only be triggered if `@items` does not test `identical?` to the previous value. **Yes, that sort of optimisation is built into chain `reactions`.**  Which, in turn, means the component render function (which is wrapped in yet another reaction) won't rerun unless `items` itself changes. Now we're very efficient. Thank you immutable data structures.

If I were doing this for real (rather than just showing possibilities), I'd probably create a simple subscription for items (unsorted), and then do the sort in the component itself (as a reaction, similar to the way `num` was done in the example above). After all, it is the component which needs the sorting, so it should explicitly do that work. 

Summary:
  - you can chain reactions.
  - Reagent will eliminate unnecessary Signal propagation via highly efficient `identical?` checks (not equality checks!). This is the beautiful by-product of working with immutable data structures


### The 2nd Flow

At the top, I said that re-frame had two data flows.

The data flow from `app-db` to the DOM is the first half of the story. We now need to consider the 2nd part of the story: the flow in the opposite direction.

While the first flow has FRP-nature, the 2nd flow does not.

When I think about these two flows, I imagine [one of those school diagrams](http://thumbnails-visually.netdna-ssl.com/water-cycle_521f29b8b6271_w1500.png) showing the water cycle. Rivers taking water down to the oceans, and evaporation/clouds/wind taking water back over the mountains to fall again as rain or snow. Repeat.

There is a cycle, but it is handled by two independent flows.

### Event Flow

Events are what flow in the opposite direction.

In response to user interaction, a DOM will generate
events like "clicked delete button on item 42" or
"unticked the checkbox for 'send me spam'".

These events have to be "handled".  The code doing this handling might
 mutate app state (in `app-db`), or request more data from the server, or POST somewhere and wait for a response, etc. 
 
In fact, all these actions ultimately result in changes to the `app-db`.

An application has many handlers, and collectively
they represent the **control layer of the application**. 

In re-frame, the backwards data flow of events happens via a conveyor belt:

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
  ^                                                                              |
  |                                                                              v
  handlers <-------------------  events  -----------------------------------------
                           a "conveyor belt" takes events
                           from the DOM to the handlers
```

Generally, when the user manipulates the GUI, the state of the application changes. In our case, 
that means the `app-db` will change.  After all, it **is** the state.  And the DOM presented to the user is a function of that state. 

So that tends to be the cycle:  DOM events dispatch, handlers manage them, which  cause `app-db` changes, which then cause a re-render, and the users sees something different. That's our water cycle.

Because handlers are that part of the system which does `app-db` mutation, you
could almost imagine them as a "stored procedures" on a
database. Almost. Stretching it?  We do like our in-memory
database analogies.

### What are events?

Events are data. You choose the format.

Our reference implementation chooses a vector format. For example:

    [:delete-item 42]

The first item in the vector identifies the event and
the rest of the vector is the optional parameters -- in the example above, the id (42) of the item to delete.

Here are some other example events:

```Clojure
    [:yes-button-clicked]
    [:set-spam-wanted false]
    [[:complicated :multi :part :key] "a parameter" "another one"  45.6]
```

**Rule**:  events are pure data. No dirty tricks like putting callback functions on the wire. You know who you are.

### Dispatching Events

Events start in the DOM.  They are `dispatched`.

For example, a button component might be like this:
 
```Clojure
    (defn yes-button
        []
        [:div  {:class "button-class"
                :on-click  #(dispatch [:yes-button-clicked])}
                "Yes"])
```

Notice the `on-click` DOM handler:

```Clojure
    #(dispatch [:yes-button-clicked])
```

With re-frame, we try to keep the DOM as passive as possible. So that "on-click" is a simple as we can make it.

There's a single `dispatch` function in the entire framework, and it takes one parameter: the event to be dispatched (which is pure simple, lovely data).

Let's update our diagram to show `dispatch`:

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
  ^                                                                              |
  |                                                                              v
  handlers <----------------------------------------  (dispatch [event-id  event params])
```

**Rule**:  `components` are as passive and minimal as possible when it comes to handling events. They `dispatch` pure data and nothing more.

### Event Handlers 

Collectively, event handlers provide the control logic in a re-frame application.

An event handler is a pure function of two parameters  (*** not true in reference impl, yet ***):
  1. current value in `app-db` 
  2  an event (represented as a vector)

It returns the new value which should be reset! into `app-db`. 

An example handler:
```Clojure
(defn handle-delete
    [app-state [_ item-id]]          ;; notice how event vector is destructured -- 2nd parameter
    (dissoc-in app-state [:some :path item-id]))     ;; return a modified version of 'app-state'
```

Handling an event invariably involves mutating the value in `app-db` (which is provided as the first parameter).  An item is added here, or one is deleted there.  So, often simple CRUD, but sometimes much more, and sometimes with async results.

But the `app-db` mutation is ultimately handled by re-frame (it does the `reset!). That leaves your event handlers pure. As a result, they tend to be easy to test and understand.  Many are almost trivial.

### Routing

When `dispatch` is passed an event vector, it just puts that event onto a conveyor belt. 

The consumer on the end of the conveyor is a `router` which will organise to for that event to be processed by the right handler.


```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
  ^                                                                              |
  |                                                                              v
  handlers <-----  router  <-----------------------  (dispatch [event-id  event params])
```

The `router` will:
1. inspect the 1st element of the arriving vector
2. look in its registry for the handler which looks after this kind of event
3. call that handler with two parameters: (1) the current value in `app-db` and (2) the event vector
4. reset! the returned value back into `app-db`.

As a re-frame app developer, your job is to write handlers for each kind of event, and then to register those handlers with the router. 

Here's how we would register our event handler:

```Clojure
(register
   :delete-item         ;; the event id (name)
   handle-delete)       ;; the handler function for that event
```

Any arriving event vector which has `:delete-item` as the first element will now be routed to our handler.

### Control Via FSM 

Above, I commented that event handlers collectively represent the "control layer" of the application.  They contain logic which interprets arriving events and they "step" the application "forward" via mutations to `app-db`.

Our `delete-handler` example above is trivial, but as an application grows more features, the logic in many handlers will become more complicated, and they will have to query BOTH the current state of the app AND the arriving event vector to determine what action to take. 

At that point, we're implementing a [Finite State Machine](http://en.wikipedia.org/wiki/Finite-state_machine):
   - your app is in a certain logical state (defined by the current values in `app-db`)
   - the arriving event vector represents a `trigger`.
   - the event handler implements "a transition" subject to BOTH the current logical state and the arriving trigger. 
   - after the handler has run, the transition may have moved the app into a new logical state. 
   - Repeat.

Not every GUI has lots of logical `states`, but many do, and if you are implementing one of them, then formally recognising it and using a technque like [statecharts](http://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782) will help greatly in getting a clean design.

The beauty of re-frame from a FSM point of view is that re-frame stores all its data in one place - unlike OO systems where the data is distributed (and synchronized) across many objects. So implementing your control logic as a FSM is possible and natural in re-frame, whereas it is often difficult and contrived to do so in other kinds of architecture.

### Talking To A Server

Some events handlers will need to initiate an async server connection (e.g. GET or POST something). 

The initiating event handlers should organise that the `on-success` or `on-fail` handlers for these HTTP requests themselves simply dispatch an event.  

**Notes**: 
  - all events are handled via a call to `dispatch`. GUI events, async HTTP events, everything. 
  - `dispatch` will cause a handler function to be called. But the process is async. The call is queued.
  - if you (further) dispatch in a handler, then that will be async too. The associated handler is queued for calling later.  Why?  Partially because handlers are given a snapshot of the `app-db` and can't be nested.
  - if you kick off an HTTP request in a handler, then organise for the on-success or on-fail handlers to dispatch their outcome.  All events are handled via dispatch.
  - if a handler does a lot of work and hogs the thread, this will freeze the GUI because browsers only give us one execution thread .  **XXX Nice Solution needed. **

  
### In Summary

To build an app using re-frame, you'll have to:
  - design your app's data structure.
  - write and register subscription functions (query layer).
  - write component functions  (view layer).
  - write and register event handler functions  (control layer and/or state transition layer).
 
All the parts are lovely and simple.  And they plug together nicely.
 

[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[Reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://twitter.com/holmsand
[Hiccup]:https://github.com/weavejester/hiccup
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[OM]:https://github.com/swannodette/om
[Prismatic Schema]:https://github.com/Prismatic/schema
[datascript]:https://github.com/tonsky/datascript
[Hoplon]:http://hoplon.io/
[Pedestal App]:https://github.com/pedestal/pedestal-app
[Herbert Schema]:https://github.com/miner/herbert


