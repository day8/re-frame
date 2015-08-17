(ns re-frame.test.frame
  (:require-macros [cemerick.cljs.test :refer (is deftest testing)])
  (:require [cemerick.cljs.test]
            [re-frame.frame :as frame]))

(def log-transcript (atom {}))

(defn record-log-call [what args]
  (swap! log-transcript (fn [transcript]
                          (update transcript what
                            (fn [record]
                              (-> (or record {})
                                (update :counter inc)
                                (update :history conj (vec args))))))))

(defn last-log* [what]
  (last (get-in @log-transcript [what :history])))

(def last-log (partial last-log* :log))
(def last-warn (partial last-log* :warn))
(def last-error (partial last-log* :error))

(def recording-loggers
  {:log      (fn [& args] (record-log-call :log args))
   :warn     (fn [& args] (record-log-call :warn args))
   :error    (fn [& args] (record-log-call :error args))
   :group    (fn [& args] (record-log-call :group args))
   :groupEnd (fn [& args] (record-log-call :groupEnd args))})

(defn reset-log-recorder! []
  (reset! log-transcript {}))

(defn make-empty-test-frame []
  (frame/make-frame nil nil identity recording-loggers))

(defn process-single-event [frame event]
  (let [reducing-fn (fn
                      ([result] result)
                      ([_old-state new-state] new-state))]
    (let [xform (frame/get-frame-transducer frame)]
      (transduce xform reducing-fn nil [event]))))

(deftest frame-error-handling
  (testing "doing invalid subscription"
    (reset-log-recorder!)
    (let [frame (make-empty-test-frame)]
      (is (thrown-with-msg? js/Error #"expected a vector subscription, but got:" (frame/subscribe frame :non-vector)))))
  (testing "subscribing to non-existent subscription handler"
    (reset-log-recorder!)
    (let [frame (make-empty-test-frame)]
      (is (= (last-error) nil))
      (frame/subscribe frame [:subscription-which-does-not-exist])
      (is (= (last-error) ["re-frame: no subscription handler registered for: \"" :subscription-which-does-not-exist "\".  Returning a nil subscription."]))))
  (testing "calling handler which returns nil"
    (reset-log-recorder!)
    (let [my-handler (fn [_state _] nil)
          frame (-> (make-empty-test-frame)
                  (frame/register-event-handler :my-handler my-handler))]
      (is (= (last-error) nil))
      (is (= (process-single-event frame [:my-handler]) nil))
      (is (= (last-error) ["re-frame: your handler returned nil. It should return the new db state. Ignoring."])))))

(deftest frame-warning-handling
  (testing "overwriting subscription handler"
    (reset-log-recorder!)
    (let [frame (make-empty-test-frame)
          frame-with-some-handler (frame/register-subscription-handler frame :some-handler identity)]
      (is (= (last-warn) nil))
      (frame/register-subscription-handler frame-with-some-handler :some-handler (fn []))
      (is (= (last-warn) ["re-frame: overwriting subscription-handler for: " :some-handler]))))
  (testing "overwriting event handler"
    (reset-log-recorder!)
    (let [frame (make-empty-test-frame)
          frame-with-some-handler (frame/register-event-handler frame :some-handler identity)]
      (is (= (last-warn) nil))
      (frame/register-event-handler frame-with-some-handler :some-handler (fn []))
      (is (= (last-warn) ["re-frame: overwriting an event-handler for: " :some-handler])))))

(deftest frame-transduction
  (testing "simple transduce"
    (let [my-handler (fn [_state [event-id & args]] (str "result" event-id args))
          frame (-> (make-empty-test-frame)
                  (frame/register-event-handler :my-handler my-handler))]
      (is (= (process-single-event frame [:my-handler 1 2]) "result:my-handler(1 2)")))))
