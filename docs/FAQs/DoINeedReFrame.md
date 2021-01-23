
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

Reagent looks terrific.  So, why do I need re-frame?  What benefit 
is there in the extra layers and conceptual overhead it brings?

## Answer 

Yes, we agree, Reagent is terrific. We use it enthusiastically ourselves. And, yes, we'd agree that if your application 
is small and simple, then standalone Reagent is a reasonable choice.

But it does only supply the V part of the MVC triad. As your application 
gets bigger and more complicated, you *will* need to find solutions to 
questions in the M and C realms. 

Questions like "where do I put control logic?".
And, "how do I store and update state?".
And, "how should new websocket packets be communicated with the broader app"? Or GET failures? 
And, "how do I put up a spinner
when waiting for CPU intensive computations to run, while allowing the user to press Cancel?"
How do I ensure efficient view updates?  How do I write my control logic in a way that's testable? 

These questions accumulate. 

Reagent, by itself, provides little guidance and, so, you'll need to
design your own solutions. Your choices will also accumulate and,
over time, they'll become baked into your codebase.

Now, any decision which is hard to revisit later is an architectural decision - 
"difficult to change later" is pretty much the definition of "architecture".  So, 
as you proceed, baking your decisions into your codebase, you will be 
incrementally growing an architecture.

So, then, the question is this: is your architecture better than re-frame's?  Because 
that's what re-frame gives you ... an architecture ... solutions to the
various challenges you'll face when developing your app, and mechanism for implementing  
those solutions.

Now, in response, some will enthusiastically say "yes, I want to grow my own 
architecture. I like mine!". And fair enough - it can be an interesting ride!

Problems arise ONLY when this process is not conscious and purposeful. It is a 
credit to Reagent that you can accelerate quickly and get a bunch of enjoyable 
early wins. But, equally, that acceleration can have you off the road
in a ditch because of the twists and turns on the way to a larger application.

I've had many people (20?) privately say to me that's what happened to them. 
And that's pretty much the reason for this FAQ - this happens a bit too often
and there's been a bit too much pain.

So, my advice is ... if your application is a little more complicated,
be sure to make a conscious choice around architecture. Don't think 
"Reagent is all I need", because it isn't. One way or
another you'll be using "Reagent + a broader architecture".

## Example Choices Made By re-frame

1. Events are cardinal. Nothing happens without an event.
2. Events are data  (so they are loggable, and can be queued, etc).
3. Dispatched events are handled async - they are put in a queue and handled very soon, but not now (for a variety of subtle reasons).
4. For efficiency, subscriptions (reactions) should be layered and de-duplicated.
5. Views are never imperative or side effecting (best effort).
6. Unidirectional data flow only, ever.
7. Interceptors over middleware. Provide cross cutting concerns like logging and debugging.
8. Event handlers capture control and contain key logic. Ensure purity via coeffects and effects. 
9. All state is stored in one place. 
10. State is committed-to transactionally, never incrementally or piecemeal.

Hmm. I feel like I'm missing a few, but that's certainly an indicative list.

re-frame is only about 750 lines of code.  So its value is much more in the honed
choices it embodies (and documents), than the code it provides.

## What Reagent Does Provide

Above I said:
> Reagent, by itself, provides little guidance ...

which is true but, it does provide useful building blocks. If you do want to create 
your own architecture, then be sure to check out Reagent's `track`, `reaction` and `rswap`. 

There's also other Reagent-based architectures like [keechma](https://github.com/keechma/keechma) and 
[carry](https://github.com/metametadata/carry) which make different choices - ones which may 
better suit your needs.
