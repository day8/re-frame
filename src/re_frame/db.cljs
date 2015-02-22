(ns re-frame.db
  (:require [reagent.core :as r]))

;; The application state
;; Should never be accessed directly by application code
;; Access is mediated via handlers and subscriptions
(def  app-db (r/atom {}))


