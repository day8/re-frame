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
