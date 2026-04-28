(ns re-frame.dispatch-with-test
  "Tests that `re-frame.core/dispatch-with` and
   `re-frame.core/dispatch-sync-with` substitute fx handlers via
   per-event metadata for the duration of the dispatch (and any
   `:fx [:dispatch ...]` cascade), without leaking into other
   dispatches and without requiring a try/finally restore.

   These run CLJ-side under cognitect.test-runner — the override
   propagation machinery is platform-independent: the relevant code
   lives in `re-frame.core` (`vary-meta` on the event), `re-frame.fx`
   (`*current-overrides*` + `effect-handler`), and `re-frame.router`
   (`tag-with-fx-overrides` cascade propagation), all in `.cljc`.

   Coverage targets:
   - `re-frame.core/dispatch-with` — vary-meta with :re-frame/fx-overrides
   - `re-frame.core/dispatch-sync-with` — sync variant
   - `re-frame.fx/*current-overrides*` — dynamic var bound in do-fx-after
   - `re-frame.fx/effect-handler` — override-or-registrar resolution
   - `re-frame.router/tag-with-fx-overrides` — cascade propagation"
  (:require [clojure.test     :refer [deftest is testing use-fixtures]]
            [re-frame.core    :as rf]
            [re-frame.db      :as db]
            [re-frame.loggers :as loggers]
            [clojure.string   :as str]))

(defn fixture-re-frame
  [f]
  (let [restore (rf/make-restore-fn)]
    (try
      (f)
      (finally
        (restore)))))

(use-fixtures :each fixture-re-frame)

;; ---------------------------------------------------------------------------
;; Override fires instead of registered handler
;; ---------------------------------------------------------------------------

(deftest override-fires-instead-of-registered-handler
  (testing "when dispatch-with provides a stub for an fx-id, the stub
            runs with the effect value and the registered handler does NOT"
    (let [registered-calls (atom [])
          stub-calls       (atom [])
          delivered        (promise)]
      (rf/reg-fx :dw-test/fx
                 (fn [v] (swap! registered-calls conj v)))
      (rf/reg-event-fx :dw-test/fire
                       (fn [_ [_ payload]]
                         {:dw-test/fx payload}))
      (rf/dispatch-with [:dw-test/fire {:from :stub-test}]
                        {:dw-test/fx (fn [v]
                                       (swap! stub-calls conj v)
                                       (deliver delivered :stub-ran))})
      (is (= :stub-ran (deref delivered 1000 ::timed-out))
          "stub fired before timeout — async dispatch reached do-fx-after")
      (is (= [{:from :stub-test}] @stub-calls)
          "stub got the effect value the handler returned")
      (is (empty? @registered-calls)
          "registered handler did NOT fire — the override took priority"))))

;; ---------------------------------------------------------------------------
;; :db override leaves the global ratom alone
;; ---------------------------------------------------------------------------

