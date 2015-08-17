(ns re-frame.test.logging
  (:require-macros [cemerick.cljs.test :refer (is deftest testing)])
  (:require [cemerick.cljs.test]
            [re-frame.frame :as frame]
            [re-frame.logging :as logging]))

(deftest frame-logging
  (testing "supplying incomplete logger"
    (let [frame (frame/make-frame nil nil identity {})]
      (is (thrown-with-msg? js/Error #"re-frame: missing logger \":log\"" (logging/log frame "log this!"))))))
