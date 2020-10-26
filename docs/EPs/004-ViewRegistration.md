## EP 003 - View Registration

> Status: Placeholder. Only scribbles. Don't read yet. 


### Abstract 

Broadbrush:
   - views will be registered via a new `re-frame.core/def-view` function
   - like other re-frame registration functions, `def-view` associates a `keyword` with a (reagent) render function
   - the registered view keyword (eg: `:my-view`) can be used in hiccup to identify the renderer. eg:  `[:my-view  "Hello world"]`
   - `def-view` allows various values to be `injected` as args into the view render
   - see https://github.com/reagent-project/reagent/issues/362
   
Why:
  - removing (render) functions from hiccup will make hiccup even more data oriented. Symptoms include helping with various state machine ideas.
  - injection of `dispatch` and `subscribe` will help view functions to be slightly more pure. `dispatch` still kinda a problem. 
  - ijection of `context` which will help with "multiple re-frame apps on the one page" problem 
   
What might need to be injected (as args) into a view:  

  - `subscribe` and `dispatch` 
  - a `frame` supplied via `context`  (subscribe and dispatch obtained from frame)
  - other context: data from higher in the DOM tree
  - animation?  CSS  ?

XXX searches up the DOM heirarchy looking for a `frame` context then extracts dispatch and subscribe.  Sounds inefficient. 

### Code Doodle #1

Associate the keyword `:my-view-id ` with a renderer using `def-view`:
```clj
(def-view 
   :my-view-id 
   
   ;; indicate what `context` is required
   [:dispatch :subscribe :context XXX] 
          
   ;; the renderer
   ;; last argument `context` is a map of:
   ;;    - `:subs` - a vector of subscription values? 
   ;;    - :dispatch and :subscribe 
   ;;    - :context - a vector of context values
   ;; 
   (fn [a-str context]
     (let [XXXX] 
       )))
```

Use of `:my-view-id `:
```clj
[:my-view-id  "Hello"] 
```

### Code Doodle #2

Associate the keyword `:my-view-id ` with a renderer using `def-view`:
```clj
(def-view 
   :my-view-id 
   
   ;; injection function
   ;; indicate what subscriptions we wish to obtain 
   ;; obtain a dispatch for use 
   ;; get the context id if you want to 
   ;; 
   :subscriptions 
   (fn [_ id]
      {:subs [[:item ]] 
       :context ["name1", "name2")})

       
   ;; the renderer
   ;; last argument `ins` is a map of:
   ;;    - `:subs` - a vector of subscription values? 
   ;;    - :dispatch and :subscribe 
   ;;    - :context - a vector of context values
   ;; 
   (fn [a-str  ins]
     (let [XXXX] 
       )))
```

Use of `:my-view-id `:
```clj
[:my-view-id  "Hello"] 
```

### Code Doodle #3

`[:something arg1 arg2]`

```clj
(def-view 
   :something 
   (fn [arg1 arg2] 
      ;; obtain dispatch and subscription 
      ;; obtain a subscription ot two 
      ;; add a key on the component 
      (fn [arg1 arg2] 
          ))
   
```

## Misc Notes
   
   - reagent hiccup will be changed/monkey-patched so that views can be identified by keyword
   - Views are the leaves of the signal graph. They need to subscribe and dispatch. 
   - how to obtain other pieces of `context` (beyond the current frame)
   
   
XXX There's a nasty problem with frames and subscriptions.  How does the signal function know what frame to create new subscriptions against???

## Usage 


