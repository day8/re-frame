// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.subs");
re_frame.subs.kind = new cljs.core.Keyword(null,"sub","sub",(-2093760025));
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,re_frame.subs.kind))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.subs.query__GT_reaction = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Causes all subscriptions to be removed from the cache.
 *   Does this by:
 *   1. running `on-dispose` on all cached subscriptions
 *   2. Each `on-dispose` will perform the removal of themselves.
 * 
 *   This is for development time use. Useful when reloading Figwheel code
 *   after a React exception, because React components won't have been
 *   cleaned up properly. And this, in turn, means the subscriptions within those
 *   components won't have been cleaned up correctly. So this forces the issue.
 */
re_frame.subs.clear_subscription_cache_BANG_ = (function re_frame$subs$clear_subscription_cache_BANG_(){
var seq__863_879 = cljs.core.seq.call(null,cljs.core.deref.call(null,re_frame.subs.query__GT_reaction));
var chunk__864_880 = null;
var count__865_881 = (0);
var i__866_882 = (0);
while(true){
if((i__866_882 < count__865_881)){
var vec__873_883 = cljs.core._nth.call(null,chunk__864_880,i__866_882);
var k_884 = cljs.core.nth.call(null,vec__873_883,(0),null);
var rxn_885 = cljs.core.nth.call(null,vec__873_883,(1),null);
re_frame.interop.dispose_BANG_.call(null,rxn_885);


var G__886 = seq__863_879;
var G__887 = chunk__864_880;
var G__888 = count__865_881;
var G__889 = (i__866_882 + (1));
seq__863_879 = G__886;
chunk__864_880 = G__887;
count__865_881 = G__888;
i__866_882 = G__889;
continue;
} else {
var temp__9646__auto___890 = cljs.core.seq.call(null,seq__863_879);
if(temp__9646__auto___890){
var seq__863_891__$1 = temp__9646__auto___890;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__863_891__$1)){
var c__11729__auto___892 = cljs.core.chunk_first.call(null,seq__863_891__$1);
var G__893 = cljs.core.chunk_rest.call(null,seq__863_891__$1);
var G__894 = c__11729__auto___892;
var G__895 = cljs.core.count.call(null,c__11729__auto___892);
var G__896 = (0);
seq__863_879 = G__893;
chunk__864_880 = G__894;
count__865_881 = G__895;
i__866_882 = G__896;
continue;
} else {
var vec__876_897 = cljs.core.first.call(null,seq__863_891__$1);
var k_898 = cljs.core.nth.call(null,vec__876_897,(0),null);
var rxn_899 = cljs.core.nth.call(null,vec__876_897,(1),null);
re_frame.interop.dispose_BANG_.call(null,rxn_899);


var G__900 = cljs.core.next.call(null,seq__863_891__$1);
var G__901 = null;
var G__902 = (0);
var G__903 = (0);
seq__863_879 = G__900;
chunk__864_880 = G__901;
count__865_881 = G__902;
i__866_882 = G__903;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.deref.call(null,re_frame.subs.query__GT_reaction)))){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"Subscription cache should be empty after clearing it.");
} else {
return null;
}
});
/**
 * Unregisters all existing subscription handlers
 */
re_frame.subs.clear_all_handlers_BANG_ = (function re_frame$subs$clear_all_handlers_BANG_(){
re_frame.registrar.clear_handlers.call(null,re_frame.subs.kind);

return re_frame.subs.clear_subscription_cache_BANG_.call(null);
});
/**
 * cache the reaction r
 */
re_frame.subs.cache_and_return = (function re_frame$subs$cache_and_return(query_v,dynv,r){
var cache_key = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [query_v,dynv], null);
re_frame.interop.add_on_dispose_BANG_.call(null,r,(function (){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__904 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__905 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),re_frame.utils.first_in_vector.call(null,query_v),new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("sub","dispose","sub/dispose",(365440536)),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query-v","query-v",(-1514170131)),query_v,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,r)], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__905);

try{try{return cljs.core.swap_BANG_.call(null,re_frame.subs.query__GT_reaction,(function (query_cache){
if(((cljs.core.contains_QMARK_.call(null,query_cache,cache_key)) && ((r === cljs.core.get.call(null,query_cache,cache_key))))){
return cljs.core.dissoc.call(null,query_cache,cache_key);
} else {
return query_cache;
}
}));
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___906 = re_frame.interop.now.call(null);
var duration__23__auto___907 = (end__22__auto___906 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___907,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___906);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__904);
}} else {
return cljs.core.swap_BANG_.call(null,re_frame.subs.query__GT_reaction,(function (query_cache){
if(((cljs.core.contains_QMARK_.call(null,query_cache,cache_key)) && ((r === cljs.core.get.call(null,query_cache,cache_key))))){
return cljs.core.dissoc.call(null,query_cache,cache_key);
} else {
return query_cache;
}
}));
}
}));

cljs.core.swap_BANG_.call(null,re_frame.subs.query__GT_reaction,(function (query_cache){
if(re_frame.interop.debug_enabled_QMARK_){
if(cljs.core.contains_QMARK_.call(null,query_cache,cache_key)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: Adding a new subscription to the cache while there is an existing subscription in the cache",cache_key);
} else {
}
} else {
}

return cljs.core.assoc.call(null,query_cache,cache_key,r);
}));

if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___908 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,r)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,r)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___908);

} else {
}

return r;
});
re_frame.subs.cache_lookup = (function re_frame$subs$cache_lookup(var_args){
var G__910 = arguments.length;
switch (G__910) {
case (1):
return re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1 = (function (query_v){
return re_frame.subs.cache_lookup.call(null,query_v,cljs.core.PersistentVector.EMPTY);
}));

(re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2 = (function (query_v,dyn_v){
return cljs.core.get.call(null,cljs.core.deref.call(null,re_frame.subs.query__GT_reaction),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [query_v,dyn_v], null));
}));

(re_frame.subs.cache_lookup.cljs$lang$maxFixedArity = (2));

/**
 * Given a `query`, returns a Reagent `reaction` which, over
 *   time, reactively delivers a stream of values. So in FRP-ish terms,
 *   it returns a `Signal`.
 * 
 *   To obtain the returned Signal/Stream's current value, it must be `deref`ed.
 * 
 *   `query` is a vector of at least one element. The first element is the
 *   `query-id`, typically a namespaced keyword. The rest of the vector's
 *   elements are optional, additional values which parameterise the query
 *   performed.
 * 
 *   `dynv` is an optional 3rd argument, which is a vector of further input
 *   signals (atoms, reactions, etc), NOT values. This argument exists for
 *   historical reasons and is borderline deprecated these days.
 * 
 *   Example Usage:
 *   --------------
 * 
 *  (subscribe [:items])
 *  (subscribe [:items "blue" :small])
 *  (subscribe [:items {:colour "blue"  :size :small}])
 * 
 *   Note: for any given call to `subscribe` there must have been a previous call
 *   to `reg-sub`, registering the query handler (function) for the `query-id` given.
 * 
 *   Hint
 *   ----
 * 
 *   When used in a view function BE SURE to `deref` the returned value.
 *   In fact, to avoid any mistakes, some prefer to define:
 * 
 *   (def <sub  (comp deref re-frame.core/subscribe))
 * 
 *   And then, within their views, they call  `(<sub [:items :small])` rather
 *   than using `subscribe` directly.
 * 
 *   De-duplication
 *   --------------
 * 
 *   XXX
 *   
 */
re_frame.subs.subscribe = (function re_frame$subs$subscribe(var_args){
var G__913 = arguments.length;
switch (G__913) {
case (1):
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1 = (function (query){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__914 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__915 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),re_frame.utils.first_in_vector.call(null,query),new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("sub","create","sub/create",(-1301317560)),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-v","query-v",(-1514170131)),query], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__915);

try{try{var temp__9584__auto__ = re_frame.subs.cache_lookup.call(null,query);
if(cljs.core.truth_(temp__9584__auto__)){
var cached = temp__9584__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___919 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___919);

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector.call(null,query);
var handler_fn = re_frame.registrar.get_handler.call(null,re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___920 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___920);

} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___921 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___921);

} else {
}

return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join(''));
} else {
return re_frame.subs.cache_and_return.call(null,query,cljs.core.PersistentVector.EMPTY,handler_fn.call(null,re_frame.db.app_db,query));
}
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___922 = re_frame.interop.now.call(null);
var duration__23__auto___923 = (end__22__auto___922 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___923,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___922);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__914);
}} else {
var temp__9584__auto__ = re_frame.subs.cache_lookup.call(null,query);
if(cljs.core.truth_(temp__9584__auto__)){
var cached = temp__9584__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___924 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___924);

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector.call(null,query);
var handler_fn = re_frame.registrar.get_handler.call(null,re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___925 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___925);

} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___926 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___926);

} else {
}

return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join(''));
} else {
return re_frame.subs.cache_and_return.call(null,query,cljs.core.PersistentVector.EMPTY,handler_fn.call(null,re_frame.db.app_db,query));
}
}
}
}));

(re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$2 = (function (query,dynv){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__916 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__917 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),re_frame.utils.first_in_vector.call(null,query),new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("sub","create","sub/create",(-1301317560)),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query-v","query-v",(-1514170131)),query,new cljs.core.Keyword(null,"dyn-v","dyn-v",(949994592)),dynv], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__917);

try{try{var temp__9584__auto__ = re_frame.subs.cache_lookup.call(null,query,dynv);
if(cljs.core.truth_(temp__9584__auto__)){
var cached = temp__9584__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___927 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___927);

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector.call(null,query);
var handler_fn = re_frame.registrar.get_handler.call(null,re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___928 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___928);

} else {
}

if(re_frame.interop.debug_enabled_QMARK_){
var temp__9646__auto___929 = cljs.core.not_empty.call(null,cljs.core.remove.call(null,re_frame.interop.ratom_QMARK_,dynv));
if(cljs.core.truth_(temp__9646__auto___929)){
var not_reactive_930 = temp__9646__auto___929;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom:",not_reactive_930);
} else {
}
} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___931 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___931);

} else {
}

return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join(''));
} else {
var dyn_vals = re_frame.interop.make_reaction.call(null,(function (){
return cljs.core.mapv.call(null,cljs.core.deref,dynv);
}));
var sub = re_frame.interop.make_reaction.call(null,(function (){
return handler_fn.call(null,re_frame.db.app_db,query,cljs.core.deref.call(null,dyn_vals));
}));
return re_frame.subs.cache_and_return.call(null,query,dynv,re_frame.interop.make_reaction.call(null,(function (){
return cljs.core.deref.call(null,cljs.core.deref.call(null,sub));
})));
}
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___932 = re_frame.interop.now.call(null);
var duration__23__auto___933 = (end__22__auto___932 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___933,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___932);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__916);
}} else {
var temp__9584__auto__ = re_frame.subs.cache_lookup.call(null,query,dynv);
if(cljs.core.truth_(temp__9584__auto__)){
var cached = temp__9584__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___934 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),true,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),re_frame.interop.reagent_id.call(null,cached)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___934);

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector.call(null,query);
var handler_fn = re_frame.registrar.get_handler.call(null,re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___935 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cached?","cached?",(86081880)),false], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___935);

} else {
}

