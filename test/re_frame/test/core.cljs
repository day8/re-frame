(ns re-frame.test.core
  (:require-macros [cemerick.cljs.test :refer (is deftest testing done)])
  (:require [cemerick.cljs.test]
            [re-frame.core :as core]
            [re-frame.frame :as frame]
            [re-frame.logging :as logging]))

(defn reinitialize! []
  ; TODO: figure out, how to force channel flush
  (reset! core/app-db nil)
  (reset! core/app-frame (frame/frame-factory)))

(deftest modify-app-db-sync
  (testing "modify app-db via handler (sync)"
    (reinitialize!)
    (is (= @core/app-db nil))
    (core/register-handler :modify-app (fn [app-db [_ data]]
                                         (assoc app-db :modify-app-handler-was-here data)))
    (core/dispatch-sync [:modify-app "something"])
    (is (= @core/app-db {:modify-app-handler-was-here "something"}))))

(deftest ^:async modify-app-db-async
  (testing "modify app-db via handler (async)"
    (reinitialize!)
    (is (= @core/app-db nil))
    (core/register-handler :modify-app (fn [app-db [_ data]]
                                         (assoc app-db :modify-app-handler-was-here data)))
    (core/register-handler :check (fn [app-db]
                                    (is (= app-db @core/app-db))
                                    (is (= app-db {:modify-app-handler-was-here "something"}))
                                    (done)
                                    app-db))
    (core/dispatch [:modify-app "something"])
    (core/dispatch [:check])))
