(ns re-frame.handler-source-meta-test
  "Tests that the `re-frame.macros` reg-event-db / reg-event-fx /
   reg-event-ctx / reg-sub / reg-fx macros attach `{:file :line}`
   source meta to the registered handler so
   `(meta (re-frame.registrar/get-handler kind id))` returns the
   call-site location.

   Also pins the function-API contract for the parallel symbols in
   `re-frame.core` — those stay `defn`s (so callers can use them in
   value position via `apply` / `map` / `partial`), and don't
   capture source meta. Source-meta is the opt-in delta you get by
   aliasing to `re-frame.macros` instead of `re-frame.core`.

   These run CLJ-side under cognitect.test-runner — the meta-attach
   path is identical between CLJ and CLJS, and the test runner
   doesn't require Chrome."
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [re-frame.core :as rf]
            [re-frame.macros :as rf.m]
            [re-frame.db :as db]
            [re-frame.registrar :as registrar]
            [re-frame.subs :as subs]))

(defn fixture-clear-test-handlers
  "Clean up any handlers a test registered so the registrar atom
   doesn't accumulate :test-meta/* entries across deftests; clear the
   subscription cache so re-registered query-ids don't return a stale
   cached reaction; and reset app-db so dispatch-driven tests don't
   leak state into sibling tests."
  [f]
  (try
    (f)
    (finally
      (doseq [kind [:event :sub :fx]]
        (doseq [id (filter #(= "test-meta" (namespace %))
                           (keys (get @registrar/kind->id->handler kind)))]
          (registrar/clear-handlers kind id)))
      (subs/clear-subscription-cache!)
      (reset! db/app-db {}))))

(use-fixtures :each fixture-clear-test-handlers)

;; -- core stays a function API ------------------------------------------------
;;
;; The whole point of the revert is that `re-frame.core/reg-*` are
;; values you can pass around. Pin that contract — break this test and
;; we've silently re-broken `(map reg-event-db ...)`-style callers.

(deftest core-reg-stars-are-functions
  (testing "re-frame.core registration entry points are defns, not macros"
    (is (fn? rf/reg-event-db))
    (is (fn? rf/reg-event-fx))
    (is (fn? rf/reg-event-ctx))
    (is (fn? rf/reg-sub))
    (is (fn? rf/reg-fx))))

(deftest core-reg-event-db-attaches-no-source-meta
  (testing "the function form does not capture call-site meta — that's the macros' job"
    (rf/reg-event-db :test-meta/plain-fn-path (fn [db _] db))
    (is (nil? (meta (registrar/get-handler :event :test-meta/plain-fn-path)))
        "no &form available to a defn — no meta on the registered chain")))

(deftest decorate-handler-meta-skips-opaque-handler
  (testing "-decorate-handler-meta! silently skips a handler value that can't carry metadata"
    (let [opaque (Object.)]
      (registrar/register-handler :fx :test-meta/opaque-handler opaque)
      (is (nil? (registrar/-decorate-handler-meta!
                 :fx :test-meta/opaque-handler {:file "opaque.clj" :line 1}))
          "decorate returns nil and does not throw")
      (is (identical? opaque (registrar/get-handler :fx :test-meta/opaque-handler))
          "opaque handler remains registered")
      (is (nil? (meta (registrar/get-handler :fx :test-meta/opaque-handler)))
          "no metadata was attached"))))

(deftest core-reg-event-fx-fn-form-dispatches
  (testing "calling re-frame.core/reg-event-fx as a function still works"
    (let [seen (atom nil)]
      (rf/reg-fx :test-meta/fx-spy (fn [v] (reset! seen v)))
      (rf/reg-event-fx :test-meta/fx-handler
                       (fn [_ [_ payload]]
                         {:test-meta/fx-spy payload}))
      (rf/dispatch-sync [:test-meta/fx-handler :hello])
      (is (= :hello @seen)
          "fx event-handler fired and the returned effect map was processed by do-fx"))))

(deftest core-reg-event-ctx-fn-form-receives-context
  (testing "re-frame.core/reg-event-ctx (defn form) registers a ctx-style handler that receives the full context under dispatch-sync"
    (let [seen-event (atom nil)
          seen-db    (atom nil)]
      (reset! db/app-db {:test-meta/marker :present})
      (rf/reg-event-ctx :test-meta/ctx-handler
                        (fn [ctx]
                          (reset! seen-event (get-in ctx [:coeffects :event]))
                          (reset! seen-db    (get-in ctx [:coeffects :db]))
                          ctx))
      (rf/dispatch-sync [:test-meta/ctx-handler :payload])
      (is (= [:test-meta/ctx-handler :payload] @seen-event))
      (is (= {:test-meta/marker :present} @seen-db)))))

