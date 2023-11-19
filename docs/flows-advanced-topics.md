> Have you been to Clevelinnati? No? Clevelinnati can be found at the geometric midpoint between Cleveland and Cincinnati. What's that, you say it's not on the map?
Well, no worries. Now that I've defined Clevelinnati for you, you'll know exactly how to get to get there... As long as Cleveland stays still.

Previously, we explored the capabilities of [flows](/re-frame/Flows).
We discussed a flow which derives the area of a room from its dimensions:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result data-cm-doc-no-eval-on-init>
{:id     :kitchen-area
 :inputs {:w [:kitchen :width]
          :h [:kitchen :length]}
 :output (fn [{:keys [w h]}] (* w h))
 :path   [:kitchen :area]
 :live-inputs {:tab [:tab]}
 :live?  (fn [{:keys [tab]}]
           (= tab :kitchen))}
</div>

Here, we'll consider the nuances of re-frame's reactive model, and how flows stand to solve some of its fundamental shortcomings.

Introducing yet another demo app! Turns out, we were measuring the kitchen to fill it with balloons. It's a balloon prank planner app. Consider the following:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-eval-on-init data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-sub
 ::kitchen-area
 (fn [db _] (get-in db [:kitchen :area])))

(rf/reg-sub
 ::kitchen-height
 (fn [db _] (get-in db [:kitchen :height])))

(rf/reg-sub
 ::kitchen-volume
 (fn [_] [(rf/subscribe [::kitchen-area]) (rf/subscribe [::kitchen-height])])
 (fn [[area height] _] (* area  height)))

(rf/reg-sub
 ::num-balloons-to-fill-kitchen
 (fn [_] [(rf/subscribe [::kitchen-volume])])
 (fn [[volume] _] (let [std-balloon-volume 2.5]
                   (/ volume std-balloon-volume))))

(rf/reg-event-fx
 ::order-ballons-for-kitchen-prank
 (fn [{:keys [balloons-per-bag db] :as cofx} _]
   (let [num-balloons-to-fill-kitchen :???     ;; How can I get this value???
         num-bags-to-buy (js/Math.ceil
                          (/ num-balloons-to-fill-kitchen
                             balloons-per-bag))]
     {:fx [[:amazon {:fn :order
                     :sku :balloon-bag
                     :ct num-bags-to-buy}]]})))
</div>

How can we get a correct value for `num-balloons-to-fill-kitchen`? You might try calling `(rf/subscribe [::num-balloons-to-fill-kitchen])`, but re-frame comes back with a warning about reactive context, and memory leaks... oh my!

### Reactive context

