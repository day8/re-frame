(ns todomvc.db
  (:require
    [schema.core :as s :include-macros true]))


(def default-initial-state
  {:todos   (sorted-map)        ;; todo ids are the keys (for sort)
   :showing :all                ;; one of :all :done or :active
   })


(def schema
  {:todos   (s/both (s/pred map?) (s/pred sorted?))
   :showing (s/enum :all :done :active)
   })


(defn valid-schema?
  [db]
  (s/validate schema db))




