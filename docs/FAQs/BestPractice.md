<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#


## Question

What are the current best practices?

## Answer

To grasp best practices:

  1. Read through the re-frame documentation.
  2. Review example projects, like this [RealWorld example](https://github.com/jacekschae/conduit). The [Resources doc](http://day8.github.io/re-frame/External-Resources/#examples-and-applications-using-re-frame) provides further examples.

Keep in mind, best practices evolve over time. Here are some of the more recent ideas.

### Use Namespaced Keywords 

In the interests of minimalism, the docs don't use namespaced keywords for ids (event ids, subscription ids, etc), but in prectice you should. 

You can use either synthetic or real namespaces in your ids, but some experienced re-framers claim you should only use real namespaces. I remain unconvinced. Shrug.

Tip: tooling like `clojure-lsp` can help you to navigate to where an event id or subsription id is registered.

### Structuring `app-db` 

While using `app-db` as a simple map works well in many situations, if you want more structure, consider using a library like [doxa](https://github.com/ribelo/doxa) or [relic](https://github.com/wotbrew/relic).

### Use the `:fx` effect 

While event handlers can return a map of arbitrary effects, it is now recommended that they only return 
a map containing two standard keys `:db` and `:fx`.  Learn more [here](https://day8.github.io/re-frame/api-builtin-effects/#fx) and [here](http://day8.github.io/re-frame/releases/2020/#110-2020-08-24). 

### Compose Event Handlers   

Event handlers can be composed of other functions through the use of the `:db` / `:fx` effect pattern, which is described [here](https://github.com/day8/re-frame/issues/639#issuecomment-682250517)

### Avoid Placeful Events

Originally, it was recommended that events be a vector like this `[:some-event-id  arg1 arg2]`. This works reasonably for simple cases, but it does introduce fragility for more complex use cases due to the lnherent "placefulness" of vectors. 

A better practice is to encapsulate the "args" into a single map: `[:some-event-id  {:x arg1 :another arg2}]`

And then to optionally use the `unwrap` middleware on the associated event handlers. See [here](http://day8.github.io/re-frame/api-re-frame.core/#unwrap)

