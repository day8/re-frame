

## Planned for v0.3.0

  - automatically wrap subscriptions in a `reaction`  (removing the need for over
    10 keystrokes per handler!!).  Just kidding there are better reasons than that.
  - produce a more fully featured todomvc (beyond the standard one), todomvc-with-extras
    - use `enrich` to handle todo duplication
    - show testing
    - show debug
  - begin to use goog.Logger ??  How to let client apps know about exceptions, etc ??


## v0.2.0  (2015-03-06)

Being blocked by:

In todomvc, to be done tomorrow ahead of release:
  - fix bug in todomvc  which means the footer disappears and doesn't come back.
  - add localstorage
  - add history, back button etc.

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
