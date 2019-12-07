# A Simple App

This tiny application is meant to provide a quick start of the basics of re-frame.  

A detailed source code walk-through is provided in the docs:
https://github.com/day8/re-frame/blob/master/docs/CodeWalkthrough.md

All the code is in one namespace: `/src/simple/core.cljs`.

### Run It And Change It   

Steps:

1. Check out the re-frame repo
2. Get a command line
3. `cd` to the root of this sub project (where this README exists)
4. Run "`lein do clean, shadow watch client`"  to compile the app and start up shadow-cljs hot-reloading
5. Wait for the compile to finish. At a minumum, that might take 15 seconds. But it can take more like 60 seconds if you are new to ClojureScript and various caches are empty. Eventually you should see `[:client] Build Completed (... stats ...)`
6. Open `http://localhost:8280/example.html` to see the app

While step 4 is running, any changes you make to the ClojureScript 
source files (in `src`) will be re-compiled and reflected in the running 
page immediately.

### Production Version

Run "`lein do clean, shadow release client`" to compile an optimised 
version, and then open `resources/public/example.html` in a browser.
