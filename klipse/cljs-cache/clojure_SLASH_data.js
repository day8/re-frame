goog.provide("clojure.data");
(function (){
clojure.data.diff; return (
new cljs.core.Var(function(){return clojure.data.diff;},new cljs.core.Symbol("clojure.data","diff","clojure.data/diff",(-683865998),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff","diff",(-518492986),null),"clojure/data.cljs",(14),(1),(15),true,(15),cljs.core.List.EMPTY,null,(cljs.core.truth_(clojure.data.diff)?clojure.data.diff.cljs$lang$test:null)])));})()
;
/**
 * Internal helper for diff.
 */
(function (){
clojure.data.atom_diff = (function clojure$data$atom_diff(a,b){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,a], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b,null], null);
}
}); return (
new cljs.core.Var(function(){return clojure.data.atom_diff;},new cljs.core.Symbol("clojure.data","atom-diff","clojure.data/atom-diff",(-1875632086),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"atom-diff","atom-diff",(-1360409178),null),"clojure/data.cljs",(17),(1),(17),(17),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)),"Internal helper for diff.",(cljs.core.truth_(clojure.data.atom_diff)?clojure.data.atom_diff.cljs$lang$test:null)])));})()
;
/**
 * Convert an associative-by-numeric-index collection into
 * an equivalent vector, with nil for any missing keys
 */
(function (){
clojure.data.vectorize = (function clojure$data$vectorize(m){
if(cljs.core.seq(m)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,p__3763){
var vec__3764 = p__3763;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3764,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3764,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,k,v);
}),cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.keys(m)),null)),m);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return clojure.data.vectorize;},new cljs.core.Symbol("clojure.data","vectorize","clojure.data/vectorize",(-1468139915),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"vectorize","vectorize",(-27746943),null),"clojure/data.cljs",(17),(1),(23),(23),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null)], null)),"Convert an associative-by-numeric-index collection into\n   an equivalent vector, with nil for any missing keys",(cljs.core.truth_(clojure.data.vectorize)?clojure.data.vectorize.cljs$lang$test:null)])));})()
;
/**
 * Diff associative things a and b, comparing only the key k.
 */
(function (){
clojure.data.diff_associative_key = (function clojure$data$diff_associative_key(a,b,k){
var va = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a,k);
var vb = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,k);
var vec__3770 = (clojure.data.diff.cljs$core$IFn$_invoke$arity$2 ? clojure.data.diff.cljs$core$IFn$_invoke$arity$2(va,vb) : clojure.data.diff.call(null,va,vb));
var a_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3770,(0),null);
var b_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3770,(1),null);
var ab = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3770,(2),null);
var in_a = cljs.core.contains_QMARK_(a,k);
var in_b = cljs.core.contains_QMARK_(b,k);
var same = (in_a) && (in_b) && ((!((ab == null))) || (((va == null)) && ((vb == null))));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((in_a) && ((!((a_STAR_ == null))) || (!(same))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,a_STAR_]):null),(((in_b) && ((!((b_STAR_ == null))) || (!(same))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,b_STAR_]):null),((same)?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,ab]):null)], null);
}); return (
new cljs.core.Var(function(){return clojure.data.diff_associative_key;},new cljs.core.Symbol("clojure.data","diff-associative-key","clojure.data/diff-associative-key",(481737435),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-associative-key","diff-associative-key",(-829716913),null),"clojure/data.cljs",(28),(1),(33),(33),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"k","k",(-505765866),null)], null)),"Diff associative things a and b, comparing only the key k.",(cljs.core.truth_(clojure.data.diff_associative_key)?clojure.data.diff_associative_key.cljs$lang$test:null)])));})()
;
/**
 * Diff associative things a and b, comparing only keys in ks (if supplied).
 */
(function (){
clojure.data.diff_associative = (function clojure$data$diff_associative(var_args){
var args3773 = [];
var len__26427__auto___3776 = arguments.length;
var i__26428__auto___3777 = (0);
while(true){
if((i__26428__auto___3777 < len__26427__auto___3776)){
args3773.push((arguments[i__26428__auto___3777]));

var G__3778 = (i__26428__auto___3777 + (1));
i__26428__auto___3777 = G__3778;
continue;
} else {
}
break;
}

var G__3775 = args3773.length;
switch (G__3775) {
case (2):
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args3773.length)].join('')));

}
}); return (
new cljs.core.Var(function(){return clojure.data.diff_associative;},new cljs.core.Symbol("clojure.data","diff-associative","clojure.data/diff-associative",(1378922723),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-associative","diff-associative",(1545327),null),"clojure/data.cljs",(24),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(49),(49),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),"Diff associative things a and b, comparing only keys in ks (if supplied).",(cljs.core.truth_(clojure.data.diff_associative)?clojure.data.diff_associative.cljs$lang$test:null)])));})()
;

clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3(a,b,clojure.set.union.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(a),cljs.core.keys(b)));
});

clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3 = (function (a,b,ks){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (diff1,diff2){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.merge,diff1,diff2));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,null], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$3(clojure.data.diff_associative_key,a,b),ks));
});

