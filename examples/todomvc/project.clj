(defproject todomvc-re-frame "0.3.1"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-3208"]
                 [reagent "0.5.0"]
                 [re-frame "0.4.0.SNAPSHOT"]
                 [secretary "1.2.1"]]

  :plugins [[lein-cljsbuild "1.0.4"]]

  :hooks [leiningen.cljsbuild]

  :profiles {:dev {:cljsbuild
                   {:builds {:client {
                                      :compiler
                                      {:main todomvc.core
                                       :optimizations :none
                                       :source-map true
                                       :source-map-timestamp true}}}}}

             :prod {:cljsbuild
                    {:builds {:client {:compiler
                                       {:optimizations :advanced
                                        :elide-asserts true
                                        :pretty-print false}}}}}}

  :cljsbuild {:builds {:client {:source-paths ["src"]
                                :compiler
                                {:output-dir "target/client"
                                 :output-to "target/client.js"}}}})
