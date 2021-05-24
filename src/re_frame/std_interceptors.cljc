(ns re-frame.std-interceptors
  "contains re-frame supplied, standard interceptors"
  (:require
    [re-frame.interceptor :refer [->interceptor get-effect get-coeffect assoc-coeffect assoc-effect update-coeffect]]
    [re-frame.loggers :refer [console]]
    [re-frame.settings :as settings]
    [re-frame.db :refer [app-db]]
    [clojure.data :as data]
    [re-frame.cofx :as cofx]
    [re-frame.utils :as utils]
    [re-frame.trace :as trace :include-macros true]
    [re-frame.interceptor :as interceptor]))


(def debug
  (->interceptor
    :id     :debug
    :before (fn debug-before
              [context]
              (console :log "Handling re-frame event:" (get-coeffect context :event))
              context)
    :after  (fn debug-after
              [context]
              (let [event   (get-coeffect context :event)
                    orig-db (get-coeffect context :db)
                    new-db  (get-effect   context :db ::not-found)]
                (if (= new-db ::not-found)
                  (console :log "No app-db changes in:" event)
                  (let [[only-before only-after] (data/diff orig-db new-db)
                        db-changed?    (or (some? only-before) (some? only-after))]
                    (if db-changed?
                      (do (console :group "db clojure.data/diff for:" event)
                          (console :log "only before:" only-before)
                          (console :log "only after :" only-after)
                          (console :groupEnd))
                      (console :log "No app-db changes resulted from:" event))))
                context))))


(def unwrap
  (->interceptor
    :id      :unwrap
    :before  (fn unwrap-before
               [context]
               (let [[_ payload :as event] (get-coeffect context :event)]
                 (if-not (and (= 2 (count event))
                              (map? payload))
                   (do
                     (console :warn "re-frame: \"unwrap\" interceptor requires event to be a 2-vector of [event-id payload-map]. Got " event)
                     context)
                   (assoc-coeffect context :event payload))))
    :after   (fn unwrap-after
               [context]
               (assoc-coeffect context :event (get-coeffect context :original-event)))))


(def trim-v
  (->interceptor
    :id      :trim-v
    :before  (fn trim-v-before
               [context]
               (if-not (vector? (get-coeffect context :event))
                 (do
                   (console :warn "re-frame: \"trim-v\" interceptor expected event to be a vector. Got a " (type (get-coeffect context :event)))
                   context)
                 (update-coeffect context :event subvec 1)))
    :after   (fn trim-v-after
               [context]
               (assoc-coeffect context :event (get-coeffect context :original-event)))))


;; -- Interceptor Factories - PART 1 ---------------------------------------------------------------
;;
;; These 3 factories wrap the 3 kinds of event handlers.
;;

(defn db-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-db`.

  These handlers take two arguments;  `db` and `event`, and they return `db`.

      (fn [db event]
         ....)

  So, the interceptor wraps the given handler:
     1. extracts two `:coeffects` keys: db and event
     2. calls handler-fn
     3. stores the db result back into context's `:effects`"
  [handler-fn]
  (->interceptor
    :id     :db-handler
    :before (fn db-handler-before
              [context]
              (let [new-context
                    (trace/with-trace
                      {:op-type   :event/handler
                       :operation (get-coeffect context :original-event)}
                      (let [{:keys [db event]} (get-coeffect context)]
                        (->> (handler-fn db event)
                             (assoc-effect context :db))))]
                ;; We merge these tags outside of the :event/handler trace because we want them to be assigned to the parent
                ;; wrapping trace.
                (trace/merge-trace!
                  {:tags {:effects   (get-effect new-context)
                          :coeffects (get-coeffect context)}})
                new-context))))


(defn fx-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-fx`.

  These handlers take two arguments;  `coeffects` and `event`, and they return `effects`.

      (fn [coeffects event]
         {:db ...
          :fx ...})

   Wrap handler in an interceptor so it can be added to (the RHS) of a chain:
     1. extracts `:coeffects`
     2. call handler-fn giving coeffects
     3. stores the result back into the `:effects`"
  [handler-fn]
  (->interceptor
    :id     :fx-handler
    :before (fn fx-handler-before
              [context]
              (let [new-context
                    (trace/with-trace
                      {:op-type   :event/handler
                       :operation (get-coeffect context :original-event)}
                      (let [{:keys [event] :as coeffects} (get-coeffect context)]
                        (->> (handler-fn coeffects event)
                             (assoc context :effects))))]
                (trace/merge-trace!
                  {:tags {:effects   (get-effect new-context)
                          :coeffects (get-coeffect context)}})
                new-context))))


