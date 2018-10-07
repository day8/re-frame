(ns simple.core
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [clojure.string :as str]))

; A detailed walk-through of this source code is provided in the docs:
; https://github.com/Day8/re-frame/blob/master/docs/CodeWalkthrough.md

; -- Domino 1 - Event Dispatch -----------------------------------------------
(defn dispatch-clock-tick-event
  []
  (let [now (js/Date.)]
    (rf/dispatch [:clock-tick-event now])))  ; <-- dispatch used

; Call the dispatching function every second.
; `defonce` is like `def` but it ensures only one instance is ever
; created in the face of figwheel hot-reloading of this file.
(defonce do-timer (js/setInterval dispatch-clock-tick-event 1000))

; -- Domino 2 - Event Handlers -----------------------------------------------
(rf/reg-event-db              ; sets up initial application state
  :initialize-event                 ; usage:  (dispatch [:initialize])
  (fn [_ _]                   ; the two parameters are not important here, so use _
    {:time  (js/Date.)         ; What it returns becomes the new application state
     :color "#f88"}))    ; so the application state will initially be a map with two keys

(rf/reg-event-db                ; usage:  (dispatch [:time-color-change 34562])
  :color-change-event      ; dispatched when the user enters a new colour into the UI text field
  (fn [db [_ new-color-value]]  ; -db event handlers given 2 parameters:  current application state and event (a vector)
    (assoc db :color new-color-value)))   ; compute and return the new application state

(rf/reg-event-db                 ; usage:  (dispatch [:timer a-js-Date])
  :clock-tick-event                   ; every second an event of this kind will be dispatched
  (fn [db [_ new-time]]          ; note how the 2nd parameter is destructured to obtain the data value
    (assoc db :time new-time)))  ; compute and return the new application state

; -- Domino 4 - Query  -------------------------------------------------------
(rf/reg-sub
  :time-query
  (fn [db _]     ; db is current app state. 2nd unused param is query vector
    (:time db))) ; return a query computation over the application state

(rf/reg-sub
  :time-color-query
  (fn [db _]
    (:color db)))

; -- Domino 5 - View Functions ----------------------------------------------
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color-query])}}
   (-> @(rf/subscribe [:time])
       .toTimeString
       (str/split " ")
       first)])

(defn color-input
  []
  [:div.color-input
   "Time color: "
   [:input {:type "text"
            :value @(rf/subscribe [:time-color-query])
            :on-change #(rf/dispatch [:color-change-event (-> % .-target .-value)])}]])  ; <---

(defn ui
  []
  [:div
   [:h1 "Hello world, it is now"]
   [clock]
   [color-input]])

; -- Entry Point -------------------------------------------------------------
(defn ^:export run
  []
  (rf/dispatch-sync [:initialize-event])     ; puts a value into application state
  (reagent/render [ui]              ; mount the application's ui into '<div id="app" />'
                  (js/document.getElementById "app")))
