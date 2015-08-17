(defproject re-frame "0.4.2-TRANSDUCERS"
  :description "A Clojurescript MVC-like Framework For Writing SPAs Using Reagent."
  :url "https://github.com/Day8/re-frame.git"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.107"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [reagent "0.5.0"]]

  :profiles {:debug {:debug true}
             :dev   {:dependencies [[spellhouse/clairvoyant "0.0-48-gf5e59d3"]]
                     :plugins      [[lein-cljsbuild "1.0.5"]
                                    [com.cemerick/clojurescript.test "0.3.3"]]}}

  :clean-targets [:target-path
                  "run/compiled"]

  :resource-paths ["run/resources"]
  :jvm-opts ["-Xmx1g" "-XX:+UseConcMarkSweepGC"]
  :source-paths []
  :test-paths ["test"]


  :cljsbuild {:builds        [{:id           "test"         ;; currently bogus, there is no demo or tests
                               :source-paths ["src" "test"]
                               :compiler     {;:main          re-frame.test-runner
                                              :output-to     "run/compiled/test.js"
                                              :source-map    "run/compiled/test.js.map"
                                              :output-dir    "run/compiled/test"
                                              ;:target        :nodejs ;;; this target required for node, plus a *main* defined in the tests.
                                              ;:hashbang      false ;;; https://github.com/cemerick/clojurescript.test/issues/68#issuecomment-52981151
                                              :optimizations :simple ;; https://github.com/cemerick/clojurescript.test/issues/68
                                              :pretty-print  true}}]

              :test-commands {"rhino"   ["rhino" "-opt" "-1" :rhino-runner "run/compiled/test.js"]
                              "slimer"  ["xvfb-run" "-a" "slimerjs" :runner "run/compiled/test.js"]
                              "phantom" ["phantomjs" :runner "run/compiled/test.js"]}} ; doesn't work with phantomjs < 2.0.0

  :aliases {"auto"         ["do" "clean," "cljsbuild" "clean," "cljsbuild" "auto" "demo,"]
            "once"         ["do" "clean," "cljsbuild" "clean," "cljsbuild" "once" "demo,"]
            "test-rhino"   ["do" "clean," "cljsbuild" "once," "cljsbuild" "test" "rhino"]
            "test-slimer"  ["do" "clean," "cljsbuild" "once," "cljsbuild" "test" "slimer"]
            "test-phantom" ["do" "clean," "cljsbuild" "once," "cljsbuild" "test" "phantom"]})
