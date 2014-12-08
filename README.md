## re-frame

re-frame is a small, mildly opinionated [reagent] framework. 

It describes how to structure Single Page Applications (SPA) when using [reagent], 
and it provides a small library which helps you to implement this structure.

## Claims

Nothing about re-frame is the slightest bit original or clever. 
There's no ingenious use of functional zippers, transducers or core.async. 
We feel this is a good thing.

Using re-frame, you can break your application code into distinct pieces. 
Each of these pieces can be easily described, understood and tested independently. 
These pieces will be functions.

At small scale, any framework seems like pesky overhead. The structure they
impose only delivers benefits as you scale up.  In docs like this, the 
explanatory examples are small scale, so you'll need to squint a little to 
see the benefit.

## Opinions

This framework has been shaped by a few beliefs. 

Above anything else, we believe in the one true [Dan Holmsand] (creator of reagent), 
and his davine instrument The RATOM.  We genuflect towards Sweden once a day. 

Second, because paradigm is worth 80 points of IQ, we think you'll only 
really "get" Reagent once you view it as an [FRP] library, and not simply a 
ReactJS wrapper. To put that another way, we think that Reagent is closer in 
nature to [Hoplon] or Elm than it is OM. This wasn't obvious to us initially -   
we knew we liked reagent, but it took a while for us to realise why. 

Finally, we believe in one way data flow.  We don't like OM-like `cursors` 
because they allow for the two way flow of data.  In our experience, their 
use seems to force control logic into views.

So then how do you implement the two way flow of data into and 
out of views? re-frame implements it as two one-way flows. Sounds 
like we're just playing word games, right?  Read on ..

## The Parts

We're now going to explain how re-frame works by incrementally 
developing a diagram.  We'll explain parts as they are progressively 
added to the diagram. 

##### First, The Big Atom 

<blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Our re-frame diagram starts with data, like this:
```
atom
```

Put all your data into one, dirty great big atom. Structure that data, 
of course, within that atom, but put it all in the one place. 

We do this with traditional databases, and its not the slightest bit controversial.
 But if you have background in OO, like me, this is a hard one to swallow.  You've 
 spent your life breaking systems into pieces, organised around behaviour and trying 
 to hide the data.  I still wake up in a sweat some nights thinking about all 
 that clojure data lying around exposed and passive.

But, as @Fogus says, well structured data at rest is the nice, easy part. 

From here on, we'll deal with this part as if its an `reagent/atom` (ratom) 
containing a map, but it is useful to actively imagine it as an (in memory) database. 
It will contain structured data. You wull need to query that data. Perform CRUD on it.  
You'll often want to transact on this database atomically, etc.  So "in-memory database" s
eems a more useful paradigm than plain old atom. For that reason, you'll see, in the code, 
that it is actually called the `db`

Finally, `db` doesn't actually have to be a ratom containing a map. re-frame 
imposes no requirement.  It could be a [datascript] database.  


### The Components

Now we extend the diagram a bit, introducing the beginnings of one way data flow:
```
db/ratom  -->  components --> Hiccup
```
When using reagent, you write a set of `components`.  Think about these 
`components` as `pure functions` which turn input data into output Hiccup.

Hiccup is DOM represented as ClojureScript data structures.   XXX Do better.

So these components are a bit like the templates you'd find in frameworks 
like Django or Rails or Mustache, except for two things: 

- you have the full power of clojurescript available to you (not some limited templating language)
- these components are reactive.  When their inputs change, they are automatically rerun, producing new Hiccup. 

So they are pure, reactive functions. 

This is not a tutorial on how to write reagent components, but we should regard them 
as pure functions (even if they aren't sometimes). So let's talk about how `components` get their input data. 

Turns out there are two ways:
   - the data is supplied as parameters, typically from a parent component.  So there's a 
   hierarchy of components and data is flowing down the tree via parameters.  
   (Downside, these are not "designer friendly" templates)
   
   - a component can 'subscribe' to some aspect of the data.  It becomes an 
   observer and it gets an stream of updates. 

Either way, when the inputs change, a components is automatically rerun, to produce new Hiccup.  

XXX more on subscriptions

### Reactjs

So let's now fully flesh out the data flow from data to GUI. Here it is in its entirety:

```
atom  -->  components --> Hiccup --> Reagent --> VDOM  -->  ReactJS  --> DOM
```

Best to imagine this process as a pipeline of 3 functions.  Each takes data from the 
previous step, and produces data for the next step.  Let's mark the functions in the process. The unmarked is data.  Hiccup, VDOM and DOM are all various forms of HTML markup.

```
atom  -->  components --> Hiccup --> Reagent --> VDOM  -->  ReactJS  --> DOM
               f1                      f2                     f3                                    
```

The entire pipeline `P` is a pure function which takes an atom as input, and produces DOM.
```
atom  -->  P  --> DOM
```

One way data flow, creating a pipeline, which is conceptually a pure function. 

Reactive fucntion:  If the atom changes the DOM changes.  The same data will trigger 
the same DOM to be rendered again. 

We only have to worry ourselves with the `atom` and `components` bit. 

### Events

Once we've displayed a GUi to a user, and they start to interact with it. 


[reagent]:http://reagent-project.github.io/
[Dan Holmsand]:https://github.com/holmsand
[FRP]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Elm]:http://elm-lang.org/
[InterViews]:http://www.softwarepreservation.org/projects/c_plus_plus/library/index.html#InterViews
[datascript]:https://github.com/tonsky/datascript
[Hoplon]:http://hoplon.io/
