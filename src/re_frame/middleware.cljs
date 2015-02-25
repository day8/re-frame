(ns re-frame.middleware
  (:require
    [reagent.ratom  :refer [IReactiveAtom]]
    [re-frame.undo  :refer [store-now!]]
    [re-frame.utils :refer [warn]]))


;; Read this:  https://github.com/Day8/re-frame/wiki/Middleware


(defn pure
  "Middleware which adapts a pure handler to the non-pure standard calling convention"
  [handler]
  (fn new-handler
    [app-db event-vec]
    (assert (satisfies? IReactiveAtom app-db)
            (str "re-frame: pure not given a Ratom" (if (map? app-db) ". Perhaps \"pure\" is used twice.")))
    (reset! app-db (handler @app-db event-vec))))



;; warning: untested
(defn undoable
  "Middleware which stores an undo checkpoint, prior to handler being called."
  [handler]
  (fn new-handler
    [app-db event-vec]
    (store-now!)
    (handler app-db event-vec)))



;; warning: untested
(defn apply-event
  "Middleware which removes the first bit of v, and \"expands\" other parameters.
  Normally handlers get two paramters:  db and v.
  With this middleware, if v was [:id 1 2], the handler would be called with db, 1, 2.
  Use the middleware in the very last place -- right-most in  comp"
  [handler]
  (fn new-handler
    [db v]
    (apply handler (cons db (rest v)))))


;; warning: untested
(defn path
  "Supplies a sub-tree of `app-db` to the handler.
  Assumes pure is
  Grafts the result back into."
  [p]
  (fn middleware
    [handler]
    (fn new-handler
      [db v]
      (if (satisfies? IReactiveAtom db)
        (str "re-frame: \"path\" used in middleware, without prior \"pure\"."))
      (if-not (vector? p)
        (warn  "re-frame: \"path\" expected a vector, got: " v))
      (assoc-in db p (handler (get-in db p) v)))))


;; warning: untested
(defn validate
  "Middleware that applies a validation function to the db after the handler is finished.
The validation function f, might assoc warnings and errors to the new state, created by the handler.
By validation, I mean validation of what the user has entered, or the state they have taken the app too"
  [f]
  (fn middleware
    [handler]
    (fn new-handler
      [db v]
      (f (handler db v)))))


;; warning: untested
(defn log-events
  "Middleware that logs events (vec) using to the given logger fucntion"
  [logger]
  (fn middleware
    [handler]
    (fn new-handler
      [db v]
      (logger v)
      (handler db v))))




;; warning: untested
;; check the state of db AFTER the handler has run, using a prismatic Schema.
#_(defn check-schema
"Middleware for checking that a handlers mutations leave the state in a schema-matching way"
[a-prismatic-schema]
(fn middleware
  [next-handler]
  (fn handler
    [db v]
    (let [val    (next-handler db v)
          valid? true]   ;; XXXXX  replace true by code which checks the schema using original parameter
      (if (not valid?)
        (warn "re-frame: schema not valid after:" v))
      val))))