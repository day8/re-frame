---
klipse: true
---

> This document is currently in alpha test.
>
> If you review it, could you please let me know:
>
>   1. How long it takes you to read (my current guess is 40 mins)
>   2. What worked well for you. What puzzled you. What jarred.  What is overexplained. What is underexplained. etc. 
>
> It is not yet completely polished, but it is getting close. It does not yet have an integrated inline/on-page REPL yet. But it will soon. <br>
> 
> Please open an issue with your thoughts [at the re-freame repo](https://github.com/day8/re-frame/) or via twitter [here](https://twitter.com/wazound)
>
> Many Thanks!


Are you new to ClojureScript?  This page will teach you to ***read Clojure*** in 40 minutes.

The goal is to teach you just enough ClojureScript to read `Reagent` and `re-frame` code. The next step is 
learning to *write ClojureScript* but that's a larger skill, which will require more than 40 mins.

## Why?

Clojure is a modern LISP.

Alan Kay once described LISP as "Maxwell's equations of software".
Paul Graham believes LISP was a competitive advantage for his startup.
Eric Raymmond said that learning LISP was profoundly enligthening and that knowing it would make you a better programmer for the rest of your days.

In the 70s, 80s and 90s, the LISP community went through a washing machine phase of evolutionary churn. 
Innovation flourished, experiments happened, prototype ideas were tested and knowledge foliated.
Later, in about 2010, Rich Hickey took that knowledge and created Clojure, introducing key innovations. 
He did this well away from academia (LISP's traditional home) because he wanted to create a pragmatic language for commercial developers.

So, Clojure has had a long gestation period, and it comes with a hard practical edge.

As the owner of a company that develops software products, I believe ClojureScript gives us a
competitive edge. As an experienced programmer, I feel like it has provided me with excellent,
nourishing brain food. It is a stable, productive place.

If you'll allow me some momentary negativity: in contrast, I'm scared of the javascript landscape, which still appears to be a churning 
washing machine full of steep learning curves, premature obsolescence and sharp edges, which teach me little of substance
and certainly won't make me productive.

Enough of a sermon? Yes. Okay, 40 mins ...

---

> A note on names:  
> `Clojure` runs on the JVM.  
> `ClojureScript` runs in the browser.  
> They are essentially the same language but our focus here is on `ClojureScript`.

---
I have good news: you are going to be surprised and delighted at the simplicity of the syntax. 
## Simple Data Literals




|   Type       |   Example                           |   Comment            |  
|--------------|-------------------------------------|----------------------|
| character    | `#!clj \a`                          | The letter `a`       |  
| number       | `#!clj 1`                           |                      |  
| number       | `#!clj 3.14`                        |                      |  
| string       | `#!clj "hello"`                     |                      |  
| nil          | `#!clj nil`                         | aka null, None       |      


## Collection Data Literals

Lists use  `#!clj ()`, vectors use  `#!clj []`, hashmaps use  `#!clj {}` and sets use `#!clj #{}`, 

Examples: 

| Collection   |   Example                           |   Comment            |   
|--------------|-------------------------------------|----------------------|
| list         | `#!clj (1 2 3)`                     | Empty list is `#!clj ()`<br>No commas necessary.<br>But, if present, treated as whitespace.  |  
| list         | `#!clj (1 2 "yes")`                 | Can be heterogeneous. |  
| vector       | `#!clj [1 2 3]`                     | Again, no commas necessary.<br>Empty vector is `#!clj []`| 
| vector       | `#!clj [1 "hello" \x nil]`          | Can be heterogeneous. | 
| hashmap      | `#!clj {1 "Hello"}`                 | A dictionary, or hashmap.<br>Each pair is a `key` and a `value`.<br>One pair in this example.<br>`#!clj 1` is key, `#!clj "hello"` is the value| 
| hashmap      | `#!clj {1 "Hello" 2 nil}`           | No delimiter necessary between pairs.<br>Two key/value pairs in this example.| 
| hashmap      | `#!clj {1  "Hello"`<br> &nbsp;`#!clj  \b  27`<br> &nbsp;`#!clj  "pi"   3.14}`  | Can be heterogeneous.<br>Still no commas between pairs.   | 
| set          | `#!clj #{1 "Hello" \a}`  | Can be heterogeneous.<br>Still no commas between pairs.   |     


Collections can nest:

|          |   Example                               |   Comment                             |  
|----------|-----------------------------------------|---------------------------------------|
| vector   | `#!clj [1 [2 2] 3]`                     | an element can be another vector        |  
| vector   | `#!clj [1 {4 5} 3]`                     | an element can be a hashmap                 |  
| hashmap  | `#!clj {1 [4 5]`<br>&nbsp;&nbsp;`#!clj 2 [\a \b]}`   | a value in a hashmap can be a vector           |  
| hashmap  | `#!clj {1 {4 5}`<br>&nbsp;&nbsp;`#!clj 2 {\a \b}}`   | a value in a hashmap can be a hashmap              | 
| hashmap  | `#!clj {{4 5} 1`<br>&nbsp;&nbsp;`#!clj [1 2] 2}`     | the keys in a hashmap can be a hashmap or vector   |

Hashmaps are often just called maps.


## Symbols 

A symbol is a `name` that is bound to a `value`. Here, we mean "bound" in the sense of "is tied to" or "is associated with" or "refers to".


|  Type    |   Example               |   Comment            |  
|----------|-------------------------|----------------------|
| symbol   | `#!clj inc`             | The symbol `#!clj inc` is bound to one of Clojure's builtin functions.<br>This function will return its argument incremented |
| symbol   | `#!clj +`               | The symbol `#!clj +` is also bound to a builtin function. It adds its arguments.<br>note: `#!clj +` is not an operator in ClojureScript, it is a function |
| symbol   | `#!clj yours`           | Soon you'll see how you can create a symbol and bind it to a value. But that is a few minutes away down the page, so until then, you'll just have to take it on trust that this is possible/easy.  |


## That's It For Syntax

We've now covered most of Clojure's syntax.

But, how can that be?  Haven't we only looked at data literals? Well, yes, but 
Clojure is `Homoiconic` which means "code is data" - you write Clojure code 
using Clojure's data literals and we've covered data literals. 

---
## Evaluation

You are going to be surprised and delighted with the simplicity of "evaluation".

**1st Evaluation Rule:** all data litterals other than `lists` and `symbols` **evaluate** to themselves.

|  Value              |   Evaluates To              |  Comment    |
|---------------------|-----------------------------|-------------|
| `#!clj \a`          | `#!clj \a`                  |  Same       |        
| `#!clj 1`           | `#!clj 1`                   |  Same       |
| `#!clj [1 1]`       | `#!clj [1 1]`               |  Same       |
| `#!clj {1 1 2 2}`   | `#!clj {1 1 2 2}`           |  Yep, same  |


Below, you can start evaluating live on this page. Enter an expression into the following editor 
and it will be evaluated. The result of the evaluation will be shown in the box below the editor.

XXX inline REPL will go here. In the meantime, use [this external one](https://jaredforsyth.com/reepl/)


Try these experiments:

   - {:a 1 :a 4} -- oops 
   - forget to close a parens ??
   - XXX other basic examples?

So, let's now talk about the two exceptions `lists` and `symbols` ...

## Evaluating Symbols 

**2nd Evaluation Rule:** Symbols don't evaluate to themselves. Instead, they evaluate to the value to which they are "bound". 


Example symbol evaluations:

|  Expression     |   Evaluates To               |  Comments                                     |
|-----------------|------------------------------|-----------------------------------------------|
| `#!clj foo`     | `#!clj 4`                    | Assuming  the symbol `#!clj foo` is bound to the value  `#!clj 4`       |         
| `#!clj bar`     | `#!clj [1 2 3]`              | Assuming  the symbol `#!clj bar` is bound to the value  `#!clj [1 2 3]` |             
| `#!clj [1 foo]` | `#!clj [1 4]`                | Each element is evaluated, and  `#!clj foo` evaluated to  `#!clj 4`     |
| `#!clj [foo bar]` | `#!clj [4 [1 2 3]]`        | Assuming `#!clj foo` evaluates to  `#!clj 4`,  `#!clj bar` evaluates to  `#!clj [1 2 3]` |


!!! Note "Symbols are often bound to functions"

    For the moment, you'll have to take my word on this: the symbol `#!clj inc`
    is bound to a function in Clojure's standard library. As a result, when you evaulate `#!clj inc`, you get the function!! Because that's what `inc` is bound to.

    There's also another symbol, `#!clj count`, which is bound to different function in the standard library. 

    And, finally - this one will be a surprise - the symbol `#!clj +` is bound to a function.  
    Wait. Isn't `#!clj +` an operator?  No. Clojure doesn't have operators. 
    Instead, `#!clj +` is a symbol, and it is bound to a function - one which adds. Anyway, more soon.


XXX inline REPL will go here. In the meantime use [this external one](https://jaredforsyth.com/reepl/)

Try these experiments:

   - `#!clj inc`
   - `#!clj [inc dec +]`       <--- and array of symbols
   - `#!clj {inc 5}`           <--- strange but possible

## Evaluating Lists


**3rd Evaluation Rule:** a `list` evaluates to a function call.

Okay, now we're cooking with gas!  Clojure is a functional language so, 
as you can imagine, function calls are a big deal,
so this section is important. 

Here's an example list  `#!clj (f arg1 arg2 arg3)`. Because it is surrounded by parens, `#!clj ( )`, it is a list, and we can see it has four elements. 

Such a list is **evaluated in two steps**:

  1. first, each element in the list is evaluated (all four of them in this example)
  2. then, a function call occurs where:
     - the evaluation of the 1st element will be the function called 
     - the evaluation of the other elements (3 in the case above) will be the actual arguments in this function call 

The list evaluates to the return value of this function call. So, if this example function call returned the string `#!clj "maybe Satoshi"`, then the list `#!clj (f arg1 arg2 arg3)` would evaluate to `#!clj "maybe Satoshi"`.

!!! Note "More on symbols bound to functions"
    In Clojure code, the 1st element of a list is often a symbol. So, let's talk more about that. 
    
    Here's an example: `#!clj (inc 3)`.  That's a two element list, and the first element is the symbol `#!clj inc`. The 2nd element is the value `#!clj 3`
    
    When evaluating this list, in step 1 all elements of the list are evaluated and, if the first element of the list is a symbol, like `#!clj inc`, it will evaluate to what it is bound to, which 
    is a function. And it is ***that*** function which is called in step 2.

    So `#!clj inc` is a symbol, not a function. But it _is_ bound to a function. A subtle but important distinction. 
    
    If, instead, `#!clj inc` was bound to the value `#!clj 27` we couldn't use it in the first position of a list, because it is bound to a number, not a function. We'd get an error at call time.


Example list evaluations, involving symbols:

|  List                   |   Evaluates To         |  Comments                                              |
|-------------------------|------------------------|--------------------------------------------------------|
| `#!clj (inc 3)`         | `#!clj 4`              | Step 1: evaluate each element of the list (there are two):<br>&nbsp;&nbsp;• the symbol  `#!clj inc` is bound to a builtin function<br>&nbsp;&nbsp;• and `#!clj 3` evaluates to `#!clj 3`<br>Step 2: call the function with `#!clj 3` as the argument.<br>The return value `#!clj 4`         | 
| `#!clj [5 (inc 6)]`     | `#!clj [5 7]`          | Evaluate each element of the vector.  `#!clj 5` evaluates to  `#!clj 5`.<br>Then, evaluating that 2nd element is a function call.  |        
| `#!clj (+ 1 2)`         | `#!clj 3`              | The symbol `#!clj +` is bound to a builin function.<br>And that function adds together its arguments |      
| `#!clj (+ 1 2 3)`       | `#!clj 6`              | Surprise! Turns out this function can handle a variable<br>number of arguments.          |       
| `#!clj [1 (+ 1 2 3)]`   | `#!clj [1 6]`          |  |

!!! Note "No operators" 
    We now know that `#!clj +` is a symbol bound to a builtin function, not an operator. <br>
    It is the same with `#!clj -`,  `#!clj /` ,  `#!clj >`,  `#!clj =`, etc.<br>
    Because these are just names, you can also have `#!clj not=`<br>
    And because there are no operators, there's no operator precedence to discuss. Simple syntax, right?

Let's start evaluating, live. Type into the following editor. Click Ctrl-click to evaluate. Possible experiments: 

  - is `(+ 1)` an error? How about `(+)` or `(*)`?
  - try `(odd? 5)` 
  - try `(count [1 2 3])`

XXX inline REPL will go here. In the meantime use [this external one](https://jaredforsyth.com/reepl/)



---

## Forms

A list like this `#!clj (+ 1 2)` is known as **a form**.

**Forms can nest** like this: `#!clj (+ 1 (inc 10))`. So, how do nested forms evaluate?
Well, in your mind's eye, see this nested example as `#!clj (f arg1 arg2)` where:

  - `#!clj f` is `#!clj +`
  - `#!clj arg1` is `#!clj 1`
  - `#!clj arg2` is `#!clj (inc 10)`  <-- a nested form

To evaluate this form, you'll remember from the last section that it is a two step process. First, evaluate each of the three elements. So the execution trace will be: 

  - `#!clj +` will evaluate to the builtin function bound to that symbol 
  - `#!clj 1` evaluates to  `#!clj 1`
  - `#!clj (inc 10)` is a list and we evaluate it as a function call: (1) evaluate the elements (2) perform the function call
  - with all three elements evaluated, the function (bound to `#!clj +`) is called with the two actual arguments of `#!clj 1` and `#!clj 11` 
  - the return value from the function call is `#!clj 12`
  - which means the overall evaluation of this nested form is `#!clj 12` 
  
More:

|  Nested Forms          |   Evaluates To         |  Comments                                     |
|------------------------|------------------------|-----------------------------------------------|
| `#!clj (+ 3 (count [1 2]))`  | `#!clj 5`        | Evaluation trace:<br>&nbsp;&nbsp;• `#!clj +` is evaluated to a function<br>&nbsp;&nbsp;• `#!clj 3` is evaluated to `#!clj 3`<br>&nbsp;&nbsp;• `#!clj (count [1 2])` is evaluated as a function call which returns `#!clj 2`<br>&nbsp;&nbsp;• call function with args `#!clj 3` and `#!clj 2`, which  returns `#!clj 5`   |            
| `#!clj (= 2 (inc 1))`  | `#!clj true`           | `#!clj =` is a symbol which is bound to a builtin function.<br>You can guess what it does. |                 
| `#!clj (= (inc 1) (dec 3))`  | `#!clj true`     |  `#!clj dec` is bound to a bultin, and it decrements its arg by one |          


Evaluate these experiments yourself (any surprises?):

  - `#!clj (inc (dec 1))`
  - `#!clj (odd? (inc (dec 1)))`
  - `#!clj (= (inc (dec 1)) 1)`

XXX inline REPL will go here. In the meantime use [this external one](https://jaredforsyth.com/reepl/)


---
## Keywords

Keywords are like symbols, except they evaluate to themselves and not to a bound value. This means they evaluate like most other data literals.

Keywords are ***invaluable*** as `identities` and they are used widely, particularly as keys in hashmaps.

A keyword is a name that starts with a colon. Let's evaluate some:


|  Value                  |   Evaluates To               |  Comments                                       |
|-------------------------|------------------------------|-------------------------------------------------|
| `#!clj :foo`            | `#!clj :foo`                 | It evaluates to itself.                         |  
| `#!clj :bar`            | `#!clj :bar`                 | It evaluates to itself                          |   
| `#!clj (= :bar :bar)`   | `#!clj true`                 | Different instances will evaluate to equal. Like numbers<br>do, and strings.| 
| `#!clj (= :bar :foo)`   | `#!clj false`                |                                                 | 
| `#!clj [1 2 :bar]`      | `#!clj [1 2 :bar]`           | Yep, evaluates to itself.                       | 
| `#!clj {1 :bar}`        | `#!clj {1 :bar}`             | And again, but as a hashmap value                   | 


Keywords can have a `namespace`.

|  Value                       |   Evaluates To               |  Comments                                     |
|------------------------------|------------------------------|-----------------------------------------------|
| `#!clj :panel1/edit`         | `#!clj :panel1/edit`         | Starts with a colon<br>Optionally, contains a `/`<br>Before the `/` is the `namespace`<br>After the `/` is the `name`<br>Evaluates to itself |  
| `#!clj :panel2/edit`         | `#!clj :panel2/edit`         | Different namespace to above, same name       |
| `#!clj :panel.commands/edit` | `#!clj :panel.commands/edit` | namespaces can be dotted                      |
| `#!clj (name :a/b)`          | `#!clj "b"`                  | `#!clj name`  is bound to a builtin function           |
| `#!clj (namespace :a/b)`     | `#!clj "a"`                  | `#!clj namespace`  is bound to a builtin function      |
| `#!clj (keyword "a/b")`      | `#!clj :a/b`                 | `#!clj keyword`  is bound to a builtin function        |
| `#!clj (keyword "a" "b")`    | `#!clj :a/b`                 | `#!clj keyword`  is bound to a builtin function        |


To give you a taste of where this can go, here they are used as the keys in a hashmap:
```clj
{:user/id      1
 :user/name    "Barry"
 :user/age     28
 :user/company "SpaceX"
 :role/name    "Rocket Sharpener"}
```

Evaluate these experiments yourself (any surprises?):
 
  - `#!clj (namespace :a)` 
  - `#!clj (keyword (name :a))`
  - `#!clj (keyword (namespace :a/b) (name :a/b))`

XXX inline REPL will go here. In the meantime use [this external one](https://jaredforsyth.com/reepl/)

---

## Kebab Case Please

We don't use `#!clj _` in names. Instead we use `#!clj -`. This applies to both symbols and keywords.

That leads to Kebab Casing like this `:the-winner-is`, and not Snake Casing `:dont_do_this`. 
Pascal case is reserved for a situation which we don't cover in this tutorial. 

We can use `#!clj -` in names because it isn't an operator. 
In the form `#!clj (- 3 2)`,  `#!clj -` is a one character name which is the ultimate in kebab case.
It also happens to look like the minus operator in other languages. 


---
## Predicates

On that subject, you'll often see Clojure names which include a trailing `#!clj ?`. For example, `#!clj even?` or `#!clj nil?`.
This is a naming convention. It is used for symbols bound to predicate functions which test for a truth.

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

---
## What Have You Learned ?

So Far:
 
  - To write Clojure code, you write Clojure data literal. You code in data. 
  - data can be evaluated, to create new data
  - 1st Evaluation Rule: most data evaluates to itself
  - 2nd Evaluation Rule: `symbols` evaluate to what they are bound to 
  - 3rd Evaluation Rule: `lists` evaluate to a function call's return value
  - using "quoting" we can avoid the 2nd and 3rd evaluation rules.


Now, we review some special cases. 

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
    Notice how `#!clj if` is a form in Clojure, which evaluates to a value, and not a statement. (Clojure doesn't have any statements, or operators, it just has data and evaluation rules) 

Possible experiments: 

  - check if `(if true)` is valid. 
  - explore what is "truthy", via  `(if "hello" true false)` or `(if [] true false)` or `(if nil true false)`


XXX inline REPL will go here. In the meantime use [this external one](https://jaredforsyth.com/reepl/)

---
## `#!clj fn`

An `#!clj fn` form creates a function. We're taking a big step up here.

Here is a very simple example `#!clj (fn [x] x)`:

  - an `#!clj fn` form has three elements:
    - the 2nd is a vector of symbols - in this case `#!clj [x]`
    - the 3rd is a `body` -  in this case `#!clj x`
  - an `#!clj fn` form is "special" because the 2nd and 3rd elements are not `evaluated`
  - it is only later, when this function is called,  that `body` will be evaluated, 
    and when that happens, `body` can refer to symbols in the vector, which will be bound to the actual arguments of the function call
  - our simple example function above only takes one argument. See `#!clj [x]` 
  - and, when the `body` is evaluated, at call time, the symbol `#!clj x` will be bound to the actual argument of that function call
  - the function will return the evaluation of the `body`, which, in the case above, is the same value as the actual argument.
  - consequently, if we called this function with the argument `#!clj 3`, this function would return `#!clj 3`
  - and, if we called this function with the argument `#!clj [:a :b]`, it would return `#!clj [:a :b]`

***Question***: so, how do we call this function?

***Answer***: easy, we already know how, just place it as the first element in a form. Then add a 2nd element in that form, which is the actual argument. Like this:
```clj
; Aside: a line which starts with a semi-colon is a comment

; The following is a two element list:
;   - the 1st is (fn [x] x) and that's a function (created by an `fn` form)
;   - the 2nd element is a string "the actual arg"  
((fn [x] x) "the actual arg")
```

I'd like you to see this two element list as more like, say:
```clj
(count "the actual arg")
```
Except, in place of the symbol  `#!clj count` there is a form `#!clj (fn [x] x)`.  `#!clj count` is symbol which evaluates to a builtin function. Whereas `#!clj (fn [x] x)` is a form which evaluates to a function. Either way, the first element of the list evaluates to a function and the 2nd element to the list will be the actual argument in this function call.

Let's work through it in more detail: 

  1. This is a two element list, so it will evaluate to a function call, in the two step process described above
  3. First, evaluate all the elements of the list  (remember, there are two)
    - The first element (the  `#!clj fn` form) will evaluate to a function 
    - The second element is a string which will evaluate to itself `#!clj "the actual arg"`
  5. Second, the function call happens 
    - the function `#!clj (fn [x] x)` will be called
    - `x` will be bound to the actual argument `#!clj "the actual arg"`
    - calling the function means evaluating the body of the function
    - The body of the function is just `#!clj x`, a symbol which is bound to the actual argument `#!clj "the actual arg"`
    - So the body evaluates to  `#!clj "the actual arg"`
  9. The functions return value will be `#!clj "the actual arg"`
  10. And that then is the evaluation of the entire form


Here's another call to the same function:
```clj
((fn [x] x) [:a :b])
```
The actual argument is `#!clj [:a :b]`, and the form (function call) will evaluate to `#!clj [:a :b]`.

Let's create a different function and evaluate it: 
```clj
((fn [num] (+ num 1)) 4)
```
The body of the function, `#!clj (+ num 1)`, will be evaluated with the `#!clj num` symbol bound to the actual parameter `#!clj 4`.  The return value is `#!clj 5`.


Try these experiments:

```cljs
((fn [x] [x x]) 4)
```
or
```cljs
((fn [x y] {x y}) :a 4)
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

You won't see this written in normal ClojureScript code, because it is weird, but here's a puzzle:
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
(def saints (inc gurus))    ;; look, using the symbol `gurus` !!
```
`#!clj saints` is now also a defined symbol and it is bound to the evaluation of  `#!clj (inc gurus)`, which is  `#!clj (inc 2)`,  which is `#!clj 3`. 

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

A ClojureScript program typically contains a lot of function definitions, and combining
`#!clj def` and `#!clj fn` each time would be verbose. So, there is a shorter way 
which combines the two, called `#!clj defn`.

You use it like this:
```clj
(defn dec      ; `dec` is the symbol being defined
  [n]          ; a vector of symbols for the actual arguments 
  (- n 1))     ; function body - evaluated when function is called - uses `n`
```
So, this binds a symbol to a function. All of the "builtin functions" mentioned previously in this tutorial are defined this way: `#!clj str`, `#!clj count`, `#!clj inc`, `#!clj namespace`, `#!clj +` etc. 


To use the symbol/function just defined: 
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

This is another special form you'll be using _a lot_. 

```clj
; a let form has two parts: 
;   - 1st a vector of "binding pairs"
;   - 2nd a "body" 
(let [a "pen"]   ; a pair - binds the symbol `a` to the value "pen"
  a)             ; the body is evaluated with the bindings
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
evaluates to `#!clj false`. Wait, no. That isn't conventional wisdom. Damn you lexicographic comparisons!!

We need to make some changes:
```clj
(let [a  "the pen"
      b  "a sword"]   
  (if (> a b) a b)) 
```
evaluates to `#!clj "the pen"`. Phew! 

```clj
(let [a  "the pen"
      b  "a sword"]   
  {:winner-is (if (> a b) a b)}) 
```
evaluates to `#!clj {:winner-is "the pen"}`

`#!clj let` is often used within a `#!clj defn`: 
```clj 
(defn greet
  [name friendly?]
  (let [greeting (if friendly? "Hello " "Go away ")]
    [:div greeting name])
```

XXX experiment with greet 

```clj
(greet "Mum" true)
```

```clj
(greet "Noisy Neighbours" false)
```

In this particular, we could have got away with no using a `let`, like this: 
```clj 
(defn greet
  [name friendly?]
  [:div (if friendly? "Hello " "Go away ") name)
```

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



## What have You Learned ? 

So Far:

  - the syntax is just data literals
  - data can be evaluated
  - lists (forms) evaluate to function calls 
  - there are special forms (exceptions to the normal evaluation rules for forms)
  - `#!clj defn` allows us to bind a function to a symbol 

## Data Functions

Sometimes data can act as a function - it can appear as the first element in a form. 

For example, a hashmap can act as a function. This is easiest to explain via code:
```clj
({:a 11} :a)
```
Here, a hashmap `#!clj {:a 11}` is used as the 1st element in a `form`. The actual argument,  `#!clj :a`,  will be looked up in that hashmap, and the associated value,  `#!clj 11`, is the return value of the function call. So  `#!clj 11` is the evaluation.


```clj
({:a 11 :b 21} :b)
```
evaluates to `#!clj 21`. We are looking up the key `#!clj :b` in the hashmap  `#!clj {:a 11 :b 21}` and obtaining the associated value `#!clj 21`


```clj
({:a 11 :b 21} :c)
```
evaluates to `#!clj nil`. There's no key `#!clj :c` in the hashmap.


```clj
({:a 11 :b 21} :c :not-found)
```
evaluates to `#!clj :not-found`. The key was not found in the hashmap, but we supplied a default value as the 2nd actual argument (the 3rd element of the list).


This can be reversed. A `keyword` can also be used as the 1st element in a form, provided the actual argument is a hashmap.
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

This approach of using a keyword as the function, with a hashmap argument happens ***a lot*** in ClojureScript Code.


---
## BuiltIn Functions 

Clojure's has a substantial library of builtin functions. A few in particular 
are used all the time, and to read Clojure code (our aim here), you must know them. 


## `#!clj assoc` 

`#!clj assoc`  allows you to add a key/value pair to a hashmap. 


|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (assoc {} :a 4)`    |  `#!clj {:a 4}`             |  adding a key/value pair to the empty hashmap `#!clj {}`     | 
|   `#!clj (assoc nil :a 4)`   |  `#!clj {:a 4}`             |  `#!clj nil` is treated as `#!clj {}`         | 
|   `#!clj (assoc {:b 1} :a 4)` |  `#!clj {:b 1 :a 4}`       |  adding a key/value pair to the hashmap  `#!clj {:b 1}`              | 
|   `#!clj (assoc {} :b 1 :a 4)` |  `#!clj {:b 1 :a 4}`      |  add two pairs at once                              | 


## `#!clj map` 

Applies a function to all the elements of a collection. 

First, we create a function called  `#!clj plus-one`
```clj
(defn plus-one 
  [it]
  (+ 1 it))
```
Now use it with `#!clj map`:

|   Example of map             |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
| `#!clj (map plus-one [1 2 3])`    |  `#!clj (2 3 4)`        |  Applies  `#!clj plus-one` to each element of the collection.<br>Think `#!clj [(plus-one 1) (plus-one 2) (plus-one 3)]`<br>except the result is a list, not a vector.
| `#!clj (map inc [1 2 3])`    |  `#!clj (2 3 4)`        |  Same as above, but now `#!clj inc`
| `#!clj (map inc '(1 2 3))`    |  `#!clj (2 3 4)`        |  Same as above. But now across a `list`.<br>Note the use of quote on the list
| `#!clj (map inc #{1 2 3})`    |  `#!clj (2 3 4)`        |  Same as above. But now across a `set`. 
| `#!clj (map count ["hi" "world"])`    |  `#!clj (2 5)`        | Think `#!clj (count "hi") (count "world")`
| `#!clj (map :a [{:a 1} {:a 11}])` | `#!clj (1 11)`          | Earlier, we learned that `keywords` can act like<br>functions. Think `#!clj (:a {:a 1}) (:a {:a 11})`

> Note: `#!clj map` always returns a `list`, even if you give it a vector, set, list, etc.

Create `#!clj add` for use with  `#!clj map` below:
```clj
(defn add
  [a b]
  (+ a b))
```
|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
| `#!clj (map add [1 2 3] [4 5 6])` | `#!clj (5 7 9)`          |  Applies  `#!clj add` to pairs of elements.<br>Think `#!clj [(add 1 4) (add 2 5) (add 3 6)]`, except<br>result is a list
| `#!clj (map + [1 2 3] [4 5 6])` | `#!clj (5 7 9)`          |  Same as above. But using the builtin function  `#!clj +`



Exercises:
```clj
(map {:a 1 :b 2 :c 3} [:a :b :c :d])
```
What would this evaluate to:
```clj
(map count (map str (map inc [9 99 999])))
```

XXX Live coding here.

## `#!clj reduce`

In the functional world, `#!clj reduce` is part 600 pound gorilla, part swiss arm knife. 

It takes three arguments:

  - a function which "accumulates"
  - the initial state of the accumulation
  - a collection to accumulate "across"

```clj
(reduce +          ;; accumulating with `+` 
        0          ;; initial state of accumulation 
        [1 2 4])   ;; the collection to accumulate across, element by element
```

The accumulation function, `#!clj +` in the example above, must accept two arguments: 

  - the current, running accumulation, up to the current element
  - the new element to process
  
The accumulation function should combine the current, running accumulation, with the new element, and return an updated accumulation. `#!clj +` works because it can take two arguments and it will return a new accumulation of the two.

Because there are three elements in our example collection  `#!clj [1 2 4]`, there are three steps in the reduction. If our collection had 100 elements, there would be 100 steps in the reduction.

This is effectively what reduce will compute for the example above: 
```clj
(+ (+ (+ 0 1) 2) 4)
```
evaluates to `#!clj 7` and, in this case `#!clj reduce`, is effectively summing the collection 


Or, to explain the three steps another way: 

| Collection Element |  Running<br>Accumulation |   Evaluation<br>using `#!clj +`     | New Accumulation | Comment           | 
|--------------|--------------------------|------------------|------------------|-------------------|
| `#!clj 1`    |    `#!clj 0`             | `#!clj (+ 0 1)`  | `#!clj 1`        | `#!clj +` is applied to the initial value `#!clj 0` and the 1st element of the collection `#!clj 1`, producing a new accumulation of `#!clj 1` |
| `#!clj 2`    |    `#!clj 1`             | `#!clj (+ 1 2)`  | `#!clj 3`        | `#!clj +` is applied to the accumulation `#!clj 1` and the 2nd element of the collection `#!clj 2` , producing a new accumulation of `#!clj 3` |
| `#!clj 4`    |    `#!clj 3`             | `#!clj (+ 3 4)`  | `#!clj 7`        | `#!clj +` is applied to the accumulation `#!clj 3` and the 3rd element of the collection `#!clj 4`, producing a new accumulation of `#!clj 7` |


Next example: we create this accumulation function:
```clj
(defn max
  [a b]
  (if (> a b) a b))
```
Then we use that function with a reduce:
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
(reduce str        ;; accumulating with the builtin `str` 
        0          
        [1 2 4])   
```
We "accumulate" a string


How about this one:
```clj
(reduce conj        ;; <--- `conj` is a builtin too
        []          ;; <--- empty vector
        [1 2 4])   
```

Or this one: 
```clj
(defn only-odd
  [accumulation val]            ;; <-- accumulated value, new value
  (if (even? val) 
    accumulation 
    (conj accumulation val)))

(reduce only-odd  
        []             ;; <--- start with an empty vector
        [1 2 3 4 5 6])   
```


## The Arrow Macros

Clojure has an advanced feature called `macros` which we'll review now,
because you need to understand their impact.

Macros are functions which are run at compile time, not run time. Their job
is to **rewrite your code** in useful ways. This is probably not a feature
you'll have experienced before in other languages. 

Wait, rewrite my code? How is that even possible?

Well, in ClojureScript your **code is data**. 
It is just arrangements of data literals put into text file, involving mostly  lists, symbols and vectors.
This property means a function can take your code (which is just data, remember),  and compute new data, which is new code.
And **that** is how a macro rewrites your code - it is a function that runs at compile time.

The key takeaway is that macros rewrite your code in useful ways.

## Thread First Macro `->`

Let's talk examples ... here's a deeply nested arrangement of forms we talked about earlier: 
```clj
(+ (+ (+ 0 1) 2) 4)
```
Deeply nested forms, like this, are often rewritten using the `thread first` macro `#!clj ->`:
```clj
(-> (+ 0 1)   ; (+ 0 1)
    (+ 2)     ; (+ (+ 0 1) 2)
    (+ 4)))   ; (+ (+ (+ 0 1) 2) 4)
```
`#!clj ->` is a symbol and it is the first element in a form  `#!clj (-> ...)`. 
So, this is a function call and the symbol `#!clj ->` is bound to the function to be called, a bit 
like `#!clj (+ ...)`. And, in this example, the function call has three actual arguments - I can see three forms. 
But this `#!clj ->` function is ***actually*** getting called at compile time, not run time. 
And this `thread first` function (marco) will rewrite/reorganise the three forms provided as arguments, producing new code. And that new code will match exactly the deeply-nested-forms version given above.

Read the `thread first` version (above) like this:

  1. First, `#!clj (max 0 1)` is evaluated to  `#!clj 1` 
  2. Then that `#!clj 1` value becomes the 1st argument to the next form down, which is `#!clj (+ 2)`, effectively creating  `#!clj (+ 1 2)` 
  3. Then the evaluation of that form becomes the first argument to the next form, which is `#!clj (+ 4)` , effectively creating  `#!clj (+ 3 4)` 
  4. The result is  `#!clj 7` 

Notice how the value for the previous form's evaluation is always "threaded" into the form below as the 1st argument. Hence the name "thread first macro".

Deeply nested forms can be a bit hard to read, so the `thread first` macro arrangement allows you to visualise the computation as a cascading data flow.
It is as if the evaluation of the higher form is "flowing down" and into the form underneath. That's a useful mental model for many. 

How about this use of `#!clj ->`:
```clj
(-> {}
    (assoc :a 1)    ; (assoc {} :a 1)
    (assoc :b 2))   ; (assoc (assoc {} :a 1) :b 2)
```
Read that as:

  1. First, `#!clj {}` is evaluated to  `#!clj {}` 
  2. Then that value becomes the 1st argument to the next form down creating  `#!clj (assoc {} :a 1)` 
  3. And the evaluation of that form becomes the first argument to the next form creating  `#!clj (assoc {:a 1} :b 2)` 
  4. The entire form evaluates to `#!clj {:a 1 :b 2}` 

Now, we could choose to simply write it the deeply nested way ourselves, of course, but humans seem to better understand the "data flow" version more than the nested forms version. 


Work out the evaluation of:
```clj
(-> {:a {:aa 11}} 
    :a               ;; same as (:a)
    :aa)             ;; same as (:aa)
```

`#!clj ->` belongs to a small family of marcos. Another one is the `thread last` macro `#!clj ->>`.  It operates the same way except it threads the value as the argument in the last position, not the first.

## Thread Last Macro `->>`

Do you remember this nested form example from earlier:
```clj
(map count (map str (map inc [9 99 999])))
```

This can be rewritten using the "thread last" macro `#!clj ->>`:
```clj
(->> [9 99 999]
    (map inc)      ; (map inc [9 99 999])    
    (map str)      ; (map str (map inc [9 99 999]))
    (map count))   ; (map count (map str (map inc [9 99 999])))
```
With `thread last` the evaluation of the previous form is threaded into the next form as the **last** argument (not the first). 

Work out the evaluation of:
```clj
(->> (range 10)      ; (range 10)
     (map inc)       ; (map inc (range 10))
     (filter odd?))  ; (filter odd? (map inc (range 10))
```


## The Hard Bit

The learning curve so far as been gentle. Clojure has simple syntax and simple evaluation semantics. 

The steeper part of the Clojure learning curve, and the part that takes most of the time to master,
is figuring out how to **_write code using pure functions and immutable data_**.
If you have previously only used imperative, place-oriented languages (eg. OO languages),
this paradigm change takes time to click.

But, of course, the purpose of this tutorial is to teach you to **_read_** Clojure, which is an easier skill. So, onward ...

## Immutable Data

ClojureScript uses immutable data structures by default.

**The rule**: once you create data, you can't mutate it (change it). Ever. 

But you can create a revision (a copy) of that data, which is modified in some way. 
The original data is untouched. But, then, you 
can't change this revision either. But, you can create a further revision (copy) of the revision, etc. 

Let's see this in action. Evaluate the following: 
```clj
(let [car1  {:doors 2}                 ; an original hashmap 
      car2  (assoc car1 :seats 4)      ; add a key/value pair, a new revision is created
      car3  (assoc car2 :engine :big)] ; add a key/value pair, a new revision is created
  [car1 car2 car3])                    ; the value associated with car1 is untouched
```
you'll see a vector of three values `#!clj  [{:doors 2} {:doors 2, :seats 4}  {:doors 2, :seats 4, :engine :big} ]`. 

Notice how `#!clj car1` is unchanged, even though we did an `#!clj assoc` into `#!clj car1` . Same with XXXXXXXXX

When you are used to imperative, in-place modification of data, it can initially be mysterfying as to how you can achieve anything. Rest assured, you can. 

More experiments. If we evaluate this:
```cljs
(assoc (assoc score :c 3) :d 4)
```
there will be three revisions of a hashmap. The original one bound to  `#!clj score` which is  `#!clj {:a 1 :b 2}`. Then there's the one which results from `#!clj (assoc score :c 3)`. And then there is the final one `#!clj {:a 1 :b 2 :c 3 :d 4}`. 

If you are new to Immutable Data, you probably have two concerns:

  1. Surely this is inefficient?  Don't worry, via clever algorithms, efficiency is seldom an issue.
  2. How do you get anything done? (Don't worry, there are answers here too). 

Using Immutable data dovetails with pure functions, to reduce cognitive load and bring a great simplicity to your programming. 

All grand claims. We'll need to see how this plays out in bigger programs. 

Evaluate the following: 
```clj
(let [car1   {:doors 2}                 ;; original hashmap
      car2   (assoc car1 :doors 4)      ;; new value for :doors 
      car3   (assoc car2 :doors 2)]     ;; back to the original value of 2
  [(= car1 car3) (identical? car1 car3)])   ;; identical? tests if two pieces of data at the same piece
```

Evaluate the following: 
```clj
(let [car1   {:doors 2}                 ;; this hashmap can't be changed
      car2   (assoc car1 :doors 2)]     ;; wait on, same values!!! 
  (identical? car1 car2))               ;; identical? tests if two pieces of data at the same
```

XXX boolean and and or ???  https://j19sch.github.io/blog/clj3-and-or-being-weird/

XXX destructuring ??  Later

XXX interop ?? Mention ??

XXX Reagent like code  ?? Next tutorial 

XXX atoms and deref - defer this to later

XXX tracking is reified dynamics. residential 


; short-hand for creating a simple function:
; #(...) => (fn [args] (...))

#(* 3 %)         ; => (fn [x] (* 3 x))

#(* 3 (+ %1 %2)) ; => (fn [x y] (* 3 (+ x y)))

## Summary 

We have learned:

  - in ClojureScript we evaulate data, to create new data
  - virtually all data literals evaluate to themselves
  - 

We've looked at ClojureScript through a lens which makes it easier to understand Reagent and re-frame. 

## Installing 


To install Clojure and Leiningen (a build tool) following [these instructions](https://purelyfunctional.tv/guide/how-to-install-clojure/). 


Here's a good intro on writing a function:
https://blog.cleancoder.com/uncle-bob/2020/04/09/ALittleMoreClojure.html

Gently paced video series showing you ClojureScript coding/tooling from the basics up: 
https://www.youtube.com/watch?v=SljDPNwAFOc&list=PLaGDS2KB3-ArG0WqAytE9GsZgrM-USsZA

The cheatsheet: 
https://clojure.org/api/cheatsheet

A visual overview of the similarities and differences between ClojureScript and JavaScript
https://www.freecodecamp.org/news/here-is-a-quick-overview-of-the-similarities-and-differences-between-clojurescript-and-javascript-c5bd51c5c007/

We haven't covered:

  - macros - write functions which take your code/data and manipulate it at compile time.
  - JavaScript interop. `(js/console.log "Hello World!")`
  - 
