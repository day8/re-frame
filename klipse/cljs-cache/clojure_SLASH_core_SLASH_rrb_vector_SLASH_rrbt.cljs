(ns clojure.core.rrb-vector.rrbt
  (:refer-clojure :exclude [array-for push-tail pop-tail new-path do-assoc])
  (:require [clojure.core.rrb-vector.protocols
             :refer [PSliceableVector -slicev
                     PSpliceableVector -splicev]]
            [clojure.core.rrb-vector.nodes
             :refer [regular? empty-node ranges overflow? last-range
                     regular-ranges first-child last-child remove-leftmost-child
                     replace-leftmost-child replace-rightmost-child
                     fold-tail new-path* index-of-nil]]
            [clojure.core.rrb-vector.trees
             :refer [tail-offset array-for push-tail pop-tail new-path
                     do-assoc]]
            [clojure.core.rrb-vector.transients
             :refer [ensure-editable editable-root editable-tail push-tail!
                     pop-tail! do-assoc!]]))

(def ^:const rrbt-concat-threshold 33)
(def ^:const max-extra-search-steps 2)

(defprotocol AsRRBT
  (-as-rrbt [v]))

;;; chunked seqs: can't reuse cljs.core's without tweaks, since rrb
;;; vectors have a different array-for

(declare rrb-chunked-seq)

(deftype RRBChunkedSeq [vec node i off meta ^:mutable __hash]
  Object
  (toString [coll]
    (pr-str* coll))

  IPrintWithWriter
  (-pr-writer [this writer opts]
    (pr-sequential-writer writer pr-writer "(" " " ")" opts this))

  IWithMeta
  (-with-meta [coll m]
    (rrb-chunked-seq vec node i off m))

  IMeta
  (-meta [coll] meta)

  ISeqable
  (-seq [coll] coll)

  ISequential
  IEquiv
  (-equiv [coll other] (equiv-sequential coll other))

  ASeq
  ISeq
  (-first [coll]
    (aget node off))

  (-rest [coll]
    (if (< (inc off) (alength node))
      (let [s (rrb-chunked-seq vec node i (inc off))]
        (if (nil? s)
          ()
          s))
      (-chunked-rest coll)))

  INext
  (-next [coll]
    (if (< (inc off) (alength node))
      (let [s (rrb-chunked-seq vec node i (inc off))]
        (if (nil? s)
          nil
          s))
      (-chunked-next coll)))

  ICollection
  (-conj [coll o]
    (cons o coll))

  IEmptyableCollection
  (-empty [coll]
    (with-meta cljs.core.List.EMPTY meta))

  IChunkedSeq
  (-chunked-first [coll]
    (array-chunk node off))

  (-chunked-rest [coll]
    (let [l (alength node)
          s (when (< (+ i l) (-count vec))
              (rrb-chunked-seq vec (+ i l) 0))]
      (if (nil? s)
        ()
        s)))

  IChunkedNext
  (-chunked-next [coll]
    (let [l (alength node)
          s (when (< (+ i l) (-count vec))
              (rrb-chunked-seq vec (+ i l) 0))]
      (if (nil? s)
        nil
        s)))

  IHash
  (-hash [coll] (caching-hash coll hash-coll __hash))

  IReduce
  (-reduce [coll f]
    (ci-reduce (cljs.core/subvec vec (+ i off) (count vec)) f))

  (-reduce [coll f start]
    (ci-reduce (cljs.core/subvec vec (+ i off) (count vec)) f start)))

(defn rrb-chunked-seq
  ([vec i off]
     (let [cnt   (.-cnt vec)
           shift (.-shift vec)
           root  (.-root vec)
           tail  (.-tail vec)]
       (RRBChunkedSeq. vec (array-for cnt shift root tail i) i off nil nil)))
  ([vec node i off]
     (RRBChunkedSeq. vec node i off nil nil))
  ([vec node i off meta]
     (RRBChunkedSeq. vec node i off meta nil)))

