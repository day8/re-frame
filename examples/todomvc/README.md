# TodoMVC done with re-frame

A [re-frame](https://github.com/Day8/re-frame) implementation of [TodoMVC](http://todomvc.com/).


## Setup And Run

1. Install [Leiningen](http://leiningen.org/)  (plus Java).

1. Get the re-frame repo
   ```
   git clone https://github.com/Day8/re-frame.git
   ```

1. cd to the right example directory
   ```
   cd re-frame/examples/todomvc
   ```

1. build
   ```
   lein cljsbuild once
   ```

1. run
   ```
   open index.html
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
└── handlers.cljs     <--- event handlers (control/update layer)
```

## Notes

Various:
 - The [offical reagent example](https://github.com/reagent-project/reagent/tree/master/examples/todomvc).
 - There's also a sibling example (under construction) called TodoMVC-plus which is a more complete example, including testing etc.
 - Look at the [re-frame Wiki](https://github.com/Day8/re-frame/wiki).
