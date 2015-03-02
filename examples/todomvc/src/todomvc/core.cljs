(ns todomvc.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [register-pure-handler
                                   register-sub
                                   subscribe
                                   dispatch
                                   path trim-v debug]]))

;; TODOs
;; Get preoject.cljs up to speed  `lein run`  lein debug`
;; split into files  view, handlers, subs, middleware
;; load todos off localstorage via merge ... and write back
;; Show off debugging capabiliteis
;; Add Prismatic schema - modules called state
;; add middleware to save to local storage

;; -- Helpers -------------

(enable-console-print!)

(defn next-id
  [todos]
  (if (empty? todos)
    0
    (inc (apply max (keys todos)))))  ;; hillariously inefficient, but yeah


(defn filter-fn-for
  [showing-kw]
  (case showing-kw
    :active (complement :done)
    :done   :done
    :all    identity))


(defn completed-count
  "return the count of todos which have a :done of true"
  [todos]
  (count (filter :done (vals todos))))

;; -- Middleware -------------
;;
;; Handlers can be wrapped in middleware.
;;
;; Below we are composing 3 pieces of middleware (into one unit)
;;    - we want an undo checkpoint on each change
;;    - we want our handler to be be given the value at :todos
;;      rather than the root of the map.
;;    - for asthetic reasons, we want to strip the leding event
;;      id on the event-vector, so only the real params are
;;      passed into handlers.
;;
;;  Debug Middleware:
;;    - in debug we always want to write events to console
;;    - in debug, after each handler has run, we want to see how `app-db` has changed.
;;
;;  These two pieces of middleware make debugging a delight.
;;  State changes ONLY ever happen via handlers. So being able to
;;  monitor their effects is gold.  And then turn it off pnce we get
;;  into production.
;;
;; Middleware means our handlers are pure and simple.
;;
(def todo-middleware [(path [:todos])  debug trim-v])

;; -- Handlers -------------

;; we dispatch this event on program startup - responsible for initialising-db
(register-pure-handler
  :initialise-db
  [debug]     ;; middleware
  (fn
    [_ _]
    {:todos   (sorted-map)
     :showing :all}))

(register-pure-handler
  :set-showing
  [debug trim-v]     ;; middleware
  (fn
    [db [filter-kw]]
    (assoc db :showing filter-kw)))

(register-pure-handler
  :add-todo
  todo-middleware
  (fn
    [todos [text]]
    (let [id  (next-id todos)]
      (assoc todos id {:id id :title text :done false}))))

(register-pure-handler
  :complete-all-toggle
  todo-middleware
  (fn
    [todos []]
    (let [val (every? (comp true? :done) (vals todos))]
      (println "todos " todos)
      (println "val " val)
      (reduce #(assoc-in %1 [%2 :done] val)
              todos
              (keys todos)))))

(register-pure-handler
  :toggle-done
  todo-middleware
  (fn
    [todos [id]]
    (update-in todos [id :done] not)))

(register-pure-handler
  :save
  todo-middleware
  (fn
    [todos [id title]]
    (assoc-in todos [id :title] title)))

(register-pure-handler
  :delete-todo
  todo-middleware
  (fn
    [todos [id]]
    (dissoc todos id)))

(register-pure-handler
  :clear-completed
  todo-middleware
  (fn
    [todos _]
    (->> (vals todos)
         (filter :done)
         (map :id)
         (reduce dissoc todos))))

;; -- Subscriptions ---------

(register-sub
  :initialised?
  (fn
    [db _]
    (reaction (not= {} @db))))

(register-sub
  :visible-todos
  (fn
    [db _]
    (reaction (filter (filter-fn-for (:showing @db))
                      (vals (:todos @db))))))

(register-sub
  :completed-count
  (fn
    [db _]
    (reaction (completed-count (:todos @db)))))


#_(register-sub
  :footer-stats
  (fn
    [db _]
    (let [todos (reaction (:todos @db))
          completed-count (subscribe [:completed-count])
          active-count    (reaction (- (count (vals @todos)) @completed-count))
          showing         (reaction (:showing @db))]
      (reaction
        [@active-count @completed-count @showing]))))  ;; tuple

(register-sub
  :footer-stats
  (fn
    [db _]
    (reaction
      (let [todos (:todos @db)
            completed-count (completed-count todos)
            active-count    (- (count todos) completed-count)
            showing         (:showing db)]
        [active-count completed-count showing]))))  ;; tuple


;; -- Components ---------


(defn todo-input [{:keys [title on-save on-stop]}]
  (let [val (atom title)
        stop #(do (reset! val "")
                  (if on-stop (on-stop)))
        save #(let [v (-> @val str clojure.string/trim)]
               (if-not (empty? v) (on-save v))
               (stop))]
    (fn [props]
      [:input (merge props
                     {:type "text"
                      :value @val
                      :on-blur save
                      :on-change #(reset! val (-> % .-target .-value))
                      :on-key-down #(case (.-which %)
                                     13 (save)
                                     27 (stop)
                                     nil)})])))

(def todo-edit (with-meta todo-input
                          {:component-did-mount #(.focus (reagent/dom-node %))}))

(defn stats-footer
  []
  (let [footer-stats (subscribe [:footer-stats])]
    (fn []
      (let [[active done filter] @footer-stats
            props-for (fn [filter-kw]
                        {:class (if (= filter-kw filter) "selected")
                         :on-click #(dispatch [:set-showing filter-kw])})]
        (println active done filter)
        [:footer#footer
         [:div
          [:span#todo-count
           [:strong active] " " (case active 1 "item" "items") " left"]
          [:ul#filters
           [:li [:a (props-for :all) "All"]]
           [:li [:a (props-for :active) "Active"]]
           [:li [:a (props-for :done) "Completed"]]]
          (when (pos? done)
            [:button#clear-completed {:on-click #(dispatch [:clear-completed])}
             "Clear completed " done])]]))))

(defn todo-item
  []
  (let [editing (atom false)]
    (fn [{:keys [id done title]}]
      [:li {:class (str (if done "completed ")
                        (if @editing "editing"))}
       [:div.view
        [:input.toggle {:type "checkbox" :checked done
                        :on-change #(dispatch [:toggle-done id])}]
        [:label {:on-double-click #(reset! editing true)} title]
        [:button.destroy {:on-click #(dispatch [:delete-todo id])}]]
       (when @editing
         [todo-edit {:class "edit" :title title
                     :on-save #(dispatch [:save id %])
                     :on-stop #(reset! editing false)}])])))

(defn todo-list
  [visible-todos]
  [:ul#todo-list
   (for [todo  @visible-todos]
     ^{:key (:id todo)} [todo-item todo])])


(defn todo-app
  []
  (let [visible-todos   (subscribe [:visible-todos])
        completed-count (subscribe [:completed-count])]
    (fn []
      [:div
       [:section#todoapp
        [:header#header
         [:h1 "todos"]
         [todo-input {:id "new-todo"
                      :placeholder "What needs to be done?"
                      :on-save #(dispatch [:add-todo %])}]]
        (when-not (empty? @visible-todos)
          [:div
           [:section#main
            [:input#toggle-all
             {:type "checkbox"
              :checked (pos? @completed-count)
              :on-change #(dispatch [:complete-all-toggle])}]
            [:label {:for "toggle-all"} "Mark all as complete"]
            [todo-list visible-todos]]
           [stats-footer]])]
       [:footer#info
        [:p "Double-click to edit a todo"]]])))

(defn main-panel
  []
  (let [initialised? (subscribe  [:initialised?])]
    (fn []
      (if @initialised?
        [todo-app]
        [:div "Loading ...."]))))

(defn ^:export main
  []
  (dispatch [:initialise-db])
  (reagent/render [main-panel] (js/document.getElementById "app")))

;; you must always return the db