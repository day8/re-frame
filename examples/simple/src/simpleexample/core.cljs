(ns simpleexample.core
  (:require-macros [reagent.ratom :refer [reaction]])  
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [register-handler 
                                   register-pure-handler
                                   pure
                                   register-sub 
                                   dispatch 
                                   subscribe]]))

(defonce timer (atom (js/Date.)))

(defonce time-updater (js/setInterval
                        #(dispatch [:timer (js/Date.)]) 1000))

;;; this is the initial state
(defonce initial-state
  {:timer (js/Date.)
   :time-color "#f34"})

;; Handlers
;-------------------------------------------------------------

;; This handler sets the initial state
(register-pure-handler
  ;; register-pure-handler is a convience macro that will be used 90% of the 
  ;; time  
  ;; the handler is passed a map (not an atom) and must return the new state
  ;; of the db
  :initialize
  (fn 
    [db _]
    (merge db initial-state)))

;; This handler changes the color of the displayed time
(register-handler
  ;;; register-handler can take 3 arguments to allow you to insert middleware
  ;;; see https://github.com/Day8/re-frame/wiki/Handler-Middleware
  :time-color
  pure
  (fn
    ;; the first item in the second argument is :time-color the second is the 
    ;; new value
    [db [_ value]]
    (assoc db :time-color value)))

;; This handler changes the value of the time
(register-handler
  ;; This is a non-pure handler (NOT RECCOMENDED), no middleware is called
  ;; and the app-db is passed directly as a atom.
  ;; Note, there is no reason why this particular handler should not be pure
  :timer
  (fn
    ;; the first item in the second argument is :timer the second is the 
    ;; new value
    [db [_ value]]
    (swap! db assoc :timer value)))

;; add subscriptions to :timer and :time-color
(register-sub
  :timer
  (fn 
    [db _]
    ;; you need to wrap your subscription code in a reaction
    (reaction (:timer @db))))

(register-sub
  :time-color
  (fn 
    [db _]
    ;; you need to wrap your subscription code in a reaction
    (reaction (:time-color @db))))

(dispatch [:initialize])


(defn greeting [message]
  [:h1 message])

(defn clock []
  (let [time-color (subscribe [:time-color])
        timer (subscribe [:timer])]
    ;;; wrap your component in a function to use the suscription
    (fn [] 
      ;; note that the initialize call will not be dispatched immediately
      ;; as it is an async call
      (when @timer
        (let [time-str (-> @timer .toTimeString (clojure.string/split " ") first)]
          [:div.example-clock
           {:style {:color @time-color}}
           time-str])))))

(defn color-input []
  (let [time-color (subscribe [:time-color])]
    ;;; wrap your component in a function to use the suscription
    (fn []
      [:div.color-input
       "Time color: "
       [:input {:type "text"
                :value @time-color
                :on-change #(dispatch 
                              [:time-color (-> % .-target .-value)])}]])))

(defn simple-example []
  [:div
   [greeting "Hello world, it is now"]
   [clock]
   [color-input]])

(defn ^:export run []
  (reagent/render [simple-example]
                  (js/document.getElementById "app")))