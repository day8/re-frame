(ns re-frame.undo
  (:require-macros [reagent.ratom  :refer [reaction]])
  (:require
    [reagent.core        :as     reagent]
    [re-frame.loggers    :refer  [warn error]]
    [re-frame.db         :refer  [app-db]]
    [re-frame.handlers   :as     handlers]
    [re-frame.subs       :as     subs]))


;;  background docs:  https://github.com/Day8/re-frame/wiki/Undo-&-Red


;; -- Configuration ----------------------------------------------------------

(def ^:private config (atom {:max-undos    50   ;; Maximum number of undo states maintained
                             :harvest-fn   deref
                             :reinstate-fn reset!}))

(defn undo-config!
  [new-config]
  (if-let [unknown-keys (seq (clojure.set/difference (-> new-config keys set) (-> @config keys set)))]
    (warn "re-frame: you called undo-config! within unknown keys: " unknown-keys)
    (swap! config merge new-config)))


(defn- max-undos
  []
  (:max-undos @config))



;; -- State history ----------------------------------------------------------

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
                           (max-undos)
                           (conj @undo-list ((:harvest-fn @config) app-db)))))
  (reset! undo-explain-list (vec (take-last
                                   (max-undos)
                                   (conj @undo-explain-list @app-explain))))
  (reset! app-explain explanation))


(defn undos?
  "Returns true if undos exist, false otherwise"
  []
  (seq @undo-list))

(defn redos?
  "Returns true if redos exist, false otherwise"
  []
  (seq @redo-list))

(defn undo-explanations
  "Returns a vector of undo descriptions, perhaps empty"
  []
  (if (undos?)
    (conj @undo-explain-list @app-explain)
    []))

;; -- subscriptions  -----------------------------------------------------------------------------

(subs/register
  :undos?                   ;;  usage:  (subscribe [:undos?])
  (fn handler
    ; "returns true if anything is stored in the undo list, otherwise false"
    [_ _]
    (reaction (undos?))))

(subs/register
  :redos?
  (fn handler
    ; "returns true if anything is stored in the redo list, otherwise false"
    [_ _]
    (reaction (redos?))))


(subs/register
  :undo-explanations
  (fn handler
    ; "returns a vector of string explanations ordered oldest to most recent"
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
  [harvester reinstater undos cur redos]
  (let [u @undos
        r (cons (harvester cur) @redos)]
    (reinstater cur (last u))
    (reset! redos r)
    (reset! undos (pop u))))


(defn- undo-n
  "undo n steps or until we run out of undos"
  [n]
  (when (and (pos? n) (undos?))
    (undo (:harvest-fn @config) (:reinstate-fn @config) undo-list app-db redo-list)
    (undo deref reset! undo-explain-list app-explain redo-explain-list)
    (recur (dec n))))

(handlers/register-base     ;; not a pure handler
  :undo                     ;; usage:  (dispatch [:undo n])  n is optional, defaults to 1
  (fn handler
    [_ [_ n]]
    (if-not (undos?)
      (warn "re-frame: you did a (dispatch [:undo]), but there is nothing to undo.")
      (undo-n (or n 1)))))


(defn- redo
  [harvester reinstater undos cur redos]
  (let [u (conj @undos (harvester cur))
        r  @redos]
    (reinstater cur (first r))
    (reset! redos (rest r))
    (reset! undos u)))

(defn- redo-n
  "redo n steps or until we run out of redos"
  [n]
  (when (and (pos? n) (redos?))
    (redo (:harvest-fn @config) (:reinstate-fn @config) undo-list app-db redo-list)
    (redo deref reset! undo-explain-list app-explain redo-explain-list)
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



;; -- Middleware ----------------------------------------------------------

(defn- undoable_
  "A Middleware factory which stores an undo checkpoint.
  \"explanation\" can be either a string or a function. If it is a
  function then must be:  (db event-vec) -> string.
  \"explanation\" can be nil. in which case \"\" is recorded.
  "
  [explanation]
  (fn undoable-middleware
    [handler]
    (fn undoable-handler
      [db event-vec]
      (let [explanation (cond
                          (fn? explanation)     (explanation db event-vec)
                          (string? explanation) explanation
                          (nil? explanation)    ""
                          :else (error "re-frame: \"undoable\" middleware given a bad parameter. Got: " explanation))]
        (store-now! explanation)
        (handler db event-vec)))))

(def undoable (with-meta undoable_ {:re-frame-factory-name "undoable"}))
