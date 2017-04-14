## Using Stateful JS Components 

You know what's good for you, and you know what's right.  But it
doesn't matter - the wickedness of the temptation is too much. 

The JS world is brimming with shiny component baubles: D3, 
Google Maps, Chosen, etc.  

But they are salaciously stateful and mutative.  And, you, 
raised in a pure, functional home, with caring, immutable parents, 
know they are wrong.  But, my, how you still yearn for the sweet 
thrill of that forbidden fruit. 

I won't tell, if you don't.  But careful plans must be made  ... 

### The overall plan 

To use a stateful js component, you'll need to write two Reagent components:
  - an **outer component** responsible for sourcing data via a subscription or r/atom or cursor, etc.  
  - an **inner component** responsible for wrapping and manipulating the stateful JS component via lifecycle functions.  

The pattern involves the outer component, which sources data, supplying this data to the inner component **via props**. 

### Example Using Google Maps

```cljs
(defn gmap-inner []
  (let [gmap    (atom nil)
        options (clj->js {"zoom" 9})
        update  (fn [comp]
                  (let [{:keys [latitude longitude]} (reagent/props comp)
                        latlng (js/google.maps.LatLng. latitude longitude)]
                    (.setPosition (:marker @gmap) latlng)
                    (.panTo (:map @gmap) latlng)))]

    (reagent/create-class
      {:reagent-render (fn []
                         [:div
                          [:h4 "Map"]
                          [:div#map-canvas {:style {:height "400px"}}]])

       :component-did-mount (fn [comp]
                              (let [canvas  (.getElementById js/document "map-canvas")
                                    gm      (js/google.maps.Map. canvas options)
                                    marker  (js/google.maps.Marker. (clj->js {:map gm :title "Drone"}))]
                                (reset! gmap {:map gm :marker marker}))
                              (update comp))

       :component-did-update update
       :display-name "gmap-inner"})))



(defn gmap-outer []
  (let [pos (subscribe [:current-position])]   ;; obtain the data
    (fn []
      [gmap-inner @pos])))
```


Notes:
  - `gmap-outer` obtains data via a subscription. It is quite simple - trivial almost.
  - it then passes this data __as a prop__  to `gmap-inner`.  This inner component has the job of wrapping/managing the stateful js component (Gmap in our case above)
  - when the data (delivered by the subscription) to the outer layer changes, the inner layer, `gmap-inner`, will be given a new prop - `@pos` in the case above.
  - when the inner component is given new props, its entire set of lifecycle functions will be engaged. 
  - the renderer for the inner layer ALWAYS renders the same, minimal container hiccup for the component.  Even though the `props` have changed, the same hiccup is output. So it will appear to React as if nothing changes from one render to the next. No work to be done. React/Reagent will leave the DOM untouched. 
  - but this inner component has other lifecycle functions and this is where the real work is done.  
  - for example, after the renderer is called (which ignores its props), `component-did-update` will be called. In this function, we don't ignore the props, and we use them to update/mutate the stateful JS component.  
  - the props passed (in this case `@pos`) in must be a map, otherwise `(reagent/props comp)` will return nil.

### Pattern Discovery 

This pattern has been independently discovered by many. To my knowledge, 
[this description of the Container/Component pattern](https://medium.com/@learnreact/container-components-c0e67432e005#.3ic1uipvu)
is the first time it was written up.

### Code Credit

The example gmaps code above was developed by @jhchabran in this gist:
https://gist.github.com/jhchabran/e09883c3bc1b703a224d#file-2_google_map-cljs

### D3 Examples

D3 (from @zachcp): 
  - Blog Post: http://zachcp.org/blog/2015/reagent-d3/
  - Code: https://github.com/zachcp/simplecomponent
  - Example: http://zachcp.github.io/simplecomponent/

A different take on using D3: 
https://gadfly361.github.io/gadfly-blog/2016-10-22-d3-in-reagent.html

### Advanced Lifecycle Methods

If you mess around with lifecycle methods, you'll probably want to read Martin's explanations:
https://www.martinklepsch.org/posts/props-children-and-component-lifecycle-in-reagent.html


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
