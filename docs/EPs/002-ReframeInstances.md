## EP 002 - Multiple re-frame Instances  

> Status: Drafting. May be incoherent and/or wrong. Probably don't read.

### Abstract

This EP proposes changes to allow multiple
re-frame apps to coexist on the same (HTML) page.
 
## Introduction 

Currently, there can only be one instance of `re-frame` on a page.
This design limitation simplifies the programmer's development
experience in 98.3% of usecases (yes, I just pulled that number out of my keyboard). 

But there are some problematic usecases: 
  1. when two or more instances of **the same** app need to coexist on the one page:
     - think of `devcards` where instances should coexist 
     - when unittesting, it might be useful to create re-frame "instances" serially, 
       use them, and then throw them away.
  2. when two or more instances of **different** re-frame apps need to coexist on the one page. Different, as in, 
     one is TodoMVC and the other is a MemeCreator.

The challenge is to facilitate these more complicated usecases 
while not, in the process, losing the current simplicity which is
enjoyed most of the time. 


### Global State As A Frame

Currently, re-frame has some global state in the form of various atoms scattered about internal namespaces. The best known is `app-db`. 

It would be completely straightforward to scoop up this state and 
put it into some sort of `defrecord` whole - let's call it `Frame` - and 
then allow the programmer to create instances of `Frame` when they
want to create a new instance of a re-frame app.

Imagine there's a new API function 
called `create-frame`, which creates a new instance of this 
`defrecord` `Frame` and that you can call it as often as you want 
to create as many re-frame apps as needed.

So, that was the easy bit.

### The Two Problems

Now the design work has to start in earnest and there's
two problems to solve:
  1. how to associate/register handlers with a `Frame`  
  2. within a view function, how to `subscribe`
     or `dispatch` from/to the right `Frame`

We'll start with problem #1.

### On Mutating registrars

A re-frame app is defined collectively by its handlers. As an app boots, 
calls to registration functions like `reg-event-db` and `reg-sub` 
collectively "build up" an app, infusing it with behaviour and capability.

This "building up" process currently involves  
progressive mutation of a global `registrar` (map) held internally within `re-frame`. 
Each registration adds a new entry to this `registrar`. 

