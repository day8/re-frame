goog.provide("cljs.pprint$macros");
var ret__26478__auto___1599 = (function (){
(function (){
cljs.pprint$macros.with_pretty_writer = (function cljs$pprint$macros$with_pretty_writer(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1600 = arguments.length;
var i__26428__auto___1601 = (0);
while(true){
if((i__26428__auto___1601 < len__26427__auto___1600)){
args__26430__auto__.push((arguments[i__26428__auto___1601]));

var G__1602 = (i__26428__auto___1601 + (1));
i__26428__auto___1601 = G__1602;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((3) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((3)),(0),null)):null);
return cljs.pprint$macros.with_pretty_writer.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.with_pretty_writer;},new cljs.core.Symbol("cljs.pprint$macros","with-pretty-writer","cljs.pprint$macros/with-pretty-writer",(-1143747104),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"with-pretty-writer","with-pretty-writer",(664630002),null),"cljs/pprint.cljc",(29),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(18),true,(18),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.with_pretty_writer)?cljs.pprint$macros.with_pretty_writer.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.with_pretty_writer.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,base_writer,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"base-writer__95__auto__","base-writer__95__auto__",(751091061),null)),(function (){var x__26138__auto__ = base_writer;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"new-writer__96__auto__","new-writer__96__auto__",(1759679240),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","not","cljs.core/not",(100665144),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","pretty-writer?","cljs.pprint/pretty-writer?",(-2126032890),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"base-writer__95__auto__","base-writer__95__auto__",(751091061),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","binding","cljs.core/binding",(2050379843),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"new-writer__96__auto__","new-writer__96__auto__",(1759679240),null)),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","make-pretty-writer","cljs.pprint/make-pretty-writer",(90762412),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"base-writer__95__auto__","base-writer__95__auto__",(751091061),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*print-right-margin*","cljs.pprint/*print-right-margin*",(-56183119),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*print-miser-width*","cljs.pprint/*print-miser-width*",(1588913450),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"base-writer__95__auto__","base-writer__95__auto__",(751091061),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([body,(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","-ppflush","cljs.pprint/-ppflush",(-1019520880),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
});

cljs.pprint$macros.with_pretty_writer.cljs$lang$maxFixedArity = (3);

cljs.pprint$macros.with_pretty_writer.cljs$lang$applyTo = (function (seq1595){
var G__1596 = cljs.core.first(seq1595);
var seq1595__$1 = cljs.core.next(seq1595);
var G__1597 = cljs.core.first(seq1595__$1);
var seq1595__$2 = cljs.core.next(seq1595__$1);
var G__1598 = cljs.core.first(seq1595__$2);
var seq1595__$3 = cljs.core.next(seq1595__$2);
return cljs.pprint$macros.with_pretty_writer.cljs$core$IFn$_invoke$arity$variadic(G__1596,G__1597,G__1598,seq1595__$3);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.with_pretty_writer;},new cljs.core.Symbol("cljs.pprint$macros","with-pretty-writer","cljs.pprint$macros/with-pretty-writer",(-1143747104),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"with-pretty-writer","with-pretty-writer",(664630002),null),"cljs/pprint.cljc",(29),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(18),true,(18),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.with_pretty_writer)?cljs.pprint$macros.with_pretty_writer.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.with_pretty_writer.cljs$lang$macro = true;

var ret__26478__auto___1603 = /**
 * Get the value of the field a named by the argument (which should be a keyword).
 */
(function (){
cljs.pprint$macros.getf = (function cljs$pprint$macros$getf(_AMPERSAND_form,_AMPERSAND_env,sym){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__26138__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"this","this",(1028897902),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.getf;},new cljs.core.Symbol("cljs.pprint$macros","getf","cljs.pprint$macros/getf",(-2116908743),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"getf","getf",(354407947),null),"cljs/pprint.cljc",(15),(1),(28),true,(28),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null)),"Get the value of the field a named by the argument (which should be a keyword).",(cljs.core.truth_(cljs.pprint$macros.getf)?cljs.pprint$macros.getf.cljs$lang$test:null)])));})()
;
cljs.pprint$macros.getf.cljs$lang$macro = true;

