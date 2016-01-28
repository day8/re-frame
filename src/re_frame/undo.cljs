(ns re-frame.undo
  (:require-macros [reagent.ratom  :refer [reaction]])
  (:require
    [reagent.core        :as     reagent]
    [re-frame.utils      :refer  [warn]]
    [re-frame.db         :refer  [app-db]]
    [re-frame.handlers   :as     handlers]
    [re-frame.subs       :as     subs]))


;; -- History -------------------------------------------------------------------------------------
;;
;;
(def ^:private max-undos "Maximum number of undo states maintained" (atom 50))
(defn set-max-undos!
  [n]
  (reset! max-undos n))


(def ^:private undo-list "A list of history states" (reagent/atom []))
(def ^:private redo-list "A list of future states, caused by undoing" (reagent/atom []))

;; -- Explanations -----------------------------------------------------------
;;
;; Each undo has an associated explanation which can be displayed to the user.
;;
;; Seems really ugly to have mirrored vectors, but ...
;; the code kinda falls out when you do. I'm feeling lazy.
(def ^:private app-explain "Mirrors app-db" (reagent/atom ""))
(def ^:private undo-explain-list "Mirrors undo-list" (reagent/atom []))
(def ^:private redo-explain-list "Mirrors redo-list" (reagent/atom []))

(defn- clear-undos!
  []
  (reset! undo-list [])
  (reset! undo-explain-list []))


(defn- clear-redos!
  []
  (reset! redo-list [])
  (reset! redo-explain-list []))


(defn clear-history!
  []
  (clear-undos!)
  (clear-redos!)
  (reset! app-explain ""))


(defn store-now!
  "Stores the value currently in app-db, so the user can later undo"
  [explanation]
  (clear-redos!)
  (reset! undo-list (vec (take-last
                           @max-undos
                           (conj @undo-list @app-db))))
  (reset! undo-explain-list (vec (take-last
                                   @max-undos
                                   (conj @undo-explain-list @app-explain))))
  (reset! app-explain explanation))


(defn undos?
  "Returns true if undos exist, false otherwise"
  []
  (pos? (count @undo-list)))

(defn redos?
  "Returns true if redos exist, false otherwise"
  []
  (pos? (count @redo-list)))

(defn undo-explanations
  "Returns list of undo descriptions or empty list if no undos"
  []
  (if (undos?)
    (conj @undo-explain-list @app-explain)
    []))

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
  :undo-explanations
  (fn handler
    ; "return a vector of string explanations ordered oldest to most recent"
    [_ _]
    (reaction (undo-explanations))))

(subs/register
  :redo-explanations
  (fn handler
    ; "returns a vector of string explanations ordered from most recent undo onward"
    [_ _]
    (reaction (deref redo-explain-list))))

;; -- event handlers  ----------------------------------------------------------------------------


(defn- undo
  [undos cur redos]
  (let [u @undos
        r (cons @cur @redos)]
    (reset! cur (last u))
    (reset! redos r)
    (reset! undos (pop u))))

(defn- undo-n
  "undo n steps or until we run out of undos"
  [n]
  (when (and (pos? n) (undos?))
    (undo undo-list app-db redo-list)
    (undo undo-explain-list app-explain redo-explain-list)
    (recur (dec n))))

(handlers/register-base     ;; not a pure handler
  :undo                     ;; usage:  (dispatch [:undo n])  n is optional, defaults to 1
  (fn handler
    [_ [_ n]]
    (if-not (undos?)
      (warn "re-frame: you did a (dispatch [:undo]), but there is nothing to undo.")
      (undo-n (or n 1)))))


(defn- redo
  [undos cur redos]
  (let [u (conj @undos @cur)
        r  @redos]
    (reset! cur (first r))
    (reset! redos (rest r))
    (reset! undos u)))

(defn- redo-n
  "redo n steps or until we run out of redos"
  [n]
  (when (and (pos? n) (redos?))
    (redo undo-list app-db redo-list)
    (redo undo-explain-list app-explain redo-explain-list)
    (recur (dec n))))

(handlers/register-base     ;; not a pure handler
  :redo                     ;; usage:  (dispatch [:redo n])
  (fn handler               ;; if n absent, defaults to 1
    [_ [_ n]]
    (if-not (redos?)
      (warn "re-frame: you did a (dispatch [:redo]), but there is nothing to redo.")
      (redo-n (or n 1)))))


(handlers/register-base     ;; not a pure handler
  :purge-redos              ;; usage:  (dispatch [:purge-redos])
  (fn handler
    [_ _]
    (if-not (redos?)
      (warn "re-frame: you did a (dispatch [:purge-redos]), but there is nothing to redo.")
      (clear-redos!))))

