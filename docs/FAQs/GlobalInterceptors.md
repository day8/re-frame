
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

Does re-frame allow me to register global interceptors? Ones which are included 
for every event handler?

## Answer (v1.0.0 onwards)

Yes, re-frame provides an API for registering global interceptors. 

The following (untested) code creates a global interceptor to keep a track of all events:

```clj
;; we'll be recording all events into this atom (warning: it will grow unbounded)
(def  recent-events atom([]))

;; this interceptor will collect events and add them to the atom above
(def event-collector
  (re-frame.core/->interceptor {
    :id      :event-collector
    :before  (fn [context]  
               (swap! recent-events conj (re-frame.core/get-coeffect context :event))
               context)))

;; register this global interceptor early in program's boot process,
;; using re-frame's API
(re-frame.core/reg-global-interceptor event-collector)
```


## Answer (prior to v1.0.0) 

Prior to v1.0.0, re-frame provided no API to direct support this feature,
but there ways of making it happen. 

Let's assume you have an interceptor called `omni-ceptor` which you want
automatically added to all your event handlers.

You'd write a replacement for both `reg-event-db` and `reg-event-fx`, and get
these replacements to automatically add `omni-ceptor` to the interceptor 
chain at registration time. 

Here's how to write one of these auto-injecting replacements: 
```clj
(defn my-reg-event-db            ;; a replacement for reg-event-db

   ;; 2-arity with no interceptors 
   ([id handler] 
     (my-reg-event-db id nil handler))
     
   ;; 3-arity with interceptors
   ([id interceptors handler] 
     (re-frame.core/reg-event-db   ;; which uses reg-event-db 
       id
       [omni-ceptor interceptors] ;; <-- inject `omni-ceptor`
       handler)))
``` 

NB: did you know that interceptor chains are flattened and nils are removed?

With this in place, you would always use `my-reg-event-db` 
instead of the standard `reg-event-db`: 
```clj
(my-reg-event-db 
   :event-id
   (fn [db v] 
      ...))
```

And, hey presto, you'd have your `omni-ceptor` "globally" injected.
