// Compiled by ClojureScript 1.10.597
goog.provide("reagent.ratom");
if((typeof reagent !== 'undefined') && (typeof reagent.ratom !== 'undefined') && (typeof reagent.ratom.debug !== 'undefined')){
} else {
reagent.ratom.debug = false;
}
if((typeof reagent !== 'undefined') && (typeof reagent.ratom !== 'undefined') && (typeof reagent.ratom.generation !== 'undefined')){
} else {
reagent.ratom.generation = (0);
}
if((typeof reagent !== 'undefined') && (typeof reagent.ratom !== 'undefined') && (typeof reagent.ratom._running !== 'undefined')){
} else {
reagent.ratom._running = cljs.core.atom.call(null,(0));
}
reagent.ratom.reactive_QMARK_ = (function reagent$ratom$reactive_QMARK_(){
return (!((reagent.ratom._STAR_ratom_context_STAR_ == null)));
});
reagent.ratom.running = (function reagent$ratom$running(){
return cljs.core.deref.call(null,reagent.ratom._running);
});
reagent.ratom.arr_len = (function reagent$ratom$arr_len(x){
if((x == null)){
return (0);
} else {
return x.length;
}
});
reagent.ratom.arr_eq = (function reagent$ratom$arr_eq(x,y){
var len = reagent.ratom.arr_len.call(null,x);
if((len === reagent.ratom.arr_len.call(null,y))){
var i = (0);
while(true){
var or__10112__auto__ = (i === len);
if(or__10112__auto__){
return or__10112__auto__;
} else {
if(((x[i]) === (y[i]))){
var G__332 = (i + (1));
i = G__332;
continue;
} else {
return false;
}
}
break;
}
} else {
return false;
}
});
/**
 * When f is executed, if (f) derefs any ratoms, they are then added to 'obj.captured'(*ratom-context*).
 * 
 *   See function notify-deref-watcher! to know how *ratom-context* is updated
 */
reagent.ratom.in_context = (function reagent$ratom$in_context(obj,f){
var _STAR_ratom_context_STAR__orig_val__333 = reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__334 = obj;
(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__334);

try{return f.call(null);
}finally {(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__333);
}});
/**
 * Returns `(in-context f r)`.  Calls `_update-watching` on r with any
 *   `deref`ed atoms captured during `in-context`, if any differ from the
 *   `watching` field of r.  Clears the `dirty?` flag on r.
 * 
 *   Inside '_update-watching' along with adding the ratoms in 'r.watching' of reaction,
 *   the reaction is also added to the list of watches on each ratoms f derefs.
 */
reagent.ratom.deref_capture = (function reagent$ratom$deref_capture(f,r){
(r.captured = null);

(r.ratomGeneration = (reagent.ratom.generation = (reagent.ratom.generation + (1))));


var res = reagent.ratom.in_context.call(null,r,f);
var c = r.captured;
(r.dirty_QMARK_ = false);

if(reagent.ratom.arr_eq.call(null,c,r.watching)){
} else {
r._update_watching(c);
}

return res;
});
/**
 * Add `derefed` to the `captured` field of `*ratom-context*`.
 * 
 *   See also `in-context`
 */
reagent.ratom.notify_deref_watcher_BANG_ = (function reagent$ratom$notify_deref_watcher_BANG_(derefed){
var temp__9859__auto__ = reagent.ratom._STAR_ratom_context_STAR_;
if((temp__9859__auto__ == null)){
return null;
} else {
var r = temp__9859__auto__;
var c = r.captured;
if((c == null)){
return (r.captured = [derefed]);
} else {
return c.push(derefed);
}
}
});
reagent.ratom.check_watches = (function reagent$ratom$check_watches(old,new$){
if(reagent.ratom.debug){
cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core._PLUS_,(cljs.core.count.call(null,new$) - cljs.core.count.call(null,old)));
} else {
}

return new$;
});
reagent.ratom.add_w = (function reagent$ratom$add_w(this$,key,f){
var w = this$.watches;
(this$.watches = reagent.ratom.check_watches.call(null,w,cljs.core.assoc.call(null,w,key,f)));

return (this$.watchesArr = null);
});
reagent.ratom.remove_w = (function reagent$ratom$remove_w(this$,key){
var w = this$.watches;
(this$.watches = reagent.ratom.check_watches.call(null,w,cljs.core.dissoc.call(null,w,key)));

return (this$.watchesArr = null);
});
reagent.ratom.notify_w = (function reagent$ratom$notify_w(this$,old,new$){
var w = this$.watchesArr;
var a = (((w == null))?(this$.watchesArr = cljs.core.reduce_kv.call(null,(function (p1__17_SHARP_,p2__18_SHARP_,p3__19_SHARP_){
var G__335 = p1__17_SHARP_;
G__335.push(p2__18_SHARP_);

G__335.push(p3__19_SHARP_);

return G__335;
}),[],this$.watches)):w);
var len = a.length;
var i = (0);
while(true){
if((i < len)){
var k_336 = (a[i]);
var f_337 = (a[(i + (1))]);
f_337.call(null,k_336,this$,old,new$);

var G__338 = ((2) + i);
i = G__338;
continue;
} else {
return null;
}
break;
}
});
reagent.ratom.pr_atom = (function reagent$ratom$pr_atom(a,writer,opts,s){
cljs.core._write.call(null,writer,["#<",cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)," "].join(''));

cljs.core.pr_writer.call(null,(function (){var _STAR_ratom_context_STAR__orig_val__339 = reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__340 = null;
(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__340);

try{return cljs.core._deref.call(null,a);
}finally {(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__339);
}})(),writer,opts);

return cljs.core._write.call(null,writer,">");
});
if((typeof reagent !== 'undefined') && (typeof reagent.ratom !== 'undefined') && (typeof reagent.ratom.rea_queue !== 'undefined')){
} else {
reagent.ratom.rea_queue = null;
}
reagent.ratom.rea_enqueue = (function reagent$ratom$rea_enqueue(r){
if((reagent.ratom.rea_queue == null)){
(reagent.ratom.rea_queue = []);

reagent.impl.batching.schedule.call(null);
} else {
}

return reagent.ratom.rea_queue.push(r);
});
reagent.ratom.flush_BANG_ = (function reagent$ratom$flush_BANG_(){
while(true){
var q = reagent.ratom.rea_queue;
if((q == null)){
return null;
} else {
(reagent.ratom.rea_queue = null);

var n__12122__auto___341 = q.length;
var i_342 = (0);
while(true){
if((i_342 < n__12122__auto___341)){
(q[i_342])._queued_run();

var G__343 = (i_342 + (1));
i_342 = G__343;
continue;
} else {
}
break;
}

continue;
}
break;
}
});
(reagent.impl.batching.ratom_flush = reagent.ratom.flush_BANG_);

/**
 * @interface
 */
reagent.ratom.IReactiveAtom = function(){};


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {reagent.ratom.IReactiveAtom}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
*/
reagent.ratom.RAtom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = -2140766208;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(reagent.ratom.RAtom.prototype.reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.RAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return reagent.ratom.pr_atom.call(null,a__$1,w,opts,"Atom:");
}));

(reagent.ratom.RAtom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.meta;
}));

(reagent.ratom.RAtom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
}));

(reagent.ratom.RAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
}));

(reagent.ratom.RAtom.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,new_value){
var self__ = this;
var a__$1 = this;
if((self__.validator == null)){
} else {
if(cljs.core.truth_(self__.validator.call(null,new_value))){
} else {
throw (new Error(["Assert failed: ","Validator rejected reference state","\n","(validator new-value)"].join('')));
}
}

var old_value = self__.state;
(self__.state = new_value);

if((self__.watches == null)){
} else {
reagent.ratom.notify_w.call(null,a__$1,old_value,new_value);
}

return new_value;
}));

(reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state));
}));

(reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x));
}));

(reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x,y));
}));

(reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f,self__.state,x,y,more));
}));

(reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.notify_w.call(null,this$__$1,old,new$);
}));

(reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.add_w.call(null,this$__$1,key,f);
}));

(reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.remove_w.call(null,this$__$1,key);
}));

(reagent.ratom.RAtom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_,new_meta){
var self__ = this;
var ___$1 = this;
return (new reagent.ratom.RAtom(self__.state,new_meta,self__.validator,self__.watches));
}));

(reagent.ratom.RAtom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
reagent.ratom.notify_deref_watcher_BANG_.call(null,this$__$1);

return self__.state;
}));

(reagent.ratom.RAtom.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",(-348086572),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),new cljs.core.Symbol(null,"meta","meta",(-1154898805),null),new cljs.core.Symbol(null,"validator","validator",(-325659154),null),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",(1367433992),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.ratom.RAtom.cljs$lang$type = true);

(reagent.ratom.RAtom.cljs$lang$ctorStr = "reagent.ratom/RAtom");

(reagent.ratom.RAtom.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.ratom/RAtom");
}));

/**
 * Positional factory function for reagent.ratom/RAtom.
 */
reagent.ratom.__GT_RAtom = (function reagent$ratom$__GT_RAtom(state,meta,validator,watches){
return (new reagent.ratom.RAtom(state,meta,validator,watches));
});

/**
 * Like clojure.core/atom, except that it keeps track of derefs.
 */
reagent.ratom.atom = (function reagent$ratom$atom(var_args){
var G__347 = arguments.length;
switch (G__347) {
case (1):
return reagent.ratom.atom.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___352 = arguments.length;
var i__12446__auto___353 = (0);
while(true){
if((i__12446__auto___353 < len__12445__auto___352)){
args_arr__12515__auto__.push((arguments[i__12446__auto___353]));

var G__354 = (i__12446__auto___353 + (1));
i__12446__auto___353 = G__354;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((1)),(0),null));
return reagent.ratom.atom.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12516__auto__);

}
});

(reagent.ratom.atom.cljs$core$IFn$_invoke$arity$1 = (function (x){
return reagent.ratom.__GT_RAtom.call(null,x,null,null,null);
}));

(reagent.ratom.atom.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__348){
var map__349 = p__348;
var map__349__$1 = (((((!((map__349 == null))))?(((((map__349.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__349.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__349):map__349);
var meta = cljs.core.get.call(null,map__349__$1,new cljs.core.Keyword(null,"meta","meta",(1499536964)));
var validator = cljs.core.get.call(null,map__349__$1,new cljs.core.Keyword(null,"validator","validator",(-1966190681)));
return reagent.ratom.__GT_RAtom.call(null,x,meta,validator,null);
}));

/** @this {Function} */
(reagent.ratom.atom.cljs$lang$applyTo = (function (seq345){
var G__346 = cljs.core.first.call(null,seq345);
var seq345__$1 = cljs.core.next.call(null,seq345);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__346,seq345__$1);
}));

(reagent.ratom.atom.cljs$lang$maxFixedArity = (1));

reagent.ratom.cached_reaction = (function reagent$ratom$cached_reaction(f,o,k,obj,destroy){
var m = o.reagReactionCache;
var m__$1 = (((m == null))?cljs.core.PersistentArrayMap.EMPTY:m);
var r = m__$1.call(null,k,null);
if((!((r == null)))){
return cljs.core._deref.call(null,r);
} else {
if((reagent.ratom._STAR_ratom_context_STAR_ == null)){
return f.call(null);
} else {
var r__$1 = reagent.ratom.make_reaction.call(null,f,new cljs.core.Keyword(null,"on-dispose","on-dispose",(2105306360)),(function (x){
if(reagent.ratom.debug){
cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core.dec);
} else {
}

var __355 = o.reagReactionCache;
var __356__$1 = cljs.core.dissoc.call(null,__355,k);
(o.reagReactionCache = __356__$1);

if((!((obj == null)))){
(obj.reaction = null);
} else {
}

if((!((destroy == null)))){
return destroy.call(null,x);
} else {
return null;
}
}));
var v = cljs.core._deref.call(null,r__$1);
(o.reagReactionCache = cljs.core.assoc.call(null,m__$1,k,r__$1));

if(reagent.ratom.debug){
cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core.inc);
} else {
}

if((!((obj == null)))){
(obj.reaction = r__$1);
} else {
}

return v;

}
}
});

/**
* @constructor
 * @implements {reagent.ratom.IReactiveAtom}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IPrintWithWriter}
*/
reagent.ratom.Track = (function (f,args,reaction){
this.f = f;
this.args = args;
this.reaction = reaction;
this.cljs$lang$protocol_mask$partition0$ = -2141159424;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(reagent.ratom.Track.prototype.reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.Track.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var temp__9814__auto__ = self__.reaction;
if((temp__9814__auto__ == null)){
return reagent.ratom.cached_reaction.call(null,(function (){
return cljs.core.apply.call(null,self__.f,self__.args);
}),self__.f,self__.args,this$__$1,null);
} else {
var r = temp__9814__auto__;
return cljs.core._deref.call(null,r);
}
}));

(reagent.ratom.Track.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof reagent.ratom.Track)) && (cljs.core._EQ_.call(null,self__.f,other.f)) && (cljs.core._EQ_.call(null,self__.args,other.args)));
}));

(reagent.ratom.Track.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.f,self__.args], null));
}));

(reagent.ratom.Track.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return reagent.ratom.pr_atom.call(null,a__$1,w,opts,"Track:");
}));

(reagent.ratom.Track.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null),cljs.core.with_meta(new cljs.core.Symbol(null,"reaction","reaction",(2131401315),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.ratom.Track.cljs$lang$type = true);

(reagent.ratom.Track.cljs$lang$ctorStr = "reagent.ratom/Track");

(reagent.ratom.Track.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.ratom/Track");
}));

/**
 * Positional factory function for reagent.ratom/Track.
 */
reagent.ratom.__GT_Track = (function reagent$ratom$__GT_Track(f,args,reaction){
return (new reagent.ratom.Track(f,args,reaction));
});

