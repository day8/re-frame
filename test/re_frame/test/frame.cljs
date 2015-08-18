(ns re-frame.test.frame
  (:require-macros [cemerick.cljs.test :refer (is deftest testing)]
                   [reagent.ratom :refer [reaction run!]])
  (:require [cemerick.cljs.test]
            [re-frame.frame :as frame]
            [re-frame.test.utils.log-recording :refer [recording-loggers reset-log-recorder! last-error last-warn last-log]]
            [reagent.core :as reagent]))

(defn make-test-frame-with-log-recording []
  (frame/make-frame nil nil recording-loggers))

(deftest frame-errors
  (testing "doing invalid subscription"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)]
      (is (thrown-with-msg? js/Error #"expected a vector subscription, but got:" (frame/subscribe frame :non-vector)))))
  (testing "subscribing to a non-existent subscription handler"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)]
      (is (= (last-error) nil))
      (frame/subscribe frame [:subscription-which-does-not-exist])
      (is (= (last-error) ["re-frame: no subscription handler registered for: \"" :subscription-which-does-not-exist "\".  Returning a nil subscription."]))))
  (testing "calling a handler which returns nil"
    (reset-log-recorder!)
    (let [my-handler (fn [_state _] nil)
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :my-handler my-handler))]
      (is (= (last-error) nil))
      (is (= (frame/process-event frame nil [:my-handler]) nil))
      (is (= (last-error) ["re-frame: your handler returned nil. It should return the new db state. Ignoring."]))))
  (testing "calling a handler which does not exist"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)]
      (is (= (last-error) nil))
      (is (= (frame/process-event frame nil [:non-existing-handler]) nil))
      (is (= (last-error) ["re-frame: no event handler registered for: \"" :non-existing-handler "\". Ignoring."])))))

(deftest frame-warnings
  (testing "overwriting subscription handler"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)
          frame-with-some-handler (frame/register-subscription-handler frame :some-handler identity)]
      (is (= (last-warn) nil))
      (frame/register-subscription-handler frame-with-some-handler :some-handler (fn []))
      (is (= (last-warn) ["re-frame: overwriting subscription handler for: " :some-handler]))))
  (testing "overwriting event handler"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)
          frame-with-some-handler (frame/register-event-handler frame :some-handler identity)]
      (is (= (last-warn) nil))
      (frame/register-event-handler frame-with-some-handler :some-handler (fn []))
      (is (= (last-warn) ["re-frame: overwriting an event handler for: " :some-handler]))))
  (testing "unregistering subscription handler which does not exist"
    (reset-log-recorder!)
    (let [frame (make-test-frame-with-log-recording)]
      (is (= (last-warn) nil))
      (frame/unregister-subscription-handler frame :non-existing-handler)
      (is (= (last-warn) ["re-frame: unregistering subscription handler \"" :non-existing-handler "\" which does not exist."])))))

(deftest frame-event-handlers
  (testing "unregister event handler"
    (let [frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :some-handler identity))]
      (is (= (get-in frame [:handlers :some-handler]) identity))
      (is (= (get-in (frame/unregister-event-handler frame :some-handler) [:handlers :some-handler] ::not-found) ::not-found))))
  (testing "clear event handlers"
    (let [frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :some-handler identity))]
      (is (= (count (get frame :handlers)) 1))
      (is (= (count (get (frame/clear-event-handlers frame) :handlers)) 0)))))

(deftest frame-subscription-handlers
  (testing "unregister subscription handler"
    (let [frame (-> (make-test-frame-with-log-recording)
                  (frame/register-subscription-handler :some-handler identity))]
      (is (= (get-in frame [:subscriptions :some-handler]) identity))
      (is (= (get-in (frame/unregister-subscription-handler frame :some-handler) [:subscriptions :some-handler] ::not-found) ::not-found))))
  (testing "clear subscription handlers"
    (let [frame (-> (make-test-frame-with-log-recording)
                  (frame/register-subscription-handler :some-handler identity))]
      (is (= (count (get frame :subscriptions)) 1))
      (is (= (count (get (frame/clear-subscription-handlers frame) :subscriptions)) 0)))))

(deftest frame-processing-events
  (testing "process event"
    (let [my-handler (fn [state [& args]] (str "state:" state " args:" args))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :my-handler my-handler))
          result (frame/process-event frame "[initial state]" [:my-handler 1 2])]
      (is (= result "state:[initial state] args:(:my-handler 1 2)"))))
  (testing "process multiple events, get vector of states back"
    (let [init-db 0
          add-handler (fn [state [_event-id num]] (+ state num))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :add add-handler))
          result (frame/process-events frame init-db [[:add 1] [:add 2] [:add 10]])]
      (is (= result [0 1 3 13]))))
  (testing "process event on atom"
    (let [db (atom 0)
          reset-counter (atom 0)
          _ (add-watch db ::watcher #(swap! reset-counter inc))
          add-handler (fn [state [_event-id num]] (+ state num))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :add add-handler))]
      (frame/process-event-on-atom frame db [:add 100])
      (is (= @db 100))
      (is (= @reset-counter 1))))
  (testing "process multiple events on atom"
    (let [db (atom 0)
          reset-counter (atom 0)
          _ (add-watch db ::watcher #(swap! reset-counter inc))
          add-handler (fn [state [_event-id num]] (+ state num))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :add add-handler))]
      (frame/process-events-on-atom frame db [[:add 1] [:add 2]])
      (is (= @db 3))
      (is (= @reset-counter 2))))
  (testing "process multiple events on atom with coallesced write"
    (let [db (atom 0)
          reset-counter (atom 0)
          _ (add-watch db ::watcher #(swap! reset-counter inc))
          add-handler (fn [state [_event-id num]] (+ state num))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-event-handler :add add-handler))]
      (frame/process-events-on-atom-with-coallesced-write frame db [[:add 1] [:add 2]])
      (is (= @db 3))
      (is (= @reset-counter 1)))))

(deftest frame-subscriptions
  (testing "register subscription handler and trigger it"
    (let [source (reagent/atom 0)
          target (atom nil)
          source-adder (fn [_sub-id num] (reaction (+ @source num)))
          frame (-> (make-test-frame-with-log-recording)
                  (frame/register-subscription-handler :source-adder source-adder))
          subscription (frame/subscribe frame [:source-adder 10])]
      (is (= @target nil))
      (run! (reset! target @subscription))
      (is (= @target 10))
      (swap! source inc)
      (is (= @target 11)))))
