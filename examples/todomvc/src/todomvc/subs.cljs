(ns todomvc.subs
  (:require [re-frame.core :refer [reg-sub subscribe]]))

;; -------------------------------------------------------------------------------------
;; Layer 2  (see the Subscriptions Infographic for meaning)
;;
(reg-sub
  :showing
  (fn [db _]        ;; db is the (map) value in app-db
    (:showing db))) ;; I repeat:  db is a value. Not a ratom.  And this fn does not return a reaction, just a value.

;; that `fn` is a pure function

;; Next, the registration of a similar handler is done in two steps.
;; First, we `defn` a pure handler function.  Then, we use `reg-sub` to register it.
;; Two steps. This is different to that first registration, above, which was done in one step.
(defn sorted-todos
  [db _]
  (:todos db))
(reg-sub :sorted-todos sorted-todos)

;; -------------------------------------------------------------------------------------
;; Layer 3  (see the infographic for meaning)
;;
;; A subscription handler is a function which is re-run when its input signals
;; change. Each time it is rerun, it produces a new output (return value).
;;
;; In the simple case, app-db is the only input signal, as was the case in the two
;; simple subscriptions above. But many subscriptions are not directly dependent on
;; app-db, and instead, depend on a value derived from app-db.
;;
;; Such handlers represent "intermediate nodes" in a signal graph.  New values emanate
;; from app-db, and flow out through a signal graph, into and out of these intermediate
;; nodes, before a leaf subscription delivers data into views which render data as hiccup.
;;
;; When writing and registering the handler for an intermediate node, you must nominate
;; one or more input signals (typically one or two).
;;
;; reg-sub allows you to supply:
;;
;;   1. a function which returns the input signals. It can return either a single signal or
;;      a vector of signals, or a map of where the values are the signals.
;;
;;   2. a function which does the computation. It takes input values and produces a new
;;      derived value.
;;
;; In the two simple examples at the top, we only supplied the 2nd of these functions.
;; But now we are dealing with intermediate nodes, we'll need to provide both fns.
;;
(reg-sub
  :todos

  ;; This function returns the input signals.
  ;; In this case, it returns a single signal.
  ;; Although not required in this example, it is called with two paramters
  ;; being the two values supplied in the originating `(subscribe X Y)`.
  ;; X will be the query vector and Y is an advanced feature and out of scope
  ;; for this explanation.
  (fn [query-v _]
    (subscribe [:sorted-todos]))    ;; returns a single input signal

  ;; This 2nd fn does the computation. Data values in, derived data out.
  ;; It is the same as the two simple subscription handlers up at the top.
  ;; Except they took the value in app-db as their first argument and, instead,
  ;; this function takes the value delivered by another input signal, supplied by the
  ;; function above: (subscribe [:sorted-todos])
  ;;
  ;; Subscription handlers can take 3 parameters:
  ;;  - the input signals (a single item, a vector or a map)
  ;;  - the query vector supplied to query-v  (the query vector argument
  ;; to the "subscribe") and the 3rd one is for advanced cases, out of scope for this discussion.
  (fn [sorted-todos query-v _]
    (vals sorted-todos)))

;; So here we define the handler for another intermediate node.
;; This time the computation involves two input signals.
;; As a result note:
;;   - the first function (which returns the signals, returns a 2-vector)
;;   - the second function (which is the computation, destructures this 2-vector as its first parameter)
(reg-sub
  :visible-todos

  ;; signal function
  ;; returns a vector of two input signals
  (fn [query-v _]
    [(subscribe [:todos])
     (subscribe [:showing])])

  ;; computation function
  (fn [[todos showing] _]   ;; that 1st parameter is a 2-vector of values
    (let [filter-fn (case showing
                      :active (complement :done)
                      :done   :done
                      :all    identity)]
      (filter filter-fn todos))))

;; -------------------------------------------------------------------------------------
;; Hey, wait on!!
;;
;; How did those two simple registrations at the top work?
;; We only supplied one function in those registrations, not two?
;; Very observant of you, I'm glad you asked.
;; When the signal-returning-fn is omitted, re-sub provides a default,
;; and it looks like this:
;;    (fn [_ _] re-frame.db/app-db)
;; It returns one signal, and that signal is app-db itself.
;;
;; So the two simple registrations at the top didn't need to provide a signal-fn,
;; because they operated only on the value in app-db, supplied as 'db' in the 1st arguement.

;; -------------------------------------------------------------------------------------
;; SUGAR ?
;; Now for some syntactic sugar...
;; The purpose of the sugar is to remove boilerplate noise. To distill to the essential
;; in 90% of cases.
;; Because it is so common to nominate 1 or more input signals,
;; reg-sub provides some macro sugar so you can nominate a very minimal
;; vector of input signals. The 1st function is not needed.
;; Here is the example above rewritten using the sugar.
#_(reg-sub
  :visible-todos
  :<- [:todos]
  :<- [:showing]
  (fn [[todos showing] _]
    (let [filter-fn (case showing
                      :active (complement :done)
                      :done   :done
                      :all    identity)]
      (filter filter-fn todos))))


(reg-sub
  :all-complete?
  :<- [:todos]
  (fn [todos _]
    (seq todos)))

(reg-sub
  :completed-count
  :<- [:todos]
  (fn [todos _]
    (count (filter :done todos))))

(reg-sub
  :footer-counts
  :<- [:todos]
  :<- [:completed-count]
  (fn [[todos completed] _]
    [(- (count todos) completed) completed]))
