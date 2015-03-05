(ns re-frame.undo
  (:require-macros [reagent.ratom  :refer [reaction]])
  (:require
    [re-frame.utils    :refer  [warn]]
    [reagent.core      :as     reagent]
    [re-frame.db       :refer  [app-db]]
    [re-frame.handlers :as     handlers]
    [re-frame.subs     :as     subs]))


;; -- History -------------------------------------------------------------------------------------
;;
;;
(def ^:private max-undos (atom 50))     ;; maximum number of undo states maintained
(defn set-max-undos!
  [n]
  (reset! max-undos n))


(def ^:private undo-list (reagent/atom []))   ;; a list of history states
(def ^:private redo-list (reagent/atom []))   ;; a list of future states, caused by undoing

;; -- Explainations -----------------------------------------------------------
;;
;; Each undo has an associated explanation which can be displayed to the user.
;;
;; Seems really ugly to have mirrored vectors, but ...
;; the code kinda falls out when you do. I'm feeling lazy.
(def ^:private app-explain (reagent/atom ""))         ;; mirrors app-db
(def ^:private undo-explain-list (reagent/atom []))   ;; mirrors undo-liat
(def ^:private redo-explain-list (reagent/atom []))   ;; mirrors redo-list


(defn clear-history!
  []
  (reset! undo-list [])
  (reset! redo-list [])
  (reset! undo-explain-list [])
  (reset! redo-explain-list []))


(defn store-now!
  "stores the value currently in app-db, so the user can later undo"
  [explanation]
  (reset! redo-list [])           ;; clear and redo state created by previous undos
  (reset! redo-explain-list [])           ;; clear and redo state created by previous undos
  (reset! undo-list (vec (take
                           @max-undos
                           (conj @undo-list @app-db))))
  (reset! undo-explain-list (vec (take
                                   @max-undos
                                   (conj @undo-explain-list @app-explain))))
  (reset! app-explain explanation))

(defn undos?
  []
  (pos? (count @undo-list)))

(defn redos?
  []
  (pos? (count @redo-list)))


;; -- subscriptions  -----------------------------------------------------------------------------

(subs/register
  :undos?
  (fn handler
    ; "return true if anything is stored in the undo list, otherwise false"
    [_ _]
    (reaction (undos?))))

(subs/register
  :redos?
  (fn handler
    ; "return true if anything is stored in the redo list, otherwise false"
    [_ _]
    (reaction (redos?))))


(subs/register
  :undo-explantions
  (fn handler
    ; "returns a vector of string explnations
    [_ _]
    (reaction (deref undo-explain-list))))

(subs/register
  :redo-explantions
  (fn handler
    ; "returns a vector of string explnations
    [_ _]
    (reaction (deref redo-explain-list))))

;; -- event handlers  ----------------------------------------------------------------------------


(defn undo
  [undos cur redos]
  (let [u @undos
        r (cons @cur @redos)]
    (reset! cur (last u))
    (reset! redos r)
    (reset! undos (pop u))))


(handlers/register-base     ;; not a pure handler
  :undo                     ;; usage:  (dispatch [:undo])
  (fn handler
    [_ _]
    (if-not (undos?)
      (warn "re-frame: you did a (dispatch [:undo]), but there is nothing to undo.")
      (do
        (undo undo-list app-db redo-list)
        (undo undo-explain-list app-explain redo-explain-list)))))


(defn- redo
  [undos cur redos]
  (let [u (conj @undos @cur)
        r  @redos]
    (reset! cur (first r))
    (reset! redos (rest r))
    (reset! undos u)))



(handlers/register-base     ;; not a pure handler
  :redo                     ;; usage:  (dispatch [:redo])
  (fn handler
    [_ _]
    (if-not (redos?)
      (warn "re-frame: you did a (dispatch [:redo]), but there is nothing to redo.")
      (do
        (redo undo-list app-db redo-list)
        (redo undo-explain-list app-explain redo-explain-list)))))

