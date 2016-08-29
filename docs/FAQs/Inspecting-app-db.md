
## Question

How can I inspect the contents of `app-db`?  Perhaps from figwheel.

## Short Answer

If at a REPL, inspect:  `re-frame.db/app-db`.  

If at the js console, that's `window.re_frame.db.app_db.state`.

You are [using clj-devtools](https://github.com/binaryage/cljs-devtools), right? 
If not, stop everything and immediately make that happen. 

## Better Answer

Are you sure you need to?  

First, you seldom want to inspect all of `app-db`. 
And, second, inspecting via figwheel will be clumsy. 

Instead, you probably want to inspect a part of `app-db`. And you probably want 
to inspect it in the GUI itself.

Here is a useful technique from @escherize. Add something like this to 
the hiccup of your view ...
```clj
[:pre (with-out-str (pprint @interesting))] 
```
This assumes that `@interesting` is the value (ratom or subscription) you want to observe (note the @ in front).

`pprint` output is nice to read, but not compact. For a more compact view, do this: 
```clj
[:pre (pr-str @some-atom)]      ;; using pr-str instead of pprint
```

If you choose to use `pprint` then you'll need to `require` it in at the top of your view.cljs:
```clj
[cljs.pprint :refer [pprint]]
```

@yogthos' [excellent json-html library](https://github.com/yogthos/json-html) has an 
even slicker presentation (at the expense of more screen real estate, and the 
need to include specific CSS).

Finally, combining the short and long answers, you could even do this:
```clj
[:pre (with-out-str (pprint @re-frame.db/app-db))]    ;; see everything!
```
or 
```clj
[:pre (with-out-str (pprint (:part @re-frame.db/app-db)))]    ;; see a part of it!
```

You definitely have [clj-devtools](https://github.com/binaryage/cljs-devtools) installed now, right?


Up:  [FAQ Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
