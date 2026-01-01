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
             (vector? q) (md (q/legacy->map q))))))
  ([id q]
   (sub (assoc q ::rf/q id))))

(defmethod reg :sub [kind id & args]
  (let [[inputs-fn computation-fn] (apply sugar id sub q/query? args)]
    (register-handler
     kind
     id
     (fn subs-handler-fn [_ q]
       (let [q (cond-> q (vector? q) q/legacy->map)
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

(defn compat [q]
  (if (map? q)
    (-> (or (:re-frame/query-v q) [(q/id q)])
        (vary-meta assoc
                   :re-frame/lifecycle (q/lifecycle q)
                   :re-frame/query-m q))
    q))

(defmethod reg :legacy-sub [_ id & args]
  (let [[inputs-fn computation-fn] (apply sugar id sub q/query? args)]
    (register-handler
     :sub
     id
     (fn subs-handler-fn [_ q]
       (let [q (compat q)
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
   (def sync-input-signals-and-compute! ratom/run))

#?(:cljs
   (defn cleanup-input-signals! [^js r]
     (doseq [^js watch (.-watching r)]
       (when-not (seq (dissoc (.-watches watch) r))
         (when (satisfies? ratom/IDisposable watch)
           (dispose! watch))))))

(defn sub-no-cache [q]
  (doto (q/handle q)
    #?(:cljs sync-input-signals-and-compute!)
    #?(:cljs cleanup-input-signals!)))

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
           #?(:cljs sync-input-signals-and-compute!)))))

(reg :sub-lifecycle :forever sub-forever)

(def nil-ref (ratom nil))

(defn sub-flow [q]
  (or (some-> (:id (or (second (::rf/query-v q)) q))
              (#(get @flow/flows %)) meta :re-frame.flow.alpha/ref)
      nil-ref))

(reg :sub-lifecycle :flow sub-flow)
