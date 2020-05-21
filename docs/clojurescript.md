---
klipse: true
---

Are you new to ClojureScript? Do you need a fast primer?

This page will teach you how to *read*  Clojure in in 9 minutes. 
Learning to _write_ Clojure code will take more time, but probably still less than you think.

ClojureScript is a modern Lisp. Alan Kay once descibed Lisp as "Maxwell's equations of software".
Paul Graham has written on how Lisp was a competitive advantage for his startup. For 50 years, 
the finest minds in computer scinece have
refined and polished it. Maybe there's something to it for you too?

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



## Evaluation 

Now we know enough to talk about "evaluation". 

Let's start exploring how data is evaluated. This is probably an unfamiliar concept for you, right?  Evaluating data. Well,  **in ClojureScript we evaulate data, to create new data.** Dwell on that thought for a minute, it is quite pivotal.

All data litterals other than `lists` and `symbols` evaluate to themselves. So that's really easy. 

|  Value                |   Evaluates To                    |  Comment    |
|-----------------------|-----------------------------------|-------------|
| `#!clj \a`            | `#!clj \a`                        |  Same       |        
| `#!clj 1`             | `#!clj 1`                         |  Same       |
| `#!clj [1 1]`         | `#!clj [1 1]`                     |  Same       |
| `#!clj {1 1 2 2 }`    | `#!clj {1 1 2 2 }`                |  Same       |


Try it for yourself. Enter an expression into the editor and it will be evaluated. The result will be shown in the box below.



## Evaluating Symbols 

Symbols don't evaluate to themselves. Instead, they evaluate to the value they are bound to.

|  Expression     |   Evaluates To               |  Comments                                     |
|-----------------|------------------------------|-----------------------------------------------|
| `#!clj foo`     | `#!clj 4`                    | Assuming  the symbol `#!clj foo` is bound to the value  `#!clj 4` |         
| `#!clj bar`     | `#!clj [1 2 3]`              | Assuming  the symbol `#!clj bar` is bound to the value  `#!clj [1 2 3]`   |             
| `#!clj [1 foo]` | `#!clj [1 4]`                |                                               |
| `#!clj [foo bar]` | `#!clj [4 [1 2 3]]`        |                                               |


## Evaluating Lists

The evaluation of lists is really important to understand.

Lists evaluate to the return value of a function call:

  - the 1st element of the list is assumed to be a function
  - the other elements in the list are assumed to be the arguments for the function call
  - the function is called with the arguments
  - the return value of that function is the final evaluation of the list


|  Includes List          |   Evaluates To         |  Comments                                     |
|-------------------------|------------------------|-----------------------------------------------|
| `#!clj (inc 3)`         | `#!clj 4`              | First, evaluate each element of the list (there are two):<br>&nbsp;&nbsp;• the symbol  `#!clj inc` evaluates to a builtin function<br>&nbsp;&nbsp;• and `#!clj 3` evaluates to `#!clj 3`<br>Now, we evaluate the list itself which means calling the function<br>with the argument. Which is the value `#!clj 4`                  | 
| `#!clj [3 (inc 3)]`     | `#!clj [3 4]`          |                                                                     |        
| `#!clj (+ 1 2)`         | `#!clj 3`              | `#!clj +` is a symbol which evaluates to a function.<br>And that function adds together its arguments |      
| `#!clj (+ 1 2 3)`       | `#!clj 6`              | Surprise! Turns out this  `#!clj +`  function can handle a variable<br>number of arguments.  |       
| `#!clj [1 (+ 1 2 3)]`   | `#!clj [1 6]`          |                                                                      |


Sometimes you just want a list to be a list, and not a function call

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

**Forms can be nested**.  When they are, evaluation of form arguments often involves evaluating child forms first. 

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

Keywords are like symbols excecpt they evaluate to themselves and not to some bound value. This makes them like most other data litterals.

