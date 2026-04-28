(ns re-frame.tooling-test
  "Smoke + structural tests for `re-frame.tooling`.

   Two angles, mirroring `re-frame.macros-standalone-require-test`:

   1. Behavioural: every re-export at `re-frame.tooling/X` equals (and,
      where it is a stateful container, is `identical?` to) the source-
      of-truth var. Catches typos, wrong-target re-exports, and — under
      CLJS `:advanced` — the closure compiler dropping/folding a
      re-export silently. By referencing every name from this test ns,
      we keep them all live for any DCE pass that runs over the test
      bundle, so a missing re-export fails fast as a test failure
      rather than reappearing as a NPE in a downstream tool months
      later.

   2. Structural (CLJ-only): parse the `ns` form on disk and assert it
      `:requires` exactly the four source-of-truth namespaces. Pins
      the rule that the tooling surface stays a thin re-export of
      those four — adding a 5th source ns is then a deliberate edit
      that updates this test, not an accident."
  (:require
   #?(:clj  [clojure.test :refer [deftest is testing]]
      :cljs [cljs.test :refer-macros [deftest is testing]])
   #?(:clj [clojure.java.io :as io])
   [re-frame.core      :as core]
   [re-frame.registrar :as registrar]
   [re-frame.subs      :as subs]
   [re-frame.tooling   :as tooling]
   [re-frame.trace     :as trace]))

(deftest re-exports-match-source-of-truth
  (testing "from re-frame.core"
    (is (= core/dispatch-with        tooling/dispatch-with))
    (is (= core/dispatch-sync-with   tooling/dispatch-sync-with))
    (is (= core/dispatch-and-settle  tooling/dispatch-and-settle))
    (is (= core/query-v-for-reaction tooling/query-v-for-reaction))
    (is (= core/live-query-vs        tooling/live-query-vs))
    (is (= core/version              tooling/version)))
  (testing "from re-frame.trace"
    (is (= trace/tag-schema                 tooling/tag-schema))
    (is (= trace/validate-trace?            tooling/validate-trace?))
    (is (= trace/set-validate-trace!        tooling/set-validate-trace!))
    (is (= trace/check-trace-against-schema tooling/check-trace-against-schema))
    (is (= trace/register-trace-cb          tooling/register-trace-cb))
    (is (= trace/remove-trace-cb            tooling/remove-trace-cb))
    (is (= trace/register-epoch-cb          tooling/register-epoch-cb))
    (is (= trace/remove-epoch-cb            tooling/remove-epoch-cb))
    (is (= trace/assemble-epochs            tooling/assemble-epochs)))
  (testing "from re-frame.subs"
    (is (= subs/query->reaction tooling/query->reaction)))
  (testing "from re-frame.registrar"
    (is (= registrar/kind->id->handler tooling/kind->id->handler))))

(deftest stateful-re-exports-share-identity
  (testing "atom re-exports point at the same atom (not a copy) — tooling
            consumers that swap! / reset! / add-watch on these must see
            the same state the runtime is mutating, otherwise observers
            would silently desync"
    (is (identical? subs/query->reaction        tooling/query->reaction))
    (is (identical? registrar/kind->id->handler tooling/kind->id->handler))))

(deftest tag-schema-is-the-same-map
  (testing "tag-schema is data, not a fn — assert the map matches the
            source-of-truth so re-exports of value-bound (def x ...)
            forms can't fall behind the source after a schema edit"
    (is (= trace/tag-schema tooling/tag-schema))))

#?(:clj
   (deftest ns-form-requires-exactly-the-four-source-namespaces
     (testing "re-frame.tooling :requires exactly re-frame.core,
               re-frame.registrar, re-frame.subs, and re-frame.trace —
               adding a 5th source ns is a deliberate, reviewed edit
               that updates this test alongside the new re-exports"
       (let [form            (with-open [r (java.io.PushbackReader. (io/reader "src/re_frame/tooling.cljc"))]
                               (read {:read-cond :allow} r))
             require-clauses (->> form
                                  (filter list?)
                                  (filter #(= :require (first %)))
                                  (mapcat rest))
             required-nses   (set (map #(if (symbol? %) % (first %)) require-clauses))]
         (is (= #{'re-frame.core
                  're-frame.registrar
                  're-frame.subs
                  're-frame.trace}
                required-nses))))))
