## Status 

Alpha. Incomplete. But getting close.  

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
pieces, and those distinct pieces will be  be pure functions. 
Each can be easily described, understood and tested independently.

At small scale, any framework seems like pesky overhead. The 
explanatory examples in here are necessarily small scale, so you'll need to
squint a little to see the benefit.

### Core Beliefs

First, above all we believe in the one true [Dan Holmsand] (creator of reagent), 
and his divine instrument the `ratom`.  We genuflect towards Sweden once a day. 

Second, we believe that [FRP] is a honking great idea.  You might be tempted to see 
reagent as simply another of the React warappers (a sibling to [OM] and [quiescent](https://github.com/levand/quiescent)). But I think you only really "get" 
Reagent when you view it as an [FRP] library. To put that another way, we think 
that Reagent, at its best, is closer in 
nature to [Hoplon] or [Elm] than it is [OM]. This wasn't obvious to us initially - we
knew we liked reagent, but it took a while for the penny to drop as to why.

Finally, we believe in one way data flow.  We don't like read/write `cursors` which
promote two way flow of data. re-frame does implement two data way flow, but it 
uses two, seperate, one-way flows to achieve it, and those those two flows 
are different in nature.

If you are curious about FRP, I'd recomend [this FRP backgrounder](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) before you go any further.

### High Level Tasks

When you use re-frame, you'll create your app by writting three kinds of functions:
  - subscriptions - which query over application state and create signals (move data into components)
  - components - which turn data into hiccup (DOM)
  - event handlers - which provide the state transition (control) layer

You'll also be designing a data structure to represent the app state, and probably writting a [herbet schema](https://github.com/miner/herbert) for it.

## The Parts

To teach re-frame, I'll now incrementally 
develop a diagram, explaining each part as it is added.

Along the way, I'll be using [reagent] at an intermediate to advanced level. This is not an introduction to reagent tutorial, so you need to have done one of those before getting here. Try
[the offical intro](http://reagent-project.github.io/) or 
[this](https://github.com/jonase/reagent-tutorial) or [this](http://yogthos.net/posts/2014-07-15-Building-Single-Page-Apps-with-Reagent.html).

<blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

##### The Big Ratom 

Our re-frame diagram starts with the "well formed data at rest" bit: 
```
app-db
```

re-frame recomends that you put your data into one place which we'll call `app-db`. Structure the data in that place, of course.

Now, this advice is not the slightest bit controversial for 'real' databases, right? 
You'd happily put all your well formed data into Postgres or mysql. But within a running application (in memory), it is different. If you have a background in OO, this data-in-one-place is a 
hard one to swallow.  You've
spent your life breaking systems into pieces, organised around behaviour and trying
to hide the data.  I still wake up in a sweat some nights thinking about all
that clojure data lying around exposed and passive.

But, as @fogus tell us, data is the easy bit. 

From here on, we'll assume `app-db` is one of these: 
```
(def app-db  (reagent/atom {}))    ;; a reagent atom, containing a map
```

Although it is a reagent atom (ratom), I'd encourage you to think of it as an in-memory database. 
It will contain structured data (perhaps with a formal [Herbet Schema] spec).
You will need to query that data. You will perform CRUD 
and other transformations on it. You'll often want to transact on this
database atomically, etc.  So "in-memory database"
seems a more useful paradigm than plain old atom.

Finally, a clarification:  `app-db` doesn't actually have to be a reagent/atom containing
a map. In theory, re-frame
imposes no requirement here.  It could be a [datascript] database (untested).  But, as you'll see, it
does have to be a "reactive datastore" (one that can tell you when it has changed).  In fact, `app-db` doesn't have to be a single atom either -- the pattern allows for as many as you like,  although our implementation assumes one.

##### Benifits Arising From This Approach

I'm going to quote verbatum from Elm's website:

1. There is a single source of truth. Traditional approaches force you to write a decent amount of custom and error prone code to synchronize state between many different stateful components. (The state of this widget needs to be synced with the application state, which needs to be synced with some other widget, etc.) By placing all of your state in one location, you eliminate an entire class of bugs in which two components get into inconsistent states. We also think you will end up writing much less code. That has been our observation in Elm so far.

2. Save and Undo become quite easy. Many applications would benefit from the ability to save all application state and send it off to the server so it can be reloaded at some later date. This is extremely difficult when your application state is spread all over the place and potentially tied to objects that cannot be serialized. With a central store, this becomes very simple. Many applications would also benefit from the ability to easily undo user's actions. For example, a painting app is better with Undo. Since everything is immutable in Elm, this is also very easy. Saving past states is trivial, and you will automatically get pretty good sharing guarantees to keep the size of the snapshots down.

##### The Bit Of Magic

Reagent provides a `ratom` (reagent atom) and a `reaction`. These are **two key building blocks**.

`ratoms` are like normal ClojureScript atoms. You can `swap!` and `reset!` them, `watch` them, etc.  To put it another way, a ratom is a value that changes over time. A ratom is an FRP [Signal](http://elm-lang.org/learn/What-is-FRP.elm).

`reaction` acts a bit like a function. Its a macro which wraps some `computation` (some block of code) and returns a `ratom` containing the result of that `computation`.

The computation performed by a `reaction` may involve dereferencing one or more ratoms. 

A `reaction` will automatically rerun its `computation` whenever any of these dereferenced ratoms change.  
So, the ratom returned by a `reaction` is itself a Signal. Its value will change over time as its input Signals (ratoms) change. You end up with a Signal graph. (Our graph will be without cycles). 

While the mechanics are different, `reaction` has identical intent to `lift' in [Elm] and `defc=` in [hoplon].

Some code will clarify: 

```clojure
(ns example1
  (:require-macros [reagent.ratom :refer [reaction]])  ;; reaction is a macro
  (:require [reagent.core   :as    reagent]))
    
(def app-db  (reagent/atom {:a 1}))           ;; our root ratom  (signal)

(def ratom2  (reaction {:b (:a @app-db)}))    ;; reaction wraps a computation, returns a signal
(def ratom3  (reaction (cond = (:b @ratom2)   ;; reaction wraps another computation
                             0 "World"
                             1 "Hello")))

;; Notice that both computations above involve dereferencing a ratom: 
;;   - app-db in one case
;;   - ratom1 in the other
;; Notice that both reactions above return a ratom. 
;; Those returned ratoms hold the (time varing) value of the computations.

(println @ratom2)    ;; ==>  {:b 1}       ;; a computed result, involving @app-db
(println @ratom3)    ;; ==> "Hello"       ;; a computed result, involving @ratom2

(reset!  app-db  {:a 0})        ;; this change to app-db, triggers recomputation 
                                ;; of  ratom2 
                                ;; which, in turn, causes a re-computation of ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is result of {:b (:a @app-db)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
```

So, in FRP terms, a `reaction` will produce a "stream" of values (it is a Signal), accessible via the ratom it returns.

Okay, so that was all important background information.  Back to the diagram ...

### The Components

Extending the diagram a bit, we introduce `components`:
```
app-db  -->  components  --> hiccup
```
When using reagent, your primary job is to write one or more `components`.  

Think about `components` as `pure functions` - data in, hiccup out.  `hiccup` is
ClojureScript data structures which represent DOM. Here's a trivial component:
```
(defn greet
   []
   [:div "Hello ratoms and recactions"])
```
And if we call it:
```
(greet)                
;; ==>  [:div "Hello ratoms and recactions"] 
```

You'll notice that our component is a regular clojure function, nothing special. In this case, it takes no parameters and it returns a clojurescript vector (hiccup).

Here is a slightly more interesting (parameterised) component (function): 
```
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

Now, we're now going to introduce `reaction` into this mix.  On the one hand, I'm complicating things by doing this, because reagent allows you to be ignorant of the mechanicas I'm about to show you.  It invisibly wraps your components in a `reaction` allowing you to be blissfully ignorant of how the magic happens.  

On the other hand, it is useful to understand exactly how the Signal graph is wired.  AND, in a minute, when we get to subscriptions, we ourselves will be actively using `reaction`, so we might as well bite the bullet here and now ... and, anyway, it is easy ... 
```
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
;; Warning: 'n' is not an input signal because it is a paramter. Rather, it is 
;; because 'n' is dereferenced within the execution of the reaction's code.
(reset! n "blah")            ;;    change n to a new value

;; The raction will be rerun ...
;; ... 'hiccup-ratom' will be reset! to the new value
(println @hiccup-ratom)
;; ==>   [:div "Hello " "blah"]    ;; yep, there's the new value
```

So, as `n` changes value over time (it is a Signal), the output of the computation `(greet n)` changes, and so too the value in `hiccup-ratom` changes (it is a Signal). 

This is one way data flow, with FRP-nature.

### Truth Interlude

I haven't been entirely straight with you:  
1. reagent re-runs `reactions` (re-computations) via requestAnnimationFrame. So a recomputation happens about 16ms after the need for it is detected, or after the current thread of processing finishes, whichever is the greater. So if you are in a bREPL and yourun the lines of code above one after the other too quickly,  you might not see the re-computation done immediately after `n` gets reset!, because the annimationFrame hasn't run (yet).  You could add a `(reagent.core/flush)` after the reset! to force re-computation to happen straight away. 
2. `reaction` doesn't actually return a `ratom`.  But it returns something that has ratom-nature, so we'll happily continue believing it is a ratom and no harm will come to us.

On with the rest of my lies and distortions ...

### Components Like Templates?

A `component` like `greet` is a bit like the templates you'd find in frameworks
like Django or Rails or Mustache -- it maps data to HTML -- except for two massive differences: 
- you have  the full power of ClojureScript available to you (generating a clojure datastructure). The downside is that these are not "designer friendly" HTML templates.
- these components are reactive.  When their input Signals change, they
  are automatically rerun, producing new hiccup (fresh DOM!). reagent adroitly shields you from
  the details, but `components` are wrapped by a `reaction`.

### React Etc

Okay, so we have some one way FRP data flow happening here. Q: To which ocean does this river flow?  A: The DOM ocean.

```
app-db  -->  components --> Hiccup --> Reagent --> VDOM  -->  React  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each
function takes data from the
previous step, and produces data for the next step.  In the next
diagram, the three functions are marked. The unmarked nodes are data,
produced by one step, which become input to the next step.  hiccup,
VDOM and DOM are all various forms of HTML markup (in our world that's data).

```
app-db  -->  components --> hiccup --> Reagent --> VDOM  -->  React  --> DOM
                f1                       f2                    f3
```

In abstract, clojure syntax terms, you could squint and imagine the process as: 
```
(-> app-db 
    components    ;; produces Hiccup
    reagent       ;; produces VDOM  (virtual DOM)
    React)        ;; produces HTML (which magically and efficently appears on the page).
```

Via `ratom` and `reaction`, changes to `app-db` are pushed into the pipeline, causing new DOM to pop out the other end, and display on our page. 

But, just to be clear,  we don't have to bother ourselves with most of the pipeline. We just write the `components` part (pure functions) and Reagent/React looks after the rest.

### Subscribe

In the beginning was the word, and the word was data.  Then, all of a sudden, compoents happened  ...
```
app-db -->  components 
```

So let's pause for a second to consider **our dream solution** around this flow. `components` would:
   * obtain data from `app-db`  (their job is to turn this data into hiccup)
   * obtain this data via a (possibly parameterised) query over `app-db`. Think database kinda query.
   * automatically recompute their hiccup output, as the data returned by the query changes, over time. 
   * use declarative queries.  We want components knowing as little as possible about the data structure in `app-db`. SQL?  Datalog?

re-frame's `subscriptions` are an attempt to live the dream. As you'll see, they fall short on a couple of points, but they're not too bad. 

As the app developer, your job is to write and register one or more "subscription handlers" (functions that do a query).  Your subscription functions must return a value that changes over time (Signal). They must return a ratom. 

Rules:
  - `components` never source data directly from `app-db`, and instead, they use a subscription.
  - subscriptions are only ever used by components  (they are never used in event handlers).

Here's a component using a subscription:
```
(defn greet         ;; outer, setup function, called once
   []
   (let [name-ratom  (subscribe [:name-query])]    ;; pass in a query id as first in vector
      (fn []        ;; the inner, render function, potentially called many times. 
          [:div "Hello" @name-ratom])))
```

First, note this is a form-2 `component` (there are 3 forms).  Perviously above, we've used the simplest, form-1 components (no setup was required). With form-2, there's a function returning a function:
- the returned function is the render fucntion. Behind the scenes, reagent will wrap this render fucntion in a `reaction` to make it produce new hiccup when its inputs change.  In our case, that means it will rerun every time `name-ratom` changes. 
- the outer function is a setup function, called once to initialise the component. Notice the use of 'subscribe' with the parameter `:name-query`. That creates a Signal through which new values are supplied over time.

`subscribe` is called like this: 
```
    (subscribe  [query-id  some optional query parameters])
```
The first element in the vector identifies the query and the other elements are optional, additional query parameters. With a traditional database the query might be 
```
select from customers where name="blah"
```
In re-frame land, that would be done as follows:
    (subscribe  [:cutomer-query "blah"])
which would provde a reactive query (if that customer is ever updated, we get the new version). 

Of course, for this to work, we must write and register a handler for `:customer-query`
```
(defn customer-query    ;; a query which returns a customer
    [db, [_ id]]        ;; query functions are given the database (ratom) as a parameter
    (reaction (get-in @db [:path :to :a :map id])))    ;; each time db changes, will rerun
    
;; register our query
(register
    :customer-query       ;; the id  
    customer-query)       ;; the query function
```

`components` tend to be organised into a heirarchy, often with data flowing from parent to child via paramters. So not every component needs a subscription. 

**Rule**: subscripitons can only be used in form-2 components and the subscription must be in the outer setup function and not in the inner render function.  So the following is **wrong** (compare to the correct version above)
```
(defn greet         ;; a form-1 component
   []
   (let [name-ratom  (subscribe [:name-query])]    ;; Eek! subscription in render part
        [:div "Hello" @name-ratom]))
```

### Cascading Signals

Imagine our app-db contains a list of items.  And that we need a component to display them. 

```
;; register our subscription for use by components
(register
  :items-query       ;; the id  
  (fn [db]        ;; query functions are given the database (ratom) as a parameter
    (reaction (get-in @db [:some :path :items]))))   ;; return a reaction
```

```
(defn items-list         ;; outer, setup function, called once
   []
   (let [items  (subscribe [:items-query])
         num  (reaction (count @items)]    ;; another reaction based on the subscription
      (fn []
        [:div  
            (str "there's " num " of them)
            (into [:div ] (map item-render @items)))))
```

### Event Flow

The data flow from `app-db` to the DOM is the first half of the story. We now need to consider the 2nd part of the story: the flow in the opposite direction.

In response to user interaction, a DOM will generate
events like "clicked delete button on item 42" or
"unticked the checkbox for 'send me spam'".

These events have to "handled".  The code doing this handling might
 mutate the `app-db`, or requrest more data from the server, or POST somewhere, etc. 

An app will have many handlers, and collectively
they represent the **control layer of the application**. 

The backward data flow of events happens via a conveyor belt:

```
app-db  -->  components  --> Hiccup  --> Reagent  --> VDOM  -->  React  --> DOM
  ^                                                                            |
  |                                                                            v
  handlers <-------------------  events  ---------------------------------------
                           a "conveyor belt" takes events
                           from the DOM to the handlers
```


Generally, when the user manipulates the GUI, the state of the application changes. In our case, 
that means the `app-db` will change.  After all, it **is** the state.  And the DOM presented to the user is a function of that state. So that tends to be the cycle:  GUI events cause `app-db` changes, which then cause a rerender, and the users sees something different.

So handlers, which look after events, are the part of the system which does `app-db` mutation. You
could almost imagine them as a "stored procedure" in a
database. Almost. Stretching it?  We do like our in-memory
database analogies.

### What are events?

Events are data. You choose the format.

Our implementation chooses a vector format. For example:

    [:delete-item 42]

The first item in the vector identifies the event and
the rest of the vector is the optional parameters -- in this cse, the id (42) of the item to delete.

Here are some other example events:
```clojure
    [:set-spam-wanted false]
    [[:complicated :multi :part :key] "a parameter" "another one"  45.6]
```

### Dispatching Events

Events start in the DOM.  They are `dispatched`. 

For example, a button component might look like this: 
```clojure
    (defn yes-button
        []
        [:div  {:class "button-class"
                :on-click  #(dispatch [:yes-button-clicked])}
                "Yes"])
```

Notice the `on-click` handler:
```clojure
    #(dispatch [:yes-button-clicked])
```

With re-frame, we try to keep the DOM as passive as possible.  It is simply a rendering of `app-db`.  So that "on-click" is a simple as we can make it. 

There is a single  `dispatch` function in the entire app, and it takes only one paramter, the event vector.

Let's update our diagram to show dispatch:
```
app-db  -->  components  --> Hiccup  --> Reagent  --> VDOM  -->  React  --> DOM
  ^                                                                          |
  |                                                                          v
  handlers <-------------------------------------  (dispatch [event-id  other params])
```

### Event Handlers 

Collectively, event handlers provide the control logic in the applications. 

The job of many event handlers is to change the `app-db` in some way. Add an item here, or delete that one there. So often CRUD, but sometimes much more.

Even though handlers appear to be about `app-db` mutation, re-frame requires them to be pure fucntions with a signature of: 
```
   (state-of-app-db, event-vector) -> new-state
```   
re-frame passes to an event handler two paramters: the current state of `app-db` plus the event, and the job of a handler to to return a modified version of the state  (which re-frame will then put back into the `app-db`).

```
(defn handle-delete
    [state [_ item-id]]          ;; notice how event vector is destructured -- 2nd parameter
    (dissoc-in state [:some :path item-id]))     ;; return a modified version of 'state'
```

Because handlers are pure functions, and because they generally only have to handle one situation, they tend to be easy to test and understand.  

### State Transition 

Above, I commented that collectievly handler represent the control layer of the application.

A big part of what they do is to manage state transitions. The application is in state X, and event Y arrives, so the handler for Y was to move the app to state Z. 

Although I've done nothing to try and implement it, this is obviously fertile territory for using [statechars](http://www.amazon.com/Constructing-User-Interface-Statecharts-Horrocks/dp/0201342782).

### Talking To The Server

When async events occur, like POST responses, an event get dispatched, just as when a DOM event happens. 

State changes/transitions only happen via dispatch.

### Routing

`dispatch` has to call the right handler. Handlers have to be registered. 

XXX Example. 

### In Summary

To use re-frame, you'll have to:
  - design your app's data structure
  - write (and register) subscription functions (query layer)
  - write component functions  (view layer)
  - write (and register0 event handlers functions   (control layer and/or state tranistion layer)

[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://github.com/holmsand
[Hiccup]:https://github.com/weavejester/hiccup
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[OM]:https://github.com/swannodette/om
[Prismatic Schema]:https://github.com/Prismatic/schema
[datascript]:https://github.com/tonsky/datascript
[Hoplon]:http://hoplon.io/
[Pedestal App]:https://github.com/pedestal/pedestal-app
[Herbet Schema]:https://github.com/miner/herbert
