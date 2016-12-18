### Question

Why is re-frame implemented in `.cljc` files?   Aren't ClojureScript 
files meant to be `.cljs`?

### Answer 

So tests can be run on both the JVM and the JS platforms,
re-frame's implementation is mostly in `.cljc` files. 
 
The trailing `c` in `.cljc` stands for `common`.  

Necessary interop for each platform can be found in
`interop.clj`  (for the JVM)  and `interop.cljs` (for JS).

See also: https://github.com/Day8/re-frame-test


***

Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
