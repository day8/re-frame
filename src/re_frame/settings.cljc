(ns re-frame.settings
  (:require [re-frame.interop :as interop]))

(def initial-values
  {:loaded? false})

(def state
  (atom initial-values))

(interop/on-load
  #(swap! state (fn [m] (assoc m :loaded? true))))