(deftest db-override-does-not-mutate-global-app-db
  (testing "an override for :db lets a probe see what the effect would
            have done to app-db without committing to the global ratom —
            the docstring claim at re-frame.fx around run-effects!"
    (reset! db/app-db {:initial true})
    (let [seen-new-db (promise)]
      (rf/reg-event-db :dw-test/touch-db
                       (fn [_db _]
                         {:probed true}))
      (rf/dispatch-with [:dw-test/touch-db]
                        {:db (fn [new-db]
                               (deliver seen-new-db new-db))})
      (let [observed (deref seen-new-db 1000 ::timed-out)]
        (is (not= ::timed-out observed)
            ":db override fired before timeout")
        (is (= {:probed true} observed)
            ":db override receives the new-db the handler returned"))
      (is (= {:initial true} @db/app-db)
          "global app-db is untouched — :db override replaced the
           default reset! with a probe"))))

;; ---------------------------------------------------------------------------
;; Cascade propagation: child dispatched via :fx [:dispatch ...] inherits
;; ---------------------------------------------------------------------------

(deftest overrides-propagate-to-fx-dispatch-cascade
  (testing "a parent dispatched via dispatch-with returning
            {:fx [[:dispatch [:child]]]} causes the child to inherit the
            override map — covers tag-with-fx-overrides in router.cljc"
    (let [parent-calls (atom [])
          child-calls  (atom [])
          delivered    (promise)]
      (rf/reg-fx :dw-test/cascade-fx
                 (fn [_v]
                   (throw (ex-info "real :dw-test/cascade-fx ran — override leak"
                                   {}))))
      (rf/reg-event-fx :dw-test/parent
                       (fn [_ _]
                         {:fx [[:dispatch [:dw-test/child]]]}))
      (rf/reg-event-fx :dw-test/child
                       (fn [_ _]
                         {:dw-test/cascade-fx :child-effect}))
      (rf/dispatch-with [:dw-test/parent]
                        {:dw-test/cascade-fx
                         (fn [v]
                           (swap! child-calls conj v)
                           (deliver delivered :child-stub-ran))})
      (is (= :child-stub-ran (deref delivered 1000 ::timed-out))
          "child stub fired — overrides crossed the queue boundary
           via tag-with-fx-overrides")
      (is (= [:child-effect] @child-calls)
          "child stub received the child handler's effect value")
      (is (empty? @parent-calls)
          "no leak from parent's effects (parent has no :dw-test/cascade-fx)"))))

;; ---------------------------------------------------------------------------
;; :fx inner effects honour overrides
;; ---------------------------------------------------------------------------

(deftest fx-inner-effects-honour-overrides
  (testing "an event that returns {:fx [[:my-fx ...]]} (inner effect of
            the :fx vector form) fires the override for :my-fx, not the
            registered handler — covers the effect-handler call inside
            the :fx handler at re-frame.fx"
    (let [registered-calls (atom [])
          stub-calls       (atom [])
          delivered        (promise)]
      (rf/reg-fx :dw-test/inner-fx
                 (fn [v] (swap! registered-calls conj v)))
      (rf/reg-event-fx :dw-test/fire-inner
                       (fn [_ _]
                         {:fx [[:dw-test/inner-fx :inner-payload]]}))
      (rf/dispatch-with [:dw-test/fire-inner]
                        {:dw-test/inner-fx
                         (fn [v]
                           (swap! stub-calls conj v)
                           (deliver delivered :stub-ran))})
      (is (= :stub-ran (deref delivered 1000 ::timed-out))
          "inner-fx stub fired — *current-overrides* dynamic binding
           reaches the inline :fx handler too")
      (is (= [:inner-payload] @stub-calls))
      (is (empty? @registered-calls)
          "registered :dw-test/inner-fx did NOT fire — override took priority
           inside the :fx vector form, not just at the top-level effect map"))))

;; ---------------------------------------------------------------------------
;; Two overlapping dispatch-with calls don't cross-contaminate
;; ---------------------------------------------------------------------------

(deftest overlapping-dispatch-with-calls-do-not-cross-contaminate
  (testing "two dispatch-with calls each carry their own override map in
            their own event meta — the second call's stub does not
            observe events from the first, and vice versa — docstring
            claim around overrides expiring with event scope"
    (let [a-stub-calls (atom [])
          b-stub-calls (atom [])
          a-done       (promise)
          b-done       (promise)]
      (rf/reg-fx :dw-test/parallel-fx
                 (fn [_v]
                   (throw (ex-info "real :dw-test/parallel-fx ran — override leak"
                                   {}))))
      (rf/reg-event-fx :dw-test/a-fire
                       (fn [_ _]
                         {:dw-test/parallel-fx :from-a}))
      (rf/reg-event-fx :dw-test/b-fire
                       (fn [_ _]
                         {:dw-test/parallel-fx :from-b}))
      (rf/dispatch-with [:dw-test/a-fire]
                        {:dw-test/parallel-fx
                         (fn [v]
                           (swap! a-stub-calls conj v)
                           (deliver a-done :a-ran))})
      (rf/dispatch-with [:dw-test/b-fire]
                        {:dw-test/parallel-fx
                         (fn [v]
                           (swap! b-stub-calls conj v)
                           (deliver b-done :b-ran))})
      (is (= :a-ran (deref a-done 1000 ::timed-out)))
      (is (= :b-ran (deref b-done 1000 ::timed-out)))
      (is (= [:from-a] @a-stub-calls)
          "stub A only saw effects from event A — its own meta carried
           its own override map")
      (is (= [:from-b] @b-stub-calls)
          "stub B only saw effects from event B — meta from A's
           dispatch-with did not bleed into B's handling frame"))))

;; ---------------------------------------------------------------------------
;; Override expires at end of event — no try/finally needed
;; ---------------------------------------------------------------------------

(deftest override-expires-with-the-event
  (testing "after dispatch-with completes, a subsequent plain dispatch
            for the same fx-id fires the REAL handler — the override
            does not leave a stale stub installed anywhere global.
            This is the no-try/finally claim in dispatch-with's docstring."
    (let [registered-calls (atom [])
          stub-calls       (atom [])
          stub-done        (promise)
          real-done        (promise)]
      (rf/reg-fx :dw-test/expiring-fx
                 (fn [v]
                   (swap! registered-calls conj v)
                   (deliver real-done :real-ran)))
      (rf/reg-event-fx :dw-test/expire-event
                       (fn [_ [_ token]]
                         {:dw-test/expiring-fx token}))
      ;; First dispatch — overridden.
      (rf/dispatch-with [:dw-test/expire-event :first]
                        {:dw-test/expiring-fx
                         (fn [v]
                           (swap! stub-calls conj v)
                           (deliver stub-done :stub-ran))})
      (is (= :stub-ran (deref stub-done 1000 ::timed-out)))
      ;; Second dispatch — no override; the registered handler must run.
      (rf/dispatch [:dw-test/expire-event :second])
      (is (= :real-ran (deref real-done 1000 ::timed-out))
          "the registered handler fired on the SECOND dispatch — proves
           the override didn't persist past the first event's scope")
      (is (= [:first] @stub-calls)
          "stub only saw the first event")
      (is (= [:second] @registered-calls)
          "registered handler only saw the second event"))))

;; ---------------------------------------------------------------------------
;; Unknown fx-id with no override — warning still fires
;; ---------------------------------------------------------------------------

(deftest unknown-fx-id-warning-still-fires-without-override
  (testing "when an event returns an effect for an fx-id that is neither
            registered nor present in overrides, the existing
            (console :warn ...) for unknown effects still fires —
            override path doesn't suppress the diagnostic"
    (let [warnings         (atom [])
          original-loggers (loggers/get-loggers)]
      (try
        (loggers/set-loggers!
         {:warn (fn [& args] (swap! warnings conj (apply str args)))})
        (rf/reg-event-fx :dw-test/unknown-fire
                         (fn [_ _]
                           {:dw-test/never-registered :payload}))
        (rf/dispatch-sync-with [:dw-test/unknown-fire]
                               {:dw-test/some-other-fx (fn [_] :ignored)})
        (is (some #(str/includes? % ":dw-test/never-registered") @warnings)
            "the unknown-effect warning still mentions the missing fx-id
             when overrides are present but don't cover it")
        (finally
          (loggers/set-loggers! original-loggers))))))

;; ---------------------------------------------------------------------------
;; dispatch-sync-with — sync variant reads the same override meta
;; ---------------------------------------------------------------------------

(deftest dispatch-sync-with-applies-overrides-on-the-sync-path
  (testing "dispatch-sync-with takes the synchronous handle path but
            still threads the override map through do-fx-after — same
            mechanism as dispatch-with, no separate sync-only code path"
    (let [registered-calls (atom [])
          stub-calls       (atom [])]
      (rf/reg-fx :dw-test/sync-fx
                 (fn [v] (swap! registered-calls conj v)))
      (rf/reg-event-fx :dw-test/sync-fire
                       (fn [_ [_ payload]]
                         {:dw-test/sync-fx payload}))
      (rf/dispatch-sync-with [:dw-test/sync-fire :sync-payload]
                             {:dw-test/sync-fx
                              (fn [v] (swap! stub-calls conj v))})
      ;; No promise/deref needed — dispatch-sync-with returns after the
      ;; handler chain has run synchronously.
      (is (= [:sync-payload] @stub-calls)
          "stub received the effect value on the sync path")
      (is (empty? @registered-calls)
          "registered handler did not fire on dispatch-sync-with"))))

(deftest dispatch-sync-with-returns-nil
  (testing "dispatch-sync-with mirrors dispatch-sync's nil return
            (and dispatch-with mirrors dispatch's nil return) — the
            return-value contract in dispatch-with's docstring"
    (rf/reg-event-db :dw-test/return-shape (fn [db _] db))
    (is (nil? (rf/dispatch-with [:dw-test/return-shape] {})))
    (is (nil? (rf/dispatch-sync-with [:dw-test/return-shape] {})))))
