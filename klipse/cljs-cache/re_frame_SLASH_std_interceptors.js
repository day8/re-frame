// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.std_interceptors");
/**
 * An interceptor which logs/instruments an event handler's actions to
 *   `js/console.debug`. See examples/todomvc/src/events.cljs for use.
 * 
 *   Output includes:
 *   1. the event vector
 *   2. a `clojure.data/diff` of db, before vs after, which shows
 *   the changes caused by the event handler.  You will absolutely have
 *   to understand https://clojuredocs.org/clojure.data/diff to
 *   understand the output.
 * 
 *   You'd typically include this interceptor after (to the right of) any
 *   path interceptor.
 * 
 *   Warning:  calling clojure.data/diff on large, complex data structures
 *   can be slow. So, you won't want this interceptor present in production
 *   code. So condition it out like this :
 * 
 *    (re-frame.core/reg-event-db
 *       :evt-id
 *       [(when ^boolean goog.DEBUG re-frame.core/debug)]  ;; <-- conditional
 *       (fn [db v]
 *         ...))
 * 
 *   To make this code fragment work, you'll also have to set goog.DEBUG to
 *   false in your production builds - look in `project.clj` of /examples/todomvc.
 *   
 */
re_frame.std_interceptors.debug = re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"debug","debug",(-1608172596)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$std_interceptors$debug_before(context){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"log","log",(-1595516004)),"Handling re-frame event:",re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"event","event",(301435442))));

return context;
}),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$std_interceptors$debug_after(context){
var event = re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"event","event",(301435442)));
var orig_db = re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)));
var new_db = re_frame.interceptor.get_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),new cljs.core.Keyword("re-frame.std-interceptors","not-found","re-frame.std-interceptors/not-found",(-1614827865)));
if(cljs.core._EQ_.call(null,new_db,new cljs.core.Keyword("re-frame.std-interceptors","not-found","re-frame.std-interceptors/not-found",(-1614827865)))){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"log","log",(-1595516004)),"No app-db changes in:",event);
} else {
var vec__1126_1129 = clojure.data.diff.call(null,orig_db,new_db);
var only_before_1130 = cljs.core.nth.call(null,vec__1126_1129,(0),null);
var only_after_1131 = cljs.core.nth.call(null,vec__1126_1129,(1),null);
var db_changed_QMARK__1132 = (((!((only_before_1130 == null)))) || ((!((only_after_1131 == null)))));
if(db_changed_QMARK__1132){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"group","group",(582596132)),"db clojure.data/diff for:",event);

re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"log","log",(-1595516004)),"only before:",only_before_1130);

re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"log","log",(-1595516004)),"only after :",only_after_1131);

re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"groupEnd","groupEnd",(-337721382)));
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"log","log",(-1595516004)),"No app-db changes resulted from:",event);
}
}

return context;
}));
/**
 * An interceptor which removes the first element of the event vector,
 *   allowing you to write more aesthetically pleasing event handlers. No
 *   leading underscore on the event-v!
 *   Your event handlers will look like this:
 * 
 *    (defn my-handler
 *      [db [x y z]]    ;; <-- instead of [_ x y z]
 *      ....)
 */
re_frame.std_interceptors.trim_v = re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"trim-v","trim-v",(-1274938640)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$std_interceptors$trimv_before(context){
return cljs.core.assoc_in.call(null,cljs.core.update_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null),cljs.core.subvec,(1)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword("re-frame.std-interceptors","untrimmed-event","re-frame.std-interceptors/untrimmed-event",(-840935075))], null),re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"event","event",(301435442))));
}),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$std_interceptors$trimv_after(context){
return cljs.core.assoc_in.call(null,re_frame.utils.dissoc_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword("re-frame.std-interceptors","untrimmed-event","re-frame.std-interceptors/untrimmed-event",(-840935075))], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null),re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword("re-frame.std-interceptors","untrimmed-event","re-frame.std-interceptors/untrimmed-event",(-840935075))));
}));
/**
 * Returns an interceptor which wraps the kind of event handler given to `reg-event-db`.
 * 
 *   These handlers take two arguments;  `db` and `event`, and they return `db`.
 * 
 *    (fn [db event]
 *       ....)
 * 
 *   So, the interceptor wraps the given handler:
 *   1. extracts two `:coeffects` keys: db and event
 *   2. calls handler-fn
 *   3. stores the db result back into context's `:effects`
 */
re_frame.std_interceptors.db_handler__GT_interceptor = (function re_frame$std_interceptors$db_handler__GT_interceptor(handler_fn){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"db-handler","db-handler",(579530098)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$std_interceptors$db_handler__GT_interceptor_$_db_handler_before(context){
var new_context = ((re_frame.trace.is_trace_enabled_QMARK_.call(null))?(function (){var _STAR_current_trace_STAR__orig_val__1133 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__1134 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("event","handler","event/handler",(-295903150)),new cljs.core.Keyword(null,"operation","operation",(-1267664310)),cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null))], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__1134);

try{try{var map__1135 = new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context);
var map__1135__$1 = (((((!((map__1135 == null))))?(((((map__1135.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1135.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1135):map__1135);
var db = cljs.core.get.call(null,map__1135__$1,new cljs.core.Keyword(null,"db","db",(993250759)));
var event = cljs.core.get.call(null,map__1135__$1,new cljs.core.Keyword(null,"event","event",(301435442)));
return re_frame.interceptor.assoc_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),handler_fn.call(null,db,event));
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___1139 = re_frame.interop.now.call(null);
var duration__23__auto___1140 = (end__22__auto___1139 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___1140,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___1139);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__1133);
}})():(function (){var map__1137 = new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context);
var map__1137__$1 = (((((!((map__1137 == null))))?(((((map__1137.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1137.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1137):map__1137);
var db = cljs.core.get.call(null,map__1137__$1,new cljs.core.Keyword(null,"db","db",(993250759)));
var event = cljs.core.get.call(null,map__1137__$1,new cljs.core.Keyword(null,"event","event",(301435442)));
return re_frame.interceptor.assoc_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),handler_fn.call(null,db,event));
})());
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___1141 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___1141);

} else {
}

return new_context;
}));
});
/**
 * Returns an interceptor which wraps the kind of event handler given to `reg-event-fx`.
 * 
 *   These handlers take two arguments;  `coeffects` and `event`, and they return `effects`.
 * 
 *    (fn [coeffects event]
 *       {:db ...
 *        :dispatch ...})
 * 
 * Wrap handler in an interceptor so it can be added to (the RHS) of a chain:
 *   1. extracts `:coeffects`
 *   2. call handler-fn giving coeffects
 *   3. stores the result back into the `:effects`
 */
re_frame.std_interceptors.fx_handler__GT_interceptor = (function re_frame$std_interceptors$fx_handler__GT_interceptor(handler_fn){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"fx-handler","fx-handler",(-549783097)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$std_interceptors$fx_handler__GT_interceptor_$_fx_handler_before(context){
var new_context = ((re_frame.trace.is_trace_enabled_QMARK_.call(null))?(function (){var _STAR_current_trace_STAR__orig_val__1142 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__1143 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("event","handler","event/handler",(-295903150)),new cljs.core.Keyword(null,"operation","operation",(-1267664310)),cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null))], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__1143);

try{try{var map__1144 = new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context);
var map__1144__$1 = (((((!((map__1144 == null))))?(((((map__1144.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1144.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1144):map__1144);
var coeffects = map__1144__$1;
var event = cljs.core.get.call(null,map__1144__$1,new cljs.core.Keyword(null,"event","event",(301435442)));
return cljs.core.assoc.call(null,context,new cljs.core.Keyword(null,"effects","effects",(-282369292)),handler_fn.call(null,coeffects,event));
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___1148 = re_frame.interop.now.call(null);
var duration__23__auto___1149 = (end__22__auto___1148 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___1149,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___1148);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__1142);
}})():(function (){var map__1146 = new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context);
var map__1146__$1 = (((((!((map__1146 == null))))?(((((map__1146.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1146.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1146):map__1146);
var coeffects = map__1146__$1;
var event = cljs.core.get.call(null,map__1146__$1,new cljs.core.Keyword(null,"event","event",(301435442)));
return cljs.core.assoc.call(null,context,new cljs.core.Keyword(null,"effects","effects",(-282369292)),handler_fn.call(null,coeffects,event));
})());
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___1150 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___1150);

} else {
}

return new_context;
}));
});
/**
 * Returns an interceptor which wraps the kind of event handler given to `reg-event-ctx`.
 *   These advanced handlers take one argument: `context` and they return a modified `context`.
 *   Example:
 * 
 *    (fn [context]
 *       (enqueue context [more interceptors]))
 */
re_frame.std_interceptors.ctx_handler__GT_interceptor = (function re_frame$std_interceptors$ctx_handler__GT_interceptor(handler_fn){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"ctx-handler","ctx-handler",(-1777672230)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$std_interceptors$ctx_handler__GT_interceptor_$_ctx_handler_before(context){
var new_context = ((re_frame.trace.is_trace_enabled_QMARK_.call(null))?(function (){var _STAR_current_trace_STAR__orig_val__1151 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__1152 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("event","handler","event/handler",(-295903150)),new cljs.core.Keyword(null,"operation","operation",(-1267664310)),cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null))], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__1152);

try{try{return handler_fn.call(null,context);
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___1153 = re_frame.interop.now.call(null);
var duration__23__auto___1154 = (end__22__auto___1153 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___1154,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___1153);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__1151);
}})():handler_fn.call(null,context));
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___1155 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(new_context),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___1155);

} else {
}

