(ns todomvc.core
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [dispatch]]
            [todomvc.handlers]
            [todomvc.subs]
            [todomvc.views]))

;; TODOs
;; A bug:  footer disppears and never comes back
;; load todos off localstorage via merge ... and write back via middleware
;; history

(enable-console-print!)


(defn ^:export main
  []
  (dispatch [:initialise-db])
  (reagent/render [todomvc.views/top-panel]
                  (.getElementById js/document "app")))
