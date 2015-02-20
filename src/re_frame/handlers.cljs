(ns re-frame.handlers
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core :refer [flush]]
            [re-frame.db :refer [app-db]]
            [re-frame.utils :refer [first-in-vector]]
            [cljs.core.async :refer [chan put! <! timeout]]))


;; -- special handlers ----------------------------------------------------------------------------

;; if true then pause the dispatch loop, generally to give the GUI a chance to sync
(def wait-one-annimation-frame (atom false))

(defn flush-reagent-handler
  "Will force reagent to render any pending changes.
  Useful when a handler is about to hog the CPU for a while and
  there are pending GUI changes telling the user about progress.
  Flushes any GUI changes through into the DOM."
  [_ _]
  (flush)
  (reset! wait-one-annimation-frame true))

(def special-handlers {
     :flush-reagent flush-reagent-handler})


;; -- register of handlers ------------------------------------------------------------------------


(def ^:private id->fn  (atom special-handlers))


(defn register
  "register a handler for an event"
  [event-id handler-fn]
  (if (contains? @id->fn event-id)
    (println "Warning: overwritting an event-handler" event-id))     ;; TODO: more generic logging
  (swap! id->fn
         assoc event-id handler-fn))


;; -- dispatching and routing ---------------------------------------------------------------------

(def ^:private dispatch-chan  (chan))

(defn dispatch
  "components send events by calling this function.
  Usage example:
     (dispatch [:delete-item 42])"
  [event-v]
  (assert (some? event-v))         ;; nil would close the channel
  (put! dispatch-chan event-v))

(defn dispatch-sync
  "sync version of above that actually does the dispatch"
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (get @id->fn event-id)]
    (assert (some? handler-fn) (str "No event handler registered for event: " event-id ))
    (handler-fn app-db event-v)))


(defn- router
  "route an event, arriving on the dispatch channel, to the right handler"
  []
  (go-loop []
      (let [         ;; if a small pause is required   (dispatch [:flush-reagent])
            _        (if @wait-one-annimation-frame
                       (do
                         (reset! wait-one-annimation-frame false)
                         (<! (timeout 16)))  ;; Wait one annimation frame, which will make sure any pending GUI work is done.
                       (<! (timeout 0)))   ;; just in case we are handling one dispatch after an other, give the GUI a chance to do its stuff.
            event-v  (<! dispatch-chan)]
        (dispatch-sync event-v)
        (recur))))

;; run the router loop - sending event after event to the handlers
(router)


;; -- helper --------------------------------------------------------------------------------------

;; TODO: this has to go.
(defn transaction!
  "A helper fucntion to be used when writting event handlers.
  Allows a handler to perform an atomic modification of the atom.
  Modification consist of one or more mutations, wrapped by a function,
  followed by a call to a validation fucntion which may also annotate the
  data structures with further information.

  XXX This feels a bit too nested."

  ([db description mutation-fn]
    (transaction! db description mutation-fn identity))

  ([db description mutation-fn validation-fn]
    (reset! db
            (-> @db
                (assoc :undo-description description)
                mutation-fn
                validation-fn))))

