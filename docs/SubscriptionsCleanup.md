## Subscriptions Cleanup 

There's a problem and we need to fix it. 


### The Problem 

The simple example, used in the earlier code walk through, is not idomatic re-frame. It has a flaw. 

The [code is here](https://github.com/Day8/re-frame/blob/master/examples/simple/src/simple/core.cljs). 

You'll notice that it does not obey the re-frame rule:  **keep views as dumb as possible**.
 
A view should never do any computation on input data. Its job is just to compute hiccup.
The subscriptions they use should deliver the data already in the right 
structure, ready for use. 

### Just Look 

Just look at the horror of it:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color])}}
   (-> @(rf/subscribe [:time])
       .toTimeString
       (clojure.string/split " ")
       first)])
```

That view obtains data from a `[:time]` subscription and then it goes to town
massaging that data into the form it needs for use in the hiccup.  We don't like that. 

### The Solution

Instead, we want to use a new `[:time-str]` subscription which will deliver the data all ready to go, so 
the view is 100% concerned with hiccup generation only. Like this:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color])}}
   @(rf/subscribe [:time-str])])
```

Which, in turn, means we must write this `time-str` subscription handler:
```clj
(reg-sub 
  :time-str 
  (fn [_ _]  
    (subscribe [:time]))
  (fn [t _] 
    (-> t
       .toTimeString
       (clojure.string/split " ")
       first)))
```

Much better. 

You'll notice this new subscription handler belongs to the "Level 3" 
layer of the reactive flow.  See the [Infographic](SubscriptionInfographic.md). 

### Another technique

Above I suggested this:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color])}}
   @(rf/subscribe [:time-str])])
```

That may offend your aesthetics. Too much noise with those `@`? 

How about we define a `listen` function to clean it up.

```clj
(defn listen 
  [query-v]
  @(rf/subscribe v))
```

Then we can re-write like this:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color (listen [:time-color])}}
   (listen [:time-str])])
```
At the cost of your own function, `listen`, the code is slightly less noisy 
AND there's less chance of forgetting an `@` (which can lead to odd problems). 

### Say It Again

If, in code review, you saw this view function:
```clj
(defn show-items
  []
  (let [sorted-items (sort @(subscribe [:items]))]  
    (into [:div] (for [i sorted-items] [item-view i]))))
```
What would you object to?

That `sort`, right?  Computation in the view. Instead we want the right data 
delivered to the view - its job is to simply make `hiccup`. 

The solution is to create a subscription that delivers sorted 
items.


*** 

Previous:  [Infographic](SubscriptionInfographic.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Basic App Structure](Basic-App-Structure.md)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