If you are troubled by the thought of side effects on globals, there's 
an [FAQ entry you may find interesting](https://github.com/day8/re-frame/blob/master/docs/FAQs/ViewsOnGlobalRegistration.md).

### Problem 1:  Frames And Registrars

The first design challenge to explore is: what's the new relationship between 
`Frames` and `registrars`.

`re-frame` currently holds a global `registrar` of handlers, but in our new world,
where there are different `Frame` instances on a page, should each of these `Frames`
have its own `registrar` of handlers?  And, if so, how and when
should handlers be added to their `registrars`?

And, to support the developer experience, how should this 
work with `figwheel` reloads of namespace containing registrations? 
How should the `registrar` within a given `Frame` be updated?

Let's explore via usecases ...

In the usecase where there are multiple `Frames` on a page and they are 
all instances of the **same app** - for example, multiple TodoMVC apps - then all the
`Frames` will have an identical set of handlers. So there need be only one central
`registrar` (continue to use re-frame's global one?) and all `Frames` can look up 
handlers in this global `registrar`, and not hold one themselves. So continuing with 
a global registrar would work.

But there are harder usecases to contend with. Ones where 
there are many `Frames` on a page, but each is for a **different 
app**.
Imagine that one app on the page is TodoMVC and the other is a MemeCreator tool.
Each `Frame` needs a different set of handlers.
In which case, can we still put all handlers
into a central `registrar`?  Maybe. But it would "safer" if each app's `Frame` only had 
access to the subset of handlers specific to *that* app.

More ideas. Perhaps when registering a handler, the "package" to which it belongs can be nominated. 
Collections of related handlers would all belong to the same package.  So all of the 
handlers for `re-frame-undo` would be registered as part of the package `:re-frame-undo`.

And then, `create-frame` could, optionally, take a set of `packages` as an argument 
indicating which of them should be included/imported into the `Frame` being created.  Its almost as 
if we are `importing` packages of handlers into a `Frame`. 

Keep in mind that there are libraries of handlers. `re-frame-undo` is a library 
which has event handlers, subscription handlers, etc. So one `Frame` on a page 
might need to include the `package` of `re-frame-undo` handlers, but another 
`Frame` on the same page might not.

Alternatively, we could drop the notion of `:package` and simply work from the 
namespace of the registration `id`.

XXX Perhaps if the handler `ids` were organised into app-specific collections, a 
central registrar could work.  The collection mechanism could be as simple as insisting 
on `ids` with namespaces.  Or if ==t could be that registration puts handlers into `packages`.

And then, when we created a `Frame`, we'd need 
to indicate which of these "packages" (collections of handlers) should be 
"imported" into that `Frame`?

But keep in mind the need for updates to handlers being reloaded by figwheel (or the like). 
A `Frame` will need to "get" these updated handlers. 

And also k

### Problem 1 - Solutions

Registration calls (to `reg-event-db`, etc) could be adjusted to 
take an additional `Frame` argument. So, Handlers get registered "into" a `Frame`.



**Solution sketch #2**: all handlers are registered as they are now 
using `reg-event-db` etc, and are
stored (as now) in a central registrar (as now). But each handler belongs to a 
"package" (which defaults to `:default`). When a `frame` is created, you 
can, optionally, supply the `set of packages`. When the `Frame` is created 
all handlers in the nominated `packages` are injected into the 
`Frame`. If not set is provided, then all handlers are injected. 

At this point, I favour sketch #2 from a backwards compatibility 
point of view. It is the least disruptive. 

### Problem 2: Views, dispatch and subscription 

In an HTML page containing multiple `devcard` instances,
all for exactly the same app, there will be one `Frame`  
for each `devcard`.

In this scenario, how can a view know to which 
`Frame` it should `subscribe`? And to which `Frame` it should 
`dispatch`?

### Problem 2: Minimal Design Solution 

The "minimal design" approach is to say that 
`Frames` are passed as an argument into 
each view function, and then further passed down into 
child views, and so on, and so on.

Then, when using `dispatch` or `subscribe` a view will 
use the arg given to it called, say, `frame` like this:
`(dispatch frame [:event-id arg])`.

This approach is certainly simple. But it does get laborious
and tedious pretty quickly. Every view needs to accept a `frame`
and then pass it down to all children. Even intermediate

### Problem 2: Better Design Solution 



**Solution sketch #2**: Hack Reagent so that a given node in 
the hierarchy can "register" a Frame, and then provide a 
a way so that any given view can "query upwards" through its 
the parent/owner hierarchy of views 
looking for the `frame` to which it should subscribe and dispatch. 

**Solution sketch #3**: The Algebraic  Effects approach is to 
piggyback on React's `context` facility. `context` only works for simple values, so 
this path would passing down the `id` of the frame, and then 
looking it up.



### Problem

if we `subscribe` in a view, and that subscription needs to causes other subscriptions to be created, how to get at the associated frame at the point when we want to create the further subscriptions?


---

## Appendix: Multi-frame ergonomic model and implementation sketch (2026 update)

# Multi-frame re-frame: ergonomic programmer model + implementation sketch

This document answers two questions:

1. What should multi-frame re-frame feel like to a programmer?
2. How can that be implemented without violating React/Reagent constraints?

---

## Programmer model (target UX)

**Mental model:** each `[rf/frame-provider {:frame f} ...]` subtree runs against its own runtime world.

Inside that subtree:

- plain `rf/subscribe` should just work,
- plain `rf/dispatch` should work during render-time flows,
- `rf/use-dispatch` is the ergonomic default for event handlers (`:on-click`, async callbacks),
- explicit `*-to` APIs are available for tests/integration/non-UI code.

No prop drilling of frame values.

---

## Public API surface (small + memorable)

```clojure
;; lifecycle
(rf/make-frame opts?)                ;; => frame
(rf/destroy-frame frame)

;; view ergonomics
(rf/frame-provider {:frame f} & children)
(rf/use-dispatch)                    ;; => (fn [event])
(rf/use-subscribe query-v)           ;; optional convenience hook

;; dynamic binding helper (tests/REPL/setup)
(rf/with-frame frame & body)         ;; macro

;; explicit integration path
(rf/dispatch-to frame event)
(rf/dispatch-sync-to frame event)
(rf/subscribe-to frame query-v)

;; ergonomic plain API (frame resolved from current context/binding)
(rf/dispatch event)
(rf/dispatch-sync event)
(rf/subscribe query-v)
```

---

## Usage examples

## 1) Two isolated widgets on one page

```clojure
(defonce left-frame  (rf/make-frame {:id :left}))
(defonce right-frame (rf/make-frame {:id :right}))

(defn page []
  [:div
   [rf/frame-provider {:frame left-frame}
    [counter-widget "Left"]]
   [rf/frame-provider {:frame right-frame}
    [counter-widget "Right"]]])
```

Child components stay close to normal re-frame style:

```clojure
(defn counter-widget [label]
  (let [dispatch! (rf/use-dispatch)                 ;; one hook for callbacks
        count     @(rf/subscribe [:counter/value])] ;; plain subscribe remains
    [:div
     [:h3 label]
     [:button {:on-click #(dispatch! [:counter/inc])}
      (str "Count: " count)]]))
```

## 2) Two different apps embedded in one host page

```clojure
(defonce todo-frame
  (rf/make-frame {:id :todo
                  :handler-scope {:mode :namespaces
                                  :allow #{"todo" "shared"}}}))

(defonce meme-frame
  (rf/make-frame {:id :meme
                  :handler-scope {:mode :namespaces
                                  :allow #{"meme" "shared"}}}))

(defn host-page []
  [:main
   [rf/frame-provider {:frame todo-frame} [todo/root]]
   [rf/frame-provider {:frame meme-frame} [meme/root]]])
```

## 3) Reusable isolated widget pattern

```clojure
(defn make-counter-frame []
  (rf/make-frame {:db {:count 0}}))

(defn counter-widget [label]
  (let [frame (make-counter-frame)]
    [rf/frame-provider {:frame frame}
     [counter-widget-init frame]
     [counter-widget-ui label]]))

(defn counter-widget-init [frame]
  ;; register once for this frame (not on every render)
  (r/with-let [_ (rf/with-frame frame
                   (rf/reg-event-db :inc (fn [db _] (update db :count inc)))
                   (rf/reg-sub :count (fn [db _] (:count db))))]
    [:<>]))

(defn counter-widget-ui [label]
  (let [dispatch! (rf/use-dispatch)
        count     @(rf/subscribe [:count])]
    [:div.widget
     [:h3 label]
     [:p "Count: " count]
     [:button {:on-click #(dispatch! [:inc])} "+"]]))
```

## 4) Explicit path for tests and non-UI code

```clojure
(let [frame (rf/make-frame {:id :batch})]
  (rf/dispatch-sync-to frame [:init])
  @(rf/subscribe-to frame [:status]))

(rf/with-frame (rf/make-frame {:db {:count 0}})
  (rf/dispatch-sync [:counter/inc])
  @(rf/subscribe [:counter/value]))
```

---

## Internal architecture

## 1) Frame runtime object

Each frame owns mutable runtime state:

```clojure
{:id           :todo
 :app-db       (reagent/atom {})
 :registrar    ...     ;; visible handlers for this frame
 :router       ...     ;; queue/scheduler state
 :sub-cache    ...     ;; reactions/sub graph
 :lifecycle    {:destroyed? false}
 :config       {...}}
```

Anything mutable that can affect behavior is frame-scoped.

## 2) Parameterize internals by frame

Core internals become explicit:

```clojure
(dispatch* frame event)
(dispatch-sync* frame event)
(subscribe* frame query-v)
(invoke-handler* frame event)
(cache-lookup* frame query-v)
```

Public APIs are wrappers around frame resolution + these internals.

## 3) Registration strategy

Pragmatic approach:

- keep handler definitions globally registered (good hot reload + ecosystem compatibility),
- derive frame-local resolver/filter at `make-frame`,
- enforce scope via `:handler-scope` (`:all`, namespace allow-list, package allow-list).

---

## Frame resolution design (hook-safe + ergonomic)

The critical design point: **never call React hooks from general utility functions**.

### 1) Core primitives

```clojure
(def ^:dynamic *current-frame* nil)
(defonce frame-context (js/React.createContext nil))
(def default-frame (make-frame {:id :default}))

(defn current-frame* []
  ;; non-hook path, safe everywhere
  (or *current-frame* default-frame))

(defn use-frame []
  ;; hook path, valid only in component/hook call sites
  (or (js/React.useContext frame-context)
      *current-frame*
      default-frame))
```

### 2) Provider implementation

Provider sets React context and also dynamic binding for render-time code paths.

```clojure
(defn frame-provider [{:keys [frame]} & children]
  [:> (.-Provider frame-context) {:value frame}
   [frame-render-binding frame children]])

(defn- frame-render-binding [frame children]
  (binding [*current-frame* frame]
    (into [:<>] children)))
```

This is what allows plain `rf/subscribe` to work unchanged inside provider subtrees.

### 3) Plain APIs

```clojure
(defn subscribe [query-v]
  (subscribe* (current-frame*) query-v))

(defn dispatch [event]
  (dispatch* (current-frame*) event))
```

### 4) Hook convenience APIs

```clojure
(defn use-dispatch []
  (let [frame (use-frame)]
    ;; stable closure per mounted component instance
    (r/with-let [f (fn [event] (dispatch* frame event))]
      f)))

(defn use-subscribe [query-v]
  (let [frame (use-frame)]
    (subscribe* frame query-v)))
```

---

## Correctness notes

1. **Why plain `subscribe` works ergonomically:** subscription creation happens during render; provider render binding supplies `*current-frame*`.
2. **Why `use-dispatch` is still recommended:** event handlers/async callbacks run after render; dynamic binding no longer applies.
3. **Subscription chaining:** nested `subscribe*` inherits the same frame context; cache keys include frame identity + query.
4. **Async effects:** deferred callbacks should capture frame explicitly (`use-dispatch`, `dispatch-to`, or closure with frame).
5. **Destroyed frame behavior:** dispatch/subscribe against destroyed frames should throw clear errors.

---

## Minimal implementation slice

1. `make-frame`, `dispatch-to`, `subscribe-to`
2. `frame-provider` with context + render-time binding
3. plain `dispatch`/`subscribe` via `current-frame*`
4. `use-dispatch`
5. two counters on one page proving isolation and ergonomics

This slice demonstrates the intended UX while staying technically sound.
