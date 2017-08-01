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

because that `subscribe`:
1. might create a memory leak (the subscription might not be "freed")
2. makes the event handler impure (it grabs a global value)

### The Better Way

Instead, the value of a subscription should
be injected into the `coeffects` of that handler via an interceptor.

A sketch:
```clj
(re-frame.core/reg-event-fx         ;; handler must access coeffects, so use -fx
  :event-id 
  (inject-sub  [:query-id :param])  ;; <-- interceptor will inject subscription value into coeffects
  (fn [coeffects event]
    (let [sub-val  (:something coeffects)]  ;; obtain subscription value 
       ....)))
```

Notes:
1. `inject-sub` is an interceptor which will get the subscription value and add it to coeffects (somehow)
2. The event handler obtains the value from coeffects

So, how to write this `inject-sub` interceptor?

### Solutions

re-frame doesn't yet have a builtin `inject-sub` interceptor to do this injection.

I'd suggest you use this 3rd party library: 
https://github.com/vimsical/re-frame-utils/blob/master/src/vimsical/re_frame/cofx/inject.cljc


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->




