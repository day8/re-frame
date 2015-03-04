(ns re-frame.utils)


(defn warn
  [& args]
  (.warn js/console (apply str args)))

(defn dbg
  [& args]
  (.debug js/console (apply str args)))

(defn log
  [& args]
  (.log js/console (apply str args)))

(defn group
  [& args]
  (.group js/console (apply str args)))

(defn groupEnd
  []
  (.groupEnd js/console))

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (warn "re-frame: expected a vector event, but got: " v)))