var ret__26478__auto___1604 = /**
 * Set the value of the field SYM to NEW-VAL
 */
(function (){
cljs.pprint$macros.setf = (function cljs$pprint$macros$setf(_AMPERSAND_form,_AMPERSAND_env,sym,new_val){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","swap!","cljs.core/swap!",(-2144679919),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"this","this",(1028897902),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",(322326297),null)),(function (){var x__26138__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = new_val;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.setf;},new cljs.core.Symbol("cljs.pprint$macros","setf","cljs.pprint$macros/setf",(-2003672148),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"setf","setf",(1666237790),null),"cljs/pprint.cljc",(15),(1),(35),true,(35),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"new-val","new-val",(902372928),null)], null)),"Set the value of the field SYM to NEW-VAL",(cljs.core.truth_(cljs.pprint$macros.setf)?cljs.pprint$macros.setf.cljs$lang$test:null)])));})()
;
cljs.pprint$macros.setf.cljs$lang$macro = true;

var ret__26478__auto___1609 = (function (){
(function (){
cljs.pprint$macros.deftype = (function cljs$pprint$macros$deftype(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1610 = arguments.length;
var i__26428__auto___1611 = (0);
while(true){
if((i__26428__auto___1611 < len__26427__auto___1610)){
args__26430__auto__.push((arguments[i__26428__auto___1611]));

var G__1612 = (i__26428__auto___1611 + (1));
i__26428__auto___1611 = G__1612;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((3) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((3)),(0),null)):null);
return cljs.pprint$macros.deftype.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.deftype;},new cljs.core.Symbol("cljs.pprint$macros","deftype","cljs.pprint$macros/deftype",(-632046946),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"deftype","deftype",(1980826088),null),"cljs/pprint.cljc",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(40),true,(40),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.deftype)?cljs.pprint$macros.deftype.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.deftype.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,type_name,fields){
var name_str = cljs.core.name(type_name);
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,cljs.core.name),fields);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defrecord","cljs.core/defrecord",(948295858),null)),(function (){var x__26138__auto__ = type_name;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null)),fields__$1)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn-","cljs.core/defn-",(1764521227),null)),(function (){var x__26138__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1("make-"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name_str)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.vec(fields__$1);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__26138__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(type_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".")].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(name_str);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([fields__$1], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn-","cljs.core/defn-",(1764521227),null)),(function (){var x__26138__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name_str),cljs.core.str.cljs$core$IFn$_invoke$arity$1("?")].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","=","cljs.core/=",(-1891498332),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267))),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(name_str);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
});

cljs.pprint$macros.deftype.cljs$lang$maxFixedArity = (3);

cljs.pprint$macros.deftype.cljs$lang$applyTo = (function (seq1605){
var G__1606 = cljs.core.first(seq1605);
var seq1605__$1 = cljs.core.next(seq1605);
var G__1607 = cljs.core.first(seq1605__$1);
var seq1605__$2 = cljs.core.next(seq1605__$1);
var G__1608 = cljs.core.first(seq1605__$2);
var seq1605__$3 = cljs.core.next(seq1605__$2);
return cljs.pprint$macros.deftype.cljs$core$IFn$_invoke$arity$variadic(G__1606,G__1607,G__1608,seq1605__$3);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.deftype;},new cljs.core.Symbol("cljs.pprint$macros","deftype","cljs.pprint$macros/deftype",(-632046946),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"deftype","deftype",(1980826088),null),"cljs/pprint.cljc",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(40),true,(40),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"type-name","type-name",(-742802016),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.deftype)?cljs.pprint$macros.deftype.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.deftype.cljs$lang$macro = true;