if(re_frame.interop.debug_enabled_QMARK_){
var temp__9646__auto___936 = cljs.core.not_empty.call(null,cljs.core.remove.call(null,re_frame.interop.ratom_QMARK_,dynv));
if(cljs.core.truth_(temp__9646__auto___936)){
var not_reactive_937 = temp__9646__auto___936;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom:",not_reactive_937);
} else {
}
} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___938 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",(-978969032)),true], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___938);

} else {
}

return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join(''));
} else {
var dyn_vals = re_frame.interop.make_reaction.call(null,(function (){
return cljs.core.mapv.call(null,cljs.core.deref,dynv);
}));
var sub = re_frame.interop.make_reaction.call(null,(function (){
return handler_fn.call(null,re_frame.db.app_db,query,cljs.core.deref.call(null,dyn_vals));
}));
return re_frame.subs.cache_and_return.call(null,query,dynv,re_frame.interop.make_reaction.call(null,(function (){
return cljs.core.deref.call(null,cljs.core.deref.call(null,sub));
})));
}
}
}
}));

(re_frame.subs.subscribe.cljs$lang$maxFixedArity = (2));

/**
 * Returns a new version of 'm' in which 'f' has been applied to each value.
 *   (map-vals inc {:a 4, :b 2}) => {:a 5, :b 3}
 */
re_frame.subs.map_vals = (function re_frame$subs$map_vals(f,m){
return cljs.core.into.call(null,cljs.core.empty.call(null,m),cljs.core.map.call(null,(function (p__939){
var vec__940 = p__939;
var k = cljs.core.nth.call(null,vec__940,(0),null);
var v = cljs.core.nth.call(null,vec__940,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,f.call(null,v)], null);
})),m);
});
/**
 * Runs f over signals. Signals may take several
 *   forms, this function handles all of them.
 */
re_frame.subs.map_signals = (function re_frame$subs$map_signals(f,signals){
if(cljs.core.sequential_QMARK_.call(null,signals)){
return cljs.core.map.call(null,f,signals);
} else {
if(cljs.core.map_QMARK_.call(null,signals)){
return re_frame.subs.map_vals.call(null,f,signals);
} else {
if(re_frame.interop.deref_QMARK_.call(null,signals)){
return f.call(null,signals);
} else {
return cljs.core.List.EMPTY;

}
}
}
});
/**
 * Coerces x to a seq if it isn't one already
 */
re_frame.subs.to_seq = (function re_frame$subs$to_seq(x){
if(cljs.core.sequential_QMARK_.call(null,x)){
return x;
} else {
return (new cljs.core.List(null,x,null,(1),null));
}
});
re_frame.subs.deref_input_signals = (function re_frame$subs$deref_input_signals(signals,query_id){
var dereffed_signals = re_frame.subs.map_signals.call(null,cljs.core.deref,signals);
if(cljs.core.sequential_QMARK_.call(null,signals)){
cljs.core.map.call(null,cljs.core.deref,signals);
} else {
if(cljs.core.map_QMARK_.call(null,signals)){
re_frame.subs.map_vals.call(null,cljs.core.deref,signals);
} else {
if(re_frame.interop.deref_QMARK_.call(null,signals)){
cljs.core.deref.call(null,signals);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: in the reg-sub for",query_id,", the input-signals function returns:",signals);

}
}
}

if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___943 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"input-signals","input-signals",(563633497)),cljs.core.doall.call(null,re_frame.subs.to_seq.call(null,re_frame.subs.map_signals.call(null,re_frame.interop.reagent_id,signals)))], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"input-signals","input-signals",(563633497)),cljs.core.doall.call(null,re_frame.subs.to_seq.call(null,re_frame.subs.map_signals.call(null,re_frame.interop.reagent_id,signals)))], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___943);

} else {
}

return dereffed_signals;
});
/**
 * For a given `query-id`, register two functions: a `computation` function and an `input signals` function.
 *   
 *   During program execution, a call to `subscribe`, such as `(subscribe [:sub-id 3 "blue"])`,
 *   will create a new `:sub-id` node in the Signal Graph. And, at that time, re-frame
 *   needs to know how to create the node.   By calling `reg-sub`, you are registering 
 *   'the template' or 'the mechanism' by which nodes in the Signal Graph can be created. 
 * 
 *   Repeating: calling `reg-sub` does not create a node. It only creates the template
 *   from which nodes can be created later. 
 *   
 *   `reg-sub` arguments are:  
 *  - a `query-id` (typically a namespaced keyword)
 *  - a function which returns the inputs required by this kind of node (can be supplied  in one of three ways) 
 *  - a function which computes the value of this kind of node 
 * 
 *   The `computation function` is always the last argument supplied and it is expected to have the signature: 
 *  `(input-values, query-vector) -> a-value`
 *   
 *   When `computation function` is called, the `query-vector` argument will be the vector supplied to the 
 *   the `subscribe` which caused the node to be created. So, if the call was `(subscribe [:sub-id 3 "blue"])`, 
 *   then the `query-vector` supplied to the computaton function will be `[:sub-id 3 "blue"]`.
 * 
 *   The arguments supplied between the `query-id` and the `computation-function` can vary in 3 ways, 
 *   but whatever is there defines the `input signals` part of the template, controlling what input 
 *  values "flow into" the `computation function` gets when it is called. 
 * 
 *   `reg-sub` can be called in one of three ways, because there are three ways to define the input signals part.
 *   But note, the 2nd method, in which a `signal-fn` is explicitly supplied, is the most canonical and instructive. The other 
 *   two are really just sugary variations. 
 * 
 *   1. No input signals given:
 *    ```clj
 *   (reg-sub
 *     :query-id
 *     a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
 *   ```
 * 
 *   In the absence of an explicit `input-fn`, the node's input signal defaults to `app-db`
 *   and, as a result, the value within `app-db` (a map) is
 *   is given as the 1st argument when `a-computation-fn` is called.   
 *  
 * 
 *   2. A signal function is explicitly supplied:
 *   ```clj
 *   (reg-sub
 *     :query-id
 *     signal-fn     ;; <-- here
 *     computation-fn)
 *   ```
 *   
 *   This is the most canonical and instructive of the three variations.
 *   
 *   When a node is created from the template, the `signal-fn` will be called and it
 *   is expected to return the input signal(s) as either a singleton, if there is only
 *   one, or a sequence if there are many, or a map with the signals as the values.
 * 
 *   The values from returned nominated signals will be supplied as the 1st argument to  
 *   the `a-computation-fn` when it is called - and subject to what this `signal-fn` returns, 
 *   this value will be either a singleton, sequence or map of them (paralleling
 *   the structure returned by the `signal-fn`).
 * 
 *   This example `signal-fn` returns a vector of input signals.
 *     ```clj
 *     (fn [query-vec dynamic-vec]
 *       [(subscribe [:a-sub])
 *        (subscribe [:b-sub])])
 *     ```
 *   The associated computation function must be written
 *   to expect a vector of values for its first argument:
 *     ```clj
 *     (fn [[a b] query-vec]     ;; 1st argument is a seq of two values
 *       ....)
 *      ```
 * 
 *   If, on the other hand, the signal function was simpler and returned a singleton, like this:
 *      ```clj
 *      (fn [query-vec dynamic-vec]
 *        (subscribe [:a-sub]))
 *      ```
 *   then the associated computation function must be written to expect a single value
 *   as the 1st argument:
 *      ```clj
 *      (fn [a query-vec]       ;; 1st argument is a single value
 *        ...)
 *      ```
 *  
 *   Further Note: variation #1 above, in which an `input-fn` was not supplied, like this:
 *     ```clj
 *   (reg-sub
 *     :query-id
 *     a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
 *   ```
 *   is the equivalent of using this
 *   2nd variation and explicitly suppling a `signal-fn` which returns `app-db`:
 *   ```clj
 *   (reg-sub
 *     :query-id
 *     (fn [_ _]  re-frame/app-db)   ;; <--- explicit input-fn 
 *     a-computation-fn)             ;; has signature:  (fn [db query-vec]  ... ret-value)
 *   ```
 *  
 *   3. Syntax Sugar
 * 
 *   ```clj
 *   (reg-sub
 *     :a-b-sub
 *     :<- [:a-sub]
 *     :<- [:b-sub]
 *     (fn [[a b] query-vec]    ;; 1st argument is a seq of two values
 *       {:a a :b b}))
 *   ```
 * 
 *   This 3rd variation is just syntactic sugar for the 2nd.  Instead of providing an
 *   `signals-fn` you provide one or more pairs of `:<-` and a subscription vector.
 * 
 *   If you supply only one pair a singleton will be supplied to the computation function, 
 *   as if you had supplied a `signal-fn` returning only a single value:
 * 
 *   ```clj
 *   (reg-sub
 *     :a-sub
 *     :<- [:a-sub]
 *     (fn [a query-vec]      ;; only one pair, so 1st argument is a single value
 *       ...))
 *   ```
 * 
 *   For further understanding, read `/docs`, and look at the detailed comments in
 *   /examples/todomvc/src/subs.cljs
 *   
 */
