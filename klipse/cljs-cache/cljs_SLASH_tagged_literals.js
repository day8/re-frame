// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('cljs.tagged_literals');
goog.require('cljs.core');
goog.require('cljs.reader');
cljs.tagged_literals.read_queue = (function cljs$tagged_literals$read_queue(form){
if(cljs.core.vector_QMARK_(form)){
} else {
throw (new Error("Queue literal expects a vector for its elements."));
}

return cljs.core._conj(cljs.core._conj((function (){var x__10373__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__10373__auto__);
})(),new cljs.core.Symbol(null,"cljs.core.PersistentQueue.EMPTY","cljs.core.PersistentQueue.EMPTY",399917828,null)),new cljs.core.Symbol("cljs.core","into","cljs.core/into",1879938733,null));
});
cljs.tagged_literals.read_uuid = (function cljs$tagged_literals$read_uuid(form){
if(typeof form === 'string'){
} else {
throw (new Error("UUID literal expects a string as its representation."));
}

try{return cljs.core.uuid(form);
}catch (e16378){var e = e16378;
throw (new Error(e.message));
}});
cljs.tagged_literals.read_inst = (function cljs$tagged_literals$read_inst(form){
if(typeof form === 'string'){
} else {
throw (new Error("Instance literal expects a string for its timestamp."));
}

try{return cljs.reader.read_date(form);
}catch (e16381){var e = e16381;
throw (new Error(e.message));
}});
cljs.tagged_literals.valid_js_literal_key_QMARK_ = (function cljs$tagged_literals$valid_js_literal_key_QMARK_(k){
return (typeof k === 'string') || (((k instanceof cljs.core.Keyword)) && ((cljs.core.namespace(k) == null)));
});

/**
* @constructor
*/
cljs.tagged_literals.JSValue = (function (val){
this.val = val;
})

cljs.tagged_literals.JSValue.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"val","val",1769233139,null)], null);
});

cljs.tagged_literals.JSValue.cljs$lang$type = true;

cljs.tagged_literals.JSValue.cljs$lang$ctorStr = "cljs.tagged-literals/JSValue";

cljs.tagged_literals.JSValue.cljs$lang$ctorPrWriter = (function (this__10096__auto__,writer__10097__auto__,opt__10098__auto__){
return cljs.core._write(writer__10097__auto__,"cljs.tagged-literals/JSValue");
});

cljs.tagged_literals.__GT_JSValue = (function cljs$tagged_literals$__GT_JSValue(val){
return (new cljs.tagged_literals.JSValue(val));
});

cljs.tagged_literals.read_js = (function cljs$tagged_literals$read_js(form){
if((cljs.core.vector_QMARK_(form)) || (cljs.core.map_QMARK_(form))){
} else {
throw (new Error("JavaScript literal must use map or vector notation"));
}

if((!(cljs.core.map_QMARK_(form))) || (cljs.core.every_QMARK_(cljs.tagged_literals.valid_js_literal_key_QMARK_,cljs.core.keys(form)))){
} else {
throw (new Error("JavaScript literal keys must be strings or unqualified keywords"));
}

return (new cljs.tagged_literals.JSValue(form));
});
cljs.tagged_literals._STAR_cljs_data_readers_STAR_ = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol(null,"queue","queue",-1198599890,null),cljs.tagged_literals.read_queue,new cljs.core.Symbol(null,"uuid","uuid",-504564192,null),cljs.tagged_literals.read_uuid,new cljs.core.Symbol(null,"inst","inst",-2008473268,null),cljs.tagged_literals.read_inst,new cljs.core.Symbol(null,"js","js",-886355190,null),cljs.tagged_literals.read_js], null)], 0));