(function (){
cljs.pprint$macros.parse_lb_options = (function cljs$pprint$macros$parse_lb_options(opts,body){
var body__$1 = body;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.truth_((function (){var G__1614 = cljs.core.first(body__$1);
return (opts.cljs$core$IFn$_invoke$arity$1 ? opts.cljs$core$IFn$_invoke$arity$1(G__1614) : opts.call(null,G__1614));
})())){
var G__1615 = cljs.core.drop.cljs$core$IFn$_invoke$arity$2((2),body__$1);
var G__1616 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(acc,cljs.core.take.cljs$core$IFn$_invoke$arity$2((2),body__$1));
body__$1 = G__1615;
acc = G__1616;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,acc),body__$1], null);
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.parse_lb_options;},new cljs.core.Symbol("cljs.pprint$macros","parse-lb-options","cljs.pprint$macros/parse-lb-options",(-327142763),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"parse-lb-options","parse-lb-options",(-2126015097),null),"cljs/pprint.cljc",(24),(1),(51),(51),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.parse_lb_options)?cljs.pprint$macros.parse_lb_options.cljs$lang$test:null)])));})()
;
var ret__26478__auto___1623 = (function (){
/**
 * Execute the body as a pretty printing logical block with output to *out* which
 *   must be a pretty printing writer. When used from pprint or cl-format, this can be
 *   assumed.
 * 
 *   This function is intended for use when writing custom dispatch functions.
 * 
 *   Before the body, the caller can optionally specify options: :prefix, :per-line-prefix
 *   and :suffix.
 */
(function (){
cljs.pprint$macros.pprint_logical_block = (function cljs$pprint$macros$pprint_logical_block(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1624 = arguments.length;
var i__26428__auto___1625 = (0);
while(true){
if((i__26428__auto___1625 < len__26427__auto___1624)){
args__26430__auto__.push((arguments[i__26428__auto___1625]));

var G__1626 = (i__26428__auto___1625 + (1));
i__26428__auto___1625 = G__1626;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((2) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((2)),(0),null)):null);
return cljs.pprint$macros.pprint_logical_block.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.pprint_logical_block;},new cljs.core.Symbol("cljs.pprint$macros","pprint-logical-block","cljs.pprint$macros/pprint-logical-block",(745388347),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"pprint-logical-block","pprint-logical-block",(-1314777395),null),"cljs/pprint.cljc",(31),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(58),true,(58),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Execute the body as a pretty printing logical block with output to *out* which\n  must be a pretty printing writer. When used from pprint or cl-format, this can be\n  assumed.\n\n  This function is intended for use when writing custom dispatch functions.\n\n  Before the body, the caller can optionally specify options: :prefix, :per-line-prefix\n  and :suffix.",(cljs.core.truth_(cljs.pprint$macros.pprint_logical_block)?cljs.pprint$macros.pprint_logical_block.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.pprint_logical_block.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,args){
var vec__1620 = cljs.pprint$macros.parse_lb_options(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),null,new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),null,new cljs.core.Keyword(null,"suffix","suffix",(367373057)),null], null), null),args);
var options = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1620,(0),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1620,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","level-exceeded","cljs.pprint/level-exceeded",(-1557018470),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"-write","-write",(1999625154),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,"#")], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","binding","cljs.core/binding",(2050379843),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*current-level*","cljs.pprint/*current-level*",(1299227592),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inc","cljs.core/inc",(-879172610),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*current-level*","cljs.pprint/*current-level*",(1299227592),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*current-length*","cljs.pprint/*current-length*",(-732560897),null)),cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","start-block","cljs.pprint/start-block",(-270767114),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null)),cljs.core.array_seq([(function (){var x__26138__auto__ = new cljs.core.Keyword(null,"prefix","prefix",(-265908465)).cljs$core$IFn$_invoke$arity$1(options);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)).cljs$core$IFn$_invoke$arity$1(options);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = new cljs.core.Keyword(null,"suffix","suffix",(367373057)).cljs$core$IFn$_invoke$arity$1(options);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),body,(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","end-block","cljs.pprint/end-block",(-397543401),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null)], 0)));
});

cljs.pprint$macros.pprint_logical_block.cljs$lang$maxFixedArity = (2);

