> This feature is proposed for re-frame. But it isn't available yet.  

## The story so far 

1. **Users** cause **Events**
2. **Events** cause **Effects**
3. **Effects** cause **State Changes**
4. **State Changes** cause **View rerendering**

We're about to add a new capability to step 3. Let's begin:

<div class="cm-doc">
(ns re-frame.example.flows
  (:require [re-frame.alpha :as rf]
            [reagent.dom :as rdom]))
</div>

## Flows

A `flow` calculates a derived value "automatically". Here's a basic flow, which calculates the area of a room:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
{:id     :room-area
 :inputs {:w [:room :width]
          :h [:room :length]}
 :output (fn [previous-area {:keys [w h] :as inputs}]
           (* w h))
 :path   [:room :area]}
</div>

- A `flow` has `:inputs`, obtained from paths in `app-db`.
- When the `:inputs` change, it evaluates a new `:output` value.
- Then, it puts the `:output` value back into `app-db`, at a specific `:path`.

!!! Note "Prior art"
    We built a rudimentary version of this pattern some years ago: the [on-changes interceptor](/re-frame/api-re-frame.core/#on-changes)

## A Basic use-case

Let's try using our flow in an app (see the basic [app demo](dominoes-live.md) if this is unfamiliar):

<div class="cm-doc">
(rf/reg-sub      :width  (fn [db _]    (get-in db [:kitchen :width])))
(rf/reg-sub      :length (fn [db _]    (get-in db [:kitchen :length])))
(rf/reg-event-db :inc-w  (fn [db _] (update-in db [:kitchen :width] inc)))
(rf/reg-event-db :inc-h  (fn [db _] (update-in db [:kitchen :length] inc)))
(rf/reg-event-db :init   (fn [db _] {:kitchen {:width 20 :length 20}}))

(defn dimension-fields []
  [:form
   [:h4 "Kitchen Calculator"]
   "width: "
   @(rf/subscribe [:width])
   [:a {:on-click #(rf/dispatch [:inc-w])} "+"]
   [:br]
   "length: "
   @(rf/subscribe [:length])
   [:a {:on-click #(rf/dispatch [:inc-h])} "+"]])
</div>

Here comes the interesting part. We register our flow within the app:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(def kitchen-area-flow
  {:id     :kitchen-area
   :inputs {:w [:kitchen :width]
            :h [:kitchen :length]}
   :output (fn area [previous-area {:keys [w h] :as inputs}]
             (* w h))
   :path   [:kitchen :area]})

(rf/reg-flow kitchen-area-flow)  
</div>

We write a subscription to the `app-db` path where the flow puts its output:

<div class="cm-doc">
(rf/reg-sub
 ::kitchen-area
 (fn [db _] (get-in db [:kitchen :area])))
</div>

And we use the `::kitchen-area` subscription to render our final component:

<div class="cm-doc">
(defn app-container [& children]
  (into [:div {:style {:padding "1rem"
                       :border  "2px solid grey"}}]
        children))

(defn room-calculator []
  [:div
   [dimension-fields]
   " Area: "
   @(rf/subscribe [::kitchen-area])])

(rf/dispatch-sync [:init])
(rdom/render [app-container [room-calculator]]
             (js/document.getElementById "room-calculator"))
</div>

<div id="room-calculator"></div>
  

Isn't that remarkable! What, you say it's *unremarkable?* Well, that's even better.

## Remarks

Here's why this basic flow might not excite you:

#### Can't I just use events?

> Re-frame can already set values. Events were the one true way to update `app-db`. Why invent _another_ mechanism for this?

In this sense, they are redundant. Rather than use a flow, you could simply call a `derive-area` within each relevant event:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(defn derive-area [{:keys [width length] :as room}]
  (assoc room :area (* width length)))

(rf/reg-event-db
 :width
 (fn [db [_ w]]
   (-> db
       (assoc-in [:kitchen :width] w)
       (update :kitchen derive-area))))
</div>

This works just fine... *or does it*? Actually, we forgot to change the `:length` event. Our area calculation will be wrong every time the user changes the length! Easy to fix, but the point is that we had to fix it at all. How many events will we need to review? In a mature app, this is not a trivial question.

Furthermore, is this really a `:width` event any more? Now it's more of a `:with-and-area` event. Flows can help keep concerns separate, avoiding this kind of semantic creep.

*Design is all tradeoffs*. Flows allow us to say "This value simply derives from these inputs. It simply changes when they do." We do this at the expense of some "spooky action at a distance" - in other words, we accept that no particular event will be responsible for that change.


#### Are flows just reactions, or cursors?

You might notice a similarity with [reagent.core/cursor](https://reagent-project.github.io/docs/master/reagent.core.html#var-cursor).

Both offer ways to react to *part of* a value (such as a subtree within a map). Reagent controls *when* a cursor updates, presumably during the evaluation of a component function. Flows, on the other hand, are controlled by re-frame, running every time an `event` occurs.

Cursors use a single path, whether reading with `deref`, or writing with `reset!` or `swap!`. With flows, you declare several input paths, and a separate output path. You don't `reset!` a `flow`. Instead, this just happens each `event`, if the inputs have changed.

With flows, you can implement business logic as a reactive state machine, fully independent from Reagent & React. This has some deep implications - see [XXX-flow-rationale](#) for a full explanation.


#### Can't I just use subscriptions?

You could handle this feature with a [layer-3 subscription](/re-frame/subscriptions/#the-four-layers):

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-sub
 ::kitchen-area-sub
 (fn [_] [(subscribe [:width]) (subscribe [:length])])
 (fn [[w h] _] (* w h)))
</div>

Just like a flow, this subscription's value changes whenever the inputs change, and (obviously) you call `subscribe` to access that value.

A flow stores its value in `app-db`, while subscriptions don't. We designed re-frame on the premise that `app-db` holds your *entire* app-state. Arguably, derived values belong there too. We feel there's an inherent reasonability to storing everything in one place. 

Just like with layered subscriptions, one flow can use the value of another. Remember the `:inputs` to our first flow?

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:inputs {:w [:kitchen :width]
          :h [:kitchen :length]}}
</div>

As you can see, vectors stand for paths in `app-db`. Single keywords, however, stand for *other flows*.

Here's a flow using two other flows as inputs: `::kitchen-area` and `::living-room-area`. When either input changes value, our flow calls the `:output` function to recalculate its own value:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:id     :main-room-ratio
 :inputs {:kitchen     ::kitchen-area
          :living-room ::living-room-area}
 :output (fn [_ {:keys [kitchen living-room]}]
           (/ kitchen living-room))
 :path   [:ratios :main-rooms]}
</div>

As before, once `:output` runs, the resulting value is stored at `:path`. So, the new value of `app-db` will contain a number at the path `[:ratios :main-rooms]`

#### What about caching? I thought subscriptions were optimized this way.

Subscriptions have a hidden caching mechanism, which stores the value as long as there is a component in the render tree which uses it. Basically, when a component calls `subscribe`, re-frame sets up a callback. When that component unmounts, this callback deletes the stored value. It removes the subscription from the graph, so that it will no longer recalculate. This is a form of [reference counting](https://en.wikipedia.org/wiki/Reference_counting) - once the last subscribing component unmounts, then the→

This often works as intended, and nothing gets in our way. It's elegant in a sense - a view requires certain values, and those values only matter when the view exists. And vice versa. But when these values are expensive to produce or store, their existence starts to matter. The fact that some view is creating and destroying them starts to seem arbitrary. Subscriptions don't *need* to couple their behavior with that of their calling components.

The app-db represents your business state, and signals represent outcomes of your business logic. Views are just window dressing. We're tired of designing our whole business to change every time we wash the windows!

With flows, the process is simpler. `app-db` *is* the cache. You, the programmer, define explicitly when to recalculate the output, *and* when to store the output. To this end, flows provide optional keys: `:live?`, `:init` and `:cleanup`. Let's read on, and discover how these keys work together to fully define the lifecycle and caching behavior of a flow:

## Living and Dying

> Between death... and arising... is found an existence— a "body"... that goes to the place of rebirth. This existence between two realms... is called intermediate existence.

> -- *Vasubandhu, on [bardos](https://en.wikipedia.org/wiki/Bardo)*

Let's try building an app using only flows, no subscriptions.

Here's the smallest flow you can register. There's no `:path` key, so re-frame uses the `:id` by default. That means this flow's path is `[:current-tab]`:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow
 {:id :current-tab
  :inputs {:tab [:tab]}
  :output (fn [_ {:keys [tab]}] tab)})
</div>

Re-frame provides a global `:flow` subscription, which can fetch the output value for any flow:

<div class="cm-doc">
(def current-tab (rf/sub :flow {:id :current-tab}))
</div>

Here's an event to change tabs:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-event-db
 :change-tab
 (fn [db [_ tab]] (assoc db :tab tab)))
</div>

A barebones tab picker, and something to show us the value of `app-db`:

<div class="cm-doc">
(def tabs [:room-calculator :item-counter])

(defn tab [id]
  [:a {:style {:padding "1rem"
               :color (when (= id @current-tab) "lightgreen")}
       :on-click #(rf/dispatch [:change-tab id])}
   (name id)])

(defn tab-picker []
  (into [:div] (for [id tabs] [tab id])))

(defn debug-app-db []
  [:code {:style {:font-size 12}}
   (str @re-frame.db/app-db)])

(defn item-counter [] [:<>])

(defn tabbed-app []
  [:div
   [tab-picker]
   [debug-app-db]
   (case @current-tab
     :room-calculator [room-calculator]
     :item-counter [item-counter]
     nil)])
</div>

#### Live?

Here's a more advanced version of our kitchen calculator flow.
This replaces our first `:kitchen-area` flow, since it has the same `:id`:

<div class="cm-doc" data-cm-doc-result-format="pass-fail" data-cm-doc-no-eval-on-init>
(rf/reg-flow
 {:id     :kitchen-area
  :inputs {:w [:kitchen :width]
           :h [:kitchen :length]
           :tab :current-tab}
  :output (fn area [previous-area {:keys [w h] :as inputs}]
            (* w h))
  :path   [:kitchen :area]
  :live?  (fn [db {:keys [tab]}]
            (= tab :room-calculator))})
</div>

Notice the different types of inputs. `:w [:kitchen :width]` represents an input as an `app-db` path, while `:tab :current-tab` identifies the value from the `:current-tab` flow we defined earlier.

Also, notice the new `:tab` input, and the new `:live?`.

Just like `:output`, `:live:?` is a function of `app-db` and the `:inputs`. Re-frame only calculates the `:output` when the `:live` function returns a truthy value. Otherwise, the flow is presumed dead.

Let's test it out:

<div class="cm-doc" data-cm-doc-no-eval-on-init>
(rf/dispatch-sync [:init])
(rdom/render [app-container [tabbed-app]] (js/document.getElementById "tabbed-app"))
</div>

!!! Note "Click `eval` on the two code blocks above to start this app."

<div id="tabbed-app"></div>

Try switching tabs. Notice how `:area` only exists when you're in the `room-calculator` tab. What's happening here?

#### Lifecycle

After handling an event, re-frame runs your flows. First, it evaluates `:live?`, using the new `app-db`.
Depending on the return value of `:live?`, re-frame handles one of 4 possible state transitions:

| transition | action | 
|---|---|
| From **live** to **live** |  run `:output` | 
| From **dead** to **live** |  run `:init` and `:output` |
| From **live** to **dead** |  run `:cleanup` |
| From **dead** to **dead** |  do nothing |

Basically, *living* flows get output, *dying* flows get cleaned up, *arising* flows get initiated and output.

And independently of all this, `:output` is lazy. It only runs when `:inputs` have changed value.

#### Cleanup

Try adding this `:cleanup` key into the `:kitchen-area` flow above (be sure to `eval` the code block again).

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
:cleanup (fn [db path]
           (assoc-in db path :unknown!))
</div>

By default, `:cleanup` dissociates the path from `app-db`. By declaring this `:cleanup` key in your flow, you override that default function. Now, instead of removing `:area`, you set it to `:unknown!`.

Now, is this a good idea? After all, we might consider the area known, as long as we know the width and length. Maybe we should do no cleanup, and keep the value, even when `:live?` returns false. In that case, our `:cleanup` function would simply be: `:cleanup (fn [db _] db)`.

The point is, *you* decide when the signal lives or dies, not React.

#### Init

`:init`, does nothing by default. Feel free to try out this custom `:init` function as well. Notice how it adds a key, and that key stays, regardless of our flow being dead or alive:

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
:init (fn [db path]
        (assoc-in db (conj (vec (butlast path)) :initiated?) true))
</div>

If you did want the `:initiated?` key to go away, you could handle that within `:cleanup`.

It's common to design apps which prepare certain db paths when a high-level state changes, such as when switching tabs. With flows, this preparation is an official library feature. Instead of writing custom events, you can use the `:cleanup` and `:init` keys and your colleages will know exactly what you're doing.

#### Dedicated inputs

Now that we've introduced `:live?`, here's the canonical form of a flow:

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
{:id     :kitchen-area
 :path   [:kitchen :area]
 :output {:inputs {:w [:kitchen :width]
                   :h [:kitchen :length]}
          :fn (fn area [previous-area {:keys [w h] :as inputs}]
                (* w h))}
 :live?  {:inputs {:tab :current-tab}
          :fn (fn [db {:keys [tab]}]
                (= tab :room-calculator))}}
</div>

Both `:output` and `:live?` have their own inputs. This way, you can control precisely what's required for either function, without any redundancy in your design. There may also be a performance gain, since once a flow is pronounced dead, there is no need to invoke `:output`. Thus, the `:inputs` to `:output` aren't needed.

Until now, every flow we've considered had a top-level `:inputs` key. You can still include one with this form. In that case, those inputs are merged into the discrete inputs for both `:output` and `:live?`:

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
;; These are equivalent:

(rf/reg-flow
 {:id     :abc
  :inputs {:apple [:fruits :apple]}
  :output {:inputs {:banana [:fruits :banana]}
           :fn (fn [_ {:keys [apple banana]}]
                 (and apple banana))}
  :live?  {:inputs {:carrot [:roots :carrot]}
           :fn (fn [_ {:keys [apple carrot]}]
                 (and apple carrot))}})

(rf/reg-flow
 {:id     :abc
  :output {:inputs {:apple  [:fruits :apple]
                    :banana [:fruits :banana]}
           :fn (fn [_ {:keys [apple banana]}]
                 (and apple banana))}
  :live?  {:inputs {:apple  [:fruits :apple]
                    :carrot [:roots :carrot]}
           :fn (fn [_ {:keys [apple carrot]}]
                 (and apple carrot))}})
</div>

## Redefining and Undefining

Not only do flows have a lifecycle (defined by `:live?`, `:init` and `:cleanup`), but this lifecycle also includes registration and deregistration.

- When you call `reg-flow`, or trigger the `:reg-flow` effect, that flow also comes alive (that means it runs `:init` and `:output`).

- When you call `clear-flow`, or trigger the `:clear-flow` effect, it dies (running `:cleanup`).

Here's another demonstration. Think of it as a stripped-down todomvc.
You can add, remove or clear items in a list.

<div class="cm-doc">
(rf/reg-sub ::items :-> (comp reverse ::items))

(defn item [id]
  [:div "Item " id])

(defn items []
  (into [:div] (map item) @(rf/subscribe [::items])))

(rf/reg-event-db
 ::add-item
 (fn [db [_ id]] (update db ::items conj id)))

(rf/reg-event-db
 ::delete-item
 (fn [db [_ id]] (update db ::items #(remove #{id} %))))

(defn controls []
  (let [id (atom 0)]
    (fn []
      [:div 
       [:a {:on-click #(do (rf/dispatch [::add-item (inc @id)])
                           (swap! id inc))} "Add"] " " 
       [:a {:on-click #(do (rf/dispatch [::delete-item @id])
                           (swap! id dec))} "Delete"] " "])))

(rdom/render [app-container [controls] [items]]
             (js/document.getElementById "item-counter-basic"))
</div>

<div id="item-counter-basic"></div>

Now, imagine your business adds some requirements:

- At least 1 item per person.
- No more than 3 items per person.

First things first, we express these requirements as data:

<div class="cm-doc">
(def base-requirements {:min-items 0 :max-items 3})
</div>

Then, we'll use a flow to evaluate which requirements are met.

Note that the requirements aren't about what *happens*, only what things *are*.
In other words, it's your app *state* that matters, not any particular event or view.
Our flow doesn't care how it happened that a requirement was met, nor what to do next.

For reasons that will become clear, let's write a [factory function](https://en.wikipedia.org/wiki/Factory_%28object-oriented_programming%29) for this flow:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(defn error-state-flow [{:keys [min-items max-items] :as requirements}]
  {:id ::error-state
   :path [::error-state]
   :inputs {:items [::items]
            :tab :current-tab}
   :output (fn [_ {:keys [items]}]
             (let [ct (count items)]
               (cond
                 (> ct max-items)  :too-many
                 (<= ct min-items) :not-enough                 
                 :else             :ok)))
   :live? (fn [db {:keys [tab]}]
            (= tab :item-counter))})
</div>

And start running a flow that fits our base requirements:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow (error-state-flow base-requirements))
</div>

Now this flow is calculating an error-state value, and adding it to `app-db` after every event (that is, as long as you're on the `:item-counter` tab, and the `:items` or the `:tab` have changed).

Let's update the app to display our new error state:

<div class="cm-doc">

(defn warning []
  (let [error-state (rf/sub :flow {:id ::error-state})]
    [:div {:style {:color "red"}}
     (->> @error-state
          (get {:too-many   "Too many items. Please remove one."
                :not-enough "Not enough items. Please add one."
                :ok         [:br]}))]))

(defn item-counter []
  [:<> [controls] [warning] [items]])

(defn tabbed-app-with-error []
  [:div
   [tab-picker]
   [debug-app-db]
   (case @current-tab
     :room-calculator [room-calculator]
     :item-counter [item-counter]
     nil)])

(rf/dispatch-sync [:init])
(rdom/render [app-container [tabbed-app-with-error]]
             (js/document.getElementById "item-counter-error"))
</div>

<div id="item-counter-error"></div>

Your app is working fine, until the next redesign.
Now, users should be able to choose how many items count as too many.
A little contrived, I know. But not uncommon from a programming perspective.

Luckily, our `error-state-flow` factory is flexible.
It can put together a new flow for any new requirement.

Therefore, building this new app is just a matter of triggering the `:reg-flow` effect with an updated flow.

We build a basic form with the power to change the requirement:

<div class="cm-doc">
(defn requirement-picker []
  [:<>
   "Max items: "
   [:input {:style {:background "lightgrey"}
            :type "number"
            :on-change #(rf/dispatch [:change-requirements
                                      {:max-items (-> % .-target .-value)}])}]])
</div>

And a corresponding event, which triggers our `:reg-flow` effect.

<div class="cm-doc">
(rf/reg-event-fx
 :change-requirements
 (fn [_ [_ new-requirements]]
   {:fx [[:reg-flow (error-state-flow (merge base-requirements new-requirements))]]})) 
</div>

What happens after `:reg-flow` runs? Are there now two flows? Actually, no.

Flow registration works just like interceptor registration. If you register a flow with the same `:id` as an existing flow, it replaces that flow. That means every time we trigger `:reg-flow (error-state-flow ...)`, not only does it register the new flow but it clears the old one. The old flow runs `:cleanup`, and the new flow runs `:init` and `:output`.

All this leads to a situation where not only does changing the inputs lead to new output, but so does changing the flow itself.
Let's test it out:

<div class="cm-doc">
(defn item-counter []
  [:<> [controls] [requirement-picker] [warning] [items]])

(defn tabbed-app-with-requirements []
  [:div
   [tab-picker]
   [debug-app-db]
   (case @current-tab
     :room-calculator [room-calculator]
     :item-counter [item-counter]
     nil)])

(rf/dispatch-sync [:init])
(rdom/render [app-container [tabbed-app-with-error]]
             (js/document.getElementById "item-counter-requirements"))
</div>

<div id="item-counter-requirements"></div>

## Semantics and Placefulness

> Have you been to Clevelinnati? No? Clevelinnati can be found at the geometric midpoint between Cleveland and Cincinnati. What's that, you say it's not on the map?
Well, no worries. Now that I've defined Clevelinnati for you, you'll know exactly how to get to get there... As long as Cleveland stays still.

At this point, we've fully explored the capabilities of flows. In this section, we'll consider the nuances of subscriptions, and how flows stand to solve some of their funtamental shortcomings. Let's find out how:

Introducing yet another demo app! Turns out, we were measuring the kitchen to fill it with balloons. It's a balloon prank planner app. Consider the following:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-sub
 ::kitchen-area
 (fn [db] (get-in db [:kitchen :area])))

(rf/reg-sub
 ::kitchen-height
 (fn [db] (get-in db [:kitchen :height])))

(rf/reg-sub
 ::kitchen-volume
 (fn [_] [(rf/subscribe [::kitchen-area]) (rf/subscribe [::kitchen-height])])
 (fn [area height] (* area  height)))

(rf/reg-sub
 ::num-balloons-to-fill-kitchen
 (fn [_] [(rf/subscribe [::kitchen-volume])])
 (fn [volume] (let [std-balloon-volume 2.5]
               (/ volume std-balloon-volume))))

(rf/reg-event-fx
 ::order-ballons-for-kitchen-prank
 (fn [{:keys [balloons-per-bag] :as cofx} _]
   (let [num-balloons-to-fill-kitchen :???     ;; How can I get this value???
         num-bags-to-buy (js/Math.ceil
                          (/ num-balloons-to-fill-kitchen
                             balloons-per-bag))]
     {:fx [[:amazon {:fn :order
                     :sku :balloon-bag
                     :ct num-bags-to-buy}]]})))
</div>

How can we get a correct value for `num-balloons-to-fill-kitchen`? You might try calling `(rf/subscribe [::num-balloons-to-fill-kitchen])`, but re-frame comes back with a warning about reactive context, and memory leaks... oh my!

#### Reactivity

We express some [business logic in subscriptions](https://github.com/day8/re-frame/issues/753), and some in events, but they're not really compatible.
Between subscriptions and events, there is a [coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/).

Subscriptions can only be accessed within a [reactive context](/re-frame/FAQs/UseASubscriptionInAnEventHandler).
Since an event handler isn't reactive, it can't access any subscriptions.

That means, to get a usable value for `num-balloons-to-fill-kitchen`, we have to duplicate all the business logic that we wrote into our subscriptions:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-event-fx
 ::order-ballons-for-kitchen-prank
 (fn [{:keys [balloons-per-bag] :as cofx} _]
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

#### Paths

A [layer-2](/re-frame/subscriptions/#the-four-layers) subscription basically *names* an `app-db` path. What does a layer-3 subscription *name*?

A materialized view, or a derived value.

Subscriptions occupy their own semantic domain, separate from `app-db`. Only view functions can we access this domain. Outside of views, they form an impenetrable blob.

So, re-frame is simple. `app-db` represents and *names* the state of your app. Except, so does this network of subscription names. But you can't really *use* those, so just forget about it.

#### A better way

The good news:

__You can access a flow's output value any time, anywhere,__ since flows are controlled by re-frame/interceptors, not reagent/reactions. Instead of thinking about reactive context, just think about when the latest event happened.

__If you know a flow's name, you know its output location,__ since flows store their output in `app-db`, at a static path. It doesn't matter how many other flows that flow depends on. The correct value simply stays where want it.

Like many Clojure patterns, flows are *both* nested *and* flat. Even though `::num-balloons-to-fill-kitchen` depends on other flows, we can access it directly:

<div class="cm-doc" data-cm-doc-no-eval-on-init data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-flow
 {:id ::kitchen-volume
  :inputs {:area [:kitchen :area]
           :height [:kitchen :height]}
  :output (fn [_ {:keys [area height]}]
            (* area height))
  :path [:kitchen :volume]})

(rf/reg-flow
 {:id ::num-balloons-to-fill-kitchen
  :inputs {:volume ::kitchen-volume}
  :output (fn [_ {:keys [volume]}]
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
