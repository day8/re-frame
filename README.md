

<p align="center"><a href="https://day8.github.io/re-frame" target="_blank" rel="noopener noreferrer"><img src="docs/images/logo/re-frame-colour.png?raw=true" alt="re-frame logo"></a></p>

## Derived Values, Flowing

> This, milord, is my family's axe. We have owned it for almost nine hundred years, see. Of course,
sometimes it needed a new blade. And sometimes it has required a new handle, new designs on the
metalwork, a little refreshing of the ornamentation ... but is this not the nine hundred-year-old
axe of my family? And because it has changed gently over time, it is still a pretty good axe,
y'know. Pretty good.

> -- Terry Pratchett, The Fifth Elephant <br>
> &nbsp;&nbsp;&nbsp; reflecting on identity, flow and derived values  (aka [The Ship of Theseus](https://en.wikipedia.org/wiki/Ship_of_Theseus))


[![CI](https://github.com/day8/re-frame/workflows/ci/badge.svg)](https://github.com/day8/re-frame/actions?workflow=ci)
[![CD](https://github.com/day8/re-frame/workflows/cd/badge.svg)](https://github.com/day8/re-frame/actions?workflow=cd)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/day8/re-frame?style=flat)](https://github.com/day8/re-frame/tags)
[![Clojars Project](https://img.shields.io/clojars/v/re-frame.svg)](https://clojars.org/re-frame)
[![GitHub issues](https://img.shields.io/github/issues-raw/day8/re-frame?style=flat)](https://github.com/day8/re-frame/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/day8/re-frame)](https://github.com/day8/re-frame/pulls)
[![License](https://img.shields.io/github/license/day8/re-frame.svg)](license.txt)

## Overview

re-frame is a ClojureScript framework for building user interfaces.
It has a data-oriented, functional design.

re-frame has been designed from the ground up to make developers ***very***
productive when building large Single-Page applications. That's its promise to you.
For many, it has delivered on this 
goal, and it has been enthusiastically praised.

Developed in late 2014, and released in 2015, it is mature and stable. It scales to 50K lines of code and beyond. It is used by small startups and by companies with 500 developers. It has outlasted multiple generations of Javascript churn, and still delivers a substantially better developer experience. Just imagine your team's productivity if you didn't have to contend with technical churn, and have new magic burn your fingers every two years.

re-frame provides another unfair advantage - ClojureScript is a Lisp. Alan Kay
once described Lisp as "Maxwell's equations of software". Paul Graham 
described how Lisp was a competitive advantage for his startup.  When we use Lisp, we 
get to leverage 50 years of foliated excellence from the very best minds available.
We also get to leverage a thriving ClojureScript community which delivers modern ideas and best-in-class tooling.

re-frame was created by a programmer who had been developing for two decades
before the Web was even "a thing". Yeah, that old. He's seen a UI or two along the way. Still has hair.

Although re-frame leverages React, it only needs 
React to be a V in MVC, and no more. re-frame does not buy into the sadly-pervasive idea that Views should be causal (colocated queries, ComponentDidMount, hooks, etc).
In re-frame, events are causal and views are purely reactive. 

## Documentation 

The re-frame documentation is [available here](http://day8.github.io/re-frame/).


## The Current Version 

Can be seen in the clojars badge above. 

## Licence

re-frame is [MIT licenced](license.txt)

