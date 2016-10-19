(ns re-frame.macros)

(defmacro defvar
  "Like `(def foo other-ns/foo)`, but also adds docstring of the referenced var
  to the new var."
  [sym v]
  `(def ~sym ~(-> v resolve meta :doc str) ~v))
