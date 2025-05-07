(defproject     re-frame "lein-git-inject/version"
  :description  "A ClojureScript MVC-like Framework For Writing SPAs Using Reagent."
  :url          "https://github.com/day8/re-frame.git"
  :license      {:name "MIT"}

  :dependencies [[org.clojure/clojure       "1.11.1" :scope "provided"]
                 [org.clojure/clojurescript  ~(or (System/getenv "CANARY_CLOJURESCRIPT_VERSION") "1.11.60")
                  :scope "provided"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs      "2.23.3" :scope "provided"]
                 [reagent/reagent           "1.2.0"]
                 [net.cgrand/macrovich      "0.2.1"]
                 [org.clojure/tools.logging "1.2.4"]
                 [org.babashka/sci "0.8.40" :scope "provided"]
                 [funcool/promesa "10.0.575" :scope "provided"]]

  :plugins      [[day8/lein-git-inject "0.0.15"]
                 [lein-shadow          "0.4.1"]]

  :middleware   [leiningen.git-inject/middleware]

  :git-inject {:version-pattern #"v(\d+\.\d+\.\d+.*)"}

  :profiles {:debug {:debug true}
             :dev   {:dependencies [[binaryage/devtools "1.0.3"]
                                    [tortue/spy "2.15.0"]]
                     :plugins      [[com.github.liquidz/antq "RELEASE"]
                                    [lein-shell              "0.5.0"]]
                     :antq         {}}
             :docs {:dependencies [[org.babashka/sci "0.8.40"]
                                   [funcool/promesa "10.0.575"]]}}

  :clean-targets  [:target-path
                   "shadow-cljs.edn"
                   "node_modules"
                   "run/compiled"]

  :resource-paths ["resources"]
  :jvm-opts       ["-Xmx1g"]
  :source-paths   ["src" "docs/src"] ;; FixMe: Only the docs build should use the docs path.
  :test-paths     ["test"]

  :shell          {:commands {"karma" {:windows         ["cmd" "/c" "karma"]
                                       :default-command "karma"}
                              "open"  {:windows         ["cmd" "/c" "start"]
                                       :macosx          "open"
                                       :linux           "xdg-open"}}}

  :deploy-repositories [["clojars" {:sign-releases false
                                    :url "https://clojars.org/repo"
                                    :username :env/CLOJARS_USERNAME
                                    :password :env/CLOJARS_TOKEN}]]

  :release-tasks [["deploy" "clojars"]]

  :shadow-cljs {:nrepl  {:port 8777}

                :builds {:docs
                         {:target           :browser
                          :devtools   {:repl-pprint true}
                          :modules {:docs {:entries [re-frame.docs]}}
                          :output-dir "docs/js"}
                         :browser-test
                         {:target           :browser-test
                          :ns-regexp        "re-frame\\..*-test$"
                          :test-dir         "run/compiled/browser/test"
                          :compiler-options {:pretty-print                       true
                                             :external-config                    {:devtools/config {:features-to-install [:formatters :hints]}}}
                          :devtools         {:http-port 3449
                                             :http-root "run/compiled/browser/test"
                                             :preloads  [devtools.preload]}}

                         :karma-test
                         {:target           :karma
                          :ns-regexp        "re-frame\\..*-test$"
                          :output-to        "run/compiled/karma/test/test.js"
                          :compiler-options {:pretty-print                       true
                                             :closure-defines                    {re-frame.trace.trace-enabled? true}}}}}

  :aliases {"watch" ["do"
                     ["clean"]
                     ["with-profile" "+docs" "shadow" "watch" "browser-test" "karma-test" "docs"]]

            "ci"    ["do"
                     ["clean"]
                     ["shadow" "compile" "karma-test"]
                     ["shell" "karma" "start" "--single-run" "--reporters" "junit,dots"]]

            "docs" ["do"
                    ["clean"]
                    ["with-profile" "+docs" "shadow" "release" ":docs"]]})
