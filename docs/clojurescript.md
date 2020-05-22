---
klipse: true
---

Are you new to ClojureScript? Do you need a fast primer?

This page will teach you how to *read*  Clojure in in XXX minutes. 
Learning to _write_ Clojure code will take more time, but probably still less than you think.

ClojureScript is a modern Lisp. Alan Kay once descibed Lisp as "Maxwell's equations of software".
Paul Graham has written on how Lisp was a competitive advantage for his startup. For 50 years, 
the finest minds in computer scinece have
refined and polished it. 

## Simple Data Literals


|   Type       |   Example                           |   Comment            |  
|--------------|-------------------------------------|----------------------|
| character    | `#!clj \a`                          | The letter `a`       |  
| number       | `#!clj 1`                           |                      |  
| number       | `#!clj 3.14`                        |                      |  
| string       | `#!clj "hello"`                     |                      |  
| nil          | `#!clj nil`                         | null, None           |      


## Collection Data Literals


|   Type       |   Example                           |   Comment            |   
|--------------|-------------------------------------|----------------------|
| list         | `#!clj (1 2)`                       | Can be heterogeneous.<br>Empty list is `#!clj ()`<br>No commas necessary.  |  
| vector       | `#!clj [1 2 3]`                     | No commas necessary.<br>Empty vector is `#!clj []`| 
| vector       | `#!clj [1 "hello" \x nil]`          | Can be heterogeneous. | 
| map          | `#!clj {1 "Hello"}`                 | A dictionary, or an associative array.| 
| map          | `#!clj {1 "Hello" 2 nil}`           | No delimiter necessary between pairs.| 
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
| symbol   | `#!clj odd?`            | The symbol `#!clj odd?` is also bound to a builtin function. Names in Clojure can include characters which, in other languages, are reserved for operators | 
| symbol   | `#!clj yours`           | You'll soon see how to create your own symbols and bind them to values |


## That's It For Syntax

We've now covered almost all of Clojure's syntax. Now we know enough to talk about "evaluation". 


## Next, Evaluation 

We will now explore how data is evaluated. This is probably an unfamiliar concept for you, right?  Evaluating data? What?

Well,  **in ClojureScript we evaulate data, to create new data.** Dwell on that thought for a minute, it is quite central.

All data litterals other than `lists` and `symbols` evaluate to themselves. So that's really easy. 

|  Value                |   Evaluates To                    |  Comment    |
|-----------------------|-----------------------------------|-------------|
| `#!clj \a`            | `#!clj \a`                        |  Same       |        
| `#!clj 1`             | `#!clj 1`                         |  Same       |
| `#!clj [1 1]`         | `#!clj [1 1]`                     |  Same       |
| `#!clj {1 1 2 2 }`    | `#!clj {1 1 2 2 }`                |  Same       |


Try it for yourself. Enter an expression into the editor and it will be evaluated. The result will be shown in the box below.



## Evaluating Symbols 

Symbols don't evaluate to themselves. Instead, they evaluate to the value they are bound to. (More on how symbols get bound to values very soon)

|  Expression     |   Evaluates To               |  Comments                                     |
|-----------------|------------------------------|-----------------------------------------------|
| `#!clj foo`     | `#!clj 4`                    | Assuming  the symbol `#!clj foo` is bound to the value  `#!clj 4` |         
| `#!clj bar`     | `#!clj [1 2 3]`              | Assuming  the symbol `#!clj bar` is bound to the value  `#!clj [1 2 3]`   |             
| `#!clj [1 foo]` | `#!clj [1 4]`                | Each element is evaluated, and  `#!clj foo` evaluated to  `#!clj 4` |
| `#!clj [foo bar]` | `#!clj [4 [1 2 3]]`        |                                               |


## Evaluating Lists

The evaluation of lists is very important to understand.

Lists evaluate to the return value of a function call, where:

  - the 1st element of the list is assumed to be a function
  - the other elements in the list are assumed to be the actual arguments for the function call
  - the function is called with the arguments
  - the return value of that function is the final evaluation of the list


