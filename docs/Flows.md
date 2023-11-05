> This is an experimental, proposed feature for re-frame.
> We'd love to hear your feedback!
> Please join our discussions on [github](https://github.com/day8/re-frame/discussions/795) and [slack](https://clojurians.slack.com/archives/C073DKH9P/p1698792674379499).

---

## The Story So Far 

1. **Users** cause **Events**
2. **Events** cause **Effects**
3. **Effects** cause **State Changes**
4. **State Changes** cause **View rerendering**

## Flows

This tutorial introduces `Flows`, which occur in step 3 after an effect changes `app-db`.

A `Flow` calculates a derived value "automatically".
When one part of the application state changes, another part is recalculated.
More concretely, when the values change at one or more paths within `app-db`, then the value at another path is recalculated automatically.

`re-frame's` tagline is "derived values, flowing", and `Flows` implement dataflow. But note:  these is synchronous dataflow, not to be confused with [async flows](https://github.com/day8/re-frame-async-flow-fx).

## Why?

`Flows` help you to maintain the integrity of data derived from multiple other pieces of data.

One easily relatable usecase is of trying to maintain cascading error states. Imagine your UI has a validation rule: `start date` must be before `end date`. 

After a change to the value of either `start date` or `end date`, 
an error value must be calculated, and it will be used to determine if the `submit` button is enabled or not, and if an error message 
is displayed or not.

Now, make it more complicated. Imagine your UI has more than one validation rule and that each is a function of multiple different values. Now, there are many error states to be calculated, 
one for each rule, and the submit button state is a calculation involving all the error states combined. Cascading, derived values - a multi-step dataflow.

On any data entry, all the rules should be reevaluated to 
determine if they are broken (derived values!). If they are, then particular messages should be generated (more derived values!).
Then, in the final step, the state of the submit button should be determined (another derived value!) from the error state of all the rules (previously derived!). 

So, cascading error states is a generic, relatable example, but there will be many other, domain-specific examples also neatly handled by `Flows`.

Warning: given the wording above, some end up thinking of `Flows` as having something to do 
with a rules/logic engine, but it absolutely isn't that. It is just a method for implementing dataflow.

## Flow Specification

`Flows` are registered using `reg-flow`, which is part of the re-frame API.  You call it with a single argument, which is the `flow specification` - a map - defining: 

- the input paths to be monitored for change
- a function to call to calculate the new derived value
- a path where the derived value should be placed

Here's an example specification to automatically calculate the `area` of a room from `width` and `height`:

<div class="cm-doc" data-cm-doc-no-result>
{:id     :room-area
 :inputs {:w [:room :width]
          :h [:room :length]}
 :output (fn calc-area [previous-area {:keys [w h] :as inputs}]
           (* w h))
 :path   [:room :area]}
</div>

Notes:

- `:inputs` is a map from keywords (identifiers) to `app-db` paths
- When the values at the `:inputs` paths change, the `:output` function is called to calculate a new derived value. It is called with two args:
    - any previously calculated derived value  (ignored in the code above)
    - a map with the same keys as `:inputs` and, for each, the current value from `app-db` at the associated path. 
- The newly calculated, returned, derived value (`area` in the example - the output of the function call) is put back into `app-db` at `:path` 

## When Does This All Happen?

`event handlers` create `effects`, and, typically, one is a change to `app-db`.  Immediately after `app-db` is changed, flows are "run". That's why above I called Flows step 3.b. When `Flows` are `run`, input paths in `app-db` are checked for changes, and where necessary, output values are recalculated and put into `app-db`.

So, because of Flows, effects to `app-db` can cause further effects to `app-db`. And, yes, if necessary, the effects of one flow can feed into another flow - the `:path` output of one flow can be one of the  `:inputs` of another flow.

## A Basic Example

To show `Flows` in action, let's do some live coding. First, we add the necessary `requires` (`reg-flow` is still in the `alpha` namespace):

<div class="cm-doc">
(ns re-frame.example.flows
  (:require [re-frame.alpha :as rf]
            [reagent.dom.client :as rdc]))
</div>

And, here's the code for our app: the user can enter `height` and `width` values and, in response, they see `area`: 

<div class="cm-doc">
(rf/reg-sub      :width  (fn [db _]    (get-in db [:kitchen :width])))
(rf/reg-sub      :length (fn [db _]    (get-in db [:kitchen :length])))
(rf/reg-event-db :inc-w  (fn [db _] (update-in db [:kitchen :width] inc)))
(rf/reg-event-db :inc-h  (fn [db _] (update-in db [:kitchen :length] inc)))
(rf/reg-event-db :init   (fn [db _] {:kitchen {:width 20 :length 20}}))

(def clickable
  {:cursor "pointer" :border "2px solid grey" :user-select "none"})

(defn dimension-fields []
  [:form
   [:h4 "Kitchen Calculator"]
   "width:"
   @(rf/subscribe [:width])
   [:span {:style clickable
           :on-click #(rf/dispatch [:inc-w])} "+"]
   [:br]
   "length:"
   @(rf/subscribe [:length])
   [:span {:style clickable
           :on-click #(rf/dispatch [:inc-h])} "+"]])
</div>

Now the interesting part, we use `reg-flow`: 

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(def kitchen-area-flow-specification
  {:id     :kitchen-area
   :inputs {:w [:kitchen :width]
            :h [:kitchen :length]}
   :output (fn area [previous-area {:keys [w h] :as inputs}]
             (* w h))
   :path   [:kitchen :area]})

(rf/reg-flow kitchen-area-flow-specification)
</div>

We write a subscription for the flow's output `:path`:

<div class="cm-doc">
(rf/reg-sub
 ::kitchen-area
 (fn [db _] (get-in db [:kitchen :area])))
</div>

And, we use this subscription in a view: 

<div class="cm-doc">
(defn app-container [& children]
  (into [:div {:style {:padding "1rem"
                       :border  "2px solid grey"}}]
        children))

(defn room-calculator []
  [:div
   [dimension-fields]
   " Area:"
   @(rf/subscribe [::kitchen-area])])  ;;  <--- subscribing

(rf/dispatch-sync [:init])

(defonce room-calculator-root
  (rdc/create-root (js/document.getElementById "room-calculator")))

(rdc/render room-calculator-root
            [app-container [room-calculator]])
</div>

<div id="room-calculator"></div>
  

Isn't that remarkable? What, you say it's *unremarkable?* Well, that's even better.

## Remarks

Here's why this basic flow might not excite you:

### Can't I just use events?

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


*Design is all tradeoffs*. Flows allow us to say "This value simply derives from these inputs. It simply changes when they do." We do this at the expense of some "spooky action at a distance" - in other words, we accept that no particular event will be responsible for that change.


### Are flows just reactions?

You might notice a similarity with [reagent.core/reaction](https://reagent-project.github.io/docs/master/reagent.core.html#var-reaction).

Both yield an "automatically" changing value. 

Reagent controls *when* a reaction updates, presumably during the evaluation of a component function.
Flows, on the other hand, are controlled by re-frame, running every time an `event` occurs.

When a component derefs a reaction, that component knows to re-render when the value changes.

You can't deref a flow directly. It doesn't emit a value directly to any caller. 
Instead, it emits a new version of `app-db`. The rest of your app reacts to `app-db`, not your flow.

### Can't I just use subscriptions?

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

For subscriptions, caching can be an issue (see [caching](#caching)). With flows, the process is simpler. `app-db` *is* the cache, since flows always store their output value within it. You, the programmer, define explicitly when to recalculate the output, *and* when to store the output. To this end, flows provide optional keys: `:live?`, `:init` and `:cleanup`. Let's read on, and discover how these keys work together to fully define the lifecycle and caching behavior of a flow:

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

(def clickable-tab (into clickable {:padding "0.5rem"}))
(def active-tab (into clickable-tab {:color "green"}))

(defn tab [id]
  [:span {:style (if (= id @current-tab)
                   active-tab clickable-tab)
          :on-click #(rf/dispatch [:change-tab id])}
   (name id)])

(defn tab-picker []
  (into [:div] (for [id tabs] [tab id])))

(defn debug-app-db []
  [:pre
   {:style {:font-size 12 :margin "1rem" :white-space "pre-wrap"}}
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

### Live?

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

Just like `:output`, `:live:?` is a function of `app-db` and the `:inputs`. Re-frame only calculates the `:output` when the `:live?` function returns a truthy value. Otherwise, the flow is presumed dead.

Let's test it out:

<div class="cm-doc" data-cm-doc-no-eval-on-init>
(rf/dispatch-sync [:init])

(defonce tabbed-app-root (rdc/create-root (js/document.getElementById "tabbed-app")))

(rdc/render tabbed-app-root
            [app-container [tabbed-app]])
</div>

!!! Note "Click `eval` on the two code blocks above to start this app."

<div id="tabbed-app"></div>

Try switching tabs. Notice how `:area` only exists when you're in the `room-calculator` tab. What's happening here?

### Lifecycle

After handling an event, re-frame runs your flows. First, it evaluates `:live?`, using the new `app-db`.
Depending on the return value of `:live?`, re-frame handles one of 4 possible state transitions:

| transition | action | 
|---|---|
| From **live** to **live** |  run `:output` | 
| From **dead** to **live** |  run `:init` and `:output` |
| From **live** to **dead** |  run `:cleanup` |
| From **dead** to **dead** |  do nothing |

Basically, *living* flows get output, *dying* flows get cleaned up, *arising* flows get initiated and output.

And independently of all this, `:output` only runs when `:inputs` have changed value.

### Cleanup

Try adding this `:cleanup` key into the `:kitchen-area` flow above (be sure to `eval` the code block again).

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
:cleanup (fn [db path]
           (assoc-in db path :unknown!))
</div>

By default, `:cleanup` dissociates the path from `app-db`. By declaring this `:cleanup` key in your flow, you override that default function. Now, instead of removing `:area`, you set it to `:unknown!`.

Now, is this a good idea? After all, we might consider the area known, as long as we know the width and length. Maybe we should do no cleanup, and keep the value, even when `:live?` returns false. In that case, our `:cleanup` function would simply be: `:cleanup (fn [db _] db)`.

The point is, *you* express when the signal lives or dies, not your render tree.

### Init

`:init`, does nothing by default. Feel free to try out this custom `:init` function as well. Notice how it adds a key, and that key stays, regardless of our flow being dead or alive:

<div class="cm-doc" data-cm-doc-no-result data-cm-doc-no-eval-on-init>
:init (fn [db path]
        (assoc-in db (conj (vec (butlast path)) :initiated?) true))
</div>

If you did want the `:initiated?` key to go away, you could handle that within `:cleanup`.

It's common to design apps which prepare certain db paths when a high-level state changes, such as when switching tabs. With flows, this preparation is an official library feature. Instead of writing custom events, you can use the `:cleanup` and `:init` keys and your colleagues will know exactly what you're doing.

### Dedicated inputs

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
  [:div "Item" id])

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
       [:span {:style clickable
               :on-click #(do (rf/dispatch [::add-item (inc @id)])
                              (swap! id inc))} "Add"] " " 
       [:span {:style clickable
               :on-click #(do (rf/dispatch [::delete-item @id])
                              (swap! id dec))} "Delete"] " "])))

(defonce item-counter-basic-root
  (rdc/create-root (js/document.getElementById "item-counter-basic")))

(rdc/render item-counter-basic-root
            [app-container [controls] [items]])
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

<div class="cm-doc" data-cm-doc-no-eval-on-init>

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

(defonce item-counter-error-root 
  (rdc/create-root (js/document.getElementById "item-counter-error")))

(rdc/render item-counter-error-root
            [app-container [tabbed-app-with-error]])
</div>

!!! Note "Click `eval` on the code block above to start this app."

<div id="item-counter-error"></div>

Your app is working fine, until the next redesign.
Now, users must be able to choose the maximum item limit.
A little contrived, I know. But not uncommon from a programming perspective.

Luckily, our `error-state-flow` factory is flexible.
It can put together a new flow for any new requirement.

Therefore, building this new app is just a matter of triggering the `:reg-flow` effect with an updated flow.

We build a basic form with the power to change the requirement:

<div class="cm-doc">
(defn requirement-picker []
  [:<>
   "Max items: "
   [:input
    {:style {:background "lightgrey"}
     :type "number"
     :on-change #(rf/dispatch
                  [:change-requirements
                   {:max-items (-> % .-target .-value)}])}]])
</div>

And a corresponding event, which triggers our `:reg-flow` effect.

<div class="cm-doc" data-cm-doc-result-format="pass-fail" data-cm-doc-no-eval-on-init>
(rf/reg-event-fx
 :change-requirements
 (fn [_ [_ new-requirements]]
   {:fx [[:reg-flow (error-state-flow (merge base-requirements new-requirements))]]})) 
</div>

What happens after `:reg-flow` runs? Are there now two flows? Actually, no.

Flow registration works just like interceptor registration. If you register a flow with the same `:id` as an existing flow, it replaces that flow. That means every time we trigger `:reg-flow (error-state-flow ...)`, not only does it register the new flow but it clears the old one. The old flow runs `:cleanup`, and the new flow runs `:init` and `:output`.

All this leads to a situation where not only does changing the inputs lead to new output, but so does changing the flow itself.
Let's test it out:

<div class="cm-doc" data-cm-doc-no-eval-on-init>
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

(defonce item-counter-requirements-root
  (rdc/create-root (js/document.getElementById "item-counter-requirements")))

(rdc/render item-counter-requirements-root
            [app-container [tabbed-app-with-error]])
</div>

!!! Note "Click `eval` on the two code blocks above to start this app."

<div id="item-counter-requirements"></div>

## Semantics, Place and State

> Have you been to Clevelinnati? No? Clevelinnati can be found at the geometric midpoint between Cleveland and Cincinnati. What's that, you say it's not on the map?
Well, no worries. Now that I've defined Clevelinnati for you, you'll know exactly how to get to get there... As long as Cleveland stays still.

At this point, we've fully explored the capabilities of flows. In this section, we'll consider the nuances of subscriptions, and how flows stand to solve some of their fundamental shortcomings. Let's find out how:

Introducing yet another demo app! Turns out, we were measuring the kitchen to fill it with balloons. It's a balloon prank planner app. Consider the following:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
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

### Reactivity

We express some [business logic in subscriptions](https://github.com/day8/re-frame/issues/753), and some in events, but they're not really compatible.
Between subscriptions and events, there is a [coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/).

Subscriptions can only be accessed within a [reactive context](/re-frame/FAQs/UseASubscriptionInAnEventHandler).
Since an event handler isn't reactive, it can't access any subscriptions.

Furthermore, subscriptions have an `input-signals` function. This allows the value of one subscription to flow into another. But events have no such thing.

That means, to get a usable value for `num-balloons-to-fill-kitchen`, we have to duplicate the business logic that we wrote into our subscription, along with the *entire* subgraph of inputs which our subscription is composed of:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
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

Subscriptions have a hidden caching mechanism, which stores the value as long as there is a component in the render tree which uses it. Basically, when components call `subscribe` with a particular `query-v`, re-frame sets up a callback. When those components unmount, this callback deletes the stored value. It removes the subscription from the graph, so that it will no longer recalculate. This is a form of [reference counting](https://en.wikipedia.org/wiki/Reference_counting) - once the last subscribing component unmounts, then the subscription is freed.

This often works as intended, and nothing gets in our way. It's elegant in a sense - a view requires certain values, and those values only matter when the view exists. And vice versa. You can't But when these values are expensive to produce or store, their existence starts to matter. The fact that some view is creating and destroying them starts to seem arbitrary. Subscriptions don't *need* to couple their behavior with that of their calling components.

The easy, automatic lifecycle behavior of subscriptions comes with a coupling of concerns. You can't directly control this lifecycle. You have to contol it by proxy, by mounting and unmounting your views. You can't *think* about your signal graph without thinking about views first.

The `app-db` represents your business state, and signals represent outcomes of your business logic. Views are just window dressing. We're tired of designing our whole business to change every time we wash the windows!

### Paths

A [layer-2](/re-frame/subscriptions/#the-four-layers) subscription basically *names* an `app-db` path. What does a layer-3 subscription *name*?

A materialized view, or a derived value.

Subscriptions occupy their own semantic domain, separate from `app-db`. Only within view functions (and other subscriptions) can we access this domain. Outside of views, they form an impenetrable blob.


!!! Note "Prior art"
    We built a rudimentary version of this pattern some years ago: the [on-changes interceptor](/re-frame/api-re-frame.core/#on-changes)

So, re-frame is simple. `app-db` represents and *names* the state of your app. Except, so does this network of subscription names. But you can't really *use* those, so just forget about it.

### Statefulness

Remember our [story so far](#the-story-so-far)? Turns out, it's not so simple. 
Not only do *state changes* cause *rendering*, but *rendering* also causes *state changes*.
Specifically, render logic changes the state of subscriptions.

Your app's actual story might go something like this:

> An event fires. A subscription runs. An outer component passes new props to an inner one. A reaction runs. Another reaction runs. A component unmounts. That subscription disposes, clearing its cache.

Sound [familiar](https://github.com/day8/re-frame/discussions/776)?

> Then, the same event fires. Another component mounts. The same subscription runs. Its calculation is heavy, so your app lags every time.
> "Wait," you ask, "what happened to the cache? Why is my subscription recalculating when its inputs are the same?"
> After a lot of headscratching, you find out it's because the subscription itself is not the same. Render logic caused it to dispose, and a new one took its place.

This isn't a bug, nor is it inevitable, but in our experience, complexity adds up fast. Once Reagent, Re-frame and React begin to share the concern of reactive dataflow, they can race, or play chicken. I'll react if you do! Can't run me if I unmount you first! Can't unmount me if I run you first!

When a view calls `subscribe`, it creates a reaction. When that view unmounts, it frees the reaction. These are side-effects on the signal *graph* (that is, the graph of all subscriptions which are actively re-calculating their output when their inputs change, and storing their output value).

```
event -> app-db -> signals -> view -> event
                                  ∟-> signal graph -> signals -> view
```

Something is looping in on itself here:

- The value of `app-db` determines when a view lives or dies.
- *And*, the value of a view determines when a signal lives or dies. 
- *And*, the value of a signal determines when a view lives or dies.

If views are fully determined by the value of `app-db`, when why have signals be determined by views? 
Why not simply have `app-db` determine everything?

`event -> app-db -> signal graph -> signals -> view -> event`

### A better way

The good news:

__You can access a flow's output value any time, anywhere,__ since flows are controlled by re-frame/interceptors, not reagent/reactions. Instead of thinking about reactive context, just think about when the latest event happened.

__If you know a flow's name, you know its output location,__ since flows store their output in `app-db`, at a static path. It doesn't matter how many other flows that flow depends on. The correct value simply stays where you put it.

__A flow's lifecycle is a pure function of `app-db`__ (technically, `app-db` and `:inputs`, but `:inputs` themselves are pure functions of `app-db`, whether they be paths or other flows). That means you explicitly define when a flow lives, dies, is registered or cleared-- *not* React.

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
