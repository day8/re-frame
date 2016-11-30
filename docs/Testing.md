<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Testing](#testing)
- [Event Handlers - Part 1](#event-handlers---part-1)
- [Event Handlers - Part 2](#event-handlers---part-2)
- [Subscription Handlers](#subscription-handlers)
- [Components- Part 1](#components--part-1)
- [Components - Part 2A](#components---part-2a)
- [Components - Part 2B](#components---part-2b)
- [Components - Part 2C](#components---part-2c)
- [Summary](#summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> IGNORE THIS DOCUMENT. IT IS WIP

## Testing


With a re-frame app, there's principally three things to test:
 1.  Event handlers
 2.  Subscription handlers
 3.  View functions

## Event Handlers - Part 1

Event Handlers are pure functions and consequently easy to test.      

First, create an event handler like this:
```clj
(defn my-db-handler
  [db v]
  ... return a modified version of db)
```

Then, register it in a separate step:
```clj
(re-event-db  
  :some-id   
  [some-interceptors]
  my-handler)
```

With this setup, `my-db-handler` is available for direct testing.

Your unittests will pass in certain values for `db` and `v`, and then ensure it returns the right (modified version of) `db`. 

## Event Handlers - Part 2

Event handlers mutate the value in `app-db` - that's their job.  

I'd recommend defining a [Prismatic Schema](https://github.com/Prismatic/schema) 
for the value in `app-db` and then checking for correctness after every, 
single event handler. Every single one.

Using `after` middleware, this is easy to arrange. The todomvc example shows how:
  - [define a Schema](https://github.com/Day8/re-frame/blob/2ba8914d8dd5f0cf2b09d6f3942823a798c2ef5c/examples/todomvc/src/todomvc/db.cljs#L6-L28) for the value in `app-db`
  - [create some middleware](https://github.com/Day8/re-frame/blob/2ba8914d8dd5f0cf2b09d6f3942823a798c2ef5c/examples/todomvc/src/todomvc/handlers.cljs#L11-L19)
  - [add the middleware](https://github.com/Day8/re-frame/blob/2ba8914d8dd5f0cf2b09d6f3942823a798c2ef5c/examples/todomvc/src/todomvc/handlers.cljs#L46) to your event handlers 

## Subscription Handlers 

Here's a subscription handler from [the todomvc example](https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs):

```clj
(reg-sub
  :completed-count
  (fn [db _]
    (completed-count (:todos db))))
```

How do we test this?

We could split the handler function from its registration, like this: 
```clj
(defn get-completed-count
  [app-db _]
  (reaction (completed-count (:todos @app-db))))

(register-sub
  :completed-count
  get-completed-count)
```

That makes `get-completed-count` available for direct testing.  But you'll note it isn't a pure function. 
It isn't values in, values out. Instead, it is atoms in, atoms out. 

If this function was on a paint chart, they'd call in "Arctic Fusion" to indicate its 
proximity to pure white, while hinting at taints.

We could accept this. We could create tests by passing in a `reagent/atom` holding the 
certain values and then checking the values in what's returned. That would work.  
The more pragmatic among us might even approve. 

But let's assume that's not good enough. Let's refactor for pureness:

The 1st step in this refactor is to create a pure function which actually does ALL the hard work ... 
```clj
(defn completed-count-handler
   [db v]           ;; db is a value, not an atom
   ..... return a value here based on the values db and v)
```

The 2nd step in the refactor is to register using a thin `reaction` wrapper:
```clj
(register-sub  
  :completed-count  
   (fn [app-db v]  
     (reaction (completed-count-handler @app-db v))))
```

Because `completed-count-handler` is now doing all the work, it is the thing we want 
to test, and it is now a pure function.  So I think we are there. 

## Components- Part 1

Components/views are slightly more tricky. There's a few options.

First, I have to admit an ugly secret. I don't tend to write tests for my views. 
Hey, don't give me that disproving frown!  I have my reasons. 

Remember that every line of code you write is a liability.  So tests have to earn 
their keep - they have to deliver a good cost / benefit ratio.  And, in my experience 
with the re-frame architecture, the Reagent view components tend to be an unlikely 
source of bugs. There's just not much logic in them for me to get wrong.

Okay, fine, don't believe me, then!!

Here's how, theoretically, I'd write tests if I wasn't me ...

If a Components is a [Form-1](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-1-a-simple-function)  structure, then it is fairly easy to test.  

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

hiccup is just a clojure data structure - vectors containing keywords, and maps, and other vectors, etc.  Perhaps you'd use https://github.com/nathanmarz/specter to declaratively check on the presence of certain values and structures? Or do it more manually. 


## Components - Part 2A

But what if the Component has a subscription (via a [Form-2](https://github.com/Day8/re-frame/wiki/Creating-Reagent-Components#form-2--a-function-returning-a-function) structure)? 

```clj
(defn my-view
   [something] 
   (let [val  (subscribe [:query-id])]     <-- reactive subscription
      (fn [something]                      <-- returns the render function
         [:div .... using @val in here])))
```

There's no immediately obvious way to test this as a lovely pure function. Because it is not pure.

Of course, less pure ways are very possible. For example, a plan might be: 
  1. setup  `app-db` with some values in the right places  (for the subscription)
  2. call `my-view` (with a parameter) which will return `the renderer`
  3. call `the renderer` (with a parameter) which will return hiccup
  4. check the hiccup structure for correctness. 
   
Continuing on, in a second phase you could then:
  5. change the value in `app-db`  (which will cause the subscription to fire)
  6. call `the renderer` again (hiccup returned). 
  7. check that the hiccup 

Which is all possible, if a little messy, and with one gotcha. After you change the value in `app-db` the subscription won't hold the new value straight away.  It won't get calculated until the next animationFrame.  And the next animationFrame won't happen until you hand back control to the browser. I think.  Untested. Please report back here if you try. And you might also be able to use `reagent.core/flush` to force the view to be updated.  

## Components - Part 2B

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

For more integration level testing, you can use `with-mounted-component` from the [reagent-template](https://github.com/reagent-project/reagent-template/blob/master/src/leiningen/new/reagent/test/cljs/reagent/core_test.cljs) to render the component in the browser and validate the generated DOM. 

## Components - Part 2C

Or ... you can structure in the first place for easier testing and pure functions. 

The trick here is to create an outer and inner component.  The outer sources the data 
(via a subscription), and passes it onto the inner as props (parameters). 

As a result, the inner component, which does the testable work, is pure and 
easily tested. The outer is fairly trivial.

To get a more concrete idea, I'll direct you to another page on this Wiki 
which has nothing to do with testing, but it does use this `simple-outer-subscribe-with-complicated-inner-render` 
pattern for a different purpose: [[Using-Stateful-JS-Components]]

Note this technique could be made simple and almost invisible via the 
use of macros. (Contribute one if you have it).

This pattern has been independently discovered by many. For example, here 
it is called the [Container/Component pattern](https://medium.com/@learnreact/container-components-c0e67432e005#.mb0hzgm3l).


## Summary

So, we stumbled slightly at the final hurdle with Form-2 Components. But prior 
to this, the testing story for re-frame was as good as it gets: you are testing 
a bunch of simple, pure functions.  No dependency injection in sight!
