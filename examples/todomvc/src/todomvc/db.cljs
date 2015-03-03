(ns todomvc.db)


(def default-initial-state
  {:todos   (sorted-map)        ;; todo ids are the keys (for sort)
   :showing :all                ;; one of :all :done or :active
   })
