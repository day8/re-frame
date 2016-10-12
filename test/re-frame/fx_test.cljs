(ns re-frame.fx-test
  (:require
    [cljs.test :refer-macros [is deftest async use-fixtures]]
    [cljs.core.async :as async :refer [<! timeout]]
    [clojure.string :as str]
    [re-frame.core :as re-frame]
    [re-frame.fx]
    [re-frame.loggers :as log]
    [re-frame.interop :refer [set-timeout!]])
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
    ;; Setup and exercise effects handler with :dispatch-later.
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
  ::dispatch-debounce-test
  (fn [_world [_ dispatches] _event-v]
    {:dispatch-debounce dispatches}))

(re-frame/reg-event-fx
  ::typeahead-search
  (fn [_world [_ typeahead-val seen-events]]
    (swap! seen-events conj typeahead-val)
    nil))

(deftest dispatch-debounce-simple-test
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (<! (timeout 10))
        (is (= @seen-events []))
        (<! (timeout 20))
        (is (= @seen-events ["a"]))
        (done)))))

(deftest dispatch-debounce-2-events
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (<! (timeout 10))
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "ab")])
        (<! (timeout 17))
        (is (= @seen-events []))
        (<! (timeout 5))
        (is (= @seen-events ["ab"]))
        (done)))))

(deftest dispatch-debounce-coll-test
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (re-frame/dispatch [::dispatch-debounce-test [(debounce-fx "ab") (debounce-fx "abc") (debounce-fx "abcd") (debounce-fx "abcde")]])
        (<! (timeout 17))
        (is (= @seen-events []))
        (<! (timeout 5))
        (is (= @seen-events ["abcde"]))
        (done)))))

(deftest dispatch-debounce-repeated-test
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (<! (timeout 22))

        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "ab")])
        (is (= @seen-events ["a"]))
        (<! (timeout 22))

        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "abc")])
        (is (= @seen-events ["a" "ab"]))
        (<! (timeout 22))

        (is (= @seen-events ["a" "ab" "abc"]))
        (done)))))

(deftest dispatch-debounce-multiple-events
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [id typeahead-val]
                          {:id id :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test [(debounce-fx ::search1 "a")
                                                      (debounce-fx ::search2 "x")]])
        (<! (timeout 10))
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx ::search1 "ab")])
        (<! (timeout 17))
        (is (= @seen-events ["x"]))
        (<! (timeout 5))
        (is (= @seen-events ["x" "ab"]))
        (done)))))

(deftest dispatch-cancel-test
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (<! (timeout 17))
        (re-frame/dispatch [::dispatch-debounce-test {:id     ::search
                                                      :action :cancel}])
        (<! (timeout 5))
        (is (= @seen-events []))
        (done)))))

(deftest dispatch-flush-test
  (async done
    (go
      (let [seen-events (atom [])
            debounce-fx (fn [typeahead-val]
                          {:id ::search :dispatch [::typeahead-search typeahead-val seen-events] :timeout 20})]
        (re-frame/dispatch [::dispatch-debounce-test (debounce-fx "a")])
        (<! (timeout 5))
        (re-frame/dispatch [::dispatch-debounce-test {:id     ::search
                                                      :action :flush}])
        (<! (timeout 0))
        (is (= @seen-events ["a"]))
        (<! (timeout 17))
        (is (= @seen-events ["a"]))
        (done)))))

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
