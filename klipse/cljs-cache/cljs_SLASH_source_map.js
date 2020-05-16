// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__16433){
var vec__16434 = p__16433;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16434,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16434,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources(sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1.call(null,a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1.call(null,b)));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__16440 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__6738__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(seg));
if(cljs.core.truth_(temp__6738__auto__)){
var name__$1 = temp__6738__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__16463 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16463,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16463,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16463,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16463,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16463,(4),null);
var vec__16466 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16466,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16466,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16466,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16466,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16466,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__9439__auto__ = source;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__9439__auto__ = line;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__9439__auto__ = col;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__9439__auto__ = name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta(nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__16489 = segmap;
var map__16489__$1 = ((((!((map__16489 == null)))?((((map__16489.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16489.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16489):map__16489);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16489__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16489__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16489__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16489__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16489__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
});})(map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});})(map__16489,map__16489__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args16493 = [];
var len__10660__auto___16539 = arguments.length;
var i__10661__auto___16540 = (0);
while(true){
if((i__10661__auto___16540 < len__10660__auto___16539)){
args16493.push((arguments[i__10661__auto___16540]));

var G__16541 = (i__10661__auto___16540 + (1));
i__10661__auto___16540 = G__16541;
continue;
} else {
}
break;
}

var G__16535 = args16493.length;
switch (G__16535) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args16493.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by(cljs.source_map.source_compare(sources));
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__16536 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__16551 = cljs.core.next(segs__$1);
var G__16552 = nrelseg;
var G__16553 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__16551;
relseg__$1 = G__16552;
result__$1 = G__16553;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16536,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16536,(1),null);
var G__16563 = (gline + (1));
var G__16564 = cljs.core.next(lines__$1);
var G__16565 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__16566 = result__$1;
gline = G__16563;
lines__$1 = G__16564;
relseg = G__16565;
result = G__16566;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__16570 = segmap;
var map__16570__$1 = ((((!((map__16570 == null)))?((((map__16570.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16570.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16570):map__16570);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16570__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16570__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16570__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16570__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16570__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16570,map__16570__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16570,map__16570__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__16567_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__16567_SHARP_,d__$1);
});})(map__16570,map__16570__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__16570,map__16570__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args16588 = [];
var len__10660__auto___16594 = arguments.length;
var i__10661__auto___16595 = (0);
while(true){
if((i__10661__auto___16595 < len__10660__auto___16594)){
args16588.push((arguments[i__10661__auto___16595]));

var G__16597 = (i__10661__auto___16595 + (1));
i__10661__auto___16595 = G__16597;
continue;
} else {
}
break;
}

var G__16590 = args16588.length;
switch (G__16590) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args16588.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__16591 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__16600 = cljs.core.next(segs__$1);
var G__16601 = nrelseg;
var G__16602 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__16600;
relseg__$1 = G__16601;
result__$1 = G__16602;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16591,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16591,(1),null);
var G__16603 = (gline + (1));
var G__16604 = cljs.core.next(lines__$1);
var G__16605 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__16606 = result__$1;
gline = G__16603;
lines__$1 = G__16604;
relseg = G__16605;
result = G__16606;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = (function (){var G__16624 = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__16624) : cljs.core.atom.call(null,G__16624));
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (relseg){
return (function (p__16625){
var vec__16626 = p__16625;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16626,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16626,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16626,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16626,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16626,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (cols__$1,p__16629){
var vec__16630 = p__16629;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(4),null);
var seg = vec__16630;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(relseg) : cljs.core.deref.call(null,relseg)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (offset,vec__16630,gcol,sidx,line,col,name,seg,relseg){
return (function (p__16633){
var vec__16634 = p__16633;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16634,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16634,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16634,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16634,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16634,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__9439__auto__ = name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__16630,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = (function (){var G__16735 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__16735) : cljs.core.atom.call(null,G__16735));
})();
var names__GT_idx = (function (){var G__16736 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__16736) : cljs.core.atom.call(null,G__16736));
})();
var name_idx = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__6736__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__6736__auto__)){
var name = temp__6736__auto__;
var idx = (function (){var temp__6736__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx)),name);
if(cljs.core.truth_(temp__6736__auto____$1)){
var idx = temp__6736__auto____$1;
return idx;
} else {
var cidx = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(name_idx) : cljs.core.deref.call(null,name_idx));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__16737 = cljs.core.seq(infos);
var chunk__16738 = null;
var count__16739 = (0);
var i__16740 = (0);
while(true){
if((i__16740 < count__16739)){
var info = chunk__16738.cljs$core$IIndexed$_nth$arity$2(null,i__16740);
var segv_16831 = info__GT_segv(info,source_idx,line,col);
var gline_16832 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_16833 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_16832 > (lc_16833 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16737,chunk__16738,count__16739,i__16740,segv_16831,gline_16832,lc_16833,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_16832 - (lc_16833 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_16831], null));
});})(seq__16737,chunk__16738,count__16739,i__16740,segv_16831,gline_16832,lc_16833,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16737,chunk__16738,count__16739,i__16740,segv_16831,gline_16832,lc_16833,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_16832], null),cljs.core.conj,segv_16831);
});})(seq__16737,chunk__16738,count__16739,i__16740,segv_16831,gline_16832,lc_16833,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__16834 = seq__16737;
var G__16835 = chunk__16738;
var G__16836 = count__16739;
var G__16837 = (i__16740 + (1));
seq__16737 = G__16834;
chunk__16738 = G__16835;
count__16739 = G__16836;
i__16740 = G__16837;
continue;
} else {
var temp__6738__auto__ = cljs.core.seq(seq__16737);
if(temp__6738__auto__){
var seq__16737__$1 = temp__6738__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16737__$1)){
var c__10350__auto__ = cljs.core.chunk_first(seq__16737__$1);
var G__16838 = cljs.core.chunk_rest(seq__16737__$1);
var G__16839 = c__10350__auto__;
var G__16840 = cljs.core.count(c__10350__auto__);
var G__16841 = (0);
seq__16737 = G__16838;
chunk__16738 = G__16839;
count__16739 = G__16840;
i__16740 = G__16841;
continue;
} else {
var info = cljs.core.first(seq__16737__$1);
var segv_16842 = info__GT_segv(info,source_idx,line,col);
var gline_16843 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_16844 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_16843 > (lc_16844 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16737,chunk__16738,count__16739,i__16740,segv_16842,gline_16843,lc_16844,info,seq__16737__$1,temp__6738__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_16843 - (lc_16844 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_16842], null));
});})(seq__16737,chunk__16738,count__16739,i__16740,segv_16842,gline_16843,lc_16844,info,seq__16737__$1,temp__6738__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16737,chunk__16738,count__16739,i__16740,segv_16842,gline_16843,lc_16844,info,seq__16737__$1,temp__6738__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_16843], null),cljs.core.conj,segv_16842);
});})(seq__16737,chunk__16738,count__16739,i__16740,segv_16842,gline_16843,lc_16844,info,seq__16737__$1,temp__6738__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__16845 = cljs.core.next(seq__16737__$1);
var G__16846 = null;
var G__16847 = (0);
var G__16848 = (0);
seq__16737 = G__16845;
chunk__16738 = G__16846;
count__16739 = G__16847;
i__16740 = G__16848;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__16741_16849 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__16742_16850 = null;
var count__16743_16851 = (0);
var i__16744_16852 = (0);
while(true){
if((i__16744_16852 < count__16743_16851)){
var vec__16745_16853 = chunk__16742_16850.cljs$core$IIndexed$_nth$arity$2(null,i__16744_16852);
var source_idx_16854 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16745_16853,(0),null);
var vec__16748_16855 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16745_16853,(1),null);
var __16856 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16748_16855,(0),null);
var lines_16857__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16748_16855,(1),null);
var seq__16751_16858 = cljs.core.seq(lines_16857__$1);
var chunk__16752_16859 = null;
var count__16753_16860 = (0);
var i__16754_16861 = (0);
while(true){
if((i__16754_16861 < count__16753_16860)){
var vec__16755_16864 = chunk__16752_16859.cljs$core$IIndexed$_nth$arity$2(null,i__16754_16861);
var line_16865 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16755_16864,(0),null);
var cols_16866 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16755_16864,(1),null);
var seq__16758_16869 = cljs.core.seq(cols_16866);
var chunk__16759_16870 = null;
var count__16760_16871 = (0);
var i__16761_16872 = (0);
while(true){
if((i__16761_16872 < count__16760_16871)){
var vec__16762_16877 = chunk__16759_16870.cljs$core$IIndexed$_nth$arity$2(null,i__16761_16872);
var col_16878 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16762_16877,(0),null);
var infos_16879 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16762_16877,(1),null);
encode_cols(infos_16879,source_idx_16854,line_16865,col_16878);

