

### Some Code

**Your job**, when building an app, is to: 
 - design your app's information model (data and schema layer)
 - write and register event handler functions  (control and transition layer)  (domino 2)    
 - (once in a blue moon) write and register effect and coeffect handler 
   functions (domino 3) which do the mutative dirty work of which we dare not 
   speak in a pure, immutable functional context. Most of the time, you'll be 
   using standard, supplied ones.
 - write and register query functions which implement nodes in a signal graph (query layer) (domino 4)
 - write Reagent view functions  (view layer)  (domino 5)
 
At this point you need to see some code ... XXXXXX
 


## Finite State Machines

This perspective can be useful ... 

> Any sufficiently complicated GUI contains an ad hoc, 
> informally-specified, bug-ridden, slow implementation 
> of a hierarchical FSM  <br>
> -- my eleventh rule (see [Greenspun's tenth rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule))

Previously, I commented that `event handlers` (domino 2) collectively 
represent the "control layer" of the application. They contain logic 
which interprets arriving events in the context of existing state, 
and they "step" the application state "forward".

In this way, `events` act like the `triggers` in a finite state machine, and 
the event handlers act like the rules which govern how a the state machine
moves from one logical state to the next.

Not every app has lots of logical states, but some do, and if you are implementing 
one of them, then formally recognising it and using a technique like 
[State Charts](https://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782)
will help greatly in getting a clean design and a nice data model.

So, in this section, I'm suggesting that this perspective is useful sometimes:
  - the first 3 dominoes implement an [Event-driven finite-state machine](https://en.wikipedia.org/wiki/Event-driven_finite-state_machine)
  - the last 2 dominoes reactively render the current state of this FSM for the user to observe
 
Events - that's the way we roll.



## It Does Physics

Remember this diagram from school? The water cycle.
Two stages, involving water in different phases, being acted upon
by different forces: gravity working one way, evaporation/convection the other.

![logo](/images/the-water-cycle.png?raw=true)

To understand re-frame, **imagine data flowing instead of water**. re-frame
provides the "conveyance" of the data - the gravity, evaporation and convection.
You design what's flowing and then you hang functions off the loop at
various points to look after the data's phase changes.

Sure, right now, you're thinking "lazy sods - make a proper Computer Science-y diagram". But, no.
Joe Armstrong says "don't break the laws of physics" - I'm sure 
you've seen the videos - and if he says to do something, you do it
(unless Rich Hickey disagrees, and says to do something else). So,
this diagram, apart from being a plausible analogy, and bordering on useful,
is practically PROOF that re-frame is doing physics.



## Tutorial Table of Contents


 - [What Problem Does It Solve?](#what-problem-does-it-solve)
 - [Guiding Philosophy](#guiding-philosophy)
 - [FRP Clarifications](#frp-clarifications)
 - [Explaining re-frame](#explaining-re-frame)
 - [On Data](#on-data)
 - [The Big Ratom](#the-big-ratom)
 - [The Benefits Of Data-In-The-One-Place](#the-benefits-of-data-in-the-one-place)
 - [Flow](#flow)
 - [How Flow Happens In Reagent](#how-flow-happens-in-reagent)
 - [Components](#components)
 - [Truth Interlude](#truth-interlude)
 - [Components Like Templates?](#components-like-templates)
 - [React etc.](#react-etc)
 - [Subscribe](#subscribe)
 - [Just A Read-Only Cursor?](#just-a-read-only-cursor)
 - [The Signal Graph](#the-signal-graph)
 - [A More Efficient Signal Graph](#a-more-efficient-signal-graph)
 - [The 2nd Flow](#the-2nd-flow)
 - [Event Flow](#event-flow)
 - [What are events?](#what-are-events)
 - [Dispatching Events](#dispatching-events)
 - [Event Handlers](#event-handlers)
 - [Routing](#routing)
 - [Control Via FSM](#control-via-fsm)
 - [As A Reduce](#as-a-reduce)
 - [Derived Data, Everywhere, flowing](#derived-data-everywhere-flowing)
 - [Logging And Debugging](#logging-and-debugging)
 - [In Summary](#in-summary)
 - [Where Do I Go Next](#where-do-i-go-next)
 - [Licence](#licence)

## What Problem Does It Solve?

First, we decided to build our SPA apps with ClojureScript, then we
choose [Reagent], then we had a problem.

For all its considerable brilliance,  Reagent (+ React)
delivers only the 'V' part of a traditional MVC framework.

But apps involve much more than V. Where
does the control logic go? How is state stored & manipulated? etc.

We read up on [Pedestal App], [Flux], 
[Hoplon], [Om], early [Elm], etc and re-frame is the architecture that
emerged.  Since then, we've kept a close eye on further developments like the
Elm Architecture, Om.Next, BEST, Cycle.js, Redux, etc.  They have taught us much
although we have often made different choices.

re-frame does have M, V, and C parts but they aren't objects.  
It is sufficiently different in nature
from (traditional, Smalltalk) MVC that calling it MVC would be confusing.  I'd
love an alternative.

Perhaps it is a RACES framework - Reactive-Atom Component Event
Subscription framework (I love the smell of acronym in the morning).

Or, if we distill to pure essence, `DDATWD` - Derived Data All The Way Down.

*TODO:* get acronym down to 3 chars! Get an image of stacked Turtles for `DDATWD`
insider's joke, conference T-Shirt.


## Guiding Philosophy

__First__, above all we believe in the one true [Dan Holmsand], creator of Reagent, and
his divine instrument the `ratom`.  We genuflect towards Sweden once a day.

__Second__, we believe in ClojureScript, immutable data and the process of building
a system out of pure functions.

__Third__, we believe in the primacy of data, for the reasons previously given. re-frame 
implements an infinite loop of Derived data.

__Fourth__, we believe that Reactive Programming is one honking great idea. 
It is a quite beautiful solution to one half of re-frame's 
data conveyance needs, but we don't take reactivity as far as, say, cycle.js. 
It doesn't take over everything in re-frame - it just does part of the job.

__Finally__, many years ago I programmed briefly in Eiffel where I learned 
about [command-query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation). 
Each generation of
programmers seems destined to rediscover this principle - CQRS is a recent re-rendering. 
And yet we still see read/write `cursors` and two way data binding being promoted as a good thing. 
Just say no. As programs get bigger, their use will encourage control logic into all the 
wrong places and you'll end up with a tire fire of an Architecture. IMHO.



XXX

I'll be using [Reagent] at an intermediate level, so you will need to have done some
introductory Reagent tutorials before going on. Try:
  - [The Introductory Tutorial](http://reagent-project.github.io/) or
  - [this one](https://github.com/jonase/reagent-tutorial) or
  - [Building Single Page Apps with Reagent](http://yogthos.net/posts/2014-07-15-Building-Single-Page-Apps-with-Reagent.html).




## Flow

Arguments from authority ...

> Everything flows, nothing stands still.   (Panta rhei)

> No man ever steps in the same river twice for it's not the same river and he's not the same man.

[Heraclitus 500 BC](http://en.wikiquote.org/wiki/Heraclitus). Who, being Greek, had never seen a frozen river. [alt version](http://farm6.static.flickr.com/5213/5477602206_ecb78559ed.jpg).


> Think of an experience from your childhood. Something you remember clearly, something you can see,
feel, maybe even smell, as if you were really there. After all you really were there at the time,
weren’t you? How else could you remember it? But here is the bombshell: you weren’t there. Not a
single atom that is in your body today was there when that event took place .... Matter flows
from place to place and momentarily comes together to be you. Whatever you are, therefore, you
are not the stuff of which you are made. If that does not make the hair stand up on the back of
your neck, read it again until it does, because it is important.

Steve Grand



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

And for the love of all that is good, please watch this terrific
[StrangeLoop presentation ](https://www.youtube.com/watch?v=fU9hR3kiOK0) (40 mins). Watch what happens
when you re-imagine a database as a stream!! Look at all the problems that are solved.
Think about that: shared mutable state (the root of all evil),
re-imagined as a stream!!  Blew my socks off.


### How Flow Happens In Reagent

To implement FRP, Reagent provides a `ratom` and a `reaction`.
re-frame uses both of these
building blocks, so let's now make sure we understand them.

`ratoms` behave just like normal ClojureScript atoms. You can `swap!` and `reset!` them, `watch` them, etc.

From a ClojureScript perspective, the purpose of an atom is to hold mutable data.  From a re-frame
perspective, we'll tweak that paradigm slightly and **view a `ratom` as having a value that
changes over time.**  Seems like a subtle distinction, I know, but because of it, re-frame sees a
`ratom` as a Signal. [Pause and read this](http://elm-lang.org:1234/guide/reactivity).

The 2nd building block, `reaction`, acts a bit like a function. It's a macro which wraps some
`computation` (a block of code) and returns a `ratom` holding the result of that `computation`.

The magic thing about a `reaction` is that the `computation` it wraps will be automatically
re-run  whenever 'its inputs' change, producing a new output (return) value.

Eh, how?

Well, the `computation` is just a block of code, and if that code dereferences one or
more `ratoms`, it will be automatically re-run (recomputing a new return value) whenever any
of these dereferenced `ratoms` change.

To put that yet another way, a `reaction` detects a `computation's` input Signals (aka input `ratoms`)
and it will `watch` them, and when, later, it detects a change in one of them,  it will re-run that
computation, and it will `reset!` the new result of that computation into the `ratom` originally returned.

So, the `ratom` returned by a `reaction` is itself a Signal. Its value will change over time when
the `computation` is re-run.

So, via the interplay between `ratoms` and `reactions`,  values 'flow' into computations and out
again, and then into further computations, etc.  "Values" flow (propagate) through the Signal graph.

But this Signal graph must be without cycles, because cycles cause mayhem!  re-frame achieves
a unidirectional flow.

Right, so that was a lot of words. Some code to clarify:

```Clojure
(ns example1
 (:require-macros [reagent.ratom :refer [reaction]])  ;; reaction is a macro
 (:require        [reagent.core  :as    reagent]))

(def app-db  (reagent/atom {:a 1}))           ;; our root ratom  (signal)

(def ratom2  (reaction {:b (:a @app-db)}))    ;; reaction wraps a computation, returns a signal
(def ratom3  (reaction (condp = (:b @ratom2)  ;; reaction wraps another computation
                             0 "World"
                             1 "Hello")))

;; Notice that both computations above involve de-referencing a ratom:
;;   - app-db in one case
;;   - ratom2 in the other
;; Notice that both reactions above return a ratom.
;; Those returned ratoms hold the (time varying) value of the computations.

(println @ratom2)    ;; ==>  {:b 1}       ;; a computed result, involving @app-db
(println @ratom3)    ;; ==> "Hello"       ;; a computed result, involving @ratom2

(reset!  app-db  {:a 0})       ;; this change to app-db, triggers re-computation
                               ;; of ratom2
                               ;; which, in turn, causes a re-computation of ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is result of {:b (:a @app-db)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
```

So, in FRP-ish terms, a `reaction` will produce a "stream" of values over time (it is a Signal),
accessible via the `ratom` it returns.


Okay, that was all important background information for what is to follow. Back to the diagram ...

## Components

Extending the diagram, we introduce `components`:

```
app-db  -->  components  -->  Hiccup
```

When using Reagent, your primary job is to write one or more `components`. This is the view layer.

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

### Components Like Templates?

A `component` such as `greet` is like the templates you'd find in
Django, Rails, Handlebars or Mustache -- it maps data to HTML -- except for two massive differences:

  1. you have the full power of ClojureScript available to you (generating a Clojure data structure). The
     downside is that these are not "designer friendly" HTML templates.
  2. these templates are reactive.  When their input Signals change, they
     are automatically rerun, producing new DOM. Reagent adroitly shields you from the details, but
     the renderer of any `component` is wrapped by a `reaction`.  If any of the the "inputs"
     to that render change, the render is rerun.

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

`components` render the app's state as hiccup.

```
app-db  -->  components
```


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


### Just A Read-Only Cursor?

Subscriptions are different to read-only cursors.

Yes, `subscriptions` abstract away (hide) the data source, like a Cursor, but they also allow
for computation. To put that another way, they can create
derived data from `app-db` (a Materialised View of  `app-db`).

Imagine that our `app-db` contained `:items` - a vector of maps. And imagine that we wanted to
display these items sorted by one of their attributes.  And that we only want to display the top 20 items.

This is the sort of "derived data" which a subscription can deliver.
(And as we'll see, more efficiently than a Cursor).

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


## The 2nd Flow

At the top, I said that re-frame had two data flows.

The data flow from `app-db` to the DOM is the first half of the story. We now need to consider
the 2nd part of the story: the flow in the opposite direction.

While the first flow has FRP-nature, the 2nd flow does not.  Well, not at first glance anyway.

When I think about these two flows, I imagine one of those school diagrams showing the water cycle.


Rivers taking water down to the oceans, and evaporation/clouds/wind taking water back over 
the mountains to fall again as rain or snow. Repeat.

There is a cycle, but it is handled by two independent flows.

*With re-frame, it is not water that is flowing, it is data.*

## Event Flow

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
that means the `app-db` will change.  After all, it **is** the state.  And the DOM presented to
the user is a function of that state.

So that tends to be the cycle:

1. the user clicks something which causes an event to be dispatched
2. a handler manages the event
3. and causes `app-db` to change   (mutation happens here!)
4. which then causes a re-render
5. the user sees something different
6. goto #1

That's our water cycle.

Because handlers are that part of the system which does `app-db` mutation, you
could almost imagine them as a "stored procedures" on a
database. Almost. Stretching it?  We do like our in-memory
database analogies.


### Dispatching Events

Events tend to start in the DOM in response to user actions.  They are `dispatched`.

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

With re-frame, we try to keep the DOM as passive as possible. We do not
want our views containing any control logic. That "on-click" is as simple as we can make it.

There's a single `dispatch` function in the entire framework, and it takes one parameter:
the event (vector) to be
dispatched (which is pure simple, lovely data, flowing).

Let's update our diagram to show `dispatch`:

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
 ^                                                                              |
 |                                                                              v
 handlers <----------------------------------------  (dispatch [event-id  event params])
```

**Rule**:  `components` are as passive and minimal as possible when it comes to handling events.
They `dispatch` pure data and nothing more.

### Event Handlers

Collectively, event handlers provide the control logic in a re-frame application.

An event handler is a pure function of two parameters:

 1. current value in `app-db`.  Note: that's the map **in** `app-db`, not the atom itself.
 2. an event (represented as a vector)

It returns the new value which should be reset! into `app-db`.

An example handler:
```Clojure
(defn handle-delete
   [app-state [_ item-id]]          ;; notice how event vector is destructured -- 2nd parameter
   (dissoc-in app-state [:some :path item-id]))     ;; return a modified version of 'app-state'
```

Handling an event invariably involves mutating the value in `app-db`
(which is provided as the first parameter).
An item is added here, or one is deleted there.  So, often simple CRUD, but sometimes much more,
and sometimes with async results.

But the `app-db` mutation is ultimately handled by re-frame (it does the `reset!`). That leaves your event
handlers pure. As a result, they tend to be easy to test and understand.  Many are almost trivial.

There's more to event handlers than can be covered here in this introductory tutorial. Read up on
issues like Middleware [in the Wiki](https://github.com/Day8/re-frame/wiki#handler-middleware).

### Routing


```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
 ^                                                                              |
 |                                                                              v
 handlers <-----  router  <-----------------------  (dispatch [event-id  event params])
```

The `router` will:

1. inspect the 1st element of the arriving vector
2. look in its registry for the handler which is registered for this kind of event
3. call that handler with two parameters: (1) the current value in `app-db` and (2) the event vector
4. reset! the returned value back into `app-db`.

As a re-frame app developer, your job is to write handlers for each kind of event, and
then to register those handlers with the router.

Here's how we would register our event handler:

```Clojure
(reg-event-db
  :delete-item 			;; the event id (name)
  (fn [db [_ item]]		;; the handler function for that event
  ...					
  )       
```

Any arriving event vector which has `:delete-item` as the first element will now be routed to our handler.

### Control Via FSM

Above, I commented that event handlers collectively represent the "control layer" of the
application.  They contain
logic which interprets arriving events and they "step" the application "forward"
via mutations to `app-db`.

Our `delete-handler` above is trivial, but as an application grows more features, the logic in many
handlers will become more complicated, and they will have to query BOTH the current state of the app
AND the arriving event vector to determine what action to take.

If the app is in logical State A, and event X arrives, then the handler will move the app to logical state B
(by changing values in `app-db`).

Sound like anything you learned in those [Theory Of Computation](https://www.youtube.com/watch?v=Pt6GBVIifZA)
lectures?

That's right - as an app becomes more complex, the handlers are likely to be  collectively implementing a
[Finite State Machine](http://en.wikipedia.org/wiki/Finite-state_machine):
  - your app is in a certain logical state (defined by the current values in `app-db`)
  - the arriving event vector represents a `trigger`.
  - the event handler implements "a transition", subject to BOTH the current logical state and the arriving trigger.
  - after the handler has run, the transition may have moved the app into a new logical state.
  - Repeat.

Not every app has lots of logical `states`, but many do, and if you are implementing one of them, then formally
recognising it and using a technique like
[state charts](http://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782) will help
greatly in getting a clean design and a nice datamodel.

The beauty of re-frame from a FSM point of view is that all the data is in one place - unlike OO systems where
the data is distributed (and synchronized) across many objects. So implementing your control logic as a FSM is
both possible and natural in re-frame, whereas it is often difficult and contrived to do so in other
kinds of architecture (in my experience).

### As A Reduce

So here's another way of thinking about what's happening with this data flow - another useful mental model.

First, imagine that all the events ever dispatched by a certain running  app were stored in a collection.
So, if when the app started, the user clicked on button X then the first item in this collection
would be the event generated
by that button, and then, if next the user moved a slider, the associated event would be the
next item in the collection, and so on and so on. We'd end up with a collection of event vectors.


Second, remind yourself that the `combining function` of a `reduce` takes two parameters:

1. the current state of the reduction and
2. the next collection member to fold in.

Then notice that event handlers take two parameters too:

1. the current state of `app-db`
2. the next item to fold in.

Which is the same as a `combining function` in a `reduce`!!

So now we can introduce the new mental model:  at any point in time, the value in `app-db` is the result of
performing a `reduce` over
the entire `collection` of events dispatched in the app up until that time. The combining function
for this reduce is the set of handlers.

It is almost like `app-db` is the temporary place where this imagined `perpetual reduce` stores
its on-going reduction.

### Derived Data, Everywhere, flowing

Have you watched that
[StrangeLoop presentation ](https://www.youtube.com/watch?v=fU9hR3kiOK0) yet?
I hope so. Database as a stream, right?

If you have then, given the explanation above, you might twig to the idea that `app-db` is
really a derived value (of the `perpetual reduce`).

And yet, it acts as the authoritative source of state in the app. And yet, it isn't, it is simply
a piece of derived state.  And
yet, it is the source.

Hmm. This is an infinite loop of sorts. **Derived data is flowing around the
loop, reactively, through pure functions.**  There is a pause in the loop whenever we wait
for a new event, but the moment we get it, it's another iteration of the "derived data" FRP loop.

Derived values, all the way down, forever.

Good news.  If you've read this far,
your insiders T-shirt will be arriving soon - it
will feature turtles
and [xkcd](http://xkcd.com/1416/). We're still working on the hilarious caption bit. Open a
repo issue with a suggestion.

Back to the more pragmatic world ...

### Logging And Debugging

How did that exception happen, you wonder, shaking your head?  What did the user do immediately prior
to the exception?  What state was the app in that this event was so disastrous?

To debug it, you need to know this information:
 1. the state of the app immediately before the exception
 2. What final event then caused your app to fall in a screaming mess.

Well, with re-frame you need to record (have available):
 1. A recent checkpoint of the app state in `app-db` (perhaps the initial state)
 2. all the events `dispatch`ed since the last checkpoint, up to the point where the exception occurred.

Note: that's all just data. **Pure, lovely loggable data.**

If you have that data, then you can reproduce the exception.

re-frame allows you to time travel. Install the "checkpoint" state into `app-db`
and then "play forward" through the collection dispatched events.

The only way the app "moves forwards" is via events. "Replaying events" moves you
step by step towards the exception causing problem.

This is utterly, utterly perfect for debugging assuming, of course, you are in a position to capture
a checkpoint, and the events since then.




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
