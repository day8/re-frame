(ns re-frame.interop
  (:require [goog.async.nextTick]
            [reagent.core]
            [reagent.ratom]))

(def next-tick goog.async.nextTick)

(def empty-queue #queue [])

(def after-render reagent.core/after-render)

;; Make sure the Google Closure compiler sees this as a boolean constatnt,
;; otherwise Dead Code Elimination won't happen in `:advanced` builds.
;; Type hints have been liberally sprinkled.
;; https://developers.google.com/closure/compiler/docs/js-for-compiler
(def ^boolean debug-enabled? "@define {boolean}" ^boolean js/goog.DEBUG)

(defn ratom [x]
  (reagent.core/atom x))

(defn ratom? [x]
  (satisfies? reagent.ratom/IReactiveAtom x))

(defn deref? [x]
  (satisfies? IDeref x))


(defn make-reaction [f]
  (reagent.ratom/make-reaction f))

(defn add-on-dispose! [a-ratom f]
  (reagent.ratom/add-on-dispose! a-ratom f))

(defn dispose! [a-ratom]
	(reagent.ratom/dispose! a-ratom))

(defn set-timeout! [f ms]
  (js/setTimeout f ms))
