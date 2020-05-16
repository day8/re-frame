// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.interceptor");
re_frame.interceptor.mandatory_interceptor_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",(-1388402092)),null,new cljs.core.Keyword(null,"after","after",(594996914)),null,new cljs.core.Keyword(null,"before","before",(-1633692388)),null], null), null);
re_frame.interceptor.interceptor_QMARK_ = (function re_frame$interceptor$interceptor_QMARK_(m){
return ((cljs.core.map_QMARK_.call(null,m)) && (cljs.core._EQ_.call(null,re_frame.interceptor.mandatory_interceptor_keys,cljs.core.set.call(null,cljs.core.keys.call(null,m)))));
});
/**
 * Create an interceptor from named arguments
 */
re_frame.interceptor.__GT_interceptor = (function re_frame$interceptor$__GT_interceptor(var_args){
var args__12462__auto__ = [];
var len__12445__auto___821 = arguments.length;
var i__12446__auto___822 = (0);
while(true){
if((i__12446__auto___822 < len__12445__auto___821)){
args__12462__auto__.push((arguments[i__12446__auto___822]));

var G__823 = (i__12446__auto___822 + (1));
i__12446__auto___822 = G__823;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((0) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((0)),(0),null)):null);
return re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(argseq__12463__auto__);
});

(re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic = (function (p__818){
var map__819 = p__818;
var map__819__$1 = (((((!((map__819 == null))))?(((((map__819.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__819.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__819):map__819);
var m = map__819__$1;
var id = cljs.core.get.call(null,map__819__$1,new cljs.core.Keyword(null,"id","id",(-1388402092)));
var before = cljs.core.get.call(null,map__819__$1,new cljs.core.Keyword(null,"before","before",(-1633692388)));
var after = cljs.core.get.call(null,map__819__$1,new cljs.core.Keyword(null,"after","after",(594996914)));
if(re_frame.interop.debug_enabled_QMARK_){
var temp__9584__auto___824 = cljs.core.seq.call(null,clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,m)),re_frame.interceptor.mandatory_interceptor_keys));
if(temp__9584__auto___824){
var unknown_keys_825 = temp__9584__auto___824;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: ->interceptor",m,"has unknown keys:",unknown_keys_825);
} else {
}
} else {
}

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",(-1388402092)),(function (){var or__10112__auto__ = id;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return new cljs.core.Keyword(null,"unnamed","unnamed",(-26044928));
}
})(),new cljs.core.Keyword(null,"before","before",(-1633692388)),before,new cljs.core.Keyword(null,"after","after",(594996914)),after], null);
}));

(re_frame.interceptor.__GT_interceptor.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.interceptor.__GT_interceptor.cljs$lang$applyTo = (function (seq817){
var self__12421__auto__ = this;
return self__12421__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq817));
}));

re_frame.interceptor.get_effect = (function re_frame$interceptor$get_effect(var_args){
var G__827 = arguments.length;
switch (G__827) {
case (1):
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$1 = (function (context){
return new cljs.core.Keyword(null,"effects","effects",(-282369292)).cljs$core$IFn$_invoke$arity$1(context);
}));

(re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$2 = (function (context,key){
return cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),key], null));
}));

(re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$3 = (function (context,key,not_found){
return cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),key], null),not_found);
}));

(re_frame.interceptor.get_effect.cljs$lang$maxFixedArity = (3));

re_frame.interceptor.assoc_effect = (function re_frame$interceptor$assoc_effect(context,key,value){
return cljs.core.assoc_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),key], null),value);
});
re_frame.interceptor.update_effect = (function re_frame$interceptor$update_effect(var_args){
var args__12462__auto__ = [];
var len__12445__auto___833 = arguments.length;
var i__12446__auto___834 = (0);
while(true){
if((i__12446__auto___834 < len__12445__auto___833)){
args__12462__auto__.push((arguments[i__12446__auto___834]));

var G__835 = (i__12446__auto___834 + (1));
i__12446__auto___834 = G__835;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((3) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((3)),(0),null)):null);
return re_frame.interceptor.update_effect.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12463__auto__);
});

(re_frame.interceptor.update_effect.cljs$core$IFn$_invoke$arity$variadic = (function (context,key,f,args){
return cljs.core.apply.call(null,cljs.core.update_in,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",(-282369292)),key], null),f,args);
}));

(re_frame.interceptor.update_effect.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(re_frame.interceptor.update_effect.cljs$lang$applyTo = (function (seq829){
var G__830 = cljs.core.first.call(null,seq829);
var seq829__$1 = cljs.core.next.call(null,seq829);
var G__831 = cljs.core.first.call(null,seq829__$1);
var seq829__$2 = cljs.core.next.call(null,seq829__$1);
var G__832 = cljs.core.first.call(null,seq829__$2);
var seq829__$3 = cljs.core.next.call(null,seq829__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__830,G__831,G__832,seq829__$3);
}));

re_frame.interceptor.get_coeffect = (function re_frame$interceptor$get_coeffect(var_args){
var G__837 = arguments.length;
switch (G__837) {
case (1):
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$1 = (function (context){
return new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)).cljs$core$IFn$_invoke$arity$1(context);
}));

(re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$2 = (function (context,key){
return cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),key], null));
}));

(re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$3 = (function (context,key,not_found){
return cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),key], null),not_found);
}));

(re_frame.interceptor.get_coeffect.cljs$lang$maxFixedArity = (3));

