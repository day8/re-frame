

<p align="center"><img src="../images/logo/re-frame-colour.png?raw=true" alt="The re-frame Logo"></p>

A framework for building Modern Web Apps in ClojureScript. It leverages React, via [Reagent].

McCoy might report "It's MVC, Jim, but not as we know it".  And you would respond 
"McCoy, you trouble maker, why even mention an OO pattern? 
re-frame is a **functional framework**."

So, it is about `data`, and the `functions` 
which transform that data.  And, because it is a **reactive framework**, `data` coordinates 
`functions`, not the other way around.

<!-- 
re-frame's original tag line was ~~derived values, flowing~~ but that's not nearly 
pretentious enough for a modern framework. So, instead, it is now
**_putting state into state of the art_**. 
Ahhh, yes, I can feel those GitHub stars building already.
-->


[Reagent]:http://reagent-project.github.io/

## Why Should You Care?

Perhaps:

1.  You want to develop a modern web application using ClojureScript.
2.  You want to maximise developer productivity by writing [fewer lines of code](https://medium.com/dailyjs/a-realworld-comparison-of-front-end-frameworks-2020-4e50655fe4c1). You want a simple dynamic process that you can simulate in your head. And you want a clean approach to effects and state management.
2.  You are curious about the benefits of **_data-oriented design_**.
2.  You are a refugee from technical churn, seeking stability and productivity.
    For six years, ClojureScript, Reagent and re-frame have barely changed. No need. Still cutting edge.
2.  You want to see how `reactive programming`, `functional programming` and `immutable data`
    combine in a language that genuinely embraces those paradigms.
3.  You're taking a [Functional Design and Programming course](http://www.eli.sdsu.edu/courses/fall15/cs696/index.html) at San Diego State University
    and you have a re-frame assignment due.  You've left the reading a bit late, right?
4.  You seek a better Redux, Elm, Cycle.js or Pux. In this space, re-frame is very old, 
    hopefully in a Gandalf kind of way.
    Designed in late 2014, it slightly pre-dates the official Elm Architecture,
    although thankfully we picked up `foldp` ideas from early Elm games. 
    Our main inspiration was the
    Clojure projects [Pedestal App], [Hoplon] and [Om]. Since then,
    re-frame has pioneered ideas like event handler middleware,
    coeffect accretion, and de-duplicated signal graphs.
5.  Which brings us to the most important point: **re-frame is impressively buzzword compliant**. It has reactivity,
    unidirectional data flow, pristinely pure functions,
    interceptors, coeffects, conveyor belts, algebraic effects, statechart-friendliness 
    and claims an immaculate hammock conception. All while being both simple and easy. There's also a charming
    xkcd reference (soon) and a hilarious, insiders-joke T-shirt,
    ideal for conferences (in design).  
    
    What could possibly go wrong?

[Pedestal App]:https://github.com/pedestal/pedestal-app
[SPA]:http://en.wikipedia.org/wiki/Single-page_application
[OM]:https://github.com/swannodette/om
[Hoplon]:http://hoplon.io/



## It Is Mature

re-frame was released in early 2015, and has since 
[been](https://www.fullcontact.com) successfully
[used](https://www.nubank.com.br) by
[many](http://open.mediaexpress.reuters.com/) a 
[companies](https://rokt.com/) and
individuals to build complex apps, many running beyond 40K lines of
ClojureScript.

<img align="right" src="../images/scale-changes-everything.jpg">

**Scale changes everything.** Frameworks
are just pesky overhead at small scale - measure them instead by how they help
you tame the complexity of bigger apps, and in this regard re-frame has
worked out well. Some have been effusive in their praise.

And, yes, re-frame is fast, straight out of the box. And, yes, it has 
a good testing story (unit and behavioural). And, yes, it works with 
tools like figwheel or shadow-cljs to create
a powerful hot-loading development story. And, yes, it has 
fun specialist tooling, and a community,
and useful 3rd party libraries.



<!-- 
Don't delete the following blank H1, even though it looks useless and a mistake.
It is a trick to stop mkdocs adding a title for this page. 
We want the logo to be the title. 

Apparently, with mkdocs, if a page has any H1 element in it, 
even at the end, like this useless one, a title won't be automatically put at the top. 
 -->
# 
