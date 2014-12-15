(ns re-frame.db
  (:require [reagent.core :as r]))

;; Tthe application state
;; Should not be accessed directly by application code (neither handlers or subscriptions)
(def  app-db (r/atom {}))


