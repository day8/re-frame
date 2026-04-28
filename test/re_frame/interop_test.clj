(ns re-frame.interop-test
  "JVM-only coverage for the Clojure implementations in
   `re-frame.interop`."
  (:require [clojure.test :refer [deftest is testing]]
            [re-frame.interop :as interop]))

(deftest next-tick-runs-on-daemon-thread
  (testing "next-tick does not keep JVM test processes alive after tests finish"
    (let [result (promise)]
      (interop/next-tick #(deliver result (.isDaemon (Thread/currentThread))))
      (is (true? (deref result 1000 ::timeout))))))
