(ns re-frame.subs
 (:require
   [reagent.ratom  :refer [make-reaction]]
   [re-frame.db    :refer [app-db]]
   [re-frame.utils :refer [first-in-vector warn group log groupEnd]]))


;; maps from handler-id to handler-fn
(def ^:private key->fn (atom {}))


(defn register
  "register a hander function for an id"
  [key-v handler-fn]
  (if (contains? @key->fn key-v)
    (warn "re-frame: overwriting subscription-handler for: " key-v))   ;; allow it, but warn.
  (swap! key->fn assoc key-v handler-fn))


(defn subscribe
  "returns a reagent/reaction which observes a part of app-db"
  [v]
  (let [key-v       (first-in-vector v)
        handler-fn  (get @key->fn key-v)]
    (if (nil? handler-fn)
      (warn "re-frame: no subscription handler registered for: \"" key-v "\".  Returning a nil subscription.")
      (handler-fn app-db v))))


;; -- NEW VERSIONS OF SUBSCRIBE ---------------------
;; How do I test pure functions?  Turn off reactions
;; How do I send debug
;; Create constants ?    re-frame.atoms-not-reactions
;; Can I use the "run straight away flag on the make-reaction.
;;
;; Need to remove all use of @ within the
;; assert app-db is a IAtom ... in testing they might get it wrong
;;

;; helper
(defn fetch
  [& args]
  (fn [db _]
    (get-in db (flatten args))))    ;;  XXX args  perhaps join into a vector concat ?


(defn- debug-wrapper
  "I wrap a subscription handler, so that each rime it runs, it proceses console log.
  This console logging disppears for production code."
  [handler-fn]
  (if-not goog.DEBUG
    handler-fn
    (fn [app-db v]
      (group "re-frame: running subscription handler for: " v)
      (let [val (handler-fn app-db v)]
        (log "=>" val)
        (groupEnd)
        val))))


(defn register-1
  "usage:
    (register-1
        :todos
        (fetch [:todos]))
  "
  [key-v handler-fn]
  (let [handler-fn (debug-wrapper handler-fn)
        handler-fn (fn [app-db v]
                     (make-reaction #(handler-fn app-db v)))]
    (register key-v handler-fn)
    handler-fn))



(defn register-2
  "usage:
     (register-2
        :some-id
        [f g]                            ;; both f and g are functions (app-db v) -> val
        (fn [f-result g-result v]        ;; <--- instead of   [app-db v]
           use f-result and g-result ))  ;; autowrapped in a reaction

  "
  [key-v inputs-v handler-fn]     ;; XXX allow  an arity with no input-v ???  but naming then harder.
  (let [vec-or-kw?      #(or (vector? %1) (keyword? %1))
        wrap-in-a-from  #(if (vec-or-kw? %1) (from %1) %1)
        input-fns       (map wrap-in-a-from inputs-v)        ;; look for paths and convert them.

        build-sig-graph-fn
        (fn [app-db v]
          (let [wrap-in-reaction   (fn [f] (make-reaction #(f app-db v)))
                reaction-inputs    (map wrap-in-reaction input-fns)   ;; each input is now a reaction
                rective-handler-fn (fn [] (let [input-vals (map deref reaction-inputs)]    ;; deref input signals !!
                                            (apply handler-fn (conj input-vals v))))]
            (make-reaction rective-handler-fn)))]    ;; deref all the inputs, but only if NOT TESTING wrap in a
    (register key-v build-sig-graph-fn)
    build-sig-graph-fn))
