## re-frame

re-frame is a tiny [reagent] framework for writing  [SPAs] using ClojureScript.

It proposes a pattern for structuring an app, and provides a small library
implementing one version of this pattern.

In another context, re-frame might be called an MVC framework, except
it is instead a functional RACES framework - Reactive-Atom Component Event Subscription
(I love the smell of acronym in the morning).

## Claims

Nothing about re-frame is the slightest bit original or clever. 
You'll find no ingenious use of functional zippers, transducers or core.async. 
I claim is a good thing (although, for the record, one day I'd love to develop
something original and clever).

Using re-frame, you WILL be able to break your application code into distinct pieces. 
Each of these pieces can be easily described, understood and tested independently. 
These pieces will (mostly) be pure functions.

At small scale, any framework seems like pesky overhead. The 
explanatory examples in here are small scale, so you'll need to
squint a little to see the benefit.

## Shaping Beliefs

First, above all we believe in the one true [Dan Holmsand] (creator of reagent), 
and his divine instrument the `ratom`.  We genuflect towards Sweden once a day. 

Second, because paradigm is worth 80 points of IQ, you'll only 
really "get" Reagent once you view it as an [FRP] library, and not simply a 
ReactJS wrapper. To put that another way, we think that Reagent is closer in 
nature to [Hoplon] or [Elm] than it is [OM]. This wasn't obvious to us initially - we
knew we liked reagent, but it took a while for the penny to drop as to why.

Finally, we believe in one way data flow.  We don't like read/write `cursors` which
allow for the two way flow of data. re-frame does implement two data way flow, but it 
ues two, one-way flows to do it.

## The Parts

To explain re-frame, we'll now incrementally 
develop a diagram.  We'll explain each part as it is added in.

##### The Big Ratom 

<blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Our re-frame diagram starts with the "well formed data at rest" bit: 
```
app-db
```

So, re-frame says that you should put your data into one place (probably one dirty great
big atom) which we'll call `app-db`. Structure the data in that place, of course. 

Now, this advice is not the slightest bit controversial for 'real' databases, right? 
You'd happily put all your well formed data into Postgres or mysql. But within an app (in memory), 
it is different. If you have
background in OO, this data-in-one-place is a hard one to swallow.  You've
spent your life breaking systems into pieces, organised around behaviour and trying
to hide the data.  I still wake up in a sweat some nights thinking about all
that clojure data lying around exposed and passive.

But, as @Fogus says, data is the easy bit. 

From here on, we'll assume `app-db` looks like this: 
```
(def app-db  (reagent/atom {}))    ;; a reagent atom, containing a map
```

Although it is an atom, I'd encourage you to actively think about it as an (in-memory) database. 
It will contain structured data (perhaps with a formal [Prismatic Schema] spec).
You will need to query that data. You will perform CRUD 
and other transformations on it. You'll often want to transact on this
database atomically, etc.  So "in-memory database"
seems a more useful paradigm than plain old atom.

Finally, a clarification:  `app-db` doesn't actually have to be a ratom containing
a map. In theory, re-frame
imposes no requirement here.  It could be a [datascript] database.  But as you'll see it
would have to be a "reactive datastore" of some description (an 
"observable" datastore -- one that can tell you when it has changed).

##### Magic Ratoms

Reagent provides a `ratom` and a `reaction`. These are the two key building blocks.

`ratoms` are like normal ClojureScript atoms. You can swap! and reset! them, watch them, etc. 

`reactions` act a bit like functions. Its a macro which wraps some "computation" (forms?) and returns 
a ratom containing the result of that computation.  

The magic bit is that `reaction` will automatically rerun the computation whenever the "inputs" change, and it will reset! the ratom to the new value. 

```clojure
(ns example1
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require
    [reagent.core   :as    r]))
    
(def db-app  (r/atom {:a 1}))                  ;; our base ratom -- think of it like our app-db

(def ratom2  (reaction {:b (:a @db-app)}))      ;; notice use of "reaction" which wraps some computation
(def ratom3  (reaction (cond = (:a @db-app)     ;; notice use of "reaction" which wraps some computation
                             0 "World"
                             1 "Hello")))         

(println @ratom2)    ;; ==>  {:b 1}             ;; contains a computed result. Based on values in 'db-app'
(println @ratom3)    ;; ==> "Hello"             ;; contains a computed result. Based on values in 'db-app'

(reset!  db-app  {:a 0})               ;; this change "flows" (triggers) reactive computations for ratom2 and ratom3

(println @ratom2)    ;; ==>  {:b 0}    ;; ratom2 is  {:b (:a @ratom)}
(println @ratom3)    ;; ==> "World"    ;; ratom3 is automatically updated too.
    
;; cleanup 
(dispose ratom2)
(dispose ratom3)
```

