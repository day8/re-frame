## Testing

This is an introduction to testing re-frame apps. It 
walks you through some choices.
 
## What To Test

For any re-frame app, there's three things to test:

  - **Event Handlers** - most of your testing focus will 
     be here because this is where most of the logic lives
    
  - **Subscription Handlers** - often not a lot to test here. Only 
    [Layer 2](SubscriptionInfographic.md) subscriptions need testing. 
  
  - **View functions** - I don't tend to write tests for views. There, I said it.
    Hey!  It is mean to look at someone with that level of disapproval, 
    while shaking your head. I have my reasons ...<br>
    In my experience with the re-frame architecture, View Functions
    tend to be an unlikely source of bugs. And every line of code you write is
    like a ball & chain you must forevermore drag about, so I dislike maintaining 
    tests which don't deliver good bang for buck.

And, yes, in theory there's also `Effect Handlers` (Domino 3) to test, 
but you'll hardly ever write one, and, anyway, each one is different, so 
I've got no good general insight to offer you for them. They will be ignored
in this tutorial.  
 
## Test Terminology

Let's establish some terminology to aid the further explanations in this 
tutorial.  Every unittest has 3 steps: 
  1. **setup** initial conditions
  2. **execute** the thing-under-test
  3. **verify** that the thing-under-test did the right thing

## Exposing Event Handlers For Test

Event Handlers are pure functions which should make them easy to test, right?

First, create a named event handler using `defn` like this:
```clj
(defn select-triangle
  [db [_ triangle-id]
  ... return a modified version of db)
```

You'd register this handler in a separate step:
```clj
(re-frame.core/reg-event-db     ;; this is a "-db" event handler, not "-fx"
  :select-triangle   
  [some-interceptors]
  select-triangle)    ;; <--- defn above. don't use an annonomous fn
```

This arrangement means the event handler function 
`select-triangle` is readily available to be unittested.

## Event Handlers - Setup - Part 1

To test `select-triangle`, a unittest must pass in values for the two arguments 
`db` and `v`. And, so, our **setup** would have to construct both values.

But how to create a useful `db` value?  

`db` is a map of a certain structure, so one way would be to simply `assoc` values 
into a map at certain paths to simulate a real-world `db` value or, even easier, just use 
a map literal, like this:

```cljs
;; a test
(let [
      ;; setup - create db and event
      db      {:some 42  :thing "hello"}   ; a literal
      event   [:select-triange :other :event :args]
      
      ;; execute
      result-db (select-triange db event)] 
      
      ;; validate that result-db is correct)
      (is ...)
```

This certainly works in theory, but in practice, 
unless we are careful, constructing the `db` 
value in **setup** could:
  * be manual and time consuming 
  * tie tests to the internal structure of `app-db`

The **setup** of every test could end up relying on the internal structure
of `app-db` and any change in that structure (which is inevitable over time) 
would result in a lot re-work in the tests. That's too fragile.

So, this approach doesn't quite work. 

## Event Handlers - Setup - Part 2

> In re-frame, `Events` are central. They are the "language of the system". They 
provide the eloquence.  
 

The `db` value (stored in `app-db`) is the cumulative result
of many event handlers running.

We can use this idea.  In **setup**, instead of manually trying to create that `db` value, we could 
"build up" a `db` value by threading `db` through many event handlers
which cumulatively create the required initial state.  Tests then need
know nothing about the internal structure of that `db`.

Like this:
```clj
(let [
      ;; setup - cummulatively build up db 
      db (-> {}    ;; empty db 
             (initialise-db [:initialise-db])   ;; each event handler expects db and event 
             (clear-panel   [:clear-panel])
             (draw-triangle [:draw-triangle 1 2 3]))
             
      event  [:select-triange :other :stuff]
      
      ;; now execute the event handler under test
      db'    (select-triange db event)]
      
      ;; validate that db' is correct
      (is ...)
```

This approach works so long as all the event handlers are
of the `-db` kind, but the threading gets a little messy when some event 
handlers are of the `-fx` kind which take a `coeffect` argument and 
return `effects`, instead of a `db` value. 

So, this approach is quite workable in some cases, but can get messy
in the general case. 

## Event Handlers - Setup - Part 3

There is further variation which is quite general but not as pure.

During test **setup** we could literally just `dispatch` the events 
which would put `app-db` into the right state.  

Except, we'd have to use `dispatch-sysnc` rather `dispatch` to 
force immediate handling of events, rather than queuing.  

```clj
  ;; setup - cummulatively build up db 
  (dispatch-sync [:initialise-db])
  (dispatch-sync [:clear-panel])
  (dispatch-sync [:draw-triangle 1 2 3]))
     
  ;; execute
  (dispatch-sync  [:select-triange :other :stuff])

  ;; validate that the valuein `app-db` is correct
  ;; perhaps with subscriptions
```

