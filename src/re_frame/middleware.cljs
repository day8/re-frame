(ns re-frame.middleware
  (:require
    [reagent.ratom  :refer [IReactiveAtom]]
    [re-frame.undo  :refer [store-now!]]
    [re-frame.utils :refer [warn log dbg group groupEnd]]
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
  is to use the low level registration function \"re-frame.handlers/register-handler-base\""
  [handler]
  (fn pure-handler
    [app-db event-vec]
    (if (not (satisfies? IReactiveAtom app-db))
      (do
        (if (map? app-db)
          (warn "re-frame: Looks like \"pure\" is in the middleware pipeline twice. Ignoring.")
          (warn "re-frame: \"pure\" middleware not given a Ratom.  Got: " app-db))
        handler)    ;; turn this into a noop handler
      (let [db      @app-db
            new-db  (handler db event-vec)]
        (if (nil? new-db)
          (warn "re-frame: your pure handler returned nil. It should return the new db state.")
          (if-not (identical? db new-db)
            (reset! app-db new-db)))))))


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
  more asthetically pleasing handlers. No leading underscore on the event-v!
  Your handlers will look like this:
      (defn my-handler
        [db [x y z]]    ;; <-- instead of [_ x y z]
        ....)
  "
  [handler]
  (fn new-handler
    [db v]
    (handler db (vec (rest v)))))


(defn path
  "A middleware factory which supplies a sub-tree of `db` to the handler.
  Works a bit like update-in. Supplies a narrowed data structure for the handler.
  Afterwards, grafts the result of the handler back into db.
  Usage:
     (path :some :path)
     (path [:some :path])
     (path [:some :path] :to :here)
     (path [:some :path] [:to] :here)
  "
  [& args]
  (let [path   (flatten args)
        _      (if (empty? path)
                 (warn "re-frame: path middleware given no params. Probably a mistake."))]
    (fn middleware
      [handler]
      (fn path-handler
        [db v]
        (assoc-in db path (handler (get-in db path) v))))))


(defn undoable
  "A Middleware factory which stores an undo checkpoint.
  \"explanation\" can be either a string or a function. If it is a
  function then must be:  (db event-vec) -> string.
  \"explanation\" can be nil. in which case \"\" is recorded.
  "
  [explanation]
  (fn middleware
    [handler]
    (fn undoable-handler
      [db event-vec]
      (let [explanation (cond
                          (fn? explanation)     (explanation db event-vec)
                          (string? explanation) explanation
                          (nil? explanation)    ""
                          :else (warn "re-frame: undoable given a bad parameter. Got: " explanation))]
      (store-now! explanation)
      (handler db event-vec)))))


(defn enrich
  "Middleware factory which runs a given function \"f\" in the after position.
  \"f\" is (db) -> db
  Unlike \"after\" which is about side effects, \"enrich\" expects f to process and alter
  db in some useful way, contributing to the derived data, flowing vibe.
  Imagine that todomvc needed to do duplicate detection - if any two todos had
  the same text, then highlight their background, and report them in a warning
  down the bottom.
  Almost any action (edit text, add new todo, remove a todo) requires a
  complete reassesment of duplication errors and warnings. Eg: that edit
  update might have introduced a new duplicate or removed one. Same with a
  todo removal.
  And to perform this enrichment, a function has inspect all the todos,
  possibly set flags on each, and set some overall list of duplicates.
  And this duplicates checking might be just one check amoung a number.
  \"f\" would need to be both adding and removing the duplicate warnings.
  By applying \"f\" in middleware, we keep the handlers simple and yet we
  ensure this important step is not missed. "
  [f]
  (fn middleware
    [handler]
    (fn validate-handler
      [db v]
      (f (handler db v)))))    ;;  (comp f handler)



(defn after
  "Middleware factory which runs a function \"f\" in the \"after handler\"
  position presumably for side effects.
  \"f\" is given the value of \"db\". It's return value is ignored.
  Examples: \"f\" can run schema validation. Or write current state to localstorage. etc.
  In effect, \"f\" is meant to sideeffect. It gets no chance to change db. See \"enrich\"
  (if you need that.)"
  [f]
  (fn middleware
    [handler]
    (fn after-handler
      [db v]
      (let [new-db (handler db v)]
        (f new-db)   ;; call f for side effects
        new-db))))


;; warning: untested
#_(defn log-events
  "Middleware that logs events (vec) using to the given logger fucntion"
  [logger]
  (fn middleware
    [handler]
    (fn new-handler
      [db v]
      (logger v)
      (handler db v))))

