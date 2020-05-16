// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.events");
re_frame.events.kind = new cljs.core.Keyword(null,"event","event",(301435442));
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,re_frame.events.kind))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
/**
 * `interceptors` might have nested collections, and contain nil elements.
 *   return a flat collection, with all nils removed.
 *   This function is 9/10 about giving good error messages.
 */
re_frame.events.flatten_and_remove_nils = (function re_frame$events$flatten_and_remove_nils(id,interceptors){
var make_chain = (function (p1__28_SHARP_){
return cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.flatten.call(null,p1__28_SHARP_));
});
if((!(re_frame.interop.debug_enabled_QMARK_))){
return make_chain.call(null,interceptors);
} else {
if(cljs.core.coll_QMARK_.call(null,interceptors)){
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: when registering",id,", expected a collection of interceptors, got:",interceptors);
}

var chain = make_chain.call(null,interceptors);
if(cljs.core.empty_QMARK_.call(null,chain)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: when registering",id,", given an empty interceptor chain");
} else {
}

var temp__9646__auto___851 = cljs.core.first.call(null,cljs.core.remove.call(null,re_frame.interceptor.interceptor_QMARK_,chain));
if(cljs.core.truth_(temp__9646__auto___851)){
var not_i_852 = temp__9646__auto___851;
if(cljs.core.fn_QMARK_.call(null,not_i_852)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: when registering",id,", got a function instead of an interceptor. Did you provide old style middleware by mistake? Got:",not_i_852);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: when registering",id,", expected interceptors, but got:",not_i_852);
}
} else {
}

return chain;
}
});
/**
 * Associate the given event `id` with the given collection of `interceptors`.
 * 
 * `interceptors` may contain nested collections and there may be nils
 * at any level,so process this structure into a simple, nil-less vector
 * before registration.
 * 
 * Typically, an `event handler` will be at the end of the chain (wrapped
 * in an interceptor).
 */
re_frame.events.register = (function re_frame$events$register(id,interceptors){
return re_frame.registrar.register_handler.call(null,re_frame.events.kind,id,re_frame.events.flatten_and_remove_nils.call(null,id,interceptors));
});
re_frame.events._STAR_handling_STAR_ = null;
/**
 * Given an event vector `event-v`, look up the associated interceptor chain, and execute it.
 */
re_frame.events.handle = (function re_frame$events$handle(event_v){
var event_id = re_frame.utils.first_in_vector.call(null,event_v);
var temp__9584__auto__ = re_frame.registrar.get_handler.call(null,re_frame.events.kind,event_id,true);
if(cljs.core.truth_(temp__9584__auto__)){
var interceptors = temp__9584__auto__;
if(cljs.core.truth_(re_frame.events._STAR_handling_STAR_)){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: while handling",re_frame.events._STAR_handling_STAR_,", dispatch-sync was called for",event_v,". You can't call dispatch-sync within an event handler.");
} else {
var _STAR_handling_STAR__orig_val__853 = re_frame.events._STAR_handling_STAR_;
var _STAR_handling_STAR__temp_val__854 = event_v;
(re_frame.events._STAR_handling_STAR_ = _STAR_handling_STAR__temp_val__854);

try{if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__855 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__856 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),event_id,new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),re_frame.events.kind,new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"event","event",(301435442)),event_v], null)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__856);

try{try{if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___857 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-before","app-db-before",(-1442902645)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-before","app-db-before",(-1442902645)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___857);

} else {
}

re_frame.interceptor.execute.call(null,event_v,interceptors);

if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___858 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-after","app-db-after",(1477492964)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-after","app-db-after",(1477492964)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___858);

return null;
} else {
return null;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___859 = re_frame.interop.now.call(null);
var duration__23__auto___860 = (end__22__auto___859 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___860,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___859);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__855);
}} else {
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___861 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-before","app-db-before",(-1442902645)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-before","app-db-before",(-1442902645)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___861);

} else {
}

re_frame.interceptor.execute.call(null,event_v,interceptors);

if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___862 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-after","app-db-after",(1477492964)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db-after","app-db-after",(1477492964)),cljs.core.deref.call(null,re_frame.db.app_db)], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___862);

return null;
} else {
return null;
}
}
}finally {(re_frame.events._STAR_handling_STAR_ = _STAR_handling_STAR__orig_val__853);
}}
} else {
return null;
}
});