(defn slice-right [node shift end]
  (if (zero? shift)
    ;; potentially return a short node, although it would be better to
    ;; make sure a regular leaf is always left at the right, with any
    ;; items over the final 32 moved into tail (and then potentially
    ;; back into the tree should the tail become too long...)
    (let [arr     (.-arr node)
          new-arr (make-array end)]
      (array-copy arr 0 new-arr 0 end)
      (->VectorNode nil new-arr))
    (let [reg? (regular? node)
          rngs (if-not reg? (ranges node))
          i    (bit-and (bit-shift-right (dec end) shift) 0x1f)
          i    (if reg?
                 i
                 (loop [j i]
                   (if (<= end (aget rngs j))
                     j
                     (recur (inc j)))))
          child-end (if reg?
                      (let [ce (mod end (bit-shift-left 1 shift))]
                        (if (zero? ce) (bit-shift-left 1 shift) ce))
                      (if (pos? i)
                        (- end (aget rngs (dec i)))
                        end))
          arr       (.-arr node)
          new-child (slice-right (aget arr i) (- shift 5) child-end)
          regular-child? (if (== shift 5)
                           (== 32 (alength (.-arr new-child)))
                           (regular? new-child))
          new-arr   (make-array (if (and reg? regular-child?) 32 33))
          new-child-rng  (if regular-child?
                           (let [m (mod child-end (bit-shift-left 1 shift))]
                             (if (zero? m) (bit-shift-left 1 shift) m))
                           (if (== shift 5)
                             (alength (.-arr new-child))
                             (last-range new-child)))]
      (array-copy arr 0 new-arr 0 i)
      (aset new-arr i new-child)
      (if-not (and reg? regular-child?)
        (let [new-rngs (make-array 33)
              step     (bit-shift-left 1 shift)]
          (if reg?
            (dotimes [j i]
              (aset new-rngs j (* (inc j) step)))
            (dotimes [j i]
              (aset new-rngs j (aget rngs j))))
          (aset new-rngs i (+ (if (pos? i) (aget new-rngs (dec i)) 0)
                              new-child-rng))
          (aset new-rngs 32 (inc i))
          (aset new-arr 32 new-rngs)))
      (->VectorNode nil new-arr))))

(defn slice-left [node shift start end]
  (if (zero? shift)
    ;; potentially return a short node
    (let [arr     (.-arr node)
          new-len (- (alength arr) start)
          new-arr (make-array new-len)]
      (array-copy arr start new-arr 0 new-len)
      (->VectorNode nil new-arr))
    (let [reg? (regular? node)
          arr  (.-arr node)
          rngs (if-not reg? (ranges node))
          i    (bit-and (bit-shift-right start shift) 0x1f)
          i    (if reg?
                 i
                 (loop [j i]
                   (if (< start (aget rngs j))
                     j
                     (recur (inc j)))))
          len  (if reg?
                 (loop [i i]
                   (if (or (== i 32) (nil? (aget arr i)))
                     i
                     (recur (inc i))))
                 (aget rngs 32))
          child-start (if (pos? i)
                        (- start
                           (if reg?
                             (* i (bit-shift-left 1 shift))
                             (aget rngs (dec i))))
                        start)
          child-end   (min (bit-shift-left 1 shift)
                           (if (pos? i)
                             (- end
                                (if reg?
                                  (* i (bit-shift-left 1 shift))
                                  (aget rngs (dec i))))
                             end))
          new-child   (slice-left (aget arr i)
                                  (- shift 5)
                                  child-start
                                  child-end)
          new-len     (- len i)
          new-len     (if (nil? new-child) (dec new-len) new-len)]
      (cond
        (zero? new-len)
        nil

        reg?
        (let [new-arr (make-array 33)
              rngs    (make-array 33)
              rng0    (if (or (nil? new-child)
                              (== shift 5)
                              (regular? new-child))
                        (- (bit-shift-left 1 shift)
                           (bit-and (bit-shift-right start (- shift 5)) 0x1f))
                        (last-range new-child))
              step    (bit-shift-left 1 shift)]
          (loop [j 0
                 r rng0]
            (when (< j new-len)
              (aset rngs j r)
              (recur (inc j) (+ r step))))
          (aset rngs (dec new-len) (- end start))
          (aset rngs 32 new-len)
          (array-copy arr (if (nil? new-child) (inc i) i)
                      new-arr 0
                      new-len)
          (if-not (nil? new-child)
            (aset new-arr 0 new-child))
          (aset new-arr 32 rngs)
          (->VectorNode (.-edit node) new-arr))

        :else
        (let [new-arr  (make-array 33)
              new-rngs (make-array 33)]
          (loop [j 0 i i]
            (when (< j new-len)
              (aset new-rngs j (- (aget rngs i) start))
              (recur (inc j) (inc i))))
          (aset new-rngs 32 new-len)
          (array-copy arr (if (nil? new-child) (inc i) i)
                      new-arr 0
                      new-len)
          (if-not (nil? new-child)
            (aset new-arr 0 new-child))
          (aset new-arr 32 new-rngs)
          (->VectorNode (.-edit node) new-arr))))))

(declare splice-rrbts ->Transient)

