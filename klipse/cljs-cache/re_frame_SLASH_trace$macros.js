// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.trace$macros");
re_frame.trace$macros.id = cljs.core.atom.call(null,(0));
re_frame.trace$macros._STAR_current_trace_STAR_ = null;
re_frame.trace$macros.reset_tracing_BANG_ = (function re_frame$trace$macros$reset_tracing_BANG_(){
return cljs.core.reset_BANG_.call(null,re_frame.trace$macros.id,(0));
});

/** @define {boolean} */
goog.define("re_frame.trace$macros.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace$macros.is_trace_enabled_QMARK_ = (function re_frame$trace$macros$is_trace_enabled_QMARK_(){
return re_frame.trace$macros.trace_enabled_QMARK_;
});
re_frame.trace$macros.trace_cbs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace$macros !== 'undefined') && (typeof re_frame.trace$macros.traces !== 'undefined')){
} else {
re_frame.trace$macros.traces = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace$macros !== 'undefined') && (typeof re_frame.trace$macros.next_delivery !== 'undefined')){
} else {
re_frame.trace$macros.next_delivery = cljs.core.atom.call(null,(0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace$macros.register_trace_cb = (function re_frame$trace$macros$register_trace_cb(key,f){
if(re_frame.trace$macros.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.call(null,re_frame.trace$macros.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation.");
}
});
re_frame.trace$macros.remove_trace_cb = (function re_frame$trace$macros$remove_trace_cb(key){
cljs.core.swap_BANG_.call(null,re_frame.trace$macros.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace$macros.next_id = (function re_frame$trace$macros$next_id(){
return cljs.core.swap_BANG_.call(null,re_frame.trace$macros.id,cljs.core.inc);
});
re_frame.trace$macros.start_trace = (function re_frame$trace$macros$start_trace(p__704){
var map__705 = p__704;
var map__705__$1 = (((((!((map__705 == null))))?(((((map__705.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__705.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__705):map__705);
var operation = cljs.core.get.call(null,map__705__$1,new cljs.core.Keyword(null,"operation","operation",(-1267664310)));
var op_type = cljs.core.get.call(null,map__705__$1,new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)));
var tags = cljs.core.get.call(null,map__705__$1,new cljs.core.Keyword(null,"tags","tags",(1771418977)));
var child_of = cljs.core.get.call(null,map__705__$1,new cljs.core.Keyword(null,"child-of","child-of",(-903376662)));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",(-1388402092)),re_frame.trace$macros.next_id.call(null),new cljs.core.Keyword(null,"operation","operation",(-1267664310)),operation,new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),op_type,new cljs.core.Keyword(null,"tags","tags",(1771418977)),tags,new cljs.core.Keyword(null,"child-of","child-of",(-903376662)),(function (){var or__10112__auto__ = child_of;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",(-1388402092)).cljs$core$IFn$_invoke$arity$1(re_frame.trace$macros._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",(-355208981)),re_frame.interop.now.call(null)], null);
});
re_frame.trace$macros.debounce_time = (50);
re_frame.trace$macros.debounce = (function re_frame$trace$macros$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace$macros.schedule_debounce = re_frame.trace$macros.debounce.call(null,(function re_frame$trace$macros$tracing_cb_debounced(){
var seq__707_727 = cljs.core.seq.call(null,cljs.core.deref.call(null,re_frame.trace$macros.trace_cbs));
var chunk__708_728 = null;
var count__709_729 = (0);
var i__710_730 = (0);
while(true){
if((i__710_730 < count__709_729)){
var vec__719_731 = cljs.core._nth.call(null,chunk__708_728,i__710_730);
var k_732 = cljs.core.nth.call(null,vec__719_731,(0),null);
var cb_733 = cljs.core.nth.call(null,vec__719_731,(1),null);
try{cb_733.call(null,cljs.core.deref.call(null,re_frame.trace$macros.traces));
}catch (e722){var e_734 = e722;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"Error thrown from trace cb",k_732,"while storing",cljs.core.deref.call(null,re_frame.trace$macros.traces),e_734);
}

var G__735 = seq__707_727;
var G__736 = chunk__708_728;
var G__737 = count__709_729;
var G__738 = (i__710_730 + (1));
seq__707_727 = G__735;
chunk__708_728 = G__736;
count__709_729 = G__737;
i__710_730 = G__738;
continue;
} else {
var temp__9646__auto___739 = cljs.core.seq.call(null,seq__707_727);
if(temp__9646__auto___739){
var seq__707_740__$1 = temp__9646__auto___739;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__707_740__$1)){
var c__11729__auto___741 = cljs.core.chunk_first.call(null,seq__707_740__$1);
var G__742 = cljs.core.chunk_rest.call(null,seq__707_740__$1);
var G__743 = c__11729__auto___741;
var G__744 = cljs.core.count.call(null,c__11729__auto___741);
var G__745 = (0);
seq__707_727 = G__742;
chunk__708_728 = G__743;
count__709_729 = G__744;
i__710_730 = G__745;
continue;
} else {
var vec__723_746 = cljs.core.first.call(null,seq__707_740__$1);
var k_747 = cljs.core.nth.call(null,vec__723_746,(0),null);
var cb_748 = cljs.core.nth.call(null,vec__723_746,(1),null);
try{cb_748.call(null,cljs.core.deref.call(null,re_frame.trace$macros.traces));
}catch (e726){var e_749 = e726;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"Error thrown from trace cb",k_747,"while storing",cljs.core.deref.call(null,re_frame.trace$macros.traces),e_749);
}

var G__750 = cljs.core.next.call(null,seq__707_740__$1);
var G__751 = null;
var G__752 = (0);
var G__753 = (0);
seq__707_727 = G__750;
chunk__708_728 = G__751;
count__709_729 = G__752;
i__710_730 = G__753;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_.call(null,re_frame.trace$macros.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace$macros.debounce_time);
re_frame.trace$macros.run_tracing_callbacks_BANG_ = (function re_frame$trace$macros$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref.call(null,re_frame.trace$macros.next_delivery) - (25)) < now)){
re_frame.trace$macros.schedule_debounce.call(null);

return cljs.core.reset_BANG_.call(null,re_frame.trace$macros.next_delivery,(now + re_frame.trace$macros.debounce_time));
} else {
return null;
}
});
var ret__12562__auto___761 = re_frame.trace$macros.finish_trace = (function re_frame$trace$macros$finish_trace(_AMPERSAND_form,_AMPERSAND_env,trace){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","is-trace-enabled?","re-frame.trace/is-trace-enabled?",(-746708463),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"end__22__auto__","end__22__auto__",(1683992630),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.interop","now","re-frame.interop/now",(458059402),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"duration__23__auto__","duration__23__auto__",(-1135481845),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","-","cljs.core/-",(187040141),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"end__22__auto__","end__22__auto__",(1683992630),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Keyword(null,"start","start",(-355208981)),null,(1),null)),(new cljs.core.List(null,trace,null,(1),null)))),null,(1),null)))),null,(1),null))))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","swap!","cljs.core/swap!",(-2144679919),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","traces","re-frame.trace/traces",(-713224571),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","conj","cljs.core/conj",(-460750931),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",(322326297),null),null,(1),null)),(new cljs.core.List(null,trace,null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"duration","duration",(1444101068)),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"duration__23__auto__","duration__23__auto__",(-1135481845),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"end","end",(-268185958)),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.interop","now","re-frame.interop/now",(458059402),null),null,(1),null)))),null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","run-tracing-callbacks!","re-frame.trace/run-tracing-callbacks!",(-1004404355),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"end__22__auto__","end__22__auto__",(1683992630),null),null,(1),null)))),null,(1),null)))),null,(1),null))));
});
(re_frame.trace$macros.finish_trace.cljs$lang$macro = true);


var ret__12562__auto___762 = (function (){
/**
 * Create a trace inside the scope of the with-trace macro
 * 
 *        Common keys for trace-opts
 *        :op-type - what kind of operation is this? e.g. :sub/create, :render.
 *        :operation - identifier for the operation, for a subscription it would be the subscription keyword
 *        :tags - a map of arbitrary kv pairs
 */
re_frame.trace$macros.with_trace = (function re_frame$trace$macros$with_trace(var_args){
var args__12462__auto__ = [];
var len__12445__auto___763 = arguments.length;
var i__12446__auto___764 = (0);
while(true){
if((i__12446__auto___764 < len__12445__auto___763)){
args__12462__auto__.push((arguments[i__12446__auto___764]));

var G__765 = (i__12446__auto___764 + (1));
i__12446__auto___764 = G__765;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((3) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((3)),(0),null)):null);
return re_frame.trace$macros.with_trace.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12463__auto__);
});

(re_frame.trace$macros.with_trace.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__758,body){
var map__759 = p__758;
var map__759__$1 = (((((!((map__759 == null))))?(((((map__759.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__759.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__759):map__759);
var trace_opts = map__759__$1;
var operation = cljs.core.get.call(null,map__759__$1,new cljs.core.Keyword(null,"operation","operation",(-1267664310)));
var op_type = cljs.core.get.call(null,map__759__$1,new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)));
var tags = cljs.core.get.call(null,map__759__$1,new cljs.core.Keyword(null,"tags","tags",(1771418977)));
var child_of = cljs.core.get.call(null,map__759__$1,new cljs.core.Keyword(null,"child-of","child-of",(-903376662)));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"if","if",(1181717262),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","is-trace-enabled?","re-frame.trace/is-trace-enabled?",(-746708463),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","binding","cljs.core/binding",(2050379843),null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","*current-trace*","re-frame.trace/*current-trace*",(-1928561546),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","start-trace","re-frame.trace/start-trace",(-774485496),null),null,(1),null)),(new cljs.core.List(null,trace_opts,null,(1),null)))),null,(1),null))))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"try","try",(-1273693247),null),null,(1),null)),body,(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"finally","finally",(-1065347064),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","finish-trace","re-frame.trace/finish-trace",(-504356059),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","*current-trace*","re-frame.trace/*current-trace*",(-1928561546),null),null,(1),null)))),null,(1),null)))),null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",(1686842252),null),null,(1),null)),body)),null,(1),null))));
}));

(re_frame.trace$macros.with_trace.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(re_frame.trace$macros.with_trace.cljs$lang$applyTo = (function (seq754){
var G__755 = cljs.core.first.call(null,seq754);
var seq754__$1 = cljs.core.next.call(null,seq754);
var G__756 = cljs.core.first.call(null,seq754__$1);
var seq754__$2 = cljs.core.next.call(null,seq754__$1);
var G__757 = cljs.core.first.call(null,seq754__$2);
var seq754__$3 = cljs.core.next.call(null,seq754__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__755,G__756,G__757,seq754__$3);
}));

return null;
})()
;
(re_frame.trace$macros.with_trace.cljs$lang$macro = true);


var ret__12562__auto___766 = re_frame.trace$macros.merge_trace_BANG_ = (function re_frame$trace$macros$merge_trace_BANG_(_AMPERSAND_form,_AMPERSAND_env,m){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","is-trace-enabled?","re-frame.trace/is-trace-enabled?",(-746708463),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"new-trace__24__auto__","new-trace__24__auto__",(759064518),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","->","cljs.core/->",(1488366311),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","update","cljs.core/update",(-908565906),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","*current-trace*","re-frame.trace/*current-trace*",(-1928561546),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"tags","tags",(1771418977)),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","merge","cljs.core/merge",(-822184067),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Keyword(null,"tags","tags",(1771418977)),null,(1),null)),(new cljs.core.List(null,m,null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","merge","cljs.core/merge",(-822184067),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","dissoc","cljs.core/dissoc",(-432349815),null),null,(1),null)),(new cljs.core.List(null,m,null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"tags","tags",(1771418977)),null,(1),null)))),null,(1),null)))),null,(1),null)))),null,(1),null))))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"set!","set!",(250714521),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("re-frame.trace","*current-trace*","re-frame.trace/*current-trace*",(-1928561546),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"new-trace__24__auto__","new-trace__24__auto__",(759064518),null),null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,null,null,(1),null))));
});
(re_frame.trace$macros.merge_trace_BANG_.cljs$lang$macro = true);


//# sourceURL=re_frame/trace$macros.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvdHJhY2UkbWFjcm9zLmpzIiwic291cmNlcyI6WyJ0cmFjZSRtYWNyb3MuY2xqcyJdLCJsaW5lQ291bnQiOjIxMSwibWFwcGluZ3MiOiI7QUFVQSxBQUFLQSwyQkFBRyx5QkFBQSx6QkFBQ0M7QUFDVCxrREFBQSxsREFBZUM7QUFFZiw0Q0FBQSw1Q0FBTUM7QUFBTixBQUNFLGdFQUFBLHpEQUFDQyxnQ0FBT0o7O0FBRUQsQUFBQSxBQUFBO0FBQUE7QUFBQSxBQUFBSyxZQUFBLDZDQUFBO0FBR1Q7OztnREFBQSxoREFBZUM7QUFBZixBQU9FQzs7QUFFRixBQUFLQyxrQ0FBVSx5QkFBQSx6QkFBQ1A7QUFDaEIsR0FBQSxRQUFBUSxxQ0FBQUMsa0RBQUFDO0FBQUE7QUFBQSxBQUFBLEFBQVNDLCtCQUFPLHlCQUFBLHpCQUFDWDs7QUFDakIsR0FBQSxRQUFBUSxxQ0FBQUMsa0RBQUFHO0FBQUE7QUFBQSxBQUFBLEFBQVNDLHNDQUFjLHlCQUFBLHpCQUFDYjs7QUFFeEI7Ozs7MENBQUEsMUNBQU1jLDRGQUdIQyxJQUFJQztBQUhQLEFBSUUsR0FBSVY7QUFDRixPQUFDVywrQkFBTVYsZ0NBQVVXLGdCQUFNSCxJQUFJQzs7QUFDM0IsMENBQUEsdURBQUEsMUZBQUNHOzs7QUFFTCx3Q0FBQSx4Q0FBTUMsd0ZBQWlCTDtBQUF2QixBQUNFLEFBQUNFLCtCQUFNVixnQ0FBVWMsaUJBQU9OOztBQUQxQjs7QUFJQSxnQ0FBQSxoQ0FBTU87QUFBTixBQUFpQixPQUFDTCwrQkFBTWxCLHlCQUFHd0I7O0FBRTNCLG9DQUFBLDRDQUFBQyxoRkFBTU07QUFBTixBQUFBLElBQUFMLFdBQUFEO0lBQUFDLGVBQUEsRUFBQSxFQUFBLEdBQUEsQ0FBQUEsWUFBQSxTQUFBLEVBQUEsRUFBQSxDQUFBLEFBQUFBLCtDQUFBLFdBQUEsQ0FBQUMsZ0NBQUEsQUFBQUQsNkJBQUEsS0FBQSxPQUFBLFFBQUEsQUFBQUUsMEJBQUFDLG1CQUFBSCxVQUFBQTtnQkFBQSxBQUFBSSx3QkFBQUos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T0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQUMsd0JBQUEsQUFBQUgsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsaUZBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLHVGQUFBLEtBQUEsSUFBQSxTQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBLDRGQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBRiw2QkFBQSxBQUFBQywyQkFBQSxLQUFBQyxlQUFBLEtBQUEsQUFBQSxxRUFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQSxpRkFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQUYsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLHlEQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsV0FBQSxLQUFBLElBQUEsU0FBQSxLQUFBLElBQUEsU0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQUYsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsK0VBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUEsMEZBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUEsNEVBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLDZFQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsV0FBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsK0RBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUEsNEZBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLHFEQUFBLEtBQUEs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QyxlQUFBLEtBQUEsQUFBQSwwRUFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQUMsd0JBQUEsQUFBQUgsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsNEZBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLHdFQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBRiw2QkFBQSxBQUFBQywyQkFBQSxLQUFBQyxlQUFBLEtBQUEsQUFBQSxnRkFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQSw2R0FBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsdURBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUEsOEVBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSx1REFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLE9BQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLDhFQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBRiw2QkFBQSxBQUFBQywyQkFBQSxLQUFBQyxlQUFBLEtBQUEsQUFBQSxnRkFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLE9BQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLHVEQUFBLEtBQUEsSUFBQSxTQUFBLEtBQUEsSUFBQSxTQUFBLEtBQUEsSUFBQSxTQUFBLEtBQUEsSUFBQSxVQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBRiw2QkFBQSxBQUFBQywyQkFBQSxLQUFBQyxlQUFBLEtBQUEsQUFBQSwwREFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQSw2R0FBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQSw0RkFBQSxLQUFBLElBQUEsU0FBQSxLQUFBLElBQUEsU0FBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsS0FBQSxLQUFBLElBQUEsdHJDQUd1RW9CLGllQUM1QkE7O0FBSjNDLEFBQUEsQ0FBQSwwREFBQSwxREFBVUQ7O0FBQVZ4QiIsIm5hbWVzIjpbInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9pZCIsImNsanMuY29yZS9hdG9tIiwicmUtZnJhbWUudHJhY2UkbWFjcm9zLypjdXJyZW50LXRyYWNlKiIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9yZXNldC10cmFjaW5nISIsImNsanMuY29yZS9yZXNldCEiLCJnb29nL2RlZmluZSIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9pcy10cmFjZS1lbmFibGVkPyIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy90cmFjZS1lbmFibGVkPyIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy90cmFjZS1jYnMiLCJqcy9yZS1mcmFtZSIsImpzL3JlLWZyYW1lLnRyYWNlJG1hY3JvcyIsImpzL3JlLWZyYW1lLnRyYWNlJG1hY3Jvcy50cmFjZXMiLCJyZS1mcmFtZS50cmFjZSRtYWNyb3MvdHJhY2VzIiwianMvcmUtZnJhbWUudHJhY2UkbWFjcm9zLm5leHQtZGVsaXZlcnkiLCJyZS1mcmFtZS50cmFjZSRtYWNyb3MvbmV4dC1kZWxpdmVyeSIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9yZWdpc3Rlci10cmFjZS1jYiIsImtleSIsImYiLCJjbGpzLmNvcmUvc3dhcCEiLCJjbGpzLmNvcmUvYXNzb2MiLCJyZS1mcmFtZS5sb2dnZXJzL2NvbnNvbGUiLCJyZS1mcmFtZS50cmFjZSRtYWNyb3MvcmVtb3ZlLXRyYWNlLWNiIiwiY2xqcy5jb3JlL2Rpc3NvYyIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9uZXh0LWlkIiwiY2xqcy5jb3JlL2luYyIsInBfXzcwNCIsIm1hcF9fNzA1IiwiY2xqcy5jb3JlL1BST1RPQ09MX1NFTlRJTkVMIiwiY2xqcy5jb3JlL2FwcGx5IiwiY2xqcy5jb3JlL2hhc2gtbWFwIiwiY2xqcy5jb3JlL2dldCIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy9zdGFydC10cmFjZSIsIm9wZXJhdGlvbiIsIm9wLXR5cGUiLCJ0YWdzIiwiY2hpbGQtb2YiLCJvcl9fMTAxMTJfX2F1dG9fXyIsInJlLWZyYW1lLmludGVyb3Avbm93IiwicmUtZnJhbWUudHJhY2UkbWFjcm9zL2RlYm91bmNlLXRpbWUiLCJyZS1mcmFtZS50cmFjZSRtYWNyb3MvZGVib3VuY2UiLCJpbnRlcnZhbCIsImdvb2cuZnVuY3Rpb25zL2RlYm91bmNlIiwicmUtZnJhbWUudHJhY2UkbWFjcm9zL3NjaGVkdWxlLWRlYm91bmNlIiwic2VxX183MDciLCJjbGpzLmNvcmUvc2VxIiwiY2xqcy5jb3JlL2RlcmVmIiwiY2h1bmtfXzcwOCIsImNvdW50X183MDkiLCJpX183MTAiLCJ2ZWNfXzcxOSIsImNsanMuY29yZS8tbnRoIiwiY2xqcy5jb3JlL250aCIsInRlbXBfXzk2NDZfX2F1dG9fXyIsImNsanMuY29yZS9jaHVua2VkLXNlcT8iLCJjX18xMTcyOV9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rLWZpcnN0IiwiY2xqcy5jb3JlL2NodW5rLXJlc3QiLCJjbGpzLmNvcmUvY291bnQiLCJ2ZWNfXzcyMyIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwiayIsImNiIiwiZTcyMiIsImU3MjYiLCJlIiwicmUtZnJhbWUudHJhY2UkbWFjcm9zL3J1bi10cmFjaW5nLWNhbGxiYWNrcyEiLCJub3ciLCJyZXRfXzEyNTYyX19hdXRvX18iLCImZm9ybSIsIiZlbnYiLCJjbGpzLmNvcmUvc2VxdWVuY2UiLCJjbGpzLmNvcmUvY29uY2F0IiwiY2xqcy5jb3JlL0xpc3QiLCJjbGpzLmNvcmUvdmVjIiwicmUtZnJhbWUudHJhY2UkbWFjcm9zL2ZpbmlzaC10cmFjZSIsInRyYWNlIiwidmFyX2FyZ3MiLCJhcmdzX18xMjQ2Ml9fYXV0b19fIiwibGVuX18xMjQ0NV9fYXV0b19fIiwiaV9fMTI0NDZfX2F1dG9fXyIsImFyZ3NlcV9fMTI0NjNfX2F1dG9fXyIsInJlLWZyYW1lLnRyYWNlJG1hY3Jvcy93aXRoLXRyYWNlIiwicF9fNzU4IiwibWFwX183NTkiLCJzZXE3NTQiLCJHX183NTUiLCJHX183NTYiLCJHX183NTciLCJzZWxmX18xMjQyMF9fYXV0b19fIiwidHJhY2Utb3B0cyIsImJvZHkiLCJyZS1mcmFtZS50cmFjZSRtYWNyb3MvbWVyZ2UtdHJhY2UhIiwibSIsImNsanMuY29yZS9JbmRleGVkU2VxIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZS1mcmFtZS50cmFjZVxuICBcIlRyYWNpbmcgZm9yIHJlLWZyYW1lLlxuICBBbHBoYSBxdWFsaXR5LCBzdWJqZWN0IHRvIGNoYW5nZS9icmVhayBhdCBhbnkgdGltZS5cIlxuICAjPyg6Y2xqcyAoOnJlcXVpcmUtbWFjcm9zIFtuZXQuY2dyYW5kLm1hY3JvdmljaCA6YXMgbWFjcm9zXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZS1mcmFtZS50cmFjZSA6cmVmZXIgW2ZpbmlzaC10cmFjZSB3aXRoLXRyYWNlIG1lcmdlLXRyYWNlIV1dKSlcbiAgKDpyZXF1aXJlIFtyZS1mcmFtZS5pbnRlcm9wIDphcyBpbnRlcm9wXVxuICAgICAgICAgICAgW3JlLWZyYW1lLmxvZ2dlcnMgOnJlZmVyIFtjb25zb2xlXV1cbiAgICAgICAgICAgICM/KDpjbGogW25ldC5jZ3JhbmQubWFjcm92aWNoIDphcyBtYWNyb3NdKVxuICAgICAgICAgICAgIz8oOmNsanMgW2dvb2cuZnVuY3Rpb25zXSkpKVxuXG4oZGVmIGlkIChhdG9tIDApKVxuKGRlZiBeOmR5bmFtaWMgKmN1cnJlbnQtdHJhY2UqIG5pbClcblxuKGRlZm4gcmVzZXQtdHJhY2luZyEgW11cbiAgKHJlc2V0ISBpZCAwKSlcblxuIz8oOmNsanMgKGdvb2ctZGVmaW5lIHRyYWNlLWVuYWJsZWQ/IGZhbHNlKVxuICAgOmNsaiAgKGRlZiBeYm9vbGVhbiB0cmFjZS1lbmFibGVkPyBmYWxzZSkpXG5cbihkZWZuIF5ib29sZWFuIGlzLXRyYWNlLWVuYWJsZWQ/XG4gIFwiU2VlIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZC9tc2cvY2xvanVyZXNjcmlwdC9qazQza21ZaU1oQS9JSGdsVnJfVFBkZ0ogZm9yIG1vcmUgZGV0YWlsc1wiXG4gIDs7IFdlIGNhbiByZW1vdmUgdGhpcyBleHRyYSBzdGVwIG9mIHR5cGUgaGludGluZyBpbmRpcmVjdGlvbiBvbmNlIG91ciBtaW5pbXVtIENMSlMgdmVyc2lvbiBpbmNsdWRlc1xuICA7OyBodHRwczovL2Rldi5jbG9qdXJlLm9yZy9qaXJhL2Jyb3dzZS9DTEpTLTE0MzlcbiAgOzsgcjEuMTAuNjMgaXMgdGhlIGZpcnN0IHZlcnNpb24gd2l0aCB0aGlzOlxuICA7OyBodHRwczovL2dpdGh1Yi5jb20vY2xvanVyZS9jbG9qdXJlc2NyaXB0L2NvbW1pdC85ZWM3OTZkNzkxYjFiMmJkNjEzYWYyZjYyY2RlY2ZkMjVjYWE2NDgyXG4gIFtdXG4gIHRyYWNlLWVuYWJsZWQ/KVxuXG4oZGVmIHRyYWNlLWNicyAoYXRvbSB7fSkpXG4oZGVmb25jZSB0cmFjZXMgKGF0b20gW10pKVxuKGRlZm9uY2UgbmV4dC1kZWxpdmVyeSAoYXRvbSAwKSlcblxuKGRlZm4gcmVnaXN0ZXItdHJhY2UtY2JcbiAgXCJSZWdpc3RlcnMgYSB0cmFjaW5nIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcmVjZWl2ZSBhIGNvbGxlY3Rpb24gb2Ygb25lIG9yIG1vcmUgdHJhY2VzLlxuICBXaWxsIHJlcGxhY2UgYW4gZXhpc3RpbmcgY2FsbGJhY2sgZnVuY3Rpb24gaWYgaXQgc2hhcmVzIHRoZSBzYW1lIGtleS5cIlxuICBba2V5IGZdXG4gIChpZiB0cmFjZS1lbmFibGVkP1xuICAgIChzd2FwISB0cmFjZS1jYnMgYXNzb2Mga2V5IGYpXG4gICAgKGNvbnNvbGUgOndhcm4gXCJUcmFjaW5nIGlzIG5vdCBlbmFibGVkLiBQbGVhc2Ugc2V0IHtcXFwicmVfZnJhbWUudHJhY2UudHJhY2VfZW5hYmxlZF9RTUFSS19cXFwiIHRydWV9IGluIDpjbG9zdXJlLWRlZmluZXMuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RheTgvcmUtZnJhbWUtMTB4I2luc3RhbGxhdGlvbi5cIikpKVxuXG4oZGVmbiByZW1vdmUtdHJhY2UtY2IgW2tleV1cbiAgKHN3YXAhIHRyYWNlLWNicyBkaXNzb2Mga2V5KVxuICBuaWwpXG5cbihkZWZuIG5leHQtaWQgW10gKHN3YXAhIGlkIGluYykpXG5cbihkZWZuIHN0YXJ0LXRyYWNlIFt7OmtleXMgW29wZXJhdGlvbiBvcC10eXBlIHRhZ3MgY2hpbGQtb2ZdfV1cbiAgezppZCAgICAgICAgKG5leHQtaWQpXG4gICA6b3BlcmF0aW9uIG9wZXJhdGlvblxuICAgOm9wLXR5cGUgICBvcC10eXBlXG4gICA6dGFncyAgICAgIHRhZ3NcbiAgIDpjaGlsZC1vZiAgKG9yIGNoaWxkLW9mICg6aWQgKmN1cnJlbnQtdHJhY2UqKSlcbiAgIDpzdGFydCAgICAgKGludGVyb3Avbm93KX0pXG5cbjs7IE9uIGRlYm91bmNpbmdcbjs7XG47OyBXZSBkZWJvdW5jZSBkZWxpdmVyaW5nIHRyYWNlcyB0byByZWdpc3RlcmVkIGNicyBzbyB0aGF0XG47OyB3ZSBjYW4gZGVsaXZlciB0aGVtIGluIGJhdGNoZXMuIFRoaXMgYWlkcyB1cyBpbiBlZmZpY2llbmN5XG47OyBidXQgYWxzbyBpbXBvcnRhbnRseSBsZXRzIHVzIGF2b2lkIHNsb3dpbmcgZG93biB0aGUgaG9zdFxuOzsgYXBwbGljYXRpb24gYnkgcnVubmluZyBhbnkgdHJhY2UgY29kZSBpbiB0aGUgY3JpdGljYWwgcGF0aC5cbjs7XG47OyBXZSBhZGQgYSBsaWdodHdlaWdodCBjaGVjayBvbiB0b3Agb2YgZ29vZy5mdW5jdGlvbnMvZGVib3VuY2Vcbjs7IHRvIGF2b2lkIGNvbnN0YW50IHNldHRpbmcgYW5kIGNhbmNlbGxpbmcgb2YgdGltZW91dHMuIFRoaXNcbjs7IG1lYW5zIHRoYXQgd2Ugd2lsbCBkZWxpdmVyIHRyYWNlcyBiZXR3ZWVuIDEwLTUwIG1zIGZyb20gdGhlXG47OyBsYXN0IHRyYWNlIGJlaW5nIGNyZWF0ZWQsIHdoaWNoIHN0aWxsIGFjaGlldmVzIG91ciBnb2Fscy5cblxuKGRlZiBkZWJvdW5jZS10aW1lIDUwKVxuXG4oZGVmbiBkZWJvdW5jZSBbZiBpbnRlcnZhbF1cbiAgIz8oOmNsanMgKGdvb2cuZnVuY3Rpb25zL2RlYm91bmNlIGYgaW50ZXJ2YWwpXG4gICAgIDpjbGogIChmKSkpXG5cbihkZWYgc2NoZWR1bGUtZGVib3VuY2VcbiAgKGRlYm91bmNlXG4gICAgKGZuIHRyYWNpbmctY2ItZGVib3VuY2VkIFtdXG4gICAgICAoZG9zZXEgW1trIGNiXSBAdHJhY2UtY2JzXVxuICAgICAgICAodHJ5IChjYiBAdHJhY2VzKVxuICAgICAgICAgICAgICM/KDpjbGogKGNhdGNoIEV4Y2VwdGlvbiBlXG4gICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciBcIkVycm9yIHRocm93biBmcm9tIHRyYWNlIGNiXCIgayBcIndoaWxlIHN0b3JpbmdcIiBAdHJhY2VzIGUpKSlcbiAgICAgICAgICAgICAjPyg6Y2xqcyAoY2F0Y2ggOmRlZmF1bHQgZVxuICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgOmVycm9yIFwiRXJyb3IgdGhyb3duIGZyb20gdHJhY2UgY2JcIiBrIFwid2hpbGUgc3RvcmluZ1wiIEB0cmFjZXMgZSkpKSkpXG4gICAgICAocmVzZXQhIHRyYWNlcyBbXSkpXG4gICAgZGVib3VuY2UtdGltZSkpXG5cbihkZWZuIHJ1bi10cmFjaW5nLWNhbGxiYWNrcyEgW25vd11cbiAgOzsgT3B0aW1pc2VkIGRlYm91bmNlLCB3ZSBvbmx5IHJlLWRlYm91bmNlXG4gIDs7IGlmIHdlIGFyZSBjbG9zZSB0byBkZWxpdmVyeSB0aW1lXG4gIDs7IHRvIGF2b2lkIGNvbnN0YW50IHNldHRpbmcgYW5kIGNhbmNlbGxpbmdcbiAgOzsgdGltZW91dHMuXG5cbiAgOzsgSWYgd2UgYXJlIHdpdGhpbiAyNSBtcyBvZiBuZXh0IGRlbGl2ZXJ5XG4gICh3aGVuICg8ICgtIEBuZXh0LWRlbGl2ZXJ5IDI1KSBub3cpXG4gICAgKHNjaGVkdWxlLWRlYm91bmNlKVxuICAgIDs7IFRoZSBuZXh0LWRlbGl2ZXJ5IHRpbWUgaXMgbm90IHBlcmZlY3RseSBhY2N1cmF0ZVxuICAgIDs7IGFzIHNjaGVkdWxpbmcgdGhlIGRlYm91bmNlIHRha2VzIHNvbWUgdGltZSwgYnV0XG4gICAgOzsgaXQncyBnb29kIGVub3VnaCBmb3Igb3VyIHB1cnBvc2VzIGhlcmUuXG4gICAgKHJlc2V0ISBuZXh0LWRlbGl2ZXJ5ICgrIG5vdyBkZWJvdW5jZS10aW1lKSkpKVxuXG4obWFjcm9zL2RlZnRpbWVcbiAgKGRlZm1hY3JvIGZpbmlzaC10cmFjZSBbdHJhY2VdXG4gICAgIGAod2hlbiAoaXMtdHJhY2UtZW5hYmxlZD8pXG4gICAgICAgIChsZXQgW2VuZCMgICAgICAoaW50ZXJvcC9ub3cpXG4gICAgICAgICAgICAgIGR1cmF0aW9uIyAoLSBlbmQjICg6c3RhcnQgfnRyYWNlKSldXG4gICAgICAgICAgKHN3YXAhIHRyYWNlcyBjb25qIChhc3NvYyB+dHJhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZHVyYXRpb24gZHVyYXRpb24jXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmVuZCAoaW50ZXJvcC9ub3cpKSlcbiAgICAgICAgICAocnVuLXRyYWNpbmctY2FsbGJhY2tzISBlbmQjKSkpKVxuXG4gKGRlZm1hY3JvIHdpdGgtdHJhY2VcbiAgICAgXCJDcmVhdGUgYSB0cmFjZSBpbnNpZGUgdGhlIHNjb3BlIG9mIHRoZSB3aXRoLXRyYWNlIG1hY3JvXG5cbiAgICAgICAgICBDb21tb24ga2V5cyBmb3IgdHJhY2Utb3B0c1xuICAgICAgICAgIDpvcC10eXBlIC0gd2hhdCBraW5kIG9mIG9wZXJhdGlvbiBpcyB0aGlzPyBlLmcuIDpzdWIvY3JlYXRlLCA6cmVuZGVyLlxuICAgICAgICAgIDpvcGVyYXRpb24gLSBpZGVudGlmaWVyIGZvciB0aGUgb3BlcmF0aW9uLCBmb3IgYSBzdWJzY3JpcHRpb24gaXQgd291bGQgYmUgdGhlIHN1YnNjcmlwdGlvbiBrZXl3b3JkXG4gICAgICAgICAgOnRhZ3MgLSBhIG1hcCBvZiBhcmJpdHJhcnkga3YgcGFpcnNcIlxuICAgICBbezprZXlzIFtvcGVyYXRpb24gb3AtdHlwZSB0YWdzIGNoaWxkLW9mXSA6YXMgdHJhY2Utb3B0c30gJiBib2R5XVxuICAgICBgKGlmIChpcy10cmFjZS1lbmFibGVkPylcbiAgICAgICAgKGJpbmRpbmcgWypjdXJyZW50LXRyYWNlKiAoc3RhcnQtdHJhY2UgfnRyYWNlLW9wdHMpXVxuICAgICAgICAgICh0cnkgfkBib2R5XG4gICAgICAgICAgICAgICAoZmluYWxseSAoZmluaXNoLXRyYWNlICpjdXJyZW50LXRyYWNlKikpKSlcbiAgICAgICAgKGRvIH5AYm9keSkpKVxuXG4gIChkZWZtYWNybyBtZXJnZS10cmFjZSEgW21dXG4gICAgIDs7IE92ZXJ3cml0ZSBrZXlzIGluIHRhZ3MsIGFuZCBhbGwgdG9wIGxldmVsIGtleXMuXG4gICAgIGAod2hlbiAoaXMtdHJhY2UtZW5hYmxlZD8pXG4gICAgICAgIChsZXQgW25ldy10cmFjZSMgKC0+ICh1cGRhdGUgKmN1cnJlbnQtdHJhY2UqIDp0YWdzIG1lcmdlICg6dGFncyB+bSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXJnZSAoZGlzc29jIH5tIDp0YWdzKSkpXVxuICAgICAgICAgIChzZXQhICpjdXJyZW50LXRyYWNlKiBuZXctdHJhY2UjKSlcbiAgICAgICAgbmlsKSkpXG4iXX0=