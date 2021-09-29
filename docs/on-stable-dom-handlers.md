This page describes an advanced technique to avoid Reagent's "anonymous callback" inefficiency. 

This technique is only useful when you are writing 
performance-critical components. Indeed, you may never need it, but 
understanding it will deepen your knowledge about Reagent.

A performance-critical component would need to satisfy all of the following: 
  
  1. be repeatedly used on a page, perhaps within the rows of a list, or the cells of a grid, or the branches of a tree
  2. and then be re-rendered ***a lot***
  3. and involve creating anonymous callback functions in re-renders 


## Equality Tests

Equality tests are at the heart of the issue, so let's start by considering this one: 
```clojure
(= [1 :2 "3"]
   [1 :2 "3"])
```
***Question***: will it evaluate to `true` or `false`? <br/>
***Answer***: `true`. Because the elements `#!clj 1`, `#!clj :2` and `#!clj "3"` are identities, so different instances test equal, and because vector equality is determined by element equality.


## Implications For Reagent

Reagent uses equality checks on props to avoid doing unnecessary work. 


Consider this view: 
```clj 
(defn parent
  [x]
  [child 1 :2 "3"])
```

Imagine that `parent` has already rendered once. And then something causes
it to re-render (perhaps its parent re-renders and supplies a different `x`).

When `parent` re-renders, it will re-render `child` and supply three 
props: `#!clj 1`, `#!clj :2` and `#!clj "3"`. But these props
will be the same as the ones supplied with the "last render" and, as a result,
Reagent calculates that it doesn't need to perform the re-render of `child`.

Reagent assumes that `child` is rendered by a pure function and it deduces that giving a pure
function the same props/args as last time, results in the same result (the same hiccup). 
And so Reagent avoids doing this unnecessary work. It is an efficiency thing.

***Question***:  But how does Reagent check for this "sameness" between the props supplied "this render" vs the "last render"? <br/>
***Answer***: by testing the props using `#!clj =` 

So:

  - `#!clj 1` (last time) is `#!clj =` to `#!clj 1` (this time)
  - `#!clj :2` is `#!clj =` to `#!clj :2`
  - and `#!clj "3"` too is equal to last time

All three props are `=` to last time, which allows Reagent to skip the re-render of `child`. 

## But Wait, Functions

Next step: we introduce anonymous callback functions.

Consider this test: 
```clj
(= (fn [n] (+ n 1))
   (fn [n] (+ n 1)))
```
***Question***:  will it evaluate to `true` or `false`? <br/>
***Answer***: `false`. You might be able to see that the two anonymous functions are equal, 
but `=` says "no". Anonymous functions are not like `#!clj 1`  or `#!clj :2` 

Armed with this knowledge, what happens if we add a new prop for `child` and make it an anonymous callback function?  Like this: 
```clj 
(defn parent
  [x]
  [child 1 :2 "3"  (fn [] (dispatch [:something]))])
```

So, that's now four props given to `child`. The first three of them are as before. But the new last one is 
an anonymous function. 

What a difference that new one makes!! Now, every time `parent` is re-rendered, `child`
will also be re-rendered. Every time. Reagent's efficiency checks which try to avoid unnecessary work 
are broken when one prop is an anonymous function because the value "this time" does not test 
`=` to last time, even though we can see they are the same function.


## Fixing It 

Surely the way to fix this is simple: don't use an anonymous function.

First we create:
```clj
(defn callback
  []
  (dispatch [:something]))
```

Then we perform a test: 
```clj
(= callback callback)
```
***Question***: what will it evaluate to? `true` or `false`? <br/>
***Answer***: `true`.  `callback` is a symbol which is bound to a function. So we are comparing the value bound to `callback` (a function), and that will test `=` because it is the same function on both sides of `=`.

Let's use that; 
```clj 
(defn parent
  [x]
  [child 1 :2 "3"  callback])   ;; <--- used here
```

Now all four props for `child` will test `=` to last time. And `child` won't be re-rendered. 

