(ns clojure.core.rrb-vector.transients
  (:refer-clojure :exclude [new-path])
  (:require [clojure.core.rrb-vector.nodes
             :refer [regular? clone ranges last-range]]
            [clojure.core.rrb-vector.trees :refer [tail-offset new-path]]))

(defn ensure-editable [edit node]
  (if (identical? (.-edit node) edit)
    node
    (let [new-arr (aclone (.-arr node))]
      (if (== 33 (alength new-arr))
        (aset new-arr 32 (aclone (aget new-arr 32))))
      (VectorNode. edit new-arr))))

(defn editable-root [root]
  (VectorNode. (js-obj) (aclone (.-arr root))))

(defn editable-tail [tail]
  (let [ret (make-array 32)]
    (array-copy tail 0 ret 0 (alength tail))
    ret))

(defn push-tail! [shift cnt root-edit current-node tail-node]
  (let [ret (ensure-editable root-edit current-node)]
    (if (regular? ret)
      (do (loop [n ret shift shift]
            (let [arr    (.-arr n)
                  subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)]
              (if (== shift 5)
                (aset arr subidx tail-node)
                (let [child (aget arr subidx)]
                  (if (nil? child)
                    (aset arr subidx
                          (new-path (.-arr tail-node)
                                    root-edit
                                    (- shift 5)
                                    tail-node))
                    (let [editable-child (ensure-editable root-edit child)]
                      (aset arr subidx editable-child)
                      (recur editable-child (- shift 5))))))))
          ret)
      (let [arr  (.-arr ret)
            rngs (ranges ret)
            li   (dec (aget rngs 32))
            cret (if (== shift 5)
                   nil
                   (let [child (ensure-editable root-edit (aget arr li))
                         ccnt  (if (pos? li)
                                 (- (aget rngs li) (aget rngs (dec li)))
                                 (aget rngs 0))]
                     (if-not (== ccnt (bit-shift-left 1 shift))
                       (push-tail! (- shift 5) (inc ccnt) root-edit
                                   child
                                   tail-node))))]
        (if cret
          (do (aset arr  li cret)
              (aset rngs li (+ (aget rngs li) 32))
              ret)
          (do (aset arr (inc li)
                    (new-path (.-arr tail-node)
                              root-edit
                              (- shift 5)
                              tail-node))
              (aset rngs (inc li) (+ (aget rngs li) 32))
              (aset rngs 32 (inc (aget rngs 32)))
              ret))))))

(defn pop-tail! [shift cnt root-edit current-node]
  (let [ret (ensure-editable root-edit current-node)]
    (if (regular? ret)
      (let [subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)]
        (cond
          (> shift 5)
          (let [child (pop-tail! (- shift 5) cnt root-edit
                                 (aget (.-arr ret) subidx))]
            (if (and (nil? child) (zero? subidx))
              nil
              (let [arr (.-arr ret)]
                (aset arr subidx child)
                ret)))

          (zero? subidx)
          nil

          :else
          (let [arr (.-arr ret)]
            (aset arr subidx nil)
            ret)))
      (let [subidx (bit-and (bit-shift-right (dec cnt) shift) 0x1f)
            rngs   (ranges ret)
            subidx (loop [subidx subidx]
                     (if (or (zero? (int (aget rngs (inc subidx))))
                             (== subidx 31))
                       subidx
                       (recur (inc subidx))))]
        (cond
          (> shift 5)
          (let [child     (aget (.-arr ret) subidx)
                child-cnt (if (zero? subidx)
                            (aget rngs 0)
                            (- (aget rngs subidx) (aget rngs (dec subidx))))
                new-child (pop-tail! (- shift 5) child-cnt root-edit child)]
            (cond
              (and (nil? new-child) (zero? subidx))
              nil

              (regular? child)
              (let [arr (.-arr ret)]
                (aset rngs subidx (- (aget rngs subidx) 32))
                (aset arr  subidx new-child)
                (if (nil? new-child)
                  (aset rngs 32 (dec (aget rngs 32))))
                ret)

              :else
              (let [rng  (last-range child)
                    diff (- rng (if new-child (last-range new-child) 0))
                    arr  (.-arr ret)]
                (aset rngs subidx (- (aget rngs subidx) diff))
                (aset arr  subidx new-child)
                (if (nil? new-child)
                  (aset rngs 32 (dec (aget rngs 32))))
                ret)))

          (zero? subidx)
          nil

          :else
          (let [arr   (.-arr ret)
                child (aget arr subidx)]
            (aset arr  subidx nil)
            (aset rngs subidx 0)
            (aset rngs 32     (dec (aget rngs 32)))
            ret))))))

(defn do-assoc! [shift root-edit current-node i val]
  (let [ret (ensure-editable root-edit current-node)]
    (if (regular? ret)
      (loop [shift shift
             node  ret]
        (if (zero? shift)
          (let [arr (.-arr node)]
            (aset arr (bit-and i 0x1f) val))
          (let [arr    (.-arr node)
                subidx (bit-and (bit-shift-right i shift) 0x1f)
                child  (ensure-editable root-edit (aget arr subidx))]
            (aset arr subidx child)
            (recur (- shift 5) child))))
      (let [arr    (.-arr ret)
            rngs   (ranges ret)
            subidx (bit-and (bit-shift-right i shift) 0x1f)
            subidx (loop [subidx subidx]
                     (if (< i (int (aget rngs subidx)))
                       subidx
                       (recur (inc subidx))))
            i      (if (zero? subidx) i (- i (aget rngs (dec subidx))))]
        (aset arr subidx
              (do-assoc! (- shift 5) root-edit (aget arr subidx) i val))))
    ret))
