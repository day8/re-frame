## Application State

<div style="width:520px">
  <blockquote class="twitter-tweet" lang="en"><p>Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however...</p>&mdash; Fogus (@fogus) <a href="https://twitter.com/fogus/status/454582953067438080">April 11, 2014</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

### The Big Ratom

re-frame puts all your application state into one place, which is
called `app-db`.

Ideally, you will provide a spec for this data-in-the-one-place, 
[using a powerful and leverageable schema](http://clojure.org/about/spec).

Now, this advice is not the slightest bit controversial for 'real' databases, right?
You'd happily put all your well-formed data into PostgreSQL.

But within a running application (in memory), there can be hesitation. If you have 
a background in OO, this data-in-one-place
business is a really, really hard one to swallow.  You've
spent your life breaking systems into pieces, organised around behaviour and trying
to hide state.  I still wake up in a sweat some nights thinking about all
that Clojure data lying around exposed and passive.

But, as Fogus reminds us, data at rest is quite perfect.

In re-frame, `app-db` is one of these:
```clj
(def app-db  (reagent/atom {}))    ;; a Reagent atom, containing a map
```

Although it is a `Reagent atom` (hereafter `ratom`), I'd encourage
you to think of it as an in-memory database. It will contain structured data.
You will need to query that data. You will perform CRUD
and other transformations on it. You'll often want to transact on this
database atomically, etc.  So "in-memory database"
seems a more useful paradigm than plain old map-in-atom.

Further Notes:

1. `app-state` would probably be a more accurate name, but I choose `app-db` instead because 
    I wanted to convey the in-memory database notion as strongly as possible.
2. In the documentation and code, I make a distinction between `app-db` (the `ratom`) and 
   `db` which is the (map) `value` currently stored **inside** this `ratom`. Be aware of that naming as you read code.
3. re-frame creates and manages an `app-db` for you, so
   you don't need to declare one yourself (see the [the first FAQ](FAQs/Inspecting-app-db.md) if you want 
   to inspect the value it holds).
4. `app-db` doesn't actually have to be a `ratom` containing a map.  It could, for example, 
   be a [datascript database](https://github.com/tonsky/datascript).  In fact, any database which 
   can signal you when it changes would do. We'd love! to be using [datascript database](https://github.com/tonsky/datascript) - so damn cool -
   but we had too much data in our apps. If you were to use it, you'd have to tweak re-frame a bit and use [Posh](https://github.com/mpdairy/posh).


### The Benefits Of Data-In-The-One-Place

1. Here's the big one:  because there is a single source of truth, we write no
code to synchronize state between many different stateful components.  I 
cannot stress enough how significant this is. You end up writing less code
and an entire class of bugs is eliminated.
(This mindset is very different to OO which involves
distributing state across objects, and then ensuring that state is synchronized, all the while 
trying to hide it, which is, when you think about it, quite crazy ... and I did it for years).

2. Because all app state is coalesced into one atom, it can be updated 
with a single `reset!`, which acts like a transactional commit. There is 
an instant in which the app goes from one state to the next, never a series 
of incremental steps which can leave the app in a temporarily inconsistent, intermediate state. 
Again, this simplicity causes a certain class of bugs or design problems to evaporate.

3. The data in `app-db` can be given a strong schema
so that, at any moment, we can validate all the data in the application. **All of it!** 
We do this check after every single "event handler" runs (event handlers compute new state). 
And this enables us to catch errors early (and accurately). It increases confidence in the way 
that Types can increase confidence, only [a good schema can potentially provide more
**leverage** than types](https://www.youtube.com/watch?v=nqY4nUMfus8). 

4. Undo/Redo [becomes straight forward to implement](https://github.com/Day8/re-frame-undo). 
It is easy to snapshot and restore one central value. Immutable data structures have a 
feature called `structural sharing` which means it doesn't cost much RAM to keep the last, say, 200  
snapshots. All very efficient. 
For certain categories of applications (eg: drawing applications) this feature is borderline magic. 
Instead of undo/redo being hard, disruptive and error prone, it becomes trivial. 
**But,** many web applications are not self contained 
data-wise and, instead, are dominated by data sourced from an authoritative, remote database. 
For these applications, re-frame's `app-db` is mostly a local caching 
point, and being able to do undo/redo its state is meaningless because the authoritative
source of data is elsewhere.

5. The ability to genuinely model control via FSMs (discussed later).

6. The ability to do time travel debugging, even in a production setting. More soon.


### Create A Leveragable Schema

You need to create a [spec](http://clojure.org/about/spec) schema for `app-db`. You want that leverage.

Of course, that means you'll have to learn [spec](http://clojure.org/about/spec) and there's
some overhead in that, so maybe, just maybe, in your initial experiments, you can 
get away without one. But not for long.  Promise me you'll write a `spec`.  Promise me.  Okay, good.

Soon we'll look at the [todomvc example](https://github.com/Day8/re-frame/tree/master/examples/todomvc)
which shows how to use a spec.  (Check out `src/db.cljs` for the spec itself, and then in `src/events.cljs` for
how to write code which checks `app-db` against this spec after every single event has been 
processed.)

Specs are potentially more  leveragable than types. This is a big interesting idea which is not yet mainstream. 
Watch how: <br>
https://www.youtube.com/watch?v=VNTQ-M_uSo8

Also, watch the mighty Rich Hickey (poor audio):<br>
https://vimeo.com/195711510

### How do I inspect it?

See [FAQ #1](FAQs/Inspecting-app-db.md)

*** 

Previous:  [This Repo's README](../README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [First Code Walk-Through](CodeWalkthrough.md)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
