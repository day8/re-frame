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
;; assemble-epochs unit tests
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
  ([id event] (mk-event-trace id event nil nil nil))
  ([id event dispatch-id parent-dispatch-id]
   (mk-event-trace id event dispatch-id parent-dispatch-id nil))
  ([id event dispatch-id parent-dispatch-id event-original]
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
                 parent-dispatch-id (assoc :parent-dispatch-id parent-dispatch-id)
                 event-original     (assoc :event/original event-original))}))

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

(deftest assemble-epochs-event-original-divergence
  (testing ":event/original surfaces on the epoch independently of :event —
            mirrors the case where an interceptor (e.g. trim-v / path) has
            rewritten the post-interceptor event vector that consumers
            see under :event, but the dispatched original is still
            recoverable via :event/original."
    (let [original  [:user/save {:id 7 :name "Mike"}]
          rewritten [{:id 7 :name "Mike"}]              ;; what e.g. trim-v would produce
          evt       (mk-event-trace 1 rewritten "uuid-A" nil original)
          e         (first (trace/assemble-epochs [evt]))]
      (is (= rewritten (:event e))
          ":event carries the (possibly rewritten) post-interceptor vector")
      (is (= original (:event/original e))
          ":event/original carries the dispatched vector, pinned at handle entry")
      (is (not= (:event e) (:event/original e))
          "the two diverge when an interceptor rewrites :event")))
  (testing "no-rewrite case: :event/original equals :event"
    (let [v   [:counter/inc 1]
          evt (mk-event-trace 1 v nil nil v)
          e   (first (trace/assemble-epochs [evt]))]
      (is (= v (:event e)))
      (is (= v (:event/original e)))
      (is (= (:event e) (:event/original e))
          "consumers can drop the duplicate when they match"))))

;; ---------------------------------------------------------------------------
;; End-to-end: :event/original is pinned by re-frame.events/handle on a real
;; dispatch-sync round-trip, even when an interceptor rewrites the :event
;; coeffect for the handler.
;; ---------------------------------------------------------------------------
;;
;; The fixture-based tests above prove the projection works against synthetic
;; trace inputs. This test proves the EMISSION path in events.cljc actually
;; sets the tag — so a real consumer reading the trace stream gets
;; :event/original without any new wiring on their side.
;;
;; Mechanics:
;;   1. set! trace/trace-enabled? to true so finish-trace pushes to @trace/traces
;;      (the macro guards on (is-trace-enabled?) at runtime).
;;   2. reset! @trace/traces to [] so we read only this test's emissions.
;;   3. Register a handler with the trim-v interceptor, which rewrites the
;;      :event coeffect for the handler from [id payload] to [payload].
;;   4. dispatch-sync — runs synchronously, finish-trace appends to @traces.
;;   5. Read @trace/traces directly (we don't depend on the debounced cb path).

(deftest dispatch-sync-pins-event-original-on-event-trace
  (testing "rf/dispatch-sync emits an :event trace whose :event/original tag
            matches the dispatched vector, even when an interceptor like
            trim-v rewrites the event coeffect for the handler"
    (set! trace/trace-enabled? true)
    (try
      (rf/reg-event-db :event-orig-test/sink
                       [rf/trim-v]
                       (fn [db [n]] (assoc db :n n)))
      (reset! trace/traces [])
      (rf/dispatch-sync [:event-orig-test/sink 42])
      (let [event-trace (first (filter #(= :event (:op-type %)) @trace/traces))
            tags        (:tags event-trace)]
        (is (some? event-trace)
            ":event trace was emitted by handle")
        (is (= [:event-orig-test/sink 42] (:event/original tags))
            ":event/original tag carries the dispatched vector")
        (is (= [:event-orig-test/sink 42] (:event tags))
            ":event tag also carries the dispatched vector today (current re-frame
             core never rewrites it post-interceptor; :event/original is the
             forward-compatible guarantee)")
        (is (= [42] (-> tags :coeffects :event))
            ":coeffects :event carries the post-trim-v event vector — proves an
             interceptor DID rewrite the handler-facing event, even though the
             trace's top-level :event tag itself wasn't changed")
        (is (not= (:event/original tags) (-> tags :coeffects :event))
            ":event/original differs from the post-interceptor coeffect event —
             the property that makes :event/original useful for downstream
             consumers"))
      (testing "and the assembled epoch surfaces :event/original alongside :event"
        (let [batch       (vec @trace/traces)
              epoch       (first (trace/assemble-epochs batch))]
          (is (= [:event-orig-test/sink 42] (:event/original epoch))
              "epoch projection lifts :event/original from the trace tag")
          (is (= [:event-orig-test/sink 42] (:event epoch))
              "epoch projection lifts :event from the trace tag")))
      (finally
        (rf/clear-event :event-orig-test/sink)
        (reset! trace/traces [])
        (set! trace/trace-enabled? false)))))

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
            "child carries parent's id")
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
