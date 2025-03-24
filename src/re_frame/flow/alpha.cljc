(ns re-frame.flow.alpha
  (:require
   #?(:cljs [re-frame.db :as db])
   [re-frame.utils :as u]
   [re-frame.registrar :refer [get-handler]]
   [re-frame.loggers     :refer [console]]
   [re-frame.interceptor :refer [->interceptor get-effect get-coeffect
                                 assoc-effect update-effect]]
   [re-frame.interop :as interop]
   #?(:cljs [reagent.core :as r])))

(def db-path? vector?)

(def flow? map?)

(def flow<-? (comp some? ::flow<-))

(def flows (interop/ratom {}))

(defn lookup [id] (get @flows id))

(defn input-ids [{:keys [inputs live-inputs]}]
  (vec (distinct (into []
                       (comp (remove db-path?)
                             (map #(or (::flow<- %) %)))
                       (concat (vals inputs) (vals live-inputs))))))

(defn topsort [flows]
  (->> flows
       (u/map-vals input-ids)
       u/remove-orphans
       u/topsort-kahn
       reverse
       (map flows)))

(def topsort* (memoize topsort))

(defn default [id]
  {:id id
   :path [id]
   :inputs {}
   :output (constantly true)
   :live? (constantly true)
   :live-inputs {}
   :cleanup u/deep-dissoc})

(defn stale-in-flows [flows {:keys [inputs]}]
  (reduce-kv (fn [m k {:keys [path]}]
               (cond-> m
                 (contains? (set (vals inputs)) path) (assoc k path)))
             {}
             flows))

(defn stale-out-flows [flows {:keys [path]}]
  (reduce-kv (fn [m k {:keys [inputs]}]
               (let [bad-inputs (into {} (filter (comp #{path} val)) inputs)]
                 (cond-> m (seq bad-inputs) (assoc k bad-inputs))))
             {}
             flows))

(defn validate-inputs [{:keys [inputs]}]
  (doseq [[_ input] inputs
          :when (not ((some-fn db-path? flow<-?) input))]
    (throw (#?(:clj Exception. :cljs js/Error.) "bad input"))))

(defn warn-stale-dependencies [flows new-flow]
  (let [ins (stale-in-flows flows new-flow)
        outs (stale-out-flows flows new-flow)
        warn-ins (fn [[id path]]
                   ["- Input" (str path)
                    "matches the output path of" (str id) ".\n"
                    "  For an explicit dependency, change it to (re-frame/flow<-"
                    (str id ").") "\n"])
        warn-outs (fn [[id inputs]]
                    (mapcat (fn [[input-id _]]
                              ["- Output" (str (:path new-flow))
                               "matches the input" (str input-id)
                               "of the flow" (str id ".\n")
                               "  For an explicit dependency, change that input to"
                               "(re-frame/flow<-" (str (:id new-flow) ").") "\n"])
                            inputs))
        warnings (concat (mapcat warn-ins ins) (mapcat warn-outs outs))]
    (when (seq warnings)
      (apply console :warn "Warning: You called `reg-flow` with the flow" (str (:id new-flow))
             "but this created stale dependencies.\n"
             "Your flows may not evaluate in the correct order.\n"
             warnings))))

(defn reg-flow
  ([k m]
   (reg-flow (assoc m :id k)))
  ([m]
   (validate-inputs m)
   (warn-stale-dependencies @flows m)
   (swap! flows assoc
          (:id m) (with-meta (merge (default (:id m)) m)
                    (merge
                     {::new? true}
                     #?(:cljs
                        {::ref (r/reaction (get-in @db/app-db (:path m)))}))))))

(defn clear-flow
  ([]
   (swap! flows vary-meta update ::cleared into @flows)
   (swap! flows empty))
  ([id]
   (when-let [flow (lookup id)]
     (swap! flows dissoc id)
     (swap! flows vary-meta update ::cleared assoc (:id flow) flow))))

(defn flow<- [id] {::flow<- id})

(def flow-fx-ids #{:reg-flow :clear-flow})

(defn do-effect [[k v]] ((get-handler :fx k false) v))

(def remove-fx (partial remove (comp flow-fx-ids first)))

(def dissoc-fx #(apply dissoc % flow-fx-ids))

(def do-fx
  (->interceptor
   {:id :do-flow-fx
    :after (fn [{{:keys [fx] :as effects} :effects
                 :as ctx}]
             (let [flow-fx (concat (select-keys effects flow-fx-ids)
                                   (filterv (comp flow-fx-ids first) fx))]
               (doall (map do-effect flow-fx))
               (-> ctx
                   (update-in [:effects :fx] remove-fx)
                   (update :effects dissoc-fx))))}))

(defn resolve-input [db input]
  (if (vector? input)
    (get-in db input)
    (some->> input ::flow<- lookup :path (resolve-input db))))

(defn resolve-inputs [db inputs]
  (if (empty? inputs) db (u/map-vals (partial resolve-input db) inputs)))

(defn run [ctx {:as     flow
                :keys   [path cleanup live? inputs live-inputs output id]
                flow-fx :fx
                ::keys  [cleared?]}]
  (let [{::keys [new?]} (meta flow)
        old-db          (get-coeffect ctx :db)
        db              (or (get-effect ctx :db) old-db)
        fx              (get-effect ctx :fx)

        id->old-in (resolve-inputs old-db inputs)
        id->in     (resolve-inputs db inputs)
        dirty?     (not= id->in id->old-in)

        id->old-live-in (resolve-inputs old-db live-inputs)
        id->live-in     (resolve-inputs db live-inputs)

        old-output      (get-in old-db path)

        bardo           [(cond new? :new (live? id->old-live-in) :live :else :dead)
                         (cond cleared? :cleared (live? id->live-in) :live :else :dead)]

        new-db (case bardo
                 [:live :live]    (cond-> db dirty? (assoc-in path (output id->in id->old-in old-output)))
                 [:live :dead]    (cleanup db path)
                 [:dead :live]    (assoc-in db path (output id->in id->old-in old-output))
                 [:new :live]     (do (swap! flows update id vary-meta dissoc ::new?)
                                      (assoc-in db path (output id->in id->old-in old-output)))
                 [:live :cleared] (cleanup db path)
                 nil)

        new-fx (when flow-fx
                 (case bardo
                   [:live :live] (when dirty? (concat fx (flow-fx id->in id->old-in old-output)))
                   [:dead :live] (concat fx (flow-fx id->in id->old-in old-output))
                   [:new :live]  (concat fx (flow-fx id->in id->old-in old-output))
                   nil))]
    (cond-> ctx
      new-db (assoc-effect :db new-db)
      new-fx (assoc-effect :fx new-fx))))

(defn with-cleared [m]
  (into m (map (fn [[k v]] [[::cleared k (gensym)] (assoc v ::cleared? true)])
               (::cleared (meta m)))))

(def interceptor
  (->interceptor
   {:id    :flow
    :after (comp (fn [ctx]
                   (let [all-flows (with-cleared @flows)]
                     (swap! flows vary-meta dissoc ::cleared)
                     (reduce run ctx (topsort all-flows))))
                 (fn [{{:keys [db]} :effects :as ctx}]
                   (assoc ctx :re-frame/pre-flow-db db)))}))
