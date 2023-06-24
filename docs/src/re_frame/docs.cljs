(ns re-frame.docs
  (:require
   ["@codemirror/state" :as cs]
   ["@codemirror/view" :as cv]
   ["@nextjournal/lang-clojure" :as lc]
   ["codemirror" :as cm]
   [clojure.string :as str]
   [clojure.pprint :as pp]
   [promesa.core :as p]
   [reagent.dom :as rdom]
   [re-frame.core]
   [re-frame.db]
   [sci.core :as sci]
   [sci.configs.reagent.reagent :as sci.reagent]
   [sci.configs.re-frame.re-frame :as sci.re-frame]
   [sci.ctx-store :as ctx-store]))

;; https://github.com/borkdude/cljs-showcase/tree/main

(def rdns (sci/create-ns 'reagent.dom nil))

(def reagent-dom-namespace
  {'render (sci/copy-var rdom/render rdns)})

(defn cm-string [cm-instance]
  (-> cm-instance .-state .-doc .toString))

(let [ctx (sci/init {:namespaces {'re-frame.core sci.re-frame/re-frame-namespace
                                  're-frame.db sci.re-frame/re-frame-db-namespace
                                  'reagent.core sci.reagent/reagent-namespace
                                  'reagent.dom reagent-dom-namespace}
                     :classes {'js js/globalThis
                               :allow :all
                               'Math js/Math}
                     :ns-aliases {'clojure.pprint 'cljs.pprint}})]
  (ctx-store/reset-ctx! ctx))

(defn eval-codemirror [cm-instance]
  (try
    (let [code-str (cm-string cm-instance)
          v (sci/eval-string* (ctx-store/get-ctx) code-str)]
      (if (instance? js/Promise v)
        (-> v
            (.then
             (fn [v]
               [:success-promise v]))
            (.catch
             (fn [err]
               [:error-promise err])))
        [:success v]))
    (catch :default err
      [:error err])))

(defonce init-instances
  (let [elts (js/document.querySelectorAll ".cljs-showcase")]
    (doseq [^js elt elts]
      (let [_ (js/console.log (.. elt -dataset))
            no-editable? (.. elt -dataset -cljsShowcaseNoEditable)
            no-eval? (.. elt -dataset -cljsShowcaseNoEval)
            eval? (not no-eval?)
            no-eval-on-init? (.. elt -dataset -cljsShowcaseNoEvalOnInit)
            eval-on-init? (not no-eval-on-init?)
            doc (.-innerText elt)
            _ (set! (.-innerText elt) "")
            cm-ref (atom nil)
            res (js/document.createElement "pre")
            eval-me (fn []
                      (when eval?
                        (p/let [[op v] (eval-codemirror @cm-ref)]
                          (binding [*print-length* 20]
                            (case op
                              (:success :success-promise)
                              (set! (.-innerText res)
                                    (str (when (= :success-promise op)
                                           "Promise resolved to:\n")
                                         (with-out-str (pp/pprint v))))
                              (:error :error-promise)
                              (set! (.-innerText res)
                                    (str/join "\n" (cons (.-message v)
                                                         (sci/format-stacktrace (sci/stacktrace v))))))))))
            ext (.of cv/keymap
                     (clj->js [{:key "Mod-Enter"
                                :run eval-me}]))
            state (cs/EditorState.create #js {:doc doc
                                              :extensions #js [cm/basicSetup, (lc/clojure), (.highest cs/Prec ext),
                                                               (cs/EditorState.readOnly.of no-editable?)]})
            cm (cm/EditorView. #js {:state state :parent elt})]
        (when eval?
          (let [btn (js/document.createElement "button")
                _ (set! (.-style btn) "float: right")
                _ (set! btn -innerText "Eval")
                _ (.addEventListener elt "click" eval-me)]
            (.appendChild elt btn)))
        (.appendChild elt res)
        (reset! cm-ref cm)
        (when (and eval? eval-on-init?) (eval-me))))))

(sci/alter-var-root sci/print-fn (constantly *print-fn*))
(sci/alter-var-root sci/print-err-fn (constantly *print-err-fn*))
(sci/enable-unrestricted-access!)
