// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.utils");
/**
 * Dissociates an entry from a nested associative structure returning a new
 *   nested structure. keys is a sequence of keys. Any empty maps that result
 *   will not be present in the new structure.
 *   The key thing is that 'm' remains identical? to istelf if the path was never present
 */
re_frame.utils.dissoc_in = (function re_frame$utils$dissoc_in(m,p__651){
var vec__652 = p__651;
var seq__653 = cljs.core.seq.call(null,vec__652);
var first__654 = cljs.core.first.call(null,seq__653);
var seq__653__$1 = cljs.core.next.call(null,seq__653);
var k = first__654;
var ks = seq__653__$1;
var keys = vec__652;
if(ks){
var temp__9584__auto__ = cljs.core.get.call(null,m,k);
if(cljs.core.truth_(temp__9584__auto__)){
var nextmap = temp__9584__auto__;
var newmap = re_frame.utils.dissoc_in.call(null,nextmap,ks);
if(cljs.core.seq.call(null,newmap)){
return cljs.core.assoc.call(null,m,k,newmap);
} else {
return cljs.core.dissoc.call(null,m,k);
}
} else {
return m;
}
} else {
return cljs.core.dissoc.call(null,m,k);
}
});
re_frame.utils.first_in_vector = (function re_frame$utils$first_in_vector(v){
if(cljs.core.vector_QMARK_.call(null,v)){
return cljs.core.first.call(null,v);
} else {
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: expected a vector, but got:",v);
}
});

//# sourceURL=re_frame/utils.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvdXRpbHMuanMiLCJzb3VyY2VzIjpbInV0aWxzLmNsanMiXSwibGluZUNvdW50Ijo0MiwibWFwcGluZ3MiOiI7QUFJQTs7Ozs7OzJCQUFBLHFDQUFBQSxoRUFBTU8sOERBS0hDO0FBTEgsQUFBQSxJQUFBUCxXQUFBRDtJQUFBRSxXQUFBLEFBQUFDLHdCQUFBRjtJQUFBRyxhQUFBLEFBQUFDLDBCQUFBSDtJQUFBQSxlQUFBLEFBQUFJLHlCQUFBSjtRQUFBRSxKQUtNSztTQUxOUCxMQUtVUTtXQUxWVCxQQUtpQlU7QUFMakIsQUFNRSxHQUFJRDtBQUNGLElBQUFFLHFCQUFpQixBQUFDRSx3QkFBSU4sRUFBRUM7QUFBeEIsQUFBQSxvQkFBQUc7QUFBQSxjQUFBQSxWQUFTQztBQUFULEFBQ0UsSUFBTUUsU0FBTyxBQUFDUixtQ0FBVU0sUUFBUUg7QUFBaEMsQUFDRSxHQUFJLEFBQUNQLHdCQUFJWTtBQUNQLE9BQUNDLDBCQUFNUixFQUFFQyxFQUFFTTs7QUFDWCxPQUFDRSwyQkFBT1QsRUFBRUM7OztBQUNkRDs7O0FBQ0YsT0FBQ1MsMkJBQU9ULEVBQUVDOzs7QUFFZCxpQ0FBQSxqQ0FBTVMsMEVBQ0hDO0FBREgsQUFFRSxHQUFJLEFBQUNDLGtDQUFRRDtBQUNYLE9BQUNkLDBCQUFNYzs7QUFDUCwwQ0FBQSx5REFBQSw1RkFBQ0Usb0lBQXVERiIsIm5hbWVzIjpbInBfXzY1MSIsInZlY19fNjUyIiwic2VxX182NTMiLCJjbGpzLmNvcmUvc2VxIiwiZmlyc3RfXzY1NCIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwicmUtZnJhbWUudXRpbHMvZGlzc29jLWluIiwibSIsImsiLCJrcyIsImtleXMiLCJ0ZW1wX185NTg0X19hdXRvX18iLCJuZXh0bWFwIiwiY2xqcy5jb3JlL2dldCIsIm5ld21hcCIsImNsanMuY29yZS9hc3NvYyIsImNsanMuY29yZS9kaXNzb2MiLCJyZS1mcmFtZS51dGlscy9maXJzdC1pbi12ZWN0b3IiLCJ2IiwiY2xqcy5jb3JlL3ZlY3Rvcj8iLCJyZS1mcmFtZS5sb2dnZXJzL2NvbnNvbGUiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlLWZyYW1lLnV0aWxzXG4gICg6cmVxdWlyZVxuICAgIFtyZS1mcmFtZS5sb2dnZXJzIDpyZWZlciBbY29uc29sZV1dKSlcblxuKGRlZm4gZGlzc29jLWluXG4gIFwiRGlzc29jaWF0ZXMgYW4gZW50cnkgZnJvbSBhIG5lc3RlZCBhc3NvY2lhdGl2ZSBzdHJ1Y3R1cmUgcmV0dXJuaW5nIGEgbmV3XG4gIG5lc3RlZCBzdHJ1Y3R1cmUuIGtleXMgaXMgYSBzZXF1ZW5jZSBvZiBrZXlzLiBBbnkgZW1wdHkgbWFwcyB0aGF0IHJlc3VsdFxuICB3aWxsIG5vdCBiZSBwcmVzZW50IGluIHRoZSBuZXcgc3RydWN0dXJlLlxuICBUaGUga2V5IHRoaW5nIGlzIHRoYXQgJ20nIHJlbWFpbnMgaWRlbnRpY2FsPyB0byBpc3RlbGYgaWYgdGhlIHBhdGggd2FzIG5ldmVyIHByZXNlbnRcIlxuICBbbSBbayAmIGtzIDphcyBrZXlzXV1cbiAgKGlmIGtzXG4gICAgKGlmLWxldCBbbmV4dG1hcCAoZ2V0IG0gayldXG4gICAgICAobGV0IFtuZXdtYXAgKGRpc3NvYy1pbiBuZXh0bWFwIGtzKV1cbiAgICAgICAgKGlmIChzZXEgbmV3bWFwKVxuICAgICAgICAgIChhc3NvYyBtIGsgbmV3bWFwKVxuICAgICAgICAgIChkaXNzb2MgbSBrKSkpXG4gICAgICBtKVxuICAgIChkaXNzb2MgbSBrKSkpXG5cbihkZWZuIGZpcnN0LWluLXZlY3RvclxuICBbdl1cbiAgKGlmICh2ZWN0b3I/IHYpXG4gICAgKGZpcnN0IHYpXG4gICAgKGNvbnNvbGUgOmVycm9yIFwicmUtZnJhbWU6IGV4cGVjdGVkIGEgdmVjdG9yLCBidXQgZ290OlwiIHYpKSlcbiJdfQ==