return new_context;
}));
});
/**
 * returns an interceptor whose `:before` substitutes the coeffects `:db` with
 *   a sub-path of `:db`. Within `:after` it grafts the handler's return value
 *   back into db, at the right path.
 * 
 *   So, its overall action is to make the event handler behave like the function
 *   you might give to clojure's `update-in`.
 * 
 *   Examples:
 * 
 *    (path :some :path)
 *    (path [:some :path])
 *    (path [:some :path] :to :here)
 *    (path [:some :path] [:to] :here)
 * 
 *   Example Use:
 * 
 *    (reg-event-db
 *      :event-id
 *      (path [:a :b])  ;; used here, in interceptor chain
 *      (fn [b v]       ;; 1st arg is now not db. Is the value from path [:a :b] within db
 *        ... new-b))   ;; returns a new value for that path (not the entire db)
 * 
 *   Notes:
 *  1. `path` may appear more than once in an interceptor chain. Progressive narrowing.
 *  2. if `:effects` contains no `:db` effect, can't graft a value back in.
 *   
 */
re_frame.std_interceptors.path = (function re_frame$std_interceptors$path(var_args){
var args__12462__auto__ = [];
var len__12445__auto___1157 = arguments.length;
var i__12446__auto___1158 = (0);
while(true){
if((i__12446__auto___1158 < len__12445__auto___1157)){
args__12462__auto__.push((arguments[i__12446__auto___1158]));

var G__1159 = (i__12446__auto___1158 + (1));
i__12446__auto___1158 = G__1159;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((0) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((0)),(0),null)):null);
return re_frame.std_interceptors.path.cljs$core$IFn$_invoke$arity$variadic(argseq__12463__auto__);
});

(re_frame.std_interceptors.path.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var path = cljs.core.flatten.call(null,args);
var db_store_key = new cljs.core.Keyword("re-frame-path","db-store","re-frame-path/db-store",(655758490));
if(cljs.core.empty_QMARK_.call(null,path)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: \"path\" interceptor given no params");
} else {
}

return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"path","path",(-188191168)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function (context){
var original_db = re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)));
return re_frame.interceptor.assoc_coeffect.call(null,cljs.core.update.call(null,context,db_store_key,cljs.core.conj,original_db),new cljs.core.Keyword(null,"db","db",(993250759)),cljs.core.get_in.call(null,original_db,path));
}),new cljs.core.Keyword(null,"after","after",(594996914)),(function (context){
var db_store = db_store_key.cljs$core$IFn$_invoke$arity$1(context);
var original_db = cljs.core.peek.call(null,db_store);
var new_db_store = cljs.core.pop.call(null,db_store);
var context_SINGLEQUOTE_ = re_frame.interceptor.assoc_coeffect.call(null,cljs.core.assoc.call(null,context,db_store_key,new_db_store),new cljs.core.Keyword(null,"db","db",(993250759)),original_db);
var db = re_frame.interceptor.get_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),new cljs.core.Keyword("re-frame.std-interceptors","not-found","re-frame.std-interceptors/not-found",(-1614827865)));
if(cljs.core._EQ_.call(null,db,new cljs.core.Keyword("re-frame.std-interceptors","not-found","re-frame.std-interceptors/not-found",(-1614827865)))){
return context_SINGLEQUOTE_;
} else {
return re_frame.interceptor.assoc_effect.call(null,context_SINGLEQUOTE_,new cljs.core.Keyword(null,"db","db",(993250759)),cljs.core.assoc_in.call(null,original_db,path,db));
}
}));
}));

(re_frame.std_interceptors.path.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.std_interceptors.path.cljs$lang$applyTo = (function (seq1156){
var self__12421__auto__ = this;
return self__12421__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq1156));
}));

/**
 * Interceptor factory which runs the given function `f` in the `after handler`
 *   position.  `f` is called with two arguments: `db` and `v`, and is expected to
 *   return a modified `db`.
 * 
 *   Unlike the `after` interceptor which is only about side effects, `enrich`
 *   expects `f` to process and alter the given `db` coeffect in some useful way,
 *   contributing to the derived data, flowing vibe.
 * 
 *   Example Use:
 *   ------------
 * 
 *   Imagine that todomvc needed to do duplicate detection - if any two todos had
 *   the same text, then highlight their background, and report them via a warning
 *   at the bottom of the panel.
 * 
 *   Almost any user action (edit text, add new todo, remove a todo) requires a
 *   complete reassessment of duplication errors and warnings. Eg: that edit
 *   just made might have introduced a new duplicate, or removed one. Same with
 *   any todo removal. So we need to re-calculate warnings after any CRUD events
 *   associated with the todos list.
 * 
 *   Unless we are careful, we might end up coding subtly different checks
 *   for each kind of CRUD operation.  The duplicates check made after
 *   'delete todo' event might be subtly different to that done after an
 *   editing operation. Nice and efficient, but fiddly. A bug generator
 *   approach.
 * 
 *   So, instead, we create an `f` which recalculates ALL warnings from scratch
 *   every time there is ANY change. It will inspect all the todos, and
 *   reset ALL FLAGS every time (overwriting what was there previously)
 *   and fully recalculate the list of duplicates (displayed at the bottom?).
 * 
 *   https://twitter.com/nathanmarz/status/879722740776939520
 * 
 *   By applying `f` in an `:enrich` interceptor, after every CRUD event,
 *   we keep the handlers simple and yet we ensure this important step
 *   (of getting warnings right) is not missed on any change.
 * 
 *   We can test `f` easily - it is a pure function - independently of
 *   any CRUD operation.
 * 
 *   This brings huge simplicity at the expense of some re-computation
 *   each time. This may be a very satisfactory trade-off in many cases.
 */
re_frame.std_interceptors.enrich = (function re_frame$std_interceptors$enrich(f){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"enrich","enrich",(-2108921925)),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$std_interceptors$enrich_$_enrich_after(context){
var event = re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"event","event",(301435442)));
var db = ((cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(context),new cljs.core.Keyword(null,"db","db",(993250759))))?re_frame.interceptor.get_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759))):re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759))));
return re_frame.interceptor.assoc_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),f.call(null,db,event));
}));
});
/**
 * returns an interceptor which runs a given function `f` in the `:after`
 *   position, presumably for side effects.
 * 
 *   `f` is called with two arguments: the `:effects` value for `:db`
 *   (or the `coeffect` value of db if no db effect is returned) and the event.
 *   Its return value is ignored, so `f` can only side-effect.
 * 
 *   Examples use can be seen in the /examples/todomvc:
 *   - `f` runs schema validation (reporting any errors found).
 *   - `f` writes to localstorage.
 */
re_frame.std_interceptors.after = (function re_frame$std_interceptors$after(f){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"after","after",(594996914)),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$std_interceptors$after_$_after_after(context){
var db = ((cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(context),new cljs.core.Keyword(null,"db","db",(993250759))))?cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),new cljs.core.Keyword(null,"db","db",(993250759))], null)):cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"db","db",(993250759))], null)));
var event = cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"event","event",(301435442))], null));
f.call(null,db,event);

return context;
}));
});
/**
 * Interceptor factory which acts a bit like `reaction`  (but it flows into
 *   `db`, rather than out). It observes N paths within `db` and if any of them
 *   test not identical? to their previous value  (as a result of a event handler
 *   being run) then it runs `f` to compute a new value, which is then assoc-ed
 *   into the given `out-path` within `db`.
 * 
 *   Usage:
 * 
 *    (defn my-f
 *      [a-val b-val]
 *      ... some computation on a and b in here)
 * 
 *    (on-changes my-f [:c]  [:a] [:b])
 * 
 *   Put this Interceptor on the right handlers (ones which might change :a or :b).
 *   It will:
 *   - call `f` each time the value at path [:a] or [:b] changes
 *   - call `f` with the values extracted from [:a] [:b]
 *   - assoc the return value from `f` into the path  [:c]
 *   
 */
