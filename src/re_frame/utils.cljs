(ns re-frame.utils
  (:require [re-frame.logging :refer [log warn error]]))

(defn get-event-id
  [v]
  (if (vector? v)
    (first v)
    (throw (js/Error. (str "re-frame: expected a vector event, but got: " v)))))

(defn get-subscription-id
  [v]
  (if (vector? v)
    (first v)
    (throw (js/Error. (str "re-frame: expected a vector subscription, but got: " v)))))

(defn simple-inflection [base n]
  (if (= n 1) base (str base "s")))

(defn frame-summary-description [frame]
  (let [handlers-count (count (:handlers frame))
        subscriptions-count (count (:subscriptions frame))]
    (str
      handlers-count " " (simple-inflection "handler" handlers-count) ", "
      subscriptions-count " " (simple-inflection "subscription" subscriptions-count))))

;; -- composing middleware  -----------------------------------------------------------------------

(defn report-middleware-factories
  "See https://github.com/Day8/re-frame/issues/65"
  [frame v]
  (letfn [(name-of-factory
            [f]
            (-> f meta :re-frame-factory-name))
          (factory-names-in
            [v]
            (remove nil? (map name-of-factory v)))]
    (doseq [name (factory-names-in v)]
      (error frame "re-frame: \"" name "\" used incorrectly. Must be used like this \"(" name " ...)\", whereas you just used \"" name "\"."))))

(defn compose-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose the elements.
  v can have nested vectors, and will be flattened before \"comp\" is applied.
  For convienience, if v is a function (assumed to be middleware already), just return it.
  Filtering out nils allows us to create Middleware conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [frame what]
  (let [spec (if (seqable? what) (seq what) what)]
    (cond
      (fn? spec) spec                                       ;; assumed to be existing middleware
      (seq? spec) (let [middlewares (remove nil? (flatten spec))]
                    (report-middleware-factories frame middlewares)
                    (apply comp middlewares))
      :else (do
              (warn frame "re-frame: comp-middleware expects a vector, got: " what)
              nil))))


;; -- event processing -----------------------------------------------------------------------

(defn handle-events-and-apply-results-to-atom [frame-transducer db-atom events]
  (let [reducing-fn (fn
                      ([db-atom] db-atom)                   ; completion
                      ([db-atom new-state]                  ; apply new-state to atom
                       (let [old-state @db-atom]
                         (if-not (identical? old-state new-state)
                           (reset! db-atom new-state)))
                       db-atom))]
    (transduce frame-transducer reducing-fn db-atom events)))

(defn handle-event-and-reset-atom [frame-transducer db-atom event]
  (let [reducing-fn (fn [db-atom new-state]                 ; apply new-state to atom
                      (let [old-state @db-atom]
                        (if-not (identical? old-state new-state)
                          (reset! db-atom new-state)))
                      db-atom)]
    ((frame-transducer reducing-fn) db-atom event)))
