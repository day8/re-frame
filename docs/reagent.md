---
klipse: true
---

<code class="klipse-clojure">
(ns simple.core
  (:require [reagent.dom]
            [re-frame.core :as rf]
            [clojure.string :as str]))
</code>

<code class="klipse-clojure">
(defn square 
   []
   [:svg {:width "400" :height "110"}
     [:rect {:width "300" :height "100"}]])
</code>

<code class="klipse-reagent">
[square]
</code>



<code class="klipse-clojure">
(defn mount-ui
  []
  (reagent/render [square]                 ;; mount the application's ui
                  (js/document.getElementById "live-app")))
(mount-ui)
</code>



<div id="live-app">
  <div class="preload">  
    The live application should start here in 60 seconds ...
    <br><br>
    Doesn't work? Maybe try disabling your adblocker for this site. 

  
  </div>
</div>
