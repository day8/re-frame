// Compiled by ClojureScript 1.10.597
goog.provide("reagent.debug$macros");
var ret__12562__auto___219 = (function (){
/**
 * Print with console.log, if it exists.
 */
reagent.debug$macros.log = (function reagent$debug$macros$log(var_args){
var args__12462__auto__ = [];
var len__12445__auto___220 = arguments.length;
var i__12446__auto___221 = (0);
while(true){
if((i__12446__auto___221 < len__12445__auto___220)){
args__12462__auto__.push((arguments[i__12446__auto___221]));

var G__222 = (i__12446__auto___221 + (1));
i__12446__auto___221 = G__222;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.log.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.log.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.has-console","reagent.debug.has-console",(-1792886083),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,".log",".log",(565247729),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("js","console","js/console",(-1426368245),null),null,(1),null)),forms)),null,(1),null))));
}));

(reagent.debug$macros.log.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.log.cljs$lang$applyTo = (function (seq216){
var G__217 = cljs.core.first.call(null,seq216);
var seq216__$1 = cljs.core.next.call(null,seq216);
var G__218 = cljs.core.first.call(null,seq216__$1);
var seq216__$2 = cljs.core.next.call(null,seq216__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__217,G__218,seq216__$2);
}));

return null;
})()
;
(reagent.debug$macros.log.cljs$lang$macro = true);

var ret__12562__auto___226 = (function (){
/**
 * Print with console.warn.
 */
reagent.debug$macros.warn = (function reagent$debug$macros$warn(var_args){
var args__12462__auto__ = [];
var len__12445__auto___227 = arguments.length;
var i__12446__auto___228 = (0);
while(true){
if((i__12446__auto___228 < len__12445__auto___227)){
args__12462__auto__.push((arguments[i__12446__auto___228]));

var G__229 = (i__12446__auto___228 + (1));
i__12446__auto___228 = G__229;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.warn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.warn.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.has-console","reagent.debug.has-console",(-1792886083),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,".warn",".warn",(-2099751158),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"if","if",(1181717262),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.tracking","reagent.debug.tracking",(478501764),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.track-console","reagent.debug.track-console",(-179485171),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("js","console","js/console",(-1426368245),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"Warning: ",null,(1),null)),forms)),null,(1),null)))),null,(1),null))));
} else {
return null;
}
}));

(reagent.debug$macros.warn.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.warn.cljs$lang$applyTo = (function (seq223){
var G__224 = cljs.core.first.call(null,seq223);
var seq223__$1 = cljs.core.next.call(null,seq223);
var G__225 = cljs.core.first.call(null,seq223__$1);
var seq223__$2 = cljs.core.next.call(null,seq223__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__224,G__225,seq223__$2);
}));

return null;
})()
;
(reagent.debug$macros.warn.cljs$lang$macro = true);

var ret__12562__auto___234 = (function (){
reagent.debug$macros.warn_unless = (function reagent$debug$macros$warn_unless(var_args){
var args__12462__auto__ = [];
var len__12445__auto___235 = arguments.length;
var i__12446__auto___236 = (0);
while(true){
if((i__12446__auto___236 < len__12445__auto___235)){
args__12462__auto__.push((arguments[i__12446__auto___236]));

var G__237 = (i__12446__auto___236 + (1));
i__12446__auto___236 = G__237;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((3) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((3)),(0),null)):null);
return reagent.debug$macros.warn_unless.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12463__auto__);
});

(reagent.debug$macros.warn_unless.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,cond,forms){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","not","cljs.core/not",(100665144),null),null,(1),null)),(new cljs.core.List(null,cond,null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("reagent.debug","warn","reagent.debug/warn",(-503321706),null),null,(1),null)),forms)),null,(1),null))));
} else {
return null;
}
}));

(reagent.debug$macros.warn_unless.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(reagent.debug$macros.warn_unless.cljs$lang$applyTo = (function (seq230){
var G__231 = cljs.core.first.call(null,seq230);
var seq230__$1 = cljs.core.next.call(null,seq230);
var G__232 = cljs.core.first.call(null,seq230__$1);
var seq230__$2 = cljs.core.next.call(null,seq230__$1);
var G__233 = cljs.core.first.call(null,seq230__$2);
var seq230__$3 = cljs.core.next.call(null,seq230__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__231,G__232,G__233,seq230__$3);
}));

return null;
})()
;
(reagent.debug$macros.warn_unless.cljs$lang$macro = true);

