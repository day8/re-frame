(ns re-frame.fx
  (:require
    [re-frame.router      :as router]
    [re-frame.db          :refer [app-db]]
    [re-frame.interceptor :refer [->interceptor]]
    [re-frame.interop     :refer [set-timeout! clear-timeout!]]
    [re-frame.events      :as events]
    [re-frame.registrar   :refer [get-handler clear-handlers register-handler]]
    [re-frame.loggers     :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def kind :fx)
(assert (re-frame.registrar/kinds kind))
(def register  (partial register-handler kind))

;; -- Interceptor -------------------------------------------------------------

(def do-fx
  "An interceptor which actions a `context's` (side) `:effects`.

  For each key in the `:effects` map, call the `effects handler` previously
  registered using `reg-fx`.

  So, if `:effects` was:
      {:dispatch  [:hello 42]
       :db        {...}
       :undo      \"set flag\"}
  call the registered effects handlers for each of the map's keys:
  `:dispatch`, `:undo` and `:db`."
  (->interceptor
    :id :do-fx
    :after (fn do-fx-after
             [context]
             (doseq [[effect-k value] (:effects context)]
               (if-let [effect-fn (get-handler kind effect-k true)]
                 (effect-fn value))))))

;; -- Builtin Effect Handlers  ------------------------------------------------

;; :dispatch-throttle
;;
;; This will only dispatch the event at most once per every 'window-duration' milliseconds.
;; The throttled function can be configured to dispatch on the leading, trailing or both edges of this window.

;; Note: When both leading and trailing flags are enabled the event will be dispatched on trailing edge only if there are more than one event.
;;
;; usage
;;
;; Expects either a single map, or a sequence of maps.
;;
;; {:dispatch-throttle {:id       ::re-render-markdown
;;                      :window-duration  250
;;                      :leading? true
;;                      :trailing? false
;;                      :dispatch [:re-render :main-section]}}
;;
;; Cancel throttled events
;;
;; {:dispatch-throttle {:id       ::re-render-markdown
;;                      :action :cancel}}
;;
;; Flush latest throttled event
;;
;; {:dispatch-throttle {:id ::re-render-markdown
;;                      :action :flush}}
(def throttled-events (atom {}))

(defn- on-leading-edge
  [id]
  (if-let [{:keys [leading? deferred-dispatch]} (id @throttled-events)]
    (if leading?
      (do
        (router/dispatch deferred-dispatch)
        (swap! throttled-events update-in [id] dissoc :deferred-dispatch)))))

(defn- on-trailing-edge
  [id]
  (if-let [{:keys [trailing? deferred-dispatch]} (id @throttled-events)]
    (do
      (if (and trailing? deferred-dispatch)
        (router/dispatch deferred-dispatch))
      (swap! throttled-events dissoc id))))

(register
 :dispatch-throttle
 (fn [dispatches]
   (let [dispatches (if (sequential? dispatches) dispatches [dispatches])]
     (doseq [{:keys [id action dispatch window-duration leading? trailing?] :as effect
              :or   {action :dispatch
                     leading? true}}
             dispatches]
       (case action

         :dispatch (if (or (empty? dispatch) (not (number? window-duration)))
                     (console :error "re-frame: ignoring bad :dispatch-throttle value:" effect)
                     (let [new-event? (nil? (id @throttled-events))]
                       (swap! throttled-events #(-> %
                                                    (assoc-in [id :deferred-dispatch] dispatch)
                                                    (assoc-in [id :leading?] leading?)
                                                    (assoc-in [id :trailing?] trailing?)))
                       (if new-event?
                         (do
                           (swap! throttled-events assoc-in [id :timeout] (set-timeout! #(on-trailing-edge id) window-duration))
                           (on-leading-edge id)))))

         :cancel (do
                   (clear-timeout! (get-in [id :timeout] @throttled-events))
                   (swap! throttled-events dissoc id))

         :flush (on-trailing-edge id)

         (console :error "re-frame: bad dispatch-throttle action:" action "id: " id))))))

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
(register
  :dispatch-later
  (fn [value]
    (doseq [{:keys [ms dispatch] :as effect} value]
        (if (or (empty? dispatch) (not (number? ms)))
          (console :error "re-frame: ignoring bad :dispatch-later value:" effect)
          (set-timeout! #(router/dispatch dispatch) ms)))))


;; :dispatch
;;
;; `dispatch` one event. Excepts a single vector.
;;
;; usage:
;;   {:dispatch [:event-id "param"] }

(register
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
(register
  :dispatch-n
  (fn [value]
    (if-not (sequential? value)
      (console :error "re-frame: ignoring bad :dispatch-n value. Expected a collection, got got:" value))
    (doseq [event value] (router/dispatch event))))


;; :deregister-event-handler
;;
;; removes a previously registered event handler. Expects either a single id (
;; typically a keyword), or a seq of ids.
;;
;; usage:
;;   {:deregister-event-handler :my-id)}
;; or:
;;   {:deregister-event-handler [:one-id :another-id]}
;;
(register
  :deregister-event-handler
  (fn [value]
    (let [clear-event (partial clear-handlers events/kind)]
      (if (sequential? value)
        (doseq [event (if (sequential? value) value [value])]
          (clear-event event))))))


;; :db
;;
;; reset! app-db with a new value. Expects a map.
;;
;; usage:
;;   {:db  {:key1 value1 key2 value2}}
;;
(register
  :db
  (fn [value]
    (reset! app-db value)))

