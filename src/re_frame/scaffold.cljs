(ns re-frame.scaffold
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [cljs.core.async :refer [chan put! <! timeout]]
            [reagent.core :as reagent]
            [re-frame.frame :as frame]
            [re-frame.legacy :as legacy]
            [re-frame.middleware :as middleware]
            [re-frame.logging :refer [log warn error]]
            [re-frame.utils :as utils]))

; scaffold's responsibility is to implement re-frame 0.4.1 functionality on top reusable re-frame parts
;
; there is one default app-db and one default app-frame:
; * app-db is backed by reagent/atom
; * app-frame has default loggers
; * router event queue is implemented using core.async channel

; the default instance of app-db implemented as ratom
(def app-db (reagent/atom nil))

; the default instance of re-frame
(def app-frame (atom (frame/make-frame)))

; methods bellow operate on app-db and provide backward-compatible interface as was present in re-frame 0.4.1

(defn set-loggers! [new-loggers]
  (swap! app-frame #(frame/set-loggers % new-loggers)))

(defn register-sub [subscription-id handler-fn]
  (swap! app-frame #(frame/register-subscription-handler % subscription-id handler-fn)))

(defn unregister-sub [subscription-id]
  (swap! app-frame #(frame/unregister-subscription-handler % subscription-id)))

(defn clear-sub-handlers! []
  (swap! app-frame #(frame/clear-subscription-handlers %)))

(defn legacy-subscribe [frame app-db-atom subscription-spec]
  (let [subscription-id (utils/get-subscription-id subscription-spec)
        handler-fn (get-in frame [:subscriptions subscription-id])]
    (if (nil? handler-fn)
      (do
        (error frame "re-frame: no subscription handler registered for: \"" subscription-id "\".  Returning a nil subscription.")
        nil)
      (handler-fn app-db-atom subscription-spec))))

(defn subscribe [subscription-spec]
  (legacy-subscribe @app-frame app-db subscription-spec))

(defn clear-event-handlers! []
  (swap! app-frame #(frame/clear-event-handlers %)))

(def pure (legacy/pure app-frame))
(def debug (middleware/debug app-frame))
;(def undoable (middleware/undoable app-frame))
(def path (middleware/path app-frame))
(def enrich (middleware/enrich app-frame))
(def trim-v (middleware/trim-v app-frame))
(def after (middleware/after app-frame))
(def log-ex (middleware/log-ex app-frame))
(def on-changes (middleware/on-changes app-frame))

;; -- composing middleware  -----------------------------------------------------------------------

(defn report-middleware-factories
  "See https://github.com/Day8/re-frame/issues/65"
  [frame v]
  (letfn [(name-of-factory
            [f]
            (-> f meta :re-frame-factory-name))
          (factory-names-in
            [v]
            (remove nil? (map name-of-factory v)))]
    (doseq [name (factory-names-in v)]
      (error frame "re-frame: \"" name "\" used incorrectly. Must be used like this \"(" name " ...)\", whereas you just used \"" name "\"."))))

(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose the elements.
  v can have nested vectors, and will be flattened before \"comp\" is applied.
  For convienience, if v is a function (assumed to be middleware already), just return it.
  Filtering out nils allows us to create Middleware conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [frame what]
  (let [spec (if (seqable? what) (seq what) what)]
    (cond
      (fn? spec) spec                                       ;; assumed to be existing middleware
      (seq? spec) (let [middlewares (remove nil? (flatten spec))]
                    (report-middleware-factories frame middlewares)
                    (apply comp middlewares))
      :else (do
              (warn frame "re-frame: comp-middleware expects a vector, got: " what)
              nil))))

(defn register-base
  "register a handler for an event.
  This is low level and it is expected that \"re-frame.core/register-handler\" would
  generally be used."
  ([event-id handler-fn]
   (swap! app-frame #(frame/register-event-handler % event-id handler-fn)))

  ([event-id middleware handler-fn]
   (if-let [mid-ware (comp-middleware @app-frame middleware)] ;; compose the middleware
     (register-base event-id (mid-ware handler-fn)))))      ;; wrap the handler in the middleware

(defn register-handler
  ([event-id handler]
   (register-base event-id handler))
  ([event-id middleware handler]
   (if middleware
     (register-base event-id middleware handler)
     (register-base event-id handler))))

(defn unregister-handler [event-id]
  (swap! app-frame #(frame/unregister-event-handler % event-id)))

;; -- The Event Conveyor Belt  --------------------------------------------------------------------
;;
;; Moves events from "dispatch" to the router loop.
;; Using core.async means we can have the aysnc handling of events.
;;
(def ^:private event-chan (chan))                           ;; TODO: set buffer size?

(defn purge-chan
  "read all pending events from the channel and drop them on the floor"
  []
  #_(loop []                                                ;; TODO commented out until poll! is a part of the core.asyc API
      (when (go (poll! event-chan))                         ;; progress: https://github.com/clojure/core.async/commit/d8047c0b0ec13788c1092f579f03733ee635c493
        (recur))))

;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpetual loop, read events from "event-chan", and call the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In some cases, we need to pause for an entire animationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;

; this is just a sample implementation, for reducing single event we use single-step transduce-event-by-resetting-atom
(defn transduce-events-by-resetting-atom [frame-atom db-atom events]
  (let [reducing-fn (fn
                      ([db-atom] db-atom)                   ; completion
                      ([db-atom new-state]                  ; apply new-state to atom
                       (let [old-state @db-atom]
                         (if-not (identical? old-state new-state)
                           (reset! db-atom new-state)))
                       db-atom))]
    (let [xform (frame/get-frame-transducer @frame-atom)]
      (transduce xform reducing-fn db-atom events))))

(defn transduce-event-by-resetting-atom [frame-atom db-atom event]
  (let [reducing-fn (fn [db-atom new-state]                 ; apply new-state to atom
                      (let [old-state @db-atom]
                        (if-not (identical? old-state new-state)
                          (reset! db-atom new-state)))
                      db-atom)]
    (let [xform (frame/get-frame-transducer @frame-atom)]
      ((xform reducing-fn) db-atom event))))

(defn router-loop* [db-atom frame-atom]
  (go-loop []
    (let [event (<! event-chan)                             ;; wait for an event
          _ (if (:flush-dom (meta event))                   ;; check the event for metadata
              (do (reagent/flush) (<! (timeout 20)))        ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
              (<! (timeout 0)))]                            ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
      (try
        (transduce-event-by-resetting-atom frame-atom db-atom event)

        ;; If the handler throws:
        ;;   - allow the exception to bubble up because the app, in production,
        ;;     may have hooked window.onerror and perform special processing.
        ;;   - But an exception which bubbles up will break the enclosing go-loop.
        ;;     So we'll need to start another one.
        ;;   - purge any pending events, because they are probably related to the
        ;;     event which just fell in a screaming heap. Not sane to handle further
        ;;     events if the prior event failed.
        (catch js/Object e
          (do
            ;; try to recover from this (probably uncaught) error as best we can
            (purge-chan)                                    ;; get rid of any pending events
            (router-loop* db-atom frame-atom)               ;; Exception throw will cause termination of go-loop. So, start another.

            (throw e)))))                                   ;; re-throw so the rest of the app's infrastructure (window.onerror?) gets told
    (recur)))

(def router-loop (partial router-loop* app-db app-frame))

;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch*
  "Send an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])
  "
  [frame-atom event-v]
  (if (nil? event-v)
    (error @frame-atom "re-frame: \"dispatch\" is ignoring a nil event.") ;; nil would close the channel
    (put! event-chan event-v))
  nil)                                                      ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False

(def dispatch (partial dispatch* app-frame))

(defn dispatch-sync*
  "Send an event to be processed by the registered handler, but avoid the async-inducing
  use of core.async/chan.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [db-atom frame-atom event]
  (transduce-event-by-resetting-atom frame-atom db-atom event)
  nil)                                                      ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False

(def dispatch-sync (partial dispatch-sync* app-db app-frame))