(defn ctx-handler->interceptor
  "Returns an interceptor which wraps the kind of event handler given to `reg-event-ctx`.
  These advanced handlers take one argument: `context` and they return a modified `context`.
  Example:

      (fn [context]
         (enqueue context [more interceptors]))"
  [handler-fn]
  (->interceptor
    :id     :ctx-handler
    :before (fn ctx-handler-before
              [context]
              (let [new-context
                    (trace/with-trace
                      {:op-type   :event/handler
                       :operation (get-coeffect context :original-event)}
                      (handler-fn context))]
                (trace/merge-trace!
                  {:tags {:effects   (get-effect new-context)
                          :coeffects (get-coeffect context)}})
                new-context))))


;; -- Interceptors Factories -  PART 2 ------------------------------------------------------------


(defn path
  [& args]
  (let [path (flatten args)
        db-store-key :re-frame-path/db-store]    ;; this is where, within `context`, we store the original dbs
    (when (empty? path)
      (console :error "re-frame: \"path\" interceptor given no params"))
    (->interceptor
      :id      :path
      :before  (fn
                 [context]
                 (let [original-db (get-coeffect context :db)]
                   (-> context
                       (update db-store-key conj original-db)
                       (assoc-coeffect :db (get-in original-db path)))))
      :after   (fn [context]
                 (let [db-store     (db-store-key context)
                       original-db  (peek db-store)
                       new-db-store (pop db-store)
                       context'     (-> (assoc context db-store-key new-db-store)
                                        (assoc-coeffect :db original-db))     ;; put the original db back so that things like debug work later on
                       db           (get-effect context :db ::not-found)]
                   (if (= db ::not-found)
                     context'
                     (->> (assoc-in original-db path db)
                          (assoc-effect context' :db))))))))




(defn enrich
  [f]
  (->interceptor
    :id :enrich
    :after (fn enrich-after
             [context]
             (let [event (get-coeffect context :event)
                   db    (if (contains? (get-effect context) :db)
                           (get-effect context :db) ;; If no db effect is returned, we provide the original coeffect.
                           (get-coeffect context :db))]
               (->> (f db event)
                    (assoc-effect context :db))))))



(defn after
  [f]
  (->interceptor
    :id :after
    :after (fn after-after
             [context]
             (let [db    (if (contains? (get-effect context) :db)
                           (get-effect context :db)
                           (get-coeffect context :db))
                   event (get-coeffect context :event)]
               (f db event) ;; call f for side effects
               context)))) ;; context is unchanged

(defn  on-changes
  [f out-path & in-paths]
  (->interceptor
    :id    :on-changes
    :after (fn on-change-after
             [context]
             (let [new-db   (get-effect context :db)
                   old-db   (get-coeffect context :db)

                   ;; work out if any "inputs" have changed
                   new-ins      (map #(get-in new-db %) in-paths)
                   old-ins      (map #(get-in old-db %) in-paths)
                   ;; make sure the db is actually set in the effect
                   changed-ins? (and (contains? (get-effect context) :db)
                                     (some false? (map identical? new-ins old-ins)))]

               ;; if one of the inputs has changed, then run 'f'
               (if changed-ins?
                 (->> (apply f new-ins)
                      (assoc-in new-db out-path)
                      (assoc-effect context :db))
                 context)))))


(def inject-global-interceptors
  "An interceptor which adds registered global interceptors to the context's queue.

   NOTE: :queue is a Clojure.lang.PersistentQueue and not a vector."
  (->interceptor
    :id     :inject-global-interceptors
    :before (fn inject-global-interceptors-before
              [context]
              (update context :queue #(into (settings/get-global-interceptors) %)))))
