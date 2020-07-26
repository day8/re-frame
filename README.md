

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
It has a data-oriented, functional design. Its primary focus is on high programmer productivity and scaling up to larger Single-Page applications.

Developed in late 2014, and released in 2015, it is mature and stable. It is used by both small startups and companies with over 500 developers, and it has delivered into production applications which are 40K lines of code and beyond. 

Across the last 6 years, it has outlasted multiple generations of Javascript churn - just imagine your team's productivity if you didn't have to contend with technical churn, and have new magic burn your fingers every two years. Brand new, exciting concepts like recoiljs (in the React world), have been a regular part of re-frame from the beginning. 

re-frame is lucky enough to enjoy an unfair advantage - ClojureScript is a Lisp. Alan Kay
once described Lisp as "Maxwell's equations of software". Paul Graham 
described how Lisp was a competitive advantage for his startup.  When we use Lisp, we 
get to leverage 50 years of foliated excellence from the very best minds available.
And then there's also a thriving ClojureScript community which delivers modern ideas and best-in-class tooling.

Although re-frame leverages React (via Reagent), it only needs 
React to be a V in MVC, and no more. re-frame takes a different road to the currently-pervasive idea that Views should be causal (colocated queries, ComponentDidMount, hooks, etc).
In re-frame, events are causal, and views are purely reactive. 

## Documentation 

The re-frame documentation is [available here](http://day8.github.io/re-frame/).


## The Current Version 

Can be seen in the clojars badge above. And for full dependency information see the [Clojars page](https://clojars.org/re-frame/)

## Licence

re-frame is [MIT licenced](license.txt)

