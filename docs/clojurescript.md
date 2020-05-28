---
klipse: true
---

> This document is currently in beta test.<br><br>
> This single page aims to teach a Javascript developer just enough Clojure that they can start to read re-frame and Reagent code.
>
> When you review, can you tell me:
>
>   1. How long it takes you  (my current guess is 30 mins)
>   2. What worked for you, and does not work.  What puzzled you. What jarred.  What is overexplained. What is underexplained. etc. 
>
> It isn't polished or 100% complete yet. But it is getting close. It has not inline/on-page REPL yet. There are a few XXXs around where those REPLs will be in the near future. <br>
> 
> Many Thanks!


Are you new to ClojureScript, and do you need a quick primer?

If so, this page will teach you how to *read*  Clojure in 30 minutes. Specifically, I
want you to be able to read and understand the Reagent and re-frame code. Writing is not 
important yet but there is some live coding on this page.

ClojureScript is a modern Lisp. Alan Kay once descibed Lisp as "Maxwell's equations of software".
Paul Graham believed Lisp was a competitive advantage for his startup. Dijkstra wrote glowingly of it. 
For 50 years, 
some of the finest minds in software have admired it, used it and refined it. It is a foliated masterpiece.

As the owner of a company which develops software products, I believe ClojureScript gives us a
competitive edge. As a programmer, I feel like it has provided me with excellent,
nourishing brain food. It is a stable, productive place, with little churn. In contrast, I look across 
to the Javascript landscape and I see cruel and unusual punishment.

So, 30 mins ...

## Simple Data Literals

I have good news. You are going to be shocked and delighted at the simplicity of the syntax. 


|   Type       |   Example                           |   Comment            |  
|--------------|-------------------------------------|----------------------|
| character    | `#!clj \a`                          | The letter `a`       |  
| number       | `#!clj 1`                           |                      |  
| number       | `#!clj 3.14`                        |                      |  
| string       | `#!clj "hello"`                     |                      |  
| nil          | `#!clj nil`                         | aka null, None       |      


## Collection Data Literals

Lists use  `#!clj ()`, vectors use  `#!clj []` and maps use  `#!clj {}`, like this:

| Collection   |   Example                           |   Comment            |   
|--------------|-------------------------------------|----------------------|
| list         | `#!clj (1 2 "yes")`                 | Can be heterogeneous.<br>Empty list is `#!clj ()`<br>No commas necessary.  |  
| vector       | `#!clj [1 2 3]`                     | Again, no commas necessary.<br>Empty vector is `#!clj []`| 
| vector       | `#!clj [1 "hello" \x nil]`          | Can be heterogeneous. | 
| map          | `#!clj {1 "Hello"}`                 | A dictionary, or hashmap.<br>Each pair is a `key` and a `value`.<br>One pair here.`#!clj 1` is key,<br> `#!clj "hello"` is the value| 
| map          | `#!clj {1 "Hello" 2 nil}`           | No delimiter necessary between pairs.<br>Two key/value pairs.| 
| map          | `#!clj {1  "Hello"`<br> &nbsp;`#!clj  \b  27`<br> &nbsp;`#!clj  "pi"   3.14}`  | Can be heterogeneous.<br>Still no commas between pairs.   | 


Collections can nest:

|          |   Example                               |   Comment                             |  
|----------|-----------------------------------------|---------------------------------------|
| vector   | `#!clj [1 [2 2] 3]`                     | an element can be another vector        |  
| vector   | `#!clj [1 {4 5} 3]`                     | an element can be a map                 |  
| map      | `#!clj {1 [4 5]`<br>&nbsp;&nbsp;`#!clj 2 [\a \b]}`   | a value in a map can be a vector           |  
| map      | `#!clj {1 {4 5}`<br>&nbsp;&nbsp;`#!clj 2 {\a \b}}`   | a value in a map can be a map              | 
| map      | `#!clj {{4 5} 1`<br>&nbsp;&nbsp;`#!clj [1 2] 2}`     | the keys in a map can be a map or vector   |



## Symbols 

A symbol is a name that is bound to a value. 


|  Type    |   Example               |   Comment            |  
|----------|-------------------------|----------------------|
| symbol   | `#!clj inc`             | The symbol `#!clj inc` is bound to one of Clojure's builtin functions.<br>This function will return its argument incremented |
| symbol   | `#!clj +`               | The symbol `#!clj +` is also bound to a builtin function. It adds its arguments.<br>note: `#!clj +` is not an operator in ClojureScript, it is a function |
| symbol   | `#!clj yours`           | You'll soon see how to create your own symbols and bind them to values |


## That's It For Syntax

We've now covered most of Clojure's syntax. Seriously.


## Evaluation 

Time to explore how data is evaluated. Wait. Really? Evaluating data?  

