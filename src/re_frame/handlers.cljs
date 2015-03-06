(ns re-frame.handlers
  (:require [re-frame.db         :refer [app-db]]
            [re-frame.utils      :refer [first-in-vector warn]]))


;; -- composing middleware  -----------------------------------------------------------------------

(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose the elements.
  v can have nested vectors, and will be flattended before \"comp\" is applied.
  For convienience, if v a function (assumed to be middleware already), just return it.
  Filtering out nils allows us to create Middlewhere conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [v]
  (cond
    (fn? v)       v  ;; assumed to be existing middleware
    (vector? v)   (let [v (remove nil? (flatten v))]
                    (cond
                      (empty? v)       identity     ;; noop middleware
                      (= 1 (count v))  (first v)    ;; only one middleware, no composing needed
                      :else            (apply comp v)))
    :else         (warn "re-frame: comp-middleware expects a vector, got: " v)))


;; -- the register of event handlers --------------------------------------------------------------

(def ^:private id->fn  (atom {}))


(defn lookup-handler
  [event-id]
  (get @id->fn event-id))


(defn register-base
  "register a handler for an event.
  This is low level and it is expected that \"register-handler\" would
  generally be used, see re-frame.core."
  ([event-id handler-fn]
    (when (contains? @id->fn event-id)
      (warn "re-frame: overwriting an event-handler for: " event-id))   ;; allow it, but warn.
    (swap! id->fn assoc event-id handler-fn))

  ([event-id middleware handler-fn]
    (let  [mid-ware  (comp-middleware middleware)   ;; compose the middleware
           hander-fn (mid-ware handler-fn)]         ;; wrap the handler in the middleware
      (register-base event-id hander-fn))))




;; -- lookup and call -----------------------------------------------------------------------------

(defn handle
  "Given an event vector, look up the handler, then call it.
  By default, handlers are not assumed to be pure. They are called with
  two paramters:
    - the `app-db` atom and
    - the event vector
  The handler is assumed to side-effect on the given atom, the return value is ignored.
  To write pure handlers, use the \"pure\" middleware when registering the handler."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (lookup-handler event-id)]
    (if (nil? handler-fn)
      (warn "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")   ;; TODO: make exception
      (try
        (handler-fn app-db event-v)
        (catch :default e
          (do
            ;; use of a core.async loop seems to completely ruin exception stacks.
            ;; So we're going print the exception to the console here, before it gets trashed.
            (.error js/console e)
            (throw e)))))))


