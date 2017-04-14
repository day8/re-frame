### Question

How do I access the value of a subscription from inside an event handler? 

### Short Answer

You shouldn't.

Philosophically: subscriptions are designed to deliver "a stream" of new values 
over time. Within an event handler, we only need a one off value.
 
Operationally: you'll end up with a memory leak.  
  
### Longer Answer


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->




