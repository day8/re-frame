(ns re-frame.registrar
  "In many places, re-frame asks you to associate an `id` (keyword)
  with a `handler` (function).  This namespace contains the
  central registry of such associations."
  (:require  [re-frame.interop :refer [debug-enabled?]]
             [re-frame.loggers :refer [console]]
             [re-frame.settings :as settings]))

;; kinds of handlers
(def kinds #{:event :fx :cofx :sub :error})

;; This atom contains a register of all handlers.
;; Contains a two layer map, keyed first by `kind` (of handler), and then `id` of handler.
;; Leaf nodes are handlers.
(defonce kind->id->handler  (atom {}))

(defn get-handler

  ([kind]
   (get @kind->id->handler kind))

  ([kind id]
   (-> (get @kind->id->handler kind)
       (get id)))

  ([kind id required?]
   (let [handler (get-handler kind id)]
     (when debug-enabled?                          ;; This is in a separate `when` so Closure DCE can run ...
       (when (and required? (nil? handler))        ;; ...otherwise you'd need to type-hint the `and` with a ^boolean for DCE.
         (console :error "re-frame: no" (str kind) "handler registered for:" id)))
     handler)))

(defn register-handler
  [kind id handler-fn]
  ;; Warn on duplicate registration. The figwheel/shadow-cljs hot-reload
  ;; path repeats registrations after page-load — silent there via the
  ;; `loaded?` gate. In production builds there is no hot-reload and a
  ;; repeat almost always indicates a real bug (typo, copy-paste, ns
  ;; load-order); warn unconditionally so it shows up in console.
  (when (and (get-handler kind id false)
             (or (not debug-enabled?)
                 (not (settings/loaded?))))
    (console :warn "re-frame: overwriting" (str kind) "handler for:" id))
  (swap! kind->id->handler assoc-in [kind id] handler-fn)
  handler-fn)    ;; note: returns the just registered handler

(defn -decorate-handler-meta!
  "Re-register the handler at [kind id] with `src-meta` attached as
   metadata. Used by the reg-event-db / reg-event-fx / reg-event-ctx /
   reg-sub / reg-fx macros to bake the call-site {:file :line} onto
   the registered value so `(meta (get-handler kind id))` returns it.

   No-op when the handler isn't registered. If the registered value
   doesn't implement IObj (some opaque IFn shapes), the with-meta call
   throws and we silently skip — the macro contract is best-effort.

   The leading dash signals 'internal, but reachable' — users opt in
   via the macros, not by calling this directly."
  [kind id src-meta]
  (when-let [handler (get-handler kind id)]
    (try
      ;; Event interceptor chains arrive as a lazy seq from `flatten`
      ;; and lazy seqs don't carry metadata; convert to a vector first
      ;; so the chain can take with-meta. Vectors and seqs behave
      ;; equivalently as inputs to interceptor/enqueue.
      (let [chain-or-fn (if (and (seq? handler) (not (vector? handler)))
                          (vec handler)
                          handler)]
        (swap! kind->id->handler assoc-in [kind id]
               (with-meta chain-or-fn src-meta)))
      (catch #?(:clj Exception :cljs :default) _
        ;; Some handler shapes can't carry metadata on this runtime.
        ;; Silent skip — the macro promise is best-effort.
        nil)))
  nil)

(defn clear-handlers
  ([]            ;; clear all kinds
   (reset! kind->id->handler {}))

  ([kind]        ;; clear all handlers for this kind
   (assert (kinds kind))
   (swap! kind->id->handler dissoc kind))

  ([kind id]     ;; clear a single handler for a kind
   (assert (kinds kind))
   (if (get-handler kind id)
     (swap! kind->id->handler update-in [kind] dissoc id)
     (console :warn "re-frame: can't clear" (str kind) "handler for" (str id ". Handler not found.")))))
