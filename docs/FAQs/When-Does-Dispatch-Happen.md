
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

### Question

How long after I call `dispatch` will the event be processed?

### Answer

The answer is "it depends", but [this comment in the code](https://github.com/day8/re-frame/blob/master/src/re_frame/router.cljc#L8-L60)
might provide you the answers you seek.  
