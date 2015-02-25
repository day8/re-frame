(ns re-frame.middleware
  (:require
    [reagent.ratom :refer [IReactiveAtom]]
    [re-frame.undo :refer [store-now!]]))

;; -- Middleware Factories -------------------------------------------------------------------------
;;
;;  Middleware wraps handlers, providing a composable pipeline.  We use middleware so the handlers
;;  themselves are kept as simple as possible.  In particualr, the handlers can be kept as pure functions.
;;
;;  My attempt to explain, by skirting around the hard bits is as follows ...
;;
;;  Use "comp" to compose middelware, like this:
;;
;;      (def midware  (comp undoable pure (validate some-fn)))   ;; midware is a function
;;
;;  then imagine that we have a pure handler:
;;
;;       (defn my-handler
;;          [db v]
;;          (assoc db :some-key 42))
;;
;;  then apply the composed middleare to my-handler:
;;
;;      (def h    (midware my-handler))    ;;  h is "my-handler"  wrapped in middleware
;;
;;  I could call h like this:
;;      (h app-db [:some-key 23])       <----  h is a handler, just pass in 'db' and 'v'
;;
;;  Which means, you could just register 'h'
;;
;;  (register
;;      :some-id
;;      h)
;;
;;  Middleware factories do your head in initially, because they involve a function, returning a function,
;;  returning a function.  So I'd suggest you might want to read this explanation
;;  (go to "Handlers and Middleware"):
;;     http://www.flyingmachinestudios.com/programming/boot-clj/
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
(fn middlewear
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
  (fn middlewear
    [next-handler]
    (fn handler
      [db v]
      (f (next-handler db v)))))


