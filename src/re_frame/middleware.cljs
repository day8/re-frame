(ns re-frame.middleware
  (:require
    [reagent.ratom  :refer [IReactiveAtom]]
    [re-frame.undo  :refer [store-now!]]
    [re-frame.utils :refer [warn log group groupEnd error]]
    [clojure.data   :as data]))


;; See docs in the Wiki: https://github.com/Day8/re-frame/wiki


(defn pure
  "Acts as an adaptor, allowing handlers to be writen as pure functions.
  The re-frame router passes the `app-db` atom as the first parameter to any handler.
  This middleware adapts that atom to be the value within the atom.
  If you strip away the error/efficiency checks, this middleware is doing:
     (reset! app-db (handler @app-db event-vec))
  You don't have to use this middleware directly. It is automatically applied to
  your handler's middleware when you use \"register-handler\".
  In fact, the only way to by-pass automatic use of \"pure\" in your middleware
  is to use the low level registration function \"re-frame.handlers/register-base\""
  [handler]
  (fn pure-handler
    [app-db event-vec]
    (if-not (satisfies? IReactiveAtom app-db)
      (do
        (if (map? app-db)
          (warn "re-frame: Looks like \"pure\" is in the middleware pipeline twice. Ignoring.")
          (warn "re-frame: \"pure\" middleware not given a Ratom.  Got: " app-db))
        handler)    ;; turn this into a noop handler
      (let [db      @app-db
            new-db  (handler db event-vec)]
        (if (nil? new-db)
          (error "re-frame: your pure handler returned nil. It should return the new db state.")
          (if-not (identical? db new-db)
            (reset! app-db new-db)))))))


(defn log-ex
  "Middleware which catches and prints any handler-generated exceptions to console.
  Handlers are called from within a core.async go-loop, and core.async produces
  a special kind of hell when in comes to stacktraces. By the time an exception
  has passed through a go-loop its stack is mangled beyond repair and you'll
  have no idea where the exception was thrown.
  So this middleware catches and prints to stacktrace before the core.async sausage
  machine has done its work.
  "
  [handler]
  (fn log-ex-handler
    [db v]
    (warn "re-frame: use of \"log-ex\" is deprecated. You don't need it any more IF YOU ARE USING CHROME 44. Chrome now seems to now produce good stack traces.")
    (try
      (handler db v)
      (catch :default e     ;; ooops, handler threw
        (do
          (.error js/console (.-stack e))
          (throw e))))))


(defn debug
  "Middleware which logs debug information to js/console for each event.
  Includes a clojure.data/diff of the db, before vs after, showing the changes
  caused by the event."
  [handler]
  (fn debug-handler
    [db v]
    (group "re-frame event: " v)
    (let [new-db  (handler db v)
          diff    (data/diff db new-db)]
      (log "only before: " (first diff))
      (log "only after : " (second diff))
      (groupEnd)
      new-db)))



(defn trim-v
  "Middleware which removes the first element of v, allowing you to write
  more aesthetically pleasing handlers. No leading underscore on the event-v!
  Your handlers will look like this:
      (defn my-handler
        [db [x y z]]    ;; <-- instead of [_ x y z]
        ....)
  "
  [handler]
  (fn trim-v-handler
    [db v]
    (handler db (vec (rest v)))))


;; -- Middleware Factories ----------------------------------------------------
;;
;; Note: weird approach defn-ing middleware factories below. Why? Because
;; I wanted to put some metadata on them (useful for later checking).
;; Found I had to do it this way:
;;   (def fn-name
;;     "docstring"
;;     ^{....}       ;; middleware put on the following fn
;;     (fn fn-name ....))
;;
;; So, yeah, weird.

(def path
  "A middleware factory which supplies a sub-tree of `db` to the handler.
   Works a bit like update-in. Supplies a narrowed data structure for the handler.
   Afterwards, grafts the result of the handler back into db.
   Usage:
     (path :some :path)
     (path [:some :path])
     (path [:some :path] :to :here)
     (path [:some :path] [:to] :here)
  "
  ^{:re-frame-factory-name "path"}
  (fn path
    [& args]
    (let [path   (flatten args)]
      (when (empty? path)
        (error "re-frame: \"path\" middleware given no params."))
      (fn path-middleware
        [handler]
        (fn path-handler
          [db v]
          (update-in db path handler v))))))


