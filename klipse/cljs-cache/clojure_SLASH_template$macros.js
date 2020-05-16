goog.provide("clojure.template$macros");
/**
 * For use in macros.  argv is an argument list, as in defn.  expr is
 *   a quoted expression using the symbols in argv.  values is a sequence
 *   of values to be used for the arguments.
 * 
 *   apply-template will recursively replace argument symbols in expr
 *   with their corresponding values, returning a modified expr.
 * 
 *   Example: (apply-template '[x] '(+ x x) '[2])
 *         ;=> (+ 2 2)
 */
(function (){
clojure.template$macros.apply_template = (function clojure$template$macros$apply_template(argv,expr,values){
if(cljs.core.vector_QMARK_(argv)){
} else {
throw (new Error("Assert failed: (vector? argv)"));
}

if(cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,argv)){
} else {
throw (new Error("Assert failed: (every? symbol? argv)"));
}

return clojure.walk.postwalk_replace(cljs.core.zipmap(argv,values),expr);
}); return (
new cljs.core.Var(function(){return clojure.template$macros.apply_template;},new cljs.core.Symbol("clojure.template$macros","apply-template","clojure.template$macros/apply-template",(1431888855),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"clojure.template$macros","clojure.template$macros",(1039368322),null),new cljs.core.Symbol(null,"apply-template","apply-template",(1809601838),null),"clojure/template.clj",(21),(1),(30),(30),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"values","values",(2013177083),null)], null)),"For use in macros.  argv is an argument list, as in defn.  expr is\n  a quoted expression using the symbols in argv.  values is a sequence\n  of values to be used for the arguments.\n\n  apply-template will recursively replace argument symbols in expr\n  with their corresponding values, returning a modified expr.\n\n  Example: (apply-template '[x] '(+ x x) '[2])\n           ;=> (+ 2 2)",(cljs.core.truth_(clojure.template$macros.apply_template)?clojure.template$macros.apply_template.cljs$lang$test:null)])));})()
;
var ret__26478__auto___3796 = (function (){
/**
 * Repeatedly copies expr (in a do block) for each group of arguments
 *   in values.  values are automatically partitioned by the number of
 *   arguments in argv, an argument vector as in defn.
 * 
 *   Example: (macroexpand '(do-template [x y] (+ y x) 2 4 3 5))
 *         ;=> (do (+ 4 2) (+ 5 3))
 */
(function (){
clojure.template$macros.do_template = (function clojure$template$macros$do_template(var_args){
var args__26430__auto__ = [];
var len__26427__auto___3797 = arguments.length;
var i__26428__auto___3798 = (0);
while(true){
if((i__26428__auto___3798 < len__26427__auto___3797)){
args__26430__auto__.push((arguments[i__26428__auto___3798]));

var G__3799 = (i__26428__auto___3798 + (1));
i__26428__auto___3798 = G__3799;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((4) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((4)),(0),null)):null);
return clojure.template$macros.do_template.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return clojure.template$macros.do_template;},new cljs.core.Symbol("clojure.template$macros","do-template","clojure.template$macros/do-template",(-210895595),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"clojure.template$macros","clojure.template$macros",(1039368322),null),new cljs.core.Symbol(null,"do-template","do-template",(-1578627476),null),"clojure/template.clj",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"values","values",(2013177083),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"values","values",(2013177083),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(45),true,(45),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"values","values",(2013177083),null)], null)),"Repeatedly copies expr (in a do block) for each group of arguments\n  in values.  values are automatically partitioned by the number of\n  arguments in argv, an argument vector as in defn.\n\n  Example: (macroexpand '(do-template [x y] (+ y x) 2 4 3 5))\n           ;=> (do (+ 4 2) (+ 5 3))",(cljs.core.truth_(clojure.template$macros.do_template)?clojure.template$macros.do_template.cljs$lang$test:null)])));})()
;

clojure.template$macros.do_template.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,argv,expr,values){
var c = cljs.core.count(argv);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (c){
return (function (a){
return clojure.template$macros.apply_template(argv,expr,a);
});})(c))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$2(c,values))));
});

clojure.template$macros.do_template.cljs$lang$maxFixedArity = (4);

clojure.template$macros.do_template.cljs$lang$applyTo = (function (seq3791){
var G__3792 = cljs.core.first(seq3791);
var seq3791__$1 = cljs.core.next(seq3791);
var G__3793 = cljs.core.first(seq3791__$1);
var seq3791__$2 = cljs.core.next(seq3791__$1);
var G__3794 = cljs.core.first(seq3791__$2);
var seq3791__$3 = cljs.core.next(seq3791__$2);
var G__3795 = cljs.core.first(seq3791__$3);
var seq3791__$4 = cljs.core.next(seq3791__$3);
return clojure.template$macros.do_template.cljs$core$IFn$_invoke$arity$variadic(G__3792,G__3793,G__3794,G__3795,seq3791__$4);
});

return new cljs.core.Var(function(){return clojure.template$macros.do_template;},new cljs.core.Symbol("clojure.template$macros","do-template","clojure.template$macros/do-template",(-210895595),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"clojure.template$macros","clojure.template$macros",(1039368322),null),new cljs.core.Symbol(null,"do-template","do-template",(-1578627476),null),"clojure/template.clj",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"values","values",(2013177083),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"values","values",(2013177083),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(45),true,(45),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"argv","argv",(177740632),null),new cljs.core.Symbol(null,"expr","expr",(-1908713478),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"values","values",(2013177083),null)], null)),"Repeatedly copies expr (in a do block) for each group of arguments\n  in values.  values are automatically partitioned by the number of\n  arguments in argv, an argument vector as in defn.\n\n  Example: (macroexpand '(do-template [x y] (+ y x) 2 4 3 5))\n           ;=> (do (+ 4 2) (+ 5 3))",(cljs.core.truth_(clojure.template$macros.do_template)?clojure.template$macros.do_template.cljs$lang$test:null)]));
})()
;
clojure.template$macros.do_template.cljs$lang$macro = true;

