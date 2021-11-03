(defproject     re-frame "lein-git-inject/version"
  :description  "A ClojureScript MVC-like Framework For Writing SPAs Using Reagent."
  :url          "https://github.com/day8/re-frame.git"
  :license      {:name "MIT"}

  :dependencies [[org.clojure/clojure       "1.10.3"   :scope "provided"]
                 [org.clojure/clojurescript  ~(or (System/getenv "CANARY_CLOJURESCRIPT_VERSION") "1.10.879")
                  :scope "provided"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs      "2.15.12"   :scope "provided"]
                 [reagent                   "1.0.0"]
                 [net.cgrand/macrovich      "0.2.1"]
                 [org.clojure/tools.logging "1.1.0"]]

  :plugins      [[day8/lein-git-inject "0.0.14"]
                 [lein-shadow          "0.3.1"]]

  :middleware   [leiningen.git-inject/middleware]

  :git-inject {:version-pattern #"v(\d+\.\d+\.\d+.*)"}

  :profiles {:debug {:debug true}
             :dev   {:dependencies [[binaryage/devtools "1.0.3"]]
                     :plugins      [[com.github.liquidz/antq "RELEASE"]
                                    [lein-shell              "0.5.0"]]
                     :antq         {}}}

  :clean-targets  [:target-path
                   "shadow-cljs.edn"
                   "node_modules"
                   "run/compiled"]

  :resource-paths ["resources"]
  :jvm-opts       ["-Xmx1g"]
  :source-paths   ["src"]
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

                :builds {:browser-test
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
                     ["shadow" "watch" "browser-test" "karma-test"]]

            "ci"    ["do"
                     ["clean"]
                     ["shadow" "compile" "karma-test"]
                     ["shell" "karma" "start" "--single-run" "--reporters" "junit,dots"]]})
