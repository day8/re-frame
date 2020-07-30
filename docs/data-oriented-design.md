# On DSLs and Machines 

**Data Oriented programming is when "code is data".** It means data is evaluated/executed. 

This data must be in a specific format - it must conform to a DSL - and there must be an interpreter for this DSL. When you feed correctly formated data into the interpreter, it is executed. "Data is code" for this interpreter.

Okay, we'll cycle back this in a minute. But first ...

`Events` are cardinal to re-frame. As you create a re-frame app, you design just the right set of them. 
These events will model "intent" - mostly the user's. 
They are the "language of the system", and they will provide the eloquence.

And they are data.

Imagine we created a drawing application - one of those simple ones where the user 
can draw circles and triangles and add some text. 

And then imagine that we allowed a user to begin using our new drawing application 
and that, as they did, we captured, into a collection, the events caused by that 
user's actions (their button clicks, drags, keypresses, etc).
 
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

A virtual machine. All the Event Handlers you register in your re-frame app 
collectively implement 
the "virtual machine" on which these instructions execute. When you register 
a new event handler using `reg-event-db`, 
it is as if you are adding to the "instruction set" of this "machine".

When first introducing re-frame, I said it had Data-Oriented Design. 
And we now know that means "code is data". You assemble data
in a particular format (a domain-specific language), 
and that data is then "executed" by an interpreter.

Consider hiccup. It is a data format which descibes how to create and 
arranging DOM. Make a data structure in the right format
and Reagent will act as the "interpreter" which executes that "language" 
creating the DOM you describe. Code is data. 

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
No matter which way the hiccup-formatted data is created, it acts as "instructions" for Reagent's instructions.

Back to re-frame. 

It asks that **you** create a DSL for your app - events are your DSL.
(I wasn't kidding when I said events are the "language of your system".) 
And it also asks that **you** provide 
a way to execute the instructions in that DSL (you must provide the event handlers).

> When your re-frame application runs, 
it is executes a "program" - a collection of events - which is data - dynamically created by the user's actions (button clicks etc) - on a 
virtual machine made from the event handlers you register. 

Events are the (assembly) language of your application.
Hiccup is the DOM of your application, etc.  And it is all data.
Look carefully into re-frame, and you'll see the primacy of data everywhere.
Data is the ultimate in late binding.

!!! Note "String-Oriented Programming"

    There is also string-oriented programming which is what you often employ with regex or SQL. 
    
    I'm sure we have all used a string in the right format with a regex engine. And if you give a database the right SQL string, it knows how to interpret it. 
    
    When the strings concerned are literals, this is straighforward. But it quickly gets ugly if we have to start computing the strings - if we have to use string interpolation to build up the string to be executed. And, of course, this happens a lot in the case of SQL. 

    Data is a better medium for computing code, than strings. Datalog (data) is better than SQL (strings).


!!! Note "Multiple Execution Contexts"

    You'll notice that both data-oriented programming or string-oriented programming involves
    multiple execution contexts, at runtime. 

    For example, with hiccup at runtime two things are happening: 

      - one execution context (ClojureScript) which creates the data `(into [:div] (map renderer items))`
      - one execution context which interpets the data - Reagent.

    Same for string-oriented programming. One context creates the regex string (perhaps it is just a literal in that context). And the other context executes it. 

!!! Note "Other Meanings"
    
    The term Data Oriented Design means something quite different in the gaming world. There, it
    is an optimisation technique which seeks to layout data structures in a way which aligns with CPU caches,
    so as to achieve performance efficiencies.


On the subject of DSLs, I'd strongly, strongly recommend James Reeves' excellent talk (video): [Transparency through data](https://www.youtube.com/watch?v=zznwKCifC1A) 