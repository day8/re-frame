# A Simple App

This tiny application is meant to provide a quick start of the basics of re-frame.  

A detailed source code walk-through is provided in the docs:
https://github.com/Day8/re-frame/blob/master/docs/CodeWalkthrough.md

All the code is in one namespace: `/src/simple/core.cljs`.

### Run It And Change It   

Steps:

1. Check out the re-frame repo
2. Get a command line
3. `cd` to the root of this sub project (where this README exists)
4. run "`lein do clean, figwheel`"  to compile the app and start up figwheel hot-reloading, 
5. open `http://localhost:3449/example.html` to see the app

While step 4 is running, any changes you make to the ClojureScript 
source files (in `src`) will be re-compiled and reflected in the running 
page immediately.

### Production Version

Run "`lein do clean, with-profile prod compile`" to compile an optimised 
version, and then open `resources/public/example.html` in a browser.
