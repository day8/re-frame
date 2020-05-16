
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

I use logging method X, how can I make re-frame use my method? 

## Answer

re-frame makes use of the logging functions: `warn`, `log`, `error`, `group` and `groupEnd`.  

By default, these functions map directly to the js/console equivalents, but you can 
override that by providing your own set or subset of these functions using 
`re-frame.core/set-loggers!` like this:
```clj
(defn my-warn
   [& args]      
   (post-warning-somewhere (apply str args)))

(defn my-log
   [& args]
   (write-to-datadog (apply str args)))

(re-frame.core/set-loggers!  {:warn  my-warn   
                              :log   my-log 
                              ...})
```
