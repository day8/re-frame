// Compiled by ClojureScript 1.10.597
goog.provide("reagent.interop$macros");
var ret__12562__auto___289 = (function (){
reagent.interop$macros.unchecked_aget = (function reagent$interop$macros$unchecked_aget(var_args){
var G__288 = arguments.length;
switch (G__288) {
case (4):
return reagent.interop$macros.unchecked_aget.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___291 = arguments.length;
var i__12446__auto___292 = (0);
while(true){
if((i__12446__auto___292 < len__12445__auto___291)){
args_arr__12515__auto__.push((arguments[i__12446__auto___292]));

var G__293 = (i__12446__auto___292 + (1));
i__12446__auto___292 = G__293;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((4)),(0),null));
return reagent.interop$macros.unchecked_aget.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__12516__auto__);

}
});

(reagent.interop$macros.unchecked_aget.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,array,idx){
return (new cljs.core.List(null,new cljs.core.Symbol(null,"js*","js*",(-1134233646),null),(new cljs.core.List(null,"(~{}[~{}])",(new cljs.core.List(null,array,(new cljs.core.List(null,idx,null,(1),null)),(2),null)),(3),null)),(4),null));
}));

(reagent.interop$macros.unchecked_aget.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,array,idx,idxs){
var astr = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,cljs.core.count.call(null,idxs),"[~{}]"));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"js*","js*",(-1134233646),null),null,(1),null)),(new cljs.core.List(null,["(~{}[~{}]",cljs.core.str.cljs$core$IFn$_invoke$arity$1(astr),")"].join(''),null,(1),null)),(new cljs.core.List(null,array,null,(1),null)),(new cljs.core.List(null,idx,null,(1),null)),idxs));
}));

/** @this {Function} */
(reagent.interop$macros.unchecked_aget.cljs$lang$applyTo = (function (seq283){
var G__284 = cljs.core.first.call(null,seq283);
var seq283__$1 = cljs.core.next.call(null,seq283);
var G__285 = cljs.core.first.call(null,seq283__$1);
var seq283__$2 = cljs.core.next.call(null,seq283__$1);
var G__286 = cljs.core.first.call(null,seq283__$2);
var seq283__$3 = cljs.core.next.call(null,seq283__$2);
var G__287 = cljs.core.first.call(null,seq283__$3);
var seq283__$4 = cljs.core.next.call(null,seq283__$3);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__284,G__285,G__286,G__287,seq283__$4);
}));

(reagent.interop$macros.unchecked_aget.cljs$lang$maxFixedArity = (4));

return null;
})()
;
(reagent.interop$macros.unchecked_aget.cljs$lang$macro = true);

var ret__12562__auto___302 = (function (){
reagent.interop$macros.unchecked_aset = (function reagent$interop$macros$unchecked_aset(var_args){
var G__301 = arguments.length;
switch (G__301) {
case (5):
return reagent.interop$macros.unchecked_aset.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___304 = arguments.length;
var i__12446__auto___305 = (0);
while(true){
if((i__12446__auto___305 < len__12445__auto___304)){
args_arr__12515__auto__.push((arguments[i__12446__auto___305]));

var G__306 = (i__12446__auto___305 + (1));
i__12446__auto___305 = G__306;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((5)),(0),null));
return reagent.interop$macros.unchecked_aset.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__12516__auto__);

}
});

(reagent.interop$macros.unchecked_aset.cljs$core$IFn$_invoke$arity$5 = (function (_AMPERSAND_form,_AMPERSAND_env,array,idx,val){
return (new cljs.core.List(null,new cljs.core.Symbol(null,"js*","js*",(-1134233646),null),(new cljs.core.List(null,"(~{}[~{}] = ~{})",(new cljs.core.List(null,array,(new cljs.core.List(null,idx,(new cljs.core.List(null,val,null,(1),null)),(2),null)),(3),null)),(4),null)),(5),null));
}));

(reagent.interop$macros.unchecked_aset.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,array,idx,idx2,idxv){
var n = (cljs.core.count.call(null,idxv) - (1));
var astr = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,n,"[~{}]"));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"js*","js*",(-1134233646),null),null,(1),null)),(new cljs.core.List(null,["(~{}[~{}][~{}]",cljs.core.str.cljs$core$IFn$_invoke$arity$1(astr)," = ~{})"].join(''),null,(1),null)),(new cljs.core.List(null,array,null,(1),null)),(new cljs.core.List(null,idx,null,(1),null)),(new cljs.core.List(null,idx2,null,(1),null)),idxv));
}));

