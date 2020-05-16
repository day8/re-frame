(defproject klipse-cache-ns "0.0.1"
  :description "cache ns for bootstrap cljs"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.748"]
                 [andare "1.1.587"]
                 [viebel/gadjett "0.5.13"]
                 [viebel/klipse-clj "10.1.8"]
                 [com.cemerick/url "0.1.1"]
                 [rewrite-cljs "0.4.4"]
                 [re-frame "0.12.0"]
                 [com.andrewmcveigh/cljs-time "0.5.2"]
                 [org.clojure/test.check "1.0.0"]
                 ;; CRITICAL: If upgrading reagent React versions MUST manually be kept in sync.
                 ;;           See docs/klipse/README.md! Do it. Don't ignore this comment.
                 [reagent "0.10.0"]
                 [viebel/poppea "0.2.1"]
                 [expound "0.8.4"]]
  :npm {:dependencies [["@pupeno/xmlhttprequest" "1.7.0"]]}
  :plugins [[lein-npm "0.6.2"]])
