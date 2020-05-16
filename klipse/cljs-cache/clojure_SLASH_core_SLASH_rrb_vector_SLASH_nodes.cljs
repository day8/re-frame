(ns clojure.core.rrb-vector.nodes
  (:refer-clojure :exclude [clone]))

;;; node ops

(def empty-node cljs.core.PersistentVector.EMPTY_NODE)

(defn clone [shift node]
  (VectorNode. (.-edit node) (aclone (.-arr node))))

(defn regular? [node]
  (not (== (alength (.-arr node)) 33)))

;;; ranges

(defn ranges [node]
  (aget (.-arr node) 32))

(defn last-range [node]
  (let [rngs (ranges node)
        i    (dec (aget rngs 32))]
    (aget rngs i)))

(defn regular-ranges [shift cnt]
  (let [step (bit-shift-left 1 shift)
        rngs (make-array 33)]
    (loop [i 0 r step]
      (if (< r cnt)
        (do (aset rngs i r)
            (recur (inc i) (+ r step)))
        (do (aset rngs i cnt)
            (aset rngs 32 (inc i))
            rngs)))))

;;; root overflow

(defn overflow? [root shift cnt]
  (if (regular? root)
    (> (bit-shift-right cnt 5)
       (bit-shift-left 1 shift))
    (let [rngs (ranges root)
          slc  (aget rngs 32)]
      (and (== slc 32)
           (or (== shift 5)
               (recur (aget (.-arr root) (dec slc))
                      (- shift 5)
                      (+ (- (aget rngs 31) (aget rngs 30)) 32)))))))

;;; find nil / 0

(defn index-of-0 [arr]
  (loop [l 0 h 31]
    (if (>= l (dec h))
      (if (zero? (int (aget arr l)))
        l
        (if (zero? (int (aget arr h)))
          h
          32))
      (let [mid (+ l (bit-shift-right (- h l) 1))]
        (if (zero? (int (aget arr mid)))
          (recur l mid)
          (recur (inc mid) h))))))

(defn index-of-nil ^long [arr]
  (loop [l 0 h 31]
    (if (>= l (dec h))
      (if (nil? (aget arr l))
        l
        (if (nil? (aget arr h))
          h
          32))
      (let [mid (+ l (bit-shift-right (- h l) 1))]
        (if (nil? (aget arr mid))
          (recur l mid)
          (recur (inc mid) h))))))

;;; children

(defn first-child [node]
  (aget (.-arr node) 0))

(defn last-child [node]
  (let [arr (.-arr node)]
    (if (regular? node)
      (aget arr (dec (index-of-nil arr)))
      (aget arr (dec (aget (ranges node) 32))))))

(defn remove-leftmost-child [shift parent]
  (let [arr (.-arr parent)]
    (if (nil? (aget arr 1))
      nil
      (let [r?      (regular? parent)
            new-arr (make-array (if r? 32 33))]
        (array-copy arr 1 new-arr 0 31)
        (if-not r?
          (let [rngs     (ranges parent)
                rng0     (aget rngs 0)
                new-rngs (make-array 33)
                lim      (aget rngs 32)]
            (array-copy rngs 1 new-rngs 0 (dec lim))
            (loop [i 0]
              (when (< i lim)
                (aset new-rngs i (- (aget new-rngs i) rng0))
                (recur (inc i))))
            (aset new-rngs 32 (dec (aget rngs 32)))
            (aset new-rngs (dec (aget rngs 32)) 0)
            (aset new-arr 32 new-rngs)))
        (->VectorNode (.-edit parent) new-arr)))))

(defn replace-leftmost-child [shift parent pcnt child d]
  (if (regular? parent)
    (let [step (bit-shift-left 1 shift)
          rng0 (- step d)
          ncnt (- pcnt d)
          li   (bit-and (bit-shift-right shift (dec pcnt)) 0x1f)
          arr      (.-arr parent)
          new-arr  (make-array 33)
          new-rngs (make-array 33)]
      (aset new-arr 0 child)
      (array-copy arr 1 new-arr 1 li)
      (aset new-arr 32 new-rngs)
      (aset new-rngs 0 rng0)
      (aset new-rngs li ncnt)
      (aset new-rngs 32 (inc li))
      (loop [i 1]
        (when (<= i li)
          (aset new-rngs i (+ (aget new-rngs (dec i)) step))
          (recur (inc i))))
      (->VectorNode nil new-arr))
    (let [new-arr  (aclone (.-arr parent))
          rngs     (ranges parent)
          new-rngs (make-array 33)
          li       (dec (aget rngs 32))]
      (aset new-rngs 32 (aget rngs 32))
      (aset new-arr 32 new-rngs)
      (aset new-arr 0 child)
      (loop [i 0]
        (when (<= i li)
          (aset new-rngs i (- (aget rngs i) d))
          (recur (inc i))))
      (->VectorNode nil new-arr))))