reagent.ratom.make_track = (function reagent$ratom$make_track(f,args){
return (new reagent.ratom.Track(f,args,null));
});
reagent.ratom.make_track_BANG_ = (function reagent$ratom$make_track_BANG_(f,args){
var t = reagent.ratom.make_track.call(null,f,args);
var r = reagent.ratom.make_reaction.call(null,(function (){
return cljs.core._deref.call(null,t);
}),new cljs.core.Keyword(null,"auto-run","auto-run",(1958400437)),true);
cljs.core.deref.call(null,r);

return r;
});
reagent.ratom.track = (function reagent$ratom$track(var_args){
var args__12462__auto__ = [];
var len__12445__auto___359 = arguments.length;
var i__12446__auto___360 = (0);
while(true){
if((i__12446__auto___360 < len__12445__auto___359)){
args__12462__auto__.push((arguments[i__12446__auto___360]));

var G__361 = (i__12446__auto___360 + (1));
i__12446__auto___360 = G__361;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.ratom.track.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.ratom.track.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return reagent.ratom.make_track.call(null,f,args);
}));

(reagent.ratom.track.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.ratom.track.cljs$lang$applyTo = (function (seq357){
var G__358 = cljs.core.first.call(null,seq357);
var seq357__$1 = cljs.core.next.call(null,seq357);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__358,seq357__$1);
}));

reagent.ratom.track_BANG_ = (function reagent$ratom$track_BANG_(var_args){
var args__12462__auto__ = [];
var len__12445__auto___364 = arguments.length;
var i__12446__auto___365 = (0);
while(true){
if((i__12446__auto___365 < len__12445__auto___364)){
args__12462__auto__.push((arguments[i__12446__auto___365]));

var G__366 = (i__12446__auto___365 + (1));
i__12446__auto___365 = G__366;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.ratom.track_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.ratom.track_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return reagent.ratom.make_track_BANG_.call(null,f,args);
}));

(reagent.ratom.track_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.ratom.track_BANG_.cljs$lang$applyTo = (function (seq362){
var G__363 = cljs.core.first.call(null,seq362);
var seq362__$1 = cljs.core.next.call(null,seq362);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__363,seq362__$1);
}));


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {reagent.ratom.IReactiveAtom}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {reagent.ratom.Object}
*/
reagent.ratom.RCursor = (function (ratom,path,reaction,state,watches){
this.ratom = ratom;
this.path = path;
this.reaction = reaction;
this.state = state;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = -2141159424;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(reagent.ratom.RCursor.prototype._peek = (function (){
var self__ = this;
var this$ = this;
var _STAR_ratom_context_STAR__orig_val__367 = reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__368 = null;
(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__368);

try{return cljs.core._deref.call(null,this$);
}finally {(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__367);
}}));

(reagent.ratom.RCursor.prototype._set_state = (function (oldstate,newstate){
var self__ = this;
var this$ = this;
if((oldstate === newstate)){
return null;
} else {
(self__.state = newstate);

if((!((self__.watches == null)))){
return reagent.ratom.notify_w.call(null,this$,oldstate,newstate);
} else {
return null;
}
}
}));

(reagent.ratom.RCursor.prototype.reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.RCursor.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return reagent.ratom.pr_atom.call(null,a__$1,w,opts,["Cursor: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.path)].join(''));
}));

(reagent.ratom.RCursor.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.ratom,self__.path], null));
}));

(reagent.ratom.RCursor.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof reagent.ratom.RCursor)) && (cljs.core._EQ_.call(null,self__.path,other.path)) && (cljs.core._EQ_.call(null,self__.ratom,other.ratom)));
}));

(reagent.ratom.RCursor.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,new_value){
var self__ = this;
var this$__$1 = this;
var oldstate = self__.state;
this$__$1._set_state(oldstate,new_value);

if((((!((self__.ratom == null))))?(((((self__.ratom.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === self__.ratom.cljs$core$IDeref$))))?true:(((!self__.ratom.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,self__.ratom):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,self__.ratom))){
if(cljs.core._EQ_.call(null,self__.path,cljs.core.PersistentVector.EMPTY)){
cljs.core.reset_BANG_.call(null,self__.ratom,new_value);
} else {
cljs.core.swap_BANG_.call(null,self__.ratom,cljs.core.assoc_in,self__.path,new_value);
}
} else {
self__.ratom.call(null,self__.path,new_value);
}

return new_value;
}));

(reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,a__$1._peek()));
}));

(reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,a__$1._peek(),x));
}));

(reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,a__$1._peek(),x,y));
}));

(reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f,a__$1._peek(),x,y,more));
}));

(reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.notify_w.call(null,this$__$1,old,new$);
}));

(reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.add_w.call(null,this$__$1,key,f);
}));

(reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.remove_w.call(null,this$__$1,key);
}));

(reagent.ratom.RCursor.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var oldstate = self__.state;
var newstate = (function (){var temp__9814__auto__ = self__.reaction;
if((temp__9814__auto__ == null)){
var f = (((((!((self__.ratom == null))))?(((((self__.ratom.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === self__.ratom.cljs$core$IDeref$))))?true:(((!self__.ratom.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,self__.ratom):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,self__.ratom)))?(function (){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,self__.ratom),self__.path);
}):(function (){
return self__.ratom.call(null,self__.path);
}));
return reagent.ratom.cached_reaction.call(null,f,self__.ratom,self__.path,this$__$1,null);
} else {
var r = temp__9814__auto__;
return cljs.core._deref.call(null,r);
}
})();
this$__$1._set_state(oldstate,newstate);

return newstate;
}));

(reagent.ratom.RCursor.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ratom","ratom",(1514010260),null),new cljs.core.Symbol(null,"path","path",(1452340359),null),cljs.core.with_meta(new cljs.core.Symbol(null,"reaction","reaction",(2131401315),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",(-348086572),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",(1367433992),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.ratom.RCursor.cljs$lang$type = true);

(reagent.ratom.RCursor.cljs$lang$ctorStr = "reagent.ratom/RCursor");

(reagent.ratom.RCursor.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.ratom/RCursor");
}));

/**
 * Positional factory function for reagent.ratom/RCursor.
 */
reagent.ratom.__GT_RCursor = (function reagent$ratom$__GT_RCursor(ratom,path,reaction,state,watches){
return (new reagent.ratom.RCursor(ratom,path,reaction,state,watches));
});

reagent.ratom.cursor = (function reagent$ratom$cursor(src,path){
if((function (){var or__10112__auto__ = (((!((src == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === src.reagent$ratom$IReactiveAtom$))))?true:(((!src.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_.call(null,reagent.ratom.IReactiveAtom,src):false)):cljs.core.native_satisfies_QMARK_.call(null,reagent.ratom.IReactiveAtom,src));
if(or__10112__auto__){
return or__10112__auto__;
} else {
return ((cljs.core.ifn_QMARK_.call(null,src)) && ((!(cljs.core.vector_QMARK_.call(null,src)))));
}
})()){
} else {
throw (new Error(["Assert failed: ",["src must be a reactive atom or a function, not ",cljs.core.pr_str.call(null,src)," while attempting to get path: ",cljs.core.pr_str.call(null,path)].join(''),"\n","(or (satisfies? IReactiveAtom src) (and (ifn? src) (not (vector? src))))"].join('')));
}

return reagent.ratom.__GT_RCursor.call(null,src,path,null,null,null);
});
reagent.ratom.with_let_destroy = (function reagent$ratom$with_let_destroy(v){
var temp__9859__auto__ = v.destroy;
if((temp__9859__auto__ == null)){
return null;
} else {
var f = temp__9859__auto__;
return f.call(null);
}
});
reagent.ratom.with_let_values = (function reagent$ratom$with_let_values(key){
var temp__9814__auto__ = reagent.ratom._STAR_ratom_context_STAR_;
if((temp__9814__auto__ == null)){
return [];
} else {
var c = temp__9814__auto__;
return reagent.ratom.cached_reaction.call(null,cljs.core.array,c,key,null,reagent.ratom.with_let_destroy);
}
});

/**
 * @interface
 */
reagent.ratom.IDisposable = function(){};

reagent.ratom.dispose_BANG_ = (function reagent$ratom$dispose_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1 == null)))))){
return this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (reagent.ratom.dispose_BANG_[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (reagent.ratom.dispose_BANG_["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IDisposable.dispose!",this$);
}
}
}
});

reagent.ratom.add_on_dispose_BANG_ = (function reagent$ratom$add_on_dispose_BANG_(this$,f){
if((((!((this$ == null)))) && ((!((this$.reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2 == null)))))){
return this$.reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2(this$,f);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (reagent.ratom.add_on_dispose_BANG_[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$,f);
} else {
var m__11271__auto__ = (reagent.ratom.add_on_dispose_BANG_["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$,f);
} else {
throw cljs.core.missing_protocol.call(null,"IDisposable.add-on-dispose!",this$);
}
}
}
});


/**
 * @interface
 */
reagent.ratom.IRunnable = function(){};

reagent.ratom.run = (function reagent$ratom$run(this$){
if((((!((this$ == null)))) && ((!((this$.reagent$ratom$IRunnable$run$arity$1 == null)))))){
return this$.reagent$ratom$IRunnable$run$arity$1(this$);
} else {
var x__11273__auto__ = (((this$ == null))?null:this$);
var m__11274__auto__ = (reagent.ratom.run[goog.typeOf(x__11273__auto__)]);
if((!((m__11274__auto__ == null)))){
return m__11274__auto__.call(null,this$);
} else {
var m__11271__auto__ = (reagent.ratom.run["_"]);
if((!((m__11271__auto__ == null)))){
return m__11271__auto__.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IRunnable.run",this$);
}
}
}
});

reagent.ratom.handle_reaction_change = (function reagent$ratom$handle_reaction_change(this$,sender,old,new$){
return this$._handle_change(sender,old,new$);
});

/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {reagent.ratom.IReactiveAtom}
 * @implements {reagent.ratom.IRunnable}
 * @implements {reagent.ratom.IDisposable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {reagent.ratom.Object}
*/
reagent.ratom.Reaction = (function (f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught){
this.f = f;
this.state = state;
this.dirty_QMARK_ = dirty_QMARK_;
this.nocache_QMARK_ = nocache_QMARK_;
this.watching = watching;
this.watches = watches;
this.auto_run = auto_run;
this.caught = caught;
this.cljs$lang$protocol_mask$partition0$ = -2141159424;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(reagent.ratom.Reaction.prototype._peek_at = (function (){
var self__ = this;
var this$ = this;
var _STAR_ratom_context_STAR__orig_val__373 = reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__374 = null;
(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__374);

try{return cljs.core._deref.call(null,this$);
}finally {(reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__373);
}}));

(reagent.ratom.Reaction.prototype._handle_change = (function (sender,oldval,newval){
var self__ = this;
var this$ = this;
if((((oldval === newval)) || (self__.dirty_QMARK_))){
return null;
} else {
if((self__.auto_run == null)){
(self__.dirty_QMARK_ = true);

return reagent.ratom.rea_enqueue.call(null,this$);
} else {
if(self__.auto_run === true){
return this$._run(false);
} else {
return self__.auto_run.call(null,this$);
}
}
}
}));

(reagent.ratom.Reaction.prototype._update_watching = (function (derefed){
var self__ = this;
var this$ = this;
var new$ = cljs.core.set.call(null,derefed);
var old = cljs.core.set.call(null,self__.watching);
(self__.watching = derefed);

var seq__375_391 = cljs.core.seq.call(null,clojure.set.difference.call(null,new$,old));
var chunk__376_392 = null;
var count__377_393 = (0);
var i__378_394 = (0);
while(true){
if((i__378_394 < count__377_393)){
var w_395 = cljs.core._nth.call(null,chunk__376_392,i__378_394);
cljs.core._add_watch.call(null,w_395,this$,reagent.ratom.handle_reaction_change);


var G__396 = seq__375_391;
var G__397 = chunk__376_392;
var G__398 = count__377_393;
var G__399 = (i__378_394 + (1));
seq__375_391 = G__396;
chunk__376_392 = G__397;
count__377_393 = G__398;
i__378_394 = G__399;
continue;
} else {
var temp__9646__auto___400 = cljs.core.seq.call(null,seq__375_391);
if(temp__9646__auto___400){
var seq__375_401__$1 = temp__9646__auto___400;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__375_401__$1)){
var c__11729__auto___402 = cljs.core.chunk_first.call(null,seq__375_401__$1);
var G__403 = cljs.core.chunk_rest.call(null,seq__375_401__$1);
var G__404 = c__11729__auto___402;
var G__405 = cljs.core.count.call(null,c__11729__auto___402);
var G__406 = (0);
seq__375_391 = G__403;
chunk__376_392 = G__404;
count__377_393 = G__405;
i__378_394 = G__406;
continue;
} else {
var w_407 = cljs.core.first.call(null,seq__375_401__$1);
cljs.core._add_watch.call(null,w_407,this$,reagent.ratom.handle_reaction_change);


var G__408 = cljs.core.next.call(null,seq__375_401__$1);
var G__409 = null;
var G__410 = (0);
var G__411 = (0);
seq__375_391 = G__408;
chunk__376_392 = G__409;
count__377_393 = G__410;
i__378_394 = G__411;
continue;
}
} else {
}
}
break;
}

var seq__379 = cljs.core.seq.call(null,clojure.set.difference.call(null,old,new$));
var chunk__380 = null;
var count__381 = (0);
var i__382 = (0);
while(true){
if((i__382 < count__381)){
var w = cljs.core._nth.call(null,chunk__380,i__382);
cljs.core._remove_watch.call(null,w,this$);


var G__412 = seq__379;
var G__413 = chunk__380;
var G__414 = count__381;
var G__415 = (i__382 + (1));
seq__379 = G__412;
chunk__380 = G__413;
count__381 = G__414;
i__382 = G__415;
continue;
} else {
var temp__9646__auto__ = cljs.core.seq.call(null,seq__379);
if(temp__9646__auto__){
var seq__379__$1 = temp__9646__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__379__$1)){
var c__11729__auto__ = cljs.core.chunk_first.call(null,seq__379__$1);
var G__416 = cljs.core.chunk_rest.call(null,seq__379__$1);
var G__417 = c__11729__auto__;
var G__418 = cljs.core.count.call(null,c__11729__auto__);
var G__419 = (0);
seq__379 = G__416;
chunk__380 = G__417;
count__381 = G__418;
i__382 = G__419;
continue;
} else {
var w = cljs.core.first.call(null,seq__379__$1);
cljs.core._remove_watch.call(null,w,this$);


var G__420 = cljs.core.next.call(null,seq__379__$1);
var G__421 = null;
var G__422 = (0);
var G__423 = (0);
seq__379 = G__420;
chunk__380 = G__421;
count__381 = G__422;
i__382 = G__423;
continue;
}
} else {
return null;
}
}
break;
}
}));

