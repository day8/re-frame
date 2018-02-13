(defproject re-frame "0.10.5"
  :description  "A Clojurescript MVC-like Framework For Writing SPAs Using Reagent."
  :url          "https://github.com/Day8/re-frame.git"
  :license      {:name "MIT"}
  :dependencies [[org.clojure/clojure        "1.8.0"]
                 [org.clojure/clojurescript  "1.9.908"]
                 [reagent                    "0.7.0"]
                 [net.cgrand/macrovich       "0.2.0"]
                 [org.clojure/tools.logging  "0.3.1"]]

  :profiles {:debug {:debug true}
             :dev   {:dependencies [[karma-reporter            "1.0.1"]
                                    [binaryage/devtools        "0.9.4"]]
                     :plugins      [[lein-ancient              "0.6.10"]
                                    [lein-cljsbuild            "1.1.5"]
                                    [lein-npm                  "0.6.2"]
                                    [lein-figwheel             "0.5.13"]
                                    [lein-shell                "0.5.0"]]}}

  :clean-targets  [:target-path "run/compiled"]

  :resource-paths ["run/resources"]
  :jvm-opts       ["-Xmx1g" "-XX:+UseConcMarkSweepGC"]
  :source-paths   ["src"]
  :test-paths     ["test"]

  :shell          {:commands {"open" {:windows ["cmd" "/c" "start"]
                                      :macosx  "open"
                                      :linux   "xdg-open"}}}

  :deploy-repositories [["releases"  {:sign-releases false :url "https://clojars.org/repo"}]
                        ["snapshots" {:sign-releases false :url "https://clojars.org/repo"}]]

  :release-tasks [["vcs" "assert-committed"]
                  ["change" "version" "leiningen.release/bump-version" "release"]
                  ["vcs" "commit"]
                  ["vcs" "tag" "v" "--no-sign"]
                  ["deploy"]
                  ["change" "version" "leiningen.release/bump-version"]
                  ["vcs" "commit"]
                  ["vcs" "push"]]

  :npm {:devDependencies [[karma                 "1.0.0"]
                          [karma-cljs-test       "0.1.0"]
                          [karma-chrome-launcher "0.2.0"]
                          [karma-junit-reporter  "0.3.8"]]}

  :cljsbuild {:builds [{:id           "test"
                        :source-paths ["test" "src"]
                        :compiler     {:preloads        [devtools.preload]
                                       :external-config {:devtools/config {:features-to-install [:formatters :hints]}}
                                       :output-to     "run/compiled/browser/test.js"
                                       :source-map    true
                                       :output-dir    "run/compiled/browser/test"
                                       :optimizations :none
                                       :source-map-timestamp true
                                       :pretty-print  true}}
                       {:id           "karma"
                        :source-paths ["test" "src"]
                        :compiler     {:output-to     "run/compiled/karma/test.js"
                                       :source-map    "run/compiled/karma/test.js.map"
                                       :output-dir    "run/compiled/karma/test"
                                       :optimizations :whitespace
                                       :main          "re_frame.test_runner"
                                       :pretty-print  true
                                       :closure-defines {"re_frame.trace.trace_enabled_QMARK_" true}}}]}

  :aliases {"test-once"   ["do" "clean," "cljsbuild" "once" "test," "shell" "open" "test/test.html"]
            "test-auto"   ["do" "clean," "cljsbuild" "auto" "test,"]
            "karma-once"  ["do" "clean," "cljsbuild" "once" "karma,"]
            "karma-auto"  ["do" "clean," "cljsbuild" "auto" "karma,"]
            ;; NOTE: In order to compile docs you would need to install
            ;; gitbook-cli(2.3.2) utility globaly using npm or yarn
            "docs-serve" ^{:doc "Runs the development server of docs with live reloading"} ["shell" "gitbook" "serve" "./" "./build/re-frame/"]
            "docs-build" ^{:doc "Builds the HTML version of docs"} ["shell" "gitbook" "build" "./" "./build/re-frame/"]
            ;; NOTE: Calibre and svgexport(0.3.2) are needed to build below
            ;; formats of docs. Install svgexpor3t using npm or yarn.
            "docs-pdf"  ^{:doc "Builds the PDF version of docs"}
            ["do"
             ["shell" "mkdir" "-p" "./build/"]
             ["shell" "gitbook" "pdf" "./" "./build/re-frame.pdf"]]

            "docs-mobi" ^{:doc "Builds the MOBI version of docs"}
            ["do"
             ["shell" "mkdir" "-p" "./build/"]
             ["shell" "gitbook" "mobi" "./" "./build/re-frame.mobi"]]

            "docs-epub" ^{:doc "Builds the EPUB version of docs"}
            ["do"
             ["shell" "mkdir" "-p" "./build/"]
             ["shell" "gitbook" "epub" "./" "./build/re-frame.epub"]]})
