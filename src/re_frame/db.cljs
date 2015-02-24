(ns re-frame.db
  (:require [reagent.core :as reagent]))


;; -- Application State  --------------------------------------------------------------------------
;;
;; Should not be accessed directly by application code
;; Access is mediated via handlers and subscriptions
(def  app-db (reagent/atom {}))

