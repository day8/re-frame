(ns re-frame.core
  (:require
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.middleware :as middleware]))


;; --  API  -------

(def register-handler handlers/register)
(def dispatch         handlers/dispatch)
(def dispatch-sync    handlers/dispatch-sync)

(def register-sub  subs/register)
(def subscribe     subs/subscribe)



(def noop        middleware/noop)
(def pure        middleware/pure)
(def debug       middleware/debug)
(def undoable    middleware/undoable)
(def path        middleware/path)
(def validate    middleware/validate)
(def trim-v      middleware/trim-v)
; (def log-events  middleware/log-events)



;; --  Convienience  -------

;; virtually ever handler will be pure, make it easy
(defn register-pure-handler
  ([id handler]
    (register-handler id pure handler))
  ([id middleware handler]
    (register-handler id [pure middleware] handler)))


(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use comp to compose.
  v can  be vectors of vectors and will be flattended before use.
  For convienience, if v turns out to already be a function, just return it."
  [v]
  (if (ifn? v)     ;; noop if v is a fucntion
    v
    (do
      (assert  (or (vector? v) (list v))
               (str "re-frame:  compose expects a vector, got: " v))
      (let [v (remove nil? (flatten v))]
        (cond
          (empty? v)       noop
          (= 1 (count v))  (first v)
          :else            (apply comp v))))))

