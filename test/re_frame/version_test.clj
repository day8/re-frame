(ns re-frame.version-test
  "Tests for the public re-frame.config/version constant.

   The CLJS goog-define path is exercised structurally on JVM here:
   the var resolves to the same hardcoded string under both reader
   conditional branches (CLJ def, CLJS goog-define default), so a
   CLJ-side smoke test that the value is a non-empty string keeps the
   default in sync with whatever the CLJC release bump produces."
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.string :as str]
            [re-frame.alpha :as rf-alpha]
            [re-frame.config :as config]
            [re-frame.core :as rf]))

(deftest config-version-is-non-empty-string
  (testing "re-frame.config/version is a non-empty string at runtime"
    (is (string? config/version))
    (is (seq config/version)
        "re-frame-pair's read-version-of treats empty strings as :unknown")))

(deftest core-version-mirrors-config-version
  (testing "re-frame.core/version is the same value as re-frame.config/version"
    (is (= config/version rf/version)
        "re-frame.core/version re-exports the canonical value")))

(deftest alpha-version-mirrors-config-version
  (testing "re-frame.alpha/version is the same value as re-frame.config/version"
    (is (= config/version rf-alpha/version)
        "re-frame.alpha/version re-exports the canonical value")))

(deftest version-is-dotted-numeric-or-snapshot
  (testing "version looks like a real artifact version (n.n.n optionally with -SUFFIX)"
    (is (re-matches #"\d+\.\d+\.\d+(?:-[A-Za-z0-9.]+)?" config/version)
        (str "version " (pr-str config/version)
             " should look like 1.4.5 or 1.4.6-SNAPSHOT — bump in the release process if this fails"))))
