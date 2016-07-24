(defproject simple-re-frame "0.8.0"
  :dependencies [[org.clojure/clojure        "1.8.0"]
                 [org.clojure/clojurescript  "1.9.89"]
                 [reagent  "0.6.0-rc"]
                 [re-frame "0.8.0-alpha3"]]

  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel  "0.5.4-7"]]

  :hooks [leiningen.cljsbuild]

  :profiles {:dev {:cljsbuild
                   {:builds {:client {:source-paths ["devsrc"]
                                      :compiler     {:main "simpleexample.dev"
                                                     :asset-path "js"
                                                     :optimizations :none
                                                     :source-map true
                                                     :source-map-timestamp true}}}}}

             :prod {:cljsbuild
                    {:builds {:client {:compiler    {:optimizations :advanced
                                                     :elide-asserts true
                                                     :pretty-print false}}}}}}

  :figwheel {:repl false}

  :clean-targets ^{:protect false} ["resources/public/js"]

  :cljsbuild {:builds {:client {:source-paths ["src"]
                                :compiler     {:output-dir "resources/public/js"
                                               :output-to  "resources/public/js/client.js"}}}})
