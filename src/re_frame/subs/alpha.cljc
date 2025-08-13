(ns re-frame.subs.alpha
  (:require
   [re-frame.subs :refer [deref-input-signals sugar warn-when-not-reactive]]
   [re-frame.registrar :refer [register-handler]]
   [re-frame.register.alpha :refer [reg lifecycle->method]]
   [re-frame.interop :refer [add-on-dispose! make-reaction reactive? reagent-id ratom dispose!]]
   [re-frame.query.alpha :as q]
   [re-frame :as-alias rf]
   [re-frame.trace :as trace :include-macros true]
   [re-frame.flow.alpha :as flow]
   #?(:cljs [reagent.ratom :as ratom])))

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
       (cond (map? q)    (md q)
             (vector? q) (md (merge
                              {::rf/q         (q/id q)
                               ::rf/query-v   q
                               ::rf/lifecycle (q/lifecycle q)}
                              (::rf/query-m (meta q))))))))
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
       (let [q (if (map? q)
                 (-> (or (::rf/query-v q) [(q/id q)])
                     (vary-meta assoc
                                ::rf/lifecycle (q/lifecycle q)
                                ::rf/query-m q))
                 q)
             subscriptions (inputs-fn q nil)
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

(defn sub-reactive [q]
  (warn-when-not-reactive)
  (or (q/cached q)
      (let [r (q/handle q)]
        (add-on-dispose! r #(q/clear! q))
        (q/cache! q r))))

(reg :sub-lifecycle :reactive sub-reactive)

#?(:cljs
   (def sync-watchers-and-compute! ratom/run))

#?(:cljs
   (defn cleanup-deps! [^js r]
     (doseq [^js watch (.-watching r)]
       (when-not (seq (dissoc (.-watches watch) r))
         (dispose! watch)))))

(defn sub-no-cache [q]
  (doto (q/handle q)
    #?(:cljs sync-watchers-and-compute!)
    #?(:cljs cleanup-deps!)))

(reg :sub-lifecycle :no-cache sub-no-cache)

(defn sub-safe [q]
  (if (reactive?)
    (sub-reactive q)
    (or (q/cached q)
        (q/cached (assoc q :re-frame/lifecycle :reactive))
        (sub-no-cache q))))

(reg :sub-lifecycle :safe sub-safe)
(reg :sub-lifecycle :default sub-safe)

(defn sub-forever [q]
  (or (q/cached q)
      (q/cache!
       q (doto (q/handle q)
           #?(:cljs sync-watchers-and-compute!)))))

(reg :sub-lifecycle :forever sub-forever)

(def nil-ref (ratom nil))

(defn sub-flow [q]
  (or (some-> (:id (or (second (::rf/query-v q)) q))
              flow/lookup meta :re-frame.flow.alpha/ref)
      nil-ref))

(reg :sub-lifecycle :flow sub-flow)
