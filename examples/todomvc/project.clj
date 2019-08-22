(defproject todomvc-re-frame "0.10.10-SNAPSHOT"
  :dependencies [[org.clojure/clojure        "1.10.1"]
                 [org.clojure/clojurescript  "1.10.520"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library]]
                 [thheller/shadow-cljs "2.8.51"]
                 [reagent "0.8.1"]
                 [re-frame "0.10.9"]
                 [binaryage/devtools "0.9.10"]
                 [clj-commons/secretary "1.2.4"]
                 [day8.re-frame/tracing "0.5.3"]]

  :plugins [[lein-shadow "0.1.5"]]

  :clean-targets ^{:protect false} ["resources/public/js" "target"]

  :shadow-cljs {:nrepl {:port 8777}

                :builds {:client {:target :browser
                                  :output-dir "resources/public/js"
                                  :modules {:client {:init-fn todomvc.core/main}}
                                  :devtools {:http-root "resources/public"
                                             :http-port 8280}}}})
