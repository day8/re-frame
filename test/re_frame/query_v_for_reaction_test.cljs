(ns re-frame.query-v-for-reaction-test
  "CLJS coverage for re-frame.core/query-v-for-reaction. These tests
   exercise the platform where reagent ids are distinct, so the reverse
   map must be keyed by the reaction object itself."
  (:require [cljs.test :refer-macros [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.db :as db]
            [re-frame.interop :as interop]
            [re-frame.subs :as subs]
            [re-frame.trace :as trace]))

(defn fixture-re-frame
  []
  (let [restore-re-frame (atom nil)
        trace-before     (atom nil)]
    {:before #(do
                (reset! restore-re-frame (rf/make-restore-fn))
                (reset! trace-before trace/trace-enabled?)
                (set! trace/trace-enabled? false))
     :after  #(do
                (set! trace/trace-enabled? @trace-before)
                (when-let [restore @restore-re-frame]
                  (restore)))}))

(use-fixtures :each (fixture-re-frame))

(deftest returns-query-v-for-known-reaction
  (testing "subscribe creates a reaction; query-v-for-reaction returns its query-v"
    (rf/reg-sub :qvfr/echo (fn [d [_ x]] [(:n d) x]))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo 42])]
      (is (some? r) "subscribe returned a reaction")
      (is (= [:qvfr/echo 42] (rf/query-v-for-reaction r))
          "lookup returns the exact query-v passed to subscribe"))))

(deftest distinct-reactions-have-distinct-query-vs-and-reagent-ids
  (testing "distinct CLJS reactions map back to their own query-vs"
    (rf/reg-sub :qvfr/echo (fn [d [_ x]] [(:n d) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :a])
          r2 (rf/subscribe [:qvfr/echo :b])]
      (is (not (identical? r1 r2))
          "different params produce different reactions")
      (is (not= (interop/reagent-id r1)
                (interop/reagent-id r2))
          "CLJS reagent ids remain distinct for these reactions")
      (is (= [:qvfr/echo :a] (rf/query-v-for-reaction r1)))
      (is (= [:qvfr/echo :b] (rf/query-v-for-reaction r2))))))

(deftest cached-resubscribe-returns-same-query-v
  (testing "the cache returns the same reaction on a second subscribe; lookup is stable"
    (rf/reg-sub :qvfr/echo (fn [d [_ x]] [(:n d) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :same])
          r2 (rf/subscribe [:qvfr/echo :same])]
      (is (identical? r1 r2)
          "subscription cache returns the same reaction")
      (is (= [:qvfr/echo :same] (rf/query-v-for-reaction r1))))))

(deftest unknown-reaction-returns-nil
  (testing "a reaction not produced by subscribe returns nil"
    (let [bare (interop/make-reaction (fn [] :not-a-sub))]
      (is (nil? (rf/query-v-for-reaction bare))
          "object never registered with the subs cache -> nil")
      (interop/dispose! bare))))

(deftest disposed-reaction-drops-from-reverse-map
  (testing "after clear-subscription-cache!, the reaction's entry is gone"
    (rf/reg-sub :qvfr/echo (fn [d _] (:n d)))
    (reset! db/app-db {:n 7})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
          "registered before clear")
      (rf/clear-subscription-cache!)
      (is (nil? (rf/query-v-for-reaction r))
          "dispose callback removed the reverse-map entry"))))

(deftest subs-namespace-fn-matches-core-export
  (testing "the re-export in re-frame.core delegates to re-frame.subs unchanged"
    (rf/reg-sub :qvfr/echo (fn [d _] (:n d)))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= (rf/query-v-for-reaction r)
             (subs/query-v-for-reaction r))
          "core re-export and subs fn agree"))))

(deftest production-mode-skips-reverse-map-write-when-tracing-is-disabled
  (testing "debug false and tracing false skip the reaction->query-v write"
    (rf/reg-sub :qvfr/echo (fn [d _] (:n d)))
    (reset! db/app-db {:n 1})
    (set! trace/trace-enabled? false)
    (with-redefs [interop/debug-enabled? false]
      (let [r (rf/subscribe [:qvfr/echo])]
        (is (nil? (rf/query-v-for-reaction r))
            "production mode with tracing off does not populate the reverse map")))
    (rf/clear-subscription-cache!)
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
          "debug on populates the reverse map again"))))

(deftest dispose-cleans-up-reverse-map-even-when-debug-flips-off
  (testing "dispose-side cleanup is unconditional"
    (rf/reg-sub :qvfr/echo (fn [d _] (:n d)))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
          "subscribed under debug-enabled? true -> entry present")
      (with-redefs [interop/debug-enabled? false]
        (rf/clear-subscription-cache!))
      (is (nil? (rf/query-v-for-reaction r))
          "clear-subscription-cache! invoked dispose and removed the entry"))))
