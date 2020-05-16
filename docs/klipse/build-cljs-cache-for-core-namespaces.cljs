(ns klipse.generate-cljs-cache
  (:require
    [cljs.analyzer.api]
    [cljs.spec.alpha]
    [clojure.string :as string]))

;; This is sourced from https://github.com/viebel/cljs-analysis-cache/blob/master/generate-clojure-spec-cache.cljs
;; There are multiple copies of this floating around klipse.
;; Minor changes for file paths.

;; WARNING: This relies on Lumo internals
;; Known to work fine with Lumo 1.5
;; However is broken on subsequent Lumo versions so will need
;; to be changed to use a different js/lumo.* to obtain cache files.
(let [embedded js/lumo.internal.embedded]
  (mapv
    (fn [resource]
      (let [filename (str "cljs-cache/" (string/replace resource #"[/\\]" "_SLASH_"))]
        (js/fs.writeFile filename (js/zlib.inflateSync (.get embedded resource)) #(println "Done: " filename))))
    (filter #(re-matches #"cljs/.*|clojure/.*" %) (.keys embedded))))
