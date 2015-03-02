(ns todomvc.dev
  (:require [todomvc.core :as todomvc]
            [figwheel.client :as fw]))

(defn start []
  ;(fw/start {:jsload-callback (fn [] (todomvc/main))})
  (todomvc/main))