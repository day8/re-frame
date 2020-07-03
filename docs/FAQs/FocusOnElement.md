
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

But this might not work in Safari these days (Safari is the new IE 7 of browsers). 

Instead, the more portable (but more complicated) version of this approach is to use React `refs` and a form-3 component:
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

But, it turns out this can be rewritten more tersely as:
```clj
[:input {:ref #(when % (.focus %)}]
```

All these approaches only cause focus once, when the widget is first rendered, but you may need to have more control than that. 

## Reagent after-render

If you want to switch focus between elements after they have first rendered,
you can create an effect handler which makes use of Reagent's `after-render` API to 
register a function which will imperatively set focus:
```clj
(re-frame.core/reg-fx 
  :focus-to-element
  (fn [element-id] 
    (reagent/after-render  #(some-> js/document (.getElementById element-id) .focus)))
```
As written, this code will fail silently if `element-id` is not found. Instead, you may want to detect and log that problem.

You can then use this effect within your event handler: 
```clj
(re-frame.core/reg-event-fx
  :something
  (fn [cofx event]
    {:db ....
     :focus-to-element some-element-id}))
```

This does assume you can compute the `some-element-id` of the HTML element 
on which you want focus.

BTW, notice the trick here. We use `Reagent/after-render` to ensure that the 
HTML element is rendered **before** we try to focus on it because 
sometimes the element doesn't even exist in the DOM until the UI is rerendered.
