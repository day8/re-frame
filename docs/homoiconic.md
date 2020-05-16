
ClojureScript is a modern LISP, and LISPs are **homoiconic**.  

You program in a LISP by creating and
assembling LISP data structures. The syntax is data literals. Dwell on that for a moment. You are **_programming in data_**. 
The functions which later transform data, themselves start as data. 

<img align="right" width="220" src="../images/yinyang.png">

So, Clojurists place particular emphasis on the primacy of data. 

They meditate on aphorisms like **_data is the ultimate in late binding_**. They 
exalt inequalities like `data > functions > macros`. (Disappointingly,
they also re-watch Rich Hickey videos a bit too much and wish
their hair was darker and more curly.)

<!-- 
... That's the dark side.

Speaking of which, whenever Darth Vader encounters a Clojurist, he comments "the duality-of-data-and-code is strong with this one". 

You get the idea. 
-->

I cannot stress enough what a big deal this is. It will seem 
like a syntax curiosity at first but, when the penny drops for 
you on this, it tends to be a profound moment.

So, it will come as no surprise, then, to find that re-frame has a 
data-oriented design. Events are data. Effects are data. DOM is data.
The functions which transform data are registered and looked up via 
data. Interceptors (data) are preferred to middleware (higher 
order functions). Etc.

And re-frame apps are reactive 
which further elevates data because in reactive systems, 
it is the arrival of data which [coordinates the calling of functions](https://www.youtube.com/watch?v=ZgqFlowyfTA&t=80), not the other way around. 

Data - that's the way we roll.
