<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

**_This FAQ item isn't finished yet. Don't read it._**

## Question

What is current best practice?

## Answer

No shortcuts here. You'll need to:
  1. Read the re-frame docs.
  2. Inspect example projects like this [RealWorld example](https://github.com/jacekschae/conduit) (but see also the [Resouces doc](http://day8.github.io/re-frame/External-Resources/#examples-and-applications-using-re-frame))

Having said that, best practice has evolved over time and a list of the more recent ideas is given below.

### Add Structure to `app-db` 

`app-db` is a map which works well in many cases, but if you want more structure, consider using a library like `doxa` or `XXX`.

### Use the `:fx` effect 

Event handlers can return a map of arbitrary effects, but better practice is to return 
a map containing only two standard keys `:db` and `:fx`.  See [here](https://day8.github.io/re-frame/api-builtin-effects/#fx) and [here](http://day8.github.io/re-frame/releases/2020/#110-2020-08-24)

### Compose Event Handlers   

Where appropriate, you can compose your event handlers from many smaller functions via the use of `:fx`, which is described [here](https://github.com/day8/re-frame/issues/639#issuecomment-682250517)

### Avoid placeful Events

Originally, events were structured as a vector, like this `[:some-event-id  arg1 arg2]`.  For simple cases,
this works just fine, but it does introduce "placefulnes" which is fragile for more complex usecases, 

It is probably better practice to capture the "args" into a single map.  

`[:some-event-id  {...}]`

And then to optionally use the `unwrap` middleware on the event handlers. 

