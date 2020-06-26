# On DSLs and Machines 

`Events` are cardinal to re-frame. As you create a re-frame app, you design just the right set of them. 
These events will model "intent" - generally the user's. 
They are the "language of the system", and they will provide the eloquence.

And they are data.

Imagine we created a drawing application - something simple that 
allowed a user to draw circles and triangles and add some text. 

And then imagine that we allowed someone to begin using our new application and that, as they did, we captured, 
into a collection, the events caused by that user's actions 
(button clicks, drags, keypresses, etc).
 
The collection of events might look like this:  
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

I'd like you to now look back at that collection of events and view it in the 
same way - data instructions which can be executed - by the right machine.

Wait. What machine?

A virtual machine. All the Event Handlers you register 
collectively implement 
the "virtual machine" on which these instructions execute. When you register 
a new event handler using `reg-event-db`, 
it is as if you are adding to the "instruction set" of this "machine".

When introducing re-frame, I said it had Data-Oriented Design. 
Typically, that claim means you "program in a data". You assemble data
in a particular format (a domain-specific language), 
and that data is then "executed" by an interpreter.

Consider hiccup. It is a domain-specific language (DSL) 
for describing DOM.  You make a data structure in the right format
and Reagent acts as the "interpreter" which executes that "language".

We can use pure data literals:
```clj
[:div {:font-size 12} "Hello"]  ;; a data structure containing instructions
```

Or we can add a small bit of computation: 
```clj
[:div (when friendly? "Hello" "Go away") " world"]
```
Or, a lot more computation:
```clj
(into [:div] (map display-item items)]
```
However the hiccup-formatted data is assembled, it acts as "instructions" for Reagent.

Back to re-frame. 

It asks that **you** create a DSL for your app - events are your DSL.
(I wasn't kidding when I said events are the "language of your system".) 
And it asks that **you** provide 
a way to execute the instructions in that DSL. 

> When your re-frame application runs, 
it is executing a "program" - a collection of events - dynamically created by the user's actions - on a 
virtual machine made from the handlers you register. 

Events are the (assembly) language of your application.
Hiccup is the DOM of your application, etc.  And it is all data.
Look carefully into re-frame and you'll see the primacy of data everywhere.
Data is the ultimate in late binding.

On the subject of DSLs, I'd recommend James Reeves' talk (video): [Transparency through data](https://www.youtube.com/watch?v=zznwKCifC1A) 

