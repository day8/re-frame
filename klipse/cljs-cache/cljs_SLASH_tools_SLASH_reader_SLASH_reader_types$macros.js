goog.provide("cljs.tools.reader.reader_types$macros");
var ret__26478__auto___128 = (function (){
/**
 * If reader is a SourceLoggingPushbackReader, execute body in a source
 *   logging context. Otherwise, execute body, returning the result.
 */
(function (){
cljs.tools.reader.reader_types$macros.log_source = (function cljs$tools$reader$reader_types$macros$log_source(var_args){
var args__26430__auto__ = [];
var len__26427__auto___129 = arguments.length;
var i__26428__auto___130 = (0);
while(true){
if((i__26428__auto___130 < len__26427__auto___129)){
args__26430__auto__.push((arguments[i__26428__auto___130]));

var G__131 = (i__26428__auto___130 + (1));
i__26428__auto___130 = G__131;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((3) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((3)),(0),null)):null);
return cljs.tools.reader.reader_types$macros.log_source.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.tools.reader.reader_types$macros.log_source;},new cljs.core.Symbol("cljs.tools.reader.reader-types$macros","log-source","cljs.tools.reader.reader-types$macros/log-source",(-732248584),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.tools.reader.reader-types$macros","cljs.tools.reader.reader-types$macros",(-1830708373),null),new cljs.core.Symbol(null,"log-source","log-source",(-1213142856),null),"cljs/tools/reader/reader_types.clj",(21),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(3),true,(3),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"If reader is a SourceLoggingPushbackReader, execute body in a source\n  logging context. Otherwise, execute body, returning the result.",(cljs.core.truth_(cljs.tools.reader.reader_types$macros.log_source)?cljs.tools.reader.reader_types$macros.log_source.cljs$lang$test:null)])));})()
;

cljs.tools.reader.reader_types$macros.log_source.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,reader,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","and","cljs.core/and",(-6692549),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.tools.reader.reader-types","source-logging-reader?","cljs.tools.reader.reader-types/source-logging-reader?",(-1520527434),null)),(function (){var x__26138__auto__ = reader;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","not","cljs.core/not",(100665144),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.tools.reader.impl.utils","whitespace?","cljs.tools.reader.impl.utils/whitespace?",(-2091653184),null)),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.tools.reader.reader-types","peek-char","cljs.tools.reader.reader-types/peek-char",(692825686),null)),(function (){var x__26138__auto__ = reader;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.tools.reader.reader-types","log-source*","cljs.tools.reader.reader-types/log-source*",(-827357451),null)),(function (){var x__26138__auto__ = reader;
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__26138__auto__ = cljs.core.with_meta(cljs.core.with_meta(new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"once","once",(-262568523)),true], null)),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"file","file",(-1269645878))),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs","tools.reader.reader-types","cljs/tools.reader.reader-types",(-745547004),null)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"line","line",(212345235))),cljs.core._conj(cljs.core.List.EMPTY,(9)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"column","column",(2078222095))),cljs.core._conj(cljs.core.List.EMPTY,(35)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-line","end-line",(1837326455))),cljs.core._conj(cljs.core.List.EMPTY,(9)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-column","end-column",(1425389514))),cljs.core._conj(cljs.core.List.EMPTY,(38)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"once","once",(-262568523))),cljs.core._conj(cljs.core.List.EMPTY,true)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$0()));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),cljs.core.array_seq([body], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})(),(function (){var x__26138__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),body));
return cljs.core._conj(cljs.core.List.EMPTY,x__26138__auto__);
})()], 0)));
});

cljs.tools.reader.reader_types$macros.log_source.cljs$lang$maxFixedArity = (3);

cljs.tools.reader.reader_types$macros.log_source.cljs$lang$applyTo = (function (seq124){
var G__125 = cljs.core.first(seq124);
var seq124__$1 = cljs.core.next(seq124);
var G__126 = cljs.core.first(seq124__$1);
var seq124__$2 = cljs.core.next(seq124__$1);
var G__127 = cljs.core.first(seq124__$2);
var seq124__$3 = cljs.core.next(seq124__$2);
return cljs.tools.reader.reader_types$macros.log_source.cljs$core$IFn$_invoke$arity$variadic(G__125,G__126,G__127,seq124__$3);
});

return new cljs.core.Var(function(){return cljs.tools.reader.reader_types$macros.log_source;},new cljs.core.Symbol("cljs.tools.reader.reader-types$macros","log-source","cljs.tools.reader.reader-types$macros/log-source",(-732248584),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.tools.reader.reader-types$macros","cljs.tools.reader.reader-types$macros",(-1830708373),null),new cljs.core.Symbol(null,"log-source","log-source",(-1213142856),null),"cljs/tools/reader/reader_types.clj",(21),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(3),true,(3),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"reader","reader",(1810192380),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"If reader is a SourceLoggingPushbackReader, execute body in a source\n  logging context. Otherwise, execute body, returning the result.",(cljs.core.truth_(cljs.tools.reader.reader_types$macros.log_source)?cljs.tools.reader.reader_types$macros.log_source.cljs$lang$test:null)]));
})()
;
cljs.tools.reader.reader_types$macros.log_source.cljs$lang$macro = true;

