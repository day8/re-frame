// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.fx");
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",(-1237829572));
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,re_frame.fx.kind))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
/**
 * Register the given effect `handler` for the given `id`.
 * 
 *   `id` is keyword, often namespaced.
 *   `handler` is a side-effecting function which takes a single argument and whose return
 *   value is ignored.
 * 
 *   Example Use
 *   -----------
 * 
 *   First, registration ... associate `:effect2` with a handler.
 * 
 *   (reg-fx
 *   :effect2
 *   (fn [value]
 *      ... do something side-effect-y))
 * 
 *   Then, later, if an event handler were to return this effects map ...
 * 
 *   {...
 * :effect2  [1 2]}
 * 
 * ... then the `handler` `fn` we registered previously, using `reg-fx`, will be
 * called with an argument of `[1 2]`.
 */
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler.call(null,re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"do-fx","do-fx",(1194163050)),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__999 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__1000 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("event","do-fx","event/do-fx",(1357330452))], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__1000);

try{try{var seq__1001 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(context));
var chunk__1002 = null;
var count__1003 = (0);
var i__1004 = (0);
while(true){
if((i__1004 < count__1003)){
var vec__1011 = cljs.core._nth.call(null,chunk__1002,i__1004);
var effect_key = cljs.core.nth.call(null,vec__1011,(0),null);
var effect_value = cljs.core.nth.call(null,vec__1011,(1),null);
var temp__9584__auto___1033 = re_frame.registrar.get_handler.call(null,re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__9584__auto___1033)){
var effect_fn_1034 = temp__9584__auto___1033;
effect_fn_1034.call(null,effect_value);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: no handler registered for effect:",effect_key,". Ignoring.");
}


var G__1035 = seq__1001;
var G__1036 = chunk__1002;
var G__1037 = count__1003;
var G__1038 = (i__1004 + (1));
seq__1001 = G__1035;
chunk__1002 = G__1036;
count__1003 = G__1037;
i__1004 = G__1038;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__1001);
if(temp__9646__auto__){
var seq__1001__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1001__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__1001__$1);
var G__1039 = cljs.core.chunk_rest.call(null,seq__1001__$1);
var G__1040 = c__11729__auto__;
var G__1041 = cljs.core.count.call(null,c__11729__auto__);
var G__1042 = (0);
seq__1001 = G__1039;
chunk__1002 = G__1040;
count__1003 = G__1041;
i__1004 = G__1042;
continue;
} else {
var vec__1014 = cljs.core.first.call(null,seq__1001__$1);
var effect_key = cljs.core.nth.call(null,vec__1014,(0),null);
var effect_value = cljs.core.nth.call(null,vec__1014,(1),null);
var temp__9584__auto___1043 = re_frame.registrar.get_handler.call(null,re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__9584__auto___1043)){
var effect_fn_1044 = temp__9584__auto___1043;
effect_fn_1044.call(null,effect_value);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: no handler registered for effect:",effect_key,". Ignoring.");
}


var G__1045 = cljs.core.next.call(null,seq__1001__$1);
var G__1046 = null;
var G__1047 = (0);
var G__1048 = (0);
seq__1001 = G__1045;
chunk__1002 = G__1046;
count__1003 = G__1047;
i__1004 = G__1048;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___1049 = re_frame.interop.now.call(null);
var duration__23__auto___1050 = (end__22__auto___1049 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___1050,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___1049);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__999);
}} else {
var seq__1017 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(context));
var chunk__1018 = null;
var count__1019 = (0);
var i__1020 = (0);
while(true){
if((i__1020 < count__1019)){
var vec__1027 = cljs.core._nth.call(null,chunk__1018,i__1020);
var effect_key = cljs.core.nth.call(null,vec__1027,(0),null);
var effect_value = cljs.core.nth.call(null,vec__1027,(1),null);
var temp__9584__auto___1051 = re_frame.registrar.get_handler.call(null,re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__9584__auto___1051)){
var effect_fn_1052 = temp__9584__auto___1051;
effect_fn_1052.call(null,effect_value);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: no handler registered for effect:",effect_key,". Ignoring.");
}


var G__1053 = seq__1017;
var G__1054 = chunk__1018;
var G__1055 = count__1019;
var G__1056 = (i__1020 + (1));
seq__1017 = G__1053;
chunk__1018 = G__1054;
count__1019 = G__1055;
i__1020 = G__1056;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__1017);
if(temp__9646__auto__){
var seq__1017__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1017__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__1017__$1);
var G__1057 = cljs.core.chunk_rest.call(null,seq__1017__$1);
var G__1058 = c__11729__auto__;
var G__1059 = cljs.core.count.call(null,c__11729__auto__);
var G__1060 = (0);
seq__1017 = G__1057;
chunk__1018 = G__1058;
count__1019 = G__1059;
i__1020 = G__1060;
continue;
} else {
var vec__1030 = cljs.core.first.call(null,seq__1017__$1);
var effect_key = cljs.core.nth.call(null,vec__1030,(0),null);
var effect_value = cljs.core.nth.call(null,vec__1030,(1),null);
var temp__9584__auto___1061 = re_frame.registrar.get_handler.call(null,re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__9584__auto___1061)){
var effect_fn_1062 = temp__9584__auto___1061;
effect_fn_1062.call(null,effect_value);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: no handler registered for effect:",effect_key,". Ignoring.");
}