(deftype Vector [cnt shift root tail meta ^:mutable __hash]
  Object
  (toString [this]
    (pr-str* this))

  IPrintWithWriter
  (-pr-writer [this writer opts]
    (pr-sequential-writer writer pr-writer "[" " " "]" opts this))

  IWithMeta
  (-with-meta [this meta]
    (Vector. cnt shift root tail meta __hash))

  IMeta
  (-meta [this]
    meta)

  ISequential
  IEquiv
  (-equiv [this that]
    (equiv-sequential this that))

  IHash
  (-hash [this]
    (caching-hash this hash-coll __hash))

  ISeqable
  (-seq [this]
    (cond
      (zero? cnt) nil
      (zero? (tail-offset cnt tail)) (array-seq tail)
      :else (rrb-chunked-seq this 0 0)))

  ICounted
  (-count [_]
    cnt)

  IIndexed
  (-nth [this i]
    (if (and (<= 0 i) (< i cnt))
      (let [tail-off (- cnt (alength tail))]
        (if (<= tail-off i)
          (aget tail (- i tail-off))
          (loop [i i node root shift shift]
            (if (zero? shift)
              (let [arr (.-arr node)]
                (aget arr (bit-and (bit-shift-right i shift) 0x1f)))
              (if (regular? node)
                (let [arr (.-arr node)
                      idx (bit-and (bit-shift-right i shift) 0x1f)]
                  (loop [i     i
                         node  (aget arr idx)
                         shift (- shift 5)]
                    (let [arr (.-arr node)
                          idx (bit-and (bit-shift-right i shift) 0x1f)]
                      (if (zero? shift)
                        (aget arr idx)
                        (recur i (aget arr idx) (- shift 5))))))
                (let [arr  (.-arr node)
                      rngs (ranges node)
                      idx  (loop [j (bit-and (bit-shift-right i shift) 0x1f)]
                             (if (< i (aget rngs j))
                               j
                               (recur (inc j))))
                      i    (if (zero? idx)
                             i
                             (- i (aget rngs (dec idx))))]
                  (recur i (aget arr idx) (- shift 5))))))))
      (vector-index-out-of-bounds i cnt)))

  (-nth [this i not-found]
    (if (and (>= i 0) (< i cnt))
      (-nth this i)
      not-found))

  IMapEntry
  (-key [this]
    (-nth this 0))

  (-val [this]
    (-nth this 1))

  ICollection
  (-conj [this val]
    (if (< (alength tail) 32)
      (let [tail-len (alength tail)
            new-tail (make-array (inc tail-len))]
        (array-copy tail 0 new-tail 0 tail-len)
        (aset new-tail tail-len val)
        (Vector. (inc cnt) shift root new-tail meta nil))
      (let [tail-node (->VectorNode (.-edit root) tail)
            new-tail  (let [new-arr (make-array 1)]
                        (aset new-arr 0 val)
                        new-arr)]
        (if (overflow? root shift cnt)
          (if (regular? root)
            (let [new-arr  (make-array 32)
                  new-root (->VectorNode (.-edit root) new-arr)]
              (doto new-arr
                (aset 0 root)
                (aset 1 (new-path tail (.-edit root) shift tail-node)))
              (Vector. (inc cnt) (+ shift 5) new-root new-tail meta nil))
            (let [new-arr  (make-array 33)
                  new-rngs (make-array 33)
                  new-root (->VectorNode (.-edit root) new-arr)
                  root-total-range (aget (ranges root) 31)]
              (doto new-arr
                (aset 0  root)
                (aset 1  (new-path tail (.-edit root) shift tail-node))
                (aset 32 new-rngs))
              (doto new-rngs
                (aset 0  root-total-range)
                (aset 1  (+ root-total-range 32))
                (aset 32 2))
              (Vector. (inc cnt) (+ shift 5) new-root new-tail meta nil)))
          (Vector. (inc cnt) shift
                   (push-tail shift cnt (.-edit root) root tail-node)
                   new-tail
                   meta
                   nil)))))

  IEmptyableCollection
  (-empty [_]
    (with-meta cljs.core.PersistentVector.EMPTY meta))

  IStack
  (-peek [this]
    (when (pos? cnt)
      (-nth this (dec cnt))))

  (-pop [this]
    (cond
      (zero? cnt)
      (throw (js/Error. "Can't pop empty vector"))

      (== 1 cnt)
      (-with-meta cljs.core.PersistentVector.EMPTY meta)

      (> (alength tail) 1)
      (let [new-tail (make-array (dec (alength tail)))]
        (array-copy tail 0 new-tail 0 (alength new-tail))
        (Vector. (dec cnt) shift root new-tail meta nil))

      :else
      (let [new-tail (array-for cnt shift root tail (- cnt 2))
            root-cnt (tail-offset cnt tail)
            new-root (pop-tail shift root-cnt (.-edit root) root)]
        (cond
          (nil? new-root)
          (Vector. (dec cnt) shift empty-node new-tail meta nil)

          (and (> shift 5)
               (nil? (aget (.-arr new-root) 1)))
          (Vector. (dec cnt)
                   (- shift 5)
                   (aget (.-arr new-root) 0)
                   new-tail
                   meta
                   nil)

          :else
          (Vector. (dec cnt) shift new-root new-tail meta nil)))))

  IVector
  (-assoc-n [this i val]
    (cond
      (and (<= 0 i) (< i cnt))
      (let [tail-off (tail-offset cnt tail)]
        (if (>= i tail-off)
          (let [new-tail (make-array (alength tail))
                idx (- i tail-off)]
            (array-copy tail 0 new-tail 0 (alength tail))
            (aset new-tail idx val)
            (Vector. cnt shift root new-tail meta nil))
          (Vector. cnt shift (do-assoc shift root i val) tail meta nil)))

      (== i cnt) (-conj this val)
      :else (vector-index-out-of-bounds i cnt)))

  IReversible
  (-rseq [this]
    (if (pos? cnt)
      (RSeq. this (dec cnt) nil)
      nil))

  IAssociative
  (-assoc [this k v]
    (-assoc-n this k v))

  ILookup
  (-lookup [this k]
    (-nth this k nil))

  (-lookup [this k not-found]
    (-nth this k not-found))

  IFn
  (-invoke [this k]
    (-nth this k))

  (-invoke [this k not-found]
    (-nth this k not-found))

  IReduce
  (-reduce [this f]
    (ci-reduce this f))

  (-reduce [this f start]
    (ci-reduce this f start))

  IKVReduce
  (-kv-reduce [this f init]
    (loop [i    0
           j    0
           init init
           arr  (array-for cnt shift root tail i)
           lim  (dec (alength arr))
           step (inc lim)]
      (let [init (f init (+ i j) (aget arr j))]
        (if (reduced? init)
          @init
          (if (< j lim)
            (recur i (inc j) init arr lim step)
            (let [i (+ i step)]
              (if (< i cnt)
                (let [arr (array-for cnt shift root tail i)
                      len (alength arr)
                      lim (dec len)]
                  (recur i 0 init arr lim len))
                init)))))))

  IComparable
  (-compare [this that]
    (compare-indexed this that))

  IEditableCollection
  (-as-transient [this]
    (->Transient cnt
                 shift
                 (editable-root root)
                 (editable-tail tail)
                 (alength tail)))

  PSliceableVector
  (-slicev [this start end]
    (let [new-cnt (- end start)]
      (cond
        (or (neg? start) (> end cnt))
        (throw (js/Error. "vector index out of bounds"))

        (== start end)
        ;; NB. preserves metadata
        (empty this)

        (> start end)
        (throw (js/Error. "start index greater than end index"))

        :else
        (let [tail-off (tail-offset cnt tail)]
          (if (>= start tail-off)
            (let [new-tail (make-array new-cnt)]
              (array-copy tail (- start tail-off)
                          new-tail 0
                          new-cnt)
              (Vector. new-cnt 5 empty-node new-tail meta nil))
            (let [tail-cut? (> end tail-off)
                  new-root  (if tail-cut?
                              root
                              (slice-right root shift end))
                  new-root  (if (zero? start)
                              new-root
                              (slice-left new-root shift start
                                          (min end tail-off)))
                  new-tail  (if tail-cut?
                              (let [new-len  (- end tail-off)
                                    new-tail (make-array new-len)]
                                (array-copy tail 0 new-tail 0 new-len)
                                new-tail)
                              (array-for new-cnt shift new-root (array)
                                         (dec new-cnt)))
                  new-root  (if tail-cut?
                              new-root
                              (pop-tail shift new-cnt (.-edit new-root)
                                        new-root))]
              (if (nil? new-root)
                (Vector. new-cnt 5 empty-node new-tail meta nil)
                (loop [r new-root
                       s shift]
                  (if (and (> s 5)
                           (nil? (aget (.-arr r) 1)))
                    (recur (aget (.-arr r) 0) (- s 5))
                    (Vector. new-cnt s r new-tail meta nil))))))))))

  PSpliceableVector
  (-splicev [this that]
    (splice-rrbts this (-as-rrbt that)))

  AsRRBT
  (-as-rrbt [this]
    this))

