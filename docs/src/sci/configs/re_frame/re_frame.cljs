(ns sci.configs.re-frame.re-frame
  (:require
   [re-frame.core]
   [re-frame.db]
   [re-frame.alpha]
   [sci.core :as sci]))

(def rfns (sci/create-ns 're-frame.core nil))
(def rfdbns (sci/create-ns 're-frame.db nil))
(def rfa (sci/create-ns 're-frame.alpha nil))

(def re-frame-namespace
  (sci/copy-ns re-frame.core rfns))

(def re-frame-db-namespace
  (sci/copy-ns re-frame.db rfdbns))

(def re-frame-alpha-namespace
  (sci/copy-ns re-frame.alpha rfns))

(def namespaces
  {'re-frame.core re-frame-namespace
   're-frame.db re-frame-db-namespace
   're-frame.alpha re-frame-alpha-namespace})

(def config
  {:namespaces namespaces})