clojure.data.diff_associative.cljs$lang$maxFixedArity = (3);

new cljs.core.Var(function(){return clojure.data.diff_associative;},new cljs.core.Symbol("clojure.data","diff-associative","clojure.data/diff-associative",(1378922723),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-associative","diff-associative",(1545327),null),"clojure/data.cljs",(24),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(49),(49),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null),new cljs.core.Symbol(null,"ks","ks",(-754231827),null)], null)),"Diff associative things a and b, comparing only keys in ks (if supplied).",(cljs.core.truth_(clojure.data.diff_associative)?clojure.data.diff_associative.cljs$lang$test:null)]));
(function (){
clojure.data.diff_sequential = (function clojure$data$diff_sequential(a,b){
return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.data.vectorize,clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3(((cljs.core.vector_QMARK_(a))?a:cljs.core.vec(a)),((cljs.core.vector_QMARK_(b))?b:cljs.core.vec(b)),cljs.core.range.cljs$core$IFn$_invoke$arity$1((function (){var x__23388__auto__ = cljs.core.count(a);
var y__23389__auto__ = cljs.core.count(b);
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})()))));
}); return (
new cljs.core.Var(function(){return clojure.data.diff_sequential;},new cljs.core.Symbol("clojure.data","diff-sequential","clojure.data/diff-sequential",(-530494291),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-sequential","diff-sequential",(839149625),null),"clojure/data.cljs",(23),(1),(62),(62),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)),null,(cljs.core.truth_(clojure.data.diff_sequential)?clojure.data.diff_sequential.cljs$lang$test:null)])));})()
;
(function (){
clojure.data.diff_set = (function clojure$data$diff_set(a,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.not_empty(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(a,b)),cljs.core.not_empty(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(b,a)),cljs.core.not_empty(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(a,b))], null);
}); return (
new cljs.core.Var(function(){return clojure.data.diff_set;},new cljs.core.Symbol("clojure.data","diff-set","clojure.data/diff-set",(946593171),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-set","diff-set",(-364591609),null),"clojure/data.cljs",(16),(1),(69),(69),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)),null,(cljs.core.truth_(clojure.data.diff_set)?clojure.data.diff_set.cljs$lang$test:null)])));})()
;

/**
 * Implementation detail. Subject to change.
 * @interface
 */
(function (){
clojure.data.EqualityPartition = function(){}; return (
new cljs.core.Var(function(){return clojure.data.EqualityPartition;},new cljs.core.Symbol("clojure.data","EqualityPartition","clojure.data/EqualityPartition",(-2099186728),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol-symbol","protocol-symbol",(1279552198)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"protocol-info","protocol-info",(1471745843)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"jsdoc","jsdoc",(1745183516)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"EqualityPartition","EqualityPartition",(-255599508),null),"clojure/data.cljs",(31),(1),(75),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"methods","methods",(453930866)),cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.with_meta(new cljs.core.Symbol(null,"equality-partition","equality-partition",(1419043626),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Implementation detail. Subject to change."], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)], null)])], null),(75),cljs.core.List.EMPTY,"Implementation detail. Subject to change.",cljs.core.list("@interface"),(cljs.core.truth_(clojure.data.EqualityPartition)?clojure.data.EqualityPartition.cljs$lang$test:null)])));})()
;

/**
 * Implementation detail. Subject to change.
 */
