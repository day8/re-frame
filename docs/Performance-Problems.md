## Eek! Performance Problems

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [1. Is It The `debug` Interceptor?](#1-is-it-the-debug-interceptor)
- [2. `=` On Big Structures](#2--on-big-structures)
  - [An Example Of Problem 2](#an-example-of-problem-2)
  - [Solutions To Problem 2](#solutions-to-problem-2)
- [3. Are you Using a React `key`?](#3-are-you-using-a-react-key)
- [4. Callback Functions](#4-callback-functions)
- [A Weapon](#a-weapon)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Is It The `debug` Interceptor?

This first one is something of a non-problem. 

Are you are using the `re-frame.core/debug` Interceptor?
You should be, it's useful. __But__ you do need to be aware of its possible performance implications.  

`debug` reports what's changed after an event handler has run by using 
`clojure.data/diff` to do deep, CPU intensive diff on `app-db`. 
That diff could be taking a while, and leading to apparent performance problems.

The good news is this really isn't a production problem.  `debug` should only be 
present in an Interceptor Chain at development time, and it should be removed 
from production using [this technique](https://github.com/Day8/re-frame/blob/be6f49f21e245dea1cd0a857b70dd720bfbe18fd/examples/todomvc/src/todomvc/handlers.cljs#L33).

Also related, anything which writes large data structures, or strings, to the 
js console, will be slow. So press F12, pull up devtools console, and have a 
good look at what's happening in there. 

## 2. `=` On Big Structures

Reagent uses `=` to compare the previous value of a prop with the 
new value of that prop, when it determines if a component needs 
rerendering. [Make sure you have a good understanding of this.](https://github.com/Day8/re-frame/wiki/When-do-components-update%3F). 

In the worst case, if those props are big data structures which differ only in some 
tiny, leaf aspect, then a lot of CPU cycles will be spent doing 
the `=` comparison only to eventually work out that, indeed, the 
answer is `false`. 

This problem is exacerbated when components return a lot of hiccup, because 
lots of hiccup normally means lots of props which, in turn, means lots of `=` 
work to do on each of those props. Any rerender with those characteristics 
could end up chewing a lot of CPU cycles.

### An Example Of Problem 2

Imagine you were rendering a 19 by 19 "Go" board. 

And imagine that you have a high level board renderer component 
which creates hiccup for the 361 sub components (19 x 19 grid), 
and that it provides 3 props  to each child:

1. grid x cord
2. grid y coord
3. a chunk of data representing the current game state, from which each 
   of the 361 individual grid components is expected to extract the data 
   they need to render their grid position. 

This arrangement could be slow. 

**First**, you have a parent component returning hiccup for 361 sub-components
and that's a lot of hiccup!! Sure, it might not be much code - just a couple 
of nested `for`, but the hiccup data structure built will be substantial.

**Second**, after the board renderer returns all this hiccup, for every 
one of those 361 sub-components, Reagent must then check the 3 props to 
see if they are `=` to the value last rendered (to determine if they, in turn, 
need to be rerendered), and the comparison on the 3rd prop (game state) 
might be deep and expensive. Worse, we do the same expensive check 361 
times in a row, and every time we get a `false` (because games state 
is not `=` to last time). 

**Third**, because Reagent gets 361 `falses`, it will further rerender 
all 361 sub-components even though 360 of them produce the same 
hiccup as last time - only one position in the gird has changed. 

So, when a new stone is placed on the board, and the game state changes, 
that triggers a large amount of unnecessary calculation, just to figure 
out that there's only a rendering change at one point in the 19x19 grid. 

So, that's how you can get a performance problem:  lots of hiccup, 
mixed with time consuming `=` tests on big props. 

### Solutions To Problem 2

The solution is to not do the unnecessary work.  Duh!  

Produce only the hiccup that is needed.  Don't unnecessarily 
pass around big complicated state in props, unless you really need to. 

In the Go example described above, for each new stone placed, only 
one point in the Go board actually needs to be rerendered, and 
yet our code asked Reagent to chew a lot of CPU to figure that out.

These kinds of tweaks would improve performance: 

- don't give the entire game state to each of the 361 sub components 
and then ask them to extract what they need.  Instead, give each 
just the state it needs, and nothing more. That will make the `=` 
process faster. It will also allow for Reagent to figure out that 
360 of the sub components have the same props as last time, and 
don't need rerendering. And, so, only one sub-component will be 
rerendered when the parent "board level" component rerenders.

- Also, could you render the board row by row? So that less hiccup 
is produced by any one component?  Can those rows `subscribe` 
to just the data for their row, so they only rerender when the 
row-data changes; they only generate hiccup when something really has changed?

## 3. Are you Using a React `key`?

Correctly using React `keys` can also make a huge difference to performance.

Some resources:

1. http://stackoverflow.com/questions/27863039/key-property-inside-component-function
2. http://stackoverflow.com/a/37186230/5215391
3. https://groups.google.com/d/msg/reagent-project/J1ELaLV20MU/iutebA-JEgAJ


## 4. Callback Functions

Look at this `div`:
```
[:div  {:on-mouse-over  (fn [event] ....)  }   "hello"]
```

Every time it is rendered, that `:on-mouse-over` function will be regenerated, 
and it will NOT test `=` to the last time it rendered.  It will appear to be a new function. 
It will appear to React that it has to replace the event handler. 
  
Most of the time, this is not an issue.  But if you are generating a LOT of DOM
this small inefficiency can add up.  

To work around the problem, lift the function out of the render.  Use a Form-2 function like this:
```
(defn my-component 
   []
   (let [mouse-over-cb  (fn [event] ....)  ]      ;; created once 
      (fn []                                      ;; rendered many times
         [:div {:on-mouse-over  mouse-over-cb}]))
```

Now, React will see that `mouse-over-cb` is the same as last time. It won't think 
the event handler has been replaced. 

But like I say, don't be too paranoid about this, it is unlikely
to be an issue unless you have something like a table with a 
lot of rows. 


## A Weapon 

Of course, the way to really track down what is going on is to 
use the [OFFICIAL debugging technique](https://github.com/Day8/re-frame/wiki/Debugging). 
See the four dominoes play out in the console. You may be surprised 
by what you find is happening. 

Be aware that tracing adds its own performance drag - there's the 
overhead of all that stuff getting written on the js console. 
Especially if the data getting traced is big - for example, 
tracing all of `app-db` in the console can take a while and force 
Chrome devtools to take masses of RAM.  So you may want to selectively 
add tracing when poking about. 