var G__16881 = seq__16758_16869;
var G__16882 = chunk__16759_16870;
var G__16883 = count__16760_16871;
var G__16884 = (i__16761_16872 + (1));
seq__16758_16869 = G__16881;
chunk__16759_16870 = G__16882;
count__16760_16871 = G__16883;
i__16761_16872 = G__16884;
continue;
} else {
var temp__6738__auto___16885 = cljs.core.seq(seq__16758_16869);
if(temp__6738__auto___16885){
var seq__16758_16886__$1 = temp__6738__auto___16885;
if(cljs.core.chunked_seq_QMARK_(seq__16758_16886__$1)){
var c__10350__auto___16887 = cljs.core.chunk_first(seq__16758_16886__$1);
var G__16888 = cljs.core.chunk_rest(seq__16758_16886__$1);
var G__16889 = c__10350__auto___16887;
var G__16890 = cljs.core.count(c__10350__auto___16887);
var G__16891 = (0);
seq__16758_16869 = G__16888;
chunk__16759_16870 = G__16889;
count__16760_16871 = G__16890;
i__16761_16872 = G__16891;
continue;
} else {
var vec__16765_16892 = cljs.core.first(seq__16758_16886__$1);
var col_16893 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16765_16892,(0),null);
var infos_16894 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16765_16892,(1),null);
encode_cols(infos_16894,source_idx_16854,line_16865,col_16893);

var G__16895 = cljs.core.next(seq__16758_16886__$1);
var G__16896 = null;
var G__16897 = (0);
var G__16898 = (0);
seq__16758_16869 = G__16895;
chunk__16759_16870 = G__16896;
count__16760_16871 = G__16897;
i__16761_16872 = G__16898;
continue;
}
} else {
}
}
break;
}