(deftest core-reg-sub-fn-form-derefs
  (testing "re-frame.core/reg-sub (defn form, 2-ary) registers a sub whose deref returns the computation against app-db"
    (rf/reg-sub :test-meta/sub-2ary (fn [d _] (:n d)))
    (reset! db/app-db {:n 42})
    (let [r (rf/subscribe [:test-meta/sub-2ary])]
      (is (= 42 @r)))))

(deftest core-reg-sub-fn-form-with-sugar-pair
  (testing "re-frame.core/reg-sub composes :<- sugar pairs"
    (rf/reg-sub :test-meta/sub-leaf    (fn [d _] (:n d)))
    (rf/reg-sub :test-meta/sub-derived
                :<- [:test-meta/sub-leaf]
                (fn [n _] (* 2 n)))
    (reset! db/app-db {:n 21})
    (let [r (rf/subscribe [:test-meta/sub-derived])]
      (is (= 42 @r)))))

(deftest core-reg-fx-fn-form
  (testing "re-frame.core/reg-fx (defn form) registers an effect handler that fires when an event returns the registered effect"
    (let [seen (atom nil)]
      (rf/reg-fx :test-meta/fx-via-fn (fn [v] (reset! seen v)))
      (rf/reg-event-fx :test-meta/dispatcher
                       (fn [_ _] {:test-meta/fx-via-fn [1 2 3]}))
      (rf/dispatch-sync [:test-meta/dispatcher])
      (is (= [1 2 3] @seen)))))

(deftest core-reg-stars-work-in-value-position
  (testing "the regression we're guarding against — apply / map over the reg-* fns"
    (let [recorded (atom {})]
      (apply rf/reg-event-fx
             [:test-meta/applied
              (fn [_ [_ tag]]
                (swap! recorded assoc :applied tag)
                {})])
      (let [ids [:test-meta/m1 :test-meta/m2 :test-meta/m3]
            fs  [(fn [d _] (:a d))
                 (fn [d _] (:b d))
                 (fn [d _] (:c d))]]
        (dorun (map rf/reg-sub ids fs)))
      (reset! db/app-db {:a 1 :b 2 :c 3})
      (rf/dispatch-sync [:test-meta/applied :ok])
      (is (= :ok (:applied @recorded))
          "(apply reg-event-fx ...) registers a handler that responds to dispatch-sync")
      (is (= [1 2 3]
             [@(rf/subscribe [:test-meta/m1])
              @(rf/subscribe [:test-meta/m2])
              @(rf/subscribe [:test-meta/m3])])
          "(map reg-sub ids fns) registers each id with its corresponding computation-fn"))))

