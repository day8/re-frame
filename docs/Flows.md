> This is an experimental, proposed feature for re-frame.
> You can use flows today, with the [re-frame alpha](/re-frame/FAQs/alpha.md)
> We'd love to hear your feedback!
> Please join our discussions on [github](https://github.com/day8/re-frame/discussions/795) and [slack](https://clojurians.slack.com/archives/C073DKH9P/p1698792674379499).

---

This tutorial introduces **Flows**, part of [Domino 3](http://localhost:8000/re-frame/dominoes-30k/#domino-3-effect-handling) (effects).

!!! Note "Not to be confused with..."
    - [re-frame-async-flow-fx](https://github.com/day8/re-frame-async-flow-fx). A `re-frame/flow` is totally synchronous, running on every event.
    - The [on-changes interceptor](/re-frame/api-re-frame.core/#on-changes). Flows are an evolution of this idea.
    - [domino](https://github.com/domino-clj/domino). Another take on dataflow programming, inspired by re-frame.

## What are flows?

A **flow** describes how to derive a value from other values.  
When one part of your app state changes, another part changes in response.  
More concretely, when the values change at one or more paths within `app-db`,
then the value at another path is "automatically" recalculated.

## Why do we need flows?
We turn to flows when we need a dynamic relationship between values - a ["difference which makes a difference"](http://faculty.washington.edu/jernel/521/Form.htm).

For instance, how would you model this problem?

- a `length` and a `width` make an `area`
- changing either value changes the `area`
- deleting either value deletes the `area`
- a bad value invalidates the `area`
- leaving the page deletes the `area`

In re-frame, [data coordinates functions](/re-frame/re-frame/). 
Here, we need multiple data sources (`length`, `width`) to coordinate a single function (`area`).
A subscription could do this, but with [caveats](/re-frame/flows-advanced-topics#reactive-context).

We think flows offer a [Better Way](/re-frame/flows-advanced-topics#a-better-way), both simpler and more practical.

!!! Note "The DataFlow Paradigm"
    Dataflow programming emerged in the 1970s, so it is almost as foundational as functional programming. 
    Indeed, reactive programming - so much the rage these days - is simply a subset of dataflow programming. 
    In contrast with imperative building blocks like `if/then`, `next` and `goto`,
    dataflow programming implements control flow via the propagation of change.
    Both the functional and dataflow paradigms have profoundly influenced the design of re-frame. 
    Hence, `re-frame's` tagline: "derived data, flowing".


## A Basic Flow

Here's a basic `flow`. It describes how to derive the area of a room from its dimensions:

<div class="cm-doc" data-cm-doc-no-result>
{:id     :room-area
 :inputs {:w [:room :width]
          :h [:room :length]}
 :output (fn calc-area [{:keys [w h] :as inputs}]
           (* w h))
 :path   [:room :area]}
</div>

- **`:id`** - uniquely identifies this flow.
- **`:inputs`** - a map of `app-db` paths to observe for change.
- **`:output`** - calculates the new derived value.
    - Takes a map of resolved inputs.
    - Simply takes `app-db` if there are no inputs.
- **`:path`** - denotes *where* the derived value should be stored.

On every event, when the values at `:inputs` change, `:output` is run, and the result is stored in `app-db` at `:path`.

## A Basic Example

To show `Flows` in action, let's do some live coding. 
First, we add the necessary `requires` (`reg-flow` is still in the `alpha` namespace):

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
(rf/reg-flow
  {:id     :garage-area
   :inputs {:w [:garage :width]
            :h [:garage :length]}
   :output (fn [{:keys [w h]}] (* w h))
   :path   [:garage :area]})
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
Flows, on the other hand, are part of [re-frame time](/re-frame/on-dynamics/#re-frame-time), running every time an `event` occurs.

When a component derefs a reaction, that component knows to re-render when the value changes.

You can't deref a flow directly. It doesn't emit a value directly to any caller.   
Instead, it emits a new version of `app-db`. The rest of your app reacts to `app-db`, not your flow.

### But really, why do I need flows?

Some apps do complex tasks, with deep layers of branching and looping. 
But most apps do simple things, as well. 
Many such tasks amount to synchronization - maintaining an invariant within a changing data structure.

And of course, a task which seems complex may just be a chain of simple tasks.

One relatable example is that of trying to maintain cascading error states. Imagine your UI has a validation rule: `start date` must be before `end date`. 
After the user changes either value, the error state must be calculated.
The result indicates whether to enable the submit button or display an error message.

Now, imagine your UI has many validation rules, each with its own error state. 
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
It's also more practical (see [Reactive Context](/re-frame/flows-advanced-topics#reactive-context)).

Just like with layered subscriptions, one flow can use the value of another. Remember the `:inputs` to our first flow?

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:inputs {:w [:garage :width]
          :h [:garage :length]}}
</div>

## Layering flows

In the values of the `:inputs` map, vectors stand for paths in `app-db`.
The `flow<-` function, however, gives us access to *other flows*.

Here's a flow using two other flows as inputs: `::kitchen-area` and `::living-room-area`.
When either input changes value, our flow calls the `:output` function to recalculate its own value:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
{:id     :main-room-ratio
 :inputs {:kitchen     (rf/flow<- ::kitchen-area)
          :living-room (rf/flow<- ::living-room-area)}
 :output (fn [{:keys [kitchen living-room]}]
           (/ kitchen living-room))
 :path   [:ratios :main-rooms]}
</div>

As before, once `:output` runs, the resulting value is stored at `:path`. 
So, the new value of `app-db` will contain a number at the path `[:ratios :main-rooms]`

Under the hood, flows relate to each other in a dependency graph. 
An input like `(rf/flow<- ::kitchen-area)` creates a dependency.
That means re-frame will always run `::kitchen-area` first, 
ensuring its output value is current before your `:main-room-ratio` flow can use it.

!!! Note "Our dataflow model"
    Dataflow is often conceptualized as a graph.
    Data flows through edges, and transforms through nodes.  
    Here's how our DSL articulates the traditional dataflow model:
    
    - `flow` - a map, serving as a node specification
    - `:id` - uniquely identifies a node
    - `:inputs` - a set of edges from other nodes
    - `flow<-` - declares another node id as an input dependency
    - `reg-flow` - creates a running node from a specification

    Crucially, the name `flow` isn't exactly short for "dataflow".
    A `flow` is a static value, specifying one possible segment of a dataflow graph.
    Dataflow is a [dynamic process](/re-frame/on-dynamics/#on-dynamics), not a value.
    Both the data and the graph itself can change over time.
    
    - Changing the data means running the flows which are currently registered.
    - Changing the graph is a matter of [registering and clearing](#redefining-and-undefining) flows.

## Subscribing to flows

In our examples so far, we've used a regular subscription, getting our flow's output path.
In `re-frame.alpha`, you can also subscribe to a flow by name.
This bypasses the [caching behavior](/re-frame/flows-advanced-topics#caching) of a standard subscription.

Here's how you can subscribe to our garage-area flow.
The stable way, with a query vector:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(re-frame.alpha/subscribe [:flow {:id :garage-area}])
</div>

And the experimental way, with a query map:

<div class="cm-doc" data-cm-doc-no-eval data-cm-doc-no-edit data-cm-doc-no-result>
(re-frame.alpha/sub :flow {:id :garage-area})
</div>

## Living and Dying

> Between death... and arising... is found an existence— a "body"... that goes to the place of rebirth. This existence between two realms... is called intermediate existence.

> -- *Vasubandhu, on [bardos](https://en.wikipedia.org/wiki/Bardo)*

In practice, some flows are too expensive to run all the time. 
It can still be hard to predict when a flow will run, leading to defensive programming.
Sometimes we'd like to simply turn our flow off, so we can stop thinking about it.
For this, we use a `:live?` function.

The quote above deals with phenomenal life, but you can also think of `:live?` as in a tv or internet broadcast.
Data flows, but only when the `flow` itself is live.

Let's try it out. For example, here's a barebones tab picker, and something to show us the value of `app-db`:

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

Here's a more advanced version of our room calculator flow.

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow
 {:id     :kitchen-area
  :inputs {:w [:kitchen :width]
           :h [:kitchen :length]}
  :output (fn [{:keys [w h]}] (* w h))
  :path   [:kitchen :area]
  :live-inputs {:tab [:tab]}
  :live?  (fn [{:keys [tab]}]
            (= tab :kitchen))})
</div>

Notice the new `:live-inputs` and `:live?` keys.
Just like `:output`, `:live:?` is a function of the resolved `:live-inputs`.

Re-frame only calculates the `:output` when the `:live?` function returns a truthy value. 
Otherwise, the flow is presumed dead.

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

Try switching tabs.
Notice how the path `[:kitchen :area]` only exists when you're in the **kitchen** tab. What's happening here?

### Lifecycle

After handling an event, re-frame runs your flows. First, it evaluates `:live?`, using the new `app-db`.
Depending on the return value of `:live?`, re-frame handles one of 4 possible state transitions:

| transition | action | 
|---|---|
| From **live** to **live** |  run `:output` (when `:inputs` have changed) | 
| From **dead** to **live** |  run `:output` |
| From **live** to **dead** |  run `:cleanup` |
| From **dead** to **dead** |  do nothing |

Basically, *arising* flows get output, *living* flows get output as needed, and *dying* flows get cleaned up.

### Cleanup

A `:cleanup` function takes `app-db` and the `:path`, and returns a new `app-db`. 

Try adding this `:cleanup` key into the `:kitchen-area` flow above (be sure to `eval` the code block again).

<div class="cm-doc" data-cm-doc-no-result>
:cleanup (fn [db path]
           (assoc-in db path :unknown!))
</div>

By default, `:cleanup` dissociates the path from `app-db`. By declaring this `:cleanup` key in your flow, you override that default function. Now, instead of removing `:area`, you set it to `:unknown!`.

Now, is this a good idea? After all, we might consider the area known, as long as we know the width and length. Maybe we should do no cleanup, and keep the value, even when `:live?` returns false. In that case, our `:cleanup` function would simply be: `:cleanup (fn [db _] db)`.

The point is, *you* express when the signal lives or dies, not your render tree.

## Redefining and Undefining

Not only do flows have a lifecycle (defined by `:live?` and `:cleanup`), but this lifecycle also includes registration and deregistration.

- When you call `reg-flow`, that flow comes alive.
    - `:output` runs, even if the inputs haven't changed.
    - That's because the flow itself has changed.
- When you call `clear-flow`, it dies (running `:cleanup`).
- Re-frame provides `:reg-flow` and `:clear-flow` [effects](#re-frame/Effects/) for this purpose.

Here's another demonstration. Think of it as a stripped-down todomvc.
You can add and remove items in a list:

<div class="cm-doc">
(rf/reg-sub :items :-> (comp reverse :items))

(rf/reg-event-db
 ::add-item
 (fn [db [_ id]] (update db :items conj id)))

(rf/reg-event-db
 ::delete-item
 (fn [db [_ id]] (update db :items #(remove #{id} %))))

(defn item [id] [:div "Item" id])

(defn items []
  (into [:div] (map item) @(rf/subscribe [:items])))

(defn controls []
  (let [id (or (apply max @(rf/subscribe [:items])) 0)]
    [:div
     [:span {:style clickable
             :on-click #(rf/dispatch [::add-item (inc id)])}
      "Add"] " "
     [:span {:style clickable
             :on-click #(rf/dispatch [::delete-item id])}
      "Delete"] " "]))

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
It builds a flow that validates our item list against any given requirements:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(defn error-state-flow [{:keys [min-items max-items] :as requirements}]
  {:id :error-state
   :path [:error-state]
   :inputs {:items [:items]}
   :output (fn [{:keys [items]}]
             (let [ct (count items)]
               (cond
                 (> ct max-items)  :too-many
                 (<= ct min-items) :not-enough
                 :else             :ok)))})
</div>

And let's register a flow that fits our base requirements:

<div class="cm-doc" data-cm-doc-result-format="pass-fail">
(rf/reg-flow (error-state-flow base-requirements))
</div>

Now this flow is calculating an error-state value, and adding it to `app-db` after every event. 
This happens whenever `:items` have changed... right?
Actually, there's another way to make a flow recalculate - we can re-register it.

Let's update the app to display our new error state:

<div class="cm-doc">

(defn warning []
  (let [error-state (rf/sub :flow {:id :error-state})]
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
- When we trigger `[:reg-flow (error-state-flow ...)]`:
    - The old `:error-state` flow runs `:cleanup`
    - The new `:error-state` flow runs `:output`

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

