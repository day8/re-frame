## Simpler Apps

To build a re-frame app, you:
  - design your app's data structures (data layer)
  - write Reagent view functions (domino 5)
  - write event handler functions (control layer and/or state transition layer, domino 2)
  - write subscription functions (query layer, domino 4)

For simpler apps, you should put code for each layer into separate files:
```
src
├── core.cljs         <--- entry point, plus history, routing, etc
├── db.cljs           <--- schema, validation, etc  (data layer)
├── views.cljs        <--- reagent views (view layer)
├── events.cljs       <--- event handlers (control/update layer)
└── subs.cljs         <--- subscription handlers  (query layer)
```

For a living example of this approach, look at the [todomvc example](https://github.com/Day8/re-frame/tree/master/examples/todomvc).

*No really, you should absolutely look at the [todomvc example](https://github.com/Day8/re-frame/tree/master/examples/todomvc) example, as soon as possible. It contains all sorts of tips.*

### There's A Small Gotcha

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
```
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
```

If you follow this structure you should probably use namespaced keywords instead of simple keywords.

This gives the ability to encapsulate the state of each "panel" and ensure you don't get any conflicts.


Suppose for example that in your panel you want to store a value `x` in the db, if you want to use
namespaced keywords you the event handler and subscription will look like this:

```
(rf/reg-event-db ::set-x
                 (fn [db [_ value]]
                   (assoc db ::x value)))

(rf/reg-sub ::x
            (fn [db _]
              (get db ::x)))
```

If you want to dispatch that even you have two options, either:

```
(require [project.panel.handlers :as handlers])

(rf/dispatch [::handlers/set-x 100])
```

or:

`(rf/dispatch [:project.panel.handlers/set-x 100])`

Where the first option might be preferrable since it ensures you require the handlers file and saves you from the possibility of typos.

## I Want Real Examples!

Maybe look here: 
https://github.com/Day8/re-frame/blob/master/docs/External-Resources.md#examples-and-applications-using-re-frame

***

Previous:  [Correcting a wrong](SubscriptionsCleanup.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Navigation](Navigation.md)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
