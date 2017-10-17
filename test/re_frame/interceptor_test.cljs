(ns re-frame.interceptor-test
  (:require [cljs.test :refer-macros [is deftest testing]]
            [reagent.ratom :refer [atom]]
            [re-frame.interceptor :refer [context get-coeffect assoc-effect assoc-coeffect get-effect
                                          update-coeffect ->interceptor]]
            [re-frame.std-interceptors :refer [debug trim-v path enrich after on-changes
                                               db-handler->interceptor fx-handler->interceptor]]
            [re-frame.interceptor :as interceptor]))

(enable-console-print!)

(deftest test-trim-v
  (let [ctx           (context [:event-id :b :c] [])
        ctx-trimmed   ((:before trim-v) ctx)
        ctx-untrimmed ((:after trim-v) ctx-trimmed)]
    (is (= (get-coeffect ctx-trimmed :event)
           [:b :c]))
    (is (= (get-coeffect ctx-untrimmed :event)
           [:event-id :b :c]))
    (is (= ctx-untrimmed ctx))))


(deftest test-one-level-path
    (let [db   {:showing true :another 1}
          p1   (path [:showing])]   ;; a simple one level path

      (let [b4 (-> (context [] [] db)
                  ((:before p1)))         ;; before
            a (-> b4
                  (assoc-effect :db false)
                  ((:after p1)))]         ;; after

        (is (= (get-coeffect b4 :db)      ;; test before
               true))
        (is (= (get-effect a :db)         ;; test after
               {:showing false :another 1})))))


(deftest test-two-level-path
  (let [db  {:1 {:2 :target}}
        p  (path [:1 :2])]    ;; a two level path

    (let [b4 (-> (context [] [] db)
                ((:before p))) ]          ;; before

      (is (= (get-coeffect b4 :db))      ;; test before
          :target)

      ;; test #1
      (is (= {:1 {:2 :4}}
             (-> b4
                 (assoc-effect :db :4)    ;; <-- db becomes :4
                 ((:after p))
                 (get-effect :db))))

      ;; test #2 - set db to nil
      (is (= {:1 {:2 nil}}
             (-> b4
                 (assoc-effect :db nil)   ;; <-- db becomes nil
                 ((:after p))
                 (get-effect :db)))))))

(deftest path-with-no-db-returned
  (let [path-interceptor (path :a)]
    (-> (context [] [path-interceptor] {:a 1})
        (interceptor/invoke-interceptors :before)
        interceptor/change-direction
        (interceptor/invoke-interceptors :after)
        (get-effect :db)
        (nil?)                                              ;; We don't expect an effect to be added.
        (is))))

(deftest test-db-handler-interceptor
  (let [event   [:a :b]

        handler (fn [db v]
                  ;; make sure it was given the right arguements
                  (is (= db :original-db-val))
                  (is (= v event))
                  ;; return a specific value for later checking
                  :new-db-val)

        i1      (db-handler->interceptor handler)
        db      (-> (context event [] :original-db-val)
                    ((:before i1))            ;; calls handler - causing :db in :effects to change
                    (get-effect :db))]
    (is (= db :new-db-val))))



(deftest test-fx-handler-interceptor
  (let [event   [:a :b]
        coeffect {:db 4 :event event}
        effect   {:db 5 :dispatch [:a]}

        handler (fn [world v]
                  ;; make sure it was given the right arguements
                  (is (= world coeffect))
                  (is (= v event))

                  ;; return a specific value for later checking
                  effect)

        i1      (fx-handler->interceptor handler)
        e       (-> (context event [] (:db coeffect))
                    ((:before i1))            ;; call the handler
                    (get-effect))]
    (is (= e {:db 5 :dispatch [:a]}))))

(deftest test-on-changes
  (let [change-handler-i  (->  (fn [db v] (assoc db :a 10))
                               db-handler->interceptor)

        no-change-handler-i  (->  (fn [db v] db)
                               db-handler->interceptor)

        no-db-handler-i (-> (fn [ctx v] {})
                            fx-handler->interceptor)

        change-i   (on-changes + [:c] [:a] [:b])
        orig-db    {:a 0 :b 2}]

    (is (=  {:a 0 :b 2}
            (-> (context [] [] orig-db)
                ((:before no-change-handler-i))   ;; no change to :a and :b
                ((:after change-i))
                (get-effect :db))))
    (is (=  {:a 10 :b 2 :c 12}
            (-> (context [] [] orig-db)
                ((:before change-handler-i))       ;; cause change to :a
                ((:after change-i))
                (get-effect :db))))

    (is (=  ::not-found
            (-> (context [] [] orig-db)
                ((:before no-db-handler-i))       ;; no db effect in context
                ((:after change-i))
                (get-effect :db ::not-found))))))

(deftest test-after
  (testing "when no db effect is returned"
    (let [after-db-val (atom nil)]
      (-> (context [:a :b]
                   [(after (fn [db] (reset! after-db-val db)))]
                   {:a 1})
          (interceptor/invoke-interceptors :before)
          interceptor/change-direction
          (interceptor/invoke-interceptors :after))
      (is (= @after-db-val {:a 1})))))

