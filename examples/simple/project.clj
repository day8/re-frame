(defproject simple "lein-git-inject/version"

  :dependencies [[org.clojure/clojure       "1.10.1"]
                 [org.clojure/clojurescript "1.10.597"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs      "2.8.81"]
                 [reagent                   "0.9.0-rc2"]
                 [re-frame                  "0.11.0-rc2"]]

  :plugins      [[day8/lein-git-inject "0.0.4"]
                 [lein-shadow          "0.1.7"]]

  :middleware   [leiningen.git-inject/middleware]

  :clean-targets ^{:protect false} [:target-path
                                    "shadow-cljs.edn"
                                    "package.json"
                                    "package-lock.json"
                                    "resources/public/js"]

  :shadow-cljs {:nrepl  {:port 8777}

                :builds {:client {:target     :browser
                                  :output-dir "resources/public/js"
                                  :modules    {:client {:init-fn simple.core/run}}
                                  :devtools   {:http-root "resources/public"
                                               :http-port 8280}}}}

  :aliases {"dev-auto" ["shadow" "watch" "client"]})