cljs.pprint$macros.pprint_logical_block.cljs$lang$applyTo = (function (seq1617){
var G__1618 = cljs.core.first(seq1617);
var seq1617__$1 = cljs.core.next(seq1617);
var G__1619 = cljs.core.first(seq1617__$1);
var seq1617__$2 = cljs.core.next(seq1617__$1);
return cljs.pprint$macros.pprint_logical_block.cljs$core$IFn$_invoke$arity$variadic(G__1618,G__1619,seq1617__$2);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.pprint_logical_block;},new cljs.core.Symbol("cljs.pprint$macros","pprint-logical-block","cljs.pprint$macros/pprint-logical-block",(745388347),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"pprint-logical-block","pprint-logical-block",(-1314777395),null),"cljs/pprint.cljc",(31),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(58),true,(58),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Execute the body as a pretty printing logical block with output to *out* which\n  must be a pretty printing writer. When used from pprint or cl-format, this can be\n  assumed.\n\n  This function is intended for use when writing custom dispatch functions.\n\n  Before the body, the caller can optionally specify options: :prefix, :per-line-prefix\n  and :suffix.",(cljs.core.truth_(cljs.pprint$macros.pprint_logical_block)?cljs.pprint$macros.pprint_logical_block.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.pprint_logical_block.cljs$lang$macro = true;

(function (){
cljs.pprint$macros.macroexpand = (function cljs$pprint$macros$macroexpand(env,form){
var form__$1 = form;
var form_SINGLEQUOTE_ = cljs.analyzer.macroexpand_1(env,form__$1);
while(true){
if(!((form__$1 === form_SINGLEQUOTE_))){
var G__1627 = form_SINGLEQUOTE_;
var G__1628 = cljs.analyzer.macroexpand_1(env,form_SINGLEQUOTE_);
form__$1 = G__1627;
form_SINGLEQUOTE_ = G__1628;
continue;
} else {
return form_SINGLEQUOTE_;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.macroexpand;},new cljs.core.Symbol("cljs.pprint$macros","macroexpand","cljs.pprint$macros/macroexpand",(-1514522090),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"macroexpand","macroexpand",(1509933344),null),"cljs/pprint.cljc",(21),(4),(83),(83),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",(-175281708),null),new cljs.core.Symbol(null,"form","form",(16469056),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.macroexpand)?cljs.pprint$macros.macroexpand.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint$macros.pll_mod_body = (function cljs$pprint$macros$pll_mod_body(env,var_sym,body){
var inner = (function cljs$pprint$macros$pll_mod_body_$_inner(form){
if(cljs.core.seq_QMARK_(form)){
var form__$1 = cljs.pprint$macros.macroexpand(env,form);
var pred__1678 = cljs.core._EQ_;
var expr__1679 = cljs.core.first(form__$1);
if(cljs.core.truth_((function (){var G__1681 = new cljs.core.Symbol(null,"loop*","loop*",(615029416),null);
var G__1682 = expr__1679;
return (pred__1678.cljs$core$IFn$_invoke$arity$2 ? pred__1678.cljs$core$IFn$_invoke$arity$2(G__1681,G__1682) : pred__1678.call(null,G__1681,G__1682));
})())){
return form__$1;
} else {
if(cljs.core.truth_((function (){var G__1683 = new cljs.core.Symbol(null,"recur","recur",(1202958259),null);
var G__1684 = expr__1679;
return (pred__1678.cljs$core$IFn$_invoke$arity$2 ? pred__1678.cljs$core$IFn$_invoke$arity$2(G__1683,G__1684) : pred__1678.call(null,G__1683,G__1684));
})())){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"recur","recur",(1202958259),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inc","cljs.core/inc",(-879172610),null)),(function (){var x__26138__auto__ = var_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})())),cljs.core.rest(form__$1));
} else {
return clojure.walk.walk(cljs$pprint$macros$pll_mod_body_$_inner,cljs.core.identity,form__$1);
}
}
} else {
return form;
}
});
return clojure.walk.walk(inner,cljs.core.identity,body);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.pll_mod_body;},new cljs.core.Symbol("cljs.pprint$macros","pll-mod-body","cljs.pprint$macros/pll-mod-body",(632679419),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"pll-mod-body","pll-mod-body",(-907509623),null),"cljs/pprint.cljc",(20),(1),(90),(90),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",(-175281708),null),new cljs.core.Symbol(null,"var-sym","var-sym",(-1615244789),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.pll_mod_body)?cljs.pprint$macros.pll_mod_body.cljs$lang$test:null)])));})()
;
var ret__26478__auto___1689 = (function (){
/**
 * A version of loop that iterates at most *print-length* times. This is designed
 *   for use in pretty-printer dispatch functions.
 */
(function (){
cljs.pprint$macros.print_length_loop = (function cljs$pprint$macros$print_length_loop(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1690 = arguments.length;
var i__26428__auto___1691 = (0);
while(true){
if((i__26428__auto___1691 < len__26427__auto___1690)){
args__26430__auto__.push((arguments[i__26428__auto___1691]));

var G__1692 = (i__26428__auto___1691 + (1));
i__26428__auto___1691 = G__1692;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((3) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((3)),(0),null)):null);
return cljs.pprint$macros.print_length_loop.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.print_length_loop;},new cljs.core.Symbol("cljs.pprint$macros","print-length-loop","cljs.pprint$macros/print-length-loop",(1780383130),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"print-length-loop","print-length-loop",(-1763896600),null),"cljs/pprint.cljc",(28),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(102),true,(102),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"A version of loop that iterates at most *print-length* times. This is designed\n  for use in pretty-printer dispatch functions.",(cljs.core.truth_(cljs.pprint$macros.print_length_loop)?cljs.pprint$macros.print_length_loop.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.print_length_loop.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
var count_var = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("length-count");
var mod_body = cljs.pprint$macros.pll_mod_body(_AMPERSAND_env,count_var,body);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","loop","cljs.core/loop",(-1829423021),null)),(function (){var x__26138__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,count_var,(0),bindings);
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","or","cljs.core/or",(1201033885),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","not","cljs.core/not",(100665144),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*print-length*","cljs.core/*print-length*",(-20766927),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<","cljs.core/<",(1677496129),null)),(function (){var x__26138__auto__ = count_var;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*print-length*","cljs.core/*print-length*",(-20766927),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),mod_body));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"-write","-write",(1999625154),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*out*","cljs.core/*out*",(-1813565621),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,"...")], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
});

cljs.pprint$macros.print_length_loop.cljs$lang$maxFixedArity = (3);

cljs.pprint$macros.print_length_loop.cljs$lang$applyTo = (function (seq1685){
var G__1686 = cljs.core.first(seq1685);
var seq1685__$1 = cljs.core.next(seq1685);
var G__1687 = cljs.core.first(seq1685__$1);
var seq1685__$2 = cljs.core.next(seq1685__$1);
var G__1688 = cljs.core.first(seq1685__$2);
var seq1685__$3 = cljs.core.next(seq1685__$2);
return cljs.pprint$macros.print_length_loop.cljs$core$IFn$_invoke$arity$variadic(G__1686,G__1687,G__1688,seq1685__$3);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.print_length_loop;},new cljs.core.Symbol("cljs.pprint$macros","print-length-loop","cljs.pprint$macros/print-length-loop",(1780383130),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"print-length-loop","print-length-loop",(-1763896600),null),"cljs/pprint.cljc",(28),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(102),true,(102),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"bindings","bindings",(-1383038577),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"A version of loop that iterates at most *print-length* times. This is designed\n  for use in pretty-printer dispatch functions.",(cljs.core.truth_(cljs.pprint$macros.print_length_loop)?cljs.pprint$macros.print_length_loop.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.print_length_loop.cljs$lang$macro = true;

(function (){
cljs.pprint$macros.process_directive_table_element = (function cljs$pprint$macros$process_directive_table_element(p__1693){
var vec__1697 = p__1693;
var seq__1698 = cljs.core.seq(vec__1697);
var first__1699 = cljs.core.first(seq__1698);
var seq__1698__$1 = cljs.core.next(seq__1698);
var char$ = first__1699;
var first__1699__$1 = cljs.core.first(seq__1698__$1);
var seq__1698__$2 = cljs.core.next(seq__1698__$1);
var params = first__1699__$1;
var first__1699__$2 = cljs.core.first(seq__1698__$2);
var seq__1698__$3 = cljs.core.next(seq__1698__$2);
var flags = first__1699__$2;
var first__1699__$3 = cljs.core.first(seq__1698__$3);
var seq__1698__$4 = cljs.core.next(seq__1698__$3);
var bracket_info = first__1699__$3;
var generator_fn = seq__1698__$4;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [char$,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),char$,new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","array-map","cljs.core/array-map",(-1519210683),null)),params)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),flags,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),bracket_info,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.list(new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),generator_fn)], null)], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.process_directive_table_element;},new cljs.core.Symbol("cljs.pprint$macros","process-directive-table-element","cljs.pprint$macros/process-directive-table-element",(1090730457),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"process-directive-table-element","process-directive-table-element",(-1253140753),null),"cljs/pprint.cljc",(39),(1),(113),(113),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"char","char",(998943941),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"flags","flags",(-879017694),null),new cljs.core.Symbol(null,"bracket-info","bracket-info",(40438753),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"generator-fn","generator-fn",(-1842584113),null)], null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.process_directive_table_element)?cljs.pprint$macros.process_directive_table_element.cljs$lang$test:null)])));})()
;
var ret__26478__auto___1703 = (function (){
(function (){
cljs.pprint$macros.defdirectives = (function cljs$pprint$macros$defdirectives(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1704 = arguments.length;
var i__26428__auto___1705 = (0);
while(true){
if((i__26428__auto___1705 < len__26427__auto___1704)){
args__26430__auto__.push((arguments[i__26428__auto___1705]));

var G__1706 = (i__26428__auto___1705 + (1));
i__26428__auto___1705 = G__1706;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((2) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((2)),(0),null)):null);
return cljs.pprint$macros.defdirectives.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.defdirectives;},new cljs.core.Symbol("cljs.pprint$macros","defdirectives","cljs.pprint$macros/defdirectives",(859759226),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"defdirectives","defdirectives",(-553828536),null),"cljs/pprint.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(121),true,(122),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.defdirectives)?cljs.pprint$macros.defdirectives.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.defdirectives.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,directives){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"def","def",(597100991),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"directive-table","directive-table",(-1558673742),null)),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","hash-map","cljs.core/hash-map",(303385767),null)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.pprint$macros.process_directive_table_element,cljs.core.array_seq([directives], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
});

cljs.pprint$macros.defdirectives.cljs$lang$maxFixedArity = (2);

cljs.pprint$macros.defdirectives.cljs$lang$applyTo = (function (seq1700){
var G__1701 = cljs.core.first(seq1700);
var seq1700__$1 = cljs.core.next(seq1700);
var G__1702 = cljs.core.first(seq1700__$1);
var seq1700__$2 = cljs.core.next(seq1700__$1);
return cljs.pprint$macros.defdirectives.cljs$core$IFn$_invoke$arity$variadic(G__1701,G__1702,seq1700__$2);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.defdirectives;},new cljs.core.Symbol("cljs.pprint$macros","defdirectives","cljs.pprint$macros/defdirectives",(859759226),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"defdirectives","defdirectives",(-553828536),null),"cljs/pprint.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(121),true,(122),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"directives","directives",(-362744829),null)], null)),null,(cljs.core.truth_(cljs.pprint$macros.defdirectives)?cljs.pprint$macros.defdirectives.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.defdirectives.cljs$lang$macro = true;

var ret__26478__auto___1707 = /**
 * Makes a function which can directly run format-in. The function is
 * fn [stream & args] ... and returns nil unless the stream is nil (meaning
 * output to a string) in which case it returns the resulting string.
 * 
 * format-in can be either a control string or a previously compiled format.
 */
(function (){
cljs.pprint$macros.formatter = (function cljs$pprint$macros$formatter(_AMPERSAND_form,_AMPERSAND_env,format_in){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__98__auto__","format-in__98__auto__",(-1968132463),null)),(function (){var x__26138__auto__ = format_in;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-c-c__99__auto__","my-c-c__99__auto__",(-492386046),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","cached-compile","cljs.pprint/cached-compile",(194847165),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-e-f__100__auto__","my-e-f__100__auto__",(-1317331752),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","execute-format","cljs.pprint/execute-format",(1971623147),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-i-n__101__auto__","my-i-n__101__auto__",(-1037223227),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","init-navigator","cljs.pprint/init-navigator",(1904204595),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"cf__102__auto__","cf__102__auto__",(-1413231249),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",(-2072921719),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__98__auto__","format-in__98__auto__",(-1968132463),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-c-c__99__auto__","my-c-c__99__auto__",(-492386046),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__98__auto__","format-in__98__auto__",(-1968132463),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__98__auto__","format-in__98__auto__",(-1968132463),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"stream__103__auto__","stream__103__auto__",(-586560797),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",(-2144855648),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__104__auto__","args__104__auto__",(690451702),null))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"navigator__105__auto__","navigator__105__auto__",(-698798598),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-i-n__101__auto__","my-i-n__101__auto__",(-1037223227),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__104__auto__","args__104__auto__",(690451702),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"my-e-f__100__auto__","my-e-f__100__auto__",(-1317331752),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"stream__103__auto__","stream__103__auto__",(-586560797),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"cf__102__auto__","cf__102__auto__",(-1413231249),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"navigator__105__auto__","navigator__105__auto__",(-698798598),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.formatter;},new cljs.core.Symbol("cljs.pprint$macros","formatter","cljs.pprint$macros/formatter",(-793001470),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"formatter","formatter",(1157522704),null),"cljs/pprint.cljc",(20),(1),(127),true,(127),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null)], null)),"Makes a function which can directly run format-in. The function is\nfn [stream & args] ... and returns nil unless the stream is nil (meaning\noutput to a string) in which case it returns the resulting string.\n\nformat-in can be either a control string or a previously compiled format.",(cljs.core.truth_(cljs.pprint$macros.formatter)?cljs.pprint$macros.formatter.cljs$lang$test:null)])));})()
;
cljs.pprint$macros.formatter.cljs$lang$macro = true;

var ret__26478__auto___1708 = /**
 * Makes a function which can directly run format-in. The function is
 * fn [& args] ... and returns nil. This version of the formatter macro is
 * designed to be used with *out* set to an appropriate Writer. In particular,
 * this is meant to be used as part of a pretty printer dispatch method.
 * 
 * format-in can be either a control string or a previously compiled format.
 */
(function (){
cljs.pprint$macros.formatter_out = (function cljs$pprint$macros$formatter_out(_AMPERSAND_form,_AMPERSAND_env,format_in){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__106__auto__","format-in__106__auto__",(-118864987),null)),(function (){var x__26138__auto__ = format_in;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"cf__107__auto__","cf__107__auto__",(-1057138610),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",(-2072921719),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__106__auto__","format-in__106__auto__",(-118864987),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","cached-compile","cljs.pprint/cached-compile",(194847165),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__106__auto__","format-in__106__auto__",(-118864987),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"format-in__106__auto__","format-in__106__auto__",(-118864987),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",(-2144855648),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__108__auto__","args__108__auto__",(756617392),null)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"navigator__109__auto__","navigator__109__auto__",(-452005149),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","init-navigator","cljs.pprint/init-navigator",(1904204595),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__108__auto__","args__108__auto__",(756617392),null))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","execute-format","cljs.pprint/execute-format",(1971623147),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"cf__107__auto__","cf__107__auto__",(-1057138610),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"navigator__109__auto__","navigator__109__auto__",(-452005149),null))], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.formatter_out;},new cljs.core.Symbol("cljs.pprint$macros","formatter-out","cljs.pprint$macros/formatter-out",(-1775164478),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"formatter-out","formatter-out",(1660156112),null),"cljs/pprint.cljc",(24),(1),(143),true,(143),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null)], null)),"Makes a function which can directly run format-in. The function is\nfn [& args] ... and returns nil. This version of the formatter macro is\ndesigned to be used with *out* set to an appropriate Writer. In particular,\nthis is meant to be used as part of a pretty printer dispatch method.\n\nformat-in can be either a control string or a previously compiled format.",(cljs.core.truth_(cljs.pprint$macros.formatter_out)?cljs.pprint$macros.formatter_out.cljs$lang$test:null)])));})()
;
cljs.pprint$macros.formatter_out.cljs$lang$macro = true;

