// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.router");
re_frame.router.later_fns = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"flush-dom","flush-dom",(-933676816)),(function (f){
return re_frame.interop.after_render.call(null,(function (){
return re_frame.interop.next_tick.call(null,f);
}));
}),new cljs.core.Keyword(null,"yield","yield",(177875009)),re_frame.interop.next_tick], null);

/**
 * @interface
 */
re_frame.router.IEventQueue = function(){};

re_frame.router.push = (function re_frame$router$push(this$,event){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$push$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$push$arity$2(this$,event);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router.push[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,event);
} else {
var m__11271__auto__ = (re_frame.router.push["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,event);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.push",this$);
}
}
}
});

re_frame.router.add_post_event_callback = (function re_frame$router$add_post_event_callback(this$,id,callack){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$add_post_event_callback$arity$3 == null)))))){
return this$.re_frame$router$IEventQueue$add_post_event_callback$arity$3(this$,id,callack);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router.add_post_event_callback[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,id,callack);
} else {
var m__11271__auto__ = (re_frame.router.add_post_event_callback["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,id,callack);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.add-post-event-callback",this$);
}
}
}
});

re_frame.router.remove_post_event_callback = (function re_frame$router$remove_post_event_callback(this$,f){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$remove_post_event_callback$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$remove_post_event_callback$arity$2(this$,f);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router.remove_post_event_callback[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,f);
} else {
var m__11271__auto__ = (re_frame.router.remove_post_event_callback["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,f);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.remove-post-event-callback",this$);
}
}
}
});

re_frame.router.purge = (function re_frame$router$purge(this$){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$purge$arity$1 == null)))))){
return this$.re_frame$router$IEventQueue$purge$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router.purge[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (re_frame.router.purge["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.purge",this$);
}
}
}
});

re_frame.router._fsm_trigger = (function re_frame$router$_fsm_trigger(this$,trigger,arg){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_fsm_trigger$arity$3 == null)))))){
return this$.re_frame$router$IEventQueue$_fsm_trigger$arity$3(this$,trigger,arg);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._fsm_trigger[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,trigger,arg);
} else {
var m__11271__auto__ = (re_frame.router._fsm_trigger["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,trigger,arg);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-fsm-trigger",this$);
}
}
}
});

re_frame.router._add_event = (function re_frame$router$_add_event(this$,event){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_add_event$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$_add_event$arity$2(this$,event);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._add_event[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,event);
} else {
var m__11271__auto__ = (re_frame.router._add_event["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,event);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-add-event",this$);
}
}
}
});

re_frame.router._process_1st_event_in_queue = (function re_frame$router$_process_1st_event_in_queue(this$){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_process_1st_event_in_queue$arity$1 == null)))))){
return this$.re_frame$router$IEventQueue$_process_1st_event_in_queue$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._process_1st_event_in_queue[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (re_frame.router._process_1st_event_in_queue["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-process-1st-event-in-queue",this$);
}
}
}
});

re_frame.router._run_next_tick = (function re_frame$router$_run_next_tick(this$){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_run_next_tick$arity$1 == null)))))){
return this$.re_frame$router$IEventQueue$_run_next_tick$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._run_next_tick[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (re_frame.router._run_next_tick["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-run-next-tick",this$);
}
}
}
});

re_frame.router._run_queue = (function re_frame$router$_run_queue(this$){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_run_queue$arity$1 == null)))))){
return this$.re_frame$router$IEventQueue$_run_queue$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._run_queue[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (re_frame.router._run_queue["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-run-queue",this$);
}
}
}
});

re_frame.router._exception = (function re_frame$router$_exception(this$,ex){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_exception$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$_exception$arity$2(this$,ex);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._exception[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,ex);
} else {
var m__11271__auto__ = (re_frame.router._exception["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,ex);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-exception",this$);
}
}
}
});

re_frame.router._pause = (function re_frame$router$_pause(this$,later_fn){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_pause$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$_pause$arity$2(this$,later_fn);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._pause[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,later_fn);
} else {
var m__11271__auto__ = (re_frame.router._pause["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,later_fn);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-pause",this$);
}
}
}
});

re_frame.router._resume = (function re_frame$router$_resume(this$){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_resume$arity$1 == null)))))){
return this$.re_frame$router$IEventQueue$_resume$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._resume[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (re_frame.router._resume["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-resume",this$);
}
}
}
});

re_frame.router._call_post_event_callbacks = (function re_frame$router$_call_post_event_callbacks(this$,event){
if((((!((this$ == null)))) && ((!((this$.re_frame$router$IEventQueue$_call_post_event_callbacks$arity$2 == null)))))){
return this$.re_frame$router$IEventQueue$_call_post_event_callbacks$arity$2(this$,event);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (re_frame.router._call_post_event_callbacks[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,event);
} else {
var m__11271__auto__ = (re_frame.router._call_post_event_callbacks["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,event);
} else {
throw cljs.core.missing_protocol.call(null,"IEventQueue.-call-post-event-callbacks",this$);
}
}
}
});


/**
* @constructor
 * @implements {re_frame.router.IEventQueue}
*/
re_frame.router.EventQueue = (function (fsm_state,queue,post_event_callback_fns){
this.fsm_state = fsm_state;
this.queue = queue;
this.post_event_callback_fns = post_event_callback_fns;
});
(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$ = cljs.core.PROTOCOL_SENTINEL);

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_run_queue$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var n = cljs.core.count.call(null,self__.queue);
while(true){
if((n === (0))){
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"finish-run","finish-run",(753148477)),null);
} else {
var temp__9584__auto__ = cljs.core.some.call(null,re_frame.router.later_fns,cljs.core.keys.call(null,cljs.core.meta.call(null,cljs.core.peek.call(null,self__.queue))));
if(cljs.core.truth_(temp__9584__auto__)){
var later_fn = temp__9584__auto__;
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"pause","pause",(-2095325672)),later_fn);
} else {
re_frame.router._process_1st_event_in_queue.call(null,this$__$1);

var G__982 = (n - (1));
n = G__982;
continue;
}
}
break;
}
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$remove_post_event_callback$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
if((!(cljs.core.contains_QMARK_.call(null,self__.post_event_callback_fns,id)))){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: could not remove post event call back with id:",id);
} else {
return (self__.post_event_callback_fns = cljs.core.dissoc.call(null,self__.post_event_callback_fns,id));
}
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_add_event$arity$2 = (function (_,event){
var self__ = this;
var ___$1 = this;
return (self__.queue = cljs.core.conj.call(null,self__.queue,event));
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_resume$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
re_frame.router._process_1st_event_in_queue.call(null,this$__$1);

return re_frame.router._run_queue.call(null,this$__$1);
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$push$arity$2 = (function (this$,event){
var self__ = this;
var this$__$1 = this;
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"add-event","add-event",(938429088)),event);
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_run_next_tick$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return re_frame.interop.next_tick.call(null,(function (){
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"run-queue","run-queue",(-1701798027)),null);
}));
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_fsm_trigger$arity$3 = (function (this$,trigger,arg){
var self__ = this;
var this$__$1 = this;
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR__orig_val__967 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__968 = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",(-1636141668)),new cljs.core.Keyword("re-frame.router","fsm-trigger","re-frame.router/fsm-trigger",(1379787274))], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__968);

try{try{var vec__969 = (function (){var G__972 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null);
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
re_frame.router._add_event.call(null,this$__$1,arg);

return re_frame.router._run_next_tick.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"exception","exception",(-335277064))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861)),(function (){
return re_frame.router._exception.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"finish-run","finish-run",(753148477))], null),G__972)){
if(cljs.core.empty_QMARK_.call(null,self__.queue)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
return re_frame.router._run_next_tick.call(null,this$__$1);
})], null);
}
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"pause","pause",(-2095325672))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),(function (){
return re_frame.router._pause.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),new cljs.core.Keyword(null,"resume","resume",(-118572261))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._resume.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),new cljs.core.Keyword(null,"run-queue","run-queue",(-1701798027))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._run_queue.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__972)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
throw cljs.core.ex_info.call(null,["re-frame: router state transition not found. ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.fsm_state)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(trigger)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fsm-state","fsm-state",(1656310533)),self__.fsm_state,new cljs.core.Keyword(null,"trigger","trigger",(103466139)),trigger], null));

}
}
}
}
}
}
}
}
}
})();
var new_fsm_state = cljs.core.nth.call(null,vec__969,(0),null);
var action_fn = cljs.core.nth.call(null,vec__969,(1),null);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___983 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-state","current-state",(1048284452)),self__.fsm_state,new cljs.core.Keyword(null,"new-state","new-state",(-490349212)),new_fsm_state], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-state","current-state",(1048284452)),self__.fsm_state,new cljs.core.Keyword(null,"new-state","new-state",(-490349212)),new_fsm_state], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___983);

} else {
}

