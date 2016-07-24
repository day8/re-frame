(ns re-frame.fx
  (:require [re-frame.router :refer [dispatch]]
            [re-frame.db :refer [app-db]]
            [re-frame.events]
            [re-frame.interop :refer [ratom? set-timeout!]]
            [re-frame.loggers    :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def ^:private id->handler-fn  (atom {}))

(defn lookup-handler
  [effect-id]
  (get @id->handler-fn effect-id))


(defn clear-all-handlers!
  []
  (reset! id->handler-fn {}))


(defn clear-handler!
  [effect-id]
  (if (lookup-handler effect-id)
    (swap! id->handler-fn dissoc effect-id)
    (console :warn "re-frame: unable to clear effect handler for  " effect-id ". Not defined.")))


(defn register
  "register a handler fn for an effect."
  [effect-id handler-fn]
  (when (lookup-handler effect-id)
    (console :warn "re-frame: overwriting an effects handler for: " effect-id))   ;; allow it, but warn.
  (swap! id->handler-fn assoc effect-id handler-fn))


;; -- Standard Builtin Effects Handlers  --------------------------------------

(defn dispatch-helper
  "There are cases where eitherone event is to be dipatch "
  [effect]
  (cond
    (vector? effect) (dispatch effect)
    (seq? effect)    (dorun (map dispatch effect))
    :else (console :error "re-frame: expected :dispatch effect to be a list or vector, but got: " effect)))

;; Example:
;; {:dispatch-later {200  [:event-id "param"]    ;;  in 200ms do this: (dispatch [:event-id "param"])
;;                   100  [:also :this :in :100ms]
;;                   250  (list [:do ] [:all ] [:three ])}
;;
(register
  :dispatch-later
  (fn [effect]
    (doseq  [[ms events] effect]
      (set-timeout! #(dispatch-helper events) ms))))


;; Supply either a vector or a list of vectors. For example:
;;
;;   {:dispatch [:event-id "param"] }
;;
;;   {:dispatch (list [:do :all] [:three :of] [:these]) }
;;
(register
  :dispatch
  (fn [val]
    (dispatch-helper val)))


(register
  :deregister-event-handler
  (fn [val]
    (if (sequential? val)
      (doall (map re-frame.events/clear-handler! val))
      (re-frame.events/clear-handler! val))))


(register
  :db
  (fn [val]
    (reset! app-db val)))

;; -- Middleware --------------------------------------------------------------

;; XXX a coeffect for jsDate or random number
;; XXX add metadata saying it is fx.
;; XXX ordering
;; XXX think about an undo effect


(defn fx
  [handler]
  (fn fx-handler
    [app-db event-vec]
    (if-not (ratom? app-db)
        (if (map? app-db)
          (console :warn "re-frame: Did you use \"fx\" middleware with \"reg-event\"?  Use \"reg-event-fx\" instead (and don't directly use \"fx\")")
          (console :warn "re-frame: \"fx\" middleware not given a Ratom.  Got: " app-db)))
    (let [run-effect (fn [[key val]]
                       (if-let [effect-fn  (lookup-handler key)]
                         (effect-fn val)
                         (console :error "re-frame: no effects handler registered for: " key ". Ignoring")))
          world   {:db @app-db}]
      (->> (handler world event-vec)   ;; is expected to return a map of effects
           (mapv run-effect)))))       ;; use mapv to process the returned effects (because it isn't lazy)
