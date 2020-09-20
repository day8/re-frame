
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question


My input field is laggy.  When the user types quickly, it is dropping characters.  I have implemented it like this:

```clj
  [:input
    {:type "text"
     :value @(rf/subscribe [::subs/username])
     :on-change #(rf/dispatch [::events/change-username (-> % .-target .-value)])}]
```

## Answer 

That `on-change` handler is being called after the user types every character.  If the user is typing very quickly, then the following race condition can occur:

  1. The user types a new character taking the field from `state A` to `state B`  (`B` has one new, extra character in it, compared to `state A`) 
  2. The change event for `state B` is dispatched by `on-change`. And that event is queued for processing. 
  3. But before that event can be processed, the browser schedules an animation frame. 
  4. In that animation frame the component is re-rendered
  5. But during that re-render the `subscribe` will deliver `state A`
  6. That means the text in the box will revert from `state B` to `state A` (the character just typed won't be in the input)
  7. Now if nothing happened till the next animation frame the situation would resolve itself. Because `state B` would be rendered next time because the event which included the 
  new character would have been processed well before then. 
  6. BUT if the user immediately types another character, the state dispatched will be `State A + new character`. The prevous character typed, 
     which caused A -> B, is now lost. 

Bottom line: with very fast typing, characters can get dropped just before animation-frames.

There are three solutions:

  1. don't use `on-change`, and instead use `on-blur` which is only called when the user has done all their fast typing and they leave the field. 
  2. if you have to use `on-change` then switch to use `dispatch-sync` in `on-change`, instead of `dispatch`. The event will not be placed on the queue. It will be handled immediately. Sychonously. 
  3. use a component from something like re-com because it has been engineered to not have this problem. Or copy the (local state) technique it uses. 

