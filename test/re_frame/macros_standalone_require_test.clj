(ns re-frame.macros-standalone-require-test
  "Pins the contract that `(:require [re-frame.macros])` is sufficient
   on its own — i.e. the user does NOT also have to require
   `re-frame.core`, `re-frame.interop`, or `re-frame.registrar` for
   the macro expansions to resolve. The macros emit fully-qualified
   symbols (`re-frame.core/dispatch`, `re-frame.interop/debug-enabled?`,
   `re-frame.registrar/-decorate-handler-meta!`), so those namespaces
   must be loaded transitively when re-frame.macros is required.

   Regression guard for: a previous revision of `re-frame.macros` had
   no `:require` clause at all; consumers who followed the docstring
   recommendation (just require re-frame.macros) hit a
   namespace-not-found at first macro expansion.

   Two angles:
   1. Structural: parse the `ns` form on disk and assert the `:require`
      lists `re-frame.core`, `re-frame.interop`, and
      `re-frame.registrar`. This pins the *rule* against accidental
      removal during a future cleanup.
   2. Behavioural: macroexpand-and-eval each macro in a sandbox ns
      whose only require is `re-frame.macros`, and assert no
      exception. Inside the same JVM all deps are inevitably already
      loaded by other tests, so this can't simulate a truly fresh
      classloader — but it does verify the emitted forms compile and
      run when the *user's own* ns has only re-frame.macros aliased."
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.java.io :as io]
            [re-frame.macros]))

(defn- read-ns-form
  "Read the leading `ns` form from a `.cljc` file. `:read-cond :allow`
   keeps the `#?(:cljs ...)` reader conditionals as ReaderConditional
   objects rather than throwing."
  [path]
  (with-open [r (java.io.PushbackReader. (io/reader path))]
    (read {:read-cond :allow} r)))

(deftest ns-form-requires-core-interop-and-registrar
  (testing "re-frame.macros ns form must :require re-frame.core, re-frame.interop, and re-frame.registrar"
    (let [form           (read-ns-form "src/re_frame/macros.cljc")
          require-clauses (->> form
                               (filter list?)
                               (filter #(= :require (first %)))
                               (mapcat rest))
          required-nses  (set (map #(if (symbol? %) % (first %)) require-clauses))]
      (is (contains? required-nses 're-frame.core)
          "re-frame.core must be in :require so macro expansions resolving re-frame.core/dispatch don't hit namespace-not-found")
      (is (contains? required-nses 're-frame.interop)
          "re-frame.interop must be in :require so re-frame.interop/debug-enabled? in the macro expansion resolves")
      (is (contains? required-nses 're-frame.registrar)
          "re-frame.registrar must be in :require so re-frame.registrar/-decorate-handler-meta! in the reg-* macro expansions resolves"))))

(deftest macros-resolve-in-ns-that-only-requires-re-frame-macros
  (testing "expand+eval each macro form in a sandbox ns whose only require is re-frame.macros"
    (let [sandbox (create-ns (gensym 're-frame.macros-sandbox-))
          ok      (atom true)]
      (try
        (binding [*ns* sandbox]
          (refer 'clojure.core)
          (eval '(require '[re-frame.macros]))
          (doseq [form '[(re-frame.macros/dispatch-sync           [:macros-standalone-test/noop])
                         (re-frame.macros/dispatch                [:macros-standalone-test/noop])
                         (re-frame.macros/dispatch-with           [:macros-standalone-test/noop] {})
                         (re-frame.macros/dispatch-sync-with      [:macros-standalone-test/noop] {})
                         (re-frame.macros/dispatch-and-settle     [:macros-standalone-test/noop])
                         (re-frame.macros/subscribe               [:macros-standalone-test/noop])
                         (re-frame.macros/reg-event-db            :macros-standalone-test/db   (fn [db _] db))
                         (re-frame.macros/reg-event-fx            :macros-standalone-test/fx   (fn [_ _] {}))
                         (re-frame.macros/reg-event-ctx           :macros-standalone-test/ctx  identity)
                         (re-frame.macros/reg-event-error-handler (fn [_ _] nil))
                         (re-frame.macros/reg-sub                 :macros-standalone-test/sub  (fn [d _] d))
                         (re-frame.macros/reg-sub-raw             :macros-standalone-test/sub-raw (fn [_db _qv] (re-frame.interop/make-reaction (constantly nil))))
                         (re-frame.macros/reg-fx                  :macros-standalone-test/fxh  (fn [_] nil))
                         (re-frame.macros/reg-cofx                :macros-standalone-test/cofxh (fn [c] c))]]
            (try
              (eval form)
              (catch Exception e
                (reset! ok false)
                (is false (str form " threw: " (.getMessage e)))))))
        (finally
          (remove-ns (.name sandbox))))
      (is @ok
          "all macros expand+eval cleanly in an ns whose only require is re-frame.macros — proves :require [re-frame.core] [re-frame.interop] [re-frame.registrar] is loading them transitively"))))

(deftest passthrough-defs-resolve
  (testing "the def re-exports of re-frame.core symbols all resolve and point at the same value as re-frame.core"
    ;; Pin each passthrough symbol so a future cleanup that removes
    ;; one is caught immediately. Pairs the macro coverage above —
    ;; together they make the alias swap (re-frame.core →
    ;; re-frame.macros) safe across the full public surface of an app.
    (require 're-frame.core 're-frame.macros)
    (doseq [sym '[add-post-event-callback remove-post-event-callback
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
                  tag-schema validate-trace? set-validate-trace!
                  register-trace-cb remove-trace-cb
                  register-epoch-cb remove-epoch-cb assemble-epochs
                  version
                  register-handler register-sub]]
      (let [core-var   (resolve (symbol "re-frame.core"   (name sym)))
            macros-var (resolve (symbol "re-frame.macros" (name sym)))]
        (is (some? macros-var)
            (str "re-frame.macros/" sym " must resolve"))
        (is (= @core-var @macros-var)
            (str "re-frame.macros/" sym " must hold the same value as re-frame.core/" sym))))))
