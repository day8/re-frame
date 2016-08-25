## Bootstrapping Your Application State

To bootstrap a re-frame application, you need to:
  1. register handlers (subscription and event handlers)
  2. kickstart reagent (views)
  3. Load the right initial data into `app-db` which might be a `merge` of:
   - Some default values
   - Values stored in LocalStorage
   - Values obtained via service calls to server
   - etc, etc

Point 3 is the interesting bit and will be the main focus of this page, but let's work our way through them ...

## Register Event Handlers 

Generally, there's nothing to do because this happens automatically at (js) script load time, because you declared and registered your event handlers like this:


```Clojure
(re-frame/reg-event-db       ;; event handler will be registered automatically
  :some-id
  (fn [db [_ value]]
    ...  do some state change based on db and value 
```

## Kick Start Reagent 

Create a function `main` which does a `reagent/render` of your root reagent component `main-panel`:

```Clojure
(defn main-panel       ;; my top level reagent component
  []
  [:div "Hello DDATWD"])

(defn ^:export main     ;; call this to bootstrap your app
  []
  (reagent/render [main-panel]
                  (js/document.getElementById "app")))
```

## Loading Initial Data 

Let's rewrite our `main-panel` component to use a subscription:

```Clojure
(re-frame/reg-sub     ;; a new subscription handler
  :name               ;; usage (subscribe [:name])
  (fn [db _]
    (:name db)))      ;; pulls out :name


(defn main-panel 
  []
  (let [name  (re-frame/subscribe [:name])]  ;; <--- a subscription  <---
    (fn []
      [:div "Hello " @name]))))   ;; <--- use the result of the subscription
```

The user of our app will see funny things 
if that `(subscribe [:name])` doesn't deliver good data. We must ensure there's good data in `app-db`.

That will require: 
  1. getting data into `app-db`; and
  2. not get into trouble if that data isn't yet in `app-db`.  For example, the data may have to come from a server and there's latency.

**Note: `app-db` initially contains `{}`**

### Getting Data Into `app-db`

Only event handlers can change `app-db`. Those are the rules!! Even initial values must be put in via an event handler. 

Here's an event handler for that purpose:

```Clojure

(re-frame/reg-event-db
  :initialise-db				 ;; usage: (re-frame/dispatch [:initialise-db])
  (fn [_ _]						 ;; Ignore both params (db and event)
	   {:display-name "DDATWD"	 ;; return a new value for app-db
	   :items [1 2 3 4]}))
```

We'll need to dispatch the `:initialise-db` event to get it to execute. `main` seems like the natural place: 

```Clojure
(defn ^:export main
  []
  (re-frame/dispatch [:initialise-db])   ;;  <--- this is new 
  (reagent/render [main-panel]
                  (js/document.getElementById "app")))
```

But remember, event handlers execute async. So although there's a `dispatch` within `main`, the handler for `:initialise-db` will not be run until sometime after `main` has finished.

But how long after?  And is there a race condition?  The component `main-panel` (which needs good data) might be rendered before the `:initialise-db` event handler has put good data into `app-db`. 

We don't want any rendering (of `main-panel`) until after `app-db` is right. 

Okay, so that's enough of teasing-out the issues. Let's see a quick sketch of the entire pattern. It is very straight-forward:

## The Pattern

```Clojure
(re-frame/reg-sub   ;; the means by which main-panel gets data
  :name             ;; usage (subscribe [:name])
  (fn  [db _]
	   (:name db)))
	   
(re-frame/reg-sub        ;; we can check if there is data
  :initialised?          ;; usage (subscribe [:initialised?])
  (fn  [db _]
	(not (empty? @db)))) ;; do we have data

(defn main-panel    ;; the top level of our app 
  []
  (let [name  (re-frame/subscribe :name)]   ;; we need there to be good data
    (fn []
      [:div "Hello " @name]))))

(defn top-panel    ;; this is new
  []
  (let [ready?  (re-frame/subscribe [:initialised?])]
    (fn []
      (if-not @ready?         ;; do we have good data?
        [:div "Initialising ..."]   ;; tell them we are working on it
        [main-panel]))))      ;; all good, render this component

(defn ^:export main     ;; call this to bootstrap your app
  []
  (re-frame/dispatch [:initialise-db])
  (reagent/render [top-panel]
                  (js/document.getElementById "app")))
```

## Scales Up

This pattern scales up easily.

For example, imagine a more complicated scenario in which your app is not fully initialised until 2 backend services supply data.

Your `main` might look like this:

```Clojure
(defn ^:export main     ;; call this to bootstrap your app
  []
  (re-frame/dispatch [:initialise-db])           ;; basics
  (re-frame/dispatch [:load-from-service-1])     ;; ask for data from service-1
  (re-frame/dispatch [:load-from-service-2])     ;; ask for data from service-2
  (reagent/render [top-panel]
                  (js/document.getElementById "app")))
```

Your `:initialised?` test then becomes more like this sketch: 

```Clojure
(reg-sub
  :initialised?          ;; usage (subscribe [:initialised?])
  (fn  [db _]
    (and  (not (empty? @db))
               (:service1-answered? @db)
               (:service2-answered? @db)))))
```

This assumes boolean flags are set in `app-db` when data was loaded from these services.

## A Cheat - Synchronous Dispatch

In simple cases, you can simplify matters by using `(dispatch-sync [:initialise-db])` in the main entry point function.  The [Simple Example](https://github.com/Day8/re-frame/blob/8cf42f57f50f3ee41e74de1754fdb75f80b31775/examples/simple/src/simpleexample/core.cljs#L110) and [TodoMVC](https://github.com/Day8/re-frame/blob/8cf42f57f50f3ee41e74de1754fdb75f80b31775/examples/todomvc/src/todomvc/core.cljs#L35) example both use `dispatch-sync` to initialise the app-db. This causes the event to jump to the front of the line and causes it to execute immediately, which is fine for the initial data load in a simple app but can lead to problems elsewhere. As your app gets more complicated, it is strongly suggested that you use the regular `dispatch` function where possible. If you are using `dispatch-sync` and run into weird errors, there's a pretty high chance that it's the culprit.

## Services 

Remember when we used `dispatch` to request the data in our `main` function?  What would those event handlers looks like? Let's go to [Talking to Servers](Talking-To-Servers.md) and find out!