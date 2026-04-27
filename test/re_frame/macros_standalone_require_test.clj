(ns re-frame.macros-standalone-require-test
  "Pins the contract that `(:require [re-frame.macros])` is sufficient
   on its own — i.e. the user does NOT also have to require
   `re-frame.core` and `re-frame.interop` for the macro expansions to
   resolve. The macros emit fully-qualified symbols
   (`re-frame.core/dispatch`, `re-frame.interop/debug-enabled?`), so
   those namespaces must be loaded transitively when re-frame.macros
   is required.

   Regression guard for: a previous revision of `re-frame.macros` had
   no `:require` clause at all; consumers who followed the docstring
   recommendation (just require re-frame.macros) hit a
   namespace-not-found at first macro expansion.

   Two angles:
   1. Structural: parse the `ns` form on disk and assert the `:require`
      lists `re-frame.core` and `re-frame.interop`. This pins the
      *rule* against accidental removal during a future cleanup.
   2. Behavioural: macroexpand-and-eval each macro in a sandbox ns
      whose only require is `re-frame.macros`, and assert no
      exception. Inside the same JVM both deps are inevitably already
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

(deftest ns-form-requires-core-and-interop
  (testing "re-frame.macros ns form must :require re-frame.core and re-frame.interop"
    (let [form           (read-ns-form "src/re_frame/macros.cljc")
          require-clauses (->> form
                               (filter list?)
                               (filter #(= :require (first %)))
                               (mapcat rest))
          required-nses  (set (map #(if (symbol? %) % (first %)) require-clauses))]
      (is (contains? required-nses 're-frame.core)
          "re-frame.core must be in :require so macro expansions resolving re-frame.core/dispatch don't hit namespace-not-found")
      (is (contains? required-nses 're-frame.interop)
          "re-frame.interop must be in :require so re-frame.interop/debug-enabled? in the macro expansion resolves"))))

(deftest macros-resolve-in-ns-that-only-requires-re-frame-macros
  (testing "expand+eval each macro form in a sandbox ns whose only require is re-frame.macros"
    (let [sandbox (create-ns (gensym 're-frame.macros-sandbox-))
          ok      (atom true)]
      (try
        (binding [*ns* sandbox]
          (refer 'clojure.core)
          (eval '(require '[re-frame.macros]))
          (doseq [form '[(re-frame.macros/dispatch-sync [:macros-standalone-test/noop])
                         (re-frame.macros/dispatch      [:macros-standalone-test/noop])
                         (re-frame.macros/subscribe     [:macros-standalone-test/noop])]]
            (try
              (eval form)
              (catch Exception e
                (reset! ok false)
                (is false (str form " threw: " (.getMessage e)))))))
        (finally
          (remove-ns (.name sandbox))))
      (is @ok
          "all three macros expand+eval cleanly in an ns whose only require is re-frame.macros — proves :require [re-frame.core] [re-frame.interop] is loading them transitively"))))