//# sourceURL=re_frame/events.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvZXZlbnRzLmpzIiwic291cmNlcyI6WyJldmVudHMuY2xqcyJdLCJsaW5lQ291bnQiOjEzMSwibWFwcGluZ3MiOiI7QUFVQSx1QkFBQSx2QkFBS0E7QUFDTCxvQkFBUSxBQUFDRSxtQ0FBeUJGO0FBQWxDO0FBQUEsQUFBQSxNQUFBLEtBQUFDLE1BQUE7O0FBRUE7Ozs7OzBDQUFBLDFDQUFPRSw0RkFJSkMsR0FBR0M7QUFKTixBQUtFLGlCQUFBLFdBQUFDLHhCQUFNQztBQUFOLHVEQUEwQkMsdkRBQVEsdURBQUEsNEJBQUFGLDVFQUFDRywyQkFBT0M7O0FBQTFDLEFBQ0UsR0FBQSxHQUFRQztBQUNOLE9BQUNKLHFCQUFXRjs7QUFDWixBQUNFLEdBQVUsQUFBQ08sZ0NBQU1QO0FBQWpCO0FBQUEsQUFDRSxtQ0FBQSx5REFBQSxnQ0FBQSw1SEFBQ1EseUhBQTRDVCxtREFBbURDOzs7QUFDbEcsSUFBTVMsUUFBTSxBQUFDUCxxQkFBV0Y7QUFBeEIsQUFDRSxHQUFNLEFBQUNVLGlDQUFPRDtBQUFkLEFBQ0UsbUNBQUEseURBQUEsZ0NBQUEsNUhBQUNELHlIQUE0Q1Q7O0FBRC9DOztBQUVBLElBQUFZLHlCQUFpQixBQUFDRSwwQkFBTSxBQUFDVCwyQkFBT1Usd0NBQXlCTDtBQUF6RCxBQUFBLG9CQUFBRTtBQUFBLEFBQUEsZ0JBQUFBLFpBQVdDO0FBQVgsQUFDRSxHQUFJLEFBQUNHLDhCQUFJSDtBQUNQLG1DQUFBLHlEQUFBLGdDQUFBLDVIQUFDSix5SEFBNENULHVHQUF1R2E7O0FBQ3BKLG1DQUFBLHlEQUFBLGdDQUFBLDVIQUFDSix5SEFBNENULHVDQUF1Q2E7OztBQUh4Rjs7QUFJQUg7OztBQUdWOzs7Ozs7Ozs7OzJCQUFBLDNCQUFNTyw4REFTSGpCLEdBQUdDO0FBVE4sQUFVRSxPQUFDaUIsOENBQWlCdEIscUJBQUtJLEdBQUcsQUFBQ0Qsa0RBQXdCQyxHQUFHQzs7QUFNeEQsdUNBQUEsdkNBQWVrQjtBQUVmOzs7eUJBQUEsekJBQU1DLDBEQUVIQztBQUZILEFBR0UsSUFBTUMsV0FBVSxBQUFDQyx5Q0FBZ0JGO0FBQWpDLEFBQ0UsSUFBQUcscUJBQXVCLHVFQUFBLHZFQUFDQyx5Q0FBWTdCLHFCQUFLMEI7QUFBekMsQUFBQSxvQkFBQUU7QUFBQSxtQkFBQUEsZkFBU3ZCO0FBQVQsQUFDRSxvQkFBSWtCO0FBQ0YsMENBQUEseURBQUEsZ0VBQUEseUNBQUEsck1BQUNWLHVIQUEwQ1Usc0VBQTRDRTs7QUFDdkYsSUFBQUsscUNBQVVQO0lBQVZRLHFDQUFzQk47QUFBdEIsQUFBQSx3Q0FBQU0sdkNBQVVSOztBQUFWLElBQUEsQUFDRSxHQUFBLEFBQUFTO0FBQUEsSUFBQUMsMENBQUFDO0lBQUFDLDBDQUFBLEFBQUFDLHFDQUFBLDJDQUFBLDJFQUFBLG1GQUFBLHVEQUFBLDJDQUFBLDlMQUE4QlYsdUVBQ0ExQiwrS0FDUXlCO0FBRnRDLEFBQUEsQ0FBQVMsMkNBQUFDOztBQUFBLElBQUEsQUFBQSxJQUFBLEFBR0UsR0FBQSxBQUFBSDtBQUFBLEFBQUEsSUFBQWEsNEJBQUEsQUFBQUMsMEJBQUEsQUFBQUMsMkJBQUFiLHlDQUFBLHVEQUFBWSxnQkFBQSxBQUFBLHFGQUFBLDJDQUFBLHVEQUFBLDJDQUFBLDBFQUFBLEFBQUFFLGdFQUFBLEFBQUFDLDJCQUFBLDJDQUFBLHVEQUFBLDJDQUFBLDBFQUFBLEFBQUFELDhEQUFBLHRWQUE0Q0Usa1RBQUFBO0FBQTVDLEFBQUEsQ0FBQWhCLDJDQUFBVzs7QUFBQTtBQUFBOztBQUNBLEFBQUNNLHVDQUFvQjFCLFFBQVFwQjs7QUFDN0IsR0FBQSxBQUFBMkI7QUFBQSxBQUFBLElBQUFhLDRCQUFBLEFBQUFDLDBCQUFBLEFBQUFDLDJCQUFBYix5Q0FBQSx1REFBQVksZ0JBQUEsQUFBQSxxRkFBQSwyQ0FBQSx1REFBQSwyQ0FBQSx1RUFBQSxBQUFBRSxnRUFBQSxBQUFBQywyQkFBQSwyQ0FBQSx1REFBQSwyQ0FBQSx1RUFBQSxBQUFBRCw4REFBQSxuVkFBMkNFLCtTQUFBQTtBQUEzQyxBQUFBLENBQUFoQiwyQ0FBQVc7O0FBQUE7O0FBQUE7O1VBTEYsQUFBQSxHQUFBLEFBQUFiO0FBQUEsQUFBQSxJQUFBSyxzQkFBQSxBQUFBQztJQUFBQywyQkFBQSxDQUFBRixzQkFBQSxBQUFBLHVGQUFBSDtBQUFBLEFBQUEsQUFBQU0sK0JBQUFDLHNCQUFBQyxlQUFBLEFBQUFDLDBCQUFBVCx5Q0FBQSwrREFBQUsseUJBQUEscURBQUEsQUFBQUQ7O0FBQUEsQUFBQU0scURBQUFQOztBQUFBO1dBQUEsQUFBQSxDQUFBSCwyQ0FBQUQ7O0FBQUEsQUFHRSxHQUFBLEFBQUFEO0FBQUEsQUFBQSxJQUFBYSw0QkFBQSxBQUFBQywwQkFBQSxBQUFBQywyQkFBQWIseUNBQUEsdURBQUFZLGdCQUFBLEFBQUEscUZBQUEsMkNBQUEsdURBQUEsMkNBQUEsMEVBQUEsQUFBQUUsZ0VBQUEsQUFBQUMsMkJBQUEsMkNBQUEsdURBQUEsMkNBQUEsMEVBQUEsQUFBQUQsOERBQUEsdFZBQTRDRSxrVEFBQUE7QUFBNUMsQUFBQSxDQUFBaEIsMkNBQUFXOztBQUFBO0FBQUE7O0FBQ0EsQUFBQ00sdUNBQW9CMUIsUUFBUXBCOztBQUM3QixHQUFBLEFBQUEyQjtBQUFBLEFBQUEsSUFBQWEsNEJBQUEsQUFBQUMsMEJBQUEsQUFBQUMsMkJBQUFiLHlDQUFBLHVEQUFBWSxnQkFBQSxBQUFBLHFGQUFBLDJDQUFBLHVEQUFBLDJDQUFBLHVFQUFBLEFBQUFFLGdFQUFBLEFBQUFDLDJCQUFBLDJDQUFBLHVEQUFBLDJDQUFBLHVFQUFBLEFBQUFELDhEQUFBLG5WQUEyQ0UsK1NBQUFBO0FBQTNDLEFBQUEsQ0FBQWhCLDJDQUFBVzs7QUFBQTs7QUFBQTs7O1VBTkosQUFBQSx3Q0FBQWYsdkNBQVVQOzs7QUFIZCIsIm5hbWVzIjpbInJlLWZyYW1lLmV2ZW50cy9raW5kIiwianMvRXJyb3IiLCJyZS1mcmFtZS5yZWdpc3RyYXIva2luZHMiLCJyZS1mcmFtZS5ldmVudHMvZmxhdHRlbi1hbmQtcmVtb3ZlLW5pbHMiLCJpZCIsImludGVyY2VwdG9ycyIsInAxX18yOCMiLCJtYWtlLWNoYWluIiwiY2xqcy5jb3JlL2ZsYXR0ZW4iLCJjbGpzLmNvcmUvcmVtb3ZlIiwiY2xqcy5jb3JlL25pbD8iLCJyZS1mcmFtZS5pbnRlcm9wL2RlYnVnLWVuYWJsZWQ/IiwiY2xqcy5jb3JlL2NvbGw/IiwicmUtZnJhbWUubG9nZ2Vycy9jb25zb2xlIiwiY2hhaW4iLCJjbGpzLmNvcmUvZW1wdHk/IiwidGVtcF9fOTY0Nl9fYXV0b19fIiwibm90LWkiLCJjbGpzLmNvcmUvZmlyc3QiLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9pbnRlcmNlcHRvcj8iLCJjbGpzLmNvcmUvZm4/IiwicmUtZnJhbWUuZXZlbnRzL3JlZ2lzdGVyIiwicmUtZnJhbWUucmVnaXN0cmFyL3JlZ2lzdGVyLWhhbmRsZXIiLCJyZS1mcmFtZS5ldmVudHMvKmhhbmRsaW5nKiIsInJlLWZyYW1lLmV2ZW50cy9oYW5kbGUiLCJldmVudC12IiwiZXZlbnQtaWQiLCJyZS1mcmFtZS51dGlscy9maXJzdC1pbi12ZWN0b3IiLCJ0ZW1wX185NTg0X19hdXRvX18iLCJyZS1mcmFtZS5yZWdpc3RyYXIvZ2V0LWhhbmRsZXIiLCIqaGFuZGxpbmcqLW9yaWctdmFsX184NTMiLCIqaGFuZGxpbmcqLXRlbXAtdmFsX184NTQiLCJyZS1mcmFtZS50cmFjZS9pcy10cmFjZS1lbmFibGVkPyIsIipjdXJyZW50LXRyYWNlKi1vcmlnLXZhbF9fODU1IiwicmUtZnJhbWUudHJhY2UvKmN1cnJlbnQtdHJhY2UqIiwiKmN1cnJlbnQtdHJhY2UqLXRlbXAtdmFsX184NTYiLCJyZS1mcmFtZS50cmFjZS9zdGFydC10cmFjZSIsImVuZF9fMjJfX2F1dG9fXyIsInJlLWZyYW1lLmludGVyb3Avbm93IiwiZHVyYXRpb25fXzIzX19hdXRvX18iLCJjbGpzLmNvcmUvc3dhcCEiLCJyZS1mcmFtZS50cmFjZS90cmFjZXMiLCJjbGpzLmNvcmUvY29uaiIsImNsanMuY29yZS9hc3NvYyIsInJlLWZyYW1lLnRyYWNlL3J1bi10cmFjaW5nLWNhbGxiYWNrcyEiLCJuZXctdHJhY2VfXzI0X19hdXRvX18iLCJjbGpzLmNvcmUvbWVyZ2UiLCJjbGpzLmNvcmUvdXBkYXRlIiwiY2xqcy5jb3JlL2RlcmVmIiwiY2xqcy5jb3JlL2Rpc3NvYyIsInJlLWZyYW1lLmRiL2FwcC1kYiIsInJlLWZyYW1lLmludGVyY2VwdG9yL2V4ZWN1dGUiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlLWZyYW1lLmV2ZW50c1xuICAoOnJlcXVpcmUgW3JlLWZyYW1lLmRiICAgICAgICAgIDpyZWZlciBbYXBwLWRiXV1cbiAgICAgICAgICAgIFtyZS1mcmFtZS51dGlscyAgICAgICA6cmVmZXIgW2ZpcnN0LWluLXZlY3Rvcl1dXG4gICAgICAgICAgICBbcmUtZnJhbWUuaW50ZXJvcCAgICAgOnJlZmVyIFtlbXB0eS1xdWV1ZSBkZWJ1Zy1lbmFibGVkP11dXG4gICAgICAgICAgICBbcmUtZnJhbWUucmVnaXN0cmFyICAgOnJlZmVyIFtnZXQtaGFuZGxlciByZWdpc3Rlci1oYW5kbGVyXV1cbiAgICAgICAgICAgIFtyZS1mcmFtZS5sb2dnZXJzICAgICA6cmVmZXIgW2NvbnNvbGVdXVxuICAgICAgICAgICAgW3JlLWZyYW1lLmludGVyY2VwdG9yIDphcyAgaW50ZXJjZXB0b3JdXG4gICAgICAgICAgICBbcmUtZnJhbWUudHJhY2UgICAgICAgOmFzIHRyYWNlIDppbmNsdWRlLW1hY3JvcyB0cnVlXSkpXG5cblxuKGRlZiBraW5kIDpldmVudClcbihhc3NlcnQgKHJlLWZyYW1lLnJlZ2lzdHJhci9raW5kcyBraW5kKSlcblxuKGRlZm4tIGZsYXR0ZW4tYW5kLXJlbW92ZS1uaWxzXG4gIFwiYGludGVyY2VwdG9yc2AgbWlnaHQgaGF2ZSBuZXN0ZWQgY29sbGVjdGlvbnMsIGFuZCBjb250YWluIG5pbCBlbGVtZW50cy5cbiAgcmV0dXJuIGEgZmxhdCBjb2xsZWN0aW9uLCB3aXRoIGFsbCBuaWxzIHJlbW92ZWQuXG4gIFRoaXMgZnVuY3Rpb24gaXMgOS8xMCBhYm91dCBnaXZpbmcgZ29vZCBlcnJvciBtZXNzYWdlcy5cIlxuICBbaWQgaW50ZXJjZXB0b3JzXVxuICAobGV0IFttYWtlLWNoYWluICAjKC0+PiAlIGZsYXR0ZW4gKHJlbW92ZSBuaWw/KSldXG4gICAgKGlmLW5vdCBkZWJ1Zy1lbmFibGVkP1xuICAgICAgKG1ha2UtY2hhaW4gaW50ZXJjZXB0b3JzKVxuICAgICAgKGRvICAgIDs7IGRvIGEgd2hvbGUgbG90IG9mIGRldmVsb3BtZW50IHRpbWUgY2hlY2tzXG4gICAgICAgICh3aGVuLW5vdCAoY29sbD8gaW50ZXJjZXB0b3JzKVxuICAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiB3aGVuIHJlZ2lzdGVyaW5nXCIgaWQgXCIsIGV4cGVjdGVkIGEgY29sbGVjdGlvbiBvZiBpbnRlcmNlcHRvcnMsIGdvdDpcIiBpbnRlcmNlcHRvcnMpKVxuICAgICAgICAobGV0IFtjaGFpbiAobWFrZS1jaGFpbiBpbnRlcmNlcHRvcnMpXVxuICAgICAgICAgICh3aGVuIChlbXB0eT8gY2hhaW4pXG4gICAgICAgICAgICAoY29uc29sZSA6ZXJyb3IgXCJyZS1mcmFtZTogd2hlbiByZWdpc3RlcmluZ1wiIGlkIFwiLCBnaXZlbiBhbiBlbXB0eSBpbnRlcmNlcHRvciBjaGFpblwiKSlcbiAgICAgICAgICAod2hlbi1sZXQgW25vdC1pIChmaXJzdCAocmVtb3ZlIGludGVyY2VwdG9yL2ludGVyY2VwdG9yPyBjaGFpbikpXVxuICAgICAgICAgICAgKGlmIChmbj8gbm90LWkpXG4gICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiB3aGVuIHJlZ2lzdGVyaW5nXCIgaWQgXCIsIGdvdCBhIGZ1bmN0aW9uIGluc3RlYWQgb2YgYW4gaW50ZXJjZXB0b3IuIERpZCB5b3UgcHJvdmlkZSBvbGQgc3R5bGUgbWlkZGxld2FyZSBieSBtaXN0YWtlPyBHb3Q6XCIgbm90LWkpXG4gICAgICAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiB3aGVuIHJlZ2lzdGVyaW5nXCIgaWQgXCIsIGV4cGVjdGVkIGludGVyY2VwdG9ycywgYnV0IGdvdDpcIiBub3QtaSkpKVxuICAgICAgICAgIGNoYWluKSkpKSlcblxuXG4oZGVmbiByZWdpc3RlclxuICBcIkFzc29jaWF0ZSB0aGUgZ2l2ZW4gZXZlbnQgYGlkYCB3aXRoIHRoZSBnaXZlbiBjb2xsZWN0aW9uIG9mIGBpbnRlcmNlcHRvcnNgLlxuXG4gICBgaW50ZXJjZXB0b3JzYCBtYXkgY29udGFpbiBuZXN0ZWQgY29sbGVjdGlvbnMgYW5kIHRoZXJlIG1heSBiZSBuaWxzXG4gICBhdCBhbnkgbGV2ZWwsc28gcHJvY2VzcyB0aGlzIHN0cnVjdHVyZSBpbnRvIGEgc2ltcGxlLCBuaWwtbGVzcyB2ZWN0b3JcbiAgIGJlZm9yZSByZWdpc3RyYXRpb24uXG5cbiAgIFR5cGljYWxseSwgYW4gYGV2ZW50IGhhbmRsZXJgIHdpbGwgYmUgYXQgdGhlIGVuZCBvZiB0aGUgY2hhaW4gKHdyYXBwZWRcbiAgIGluIGFuIGludGVyY2VwdG9yKS5cIlxuICBbaWQgaW50ZXJjZXB0b3JzXVxuICAocmVnaXN0ZXItaGFuZGxlciBraW5kIGlkIChmbGF0dGVuLWFuZC1yZW1vdmUtbmlscyBpZCBpbnRlcmNlcHRvcnMpKSlcblxuXG5cbjs7IC0tIGhhbmRsZSBldmVudCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4oZGVmIF46ZHluYW1pYyAqaGFuZGxpbmcqIG5pbCkgICAgOzsgcmVtZW1iZXIgd2hhdCBldmVudCB3ZSBhcmUgY3VycmVudGx5IGhhbmRsaW5nXG5cbihkZWZuIGhhbmRsZVxuICBcIkdpdmVuIGFuIGV2ZW50IHZlY3RvciBgZXZlbnQtdmAsIGxvb2sgdXAgdGhlIGFzc29jaWF0ZWQgaW50ZXJjZXB0b3IgY2hhaW4sIGFuZCBleGVjdXRlIGl0LlwiXG4gIFtldmVudC12XVxuICAobGV0IFtldmVudC1pZCAgKGZpcnN0LWluLXZlY3RvciBldmVudC12KV1cbiAgICAoaWYtbGV0IFtpbnRlcmNlcHRvcnMgIChnZXQtaGFuZGxlciBraW5kIGV2ZW50LWlkIHRydWUpXVxuICAgICAgKGlmICpoYW5kbGluZypcbiAgICAgICAgKGNvbnNvbGUgOmVycm9yIFwicmUtZnJhbWU6IHdoaWxlIGhhbmRsaW5nXCIgKmhhbmRsaW5nKiBcIiwgZGlzcGF0Y2gtc3luYyB3YXMgY2FsbGVkIGZvclwiIGV2ZW50LXYgXCIuIFlvdSBjYW4ndCBjYWxsIGRpc3BhdGNoLXN5bmMgd2l0aGluIGFuIGV2ZW50IGhhbmRsZXIuXCIpXG4gICAgICAgIChiaW5kaW5nIFsqaGFuZGxpbmcqICBldmVudC12XVxuICAgICAgICAgICh0cmFjZS93aXRoLXRyYWNlIHs6b3BlcmF0aW9uIGV2ZW50LWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcC10eXBlICAga2luZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGFncyAgICAgIHs6ZXZlbnQgZXZlbnQtdn19XG4gICAgICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OmFwcC1kYi1iZWZvcmUgQGFwcC1kYn19KVxuICAgICAgICAgICAgKGludGVyY2VwdG9yL2V4ZWN1dGUgZXZlbnQtdiBpbnRlcmNlcHRvcnMpXG4gICAgICAgICAgICAodHJhY2UvbWVyZ2UtdHJhY2UhIHs6dGFncyB7OmFwcC1kYi1hZnRlciBAYXBwLWRifX0pKSkpKSkpXG5cblxuIl19