We express some [business logic in subscriptions](https://github.com/day8/re-frame/issues/753), and some in events, but they're not really compatible.
Between subscriptions and events, there is a [coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/).

Subscriptions can only be accessed within a [reactive context](/re-frame/FAQs/UseASubscriptionInAnEventHandler).
Since an event handler isn't reactive, it can't access any subscriptions.

Furthermore, subscriptions have an `input-signals` function. This allows the value of one subscription to flow into another. But events have no such thing.

That means, to get a usable value for `num-balloons-to-fill-kitchen`, we have to duplicate the business logic that we wrote into our subscription, along with the *entire* subgraph of inputs which our subscription is composed of:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result data-cm-doc-no-eval-on-init>
(rf/reg-event-fx
 ::order-ballons-for-kitchen-prank
 (fn [{:keys [balloons-per-bag db] :as cofx} _]
   (let [kitchen-area (get-in db [:kitchen :area])
         kitchen-height (get-in db [:kitchen :height])
         kitchen-volume (* area height)      ;; eyelids start drooping here
         std-balloon-volume 2.5              
         num-balloons (/ kitchen-volume std-balloon-volume)
         num-bags-to-buy (js/Math.ceil
                          (/ num-baloons balloons-per-bag))]
     {:fx [[:amazon {:fn :order
                     :sku :balloon-bag
                     :ct num-bags-to-buy}]]})))
</div>

Not only have we [drenched](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) our code, but now it has to do all our calculations twice.

Of course you can design around the problem, but at what cost?
We sympathize with you developers, for the hours you may have spent poring over an event handler, just to re-write the code as a subscription, and vice-versa.

### Caching

Subscriptions have a hidden caching mechanism, which stores the value as long as there is a component in the render tree which uses it. 
Basically, when components call `subscribe` with a particular `query-v`, re-frame sets up a callback. 
When those components unmount, this callback deletes the stored value. 
It removes the subscription from the graph, so that it will no longer recalculate. 
This is a form of [reference counting](https://en.wikipedia.org/wiki/Reference_counting) - once the last subscribing component unmounts, then the subscription is freed.

This often works as intended, and nothing gets in our way. 
It's elegant in a sense - a view requires certain values, and those values only matter when the view exists. And vice versa. 
But when these values are expensive to produce or store, their existence starts to matter. 
The fact that some view is creating and destroying them starts to seem arbitrary. 
Subscriptions don't *need* to couple their behavior with that of their calling components.

The easy, automatic lifecycle behavior of subscriptions comes with a coupling of concerns. You can't directly control this lifecycle. 
You have to contol it by proxy, by mounting and unmounting your views. You can't *think* about your signal graph without thinking about views first.

The `app-db` represents your business state, and signals represent outcomes of your business logic. Views are just window dressing. 
We're tired of designing our whole business to change every time we wash the windows!

### Paths

A [layer-2](/re-frame/subscriptions/#the-four-layers) subscription basically *names* an `app-db` path. What does a layer-3 subscription *name*?

A materialized view, or a derived value.

Subscriptions occupy their own semantic domain, separate from `app-db`. Only within view functions (and other subscriptions) can we access this domain. Outside of views, they form an impenetrable blob.

So, re-frame is simple. `app-db` represents and *names* the state of your app. Except, so does this network of subscription names. But you can't really *use* those, so just forget about it.

### Statefulness

Here's the story we like to tell about re-frame:

- **User Actions** cause **Events**
- **Events** cause **Effects**
- **Effects** cause **State Changes**
- **State changes** cause **View Rendering**

Turns out, it's not so simple. 
Not only do *state changes* cause *view rendering*, but *view rendering* also causes *state changes*.
Specifically, render logic changes the state of subscriptions.

Your app's actual story might go something like this:

> An event fires. A subscription runs. An outer component passes new props to an inner one. A reaction runs. Another reaction runs. A component unmounts. That subscription disposes, clearing its cache.

Sound [familiar](https://github.com/day8/re-frame/discussions/776)?

> Then, the same event fires. Another component mounts. The same subscription runs. Its calculation is heavy, so your app lags every time.
> "Wait," you ask, "what happened to the cache? Why is my subscription recalculating when its inputs are the same?"
> After a lot of headscratching, you find out it's because the subscription itself is not the same. Render logic caused it to dispose, and a new one took its place.

This isn't a bug, nor is it inevitable, but in our experience, complexity adds up fast. 
Once Reagent, Re-frame and React begin to share the concern of reactive dataflow, they can race, or play chicken. 
I'll react if you do! Can't run me if I unmount you first! Can't unmount me if I run you first!

When a view calls `subscribe`, it creates a reaction. When that view unmounts, it frees the reaction. 
These are side-effects on the signal *graph* 
(that is, the graph of all subscriptions which are actively re-calculating their output when their inputs change, and storing their output value).

```
event -> app-db -> signals -> view -> event
                                  ∟-> signal graph -> signals -> view
```

Something is looping in on itself here:

- The value of `app-db` determines when a view lives or dies.
- *And*, the value of a view determines when a signal lives or dies. 
- *And*, the value of a signal determines when a view lives or dies.

If views derive solely from `app-db`, when why must signals derive from views?
Why not simply have *everything* derive from `app-db`?

`event -> app-db -> signal graph -> signals -> view -> event`

### A better way

Here's the good news about flows:

__You can access a flow's output value any time, anywhere,__ since flows are controlled by re-frame/interceptors, not reagent/reactions. 
Instead of thinking about reactive context, just think about the outcome of the latest event.

__If you know a flow's name, you know its output location,__ since flows store their output in `app-db`, at a static path. 
It doesn't matter how many other flows that flow depends on. The correct value simply stays where you put it.

__A flow's lifecycle is a pure function of `app-db`__. 
That means you explicitly define when a flow lives, dies, is registered or cleared. You do this directly, not via your component tree.

Like many Clojure patterns, flows are *both* nested *and* flat. 
Even though `::num-balloons-to-fill-kitchen` depends on other flows, we can access it directly:

<div class="cm-doc" data-cm-doc-no-edit data-cm-doc-no-result data-cm-doc-no-eval-on-init>
(rf/reg-flow
 {:id ::kitchen-volume
  :inputs {:area [:kitchen :area]
           :height [:kitchen :height]}
  :output (fn [{:keys [area height]}]
            (* area height))
  :path [:kitchen :volume]})

(rf/reg-flow
 {:id ::num-balloons-to-fill-kitchen
  :inputs {:volume (rf/flow<- ::kitchen-volume)}
  :output (fn [{:keys [volume]}]
            (let [std-balloon-volume 2.5]
               (/ volume std-balloon-volume)))})

(rf/reg-event-fx
 ::order-ballons-for-kitchen-prank
 (fn [{:keys [balloons-per-bag] :as cofx} _]
   (let [num-balloons (rf/flow-output db ::num-balloons-to-fill-kitchen) ;; easy!
         num-bags-to-buy (js/Math.ceil
                          (/ num-balloons
                             balloons-per-bag))]
     {:fx [[:amazon {:fn :order
                     :sku :balloon-bag
                     :ct num-bags-to-buy}]]})))
</div>