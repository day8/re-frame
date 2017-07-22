## The re-frame API

A starting summary, in note form:
  1. the re-frame API is provided by [the core.cljs namespace](/src/re_frame/core.cljc)
  2. That namespace is fairly small, with only 5 to 10 functions in regular use.
  3. That namespace has occasional comments. You should read it from top to bottom.
  4. All often-used API functions have doc strings, linked-to below. (But there's currently no auto-generated API docs [because of this problem](/src/re_frame/core.cljc#L19-L36))

## Links To API docs

The core API is these functions:
  - [dispatch](/src/re_frame/router.cljc#L229-L239), [dispatch-sync](/src/re_frame/router.cljc#L229-L239). See also [this FAQ](/docs/FAQs/When-Does-Dispatch-Happen.md)
  - [reg-event-db](/src/re_frame/core.cljc#L71-L80), [reg-event-fx](/src/re_frame/core.cljc#L87-L97) 
  - [reg-sub](/src/re_frame/subs.cljc#L151-L237)
  - [subscribe](/src/re_frame/subs.cljc#L67-L83)

Occasionally, you'll also need to use:  
  - [reg-fx]() XXX
  - [reg-cofx]() XXX and [inject-cofx](src/re_frame/cofx.cljc#L22-L73)
     
And, finally, there are some builtin Interceptors which are used a bit:
  - [path](src/re_frame/std_interceptors.cljc#L149-L173)
  - [after](/src/re_frame/std_interceptors.cljc#L260-L281)
  - [debug](/src/re_frame/std_interceptors.cljc#L13-L36)
  - [and the rest are in the same namespace](/src/re_frame/std_interceptors.cljc)
  
Builtin effects:
  XXX
  
Builtin coeffects:
  XXX

Previous:  [First Code Walk-Through](CodeWalkthrough.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Up:  [Index](README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Next: [Mental Model Omnibus](MentalModelOmnibus.md)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
