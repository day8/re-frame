(ns todomvc.dev
  (:require [todomvc.core :as todomvc]
            [figwheel.client :as fw]))

#_(fw/start {:on-jsload todomvc/main
           :websocket-url "ws://localhost:3449/figwheel-ws"})

(defn start []
  (fw/start {:jsload-callback (fn [] (todomvc/main))})
  (todomvc/main))