re_frame.subs.reg_sub = (function re_frame$subs$reg_sub(var_args){
var args__12462__auto__ = [];
var len__12445__auto___954 = arguments.length;
var i__12446__auto___955 = (0);
while(true){
if((i__12446__auto___955 < len__12445__auto___954)){
args__12462__auto__.push((arguments[i__12446__auto___955]));

var G__956 = (i__12446__auto___955 + (1));
i__12446__auto___955 = G__956;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return re_frame.subs.reg_sub.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(re_frame.subs.reg_sub.cljs$core$IFn$_invoke$arity$variadic = (function (query_id,args){
var computation_fn = cljs.core.last.call(null,args);
var input_args = cljs.core.butlast.call(null,args);
var err_header = ["re-frame: reg-sub for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),", "].join('');
var inputs_fn = (function (){var G__946 = cljs.core.count.call(null,input_args);
switch (G__946) {
case (0):
return (function() {
var G__958 = null;
var G__958__1 = (function (_){
return re_frame.db.app_db;
});
var G__958__2 = (function (_,___$1){
return re_frame.db.app_db;
});
G__958 = function(_,___$1){
switch(arguments.length){
case 1:
return G__958__1.call(this,_);
case 2:
return G__958__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__958.cljs$core$IFn$_invoke$arity$1 = G__958__1;
G__958.cljs$core$IFn$_invoke$arity$2 = G__958__2;
return G__958;
})()

break;
case (1):
var f = cljs.core.first.call(null,input_args);
if(cljs.core.fn_QMARK_.call(null,f)){
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),err_header,"2nd argument expected to be an inputs function, got:",f);
}

return f;

break;
case (2):
var vec__947 = input_args;
var marker = cljs.core.nth.call(null,vec__947,(0),null);
var vec = cljs.core.nth.call(null,vec__947,(1),null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"<-","<-",(760412998)),marker)){
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),err_header,"expected :<-, got:",marker);
}

return (function() {
var re_frame$subs$inp_fn = null;
var re_frame$subs$inp_fn__1 = (function (_){
return re_frame.subs.subscribe.call(null,vec);
});
var re_frame$subs$inp_fn__2 = (function (_,___$1){
return re_frame.subs.subscribe.call(null,vec);
});
re_frame$subs$inp_fn = function(_,___$1){
switch(arguments.length){
case 1:
return re_frame$subs$inp_fn__1.call(this,_);
case 2:
return re_frame$subs$inp_fn__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$1 = re_frame$subs$inp_fn__1;
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$inp_fn__2;
return re_frame$subs$inp_fn;
})()

break;
default:
var pairs = cljs.core.partition.call(null,(2),input_args);
var markers = cljs.core.map.call(null,cljs.core.first,pairs);
var vecs = cljs.core.map.call(null,cljs.core.last,pairs);
if(((cljs.core.every_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"<-","<-",(760412998)),null], null), null),markers)) && (cljs.core.every_QMARK_.call(null,cljs.core.vector_QMARK_,vecs)))){
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),err_header,"expected pairs of :<- and vectors, got:",pairs);
}

return (function() {
var re_frame$subs$inp_fn = null;
var re_frame$subs$inp_fn__1 = (function (_){
return cljs.core.map.call(null,re_frame.subs.subscribe,vecs);
});
var re_frame$subs$inp_fn__2 = (function (_,___$1){
return cljs.core.map.call(null,re_frame.subs.subscribe,vecs);
});
re_frame$subs$inp_fn = function(_,___$1){
switch(arguments.length){
case 1:
return re_frame$subs$inp_fn__1.call(this,_);
case 2:
return re_frame$subs$inp_fn__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$1 = re_frame$subs$inp_fn__1;
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$inp_fn__2;
return re_frame$subs$inp_fn;
})()

}
})();
return re_frame.registrar.register_handler.call(null,re_frame.subs.kind,query_id,(function() {
var re_frame$subs$subs_handler_fn = null;
var re_frame$subs$subs_handler_fn__2 = (function (db,query_vec){
var subscriptions = inputs_fn.call(null,query_vec);
var reaction_id = cljs.core.atom.call(null,null);
var reaction = re_frame.interop.make_reaction.call(null,(function (){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__950 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__951 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),re_frame.utils.first_in_vector.call(null,query_vec),new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("sub","run","sub/run",(-1821315581)),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query-v","query-v",(-1514170131)),query_vec,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),cljs.core.deref.call(null,reaction_id)], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__951);

try{try{var subscription = computation_fn.call(null,re_frame.subs.deref_input_signals.call(null,subscriptions,query_id),query_vec);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___959 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___959);

} else {
}

return subscription;
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___960 = re_frame.interop.now.call(null);
var duration__23__auto___961 = (end__22__auto___960 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___961,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___960);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__950);
}} else {
var subscription = computation_fn.call(null,re_frame.subs.deref_input_signals.call(null,subscriptions,query_id),query_vec);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___962 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___962);

} else {
}

return subscription;
}
}));
cljs.core.reset_BANG_.call(null,reaction_id,re_frame.interop.reagent_id.call(null,reaction));

return reaction;
});
var re_frame$subs$subs_handler_fn__3 = (function (db,query_vec,dyn_vec){
var subscriptions = inputs_fn.call(null,query_vec,dyn_vec);
var reaction_id = cljs.core.atom.call(null,null);
var reaction = re_frame.interop.make_reaction.call(null,(function (){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__952 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__953 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),re_frame.utils.first_in_vector.call(null,query_vec),new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("sub","run","sub/run",(-1821315581)),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query-v","query-v",(-1514170131)),query_vec,new cljs.core.Keyword(null,"dyn-v","dyn-v",(949994592)),dyn_vec,new cljs.core.Keyword(null,"reaction","reaction",(490869788)),cljs.core.deref.call(null,reaction_id)], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__953);

try{try{var subscription = computation_fn.call(null,re_frame.subs.deref_input_signals.call(null,subscriptions,query_id),query_vec,dyn_vec);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___963 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___963);

} else {
}

return subscription;
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___964 = re_frame.interop.now.call(null);
var duration__23__auto___965 = (end__22__auto___964 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___965,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___964);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__952);
}} else {
var subscription = computation_fn.call(null,re_frame.subs.deref_input_signals.call(null,subscriptions,query_id),query_vec,dyn_vec);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___966 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",(305978217)),subscription], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___966);

} else {
}

return subscription;
}
}));
cljs.core.reset_BANG_.call(null,reaction_id,re_frame.interop.reagent_id.call(null,reaction));

return reaction;
});
re_frame$subs$subs_handler_fn = function(db,query_vec,dyn_vec){
switch(arguments.length){
case 2:
return re_frame$subs$subs_handler_fn__2.call(this,db,query_vec);
case 3:
return re_frame$subs$subs_handler_fn__3.call(this,db,query_vec,dyn_vec);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$subs_handler_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$subs_handler_fn__2;
re_frame$subs$subs_handler_fn.cljs$core$IFn$_invoke$arity$3 = re_frame$subs$subs_handler_fn__3;
return re_frame$subs$subs_handler_fn;
})()
);
}));

(re_frame.subs.reg_sub.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frame.subs.reg_sub.cljs$lang$applyTo = (function (seq944){
var G__945 = cljs.core.first.call(null,seq944);
var seq944__$1 = cljs.core.next.call(null,seq944);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__945,seq944__$1);
}));


