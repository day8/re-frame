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

(def id? keyword?)

(def flows (r/atom {}))

(defn lookup [x]
  (cond
    (flow? x) x
    (id? x) (get @flows x)))

(defn id [x]
  (cond-> x (flow? x) :id))

(defn input-ids [{{live-inputs :inputs} :live?
                  {calc-inputs :inputs} :output}]
  (mapv id (remove db-path? (-> #{} (into (vals live-inputs)) (into (vals calc-inputs))))))

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

(defn ->flow [{:keys [output live? inputs] :as m}]
  (-> m
      (cond-> (and output (not (map? output)))
        (update :output #(do {:fn %})))
      (cond-> output
        (update-in [:output :inputs] merge inputs))
      (cond-> (and live? (not (map? live?)))
        (update :live? #(do {:fn %})))
      (cond-> live?
        (update-in [:live? :inputs] merge inputs))
      (dissoc :inputs)))

(defn default [id]
  {:id id
   :path [id]
   :inputs {}
   :live? {:inputs {}
           :fn (constantly true)}
   :output {:inputs {}
            :fn (constantly (str "Hello World " (gensym)))}
   :init (fn [db path] (assoc-in db path {}))
   :cleanup deep-cleanup})

(defn reg-flow
  ([k m] (reg-flow (assoc m :id k)))
  ([m] (swap! flows assoc
              (id m) (with-meta (->flow (merge (default (id m)) m))
                       {::new true
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

(defn update-flow [ctx flow]
  (let [{:keys                           [path init cleanup]
         ::keys                          [cleared?]
         {live? :fn live-inputs :inputs} :live?
         {output :fn inputs :inputs}     :output}
        flow
        new?               (::new (meta flow))
        old-db             (get-coeffect ctx :db)
        new-db             (or (get-effect ctx :db) old-db)
        id->old-live-input (u/map-vals (partial get-output old-db) live-inputs)
        id->live-input     (u/map-vals (partial get-output new-db) live-inputs)
        id->old-input      (u/map-vals (partial get-output old-db) inputs)
        id->input          (u/map-vals (partial get-output new-db) inputs)
        dirty?             (not= id->input id->old-input)
        bardo              (mapv #(if % :live :dead)
                                 [(and (live? old-db id->old-live-input) (not new?))
                                  (and (live? new-db id->live-input) (not cleared?))])
        update-db          (case bardo
                             [:live :live] #(cond-> %
                                              dirty? (update-in path output id->input))
                             [:dead :dead] identity
                             [:live :dead] #(cleanup % path)
                             [:dead :live] #(cond-> (init % path)
                                              (or dirty? new?) (update-in path output id->input)))]
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
               (swap! flows (partial u/map-vals #(vary-meta % dissoc ::new)))
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