var ret__26478__auto___1713 = (function (){
/**
 * Execute body with the pretty print dispatch function bound to function.
 */
(function (){
cljs.pprint$macros.with_pprint_dispatch = (function cljs$pprint$macros$with_pprint_dispatch(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1714 = arguments.length;
var i__26428__auto___1715 = (0);
while(true){
if((i__26428__auto___1715 < len__26427__auto___1714)){
args__26430__auto__.push((arguments[i__26428__auto___1715]));

var G__1716 = (i__26428__auto___1715 + (1));
i__26428__auto___1715 = G__1716;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((3) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((3)),(0),null)):null);
return cljs.pprint$macros.with_pprint_dispatch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.with_pprint_dispatch;},new cljs.core.Symbol("cljs.pprint$macros","with-pprint-dispatch","cljs.pprint$macros/with-pprint-dispatch",(648142497),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"with-pprint-dispatch","with-pprint-dispatch",(-1302026849),null),"cljs/pprint.cljc",(31),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(157),true,(157),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"Execute body with the pretty print dispatch function bound to function.",(cljs.core.truth_(cljs.pprint$macros.with_pprint_dispatch)?cljs.pprint$macros.with_pprint_dispatch.cljs$lang$test:null)])));})()
;

cljs.pprint$macros.with_pprint_dispatch.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,function$,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","binding","cljs.core/binding",(2050379843),null)),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","*print-pprint-dispatch*","cljs.pprint/*print-pprint-dispatch*",(-1820734013),null)),(function (){var x__26138__auto__ = function$;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([body], 0)));
});

