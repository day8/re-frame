 (ns re-frame.utils)


 (defn first-in-vector
  [v]
  (assert (vector? v) (str "Expected a vector event, but got: " v))
  (first v))
