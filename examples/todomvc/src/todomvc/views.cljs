(ns todomvc.views
  (:require
    [clojure.string :as str]
    [re-frame.core :as rf ]
    [reagent.core :as r]))

(enable-console-print!)

(def ascii-code-return 13) ; #todo => tupelo.ascii
(def ascii-code-escape 27)
(defn event-value [event]  (-> event .-target .-value))

; These functions are all Reagent components

(defn input-field-comp
  [{:keys [title on-save on-stop]}] ; #todo -> (with-map-vals [title on-save on-stop] ...)
  (let [val  (r/atom title)
        stop (fn []
               (reset! val "")
               (when on-stop (on-stop)))
        save #(let [v (-> @val str str/trim)]
                (on-save v)
                (stop))]
    (fn [props]
      [:input
       (merge (dissoc props :on-save :on-stop :title)
         {:type        "text"
          :value       @val
          :auto-focus  true
          :on-blur     save
          :on-change   #(reset! val (event-value %))
          :on-key-down #(let [rcvd (.-which %)] ; KeyboardEvent property
                          (cond
                            (= rcvd ascii-code-return) (save)
                            (= rcvd ascii-code-escape) (stop)
                            :else nil))})])))

(defn single-task-comp []
  (let [editing (r/atom false)]
    (fn [{:keys [id done title]}]
      [:li {:class (cond-> ""
                     done (str " completed")
                     @editing (str " editing"))}
       [:div.view
        [:input.toggle
         {:type      "checkbox"
          :checked   done
          :on-change #(rf/dispatch [:toggle-done id])}]
        [:label
         {:on-double-click #(reset! editing true)}
         title]
        [:button.destroy
         {:on-click #(rf/dispatch [:delete-todo id])}]]
       (when @editing
         [input-field-comp
          {:class   "edit"
           :title   title
           :on-save #(if (seq %)
                       (rf/dispatch [:save id %])
                       (rf/dispatch [:delete-todo id]))
           :on-stop #(reset! editing false)}])])))

(defn task-list-comp []
  (let [visible-todos @(rf/subscribe [:visible-todos])
        all-complete? @(rf/subscribe [:all-complete?])]
    [:section#main
     [:input#toggle-all
      {:type      "checkbox"
       :checked   all-complete?
       :on-change #(rf/dispatch [:complete-all-toggle])}]
     [:label        ; #todo this does not seem to work (as a tooltip?)
      {:for "toggle-all"}
      "Mark all as complete"]
     [:ul#todo-list
      (for [todo-curr visible-todos]
        ^{:key (:id todo-curr)} [single-task-comp todo-curr])]])) ; delegate to single-task-comp

(defn footer-controls-comp []
  (let [[active done] @(rf/subscribe [:footer-counts])
        showing @(rf/subscribe [:showing])
        a-fn    (fn [filter-kw txt]
                  [:a {:class (when (= filter-kw showing) "selected")
                       :href  (str "#/" (name filter-kw))} txt])]
    [:footer#footer
     [:span#todo-count
      [:strong active] " " (case active 1 "item" "items") " left"]
     [:ul#filters
      [:li (a-fn :all "All")]
      [:li (a-fn :active "Active")]
      [:li (a-fn :done "Completed")]]
     (when (pos? done)
       [:button#clear-completed {:on-click #(rf/dispatch [:clear-completed])}
        "Clear completed"])]))


(defn task-entry-comp []
  [:header#header
   [:h1 "todos"]
   [input-field-comp
    {:id          "new-todo"
     :placeholder "What needs to be done?"
     :on-save     #(when (seq %)
                     (rf/dispatch [:add-todo %]))}]])


(defn todo-app-comp []
  [:div
   [:section#todoapp
    [task-entry-comp]
    (when (seq @(rf/subscribe [:todos]))
      [task-list-comp])
    [footer-controls-comp]]
   [:footer#info
    [:p "Double-click to edit a todo"]]])
