// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__25068){
var map__25110 = p__25068;
var map__25110__$1 = ((((!((map__25110 == null)))?((((map__25110.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25110.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__25110):map__25110);
var m = map__25110__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25110__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25110__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__6738__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__6738__auto__)){
var ns = temp__6738__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1("/")].join('');
} else {
return null;
}
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__25112_25134 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__25113_25135 = null;
var count__25114_25136 = (0);
var i__25115_25137 = (0);
while(true){
if((i__25115_25137 < count__25114_25136)){
var f_25138 = chunk__25113_25135.cljs$core$IIndexed$_nth$arity$2(null,i__25115_25137);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_25138], 0));

var G__25139 = seq__25112_25134;
var G__25140 = chunk__25113_25135;
var G__25141 = count__25114_25136;
var G__25142 = (i__25115_25137 + (1));
seq__25112_25134 = G__25139;
chunk__25113_25135 = G__25140;
count__25114_25136 = G__25141;
i__25115_25137 = G__25142;
continue;
} else {
var temp__6738__auto___25143 = cljs.core.seq(seq__25112_25134);
if(temp__6738__auto___25143){
var seq__25112_25144__$1 = temp__6738__auto___25143;
if(cljs.core.chunked_seq_QMARK_(seq__25112_25144__$1)){
var c__10350__auto___25145 = cljs.core.chunk_first(seq__25112_25144__$1);
var G__25146 = cljs.core.chunk_rest(seq__25112_25144__$1);
var G__25147 = c__10350__auto___25145;
var G__25148 = cljs.core.count(c__10350__auto___25145);
var G__25149 = (0);
seq__25112_25134 = G__25146;
chunk__25113_25135 = G__25147;
count__25114_25136 = G__25148;
i__25115_25137 = G__25149;
continue;
} else {
var f_25150 = cljs.core.first(seq__25112_25144__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_25150], 0));

var G__25151 = cljs.core.next(seq__25112_25144__$1);
var G__25152 = null;
var G__25153 = (0);
var G__25154 = (0);
seq__25112_25134 = G__25151;
chunk__25113_25135 = G__25152;
count__25114_25136 = G__25153;
i__25115_25137 = G__25154;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_25155 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_25155], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_25155)))?cljs.core.second(arglists_25155):arglists_25155)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n  Please see http://clojure.org/"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n  Please see http://clojure.org/special_forms#"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__25116_25156 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__25117_25157 = null;
var count__25118_25158 = (0);
var i__25119_25159 = (0);
while(true){
if((i__25119_25159 < count__25118_25158)){
var vec__25120_25160 = chunk__25117_25157.cljs$core$IIndexed$_nth$arity$2(null,i__25119_25159);
var name_25161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25120_25160,(0),null);
var map__25123_25162 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25120_25160,(1),null);
var map__25123_25163__$1 = ((((!((map__25123_25162 == null)))?((((map__25123_25162.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25123_25162.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__25123_25162):map__25123_25162);
var doc_25164 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25123_25163__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_25165 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25123_25163__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_25161], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_25165], 0));

if(cljs.core.truth_(doc_25164)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_25164], 0));
} else {
}

var G__25166 = seq__25116_25156;
var G__25167 = chunk__25117_25157;
var G__25168 = count__25118_25158;
var G__25169 = (i__25119_25159 + (1));
seq__25116_25156 = G__25166;
chunk__25117_25157 = G__25167;
count__25118_25158 = G__25168;
i__25119_25159 = G__25169;
continue;
} else {
var temp__6738__auto___25170 = cljs.core.seq(seq__25116_25156);
if(temp__6738__auto___25170){
var seq__25116_25171__$1 = temp__6738__auto___25170;
if(cljs.core.chunked_seq_QMARK_(seq__25116_25171__$1)){
var c__10350__auto___25172 = cljs.core.chunk_first(seq__25116_25171__$1);
var G__25173 = cljs.core.chunk_rest(seq__25116_25171__$1);
var G__25174 = c__10350__auto___25172;
var G__25175 = cljs.core.count(c__10350__auto___25172);
var G__25176 = (0);
seq__25116_25156 = G__25173;
chunk__25117_25157 = G__25174;
count__25118_25158 = G__25175;
i__25119_25159 = G__25176;
continue;
} else {
var vec__25125_25177 = cljs.core.first(seq__25116_25171__$1);
var name_25178 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25125_25177,(0),null);
var map__25128_25179 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25125_25177,(1),null);
var map__25128_25180__$1 = ((((!((map__25128_25179 == null)))?((((map__25128_25179.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25128_25179.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__25128_25179):map__25128_25179);
var doc_25181 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25128_25180__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_25182 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25128_25180__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_25178], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_25182], 0));

if(cljs.core.truth_(doc_25181)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_25181], 0));
} else {
}

var G__25183 = cljs.core.next(seq__25116_25171__$1);
var G__25184 = null;
var G__25185 = (0);
var G__25186 = (0);
seq__25116_25156 = G__25183;
chunk__25117_25157 = G__25184;
count__25118_25158 = G__25185;
i__25119_25159 = G__25186;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__6738__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n))].join(''),cljs.core.name(nm)));
if(cljs.core.truth_(temp__6738__auto__)){
var fnspec = temp__6738__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Spec"], 0));

var seq__25130 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__25131 = null;
var count__25132 = (0);
var i__25133 = (0);
while(true){
if((i__25133 < count__25132)){
var role = chunk__25131.cljs$core$IIndexed$_nth$arity$2(null,i__25133);
var temp__6738__auto___25187__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6738__auto___25187__$1)){
var spec_25188 = temp__6738__auto___25187__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(role)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(":")].join(''),cljs.spec.alpha.describe(spec_25188)], 0));
} else {
}

var G__25189 = seq__25130;
var G__25190 = chunk__25131;
var G__25191 = count__25132;
var G__25192 = (i__25133 + (1));
seq__25130 = G__25189;
chunk__25131 = G__25190;
count__25132 = G__25191;
i__25133 = G__25192;
continue;
} else {
var temp__6738__auto____$1 = cljs.core.seq(seq__25130);
if(temp__6738__auto____$1){
var seq__25130__$1 = temp__6738__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__25130__$1)){
var c__10350__auto__ = cljs.core.chunk_first(seq__25130__$1);
var G__25193 = cljs.core.chunk_rest(seq__25130__$1);
var G__25194 = c__10350__auto__;
var G__25195 = cljs.core.count(c__10350__auto__);
var G__25196 = (0);
seq__25130 = G__25193;
chunk__25131 = G__25194;
count__25132 = G__25195;
i__25133 = G__25196;
continue;
} else {
var role = cljs.core.first(seq__25130__$1);
var temp__6738__auto___25197__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6738__auto___25197__$2)){
var spec_25198 = temp__6738__auto___25197__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(role)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(":")].join(''),cljs.spec.alpha.describe(spec_25198)], 0));
} else {
}

var G__25199 = cljs.core.next(seq__25130__$1);
var G__25200 = null;
var G__25201 = (0);
var G__25202 = (0);
seq__25130 = G__25199;
chunk__25131 = G__25200;
count__25132 = G__25201;
i__25133 = G__25202;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