(function (){
clojure.data.equality_partition = (function clojure$data$equality_partition(x){
if((!((x == null))) && (!((x.clojure$data$EqualityPartition$equality_partition$arity$1 == null)))){
return x.clojure$data$EqualityPartition$equality_partition$arity$1(x);
} else {
var x__25057__auto__ = (((x == null))?null:x);
var m__25058__auto__ = (clojure.data.equality_partition[goog.typeOf(x__25057__auto__)]);
if(!((m__25058__auto__ == null))){
return (m__25058__auto__.cljs$core$IFn$_invoke$arity$1 ? m__25058__auto__.cljs$core$IFn$_invoke$arity$1(x) : m__25058__auto__.call(null,x));
} else {
var m__25058__auto____$1 = (clojure.data.equality_partition["_"]);
if(!((m__25058__auto____$1 == null))){
return (m__25058__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__25058__auto____$1.cljs$core$IFn$_invoke$arity$1(x) : m__25058__auto____$1.call(null,x));
} else {
throw cljs.core.missing_protocol("EqualityPartition.equality-partition",x);
}
}
}
}); return (
new cljs.core.Var(function(){return clojure.data.equality_partition;},new cljs.core.Symbol("clojure.data","equality-partition","clojure.data/equality-partition",(-1501847714),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol","protocol",(652470118)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol("clojure.data","EqualityPartition","clojure.data/EqualityPartition",(-2099186728),null),cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"equality-partition","equality-partition",(1419043626),null),"clojure/data.cljs",(22),(1),(75),(77),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),"Implementation detail. Subject to change.",(cljs.core.truth_(clojure.data.equality_partition)?clojure.data.equality_partition.cljs$lang$test:null)])));})()
;


/**
 * Implementation detail. Subject to change.
 * @interface
 */
(function (){
clojure.data.Diff = function(){}; return (
new cljs.core.Var(function(){return clojure.data.Diff;},new cljs.core.Symbol("clojure.data","Diff","clojure.data/Diff",(-1724958619),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol-symbol","protocol-symbol",(1279552198)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"protocol-info","protocol-info",(1471745843)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"jsdoc","jsdoc",(1745183516)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"Diff","Diff",(-1425488399),null),"clojure/data.cljs",(18),(1),(79),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"methods","methods",(453930866)),cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.with_meta(new cljs.core.Symbol(null,"diff-similar","diff-similar",(230692495),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Implementation detail. Subject to change."], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)], null)])], null),(79),cljs.core.List.EMPTY,"Implementation detail. Subject to change.",cljs.core.list("@interface"),(cljs.core.truth_(clojure.data.Diff)?clojure.data.Diff.cljs$lang$test:null)])));})()
;

/**
 * Implementation detail. Subject to change.
 */
(function (){
clojure.data.diff_similar = (function clojure$data$diff_similar(a,b){
if((!((a == null))) && (!((a.clojure$data$Diff$diff_similar$arity$2 == null)))){
return a.clojure$data$Diff$diff_similar$arity$2(a,b);
} else {
var x__25057__auto__ = (((a == null))?null:a);
var m__25058__auto__ = (clojure.data.diff_similar[goog.typeOf(x__25057__auto__)]);
if(!((m__25058__auto__ == null))){
return (m__25058__auto__.cljs$core$IFn$_invoke$arity$2 ? m__25058__auto__.cljs$core$IFn$_invoke$arity$2(a,b) : m__25058__auto__.call(null,a,b));
} else {
var m__25058__auto____$1 = (clojure.data.diff_similar["_"]);
if(!((m__25058__auto____$1 == null))){
return (m__25058__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__25058__auto____$1.cljs$core$IFn$_invoke$arity$2(a,b) : m__25058__auto____$1.call(null,a,b));
} else {
throw cljs.core.missing_protocol("Diff.diff-similar",a);
}
}
}
}); return (
new cljs.core.Var(function(){return clojure.data.diff_similar;},new cljs.core.Symbol("clojure.data","diff-similar","clojure.data/diff-similar",(1072499067),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol","protocol",(652470118)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol("clojure.data","Diff","clojure.data/Diff",(-1724958619),null),cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff-similar","diff-similar",(230692495),null),"clojure/data.cljs",(16),(1),(79),(81),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)),"Implementation detail. Subject to change.",(cljs.core.truth_(clojure.data.diff_similar)?clojure.data.diff_similar.cljs$lang$test:null)])));})()
;

(clojure.data.EqualityPartition["null"] = true);

(clojure.data.equality_partition["null"] = (function (x){
return new cljs.core.Keyword(null,"atom","atom",(-397043653));
}));

(clojure.data.EqualityPartition["string"] = true);

(clojure.data.equality_partition["string"] = (function (x){
return new cljs.core.Keyword(null,"atom","atom",(-397043653));
}));

(clojure.data.EqualityPartition["number"] = true);

(clojure.data.equality_partition["number"] = (function (x){
return new cljs.core.Keyword(null,"atom","atom",(-397043653));
}));

(clojure.data.EqualityPartition["array"] = true);

(clojure.data.equality_partition["array"] = (function (x){
return new cljs.core.Keyword(null,"sequential","sequential",(-1082983960));
}));

(clojure.data.EqualityPartition["function"] = true);

(clojure.data.equality_partition["function"] = (function (x){
return new cljs.core.Keyword(null,"atom","atom",(-397043653));
}));