re_frame.interceptor.assoc_coeffect = (function re_frame$interceptor$assoc_coeffect(context,key,value){
return cljs.core.assoc_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),key], null),value);
});
re_frame.interceptor.update_coeffect = (function re_frame$interceptor$update_coeffect(var_args){
var args__12462__auto__ = [];
var len__12445__auto___843 = arguments.length;
var i__12446__auto___844 = (0);
while(true){
if((i__12446__auto___844 < len__12445__auto___843)){
args__12462__auto__.push((arguments[i__12446__auto___844]));

var G__845 = (i__12446__auto___844 + (1));
i__12446__auto___844 = G__845;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((3) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((3)),(0),null)):null);
return re_frame.interceptor.update_coeffect.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12463__auto__);
});

(re_frame.interceptor.update_coeffect.cljs$core$IFn$_invoke$arity$variadic = (function (context,key,f,args){
return cljs.core.apply.call(null,cljs.core.update_in,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),key], null),f,args);
}));

(re_frame.interceptor.update_coeffect.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(re_frame.interceptor.update_coeffect.cljs$lang$applyTo = (function (seq839){
var G__840 = cljs.core.first.call(null,seq839);
var seq839__$1 = cljs.core.next.call(null,seq839);
var G__841 = cljs.core.first.call(null,seq839__$1);
var seq839__$2 = cljs.core.next.call(null,seq839__$1);
var G__842 = cljs.core.first.call(null,seq839__$2);
var seq839__$3 = cljs.core.next.call(null,seq839__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__840,G__841,G__842,seq839__$3);
}));

re_frame.interceptor.invoke_interceptor_fn = (function re_frame$interceptor$invoke_interceptor_fn(context,interceptor,direction){
var temp__9584__auto__ = cljs.core.get.call(null,interceptor,direction);
if(cljs.core.truth_(temp__9584__auto__)){
var f = temp__9584__auto__;
return f.call(null,context);
} else {
return context;
}
});
/**
 * Loop over all interceptors, calling `direction` function on each,
 *   threading the value of `context` through every call.
 * 
 *   `direction` is one of `:before` or `:after`.
 * 
 *   Each iteration, the next interceptor to process is obtained from
 *   context's `:queue`. After they are processed, interceptors are popped
 *   from `:queue` and added to `:stack`.
 * 
 *   After sufficient iteration, `:queue` will be empty, and `:stack` will
 *   contain all interceptors processed.
 * 
 *   Returns updated `context`. Ie. the `context` which has been threaded
 *   through all interceptor functions.
 * 
 *   Generally speaking, an interceptor's `:before` function will (if present)
 *   add to a `context's` `:coeffects`, while it's `:after` function
 *   will modify the `context`'s `:effects`.  Very approximately.
 * 
 *   But because all interceptor functions are given `context`, and can
 *   return a modified version of it, the way is clear for an interceptor
 *   to introspect the stack or queue, or even modify the queue
 *   (add new interceptors via `enqueue`?). This is a very fluid arrangement.
 */
re_frame.interceptor.invoke_interceptors = (function re_frame$interceptor$invoke_interceptors(context,direction){
var context__$1 = context;
while(true){
var queue = new cljs.core.Keyword(null,"queue","queue",(1455835879)).cljs$core$IFn$_invoke$arity$1(context__$1);
if(cljs.core.empty_QMARK_.call(null,queue)){
return context__$1;
} else {
var interceptor = cljs.core.peek.call(null,queue);
var stack = new cljs.core.Keyword(null,"stack","stack",(-793405930)).cljs$core$IFn$_invoke$arity$1(context__$1);
var G__846 = re_frame.interceptor.invoke_interceptor_fn.call(null,cljs.core.assoc.call(null,context__$1,new cljs.core.Keyword(null,"queue","queue",(1455835879)),cljs.core.pop.call(null,queue),new cljs.core.Keyword(null,"stack","stack",(-793405930)),cljs.core.conj.call(null,stack,interceptor)),interceptor,direction);
context__$1 = G__846;
continue;
}
break;
}
});
/**
 * Add a collection of `interceptors` to the end of `context's` execution `:queue`.
 *   Returns the updated `context`.
 * 
 *   In an advanced case, this function could allow an interceptor to add new
 *   interceptors to the `:queue` of a context.
 */
re_frame.interceptor.enqueue = (function re_frame$interceptor$enqueue(context,interceptors){
return cljs.core.update.call(null,context,new cljs.core.Keyword(null,"queue","queue",(1455835879)),cljs.core.fnil.call(null,cljs.core.into,re_frame.interop.empty_queue),interceptors);
});
/**
 * Create a fresh context
 */
re_frame.interceptor.context = (function re_frame$interceptor$context(var_args){
var G__848 = arguments.length;
switch (G__848) {
case (2):
return re_frame.interceptor.context.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return re_frame.interceptor.context.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.interceptor.context.cljs$core$IFn$_invoke$arity$2 = (function (event,interceptors){
return re_frame.interceptor.enqueue.call(null,re_frame.interceptor.assoc_coeffect.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"event","event",(301435442)),event),interceptors);
}));

(re_frame.interceptor.context.cljs$core$IFn$_invoke$arity$3 = (function (event,interceptors,db){
return re_frame.interceptor.assoc_coeffect.call(null,re_frame.interceptor.context.call(null,event,interceptors),new cljs.core.Keyword(null,"db","db",(993250759)),db);
}));

(re_frame.interceptor.context.cljs$lang$maxFixedArity = (3));

/**
 * Called on completion of `:before` processing, this function prepares/modifies
 * `context` for the backwards sweep of processing in which an interceptor
 * chain's `:after` fns are called.
 * 
 *   At this point in processing, the `:queue` is empty and `:stack` holds all
 *   the previously run interceptors. So this function enables the backwards walk
 *   by priming `:queue` with what's currently in `:stack`
 */
re_frame.interceptor.change_direction = (function re_frame$interceptor$change_direction(context){
return re_frame.interceptor.enqueue.call(null,cljs.core.dissoc.call(null,context,new cljs.core.Keyword(null,"queue","queue",(1455835879))),new cljs.core.Keyword(null,"stack","stack",(-793405930)).cljs$core$IFn$_invoke$arity$1(context));
});
/**
 * Executes the given chain (coll) of interceptors.
 * 
 * Each interceptor has this form:
 *     {:before  (fn [context] ...)     ;; returns possibly modified context
 *      :after   (fn [context] ...)}    ;; `identity` would be a noop
 * 
 * Walks the queue of iterceptors from beginning to end, calling the
 * `:before` fn on each, then reverse direction and walk backwards,
 * calling the `:after` fn on each.
 * 
 * The last interceptor in the chain presumably wraps an event
 * handler fn. So the overall goal of the process is to "handle
 * the given event".
 * 
 * Thread a `context` through all calls. `context` has this form:
 * 
 *   {:coeffects {:event [:a-query-id :some-param]
 *                :db    <original contents of app-db>}
 *    :effects   {:db    <new value for app-db>
 *                :dispatch  [:an-event-id :param1]}
 *    :queue     <a collection of further interceptors>
 *    :stack     <a collection of interceptors already walked>}
 * 
 * `context` has `:coeffects` and `:effects` which, if this was a web
 * server, would be somewhat anologous to `request` and `response`
 * respectively.
 * 
 * `coeffects` will contain data like `event` and the initial
 * state of `db` -  the inputs required by the event handler
 * (sitting presumably on the end of the chain), while handler-returned
 * side effects are put into `:effects` including, but not limited to,
 * new values for `db`.
 * 
 * The first few interceptors in a chain will likely have `:before`
 * functions which "prime" the `context` by adding the event, and
 * the current state of app-db into `:coeffects`. But interceptors can
 * add whatever they want to `:coeffects` - perhaps the event handler needs
 * some information from localstore, or a random number, or access to
 * a DataScript connection.
 * 
 * Equally, some interceptors in the chain will have `:after` fn
 * which can process the side effects accumulated into `:effects`
 * including but, not limited to, updates to app-db.
 * 
 * Through both stages (before and after), `context` contains a `:queue`
 * of interceptors yet to be processed, and a `:stack` of interceptors
 * already done.  In advanced cases, these values can be modified by the
 * functions through which the context is threaded.
 */
re_frame.interceptor.execute = (function re_frame$interceptor$execute(event_v,interceptors){
if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var new_trace__24__auto___850 = cljs.core.merge.call(null,cljs.core.update.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"tags","tags",(1771418977)),cljs.core.merge,new cljs.core.Keyword(null,"tags","tags",(1771418977)).cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"interceptors","interceptors",(-1546782951)),interceptors], null)], null))),cljs.core.dissoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",(1771418977)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"interceptors","interceptors",(-1546782951)),interceptors], null)], null),new cljs.core.Keyword(null,"tags","tags",(1771418977))));
(re_frame.trace._STAR_current_trace_STAR_ = new_trace__24__auto___850);

} else {
}

