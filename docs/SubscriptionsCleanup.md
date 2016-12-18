## Subscriptions Cleanup 

There's a problem and we need to fix it. 


### The Problem 

The simple example, used in the earlier code walk through, is not idomatic re-frame. It has a flaw. 

The [code is here](https://github.com/Day8/re-frame/blob/master/examples/simple/src/simple/core.cljs). 

You'll notice that it does not obey the Rule:  **keep views as dumb as possible**.
 
A view should never do any computation on input data. Its job is just to compute hiccup.  
The subscriptions theyuse should deliver the data already in the right 
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

That view obtains data from a subscription and then it goes to town 
massaging that data into the form it needs for use in the hiccup.  We don't like that. 

### The Solution

Instead, we want a subscription to deliver the data all ready to go so 
the view is 100% concerned with hiccup generation only:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color])}}
   @(rf/subscribe [:time-str])])
```

That means we must write a `time-str` subscription:
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


*** 

Previous:  [Infographic](SubscriptionInfographic.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Basic App Structure](Basic-App-Structure.md)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


