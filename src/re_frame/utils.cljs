 (ns re-frame.utils)


 (defn warn
   [& args]
   (.warn js/console (apply str args)))


 (defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (warn "re-frame: expected a vector event, but got: " v)))
