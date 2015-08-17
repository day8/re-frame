(ns re-frame.utils)

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
