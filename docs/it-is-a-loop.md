
Architecturally, re-frame implements "a perpetual loop".

To build an app, you hang pure functions on certain parts of this loop, 
and re-frame looks after the **conveyance of data** 
around the loop, into and out of the transforming functions you 
provide - "derived values, flowing".

Remember this diagram from school? The water cycle, right?

<img height="290px" align="right" src="../images/the-water-cycle.png?raw=true">

Two distinct stages, involving water in different phases, being acted upon
by different forces: gravity working one way, evaporation and convection the other.

To understand re-frame, **imagine data flowing around that loop instead of water**.

re-frame provides the conveyance of the data around the loop - the equivalent
of gravity, evaporation and convection.
You design what's flowing, and then you hang functions on the loop at
various points to compute the data's phase changes.

Sure, right now, you're thinking "lazy sod - make a proper Computer Science-y diagram". But, no.
Joe Armstrong says "don't break the laws of physics" - I'm sure
you've seen the videos - and if he says to do something, you do it
(unless Rich Hickey disagrees, and says to do something else). 

So, this diagram, apart from being a plausible analogy which might help
you to understand re-frame, is **practically proof** it does physics.


<!-- 

## Bourgeois Claims

After "elegance", the next most likely claim made for a Framework might be
"it reduces coupling and increases cohesion". That old chestnut. 

Now, normally I would never make such a technically bourgeois claim. As a haute couture
framework designer, it would be beneath me, oui? But if someone forced me to do it - say, 
at gunpoint - I'd reluctantly point out:

  - With re-frame, you write independent, pure functions.  That's the "reduces coupling" part.
  - And then re-frame itself looks after the conveyance of data between these functions, in and out of them. Data flow supplies the "cohesion".

-->