//# sourceURL=re_frame/subs.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvc3Vicy5qcyIsInNvdXJjZXMiOlsic3Vicy5jbGpzIl0sImxpbmVDb3VudCI6ODkxLCJtYXBwaW5ncyI6IjtBQVNBLHFCQUFBLHJCQUFLQTtBQUNMLG9CQUFRLEFBQUNFLG1DQUF5QkY7QUFBbEM7QUFBQSxBQUFBLE1BQUEsS0FBQUMsTUFBQTs7QUFPQSxBQUFLRSxtQ0FBZ0IseUJBQUEsekJBQUNDO0FBRXRCOzs7Ozs7Ozs7OzsrQ0FBQSwvQ0FBTUM7QUFBTixBQVdFLElBQUFDLGVBQUEsQUFBQUMsd0JBQUEsQUFBQUMsMEJBQWlCTDtJQUFqQk0saUJBQUE7SUFBQUMsaUJBQUE7SUFBQUMsYUFBQTs7QUFBQSxBQUFBLEdBQUEsQUFBQSxDQUFBQSxhQUFBRDtBQUFBLElBQUFFLGVBQUEsQUFBQUMseUJBQUFKLGVBQUFFO1lBQUEsQUFBQUcsd0JBQUFGLGFBQUEsSUFBQSxqREFBU1k7Y0FBVCxBQUFBVix3QkFBQUYsYUFBQSxJQUFBLG5EQUFXYTtBQUFYLEFBQUEsQUFDRSxBQUFDQyx5Q0FBU0Q7O0FBRFo7QUFBQSxhQUFBbkI7YUFBQUc7YUFBQUM7YUFBQSxDQUFBQyxhQUFBOzs7Ozs7O0FBQUEsSUFBQUkseUJBQUEsQUFBQVIsd0JBQUFEO0FBQUEsQUFBQSxHQUFBUztBQUFBLEFBQUEsSUFBQVQsbUJBQUFTO0FBQUEsQUFBQSxHQUFBLEFBQUFDLHVDQUFBVjtBQUFBLElBQUFXLHVCQUFBLEFBQUFDLGdDQUFBWjtBQUFBLEFBQUEsYUFBQSxBQUFBYSwrQkFBQWI7YUFBQVc7YUFBQSxBQUFBRywwQkFBQUg7YUFBQTs7Ozs7OztBQUFBLElBQUFJLGVBQUEsQUFBQUMsMEJBQUFoQjtZQUFBLEFBQUFRLHdCQUFBTyxhQUFBLElBQUEsakRBQVNHO2NBQVQsQUFBQVYsd0JBQUFPLGFBQUEsSUFBQSxuREFBV0k7QUFBWCxBQUFBLEFBQ0UsQUFBQ0MseUNBQVNEOztBQURaO0FBQUEsYUFBQSxBQUFBRix5QkFBQWpCO2FBQUE7YUFBQTthQUFBOzs7Ozs7OztB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RSxTQUFBLDBCQUFBRCwxQkE0MUZnRHZGO0lBNTFGaER1RixhQUFBLHlCQUFBQSx6QkE2MUZrRHRGO0FBNzFGbEQsQUFBQSxJQUFBd0Ysc0JBQUE7QUFBQSxBQUFBLE9BQUFBLHlEQUFBRCxPQUFBRDs7O0FBQUEiLCJuYW1lcyI6WyJyZS1mcmFtZS5zdWJzL2tpbmQiLCJqcy9FcnJvciIsInJlLWZyYW1lLnJlZ2lzdHJhci9raW5kcyIsInJlLWZyYW1lLnN1YnMvcXVlcnktPnJlYWN0aW9uIiwiY2xqcy5jb3JlL2F0b20iLCJyZS1mcmFtZS5zdWJzL2NsZWFyLXN1YnNjcmlwdGlvbi1jYWNoZSEiLCJzZXFfXzg2MyIsImNsanMuY29yZS9zZXEiLCJjbGpzLmNvcmUvZGVyZWYiLCJjaHVua19fODY0IiwiY291bnRfXzg2NSIsImlfXzg2NiIsInZlY19fODczIiwiY2xqcy5jb3JlLy1udGgiLCJjbGpzLmNvcmUvbnRoIiwidGVtcF9fOTY0Nl9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rZWQtc2VxPyIsImNfXzExNzI5X19hdXRvX18iLCJjbGpzLmNvcmUvY2h1bmstZmlyc3QiLCJjbGpzLmNvcmUvY2h1bmstcmVzdCIsImNsanMuY29yZS9jb3VudCIsInZlY19fODc2IiwiY2xqcy5jb3JlL2ZpcnN0IiwiY2xqcy5jb3JlL25leHQiLCJrIiwicnhuIiwicmUtZnJhbWUuaW50ZXJvcC9kaXNwb3NlISIsImNsanMuY29yZS9ub3QtZW1wdHkiLCJyZS1mcmFtZS5sb2dnZXJzL2NvbnNvbGUiLCJyZS1mcmFtZS5zdWJzL2NsZWFyLWFsbC1oYW5kbGVycyEiLCJyZS1mcmFtZS5yZWdpc3RyYXIvY2xlYXItaGFuZGxlcnMiLCJyZS1mcmFtZS5zdWJzL2NhY2hlLWFuZC1yZXR1cm4iLCJxdWVyeS12IiwiZHludiIsInIiLCJjYWNoZS1rZXkiLCJyZS1mcmFtZS5pbnRlcm9wL2FkZC1vbi1kaXNwb3NlISIsInJlLWZyYW1lLnRyYWNlL2lzLXRyYWNlLWVuYWJsZWQ/IiwiKmN1cnJlbnQtdHJhY2UqLW9yaWctdmFsX185MDQiLCJyZS1mcmFtZS50cmFjZS8qY3VycmVudC10cmFjZSoiLCIqY3VycmVudC10cmFjZSotdGVtcC12YWxfXzkwNSIsInJlLWZyYW1lLnRyYWNlL3N0YXJ0LXRyYWNlIiwiZW5kX18yMl9fYXV0b19fIiwicmUtZnJhbWUuaW50ZXJvcC9ub3ciLCJkdXJhdGlvbl9fMjNfX2F1dG9fXyIsImNsanMuY29yZS9zd2FwISIsInJlLWZyYW1lLnRyYWNlL3RyYWNlcyIsImNsanMuY29yZS9jb25qIiwiY2xqcy5jb3JlL2Fzc29jIiwicmUtZnJhbWUudHJhY2UvcnVuLXRyYWNpbmctY2FsbGJhY2tzISIsInJlLWZyYW1lLnV0aWxzL2ZpcnN0LWluLXZlY3RvciIsInJlLWZyYW1lLmludGVyb3AvcmVhZ2VudC1pZCIsInF1ZXJ5LWNhY2hlIiwiY2xqcy5jb3JlL2NvbnRhaW5zPyIsImNsanMuY29yZS9nZXQiLCJjbGpzLmNvcmUvZGlzc29jIiwicmUtZnJhbWUuaW50ZXJvcC9kZWJ1Zy1lbmFibGVkPyIsIm5ldy10cmFjZV9fMjRfX2F1dG9fXyIsImNsanMuY29yZS9tZXJnZSIsImNsanMuY29yZS91cGRhdGUiLCJ2YXJfYXJncyIsIkdfXzkxMCIsInJlLWZyYW1lLnN1YnMvY2FjaGUtbG9va3VwIiwiZHluLXYiLCJHX185MTMiLCJyZS1mcmFtZS5zdWJzL3N1YnNjcmliZSIsInF1ZXJ5IiwiKmN1cnJlbnQtdHJhY2UqLW9yaWctdmFsX185MTQiLCIqY3VycmVudC10cmFjZSotdGVtcC12YWxfXzkxNSIsInRlbXBfXzk1ODRfX2F1dG9fXyIsImNhY2hlZCIsInF1ZXJ5LWlkIiwiaGFuZGxlci1mbiIsInJlLWZyYW1lLnJlZ2lzdHJhci9nZXQtaGFuZGxlciIsInJlLWZyYW1lLmRiL2FwcC1kYiIsIipjdXJyZW50LXRyYWNlKi1vcmlnLXZhbF9fOTE2IiwiKmN1cnJlbnQtdHJhY2UqLXRlbXAtdmFsX185MTciLCJub3QtcmVhY3RpdmUiLCJjbGpzLmNvcmUvcmVtb3ZlIiwicmUtZnJhbWUuaW50ZXJvcC9yYXRvbT8iLCJkeW4tdmFscyIsInJlLWZyYW1lLmludGVyb3AvbWFrZS1yZWFjdGlvbiIsImNsanMuY29yZS9tYXB2Iiwic3ViIiwicmUtZnJhbWUuc3Vicy9tYXAtdmFscyIsImYiLCJtIiwiY2xqcy5jb3JlL2ludG8iLCJjbGpzLmNvcmUvZW1wdHkiLCJjbGpzLmNvcmUvbWFwIiwicF9fOTM5IiwidmVjX185NDAiLCJ2IiwicmUtZnJhbWUuc3Vicy9tYXAtc2lnbmFscyIsInNpZ25hbHMiLCJjbGpzLmNvcmUvc2VxdWVudGlhbD8iLCJjbGpzLmNvcmUvbWFwPyIsInJlLWZyYW1lLmludGVyb3AvZGVyZWY/IiwicmUtZnJhbWUuc3Vicy90by1zZXEiLCJ4IiwiY2xqcy5jb3JlL0xpc3QiLCJyZS1mcmFtZS5zdWJzL2RlcmVmLWlucHV0LXNpZ25hbHMiLCJkZXJlZmZlZC1zaWduYWxzIiwiY2xqcy5jb3JlL2RvYWxsIiwiYXJnc19fMTI0NjJfX2F1dG9fXyIsImxlbl9fMTI0NDVfX2F1dG9fXyIsImlfXzEyNDQ2X19hdXRvX18iLCJhcmdzZXFfXzEyNDYzX19hdXRvX18iLCJyZS1mcmFtZS5zdWJzL3JlZy1zdWIiLCJzZXE5NDQiLCJHX185NDUiLCJzZWxmX18xMjQyMF9fYXV0b19fIiwiYXJncyIsImNvbXB1dGF0aW9uLWZuIiwiY2xqcy5jb3JlL2xhc3QiLCJpbnB1dC1hcmdzIiwiY2xqcy5jb3JlL2J1dGxhc3QiLCJlcnItaGVhZGVyIiwiaW5wdXRzLWZuIiwiR19fOTQ2IiwiXyIsImNsanMuY29yZS9mbj8iLCJ2ZWNfXzk0NyIsIm1hcmtlciIsInZlYyIsImNsanMuY29yZS89IiwicGFpcnMiLCJjbGpzLmNvcmUvcGFydGl0aW9uIiwibWFya2VycyIsInZlY3MiLCJjbGpzLmNvcmUvZXZlcnk/IiwiY2xqcy5jb3JlL3ZlY3Rvcj8iLCJyZS1mcmFtZS5yZWdpc3RyYXIvcmVnaXN0ZXItaGFuZGxlciIsImRiIiwicXVlcnktdmVjIiwic3Vic2NyaXB0aW9ucyIsInJlYWN0aW9uLWlkIiwicmVhY3Rpb24iLCIqY3VycmVudC10cmFjZSotb3JpZy12YWxfXzk1MCIsIipjdXJyZW50LXRyYWNlKi10ZW1wLXZhbF9fOTUxIiwic3Vic2NyaXB0aW9uIiwiY2xqcy5jb3JlL3Jlc2V0ISIsImR5bi12ZWMiLCIqY3VycmVudC10cmFjZSotb3JpZy12YWxfXzk1MiIsIipjdXJyZW50LXRyYWNlKi10ZW1wLXZhbF9fOTUzIiwiY2xqcy5jb3JlL0luZGV4ZWRTZXEiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlLWZyYW1lLnN1YnNcbiAoOnJlcXVpcmVcbiAgIFtyZS1mcmFtZS5kYiAgICAgICAgOnJlZmVyIFthcHAtZGJdXVxuICAgW3JlLWZyYW1lLmludGVyb3AgICA6cmVmZXIgW2FkZC1vbi1kaXNwb3NlISBkZWJ1Zy1lbmFibGVkPyBtYWtlLXJlYWN0aW9uIHJhdG9tPyBkZXJlZj8gZGlzcG9zZSEgcmVhZ2VudC1pZF1dXG4gICBbcmUtZnJhbWUubG9nZ2VycyAgIDpyZWZlciBbY29uc29sZV1dXG4gICBbcmUtZnJhbWUudXRpbHMgICAgIDpyZWZlciBbZmlyc3QtaW4tdmVjdG9yXV1cbiAgIFtyZS1mcmFtZS5yZWdpc3RyYXIgOnJlZmVyIFtnZXQtaGFuZGxlciBjbGVhci1oYW5kbGVycyByZWdpc3Rlci1oYW5kbGVyXV1cbiAgIFtyZS1mcmFtZS50cmFjZSAgICAgOmFzIHRyYWNlIDppbmNsdWRlLW1hY3JvcyB0cnVlXSkpXG5cbihkZWYga2luZCA6c3ViKVxuKGFzc2VydCAocmUtZnJhbWUucmVnaXN0cmFyL2tpbmRzIGtpbmQpKVxuXG47OyAtLSBjYWNoZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG47O1xuOzsgRGUtZHVwbGljYXRlIHN1YnNjcmlwdGlvbnMuIElmIHR3byBvciBtb3JlIGVxdWFsIHN1YnNjcmlwdGlvbnNcbjs7IGFyZSBjb25jdXJyZW50bHkgYWN0aXZlLCB3ZSB3YW50IG9ubHkgb25lIGhhbmRsZXIgcnVubmluZy5cbjs7IFR3byBzdWJzY3JpcHRpb25zIGFyZSBcImVxdWFsXCIgaWYgdGhlaXIgcXVlcnkgdmVjdG9ycyB0ZXN0IFwiPVwiLlxuKGRlZiBxdWVyeS0+cmVhY3Rpb24gKGF0b20ge30pKVxuXG4oZGVmbiBjbGVhci1zdWJzY3JpcHRpb24tY2FjaGUhXG4gIFwiQ2F1c2VzIGFsbCBzdWJzY3JpcHRpb25zIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgY2FjaGUuXG4gIERvZXMgdGhpcyBieTpcbiAgICAgMS4gcnVubmluZyBgb24tZGlzcG9zZWAgb24gYWxsIGNhY2hlZCBzdWJzY3JpcHRpb25zXG4gICAgIDIuIEVhY2ggYG9uLWRpc3Bvc2VgIHdpbGwgcGVyZm9ybSB0aGUgcmVtb3ZhbCBvZiB0aGVtc2VsdmVzLlxuXG4gIFRoaXMgaXMgZm9yIGRldmVsb3BtZW50IHRpbWUgdXNlLiBVc2VmdWwgd2hlbiByZWxvYWRpbmcgRmlnd2hlZWwgY29kZVxuICBhZnRlciBhIFJlYWN0IGV4Y2VwdGlvbiwgYmVjYXVzZSBSZWFjdCBjb21wb25lbnRzIHdvbid0IGhhdmUgYmVlblxuICBjbGVhbmVkIHVwIHByb3Blcmx5LiBBbmQgdGhpcywgaW4gdHVybiwgbWVhbnMgdGhlIHN1YnNjcmlwdGlvbnMgd2l0aGluIHRob3NlXG4gIGNvbXBvbmVudHMgd29uJ3QgaGF2ZSBiZWVuIGNsZWFuZWQgdXAgY29ycmVjdGx5LiBTbyB0aGlzIGZvcmNlcyB0aGUgaXNzdWUuXCJcbiAgW11cbiAgKGRvc2VxIFtbayByeG5dIEBxdWVyeS0+cmVhY3Rpb25dXG4gICAgKGRpc3Bvc2UhIHJ4bikpXG4gIChpZiAobm90LWVtcHR5IEBxdWVyeS0+cmVhY3Rpb24pXG4gICAgKGNvbnNvbGUgOndhcm4gXCJTdWJzY3JpcHRpb24gY2FjaGUgc2hvdWxkIGJlIGVtcHR5IGFmdGVyIGNsZWFyaW5nIGl0LlwiKSkpXG5cbihkZWZuIGNsZWFyLWFsbC1oYW5kbGVycyFcbiAgXCJVbnJlZ2lzdGVycyBhbGwgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIGhhbmRsZXJzXCJcbiAgW11cbiAgKGNsZWFyLWhhbmRsZXJzIGtpbmQpXG4gIChjbGVhci1zdWJzY3JpcHRpb24tY2FjaGUhKSlcblxuKGRlZm4gY2FjaGUtYW5kLXJldHVyblxuICBcImNhY2hlIHRoZSByZWFjdGlvbiByXCJcbiAgW3F1ZXJ5LXYgZHludiByXVxuICAobGV0IFtjYWNoZS1rZXkgW3F1ZXJ5LXYgZHludl1dXG4gICAgOzsgd2hlbiB0aGlzIHJlYWN0aW9uIGlzIG5vIGxvbmdlciBiZWluZyB1c2VkLCByZW1vdmUgaXQgZnJvbSB0aGUgY2FjaGVcbiAgICAoYWRkLW9uLWRpc3Bvc2UhIHIgIyh0cmFjZS93aXRoLXRyYWNlIHs6b3BlcmF0aW9uIChmaXJzdC1pbi12ZWN0b3IgcXVlcnktdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3AtdHlwZSAgIDpzdWIvZGlzcG9zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0YWdzICAgICAgezpxdWVyeS12ICBxdWVyeS12XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnJlYWN0aW9uIChyZWFnZW50LWlkIHIpfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2FwISBxdWVyeS0+cmVhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm4gW3F1ZXJ5LWNhY2hlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlmIChhbmQgKGNvbnRhaW5zPyBxdWVyeS1jYWNoZSBjYWNoZS1rZXkpIChpZGVudGljYWw/IHIgKGdldCBxdWVyeS1jYWNoZSBjYWNoZS1rZXkpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpc3NvYyBxdWVyeS1jYWNoZSBjYWNoZS1rZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5LWNhY2hlKSkpKSlcbiAgICA7OyBjYWNoZSB0aGlzIHJlYWN0aW9uLCBzbyBpdCBjYW4gYmUgdXNlZCB0byBkZWR1cGxpY2F0ZSBvdGhlciwgbGF0ZXIgXCI9XCIgc3Vic2NyaXB0aW9uc1xuICAgIChzd2FwISBxdWVyeS0+cmVhY3Rpb24gKGZuIFtxdWVyeS1jYWNoZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdoZW4gZGVidWctZW5hYmxlZD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2hlbiAoY29udGFpbnM/IHF1ZXJ5LWNhY2hlIGNhY2hlLWtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDp3YXJuIFwicmUtZnJhbWU6IEFkZGluZyBhIG5ldyBzdWJzY3JpcHRpb24gdG8gdGhlIGNhY2hlIHdoaWxlIHRoZXJlIGlzIGFuIGV4aXN0aW5nIHN1YnNjcmlwdGlvbiBpbiB0aGUgY2FjaGVcIiBjYWNoZS1rZXkpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc29jIHF1ZXJ5LWNhY2hlIGNhY2hlLWtleSByKSkpXG4gICAgKHRyYWNlL21lcmdlLXRyYWNlISB7OnRhZ3MgezpyZWFjdGlvbiAocmVhZ2VudC1pZCByKX19KVxuICAgIHIpKSA7OyByZXR1cm4gdGhlIGFjdHVhbCByZWFjdGlvblxuXG4oZGVmbiBjYWNoZS1sb29rdXBcbiAgKFtxdWVyeS12XVxuICAgKGNhY2hlLWxvb2t1cCBxdWVyeS12IFtdKSlcbiAgKFtxdWVyeS12IGR5bi12XVxuICAgKGdldCBAcXVlcnktPnJlYWN0aW9uIFtxdWVyeS12IGR5bi12XSkpKVxuXG5cbjs7IC0tIHN1YnNjcmliZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuKGRlZm4gc3Vic2NyaWJlXG4gIFwiR2l2ZW4gYSBgcXVlcnlgLCByZXR1cm5zIGEgUmVhZ2VudCBgcmVhY3Rpb25gIHdoaWNoLCBvdmVyXG4gIHRpbWUsIHJlYWN0aXZlbHkgZGVsaXZlcnMgYSBzdHJlYW0gb2YgdmFsdWVzLiBTbyBpbiBGUlAtaXNoIHRlcm1zLFxuICBpdCByZXR1cm5zIGEgYFNpZ25hbGAuXG5cbiAgVG8gb2J0YWluIHRoZSByZXR1cm5lZCBTaWduYWwvU3RyZWFtJ3MgY3VycmVudCB2YWx1ZSwgaXQgbXVzdCBiZSBgZGVyZWZgZWQuXG5cbiAgYHF1ZXJ5YCBpcyBhIHZlY3RvciBvZiBhdCBsZWFzdCBvbmUgZWxlbWVudC4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gIGBxdWVyeS1pZGAsIHR5cGljYWxseSBhIG5hbWVzcGFjZWQga2V5d29yZC4gVGhlIHJlc3Qgb2YgdGhlIHZlY3RvcidzXG4gIGVsZW1lbnRzIGFyZSBvcHRpb25hbCwgYWRkaXRpb25hbCB2YWx1ZXMgd2hpY2ggcGFyYW1ldGVyaXNlIHRoZSBxdWVyeVxuICBwZXJmb3JtZWQuXG5cbiAgYGR5bnZgIGlzIGFuIG9wdGlvbmFsIDNyZCBhcmd1bWVudCwgd2hpY2ggaXMgYSB2ZWN0b3Igb2YgZnVydGhlciBpbnB1dFxuICBzaWduYWxzIChhdG9tcywgcmVhY3Rpb25zLCBldGMpLCBOT1QgdmFsdWVzLiBUaGlzIGFyZ3VtZW50IGV4aXN0cyBmb3JcbiAgaGlzdG9yaWNhbCByZWFzb25zIGFuZCBpcyBib3JkZXJsaW5lIGRlcHJlY2F0ZWQgdGhlc2UgZGF5cy5cblxuICBFeGFtcGxlIFVzYWdlOlxuICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgKHN1YnNjcmliZSBbOml0ZW1zXSlcbiAgICAoc3Vic2NyaWJlIFs6aXRlbXMgXFxcImJsdWVcXFwiIDpzbWFsbF0pXG4gICAgKHN1YnNjcmliZSBbOml0ZW1zIHs6Y29sb3VyIFxcXCJibHVlXFxcIiAgOnNpemUgOnNtYWxsfV0pXG5cbiAgTm90ZTogZm9yIGFueSBnaXZlbiBjYWxsIHRvIGBzdWJzY3JpYmVgIHRoZXJlIG11c3QgaGF2ZSBiZWVuIGEgcHJldmlvdXMgY2FsbFxuICB0byBgcmVnLXN1YmAsIHJlZ2lzdGVyaW5nIHRoZSBxdWVyeSBoYW5kbGVyIChmdW5jdGlvbikgZm9yIHRoZSBgcXVlcnktaWRgIGdpdmVuLlxuXG4gIEhpbnRcbiAgLS0tLVxuXG4gIFdoZW4gdXNlZCBpbiBhIHZpZXcgZnVuY3Rpb24gQkUgU1VSRSB0byBgZGVyZWZgIHRoZSByZXR1cm5lZCB2YWx1ZS5cbiAgSW4gZmFjdCwgdG8gYXZvaWQgYW55IG1pc3Rha2VzLCBzb21lIHByZWZlciB0byBkZWZpbmU6XG5cbiAgICAgKGRlZiA8c3ViICAoY29tcCBkZXJlZiByZS1mcmFtZS5jb3JlL3N1YnNjcmliZSkpXG5cbiAgQW5kIHRoZW4sIHdpdGhpbiB0aGVpciB2aWV3cywgdGhleSBjYWxsICBgKDxzdWIgWzppdGVtcyA6c21hbGxdKWAgcmF0aGVyXG4gIHRoYW4gdXNpbmcgYHN1YnNjcmliZWAgZGlyZWN0bHkuXG5cbiAgRGUtZHVwbGljYXRpb25cbiAgLS0tLS0tLS0tLS0tLS1cblxuICBYWFhcbiAgXCJcblxuICAoW3F1ZXJ5XVxuICAgKHRyYWNlL3dpdGgtdHJhY2UgezpvcGVyYXRpb24gKGZpcnN0LWluLXZlY3RvciBxdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgICA6b3AtdHlwZSAgIDpzdWIvY3JlYXRlXG4gICAgICAgICAgICAgICAgICAgICAgOnRhZ3MgICAgICB7OnF1ZXJ5LXYgcXVlcnl9fVxuICAgICAoaWYtbGV0IFtjYWNoZWQgKGNhY2hlLWxvb2t1cCBxdWVyeSldXG4gICAgICAgKGRvXG4gICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OmNhY2hlZD8gIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmVhY3Rpb24gKHJlYWdlbnQtaWQgY2FjaGVkKX19KVxuICAgICAgICAgY2FjaGVkKVxuXG4gICAgICAgKGxldCBbcXVlcnktaWQgICAoZmlyc3QtaW4tdmVjdG9yIHF1ZXJ5KVxuICAgICAgICAgICAgIGhhbmRsZXItZm4gKGdldC1oYW5kbGVyIGtpbmQgcXVlcnktaWQpXVxuICAgICAgICAgKHRyYWNlL21lcmdlLXRyYWNlISB7OnRhZ3MgezpjYWNoZWQ/IGZhbHNlfX0pXG4gICAgICAgICAoaWYgKG5pbD8gaGFuZGxlci1mbilcbiAgICAgICAgICAgKGRvICh0cmFjZS9tZXJnZS10cmFjZSEgezplcnJvciB0cnVlfSlcbiAgICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciAoc3RyIFwicmUtZnJhbWU6IG5vIHN1YnNjcmlwdGlvbiBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOiBcIiBxdWVyeS1pZCBcIi4gUmV0dXJuaW5nIGEgbmlsIHN1YnNjcmlwdGlvbi5cIikpKVxuICAgICAgICAgICAoY2FjaGUtYW5kLXJldHVybiBxdWVyeSBbXSAoaGFuZGxlci1mbiBhcHAtZGIgcXVlcnkpKSkpKSkpXG5cbiAgKFtxdWVyeSBkeW52XVxuICAgKHRyYWNlL3dpdGgtdHJhY2UgezpvcGVyYXRpb24gKGZpcnN0LWluLXZlY3RvciBxdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgICA6b3AtdHlwZSAgIDpzdWIvY3JlYXRlXG4gICAgICAgICAgICAgICAgICAgICAgOnRhZ3MgICAgICB7OnF1ZXJ5LXYgcXVlcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZHluLXYgICBkeW52fX1cbiAgICAgKGlmLWxldCBbY2FjaGVkIChjYWNoZS1sb29rdXAgcXVlcnkgZHludildXG4gICAgICAgKGRvXG4gICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OmNhY2hlZD8gIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmVhY3Rpb24gKHJlYWdlbnQtaWQgY2FjaGVkKX19KVxuICAgICAgICAgY2FjaGVkKVxuICAgICAgIChsZXQgW3F1ZXJ5LWlkICAgKGZpcnN0LWluLXZlY3RvciBxdWVyeSlcbiAgICAgICAgICAgICBoYW5kbGVyLWZuIChnZXQtaGFuZGxlciBraW5kIHF1ZXJ5LWlkKV1cbiAgICAgICAgICh0cmFjZS9tZXJnZS10cmFjZSEgezp0YWdzIHs6Y2FjaGVkPyBmYWxzZX19KVxuICAgICAgICAgKHdoZW4gZGVidWctZW5hYmxlZD9cbiAgICAgICAgICAgKHdoZW4tbGV0IFtub3QtcmVhY3RpdmUgKG5vdC1lbXB0eSAocmVtb3ZlIHJhdG9tPyBkeW52KSldXG4gICAgICAgICAgICAgKGNvbnNvbGUgOndhcm4gXCJyZS1mcmFtZTogeW91ciBzdWJzY3JpcHRpb24ncyBkeW5hbWljIHBhcmFtZXRlcnMgdGhhdCBkb24ndCBpbXBsZW1lbnQgSVJlYWN0aXZlQXRvbTpcIiBub3QtcmVhY3RpdmUpKSlcbiAgICAgICAgIChpZiAobmlsPyBoYW5kbGVyLWZuKVxuICAgICAgICAgICAoZG8gKHRyYWNlL21lcmdlLXRyYWNlISB7OmVycm9yIHRydWV9KVxuICAgICAgICAgICAgICAgKGNvbnNvbGUgOmVycm9yIChzdHIgXCJyZS1mcmFtZTogbm8gc3Vic2NyaXB0aW9uIGhhbmRsZXIgcmVnaXN0ZXJlZCBmb3I6IFwiIHF1ZXJ5LWlkIFwiLiBSZXR1cm5pbmcgYSBuaWwgc3Vic2NyaXB0aW9uLlwiKSkpXG4gICAgICAgICAgIChsZXQgW2R5bi12YWxzIChtYWtlLXJlYWN0aW9uIChmbiBbXSAobWFwdiBkZXJlZiBkeW52KSkpXG4gICAgICAgICAgICAgICAgIHN1YiAgICAgIChtYWtlLXJlYWN0aW9uIChmbiBbXSAoaGFuZGxlci1mbiBhcHAtZGIgcXVlcnkgQGR5bi12YWxzKSkpXVxuICAgICAgICAgICAgIDs7IGhhbmRsZXItZm4gcmV0dXJucyBhIHJlYWN0aW9uIHdoaWNoIGlzIHRoZW4gd3JhcHBlZCBpbiB0aGUgc3ViIHJlYWN0aW9uXG4gICAgICAgICAgICAgOzsgbmVlZCB0byBkb3VibGUgZGVyZWYgaXQgdG8gZ2V0IHRvIHRoZSBhY3R1YWwgdmFsdWUuXG4gICAgICAgICAgICAgOyhjb25zb2xlIDpsb2cgXCJTdWJzY3JpcHRpb24gY3JlYXRlZDogXCIgdiBkeW52KVxuICAgICAgICAgICAgIChjYWNoZS1hbmQtcmV0dXJuIHF1ZXJ5IGR5bnYgKG1ha2UtcmVhY3Rpb24gKGZuIFtdIEBAc3ViKSkpKSkpKSkpKVxuXG47OyAtLSByZWctc3ViIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbihkZWZuLSBtYXAtdmFsc1xuICBcIlJldHVybnMgYSBuZXcgdmVyc2lvbiBvZiAnbScgaW4gd2hpY2ggJ2YnIGhhcyBiZWVuIGFwcGxpZWQgdG8gZWFjaCB2YWx1ZS5cbiAgKG1hcC12YWxzIGluYyB7OmEgNCwgOmIgMn0pID0+IHs6YSA1LCA6YiAzfVwiXG4gIFtmIG1dXG4gIChpbnRvIChlbXB0eSBtKVxuICAgICAgICAobWFwIChmbiBbW2sgdl1dIFtrIChmIHYpXSkpXG4gICAgICAgIG0pKVxuXG4oZGVmbiBtYXAtc2lnbmFsc1xuICBcIlJ1bnMgZiBvdmVyIHNpZ25hbHMuIFNpZ25hbHMgbWF5IHRha2Ugc2V2ZXJhbFxuICBmb3JtcywgdGhpcyBmdW5jdGlvbiBoYW5kbGVzIGFsbCBvZiB0aGVtLlwiXG4gIFtmIHNpZ25hbHNdXG4gIChjb25kXG4gICAgKHNlcXVlbnRpYWw/IHNpZ25hbHMpIChtYXAgZiBzaWduYWxzKVxuICAgIChtYXA/IHNpZ25hbHMpIChtYXAtdmFscyBmIHNpZ25hbHMpXG4gICAgKGRlcmVmPyBzaWduYWxzKSAoZiBzaWduYWxzKVxuICAgIDplbHNlICcoKSkpXG5cbihkZWZuIHRvLXNlcVxuICBcIkNvZXJjZXMgeCB0byBhIHNlcSBpZiBpdCBpc24ndCBvbmUgYWxyZWFkeVwiXG4gIFt4XVxuICAoaWYgKHNlcXVlbnRpYWw/IHgpXG4gICAgeFxuICAgIChsaXN0IHgpKSlcblxuKGRlZm4tIGRlcmVmLWlucHV0LXNpZ25hbHNcbiAgW3NpZ25hbHMgcXVlcnktaWRdXG4gIChsZXQgW2RlcmVmZmVkLXNpZ25hbHMgKG1hcC1zaWduYWxzIGRlcmVmIHNpZ25hbHMpXVxuICAgIChjb25kXG4gICAgICAoc2VxdWVudGlhbD8gc2lnbmFscykgKG1hcCBkZXJlZiBzaWduYWxzKVxuICAgICAgKG1hcD8gc2lnbmFscykgKG1hcC12YWxzIGRlcmVmIHNpZ25hbHMpXG4gICAgICAoZGVyZWY/IHNpZ25hbHMpIChkZXJlZiBzaWduYWxzKVxuICAgICAgOmVsc2UgKGNvbnNvbGUgOmVycm9yIFwicmUtZnJhbWU6IGluIHRoZSByZWctc3ViIGZvclwiIHF1ZXJ5LWlkIFwiLCB0aGUgaW5wdXQtc2lnbmFscyBmdW5jdGlvbiByZXR1cm5zOlwiIHNpZ25hbHMpKVxuICAgICh0cmFjZS9tZXJnZS10cmFjZSEgezp0YWdzIHs6aW5wdXQtc2lnbmFscyAoZG9hbGwgKHRvLXNlcSAobWFwLXNpZ25hbHMgcmVhZ2VudC1pZCBzaWduYWxzKSkpfX0pXG4gICAgZGVyZWZmZWQtc2lnbmFscykpXG5cblxuKGRlZm4gcmVnLXN1YlxuICBcIkZvciBhIGdpdmVuIGBxdWVyeS1pZGAsIHJlZ2lzdGVyIHR3byBmdW5jdGlvbnM6IGEgYGNvbXB1dGF0aW9uYCBmdW5jdGlvbiBhbmQgYW4gYGlucHV0IHNpZ25hbHNgIGZ1bmN0aW9uLlxuICBcbiAgRHVyaW5nIHByb2dyYW0gZXhlY3V0aW9uLCBhIGNhbGwgdG8gYHN1YnNjcmliZWAsIHN1Y2ggYXMgYChzdWJzY3JpYmUgWzpzdWItaWQgMyBcXFwiYmx1ZVxcXCJdKWAsXG4gIHdpbGwgY3JlYXRlIGEgbmV3IGA6c3ViLWlkYCBub2RlIGluIHRoZSBTaWduYWwgR3JhcGguIEFuZCwgYXQgdGhhdCB0aW1lLCByZS1mcmFtZVxuICBuZWVkcyB0byBrbm93IGhvdyB0byBjcmVhdGUgdGhlIG5vZGUuICAgQnkgY2FsbGluZyBgcmVnLXN1YmAsIHlvdSBhcmUgcmVnaXN0ZXJpbmcgXG4gICd0aGUgdGVtcGxhdGUnIG9yICd0aGUgbWVjaGFuaXNtJyBieSB3aGljaCBub2RlcyBpbiB0aGUgU2lnbmFsIEdyYXBoIGNhbiBiZSBjcmVhdGVkLiBcblxuICBSZXBlYXRpbmc6IGNhbGxpbmcgYHJlZy1zdWJgIGRvZXMgbm90IGNyZWF0ZSBhIG5vZGUuIEl0IG9ubHkgY3JlYXRlcyB0aGUgdGVtcGxhdGVcbiAgZnJvbSB3aGljaCBub2RlcyBjYW4gYmUgY3JlYXRlZCBsYXRlci4gXG4gIFxuICBgcmVnLXN1YmAgYXJndW1lbnRzIGFyZTogIFxuICAgIC0gYSBgcXVlcnktaWRgICh0eXBpY2FsbHkgYSBuYW1lc3BhY2VkIGtleXdvcmQpXG4gICAgLSBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGlucHV0cyByZXF1aXJlZCBieSB0aGlzIGtpbmQgb2Ygbm9kZSAoY2FuIGJlIHN1cHBsaWVkICBpbiBvbmUgb2YgdGhyZWUgd2F5cykgXG4gICAgLSBhIGZ1bmN0aW9uIHdoaWNoIGNvbXB1dGVzIHRoZSB2YWx1ZSBvZiB0aGlzIGtpbmQgb2Ygbm9kZSBcblxuICBUaGUgYGNvbXB1dGF0aW9uIGZ1bmN0aW9uYCBpcyBhbHdheXMgdGhlIGxhc3QgYXJndW1lbnQgc3VwcGxpZWQgYW5kIGl0IGlzIGV4cGVjdGVkIHRvIGhhdmUgdGhlIHNpZ25hdHVyZTogXG4gICAgYChpbnB1dC12YWx1ZXMsIHF1ZXJ5LXZlY3RvcikgLT4gYS12YWx1ZWBcbiAgXG4gIFdoZW4gYGNvbXB1dGF0aW9uIGZ1bmN0aW9uYCBpcyBjYWxsZWQsIHRoZSBgcXVlcnktdmVjdG9yYCBhcmd1bWVudCB3aWxsIGJlIHRoZSB2ZWN0b3Igc3VwcGxpZWQgdG8gdGhlIFxuICB0aGUgYHN1YnNjcmliZWAgd2hpY2ggY2F1c2VkIHRoZSBub2RlIHRvIGJlIGNyZWF0ZWQuIFNvLCBpZiB0aGUgY2FsbCB3YXMgYChzdWJzY3JpYmUgWzpzdWItaWQgMyBcXFwiYmx1ZVxcXCJdKWAsIFxuICB0aGVuIHRoZSBgcXVlcnktdmVjdG9yYCBzdXBwbGllZCB0byB0aGUgY29tcHV0YXRvbiBmdW5jdGlvbiB3aWxsIGJlIGBbOnN1Yi1pZCAzIFxcXCJibHVlXFxcIl1gLlxuXG4gIFRoZSBhcmd1bWVudHMgc3VwcGxpZWQgYmV0d2VlbiB0aGUgYHF1ZXJ5LWlkYCBhbmQgdGhlIGBjb21wdXRhdGlvbi1mdW5jdGlvbmAgY2FuIHZhcnkgaW4gMyB3YXlzLCBcbiAgYnV0IHdoYXRldmVyIGlzIHRoZXJlIGRlZmluZXMgdGhlIGBpbnB1dCBzaWduYWxzYCBwYXJ0IG9mIHRoZSB0ZW1wbGF0ZSwgY29udHJvbGxpbmcgd2hhdCBpbnB1dCBcbiB2YWx1ZXMgXFxcImZsb3cgaW50b1xcXCIgdGhlIGBjb21wdXRhdGlvbiBmdW5jdGlvbmAgZ2V0cyB3aGVuIGl0IGlzIGNhbGxlZC4gXG5cbiAgYHJlZy1zdWJgIGNhbiBiZSBjYWxsZWQgaW4gb25lIG9mIHRocmVlIHdheXMsIGJlY2F1c2UgdGhlcmUgYXJlIHRocmVlIHdheXMgdG8gZGVmaW5lIHRoZSBpbnB1dCBzaWduYWxzIHBhcnQuXG4gIEJ1dCBub3RlLCB0aGUgMm5kIG1ldGhvZCwgaW4gd2hpY2ggYSBgc2lnbmFsLWZuYCBpcyBleHBsaWNpdGx5IHN1cHBsaWVkLCBpcyB0aGUgbW9zdCBjYW5vbmljYWwgYW5kIGluc3RydWN0aXZlLiBUaGUgb3RoZXIgXG4gIHR3byBhcmUgcmVhbGx5IGp1c3Qgc3VnYXJ5IHZhcmlhdGlvbnMuIFxuXG4gIDEuIE5vIGlucHV0IHNpZ25hbHMgZ2l2ZW46XG4gICAgICBgYGBjbGpcbiAgICAgKHJlZy1zdWJcbiAgICAgICA6cXVlcnktaWRcbiAgICAgICBhLWNvbXB1dGF0aW9uLWZuKSAgIDs7IGhhcyBzaWduYXR1cmU6ICAoZm4gW2RiIHF1ZXJ5LXZlY10gIC4uLiByZXQtdmFsdWUpXG4gICAgIGBgYFxuXG4gICAgIEluIHRoZSBhYnNlbmNlIG9mIGFuIGV4cGxpY2l0IGBpbnB1dC1mbmAsIHRoZSBub2RlJ3MgaW5wdXQgc2lnbmFsIGRlZmF1bHRzIHRvIGBhcHAtZGJgXG4gICAgIGFuZCwgYXMgYSByZXN1bHQsIHRoZSB2YWx1ZSB3aXRoaW4gYGFwcC1kYmAgKGEgbWFwKSBpc1xuICAgICBpcyBnaXZlbiBhcyB0aGUgMXN0IGFyZ3VtZW50IHdoZW4gYGEtY29tcHV0YXRpb24tZm5gIGlzIGNhbGxlZC4gICBcbiBcblxuICAyLiBBIHNpZ25hbCBmdW5jdGlvbiBpcyBleHBsaWNpdGx5IHN1cHBsaWVkOlxuICAgICBgYGBjbGpcbiAgICAgKHJlZy1zdWJcbiAgICAgICA6cXVlcnktaWRcbiAgICAgICBzaWduYWwtZm4gICAgIDs7IDwtLSBoZXJlXG4gICAgICAgY29tcHV0YXRpb24tZm4pXG4gICAgIGBgYFxuICAgICBcbiAgICAgVGhpcyBpcyB0aGUgbW9zdCBjYW5vbmljYWwgYW5kIGluc3RydWN0aXZlIG9mIHRoZSB0aHJlZSB2YXJpYXRpb25zLlxuICAgICBcbiAgICAgV2hlbiBhIG5vZGUgaXMgY3JlYXRlZCBmcm9tIHRoZSB0ZW1wbGF0ZSwgdGhlIGBzaWduYWwtZm5gIHdpbGwgYmUgY2FsbGVkIGFuZCBpdFxuICAgICBpcyBleHBlY3RlZCB0byByZXR1cm4gdGhlIGlucHV0IHNpZ25hbChzKSBhcyBlaXRoZXIgYSBzaW5nbGV0b24sIGlmIHRoZXJlIGlzIG9ubHlcbiAgICAgb25lLCBvciBhIHNlcXVlbmNlIGlmIHRoZXJlIGFyZSBtYW55LCBvciBhIG1hcCB3aXRoIHRoZSBzaWduYWxzIGFzIHRoZSB2YWx1ZXMuXG5cbiAgICAgVGhlIHZhbHVlcyBmcm9tIHJldHVybmVkIG5vbWluYXRlZCBzaWduYWxzIHdpbGwgYmUgc3VwcGxpZWQgYXMgdGhlIDFzdCBhcmd1bWVudCB0byAgXG4gICAgIHRoZSBgYS1jb21wdXRhdGlvbi1mbmAgd2hlbiBpdCBpcyBjYWxsZWQgLSBhbmQgc3ViamVjdCB0byB3aGF0IHRoaXMgYHNpZ25hbC1mbmAgcmV0dXJucywgXG4gICAgIHRoaXMgdmFsdWUgd2lsbCBiZSBlaXRoZXIgYSBzaW5nbGV0b24sIHNlcXVlbmNlIG9yIG1hcCBvZiB0aGVtIChwYXJhbGxlbGluZ1xuICAgICB0aGUgc3RydWN0dXJlIHJldHVybmVkIGJ5IHRoZSBgc2lnbmFsLWZuYCkuXG5cbiAgICAgVGhpcyBleGFtcGxlIGBzaWduYWwtZm5gIHJldHVybnMgYSB2ZWN0b3Igb2YgaW5wdXQgc2lnbmFscy5cbiAgICAgICBgYGBjbGpcbiAgICAgICAoZm4gW3F1ZXJ5LXZlYyBkeW5hbWljLXZlY11cbiAgICAgICAgIFsoc3Vic2NyaWJlIFs6YS1zdWJdKVxuICAgICAgICAgIChzdWJzY3JpYmUgWzpiLXN1Yl0pXSlcbiAgICAgICBgYGBcbiAgICAgVGhlIGFzc29jaWF0ZWQgY29tcHV0YXRpb24gZnVuY3Rpb24gbXVzdCBiZSB3cml0dGVuXG4gICAgIHRvIGV4cGVjdCBhIHZlY3RvciBvZiB2YWx1ZXMgZm9yIGl0cyBmaXJzdCBhcmd1bWVudDpcbiAgICAgICBgYGBjbGpcbiAgICAgICAoZm4gW1thIGJdIHF1ZXJ5LXZlY10gICAgIDs7IDFzdCBhcmd1bWVudCBpcyBhIHNlcSBvZiB0d28gdmFsdWVzXG4gICAgICAgICAuLi4uKVxuICAgICAgICBgYGBcblxuICAgICBJZiwgb24gdGhlIG90aGVyIGhhbmQsIHRoZSBzaWduYWwgZnVuY3Rpb24gd2FzIHNpbXBsZXIgYW5kIHJldHVybmVkIGEgc2luZ2xldG9uLCBsaWtlIHRoaXM6XG4gICAgICAgIGBgYGNsalxuICAgICAgICAoZm4gW3F1ZXJ5LXZlYyBkeW5hbWljLXZlY11cbiAgICAgICAgICAoc3Vic2NyaWJlIFs6YS1zdWJdKSlcbiAgICAgICAgYGBgXG4gICAgIHRoZW4gdGhlIGFzc29jaWF0ZWQgY29tcHV0YXRpb24gZnVuY3Rpb24gbXVzdCBiZSB3cml0dGVuIHRvIGV4cGVjdCBhIHNpbmdsZSB2YWx1ZVxuICAgICBhcyB0aGUgMXN0IGFyZ3VtZW50OlxuICAgICAgICBgYGBjbGpcbiAgICAgICAgKGZuIFthIHF1ZXJ5LXZlY10gICAgICAgOzsgMXN0IGFyZ3VtZW50IGlzIGEgc2luZ2xlIHZhbHVlXG4gICAgICAgICAgLi4uKVxuICAgICAgICBgYGBcbiBcbiAgICAgRnVydGhlciBOb3RlOiB2YXJpYXRpb24gIzEgYWJvdmUsIGluIHdoaWNoIGFuIGBpbnB1dC1mbmAgd2FzIG5vdCBzdXBwbGllZCwgbGlrZSB0aGlzOlxuICAgICAgIGBgYGNsalxuICAgICAocmVnLXN1YlxuICAgICAgIDpxdWVyeS1pZFxuICAgICAgIGEtY29tcHV0YXRpb24tZm4pICAgOzsgaGFzIHNpZ25hdHVyZTogIChmbiBbZGIgcXVlcnktdmVjXSAgLi4uIHJldC12YWx1ZSlcbiAgICAgYGBgXG4gICAgIGlzIHRoZSBlcXVpdmFsZW50IG9mIHVzaW5nIHRoaXNcbiAgICAgMm5kIHZhcmlhdGlvbiBhbmQgZXhwbGljaXRseSBzdXBwbGluZyBhIGBzaWduYWwtZm5gIHdoaWNoIHJldHVybnMgYGFwcC1kYmA6XG4gICAgIGBgYGNsalxuICAgICAocmVnLXN1YlxuICAgICAgIDpxdWVyeS1pZFxuICAgICAgIChmbiBbXyBfXSAgcmUtZnJhbWUvYXBwLWRiKSAgIDs7IDwtLS0gZXhwbGljaXQgaW5wdXQtZm4gXG4gICAgICAgYS1jb21wdXRhdGlvbi1mbikgICAgICAgICAgICAgOzsgaGFzIHNpZ25hdHVyZTogIChmbiBbZGIgcXVlcnktdmVjXSAgLi4uIHJldC12YWx1ZSlcbiAgICAgYGBgXG4gXG4gIDMuIFN5bnRheCBTdWdhclxuXG4gICAgIGBgYGNsalxuICAgICAocmVnLXN1YlxuICAgICAgIDphLWItc3ViXG4gICAgICAgOjwtIFs6YS1zdWJdXG4gICAgICAgOjwtIFs6Yi1zdWJdXG4gICAgICAgKGZuIFtbYSBiXSBxdWVyeS12ZWNdICAgIDs7IDFzdCBhcmd1bWVudCBpcyBhIHNlcSBvZiB0d28gdmFsdWVzXG4gICAgICAgICB7OmEgYSA6YiBifSkpXG4gICAgIGBgYFxuXG4gICAgIFRoaXMgM3JkIHZhcmlhdGlvbiBpcyBqdXN0IHN5bnRhY3RpYyBzdWdhciBmb3IgdGhlIDJuZC4gIEluc3RlYWQgb2YgcHJvdmlkaW5nIGFuXG4gICAgIGBzaWduYWxzLWZuYCB5b3UgcHJvdmlkZSBvbmUgb3IgbW9yZSBwYWlycyBvZiBgOjwtYCBhbmQgYSBzdWJzY3JpcHRpb24gdmVjdG9yLlxuXG4gICAgIElmIHlvdSBzdXBwbHkgb25seSBvbmUgcGFpciBhIHNpbmdsZXRvbiB3aWxsIGJlIHN1cHBsaWVkIHRvIHRoZSBjb21wdXRhdGlvbiBmdW5jdGlvbiwgXG4gICAgIGFzIGlmIHlvdSBoYWQgc3VwcGxpZWQgYSBgc2lnbmFsLWZuYCByZXR1cm5pbmcgb25seSBhIHNpbmdsZSB2YWx1ZTpcblxuICAgICBgYGBjbGpcbiAgICAgKHJlZy1zdWJcbiAgICAgICA6YS1zdWJcbiAgICAgICA6PC0gWzphLXN1Yl1cbiAgICAgICAoZm4gW2EgcXVlcnktdmVjXSAgICAgIDs7IG9ubHkgb25lIHBhaXIsIHNvIDFzdCBhcmd1bWVudCBpcyBhIHNpbmdsZSB2YWx1ZVxuICAgICAgICAgLi4uKSlcbiAgICAgYGBgXG5cbiAgRm9yIGZ1cnRoZXIgdW5kZXJzdGFuZGluZywgcmVhZCBgL2RvY3NgLCBhbmQgbG9vayBhdCB0aGUgZGV0YWlsZWQgY29tbWVudHMgaW5cbiAgL2V4YW1wbGVzL3RvZG9tdmMvc3JjL3N1YnMuY2xqc1xuICBcIlxuICBbcXVlcnktaWQgJiBhcmdzXVxuICAobGV0IFtjb21wdXRhdGlvbi1mbiAobGFzdCBhcmdzKVxuICAgICAgICBpbnB1dC1hcmdzICAgICAoYnV0bGFzdCBhcmdzKSA7OyBtYXkgYmUgZW1wdHksIG9yIG9uZSBzaWduYWwgZm4sIG9yIHBhaXJzIG9mICA6PC0gLyB2ZWN0b3JcbiAgICAgICAgZXJyLWhlYWRlciAgICAgKHN0ciBcInJlLWZyYW1lOiByZWctc3ViIGZvciBcIiBxdWVyeS1pZCBcIiwgXCIpXG4gICAgICAgIGlucHV0cy1mbiAgICAgIChjYXNlIChjb3VudCBpbnB1dC1hcmdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIDs7IG5vIGBpbnB1dHNgIGZ1bmN0aW9uIHByb3ZpZGVkIC0gZ2l2ZSB0aGUgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgIDAgKGZuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChbX10gYXBwLWRiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoW18gX10gYXBwLWRiKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgIDs7IGEgc2luZ2xlIGBpbnB1dHNgIGZuXG4gICAgICAgICAgICAgICAgICAgICAgICAgMSAobGV0IFtmIChmaXJzdCBpbnB1dC1hcmdzKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdoZW4tbm90IChmbj8gZilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29uc29sZSA6ZXJyb3IgZXJyLWhlYWRlciBcIjJuZCBhcmd1bWVudCBleHBlY3RlZCB0byBiZSBhbiBpbnB1dHMgZnVuY3Rpb24sIGdvdDpcIiBmKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZilcblxuICAgICAgICAgICAgICAgICAgICAgICAgIDs7IG9uZSBzdWdhciBwYWlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiAobGV0IFtbbWFya2VyIHZlY10gaW5wdXQtYXJnc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdoZW4tbm90ICg9IDo8LSBtYXJrZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgOmVycm9yIGVyci1oZWFkZXIgXCJleHBlY3RlZCA6PC0sIGdvdDpcIiBtYXJrZXIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm4gaW5wLWZuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFtfXSAoc3Vic2NyaWJlIHZlYykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFtfIF9dIChzdWJzY3JpYmUgdmVjKSkpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgOzsgbXVsdGlwbGUgc3VnYXIgcGFpcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAobGV0IFtwYWlycyAgIChwYXJ0aXRpb24gMiBpbnB1dC1hcmdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcnMgKG1hcCBmaXJzdCBwYWlycylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWNzICAgIChtYXAgbGFzdCBwYWlycyldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAod2hlbi1ub3QgKGFuZCAoZXZlcnk/ICN7OjwtfSBtYXJrZXJzKSAoZXZlcnk/IHZlY3Rvcj8gdmVjcykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciBlcnItaGVhZGVyIFwiZXhwZWN0ZWQgcGFpcnMgb2YgOjwtIGFuZCB2ZWN0b3JzLCBnb3Q6XCIgcGFpcnMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZuIGlucC1mblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoW19dIChtYXAgc3Vic2NyaWJlIHZlY3MpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoW18gX10gKG1hcCBzdWJzY3JpYmUgdmVjcykpKSkpXVxuICAgIChyZWdpc3Rlci1oYW5kbGVyXG4gICAgICBraW5kXG4gICAgICBxdWVyeS1pZFxuICAgICAgKGZuIHN1YnMtaGFuZGxlci1mblxuICAgICAgICAoW2RiIHF1ZXJ5LXZlY11cbiAgICAgICAgIChsZXQgW3N1YnNjcmlwdGlvbnMgKGlucHV0cy1mbiBxdWVyeS12ZWMpXG4gICAgICAgICAgICAgICByZWFjdGlvbi1pZCAgIChhdG9tIG5pbClcbiAgICAgICAgICAgICAgIHJlYWN0aW9uICAgICAgKG1ha2UtcmVhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm4gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0cmFjZS93aXRoLXRyYWNlIHs6b3BlcmF0aW9uIChmaXJzdC1pbi12ZWN0b3IgcXVlcnktdmVjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcC10eXBlICAgOnN1Yi9ydW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGFncyAgICAgIHs6cXVlcnktdiAgICBxdWVyeS12ZWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmVhY3Rpb24gICBAcmVhY3Rpb24taWR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxldCBbc3Vic2NyaXB0aW9uIChjb21wdXRhdGlvbi1mbiAoZGVyZWYtaW5wdXQtc2lnbmFscyBzdWJzY3JpcHRpb25zIHF1ZXJ5LWlkKSBxdWVyeS12ZWMpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OnZhbHVlIHN1YnNjcmlwdGlvbn19KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24pKSkpXVxuXG4gICAgICAgICAgIChyZXNldCEgcmVhY3Rpb24taWQgKHJlYWdlbnQtaWQgcmVhY3Rpb24pKVxuICAgICAgICAgICByZWFjdGlvbikpXG4gICAgICAgIChbZGIgcXVlcnktdmVjIGR5bi12ZWNdXG4gICAgICAgICAobGV0IFtzdWJzY3JpcHRpb25zIChpbnB1dHMtZm4gcXVlcnktdmVjIGR5bi12ZWMpXG4gICAgICAgICAgICAgICByZWFjdGlvbi1pZCAgIChhdG9tIG5pbClcbiAgICAgICAgICAgICAgIHJlYWN0aW9uICAgICAgKG1ha2UtcmVhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm4gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0cmFjZS93aXRoLXRyYWNlIHs6b3BlcmF0aW9uIChmaXJzdC1pbi12ZWN0b3IgcXVlcnktdmVjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcC10eXBlICAgOnN1Yi9ydW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGFncyAgICAgIHs6cXVlcnktdiAgIHF1ZXJ5LXZlY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkeW4tdiAgICAgZHluLXZlY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpyZWFjdGlvbiAgQHJlYWN0aW9uLWlkfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXQgW3N1YnNjcmlwdGlvbiAoY29tcHV0YXRpb24tZm4gKGRlcmVmLWlucHV0LXNpZ25hbHMgc3Vic2NyaXB0aW9ucyBxdWVyeS1pZCkgcXVlcnktdmVjIGR5bi12ZWMpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OnZhbHVlIHN1YnNjcmlwdGlvbn19KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24pKSkpXVxuXG4gICAgICAgICAgIChyZXNldCEgcmVhY3Rpb24taWQgKHJlYWdlbnQtaWQgcmVhY3Rpb24pKVxuICAgICAgICAgICByZWFjdGlvbikpKSkpKVxuIl19