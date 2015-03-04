(ns todomvc.db
  (:require
    [schema.core :as s :include-macros true]))

;; -- Schema ------------------------------------------------------------------
;;
;; A Primatic Schema for the contents of `app-db`. At any time we can validate
;; the contents of 'app-db' using valid schema.
;;
;; Only event handlers can mutate "app-db", so after each handler runs  we'll
;; want to revalidate.
;;
;; In handlers.cljs, notice how we use middleware to achieve that.
;;

(def schema
  {:todos   (s/both (s/pred map?) (s/pred sorted?))
   :showing (s/enum :all :done :active)
   :blah (s/enum :all :done :active)   ;; add this bogus schema item in, then watch the console
   })


(defn valid-schema?
  [db]
  (let [res (s/check schema db)]
    (if (some? res)
      (.error js/console res))
    db))  ;; so it can be used in middleare


;; -- Default Value  ----------------------------------------------------------
;;
(def default-value
  {:todos   (sorted-map)        ;; todo ids are the keys
   :showing :all
   })






