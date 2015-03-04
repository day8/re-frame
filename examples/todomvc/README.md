# TodoMVC done with re-frame

A re-frame implementation of [TodoMVC](http://todomvc.com/).


## Setup And Run

1. Install Lien

1. Get the re-frame repo
   ```
   git clone https://github.com/Day8/re-frame.git
   ```

1. go to the right example directory
   ```
   cd re-frame/examples/todomvc
   ```

1. build
   ```
   lein cljsbuild once
   ```

1. run
   ```
   open todo.html
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

Each part has its own cljs namespace.


## Notes

This is a modified version of the [the offical reagent example](https://github.com/reagent-project/reagent/tree/master/examples/todomvc)

