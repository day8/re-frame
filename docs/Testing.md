## Testing

This is an introduction to testing re-frame apps.
 
## What To Test

For any re-frame app, there's three things to test:

  - **Event Handlers** - most of your focus goes here because its where 
    most of the logic lives
    
  - **Subscription Handlers** - often not a lot to test
  
  - **View functions** - I don't tend to write tests for views. There, I said it.
    Hey, its mean to look at someone with that level of disapproval. I have my reasons.  
    In my experience with the re-frame architecture, the View Functions
    tend to be an unlikely source of bugs. And every line of code you write is
    like a ball & chain you must forevermore drag about, so I hate maintaining 
    tests which don't deliver good bang for buck.
    
Yes, in theory there are also `Effect Handlers` (Domino 3) to test, 
but you'll hardly ever write one, and 
anyway, by nature, they are messy, mutative by design and all different, 
so I've got no good general insight to offer, 
other than make them small and simple, and do your best testing them.

## Test Terminology

Let's establish some terminology. Every unittest has 3 parts: 
  1. **setup** initial conditions
  2. **execute** the thing-under-test
  3. **verify** that the thing-under-test did the right thing

Below, I'll be referring to those 3 parts.

## Event Handlers

Event Handlers are pure functions and consequently should be easy to test.

First, create the event handler via `defn` like this:
```clj
(defn select-triangle
  [db [_ triangle-id]
  ... return a modified version of db)
```

Then, register this handler in a separate step:
```clj
(re-frame.core/reg-event-db  
  :select-triangle   
  [some-interceptors]
  select-triangle)    ;; <--- defn above. don't use an annonomous fn
```

This arrangement is good because it means the event handler function 
`select-triangle` is readily available to be unittested.

## Event Handlers - Setup - Part 1

To test `select-triangle`, a unittest must pass in values for the two arguments 
`db` and `v`. And, so, our **setup** would have to construct the necessary
`db` and `event` values.

But how to create a `db` value?  

`db` is a map of a certain structure, so one way would be to `assoc` values 
into a map at certain paths to simulate a production `db` value, or just use 
a map literal, like this:

```cljs
;; a test
(let [
      ;; setup 
      db      {:some 42  :thing "hello"}   ; a literal
      event   [:select-triange :other :stuff]
      
      ;; execute
      db'     (select-triange db event)] 
   ;; validate that db' is correct)
```

While this works in theory, in practice, 
unless we are very careful, constructing the `db` 
value in the **setup** phase could:
  * be manual and time consuming 
  * tie tests to the internal structure of `app-db`

Every test would end up with knowledge about the internal structure
of `app-db` and any change in that structure (which is inevitable over time) 
would result in a lot busy work re-coding the **setup** code in every test.

So, we'll need a better way of handling the **setup** ...

## Event Handlers - Setup - Part 2

In a re-frame app, the `db` value (stored in `app-db`) is created by the cumulative 
actions of successive event handlers.

So, in **setup** we could "build up" a `db` value by calling multiple event handlers to
cumulatively create the required state.  Then our test does not have to know much about
app-db's structure. 
```clj
(let [
      ;; setup - cummulatively build up db by threading it through event handlers
      db (-> {}    ;; empty db 
             (initialise-db [:initialise-db])
             (clear-panel   [:clear-panel])
             (draw-triangle [:draw-triangle 1 2 3]))
      event  [:select-triange :other :stuff]
      
      ;; execute
      db'    (select-triange db event)]
   ;; validate that db' is correct)
```

This approach works so long as all the event handlers are
of the `-db` kind, but it gets messy when some event handlers are of the `-fx` kind, because
`db` can't be neatly threaded.  (The `-fx` handlers take a coeffect argument and 
return effects). 

## Event Handlers - Setup - Part 3

So now we now to the final variation of **setup**, and probably the best.

Instead of calling the 

XXXX use duispatch 

XXX this won't work because dispatch happens shortly
XXX so tehn use dispatch-sync

XXX still problem is 

XXX how to look at the results ?  Reach into app-db ?

XXX 

For your `-fx` event handlers, you'll use the same strategy as that 
outlined above for `-db` handlers. The arguments change to be `coeffects` and `v`, 
and the return value is a map of `effects`, but the overall strategy
is the same.