(extend-protocol AsRRBT
  cljs.core.PersistentVector
  (-as-rrbt [this]
    (Vector. (count this) (.-shift this) (.-root this) (.-tail this)
             (meta this) nil))

  Subvec
  (-as-rrbt [this]
    (let [v     (.-v this)
          start (.-start this)
          end   (.-end this)]
      (-slicev (-as-rrbt v) start end))))

(defn shift-from-to [node from to]
  (cond
    (== from to)
    node

    (regular? node)
    (recur (->VectorNode (.-edit node) (doto (make-array 32) (aset 0 node)))
           (+ 5 from)
           to)

    :else
    (recur (->VectorNode (.-edit node)
                         (doto (make-array 33)
                           (aset 0 node)
                           (aset 32
                                 (doto (make-array 33)
                                   (aset 0  (last-range node))
                                   (aset 32 1)))))
           (+ 5 from)
           to)))

(defn slot-count [node shift]
  (let [arr (.-arr node)]
    (if (zero? shift)
      (alength arr)
      (if (regular? node)
        (index-of-nil arr)
        (let [rngs (ranges node)]
          (aget rngs 32))))))

(defn subtree-branch-count [node shift]
  ;; NB. positive shifts only
  (let [arr (.-arr node)
        cs  (- shift 5)]
    (if (regular? node)
      (loop [i 0 sbc 0]
        (if (== i 32)
          sbc
          (if-let [child (aget arr i)]
            (recur (inc i) (+ sbc (slot-count child cs)))
            sbc)))
      (let [lim (aget (ranges node) 32)]
        (loop [i 0 sbc 0]
          (if (== i lim)
            sbc
            (let [child (aget arr i)]
              (recur (inc i) (+ sbc (slot-count child cs))))))))))