**In ClojureScript we evaulate data, to create new data**.

I have good news. You are going to be shocked and delighted at how simple evaluation is. 

First, all data litterals other than `lists` and `symbols` evaluate to themselves.

|  Value                |   Evaluates To                    |  Comment    |
|-----------------------|-----------------------------------|-------------|
| `#!clj \a`            | `#!clj \a`                        |  Same       |        
| `#!clj 1`             | `#!clj 1`                         |  Same       |
| `#!clj [1 1]`         | `#!clj [1 1]`                     |  Same       |
| `#!clj {1 1 2 2 }`    | `#!clj {1 1 2 2 }`                |  Same       |


Try it for yourself. Enter an expression into the following editor and it will be evaluated. The result will be shown in the box below.

XXX inline REPL goes here

So, let's talk about the two exceptions `lists` and `symbols`. 

## Evaluating Symbols 

Symbols don't evaluate to themselves. Instead, they evaluate to the value to which they are "bound". (More on how symbols are bound to values soon)

Example evaluations:

|  Expression     |   Evaluates To               |  Comments                                     |
|-----------------|------------------------------|-----------------------------------------------|
| `#!clj foo`     | `#!clj 4`                    | Assuming  the symbol `#!clj foo` is bound to the value  `#!clj 4`       |         
| `#!clj bar`     | `#!clj [1 2 3]`              | Assuming  the symbol `#!clj bar` is bound to the value  `#!clj [1 2 3]` |             
| `#!clj [1 foo]` | `#!clj [1 4]`                | Each element is evaluated, and  `#!clj foo` evaluated to  `#!clj 4`     |
| `#!clj [foo bar]` | `#!clj [4 [1 2 3]]`        |  `#!clj foo` evaluates to  `#!clj 4`,  `#!clj bar` evaluates to  `#!clj [1 2 3]`<br>(because that's what we are assuming these symbols are bound to)                                            |

 

## Evaluating Lists

A `list` evaluates to a function call. And, in a functional language, function calls are a big deal,
so this section is very important. 

Here's an example list  `#!clj (f arg1 arg2 arg3)`. It has four elements. A list is evaluated in two steps:

  1. first, each element in the list is evaluated (all four of them in this example)
  2. then, a function call occurs
     - the evaluation of the 1st element will be the function called 
     - the evaluation of the other elements (3 in the case above) will be the actual arguments in this function call 

The entire list evaluates to the return value of the function call. So, if this example function call returned `#!clj (inc 3)` then `#!clj (f arg1 arg2 arg3)` would evaluate to `#!clj (inc 3)`.

!!! Note "Symbols evaluating to functions"
    In normal Clojure code, the 1st element of a list is often a symbol. For example, in some of the examples to follow we'll be looking at `#!clj (inc 3)`.  `#!clj inc` is a symbol.
    
    In step 1, all elements of the list are evaluated. If the first element of the list is a symbol, we learned 
    already that it will evaluate to what it is bound to. So, if a symbol, like `#!clj inc`, is bound to a 
    function, it is ***that*** function which is called in step 2.

    So `#!clj inc` is a symbol, not a function. But it is bound to a function. A subtle but important distinction. 
    
    If, instead `#!clj inc` was bound to `#!clj 27` we couldn't use it in the first position of a list, because it is bound to a number, not a function. We'd get an error.
    
    Also, perhaps surprisingly for you, the symbol `#!clj +` is also bound to a fucntion in the standard library. Less surprisingly, this function adds its arguments together. More soon.


Example list evaluations:

|  List                   |   Evaluates To         |  Comments                                              |
|-------------------------|------------------------|--------------------------------------------------------|
| `#!clj (inc 3)`         | `#!clj 4`              | Step 1: evaluate each element of the list (there are two):<br>&nbsp;&nbsp;• the symbol  `#!clj inc` evaluates to a builtin function<br>&nbsp;&nbsp;• and `#!clj 3` evaluates to `#!clj 3`<br>Step 2: call the function with `#!clj 3` as the argument.<br>The return value `#!clj 4`         | 
| `#!clj [3 (inc 3)]`     | `#!clj [3 4]`          | Evaluate each element of the vector. Evaluating that 2nd element<br>is a function call.  |        
| `#!clj (+ 1 2)`         | `#!clj 3`              | The symbol `#!clj +` is bound to a builin function.<br>And that function adds together its arguments |      
| `#!clj (+ 1 2 3)`       | `#!clj 6`              | Surprise! Turns out this function can handle a variable<br>number of arguments.          |       
| `#!clj [1 (+ 1 2 3)]`   | `#!clj [1 6]`          |  |

!!! Note "No operators" 
    In Clojure, `#!clj +` is a builtin symbol bound to a function. Not an operator. <br>
    Same with `#!clj -`,  `#!clj /` ,  `#!clj >`,  `#!clj =`, etc. <br>
    Because there are no operators, there's no operator precedence to discuss. Simple syntax, right?

Occasionally, you just want a list to evaluate to a list, and not to a function call

|   List          |   Evaluates To         |  Comments                                     |
|-------------------------|------------------------|-----------------------------------------------|
| `#!clj (1 1)`           |                        | Error!<br>A list will be evaluated as function call, but that 1st element will not<br>evaluate to a function. It is a number.  |
| `#!clj '(1 1)`          | `#!clj (1 1)`          | No function call happens.<br>That leading quote character says to ***not*** evaluate the list as<br>a function call and to instead just let the list evaluate to itself<br>(as most other data literals do).  |
| `#!clj (list 1 1)`      | `#!clj (1 1)`          | The builtin function, bound to the symbol`#!clj list`, will make<br>a list from its actual arguments  |

Exercises: 

  - is `(+ 1)` an error? How about `(+)` or `(*)`?
  - try `(odd? 5)` 

XXX inline REPL goes here

Are you starting to get the idea about how ***we evaulate data, to create new data***.

---
## Forms

A list like this `#!clj (+ 1 2)` is known as **a form** and **forms can be nested** like this:  `#!clj (+ 1 (inc 10))`. Let's consider how nested forms are evaluated.

In your mind's eye, see this nested example as `#!clj (f arg1 arg2)` where:

  - `#!clj f` is `#!clj +`
  - `#!clj arg1` is `#!clj 1`
  - `#!clj arg2` is `#!clj (inc 10)`  <-- a nested form

To evaluate this form, the first step is to evaluate each of the three elements. So the execution trace will be: 

  - `#!clj +` will evaluate to the builtin function bound to that symbol 
  - `#!clj 1` evaluates to  `#!clj 1`
  - `#!clj (inc 10)` is a form which means we have to apply the same process to its evaluation: (1) evaluate the elements (2) perform the function call
  - with all three elements evaluated, the function is called with the two actual arguments of `#!clj 1` and `#!clj 11` 
  - the return value from the function call is `#!clj 12` 
  - the evaluation of the nested form is `#!clj 12` 
  
More:

|  Nested Forms          |   Evaluates To         |  Comments                                     |
|------------------------|------------------------|-----------------------------------------------|
| `#!clj (+ 3 (inc 1))`  | `#!clj 5`              | Evaluation trace:<br>&nbsp;&nbsp;• `#!clj +` is evaluated to a function<br>&nbsp;&nbsp;• `#!clj 3` is evaluated to `#!clj 3`<br>&nbsp;&nbsp;• `#!clj (inc 1)` is evaluated as a function call which returns `#!clj 2`<br>&nbsp;&nbsp;• call function with args `#!clj 3` and `#!clj 2`, which  returns `#!clj 5`   |            
| `#!clj (= 2 (inc 1))`  | `#!clj true`           | `#!clj =` is a symbol which is bound to a builtin function.<br>You can guess what it does. |                 
| `#!clj (= (inc 1) (dec 3))`  | `#!clj true`     |  `#!clj dec` decrements its arg by one |          


Try:

  - `#!clj (inc (dec 1))`
  - `#!clj (odd? (inc (dec 1)))`
  - `#!clj (= (inc (dec 1)) 1)`

---
## Keywords

Keywords are like symbols, excecpt they evaluate to themselves and not to a bound value. This makes them like most other data litterals.

Keywords are ***invaluable*** as `identities` (eg. keys in maps) and they are used very widely. 

A keyword is a name that starts with a colon.


|  Value                  |   Evaluates To               |  Comments                                       |
|-------------------------|------------------------------|-------------------------------------------------|
| `#!clj :foo`            | `#!clj :foo`                 | It evaluates to itself.                         |  
| `#!clj :bar`            | `#!clj :bar`                 | It evaluates to itself                          |   
| `#!clj (= :bar :bar)`   | `#!clj true`                 | Different instances will evaluate to equal. Like numbers<br>do, and strings.| 
| `#!clj (= :bar :foo)`   | `#!clj false`                |                                                 | 
| `#!clj [1 2 :bar]`      | `#!clj [1 2 :bar]`           | Yep, evaluates to itself.                       | 
| `#!clj {1 :bar}`        | `#!clj {1 :bar}`             | And again, but as a map value                   | 


Keywords can have a `namespace`.

|  Value                       |   Evaluates To               |  Comments                                     |
|------------------------------|------------------------------|-----------------------------------------------|
| `#!clj :panel1/edit`         | `#!clj :panel1/edit`         | Starts with a colon<br>Optionally, contains a `/`<br>Before the `/` is the `namespace`<br>After the `/` is the `name`<br>Evaluates to itself |  
| `#!clj :panel2/edit`         | `#!clj :panel2/edit`         | Different namespace to above, same name       |
| `#!clj :panel.commands/edit` | `#!clj :panel.commands/edit` | namespaces can be dotted                      |
| `#!clj (name :a/b)`          | `#!clj "b"`                  | `#!clj name`  is a builtin function           |
| `#!clj (namespace :a/b)`     | `#!clj "a"`                  | `#!clj namespace`  is a builtin function      |
| `#!clj (keyword "a/b")`      | `#!clj :a/b`                 | `#!clj keyword`  is a builtin function        |
| `#!clj (keyword "a" "b")`    | `#!clj :a/b`                 | `#!clj keyword`  is a builtin function        |


To give you a taste of where this can go, here they are used as the keys in a map:
```clj
{:user/id      1
 :user/name    "Barry"
 :user/age     28
 :user/company "Tesla"}
```

Experiments:
  
  - `#!clj (namespace :a)` 
  - `#!clj (keyword (name :a))`
  -  `#!clj (keyword (namespace :a/b) (name :a/b))`


---

## Kebab Case Please

We don't use `#!clj _` in names. Instead we use `#!clj -`. 

That leads to Kebab Casing like this `:the-winner-is`, and not Snake Casing `:the_winner_is`. 
And Pascal case is reserved for a situation which we don't cover in this tutorial. 

This applies to both symbols and keywords.

We can use `#!clj -` in names because it isn't an operator. 
In the form `#!clj (- 3 2)`,  `#!clj -` is a one character name which is the ultimate in kebab case.
It also happens to look like the minus operator in other languages. 

On that subject, you'll often see names which include a trailing `#!clj ?`, like `#!clj even?` or `#!clj nil?`.
This is a convension. It is used for predicates which test for thruth. 

|  Form                           |   Evaluates To               | 
|---------------------------------|------------------------------|
| `#!clj (odd? 5)`                | `#!clj true`                 |
| `#!clj (even? 5)`               | `#!clj false`                | 
| `#!clj (nil? 5)`                | `#!clj false`                |
| `#!clj (nil? nil)`              | `#!clj true`                 |
| `#!clj (empty? [])`             | `#!clj true`                 | 
| `#!clj (empty? [:some :thing])` | `#!clj false`                | |

Again, we can use `#!clj ?` in names because it is not 
an operator, as it is in other lanugages. 

## Syntax And Evaluation 

At this point,  you know both syntax and standard evaluation. You have seen how to create data. And you've seen how to compute new data. 

Now, we need to understand some special cases. 


---
## Special Forms

Some `Forms` are special because they evaluate differently to the "normal" rules outlined above. Let's review the important ones.

## `#!clj if`

`#!clj if` forms evaluate in a "special" way. 

This `#!clj (if true 4 3)` is a four element list. Normal evaluation rules
would mean, first, evaluate all four elements of the list, and then calling the `#!clj if` function with three arguments.  

But with `#!clj if` forms, not all elements are evaluated. The 2nd `test` element is evaluated but then either the 3rd or the 4th argument
is evaluated depending on the result of that `test`. One element remains unevaluated.



|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (if true 4 3)`      |  `#!clj 4`                  |  Only  `#!clj true` and  `#!clj 4` elements are evaluated<br>The `#!clj 3` element is not evaluated |
|   `#!clj (if false 4 3)`     |  `#!clj 3`                  |  Only `false` and `3` elements are evaluated |
|   `#!clj (if false 4)`       |  `#!clj nil`                |  `else` form not provided for evaluation, so<br>the `#!clj if` evaluates to `#!clj nil` |
|   `#!clj (if (odd? 3) 3 4)`  |  `#!clj 3`                  |  `#!clj (odd? 3)` evaluates to  `#!clj true`             |
|   `#!clj (= 4 (inc 3))`      |  `#!clj true`               |   |
|   `#!clj (if (= 4 (inc 3)) :t :f)`|  `#!clj :t`            |   |
|   `#!clj [1 (if true "yes")]`     |  `#!clj [1 "yes"]`     |   |
|   `#!clj {1 (if false "yes")}`    |  `#!clj {1 nil}`       |   |


!!! Note "No Statements"
    Notice how `#!clj if` is an expression in Clojure. It doesn't have "statements" like some other languages. Everything is an expression! Everything can be evaluated. 

Exercises: 

  - check if `(if true)` is valid. 
  - what is `(if "hello" true false)` or `(if [] true false)` or `(if nil true false)`

---
## `#!clj fn`

An `#!clj fn` form creates an function.

Here is a very simple example `#!clj (fn [x] x)`:

  - an `#!clj fn` form has three elements:
    - the 2nd is a vector of symbols - in this case `#!clj [x]`
    - the 3rd is a `body` -  in this case `#!clj x`
  - an `#!clj fn` form is "special" because the 2nd and 3rd elements are not `evaluated`
  - it is only later, when this function is called,  that `body` will be evaluated, 
    and when that happens, `body` can refer to symbols in the vector, which will be bound to the actual arguments of the function call
  - our simple example function above only takes one argument `#!clj [x]` 
  - and, when the `body` is evaluated, at call time, the symbol `#!clj x` will be bound to the actual argument of that function call
  - the function will return the evaluation of the `body`, which, in the case above, is the same value as the actual argument.
  - consequently, if we called this function with the argument `#!clj 3`, this function would return `#!clj 3`
  - and, if we called this function with the argument `#!clj [:a :b]`, it would return `#!clj [:a :b]`

***Question***: so, how do we call this function?

***Answer***: easy, just place it as the first element in a form. Then add a 2nd element in that form, which is the actual argument. Like this:
```clj
; Aside: a line which starts with a semi-colon is a comment

; The following is a two element list:
;   - the 1st element is a function created by an `fn` form
;   - the 2nd element is "the actual arg"  
((fn [x] x) "the actual arg")
```
Let's think about what is happening here:

  1. This is a list, so it will evaluate to a function call
  2. This is a two step process. 
  3. First, evelauate all the elements of the list
  4. Element #1 will evaluate to a function 
  5. Element #2 will evaluate to `#!clj "the actual arg"`
  5. Then, the function call happens 
  6. `x` will be bound to `#!clj "the actual arg"`
  7. the body of the function will be evaluated
  8. The body is just `#!clj x`, which is a symbol bound to `#!clj "the actual arg"`
  9. So the body evaluates to  `#!clj "the actual arg"`
  9. So the function will return `#!clj "the actual arg"`
  10. And that then is the evaluation of the form


Another call:
```clj
((fn [x] x) [:a :b])
```
The actual argument is `#!clj [:a :b]`, and the form (function call) will evaluate to `#!clj [:a :b]`.

Let's create a different function and evaluate it: 
```clj
((fn [num] (+ num 1)) 4)
```
The body of the function, `#!clj (+ num 1)`, will be evaluated with the `#!clj num` symbol bound to the actual parameter `#!clj 4`.  The return value is `#!clj 5`.


Try:

```cljs
((fn [x] [x x]) 4)
```
or
```cljs
((fn [x] {:a x}) 4)
```
or
```clj
((fn []))
```
or

```cljs
((fn [yes?] {:a (if yes? "yes")}) true)
```
what if, instead, we called this function with `#!clj false`.

You won't see this written in a ClojureScript code, because it is wierd, but here's a puzzle:
```clj
(((fn  [] inc)) 4)
```
What is the evaluation? Note: there is an extra set of parens around the `#!clj fn` form.


---
## `#!clj def`

The `#!clj def` form creates a symbol and binds it to a value. 

```clj
(def gurus 2)
```
This defines the symbol `#!clj gurus` and binds it to the value `#!clj 2`. If, later, we used this symbol in other code, it would evaluate to `#!clj 2`.

`#!clj def` is a "special form" in two ways:

  - when evaluated, it adds to the global set of defined symbols. Such mutation is known as a side-effect.
Functions don't normally cause side effect - they are normally pure.
  - in a normal Clojure form, like say `#!clj (f gurus 2)`, the `#!clj gurus` element would be evaluated before the call. But the evaluation rules in a `#!clj def` form are different because, instead, `#!clj gurus` is the symbol to define. It doesn't get evaluated. But the 3rd element certainly does.


The 3rd element of a `#!clj def` is evaluated: 
```clj
(def skeptics (inc gurus))    ;; using the symbol `gurus` !!
```
`#!clj skeptics` is now also a defined symbol and it is bound to the evaluation of  `#!clj (inc gurus)`, which is  `#!clj (inc 2)`,  which is `#!clj 3`. 

Consider these two:
```clj
(def beach-list [:hat :sunglasses :towel])
(def beach-items (count beach-list))     ;; count is a builtin function
```
`#!clj beach-items` is a symbol bound to `#!clj 3`

Now, consider what is happening here:
```clj
(def my-inc (fn [a] (+ a 1))
```
That `#!clj fn` form will create a function, and then the `#!clj def` will bind it to the symbol  `#!clj my-inc`. Two steps. Hey, we've just created our own `#!clj inc`.
```clj
(my-inc 4) 
```
evaluates to `#!clj 5`

And again:
```clj
(def square-it (fn [x] (* x x)))
```
We can use this symbol `#!clj square-it` in a form (it is now bound to a function), like this:
```clj
(square-it 5)
```
evaluates to  `#!clj 25`



---
## `#!clj defn` 

Creating a function happens a lot, and combining `#!clj def` and `#!clj fn` each time would be verbose. So, there is 
a terser method which combines the two, called `#!clj defn`.

Used like this:
```clj
(defn dec      ; `dec` is the symbol being defined
  [n]          ; a vector of symbols for the actual arguments 
  (- n 1))     ; function body - evaluated when function is called - uses `n`
```
This could have been done on one line, but we're now starting to format our code correctly. 2 space indents. 

Use it: 
```clj
(dec 4) 
```
evaluates to `#!clj 3`

Define another function:
```clj
(defn square-it  ; `square-it` is the symbol being defined
  [n]            ; a vector of symbols for the actual arguments 
  (* n n))       ; function body - evaluated when function is called - uses `n`
```

use it: 
```clj
(square-it 3)
```
evaluates to `#!clj 9`. 

Or use it like this:
```clj
(square-it (inc 3))
```
evaluates to `#!clj 16` .

Define another: 
```clj
(defn greet
  [username]
  (str "Hello " username))) 
```
`#!clj str` is a builtin function which turns each of its arguments into a string and concatenates them. 

use it: 
```clj
(greet "world")   
```
evaluates to `#!clj "Hello world"`.


In a functional language, creating functions is a big deal. You'll be using `#!clj defn` a lot.



---
## `#!clj let` 

Here's another special form you'll be using a lot. `#!clj let` allows you to create a form with two parts: `bindings` and a `body` 

```clj
; a let form has two parts: 
;   - 1st a vector of "binding pairs"
;   - 2nd the body 
(let [a "pen"]   ; a pair - binds the symbol `a` to the value "pen"
  a)             ; the body is evaluated using the bindings
```
This `#!clj let` form evaluates to `#!clj "pen"` 

Another one: 
```clj
(let [a "pen"]   
  :foo)         ; odd. The body doesn't use `a`. But this still works. 
```
This `#!clj let` form evaluates to `#!clj :foo` 

Notice the way this `#!clj let` form  is formatted:
```clj
(let [a  "pen"         ; this pair means `a` is bound to "pen" 
      b  "sword"]      ; this pair means `b` is bound to "sword"
  (> a b))             ; is "pen" greater than "sword" ??
```
evaluates to `#!clj false`. Wait, no. That isn't convential wisdom. Damn you lexographic comparisons!!

We need to make some changes:
```clj
(let [a  "the pen"
      b  "a sword"]   
  (if (> a b) a b)) 
```
evaluates to `#!clj "a pen"`. Phew! 

```clj
(let [a  "the pen"
      b  "a sword"]   
  {:the-winner-is (if (> a b) a b)}) 
```
evaluates to `#!clj {:the-winner-is "the pen"}`

`#!clj let` is often used within a `#!clj defn`: 
```clj
(defn items-text 
  [items] 
  (let [num    (count items)
        plural (if (= num 1) "" "s")
        verb   (if (> num 1) "are " "is ")]
    (str "There " verb num " item" plural)))
```

Check on the output in these cases:
```clj
(items-text [:towel :sunglasses])
```

```clj
(items-text [:towel])
```
```clj
(items-text [])
```

Exercise: 

  - when there are no items make the text "there are no items"  (and not "there is 0 items")


## Data Functions

Clojure sometimes allows data to act as functions. For example, a map can act as a function. 
Conceptually, a function "maps" from actual arguments to return value,
and when you think about it, thats exactly what a hasmap does too. Hence the name.

This is easiest to explain via code. 

```clj
({:a 11} :a)
```
evaluates to `#!clj 11`. We are looking up the key `#!clj :a` in the map and obtaining the associated value `#!clj 11`

```clj
({:a 11 :b 21} :b)
```
evaluates to `#!clj 21`


```clj
({:a 11 :b 21} :c)
```
evaluates to `#!clj nil`. There is no key `#!clj :c` in the map.


```clj
({:a 11 :b 21} :c :not-found)
```
evaluates to `#!clj :not-found`. This time we supplied a default value.


A `keyword` can also be used as a function, provided its actual argument is a map.  

```clj
(:a {:a 11})
```
evaluates to `#!clj 11`


```clj
(:b {:a 11 :b 21})
```
evaluates to `#!clj 21`

```clj
(:c {:a 11 :b 21})
```
evaluates to `#!clj nil`

```clj
(:c {:a 11 :b 21} :not-found)
```
evaluates to `#!clj :not-found`

This approach of using a keyword as the function, with a map argument happens ***a lot***.


## BuiltIn Functions 

Clojure's provides a substantial library of builtin functions. A couple of them are used all the time, and to read Clojure code (our aim here), it is very useful to know what they do.


## `#!clj assoc` 

`#!clj assoc`  allows you to add a key/value pair to a map. 


|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (assoc {} :a 4)`    |  `#!clj {:a 4}`             |  adding a pair to an empty map `#!clj {}`     | 
|   `#!clj (assoc nil :a 4)`   |  `#!clj {:a 4}`             |  `#!clj nil` is treated as `#!clj {}`         | 
|   `#!clj (assoc {:b 1} :a 4)` |  `#!clj {:b 1 :a 4}`       |  adding a pair to non-empty map               | 
|   `#!clj (assoc {} :b 1 :a 4)` |  `#!clj {:b 1 :a 4}`      |  add two pairs                              | 

`#!clj dissoc` allows you to remove a key/value.

## `#!clj map` 

Functions that take other functions as arguments are called higher-order functions. `#!clj map` is a higher order function. 

It applies a function to all the elements in a collection. 

Imagine we create a function called  `#!clj plus-one`
```clj
(defn plus-one 
  [it]
  (+ 1 it))
```

|   Example of map             |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
| `#!clj (map plus-one [1 2 3])`    |  `#!clj (2 3 4)`        |  Applies  `#!clj plus-one` to each element of the collection.<br>Think `#!clj [(plus-one 1) (plus-one 2) (plus-one 3)]`<br>except the result is a list, not a vector.
| `#!clj (map inc [1 2 3])`    |  `#!clj (2 3 4)`        |  Same as above. But now using the builtin function  `#!clj inc`

Let's create a function called `#!clj add`
```clj
(defn add
  [a b]
  (+ a b))
```
|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
| `#!clj (map add [1 2 3] [4 5 6])` | `#!clj (5 7 9)`          |  Applies  `#!clj add` to pairs of elements.<br>Think `#!clj [(add 1 4) (add 2 5) (add 3 6)]`, except<br>result is a list
| `#!clj (map + [1 2 3] [4 5 6])` | `#!clj (5 7 9)`          |  Same as above. But using the builtin function  `#!clj +`
| `#!clj (map :a [{:a 1} {:a 11}])` | `#!clj (1 11)`          | We just learned that `keywords` can act like functions.<br>Think `#!clj [(:a {:a 1}) (:a {:a 11})]`, except<br>result is a list

What would this evaluate to:
```clj
(map str (map inc [1 2 3]))
```

## `#!clj reduce`

`#!clj reduce` is the 600 pound gorilla of functions. 

It takes three arguments:

  - a function which "accumulates"
  - the initial state of the accumulation
  - a collection to accumulate "across"

```clj
(reduce +          ;; accumulating with `+` 
        0          ;; initial state of accumulation 
        [1 2 4])   ;; the collection to accumulate across, element by element
```

An accumulation function, `#!clj +` above, must accept two arguments: 

  - the current, running accumulation, up to the current element
  - the new element to process
  
The accumulation function should combine the current, running accumulation, with the new element, and return an updated accumulation. `#!clj +` works because it can take two arguments and it will return a new accumulation of the two.

Because there are three elements in the collection, there are three steps in the reduction.

This is effectively what reduce will compute for the example above: 
```clj
(+ (+ (+ 0 1) 2) 4)
```
evaluates to `#!clj 7` and, in this case `#!clj reduce`, is used to sum the collection 



Or, to explain it step by step:

| Collection Element |  Running<br>Accumulation |   Evaluation<br>using `#!clj +`     | New Accumulation | Comment           | 
|--------------|--------------------------|------------------|------------------|-------------------|
| `#!clj 1`    |    `#!clj 0`             | `#!clj (+ 0 1)`  | `#!clj 1`        | `#!clj +` is applied to the initial value `#!clj 0` and the 1st element 1, producing a new accumulation of `#!clj 1` |
| `#!clj 2`    |    `#!clj 1`             | `#!clj (+ 1 2)`  | `#!clj 3`        | `#!clj +` is applied to the running accumulation `#!clj 1` and the 2nd element  `#!clj 2` , producing a new accumulation of `#!clj 3` |
| `#!clj 4`    |    `#!clj 3`             | `#!clj (+ 3 4)`  | `#!clj 7`        | `#!clj +` is applied to the running accumulation `#!clj 3` and the 3rd element `#!clj 4`, producing a new accumulation of `#!clj 7` |


Next example: imagine we create this accumulation function:
```clj
(defn max
  [a b]
  (if (> a b) a b))
```
And then we use that function with a reduce:
```clj
(reduce max        ;; accumulating with `max` 
        0          ;; initial accumulation  (maximum)
        [1 2 4])   ;; the collection to process
```

Effectively, what gets evaluated:
```clj
(max (max (max 0 1) 2) 4)
```


How about this one:
```clj
(reduce str        ;; accumulating with `str` 
        0          
        [1 2 4])   
```
We "accumulate" a string


How about this one:
```clj
(reduce conj        ;; <---  `conj` 
        []          ;; <--- empty vector
        [1 2 4])   
```

Or this one: 
```clj
(defn only-even
  [acc val]            ;; <-- accumulated value, new value
  (if (even? val) 
    acc 
    (conj acc val)))

(reduce only-even    
        []             ;; <--- empty vector
        [1 2 3 4 5 6])   
```


## The Arrow Macros 

Clojure has a feature called `macros`. The full specifics of macros are out of scope
for us here because they are a more advanced topic. But I will provide an overview 
of them because we need to be able to read them.

Macros are functions. Except, they run at compile time, not run time, and their job 
is to rewrite/reoganise other forms. I'll pause a while and let that sink in. This is quite 
an amazing thought, if you have never been exposed to it before. They are functions. 
They run at compile time. They can reoganise your code. 

Wait, reoganise my code? Remember that all LISP syntax is just data litterals. All of it. 
When you are writing code, you are just assembling data litterals, mostly lists. So a 
function can take you code (which is a data structure) and manipulate it, to produce 
another data structure. That is how a macro rewrites your code. 

Honestly, the only takeway you really need at this point, is that macros rewrite your code (in useful ways). 

Let's talk examples ... he's something we talked about not long ago. 
```clj
(max (max (max 0 1) 2) 4)
```

these heavily nested forms can be rewritten as using the `thread first` macro `#!clj ->` :

```clj
(-> (max 0 1)
    (+ 2)
    (+ 4)))
```
Now, that looks like a function call, right, where `->` is a function being called. And, in a way, that is what's happening, but this function is getting called at compile time, not run time. 

What the `thread first` macro does is to rewrite the forms. 

Glance back at the heavily nested version above. And then back again to the `thread first` version.  They are the same thing. The `thread first` macro version allows you to organise your forms in a way that depicts data flow. 

Read the thread first version like this: 
  1. First, `#!clj (max 0 1)` is evaluated to  `#!clj 1` 
  2. Then that value becomes the 1st argument to the next form down creating  `#!clj (+ 1 2)` 
  3. Then the evaluation of that becomes the first argument to the next form creating  `#!clj (+ 3 4)` 
  4. The result is  `#!clj 7` 

It is as if the evaluation of the higher form is "flowing down" and into the form underneath. That's the mental model. And it is useful. Except what's really going on is that the macro is rewriting your forms at compile time to be deeply nested. 

How about this one:
```clj
(-> {}
    (assoc :a 1)
    (assoc :b 2))
```
Read that as:
  1. First, `#!clj {}` is evaluated to  `#!clj {}` 
  2. Then that value becomes the 1st argument to the next form down creating  `#!clj (assoc {} :a 1)` 
  3. And the evaluation of that becomes the first argument to the next form creating  `#!clj (assoc {:a 1} :b 2)` 
  4. The result is  `#!clj {:a 1 :b 2}` 

So, at compile time, the thread first macro would rewrite this as: 
```clj
(assoc (assoc {} :a 1) :b 2)
```

We could write it that way ourselves, of course, but humans seems to better understand the "data flow" version better than the nested forms version. 

`#!clj ->` is known as a threading macro and it belongs to a family. . And there are a few different ones in the family. 

Writing macros or even knowing what they are is out of scope for this tutorial. Instead, all we need to do for the moment is understand how to read them. 

What they all do is "thread" a value through forms. 



## Immutable Data



XXX boolean and and or ???  https://j19sch.github.io/blog/clj3-and-or-being-weird/

XXX destructuring ??

XXX arrow functions 

XXX interop 

XXX Reagent like code


XXX atoms and deref - defer this to later


; short-hand for creating a simple function:
; #(...) => (fn [args] (...))

#(* 3 %)         ; => (fn [x] (* 3 x))

#(* 3 (+ %1 %2)) ; => (fn [x y] (* 3 (+ x y)))

## Summary 

We have learned:

  - in ClojureScript we evaulate data, to create new data
  - virtually all data litterals evaluate to themselves
  - 

We've looked at ClojureScript through a lens which makes it easier to understand Reagent and re-frame. 

## Installing 


To install Clojure and Leiningen (a build tool) following [these instructions](https://purelyfunctional.tv/guide/how-to-install-clojure/). 


Here's a good intro on writing a function:
https://blog.cleancoder.com/uncle-bob/2020/04/09/ALittleMoreClojure.html

The cheatsheet: 
https://clojure.org/api/cheatsheet

We haven't covered:

  - macros - write functions which take your code/data and manipulate it at compile time.
  - JavaScript interop. `(js/console.log "Hello World!")`
  - 