var G__1063 = cljs.core.next.call(null,seq__1017__$1);
var G__1064 = null;
var G__1065 = (0);
var G__1066 = (0);
seq__1017 = G__1063;
chunk__1018 = G__1064;
count__1019 = G__1065;
i__1020 = G__1066;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx.call(null,new cljs.core.Keyword(null,"dispatch-later","dispatch-later",(291951390)),(function (value){
var seq__1067 = cljs.core.seq.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,value));
var chunk__1068 = null;
var count__1069 = (0);
var i__1070 = (0);
while(true){
if((i__1070 < count__1069)){
var map__1075 = cljs.core._nth.call(null,chunk__1068,i__1070);
var map__1075__$1 = (((((!((map__1075 == null))))?(((((map__1075.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1075.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1075):map__1075);
var effect = map__1075__$1;
var ms = cljs.core.get.call(null,map__1075__$1,new cljs.core.Keyword(null,"ms","ms",(-1152709733)));
var dispatch = cljs.core.get.call(null,map__1075__$1,new cljs.core.Keyword(null,"dispatch","dispatch",(1319337009)));
if(((cljs.core.empty_QMARK_.call(null,dispatch)) || ((!(typeof ms === 'number'))))){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: ignoring bad :dispatch-later value:",effect);
} else {
re_frame.interop.set_timeout_BANG_.call(null,((function (seq__1067,chunk__1068,count__1069,i__1070,map__1075,map__1075__$1,effect,ms,dispatch){
return (function (){
return re_frame.router.dispatch.call(null,dispatch);
});})(seq__1067,chunk__1068,count__1069,i__1070,map__1075,map__1075__$1,effect,ms,dispatch))
,ms);
}


var G__1079 = seq__1067;
var G__1080 = chunk__1068;
var G__1081 = count__1069;
var G__1082 = (i__1070 + (1));
seq__1067 = G__1079;
chunk__1068 = G__1080;
count__1069 = G__1081;
i__1070 = G__1082;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__1067);
if(temp__9646__auto__){
var seq__1067__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1067__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__1067__$1);
var G__1083 = cljs.core.chunk_rest.call(null,seq__1067__$1);
var G__1084 = c__11729__auto__;
var G__1085 = cljs.core.count.call(null,c__11729__auto__);
var G__1086 = (0);
seq__1067 = G__1083;
chunk__1068 = G__1084;
count__1069 = G__1085;
i__1070 = G__1086;
continue;
} else {
var map__1077 = cljs.core.first.call(null,seq__1067__$1);
var map__1077__$1 = (((((!((map__1077 == null))))?(((((map__1077.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1077.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1077):map__1077);
var effect = map__1077__$1;
var ms = cljs.core.get.call(null,map__1077__$1,new cljs.core.Keyword(null,"ms","ms",(-1152709733)));
var dispatch = cljs.core.get.call(null,map__1077__$1,new cljs.core.Keyword(null,"dispatch","dispatch",(1319337009)));
if(((cljs.core.empty_QMARK_.call(null,dispatch)) || ((!(typeof ms === 'number'))))){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: ignoring bad :dispatch-later value:",effect);
} else {
re_frame.interop.set_timeout_BANG_.call(null,((function (seq__1067,chunk__1068,count__1069,i__1070,map__1077,map__1077__$1,effect,ms,dispatch,seq__1067__$1,temp__9646__auto__){
return (function (){
return re_frame.router.dispatch.call(null,dispatch);
});})(seq__1067,chunk__1068,count__1069,i__1070,map__1077,map__1077__$1,effect,ms,dispatch,seq__1067__$1,temp__9646__auto__))
,ms);
}


var G__1087 = cljs.core.next.call(null,seq__1067__$1);
var G__1088 = null;
var G__1089 = (0);
var G__1090 = (0);
seq__1067 = G__1087;
chunk__1068 = G__1088;
count__1069 = G__1089;
i__1070 = G__1090;
continue;
}
} else {
return null;
}
}
break;
}
}));
re_frame.fx.reg_fx.call(null,new cljs.core.Keyword(null,"dispatch","dispatch",(1319337009)),(function (value){
if((!(cljs.core.vector_QMARK_.call(null,value)))){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value);
} else {
return re_frame.router.dispatch.call(null,value);
}
}));
re_frame.fx.reg_fx.call(null,new cljs.core.Keyword(null,"dispatch-n","dispatch-n",(-504469236)),(function (value){
if((!(cljs.core.sequential_QMARK_.call(null,value)))){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value);
} else {
var seq__1091 = cljs.core.seq.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,value));
var chunk__1092 = null;
var count__1093 = (0);
var i__1094 = (0);
while(true){
if((i__1094 < count__1093)){
var event = cljs.core._nth.call(null,chunk__1092,i__1094);
re_frame.router.dispatch.call(null,event);


var G__1095 = seq__1091;
var G__1096 = chunk__1092;
var G__1097 = count__1093;
var G__1098 = (i__1094 + (1));
seq__1091 = G__1095;
chunk__1092 = G__1096;
count__1093 = G__1097;
i__1094 = G__1098;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__1091);
if(temp__9646__auto__){
var seq__1091__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1091__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__1091__$1);
var G__1099 = cljs.core.chunk_rest.call(null,seq__1091__$1);
var G__1100 = c__11729__auto__;
var G__1101 = cljs.core.count.call(null,c__11729__auto__);
var G__1102 = (0);
seq__1091 = G__1099;
chunk__1092 = G__1100;
count__1093 = G__1101;
i__1094 = G__1102;
continue;
} else {
var event = cljs.core.first.call(null,seq__1091__$1);
re_frame.router.dispatch.call(null,event);


var G__1103 = cljs.core.next.call(null,seq__1091__$1);
var G__1104 = null;
var G__1105 = (0);
var G__1106 = (0);
seq__1091 = G__1103;
chunk__1092 = G__1104;
count__1093 = G__1105;
i__1094 = G__1106;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx.call(null,new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",(-1096518994)),(function (value){
var clear_event = cljs.core.partial.call(null,re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_.call(null,value)){
var seq__1107 = cljs.core.seq.call(null,value);
var chunk__1108 = null;
var count__1109 = (0);
var i__1110 = (0);
while(true){
if((i__1110 < count__1109)){
var event = cljs.core._nth.call(null,chunk__1108,i__1110);
clear_event.call(null,event);


var G__1111 = seq__1107;
var G__1112 = chunk__1108;
var G__1113 = count__1109;
var G__1114 = (i__1110 + (1));
seq__1107 = G__1111;
chunk__1108 = G__1112;
count__1109 = G__1113;
i__1110 = G__1114;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__1107);
if(temp__9646__auto__){
var seq__1107__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1107__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__1107__$1);
var G__1115 = cljs.core.chunk_rest.call(null,seq__1107__$1);
var G__1116 = c__11729__auto__;
var G__1117 = cljs.core.count.call(null,c__11729__auto__);
var G__1118 = (0);
seq__1107 = G__1115;
chunk__1108 = G__1116;
count__1109 = G__1117;
i__1110 = G__1118;
continue;
} else {
var event = cljs.core.first.call(null,seq__1107__$1);
clear_event.call(null,event);


var G__1119 = cljs.core.next.call(null,seq__1107__$1);
var G__1120 = null;
var G__1121 = (0);
var G__1122 = (0);
seq__1107 = G__1119;
chunk__1108 = G__1120;
count__1109 = G__1121;
i__1110 = G__1122;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event.call(null,value);
}
}));
re_frame.fx.reg_fx.call(null,new cljs.core.Keyword(null,"db","db",(993250759)),(function (value){
if((!((cljs.core.deref.call(null,re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_.call(null,re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceURL=re_frame/fx.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvZnguanMiLCJzb3VyY2VzIjpbImZ4LmNsanMiXSwibGluZUNvdW50Ijo0MzcsIm1hcHBpbmdzIjoiO0FBY0EsbUJBQUEsbkJBQUtBO0FBQ0wsb0JBQVEsQUFBQ0UsbUNBQXlCRjtBQUFsQztBQUFBLEFBQUEsTUFBQSxLQUFBQyxNQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUFBLHJCQUFNRSxrREF3QkhDLEdBQUdDO0FBeEJOLEFBeUJFLE9BQUNDLDhDQUFpQk4saUJBQUtJLEdBQUdDOztBQUk1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFLRSxvQkFxQkgsZ0RBQUEsb0RBQUEseURBQUEsN0pBQUNDLHFOQUVRLGtDQUNHQztBQURILEFBRUUsR0FBQSxBQUFBQztBQUFBLElBQUFDLDBDQUFBQztJQUFBQywyQ0FBQSxBQUFBQyxxQ0FBQSwyQ0FBQSw4REFBQTtBQUFBLEFBQUEsQ0FBQUYsMkNBQUFDOztBQUFBLElBQUEsQUFBQSxJQUFBLEFBRUUsSUFBQVUsWUFBQSxBQUFBQyx3QkFBa0MsQUFBQSwyRkFBVWY7SUFBNUNnQixjQUFBO0lBQUFDLGNBQUE7SUFBQUMsVUFBQTs7QUFBQSxBQUFBLEdBQUEsQUFBQSxDQUFBQSxVQUFBRDtBQUFBLElBQUFFLFlBQUEsQUFBQUMseUJBQUFKLFlBQUFFO2lCQUFBLEFBQUFHLHdCQUFBRixVQUFBLElBQUEsbkRBQVNrQjttQkFBVCxBQUFBaEIsd0JBQUFGLFVBQUEsSUFBQSxyREFBb0JtQjtBQUFwQixBQUFBLEFBQ0UsSUFBQUMsMEJBQW1CLHFFQUFBLHJFQUFDRSx5Q0FBWWxELGlCQUFLOEM7QUFBckMsQUFBQSxvQkFBQUU7QUFBQSxxQkFBQUEsakJBQVNDO0FBQVQsQUFDRSxBQUFDQSx5QkFBVUY7O0FBQ1gsbUNBQUEseURBQUEseURBQUEsckpBQUNJLDBJQUE2REw7OztBQUhsRTtBQUFBLGNBQUF2QjtjQUFBRTtjQUFBQztjQUFBLENBQUFDLFVBQUE7Ozs7Ozs7QUFBQSxJQUFBSSxxQkFBQSxBQUFBUCx3QkFBQUQ7QUFBQSxBQUFBLEdBQUFRO0FBQUEsQUFBQSxJQUFBUixnQkFBQVE7QUFBQSxBQUFBLEdBQUEsQUFBQUMsdUNBQUFUO0FBQUEsSUFBQVUsbUJBQUEsQUFBQUMsZ0NBQUFYO0FBQUEsQUFBQSxjQUFBLEFBQUFZLCtCQUFBWjtjQUFBVTtjQUFBLEFBQUFHLDBCQUFBSDtjQUFBOzs7Ozs7O0FBQUEsSUFBQUksWUFBQSxBQUFBQywwQkFBQWY7aUJBQUEsQUFBQU8sd0JBQUFPLFVBQUEsSUFBQSxuREFBU1M7bUJBQVQsQUFBQWhCLHdCQUFBTyxVQUFBLElBQUEsckRBQW9CVTtBQUFwQixBQUFBLEFBQ0UsSUFBQUMsMEJBQW1CLHFFQUFBLHJFQUFDRSx5Q0FBWWxELGlCQUFLOEM7QUFBckMsQUFBQSxvQkFBQUU7QUFBQSxxQkFBQUEsakJBQVNDO0FBQVQsQUFDRSxBQUFDQSx5QkFBVUY7O0FBQ1gsbUNBQUEseURBQUEseURBQUEsckpBQUNJLDBJQUE2REw7OztBQUhsRTtBQUFBLGNBQUEsQUFBQVAseUJBQUFoQjtjQUFBO2NBQUE7Y0FBQTs7Ozs7Ozs7QUFBQTs7Ozs7VUFGRixBQUFBLEdBQUEsQUFBQWI7QUFBQSxBQUFBLElBQUFLLHVCQUFBLEFBQUFDO0lBQUFDLDRCQUFBLENBQUFGLHVCQUFBLEFBQUEsdUZBQUFIO0FBQUEsQUFBQSxBQUFBTSwrQkFBQUMsc0JBQUFDLGVBQUEsQUFBQUMsMEJBQUFULHlDQUFBLCtEQUFBSywwQkFBQSxxREFBQSxBQUFBRDs7QUFBQSxBQUFBTSxxREFBQVA7O0FBQUE7V0FBQSxBQUFBLENBQUFILDJDQUFBRDs7QUFBQSxBQUVFLElBQUE2QixZQUFBLEFBQUFoQix3QkFBa0MsQUFBQSwyRkFBVWY7SUFBNUNnQyxjQUFBO0lBQUFDLGNBQUE7SUFBQUMsVUFBQTs7QUFBQSxBQUFBLEdBQUEsQUFBQSxDQUFBQSxVQUFBRDtBQUFBLElBQUFFLFlBQUEsQUFBQWYseUJBQUFZLFlBQUFFO2lCQUFBLEFBQUFiLHdCQUFBYyxVQUFBLElBQUEsbkRBQVNFO21CQUFULEFBQUFoQix3QkFBQWMsVUFBQSxJQUFBLHJEQUFvQkc7QUFBcEIsQUFBQSxBQUNFLElBQUFDLDBCQUFtQixxRUFBQSxyRUFBQ0UseUNBQVlsRCxpQkFBSzhDO0FBQXJDLEFBQUEsb0JBQUFFO0FBQUEscUJBQUFBLGpCQUFTQztBQUFULEFBQ0UsQUFBQ0EseUJBQVVGOztBQUNYLG1DQUFBLHlEQUFBLHlEQUFBLHJKQUFDSSwwSUFBNkRMOzs7QUFIbEU7QUFBQSxjQUFBTjtjQUFBQztjQUFBQztjQUFBLENBQUFDLFVBQUE7Ozs7Ozs7QUFBQSxJQUFBWixxQkFBQSxBQUFBUCx3QkFBQWdCO0FBQUEsQUFBQSxHQUFBVDtBQUFBLEFBQUEsSUFBQVMsZ0JBQUFUO0FBQUEsQUFBQSxHQUFBLEFBQUFDLHVDQUFBUTtBQUFBLElBQUFQLG1CQUFBLEFBQUFDLGdDQUFBTTtBQUFBLEFBQUEsY0FBQSxBQUFBTCwrQkFBQUs7Y0FBQVA7Y0FBQSxBQUFBRywwQkFBQUg7Y0FBQTs7Ozs7OztBQUFBLElBQUFZLFlBQUEsQUFBQVAsMEJBQUFFO2lCQUFBLEFBQUFWLHdCQUFBZSxVQUFBLElBQUEsbkRBQVNDO21CQUFULEFBQUFoQix3QkFBQWUsVUFBQSxJQUFBLHJEQUFvQkU7QUFBcEIsQUFBQSxBQUNFLElBQUFDLDBCQUFtQixxRUFBQSxyRUFBQ0UseUNBQVlsRCxpQkFBSzhDO0FBQXJDLEFBQUEsb0JBQUFFO0FBQUEscUJBQUFBLGpCQUFTQztBQUFULEFBQ0UsQUFBQ0EseUJBQVVGOztBQUNYLG1DQUFBLHlEQUFBLHlEQUFBLHJKQUFDSSwwSUFBNkRMOzs7QUFIbEU7QUFBQSxjQUFBLEFBQUFQLHlCQUFBQztjQUFBO2NBQUE7Y0FBQTs7Ozs7Ozs7QUFBQTs7Ozs7OztBQXNCZiw2QkFBQSw3QkFBQ3JDLHVHQUVDLFdBQUtpRDtBQUFMLEFBQ0UsSUFBQUMsWUFBQSxBQUFBN0Isd0JBQXlDLEFBQUMwQywyQkFBT0MscUJBQUtmO0lBQXRERSxjQUFBO0lBQUFDLGNBQUE7SUFBQUMsVUFBQTs7QUFBQSxBQUFBLEdBQUEsQUFBQSxDQUFBQSxVQUFBRDtBQUFBLElBQUFFLFlBQUEsQUFBQTVCLHlCQUFBeUIsWUFBQUU7SUFBQUMsZ0JBQUEsRUFBQSxFQUFBLEdBQUEsQ0FBQUEsYUFBQSxTQUFBLEVBQUEsRUFBQSxDQUFBLEFBQUFBLGdEQUFBLFdBQUEsQ0FBQUMsZ0NBQUEsQUFBQUQsOEJBQUEsS0FBQSxPQUFBLFFBQUEsQUFBQUUsMEJBQUFDLG1CQUFBSCxXQUFBQTthQUFBQSxUQUFpQ1E7U0FBakMsQUFBQUosd0JBQUFKLGNBQUEsM0NBQWdCTTtlQUFoQixBQUFBRix3QkFBQUosY0FBQSxqREFBbUJPO0FBQW5CLEFBQUEsQUFDSSxHQUFJLEVBQUksQUFBQ0ksaUNBQU9KLGVBQVUsR0FBSyxPQUFTRDtBQUN0QyxtQ0FBQSx5REFBQSw1RkFBQ1osNElBQStEYzs7QUFDaEUsNkNBQUEsN0NBQUNJOztBQUFELEFBQWUsT0FBQ0MsbUNBQWdCTjs7Q0FBVUQ7OztBQUhoRDtBQUFBLGNBQUFWO2NBQUFDO2NBQUFDO2NBQUEsQ0FBQUMsVUFBQTs7Ozs7OztBQUFBLElBQUF6QixxQkFBQSxBQUFBUCx3QkFBQTZCO0FBQUEsQUFBQSxHQUFBdEI7QUFBQSxBQUFBLElBQUFzQixnQkFBQXRCO0FBQUEsQUFBQSxHQUFBLEFBQUFDLHVDQUFBcUI7QUFBQSxJQUFBcEIsbUJBQUEsQUFBQUMsZ0NBQUFtQjtBQUFBLEFBQUEsY0FBQSxBQUFBbEIsK0JBQUFrQjtjQUFBcEI7Y0FBQSxBQUFBRywwQkFBQUg7Y0FBQTs7Ozs7OztBQUFBLElBQUE2QixZQUFBLEFBQUF4QiwwQkFBQWU7SUFBQVMsZ0JBQUEsRUFBQSxFQUFBLEdBQUEsQ0FBQUEsYUFBQSxTQUFBLEVBQUEsRUFBQSxDQUFBLEFBQUFBLGdEQUFBLFdBQUEsQ0FBQUosZ0NBQUEsQUFBQUksOEJBQUEsS0FBQSxPQUFBLFFBQUEsQUFBQUgsMEJBQUFDLG1CQUFBRSxXQUFBQTthQUFBQSxUQUFpQ0c7U0FBakMsQUFBQUosd0JBQUFDLGNBQUEsM0NBQWdCQztlQUFoQixBQUFBRix3QkFBQUMsY0FBQSxqREFBbUJFO0FBQW5CLEFBQUEsQUFDSSxHQUFJLEVBQUksQUFBQ0ksaUNBQU9KLGVBQVUsR0FBSyxPQUFTRDtBQUN0QyxtQ0FBQSx5REFBQSw1RkFBQ1osNElBQStEYzs7QUFDaEUsNkNBQUEsN0NBQUNJOztBQUFELEFBQWUsT0FBQ0MsbUNBQWdCTjs7Q0FBVUQ7OztBQUhoRDtBQUFBLGNBQUEsQUFBQXhCLHlCQUFBYztjQUFBO2NBQUE7Y0FBQTs7Ozs7Ozs7QUFBQTs7Ozs7O0FBYUosNkJBQUEsN0JBQUNsRCw0RkFFQyxXQUFLaUQ7QUFBTCxBQUNFLEdBQUEsR0FBUSxBQUFDbUIsa0NBQVFuQjtBQUNmLDBDQUFBLHlEQUFBLDVGQUFDRCxrS0FBcUZDOztBQUN0RixPQUFDa0IsbUNBQWdCbEI7OztBQWdCdkIsNkJBQUEsN0JBQUNqRCxnR0FFQyxXQUFLaUQ7QUFBTCxBQUNFLEdBQUEsR0FBUSxBQUFDb0Isc0NBQVlwQjtBQUNuQiwwQ0FBQSx5REFBQSw1RkFBQ0Qsd0tBQTJGQzs7QUFDNUYsSUFBQXFCLFlBQUEsQUFBQWpELHdCQUFjLEFBQUMwQywyQkFBT0MscUJBQUtmO0lBQTNCc0IsY0FBQTtJQUFBQyxjQUFBO0lBQUFDLFVBQUE7O0FBQUEsQUFBQSxHQUFBLEFBQUEsQ0FBQUEsVUFBQUQ7QUFBQSxZQUFBLEFBQUE5Qyx5QkFBQTZDLFlBQUFFLDdDQUFRQztBQUFSLEFBQUEsQUFBbUMsQUFBQ1AsbUNBQWdCTzs7QUFBcEQ7QUFBQSxjQUFBSjtjQUFBQztjQUFBQztjQUFBLENBQUFDLFVBQUE7Ozs7Ozs7QUFBQSxJQUFBN0MscUJBQUEsQUFBQVAsd0JBQUFpRDtBQUFBLEFBQUEsR0FBQTFDO0FBQUEsQUFBQSxJQUFBMEMsZ0JBQUExQztBQUFBLEFBQUEsR0FBQSxBQUFBQyx1Q0FBQXlDO0FBQUEsSUFBQXhDLG1CQUFBLEFBQUFDLGdDQUFBdUM7QUFBQSxBQUFBLGNBQUEsQUFBQXRDLCtCQUFBc0M7Y0FBQXhDO2NBQUEsQUFBQUcsMEJBQUFIO2NBQUE7Ozs7Ozs7QUFBQSxZQUFBLEFBQUFLLDBCQUFBbUMsbENBQVFJO0FBQVIsQUFBQSxBQUFtQyxBQUFDUCxtQ0FBZ0JPOztBQUFwRDtBQUFBLGNBQUEsQUFBQXRDLHlCQUFBa0M7Y0FBQTtjQUFBO2NBQUE7Ozs7Ozs7O0FBQUE7Ozs7Ozs7QUFhTiw2QkFBQSw3QkFBQ3RFLDZIQUVDLFdBQUtpRDtBQUFMLEFBQ0UsSUFBTTBCLGNBQVksQUFBQ0MsNEJBQVFDLGtDQUFlQztBQUExQyxBQUNFLEdBQUksQUFBQ1Qsc0NBQVlwQjtBQUNmLElBQUE4QixZQUFBLEFBQUExRCx3QkFBYzRCO0lBQWQrQixjQUFBO0lBQUFDLGNBQUE7SUFBQUMsVUFBQTs7QUFBQSxBQUFBLEdBQUEsQUFBQSxDQUFBQSxVQUFBRDtBQUFBLFlBQUEsQUFBQXZELHlCQUFBc0QsWUFBQUUsN0NBQVFSO0FBQVIsQUFBQSxBQUFxQixBQUFDQyxzQkFBWUQ7O0FBQWxDO0FBQUEsY0FBQUs7Y0FBQUM7Y0FBQUM7Y0FBQSxDQUFBQyxVQUFBOzs7Ozs7O0FBQUEsSUFBQXRELHFCQUFBLEFBQUFQLHdCQUFBMEQ7QUFBQSxBQUFBLEdBQUFuRDtBQUFBLEFBQUEsSUFBQW1ELGdCQUFBbkQ7QUFBQSxBQUFBLEdBQUEsQUFBQUMsdUNBQUFrRDtBQUFBLElBQUFqRCxtQkFBQSxBQUFBQyxnQ0FBQWdEO0FBQUEsQUFBQSxjQUFBLEFBQUEvQywrQkFBQStDO2NBQUFqRDtjQUFBLEFBQUFHLDBCQUFBSDtjQUFBOzs7Ozs7O0FBQUEsWUFBQSxBQUFBSywwQkFBQTRDLGxDQUFRTDtBQUFSLEFBQUEsQUFBcUIsQUFBQ0Msc0JBQVlEOztBQUFsQztBQUFBLGNBQUEsQUFBQXRDLHlCQUFBMkM7Y0FBQTtjQUFBO2NBQUE7Ozs7Ozs7O0FBQUE7Ozs7OztBQUNBLE9BQUNKLHNCQUFZMUI7OztBQVVyQiw2QkFBQSw3QkFBQ2pELCtFQUVDLFdBQUtpRDtBQUFMLEFBQ0UsR0FBQSxHQUFRLENBQUEsQUFBQWtDLDBCQUFhQyx3QkFBT25DO0FBQzFCLE9BQUNvQyxnQ0FBT0QsbUJBQU9uQzs7QUFEakIiLCJuYW1lcyI6WyJyZS1mcmFtZS5meC9raW5kIiwianMvRXJyb3IiLCJyZS1mcmFtZS5yZWdpc3RyYXIva2luZHMiLCJyZS1mcmFtZS5meC9yZWctZngiLCJpZCIsImhhbmRsZXIiLCJyZS1mcmFtZS5yZWdpc3RyYXIvcmVnaXN0ZXItaGFuZGxlciIsInJlLWZyYW1lLmZ4L2RvLWZ4IiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvLT5pbnRlcmNlcHRvciIsImNvbnRleHQiLCJyZS1mcmFtZS50cmFjZS9pcy10cmFjZS1lbmFibGVkPyIsIipjdXJyZW50LXRyYWNlKi1vcmlnLXZhbF9fOTk5IiwicmUtZnJhbWUudHJhY2UvKmN1cnJlbnQtdHJhY2UqIiwiKmN1cnJlbnQtdHJhY2UqLXRlbXAtdmFsX18xMDAwIiwicmUtZnJhbWUudHJhY2Uvc3RhcnQtdHJhY2UiLCJlbmRfXzIyX19hdXRvX18iLCJyZS1mcmFtZS5pbnRlcm9wL25vdyIsImR1cmF0aW9uX18yM19fYXV0b19fIiwiY2xqcy5jb3JlL3N3YXAhIiwicmUtZnJhbWUudHJhY2UvdHJhY2VzIiwiY2xqcy5jb3JlL2NvbmoiLCJjbGpzLmNvcmUvYXNzb2MiLCJyZS1mcmFtZS50cmFjZS9ydW4tdHJhY2luZy1jYWxsYmFja3MhIiwic2VxX18xMDAxIiwiY2xqcy5jb3JlL3NlcSIsImNodW5rX18xMDAyIiwiY291bnRfXzEwMDMiLCJpX18xMDA0IiwidmVjX18xMDExIiwiY2xqcy5jb3JlLy1udGgiLCJjbGpzLmNvcmUvbnRoIiwidGVtcF9fOTY0Nl9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rZWQtc2VxPyIsImNfXzExNzI5X19hdXRvX18iLCJjbGpzLmNvcmUvY2h1bmstZmlyc3QiLCJjbGpzLmNvcmUvY2h1bmstcmVzdCIsImNsanMuY29yZS9jb3VudCIsInZlY19fMTAxNCIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0Iiwic2VxX18xMDE3IiwiY2h1bmtfXzEwMTgiLCJjb3VudF9fMTAxOSIsImlfXzEwMjAiLCJ2ZWNfXzEwMjciLCJ2ZWNfXzEwMzAiLCJlZmZlY3Qta2V5IiwiZWZmZWN0LXZhbHVlIiwidGVtcF9fOTU4NF9fYXV0b19fIiwiZWZmZWN0LWZuIiwicmUtZnJhbWUucmVnaXN0cmFyL2dldC1oYW5kbGVyIiwicmUtZnJhbWUubG9nZ2Vycy9jb25zb2xlIiwidmFsdWUiLCJzZXFfXzEwNjciLCJjaHVua19fMTA2OCIsImNvdW50X18xMDY5IiwiaV9fMTA3MCIsIm1hcF9fMTA3NSIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9oYXNoLW1hcCIsImNsanMuY29yZS9nZXQiLCJtYXBfXzEwNzciLCJtcyIsImRpc3BhdGNoIiwiZWZmZWN0IiwiY2xqcy5jb3JlL3JlbW92ZSIsImNsanMuY29yZS9uaWw/IiwiY2xqcy5jb3JlL2VtcHR5PyIsInJlLWZyYW1lLmludGVyb3Avc2V0LXRpbWVvdXQhIiwicmUtZnJhbWUucm91dGVyL2Rpc3BhdGNoIiwiY2xqcy5jb3JlL3ZlY3Rvcj8iLCJjbGpzLmNvcmUvc2VxdWVudGlhbD8iLCJzZXFfXzEwOTEiLCJjaHVua19fMTA5MiIsImNvdW50X18xMDkzIiwiaV9fMTA5NCIsImV2ZW50IiwiY2xlYXItZXZlbnQiLCJjbGpzLmNvcmUvcGFydGlhbCIsInJlLWZyYW1lLnJlZ2lzdHJhci9jbGVhci1oYW5kbGVycyIsInJlLWZyYW1lLmV2ZW50cy9raW5kIiwic2VxX18xMTA3IiwiY2h1bmtfXzExMDgiLCJjb3VudF9fMTEwOSIsImlfXzExMTAiLCJjbGpzLmNvcmUvZGVyZWYiLCJyZS1mcmFtZS5kYi9hcHAtZGIiLCJjbGpzLmNvcmUvcmVzZXQhIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZS1mcmFtZS5meFxuICAoOnJlcXVpcmVcbiAgICBbcmUtZnJhbWUucm91dGVyICAgICAgOmFzIHJvdXRlcl1cbiAgICBbcmUtZnJhbWUuZGIgICAgICAgICAgOnJlZmVyIFthcHAtZGJdXVxuICAgIFtyZS1mcmFtZS5pbnRlcmNlcHRvciA6cmVmZXIgWy0+aW50ZXJjZXB0b3JdXVxuICAgIFtyZS1mcmFtZS5pbnRlcm9wICAgICA6cmVmZXIgW3NldC10aW1lb3V0IV1dXG4gICAgW3JlLWZyYW1lLmV2ZW50cyAgICAgIDphcyBldmVudHNdXG4gICAgW3JlLWZyYW1lLnJlZ2lzdHJhciAgIDpyZWZlciBbZ2V0LWhhbmRsZXIgY2xlYXItaGFuZGxlcnMgcmVnaXN0ZXItaGFuZGxlcl1dXG4gICAgW3JlLWZyYW1lLmxvZ2dlcnMgICAgIDpyZWZlciBbY29uc29sZV1dXG4gICAgW3JlLWZyYW1lLnRyYWNlIDphcyB0cmFjZSA6aW5jbHVkZS1tYWNyb3MgdHJ1ZV0pKVxuXG5cbjs7IC0tIFJlZ2lzdHJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuKGRlZiBraW5kIDpmeClcbihhc3NlcnQgKHJlLWZyYW1lLnJlZ2lzdHJhci9raW5kcyBraW5kKSlcblxuKGRlZm4gcmVnLWZ4XG4gIFwiUmVnaXN0ZXIgdGhlIGdpdmVuIGVmZmVjdCBgaGFuZGxlcmAgZm9yIHRoZSBnaXZlbiBgaWRgLlxuXG4gIGBpZGAgaXMga2V5d29yZCwgb2Z0ZW4gbmFtZXNwYWNlZC5cbiAgYGhhbmRsZXJgIGlzIGEgc2lkZS1lZmZlY3RpbmcgZnVuY3Rpb24gd2hpY2ggdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQgYW5kIHdob3NlIHJldHVyblxuICB2YWx1ZSBpcyBpZ25vcmVkLlxuXG4gIEV4YW1wbGUgVXNlXG4gIC0tLS0tLS0tLS0tXG5cbiAgRmlyc3QsIHJlZ2lzdHJhdGlvbiAuLi4gYXNzb2NpYXRlIGA6ZWZmZWN0MmAgd2l0aCBhIGhhbmRsZXIuXG5cbiAgKHJlZy1meFxuICAgICA6ZWZmZWN0MlxuICAgICAoZm4gW3ZhbHVlXVxuICAgICAgICAuLi4gZG8gc29tZXRoaW5nIHNpZGUtZWZmZWN0LXkpKVxuXG4gIFRoZW4sIGxhdGVyLCBpZiBhbiBldmVudCBoYW5kbGVyIHdlcmUgdG8gcmV0dXJuIHRoaXMgZWZmZWN0cyBtYXAgLi4uXG5cbiAgey4uLlxuICAgOmVmZmVjdDIgIFsxIDJdfVxuXG4gICAuLi4gdGhlbiB0aGUgYGhhbmRsZXJgIGBmbmAgd2UgcmVnaXN0ZXJlZCBwcmV2aW91c2x5LCB1c2luZyBgcmVnLWZ4YCwgd2lsbCBiZVxuICAgY2FsbGVkIHdpdGggYW4gYXJndW1lbnQgb2YgYFsxIDJdYC5cIlxuICBbaWQgaGFuZGxlcl1cbiAgKHJlZ2lzdGVyLWhhbmRsZXIga2luZCBpZCBoYW5kbGVyKSlcblxuOzsgLS0gSW50ZXJjZXB0b3IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4oZGVmIGRvLWZ4XG4gIFwiQW4gaW50ZXJjZXB0b3Igd2hvc2UgYDphZnRlcmAgYWN0aW9ucyB0aGUgY29udGVudHMgb2YgYDplZmZlY3RzYC4gQXMgYSByZXN1bHQsXG4gIHRoaXMgaW50ZXJjZXB0b3IgaXMgRG9taW5vIDMuXG5cbiAgVGhpcyBpbnRlcmNlcHRvciBpcyBzaWxlbnRseSBhZGRlZCAoYnkgcmVnLWV2ZW50LWRiIGV0YykgdG8gdGhlIGZyb250IG9mXG4gIGludGVyY2VwdG9yIGNoYWlucyBmb3IgYWxsIGV2ZW50cy5cblxuICBGb3IgZWFjaCBrZXkgaW4gYDplZmZlY3RzYCAoYSBtYXApLCBpdCBjYWxscyB0aGUgcmVnaXN0ZXJlZCBgZWZmZWN0cyBoYW5kbGVyYFxuICAoc2VlIGByZWctZnhgIGZvciByZWdpc3RyYXRpb24gb2YgZWZmZWN0IGhhbmRsZXJzKS5cblxuICBTbywgaWYgYDplZmZlY3RzYCB3YXM6XG4gICAgICB7OmRpc3BhdGNoICBbOmhlbGxvIDQyXVxuICAgICAgIDpkYiAgICAgICAgey4uLn1cbiAgICAgICA6dW5kbyAgICAgIFxcXCJzZXQgZmxhZ1xcXCJ9XG5cbiAgaXQgd2lsbCBjYWxsIHRoZSByZWdpc3RlcmVkIGVmZmVjdCBoYW5kbGVycyBmb3IgZWFjaCBvZiB0aGUgbWFwJ3Mga2V5czpcbiAgYDpkaXNwYXRjaGAsIGA6dW5kb2AgYW5kIGA6ZGJgLiBXaGVuIGNhbGxpbmcgZWFjaCBoYW5kbGVyLCBwcm92aWRlcyB0aGUgbWFwXG4gIHZhbHVlIGZvciB0aGF0IGtleSAtIHNvIGluIHRoZSBleGFtcGxlIGFib3ZlIHRoZSBlZmZlY3QgaGFuZGxlciBmb3IgOmRpc3BhdGNoXG4gIHdpbGwgYmUgZ2l2ZW4gb25lIGFyZyBgWzpoZWxsbyA0Ml1gLlxuXG4gIFlvdSBjYW5ub3QgcmVseSBvbiB0aGUgb3JkZXJpbmcgaW4gd2hpY2ggZWZmZWN0cyBhcmUgZXhlY3V0ZWQuXCJcbiAgKC0+aW50ZXJjZXB0b3JcbiAgICA6aWQgOmRvLWZ4XG4gICAgOmFmdGVyIChmbiBkby1meC1hZnRlclxuICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgICh0cmFjZS93aXRoLXRyYWNlXG4gICAgICAgICAgICAgICB7Om9wLXR5cGUgOmV2ZW50L2RvLWZ4fVxuICAgICAgICAgICAgICAgKGRvc2VxIFtbZWZmZWN0LWtleSBlZmZlY3QtdmFsdWVdICg6ZWZmZWN0cyBjb250ZXh0KV1cbiAgICAgICAgICAgICAgICAgKGlmLWxldCBbZWZmZWN0LWZuIChnZXQtaGFuZGxlciBraW5kIGVmZmVjdC1rZXkgZmFsc2UpXVxuICAgICAgICAgICAgICAgICAgIChlZmZlY3QtZm4gZWZmZWN0LXZhbHVlKVxuICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiBubyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yIGVmZmVjdDpcIiBlZmZlY3Qta2V5IFwiLiBJZ25vcmluZy5cIikpKSkpKSlcblxuOzsgLS0gQnVpbHRpbiBFZmZlY3QgSGFuZGxlcnMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG47OyA6ZGlzcGF0Y2gtbGF0ZXJcbjs7XG47OyBgZGlzcGF0Y2hgIG9uZSBvciBtb3JlIGV2ZW50cyBhZnRlciBnaXZlbiBkZWxheXMuIEV4cGVjdHMgYSBjb2xsZWN0aW9uXG47OyBvZiBtYXBzIHdpdGggdHdvIGtleXM6ICA6YG1zYCBhbmQgYDpkaXNwYXRjaGBcbjs7XG47OyB1c2FnZTpcbjs7XG47OyAgICB7OmRpc3BhdGNoLWxhdGVyIFt7Om1zIDIwMCA6ZGlzcGF0Y2ggWzpldmVudC1pZCBcInBhcmFtXCJdfSAgICA7OyAgaW4gMjAwbXMgZG8gdGhpczogKGRpc3BhdGNoIFs6ZXZlbnQtaWQgXCJwYXJhbVwiXSlcbjs7ICAgICAgICAgICAgICAgICAgICAgIHs6bXMgMTAwIDpkaXNwYXRjaCBbOmFsc28gOnRoaXMgOmluIDoxMDBtc119XX1cbjs7XG47OyBOb3RlOiBuaWwgZW50cmllcyBpbiB0aGUgY29sbGVjdGlvbiBhcmUgaWdub3JlZCB3aGljaCBtZWFucyBldmVudHMgY2FuIGJlIGFkZGVkXG47OyBjb25kaXRpb25hbGx5OlxuOzsgICAgezpkaXNwYXRjaC1sYXRlciBbICh3aGVuICg+IDMgNSkgezptcyAyMDAgOmRpc3BhdGNoIFs6Y29uZGl0aW9uZWQtb3V0XX0pXG47OyAgICAgICAgICAgICAgICAgICAgICAgezptcyAxMDAgOmRpc3BhdGNoIFs6YW5vdGhlci1vbmVdfV19XG47O1xuKHJlZy1meFxuICA6ZGlzcGF0Y2gtbGF0ZXJcbiAgKGZuIFt2YWx1ZV1cbiAgICAoZG9zZXEgW3s6a2V5cyBbbXMgZGlzcGF0Y2hdIDphcyBlZmZlY3R9IChyZW1vdmUgbmlsPyB2YWx1ZSldXG4gICAgICAgIChpZiAob3IgKGVtcHR5PyBkaXNwYXRjaCkgKG5vdCAobnVtYmVyPyBtcykpKVxuICAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiBpZ25vcmluZyBiYWQgOmRpc3BhdGNoLWxhdGVyIHZhbHVlOlwiIGVmZmVjdClcbiAgICAgICAgICAoc2V0LXRpbWVvdXQhICMocm91dGVyL2Rpc3BhdGNoIGRpc3BhdGNoKSBtcykpKSkpXG5cblxuOzsgOmRpc3BhdGNoXG47O1xuOzsgYGRpc3BhdGNoYCBvbmUgZXZlbnQuIEV4cGVjdHMgYSBzaW5nbGUgdmVjdG9yLlxuOztcbjs7IHVzYWdlOlxuOzsgICB7OmRpc3BhdGNoIFs6ZXZlbnQtaWQgXCJwYXJhbVwiXSB9XG5cbihyZWctZnhcbiAgOmRpc3BhdGNoXG4gIChmbiBbdmFsdWVdXG4gICAgKGlmLW5vdCAodmVjdG9yPyB2YWx1ZSlcbiAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiBpZ25vcmluZyBiYWQgOmRpc3BhdGNoIHZhbHVlLiBFeHBlY3RlZCBhIHZlY3RvciwgYnV0IGdvdDpcIiB2YWx1ZSlcbiAgICAgIChyb3V0ZXIvZGlzcGF0Y2ggdmFsdWUpKSkpXG5cblxuOzsgOmRpc3BhdGNoLW5cbjs7XG47OyBgZGlzcGF0Y2hgIG1vcmUgdGhhbiBvbmUgZXZlbnQuIEV4cGVjdHMgYSBsaXN0IG9yIHZlY3RvciBvZiBldmVudHMuIFNvbWV0aGluZyBmb3Igd2hpY2hcbjs7IHNlcXVlbnRpYWw/IHJldHVybnMgdHJ1ZS5cbjs7XG47OyB1c2FnZTpcbjs7ICAgezpkaXNwYXRjaC1uIChsaXN0IFs6ZG8gOmFsbF0gWzp0aHJlZSA6b2ZdIFs6dGhlc2VdKX1cbjs7XG47OyBOb3RlOiBuaWwgZXZlbnRzIGFyZSBpZ25vcmVkIHdoaWNoIG1lYW5zIGV2ZW50cyBjYW4gYmUgYWRkZWRcbjs7IGNvbmRpdGlvbmFsbHk6XG47OyAgICB7OmRpc3BhdGNoLW4gKGxpc3QgKHdoZW4gKD4gMyA1KSBbOmNvbmRpdGlvbmVkLW91dF0pXG47OyAgICAgICAgICAgICAgICAgICAgICAgWzphbm90aGVyLW9uZV0pfVxuOztcbihyZWctZnhcbiAgOmRpc3BhdGNoLW5cbiAgKGZuIFt2YWx1ZV1cbiAgICAoaWYtbm90IChzZXF1ZW50aWFsPyB2YWx1ZSlcbiAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiBpZ25vcmluZyBiYWQgOmRpc3BhdGNoLW4gdmFsdWUuIEV4cGVjdGVkIGEgY29sbGVjdGlvbiwgYnV0IGdvdDpcIiB2YWx1ZSlcbiAgICAgIChkb3NlcSBbZXZlbnQgKHJlbW92ZSBuaWw/IHZhbHVlKV0gKHJvdXRlci9kaXNwYXRjaCBldmVudCkpKSkpXG5cblxuOzsgOmRlcmVnaXN0ZXItZXZlbnQtaGFuZGxlclxuOztcbjs7IHJlbW92ZXMgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlci4gRXhwZWN0cyBlaXRoZXIgYSBzaW5nbGUgaWQgKFxuOzsgdHlwaWNhbGx5IGEgbmFtZXNwYWNlZCBrZXl3b3JkKSwgb3IgYSBzZXEgb2YgaWRzLlxuOztcbjs7IHVzYWdlOlxuOzsgICB7OmRlcmVnaXN0ZXItZXZlbnQtaGFuZGxlciA6bXktaWQpfVxuOzsgb3I6XG47OyAgIHs6ZGVyZWdpc3Rlci1ldmVudC1oYW5kbGVyIFs6b25lLWlkIDphbm90aGVyLWlkXX1cbjs7XG4ocmVnLWZ4XG4gIDpkZXJlZ2lzdGVyLWV2ZW50LWhhbmRsZXJcbiAgKGZuIFt2YWx1ZV1cbiAgICAobGV0IFtjbGVhci1ldmVudCAocGFydGlhbCBjbGVhci1oYW5kbGVycyBldmVudHMva2luZCldXG4gICAgICAoaWYgKHNlcXVlbnRpYWw/IHZhbHVlKVxuICAgICAgICAoZG9zZXEgW2V2ZW50IHZhbHVlXSAoY2xlYXItZXZlbnQgZXZlbnQpKVxuICAgICAgICAoY2xlYXItZXZlbnQgdmFsdWUpKSkpKVxuXG5cbjs7IDpkYlxuOztcbjs7IHJlc2V0ISBhcHAtZGIgd2l0aCBhIG5ldyB2YWx1ZS4gYHZhbHVlYCBpcyBleHBlY3RlZCB0byBiZSBhIG1hcC5cbjs7XG47OyB1c2FnZTpcbjs7ICAgezpkYiAgezprZXkxIHZhbHVlMSBrZXkyIHZhbHVlMn19XG47O1xuKHJlZy1meFxuICA6ZGJcbiAgKGZuIFt2YWx1ZV1cbiAgICAoaWYtbm90IChpZGVudGljYWw/IEBhcHAtZGIgdmFsdWUpXG4gICAgICAocmVzZXQhIGFwcC1kYiB2YWx1ZSkpKSlcblxuIl19