(reagent.ratom.Reaction.prototype._queued_run = (function (){
var self__ = this;
var this$ = this;
if(((self__.dirty_QMARK_) && ((!((self__.watching == null)))))){
return this$._run(true);
} else {
return null;
}
}));

(reagent.ratom.Reaction.prototype._try_capture = (function (f__$1){
var self__ = this;
var this$ = this;
try{(self__.caught = null);

return reagent.ratom.deref_capture.call(null,f__$1,this$);
}catch (e383){var e = e383;
(self__.state = e);

(self__.caught = e);

return (self__.dirty_QMARK_ = false);
}}));

(reagent.ratom.Reaction.prototype._run = (function (check){
var self__ = this;
var this$ = this;
var oldstate = self__.state;
var res = (cljs.core.truth_(check)?this$._try_capture(self__.f):reagent.ratom.deref_capture.call(null,self__.f,this$));
if(self__.nocache_QMARK_){
} else {
(self__.state = res);

if((((self__.watches == null)) || (cljs.core._EQ_.call(null,oldstate,res)))){
} else {
reagent.ratom.notify_w.call(null,this$,oldstate,res);
}
}

return res;
}));

(reagent.ratom.Reaction.prototype._set_opts = (function (p__384){
var self__ = this;
var map__385 = p__384;
var map__385__$1 = (((((!((map__385 == null))))?(((((map__385.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__385.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__385):map__385);
var auto_run__$1 = cljs.core.get.call(null,map__385__$1,new cljs.core.Keyword(null,"auto-run","auto-run",(1958400437)));
var on_set = cljs.core.get.call(null,map__385__$1,new cljs.core.Keyword(null,"on-set","on-set",(-140953470)));
var on_dispose = cljs.core.get.call(null,map__385__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",(2105306360)));
var no_cache = cljs.core.get.call(null,map__385__$1,new cljs.core.Keyword(null,"no-cache","no-cache",(1588056370)));
var this$ = this;
if((!((auto_run__$1 == null)))){
(this$.auto_run = auto_run__$1);
} else {
}

if((!((on_set == null)))){
(this$.on_set = on_set);
} else {
}

if((!((on_dispose == null)))){
(this$.on_dispose = on_dispose);
} else {
}

if((!((no_cache == null)))){
return (this$.nocache_QMARK_ = no_cache);
} else {
return null;
}
}));

(reagent.ratom.Reaction.prototype.reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.Reaction.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return reagent.ratom.pr_atom.call(null,a__$1,w,opts,["Reaction ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.hash.call(null,a__$1)),":"].join(''));
}));

(reagent.ratom.Reaction.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
}));

(reagent.ratom.Reaction.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
}));

(reagent.ratom.Reaction.prototype.reagent$ratom$IDisposable$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.Reaction.prototype.reagent$ratom$IDisposable$dispose_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var s = self__.state;
var wg = self__.watching;
(self__.watching = null);

(self__.state = null);

(self__.auto_run = null);

(self__.dirty_QMARK_ = true);

var seq__387_424 = cljs.core.seq.call(null,cljs.core.set.call(null,wg));
var chunk__388_425 = null;
var count__389_426 = (0);
var i__390_427 = (0);
while(true){
if((i__390_427 < count__389_426)){
var w_428 = cljs.core._nth.call(null,chunk__388_425,i__390_427);
cljs.core._remove_watch.call(null,w_428,this$__$1);


var G__429 = seq__387_424;
var G__430 = chunk__388_425;
var G__431 = count__389_426;
var G__432 = (i__390_427 + (1));
seq__387_424 = G__429;
chunk__388_425 = G__430;
count__389_426 = G__431;
i__390_427 = G__432;
continue;
} else {
var temp__9646__auto___433 = cljs.core.seq.call(null,seq__387_424);
if(temp__9646__auto___433){
var seq__387_434__$1 = temp__9646__auto___433;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__387_434__$1)){
var c__11729__auto___435 = cljs.core.chunk_first.call(null,seq__387_434__$1);
var G__436 = cljs.core.chunk_rest.call(null,seq__387_434__$1);
var G__437 = c__11729__auto___435;
var G__438 = cljs.core.count.call(null,c__11729__auto___435);
var G__439 = (0);
seq__387_424 = G__436;
chunk__388_425 = G__437;
count__389_426 = G__438;
i__390_427 = G__439;
continue;
} else {
var w_440 = cljs.core.first.call(null,seq__387_434__$1);
cljs.core._remove_watch.call(null,w_440,this$__$1);


var G__441 = cljs.core.next.call(null,seq__387_434__$1);
var G__442 = null;
var G__443 = (0);
var G__444 = (0);
seq__387_424 = G__441;
chunk__388_425 = G__442;
count__389_426 = G__443;
i__390_427 = G__444;
continue;
}
} else {
}
}
break;
}

if((!((this$__$1.on_dispose == null)))){
this$__$1.on_dispose(s);
} else {
}

var temp__9859__auto__ = this$__$1.on_dispose_arr;
if((temp__9859__auto__ == null)){
return null;
} else {
var a = temp__9859__auto__;
var n__12122__auto__ = a.length;
var i = (0);
while(true){
if((i < n__12122__auto__)){
(a[i]).call(null,this$__$1);

var G__445 = (i + (1));
i = G__445;
continue;
} else {
return null;
}
break;
}
}
}));

(reagent.ratom.Reaction.prototype.reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2 = (function (this$,f__$1){
var self__ = this;
var this$__$1 = this;
var temp__9814__auto__ = this$__$1.on_dispose_arr;
if((temp__9814__auto__ == null)){
return (this$__$1.on_dispose_arr = [f__$1]);
} else {
var a = temp__9814__auto__;
return a.push(f__$1);
}
}));

(reagent.ratom.Reaction.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,newval){
var self__ = this;
var a__$1 = this;
if(cljs.core.fn_QMARK_.call(null,a__$1.on_set)){
} else {
throw (new Error(["Assert failed: ","Reaction is read only; on-set is not allowed","\n","(fn? (.-on-set a))"].join('')));
}

var oldval = self__.state;
(self__.state = newval);

a__$1.on_set(oldval,newval);

reagent.ratom.notify_w.call(null,a__$1,oldval,newval);

return newval;
}));

(reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f__$1){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,a__$1._peek_at()));
}));

(reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f__$1,x){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,a__$1._peek_at(),x));
}));

(reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f__$1,x,y){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,a__$1._peek_at(),x,y));
}));

(reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f__$1,x,y,more){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f__$1,a__$1._peek_at(),x,y,more));
}));

(reagent.ratom.Reaction.prototype.reagent$ratom$IRunnable$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.ratom.Reaction.prototype.reagent$ratom$IRunnable$run$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
reagent.ratom.flush_BANG_.call(null);

return this$__$1._run(false);
}));

(reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.notify_w.call(null,this$__$1,old,new$);
}));

(reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f__$1){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.add_w.call(null,this$__$1,key,f__$1);
}));

(reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
var was_empty = cljs.core.empty_QMARK_.call(null,self__.watches);
reagent.ratom.remove_w.call(null,this$__$1,key);

if((((!(was_empty))) && (cljs.core.empty_QMARK_.call(null,self__.watches)) && ((self__.auto_run == null)))){
return reagent.ratom.dispose_BANG_.call(null,this$__$1);
} else {
return null;
}
}));

(reagent.ratom.Reaction.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var temp__9859__auto___446 = self__.caught;
if((temp__9859__auto___446 == null)){
} else {
var e_447 = temp__9859__auto___446;
throw e_447;
}

var non_reactive_448 = (reagent.ratom._STAR_ratom_context_STAR_ == null);
if(non_reactive_448){
reagent.ratom.flush_BANG_.call(null);
} else {
}

if(((non_reactive_448) && ((self__.auto_run == null)))){
if(self__.dirty_QMARK_){
var oldstate_449 = self__.state;
(self__.state = self__.f.call(null));

if((((self__.watches == null)) || (cljs.core._EQ_.call(null,oldstate_449,self__.state)))){
} else {
reagent.ratom.notify_w.call(null,this$__$1,oldstate_449,self__.state);
}
} else {
}
} else {
reagent.ratom.notify_deref_watcher_BANG_.call(null,this$__$1);

if(self__.dirty_QMARK_){
this$__$1._run(false);
} else {
}
}

return self__.state;
}));

(reagent.ratom.Reaction.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",(43394975),null),cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",(-348086572),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"dirty?","dirty?",(-419314319),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"boolean","boolean",(-278886877),null),new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"nocache?","nocache?",(-1065670978),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"boolean","boolean",(-278886877),null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watching","watching",(1947648227),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",(1367433992),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"auto-run","auto-run",(-696035332),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"caught","caught",(2084008322),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.ratom.Reaction.cljs$lang$type = true);

(reagent.ratom.Reaction.cljs$lang$ctorStr = "reagent.ratom/Reaction");

(reagent.ratom.Reaction.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.ratom/Reaction");
}));

/**
 * Positional factory function for reagent.ratom/Reaction.
 */
reagent.ratom.__GT_Reaction = (function reagent$ratom$__GT_Reaction(f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught){
return (new reagent.ratom.Reaction(f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught));
});

reagent.ratom.make_reaction = (function reagent$ratom$make_reaction(var_args){
var args__12462__auto__ = [];
var len__12445__auto___455 = arguments.length;
var i__12446__auto___456 = (0);
while(true){
if((i__12446__auto___456 < len__12445__auto___455)){
args__12462__auto__.push((arguments[i__12446__auto___456]));

var G__457 = (i__12446__auto___456 + (1));
i__12446__auto___456 = G__457;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$variadic = (function (f,p__452){
var map__453 = p__452;
var map__453__$1 = (((((!((map__453 == null))))?(((((map__453.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__453.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__453):map__453);
var auto_run = cljs.core.get.call(null,map__453__$1,new cljs.core.Keyword(null,"auto-run","auto-run",(1958400437)));
var on_set = cljs.core.get.call(null,map__453__$1,new cljs.core.Keyword(null,"on-set","on-set",(-140953470)));
var on_dispose = cljs.core.get.call(null,map__453__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",(2105306360)));
var reaction = reagent.ratom.__GT_Reaction.call(null,f,null,true,false,null,null,null,null);
reaction._set_opts(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"auto-run","auto-run",(1958400437)),auto_run,new cljs.core.Keyword(null,"on-set","on-set",(-140953470)),on_set,new cljs.core.Keyword(null,"on-dispose","on-dispose",(2105306360)),on_dispose], null));

return reaction;
}));

(reagent.ratom.make_reaction.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.ratom.make_reaction.cljs$lang$applyTo = (function (seq450){
var G__451 = cljs.core.first.call(null,seq450);
var seq450__$1 = cljs.core.next.call(null,seq450);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__451,seq450__$1);
}));

reagent.ratom.temp_reaction = reagent.ratom.make_reaction.call(null,null);
/**
 * Evaluates `f` and returns the result.  If `f` calls `deref` on any ratoms,
 * creates a new Reaction that watches those atoms and calls `run` whenever
 * any of those watched ratoms change.  Also, the new reaction is added to
 * list of 'watches' of each of the ratoms. The `run` parameter is a function
 * that should expect one argument.  It is passed `obj` when run.  The `opts`
 * are any options accepted by a Reaction and will be set on the newly created
 * Reaction. Sets the newly created Reaction to the `key` on `obj`.
 */
reagent.ratom.run_in_reaction = (function reagent$ratom$run_in_reaction(f,obj,key,run,opts){
var r = reagent.ratom.temp_reaction;
var res = reagent.ratom.deref_capture.call(null,f,r);
if((r.watching == null)){
} else {
(reagent.ratom.temp_reaction = reagent.ratom.make_reaction.call(null,null));

r._set_opts(opts);

(r.f = f);

(r.auto_run = (function (){
return run.call(null,obj);
}));

goog.object.set(obj,key,r);
}

return res;
});
reagent.ratom.check_derefs = (function reagent$ratom$check_derefs(f){
var ctx = ({});
var res = reagent.ratom.in_context.call(null,ctx,f);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [res,(!((ctx.captured == null)))], null);
});

/**
* @constructor
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IPrintWithWriter}
*/
reagent.ratom.Wrapper = (function (state,callback,changed,watches){
this.state = state;
this.callback = callback;
this.changed = changed;
this.watches = watches;
this.cljs$lang$protocol_mask$partition1$ = 114690;
this.cljs$lang$protocol_mask$partition0$ = -2145353728;
});
(reagent.ratom.Wrapper.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(((self__.changed) && ((!((reagent.ratom._STAR_ratom_context_STAR_ == null)))))){
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).warn(["Warning: ","derefing stale wrap: ",cljs.core.pr_str.call(null,this$__$1)].join(''));
} else {
}
} else {
}


return self__.state;
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,newval){
var self__ = this;
var this$__$1 = this;
var oldval = self__.state;
(self__.changed = true);

(self__.state = newval);

if((!((self__.watches == null)))){
reagent.ratom.notify_w.call(null,this$__$1,oldval,newval);
} else {
}

self__.callback.call(null,newval);

return newval;
}));

(reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state));
}));

(reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x));
}));

(reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x,y));
}));

(reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f,self__.state,x,y,more));
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof reagent.ratom.Wrapper)) && ((!(self__.changed))) && (cljs.core.not.call(null,other.changed)) && (cljs.core._EQ_.call(null,self__.state,other.state)) && (cljs.core._EQ_.call(null,self__.callback,other.callback)));
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.notify_w.call(null,this$__$1,old,new$);
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.add_w.call(null,this$__$1,key,f);
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return reagent.ratom.remove_w.call(null,this$__$1,key);
}));

(reagent.ratom.Wrapper.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return reagent.ratom.pr_atom.call(null,a__$1,w,opts,"Wrap:");
}));

(reagent.ratom.Wrapper.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",(-348086572),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),new cljs.core.Symbol(null,"callback","callback",(935395299),null),cljs.core.with_meta(new cljs.core.Symbol(null,"changed","changed",(-2083710852),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"boolean","boolean",(-278886877),null),new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",(1367433992),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.ratom.Wrapper.cljs$lang$type = true);

(reagent.ratom.Wrapper.cljs$lang$ctorStr = "reagent.ratom/Wrapper");

(reagent.ratom.Wrapper.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.ratom/Wrapper");
}));

/**
 * Positional factory function for reagent.ratom/Wrapper.
 */
reagent.ratom.__GT_Wrapper = (function reagent$ratom$__GT_Wrapper(state,callback,changed,watches){
return (new reagent.ratom.Wrapper(state,callback,changed,watches));
});

reagent.ratom.make_wrapper = (function reagent$ratom$make_wrapper(value,callback_fn,args){
return reagent.ratom.__GT_Wrapper.call(null,value,reagent.impl.util.make_partial_fn.call(null,callback_fn,args),false,null);
});

