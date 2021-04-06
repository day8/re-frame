# A Simple App

This tiny application is meant to provide a quick start of the basics of re-frame.  

A detailed source code walk-through is provided in the docs:
<https://day8.github.io/re-frame/dominoes-live/>


All the code is in one namespace: `/src/simple/core.cljs`.

### Run It 

Steps:

1. Install [Node.js](https://nodejs.org/en/)
2. `git clone https://github.com/day8/re-frame.git`
3. `cd re-frame/examples/simple`
4. Run "`npm install`" then "`npm run watch`" to compile the app and start up shadow-cljs hot-reloading
5. Wait for the compile to finish. At a minumum, 15 seconds. But, if you are new to ClojureScript and some downloads are needed (caches are empty), it might take a minute or two. Eventually you should see `[:client] Build Completed (...)`
6. Open `http://localhost:8280/` to see the app


So, what just happened?

The ClojureScript code under `/src` has been compiled into `javascript` and
put into `/resources/public/js/client.js` which is loaded into `/resources/public/example.html` (the HTML file you just opened in the browser)
 
Shadow-cljs (the compiler) provides for hot-reloading, which means you can edit the source code and 
immediately see the change in the browser. To test this, I'd suggest that you edit `./src/simple/core.cljs`, 
search for the string `"Hello world, it is now"`, change it to something else, save the file, then watch your 
change show up in the browser in near-realtime. 

### Production Version

Run "`npm run release`" to compile an optimised 
version, and then open `resources/public/index.html` in a browser.
