(ns re-frame.utils
  (:require
   [re-frame.loggers :refer [console]]))

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

(defn topsort-kahn [graph]
  (let [in-degree (reduce (fn [acc [node neighbors]]
                            (reduce (fn [a neighbor]
                                      (update a neighbor (fnil inc 0)))
                                    acc neighbors))
                          {} graph)]
    (loop [q (filter #(= 0 (get in-degree % 0)) (keys graph))
           sorted []
           in-degree in-degree]
      (if (empty? q)
        sorted
        (let [current (first q)
              neighbors (get graph current [])
              updated-in-degree (reduce (fn [acc neighbor]
                                          (update acc neighbor dec))
                                        in-degree neighbors)
              new-q (concat (rest q)
                            (filter #(= 0 (get updated-in-degree %)) neighbors))]
          (recur new-q (conj sorted current) updated-in-degree))))))
