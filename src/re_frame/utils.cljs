(ns re-frame.utils
  (:require
    [re-frame.loggers :refer [console]]))


(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (console :error "re-frame: expected a vector, but got: " v)))

