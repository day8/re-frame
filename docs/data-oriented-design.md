# On DSLs and Machines 

**Data-Oriented programming happens when "data is code".**  The data can be evaluated/executed. 

This data must be in a specific format - it must conform to a DSL (domain-specific language) - and there must be an interpreter for this DSL. When you feed correctly formated data into the interpreter, it is executed. "Data is code" for this interpreter.

Okay, we'll cycle back to this in a minute. But first ...

`Events` are cardinal to re-frame. As you create a re-frame app, you design just the right set of them. 
These events will model "intent" - mostly the user's. 
They are the "language of the system", and they will provide the eloquence.

And they are data.

Imagine we created a drawing application - one of those simple ones where the user 
can draw circles and triangles and add some text. 

And then imagine that we allowed a user to begin using our new drawing application 
and that, as they did, we captured, into a collection, the events caused by that 
user's actions (via their button clicks, drags, keypresses, etc).
 
The collection of events they generate might look like this:  
```clj
(def collected-events
  [
     [:clear]
     [:enter-draw-mode]
     [:new-shape :triangle 1 2 3]
     [:select-object 23]
     [:rename "a better name"]
     [:delete-selection]
     ....
  ])
```

Now, as an aside, consider the following assembly instructions:
```asm
mov eax, ebx
sub eax, 216
mov BYTE PTR [ebx], 2
```

Assembly instructions are just data, right?  Data which 
happens to be "executable" by the right machine - an x86 machine in this case.

I'd like you to now look back at that collection of events. I'd like you to view it in the 
same way - data instructions which can be executed - by the right machine.

Really? What machine?

A virtual machine. The many Event Handlers you register in your re-frame app 
collectively implement 
the "virtual machine" on which these instructions execute. When you register 
a new event handler using `reg-event-db`, 
it is as if you are adding to the "instruction set" of this "machine".

When first introducing re-frame, I said it had Data-Oriented Design. 
And we now know that means "data is code". You assemble data
in a particular format (a domain-specific language), 
and that data is then seen as code by an interpreter which executes it.

Consider hiccup. It is a data format (DSL) for describing how to create and 
arrange DOM. Make a data structure in the right format
and Reagent will act as the "interpreter" which executes that "language" 
creating the DOM you describe. Hiccup is code. (Data is code)

We can use pure data literals:
```clj
[:div {:font-size 12} "Hello"] 
```

Or we can add a small bit of computation: 
```clj
[:div (when friendly? "Hello" "Go away") " world"]
```

Or, a lot more computation:
```clj
(into [:div] (map render-item items)]
```
Irrespective of how we create the hiccup-formatted data, it acts as "instructions" for Reagent's hiccup interpreter.

Back to re-frame. 

It asks that **you** create a DSL for your app - the set of events are your DSL.
(I wasn't kidding when I said events are the "language of your system".) 
And it also asks that **you** provide 
a way to execute the instructions in that DSL (you must provide the event handlers).

> When your re-frame application runs, 
it is executing a "program" - a collection of events - which is data - dynamically created by the user's actions (button clicks etc) - on a 
virtual machine made from the event handlers you register. 

Events are the (assembly) language of your application.
Hiccup is the DOM of your application, etc.  And it is all data.
Look carefully into re-frame, and you'll see the primacy of data everywhere.


!!! Note "String Is Code"

    There is also string-oriented programming which is what you often employ with regexes or SQL. 
    
    We have all used a string containing just the right format with a regex engine. And we've all given a string containing SQL to a database engine, which it knows how to interpret it.
    
    When the strings concerned are literals, this can be straightforward. But it quickly gets ugly if we have to start computing the strings - if we have to use string interpolation to build up the string to be executed. And, of course, this happens a lot with SQL, and it is awful. Consequently, there are a thousand workarounds.

    Data is a better medium for computing code, than strings. Datalog (data) is better than SQL (strings).


!!! Note "Multiple Execution Contexts"

    You'll notice that both data-oriented programming or string-oriented programming involves
    multiple execution contexts, at runtime. 

    For example, with hiccup at runtime two things are happening: 

      - one execution context (ClojureScript) creates the data `(into [:div] (map renderer items))`
      - one execution context interpets the data (as code) - Reagent.

    Same for string-oriented programming. One context creates the regex string (perhaps it is just a literal in that context). And the other context executes it. 

    So, just to be crystal clear: one context generates "the code" (the data or the string,) and the other context executes it. 


!!! Note "Other Meanings"
    
    The term Data-Oriented Design means something quite different in the gaming world. There, it
    is an optimisation technique which tries to layout data structures in a way that exploits CPU cache characteristics and access patterns, in order to achieve better performance.


On the subject of DSLs, I'd strongly, strongly recommend James Reeves' excellent talk (video): [Transparency through data](https://www.youtube.com/watch?v=zznwKCifC1A) 