In fact, we can make this simpler  by using a Form-2 function:
```clj 
(defn parent
  [x]
  (let [callback   #(dispatch [:something])]   ;; <-- create here
    (fn [x]
      [child 1 :2 "3"  callback])))
```

The outside function creates the anonymous function, which means it doesn't get
recreated and change on each render, and so `callback` will test `=` to "last time" in all renders.

Problem fixed?  Yes, but unfortunately, only for the simple case. Which really means "no, not fixed enough".

## Where It Breaks Down 

Say, `parent` has an argument `id`. And, say, we need to use that in the callback. 
```clj 
(defn parent
  [id]
  (let [callback  (fn [] (dispatch [:something id]))]
    (fn [id]
      [child 1 :2 "3" callback])))
```

Does this work?  Sadly, no. Can you spot the bug? 

`callback` has closed over the original value for `id` - the one given to the outer function.
`callback` will never dispatch the "latest" value of `id` provided to the re-render function
(notice that `id` is an argument to both the outer and inner functions in the Form-2 Component).


## The Technique

So, enough preamble and explanation, here's the real solution - and it has three parts:
```clj 
(defn parent
  [id]
  (let [callback          (fn [the-id] (dispatch [:something the-id]))   ;; <-- Note 1
        callback-factory  (callback-factory-factory callback)]           ;; <-- Note 2
    (fn [id]
      [child 1 :2 "3"  (callback-factory id)])    ;; <-- Note 3
```

Notes:

1. `callback` no longer tries to "close over' `id`. Instead, it takes `id` as an argument.
2. `callback-factory-factory` has a long name, and it performs the trick. It returns a function which, when called,
   will always return the same function, which wraps `callback`. (code supplied below)
3. Each time we call `callback-factory`, it will return the same function. But it does it in a way which allows for
   `id` to vary on each render.


Which only leaves me to show you the hero in our story, which I offer  
without further explanation for you to read and understand: 
```clj
(defn callback-factory-factory
  "returns a function which will always return the `same-callback` every time 
   it is called. 
   `same-callback` is what actually calls your `callback` and, when it does,
   it supplies any necessary args, including those supplied at wrapper creation
   time and any supplied by the browser (a DOM event object?) at call time." 
  [the-real-callback]
  (let [*args1        (atom nil)
        same-callback (fn [& args2]
                        (apply the-real-callback (concat @*args1 args2)))]
    (fn callback-factory
      [& args1]                   
      (reset! *args1 args1)
      same-callback)))               ;; <-- always returns the same function
```

## More Advanced Again

Sometimes the callback will need to accept a DOM event argument. In the following code, notice `on-change`:
```clj
(defn some-input-view 
  [_]
  (let [on-change         (fn [id dom-event]    ;; <-- Note 1
                            (dispatch [:changed id (-> dom-event .-target .-value)]))
        on-change-factory (callback-factory-factory on-change)]

    (fn [id text]
       [:input {:type      "text" 
                :value     text
                :on-change (on-change-factory id)}] ])))   ;; <-- Note 2
```
Note:

1. this time the callback, `on-change`, takes two arguments. The `id` and the DOM event `dom-event`
2. But, when we call the factory we only supply one of these two arguments, almost like this is a "partial".
   The browser will be supplying `dom-event` later when it calls the callback. 


## Summary 

This page introduces an advanced technique. 

Reagent's method for avoiding unnecessary re-renders is subverted by "anonymous functions" and, 
specifically, callbacks which are generated by successive renders. These functions do not 
test equal to each other, even though we programmers can see they are the same each time.  

Most of the time, we ignore this issue. We happily accept the small inefficiency 
this potentially causes because we get to write clear, terse code, and we value that highly. 

But, in some rare situations, this small inefficiency can accumulate into a problem when 
there are large numbers of the same components simultaneously on a page, and when they are
unnecessarily redrawn a lot. 

When it does become a problem, this page showed you a technique for fixing the issue, but it 
comes at the cost of you having to write more code, and introduce an abstraction based on `callback-factory-factory`.