(clojure.data.EqualityPartition["boolean"] = true);

(clojure.data.equality_partition["boolean"] = (function (x){
return new cljs.core.Keyword(null,"atom","atom",(-397043653));
}));

(clojure.data.EqualityPartition["_"] = true);

(clojure.data.equality_partition["_"] = (function (x){
if(((!((x == null)))?((((x.cljs$lang$protocol_mask$partition0$ & (1024))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IMap$)))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IMap,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IMap,x))){
return new cljs.core.Keyword(null,"map","map",(1371690461));
} else {
if(((!((x == null)))?((((x.cljs$lang$protocol_mask$partition0$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISet$)))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.ISet,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.ISet,x))){
return new cljs.core.Keyword(null,"set","set",(304602554));
} else {
if(((!((x == null)))?((((x.cljs$lang$protocol_mask$partition0$ & (16777216))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISequential$)))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.ISequential,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.ISequential,x))){
return new cljs.core.Keyword(null,"sequential","sequential",(-1082983960));
} else {
return new cljs.core.Keyword(null,"atom","atom",(-397043653));

}
}
}
}));
(clojure.data.Diff["null"] = true);

(clojure.data.diff_similar["null"] = (function (a,b){
return clojure.data.atom_diff(a,b);
}));

(clojure.data.Diff["string"] = true);

(clojure.data.diff_similar["string"] = (function (a,b){
return clojure.data.atom_diff(a,b);
}));

(clojure.data.Diff["number"] = true);

(clojure.data.diff_similar["number"] = (function (a,b){
return clojure.data.atom_diff(a,b);
}));

(clojure.data.Diff["array"] = true);

(clojure.data.diff_similar["array"] = (function (a,b){
return clojure.data.diff_sequential(a,b);
}));

(clojure.data.Diff["function"] = true);

(clojure.data.diff_similar["function"] = (function (a,b){
return clojure.data.atom_diff(a,b);
}));

(clojure.data.Diff["boolean"] = true);

(clojure.data.diff_similar["boolean"] = (function (a,b){
return clojure.data.atom_diff(a,b);
}));

(clojure.data.Diff["_"] = true);

(clojure.data.diff_similar["_"] = (function (a,b){
return (function (){var G__3783 = clojure.data.equality_partition(a);
var G__3783__$1 = (((G__3783 instanceof cljs.core.Keyword))?G__3783.fqn:null);
switch (G__3783__$1) {
case "atom":
return clojure.data.atom_diff;

break;
case "set":
return clojure.data.diff_set;

break;
case "sequential":
return clojure.data.diff_sequential;

break;
case "map":
return clojure.data.diff_associative;

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.data.equality_partition(a))].join('')));

}
})().call(null,a,b);
}));
/**
 * Recursively compares a and b, returning a tuple of
 *   [things-only-in-a things-only-in-b things-in-both].
 *   Comparison rules:
 * 
 *   * For equal a and b, return [nil nil a].
 *   * Maps are subdiffed where keys match and values differ.
 *   * Sets are never subdiffed.
 *   * All sequential things are treated as associative collections
 *  by their indexes, with results returned as vectors.
 *   * Everything else (including strings!) is treated as
 *  an atom and compared for equality.
 */
(function (){
clojure.data.diff = (function clojure$data$diff(a,b){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,a], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(clojure.data.equality_partition(a),clojure.data.equality_partition(b))){
return clojure.data.diff_similar(a,b);
} else {
return clojure.data.atom_diff(a,b);
}
}
}); return (
new cljs.core.Var(function(){return clojure.data.diff;},new cljs.core.Symbol("clojure.data","diff","clojure.data/diff",(-683865998),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.data","clojure.data",(-2083828516),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"author","author",(2111686192)),"Stuart Halloway",new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Non-core data functions."], null)),new cljs.core.Symbol(null,"diff","diff",(-518492986),null),"clojure/data.cljs",(11),(1),(144),(144),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",(-482876059),null),new cljs.core.Symbol(null,"b","b",(-1172211299),null)], null)),"Recursively compares a and b, returning a tuple of\n  [things-only-in-a things-only-in-b things-in-both].\n  Comparison rules:\n\n  * For equal a and b, return [nil nil a].\n  * Maps are subdiffed where keys match and values differ.\n  * Sets are never subdiffed.\n  * All sequential things are treated as associative collections\n    by their indexes, with results returned as vectors.\n  * Everything else (including strings!) is treated as\n    an atom and compared for equality.",(cljs.core.truth_(clojure.data.diff)?clojure.data.diff.cljs$lang$test:null)])));})()
;
