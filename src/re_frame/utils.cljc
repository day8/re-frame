(ns re-frame.utils
  (:require
    [re-frame.loggers :refer [console]]
    [reagent.ratom :as ratom]))


(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (console :error "re-frame: expected a vector, but got:" v)))

(defn reagent-id
  "Produces an id for reactive Reagent values
  e.g. reactions, ratoms, cursors."
  [reactive-val]
  #?(:cljs (when (implements? ratom/IReactiveAtom reactive-val)
             (str (condp instance? reactive-val
                    ratom/RAtom "ra"
                    ratom/RCursor "rc"
                    ratom/Reaction "rx"
                    ratom/Track "tr"
                    "other")
                  (hash reactive-val)))))
