(ns simpleexample.dev
  (:require [simpleexample.core :as example]
            [figwheel.client :as fw]
            [devtools.core :as devtools]))

(devtools/install!)

(fw/start {:on-jsload example/run
           :websocket-url "ws://localhost:3449/figwheel-ws"})
