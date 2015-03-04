(ns todomvc.core
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :refer [dispatch]]
            [todomvc.handlers]
            [todomvc.subs]
            [todomvc.views]))

;; TODOs
;; Get preoject.cljs up to speed  `lein run`  lein debug`
;; load todos off localstorage via merge ... and write back via middleware

(enable-console-print!)


(defn ^:export main
  []
  (dispatch [:initialise-db])
  (reagent/render [todomvc.views/top-panel]
                  (.getElementById js/document "app")))
