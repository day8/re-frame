(ns re-frame.subs.alpha
  (:require [re-frame.utils :refer [first-in-vector common-key]]
            [re-frame.subs :refer [kind deref-input-signals]]
            [re-frame.registrar :refer [register-handler get-handler]]
            [re-frame.interop :refer [add-on-dispose! make-reaction reactive?]]
            [re-frame.db :refer [app-db]]
            [re-frame :as-alias rf]))

(def strategy->method (atom {})) ;; should we use a clojure.core multimethod?

(defn clear-all-methods! [] (reset! strategy->method {}))

(declare strategy)

(defn legacy-strategy [v]
  (when (vector? v)
    (let [value (first-in-vector v)]
      (if (map? value)
        (strategy value)
        (or (strategy (meta v))
            ::rf/sub-default)))))

(defn strategy [q] (or (legacy-strategy q)
                       (common-key q @strategy->method)))

(defn legacy-query-id [v]
  (when (vector? v)
    (let [value (first-in-vector v)]
      (if (map? value)
        (some-> value strategy value)
        value))))

(defn query-id [q] (or (legacy-query-id q)
                       (some-> q strategy q)))

(defn method [q] (->> q strategy (get @strategy->method)))

(defn handle [q] ((get-handler kind (query-id q)) app-db q))

(def cache (atom {}))
(defn cached [q] (get-in @cache [(strategy q) q]))
(defn cache! [q r] (swap! cache assoc-in [(strategy q) q] r) r)

(defn clear!
  ([] (reset! cache {}))
  ([q] (clear! q (strategy q)))
  ([q strat] (swap! cache update strat dissoc q)))

(defmulti reg (fn [dv & _] dv))
(remove-all-methods reg)

(defmethod reg :sub-method [_ k f]
  (swap! strategy->method assoc k f))

(defmethod reg :sub [_ id computation-fn]
  (register-handler
   kind
   id
   (fn [_ q]
     (make-reaction
      #(computation-fn
        (deref-input-signals app-db id)
        (if (map? q)
          q
          {(legacy-strategy q) (legacy-query-id q)
           ::rf/query-v q}))))))

(defmethod reg :legacy-sub [k id computation-fn]
  (register-handler
   kind
   id
   (fn [_ q]
     (make-reaction
      #(computation-fn
        (deref-input-signals app-db id)
        (if (vector? q)
          q
          (into [q] (::rf/legacy-args q))))))))

(defn sub [q]
  (let [md (method q)]
    (cond (map? q) (md q)
          (get q 2) (apply md q) ;; this discards the meta of q :(
          (vector? q) (md {(strategy q) (query-id q)}))))

(defn sub-reactive
  ([m]
   (or (cached m)
       (let [md (strategy m)
             r (handle m)]
         (add-on-dispose! r #(clear! m md))
         (cache! m r))))
  ([id & args]
   (let [v (into [id] args)]
     (or (cached v)
         (let [md (strategy v)
               r (handle v)]
           (add-on-dispose! r #(clear! v md))
           (cache! v r))))))

(reg :sub-method ::rf/sub-reactive sub-reactive)

(defn sub-safe
  ([m]
   (if (reactive?)
     (sub-reactive m)
     (or (cached m)
         (handle m))))
  ([id & args]
   (let [v (into [id] args)]
     (if (reactive?)
       (apply sub-reactive v)
       (or (cached v)
           (handle v))))))

(reg :sub-method ::rf/sub-safe sub-safe)
(reg :sub-method ::rf/sub-default sub-safe)

#_(do
    (re-frame.core/clear-subscription-cache!)

    (def qid! (comp keyword gensym))

    (defn legacy-report [_db query-v]
      {:query-v query-v
       :strategy (strategy query-v)
       :query-id (query-id query-v)
       :method (method query-v)})

    (defn report [_db q]
      {:query q
       :strategy (strategy q)
       :query-id (query-id q)
       :method (method q)
       :query-v (::rf/query-v q)})

    (def legacy-queries
      (list [{::rf/sub-reactive (qid!)} 1 2 3]
            [(qid!)]
            [(qid!) 1 2 3]
            ^::rf/sub-reactive [(qid!)]
            ;; the computation-fn can't know the strategy in this case:
            ^::rf/sub-reactive [(qid!) 1 2 3]))

    (doseq [q legacy-queries
            :let [qid (query-id q)
                  _ (reg :legacy-sub qid legacy-report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert result))

    (def queries
      (list
       {::rf/sub-safe (qid!)}
       {::rf/sub-reactive (qid!)}
       (let [id (qid!)]
         {::rf/sub-safe id
          ::rf/query-v [id 1 2 3]})))

    (doseq [q queries
            :let [qid (query-id q)
                  _ (reg :sub qid report)
                  result @(sub q)]]
      (cljs.pprint/pprint result)
      (println)
      (assert result)))