//# sourceURL=reagent/ratom.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9yYXRvbS5qcyIsInNvdXJjZXMiOlsicmF0b20uY2xqcyJdLCJsaW5lQ291bnQiOjE2MjEsIm1hcHBpbmdzIjoiO0FBU0EsQUFBQSxBQUNBLEdBQUEsUUFBQUEsb0NBQUFDLDBDQUFBQztBQUFBO0FBQUEsQUFBQSxzQkFBQSx0QkFBa0JDOztBQUNsQixHQUFBLFFBQUFILG9DQUFBQywwQ0FBQUc7QUFBQTtBQUFBLEFBQUEsMkJBQUEsM0JBQW1CQzs7QUFDbkIsR0FBQSxRQUFBTCxvQ0FBQUMsMENBQUFLO0FBQUE7QUFBQSxBQUFBLEFBQW1CQyx5QkFBUyx5QkFBQSx6QkFBQ0M7O0FBRTdCLGdDQUFBLGhDQUFlQztBQUFmLEFBQ0UsVUFBQSw0Q0FBQSwzQ0FBT0M7O0FBS1Qsd0JBQUEseEJBQU1DO0FBQU4sQUFDRSxPQUFBQywwQkFBSUw7O0FBRU4sd0JBQUEseEJBQWVNLHdEQUFTQztBQUF4QixBQUNFLEdBQUksTUFBQSxMQUFNQTtBQUFWOztBQUFlLE9BQVNBOzs7QUFFMUIsdUJBQUEsdkJBQWdCQyxzREFBUUQsRUFBRUU7QUFBMUIsQUFDRSxJQUFNQyxNQUFJLEFBQUNKLGdDQUFRQztBQUFuQixBQUNFLEdBQUssQ0FBSUcsUUFBSSxBQUFDSixnQ0FBUUc7QUFDakIsUUFBQSxKQUFPRTs7QUFBUCxBQUNFLElBQUFDLG9CQUFJLENBQUlELE1BQUVEO0FBQVYsQUFBQSxHQUFBRTtBQUFBQTs7QUFDSSxHQUFJLENBQVksQ0FBTUwsRUFBRUksUUFBRyxDQUFNRixFQUFFRTtBQUNqQyxhQUFPLEtBQUEsSkFBS0E7Ozs7QUFEZDs7Ozs7O0FBSFg7OztBQU9KOzs7OzsyQkFBQSwzQkFBT0UsOERBSUpDLElBQUlDO0FBSlAsQUFLRSxJQUFBQywwQ0FBVWI7SUFBVmMsMENBQTBCSDtBQUExQixBQUFBLDJDQUFBRywxQ0FBVWQ7O0FBQVYsSUFBQSxBQUNFLE9BQUNZO1VBREgsQUFBQSwyQ0FBQUMsMUNBQVViOztBQUdaOzs7Ozs7Ozs4QkFBQSw5QkFBT2Usb0VB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QUNsQ2xKO0FBRDVCLEFBQUEsWUFBQStJLHNCQUE0QmxKLE1BQU1vSixTQUE0QkMsUUFDbENsSjs7O0FBRG5CK0ksQUErQ1QsNkJBQUEsN0JBQU1PLGtFQUFjQyxNQUFNQyxZQUFZckg7QUFBdEMsQUFDRSxnSEFBQSxNQUFBLC9HQUFDNkcscUNBQVVPLE1BQ0EsQUFBQ0UsNENBQXFCRCxZQUFZckgiLCJuYW1lcyI6WyJqcy9yZWFnZW50IiwianMvcmVhZ2VudC5yYXRvbSIsImpzL3JlYWdlbnQucmF0b20uZGVidWciLCJyZWFnZW50LnJhdG9tL2RlYnVnIiwianMvcmVhZ2VudC5yYXRvbS5nZW5lcmF0aW9uIiwicmVhZ2VudC5yYXRvbS9nZW5lcmF0aW9uIiwianMvcmVhZ2VudC5yYXRvbS4tcnVubmluZyIsInJlYWdlbnQucmF0b20vLXJ1bm5pbmciLCJjbGpzLmNvcmUvYXRvbSIsInJlYWdlbnQucmF0b20vcmVhY3RpdmU/IiwicmVhZ2VudC5yYXRvbS8qcmF0b20tY29udGV4dCoiLCJyZWFnZW50LnJhdG9tL3J1bm5pbmciLCJjbGpzLmNvcmUvZGVyZWYiLCJyZWFnZW50LnJhdG9tL2Fyci1sZW4iLCJ4IiwicmVhZ2VudC5yYXRvbS9hcnItZXEiLCJ5IiwibGVuIiwiaSIsIm9yX18xMDExMl9fYXV0b19fIiwicmVhZ2VudC5yYXRvbS9pbi1jb250ZXh0Iiwib2JqIiwiZiIsIipyYXRvbS1jb250ZXh0Ki1vcmlnLXZhbF9fMzMzIiwiKnJhdG9tLWNvbnRleHQqLXRlbXAtdmFsX18zMzQiLCJyZWFnZW50LnJhdG9tL2RlcmVmLWNhcHR1cmUiLCJyIiwicmVzIiwiYyIsInJlYWdlbnQucmF0b20vbm90aWZ5LWRlcmVmLXdhdGNoZXIhIiwiZGVyZWZlZCIsInRlbXBfXzk4NTlfX2F1dG9fXyIsInJlYWdlbnQucmF0b20vY2hlY2std2F0Y2hlcyIsIm9sZCIsIm5ldyIsImNsanMuY29yZS9zd2FwISIsImNsanMuY29yZS8rIiwiY2xqcy5jb3JlL2NvdW50IiwicmVhZ2VudC5yYXRvbS9hZGQtdyIsInRoaXMiLCJrZXkiLCJ3IiwiY2xqcy5jb3JlL2Fzc29jIiwicmVhZ2VudC5yYXRvbS9yZW1vdmUtdyIsImNsanMuY29yZS9kaXNzb2MiLCJyZWFnZW50LnJhdG9tL25vdGlmeS13IiwiYSIsInAxX18xNyMiLCJwMl9fMTgjIiwicDNfXzE5IyIsImNsanMuY29yZS9yZWR1Y2Uta3YiLCJHX18zMzUiLCJrIiwicmVhZ2VudC5yYXRvbS9wci1hdG9tIiwid3JpdGVyIiwib3B0cyIsInMiLCJjbGpzLmNvcmUvLXdyaXRlIiwiY2xqcy5jb3JlL3ByLXdyaXRlciIsIipyYXRvbS1jb250ZXh0Ki1vcmlnLXZhbF9fMzM5IiwiKnJhdG9tLWNvbnRleHQqLXRlbXAtdmFsX18zNDAiLCJjbGpzLmNvcmUvLWRlcmVmIiwianMvcmVhZ2VudC5yYXRvbS5yZWEtcXVldWUiLCJyZWFnZW50LnJhdG9tL3JlYS1xdWV1ZSIsInJlYWdlbnQucmF0b20vcmVhLWVucXVldWUiLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvc2NoZWR1bGUiLCJyZWFnZW50LnJhdG9tL2ZsdXNoISIsInEiLCJuX18xMjEyMl9fYXV0b19fIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL3JhdG9tLWZsdXNoIiwicmVhZ2VudC5yYXRvbS9JUmVhY3RpdmVBdG9tIiwiY2xqcy5jb3JlL1BST1RPQ09MX1NFTlRJTkVMIiwidGhpc19fMTEwNTVfX2F1dG9fXyIsIndyaXRlcl9fMTEwNTZfX2F1dG9fXyIsIm9wdF9fMTEwNTdfX2F1dG9fXyIsInJlYWdlbnQucmF0b20vUkF0b20iLCJyZWFnZW50LnJhdG9tLy0+UkF0b20iLCJzdGF0ZSIsIm1ldGEiLCJ2YWxpZGF0b3IiLCJ3YXRjaGVzIiwibyIsIm90aGVyIiwibmV3LXZhbHVlIiwianMvRXJyb3IiLCJvbGQtdmFsdWUiLCJjbGpzLmNvcmUvLXJlc2V0ISIsIm1vcmUiLCJjbGpzLmNvcmUvYXBwbHkiLCJfIiwibmV3LW1ldGEiLCJnb29nL2dldFVpZCIsInZhcl9hcmdzIiwiR19fMzQ3IiwicmVhZ2VudC5yYXRvbS9hdG9tIiwiYXJncy1hcnJfXzEyNTE1X19hdXRvX18iLCJsZW5fXzEyNDQ1X19hdXRvX18iLCJpX18xMjQ0Nl9fYXV0b19fIiwiYXJnc2VxX18xMjUxNl9fYXV0b19fIiwicF9fMzQ4IiwibWFwX18zNDkiLCJjbGpzLmNvcmUvaGFzaC1tYXAiLCJjbGpzLmNvcmUvZ2V0Iiwic2VxMzQ1IiwiR19fMzQ2Iiwic2VsZl9fMTI0MjBfX2F1dG9fXyIsInJlYWdlbnQucmF0b20vY2FjaGVkLXJlYWN0aW9uIiwiZGVzdHJveSIsIm0iLCJyZWFnZW50LnJhdG9tL21ha2UtcmVhY3Rpb24iLCJjbGpzLmNvcmUvZGVjIiwidiIsImNsanMuY29yZS9pbmMiLCJyZWFnZW50LnJhdG9tL1RyYWNrIiwicmVhZ2VudC5yYXRvbS8tPlRyYWNrIiwiYXJncyIsInJlYWN0aW9uIiwidGVtcF9fOTgxNF9fYXV0b19fIiwiY2xqcy5jb3JlLz0iLCJjbGpzLmNvcmUvaGFzaCIsInJlYWdlbnQucmF0b20vbWFrZS10cmFjayIsInJlYWdlbnQucmF0b20vbWFrZS10cmFjayEiLCJ0IiwiYXJnc19fMTI0NjJfX2F1dG9fXyIsImFyZ3NlcV9fMTI0NjNfX2F1dG9fXyIsInJlYWdlbnQucmF0b20vdHJhY2siLCJzZXEzNTciLCJHX18zNTgiLCJjbGpzLmNvcmUvaWZuPyIsInJlYWdlbnQucmF0b20vdHJhY2shIiwic2VxMzYyIiwiR19fMzYzIiwicmVhZ2VudC5yYXRvbS9SQ3Vyc29yIiwicmVhZ2VudC5yYXRvbS8tPlJDdXJzb3IiLCJyYXRvbSIsInBhdGgiLCIqcmF0b20tY29udGV4dCotb3JpZy12YWxfXzM2NyIsIipyYXRvbS1jb250ZXh0Ki10ZW1wLXZhbF9fMzY4Iiwib2xkc3RhdGUiLCJuZXdzdGF0ZSIsImNsanMuY29yZS9uYXRpdmUtc2F0aXNmaWVzPyIsImNsanMuY29yZS9JRGVyZWYiLCJjbGpzLmNvcmUvZ2V0LWluIiwiY2xqcy5jb3JlL3Jlc2V0ISIsImNsanMuY29yZS9hc3NvYy1pbiIsInJlYWdlbnQucmF0b20vY3Vyc29yIiwic3JjIiwiY2xqcy5jb3JlL3ZlY3Rvcj8iLCJjbGpzLmNvcmUvcHItc3RyIiwicmVhZ2VudC5yYXRvbS93aXRoLWxldC1kZXN0cm95IiwicmVhZ2VudC5yYXRvbS93aXRoLWxldC12YWx1ZXMiLCJjbGpzLmNvcmUvYXJyYXkiLCJ4X18xMTI3M19fYXV0b19fIiwibV9fMTEyNzRfX2F1dG9fXyIsInJlYWdlbnQucmF0b20vZGlzcG9zZSEiLCJnb29nL3R5cGVPZiIsIm1fXzExMjcxX19hdXRvX18iLCJjbGpzLmNvcmUvbWlzc2luZy1wcm90b2NvbCIsInJlYWdlbnQucmF0b20vYWRkLW9uLWRpc3Bvc2UhIiwicmVhZ2VudC5yYXRvbS9JRGlzcG9zYWJsZSIsInJlYWdlbnQucmF0b20vcnVuIiwicmVhZ2VudC5yYXRvbS9JUnVubmFibGUiLCJyZWFnZW50LnJhdG9tL2hhbmRsZS1yZWFjdGlvbi1jaGFuZ2UiLCJzZW5kZXIiLCJwX18zODQiLCJtYXBfXzM4NSIsInJlYWdlbnQucmF0b20vUmVhY3Rpb24iLCJyZWFnZW50LnJhdG9tLy0+UmVhY3Rpb24iLCJkaXJ0eT8iLCJub2NhY2hlPyIsIndhdGNoaW5nIiwiYXV0by1ydW4iLCJjYXVnaHQiLCJ3YXMtZW1wdHkiLCJjbGpzLmNvcmUvZW1wdHk/IiwibmV3dmFsIiwiY2xqcy5jb3JlL2ZuPyIsIm9sZHZhbCIsIipyYXRvbS1jb250ZXh0Ki1vcmlnLXZhbF9fMzczIiwiKnJhdG9tLWNvbnRleHQqLXRlbXAtdmFsX18zNzQiLCJjbGpzLmNvcmUvc2V0Iiwic2VxX18zNzUiLCJjbGpzLmNvcmUvc2VxIiwiY2h1bmtfXzM3NiIsImNvdW50X18zNzciLCJpX18zNzgiLCJjbGpzLmNvcmUvLW50aCIsInRlbXBfXzk2NDZfX2F1dG9fXyIsImNsanMuY29yZS9jaHVua2VkLXNlcT8iLCJjX18xMTcyOV9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rLWZpcnN0IiwiY2xqcy5jb3JlL2NodW5rLXJlc3QiLCJjbGpzLmNvcmUvZmlyc3QiLCJjbGpzLmNvcmUvbmV4dCIsImNsb2p1cmUuc2V0L2RpZmZlcmVuY2UiLCJjbGpzLmNvcmUvLWFkZC13YXRjaCIsInNlcV9fMzc5IiwiY2h1bmtfXzM4MCIsImNvdW50X18zODEiLCJpX18zODIiLCJjbGpzLmNvcmUvLXJlbW92ZS13YXRjaCIsImUzODMiLCJlIiwiY2hlY2siLCJvbi1zZXQiLCJvbi1kaXNwb3NlIiwibm8tY2FjaGUiLCJub24tcmVhY3RpdmUiLCJ3ZyIsInNlcV9fMzg3IiwiY2h1bmtfXzM4OCIsImNvdW50X18zODkiLCJpX18zOTAiLCJwX180NTIiLCJtYXBfXzQ1MyIsInNlcTQ1MCIsIkdfXzQ1MSIsInJlYWdlbnQucmF0b20vdGVtcC1yZWFjdGlvbiIsInJlYWdlbnQucmF0b20vcnVuLWluLXJlYWN0aW9uIiwicnVuIiwiZ29vZy5vYmplY3Qvc2V0IiwicmVhZ2VudC5yYXRvbS9jaGVjay1kZXJlZnMiLCJjdHgiLCJyZWFnZW50LnJhdG9tL1dyYXBwZXIiLCJyZWFnZW50LnJhdG9tLy0+V3JhcHBlciIsImNhbGxiYWNrIiwiY2hhbmdlZCIsInJlYWdlbnQvZGVidWciLCJqcy9jb25zb2xlIiwiY2xqcy5jb3JlL25vdCIsInJlYWdlbnQucmF0b20vbWFrZS13cmFwcGVyIiwidmFsdWUiLCJjYWxsYmFjay1mbiIsInJlYWdlbnQuaW1wbC51dGlsL21ha2UtcGFydGlhbC1mbiIsImNsanMuY29yZS9JbmRleGVkU2VxIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZWFnZW50LnJhdG9tXG4gICg6cmVmZXItY2xvanVyZSA6ZXhjbHVkZSBbYXRvbV0pXG4gICg6cmVxdWlyZS1tYWNyb3MgW3JlYWdlbnQucmF0b21dKVxuICAoOnJlcXVpcmUgW3JlYWdlbnQuaW1wbC51dGlsIDphcyB1dGlsXVxuICAgICAgICAgICAgW3JlYWdlbnQuZGVidWcgOnJlZmVyLW1hY3JvcyBbd2FybiBkZXY/XV1cbiAgICAgICAgICAgIFtyZWFnZW50LmltcGwuYmF0Y2hpbmcgOmFzIGJhdGNoXVxuICAgICAgICAgICAgW2Nsb2p1cmUuc2V0IDphcyBzXVxuICAgICAgICAgICAgW2dvb2cub2JqZWN0IDphcyBvYmpdKSlcblxuKGRlY2xhcmUgXjpkeW5hbWljICpyYXRvbS1jb250ZXh0KilcbihkZWZvbmNlIF5ib29sZWFuIGRlYnVnIGZhbHNlKVxuKGRlZm9uY2UgXjpwcml2YXRlIGdlbmVyYXRpb24gMClcbihkZWZvbmNlIF46cHJpdmF0ZSAtcnVubmluZyAoY2xvanVyZS5jb3JlL2F0b20gMCkpXG5cbihkZWZuIF5ib29sZWFuIHJlYWN0aXZlPyBbXVxuICAoc29tZT8gKnJhdG9tLWNvbnRleHQqKSlcblxuXG47OzsgVXRpbGl0aWVzXG5cbihkZWZuIHJ1bm5pbmcgW11cbiAgKCsgQC1ydW5uaW5nKSlcblxuKGRlZm4tIF5udW1iZXIgYXJyLWxlbiBbeF1cbiAgKGlmIChuaWw/IHgpIDAgKGFsZW5ndGggeCkpKVxuXG4oZGVmbi0gXmJvb2xlYW4gYXJyLWVxIFt4IHldXG4gIChsZXQgW2xlbiAoYXJyLWxlbiB4KV1cbiAgICAoYW5kICg9PSBsZW4gKGFyci1sZW4geSkpXG4gICAgICAgICAobG9vcCBbaSAwXVxuICAgICAgICAgICAob3IgKD09IGkgbGVuKVxuICAgICAgICAgICAgICAgKGlmIChpZGVudGljYWw/IChhZ2V0IHggaSkgKGFnZXQgeSBpKSlcbiAgICAgICAgICAgICAgICAgKHJlY3VyIChpbmMgaSkpXG4gICAgICAgICAgICAgICAgIGZhbHNlKSkpKSkpXG5cbihkZWZuLSBpbi1jb250ZXh0XG4gIFwiV2hlbiBmIGlzIGV4ZWN1dGVkLCBpZiAoZikgZGVyZWZzIGFueSByYXRvbXMsIHRoZXkgYXJlIHRoZW4gYWRkZWQgdG8gJ29iai5jYXB0dXJlZCcoKnJhdG9tLWNvbnRleHQqKS5cblxuICBTZWUgZnVuY3Rpb24gbm90aWZ5LWRlcmVmLXdhdGNoZXIhIHRvIGtub3cgaG93ICpyYXRvbS1jb250ZXh0KiBpcyB1cGRhdGVkXCJcbiAgW29iaiBmXVxuICAoYmluZGluZyBbKnJhdG9tLWNvbnRleHQqIG9ial1cbiAgICAoZikpKVxuXG4oZGVmbi0gZGVyZWYtY2FwdHVyZVxuICBcIlJldHVybnMgYChpbi1jb250ZXh0IGYgcilgLiAgQ2FsbHMgYF91cGRhdGUtd2F0Y2hpbmdgIG9uIHIgd2l0aCBhbnlcbiAgYGRlcmVmYGVkIGF0b21zIGNhcHR1cmVkIGR1cmluZyBgaW4tY29udGV4dGAsIGlmIGFueSBkaWZmZXIgZnJvbSB0aGVcbiAgYHdhdGNoaW5nYCBmaWVsZCBvZiByLiAgQ2xlYXJzIHRoZSBgZGlydHk/YCBmbGFnIG9uIHIuXG5cbiAgSW5zaWRlICdfdXBkYXRlLXdhdGNoaW5nJyBhbG9uZyB3aXRoIGFkZGluZyB0aGUgcmF0b21zIGluICdyLndhdGNoaW5nJyBvZiByZWFjdGlvbixcbiAgdGhlIHJlYWN0aW9uIGlzIGFsc28gYWRkZWQgdG8gdGhlIGxpc3Qgb2Ygd2F0Y2hlcyBvbiBlYWNoIHJhdG9tcyBmIGRlcmVmcy5cIlxuICBbZiBeY2xqIHJdXG4gIChzZXQhICguLWNhcHR1cmVkIHIpIG5pbClcbiAgKHdoZW4gKGRldj8pXG4gICAgKHNldCEgKC4tcmF0b21HZW5lcmF0aW9uIHIpIChzZXQhIGdlbmVyYXRpb24gKGluYyBnZW5lcmF0aW9uKSkpKVxuICAobGV0IFtyZXMgKGluLWNvbnRleHQgciBmKVxuICAgICAgICBjICguLWNhcHR1cmVkIHIpXVxuICAgIChzZXQhICguLWRpcnR5PyByKSBmYWxzZSlcbiAgICA7OyBPcHRpbWl6ZSBjb21tb24gY2FzZSB3aGVyZSBkZXJlZnMgb2NjdXIgaW4gc2FtZSBvcmRlclxuICAgICh3aGVuLW5vdCAoYXJyLWVxIGMgKC4td2F0Y2hpbmcgcikpXG4gICAgICAoLl91cGRhdGUtd2F0Y2hpbmcgciBjKSlcbiAgICByZXMpKVxuXG4oZGVmbi0gbm90aWZ5LWRlcmVmLXdhdGNoZXIhXG4gIFwiQWRkIGBkZXJlZmVkYCB0byB0aGUgYGNhcHR1cmVkYCBmaWVsZCBvZiBgKnJhdG9tLWNvbnRleHQqYC5cblxuICBTZWUgYWxzbyBgaW4tY29udGV4dGBcIlxuICBbZGVyZWZlZF1cbiAgKHdoZW4tc29tZSBbciAqcmF0b20tY29udGV4dCpdXG4gICAgKGxldCBbYyAoLi1jYXB0dXJlZCByKV1cbiAgICAgIChpZiAobmlsPyBjKVxuICAgICAgICAoc2V0ISAoLi1jYXB0dXJlZCByKSAoYXJyYXkgZGVyZWZlZCkpXG4gICAgICAgICgucHVzaCBjIGRlcmVmZWQpKSkpKVxuXG4oZGVmbi0gY2hlY2std2F0Y2hlcyBbb2xkIG5ld11cbiAgKHdoZW4gZGVidWdcbiAgICAoc3dhcCEgLXJ1bm5pbmcgKyAoLSAoY291bnQgbmV3KSAoY291bnQgb2xkKSkpKVxuICBuZXcpXG5cbihkZWZuLSBhZGQtdyBbXmNsaiB0aGlzIGtleSBmXVxuICAobGV0IFt3ICguLXdhdGNoZXMgdGhpcyldXG4gICAgKHNldCEgKC4td2F0Y2hlcyB0aGlzKSAoY2hlY2std2F0Y2hlcyB3IChhc3NvYyB3IGtleSBmKSkpXG4gICAgKHNldCEgKC4td2F0Y2hlc0FyciB0aGlzKSBuaWwpKSlcblxuKGRlZm4tIHJlbW92ZS13IFteY2xqIHRoaXMga2V5XVxuICAobGV0IFt3ICguLXdhdGNoZXMgdGhpcyldXG4gICAgKHNldCEgKC4td2F0Y2hlcyB0aGlzKSAoY2hlY2std2F0Y2hlcyB3IChkaXNzb2MgdyBrZXkpKSlcbiAgICAoc2V0ISAoLi13YXRjaGVzQXJyIHRoaXMpIG5pbCkpKVxuXG4oZGVmbi0gbm90aWZ5LXcgW15jbGogdGhpcyBvbGQgbmV3XVxuICAobGV0IFt3ICguLXdhdGNoZXNBcnIgdGhpcylcbiAgICAgICAgYSAoaWYgKG5pbD8gdylcbiAgICAgICAgICAgIDs7IENvcHkgd2F0Y2hlcyB0byBhcnJheSBmb3Igc3BlZWRcbiAgICAgICAgICAgICgtPj4gKC4td2F0Y2hlcyB0aGlzKVxuICAgICAgICAgICAgICAgICAocmVkdWNlLWt2ICMoZG90byAlMSAoLnB1c2ggJTIpICgucHVzaCAlMykpICNqc1tdKVxuICAgICAgICAgICAgICAgICAoc2V0ISAoLi13YXRjaGVzQXJyIHRoaXMpKSlcbiAgICAgICAgICAgIHcpXG4gICAgICAgIGxlbiAoYWxlbmd0aCBhKV1cbiAgICAobG9vcCBbaSAwXVxuICAgICAgKHdoZW4gKDwgaSBsZW4pXG4gICAgICAgIChsZXQgW2sgKGFnZXQgYSBpKVxuICAgICAgICAgICAgICBmIChhZ2V0IGEgKGluYyBpKSldXG4gICAgICAgICAgKGYgayB0aGlzIG9sZCBuZXcpKVxuICAgICAgICAocmVjdXIgKCsgMiBpKSkpKSkpXG5cbihkZWZuLSBwci1hdG9tIFthIHdyaXRlciBvcHRzIHNdXG4gICgtd3JpdGUgd3JpdGVyIChzdHIgXCIjPFwiIHMgXCIgXCIpKVxuICAocHItd3JpdGVyIChiaW5kaW5nIFsqcmF0b20tY29udGV4dCogbmlsXSAoLWRlcmVmIGEpKSB3cml0ZXIgb3B0cylcbiAgKC13cml0ZSB3cml0ZXIgXCI+XCIpKVxuXG5cbjs7OyBRdWV1ZWluZ1xuXG4oZGVmb25jZSBeOnByaXZhdGUgcmVhLXF1ZXVlIG5pbClcblxuKGRlZm4tIHJlYS1lbnF1ZXVlIFtyXVxuICAod2hlbiAobmlsPyByZWEtcXVldWUpXG4gICAgKHNldCEgcmVhLXF1ZXVlIChhcnJheSkpXG4gICAgKGJhdGNoL3NjaGVkdWxlKSlcbiAgKC5wdXNoIHJlYS1xdWV1ZSByKSlcblxuKGRlZm4gZmx1c2ghIFtdXG4gIChsb29wIFtdXG4gICAgKGxldCBbcSByZWEtcXVldWVdXG4gICAgICAod2hlbi1ub3QgKG5pbD8gcSlcbiAgICAgICAgKHNldCEgcmVhLXF1ZXVlIG5pbClcbiAgICAgICAgKGRvdGltZXMgW2kgKGFsZW5ndGggcSldXG4gICAgICAgICAgKC5fcXVldWVkLXJ1biAoYWdldCBxIGkpKSlcbiAgICAgICAgKHJlY3VyKSkpKSlcblxuKHNldCEgYmF0Y2gvcmF0b20tZmx1c2ggZmx1c2ghKVxuXG5cbjs7OyBBdG9tXG5cbihkZWZwcm90b2NvbCBJUmVhY3RpdmVBdG9tKVxuXG4oZGVmdHlwZSBSQXRvbSBbXjptdXRhYmxlIHN0YXRlIG1ldGEgdmFsaWRhdG9yIF46bXV0YWJsZSB3YXRjaGVzXVxuICBJQXRvbVxuICBJUmVhY3RpdmVBdG9tXG5cbiAgSUVxdWl2XG4gICgtZXF1aXYgW28gb3RoZXJdIChpZGVudGljYWw/IG8gb3RoZXIpKVxuXG4gIElEZXJlZlxuICAoLWRlcmVmIFt0aGlzXVxuICAgIChub3RpZnktZGVyZWYtd2F0Y2hlciEgdGhpcylcbiAgICBzdGF0ZSlcblxuICBJUmVzZXRcbiAgKC1yZXNldCEgW2EgbmV3LXZhbHVlXVxuICAgICh3aGVuLW5vdCAobmlsPyB2YWxpZGF0b3IpXG4gICAgICAoYXNzZXJ0ICh2YWxpZGF0b3IgbmV3LXZhbHVlKSBcIlZhbGlkYXRvciByZWplY3RlZCByZWZlcmVuY2Ugc3RhdGVcIikpXG4gICAgKGxldCBbb2xkLXZhbHVlIHN0YXRlXVxuICAgICAgKHNldCEgc3RhdGUgbmV3LXZhbHVlKVxuICAgICAgKHdoZW4tbm90IChuaWw/IHdhdGNoZXMpXG4gICAgICAgIChub3RpZnktdyBhIG9sZC12YWx1ZSBuZXctdmFsdWUpKVxuICAgICAgbmV3LXZhbHVlKSlcblxuICBJU3dhcFxuICAoLXN3YXAhIFthIGZdICAgICAgICAgICgtcmVzZXQhIGEgKGYgc3RhdGUpKSlcbiAgKC1zd2FwISBbYSBmIHhdICAgICAgICAoLXJlc2V0ISBhIChmIHN0YXRlIHgpKSlcbiAgKC1zd2FwISBbYSBmIHggeV0gICAgICAoLXJlc2V0ISBhIChmIHN0YXRlIHggeSkpKVxuICAoLXN3YXAhIFthIGYgeCB5IG1vcmVdICgtcmVzZXQhIGEgKGFwcGx5IGYgc3RhdGUgeCB5IG1vcmUpKSlcblxuICBJV2l0aE1ldGFcbiAgKC13aXRoLW1ldGEgW18gbmV3LW1ldGFdIChSQXRvbS4gc3RhdGUgbmV3LW1ldGEgdmFsaWRhdG9yIHdhdGNoZXMpKVxuXG4gIElNZXRhXG4gICgtbWV0YSBbX10gbWV0YSlcblxuICBJUHJpbnRXaXRoV3JpdGVyXG4gICgtcHItd3JpdGVyIFthIHcgb3B0c10gKHByLWF0b20gYSB3IG9wdHMgXCJBdG9tOlwiKSlcblxuICBJV2F0Y2hhYmxlXG4gICgtbm90aWZ5LXdhdGNoZXMgW3RoaXMgb2xkIG5ld10gKG5vdGlmeS13IHRoaXMgb2xkIG5ldykpXG4gICgtYWRkLXdhdGNoIFt0aGlzIGtleSBmXSAgICAgICAgKGFkZC13IHRoaXMga2V5IGYpKVxuICAoLXJlbW92ZS13YXRjaCBbdGhpcyBrZXldICAgICAgIChyZW1vdmUtdyB0aGlzIGtleSkpXG5cbiAgSUhhc2hcbiAgKC1oYXNoIFt0aGlzXSAoZ29vZy9nZXRVaWQgdGhpcykpKVxuXG4oZGVmbiBhdG9tXG4gIFwiTGlrZSBjbG9qdXJlLmNvcmUvYXRvbSwgZXhjZXB0IHRoYXQgaXQga2VlcHMgdHJhY2sgb2YgZGVyZWZzLlwiXG4gIChbeF0gKC0+UkF0b20geCBuaWwgbmlsIG5pbCkpXG4gIChbeCAmIHs6a2V5cyBbbWV0YSB2YWxpZGF0b3JdfV0gKC0+UkF0b20geCBtZXRhIHZhbGlkYXRvciBuaWwpKSlcblxuXG47OzsgdHJhY2tcblxuKGRlY2xhcmUgbWFrZS1yZWFjdGlvbilcblxuKGRlZm4tIGNhY2hlZC1yZWFjdGlvbiBbZiBeY2xqIG8gayBeY2xqIG9iaiBkZXN0cm95XVxuICAobGV0IFttICguLXJlYWdSZWFjdGlvbkNhY2hlIG8pXG4gICAgICAgIG0gKGlmIChuaWw/IG0pIHt9IG0pXG4gICAgICAgIHIgKG0gayBuaWwpXVxuICAgIChjb25kXG4gICAgICAoc29tZT8gcikgKC1kZXJlZiByKVxuICAgICAgKG5pbD8gKnJhdG9tLWNvbnRleHQqKSAoZilcbiAgICAgIDplbHNlIChsZXQgW3IgKG1ha2UtcmVhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgIGYgOm9uLWRpc3Bvc2UgKGZuIFt4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aGVuIGRlYnVnIChzd2FwISAtcnVubmluZyBkZWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcy0+ICguLXJlYWdSZWFjdGlvbkNhY2hlIG8pIF9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkaXNzb2MgXyBrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNldCEgKC4tcmVhZ1JlYWN0aW9uQ2FjaGUgbykgXykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdoZW4gKHNvbWU/IG9iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzZXQhICguLXJlYWN0aW9uIG9iaikgbmlsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2hlbiAoc29tZT8gZGVzdHJveSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZXN0cm95IHgpKSkpXG4gICAgICAgICAgICAgICAgICB2ICgtZGVyZWYgcildXG4gICAgICAgICAgICAgIChzZXQhICguLXJlYWdSZWFjdGlvbkNhY2hlIG8pIChhc3NvYyBtIGsgcikpXG4gICAgICAgICAgICAgICh3aGVuIGRlYnVnIChzd2FwISAtcnVubmluZyBpbmMpKVxuICAgICAgICAgICAgICAod2hlbiAoc29tZT8gb2JqKVxuICAgICAgICAgICAgICAgIChzZXQhICguLXJlYWN0aW9uIG9iaikgcikpXG4gICAgICAgICAgICAgIHYpKSkpXG5cbihkZWZ0eXBlIFRyYWNrIFtmIGFyZ3MgXjptdXRhYmxlIHJlYWN0aW9uXVxuICBJUmVhY3RpdmVBdG9tXG5cbiAgSURlcmVmXG4gICgtZGVyZWYgW3RoaXNdXG4gICAgKGlmLXNvbWUgW3IgcmVhY3Rpb25dXG4gICAgICAoLWRlcmVmIHIpXG4gICAgICAoY2FjaGVkLXJlYWN0aW9uICMoYXBwbHkgZiBhcmdzKSBmIGFyZ3MgdGhpcyBuaWwpKSlcblxuICBJRXF1aXZcbiAgKC1lcXVpdiBbXyBeY2xqIG90aGVyXVxuICAgIChhbmQgKGluc3RhbmNlPyBUcmFjayBvdGhlcilcbiAgICAgICAgICg9IGYgKC4tZiBvdGhlcikpXG4gICAgICAgICAoPSBhcmdzICguLWFyZ3Mgb3RoZXIpKSkpXG5cbiAgSUhhc2hcbiAgKC1oYXNoIFtfXSAoaGFzaCBbZiBhcmdzXSkpXG5cbiAgSVByaW50V2l0aFdyaXRlclxuICAoLXByLXdyaXRlciBbYSB3IG9wdHNdIChwci1hdG9tIGEgdyBvcHRzIFwiVHJhY2s6XCIpKSlcblxuKGRlZm4gbWFrZS10cmFjayBbZiBhcmdzXVxuICAoVHJhY2suIGYgYXJncyBuaWwpKVxuXG4oZGVmbiBtYWtlLXRyYWNrISBbZiBhcmdzXVxuICAobGV0IFt0IChtYWtlLXRyYWNrIGYgYXJncylcbiAgICAgICAgciAobWFrZS1yZWFjdGlvbiAjKC1kZXJlZiB0KVxuICAgICAgICAgICAgICAgICAgICAgICAgIDphdXRvLXJ1biB0cnVlKV1cbiAgICBAclxuICAgIHIpKVxuXG4oZGVmbiB0cmFjayBbZiAmIGFyZ3NdXG4gIHs6cHJlIFsoaWZuPyBmKV19XG4gIChtYWtlLXRyYWNrIGYgYXJncykpXG5cbihkZWZuIHRyYWNrISBbZiAmIGFyZ3NdXG4gIHs6cHJlIFsoaWZuPyBmKV19XG4gIChtYWtlLXRyYWNrISBmIGFyZ3MpKVxuXG47OzsgY3Vyc29yXG5cbihkZWZ0eXBlIFJDdXJzb3IgW3JhdG9tIHBhdGggXjptdXRhYmxlIHJlYWN0aW9uXG4gICAgICAgICAgICAgICAgICBeOm11dGFibGUgc3RhdGUgXjptdXRhYmxlIHdhdGNoZXNdXG4gIElBdG9tXG4gIElSZWFjdGl2ZUF0b21cblxuICBJRXF1aXZcbiAgKC1lcXVpdiBbXyBeY2xqIG90aGVyXVxuICAgIChhbmQgKGluc3RhbmNlPyBSQ3Vyc29yIG90aGVyKVxuICAgICAgICAgKD0gcGF0aCAoLi1wYXRoIG90aGVyKSlcbiAgICAgICAgICg9IHJhdG9tICguLXJhdG9tIG90aGVyKSkpKVxuXG4gIE9iamVjdFxuICAoX3BlZWsgW3RoaXNdXG4gICAgKGJpbmRpbmcgWypyYXRvbS1jb250ZXh0KiBuaWxdXG4gICAgICAoLWRlcmVmIHRoaXMpKSlcblxuICAoX3NldC1zdGF0ZSBbdGhpcyBvbGRzdGF0ZSBuZXdzdGF0ZV1cbiAgICAod2hlbi1ub3QgKGlkZW50aWNhbD8gb2xkc3RhdGUgbmV3c3RhdGUpXG4gICAgICAoc2V0ISBzdGF0ZSBuZXdzdGF0ZSlcbiAgICAgICh3aGVuIChzb21lPyB3YXRjaGVzKVxuICAgICAgICAobm90aWZ5LXcgdGhpcyBvbGRzdGF0ZSBuZXdzdGF0ZSkpKSlcblxuICBJRGVyZWZcbiAgKC1kZXJlZiBbdGhpc11cbiAgICAobGV0IFtvbGRzdGF0ZSBzdGF0ZVxuICAgICAgICAgIG5ld3N0YXRlIChpZi1zb21lIFtyIHJlYWN0aW9uXVxuICAgICAgICAgICAgICAgICAgICAgKC1kZXJlZiByKVxuICAgICAgICAgICAgICAgICAgICAgKGxldCBbZiAoaWYgKHNhdGlzZmllcz8gSURlcmVmIHJhdG9tKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMoZ2V0LWluIEByYXRvbSBwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMocmF0b20gcGF0aCkpXVxuICAgICAgICAgICAgICAgICAgICAgICAoY2FjaGVkLXJlYWN0aW9uIGYgcmF0b20gcGF0aCB0aGlzIG5pbCkpKV1cbiAgICAgICguX3NldC1zdGF0ZSB0aGlzIG9sZHN0YXRlIG5ld3N0YXRlKVxuICAgICAgbmV3c3RhdGUpKVxuXG4gIElSZXNldFxuICAoLXJlc2V0ISBbdGhpcyBuZXctdmFsdWVdXG4gICAgKGxldCBbb2xkc3RhdGUgc3RhdGVdXG4gICAgICAoLl9zZXQtc3RhdGUgdGhpcyBvbGRzdGF0ZSBuZXctdmFsdWUpXG4gICAgICAoaWYgKHNhdGlzZmllcz8gSURlcmVmIHJhdG9tKVxuICAgICAgICAoaWYgKD0gcGF0aCBbXSlcbiAgICAgICAgICAocmVzZXQhIHJhdG9tIG5ldy12YWx1ZSlcbiAgICAgICAgICAoc3dhcCEgcmF0b20gYXNzb2MtaW4gcGF0aCBuZXctdmFsdWUpKVxuICAgICAgICAocmF0b20gcGF0aCBuZXctdmFsdWUpKVxuICAgICAgbmV3LXZhbHVlKSlcblxuICBJU3dhcFxuICAoLXN3YXAhIFthIGZdICAgICAgICAgICgtcmVzZXQhIGEgKGYgKC5fcGVlayBhKSkpKVxuICAoLXN3YXAhIFthIGYgeF0gICAgICAgICgtcmVzZXQhIGEgKGYgKC5fcGVlayBhKSB4KSkpXG4gICgtc3dhcCEgW2EgZiB4IHldICAgICAgKC1yZXNldCEgYSAoZiAoLl9wZWVrIGEpIHggeSkpKVxuICAoLXN3YXAhIFthIGYgeCB5IG1vcmVdICgtcmVzZXQhIGEgKGFwcGx5IGYgKC5fcGVlayBhKSB4IHkgbW9yZSkpKVxuXG4gIElQcmludFdpdGhXcml0ZXJcbiAgKC1wci13cml0ZXIgW2EgdyBvcHRzXSAocHItYXRvbSBhIHcgb3B0cyAoc3RyIFwiQ3Vyc29yOiBcIiBwYXRoKSkpXG5cbiAgSVdhdGNoYWJsZVxuICAoLW5vdGlmeS13YXRjaGVzIFt0aGlzIG9sZCBuZXddIChub3RpZnktdyB0aGlzIG9sZCBuZXcpKVxuICAoLWFkZC13YXRjaCBbdGhpcyBrZXkgZl0gICAgICAgIChhZGQtdyB0aGlzIGtleSBmKSlcbiAgKC1yZW1vdmUtd2F0Y2ggW3RoaXMga2V5XSAgICAgICAocmVtb3ZlLXcgdGhpcyBrZXkpKVxuXG4gIElIYXNoXG4gICgtaGFzaCBbX10gKGhhc2ggW3JhdG9tIHBhdGhdKSkpXG5cbihkZWZuIGN1cnNvclxuICBbXmNsaiBzcmMgcGF0aF1cbiAgKGFzc2VydCAob3IgKHNhdGlzZmllcz8gSVJlYWN0aXZlQXRvbSBzcmMpXG4gICAgICAgICAgICAgIChhbmQgKGlmbj8gc3JjKVxuICAgICAgICAgICAgICAgICAgIChub3QgKHZlY3Rvcj8gc3JjKSkpKVxuICAgICAgICAgIChzdHIgXCJzcmMgbXVzdCBiZSBhIHJlYWN0aXZlIGF0b20gb3IgYSBmdW5jdGlvbiwgbm90IFwiXG4gICAgICAgICAgICAgICAocHItc3RyIHNyYylcbiAgICAgICAgICAgICAgIFwiIHdoaWxlIGF0dGVtcHRpbmcgdG8gZ2V0IHBhdGg6IFwiXG4gICAgICAgICAgICAgICAocHItc3RyIHBhdGgpKSlcbiAgKC0+UkN1cnNvciBzcmMgcGF0aCBuaWwgbmlsIG5pbCkpXG5cblxuOzs7IHdpdGgtbGV0IHN1cHBvcnRcblxuKGRlZm4gd2l0aC1sZXQtZGVzdHJveSBbdl1cbiAgKHdoZW4tc29tZSBbZiAoLi1kZXN0cm95IHYpXVxuICAgIChmKSkpXG5cbihkZWZuIHdpdGgtbGV0LXZhbHVlcyBba2V5XVxuICAoaWYtc29tZSBbYyAqcmF0b20tY29udGV4dCpdXG4gICAgKGNhY2hlZC1yZWFjdGlvbiBhcnJheSBjIGtleVxuICAgICAgICAgICAgICAgICAgICAgbmlsIHdpdGgtbGV0LWRlc3Ryb3kpXG4gICAgKGFycmF5KSkpXG5cblxuOzs7OyByZWFjdGlvblxuXG4oZGVmcHJvdG9jb2wgSURpc3Bvc2FibGVcbiAgKGRpc3Bvc2UhIFt0aGlzXSlcbiAgKGFkZC1vbi1kaXNwb3NlISBbdGhpcyBmXSkpXG5cbihkZWZwcm90b2NvbCBJUnVubmFibGVcbiAgKHJ1biBbdGhpc10pKVxuXG4oZGVmbi0gaGFuZGxlLXJlYWN0aW9uLWNoYW5nZSBbXmNsaiB0aGlzIHNlbmRlciBvbGQgbmV3XVxuICAoLl9oYW5kbGUtY2hhbmdlIHRoaXMgc2VuZGVyIG9sZCBuZXcpKVxuXG47OyBGaWVsZHMgb2YgYSBSZWFjdGlvbiBqYXZhc2NyaXB0IG9iamVjdFxuOzsgLSBhdXRvX3J1blxuOzsgLSBjYXB0dXJlZFxuOzsgLSBjYXVnaHRcbjs7IC0gZlxuOzsgLSByYXRvbUdlbmVyYXRpb25cbjs7IC0gc3RhdGVcbjs7IC0gd2F0Y2hlc1xuOzsgLSB3YXRjaGluZ1xuKGRlZnR5cGUgUmVhY3Rpb24gW2YgXjptdXRhYmxlIHN0YXRlIF46bXV0YWJsZSBeYm9vbGVhbiBkaXJ0eT8gXmJvb2xlYW4gbm9jYWNoZT9cbiAgICAgICAgICAgICAgICAgICBeOm11dGFibGUgd2F0Y2hpbmcgXjptdXRhYmxlIHdhdGNoZXMgXjptdXRhYmxlIGF1dG8tcnVuXG4gICAgICAgICAgICAgICAgICAgXjptdXRhYmxlIGNhdWdodF1cbiAgSUF0b21cbiAgSVJlYWN0aXZlQXRvbVxuXG4gIElXYXRjaGFibGVcbiAgKC1ub3RpZnktd2F0Y2hlcyBbdGhpcyBvbGQgbmV3XSAobm90aWZ5LXcgdGhpcyBvbGQgbmV3KSlcbiAgKC1hZGQtd2F0Y2ggW3RoaXMga2V5IGZdICAgICAgICAoYWRkLXcgdGhpcyBrZXkgZikpXG4gICgtcmVtb3ZlLXdhdGNoIFt0aGlzIGtleV1cbiAgICAobGV0IFt3YXMtZW1wdHkgKGVtcHR5PyB3YXRjaGVzKV1cbiAgICAgIChyZW1vdmUtdyB0aGlzIGtleSlcbiAgICAgICh3aGVuIChhbmQgKG5vdCB3YXMtZW1wdHkpXG4gICAgICAgICAgICAgICAgIChlbXB0eT8gd2F0Y2hlcylcbiAgICAgICAgICAgICAgICAgKG5pbD8gYXV0by1ydW4pKVxuICAgICAgICAoZGlzcG9zZSEgdGhpcykpKSlcblxuICBJUmVzZXRcbiAgKC1yZXNldCEgW2EgbmV3dmFsXVxuICAgIChhc3NlcnQgKGZuPyAoLi1vbi1zZXQgYSkpIFwiUmVhY3Rpb24gaXMgcmVhZCBvbmx5OyBvbi1zZXQgaXMgbm90IGFsbG93ZWRcIilcbiAgICAobGV0IFtvbGR2YWwgc3RhdGVdXG4gICAgICAoc2V0ISBzdGF0ZSBuZXd2YWwpXG4gICAgICAoLm9uLXNldCBhIG9sZHZhbCBuZXd2YWwpXG4gICAgICAobm90aWZ5LXcgYSBvbGR2YWwgbmV3dmFsKVxuICAgICAgbmV3dmFsKSlcblxuICBJU3dhcFxuICAoLXN3YXAhIFthIGZdICAgICAgICAgICgtcmVzZXQhIGEgKGYgKC5fcGVlay1hdCBhKSkpKVxuICAoLXN3YXAhIFthIGYgeF0gICAgICAgICgtcmVzZXQhIGEgKGYgKC5fcGVlay1hdCBhKSB4KSkpXG4gICgtc3dhcCEgW2EgZiB4IHldICAgICAgKC1yZXNldCEgYSAoZiAoLl9wZWVrLWF0IGEpIHggeSkpKVxuICAoLXN3YXAhIFthIGYgeCB5IG1vcmVdICgtcmVzZXQhIGEgKGFwcGx5IGYgKC5fcGVlay1hdCBhKSB4IHkgbW9yZSkpKVxuXG4gIE9iamVjdFxuICAoX3BlZWstYXQgW3RoaXNdXG4gICAgKGJpbmRpbmcgWypyYXRvbS1jb250ZXh0KiBuaWxdXG4gICAgICAoLWRlcmVmIHRoaXMpKSlcblxuICAoX2hhbmRsZS1jaGFuZ2UgW3RoaXMgc2VuZGVyIG9sZHZhbCBuZXd2YWxdXG4gICAgKHdoZW4tbm90IChvciAoaWRlbnRpY2FsPyBvbGR2YWwgbmV3dmFsKVxuICAgICAgICAgICAgICAgICAgZGlydHk/KVxuICAgICAgKGlmIChuaWw/IGF1dG8tcnVuKVxuICAgICAgICAoZG9cbiAgICAgICAgICAoc2V0ISBkaXJ0eT8gdHJ1ZSlcbiAgICAgICAgICAocmVhLWVucXVldWUgdGhpcykpXG4gICAgICAgIChpZiAodHJ1ZT8gYXV0by1ydW4pXG4gICAgICAgICAgKC5fcnVuIHRoaXMgZmFsc2UpXG4gICAgICAgICAgKGF1dG8tcnVuIHRoaXMpKSkpKVxuXG4gIChfdXBkYXRlLXdhdGNoaW5nIFt0aGlzIGRlcmVmZWRdXG4gICAgKGxldCBbbmV3IChzZXQgZGVyZWZlZClcbiAgICAgICAgICBvbGQgKHNldCB3YXRjaGluZyldXG4gICAgICAoc2V0ISB3YXRjaGluZyBkZXJlZmVkKVxuICAgICAgKGRvc2VxIFt3IChzL2RpZmZlcmVuY2UgbmV3IG9sZCldXG4gICAgICAgICgtYWRkLXdhdGNoIHcgdGhpcyBoYW5kbGUtcmVhY3Rpb24tY2hhbmdlKSlcbiAgICAgIChkb3NlcSBbdyAocy9kaWZmZXJlbmNlIG9sZCBuZXcpXVxuICAgICAgICAoLXJlbW92ZS13YXRjaCB3IHRoaXMpKSkpXG5cbiAgKF9xdWV1ZWQtcnVuIFt0aGlzXVxuICAgICh3aGVuIChhbmQgZGlydHk/IChzb21lPyB3YXRjaGluZykpXG4gICAgICAoLl9ydW4gdGhpcyB0cnVlKSkpXG5cbiAgKF90cnktY2FwdHVyZSBbdGhpcyBmXVxuICAgICh0cnlcbiAgICAgIChzZXQhIGNhdWdodCBuaWwpXG4gICAgICAoZGVyZWYtY2FwdHVyZSBmIHRoaXMpXG4gICAgICAoY2F0Y2ggOmRlZmF1bHQgZVxuICAgICAgICAoc2V0ISBzdGF0ZSBlKVxuICAgICAgICAoc2V0ISBjYXVnaHQgZSlcbiAgICAgICAgKHNldCEgZGlydHk/IGZhbHNlKSkpKVxuXG4gIChfcnVuIFt0aGlzIGNoZWNrXVxuICAgIChsZXQgW29sZHN0YXRlIHN0YXRlXG4gICAgICAgICAgcmVzIChpZiBjaGVja1xuICAgICAgICAgICAgICAgICguX3RyeS1jYXB0dXJlIHRoaXMgZilcbiAgICAgICAgICAgICAgICAoZGVyZWYtY2FwdHVyZSBmIHRoaXMpKV1cbiAgICAgICh3aGVuLW5vdCBub2NhY2hlP1xuICAgICAgICAoc2V0ISBzdGF0ZSByZXMpXG4gICAgICAgIDs7IFVzZSA9IHRvIGRldGVybWluZSBlcXVhbGl0eSBmcm9tIHJlYWN0aW9ucywgc2luY2VcbiAgICAgICAgOzsgdGhleSBhcmUgbGlrZWx5IHRvIHByb2R1Y2UgbmV3IGRhdGEgc3RydWN0dXJlcy5cbiAgICAgICAgKHdoZW4tbm90IChvciAobmlsPyB3YXRjaGVzKVxuICAgICAgICAgICAgICAgICAgICAgICg9IG9sZHN0YXRlIHJlcykpXG4gICAgICAgICAgKG5vdGlmeS13IHRoaXMgb2xkc3RhdGUgcmVzKSkpXG4gICAgICByZXMpKVxuXG4gIChfc2V0LW9wdHMgW3RoaXMgezprZXlzIFthdXRvLXJ1biBvbi1zZXQgb24tZGlzcG9zZSBuby1jYWNoZV19XVxuICAgICh3aGVuIChzb21lPyBhdXRvLXJ1bilcbiAgICAgIChzZXQhICguLWF1dG8tcnVuIHRoaXMpIGF1dG8tcnVuKSlcbiAgICAod2hlbiAoc29tZT8gb24tc2V0KVxuICAgICAgKHNldCEgKC4tb24tc2V0IHRoaXMpIG9uLXNldCkpXG4gICAgKHdoZW4gKHNvbWU/IG9uLWRpc3Bvc2UpXG4gICAgICAoc2V0ISAoLi1vbi1kaXNwb3NlIHRoaXMpIG9uLWRpc3Bvc2UpKVxuICAgICh3aGVuIChzb21lPyBuby1jYWNoZSlcbiAgICAgIChzZXQhICguLW5vY2FjaGU/IHRoaXMpIG5vLWNhY2hlKSkpXG5cbiAgSVJ1bm5hYmxlXG4gIChydW4gW3RoaXNdXG4gICAgKGZsdXNoISlcbiAgICAoLl9ydW4gdGhpcyBmYWxzZSkpXG5cbiAgSURlcmVmXG4gICgtZGVyZWYgW3RoaXNdXG4gICAgKHdoZW4tc29tZSBbZSBjYXVnaHRdXG4gICAgICAodGhyb3cgZSkpXG4gICAgKGxldCBbbm9uLXJlYWN0aXZlIChuaWw/ICpyYXRvbS1jb250ZXh0KildXG4gICAgICAod2hlbiBub24tcmVhY3RpdmVcbiAgICAgICAgKGZsdXNoISkpXG4gICAgICAoaWYgKGFuZCBub24tcmVhY3RpdmUgKG5pbD8gYXV0by1ydW4pKVxuICAgICAgICAod2hlbiBkaXJ0eT9cbiAgICAgICAgICAobGV0IFtvbGRzdGF0ZSBzdGF0ZV1cbiAgICAgICAgICAgIChzZXQhIHN0YXRlIChmKSlcbiAgICAgICAgICAgICh3aGVuLW5vdCAob3IgKG5pbD8gd2F0Y2hlcykgKD0gb2xkc3RhdGUgc3RhdGUpKVxuICAgICAgICAgICAgICAobm90aWZ5LXcgdGhpcyBvbGRzdGF0ZSBzdGF0ZSkpKSlcbiAgICAgICAgKGRvXG4gICAgICAgICAgKG5vdGlmeS1kZXJlZi13YXRjaGVyISB0aGlzKVxuICAgICAgICAgICh3aGVuIGRpcnR5P1xuICAgICAgICAgICAgKC5fcnVuIHRoaXMgZmFsc2UpKSkpKVxuICAgIHN0YXRlKVxuXG4gIElEaXNwb3NhYmxlXG4gIChkaXNwb3NlISBbdGhpc11cbiAgICAobGV0IFtzIHN0YXRlXG4gICAgICAgICAgd2cgd2F0Y2hpbmddXG4gICAgICAoc2V0ISB3YXRjaGluZyBuaWwpXG4gICAgICAoc2V0ISBzdGF0ZSBuaWwpXG4gICAgICAoc2V0ISBhdXRvLXJ1biBuaWwpXG4gICAgICAoc2V0ISBkaXJ0eT8gdHJ1ZSlcbiAgICAgIChkb3NlcSBbdyAoc2V0IHdnKV1cbiAgICAgICAgKC1yZW1vdmUtd2F0Y2ggdyB0aGlzKSlcbiAgICAgICh3aGVuIChzb21lPyAoLi1vbi1kaXNwb3NlIHRoaXMpKVxuICAgICAgICAoLm9uLWRpc3Bvc2UgdGhpcyBzKSlcbiAgICAgICh3aGVuLXNvbWUgW2EgKC4tb24tZGlzcG9zZS1hcnIgdGhpcyldXG4gICAgICAgIChkb3RpbWVzIFtpIChhbGVuZ3RoIGEpXVxuICAgICAgICAgICgoYWdldCBhIGkpIHRoaXMpKSkpKVxuXG4gIChhZGQtb24tZGlzcG9zZSEgW3RoaXMgZl1cbiAgICA7OyBmIGlzIGNhbGxlZCB3aXRoIHRoZSByZWFjdGlvbiBhcyBhcmd1bWVudCB3aGVuIGl0IGlzIG5vIGxvbmdlciBhY3RpdmVcbiAgICAoaWYtc29tZSBbYSAoLi1vbi1kaXNwb3NlLWFyciB0aGlzKV1cbiAgICAgICgucHVzaCBhIGYpXG4gICAgICAoc2V0ISAoLi1vbi1kaXNwb3NlLWFyciB0aGlzKSAoYXJyYXkgZikpKSlcblxuICBJRXF1aXZcbiAgKC1lcXVpdiBbbyBvdGhlcl0gKGlkZW50aWNhbD8gbyBvdGhlcikpXG5cbiAgSVByaW50V2l0aFdyaXRlclxuICAoLXByLXdyaXRlciBbYSB3IG9wdHNdIChwci1hdG9tIGEgdyBvcHRzIChzdHIgXCJSZWFjdGlvbiBcIiAoaGFzaCBhKSBcIjpcIikpKVxuXG4gIElIYXNoXG4gICgtaGFzaCBbdGhpc10gKGdvb2cvZ2V0VWlkIHRoaXMpKSlcblxuXG4oZGVmbiBtYWtlLXJlYWN0aW9uIFtmICYgezprZXlzIFthdXRvLXJ1biBvbi1zZXQgb24tZGlzcG9zZV19XVxuICAobGV0IFtyZWFjdGlvbiAoLT5SZWFjdGlvbiBmIG5pbCB0cnVlIGZhbHNlIG5pbCBuaWwgbmlsIG5pbCldXG4gICAgKC5fc2V0LW9wdHMgcmVhY3Rpb24gezphdXRvLXJ1biBhdXRvLXJ1blxuICAgICAgICAgICAgICAgICAgICAgICAgICA6b24tc2V0IG9uLXNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICA6b24tZGlzcG9zZSBvbi1kaXNwb3NlfSlcbiAgICByZWFjdGlvbikpXG5cblxuXG4oZGVmIF46cHJpdmF0ZSB0ZW1wLXJlYWN0aW9uIChtYWtlLXJlYWN0aW9uIG5pbCkpXG5cblxuKGRlZm4gcnVuLWluLXJlYWN0aW9uXG4gIFwiRXZhbHVhdGVzIGBmYCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0LiAgSWYgYGZgIGNhbGxzIGBkZXJlZmAgb24gYW55IHJhdG9tcyxcbiAgIGNyZWF0ZXMgYSBuZXcgUmVhY3Rpb24gdGhhdCB3YXRjaGVzIHRob3NlIGF0b21zIGFuZCBjYWxscyBgcnVuYCB3aGVuZXZlclxuICAgYW55IG9mIHRob3NlIHdhdGNoZWQgcmF0b21zIGNoYW5nZS4gIEFsc28sIHRoZSBuZXcgcmVhY3Rpb24gaXMgYWRkZWQgdG9cbiAgIGxpc3Qgb2YgJ3dhdGNoZXMnIG9mIGVhY2ggb2YgdGhlIHJhdG9tcy4gVGhlIGBydW5gIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uXG4gICB0aGF0IHNob3VsZCBleHBlY3Qgb25lIGFyZ3VtZW50LiAgSXQgaXMgcGFzc2VkIGBvYmpgIHdoZW4gcnVuLiAgVGhlIGBvcHRzYFxuICAgYXJlIGFueSBvcHRpb25zIGFjY2VwdGVkIGJ5IGEgUmVhY3Rpb24gYW5kIHdpbGwgYmUgc2V0IG9uIHRoZSBuZXdseSBjcmVhdGVkXG4gICBSZWFjdGlvbi4gU2V0cyB0aGUgbmV3bHkgY3JlYXRlZCBSZWFjdGlvbiB0byB0aGUgYGtleWAgb24gYG9iamAuXCJcbiAgW2Ygb2JqIGtleSBydW4gb3B0c11cbiAgKGxldCBbciB0ZW1wLXJlYWN0aW9uXG4gICAgICAgIHJlcyAoZGVyZWYtY2FwdHVyZSBmIHIpXVxuICAgICh3aGVuLW5vdCAobmlsPyAoLi13YXRjaGluZyByKSlcbiAgICAgIChzZXQhIHRlbXAtcmVhY3Rpb24gKG1ha2UtcmVhY3Rpb24gbmlsKSlcbiAgICAgICguX3NldC1vcHRzIHIgb3B0cylcbiAgICAgIChzZXQhICguLWYgcikgZilcbiAgICAgIChzZXQhICguLWF1dG8tcnVuIHIpICMocnVuIG9iaikpXG4gICAgICAob2JqL3NldCBvYmoga2V5IHIpKVxuICAgIHJlcykpXG5cbihkZWZuIGNoZWNrLWRlcmVmcyBbZl1cbiAgKGxldCBbY3R4IChqcy1vYmopXG4gICAgICAgIHJlcyAoaW4tY29udGV4dCBjdHggZildXG4gICAgW3JlcyAoc29tZT8gKC4tY2FwdHVyZWQgY3R4KSldKSlcblxuXG47Ozsgd3JhcFxuXG4oZGVmdHlwZSBXcmFwcGVyIFteOm11dGFibGUgc3RhdGUgY2FsbGJhY2sgXjptdXRhYmxlIF5ib29sZWFuIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgIF46bXV0YWJsZSB3YXRjaGVzXVxuXG4gIElBdG9tXG5cbiAgSURlcmVmXG4gICgtZGVyZWYgW3RoaXNdXG4gICAgKHdoZW4gKGRldj8pXG4gICAgICAod2hlbiAoYW5kIGNoYW5nZWQgKHNvbWU/ICpyYXRvbS1jb250ZXh0KikpXG4gICAgICAgICh3YXJuIFwiZGVyZWZpbmcgc3RhbGUgd3JhcDogXCJcbiAgICAgICAgICAgICAgKHByLXN0ciB0aGlzKSkpKVxuICAgIHN0YXRlKVxuXG4gIElSZXNldFxuICAoLXJlc2V0ISBbdGhpcyBuZXd2YWxdXG4gICAgKGxldCBbb2xkdmFsIHN0YXRlXVxuICAgICAgKHNldCEgY2hhbmdlZCB0cnVlKVxuICAgICAgKHNldCEgc3RhdGUgbmV3dmFsKVxuICAgICAgKHdoZW4gKHNvbWU/IHdhdGNoZXMpXG4gICAgICAgIChub3RpZnktdyB0aGlzIG9sZHZhbCBuZXd2YWwpKVxuICAgICAgKGNhbGxiYWNrIG5ld3ZhbClcbiAgICAgIG5ld3ZhbCkpXG5cbiAgSVN3YXBcbiAgKC1zd2FwISBbYSBmXSAgICAgICAgICAoLXJlc2V0ISBhIChmIHN0YXRlKSkpXG4gICgtc3dhcCEgW2EgZiB4XSAgICAgICAgKC1yZXNldCEgYSAoZiBzdGF0ZSB4KSkpXG4gICgtc3dhcCEgW2EgZiB4IHldICAgICAgKC1yZXNldCEgYSAoZiBzdGF0ZSB4IHkpKSlcbiAgKC1zd2FwISBbYSBmIHggeSBtb3JlXSAoLXJlc2V0ISBhIChhcHBseSBmIHN0YXRlIHggeSBtb3JlKSkpXG5cbiAgSUVxdWl2XG4gICgtZXF1aXYgW18gXmNsaiBvdGhlcl1cbiAgICAgICAgICAoYW5kIChpbnN0YW5jZT8gV3JhcHBlciBvdGhlcilcbiAgICAgICAgICAgICAgIDs7IElmIGVpdGhlciBvZiB0aGUgd3JhcHBlcnMgaGF2ZSBjaGFuZ2VkLCBlcXVhbGl0eVxuICAgICAgICAgICAgICAgOzsgY2Fubm90IGJlIHJlbGllZCBvbi5cbiAgICAgICAgICAgICAgIChub3QgY2hhbmdlZClcbiAgICAgICAgICAgICAgIChub3QgKC4tY2hhbmdlZCBvdGhlcikpXG4gICAgICAgICAgICAgICAoPSBzdGF0ZSAoLi1zdGF0ZSBvdGhlcikpXG4gICAgICAgICAgICAgICAoPSBjYWxsYmFjayAoLi1jYWxsYmFjayBvdGhlcikpKSlcblxuICBJV2F0Y2hhYmxlXG4gICgtbm90aWZ5LXdhdGNoZXMgW3RoaXMgb2xkIG5ld10gKG5vdGlmeS13IHRoaXMgb2xkIG5ldykpXG4gICgtYWRkLXdhdGNoIFt0aGlzIGtleSBmXSAgICAgICAgKGFkZC13IHRoaXMga2V5IGYpKVxuICAoLXJlbW92ZS13YXRjaCBbdGhpcyBrZXldICAgICAgIChyZW1vdmUtdyB0aGlzIGtleSkpXG5cbiAgSVByaW50V2l0aFdyaXRlclxuICAoLXByLXdyaXRlciBbYSB3IG9wdHNdIChwci1hdG9tIGEgdyBvcHRzIFwiV3JhcDpcIikpKVxuXG4oZGVmbiBtYWtlLXdyYXBwZXIgW3ZhbHVlIGNhbGxiYWNrLWZuIGFyZ3NdXG4gICgtPldyYXBwZXIgdmFsdWVcbiAgICAgICAgICAgICAodXRpbC9tYWtlLXBhcnRpYWwtZm4gY2FsbGJhY2stZm4gYXJncylcbiAgICAgICAgICAgICBmYWxzZSBuaWwpKVxuXG5cblxuXG4jXyhkb1xuICAoZGVmbiByYXRvbS1wZXJmIFtdXG4gICAgKHNldCEgZGVidWcgZmFsc2UpXG4gICAgKGRvdGltZXMgW18gMTBdXG4gICAgICAobGV0IFtuaXRlIDEwMDAwMFxuICAgICAgICAgICAgYSAoYXRvbSAwKVxuICAgICAgICAgICAgZiAoZm4gW11cbiAgICAgICAgICAgICAgICAocXVvdCBAYSAxMCkpXG4gICAgICAgICAgICBtaWQgKG1ha2UtcmVhY3Rpb24gZilcbiAgICAgICAgICAgIHJlcyAodHJhY2shIChmbiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICA7OyAod2l0aC1sZXQgW3ggMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDs7IEAodHJhY2sgZilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGluYyBAbWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApKV1cbiAgICAgICAgQHJlc1xuICAgICAgICAodGltZSAoZG90aW1lcyBbeCBuaXRlXVxuICAgICAgICAgICAgICAgIChzd2FwISBhIGluYylcbiAgICAgICAgICAgICAgICAoZmx1c2ghKSkpXG4gICAgICAgIChkaXNwb3NlISByZXMpKSkpXG4gIChyYXRvbS1wZXJmKSlcbiJdfQ==