(ns re-frame.handlers
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core        :refer [flush]]
            [re-frame.db         :refer [app-db]]
           ; [re-frame.middleware :refer [noop]]
            [re-frame.utils      :refer [first-in-vector warn]]
            [cljs.core.async     :refer [chan put! <! timeout]]))


;; -- composing middleware  -----------------------------------------------------------------------

(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose them.
  v can have nested vectors, and will be flattended before \"comp\" is applied.
  For convienience, if v turns out to already be a function (assumed to be
  middleware), just return it.
  Filtering out nils allows us to create Middlewhere conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [v]
  (cond
    (fn? v)       v  ;; assumed to be existing middleware
    (vector? v)   (let [v (remove nil? (flatten v))]
                    (cond
                      (empty? v)       (fn [h] h)   ;; noop middleware
                      (= 1 (count v))  (first v)    ;; only one middleware, no composing needed
                      :else            (apply comp v)))
    :else         (assert  (vector? v)
                           (str "re-frame:  compose expects a vector, got: " v))))


;; -- the register of event handlers --------------------------------------------------------------

(def ^:private id->fn  (atom {}))

(defn lookup-handler
  [event-id]
  (get @id->fn event-id))

(defn register
  "register a handler for an event"
  ([event-id handler-fn]
    (when (contains? @id->fn event-id)
      (warn "re-frame: overwriting an event-handler for: " event-id))   ;; allow it, but warn.
    (swap! id->fn assoc event-id handler-fn))

  ([event-id middleware handler-fn]
    (let  [mid-ware  (comp-middleware middleware)
           hander-fn (mid-ware handler-fn)]
      (register event-id hander-fn))))


;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Allows for the aysnc handling of events.
;;
(def ^:private event-chan (chan))    ;; TODO: set buffer size?


;; -- lookup and call -----------------------------------------------------------------------------

(defn handle
  "Given an event vector, look up the right handler, then call it.
  By default, handlers are not assumed to be pure. They are called with
  two paramters:
  - the `app-db` atom and
  - the event vector
  The handler is assumed to side-effect on the atom, the return value is ignored.
  To write pure handlers, use the \"pure\" middleware when registering the handler."
  [event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (lookup-handler event-id)]
    (if (nil? handler-fn)
      (warn "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")   ;; TODO: make exception
      (handler-fn app-db event-v))))


;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpretual loop, read events from the dispatch channel, and route them
;; to the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In odd cases, we need to pause for an entire annimationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;
;; router loop
(go-loop []
         (let [event-v  (<! event-chan)                   ;; wait for an event
               _        (if (:flush-dom (meta event-v))   ;; check the event for metadata
                          (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
                          (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
           (handle event-v)
           (recur)))


;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch
  "Send an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])
  "
  [event-v]
  (if (nil? event-v)
    (warn "re-frame: \"dispatch\" is ignoring a nil event.")     ;; nil would close the channel
    (put! event-chan event-v))
  nil)   ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Returning-False


;; TODO: remove sync handling.  I don't like it much, even for testing.
(defn dispatch-sync
  "Invoke the event handler sycronously, avoiding the async-inducing use of core.async/chan"
  [event-v]
  (handle event-v))


