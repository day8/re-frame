(ns simpleexample.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))


;; Read this file from the top towards the bottom.

;; Normally I'd recomended you write a schema for the appplication
;; state. But I'm going to skip that step to keep things simple.
;;
;; Suffice it to say the application state looks like this:
;;   {:time       (js/Date.)
;;    :time-color "#f88"}
;;
;; See FAQ #1 for details on how to inspect application state.

;; -- Domino 1 - Events -------------------------------------------------------
;;
;; To send an event you call `dispatch` with a single vector argument.
;;
;;    (dispatch [:event-id  value1 value2])
;;
;; The first element in the vector identifies the kind of event. The
;; further elements are optional, additional data associated with the event.
;;
;; Below we send a `:timer` event every second. But, typically,
;; events are `dispatch`ed when a button is clicked or an
;; HTTP POST's on-success is called or a web sockets gets a new packet.
;;
;; So `dispatch` gets called in various places.
;;
;; Later, when we get to Domino 5 (view functions) you'll see
;; an example of DOM elements causing a `dispatch`.

(defn dispatch-timer-event
  []
  (let [now (js/Date.)]
    (rf/dispatch [:timer now])))

;; an event will be dispatched every second
(defonce time-updater (js/setInterval dispatch-timer-event 1000))


;; -- Domino 2 - Event Handlers -----------------------------------------------
;;
;; Associate a "handler function" with each kind of event.
;;
;; This application has three events, identified by keywords:
;;   :initialise
;;   :time-color-change
;;   :timer
;;
;; Because there's 3 events, below you'll see `reg-event-db`
;; called 3 times, registering 3 handlers, each like this:
;;   (reg-event-db
;;      :a-keyword-id-for-the-event
;;      a-function-which-will-handle-the-event)
;;
;; Any event handler registered via `reg-event-db` will look like this:
;;    (fn [db v]
;;       ...)
;; It will take two parameters, the current application state `db`
;; and the event vector `v` which is being handled.
;; It must compute and return the new state of the application.
;;
;; Below, you'll sometimes see it written as:
;;   (fn [db [_ something]]  <-- 2nd vec param destructured to get payload value
;;       ...)
;;
;; An event handler return `effects`.  We're using
;; `reg-event-db` here which assumes the only effect required (for this event)
;; is a change to application state.  When you need to do other effects,
;; like sending emails, or http POSTing, or writing to localstore, you
;; would use the more sophisticated `reg-event-fx`  (note the trailing -fx) which
;; is described in the tutorial. We're keeping it simple for the moment.

(rf/reg-event-db              ;; sets up initial application state
  :initialize                 ;; usage:  (dispatch [:initialize])
  (fn [_ _]                   ;; the two parameters are not important here, so use _
    {:time (js/Date.)         ;; What it returns becomes the new application state
     :time-color "#f88"}))    ;; so the application state will initially be a map with two keys


(rf/reg-event-db                ;; usage:  (dispatch [:time-color-change 34562])
  :time-color-change            ;; dispatched when the user enters a new colour into the UI
  (fn [db [_ new-color-value]]  ;; -db event handlers given 2 parameters:  current application state and event (a vector)
    (assoc db :time-color new-color-value)))   ;; compute and return the new application state


(rf/reg-event-db                 ;; usage:  (dispatch [:timer a-js-Date])
  :timer                         ;; every second an event of this kind will be dispatched
  (fn [db [_ new-time]]          ;; note how the 2nd parameter is desctructure to obtain the data value
    (assoc db :time new-time)))  ;; compute and return the new application state


;; -- Domino 3 - Efect Handlers -----------------------------------------------
;;
;; You almost never have to write effect handlers. You just use the standard
;; re-frame ones or, sometimes, ones from a library.
;;
;; In this simple app, the only effect returned by event handlers is that
;; of changing application state, which is a standard effect, and even THAT
;; effect is implied (rather than explicit) because we are using the
;; helpful registration function `reg-event-db`
;;
;; Just know that effects are happening but we don't need to do anything.  We'll
;; learn more about effect handlers later.


;; -- Domino 4 - Subscription Handlers ----------------------------------------
;;
;; These query functions take application state and return a "materialised view"
;; of that state. A computation over the current application state.
;;
;; Now, the examples below are trivial. They just extract part of the application
;; state and return it. Virtually no computation.
;;
;; More interesting subscriptions and more explanation can be found in the
;; todomvc example.
;;
;; `reg-sub` associates a `query identifier` with a function which computes
;;  that query, like this:
;;   (reg-sub
;;     :some-query-id      ;; query identifier
;;     some-function)      ;; the function which will compute the query
;; If ever a view requests data like this:
;;     `(listen [:some-query-id])`   ;; note use of `:some-query-id`
;; then `some-function` will be used to perform the query over applciation state
;; when a
;;
;; Each time application state changes, `some-function` will be
;; called again to compute a new materialised view (a new computation)
;; and that new value will be given to any view function which is subscribed
;; to `:some-query-id`. The view function itself will then also be called again
;; to create new DOM (because it depends on a query value which changed).
;;
;; re-frame will ensure the necessary calls are made, at the right time.
;;
(rf/reg-sub
  :time
  (fn [db _]     ;; db is current app state. 2nd usused param is query vector
    (:time db))) ;; return a query computation over the application state

(rf/reg-sub
  :time-color
  (fn [db _]
    (:time-color db)))


;; -- Domino 5 - View Functions ----------------------------------------------
;;
;; We're using Reagent here.
;; These functions turn data into DOM. They render the UI.
;; The data they return is a hiccup formated description of the DOM required.
;; They take two sources of data:
;;   - arguments
;;   - queries which obtain data from the application state.
;;
;;
;; Noitce that color-input has a dispatch

(defn clock
  []
  [:div.example-clock
   {:style {:color (rf/listen [:time-color])}}
   (-> (rf/listen [:time])
       .toTimeString
       (clojure.string/split " ")
       first)])

(defn color-input
  []
  [:div.color-input
   "Time color: "
   [:input {:type "text"
            :value (rf/listen [:time-color])
            :on-change #(rf/dispatch [:time-color-change (-> % .-target .-value)])}]])  ;; <---

(defn ui
  []
  [:div
   [:h1 "Hello world, it is now"]
   [clock]
   [color-input]])


;; -- Entry Point -------------------------------------------------------------


(defn ^:export run
  []
  (dispatch-sync [:initialize])     ;; puts a value into application state
  (reagent/render [ui]              ;; mount the application's ui into '<div id="app" />'
                  (js/document.getElementById "app")))

