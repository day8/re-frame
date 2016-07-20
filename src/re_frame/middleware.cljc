(ns re-frame.middleware
  (:require
    [re-frame.interop :refer [ratom?]]
    [re-frame.loggers :refer [console]]
    [clojure.data   :as data]))


;; Middleware docs can be found in the Wiki: https://github.com/Day8/re-frame/wiki
;; Example use can be found in this repo: examples/todomvc/handler.cljs


(defn pure
  "Acts as an adaptor, allowing handlers to be writen as pure functions.
  The re-frame router passes the `app-db` atom as the first parameter to any handler.
  This middleware adapts that atom to be the value within the atom.
  If you strip away the error/efficiency checks, this middleware is doing:
     (reset! app-db (handler @app-db event-vec))
  You don't have to use this middleware directly. It is automatically applied to
  your handler's middleware when you use \"reg-event-pure\".
  In fact, the only way to by-pass automatic use of \"pure\" in your middleware
  is to use the low level registration function \"re-frame.handlers/register-base\""
  [handler]
  (fn pure-handler
    [app-db event-vec]
    (if-not (ratom? app-db)
      (do
        (if (map? app-db)
          (console :warn "re-frame: Looks like \"pure\" is in the middleware pipeline twice. Ignoring.")
          (console :warn "re-frame: \"pure\" middleware not given a Ratom.  Got: " app-db))
        handler)    ;; turn this into a noop handler
      (let [db      @app-db
            new-db  (handler db event-vec)]
        (if (nil? new-db)
          (console :error "re-frame: your pure handler returned nil. It should return the new db state.")
          (if-not (identical? db new-db)
            (reset! app-db new-db)))))))



(defn debug
  "Middleware which logs debug information for each event.
  Includes a clojure.data/diff of the db, before vs after, showing the changes
  caused by the event handler.
  See also: https://gist.github.com/mike-thompson-day8/9439d8c502c2f307c029a142b689852d
  "
  [handler]
  (fn debug-handler
    [db v]
    (console :log "Handling re-frame event: " v)
    (let [new-db  (handler db v)
          [before after] (data/diff db new-db)
          db-changed? (or (some? before) (some? after))]
      (if db-changed?
        (do (console :group "clojure.data/diff for: " v)
            (console :log "only before: " before)
            (console :log "only after : " after)
            (console :groupEnd))
        (console :log "clojure.data/diff no changes for: " v))
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
;; Note: below we add metadata to middleware factories so as
;; to catch certain programmer mitakes and report them nicely.

(defn path_
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
  (let [path   (flatten args)]
    (when (empty? path)
      (console :error "re-frame: \"path\" middleware given no params."))
    (fn path-middleware
      [handler]
      (fn path-handler
        [db v]
        (update-in db path handler v)))))

(def path (with-meta path_ {:re-frame-factory-name "path"}))


(defn enrich_
  "Middleware factory which runs a given function \"f\" in the  \"after handler\"
  position.
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
  [f]
  (fn enrich-middleware
    [handler]
    (fn enrich-handler
      [db v]
      (f (handler db v) v))))

(def enrich (with-meta enrich_ {:re-frame-factory-name "enrich"}))


(defn after_
  "Middleware factory which runs a function \"f\" in the \"after handler\"
  position presumably for side effects.
  \"f\" is given the new value of \"db\". It's return value is ignored.
  Examples: \"f\" can run schema validation. Or write current state to localstorage. etc.
  In effect, \"f\" is meant to sideeffect. It gets no chance to change db. See \"enrich\"
  (if you need that.)"
  [f]
  (fn after-middleware
    [handler]
    (fn after-handler
      [db v]
      (let [new-db (handler db v)]
        (f new-db v)   ;; call f for side effects
        new-db))))

(def after (with-meta after_ {:re-frame-factory-name "after"}))


(defn  on-changes_
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
          new-db)))))

(def on-changes (with-meta on-changes_ {:re-frame-factory-name "on-changes"}))
