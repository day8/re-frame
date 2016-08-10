
This tutorial shows you how to implement pure event handlers that side-effect. 
Yes, a surprising claim.


### Events Happen

Events "happen" when they are dispatched.

So, this causes an event:
```clj
(dispatch [:set-flag true])
```

Events are normally triggered by an external agent: the user clicks a button, or a server-pushed 
message arrives on a websocket.   

### Handling The Happening

Once dispatched, an event must be "handled".  It must be processed, actioned. 

Events are mutative by nature. If your application is in one state before an 
event is processed, it will be in a different state afterwards.

And that state change is very desirable. Without the state change our 
application can't incorporate that button click, or the newly arrived 
websocket message. Without mutation, the apps just sits there, stuck. 

State change is how the application "moves forward" - how it does its job. 

On the other hand, control logic and state mutation tend to be the most 
complex and error prone of part of an app.

### Your Handling

To help wrangle this potential complexity, re-frame's introduction 
provided you with a simple programming model.
 
It said you should call `reg-event-db` to associate an event id, 
with a function to do the handling: 
```clj
(re-frame.core/reg-event-db
   :set-flag
   (fn [db [_ new-value]
      (assoc db :flag new-value)))
```

The function you register, actions the event. 

And that handler `fn` was expected to be pure. Given the 
value in `app-db` as the first argument, and the event (including params)
as the second argument, it is expected to provide the new value for `app-db`. 

Data in, a computation and data out. Pure.  

### 90% Solution 

This paradigm provides a lovely solution 90% of the time, but there are times 
when it fails us. 

Here's an example from the messy 10%. To get its job done, this handler has to side effect: 
```clj
(reg-event-db
   :my-event
   (fn [db [_ bool]]
       (dispatch [:do-something-else 3])    ;; oops, side-effect
       (assoc db :send-spam new-val)))
```

That `dispatch` queues up another event to be processed. It changes the world. 

Just to be clear, this code works.  The handler returns a new version of `db`, so tick,
and that `dispatch` will itself be "handled" asynchronously
very shortly after this handler finishes, double tick. 

So, you can "get away with it".  But it ain't pure.

And here's more carnage:
```clj
(reg-event-db
   :my-event
   (fn [db [_ a]]
       (GET "http://json.my-endpoint.com/blah"   ;; dirty great big side-effect
            {:handler       #(dispatch [:process-response %1])
             :error-handler #(dispatch [:bad-response %1])})  
       (assoc db :flag true)))
```

Again, this approach will work. But that dirty great big side-effect doesn't come 
for free. Its like a muddy monster truck has shown up in our field of white tulips.

### Bad, Why?

The moment we stop writing pure functions there are well documented 
consequences:
  
  1. Cogitative load for the function's later readers goes up because they can no longer reason locally.  
  2. Testing becomes more difficult and involves "mocking".  How do we test that the http GET above is 
     using the right URL?  "mocking" should be is mocked. It is a code smell.
  3. And event replay-ability is lost.
  
Regarding the 3rd point, a re-frame application proceeds step by step, like a reduce. From the README: 

> at any one time, the value in app-db is the result of performing a reduce over the entire 
> collection of events dispatched in the app up until that time. The combining 
> function for this reduce is the set of registered event handlers.
  
Such a collection of events is replay-able which is a dream for debugging and testing. But only
when all the handlers are pure. Handlers with side-effects (like that HTTP GET, or the `dispatch`) pollute the 
replay, inserting extra events into it, etc, which ruins the process. 


### The Other Problem

Here's another purity problem:
```clj
(reg-event-db
   :load-localstore
   (fn [db _]
     (let [defaults (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <--
       (assoc db :defaults defaults))))
```

It sources data from LocalStore.

So this handler has no side effect - it doesn't need to change the world - __but__ it does
need to source data from somewhere other than its given arguments - from somewhere
outside of app-db or the event.  

It isn't a pure function which leads to the normal problems. 

### Effects And Coeffects

