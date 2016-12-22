

## Solving The CPU Hog Problem

Sometimes a handler has a lot of CPU intensive work to do, and 
getting through it will take a while. 

When a handler hogs the CPU, nothing else can happen. Browsers 
only give us one thread of execution and that CPU-hogging handler 
owns it, and it isn't giving it up. The UI will be frozen and 
there will be no processing of any other handlers (eg: `on-success` 
of POSTs), etc, etc. Nothing.

And a frozen UI is a problem.  GUI repaints are not happening. And 
user interactions are not being processed.

How are we to show progress updates like "Hey, X% completed"?  Or 
how can we handle the user clicking on that "Cancel" button trying 
to stop this long running process?

We need a means by which long running handlers can hand control
back for "other" processing every so often, while still continuing 
on with their computation.

## The re-frame Solution

__First__, all long running, CPU-hogging processes are put in event handlers.
Not in subscriptions.  Not in components. Not hard to do,
but worth establishing as a rule, right up front. 

__Second__, you must be able to break up that CPU 
work into chunks. You need a way to do part of the work, pause, 
then resume from where you left off. (More in min). 

In a perfect world, each chunk would take something like
16ms (60 fps). If you go longer, say 50ms or 100ms, it is no train 
smash, but UI responsiveness will degrade and animations, like 
busy spinners,  will get jerky. Shorter is better, but less than 
16ms delivers no added smoothness. 

__Third__, within our handler, after it completes one unit (chunk)
of work, it should not continue straight on with the next.  Instead, 
it should do a `dispatch` to itself and, in the event vector, 
include something like the following: 

  1. a flag to say the work is not finished
  2. the working state so far; and 
  3. what chunk to do next. 

## A Sketch 

Here's an `-fx` handler which counts up to some number in chunks:
```clj
(re-frame.core/reg-event-fx 
  :count-to
  (fn 
    [{db :db} [_ first-time so-far finish-at]]
    (if first-time
      ;; We are at the beginning, so:
      ;;     - modify db, causing popup of Modal saying "Working ..."
      ;;     - begin iterative dispatch. Give initial version of "so-far"
      {:dispatch [:count-to false {:counter 0} finish-at]  ;; dispatch to self
       :db (assoc db :we-are-working true)}
      (if (> (:counter so-far) finish-at)
        ;; We are finished:
        ;;  - take away the state which causes the modal to be up
        ;;  - store the result of the calculation
        {:db (-> db
                 (assoc :fruits-of-labour (:counter so-far)) ;; remember the result
                 (assoc :we-are-working false))}             ;; no more modal
        ;; Still more work to do
        ;;   - run the calculation
        ;;   - redispatch, passing in new running state
        (let [new-so-far   (update so-far :counter inc)]
          {:dispatch [:count-to false new-so-far finish-at]}))))                         
```

### Why Does A Redispatch Work?

A `dispatched` event is handled asynchronously. It is queued
and not actioned straight away. 

And here's the key: **After handling current events, re-frame yields control
to the browser**, allowing it to render any pending DOM changes, etc. After 
it is finished, the browser will hand control back to the re-frame router 
loop, which will then handle any other queued events 
which, in our case, would include the event we just dispatched to perform 
the next chunk of work. 

When the next dispatch is handled, a next chunk of work will be done, and then another
`dispatch` will happen. And so on. `dispatch` after `dispatch`. Chunk 
after chunk. In 16ms increments if we are very careful (or some small amount 
of time less than, say, 100ms). But with the browser getting a look-in after each iteration.

### Variations

As we go, the handler could be updating some value in `app-db` which indicates 
progress, and this state would then be rendered into the UI.

At a certain point, when all the work is done, the handler will likely put the
fruits of its computational labour into `app-db` and clear any flags which might, for example,
cause a modal dialog to be showing progress.  And the process would then be done.


### Cancel Button 

It is a flexible pattern.  For example, it can be tweaked to handle a "Cancel' button ...

