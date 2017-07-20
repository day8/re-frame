## re-frame API

I have good news and bad news.

First, the bad news:
 1. [there's this problem](https://github.com/Day8/re-frame/blob/master/src/re_frame/core.cljc#L19-L33)
 2. I lied about the extra nudity

Now, the good news:  
  1. the re-frame API is indeed [all in one namespace](https://github.com/Day8/re-frame/blob/master/src/re_frame/core.cljc)
  2. That namespace has occasional comments
  3. Each API function has passable documentation (see links below), just not auto-generated.

## Links To API docs

The core API is these functions:
  - [dispatch](), [dispatch-sync]()
  - [reg-event-db](), [reg-event-fx]()
  - [reg-sub]()
  - [subscribe]()

Occasionally, you'll need to use:  
  - [reg-fx]()
  - [reg-cofx]() and [inject-cofx]()
     
And, finally, there are some standard Interceptors:
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
