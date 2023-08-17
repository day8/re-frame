(ns re-frame.register.alpha)

(defmulti reg (fn [kind & _] kind))

(def lifecycle->method (atom {}))
