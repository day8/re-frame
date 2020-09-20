
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

How do I switch "focus" to a particular HTML element?

## HTML autofocus

Perhaps you can use the `autofocus` HTML element attribute like this:
```cljs
(defn view 
  []
  [:input {:type "text" :id "my-id" :auto-focus true])
```

But this might not work in Safari these days (Safari is the new IE 6 of browsers). 

Instead, you could use a more portable (but more complicated) version of this approach, which uses React `refs` with a Form-3 component:
```clj
(defn my-input []
  (let [ref (atom nil)]
    (r/create-class
     {:component-did-mount
      (fn [_]
        (.focus @ref))
      :reagent-render
      (fn [_]
        [:input {:ref #(reset! ref %)}])})))
```

A terse way of achiving the same outcome is: 
```clj
[:input {:ref #(when % (.focus %)}]
```

But all these approaches only cause focus once, when the widget is first rendered. You may need to have more control than that. 

## Reagent after-render

If you want to switch focus between elements after they have first rendered,
you can create an `effect handler` which uses Reagent's `after-render` API to 
register a function that will imperatively set focus:
```clj
(re-frame.core/reg-fx 
  :focus-to-element
  (fn [element-id] 
    (reagent/after-render  #(some-> js/document (.getElementById element-id) .focus))))
```
_WARNING_: as written, this code will fail silently if `element-id` is not found. If you use this 
code fragment, you may want to detect and report that problem.

You can then use this effect within your event handler: 
```clj
(re-frame.core/reg-event-fx
  :something
  (fn [cofx event]
    {:db ....
     :focus-to-element some-element-id}))
```

This assumes you can compute or obtain the `some-element-id` value 
for the HTML element on which you want focus.

One small trick: we perform the imperative focus using 
`Reagent/after-render` because sometimes the target
HTML element won't exist in the DOM until after the rendering 
which occurs in the next animation frame.
