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

;; Auto-generated dispatch correlation. `handle` allocates and publishes
;; a real id only when tracing is enabled (the parent-id read and UUID
;; allocation are gated on `(trace/is-trace-enabled?)`).
;; Downstream `:fx [:dispatch ...]` calls read this var to tag their
;; queued events with `:re-frame/parent-dispatch-id` metadata; the
;; child's `handle` reads the meta back and emits
;; `:parent-dispatch-id` on its `:event` trace. See
;; `re-frame.router/dispatch` for the propagation half.
(def ^:dynamic *current-dispatch-id* nil)

;; Hook for callers that need to learn the just-allocated dispatch-id
;; deterministically. When `binding`-ed to an atom, `handle` `reset!`s
;; that atom with the freshly-allocated dispatch-id BEFORE the trace
;; runs, so downstream cb fires (sync on JVM, debounced on JS) can match
;; by id from the start. Used by `re-frame.router/dispatch-and-settle`
;; to identify the root of its cascade WITHOUT relying on event-vector
;; equality against the trace stream — vector equality is ambiguous when
;; two callers dispatch the same vector concurrently.
;; Gated on `(trace/is-trace-enabled?)` (same gate as dispatch-id
;; allocation itself); production trace-off paths read nothing from
;; this var.
(def ^:dynamic *dispatch-id-capture* nil)

(defn- new-dispatch-id []
  #?(:cljs (random-uuid)
     :clj  (UUID/randomUUID)))

(defn handle
  "Given an event vector `event-v`, look up the associated interceptor chain, and execute it."
  [event-v]
  (let [event-id (first-in-vector event-v)]
    (if-let [interceptors (get-handler kind event-id true)]
      (if *handling*
        (console :error "re-frame: while handling" *handling* ", dispatch-sync was called for" event-v ". You can't call dispatch-sync within an event handler.")
        (let [dispatch-id (when (trace/is-trace-enabled?)
                            (new-dispatch-id))
              parent-id   (when dispatch-id
                            (:re-frame/parent-dispatch-id (meta event-v)))]
          (when (and dispatch-id *dispatch-id-capture*)
            (reset! *dispatch-id-capture* dispatch-id))
          (binding [*handling*           event-v
                    *current-dispatch-id* dispatch-id]
            (trace/with-trace {:operation event-id
                               :op-type   kind
                               ;; `:event/original` is the dispatched vector frozen at handle entry —
                               ;; pinned here once so consumers can recover what the user dispatched
                               ;; even if a future refactor lets interceptors rewrite the `:event` tag.
                               :tags      (cond-> {:event event-v}
                                            dispatch-id (assoc :event/original event-v
                                                               :dispatch-id    dispatch-id)
                                            parent-id (assoc :parent-dispatch-id parent-id))}
              (trace/merge-trace! {:tags {:app-db-before @app-db}})
              (interceptor/execute event-v interceptors)
              (trace/merge-trace! {:tags {:app-db-after @app-db}}))))))))
