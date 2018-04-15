## EP 003 - View Registration

> Status: Placeholder. Don't bother reading yet. 


### Abstract 


### Notes


Create using `def-view`:
```clj
(def-view 
   :something 
   
   ;; indicate what subscriptions we wish to obtain 
   ;; obtain a dispatch for use 
   ;; get the context id if you want to 
   ;; 
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

Use of `:something`:
```clj
[:something "Hello"] 
```
