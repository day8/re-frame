// Compiled by ClojureScript 1.10.597
goog.provide("net.cgrand.macrovich$macros");
var ret__12562__auto___664 = (function (){
/**
 * This block will only be evaluated at the correct time for macro definition, at other times its content
 * are removed.
 * For Clojure it always behaves like a `do` block.
 * For Clojurescript/JVM the block is only visible to Clojure.
 * For self-hosted Clojurescript the block is only visible when defining macros in the pseudo-namespace.
 */
net.cgrand.macrovich$macros.deftime = (function net$cgrand$macrovich$macros$deftime(var_args){
var args__12462__auto__ = [];
var len__12445__auto___665 = arguments.length;
var i__12446__auto___666 = (0);
while(true){
if((i__12446__auto___666 < len__12445__auto___665)){
args__12462__auto__.push((arguments[i__12446__auto___666]));

var G__667 = (i__12446__auto___666 + (1));
i__12446__auto___666 = G__667;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return net.cgrand.macrovich$macros.deftime.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(net.cgrand.macrovich$macros.deftime.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*\$macros/,cljs.core.name.call(null,cljs.core.ns_name.call(null,cljs.core._STAR_ns_STAR_))))){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",(1686842252),null),null,(1),null)),body));
} else {
return null;
}
}));

(net.cgrand.macrovich$macros.deftime.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(net.cgrand.macrovich$macros.deftime.cljs$lang$applyTo = (function (seq661){
var G__662 = cljs.core.first.call(null,seq661);
var seq661__$1 = cljs.core.next.call(null,seq661);
var G__663 = cljs.core.first.call(null,seq661__$1);
var seq661__$2 = cljs.core.next.call(null,seq661__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__662,G__663,seq661__$2);
}));

return null;
})()
;
(net.cgrand.macrovich$macros.deftime.cljs$lang$macro = true);

