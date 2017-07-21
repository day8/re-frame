## The re-frame API

So, I have some good news and some bad news.

First, the bad news:
 1. These API docs are not auto-generated [because of this problem](/src/re_frame/core.cljc#L19-L33)
 2. There's no added nudity

Now, the good news:
  1. the re-frame API is entirely provided by the [core namespace](/src/re_frame/core.cljc)
  2. That namespace has occasional comments. You should read it sometime.
  3. Each API function has passable documentation which is linked-to below. 

## Links To API docs

The core API is these functions:
  - [dispatch](https://github.com/Day8/re-frame/blob/master/src/re_frame/router.cljc#L229-L239), [dispatch-sync](https://github.com/Day8/re-frame/blob/master/src/re_frame/router.cljc#L229-L239). See also [this FAQ](/docs/FAQs/When-Does-Dispatch-Happen.md)
  - [reg-event-db](), [reg-event-fx]() are both documented in the code namespace
  - [reg-sub]()
  - [subscribe]()

Occasionally, you'll need to use:  
  - [reg-fx]()
  - [reg-cofx]() and [inject-cofx]()
     
And, finally, there are some builtin Interceptors:
  - [path]()
  - [after]()
  - [debug]()
  

Builtin effects:
  XXX
  
Builtin coeffects:
  XXX

Previous:  [XXX](../README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next:  [XXX](CodeWalkthrough.md)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
