## Subscriptions 

A re-frame app is 75% derived data. 

`app-db` is the root, authoratative source of data but radiating 
from it is a graph of nodes all computing derived data. Ultimately, the leaf nodes of 
this graph are ViewFunctions which compute hiccup (yes, derived data)
which is rendered into the application's UI. But sitting within
the graph, between the root and these leaves, are intermediate
computational nodes supplied by subscriptions which compute 
materialised views of the data in `app-db`.

## The Domino Narrative

In terms of the dominos narrative, subscriptions are domino 4,
and the leaf View Functions are domino 5. For tutorial purposes, 
we distinguish between them - they serve different purposes - but 
they are, conceptually, all nodes in the same graph.

## Graph Shapes

In the simplest version of a graph, subscriptions simply extract
some part of the data in `app-db`, which then flows on into 
ViewFunctions unchanged.

In more complex examples, subscriptions are 
layered, with some obtaining data from one or more other 
subscriptions, before a ViewFunctions eventually receive 
highly processed versions of what's in `app-db`. 

## The Layers

The layers in this graph are as follows: 
   - layer 1 is the root node, `app-db`. 
   - layer 2 subscriptions extract data directly from `app-db`.
   - layer 3 subscriptions obtain data from other subsciptions (not `app-db`), and compute derived data.
   - layer 4 the view functions which compute hiccup (more derived data)

As we'll see soon, there's efficency reasons to distinguish between layer 2 (extractor) 
and layer 3 (materialised view).

## reg-sub 

Subscription handlers are registered using `reg-sub`. 
 
But note: just because you register a handler doesn't mean that node exists in 
the graph. You are only defining how the node would compute if it was needed. 

Nodes in the signal graph are created and destroyed according to the demands
of (leaf) ViewFunction nodes (layer 4). 

When a ViewFunction (layer 4) uses a subscription, the graph of nodes needed to service
that subscription will be created and, later, when the ViewFunction is destroyed 
that part of the graph will also be destroyed (unless used for other purposes). 

## An Infographic Depiction 

Please read the following infographic carefully
because it contains important notes.

<img src="/images/subscriptions.png?raw=true">

## Example Use 

To see `reg-sub` used in a real application, please read through the 
heavily commented subscription code
[in the todomvc example](https://github.com/Day8/re-frame/blob/master/examples/todomvc/src/todomvc/subs.cljs).



*** 

Previous:  [Coeffects](Coeffects.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [Correcting a wrong](SubscriptionsCleanup.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

