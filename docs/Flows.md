> This is an experimental, proposed feature for re-frame.
> We'd love to hear your feedback!
> Please join our discussions on [github](https://github.com/day8/re-frame/discussions/795) and [slack](https://clojurians.slack.com/archives/C073DKH9P/p1698792674379499).

---

This tutorial introduces **Flows**, part of [Domino 3](http://localhost:8000/re-frame/dominoes-30k/#domino-3-effect-handling) (effects).

!!! Note "Not to be confused with..."
    - [re-frame-async-flow-fx](https://github.com/day8/re-frame-async-flow-fx). A `re-frame/flow` is totally sychronous, running on every event.
    - The [on-changes interceptor](/re-frame/api-re-frame.core/#on-changes). Flows are an evolution of this idea.
    - [domino](https://github.com/domino-clj/domino). Another take on dataflow programming, inspired by re-frame.

A **Flow** calculates a derived value "automatically".  
When one part of the application state changes, another part is recalculated.  
More concretely, when the values change at one or more paths within `app-db`, then the value at another path is automatically recalculated.

!!! Note "The DataFlow Paradigm"
    The dataflow programming paradigm emerged in the 1970s, so it is almost as foundational as functional programming. 
    Indeed, reactive programming - so much the rage these days - is simply a subset of dataflow programming. 
    Both the functional and dataflow paradigms have profoundly influenced the design of re-frame. 
    There's a reason `re-frame's` tagline is "derived data, flowing".

## A flow literal

Re-frame uses flows to change your app's state, but a `flow` itself is an immutable value.

Here's a basic `flow`. It describes how to derive the area of a room from its dimensions:

<div class="cm-doc" data-cm-doc-no-result>
{:id     :room-area
 :inputs {:w [:room :width]
          :h [:room :length]}
 :output (fn calc-area [previous-area {:keys [w h] :as inputs}]
           (* w h))
 :path   [:room :area]}
</div>

- **`:id`** - uniquely identifies this flow.
- **`:inputs`** - a map of `app-db` paths to observe for changes.
- **`:output`** - calculates the new derived value. Accepts the previous result, and a map of input values.
- **`:path`** - denotes *where* the derived value should be stored.

Every event, when the values of `:inputs` change, `:output` is run, and the result is stored in `app-db` at `:path`.

## A Basic Example

To show `Flows` in action, let's do some live coding. First, we add the necessary `requires` (`reg-flow` is still in the `alpha` namespace):

<div class="cm-doc">
(ns re-frame.example.flows
  (:require [re-frame.alpha :as rf]
            [reagent.dom.client :as rdc]))
</div>

And, here's the code for our app: the user can enter `height` and `width` values and, in response, they see `area`: 

<div class="cm-doc">
(rf/reg-sub      :width  (fn [db [_ room]]    (get-in db [room :width])))
(rf/reg-sub      :length (fn [db [_ room]]    (get-in db [room :length])))
(rf/reg-event-db :inc-w  (fn [db [_ room]] (update-in db [room :width] inc)))
(rf/reg-event-db :inc-h  (fn [db [_ room]] (update-in db [room :length] inc)))
(rf/reg-event-db :init   (fn [db [_ room]] (-> db
                                              (update :kitchen merge {:width 10 :length 15})
                                              (update :garage merge {:width 20 :length 20}))))

(def clickable
  {:cursor "pointer" :border "2px solid grey" :user-select "none"})

(defn room-form [room]
  [:form
   [:h4 room " calculator"]
   "width:"
   @(rf/subscribe [:width room])
   [:span {:style clickable
           :on-click #(rf/dispatch [:inc-w room])} "+"]
   [:br]
   "length:"
   @(rf/subscribe [:length room])
   [:span {:style clickable
           :on-click #(rf/dispatch [:inc-h room])} "+"]])
</div>

## Registering a flow

Now the interesting part, we use `reg-flow`: 

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(def garage-area-flow
  {:id     :garage-area
   :inputs {:w [:garage :width]
            :h [:garage :length]}
   :output (fn area [previous-area {:keys [w h] :as inputs}]
             (* w h))
   :path   [:garage :area]})

(rf/reg-flow garage-area-flow)
</div>

!!! Note "Arity-2 version"
    In addition to `(reg-flow flow)`, you can also call `(reg-flow id flow)`.
    This gives it a signature just like the usual `reg-event-` and `reg-sub` calls.
    Our example would look like `(reg-flow :garage-area {...})`.

We write a subscription for the flow's output `:path`:

<div class="cm-doc">
(rf/reg-sub
 :area
 (fn [db [_ room]] (get-in db [room :area])))
</div>

And, we use this subscription in a view: 

<div class="cm-doc">
(defn app-container [& children]
  (into [:div {:style {:padding "1rem"
                       :border  "2px solid grey"}}]
        children))

(defn room-calculator [room]
  [:div
   [room-form room]
   " Area:"
   @(rf/subscribe [:area room])])  ;;  <--- subscribing

(rf/dispatch-sync [:init])

(defonce garage-calculator-root
  (rdc/create-root (js/document.getElementById "garage-calculator")))

(rdc/render garage-calculator-root
            [app-container [room-calculator :garage]])
</div>

<div id="garage-calculator"></div>

## How does it work?

`event handlers` yield `effects`. Typically, they yield a `:db` effect, causing a new value of `app-db`.  
But first, re-frame updates your `:db` effect by running each registered `flow`.

!!! Note "Caution: implicit behavior ahead"
    Here, the tradeoff becomes clear. A `flow` can change `app-db` implicitly.
    This means the `:db` effect which you express in your event handlers may not match the actual `app-db` you'll get as a result.

Re-frame achieves this using an [interceptor](/re-frame/Interceptors/). Here's what it does:

- Destructure the current `app-db`, resolving the paths in `:inputs` 
    - this yields a value like `{:w 10 :h 15}`.
- Destructure the *previous* `app-db` as well, to see if any of these values have changed.
    - For instance, if it sees `{:w 11 :h 24}`, that means the inputs have changed. 
    - `{:w 10 :h 15}` would mean no change.
- *If* the inputs have changed:
    - Call the `:output` function, passing it the previous result, and the current `:inputs`.
    - Store the newly derived value (in this case, `150`) in `app-db`, at the `:path`.

Isn't that remarkable? What, you say it's *unremarkable?* Well, that's even better.

## Remarks

Reality check. Here's why this basic flow might not excite you:

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
       (assoc-in [:garage :width] w)
       (update :garage derive-area))))
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

### But really, why do I need flows?

Some apps do complex tasks, with deep layers of branching and looping. 
But most apps do simple things, as well. 
Many such tasks amount to synchronization - maintaining an invariant within a changing data structure.

And of course, a task which seems complex may just be a chain of simple tasks.

One relatable example is that of trying to maintain cascading error states. Imagine your UI has a validation rule: `start date` must be before `end date`. 
After the user changes either value, the error state must be calculated. This is used to determine if the `submit` button is enabled or not, and if an error message is displayed or not.

Now, imagine your UI has many validation rules, and an error state must be calculated for each of them. 
In this case, the submit button state is a secondary calculation which combines these error states. 
Cascading, derived values. 

Data flows from the leaves (what the user entered), through intermediate nodes (error predicate functions), through to the root (submit button state). 
Both the intermediate values and the root value are important.

### Is this a rules engine?

You might be tempted to view `Flows` as having something to do with a rules engine, but it absolutely isn't that. It is simply a method for implementing dataflow. Each value is derivative of other values, with multiple levels of that process arranged in a tree structure in which many leaf values contribute to a terminal root value (think submit button state!).

### Can't I just use subscriptions?

You could derive your garage's area with a [layer-3 subscription](/re-frame/subscriptions/#the-four-layers):

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(rf/reg-sub
 ::garage-area-sub
 (fn [_] [(subscribe [:width]) (subscribe [:length])])
 (fn [[w h] _] (* w h)))
</div>

Just like a `flow`, this subscription's value changes whenever the inputs change, and (obviously) you call `subscribe` to access that value.

A flow stores its `:output` value in `app-db`, while subscriptions don't. We designed re-frame on the premise that `app-db` holds your *entire* app-state. 
Arguably, derived values belong there too. We feel there's an inherent reasonability to storing everything in one place. 
It's also more practical (see [Reactive Context](#reactive-context).

Just like with layered subscriptions, one flow can use the value of another. Remember the `:inputs` to our first flow?

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:inputs {:w [:garage :width]
          :h [:garage :length]}}
</div>

## Layering flows

As you can see, vectors stand for paths in `app-db`. Single keywords, however, stand for *other flows*.

Here's a flow using two other flows as inputs: `::kitchen-area` and `::living-room-area`. When either input changes value, our flow calls the `:output` function to recalculate its own value:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:id     :main-room-ratio
 :inputs {:kitchen     (rf/flow-input ::kitchen-area)
          :living-room (rf/flow-input ::living-room-area)}
 :output (fn [_ {:keys [kitchen living-room]}]
           (/ kitchen living-room))
 :path   [:ratios :main-rooms]}
</div>

As before, once `:output` runs, the resulting value is stored at `:path`. So, the new value of `app-db` will contain a number at the path `[:ratios :main-rooms]`

For subscriptions, caching can be an issue (see [caching](#caching)). With flows, the process is simpler. 
`app-db` *is* the cache, since flows always store their output value within it. 
You, the programmer, define explicitly when to recalculate the output, *and* when to store the output. 
To this end, flows provide optional keys: `:live?`, `:init` and `:cleanup`. 
Let's read on, and discover how these keys work together to fully define the lifecycle and caching behavior of a flow:

## Living and Dying

> Between death... and arising... is found an existence— a "body"... that goes to the place of rebirth. This existence between two realms... is called intermediate existence.

> -- *Vasubandhu, on [bardos](https://en.wikipedia.org/wiki/Bardo)*

In practice, some flows are too expensive to run all the time. 
It can still be hard to predict when a flow will run, leading to defensive programming.
Sometimes we'd like to simply turn our flow off, so we can stop thinking about it.
For this, we use a `:live?` function.

The quote above deals with phenomenal life, but you can also think of `:live?` as in a tv or internet broadcast.
Data flows, but only when the flow itself is live.

Here's another room area flow:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow
 {:id     :kitchen-area
  :inputs {:w [:kitchen :width]
           :h [:kitchen :length]}
  :output (fn area [previous-area {:keys [w h] :as inputs}]
            (* w h))
  :path   [:kitchen :area]
  :live-inputs {:tab [:tab]}
  :live?  (fn [db {:keys [tab]}]
            (= tab :kitchen))})
</div>

Re-frame provides a global `:flow` subscription, which can fetch the output value for any flow:

A barebones tab picker, and something to show us the value of `app-db`:

<div class="cm-doc">
(def tabs [:kitchen :garage])

(def clickable-tab (into clickable {:padding "0.5rem"}))
(def active-tab (into clickable-tab {:color "green"}))

(rf/reg-sub :current-tab :-> :tab)
(rf/reg-event-db :change-tab (fn [db [_ tab]] (assoc db :tab tab)))

(defn tab [id current?]
  (let [current-tab (rf/sub :current-tab)]
    [:span {:style (if (= id @current-tab)
                     active-tab clickable-tab)
          :on-click #(rf/dispatch [:change-tab id])}
   (name id)]))

(defn tab-picker []
  (into [:div] (for [id tabs] [tab id])))

(defn tabbed-app []
  (let [current-tab (rf/sub :current-tab)]
    [:div
     [tab-picker @current-tab]
     (case @current-tab
       :kitchen [room-calculator :kitchen]
       :garage [room-calculator :garage]
       nil)]))
</div>

### Live?

Here's a more advanced version of our kitchen calculator flow.
This replaces our first `:kitchen-area` flow, since it has the same `:id`:


Notice the different types of inputs. `:w [:kitchen :width]` represents an input as an `app-db` path, while `:tab :current-tab` identifies the value from the `:current-tab` flow we defined earlier.

Also, notice the new `:tab` input, and the new `:live?`.

Just like `:output`, `:live:?` is a function of `app-db` and the `:inputs`. Re-frame only calculates the `:output` when the `:live?` function returns a truthy value. Otherwise, the flow is presumed dead.

Let's test it out:

<div class="cm-doc">
(defn debug-app-db []
  [:pre
   {:style {:font-size 12 :margin "1rem" :white-space "pre-wrap"}}
   (str @re-frame.db/app-db)])

(rf/dispatch-sync [:init])

(defonce tabbed-app-root (rdc/create-root (js/document.getElementById "tabbed-app")))

(rdc/render tabbed-app-root [app-container [debug-app-db]
                                           [tabbed-app]])
</div>

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

<div class="cm-doc" data-cm-doc-no-result>
:cleanup (fn [db path]
           (assoc-in db path :unknown!))
</div>

By default, `:cleanup` dissociates the path from `app-db`. By declaring this `:cleanup` key in your flow, you override that default function. Now, instead of removing `:area`, you set it to `:unknown!`.

Now, is this a good idea? After all, we might consider the area known, as long as we know the width and length. Maybe we should do no cleanup, and keep the value, even when `:live?` returns false. In that case, our `:cleanup` function would simply be: `:cleanup (fn [db _] db)`.

The point is, *you* express when the signal lives or dies, not your render tree.

### Init

`:init`, does nothing by default. Feel free to try out this custom `:init` function as well. Notice how it adds a key, and that key stays, regardless of our flow being dead or alive:

<div class="cm-doc" data-cm-doc-no-result>
:init (fn [db path]
        (assoc-in db (conj (vec (butlast path)) :initiated?) true))
</div>

If you did want the `:initiated?` key to go away, you could handle that within `:cleanup`.

It's common to design apps which prepare certain db paths when a high-level state changes, such as when switching tabs. With flows, this preparation is an official library feature. Instead of writing custom events, you can use the `:cleanup` and `:init` keys and your colleagues will know exactly what you're doing.

## Redefining and Undefining

Not only do flows have a lifecycle (defined by `:live?`, `:init` and `:cleanup`), but this lifecycle also includes registration and deregistration.

- When you call `reg-flow`, that flow comes alive.
    - `:init` and `:output` run, even if the inputs haven't changed.
    - That's because the flow itself has changed.
- When you call `clear-flow`, it dies (running `:cleanup`).
- Re-frame provides `:reg-flow` and `:clear-flow` [effects](#re-frame/Effects/) for this purpose.

Here's another demonstration. Think of it as a stripped-down todomvc.
You can add and remove items in a list:
<div class="cm-doc">
(rf/reg-sub ::items :-> (comp reverse ::items))

(rf/reg-event-db
 ::add-item
 (fn [db [_ id]] (update db ::items conj id)))

(rf/reg-event-db
 ::delete-item
 (fn [db [_ id]] (update db ::items #(remove #{id} %))))

(defn item [id] [:div "Item" id])

(defn items []
  (into [:div] (map item) @(rf/subscribe [::items])))

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

!!! Note "State, not events"
    These requirements aren't about what *happens*, only what things *are*.
    It's your app *state* that matters, not any particular event or view.
    Our flow doesn't care how it happened that a requirement was met, nor what to do next.

For reasons that will become clear, let's write a [factory function](https://en.wikipedia.org/wiki/Factory_%28object-oriented_programming%29) for this flow. 
It builds a flow that validates our item list against the requirements:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(defn error-state-flow [{:keys [min-items max-items] :as requirements}]
  {:id ::error-state
   :path [::error-state]
   :inputs {:items [::items]
            :tab (rf/flow-input :current-tab)}
   :output (fn [_ {:keys [items]}]
             (let [ct (count items)]
               (cond
                 (> ct max-items)  :too-many
                 (<= ct min-items) :not-enough
                 :else             :ok)))})
</div>

And register a flow that fits our base requirements:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow (error-state-flow base-requirements))
</div>

Now this flow is calculating an error-state value, and adding it to `app-db` after every event. 
This happens as long as the `::items` have changed... right? 
Actually, there's another way to make a flow recalculate - we can reregister it.

Let's update the app to display our new error state:

<div class="cm-doc">

(defn warning []
  (let [error-state (rf/sub :flow {:id ::error-state})]
    [:div {:style {:color "red"}}
     (->> @error-state
          (get {:too-many   "Too many items. Please remove one."
                :not-enough "Not enough items. Please add one."
                :ok         [:br]}))]))

(rf/dispatch-sync [:init])

(defonce item-counter-error-root 
  (rdc/create-root (js/document.getElementById "item-counter-error")))

(rdc/render item-counter-error-root
            [app-container [debug-app-db] [controls] [warning] [items]])
</div>

<div id="item-counter-error"></div>

Your app is working fine, until your next design meeting.
Now they want a way to change the max item limit.
A little contrived, I know. But not uncommon from a programming perspective.

Luckily, our flow factory can make a new flow for any requirement. 
Therefore, putting in this feature is just a matter of triggering the `:reg-flow` effect.

We build a basic form to change the requirement:

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

And a corresponding event, which triggers our `:reg-flow` effect:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-event-fx
 :change-requirements
 (fn [_ [_ new-requirements]]
   {:fx [[:reg-flow (error-state-flow (merge base-requirements new-requirements))]]})) 
</div>

What happens after `:reg-flow` runs? Are there now two flows? Actually, no.

- If you register a new flow with the same `:id`, it replaces the old one. 
- When we trigger `[:reg-flow (error-state-flow ...)]`
    - The old `:error-state` flow runs `:cleanup`
    - The new `:error-state` flow runs `:init` and `:output`

Not only does changing the inputs lead to new output, but so does changing the flow itself.
Let's test it out:

<div class="cm-doc">
(rf/dispatch-sync [:init])

(defonce item-counter-requirements-root
  (rdc/create-root (js/document.getElementById "item-counter-requirements")))

(rdc/render item-counter-requirements-root
            [app-container [debug-app-db] [controls] [requirement-picker] [warning] [items]])
</div>

<div id="item-counter-requirements"></div>

## Advanced topics - Semantics, Place and State

> Have you been to Clevelinnati? No? Clevelinnati can be found at the geometric midpoint between Cleveland and Cincinnati. What's that, you say it's not on the map?
Well, no worries. Now that I've defined Clevelinnati for you, you'll know exactly how to get to get there... As long as Cleveland stays still.

At this point, we've fully explored the capabilities of flows. In this section, we'll consider the nuances of subscriptions, and how flows stand to solve some of their fundamental shortcomings. Let's find out how:

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

Remember our [story so far](#the-story-so-far)? Turns out, it's not so simple. 
Not only do *state changes* cause *rendering*, but *rendering* also causes *state changes*.
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

The good news:

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
