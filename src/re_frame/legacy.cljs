(ns re-frame.legacy
  (:require [reagent.ratom :refer [IReactiveAtom]]
            [re-frame.logging :refer [log warn error group group-end]]))

;; See docs in the Wiki: https://github.com/Day8/re-frame/wiki

; this middleware is included for backward compatibility, it is not used anymore
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
  [frame-atom]
  (fn [handler]
    (fn pure-handler [app-db event-vec]
      (warn @frame-atom "re-frame: pure handler should not be used anymore.")
      (if (not (satisfies? IReactiveAtom app-db))
        (do
          (if (map? app-db)
            (warn @frame-atom "re-frame: Looks like \"pure\" is in the middleware pipeline twice. Ignoring.")
            (warn @frame-atom "re-frame: \"pure\" middleware not given a Ratom.  Got: " app-db))
          handler)                                          ;; turn this into a noop handler
        (let [db @app-db
              new-db (handler db event-vec)]
          (if (nil? new-db)
            (error @frame-atom "re-frame: your pure handler returned nil. It should return the new db state.")
            (if-not (identical? db new-db)
              (reset! app-db new-db))))))))