return re_frame.interceptor.invoke_interceptors.call(null,re_frame.interceptor.change_direction.call(null,re_frame.interceptor.invoke_interceptors.call(null,re_frame.interceptor.context.call(null,event_v,interceptors),new cljs.core.Keyword(null,"before","before",(-1633692388)))),new cljs.core.Keyword(null,"after","after",(594996914)));
});

//# sourceURL=re_frame/interceptor.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzIjpbImludGVyY2VwdG9yLmNsanMiXSwibGluZUNvdW50IjozNzksIm1hcHBpbmdzIjoiO0FBUUEsa0RBQUEsaUZBQUEseURBQUEsNkRBQUEselBBQUtBO0FBRUwsMENBQUEsMUNBQU1DLDRGQUNIQztBQURILEFBRUUsU0FBSyxBQUFDQywrQkFBS0QsUUFDTixBQUFDRSx5QkFBRUosZ0RBQTJCLHdCQUFBLHlCQUFJRSx6QkFBRUcseEJBQUtDOztBQUdoRCxBQUFBOzs7d0NBQUEsZ0RBQUFDLHhGQUFNSztBQUFOLEFBQUEsSUFBQUosc0JBQUE7QUFBQSxBQUFBLElBQUFDLHlCQUFBLEFBQUE7QUFBQSxBQUFBLElBQUFDLHVCQUFBOztBQUFBLEFBQUEsR0FBQSxDQUFBQSx1QkFBQUQ7QUFBQSxBQUFBLEFBQUFELHlCQUFBLENBQUEsVUFBQUU7O0FBQUEsYUFBQSxDQUFBQSx1QkFBQTs7OztBQUFBOzs7O0FBQUEsSUFBQUMsd0JBQUEsRUFBQSxDQUFBLE1BQUEsQUFBQUgsNkJBQUEsQUFBQSwwQkFBQSxBQUFBQSwwQkFBQSxLQUFBLElBQUEsT0FBQSwvREFrbEdzRGlGO0FBbGxHdEQsQUFBQSxPQUFBN0UsMkVBQUFEOzs7QUFBQSxBQUFBLENBQUEsNkVBQUEsV0FBQUUseEZBQU1EO0FBQU4sQUFBQSxJQUFBRSxXQUFBRDtJQUFBQyxlQUFBLEVBQUEsRUFBQSxHQUFBLENBQUFBLFlBQUEsU0FBQSxFQUFBLEVBQUEsQ0FBQSxBQUFBQSwrQ0FBQSxXQUFBLENBQUFDLGdDQUFBLEFBQUFELDZCQUFBLEtBQUEsT0FBQSxRQUFBLEFBQUFFLDBCQUFBQyxtQkFBQUgsVUFBQUE7UUFBQUEsSkFFVVo7U0FGVixBQUFBZ0Isd0JBQUFKLGFBQUEsMUNBRW1CUTthQUZuQixBQUFBSix3QkFBQUosYUFBQSw5Q0FFc0JTO1lBRnRCLEFBQUFMLHdCQUFBSixhQUFBLDdDQUU2QlU7QUFGN0IsQUFHRSxHQUFNQztBQUFOLEFBQ0Us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aURIQyxRQUFRWjtBQWpEWCxBQWtERSxHQUFBLEFBQUFhO0FBQUEsQUFBQSxJQUFBQyw0QkFBQSxBQUFBQywwQkFBQSxBQUFBZCwyQkFBQWUseUNBQUEsdURBQUFELGdCQUFBLEFBQUEscUZBQUEsMkNBQUEsdURBQUEsMkNBQUEsdUdBQUEsQUFBQUwsMkJBQUEsMkNBQUEsdURBQUEsMkNBQUEscUdBQUEsNVNBQ3dCViwrUUFBQUE7QUFEeEIsQUFBQSxDQUFBZ0IsMkNBQUFGOztBQUFBO0FBQUE7OzZKQUVJLEFBQUNSLHVDQUFRTSxRQUFRWixsR0FDakIsZ0hBQUEsaEhBQUNULGhEQUNEa0IsMURBQ0EsMERBQUEsOE5BQUEsalJBQUNsQiIsIm5hbWVzIjpbInJlLWZyYW1lLmludGVyY2VwdG9yL21hbmRhdG9yeS1pbnRlcmNlcHRvci1rZXlzIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvaW50ZXJjZXB0b3I/IiwibSIsImNsanMuY29yZS9tYXA/IiwiY2xqcy5jb3JlLz0iLCJjbGpzLmNvcmUva2V5cyIsImNsanMuY29yZS9zZXQiLCJ2YXJfYXJncyIsImFyZ3NfXzEyNDYyX19hdXRvX18iLCJsZW5fXzEyNDQ1X19hdXRvX18iLCJpX18xMjQ0Nl9fYXV0b19fIiwiYXJnc2VxX18xMjQ2M19fYXV0b19fIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvLT5pbnRlcmNlcHRvciIsInBfXzgxOCIsIm1hcF9fODE5IiwiY2xqcy5jb3JlL1BST1RPQ09MX1NFTlRJTkVMIiwiY2xqcy5jb3JlL2FwcGx5IiwiY2xqcy5jb3JlL2hhc2gtbWFwIiwiY2xqcy5jb3JlL2dldCIsInNlcTgxNyIsInNlbGZfXzEyNDIxX19hdXRvX18iLCJjbGpzLmNvcmUvc2VxIiwiaWQiLCJiZWZvcmUiLCJhZnRlciIsInJlLWZyYW1lLmludGVyb3AvZGVidWctZW5hYmxlZD8iLCJ0ZW1wX185NTg0X19hdXRvX18iLCJ1bmtub3duLWtleXMiLCJjbG9qdXJlLnNldC9kaWZmZXJlbmNlIiwicmUtZnJhbWUubG9nZ2Vycy9jb25zb2xlIiwib3JfXzEwMTEyX19hdXRvX18iLCJHX184MjciLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9nZXQtZWZmZWN0IiwianMvRXJyb3IiLCJjb250ZXh0Iiwia2V5IiwiY2xqcy5jb3JlL2dldC1pbiIsIm5vdC1mb3VuZCIsInJlLWZyYW1lLmludGVyY2VwdG9yL2Fzc29jLWVmZmVjdCIsInZhbHVlIiwiY2xqcy5jb3JlL2Fzc29jLWluIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvdXBkYXRlLWVmZmVjdCIsInNlcTgyOSIsIkdfXzgzMCIsIkdfXzgzMSIsIkdfXzgzMiIsInNlbGZfXzEyNDIwX19hdXRvX18iLCJmIiwiYXJncyIsImNsanMuY29yZS91cGRhdGUtaW4iLCJHX184MzciLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9nZXQtY29lZmZlY3QiLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9hc3NvYy1jb2VmZmVjdCIsInJlLWZyYW1lLmludGVyY2VwdG9yL3VwZGF0ZS1jb2VmZmVjdCIsInNlcTgzOSIsIkdfXzg0MCIsIkdfXzg0MSIsIkdfXzg0MiIsInJlLWZyYW1lLmludGVyY2VwdG9yL2ludm9rZS1pbnRlcmNlcHRvci1mbiIsImludGVyY2VwdG9yIiwiZGlyZWN0aW9uIiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvaW52b2tlLWludGVyY2VwdG9ycyIsInF1ZXVlIiwiY2xqcy5jb3JlL2VtcHR5PyIsImNsanMuY29yZS9wZWVrIiwic3RhY2siLCJjbGpzLmNvcmUvYXNzb2MiLCJjbGpzLmNvcmUvcG9wIiwiY2xqcy5jb3JlL2NvbmoiLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9lbnF1ZXVlIiwiaW50ZXJjZXB0b3JzIiwiY2xqcy5jb3JlL3VwZGF0ZSIsImNsanMuY29yZS9mbmlsIiwiY2xqcy5jb3JlL2ludG8iLCJyZS1mcmFtZS5pbnRlcm9wL2VtcHR5LXF1ZXVlIiwiR19fODQ4IiwicmUtZnJhbWUuaW50ZXJjZXB0b3IvY29udGV4dCIsImV2ZW50IiwiZGIiLCJyZS1mcmFtZS5pbnRlcmNlcHRvci9jaGFuZ2UtZGlyZWN0aW9uIiwiY2xqcy5jb3JlL2Rpc3NvYyIsInJlLWZyYW1lLmludGVyY2VwdG9yL2V4ZWN1dGUiLCJldmVudC12IiwicmUtZnJhbWUudHJhY2UvaXMtdHJhY2UtZW5hYmxlZD8iLCJuZXctdHJhY2VfXzI0X19hdXRvX18iLCJjbGpzLmNvcmUvbWVyZ2UiLCJyZS1mcmFtZS50cmFjZS8qY3VycmVudC10cmFjZSoiLCJjbGpzLmNvcmUvZmlyc3QiLCJjbGpzLmNvcmUvbmV4dCIsImNsanMuY29yZS9JbmRleGVkU2VxIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZS1mcmFtZS5pbnRlcmNlcHRvclxuICAoOnJlcXVpcmVcbiAgICBbcmUtZnJhbWUubG9nZ2VycyA6cmVmZXIgW2NvbnNvbGVdXVxuICAgIFtyZS1mcmFtZS5pbnRlcm9wIDpyZWZlciBbZW1wdHktcXVldWUgZGVidWctZW5hYmxlZD9dXVxuICAgIFtyZS1mcmFtZS50cmFjZSA6YXMgdHJhY2UgOmluY2x1ZGUtbWFjcm9zIHRydWVdXG4gICAgW2Nsb2p1cmUuc2V0IDphcyBzZXRdKSlcblxuXG4oZGVmIG1hbmRhdG9yeS1pbnRlcmNlcHRvci1rZXlzICN7OmlkIDphZnRlciA6YmVmb3JlfSlcblxuKGRlZm4gaW50ZXJjZXB0b3I/XG4gIFttXVxuICAoYW5kIChtYXA/IG0pXG4gICAgICAgKD0gbWFuZGF0b3J5LWludGVyY2VwdG9yLWtleXMgKC0+IG0ga2V5cyBzZXQpKSkpXG5cblxuKGRlZm4gLT5pbnRlcmNlcHRvclxuICBcIkNyZWF0ZSBhbiBpbnRlcmNlcHRvciBmcm9tIG5hbWVkIGFyZ3VtZW50c1wiXG4gIFsmIHs6YXMgbSA6a2V5cyBbaWQgYmVmb3JlIGFmdGVyXX1dXG4gICh3aGVuIGRlYnVnLWVuYWJsZWQ/XG4gICAgKGlmLWxldCBbdW5rbm93bi1rZXlzIChzZXEgKHNldC9kaWZmZXJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgtPiBtIGtleXMgc2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5kYXRvcnktaW50ZXJjZXB0b3Ita2V5cykpXVxuICAgICAgKGNvbnNvbGUgOmVycm9yIFwicmUtZnJhbWU6IC0+aW50ZXJjZXB0b3JcIiBtIFwiaGFzIHVua25vd24ga2V5czpcIiB1bmtub3duLWtleXMpKSlcbiAgezppZCAgICAgKG9yIGlkIDp1bm5hbWVkKVxuICAgOmJlZm9yZSBiZWZvcmVcbiAgIDphZnRlciAgYWZ0ZXIgfSlcblxuOzsgLS0gRWZmZWN0IEhlbHBlcnMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbihkZWZuIGdldC1lZmZlY3RcbiAgKFtjb250ZXh0XVxuICAgKDplZmZlY3RzIGNvbnRleHQpKVxuICAoW2NvbnRleHQga2V5XVxuICAgKGdldC1pbiBjb250ZXh0IFs6ZWZmZWN0cyBrZXldKSlcbiAgKFtjb250ZXh0IGtleSBub3QtZm91bmRdXG4gICAoZ2V0LWluIGNvbnRleHQgWzplZmZlY3RzIGtleV0gbm90LWZvdW5kKSkpXG5cbihkZWZuIGFzc29jLWVmZmVjdFxuICBbY29udGV4dCBrZXkgdmFsdWVdXG4gIChhc3NvYy1pbiBjb250ZXh0IFs6ZWZmZWN0cyBrZXldIHZhbHVlKSlcblxuKGRlZm4gdXBkYXRlLWVmZmVjdFxuICBbY29udGV4dCBrZXkgZiAmIGFyZ3NdXG4gIChhcHBseSB1cGRhdGUtaW4gY29udGV4dCBbOmVmZmVjdHMga2V5XSBmIGFyZ3MpKVxuXG47OyAtLSBDb0VmZmVjdCBIZWxwZXJzICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuKGRlZm4gZ2V0LWNvZWZmZWN0XG4gIChbY29udGV4dF1cbiAgICg6Y29lZmZlY3RzIGNvbnRleHQpKVxuICAoW2NvbnRleHQga2V5XVxuICAgKGdldC1pbiBjb250ZXh0IFs6Y29lZmZlY3RzIGtleV0pKVxuICAoW2NvbnRleHQga2V5IG5vdC1mb3VuZF1cbiAgIChnZXQtaW4gY29udGV4dCBbOmNvZWZmZWN0cyBrZXldIG5vdC1mb3VuZCkpKVxuXG4oZGVmbiBhc3NvYy1jb2VmZmVjdFxuICBbY29udGV4dCBrZXkgdmFsdWVdXG4gIChhc3NvYy1pbiBjb250ZXh0IFs6Y29lZmZlY3RzIGtleV0gdmFsdWUpKVxuXG4oZGVmbiB1cGRhdGUtY29lZmZlY3RcbiAgW2NvbnRleHQga2V5IGYgJiBhcmdzXVxuICAoYXBwbHkgdXBkYXRlLWluIGNvbnRleHQgWzpjb2VmZmVjdHMga2V5XSBmIGFyZ3MpKVxuXG47OyAtLSBFeGVjdXRlIEludGVyY2VwdG9yIENoYWluICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4oZGVmbi0gaW52b2tlLWludGVyY2VwdG9yLWZuXG4gIFtjb250ZXh0IGludGVyY2VwdG9yIGRpcmVjdGlvbl1cbiAgKGlmLWxldCBbZiAoZ2V0IGludGVyY2VwdG9yIGRpcmVjdGlvbildXG4gICAgKGYgY29udGV4dClcbiAgICBjb250ZXh0KSlcblxuXG4oZGVmbi0gaW52b2tlLWludGVyY2VwdG9yc1xuICBcIkxvb3Agb3ZlciBhbGwgaW50ZXJjZXB0b3JzLCBjYWxsaW5nIGBkaXJlY3Rpb25gIGZ1bmN0aW9uIG9uIGVhY2gsXG4gIHRocmVhZGluZyB0aGUgdmFsdWUgb2YgYGNvbnRleHRgIHRocm91Z2ggZXZlcnkgY2FsbC5cblxuICBgZGlyZWN0aW9uYCBpcyBvbmUgb2YgYDpiZWZvcmVgIG9yIGA6YWZ0ZXJgLlxuXG4gIEVhY2ggaXRlcmF0aW9uLCB0aGUgbmV4dCBpbnRlcmNlcHRvciB0byBwcm9jZXNzIGlzIG9idGFpbmVkIGZyb21cbiAgY29udGV4dCdzIGA6cXVldWVgLiBBZnRlciB0aGV5IGFyZSBwcm9jZXNzZWQsIGludGVyY2VwdG9ycyBhcmUgcG9wcGVkXG4gIGZyb20gYDpxdWV1ZWAgYW5kIGFkZGVkIHRvIGA6c3RhY2tgLlxuXG4gIEFmdGVyIHN1ZmZpY2llbnQgaXRlcmF0aW9uLCBgOnF1ZXVlYCB3aWxsIGJlIGVtcHR5LCBhbmQgYDpzdGFja2Agd2lsbFxuICBjb250YWluIGFsbCBpbnRlcmNlcHRvcnMgcHJvY2Vzc2VkLlxuXG4gIFJldHVybnMgdXBkYXRlZCBgY29udGV4dGAuIEllLiB0aGUgYGNvbnRleHRgIHdoaWNoIGhhcyBiZWVuIHRocmVhZGVkXG4gIHRocm91Z2ggYWxsIGludGVyY2VwdG9yIGZ1bmN0aW9ucy5cblxuICBHZW5lcmFsbHkgc3BlYWtpbmcsIGFuIGludGVyY2VwdG9yJ3MgYDpiZWZvcmVgIGZ1bmN0aW9uIHdpbGwgKGlmIHByZXNlbnQpXG4gIGFkZCB0byBhIGBjb250ZXh0J3NgIGA6Y29lZmZlY3RzYCwgd2hpbGUgaXQncyBgOmFmdGVyYCBmdW5jdGlvblxuICB3aWxsIG1vZGlmeSB0aGUgYGNvbnRleHRgJ3MgYDplZmZlY3RzYC4gIFZlcnkgYXBwcm94aW1hdGVseS5cblxuICBCdXQgYmVjYXVzZSBhbGwgaW50ZXJjZXB0b3IgZnVuY3Rpb25zIGFyZSBnaXZlbiBgY29udGV4dGAsIGFuZCBjYW5cbiAgcmV0dXJuIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiBpdCwgdGhlIHdheSBpcyBjbGVhciBmb3IgYW4gaW50ZXJjZXB0b3JcbiAgdG8gaW50cm9zcGVjdCB0aGUgc3RhY2sgb3IgcXVldWUsIG9yIGV2ZW4gbW9kaWZ5IHRoZSBxdWV1ZVxuICAoYWRkIG5ldyBpbnRlcmNlcHRvcnMgdmlhIGBlbnF1ZXVlYD8pLiBUaGlzIGlzIGEgdmVyeSBmbHVpZCBhcnJhbmdlbWVudC5cIlxuICAoW2NvbnRleHQgZGlyZWN0aW9uXVxuICAgKGxvb3AgW2NvbnRleHQgY29udGV4dF1cbiAgICAgKGxldCBbcXVldWUgKDpxdWV1ZSBjb250ZXh0KV0gICAgICAgIDs7IGZ1dHVyZSBpbnRlcmNlcHRvcnNcbiAgICAgICAoaWYgKGVtcHR5PyBxdWV1ZSlcbiAgICAgICAgIGNvbnRleHRcbiAgICAgICAgIChsZXQgW2ludGVyY2VwdG9yIChwZWVrIHF1ZXVlKSAgIDs7IG5leHQgaW50ZXJjZXB0b3IgdG8gY2FsbFxuICAgICAgICAgICAgICAgc3RhY2sgKDpzdGFjayBjb250ZXh0KV0gICAgOzsgYWxyZWFkeSBjb21wbGV0ZWQgaW50ZXJjZXB0b3JzXG4gICAgICAgICAgIChyZWN1ciAoLT4gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgIChhc3NvYyA6cXVldWUgKHBvcCBxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnN0YWNrIChjb25qIHN0YWNrIGludGVyY2VwdG9yKSlcbiAgICAgICAgICAgICAgICAgICAgICAoaW52b2tlLWludGVyY2VwdG9yLWZuIGludGVyY2VwdG9yIGRpcmVjdGlvbikpKSkpKSkpKVxuXG5cbihkZWZuIGVucXVldWVcbiAgXCJBZGQgYSBjb2xsZWN0aW9uIG9mIGBpbnRlcmNlcHRvcnNgIHRvIHRoZSBlbmQgb2YgYGNvbnRleHQnc2AgZXhlY3V0aW9uIGA6cXVldWVgLlxuICBSZXR1cm5zIHRoZSB1cGRhdGVkIGBjb250ZXh0YC5cblxuICBJbiBhbiBhZHZhbmNlZCBjYXNlLCB0aGlzIGZ1bmN0aW9uIGNvdWxkIGFsbG93IGFuIGludGVyY2VwdG9yIHRvIGFkZCBuZXdcbiAgaW50ZXJjZXB0b3JzIHRvIHRoZSBgOnF1ZXVlYCBvZiBhIGNvbnRleHQuXCJcbiAgW2NvbnRleHQgaW50ZXJjZXB0b3JzXVxuICAodXBkYXRlIGNvbnRleHQgOnF1ZXVlXG4gICAgICAgICAgKGZuaWwgaW50byBlbXB0eS1xdWV1ZSlcbiAgICAgICAgICBpbnRlcmNlcHRvcnMpKVxuXG5cbihkZWZuLSBjb250ZXh0XG4gIFwiQ3JlYXRlIGEgZnJlc2ggY29udGV4dFwiXG4gIChbZXZlbnQgaW50ZXJjZXB0b3JzXVxuICAoLT4ge31cbiAgICAgIChhc3NvYy1jb2VmZmVjdCA6ZXZlbnQgZXZlbnQpXG4gICAgICAoZW5xdWV1ZSBpbnRlcmNlcHRvcnMpKSlcbiAgKFtldmVudCBpbnRlcmNlcHRvcnMgZGJdICAgICAgOzsgb25seSB1c2VkIGluIHRlc3RzLCBwcm9iYWJseSBhIGhhY2ssIHJlbW92ZSA/ICBYWFhcbiAgICgtPiAoY29udGV4dCBldmVudCBpbnRlcmNlcHRvcnMpXG4gICAgICAgKGFzc29jLWNvZWZmZWN0IDpkYiBkYikpKSlcblxuXG4oZGVmbi0gY2hhbmdlLWRpcmVjdGlvblxuICBcIkNhbGxlZCBvbiBjb21wbGV0aW9uIG9mIGA6YmVmb3JlYCBwcm9jZXNzaW5nLCB0aGlzIGZ1bmN0aW9uIHByZXBhcmVzL21vZGlmaWVzXG4gICBgY29udGV4dGAgZm9yIHRoZSBiYWNrd2FyZHMgc3dlZXAgb2YgcHJvY2Vzc2luZyBpbiB3aGljaCBhbiBpbnRlcmNlcHRvclxuICAgY2hhaW4ncyBgOmFmdGVyYCBmbnMgYXJlIGNhbGxlZC5cblxuICBBdCB0aGlzIHBvaW50IGluIHByb2Nlc3NpbmcsIHRoZSBgOnF1ZXVlYCBpcyBlbXB0eSBhbmQgYDpzdGFja2AgaG9sZHMgYWxsXG4gIHRoZSBwcmV2aW91c2x5IHJ1biBpbnRlcmNlcHRvcnMuIFNvIHRoaXMgZnVuY3Rpb24gZW5hYmxlcyB0aGUgYmFja3dhcmRzIHdhbGtcbiAgYnkgcHJpbWluZyBgOnF1ZXVlYCB3aXRoIHdoYXQncyBjdXJyZW50bHkgaW4gYDpzdGFja2BcIlxuICBbY29udGV4dF1cbiAgKC0+IGNvbnRleHRcbiAgICAgIChkaXNzb2MgOnF1ZXVlKVxuICAgICAgKGVucXVldWUgKDpzdGFjayBjb250ZXh0KSkpKVxuXG5cbihkZWZuIGV4ZWN1dGVcbiAgXCJFeGVjdXRlcyB0aGUgZ2l2ZW4gY2hhaW4gKGNvbGwpIG9mIGludGVyY2VwdG9ycy5cblxuICAgRWFjaCBpbnRlcmNlcHRvciBoYXMgdGhpcyBmb3JtOlxuICAgICAgIHs6YmVmb3JlICAoZm4gW2NvbnRleHRdIC4uLikgICAgIDs7IHJldHVybnMgcG9zc2libHkgbW9kaWZpZWQgY29udGV4dFxuICAgICAgICA6YWZ0ZXIgICAoZm4gW2NvbnRleHRdIC4uLil9ICAgIDs7IGBpZGVudGl0eWAgd291bGQgYmUgYSBub29wXG5cbiAgIFdhbGtzIHRoZSBxdWV1ZSBvZiBpdGVyY2VwdG9ycyBmcm9tIGJlZ2lubmluZyB0byBlbmQsIGNhbGxpbmcgdGhlXG4gICBgOmJlZm9yZWAgZm4gb24gZWFjaCwgdGhlbiByZXZlcnNlIGRpcmVjdGlvbiBhbmQgd2FsayBiYWNrd2FyZHMsXG4gICBjYWxsaW5nIHRoZSBgOmFmdGVyYCBmbiBvbiBlYWNoLlxuXG4gICBUaGUgbGFzdCBpbnRlcmNlcHRvciBpbiB0aGUgY2hhaW4gcHJlc3VtYWJseSB3cmFwcyBhbiBldmVudFxuICAgaGFuZGxlciBmbi4gU28gdGhlIG92ZXJhbGwgZ29hbCBvZiB0aGUgcHJvY2VzcyBpcyB0byBcXFwiaGFuZGxlXG4gICB0aGUgZ2l2ZW4gZXZlbnRcXFwiLlxuXG4gICBUaHJlYWQgYSBgY29udGV4dGAgdGhyb3VnaCBhbGwgY2FsbHMuIGBjb250ZXh0YCBoYXMgdGhpcyBmb3JtOlxuXG4gICAgIHs6Y29lZmZlY3RzIHs6ZXZlbnQgWzphLXF1ZXJ5LWlkIDpzb21lLXBhcmFtXVxuICAgICAgICAgICAgICAgICAgOmRiICAgIDxvcmlnaW5hbCBjb250ZW50cyBvZiBhcHAtZGI+fVxuICAgICAgOmVmZmVjdHMgICB7OmRiICAgIDxuZXcgdmFsdWUgZm9yIGFwcC1kYj5cbiAgICAgICAgICAgICAgICAgIDpkaXNwYXRjaCAgWzphbi1ldmVudC1pZCA6cGFyYW0xXX1cbiAgICAgIDpxdWV1ZSAgICAgPGEgY29sbGVjdGlvbiBvZiBmdXJ0aGVyIGludGVyY2VwdG9ycz5cbiAgICAgIDpzdGFjayAgICAgPGEgY29sbGVjdGlvbiBvZiBpbnRlcmNlcHRvcnMgYWxyZWFkeSB3YWxrZWQ+fVxuXG4gICBgY29udGV4dGAgaGFzIGA6Y29lZmZlY3RzYCBhbmQgYDplZmZlY3RzYCB3aGljaCwgaWYgdGhpcyB3YXMgYSB3ZWJcbiAgIHNlcnZlciwgd291bGQgYmUgc29tZXdoYXQgYW5vbG9nb3VzIHRvIGByZXF1ZXN0YCBhbmQgYHJlc3BvbnNlYFxuICAgcmVzcGVjdGl2ZWx5LlxuXG4gICBgY29lZmZlY3RzYCB3aWxsIGNvbnRhaW4gZGF0YSBsaWtlIGBldmVudGAgYW5kIHRoZSBpbml0aWFsXG4gICBzdGF0ZSBvZiBgZGJgIC0gIHRoZSBpbnB1dHMgcmVxdWlyZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgIChzaXR0aW5nIHByZXN1bWFibHkgb24gdGhlIGVuZCBvZiB0aGUgY2hhaW4pLCB3aGlsZSBoYW5kbGVyLXJldHVybmVkXG4gICBzaWRlIGVmZmVjdHMgYXJlIHB1dCBpbnRvIGA6ZWZmZWN0c2AgaW5jbHVkaW5nLCBidXQgbm90IGxpbWl0ZWQgdG8sXG4gICBuZXcgdmFsdWVzIGZvciBgZGJgLlxuXG4gICBUaGUgZmlyc3QgZmV3IGludGVyY2VwdG9ycyBpbiBhIGNoYWluIHdpbGwgbGlrZWx5IGhhdmUgYDpiZWZvcmVgXG4gICBmdW5jdGlvbnMgd2hpY2ggXFxcInByaW1lXFxcIiB0aGUgYGNvbnRleHRgIGJ5IGFkZGluZyB0aGUgZXZlbnQsIGFuZFxuICAgdGhlIGN1cnJlbnQgc3RhdGUgb2YgYXBwLWRiIGludG8gYDpjb2VmZmVjdHNgLiBCdXQgaW50ZXJjZXB0b3JzIGNhblxuICAgYWRkIHdoYXRldmVyIHRoZXkgd2FudCB0byBgOmNvZWZmZWN0c2AgLSBwZXJoYXBzIHRoZSBldmVudCBoYW5kbGVyIG5lZWRzXG4gICBzb21lIGluZm9ybWF0aW9uIGZyb20gbG9jYWxzdG9yZSwgb3IgYSByYW5kb20gbnVtYmVyLCBvciBhY2Nlc3MgdG9cbiAgIGEgRGF0YVNjcmlwdCBjb25uZWN0aW9uLlxuXG4gICBFcXVhbGx5LCBzb21lIGludGVyY2VwdG9ycyBpbiB0aGUgY2hhaW4gd2lsbCBoYXZlIGA6YWZ0ZXJgIGZuXG4gICB3aGljaCBjYW4gcHJvY2VzcyB0aGUgc2lkZSBlZmZlY3RzIGFjY3VtdWxhdGVkIGludG8gYDplZmZlY3RzYFxuICAgaW5jbHVkaW5nIGJ1dCwgbm90IGxpbWl0ZWQgdG8sIHVwZGF0ZXMgdG8gYXBwLWRiLlxuXG4gICBUaHJvdWdoIGJvdGggc3RhZ2VzIChiZWZvcmUgYW5kIGFmdGVyKSwgYGNvbnRleHRgIGNvbnRhaW5zIGEgYDpxdWV1ZWBcbiAgIG9mIGludGVyY2VwdG9ycyB5ZXQgdG8gYmUgcHJvY2Vzc2VkLCBhbmQgYSBgOnN0YWNrYCBvZiBpbnRlcmNlcHRvcnNcbiAgIGFscmVhZHkgZG9uZS4gIEluIGFkdmFuY2VkIGNhc2VzLCB0aGVzZSB2YWx1ZXMgY2FuIGJlIG1vZGlmaWVkIGJ5IHRoZVxuICAgZnVuY3Rpb25zIHRocm91Z2ggd2hpY2ggdGhlIGNvbnRleHQgaXMgdGhyZWFkZWQuXCJcbiAgW2V2ZW50LXYgaW50ZXJjZXB0b3JzXVxuICAodHJhY2UvbWVyZ2UtdHJhY2UhXG4gICAgezp0YWdzIHs6aW50ZXJjZXB0b3JzIGludGVyY2VwdG9yc319KVxuICAoLT4gKGNvbnRleHQgZXZlbnQtdiBpbnRlcmNlcHRvcnMpXG4gICAgICAoaW52b2tlLWludGVyY2VwdG9ycyA6YmVmb3JlKVxuICAgICAgY2hhbmdlLWRpcmVjdGlvblxuICAgICAgKGludm9rZS1pbnRlcmNlcHRvcnMgOmFmdGVyKSkpXG4iXX0=