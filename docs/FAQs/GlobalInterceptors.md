### Question

Does re-frame allow me to register global interceptors? Ones which are included 
for every event handler?

### Short Answer 

No, nothing direct.

### Longer Answer 

It's easy to make happen.

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