var G__16899 = seq__16751_16858;
var G__16900 = chunk__16752_16859;
var G__16901 = count__16753_16860;
var G__16902 = (i__16754_16861 + (1));
seq__16751_16858 = G__16899;
chunk__16752_16859 = G__16900;
count__16753_16860 = G__16901;
i__16754_16861 = G__16902;
continue;
} else {
var temp__6738__auto___16903 = cljs.core.seq(seq__16751_16858);
if(temp__6738__auto___16903){
var seq__16751_16904__$1 = temp__6738__auto___16903;
if(cljs.core.chunked_seq_QMARK_(seq__16751_16904__$1)){
var c__10350__auto___16905 = cljs.core.chunk_first(seq__16751_16904__$1);
var G__16906 = cljs.core.chunk_rest(seq__16751_16904__$1);
var G__16907 = c__10350__auto___16905;
var G__16908 = cljs.core.count(c__10350__auto___16905);
var G__16909 = (0);
seq__16751_16858 = G__16906;
chunk__16752_16859 = G__16907;
count__16753_16860 = G__16908;
i__16754_16861 = G__16909;
continue;
} else {
var vec__16768_16910 = cljs.core.first(seq__16751_16904__$1);
var line_16911 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16768_16910,(0),null);
var cols_16912 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16768_16910,(1),null);
var seq__16771_16913 = cljs.core.seq(cols_16912);
var chunk__16772_16914 = null;
var count__16773_16915 = (0);
var i__16774_16916 = (0);
while(true){
if((i__16774_16916 < count__16773_16915)){
var vec__16775_16917 = chunk__16772_16914.cljs$core$IIndexed$_nth$arity$2(null,i__16774_16916);
var col_16918 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16775_16917,(0),null);
var infos_16919 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16775_16917,(1),null);
encode_cols(infos_16919,source_idx_16854,line_16911,col_16918);

var G__16920 = seq__16771_16913;
var G__16921 = chunk__16772_16914;
var G__16922 = count__16773_16915;
var G__16923 = (i__16774_16916 + (1));
seq__16771_16913 = G__16920;
chunk__16772_16914 = G__16921;
count__16773_16915 = G__16922;
i__16774_16916 = G__16923;
continue;
} else {
var temp__6738__auto___16924__$1 = cljs.core.seq(seq__16771_16913);
if(temp__6738__auto___16924__$1){
var seq__16771_16925__$1 = temp__6738__auto___16924__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16771_16925__$1)){
var c__10350__auto___16926 = cljs.core.chunk_first(seq__16771_16925__$1);
var G__16927 = cljs.core.chunk_rest(seq__16771_16925__$1);
var G__16928 = c__10350__auto___16926;
var G__16929 = cljs.core.count(c__10350__auto___16926);
var G__16930 = (0);
seq__16771_16913 = G__16927;
chunk__16772_16914 = G__16928;
count__16773_16915 = G__16929;
i__16774_16916 = G__16930;
continue;
} else {
var vec__16778_16931 = cljs.core.first(seq__16771_16925__$1);
var col_16932 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16778_16931,(0),null);
var infos_16933 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16778_16931,(1),null);
encode_cols(infos_16933,source_idx_16854,line_16911,col_16932);

var G__16934 = cljs.core.next(seq__16771_16925__$1);
var G__16935 = null;
var G__16936 = (0);
var G__16937 = (0);
seq__16771_16913 = G__16934;
chunk__16772_16914 = G__16935;
count__16773_16915 = G__16936;
i__16774_16916 = G__16937;
continue;
}
} else {
}
}
break;
}

var G__16938 = cljs.core.next(seq__16751_16904__$1);
var G__16939 = null;
var G__16940 = (0);
var G__16941 = (0);
seq__16751_16858 = G__16938;
chunk__16752_16859 = G__16939;
count__16753_16860 = G__16940;
i__16754_16861 = G__16941;
continue;
}
} else {
}
}
break;
}

var G__16942 = seq__16741_16849;
var G__16943 = chunk__16742_16850;
var G__16944 = count__16743_16851;
var G__16945 = (i__16744_16852 + (1));
seq__16741_16849 = G__16942;
chunk__16742_16850 = G__16943;
count__16743_16851 = G__16944;
i__16744_16852 = G__16945;
continue;
} else {
var temp__6738__auto___16946 = cljs.core.seq(seq__16741_16849);
if(temp__6738__auto___16946){
var seq__16741_16947__$1 = temp__6738__auto___16946;
if(cljs.core.chunked_seq_QMARK_(seq__16741_16947__$1)){
var c__10350__auto___16948 = cljs.core.chunk_first(seq__16741_16947__$1);
var G__16949 = cljs.core.chunk_rest(seq__16741_16947__$1);
var G__16950 = c__10350__auto___16948;
var G__16951 = cljs.core.count(c__10350__auto___16948);
var G__16952 = (0);
seq__16741_16849 = G__16949;
chunk__16742_16850 = G__16950;
count__16743_16851 = G__16951;
i__16744_16852 = G__16952;
continue;
} else {
var vec__16781_16953 = cljs.core.first(seq__16741_16947__$1);
var source_idx_16954 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16781_16953,(0),null);
var vec__16784_16955 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16781_16953,(1),null);
var __16956 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16784_16955,(0),null);
var lines_16957__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16784_16955,(1),null);
var seq__16787_16958 = cljs.core.seq(lines_16957__$1);
var chunk__16788_16959 = null;
var count__16789_16960 = (0);
var i__16790_16961 = (0);
while(true){
if((i__16790_16961 < count__16789_16960)){
var vec__16791_16962 = chunk__16788_16959.cljs$core$IIndexed$_nth$arity$2(null,i__16790_16961);
var line_16963 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16791_16962,(0),null);
var cols_16964 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16791_16962,(1),null);
var seq__16794_16965 = cljs.core.seq(cols_16964);
var chunk__16795_16966 = null;
var count__16796_16967 = (0);
var i__16797_16968 = (0);
while(true){
if((i__16797_16968 < count__16796_16967)){
var vec__16798_16969 = chunk__16795_16966.cljs$core$IIndexed$_nth$arity$2(null,i__16797_16968);
var col_16970 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16798_16969,(0),null);
var infos_16971 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16798_16969,(1),null);
encode_cols(infos_16971,source_idx_16954,line_16963,col_16970);

var G__16972 = seq__16794_16965;
var G__16973 = chunk__16795_16966;
var G__16974 = count__16796_16967;
var G__16975 = (i__16797_16968 + (1));
seq__16794_16965 = G__16972;
chunk__16795_16966 = G__16973;
count__16796_16967 = G__16974;
i__16797_16968 = G__16975;
continue;
} else {
var temp__6738__auto___16976__$1 = cljs.core.seq(seq__16794_16965);
if(temp__6738__auto___16976__$1){
var seq__16794_16977__$1 = temp__6738__auto___16976__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16794_16977__$1)){
var c__10350__auto___16978 = cljs.core.chunk_first(seq__16794_16977__$1);
var G__16979 = cljs.core.chunk_rest(seq__16794_16977__$1);
var G__16980 = c__10350__auto___16978;
var G__16981 = cljs.core.count(c__10350__auto___16978);
var G__16982 = (0);
seq__16794_16965 = G__16979;
chunk__16795_16966 = G__16980;
count__16796_16967 = G__16981;
i__16797_16968 = G__16982;
continue;
} else {
var vec__16801_16983 = cljs.core.first(seq__16794_16977__$1);
var col_16984 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16801_16983,(0),null);
var infos_16985 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16801_16983,(1),null);
encode_cols(infos_16985,source_idx_16954,line_16963,col_16984);

