(ns todomvc.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [goog.events :as events]
            [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [dispatch]]
            [secretary.core :as secretary]
            [todomvc.handlers]
            [todomvc.subs]
            [todomvc.views])
  (:import [goog History]
           [goog.history EventType]))

;; TODOs
;; A bug:  footer disppears and never comes back
;; load todos off localstorage via merge ... and write back via middleware
;; history

(enable-console-print!)

;; routes

;; =============================================================================
;; Routing

(defroute "/" [] (dispatch [:set-showing :all]))

(defroute "/:filter" [filter] (dispatch [:set-showing (keyword filter)]))

(def history (History.))

(events/listen history EventType.NAVIGATE
  (fn [e] (secretary/dispatch! (.-token e))))

(.setEnabled history true)

;; =============================================================================

(defn ^:export main
  []
  (dispatch [:initialise-db])       ;; remember this is async
  (reagent/render [todomvc.views/top-panel]
                  (.getElementById js/document "app")))
