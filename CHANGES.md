  
## 0.8.0  (2016.07.XX)

Staying on the leading edge of new buzzwords is obviously critical for any framework. 
Angular's terrifying faceplant is a sobering reminder to us all. 
With this release, re-frame's already impressive buzzword muscles
bulge further with new walnuts like "effects", "coeffects", "interceptors"
and "de-duplicated signal graph".  I know, right?

Some may even find these new features useful.

Joking aside, this is a substantial release which will change how you use re-frame.

##### Headline

  - re-frame subscriptions are now de-duplicated. As a result,
    many Signal graphs will be more efficient. The new behaviour better
    matches programmer intuitions about what "should" happen.

    Each subscription causes a handler to execute, producing
    a reactive stream of updates. Two calls to `(subscribe [:some :query])` results in two copies of the same
    subscription handler running, each delivering a stream of updates. Now, if these two subscriptions
    were running at the same time, this would be inefficient. Both handlers would be
    doing the same computations and delivering the same stream of updates. Unnecessary, duplicate work.

    Starting with this version, this sort of duplication has been eliminated. Two, or more, concurrent
    subscriptions for the same query will now source reactive updates from the one executing handler.

    So, how do we know if two subscriptions are "the same"?  Answer: two subscriptions
    are the same if their query vectors test `=` to each other.

    So, these two subscriptions are *not* "the same":  `[:some-event 42]`  `[:some-event "blah"]`. Even
    though they involve the same event id, `:some-event`, the query vectors do not test `=`.

  - added a new subscription handler registration function called `re-frame.core/reg-sub`. It is an
    alternative to `re-frame.core/register-sub` (now renamed to `re-frame.core/reg-sub-raw`).
    `reg-sub` is significantly easier to use and understand,
    while often also being more performant.  The design has really fallen out nicely and we're
    delighted with it.

    With `reg-sub`, you no longer need to use `reaction` explicitly. Subscription handlers are now pure
    which makes them easier to understand, trace and test etc. Plus, as you'll see in the docs, there is some
    gratuitous syntactic sugar. Who doesn't like sugar?

    At this point, the todomvc example represents the best tutorial on the subject:
    https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs

  - there's now three kinds of event handlers: `-db`, `-fx` and `-ctx`. <br>
    For a tutorial see: https://github.com/Day8/re-frame/wiki/Effectful-Event-Handlers  <br>
    XXX Change link to new docs XXX
    For example use see:
      1. https://github.com/Day8/re-frame-http-fx
      2. https://github.com/Day8/re-frame-forward-events-fx
      3. https://github.com/Day8/re-frame-async-flow-fx

  - You can now run and debug re-frame tests on the JVM.
  
    Just to be clear: this does not mean you can run re-frame apps on the JVM (there's no React or 
    Reagent available). But you can debug your event handler tests using full JVM tooling goodness.
    
    @samroberton and and @escherize have provided the thought leadership and drive here.  They converted 
    re-frame to `.cljc`, supplying plugable interop for both the `js` and `jvm` platforms.

    Further, they have worked with @danielcompton to create a library of testing utilities which 
    will hopefully evolve into a nice step forward on both platforms: <br>
    https://github.com/Day8/re-frame-test
    
    Work is ongoing in this area. 

  - the undo/redo features buried in re-frame has been factored out into 
   [a standalone library](https://github.com/Day8/re-frame-undo).
  
    undo and redo have been a part of re-frame from the beginning, but they have never officially  
    been made a part of the API, and have not been documented. So it nice to see it available, and fully 
    documented. 
    
    This new library includes [various enhancements](https://github.com/Day8/re-frame-undo#harvesting-and-re-instating)
    over that which previously existed, and it works in with effectful handlers described above.
    
  - Middleware is dead, long live Interceptors. 
  
    Up until now, re-frame has allowed you to decorate event handlers with 
    middleware which looked after the cross cutting concerns of
    tracing, undo/redo, validation, etc. This has proved a neat and 
    successful part of the framework.  We thought we were happy.
    
    But recently @steveb8n gave a cljsyd talk on 
    Pedistal's Interceptor pattern which suddenly transformed them from 
    arcane to delightfully simple in 20 mins. Interceptors are 
    really "middleware via data" rather than "middleware via higher order functions".  
    So it is another way of doing the same thing, but to my mind
    Interceptors are a more flexible platform, and simpler. 
    
    Interceptors also dovetail really nicely with the effects and coeffects 
    story which has emerged in re-frame through this 0.8.0 release. 
    
    In day to day use, there's a good chance you won't notice the change from 
    middleware to Interceptors UNLESS: 
    
    1. You have written your own middleware.  If so, you'll have to rewrite it.
       See how [the builtin interceptors are done](https://github.com/Day8/re-frame/blob/develop/src/re_frame/std_interceptors.cljc). 
    2. You explicitly use `comp` like this: 
       ```clj
       (reg-event-db 
           :some-id
           (comp debug tim-v)    ;; <-- change to [debug trim-v]
           (fn [db event] 
               ...))
       ```
    
    XXX link to docs   
    
  - we now have a logo designed by Sketch Maester @martinklepsch. Thank you Martin!  But remember, no 
    good deed ever goes unpunished - we'll be pestering you every time from now on :-)

##### Breaking

  - requires Reagent >= v0.6.0

  - `re-frame.core/register-handler` has been renamed `re-frame.core/reg-event-db`. There's now
    three kinds of event-handlers, `-db`, `-fx` and `-ctx`. Event handlers of the 2nd and 3rd kinds
    should be registered via the new registration functions `re-frame.core/reg-event-fx` and 
    `re-frame.core/reg-event-ctx`

  - `re-frame.core/register-sub` has been renamed `re-frame.core/reg-sub-raw`.  This is to indicate that
    this kind of registration is now considered the low level, close to the metal way to
    create subscriptions handlers.  This release introduced `reg-sub` which becomes the preferred way
    to register subscription handlers.
     
  - middlewares have been replaced by Interceptors. You won't even notice the difference
    unless you have written your own middleware, in which case you'll have to rewrite it
    to be an interceptor. XXX reference to further docs 
    
  - if you have previously used the undo/redo capabilities buried in re-frame, be aware they have 
    extracted into a sibling library: https://github.com/Day8/re-frame-undo.

  - By default, re-frame uses `js/console` functions like `error` and `warn` when logging, but you can
    supply alternative functions using `re-frame.core/set-loggers!`.

    With this release, any alternatives you supply will be called with different parameters.
    Previously loggers were called with a single `str` parameter but now they are expected to act
    like `console.log` itself and take variadic, non string params. Sorry to break things, but
    we are trying to maximise use of cljs-devtools and information is lost when strings are
    output, instead of actual data.

    Of course, you need only worry about this if you are using `re-frame.core/set-loggers!` to
    hook in your own loggers.  If you are, then, to transition, you'll need to tweak like this:
    ```
     ;; your old log function might have looked like this. Single string parameter.
    (defn my-logger [s]  (do-something-with s))

    ;; your new version will have variadic params, and turn them into a string
    (defn my-logger [& args] (do-something-with (apply str args))
    ```

##### Improvements

  - Bug fix: `post-event-callbacks` were not called when `dispatch-sync` was called.
  - added new API `re-frame.core/clear-post-event-callback` which de-registers a callback 
    previously added by `re-frame.core/add-post-event-callback`
  - when an event-handler makes no change to `app-db`, the `debug` middleware now logs a
    single line saying so, rather than a "group".  Makes it slightly easier to grok
    the absence of change.
  - Standardised test namespaces: renamed to use -test suffix and moved to eliminate redundant /test folder
  - Added cljs.test based tests via browser/html. These mimic original karma tests. NOTE: previous
    lein aliases `once` and `auto` have been replaced by `test-once` , `test-auto` & `karma-once`
    see [CONTRIBUTING.md](CONTRIBUTING.md)
    
Pending 
  - should reg-event return the pure handler ?? 
  - XXX  traceability 
  - XXX  framework -> library
  - XXX  middleware for spec checking of event vectors


## 0.7.0  (2016-03-14)

Breaking:
  - removed middleware `log-ex`. It is no longer needed because browsers now correctly report the
    throw site of re-thown exceptions.  In the unlikely event that you absolutely still need it,
    the source for `log-ex` is still in `middleware.cljs`, commented out.  Just transfer it to your project.

  - `debug` middleware now produces slightly different output (to console). So no code will need to change,
    just your expectations of what you see in console. Previously all console output from an event handler was put
    into the one console group, which could lead to exceptions being hidden (down in a closed group).

Improvements:
  - added one tick of extra pause when events have `:flush=dom` metadata. Previously, there were odd times when
    the pause wasn't long enough to ensure redraws.
  - now compatible with Reagent 0.6.0 (but this not fully tested) while remaining backwards compatible with
    Reagent v0.5.1
  - [#138](https://github.com/Day8/re-frame/pull/138) Switch to using CircleCI and automated testing with Karma

Fixed:
  - [#149](https://github.com/Day8/re-frame/pull/149) Undo now discards oldest undo states, not the newest ones.

## 0.6.0  (2015-12-09)

New API:
  - [#118](https://github.com/Day8/re-frame/pull/118) - Add `add-post-event-callback` to the API.
    @pupeno is developing [preprender](https://carouselapps.com/prerenderer) which looks pretty neat.
    Support this effort by adding a way for preprender to hook event processing.

  - `on-changes` middleware now official. No longer experimental.

Improvements:
  - [#134](https://github.com/Day8/re-frame/pull/134)
    My thanks to @scgilardi for a nice simplification of the routing state machine. Again!
  - [#133](https://github.com/Day8/re-frame/pull/133) Improve Readme formatting


## 0.5.0  (2015-11-5)

New Features:
  - [#108](https://github.com/Day8/re-frame/pull/108) - Add dynamic subscriptions.
    Docs to follow, and your cheque is in the mail.

Improvements:
  - fixed problem with log grouping
  - removed `-------New Event-------` log msg
  - made groups collapsed by default
  - [#104](https://github.com/Day8/re-frame/pull/104) - Updated to the latest TodoMVC CSS
  - Reimplemented the router loop. Removed use of core.async. Replaced with hand rolled scheduling.
    See [420e42a](https://github.com/Day8/re-frame/commit/420e42aacccbac2d81fedc5ff861442a4ce70c1d)
    As a result:
      - there is less of a pause between a `dispatch` and the associated event handler being run. (<1ms vs 5ms??)
      - groups of events queued up will be handled in a batch, one after the other, without yielding
        to the browser (previously re-frame yielded to the browser before every single event).

    This fixes issues like [#39](https://github.com/Day8/re-frame/pull/39) and
    [#121](https://github.com/Day8/re-frame/pull/121)

    I doubt this will affect normal apps. But it could affect games which depend on existing timings. Maybe.
    It could affect apps which dispatch large volumes of events (telemetry?) very quickly. Maybe.


## v0.4.1 (2015-05-29)

Improvements:
  - fix #65 - Detect mistaken use of middleware factories
  - `examples/` now work with figwheel


## v0.4.0  (2015-05-04)

Headline:
  - Exceptions in event handlers no longer break the router loop.
    Previously, any exception in an event handler broke the app
    permanently. This change will:
      - improve the debugging experience with figwheel
      - mean apps, in production, stand a chance of reporting UHE
        to the user, and can perhaps even recover to a sane state.
  - #53 Fix Logging And Error Reporting
    You can now provide your own logging fucntions.
    Further explanation [here](https://github.com/Day8/re-frame/wiki/FAQ#3-can-re-frame-use-my-logging-functions).

Deprecated:
  - `log-ex` middleware is no longer needed.  Simply remove its use.
    Sometime in the last couple of months, changes to the CLJS
    runtime meant that useful exceptions could escape go-loops, and
    good stack traces appear (at least in Chrome).

New Features:
  - #52 Add a way to purge redos   `(dispatch [:purge-redos])`
    When trying to recover from an UHE, do an undo to get back to the
    last sane state, and then use this new feature to purge the
    just-generated-redo.
  - #43 Add ability to clear handlers (event and subs) via
    two new API functions:
      - re-frame.core/clear-sub-handlers!
      - re-frame.core/clear-event-handlers!
    Useful for those using the [ClojureScript fork](https://github.com/quile/component-cljs) of [Component](https://github.com/stuartsierra/component).

Experimental:
  - #50 Add "reaction-like" middleware called `on-changes`.

Other:
  - improve some comments in todomvc example


## v0.3.2  (2015-04-21)

Improvements:
  - Fix #42 - Put in checks for dispatch-sync
  - Fix #49 - add table of content and link to wiki for middleware
  - Fix #46 - Minor typos fixed


## v0.3.1  (2015-04-18)

Various small improvements and bug fixes:

  - log-ex middleware added to core api (it was a mistake that it was missing)
  - modest improves to simple example. Better comments, layout, etc.
  - the anonymous functions in standard middleware now have meaningful
    names, which makes stack traces easier to understand.
  - #24 - Fix missing paren in README
  - #31 - Fix list formatting in README
  - #32 - fix a broken wiki link
  - #30 - Fix up the enrich docstring


## v0.3.0  (2015-04-15)

### Headline

  - the middleware `after` and `enrich` now call the supplied function `f` with
    both `db` and `v` (previously just `db`). Because javascript is so forgiving
    about function arity, this change is backwards compatible.
  - new event handler middleware `log-ex` for correctly printing handler stacktraces.
    See [explanation](https://github.com/Day8/re-frame/wiki/Debugging-Event-Handlers#1-an-exception-is-thrown).
  - ongoing improvements to the docs in Wiki

### Other

  - move to reagent v0.5.0
  - fix undo bug which could result in incorrect explanations.
  - improve todomvc's use of localstorage
  - experimental work with slimmer.js for testing
  - correct README wiki links
  - license.txt was incorrectly named previously


## v0.2.0  (2015-03-06)

### Breaking

Renames:
  - `register-pure-handler` renamed to `register-handler`  (and existing low level `register-handler` becomes `register-handler-base` but is not a part of the API).
  - remove `apply-event` middleware and replace with similar `trim-v`
  - rename `register-subs` to `register-sub`  (avoid confusion over possible plurals)
  - rename `set-max-undos`  to `set-max-undos!`

Changes:
  - `undoable` middleware is now a factory. Where before you used this `undoable`,
     you must now use this `(undoable "some explanation")`.  See further below.

### Headline

  - exceptions in handler now reported more sanely via console.error.
    (core.async really messes with a good stack)
  - example `todomvc` available in examples folder.
  - Wiki documentation is now more substantial.
  - introduce new handler middleware: `debug`, `enrich` and `after`

### Other:
  - exceptions in a go loop are a special type of hell.  Improve the reporting of exceptions happening in event handlers.
  - allow Middleware to be registered as a vector.  data > functions > macros
  - fix two bugs in undo implementation
  - name licence file correctly, thanks to @smith
  - fix typo in readme, thanks to @btheado
  - Readme now admits to 200 lines of code, not 100.
  - dispatch now explicitly returns nil
  - travis integration (not that we have any tests currently)



### Details On Undo Changes

The undo/redo feature built into re-frame is now more functional
(at the cost of a breaking change).

There is now an explanation associated with each undo state describing
modification. This allows an app to inform the user what actions
they will be undoing or redoing.

Previously `undoable` was simply middleware, but it is now a middleware factory.

Essentially, that means you can't use it "plain" anymore, and instead you must
call it, like this `(undoable "Some explanation")`

The `explanation` provided to undoable must be either a `string` (static
explanation) or a function  `(db event) -> string`, allowing you to customize
the undo message based on details of the event.


