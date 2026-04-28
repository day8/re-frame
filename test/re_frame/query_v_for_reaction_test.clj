(ns re-frame.query-v-for-reaction-test
  "Tests for `re-frame.core/query-v-for-reaction` — the public lookup
   that takes a reaction (the value returned by `subscribe`) and
   returns the query-v that produced it.

   Runs CLJ-side under cognitect.test-runner. The reverse map is keyed
   by reaction object identity (not reagent-id) because reagent-id is
   hash-derived on both runtimes; a public lookup that must never
   conflate two distinct reactions needs identity-based keying."
  (:require [clojure.test    :refer [deftest is testing use-fixtures]]
            [re-frame.core   :as rf]
            [re-frame.interop :as interop]
            [re-frame.subs   :as subs]
            [re-frame.db     :as db]
            [re-frame.trace  :as trace]))

(defn fixture-clear-subs
  [f]
  (let [restore (rf/make-restore-fn)
        before  trace/trace-enabled?]
    (try
      (f)
      (finally
        (alter-var-root #'trace/trace-enabled? (constantly before))
        (restore)))))

(use-fixtures :each fixture-clear-subs)

(deftest returns-query-v-for-known-reaction
  (testing "subscribe creates a reaction; query-v-for-reaction returns its query-v"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo 42])]
      (is (some? r) "subscribe returned a reaction")
      (is (= [:qvfr/echo 42] (rf/query-v-for-reaction r))
          "lookup returns the exact query-v passed to subscribe"))))

(deftest distinct-reactions-have-distinct-query-vs
  (testing "two subscribes with different query-vs map back to their own query-vs"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :a])
          r2 (rf/subscribe [:qvfr/echo :b])]
      (is (not (identical? r1 r2)) "different params → different reactions")
      (is (= [:qvfr/echo :a] (rf/query-v-for-reaction r1)))
      (is (= [:qvfr/echo :b] (rf/query-v-for-reaction r2))))))

(deftest cached-resubscribe-returns-same-query-v
  (testing "the cache returns the same reaction on a second subscribe; lookup is stable"
    (rf/reg-sub :qvfr/echo (fn [db [_ x]] [(:n db) x]))
    (reset! db/app-db {:n 1})
    (let [r1 (rf/subscribe [:qvfr/echo :same])
          r2 (rf/subscribe [:qvfr/echo :same])]
      (is (identical? r1 r2) "subscription cache returns the same reaction")
      (is (= [:qvfr/echo :same] (rf/query-v-for-reaction r1))))))

(deftest unknown-reaction-returns-nil
  (testing "a reaction not produced by subscribe (or already disposed) returns nil"
    (let [bare (reify clojure.lang.IDeref (deref [_] :not-a-sub))]
      (is (nil? (rf/query-v-for-reaction bare))
          "object never registered with the subs cache → nil"))))

(deftest disposed-reaction-drops-from-reverse-map
  (testing "after clear-subscription-cache!, the reaction's entry is gone"
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 7})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
          "registered before clear")
      (rf/clear-subscription-cache!)
      (is (nil? (rf/query-v-for-reaction r))
          "dispose callback removed the reverse-map entry"))))

(deftest subs-namespace-fn-matches-core-export
  (testing "the re-export in re-frame.core delegates to re-frame.subs unchanged"
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (let [r (rf/subscribe [:qvfr/echo])]
      (is (= (rf/query-v-for-reaction r)
             (subs/query-v-for-reaction r))
          "core re-export and subs fn agree"))))

(deftest cache-and-return-skips-reverse-map-write-when-debug-and-trace-disabled
  (testing "cache-and-return MUST NOT swap! into reaction->query-v when
            debug-enabled? and tracing are false — that reverse map
            backs the public devtools lookup `query-v-for-reaction` and
            the trace-only :input-query-vs tag. In :advanced CLJS
            production with both consumers off, populating it on every
            subscribe would pay a CAS-per-call cost AND grow a map
            across the session for data nothing reads."
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (alter-var-root #'trace/trace-enabled? (constantly false))
    (with-redefs [interop/debug-enabled? false]
      (let [rev @#'subs/reaction->query-v]
        (is (empty? @rev)
            "fixture-clear-subs restored a fresh subs cache; the
             reverse map starts empty")
        (let [r (rf/subscribe [:qvfr/echo])]
          (is (empty? @rev)
              "debug off → cache-and-return skipped the reaction->query-v
               assoc; no entry leaked into the reverse map")
          (is (nil? (rf/query-v-for-reaction r))
              "with the gate active, the public lookup returns nil even
               for a reaction that subscribe just produced — devtools
               aren't expected to run in production"))))
    (testing "and the gate flips back on"
      ;; Clear the subs cache so the next subscribe re-runs
      ;; cache-and-return rather than returning the still-cached
      ;; reaction the inner with-redefs left behind.
      (rf/clear-subscription-cache!)
      (let [r (rf/subscribe [:qvfr/echo])]
        (is (= [:qvfr/echo] (rf/query-v-for-reaction r))
            "debug on (default) → cache-and-return DID swap! into the
             reverse map; confirms the gate isn't trivially always-off")))))

(deftest dispose-cleans-up-reverse-map-even-when-debug-flips-off
  (testing "the on-dispose dissoc on reaction->query-v MUST stay
            unconditional — entries that landed while debug-enabled? was
            true (CLJ default, dev REPL, with-redefs in tests) must be
            removed regardless of the flag's current value, otherwise
            flipping the flag mid-session strands entries permanently"
    (rf/reg-sub :qvfr/echo (fn [db _] (:n db)))
    (reset! db/app-db {:n 1})
    (let [r   (rf/subscribe [:qvfr/echo])
          rev @#'subs/reaction->query-v]
      (is (= [:qvfr/echo] (get @rev r))
          "subscribed under debug-enabled? true → entry present")
      (with-redefs [interop/debug-enabled? false]
        (rf/clear-subscription-cache!))
      (is (nil? (get @rev r))
          "clear-subscription-cache! invoked dispose; the dissoc ran
           even though debug-enabled? was false at dispose time"))))
