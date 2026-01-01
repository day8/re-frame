(ns re-frame.subs.alpha-test
  (:require
   [cljs.test         :as test :refer-macros [is deftest testing]]
   [reagent.ratom     :as r :refer-macros [reaction]]
   [re-frame.db       :as db]
   [re-frame.interop  :refer [reactive?]]
   [re-frame :as-alias rf]
   [re-frame.alpha :refer [reg sub]]
   [re-frame.query.alpha :as q]
   [re-frame.register.alpha :as reg]
   [re-frame.core :refer [reg-sub-raw]]
   [re-frame.subs :as subs :refer [clear-all-handlers!]]))

(test/use-fixtures :each
  {:before #(do (clear-all-handlers!)
                (subs/clear-subscription-cache!)
                (q/clear!))})

(def queries
  {::map
   {::rf/q ::map}
   ::map-safe
   {::rf/q ::map-safe
    ::rf/lifecycle :safe}
   ::map-reactive
   {::rf/q ::map-reactive
    ::rf/lifecycle :reactive}
   ::map-forever
   {::rf/q ::map-forever
    ::rf/lifecycle :forever}
   ::query-v
   {::rf/q ::query-v
    ::rf/query-v [::query-v 1 2 3]}
   ::vec
   [::vec 1 2 3]
   ::vec-reactive
   ^{::rf/lifecycle :reactive}
   [::vec-reactive 1 2 3]})

(defn report [_db q]
  {:query q
   :lifecycle (q/lifecycle q)
   :query-id (q/id q)
   :method (q/method q)})

(deftest test-sub-method-registration
  (testing "Method registration"
    (reg :sub-lifecycle :test q/handle)
    (is (fn? (get @reg/lifecycle->method :test)))))

(deftest test-query-api
  (testing "Query ID"
    (doseq [[qid q] queries]
      (is (= qid (q/id q)))))
  (testing "Method lookup"
    (doseq [[_ q] queries]
      (is (fn? (q/method q)))))

  (testing "Lifecycle"
    (doseq [q (map queries [::map ::query-v ::vec])]
      (is (= :safe (q/lifecycle q))))
    (doseq [q (map queries [::map-reactive ::vec-reactive])]
      (is (= :reactive (q/lifecycle q))))))

(deftest test-subscription
  (testing "Subscription"
    (doseq [[qid q] queries
            :let [_ (reg :sub qid report)
                  result @(sub q)]]
      (is (map? (:query result)))
      (is (= (:lifecycle result) (q/lifecycle q)))
      (is (= (:query-id result) qid))
      (is (= (:method result) (q/method q))))))

(def stub (constantly nil))

(deftest signal--old-reg--core-sub--is-vector ;000
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :legacy-sub :test signal-fn stub)
    @(re-frame.core/subscribe [:test])
    (is (vector? @!arg))))

;001: can't pass a map to core/subscribe

(deftest signal--old-reg--new-sub--is-vector ;010
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :legacy-sub :test signal-fn stub)
    @(sub [:test])
    (is (vector? @!arg))))

(deftest signal--old-reg--new-sub--map->vector-q ;011
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :legacy-sub :test signal-fn stub)
    @(sub {:re-frame/q :test})
    (is (vector? @!arg))))

(deftest signal--new-reg--core-sub--vector->map-q ;100
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :sub :test signal-fn stub)
    @(re-frame.core/subscribe [:test])
    (is (map? @!arg))))

;101: can't pass a map to core/subscribe

(deftest signal--new-reg--new-sub--vector->map-q ;110
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :sub :test signal-fn stub)
    @(sub [:test])
    (is (map? @!arg))))

(deftest signal--new-reg--new-sub--is-map-q ;111
  (let [!arg      (atom nil)
        _         (reg :sub :stub stub)
        signal-fn (fn [q] (reset! !arg q) (sub :stub))]
    (reg :sub :test signal-fn stub)
    @(sub {:re-frame/q :test})
    (is (map? @!arg))))

(deftest old-reg--core-sub--is-vector-q ;000
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :legacy-sub :test calc-fn)
    @(re-frame.core/subscribe [:test])
    (is (vector? @!arg))))

;001: can't pass a map to core/subscribe

(deftest old-reg--new-sub--is-vector-q ;010
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :legacy-sub :test calc-fn)
    @(sub [:test])
    (is (vector? @!arg))))

(deftest old-reg--new-sub--map-q->vector-q ;011
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :legacy-sub :test calc-fn)
    @(sub {:re-frame/q :test})
    (is (vector? @!arg))))

(deftest new-reg--core-sub--vector-q->map-q ;100
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :sub :test calc-fn)
    @(re-frame.core/subscribe [:test])
    (is (map? @!arg))))

;101: can't pass a map to core/subscribe

(deftest new-reg--new-sub--vector-q->map-q ;110
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :sub :test calc-fn)
    @(sub [:test])
    (is (map? @!arg))))

(deftest new-reg--new-sub--is-map-q ;111
  (let [!arg    (atom nil)
        calc-fn (fn [_ q] (reset! !arg q))]
    (reg :sub :test calc-fn)
    @(sub {:re-frame/q :test})
    (is (map? @!arg))))

(deftest test-legacy-subscription
  (testing "Legacy Subscription"
    (doseq [[qid q] queries
            :let [_ (reg :legacy-sub qid report)
                  result @(sub q)]]
      (is (vector? (:query result)))
      (is (= (:lifecycle result) (q/lifecycle q)))
      (is (= (:query-id result) qid))
      (is (= (:method result) (q/method q))))))

(deftest test-caching
  (testing "Caching a subscription value"
    (let [test-query {:test-sub "cache"}]
      (q/cache! test-query 123)
      (is (= (q/cached test-query) 123))))

  (testing "Clearing cache"
    (q/clear!)
    (is (= @q/cache {}))))

(def side-effect-atom (atom 0))

(defn safe-test [q]
  (q/clear!)
  (reset! side-effect-atom 0)
  (let [test-sub (sub q)]
    (reset! db/app-db {:test true})
    (is (= {:test true} @test-sub))
    (is (= @side-effect-atom 1))
    ;; no caching is done
    (sub q)
    (is (= @side-effect-atom 2))
    (with-redefs [reactive? (constantly true)]
      (sub q)
      (is (= @side-effect-atom 3))
      ;; now the sub is cached
      (sub q)
      (is (= @side-effect-atom 3)))
    ;; cached sub is now available outside reactive context
    (sub q)
    (is (= @side-effect-atom 3))))

(deftest test-subscription-lifecycles
  (reg-sub-raw
   :side-effecting-handler
   (fn side-effect [db _]
     (swap! side-effect-atom inc)
     (reaction @db)))

  (testing "Default subscription lifecycle"
    (safe-test {::rf/q :side-effecting-handler}))

  (testing "Safe subscription lifecycle"
    (safe-test {::rf/q :side-effecting-handler
                ::rf/lifecycle :safe}))

  (q/clear!)
  (reset! side-effect-atom 0)

  (testing "Reactive subscription lifecycle"
    (let [q {::rf/q :side-effecting-handler
             ::rf/lifecycle :reactive}]
      (reset! db/app-db {:test true})
      (is (= {:test true} @(sub q)))
      (is (= @side-effect-atom 1))
      ;; sub is cached, even outside a reactive context
      (sub q)
      (is (= @side-effect-atom 1))
      (with-redefs [reactive? (constantly true)]
        (sub q)
        (is (= @side-effect-atom 1))
        (sub q)
        (is (= @side-effect-atom 1)))
      (sub q)
      (is (= @side-effect-atom 1)))))
