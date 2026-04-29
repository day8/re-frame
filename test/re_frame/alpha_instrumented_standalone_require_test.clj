(ns re-frame.alpha-instrumented-standalone-require-test
  "Pins the contract that `(:require [re-frame.alpha-instrumented])` is
   sufficient on its own — i.e. the user does NOT also have to require
   `re-frame.alpha`, `re-frame.interop`, or `re-frame.registrar` for
   the macro expansions to resolve. The macros emit fully-qualified
   symbols (`re-frame.alpha/dispatch`,
   `re-frame.interop/debug-enabled?`,
   `re-frame.registrar/-decorate-handler-meta!`), so those namespaces
   must be loaded transitively when re-frame.alpha-instrumented is
   required.

   Mirrors the contract pinned in
   `re-frame.core-instrumented-standalone-require-test`."
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.java.io :as io]
            [re-frame.alpha-instrumented]))

(defn- read-ns-form
  [path]
  (with-open [r (java.io.PushbackReader. (io/reader path))]
    (read {:read-cond :allow} r)))

(deftest ns-form-requires-alpha-interop-and-registrar
  (testing "re-frame.alpha-instrumented ns form must :require re-frame.alpha, re-frame.interop, and re-frame.registrar"
    (let [form           (read-ns-form "src/re_frame/alpha_instrumented.cljc")
          require-clauses (->> form
                               (filter list?)
                               (filter #(= :require (first %)))
                               (mapcat rest))
          required-nses  (set (map #(if (symbol? %) % (first %)) require-clauses))]
      (is (contains? required-nses 're-frame.alpha)
          "re-frame.alpha must be in :require so macro expansions resolving re-frame.alpha/dispatch don't hit namespace-not-found")
      (is (contains? required-nses 're-frame.interop)
          "re-frame.interop must be in :require so re-frame.interop/debug-enabled? in the macro expansion resolves")
      (is (contains? required-nses 're-frame.registrar)
          "re-frame.registrar must be in :require so re-frame.registrar/-decorate-handler-meta! in the reg-* macro expansions resolves"))))

(deftest macros-resolve-in-ns-that-only-requires-re-frame-alpha-instrumented
  (testing "expand+eval each macro form in a sandbox ns whose only require is re-frame.alpha-instrumented"
    (let [sandbox (create-ns (gensym 're-frame.alpha-instrumented-sandbox-))
          ok      (atom true)]
      (try
        (binding [*ns* sandbox]
          (refer 'clojure.core)
          (eval '(require '[re-frame.alpha-instrumented]))
          (doseq [form '[(re-frame.alpha-instrumented/dispatch-sync           [:alpha-instrumented-test/noop])
                         (re-frame.alpha-instrumented/dispatch                [:alpha-instrumented-test/noop])
                         (re-frame.alpha-instrumented/dispatch-with           [:alpha-instrumented-test/noop] {})
                         (re-frame.alpha-instrumented/dispatch-sync-with      [:alpha-instrumented-test/noop] {})
                         (re-frame.alpha-instrumented/dispatch-and-settle     [:alpha-instrumented-test/noop])
                         (re-frame.alpha-instrumented/subscribe               [:alpha-instrumented-test/noop])
                         (re-frame.alpha-instrumented/reg-event-db            :alpha-instrumented-test/db   (fn [db _] db))
                         (re-frame.alpha-instrumented/reg-event-fx            :alpha-instrumented-test/fx   (fn [_ _] {}))
                         (re-frame.alpha-instrumented/reg-event-ctx           :alpha-instrumented-test/ctx  identity)
                         (re-frame.alpha-instrumented/reg-event-error-handler (fn [_ _] nil))
                         (re-frame.alpha-instrumented/reg-sub                 :alpha-instrumented-test/sub  (fn [d _] d))
                         (re-frame.alpha-instrumented/reg-sub-raw             :alpha-instrumented-test/sub-raw (fn [_db _qv] (re-frame.interop/make-reaction (constantly nil))))
                         (re-frame.alpha-instrumented/reg-fx                  :alpha-instrumented-test/fxh  (fn [_] nil))
                         (re-frame.alpha-instrumented/reg-cofx                :alpha-instrumented-test/cofxh (fn [c] c))]]
            (try
              (eval form)
              (catch Exception e
                (reset! ok false)
                (is false (str form " threw: " (.getMessage e)))))))
        (finally
          (remove-ns (.name sandbox))))
      (is @ok
          "all alpha-instrumented macros expand+eval cleanly in an ns whose only require is re-frame.alpha-instrumented"))))

(deftest passthrough-defs-resolve
  (testing "the def re-exports of re-frame.alpha symbols all resolve and point at the same value as re-frame.alpha"
    (require 're-frame.alpha 're-frame.alpha-instrumented)
    (doseq [sym '[reg sub reg-flow clear-flow get-flow flow<-
                  add-post-event-callback remove-post-event-callback
                  make-restore-fn purge-event-queue enqueue
                  clear-event clear-sub clear-fx clear-cofx
                  clear-subscription-cache! clear-global-interceptor
                  query-v-for-reaction live-query-vs
                  get-coeffect assoc-coeffect get-effect assoc-effect
                  ->interceptor inject-cofx
                  path enrich after on-changes
                  debug unwrap trim-v
                  reg-global-interceptor
                  set-loggers! console
                  version
                  register-handler register-sub]]
      (let [alpha-var (resolve (symbol "re-frame.alpha"               (name sym)))
            inst-var  (resolve (symbol "re-frame.alpha-instrumented"  (name sym)))]
        (is (some? inst-var)
            (str "re-frame.alpha-instrumented/" sym " must resolve"))
        (is (= @alpha-var @inst-var)
            (str "re-frame.alpha-instrumented/" sym " must hold the same value as re-frame.alpha/" sym))))))
