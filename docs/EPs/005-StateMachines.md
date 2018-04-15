## EP 003 - State Machines

> Status: Placeholder. Don't bother reading yet. 

### Abstract 

Colloquial: I wanna better story for programming in state machines. I wanna 
use them to capture "Higher Order Logic" which currently gets "smeared" across 
multiple event handlers. 

### Introduction

Many **high level** aspects of SPAs are best modelled explicitly as an FSM. 
First, an app must gather X from the user, but then the user might press cancel, and then we need
to be showing Y, but otherwise on to do Z. This is all very naturally modelled as a FSM. 

Many **low level** aspects of SPAs are best modelled explicitly as state machines too.
The simple act of GETing from a server involves various
states, including waiting, and failed, and timedout, and retrying and succeeded. 

BUT you need an expressive, a fully featured state machine. 
You need orthogonal state, guards, hierarchical states, history, etc. Most attempts
Missing features in your state machine is like trying to program without an
`if` in your language.  

Harel identified the feature set required in 1987, so let's not even
try with an impoverished model. Harel also insisted it was a visual 
formalism, so tooling is important.


### Why?

> Beware of the Turing tar-pit in which everything is possible but nothing of interest is easy. <br>
>  -- Alan Perlis 

State machines are appealing because:
  - they constrain you  (vs the full Turing tar-pit). Just because you *can* wield 
    immense power doesn't mean you should.
  - they force you to think through, and structure a problem. This proceess helps to flush out the corner cases.
  - they make explicit certain important assumptions which are hidden in a thicket of conditionals.  


Also, Why Developers Never Use State Machines
https://www.skorks.com/2011/09/why-developers-never-use-state-machines/

### How?

Technical elements:
  - a way to specify and register a state machine
    - will have a machine-id
    - will be a data structure. 
    - will list states, transitions, etc
  - a way to create an instance of a registered state machine 
     - args: machine-id, id for this particular instance
     - data for machine will be stored in `app-db` (at `:machines` or a configurable place?) 
  - a way to trigger
      - the `id` of the state machine targeted
      - the trigger 
      - we should model triggers as normal re-frame events
  - the `action` associated with a "trigger" will produce `:effects`
  - UI changes. See EP on `reg-view` which will make it much easier to describe UI in machine data structure  
  - a way to destroy an instance



### Implementation 

What if we didn't even use FSM and used Behaviour Trees instead?  
Behaviour trees are more composable. A better match for a data oriented design.  

 
Notes:






