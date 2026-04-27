(ns re-frame.events
  (:require [re-frame.db          :refer [app-db]]
            [re-frame.utils       :refer [first-in-vector]]
            [re-frame.interop     :refer [empty-queue debug-enabled?]]
            [re-frame.registrar   :refer [get-handler register-handler]]
            [re-frame.loggers     :refer [console]]
            [re-frame.interceptor :as  interceptor]
            [re-frame.trace       :as trace :include-macros true])
  #?(:clj (:import [java.util UUID])))

(def kind :event)
(assert (re-frame.registrar/kinds kind))

(defn- flatten-and-remove-nils
  "`interceptors` might have nested collections, and contain nil elements.
  return a flat collection, with all nils removed.
  This function is 9/10 about giving good error messages."
  [id interceptors]
  (let [make-chain  #(->> % flatten (remove nil?))]
    (if-not debug-enabled?
      (make-chain interceptors)
      (do    ;; do a whole lot of development time checks
        (when-not (coll? interceptors)
          (console :error "re-frame: when registering" id ", expected a collection of interceptors, got:" interceptors))
        (let [chain (make-chain interceptors)]
          (when (empty? chain)
            (console :error "re-frame: when registering" id ", given an empty interceptor chain"))
          (when-let [not-i (first (remove interceptor/interceptor? chain))]
            (if (fn? not-i)
              (console :error "re-frame: when registering" id ", got a function instead of an interceptor. Did you provide old style middleware by mistake? Got:" not-i)
              (console :error "re-frame: when registering" id ", expected interceptors, but got:" not-i)))
          chain)))))

(defn register
  "Associate the given event `id` with the given collection of `interceptors`.

   `interceptors` may contain nested collections and there may be nils
   at any level,so process this structure into a simple, nil-less vector
   before registration.

   Typically, an `event handler` will be at the end of the chain (wrapped
   in an interceptor)."
  [id interceptors]
  (register-handler kind id (flatten-and-remove-nils id interceptors)))

;; -- handle event --------------------------------------------------------------------------------

(def ^:dynamic *handling* nil)    ;; remember what event we are currently handling

;; Auto-generated dispatch correlation. Bound by
;; `handle` for the duration of the interceptor chain so any
;; `:fx [:dispatch ...]` (or other downstream `dispatch` call)
;; fired from within can read it and tag its queued event with
;; this id as `:re-frame/parent-dispatch-id` metadata. See
;; `re-frame.router/dispatch` for the propagation half. Downstream
;; consumers (re-frame-pair's tagged-dispatch-sync! etc.) get the
;; "is this the user-fired event or a chained child?" answer for
;; free via the new `:dispatch-id` / `:parent-dispatch-id` trace
;; tags — no wrapper API needed.
(def ^:dynamic *current-dispatch-id* nil)

(defn- new-dispatch-id []
  #?(:cljs (random-uuid)
     :clj  (UUID/randomUUID)))

(defn handle
  "Given an event vector `event-v`, look up the associated interceptor chain, and execute it."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        ;; Read parent-id from event metadata
        ;; (set by `re-frame.router/dispatch` when the event was
        ;; queued from within another handler) and generate a
        ;; fresh id for this dispatch.
        parent-id   (:re-frame/parent-dispatch-id (meta event-v))
        dispatch-id (new-dispatch-id)]
    (if-let [interceptors  (get-handler kind event-id true)]
      (if *handling*
        (console :error "re-frame: while handling" *handling* ", dispatch-sync was called for" event-v ". You can't call dispatch-sync within an event handler.")
        (binding [*handling*           event-v
                  *current-dispatch-id* dispatch-id]
          (trace/with-trace {:operation event-id
                             :op-type   kind
                             :tags      (cond-> {:event       event-v
                                                 :dispatch-id dispatch-id}
                                          parent-id (assoc :parent-dispatch-id parent-id))}
            (trace/merge-trace! {:tags {:app-db-before @app-db}})
            (interceptor/execute event-v interceptors)
            (trace/merge-trace! {:tags {:app-db-after @app-db}})))))))


