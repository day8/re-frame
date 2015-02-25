(ns simpleexample.core
  (:require-macros [reagent.ratom :refer [reaction]])  
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.handlers :as handlers]
            [re-frame.subs :as subs]
            [re-frame.handlers :refer [dispatch]]))

(defonce timer (atom (js/Date.)))

(defonce time-updater (js/setInterval
                        #(dispatch [:timer (js/Date.)]) 1000))

;;; re-frame stuff
;;; add an initialize handler
;;; this will set the initial state
(defonce initial-state
  {:timer (js/Date.)
   :time-color "#f34"})

(handlers/register
  :initialize
  (fn 
    [db _]
    (swap! db merge initial-state)))

;; add subscriptions to :timer and :time-color
(subs/register
  :timer
  (fn 
    [db _]
    ;; you need to wrap your subscription code in a reaction
    (reaction (:timer @db))))

(subs/register
  :time-color
  (fn 
    [db _]
    ;; you need to wrap your subscription code in a reaction
    (reaction (:time-color @db))))

(handlers/register
  :time-color
  (fn
    ;; the first item in the second argument is :time-color the second is the 
    ;; new value
    [db [_ value]]
    (swap! db assoc :time-color value)))

(handlers/register
  :timer
  (fn
    ;; the first item in the second argument is :timer the second is the 
    ;; new value
    [db [_ value]]
    (swap! db assoc :timer value)))

(dispatch [:initialize])


(defn greeting [message]
  [:h1 message])

(defn clock []
  (let [time-color (subs/subscribe [:time-color])
        timer (subs/subscribe [:timer])]
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
  (let [time-color (subs/subscribe [:time-color])]
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