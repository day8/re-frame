 (ns model.handlers)


 ;; -- helpers ------------------------------------------------------------------------------------

(defn- first-in-vector
 [v]
 (assert (vector? v) (str "Expected a vector event, but got: " v))
 (first v))


(defn transaction!
 "A helper fucntion for use in event handlers.
  Allows a handler to perform an atomic mutation of the atom.
  Mutations normally consist of one or more mutations, wrapped by a fucntion,
  followed by a call to a validation fucntion."
 ([db description mutation-fn]
   (transaction! db description mutation-fn identity))

 ([db description mutation-fn validation-fn]
   (reset! db
           (-> @db
               (assoc :undo-description description)
               mutation-fn
               validation-fn))))


;; -- application data ---------------------------------------------------------------------------
;;
;; The entire state of the application is stored in this one atom.
;; It is useful to think of this atom as a database, hence its name.
;; For example, when it is mutated, we want it done in "a transaction", so it never appears in
;; an inconsistent state. Atomic operations, etc.
;;
(def ^:private db                (atom nil))


;; -- Event Handlers ------------------------------------------------------------------------------
;;
;; In response to user actions, Reagent views produce events (eg: "delete button clicked")
;;
;; The on-click for a button on a item, might look like this:
;;      :onclick   #(dispatch [:delete-item item-id])
;;
;; 'dispatch' is defined below and it is called for ALL events. Every single one.
;; dispatch takes one parameter: a vector.  The first element of the vector identifies the event
;; and the other elements are event "paramters".
;;
;; Every event has an associated handler (function).
;;
;; Collectively, these handlers provide the 'control layer' in the architecture.
;;
;; They are the only part of the application allowed to mutate the db.  At their simplest, they
;; perform trivial CRUD actions.  More complicated ones impose some control over the mutations, much
;; like "stored proceedures" might enforce business rules in a traditional database. But handlers
;; might also need to talk to a server, requesting additional data (which might async be placed back in
;; 'db' etc).
;;
;; Handler functions must have this signature:
;;     (db event-vector) -> db
;;
;; When they are called, they are given the db to mutate as the first parameter, and the full
;; event vector is the 2nd parameter.
;;
;; Note: The 1st item in an event-vector is the key which identifies the event. Subsequent
;; items in the vector are effectively "parameters" for the event.
;;
;; Example of event-vector:    [:delete-pod   "a parameter" "another"]
;; Another:                    [[:multi :part "event" :key] "a parameter" "another"]
;;
;; Event handlers are registered.
;;
;; The following maps from event-ids to handler fucntions.  See also 'register-handler'.
 (def ^:private event-id->handler-fn         (atom {}))


 ;; register a handler for a paraticular event
 (defn register-handler
   [event-id handler-fn]
   (if (contains? @event-id->handler-fn event-id)
     (println "Warning: overwritting an event-handler" event-id))     ;; TODO: more generic logging
   (swap! event-id->handler-fn
          assoc event-id handler-fn))


;; reagent components call this function when they want to "send" an event.
(defn dispatch                     ;; TODO: call it  (dispatch-event [])
 [event-v]                         ;;  something like  [:delete-item  42]
 (let [event-id    (first-in-vector event-v)
       handler-fn  (get @event-id->handler-fn event-id)]
   (assert (not (nil? handler-fn)) (str "No event handler registered for event: " event-id ))
   (handler-fn @db event-v)))



;; -- Subscriptions  ---------------------------------------------------------------------------
;;
;; Reagent components call 'subscribe' when they wish to observe some of the data in the db.
;;
;; 'subscribe' returns a reagent/atom which is updated whenever (any of) the db changes. So
;; subscribe effectively delivers a stream of updates in something of an FRP sense.
;; (the updates Sometimes
;; the update
;;
;; Typically, components are only interested in part of the overall db.  So, when
;; calling 'subscribe', you give a 'subsciption-key' which identifies the part tht you want.
;;
;; You register handlers for keys via 'register-subscription'
;;
;; Subscription Handler functions must have this signature:
;;     (db key-vector) -> reagent/atom
;;
;; XXX Note here about 'reaction'  and the need for dispose.
;;
;; Example of subscription-key: [:items  :from 20  :to 30]
;; Another:                     [[:multi :part :key] "a parameter" "another"]
;;
;; The following map from subscription-ids to handler fucntions.
(def ^:private subscription-key->handler-fn (atom {}))


 (defn register-subscription
   [key-v handler-fn]
   (if (contains? @subscription-key->handler-fn key-v)
     (println "Warning: overwritting a subscription-handler: " key-v))     ;; TODO: more generic logging
   (swap! subscription-key->handler-fn assoc key-v handler-fn))


 (defn subscribe
   "returns a reagent/reaction which observes a part of the "
   [v]
   (let [key-v       (first-in-vector v)
         handler-fn  (get @subscription-key->handler-fn key-v)]
     (assert (not (nil? handler-fn)) (str "No subscription handler registered for key: " key-v))
     (handler-fn @db v)))