(deftest core-reg-fx-works-in-value-position
  (testing "value-position regression for reg-fx specifically"
    (let [seen (atom [])
          ids  [:test-meta/p1 :test-meta/p2]
          fns  [(fn [v] (swap! seen conj [:p1 v]))
                (fn [v] (swap! seen conj [:p2 v]))]]
      (dorun (map rf/reg-fx ids fns))
      (rf/reg-event-fx :test-meta/p-dispatcher
                       (fn [_ _] {:test-meta/p1 1 :test-meta/p2 2}))
      (rf/dispatch-sync [:test-meta/p-dispatcher])
      (is (= #{[:p1 1] [:p2 2]} (set @seen))))))

;; -- macros opt-in: source-meta capture ---------------------------------------

(deftest macros-reg-event-db-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after re-frame.macros/reg-event-db"
    (rf.m/reg-event-db :test-meta/db-handler (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-meta/db-handler))]
      (is (some? m)
          "registered handler carries metadata after re-frame.macros/reg-event-db")
      (is (string? (:file m))
          ":file is a string from *file* at expansion time")
      (is (re-find #"handler_source_meta_test\.clj$" (:file m))
          ":file points at this test file")
      (is (pos-int? (:line m))
          ":line is a positive int from (:line (meta &form))"))))

(deftest macros-reg-event-fx-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after re-frame.macros/reg-event-fx"
    (rf.m/reg-event-fx :test-meta/fx-handler (fn [_ _] {}))
    (let [m (meta (registrar/get-handler :event :test-meta/fx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-reg-event-ctx-attaches-source-meta
  (testing "(meta (get-handler :event id)) returns {:file :line} after re-frame.macros/reg-event-ctx"
    (rf.m/reg-event-ctx :test-meta/ctx-handler identity)
    (let [m (meta (registrar/get-handler :event :test-meta/ctx-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m))))))

(deftest macros-reg-sub-attaches-source-meta
  (testing "(meta (get-handler :sub id)) returns {:file :line} after re-frame.macros/reg-sub"
    (rf.m/reg-sub :test-meta/sub-handler (fn [db _] (:n db)))
    (let [m (meta (registrar/get-handler :sub :test-meta/sub-handler))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-reg-fx-attaches-source-meta
  (testing "(meta (get-handler :fx id)) returns {:file :line} after re-frame.macros/reg-fx"
    (rf.m/reg-fx :test-meta/fx-effect (fn [_] nil))
    (let [m (meta (registrar/get-handler :fx :test-meta/fx-effect))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m)))
      (is (pos-int? (:line m))))))

(deftest macros-different-call-sites-have-different-line-numbers
  (testing "two re-frame.macros/reg-event-db calls in this test get distinct :line meta"
    (rf.m/reg-event-db :test-meta/site-a (fn [db _] db))
    (rf.m/reg-event-db :test-meta/site-b (fn [db _] db))
    (let [a (:line (meta (registrar/get-handler :event :test-meta/site-a)))
          b (:line (meta (registrar/get-handler :event :test-meta/site-b)))]
      (is (pos-int? a))
      (is (pos-int? b))
      (is (not= a b)
          "macros capture &form line — two adjacent call sites get different lines"))))

(deftest macros-reg-event-db-with-interceptors-attaches-meta
  (testing "the 3-ary form (id interceptors handler) also captures source meta"
    (rf.m/reg-event-db :test-meta/with-interceptors []
                       (fn [db _] db))
    (let [m (meta (registrar/get-handler :event :test-meta/with-interceptors))]
      (is (some? m))
      (is (string? (:file m))))))

(deftest macros-reg-sub-with-sugar-pair-still-meta
  (testing "the variadic :<- sugar form still composes AND meta lands on the derived sub"
    (rf.m/reg-sub :test-meta/sugared-leaf    (fn [d _] (:n d)))
    (rf.m/reg-sub :test-meta/sugared-derived
                  :<- [:test-meta/sugared-leaf]
                  (fn [n _] (* 2 n)))
    (reset! db/app-db {:n 21})
    (let [r (rf/subscribe [:test-meta/sugared-derived])]
      (is (= 42 @r)
          ":<- sugar pair routes the upstream sub's value to the computation-fn"))
    (let [m (meta (registrar/get-handler :sub :test-meta/sugared-derived))]
      (is (some? m))
      (is (re-find #"handler_source_meta_test\.clj$" (:file m))))))

;; -- macro-ness shape probes --------------------------------------------------

(deftest macros-reg-stars-are-macros
  (testing "macroexpand-1 reveals the if-on-debug-enabled? + decorate-handler-meta! shape"
    (doseq [[form expected-kind expected-fn]
            [['(re-frame.macros/reg-event-db  :foo identity) :event 're-frame.core/reg-event-db]
             ['(re-frame.macros/reg-event-fx  :foo identity) :event 're-frame.core/reg-event-fx]
             ['(re-frame.macros/reg-event-ctx :foo identity) :event 're-frame.core/reg-event-ctx]
             ['(re-frame.macros/reg-sub       :foo identity) :sub   're-frame.core/reg-sub]
             ['(re-frame.macros/reg-fx        :foo identity) :fx    're-frame.core/reg-fx]]]
      (let [expanded (macroexpand-1 form)
            flat     (tree-seq coll? seq expanded)]
        (is (some #(= 'if %) flat)
            (str form " emits an if-on-debug-enabled? gate"))
        (is (some #(= 're-frame.interop/debug-enabled? %) flat)
            (str form " gates on re-frame.interop/debug-enabled?"))
        (is (some #(= 're-frame.registrar/-decorate-handler-meta! %) flat)
            (str form " calls -decorate-handler-meta!"))
        (is (some #(= expected-kind %) flat)
            (str form " passes :" (name expected-kind) " as the handler kind"))
        (is (some #(= expected-fn %) flat)
            (str form " delegates to " expected-fn))))))
