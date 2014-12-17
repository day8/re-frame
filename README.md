## Status 

Still Alpha. But getting closer.  

There will be typos. The code examples will contain mistakes. Some claims in this document do not yet match the library. 

## re-frame

re-frame is a tiny [reagent] framework for writing  [SPAs] using ClojureScript.

It proposes a pattern for structuring an app, and provides a small library
implementing one version of this pattern.

In another context, re-frame might be called an MVC framework, except
it is instead a functional RACES framework - Reactive-Atom Component Event Subscription
(I love the smell of acronym in the morning).

### Claims

Nothing about re-frame is the slightest bit original or clever.  You'll find 
no ingenious use of functional zippers, transducers or core.async. 
This is a good thing (although, for the record, one day I'd love to develop
something original and clever).

Using re-frame, you will be able to break your application code into distinct 
pieces, and those distinct pieces will be pure functions. 
Each can be easily described, understood and tested independently.

At small scale, any framework seems like pesky overhead. The 
explanatory examples in here are necessarily small scale, so you'll need to
squint a little to see the benefit.

We write larger, complicated SPAs and we've found it a delight to use so far.

### Core Beliefs

First, above all we believe in the one true [Dan Holmsand] (creator of reagent), 
and his divine instrument the `ratom`.  We genuflect towards Sweden once a day. 

