(ns re-frame.event-test
  (:require [cljs.test         :refer-macros [is deftest]]
            [re-frame.db       :as db]
            [re-frame.core     :as re-frame]))

;=====test basic subscriptions  ======

;; disabled as it doesn't really test anything
#_(deftest test-event-def
  "tests that an error thrown generates an informational warning"
  (re-frame/clear-all-events!)

  (re-frame/reg-event-db
    :test-event
    (fn [db [event-kw stack]]
      (throw (js/Error. "thrown in handler"))
      db))

  (defn test-fn1
    []
    (re-frame/dispatch [:test-event]))

  (defn test-fn2
    []
    (test-fn1))

  (test-fn2)
  )


