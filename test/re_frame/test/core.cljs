(ns re-frame.test.core
  (:require-macros [cemerick.cljs.test :refer (is deftest testing done)])
  (:require [cemerick.cljs.test]
            [re-frame.core :as core]
            [re-frame.frame :as frame]))

(defn reinitialize! []
  ; TODO: figure out, how to force channel flush
  (reset! core/app-db nil)
  (reset! core/app-frame (frame/make-frame)))

(deftest modify-app-db-sync
  (testing "modify app-db via handler (sync)"
    (reinitialize!)
    (is (= @core/app-db nil))
    (core/register-handler :modify-app (fn [db [_ data]]
                                         (assoc db :modify-app-handler-was-here data)))
    (core/dispatch-sync [:modify-app "something"])
    (is (= @core/app-db {:modify-app-handler-was-here "something"}))))

(deftest ^:async modify-app-db-async
  (testing "modify app-db via handler (async)"
    (reinitialize!)
    (is (= @core/app-db nil))
    (core/register-handler :modify-app (fn [db [_ data]]
                                         (assoc db :modify-app-handler-was-here data)))
    (core/register-handler :check (fn [db]
                                    (is (= db @core/app-db))
                                    (is (= db {:modify-app-handler-was-here "something"}))
                                    (done)
                                    db))
    (core/dispatch [:modify-app "something"])
    (core/dispatch [:check])))
