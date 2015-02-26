(ns todomvc.core
  (:require-macros [reagent.ratom :refer [reaction]])  
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [register-pure-handler
                                   register-subs
                                   subscribe
                                   dispatch]]))

(defonce initial-db 
  {:todos (sorted-map)
   :counter 0})

(register-pure-handler
  :initialize
  (fn 
    [db _]
    (dispatch [:add-todo "Rename Cloact to Reagent"])
    (dispatch [:add-todo "Add undo demo"])
    (dispatch [:add-todo "Make all rendering async"])
    (dispatch [:add-todo "Allow any arguments to component functions"])
    (dispatch [:add-todo "Use re-frame in the todomvc example"])
    (dispatch [:complete-all true])
    ;; as the dispatches are async the next line is executed first
    (merge db initial-db)))

(register-pure-handler
  :add-todo
  (fn
    [db [_ text]]
    (let [id (inc (:counter db))]
      (-> db
          (assoc :counter id)
          (assoc-in [:todos id] 
                    {:id id :title text :done false})))))

(defn mmap [m f a] (->> m (f a) (into (empty m))))

(register-pure-handler
  :complete-all
  (fn
    [db [_ v]]
    (let [todos (:todos db)
          removed-todos (mmap todos map #(assoc-in % [1 :done] v))]
      (assoc db :todos removed-todos))))

(register-pure-handler
  :toggle
  (fn
    [db [_ id]]
    (let [todos (:todos db)]
      (assoc db :todos (update-in todos [id :done] not)))))

(register-pure-handler
  :save
  (fn
    [db [_ id title]]
    (let [todos (:todos db)]
      (assoc db :todos (assoc-in todos [id :title] title)))))

(register-pure-handler
  :delete
  (fn
    [db [_ id]]
    (let [todos (:todos db)]
      (assoc db :todos (dissoc todos id)))))

(register-pure-handler
  :clear-done
  (fn
    [db [_ v]]
    (let [todos (:todos db)
          done-todos (mmap todos remove #(get-in % [1 :done]))]
      (assoc db :todos done-todos))))

(register-subs
  :counter
  (fn 
    [db _]
    (reaction (:counter @db))))

(register-subs
  :todos
  (fn 
    [db _]
    (reaction (:todos @db))))

(register-subs
  :items
  (fn 
    [db _]
    (reaction (vals (:todos @db)))))

(register-subs
  :done
  (fn 
    [db _]
    (reaction (->> @(subscribe [:items]) 
                   (filter :done) 
                   count))))

(register-subs
  :active
  (fn 
    [db _]
    (reaction (- (count @(subscribe [:items]))
                 @(subscribe [:done])))))



(defonce init (dispatch [:initialize]))

(defn todo-input [{:keys [title on-save on-stop]}]
  (let [val (atom title)
        stop #(do (reset! val "")
                  (if on-stop (on-stop)))
        save #(let [v (-> @val str clojure.string/trim)]
                (if-not (empty? v) (on-save v))
                (stop))]
    (fn [props]
      [:input (merge props
                     {:type "text" :value @val :on-blur save
                      :on-change #(reset! val (-> % .-target .-value))
                      :on-key-down #(case (.-which %)
                                      13 (save)
                                      27 (stop)
                                      nil)})])))

(def todo-edit (with-meta todo-input
                 {:component-did-mount #(.focus (reagent/dom-node %))}))

(defn todo-stats [{:keys [filt active done]}]
  (let [props-for (fn [name]
                    {:class (if (= name @filt) "selected")
                     :on-click #(reset! filt name)})]
    [:div
     [:span#todo-count
      [:strong active] " " (case active 1 "item" "items") " left"]
     [:ul#filters
      [:li [:a (props-for :all) "All"]]
      [:li [:a (props-for :active) "Active"]]
      [:li [:a (props-for :done) "Completed"]]]
     (when (pos? done)
       [:button#clear-completed {:on-click #(dispatch [:clear-done])}
        "Clear completed " done])]))

(defn todo-item []
  (let [editing (atom false)]
    (fn [{:keys [id done title]}]
      [:li {:class (str (if done "completed ")
                        (if @editing "editing"))}
       [:div.view
        [:input.toggle {:type "checkbox" :checked done
                        :on-change #(dispatch [:toggle id])}]
        [:label {:on-double-click #(reset! editing true)} title]
        [:button.destroy {:on-click #(dispatch [:delete id])}]]
       (when @editing
         [todo-edit {:class "edit" :title title
                     :on-save #(dispatch [:save id %])
                     :on-stop #(reset! editing false)}])])))

(defn todo-app [props]
  (let [todos (subscribe [:todos])
        items (subscribe [:items])
        done (subscribe [:done])
        active (subscribe [:active])]
    (fn [] 
      (let [filt (atom :all)]
        (fn []
            [:div
             [:section#todoapp
              [:header#header
               [:h1 "todos"]
               [todo-input {:id "new-todo"
                            :placeholder "What needs to be done?"
                            :on-save #(dispatch [:add-todo %])}]]
              (when (-> @items count pos?)
                [:div
                 [:section#main
                  [:input#toggle-all {:type "checkbox" :checked (zero? @active)
                                      :on-change #(dispatch 
                                                    [:complete-all 
                                                     (pos? @active)])}]
                  [:label {:for "toggle-all"} "Mark all as complete"]
                  [:ul#todo-list
                   (for [todo (filter (case @filt
                                        :active (complement :done)
                                        :done :done
                                        :all identity) @items)]
                     ^{:key (:id todo)} [todo-item todo])]]
                 [:footer#footer
                  [todo-stats {:active @active :done @done :filt filt}]]])]
             [:footer#info
              [:p "Double-click to edit a todo"]]])))))

(defn ^:export run []
  (reagent/render [todo-app]
                  (js/document.getElementById "app")))