|  List                   |   Evaluates To         |  Comments                                              |
|-------------------------|------------------------|--------------------------------------------------------|
| `#!clj (inc 3)`         | `#!clj 4`              | First, evaluate each element of the list (there are two):<br>&nbsp;&nbsp;• the symbol  `#!clj inc` evaluates to a builtin function<br>&nbsp;&nbsp;• and `#!clj 3` evaluates to `#!clj 3`<br>Now, we evaluate the list itself which means calling the function<br>with the argument. Which is the value `#!clj 4`         | 
| `#!clj [3 (inc 3)]`     | `#!clj [3 4]`          |                                                        |        
| `#!clj (+ 1 2)`         | `#!clj 3`              | The symbol `#!clj +` is bound to a builin function.<br>And that function adds together its arguments |      
| `#!clj (+ 1 2 3)`       | `#!clj 6`              | Surprise! Turns out this  `#!clj +`  function can handle a variable<br>number of arguments.          |       
| `#!clj [1 (+ 1 2 3)]`   | `#!clj [1 6]`          |                                                        |

!!! Note "No operators" 
    In Clojure, `#!clj +` is a builtin synbol bound to a function. Not an operator. <br>
    Same with `#!clj -`,  `#!clj /` ,  `#!clj >`,  `#!clj =`, etc. <br>
    Because there are no operators, there's no operator precidence to worry about.

Occasionally, you just want a list to evaluate to a list, and not a function call

|   List          |   Evaluates To         |  Comments                                     |
|-------------------------|------------------------|-----------------------------------------------|
| `#!clj (1 1)`           |                        | Error!<br>To evaluate a list as a function call, the 1st element must be a<br>function.But here it is a number.  |
| `#!clj '(1 1)`          | `#!clj (1 1)`          | No function call happens.<br>That leading quote character says to ***not*** evaluate the list as<br>a function call and to instead just let the list evaluate to itself<br>(like other data literals do).  |
| `#!clj (list 1 1)`      | `#!clj (1 1)`          | The builtin function `#!clj list` will make a list from its arguments  |

Exercises: 

  - is `(+ 1)` an error? How about `(+)` or `(*)`?
  - try `(odd? 5)` 

---
## Forms

A list like this`#!clj (+ 1 2)` is known as **a form**. 

**Forms can be nested**.  When they are, evaluation of form elements will involves evaluating child forms. 

|  Nested Forms          |   Evaluates To         |  Comments                                     |
|------------------------|------------------------|-----------------------------------------------|
| `#!clj (+ 3 (inc 1))`  | `#!clj 5`              | Evaluation trace:<br>&nbsp;&nbsp;• `#!clj +` is evaluated to a function.<br>&nbsp;&nbsp;• `#!clj 3` is evaluated to `#!clj 3`<br>&nbsp;&nbsp;• `#!clj inc` is evaluated to a function.<br>&nbsp;&nbsp;• `#!clj 1` is evaluated to `#!clj 1`<br>&nbsp;&nbsp;• `#!clj (inc 1)` is evaluated as a function call which returns `#!clj 2`<br>&nbsp;&nbsp;• `#!clj (+ 3 2)` is evaluated as a function call which returns `#!clj 5`   |            
| `#!clj (= 2 (inc 1))`  | `#!clj true`           | `#!clj =` is a symbol too. Also bound to a builtin function<br> |          


Try:

  - `#!clj (inc (dec 1))`
  - `#!clj (odd? (inc (dec 1)))`
  - `#!clj (= (inc (dec 1)) 1)`

---
## Keywords

Keywords are like symbols, excecpt they evaluate to themselves and not to a bound value. This makes them like most other data litterals.

Keywords are invaluable as `identities` (eg. keys in maps) and they are used very widely. 

A keyword is a name that starts with a colon.