/** @this {Function} */
(reagent.interop$macros.unchecked_aset.cljs$lang$applyTo = (function (seq295){
var G__296 = cljs.core.first.call(null,seq295);
var seq295__$1 = cljs.core.next.call(null,seq295);
var G__297 = cljs.core.first.call(null,seq295__$1);
var seq295__$2 = cljs.core.next.call(null,seq295__$1);
var G__298 = cljs.core.first.call(null,seq295__$2);
var seq295__$3 = cljs.core.next.call(null,seq295__$2);
var G__299 = cljs.core.first.call(null,seq295__$3);
var seq295__$4 = cljs.core.next.call(null,seq295__$3);
var G__300 = cljs.core.first.call(null,seq295__$4);
var seq295__$5 = cljs.core.next.call(null,seq295__$4);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__296,G__297,G__298,G__299,G__300,seq295__$5);
}));

(reagent.interop$macros.unchecked_aset.cljs$lang$maxFixedArity = (5));

return null;
})()
;
(reagent.interop$macros.unchecked_aset.cljs$lang$macro = true);


//# sourceURL=reagent/interop$macros.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9pbnRlcm9wJG1hY3Jvcy5qcyIsInNvdXJjZXMiOlsiaW50ZXJvcCRtYWNyb3MuY2xqcyJdLCJsaW5lQ291bnQiOjEyNywibWFwcGluZ3MiOiI7QUFJQSxJQUFBQSx5QkFBQTtBQUFBLHdDQUFBLGdEQUFBQyx4RkFBVUU7QUFBVixBQUFBLElBQUFELFNBQUEsQUFBQTtBQUFBLEFBQUEsUUFBQUE7S0FBQTtBQUFBLE9BQUFDLG9FQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQTs7OztBQUFBLElBQUFDLDBCQUFBO0FBQUEsQUFBQSxJQUFBQyx5QkFBQSxBQUFBO0FBQUEsQUFBQSxJQUFBQyx1QkFBQTs7QUFBQSxBQUFBLEdBQUEsQ0FBQUEsdUJBQUFEO0FBQUEsQUFBQSxBQUFBRCw2QkFBQSxDQUFBLFVBQUFFOztBQUFBLGFBQUEsQ0FBQUEsdUJBQUE7Ozs7QUFBQTs7OztBQUFBLElBQUFDLHdCQUFBLDBCQUFBLEFBQUFILDhCQUFBLEtBQUEsSUFBQSw1REFpcUcwRHFDO0FBanFHMUQsQUFBQSxPQUFBdEMsMkVBQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBLE1BQUFJOzs7OztBQUFBLENBQUEsc0VBQUEsV0FBQUMsZ0JBQUFDLGpHQUFVTixnSEFDTmEsTUFBTUM7QUFEVixBQUVHLFlBQUFDLGVBQUEsS0FBQSxBQUFBLDBEQUFBLEtBQUFBLGVBQUEsS0FBQSxhQUFBLEtBQUFBLGVBQUEsV0FBQSxLQUFBQSxlQUFBLFNBQUEsS0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxJQUFBLDdFQUF3QkYsK0JBQU1DOzs7QUFGakMsQUFBQSxDQUFBLDZFQUFBLFdBQUFULGdCQUFBQyx4R0FBVU4sdUhBR05hLE1BQU1DLElBQU1FO0FBSGhCLEFBSUcsSUFBTUcsT0FBSyxBQUFDQywwQkFBTUMsY0FBSSwyREFBQSwzREFBQ0MsMkJBQU8s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QXNCSSxtRUFBaUJOLCtDQUFPQyw2Q0FBS21CLHFCQUFPQzs7O0FBTnhFO0FBQUEsQ0FBQSwwREFBQSxXQUFBUixyRUFBVUQ7QUFBVixBQUFBLElBQUFFLFNBQUEsMEJBQUFELDFCQXNoR2dEVTtJQXRoR2hEVixhQUFBLHlCQUFBQSx6QkF1aEdrRFc7SUF2aEdsRFQsU0FBQSwwQkFBQUYsMUJBc2hHZ0RVO0lBdGhHaERWLGFBQUEseUJBQUFBLHpCQXVoR2tEVztJQXZoR2xEUixTQUFBLDBCQUFBSCwxQkFzaEdnRFU7SUF0aEdoRFYsYUFBQSx5QkFBQUEsekJBdWhHa0RXO0lBdmhHbERQLFNBQUEsMEJBQUFKLDFCQXNoR2dEVTtJQXRoR2hEVixhQUFBLHlCQUFBQSx6QkF1aEdrRFc7SUF2aEdsRE4sU0FBQSwwQkFBQUwsMUJBc2hHZ0RVO0lBdGhHaERWLGFBQUEseUJBQUFBLHpCQXVoR2tEVztBQXZoR2xELEFBQUEsSUFBQXpCLHNCQUFBO0FBQUEsQUFBQSxPQUFBQSx5REFBQWUsT0FBQUMsT0FBQUMsT0FBQUMsT0FBQUMsT0FBQUw7OztBQUFBLENBQUEsZ0VBQUEsaEVBQVVEOztBQUFWOzs7QUFBQSxBQUFBLENBQUEsd0RBQUEseERBQVVBOztBQUFWNUIiLCJuYW1lcyI6WyJyZXRfXzEyNTYyX19hdXRvX18iLCJ2YXJfYXJncyIsIkdfXzI4OCIsInJlYWdlbnQuaW50ZXJvcCRtYWNyb3MvdW5jaGVja2VkLWFnZXQiLCJhcmdzLWFycl9fMTI1MTVfX2F1dG9fXyIsImxlbl9fMTI0NDVfX2F1dG9fXyIsImlfXzEyNDQ2X19hdXRvX18iLCJhcmdzZXFfXzEyNTE2X19hdXRvX18iLCImZm9ybSIsIiZlbnYiLCJzZXEyODMiLCJHX18yODQiLCJHX18yODUiLCJHX18yODYiLCJHX18yODciLCJzZWxmX18xMjQyMF9fYXV0b19fIiwiYXJyYXkiLCJpZHgiLCJjbGpzLmNvcmUvTGlzdCIsImlkeHMiLCJjbGpzLmNvcmUvc2VxdWVuY2UiLCJjbGpzLmNvcmUvY29uY2F0IiwiYXN0ciIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9zdHIiLCJjbGpzLmNvcmUvcmVwZWF0IiwiY2xqcy5jb3JlL2NvdW50IiwiR19fMzAxIiwicmVhZ2VudC5pbnRlcm9wJG1hY3Jvcy91bmNoZWNrZWQtYXNldCIsInNlcTI5NSIsIkdfXzI5NiIsIkdfXzI5NyIsIkdfXzI5OCIsIkdfXzI5OSIsIkdfXzMwMCIsInZhbCIsImlkeDIiLCJpZHh2IiwibiIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwiY2xqcy5jb3JlL0luZGV4ZWRTZXEiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlYWdlbnQuaW50ZXJvcClcblxuOyB0YWtlbiBmcm9tIGNsanMuY29yZVxuOyBodHRwczovL2dpdGh1Yi5jb20vYmluYXJ5YWdlL2NsanMtb29wcy9pc3N1ZXMvMTRcbihkZWZtYWNybyB1bmNoZWNrZWQtYWdldFxuICAoW2FycmF5IGlkeF1cbiAgIChsaXN0ICdqcyogXCIofnt9W357fV0pXCIgYXJyYXkgaWR4KSlcbiAgKFthcnJheSBpZHggJiBpZHhzXVxuICAgKGxldCBbYXN0ciAoYXBwbHkgc3RyIChyZXBlYXQgKGNvdW50IGlkeHMpIFwiW357fV1cIikpXVxuICAgICBgKH4nanMqIH4oc3RyIFwiKH57fVt+e31dXCIgYXN0ciBcIilcIikgfmFycmF5IH5pZHggfkBpZHhzKSkpKVxuXG47IHRha2VuIGZyb20gY2xqcy5jb3JlXG47IGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5hcnlhZ2UvY2xqcy1vb3BzL2lzc3Vlcy8xNFxuKGRlZm1hY3JvIHVuY2hlY2tlZC1hc2V0XG4gIChbYXJyYXkgaWR4IHZhbF1cbiAgIChsaXN0ICdqcyogXCIofnt9W357fV0gPSB+e30pXCIgYXJyYXkgaWR4IHZhbCkpXG4gIChbYXJyYXkgaWR4IGlkeDIgJiBpZHh2XVxuICAgKGxldCBbbiAoZGVjIChjb3VudCBpZHh2KSlcbiAgICAgICAgIGFzdHIgKGFwcGx5IHN0ciAocmVwZWF0IG4gXCJbfnt9XVwiKSldXG4gICAgIGAofidqcyogfihzdHIgXCIofnt9W357fV1bfnt9XVwiIGFzdHIgXCIgPSB+e30pXCIpIH5hcnJheSB+aWR4IH5pZHgyIH5AaWR4dikpKSlcbiJdfQ==