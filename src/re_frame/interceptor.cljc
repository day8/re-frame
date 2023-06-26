(ns re-frame.interceptor
  (:require
    [re-frame.loggers :refer [console]]
    [re-frame.interop :refer [empty-queue debug-enabled?]]
    [re-frame.trace :as trace :include-macros true]
    [clojure.set :as set]))


(def mandatory-interceptor-keys #{:id :after :before})

(def optional-interceptor-keys #{:comment})

(defn interceptor?
  [m]
  (and (map? m)
       (= mandatory-interceptor-keys
          (-> m keys set (set/difference optional-interceptor-keys)))))

(defn ->interceptor
  [& {:as m :keys [id before after]}]
  (when debug-enabled?
    (if-let [unknown-keys (seq (set/difference
                                (-> m keys set)
                                mandatory-interceptor-keys
                                optional-interceptor-keys))]
      (console :error "re-frame: ->interceptor" m "has unknown keys:" unknown-keys)))
  (cond-> {:id     (or id :unnamed)
           :before before
           :after  after}
    comment (assoc :comment comment)))

;; -- Effect Helpers  -----------------------------------------------------------------------------

(defn get-effect
  ([context]
   (:effects context))
  ([context key]
   (get-in context [:effects key]))
  ([context key not-found]
   (get-in context [:effects key] not-found)))

(defn assoc-effect
  [context key value]
  (assoc-in context [:effects key] value))

(defn update-effect
  [context key f & args]
  (apply update-in context [:effects key] f args))

;; -- CoEffect Helpers  ---------------------------------------------------------------------------

(defn get-coeffect
  ([context]
   (:coeffects context))
  ([context key]
   (get-in context [:coeffects key]))
  ([context key not-found]
   (get-in context [:coeffects key] not-found)))

(defn assoc-coeffect
  [context key value]
  (assoc-in context [:coeffects key] value))

(defn update-coeffect
  [context key f & args]
  (apply update-in context [:coeffects key] f args))

;; -- Execute Interceptor Chain  ------------------------------------------------------------------


(defn- invoke-interceptor-fn
  [context interceptor direction]
  (if-let [f (get interceptor direction)]
    (f context)
    context))


(defn- invoke-interceptors
  "Loop over all interceptors, calling `direction` function on each,
  threading the value of `context` through every call.

  `direction` is one of `:before` or `:after`.

  Each iteration, the next interceptor to process is obtained from
  context's `:queue`. After they are processed, interceptors are popped
  from `:queue` and added to `:stack`.

  After sufficient iteration, `:queue` will be empty, and `:stack` will
  contain all interceptors processed.

  Returns updated `context`. Ie. the `context` which has been threaded
  through all interceptor functions.

  Generally speaking, an interceptor's `:before` function will (if present)
  add to a `context's` `:coeffects`, while its `:after` function
  will modify the `context`'s `:effects`.  Very approximately.

  But because all interceptor functions are given `context`, and can
  return a modified version of it, the way is clear for an interceptor
  to introspect the stack or queue, or even modify the queue
  (add new interceptors via `enqueue`?). This is a very fluid arrangement."
  ([context direction]
   (loop [context context]
     (let [queue (:queue context)]        ;; future interceptors
       (if (empty? queue)
         context
         (let [interceptor (peek queue)   ;; next interceptor to call
               stack (:stack context)]    ;; already completed interceptors
           (recur (-> context
                      (assoc :queue (pop queue)
                             :stack (conj stack interceptor))
                      (invoke-interceptor-fn interceptor direction)))))))))


(defn enqueue
  [context interceptors]
  (update context :queue
          (fnil into empty-queue)
          interceptors))


(defn- context
  "Create a fresh context"
  ([event interceptors]
   (-> {}
      (assoc-coeffect :event event)
      ;; Some interceptors, like `trim-v` and `unwrap`, alter event so capture
      ;; the original for use cases such as tracing.
      (assoc-coeffect :original-event event)
      (enqueue interceptors)))
  ([event interceptors db]      ;; only used in tests, probably a hack, remove ?  XXX
   (-> (context event interceptors)
       (assoc-coeffect :db db))))


(defn- change-direction
  "Called on completion of `:before` processing, this function prepares/modifies
   `context` for the backwards sweep of processing in which an interceptor
   chain's `:after` fns are called.

  At this point in processing, the `:queue` is empty and `:stack` holds all
  the previously run interceptors. So this function enables the backwards walk
  by priming `:queue` with what's currently in `:stack`"
  [context]
  (-> context
      (dissoc :queue)
      (enqueue (:stack context))))


(defn execute
  "Executes the given chain (coll) of interceptors.

   Each interceptor has this form:
       {:before  (fn [context] ...)     ;; returns possibly modified context
        :after   (fn [context] ...)}    ;; `identity` would be a noop

   Walks the queue of interceptors from beginning to end, calling the
   `:before` fn on each, then reverse direction and walk backwards,
   calling the `:after` fn on each.

   The last interceptor in the chain presumably wraps an event
   handler fn. So the overall goal of the process is to \"handle
   the given event\".

   Thread a `context` through all calls. `context` has this form:

     {:coeffects {:event [:a-query-id :some-param]
                  :db    <original contents of app-db>}
      :effects   {:db    <new value for app-db>
                  :fx  [:dispatch [:an-event-id :param1]]}
      :queue     <a collection of further interceptors>
      :stack     <a collection of interceptors already walked>}

   `context` has `:coeffects` and `:effects` which, if this was a web
   server, would be somewhat analogous to `request` and `response`
   respectively.

   `coeffects` will contain data like `event` and the initial
   state of `db` -  the inputs required by the event handler
   (sitting presumably on the end of the chain), while handler-returned
   side effects are put into `:effects` including, but not limited to,
   new values for `db`.

   The first few interceptors in a chain will likely have `:before`
   functions which \"prime\" the `context` by adding the event, and
   the current state of app-db into `:coeffects`. But interceptors can
   add whatever they want to `:coeffects` - perhaps the event handler needs
   some information from localstore, or a random number, or access to
   a DataScript connection.

   Equally, some interceptors in the chain will have `:after` fn
   which can process the side effects accumulated into `:effects`
   including but, not limited to, updates to app-db.

   Through both stages (before and after), `context` contains a `:queue`
   of interceptors yet to be processed, and a `:stack` of interceptors
   already done.  In advanced cases, these values can be modified by the
   functions through which the context is threaded."
  [event-v interceptors]
  (trace/merge-trace!
    {:tags {:interceptors interceptors}})
  (-> (context event-v interceptors)
      (invoke-interceptors :before)
      change-direction
      (invoke-interceptors :after)))
