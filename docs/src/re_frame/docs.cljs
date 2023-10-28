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
   [re-frame.alpha]
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
                                  're-frame.alpha sci.re-frame/re-frame-alpha-namespace
                                  'reagent.core sci.reagent/reagent-namespace
                                  'reagent.dom reagent-dom-namespace}
                     :classes {'js js/globalThis
                               :allow :all
                               'Math js/Math}
                     :ns-aliases {'clojure.pprint 'cljs.pprint}})]
  (ctx-store/reset-ctx! ctx))

(def last-ns (volatile! nil))

(defn eval-str [source-str & [opts]]
  (try
    (let [{:keys [val ns]} (sci/eval-string+ (ctx-store/get-ctx) source-str {:ns @last-ns})
          v val]
      (vreset! last-ns ns)
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
                                #_(cv/highlightActiveLine)
                                (cm/EditorView.theme
                                 (clj->js
                                  {:.cm-content
                                   {:padding ".77em 0 .77em 0"
                                    :font-family (str "\"Source Code Pro\","
                                                      "SFMono-Regular,"
                                                      "Consolas,"
                                                      "Menlo,monospace")}
                                   :.cm-line
                                   {:padding "0 1.2em 0 1.2em"
                                    :color "var(--md-code-hl-punctuation-color)"}
                                   :.ͼg
                                   {:color "var(--md-code-hl-keyword-color)"}
                                   :.ͼb
                                   {:color "var(--md-code-hl-function-color)"}
                                   :.ͼc
                                   {:color "var(--md-code-hl-string-color)"}
                                   :.ͼm
                                   {:color "var(--md-code-hl-punctuation-color)"}}))
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

(defn success? [eval-result]
  (when eval-result
    (contains? #{:success :success-promise} (:status eval-result))))

(def green-check [:span {:style {:color "green"}} "✓"])
(def red-x [:span {:style {:color "red"}} "✗"])
(def grey [:span {:style {:color "grey"}} ""])

(defn pass-fail [pass?] (if (nil? pass?) grey (if pass? green-check red-x)))

(defn editor-result [{:keys [return-str] :as eval-result}
                     & [{:keys [format]}]]
  (let [pass? (success? eval-result)
        format (or format :full)]
    [:div {:style {:white-space "pre-wrap"
                   :padding "1px 4px 0.5px 4px"
                   :background-color (if (nil? pass?) "lightgrey"
                                         (if pass? "#eeffee" "#ffeeee"))
                   :color "#444"
                   :font-family "monospace"}}
     [:span {:style {:pointer-events "none"
                     :user-select "none"}}
      [pass-fail pass?] " "]
     (when (or (not pass?) (#{:full} format))
       [:span {:style {:font-size "0.75em"}} return-str])]))

(defn validation [validators {:keys [source-str status] :as eval-result}]
  (when (and status (seq validators))
    (into [:div {:style {:margin "1rem"}}] ((apply juxt validators) eval-result))))

(defn eval-button [{:keys [on-eval hover? focus?]}]
  [:div [:button {:on-click on-eval
                  :style {:margin 0
                          :border "1px solid gray"
                          :box-sizing "border-box"
                          :background-color "#ccc"
                          :padding "2px 4px"
                          :opacity (if (or hover? focus?) 1 0.5)}}
         "eval"]])

(defn editor
  [{:keys [source-str eval-result !view validators evaluable? editable? eval-on-init? on-change hover? focus? result-format result?]}]
  (r/with-let
    [eval! (fn [] (p/let [[status return-val] (eval-str (cm-string @!view))]
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
                                                           (catch :default err nil))})
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
           :on-blur #(reset! focus? false)
           :style {:font-size ".79em"}}
     [:div {:ref init!
            :style {:flex 1
                    :box-sizing "border-box"
                    :background-color "var(--md-code-bg-color)"
                    :border "1px solid #e4e4e4"
                    :max-width "100%"
                    :overflow-x "scroll"}}]
     [:div {:style {:display "flex"
                    :width "100%"
                    :margin-top "0.5rem"}}
      [:div {:style {:flex 1}}
       (when result?
         [editor-result @eval-result {:format result-format}])]
      (when evaluable?
        [eval-button {:on-eval eval! :hover? @hover? :focus? @focus?}])]
     [validation validators @eval-result]
     (when (and result? @eval-result) [:hr])]
    (finally (.destroy @!view))))

(defonce mounts
  (let [els (seq (js/document.querySelectorAll ".cm-doc"))]
    (doseq [^js el els
            :let [editable? (not (.. el -dataset -cmDocNoEdit))
                  evaluable? (not (.. el -dataset -cmDocNoEval))
                  eval-on-init? (not (.. el -dataset -cmDocNoEvalOnInit))
                  result? (not (.. el -dataset -cmDocNoResult))
                  result-format (keyword (or (.. el -dataset -cmDocResultFormat) "full"))
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
                            :result? result?
                            :result-format result-format
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
