
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

Why is re-frame implemented in `.cljc` files?   Aren't ClojureScript 
files meant to be `.cljs`?

## Answer 

So tests can be run on both the JVM and the JS platforms,
re-frame's implementation is mostly in `.cljc` files. 
 
The trailing `c` in `.cljc` stands for `common`.  

Necessary interop for each platform can be found in
`interop.clj`  (for the JVM)  and `interop.cljs` (for JS).

See also: <https://github.com/day8/re-frame-test>
