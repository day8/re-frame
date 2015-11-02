(defproject re-frame "0.5.0-alpha2"
  :description  "A Clojurescript MVC-like Framework For Writing SPAs Using Reagent."
  :url          "https://github.com/Day8/re-frame.git"
  :license      {:name "MIT"}
  :dependencies [[org.clojure/clojure        "1.7.0"]
                 [org.clojure/clojurescript  "1.7.145"]
                 [reagent "0.5.1"]]

  :profiles     {:debug {:debug true}
                 :dev   {:dependencies [[spellhouse/clairvoyant "0.0-48-gf5e59d3"]]
                         :plugins      [[lein-cljsbuild "1.1.0"]
                                        [lein-figwheel "0.3.8"]
                                        [com.cemerick/clojurescript.test "0.3.3"]]}}


  :clean-targets [:target-path
                  "run/compiled/demo"]

  :resource-paths ["run/resources"]
  :jvm-opts       ["-Xmx1g" "-XX:+UseConcMarkSweepGC"] ;;
  :source-paths ["src"]
  :test-paths   ["test"]
  :deploy-repositories [["releases" :clojars]
                        ["snapshots" :clojars]]


  :cljsbuild    {:builds [{:id "test"      ;; currently bogus, there is no demo or tests
                           :source-paths   ["test"]
                           :compiler       {:output-to     "run/compiled/test.js"
                                            :source-map    "run/compiled/test.js.map"
                                            :output-dir    "run/compiled/test"
                                            :optimizations :simple
                                            :pretty-print true}}]

                 :test-commands {"rhino" ["rhino" "-opt" "-1" :rhino-runner
                                            "run/compiled/test.js"]
                                 "slimer" ["xvfb-run" "-a" "slimerjs" :runner
                                                   "run/compiled/test.js"]
                                 "phantom" ["phantomjs" ; doesn't work with phantomjs < 2.0.0
                                            :runner "run/compiled/test.js"]}}

  :aliases      {"auto"  ["do" "clean," "cljsbuild" "clean," "cljsbuild" "auto" "demo,"]
                 "once"  ["do" "clean," "cljsbuild" "clean," "cljsbuild" "once" "demo,"]
                 "test-rhino"  ["do" "clean," "cljsbuild" "once," "cljsbuild" "test" "rhino"]
                 "test-slimer" ["do" "clean," "cljsbuild" "once," "cljsbuild" "test" "slimer"] })