var ret__12562__auto___241 = (function (){
/**
 * Print with console.error.
 */
reagent.debug$macros.error = (function reagent$debug$macros$error(var_args){
var args__12462__auto__ = [];
var len__12445__auto___242 = arguments.length;
var i__12446__auto___243 = (0);
while(true){
if((i__12446__auto___243 < len__12445__auto___242)){
args__12462__auto__.push((arguments[i__12446__auto___243]));

var G__244 = (i__12446__auto___243 + (1));
i__12446__auto___243 = G__244;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.error.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.error.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","when","cljs.core/when",(120293186),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.has-console","reagent.debug.has-console",(-1792886083),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,".error",".error",(1756007195),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"if","if",(1181717262),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.tracking","reagent.debug.tracking",(478501764),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"reagent.debug.track-console","reagent.debug.track-console",(-179485171),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("js","console","js/console",(-1426368245),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),forms)),null,(1),null)))),null,(1),null))));
} else {
return null;
}
}));

(reagent.debug$macros.error.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.error.cljs$lang$applyTo = (function (seq238){
var G__239 = cljs.core.first.call(null,seq238);
var seq238__$1 = cljs.core.next.call(null,seq238);
var G__240 = cljs.core.first.call(null,seq238__$1);
var seq238__$2 = cljs.core.next.call(null,seq238__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__239,G__240,seq238__$2);
}));

return null;
})()
;
(reagent.debug$macros.error.cljs$lang$macro = true);

var ret__12562__auto___248 = (function (){
/**
 * Print string with console.log
 */
reagent.debug$macros.println = (function reagent$debug$macros$println(var_args){
var args__12462__auto__ = [];
var len__12445__auto___249 = arguments.length;
var i__12446__auto___250 = (0);
while(true){
if((i__12446__auto___250 < len__12445__auto___249)){
args__12462__auto__.push((arguments[i__12446__auto___250]));

var G__251 = (i__12446__auto___250 + (1));
i__12446__auto___250 = G__251;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.println.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.println.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("reagent.debug","log","reagent.debug/log",(-528007284),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),forms)),null,(1),null))));
}));

(reagent.debug$macros.println.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.println.cljs$lang$applyTo = (function (seq245){
var G__246 = cljs.core.first.call(null,seq245);
var seq245__$1 = cljs.core.next.call(null,seq245);
var G__247 = cljs.core.first.call(null,seq245__$1);
var seq245__$2 = cljs.core.next.call(null,seq245__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__246,G__247,seq245__$2);
}));

return null;
})()
;
(reagent.debug$macros.println.cljs$lang$macro = true);

var ret__12562__auto___255 = (function (){
/**
 * Like standard prn, but prints using console.log (so that we get
 * nice clickable links to source in modern browsers).
 */
reagent.debug$macros.prn = (function reagent$debug$macros$prn(var_args){
var args__12462__auto__ = [];
var len__12445__auto___256 = arguments.length;
var i__12446__auto___257 = (0);
while(true){
if((i__12446__auto___257 < len__12445__auto___256)){
args__12462__auto__.push((arguments[i__12446__auto___257]));

var G__258 = (i__12446__auto___257 + (1));
i__12446__auto___257 = G__258;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.prn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.prn.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("reagent.debug","log","reagent.debug/log",(-528007284),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),forms)),null,(1),null))));
}));

(reagent.debug$macros.prn.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.prn.cljs$lang$applyTo = (function (seq252){
var G__253 = cljs.core.first.call(null,seq252);
var seq252__$1 = cljs.core.next.call(null,seq252);
var G__254 = cljs.core.first.call(null,seq252__$1);
var seq252__$2 = cljs.core.next.call(null,seq252__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__253,G__254,seq252__$2);
}));

return null;
})()
;
(reagent.debug$macros.prn.cljs$lang$macro = true);

