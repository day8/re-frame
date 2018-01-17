(ns re-frame.cofx
  (:require
    [re-frame.db           :refer [app-db]]
    [re-frame.interceptor  :refer [->interceptor]]
    [re-frame.registrar    :refer [get-handler clear-handlers register-handler]]
    [re-frame.loggers      :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def kind :cofx)
(assert (re-frame.registrar/kinds kind))

(defn reg-cofx
  "Register the given coeffect `handler` for the given `id`, for later use
  within `inject-cofx`.

  `id` is keyword, often namespaced.
  `handler` is a function which takes either one or two arguements, the first of which is
  always `coeffects` and which returns an updated `coeffects`.

  See the docs for `inject-cofx` for example use."
  [id handler]
  (register-handler kind id handler))


;; -- Interceptor -------------------------------------------------------------

(defn inject-cofx
  "Given an `id`, and an optional, arbitrary `value`, returns an interceptor
   whose `:before` adds to the `:coeffects` (map) by calling a pre-registered
   'coeffect handler' identified by the `id`.

   The previous association of a `coeffect handler` with an `id` will have
   happened via a call to `re-frame.core/reg-cofx` - generally on program startup.

   Within the created interceptor, this 'looked up' `coeffect handler` will
   be called (within the `:before`) with two arguments:
     - the current value of `:coeffects`
     - optionally, the originally supplied arbitrary `value`

   This `coeffect handler` is expected to modify and return its first, `coeffects` argument.

   Example Of how `inject-cofx` and `reg-cofx` work together
   ---------------------------------------------------------

   1. Early in app startup, you register a `coeffect handler` for `:datetime`:

      (re-frame.core/reg-cofx
        :datetime                        ;; usage  (inject-cofx :datetime)
        (fn coeffect-handler
          [coeffect]
          (assoc coeffect :now (js/Date.))))   ;; modify and return first arg

   2. Later, add an interceptor to an -fx event handler, using `inject-cofx`:

      (re-frame.core/reg-event-fx        ;; we are registering an event handler
         :event-id
         [ ... (inject-cofx :datetime) ... ]    ;; <-- create an injecting interceptor
         (fn event-handler
           [coeffect event]
           ... in here can access (:now coeffect) to obtain current datetime ... )))

   Background
   ----------

   `coeffects` are the input resources required by an event handler
   to perform its job. The two most obvious ones are `db` and `event`.
   But sometimes an event handler might need other resources.

   Perhaps an event handler needs a random number or a GUID or the current
   datetime. Perhaps it needs access to a DataScript database connection.

   If an event handler directly accesses these resources, it stops being
   pure and, consequently, it becomes harder to test, etc. So we don't
   want that.

   Instead, the interceptor created by this function is a way to 'inject'
   'necessary resources' into the `:coeffects` (map) subsequently given
   to the event handler at call time."
  ([id]
  (->interceptor
    :id      :coeffects
    :before  (fn coeffects-before
               [context]
               (if-let [handler (get-handler kind id)]
                 (update context :coeffects handler)
                 (console :error "No cofx handler registered for" id)))))
  ([id value]
   (->interceptor
     :id     :coeffects
     :before  (fn coeffects-before
                [context]
                (if-let [handler (get-handler kind id)]
                  (update context :coeffects handler value)
                  (console :error "No cofx handler registered for" id))))))


;; -- Builtin CoEffects Handlers  ---------------------------------------------

;; :db
;;
;; Adds to coeffects the value in `app-db`, under the key `:db`
(reg-cofx
  :db
  (fn db-coeffects-handler
    [coeffects]
    (assoc coeffects :db @app-db)))


;; Because this interceptor is used so much, we reify it
(def inject-db (inject-cofx :db))


