(ns re-frame.fx
  (:require
    [re-frame.router  :as router]
    [re-frame.db      :refer [app-db]]
    [re-frame.events  :as events]
    [re-frame.registrar  :refer [get-handler clear-handlers register-handler]]
    [re-frame.interop :refer [ratom? set-timeout!]]
    [re-frame.loggers :refer [console]]))

;; ---- Spec schema -----------------------------------------------------------
;; TODO use Spec to validate events for :dispatch and :dispatch-n when clj 1.9
;; e.g. (when (= :cljs.spec/invalid (s/conform ::event val))
;;        (console :error (s/explain-str ::event val)))
;; (s/def ::event (s/and vector? (complement empty?)))
;; (s/def ::events-n (s/coll-off ::event))

;; -- Registration ------------------------------------------------------------


(def kind :fx)
(assert (re-frame.registrar/kinds kind))

(defn register
  [id handler-fn]
  (register-handler kind id handler-fn))


;; -- Standard Builtin Effects Handlers  --------------------------------------


;; :dispatch-later
;;
;; `dispatch` one or more events in given times on the future. Expects a collection
;; of maps with two keys:  :`ms` and `:dispatch`
;;
;; usage:
;;
;;    {:dispatch-later [{:ms 200 :dispatch [:event-id "param"]}    ;;  in 200ms do this: (dispatch [:event-id "param"])
;;                      {:ms 100 :dispatch [:also :this :in :100ms]}]}
;;
(register
  :dispatch-later
  (fn [effects-v]
    (doseq  [{:keys [ms dispatch] :as effect} effects-v]
        (if (or (empty? dispatch) (-> ms number? not))
          (console :error "re-frame: ignoring bad :dispatch-later value: " effect)
          (set-timeout! #(router/dispatch dispatch) ms)))))


;; :dispatch
;;
;; `dispatch` one event. Excepts a single vector.
;;
;; usage:
;;   {:dispatch [:event-id "param"] }

(register
  :dispatch
  (fn [val]
    (if-not (vector? val)
      (console :error "re-frame: ignoring bad :dispatch value. Expected a vector, but got: " val)
      (router/dispatch val))))


;; :dispatch-n
;;
;; `dispatch` more than one event. Expects a list or vector of events. Something for which
;; sequential? returns true.
;;
;; usage:
;;   {:dispatch-n (list [:do :all] [:three :of] [:these])}
;;
(register
  :dispatch-n
  (fn [val]
    (if-not (sequential? val)
      (console :error "re-frame: ignoring bad :dispatch-n value. Expected a collection, got got: " val))
    (doseq [event val] (router/dispatch event))))


;; :deregister-event-handler
;;
;; removes an event handler. Expects either a single id (typically a keyword), or a seq of ids.
;;
;; usage:
;;   {:deregister-event-handler: :my-id)}
;; or:
;;   {:deregister-event-handler: [:one-id :another-id]}
;;
(register
  :deregister-event-handler
  (fn [val]
    (let [clear-event (partial clear-handlers events/kind)]
      (if (sequential? val)
        (doall (map clear-event val))
        (clear-event val)))))


(register
  :db
  (fn [val]
    (reset! app-db val)))