(self__.fsm_state = new_fsm_state);

if(cljs.core.truth_(action_fn)){
return action_fn.call(null);
} else {
return null;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__22__auto___984 = re_frame.interop.now.call(null);
var duration__23__auto___985 = (end__22__auto___984 - new cljs.core.Keyword(null,"start","start",(-355208981)).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.call(null,re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",(1444101068)),duration__23__auto___985,new cljs.core.Keyword(null,"end","end",(-268185958)),re_frame.interop.now.call(null)));

re_frame.trace.run_tracing_callbacks_BANG_.call(null,end__22__auto___984);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__967);
}} else {
var vec__973 = (function (){var G__976 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null);
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
re_frame.router._add_event.call(null,this$__$1,arg);

return re_frame.router._run_next_tick.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"exception","exception",(-335277064))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861)),(function (){
return re_frame.router._exception.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"finish-run","finish-run",(753148477))], null),G__976)){
if(cljs.core.empty_QMARK_.call(null,self__.queue)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idle","idle",(-2007156861))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
return re_frame.router._run_next_tick.call(null,this$__$1);
})], null);
}
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"pause","pause",(-2095325672))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),(function (){
return re_frame.router._pause.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),new cljs.core.Keyword(null,"resume","resume",(-118572261))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._resume.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),new cljs.core.Keyword(null,"run-queue","run-queue",(-1701798027))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._run_queue.call(null,this$__$1);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"paused","paused",(-1710376127)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"running","running",(1554969103)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),new cljs.core.Keyword(null,"add-event","add-event",(938429088))], null),G__976)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scheduled","scheduled",(553898551)),(function (){
return re_frame.router._add_event.call(null,this$__$1,arg);
})], null);
} else {
throw cljs.core.ex_info.call(null,["re-frame: router state transition not found. ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.fsm_state)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(trigger)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fsm-state","fsm-state",(1656310533)),self__.fsm_state,new cljs.core.Keyword(null,"trigger","trigger",(103466139)),trigger], null));

}
}
}
}
}
}
}
}
}
})();
var new_fsm_state = cljs.core.nth.call(null,vec__973,(0),null);
var action_fn = cljs.core.nth.call(null,vec__973,(1),null);
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___986 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-state","current-state",(1048284452)),self__.fsm_state,new cljs.core.Keyword(null,"new-state","new-state",(-490349212)),new_fsm_state], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"operation","operation",(-1267664310)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.fsm_state,trigger], null),new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-state","current-state",(1048284452)),self__.fsm_state,new cljs.core.Keyword(null,"new-state","new-state",(-490349212)),new_fsm_state], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___986);

} else {
}

(self__.fsm_state = new_fsm_state);

if(cljs.core.truth_(action_fn)){
return action_fn.call(null);
} else {
return null;
}
}
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_pause$arity$2 = (function (this$,later_fn){
var self__ = this;
var this$__$1 = this;
return later_fn.call(null,(function (){
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"resume","resume",(-118572261)),null);
}));
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$add_post_event_callback$arity$3 = (function (_,id,callback_fn){
var self__ = this;
var ___$1 = this;
if(cljs.core.contains_QMARK_.call(null,self__.post_event_callback_fns,id)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: overwriting existing post event call back with id:",id);
} else {
}

return (self__.post_event_callback_fns = cljs.core.assoc.call(null,self__.post_event_callback_fns,id,callback_fn));
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_process_1st_event_in_queue$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var event_v = cljs.core.peek.call(null,self__.queue);
try{re_frame.events.handle.call(null,event_v);

(self__.queue = cljs.core.pop.call(null,self__.queue));

return re_frame.router._call_post_event_callbacks.call(null,this$__$1,event_v);
}catch (e977){var ex = e977;
return re_frame.router._fsm_trigger.call(null,this$__$1,new cljs.core.Keyword(null,"exception","exception",(-335277064)),ex);
}}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_call_post_event_callbacks$arity$2 = (function (_,event_v){
var self__ = this;
var ___$1 = this;
var seq__978 = cljs.core.seq.call(null,cljs.core.vals.call(null,self__.post_event_callback_fns));
var chunk__979 = null;
var count__980 = (0);
var i__981 = (0);
while(true){
if((i__981 < count__980)){
var callback = cljs.core._nth.call(null,chunk__979,i__981);
callback.call(null,event_v,self__.queue);


var G__987 = seq__978;
var G__988 = chunk__979;
var G__989 = count__980;
var G__990 = (i__981 + (1));
seq__978 = G__987;
chunk__979 = G__988;
count__980 = G__989;
i__981 = G__990;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__978);
if(temp__9646__auto__){
var seq__978__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__978__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__978__$1);
var G__991 = cljs.core.chunk_rest.call(null,seq__978__$1);
var G__992 = c__11729__auto__;
var G__993 = cljs.core.count.call(null,c__11729__auto__);
var G__994 = (0);
seq__978 = G__991;
chunk__979 = G__992;
count__980 = G__993;
i__981 = G__994;
continue;
} else {
var callback = cljs.core.first.call(null,seq__978__$1);
callback.call(null,event_v,self__.queue);


var G__995 = cljs.core.next.call(null,seq__978__$1);
var G__996 = null;
var G__997 = (0);
var G__998 = (0);
seq__978 = G__995;
chunk__979 = G__996;
count__980 = G__997;
i__981 = G__998;
continue;
}
} else {
return null;
}
}
break;
}
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$purge$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (self__.queue = re_frame.interop.empty_queue);
}));

(re_frame.router.EventQueue.prototype.re_frame$router$IEventQueue$_exception$arity$2 = (function (this$,ex){
var self__ = this;
var this$__$1 = this;
re_frame.router.purge.call(null,this$__$1);

throw ex;
}));

(re_frame.router.EventQueue.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fsm-state","fsm-state",(-998125236),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"queue","queue",(-1198599890),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"post-event-callback-fns","post-event-callback-fns",(-297038335),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(re_frame.router.EventQueue.cljs$lang$type = true);

(re_frame.router.EventQueue.cljs$lang$ctorStr = "re-frame.router/EventQueue");

(re_frame.router.EventQueue.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"re-frame.router/EventQueue");
}));

/**
 * Positional factory function for re-frame.router/EventQueue.
 */
re_frame.router.__GT_EventQueue = (function re_frame$router$__GT_EventQueue(fsm_state,queue,post_event_callback_fns){
return (new re_frame.router.EventQueue(fsm_state,queue,post_event_callback_fns));
});

