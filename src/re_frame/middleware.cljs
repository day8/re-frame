(ns re-frame.middleware
  (:require
    [reagent.ratom  :refer [IReactiveAtom]]
    [re-frame.undo  :refer [store-now!]]
    [re-frame.utils :refer [warn]]
    [clojure.data   :as data]))


;; See docs in the Wiki: https://github.com/Day8/re-frame/wiki

(defn pure
  "Middleware which means a handler takes a value in the first parameter, not an atom.
  If you strip away the error/efficiency checks, it is doing this:
     (reset! app-db (handler @app-db event-vec))"
  [handler]
  (fn new-handler
    [app-db event-vec]
    (assert (satisfies? IReactiveAtom app-db)
            (str "re-frame: pure not given a Ratom."
                 (if (map? app-db)
                   " Looks like \"pure\" is in the middleware pipeline twice."
                   (str " Got: " app-db))))
    (let [orig-db @app-db
          new-db  (handler orig-db event-vec)]
      (if (nil? new-db)
        (warn "re-frame: your pure handler returned nil. It should return the new db.")
        (if-not (identical? orig-db new-db)
           (reset! app-db new-db))))))


(defn debug
  "Middleware which dispays each event (to console) along with a diff on the db, before vs after"
  [handler]
  (fn new-handler
    [db v]
    (if (satisfies? IReactiveAtom db)
      (str "re-frame: \"debug\" middleware used without prior \"pure\"."))
    (warn "handler: " v)    ;; XXX don't use warn
    (let [new-db  (handler db v)]
      (warn "handler: " (data/diff db new-db))   ;; XXX don't use warn
      new-db)))


;; warning: untested
(defn undoable
  "Middleware which stores an undo checkpoint, prior to handler being called."
  [handler]
  (fn new-handler
    [app-db event-vec]
    (store-now!)
    (handler app-db event-vec)))



(defn trim-v
  "Middleware which removes the first element of v. It means you can write
  more asthetically pleasing handlers"
  [handler]
  (fn new-handler
    [db v]
    (handler db (vec (rest v)))))


(defn path
  "Supplies a sub-tree of `app-db` to the handler.
  Assumes pure is in the middleware pipeline prior.
  Grafts the result back into app-db."
  [p]
  (fn middleware
    [handler]
    (fn new-handler
      [db v]
      (if (satisfies? IReactiveAtom db)
        (str "re-frame: \"path\" used in middleware, without prior \"pure\"."))
      (if-not (vector? p)
        (warn  "re-frame: \"path\" expected a vector, got: " p))
      (assoc-in db p (handler (get-in db p) v)))))


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
#_(defn log-events
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