(defproject re-frame "0.1.0"
  :description  "A reagent framework"
  :url          "https://github.com/Day8/re-frame.git"

  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2665"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha" :scope "provided"]
                 [reagent "0.4.3"]
                 [historian "1.0.7"]]

  :profiles     {:debug {:debug true}
                 :dev   {:dependencies [[spellhouse/clairvoyant "0.0-48-gf5e59d3"]]

                         :plugins      [[lein-cljsbuild "1.0.3"]
                                        [com.cemerick/clojurescript.test "0.3.3"]]}}

  :resource-paths ["run/resources"]
  ;:jvm-opts     ^:replace ["-Xms2g" "-Xmx2g" "-server"]

  :source-paths ["src"]
  :test-paths   ["test"]

  ;; Exclude the demo code from the output of either:
  ;;   - lein jar
  ;;   - lein install
  :jar-exclusions [#"(?:^|\/)re-frame-demo\/"]

  :cljsbuild    {:builds [{:id "demo"
                           :source-paths   ["src" "src/re_frame"]
                           :compiler       {:output-to     "run/compiled/demo.js"
                                            :source-map    "run/compiled/demo.js.map"
                                            :output-dir    "run/compiled/demo"
                                            :optimizations :none
                                            :pretty-print  true}}
                          ]}

  :aliases      {"auto"  ["do" "clean," "cljsbuild" "clean," "cljsbuild" "auto" "demo,"]
                 "once"  ["do" "clean," "cljsbuild" "clean," "cljsbuild" "once" "demo,"]
                 "test"  ["do" "clean," "cljsbuild" "clean," "cljsbuild" "auto" "test"]}
  )
