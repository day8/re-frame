(ns re-frame.registrar-test
  "CLJS coverage for re-frame.registrar's register-handler warn-on-overwrite
   path, including the production `goog/DEBUG` branch."
  (:require [cljs.test :refer-macros [deftest is testing use-fixtures]]
            [clojure.string :as str]
            [re-frame.interop :as interop]
            [re-frame.loggers :as log]
            [re-frame.registrar :as registrar]
            [re-frame.settings :as settings]))

(defn fixture-isolate-loggers-and-handlers
  [f]
  (let [original-loggers (log/get-loggers)]
    (try
      (f)
      (finally
        (log/set-loggers! original-loggers)
        (doseq [kind [:event :sub :fx :cofx :error]]
          (doseq [id (filter #(and (keyword? %)
                                   (= "test-registrar" (namespace %)))
                             (keys (get @registrar/kind->id->handler kind)))]
            (registrar/clear-handlers kind id)))))))

(use-fixtures :each fixture-isolate-loggers-and-handlers)

(defn capture-warns
  [sink]
  (log/set-loggers! {:warn (fn [& args] (swap! sink conj (str/join " " args)))}))

(deftest first-registration-does-not-warn
  (testing "registering a handler for an unused id is silent"
    (let [warns (atom [])]
      (capture-warns warns)
      (registrar/register-handler :event :test-registrar/fresh (fn [_] nil))
      (is (= [] @warns)
          "first registration of a previously-unseen id must not warn"))))

(deftest duplicate-registration-warns-in-dev-before-page-load
  (testing "in dev, duplicate registration before settings/loaded? warns"
    (let [warns (atom [])]
      (with-redefs [interop/debug-enabled? true
                    settings/loaded?       (constantly false)]
        (capture-warns warns)
        (registrar/register-handler :event :test-registrar/dup-dev (fn [_] nil))
        (registrar/register-handler :event :test-registrar/dup-dev (fn [_] nil))
        (is (= 1 (count @warns)) "exactly one warn on the second registration")
        (is (str/includes? (first @warns) ":event"))
        (is (str/includes? (first @warns) ":test-registrar/dup-dev"))))))

(deftest duplicate-registration-silent-in-dev-after-page-load
  (testing "in dev, duplicate registration after page load is silent for hot reload"
    (let [warns (atom [])]
      (with-redefs [interop/debug-enabled? true
                    settings/loaded?       (constantly true)]
        (capture-warns warns)
        (registrar/register-handler :event :test-registrar/dup-hotreload (fn [_] nil))
        (registrar/register-handler :event :test-registrar/dup-hotreload (fn [_] nil))
        (is (= [] @warns) "hot-reload duplicate registration must be silent")))))

(deftest duplicate-registration-warns-in-production
  (testing "in production, duplicate registration always warns"
    (let [warns (atom [])]
      (with-redefs [interop/debug-enabled? false]
        (capture-warns warns)
        (registrar/register-handler :sub :test-registrar/dup-prod (fn [_ _] nil))
        (registrar/register-handler :sub :test-registrar/dup-prod (fn [_ _] nil))
        (is (= 1 (count @warns))
            "second registration in prod warns even though loaded? is irrelevant")
        (is (str/includes? (first @warns) ":sub"))
        (is (str/includes? (first @warns) ":test-registrar/dup-prod"))))))

(deftest production-warn-fires-regardless-of-loaded
  (testing "in production, the warn does not depend on settings/loaded?"
    (doseq [loaded? [true false]]
      (let [warns (atom [])]
        (with-redefs [interop/debug-enabled? false
                      settings/loaded?       (constantly loaded?)]
          (capture-warns warns)
          (registrar/register-handler :event :test-registrar/dup-prod-loaded (fn [_] nil))
          (registrar/register-handler :event :test-registrar/dup-prod-loaded (fn [_] nil))
          (registrar/clear-handlers :event :test-registrar/dup-prod-loaded)
          (is (= 1 (count @warns))
              (str "prod warns on duplicate even when loaded?=" loaded?)))))))
