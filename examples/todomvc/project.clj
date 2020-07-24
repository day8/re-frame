(defproject todomvc-re-frame "lein-git-inject/version"

  :dependencies [[org.clojure/clojure        "1.10.1"]
                 [org.clojure/clojurescript  "1.10.773"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs       "2.10.17"]
                 ;; We repeat re-frame's own dependencies here as instead of
                 ;; depending on a re-frame artifact we add the re-frame source
                 ;; from this repository directly to the :source-paths.
                 [reagent                    "0.10.0"]
                 [net.cgrand/macrovich       "0.2.1"]
                 [org.clojure/tools.logging  "0.4.1"]
                 [binaryage/devtools         "1.0.0"]
                 [clj-commons/secretary      "1.2.4"]
                 [day8.re-frame/tracing      "0.5.5"]]

  :plugins      [[day8/lein-git-inject "0.0.14"]
                 [lein-shadow          "0.2.0"]]

  :middleware   [leiningen.git-inject/middleware]

  :source-paths ["../../src"
                 "src"]

  :clean-targets ^{:protect false} [:target-path
                                    "shadow-cljs.edn"
                                    "resources/public/js"]

  :shadow-cljs {:nrepl {:port 8777}

                :builds {:client {:target :browser
                                  :output-dir "resources/public/js"
                                  :modules {:client {:init-fn todomvc.core/main}}
                                  :devtools {:http-root "resources/public"
                                             :http-port 8280}}}}

  :aliases {"dev-auto" ["shadow" "watch" "client"]})
