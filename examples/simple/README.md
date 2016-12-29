# A Simple App

This tiny application is meant to provide a quick start of the basics of re-frame.  

A detailed source code walk-through is provided in the docs:
https://github.com/Day8/re-frame/blob/master/docs/CodeWalkthrough.md

All the code is in one namespace `/src/simpleexample/core.cljs` 

### Run It And Change It   

Steps:

A. Check out the re-frame repo
1. Get a command line
2. `cd` to the root of this sub project (where this README exists)
3. run "`lein do clean, figwheel`"  to compile the app, 
4. open `http://localhost:3449/example.html` to see the app

Whileever step 3 is running, any changes you make to the ClojureScript 
source files (in `src`) will be re-compiled and reflected in the running 
page immediately.

### Production Version

Run "`lein do clean, with-profile prod compile`" to compile an optimized 
version, and then open `resources/public/example.html`.
