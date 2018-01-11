### Question

I'm interested in taking the re-frame concepts and applying them to 
my entire Client/Server stack.  

### Short Answer

You'll want to investigate CQRS (vs REST).

##### Notes

1. Perhaps watch [Bobby Calderwood's video](https://www.youtube.com/watch?v=B1-gS0oEtYc)?
2. Look at his [reference implementation](https://github.com/capitalone/cqrs-manager-for-distributed-reactive-services) or, perhaps, [this alternative](https://github.com/greywolve/calderwood).
4. Be aware that "Event Sourcing" often comes along for the ride
   with CQRS, but it doesn't have to. It adds complexity (Kafka?). 
   Don't do it lightly. Maybe just use CQRS without ES? 
5. If you do want Event Sourcing, then Kafka might be your friend, 
   Greg Young might be your God and [Onyx](https://github.com/onyx-platform/onyx)
   may be useful. 
   
### Further Related Links

* Reactive PostgreSQL:
  https://yogthos.net/posts/2016-11-05-LuminusPostgresNotifications.html
* Datalog All The Way Down:
  https://www.youtube.com/watch?v=aI0zVzzoK_E
 

***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
