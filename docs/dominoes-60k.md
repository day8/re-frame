

Each iteration of the re-frame loop involves a
six domino cascade.


One domino triggers the next, which triggers the next, et cetera, boom, boom, boom, until we are 
back at the beginning of the loop, and the dominoes reset to attention 
again, ready for the next iteration of the same cascade.

<img align="right" src="../images/Readme/Dominoes-small.jpg">

The six dominoes are:

1. Event dispatch
2. Event handling 
3. Effect handling 
4. Query
5. View
6. DOM

Let's now look at each of them from a great height - maybe **from 60,000 feet**.

## 1st Domino - Event Dispatch

An **_event_** is sent when something happens - the user 
clicks a button, or a websocket receives a new message.

Without the impulse of a triggering `event`, no six domino cascade occurs.
It is only because of `events` that a re-frame app is propelled,
loop iteration after loop iteration, from one state to the next.

**re-frame is event driven.**

## 2nd Domino - Event Handling

In response to an `event`, an application must decide what action to take. 
This is known as **event handling**.

Event handler functions compute how an event should change "the world",
which is to say that they compute the `side effects` of the event.
Or, more accurately, they compute **a declarative description** of the required
`side effects` - represented as data.  

So `event handlers` are just functions which compute data, and that data describes what needs to happen.

Much of the time, an event will only cause `side effects` to 
"application state", but sometimes the outside world must also be affected:
localstore, cookies, databases, emails, logs, etc.

## 3rd Domino - Effect Handling

In this step, the `side effects`, calculated by the previous step, are actioned. 

Data gets turned into action and the world is mutated.


<img align="left" width="305" src="../images/Alien3_0.jpg">


Now, to a functional programmer, `effects` are scary in a 
xenomorph kind of way. Nothing messes with functional purity
quite like the need for side effects. 

On the other hand, `effects` are 
marvelous because they move the app forward. Without them, 
an app stays stuck in one state forever, never achieving anything.

So re-frame embraces the protagonist nature of `effects` - the entire, unruly zoo of them - but
it does so in a controlled and largely hidden way, and in a manner which is debuggable, auditable, mockable and pluggable.


## We're Now At A Pivot Point

Domino 3 just changed the world and, very often, one particular part of it: the **application state**.

re-frame's `application state` is held in one place - think of it like you 
would an in-memory, central database for the app (details soon).

Any changes to `application state` trigger the next part of the cascade 
involving dominoes 4-5-6.

## There's a Formula For It 

The 4-5-6 domino cascade implements the formula made famous by Facebook's ground-breaking React library: `v = f(s)`

A view, `v`, is a function, `f`, of the app state, `s`.

Said another way, there are functions `f` that compute which DOM nodes, `v`,
should be displayed to the user when the application is in a given app state, `s`.

Or, to capture the dynamics we'd say: **over time**, as `s` changes, `f`
will be re-run each time to compute new `v`, forever keeping `v` up to date with the current `s`.

Or, with yet another emphasis: **over time** what is presented to the user changes in response to application state changes. 

In our case, domino 3 changes `s`, the application state,
and, in response, dominoes 4-5-6 are concerned with re-running `f` to compute the new `v` 
shown to the user.

Except, there's no single `f` to run. There are many `f` which 
collectively build the overall `v`. And only a certain part of `s` 
may have changed, meaning only a subset of 
the `f` need rerun, to re-compute a subset of `v`. 


## Domino 4 - Query

<img align="right" src="../images/Readme/6dominoes.png?raw=true">

Domino 4 is about extracting data from "app state", and providing it 
in the right format for the `ViewFunctions` of domino 5.

Domino 4 is a novel and efficient de-duplicated `Signal Graph` which 
runs query functions on the app state, efficiently computing 
reactive, multi-layered, "materialised views" of it. 

Please relax about any unfamiliar terminology, you'll soon 
see how simple the code is in practice.


## Domino 5 - View

Domino 5 is many **ViewFunctions** (aka Reagent components) which collectively
render the UI of the application. 

Each `ViewFunction` renders part of the whole. These functions compute and return 
data in a format called **hiccup** which represents DOM. 

To render the right DOM, `ViewFunctions` must obtain state using the signal graph of domino 4.
They use a `subscribe` facility which reactively delivers this state. They automatically re-run 
in response to changes in the Signal Graph, keeping the UI up to date. 

So, after the application state changes in domino 3, data flowes through the Signal Graph of domino 4, causing 
the `ViewFucntions` to re-render the UI presented to the user.


## Domino 6 - DOM

You don't write Domino 6 - it is handled for you 
by Reagent/React. I mention it here 
for completeness and to fully close the loop.

This is the step in which the hiccup-formatted 
"descriptions of required DOM", returned by the `ViewFunctions` of Domino 5, are actioned. 
The browser DOM nodes are mutated. 