var G__16986 = cljs.core.next(seq__16794_16977__$1);
var G__16987 = null;
var G__16988 = (0);
var G__16989 = (0);
seq__16794_16965 = G__16986;
chunk__16795_16966 = G__16987;
count__16796_16967 = G__16988;
i__16797_16968 = G__16989;
continue;
}
} else {
}
}
break;
}

var G__16990 = seq__16787_16958;
var G__16991 = chunk__16788_16959;
var G__16992 = count__16789_16960;
var G__16993 = (i__16790_16961 + (1));
seq__16787_16958 = G__16990;
chunk__16788_16959 = G__16991;
count__16789_16960 = G__16992;
i__16790_16961 = G__16993;
continue;
} else {
var temp__6738__auto___16994__$1 = cljs.core.seq(seq__16787_16958);
if(temp__6738__auto___16994__$1){
var seq__16787_16995__$1 = temp__6738__auto___16994__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16787_16995__$1)){
var c__10350__auto___16996 = cljs.core.chunk_first(seq__16787_16995__$1);
var G__16997 = cljs.core.chunk_rest(seq__16787_16995__$1);
var G__16998 = c__10350__auto___16996;
var G__16999 = cljs.core.count(c__10350__auto___16996);
var G__17000 = (0);
seq__16787_16958 = G__16997;
chunk__16788_16959 = G__16998;
count__16789_16960 = G__16999;
i__16790_16961 = G__17000;
continue;
} else {
var vec__16804_17001 = cljs.core.first(seq__16787_16995__$1);
var line_17002 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16804_17001,(0),null);
var cols_17003 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16804_17001,(1),null);
var seq__16807_17004 = cljs.core.seq(cols_17003);
var chunk__16808_17005 = null;
var count__16809_17006 = (0);
var i__16810_17007 = (0);
while(true){
if((i__16810_17007 < count__16809_17006)){
var vec__16811_17008 = chunk__16808_17005.cljs$core$IIndexed$_nth$arity$2(null,i__16810_17007);
var col_17009 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16811_17008,(0),null);
var infos_17010 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16811_17008,(1),null);
encode_cols(infos_17010,source_idx_16954,line_17002,col_17009);

var G__17011 = seq__16807_17004;
var G__17012 = chunk__16808_17005;
var G__17013 = count__16809_17006;
var G__17014 = (i__16810_17007 + (1));
seq__16807_17004 = G__17011;
chunk__16808_17005 = G__17012;
count__16809_17006 = G__17013;
i__16810_17007 = G__17014;
continue;
} else {
var temp__6738__auto___17015__$2 = cljs.core.seq(seq__16807_17004);
if(temp__6738__auto___17015__$2){
var seq__16807_17016__$1 = temp__6738__auto___17015__$2;
if(cljs.core.chunked_seq_QMARK_(seq__16807_17016__$1)){
var c__10350__auto___17017 = cljs.core.chunk_first(seq__16807_17016__$1);
var G__17018 = cljs.core.chunk_rest(seq__16807_17016__$1);
var G__17019 = c__10350__auto___17017;
var G__17020 = cljs.core.count(c__10350__auto___17017);
var G__17021 = (0);
seq__16807_17004 = G__17018;
chunk__16808_17005 = G__17019;
count__16809_17006 = G__17020;
i__16810_17007 = G__17021;
continue;
} else {
var vec__16818_17022 = cljs.core.first(seq__16807_17016__$1);
var col_17023 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16818_17022,(0),null);
var infos_17024 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16818_17022,(1),null);
encode_cols(infos_17024,source_idx_16954,line_17002,col_17023);

var G__17027 = cljs.core.next(seq__16807_17016__$1);
var G__17028 = null;
var G__17029 = (0);
var G__17030 = (0);
seq__16807_17004 = G__17027;
chunk__16808_17005 = G__17028;
count__16809_17006 = G__17029;
i__16810_17007 = G__17030;
continue;
}
} else {
}
}
break;
}

var G__17031 = cljs.core.next(seq__16787_16995__$1);
var G__17032 = null;
var G__17033 = (0);
var G__17034 = (0);
seq__16787_16958 = G__17031;
chunk__16788_16959 = G__17032;
count__16789_16960 = G__17033;
i__16790_16961 = G__17034;
continue;
}
} else {
}
}
break;
}

var G__17035 = cljs.core.next(seq__16741_16947__$1);
var G__17036 = null;
var G__17037 = (0);
var G__17038 = (0);
seq__16741_16849 = G__17035;
chunk__16742_16850 = G__17036;
count__16743_16851 = G__17037;
i__16744_16852 = G__17038;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__16825 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16637_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__16637_SHARP_),cljs.core.str.cljs$core$IFn$_invoke$arity$1("?rel="),cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16638_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__16638_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16639_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__16639_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__16827 = G__16825;
var G__16828_17041 = G__16827;
var G__16829_17042 = "sourcesContent";
var G__16830_17043 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__16828_17041,G__16829_17042,G__16830_17043);

