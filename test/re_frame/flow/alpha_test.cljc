(ns re-frame.flow.alpha-test
  (:require
   [cljs.test :refer [is deftest use-fixtures testing]]
   ;[spy.core :as spy]
   [re-frame.alpha :as rf]
   [re-frame.flow.alpha :as f]
   [re-frame.db :refer [app-db]]))

(use-fixtures :each (fn [f] (f) (reset! f/flows {})))

(deftest abstractions
  (is (f/db-path? []))
  (is (f/flow? {}))
  (is (f/flow<-? {::f/flow<- :a}))
  (is (f/flow<-? (f/flow<- :a))))

(deftest helpers
  (let [c {:id :c
           :inputs {:db-path [:some :path]
                    :flow-a (rf/flow<- :a)}
           :live-inputs {:db-path [:some :path]
                         :flow-b (rf/flow<- :b)}
           :path [:x :y :z]}]
    (rf/reg-flow c)
    (rf/reg-flow {:id :a})
    (rf/reg-flow {:id :b})
    (testing "registration"
      (is (= :a (:id (f/lookup :a)))))
    (testing "topological sort"
      (is (= #{:a :b} (set (f/input-ids c))))
      (is (= :c (last (map :id (f/topsort @f/flows))))))

    (testing "stale inputs & outputs"
      (is (= {:flow-a [:a]} (f/stale-in-flows {:flow-a {:path [:a]}}
                                              {:inputs {:a [:a]}})))

      (is (= {:flow-a {:b [:b]}} (f/stale-out-flows {:flow-a {:inputs {:b [:b]}}}
                                                    {:path [:b]}))))))

(deftest registry
  (testing "reg-flow"
    (rf/reg-flow {:id :a})
    (is (some? (f/lookup :a)))
    (rf/reg-flow :b {})
    (is (some? (f/lookup :b))))
  (testing "clear-flow"
    (rf/clear-flow :a)
    (is (nil? (f/lookup :a)))
    (rf/reg-flow {:id :c})
    (rf/clear-flow)
    (is (nil? (f/lookup :b)))
    (is (nil? (f/lookup :c)))))

(deftest get-flow
  (rf/reg-flow {:id :x :path [:a :b]})
  (let [db {:a {:b :y}}]
    (is (= :y (rf/get-flow db :x)))))

(deftest run-flow
  (rf/reg-event-db :go-live (fn [db _] (assoc db :l? true)))
  (rf/reg-event-db :go-dead (fn [db _] (dissoc db :l?)))
  (rf/reg-flow {:id :live-db
                :live? :l?})
  (rf/reg-flow {:id :live-path
                :live? :l?
                :live-inputs {:l? [:l?]}})
  (rf/reg-flow {:id :live-input
                :live? :l?
                :live-inputs {:l? (rf/flow<- :live-path)}})
  (testing "basic flow"
    (rf/reg-event-fx :basic-event (fn [_ _] {}))
    (rf/reg-flow {:id :basic-flow})
    (is (not (rf/get-flow @app-db :basic-flow)))
    (rf/dispatch-sync [:basic-event])
    (is (rf/get-flow @app-db :basic-flow)))
  (testing "live flow"
    (is (nil? (rf/get-flow @app-db :live-db)))
    (is (nil? (rf/get-flow @app-db :live-path)))
    (is (nil? (rf/get-flow @app-db :live-input)))
    (rf/dispatch-sync [:go-live])
    (is (rf/get-flow @app-db :live-db))
    (is (rf/get-flow @app-db :live-path))
    (is (rf/get-flow @app-db :live-input))
    (rf/dispatch-sync [:go-dead])
    (is (nil? (rf/get-flow @app-db :live-db)))
    (is (nil? (rf/get-flow @app-db :live-path)))
    (is (nil? (rf/get-flow @app-db :live-input))))
  (testing "flow effects"
    (let [flow-a {:id :fx-flow
                  :output (fn [_] :a)}
          flow-b {:id :fx-flow
                  :output (constantly :b)}]
      (rf/reg-event-fx :reg-a (fn [_ _] {:fx [[:reg-flow flow-a]]}))
      (rf/reg-event-fx :reg-b (fn [_ _] {:fx [[:reg-flow flow-b]]}))
      (rf/reg-event-fx :clear-fx (fn [_ _] {:fx [[:clear-flow :fx-flow]]}))
      (is (nil? (rf/get-flow @app-db :fx-flow)))
      (rf/dispatch-sync [:reg-a])
      (is (= :a (rf/get-flow @app-db :fx-flow)))
      (rf/dispatch-sync [:reg-b])
      (is (= :b (rf/get-flow @app-db :fx-flow)))
      (rf/dispatch-sync [:clear-fx])
      (is (nil? (rf/get-flow @app-db :fx-flow)))))
  (testing "flow run count"
    (let [ct (atom 0)
          live-ct (atom 0)
          ct-flow {:id :ct-flow
                   :live-inputs {:l? [:l?]}
                   :live? (fn [{:keys [l?]}] (swap! live-ct inc) l?)
                   :output (fn [_] (swap! ct inc))}]
      (rf/reg-flow ct-flow)
      (rf/dispatch-sync [:go-live])
      (is (= 1 @ct))
      (is (= 1 @live-ct))
      (rf/dispatch-sync [:go-dead])
      (is (= 1 @ct))
      (is (= 3 @live-ct))
      (rf/dispatch-sync [:go-live])
      (is (= 2 @ct))
      (is (= 5 @live-ct))
      (rf/clear-flow :ct-flow)
      (rf/dispatch-sync [:go-live])
      (is (= 2 @ct))
      (is (= 6 @live-ct))
      (rf/dispatch-sync [:go-live])
      (is (= 2 @ct))
      (is (= 6 @live-ct))
      (rf/reg-flow ct-flow)
      (rf/dispatch-sync [:go-live])
      (is (= 3 @ct))
      (is (= 7 @live-ct)))))

(deftest run-flows-once
  (let [ct (atom 0)
        ct-flow {:id "once-ct-flow"
                 :inputs {:x [:x]}
                 :path [:y]
                 :output #(swap! ct inc)}]
    (testing "running just once"
      (rf/reg-event-db :init [re-frame.std-interceptors/debug] (fn [_ _] {:x 0}))
      (rf/reg-flow ct-flow)
      (rf/dispatch-sync [:init])
      (is (= 1 @ct))
      ))
  (let [ct (atom 0)
        ct-flow {:id "once-ct-flow-2"
                 :inputs {:x [:x]}
                 :path [:y]
                 :output #(swap! ct inc)}]
    (testing "registering just once with :reg-flow fx"
      (with-redefs [
                    ;f/reg-flow (spy/spy f/reg-flow)
                    ]
        (rf/reg-event-fx :init (fn [_ _] {:db {:x 0} :fx [[:reg-flow ct-flow]]}))
        (rf/dispatch-sync [:init])
        (is (= 1 @ct))
        ;; XXX Doesn't work, not sure why. However, patching reg-flow in-place
        ;;   to print a message to the console results in printing it twice.
        #_ (is (spy/called-once? f/reg-flow)))))
)

(deftest clear-flows
  (let [q-flow (fn [qid] {:id     (str "qf-" qid)
                          :inputs {:in [:queries qid :in]}
                          :path   [:queries qid :out]
                          :output (comp inc :in)})]
    (testing "clearing flows and their inputs"
      (rf/reg-event-db :init (fn [_ _] {:queries []}))
      (rf/reg-event-fx :add-query
                       (fn [{:keys [db]} _]
                         {:db (update db :queries #(conj % {:in (count %)}))
                          :fx [[:reg-flow (q-flow (count (:queries db)))]]}))
      ;; Add a few queries, expect the flows to supply :out values.
      (rf/dispatch-sync [:init])
      (dotimes [_ 3] (rf/dispatch-sync [:add-query]))
      (is (= @app-db {:queries [{:in 0 :out 1} {:in 1 :out 2} {:in 2 :out 3}]}))
      ;; Delete an item.
      (rf/reg-event-fx :del-query
                       (fn [{:keys [db]} [_ qid]]
                         {:db (update-in db [:queries qid]
                                         #(-> % (dissoc :in) (assoc :deleted? true)))
                          :fx [[:clear-flow (str "qf-" qid)]]
                          }))
      (rf/dispatch-sync [:del-query 1])
      ;; If no exception, all went well.
      (is (= @app-db {:queries [{:in 0 :out 1} {:deleted? true} {:in 2 :out 3}]}))
      ))
  )