cljs.pprint$macros.with_pprint_dispatch.cljs$lang$maxFixedArity = (3);

cljs.pprint$macros.with_pprint_dispatch.cljs$lang$applyTo = (function (seq1709){
var G__1710 = cljs.core.first(seq1709);
var seq1709__$1 = cljs.core.next(seq1709);
var G__1711 = cljs.core.first(seq1709__$1);
var seq1709__$2 = cljs.core.next(seq1709__$1);
var G__1712 = cljs.core.first(seq1709__$2);
var seq1709__$3 = cljs.core.next(seq1709__$2);
return cljs.pprint$macros.with_pprint_dispatch.cljs$core$IFn$_invoke$arity$variadic(G__1710,G__1711,G__1712,seq1709__$3);
});

return new cljs.core.Var(function(){return cljs.pprint$macros.with_pprint_dispatch;},new cljs.core.Symbol("cljs.pprint$macros","with-pprint-dispatch","cljs.pprint$macros/with-pprint-dispatch",(648142497),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"with-pprint-dispatch","with-pprint-dispatch",(-1302026849),null),"cljs/pprint.cljc",(31),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(157),true,(157),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"function","function",(-486723946),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"Execute body with the pretty print dispatch function bound to function.",(cljs.core.truth_(cljs.pprint$macros.with_pprint_dispatch)?cljs.pprint$macros.with_pprint_dispatch.cljs$lang$test:null)]));
})()
;
cljs.pprint$macros.with_pprint_dispatch.cljs$lang$macro = true;

var ret__26478__auto___1717 = /**
 * A convenience macro that pretty prints the last thing output. This is
 * exactly equivalent to (pprint *1).
 */
(function (){
cljs.pprint$macros.pp = (function cljs$pprint$macros$pp(_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.pprint","pprint","cljs.pprint/pprint",(-1547147237),null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","*1","cljs.core/*1",(-1526381047),null))));
}); return (
new cljs.core.Var(function(){return cljs.pprint$macros.pp;},new cljs.core.Symbol("cljs.pprint$macros","pp","cljs.pprint$macros/pp",(-1693410343),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint$macros","cljs.pprint$macros",(-1393053659),null),new cljs.core.Symbol(null,"pp","pp",(927842543),null),"cljs/pprint.cljc",(13),(1),(163),true,(163),cljs.core.list(cljs.core.PersistentVector.EMPTY),"A convenience macro that pretty prints the last thing output. This is\nexactly equivalent to (pprint *1).",(cljs.core.truth_(cljs.pprint$macros.pp)?cljs.pprint$macros.pp.cljs$lang$test:null)])));})()
;
cljs.pprint$macros.pp.cljs$lang$macro = true;