Keywords are invaluable as `identities` (eg. keys in maps) and they are used very widely. 

A keyword is a name that starts with a colon.


|  Value                  |   Evaluates To               |  Comments                                       |
|-------------------------|------------------------------|-------------------------------------------------|
| `#!clj :foo`            | `#!clj :foo`                 | It evaluates to itself.                         |  
| `#!clj :bar`            | `#!clj :bar`                 | It evaluates to itself                          |  
| `#!clj (= + :+)`        | `#!clj false`                | Is not the same as `#!clj +`, which is a symbol |  
| `#!clj (= :bar :bar)`   | `#!clj true`                 | An important quality. Different instances evaluate to<br>equal. Like numbers do. Or strings.| 
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


To give you a taste of where this is heading, here they are used as the keys in a map:
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

Some `Forms` are special, and each of them is special in its own way. We'll now review the important ones.

## `#!clj if` 

`#!clj if` forms get special treatment. 

The code `#!clj (if true 4 3)` is a four element list. And normal evaluation 
would mean evaluating all four elements of the list and then calling the `#!clj if` function with three arguments.  

Except that `#!clj if` forms are special because
not all the arguments are evaluated. The 1st `test` argument is evaluated and then either the 3rd or the 4th argument
is evaluated depending on the result of that `test`. To put that the other way, one of the 3rd or 4th argument will ***not*** be evaluated and it is that feature which makes `#!clj if` special. 



|   Example                    |  Evaluates To               |  Comments                                     |
|------------------------------|-----------------------------|-----------------------------------------------|
|   `#!clj (if true 4 3)`      |  `#!clj 4`                  |  Only `true` and `4` arguments are evaluated  |
|   `#!clj (if false 4 3)`     |  `#!clj 3`                  |  Only `false` and `3` arguments are evaluated |
|   `#!clj (if false 4)`       |  `#!clj nil`                |  `else` form not provided for evaluation, so<br> evaluates to `#!clj nil` |
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

