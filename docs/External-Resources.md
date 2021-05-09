## Alternative Explanations

  - An overview of re-frame [by purelyfunctional.tv](https://purelyfunctional.tv/guide/re-frame-building-blocks/)
  - On naming things and app-db structure [by purelyfunctional.tv](https://purelyfunctional.tv/guide/database-structure-in-re-frame/)

## Reagent


To get a good grounding in Reagent, please be sure to review the docs:

  - [Reagent site](http://reagent-project.github.io/)
  - [Reagent README](https://github.com/reagent-project/reagent/blob/master/doc/README.md)

For inspiration, perhaps look at one of our other projects: [re-com](https://github.com/Day8/re-com).

## Video Training

Commercial grade video training for re-frame and Reagent:

  - [Jacek Schae](https://www.jacekschae.com/)
  - [purelyfunctional.tv](https://purelyfunctional.tv/courses/understanding-re-frame/)
  - [Lambda Island Videos](https://lambdaisland.com/collections/react-reagent-re-frame)

## IDE Support 

*  Cursive - has direct support for some re-frame features, including keyword sourcing.
*  [Emacs support](https://github.com/oliyh/re-jump.el)

## Templates

* [re-frame-template](https://github.com/day8/re-frame-template) - To generate a client side SPA. Good for getting started.
* [Luminus](http://www.luminusweb.net) - Generates an integrated client and server
* [re-natal](https://github.com/drapanjanas/re-natal) - React Native apps

#### Debugging

* [re-frame-10x](https://github.com/day8/re-frame-10x) - A debugging dashboard for re-frame
* [re-frisk](https://github.com/flexsurfer/re-frisk) - A library for visualizing re-frame data and events.

## Examples and Applications Using re-frame

* The [Workshub](https://www.works-hub.com/) client is open source and the repo is available [here](https://github.com/WorksHub/client)
* [RealWorld](https://github.com/jacekschae/conduit) - a well commented codebase with CRUD, auth, advanced patterns, etc) that implements to the [RealWorld Spec and API](https://github.com/gothinkster/realworld).
* [RealWorld](https://github.com/flexsurfer/conduitrn) - react native version 
* [BlueGenes](https://github.com/intermine/bluegenes) - searching and analysing genomic data, by the University of Cambridge
* [Memento](https://gitlab.com/Numergent/memento) a private note-taking app. Uses compojure-api, PostgreSQL and token auth.
* [How to create decentralised apps with re-frame and Ethereum](https://medium.com/@matus.lestan/how-to-create-decentralised-apps-with-clojurescript-re-frame-and-ethereum-81de24d72ff5#.b9xh9xnis) - Tutorial with links to code and live example.
* [Braid](https://github.com/braidchat/braid) - A new approach to group chat, designed around conversations and tags instead of rooms.
* [Elfeed-cljsrn](https://github.com/areina/elfeed-cljsrn) - A mobile client for [Elfeed](https://github.com/skeeto/elfeed) rss reader, built with React Native.
* [Memory Hole](https://github.com/yogthos/memory-hole) - A small issue tracking app written with Luminus and re-frame.
* [imperimetric](https://github.com/Dexterminator/imperimetric) - Webapp for converting texts with some system of measurement to another, such as imperial to metric.
* [boodle](https://github.com/manuel-uberti/boodle) - A simple SPA for
  accounting. It uses, among others, re-frame, http-kit, compojure-api and it
  runs on PostgreSQL.
* [status-react](https://github.com/status-im/status-react) - A mobile OS for Ethereum. Server, SPA + React Native App
* [Catlantis](https://github.com/madvas/catlantis) - React Native App about cats
* [Lymchat](https://github.com/tiensonqin/lymchat) - React Native App to learn different cultures
* [ventas](https://github.com/JoelSanchez/ventas) - Ecommerce platform made with a full-clojure stack

### Effect and CoEffect Handlers

* [async-flow-fx](https://github.com/day8/re-frame-async-flow-fx) - manage a boot process dominated by async
* [http-fx](https://github.com/day8/re-frame-http-fx) - performing HTTP request tasks (via cljs-ajax)
* [fetch-fx](https://github.com/superstructor/re-frame-fetch-fx) - performing HTTP request tasks (via `js/fetch`)
* [re-frame-forward-events-fx](https://github.com/day8/re-frame-forward-events-fx) - slightly exotic
* [cookie-fx](https://github.com/SMX-LTD/re-frame-cookie-fx) - set and get cookies
* [document-fx](https://github.com/SMX-LTD/re-frame-document-fx) - set and get on `js/document` attributes
* [clipboard-fx](https://github.com/superstructor/re-frame-clipboard-fx) - write to the system clipboard
* [re-frame-youtube-fx](https://github.com/micmarsh/re-frame-youtube-fx) - YouTube iframe API wrapper
* [re-frame-web3-fx](https://github.com/madvas/re-frame-web3-fx) - Ethereum Web3 API
* [re-frame-google-analytics-fx](https://github.com/madvas/re-frame-google-analytics-fx) - Google Analytics API
* [re-frame-storage](https://github.com/akiroz/re-frame-storage) - Local Storage based persistence
* [re-frame-storage-fx](https://github.com/deg/re-frame-storage-fx) - Another take on Local Storage persistence
* [re-frame-firebase](https://github.com/deg/re-frame-firebase) - Firebase DB API
* [sse-fx](https://github.com/yetanalytics/sse-fx) - fx/cofx handlers for [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) and SSE

### Forms 

* [Fork](https://github.com/luciodale/fork) Form Library. Inspired by formik.
* [re-form](https://github.com/HealthSamurai/re-form)
* [free-form](https://github.com/pupeno/free-form)
* [re-frame-forms](https://github.com/tomasd/re-frame-forms)

### Routing

* [Bidirectional using Silk and Pushy](https://pupeno.com/2015/08/18/no-hashes-bidirectional-routing-in-re-frame-with-silk-and-pushy/)

### Tools, Techniques & Libraries

* [re-fill](https://github.com/metosin/re-fill) - routing and more  
* [re-frame-undo](https://github.com/day8/re-frame-undo) - An undo library for re-frame
* [re-frame-test](https://github.com/day8/re-frame-test) - Advanced testing utilities
* [Animation](http://www.upgradingdave.com/blog/posts/2016-12-17-permutation.html) using `react-flip-move`
* [re-thread](https://github.com/yetanalytics/re-thread) - A library for running re-frame applications in Web Workers.
* [re-frame-datatable](https://github.com/kishanov/re-frame-datatable) - DataTable UI component built for use with re-frame.
* [Stately: State Machines](https://github.com/nodename/stately) also https://www.youtube.com/watch?v=klqorRUPluw
* [re-learn](https://github.com/oliyh/re-learn) - Data driven tutorials for educating users of your reagent / re-frame app
* [subgraph](https://github.com/vimsical/subgraph) - Reactive graph database for re-frame
* [re-graph](https://github.com/oliyh/re-graph) - GraphQL client for re-frame
* [martian](https://github.com/oliyh/martian) - Swagger-compatible API client that abstracts away from HTTP with [re-frame bindings](https://github.com/oliyh/martian/tree/master/re-frame)
* [re-pressed](https://github.com/gadfly361/re-pressed) - A keyboard event library for re-frame
* [re-pollsive](https://github.com/gadfly361/re-pollsive) - A polling event library for re-frame
* [breaking-point](https://github.com/gadfly361/breaking-point) - Quickly define screen breakpoints for re-frame
* [re-frame-flow](https://github.com/ertugrulcetin/re-frame-flow) - A graph based visualization tool for re-frame event chains


#### React Native

* [re-natal](https://github.com/drapanjanas/re-natal): Bootstrap ClojureScript React Native apps
* [cljsrn-re-frame-workers](https://github.com/seantempesta/cljsrn-re-frame-workers): A library supporting react-native-workers with re-frame for ClojureScript and React Native.
* [re-navigate](https://github.com/vikeri/re-navigate): Example of React Native Navigation with re-frame/re-natal

### Other

* [re-posh](https://github.com/denistakeda/re-posh) is re-frame + Datalog

### Videos

* [A three part video series](https://www.youtube.com/playlist?list=PLUGfdBfjve9WFJMvE8JrpGYK6OTWWo1QS)
* [A Video Tour of the Source Code of Ninja Tools](https://carouselapps.com/2015/12/02/tour-of-the-source-code-of-ninja-tools/)
* [Funding Circle Clojure Meetup: Modular Users Interfaces with Re-frame](https://youtu.be/b_uum_iYShE)
* [Build your next single page app in ClojureScript and re-frame](https://youtu.be/Pq5oof3SJXA)
* [Clojurescript re-frame Tutorial Part 1 - Events and Event Handlers](https://youtu.be/Xo6W300s1Xs)
* [From 0 to prototype using ClojureScript, re-frame and friends: Martin Clausen](https://youtu.be/DdkwNTgtIJ0)
* [Re-usable GUI Components with Re-frame and Atomic Design - Mark Nutter](https://youtu.be/JCY_cHzklRs)
* [clojureD 2018: "Reframing your next Single Page App" by Kenneth Kalmer](https://youtu.be/x6z2-P1MpUw)

### Server Side Rendering

* [isomorphic-rendering](http://techascent.com/blog/isomorphic-rendering.html)
* [Prerenderer](https://github.com/pupeno/prerenderer) - Server pre-rendering library using NodeJS that works with re-frame `0.6.0` (later versions untested)
   Rationale [Part 1](https://carouselapps.com/2015/09/14/isomorphic-clojurescriptjavascript-for-pre-rendering-single-page-applications-part-2/)
   [Part 2](https://carouselapps.com/2015/09/14/isomorphic-clojurescriptjavascript-for-pre-rendering-single-page-applications-part-2/)
   [Part 3](https://pupeno.com/2015/10/02/isomorphic-javascript-with-clojurescript-for-pre-rendering-single-page-applications-part-3/)
   [Release Announcement](https://pupeno.com/2015/12/13/prerenderer-0-2-0-released/)

* [Server Side Rendering with re-frame](http://davidtanzer.net/server_side_rendering_with_re_frame) - Blog post on rendering re-frame views with Clojure.

* [Rendering Reagent on the Server Using Hiccup](http://yogthos.net/posts/2015-11-24-Serverside-Reagent.html)- Blog post on rendering Reagent with Clojure.

* [Prerendering a re-frame app with Chrome Headless](https://medium.com/@joelsanchezclj/prerendering-a-re-frame-app-with-chrome-headless-bb875de31fd0) - Blog post on prerendering a re-frame app using [etaoin](https://github.com/igrishaev/etaoin) and Chrome Headless.
