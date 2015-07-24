(ns simpleexample.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core :as reagent]
            [re-frame.core :refer [register-handler
                                   path
                                   register-sub
                                   dispatch
                                   dispatch-sync
                                   subscribe]]))

;; trigger a dispatch every second
(defonce time-updater (js/setInterval
                        #(dispatch [:timer (js/Date.)]) 1000))

(def initial-state
  {:timer (js/Date.)
   :time-color "#f34"})


;; -- Event Handlers ----------------------------------------------------------


(register-handler                 ;; setup initial state
  :initialize                     ;; usage:  (submit [:initialize])
  (fn
    [db _]
    (merge db initial-state)))    ;; what it returns becomes the new state


(register-handler
  :time-color                     ;; usage:  (submit [:time-color 34562])
  (path [:time-color])            ;; this is middleware
  (fn
    [time-color [_ value]]        ;; path middleware adjusts the first parameter
    value))


(register-handler
  :timer
  (fn
    ;; the first item in the second argument is :timer the second is the
    ;; new value
    [db [_ value]]
    (assoc db :timer value)))    ;; return the new version of db


;; -- Subscription Handlers ---------------------------------------------------


(register-sub
  :timer
  (fn
    [db _]                       ;; db is the app-db atom
    (reaction (:timer @db))))    ;; wrap the computation in a reaction


(register-sub
  :time-color
  (fn
    [db _]
    (reaction (:time-color @db))))


;; -- View Components ---------------------------------------------------------

(defn greeting
  [message]
  [:h1 message])


(defn clock
  []
  (let [time-color (subscribe [:time-color])
        timer (subscribe [:timer])]

    (fn clock-render
        []
        (let [time-str (-> @timer
                           .toTimeString
                           (clojure.string/split " ")
                           first)
              style {:style {:color @time-color}}]
             [:div.example-clock style time-str]))))


(defn color-input
  []
  (let [time-color (subscribe [:time-color])]

    (fn color-input-render
        []
        [:div.color-input
         "Time color: "
         [:input {:type "text"
                  :value @time-color
                  :on-change #(dispatch-sync
                               [:time-color (-> % .-target .-value)])}]])))

(defn simple-example
  []
  [:div
   [greeting "Hello world, it is now"]
   [clock]
   [color-input]])


;; -- Entry Point -------------------------------------------------------------


(defn ^:export run
  []
  (dispatch-sync [:initialize])
  (reagent/render [simple-example]
                  (js/document.getElementById "app")))
