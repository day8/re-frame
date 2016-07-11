(ns re-frame.fx
  (:require [re-frame.router :refer [dispatch]]
            [re-frame.db :refer [app-db]]
            [re-frame.loggers    :refer [console]]))



;; -- Registration ------------------------------------------------------------
;;
(def ^:private id->handler-fn  (atom {}))

(defn lookup-handler
  [event-id]
  (get @id->handler-fn event-id))


(defn clear-handlers!
  "Unregister all effects handlers"
  []
  (reset! id->handler-fn {}))


(defn register
  "register a handler fn for an effect."
  [event-id handler-fn]
  (when (contains? @id->handler-fn event-id)
    (console :warn "re-frame: overwriting an effects handler for: " event-id))   ;; allow it, but warn.
  (swap! id->handler-fn assoc event-id handler-fn))


;; -- Standard effets ---------------------------------------------------------


(defn dispatch-helper
  [effect]
  (cond
    (list? effect)   (map dispatch effect)
    (vector? effect) (dispatch effect)
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
        (js/setTimeout #(dispatch-helper events) ms))))

(register
  :dispatch
  (fn [effect]
    (dispatch-helper effect)))


;;
;; {:forward-events  {:listen      :an-id-for-this-listner
;;                    :events      #{:event1  :event2}
;;                    :dispatch-to [:eid "eg. param"]}     ;; the forwared event will be conj to the end of the dispatch.
;;
;; {:forward-events  {:unlisten :the-listner-id-I-originally-supplied}}
;;
(register
  :forward-events
  (let [id->listen-fn (atom {})
        process-entry (fn [{:keys [listen events dispatch-to unlisten]}]
                        (if (some? unlisten)
                          (do
                            (unregister XXXX)
                            (swap! id->listen-fn dissoc unlisten))))]


    (fn [val]
      (cond
        (map? val) (process-entry m)
        (list? val) (doseq []))
      (do-dispatches (:dispatch world)))))


(register
  :db
  (fn [world]
    (if-let [db (:db world)]
      (reset! app-db db))))

;; -- Middleware --------------------------------------------------------------

;; XXX a coeffect for jsDate ?
;; XXX add metadata saying it is fx.
;; XXX add config
;; XXX world or branch ??  Return world?
;; XXX ordering
;; XXX review other standard middleware
;; XXX write a gist for :http
;; XXX think about an undo effect
;;     :undo


(defn fx
  [handler]
  (fn fx-handler
    [app-db event-vec]
    (let [world   {:db @app-db}
          result (handler world event-vec)
          effects (-> result (dissoc :db) keys)
          handlers (map lookup-handler effects)
          retult' (reduce #(%2 %1) result handlers)]

      (if-let [db (:db result)]
        (reset! app-db db)))))
