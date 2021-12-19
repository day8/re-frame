(ns re-frame.fx
  (:require
    [re-frame.router      :as router]
    [re-frame.db          :refer [app-db]]
    [re-frame.interceptor :refer [->interceptor]]
    [re-frame.interop     :refer [set-timeout!]]
    [re-frame.events      :as events]
    [re-frame.registrar   :refer [get-handler clear-handlers register-handler]]
    [re-frame.loggers     :refer [console]]
    [re-frame.trace :as trace :include-macros true]))


;; -- Registration ------------------------------------------------------------

(def kind :fx)
(assert (re-frame.registrar/kinds kind))

(defn reg-fx
  [id handler]
  (register-handler kind id handler))

;; -- Interceptor -------------------------------------------------------------

(def do-fx
  "An interceptor whose `:after` actions the contents of `:effects`. As a result,
  this interceptor is Domino 3.

  This interceptor is silently added (by reg-event-db etc) to the front of
  interceptor chains for all events.

  For each key in `:effects` (a map), it calls the registered `effects handler`
  (see `reg-fx` for registration of effect handlers).

  So, if `:effects` was:
      {:dispatch  [:hello 42]
       :db        {...}
       :undo      \"set flag\"}

  it will call the registered effect handlers for each of the map's keys:
  `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
  value for that key - so in the example above the effect handler for :dispatch
  will be given one arg `[:hello 42]`.

  You cannot rely on the ordering in which effects are executed, other than that
  `:db` is guaranteed to be executed first."
  (->interceptor
    :id :do-fx
    :after (fn do-fx-after
             [context]
             (trace/with-trace
               {:op-type :event/do-fx}
               (let [effects            (:effects context)
                     effects-without-db (dissoc effects :db)]
                 ;; :db effect is guaranteed to be handled before all other effects.
                 (when-let [new-db (:db effects)]
                   ((get-handler kind :db false) new-db))
                 (doseq [[effect-key effect-value] effects-without-db]
                   (if-let [effect-fn (get-handler kind effect-key false)]
                     (effect-fn effect-value)
                     (console :warn "re-frame: no handler registered for effect:" effect-key ". Ignoring."))))))))

;; -- Builtin Effect Handlers  ------------------------------------------------

;; :dispatch-later
;;
;; `dispatch` one or more events after given delays. Expects a collection
;; of maps with two keys:  :`ms` and `:dispatch`
;;
;; usage:
;;
;;    {:dispatch-later [{:ms 200 :dispatch [:event-id "param"]}    ;;  in 200ms do this: (dispatch [:event-id "param"])
;;                      {:ms 100 :dispatch [:also :this :in :100ms]}]}
;;
;; Note: nil entries in the collection are ignored which means events can be added
;; conditionally:
;;    {:dispatch-later [ (when (> 3 5) {:ms 200 :dispatch [:conditioned-out]})
;;                       {:ms 100 :dispatch [:another-one]}]}
;;
(defn dispatch-later
  [{:keys [ms dispatch] :as effect}]
  (if (or (empty? dispatch) (not (number? ms)))
    (console :error "re-frame: ignoring bad :dispatch-later value:" effect)
    (set-timeout! #(router/dispatch dispatch) ms)))

(reg-fx
  :dispatch-later
  (fn [value]
    (if (map? value)
      (dispatch-later value)
      (doseq [effect (remove nil? value)]
        (dispatch-later effect)))))

;; :fx
;;
;; Handle one or more effects. Expects a collection of vectors (tuples) of the
;; form [effect-key effect-value]. `nil` entries in the collection are ignored
;; so effects can be added conditionally.
;;
;; usage:
;;
;; {:fx [[:dispatch [:event-id "param"]]
;;       nil
;;       [:http-xhrio {:method :post
;;                     ...}]]}
;;

(reg-fx
  :fx
  (fn [seq-of-effects]
    (if-not (sequential? seq-of-effects)
      (console :warn "re-frame: \":fx\" effect expects a seq, but was given " (type seq-of-effects))
      (doseq [[effect-key effect-value] (remove nil? seq-of-effects)]
        (when (= :db effect-key)
          (console :warn "re-frame: \":fx\" effect should not contain a :db effect"))
        (if-let [effect-fn (get-handler kind effect-key false)]
          (effect-fn effect-value)
          (console :warn "re-frame: in \":fx\" effect found " effect-key " which has no associated handler. Ignoring."))))))

;; :dispatch
;;
;; `dispatch` one event. Expects a single vector.
;;
;; usage:
;;   {:dispatch [:event-id "param"] }

(reg-fx
  :dispatch
  (fn [value]
    (if-not (vector? value)
      (console :error "re-frame: ignoring bad :dispatch value. Expected a vector, but got:" value)
      (router/dispatch value))))


;; :dispatch-n
;;
;; `dispatch` more than one event. Expects a list or vector of events. Something for which
;; sequential? returns true.
;;
;; usage:
;;   {:dispatch-n (list [:do :all] [:three :of] [:these])}
;;
;; Note: nil events are ignored which means events can be added
;; conditionally:
;;    {:dispatch-n (list (when (> 3 5) [:conditioned-out])
;;                       [:another-one])}
;;
(reg-fx
  :dispatch-n
  (fn [value]
    (if-not (sequential? value)
      (console :error "re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:" value)
      (doseq [event (remove nil? value)] (router/dispatch event)))))


;; :deregister-event-handler
;;
;; removes a previously registered event handler. Expects either a single id (
;; typically a namespaced keyword), or a seq of ids.
;;
;; usage:
;;   {:deregister-event-handler :my-id)}
;; or:
;;   {:deregister-event-handler [:one-id :another-id]}
;;
(reg-fx
  :deregister-event-handler
  (fn [value]
    (let [clear-event (partial clear-handlers events/kind)]
      (if (sequential? value)
        (doseq [event value] (clear-event event))
        (clear-event value)))))


;; :db
;;
;; reset! app-db with a new value. `value` is expected to be a map.
;;
;; usage:
;;   {:db  {:key1 value1 key2 value2}}
;;
(reg-fx
  :db
  (fn [value]
    (if-not (identical? @app-db value)
      (reset! app-db value))))

