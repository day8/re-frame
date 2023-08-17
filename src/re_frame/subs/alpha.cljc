(ns re-frame.subs.alpha
  (:require [re-frame.subs :refer [kind deref-input-signals]]
            [re-frame.registrar :refer [register-handler get-handler]]
            [re-frame.interop :refer [add-on-dispose! make-reaction reactive?]]
            [re-frame.db :refer [app-db]]
            [re-frame :as-alias rf]))

(def lifecycle->method (atom {})) ;; should we use a clojure.core multimethod?

(defn clear-all-methods! [] (reset! lifecycle->method {}))

(declare lifecycle)

(defn legacy-lifecycle [v]
  (when (vector? v)
    (or (lifecycle (meta v))
        ::rf/sub-default)))

(def lifecycle (some-fn legacy-lifecycle
                        ::rf/lifecycle
                        (constantly ::rf/sub-default)))

(defn legacy-query-id [q]
  (when (vector? q) (first q)))

(def query-id (some-fn legacy-query-id ::rf/q))

(defn method [q] (@lifecycle->method (lifecycle q)))

(defn handle [q] ((get-handler kind (query-id q)) app-db q))

(def cache (atom {}))
(defn cached [q] (get-in @cache [(lifecycle q) q]))
(defn cache! [q r] (swap! cache assoc-in [(lifecycle q) q] r) r)

(defn clear!
  ([] (reset! cache {}))
  ([q] (clear! q (lifecycle q)))
  ([q strat] (swap! cache update strat dissoc q)))

(defmulti reg (fn [dv & _] dv))
(remove-all-methods reg)

(defmethod reg :sub-lifecycle [_ k f]
  (swap! lifecycle->method assoc k f))

(defmethod reg :sub [kind id computation-fn]
  (register-handler
   kind
   id
   (fn [_ q]
     (make-reaction
      #(computation-fn
        (deref-input-signals app-db id)
        q)))))

(defmethod reg :legacy-sub [_ id computation-fn]
  (register-handler
   :sub
   id
   (fn [_ q]
     (make-reaction
      #(computation-fn
        (deref-input-signals app-db id)
        (if (map? q)
          (-> (or (::rf/query-v q) [(query-id q)])
              (vary-meta assoc ::rf/lifecycle (lifecycle q)))
          q))))))

(defn sub [q]
  (let [md (method q)]
    (cond (map? q) (md q)
          (vector? q) (md {::rf/q (query-id q)
                           ::rf/lifecycle (lifecycle q)
                           ::rf/query-v q}))))

(defn sub-reactive [q]
  (or (cached q)
      (let [md (lifecycle q)
            r (handle q)]
        (add-on-dispose! r #(clear! q md))
        (cache! q r))))

(reg :sub-lifecycle ::rf/sub-reactive sub-reactive)

(defn sub-safe [q]
  (if (reactive?)
    (sub-reactive q)
    (or (cached q)
        (handle q))))

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
       :lifecycle (lifecycle q)
       :query-id (query-id q)
       :method (method q)})

    (def legacy-queries
      (list [(qid!) 1 2 3]
            ^{::rf/lifecycle ::rf/sub-reactive} [(qid!) 1 2 3]
            {::rf/q (qid!)}
            {::rf/q (qid!)
             ::rf/lifecycle ::rf/sub-reactive}))

    (doseq [q legacy-queries
            :let [qid (query-id q)
                  _ (reg :legacy-sub qid report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert (vector? (:query result)))
      (assert (= (:lifecycle result) (lifecycle q)))
      (assert (= (:query-id result) (query-id q)))
      (assert (= (:method result) (method q))))

    (def queries
      (list
       {::rf/q (qid!)}
       {::rf/q (qid!)
        ::rf/lifecycle ::rf/sub-reactive}
       {::rf/query-v [(qid!) 1 2 3]}
       [(qid!) 1 2 3]
       ^{::rf/lifecycle ::rf/sub-reactive} [(qid!) 1 2 3]))

    (doseq [q queries
            :let [qid (query-id q)
                  _ (reg :sub qid report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert (map? (:query result)))
      (assert (= (:lifecycle result) (lifecycle q)))
      (assert (= (:query-id result) (query-id q)))
      (assert (= (:method result) (method q)))))