Here is a very simple example: `#!clj (fn [x] x)`.

  - as you can see, a `#!clj fn` form has two elements:
    - a vector of symbols - in this case `#!clj [x]`
    - a `body` -  in this case `#!clj x`

  - an `#!clj fn` form is "special" because these two elements are not `evaluated` (as happens with normal forms). 
  - it is only when this function is called that  `body` will be evaluated
  - and, when that evaluation happens, `body` can refer to the symbols in the vector, which will be bound to the actual argument values of the function call
  - Our simple example function above only takes one argument `#!clj [x]` 
  - and, if the body `#!clj x` is evaluated, it will evaluate to whatever  `#!clj x` is bound to (that's what symbols do) and that will be the actual argument. 
  - the function will return the evaluation of the `body`, which, in the case above, is the value of the argument supplied. 
  - consequently, if we called this function with one agument `#!clj 3`, this function would return `#!clj 3`
  - and if we called this function with one argument `#!clj [:a :b]`, this function would return `#!clj [:a :b]`

Q: how do we call this function?

A: Just like we call all functions. Place it as the 1st element of a form. Provide one other element in the list, which is the actual argument. And then evaluate the list. That's how function calls always happen. So, like this:
```clj
;; This is a two element list:
;;   - the 1st element is a function created via `fn`
;;   - the 2nd element is "a value"
((fn [x] x) "a value")
```
The function is called with one actual argument `#!clj "a value"`. The entire form will evaluate to `#!clj "a value"`.

```clj
((fn [x] x) [:a :b])
```
The function is called with one actual argument `#!clj [:a :b]`. The entire form will evaluate to `#!clj [:a :b]`.

Here is another simple example: `#!clj (fn [val] (inc val))`.  The symbol for the actual argument is now `#!clj val`. So that's different. And the body is now `#!clj (inc val)`. 

What if we evaluated it like this:
```clj
((fn [val] (inc val)) 4)
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
((fn [val] (+ val 1)) 3)
```
or
```cljs
((fn [include?] {:a (if include? "included" "not included")}) true)
```
Wide code like this is hard to read. We'd formally split the code normally split it over a few lines.



---
## `#!clj def`

The `def` form creates a symbol and binds a value to it. **Finally**, we get to create out own symbols!!

This form is "special"
because it adds to the global set of defined symbols and that alteration is a side-effect.
Functions don't normally cause side effect - they are normally pure.

```clj
(def gurus 2)
```
Now  `#!clj gurus` is a defined symbol. And it is bound to the value `#!clj 2`. If I use this symbol in other code, it will evaluate to `#!clj 2`.

```clj
(def skeptics (inc gurus))    ;; using the symbol `gurus` !!
```
Now  `#!clj skeptics` is a defined symbol and it is bound to the value `#!clj 3`. 

Consider:
```clj
(def beach-list [:hat :sunglasses :towel])
(def beach-items (count beach-list))     ;; count is a builtin function
```
Now  `#!clj beach-items` is a defined symbol and it is bound to `#!clj 3`

Let's now bind a function to a symbol:
```clj
(def square-it (fn [x] (* x x)))
```
We can use this symbol `#!clj square-it` as the 1st element in a list (it is now bound to a function), like this:
```clj
(square-it 3)
```
The value bound to  `#!clj square-it` (a function) will be called with the argument  `#!clj 3` which evaluates to the value `#!clj 9` 



---
## `#!clj defn` 

Instead of combining `#!clj def` and `#!clj fn`, there is 
a simpler, one form method: `#!clj defn`. It is unusal in the same way that `#!clj def` is unusual: it causes side effects (adds the symbol to the execution context). 

Used like this:
```clj
(defn square-it  ;; function symbol (name)
  [x]            ;; args 
  (* x x))       ;; function body
```
This binds the symbol `#!clj sqr` to a function. This could been done on one line, but we're now starting to format our code correctly. 2 space indents. 

As before, you can now call the function using the symbol.
```clj
(square-it 3)
```
which evaluates to `#!clj 9`. 

Or I could call it like this:
```clj
(square-it (inc 3))
```
which evaluates to `#!clj 16` .

Define another function using `#!clj defn`: 
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
;; let bindings are represented as pairs within a vector
;; In this case, only one pair. The symbol `a` is bound to "pen"
(let [a "pen"]   
  a)          ;; the evaluation of a `let` form is the evaluation of the body 
              ;; here the body evaluates to "pen"
```
evaluates to `#!clj "pen"` 

```clj
(let [a "pen"]   
  :other)         ;; oops not even using the bound sysmbol `a`
```
evaluates to `#!clj :other` 

Noitce the way this is formatted (two space indents)
```clj
(let [a  "pen"         ;; this pair means `a` is bound to "pen" 
      b  "sword"]      ;; this pair means `b` is bound to "sword"
  (> a b))             ;; is "pen" greater than "sword" ??
```
evaluates to `#!clj false` (wait, what? That isn't in the story I was told.)

```clj
(let [a  "pen"
      b  "sword"]   
  (if (> a b) a b)) 
```
evaluates to `#!clj "sword"`

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



## BuiltIn Functions 

So that's it for syntax and special forms. 

Along the way, we have introduced a few builtin functions but there are a couple which are used all the time. And we'll need to understand them. 

## assoc

`#!clj assoc` 

## map 

`#!clj map`


## reduce

`#!clj reduce`

XXX conj, assoc, map ,reduce, filter, old? 


## Immutable Data



XXX boolean and and or ???  https://j19sch.github.io/blog/clj3-and-or-being-weird/

XXX destructuring ??

XXX arrow functions 

XXX interop 

XXX Reagent like code


## Installing 


To install Clojure and Leiningen (a build tool) following [these instructions](https://purelyfunctional.tv/guide/how-to-install-clojure/). 


