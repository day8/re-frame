(ns re-frame.db
  (:require [reagent.core :as r]))

  ;; -- application data ---------------------------------------------------------------------------
  ;;
  ;; The entire state of the application is stored in this one atom.
  ;; It is useful to think of this atom as a database, hence its name.
  ;; For example, when it is mutated, we want it done in "a transaction", so it never appears in
  ;; an inconsistent state. Atomic operations, etc.

  (def ^:private db (r/atom {}))