|  Value                  |   Evaluates To               |  Comments                                       |
|-------------------------|------------------------------|-------------------------------------------------|
| `#!clj :foo`            | `#!clj :foo`                 | It evaluates to itself.                         |  
| `#!clj :bar`            | `#!clj :bar`                 | It evaluates to itself                          |  
| `#!clj (= + :+)`        | `#!clj false`                | Is not the same as `#!clj +`, which is a symbol which evaluates<br>to a builtin function |  
| `#!clj (= :bar :bar)`   | `#!clj true`                 | An important quality. Different instances evaluate to<br>equal. Like numbers do, and strings.| 
| `#!clj (= :bar :foo)`   | `#!clj false`                |                                                 | 
| `#!clj [1 2 :bar]`      | `#!clj [1 2 :bar]`           | Evaluates like a data litteral                  | 
| `#!clj {1 :bar}`        | `#!clj {1 :bar}`             |                                                 | 


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
## Special Forms

Some `Forms` are special, and each is special in its own way. Let's review the important ones.

## `#!clj if`

`#!clj if` forms get special treatment. 

The code `#!clj (if true 4 3)` is a four element list. Normal evaluation rules
would mean evaluating all four elements of the list and then calling the `#!clj if` function with three arguments.  

Except that isn't what happens. `#!clj if` forms are special, and not all elements are evaluated. The 1st `test` element is evaluated and then either the 3rd or the 4th argument
is evaluated depending on the result of that `test`. To put that the other way, one of the 3rd or 4th elements will ***not*** be evaluated. 



|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (if true 4 3)`      |  `#!clj 4`                  |  Only  `#!clj true` and  `#!clj 4` elements are evaluated<br>The `#!clj 3` element is not evaluated |
|   `#!clj (if false 4 3)`     |  `#!clj 3`                  |  Only `false` and `3` elements are evaluated |
|   `#!clj (if false 4)`       |  `#!clj nil`                |  `else` form not provided for evaluation, so<br>the `#!clj if` evaluates to `#!clj nil` |
|   `#!clj (if (odd? 3) 3 4)`  |  `#!clj 3`                  |  `#!clj (odd? 3)` evaluates to  `#!clj true`             |
|   `#!clj (= 4 (inc 3))`      |  `#!clj true`               |   |
|   `#!clj (if (= 4 (inc 3)) :t :f)`  |  `#!clj :t`   |   |
|   `#!clj [1 (if true 4)]`    |  `#!clj [1 4]`              |   |
|   `#!clj {1 (if false 4)}`   |  `#!clj {1 nil}`            |   |


Exercises: 

  - check if `(if true)` is valid. 
  - what is `(if "hello" true false)` or `(if [] true false)` or `(if nil true false)`
  -  `#!clj when` is an alternative to  `#!clj if` when there is no `else` part. Try it out.

---
## `#!clj fn`

Evaluating an `#!clj fn` form creates an function.

