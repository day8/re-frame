
## Planned for v0.4.0

  - automatically wrap subscriptions in a `reaction`  (removing the need for over
    10 keystrokes per handler!!).  Just kidding there are better reasons than that.
  - further develop the debugging story.
  - modifiy todoMVC for new subscriptions approach
  - document new sbscriptions approach
  - move contents of README across to Wiki. Make Readme simpler and more pragmatic.
  - produce a more fully featured todomvc (beyond the standard one), todomvc-with-extras
    - use `enrich` to handle todo duplication
    - add prismatic schema
    - show testing
    - show debug
    - undo



### Other

  - #32 - fix a broken wiki link
  - #31 - Fix list formatting in README


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
