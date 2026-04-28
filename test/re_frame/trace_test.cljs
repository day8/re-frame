(ns re-frame.trace-test
  (:require [cljs.test :as test :refer-macros [async is deftest testing]]
            [clojure.string :as str]
            [re-frame.trace :as trace :include-macros true]
            [re-frame.loggers :as log]
            [re-frame.router :as router]
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
                                    (reset! trace/traces [])
                                    (reset! trace/epoch-cbs {})
                                    (reset! trace/next-delivery 0)
                                    (set! trace/trace-enabled? false)
                                    (trace/reset-tracing!))
                          :after  (fn []
                                    (reset! trace/traces [])
                                    (reset! trace/epoch-cbs {})
                                    (reset! trace/next-delivery 0)
                                    (set! trace/trace-enabled? false))})

(def delivery-wait-ms
  (+ trace/debounce-time 75))

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
          "interceptor records, not just ids"))))

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

;; ---------------------------------------------------------------------------
;; register-epoch-cb end-to-end delivery on CLJS
;; ---------------------------------------------------------------------------

(deftest register-epoch-cb-fires-after-dispatch-sync
  (testing "register-epoch-cb receives assembled epochs from the debounced
            CLJS trace delivery path"
    (async done
      (let [received (atom [])
            cb-key   :epoch-delivery/fires]
        (set! trace/trace-enabled? true)
        (rf/reg-event-db :epoch-delivery/touch
                         (fn [db _] (assoc db :touched true)))
        (trace/register-epoch-cb cb-key (fn [epochs] (swap! received conj epochs)))
        (rf/dispatch-sync [:epoch-delivery/touch])
        (js/setTimeout
         (fn []
           (try
             (is (= 1 (count @received))
                 "one debounced delivery for one dispatch-sync burst")
             (let [epochs (first @received)
                   epoch  (first epochs)]
               (is (= 1 (count epochs)))
               (is (= [:epoch-delivery/touch] (:event epoch))))
             (finally
               (trace/remove-epoch-cb cb-key)
               (rf/clear-event :epoch-delivery/touch)
               (reset! trace/traces [])
               (set! trace/trace-enabled? false)
               (done))))
         delivery-wait-ms)))))

(deftest remove-epoch-cb-stops-delivery
  (testing "remove-epoch-cb removes the callback before the debounce tick"
    (async done
      (let [received (atom [])
            cb-key   :epoch-delivery/removed]
        (set! trace/trace-enabled? true)
        (rf/reg-event-db :epoch-delivery/removed
                         (fn [db _] (assoc db :removed true)))
        (trace/register-epoch-cb cb-key (fn [epochs] (swap! received conj epochs)))
        (trace/remove-epoch-cb cb-key)
        (rf/dispatch-sync [:epoch-delivery/removed])
        (js/setTimeout
         (fn []
           (try
             (is (empty? @received)
                 "removed epoch callback did not receive the debounced batch")
             (finally
               (rf/clear-event :epoch-delivery/removed)
               (reset! trace/traces [])
               (set! trace/trace-enabled? false)
               (done))))
         delivery-wait-ms)))))

(deftest schedule-debounce-skips-epoch-assembly-without-epoch-cbs
  (testing "schedule-debounce does not call assemble-epochs when no
            epoch callbacks are registered"
    (async done
      (let [assemble-calls (atom 0)
            trace-batches  (atom [])
            original       trace/assemble-epochs
            trace-cb-key   :epoch-delivery/trace-only]
        (set! trace/trace-enabled? true)
        (set! trace/assemble-epochs
              (fn [batch]
                (swap! assemble-calls inc)
                (original batch)))
        (rf/reg-event-db :epoch-delivery/no-epoch-cbs
                         (fn [db _] (assoc db :no-epoch-cbs true)))
        (trace/register-trace-cb trace-cb-key (fn [batch] (swap! trace-batches conj batch)))
        (rf/dispatch-sync [:epoch-delivery/no-epoch-cbs])
        (js/setTimeout
         (fn []
           (try
             (is (= 1 (count @trace-batches))
                 "sanity: the normal trace callback received the debounced batch")
             (is (zero? @assemble-calls)
                 "no epoch callbacks registered, so assemble-epochs was not called")
             (finally
               (set! trace/assemble-epochs original)
               (trace/remove-trace-cb trace-cb-key)
               (rf/clear-event :epoch-delivery/no-epoch-cbs)
               (reset! trace/traces [])
               (set! trace/trace-enabled? false)
               (done))))
         delivery-wait-ms)))))