Notes:
  1. we use `dispatch-sync` because `dispatch` is async (event is handled not now, but soon) 
  2. Not pure. We are choosing to mutate the global `app-db`. But
     having said that, there's something about this approach with is remarkably 
     pragmatic.
  2. the **setup** is now very natural. The associated handlers can be either `-db` or `-fx`
  3. if the handlers have effects other than just updating app-db, we might need to stub out XXX
  4. How do we look at the results ???? 

If this method appeals to you, you should ABSOLUTELY review the utilities in this helper library:
[re-frame-test](https://github.com/Day8/re-frame-test).

In summary, event handlers should be easy to test because they are pure functions. The interesting
part is the unittest "setup" where we need to establishing an initial value for `db`. 

## Subscription Handlers 

Here's a Subscription Handler from 
[the todomvc example](https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs):

```clj
(reg-sub
  :visible-todos

  ;; signal function
  (fn [query-v _]
    [(subscribe [:todos])
     (subscribe [:showing])])

  ;; computation function
  (fn [[todos showing] _]   ;; that 1st parameter is a 2-vector of values
    (let [filter-fn (case showing
                      :active (complement :done)
                      :done   :done
                      :all    identity)]
      (filter filter-fn todos))))
```

How do we test this?

First, we could split the computation function from its registration, like this: 
```clj
(defn visible-todos
  [[todos showing] _]  

  (let [filter-fn (case showing
                    :active (complement :done)
                    :done   :done
                    :all    identity)]
   (filter filter-fn todos)))

(reg-sub
  :visible-todos
  (fn [query-v _]
      [(subscribe [:todos])
       (subscribe [:showing])])
  visible-todos)     ;; <--- computation function used here
```

That makes `visible-todos` available for direct unit testing.  But, as we experienced 
with Event Handlers, the challenge is around constructing `db` values (first parameter)
in a way which doesn't become fragile. 

## View Functions - Part 1

Components/views are more tricky and there are a few options.

But remember my ugly secret - I don't tend to write tests for my views. 

But here's how, theoretically, I'd write tests if I wasn't me ...

If a View Function is [Form-1](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-1-a-simple-function),
then it is fairly easy to test.  

A trivial example:
```clj
(defn greet
   [name]
   [:div "Hello " name])

(greet "Wiki")
;;=> [:div "Hello " "Wiki"]
```

So, here, testing involves passing values into the function and checking the data structure returned
for correctness. 

What's returned is hiccup, of course. So how do you test hiccup for correctness?  

hiccup is just a clojure data structure - vectors containing keywords, and maps, and other vectors, etc.
Perhaps you'd use https://github.com/nathanmarz/specter to declaratively check on the presence
of certain values and structures? Or do it more manually.

## View Functions - Part 2A

But what if the View Function has a subscription?  

```clj
(defn my-view
   [something] 
   (let [val  (subscribe [:query-id])]     <-- reactive subscription
     [:div .... using @val in here])))
```

The use of `subscribe` makes the function impure (it obtains data from places other than its args).

A testing plan might be: 
  1. setup  `app-db` with some values in the right places  (via dispatch of events?)
  2. call `my-view` (with a parameter) which will return hiccup
  3. check the hiccup structure for correctness. 
   
Continuing on, in a second phase you could then:

  5. change the value in `app-db`  (which will cause the subscription to fire)
  6. call view functions again (hiccup returned). 
  7. check the new hiccup for correctness 

Which is all possible, if a little messy. 

## View Functions - Part 2B

There is a pragmatic method available to handle the impurity: use `with-redefs` 
to stub out `subscribe`.  Like this:
```clj
(defn subscription-stub [x]
  (atom
    (case x
      [:query-id] 42)))

(deftest some-test
  (with-redefs [re-frame/subscribe (subscription-stub)]
    (testing "some some view which does a subscribe"
      ..... call the view function and the hiccup output)))
```

For more integration level testing, you can use `with-mounted-component`
from the [reagent-template](https://github.com/reagent-project/reagent-template/blob/master/src/leiningen/new/reagent/test/cljs/reagent/core_test.cljs) 
to render the component in the browser and validate the generated DOM. 

## View Functions - Part 2C

Or ... there is another option: you can structure in the first place for pure view functions. 

The trick here is to create an outer and inner component.  The outer sources the data 
(via a subscription), and passes it onto the inner as props (parameters).

As a result, the inner component, which does the testable work, is pure and 
easily tested. The outer is impure but trivial.

To get a more concrete idea, I'll direct you to another page in the re-frame docs 
which has nothing to do with testing, but it does use this `simple-outer-subscribe-with-complicated-inner-render` 
pattern for a different purpose: 
[Using Stateful JS Components](Using-Stateful-JS-Components.md)
 
Note: this technique could be made simple and almost invisible via the 
use of macros.

This pattern has been independently discovered by many. For example, here 
it is called the [Container/Component pattern](https://medium.com/@learnreact/container-components-c0e67432e005#.mb0hzgm3l).


## Summary

Event handlers will be your primary focus when testing. Remember to review the utilities in
[re-frame-test](https://github.com/Day8/re-frame-test).


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