(def undoable
  "A Middleware factory which stores an undo checkpoint.
  \"explanation\" can be either a string or a function. If it is a
  function then must be:  (db event-vec) -> string.
  \"explanation\" can be nil. in which case \"\" is recorded.
  "
  ^{:re-frame-factory-name "undoable"}
  (fn undoable
    [explanation]
    (fn undoable-middleware
      [handler]
      (fn undoable-handler
        [db event-vec]
        (let [explanation (cond
                            (fn? explanation)     (explanation db event-vec)
                            (string? explanation) explanation
                            (nil? explanation)    ""
                            :else (error "re-frame: \"undoable\" middleware given a bad parameter. Got: " explanation))]
          (store-now! explanation)
          (handler db event-vec))))))


(def enrich
  "Middleware factory which runs a given function \"f\" in the after position.
  \"f\" is (db v) -> db
  Unlike \"after\" which is about side effects, \"enrich\" expects f to process and alter
  db in some useful way, contributing to the derived data, flowing vibe.
  Imagine that todomvc needed to do duplicate detection - if any two todos had
  the same text, then highlight their background, and report them in a warning
  down the bottom.
  Almost any action (edit text, add new todo, remove a todo) requires a
  complete reassesment of duplication errors and warnings. Eg: that edit
  update might have introduced a new duplicate or removed one. Same with a
  todo removal.
  And to perform this enrichment, a function has to inspect all the todos,
  possibly set flags on each, and set some overall list of duplicates.
  And this duplication check might just be one check among many.
  \"f\" would need to be both adding and removing the duplicate warnings.
  By applying \"f\" in middleware, we keep the handlers simple and yet we
  ensure this important step is not missed."
  ^{:re-frame-factory-name "enrich"}
  (fn enrich
    [f]
    (fn enrich-middleware
      [handler]
      (fn enrich-handler
        [db v]
        (f (handler db v) v)))))


(def after
  "Middleware factory which runs a function \"f\" in the \"after handler\"
  position presumably for side effects.
  \"f\" is given the new value of \"db\". It's return value is ignored.
  Examples: \"f\" can run schema validation. Or write current state to localstorage. etc.
  In effect, \"f\" is meant to sideeffect. It gets no chance to change db. See \"enrich\"
  (if you need that.)"
  ^{:re-frame-factory-name "after"}
  (fn after
    [f]
    (fn after-middleware
      [handler]
      (fn after-handler
        [db v]
        (let [new-db (handler db v)]
          (f new-db v)   ;; call f for side effects
          new-db)))))


;; EXPERIMENTAL

(def  on-changes
  "Middleware factory which acts a bit like \"reaction\"  (but it flows into db , rather than out)
  It observes N  inputs (paths into db) and if any of them change (as a result of the
  handler being run) then it runs 'f' to compute a new value, which is
  then assoced into the given out-path within app-db.

  Usage:

  (defn my-f
    [a-val b-val]
    ... some computation on a and b in here)

  (on-changes my-f [:c]  [:a] [:b])

  Put the middlware above on the right handlers (ones which might change :a or :b).
  It will:
     - call 'f' each time the value at path [:a] or [:b] changes
     - call 'f' with the values extracted from [:a] [:b]
     - assoc the return value from 'f' into the path  [:c]
  "
  ^{:re-frame-factory-name "on-changes"}
  (fn on-changes
    [f out-path & in-paths]
    (fn on-changed-middleware
      [handler]
      (fn on-changed-handler
        [db v]
        (let [ ;; run the handler, computing a new generation of db
              new-db (handler db v)

              ;; work out if any "inputs" have changed
              new-ins      (map #(get-in new-db %) in-paths)
              old-ins      (map #(get-in db %) in-paths)
              changed-ins? (some false? (map identical? new-ins old-ins))]

          ;; if one of the inputs has changed, then run 'f'
          (if changed-ins?
            (assoc-in new-db out-path (apply f new-ins))
            new-db))))))