(defn leaf-seq [arr]
  (mapcat #(.-arr %) (take (index-of-nil arr) arr)))

(defn rebalance-leaves
  [n1 cnt1 n2 cnt2 transferred-leaves]
  (let [slc1 (slot-count n1 5)
        slc2 (slot-count n2 5)
        a    (+ slc1 slc2)
        sbc1 (subtree-branch-count n1 5)
        sbc2 (subtree-branch-count n2 5)
        p    (+ sbc1 sbc2)
        e    (- a (inc (quot (dec p) 32)))]
    (cond
      (<= e max-extra-search-steps)
      (array n1 n2)

      (<= (+ sbc1 sbc2) 1024)
      (let [reg?    (zero? (mod p 32))
            new-arr (make-array (if reg? 32 33))
            new-n1  (->VectorNode nil new-arr)]
        (loop [i  0
               bs (partition-all 32
                                 (concat (leaf-seq (.-arr n1))
                                         (leaf-seq (.-arr n2))))]
          (when-first [block bs]
            (let [a (make-array (count block))]
              (loop [i 0 xs (seq block)]
                (when xs
                  (aset a i (first xs))
                  (recur (inc i) (next xs))))
              (aset new-arr i (->VectorNode nil a))
              (recur (inc i) (next bs)))))
        (if-not reg?
          (aset new-arr 32 (regular-ranges 5 p)))
        (set! (.-val transferred-leaves) sbc2)
        (array new-n1 nil))

      :else
      (let [reg?     (zero? (mod p 32))
            new-arr1 (make-array 32)
            new-arr2 (make-array (if reg? 32 33))
            new-n1   (->VectorNode nil new-arr1)
            new-n2   (->VectorNode nil new-arr2)]
        (loop [i  0
               bs (partition-all 32
                                 (concat (leaf-seq (make-array n1))
                                         (leaf-seq (make-array n2))))]
          (when-first [block bs]
            (let [a (make-array (count block))]
              (loop [i 0 xs (seq block)]
                (when xs
                  (aset a i (first xs))
                  (recur (inc i) (next xs))))
              (if (< i 32)
                (aset new-arr1 i (->VectorNode nil a))
                (aset new-arr2 (- i 32) (->VectorNode nil a)))
              (recur (inc i) (next bs)))))
        (if-not reg?
          (aset new-arr2 32 (regular-ranges 5 (- p 1024))))
        (set! (.-val transferred-leaves) (- 1024 sbc1))
        (array new-n1 new-n2)))))

(defn child-seq [node shift cnt]
  (let [arr  (.-arr node)
        rngs (if (regular? node)
               (regular-ranges shift cnt)
               (ranges node))
        cs   (if rngs (aget rngs 32) (index-of-nil arr))
        cseq (fn cseq [c r]
               (let [arr  (.-arr c)
                     rngs (if (regular? c)
                            (regular-ranges (- shift 5) r)
                            (ranges c))
                     gcs  (if rngs (aget rngs 32) (index-of-nil arr))]
                 (map list
                      (take gcs arr)
                      (take gcs (map - rngs (cons 0 rngs))))))]
    (mapcat cseq (take cs arr) (take cs (map - rngs (cons 0 rngs))))))

(defn rebalance
  [shift n1 cnt1 n2 cnt2 transferred-leaves]
  (if (nil? n2)
    (array n1 nil)
    (let [slc1 (slot-count n1 shift)
          slc2 (slot-count n2 shift)
          a    (+ slc1 slc2)
          sbc1 (subtree-branch-count n1 shift)
          sbc2 (subtree-branch-count n2 shift)
          p    (+ sbc1 sbc2)
          e    (- a (inc (quot (dec p) 32)))]
      (cond
        (<= e max-extra-search-steps)
        (array n1 n2)

        (<= (+ sbc1 sbc2) 1024)
        (let [new-arr  (make-array 33)
              new-rngs (make-array 33)
              new-n1   (->VectorNode nil new-arr)]
          (loop [i  0
                 bs (partition-all 32
                                   (concat (child-seq n1 shift cnt1)
                                           (child-seq n2 shift cnt2)))]
            (when-first [block bs]
              (let [a (make-array 33)
                    r (make-array 33)]
                (aset a 32 r)
                (aset r 32 (count block))
                (loop [i 0 o 0 gcs (seq block)]
                  (when-first [[gc gcr] gcs]
                    (aset a i gc)
                    (aset r i (+ o gcr))
                    (recur (inc i) (+ o gcr) (next gcs))))
                (aset new-arr i (->VectorNode nil a))
                (aset new-rngs i
                      (+ (aget r (dec (aget r 32)))
                         (if (pos? i) (aget new-rngs (dec i)) 0)))
                (aset new-rngs 32 (inc i))
                (recur (inc i) (next bs)))))
          (aset new-arr 32 new-rngs)
          (set! (.-val transferred-leaves) cnt2)
          (array new-n1 nil))

        :else
        (let [new-arr1  (make-array 33)
              new-arr2  (make-array 33)
              new-rngs1 (make-array 33)
              new-rngs2 (make-array 33)
              new-n1    (->VectorNode nil new-arr1)
              new-n2    (->VectorNode nil new-arr2)]
          (loop [i  0
                 bs (partition-all 32
                                   (concat (child-seq n1 shift cnt1)
                                           (child-seq n2 shift cnt2)))]
            (when-first [block bs]
              (let [a (make-array 33)
                    r (make-array 33)]
                (aset a 32 r)
                (aset r 32 (count block))
                (loop [i 0 o 0 gcs (seq block)]
                  (when-first [[gc gcr] gcs]
                    (aset a i gc)
                    (aset r i (+ o gcr))
                    (recur (inc i) (+ o gcr) (next gcs))))
                (if (and (< i 32) (> (+ (* i 32) (count block)) sbc1))
                  (let [tbs (- (+ (* i 32) (count block)) sbc1)
                        li  (dec (aget r 32))
                        d   (if (>= tbs 32)
                              (aget r li)
                              (- (aget r li) (aget r (- li tbs))))]
                    (set! (.-val transferred-leaves)
                          (+ (.-val transferred-leaves) d))))
                (let [new-arr  (if (< i 32) new-arr1 new-arr2)
                      new-rngs (if (< i 32) new-rngs1 new-rngs2)
                      i        (mod i 32)]
                  (aset new-arr i (->VectorNode nil a))
                  (aset new-rngs i
                        (+ (aget r (dec (aget r 32)))
                           (if (pos? i) (aget new-rngs (dec i)) 0)))
                  (aset new-rngs 32 (inc i)))
                (recur (inc i) (next bs)))))
          (aset new-arr1 32 new-rngs1)
          (aset new-arr2 32 new-rngs2)
          (array new-n1 new-n2))))))

(defn zippath
  [shift n1 cnt1 n2 cnt2 transferred-leaves]
  (if (== shift 5)
    (rebalance-leaves n1 cnt1 n2 cnt2 transferred-leaves)
    (let [c1 (last-child n1)
          c2 (first-child n2)
          ccnt1 (if (regular? n1)
                  (let [m (mod cnt1 (bit-shift-left 1 shift))]
                    (if (zero? m) (bit-shift-left 1 shift) m))
                  (let [rngs (ranges n1)
                        i    (dec (aget rngs 32))]
                    (if (zero? i)
                      (aget rngs 0)
                      (- (aget rngs i) (aget rngs (dec i))))))
          ccnt2 (if (regular? n2)
                  (let [m (mod cnt2 (bit-shift-left 1 shift))]
                    (if (zero? m) (bit-shift-left 1 shift) m))
                  (aget (ranges n2) 0))
          next-transferred-leaves (Box. 0)
          [new-c1 new-c2] (zippath (- shift 5) c1 ccnt1 c2 ccnt2
                                   next-transferred-leaves)
          d (.-val next-transferred-leaves)]
      (set! (.-val transferred-leaves) (+ (.-val transferred-leaves) d))
      (rebalance shift
                 (if (identical? c1 new-c1)
                   n1
                   (replace-rightmost-child shift n1 new-c1 d))
                 (+ cnt1 d)
                 (if new-c2
                   (if (identical? c2 new-c2)
                     n2
                     (replace-leftmost-child shift n2 cnt2 new-c2 d))
                   (remove-leftmost-child shift n2))
                 (- cnt2 d)
                 transferred-leaves))))

(defn squash-nodes [shift n1 cnt1 n2 cnt2]
  (let [arr1  (.-arr n1)
        arr2  (.-arr n2)
        li1   (index-of-nil arr1)
        li2   (index-of-nil arr2)
        slots (concat (take li1 arr1) (take li2 arr2))]
    (if (> (count slots) 32)
      (array n1 n2)
      (let [new-rngs (make-array 33)
            new-arr  (make-array 33)
            rngs1    (take li1 (if (regular? n1)
                                 (regular-ranges shift cnt1)
                                 (ranges n1)))
            rngs2    (take li2 (if (regular? n2)
                                 (regular-ranges shift cnt2)
                                 (ranges n2)))
            rngs2    (let [r (last rngs1)]
                       (map #(+ % r) rngs2))
            rngs     (concat rngs1 rngs2)]
        (aset new-arr 32 new-rngs)
        (loop [i 0 cs (seq slots)]
          (when cs
            (aset new-arr i (first cs))
            (recur (inc i) (next cs))))
        (loop [i 0 rngs (seq rngs)]
          (if rngs
            (do (aset new-rngs i (first rngs))
                (recur (inc i) (next rngs)))
            (aset new-rngs 32 i)))
        (array (->VectorNode nil new-arr) nil)))))

(defn splice-rrbts [v1 v2]
  (cond
    (zero? (count v1)) v2
    (< (count v2) rrbt-concat-threshold) (into v1 v2)
    :else
    (let [s1 (.-shift v1)
          s2 (.-shift v2)
          r1 (.-root v1)
          o? (overflow? r1 s1 (+ (count v1) (- 32 (alength (.-tail v1)))))
          r1 (if o?
               (let [tail      (.-tail v1)
                     tail-node (->VectorNode nil tail)
                     reg?      (and (regular? r1) (== (alength tail) 32))
                     arr       (make-array (if reg? 32 33))]
                 (aset arr 0 r1)
                 (aset arr 1 (new-path* s1 tail-node))
                 (if-not reg?
                   (let [rngs (make-array 33)]
                     (aset rngs 32 2)
                     (aset rngs 0 (- (count v1) (alength tail)))
                     (aset rngs 1 (count v1))
                     (aset arr 32 rngs)))
                 (->VectorNode nil arr))
               (fold-tail r1 s1
                          (tail-offset (.-cnt v1) (.-tail v1))
                          (.-tail v1)))
          s1 (if o? (+ s1 5) s1)
          r2 (.-root v2)
          s  (max s1 s2)
          r1 (shift-from-to r1 s1 s)
          r2 (shift-from-to r2 s2 s)
          transferred-leaves (Box. 0)
          [n1 n2] (zippath s
                           r1 (count v1)
                           r2 (- (count v2) (alength (.-tail v2)))
                           transferred-leaves)
          d (.-val transferred-leaves)
          ncnt1   (+ (count v1) d)
          ncnt2   (- (count v2) (alength (.-tail v2)) d)
          [n1 n2] (if (identical? n2 r2)
                    (squash-nodes s n1 ncnt1 n2 ncnt2)
                    (array n1 n2))
          ncnt1   (if n2
                    ncnt1
                    (+ ncnt1 ncnt2))
          ncnt2   (if n2
                    ncnt2
                    0)]
      (if n2
        (let [arr      (make-array 33)
              new-root (->VectorNode nil arr)]
          (aset arr 0 n1)
          (aset arr 1 n2)
          (aset arr 32 (doto (make-array 33)
                         (aset 0 ncnt1)
                         (aset 1 (+ ncnt1 ncnt2))
                         (aset 32 2)))
          (Vector. (+ (count v1) (count v2)) (+ s 5) new-root (.-tail v2)
                   nil nil))
        (loop [r n1
               s s]
          (if (and (> s 5)
                   (nil? (aget (.-arr r) 1)))
            (recur (aget (.-arr r) 0) (- s 5))
            (Vector. (+ (count v1) (count v2)) s r (.-tail v2)
                     nil nil)))))))

(deftype Transient [^:mutable cnt
                    ^:mutable shift
                    ^:mutable root
                    ^:mutable tail
                    ^:mutable tidx]
  ITransientCollection
  (-conj! [this o]
    (if ^boolean (.-edit root)
      (if (< tidx 32)
        (do (aset tail tidx o)
            (set! cnt  (inc cnt))
            (set! tidx (inc tidx))
            this)
        (let [tail-node (->VectorNode (.-edit root) tail)
              new-tail  (make-array 32)]
          (aset new-tail 0 o)
          (set! tail new-tail)
          (set! tidx 1)
          (if (overflow? root shift cnt)
            (if (regular? root)
              (let [new-arr (make-array 32)]
                (doto new-arr
                  (aset 0 root)
                  (aset 1 (new-path tail (.-edit root) shift tail-node)))
                (set! root  (->VectorNode (.-edit root) new-arr))
                (set! shift (+ shift 5))
                (set! cnt   (inc cnt))
                this)
              (let [new-arr  (make-array 33)
                    new-rngs (make-array 33)
                    new-root (->VectorNode (.-edit root) new-arr)
                    root-total-range (aget (ranges root) 31)]
                (doto new-arr
                  (aset 0  root)
                  (aset 1  (new-path tail (.-edit root) shift tail-node))
                  (aset 32 new-rngs))
                (doto new-rngs
                  (aset 0  root-total-range)
                  (aset 1  (+ root-total-range 32))
                  (aset 32 2))
                (set! root  new-root)
                (set! shift (+ shift 5))
                (set! cnt   (inc cnt))
                this))
            (let [new-root (push-tail! shift cnt (.-edit root) root tail-node)]
              (set! root new-root)
              (set! cnt  (inc cnt))
              this))))
      (throw (js/Error. "conj! after persistent!"))))

  (-persistent! [this]
    (if ^boolean (.-edit root)
      (do (set! (.-edit root) nil)
          (let [trimmed-tail (make-array tidx)]
            (array-copy tail 0 trimmed-tail 0 tidx)
            (Vector. cnt shift root trimmed-tail nil nil)))
      (throw (js/Error. "persistent! called twice"))))

  ITransientAssociative
  (-assoc! [this key val]
    (-assoc-n! this key val))

  ITransientVector
  (-assoc-n! [this i val]
    (if ^boolean (.-edit root)
      (cond
        (and (<= 0 i) (< i cnt))
        (let [tail-off (- cnt tidx)]
          (if (<= tail-off i)
            (aset tail (- i tail-off) val)
            (set! root (do-assoc! shift (.-edit root) root i val)))
          this)

        (== i cnt) (-conj! this val)

        :else (vector-index-out-of-bounds i cnt))
      (throw (js/Error. "assoc! after persistent!"))))

  (-pop! [this]
    (if ^boolean (.-edit root)
      (cond
        (zero? cnt)
        (throw (js/Error. "Can't pop empty vector"))

        (== 1 cnt)
        (do (set! cnt  0)
            (set! tidx 0)
            (aset tail 0 nil)
            this)

        (> tidx 1)
        (do (set! cnt  (dec cnt))
            (set! tidx (dec tidx))
            (aset tail tidx nil)
            this)

        :else
        (let [new-tail-base (array-for cnt shift root tail (- cnt 2))
              new-tail      (aclone new-tail-base)
              new-tidx      (alength new-tail-base)
              new-root      (pop-tail! shift cnt (.-edit root) root)]
          (cond
            (nil? new-root)
            (do (set! cnt  (dec cnt))
                (set! root (ensure-editable (.-edit root) empty-node))
                (set! tail new-tail)
                (set! tidx new-tidx)
                this)

            (and (> shift 5)
                 (nil? (aget (.-arr new-root) 1)))
            (do (set! cnt   (dec cnt))
                (set! shift (- shift 5))
                (set! root  (aget (.-arr new-root) 0))
                (set! tail  new-tail)
                (set! tidx  new-tidx)
                this)

            :else
            (do (set! cnt  (dec cnt))
                (set! root new-root)
                (set! tail new-tail)
                (set! tidx new-tidx)
                this))))
      (throw (js/Error. "count after persistent!"))))

  ICounted
  (-count [this]
    (if ^boolean (.-edit root)
      cnt
      (throw (js/Error. "count after persistent!")))))
