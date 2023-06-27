(ns re-frame.docs
  (:require
   ["@codemirror/state" :as cs]
   ["@codemirror/view" :as cv]
   ["@nextjournal/lang-clojure" :as lc]
   ["codemirror" :as cm]
   [cljs.reader :as reader]
   [clojure.string :as str]
   [clojure.pprint :as pp]
   [promesa.core :as p]
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [re-frame.core]
   [re-frame.db]
   [sci.core :as sci]
   [sci.configs.reagent.reagent :as sci.reagent]
   [sci.configs.re-frame.re-frame :as sci.re-frame]
   [sci.ctx-store :as ctx-store]))

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

(defn eval-str [source-str]
  (try
    (let [v (sci/eval-string* (ctx-store/get-ctx) source-str)]
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

(sci/alter-var-root sci/print-fn (constantly *print-fn*))
(sci/alter-var-root sci/print-err-fn (constantly *print-err-fn*))
(sci/enable-unrestricted-access!)

(defn- make-state [{:keys [source-str editable? key-bindings on-eval on-change]}]
  (cs/EditorState.create
   #js{:doc source-str
       :extensions (cond-> #js [cm/minimalSetup
                                (cv/highlightActiveLine)
                                (lc/clojure)
                                (cm/EditorView.updateListener.of
                                 #(on-change (.toString (.. % -state -doc))))
                                (.highest cs/Prec
                                          (.of cv/keymap
                                               (clj->js (mapv (fn [[k v]] {:key k :run v})
                                                              key-bindings))))]
                     (not editable?) (.concat #js [(cs/EditorState.readOnly.of true)]))}))

(defn format-exception [v]
  (str/join "\n" (cons (.-message v)
                       (sci/format-stacktrace (sci/stacktrace v)))))

(defn editor-result [{:keys [return-str status] :as eval-result}]
  [:div {:style {:white-space "pre-wrap"
                 :margin-top "0.5rem"
                 :font-size "0.75em"
                 :padding "0 2px 0 2px"
                 :background-color (if (success? eval-result) "#eeffee" "#ffeeee")
                 :color "#444"
                 :font-family "monospace"}}
       return-str])

(defn validation [validators {:keys [source-str status] :as eval-result}]
  (when (and status (seq validators))
    (into [:div {:style {:margin "1rem"}}] ((apply juxt validators) eval-result))))

(defn success? [eval-result] (#{:success :success-promise} (:status eval-result)))

(defn editor
  [{:keys [source-str eval-result !view validators evaluable? editable? eval-on-init? on-change hover? focus?]}]
  (r/with-let
    [eval! (fn [] (p/let [[status return-val] (eval-str (cm-string @!view))]
                   (binding [*print-length* 20]
                     (reset! eval-result {:status status
                                          :return-val return-val
                                          :return-str (binding [*print-length* 20]
                                                        (case status
                                                          (:success :success-promise)
                                                          (with-out-str (pp/pprint return-val))
                                                          (:error :error-promise)
                                                          (format-exception return-val)))
                                          :source-str @source-str
                                          :source-form (try (reader/read-string @source-str)
                                                            (catch :default err nil))}))
                   (reset! focus? false)))
     init! (fn [el]
             (reset! !view (cm/EditorView.
                            #js {:state (make-state {:source-str @source-str
                                                     :on-change #(do (reset! source-str %)
                                                                     (when on-change (on-change %)))
                                                     :editable? editable?
                                                     :key-bindings {"Mod-Enter" eval!}})
                                 :lineNumbers false
                                 :parent el}))
             (when eval-on-init? (eval!)))]
    [:div {:on-mouse-enter #(reset! hover? true)
           :on-mouse-leave #(reset! hover? false)
           :on-focus #(reset! focus? true)
           :on-blur #(reset! focus? false)}
     [:div {:style {:display "flex"}}
      [:div {:ref init!
             :style {:flex 1
                    :max-width "100%"
                    :overflow-x "scroll"}}]
      (when evaluable?
        [:div [:button {:on-click eval!
                  :style {:margin 0
                          :border "1px solid gray"
                          :background-color "#ccc"
                          :padding 2
                          :opacity (if (or @hover? @focus?) 1 0.5)}}
         "eval"]])]
     [editor-result @eval-result]
     [validation validators @eval-result]
     (when @eval-result [:hr])]
    (finally (.destroy @!view))))

(defonce mounts
  (let [els (seq (js/document.querySelectorAll ".cm-doc"))]
    (doseq [^js el els
            :let [editable? (not (.. el -dataset -cmDocNoEdit))
                  evaluable? (not (.. el -dataset -cmDocNoEval))
                  eval-on-init? (not (.. el -dataset -cmDocNoEvalOnInit))
                  validator-els (.getElementsByClassName el "cm-doc-validator")
                  validators (into [] (comp
                                       (map #(.-innerText %))
                                       (map eval-str)
                                       (filter (comp #{:success} first))
                                       (map second))
                                   validator-els)]]
      (rdom/render [editor {:parent el
                            :editable? editable?
                            :evaluable? evaluable?
                            :eval-on-init? eval-on-init?
                            :hover? (r/atom false)
                            :focus? (r/atom false)
                            :source-str (atom (some->> (array-seq (.-childNodes el))
                                                       (filter (comp #{js/Node.TEXT_NODE}
                                                                     #(.-nodeType %)))
                                                       first
                                                       .-textContent
                                                       str/trim))
                            :validators validators
                            :eval-result (r/atom nil)
                            :!view (atom nil)}] el))))