re_frame.std_interceptors.on_changes = (function re_frame$std_interceptors$on_changes(var_args){
var args__12462__auto__ = [];
var len__12445__auto___1163 = arguments.length;
var i__12446__auto___1164 = (0);
while(true){
if((i__12446__auto___1164 < len__12445__auto___1163)){
args__12462__auto__.push((arguments[i__12446__auto___1164]));

var G__1165 = (i__12446__auto___1164 + (1));
i__12446__auto___1164 = G__1165;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return re_frame.std_interceptors.on_changes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(re_frame.std_interceptors.on_changes.cljs$core$IFn$_invoke$arity$variadic = (function (f,out_path,in_paths){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"on-changes","on-changes",(1345912602)),new cljs.core.Keyword(null,"after","after",(594996914)),(function re_frame$std_interceptors$on_change_after(context){
var new_db = re_frame.interceptor.get_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)));
var old_db = re_frame.interceptor.get_coeffect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)));
var new_ins = cljs.core.map.call(null,(function (p1__29_SHARP_){
return cljs.core.get_in.call(null,new_db,p1__29_SHARP_);
}),in_paths);
var old_ins = cljs.core.map.call(null,(function (p1__30_SHARP_){
return cljs.core.get_in.call(null,old_db,p1__30_SHARP_);
}),in_paths);
var changed_ins_QMARK_ = ((cljs.core.contains_QMARK_.call(null,re_frame.interceptor.get_effect.call(null,context),new cljs.core.Keyword(null,"db","db",(993250759))))?cljs.core.some.call(null,cljs.core.false_QMARK_,cljs.core.map.call(null,cljs.core.identical_QMARK_,new_ins,old_ins)):false);
if(cljs.core.truth_(changed_ins_QMARK_)){
return re_frame.interceptor.assoc_effect.call(null,context,new cljs.core.Keyword(null,"db","db",(993250759)),cljs.core.assoc_in.call(null,new_db,out_path,cljs.core.apply.call(null,f,new_ins)));
} else {
return context;
}
}));
}));

