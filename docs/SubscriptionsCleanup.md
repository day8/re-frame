## Subscriptions Cleanup 

There's a problem and we need to fix it. 


### The Problem 

The simple example, used in the earlier code walk through, is not idomatic re-frame. It has a flaw. 

It does not obey the re-frame rule:  **keep views as dumb as possible**.
 
A view shouldn't do any computation on input data. Its job is just to compute hiccup.
The subscriptions it uses should deliver the data already in the right 
structure, ready for use in hiccup generation.

### Just Look 

Here be the horrors: 
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

That view obtains data from a `[:time]` subscription and then it 
massages that data into the form it needs for use in the hiccup.  We don't like that. 

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

### Another Technique

Above, I suggested this:
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color @(rf/subscribe [:time-color])}}
   @(rf/subscribe [:time-str])])
```

But that may offend your aesthetics. Too much noise with those `@`? 

To clean this up, we can define a new `listen` function: 
```clj
(defn listen 
  [query-v]
  @(rf/subscribe query-v))
```

And then rewrite: 
```clj
(defn clock
  []
  [:div.example-clock
   {:style {:color (listen [:time-color])}}
   (listen [:time-str])])
```
So, at the cost of writing your own function, `listen`, the code is now less noisy 
AND there's less chance of us forgetting an `@` (which can lead to odd problems).

### Say It Again

So, if, in code review, you saw this view function:
```clj
(defn show-items
  []
  (let [sorted-items (sort @(subscribe [:items]))]  
    (into [:div] (for [i sorted-items] [item-view i]))))
```
What would you (supportively) object to?

That `sort`, right?  Computation in the view. Instead, we want the right data 
delivered to the view - its job is to simply make `hiccup`. 

The solution is to create a subscription that delivers items already sorted. 
```clj
(reg-sub 
   :sorted-items 
   (fn [_ _]  (subscribe [:items]))
   (fn [items _]
      (sort items))
```

Now, in this case the computation is a bit trivial, but the moment it is
a little tricky, you'll want to test it.  So separating it out from the 
view will make that easier. 

To make it testable, you may structure like this:
```clj
(defn item-sorter
  [items _]
  (sort items))
  
(reg-sub 
   :sorted-items 
   (fn [_ _]  (subscribe [:items]))
   item-sorter)
```

Now it is easy to test `item-sorter` independently.  

### And There's Another Benefit

re-frame de-duplicates signal graph nodes.  

If, for example, two views wanted to `(subscribe [:sorted-items])` only the one node 
(in the signal graph) would be created.  Only one node would be doing that 
potentially expensive sorting operation (when items changed) and values from 
it would be flowing through to both views.

That sort of efficiency can't happen if this views themselves are doing the `sort`. 

 
### de-duplication

As I described above, two, or more, concurrent subscriptions for the same query will source 
reactive updates from the one executing handler - from the one node in the signal graph.

How do we know if two subscriptions are "the same"?  Answer: two subscriptions
are the same if their query vectors test `=` to each other.

So, these two subscriptions are *not* "the same":  `[:some-event 42]`  `[:some-event "blah"]`. Even
though they involve the same event id, `:some-event`, the query vectors do not test `=`.

This feature shakes out nicely because re-frame has a data oriented design. 

*** 

Previous:  [Infographic](SubscriptionInfographic.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:        [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:      [Flow Mechanics](SubscriptionFlow.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
