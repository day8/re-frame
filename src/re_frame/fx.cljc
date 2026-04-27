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

;; rf-ge8 — effect substitution (companion-re-frame.md A9).
;;
;; Per-dispatch override channel for fx handlers, carried as event
;; metadata rather than via a dynamic binding or a mutated global
;; registrar (Q4 "Approach 2" — no global state, no restore dance).
;; `dispatch-with` (in re-frame.core) tags the event with
;; `:re-frame/fx-overrides` metadata; `do-fx-after` reads it from the
;; current event's meta and consults the map BEFORE falling back to
;; `(get-handler kind ...)`.
;;
;; CASCADE PROPAGATION (Q1)
;;
;; `re-frame.router/dispatch` reads the CURRENTLY-handling event's
;; `:re-frame/fx-overrides` meta (via `re-frame.events/*handling*`)
;; and tags queued children with the same map — parallel to rf-3p7
;; item 2's `:re-frame/parent-dispatch-id` propagation. Result:
;; overrides propagate transitively through any depth of
;; `:fx [:dispatch ...]` cascade.
;;
;; ASYNC EFFECT CONTRACT (Q2)
;;
;; A stub for an async effect (`:http-xhrio`, `:dispatch-later`,
;; etc.) must mirror the contract the real handler exposes: same
;; return shape, same callback / promise lifecycle. The override
;; mechanism is purely a handler swap — no automatic
;; "stub returns success-map" wrapping. Stub authors are
;; responsible for matching the contract their callers depend on.
;;
;; INTEGRATION (Q3)
;;
;; Lives in re-frame.core (not re-frame.test) — runtime capability
;; for REPL exploration, dev-mode probing, agent-driven experiment
;; loops. Test utilities may use it without gating on a test
;; environment.
;;
;; RESTORE GUARANTEES (Q4)
;;
;; The override rides the event's metadata into `do-fx-after`,
;; which reads it once per dispatch. Two overlapping
;; `dispatch-with` calls each carry their own meta — no
;; cross-contamination. The override "expires" when the event
;; finishes processing, by virtue of the meta going out of scope
;; with the event itself. No try/finally needed.

;; The override map is propagated TWO ways:
;;
;; (1) ACROSS the queue boundary, via event metadata. When the
;;     router-pushed event eventually reaches `do-fx-after`, that
;;     fn reads the event's `:re-frame/fx-overrides` meta and
;;     binds `*current-overrides*` for the synchronous fx-execution
;;     frame.
;;
;; (2) WITHIN a single fx-execution frame, via this dynamic var.
;;     `do-fx-after` sets it; the `:fx` handler (which itself
;;     calls handlers via `effect-handler`) sees it and applies
;;     the same overrides to the inner effects of an `:fx [...]`
;;     value. Without this, an event returning
;;     `{:fx [[:http-xhrio ...]]}` would dispatch :fx via
;;     overrides correctly but :fx would then call :http-xhrio
;;     via the registrar (no override).
(def ^:dynamic *current-overrides*
  "Per-fx-execution-frame override map. Bound by `do-fx-after`
   from the current event's `:re-frame/fx-overrides` metadata."
  nil)

(defn- effect-handler
  "Resolve an fx handler: prefer an override from
   `*current-overrides*` (set by do-fx-after for the active
   dispatch); fall back to the global registrar."
  [effect-key]
  (or (get *current-overrides* effect-key)
      (get-handler kind effect-key false)))

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
                    effects-without-db (dissoc effects :db)
                    ;; rf-ge8 — read the original event's
                    ;; `:re-frame/fx-overrides` meta (set by
                    ;; `dispatch-with` and propagated by
                    ;; router/dispatch through cascades) and bind
                    ;; `*current-overrides*` for the fx execution
                    ;; frame so both this loop AND the registered
                    ;; `:fx` handler (which dispatches the inner
                    ;; effects of `{:fx [...]}` values) see the
                    ;; same overrides.
                    event      (get-in context [:coeffects :event])
                    overrides  (:re-frame/fx-overrides (meta event))]
                (binding [*current-overrides* (or overrides *current-overrides*)]
                  ;; :db effect is guaranteed to be handled before all other effects.
                  (when-let [new-db (:db effects)]
                    ;; rf-ge8 — :db override is also honoured (a stub
                    ;; for :db lets a probe dispatch see "what the
                    ;; effect would have done to app-db" without
                    ;; actually mutating the global ratom).
                    ((effect-handler :db) new-db))
                  (doseq [[effect-key effect-value] effects-without-db]
                    ;; rf-ge8 — consult per-dispatch override first;
                    ;; fall back to the global registrar.
                    (if-let [effect-fn (effect-handler effect-key)]
                      (effect-fn effect-value)
                      (console :warn
                               "re-frame: no handler registered for effect:"
                               effect-key
                               ". Ignoring."
                               (when (= :event effect-key)
                                 (str "You may be trying to return a coeffect map from an event-fx handler. "
                                      "See https://day8.github.io/re-frame/FAQs/use-cofx-as-fx/")))))))))))

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
       ;; rf-ge8 — go through `effect-handler` so the inner effects
       ;; of an `{:fx [...]}` value also honour `*current-overrides*`
       ;; (bound by do-fx-after for this dispatch's fx-execution frame).
       (if-let [effect-fn (effect-handler effect-key)]
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
     (reset! app-db value)
     (trace/with-trace {:op-type :reagent/quiescent}))))

