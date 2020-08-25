(ns ns-to-markdown 
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
  [[_ var]]
  (-> var
      (select-keys [:name :line :arglists :doc :dynamic :added :deprecated])
      (update :arglists remove-quote)
      (update :doc unindent)
      (assoc :type (var-type var))))

(defn read-publics
  [state ns-name]
  (let [vars (cljs.analyzer.api/ns-publics state ns-name)]
    (->> vars
         (remove :protocol)
         (remove :anonymous)
         (map read-var))))

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

(defn ns->markdown
  [m]
  (format "# %s\n\n" (:name m)))

(defn arglist->markdown
  [arglist]
  (if (zero? (count arglist))
    ""
    (str " " (string/join " " arglist))))

(defn arglists->markdown
  [name-without-ns arglists]
  (reduce
    (fn [markdown arglist]
      (str markdown "\n" (format "`(%s%s)`" name-without-ns (arglist->markdown arglist))))
    ""
    arglists))

(defn var->markdown
  [var]
  (let [name-without-ns (name (:name var))]
    (format "## %s\n%s\n\n%s\n\n"
            name-without-ns
            (arglists->markdown name-without-ns (:arglists var))
            (:doc var))))

(defn -main
  [& args]
  (let [ns-data (read-file (first args))]
    (println (str (ns->markdown ns-data)
                  (reduce str "" (map var->markdown  (:publics ns-data)))))))
