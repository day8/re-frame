(ns re-frame.cofx
  (:require
    [re-frame.db           :refer [app-db]]
    [re-frame.interceptor  :refer [->interceptor]]
    [re-frame.registrar    :refer [get-handler register-handler]]
    [re-frame.loggers      :refer [console]]))


;; -- Registration ------------------------------------------------------------

(def kind :cofx)
(assert (re-frame.registrar/kinds kind))

(defn reg-cofx
  [id handler]
  (register-handler kind id handler))


;; -- Interceptor -------------------------------------------------------------

(defn inject-cofx
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