var ret__12562__auto___259 = /**
 * Useful debugging macro that prints the source and value of x,
 * as well as package name and line number. Returns x.
 */
reagent.debug$macros.dbg = (function reagent$debug$macros$dbg(_AMPERSAND_form,_AMPERSAND_env,x){
var ns = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_);
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"x__10__auto__","x__10__auto__",(177426456),null),null,(1),null)),(new cljs.core.List(null,x,null,(1),null))))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("reagent.debug","println","reagent.debug/println",(1987012298),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"dbg ",null,(1),null)),(new cljs.core.List(null,ns,null,(1),null)),(new cljs.core.List(null,":",null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"line","line",(212345235)).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,_AMPERSAND_form)),null,(1),null)),(new cljs.core.List(null,": ",null,(1),null)),(new cljs.core.List(null,cljs.core.pr_str.call(null,x),null,(1),null)),(new cljs.core.List(null,": ",null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"x__10__auto__","x__10__auto__",(177426456),null),null,(1),null)))),null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"x__10__auto__","x__10__auto__",(177426456),null),null,(1),null))));
});
(reagent.debug$macros.dbg.cljs$lang$macro = true);

var ret__12562__auto___260 = /**
 * True if assertions are enabled.
 */
reagent.debug$macros.dev_QMARK_ = (function reagent$debug$macros$dev_QMARK_(_AMPERSAND_form,_AMPERSAND_env){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return true;
} else {
return false;
}
});
(reagent.debug$macros.dev_QMARK_.cljs$lang$macro = true);

var ret__12562__auto___264 = (function (){
reagent.debug$macros.time = (function reagent$debug$macros$time(var_args){
var args__12462__auto__ = [];
var len__12445__auto___265 = arguments.length;
var i__12446__auto___266 = (0);
while(true){
if((i__12446__auto___266 < len__12445__auto___265)){
args__12462__auto__.push((arguments[i__12446__auto___266]));

var G__267 = (i__12446__auto___266 + (1));
i__12446__auto___266 = G__267;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.debug$macros.time.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.debug$macros.time.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,forms){
var ns = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_);
var label = [ns,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"line","line",(212345235)).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,_AMPERSAND_form)))].join('');
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"label__11__auto__","label__11__auto__",(1957778213),null),null,(1),null)),(new cljs.core.List(null,label,null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"res__12__auto__","res__12__auto__",(-1656404752),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",(1686842252),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("js","console.time","js/console.time",(891683584),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"label__11__auto__","label__11__auto__",(1957778213),null),null,(1),null)))),null,(1),null)),forms)),null,(1),null))))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("js","console.timeEnd","js/console.timeEnd",(274714029),null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"label__11__auto__","label__11__auto__",(1957778213),null),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"res__12__auto__","res__12__auto__",(-1656404752),null),null,(1),null))));
}));

(reagent.debug$macros.time.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.debug$macros.time.cljs$lang$applyTo = (function (seq261){
var G__262 = cljs.core.first.call(null,seq261);
var seq261__$1 = cljs.core.next.call(null,seq261);
var G__263 = cljs.core.first.call(null,seq261__$1);
var seq261__$2 = cljs.core.next.call(null,seq261__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__262,G__263,seq261__$2);
}));

return null;
})()
;
(reagent.debug$macros.time.cljs$lang$macro = true);

var ret__12562__auto___268 = reagent.debug$macros.assert_some = (function reagent$debug$macros$assert_some(_AMPERSAND_form,_AMPERSAND_env,value,tag){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assert","cljs.core/assert",(1075777968),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,tag,null,(1),null)),(new cljs.core.List(null," must not be nil",null,(1),null)))),null,(1),null))));
});
(reagent.debug$macros.assert_some.cljs$lang$macro = true);

var ret__12562__auto___269 = reagent.debug$macros.assert_component = (function reagent$debug$macros$assert_component(_AMPERSAND_form,_AMPERSAND_env,value){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assert","cljs.core/assert",(1075777968),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("comp","reagent-component?","comp/reagent-component?",(1494246810),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"Expected a reagent component, not ",null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null))));
});
(reagent.debug$macros.assert_component.cljs$lang$macro = true);

