(ns clojure.core.rrb-vector.protocols)

(defprotocol PSpliceableVector
  (-splicev [v1 v2]))

(defprotocol PSliceableVector
  (-slicev [v start end]))
