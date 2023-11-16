(ns re-frame.flow.alpha
  (:require
   [re-frame.db :as db]
   [re-frame.utils :as u]
   [re-frame.registrar :refer [get-handler]]
   [re-frame.loggers     :refer [console]]
   [re-frame.interceptor :refer [->interceptor get-effect get-coeffect update-effect]]
   [reagent.core :as r]))

(def db-path? vector?)

(def flow? map?)

(def flow-input? (comp some? ::input))

(def flows (r/atom {}))

(defn lookup [id] (get @flows id))

(defn id [x]
  (cond-> x (flow? x) :id))

(defn input-ids [{:keys [inputs live-inputs]}]
  (vec (distinct (into []
                       (comp (remove db-path?)
                             (map #(or (::input %) %)))
                       (concat (vals inputs) (vals live-inputs))))))

(defn topsort [flows]
  (map flows (reverse (u/topsort-kahn (u/map-vals input-ids flows)))))

(defn safe-update-in [m path f & args]
  (if (empty? path)
    (apply f m args)
    (apply update-in m path f args)))

(defn deep-cleanup [db path]
  (if
   (empty? path) db
   (let [new-data (safe-update-in db (pop path) dissoc (peek path))]
     (if-not (empty? (get-in new-data (pop path)))
       new-data
       (recur new-data (pop path))))))

(defn default [id]
  {:id id
   :path [id]
   :inputs {}
   :output (constantly true)
   :live? (constantly true)
   :live-inputs {}
   :init (fn [db path] (assoc-in db path {}))
   :cleanup deep-cleanup})

(defn stale-dependencies [flows {:keys [inputs]}]
  (reduce-kv (fn [m k {:keys [path]}]
               (cond-> m
                 (contains? (set (vals inputs)) path) (assoc k path)))
             {}
             flows))

(defn stale-dependents [flows {:keys [path]}]
  (reduce-kv (fn [m k {:keys [inputs]}]
               (let [bad-inputs (into {} (filter (comp #{path} val)) inputs)]
                 (cond-> m (seq bad-inputs) (assoc k bad-inputs))))
             {}
             flows))

(defn warn-stale-dependencies [flows new-flow]
  (let [dependencies (stale-dependencies flows new-flow)
        dependents (stale-dependents flows new-flow)
        warn-dependency (fn [[id path]]
                          ["- Input" (str path)
                           "matches the output path of" (str id) ".\n"
                           "  For an explicit dependency, change it to (re-frame/flow-input"
                           (str id ").") "\n"])
        warn-dependent (fn [[id inputs]]
                         (mapcat (fn [[input-id path]]
                                   ["- Output" (str (:path new-flow))
                                    "matches the input" (str input-id)
                                    "of the flow" (str id ".\n")
                                    "  For an explicit dependency, change that input to"
                                    "(re-frame/flow-input" (str (:id new-flow) ").") "\n"])
                                 inputs))]
    (when (some seq [dependents dependencies])
      (apply console :warn "Warning: You called `reg-flow` with the flow" (str (:id new-flow))
             "but this created stale dependencies.\n"
             "Your flows may not evaluate in the correct order.\n"
             (concat (mapcat warn-dependency dependencies)
                     (mapcat warn-dependent dependents))))))

(defn reg-flow
  ([k m] (reg-flow (assoc m :id k)))
  ([m]
   (warn-stale-dependencies @flows m)
   (swap! flows assoc
          (id m) (with-meta (merge (default (id m)) m)
                   {::new? true
                    ::ref (r/cursor db/app-db (:path m))}))))

(defn clear-flow
  ([]
   (swap! flows vary-meta update ::cleared into @flows)
   (swap! flows empty))
  ([x]
   (when-let [flow (lookup x)]
     (swap! flows vary-meta update ::cleared assoc (id flow) flow)
     (swap! flows dissoc (id flow)))))

(defn get-output [db value]
  (if (vector? value)
    (get-in db value)
    (some->> value lookup :path (get-output db))))

(defn flow-input [flow] {::input (id flow)})

(def flow-fx-ids #{:reg-flow :clear-flow})

(def do-fx
  (->interceptor
   {:id :do-flow-fx
    :after (fn [{{:keys [fx] :as effects} :effects :as ctx}]
             (let [flow-fx
                   (into (filterv (comp flow-fx-ids first) fx)
                         (select-keys effects flow-fx-ids))]
               (if (empty? flow-fx)
                 ctx
                 (do
                   (doseq [[k v] flow-fx]
                     (if-let [f (get-handler :fx k false)]
                       (f v)
                       (console :warn "re-frame: in \":fx\" effect found "
                                k
                                " which has no associated handler. Ignoring.")))
                   (update-in ctx [:effects :fx] (partial remove (set flow-fx)))))))}))

(defn update-flow [ctx {:as    flow
                        :keys  [path init cleanup live? inputs live-inputs output id]
                        ::keys [cleared?]}]
  (let [{::keys [new?]}    (meta flow)
        old-db             (get-coeffect ctx :db)
        new-db             (or (get-effect ctx :db) old-db)
        id->old-live-input (u/map-vals (partial get-output old-db) live-inputs)
        id->live-input     (u/map-vals (partial get-output new-db) live-inputs)
        id->old-input      (u/map-vals (partial get-output old-db) inputs)
        id->input          (u/map-vals (partial get-output new-db) inputs)
        dirty?             (not= id->input id->old-input)
        bardo              [(cond new? :new (live? old-db id->old-live-input) :live :else :dead)
                            (cond cleared? :cleared (live? new-db id->live-input) :live :else :dead)]
        update-db          (case bardo
                             [:new :live]     #(do (swap! flows update id vary-meta dissoc ::new?)
                                                   (update-in (init % path) path output id->input))
                             [:live :cleared] #(cleanup % path)
                             [:live :live]    #(cond-> % dirty? (update-in path output id->input))
                             [:live :dead]    #(cleanup % path)
                             [:dead :live]    #(update-in (init % path) path output id->input)
                             identity)]
    (update-effect ctx :db (fnil update-db (get-coeffect ctx :db)))))

(defn with-cleared [m]
  (into m (map (fn [[k v]] [[::cleared k (gensym)] (assoc v ::cleared? true)])
               (::cleared (meta m)))))

(def interceptor
  (->interceptor
   {:id :flow
    :after (fn [ctx]
             (let [all-flows (with-cleared @flows)]
               (swap! flows vary-meta dissoc ::cleared)
               (reduce update-flow ctx ((memoize topsort) all-flows))))}))

#_(do
    (def still-alive
      {:coeffects {:db {:l? :alive}}
       :effects   {:db {:l? :alive}}})

    (def still-dead
      {:coeffects {:db {:l? :dead}}
       :effects   {:db {:l? :dead}}})

    (def died
      {:coeffects {:db {:l? :alive :sometimes-path :SOMETIMES}}
       :effects   {:db {:l? :dead}}})

    (def born
      {:coeffects {:db {:l? :dead}}
       :effects   {:db {:l? :alive}}})

    (def flow-after (:after interceptor))

    (reg-flow
     :db
     {:live? (constantly true)
      :output (fn [data _] data)
      :path []})

    (reg-flow
     :sometimes-flow
     {:live? (comp #{:alive} :l?)
      :inputs [:db]
      :output (fn [data inputs] :SOMETIMES)
      :path [:sometimes-path]})

    (reg-flow
     :always-flow
     {:live? (constantly true)
      :inputs [:sometimes-flow]
      :output (fn [data inputs] inputs)
      :path [:always-path]})

    (assert (= (flow-after still-alive)
               {:coeffects {:db {:l? :alive :sometimes-path :SOMETIMES}}
                :effects   {:db {:l? :alive :sometimes-path :SOMETIMES}}}))
    (assert (= (flow-after still-dead)
               {:coeffects {:db {:l? :dead}}
                :effects   {:db {:l? :dead}}}))
    (assert (= (flow-after died)
               {:coeffects {:db {:l? :alive :sometimes-path :SOMETIMES}}
                :effects   {:db {:l? :dead}}}))
    (assert (= (flow-after born)
               {:coeffects {:db {:l? :dead}}
                :effects   {:db {:l? :alive :sometimes-path :SOMETIMES}}}))

    (swap! flows dissoc :sometimes-flow)

    nil)
