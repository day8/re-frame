# Table of content

## Domino 1
* [app-db (Application State)](ApplicationState.md)
* [First Code Walk-Through](CodeWalkthrough.md)
* [The API](API.md)
* [Mental Model Omnibus](MentalModelOmnibus.md)

* Alternative Introductions
  * [purelyfunctional.tv](https://purelyfunctional.tv/guide/re-frame-building-blocks/) - a detailed, well written introduction.
  * [Lambda Island Videos](https://lambdaisland.com/episodes) - commercial videos on many clojure topics, including re-frame and reagent.


## Dominoes 2 & 3
* [Infographic Overview](EventHandlingInfographic.md)
* [Effectful Handlers](EffectfulHandlers.md)
  * [Events Happen](EffectfulHandlers.md#events-happen)
  * [Handling The Happening](EffectfulHandlers.md#handling-the-happening)
  * [Your Handling](EffectfulHandlers.md#your-handling)
  * [90% Solution](EffectfulHandlers.md#90%25-solution)
  * [Bad, Why?](EffectfulHandlers.md#bad-why)
  * [The 2nd Kind Of Problem](EffectfulHandlers.md#the-2nd-kind-of-problem)
  * [Effects And Coeffects](EffectfulHandlers.md#effects-and-coeffects)
  * [Why Does This Happen?](EffectfulHandlers.md#why-does-this-happen)
  * [Doing vs Causing](EffectfulHandlers.md#doing-vs-causing)
  * [Et tu, React?](EffectfulHandlers.md#et-tu-react)
  * [Pattern Structure](EffectfulHandlers.md#pattern-structure)
  * [Effects: The Two Step Plan](EffectfulHandlers.md#effects-the-two-step-plan)
  * [Step 1 Of Plan](EffectfulHandlers.md#step-1-of-plan)
  * [Another Example](EffectfulHandlers.md#another-example)
  * [The Coeffects](EffectfulHandlers.md#the-coeffects)
  * [Variations On A Theme](EffectfulHandlers.md#variations-on-a-theme)
  * [Summary](EffectfulHandlers.md#summary)

* [Interceptors](Interceptors.md)
  * [Why Interceptors?](Interceptors.md#why-interceptors)
  * [What Do Interceptors Do?](Interceptors.md#what-do-interceptors-do)
  * [Wait, I know That Pattern!](Interceptors.md#wait-i-know-that-pattern)
  * [What's In The Pipeline?](Interceptors.md#whats-in-the-pipeline)
  * [Show Me](Interceptors.md#show-me)
  * [Handlers Are Interceptors Too](Interceptors.md#handlers-are-interceptors-too)
  * [Executing A Chain](Interceptors.md#executing-a-chain)
    * [The Links Of The Chain](Interceptors.md#the-links-of-the-chain)
    * [What Is Context?](Interceptors.md#what-is-context)
    * [Self Modifying](Interceptors.md#self-modifying)
    * [Credit](Interceptors.md#credit)
    * [Write An Interceptor](Interceptors.md#write-an-interceptor)
    * [Wrapping Handlers](Interceptors.md#wrapping-handlers)
  * [Summary](Interceptors.md#summary)
  * [Appendix](Interceptors.md#appendix)
    * [The Built-in Interceptors](Interceptors.md#the-built-in-interceptors)

* [Effects](Effects.md)
  * [Where Effects Come From](Effects.md#where-effects-come-from)
  * [The Effects Map](Effects.md#the-effects-map)
  * [Infinite Effects](Effects.md#infinite-effects)
  * [Extensible Side Effects](Effects.md#extensible-side-effects)
  * [Writing An Effect Handler](Effects.md#writing-an-effect-handler)
  * [:db Not Always Needed](Effects.md#db-not-always-needed)
  * [What Makes This Work?](Effects.md#what-makes-this-work)
  * [Order Of Effects?](Effects.md#order-of-effects)
  * [Effects With No Data](Effects.md#effects-with-no-data)
  * [Testing And Noops](Effects.md#testing-and-noops)
  * [Summary](Effects.md#summary)
  * [External Effects](Effects.md#external-effects)

* [Coeffects](Coeffects.md)
  * [What Are They?](Coeffects.md#what-are-they)
  * [An Example](Coeffects.md#an-example)
  * [How We Want It](Coeffects.md#how-we-want-it)
  * [Abracadabra](Coeffects.md#abracadabra)
  * [Which Interceptors?](Coeffects.md#which-interceptors)
  * [`inject-cofx`](Coeffects.md#inject-cofx)
  * [More `inject-cofx`](Coeffects.md#more-inject-cofx)
  * [Meet `reg-cofx`](Coeffects.md#meet-reg-cofx)
  * [Example Of `reg-cofx`](Coeffects.md#example-of-reg-cofx)
  * [Another Example Of `reg-cofx`](Coeffects.md#another-example-of-reg-cofx)
  * [Secret Interceptors](Coeffects.md#secret-interceptors)
  * [Testing](Coeffects.md#testing)
  * [The 5 Point Summary](Coeffects.md#the-5-point-summary)

## Domino 4
* Subscriptions
  * [Infographic](SubscriptionInfographic.md)
  * [Correcting a wrong](SubscriptionsCleanup.md)
  * [Flow Mechanics](SubscriptionFlow.md)


## Domino 5
* Reagent Tutorials
  * [The Basics](https://github.com/Day8/re-frame/wiki#reagent-tutorials) (look at the bottom of that page)
  * [Lambda Island Videos](https://lambdaisland.com/episodes). There's a 3 part series.
  * [purelyfunctional.tv ](https://purelyfunctional.tv/guide/reagent/) - a written overview
  * [Reagent Deep Dive Series from Timothy Pratley](http://timothypratley.blogspot.com.au/p/p.html)  four part series
  * [Props, Children & Component Lifecycle](https://www.martinklepsch.org/posts/props-children-and-component-lifecycle-in-reagent.html) by Martin Klepsch


## App Structure
  * [Basic App Structure](Basic-App-Structure.md)
  * [Navigation](Navigation.md)
  * [Namespaced Keywords](Namespaced-Keywords.md)

## App Data
  * [Loading Initial Data](Loading-Initial-Data.md)
  * [Talking To Servers](Talking-To-Servers.md)
  * [Subscribing to External Data](Subscribing-To-External-Data.md)

## Debugging And Testing
  * [Debugging Event Handlers](Debugging-Event-Handlers.md)
  * [Debugging](Debugging.md)
  * [Testing](Testing.md)

## Miscellaneous
  * [FAQs](FAQs/README.md)
  * [External Resources](External-Resources.md)
  * [Eek! Performance Problems](Performance-Problems.md)
  * [Solve the CPU hog problem](Solve-the-CPU-hog-problem.md)
  * [Using Stateful JS Components](Using-Stateful-JS-Components.md)
  * [The re-frame Logo](The-re-frame-logo.md)
  * [Code Of Conduct](Code-Of-Conduct.md)
