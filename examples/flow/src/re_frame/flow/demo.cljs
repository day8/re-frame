(ns re-frame.flow.demo
  (:require
   [reagent.dom.client :as rdc]
   [re-frame.alpha :as rfa]
   [re-frame.core :as rf]
   [zprint.core :as zp]
   [clojure.string :as str]
   [re-frame.db :refer [app-db]]))

(defn debug-app-db []
  (fn []
    [:pre {:style {:position "absolute" :bottom 0 :right 0 :font-size 8}}
     (some-> app-db
             deref
             (zp/zprint-str {:style :justified})
             (str/replace #"re-frame.flow.demo/" ":")
             (str/replace #"re-fine." ":"))]))

(rf/reg-sub ::items :-> (comp reverse ::items))

(defn item [id]
  [:div "Item " id])

(defn items []
  (into [:div]
        (map item)
        @(rf/subscribe [::items])))

(rf/reg-event-db
 ::clear-all
 (fn [db _] (dissoc db ::items)))

(rf/reg-event-db
 ::add-item
 (fn [db [_ id]] (update db ::items conj id)))

(rf/reg-event-db
 ::delete-item
 (fn [db [_ id]] (update db ::items #(remove #{id} %))))

(defn controls []
  (let [id (atom 0)]
    (fn []
      [:div
       [:button {:on-click #(do (rf/dispatch [::add-item (inc @id)])
                                (swap! id inc))} "Add"] " "
       [:button {:on-click #(do (rf/dispatch [::delete-item @id])
                                (swap! id dec))} "Delete"] " "
       [:button {:on-click #(do (rf/dispatch [::clear-all])
                                (reset! id 0))} "Clear"] " "])))

(def error-state-flow
  {:id ::error-state
   :path [::error-state]
   :inputs {:items [::items]}
   :output (fn [_ {:keys [items]}]
             (cond
               (> (count items) 2) :too-many
               (empty? items)      :none))
   :live-inputs {:items [::items]}
   :live? (fn [{:keys [items]}]
            (let [ct (count items)]
              (or (zero? ct) (> ct 3))))})

(rfa/reg-flow error-state-flow)

(rf/reg-event-fx
 ::clear-flow
 (fn [_ _] {:fx [[:clear-flow ::error-state]]}))

(rf/reg-event-fx
 ::reg-flow
 (fn [_ _] {:fx [[:reg-flow error-state-flow]]}))

(defn flow-controls []
  [:div [:button {:on-click #(do (rf/dispatch [::clear-flow]))}
         "Clear flow"] " "
   [:button {:on-click #(do (rf/dispatch [::reg-flow]))}
    "Register flow"]])

(defn warning []
  (let [error-state (rfa/subscribe [:flow {:id ::error-state}])]
    [:div {:style {:color "red"}}
     (->> @error-state
          (get {:too-many "Warning: only the first 3 items will be used."
                :none     "No items. Please add one."}))]))

(defn root []
  [:div [controls] [flow-controls] [warning] [items] [debug-app-db]])

(rf/reg-event-db
 ::init
 (fn [db _] db))

(defonce root-container
  (rdc/create-root (js/document.getElementById "app")))

(defn run
  []
  (rf/dispatch-sync [::init])
  (rdc/render root-container [root]))
