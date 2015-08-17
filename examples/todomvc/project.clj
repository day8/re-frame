(defproject todomvc-re-frame "0.4.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.107"]
                 [reagent "0.5.0"]
                 [re-frame "0.4.1"]
                 [figwheel "0.3.7"]
                 [secretary "1.2.3"]
                 [prismatic/schema "0.4.3"]
                 [binaryage/devtools "0.3.0"]]

  :plugins [[lein-cljsbuild "1.0.5"]
            [lein-figwheel "0.3.7"]]

  :hooks [leiningen.cljsbuild]

  :profiles {:dev  {:cljsbuild
                    {:builds {:client {:source-paths ["devsrc"]
                                       :compiler     {:main                 todomvc.dev
                                                      :asset-path           "js"
                                                      :optimizations        :none
                                                      :source-map           true
                                                      :source-map-timestamp true}}}}}

             :prod {:cljsbuild
                    {:builds {:client {:compiler {:optimizations :advanced
                                                  :elide-asserts true
                                                  :pretty-print  false}}}}}}

  :figwheel {:server-port 3450
             :repl        false}


  :clean-targets ^{:protect false} ["resources/public/js"]

  :cljsbuild {:builds {:client {:source-paths ["checkouts/re-frame/src" "src"]
                                :compiler     {:output-dir "resources/public/js"
                                               :output-to  "resources/public/js/client.js"}}}})
