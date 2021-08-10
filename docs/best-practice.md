> This is not a real document yet.  It is just a scratch pad for producing a later document. Don't read it. 

1.  Use Namespaced Keywords

    Can be synthetic or real namespaces. 

    If you use clojure-lsp it will help you to navigate from keywords to their definition. 

2. Structure all your events as two tuples
    
    [:event-name  a-map]
    
    Then use `unwrap` middleware
    
3. Event handlers should not emit other events

   As a general rule, an event should embody user intent. 

   So, if the user clicks the "delete item" button, that's an event, and there should be an associated event handler which knows how 

   The event handler (and interceptor chain) for that even should completely handle the event. 
   Events shouldn't be used to "farm out" work to other event handlers. 

   To say it another way, Event handlers should not be used to "factor out" common code, as you might do with 

   Instead, you should factor out common code 

4. It might be a good idea to "compose" event handlers

5. Views should not be imperative 

6. Namespace Structure

   Either:
     - one namespace for the entire "panel" - including views, event handlers etc. 
     - when that gets unwieldy, then one directory per panel, with namespaces for views, event handlers, subscriptions, etc.   