And, if you want to get more advanced, see the utilities in
[re-frame-test](https://github.com/Day8/re-frame-test).

## Subscription Handlers 

Here's a subscription handler from [the todomvc example](https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs):

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

We could split the computation function from its registration, like this: 
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

That makes `visible-todos` available for direct unit testing.

## View Functions - Part 1

Components/views are slightly more tricky. There's a few options.

First, I have to admit an ugly secret. I don't tend to write tests for my views. 
Hey, don't give me that disproving frown!  I have my reasons. 

**My Reasons:** every line of code you write is a liability. So tests have 
to earn their keep by delivering a good cost / benefit ratio. 
And, in my experience with the re-frame architecture, the View Functions 
tend to be an unlikely source of bugs. There's just not much logic in 
them for me to get wrong because the re-frame philosophy is very much to 
keep view functions as dumb as possible.


Okay, fine, don't believe me, then!!

Here's how, theoretically, I'd write tests if I wasn't me ...

If a Components is a [Form-1](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-1-a-simple-function)  
structure, then it is fairly easy to test.  

A trivial example:
```clj
(defn greet
   [name]
   [:div "Hello " name])

(greet "Wiki")
;;=> [:div "Hello " "Wiki"]
```

So, here, testing involves passing values into the function and checking the data structure returned for correctness. 

What's returned is hiccup, of course. So how do you test hiccup for correctness?  

hiccup is just a clojure data structure - vectors containing keywords, and maps, and other vectors, etc.  
Perhaps you'd use https://github.com/nathanmarz/specter to declaratively check on the presence of certain values and structures? Or do it more manually. 


## View Functions - Part 2A

But what if the View Function has a subscription (via a [Form-2](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-2--a-function-returning-a-function) structure)? 

```clj
(defn my-view
   [something] 
   (let [val  (subscribe [:query-id])]     <-- reactive subscription
     [:div .... using @val in here])))
```

There's no immediately obvious way to test this as a lovely pure function. Because it is not pure.

Of course, less pure ways are very possible. For example, a plan might be: 
  1. setup  `app-db` with some values in the right places  (for the subscription)
  2. call `my-view` (with a parameter) which will return hiccup
  3. check the hiccup structure for correctness. 
   
Continuing on, in a second phase you could then:
  5. change the value in `app-db`  (which will cause the subscription to fire)
  6. call view functions again (hiccup returned). 
  7. check that the hiccup 

Which is all possible, if a little messy, and with one gotcha. After you change the 
value in `app-db` the subscription won't hold the new value straight away.
It won't get calculated until the next animationFrame.  And the next animationFrame 
won't happen until you hand back control to the browser. I think.  Untested. 
Please report back here if you try. And you might also be able to use `reagent.core/flush` to force the view to be updated.  

## View Functions - Part 2B

Or ...  instead of the not-very-pure method above, you could use `with-redefs` on `subscribe` to stub out re-frame altogether: 

```clj
(defn subscription-stub [x]
  (atom
    (case x
      [:query-id] 42)))

(deftest some-test
  (with-redefs [re-frame/subscribe (subscription-stub)]
    (testing "some rendering"
      ..... somehow call or render the component and check the output)))
```

For more integration level testing, you can use `with-mounted-component` 
from the [reagent-template](https://github.com/reagent-project/reagent-template/blob/master/src/leiningen/new/reagent/test/cljs/reagent/core_test.cljs) to render the component in the browser and validate the generated DOM. 

## View Functions - Part 2C

Or ... you can structure in the first place for easier testing and pure functions. 

The trick here is to create an outer and inner component.  The outer sources the data 
(via a subscription), and passes it onto the inner as props (parameters). 

As a result, the inner component, which does the testable work, is pure and 
easily tested. The outer is fairly trivial.

To get a more concrete idea, I'll direct you to another page in the docs 
which has nothing to do with testing, but it does use this `simple-outer-subscribe-with-complicated-inner-render` 
pattern for a different purpose: 
[Using Stateful JS Components](Using-Stateful-JS-Components.md)
 
Note this technique could be made simple and almost invisible via the 
use of macros. (Contribute one if you have it).

This pattern has been independently discovered by many. For example, here 
it is called the [Container/Component pattern](https://medium.com/@learnreact/container-components-c0e67432e005#.mb0hzgm3l).


## Summary

So, we stumbled slightly at the final hurdle with Form-2 Components. But prior 
to this, the testing story for re-frame was as good as it gets: you are testing 
a bunch of simple, pure functions.  No dependency injection in sight!


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
