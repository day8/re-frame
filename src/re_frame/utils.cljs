(ns re-frame.utils
  (:require
    [re-frame.loggers :refer [error]]))


(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (error "re-frame: expected a vector, but got: " v)))