Second, we believe that [FRP] is a honking great idea.  You might be tempted to see 
reagent as simply another of the React wrappers (a sibling to [OM] and [quiescent](https://github.com/levand/quiescent)). But I think you only really "get" 
Reagent when you view it as an [FRP] library. To put that another way, we think 
that Reagent, at its best, is closer in 
nature to [Hoplon] or [Elm] than it is [OM]

Finally, we believe in one way data flow.  We don't like read/write `cursors` which
promote two way flow of data. re-frame does implement two data way flow, but it 
uses two, separate, one-way flows to achieve it, and those two flows 
are different in nature.

If you are curious about FRP, I'd recommend [this FRP backgrounder](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) before you go any further.

### High Level Tasks

When you use re-frame, you'll create your app by writing three kinds of functions:
  - subscriptions - which query over application state and create signals (move data into components)
  - components - which turn data into hiccup (DOM)
  - event handlers - which provide the state transition (control) layer

You'll also be designing a data structure to represent the app state, and probably writing a [herbert schema](https://github.com/miner/herbert) for it.

## The Parts

To teach re-frame, I'll now incrementally develop a diagram, explaining each part as it is added.

Along the way, I'll be using [reagent] at an intermediate to advanced level. This is not an introduction to reagent tutorial, so you need to have done one of those before getting here. Try
[the official intro](http://reagent-project.github.io/) or 
[this](https://github.com/jonase/reagent-tutorial) or 
[this](http://yogthos.net/posts/2014-07-15-Building-Single-Page-Apps-with-Reagent.html).

<blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

##### The Big Ratom 

Our re-frame diagram starts with the "well-formed data at rest" bit: 

```
app-db
```

re-frame recommends that you put your data into one place which we'll call `app-db`. Structure the data in that place, of course. And [give it a schema](https://github.com/miner/herbert).

Now, this advice is not the slightest bit controversial for 'real' databases, right? 
You'd happily put all your well-formed data into PostgreSQL or MySQL. But within a running application (in memory), it is different. If you have a background in OO, this data-in-one-place is a 
hard one to swallow.  You've
spent your life breaking systems into pieces, organised around behaviour and trying
to hide the data.  I still wake up in a sweat some nights thinking about all
that Clojure data lying around exposed and passive.

But, as @fogus tells us, data is the easy bit. 

From here on, we'll assume `app-db` is one of these: 

```Clojure
(def app-db  (reagent/atom {}))    ;; a reagent atom, containing a map
```

Although it is a reagent atom (`ratom`), I'd encourage you to think of it as an in-memory database. 
It will contain structured data (perhaps with a formal [Herbert Schema] spec).
You will need to query that data. You will perform CRUD 
and other transformations on it. You'll often want to transact on this
database atomically, etc.  So "in-memory database"
seems a more useful paradigm than plain old atom.

Finally, a clarification:  `app-db` doesn't actually have to be a reagent/atom containing
a map. In theory, re-frame
imposes no requirement here.  It could be a [datascript] database (untested).  But, as you'll see, it
does have to be a "reactive datastore" (one that can tell you when it has changed).  In fact, `app-db` doesn't have to be a single atom either -- the pattern allows for as many as you like,  although our implementation assumes one.

##### Benefits Arising From This Approach

I'm going to quote verbatim from Elm's website:

1. There is a single source of truth. Traditional approaches force you to write a decent amount of custom and error prone code to synchronize state between many different stateful components. (The state of this widget needs to be synced with the application state, which needs to be synced with some other widget, etc.) By placing all of your state in one location, you eliminate an entire class of bugs in which two components get into inconsistent states. We also think you will end up writing much less code. That has been our observation in Elm so far.

2. Save and Undo become quite easy. Many applications would benefit from the ability to save all application state and send it off to the server so it can be reloaded at some later date. This is extremely difficult when your application state is spread all over the place and potentially tied to objects that cannot be serialized. With a central store, this becomes very simple. Many applications would also benefit from the ability to easily undo user's actions. For example, a painting app is better with Undo. Since everything is immutable in Elm, this is also very easy. Saving past states is trivial, and you will automatically get pretty good sharing guarantees to keep the size of the snapshots down.

##### Background Magic

Reagent provides a `ratom` (reagent atom) and a `reaction`. These are **two key building blocks**.

Mechanically, `ratoms` are like normal ClojureScript atoms. You can `swap!` and `reset!` them, `watch` them, etc. Mechanically, it holds mutable data.  **Conceptually**, though we'll tweak that paradigm ever so slightly.  **We view a `ratom` as being a value that changes over time.** This means we'll view it as an FRP [Signal](http://elm-lang.org/learn/What-is-FRP.elm).

`reaction` acts a bit like a function. It's a macro which wraps some `computation` (some block of code) and returns a `ratom` containing the result of that `computation`.

The computation performed by a `reaction` may involve dereferencing one or more `ratoms`. 

A `reaction` will automatically rerun its `computation` whenever any of these dereferenced `ratoms` change.  
So, the `ratom` returned by a `reaction` is itself a Signal. Its value will change over time as its input Signals (the dereferenced `ratoms`) change. 

So values can 'flow' into computations and out again, and then into other computations, etc. The result is some sort of signal graph. But our graph will be without cycles, because cycles are bad! 

While the mechanics are different, `reaction` has the intent of `lift` in [Elm] and `defc=` in [Hoplon].

Some code to clarify: 

```Clojure
(ns example1
  (:require-macros [reagent.ratom :refer [reaction]])  ;; reaction is a macro
  (:require        [reagent.core  :as    reagent]))
    
(def app-db  (reagent/atom {:a 1}))           ;; our root ratom  (signal)

(def ratom2  (reaction {:b (:a @app-db)}))    ;; reaction wraps a computation, returns a signal
(def ratom3  (reaction (cond = (:b @ratom2)   ;; reaction wraps another computation
                             0 "World"
                             1 "Hello")))

;; Notice that both computations above involve dereferencing a ratom: 
;;   - app-db in one case
;;   - ratom1 in the other
;; Notice that both reactions above return a ratom. 
;; Those returned ratoms hold the (time varying) value of the computations.

(println @ratom2)    ;; ==>  {:b 1}       ;; a computed result, involving @app-db
(println @ratom3)    ;; ==> "Hello"       ;; a computed result, involving @ratom2

(reset!  app-db  {:a 0})        ;; this change to app-db, triggers recomputation 
                                ;; of  ratom2 
                                ;; which, in turn, causes a re-computation of ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is result of {:b (:a @app-db)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
```

So, in FRP terms, a `reaction` will produce a "stream" of values (it is a Signal), accessible via the `ratom` it returns.

Okay, so that was all important background information for what is to follow. Back to the diagram...

### The Components

Extending the diagram a bit, we introduce `components`:

```
app-db  -->  components  -->  hiccup
```

When using reagent, your primary job is to write one or more `components`.  

Think about `components` as `pure functions` - data in, hiccup out.  `hiccup` is
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

You'll notice that our component is a regular Clojure function, nothing special. In this case, it takes no parameters and it returns a ClojureScript vector (hiccup).

Here is a slightly more interesting (parameterised) component (function): 

```Clojure
(defn greet                     ;; greet now has a parameter
   [name]                       ;; 'name' is a ratom  containing a string
   [:div "Hello "  @name])      ;; dereference 'name' here to extract the value it contains 

;; create a ratom, containing a string
(def n (reagent/atom "re-frame")) 

;; call our `component` function
(greet n)                   
;; ==>  [:div "Hello " "re-frame"]    returns a vector 
```

So components are easy - they are functions which turn data into hiccup (which will later become DOM). 

Now, we're now going to introduce `reaction` into this mix.  On the one hand, I'm complicating things by doing this, because reagent allows you to be ignorant of the mechanics I'm about to show you.  It invisibly wraps your components in a `reaction` allowing you to be blissfully ignorant of how the magic happens.  

On the other hand, it is useful to understand exactly how the Signal graph is wired.  AND, in a minute, when we get to subscriptions, we ourselves will be actively using `reaction`, so we might as well bite the bullet here and now ... and, anyway, it is easy...
 
```Clojure
(defn greet
   [name]                       ;; name is a ratom
   [:div "Hello "  @name])      ;; dereference name here, to extract the value within 
   
(def n (reagent/atom "re-frame"))

;; The computation '(greet n)' returns hiccup which is stored into 'hiccup-ratom'
(def hiccup-ratom  (reaction (greet n)))    ;; <-- notice the use of reaction

;; what is the result of the initial computation ?
(println @hiccup-ratom)
;; ==>  [:div "Hello " "re-frame"]    ;; returns hiccup  (a plain old vector of stuff)

;; now change 'n'
;; 'n' is an input signal for the reaction above. 
;; Warning: 'n' is not an input signal because it is a parameter. Rather, it is 
;; because 'n' is dereferenced within the execution of the reaction's code.
(reset! n "blah")            ;;    change n to a new value

;; The reaction will be rerun...
;; ... 'hiccup-ratom' will be reset! to the new value
(println @hiccup-ratom)
;; ==>   [:div "Hello " "blah"]    ;; yep, there's the new value
```

So, as `n` changes value over time (it is a Signal), the output of the computation `(greet n)` changes, and so too the value in `hiccup-ratom` changes (it is a Signal). 

This is one way data flow, with FRP-nature.

### Truth Interlude

I haven't been entirely straight with you:  
1. reagent re-runs `reactions` (re-computations) via requestAnimationFrame. So a recomputation happens about 16ms after the need for it is detected, or after the current thread of processing finishes, whichever is the greater. So if you are in a bREPL and you run the lines of code above one after the other too quickly,  you might not see the re-computation done immediately after `n` gets reset!, because the animationFrame hasn't run (yet).  You could add a `(reagent.core/flush)` after the reset! to force re-computation to happen straight away. 
2. `reaction` doesn't actually return a `ratom`.  But it returns something that has ratom-nature, so we'll happily continue believing it is a `ratom` and no harm will come to us.

On with the rest of my lies and distortions...

### Components Like Templates?

A `component` like `greet` is a bit like the templates you'd find in frameworks
like Django or Rails or Mustache -- it maps data to HTML -- except for two massive differences: 
- you have  the full power of ClojureScript available to you (generating a Clojure data structure). The downside is that these are not "designer friendly" HTML templates.
- these components are reactive.  When their input Signals change, they
  are automatically rerun, producing new hiccup (fresh DOM!). reagent adroitly shields you from
  the details, but `components` are wrapped by a `reaction`.

### React etc.

Okay, so we have some one way FRP data flow happening here. Q: To which ocean does this river flow?  A: The DOM ocean.

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each
function takes data from the
previous step, and produces data for the next step.  In the next
diagram, the three functions are marked. The unmarked nodes are data,
produced by one step, which become input to the next step.  hiccup,
VDOM and DOM are all various forms of HTML markup (in our world that's data).

```
app-db  -->  components  -->  hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
                f1                           f2                      f3
```

In abstract, Clojure syntax terms, you could squint and imagine the process as: 

```Clojure
(-> app-db 
    components    ;; produces Hiccup
    reagent       ;; produces VDOM  (virtual DOM)
    React)        ;; produces HTML (which magically and efficiently appears on the page).
```

Via `ratom` and `reaction`, changes to `app-db` are pushed into the pipeline, causing new DOM to pop out the other end, and display on our page. 

But, just to be clear,  we don't have to bother ourselves with most of the pipeline. We just write the `components` part (pure functions) and Reagent/React looks after the rest.

### Subscribe

In the beginning was the word, and the word was data.  Then, all of a sudden, components happened...

```
app-db  -->  components 
```

So let's pause to consider **our dream solution** for this part of the flow. `components` would:
   * obtain data from `app-db`  (their job is to turn this data into hiccup)
   * obtain this data via a (possibly parameterised) query over `app-db`. Think database kinda query.
   * automatically recompute their hiccup output, as the data returned by the query changes, over time. 
   * use declarative queries.  components should know as little as possible about the data structure in `app-db`. SQL?  Datalog?

re-frame's `subscriptions` are an attempt to live this dream. As you'll see, they fall short on a couple of points, but they're not too bad.

As the app developer, your job is to write and register one or more "subscription handlers" (functions that do a query).  Your subscription functions must return a value that changes over time (Signal). i.e. they'll be returning a reaction (`ratom`). 

Rules:
  - `components` never source data directly from `app-db`, and instead, they use a subscription.
  - subscriptions are only ever used by components  (they are never used in event handlers).

Here's a component using a subscription:

```Clojure
(defn greet         ;; outer, setup function, called once
   []
   (let [name-ratom  (subscribe [:name-query])]    ;; <---- subscribe here
      (fn []        ;; the inner, render function, potentially called many times. 
          [:div "Hello" @name-ratom])))
```

First, note this is a form-2 `component` (there are 3 forms).  Previously above, we've used the simplest, form-1 components (no setup was required, just render). With form-2, there's a function returning a function:
- the returned function is the render function. Behind the scenes, reagent will wrap this render function in a `reaction` to make it produce new hiccup when its inputs change.  In our case, that means it will rerun every time `name-ratom` changes. 
- the outer function is a setup function, called once to initialise the component. Notice the use of 'subscribe' with the parameter `:name-query`. That creates a Signal through which new values are supplied over time.

`subscribe` is called like this: 

```Clojure
    (subscribe  [query-id  some optional query parameters])
```

There is only one subscribe function. We must register our `handlers` with it. 

The first element in the vector (`query-id`) identifies the query and the other elements are optional, query parameters. With a traditional database a query might be:

```
select from customers where name="blah"
```

In re-frame land, that would be done as follows:
    (subscribe  [:customer-query "blah"])
which would return a `ratom` holding the customer state (might change over time!). 

Of course, for this to work, we must write and register a handler for `:customer-query`

```Clojure
(defn customer-query     ;; a query over 'app-db' which returns a customer
    [db, [sid cid]]      ;; query fns are given 'app-db', plus vector given to subscribe
    (assert (= sid :customer-query))   ;; subscription id was the first vector
    (reaction (get-in @db [:path :to :a :map cid])))    ;; re-runs each time db changes
    
;; register our query handler
(register
    :customer-query       ;; the id  
    customer-query)       ;; the query function
```

**Note**: `components` tend to be organised into a hierarchy, often with data flowing from parent to child via parameters. So not every component needs a subscription.

**Rule**: subscriptions can only be used in form-2 components and the subscription must be in the outer setup function and not in the inner render function.  So the following is **wrong** (compare to the correct version above)

```Clojure
(defn greet         ;; a form-1 component - no inner render function
   []
   (let [name-ratom  (subscribe [:name-query])]    ;; Eek! subscription in render part
        [:div "Hello" @name-ratom]))
```

### The Signal Graph

Getting more complicated...

Imagine our `app-db` contains some `items` (a vector of maps). And imagine that we must display these items sorted by one of their attributes attribute. We could write this query-handler: 

```Clojure
(register
  :sorted-items       ;; the query id  
  (fn [db [_ sort-kw]        ;; sort-kw is a ratom, contains a keyword. 
    (assert (keyword? @sort-kw))
    (reaction
       (let [items (get-in @db [:some :path :items])]    ;; get the items
           (sort-by @sort-kw items)))))                 ;; return  them sorted
```

First, notice that this reaction involves 2 input Signals:  db and sort-kw. 
If either changes, the query is re-run. That means it will be re-run if the items change OR the sort attribute changes.

We'd use it like this:

```Clojure
(defn items-list         ;; outer, setup function, called once
   []
   (let [by-this (reagent/atom :name)    ;; sort by :name attribute, GUI might reset! somehow
         items   (subscribe [:sorted-items by-this])
         num     (reaction (count @items)]    ;; Woh! a reaction based on the subscription
      (fn []
        [:div  
            (str "there's " @num " of these suckers")    ;; rookie mistake to leave off the @
            (into [:div ] (map item-render @items)))))    ;; item-render is another component
```

There's a bit going on in that `let`, most of it highly contrived, just so I can show off chained reactions. Okay, okay. All I wanted was an excuse to use the phrase chained reactions. 

In reality, the approach taken above is inefficient. Every time `app-db` changes, the `:sorted-items` query is going to be re-run and it's going to re-sort items.  But items might not have changed since last time. Some other part of `app-db` may have changed. We don't want to re-sort items each time something unrelated changes.

We can fix that up:
 
```Clojure
(register
  :sorted-items       ;; the query id  
  (fn [db [_ sort-kw]        ;; sort-kw is a ratom containing the attribute to sort on
    (assert (keyword? @sort-kw))
    (let [items (reaction (get-in @db [:some :path :items]))]    ;; reaction #1
        (reaction (sort-by @sort-kw @items)))))      ;; reaction #2
```

Be aware that the second reaction will only be triggered if `items` does not test `identical?` to the previous value. **Yes, that sort of optimisation is built into chain `reactions`.**  Which means the component render function (which is wrapped in another reaction) won't rerun if `app-db` changes, unless items changes. Now we're very efficient.

If I were doing this for real (rather than just demoing possibilities), I'd probably create a simple subscription for items (unsorted), and then do the sort in the component itself (as a reaction, similar to how 'num' is done in the example above). After all, it is the component which needs to show sorted. It can contain the sorting, which might involve the 

Summary:
  - you can chain reactions 
  - reagent will eliminate unnecessary Signal propagation via `identical?` checks (not equality checks!). This is the nice by product of working with immutable data structures.


### The 2nd Flow

At the top, I said that re-frame had two data flows. 

The data flow from `app-db` to the DOM is the first half of the story. We now need to consider the 2nd part of the story: the flow in the opposite direction.

While the first flow has FRP-nature.  The 2nd flow does not (although some feel it should). 

When I think about these two flows, I imagine [one of those school diagrams](http://thumbnails-visually.netdna-ssl.com/water-cycle_521f29b8b6271_w1500.png) showing the water cycle. Rivers taking water down to the oceans, and evaporation/clouds taking water back over the mountains to fall again as rain. And repeat.

### Event Flow

In response to user interaction, a DOM will generate
events like "clicked delete button on item 42" or
"unticked the checkbox for 'send me spam'".

These events have to "handled".  The code doing this handling might
 mutate app state (in `app-db`), or request more data from the server, or POST somewhere and wait for a response, etc. In fact, all these actions will ultimately result in changes to the `app-db`.

An application will have many handlers, and collectively
they represent the **control layer of the application**. 

In re-frame, the backward data flow of events happens via a conveyor belt:

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
  ^                                                                                |
  |                                                                                v
  handlers <-------------------  events  -------------------------------------------
                           a "conveyor belt" takes events
                           from the DOM to the handlers
```

Generally, when the user manipulates the GUI, the state of the application changes. In our case, 
that means the `app-db` will change.  After all, it **is** the state.  And the DOM presented to the user is a function of that state. So that tends to be the cycle:  DOM events dispatch, handler mange them, which  cause `app-db` changes, which then cause a re-render, and the users sees something different. That's our water cycle.

So handlers, which look after events, are the part of the system which does `app-db` mutation. You
could almost imagine them as a "stored procedure" in a
database. Almost. Stretching it?  We do like our in-memory
database analogies.

### What are events?

Events are data. You choose the format.

Our implementation chooses a vector format. For example:

    [:delete-item 42]

The first item in the vector identifies the event and
the rest of the vector is the optional parameters -- in this case, the id (42) of the item to delete.

Here are some other example events:

```Clojure
    [:set-spam-wanted false]
    [[:complicated :multi :part :key] "a parameter" "another one"  45.6]
```

**Rule**:  events are pure data. No dirty tricks like putting callbacks on the wire. You know who you are.

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

Notice the `on-click` handler:

```Clojure
    #(dispatch [:yes-button-clicked])
```

With re-frame, we try to keep the DOM as passive as possible.  It is simply a rendering of `app-db`.  So that "on-click" is a simple as we can make it. 

There is a single  `dispatch` function in the entire app, and it takes only one parameter, the event vector.

Let's update our diagram to show dispatch:

```
app-db  -->  components  -->  Hiccup  -->  Reagent  -->  VDOM  -->  React  -->  DOM
  ^                                                                             |
  |                                                                             v
  handlers <----------------------------------------  (dispatch [event-id  other params])
```

**Rule**:  `components` are as passive as possible when it comes to handling events. Do the minimum. On the other hand, `components` can be as complex as needed when it comes to creating the visuals. 

### Event Handlers 

Collectively, event handlers provide the control logic in the applications. 

Almost all event handlers mutate `app-db` in some way. Adding an item here, or deleting that one there. So often CRUD, but sometimes much more. Sometimes with async results.

Even though handlers appear to be about `app-db` mutation, re-frame requires them to be pure functions with a signature of:
 
```
   (state-of-app-db, event-vector) -> new-state
```   
re-frame passes to an event handler two parameters: the current state of `app-db` plus the event, and the job of a handler to return a modified version of the state  (which re-frame will then put back into the `app-db`).   XXX currently not true but it will be shortly. 

```Clojure
(defn handle-delete
    [state [_ item-id]]          ;; notice how event vector is destructured -- 2nd parameter
    (dissoc-in state [:some :path item-id]))     ;; return a modified version of 'state'
```

Because handlers are pure functions, and because they generally only have to handle one situation, they tend to be easy to test and understand.  

### Routing

`dispatch` has to call the right handler. Handlers have to be registered. 

```Clojure
(register
   :delete-item
   handle-delete)
```

### State Transition 

Above, I commented that collectively handler represent the control layer of the application.

A big part of what they do is to manage state transitions. The application is in state X, and event Y arrives, so the handler for Y was to move the app to state Z. 

Although I've done nothing to try and implement it, this is obviously fertile territory for using [statecharts](http://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782).

### Talking To The Server

Some events handlers will need to initiate an async server connection (e.g. GET or POST something). 

The event handlers should organise that the `on-success` or `on-fail` handlers for these HTTP requests themselves simply dispatch an event.

But also, note that you can't dispatch while inside of a handler, unless it is async. Why?  Because handlers are given a snapshot of the `app-db`. 

**Rule**: 
  - all events are handled via a call to `dispatch`. GUI events, async HTTP events, everything. 
  - a handler can't dispatch. (unless the 2nd one happens is anyc, which means it doesn't really  happen within the original). XXX with a little bit of work, this rule could be relaxed, but only if the nested dispatch is regarded as happening async. But is it a good idea or necessary?

### In Summary

To build an app using re-frame, you'll have to:
  - design your app's data structure
  - write and register subscription functions (query layer)
  - write component functions  (view layer)
  - write and register event handler functions  (control layer and/or state transition layer)

[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[reagent]:http://reagent-project.github.io/
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