return G__16827;
} else {
return G__16825;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq(cljs_map);
var new_lines = cljs.core.sorted_map();
while(true){
if(line_map_seq){
var vec__17053 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17053,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17053,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__17056 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17056,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17056,(1),null);
var G__17062 = cljs.core.next(col_map_seq);
var G__17063 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__17056,col,infos,vec__17053,line,col_map){
return (function (v,p__17059){
var map__17060 = p__17059;
var map__17060__$1 = ((((!((map__17060 == null)))?((((map__17060.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17060.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17060):map__17060);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17060__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17060__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__17056,col,infos,vec__17053,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__17062;
new_cols = G__17063;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__17064 = cljs.core.next(line_map_seq);
var G__17065 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__17064;
new_lines = G__17065;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = (function (){var G__17134 = cljs.core.sorted_map();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__17134) : cljs.core.atom.call(null,G__17134));
})();
var seq__17135_17206 = cljs.core.seq(reverse_map);
var chunk__17136_17207 = null;
var count__17137_17208 = (0);
var i__17138_17209 = (0);
while(true){
if((i__17138_17209 < count__17137_17208)){
var vec__17139_17210 = chunk__17136_17207.cljs$core$IIndexed$_nth$arity$2(null,i__17138_17209);
var line_17211 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17139_17210,(0),null);
var columns_17212 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17139_17210,(1),null);
var seq__17142_17213 = cljs.core.seq(columns_17212);
var chunk__17143_17214 = null;
var count__17144_17215 = (0);
var i__17145_17216 = (0);
while(true){
if((i__17145_17216 < count__17144_17215)){
var vec__17146_17217 = chunk__17143_17214.cljs$core$IIndexed$_nth$arity$2(null,i__17145_17216);
var column_17218 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17146_17217,(0),null);
var column_info_17219 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17146_17217,(1),null);
var seq__17149_17220 = cljs.core.seq(column_info_17219);
var chunk__17150_17221 = null;
var count__17151_17222 = (0);
var i__17152_17223 = (0);
while(true){
if((i__17152_17223 < count__17151_17222)){
var map__17153_17224 = chunk__17150_17221.cljs$core$IIndexed$_nth$arity$2(null,i__17152_17223);
var map__17153_17225__$1 = ((((!((map__17153_17224 == null)))?((((map__17153_17224.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17153_17224.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17153_17224):map__17153_17224);
var gline_17226 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17153_17225__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17227 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17153_17225__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17228 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17153_17225__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17226], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17149_17220,chunk__17150_17221,count__17151_17222,i__17152_17223,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17153_17224,map__17153_17225__$1,gline_17226,gcol_17227,name_17228,vec__17146_17217,column_17218,column_info_17219,vec__17139_17210,line_17211,columns_17212,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17227], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17211,new cljs.core.Keyword(null,"col","col",-1959363084),column_17218,new cljs.core.Keyword(null,"name","name",1843675177),name_17228], null));
});})(seq__17149_17220,chunk__17150_17221,count__17151_17222,i__17152_17223,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17153_17224,map__17153_17225__$1,gline_17226,gcol_17227,name_17228,vec__17146_17217,column_17218,column_info_17219,vec__17139_17210,line_17211,columns_17212,inverted))
,cljs.core.sorted_map()));

var G__17229 = seq__17149_17220;
var G__17230 = chunk__17150_17221;
var G__17231 = count__17151_17222;
var G__17232 = (i__17152_17223 + (1));
seq__17149_17220 = G__17229;
chunk__17150_17221 = G__17230;
count__17151_17222 = G__17231;
i__17152_17223 = G__17232;
continue;
} else {
var temp__6738__auto___17233 = cljs.core.seq(seq__17149_17220);
if(temp__6738__auto___17233){
var seq__17149_17234__$1 = temp__6738__auto___17233;
if(cljs.core.chunked_seq_QMARK_(seq__17149_17234__$1)){
var c__10350__auto___17235 = cljs.core.chunk_first(seq__17149_17234__$1);
var G__17236 = cljs.core.chunk_rest(seq__17149_17234__$1);
var G__17237 = c__10350__auto___17235;
var G__17238 = cljs.core.count(c__10350__auto___17235);
var G__17239 = (0);
seq__17149_17220 = G__17236;
chunk__17150_17221 = G__17237;
count__17151_17222 = G__17238;
i__17152_17223 = G__17239;
continue;
} else {
var map__17158_17240 = cljs.core.first(seq__17149_17234__$1);
var map__17158_17241__$1 = ((((!((map__17158_17240 == null)))?((((map__17158_17240.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17158_17240.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17158_17240):map__17158_17240);
var gline_17242 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17158_17241__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17243 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17158_17241__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17244 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17158_17241__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17242], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17149_17220,chunk__17150_17221,count__17151_17222,i__17152_17223,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17158_17240,map__17158_17241__$1,gline_17242,gcol_17243,name_17244,seq__17149_17234__$1,temp__6738__auto___17233,vec__17146_17217,column_17218,column_info_17219,vec__17139_17210,line_17211,columns_17212,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17243], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17211,new cljs.core.Keyword(null,"col","col",-1959363084),column_17218,new cljs.core.Keyword(null,"name","name",1843675177),name_17244], null));
});})(seq__17149_17220,chunk__17150_17221,count__17151_17222,i__17152_17223,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17158_17240,map__17158_17241__$1,gline_17242,gcol_17243,name_17244,seq__17149_17234__$1,temp__6738__auto___17233,vec__17146_17217,column_17218,column_info_17219,vec__17139_17210,line_17211,columns_17212,inverted))
,cljs.core.sorted_map()));

var G__17245 = cljs.core.next(seq__17149_17234__$1);
var G__17246 = null;
var G__17247 = (0);
var G__17248 = (0);
seq__17149_17220 = G__17245;
chunk__17150_17221 = G__17246;
count__17151_17222 = G__17247;
i__17152_17223 = G__17248;
continue;
}
} else {
}
}
break;
}

