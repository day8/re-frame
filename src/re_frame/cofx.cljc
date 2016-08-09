(ns re-frame.cofx
  (:require
    [re-frame.db           :refer [app-db]]
    [re-frame.interceptor  :refer [->interceptor]]
    [re-frame.registrar    :refer [get-handler clear-handlers register-handler]]
    [re-frame.loggers      :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def kind :cofx)
(assert (re-frame.registrar/kinds kind))
(def register  (partial register-handler kind))

;; -- Interceptor -------------------------------------------------------------

(defn coeffect
  "An interceptor which adds to a `context's` `:coeffects`.

  `coeffects` are the input resources required by an event handler
   to perform its job. The two most obvious ones are `db` and `event`.
   But sometimes a handler might need other resources.

   Perhaps a handler needs a random number or a GUID or the current datetime.
   Perhaps it needs access to an in-memory DataScript database.

   If the handler directly access these resources, it stops being as
   pure. It immedaitely becomes harder to test, etc.

   So the necessary resources are \"injected\" into the `coeffect` (map)
   given the handler.

   Given one or more `ids`, this function will iterately lookup the
   registered coeffect handlers (via `reg-cofx`) and call each of them
   giving the current `:coeffect` as an argument, and expecting a
   modified coeffect to be returned.
   "
  ;; Why?  We want our handlers to be pure. If a handler calls `js/Date.`  then
  ;; it stops being as pure. It is harder to test.
  ;;
  ;; And what if a handler needs a random number?  Or a GUID? These kinds of input resources are
  ;; termed `coeffects` (sometimes called side-causes).
  [& ids]
  (->interceptor
    :name   :coeffects
    :before  (fn coeffects-before
               [context]
               (let [orig-coeffect (:coeffects context)
                     run-id        (fn [coeffect id]
                                     ((get-handler kind id) coeffect))
                     new-coeffect  (reduce run-id orig-coeffect ids)]
                 (assoc context :coeffects new-coeffect)))))


;; -- Standard Builtin CoEffects Handlers  --------------------------------------------------------

;; :db
;;
;; Adds to coeffects the value in `app-db`, under the key `:db`
(register
  :db
  (fn db-coeffects-handler
    [coeffects]
    (assoc coeffects :db @app-db)))


;; this interceptor is so commonly used that we reify it
(def add-db (coeffect :db))


;; XXX what about a coeffect which reads LocalStore. Use in todomvc example.

;; -- Example  ------------------------------------------------------------------------------------

;; An example coeffect handler, which adds the current datetime under
;; the `:now` key.
;;
;; Example Usage:
;;   (reg-event-fx                    ;;  `-fx` variant used in registration
;;     :some-id
;;     [(coeffect :now) debug]        ;; notice (coeffect :now) is in interceptors
;;       (fn [coeffects event]        ;; -fx handlers are given the entire coeffect as 1st argument
;;         (let [dt (:now coeffects)] ;; `:now` is available
;;            ...)))
;;
;; As a further exercise, consider how you would write a `random` interceptor which adds a random
;; number into a handler's coeffect?
#_(register
    :now
    (fn now-coeffects-handler
      [coeffects]
      (assoc coeffects :now (js/Date.))))
