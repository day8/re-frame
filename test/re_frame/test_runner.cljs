(ns re-frame.test-runner
  (:refer-clojure :exclude (set-print-fn!))
  (:require
   [cljs.test :as cljs-test :include-macros true]
   ;; Test Namespaces -------------------------------
   [re-frame.interceptor-test]
   [re-frame.subs-test]
   [re-frame.fx-test]
   [re-frame.registrar-test]
   [re-frame.dispatch-source-meta-test]
   [re-frame.subscribe-source-meta-test]
   [re-frame.query-v-for-reaction-test]
   [re-frame.handler-source-meta-test]
   [re-frame.trace-test]
   [re-frame.restore-test]))

(enable-console-print!)

;; ---- BROWSER based tests ----------------------------------------------------
(defn ^:export set-print-fn! [f]
  (set! cljs.core.*print-fn* f))

(defn ^:export run-html-tests []
  (cljs-test/run-tests
   're-frame.interceptor-test
   're-frame.subs-test
   're-frame.fx-test
   're-frame.registrar-test
   're-frame.dispatch-source-meta-test
   're-frame.subscribe-source-meta-test
   're-frame.query-v-for-reaction-test
   're-frame.handler-source-meta-test
   're-frame.trace-test
   're-frame.restore-test))
