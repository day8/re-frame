(ns re-frame.handlers
  (:require [re-frame.db         :refer [app-db]]
            [re-frame.utils      :refer [first-in-vector warn]]))


;; -- composing middleware  -----------------------------------------------------------------------

(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose the elements.
  v can have nested vectors, and will be flattened before \"comp\" is applied.
  For convienience, if v is a function (assumed to be middleware already), just return it.
  Filtering out nils allows us to create Middleware conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [v]
  (cond
    (fn? v)       v  ;; assumed to be existing middleware
    (vector? v)   (let [v (remove nil? (flatten v))]
                    (cond
                      (empty? v)       identity     ;; no-op middleware
                      (= 1 (count v))  (first v)    ;; only one middleware, no composing needed
                      :else            (apply comp v)))
    :else         (warn "re-frame: comp-middleware expects a vector, got: " v)))


;; -- the register of event handlers --------------------------------------------------------------

(def ^:private id->fn  (atom {}))


(defn lookup-handler
  [event-id]
  (get @id->fn event-id))


(defn clear-handlers!
  "Unregister all event handlers"
  []
  (reset! id->fn {}))


(defn register-base
  "register a handler for an event.
  This is low level and it is expected that \"re-frame.core/register-handler\" would
  generally be used."
  ([event-id handler-fn]
    (when (contains? @id->fn event-id)
      (warn "re-frame: overwriting an event-handler for: " event-id))   ;; allow it, but warn.
    (swap! id->fn assoc event-id handler-fn))

  ([event-id middleware handler-fn]
    (let  [mid-ware    (comp-middleware middleware)   ;; compose the middleware
           midware+hfn (mid-ware handler-fn)]         ;; wrap the handler in the middleware
      (register-base event-id midware+hfn))))




;; -- lookup and call -----------------------------------------------------------------------------

(def ^:dynamic *handling* nil)    ;; remember what event we are currently handling


(defn handle
  "Given an event vector, look up the handler, then call it.
  By default, handlers are not assumed to be pure. They are called with
  two paramters:
    - the `app-db` atom
    - the event vector
  The handler is assumed to side-effect on `app-db` - the return value is ignored.
  To write a pure handler, use the \"pure\" middleware when registering the handler."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (lookup-handler event-id)]
    (if (nil? handler-fn)
      (warn "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")   ;; TODO: make exception
      (if  *handling*
        (warn "re-frame: in the middle of handling \""  *handling*  "\"  tried to handle \"" event-v "\"")
        (binding [*handling*  event-v]
          (handler-fn app-db event-v))))))

