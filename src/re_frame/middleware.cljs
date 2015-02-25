(ns re-frame.middleware
  (:require
    [reagent.ratom :refer [IReactiveAtom]]
    [re-frame.undo :refer [store-now!]]))

;; -- Middleware Factories -------------------------------------------------------------------------
;;
;; Read this:  https://github.com/Day8/re-frame/wiki/Middleware
;;

(defn undoable
  "Middleware which stores an undo checkpoint"
  [next-handler]
  (fn handler
    [app-db event-vec]
    (store-now!)
    (next-handler app-db event-vec)))


(defn pure
  "Middleware which allows you to write a pure handler.
  1. on the way through it extracts the value in the atom
  2. resets the atom with the returned value after calling the handler"
  [next-handler]
  (fn handler
    [app-db event-vec]
    (assert (satisfies? IReactiveAtom app-db) "re-frame: make-pure not given a Ratom")
    (reset! app-db (next-handler @app-db event-vec))))


;; example of applying
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
        (warn "re-frame: schema not valid after:" ))
      val))))


(defn validate
  "Middleware that applies a validation function to the db after the handler is finished.
The validation function f, might assoc warnings and errors to the new state, created by the handler.
By validation, I mean validation of what the user has entered, or the state they have taken the app too"
  [f]
  (fn middleware
    [next-handler]
    (fn handler
      [db v]
      (f (next-handler db v)))))


