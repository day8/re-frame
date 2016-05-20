## 0.8.0  (XXX)

Breaking:
  - this version requires reagent 0.6.0 or later.  It won't work with 0.5.N. 
  
Improvements
  - `debug` middleware logs a single log line instead of a group if there is no difference in app-db between 
     before and after running the handler.

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
