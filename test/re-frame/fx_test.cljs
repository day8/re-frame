(ns re-frame.fx-test
  (:require
    [cljs.test :refer-macros [is deftest async use-fixtures]]
    [re-frame.core :as re-frame]
    [re-frame.fx]
    [cljs.core.async :as async :refer [<! timeout]]
    [re-frame.interop :refer [set-timeout!]]
    [re-frame.loggers :as log]
    [clojure.string :as str])
  (:require-macros [cljs.core.async.macros :refer [go]]))

;; ---- FIXTURES ---------------------------------------------------------------

;; This fixture uses the re-frame.core/make-restore-fn to checkpoint and reset
;; to cleanup any dynamically registered handlers from our tests.
(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)]
    {:before #(reset! restore-re-frame (re-frame.core/make-restore-fn))
     :after  #(@restore-re-frame)}))

(use-fixtures :each (fixture-re-frame))

;; ---- TESTS ------------------------------------------------------------------

(deftest dispatch-later
  (let [seen-events (atom [])]
    ;; Setup and excercise effects handler with :dispatch-later.
    (re-frame/reg-event-fx
      ::later-test
      (fn [_world _event-v]
        (re-frame/reg-event-db
          ::watcher
          (fn [db [_ token]]
            (is (#{:event1 :event2 :event3} token) "unexpected: token passed through")
            (swap! seen-events #(conj % token))
            db))
        {:dispatch-later [{:ms 100 :dispatch [::watcher :event1]}
                          {:ms 200 :dispatch [::watcher :event2]}
                          {:ms 200 :dispatch [::watcher :event3]}]}))

    (async done
      (set-timeout!
        (fn []
          (is (= @seen-events [:event1 :event2 :event3]) "All 3 events should have fired in order")
          (done))
        1000)
      ;; kick off main handler
      (re-frame/dispatch [::later-test]))))

(re-frame/reg-event-fx
  ::missing-handler-test
  (fn [_world _event-v]
    {:fx-not-exist [:nothing :here]}))

(deftest report-missing-handler
  (let [logs             (atom [])
        log-fn           (fn [& args] (swap! logs conj (str/join args)))
        original-loggers (log/get-loggers)]
    (try
      (log/set-loggers! {:error log-fn})
      (re-frame/dispatch-sync [::missing-handler-test])
      (is (re-matches #"re-frame: no :fx handler registered for::fx-not-exist" (first @logs)))
      (is (= (count @logs) 1))
      (finally
        (log/set-loggers! original-loggers)))))



(re-frame/reg-event-fx
 ::throttle-test
 (fn [world [_ dispatches]]
   {:dispatch-throttle dispatches}))

(re-frame/reg-event-fx
 ::type-ahead-search
 (fn [world [_ event events-seen]]
   (swap! events-seen conj event)
   nil))

(deftest dispatch-throttle-only-leading
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-only-leading
                                    :window-duration 50
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test (throttled-event "a")])
             (<! (timeout 10))
             (is (= @seen-events ["a"]))
             (done)))))

(deftest dispatch-throttle-only-trailing
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-only-trailing
                                    :window-duration 50
                                    :leading? false
                                    :trailing? true
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test (throttled-event "a")])
             (<! (timeout 10))
             (is (= @seen-events []))
             (<! (timeout 60))
             (is (= @seen-events ["a"]))
             (done)))))



(deftest dispatch-throttle-leading-and-trailing
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-leading-and-trailing
                                    :window-duration 50
                                    :leading? true
                                    :trailing? true
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test (throttled-event "a")])
             (re-frame/dispatch [::throttle-test (throttled-event "b")])
             (re-frame/dispatch [::throttle-test (throttled-event "c")])
             (<! (timeout 10))
             (is (= @seen-events ["a"]))
             (<! (timeout 50))
             (is (= @seen-events ["a" "c"]))
             (done)))))


(deftest dispatch-throttle-leading-and-trailing-only-one-event
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-leading-and-trailing-only-one-event
                                    :window-duration 50
                                    :leading? true
                                    :trailing? true
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test (throttled-event "a")])
             (<! (timeout 10))
             (is (= @seen-events ["a"] ))
             (<! (timeout 50))
             (is (= @seen-events ["a"] ))
             (done)))))


(deftest dispatch-throttle-coll-leading-and-trailing
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-coll-leading-and-trailing
                                    :window-duration 50
                                    :leading? true
                                    :trailing? true
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test [(throttled-event "a") (throttled-event "b") (throttled-event "c")]] )
             (<! (timeout 10))
             (is (= @seen-events ["a"]))
             (<! (timeout 50))
             (is (= @seen-events ["a" "c"]))
             (done)))))


(deftest dispatch-throttle-cancel
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-cancel
                                    :window-duration 50
                                    :trailing? true
                                    :leading? false
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test [(throttled-event "a") (throttled-event "b") (throttled-event "c")]] )
             (<! (timeout 10))
             (re-frame/dispatch [::throttle-test {:action :cancel
                                                  :id ::dispatch-throttle-cancel}])
             (<! (timeout 50))
             (is (= @seen-events []))
             (done)))))



(deftest dispatch-throttle-flush
  (async done
         (go
           (let [seen-events (atom [])
                 throttled-event (fn[event]
                                   {:id ::dispatch-throttle-flush
                                    :window-duration 50
                                    :trailing? true
                                    :leading? false
                                    :dispatch [::type-ahead-search event seen-events]})]
             (re-frame/dispatch [::throttle-test [(throttled-event "a") (throttled-event "b") (throttled-event "c")]] )
             (<! (timeout 10))
             (re-frame/dispatch [::throttle-test {:action :flush
                                                  :id ::dispatch-throttle-flush}])

             (<! (timeout 0))
             (is (= @seen-events ["c"]))
             (<! (timeout 50))
             (is (= @seen-events ["c"]))
             (done)))))



