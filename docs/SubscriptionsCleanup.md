## Subscriptions Cleanup 

There's a problem and we need to fix it. 


### The Problem 

The simple example, used in the earlier code walk through, is not idomatic re-frame. It has a flaw. 

It does not obey the re-frame rule:  **keep views as simple as possible**.
 
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

But that may offend your aesthetics. Too much noise with those two `@`? 

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

### LambdaIsland Naming  (LIN)

I've ended up quite liking [the alternative names](https://lambdaisland.com/blog/11-02-2017-re-frame-form-1-subscriptions) 
suggested by [Lambda Island Videos](https://lambdaisland.com/):

```cljs
(def <sub (comp deref re-frame.core/subscribe))   ;; aka listen (above)
(def >evt re-frame.core/dispatch)
```

### Say It Again

So, if, in code review, you saw this view function:
```clj
(defn show-items
  []
  (let [sorted-items (sort @(subscribe [:items]))]  
    (into [:div] (for [i sorted-items] [item-view i]))))
```
What would you (supportively) object to?

That `sort`, right?  Computation in the view. Instead, we want exactly the right data 
delivered to the view - no further computation required - the view's job is to simply make `hiccup`. 

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

### A Final FAQ

The following issue comes up a bit.

You will end up with a bunch of level 1 `reg-sub` which
look the same (they directly extract a path within `app-db`):
```clj
(reg-sub 
   :a 
   (fn [db _] 
     (:a db)))
```

```clj
(reg-sub 
   :b 
   (fn [db _] 
     (-> db :top :b)))
```
 
Now, you think and design abstractly for a living, and that repetition will feel uncomfortable. It will
call to you like a Siren: "refaaaaactoooor meeeee". "Maaaake it DRYYYY".
So here's my tip:  tie yourself to the mast and sail on. That repetition is good. It is serving a purpose.
Just sail on.

The WORST thing you can do is to flex your magnificent abstraction muscles 
and create something like this:
```clj
(reg-sub 
   :extract-any-path
   (fn [db path]
     (get-in db path))
```

"Genius!", you think to yourself.  "Now I only need one direct `reg-sub` and I supply a path to it. 
A read-only cursor of sorts.  Look at the code I can delete."
 
Neat and minimal it most certainly is, yes, but genius it isn't. You are now asking the 
code USING the subscription to provide the path.  You have traded some innocuous 
repetition for longer term fragility, and that's not a good trade.

What fragility? Well, the view which subscribes using, say, `(subscribe [:extract-any-path [:a]])` 
now "knows" about (depends on) the structure within `app-db`.

What happens when you inevitably restructure `app-db` and put that `:a` path under
another high level branch of `app-db`?  You will have to run around all the views,
looking for the paths supplied, knowing which to alter and which to leave alone. 
Fragile. 

We want our views to declaratively ask for data, but they should have 
no idea where it comes from. It is the job of a subscription to know where data comes from. 

Remember our rule at the top:  **keep views as simple as possible**. 
Don't give them knowledge or tasks outside their remit.


*** 

Previous:  [Infographic](SubscriptionInfographic.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:        [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:      [Flow Mechanics](SubscriptionFlow.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
