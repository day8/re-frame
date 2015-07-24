
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
