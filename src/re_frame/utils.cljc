(ns re-frame.utils
  (:require
    [re-frame.loggers :refer [console]]
    #?(:cljs [reagent.ratom :as ratom])))

(defn dissoc-in
  "Dissociates an entry from a nested associative structure returning a new
  nested structure. keys is a sequence of keys. Any empty maps that result
  will not be present in the new structure.
  The key thing is that 'm' remains identical? to istelf if the path was never present"
  [m [k & ks :as keys]]
  (if ks
    (if-let [nextmap (get m k)]
      (let [newmap (dissoc-in nextmap ks)]
        (if (seq newmap)
          (assoc m k newmap)
          (dissoc m k)))
      m)
    (dissoc m k)))

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
