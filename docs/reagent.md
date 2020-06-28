---
klipse: true
---

Clojurescript is ergonomic, stable, functional language

Look at the front page of https://www.learnreframe.com/


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


```
(defn square 
   [colour size]
   [:div {:style 
            {:width (str (or size "20") "px")
             :height (str (or size "20") "px")
             :display "inline-block"
             :background-color colour}}])

[:div [square "blue" 40] [square "green"]]
```

XXX work from 

## Atoms

Atoms are a clojure language concept. They provide a way to store a mutable value - a value which can change over time. This value in an atom might be an int or a map ... anything. 

You used the function `deref` to o obtain the value held in an atom. So if `a` is an atom, 
then `(deref a)` will extrct the value. The shorthand is `@a`. 

You can set the value of an atom with `reset!`, like this `(reset! a :foo)`. 

Alternatively, you canuse `swap!` to update the value in an atom. `swap!` takes a pure function as an argument which is to perform this `update`. It is expected to takes the current value in the atom as an argument, and to return the updated value to be put back in the atom. 

For example `(swap! a + 5 6)` will call the function `+` with three values:  the value in `a` and `5` and `6`. So this will effectively add 11 to the value currently in `a` and store that value back into `a`. 
