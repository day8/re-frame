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
  "Register the given coeffect `handler` for the given coeffect `id`.

  `id` is keyword, often namespaced.
  `handler` is a function which takes either one or two values, the first of which is
  always `context` and which returns an updated `context`.

  Please see the docs for `inject-cofx` for example use."
  [id handler]
  (register-handler kind id handler))


;; -- Interceptor -------------------------------------------------------------

(defn inject-cofx
  "Given an `id`, and an optional, arbitrary `value`, returns an interceptor
   whose `:before` adds to the `:coeffects` (map) by calling a pre-registered
   'coeffect handler' identified by the `id`.

   It is expected that a `coeffect handler` will previously have been registered
   for the given `id`, via a call to `re-frame.core/reg-cofx`.

   The `coeffect handler` (identified by `id`) will be called (at `:before` time)
   with two arguments:
     - the current value of `:coeffects`
     - optionally, the originally supplied arbitrary `value`

   This `coeffect handler` is expected to modify and return its first argument.

   Example Use
   -----------

   1. Early in app startup, you register a `coeffect handler` for `:datetime`:

      (re-frame.core/reg-cofx
        :datetime                        ;; usage  (inject-cofx :datetime)
        (fn coeffect-handler
          [coeffect]
          (assoc coeffect :now (js/Date.))))   ;; modify and return first arg

   2. Later, add an interceptor to an -fx event handler, using `inject-cofx`:

      (re-frame.reg-event-fx
         :event-id
         [ ... (inject-cofx :datetime) ... ]    ;; <-- create an injecting interceptor
         (fn event-handler
           [coeffect event]
           ... can access (:now coeffect) to obtain current datetime ... )))

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
               (update context :coeffects (get-handler kind id)))))
  ([id value]
   (->interceptor
     :id     :coeffects
     :before  (fn coeffects-before
                [context]
                (update context :coeffects (get-handler kind id) value)))))


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


