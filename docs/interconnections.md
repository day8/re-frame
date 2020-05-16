

Ask a Systems Theorist, and they'll tell you that a system has **parts** and **interconnections**.

Human brains tend to focus first on the **parts**, and then, later, maybe on
**interconnections**. But we know better, right? We
know interconnections are often critical to a system.
"Focus on the lines between the boxes" we lecture anyone kind enough to listen (in my case, glassy-eyed family members).

In the case of re-frame, dominoes are the **parts**, so, tick, yes, we have
looked at them first. Our brains are happy. But what about the **interconnections**?

If the **parts** are functions, as is the case with re-frame,
what does it even mean to talk about **interconnections between functions?**
To answer that question, I'll rephrase it as:
how are the domino functions **composed**?

At the language level,
Uncle Alonzo and Uncle John tell us how a function like `count` composes:   
```clj
(str (count (filter odd?  [1 2 3 4 5])))
```
We know when `count` is called, and with what
argument, and how the value it computes becomes the arg for a further function.
We know how data "flows" into and out of the functions.

Sometimes, we'd rewrite this code as:
```clj
(->>  [1 2 3 4 5]
      (filter odd?)
      count
      str)
```
With this arrangement, we talk of "threading" data
through functions. **It seems to help our comprehension to conceive function
composition in terms of data flow**.

re-frame delivers architecture
by supplying the interconnections - it threads the data - it composes the dominoes - it is the lines between the boxes.

But it doesn't have a universal method for this "composition". The technique it uses varies from one domino
neighbour-pair to the next.  Initially, it uses a queue/router, then a pipeline of interceptors
and, finally, a Signal Graph.

Remember back in the Introduction?  Our analogy for re-frame was the water cycle - water flowing around the loop,
compelled by different kinds of forces at different times (gravity, convection, etc), going through phase changes.

With this focus on interconnections, we have been looking on the "forces"  part of the loop.  The transport.
