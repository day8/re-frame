### Question

How do I access the value of a subscription from within an event handler? 

### The Wrong Way

You should NOT do this:
```clj
(re-frame.core/reg-event-db
  :event-id 
  (fn [db v]
    (let [sub-val  @(subscribe [:something])]   ;; <--- Eeek
       ....)))  
```

If you do:
1. You might create a memory leak (the subscription might not be "freed")
2. You have just made you event handler impure (it reaches out and grabs a global value). 
 
### The Better Way

Instead, to make the value of a subscription available within an event handler, it has to 
be injected into the `coeffects` of that handler via an interceptor.

The overall sketch is:
```clj
(re-frame.core/reg-event-fx     ;; handler must access coeffects, so use -fx
  :event-id 
  (inject-sub  [:query-id :param])  ;; <-- will inject subscription value into coeffects
  (fn [coeffect event]
    (let [sub-val  (:something coeffect)]  ;; obtain subscription value 
       ....)))
```

### Solutions

re-frame doesn't yet have a built in interceptor to do this injection. 

So you'll need to create your own or you may want to use this 3rd party library: 
https://github.com/vimsical/re-frame-utils/blob/master/src/vimsical/re_frame/cofx/inject.cljc


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->