(re_frame.std_interceptors.on_changes.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(re_frame.std_interceptors.on_changes.cljs$lang$applyTo = (function (seq1160){
var G__1161 = cljs.core.first.call(null,seq1160);
var seq1160__$1 = cljs.core.next.call(null,seq1160);
var G__1162 = cljs.core.first.call(null,seq1160__$1);
var seq1160__$2 = cljs.core.next.call(null,seq1160__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__1161,G__1162,seq1160__$2);
}));


//# sourceURL=re_frame/std_interceptors.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvc3RkX2ludGVyY2VwdG9ycy5qcyIsInNvdXJjZXMiOlsic3RkX2ludGVyY2VwdG9ycy5jbGpzIl0sImxpbmVDb3VudCI6NDM4LCJtYXBwaW5ncyI6IjtBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUtBLGtDQTJCSCxnREFBQSxvREFBQSwwREFBQSw5SkFBQ0MsME5BRVMsaURBQ0dDO0FBREgsQUFFRSxtQ0FBQSxzREFBQSx6RkFBQ0Msb0hBQXdDLG9EQUFBLHBEQUFDQyw0Q0FBYUY7O0FBQ3ZEQTtHQUxaLHdEQU1VLGdEQUNHQTtBQURILEFBRUUsSUFBTUcsUUFBUSxvREFBQSxwREFBQ0QsNENBQWFGO0lBQ3RCSSxVQUFRLG9EQUFBLHBEQUFDRiw0Q0FBYUY7SUFDdEJLLFNBQVEsa0RBQUEsa0RBQUEscEdBQUNDLDBDQUFhTjtBQUY1QixBQUdFLEdBQUksZ0NBQUEsaENBQUNPLHlCQUFFRjtBQUNMLG1DQUFBLHNEQUFBLHpGQUFDSixpSEFBcUNFOztBQUN0QyxJQUFBSyxpQkFBK0IsQUFBQ0ksNEJBQVVSLFFBQVFDO3VCQUFsRCxBQUFBSSx3QkFBQUQsZUFBQSxJQUFBLDlEQUFPRTtzQkFBUCxBQUFBRCx3QkFBQUQsZUFBQSxJQUFBLDdEQUFtQkc7SUFDYkUseUJBQWUsRUFBSSxHQUFBLHFCQUFBLHBCQUFPSCxpQ0FBYSxHQUFBLG9CQUFBLG5CQUFPQztBQURwRCxBQUVFLEdBQUlFO0FBQ0YsQUFBSSxtQ0FBQSx3REFBQSwzRkFBQ1osdUhBQTJDRTs7QUFDNUMsbUNBQUEsc0RBQUEsekZBQUNGLHdHQUE0QlM7O0FBQzdCLG1DQUFBLHNEQUFBLHpGQUFDVCx3R0FBNEJVOztBQUM3QixtQ0FBQSxuQ0FBQ1Y7O0FBQ0wsbUNBQUEsc0RBQUEsekZBQUNBLDRIQUFnREU7Ozs7QUFDdkRIOztBQUdoQjs7Ozs7Ozs7OztBQUFLYyxtQ0FTSCxnREFBQSxvREFBQSw0REFBQSxoS0FBQ2YsNE5BRVUsaURBQ0dDO0FBREgsa0VBRU1BLDlCQUNB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b0NBQVUsQUFBQzFFLDBDQUFXTiw2REFDdkIsQUFBQ2dHLHlCQUFLQyx1QkFBTyxBQUFDTCx3QkFBSU0sMkJBQVdSLFFBQVFHO0FBUjdELEFBV0Usb0JBQUlFOzBKQUNHLEFBQUN6RCwwQkFBTXlDLEVBQUVXLHpFQUNULEFBQUN6RSw2QkFBU1osT0FBT2tGLGpKQUNqQiwyREFBQSxwREFBQzVDLDRDQUFhM0M7O0FBQ25CQTs7Ozs7QUF6Q2pCLENBQUEsK0RBQUEsL0RBQU9rRjs7QUFBUDtBQUFBLENBQUEseURBQUEsV0FBQUMscEVBQU9EO0FBQVAsQUFBQSxJQUFBRSxVQUFBLDBCQUFBRCwxQkFxdUZnRGdCO0lBcnVGaERoQixjQUFBLHlCQUFBQSx6QkFzdUZrRGlCO0lBdHVGbERmLFVBQUEsMEJBQUFGLDFCQXF1RmdEZ0I7SUFydUZoRGhCLGNBQUEseUJBQUFBLHpCQXN1RmtEaUI7QUF0dUZsRCxBQUFBLElBQUFkLHNCQUFBO0FBQUEsQUFBQSxPQUFBQSx5REFBQUYsUUFBQUMsUUFBQUY7OztBQUFBIiwibmFtZXMiOlsicmUtZnJhbWUuc3RkLWludGVyY2VwdG9ycy9kZWJ1ZyIsInJlLWZyYW1lLmludGVyY2VwdG9yLy0+aW50ZXJjZXB0b3IiLCJjb250ZXh0IiwicmUtZnJhbWUubG9nZ2Vycy9jb25zb2xlIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvZ2V0LWNvZWZmZWN0IiwiZXZlbnQiLCJvcmlnLWRiIiwibmV3LWRiIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvZ2V0LWVmZmVjdCIsImNsanMuY29yZS89IiwidmVjX18xMTI2IiwiY2xqcy5jb3JlL250aCIsIm9ubHktYmVmb3JlIiwib25seS1hZnRlciIsImNsb2p1cmUuZGF0YS9kaWZmIiwiZGItY2hhbmdlZD8iLCJyZS1mcmFtZS5zdGQtaW50ZXJjZXB0b3JzL3RyaW0tdiIsImNsanMuY29yZS91cGRhdGUtaW4iLCJjbGpzLmNvcmUvc3VidmVjIiwiY2xqcy5jb3JlL2Fzc29jLWluIiwicmUtZnJhbWUudXRpbHMvZGlzc29jLWluIiwicmUtZnJhbWUuc3RkLWludGVyY2VwdG9ycy9kYi1oYW5kbGVyLT5pbnRlcmNlcHRvciIsImhhbmRsZXItZm4iLCJuZXctY29udGV4dCIsInJlLWZyYW1lLnRyYWNlL2lzLXRyYWNlLWVuYWJsZWQ/IiwiKmN1cnJlbnQtdHJhY2UqLW9yaWctdmFsX18xMTMzIiwicmUtZnJhbWUudHJhY2UvKmN1cnJlbnQtdHJhY2UqIiwiKmN1cnJlbnQtdHJhY2UqLXRlbXAtdmFsX18xMTM0IiwicmUtZnJhbWUudHJhY2Uvc3RhcnQtdHJhY2UiLCJlbmRfXzIyX19hdXRvX18iLCJyZS1mcmFtZS5pbnRlcm9wL25vdyIsImR1cmF0aW9uX18yM19fYXV0b19fIiwiY2xqcy5jb3JlL3N3YXAhIiwicmUtZnJhbWUudHJhY2UvdHJhY2VzIiwiY2xqcy5jb3JlL2NvbmoiLCJjbGpzLmNvcmUvYXNzb2MiLCJyZS1mcmFtZS50cmFjZS9ydW4tdHJhY2luZy1jYWxsYmFja3MhIiwiY2xqcy5jb3JlL2dldC1pbiIsIm1hcF9fMTEzNSIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9oYXNoLW1hcCIsImNsanMuY29yZS9nZXQiLCJtYXBfXzExMzciLCJkYiIsInJlLWZyYW1lLmludGVyY2VwdG9yL2Fzc29jLWVmZmVjdCIsIm5ldy10cmFjZV9fMjRfX2F1dG9fXyIsImNsanMuY29yZS9tZXJnZSIsImNsanMuY29yZS91cGRhdGUiLCJjbGpzLmNvcmUvZGlzc29jIiwicmUtZnJhbWUuc3RkLWludGVyY2VwdG9ycy9meC1oYW5kbGVyLT5pbnRlcmNlcHRvciIsIipjdXJyZW50LXRyYWNlKi1vcmlnLXZhbF9fMTE0MiIsIipjdXJyZW50LXRyYWNlKi10ZW1wLXZhbF9fMTE0MyIsIm1hcF9fMTE0NCIsIm1hcF9fMTE0NiIsImNvZWZmZWN0cyIsInJlLWZyYW1lLnN0ZC1pbnRlcmNlcHRvcnMvY3R4LWhhbmRsZXItPmludGVyY2VwdG9yIiwiKmN1cnJlbnQtdHJhY2UqLW9yaWctdmFsX18xMTUxIiwiKmN1cnJlbnQtdHJhY2UqLXRlbXAtdmFsX18xMTUyIiwidmFyX2FyZ3MiLCJhcmdzX18xMjQ2Ml9fYXV0b19fIiwibGVuX18xMjQ0NV9fYXV0b19fIiwiaV9fMTI0NDZfX2F1dG9fXyIsImFyZ3NlcV9fMTI0NjNfX2F1dG9fXyIsInJlLWZyYW1lLnN0ZC1pbnRlcmNlcHRvcnMvcGF0aCIsInNlcTExNTYiLCJzZWxmX18xMjQyMV9fYXV0b19fIiwiY2xqcy5jb3JlL3NlcSIsImFyZ3MiLCJwYXRoIiwiY2xqcy5jb3JlL2ZsYXR0ZW4iLCJkYi1zdG9yZS1rZXkiLCJjbGpzLmNvcmUvZW1wdHk/Iiwib3JpZ2luYWwtZGIiLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9hc3NvYy1jb2VmZmVjdCIsImRiLXN0b3JlIiwiY2xqcy5jb3JlL3BlZWsiLCJuZXctZGItc3RvcmUiLCJjbGpzLmNvcmUvcG9wIiwiY29udGV4dCciLCJyZS1mcmFtZS5zdGQtaW50ZXJjZXB0b3JzL2VucmljaCIsImYiLCJjbGpzLmNvcmUvY29udGFpbnM/IiwicmUtZnJhbWUuc3RkLWludGVyY2VwdG9ycy9hZnRlciIsInJlLWZyYW1lLnN0ZC1pbnRlcmNlcHRvcnMvb24tY2hhbmdlcyIsInNlcTExNjAiLCJHX18xMTYxIiwiR19fMTE2MiIsInNlbGZfXzEyNDIwX19hdXRvX18iLCJvdXQtcGF0aCIsImluLXBhdGhzIiwib2xkLWRiIiwibmV3LWlucyIsInAxX18yOSMiLCJjbGpzLmNvcmUvbWFwIiwib2xkLWlucyIsInAxX18zMCMiLCJjaGFuZ2VkLWlucz8iLCJjbGpzLmNvcmUvc29tZSIsImNsanMuY29yZS9mYWxzZT8iLCJjbGpzLmNvcmUvaWRlbnRpY2FsPyIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwiY2xqcy5jb3JlL0luZGV4ZWRTZXEiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlLWZyYW1lLnN0ZC1pbnRlcmNlcHRvcnNcbiAgXCJjb250YWlucyByZS1mcmFtZSBzdXBwbGllZCwgc3RhbmRhcmQgaW50ZXJjZXB0b3JzXCJcbiAgKDpyZXF1aXJlXG4gICAgW3JlLWZyYW1lLmludGVyY2VwdG9yIDpyZWZlciBbLT5pbnRlcmNlcHRvciBnZXQtZWZmZWN0IGdldC1jb2VmZmVjdCBhc3NvYy1jb2VmZmVjdCBhc3NvYy1lZmZlY3RdXVxuICAgIFtyZS1mcmFtZS5sb2dnZXJzIDpyZWZlciBbY29uc29sZV1dXG4gICAgW3JlLWZyYW1lLnJlZ2lzdHJhciA6YXMgcmVnaXN0cmFyXVxuICAgIFtyZS1mcmFtZS5kYiA6cmVmZXIgW2FwcC1kYl1dXG4gICAgW2Nsb2p1cmUuZGF0YSA6YXMgZGF0YV1cbiAgICBbcmUtZnJhbWUuY29meCA6YXMgY29meF1cbiAgICBbcmUtZnJhbWUudXRpbHMgOmFzIHV0aWxzXVxuICAgIFtyZS1mcmFtZS50cmFjZSA6YXMgdHJhY2UgOmluY2x1ZGUtbWFjcm9zIHRydWVdKSlcblxuXG4oZGVmIGRlYnVnXG4gIFwiQW4gaW50ZXJjZXB0b3Igd2hpY2ggbG9ncy9pbnN0cnVtZW50cyBhbiBldmVudCBoYW5kbGVyJ3MgYWN0aW9ucyB0b1xuICBganMvY29uc29sZS5kZWJ1Z2AuIFNlZSBleGFtcGxlcy90b2RvbXZjL3NyYy9ldmVudHMuY2xqcyBmb3IgdXNlLlxuXG4gIE91dHB1dCBpbmNsdWRlczpcbiAgMS4gdGhlIGV2ZW50IHZlY3RvclxuICAyLiBhIGBjbG9qdXJlLmRhdGEvZGlmZmAgb2YgZGIsIGJlZm9yZSB2cyBhZnRlciwgd2hpY2ggc2hvd3NcbiAgICAgdGhlIGNoYW5nZXMgY2F1c2VkIGJ5IHRoZSBldmVudCBoYW5kbGVyLiAgWW91IHdpbGwgYWJzb2x1dGVseSBoYXZlXG4gICAgIHRvIHVuZGVyc3RhbmQgaHR0cHM6Ly9jbG9qdXJlZG9jcy5vcmcvY2xvanVyZS5kYXRhL2RpZmYgdG9cbiAgICAgdW5kZXJzdGFuZCB0aGUgb3V0cHV0LlxuXG4gIFlvdSdkIHR5cGljYWxseSBpbmNsdWRlIHRoaXMgaW50ZXJjZXB0b3IgYWZ0ZXIgKHRvIHRoZSByaWdodCBvZikgYW55XG4gIHBhdGggaW50ZXJjZXB0b3IuXG5cbiAgV2FybmluZzogIGNhbGxpbmcgY2xvanVyZS5kYXRhL2RpZmYgb24gbGFyZ2UsIGNvbXBsZXggZGF0YSBzdHJ1Y3R1cmVzXG4gIGNhbiBiZSBzbG93LiBTbywgeW91IHdvbid0IHdhbnQgdGhpcyBpbnRlcmNlcHRvciBwcmVzZW50IGluIHByb2R1Y3Rpb25cbiAgY29kZS4gU28gY29uZGl0aW9uIGl0IG91dCBsaWtlIHRoaXMgOlxuXG4gICAgICAocmUtZnJhbWUuY29yZS9yZWctZXZlbnQtZGJcbiAgICAgICAgIDpldnQtaWRcbiAgICAgICAgIFsod2hlbiBeYm9vbGVhbiBnb29nLkRFQlVHIHJlLWZyYW1lLmNvcmUvZGVidWcpXSAgOzsgPC0tIGNvbmRpdGlvbmFsXG4gICAgICAgICAoZm4gW2RiIHZdXG4gICAgICAgICAgIC4uLikpXG5cbiAgVG8gbWFrZSB0aGlzIGNvZGUgZnJhZ21lbnQgd29yaywgeW91J2xsIGFsc28gaGF2ZSB0byBzZXQgZ29vZy5ERUJVRyB0b1xuICBmYWxzZSBpbiB5b3VyIHByb2R1Y3Rpb24gYnVpbGRzIC0gbG9vayBpbiBgcHJvamVjdC5jbGpgIG9mIC9leGFtcGxlcy90b2RvbXZjLlxuICBcIlxuICAoLT5pbnRlcmNlcHRvclxuICAgIDppZCAgICAgOmRlYnVnXG4gICAgOmJlZm9yZSAoZm4gZGVidWctYmVmb3JlXG4gICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgICAoY29uc29sZSA6bG9nIFwiSGFuZGxpbmcgcmUtZnJhbWUgZXZlbnQ6XCIgKGdldC1jb2VmZmVjdCBjb250ZXh0IDpldmVudCkpXG4gICAgICAgICAgICAgIGNvbnRleHQpXG4gICAgOmFmdGVyICAoZm4gZGVidWctYWZ0ZXJcbiAgICAgICAgICAgICAgW2NvbnRleHRdXG4gICAgICAgICAgICAgIChsZXQgW2V2ZW50ICAgKGdldC1jb2VmZmVjdCBjb250ZXh0IDpldmVudClcbiAgICAgICAgICAgICAgICAgICAgb3JpZy1kYiAoZ2V0LWNvZWZmZWN0IGNvbnRleHQgOmRiKVxuICAgICAgICAgICAgICAgICAgICBuZXctZGIgIChnZXQtZWZmZWN0ICAgY29udGV4dCA6ZGIgOjpub3QtZm91bmQpXVxuICAgICAgICAgICAgICAgIChpZiAoPSBuZXctZGIgOjpub3QtZm91bmQpXG4gICAgICAgICAgICAgICAgICAoY29uc29sZSA6bG9nIFwiTm8gYXBwLWRiIGNoYW5nZXMgaW46XCIgZXZlbnQpXG4gICAgICAgICAgICAgICAgICAobGV0IFtbb25seS1iZWZvcmUgb25seS1hZnRlcl0gKGRhdGEvZGlmZiBvcmlnLWRiIG5ldy1kYilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLWNoYW5nZWQ/ICAgIChvciAoc29tZT8gb25seS1iZWZvcmUpIChzb21lPyBvbmx5LWFmdGVyKSldXG4gICAgICAgICAgICAgICAgICAgIChpZiBkYi1jaGFuZ2VkP1xuICAgICAgICAgICAgICAgICAgICAgIChkbyAoY29uc29sZSA6Z3JvdXAgXCJkYiBjbG9qdXJlLmRhdGEvZGlmZiBmb3I6XCIgZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDpsb2cgXCJvbmx5IGJlZm9yZTpcIiBvbmx5LWJlZm9yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgOmxvZyBcIm9ubHkgYWZ0ZXIgOlwiIG9ubHktYWZ0ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlIDpncm91cEVuZCkpXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgOmxvZyBcIk5vIGFwcC1kYiBjaGFuZ2VzIHJlc3VsdGVkIGZyb206XCIgZXZlbnQpKSkpXG4gICAgICAgICAgICAgICAgY29udGV4dCkpKSlcblxuXG4oZGVmIHRyaW0tdlxuICBcIkFuIGludGVyY2VwdG9yIHdoaWNoIHJlbW92ZXMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGV2ZW50IHZlY3RvcixcbiAgYWxsb3dpbmcgeW91IHRvIHdyaXRlIG1vcmUgYWVzdGhldGljYWxseSBwbGVhc2luZyBldmVudCBoYW5kbGVycy4gTm9cbiAgbGVhZGluZyB1bmRlcnNjb3JlIG9uIHRoZSBldmVudC12IVxuICBZb3VyIGV2ZW50IGhhbmRsZXJzIHdpbGwgbG9vayBsaWtlIHRoaXM6XG5cbiAgICAgIChkZWZuIG15LWhhbmRsZXJcbiAgICAgICAgW2RiIFt4IHkgel1dICAgIDs7IDwtLSBpbnN0ZWFkIG9mIFtfIHggeSB6XVxuICAgICAgICAuLi4uKVwiXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkICAgICAgOnRyaW0tdlxuICAgIDpiZWZvcmUgIChmbiB0cmltdi1iZWZvcmVcbiAgICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgICAgKC0+IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAodXBkYXRlLWluIFs6Y29lZmZlY3RzIDpldmVudF0gc3VidmVjIDEpXG4gICAgICAgICAgICAgICAgICAgKGFzc29jLWluIFs6Y29lZmZlY3RzIDo6dW50cmltbWVkLWV2ZW50XSAoZ2V0LWNvZWZmZWN0IGNvbnRleHQgOmV2ZW50KSkpKVxuICAgIDphZnRlciAgIChmbiB0cmltdi1hZnRlclxuICAgICAgICAgICAgICAgW2NvbnRleHRdXG4gICAgICAgICAgICAgICAoLT4gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICh1dGlscy9kaXNzb2MtaW4gWzpjb2VmZmVjdHMgOjp1bnRyaW1tZWQtZXZlbnRdKVxuICAgICAgICAgICAgICAgICAgIChhc3NvYy1pbiBbOmNvZWZmZWN0cyA6ZXZlbnRdIChnZXQtY29lZmZlY3QgY29udGV4dCA6OnVudHJpbW1lZC1ldmVudCkpKSkpKVxuXG5cbjs7IC0tIEludGVyY2VwdG9yIEZhY3RvcmllcyAtIFBBUlQgMSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbjs7XG47OyBUaGVzZSAzIGZhY3RvcmllcyB3cmFwIHRoZSAzIGtpbmRzIG9mIGV2ZW50IGhhbmRsZXJzLlxuOztcblxuKGRlZm4gZGItaGFuZGxlci0+aW50ZXJjZXB0b3JcbiAgXCJSZXR1cm5zIGFuIGludGVyY2VwdG9yIHdoaWNoIHdyYXBzIHRoZSBraW5kIG9mIGV2ZW50IGhhbmRsZXIgZ2l2ZW4gdG8gYHJlZy1ldmVudC1kYmAuXG5cbiAgVGhlc2UgaGFuZGxlcnMgdGFrZSB0d28gYXJndW1lbnRzOyAgYGRiYCBhbmQgYGV2ZW50YCwgYW5kIHRoZXkgcmV0dXJuIGBkYmAuXG5cbiAgICAgIChmbiBbZGIgZXZlbnRdXG4gICAgICAgICAuLi4uKVxuXG4gIFNvLCB0aGUgaW50ZXJjZXB0b3Igd3JhcHMgdGhlIGdpdmVuIGhhbmRsZXI6XG4gICAgIDEuIGV4dHJhY3RzIHR3byBgOmNvZWZmZWN0c2Aga2V5czogZGIgYW5kIGV2ZW50XG4gICAgIDIuIGNhbGxzIGhhbmRsZXItZm5cbiAgICAgMy4gc3RvcmVzIHRoZSBkYiByZXN1bHQgYmFjayBpbnRvIGNvbnRleHQncyBgOmVmZmVjdHNgXCJcbiAgW2hhbmRsZXItZm5dXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkICAgICA6ZGItaGFuZGxlclxuICAgIDpiZWZvcmUgKGZuIGRiLWhhbmRsZXItYmVmb3JlXG4gICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgICAobGV0IFtuZXctY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAodHJhY2Uvd2l0aC10cmFjZVxuICAgICAgICAgICAgICAgICAgICAgIHs6b3AtdHlwZSAgIDpldmVudC9oYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgIDpvcGVyYXRpb24gKGdldC1pbiBjb250ZXh0IFs6Y29lZmZlY3RzIDpldmVudF0pfVxuICAgICAgICAgICAgICAgICAgICAgIChsZXQgW3s6a2V5cyBbZGIgZXZlbnRdfSAoOmNvZWZmZWN0cyBjb250ZXh0KV1cbiAgICAgICAgICAgICAgICAgICAgICAgICgtPj4gKGhhbmRsZXItZm4gZGIgZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NvYy1lZmZlY3QgY29udGV4dCA6ZGIpKSkpXVxuICAgICAgICAgICAgICAgIDs7IFdlIG1lcmdlIHRoZXNlIHRhZ3Mgb3V0c2lkZSBvZiB0aGUgOmV2ZW50L2hhbmRsZXIgdHJhY2UgYmVjYXVzZSB3ZSB3YW50IHRoZW0gdG8gYmUgYXNzaWduZWQgdG8gdGhlIHBhcmVudFxuICAgICAgICAgICAgICAgIDs7IHdyYXBwaW5nIHRyYWNlLlxuICAgICAgICAgICAgICAgICh0cmFjZS9tZXJnZS10cmFjZSFcbiAgICAgICAgICAgICAgICAgIHs6dGFncyB7OmVmZmVjdHMgICAoOmVmZmVjdHMgbmV3LWNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpjb2VmZmVjdHMgKDpjb2VmZmVjdHMgY29udGV4dCl9fSlcbiAgICAgICAgICAgICAgICBuZXctY29udGV4dCkpKSlcblxuXG4oZGVmbiBmeC1oYW5kbGVyLT5pbnRlcmNlcHRvclxuICBcIlJldHVybnMgYW4gaW50ZXJjZXB0b3Igd2hpY2ggd3JhcHMgdGhlIGtpbmQgb2YgZXZlbnQgaGFuZGxlciBnaXZlbiB0byBgcmVnLWV2ZW50LWZ4YC5cblxuICBUaGVzZSBoYW5kbGVycyB0YWtlIHR3byBhcmd1bWVudHM7ICBgY29lZmZlY3RzYCBhbmQgYGV2ZW50YCwgYW5kIHRoZXkgcmV0dXJuIGBlZmZlY3RzYC5cblxuICAgICAgKGZuIFtjb2VmZmVjdHMgZXZlbnRdXG4gICAgICAgICB7OmRiIC4uLlxuICAgICAgICAgIDpkaXNwYXRjaCAuLi59KVxuXG4gICBXcmFwIGhhbmRsZXIgaW4gYW4gaW50ZXJjZXB0b3Igc28gaXQgY2FuIGJlIGFkZGVkIHRvICh0aGUgUkhTKSBvZiBhIGNoYWluOlxuICAgICAxLiBleHRyYWN0cyBgOmNvZWZmZWN0c2BcbiAgICAgMi4gY2FsbCBoYW5kbGVyLWZuIGdpdmluZyBjb2VmZmVjdHNcbiAgICAgMy4gc3RvcmVzIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSBgOmVmZmVjdHNgXCJcbiAgW2hhbmRsZXItZm5dXG4oLT5pbnRlcmNlcHRvclxuICA6aWQgICAgIDpmeC1oYW5kbGVyXG4gIDpiZWZvcmUgKGZuIGZ4LWhhbmRsZXItYmVmb3JlXG4gICAgICAgICAgICBbY29udGV4dF1cbiAgICAgICAgICAgIChsZXQgW25ldy1jb250ZXh0XG4gICAgICAgICAgICAgICAgICAodHJhY2Uvd2l0aC10cmFjZVxuICAgICAgICAgICAgICAgICAgICB7Om9wLXR5cGUgICA6ZXZlbnQvaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgOm9wZXJhdGlvbiAoZ2V0LWluIGNvbnRleHQgWzpjb2VmZmVjdHMgOmV2ZW50XSl9XG4gICAgICAgICAgICAgICAgICAgIChsZXQgW3s6a2V5cyBbZXZlbnRdIDphcyBjb2VmZmVjdHN9ICg6Y29lZmZlY3RzIGNvbnRleHQpXVxuICAgICAgICAgICAgICAgICAgICAgICgtPj4gKGhhbmRsZXItZm4gY29lZmZlY3RzIGV2ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc29jIGNvbnRleHQgOmVmZmVjdHMpKSkpXVxuICAgICAgICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhXG4gICAgICAgICAgICAgICAgezp0YWdzIHs6ZWZmZWN0cyAgICg6ZWZmZWN0cyBuZXctY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIDpjb2VmZmVjdHMgKDpjb2VmZmVjdHMgY29udGV4dCl9fSlcbiAgICAgICAgICAgICAgbmV3LWNvbnRleHQpKSkpXG5cblxuKGRlZm4gY3R4LWhhbmRsZXItPmludGVyY2VwdG9yXG4gIFwiUmV0dXJucyBhbiBpbnRlcmNlcHRvciB3aGljaCB3cmFwcyB0aGUga2luZCBvZiBldmVudCBoYW5kbGVyIGdpdmVuIHRvIGByZWctZXZlbnQtY3R4YC5cbiAgVGhlc2UgYWR2YW5jZWQgaGFuZGxlcnMgdGFrZSBvbmUgYXJndW1lbnQ6IGBjb250ZXh0YCBhbmQgdGhleSByZXR1cm4gYSBtb2RpZmllZCBgY29udGV4dGAuXG4gIEV4YW1wbGU6XG5cbiAgICAgIChmbiBbY29udGV4dF1cbiAgICAgICAgIChlbnF1ZXVlIGNvbnRleHQgW21vcmUgaW50ZXJjZXB0b3JzXSkpXCJcbiAgW2hhbmRsZXItZm5dXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkICAgICA6Y3R4LWhhbmRsZXJcbiAgICA6YmVmb3JlIChmbiBjdHgtaGFuZGxlci1iZWZvcmVcbiAgICAgICAgICAgICAgW2NvbnRleHRdXG4gICAgICAgICAgICAgIChsZXQgW25ldy1jb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICh0cmFjZS93aXRoLXRyYWNlXG4gICAgICAgICAgICAgICAgICAgICAgezpvcC10eXBlICAgOmV2ZW50L2hhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgOm9wZXJhdGlvbiAoZ2V0LWluIGNvbnRleHQgWzpjb2VmZmVjdHMgOmV2ZW50XSl9XG4gICAgICAgICAgICAgICAgICAgICAgKGhhbmRsZXItZm4gY29udGV4dCkpXVxuICAgICAgICAgICAgICAgICh0cmFjZS9tZXJnZS10cmFjZSFcbiAgICAgICAgICAgICAgICAgIHs6dGFncyB7OmVmZmVjdHMgICAoOmVmZmVjdHMgbmV3LWNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpjb2VmZmVjdHMgKDpjb2VmZmVjdHMgY29udGV4dCl9fSlcbiAgICAgICAgICAgICAgICBuZXctY29udGV4dCkpKSlcblxuXG47OyAtLSBJbnRlcmNlcHRvcnMgRmFjdG9yaWVzIC0gIFBBUlQgMiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4oZGVmbiBwYXRoXG4gIFwicmV0dXJucyBhbiBpbnRlcmNlcHRvciB3aG9zZSBgOmJlZm9yZWAgc3Vic3RpdHV0ZXMgdGhlIGNvZWZmZWN0cyBgOmRiYCB3aXRoXG4gIGEgc3ViLXBhdGggb2YgYDpkYmAuIFdpdGhpbiBgOmFmdGVyYCBpdCBncmFmdHMgdGhlIGhhbmRsZXIncyByZXR1cm4gdmFsdWVcbiAgYmFjayBpbnRvIGRiLCBhdCB0aGUgcmlnaHQgcGF0aC5cblxuICBTbywgaXRzIG92ZXJhbGwgYWN0aW9uIGlzIHRvIG1ha2UgdGhlIGV2ZW50IGhhbmRsZXIgYmVoYXZlIGxpa2UgdGhlIGZ1bmN0aW9uXG4gIHlvdSBtaWdodCBnaXZlIHRvIGNsb2p1cmUncyBgdXBkYXRlLWluYC5cblxuICBFeGFtcGxlczpcblxuICAgICAgKHBhdGggOnNvbWUgOnBhdGgpXG4gICAgICAocGF0aCBbOnNvbWUgOnBhdGhdKVxuICAgICAgKHBhdGggWzpzb21lIDpwYXRoXSA6dG8gOmhlcmUpXG4gICAgICAocGF0aCBbOnNvbWUgOnBhdGhdIFs6dG9dIDpoZXJlKVxuXG4gIEV4YW1wbGUgVXNlOlxuXG4gICAgICAocmVnLWV2ZW50LWRiXG4gICAgICAgIDpldmVudC1pZFxuICAgICAgICAocGF0aCBbOmEgOmJdKSAgOzsgdXNlZCBoZXJlLCBpbiBpbnRlcmNlcHRvciBjaGFpblxuICAgICAgICAoZm4gW2Igdl0gICAgICAgOzsgMXN0IGFyZyBpcyBub3cgbm90IGRiLiBJcyB0aGUgdmFsdWUgZnJvbSBwYXRoIFs6YSA6Yl0gd2l0aGluIGRiXG4gICAgICAgICAgLi4uIG5ldy1iKSkgICA7OyByZXR1cm5zIGEgbmV3IHZhbHVlIGZvciB0aGF0IHBhdGggKG5vdCB0aGUgZW50aXJlIGRiKVxuXG4gIE5vdGVzOlxuICAgIDEuIGBwYXRoYCBtYXkgYXBwZWFyIG1vcmUgdGhhbiBvbmNlIGluIGFuIGludGVyY2VwdG9yIGNoYWluLiBQcm9ncmVzc2l2ZSBuYXJyb3dpbmcuXG4gICAgMi4gaWYgYDplZmZlY3RzYCBjb250YWlucyBubyBgOmRiYCBlZmZlY3QsIGNhbid0IGdyYWZ0IGEgdmFsdWUgYmFjayBpbi5cbiAgXCJcbiAgWyYgYXJnc11cbiAgKGxldCBbcGF0aCAoZmxhdHRlbiBhcmdzKVxuICAgICAgICBkYi1zdG9yZS1rZXkgOnJlLWZyYW1lLXBhdGgvZGItc3RvcmVdICAgIDs7IHRoaXMgaXMgd2hlcmUsIHdpdGhpbiBgY29udGV4dGAsIHdlIHN0b3JlIHRoZSBvcmlnaW5hbCBkYnNcbiAgICAod2hlbiAoZW1wdHk/IHBhdGgpXG4gICAgICAoY29uc29sZSA6ZXJyb3IgXCJyZS1mcmFtZTogXFxcInBhdGhcXFwiIGludGVyY2VwdG9yIGdpdmVuIG5vIHBhcmFtc1wiKSlcbiAgICAoLT5pbnRlcmNlcHRvclxuICAgICAgOmlkICAgICAgOnBhdGhcbiAgICAgIDpiZWZvcmUgIChmblxuICAgICAgICAgICAgICAgICBbY29udGV4dF1cbiAgICAgICAgICAgICAgICAgKGxldCBbb3JpZ2luYWwtZGIgKGdldC1jb2VmZmVjdCBjb250ZXh0IDpkYildXG4gICAgICAgICAgICAgICAgICAgKC0+IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgKHVwZGF0ZSBkYi1zdG9yZS1rZXkgY29uaiBvcmlnaW5hbC1kYilcbiAgICAgICAgICAgICAgICAgICAgICAgKGFzc29jLWNvZWZmZWN0IDpkYiAoZ2V0LWluIG9yaWdpbmFsLWRiIHBhdGgpKSkpKVxuICAgICAgOmFmdGVyICAgKGZuIFtjb250ZXh0XVxuICAgICAgICAgICAgICAgICAobGV0IFtkYi1zdG9yZSAgICAgKGRiLXN0b3JlLWtleSBjb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC1kYiAgKHBlZWsgZGItc3RvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgIG5ldy1kYi1zdG9yZSAocG9wIGRiLXN0b3JlKVxuICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0JyAgICAgKC0+IChhc3NvYyBjb250ZXh0IGRiLXN0b3JlLWtleSBuZXctZGItc3RvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc29jLWNvZWZmZWN0IDpkYiBvcmlnaW5hbC1kYikpICAgICA7OyBwdXQgdGhlIG9yaWdpbmFsIGRiIGJhY2sgc28gdGhhdCB0aGluZ3MgbGlrZSBkZWJ1ZyB3b3JrIGxhdGVyIG9uXG4gICAgICAgICAgICAgICAgICAgICAgIGRiICAgICAgICAgICAoZ2V0LWVmZmVjdCBjb250ZXh0IDpkYiA6Om5vdC1mb3VuZCldXG4gICAgICAgICAgICAgICAgICAgKGlmICg9IGRiIDo6bm90LWZvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgY29udGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICgtPj4gKGFzc29jLWluIG9yaWdpbmFsLWRiIHBhdGggZGIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NvYy1lZmZlY3QgY29udGV4dCcgOmRiKSkpKSkpKSlcblxuXG5cblxuKGRlZm4gZW5yaWNoXG4gIFwiSW50ZXJjZXB0b3IgZmFjdG9yeSB3aGljaCBydW5zIHRoZSBnaXZlbiBmdW5jdGlvbiBgZmAgaW4gdGhlIGBhZnRlciBoYW5kbGVyYFxuICBwb3NpdGlvbi4gIGBmYCBpcyBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzOiBgZGJgIGFuZCBgdmAsIGFuZCBpcyBleHBlY3RlZCB0b1xuICByZXR1cm4gYSBtb2RpZmllZCBgZGJgLlxuXG4gIFVubGlrZSB0aGUgYGFmdGVyYCBpbnRlcmNlcHRvciB3aGljaCBpcyBvbmx5IGFib3V0IHNpZGUgZWZmZWN0cywgYGVucmljaGBcbiAgZXhwZWN0cyBgZmAgdG8gcHJvY2VzcyBhbmQgYWx0ZXIgdGhlIGdpdmVuIGBkYmAgY29lZmZlY3QgaW4gc29tZSB1c2VmdWwgd2F5LFxuICBjb250cmlidXRpbmcgdG8gdGhlIGRlcml2ZWQgZGF0YSwgZmxvd2luZyB2aWJlLlxuXG4gIEV4YW1wbGUgVXNlOlxuICAtLS0tLS0tLS0tLS1cblxuICBJbWFnaW5lIHRoYXQgdG9kb212YyBuZWVkZWQgdG8gZG8gZHVwbGljYXRlIGRldGVjdGlvbiAtIGlmIGFueSB0d28gdG9kb3MgaGFkXG4gIHRoZSBzYW1lIHRleHQsIHRoZW4gaGlnaGxpZ2h0IHRoZWlyIGJhY2tncm91bmQsIGFuZCByZXBvcnQgdGhlbSB2aWEgYSB3YXJuaW5nXG4gIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhbmVsLlxuXG4gIEFsbW9zdCBhbnkgdXNlciBhY3Rpb24gKGVkaXQgdGV4dCwgYWRkIG5ldyB0b2RvLCByZW1vdmUgYSB0b2RvKSByZXF1aXJlcyBhXG4gIGNvbXBsZXRlIHJlYXNzZXNzbWVudCBvZiBkdXBsaWNhdGlvbiBlcnJvcnMgYW5kIHdhcm5pbmdzLiBFZzogdGhhdCBlZGl0XG4gIGp1c3QgbWFkZSBtaWdodCBoYXZlIGludHJvZHVjZWQgYSBuZXcgZHVwbGljYXRlLCBvciByZW1vdmVkIG9uZS4gU2FtZSB3aXRoXG4gIGFueSB0b2RvIHJlbW92YWwuIFNvIHdlIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHdhcm5pbmdzIGFmdGVyIGFueSBDUlVEIGV2ZW50c1xuICBhc3NvY2lhdGVkIHdpdGggdGhlIHRvZG9zIGxpc3QuXG5cbiAgVW5sZXNzIHdlIGFyZSBjYXJlZnVsLCB3ZSBtaWdodCBlbmQgdXAgY29kaW5nIHN1YnRseSBkaWZmZXJlbnQgY2hlY2tzXG4gIGZvciBlYWNoIGtpbmQgb2YgQ1JVRCBvcGVyYXRpb24uICBUaGUgZHVwbGljYXRlcyBjaGVjayBtYWRlIGFmdGVyXG4gICdkZWxldGUgdG9kbycgZXZlbnQgbWlnaHQgYmUgc3VidGx5IGRpZmZlcmVudCB0byB0aGF0IGRvbmUgYWZ0ZXIgYW5cbiAgZWRpdGluZyBvcGVyYXRpb24uIE5pY2UgYW5kIGVmZmljaWVudCwgYnV0IGZpZGRseS4gQSBidWcgZ2VuZXJhdG9yXG4gIGFwcHJvYWNoLlxuXG4gIFNvLCBpbnN0ZWFkLCB3ZSBjcmVhdGUgYW4gYGZgIHdoaWNoIHJlY2FsY3VsYXRlcyBBTEwgd2FybmluZ3MgZnJvbSBzY3JhdGNoXG4gIGV2ZXJ5IHRpbWUgdGhlcmUgaXMgQU5ZIGNoYW5nZS4gSXQgd2lsbCBpbnNwZWN0IGFsbCB0aGUgdG9kb3MsIGFuZFxuICByZXNldCBBTEwgRkxBR1MgZXZlcnkgdGltZSAob3ZlcndyaXRpbmcgd2hhdCB3YXMgdGhlcmUgcHJldmlvdXNseSlcbiAgYW5kIGZ1bGx5IHJlY2FsY3VsYXRlIHRoZSBsaXN0IG9mIGR1cGxpY2F0ZXMgKGRpc3BsYXllZCBhdCB0aGUgYm90dG9tPykuXG5cbiAgaHR0cHM6Ly90d2l0dGVyLmNvbS9uYXRoYW5tYXJ6L3N0YXR1cy84Nzk3MjI3NDA3NzY5Mzk1MjBcblxuICBCeSBhcHBseWluZyBgZmAgaW4gYW4gYDplbnJpY2hgIGludGVyY2VwdG9yLCBhZnRlciBldmVyeSBDUlVEIGV2ZW50LFxuICB3ZSBrZWVwIHRoZSBoYW5kbGVycyBzaW1wbGUgYW5kIHlldCB3ZSBlbnN1cmUgdGhpcyBpbXBvcnRhbnQgc3RlcFxuICAob2YgZ2V0dGluZyB3YXJuaW5ncyByaWdodCkgaXMgbm90IG1pc3NlZCBvbiBhbnkgY2hhbmdlLlxuXG4gIFdlIGNhbiB0ZXN0IGBmYCBlYXNpbHkgLSBpdCBpcyBhIHB1cmUgZnVuY3Rpb24gLSBpbmRlcGVuZGVudGx5IG9mXG4gIGFueSBDUlVEIG9wZXJhdGlvbi5cblxuICBUaGlzIGJyaW5ncyBodWdlIHNpbXBsaWNpdHkgYXQgdGhlIGV4cGVuc2Ugb2Ygc29tZSByZS1jb21wdXRhdGlvblxuICBlYWNoIHRpbWUuIFRoaXMgbWF5IGJlIGEgdmVyeSBzYXRpc2ZhY3RvcnkgdHJhZGUtb2ZmIGluIG1hbnkgY2FzZXMuXCJcbiAgW2ZdXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkIDplbnJpY2hcbiAgICA6YWZ0ZXIgKGZuIGVucmljaC1hZnRlclxuICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgIChsZXQgW2V2ZW50IChnZXQtY29lZmZlY3QgY29udGV4dCA6ZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgZGIgICAgKGlmIChjb250YWlucz8gKDplZmZlY3RzIGNvbnRleHQpIDpkYilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChnZXQtZWZmZWN0IGNvbnRleHQgOmRiKSA7OyBJZiBubyBkYiBlZmZlY3QgaXMgcmV0dXJuZWQsIHdlIHByb3ZpZGUgdGhlIG9yaWdpbmFsIGNvZWZmZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdldC1jb2VmZmVjdCBjb250ZXh0IDpkYikpXVxuICAgICAgICAgICAgICAgKC0+PiAoZiBkYiBldmVudClcbiAgICAgICAgICAgICAgICAgICAgKGFzc29jLWVmZmVjdCBjb250ZXh0IDpkYikpKSkpKVxuXG5cblxuKGRlZm4gYWZ0ZXJcbiAgXCJyZXR1cm5zIGFuIGludGVyY2VwdG9yIHdoaWNoIHJ1bnMgYSBnaXZlbiBmdW5jdGlvbiBgZmAgaW4gdGhlIGA6YWZ0ZXJgXG4gIHBvc2l0aW9uLCBwcmVzdW1hYmx5IGZvciBzaWRlIGVmZmVjdHMuXG5cbiAgYGZgIGlzIGNhbGxlZCB3aXRoIHR3byBhcmd1bWVudHM6IHRoZSBgOmVmZmVjdHNgIHZhbHVlIGZvciBgOmRiYFxuICAob3IgdGhlIGBjb2VmZmVjdGAgdmFsdWUgb2YgZGIgaWYgbm8gZGIgZWZmZWN0IGlzIHJldHVybmVkKSBhbmQgdGhlIGV2ZW50LlxuICBJdHMgcmV0dXJuIHZhbHVlIGlzIGlnbm9yZWQsIHNvIGBmYCBjYW4gb25seSBzaWRlLWVmZmVjdC5cblxuICBFeGFtcGxlcyB1c2UgY2FuIGJlIHNlZW4gaW4gdGhlIC9leGFtcGxlcy90b2RvbXZjOlxuICAgICAtIGBmYCBydW5zIHNjaGVtYSB2YWxpZGF0aW9uIChyZXBvcnRpbmcgYW55IGVycm9ycyBmb3VuZCkuXG4gICAgIC0gYGZgIHdyaXRlcyB0byBsb2NhbHN0b3JhZ2UuXCJcbiAgW2ZdXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkIDphZnRlclxuICAgIDphZnRlciAoZm4gYWZ0ZXItYWZ0ZXJcbiAgICAgICAgICAgICBbY29udGV4dF1cbiAgICAgICAgICAgICAobGV0IFtkYiAgICAoaWYgKGNvbnRhaW5zPyAoOmVmZmVjdHMgY29udGV4dCkgOmRiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdldC1pbiBjb250ZXh0IFs6ZWZmZWN0cyA6ZGJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdldC1pbiBjb250ZXh0IFs6Y29lZmZlY3RzIDpkYl0pKVxuICAgICAgICAgICAgICAgICAgIGV2ZW50IChnZXQtaW4gY29udGV4dCBbOmNvZWZmZWN0cyA6ZXZlbnRdKV1cbiAgICAgICAgICAgICAgIChmIGRiIGV2ZW50KSA7OyBjYWxsIGYgZm9yIHNpZGUgZWZmZWN0c1xuICAgICAgICAgICAgICAgY29udGV4dCkpKSkgOzsgY29udGV4dCBpcyB1bmNoYW5nZWRcblxuXG4oZGVmbiAgb24tY2hhbmdlc1xuICBcIkludGVyY2VwdG9yIGZhY3Rvcnkgd2hpY2ggYWN0cyBhIGJpdCBsaWtlIGByZWFjdGlvbmAgIChidXQgaXQgZmxvd3MgaW50b1xuICBgZGJgLCByYXRoZXIgdGhhbiBvdXQpLiBJdCBvYnNlcnZlcyBOIHBhdGhzIHdpdGhpbiBgZGJgIGFuZCBpZiBhbnkgb2YgdGhlbVxuICB0ZXN0IG5vdCBpZGVudGljYWw/IHRvIHRoZWlyIHByZXZpb3VzIHZhbHVlICAoYXMgYSByZXN1bHQgb2YgYSBldmVudCBoYW5kbGVyXG4gIGJlaW5nIHJ1bikgdGhlbiBpdCBydW5zIGBmYCB0byBjb21wdXRlIGEgbmV3IHZhbHVlLCB3aGljaCBpcyB0aGVuIGFzc29jLWVkXG4gIGludG8gdGhlIGdpdmVuIGBvdXQtcGF0aGAgd2l0aGluIGBkYmAuXG5cbiAgVXNhZ2U6XG5cbiAgICAgIChkZWZuIG15LWZcbiAgICAgICAgW2EtdmFsIGItdmFsXVxuICAgICAgICAuLi4gc29tZSBjb21wdXRhdGlvbiBvbiBhIGFuZCBiIGluIGhlcmUpXG5cbiAgICAgIChvbi1jaGFuZ2VzIG15LWYgWzpjXSAgWzphXSBbOmJdKVxuXG4gIFB1dCB0aGlzIEludGVyY2VwdG9yIG9uIHRoZSByaWdodCBoYW5kbGVycyAob25lcyB3aGljaCBtaWdodCBjaGFuZ2UgOmEgb3IgOmIpLlxuICBJdCB3aWxsOlxuICAgICAtIGNhbGwgYGZgIGVhY2ggdGltZSB0aGUgdmFsdWUgYXQgcGF0aCBbOmFdIG9yIFs6Yl0gY2hhbmdlc1xuICAgICAtIGNhbGwgYGZgIHdpdGggdGhlIHZhbHVlcyBleHRyYWN0ZWQgZnJvbSBbOmFdIFs6Yl1cbiAgICAgLSBhc3NvYyB0aGUgcmV0dXJuIHZhbHVlIGZyb20gYGZgIGludG8gdGhlIHBhdGggIFs6Y11cbiAgXCJcbiAgW2Ygb3V0LXBhdGggJiBpbi1wYXRoc11cbiAgKC0+aW50ZXJjZXB0b3JcbiAgICA6aWQgICAgOm9uLWNoYW5nZXNcbiAgICA6YWZ0ZXIgKGZuIG9uLWNoYW5nZS1hZnRlclxuICAgICAgICAgICAgIFtjb250ZXh0XVxuICAgICAgICAgICAgIChsZXQgW25ldy1kYiAgIChnZXQtZWZmZWN0IGNvbnRleHQgOmRiKVxuICAgICAgICAgICAgICAgICAgIG9sZC1kYiAgIChnZXQtY29lZmZlY3QgY29udGV4dCA6ZGIpXG5cbiAgICAgICAgICAgICAgICAgICA7OyB3b3JrIG91dCBpZiBhbnkgXCJpbnB1dHNcIiBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgICBuZXctaW5zICAgICAgKG1hcCAjKGdldC1pbiBuZXctZGIgJSkgaW4tcGF0aHMpXG4gICAgICAgICAgICAgICAgICAgb2xkLWlucyAgICAgIChtYXAgIyhnZXQtaW4gb2xkLWRiICUpIGluLXBhdGhzKVxuICAgICAgICAgICAgICAgICAgIDs7IG1ha2Ugc3VyZSB0aGUgZGIgaXMgYWN0dWFsbHkgc2V0IGluIHRoZSBlZmZlY3RcbiAgICAgICAgICAgICAgICAgICBjaGFuZ2VkLWlucz8gKGFuZCAoY29udGFpbnM/IChnZXQtZWZmZWN0IGNvbnRleHQpIDpkYilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc29tZSBmYWxzZT8gKG1hcCBpZGVudGljYWw/IG5ldy1pbnMgb2xkLWlucykpKV1cblxuICAgICAgICAgICAgICAgOzsgaWYgb25lIG9mIHRoZSBpbnB1dHMgaGFzIGNoYW5nZWQsIHRoZW4gcnVuICdmJ1xuICAgICAgICAgICAgICAgKGlmIGNoYW5nZWQtaW5zP1xuICAgICAgICAgICAgICAgICAoLT4+IChhcHBseSBmIG5ldy1pbnMpXG4gICAgICAgICAgICAgICAgICAgICAgKGFzc29jLWluIG5ldy1kYiBvdXQtcGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAoYXNzb2MtZWZmZWN0IGNvbnRleHQgOmRiKSlcbiAgICAgICAgICAgICAgICAgY29udGV4dCkpKSkpXG4iXX0=