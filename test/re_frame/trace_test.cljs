(ns re-frame.trace-test
  (:require [cljs.test :as test :refer-macros [is deftest testing]]
            [re-frame.trace :as trace :include-macros true]
            [re-frame.core :as rf]))

(def test-traces (atom []))

(test/use-fixtures :once {:before (fn []
                                    (trace/register-trace-cb :test
                                                             (fn [traces]
                                                               (doseq [trace traces]
                                                                 (swap! test-traces conj trace)))))
                          :after  (fn []
                                    (trace/remove-trace-cb :test))})

(test/use-fixtures :each {:before (fn []
                                    (reset! test-traces [])
                                    (trace/reset-tracing!))})

; Disabled, as goog-define doesn't work in optimizations :whitespace
;(deftest trace-cb-test
;  (trace/with-trace {:operation :test1
;                     :op-type   :test})
;  (is (= 1 (count @test-traces)))
;  (is (= (select-keys (first @test-traces) [:id :operation :op-type :tags])
;         {:id 1 :operation :test1 :op-type :test :tags nil})))
;
;(enable-console-print!)
;
;(deftest sub-trace-test
;  (rf/subscribe [:non-existence])
;  (is (= 1 (count @test-traces)))
;  (is (= (select-keys (first @test-traces) [:id :operation :op-type :error])
;         {:id 1 :op-type :sub/create :operation :non-existence :error true})))

;; ---------------------------------------------------------------------------
;; rf-ybv — assemble-epochs unit tests
;; ---------------------------------------------------------------------------
;;
;; assemble-epochs is a pure fn over a vec of finished traces — no
;; dependency on trace-enabled?, so these run under
;; :whitespace optimization (unlike the disabled register-trace-cb
;; tests above). Coverage: shape contract, child-of partitioning,
;; multi-event batches, dispatch-id / parent-dispatch-id passthrough,
;; renders ignored (per the assemble-epochs docstring's known
;; limitation), empty batch → empty vec.

(defn- mk-event-trace
  ([id event] (mk-event-trace id event nil nil))
  ([id event dispatch-id parent-dispatch-id]
   {:id        id
    :op-type   :event
    :operation (first event)
    :start     0
    :end       10
    :duration  10
    :tags      (cond-> {:event           event
                        :app-db-before   {}
                        :app-db-after    {:n 1}
                        :coeffects       {:db {}}
                        :effects         {:db {:n 1}}
                        :interceptors    [{:id :coeffects}
                                          {:id :db-handler}]}
                 dispatch-id        (assoc :dispatch-id dispatch-id)
                 parent-dispatch-id (assoc :parent-dispatch-id parent-dispatch-id))}))

(defn- mk-child-trace [id child-of op-type & [tags]]
  {:id       id
   :op-type  op-type
   :child-of child-of
   :start    1
   :end      2
   :duration 1
   :tags     (or tags {})})

(deftest assemble-epochs-empty-batch
  (testing "empty trace batch produces empty epoch vec"
    (is (= [] (trace/assemble-epochs [])))))

(deftest assemble-epochs-single-event
  (testing "one :event trace becomes one epoch with all the documented keys"
    (let [evt    (mk-event-trace 1 [:counter/inc] "uuid-A" nil)
          epochs (trace/assemble-epochs [evt])
          e      (first epochs)]
      (is (= 1 (count epochs)))
      (is (= 1 (:id e)))
      (is (= [:counter/inc] (:event e)))
      (is (= "uuid-A" (:dispatch-id e)))
      (is (nil? (:parent-dispatch-id e)) "top-level event has no parent")
      (is (= {} (:app-db/before e)))
      (is (= {:n 1} (:app-db/after e)))
      (is (= [{:id :coeffects} {:id :db-handler}] (:interceptors e))
          "Q2 default — interceptor records, not just ids"))))

(deftest assemble-epochs-partitions-child-traces-by-op-type
  (testing "child traces are bucketed by op-type via :child-of links"
    (let [evt        (mk-event-trace 1 [:foo])
          handler    (mk-child-trace 2 1 :event/handler)
          do-fx      (mk-child-trace 3 1 :event/do-fx)
          sub-run-a  (mk-child-trace 4 1 :sub/run {:query-v [:a]})
          sub-run-b  (mk-child-trace 5 1 :sub/run {:query-v [:b]})
          sub-create (mk-child-trace 6 1 :sub/create {:query-v [:a]})
          batch      [evt handler do-fx sub-run-a sub-run-b sub-create]
          e          (first (trace/assemble-epochs batch))]
      (is (= 2 (:id (:event-handler e))))
      (is (= 3 (:id (:event-do-fx e))))
      (is (= [4 5] (mapv :id (:sub-runs e))))
      (is (= [6] (mapv :id (:sub-creates e)))))))

(deftest assemble-epochs-multi-event-batch
  (testing "two :event traces in one batch produce two epochs, parented by dispatch-id"
    (let [parent-evt (mk-event-trace 1 [:user/click] "uuid-PARENT" nil)
          ;; chained event fired via :fx [:dispatch ...] — has its own
          ;; trace with :parent-dispatch-id pointing at uuid-PARENT.
          child-evt  (mk-event-trace 7 [:analytics/track] "uuid-CHILD" "uuid-PARENT")
          ;; sub-run that ran inside the parent's handler
          sub-run    (mk-child-trace 4 1 :sub/run {:query-v [:counter]})
          epochs     (trace/assemble-epochs [parent-evt sub-run child-evt])]
      (is (= 2 (count epochs)))
      (let [parent-e (first (filter #(= "uuid-PARENT" (:dispatch-id %)) epochs))
            child-e  (first (filter #(= "uuid-CHILD" (:dispatch-id %)) epochs))]
        (is (nil? (:parent-dispatch-id parent-e)))
        (is (= "uuid-PARENT" (:parent-dispatch-id child-e))
            "rf-3p7 item 2 — child carries parent's id")
        (is (= [4] (mapv :id (:sub-runs parent-e)))
            "sub-run :child-of pointed at the parent's event id")
        (is (empty? (:sub-runs child-e))
            "child epoch has no sub-runs — none had :child-of pointing at id 7")))))

(deftest assemble-epochs-renders-not-attached
  (testing "render traces with :child-of nil are NOT attached to any epoch
            (documented limitation — renders fire on a later RAF tick
            after the user's handler returned, so they fall outside the
            :child-of tree)"
    (let [evt    (mk-event-trace 1 [:foo])
          render {:id 9 :op-type :render :child-of nil
                  :start 50 :end 51 :duration 1
                  :tags {:component-name "app.views.root"}}
          e      (first (trace/assemble-epochs [evt render]))]
      (is (not (contains? e :renders))
          "epoch shape doesn't even include a :renders key —
           consumers wanting renders subscribe to register-trace-cb"))))
