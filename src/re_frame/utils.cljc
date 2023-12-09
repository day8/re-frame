(ns re-frame.utils
  (:require
   [re-frame.loggers :refer [console]]
   [re-frame.interop :as interop]))

(defn dissoc-in
  "Dissociates an entry from a nested associative structure returning a new
  nested structure. keys is a sequence of keys. Any empty maps that result
  will not be present in the new structure.
  The key thing is that 'm' remains identical? to itself if the path was never present"
  [m [k & ks :as keys]]
  (if ks
    (if-let [nextmap (get m k)]
      (let [newmap (dissoc-in nextmap ks)]
        (if (seq newmap)
          (assoc m k newmap)
          (dissoc m k)))
      m)
    (dissoc m k)))

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (console :error "re-frame: expected a vector, but got:" v)))

(defn apply-kw
  "Like apply, but f takes keyword arguments and the last argument is
  not a seq but a map with the arguments for f"
  [f & args]
  {:pre [(map? (last args))]}
  (apply f (apply concat
                  (butlast args) (last args))))

(defn map-vals [f m]
  (into {} (map (fn [[k v]] [k (f v)])) m))

(defn find-cycle [graph visited node]
  (loop [stack [node]
         path []]
    (let [current (peek stack)]
      (if (some #{current} path)
        (conj (take-while #(not= % current) (reverse path)) current)
        (if-let [neighbors (seq (get graph current))]
          (recur (into stack (disj (set neighbors) visited))
                 (conj path current))
          (recur (pop stack) path))))))

(defn topsort-kahn [graph]
  (let [in-degree (reduce (fn [acc [node neighbors]]
                            (reduce (fn [a neighbor]
                                      (update a neighbor inc))
                                    acc neighbors))
                          {} graph)
        ks (keys graph)]
    (loop [q (filter #(zero? (get in-degree % 0)) ks)
           sorted interop/empty-queue
           in-degree in-degree]
      (cond
        (seq q)
        (let [current (first q)
              neighbors (get graph current [])
              updated-in-degree (reduce (fn [acc neighbor]
                                          (update acc neighbor dec))
                                        in-degree neighbors)
              new-q (concat (rest q)
                            (filter #(= 0 (get updated-in-degree %)) neighbors))]
          (recur new-q (conj sorted current) updated-in-degree))
        (= (count sorted) (count ks))
        sorted
        :else
        (let [unvisited (remove (set sorted) ks)
              cycle (some #(find-cycle graph (set sorted) %) unvisited)]
          (throw (#?(:clj Exception. :cljs js/Error.)
                  (str "Graph has a cycle: " cycle))))))))

(defn remove-orphans [graph]
  (map-vals (partial filterv (set (keys graph))) graph))

(defn safe-update-in [m path f & args]
  (if (empty? path)
    (apply f m args)
    (apply update-in m path f args)))

(defn deep-dissoc
  "Dissoces the map entry at the path, then recurs through the ancestors,
  dissocing each ancestor until one is found with a descendent outside the path.

  ```
  (deep-dissoc {:a {:b {:c {:d 1}}}}
               [:a :b :c :d])
  ```

  This yields an empty map, since each node has a sole descendant.

  ```
  (deep-dissoc {:a {:x 2 :b {:c {:d 1}}}}
               [:a :b :c :d])
  ```

  This yields `{:a {:x 2}}`, since `:a` has a descendent `:x` outside the path.
  "
  [m path]
  (if
   (empty? path) m
   (let [new-data (safe-update-in m (pop path) dissoc (peek path))]
     (if-not (empty? (get-in new-data (pop path)))
       new-data
       (recur new-data (pop path))))))
