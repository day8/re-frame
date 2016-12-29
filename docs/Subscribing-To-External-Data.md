<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Contents

- [Subscribing to External Data](#subscribing-to-external-data)
  * [There Can Be Only One!!](#there-can-be-only-one--)
  * [Components Don't Know, Don't Care](#components-don-t-know--don-t-care)
  * [A 2nd Source](#a-2nd-source)
  * [Via A Subscription](#via-a-subscription)
  * [The Subscription Handler's Job](#the-subscription-handler-s-job)
  * [Some Code](#some-code)
  * [Any Good?](#any-good-)
  * [Warning: Undo/Redo](#warning--undo-redo)
  * [Query De-duplication](#query-de-duplication)
  * [Thanks To](#thanks-to)
- [The Alternative Approach](#the-alternative-approach)
- [Absolutely Never Do This](#absolutely-never-do-this)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Subscribing to External Data

In [Talking To Servers](Talking-To-Servers.md) we learned how to 
communicate with servers using both pure and effectful handlers. 
This is great, but what if you want to 
query external data using subscriptions the 
same way you query data stored in `app-db`? This tutorial will show you how.

### There Can Be Only One!!

`re-frame` apps have a single source of data called `app-db`.

The `re-frame` README asks you to imagine `app-db` as something of an in-memory database. You 
query it (via subscriptions) and transactionally update it (via event handlers). 

### Components Don't Know, Don't Care

Components never know the structure of your `app-db`, much less its existence. 

Instead, they `subscribe`, declaratively, to 
data, like this `(subscribe [:something "blah"])`, and that allows Components to 
obtain a stream of updates to "something", while knowing nothing about the source of the data. 

### A 2nd Source

All good but ... SPAs are seldom completely self contained data-wise. 

There's a continuum between apps which are 100% standalone data-wise, 
and those where remote data is utterly central to the app's function. 
In this page, we're exploring the remote-data-centric end of this continuum.

And just to be clear, when I'm talking about remote data, I'm thinking of data 
luxuriating in remote databases like firebase, rethinkdb, PostgreSQL, Datomic, etc 
- data sources that an app must query and mutate.

So, the question is: how would we integrate this kind of remote data into an app when
re-frame seems to have only one source of data: `app-db`?  
How do we introduce a second or even third source of data?  How should we `subscribe` 
to this remote data, and how would we `update` it?

By way of explanation, let's make the question specific: how could we wire up a 
Component which displays a collection of `items`, 
when those items come from a remote database? 

In your mind's eye, imagine this kind of query against that remote database:
 `select id, price, description from items where type="see through"`.

### Via A Subscription

In `re-frame`, Components always obtain data via a subscription. Always.  

So, our Component which shows items is going to 
```clj
(let [items (re-frame/subscribe [:items "see through"]) ...
```
and the subscription handler will deliver them. 

Which, in turn, means our code must have a subscription handler defined:
```clj
(re-frame/reg-sub
  :items
  (fn [db [_ item-type]
    ...))
```

Which is fine ... except we haven't really solved this problem yet, have we?  
We've just transferred 
the problem away from the Component and into the subscription handler? 

Well, yes, we have, and isn't that a fine thing!!  That's precisely what we want 
from our 
subscription handlers ... to manage how the data is sourced ... to hide that from 
the Component.

### The Subscription Handler's Job

Right, so let's write the subscription handler. 

There'll be code in a minute but, first, let's describe how the subscription handler
will work: 

   1. Upon being required to provide items, it has to issue 
      a query to the remote database. Perhaps this will be done via
      a RESTful GET. Or via a firebase connection. Or by pushing a JSON 
      representation of the query down a websocket. Something. And it is the 
      subscription handler's job to know how it is done.  
      
   2. This query be async - with the results arriving sometime "later". And when they 
   eventually arrive, the handler must organise for the query results to be placed into `app-db`, 
   at some known, particular path. In the meantime, the handler might want to ensure that the absence of 
   results is also communicated to the Component, allowing it to display "Loading ...".
   [The Nine States of Design](https://medium.com/swlh/the-nine-states-of-design-5bfe9b3d6d85#.j52018nod) 
   has some useful information on designing your application for different states that your data might be in.

   3. The subscription handler must return something to the Component. It should give back a 
      `reaction` to that known, particular path within `app-db`, so that when the query results 
      eventually arrive, they will flow through into the Component for display.

   4. The subscription handler will detect when the Component is destroyed and no longer requires 
      the subscription. It will then clean up, getting rid of those now-unneeded items, and
      sorting out any stateful database connection issues. 
      
Notice what's happening here.  In many respects, `app-db` is still acting as the single source of data.
The subscription handler is organising for the right remote data to "flow" into `app-db` at a known, 
particular path, when it is needed by a Component. And, equally, for this data to be cleaned up when it 
is no longer required.

### Some Code

Enough fluffing about with words, here's a code sketch for our subscription handler:
```clj
(re-frame/reg-sub-raw
  :items
  (fn [app-db [_ type]]
       (let  [query-token (issue-items-query!
                            type
                            :on-success #(re-frame/dispatch [:write-to  [:some :path]]))]
         (reagent/make-reaction
           (fn [] (get-in @app-db [:some :path] []))
           :on-dispose #(do (terminate-items-query! query-token)
                            (re-frame/dispatch [:cleanup [:some :path]]))))))
```

A few things to notice:

1. We are using the low level `reg-sub-raw` to register our handler (and not the more normal `reg-sub`)
   so we can get an `:on-dispose` callback when the subscription is no longer needed.
   [See the `reg-sub-raw` docs at the end of this tutorial](SubscriptionFlow.md)
   
2. You have to write  `issue-items-query!`.  Are you making a Restful GET? 
   Are you writing JSON packets down a websocket?  The query has to be made.

3. We do not issue the query via a `dispatch` because, to me, it isn't an event. But we most certainly 
   do handle the arrival of query results via a `dispatch` and associated event handler. That to me 
   is an external event happening to the system. The event handler can curate the arriving data in 
   whatever way makes sense. Maybe it does nothing more than to `assoc` into an `app-db` path, 
   or maybe this is a rethinkdb changefeed subscription and your event handler will have to collate 
   the newly arriving data with what has previously been returned. Do what 
   needs to be done in that event handler, so that the right data will be put into the right path.
 
3. We use Reagent's `make-reaction` function to create a reaction which will return 
   that known, particular path within `app-db` where the query results are to be placed.

4. We use the `on-dispose` callback on this reaction to do any cleanup work
   when the subscription is no longer needed. Clean up `app-db`?  Clean up the database connection?


### Any Good?

It turns out that this is a surprisingly flexible and clean approach. And pretty damn obvious once 
someone points it out to you (which is a good sign).  There's a lot to like about it.

For example, if you are using rethinkdb, which supports queries which yield "change feeds" over time,
rather than a one-off query result, you have to actively close such queries when they are no longer needed. 
That's easy to do in our cleanup code.

We can source some data from both PostgreSQL and firebase in the one app, using the same pattern. 
All remote data access is done in the same way.

Because query results are `dispatched` to an event handler, you have a lot of flexibility 
about how you process them. 

The whole set of pieces can be arranged and tweaked in many ways.  For example, 
with a bit of work, we could keep a register of all currently used queries.
And then, if ever we noticed that the app had gone offline, 
and then back online, we could organise to reissue all the queries  again 
(with results flowing back into 
the same known paths), avoiding stale results.

Also, notice that putting ALL interesting data into `app-db` has nice 
flow on effects. In particular, it means it is available to event handlers, 
should they need it when servicing events (event handlers get `db` as a parameter, right?).  
If this item data was held in a separate place, other than `app-db`, 
it wouldn't be available in this useful way.  

### Warning: Undo/Redo

This technique caches remote data in `app-db`.  Be sure to exclude this 
cache area from any undo/redo operations 
using [the available configuration options](https://github.com/Day8/re-frame-undo#harvesting-and-re-instating)

### Query De-duplication 

In v0.8.0 of re-frame onwards, subscriptions are automatically de-duplicated. 

In prior versions, in cases where the same query is simultaneously issued 
from multiple places, you'd want to 
de-duplicate the queries. One possibility is to do this duplication 
in `issue-items-query!` itself. You can
`count` the duplicate queries and only clear the data when that count goes to 0. 

### Thanks To

@nidu for his valuable review comments and insights

## The Alternative Approach

Event handlers do most of the heavy lifting within re-frame apps.

When buttons get clicked, or items get dragged 'n dropped, or tabs get
chosen, they know how to transition the app from one state 
to the next. That's their job. And, when they make such
a transition, it is quite reasonable to expect them to ALSO 
source the data needed in the new state. 

So there's definitely a case for NOT using the approach outlined 
above and, instead, making event handlers source data and 
plonk it into a certain part of `app-db` for use by subscriptions. 

In effect, there's definitely an argument that 
subscriptions should only ever source from `app-db` BUT that it is 
event handlers which start and stop the sourcing of data from 
remote places.  

Sorry, but you'll have to work out which of these two variations
works best for you. 

Within this document the first alternative has been given more word count 
only because there's a few more tricks to make it work, not because it 
is necessarily preferred. 

## Absolutely Never Do This  

Sometimes, because of their background with other JS frameworks, 
new re-framians feel like the Components themselves (the views) 
should have the responsibility of sourcing the data they need. 

They then use React lifecycle methods like `:component-did-mount` 
to load remote data. 

I believe this is absolutely the wrong way to do it. 

In re-frame, we want views to be as simple and dumb as possible. They turn 
data into HTML and nothing more. they absolutely do not do imperative stuff.

Use one of the two alternatives described above.
 
***

Previous:  [Talking to Servers](Talking-To-Servers.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