So there are [two concepts at play here](http://tomasp.net/blog/2014/why-coeffects-matter/):
  - **Effects** - what your event handler does to the world  (aka side-effects)
  - **Coeffects** - what your event handler requires from the world  (aka [side-causes](http://blog.jenkster.com/2015/12/what-is-functional-programming.html))

We will need a solution for both.   

### Why Does This Happen?

It is inevitable that 10% of your event handlers have effects and coeffects.

They have to implement the control logic of your re-frame app, and 
that means dealing with the outside, mutative world of servers, databases, 
windows.location, LocalStore, cookies, etc.

There's just no getting away from living in a mutative world, which sounds ominous. Is there no way out? No solution?

Well, luckily a small twist in the tale makes a profound difference. We 
will look at side effects first. Instead of creating event handlers
which *do side-effects*, we'll instead get them to *cause side-effects*.


### Doing vs Causing

Above, I claimed that this `fn` event handler was pure:
```clj
(reg-event-db
   :my-event
   (fn [db _]
       (assoc db :flag true)))
```

Takes a `db` value, computes and returns a `db` value. No coeffects or effects. Yep, that's Pure!

All true, but ... this purity is only possible because re-frame is doing 
the necessary side-effecting.

Wait on.  What "necessary side-effecting"?

Well, `app-db` is a ratom, right?  It contains the application state. After 
each event handler runs, it must be `reset!` to the newly returned 
value.  re-frame's steps for each event are: 
  1. extract the value (a map) from `app-db` (a ratom)
  2. call the registered event handler with this `db` value as the first argument
  3. `reset!` the returned value back into `app-db`

So, we get to live in our ascetic functional world because re-frame is 
looking after the "necessary side-effects" on `app-db`. Interesting.

### Et tu, React?

Turns out it's the same pattern with Reagent/React.

We get to write a nice pure component:
```clj
(defn say-hi
  [name]
  [:div "Hello " name])
```
and Reagent/React mutates the DOM for us. The framework is looking 
after the "necessary side-effects".

### Pattern Structure

Pause and look back at `say-hi`. I'd like you to view it through the following lens:  it is a pure 
function which **returns a description of the side-effects required**. It says: add a div element 
to the DOM.

Notice that the description is declarative. We don't tell React how to do it.

Notice also that it is data. Hiccup is just vectors and maps.

This is a big, important concept.  While we can't get away from certain side-effects, we can 
program using pure functions which **describe side-effects, declaratively, in data** and 
let the backing framework look after the "doing" of them. Efficiently. Discreetly.

Let's use this pattern to solve the side-effecting handler problem.

### The Two Step Plan

From here, two steps:
  1. Work out how event handlers can declaratively describe side-effects, in data.
  2. Work out how re-frame can do the "necessary side-effecting". Efficiently and discreetly.


### Step 1 Of Plan

So, how would it look if event handlers returned side-effects, declaratively, in data?

Here is an impure, side effecting handler:   
```clj
(reg-event-db
   :my-event
   (fn [db [_ a]]
       (dispatch [:do-something-else 3])    ;; Eeek, side-effect
       (assoc db :flag true)))
```

Here it is re-written so as to be pure: 
```clj
(reg-event-fx                              ;; <1> 
   :my-event
   (fn [{:keys [db]} [_ a]]                ;; <2> 
      {:db  (assoc db :flag true)          ;; <3> 
       :dispatch [:do-something-else 3]}))
```

Notes: <br>
*<1>* we're using `reg-event-fx` instead of `reg-event-db` to register  (that's `-db` bs `-fx`) <br>
*<2>* the first parameter is nolonger just `db`.  It is a map from which 
[we are destructuring db](http://clojure.org/guides/destructuring). Ie. 
it is a map which contains a `:db` key. <br>
*<3>* The handler is returning a data structure (map) which describes two side-effects:
  - a change to application state, via the `:db` key
  - a further event, via the `:dispatch` key  
  
Above, the impure handler **did** a `dispatch` side-effect, while the pure handler **described** 
a `dispatch` side-effect.


### Another Example

The impure way:
```clj
(reg-event-db
   :my-event
   (fn [db [_ a]]
       (GET "http://json.my-endpoint.com/blah"   ;; dirty great big side-effect
            {:handler       #(dispatch [:process-response %1])
             :error-handler #(dispatch [:bad-response %1])})  
       (assoc db :flag true)))
```

the pure, descriptive way:
```clj
(reg-event-fx
   :my-event
   (fn [{:keys [db]} [_ a]]
       {:http {:method :get
               :url    "http://json.my-endpoint.com/blah"
               :on-success  [:process-blah-response]
               :on-fail     [:failed-blah]}
        :db   (assoc db :flag true)}))
```

Again, the old way **did** a side-effect (Booo!) and the new way **describes**, declaratively,
in data, the side-effects required (Yaaa!). 

More on side effects in a minute, but let's double back to coeffects.

### The Coeffects

So far we've written our new style `-fx handlers like this:
```clj
(reg-event-fx
   :my-event
   (fn [{:keys [db]} event]   ;; <--  destructuring to get db
       { ... }))
```

It is now time to name that first parameter:
```clj
(reg-event-fx
   :my-event
   (fn [coeffects event]   ;;  <--- it has a name
       { ... }))
```

When you use the `-fx` form of registration, the first argument of your handler will be a coeffects map. 

In that map will be the complete set of "inputs" required by your function.  The complete 
set of computational resources (data) which it needs to perform its computation. But how?  
I'll explain soon enough, I promise, but for the moment, take it as a magical given. 

One of the keys in `coeffects` will likely be `:db` and that will be the value in app-db. 

Remember this impure handler from before:
```clj
(reg-event-db              ;;  a -db registration
   :load-localstore
   (fn [db _]              ;; db first argument 
     (let [defaults (js->clj (.getItem js/localStorage "defaults-key"))]  ;; <--  Eeek
       (assoc db :defaults defaults))))
```

We'd now rewrite that as a pure handler, like this: 
```clj
(reg-event-fx             ;; notice the -fx
   :load-localstore
   (fn [coeffect _]       ;; coeffect is a map containing inputs
     (let [defaults (:defaults-key coeffect)]  ;; <--  use it here
       (assoc ( :defaults defaults))))
```

So, by some magic, not yet revealed, LocalStore will be queried before 
this handler runs and the required value from it will be placed into 
`coeffects` under the key `:localstore` for the handler to use. 


### Variations On A Theme

`-db` handlers and `-fx` handlers are conceptually the same. They only differ numerically.

`-db` handlers take ONE coeeffect called `db`, and they return only ONE  effect (db again). 

Whereas `-fx` handlers take potentially MANY coeffects (a map of them) and they return 
potentially MANY effects (a map of them).  So, One vs Many. 

Just to be clear, the following two handlers achieve exactly the same thing:
```clj
(reg-event-db
   :set-flag
   (fn [db [_ new-value]
      (assoc db :flag new-value)))
```
and
```clj
(reg-event-fx
   :set-flag
   (fn [context [_ new-value]
      {:db (assoc (:db context) :flag new-value)}))
```

Obviously the `-db` variation is simpler. 


### Summary 

90% of the time, simple `-db` handlers are the tool to use.

But about 10% of the time, our handlers need additional inputs (coeffecs) or they need to 
cause additional side-effects (effects).  That's when you reach for `-fx` handlers. 

To take the next step, we need now to shine a light on `interceptors` which provide
the mechanism by which  event handlers are executed.