var G__17249 = seq__17142_17213;
var G__17250 = chunk__17143_17214;
var G__17251 = count__17144_17215;
var G__17252 = (i__17145_17216 + (1));
seq__17142_17213 = G__17249;
chunk__17143_17214 = G__17250;
count__17144_17215 = G__17251;
i__17145_17216 = G__17252;
continue;
} else {
var temp__6738__auto___17253 = cljs.core.seq(seq__17142_17213);
if(temp__6738__auto___17253){
var seq__17142_17254__$1 = temp__6738__auto___17253;
if(cljs.core.chunked_seq_QMARK_(seq__17142_17254__$1)){
var c__10350__auto___17255 = cljs.core.chunk_first(seq__17142_17254__$1);
var G__17256 = cljs.core.chunk_rest(seq__17142_17254__$1);
var G__17257 = c__10350__auto___17255;
var G__17258 = cljs.core.count(c__10350__auto___17255);
var G__17259 = (0);
seq__17142_17213 = G__17256;
chunk__17143_17214 = G__17257;
count__17144_17215 = G__17258;
i__17145_17216 = G__17259;
continue;
} else {
var vec__17160_17260 = cljs.core.first(seq__17142_17254__$1);
var column_17261 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17160_17260,(0),null);
var column_info_17262 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17160_17260,(1),null);
var seq__17163_17263 = cljs.core.seq(column_info_17262);
var chunk__17164_17264 = null;
var count__17165_17265 = (0);
var i__17166_17266 = (0);
while(true){
if((i__17166_17266 < count__17165_17265)){
var map__17167_17267 = chunk__17164_17264.cljs$core$IIndexed$_nth$arity$2(null,i__17166_17266);
var map__17167_17268__$1 = ((((!((map__17167_17267 == null)))?((((map__17167_17267.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17167_17267.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17167_17267):map__17167_17267);
var gline_17269 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17167_17268__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17270 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17167_17268__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17271 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17167_17268__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17269], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17163_17263,chunk__17164_17264,count__17165_17265,i__17166_17266,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17167_17267,map__17167_17268__$1,gline_17269,gcol_17270,name_17271,vec__17160_17260,column_17261,column_info_17262,seq__17142_17254__$1,temp__6738__auto___17253,vec__17139_17210,line_17211,columns_17212,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17270], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17211,new cljs.core.Keyword(null,"col","col",-1959363084),column_17261,new cljs.core.Keyword(null,"name","name",1843675177),name_17271], null));
});})(seq__17163_17263,chunk__17164_17264,count__17165_17265,i__17166_17266,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17167_17267,map__17167_17268__$1,gline_17269,gcol_17270,name_17271,vec__17160_17260,column_17261,column_info_17262,seq__17142_17254__$1,temp__6738__auto___17253,vec__17139_17210,line_17211,columns_17212,inverted))
,cljs.core.sorted_map()));

var G__17272 = seq__17163_17263;
var G__17273 = chunk__17164_17264;
var G__17274 = count__17165_17265;
var G__17275 = (i__17166_17266 + (1));
seq__17163_17263 = G__17272;
chunk__17164_17264 = G__17273;
count__17165_17265 = G__17274;
i__17166_17266 = G__17275;
continue;
} else {
var temp__6738__auto___17276__$1 = cljs.core.seq(seq__17163_17263);
if(temp__6738__auto___17276__$1){
var seq__17163_17277__$1 = temp__6738__auto___17276__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17163_17277__$1)){
var c__10350__auto___17278 = cljs.core.chunk_first(seq__17163_17277__$1);
var G__17279 = cljs.core.chunk_rest(seq__17163_17277__$1);
var G__17280 = c__10350__auto___17278;
var G__17281 = cljs.core.count(c__10350__auto___17278);
var G__17282 = (0);
seq__17163_17263 = G__17279;
chunk__17164_17264 = G__17280;
count__17165_17265 = G__17281;
i__17166_17266 = G__17282;
continue;
} else {
var map__17169_17283 = cljs.core.first(seq__17163_17277__$1);
var map__17169_17284__$1 = ((((!((map__17169_17283 == null)))?((((map__17169_17283.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17169_17283.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17169_17283):map__17169_17283);
var gline_17285 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17169_17284__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17286 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17169_17284__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17287 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17169_17284__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17285], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17163_17263,chunk__17164_17264,count__17165_17265,i__17166_17266,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17169_17283,map__17169_17284__$1,gline_17285,gcol_17286,name_17287,seq__17163_17277__$1,temp__6738__auto___17276__$1,vec__17160_17260,column_17261,column_info_17262,seq__17142_17254__$1,temp__6738__auto___17253,vec__17139_17210,line_17211,columns_17212,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17286], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17211,new cljs.core.Keyword(null,"col","col",-1959363084),column_17261,new cljs.core.Keyword(null,"name","name",1843675177),name_17287], null));
});})(seq__17163_17263,chunk__17164_17264,count__17165_17265,i__17166_17266,seq__17142_17213,chunk__17143_17214,count__17144_17215,i__17145_17216,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17169_17283,map__17169_17284__$1,gline_17285,gcol_17286,name_17287,seq__17163_17277__$1,temp__6738__auto___17276__$1,vec__17160_17260,column_17261,column_info_17262,seq__17142_17254__$1,temp__6738__auto___17253,vec__17139_17210,line_17211,columns_17212,inverted))
,cljs.core.sorted_map()));

var G__17288 = cljs.core.next(seq__17163_17277__$1);
var G__17289 = null;
var G__17290 = (0);
var G__17291 = (0);
seq__17163_17263 = G__17288;
chunk__17164_17264 = G__17289;
count__17165_17265 = G__17290;
i__17166_17266 = G__17291;
continue;
}
} else {
}
}
break;
}

var G__17292 = cljs.core.next(seq__17142_17254__$1);
var G__17293 = null;
var G__17294 = (0);
var G__17295 = (0);
seq__17142_17213 = G__17292;
chunk__17143_17214 = G__17293;
count__17144_17215 = G__17294;
i__17145_17216 = G__17295;
continue;
}
} else {
}
}
break;
}

