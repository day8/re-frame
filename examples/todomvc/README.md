# TodoMVC done with re-frame

A [re-frame](https://github.com/day8/re-frame) implementation of [TodoMVC](http://todomvc.com/).

But this is NOT your normal, lean and minimal todomvc implementation, 
geared towards showing how easily re-frame can implement the challenge.
 
Instead, this todomvc example has evolved into more of a teaching tool 
and we've thrown in more advanced re-frame features which are not 
really required to get the job done. So lean and minimal is no longer a goal. 

## Setup And Run A Development Environment

1. Install [Node.js](https://nodejs.org/en/)

2. Get the re-frame repo from GitHub:
   ```sh
   git clone https://github.com/day8/re-frame.git
   ```

3. cd to the right example directory:
   ```sh
   cd re-frame/examples/todomvc
   ```

4. Kick off a clean build (compile the app and start up shadow-cljs hot-reloading)
   ```sh
   npm install
   npm run watch
   ```

5. Wait for the compile in step 4 to finish. At a minumum, 15 seconds. But, if you are new to ClojureScript and some downloads are needed (caches are empty), it might take a minute or two. Eventually you should see `[:client] Build Completed (...)`

6. Wait for step 5 to do the compile, and then open in UI in the broswer:
   ```sh
   open http://localhost:8280
   ```

## Exploring The Code

From the re-frame docs:
```
To build a re-frame app, you:
  - design your app's data structure (data layer)
  - write and register subscription functions (query layer)
  - write Reagent component functions (view layer)
  - write and register event handler functions (control layer and/or state transition layer)
  - once in a blue moon you need to write effect handlers
```

In `src`, there's a matching set of files (each small):
```
src
├── core.cljs         <--- entry point, plus history
├── db.cljs           <--- data related  (data layer)
├── subs.cljs         <--- subscription handlers  (query layer)
├── views.cljs        <--- reagent  components (view layer)
└── events.cljs       <--- event handlers (control/update layer)
```

For the most immediate feedback, edit some of the hiccup in the `views.cljs` file. When 
you save the file, shadow-cljs will immediately compile your changes and hot-reload them into the browser. 


## Further Notes

The [official reagent example](https://github.com/reagent-project/reagent/tree/master/examples/todomvc) which is very terse indeed, can be found here.


## To Compile An Optimised Version

1. Compile
   ```sh
   npm install
   npm run release
   ```

2. Open the following in your browser
   ```sh
   resources/public/index.html
   ```
