(ns ns-to-markdown
  "A script that reads a single ClojureScript namespace, like `re-frame.core`, 
   and outputs a single page of markdown-based API documentation.

   Usage: clojure -m ns-to-markdown ../src/re_frame/core.cljc > api-re-frame.core.md
 
   Notes:
     - run as a script using the Clojure CLI
     - the first argument is a path to a file containing a ClojureScript namespace. 
     - it reads the namespace within the file using the ClojureScript analyzer,
       extracting public var metadata such as function names, arglists and docstrings.
     - it writes a single markdown-based API doc to stdout
     - you can see the page it outputs here: http://day8.github.io/re-frame/api-re-frame.core/
  
   Workflow: 
     - the output is designed to be incorporated into a Static Site generator, like `mkdocs`.
     - For re-frame, we use it as a step within the GitHub Actions workflow which builds docs. See: 
       https://github.com/day8/re-frame/blob/78ca09785e2adf9eea11f1e4bff2477d193f4b46/.github/workflows/docs-workflow.yml#L15
  
   About The Namespace:
     - example: https://github.com/day8/re-frame/blob/master/src/re_frame/core.cljc
     - the docs strings are expected to be markdown-compatible. 
     - notice the subtle `metadata-ish` `{:api-docs/heading "Subscriptions"}` to group vars under headings.
   "
  (:require
    [clojure.java.io :as io]
    [cljs.analyzer]
    [cljs.analyzer.api]
    [clojure.string :as string]))

(defn multimethod?
  [var]
  (= (:tag var) 'cljs.core/MultiFn))

(defn var-type
  [opts]
  (cond
    (:macro opts)           :macro
    (:protocol-symbol opts) :protocol
    (multimethod? opts)     :multimethod
    :else                   :var))

(defn remove-quote
  [arglists]
  (if (and (list? arglists) (= (first arglists) 'quote))
    (second arglists)
    arglists))

(defn unindent
  [doc]
  (->> (string/split-lines doc)
       (map #(string/replace % #"^\s{0,2}" ""))
       (string/join "\n")))

(defn read-var
  [var]
  (-> var
      (select-keys [:name :line :arglists :doc :dynamic :added :deprecated :api-docs/heading])
      (update :arglists remove-quote)
      (update :doc unindent)
      (assoc :type (var-type var))))

(defn read-publics
  [state ns-name]
  (let [vars (cljs.analyzer.api/ns-publics state ns-name)]
    (->> vars
         (map second)
         (remove :protocol)
         (remove :anonymous)
         (sort-by :line)
         (map read-var)
         (group-by :api-docs/heading)
         (mapv (fn [[heading vars]]
                   {:heading heading
                    :publics vars
                    :line   (:line (first vars))}))
         (sort-by :line))))

(defn analyze-file
  [file]
  (let [state (cljs.analyzer.api/empty-state)]
    (binding [cljs.analyzer/*analyze-deps* false]
      (cljs.analyzer.api/no-warn
        (cljs.analyzer.api/analyze-file state file {})))
    state))

(defn read-file
  [path]
  (try
    (let [source  (io/file path)
          ns-name (:ns (cljs.analyzer.api/parse-ns source))
          state   (analyze-file source)]
      (-> (cljs.analyzer.api/find-ns state ns-name)
          (select-keys [:name :doc])
          (assoc :publics (read-publics state ns-name))))
    (catch Exception e
      (println e))))

(def markdown-styles
  "<style>\n.md-typeset h3 {\nborder-bottom: 2px solid #888;\n}\n</style>\n\n")

(defn ns->markdown
  [m]
  (format "%s# %s\n\n" markdown-styles (:name m)))

(defn arglist->markdown
  [arglist]
  (if (zero? (count arglist))
    ""
    (str " " (string/join " " arglist))))

(defn arglists->markdown
  [name-without-ns arglists]
  (reduce
    (fn [markdown arglist]
      (str markdown "\n" (format "`#!clj (%s%s)`\n" name-without-ns (arglist->markdown arglist))))
    ""
    arglists))

(defn var->markdown
  [var]
  (let [name-without-ns (name (:name var))]
    (format "### %s\n%s\n\n%s\n\n"
            name-without-ns
            (arglists->markdown name-without-ns (:arglists var))
            (:doc var))))

(defn group->markdown
  [{:keys [heading publics]}]
  (reduce str (format "## %s\n\n" heading) (map var->markdown publics)))


(defn -main
  [& args]
  (let [ns-data (read-file (first args))]
    (println (str (ns->markdown ns-data)
                  (reduce str "" (map group->markdown  (:publics ns-data)))))))
