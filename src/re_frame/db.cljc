(ns re-frame.db
  (:require [re-frame.interop :refer [ratom]])
  #?(:clj (:import [clojure.lang IAtom IDeref])))

#?(:cljs (def app-db (ratom {})))
#?(:clj
    (do
      (def ^:dynamic app-db-id nil)
      (defonce db-atoms* (atom {}))
      (defn db-id [] app-db-id)

      (defn swap-helper [a db-atoms* f & args]
        (let [old-val (deref a)
              new-val (apply f old-val args)]
          (swap! db-atoms* assoc (db-id) new-val)
          new-val))

      (deftype ThreadLocalAtom []
        IAtom
        (swap [this f] (swap-helper this db-atoms* f))
        (swap [this f x] (swap-helper this db-atoms* f x))
        (swap [this f & args] (apply swap-helper this db-atoms* f args))

        (compareAndSet [this old-val new-val]
          (swap! db-atoms* assoc (db-id) new-val)
          new-val)

        (reset [this new-val]
          (swap! db-atoms* assoc (db-id) new-val)
          new-val)

        IDeref
        (deref [this]
          (get @db-atoms* (db-id))))

      (defn clear-app-db [id]
        (swap! db-atoms* dissoc id))

      (def app-db (->ThreadLocalAtom))))
