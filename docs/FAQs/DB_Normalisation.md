
<!-- leave this H1 here. It stops mkdocs putting in a Title at the top.
     It needs to be at the top of the file otherwise it breaks the 
     table of contents on the right hand side. -->
#

## Question

`app-db` contains a `map`. How do I store normalised data in a `map`, 
bettering mirroring the structure in my server-side database?

## Answer 

These libraries might be interesting to you:

  - [compound](https://github.com/riverford/compound)
  - [SubGraph](https://github.com/vimsical/subgraph)
  - [pull](https://github.com/juxt/pull)
  
See also [this comment](https://github.com/day8/re-frame/issues/304#issuecomment-269620609).
  
If you want to go whole hog and ditch `app-db` and embrace DataScript, 
then you might find [re-posh](https://github.com/denistakeda/re-posh) interesting.
