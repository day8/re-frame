(ns todomvc.db
  (:require [cljs.reader]
            [cljs.spec    :as s]))


;; -- Spec -----------------------------------------------------------------
;;
;; This is a clojure.spec specification which documents the structure of app-db
;; See: http://clojure.org/guides/spec
;;
;; The value in app-db should ALWAYS match this spec. Now, the value in
;; app-db can ONLY be changed by event handlers so, after each event handler
;; has run, we re-check that app-db still matches this spec.
;;
;; How is this done? Look in handlers.cljs and you'll notice that all handers
;; have an "after" middleware which does the spec re-check.
;;
;; None of this is strictly necessary. It could be omitted. But we find it
;; good practice.

(s/def ::id      int?)
(s/def ::title   string?)
(s/def ::done    boolean?)
(s/def ::todo    (s/keys :req-un [::id ::title ::done]))
(s/def ::todos   (s/and                             ;; should use the :kind kw to s/map-of (not supported yet)
                   (s/map-of ::id ::todo)           ;; in this map, each todo is keyed by its :id
                   #(instance? PersistentTreeMap %) ;; is a sorted-map (not just a map)
                   ))
(s/def ::showing  ;; what todos are shown to the user?
       #{:all     ;; all todos are shown
         :active  ;; only todos whose :done is false
         :done    ;; only todos whose :done is true
         })
(s/def ::db      (s/keys :req-un [::todos ::showing]))

;; -- Default app-db Value  ---------------------------------------------------
;;
;; When the application first starts, this will be the value put in app-db
;; Unless, or course, there are todos in the LocalStore (see further below)
;; Look in core.cljs for  "(dispatch-sync [:initialise-db])"
;;

(def default-value            ;; what gets put into app-db by default.
  {:todos   (sorted-map)      ;; an empty list of todos. Use the (int) :id as the key
   :showing :all})            ;; show all todos


;; -- Local Storage  ----------------------------------------------------------
;;
;; Part of the todomvc challenge is to store todos in LocalStorage, and
;; on app startup, reload the todos from when the program was last run.
;; But we are not to load the setting for the "showing" filter. Just the todos.
;;

(def lsk "todos-reframe")     ;; localstore key

(defn localstore->todos
  "Read in todos from LS, and process into a map we can merge into app-db."
  []
  (some->> (.getItem js/localStorage lsk)
           (cljs.reader/read-string)   ;; stored as an EDN map.
           (into (sorted-map))         ;; map -> sorted-map
           (hash-map :todos)))         ;; access via the :todos key

(defn todos->local-store
  "Puts todos into localStorage"
  [todos]
  (.setItem js/localStorage lsk (str todos)))   ;; sorted-map writen as an EDN map

