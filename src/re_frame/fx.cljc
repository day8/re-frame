(ns re-frame.fx
  (:require
    [re-frame.router  :as router]
    [re-frame.db      :refer [app-db]]
    [re-frame.interceptor :refer [->interceptor]]
    [re-frame.interop  :refer [set-timeout!]]
    [re-frame.events  :as events]
    [re-frame.registrar  :refer [get-handler clear-handlers register-handler]]
    [re-frame.loggers :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def kind :fx)
(assert (re-frame.registrar/kinds kind))
(def register  (partial register-handler kind))

;; -- Interceptor -------------------------------------------------------------

(def do-effects
  "An interceptor which performs a `context's` (side) `:effects`.

  For every key in the `:effects` map, call the handler previously
  registered via `reg-fx`.

  So, if `:effects` was:
      {:dispatch  [:hello 42]
       :db        {...}
       :undo      \"set flag\"}
  call the registered effects handlers for each of the map's keys:
  `:dispatch`, `:undo` and `:db`."
  (->interceptor
    :name   :do-effects
    :after  (fn do-effects-after
              [context]
              (->> (:effects context)
                   (map (fn [[key val]]
                          (if-let [effect-fn  (get-handler kind key true)]
                            (effect-fn val))))
                   doall))))

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

