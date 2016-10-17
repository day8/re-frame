(ns todomvc.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [goog.events :as events]
            [reagent.core :as reagent]
            [re-frame.core :refer [dispatch dispatch-sync]]
            [re-frame.registrar :as registrar]
            [secretary.core :as secretary]
            [todomvc.events]
            [todomvc.subs]
            [todomvc.views]
            [devtools.core :as devtools])
  (:import [goog History]
           [goog.history EventType]))


;; -- Debugging aids ----------------------------------------------------------
(defn install-devtools [] (devtools/install!))              ;; we love https://github.com/binaryage/cljs-devtools
(enable-console-print!)   ;; so println writes to console.log

;; -- Routes and History ------------------------------------------------------

(defroute "/" [] (dispatch [:set-showing :all]))
(defroute "/:filter" [filter] (dispatch [:set-showing (keyword filter)]))

(defn enable-history []
  (doto (History.)
    (events/listen EventType.NAVIGATE
                   (fn [event] (secretary/dispatch! (.-token event))))
    (.setEnabled true)))


;; -- Entry Point -------------------------------------------------------------

(defn render
  []
  (reagent/render [todomvc.views/todo-app]
                  (.getElementById js/document "app")))

(defn before-reload
  "Set *warn-on-overwrite* false so that we don't get lots of warnings from Figwheel when reloading."
  []
  (set! registrar/*warn-on-overwrite* false))

(defn figwheel-reload []
  (set! registrar/*warn-on-overwrite* true)
  (render))

(defn ^:export main
  []
  (install-devtools)
  (enable-history)
  (dispatch-sync [:initialise-db])
  (render))

