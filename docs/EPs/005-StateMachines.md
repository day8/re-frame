## EP 003 - Finite State Machines

> Status: Placeholder. Don't bother reading yet. 

### Abstract 

Colloquial: I'd like re-frame to have a better story for programming in FSMs. I want to 
represent "Higher Order Behaviour" which currently gets "smeared" across 
multiple event handlers.

### Introduction

Many **high level** aspects of SPAs are best modelled explicitly as an FSM. 
First, an app must gather X from the user, but if they press cancel, then return to
showing Y, but otherwise move on to do activity Z. It is quite natural to model such overall
decisions and the UIs involved as an FSM. 

Many **low level** aspects of SPAs are best modelled explicitly as FSM too.
The simple act of GETing from a server involves various
states, including waiting, and failed, and timed-out, and retrying and succeeded.

BUT you need the power of a fully expressive state machine.
You need orthogonal state, guards, hierarchical state, history, etc. 
Back in 1987, Harel identified the set of features required - anything less
and your tool will not be expressive enough to do the job.  
Harel also insisted that statecharts was a visual 
formalism, so tooling is also important.

### Why?

> Beware of the Turing tar-pit in which everything is possible but nothing of interest is easy. <br>
>  -- Alan Perlis 

State machines are appealing because:
  - they constrain you  (vs the full Turing tar-pit). Just because you *can* wield 
    immense power doesn't mean you should.
  - they force you to think through and structure a problem. This process helps to flush out the corner cases.
  - they make explicit certain important assumptions which are otherwise hidden in a thicket of conditionals.  


Also, Why Developers Never Use State Machines
https://www.skorks.com/2011/09/why-developers-never-use-state-machines/

> "The strength of JavaScript is that you can do anything. The weakness is that you will." <br>
>    - Reg Braithwaite

### How?

Technical elements:
  - a way to register:
    - a state machine specification against a `machine-id` 
    - the specification will be a data structure, listing states, transitions, etc
  - a way to create an instance of a registered state machine 
     - args: machine-id, id for this particular instance
     - data for machine instance will be stored in `app-db` (at `:machines` or a configurable place?) 
  - a way to trigger
      - the `id` of the state machine targeted
      - the trigger 
      - the trigger args
  - trigger causes:
      - state transition 
      - an action fn to be called which produces `:effects` 
  - UI changes. See EP on `reg-view` which will make it much easier to describe UI in machine data structure  
  - a way to destroy an instance

### Misc Notes

Events model user intent, not implementation details. 

So, we DO NOT want events that talk about FSM or triggers etc because that's an implementation detail. 

 Instead, we want 
 

But event handlers should know about XXX


### Triggers


Types of triggers:  
  1. External (from the user, websocket)
  2. Data - something about `app-db` has changed

### Implementation 

What if we didn't even use FSM and used Behaviour Trees instead?  
Behaviour trees are more composable. A better match for a data-oriented design.  

 
Links And Notes:

  - [statecharts](https://statecharts.github.io/)
  - [THE PRECISE SEMANTICS OF UML STATE MACHINES](https://www.omg.org/spec/PSSM/1.0/Beta1/PDF)
  - [David Khourshid - Infinitely Better UIs with Finite Automata](https://www.youtube.com/watch?v=VU1NKX6Qkxc) also [written](https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/)
  - [Statecharts: Updating UI state](https://medium.com/@lmatteis/statecharts-updating-ui-state-767052b6b129)
  - [https://statecharts.github.io/](https://statecharts.github.io/)
  - [Harel Paper](http://www.inf.ed.ac.uk/teaching/courses/seoc/2005_2006/resources/statecharts.pdf)
  - [setState Machine Speaker Deck by Michele Bertoli](https://speakerdeck.com/michelebertoli/setstate-machine)
  
  
  
Previously CLJS :
  - https://github.com/jebberjeb/reframe-fsm
  - https://github.com/protocol55/re-state
  - http://blog.cognitect.com/blog/2017/8/14/restate-your-ui-creating-a-user-interface-with-re-frame-and-state-machines
  

Other Attempts:
   - [Fractal UI components using snabbdom, Harel statecharts, and event emitters](https://github.com/jayrbolton/snabbdom-statechart-components)  

   - [BT 101 – Behavior Trees grammar basics](http://www.craft.ai/blog/bt-101-behavior-trees-grammar-basics/)
   - [Understanding Behavior Trees](http://aigamedev.com/open/article/bt-overview/)
   - [behavior3js github repo](https://github.com/behavior3/behavior3js)
   - [Understanding the Second Generation of Behavior Trees (video)](https://www.youtube.com/watch?v=n4aREFb3SsU)
   - [10 Reasons the Age of Finite State Machines is Over](http://aigamedev.com/open/article/fsm-age-is-over/)
   - [Parameterizing Behavior Trees](https://people.cs.umass.edu/~fmgarcia/Papers/Parameterizing%20Behavior%20Trees.pdf)
   - [Behavior Trees in Robotics and AI](https://arxiv.org/pdf/1709.00084.pdf)

TLA+
   - [** Three Approximations - includes SAM](https://dzone.com/articles/the-three-approximations-you-should-never-use-when)
   - [State Machines and Computing](https://www.ebpml.org/blog2/index.php/2015/01/16/state-machines-and-computing)
   - [SAM – the State-Action-Model pattern](https://www.ebpml.org/blog15/2015/06/sam-the-state-action-model-pattern/)
   - [TLA Intro](https://lamport.azurewebsites.net/tla/tla-intro.html)
   - [Computation and State Machines - Leslie Lamport](https://www.microsoft.com/en-us/research/publication/computation-state-machines/)
   - [SAM Pattern in JS](http://sam.js.org/)
   - 
   
   
