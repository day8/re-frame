<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

With `reg-event-fx`, why can't my handler function just update the first argument (i.e. the `cofx` map) and pass it on? 

When I try, I get a warning, such as: `no handler registered for effect: :event. Ignoring.`

## Answer

Effects simply aren't coeffects.

To fix this warning, just declare a new map of effects. For instance:

```clj
(reg-event-fx ::cow-clicked
  (fn [{:keys [db] :as cofx} _]
    {:db (update db :clicks inc)}))
```

## Context

This seems like it would work, if you're used to using `reg-event-db` this way.
Such a `db` handler behaves like a reducing function:

```clj
(reg-event-db ::cow-clicked-db
  (fn [db _] (update db :clicks inc)))
```

Doing a similar thing to a coeffect map causes the warning, however, not to mention possible unintended effects:

```clj
(reg-event-fx ::cow-clicked-bad
  (fn [cofx _] (update-in cofx [:db :clicks] inc)))
```

With `reg-event-fx`, you receive a map of coeffect values, and you're expected to return a map of effect values. 
It's a coincidence that `:db` identifies both an effect *and* a coeffect.
But re-frame adds other coeffects, such as `:event`, which it does *not* consider effects.

So your handler ends up doing `(update-in {:db {:clicks 0} :event [::cow-clicked-bad] :your-other-coeffect 25} ...)`. 

There's probably no effect handler for `:event`. Hence the warning.
Coeffects which you declare, such as `your-other-coeffect`, may cause the same problem.

You might have a coeffect, similar to `:db`, which shares its name with an effect. But that's a deliberate design decision, not a default.
