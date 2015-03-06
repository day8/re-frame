(ns todomvc.db
  (:require
    [schema.core :as s]))


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
   ;; :mistake (s/enum :one :two)   ;; add this bogus schema item, then watch the errors in the console
   })


(defn valid-schema?
  [db]
  (let [res (s/check schema db)]
    (if (some? res)
      (.error js/console (str "schema problem: " res)))))


;; -- Default Value  ----------------------------------------------------------
;;
(def default-value
  {:todos   (sorted-map)        ;; todo ids are the keys
   :showing :all})

;; -- Local Storage  ----------------------------------------------------------
;;
;;  Set and Get

(def local-storage-key "re-frame-todomvc")

(def persistent-db "keeps track of what is persisted" (atom {}))

(defn get-local-storage
 "load information from local-storage"
  []
  (let [data (.getItem js/localStorage local-storage-key)]
    (when-not (nil? data)
      (-> data 
          (js/JSON.parse) 
          (js->clj :keywordize-keys true)
          (#(reset! persistent-db %))))))

(defn set-local-storage!
 "puts the value of key into local storage"
  [key value]
  (swap! persistent-db assoc key value)
  (let [data (-> @persistent-db 
                 (clj->js) 
                 (js/JSON.stringify))]
    (.setItem js/localStorage local-storage-key data)))