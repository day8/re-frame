## Subscriptions 

A re-frame app is 75% derived data. `app-db` is the root, authoratative
source of data but radiating from it is a graph of derived data.

Ultimately, the leaf nodes of this graph are ViewFunctions
which compute hiccup (more data) which is rendered into the application's UI.   
But sitting within the graph, between the 
root and these leaves, are intermediate computational 
nodes supplied by subscriptions, which produce (more data) "materialsed views"
of `app-db`. 

## The Domino Narative

In terms of the dominos narative, subscriptions are domino 4, 
and the leaf View Functions are domino 5. For tutorial purposes, 
we distinguishthem - they serve different needs - but 
keep in mind they are, conceptually, all nodes in the same graph.

## Subscriptions

In the simplest version of a graph, subscriptions simply extract 
data from `app-db`, which then flows on into ViewFunctions unchanged. 
So what get delivered to the ViewFunctions is exactly what's in `app-db`.

In more complex examples, subscriptions are 
layered, with some obtaining data from one or more other 
subscriptions, and each node in the graph does further computations 
to produce materialised views of the data currently in `app-db`. What 
the ViewFunctions eventually recieve is a highly processed version of what's
in `app-db`. 

## The Layers

The layers in this graph are as follows: 
   - layer 1 is the root node, `app-db`
   - layer 2 subsrcitpions take data directly from `app-db`
   - layer 3 subsrciptions take data only from other subsciptions (not `app-db`)
   - layer 4 the view functions 

As we'll see soon, there's good reasons to distinguish between layer 2 (extractor) 
and layer 3 (materialised view).

## reg-sub 

As we have already seen, subscription handlers are registered via `reg-sub`. 
 
But note: just because you register a handler doesn't mean that node exists in 
the graph. You are simply defining what would happen if ever the node was needed. 

Nodes in the signal graph are created and destroyed according to the demands  
of (leaf) ViewFunction nodes. 

When a ViewFunction uses a subscription whatever nodes are needed to service
that subscription will be created, and when the ViewFunction is destroyed 
that part of the graph servicing that need will be destroyed (unless used 
for other purposes). 

## Infographic and Code

There's now two things to do: 

  - **First**, look at the Infographic below. Please be sure to read it carefully
    because it contains important information.  

  - **Then**, please read through the annotated subscription
    code [in the todomvc example](https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs).

<img src="/images/subscriptions.png?raw=true">

*** 

Previous:  [Coeffects](Coeffects.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Correcting a wrong](SubscriptionsCleanup.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

