(defproject     re-frame "lein-git-inject/version"
  :description  "A ClojureScript MVC-like Framework For Writing SPAs Using Reagent."
  :url          "https://github.com/day8/re-frame.git"
  :license      {:name "MIT"}

  :dependencies [[org.clojure/clojure       "1.10.1"   :scope "provided"]
                 [org.clojure/clojurescript  ~(or (System/getenv "CANARY_CLOJURESCRIPT_VERSION") "1.10.764")
                  :scope "provided"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs      "2.8.110"   :scope "provided"]
                 [reagent                   "0.10.0"]
                 [net.cgrand/macrovich      "0.2.1"]
                 [org.clojure/tools.logging "0.4.1"]]

  :plugins      [[day8/lein-git-inject "0.0.14"]
                 [lein-shadow          "0.2.0"]
                 [lein-codox           "0.10.7"]]

  :middleware   [leiningen.git-inject/middleware]

  :git-inject {:version-pattern #"v(\d+\.\d+\.\d+.*)"}

  :codox {:namespaces [re-frame.core]
          :output-path "target/codox"}

  :profiles {:debug {:debug true}
             :dev   {:dependencies [[binaryage/devtools "1.0.2"]]
                     :plugins      [[lein-ancient       "0.6.15"]
                                    [lein-shell         "0.5.0"]]}}

  :clean-targets  [:target-path "run/compiled"]

  :resource-paths ["run/resources"]
  :jvm-opts       ["-Xmx1g"]
  :source-paths   ["src"]
  :test-paths     ["test"]

  :shell          {:commands {"open" {:windows ["cmd" "/c" "start"]
                                      :macosx  "open"
                                      :linux   "xdg-open"}}}

  :deploy-repositories [["clojars" {:sign-releases false
                                    :url "https://clojars.org/repo"
                                    :username :env/CLOJARS_USERNAME
                                    :password :env/CLOJARS_PASSWORD}]]

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

  :aliases {"test-once"   ["do" "clean," "shadow" "compile" "browser-test," "shell" "open" "run/compiled/browser/test/index.html"]
            "test-auto"   ["do" "clean," "shadow" "watch" "browser-test,"]
            "karma-once"  ["do"
                           ["clean"]
                           ["shadow" "compile" "karma-test"]
                           ["shell" "karma" "start" "--single-run" "--reporters" "junit,dots"]]
            "karma-auto"  ["do" "clean," "shadow" "watch" "karma-test,"]})
