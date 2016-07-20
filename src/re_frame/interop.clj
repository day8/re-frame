(ns re-frame.interop)

(defn next-tick [f]
  (.start (Thread. f)))

(def empty-queue clojure.lang.PersistentQueue/EMPTY)

(def after-render next-tick)

(def debug-enabled? true)

(defn ratom [x]
  (let [result (atom x)]
    (alter-meta! result assoc ::ratom? true)
    result))

(defn ratom? [maybe-ratom]
  (and (satisfies? clojure.lang.IAtom maybe-ratom)
       (::ratom? (meta maybe-ratom))))

(defn make-reaction
  "On JVM Clojure, return an atom-like thing which invokes the given function on
  every deref. That is, `make-reaction` here provides precisely none of the
  benefits of `reagent.ratom/make-reaction` (which only invokes its function if
  the reactions that the function derefs have changed value). But so long as `f`
  only depends on other reactions (which also behave themselves), the only
  difference is one of efficiency. That is, your tests should see no difference
  other than that they do redundant work."
  [f]
  (reify clojure.lang.IDeref
    (deref [_] (f))))

(defn add-on-dispose!
  "No-op in JVM Clojure, since for testing purposes, we don't care about
  releasing resources for efficiency purposes."
  [a-ratom f]
  nil)

(defn set-timeout!
  "Note that we ignore the `ms` value and just invoke the function, because
  there isn't often much point firing a timed event in a test."
  [f ms]
  (next-tick f))