(defn replace-rightmost-child [shift parent child d]
  (if (regular? parent)
    (let [arr (.-arr parent)
          i   (dec (index-of-nil arr))]
      (if (regular? child)
        (let [new-arr (aclone arr)]
          (aset new-arr i child)
          (->VectorNode nil new-arr))
        (let [arr     (.-arr parent)
              new-arr (make-array 33)
              step    (bit-shift-left 1 shift)
              rngs    (make-array 33)]
          (aset rngs 32 (inc i))
          (aset new-arr 32 rngs)
          (array-copy arr 0 new-arr 0 i)
          (aset new-arr i child)
          (loop [j 0 r step]
            (when (<= j i)
              (aset rngs j r)
              (recur (inc j) (+ r step))))
          (aset rngs i (last-range child))
          (->VectorNode nil arr))))
    (let [rngs     (ranges parent)
          new-rngs (aclone rngs)
          i        (dec (aget rngs 32))
          new-arr  (aclone (.-arr parent))]
      (aset new-arr i child)
      (aset new-arr 32 new-rngs)
      (aset new-rngs i (+ (aget rngs i) d))
      (->VectorNode nil new-arr))))

;;; fold-tail

(defn new-path* [shift node]
  (let [reg? (== 32 (alength (.-arr node)))
        len  (if reg? 32 33)
        arr  (make-array len)
        rngs (if-not reg?
               (doto (make-array 33)
                 (aset 0 (alength (.-arr node)))
                 (aset 32 1)))
        ret  (->VectorNode nil arr)]
    (loop [arr arr shift shift]
      (if (== shift 5)
        (do (if-not reg?
              (aset arr 32 rngs))
            (aset arr 0 node))
        (let [a (make-array len)
              e (->VectorNode nil a)]
          (aset arr 0 e)
          (if-not reg?
            (aset arr 32 rngs))
          (recur a (- shift 5)))))
    ret))

(defn fold-tail [node shift cnt tail]
  (let [tlen     (alength tail)
        reg?     (and (regular? node) (== tlen 32))
        arr      (.-arr node)
        li       (index-of-nil arr)
        new-arr  (make-array (if reg? 32 33))
        rngs     (if-not (regular? node) (ranges node))
        cret     (if (== shift 5)
                   (->VectorNode nil tail)
                   (fold-tail (aget arr (dec li))
                              (- shift 5)
                              (if (regular? node)
                                (mod cnt (bit-shift-left 1 shift))
                                (let [li (dec (aget rngs 32))]
                                  (if (pos? li)
                                    (- (aget rngs li) (aget rngs (dec li)))
                                    (aget rngs 0))))
                              tail))
        new-rngs (if-not reg?
                   (if rngs
                     (aclone rngs)
                     (regular-ranges shift cnt)))]
    (when-not (and (or (nil? cret) (== shift 5)) (== li 32))
      (array-copy arr 0 new-arr 0 li)
      (when-not reg?
        (if (or (nil? cret) (== shift 5))
          (do (aset new-rngs li
                    (+ (if (pos? li)
                         (aget new-rngs (dec li))
                         (int 0))
                       tlen))
              (aset new-rngs 32 (inc li)))
          (do (when (pos? li)
                (aset new-rngs (dec li)
                      (+ (aget new-rngs (dec li)) tlen)))
              (aset new-rngs 32 li))))
      (if-not reg?
        (aset new-arr 32 new-rngs))
      (if (nil? cret)
        (aset new-arr li (new-path* (- shift 5) (->VectorNode nil tail)))
        (aset new-arr (if (== shift 5) li (dec li)) cret))
      (->VectorNode nil new-arr))))
