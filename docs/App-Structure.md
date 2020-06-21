## A Smaller App 

For simpler apps, you should put code for each layer into separate files:
<pre>
src
├── core.cljs         <--- entry point, plus history, routing, etc
├── db.cljs           <--- schema, validation, etc  (data layer)
├── views.cljs        <--- reagent views (view layer)
├── events.cljs       <--- event handlers (control/update layer)
└── subs.cljs         <--- subscription handlers  (query layer)
</pre>

For a living example of this approach, look at the [todomvc example](https://github.com/day8/re-frame/tree/master/examples/todomvc).

## The Gotcha

If you adopt this structure, there's a gotcha.

`events.cljs` and `subs.cljs` will never be `required` by any other
namespaces. To the Google Closure dependency mechanism, it appears as
if these two namespaces are not needed and it doesn't load them.

And, if the namespaces are not loaded, the registrations in these namespaces will
never happen. And, then you'll be staring at your running app very 
puzzled about why none of your events handlers are registered.

Once you twig to what's going on, the solution is easy.  You must
explicitly `require` both namespaces, `events` and `subs`, in your `core`
namespace. Then they'll be loaded and the registrations (`reg-sub`, `reg-event-fx`,
etc) will occur as that loading happens.

## Larger Apps

Assuming your larger apps have multiple "panels" (or "views") which are
relatively independent, you might use this structure:
<pre>
src
├── core.cljs             <--- entry point, plus history, routing, etc
├── panel-1
│   ├── db.cljs           <--- schema, validation, etc  (data layer)
│   ├── subs.cljs         <--- subscription handlers  (query layer)
│   ├── views.cljs        <--- reagent components (view layer)
│   └── events.cljs       <--- event handlers (control/update layer)
├── panel-2
│   ├── db.cljs           <--- schema, validation. etc  (data layer)
│   ├── subs.cljs         <--- subscription handlers  (query layer)
│   ├── views.cljs        <--- reagent components (view layer)
│   └── events.cljs       <--- event handlers (control/update layer)
.
.
└── panel-n
</pre>


## Namespaced Ids

As an app gets bigger, you'll tend to get clashes on ids - event-ids, or query-ids (subscriptions), etc. 
 
One panel will need to `dispatch` an `:edit` event and so will 
another, but the two panels will have different handlers. 
So, how do you avoid a clash? How do you distinguish between 
one `:edit` event and another?

Your goal should be to use event-ids which encode both the event 
itself (`:edit` ?) and the context (`:panel1` or `:panel2` ?). 

Luckily, ClojureScript provides a nice easy solution: use keywords 
with a __synthetic namespace__. Perhaps something like `:panel1/edit` and `:panel2/edit`. 

You see, ClojureScript allows the namespace in a keyword to be a total
fiction. I can have the keyword `:panel1/edit` even though 
`panel1.cljs` doesn't exist. 

Naturally, you'll take advantage of this by using keyword namespaces 
which are both unique and descriptive.

## Navigation


How do I switch between different panels of a larger app?

Your `app-db` could have an `:active-panel` key containing an id for the panel being displayed.


When the user does something navigation-ish (selects a tab, a dropdown or something which changes the active panel), then the associated event and dispatch look like this:

```clj
(re-frame/reg-event-db
  :set-active-panel
  (fn [db [_ value]]
    (assoc db :active-panel value)))

(re-frame/dispatch
  [:set-active-panel :panel1])
```

A high level reagent view has a subscription to :active-panel and will switch to the associated panel.

```clj
(re-frame/reg-sub
  :active-panel
  (fn [db _]
    (:active-panel db)))

(defn panel1
 []
 [:div  {:on-click #(re-frame/dispatch [:set-active-panel :panel2])}
        "Here" ])

(defn panel2
 []
 [:div "There"])

(defn high-level-view
  []
  (let [active  (re-frame/subscribe [:active-panel])]
    (fn []
      [:div
       [:div.title   "Heading"]
       (condp = @active                ;; or you could look up in a map
         :panel1   [panel1]
         :panel2   [panel2])])))
```