var ret__12562__auto___671 = (function (){
/**
 * This block content is not included at macro definition time.
 * For Clojure it always behaves like a `do` block.
 * For Clojurescript/JVM the block is only visible to Clojurescript.
 * For self-hosted Clojurescript the block is invisible when defining macros in the pseudo-namespace.
 */
net.cgrand.macrovich$macros.usetime = (function net$cgrand$macrovich$macros$usetime(var_args){
var args__12462__auto__ = [];
var len__12445__auto___672 = arguments.length;
var i__12446__auto___673 = (0);
while(true){
if((i__12446__auto___673 < len__12445__auto___672)){
args__12462__auto__.push((arguments[i__12446__auto___673]));

var G__674 = (i__12446__auto___673 + (1));
i__12446__auto___673 = G__674;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return net.cgrand.macrovich$macros.usetime.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(net.cgrand.macrovich$macros.usetime.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
if(cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*\$macros/,cljs.core.name.call(null,cljs.core.ns_name.call(null,cljs.core._STAR_ns_STAR_))))){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",(1686842252),null),null,(1),null)),body));
} else {
return null;
}
}));

(net.cgrand.macrovich$macros.usetime.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(net.cgrand.macrovich$macros.usetime.cljs$lang$applyTo = (function (seq668){
var G__669 = cljs.core.first.call(null,seq668);
var seq668__$1 = cljs.core.next.call(null,seq668);
var G__670 = cljs.core.first.call(null,seq668__$1);
var seq668__$2 = cljs.core.next.call(null,seq668__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__669,G__670,seq668__$2);
}));

return null;
})()
;
(net.cgrand.macrovich$macros.usetime.cljs$lang$macro = true);

var ret__12562__auto___681 = (function (){
net.cgrand.macrovich$macros.case$ = (function net$cgrand$macrovich$macros$case(var_args){
var args__12462__auto__ = [];
var len__12445__auto___682 = arguments.length;
var i__12446__auto___683 = (0);
while(true){
if((i__12446__auto___683 < len__12445__auto___682)){
args__12462__auto__.push((arguments[i__12446__auto___683]));

var G__684 = (i__12446__auto___683 + (1));
i__12446__auto___683 = G__684;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return net.cgrand.macrovich$macros.case$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(net.cgrand.macrovich$macros.case$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__678){
var map__679 = p__678;
var map__679__$1 = (((((!((map__679 == null))))?(((((map__679.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__679.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__679):map__679);
var cljs__$1 = cljs.core.get.call(null,map__679__$1,new cljs.core.Keyword(null,"cljs","cljs",(1492417629)));
var clj = cljs.core.get.call(null,map__679__$1,new cljs.core.Keyword(null,"clj","clj",(-660495428)));
if(cljs.core.contains_QMARK_.call(null,_AMPERSAND_env,new cljs.core.Symbol(null,"&env","&env",(-919163083),null))){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"if","if",(1181717262),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Keyword(null,"ns","ns",(441598760)),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"&env","&env",(-919163083),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs__$1,null,(1),null)),(new cljs.core.List(null,clj,null,(1),null))));
} else {
return cljs__$1;

}
}));

(net.cgrand.macrovich$macros.case$.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(net.cgrand.macrovich$macros.case$.cljs$lang$applyTo = (function (seq675){
var G__676 = cljs.core.first.call(null,seq675);
var seq675__$1 = cljs.core.next.call(null,seq675);
var G__677 = cljs.core.first.call(null,seq675__$1);
var seq675__$2 = cljs.core.next.call(null,seq675__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__676,G__677,seq675__$2);
}));

return null;
})()
;
(net.cgrand.macrovich$macros.case$.cljs$lang$macro = true);

var ret__12562__auto___699 = (function (){
net.cgrand.macrovich$macros.replace = (function net$cgrand$macrovich$macros$replace(var_args){
var args__12462__auto__ = [];
var len__12445__auto___700 = arguments.length;
var i__12446__auto___701 = (0);
while(true){
if((i__12446__auto___701 < len__12445__auto___700)){
args__12462__auto__.push((arguments[i__12446__auto___701]));

var G__702 = (i__12446__auto___701 + (1));
i__12446__auto___701 = G__702;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((3) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((3)),(0),null)):null);
return net.cgrand.macrovich$macros.replace.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12463__auto__);
});

(net.cgrand.macrovich$macros.replace.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,map_or_maps,body){
var smap = ((cljs.core.map_QMARK_.call(null,map_or_maps))?map_or_maps:cljs.core.reduce.call(null,cljs.core.into,cljs.core.PersistentArrayMap.EMPTY,map_or_maps));
var walk = (function net$cgrand$macrovich$macros$walk(form){
if(cljs.core.contains_QMARK_.call(null,smap,form)){
return smap.call(null,form);
} else {
if(cljs.core.map_QMARK_.call(null,form)){
return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.empty.call(null,form),(function (){var iter__11618__auto__ = (function net$cgrand$macrovich$macros$walk_$_iter__689(s__690){
return (new cljs.core.LazySeq(null,(function (){
var s__690__$1 = s__690;
while(true){
var temp__9646__auto__ = cljs.core.seq.call(null,s__690__$1);
if(temp__9646__auto__){
var s__690__$2 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__690__$2)){
var c__11595__auto__ = cljs.core.chunk_first.call(null,s__690__$2);
var size__11596__auto__ = cljs.core.count.call(null,c__11595__auto__);
var b__692 = cljs.core.chunk_buffer.call(null,size__11596__auto__);
if((function (){var i__691 = (0);
while(true){
if((i__691 < size__11596__auto__)){
var vec__693 = cljs.core._nth.call(null,c__11595__auto__,i__691);
var k = cljs.core.nth.call(null,vec__693,(0),null);
var v = cljs.core.nth.call(null,vec__693,(1),null);
cljs.core.chunk_append.call(null,b__692,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [net$cgrand$macrovich$macros$walk.call(null,k),net$cgrand$macrovich$macros$walk.call(null,v)], null));

var G__703 = (i__691 + (1));
i__691 = G__703;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__692),net$cgrand$macrovich$macros$walk_$_iter__689.call(null,cljs.core.chunk_rest.call(null,s__690__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__692),null);
}
} else {
var vec__696 = cljs.core.first.call(null,s__690__$2);
var k = cljs.core.nth.call(null,vec__696,(0),null);
var v = cljs.core.nth.call(null,vec__696,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [net$cgrand$macrovich$macros$walk.call(null,k),net$cgrand$macrovich$macros$walk.call(null,v)], null),net$cgrand$macrovich$macros$walk_$_iter__689.call(null,cljs.core.rest.call(null,s__690__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__11618__auto__.call(null,form);
})()),cljs.core.meta.call(null,form));
} else {
if(cljs.core.seq_QMARK_.call(null,form)){
return cljs.core.with_meta.call(null,cljs.core.map.call(null,net$cgrand$macrovich$macros$walk,form),cljs.core.meta.call(null,form));
} else {
if(cljs.core.coll_QMARK_.call(null,form)){
return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.empty.call(null,form),cljs.core.map.call(null,net$cgrand$macrovich$macros$walk),form),cljs.core.meta.call(null,form));
} else {
return form;

}
}
}
}
});
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",(1686842252),null),null,(1),null)),cljs.core.map.call(null,walk,body)));
}));

(net.cgrand.macrovich$macros.replace.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(net.cgrand.macrovich$macros.replace.cljs$lang$applyTo = (function (seq685){
var G__686 = cljs.core.first.call(null,seq685);
var seq685__$1 = cljs.core.next.call(null,seq685);
var G__687 = cljs.core.first.call(null,seq685__$1);
var seq685__$2 = cljs.core.next.call(null,seq685__$1);
var G__688 = cljs.core.first.call(null,seq685__$2);
var seq685__$3 = cljs.core.next.call(null,seq685__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__686,G__687,G__688,seq685__$3);
}));

return null;
})()
;
(net.cgrand.macrovich$macros.replace.cljs$lang$macro = true);


//# sourceURL=net/cgrand/macrovich$macros.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0L2NncmFuZC9tYWNyb3ZpY2gkbWFjcm9zLmpzIiwic291cmNlcyI6WyJtYWNyb3ZpY2gkbWFjcm9zLmNsanMiXSwibGluZUNvdW50IjoyNzEsIm1hcHBpbmdzIjoiO0FBR0EsSUFBQUEseUJBQUE7QUFBQTs7Ozs7OztzQ0FBQSw4Q0FBQUMscEZBQVVLO0FBQVYsQUFBQSxJQUFBSixzQkFBQTtBQUFBLEFBQUEsSUFBQUMseUJBQUEsQUFBQTtBQUFBLEFBQUEsSUFBQUMsdUJBQUE7O0FBQUEsQUFBQSxHQUFBLENBQUFBLHVCQUFBRDtBQUFBLEFBQUEsQUFBQUQseUJBQUEsQ0FBQSxVQUFBRTs7QUFBQSxhQUFBLENBQUFBLHVCQUFBOzs7O0FBQUE7Ozs7QUFBQSxJQUFBQyx3QkFBQSxFQUFBLENBQUEsTUFBQSxBQUFBSCw2QkFBQSxBQUFBLDBCQUFBLEFBQUFBLDBCQUFBLEtBQUEsSUFBQSxPQUFBLC9EQStsR3NEbUY7QUEvbEd0RCxBQUFBLE9BQUEvRSx5RUFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUEsTUFBQUQ7OztBQUFBLEFBQUEsQ0FBQSwyRUFBQSxXQUFBRSxnQkFBQUMsdEdBQVVGLHFIQU1MTztBQU5MLEFBT0Usb0JBQXFDLCtCQUFBLC9CQUFDSSw0Q0FBeUIsQUFBQ0MseUJBQUssQUFBQ0MsNEJBQVFDO0FBQTlFLEFBQUEsT0FBQU4sNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsdURBQUEsS0FBQSxJQUFBLE9BQ1NIOztBQURUOzs7O0FBUEYsQ0FBQSw4REFBQSw5REFBVVA7O0FBQVY7QUFBQSxDQUFBLHdEQUFBLFdBQUFHLG5FQUFVSDtBQUFWLEFBQUEsSUFBQUksU0FBQSwwQkFBQUQsMUJBZ2lHZ0RpRTtJQWhpR2hEakUsYUFBQSx5QkFBQUEsekJBaWlHa0QyRTtJQWppR2xEekUsU0FBQSwwQkFBQUYsMUJBZ2lHZ0RpRTtJQWhpR2hEakUsYUFBQSx5QkFBQUEsekJBaWlHa0QyRTtBQWppR2xELEFBQUEsSUFBQXhFLHNC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ZXRfXzEyNTYyX19hdXRvX18iLCJ2YXJfYXJncyIsImFyZ3NfXzEyNDYyX19hdXRvX18iLCJsZW5fXzEyNDQ1X19hdXRvX18iLCJpX18xMjQ0Nl9fYXV0b19fIiwiYXJnc2VxX18xMjQ2M19fYXV0b19fIiwibmV0LmNncmFuZC5tYWNyb3ZpY2gkbWFjcm9zL2RlZnRpbWUiLCImZm9ybSIsIiZlbnYiLCJzZXE2NjEiLCJHX182NjIiLCJHX182NjMiLCJzZWxmX18xMjQyMF9fYXV0b19fIiwiYm9keSIsImNsanMuY29yZS9zZXF1ZW5jZSIsImNsanMuY29yZS9jb25jYXQiLCJjbGpzLmNvcmUvTGlzdCIsImNsanMuY29yZS9yZS1tYXRjaGVzIiwiY2xqcy5jb3JlL25hbWUiLCJjbGpzLmNvcmUvbnMtbmFtZSIsImNsanMuY29yZS8qbnMqIiwibmV0LmNncmFuZC5tYWNyb3ZpY2gkbWFjcm9zL3VzZXRpbWUiLCJzZXE2NjgiLCJHX182NjkiLCJHX182NzAiLCJjbGpzLmNvcmUvbm90IiwibmV0LmNncmFuZC5tYWNyb3ZpY2gkbWFjcm9zL2Nhc2UiLCJwX182NzgiLCJtYXBfXzY3OSIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9oYXNoLW1hcCIsImNsanMuY29yZS9nZXQiLCJzZXE2NzUiLCJHX182NzYiLCJHX182NzciLCJjbGpzIiwiY2xqIiwiY2xqcy5jb3JlL2NvbnRhaW5zPyIsIm5ldC5jZ3JhbmQubWFjcm92aWNoJG1hY3Jvcy9yZXBsYWNlIiwic2VxNjg1IiwiR19fNjg2IiwiR19fNjg3IiwiR19fNjg4IiwibWFwLW9yLW1hcHMiLCJzbWFwIiwiY2xqcy5jb3JlL21hcD8iLCJjbGpzLmNvcmUvcmVkdWNlIiwiY2xqcy5jb3JlL2ludG8iLCJ3YWxrIiwiZm9ybSIsImNsanMuY29yZS93aXRoLW1ldGEiLCJjbGpzLmNvcmUvZW1wdHkiLCJpdGVyX18xMTYxOF9fYXV0b19fIiwic19fNjkwIiwiY2xqcy5jb3JlL0xhenlTZXEiLCJ0ZW1wX185NjQ2X19hdXRvX18iLCJjbGpzLmNvcmUvc2VxIiwiY2xqcy5jb3JlL2NodW5rZWQtc2VxPyIsImNfXzExNTk1X19hdXRvX18iLCJzaXplX18xMTU5Nl9fYXV0b19fIiwiY2xqcy5jb3JlL2NvdW50IiwiYl9fNjkyIiwiY2xqcy5jb3JlL2NodW5rLWJ1ZmZlciIsImlfXzY5MSIsInZlY19fNjkzIiwiY2xqcy5jb3JlLy1udGgiLCJjbGpzLmNvcmUvbnRoIiwiY2xqcy5jb3JlL2NodW5rLWFwcGVuZCIsImNsanMuY29yZS9jaHVuay1jb25zIiwiY2xqcy5jb3JlL2NodW5rIiwiaXRlcl9fNjg5IiwiY2xqcy5jb3JlL2NodW5rLXJlc3QiLCJ2ZWNfXzY5NiIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9jb25zIiwiY2xqcy5jb3JlL3Jlc3QiLCJrIiwidiIsImNsanMuY29yZS9tZXRhIiwiY2xqcy5jb3JlL3NlcT8iLCJjbGpzLmNvcmUvbWFwIiwiY2xqcy5jb3JlL2NvbGw/IiwiY2xqcy5jb3JlL2NodW5rLWZpcnN0IiwiY2xqcy5jb3JlL25leHQiLCJjbGpzLmNvcmUvSW5kZXhlZFNlcSJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgbmV0LmNncmFuZC5tYWNyb3ZpY2hcbiAgKDpyZWZlci1jbG9qdXJlIDpleGNsdWRlIFtjYXNlIHJlcGxhY2VdKSlcblxuKGRlZm1hY3JvIGRlZnRpbWVcbiAgXCJUaGlzIGJsb2NrIHdpbGwgb25seSBiZSBldmFsdWF0ZWQgYXQgdGhlIGNvcnJlY3QgdGltZSBmb3IgbWFjcm8gZGVmaW5pdGlvbiwgYXQgb3RoZXIgdGltZXMgaXRzIGNvbnRlbnRcbiAgIGFyZSByZW1vdmVkLlxuICAgRm9yIENsb2p1cmUgaXQgYWx3YXlzIGJlaGF2ZXMgbGlrZSBhIGBkb2AgYmxvY2suXG4gICBGb3IgQ2xvanVyZXNjcmlwdC9KVk0gdGhlIGJsb2NrIGlzIG9ubHkgdmlzaWJsZSB0byBDbG9qdXJlLlxuICAgRm9yIHNlbGYtaG9zdGVkIENsb2p1cmVzY3JpcHQgdGhlIGJsb2NrIGlzIG9ubHkgdmlzaWJsZSB3aGVuIGRlZmluaW5nIG1hY3JvcyBpbiB0aGUgcHNldWRvLW5hbWVzcGFjZS5cIlxuICBbJiBib2R5XVxuICAod2hlbiAjPyg6Y2xqIChub3QgKDpucyAmZW52KSkgOmNsanMgKHJlLW1hdGNoZXMgI1wiLipcXCRtYWNyb3NcIiAobmFtZSAobnMtbmFtZSAqbnMqKSkpKVxuICAgIGAoZG8gfkBib2R5KSkpXG5cbihkZWZtYWNybyB1c2V0aW1lXG4gIFwiVGhpcyBibG9jayBjb250ZW50IGlzIG5vdCBpbmNsdWRlZCBhdCBtYWNybyBkZWZpbml0aW9uIHRpbWUuXG4gICBGb3IgQ2xvanVyZSBpdCBhbHdheXMgYmVoYXZlcyBsaWtlIGEgYGRvYCBibG9jay5cbiAgIEZvciBDbG9qdXJlc2NyaXB0L0pWTSB0aGUgYmxvY2sgaXMgb25seSB2aXNpYmxlIHRvIENsb2p1cmVzY3JpcHQuXG4gICBGb3Igc2VsZi1ob3N0ZWQgQ2xvanVyZXNjcmlwdCB0aGUgYmxvY2sgaXMgaW52aXNpYmxlIHdoZW4gZGVmaW5pbmcgbWFjcm9zIGluIHRoZSBwc2V1ZG8tbmFtZXNwYWNlLlwiXG4gIFsmIGJvZHldXG4gICh3aGVuICM/KDpjbGogdHJ1ZSA6Y2xqcyAobm90IChyZS1tYXRjaGVzICNcIi4qXFwkbWFjcm9zXCIgKG5hbWUgKG5zLW5hbWUgKm5zKikpKSkpXG4gICAgYChkbyB+QGJvZHkpKSlcblxuKGRlZm1hY3JvIGNhc2UgWyYgezprZXlzIFtjbGpzIGNsal19XVxuICAoaWYgKGNvbnRhaW5zPyAmZW52ICcmZW52KVxuICAgIGAoaWYgKDpucyB+JyZlbnYpIH5jbGpzIH5jbGopXG4gICAgKGlmICM/KDpjbGogKDpucyAmZW52KSA6Y2xqcyB0cnVlKVxuICAgICAgY2xqc1xuICAgICAgY2xqKSkpXG5cbihkZWZtYWNybyByZXBsYWNlIFttYXAtb3ItbWFwcyAmIGJvZHldXG4gIChsZXQgW3NtYXAgKGlmIChtYXA/IG1hcC1vci1tYXBzKSBtYXAtb3ItbWFwcyAocmVkdWNlIGludG8ge30gbWFwLW9yLW1hcHMpKVxuICAgICAgICB3YWxrIChmbiB3YWxrIFtmb3JtXVxuICAgICAgICAgICAgICAgKGNvbmRcbiAgICAgICAgICAgICAgICAgKGNvbnRhaW5zPyBzbWFwIGZvcm0pIChzbWFwIGZvcm0pXG4gICAgICAgICAgICAgICAgIChtYXA/IGZvcm0pICh3aXRoLW1ldGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW50byAoZW1wdHkgZm9ybSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb3IgW1trIHZdIGZvcm1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsod2FsayBrKSAod2FsayB2KV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXRhIGZvcm0pKVxuICAgICAgICAgICAgICAgICAoc2VxPyBmb3JtKSAod2l0aC1tZXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXAgd2FsayBmb3JtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWV0YSBmb3JtKSlcbiAgICAgICAgICAgICAgICAgKGNvbGw/IGZvcm0pICh3aXRoLW1ldGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGludG8gKGVtcHR5IGZvcm0pIChtYXAgd2FsaykgZm9ybSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1ldGEgZm9ybSkpXG4gICAgICAgICAgICAgICAgIDplbHNlIGZvcm0pKV1cbiAgICBgKGRvIH5AKG1hcCB3YWxrIGJvZHkpKSkpXG5cbiJdfQ==