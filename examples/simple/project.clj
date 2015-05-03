
(defproject simple-re-frame "0.4.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-3208"]
                 [reagent "0.5.0"]
                 [re-frame "0.4.0"]
                 [figwheel "0.2.6"]]

  :plugins [[lein-cljsbuild "1.0.5"]
            [lein-figwheel "0.2.3-SNAPSHOT"]]

  :hooks [leiningen.cljsbuild]

  :profiles {:dev {:cljsbuild
                   {:builds {:client {:source-paths ["devsrc"]
                                      :compiler
                                      {:main simpleexample.dev
                                       :optimizations :none
                                       :source-map true
                                       :source-map-timestamp true}}}}}

             :prod {:cljsbuild
                    {:builds {:client {:compiler
                                       {:optimizations :advanced
                                        :elide-asserts true
                                        :pretty-print false}}}}}}

  :figwheel {:repl false}

  :cljsbuild {:builds {:client {:source-paths ["src"]
                                :compiler
                                {:output-dir "target/client"
                                 :output-to "target/client.js"}}}})
