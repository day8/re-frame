# TodoMVC done with re-frame

A [re-frame](https://github.com/day8/re-frame) implementation of [TodoMVC](http://todomvc.com/).

But this is NOT your normal, lean and minimal todomvc implementation, 
geared towards showing how easily re-frame can implement the challenge.
 
Instead, this todomvc example has evolved into more of a teaching tool 
and we've thrown in more advanced re-frame features which are not 
really required to get the job done. So lean and minimal is no longer a goal. 


## Setup And Run

1. Install [Leiningen](http://leiningen.org/)  (plus Java).

2. Get the re-frame repo
   ```
   git clone https://github.com/day8/re-frame.git
   ```

3. cd to the right example directory
   ```
   cd re-frame/examples/todomvc
   ```

4. Clean build
   ```
   lein do clean, shadow watch client
   ```

5. Wait for step 4 to do the compile, and then run the built app:
   ```
   open http://localhost:8280
   ```


## Compile an optimised version

1. Compile
   ```
   lein do clean, shadow release client
   ```

2. Open the following in your browser
   ```
   resources/public/index.html
   ```


## Exploring The Code

From the re-frame readme:
```
To build a re-frame app, you:
  - design your app's data structure (data layer)
  - write and register subscription functions (query layer)
  - write Reagent component functions (view layer)
  - write and register event handler functions (control layer and/or state transition layer)
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

## Further Notes

The [official reagent example](https://github.com/reagent-project/reagent/tree/master/examples/todomvc). 
