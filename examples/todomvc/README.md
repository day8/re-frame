# TodoMVC done with re-frame




## Setup And Run

This demo is delivered as part of re-frame.

Before you start, ensure you have lein XXX

1. Get the re-frame repo
   ```
   git clone https://github.com/Day8/re-frame.git
   ```

2. go to the right example directory
   ```
   cd re-frame/examples/todomvc
   ```

3. build
   ```
   lein cljsbuild once
   ```

4. run
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

Each of these


## Notes


1. A modified version of [the offical reagent example](https://github.com/reagent-project/reagent/tree/master/examples/todomvc)

