(ns re-frame.trace
  "Tracing for re-frame.
  Alpha quality, subject to change/break at any time."
  (:require [re-frame.interop :as interop]
            [re-frame.loggers :refer [console]]
            [clojure.string :as str]))



(def id (atom 0))
(def ^:dynamic *current-trace* nil)

(def trace-cbs (atom {}))

(defn register-trace-cb
  "Registers a tracing callback function which will receive a collection of one or more traces.
  Will replace an existing callback function if it shares the same key."
  [key f]
  (swap! trace-cbs assoc key f))

(defn remove-trace-cb [key]
  (swap! trace-cbs dissoc key)
  nil)

(defn next-id [] (swap! id inc))

(defn start-trace [{:keys [operation op-type tags child-of]}]
  {:id        (next-id)
   :operation operation
   :op-type   op-type
   :tags      tags
   :child-of  (or child-of (:id *current-trace*))
   :start     (interop/now)})

(defn finish-trace [trace]
  (let [end        (interop/now)
        duration   (- end (:start trace))]
    (doseq [[k cb] @trace-cbs]
      (try (cb [(assoc trace
                  :duration duration
                  :end (interop/now))])
           (catch #?(:cljs :default :clj Exception) e
             (console :error "Error thrown from trace cb" k "while storing" trace e))))))

#?(:clj (defmacro with-trace
          "Create a trace inside the scope of the with-trace macro

          Common keys:
          :op-type - what kind of operation is this? e.g. :sub/create, :render.
          :operation - identifier for the operation, for an subscription it would be the subscription keyword
          tags - a map of arbitrary kv pairs"
          ;; TODO: compile it out under normal circumstances
          [{:keys [operation op-type tags child-of] :as trace-opts} & body]
          `(binding [*current-trace* (start-trace ~trace-opts)]
             (try ~@body
                  (finally (finish-trace *current-trace*))))))

(defn merge-trace! [m]
  ;; Overwrite keys in tags, and all top level keys.
  (let [new-trace (-> (update *current-trace* :tags merge (:tags m))
                      (merge (dissoc m :tags)))]
    (set! *current-trace* new-trace))
  nil)

(defn reset-tracing! []
  (reset! id 0))
