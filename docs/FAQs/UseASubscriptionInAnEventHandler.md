
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

How do I access the value of a subscription from within an event handler?

## The Root Problem

Subscriptions are stateful. That said, they offer a 90% solution where you don't have to worry about their state.
But this comes with a caveat: **the only safe place to call `subscribe` is within a reagent component function.** 

!!! Note
    See [Flows - Reactive Context](/re-frame/flows-advanced-topics/#reactive-context)
    for an in-depth explanation.

### DOM event handlers

Inner functions, such as DOM event handlers, don't count. Consider this component:

```clj
(defn my-btn []
  [:button {:on-click #(subscribe [:some (gensym)])}])
```

Our `:on-click` function isn't actually called when the component renders. Instead, we've given the function to the browser, expecting it to get called later. The problem is, reagent and re-frame have no way to safely manage your subscription at that time. The result is a memory leak. If the browser calls your `:on-click` a thousand times, re-frame will "create" a thousand unique subscriptions, and there's no code in place to "dispose" them later.

### Re-frame event handlers

Re-frame event handlers don't count either. Re-frame calls your event handlers within its own loop, which runs in a totally separate context from reagent's render loop.

```clj
(re-frame.core/reg-event-db
  :event-id 
  (fn [db v]
    (let [sub-val  @(subscribe [:something])]   ;; <--- Possible memory leak
       ....)))
```

Furthermore, this is a conceptual issue.
Your subscription handler may be pure, but `subscribe` always has a side-effect.
Calling `subscribe` inside an event handler goes against re-frame's design, which is based on [handlers being pure functions](/re-frame/on-dynamics/#pure-functions).

### Incidental safety

Calling `subscribe` *outside* a component is somewhat safe, as long as you've also called it *inside* a component.
The *outside* one has no way to dispose, but the *inside* one might dispose later.

Of course, that requires your component to be around while your other code runs.
If that component unmounts and never comes back, then you're on your own again.

This isn't a real solution, it's just incidental safety.

## Solutions

### Restructure your app

Sometimes it's enough to factor out your calculations, so they can be shared between subscription and event handlers.

#### *Don't* call `subscribe` in your event handler:

```clj
(reg-sub :areas (fn [db] (map (fn [r] (* Math/PI r r)) (:circles db))))

(reg-event-fx 
  :store-areas
  (fn [{:keys [db]} _]
    {:local-store @(subscribe [:areas])}))
```

#### *Do* factor out calculation helpers:

```clj
(defn circle-area [r] (* Math/PI r r))

(def get-areas (comp circle-area :circles))

(reg-sub areas (fn [db _] (get-areas db)))

(reg-event-fx 
  :store-areas
  (fn [{:keys [db]} _]
    {:local-store (get-areas db)}))
```

#### *Don't* call `subscribe` in a callback:

```clj
[:input {:type "button" 
         :value "Click me!"
         :on-click #(doto @(subscribe [:circles]) circle-effect!)}]
```

#### *Do* `dispatch` an event in a callback:

```clj
(rf/reg-fx :circle-effect circle-effect!)

(re-frame.core/reg-event-fx
  :clicked-button
  (fn [{{:keys [circles]} :db :as coeffects} event-v]
    {:circle-effect circles}))

[:input {:type "button" 
        :value "Click me!"
        :on-click #(dispatch [:clicked-button %])}]
```

### Flows

Instead of a subscription, consider using [`re-frame.flow`](/re-frame/Flows). 
A `flow` gives you a derived value that's accessible anywhere, any time.

### Experimental Subscriptions

`re-frame.alpha` provides subscriptions with custom lifecycles. 
You can pass a `:re-frame/lifecycle` key to create subscriptions with various performance profiles and levels of memory safety.
By default, `re-frame.alpha/sub` creates a subscription which understands reactive context enough to guarantee memory safety.
The tradeoff is that calling `sub` outside a component won't be cached at all. 
It will recalculate every time you call `sub`, unless you've already created the subscription inside a mounted component.

### re-frame-utils 

The 3rd party library `re-frame-utils` provides an [inject coeffect](https://github.com/vimsical/re-frame-utils/blob/master/src/vimsical/re_frame/cofx/inject.cljc).
This allows you to access a subscription's value within a re-frame event handler.

This way, you declare an interceptor that resolves your subscription. Then, your event handler function can destructure the value from the coeffects:

```clj
(re-frame.core/reg-event-fx         ;; handler must access coeffects, so use -fx
  :event-id 
  (vimsical.re-frame.cofx.inject/inject [:query-id :param])  ;; <-- interceptor will inject subscription value into coeffects
  (fn [coeffects event]
    (let [sub-val (:something coeffects)]  ;; obtain subscription value 
       ....)))
```