var G__17296 = seq__17135_17206;
var G__17297 = chunk__17136_17207;
var G__17298 = count__17137_17208;
var G__17299 = (i__17138_17209 + (1));
seq__17135_17206 = G__17296;
chunk__17136_17207 = G__17297;
count__17137_17208 = G__17298;
i__17138_17209 = G__17299;
continue;
} else {
var temp__6738__auto___17300 = cljs.core.seq(seq__17135_17206);
if(temp__6738__auto___17300){
var seq__17135_17301__$1 = temp__6738__auto___17300;
if(cljs.core.chunked_seq_QMARK_(seq__17135_17301__$1)){
var c__10350__auto___17302 = cljs.core.chunk_first(seq__17135_17301__$1);
var G__17303 = cljs.core.chunk_rest(seq__17135_17301__$1);
var G__17304 = c__10350__auto___17302;
var G__17305 = cljs.core.count(c__10350__auto___17302);
var G__17306 = (0);
seq__17135_17206 = G__17303;
chunk__17136_17207 = G__17304;
count__17137_17208 = G__17305;
i__17138_17209 = G__17306;
continue;
} else {
var vec__17171_17307 = cljs.core.first(seq__17135_17301__$1);
var line_17308 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17171_17307,(0),null);
var columns_17309 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17171_17307,(1),null);
var seq__17174_17310 = cljs.core.seq(columns_17309);
var chunk__17175_17311 = null;
var count__17176_17312 = (0);
var i__17177_17313 = (0);
while(true){
if((i__17177_17313 < count__17176_17312)){
var vec__17178_17314 = chunk__17175_17311.cljs$core$IIndexed$_nth$arity$2(null,i__17177_17313);
var column_17315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17178_17314,(0),null);
var column_info_17316 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17178_17314,(1),null);
var seq__17181_17317 = cljs.core.seq(column_info_17316);
var chunk__17182_17318 = null;
var count__17183_17319 = (0);
var i__17184_17320 = (0);
while(true){
if((i__17184_17320 < count__17183_17319)){
var map__17185_17321 = chunk__17182_17318.cljs$core$IIndexed$_nth$arity$2(null,i__17184_17320);
var map__17185_17322__$1 = ((((!((map__17185_17321 == null)))?((((map__17185_17321.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17185_17321.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17185_17321):map__17185_17321);
var gline_17323 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17185_17322__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17324 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17185_17322__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17325 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17185_17322__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17323], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17181_17317,chunk__17182_17318,count__17183_17319,i__17184_17320,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17185_17321,map__17185_17322__$1,gline_17323,gcol_17324,name_17325,vec__17178_17314,column_17315,column_info_17316,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17324], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17308,new cljs.core.Keyword(null,"col","col",-1959363084),column_17315,new cljs.core.Keyword(null,"name","name",1843675177),name_17325], null));
});})(seq__17181_17317,chunk__17182_17318,count__17183_17319,i__17184_17320,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17185_17321,map__17185_17322__$1,gline_17323,gcol_17324,name_17325,vec__17178_17314,column_17315,column_info_17316,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted))
,cljs.core.sorted_map()));

var G__17327 = seq__17181_17317;
var G__17328 = chunk__17182_17318;
var G__17329 = count__17183_17319;
var G__17330 = (i__17184_17320 + (1));
seq__17181_17317 = G__17327;
chunk__17182_17318 = G__17328;
count__17183_17319 = G__17329;
i__17184_17320 = G__17330;
continue;
} else {
var temp__6738__auto___17331__$1 = cljs.core.seq(seq__17181_17317);
if(temp__6738__auto___17331__$1){
var seq__17181_17333__$1 = temp__6738__auto___17331__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17181_17333__$1)){
var c__10350__auto___17334 = cljs.core.chunk_first(seq__17181_17333__$1);
var G__17335 = cljs.core.chunk_rest(seq__17181_17333__$1);
var G__17336 = c__10350__auto___17334;
var G__17337 = cljs.core.count(c__10350__auto___17334);
var G__17338 = (0);
seq__17181_17317 = G__17335;
chunk__17182_17318 = G__17336;
count__17183_17319 = G__17337;
i__17184_17320 = G__17338;
continue;
} else {
var map__17187_17343 = cljs.core.first(seq__17181_17333__$1);
var map__17187_17344__$1 = ((((!((map__17187_17343 == null)))?((((map__17187_17343.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17187_17343.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17187_17343):map__17187_17343);
var gline_17345 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17187_17344__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17346 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17187_17344__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17347 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17187_17344__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17345], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17181_17317,chunk__17182_17318,count__17183_17319,i__17184_17320,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17187_17343,map__17187_17344__$1,gline_17345,gcol_17346,name_17347,seq__17181_17333__$1,temp__6738__auto___17331__$1,vec__17178_17314,column_17315,column_info_17316,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17346], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17308,new cljs.core.Keyword(null,"col","col",-1959363084),column_17315,new cljs.core.Keyword(null,"name","name",1843675177),name_17347], null));
});})(seq__17181_17317,chunk__17182_17318,count__17183_17319,i__17184_17320,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17187_17343,map__17187_17344__$1,gline_17345,gcol_17346,name_17347,seq__17181_17333__$1,temp__6738__auto___17331__$1,vec__17178_17314,column_17315,column_info_17316,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted))
,cljs.core.sorted_map()));

var G__17350 = cljs.core.next(seq__17181_17333__$1);
var G__17351 = null;
var G__17352 = (0);
var G__17353 = (0);
seq__17181_17317 = G__17350;
chunk__17182_17318 = G__17351;
count__17183_17319 = G__17352;
i__17184_17320 = G__17353;
continue;
}
} else {
}
}
break;
}