If there was a “Cancel” button to be clicked, we might 
`(dispatch [:cancel-it])` and then have this event’s handler tweak the `app-db`
by adding `:abandonment-required` flags. When a chunk-processing-handler
next begins, it could check for this `:abandonment-required` flag, and,
if found, stop the CPU intensive process (and clear the abandonment flags).  
When the abandonment-flags
are set, the UI could show "Abandoning process ..." and thus appear responsive 
to the user's click on “Cancel”.

That's just one approach. You can adapt the pattern as necessary. 


### Further Notes

Going to this trouble is completely unnecessary if the long running 
task involves I/O (GET, POST, HTML5 database action?) because the 
browser will handle I/O in another thread and give UI activities plenty of look in. 

You only need to go to this trouble if it is your code which is 
hogging the CPU.  

## Forcing A One Off Render 

Imagine you have a process which takes, say, 5 seconds, and chunking 
is just too much effort.

You lazily decide to leave the UI unresponsive for that short period.   
Except, 
you aren't totally lazy.  If there was a button which kicked off 
this 5 second process, and the user clicks it, you’d like the UI to 
show a response. Perhaps it could show  a modal popup thing saying 
“Doing X for you”. 

At this point, you still have a small problem to solve. You want 
the UI to show your modal message before you then hog the CPU for 
5 seconds.

Updating the UI means altering `app-db`.  Remember, the UI is a 
function of the data in `app-db`. Only changes to `app-db` cause UI 
changes. 

So, to show that Modal, you’ll need to `assoc` some value into `app-db` 
and have that new value change what is rendered in your reagent components.

You might be tempted to do this: 
```clj
(re-frame.core/reg-event-db
  :process-x
  (fn
   [db event-v]
   (assoc db :processing-X  true)    ;; hog the CPU
   (do-long-process-x)))    ;; update state, so reagent components render a modal 
```

But that is just plain wrong. 
That `assoc` into `db` is not returned (and it must be for a `-db` handler).  
And, even if that did somehow work, 
then you continue hogging the thread with `do-long-process-x`.  There's no 
chance for any UI updates because the handler never gives up control. This 
handler owns the thread right through.

Ahhh, you think.  I know what to do!  I'll use that pattern I read 
about in the Wiki, and `re-dispatch` within an`-fx` handler: 
```clj
(re-frame.core/reg-event-fx
  :process-x
  (fn 
    [{db :db} event-v]
    {:dispatch  [:do-work-process-x]   ;; do processing later, give CPU back to browser.     
     :db (assoc  db  :processing-X true)})) ;; ao the modal gets rendered

(re-frame.core/reg-event-db
  :do-work-process-x
  (fn [db _]
    (do-long-process-x db)))   ;; return a new db, presumably containing work done
```

So close.  But it still won’t work. There's a little wrinkle.

That event handler for `:process-x` will indeed give back control 
to the browser. BUT, because of the way reagent works, that `assoc` on `db` 
won't trigger DOM updates until the next animation frame runs, which is 16ms away.  

So, you will be yielding control to the browser, but for next 16ms 
there won't appear to be anything to do.  And, by then, your CPU hogging 
code will have got control back, and will keep control for the next 5 
seconds. That nice little Dialog telling you the button was clicked and 
action is being taken won't show.

In these kinds of cases, where you are only going to give the UI 
**one chance to update** (not a repeated chances every few milli seconds), 
then you had better be sure the DOM is fully synced. 

To do this, you put meta data on the event being dispatched:
```clj
(re-frame.core/reg-event-fx
  :process-x
  (fn 
    [{db :db} event-v]
    {:dispatch  ^:flush-dom [:do-work-process-x]   ;; <--- NOW WITH METADATA         
     :db (assoc  db  :processing-X true)}))  ;; ao the modal gets rendered
```

Notice the `^:flush-dom` metadata on the event being dispatched.  Use 
that when you want the UI to be fully updated before the event dispatch 
is handled. 

You only need this technique when you: 

  1. want the DOM to be fully updated
  2. because you are going to hog the CPU for a while and not give it back. One chunk of work.

If you handle via multiple chunks you don't have to do this, because 
you are repeatedly handing back control to the browser/UI.  Its just 
when you are going to tie up the CPU for a one, longish chunk. 



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
