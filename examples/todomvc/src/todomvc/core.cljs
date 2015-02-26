(ns todomvc.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [register-pure-handler
                                   register-sub
                                   subscribe
                                   dispatch
                                   path trim-v undoable]]))

;; TODOs
;; add .gitignore
;; Get preoject.cljs up to speed  `lein run`  lein debug`
;; split into files  view, handlers, subs, middleware
;; load todos off localstorage via merge ... and write back
;; Show off debugging capabiliteis
;; Add Prismatic schema - modules called state
;; change example.html to todo.html
;; add middleware to save to local storage - beware using
;; check that (path )  does an identity test before swaping back in
;; add apply-vector middleware

;; -- Helpers -------------

(defn next-id
  [todos]
  (if (empty? todos)
    0
    (inc (apply max (keys todos)))))  ;; hillariously inefficient, but yeah


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
(def todo-middleware (comp undoable (path [:todos]) trim-v))


;; -- Handlers -------------

;; we dispatch this event on program startup - responsible for initialising-db
(register-pure-handler
  :initialise-db
  (fn 
    [_ _]
    {:todos   (sorted-map)
     :showing :all}
    #_(merge db initial-db)))

(register-pure-handler
  :set-showing
  (comp undoable trim-v)     ;; middleware
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
  :complete-all
  todo-middleware
  (fn
    [todos [val]]
    (reduce #(assoc-in %1 [%2 :done] val)
            todos
            (keys todos))))

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
    (let [completed-ids (->> (vals todos)     ;; use a transducer XXX
                             (remove :done)
                             (map :id))]
      (reduce #(dissoc %1 %2)
              todos
              completed-ids))))

;; -- Subscriptions ---------

(register-sub
  :visible-todos
  (fn
    [db _]
    (let [todos     (reaction (:todos @db))
          showing   (reaction (:showing @db))
          filter-fn (case @showing
                      :active (complement :done)
                      :done :done
                      :all identity)]
    (reaction (filter filter-fn (vals @todos))))))


(register-sub
  :completed-count
  (fn
    [db _]
    (reaction (->> (:todos @db)
                   (filter :done)
                   count))))

(register-sub
  :footer-stats
  (fn
    [db _]
    (let [todos (reaction (:todos @db))
          completed-count (subscribe [:completed-count])
          active-count    (reaction (- (count @todos) @completed-count))
          showing         (reaction (:showing @db))]
      (reaction [@active-count @completed-count @showing]))))  ;; tuple


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

(defn stats-footer []
  (let [footer-stats (subscribe :footer-stats)]
    (fn []
      (let [[active done filter] @footer-stats
            props-for (fn [filter-kw]
                        {:class (if (= filter-kw filter) "selected")
                         :on-click #(dispatch [:set-showing filter-kw])})]
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

(defn todo-item []
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


(defn todo-app []
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
              :on-change #(dispatch [:complete-all (zero? @completed-count)])}]
            [:label {:for "toggle-all"} "Mark all as complete"]
            [todo-list visible-todos]]
           [stats-footer]])]
       [:footer#info
        [:p "Double-click to edit a todo"]]])))

(defn ^:export run
  []
  (dispatch [:initialise-db])
  (reagent/render [todo-app] (js/document.getElementById "app")))