var G__17357 = seq__17174_17310;
var G__17358 = chunk__17175_17311;
var G__17359 = count__17176_17312;
var G__17360 = (i__17177_17313 + (1));
seq__17174_17310 = G__17357;
chunk__17175_17311 = G__17358;
count__17176_17312 = G__17359;
i__17177_17313 = G__17360;
continue;
} else {
var temp__6738__auto___17361__$1 = cljs.core.seq(seq__17174_17310);
if(temp__6738__auto___17361__$1){
var seq__17174_17364__$1 = temp__6738__auto___17361__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17174_17364__$1)){
var c__10350__auto___17366 = cljs.core.chunk_first(seq__17174_17364__$1);
var G__17367 = cljs.core.chunk_rest(seq__17174_17364__$1);
var G__17368 = c__10350__auto___17366;
var G__17369 = cljs.core.count(c__10350__auto___17366);
var G__17370 = (0);
seq__17174_17310 = G__17367;
chunk__17175_17311 = G__17368;
count__17176_17312 = G__17369;
i__17177_17313 = G__17370;
continue;
} else {
var vec__17192_17371 = cljs.core.first(seq__17174_17364__$1);
var column_17372 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17192_17371,(0),null);
var column_info_17373 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17192_17371,(1),null);
var seq__17196_17374 = cljs.core.seq(column_info_17373);
var chunk__17197_17375 = null;
var count__17198_17376 = (0);
var i__17199_17377 = (0);
while(true){
if((i__17199_17377 < count__17198_17376)){
var map__17202_17380 = chunk__17197_17375.cljs$core$IIndexed$_nth$arity$2(null,i__17199_17377);
var map__17202_17381__$1 = ((((!((map__17202_17380 == null)))?((((map__17202_17380.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17202_17380.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17202_17380):map__17202_17380);
var gline_17382 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17202_17381__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17383 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17202_17381__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17384 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17202_17381__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17382], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17196_17374,chunk__17197_17375,count__17198_17376,i__17199_17377,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17202_17380,map__17202_17381__$1,gline_17382,gcol_17383,name_17384,vec__17192_17371,column_17372,column_info_17373,seq__17174_17364__$1,temp__6738__auto___17361__$1,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17383], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17308,new cljs.core.Keyword(null,"col","col",-1959363084),column_17372,new cljs.core.Keyword(null,"name","name",1843675177),name_17384], null));
});})(seq__17196_17374,chunk__17197_17375,count__17198_17376,i__17199_17377,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17202_17380,map__17202_17381__$1,gline_17382,gcol_17383,name_17384,vec__17192_17371,column_17372,column_info_17373,seq__17174_17364__$1,temp__6738__auto___17361__$1,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted))
,cljs.core.sorted_map()));

var G__17392 = seq__17196_17374;
var G__17393 = chunk__17197_17375;
var G__17394 = count__17198_17376;
var G__17395 = (i__17199_17377 + (1));
seq__17196_17374 = G__17392;
chunk__17197_17375 = G__17393;
count__17198_17376 = G__17394;
i__17199_17377 = G__17395;
continue;
} else {
var temp__6738__auto___17398__$2 = cljs.core.seq(seq__17196_17374);
if(temp__6738__auto___17398__$2){
var seq__17196_17399__$1 = temp__6738__auto___17398__$2;
if(cljs.core.chunked_seq_QMARK_(seq__17196_17399__$1)){
var c__10350__auto___17400 = cljs.core.chunk_first(seq__17196_17399__$1);
var G__17401 = cljs.core.chunk_rest(seq__17196_17399__$1);
var G__17402 = c__10350__auto___17400;
var G__17403 = cljs.core.count(c__10350__auto___17400);
var G__17404 = (0);
seq__17196_17374 = G__17401;
chunk__17197_17375 = G__17402;
count__17198_17376 = G__17403;
i__17199_17377 = G__17404;
continue;
} else {
var map__17204_17405 = cljs.core.first(seq__17196_17399__$1);
var map__17204_17406__$1 = ((((!((map__17204_17405 == null)))?((((map__17204_17405.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17204_17405.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17204_17405):map__17204_17405);
var gline_17407 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17204_17406__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_17408 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17204_17406__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_17409 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17204_17406__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17407], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17196_17374,chunk__17197_17375,count__17198_17376,i__17199_17377,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17204_17405,map__17204_17406__$1,gline_17407,gcol_17408,name_17409,seq__17196_17399__$1,temp__6738__auto___17398__$2,vec__17192_17371,column_17372,column_info_17373,seq__17174_17364__$1,temp__6738__auto___17361__$1,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17408], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_17308,new cljs.core.Keyword(null,"col","col",-1959363084),column_17372,new cljs.core.Keyword(null,"name","name",1843675177),name_17409], null));
});})(seq__17196_17374,chunk__17197_17375,count__17198_17376,i__17199_17377,seq__17174_17310,chunk__17175_17311,count__17176_17312,i__17177_17313,seq__17135_17206,chunk__17136_17207,count__17137_17208,i__17138_17209,map__17204_17405,map__17204_17406__$1,gline_17407,gcol_17408,name_17409,seq__17196_17399__$1,temp__6738__auto___17398__$2,vec__17192_17371,column_17372,column_info_17373,seq__17174_17364__$1,temp__6738__auto___17361__$1,vec__17171_17307,line_17308,columns_17309,seq__17135_17301__$1,temp__6738__auto___17300,inverted))
,cljs.core.sorted_map()));

var G__17410 = cljs.core.next(seq__17196_17399__$1);
var G__17411 = null;
var G__17412 = (0);
var G__17413 = (0);
seq__17196_17374 = G__17410;
chunk__17197_17375 = G__17411;
count__17198_17376 = G__17412;
i__17199_17377 = G__17413;
continue;
}
} else {
}
}
break;
}

var G__17414 = cljs.core.next(seq__17174_17364__$1);
var G__17415 = null;
var G__17416 = (0);
var G__17417 = (0);
seq__17174_17310 = G__17414;
chunk__17175_17311 = G__17415;
count__17176_17312 = G__17416;
i__17177_17313 = G__17417;
continue;
}
} else {
}
}
break;
}

var G__17418 = cljs.core.next(seq__17135_17301__$1);
var G__17419 = null;
var G__17420 = (0);
var G__17421 = (0);
seq__17135_17206 = G__17418;
chunk__17136_17207 = G__17419;
count__17137_17208 = G__17420;
i__17138_17209 = G__17421;
continue;
}
} else {
}
}
break;
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inverted) : cljs.core.deref.call(null,inverted));
});
