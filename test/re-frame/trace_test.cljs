(ns re-frame.trace-test
  (:require [cljs.test :as test :refer-macros [is deftest]]
            [re-frame.trace :as trace :include-macros true]
            [re-frame.core :as rf]))

(def test-traces (atom []))

(test/use-fixtures :once {:before (fn []
                                    (trace/register-trace-cb :test
                                      (fn [traces]
                                        (doseq [trace traces]
                                          (swap! test-traces conj trace)))))
                          :after  (fn []
                                    (trace/remove-trace-cb :test))})

(test/use-fixtures :each {:before (fn []
                                    (reset! test-traces [])
                                    (trace/reset-tracing!))})

; Disabled, as goog-define doesn't work in optimizations :whitespace
;(deftest trace-cb-test
;  (trace/with-trace {:operation :test1
;                     :op-type   :test})
;  (is (= 1 (count @test-traces)))
;  (is (= (select-keys (first @test-traces) [:id :operation :op-type :tags])
;         {:id 1 :operation :test1 :op-type :test :tags nil})))
;
;(enable-console-print!)
;
;(deftest sub-trace-test
;  (rf/subscribe [:non-existence])
;  (is (= 1 (count @test-traces)))
;  (is (= (select-keys (first @test-traces) [:id :operation :op-type :error])
;         {:id 1 :op-type :sub/create :operation :non-existence :error true})))