var ret__12562__auto___270 = reagent.debug$macros.assert_js_object = (function reagent$debug$macros$assert_js_object(_AMPERSAND_form,_AMPERSAND_env,value){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assert","cljs.core/assert",(1075777968),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","not","cljs.core/not",(100665144),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",(-1390345523),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"Expected a JS object, not ",null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null))));
});
(reagent.debug$macros.assert_js_object.cljs$lang$macro = true);

var ret__12562__auto___271 = reagent.debug$macros.assert_new_state = (function reagent$debug$macros$assert_new_state(_AMPERSAND_form,_AMPERSAND_env,value){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assert","cljs.core/assert",(1075777968),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","or","cljs.core/or",(1201033885),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","nil?","cljs.core/nil?",(945071861),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",(-1390345523),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"Expected a valid new state, not ",null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null))));
});
(reagent.debug$macros.assert_new_state.cljs$lang$macro = true);

var ret__12562__auto___272 = reagent.debug$macros.assert_callable = (function reagent$debug$macros$assert_callable(_AMPERSAND_form,_AMPERSAND_env,value){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","assert","cljs.core/assert",(1075777968),null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",(1573873861),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null),null,(1),null)),(new cljs.core.List(null,"Expected something callable, not ",null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",(-552799478),null),null,(1),null)),(new cljs.core.List(null,value,null,(1),null)))),null,(1),null)))),null,(1),null))));
});
(reagent.debug$macros.assert_callable.cljs$lang$macro = true);


