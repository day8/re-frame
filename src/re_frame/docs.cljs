(ns re-frame.docs
  (:require
   [day8.dev.codemirror-sci :as csci]
   [clojure.string :as str]
   [re-frame.core]
   [re-frame.db]
   [re-frame.alpha]))

(defn auto-highlight-clojure!
  "Automatically highlight all code as Clojure by default"
  []
  (let [highlight-fn
        (fn []
          ;; Handle inline code elements (not in pre blocks)
          (let [inline-codes (js/document.querySelectorAll "code:not(pre code)")]
            (.forEach inline-codes
                      (fn [code]
                        ;; Add language-clojure if no language specified
                        (when-not (some #(str/starts-with? % "language-")
                                        (array-seq (.-classList code)))
                          (.add (.-classList code) "language-clojure")
                          (.highlightElement js/hljs code)))))

          ;; Handle code blocks (fenced and indented)
          (let [code-blocks (js/document.querySelectorAll "pre code")]
            (.forEach code-blocks
                      (fn [code]
                        ;; Add language-clojure if no language specified
                        (when-not (some #(str/starts-with? % "language-")
                                        (array-seq (.-classList code)))
                          (.add (.-classList code) "language-clojure")))))

          ;; Re-highlight all code blocks
          (.highlightAll js/hljs))]

    ;; Keep trying until hljs is available
    (letfn [(wait-for-hljs []
              (if (exists? js/hljs)
                (highlight-fn)
                (.setTimeout js/window wait-for-hljs 50)))]
      (wait-for-hljs))))

(defn init! []
  (auto-highlight-clojure!)
  (csci/init!))