(deftest test-enrich
  (testing "when no db effect is returned"
    (let [ctx (context [] [] {:a 1})]
      (is (= ::not-found (get-effect ctx :db ::not-found)))
      (-> ctx (:after (enrich (fn [db] (is (= db {:a 1})))))))))

(deftest test-update-coeffect
  (let [context {:effects {:db {:a 1}}
                 :coeffects {:db {:a 1}}}]
    (is (= {:effects {:db {:a 1}}
            :coeffects {:db {:a 2}}}
         (update-coeffect context :db update :a inc)))))

(deftest test-exception->ex-info
  (let [exception->ex-info #'re-frame.interceptor/exception->ex-info] ; reference to the private fn
    (let [e (js/Error. "Ooops!")
          interceptor {:id :some-interceptor :before identity}
          result (exception->ex-info e interceptor :after)]
      (is (= {:exception e
              :stage :after
              :interceptor :some-interceptor}
             (ex-data result)))
      (is (= "Interceptor Exception: Error: Ooops!" (ex-message result))))))

(deftest test-invoke-interceptor-fn
  (let [invoke-interceptor-fn #'re-frame.interceptor/invoke-interceptor-fn] ; reference to the private fn
    (testing "returns context when there's no stage fn"
      (is (= {:a 1}
             (invoke-interceptor-fn {:a 1} {:before #(update % :a inc)} :after))))
    (testing "returns result of applying stage fn to context"
      (is (= {:a 2}
             (invoke-interceptor-fn {:a 1} {:before #(update % :a inc)} :before))))
    
    (testing "assocs (exception->ex-info e) under :error, empties queue when in before stage"
      (let [interceptor {:id :throws
                         :before #(throw "Oopsie")}
            context {:a 1
                     :queue [:interceptor-2 :interceptor-3]}]
        (with-redefs [re-frame.interceptor/exception->ex-info (fn [e] (str e))]
          (is (= {:a 1
                  :queue []
                  :error "Oopsie"}
                 (invoke-interceptor-fn context interceptor :before))))))

    (testing "assocs (exception->ex-info e) under :error, keeps queue unmodified when in :after stage"
      (let [interceptor {:id :throws
                         :after #(throw "Oopsie in after")}
            context {:a 1
                     :queue [:interceptor-2 :interceptor-3]}]
        (with-redefs [re-frame.interceptor/exception->ex-info (fn [e] (str e))]
          (is (= {:a 1
                  :queue [:interceptor-2 :interceptor-3]
                  :error "Oopsie in after"}
                 (invoke-interceptor-fn context interceptor :after))))))))

(deftest test-exceptions
  (let [handles (->interceptor :id :handles
                               :error (fn [context]
                                        (let [error-data (ex-data (:error context))
                                              original-exception (:exception error-data)]
                                          (-> context
                                              (update-coeffect :db assoc :handled-error-data (ex-data original-exception))
                                              (update-coeffect :db assoc :handled-error-message (ex-message original-exception))))))
        increments (->interceptor :id :increments
                                  :after (fn [context]
                                           (update-coeffect context :db update :a inc)))
        throws-before (->interceptor :id :throws-before
                                     :before (fn [_]
                                               (throw (ex-info "Thrown from interceptor" {:thrown true}))))
        throws-after (->interceptor :id :throws-after
                                     :after (fn [_]
                                               (throw (ex-info "Thrown from interceptor" {:thrown true}))))]
    (testing "error handler with an exception in a :before interceptor"
      (let [context (-> (context [] [handles throws-before increments] {:a 1})
                        (interceptor/execute-chain))
            error (:error context)]
        (is (= #{:stage :interceptor :exception} (set (keys (ex-data error)))))
        (is (= {:stage :before
                :interceptor :throws-before}
               (select-keys (ex-data error) [:stage :interceptor])))
        (is (= {:a 1
                :handled-error-message "Thrown from interceptor"
                :handled-error-data {:thrown true}}
               (get-coeffect context :db)))))
    (testing "error handler with an exception in an :after interceptor"
      (let [context (-> (context [] [handles throws-after increments] {:a 1})
                        (interceptor/execute-chain))
            error (:error context)]
        (is (= #{:stage :interceptor :exception} (set (keys (ex-data error)))))
        (is (= {:stage :after
                :interceptor :throws-after}
               (select-keys (ex-data error) [:stage :interceptor])))
        (is (= {:a 2
                :handled-error-message "Thrown from interceptor"
                :handled-error-data {:thrown true}}
               (get-coeffect context :db)))))
    (testing "error handler with an exception in an :after interceptor, skips non error handler"
      (let [context (-> (context [] [handles increments throws-after] {:a 1})
                        (interceptor/execute-chain))]
        (is (= {:a 1
                :handled-error-message "Thrown from interceptor"
                :handled-error-data {:thrown true}}
               (get-coeffect context :db)))))))
