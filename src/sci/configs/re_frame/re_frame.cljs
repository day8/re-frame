(ns sci.configs.re-frame.re-frame
  (:require
   [re-frame.core]
   [re-frame.db]
   [sci.core :as sci]))

(def rfns (sci/create-ns 're-frame.core nil))
(def rfdbns (sci/create-ns 're-frame.db nil))

(def re-frame-namespace
  (sci/copy-ns re-frame.core rfns))

(def re-frame-db-namespace
  (sci/copy-ns re-frame.db rfdbns))

(def namespaces
  {'re-frame.core re-frame-namespace
   're-frame.db re-frame-db-namespace})

(def config
  {:namespaces namespaces})