Here is a very simple example `#!clj (fn [x] x)`:

  - as you can see, an `#!clj fn` form has two elements:
    - a vector of symbols - in this case `#!clj [x]`
    - a `body` -  in this case `#!clj x`

  - an `#!clj fn` form is "special" because these two elements are not `evaluated`. 
  - it is only, later, when this function is called  that `body` will be evaluated
  - and, when that evaluation happens, `body` can refer to symbols in the vector, which will be bound to the actual argument values of the function call
  - our simple example function above only takes one argument `#!clj [x]` 
  - and when the body is evaluated, the symbol `#!clj x` will evaluate to whatever `#!clj x` is bound to (that's what symbols do, afterall) and that will be the actual argument
  - the function will return the evaluation of the `body`, which, in the case above, is the value of the argument supplied. 
  - consequently, if we called this function with the argument `#!clj 3`, this function would return `#!clj 3`
  - also, if we called this function with the argument `#!clj [:a :b]`, it would return `#!clj [:a :b]`

Q: how do we call this function?

A: Just like we call all functions. Place it as the 1st element of a form. Add a 2nd element in the list, which is the actual argument. And then evaluate this list. That's how function calls always happen. So, like this:
```clj
; a line which starts with a semi-colon is a comment

; The following is a two element list:
;   - the 1st element is a function created by an `fn` form
;   - the 2nd element is "the actual arg"  
((fn [x] x) "the actual arg")
```
The function is called with one actual argument: `#!clj "the actual arg"`. And the form will evaluate to `#!clj "the actual arg"`.

```clj
((fn [x] x) [:a :b])
```
The function is called with one argument `#!clj [:a :b]`. And the form will evaluate to `#!clj [:a :b]`.

How about we create another fucntion: `#!clj (fn [val] (+ val 1))`.  The symbol for the actual argument is now `#!clj val`. So that's different. And the body is now the form `#!clj (+ val 1)`. 

What if we evaluated it like this:
```clj
((fn [val] (+ val 1)) 4)
```


Try It:
```clj
((fn []))
```

```cljs
((fn [x] [x x]) 4)
```
or
```cljs
((fn [x] {:a x}) 4)
```
or


```cljs
((fn [yes?] {:a (if yes? "yes")}) true)
```
what if we called this function with `#!clj false`.


---
## `#!clj def`

The `#!clj def` form creates a symbol and binds a value to it. **Finally**, we get to create out own symbols!!

Example use:
```clj
(def gurus 2)
```
This defines the symbol `#!clj gurus` and binds it to the value `#!clj 2`. If, later, you were use this symbol in other code, it would evaluate to `#!clj 2`.

`#!clj def` is a "special form" on two counts:

  - when evaluated, it adds to the global set of defined symbols and such mutation is known as a side-effect.
Functions don't normally cause side effect - they are normally pure.
  - in a normal form for some `f`, like this `#!clj (f gurus 2)`, the `#!clj gurus` element would be evaluated. But not with a `#!clj def` form. It is, instead, the new symbol to define.



```clj
(def skeptics (inc gurus))    ;; using the symbol `gurus` !!
```
Now  `#!clj skeptics` is a defined symbol and it is bound to the evaluation of  `#!clj (inc gurus)` which is the value `#!clj 3`. 

Consider these two:
```clj
(def beach-list [:hat :sunglasses :towel])
(def beach-items (count beach-list))     ;; count is a builtin function
```
Now  `#!clj beach-items` is a defined symbol and it is bound to `#!clj 3`

Now, let's take this further and bind a function to a symbol:
```clj
(def my-inc (fn [val] (+ val 1))
```
We're creating a function via  `#!clj fn`, and we are binding to a symbol using  `#!clj def`. Two steps. Using that combination, we've created something similar to the builtin `#!clj inc`.
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
(square-it 3)
```
The value bound to  `#!clj square-it` (a function) will be called with the argument  `#!clj 3`, which evaluates to the value `#!clj 9` 



---
## `#!clj defn` 

Combining `#!clj def` and `#!clj fn` is clumsy. So there is 
a simpler, one form method called `#!clj defn`. It is special in all the same ways that `#!clj fn`  and `#!clj def` are special. 

It is used like this:
```clj
(defn dec      ; `dec` is the symbol being defined
  [val]        ; a vector of symbols for the actual arguments 
  (- val 1))   ; function body - is evaluated when function is called - uses `val`
```
This could have been done on one line, but we're now starting to format our code correctly. 2 space indents. 

Used like this:
```clj
(dec 4) 
```
evaluates to `#!clj 3`

Define another:
```clj
(defn square-it  ; `square-it` is the symbol being defined
  [x]            ; a vector of symbols for the actual arguments 
  (* x x))       ; function body - is evaluated when function is called - uses `x`
```
This binds the symbol `#!clj square-it` to a function. 

Use the symbol in a form:
```clj
(square-it 3)
```
which will evaluates to `#!clj 9`. 

Or I could call it like this:
```clj
(square-it (inc 3))
```
which evaluates to `#!clj 16` .

Define another: 
```clj
(defn greet
  [username]
  (str "Hello " username))) 
```
`#!clj str` is a builtin function which turns each of its arguments into a string and concatenates them. 

I can call `#!clj greet` like this: 
```clj
(greet "world")   
```
which will evaluate to `#!clj "Hello world"`.


As you can imagine, in a functional language, creating functions is a big deal. You'll be using `#!clj defn` a lot. 



---
## `#!clj let` 

`#!clj let` allows you to create a form with `bindings` and a `body` 

```clj
; let bindings are represented as pairs within a vector
; In this case, only one pair. The symbol `a` is bound to "pen"
(let [a "pen"]   
  a)          ; the evaluation of a `let` form is the evaluation of the body 
```
This `#!clj let` form evaluates to `#!clj "pen"` 

Another variation:
```clj
(let [a "pen"]   
  :other)         ; oops not even using the bound sysmbol `a`
```
This `#!clj let` form evaluates to `#!clj :other` 

Notice the way a `#!clj let` form  is formatted (two space indents)
```clj
(let [a  "pen"         ; this pair means `a` is bound to "pen" 
      b  "sword"]      ; this pair means `b` is bound to "sword"
  (> a b))             ; is "pen" greater than "sword" ??
```
evaluates to `#!clj false`. Wait, what? That isn't in the story I was told.

We need to make some changes:
```clj
(let [a  "a pen"
      b  "the sword"]   
  (if (> a b) a b)) 
```
evaluates to `#!clj "a pen"`. Phew! Thank goodness for cheep lexograpic hacks which confirm wisdom.

```clj
(let [a  "pen"
      b  "sword"]   
  {:winner (if (> a b) a b)}) 
```
evaluates to `#!clj {:winner "sword"}`

Often, a `#!clj let` is used within a `#!clj defn` like this:
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


## That's It For Forms And Special Forms

We've just reviewed how to compute in Clojure. We execute data, to produce new data. 

## BuiltIn Functions 

Clojure's provides a substantial library of biltin functions. 
To write Clojure well, you'll have to master this library, but that takes time.

But in the meantime, to read the Reagent and re-frame tutorials, there's a couple of functions which are essential.


Along the way, we have introduced a few builtin functions but there are a couple which are used all the time. And we'll need to understand them. 

## `#!clj assoc` 

`#!clj assoc`  allows you to add a key/value pair to a map. 


|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (assoc {} :a 4)`    |  `#!clj {:a 4}`             |  adding a pair to an empty map `#!clj {}`     | 
|   `#!clj (assoc nil :a 4)`   |  `#!clj {:a 4}`             |  `#!clj nil` is treated as `#!clj {}`         | 
|   `#!clj (assoc {:b 1} :a 4)` |  `#!clj {:b 1 :a 4}`       |                                               | 
|   `#!clj (assoc {} :b 1 :a 4)` |  `#!clj {:b 1 :a 4}`       |   add two a pairs                                            | 

`#!clj dissoc` allows you to remove a key/value.

## `#!clj map` 


|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
| `#!clj (map inc [1 2 3])`    |  `#!clj (2 3 4)`        |  applies  `#!clj inc` to each element<br>Like `#!clj [(inc 1) (inc 2) (inc 3)]` except result is  up with a list    | 
| `#!clj (map + [1 2 3] [4 5 6])` | `#!clj (5 7 9)`          |  applies  `#!clj +` to pairs of elements<br>Like `#!clj [(+ 1 4) (+ 2 5) (+ 3 6)]`, except result is a list


## `#!clj reduce`



XXX conj, assoc, map ,reduce, filter, old? 


## Immutable Data



XXX boolean and and or ???  https://j19sch.github.io/blog/clj3-and-or-being-weird/

XXX destructuring ??

XXX arrow functions 

XXX interop 

XXX Reagent like code

XXX Immutable 
XXX atoms and deref 


; short-hand for creating a simple function:
; #(...) => (fn [args] (...))

#(* 3 %)         ; => (fn [x] (* 3 x))

#(* 3 (+ %1 %2)) ; => (fn [x y] (* 3 (+ x y)))

## Installing 


To install Clojure and Leiningen (a build tool) following [these instructions](https://purelyfunctional.tv/guide/how-to-install-clojure/). 


Here's a good intro on writing a fucntion:
https://blog.cleancoder.com/uncle-bob/2020/04/09/ALittleMoreClojure.html

The cheatsheet: 
https://clojure.org/api/cheatsheet

We haven't covered:

  - macros 
  - (js/console.log "Hello World!")