(defn- clear-dispatch-and-settle-events! []
  (doseq [event-id [:dispatch-settle/par
                    :dispatch-settle/chi
                    :dispatch-settle/par-two
                    :dispatch-settle/chi-a
                    :dispatch-settle/chi-b
                    :dispatch-settle/override-root
                    :dispatch-settle/override-child
                    :dispatch-settle/par-filter
                    :dispatch-settle/chi-filter
                    :dispatch-settle/other]]
    (rf/clear-event event-id))
  (rf/purge-event-queue)
  (reset! trace/traces [])
  (reset! trace/epoch-cbs {})
  (reset! trace/next-delivery 0))

(deftest dispatch-and-settle-cascades
  (testing "dispatch-and-settle awaits and attributes :fx dispatch cascades"
    (async done
      (let [opts {:timeout-ms 1000 :settle-window-ms delivery-wait-ms}
            single-level
            (fn []
              (clear-dispatch-and-settle-events!)
              (set! trace/trace-enabled? true)
              (rf/reg-event-fx :dispatch-settle/par
                               (fn [_ _]
                                 {:fx [[:dispatch [:dispatch-settle/chi]]]}))
              (rf/reg-event-db :dispatch-settle/chi
                               (fn [db _] (assoc db :chi true)))
              (let [p (router/dispatch-and-settle [:dispatch-settle/par] opts)]
                (is (instance? js/Promise p)
                    "CLJS dispatch-and-settle returns a JS Promise")
                (is (fn? (.-then p))
                    "the returned JS Promise exposes .then")
                (.then p
                       (fn [result]
                         (is (map? result)
                             "CLJS resolves to a Clojure map (no js->clj needed)")
                         (let [root     (:root-epoch result)
                               cascaded (:cascaded-epochs result)
                               child    (first cascaded)]
                           (is (true? (:ok? result)))
                           (is (= [:dispatch-settle/par] (:event root))
                               "the resolved map preserves the original keyword event vector")
                           (is (= 1 (count cascaded)))
                           (is (= [:dispatch-settle/chi] (:event child)))
                           (is (= (:dispatch-id root) (:parent-dispatch-id child))
                               "the child epoch is attributed to the root dispatch-id"))
                         (clear-dispatch-and-settle-events!)))))

            two-children
            (fn []
              (clear-dispatch-and-settle-events!)
              (set! trace/trace-enabled? true)
              (rf/reg-event-fx :dispatch-settle/par-two
                               (fn [_ _]
                                 {:fx [[:dispatch [:dispatch-settle/chi-a]]
                                       [:dispatch [:dispatch-settle/chi-b]]]}))
              (rf/reg-event-db :dispatch-settle/chi-a
                               (fn [db _] (assoc db :chi-a true)))
              (rf/reg-event-db :dispatch-settle/chi-b
                               (fn [db _] (assoc db :chi-b true)))
              (.then (router/dispatch-and-settle [:dispatch-settle/par-two] opts)
                     (fn [result]
                       (let [root     (:root-epoch result)
                             cascaded (:cascaded-epochs result)]
                         (is (true? (:ok? result)))
                         (is (= [:dispatch-settle/par-two] (:event root)))
                         (is (= #{[:dispatch-settle/chi-a] [:dispatch-settle/chi-b]}
                                (set (map :event cascaded))))
                         (is (every? #(= (:dispatch-id root) (:parent-dispatch-id %))
                                     cascaded)
                             "both child epochs are attributed to the root dispatch-id"))
                       (clear-dispatch-and-settle-events!))))

            unrelated-in-flight
            (fn []
              (clear-dispatch-and-settle-events!)
              (set! trace/trace-enabled? true)
              (rf/reg-event-fx :dispatch-settle/par-filter
                               (fn [_ _]
                                 {:fx [[:dispatch [:dispatch-settle/chi-filter]]]}))
              (rf/reg-event-db :dispatch-settle/chi-filter
                               (fn [db _] (assoc db :chi-filter true)))
              (rf/reg-event-db :dispatch-settle/other
                               (fn [db _] (assoc db :other true)))
              (let [p (router/dispatch-and-settle [:dispatch-settle/par-filter] opts)]
                (rf/dispatch [:dispatch-settle/other])
                (.then p
                       (fn [result]
                         (let [cascaded-events (set (map :event (:cascaded-epochs result)))]
                           (is (true? (:ok? result)))
                           (is (= [:dispatch-settle/par-filter] (-> result :root-epoch :event)))
                           (is (= #{[:dispatch-settle/chi-filter]} cascaded-events)
                               "only the child with matching parent-dispatch-id is reported")
                           (is (not (contains? cascaded-events [:dispatch-settle/other]))
                               "unrelated in-flight dispatch is excluded from cascaded-epochs"))
                         (clear-dispatch-and-settle-events!)))))]
        (-> (single-level)
            (.then (fn [_] (two-children)))
            (.then (fn [_] (unrelated-in-flight)))
            (.then (fn []
                     (set! trace/trace-enabled? false)
                     (done)))
            (.catch (fn [err]
                      (is false (str "dispatch-and-settle-cascades failed: " err))
                      (clear-dispatch-and-settle-events!)
                      (set! trace/trace-enabled? false)
                      (done))))))))

(deftest dispatch-and-settle-applies-fx-overrides
  (testing "dispatch-and-settle can override fx handlers for the root and its cascade"
    (async done
      (let [seen     (atom [])
            fx-id    :dispatch-settle/spy-fx
            cleanup! (fn []
                       (clear-dispatch-and-settle-events!)
                       (rf/clear-fx fx-id)
                       (set! trace/trace-enabled? false))]
        (clear-dispatch-and-settle-events!)
        (set! trace/trace-enabled? true)
        (rf/reg-fx fx-id
                   (fn [value]
                     (swap! seen conj [:registered value])))
        (rf/reg-event-fx :dispatch-settle/override-root
                         (fn [_ _]
                           {:fx [[fx-id :root]
                                 [:dispatch [:dispatch-settle/override-child]]]}))
        (rf/reg-event-fx :dispatch-settle/override-child
                         (fn [_ _]
                           {fx-id :child}))
        (-> (rf/dispatch-and-settle
             [:dispatch-settle/override-root]
             {:timeout-ms       1000
              :settle-window-ms delivery-wait-ms
              :overrides        {fx-id (fn [value]
                                         (swap! seen conj [:override value]))}})
            (.then
             (fn [result]
               (let [cascaded-events (set (map :event (:cascaded-epochs result)))]
                 (is (true? (:ok? result)))
                 (is (= [:dispatch-settle/override-root] (-> result :root-epoch :event)))
                 (is (= #{[:dispatch-settle/override-child]} cascaded-events)
                     "the child event is still captured as part of the settled cascade")
                 (is (= [[:override :root] [:override :child]] @seen)
                     "the override handles root and cascaded fx; the registered handler is bypassed"))
               (cleanup!)
               (done)))
            (.catch
             (fn [err]
               (is false (str "dispatch-and-settle-applies-fx-overrides failed: " err))
               (cleanup!)
               (done))))))))

(deftest dispatch-and-settle-resolves-with-clojure-data
  (testing "the CLJS Promise resolves to a Clojure map — namespaced
            keywords (event keys, :app-db/before, :event/original)
            survive the resolve without going through clj->js"
    (async done
      (let [opts {:timeout-ms 1000 :settle-window-ms delivery-wait-ms}]
        (clear-dispatch-and-settle-events!)
        (set! trace/trace-enabled? true)
        (rf/reg-event-db :dispatch-settle/par
                         (fn [db _] (assoc db :touched true)))
        (-> (router/dispatch-and-settle [:dispatch-settle/par] opts)
            (.then
             (fn [result]
               (is (map? result)
                   "the resolved value is a Clojure map, not a JS object")
               (is (true? (:ok? result))
                   ":ok? is the Clojure boolean — keyword key survived")
               (is (= [:dispatch-settle/par]
                      (get-in result [:root-epoch :event]))
                   "the namespaced event keyword is preserved end-to-end")
               (is (some? (get-in result [:root-epoch :app-db/before]))
                   "namespaced keys like :app-db/before resolve, not collide
                    with :event/before under (clj->js v :keyword-fn name)")
               (clear-dispatch-and-settle-events!)
               (set! trace/trace-enabled? false)
               (done)))
            (.catch
             (fn [err]
               (is false (str "dispatch-and-settle-resolves-with-clojure-data failed: " err))
               (clear-dispatch-and-settle-events!)
               (set! trace/trace-enabled? false)
               (done))))))))

(deftest register-epoch-cb-warns-when-tracing-disabled
  (testing "register-epoch-cb warns instead of registering when tracing is disabled"
    (let [warns            (atom [])
          original-loggers (log/get-loggers)]
      (try
        (set! trace/trace-enabled? false)
        (log/set-loggers! {:warn (fn [& args]
                                   (swap! warns conj (str/join " " args)))})
        (trace/register-epoch-cb :epoch-delivery/disabled (fn [_]))
        (is (= {} @trace/epoch-cbs)
            "disabled tracing leaves epoch-cbs unchanged")
        (is (= 1 (count @warns)))
        (is (str/includes? (first @warns) "register-epoch-cb skipped"))
        (finally
          (log/set-loggers! original-loggers)
          (trace/remove-epoch-cb :epoch-delivery/disabled))))))

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
