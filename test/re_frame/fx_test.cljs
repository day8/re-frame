(ns re-frame.fx-test
  (:require
    [cljs.test :refer-macros [is deftest async use-fixtures]]
    [re-frame.core :as rf]
    [re-frame.fx]
    [re-frame.interop :refer [set-timeout!]]
    [re-frame.loggers :as log]
    [clojure.string :as str]))

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

(deftest dispatch-later-event-vector
  (let [seen-events (atom [])]
    ;; Setup and exercise effects handler with :dispatch-later.
    (rf/reg-event-fx
      ::later-test
      (fn [_world _event-v]
        (rf/reg-event-db
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
      (rf/dispatch [::later-test]))))

(deftest dispatch-later-event-map
  (let [seen-events (atom [])]
    ;; Setup and exercise effects handler with :dispatch-later.
    (rf/reg-event-fx
      ::later-test
      (fn [_world _event]
        (rf/reg-event-db
          ::watcher
          (fn [db {:keys [token]}]
            (is (#{:event-map1 :event-map2 :event-map3} token) "unexpected: token passed through")
            (swap! seen-events #(conj % token))
            db))
        {:dispatch-later [{:ms 100 :dispatch {::rf/eid ::watcher
                                              :token :event-map1}}
                          {:ms 200 :dispatch {::rf/eid ::watcher
                                              :token :event-map2}}
                          {:ms 200 :dispatch {::rf/eid ::watcher
                                              :token :event-map3}}]}))

    (async done
      (set-timeout!
        (fn []
          (is (= @seen-events [:event-map1 :event-map2 :event-map3]) "All 3 events should have fired in order")
          (done))
        1000)
      ;; kick off main handler
      (rf/dispatch [::later-test]))))

(rf/reg-event-fx
  ::missing-handler-test
  (fn [_world _event-v]
    {:fx-not-exist [:nothing :here]}))

(deftest report-missing-handler-event-vector
  (let [logs             (atom [])
        log-fn           (fn [& args] (swap! logs conj (str/join args)))
        original-loggers (log/get-loggers)]
    (try
      (log/set-loggers! {:warn log-fn})
      (rf/dispatch-sync [::missing-handler-test])
      (is (re-matches #"re-frame: no handler registered for effect::fx-not-exist. Ignoring." (first @logs)))
      (is (= (count @logs) 1))
      (finally
        (log/set-loggers! original-loggers)))))

(deftest report-missing-handler-event-map
  (let [logs             (atom [])
        log-fn           (fn [& args] (swap! logs conj (str/join args)))
        original-loggers (log/get-loggers)]
    (try
      (log/set-loggers! {:warn log-fn})
      (rf/dispatch-sync {::rf/eid ::missing-handler-test})
      (is (re-matches #"re-frame: no handler registered for effect::fx-not-exist. Ignoring." (first @logs)))
      (is (= (count @logs) 1))
      (finally
        (log/set-loggers! original-loggers)))))