So `reaction` wraps a computation (acts like a function), and it returns a `ratom` which will then be `reset!` whenever its "inputs" change. 

The "inputs" are any ratoms which are dereferenced within the computation. So, it "watches" (observes) an ratom which is dereferenced in the body of the computation, and if any of those ratoms change, it reruns the computation. 

Using the combination of these two building blocks you can create reactive functions 
similar to `lift` in [Elm] or `defc=` in [hoplon].  This enables [FRP].

### The Components

Extending the diagram a bit, we introduce the beginnings of one way data flow:
```
db-app -->  components --> hiccup
```
When using reagent, you write one or more `components`.  Think about
`components` as `pure functions` - data in, hiccup out.  [`hiccup`] is
ClojureScript data structures which represent DOM.

Here's a trivial component:
```
(defn greet
   []
   [:div "Hello ratoms and recactions"])

(greet n)                ;; returns  [:div "Hello ratoms and recactions"] 
```

You'll notice that its a normal clojure function, nothing special. It takes no inputs (no `db-app` involved) but it does produce `hiccup` (a vector data strcutre in this case). 

Here is a slightly interesting one:
```
(defn greet
   [name]                       ;; name is a ratom
   [:div "Hello "  @name])      ;; dereference name here, to get out the value it contains 
   
(def n (reagent/atom "re-frame"))  ;; create a ratom, containing a string

(greet n)                    ;; ==>  [:div "Hello " "re-frame"] 
```

So far, so good?  Let's add a `reaction`. 
```
(defn greet
   [name]                       ;; name is a ratom
   [:div "Hello "  @name])      ;; dereference name here, to get out the value it contains 
   
(def n (reagent/atom "re-frame"))

(def hiccup-ratom  (reaction (greet n)))     ;; reactive computation, result stored in hiccup-ratom

(println @hiccup-ratom)      ;;    [:div "Hello " "re-frame"] 
(reset! n "blah")            ;;    change n to a new value
(println @hiccup-ratom)      ;;    [:div "Hello " "blah"] 
```
The computation `(greet n)` produces hiccup which is stored into `hiccup-ratom`. 
This computation involves dereferencing a ratom (passed as `n`to greet). Whenever that ratom changes, the computation will be rerun and hiccup-ratom will be reset to this new value. 

These components are a bit like the templates you'd find in frameworks
like Django or Rails or Mustache, except for two massive differences: 

- you have available the full power of ClojureScript.
   The downside tradeoff is that these are not "designer friendly" HTML templates.
- these components are reactive.  When their inputs change, they
  are automatically rerun, producing new hiccup. reagent adroitly shields you from
  the details, but `components` (functions you write) are wrapped by
  `reaction` in such a way that they re-run when the ratoms they
  dereference change. This is FRP. This is why reagent feels slightly magic.

So `components` are pure, **reactive** functions.  Change the inputs
and automatically, new hiccup is produced.

This is not a tutorial on how to write reagent components, but let's
talk briefly about the "data in" bit. Turns out there are two ways
data flows into components:

1. the data is supplied as component parameters, typically from a parent
   component.  There tends to be a
   hierarchy of components and data often flows from parent to child
   via function parameters.

2. a component can 'subscribe' to some aspect of the data.  As a result, it becomes an 
   observer of that state, and it gets an stream of data updates as that part
   of the ratom changes.

Either way, when the "data in" changes, the component function is rerun,
and it produces new hiccup, which is then stitched into the DOM.

Subscriptions are a significant part of re-frame ... more on them soon.

### ReactJS

The complete data flow from data to DOM is:

```
ratom  -->  components --> Hiccup --> Reagent --> VDOM  -->  ReactJS  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each
function takes data from the
previous step, and produces data for the next step.  In the next
diagram, the three functions are marked. The unmarked nodes are data,
produced by one step, becoming the input to the next step.  hiccup,
VDOM and DOM are all various forms of HTML markup (in our world that's data).

```
ratom  -->  components --> hiccup --> Reagent --> VDOM  -->  ReactJS  --> DOM
               f1                      f2                     f3
