(ns re-frame.subs.alpha
  (:require [re-frame.subs :refer [deref-input-signals sugar warn-when-not-reactive]]
            [re-frame.registrar :refer [register-handler]]
            [re-frame.register.alpha :refer [reg lifecycle->method]]
            [re-frame.interop :refer [add-on-dispose! make-reaction reactive? reagent-id]]
            [re-frame.query.alpha :as q]
            [re-frame :as-alias rf]
            [re-frame.trace :as trace :include-macros true]))

(defmethod reg :sub-lifecycle [_ k f]
  (swap! lifecycle->method assoc
         k
         (fn [q]
           (trace/with-trace {:operation (q/id q)
                              :op-type :sub/create
                              :tags {:query q}}
             (f q)))))

(defn sub
  ([q]
   (if (keyword? q)
     (sub q {})
     (let [md (q/method q)]
       (cond (map? q) (md q)
             (vector? q) (md {::rf/q (q/id q)
                              ::rf/lifecycle (q/lifecycle q)
                              ::rf/query-v q})))))
  ([id q]
   (sub (assoc q ::rf/q id))))

(defmethod reg :sub [kind id & args]
  (let [[inputs-fn computation-fn] (apply sugar id sub q/query? args)]
    (register-handler
     kind
     id
     (fn subs-handler-fn [_ q]
       (let [subscriptions (inputs-fn q nil)
             rid (atom nil)
             r (make-reaction
                #(trace/with-trace {:operation (q/id q)
                                    :op-type   :sub/run
                                    :tags      {:query      q
                                                :reaction   @rid}}
                   (let [subscription (computation-fn
                                       (deref-input-signals subscriptions id)
                                       q)]
                     (trace/merge-trace! {:tags {:value subscription}})
                     subscription)))]
         (reset! rid (reagent-id r))
         r)))))

(defmethod reg :legacy-sub [_ id & args]
  (let [[inputs-fn computation-fn] (apply sugar id sub q/query? args)]
    (register-handler
     :sub
     id
     (fn subs-handler-fn [_ q]
       (let [subscriptions (inputs-fn q nil)
             rid (atom nil)
             r (make-reaction
                #(trace/with-trace {:operation (q/id q)
                                    :op-type   :sub/run
                                    :tags      {:query      q
                                                :reaction   @rid}}
                   (let [q (if (map? q)
                             (-> (or (::rf/query-v q) [(q/id q)])
                                 (vary-meta assoc ::rf/lifecycle (q/lifecycle q)))
                             q)
                         subscription (computation-fn
                                       (deref-input-signals subscriptions id)
                                       q)]
                     (trace/merge-trace! {:tags {:value subscription}})
                     subscription)))]
         (reset! rid (reagent-id r))
         r)))))

(defn sub-reactive [q]
  (warn-when-not-reactive)
  (or (q/cached q)
      (let [md (q/lifecycle q)
            r (q/handle q)]
        (add-on-dispose! r #(q/clear! q md))
        (q/cache! q r))))

(reg :sub-lifecycle ::rf/sub-reactive sub-reactive)

(defn sub-safe [q]
  (if (reactive?)
    (sub-reactive q)
    (or (q/cached q)
        (q/handle q))))

(reg :sub-lifecycle ::rf/sub-safe sub-safe)
(reg :sub-lifecycle ::rf/sub-default sub-safe)

(defn sub-forever [q]
  (or (q/cached q)
      (q/cache! q (q/handle q))))

(reg :sub-lifecycle ::rf/sub-forever sub-forever)

#_(do
    (re-frame.core/clear-subscription-cache!)

    (def qid! (comp keyword gensym))

    (defn report [_db q]
      {:query q
       :lifecycle (q/lifecycle q)
       :query-id (q/id q)
       :method (q/method q)})

    (def legacy-queries
      (list [(qid!) 1 2 3]
            ^{::rf/lifecycle ::rf/sub-reactive} [(qid!) 1 2 3]
            {::rf/q (qid!)}
            {::rf/q (qid!)
             ::rf/lifecycle ::rf/sub-reactive}))

    (doseq [q legacy-queries
            :let [qid (q/id q)
                  _ (reg :legacy-sub qid report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert (vector? (:query result)))
      (assert (= (:lifecycle result) (q/lifecycle q)))
      (assert (= (:query-id result) (q/id q)))
      (assert (= (:method result) (q/method q))))

    (def queries
      (list
       {::rf/q (qid!)}
       {::rf/q (qid!)
        ::rf/lifecycle ::rf/sub-reactive}
       {::rf/query-v [(qid!) 1 2 3]}
       [(qid!) 1 2 3]
       ^{::rf/lifecycle ::rf/sub-reactive} [(qid!) 1 2 3]))

    (doseq [q queries
            :let [qid (q/id q)
                  _ (reg :sub qid report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert (map? (:query result)))
      (assert (= (:lifecycle result) (q/lifecycle q)))
      (assert (= (:query-id result) (q/id q)))
      (assert (= (:method result) (q/method q)))))