re_frame.router.event_queue = re_frame.router.__GT_EventQueue.call(null,new cljs.core.Keyword(null,"idle","idle",(-2007156861)),re_frame.interop.empty_queue,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Enqueue `event` for processing by event handling machinery.
 * 
 *   `event` is a vector of length >= 1. The 1st element identifies the kind of event.
 * 
 *   Note: the event handler is not run immediately - it is not run
 *   synchronously. It will likely be run 'very soon', although it may be
 *   added to the end of a FIFO queue which already contain events.
 * 
 *   Usage:
 *   (dispatch [:order-pizza {:supreme 2 :meatlovers 1 :veg 1})
 */
re_frame.router.dispatch = (function re_frame$router$dispatch(event){
if((event == null)){
throw cljs.core.ex_info.call(null,"re-frame: you called \"dispatch\" without an event vector.",cljs.core.PersistentArrayMap.EMPTY);
} else {
re_frame.router.push.call(null,re_frame.router.event_queue,event);
}

return null;
});
/**
 * Synchronously (immediately) process `event`. Do not queue.
 * 
 *   Generally, don't use this. Instead use `dispatch`. It is an error
 *   to use `dispatch-sync` within an event handler.
 * 
 *   Useful when any delay in processing is a problem:
 *   1. the `:on-change` handler of a text field where we are expecting fast typing.
 *   2  when initialising your app - see 'main' in todomvc examples
 *   3. in a unit test where we don't want the action 'later'
 * 
 *   Usage:
 *   (dispatch-sync [:sing :falsetto 634])
 */
re_frame.router.dispatch_sync = (function re_frame$router$dispatch_sync(event_v){
re_frame.events.handle.call(null,event_v);

re_frame.router._call_post_event_callbacks.call(null,re_frame.router.event_queue,event_v);

return null;
});

//# sourceURL=re_frame/router.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvcm91dGVyLmpzIiwic291cmNlcyI6WyJyb3V0ZXIuY2xqcyJdLCJsaW5lQ291bnQiOjY4NSwibWFwcGluZ3MiOiI7QUFnRUEsNEJBQUEsMkNBQUEsdkVBQUtBLHdJQUNTLFdBQUtDO0FBQUwsQUFBUSwrQ0FBQSx4Q0FBQ0M7QUFBRCxBQUFlLE9BQUNDLHFDQUFVRjs7R0FEaEQsd0RBRWNFO0FBSWQsQUFBQTtBQUFBOzs7OEJBQUEsOUJBQWFtQjs7QUFBYix1QkFBQSx2QkFHR2hCLHNEQUFNaUIsTUFBS0M7QUFIZCxBQUFBLEdBQUEsRUFBQSxHQUFBLFVBQUEsYUFBQSxHQUFBLENBQUEsa0RBQUEsNUVBR1NELDBCQUFBQTtBQUhULE9BR1NBLCtDQUFBQSxNQUFLQzs7QUFIZCxJQUFBcEIsbUJBQUEsRUFBQSxVQUFBLE9BQUEsaEJBR1NtQixxQkFBQUE7SUFIVGxCLG1CQUFBLENBQUFDLHFCQUFBLEFBQUFDLFlBQUFIO0FBQUEsQUFBQSxHQUFBLEdBQUEsQ0FBQUMsb0JBQUE7QUFBQSxPQUFBQSwyQkFHU2tCLE1BQUtDOztBQUhkLElBQUFoQixtQkFBQSxDQUFBRixxQkFBQTtBQUFBLEFBQUEsR0FBQSxHQUFBLENBQUFFLG9CQUFBO0FBQUEsT0FBQUEsMkJBR1NlLE1BQUtDOztBQUhkLE1BQUEsQUFBQWYscUNBQUEsbUJBR1NjOzs7Ozs7QUFIVCwwQ0FBQSwxQ0FJR2IsNEZBQXlCYSxNQUFLRSxHQUFHQztBQUpwQyxBQUFBLEdBQUEsRUFBQSxHQUFBLFVBQUEsYUFBQSxHQUFBLENBQUEscUVBQUEsL0ZBSTRCSCwwQkFBQUE7QUFKNUIsT0FJNEJBLGtFQUFBQSxNQUFLRSxHQUFHQzs7QUFKcEMsSUFBQXRCLG1CQUFBLEVBQUEsVUFBQSxPQUFBLGhCQUk0Qm1CLHFCQUFBQTtJQUo1QmxCLG1CQUFBLENBQUFLLHdDQUFBLEFBQUFILFlBQUFIO0FBQUEsQUFBQSxHQUFBLEdBQUEsQ0FBQUMsb0JBQUE7QUFBQSxPQUFBQSwyQkFJNEJrQixNQUFLRSxHQUFH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RSxBQUFDRyxpQ0FBT0g7O0FBQ1IsQUFBQ3BELHFEQUEyQjhFLDRCQUFZMUI7O0FBZjFDIiwibmFtZXMiOlsicmUtZnJhbWUucm91dGVyL2xhdGVyLWZucyIsImYiLCJyZS1mcmFtZS5pbnRlcm9wL2FmdGVyLXJlbmRlciIsInJlLWZyYW1lLmludGVyb3AvbmV4dC10aWNrIiwieF9fMTEyNzNfX2F1dG9fXyIsIm1fXzExMjc0X19hdXRvX18iLCJyZS1mcmFtZS5yb3V0ZXIvcHVzaCIsImdvb2cvdHlwZU9mIiwibV9fMTEyNzFfX2F1dG9fXyIsImNsanMuY29yZS9taXNzaW5nLXByb3RvY29sIiwicmUtZnJhbWUucm91dGVyL2FkZC1wb3N0LWV2ZW50LWNhbGxiYWNrIiwicmUtZnJhbWUucm91dGVyL3JlbW92ZS1wb3N0LWV2ZW50LWNhbGxiYWNrIiwicmUtZnJhbWUucm91dGVyL3B1cmdlIiwicmUtZnJhbWUucm91dGVyLy1mc20tdHJpZ2dlciIsInJlLWZyYW1lLnJvdXRlci8tYWRkLWV2ZW50IiwicmUtZnJhbWUucm91dGVyLy1wcm9jZXNzLTFzdC1ldmVudC1pbi1xdWV1ZSIsInJlLWZyYW1lLnJvdXRlci8tcnVuLW5leHQtdGljayIsInJlLWZyYW1lLnJvdXRlci8tcnVuLXF1ZXVlIiwicmUtZnJhbWUucm91dGVyLy1leGNlcHRpb24iLCJyZS1mcmFtZS5yb3V0ZXIvLXBhdXNlIiwicmUtZnJhbWUucm91dGVyLy1yZXN1bWUiLCJyZS1mcmFtZS5yb3V0ZXIvLWNhbGwtcG9zdC1ldmVudC1jYWxsYmFja3MiLCJyZS1mcmFtZS5yb3V0ZXIvSUV2ZW50UXVldWUiLCJ0aGlzIiwiZXZlbnQiLCJpZCIsImNhbGxhY2siLCJ0cmlnZ2VyIiwiYXJnIiwiZXgiLCJsYXRlci1mbiIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsInRoaXNfXzExMDU1X19hdXRvX18iLCJ3cml0ZXJfXzExMDU2X19hdXRvX18iLCJvcHRfXzExMDU3X19hdXRvX18iLCJjbGpzLmNvcmUvLXdyaXRlIiwicmUtZnJhbWUucm91dGVyL0V2ZW50UXVldWUiLCJyZS1mcmFtZS5yb3V0ZXIvLT5FdmVudFF1ZXVlIiwiZnNtLXN0YXRlIiwicXVldWUiLCJwb3N0LWV2ZW50LWNhbGxiYWNrLWZucyIsIl8iLCJjYWxsYmFjay1mbiIsImNsanMuY29yZS9jb250YWlucz8iLCJyZS1mcmFtZS5sb2dnZXJzL2NvbnNvbGUiLCJjbGpzLmNvcmUvYXNzb2MiLCJjbGpzLmNvcmUvZGlzc29jIiwicmUtZnJhbWUuaW50ZXJvcC9lbXB0eS1xdWV1ZSIsInJlLWZyYW1lLnRyYWNlL2lzLXRyYWNlLWVuYWJsZWQ/IiwiKmN1cnJlbnQtdHJhY2UqLW9yaWctdmFsX185NjciLCJyZS1mcmFtZS50cmFjZS8qY3VycmVudC10cmFjZSoiLCIqY3VycmVudC10cmFjZSotdGVtcC12YWxfXzk2OCIsInJlLWZyYW1lLnRyYWNlL3N0YXJ0LXRyYWNlIiwiZW5kX18yMl9fYXV0b19fIiwicmUtZnJhbWUuaW50ZXJvcC9ub3ciLCJkdXJhdGlvbl9fMjNfX2F1dG9fXyIsImNsanMuY29yZS9zd2FwISIsInJlLWZyYW1lLnRyYWNlL3RyYWNlcyIsImNsanMuY29yZS9jb25qIiwicmUtZnJhbWUudHJhY2UvcnVuLXRyYWNpbmctY2FsbGJhY2tzISIsInZlY19fOTY5IiwiY2xqcy5jb3JlL250aCIsInZlY19fOTczIiwibmV3LWZzbS1zdGF0ZSIsImFjdGlvbi1mbiIsIkdfXzk3MiIsImNsanMuY29yZS89IiwiR19fOTc2IiwiY2xqcy5jb3JlL2VtcHR5PyIsImNsanMuY29yZS9leC1pbmZvIiwibmV3LXRyYWNlX18yNF9fYXV0b19fIiwiY2xqcy5jb3JlL21lcmdlIiwiY2xqcy5jb3JlL3VwZGF0ZSIsImV2ZW50LXYiLCJjbGpzLmNvcmUvcGVlayIsImU5NzciLCJyZS1mcmFtZS5ldmVudHMvaGFuZGxlIiwiY2xqcy5jb3JlL3BvcCIsIm4iLCJjbGpzLmNvcmUvY291bnQiLCJ0ZW1wX185NTg0X19hdXRvX18iLCJjbGpzLmNvcmUvc29tZSIsImNsanMuY29yZS9tZXRhIiwiY2xqcy5jb3JlL2tleXMiLCJzZXFfXzk3OCIsImNsanMuY29yZS9zZXEiLCJjaHVua19fOTc5IiwiY291bnRfXzk4MCIsImlfXzk4MSIsImNsanMuY29yZS8tbnRoIiwidGVtcF9fOTY0Nl9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rZWQtc2VxPyIsImNfXzExNzI5X19hdXRvX18iLCJjbGpzLmNvcmUvY2h1bmstZmlyc3QiLCJjbGpzLmNvcmUvY2h1bmstcmVzdCIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwiY2FsbGJhY2siLCJjbGpzLmNvcmUvdmFscyIsInJlLWZyYW1lLnJvdXRlci9ldmVudC1xdWV1ZSIsInJlLWZyYW1lLnJvdXRlci9kaXNwYXRjaCIsInJlLWZyYW1lLnJvdXRlci9kaXNwYXRjaC1zeW5jIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZS1mcmFtZS5yb3V0ZXJcbiAgKDpyZXF1aXJlIFtyZS1mcmFtZS5ldmVudHMgIDpyZWZlciBbaGFuZGxlXV1cbiAgICAgICAgICAgIFtyZS1mcmFtZS5pbnRlcm9wIDpyZWZlciBbYWZ0ZXItcmVuZGVyIGVtcHR5LXF1ZXVlIG5leHQtdGlja11dXG4gICAgICAgICAgICBbcmUtZnJhbWUubG9nZ2VycyA6cmVmZXIgW2NvbnNvbGVdXVxuICAgICAgICAgICAgW3JlLWZyYW1lLnRyYWNlICAgOmFzIHRyYWNlIDppbmNsdWRlLW1hY3JvcyB0cnVlXSkpXG5cblxuOzsgLS0gUm91dGVyIExvb3AgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG47O1xuOzsgQSBjYWxsIHRvIFwicmUtZnJhbWUuY29yZS9kaXNwYXRjaFwiIHBsYWNlcyBhbiBldmVudCBvbiBhIHF1ZXVlIGZvciBwcm9jZXNzaW5nLlxuOzsgQSBzaG9ydCB0aW1lIGxhdGVyLCB0aGUgaGFuZGxlciByZWdpc3RlcmVkIHRvIGhhbmRsZSB0aGlzIGV2ZW50IHdpbGwgYmUgcnVuLlxuOzsgV2hhdCBmb2xsb3dzIGlzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHByb2Nlc3MuXG47O1xuOzsgVGhlIHRhc2sgaXMgdG8gcHJvY2VzcyBxdWV1ZWQgZXZlbnRzIGluIGEgcGVycGV0dWFsIGxvb3AsIG9uZSBhZnRlclxuOzsgdGhlIG90aGVyLCBGSUZPLCBjYWxsaW5nIHRoZSByZWdpc3RlcmVkIGV2ZW50LWhhbmRsZXIgZm9yIGVhY2gsIGJlaW5nIGlkbGUgd2hlblxuOzsgdGhlcmUgYXJlIG5vIGV2ZW50cywgYW5kIGZpcmluZyB1cCB3aGVuIG9uZSBhcnJpdmVzLlxuOztcbjs7IEJ1dCBicm93c2VycyBvbmx5IGhhdmUgYSBzaW5nbGUgdGhyZWFkIG9mIGNvbnRyb2wgYW5kIHdlIG11c3QgYmVcbjs7IGNhcmVmdWwgdG8gbm90IGhvZyB0aGUgQ1BVLiBXaGVuIHByb2Nlc3NpbmcgZXZlbnRzIG9uZSBhZnRlciBhbm90aGVyLCB3ZVxuOzsgbXVzdCByZWd1bGFybHkgaGFuZCBiYWNrIGNvbnRyb2wgdG8gdGhlIGJyb3dzZXIsIHNvIGl0IGNhbiByZWRyYXcsIHByb2Nlc3Ncbjs7IHdlYnNvY2tldHMsIGV0Yy4gQnV0IG5vdCB0b28gcmVndWxhcmx5ISBJZiB3ZSBhcmUgaW4gYSBkZS1mb2N1c2VkIGJyb3dzZXJcbjs7IHRhYiwgb3VyIGFwcCB3aWxsIGJlIENQVSB0aHJvdHRsZWQuIEVhY2ggdGltZSB3ZSBnZXQgYmFjayBjb250cm9sLCB3ZSBoYXZlXG47OyB0byBwcm9jZXNzIGFsbCBxdWV1ZWQgZXZlbnRzLCBvciBlbHNlIHNvbWV0aGluZyBsaWtlIGEgYnVyc3R5IHdlYnNvY2tldFxuOzsgKHByb2R1Y2luZyBldmVudHMpIG1pZ2h0IG92ZXJ3aGVsbSB0aGUgcXVldWUuIFNvIHRoZXJlJ3MgYSBiYWxhbmNlLlxuOztcbjs7IFRoZSBwcm9jZXNzaW5nL2hhbmRsaW5nIG9mIGFuIGV2ZW50IGhhcHBlbnMgXCJhc3luY2hyb25vdXNseVwiIHNvbWV0aW1lIGFmdGVyXG47OyB0aGF0IGV2ZW50IHdhcyBlbnF1ZXVlZCB2aWEgXCJkaXNwYXRjaFwiLiBUaGUgb3JpZ2luYWwgaW1wbGVtZW50YXRpb24gb2YgdGhpcyByb3V0ZXIgbG9vcFxuOzsgdXNlZCBgY29yZS5hc3luY2AuIEFzIGEgcmVzdWx0LCBpdCB3YXMgZmFpcmx5IHNpbXBsZSwgYW5kIGl0IG1vc3RseSB3b3JrZWQsXG47OyBidXQgaXQgZGlkIG5vdCBnaXZlIGVub3VnaCBjb250cm9sLiBTbyBub3cgd2UgaGFuZC1yb2xsIG91ciBvd24sXG47OyBmaW5pdGUtc3RhdGUtbWFjaGluZSBhbmQgYWxsLlxuOztcbjs7IEluIHdoYXQgZm9sbG93cywgdGhlIHN0cmF0ZWd5IGlzIHRoaXM6XG47OyAgIC0gbWFpbnRhaW4gYSBGSUZPIHF1ZXVlIG9mIGBkaXNwYXRjaGVkYCBldmVudHMuXG47OyAgIC0gd2hlbiBhIG5ldyBldmVudCBhcnJpdmVzLCBcInNjaGVkdWxlXCIgcHJvY2Vzc2luZyBvZiB0aGlzIHF1ZXVlIHVzaW5nXG47OyAgICAgZ29vZy5hc3luYy5uZXh0VGljaywgd2hpY2ggbWVhbnMgaXQgd2lsbCBoYXBwZW4gXCJ2ZXJ5IHNvb25cIi5cbjs7ICAgLSB3aGVuIHByb2Nlc3NpbmcgZXZlbnRzLCBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBkbyBBTEwgdGhlIGN1cnJlbnRseVxuOzsgICAgIHF1ZXVlZCBldmVudHMuIERvbid0IHN0b3AuIERvbid0IHlpZWxkIHRvIHRoZSBicm93c2VyLiBIb2cgdGhhdCBDUFUuXG47OyAgIC0gYnV0IGlmIGFueSBuZXcgZXZlbnRzIGFyZSBkaXNwYXRjaGVkIGR1cmluZyB0aGlzIGN5Y2xlIG9mIHByb2Nlc3NpbmcsXG47OyAgICAgZG9uJ3QgZG8gdGhlbSBpbW1lZGlhdGVseS4gTGVhdmUgdGhlbSBxdWV1ZWQuIFlpZWxkIGZpcnN0IHRvIHRoZSBicm93c2VyLFxuOzsgICAgIGFuZCBkbyB0aGVzZSBuZXcgZXZlbnRzIGluIHRoZSBuZXh0IHByb2Nlc3NpbmcgY3ljbGUuIFRoYXQgd2F5IHdlIGRyYWluXG47OyAgICAgdGhlIHF1ZXVlIHVwIHRvIGEgcG9pbnQsIGJ1dCB3ZSBuZXZlciBob2cgdGhlIENQVSBmb3JldmVyLiBJblxuOzsgICAgIHBhcnRpY3VsYXIsIHdlIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSBoYW5kbGluZyBvbmUgZXZlbnQgd2lsbCBiZWdldFxuOzsgICAgIGFub3RoZXIgZXZlbnQuIFRoZSBmcmVzaGx5IGJlZ290dGVuIGV2ZW50IHdpbGwgYmUgaGFuZGxlZCBuZXh0IGN5Y2xlLFxuOzsgICAgIHdpdGggeWllbGRpbmcgaW4tYmV0d2Vlbi5cbjs7ICAgLSBJbiBzb21lIGNhc2VzLCBhbiBldmVudCBzaG91bGQgbm90IGJlIGhhbmRsZWQgdW50aWwgYWZ0ZXIgdGhlIEdVSSBoYXMgYmVlblxuOzsgICAgIHVwZGF0ZWQsIGkuZS4sIGFmdGVyIHRoZSBuZXh0IFJlYWdlbnQgYW5pbWF0aW9uIGZyYW1lLiBJbiBzdWNoIGEgY2FzZSxcbjs7ICAgICB0aGUgZXZlbnQgc2hvdWxkIGJlIGRpc3BhdGNoZWQgd2l0aCA6Zmx1c2gtZG9tIG1ldGFkYXRhIGxpa2UgdGhpczpcbjs7ICAgICAgIChkaXNwYXRjaCBeOmZsdXNoLWRvbSBbOmV2ZW50LWlkIG90aGVyIHBhcmFtc10pXG47OyAgICAgU3VjaCBhbiBldmVudCB3aWxsIHRlbXBvcmFyaWx5IGJsb2NrIGFsbCBmdXJ0aGVyIHByb2Nlc3NpbmcgYmVjYXVzZVxuOzsgICAgIGV2ZW50cyBhcmUgcHJvY2Vzc2VkIHNlcXVlbnRpYWxseTogd2UgaGFuZGxlIG9uZSBldmVudCBjb21wbGV0ZWx5XG47OyAgICAgYmVmb3JlIHdlIGhhbmRsZSB0aGUgb25lcyBiZWhpbmQgaXQuXG47O1xuOzsgSW1wbGVtZW50YXRpb24gbm90ZXM6XG47OyAgIC0gcXVldWUgcHJvY2Vzc2luZyBjYW4gYmUgaW4gYSBudW1iZXIgb2Ygc3RhdGVzOiBzY2hlZHVsZWQsIHJ1bm5pbmcsIHBhdXNlZFxuOzsgICAgIGV0Yy4gU28gaXQgaXMgbW9kZWxlZCBhcyBhIEZpbml0ZSBTdGF0ZSBNYWNoaW5lLlxuOzsgICAgIFNlZSBcIi1mc20tdHJpZ2dlclwiIChiZWxvdykgZm9yIHRoZSBzdGF0ZXMgYW5kIHRyYW5zaXRpb25zLlxuOzsgICAtIHRoZSBzY2hlZHVsaW5nIGlzIGRvbmUgdmlhIFwiZ29vZy5hc3luYy5uZXh0VGlja1wiIHdoaWNoIGlzIHByZXR0eSBxdWlja1xuOzsgICAtIHdoZW4gdGhlIGV2ZW50IGhhcyA6Zmx1c2gtZG9tIG1ldGFkYXRhIHdlIHNjaGVkdWxlIHZpYVxuOzsgICAgICAgXCJyZWFnZW50LmNvcmUuYWZ0ZXItcmVuZGVyXCJcbjs7ICAgICB3aGljaCB3aWxsIHJ1biBldmVudCBwcm9jZXNzaW5nIGFmdGVyIHRoZSBuZXh0IFJlYWdlbnQgYW5pbWF0aW9uIGZyYW1lLlxuOztcblxuOzsgRXZlbnRzIGNhbiBoYXZlIG1ldGFkYXRhIHdoaWNoIHNheXMgdG8gcGF1c2UgZXZlbnQgcHJvY2Vzc2luZy5cbjs7IGV2ZW50IG1ldGFkYXRhIC0+IFwicnVuIGxhdGVyXCIgZnVuY3Rpb25zXG4oZGVmIGxhdGVyLWZuc1xuICB7OmZsdXNoLWRvbSAoZm4gW2ZdIChhZnRlci1yZW5kZXIgIyhuZXh0LXRpY2sgZikpKSAgIDs7IG9uZSB0aWNrIGFmdGVyIHRoZSBlbmQgb2YgdGhlIG5leHQgYW5uaW1hdGlvbiBmcmFtZVxuICAgOnlpZWxkICAgICBuZXh0LXRpY2t9KSAgICAgICAgICAgICAgIDs7IGFsbW9zdCBpbW1lZGlhdGVseVxuXG5cbjs7IEV2ZW50IFF1ZXVlIEFic3RyYWN0aW9uXG4oZGVmcHJvdG9jb2wgSUV2ZW50UXVldWVcblxuICA7OyAtLSBBUElcbiAgKHB1c2ggW3RoaXMgZXZlbnRdKVxuICAoYWRkLXBvc3QtZXZlbnQtY2FsbGJhY2sgW3RoaXMgaWQgY2FsbGFja10pXG4gIChyZW1vdmUtcG9zdC1ldmVudC1jYWxsYmFjayBbdGhpcyBmXSlcbiAgKHB1cmdlIFt0aGlzXSlcblxuICA7OyAtLSBJbXBsZW1lbnRhdGlvbiB2aWEgYSBGaW5pdGUgU3RhdGUgTWFjaGluZVxuICAoLWZzbS10cmlnZ2VyIFt0aGlzIHRyaWdnZXIgYXJnXSlcblxuICA7OyAtLSBGaW5pdGUgU3RhdGUgTWFjaGluZSBhY3Rpb25zXG4gICgtYWRkLWV2ZW50IFt0aGlzIGV2ZW50XSlcbiAgKC1wcm9jZXNzLTFzdC1ldmVudC1pbi1xdWV1ZSBbdGhpc10pXG4gICgtcnVuLW5leHQtdGljayBbdGhpc10pXG4gICgtcnVuLXF1ZXVlIFt0aGlzXSlcbiAgKC1leGNlcHRpb24gW3RoaXMgZXhdKVxuICAoLXBhdXNlIFt0aGlzIGxhdGVyLWZuXSlcbiAgKC1yZXN1bWUgW3RoaXNdKVxuICAoLWNhbGwtcG9zdC1ldmVudC1jYWxsYmFja3MgW3RoaXMgZXZlbnRdKSlcblxuXG47OyBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBJRXZlbnRRdWV1ZVxuKGRlZnR5cGUgRXZlbnRRdWV1ZSBbIz8oOmNsanMgXjptdXRhYmxlIGZzbS1zdGF0ZSAgICAgICAgICAgICAgIDpjbGogXjp2b2xhdGlsZS1tdXRhYmxlIGZzbS1zdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICM/KDpjbGpzIF46bXV0YWJsZSBxdWV1ZSAgICAgICAgICAgICAgICAgICA6Y2xqIF46dm9sYXRpbGUtbXV0YWJsZSBxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgICM/KDpjbGpzIF46bXV0YWJsZSBwb3N0LWV2ZW50LWNhbGxiYWNrLWZucyA6Y2xqIF46dm9sYXRpbGUtbXV0YWJsZSBwb3N0LWV2ZW50LWNhbGxiYWNrLWZucyldXG4gIElFdmVudFF1ZXVlXG5cbiAgOzsgLS0gQVBJIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIChwdXNoIFt0aGlzIGV2ZW50XSAgICAgICAgIDs7IHByZXN1bWFibHkgY2FsbGVkIGJ5IGRpc3BhdGNoXG4gICAgKC1mc20tdHJpZ2dlciB0aGlzIDphZGQtZXZlbnQgZXZlbnQpKVxuXG4gIDs7IHJlZ2lzdGVyIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgZWFjaCBldmVudCBpcyBwcm9jZXNzZWRcbiAgKGFkZC1wb3N0LWV2ZW50LWNhbGxiYWNrIFtfIGlkIGNhbGxiYWNrLWZuXVxuICAgIChpZiAoY29udGFpbnM/IHBvc3QtZXZlbnQtY2FsbGJhY2stZm5zIGlkKVxuICAgICAgKGNvbnNvbGUgOndhcm4gXCJyZS1mcmFtZTogb3ZlcndyaXRpbmcgZXhpc3RpbmcgcG9zdCBldmVudCBjYWxsIGJhY2sgd2l0aCBpZDpcIiBpZCkpXG4gICAgKC0+PiAoYXNzb2MgcG9zdC1ldmVudC1jYWxsYmFjay1mbnMgaWQgY2FsbGJhY2stZm4pXG4gICAgICAgICAoc2V0ISBwb3N0LWV2ZW50LWNhbGxiYWNrLWZucykpKVxuXG4gIChyZW1vdmUtcG9zdC1ldmVudC1jYWxsYmFjayBbXyBpZF1cbiAgICAoaWYtbm90IChjb250YWlucz8gcG9zdC1ldmVudC1jYWxsYmFjay1mbnMgaWQpXG4gICAgICAoY29uc29sZSA6d2FybiBcInJlLWZyYW1lOiBjb3VsZCBub3QgcmVtb3ZlIHBvc3QgZXZlbnQgY2FsbCBiYWNrIHdpdGggaWQ6XCIgaWQpXG4gICAgICAoLT4+IChkaXNzb2MgcG9zdC1ldmVudC1jYWxsYmFjay1mbnMgaWQpXG4gICAgICAgICAgIChzZXQhIHBvc3QtZXZlbnQtY2FsbGJhY2stZm5zKSkpKVxuXG4gIChwdXJnZSBbX11cbiAgICAoc2V0ISBxdWV1ZSBlbXB0eS1xdWV1ZSkpXG5cbiAgOzsgLS0gRlNNIEltcGxlbWVudGF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICgtZnNtLXRyaWdnZXJcbiAgICBbdGhpcyB0cmlnZ2VyIGFyZ11cblxuICAgIDs7IFRoZSBmb2xsb3dpbmcgXCJjYXNlXCIgaW1wbGVtZW50cyB0aGUgRmluaXRlIFN0YXRlIE1hY2hpbmUuXG4gICAgOzsgR2l2ZW4gYSBcInRyaWdnZXJcIiwgYW5kIHRoZSBleGlzdGluZyBGU00gc3RhdGUsIGl0IGNvbXB1dGVzIHRoZVxuICAgIDs7IG5ldyBGU00gc3RhdGUgYW5kIHRoZSB0cmFuc2l0aW9uIGFjdGlvbiAoZnVuY3Rpb24pLlxuXG4gICAgKGxvY2tpbmcgdGhpc1xuICAgICAgKHRyYWNlL3dpdGgtdHJhY2UgezpvcC10eXBlIDo6ZnNtLXRyaWdnZXJ9XG4gICAgICAgIChsZXQgW1tuZXctZnNtLXN0YXRlIGFjdGlvbi1mbl1cbiAgICAgICAgICAgICAgKGNhc2UgW2ZzbS1zdGF0ZSB0cmlnZ2VyXVxuXG4gICAgICAgICAgICAgICAgOzsgWW91IHNob3VsZCByZWFkIHRoZSBmb2xsb3dpbmcgXCJjYXNlXCIgYXM6XG4gICAgICAgICAgICAgICAgOzsgW2N1cnJlbnQtRlNNLXN0YXRlIHRyaWdnZXJdIC0+IFtuZXctRlNNLXN0YXRlIGFjdGlvbi1mbl1cbiAgICAgICAgICAgICAgICA7O1xuICAgICAgICAgICAgICAgIDs7IFNvLCBmb3IgZXhhbXBsZSwgdGhlIG5leHQgbGluZSBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXM6XG4gICAgICAgICAgICAgICAgOzsgaWYgeW91IGFyZSBpbiBzdGF0ZSBcIjppZGxlXCIgYW5kIGEgdHJpZ2dlciBcIjphZGQtZXZlbnRcIlxuICAgICAgICAgICAgICAgIDs7IGhhcHBlbnMsIHRoZW4gbW92ZSB0aGUgRlNNIHRvIHN0YXRlIFwiOnNjaGVkdWxlZFwiIGFuZCBleGVjdXRlXG4gICAgICAgICAgICAgICAgOzsgdGhhdCB0d28tcGFydCBcImRvXCIgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgWzppZGxlIDphZGQtZXZlbnRdIFs6c2NoZWR1bGVkICMoZG8gKC1hZGQtZXZlbnQgdGhpcyBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKC1ydW4tbmV4dC10aWNrIHRoaXMpKV1cblxuICAgICAgICAgICAgICAgIDs7IFN0YXRlOiA6c2NoZWR1bGVkICAodGhlIHF1ZXVlIGlzIHNjaGVkdWxlZCB0byBydW4sIHNvb24pXG4gICAgICAgICAgICAgICAgWzpzY2hlZHVsZWQgOmFkZC1ldmVudF0gWzpzY2hlZHVsZWQgIygtYWRkLWV2ZW50IHRoaXMgYXJnKV1cbiAgICAgICAgICAgICAgICBbOnNjaGVkdWxlZCA6cnVuLXF1ZXVlXSBbOnJ1bm5pbmcgIygtcnVuLXF1ZXVlIHRoaXMpXVxuXG4gICAgICAgICAgICAgICAgOzsgU3RhdGU6IDpydW5uaW5nICh0aGUgcXVldWUgaXMgYmVpbmcgcHJvY2Vzc2VkIG9uZSBldmVudCBhZnRlciBhbm90aGVyKVxuICAgICAgICAgICAgICAgIFs6cnVubmluZyA6YWRkLWV2ZW50XSBbOnJ1bm5pbmcgIygtYWRkLWV2ZW50IHRoaXMgYXJnKV1cbiAgICAgICAgICAgICAgICBbOnJ1bm5pbmcgOnBhdXNlXSBbOnBhdXNlZCAjKC1wYXVzZSB0aGlzIGFyZyldXG4gICAgICAgICAgICAgICAgWzpydW5uaW5nIDpleGNlcHRpb25dIFs6aWRsZSAjKC1leGNlcHRpb24gdGhpcyBhcmcpXVxuICAgICAgICAgICAgICAgIFs6cnVubmluZyA6ZmluaXNoLXJ1bl0gKGlmIChlbXB0eT8gcXVldWUpICAgICA7OyBGU00gZ3VhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzppZGxlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbOnNjaGVkdWxlZCAjKC1ydW4tbmV4dC10aWNrIHRoaXMpXSlcblxuICAgICAgICAgICAgICAgIDs7IFN0YXRlOiA6cGF1c2VkICg6Zmx1c2gtZG9tIG1ldGFkYXRhIG9uIGFuIGV2ZW50IGhhcyBjYXVzZWQgYSB0ZW1wb3JhcnkgcGF1c2UgaW4gcHJvY2Vzc2luZylcbiAgICAgICAgICAgICAgICBbOnBhdXNlZCA6YWRkLWV2ZW50XSBbOnBhdXNlZCAjKC1hZGQtZXZlbnQgdGhpcyBhcmcpXVxuICAgICAgICAgICAgICAgIFs6cGF1c2VkIDpyZXN1bWVdIFs6cnVubmluZyAjKC1yZXN1bWUgdGhpcyldXG5cbiAgICAgICAgICAgICAgICAodGhyb3cgKGV4LWluZm8gKHN0ciBcInJlLWZyYW1lOiByb3V0ZXIgc3RhdGUgdHJhbnNpdGlvbiBub3QgZm91bmQuIFwiIGZzbS1zdGF0ZSBcIiBcIiB0cmlnZ2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7OmZzbS1zdGF0ZSBmc20tc3RhdGUsIDp0cmlnZ2VyIHRyaWdnZXJ9KSkpXVxuXG4gICAgICAgICAgOzsgVGhlIFwiY2FzZVwiIGFib3ZlIGNvbXB1dGVkIGJvdGggdGhlIG5ldyBGU00gc3RhdGUsIGFuZCB0aGUgYWN0aW9uLiBOb3csIG1ha2UgaXQgaGFwcGVuLlxuXG4gICAgICAgICAgKHRyYWNlL21lcmdlLXRyYWNlISB7Om9wZXJhdGlvbiBbZnNtLXN0YXRlIHRyaWdnZXJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRhZ3MgICAgICB7OmN1cnJlbnQtc3RhdGUgZnNtLXN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5ldy1zdGF0ZSAgICAgbmV3LWZzbS1zdGF0ZX19KVxuICAgICAgICAgIChzZXQhIGZzbS1zdGF0ZSBuZXctZnNtLXN0YXRlKVxuICAgICAgICAgICh3aGVuIGFjdGlvbi1mbiAoYWN0aW9uLWZuKSkpKSkpXG5cbiAgKC1hZGQtZXZlbnRcbiAgICBbXyBldmVudF1cbiAgICAoc2V0ISBxdWV1ZSAoY29uaiBxdWV1ZSBldmVudCkpKVxuXG4gICgtcHJvY2Vzcy0xc3QtZXZlbnQtaW4tcXVldWVcbiAgICBbdGhpc11cbiAgICAobGV0IFtldmVudC12IChwZWVrIHF1ZXVlKV1cbiAgICAgICh0cnlcbiAgICAgICAgKGhhbmRsZSBldmVudC12KVxuICAgICAgICAoc2V0ISBxdWV1ZSAocG9wIHF1ZXVlKSlcbiAgICAgICAgKC1jYWxsLXBvc3QtZXZlbnQtY2FsbGJhY2tzIHRoaXMgZXZlbnQtdilcbiAgICAgICAgKGNhdGNoICM/KDpjbGpzIDpkZWZhdWx0IDpjbGogRXhjZXB0aW9uKSBleFxuICAgICAgICAgICgtZnNtLXRyaWdnZXIgdGhpcyA6ZXhjZXB0aW9uIGV4KSkpKSlcblxuICAoLXJ1bi1uZXh0LXRpY2tcbiAgICBbdGhpc11cbiAgICAobmV4dC10aWNrICMoLWZzbS10cmlnZ2VyIHRoaXMgOnJ1bi1xdWV1ZSBuaWwpKSlcblxuICA7OyBQcm9jZXNzIGFsbCB0aGUgZXZlbnRzIGN1cnJlbnRseSBpbiB0aGUgcXVldWUsIGJ1dCBub3QgYW55IG5ldyBvbmVzLlxuICA7OyBCZSBhd2FyZSB0aGF0IGV2ZW50cyBtaWdodCBoYXZlIG1ldGFkYXRhIHdoaWNoIHdpbGwgcGF1c2UgcHJvY2Vzc2luZy5cbiAgKC1ydW4tcXVldWVcbiAgICBbdGhpc11cbiAgICAobG9vcCBbbiAoY291bnQgcXVldWUpXVxuICAgICAgKGlmICh6ZXJvPyBuKVxuICAgICAgICAoLWZzbS10cmlnZ2VyIHRoaXMgOmZpbmlzaC1ydW4gbmlsKVxuICAgICAgICAoaWYtbGV0IFtsYXRlci1mbiAoc29tZSBsYXRlci1mbnMgKC0+IHF1ZXVlIHBlZWsgbWV0YSBrZXlzKSldICA7OyBhbnkgbWV0YWRhdGEgd2hpY2ggY2F1c2VzIHBhdXNpbmc/XG4gICAgICAgICAgKC1mc20tdHJpZ2dlciB0aGlzIDpwYXVzZSBsYXRlci1mbilcbiAgICAgICAgICAoZG8gKC1wcm9jZXNzLTFzdC1ldmVudC1pbi1xdWV1ZSB0aGlzKVxuICAgICAgICAgICAgICAocmVjdXIgKGRlYyBuKSkpKSkpKVxuXG4gICgtZXhjZXB0aW9uXG4gICAgW3RoaXMgZXhdXG4gICAgKHB1cmdlIHRoaXMpICAgOzsgcHVyZ2UgdGhlIHF1ZXVlXG4gICAgKHRocm93IGV4KSlcblxuICAoLXBhdXNlXG4gICAgW3RoaXMgbGF0ZXItZm5dXG4gICAgKGxhdGVyLWZuICMoLWZzbS10cmlnZ2VyIHRoaXMgOnJlc3VtZSBuaWwpKSlcblxuICAoLWNhbGwtcG9zdC1ldmVudC1jYWxsYmFja3NcbiAgICBbXyBldmVudC12XVxuICAgIChkb3NlcSBbY2FsbGJhY2sgKHZhbHMgcG9zdC1ldmVudC1jYWxsYmFjay1mbnMpXVxuICAgICAgKGNhbGxiYWNrIGV2ZW50LXYgcXVldWUpKSlcblxuICAoLXJlc3VtZVxuICAgIFt0aGlzXVxuICAgICgtcHJvY2Vzcy0xc3QtZXZlbnQtaW4tcXVldWUgdGhpcykgIDs7IGRvIHRoZSBldmVudCB3aGljaCBwYXVzZWQgcHJvY2Vzc2luZ1xuICAgICgtcnVuLXF1ZXVlIHRoaXMpKSkgICAgICAgICAgICAgICAgIDs7IGRvIHRoZSByZXN0IG9mIHRoZSBxdWV1ZWQgZXZlbnRzXG5cblxuOzsgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG47OyBFdmVudCBRdWV1ZVxuOzsgV2hlbiBcImRpc3BhdGNoXCIgaXMgY2FsbGVkLCB0aGUgZXZlbnQgaXMgYWRkZWQgaW50byB0aGlzIGV2ZW50IHF1ZXVlLiAgTGF0ZXIsXG47OyAgdGhlIHF1ZXVlIHdpbGwgXCJydW5cIiBhbmQgdGhlIGV2ZW50IHdpbGwgYmUgXCJoYW5kbGVkXCIgYnkgdGhlIHJlZ2lzdGVyZWQgZnVuY3Rpb24uXG47O1xuKGRlZiBldmVudC1xdWV1ZSAoLT5FdmVudFF1ZXVlIDppZGxlIGVtcHR5LXF1ZXVlIHt9KSlcblxuXG47OyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbjs7IERpc3BhdGNoaW5nXG47O1xuXG4oZGVmbiBkaXNwYXRjaFxuICBcIkVucXVldWUgYGV2ZW50YCBmb3IgcHJvY2Vzc2luZyBieSBldmVudCBoYW5kbGluZyBtYWNoaW5lcnkuXG5cbiAgYGV2ZW50YCBpcyBhIHZlY3RvciBvZiBsZW5ndGggPj0gMS4gVGhlIDFzdCBlbGVtZW50IGlkZW50aWZpZXMgdGhlIGtpbmQgb2YgZXZlbnQuXG5cbiAgTm90ZTogdGhlIGV2ZW50IGhhbmRsZXIgaXMgbm90IHJ1biBpbW1lZGlhdGVseSAtIGl0IGlzIG5vdCBydW5cbiAgc3luY2hyb25vdXNseS4gSXQgd2lsbCBsaWtlbHkgYmUgcnVuICd2ZXJ5IHNvb24nLCBhbHRob3VnaCBpdCBtYXkgYmVcbiAgYWRkZWQgdG8gdGhlIGVuZCBvZiBhIEZJRk8gcXVldWUgd2hpY2ggYWxyZWFkeSBjb250YWluIGV2ZW50cy5cblxuICBVc2FnZTpcbiAgICAgKGRpc3BhdGNoIFs6b3JkZXItcGl6emEgezpzdXByZW1lIDIgOm1lYXRsb3ZlcnMgMSA6dmVnIDF9KVwiXG4gIFtldmVudF1cbiAgKGlmIChuaWw/IGV2ZW50KVxuICAgICAgKHRocm93IChleC1pbmZvIFwicmUtZnJhbWU6IHlvdSBjYWxsZWQgXFxcImRpc3BhdGNoXFxcIiB3aXRob3V0IGFuIGV2ZW50IHZlY3Rvci5cIiB7fSkpXG4gICAgICAocHVzaCBldmVudC1xdWV1ZSBldmVudCkpXG4gIG5pbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOzsgRW5zdXJlIG5pbCByZXR1cm4uIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZGF5OC9yZS1mcmFtZS93aWtpL0Jld2FyZS1SZXR1cm5pbmctRmFsc2VcblxuXG4oZGVmbiBkaXNwYXRjaC1zeW5jXG4gIFwiU3luY2hyb25vdXNseSAoaW1tZWRpYXRlbHkpIHByb2Nlc3MgYGV2ZW50YC4gRG8gbm90IHF1ZXVlLlxuXG4gIEdlbmVyYWxseSwgZG9uJ3QgdXNlIHRoaXMuIEluc3RlYWQgdXNlIGBkaXNwYXRjaGAuIEl0IGlzIGFuIGVycm9yXG4gIHRvIHVzZSBgZGlzcGF0Y2gtc3luY2Agd2l0aGluIGFuIGV2ZW50IGhhbmRsZXIuXG5cbiAgVXNlZnVsIHdoZW4gYW55IGRlbGF5IGluIHByb2Nlc3NpbmcgaXMgYSBwcm9ibGVtOlxuICAgICAxLiB0aGUgYDpvbi1jaGFuZ2VgIGhhbmRsZXIgb2YgYSB0ZXh0IGZpZWxkIHdoZXJlIHdlIGFyZSBleHBlY3RpbmcgZmFzdCB0eXBpbmcuXG4gICAgIDIgIHdoZW4gaW5pdGlhbGlzaW5nIHlvdXIgYXBwIC0gc2VlICdtYWluJyBpbiB0b2RvbXZjIGV4YW1wbGVzXG4gICAgIDMuIGluIGEgdW5pdCB0ZXN0IHdoZXJlIHdlIGRvbid0IHdhbnQgdGhlIGFjdGlvbiAnbGF0ZXInXG5cbiAgVXNhZ2U6XG4gICAgIChkaXNwYXRjaC1zeW5jIFs6c2luZyA6ZmFsc2V0dG8gNjM0XSlcIlxuICBbZXZlbnQtdl1cbiAgKGhhbmRsZSBldmVudC12KVxuICAoLWNhbGwtcG9zdC1ldmVudC1jYWxsYmFja3MgZXZlbnQtcXVldWUgZXZlbnQtdikgIDs7IHNsaWdodGx5IHVnbHkgaGFjay4gUnVuIHRoZSByZWdpc3RlcmVkIHBvc3QgZXZlbnQgY2FsbGJhY2tzLlxuICBuaWwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDs7IEVuc3VyZSBuaWwgcmV0dXJuLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2RheTgvcmUtZnJhbWUvd2lraS9CZXdhcmUtUmV0dXJuaW5nLUZhbHNlXG4iXX0=