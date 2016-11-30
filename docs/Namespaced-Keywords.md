<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Namespaced Ids](#namespaced-ids)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Namespaced Ids

As an app gets bigger, you'll tend to get clashes on ids - event-ids, or query-ids (subscriptions), etc. 
 
One panel will need to `dispatch` an `:edit` event and so will 
another, but the two panels will have different handlers. 
So how then to not have a clash? How then to distinguish between 
one `:edit` event and another?

Your goal should be to use event-ids which encode both the event 
itself (`:edit` ?) and the context (`:panel1` or `:panel2` ?). 

Luckily, ClojureScript provides a nice easy solution: use keywords 
with a __synthetic namespace__. Perhaps something like `:panel1/edit` and `:panel2/edit`. 

You see, ClojureScript allows the namespace in a keyword to be a total
fiction. I can have the keyword `:panel1/edit` even though 
`panel1.cljs` doesn't exist. 

Naturally, you'll take advantage of this by using keyword namespaces 
which are both unique and descriptive.

***

Previous:  [Navigation](Navigation.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Loading Initial Data](Loading-Initial-Data.md)  
