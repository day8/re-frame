(ns re-frame.utils
  (:require
    [re-frame.loggers :refer [console]]))

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

(defn op-id
  "Extract the id from an event or subscription query. `x` is either map or
   vector. `k` is the key of the id to look for if `x` is a map."
  {:added "1.2.0"}
  [x k]
  (cond
    (map? x)
    (get x k)

    (vector? x)
    (first x)

    :default
    (console :error "re-frame: expected a map or vector, but got: " x)))

(defn apply-kw
  "Like apply, but f takes keyword arguments and the last argument is
  not a seq but a map with the arguments for f"
  [f & args]
  {:pre [(map? (last args))]}
  (apply f (apply concat
                  (butlast args) (last args))))
