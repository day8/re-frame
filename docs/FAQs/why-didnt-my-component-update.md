#

## Why didn't my component update?

Reagent components should "watch" their input arguments and re-render whenever they change value. 
But sometimes this fails to happen, for non-obvious reasons.

## Answer

Several causes are explained by the reagent project: 
[FAQ: Component Not Rerendering](https://github.com/reagent-project/reagent/blob/master/doc/FAQ/ComponentNotRerendering.md).

Here are some additional problems we've faced in re-frame apps:

### You dereferenced a subscription outside the render-fn

Consider this reagent component. When the value for `:some-data` changes within app-db, 
will the component update?

```clojure
(reg-sub :my-data (fn [db] (get db :my-data)))

(defn my-component []
  (let [current-data @(rf/subscribe [:my-data])]
    (str current-data)))
```

Yes, this works as you'd expect. But here's another component - 
it appears deceptively similar, but technically it is now a 
[form-2 component](https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md#form-2--a-function-returning-a-function).

```clojure
(defn my-component []
  (let [current-data @(rf/subscribe [:my-data])]
    (fn my-render-fn [] (str current-data))))
```

Here, `current-data` really _isn't_ current!
When this component mounts, you'll see the correct value within app-db.
But as that value changes, what you see will remain the same. Why?

The key is to understand what reagent does with each function you pass it:

> in the case of `Form-2`, the outer function is called once and once only  
> [Appendix A, section 5](https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md#appendix-a---lifting-the-lid-slightly)

That means reagent only calls `my-component` once. That call dereferences your subscription
and then returns `my-render-fn`, which reagent calls "many, many times thereafter." 
But, `my-render-fn` uses `current-data`, an immutable binding which will always refer
back to that first dereferenced value.

Put simply, **the solution is to dereference subscriptions within the actual render function**, not 
this constructor-like outer function. And, if it feels helpful, try using `*` to suggest 
that your symbol is bound to a derefable:

```clojure
(defn my-component []
  (let [current-data* (rf/subscribe [:my-data])]
    (fn my-render-fn [] (str @current-data*))))
```

Now, `my-render-fn` can get called "many, many times," and new values for `current-data*` will
flow in, even as the lexical scope stays the same. It doesn't hurt to structure your original 
form-1 component in the same way, dereferencing subscriptions in the body form rather than in 
the `let` bindings.

Updating from a form-1 to a form-2 (or form-3) is an ordinary step in 
our development process - for instance, to declare some component-local state.
But without a keen eye for reactivity, it's easy to break your components.

### You used `defmulti`

A subtle but severe problem can occur if you implement a form-2 component
using `defmulti`/`defmethod`:

```clojure
(defn which-fruit [k] k)

(defmulti fruit-view which-fruit)

(defmethod fruit-view :apple [_]
  [:li "🍎 I'm an apple!"])

(defmethod fruit-view :banana [_]
  (fn render-banana []
    [:li "🍌 I'm a banana!"]))

(def fruit (r/atom :apple))

(defn next-fruit! []
  (swap! fruit {:apple  :banana
                :banana :apple}))

(defn fruit-switcher []
  [:div
   [:button {:on-click next-fruit!} "Click me!"]
   [:div "Showing " @fruit ":"]
   [fruit-view @fruit]])
```

On the first render, reagent invokes `fruit-view`.
Clojure runs your dispatch function `which-fruit`, 
looks up the method for `:apple`, and calls it, returning a hiccup.
Since `fruit-view` returns a hiccup, reagent considers it to be a 
[form-1](https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md#form-1-a-simple-function) 
component. It renders that hiccup directly. So far, so good.

Then, you click the button. The value of `fruit` changes, causing reagent to invoke 
`fruit-view` again. This time, we get the `:banana` method, which returns `render-banana` (not a hiccup).
Here's where the problem begins: since our `fruit-view` now returns a function, 
reagent now considers it to be
[form-2](https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md#form-2--a-function-returning-a-function)
!

As explained above, reagent calls this new form-2 component function
["once and once only"](https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md#appendix-a---lifting-the-lid-slightly). 
Subsequently, every time `fruit-view` re-renders, reagent will _not_ call your multimethod, 
and no dispatch will happen. Instead, reagent has stored `render-banana` in its cache,
and it will always call `render-banana`, showing "I'm a banana!" forever.

In effect, we've created a nasty dynamism where our component works perfectly well...
until it doesn't.
It could work for hours, until the user clicks that one button.
Or it could work for years, if your codebase only contains form-1 methods,
until someone decides to add a form-2 method.

Unfortunately, we haven't found a perfect way to use multimethods with reagent.
One workaround is to **use `defmulti` to implement only form-1 components.**
For instance, you could define your components using regular `defn`, and use `defmulti` only 
as a wrapper to dispatch them:

```clojure
(defn fruit-item-apple [_]
  (fn [_] [:li "🍎 I'm an apple!"]))

(defmethod fruit-item :apple [props] [fruit-item-apple])

(defn fruit-item-banana [_]
  (fn [_] [:li "🍌 I'm a banana!"]))

(defmethod fruit-item :banana [props] [fruit-item-banana props])
```

Or, you could extract your form-2 code into a single wrapper,
and call your multimethod from there, making sure all your methods are form-1:

```clojure
(defmethod fruit-item :apple [_]
  [:li "🍎 I'm an apple!"])

(defmethod fruit-item :banana [_]
  [:li "🍌 I'm a banana!"])

(defn fruit-view 
  "We need this wrapper component to ensure reactivity.
  For details, refer to this article: 
  https://day8.github.io/re-frame/FAQs/why-didnt-my-component-update"
  [k]
  (let [] ;; Do your form-2 stuff here.
    (fn []
      [fruit-item k])))
```

If you truly need a polymorphic form-2 component without caveats,
**consider not using `defmulti`**.
Though multimethods are elegant, our workarounds can be clumsy.

**Consider using `case` or `cond`**, instead. This can work as idiomatic Clojure,
providing explicit and foolproof dispatch without depending on 
incidental indirections like `fruit-view` above:

```clojure
(defn fruit-item-apple []
  (fn [] ;; No problem using form-2
    [:li "🍎 I'm an apple!"]))

(defn fruit-item-banana []
  [:li "🍌 I'm a banana!"])

(defn fruit-view [k]
  (case k
    :apple  [fruit-item-apple]
    :banana [fruit-item-banana]))
```