//# sourceURL=reagent/debug$macros.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9kZWJ1ZyRtYWNyb3MuanMiLCJzb3VyY2VzIjpbImRlYnVnJG1hY3Jvcy5jbGpzIl0sImxpbmVDb3VudCI6Mzc3LCJtYXBwaW5ncyI6IjtBQUlBLElBQUFBLHlCQUFBO0FBQUE7OzsyQkFBQSxtQ0FBQUMsOURBQVVLO0FBQVYsQUFBQSxJQUFBSixzQkFBQTtBQUFBLEFBQUEsSUFBQUMseUJBQUEsQUFBQTtBQUFBLEFBQUEsSUFBQUMsdUJBQUE7O0FBQUEsQUFBQSxHQUFBLENBQUFBLHVCQUFBRDtBQUFBLEFBQUEsQUFBQUQseUJBQUEsQ0FBQSxVQUFBRTs7QUFBQSxhQUFBLENBQUFBLHVCQUFBOzs7O0FBQUE7Ozs7QUFBQSxJQUFBQyx3QkFBQSxFQUFBLENBQUEsTUFBQSxBQUFBSCw2QkFBQSxBQUFBLDBCQUFBLEFBQUFBLDBCQUFBLEtBQUEsSUFBQSxPQUFBLC9EQThsR3NENEQ7QUE5bEd0RCxBQUFBLE9BQUF4RCw4REFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUEsTUFBQUQ7OztBQUFBLEFBQUEsQ0FBQSxnRUFBQSxXQUFBRSxnQkFBQUMsM0ZBQVVGLDBHQUVMVTtBQUZMLEFBQUEsT0FBQVAsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsMkVBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUEsc0dBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLDBEQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBLHFFQUFBLEtBQUEsSUFBQSxlQUFBLEtBQUEsSUFBQSxqQkFJd0JLOzs7QUFKeEIsQ0FBQSxtREFBQSxuREFBVVY7O0FBQVY7QUFBQSxDQUFBLDZDQUFBLFdBQUFNLHhEQUFVTjtBQUFWLEFBQUEsSUFBQU8sU0FBQSwwQkFBQUQsMUJBK2hHZ0RnRDtJQS9oR2hEaEQsYUFBQSx5QkFBQUEs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Qyx0R0FBVW1ELHFIQUFpQkw7QUFBM0IsQUFBQSxPQUFBN0MsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsZ0ZBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLEFBQUFGLDZCQUFBLEFBQUFDLDJCQUFBLEtBQUFDLGVBQUEsS0FBQSxBQUFBLDRFQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsV0FBQSxLQUFBLElBQUEsU0FBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLEtBQUEsQUFBQUYsNkJBQUEsQUFBQUMsMkJBQUEsS0FBQUMsZUFBQSxLQUFBLEFBQUEsMkVBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQUEsZUFBQSxLQUFBLG9DQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUFBLGVBQUEsS0FBQSxBQUFBRiw2QkFBQSxBQUFBQywyQkFBQSxLQUFBQyxlQUFBLEtBQUEsQUFBQSxnRkFBQSxLQUFBLElBQUEsT0FBQSxLQUFBQSxlQUFBLFdBQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxJQUFBLGhsQkFDa0IyQyw2aEJBRU9BOztBQUh6QixBQUFBLENBQUEsdURBQUEsdkRBQVVLOztBQUFWM0QiLCJuYW1lcyI6WyJyZXRfXzEyNTYyX19hdXRvX18iLCJ2YXJfYXJncyIsImFyZ3NfXzEyNDYyX19hdXRvX18iLCJsZW5fXzEyNDQ1X19hdXRvX18iLCJpX18xMjQ0Nl9fYXV0b19fIiwiYXJnc2VxX18xMjQ2M19fYXV0b19fIiwicmVhZ2VudC5kZWJ1ZyRtYWNyb3MvbG9nIiwiJmZvcm0iLCImZW52IiwiY2xqcy5jb3JlL3NlcXVlbmNlIiwiY2xqcy5jb3JlL2NvbmNhdCIsImNsanMuY29yZS9MaXN0Iiwic2VxMjE2IiwiR19fMjE3IiwiR19fMjE4Iiwic2VsZl9fMTI0MjBfX2F1dG9fXyIsImZvcm1zIiwicmVhZ2VudC5kZWJ1ZyRtYWNyb3Mvd2FybiIsInNlcTIyMyIsIkdfXzIyNCIsIkdfXzIyNSIsImNsanMuY29yZS8qYXNzZXJ0KiIsInJlYWdlbnQuZGVidWckbWFjcm9zL3dhcm4tdW5sZXNzIiwic2VxMjMwIiwiR19fMjMxIiwiR19fMjMyIiwiR19fMjMzIiwiY29uZCIsInJlYWdlbnQuZGVidWckbWFjcm9zL2Vycm9yIiwic2VxMjM4IiwiR19fMjM5IiwiR19fMjQwIiwicmVhZ2VudC5kZWJ1ZyRtYWNyb3MvcHJpbnRsbiIsInNlcTI0NSIsIkdfXzI0NiIsIkdfXzI0NyIsInJlYWdlbnQuZGVidWckbWFjcm9zL3BybiIsInNlcTI1MiIsIkdfXzI1MyIsIkdfXzI1NCIsInJlYWdlbnQuZGVidWckbWFjcm9zL2RiZyIsIngiLCJjbGpzLmNvcmUvdmVjIiwibnMiLCJjbGpzLmFuYWx5emVyLypjbGpzLW5zKiIsImNsanMuY29yZS9tZXRhIiwiY2xqcy5jb3JlL3ByLXN0ciIsInJlYWdlbnQuZGVidWckbWFjcm9zL2Rldj8iLCJyZWFnZW50LmRlYnVnJG1hY3Jvcy90aW1lIiwic2VxMjYxIiwiR19fMjYyIiwiR19fMjYzIiwibGFiZWwiLCJyZWFnZW50LmRlYnVnJG1hY3Jvcy9hc3NlcnQtc29tZSIsInZhbHVlIiwidGFnIiwicmVhZ2VudC5kZWJ1ZyRtYWNyb3MvYXNzZXJ0LWNvbXBvbmVudCIsInJlYWdlbnQuZGVidWckbWFjcm9zL2Fzc2VydC1qcy1vYmplY3QiLCJyZWFnZW50LmRlYnVnJG1hY3Jvcy9hc3NlcnQtbmV3LXN0YXRlIiwicmVhZ2VudC5kZWJ1ZyRtYWNyb3MvYXNzZXJ0LWNhbGxhYmxlIiwiY2xqcy5jb3JlL2ZpcnN0IiwiY2xqcy5jb3JlL25leHQiLCJjbGpzLmNvcmUvSW5kZXhlZFNlcSJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgcmVhZ2VudC5kZWJ1Z1xuICAoOnJlZmVyLWNsb2p1cmUgOmV4Y2x1ZGUgW3BybiBwcmludGxuIHRpbWVdKVxuICAoOnJlcXVpcmUgW2NsanMuYW5hbHl6ZXIgOmFzIGFuYWx5emVyXSkpXG5cbihkZWZtYWNybyBsb2dcbiAgXCJQcmludCB3aXRoIGNvbnNvbGUubG9nLCBpZiBpdCBleGlzdHMuXCJcbiAgWyYgZm9ybXNdXG4gIGAod2hlbiByZWFnZW50LmRlYnVnLmhhcy1jb25zb2xlXG4gICAgICgubG9nIGpzL2NvbnNvbGUgfkBmb3JtcykpKVxuXG4oZGVmbWFjcm8gd2FyblxuICBcIlByaW50IHdpdGggY29uc29sZS53YXJuLlwiXG4gIFsmIGZvcm1zXVxuICAod2hlbiAqYXNzZXJ0KlxuICAgIGAod2hlbiByZWFnZW50LmRlYnVnLmhhcy1jb25zb2xlXG4gICAgICAgKC53YXJuIChpZiByZWFnZW50LmRlYnVnLnRyYWNraW5nXG4gICAgICAgICAgICAgICAgcmVhZ2VudC5kZWJ1Zy50cmFjay1jb25zb2xlIGpzL2NvbnNvbGUpXG4gICAgICAgICAgICAgIChzdHIgXCJXYXJuaW5nOiBcIiB+QGZvcm1zKSkpKSlcblxuKGRlZm1hY3JvIHdhcm4tdW5sZXNzXG4gIFtjb25kICYgZm9ybXNdXG4gICh3aGVuICphc3NlcnQqXG4gICAgYCh3aGVuIChub3QgfmNvbmQpXG4gICAgICAgKHdhcm4gfkBmb3JtcykpKSlcblxuKGRlZm1hY3JvIGVycm9yXG4gIFwiUHJpbnQgd2l0aCBjb25zb2xlLmVycm9yLlwiXG4gIFsmIGZvcm1zXVxuICAod2hlbiAqYXNzZXJ0KlxuICAgIGAod2hlbiByZWFnZW50LmRlYnVnLmhhcy1jb25zb2xlXG4gICAgICAgKC5lcnJvciAoaWYgcmVhZ2VudC5kZWJ1Zy50cmFja2luZ1xuICAgICAgICAgICAgICAgICByZWFnZW50LmRlYnVnLnRyYWNrLWNvbnNvbGUganMvY29uc29sZSlcbiAgICAgICAgICAgICAgIChzdHIgfkBmb3JtcykpKSkpXG5cbihkZWZtYWNybyBwcmludGxuXG4gIFwiUHJpbnQgc3RyaW5nIHdpdGggY29uc29sZS5sb2dcIlxuICBbJiBmb3Jtc11cbiAgYChsb2cgKHN0ciB+QGZvcm1zKSkpXG5cbihkZWZtYWNybyBwcm5cbiAgXCJMaWtlIHN0YW5kYXJkIHBybiwgYnV0IHByaW50cyB1c2luZyBjb25zb2xlLmxvZyAoc28gdGhhdCB3ZSBnZXRcbm5pY2UgY2xpY2thYmxlIGxpbmtzIHRvIHNvdXJjZSBpbiBtb2Rlcm4gYnJvd3NlcnMpLlwiXG4gIFsmIGZvcm1zXVxuICBgKGxvZyAocHItc3RyIH5AZm9ybXMpKSlcblxuKGRlZm1hY3JvIGRiZ1xuICBcIlVzZWZ1bCBkZWJ1Z2dpbmcgbWFjcm8gdGhhdCBwcmludHMgdGhlIHNvdXJjZSBhbmQgdmFsdWUgb2YgeCxcbmFzIHdlbGwgYXMgcGFja2FnZSBuYW1lIGFuZCBsaW5lIG51bWJlci4gUmV0dXJucyB4LlwiXG4gIFt4XVxuICAobGV0IFtucyAoc3RyIGFuYWx5emVyLypjbGpzLW5zKildXG4gICAgYChsZXQgW3gjIH54XVxuICAgICAgIChwcmludGxuIChzdHIgXCJkYmcgXCJcbiAgICAgICAgICAgICAgICAgICAgIH5ucyBcIjpcIlxuICAgICAgICAgICAgICAgICAgICAgfig6bGluZSAobWV0YSAmZm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICBcIjogXCJcbiAgICAgICAgICAgICAgICAgICAgIH4ocHItc3RyIHgpXG4gICAgICAgICAgICAgICAgICAgICBcIjogXCJcbiAgICAgICAgICAgICAgICAgICAgIChwci1zdHIgeCMpKSlcbiAgICAgICB4IykpKVxuXG4oZGVmbWFjcm8gZGV2P1xuICBcIlRydWUgaWYgYXNzZXJ0aW9ucyBhcmUgZW5hYmxlZC5cIlxuICBbXVxuICAoaWYgKmFzc2VydCogdHJ1ZSBmYWxzZSkpXG5cbihkZWZtYWNybyB0aW1lIFsmIGZvcm1zXVxuICAobGV0IFtucyAoc3RyIGFuYWx5emVyLypjbGpzLW5zKilcbiAgICAgICAgbGFiZWwgKHN0ciBucyBcIjpcIiAoOmxpbmUgKG1ldGEgJmZvcm0pKSldXG4gICAgYChsZXQgW2xhYmVsIyB+bGFiZWxcbiAgICAgICAgICAgcmVzIyAoZG9cbiAgICAgICAgICAgICAgICAgIChqcy9jb25zb2xlLnRpbWUgbGFiZWwjKVxuICAgICAgICAgICAgICAgICAgfkBmb3JtcyldXG4gICAgICAgKGpzL2NvbnNvbGUudGltZUVuZCBsYWJlbCMpXG4gICAgICAgcmVzIykpKVxuXG4oZGVmbWFjcm8gYXNzZXJ0LXNvbWUgW3ZhbHVlIHRhZ11cbiAgYChhc3NlcnQgfnZhbHVlIChzdHIgfnRhZyBcIiBtdXN0IG5vdCBiZSBuaWxcIikpKVxuXG4oZGVmbWFjcm8gYXNzZXJ0LWNvbXBvbmVudCBbdmFsdWVdXG4gIGAoYXNzZXJ0IChjb21wL3JlYWdlbnQtY29tcG9uZW50PyB+dmFsdWUpXG4gICAgICAgICAgIChzdHIgXCJFeHBlY3RlZCBhIHJlYWdlbnQgY29tcG9uZW50LCBub3QgXCJcbiAgICAgICAgICAgICAgICAocHItc3RyIH52YWx1ZSkpKSlcblxuKGRlZm1hY3JvIGFzc2VydC1qcy1vYmplY3QgW3ZhbHVlXVxuICBgKGFzc2VydCAobm90IChtYXA/IH52YWx1ZSkpXG4gICAgICAgICAgIChzdHIgXCJFeHBlY3RlZCBhIEpTIG9iamVjdCwgbm90IFwiXG4gICAgICAgICAgICAgICAgKHByLXN0ciB+dmFsdWUpKSkpXG5cbihkZWZtYWNybyBhc3NlcnQtbmV3LXN0YXRlIFt2YWx1ZV1cbiAgYChhc3NlcnQgKG9yIChuaWw/IH52YWx1ZSkgKG1hcD8gfnZhbHVlKSlcbiAgICAgICAgICAgKHN0ciBcIkV4cGVjdGVkIGEgdmFsaWQgbmV3IHN0YXRlLCBub3QgXCJcbiAgICAgICAgICAgICAgICAocHItc3RyIH52YWx1ZSkpKSlcblxuKGRlZm1hY3JvIGFzc2VydC1jYWxsYWJsZSBbdmFsdWVdXG4gIGAoYXNzZXJ0IChpZm4/IH52YWx1ZSlcbiAgICAgICAgICAgKHN0ciBcIkV4cGVjdGVkIHNvbWV0aGluZyBjYWxsYWJsZSwgbm90IFwiXG4gICAgICAgICAgICAgICAgKHByLXN0ciB+dmFsdWUpKSkpXG4iXX0=