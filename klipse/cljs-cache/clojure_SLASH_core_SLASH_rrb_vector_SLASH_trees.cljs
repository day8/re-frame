(ns clojure.core.rrb-vector.trees
  (:refer-clojure :exclude [array-for push-tail pop-tail new-path do-assoc])
  (:require [clojure.core.rrb-vector.nodes
             :refer [regular? clone ranges last-range]]))

(defn tail-offset [cnt tail]
  (- cnt (alength tail)))

(defn array-for [cnt shift root tail i]
  (if (and (<= 0 i) (< i cnt))
    (if (>= i (tail-offset cnt tail))
      tail
      (loop [i i node root shift shift]
        (if (zero? shift)
          (.-arr node)
          (if (regular? node)
            (loop [node  (aget (.-arr node)
                               (bit-and (bit-shift-right i shift) 0x1f))
                   shift (- shift 5)]
              (if (zero? shift)
                (.-arr node)
                (recur (aget (.-arr node)
                             (bit-and (bit-shift-right i shift) 0x1f))
                       (- shift 5))))
            (let [rngs (ranges node)
                  j    (loop [j (bit-and (bit-shift-right i shift) 0x1f)]
                         (if (< i (aget rngs j))
                           j
                           (recur (inc j))))
                  i    (if (pos? j)
                         (- i (aget rngs (dec j)))
                         i)]
              (recur i
                     (aget (.-arr node) j)
                     (- shift 5)))))))
    (vector-index-out-of-bounds i cnt)))

(defn new-path [tail edit shift current-node]
  (if (== (alength tail) 32)
    (loop [s 0 n current-node]
      (if (== s shift)
        n
        (let [arr (make-array 32)
              ret (->VectorNode edit arr)]
          (aset arr 0 n)
          (recur (+ s 5) ret))))
    (loop [s 0 n current-node]
      (if (== s shift)
        n
        (let [arr  (make-array 33)
              rngs (make-array 33)
              ret  (->VectorNode edit arr)]
          (aset arr 0 n)
          (aset arr 32 rngs)
          (aset rngs 32 1)
          (aset rngs 0 (alength tail))
          (recur (+ s 5) ret))))))

(defn push-tail [shift cnt root-edit current-node tail-node]
  (if (regular? current-node)
    (let [arr (aclone (.-arr current-node))
          ret (->VectorNode (.-edit current-node) arr)]
      (loop [n ret shift shift]
        (let [arr    (.-arr n)
              subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)]
          (if (== shift 5)
            (aset arr subidx tail-node)
            (if-let [child (aget arr subidx)]
              (let [new-carr  (aclone (.-arr child))
                    new-child (->VectorNode root-edit new-carr)]
                (aset arr subidx new-child)
                (recur new-child (- shift 5)))
              (aset arr subidx
                    (new-path (.-arr tail-node)
                              root-edit
                              (- shift 5)
                              tail-node))))))
      ret)
    (let [arr  (aclone (.-arr current-node))
          rngs (ranges current-node)
          li   (dec (aget rngs 32))
          ret  (->VectorNode (.-edit current-node) arr)
          cret (if (== shift 5)
                 nil
                 (let [child (aget arr li)
                       ccnt  (if (pos? li)
                               (- (aget rngs li) (aget rngs (dec li)))
                               (aget rngs 0))]
                   (if-not (== ccnt (bit-shift-left 1 shift))
                     (push-tail (- shift 5) (inc ccnt) root-edit
                                child
                                tail-node))))]
      (if cret
        (do (aset arr li cret)
            (aset rngs li (+ (aget rngs li) 32))
            ret)
        (do (aset arr (inc li)
                  (new-path (.-arr tail-node)
                            root-edit
                            (- shift 5)
                            tail-node))
            (aset rngs (inc li) (+ (aget rngs li) 32))
            (aset rngs 32 (inc (aget rngs 32)))
            ret)))))

(defn pop-tail [shift cnt root-edit current-node]
  (if (regular? current-node)
    (let [subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)]
      (cond
        (> shift 5)
        (let [new-child (pop-tail (- shift 5) cnt root-edit
                                  (aget (.-arr current-node) subidx))]
          (if (and (nil? new-child) (zero? subidx))
            nil
            (let [arr (aclone (.-arr current-node))]
              (aset arr subidx new-child)
              (->VectorNode root-edit arr))))

        (zero? subidx)
        nil

        :else
        (let [arr (aclone (.-arr current-node))]
          (aset arr subidx nil)
          (->VectorNode root-edit arr))))
    (let [subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)
          rngs   (ranges current-node)
          subidx (loop [subidx subidx]
                   (if (or (zero? (int (aget rngs (inc subidx))))
                           (== subidx 31))
                     subidx
                     (recur (inc subidx))))
          new-rngs (aclone rngs)]
      (cond
        (> shift 5)
        (let [child     (aget (.-arr current-node) subidx)
              child-cnt (if (zero? subidx)
                          (aget rngs 0)
                          (- (aget rngs subidx) (aget rngs (dec subidx))))
              new-child (pop-tail (- shift 5) child-cnt root-edit child)]
          (cond
            (and (nil? new-child) (zero? subidx))
            nil

            (regular? child)
            (let [arr (aclone (.-arr current-node))]
              (aset new-rngs subidx (- (aget new-rngs subidx) 32))
              (aset arr subidx new-child)
              (aset arr 32 new-rngs)
              (if (nil? new-child)
                (aset new-rngs 32 (dec (aget new-rngs 32))))
              (->VectorNode root-edit arr))

            :else
            (let [rng  (last-range child)
                  diff (- rng (if new-child (last-range new-child) 0))
                  arr  (aclone (.-arr current-node))]
              (aset new-rngs subidx (- (aget new-rngs subidx) diff))
              (aset arr subidx new-child)
              (aset arr 32 new-rngs)
              (if (nil? new-child)
                (aset new-rngs 32 (dec (aget new-rngs 32))))
              (->VectorNode root-edit arr))))

        (zero? subidx)
        nil

        :else
        (let [arr      (aclone (.-arr current-node))
              child    (aget arr subidx)
              new-rngs (aclone rngs)]
          (aset arr subidx nil)
          (aset arr 32 new-rngs)
          (aset new-rngs subidx 0)
          (aset new-rngs 32 (dec (aget new-rngs 32)))
          (->VectorNode root-edit arr))))))

(defn do-assoc [shift current-node i val]
  (if (regular? current-node)
    (let [node (clone shift current-node)]
      (loop [shift shift
             node  node]
        (if (zero? shift)
          (let [arr (.-arr node)]
            (aset arr (bit-and i 0x1f) val))
          (let [arr    (.-arr node)
                subidx (bit-and (bit-shift-right i shift) 0x1f)
                child  (clone shift (aget arr subidx))]
            (aset arr subidx child)
            (recur (- shift 5) child))))
      node)
    (let [arr    (aclone (.-arr current-node))
          rngs   (ranges current-node)
          subidx (bit-and (bit-shift-right i shift) 0x1f)
          subidx (loop [subidx subidx]
                   (if (< i (int (aget rngs subidx)))
                     subidx
                     (recur (inc subidx))))
          i      (if (zero? subidx) i (- i (aget rngs (dec subidx))))]
      (aset arr subidx
            (do-assoc (- shift 5) (aget arr subidx) i val))
      (->VectorNode (.-edit current-node) arr))))
