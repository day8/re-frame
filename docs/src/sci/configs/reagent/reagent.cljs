(ns sci.configs.reagent.reagent
  (:require
   [reagent.core :as r]
   [reagent.debug :as d :refer-macros [dev?]]
   [reagent.ratom :as ratom]
   [sci.core :as sci]))

;; The with-let macro from reagent.core. The only change is that the
;; interop/unchecked-aget+set were replaced by aget and aset.
(defn ^:macro with-let [_ _ bindings & body]
  (assert (vector? bindings)
          (str "with-let bindings must be a vector, not "
               (pr-str bindings)))
  (let [v (gensym "with-let")
        k (keyword v)
        init (gensym "init")
        ;; V is a reaction, which holds a JS array.
        ;; If the array is empty, initialize values and store to the
        ;; array, using binding index % 2 to access the array.
        ;; After init, the bindings are just bound to the values in the array.
        bs (into [init `(zero? (alength ~v))]
                 (map-indexed (fn [i x]
                                (if (even? i)
                                  x
                                  (let [j (quot i 2)]
                                    ;; Issue 525
                                    ;; If binding value is not yet set,
                                    ;; try setting it again. This should
                                    ;; also throw errors for each render
                                    ;; and prevent the body being called
                                    ;; if bindings throw errors.
                                    `(if (or ~init
                                             (not (.hasOwnProperty ~v ~j)))
                                       (aset ~v ~j ~x)
                                       (aget ~v ~j)))))
                              bindings))
        [forms destroy] (let [fin (last body)]
                          (if (and (seq? fin)
                                   (= 'finally (first fin)))
                            [(butlast body) `(fn [] ~@(rest fin))]
                            [body nil]))
        add-destroy (when destroy
                      (list
                       `(let [destroy# ~destroy]
                          (if (reagent.ratom/reactive?)
                            (when (nil? (reagent.ratom/-destroy ~v))
                              (reagent.ratom/-destroy! ~v destroy#))
                            (destroy#)))))
        asserting (dev?) #_(if *assert* true false)
        res (gensym "res")]
    `(let [~v (reagent.ratom/with-let-values ~k)]
       ~(when asserting
          `(when-some [c# (reagent.ratom/-ratom-context)]
             (when (== (reagent.ratom/-generation ~v) (reagent.ratom/-ratom-generation c#))
               (d/error "Warning: The same with-let is being used more "
                        "than once in the same reactive context."))
             (reagent.ratom/-set-ratom-generation! ~v c#)))
       (let ~(into bs [res `(do ~@forms)])
         ~@add-destroy
         ~res))))

(def rns (sci/create-ns 'reagent.core nil))

(def reagent-namespace
  {'atom (sci/copy-var r/atom rns)
   'create-element (sci/copy-var r/create-element rns)
   'as-element (sci/copy-var r/as-element rns)
   'with-let (sci/copy-var with-let rns)
   'class-names (sci/copy-var r/class-names rns)
   'cursor (sci/copy-var r/cursor rns)
   'create-class (sci/copy-var r/create-class rns)
   'create-compiler (sci/copy-var r/create-compiler rns)
   'reactify-component (sci/copy-var r/reactify-component rns)
   'track (sci/copy-var r/track rns)
   'track! (sci/copy-var r/track! rns)
   'dispose! (sci/copy-var r/dispose! rns)})

(def rtmns (sci/create-ns 'reagent.ratom nil))

(defn -ratom-context
  "Read-only access to the ratom context."
  []
  ratom/*ratom-context*)

(defn -generation
  [x]
  (.-generation x))

(defn -ratom-generation
  [x]
  (.-ratomGeneration x))

(defn -set-ratom-generation!
  [v c]
  (set! (.-generation v) (.-ratomGeneration c)))

(defn -destroy!
  [v destroy]
  (set! (.-destroy v) destroy))

(defn -destroy
  [v]
  (.-destroy v))

(def reagent-ratom-namespace
  {'with-let-values (sci/copy-var ratom/with-let-values rtmns)
   'reactive? (sci/copy-var ratom/reactive? rtmns)
   '-ratom-context (sci/copy-var -ratom-context rtmns)
   '-generation (sci/copy-var -generation rtmns)
   '-ratom-generation (sci/copy-var -ratom-generation rtmns)
   '-set-ratom-generation! (sci/copy-var -set-ratom-generation! rtmns)
   '-destroy! (sci/copy-var -destroy! rtmns)
   '-destroy (sci/copy-var -destroy rtmns)
   'atom (sci/copy-var reagent.ratom/atom
                       rns)
   'make-reaction (sci/copy-var reagent.ratom/make-reaction
                                rns)
   'make-track (sci/copy-var reagent.ratom/make-track
                             rns)
   'track! (sci/copy-var reagent.ratom/track! rns)})

(def rdbgns (sci/create-ns 'reagent.debug nil))

(defn -tracking? []
  reagent.debug/tracking)

(defn ^:macro error
  "Print with console.error."
  [_ _ & forms]
  (when *assert*
    `(when (some? js/console)
       (.error (if (reagent.debug/-tracking?)
                 reagent.debug/track-console
                 js/console)
               (str ~@forms)))))

(def reagent-debug-namespace
  {'error (sci/copy-var error rdbgns)
   '-tracking? (sci/copy-var -tracking? rdbgns)
   'track-console (sci/copy-var d/track-console rdbgns)})

(def namespaces
  {'reagent.core reagent-namespace
   'reagent.ratom reagent-ratom-namespace
   'reagent.debug reagent-debug-namespace})

(def config
  {:namespaces namespaces})