```

The combined three-function pipeline should be seen as a pure
function `P` which takes a ratom as input, and produces DOM.
One way data flow:
```
ratom  -->  P  --> DOM
```

This arrangement is:
1.  Easy to test.  We put data into the ratom, allow the DOM to be rendered, and check that the right divs are in place.  This would typically be done via phantomjs. 
2.  Easily understood.  Generally, components can be understood in isolation.  In almost all cases, a component is genuinely a pure fucntion, or is conceptually a pure function. 
 
The whole thing might be a multistep process, but we only have to bother ourselves with the writing of the components.  Reagent/ReactJS looks after the rest. XXXX

If the ratom changes, the DOM changes.  The DOM is a function of the ratom (state of the app).  XXXX


### Event Flow

The previous data flow is the first half of the story. So now we need to consider the data flow in the opposite direction.

In response to user interaction, a DOM will generate
events like "the user clicked the delete button on item 42" or
"the user unticked the checkbox for 'send me spam'".

These events have to "handled".  The code doing this handling might
 mutate the ratom, or requrest more data from thet server, or POST somewhere, etc. 

An app will have many handlers, and collectively
they represent the **control layer of the application**.

The backward data flow happens in one (conveyor belt) hop:

```
ratom  -->  components --> Hiccup --> Reagent --> VDOM  -->  ReactJS  --> DOM
  ^                                                                        |
  |                                                                        v
  handlers <---------------  events  ---------------------------------------
                           a "conveyor belt" takes
                           events from the DOM to
                           the handlers.
```


Generally, the user manipulates the GUI because they want to change the state of the
application.  They don't think that way, of course.  They think in terms of "deleting this blah" 
or "swapping to foo".  But all these actions invariably mean the ratom will be changed.
After all the ratom **is** the state.  The DOM presented to the user is a function of that state.
The GUI doesn't change until the ratom changes.

So handlers are the part of the system which does ratom mutation. You
could almost imagine them as a "stored procedure" in a
database. Almost. Stretching it?  We do like our in-memory
database analogies.

### What are events?

Events are data. You choose the format.

Our implementation chooses to represent events as vectors. For example:

    [:delete-item 42]

The first item in the vector identifies the event and
the rest of the vector is the optional parameters -- in this cse, the id (42) of the item to delete.

Here are some other example events:
```clojure
    [:set-spam-wanted false]
    [[:complicated :multi :part :key] "a parameter" "another one"  45.6]
```

### Back To The DOM

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

With re-frame, we try to keep the DOM as passive as possible.  It is simply a rendering of the data. 

It is Event Handlers which interpret the events and respond.  `dispatch` is how the DOM passes off events to handlers. And, just to be clear, there is a signle `dsipatch` fucntion.  Not one dispatch functions for each event. 

### Routing

Once they are dispatched, events have to be routed to their eventual handler. 

`dispatch` can be implemtned in There's a bunch of ways to implement "dispatch events".  You could push the events into a core.asyc channel. Or you could call a `dispatch` multimethod, and find the right event handler by inspection of `first` on the event vectory. 

We use a technique in which the 




Events are then routed to the right handler via a conveyor belt. Remember,
an event is just data.  And it is flowing in the opposite direction
to the data which causes the DOm to be rendered in the first place.


 and routed to the right handler.



So here's what a

When an event reaches the end of the conveyor belt, it has to be routed to the right handler -- the one which handles this kind of event.  

So something has to look at `first` in event vector cand know how to call the right handler.

The conveyor belt could easily be done via core.async, but we do it the simplest possible way. 


### Event Handlers 

Collectively, event handlers provide the control logic in the applications. 

The job of *many* event handlers is to change the ratom in some way. Add an item here.  Delete this one.  So often CRUD.  
Even though they appear to be about mutation, event handlers are implemented as pure fucntions. 
```
   (ratom-state, event) -> ratom-state
```   
It is re-frame which feeds the current state in ratom into the handler (along with the event), and the job of a handler to to return a modified version of the data in ratom (whcih re-frame will then put back into the ratom -- ensuring an undo/redo is available).  

But I repeat, the handlers themselves are written as pure functions, and this makes it nice and easy to test and understand them. 


[SPAs]:http://en.wikipedia.org/wiki/Single-page_application
[reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://github.com/holmsand
[Hiccup]:https://github.com/weavejester/hiccup
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[OM]:https://github.com/swannodette/om
[Prismatic Schema]:https://github.com/Prismatic/schema
[InterViews]:http://www.softwarepreservation.org/projects/c_plus_plus/library/index.html#InterViews
[datascript]:https://github.com/tonsky/datascript
[Hoplon]:http://hoplon.io/
[Pedestal App]:https://github.com/pedestal/pedestal-app
