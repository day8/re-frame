(ns clojure.core.rrb-vector

  "An implementation of the confluently persistent vector data
  structure introduced in Bagwell, Rompf, \"RRB-Trees: Efficient
  Immutable Vectors\", EPFL-REPORT-169879, September, 2011.

  RRB-Trees build upon Clojure's PersistentVectors, adding logarithmic
  time concatenation and slicing.

  The main API entry points are clojure.core.rrb-vector/catvec,
  performing vector concatenation, and clojure.core.rrb-vector/subvec,
  which produces a new vector containing the appropriate subrange of
  the input vector (in contrast to cljs.core/subvec, which returns a
  view on the input vector).

  The implementation allows for seamless interoperability with
  cljs.core/PersistentVector and cljs.core.Subvec instances:
  clojure.core.rrb-vector/catvec and clojure.core.rrb-vector/subvec
  convert their inputs to clojure.core.rrb-vector.rrbt/Vector
  instances whenever necessary (this is a very fast constant time
  operation for PersistentVector; for Subvec it is O(log n), where n
  is the size of the underlying vector).

  clojure.core.rrb-vector also exports its own versions of vector and
  vec which always produce clojure.core.rrb-vector.rrbt.Vector
  instances."

  {:author "Michał Marczyk"}

  (:refer-clojure :exclude [vector vec subvec])
  (:require [clojure.core.rrb-vector.protocols :refer [-slicev -splicev]]
            [clojure.core.rrb-vector.rrbt :refer [-as-rrbt]]
            clojure.core.rrb-vector.interop)
  (:require-macros [clojure.core.rrb-vector.macros :refer [gen-vector-method]]))

(defn catvec
  "Concatenates the given vectors in logarithmic time."
  ([]
     [])
  ([v1]
     v1)
  ([v1 v2]
     (-splicev v1 v2))
  ([v1 v2 v3]
     (-splicev (-splicev v1 v2) v3))
  ([v1 v2 v3 v4]
     (-splicev (-splicev v1 v2) (-splicev v3 v4)))
  ([v1 v2 v3 v4 & vn]
     (-splicev (-splicev (-splicev v1 v2) (-splicev v3 v4))
               (apply catvec vn))))

(defn subvec
  "Returns a new vector containing the elements of the given vector v
  lying between the start (inclusive) and end (exclusive) indices in
  logarithmic time. end defaults to end of vector. The resulting
  vector shares structure with the original, but does not hold on to
  any elements of the original vector lying outside the given index
  range."
  ([v start]
     (-slicev v start (count v)))
  ([v start end]
     (-slicev v start end)))

(defn vector
  "Creates a new vector containing the args."
  ([]
     (gen-vector-method))
  ([x1]
     (gen-vector-method x1))
  ([x1 x2]
     (gen-vector-method x1 x2))
  ([x1 x2 x3]
     (gen-vector-method x1 x2 x3))
  ([x1 x2 x3 x4]
     (gen-vector-method x1 x2 x3 x4))
  ([x1 x2 x3 x4 & xn]
     (into (vector x1 x2 x3 x4) xn)
     #_
     (loop [v  (vector x1 x2 x3 x4)
            xn xn]
       (if xn
         (recur (-conj ^not-native v (first xn))
                (next xn))
         v))))

(defn vec
  "Returns a vector containing the contents of coll.

  If coll is a vector, returns an RRB vector using the internal tree
  of coll."
  [coll]
  (if (vector? coll)
    (-as-rrbt coll)
    (apply vector coll)))
