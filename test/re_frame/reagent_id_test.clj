(ns re-frame.reagent-id-test
  "JVM-only tests that `re-frame.interop/reagent-id` produces a per-instance
   id (not a single global constant), so the trace machinery that keys on
   reagent-id — chiefly `re-frame.subs/reaction-id->query-v` driving the
   :input-query-vs trace tag — can distinguish two live reactions.

   Runs CLJ-side under cognitect.test-runner."
  (:require [clojure.test     :refer [deftest is testing use-fixtures]]
            [re-frame.core    :as rf]
            [re-frame.interop :as interop]
            [re-frame.subs    :as subs]
            [re-frame.db      :as db]
            [re-frame.trace   :as trace]))

(defn fixture-clear-subs
  [f]
  (let [restore (rf/make-restore-fn)]
    (try (f) (finally (restore)))))

(use-fixtures :each fixture-clear-subs)

(deftest distinct-reactive-vals-get-distinct-ids
  (testing "two distinct reactive values produce different reagent-ids"
    (let [a (interop/ratom 1)
          b (interop/ratom 2)]
      (is (not= (interop/reagent-id a) (interop/reagent-id b))
          "object identity → distinct ids; if these collide the
           reaction-id->query-v reverse map collapses on JVM"))))

(deftest reagent-id-is-stable-per-instance
  (testing "calling reagent-id twice on the same value returns the same id"
    (let [r (interop/ratom :x)]
      (is (= (interop/reagent-id r) (interop/reagent-id r))
          "stability is required for cache-and-return / on-dispose to
           map an insert and its later removal to the same key"))))

(deftest reaction-id->query-v-distinguishes-live-subs
  (testing "two live subscriptions register distinct entries in the
            internal reaction-id->query-v map (the table backing the
            :input-query-vs trace tag)"
    (rf/reg-sub :rid/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:rid/echo :a])
          r2 (rf/subscribe [:rid/echo :b])
          id1 (interop/reagent-id r1)
          id2 (interop/reagent-id r2)
          rev @#'subs/reaction-id->query-v]
      (is (not= id1 id2)
          "the two subscribe-produced reactions must have distinct ids")
      (is (= [:rid/echo :a] (get @rev id1))
          "first reaction's id maps to its own query-v")
      (is (= [:rid/echo :b] (get @rev id2))
          "second reaction's id maps to its own query-v — pre-fix this
           was overwritten because every JVM reaction shared id 'rx-clj'"))))

(deftest input-query-vs-trace-tag-captures-distinct-inputs
  (testing "with tracing on, :sub/run trace for a derived sub records the
            distinct query-vs of its two input subs in :input-query-vs"
    (rf/reg-sub :rid/leaf-a (fn [db _] (:a db)))
    (rf/reg-sub :rid/leaf-b (fn [db _] (:b db)))
    (rf/reg-sub :rid/derived
                (fn [_ _] [(rf/subscribe [:rid/leaf-a])
                           (rf/subscribe [:rid/leaf-b])])
                (fn [[a b] _] [a b]))
    (reset! db/app-db {:a 10 :b 20})
    (let [traces (atom [])
          cb-key ::rid-input-qvs
          before trace/trace-enabled?]
      (alter-var-root #'trace/trace-enabled? (constantly true))
      (try
        (trace/register-trace-cb cb-key #(swap! traces into %))
        (let [r (rf/subscribe [:rid/derived])]
          (is (= [10 20] @r) "sanity: derived sub computes correctly")
          (let [run (->> @traces
                         (filter #(and (= :sub/run (:op-type %))
                                       (= :rid/derived (:operation %))))
                         last)
                qvs (get-in run [:tags :input-query-vs])]
            (is (some? run) "captured a :sub/run trace for the derived sub")
            (is (= [[:rid/leaf-a] [:rid/leaf-b]] (vec qvs))
                "input-query-vs lists the two distinct input query-vs in
                 order — pre-fix this would be two copies of whatever sub
                 was registered last globally")))
        (finally
          (trace/remove-trace-cb cb-key)
          (alter-var-root #'trace/trace-enabled? (constantly before)))))))
