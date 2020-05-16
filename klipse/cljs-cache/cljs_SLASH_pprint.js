goog.provide("cljs.pprint");
(function (){
cljs.pprint.print = (function cljs$pprint$print(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1719 = arguments.length;
var i__26428__auto___1720 = (0);
while(true){
if((i__26428__auto___1720 < len__26427__auto___1719)){
args__26430__auto__.push((arguments[i__26428__auto___1720]));

var G__1721 = (i__26428__auto___1720 + (1));
i__26428__auto___1720 = G__1721;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((0) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((0)),(0),null)):null);
return cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.print;},new cljs.core.Symbol("cljs.pprint","print","cljs.pprint/print",(-1225708628),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"print","print",(-1354873355),null),"cljs/pprint.cljs",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(25),(25),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.print)?cljs.pprint.print.cljs$lang$test:null)])));})()
;

cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic = (function (more){
return cljs.core._write(cljs.core._STAR_out_STAR_,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.print_str,more));
});

cljs.pprint.print.cljs$lang$maxFixedArity = (0);

cljs.pprint.print.cljs$lang$applyTo = (function (seq1718){
return cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq1718));
});

new cljs.core.Var(function(){return cljs.pprint.print;},new cljs.core.Symbol("cljs.pprint","print","cljs.pprint/print",(-1225708628),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"print","print",(-1354873355),null),"cljs/pprint.cljs",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(25),(25),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.print)?cljs.pprint.print.cljs$lang$test:null)]));
(function (){
cljs.pprint.println = (function cljs$pprint$println(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1723 = arguments.length;
var i__26428__auto___1724 = (0);
while(true){
if((i__26428__auto___1724 < len__26427__auto___1723)){
args__26430__auto__.push((arguments[i__26428__auto___1724]));

var G__1725 = (i__26428__auto___1724 + (1));
i__26428__auto___1724 = G__1725;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((0) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((0)),(0),null)):null);
return cljs.pprint.println.cljs$core$IFn$_invoke$arity$variadic(argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.println;},new cljs.core.Symbol("cljs.pprint","println","cljs.pprint/println",(-821091800),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"println","println",(-733595439),null),"cljs/pprint.cljs",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(28),(28),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.println)?cljs.pprint.println.cljs$lang$test:null)])));})()
;

cljs.pprint.println.cljs$core$IFn$_invoke$arity$variadic = (function (more){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.pprint.print,more);

return cljs.core._write(cljs.core._STAR_out_STAR_,"\n");
});

cljs.pprint.println.cljs$lang$maxFixedArity = (0);

cljs.pprint.println.cljs$lang$applyTo = (function (seq1722){
return cljs.pprint.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq1722));
});

new cljs.core.Var(function(){return cljs.pprint.println;},new cljs.core.Symbol("cljs.pprint","println","cljs.pprint/println",(-821091800),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"println","println",(-733595439),null),"cljs/pprint.cljs",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(28),(28),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.println)?cljs.pprint.println.cljs$lang$test:null)]));
(function (){
cljs.pprint.print_char = (function cljs$pprint$print_char(c){
return cljs.core._write(cljs.core._STAR_out_STAR_,(function (){var pred__1729 = cljs.core._EQ_;
var expr__1730 = c;
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\b",expr__1730) : pred__1729.call(null,"\b",expr__1730)))){
return "\\backspace";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\t",expr__1730) : pred__1729.call(null,"\t",expr__1730)))){
return "\\tab";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\n",expr__1730) : pred__1729.call(null,"\n",expr__1730)))){
return "\\newline";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\f",expr__1730) : pred__1729.call(null,"\f",expr__1730)))){
return "\\formfeed";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\r",expr__1730) : pred__1729.call(null,"\r",expr__1730)))){
return "\\return";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\"",expr__1730) : pred__1729.call(null,"\"",expr__1730)))){
return "\\\"";
} else {
if(cljs.core.truth_((pred__1729.cljs$core$IFn$_invoke$arity$2 ? pred__1729.cljs$core$IFn$_invoke$arity$2("\\",expr__1730) : pred__1729.call(null,"\\",expr__1730)))){
return "\\\\";
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("\\"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('');
}
}
}
}
}
}
}
})());
}); return (
new cljs.core.Var(function(){return cljs.pprint.print_char;},new cljs.core.Symbol("cljs.pprint","print-char","cljs.pprint/print-char",(941356485),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"print-char","print-char",(550510524),null),"cljs/pprint.cljs",(18),(1),(32),(32),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),null,(cljs.core.truth_(cljs.pprint.print_char)?cljs.pprint.print_char.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pr = (function cljs$pprint$pr(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1733 = arguments.length;
var i__26428__auto___1734 = (0);
while(true){
if((i__26428__auto___1734 < len__26427__auto___1733)){
args__26430__auto__.push((arguments[i__26428__auto___1734]));

var G__1735 = (i__26428__auto___1734 + (1));
i__26428__auto___1734 = G__1735;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((0) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((0)),(0),null)):null);
return cljs.pprint.pr.cljs$core$IFn$_invoke$arity$variadic(argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.pr;},new cljs.core.Symbol("cljs.pprint","pr","cljs.pprint/pr",(959901194),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pr","pr",(1056937027),null),"cljs/pprint.cljs",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),true,(43),(43),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.pr)?cljs.pprint.pr.cljs$lang$test:null)])));})()
;

cljs.pprint.pr.cljs$core$IFn$_invoke$arity$variadic = (function (more){
return cljs.core._write(cljs.core._STAR_out_STAR_,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.pr_str,more));
});

cljs.pprint.pr.cljs$lang$maxFixedArity = (0);

cljs.pprint.pr.cljs$lang$applyTo = (function (seq1732){
return cljs.pprint.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq1732));
});

new cljs.core.Var(function(){return cljs.pprint.pr;},new cljs.core.Symbol("cljs.pprint","pr","cljs.pprint/pr",(959901194),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pr","pr",(1056937027),null),"cljs/pprint.cljs",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),true,(43),(43),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.pr)?cljs.pprint.pr.cljs$lang$test:null)]));
(function (){
cljs.pprint.prn = (function cljs$pprint$prn(var_args){
var args__26430__auto__ = [];
var len__26427__auto___1737 = arguments.length;
var i__26428__auto___1738 = (0);
while(true){
if((i__26428__auto___1738 < len__26427__auto___1737)){
args__26430__auto__.push((arguments[i__26428__auto___1738]));

var G__1739 = (i__26428__auto___1738 + (1));
i__26428__auto___1738 = G__1739;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((0) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((0)),(0),null)):null);
return cljs.pprint.prn.cljs$core$IFn$_invoke$arity$variadic(argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.prn;},new cljs.core.Symbol("cljs.pprint","prn","cljs.pprint/prn",(1172050406),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"prn","prn",(1561684909),null),"cljs/pprint.cljs",(11),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(46),(46),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.prn)?cljs.pprint.prn.cljs$lang$test:null)])));})()
;

cljs.pprint.prn.cljs$core$IFn$_invoke$arity$variadic = (function (more){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.pprint.pr,more);

return cljs.core._write(cljs.core._STAR_out_STAR_,"\n");
});

cljs.pprint.prn.cljs$lang$maxFixedArity = (0);

cljs.pprint.prn.cljs$lang$applyTo = (function (seq1736){
return cljs.pprint.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq1736));
});

new cljs.core.Var(function(){return cljs.pprint.prn;},new cljs.core.Symbol("cljs.pprint","prn","cljs.pprint/prn",(1172050406),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"prn","prn",(1561684909),null),"cljs/pprint.cljs",(11),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(0),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"more","more",(-418290273),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(46),(46),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"more","more",(-418290273),null)], null)),null,(cljs.core.truth_(cljs.pprint.prn)?cljs.pprint.prn.cljs$lang$test:null)]));
/**
 * Returns true if n is an float.
 */
(function (){
cljs.pprint.float_QMARK_ = (function cljs$pprint$float_QMARK_(n){
return (typeof n === 'number') && (!(isNaN(n))) && (!((n === Infinity))) && (!((parseFloat(n) === parseInt(n,(10)))));
}); return (
new cljs.core.Var(function(){return cljs.pprint.float_QMARK_;},new cljs.core.Symbol("cljs.pprint","float?","cljs.pprint/float?",(554811137),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"float?","float?",(673884616),null),"cljs/pprint.cljs",(22),(1),(54),(54),new cljs.core.Symbol(null,"boolean","boolean",(-278886877),null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null)),"Returns true if n is an float.",((cljs.pprint.float_QMARK_)?cljs.pprint.float_QMARK_.cljs$lang$test:null)])));})()
;
/**
 * Convert char to int
 */
(function (){
cljs.pprint.char_code = (function cljs$pprint$char_code(c){
if(typeof c === 'number'){
return c;
} else {
if((typeof c === 'string') && ((c.length === (1)))){
return c.charCodeAt((0));
} else {
throw (new Error("Argument to char must be a character or number"));

}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.char_code;},new cljs.core.Symbol("cljs.pprint","char-code","cljs.pprint/char-code",(-2021209987),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"char-code","char-code",(-1900072444),null),"cljs/pprint.cljs",(16),(1),(62),(62),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),"Convert char to int",(cljs.core.truth_(cljs.pprint.char_code)?cljs.pprint.char_code.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.map_passing_context = (function cljs$pprint$map_passing_context(func,initial_context,lis){
var context = initial_context;
var lis__$1 = lis;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(lis__$1)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,context], null);
} else {
var this$ = cljs.core.first(lis__$1);
var remainder = cljs.core.next(lis__$1);
var vec__1743 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(func,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$,context], null));
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1743,(0),null);
var new_context = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1743,(1),null);
var G__1746 = new_context;
var G__1747 = remainder;
var G__1748 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,result);
context = G__1746;
lis__$1 = G__1747;
acc = G__1748;
continue;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.map_passing_context;},new cljs.core.Symbol("cljs.pprint","map-passing-context","cljs.pprint/map-passing-context",(1281452330),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map-passing-context","map-passing-context",(1462402925),null),"cljs/pprint.cljs",(27),(1),(74),(74),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"func","func",(1401825487),null),new cljs.core.Symbol(null,"initial-context","initial-context",(1607621432),null),new cljs.core.Symbol(null,"lis","lis",(649343131),null)], null)),null,(cljs.core.truth_(cljs.pprint.map_passing_context)?cljs.pprint.map_passing_context.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.consume = (function cljs$pprint$consume(func,initial_context){
var context = initial_context;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
var vec__1752 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(func,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [context], null));
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1752,(0),null);
var new_context = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1752,(1),null);
if(cljs.core.not(result)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,new_context], null);
} else {
var G__1755 = new_context;
var G__1756 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,result);
context = G__1755;
acc = G__1756;
continue;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.consume;},new cljs.core.Symbol("cljs.pprint","consume","cljs.pprint/consume",(1842778154),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"consume","consume",(1712962161),null),"cljs/pprint.cljs",(15),(1),(85),(85),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"func","func",(1401825487),null),new cljs.core.Symbol(null,"initial-context","initial-context",(1607621432),null)], null)),null,(cljs.core.truth_(cljs.pprint.consume)?cljs.pprint.consume.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.consume_while = (function cljs$pprint$consume_while(func,initial_context){
var context = initial_context;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
var vec__1760 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(func,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [context], null));
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1760,(0),null);
var continue$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1760,(1),null);
var new_context = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1760,(2),null);
if(cljs.core.not(continue$)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,context], null);
} else {
var G__1763 = new_context;
var G__1764 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,result);
context = G__1763;
acc = G__1764;
continue;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.consume_while;},new cljs.core.Symbol("cljs.pprint","consume-while","cljs.pprint/consume-while",(-2134406342),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"consume-while","consume-while",(-1743822595),null),"cljs/pprint.cljs",(21),(1),(93),(93),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"func","func",(1401825487),null),new cljs.core.Symbol(null,"initial-context","initial-context",(1607621432),null)], null)),null,(cljs.core.truth_(cljs.pprint.consume_while)?cljs.pprint.consume_while.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.unzip_map = (function cljs$pprint$unzip_map(m){

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__25932__auto__ = (function cljs$pprint$unzip_map_$_iter__1825(s__1826){
return (new cljs.core.LazySeq(null,(function (){
var s__1826__$1 = s__1826;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__1826__$1);
if(temp__21890__auto__){
var s__1826__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__1826__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__1826__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__1828 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__1827 = (0);
while(true){
if((i__1827 < size__25931__auto__)){
var vec__1843 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__1827);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1843,(0),null);
var vec__1846 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1843,(1),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1846,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1846,(1),null);
cljs.core.chunk_append(b__1828,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v1], null));

var G__1885 = (i__1827 + (1));
i__1827 = G__1885;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__1828),cljs$pprint$unzip_map_$_iter__1825(cljs.core.chunk_rest(s__1826__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__1828),null);
}
} else {
var vec__1849 = cljs.core.first(s__1826__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1849,(0),null);
var vec__1852 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1849,(1),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1852,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1852,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v1], null),cljs$pprint$unzip_map_$_iter__1825(cljs.core.rest(s__1826__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__25932__auto__(m);
})()),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__25932__auto__ = (function cljs$pprint$unzip_map_$_iter__1855(s__1856){
return (new cljs.core.LazySeq(null,(function (){
var s__1856__$1 = s__1856;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__1856__$1);
if(temp__21890__auto__){
var s__1856__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__1856__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__1856__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__1858 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__1857 = (0);
while(true){
if((i__1857 < size__25931__auto__)){
var vec__1873 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__1857);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1873,(0),null);
var vec__1876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1873,(1),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1876,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1876,(1),null);
cljs.core.chunk_append(b__1858,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v2], null));

var G__1886 = (i__1857 + (1));
i__1857 = G__1886;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__1858),cljs$pprint$unzip_map_$_iter__1855(cljs.core.chunk_rest(s__1856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__1858),null);
}
} else {
var vec__1879 = cljs.core.first(s__1856__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1879,(0),null);
var vec__1882 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1879,(1),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1882,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1882,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v2], null),cljs$pprint$unzip_map_$_iter__1855(cljs.core.rest(s__1856__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__25932__auto__(m);
})())], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.unzip_map;},new cljs.core.Symbol("cljs.pprint","unzip-map","cljs.pprint/unzip-map",(455280148),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"unzip-map","unzip-map",(317388877),null),"cljs/pprint.cljs",(17),(1),(101),(101),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null)], null)),null,(cljs.core.truth_(cljs.pprint.unzip_map)?cljs.pprint.unzip_map.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.tuple_map = (function cljs$pprint$tuple_map(m,v1){

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__25932__auto__ = (function cljs$pprint$tuple_map_$_iter__1905(s__1906){
return (new cljs.core.LazySeq(null,(function (){
var s__1906__$1 = s__1906;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__1906__$1);
if(temp__21890__auto__){
var s__1906__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__1906__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__1906__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__1908 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__1907 = (0);
while(true){
if((i__1907 < size__25931__auto__)){
var vec__1917 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__1907);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1917,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1917,(1),null);
cljs.core.chunk_append(b__1908,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,v1], null)], null));

var G__1923 = (i__1907 + (1));
i__1907 = G__1923;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__1908),cljs$pprint$tuple_map_$_iter__1905(cljs.core.chunk_rest(s__1906__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__1908),null);
}
} else {
var vec__1920 = cljs.core.first(s__1906__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1920,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__1920,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,v1], null)], null),cljs$pprint$tuple_map_$_iter__1905(cljs.core.rest(s__1906__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__25932__auto__(m);
})());
}); return (
new cljs.core.Var(function(){return cljs.pprint.tuple_map;},new cljs.core.Symbol("cljs.pprint","tuple-map","cljs.pprint/tuple-map",(-649762778),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"tuple-map","tuple-map",(-1040054753),null),"cljs/pprint.cljs",(17),(1),(108),(108),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"v1","v1",(-2141311508),null)], null)),null,(cljs.core.truth_(cljs.pprint.tuple_map)?cljs.pprint.tuple_map.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.rtrim = (function cljs$pprint$rtrim(s,c){

var len = cljs.core.count(s);
if(((len > (0))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(cljs.core.count(s) - (1))),c))){
var n = (len - (1));
while(true){
if((n < (0))){
return "";
} else {
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,n),c))){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),(n + (1)));
} else {
var G__1924 = (n - (1));
n = G__1924;
continue;

}
}
break;
}
} else {
return s;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.rtrim;},new cljs.core.Symbol("cljs.pprint","rtrim","cljs.pprint/rtrim",(864300687),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"rtrim","rtrim",(979195078),null),"cljs/pprint.cljs",(13),(1),(112),(112),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),null,(cljs.core.truth_(cljs.pprint.rtrim)?cljs.pprint.rtrim.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.ltrim = (function cljs$pprint$ltrim(s,c){

var len = cljs.core.count(s);
if(((len > (0))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(0)),c))){
var n = (0);
while(true){
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(n,len)) || (!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,n),c)))){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,n);
} else {
var G__1925 = (n + (1));
n = G__1925;
continue;
}
break;
}
} else {
return s;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.ltrim;},new cljs.core.Symbol("cljs.pprint","ltrim","cljs.pprint/ltrim",(-1020558957),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"ltrim","ltrim",(-1000166486),null),"cljs/pprint.cljs",(13),(1),(123),(123),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),null,(cljs.core.truth_(cljs.pprint.ltrim)?cljs.pprint.ltrim.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.prefix_count = (function cljs$pprint$prefix_count(aseq,val){

var test = ((cljs.core.coll_QMARK_(val))?cljs.core.set(val):cljs.core.PersistentHashSet.createAsIfByAssoc([val]));
var pos = (0);
while(true){
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(pos,cljs.core.count(aseq))) || (cljs.core.not((function (){var G__1929 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(aseq,pos);
return (test.cljs$core$IFn$_invoke$arity$1 ? test.cljs$core$IFn$_invoke$arity$1(G__1929) : test.call(null,G__1929));
})()))){
return pos;
} else {
var G__1930 = (pos + (1));
pos = G__1930;
continue;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.prefix_count;},new cljs.core.Symbol("cljs.pprint","prefix-count","cljs.pprint/prefix-count",(-2142961912),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"prefix-count","prefix-count",(-1717709519),null),"cljs/pprint.cljs",(20),(1),(133),(133),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"aseq","aseq",(-1865515628),null),new cljs.core.Symbol(null,"val","val",(1769233139),null)], null)),null,(cljs.core.truth_(cljs.pprint.prefix_count)?cljs.pprint.prefix_count.cljs$lang$test:null)])));})()
;

/**
 * @interface
 */
(function (){
cljs.pprint.IPrettyFlush = function(){}; return (
new cljs.core.Var(function(){return cljs.pprint.IPrettyFlush;},new cljs.core.Symbol("cljs.pprint","IPrettyFlush","cljs.pprint/IPrettyFlush",(-1890322983),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol-symbol","protocol-symbol",(1279552198)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"protocol-info","protocol-info",(1471745843)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"jsdoc","jsdoc",(1745183516)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"IPrettyFlush","IPrettyFlush",(-160784496),null),"cljs/pprint.cljs",(26),(1),(144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"methods","methods",(453930866)),cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.with_meta(new cljs.core.Symbol(null,"-ppflush","-ppflush",(1004696281),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),null], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pp","pp",(927842543),null)], null)], null)])], null),(144),cljs.core.List.EMPTY,null,cljs.core.list("@interface"),(cljs.core.truth_(cljs.pprint.IPrettyFlush)?cljs.pprint.IPrettyFlush.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint._ppflush = (function cljs$pprint$_ppflush(pp){
if((!((pp == null))) && (!((pp.cljs$pprint$IPrettyFlush$_ppflush$arity$1 == null)))){
return pp.cljs$pprint$IPrettyFlush$_ppflush$arity$1(pp);
} else {
var x__25057__auto__ = (((pp == null))?null:pp);
var m__25058__auto__ = (cljs.pprint._ppflush[goog.typeOf(x__25057__auto__)]);
if(!((m__25058__auto__ == null))){
return (m__25058__auto__.cljs$core$IFn$_invoke$arity$1 ? m__25058__auto__.cljs$core$IFn$_invoke$arity$1(pp) : m__25058__auto__.call(null,pp));
} else {
var m__25058__auto____$1 = (cljs.pprint._ppflush["_"]);
if(!((m__25058__auto____$1 == null))){
return (m__25058__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__25058__auto____$1.cljs$core$IFn$_invoke$arity$1(pp) : m__25058__auto____$1.call(null,pp));
} else {
throw cljs.core.missing_protocol("IPrettyFlush.-ppflush",pp);
}
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint._ppflush;},new cljs.core.Symbol("cljs.pprint","-ppflush","cljs.pprint/-ppflush",(-1019520880),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocol","protocol",(652470118)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol("cljs.pprint","IPrettyFlush","cljs.pprint/IPrettyFlush",(-1890322983),null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"-ppflush","-ppflush",(1004696281),null),"cljs/pprint.cljs",(12),(1),(144),(145),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pp","pp",(927842543),null)], null)),null,(cljs.core.truth_(cljs.pprint._ppflush)?cljs.pprint._ppflush.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint._STAR_default_page_width_STAR_ = (72); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_default_page_width_STAR_;},new cljs.core.Symbol("cljs.pprint","*default-page-width*","cljs.pprint/*default-page-width*",(1407737463),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*default-page-width*","*default-page-width*",(1513321534),null),"cljs/pprint.cljs",(53),(1),true,(151),(151),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_default_page_width_STAR_)?cljs.pprint._STAR_default_page_width_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_field = (function cljs$pprint$get_field(this$,sym){
var G__1933 = (function (){var G__1934 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__1934) : cljs.core.deref.call(null,G__1934));
})();
return (sym.cljs$core$IFn$_invoke$arity$1 ? sym.cljs$core$IFn$_invoke$arity$1(G__1933) : sym.call(null,G__1933));
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_field;},new cljs.core.Symbol("cljs.pprint","get-field","cljs.pprint/get-field",(-416314497),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-field","get-field",(-521883344),null),"cljs/pprint.cljs",(17),(1),(153),(153),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_field)?cljs.pprint.get_field.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.set_field = (function cljs$pprint$set_field(this$,sym,new_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,sym,new_val);
}); return (
new cljs.core.Var(function(){return cljs.pprint.set_field;},new cljs.core.Symbol("cljs.pprint","set-field","cljs.pprint/set-field",(-1730135234),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"set-field","set-field",(-1858530569),null),"cljs/pprint.cljs",(17),(1),(156),(156),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"new-val","new-val",(902372928),null)], null)),null,(cljs.core.truth_(cljs.pprint.set_field)?cljs.pprint.set_field.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_column = (function cljs$pprint$get_column(this$){
return cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"cur","cur",(1153190599)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_column;},new cljs.core.Symbol("cljs.pprint","get-column","cljs.pprint/get-column",(-1495656070),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-column","get-column",(-1357569885),null),"cljs/pprint.cljs",(18),(1),(159),(159),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_column)?cljs.pprint.get_column.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_line = (function cljs$pprint$get_line(this$){
return cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"line","line",(212345235)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_line;},new cljs.core.Symbol("cljs.pprint","get-line","cljs.pprint/get-line",(-1892814317),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-line","get-line",(-1763436460),null),"cljs/pprint.cljs",(16),(1),(162),(162),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_line)?cljs.pprint.get_line.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_max_column = (function cljs$pprint$get_max_column(this$){
return cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"max","max",(61366548)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_max_column;},new cljs.core.Symbol("cljs.pprint","get-max-column","cljs.pprint/get-max-column",(-1761548159),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-max-column","get-max-column",(-1639319738),null),"cljs/pprint.cljs",(22),(1),(165),(165),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_max_column)?cljs.pprint.get_max_column.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.set_max_column = (function cljs$pprint$set_max_column(this$,new_max){
cljs.pprint.set_field(this$,new cljs.core.Keyword(null,"max","max",(61366548)),new_max);

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.set_max_column;},new cljs.core.Symbol("cljs.pprint","set-max-column","cljs.pprint/set-max-column",(-1763975889),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"set-max-column","set-max-column",(-1641796762),null),"cljs/pprint.cljs",(22),(1),(168),(168),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"new-max","new-max",(1278168725),null)], null)),null,(cljs.core.truth_(cljs.pprint.set_max_column)?cljs.pprint.set_max_column.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_writer = (function cljs$pprint$get_writer(this$){
return cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"base","base",(185279322)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_writer;},new cljs.core.Symbol("cljs.pprint","get-writer","cljs.pprint/get-writer",(-1783959376),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-writer","get-writer",(-1930573065),null),"cljs/pprint.cljs",(18),(1),(172),(172),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_writer)?cljs.pprint.get_writer.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.c_write_char = (function cljs$pprint$c_write_char(this$,c){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\n")){
cljs.pprint.set_field(this$,new cljs.core.Keyword(null,"cur","cur",(1153190599)),(0));

cljs.pprint.set_field(this$,new cljs.core.Keyword(null,"line","line",(212345235)),(cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"line","line",(212345235))) + (1)));
} else {
cljs.pprint.set_field(this$,new cljs.core.Keyword(null,"cur","cur",(1153190599)),(cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"cur","cur",(1153190599))) + (1)));
}

return cljs.core._write(cljs.pprint.get_field(this$,new cljs.core.Keyword(null,"base","base",(185279322))),c);
}); return (
new cljs.core.Var(function(){return cljs.pprint.c_write_char;},new cljs.core.Symbol("cljs.pprint","c-write-char","cljs.pprint/c-write-char",(-1301619874),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"c-write-char","c-write-char",(-1422774937),null),"cljs/pprint.cljs",(20),(1),(176),(176),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),null,(cljs.core.truth_(cljs.pprint.c_write_char)?cljs.pprint.c_write_char.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.column_writer = (function cljs$pprint$column_writer(var_args){
var args1935 = [];
var len__26427__auto___1945 = arguments.length;
var i__26428__auto___1946 = (0);
while(true){
if((i__26428__auto___1946 < len__26427__auto___1945)){
args1935.push((arguments[i__26428__auto___1946]));

var G__1947 = (i__26428__auto___1946 + (1));
i__26428__auto___1946 = G__1947;
continue;
} else {
}
break;
}

var G__1937 = args1935.length;
switch (G__1937) {
case (1):
return cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args1935.length)].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.pprint.column_writer;},new cljs.core.Symbol("cljs.pprint","column-writer","cljs.pprint/column-writer",(-1540832078),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"column-writer","column-writer",(-1125044405),null),"cljs/pprint.cljs",(21),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(184),(184),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),null,(cljs.core.truth_(cljs.pprint.column_writer)?cljs.pprint.column_writer.cljs$lang$test:null)])));})()
;

cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$1 = (function (writer){
return cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$2(writer,cljs.pprint._STAR_default_page_width_STAR_);
});

cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$2 = (function (writer,max_columns){
var fields = (function (){var G__1938 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max","max",(61366548)),max_columns,new cljs.core.Keyword(null,"cur","cur",(1153190599)),(0),new cljs.core.Keyword(null,"line","line",(212345235)),(0),new cljs.core.Keyword(null,"base","base",(185279322)),writer], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__1938) : cljs.core.atom.call(null,G__1938));
})();
if(typeof cljs.pprint.t_cljs$pprint1939 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IWriter}
*/
cljs.pprint.t_cljs$pprint1939 = (function (writer,max_columns,fields,meta1940){
this.writer = writer;
this.max_columns = max_columns;
this.fields = fields;
this.meta1940 = meta1940;
this.cljs$lang$protocol_mask$partition0$ = 1074167808;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint1939.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (fields){
return (function (_1941,meta1940__$1){
var self__ = this;
var _1941__$1 = this;
return (new cljs.pprint.t_cljs$pprint1939(self__.writer,self__.max_columns,self__.fields,meta1940__$1));
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (fields){
return (function (_1941){
var self__ = this;
var _1941__$1 = this;
return self__.meta1940;
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.prototype.cljs$core$IDeref$_deref$arity$1 = ((function (fields){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.fields;
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.prototype.cljs$core$IWriter$_flush$arity$1 = ((function (fields){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._flush(self__.writer);
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.prototype.cljs$core$IWriter$_write$arity$2 = ((function (fields){
return (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__1942 = cljs.core._EQ_;
var expr__1943 = cljs.core.type(x);
if(cljs.core.truth_((pred__1942.cljs$core$IFn$_invoke$arity$2 ? pred__1942.cljs$core$IFn$_invoke$arity$2(String,expr__1943) : pred__1942.call(null,String,expr__1943)))){
var s = x;
var nl = s.lastIndexOf("\n");
if((nl < (0))){
cljs.pprint.set_field(this$__$1,new cljs.core.Keyword(null,"cur","cur",(1153190599)),(cljs.pprint.get_field(this$__$1,new cljs.core.Keyword(null,"cur","cur",(1153190599))) + cljs.core.count(s)));
} else {
cljs.pprint.set_field(this$__$1,new cljs.core.Keyword(null,"cur","cur",(1153190599)),((cljs.core.count(s) - nl) - (1)));

cljs.pprint.set_field(this$__$1,new cljs.core.Keyword(null,"line","line",(212345235)),(cljs.pprint.get_field(this$__$1,new cljs.core.Keyword(null,"line","line",(212345235))) + cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (s,nl,pred__1942,expr__1943,this$__$1,fields){
return (function (p1__110_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__110_SHARP_,"\n");
});})(s,nl,pred__1942,expr__1943,this$__$1,fields))
,s))));
}

return cljs.core._write(cljs.pprint.get_field(this$__$1,new cljs.core.Keyword(null,"base","base",(185279322))),s);
} else {
if(cljs.core.truth_((pred__1942.cljs$core$IFn$_invoke$arity$2 ? pred__1942.cljs$core$IFn$_invoke$arity$2(Number,expr__1943) : pred__1942.call(null,Number,expr__1943)))){
return cljs.pprint.c_write_char(this$__$1,x);
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__1943)].join('')));
}
}
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.getBasis = ((function (fields){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null),new cljs.core.Symbol(null,"meta1940","meta1940",(341317050),null)], null);
});})(fields))
;

cljs.pprint.t_cljs$pprint1939.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint1939.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint1939";

cljs.pprint.t_cljs$pprint1939.cljs$lang$ctorPrWriter = ((function (fields){
return (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint1939");
});})(fields))
;

(function (){
cljs.pprint.__GT_t_cljs$pprint1939 = ((function (fields){
return (function cljs$pprint$__GT_t_cljs$pprint1939(writer__$1,max_columns__$1,fields__$1,meta1940){
return (new cljs.pprint.t_cljs$pprint1939(writer__$1,max_columns__$1,fields__$1,meta1940));
});})(fields))
; return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint1939;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint1939","cljs.pprint/->t_cljs$pprint1939",(1365638427),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IDeref","cljs.core/IDeref",(1331648568),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint1939","->t_cljs$pprint1939",(1581045714),null),"cljs/pprint.cljs",true,(6),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(188),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null),new cljs.core.Symbol(null,"meta1940","meta1940",(341317050),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IDeref","cljs.core/IDeref",(1331648568),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint1939)?cljs.pprint.__GT_t_cljs$pprint1939.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint1939(writer,max_columns,fields,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.pprint.column_writer.cljs$lang$maxFixedArity = (2);

new cljs.core.Var(function(){return cljs.pprint.column_writer;},new cljs.core.Symbol("cljs.pprint","column-writer","cljs.pprint/column-writer",(-1540832078),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"column-writer","column-writer",(-1125044405),null),"cljs/pprint.cljs",(21),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(184),(184),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null)], null)),null,(cljs.core.truth_(cljs.pprint.column_writer)?cljs.pprint.column_writer.cljs$lang$test:null)]));
(function (){
cljs.pprint.get_miser_width; return (
new cljs.core.Var(function(){return cljs.pprint.get_miser_width;},new cljs.core.Symbol("cljs.pprint","get-miser-width","cljs.pprint/get-miser-width",(-1380651307),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-miser-width","get-miser-width",(-1493187350),null),"cljs/pprint.cljs",(25),(1),(224),true,(224),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.get_miser_width)?cljs.pprint.get_miser_width.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.logical_block = (function (parent,section,start_col,indent,done_nl,intra_block_nl,prefix,per_line_prefix,suffix,logical_block_callback,__meta,__extmap,__hash){
this.parent = parent;
this.section = section;
this.start_col = start_col;
this.indent = indent;
this.done_nl = done_nl;
this.intra_block_nl = intra_block_nl;
this.prefix = prefix;
this.per_line_prefix = per_line_prefix;
this.suffix = suffix;
this.logical_block_callback = logical_block_callback;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.logical_block.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.logical_block.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k1950,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__1952 = k1950;
var G__1952__$1 = (((G__1952 instanceof cljs.core.Keyword))?G__1952.fqn:null);
switch (G__1952__$1) {
case "suffix":
return self__.suffix;

break;
case "indent":
return self__.indent;

break;
case "parent":
return self__.parent;

break;
case "section":
return self__.section;

break;
case "done-nl":
return self__.done_nl;

break;
case "start-col":
return self__.start_col;

break;
case "prefix":
return self__.prefix;

break;
case "per-line-prefix":
return self__.per_line_prefix;

break;
case "logical-block-callback":
return self__.logical_block_callback;

break;
case "intra-block-nl":
return self__.intra_block_nl;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k1950,else__24369__auto__);

}
});

cljs.pprint.logical_block.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.logical-block{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"parent","parent",(-878878779)),self__.parent],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"section","section",(-300141526)),self__.section],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-col","start-col",(668080143)),self__.start_col],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"indent","indent",(-148200125)),self__.indent],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)),self__.done_nl],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)),self__.intra_block_nl],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),self__.prefix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),self__.per_line_prefix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"suffix","suffix",(367373057)),self__.suffix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)),self__.logical_block_callback],null))], null),self__.__extmap));
});

cljs.pprint.logical_block.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.logical_block.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__1949){
var self__ = this;
var G__1949__$1 = this;
return (new cljs.core.RecordIter((0),G__1949__$1,(10),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"parent","parent",(-878878779)),new cljs.core.Keyword(null,"section","section",(-300141526)),new cljs.core.Keyword(null,"start-col","start-col",(668080143)),new cljs.core.Keyword(null,"indent","indent",(-148200125)),new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)),new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)),new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),new cljs.core.Keyword(null,"suffix","suffix",(367373057)),new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.logical_block.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.logical_block.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.logical_block.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((10) + cljs.core.count(self__.__extmap));
});

cljs.pprint.logical_block.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.logical_block.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.logical_block.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Keyword(null,"suffix","suffix",(367373057)),null,new cljs.core.Keyword(null,"indent","indent",(-148200125)),null,new cljs.core.Keyword(null,"parent","parent",(-878878779)),null,new cljs.core.Keyword(null,"section","section",(-300141526)),null,new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)),null,new cljs.core.Keyword(null,"start-col","start-col",(668080143)),null,new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),null,new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),null,new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)),null,new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.logical_block.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__1949){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__1953 = cljs.core.keyword_identical_QMARK_;
var expr__1954 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__1956 = new cljs.core.Keyword(null,"parent","parent",(-878878779));
var G__1957 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1956,G__1957) : pred__1953.call(null,G__1956,G__1957));
})())){
return (new cljs.pprint.logical_block(G__1949,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1958 = new cljs.core.Keyword(null,"section","section",(-300141526));
var G__1959 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1958,G__1959) : pred__1953.call(null,G__1958,G__1959));
})())){
return (new cljs.pprint.logical_block(self__.parent,G__1949,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1960 = new cljs.core.Keyword(null,"start-col","start-col",(668080143));
var G__1961 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1960,G__1961) : pred__1953.call(null,G__1960,G__1961));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,G__1949,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1962 = new cljs.core.Keyword(null,"indent","indent",(-148200125));
var G__1963 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1962,G__1963) : pred__1953.call(null,G__1962,G__1963));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,G__1949,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1964 = new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340));
var G__1965 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1964,G__1965) : pred__1953.call(null,G__1964,G__1965));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,G__1949,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1966 = new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875));
var G__1967 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1966,G__1967) : pred__1953.call(null,G__1966,G__1967));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,G__1949,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1968 = new cljs.core.Keyword(null,"prefix","prefix",(-265908465));
var G__1969 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1968,G__1969) : pred__1953.call(null,G__1968,G__1969));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,G__1949,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1970 = new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813));
var G__1971 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1970,G__1971) : pred__1953.call(null,G__1970,G__1971));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,G__1949,self__.suffix,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1972 = new cljs.core.Keyword(null,"suffix","suffix",(367373057));
var G__1973 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1972,G__1973) : pred__1953.call(null,G__1972,G__1973));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,G__1949,self__.logical_block_callback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1974 = new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194));
var G__1975 = expr__1954;
return (pred__1953.cljs$core$IFn$_invoke$arity$2 ? pred__1953.cljs$core$IFn$_invoke$arity$2(G__1974,G__1975) : pred__1953.call(null,G__1974,G__1975));
})())){
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,G__1949,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__1949),null));
}
}
}
}
}
}
}
}
}
}
});

cljs.pprint.logical_block.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"parent","parent",(-878878779)),self__.parent],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"section","section",(-300141526)),self__.section],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-col","start-col",(668080143)),self__.start_col],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"indent","indent",(-148200125)),self__.indent],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)),self__.done_nl],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)),self__.intra_block_nl],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),self__.prefix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),self__.per_line_prefix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"suffix","suffix",(367373057)),self__.suffix],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)),self__.logical_block_callback],null))], null),self__.__extmap));
});

cljs.pprint.logical_block.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__1949){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.logical_block(self__.parent,self__.section,self__.start_col,self__.indent,self__.done_nl,self__.intra_block_nl,self__.prefix,self__.per_line_prefix,self__.suffix,self__.logical_block_callback,G__1949,self__.__extmap,self__.__hash));
});

cljs.pprint.logical_block.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.logical_block.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parent","parent",(761652748),null),new cljs.core.Symbol(null,"section","section",(1340390001),null),new cljs.core.Symbol(null,"start-col","start-col",(-1986355626),null),new cljs.core.Symbol(null,"indent","indent",(1492331402),null),new cljs.core.Symbol(null,"done-nl","done-nl",(1259507187),null),new cljs.core.Symbol(null,"intra-block-nl","intra-block-nl",(-845608894),null),new cljs.core.Symbol(null,"prefix","prefix",(1374623062),null),new cljs.core.Symbol(null,"per-line-prefix","per-line-prefix",(-1807493956),null),new cljs.core.Symbol(null,"suffix","suffix",(2007904584),null),new cljs.core.Symbol(null,"logical-block-callback","logical-block-callback",(-1041744575),null)], null);
});

cljs.pprint.logical_block.cljs$lang$type = true;

cljs.pprint.logical_block.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/logical-block");
});

cljs.pprint.logical_block.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/logical-block");
});

(function (){
cljs.pprint.__GT_logical_block = (function cljs$pprint$__GT_logical_block(parent,section,start_col,indent,done_nl,intra_block_nl,prefix,per_line_prefix,suffix,logical_block_callback){
return (new cljs.pprint.logical_block(parent,section,start_col,indent,done_nl,intra_block_nl,prefix,per_line_prefix,suffix,logical_block_callback,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_logical_block;},new cljs.core.Symbol("cljs.pprint","->logical-block","cljs.pprint/->logical-block",(98053017),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->logical-block","->logical-block",(1025594448),null),"cljs/pprint.cljs",(42),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(230),(230),cljs.core.list(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parent","parent",(761652748),null),new cljs.core.Symbol(null,"section","section",(1340390001),null),new cljs.core.Symbol(null,"start-col","start-col",(-1986355626),null),new cljs.core.Symbol(null,"indent","indent",(1492331402),null),new cljs.core.Symbol(null,"done-nl","done-nl",(1259507187),null),new cljs.core.Symbol(null,"intra-block-nl","intra-block-nl",(-845608894),null),new cljs.core.Symbol(null,"prefix","prefix",(1374623062),null),new cljs.core.Symbol(null,"per-line-prefix","per-line-prefix",(-1807493956),null),new cljs.core.Symbol(null,"suffix","suffix",(2007904584),null),new cljs.core.Symbol(null,"logical-block-callback","logical-block-callback",(-1041744575),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_logical_block)?cljs.pprint.__GT_logical_block.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_logical_block = (function cljs$pprint$map__GT_logical_block(G__1951){
return (new cljs.pprint.logical_block(new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"section","section",(-300141526)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"prefix","prefix",(-265908465)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"suffix","suffix",(367373057)).cljs$core$IFn$_invoke$arity$1(G__1951),new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)).cljs$core$IFn$_invoke$arity$1(G__1951),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__1951,new cljs.core.Keyword(null,"parent","parent",(-878878779)),cljs.core.array_seq([new cljs.core.Keyword(null,"section","section",(-300141526)),new cljs.core.Keyword(null,"start-col","start-col",(668080143)),new cljs.core.Keyword(null,"indent","indent",(-148200125)),new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)),new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)),new cljs.core.Keyword(null,"prefix","prefix",(-265908465)),new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)),new cljs.core.Keyword(null,"suffix","suffix",(367373057)),new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_logical_block;},new cljs.core.Symbol("cljs.pprint","map->logical-block","cljs.pprint/map->logical-block",(39009066),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->logical-block","map->logical-block",(228213101),null),"cljs/pprint.cljs",(42),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(230),(230),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__1951","G__1951",(555744683),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_logical_block)?cljs.pprint.map__GT_logical_block.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.ancestor_QMARK_ = (function cljs$pprint$ancestor_QMARK_(parent,child){
var child__$1 = new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(child);
while(true){
if((child__$1 == null)){
return false;
} else {
if((parent === child__$1)){
return true;
} else {
var G__1977 = new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(child__$1);
child__$1 = G__1977;
continue;

}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.ancestor_QMARK_;},new cljs.core.Symbol("cljs.pprint","ancestor?","cljs.pprint/ancestor?",(1243304987),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"ancestor?","ancestor?",(1104429788),null),"cljs/pprint.cljs",(17),(1),(236),(236),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parent","parent",(761652748),null),new cljs.core.Symbol(null,"child","child",(-2030468224),null)], null)),null,(cljs.core.truth_(cljs.pprint.ancestor_QMARK_)?cljs.pprint.ancestor_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.buffer_length = (function cljs$pprint$buffer_length(l){
var l__$1 = cljs.core.seq(l);
if(l__$1){
return (new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(cljs.core.last(l__$1)) - new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(l__$1)));
} else {
return (0);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.buffer_length;},new cljs.core.Symbol("cljs.pprint","buffer-length","cljs.pprint/buffer-length",(-90787864),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"buffer-length","buffer-length",(-228633055),null),"cljs/pprint.cljs",(21),(1),(243),(243),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"l","l",(-1258542346),null)], null)),null,(cljs.core.truth_(cljs.pprint.buffer_length)?cljs.pprint.buffer_length.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.buffer_blob = (function (type_tag,data,trailing_white_space,start_pos,end_pos,__meta,__extmap,__hash){
this.type_tag = type_tag;
this.data = data;
this.trailing_white_space = trailing_white_space;
this.start_pos = start_pos;
this.end_pos = end_pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.buffer_blob.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.buffer_blob.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k1979,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__1981 = k1979;
var G__1981__$1 = (((G__1981 instanceof cljs.core.Keyword))?G__1981.fqn:null);
switch (G__1981__$1) {
case "type-tag":
return self__.type_tag;

break;
case "data":
return self__.data;

break;
case "trailing-white-space":
return self__.trailing_white_space;

break;
case "start-pos":
return self__.start_pos;

break;
case "end-pos":
return self__.end_pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k1979,else__24369__auto__);

}
});

cljs.pprint.buffer_blob.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.buffer-blob{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"data","data",(-232669377)),self__.data],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),self__.trailing_white_space],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.buffer_blob.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.buffer_blob.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__1978){
var self__ = this;
var G__1978__$1 = this;
return (new cljs.core.RecordIter((0),G__1978__$1,(5),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),new cljs.core.Keyword(null,"data","data",(-232669377)),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.buffer_blob.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.buffer_blob.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.buffer_blob.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((5) + cljs.core.count(self__.__extmap));
});

cljs.pprint.buffer_blob.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.buffer_blob.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.buffer_blob.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),null,new cljs.core.Keyword(null,"data","data",(-232669377)),null,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null,new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),null,new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.buffer_blob.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__1978){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__1982 = cljs.core.keyword_identical_QMARK_;
var expr__1983 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__1985 = new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267));
var G__1986 = expr__1983;
return (pred__1982.cljs$core$IFn$_invoke$arity$2 ? pred__1982.cljs$core$IFn$_invoke$arity$2(G__1985,G__1986) : pred__1982.call(null,G__1985,G__1986));
})())){
return (new cljs.pprint.buffer_blob(G__1978,self__.data,self__.trailing_white_space,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1987 = new cljs.core.Keyword(null,"data","data",(-232669377));
var G__1988 = expr__1983;
return (pred__1982.cljs$core$IFn$_invoke$arity$2 ? pred__1982.cljs$core$IFn$_invoke$arity$2(G__1987,G__1988) : pred__1982.call(null,G__1987,G__1988));
})())){
return (new cljs.pprint.buffer_blob(self__.type_tag,G__1978,self__.trailing_white_space,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1989 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996));
var G__1990 = expr__1983;
return (pred__1982.cljs$core$IFn$_invoke$arity$2 ? pred__1982.cljs$core$IFn$_invoke$arity$2(G__1989,G__1990) : pred__1982.call(null,G__1989,G__1990));
})())){
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,G__1978,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1991 = new cljs.core.Keyword(null,"start-pos","start-pos",(668789086));
var G__1992 = expr__1983;
return (pred__1982.cljs$core$IFn$_invoke$arity$2 ? pred__1982.cljs$core$IFn$_invoke$arity$2(G__1991,G__1992) : pred__1982.call(null,G__1991,G__1992));
})())){
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,G__1978,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__1993 = new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926));
var G__1994 = expr__1983;
return (pred__1982.cljs$core$IFn$_invoke$arity$2 ? pred__1982.cljs$core$IFn$_invoke$arity$2(G__1993,G__1994) : pred__1982.call(null,G__1993,G__1994));
})())){
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,self__.start_pos,G__1978,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__1978),null));
}
}
}
}
}
});

cljs.pprint.buffer_blob.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"data","data",(-232669377)),self__.data],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),self__.trailing_white_space],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.buffer_blob.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__1978){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.buffer_blob(self__.type_tag,self__.data,self__.trailing_white_space,self__.start_pos,self__.end_pos,G__1978,self__.__extmap,self__.__hash));
});

cljs.pprint.buffer_blob.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.buffer_blob.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"data","data",(1407862150),null),new cljs.core.Symbol(null,"trailing-white-space","trailing-white-space",(-1158428773),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null);
});

cljs.pprint.buffer_blob.cljs$lang$type = true;

cljs.pprint.buffer_blob.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/buffer-blob");
});

cljs.pprint.buffer_blob.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/buffer-blob");
});

(function (){
cljs.pprint.__GT_buffer_blob = (function cljs$pprint$__GT_buffer_blob(type_tag,data,trailing_white_space,start_pos,end_pos){
return (new cljs.pprint.buffer_blob(type_tag,data,trailing_white_space,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_buffer_blob;},new cljs.core.Symbol("cljs.pprint","->buffer-blob","cljs.pprint/->buffer-blob",(-1635964838),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->buffer-blob","->buffer-blob",(-1759358445),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(250),(250),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"data","data",(1407862150),null),new cljs.core.Symbol(null,"trailing-white-space","trailing-white-space",(-1158428773),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_buffer_blob)?cljs.pprint.__GT_buffer_blob.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_buffer_blob = (function cljs$pprint$map__GT_buffer_blob(G__1980){
return (new cljs.pprint.buffer_blob(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(G__1980),new cljs.core.Keyword(null,"data","data",(-232669377)).cljs$core$IFn$_invoke$arity$1(G__1980),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1(G__1980),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(G__1980),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(G__1980),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__1980,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),cljs.core.array_seq([new cljs.core.Keyword(null,"data","data",(-232669377)),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_buffer_blob;},new cljs.core.Symbol("cljs.pprint","map->buffer-blob","cljs.pprint/map->buffer-blob",(-1435385863),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->buffer-blob","map->buffer-blob",(-1522884176),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(250),(250),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__1980","G__1980",(1801599332),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_buffer_blob)?cljs.pprint.map__GT_buffer_blob.cljs$lang$test:null)])));})()
;


(function (){
cljs.pprint.make_buffer_blob = (function cljs$pprint$make_buffer_blob(data,trailing_white_space,start_pos,end_pos){
return (new cljs.pprint.buffer_blob(new cljs.core.Keyword(null,"buffer-blob","buffer-blob",(-1830112173)),data,trailing_white_space,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_buffer_blob;},new cljs.core.Symbol("cljs.pprint","make-buffer-blob","cljs.pprint/make-buffer-blob",(-1731715457),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-buffer-blob","make-buffer-blob",(-1483774970),null),"cljs/pprint.cljs",(1),(250),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",(1407862150),null),new cljs.core.Symbol(null,"trailing-white-space","trailing-white-space",(-1158428773),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.make_buffer_blob)?cljs.pprint.make_buffer_blob.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.buffer_blob_QMARK_ = (function cljs$pprint$buffer_blob_QMARK_(x__97__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(x__97__auto__),new cljs.core.Keyword(null,"buffer-blob","buffer-blob",(-1830112173)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.buffer_blob_QMARK_;},new cljs.core.Symbol("cljs.pprint","buffer-blob?","cljs.pprint/buffer-blob?",(412085750),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"buffer-blob?","buffer-blob?",(565638717),null),"cljs/pprint.cljs",(1),(250),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)], null)),null,(cljs.core.truth_(cljs.pprint.buffer_blob_QMARK_)?cljs.pprint.buffer_blob_QMARK_.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.nl_t = (function (type_tag,type,logical_block,start_pos,end_pos,__meta,__extmap,__hash){
this.type_tag = type_tag;
this.type = type;
this.logical_block = logical_block;
this.start_pos = start_pos;
this.end_pos = end_pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.nl_t.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.nl_t.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k1997,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__1999 = k1997;
var G__1999__$1 = (((G__1999 instanceof cljs.core.Keyword))?G__1999.fqn:null);
switch (G__1999__$1) {
case "type-tag":
return self__.type_tag;

break;
case "type":
return self__.type;

break;
case "logical-block":
return self__.logical_block;

break;
case "start-pos":
return self__.start_pos;

break;
case "end-pos":
return self__.end_pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k1997,else__24369__auto__);

}
});

cljs.pprint.nl_t.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.nl-t{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type","type",(1174270348)),self__.type],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.nl_t.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.nl_t.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__1996){
var self__ = this;
var G__1996__$1 = this;
return (new cljs.core.RecordIter((0),G__1996__$1,(5),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),new cljs.core.Keyword(null,"type","type",(1174270348)),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.nl_t.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.nl_t.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.nl_t.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((5) + cljs.core.count(self__.__extmap));
});

cljs.pprint.nl_t.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.nl_t.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.nl_t.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),null,new cljs.core.Keyword(null,"type","type",(1174270348)),null,new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),null,new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),null,new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.nl_t.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__1996){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2000 = cljs.core.keyword_identical_QMARK_;
var expr__2001 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2003 = new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267));
var G__2004 = expr__2001;
return (pred__2000.cljs$core$IFn$_invoke$arity$2 ? pred__2000.cljs$core$IFn$_invoke$arity$2(G__2003,G__2004) : pred__2000.call(null,G__2003,G__2004));
})())){
return (new cljs.pprint.nl_t(G__1996,self__.type,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2005 = new cljs.core.Keyword(null,"type","type",(1174270348));
var G__2006 = expr__2001;
return (pred__2000.cljs$core$IFn$_invoke$arity$2 ? pred__2000.cljs$core$IFn$_invoke$arity$2(G__2005,G__2006) : pred__2000.call(null,G__2005,G__2006));
})())){
return (new cljs.pprint.nl_t(self__.type_tag,G__1996,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2007 = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564));
var G__2008 = expr__2001;
return (pred__2000.cljs$core$IFn$_invoke$arity$2 ? pred__2000.cljs$core$IFn$_invoke$arity$2(G__2007,G__2008) : pred__2000.call(null,G__2007,G__2008));
})())){
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,G__1996,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2009 = new cljs.core.Keyword(null,"start-pos","start-pos",(668789086));
var G__2010 = expr__2001;
return (pred__2000.cljs$core$IFn$_invoke$arity$2 ? pred__2000.cljs$core$IFn$_invoke$arity$2(G__2009,G__2010) : pred__2000.call(null,G__2009,G__2010));
})())){
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,G__1996,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2011 = new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926));
var G__2012 = expr__2001;
return (pred__2000.cljs$core$IFn$_invoke$arity$2 ? pred__2000.cljs$core$IFn$_invoke$arity$2(G__2011,G__2012) : pred__2000.call(null,G__2011,G__2012));
})())){
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,self__.start_pos,G__1996,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__1996),null));
}
}
}
}
}
});

cljs.pprint.nl_t.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type","type",(1174270348)),self__.type],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.nl_t.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__1996){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.nl_t(self__.type_tag,self__.type,self__.logical_block,self__.start_pos,self__.end_pos,G__1996,self__.__extmap,self__.__hash));
});

cljs.pprint.nl_t.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.nl_t.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"type","type",(-1480165421),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null);
});

cljs.pprint.nl_t.cljs$lang$type = true;

cljs.pprint.nl_t.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/nl-t");
});

cljs.pprint.nl_t.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/nl-t");
});

(function (){
cljs.pprint.__GT_nl_t = (function cljs$pprint$__GT_nl_t(type_tag,type,logical_block,start_pos,end_pos){
return (new cljs.pprint.nl_t(type_tag,type,logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_nl_t;},new cljs.core.Symbol("cljs.pprint","->nl-t","cljs.pprint/->nl-t",(-634978275),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->nl-t","->nl-t",(-756139310),null),"cljs/pprint.cljs",(14),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(253),(253),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"type","type",(-1480165421),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_nl_t)?cljs.pprint.__GT_nl_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_nl_t = (function cljs$pprint$map__GT_nl_t(G__1998){
return (new cljs.pprint.nl_t(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(G__1998),new cljs.core.Keyword(null,"type","type",(1174270348)).cljs$core$IFn$_invoke$arity$1(G__1998),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(G__1998),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(G__1998),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(G__1998),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__1998,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),cljs.core.array_seq([new cljs.core.Keyword(null,"type","type",(1174270348)),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_nl_t;},new cljs.core.Symbol("cljs.pprint","map->nl-t","cljs.pprint/map->nl-t",(-345266792),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->nl-t","map->nl-t",(-195899485),null),"cljs/pprint.cljs",(14),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(253),(253),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__1998","G__1998",(-986920642),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_nl_t)?cljs.pprint.map__GT_nl_t.cljs$lang$test:null)])));})()
;


(function (){
cljs.pprint.make_nl_t = (function cljs$pprint$make_nl_t(type,logical_block,start_pos,end_pos){
return (new cljs.pprint.nl_t(new cljs.core.Keyword(null,"nl-t","nl-t",(-1608382114)),type,logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_nl_t;},new cljs.core.Symbol("cljs.pprint","make-nl-t","cljs.pprint/make-nl-t",(-966863124),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-nl-t","make-nl-t",(-560480477),null),"cljs/pprint.cljs",(1),(253),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type","type",(-1480165421),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.make_nl_t)?cljs.pprint.make_nl_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.nl_t_QMARK_ = (function cljs$pprint$nl_t_QMARK_(x__97__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(x__97__auto__),new cljs.core.Keyword(null,"nl-t","nl-t",(-1608382114)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.nl_t_QMARK_;},new cljs.core.Symbol("cljs.pprint","nl-t?","cljs.pprint/nl-t?",(166293869),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"nl-t?","nl-t?",(916560662),null),"cljs/pprint.cljs",(1),(253),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)], null)),null,(cljs.core.truth_(cljs.pprint.nl_t_QMARK_)?cljs.pprint.nl_t_QMARK_.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.start_block_t = (function (type_tag,logical_block,start_pos,end_pos,__meta,__extmap,__hash){
this.type_tag = type_tag;
this.logical_block = logical_block;
this.start_pos = start_pos;
this.end_pos = end_pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.start_block_t.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.start_block_t.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k2015,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__2017 = k2015;
var G__2017__$1 = (((G__2017 instanceof cljs.core.Keyword))?G__2017.fqn:null);
switch (G__2017__$1) {
case "type-tag":
return self__.type_tag;

break;
case "logical-block":
return self__.logical_block;

break;
case "start-pos":
return self__.start_pos;

break;
case "end-pos":
return self__.end_pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k2015,else__24369__auto__);

}
});

cljs.pprint.start_block_t.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.start-block-t{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.start_block_t.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.start_block_t.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2014){
var self__ = this;
var G__2014__$1 = this;
return (new cljs.core.RecordIter((0),G__2014__$1,(4),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.start_block_t.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.start_block_t.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.start_block_t.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((4) + cljs.core.count(self__.__extmap));
});

cljs.pprint.start_block_t.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.start_block_t.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.start_block_t.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),null,new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),null,new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),null,new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.start_block_t.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__2014){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2018 = cljs.core.keyword_identical_QMARK_;
var expr__2019 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2021 = new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267));
var G__2022 = expr__2019;
return (pred__2018.cljs$core$IFn$_invoke$arity$2 ? pred__2018.cljs$core$IFn$_invoke$arity$2(G__2021,G__2022) : pred__2018.call(null,G__2021,G__2022));
})())){
return (new cljs.pprint.start_block_t(G__2014,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2023 = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564));
var G__2024 = expr__2019;
return (pred__2018.cljs$core$IFn$_invoke$arity$2 ? pred__2018.cljs$core$IFn$_invoke$arity$2(G__2023,G__2024) : pred__2018.call(null,G__2023,G__2024));
})())){
return (new cljs.pprint.start_block_t(self__.type_tag,G__2014,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2025 = new cljs.core.Keyword(null,"start-pos","start-pos",(668789086));
var G__2026 = expr__2019;
return (pred__2018.cljs$core$IFn$_invoke$arity$2 ? pred__2018.cljs$core$IFn$_invoke$arity$2(G__2025,G__2026) : pred__2018.call(null,G__2025,G__2026));
})())){
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,G__2014,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2027 = new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926));
var G__2028 = expr__2019;
return (pred__2018.cljs$core$IFn$_invoke$arity$2 ? pred__2018.cljs$core$IFn$_invoke$arity$2(G__2027,G__2028) : pred__2018.call(null,G__2027,G__2028));
})())){
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,self__.start_pos,G__2014,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__2014),null));
}
}
}
}
});

cljs.pprint.start_block_t.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.start_block_t.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__2014){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.start_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,G__2014,self__.__extmap,self__.__hash));
});

cljs.pprint.start_block_t.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.start_block_t.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null);
});

cljs.pprint.start_block_t.cljs$lang$type = true;

cljs.pprint.start_block_t.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/start-block-t");
});

cljs.pprint.start_block_t.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/start-block-t");
});

(function (){
cljs.pprint.__GT_start_block_t = (function cljs$pprint$__GT_start_block_t(type_tag,logical_block,start_pos,end_pos){
return (new cljs.pprint.start_block_t(type_tag,logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_start_block_t;},new cljs.core.Symbol("cljs.pprint","->start-block-t","cljs.pprint/->start-block-t",(480344694),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->start-block-t","->start-block-t",(402145455),null),"cljs/pprint.cljs",(23),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(255),(255),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_start_block_t)?cljs.pprint.__GT_start_block_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_start_block_t = (function cljs$pprint$map__GT_start_block_t(G__2016){
return (new cljs.pprint.start_block_t(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(G__2016),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(G__2016),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(G__2016),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(G__2016),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__2016,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),cljs.core.array_seq([new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_start_block_t;},new cljs.core.Symbol("cljs.pprint","map->start-block-t","cljs.pprint/map->start-block-t",(268005770),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->start-block-t","map->start-block-t",(344330163),null),"cljs/pprint.cljs",(23),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(255),(255),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__2016","G__2016",(704237577),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_start_block_t)?cljs.pprint.map__GT_start_block_t.cljs$lang$test:null)])));})()
;


(function (){
cljs.pprint.make_start_block_t = (function cljs$pprint$make_start_block_t(logical_block,start_pos,end_pos){
return (new cljs.pprint.start_block_t(new cljs.core.Keyword(null,"start-block-t","start-block-t",(-373430594)),logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_start_block_t;},new cljs.core.Symbol("cljs.pprint","make-start-block-t","cljs.pprint/make-start-block-t",(-212118119),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-start-block-t","make-start-block-t",(-333689762),null),"cljs/pprint.cljs",(1),(255),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.make_start_block_t)?cljs.pprint.make_start_block_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.start_block_t_QMARK_ = (function cljs$pprint$start_block_t_QMARK_(x__97__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(x__97__auto__),new cljs.core.Keyword(null,"start-block-t","start-block-t",(-373430594)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.start_block_t_QMARK_;},new cljs.core.Symbol("cljs.pprint","start-block-t?","cljs.pprint/start-block-t?",(-383013879),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"start-block-t?","start-block-t?",(-530408882),null),"cljs/pprint.cljs",(1),(255),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)], null)),null,(cljs.core.truth_(cljs.pprint.start_block_t_QMARK_)?cljs.pprint.start_block_t_QMARK_.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.end_block_t = (function (type_tag,logical_block,start_pos,end_pos,__meta,__extmap,__hash){
this.type_tag = type_tag;
this.logical_block = logical_block;
this.start_pos = start_pos;
this.end_pos = end_pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.end_block_t.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.end_block_t.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k2031,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__2033 = k2031;
var G__2033__$1 = (((G__2033 instanceof cljs.core.Keyword))?G__2033.fqn:null);
switch (G__2033__$1) {
case "type-tag":
return self__.type_tag;

break;
case "logical-block":
return self__.logical_block;

break;
case "start-pos":
return self__.start_pos;

break;
case "end-pos":
return self__.end_pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k2031,else__24369__auto__);

}
});

cljs.pprint.end_block_t.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.end-block-t{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.end_block_t.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.end_block_t.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2030){
var self__ = this;
var G__2030__$1 = this;
return (new cljs.core.RecordIter((0),G__2030__$1,(4),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.end_block_t.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.end_block_t.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.end_block_t.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((4) + cljs.core.count(self__.__extmap));
});

cljs.pprint.end_block_t.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.end_block_t.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.end_block_t.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),null,new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),null,new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),null,new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.end_block_t.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__2030){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2034 = cljs.core.keyword_identical_QMARK_;
var expr__2035 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2037 = new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267));
var G__2038 = expr__2035;
return (pred__2034.cljs$core$IFn$_invoke$arity$2 ? pred__2034.cljs$core$IFn$_invoke$arity$2(G__2037,G__2038) : pred__2034.call(null,G__2037,G__2038));
})())){
return (new cljs.pprint.end_block_t(G__2030,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2039 = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564));
var G__2040 = expr__2035;
return (pred__2034.cljs$core$IFn$_invoke$arity$2 ? pred__2034.cljs$core$IFn$_invoke$arity$2(G__2039,G__2040) : pred__2034.call(null,G__2039,G__2040));
})())){
return (new cljs.pprint.end_block_t(self__.type_tag,G__2030,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2041 = new cljs.core.Keyword(null,"start-pos","start-pos",(668789086));
var G__2042 = expr__2035;
return (pred__2034.cljs$core$IFn$_invoke$arity$2 ? pred__2034.cljs$core$IFn$_invoke$arity$2(G__2041,G__2042) : pred__2034.call(null,G__2041,G__2042));
})())){
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,G__2030,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2043 = new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926));
var G__2044 = expr__2035;
return (pred__2034.cljs$core$IFn$_invoke$arity$2 ? pred__2034.cljs$core$IFn$_invoke$arity$2(G__2043,G__2044) : pred__2034.call(null,G__2043,G__2044));
})())){
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,self__.start_pos,G__2030,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__2030),null));
}
}
}
}
});

cljs.pprint.end_block_t.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.end_block_t.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__2030){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.end_block_t(self__.type_tag,self__.logical_block,self__.start_pos,self__.end_pos,G__2030,self__.__extmap,self__.__hash));
});

cljs.pprint.end_block_t.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.end_block_t.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null);
});

cljs.pprint.end_block_t.cljs$lang$type = true;

cljs.pprint.end_block_t.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/end-block-t");
});

cljs.pprint.end_block_t.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/end-block-t");
});

(function (){
cljs.pprint.__GT_end_block_t = (function cljs$pprint$__GT_end_block_t(type_tag,logical_block,start_pos,end_pos){
return (new cljs.pprint.end_block_t(type_tag,logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_end_block_t;},new cljs.core.Symbol("cljs.pprint","->end-block-t","cljs.pprint/->end-block-t",(-471753075),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->end-block-t","->end-block-t",(-457247532),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(257),(257),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_end_block_t)?cljs.pprint.__GT_end_block_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_end_block_t = (function cljs$pprint$map__GT_end_block_t(G__2032){
return (new cljs.pprint.end_block_t(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(G__2032),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(G__2032),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(G__2032),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(G__2032),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__2032,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),cljs.core.array_seq([new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_end_block_t;},new cljs.core.Symbol("cljs.pprint","map->end-block-t","cljs.pprint/map->end-block-t",(903938056),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->end-block-t","map->end-block-t",(1294346835),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(257),(257),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__2032","G__2032",(-1402602258),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_end_block_t)?cljs.pprint.map__GT_end_block_t.cljs$lang$test:null)])));})()
;


(function (){
cljs.pprint.make_end_block_t = (function cljs$pprint$make_end_block_t(logical_block,start_pos,end_pos){
return (new cljs.pprint.end_block_t(new cljs.core.Keyword(null,"end-block-t","end-block-t",(1544648735)),logical_block,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_end_block_t;},new cljs.core.Symbol("cljs.pprint","make-end-block-t","cljs.pprint/make-end-block-t",(789783156),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-end-block-t","make-end-block-t",(911490239),null),"cljs/pprint.cljs",(1),(257),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.make_end_block_t)?cljs.pprint.make_end_block_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.end_block_t_QMARK_ = (function cljs$pprint$end_block_t_QMARK_(x__97__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(x__97__auto__),new cljs.core.Keyword(null,"end-block-t","end-block-t",(1544648735)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.end_block_t_QMARK_;},new cljs.core.Symbol("cljs.pprint","end-block-t?","cljs.pprint/end-block-t?",(-232662708),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"end-block-t?","end-block-t?",(-337190011),null),"cljs/pprint.cljs",(1),(257),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)], null)),null,(cljs.core.truth_(cljs.pprint.end_block_t_QMARK_)?cljs.pprint.end_block_t_QMARK_.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.indent_t = (function (type_tag,logical_block,relative_to,offset,start_pos,end_pos,__meta,__extmap,__hash){
this.type_tag = type_tag;
this.logical_block = logical_block;
this.relative_to = relative_to;
this.offset = offset;
this.start_pos = start_pos;
this.end_pos = end_pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.indent_t.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.indent_t.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k2047,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__2049 = k2047;
var G__2049__$1 = (((G__2049 instanceof cljs.core.Keyword))?G__2049.fqn:null);
switch (G__2049__$1) {
case "type-tag":
return self__.type_tag;

break;
case "logical-block":
return self__.logical_block;

break;
case "relative-to":
return self__.relative_to;

break;
case "offset":
return self__.offset;

break;
case "start-pos":
return self__.start_pos;

break;
case "end-pos":
return self__.end_pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k2047,else__24369__auto__);

}
});

cljs.pprint.indent_t.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.indent-t{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)),self__.relative_to],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"offset","offset",(296498311)),self__.offset],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.indent_t.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.indent_t.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2046){
var self__ = this;
var G__2046__$1 = this;
return (new cljs.core.RecordIter((0),G__2046__$1,(6),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)),new cljs.core.Keyword(null,"offset","offset",(296498311)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.indent_t.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.indent_t.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.indent_t.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((6) + cljs.core.count(self__.__extmap));
});

cljs.pprint.indent_t.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.indent_t.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.indent_t.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),null,new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),null,new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)),null,new cljs.core.Keyword(null,"offset","offset",(296498311)),null,new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),null,new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.indent_t.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__2046){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2050 = cljs.core.keyword_identical_QMARK_;
var expr__2051 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2053 = new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267));
var G__2054 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2053,G__2054) : pred__2050.call(null,G__2053,G__2054));
})())){
return (new cljs.pprint.indent_t(G__2046,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2055 = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564));
var G__2056 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2055,G__2056) : pred__2050.call(null,G__2055,G__2056));
})())){
return (new cljs.pprint.indent_t(self__.type_tag,G__2046,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2057 = new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051));
var G__2058 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2057,G__2058) : pred__2050.call(null,G__2057,G__2058));
})())){
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,G__2046,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2059 = new cljs.core.Keyword(null,"offset","offset",(296498311));
var G__2060 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2059,G__2060) : pred__2050.call(null,G__2059,G__2060));
})())){
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,G__2046,self__.start_pos,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2061 = new cljs.core.Keyword(null,"start-pos","start-pos",(668789086));
var G__2062 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2061,G__2062) : pred__2050.call(null,G__2061,G__2062));
})())){
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,G__2046,self__.end_pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2063 = new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926));
var G__2064 = expr__2051;
return (pred__2050.cljs$core$IFn$_invoke$arity$2 ? pred__2050.cljs$core$IFn$_invoke$arity$2(G__2063,G__2064) : pred__2050.call(null,G__2063,G__2064));
})())){
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,G__2046,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__2046),null));
}
}
}
}
}
}
});

cljs.pprint.indent_t.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),self__.type_tag],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),self__.logical_block],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)),self__.relative_to],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"offset","offset",(296498311)),self__.offset],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),self__.start_pos],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)),self__.end_pos],null))], null),self__.__extmap));
});

cljs.pprint.indent_t.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__2046){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.indent_t(self__.type_tag,self__.logical_block,self__.relative_to,self__.offset,self__.start_pos,self__.end_pos,G__2046,self__.__extmap,self__.__hash));
});

cljs.pprint.indent_t.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.indent_t.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"relative-to","relative-to",(1170431476),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null);
});

cljs.pprint.indent_t.cljs$lang$type = true;

cljs.pprint.indent_t.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/indent-t");
});

cljs.pprint.indent_t.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/indent-t");
});

(function (){
cljs.pprint.__GT_indent_t = (function cljs$pprint$__GT_indent_t(type_tag,logical_block,relative_to,offset,start_pos,end_pos){
return (new cljs.pprint.indent_t(type_tag,logical_block,relative_to,offset,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_indent_t;},new cljs.core.Symbol("cljs.pprint","->indent-t","cljs.pprint/->indent-t",(-139346255),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->indent-t","->indent-t",(-59091720),null),"cljs/pprint.cljs",(18),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(259),(259),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"type-tag","type-tag",(-233331740),null),new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"relative-to","relative-to",(1170431476),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_indent_t)?cljs.pprint.__GT_indent_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_indent_t = (function cljs$pprint$map__GT_indent_t(G__2048){
return (new cljs.pprint.indent_t(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(G__2048),new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(G__2048),new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)).cljs$core$IFn$_invoke$arity$1(G__2048),new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(G__2048),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)).cljs$core$IFn$_invoke$arity$1(G__2048),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926)).cljs$core$IFn$_invoke$arity$1(G__2048),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__2048,new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)),cljs.core.array_seq([new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)),new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)),new cljs.core.Keyword(null,"offset","offset",(296498311)),new cljs.core.Keyword(null,"start-pos","start-pos",(668789086)),new cljs.core.Keyword(null,"end-pos","end-pos",(-1643883926))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_indent_t;},new cljs.core.Symbol("cljs.pprint","map->indent-t","cljs.pprint/map->indent-t",(-1896477787),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->indent-t","map->indent-t",(-2042682886),null),"cljs/pprint.cljs",(18),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(259),(259),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__2048","G__2048",(-1166832940),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_indent_t)?cljs.pprint.map__GT_indent_t.cljs$lang$test:null)])));})()
;


(function (){
cljs.pprint.make_indent_t = (function cljs$pprint$make_indent_t(logical_block,relative_to,offset,start_pos,end_pos){
return (new cljs.pprint.indent_t(new cljs.core.Keyword(null,"indent-t","indent-t",(528318969)),logical_block,relative_to,offset,start_pos,end_pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_indent_t;},new cljs.core.Symbol("cljs.pprint","make-indent-t","cljs.pprint/make-indent-t",(1328799744),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-indent-t","make-indent-t",(1182062169),null),"cljs/pprint.cljs",(1),(259),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"logical-block","logical-block",(1059508963),null),new cljs.core.Symbol(null,"relative-to","relative-to",(1170431476),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"start-pos","start-pos",(-1985646683),null),new cljs.core.Symbol(null,"end-pos","end-pos",(-3352399),null)], null)),null,(cljs.core.truth_(cljs.pprint.make_indent_t)?cljs.pprint.make_indent_t.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.indent_t_QMARK_ = (function cljs$pprint$indent_t_QMARK_(x__97__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(x__97__auto__),new cljs.core.Keyword(null,"indent-t","indent-t",(528318969)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.indent_t_QMARK_;},new cljs.core.Symbol("cljs.pprint","indent-t?","cljs.pprint/indent-t?",(-483860483),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"indent-t?","indent-t?",(-337513084),null),"cljs/pprint.cljs",(1),(259),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x__97__auto__","x__97__auto__",(-648794683),null)], null)),null,(cljs.core.truth_(cljs.pprint.indent_t_QMARK_)?cljs.pprint.indent_t_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pp_newline = (function cljs$pprint$pp_newline(){
return "\n";
}); return (
new cljs.core.Var(function(){return cljs.pprint.pp_newline;},new cljs.core.Symbol("cljs.pprint","pp-newline","cljs.pprint/pp-newline",(-54672964),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pp-newline","pp-newline",(-134817723),null),"cljs/pprint.cljs",(26),(1),(261),(261),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pp_newline)?cljs.pprint.pp_newline.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.emit_nl; return (
new cljs.core.Var(function(){return cljs.pprint.emit_nl;},new cljs.core.Symbol("cljs.pprint","emit-nl","cljs.pprint/emit-nl",(100637404),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"emit-nl","emit-nl",(482765973),null),"cljs/pprint.cljs",(17),(1),(263),true,(263),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.emit_nl)?cljs.pprint.emit_nl.cljs$lang$test:null)])));})()
;
if(typeof cljs.pprint.write_token !== 'undefined'){
} else {
(function (){
cljs.pprint.write_token = (function (){var method_table__26238__auto__ = (function (){var G__2066 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2066) : cljs.core.atom.call(null,G__2066));
})();
var prefer_table__26239__auto__ = (function (){var G__2067 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2067) : cljs.core.atom.call(null,G__2067));
})();
var method_cache__26240__auto__ = (function (){var G__2068 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2068) : cljs.core.atom.call(null,G__2068));
})();
var cached_hierarchy__26241__auto__ = (function (){var G__2069 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2069) : cljs.core.atom.call(null,G__2069));
})();
var hierarchy__26242__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",(-1053470341)),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.pprint","write-token"),((function (method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__,hierarchy__26242__auto__){
return (function (p1__112_SHARP_,p2__111_SHARP_){
return new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(p2__111_SHARP_);
});})(method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__,hierarchy__26242__auto__))
,new cljs.core.Keyword(null,"default","default",(-1987822328)),hierarchy__26242__auto__,method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__));
})(); return (
new cljs.core.Var(function(){return cljs.pprint.write_token;},new cljs.core.Symbol("cljs.pprint","write-token","cljs.pprint/write-token",(1467482807),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-token","write-token",(1816210760),null),"cljs/pprint.cljs",(39),(1),(265),(265),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.write_token)?cljs.pprint.write_token.cljs$lang$test:null)])));})()
;
}
cljs.pprint.write_token.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"start-block-t","start-block-t",(-373430594)),(function (this$,token){
var temp__21890__auto___2078 = new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)).cljs$core$IFn$_invoke$arity$1((function (){var G__2070 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2070) : cljs.core.deref.call(null,G__2070));
})());
if(cljs.core.truth_(temp__21890__auto___2078)){
var cb_2079 = temp__21890__auto___2078;
var G__2071_2080 = new cljs.core.Keyword(null,"start","start",(-355208981));
(cb_2079.cljs$core$IFn$_invoke$arity$1 ? cb_2079.cljs$core$IFn$_invoke$arity$1(G__2071_2080) : cb_2079.call(null,G__2071_2080));
} else {
}

var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(token);
var temp__21890__auto___2081 = new cljs.core.Keyword(null,"prefix","prefix",(-265908465)).cljs$core$IFn$_invoke$arity$1(lb);
if(cljs.core.truth_(temp__21890__auto___2081)){
var prefix_2082 = temp__21890__auto___2081;
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2072 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2072) : cljs.core.deref.call(null,G__2072));
})()),prefix_2082);
} else {
}

var col = cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2073 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2073) : cljs.core.deref.call(null,G__2073));
})()));
var G__2074_2083 = new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2075_2084 = col;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2074_2083,G__2075_2084) : cljs.core.reset_BANG_.call(null,G__2074_2083,G__2075_2084));

var G__2076 = new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2077 = col;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2076,G__2077) : cljs.core.reset_BANG_.call(null,G__2076,G__2077));
}));
cljs.pprint.write_token.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"end-block-t","end-block-t",(1544648735)),(function (this$,token){
var temp__21890__auto___2088 = new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)).cljs$core$IFn$_invoke$arity$1((function (){var G__2085 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2085) : cljs.core.deref.call(null,G__2085));
})());
if(cljs.core.truth_(temp__21890__auto___2088)){
var cb_2089 = temp__21890__auto___2088;
var G__2086_2090 = new cljs.core.Keyword(null,"end","end",(-268185958));
(cb_2089.cljs$core$IFn$_invoke$arity$1 ? cb_2089.cljs$core$IFn$_invoke$arity$1(G__2086_2090) : cb_2089.call(null,G__2086_2090));
} else {
}

var temp__21890__auto__ = new cljs.core.Keyword(null,"suffix","suffix",(367373057)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(token));
if(cljs.core.truth_(temp__21890__auto__)){
var suffix = temp__21890__auto__;
return cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2087 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2087) : cljs.core.deref.call(null,G__2087));
})()),suffix);
} else {
return null;
}
}));
cljs.pprint.write_token.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"indent-t","indent-t",(528318969)),(function (this$,token){
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(token);
var G__2091 = new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2092 = (new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(token) + (function (){var pred__2093 = cljs.core._EQ_;
var expr__2094 = new cljs.core.Keyword(null,"relative-to","relative-to",(-470100051)).cljs$core$IFn$_invoke$arity$1(token);
if(cljs.core.truth_((function (){var G__2096 = new cljs.core.Keyword(null,"block","block",(664686210));
var G__2097 = expr__2094;
return (pred__2093.cljs$core$IFn$_invoke$arity$2 ? pred__2093.cljs$core$IFn$_invoke$arity$2(G__2096,G__2097) : pred__2093.call(null,G__2096,G__2097));
})())){
var G__2098 = new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2098) : cljs.core.deref.call(null,G__2098));
} else {
if(cljs.core.truth_((function (){var G__2099 = new cljs.core.Keyword(null,"current","current",(-1088038603));
var G__2100 = expr__2094;
return (pred__2093.cljs$core$IFn$_invoke$arity$2 ? pred__2093.cljs$core$IFn$_invoke$arity$2(G__2099,G__2100) : pred__2093.call(null,G__2099,G__2100));
})())){
return cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2101 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2101) : cljs.core.deref.call(null,G__2101));
})()));
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2094)].join('')));
}
}
})());
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2091,G__2092) : cljs.core.reset_BANG_.call(null,G__2091,G__2092));
}));
cljs.pprint.write_token.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"buffer-blob","buffer-blob",(-1830112173)),(function (this$,token){
return cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2102 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2102) : cljs.core.deref.call(null,G__2102));
})()),new cljs.core.Keyword(null,"data","data",(-232669377)).cljs$core$IFn$_invoke$arity$1(token));
}));
cljs.pprint.write_token.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"nl-t","nl-t",(-1608382114)),(function (this$,token){
if(cljs.core.truth_((function (){var or__22603__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type","type",(1174270348)).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"mandatory","mandatory",(542802336)));
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = !(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type","type",(1174270348)).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"fill","fill",(883462889))));
if(and__22563__auto__){
var G__2106 = new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(token));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2106) : cljs.core.deref.call(null,G__2106));
} else {
return and__22563__auto__;
}
}
})())){
(cljs.pprint.emit_nl.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.emit_nl.cljs$core$IFn$_invoke$arity$2(this$,token) : cljs.pprint.emit_nl.call(null,this$,token));
} else {
var temp__21598__auto___2109 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2107 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2107) : cljs.core.deref.call(null,G__2107));
})());
if(cljs.core.truth_(temp__21598__auto___2109)){
var tws_2110 = temp__21598__auto___2109;
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2108 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2108) : cljs.core.deref.call(null,G__2108));
})()),tws_2110);
} else {
}
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null);
}));
(function (){
cljs.pprint.write_tokens = (function cljs$pprint$write_tokens(this$,tokens,force_trailing_whitespace){
var seq__2123 = cljs.core.seq(tokens);
var chunk__2124 = null;
var count__2125 = (0);
var i__2126 = (0);
while(true){
if((i__2126 < count__2125)){
var token = chunk__2124.cljs$core$IIndexed$_nth$arity$2(null,i__2126);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"nl-t","nl-t",(-1608382114))))){
var temp__21598__auto___2135 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2127 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2127) : cljs.core.deref.call(null,G__2127));
})());
if(cljs.core.truth_(temp__21598__auto___2135)){
var tws_2136 = temp__21598__auto___2135;
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2128 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2128) : cljs.core.deref.call(null,G__2128));
})()),tws_2136);
} else {
}
} else {
}

(cljs.pprint.write_token.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.write_token.cljs$core$IFn$_invoke$arity$2(this$,token) : cljs.pprint.write_token.call(null,this$,token));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1(token));

var tws_2137 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2129 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2129) : cljs.core.deref.call(null,G__2129));
})());
if(cljs.core.truth_((function (){var and__22563__auto__ = force_trailing_whitespace;
if(cljs.core.truth_(and__22563__auto__)){
return tws_2137;
} else {
return and__22563__auto__;
}
})())){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2130 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2130) : cljs.core.deref.call(null,G__2130));
})()),tws_2137);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null);
} else {
}

var G__2138 = seq__2123;
var G__2139 = chunk__2124;
var G__2140 = count__2125;
var G__2141 = (i__2126 + (1));
seq__2123 = G__2138;
chunk__2124 = G__2139;
count__2125 = G__2140;
i__2126 = G__2141;
continue;
} else {
var temp__21890__auto__ = cljs.core.seq(seq__2123);
if(temp__21890__auto__){
var seq__2123__$1 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__2123__$1)){
var c__26099__auto__ = cljs.core.chunk_first(seq__2123__$1);
var G__2142 = cljs.core.chunk_rest(seq__2123__$1);
var G__2143 = c__26099__auto__;
var G__2144 = cljs.core.count(c__26099__auto__);
var G__2145 = (0);
seq__2123 = G__2142;
chunk__2124 = G__2143;
count__2125 = G__2144;
i__2126 = G__2145;
continue;
} else {
var token = cljs.core.first(seq__2123__$1);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type-tag","type-tag",(-1873863267)).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"nl-t","nl-t",(-1608382114))))){
var temp__21598__auto___2146 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2131 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2131) : cljs.core.deref.call(null,G__2131));
})());
if(cljs.core.truth_(temp__21598__auto___2146)){
var tws_2147 = temp__21598__auto___2146;
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2132 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2132) : cljs.core.deref.call(null,G__2132));
})()),tws_2147);
} else {
}
} else {
}

(cljs.pprint.write_token.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.write_token.cljs$core$IFn$_invoke$arity$2(this$,token) : cljs.pprint.write_token.call(null,this$,token));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1(token));

var tws_2148 = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2133 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2133) : cljs.core.deref.call(null,G__2133));
})());
if(cljs.core.truth_((function (){var and__22563__auto__ = force_trailing_whitespace;
if(cljs.core.truth_(and__22563__auto__)){
return tws_2148;
} else {
return and__22563__auto__;
}
})())){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2134 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2134) : cljs.core.deref.call(null,G__2134));
})()),tws_2148);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null);
} else {
}

var G__2149 = cljs.core.next(seq__2123__$1);
var G__2150 = null;
var G__2151 = (0);
var G__2152 = (0);
seq__2123 = G__2149;
chunk__2124 = G__2150;
count__2125 = G__2151;
i__2126 = G__2152;
continue;
}
} else {
return null;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_tokens;},new cljs.core.Symbol("cljs.pprint","write-tokens","cljs.pprint/write-tokens",(-1995632649),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-tokens","write-tokens",(1917187118),null),"cljs/pprint.cljs",(20),(1),(301),(301),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"tokens","tokens",(821592223),null),new cljs.core.Symbol(null,"force-trailing-whitespace","force-trailing-whitespace",(1456336951),null)], null)),null,(cljs.core.truth_(cljs.pprint.write_tokens)?cljs.pprint.write_tokens.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.tokens_fit_QMARK_ = (function cljs$pprint$tokens_fit_QMARK_(this$,tokens){
var maxcol = cljs.pprint.get_max_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2156 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2156) : cljs.core.deref.call(null,G__2156));
})()));
return ((maxcol == null)) || (((cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2158 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2158) : cljs.core.deref.call(null,G__2158));
})())) + cljs.pprint.buffer_length(tokens)) < maxcol));
}); return (
new cljs.core.Var(function(){return cljs.pprint.tokens_fit_QMARK_;},new cljs.core.Symbol("cljs.pprint","tokens-fit?","cljs.pprint/tokens-fit?",(723209145),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"tokens-fit?","tokens-fit?",(314725758),null),"cljs/pprint.cljs",(19),(1),(318),(318),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"tokens","tokens",(821592223),null)], null)),null,(cljs.core.truth_(cljs.pprint.tokens_fit_QMARK_)?cljs.pprint.tokens_fit_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.linear_nl_QMARK_ = (function cljs$pprint$linear_nl_QMARK_(this$,lb,section){
var or__22603__auto__ = (function (){var G__2162 = new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2162) : cljs.core.deref.call(null,G__2162));
})();
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return cljs.core.not(cljs.pprint.tokens_fit_QMARK_(this$,section));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.linear_nl_QMARK_;},new cljs.core.Symbol("cljs.pprint","linear-nl?","cljs.pprint/linear-nl?",(346140424),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"linear-nl?","linear-nl?",(-308364991),null),"cljs/pprint.cljs",(18),(1),(324),(324),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"lb","lb",(950310490),null),new cljs.core.Symbol(null,"section","section",(1340390001),null)], null)),null,(cljs.core.truth_(cljs.pprint.linear_nl_QMARK_)?cljs.pprint.linear_nl_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.miser_nl_QMARK_ = (function cljs$pprint$miser_nl_QMARK_(this$,lb,section){
var miser_width = (cljs.pprint.get_miser_width.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.get_miser_width.cljs$core$IFn$_invoke$arity$1(this$) : cljs.pprint.get_miser_width.call(null,this$));
var maxcol = cljs.pprint.get_max_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2166 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2166) : cljs.core.deref.call(null,G__2166));
})()));
var and__22563__auto__ = miser_width;
if(cljs.core.truth_(and__22563__auto__)){
var and__22563__auto____$1 = maxcol;
if(cljs.core.truth_(and__22563__auto____$1)){
var and__22563__auto____$2 = ((function (){var G__2168 = new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2168) : cljs.core.deref.call(null,G__2168));
})() >= (maxcol - miser_width));
if(and__22563__auto____$2){
return cljs.pprint.linear_nl_QMARK_(this$,lb,section);
} else {
return and__22563__auto____$2;
}
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.miser_nl_QMARK_;},new cljs.core.Symbol("cljs.pprint","miser-nl?","cljs.pprint/miser-nl?",(-273692155),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"miser-nl?","miser-nl?",(-152788902),null),"cljs/pprint.cljs",(17),(1),(328),(328),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"lb","lb",(950310490),null),new cljs.core.Symbol(null,"section","section",(1340390001),null)], null)),null,(cljs.core.truth_(cljs.pprint.miser_nl_QMARK_)?cljs.pprint.miser_nl_QMARK_.cljs$lang$test:null)])));})()
;
if(typeof cljs.pprint.emit_nl_QMARK_ !== 'undefined'){
} else {
(function (){
cljs.pprint.emit_nl_QMARK_ = (function (){var method_table__26238__auto__ = (function (){var G__2169 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2169) : cljs.core.atom.call(null,G__2169));
})();
var prefer_table__26239__auto__ = (function (){var G__2170 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2170) : cljs.core.atom.call(null,G__2170));
})();
var method_cache__26240__auto__ = (function (){var G__2171 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2171) : cljs.core.atom.call(null,G__2171));
})();
var cached_hierarchy__26241__auto__ = (function (){var G__2172 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2172) : cljs.core.atom.call(null,G__2172));
})();
var hierarchy__26242__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",(-1053470341)),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.pprint","emit-nl?"),((function (method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__,hierarchy__26242__auto__){
return (function (t,_,___$1,___$2){
return new cljs.core.Keyword(null,"type","type",(1174270348)).cljs$core$IFn$_invoke$arity$1(t);
});})(method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__,hierarchy__26242__auto__))
,new cljs.core.Keyword(null,"default","default",(-1987822328)),hierarchy__26242__auto__,method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__));
})(); return (
new cljs.core.Var(function(){return cljs.pprint.emit_nl_QMARK_;},new cljs.core.Symbol("cljs.pprint","emit-nl?","cljs.pprint/emit-nl?",(1379535965),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"emit-nl?","emit-nl?",(1256274566),null),"cljs/pprint.cljs",(36),(1),(335),(335),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.emit_nl_QMARK_)?cljs.pprint.emit_nl_QMARK_.cljs$lang$test:null)])));})()
;
}
cljs.pprint.emit_nl_QMARK_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"linear","linear",(872268697)),(function (newl,this$,section,_){
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(newl);
return cljs.pprint.linear_nl_QMARK_(this$,lb,section);
}));
cljs.pprint.emit_nl_QMARK_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"miser","miser",(-556060186)),(function (newl,this$,section,_){
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(newl);
return cljs.pprint.miser_nl_QMARK_(this$,lb,section);
}));
cljs.pprint.emit_nl_QMARK_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"fill","fill",(883462889)),(function (newl,this$,section,subsection){
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(newl);
var or__22603__auto__ = (function (){var G__2174 = new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2174) : cljs.core.deref.call(null,G__2174));
})();
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
var or__22603__auto____$1 = cljs.core.not(cljs.pprint.tokens_fit_QMARK_(this$,subsection));
if(or__22603__auto____$1){
return or__22603__auto____$1;
} else {
return cljs.pprint.miser_nl_QMARK_(this$,lb,section);
}
}
}));
cljs.pprint.emit_nl_QMARK_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"mandatory","mandatory",(542802336)),(function (_,___$1,___$2,___$3){
return true;
}));
(function (){
cljs.pprint.get_section = (function cljs$pprint$get_section(buffer){
var nl = cljs.core.first(buffer);
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(nl);
var section = cljs.core.seq(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (nl,lb){
return (function (p1__113_SHARP_){
return cljs.core.not((function (){var and__22563__auto__ = cljs.pprint.nl_t_QMARK_(p1__113_SHARP_);
if(cljs.core.truth_(and__22563__auto__)){
return cljs.pprint.ancestor_QMARK_(new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(p1__113_SHARP_),lb);
} else {
return and__22563__auto__;
}
})());
});})(nl,lb))
,cljs.core.next(buffer)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [section,cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2((cljs.core.count(section) + (1)),buffer))], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_section;},new cljs.core.Symbol("cljs.pprint","get-section","cljs.pprint/get-section",(1303887224),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-section","get-section",(1955501217),null),"cljs/pprint.cljs",(19),(1),(358),(358),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"buffer","buffer",(-2037140571),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_section)?cljs.pprint.get_section.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_sub_section = (function cljs$pprint$get_sub_section(buffer){
var nl = cljs.core.first(buffer);
var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(nl);
var section = cljs.core.seq(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (nl,lb){
return (function (p1__114_SHARP_){
var nl_lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(p1__114_SHARP_);
return cljs.core.not((function (){var and__22563__auto__ = cljs.pprint.nl_t_QMARK_(p1__114_SHARP_);
if(cljs.core.truth_(and__22563__auto__)){
var or__22603__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(nl_lb,lb);
if(or__22603__auto__){
return or__22603__auto__;
} else {
return cljs.pprint.ancestor_QMARK_(nl_lb,lb);
}
} else {
return and__22563__auto__;
}
})());
});})(nl,lb))
,cljs.core.next(buffer)));
return section;
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_sub_section;},new cljs.core.Symbol("cljs.pprint","get-sub-section","cljs.pprint/get-sub-section",(-1176832379),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-sub-section","get-sub-section",(-1595572020),null),"cljs/pprint.cljs",(23),(1),(365),(365),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"buffer","buffer",(-2037140571),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_sub_section)?cljs.pprint.get_sub_section.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.update_nl_state = (function cljs$pprint$update_nl_state(lb){
var G__2183_2191 = new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2184_2192 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2183_2191,G__2184_2192) : cljs.core.reset_BANG_.call(null,G__2183_2191,G__2184_2192));

var G__2189_2193 = new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2190_2194 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2189_2193,G__2190_2194) : cljs.core.reset_BANG_.call(null,G__2189_2193,G__2190_2194));

var lb__$1 = new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(lb);
while(true){
if(cljs.core.truth_(lb__$1)){
var G__2185_2195 = new cljs.core.Keyword(null,"done-nl","done-nl",(-381024340)).cljs$core$IFn$_invoke$arity$1(lb__$1);
var G__2186_2196 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2185_2195,G__2186_2196) : cljs.core.reset_BANG_.call(null,G__2185_2195,G__2186_2196));

var G__2187_2197 = new cljs.core.Keyword(null,"intra-block-nl","intra-block-nl",(1808826875)).cljs$core$IFn$_invoke$arity$1(lb__$1);
var G__2188_2198 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2187_2197,G__2188_2198) : cljs.core.reset_BANG_.call(null,G__2187_2197,G__2188_2198));

var G__2199 = new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(lb__$1);
lb__$1 = G__2199;
continue;
} else {
return null;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.update_nl_state;},new cljs.core.Symbol("cljs.pprint","update-nl-state","cljs.pprint/update-nl-state",(192892547),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"update-nl-state","update-nl-state",(305681608),null),"cljs/pprint.cljs",(23),(1),(373),(373),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lb","lb",(950310490),null)], null)),null,(cljs.core.truth_(cljs.pprint.update_nl_state)?cljs.pprint.update_nl_state.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.emit_nl = (function cljs$pprint$emit_nl(this$,nl){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2204 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2204) : cljs.core.deref.call(null,G__2204));
})()),cljs.pprint.pp_newline());

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null);

var lb = new cljs.core.Keyword(null,"logical-block","logical-block",(-581022564)).cljs$core$IFn$_invoke$arity$1(nl);
var prefix = new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)).cljs$core$IFn$_invoke$arity$1(lb);
if(cljs.core.truth_(prefix)){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2205 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2205) : cljs.core.deref.call(null,G__2205));
})()),prefix);
} else {
}

var istr_2208 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((function (){var G__2206 = new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2206) : cljs.core.deref.call(null,G__2206));
})() - cljs.core.count(prefix))," "));
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2207 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2207) : cljs.core.deref.call(null,G__2207));
})()),istr_2208);

return cljs.pprint.update_nl_state(lb);
}); return (
new cljs.core.Var(function(){return cljs.pprint.emit_nl;},new cljs.core.Symbol("cljs.pprint","emit-nl","cljs.pprint/emit-nl",(100637404),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"emit-nl","emit-nl",(482765973),null),"cljs/pprint.cljs",(15),(1),(382),(382),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"nl","nl",(1731484120),null)], null)),null,(cljs.core.truth_(cljs.pprint.emit_nl)?cljs.pprint.emit_nl.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.split_at_newline = (function cljs$pprint$split_at_newline(tokens){
var pre = cljs.core.seq(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__115_SHARP_){
return cljs.core.not(cljs.pprint.nl_t_QMARK_(p1__115_SHARP_));
}),tokens));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pre,cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(cljs.core.count(pre),tokens))], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.split_at_newline;},new cljs.core.Symbol("cljs.pprint","split-at-newline","cljs.pprint/split-at-newline",(1996218018),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"split-at-newline","split-at-newline",(-1893715735),null),"cljs/pprint.cljs",(24),(1),(393),(393),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"tokens","tokens",(821592223),null)], null)),null,(cljs.core.truth_(cljs.pprint.split_at_newline)?cljs.pprint.split_at_newline.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.write_token_string = (function cljs$pprint$write_token_string(this$,tokens){
var vec__2219 = cljs.pprint.split_at_newline(tokens);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2219,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2219,(1),null);
if(cljs.core.truth_(a)){
cljs.pprint.write_tokens(this$,a,false);
} else {
}

if(cljs.core.truth_(b)){
var vec__2222 = cljs.pprint.get_section(b);
var section = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2222,(0),null);
var remainder = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2222,(1),null);
var newl = cljs.core.first(b);
var do_nl = (function (){var G__2225 = newl;
var G__2226 = this$;
var G__2227 = section;
var G__2228 = cljs.pprint.get_sub_section(b);
return (cljs.pprint.emit_nl_QMARK_.cljs$core$IFn$_invoke$arity$4 ? cljs.pprint.emit_nl_QMARK_.cljs$core$IFn$_invoke$arity$4(G__2225,G__2226,G__2227,G__2228) : cljs.pprint.emit_nl_QMARK_.call(null,G__2225,G__2226,G__2227,G__2228));
})();
var result = (cljs.core.truth_(do_nl)?(function (){
cljs.pprint.emit_nl(this$,newl);

return cljs.core.next(b);
})()
:b);
var long_section = cljs.core.not(cljs.pprint.tokens_fit_QMARK_(this$,result));
var result__$1 = ((long_section)?(function (){var rem2 = (cljs.pprint.write_token_string.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.write_token_string.cljs$core$IFn$_invoke$arity$2(this$,section) : cljs.pprint.write_token_string.call(null,this$,section));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rem2,section)){
cljs.pprint.write_tokens(this$,section,false);

return remainder;
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(rem2,remainder));
}
})():result);
return result__$1;
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_token_string;},new cljs.core.Symbol("cljs.pprint","write-token-string","cljs.pprint/write-token-string",(1815936809),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-token-string","write-token-string",(402376032),null),"cljs/pprint.cljs",(26),(1),(399),(399),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"tokens","tokens",(821592223),null)], null)),null,(cljs.core.truth_(cljs.pprint.write_token_string)?cljs.pprint.write_token_string.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.write_line = (function cljs$pprint$write_line(this$){
var buffer = new cljs.core.Keyword(null,"buffer","buffer",(617295198)).cljs$core$IFn$_invoke$arity$1((function (){var G__2230 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2230) : cljs.core.deref.call(null,G__2230));
})());
while(true){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"buffer","buffer",(617295198)),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,buffer));

if(cljs.core.not(cljs.pprint.tokens_fit_QMARK_(this$,buffer))){
var new_buffer = cljs.pprint.write_token_string(this$,buffer);
if(!((buffer === new_buffer))){
var G__2231 = new_buffer;
buffer = G__2231;
continue;
} else {
return null;
}
} else {
return null;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_line;},new cljs.core.Symbol("cljs.pprint","write-line","cljs.pprint/write-line",(1867615210),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-line","write-line",(1886036515),null),"cljs/pprint.cljs",(18),(1),(423),(423),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.write_line)?cljs.pprint.write_line.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.add_to_buffer = (function cljs$pprint$add_to_buffer(this$,token){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"buffer","buffer",(617295198)),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"buffer","buffer",(617295198)).cljs$core$IFn$_invoke$arity$1((function (){var G__2234 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2234) : cljs.core.deref.call(null,G__2234));
})()),token));

if(cljs.core.not(cljs.pprint.tokens_fit_QMARK_(this$,new cljs.core.Keyword(null,"buffer","buffer",(617295198)).cljs$core$IFn$_invoke$arity$1((function (){var G__2235 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2235) : cljs.core.deref.call(null,G__2235));
})())))){
return cljs.pprint.write_line(this$);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.add_to_buffer;},new cljs.core.Symbol("cljs.pprint","add-to-buffer","cljs.pprint/add-to-buffer",(-1501969991),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"add-to-buffer","add-to-buffer",(-1364001922),null),"cljs/pprint.cljs",(21),(1),(433),(433),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"token","token",(429068312),null)], null)),null,(cljs.core.truth_(cljs.pprint.add_to_buffer)?cljs.pprint.add_to_buffer.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.write_buffered_output = (function cljs$pprint$write_buffered_output(this$){
cljs.pprint.write_line(this$);

var temp__21598__auto__ = new cljs.core.Keyword(null,"buffer","buffer",(617295198)).cljs$core$IFn$_invoke$arity$1((function (){var G__2237 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2237) : cljs.core.deref.call(null,G__2237));
})());
if(cljs.core.truth_(temp__21598__auto__)){
var buf = temp__21598__auto__;
cljs.pprint.write_tokens(this$,buf,true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"buffer","buffer",(617295198)),cljs.core.PersistentVector.EMPTY);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_buffered_output;},new cljs.core.Symbol("cljs.pprint","write-buffered-output","cljs.pprint/write-buffered-output",(365228641),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-buffered-output","write-buffered-output",(218883112),null),"cljs/pprint.cljs",(29),(1),(439),(439),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.write_buffered_output)?cljs.pprint.write_buffered_output.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.write_white_space = (function cljs$pprint$write_white_space(this$){
var temp__21890__auto__ = new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)).cljs$core$IFn$_invoke$arity$1((function (){var G__2240 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2240) : cljs.core.deref.call(null,G__2240));
})());
if(cljs.core.truth_(temp__21890__auto__)){
var tws = temp__21890__auto__;
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2241 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2241) : cljs.core.deref.call(null,G__2241));
})()),tws);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),null);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_white_space;},new cljs.core.Symbol("cljs.pprint","write-white-space","cljs.pprint/write-white-space",(898134995),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-white-space","write-white-space",(851511786),null),"cljs/pprint.cljs",(25),(1),(446),(446),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.write_white_space)?cljs.pprint.write_white_space.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.write_initial_lines = (function cljs$pprint$write_initial_lines(this$,s){
var lines = clojure.string.split.cljs$core$IFn$_invoke$arity$3(s,"\n",(-1));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(lines),(1))){
return s;
} else {
var prefix = new cljs.core.Keyword(null,"per-line-prefix","per-line-prefix",(846941813)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)).cljs$core$IFn$_invoke$arity$1((function (){var G__2257 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2257) : cljs.core.deref.call(null,G__2257));
})())));
var l = cljs.core.first(lines);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"buffering","buffering",(-876713613)),new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2258 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2258) : cljs.core.deref.call(null,G__2258));
})()))){
var oldpos_2272 = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2259 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2259) : cljs.core.deref.call(null,G__2259));
})());
var newpos_2273 = (oldpos_2272 + cljs.core.count(l));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",(-864607220)),newpos_2273);

cljs.pprint.add_to_buffer(this$,cljs.pprint.make_buffer_blob(l,null,oldpos_2272,newpos_2273));

cljs.pprint.write_buffered_output(this$);
} else {
cljs.pprint.write_white_space(this$);

cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2260 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2260) : cljs.core.deref.call(null,G__2260));
})()),l);
}

cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2261 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2261) : cljs.core.deref.call(null,G__2261));
})()),"\n");

var seq__2262_2274 = cljs.core.seq(cljs.core.next(cljs.core.butlast(lines)));
var chunk__2263_2275 = null;
var count__2264_2276 = (0);
var i__2265_2277 = (0);
while(true){
if((i__2265_2277 < count__2264_2276)){
var l_2278__$1 = chunk__2263_2275.cljs$core$IIndexed$_nth$arity$2(null,i__2265_2277);
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2266 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2266) : cljs.core.deref.call(null,G__2266));
})()),l_2278__$1);

cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2268 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2268) : cljs.core.deref.call(null,G__2268));
})()),cljs.pprint.pp_newline());

if(cljs.core.truth_(prefix)){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2267 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2267) : cljs.core.deref.call(null,G__2267));
})()),prefix);
} else {
}

var G__2279 = seq__2262_2274;
var G__2280 = chunk__2263_2275;
var G__2281 = count__2264_2276;
var G__2282 = (i__2265_2277 + (1));
seq__2262_2274 = G__2279;
chunk__2263_2275 = G__2280;
count__2264_2276 = G__2281;
i__2265_2277 = G__2282;
continue;
} else {
var temp__21890__auto___2283 = cljs.core.seq(seq__2262_2274);
if(temp__21890__auto___2283){
var seq__2262_2284__$1 = temp__21890__auto___2283;
if(cljs.core.chunked_seq_QMARK_(seq__2262_2284__$1)){
var c__26099__auto___2285 = cljs.core.chunk_first(seq__2262_2284__$1);
var G__2286 = cljs.core.chunk_rest(seq__2262_2284__$1);
var G__2287 = c__26099__auto___2285;
var G__2288 = cljs.core.count(c__26099__auto___2285);
var G__2289 = (0);
seq__2262_2274 = G__2286;
chunk__2263_2275 = G__2287;
count__2264_2276 = G__2288;
i__2265_2277 = G__2289;
continue;
} else {
var l_2290__$1 = cljs.core.first(seq__2262_2284__$1);
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2269 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2269) : cljs.core.deref.call(null,G__2269));
})()),l_2290__$1);

cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2271 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2271) : cljs.core.deref.call(null,G__2271));
})()),cljs.pprint.pp_newline());

if(cljs.core.truth_(prefix)){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2270 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2270) : cljs.core.deref.call(null,G__2270));
})()),prefix);
} else {
}

var G__2291 = cljs.core.next(seq__2262_2284__$1);
var G__2292 = null;
var G__2293 = (0);
var G__2294 = (0);
seq__2262_2274 = G__2291;
chunk__2263_2275 = G__2292;
count__2264_2276 = G__2293;
i__2265_2277 = G__2294;
continue;
}
} else {
}
}
break;
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"buffering","buffering",(-876713613)),new cljs.core.Keyword(null,"writing","writing",(-1486865108)));

return cljs.core.last(lines);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_initial_lines;},new cljs.core.Symbol("cljs.pprint","write-initial-lines","cljs.pprint/write-initial-lines",(-1059532595),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-initial-lines","write-initial-lines",(965753092),null),"cljs/pprint.cljs",(27),(1),(453),(453),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"Writer","Writer",(-1329856755),null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"String","String",(-2070057435),null)], null))], null)),null,(cljs.core.truth_(cljs.pprint.write_initial_lines)?cljs.pprint.write_initial_lines.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.p_write_char = (function cljs$pprint$p_write_char(this$,c){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2298 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2298) : cljs.core.deref.call(null,G__2298));
})()),new cljs.core.Keyword(null,"writing","writing",(-1486865108)))){
cljs.pprint.write_white_space(this$);

return cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2299 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2299) : cljs.core.deref.call(null,G__2299));
})()),c);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\n")){
return cljs.pprint.write_initial_lines(this$,"\n");
} else {
var oldpos = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2300 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2300) : cljs.core.deref.call(null,G__2300));
})());
var newpos = (oldpos + (1));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",(-864607220)),newpos);

return cljs.pprint.add_to_buffer(this$,cljs.pprint.make_buffer_blob(cljs.core.char$(c),null,oldpos,newpos));
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.p_write_char;},new cljs.core.Symbol("cljs.pprint","p-write-char","cljs.pprint/p-write-char",(-920393035),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"p-write-char","p-write-char",(-261586690),null),"cljs/pprint.cljs",(20),(1),(478),(478),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"c","c",(-122660552),null)], null)),null,(cljs.core.truth_(cljs.pprint.p_write_char)?cljs.pprint.p_write_char.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pretty_writer = (function cljs$pprint$pretty_writer(writer,max_columns,miser_width){
var lb = (new cljs.pprint.logical_block(null,null,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0))),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0))),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),null,null,null,null,null,null,null));
var fields = (function (){var G__2314 = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)),new cljs.core.Keyword(null,"miser-width","miser-width",(-1310049437)),new cljs.core.Keyword(null,"buffer-block","buffer-block",(-10937307)),new cljs.core.Keyword(null,"pretty-writer","pretty-writer",(-1222834267)),new cljs.core.Keyword(null,"sections","sections",(-886710106)),new cljs.core.Keyword(null,"mode","mode",(654403691)),new cljs.core.Keyword(null,"pos","pos",(-864607220)),new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),new cljs.core.Keyword(null,"base","base",(185279322)),new cljs.core.Keyword(null,"buffer-level","buffer-level",(928864731)),new cljs.core.Keyword(null,"buffer","buffer",(617295198))],[lb,miser_width,lb,true,null,new cljs.core.Keyword(null,"writing","writing",(-1486865108)),(0),null,cljs.pprint.column_writer.cljs$core$IFn$_invoke$arity$2(writer,max_columns),(1),cljs.core.PersistentVector.EMPTY]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__2314) : cljs.core.atom.call(null,G__2314));
})();
if(typeof cljs.pprint.t_cljs$pprint2315 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IWriter}
 * @implements {cljs.pprint.IPrettyFlush}
*/
cljs.pprint.t_cljs$pprint2315 = (function (writer,max_columns,miser_width,lb,fields,meta2316){
this.writer = writer;
this.max_columns = max_columns;
this.miser_width = miser_width;
this.lb = lb;
this.fields = fields;
this.meta2316 = meta2316;
this.cljs$lang$protocol_mask$partition0$ = 1074167808;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint2315.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (lb,fields){
return (function (_2317,meta2316__$1){
var self__ = this;
var _2317__$1 = this;
return (new cljs.pprint.t_cljs$pprint2315(self__.writer,self__.max_columns,self__.miser_width,self__.lb,self__.fields,meta2316__$1));
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (lb,fields){
return (function (_2317){
var self__ = this;
var _2317__$1 = this;
return self__.meta2316;
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$core$IDeref$_deref$arity$1 = ((function (lb,fields){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.fields;
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$core$IWriter$_write$arity$2 = ((function (lb,fields){
return (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__2320 = cljs.core._EQ_;
var expr__2321 = cljs.core.type(x);
if(cljs.core.truth_((pred__2320.cljs$core$IFn$_invoke$arity$2 ? pred__2320.cljs$core$IFn$_invoke$arity$2(String,expr__2321) : pred__2320.call(null,String,expr__2321)))){
var s0 = cljs.pprint.write_initial_lines(this$__$1,x);
var s = clojure.string.replace_first(s0,/\s+$/,"");
var white_space = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s0,cljs.core.count(s));
var mode = new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2323 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2323) : cljs.core.deref.call(null,G__2323));
})());
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"writing","writing",(-1486865108)))){
cljs.pprint.write_white_space(this$__$1);

cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2324 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2324) : cljs.core.deref.call(null,G__2324));
})()),s);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1)),cljs.core.assoc,new cljs.core.Keyword(null,"trailing-white-space","trailing-white-space",(1496006996)),white_space);
} else {
var oldpos = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2325 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2325) : cljs.core.deref.call(null,G__2325));
})());
var newpos = (oldpos + cljs.core.count(s0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1)),cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",(-864607220)),newpos);

return cljs.pprint.add_to_buffer(this$__$1,cljs.pprint.make_buffer_blob(s,white_space,oldpos,newpos));
}
} else {
if(cljs.core.truth_((pred__2320.cljs$core$IFn$_invoke$arity$2 ? pred__2320.cljs$core$IFn$_invoke$arity$2(Number,expr__2321) : pred__2320.call(null,Number,expr__2321)))){
return cljs.pprint.p_write_char(this$__$1,x);
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2321)].join('')));
}
}
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$core$IWriter$_flush$arity$1 = ((function (lb,fields){
return (function (this$){
var self__ = this;
var this$__$1 = this;
this$__$1.cljs$pprint$IPrettyFlush$_ppflush$arity$1(null);

return cljs.core._flush(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2326 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2326) : cljs.core.deref.call(null,G__2326));
})()));
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$pprint$IPrettyFlush$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.t_cljs$pprint2315.prototype.cljs$pprint$IPrettyFlush$_ppflush$arity$1 = ((function (lb,fields){
return (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2318 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2318) : cljs.core.deref.call(null,G__2318));
})()),new cljs.core.Keyword(null,"buffering","buffering",(-876713613)))){
cljs.pprint.write_tokens(this$__$1,new cljs.core.Keyword(null,"buffer","buffer",(617295198)).cljs$core$IFn$_invoke$arity$1((function (){var G__2319 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2319) : cljs.core.deref.call(null,G__2319));
})()),true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$__$1) : cljs.core.deref.call(null,this$__$1)),cljs.core.assoc,new cljs.core.Keyword(null,"buffer","buffer",(617295198)),cljs.core.PersistentVector.EMPTY);
} else {
return cljs.pprint.write_white_space(this$__$1);
}
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.getBasis = ((function (lb,fields){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null),new cljs.core.Symbol(null,"miser-width","miser-width",(330482090),null),new cljs.core.Symbol(null,"lb","lb",(950310490),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null),new cljs.core.Symbol(null,"meta2316","meta2316",(671863547),null)], null);
});})(lb,fields))
;

cljs.pprint.t_cljs$pprint2315.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint2315.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint2315";

cljs.pprint.t_cljs$pprint2315.cljs$lang$ctorPrWriter = ((function (lb,fields){
return (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint2315");
});})(lb,fields))
;

(function (){
cljs.pprint.__GT_t_cljs$pprint2315 = ((function (lb,fields){
return (function cljs$pprint$pretty_writer_$___GT_t_cljs$pprint2315(writer__$1,max_columns__$1,miser_width__$1,lb__$1,fields__$1,meta2316){
return (new cljs.pprint.t_cljs$pprint2315(writer__$1,max_columns__$1,miser_width__$1,lb__$1,fields__$1,meta2316));
});})(lb,fields))
; return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint2315;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint2315","cljs.pprint/->t_cljs$pprint2315",(568001484),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IDeref","cljs.core/IDeref",(1331648568),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null,new cljs.core.Symbol("cljs.pprint","IPrettyFlush","cljs.pprint/IPrettyFlush",(-1890322983),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint2315","->t_cljs$pprint2315",(690104853),null),"cljs/pprint.cljs",true,(5),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(509),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null),new cljs.core.Symbol(null,"miser-width","miser-width",(330482090),null),new cljs.core.Symbol(null,"lb","lb",(950310490),null),new cljs.core.Symbol(null,"fields","fields",(-291534703),null),new cljs.core.Symbol(null,"meta2316","meta2316",(671863547),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IDeref","cljs.core/IDeref",(1331648568),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint2315)?cljs.pprint.__GT_t_cljs$pprint2315.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint2315(writer,max_columns,miser_width,lb,fields,cljs.core.PersistentArrayMap.EMPTY));
}); return (
new cljs.core.Var(function(){return cljs.pprint.pretty_writer;},new cljs.core.Symbol("cljs.pprint","pretty-writer","cljs.pprint/pretty-writer",(295861173),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pretty-writer","pretty-writer",(417697260),null),"cljs/pprint.cljs",(21),(1),(494),(494),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"max-columns","max-columns",(-912112507),null),new cljs.core.Symbol(null,"miser-width","miser-width",(330482090),null)], null)),null,(cljs.core.truth_(cljs.pprint.pretty_writer)?cljs.pprint.pretty_writer.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.start_block = (function cljs$pprint$start_block(this$,prefix,per_line_prefix,suffix){
var lb = (new cljs.pprint.logical_block(new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)).cljs$core$IFn$_invoke$arity$1((function (){var G__2338 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2338) : cljs.core.deref.call(null,G__2338));
})()),null,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0))),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0))),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),prefix,per_line_prefix,suffix,null,null,null,null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)),lb);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2339 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2339) : cljs.core.deref.call(null,G__2339));
})()),new cljs.core.Keyword(null,"writing","writing",(-1486865108)))){
cljs.pprint.write_white_space(this$);

var temp__21890__auto___2349 = new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)).cljs$core$IFn$_invoke$arity$1((function (){var G__2345 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2345) : cljs.core.deref.call(null,G__2345));
})());
if(cljs.core.truth_(temp__21890__auto___2349)){
var cb_2350 = temp__21890__auto___2349;
var G__2346_2351 = new cljs.core.Keyword(null,"start","start",(-355208981));
(cb_2350.cljs$core$IFn$_invoke$arity$1 ? cb_2350.cljs$core$IFn$_invoke$arity$1(G__2346_2351) : cb_2350.call(null,G__2346_2351));
} else {
}

if(cljs.core.truth_(prefix)){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2347 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2347) : cljs.core.deref.call(null,G__2347));
})()),prefix);
} else {
}

var col = cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2340 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2340) : cljs.core.deref.call(null,G__2340));
})()));
var G__2341_2352 = new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2342_2353 = col;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2341_2352,G__2342_2353) : cljs.core.reset_BANG_.call(null,G__2341_2352,G__2342_2353));

var G__2343 = new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2344 = col;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2343,G__2344) : cljs.core.reset_BANG_.call(null,G__2343,G__2344));
} else {
var oldpos = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2348 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2348) : cljs.core.deref.call(null,G__2348));
})());
var newpos = (oldpos + (cljs.core.truth_(prefix)?cljs.core.count(prefix):(0)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",(-864607220)),newpos);

return cljs.pprint.add_to_buffer(this$,cljs.pprint.make_start_block_t(lb,oldpos,newpos));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.start_block;},new cljs.core.Symbol("cljs.pprint","start-block","cljs.pprint/start-block",(-270767114),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"start-block","start-block",(-1768455633),null),"cljs/pprint.cljs",(19),(1),(551),(551),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"prefix","prefix",(1374623062),null),new cljs.core.Symbol(null,"per-line-prefix","per-line-prefix",(-1807493956),null),new cljs.core.Symbol(null,"suffix","suffix",(2007904584),null)], null)),null,(cljs.core.truth_(cljs.pprint.start_block)?cljs.pprint.start_block.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.end_block = (function cljs$pprint$end_block(this$){
var lb = new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)).cljs$core$IFn$_invoke$arity$1((function (){var G__2360 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2360) : cljs.core.deref.call(null,G__2360));
})());
var suffix = new cljs.core.Keyword(null,"suffix","suffix",(367373057)).cljs$core$IFn$_invoke$arity$1(lb);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2361 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2361) : cljs.core.deref.call(null,G__2361));
})()),new cljs.core.Keyword(null,"writing","writing",(-1486865108)))){
cljs.pprint.write_white_space(this$);

if(cljs.core.truth_(suffix)){
cljs.core._write(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2364 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2364) : cljs.core.deref.call(null,G__2364));
})()),suffix);
} else {
}

var temp__21890__auto___2366 = new cljs.core.Keyword(null,"logical-block-callback","logical-block-callback",(1612691194)).cljs$core$IFn$_invoke$arity$1((function (){var G__2362 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2362) : cljs.core.deref.call(null,G__2362));
})());
if(cljs.core.truth_(temp__21890__auto___2366)){
var cb_2367 = temp__21890__auto___2366;
var G__2363_2368 = new cljs.core.Keyword(null,"end","end",(-268185958));
(cb_2367.cljs$core$IFn$_invoke$arity$1 ? cb_2367.cljs$core$IFn$_invoke$arity$1(G__2363_2368) : cb_2367.call(null,G__2363_2368));
} else {
}
} else {
var oldpos_2369 = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2365 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2365) : cljs.core.deref.call(null,G__2365));
})());
var newpos_2370 = (oldpos_2369 + (cljs.core.truth_(suffix)?cljs.core.count(suffix):(0)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",(-864607220)),newpos_2370);

cljs.pprint.add_to_buffer(this$,cljs.pprint.make_end_block_t(lb,oldpos_2369,newpos_2370));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)),new cljs.core.Keyword(null,"parent","parent",(-878878779)).cljs$core$IFn$_invoke$arity$1(lb));
}); return (
new cljs.core.Var(function(){return cljs.pprint.end_block;},new cljs.core.Symbol("cljs.pprint","end-block","cljs.pprint/end-block",(-397543401),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"end-block","end-block",(-210366898),null),"cljs/pprint.cljs",(17),(1),(571),(571),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.end_block)?cljs.pprint.end_block.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.nl = (function cljs$pprint$nl(this$,type){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$)),cljs.core.assoc,new cljs.core.Keyword(null,"mode","mode",(654403691)),new cljs.core.Keyword(null,"buffering","buffering",(-876713613)));

var pos = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2373 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2373) : cljs.core.deref.call(null,G__2373));
})());
return cljs.pprint.add_to_buffer(this$,cljs.pprint.make_nl_t(type,new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)).cljs$core$IFn$_invoke$arity$1((function (){var G__2374 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2374) : cljs.core.deref.call(null,G__2374));
})()),pos,pos));
}); return (
new cljs.core.Var(function(){return cljs.pprint.nl;},new cljs.core.Symbol("cljs.pprint","nl","cljs.pprint/nl",(2029860753),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"nl","nl",(1731484120),null),"cljs/pprint.cljs",(10),(1),(586),(586),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"type","type",(-1480165421),null)], null)),null,(cljs.core.truth_(cljs.pprint.nl)?cljs.pprint.nl.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.indent = (function cljs$pprint$indent(this$,relative_to,offset){
var lb = new cljs.core.Keyword(null,"logical-blocks","logical-blocks",(-1466339776)).cljs$core$IFn$_invoke$arity$1((function (){var G__2389 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2389) : cljs.core.deref.call(null,G__2389));
})());
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"mode","mode",(654403691)).cljs$core$IFn$_invoke$arity$1((function (){var G__2390 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2390) : cljs.core.deref.call(null,G__2390));
})()),new cljs.core.Keyword(null,"writing","writing",(-1486865108)))){
cljs.pprint.write_white_space(this$);

var G__2391 = new cljs.core.Keyword(null,"indent","indent",(-148200125)).cljs$core$IFn$_invoke$arity$1(lb);
var G__2392 = (offset + (function (){var pred__2393 = cljs.core._EQ_;
var expr__2394 = relative_to;
if(cljs.core.truth_((function (){var G__2396 = new cljs.core.Keyword(null,"block","block",(664686210));
var G__2397 = expr__2394;
return (pred__2393.cljs$core$IFn$_invoke$arity$2 ? pred__2393.cljs$core$IFn$_invoke$arity$2(G__2396,G__2397) : pred__2393.call(null,G__2396,G__2397));
})())){
var G__2398 = new cljs.core.Keyword(null,"start-col","start-col",(668080143)).cljs$core$IFn$_invoke$arity$1(lb);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2398) : cljs.core.deref.call(null,G__2398));
} else {
if(cljs.core.truth_((function (){var G__2399 = new cljs.core.Keyword(null,"current","current",(-1088038603));
var G__2400 = expr__2394;
return (pred__2393.cljs$core$IFn$_invoke$arity$2 ? pred__2393.cljs$core$IFn$_invoke$arity$2(G__2399,G__2400) : pred__2393.call(null,G__2399,G__2400));
})())){
return cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2401 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2401) : cljs.core.deref.call(null,G__2401));
})()));
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2394)].join('')));
}
}
})());
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2391,G__2392) : cljs.core.reset_BANG_.call(null,G__2391,G__2392));
} else {
var pos = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1((function (){var G__2402 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2402) : cljs.core.deref.call(null,G__2402));
})());
return cljs.pprint.add_to_buffer(this$,cljs.pprint.make_indent_t(lb,relative_to,offset,pos,pos));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.indent;},new cljs.core.Symbol("cljs.pprint","indent","cljs.pprint/indent",(1370108405),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"indent","indent",(1492331402),null),"cljs/pprint.cljs",(14),(1),(591),(591),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"relative-to","relative-to",(1170431476),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.indent)?cljs.pprint.indent.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_miser_width = (function cljs$pprint$get_miser_width(this$){
return new cljs.core.Keyword(null,"miser-width","miser-width",(-1310049437)).cljs$core$IFn$_invoke$arity$1((function (){var G__2404 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(this$) : cljs.core.deref.call(null,this$));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2404) : cljs.core.deref.call(null,G__2404));
})());
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_miser_width;},new cljs.core.Symbol("cljs.pprint","get-miser-width","cljs.pprint/get-miser-width",(-1380651307),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-miser-width","get-miser-width",(-1493187350),null),"cljs/pprint.cljs",(23),(1),(603),(603),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_miser_width)?cljs.pprint.get_miser_width.cljs$lang$test:null)])));})()
;
/**
 * Bind to true if you want write to use pretty printing
 */
(function (){
cljs.pprint._STAR_print_pretty_STAR_ = true; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_pretty_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-pretty*","cljs.pprint/*print-pretty*",(-762636861),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-pretty*","*print-pretty*",(726795140),null),"cljs/pprint.cljs",(16),(1),true,(615),(617),cljs.core.List.EMPTY,"Bind to true if you want write to use pretty printing",((cljs.pprint._STAR_print_pretty_STAR_)?cljs.pprint._STAR_print_pretty_STAR_.cljs$lang$test:null)])));})()
;
if(typeof cljs.pprint._STAR_print_pprint_dispatch_STAR_ !== 'undefined'){
} else {
/**
 * The pretty print dispatch function. Use with-pprint-dispatch or
 * set-pprint-dispatch to modify.
 */
(function (){
cljs.pprint._STAR_print_pprint_dispatch_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_pprint_dispatch_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-pprint-dispatch*","cljs.pprint/*print-pprint-dispatch*",(-1820734013),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-pprint-dispatch*","*print-pprint-dispatch*",(-1709114492),null),"cljs/pprint.cljs",(25),(1),true,(619),(623),cljs.core.List.EMPTY,"The pretty print dispatch function. Use with-pprint-dispatch or\nset-pprint-dispatch to modify.",(cljs.core.truth_(cljs.pprint._STAR_print_pprint_dispatch_STAR_)?cljs.pprint._STAR_print_pprint_dispatch_STAR_.cljs$lang$test:null)])));})()
;
}
/**
 * Pretty printing will try to avoid anything going beyond this column.
 * Set it to nil to have pprint let the line be arbitrarily long. This will ignore all
 * non-mandatory newlines.
 */
(function (){
cljs.pprint._STAR_print_right_margin_STAR_ = (72); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_right_margin_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-right-margin*","cljs.pprint/*print-right-margin*",(-56183119),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-right-margin*","*print-right-margin*",(-437272454),null),"cljs/pprint.cljs",(22),(1),true,(625),(630),cljs.core.List.EMPTY,"Pretty printing will try to avoid anything going beyond this column.\nSet it to nil to have pprint let the line be arbitrarily long. This will ignore all\nnon-mandatory newlines.",(cljs.core.truth_(cljs.pprint._STAR_print_right_margin_STAR_)?cljs.pprint._STAR_print_right_margin_STAR_.cljs$lang$test:null)])));})()
;
/**
 * The column at which to enter miser style. Depending on the dispatch table,
 * miser style add newlines in more places to try to keep lines short allowing for further
 * levels of nesting.
 */
(function (){
cljs.pprint._STAR_print_miser_width_STAR_ = (40); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_miser_width_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-miser-width*","cljs.pprint/*print-miser-width*",(1588913450),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-miser-width*","*print-miser-width*",(1206624211),null),"cljs/pprint.cljs",(21),(1),true,(632),(637),cljs.core.List.EMPTY,"The column at which to enter miser style. Depending on the dispatch table,\nmiser style add newlines in more places to try to keep lines short allowing for further\nlevels of nesting.",(cljs.core.truth_(cljs.pprint._STAR_print_miser_width_STAR_)?cljs.pprint._STAR_print_miser_width_STAR_.cljs$lang$test:null)])));})()
;
/**
 * Maximum number of lines to print in a pretty print instance (N.B. This is not yet used)
 */
(function (){
cljs.pprint._STAR_print_lines_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_lines_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-lines*","cljs.pprint/*print-lines*",(534683484),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-lines*","*print-lines*",(75920659),null),"cljs/pprint.cljs",(14),(1),true,(640),(643),cljs.core.List.EMPTY,"Maximum number of lines to print in a pretty print instance (N.B. This is not yet used)",(cljs.core.truth_(cljs.pprint._STAR_print_lines_STAR_)?cljs.pprint._STAR_print_lines_STAR_.cljs$lang$test:null)])));})()
;
/**
 * Mark circular structures (N.B. This is not yet used)
 */
(function (){
cljs.pprint._STAR_print_circle_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_circle_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-circle*","cljs.pprint/*print-circle*",(1606185849),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-circle*","*print-circle*",(1148404994),null),"cljs/pprint.cljs",(15),(1),true,(646),(649),cljs.core.List.EMPTY,"Mark circular structures (N.B. This is not yet used)",(cljs.core.truth_(cljs.pprint._STAR_print_circle_STAR_)?cljs.pprint._STAR_print_circle_STAR_.cljs$lang$test:null)])));})()
;
/**
 * Mark repeated structures rather than repeat them (N.B. This is not yet used)
 */
(function (){
cljs.pprint._STAR_print_shared_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_shared_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-shared*","cljs.pprint/*print-shared*",(1370943413),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-shared*","*print-shared*",(1493169738),null),"cljs/pprint.cljs",(15),(1),true,(652),(655),cljs.core.List.EMPTY,"Mark repeated structures rather than repeat them (N.B. This is not yet used)",(cljs.core.truth_(cljs.pprint._STAR_print_shared_STAR_)?cljs.pprint._STAR_print_shared_STAR_.cljs$lang$test:null)])));})()
;
/**
 * Don't print namespaces with symbols. This is particularly useful when
 * pretty printing the results of macro expansions
 */
(function (){
cljs.pprint._STAR_print_suppress_namespaces_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_suppress_namespaces_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-suppress-namespaces*","cljs.pprint/*print-suppress-namespaces*",(1649488204),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-suppress-namespaces*","*print-suppress-namespaces*",(1795828355),null),"cljs/pprint.cljs",(28),(1),true,(657),(661),cljs.core.List.EMPTY,"Don't print namespaces with symbols. This is particularly useful when\npretty printing the results of macro expansions",(cljs.core.truth_(cljs.pprint._STAR_print_suppress_namespaces_STAR_)?cljs.pprint._STAR_print_suppress_namespaces_STAR_.cljs$lang$test:null)])));})()
;
/**
 * Print a radix specifier in front of integers and rationals. If *print-base* is 2, 8,
 * or 16, then the radix specifier used is #b, #o, or #x, respectively. Otherwise the
 * radix specifier is in the form #XXr where XX is the decimal value of *print-base* 
 */
(function (){
cljs.pprint._STAR_print_radix_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_radix_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-radix*","cljs.pprint/*print-radix*",(1558253641),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-radix*","*print-radix*",(1168517744),null),"cljs/pprint.cljs",(14),(1),true,(665),(670),cljs.core.List.EMPTY,"Print a radix specifier in front of integers and rationals. If *print-base* is 2, 8,\nor 16, then the radix specifier used is #b, #o, or #x, respectively. Otherwise the\nradix specifier is in the form #XXr where XX is the decimal value of *print-base* ",(cljs.core.truth_(cljs.pprint._STAR_print_radix_STAR_)?cljs.pprint._STAR_print_radix_STAR_.cljs$lang$test:null)])));})()
;
/**
 * The base to use for printing integers and rationals.
 */
(function (){
cljs.pprint._STAR_print_base_STAR_ = (10); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_print_base_STAR_;},new cljs.core.Symbol("cljs.pprint","*print-base*","cljs.pprint/*print-base*",(1887526790),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*print-base*","*print-base*",(2037937791),null),"cljs/pprint.cljs",(13),(1),true,(672),(675),cljs.core.List.EMPTY,"The base to use for printing integers and rationals.",(cljs.core.truth_(cljs.pprint._STAR_print_base_STAR_)?cljs.pprint._STAR_print_base_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint._STAR_current_level_STAR_ = (0); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_current_level_STAR_;},new cljs.core.Symbol("cljs.pprint","*current-level*","cljs.pprint/*current-level*",(1299227592),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*current-level*","*current-level*",(1412941843),null),"cljs/pprint.cljs",(48),(1),true,(682),(682),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_current_level_STAR_)?cljs.pprint._STAR_current_level_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint._STAR_current_length_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_current_length_STAR_;},new cljs.core.Symbol("cljs.pprint","*current-length*","cljs.pprint/*current-length*",(-732560897),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*current-length*","*current-length*",(758115108),null),"cljs/pprint.cljs",(49),(1),true,(684),(684),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_current_length_STAR_)?cljs.pprint._STAR_current_length_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_simple_number; return (
new cljs.core.Var(function(){return cljs.pprint.format_simple_number;},new cljs.core.Symbol("cljs.pprint","format-simple-number","cljs.pprint/format-simple-number",(-1220074419),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-simple-number","format-simple-number",(-1203880300),null),"cljs/pprint.cljs",(30),(1),(690),true,(690),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.format_simple_number)?cljs.pprint.format_simple_number.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.table_ize = (function cljs$pprint$table_ize(t,m){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__116_SHARP_){
var temp__21890__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(t,cljs.core.key(p1__116_SHARP_));
if(cljs.core.truth_(temp__21890__auto__)){
var v = temp__21890__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,cljs.core.val(p1__116_SHARP_)], null);
} else {
return null;
}
}),cljs.core.array_seq([m], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.table_ize;},new cljs.core.Symbol("cljs.pprint","table-ize","cljs.pprint/table-ize",(-1870997338),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"table-ize","table-ize",(-1750981985),null),"cljs/pprint.cljs",(17),(1),(712),(712),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"t","t",(242699008),null),new cljs.core.Symbol(null,"m","m",(-1021758608),null)], null)),null,(cljs.core.truth_(cljs.pprint.table_ize)?cljs.pprint.table_ize.cljs$lang$test:null)])));})()
;
/**
 * Return true iff x is a PrettyWriter
 */
(function (){
cljs.pprint.pretty_writer_QMARK_ = (function cljs$pprint$pretty_writer_QMARK_(x){
var and__22563__auto__ = ((!((x == null)))?((((x.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IDeref$)))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,x));
if(and__22563__auto__){
return new cljs.core.Keyword(null,"pretty-writer","pretty-writer",(-1222834267)).cljs$core$IFn$_invoke$arity$1((function (){var G__2410 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(x) : cljs.core.deref.call(null,x));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2410) : cljs.core.deref.call(null,G__2410));
})());
} else {
return and__22563__auto__;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pretty_writer_QMARK_;},new cljs.core.Symbol("cljs.pprint","pretty-writer?","cljs.pprint/pretty-writer?",(-2126032890),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pretty-writer?","pretty-writer?",(-1970297089),null),"cljs/pprint.cljs",(22),(1),(717),(717),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),"Return true iff x is a PrettyWriter",(cljs.core.truth_(cljs.pprint.pretty_writer_QMARK_)?cljs.pprint.pretty_writer_QMARK_.cljs$lang$test:null)])));})()
;
/**
 * Wrap base-writer in a PrettyWriter with the specified right-margin and miser-width
 */
(function (){
cljs.pprint.make_pretty_writer = (function cljs$pprint$make_pretty_writer(base_writer,right_margin,miser_width){
return cljs.pprint.pretty_writer(base_writer,right_margin,miser_width);
}); return (
new cljs.core.Var(function(){return cljs.pprint.make_pretty_writer;},new cljs.core.Symbol("cljs.pprint","make-pretty-writer","cljs.pprint/make-pretty-writer",(90762412),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"make-pretty-writer","make-pretty-writer",(35899125),null),"cljs/pprint.cljs",(26),(1),(721),(721),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"base-writer","base-writer",(681607634),null),new cljs.core.Symbol(null,"right-margin","right-margin",(830118221),null),new cljs.core.Symbol(null,"miser-width","miser-width",(330482090),null)], null)),"Wrap base-writer in a PrettyWriter with the specified right-margin and miser-width",(cljs.core.truth_(cljs.pprint.make_pretty_writer)?cljs.pprint.make_pretty_writer.cljs$lang$test:null)])));})()
;
/**
 * Write an object to *out* subject to the current bindings of the printer control
 * variables. Use the kw-args argument to override individual variables for this call (and
 * any recursive calls).
 * 
 * *out* must be a PrettyWriter if pretty printing is enabled. This is the responsibility
 * of the caller.
 * 
 * This method is primarily intended for use by pretty print dispatch functions that
 * already know that the pretty printer will have set up their environment appropriately.
 * Normal library clients should use the standard "write" interface. 
 */
(function (){
cljs.pprint.write_out = (function cljs$pprint$write_out(object){
var length_reached = (function (){var and__22563__auto__ = cljs.pprint._STAR_current_length_STAR_;
if(cljs.core.truth_(and__22563__auto__)){
var and__22563__auto____$1 = cljs.core._STAR_print_length_STAR_;
if(cljs.core.truth_(and__22563__auto____$1)){
return (cljs.pprint._STAR_current_length_STAR_ >= cljs.core._STAR_print_length_STAR_);
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
})();
if(!(cljs.pprint._STAR_print_pretty_STAR_)){
(cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1(object) : cljs.pprint.pr.call(null,object));
} else {
if(cljs.core.truth_(length_reached)){
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
} else {
if(cljs.core.truth_(cljs.pprint._STAR_current_length_STAR_)){
cljs.pprint._STAR_current_length_STAR_ = (cljs.pprint._STAR_current_length_STAR_ + (1));
} else {
}

(cljs.pprint._STAR_print_pprint_dispatch_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint._STAR_print_pprint_dispatch_STAR_.cljs$core$IFn$_invoke$arity$1(object) : cljs.pprint._STAR_print_pprint_dispatch_STAR_.call(null,object));
}
}

return length_reached;
}); return (
new cljs.core.Var(function(){return cljs.pprint.write_out;},new cljs.core.Symbol("cljs.pprint","write-out","cljs.pprint/write-out",(-338269326),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write-out","write-out",(-258400837),null),"cljs/pprint.cljs",(16),(1),(726),(726),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null)),"Write an object to *out* subject to the current bindings of the printer control\nvariables. Use the kw-args argument to override individual variables for this call (and\nany recursive calls).\n\n*out* must be a PrettyWriter if pretty printing is enabled. This is the responsibility\nof the caller.\n\nThis method is primarily intended for use by pretty print dispatch functions that\nalready know that the pretty printer will have set up their environment appropriately.\nNormal library clients should use the standard \"write\" interface. ",(cljs.core.truth_(cljs.pprint.write_out)?cljs.pprint.write_out.cljs$lang$test:null)])));})()
;
/**
 * Write an object subject to the current bindings of the printer control variables.
 * Use the kw-args argument to override individual variables for this call (and any
 * recursive calls). Returns the string result if :stream is nil or nil otherwise.
 * 
 * The following keyword arguments can be passed with values:
 *   Keyword              Meaning                              Default value
 *   :stream              Writer for output or nil             true (indicates *out*)
 *   :base                Base to use for writing rationals    Current value of *print-base*
 *   :circle*             If true, mark circular structures    Current value of *print-circle*
 *   :length              Maximum elements to show in sublists Current value of *print-length*
 *   :level               Maximum depth                        Current value of *print-level*
 *   :lines*              Maximum lines of output              Current value of *print-lines*
 *   :miser-width         Width to enter miser mode            Current value of *print-miser-width*
 *   :dispatch            The pretty print dispatch function   Current value of *print-pprint-dispatch*
 *   :pretty              If true, do pretty printing          Current value of *print-pretty*
 *   :radix               If true, prepend a radix specifier   Current value of *print-radix*
 *   :readably*           If true, print readably              Current value of *print-readably*
 *   :right-margin        The column for the right margin      Current value of *print-right-margin*
 *   :suppress-namespaces If true, no namespaces in symbols    Current value of *print-suppress-namespaces*
 * 
 *   * = not yet supported
 */
(function (){
cljs.pprint.write = (function cljs$pprint$write(var_args){
var args__26430__auto__ = [];
var len__26427__auto___2427 = arguments.length;
var i__26428__auto___2428 = (0);
while(true){
if((i__26428__auto___2428 < len__26427__auto___2427)){
args__26430__auto__.push((arguments[i__26428__auto___2428]));

var G__2429 = (i__26428__auto___2428 + (1));
i__26428__auto___2428 = G__2429;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((1) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((1)),(0),null)):null);
return cljs.pprint.write.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.write;},new cljs.core.Symbol("cljs.pprint","write","cljs.pprint/write",(-196844020),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write","write",(-217117641),null),"cljs/pprint.cljs",(12),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(1),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(750),(750),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null)], null)),"Write an object subject to the current bindings of the printer control variables.\nUse the kw-args argument to override individual variables for this call (and any\nrecursive calls). Returns the string result if :stream is nil or nil otherwise.\n\nThe following keyword arguments can be passed with values:\n  Keyword              Meaning                              Default value\n  :stream              Writer for output or nil             true (indicates *out*)\n  :base                Base to use for writing rationals    Current value of *print-base*\n  :circle*             If true, mark circular structures    Current value of *print-circle*\n  :length              Maximum elements to show in sublists Current value of *print-length*\n  :level               Maximum depth                        Current value of *print-level*\n  :lines*              Maximum lines of output              Current value of *print-lines*\n  :miser-width         Width to enter miser mode            Current value of *print-miser-width*\n  :dispatch            The pretty print dispatch function   Current value of *print-pprint-dispatch*\n  :pretty              If true, do pretty printing          Current value of *print-pretty*\n  :radix               If true, prepend a radix specifier   Current value of *print-radix*\n  :readably*           If true, print readably              Current value of *print-readably*\n  :right-margin        The column for the right margin      Current value of *print-right-margin*\n  :suppress-namespaces If true, no namespaces in symbols    Current value of *print-suppress-namespaces*\n\n  * = not yet supported\n",(cljs.core.truth_(cljs.pprint.write)?cljs.pprint.write.cljs$lang$test:null)])));})()
;

cljs.pprint.write.cljs$core$IFn$_invoke$arity$variadic = (function (object,kw_args){
var options = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stream","stream",(1534941648)),true], null),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,kw_args)], 0));
var _STAR_print_base_STAR_2413 = cljs.pprint._STAR_print_base_STAR_;
var _STAR_print_circle_STAR_2414 = cljs.pprint._STAR_print_circle_STAR_;
var _STAR_print_length_STAR_2415 = cljs.core._STAR_print_length_STAR_;
var _STAR_print_level_STAR_2416 = cljs.core._STAR_print_level_STAR_;
var _STAR_print_lines_STAR_2417 = cljs.pprint._STAR_print_lines_STAR_;
var _STAR_print_miser_width_STAR_2418 = cljs.pprint._STAR_print_miser_width_STAR_;
var _STAR_print_pprint_dispatch_STAR_2419 = cljs.pprint._STAR_print_pprint_dispatch_STAR_;
var _STAR_print_pretty_STAR_2420 = cljs.pprint._STAR_print_pretty_STAR_;
var _STAR_print_radix_STAR_2421 = cljs.pprint._STAR_print_radix_STAR_;
var _STAR_print_readably_STAR_2422 = cljs.core._STAR_print_readably_STAR_;
var _STAR_print_right_margin_STAR_2423 = cljs.pprint._STAR_print_right_margin_STAR_;
var _STAR_print_suppress_namespaces_STAR_2424 = cljs.pprint._STAR_print_suppress_namespaces_STAR_;
cljs.pprint._STAR_print_base_STAR_ = new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_base_STAR_);

cljs.pprint._STAR_print_circle_STAR_ = new cljs.core.Keyword(null,"circle","circle",(1903212362)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_circle_STAR_);

cljs.core._STAR_print_length_STAR_ = new cljs.core.Keyword(null,"length","length",(588987862)).cljs$core$IFn$_invoke$arity$2(options,cljs.core._STAR_print_length_STAR_);

cljs.core._STAR_print_level_STAR_ = new cljs.core.Keyword(null,"level","level",(1290497552)).cljs$core$IFn$_invoke$arity$2(options,cljs.core._STAR_print_level_STAR_);

cljs.pprint._STAR_print_lines_STAR_ = new cljs.core.Keyword(null,"lines","lines",(-700165781)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_lines_STAR_);

cljs.pprint._STAR_print_miser_width_STAR_ = new cljs.core.Keyword(null,"miser-width","miser-width",(-1310049437)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_miser_width_STAR_);

cljs.pprint._STAR_print_pprint_dispatch_STAR_ = new cljs.core.Keyword(null,"dispatch","dispatch",(1319337009)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_pprint_dispatch_STAR_);

cljs.pprint._STAR_print_pretty_STAR_ = new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_pretty_STAR_);

cljs.pprint._STAR_print_radix_STAR_ = new cljs.core.Keyword(null,"radix","radix",(857016463)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_radix_STAR_);

cljs.core._STAR_print_readably_STAR_ = new cljs.core.Keyword(null,"readably","readably",(1129599760)).cljs$core$IFn$_invoke$arity$2(options,cljs.core._STAR_print_readably_STAR_);

cljs.pprint._STAR_print_right_margin_STAR_ = new cljs.core.Keyword(null,"right-margin","right-margin",(-810413306)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_right_margin_STAR_);

cljs.pprint._STAR_print_suppress_namespaces_STAR_ = new cljs.core.Keyword(null,"suppress-namespaces","suppress-namespaces",(2130686956)).cljs$core$IFn$_invoke$arity$2(options,cljs.pprint._STAR_print_suppress_namespaces_STAR_);

try{try{var sb = (new goog.string.StringBuffer());
var optval = ((cljs.core.contains_QMARK_(options,new cljs.core.Keyword(null,"stream","stream",(1534941648))))?new cljs.core.Keyword(null,"stream","stream",(1534941648)).cljs$core$IFn$_invoke$arity$1(options):true);
var base_writer = (((optval === true) || ((optval == null)))?(new cljs.core.StringBufferWriter(sb)):optval);
if(cljs.pprint._STAR_print_pretty_STAR_){
var base_writer__95__auto___2430 = base_writer;
var new_writer__96__auto___2431 = cljs.core.not(cljs.pprint.pretty_writer_QMARK_(base_writer__95__auto___2430));
var _STAR_out_STAR_2425_2432 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = ((new_writer__96__auto___2431)?cljs.pprint.make_pretty_writer(base_writer__95__auto___2430,cljs.pprint._STAR_print_right_margin_STAR_,cljs.pprint._STAR_print_miser_width_STAR_):base_writer__95__auto___2430);

try{cljs.pprint.write_out(object);

cljs.pprint._ppflush(cljs.core._STAR_out_STAR_);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2425_2432;
}} else {
var _STAR_out_STAR_2426_2433 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = base_writer;

try{(cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1(object) : cljs.pprint.pr.call(null,object));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2426_2433;
}}

if(optval === true){
(cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')) : cljs.core._STAR_print_fn_STAR_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')));
} else {
}

if((optval == null)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('');
} else {
return null;
}
}finally {}}finally {cljs.pprint._STAR_print_suppress_namespaces_STAR_ = _STAR_print_suppress_namespaces_STAR_2424;

cljs.pprint._STAR_print_right_margin_STAR_ = _STAR_print_right_margin_STAR_2423;

cljs.core._STAR_print_readably_STAR_ = _STAR_print_readably_STAR_2422;

cljs.pprint._STAR_print_radix_STAR_ = _STAR_print_radix_STAR_2421;

cljs.pprint._STAR_print_pretty_STAR_ = _STAR_print_pretty_STAR_2420;

cljs.pprint._STAR_print_pprint_dispatch_STAR_ = _STAR_print_pprint_dispatch_STAR_2419;

cljs.pprint._STAR_print_miser_width_STAR_ = _STAR_print_miser_width_STAR_2418;

cljs.pprint._STAR_print_lines_STAR_ = _STAR_print_lines_STAR_2417;

cljs.core._STAR_print_level_STAR_ = _STAR_print_level_STAR_2416;

cljs.core._STAR_print_length_STAR_ = _STAR_print_length_STAR_2415;

cljs.pprint._STAR_print_circle_STAR_ = _STAR_print_circle_STAR_2414;

cljs.pprint._STAR_print_base_STAR_ = _STAR_print_base_STAR_2413;
}});

cljs.pprint.write.cljs$lang$maxFixedArity = (1);

cljs.pprint.write.cljs$lang$applyTo = (function (seq2411){
var G__2412 = cljs.core.first(seq2411);
var seq2411__$1 = cljs.core.next(seq2411);
return cljs.pprint.write.cljs$core$IFn$_invoke$arity$variadic(G__2412,seq2411__$1);
});

new cljs.core.Var(function(){return cljs.pprint.write;},new cljs.core.Symbol("cljs.pprint","write","cljs.pprint/write",(-196844020),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"write","write",(-217117641),null),"cljs/pprint.cljs",(12),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(1),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(750),(750),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kw-args","kw-args",(-950901690),null)], null)),"Write an object subject to the current bindings of the printer control variables.\nUse the kw-args argument to override individual variables for this call (and any\nrecursive calls). Returns the string result if :stream is nil or nil otherwise.\n\nThe following keyword arguments can be passed with values:\n  Keyword              Meaning                              Default value\n  :stream              Writer for output or nil             true (indicates *out*)\n  :base                Base to use for writing rationals    Current value of *print-base*\n  :circle*             If true, mark circular structures    Current value of *print-circle*\n  :length              Maximum elements to show in sublists Current value of *print-length*\n  :level               Maximum depth                        Current value of *print-level*\n  :lines*              Maximum lines of output              Current value of *print-lines*\n  :miser-width         Width to enter miser mode            Current value of *print-miser-width*\n  :dispatch            The pretty print dispatch function   Current value of *print-pprint-dispatch*\n  :pretty              If true, do pretty printing          Current value of *print-pretty*\n  :radix               If true, prepend a radix specifier   Current value of *print-radix*\n  :readably*           If true, print readably              Current value of *print-readably*\n  :right-margin        The column for the right margin      Current value of *print-right-margin*\n  :suppress-namespaces If true, no namespaces in symbols    Current value of *print-suppress-namespaces*\n\n  * = not yet supported\n",(cljs.core.truth_(cljs.pprint.write)?cljs.pprint.write.cljs$lang$test:null)]));
(function (){
cljs.pprint.pprint = (function cljs$pprint$pprint(var_args){
var args2434 = [];
var len__26427__auto___2440 = arguments.length;
var i__26428__auto___2441 = (0);
while(true){
if((i__26428__auto___2441 < len__26427__auto___2440)){
args2434.push((arguments[i__26428__auto___2441]));

var G__2442 = (i__26428__auto___2441 + (1));
i__26428__auto___2441 = G__2442;
continue;
} else {
}
break;
}

var G__2436 = args2434.length;
switch (G__2436) {
case (1):
return cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args2434.length)].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint;},new cljs.core.Symbol("cljs.pprint","pprint","cljs.pprint/pprint",(-1547147237),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint","pprint",(-1434237374),null),"cljs/pprint.cljs",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(813),(813),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint)?cljs.pprint.pprint.cljs$lang$test:null)])));})()
;

cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1 = (function (object){
var sb = (new goog.string.StringBuffer());
var _STAR_out_STAR_2437 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = (new cljs.core.StringBufferWriter(sb));

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$2(object,cljs.core._STAR_out_STAR_);

return (cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')) : cljs.core._STAR_print_fn_STAR_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2437;
}});

cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$2 = (function (object,writer){
var base_writer__95__auto__ = writer;
var new_writer__96__auto__ = cljs.core.not(cljs.pprint.pretty_writer_QMARK_(base_writer__95__auto__));
var _STAR_out_STAR_2438 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = ((new_writer__96__auto__)?cljs.pprint.make_pretty_writer(base_writer__95__auto__,cljs.pprint._STAR_print_right_margin_STAR_,cljs.pprint._STAR_print_miser_width_STAR_):base_writer__95__auto__);

try{var _STAR_print_pretty_STAR_2439_2444 = cljs.pprint._STAR_print_pretty_STAR_;
cljs.pprint._STAR_print_pretty_STAR_ = true;

try{cljs.pprint.write_out(object);
}finally {cljs.pprint._STAR_print_pretty_STAR_ = _STAR_print_pretty_STAR_2439_2444;
}
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.pprint.get_column(cljs.core._STAR_out_STAR_)))){
cljs.core._write(cljs.core._STAR_out_STAR_,"\n");
} else {
}

return cljs.pprint._ppflush(cljs.core._STAR_out_STAR_);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2438;
}});

cljs.pprint.pprint.cljs$lang$maxFixedArity = (2);

new cljs.core.Var(function(){return cljs.pprint.pprint;},new cljs.core.Symbol("cljs.pprint","pprint","cljs.pprint/pprint",(-1547147237),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint","pprint",(-1434237374),null),"cljs/pprint.cljs",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(813),(813),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"object","object",(-1179821820),null),new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint)?cljs.pprint.pprint.cljs$lang$test:null)]));
(function (){
cljs.pprint.set_pprint_dispatch = (function cljs$pprint$set_pprint_dispatch(function$){
cljs.pprint._STAR_print_pprint_dispatch_STAR_ = function$;

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.set_pprint_dispatch;},new cljs.core.Symbol("cljs.pprint","set-pprint-dispatch","cljs.pprint/set-pprint-dispatch",(-1197698588),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"set-pprint-dispatch","set-pprint-dispatch",(-1547335761),null),"cljs/pprint.cljs",(26),(1),(826),(826),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"function","function",(-486723946),null)], null)),null,(cljs.core.truth_(cljs.pprint.set_pprint_dispatch)?cljs.pprint.set_pprint_dispatch.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.check_enumerated_arg = (function cljs$pprint$check_enumerated_arg(arg,choices){
if(cljs.core.not((choices.cljs$core$IFn$_invoke$arity$1 ? choices.cljs$core$IFn$_invoke$arity$1(arg) : choices.call(null,arg)))){
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Bad argument: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(arg),cljs.core.str.cljs$core$IFn$_invoke$arity$1(". It must be one of "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(choices)].join('')));
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.check_enumerated_arg;},new cljs.core.Symbol("cljs.pprint","check-enumerated-arg","cljs.pprint/check-enumerated-arg",(-1494237719),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"check-enumerated-arg","check-enumerated-arg",(-1457220064),null),"cljs/pprint.cljs",(28),(1),(835),(835),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"arg","arg",(-106730310),null),new cljs.core.Symbol(null,"choices","choices",(-1268824172),null)], null)),null,(cljs.core.truth_(cljs.pprint.check_enumerated_arg)?cljs.pprint.check_enumerated_arg.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.level_exceeded = (function cljs$pprint$level_exceeded(){
var and__22563__auto__ = cljs.core._STAR_print_level_STAR_;
if(cljs.core.truth_(and__22563__auto__)){
return (cljs.pprint._STAR_current_level_STAR_ >= cljs.core._STAR_print_level_STAR_);
} else {
return and__22563__auto__;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.level_exceeded;},new cljs.core.Symbol("cljs.pprint","level-exceeded","cljs.pprint/level-exceeded",(-1557018470),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"level-exceeded","level-exceeded",(-636837181),null),"cljs/pprint.cljs",(22),(1),(840),(840),cljs.core.list(cljs.core.PersistentVector.EMPTY),null,(cljs.core.truth_(cljs.pprint.level_exceeded)?cljs.pprint.level_exceeded.cljs$lang$test:null)])));})()
;
/**
 * Print a conditional newline to a pretty printing stream. kind specifies if the
 *   newline is :linear, :miser, :fill, or :mandatory.
 * 
 *   This function is intended for use when writing custom dispatch functions.
 * 
 *   Output is sent to *out* which must be a pretty printing writer.
 */
(function (){
cljs.pprint.pprint_newline = (function cljs$pprint$pprint_newline(kind){
cljs.pprint.check_enumerated_arg(kind,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"linear","linear",(872268697)),null,new cljs.core.Keyword(null,"miser","miser",(-556060186)),null,new cljs.core.Keyword(null,"fill","fill",(883462889)),null,new cljs.core.Keyword(null,"mandatory","mandatory",(542802336)),null], null), null));

return cljs.pprint.nl(cljs.core._STAR_out_STAR_,kind);
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_newline;},new cljs.core.Symbol("cljs.pprint","pprint-newline","cljs.pprint/pprint-newline",(-896290881),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-newline","pprint-newline",(-841697210),null),"cljs/pprint.cljs",(21),(1),(843),(843),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"kind","kind",(923265724),null)], null)),"Print a conditional newline to a pretty printing stream. kind specifies if the\n  newline is :linear, :miser, :fill, or :mandatory.\n\n  This function is intended for use when writing custom dispatch functions.\n\n  Output is sent to *out* which must be a pretty printing writer.",(cljs.core.truth_(cljs.pprint.pprint_newline)?cljs.pprint.pprint_newline.cljs$lang$test:null)])));})()
;
/**
 * Create an indent at this point in the pretty printing stream. This defines how
 * following lines are indented. relative-to can be either :block or :current depending
 * whether the indent should be computed relative to the start of the logical block or
 * the current column position. n is an offset.
 * 
 * This function is intended for use when writing custom dispatch functions.
 * 
 * Output is sent to *out* which must be a pretty printing writer.
 */
(function (){
cljs.pprint.pprint_indent = (function cljs$pprint$pprint_indent(relative_to,n){
cljs.pprint.check_enumerated_arg(relative_to,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"block","block",(664686210)),null,new cljs.core.Keyword(null,"current","current",(-1088038603)),null], null), null));

return cljs.pprint.indent(cljs.core._STAR_out_STAR_,relative_to,n);
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_indent;},new cljs.core.Symbol("cljs.pprint","pprint-indent","cljs.pprint/pprint-indent",(-1628472151),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-indent","pprint-indent",(-2062129840),null),"cljs/pprint.cljs",(20),(1),(854),(854),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"relative-to","relative-to",(1170431476),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null)),"Create an indent at this point in the pretty printing stream. This defines how\nfollowing lines are indented. relative-to can be either :block or :current depending\nwhether the indent should be computed relative to the start of the logical block or\nthe current column position. n is an offset.\n\nThis function is intended for use when writing custom dispatch functions.\n\nOutput is sent to *out* which must be a pretty printing writer.",(cljs.core.truth_(cljs.pprint.pprint_indent)?cljs.pprint.pprint_indent.cljs$lang$test:null)])));})()
;
/**
 * Tab at this point in the pretty printing stream. kind specifies whether the tab
 * is :line, :section, :line-relative, or :section-relative.
 * 
 * Colnum and colinc specify the target column and the increment to move the target
 * forward if the output is already past the original target.
 * 
 * This function is intended for use when writing custom dispatch functions.
 * 
 * Output is sent to *out* which must be a pretty printing writer.
 * 
 * THIS FUNCTION IS NOT YET IMPLEMENTED.
 */
(function (){
cljs.pprint.pprint_tab = (function cljs$pprint$pprint_tab(kind,colnum,colinc){
cljs.pprint.check_enumerated_arg(kind,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",(212345235)),null,new cljs.core.Keyword(null,"section","section",(-300141526)),null,new cljs.core.Keyword(null,"line-relative","line-relative",(1149548219)),null,new cljs.core.Keyword(null,"section-relative","section-relative",(-658298724)),null], null), null));

throw (new Error("pprint-tab is not yet implemented"));
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_tab;},new cljs.core.Symbol("cljs.pprint","pprint-tab","cljs.pprint/pprint-tab",(-481059340),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-tab","pprint-tab",(-66407379),null),"cljs/pprint.cljs",(17),(1),(868),(868),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"colnum","colnum",(-630638915),null),new cljs.core.Symbol(null,"colinc","colinc",(1055658142),null)], null)),"Tab at this point in the pretty printing stream. kind specifies whether the tab\nis :line, :section, :line-relative, or :section-relative.\n\nColnum and colinc specify the target column and the increment to move the target\nforward if the output is already past the original target.\n\nThis function is intended for use when writing custom dispatch functions.\n\nOutput is sent to *out* which must be a pretty printing writer.\n\nTHIS FUNCTION IS NOT YET IMPLEMENTED.",(cljs.core.truth_(cljs.pprint.pprint_tab)?cljs.pprint.pprint_tab.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.compile_format; return (
new cljs.core.Var(function(){return cljs.pprint.compile_format;},new cljs.core.Symbol("cljs.pprint","compile-format","cljs.pprint/compile-format",(-1633629368),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"compile-format","compile-format",(-1771593359),null),"cljs/pprint.cljs",(24),(1),(890),true,(890),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.compile_format)?cljs.pprint.compile_format.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.execute_format; return (
new cljs.core.Var(function(){return cljs.pprint.execute_format;},new cljs.core.Symbol("cljs.pprint","execute-format","cljs.pprint/execute-format",(1971623147),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"execute-format","execute-format",(223314476),null),"cljs/pprint.cljs",(24),(1),(891),true,(891),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.execute_format)?cljs.pprint.execute_format.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.init_navigator; return (
new cljs.core.Var(function(){return cljs.pprint.init_navigator;},new cljs.core.Symbol("cljs.pprint","init-navigator","cljs.pprint/init-navigator",(1904204595),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"init-navigator","init-navigator",(2055521738),null),"cljs/pprint.cljs",(24),(1),(892),true,(892),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.init_navigator)?cljs.pprint.init_navigator.cljs$lang$test:null)])));})()
;
/**
 * An implementation of a Common Lisp compatible format function. cl-format formats its
 * arguments to an output stream or string based on the format control string given. It
 * supports sophisticated formatting of structured data.
 * 
 * Writer satisfies IWriter, true to output via *print-fn* or nil to output
 * to a string, format-in is the format control string and the remaining arguments
 * are the data to be formatted.
 * 
 * The format control string is a string to be output with embedded 'format directives'
 * describing how to format the various arguments passed in.
 * 
 * If writer is nil, cl-format returns the formatted result string. Otherwise, cl-format
 * returns nil.
 * 
 * For example:
 *  (let [results [46 38 22]]
 *      (cl-format true "There ~[are~;is~:;are~]~:* ~d result~:p: ~{~d~^, ~}~%"
 *                 (count results) results))
 * 
 * Prints via *print-fn*:
 *  There are 3 results: 46, 38, 22
 * 
 * Detailed documentation on format control strings is available in the "Common Lisp the
 * Language, 2nd edition", Chapter 22 (available online at:
 * http://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/html/cltl/clm/node200.html#SECTION002633000000000000000)
 * and in the Common Lisp HyperSpec at
 * http://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm
 */
(function (){
cljs.pprint.cl_format = (function cljs$pprint$cl_format(var_args){
var args__26430__auto__ = [];
var len__26427__auto___2448 = arguments.length;
var i__26428__auto___2449 = (0);
while(true){
if((i__26428__auto___2449 < len__26427__auto___2448)){
args__26430__auto__.push((arguments[i__26428__auto___2449]));

var G__2450 = (i__26428__auto___2449 + (1));
i__26428__auto___2449 = G__2450;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((2) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((2)),(0),null)):null);
return cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return cljs.pprint.cl_format;},new cljs.core.Symbol("cljs.pprint","cl-format","cljs.pprint/cl-format",(-1100272469),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"see-also","see-also",(330781627)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"cl-format","cl-format",(-1229847214),null),"cljs/pprint.cljs",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(895),(895),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["http://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/html/cltl/clm/node200.html#SECTION002633000000000000000","Common Lisp the Language"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["http://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm","Common Lisp HyperSpec"], null)], null),"An implementation of a Common Lisp compatible format function. cl-format formats its\narguments to an output stream or string based on the format control string given. It\nsupports sophisticated formatting of structured data.\n\nWriter satisfies IWriter, true to output via *print-fn* or nil to output\nto a string, format-in is the format control string and the remaining arguments\nare the data to be formatted.\n\nThe format control string is a string to be output with embedded 'format directives'\ndescribing how to format the various arguments passed in.\n\nIf writer is nil, cl-format returns the formatted result string. Otherwise, cl-format\nreturns nil.\n\nFor example:\n (let [results [46 38 22]]\n        (cl-format true \"There ~[are~;is~:;are~]~:* ~d result~:p: ~{~d~^, ~}~%\"\n                   (count results) results))\n\nPrints via *print-fn*:\n There are 3 results: 46, 38, 22\n\nDetailed documentation on format control strings is available in the \"Common Lisp the\nLanguage, 2nd edition\", Chapter 22 (available online at:\nhttp://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/html/cltl/clm/node200.html#SECTION002633000000000000000)\nand in the Common Lisp HyperSpec at\nhttp://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm",(cljs.core.truth_(cljs.pprint.cl_format)?cljs.pprint.cl_format.cljs$lang$test:null)])));})()
;

cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic = (function (writer,format_in,args){
var compiled_format = ((typeof format_in === 'string')?(cljs.pprint.compile_format.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.compile_format.cljs$core$IFn$_invoke$arity$1(format_in) : cljs.pprint.compile_format.call(null,format_in)):format_in);
var navigator = (cljs.pprint.init_navigator.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.init_navigator.cljs$core$IFn$_invoke$arity$1(args) : cljs.pprint.init_navigator.call(null,args));
return (cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$3 ? cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$3(writer,compiled_format,navigator) : cljs.pprint.execute_format.call(null,writer,compiled_format,navigator));
});

cljs.pprint.cl_format.cljs$lang$maxFixedArity = (2);

cljs.pprint.cl_format.cljs$lang$applyTo = (function (seq2445){
var G__2446 = cljs.core.first(seq2445);
var seq2445__$1 = cljs.core.next(seq2445);
var G__2447 = cljs.core.first(seq2445__$1);
var seq2445__$2 = cljs.core.next(seq2445__$1);
return cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic(G__2446,G__2447,seq2445__$2);
});

new cljs.core.Var(function(){return cljs.pprint.cl_format;},new cljs.core.Symbol("cljs.pprint","cl-format","cljs.pprint/cl-format",(-1100272469),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"see-also","see-also",(330781627)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"cl-format","cl-format",(-1229847214),null),"cljs/pprint.cljs",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(895),(895),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"format-in","format-in",(-833774677),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["http://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/html/cltl/clm/node200.html#SECTION002633000000000000000","Common Lisp the Language"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["http://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm","Common Lisp HyperSpec"], null)], null),"An implementation of a Common Lisp compatible format function. cl-format formats its\narguments to an output stream or string based on the format control string given. It\nsupports sophisticated formatting of structured data.\n\nWriter satisfies IWriter, true to output via *print-fn* or nil to output\nto a string, format-in is the format control string and the remaining arguments\nare the data to be formatted.\n\nThe format control string is a string to be output with embedded 'format directives'\ndescribing how to format the various arguments passed in.\n\nIf writer is nil, cl-format returns the formatted result string. Otherwise, cl-format\nreturns nil.\n\nFor example:\n (let [results [46 38 22]]\n        (cl-format true \"There ~[are~;is~:;are~]~:* ~d result~:p: ~{~d~^, ~}~%\"\n                   (count results) results))\n\nPrints via *print-fn*:\n There are 3 results: 46, 38, 22\n\nDetailed documentation on format control strings is available in the \"Common Lisp the\nLanguage, 2nd edition\", Chapter 22 (available online at:\nhttp://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/html/cltl/clm/node200.html#SECTION002633000000000000000)\nand in the Common Lisp HyperSpec at\nhttp://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm",(cljs.core.truth_(cljs.pprint.cl_format)?cljs.pprint.cl_format.cljs$lang$test:null)]));
(function (){
cljs.pprint._STAR_format_str_STAR_ = null; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_format_str_STAR_;},new cljs.core.Symbol("cljs.pprint","*format-str*","cljs.pprint/*format-str*",(1651450729),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*format-str*","*format-str*",(447007410),null),"cljs/pprint.cljs",(45),(1),true,(932),(932),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_format_str_STAR_)?cljs.pprint._STAR_format_str_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_error = (function cljs$pprint$format_error(message,offset){
var full_message = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(message),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.pprint._STAR_format_str_STAR_),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(offset," "))),cljs.core.str.cljs$core$IFn$_invoke$arity$1("^"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n")].join('');
throw Error(full_message);
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_error;},new cljs.core.Symbol("cljs.pprint","format-error","cljs.pprint/format-error",(593703147),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-error","format-error",(1512725040),null),"cljs/pprint.cljs",(20),(1),(934),(934),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",(1234475525),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_error)?cljs.pprint.format_error.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.arg_navigator = (function (seq,rest,pos,__meta,__extmap,__hash){
this.seq = seq;
this.rest = rest;
this.pos = pos;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.arg_navigator.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.arg_navigator.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k2452,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__2454 = k2452;
var G__2454__$1 = (((G__2454 instanceof cljs.core.Keyword))?G__2454.fqn:null);
switch (G__2454__$1) {
case "seq":
return self__.seq;

break;
case "rest":
return self__.rest;

break;
case "pos":
return self__.pos;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k2452,else__24369__auto__);

}
});

cljs.pprint.arg_navigator.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.arg-navigator{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"seq","seq",(-1817803783)),self__.seq],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"rest","rest",(-1241696419)),self__.rest],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"pos","pos",(-864607220)),self__.pos],null))], null),self__.__extmap));
});

cljs.pprint.arg_navigator.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.arg_navigator.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2451){
var self__ = this;
var G__2451__$1 = this;
return (new cljs.core.RecordIter((0),G__2451__$1,(3),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seq","seq",(-1817803783)),new cljs.core.Keyword(null,"rest","rest",(-1241696419)),new cljs.core.Keyword(null,"pos","pos",(-864607220))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.arg_navigator.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.arg_navigator.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.arg_navigator(self__.seq,self__.rest,self__.pos,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.arg_navigator.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((3) + cljs.core.count(self__.__extmap));
});

cljs.pprint.arg_navigator.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.arg_navigator.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.arg_navigator.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"seq","seq",(-1817803783)),null,new cljs.core.Keyword(null,"rest","rest",(-1241696419)),null,new cljs.core.Keyword(null,"pos","pos",(-864607220)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.arg_navigator(self__.seq,self__.rest,self__.pos,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.arg_navigator.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__2451){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2455 = cljs.core.keyword_identical_QMARK_;
var expr__2456 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2458 = new cljs.core.Keyword(null,"seq","seq",(-1817803783));
var G__2459 = expr__2456;
return (pred__2455.cljs$core$IFn$_invoke$arity$2 ? pred__2455.cljs$core$IFn$_invoke$arity$2(G__2458,G__2459) : pred__2455.call(null,G__2458,G__2459));
})())){
return (new cljs.pprint.arg_navigator(G__2451,self__.rest,self__.pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2460 = new cljs.core.Keyword(null,"rest","rest",(-1241696419));
var G__2461 = expr__2456;
return (pred__2455.cljs$core$IFn$_invoke$arity$2 ? pred__2455.cljs$core$IFn$_invoke$arity$2(G__2460,G__2461) : pred__2455.call(null,G__2460,G__2461));
})())){
return (new cljs.pprint.arg_navigator(self__.seq,G__2451,self__.pos,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2462 = new cljs.core.Keyword(null,"pos","pos",(-864607220));
var G__2463 = expr__2456;
return (pred__2455.cljs$core$IFn$_invoke$arity$2 ? pred__2455.cljs$core$IFn$_invoke$arity$2(G__2462,G__2463) : pred__2455.call(null,G__2462,G__2463));
})())){
return (new cljs.pprint.arg_navigator(self__.seq,self__.rest,G__2451,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.arg_navigator(self__.seq,self__.rest,self__.pos,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__2451),null));
}
}
}
});

cljs.pprint.arg_navigator.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"seq","seq",(-1817803783)),self__.seq],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"rest","rest",(-1241696419)),self__.rest],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"pos","pos",(-864607220)),self__.pos],null))], null),self__.__extmap));
});

cljs.pprint.arg_navigator.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__2451){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.arg_navigator(self__.seq,self__.rest,self__.pos,G__2451,self__.__extmap,self__.__hash));
});

cljs.pprint.arg_navigator.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.arg_navigator.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"seq","seq",(-177272256),null),new cljs.core.Symbol(null,"rest","rest",(398835108),null),new cljs.core.Symbol(null,"pos","pos",(775924307),null)], null);
});

cljs.pprint.arg_navigator.cljs$lang$type = true;

cljs.pprint.arg_navigator.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/arg-navigator");
});

cljs.pprint.arg_navigator.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/arg-navigator");
});

(function (){
cljs.pprint.__GT_arg_navigator = (function cljs$pprint$__GT_arg_navigator(seq,rest,pos){
return (new cljs.pprint.arg_navigator(seq,rest,pos,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_arg_navigator;},new cljs.core.Symbol("cljs.pprint","->arg-navigator","cljs.pprint/->arg-navigator",(-1198748492),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->arg-navigator","->arg-navigator",(-1320704693),null),"cljs/pprint.cljs",(16),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(945),(946),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"seq","seq",(-177272256),null),new cljs.core.Symbol(null,"rest","rest",(398835108),null),new cljs.core.Symbol(null,"pos","pos",(775924307),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_arg_navigator)?cljs.pprint.__GT_arg_navigator.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_arg_navigator = (function cljs$pprint$map__GT_arg_navigator(G__2453){
return (new cljs.pprint.arg_navigator(new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(G__2453),new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(G__2453),new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(G__2453),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__2453,new cljs.core.Keyword(null,"seq","seq",(-1817803783)),cljs.core.array_seq([new cljs.core.Keyword(null,"rest","rest",(-1241696419)),new cljs.core.Keyword(null,"pos","pos",(-864607220))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_arg_navigator;},new cljs.core.Symbol("cljs.pprint","map->arg-navigator","cljs.pprint/map->arg-navigator",(375266329),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->arg-navigator","map->arg-navigator",(1829843664),null),"cljs/pprint.cljs",(16),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(945),(946),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__2453","G__2453",(535233353),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_arg_navigator)?cljs.pprint.map__GT_arg_navigator.cljs$lang$test:null)])));})()
;

/**
 * Create a new arg-navigator from the sequence with the position set to 0
 */
(function (){
cljs.pprint.init_navigator = (function cljs$pprint$init_navigator(s){
var s__$1 = cljs.core.seq(s);
return (new cljs.pprint.arg_navigator(s__$1,s__$1,(0),null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.init_navigator;},new cljs.core.Symbol("cljs.pprint","init-navigator","cljs.pprint/init-navigator",(1904204595),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"init-navigator","init-navigator",(2055521738),null),"cljs/pprint.cljs",(22),true,(1),(948),(948),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),"Create a new arg-navigator from the sequence with the position set to 0",(cljs.core.truth_(cljs.pprint.init_navigator)?cljs.pprint.init_navigator.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.next_arg = (function cljs$pprint$next_arg(navigator){
var rst = new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator);
if(cljs.core.truth_(rst)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(rst),(new cljs.pprint.arg_navigator(new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(navigator),cljs.core.next(rst),(new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator) + (1)),null,null,null))], null);
} else {
throw Error("Not enough arguments for format definition");
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.next_arg;},new cljs.core.Symbol("cljs.pprint","next-arg","cljs.pprint/next-arg",(-1916832704),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"next-arg","next-arg",(-2065670773),null),"cljs/pprint.cljs",(16),(1),(956),(956),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null)], null)),null,(cljs.core.truth_(cljs.pprint.next_arg)?cljs.pprint.next_arg.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.next_arg_or_nil = (function cljs$pprint$next_arg_or_nil(navigator){
var rst = new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator);
if(cljs.core.truth_(rst)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(rst),(new cljs.pprint.arg_navigator(new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(navigator),cljs.core.next(rst),(new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator) + (1)),null,null,null))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,navigator], null);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.next_arg_or_nil;},new cljs.core.Symbol("cljs.pprint","next-arg-or-nil","cljs.pprint/next-arg-or-nil",(1831426026),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"next-arg-or-nil","next-arg-or-nil",(1784789293),null),"cljs/pprint.cljs",(23),(1),(962),(962),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null)], null)),null,(cljs.core.truth_(cljs.pprint.next_arg_or_nil)?cljs.pprint.next_arg_or_nil.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_format_arg = (function cljs$pprint$get_format_arg(navigator){
var vec__2468 = cljs.pprint.next_arg(navigator);
var raw_format = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2468,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2468,(1),null);
var compiled_format = ((typeof raw_format === 'string')?(cljs.pprint.compile_format.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.compile_format.cljs$core$IFn$_invoke$arity$1(raw_format) : cljs.pprint.compile_format.call(null,raw_format)):raw_format);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [compiled_format,navigator__$1], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_format_arg;},new cljs.core.Symbol("cljs.pprint","get-format-arg","cljs.pprint/get-format-arg",(-291729680),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-format-arg","get-format-arg",(-431628151),null),"cljs/pprint.cljs",(22),(1),(969),(969),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_format_arg)?cljs.pprint.get_format_arg.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.relative_reposition; return (
new cljs.core.Var(function(){return cljs.pprint.relative_reposition;},new cljs.core.Symbol("cljs.pprint","relative-reposition","cljs.pprint/relative-reposition",(-1854387708),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"relative-reposition","relative-reposition",(-1719180081),null),"cljs/pprint.cljs",(29),(1),(976),true,(976),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.relative_reposition)?cljs.pprint.relative_reposition.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.absolute_reposition = (function cljs$pprint$absolute_reposition(navigator,position){
if((position >= new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator))){
var G__2473 = navigator;
var G__2474 = (new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator) - position);
return (cljs.pprint.relative_reposition.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.relative_reposition.cljs$core$IFn$_invoke$arity$2(G__2473,G__2474) : cljs.pprint.relative_reposition.call(null,G__2473,G__2474));
} else {
return (new cljs.pprint.arg_navigator(new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(navigator),cljs.core.drop.cljs$core$IFn$_invoke$arity$2(position,new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(navigator)),position,null,null,null));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.absolute_reposition;},new cljs.core.Symbol("cljs.pprint","absolute-reposition","cljs.pprint/absolute-reposition",(-1498988380),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"absolute-reposition","absolute-reposition",(-1344383331),null),"cljs/pprint.cljs",(27),(1),(978),(978),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"position","position",(-371200385),null)], null)),null,(cljs.core.truth_(cljs.pprint.absolute_reposition)?cljs.pprint.absolute_reposition.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.relative_reposition = (function cljs$pprint$relative_reposition(navigator,position){
var newpos = (new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator) + position);
if((position < (0))){
return cljs.pprint.absolute_reposition(navigator,newpos);
} else {
return (new cljs.pprint.arg_navigator(new cljs.core.Keyword(null,"seq","seq",(-1817803783)).cljs$core$IFn$_invoke$arity$1(navigator),cljs.core.drop.cljs$core$IFn$_invoke$arity$2(position,new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator)),newpos,null,null,null));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.relative_reposition;},new cljs.core.Symbol("cljs.pprint","relative-reposition","cljs.pprint/relative-reposition",(-1854387708),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"relative-reposition","relative-reposition",(-1719180081),null),"cljs/pprint.cljs",(27),(1),(983),(983),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"position","position",(-371200385),null)], null)),null,(cljs.core.truth_(cljs.pprint.relative_reposition)?cljs.pprint.relative_reposition.cljs$lang$test:null)])));})()
;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.pprint.compiled_directive = (function (func,def,params,offset,__meta,__extmap,__hash){
this.func = func;
this.def = def;
this.params = params;
this.offset = offset;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = -2065299702;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
cljs.pprint.compiled_directive.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__24366__auto__,k__24367__auto__){
var self__ = this;
var this__24366__auto____$1 = this;
return this__24366__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__24367__auto__,null);
});

cljs.pprint.compiled_directive.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__24368__auto__,k2476,else__24369__auto__){
var self__ = this;
var this__24368__auto____$1 = this;
var G__2478 = k2476;
var G__2478__$1 = (((G__2478 instanceof cljs.core.Keyword))?G__2478.fqn:null);
switch (G__2478__$1) {
case "func":
return self__.func;

break;
case "def":
return self__.def;

break;
case "params":
return self__.params;

break;
case "offset":
return self__.offset;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k2476,else__24369__auto__);

}
});

cljs.pprint.compiled_directive.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__24380__auto__,writer__24381__auto__,opts__24382__auto__){
var self__ = this;
var this__24380__auto____$1 = this;
var pr_pair__24383__auto__ = ((function (this__24380__auto____$1){
return (function (keyval__24384__auto__){
return cljs.core.pr_sequential_writer(writer__24381__auto__,cljs.core.pr_writer,""," ","",opts__24382__auto__,keyval__24384__auto__);
});})(this__24380__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__24381__auto__,pr_pair__24383__auto__,"#cljs.pprint.compiled-directive{",", ","}",opts__24382__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"func","func",(-238706040)),self__.func],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"def","def",(-1043430536)),self__.def],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",(710516235)),self__.params],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"offset","offset",(296498311)),self__.offset],null))], null),self__.__extmap));
});

cljs.pprint.compiled_directive.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

cljs.pprint.compiled_directive.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2475){
var self__ = this;
var G__2475__$1 = this;
return (new cljs.core.RecordIter((0),G__2475__$1,(4),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"func","func",(-238706040)),new cljs.core.Keyword(null,"def","def",(-1043430536)),new cljs.core.Keyword(null,"params","params",(710516235)),new cljs.core.Keyword(null,"offset","offset",(296498311))], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
});

cljs.pprint.compiled_directive.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__24364__auto__){
var self__ = this;
var this__24364__auto____$1 = this;
return self__.__meta;
});

cljs.pprint.compiled_directive.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__24360__auto__){
var self__ = this;
var this__24360__auto____$1 = this;
return (new cljs.pprint.compiled_directive(self__.func,self__.def,self__.params,self__.offset,self__.__meta,self__.__extmap,self__.__hash));
});

cljs.pprint.compiled_directive.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__24370__auto__){
var self__ = this;
var this__24370__auto____$1 = this;
return ((4) + cljs.core.count(self__.__extmap));
});

cljs.pprint.compiled_directive.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__24361__auto__){
var self__ = this;
var this__24361__auto____$1 = this;
var h__23553__auto__ = self__.__hash;
if(!((h__23553__auto__ == null))){
return h__23553__auto__;
} else {
var h__23553__auto____$1 = cljs.core.hash_imap(this__24361__auto____$1);
self__.__hash = h__23553__auto____$1;

return h__23553__auto____$1;
}
});

cljs.pprint.compiled_directive.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__24362__auto__,other__24363__auto__){
var self__ = this;
var this__24362__auto____$1 = this;
if(cljs.core.truth_((function (){var and__22563__auto__ = other__24363__auto__;
if(cljs.core.truth_(and__22563__auto__)){
return ((this__24362__auto____$1.constructor === other__24363__auto__.constructor)) && (cljs.core.equiv_map(this__24362__auto____$1,other__24363__auto__));
} else {
return and__22563__auto__;
}
})())){
return true;
} else {
return false;
}
});

cljs.pprint.compiled_directive.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__24375__auto__,k__24376__auto__){
var self__ = this;
var this__24375__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"func","func",(-238706040)),null,new cljs.core.Keyword(null,"def","def",(-1043430536)),null,new cljs.core.Keyword(null,"params","params",(710516235)),null,new cljs.core.Keyword(null,"offset","offset",(296498311)),null], null), null),k__24376__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__24375__auto____$1),self__.__meta),k__24376__auto__);
} else {
return (new cljs.pprint.compiled_directive(self__.func,self__.def,self__.params,self__.offset,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__24376__auto__)),null));
}
});

cljs.pprint.compiled_directive.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__24373__auto__,k__24374__auto__,G__2475){
var self__ = this;
var this__24373__auto____$1 = this;
var pred__2479 = cljs.core.keyword_identical_QMARK_;
var expr__2480 = k__24374__auto__;
if(cljs.core.truth_((function (){var G__2482 = new cljs.core.Keyword(null,"func","func",(-238706040));
var G__2483 = expr__2480;
return (pred__2479.cljs$core$IFn$_invoke$arity$2 ? pred__2479.cljs$core$IFn$_invoke$arity$2(G__2482,G__2483) : pred__2479.call(null,G__2482,G__2483));
})())){
return (new cljs.pprint.compiled_directive(G__2475,self__.def,self__.params,self__.offset,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2484 = new cljs.core.Keyword(null,"def","def",(-1043430536));
var G__2485 = expr__2480;
return (pred__2479.cljs$core$IFn$_invoke$arity$2 ? pred__2479.cljs$core$IFn$_invoke$arity$2(G__2484,G__2485) : pred__2479.call(null,G__2484,G__2485));
})())){
return (new cljs.pprint.compiled_directive(self__.func,G__2475,self__.params,self__.offset,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2486 = new cljs.core.Keyword(null,"params","params",(710516235));
var G__2487 = expr__2480;
return (pred__2479.cljs$core$IFn$_invoke$arity$2 ? pred__2479.cljs$core$IFn$_invoke$arity$2(G__2486,G__2487) : pred__2479.call(null,G__2486,G__2487));
})())){
return (new cljs.pprint.compiled_directive(self__.func,self__.def,G__2475,self__.offset,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__2488 = new cljs.core.Keyword(null,"offset","offset",(296498311));
var G__2489 = expr__2480;
return (pred__2479.cljs$core$IFn$_invoke$arity$2 ? pred__2479.cljs$core$IFn$_invoke$arity$2(G__2488,G__2489) : pred__2479.call(null,G__2488,G__2489));
})())){
return (new cljs.pprint.compiled_directive(self__.func,self__.def,self__.params,G__2475,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.pprint.compiled_directive(self__.func,self__.def,self__.params,self__.offset,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__24374__auto__,G__2475),null));
}
}
}
}
});

cljs.pprint.compiled_directive.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__24378__auto__){
var self__ = this;
var this__24378__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"func","func",(-238706040)),self__.func],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"def","def",(-1043430536)),self__.def],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",(710516235)),self__.params],null)),(new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"offset","offset",(296498311)),self__.offset],null))], null),self__.__extmap));
});

cljs.pprint.compiled_directive.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__24365__auto__,G__2475){
var self__ = this;
var this__24365__auto____$1 = this;
return (new cljs.pprint.compiled_directive(self__.func,self__.def,self__.params,self__.offset,G__2475,self__.__extmap,self__.__hash));
});

cljs.pprint.compiled_directive.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__24371__auto__,entry__24372__auto__){
var self__ = this;
var this__24371__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__24372__auto__)){
return this__24371__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__24372__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__24371__auto____$1,entry__24372__auto__);
}
});

cljs.pprint.compiled_directive.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"func","func",(1401825487),null),new cljs.core.Symbol(null,"def","def",(597100991),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null);
});

cljs.pprint.compiled_directive.cljs$lang$type = true;

cljs.pprint.compiled_directive.cljs$lang$ctorPrSeq = (function (this__24880__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"cljs.pprint/compiled-directive");
});

cljs.pprint.compiled_directive.cljs$lang$ctorPrWriter = (function (this__24880__auto__,writer__24881__auto__){
return cljs.core._write(writer__24881__auto__,"cljs.pprint/compiled-directive");
});

(function (){
cljs.pprint.__GT_compiled_directive = (function cljs$pprint$__GT_compiled_directive(func,def,params,offset){
return (new cljs.pprint.compiled_directive(func,def,params,offset,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_compiled_directive;},new cljs.core.Symbol("cljs.pprint","->compiled-directive","cljs.pprint/->compiled-directive",(-1867947),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->compiled-directive","->compiled-directive",(-132626786),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"positional","positional",(-203580463)),(989),(990),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"func","func",(1401825487),null),new cljs.core.Symbol(null,"def","def",(597100991),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.__GT_compiled_directive)?cljs.pprint.__GT_compiled_directive.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.map__GT_compiled_directive = (function cljs$pprint$map__GT_compiled_directive(G__2477){
return (new cljs.pprint.compiled_directive(new cljs.core.Keyword(null,"func","func",(-238706040)).cljs$core$IFn$_invoke$arity$1(G__2477),new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(G__2477),new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(G__2477),new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(G__2477),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__2477,new cljs.core.Keyword(null,"func","func",(-238706040)),cljs.core.array_seq([new cljs.core.Keyword(null,"def","def",(-1043430536)),new cljs.core.Keyword(null,"params","params",(710516235)),new cljs.core.Keyword(null,"offset","offset",(296498311))], 0)),null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map__GT_compiled_directive;},new cljs.core.Symbol("cljs.pprint","map->compiled-directive","cljs.pprint/map->compiled-directive",(-243948353),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"internal-ctor","internal-ctor",(937392560)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map->compiled-directive","map->compiled-directive",(-88960284),null),"cljs/pprint.cljs",(21),(1),true,new cljs.core.Keyword(null,"map","map",(1371690461)),(989),(990),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"G__2477","G__2477",(1901271378),null)], null)),null,(cljs.core.truth_(cljs.pprint.map__GT_compiled_directive)?cljs.pprint.map__GT_compiled_directive.cljs$lang$test:null)])));})()
;

(function (){
cljs.pprint.realize_parameter = (function cljs$pprint$realize_parameter(p__2491,navigator){
var vec__2501 = p__2491;
var param = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2501,(0),null);
var vec__2504 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2501,(1),null);
var raw_val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2504,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2504,(1),null);
var vec__2507 = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),param))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [raw_val,navigator], null):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(raw_val,new cljs.core.Keyword(null,"parameter-from-args","parameter-from-args",(-758446196))))?cljs.pprint.next_arg(navigator):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(raw_val,new cljs.core.Keyword(null,"remaining-arg-count","remaining-arg-count",(-1216589335))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.count(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator)),navigator], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [raw_val,navigator], null)
)));
var real_param = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2507,(0),null);
var new_navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2507,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [real_param,offset], null)], null),new_navigator], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.realize_parameter;},new cljs.core.Symbol("cljs.pprint","realize-parameter","cljs.pprint/realize-parameter",(548447092),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"realize-parameter","realize-parameter",(432781579),null),"cljs/pprint.cljs",(25),(1),(1000),(1000),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"param","param",(-640803946),null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"raw-val","raw-val",(-2081106773),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)], null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null)], null)),null,(cljs.core.truth_(cljs.pprint.realize_parameter)?cljs.pprint.realize_parameter.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.realize_parameter_list = (function cljs$pprint$realize_parameter_list(parameter_map,navigator){
var vec__2513 = cljs.pprint.map_passing_context(cljs.pprint.realize_parameter,navigator,parameter_map);
var pairs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2513,(0),null);
var new_navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2513,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,pairs),new_navigator], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.realize_parameter_list;},new cljs.core.Symbol("cljs.pprint","realize-parameter-list","cljs.pprint/realize-parameter-list",(503348823),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"realize-parameter-list","realize-parameter-list",(97096808),null),"cljs/pprint.cljs",(30),(1),(1016),(1016),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parameter-map","parameter-map",(1760538161),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null)], null)),null,(cljs.core.truth_(cljs.pprint.realize_parameter_list)?cljs.pprint.realize_parameter_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.opt_base_str; return (
new cljs.core.Var(function(){return cljs.pprint.opt_base_str;},new cljs.core.Symbol("cljs.pprint","opt-base-str","cljs.pprint/opt-base-str",(1717400769),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"opt-base-str","opt-base-str",(2132023944),null),"cljs/pprint.cljs",(22),(1),(1029),true,(1029),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.opt_base_str)?cljs.pprint.opt_base_str.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.special_radix_markers = new cljs.core.PersistentArrayMap(null, 3, [(2),"#b",(8),"#o",(16),"#x"], null); return (
new cljs.core.Var(function(){return cljs.pprint.special_radix_markers;},new cljs.core.Symbol("cljs.pprint","special-radix-markers","cljs.pprint/special-radix-markers",(1322352935),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"special-radix-markers","special-radix-markers",(1469508332),null),"cljs/pprint.cljs",(24),(1),(1031),(1032),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.special_radix_markers)?cljs.pprint.special_radix_markers.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_simple_number = (function cljs$pprint$format_simple_number(n){
if(cljs.core.integer_QMARK_(n)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.pprint._STAR_print_base_STAR_,(10))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(cljs.pprint._STAR_print_radix_STAR_)?".":null))].join('');
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(cljs.pprint._STAR_print_radix_STAR_)?(function (){var or__22603__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.pprint.special_radix_markers,cljs.pprint._STAR_print_base_STAR_);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("#"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.pprint._STAR_print_base_STAR_),cljs.core.str.cljs$core$IFn$_invoke$arity$1("r")].join('');
}
})():null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.pprint.opt_base_str.cljs$core$IFn$_invoke$arity$2 ? cljs.pprint.opt_base_str.cljs$core$IFn$_invoke$arity$2(cljs.pprint._STAR_print_base_STAR_,n) : cljs.pprint.opt_base_str.call(null,cljs.pprint._STAR_print_base_STAR_,n)))].join('');
}
} else {
return null;

}
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_simple_number;},new cljs.core.Symbol("cljs.pprint","format-simple-number","cljs.pprint/format-simple-number",(-1220074419),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-simple-number","format-simple-number",(-1203880300),null),"cljs/pprint.cljs",(28),(1),(1034),(1034),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_simple_number)?cljs.pprint.format_simple_number.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_ascii = (function cljs$pprint$format_ascii(print_func,params,arg_navigator,offsets){
var vec__2519 = cljs.pprint.next_arg(arg_navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2519,(0),null);
var arg_navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2519,(1),null);
var base_output = (function (){var or__22603__auto__ = cljs.pprint.format_simple_number(arg);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (print_func.cljs$core$IFn$_invoke$arity$1 ? print_func.cljs$core$IFn$_invoke$arity$1(arg) : print_func.call(null,arg));
}
})();
var base_width = base_output.length;
var min_width = (base_width + new cljs.core.Keyword(null,"minpad","minpad",(323570901)).cljs$core$IFn$_invoke$arity$1(params));
var width = (((min_width >= new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params)))?min_width:(min_width + ((cljs.core.quot(((new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params) - min_width) - (1)),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)).cljs$core$IFn$_invoke$arity$1(params)) + (1)) * new cljs.core.Keyword(null,"colinc","colinc",(-584873385)).cljs$core$IFn$_invoke$arity$1(params))));
var chars = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((width - base_width),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(chars),cljs.core.str.cljs$core$IFn$_invoke$arity$1(base_output)].join('')], 0));
} else {
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(base_output),cljs.core.str.cljs$core$IFn$_invoke$arity$1(chars)].join('')], 0));
}

return arg_navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_ascii;},new cljs.core.Symbol("cljs.pprint","format-ascii","cljs.pprint/format-ascii",(294871848),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-ascii","format-ascii",(685005171),null),"cljs/pprint.cljs",(20),(1),(1044),(1044),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"print-func","print-func",(1058018671),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"arg-navigator","arg-navigator",(1660575364),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_ascii)?cljs.pprint.format_ascii.cljs$lang$test:null)])));})()
;
/**
 * returns true if a number is actually an integer (that is, has no fractional part)
 */
(function (){
cljs.pprint.integral_QMARK_ = (function cljs$pprint$integral_QMARK_(x){
if(cljs.core.integer_QMARK_(x)){
return true;
} else {
if(cljs.pprint.float_QMARK_(x)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,Math.floor(x));
} else {
return false;

}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.integral_QMARK_;},new cljs.core.Symbol("cljs.pprint","integral?","cljs.pprint/integral?",(-2139316882),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"integral?","integral?",(-2027571295),null),"cljs/pprint.cljs",(17),(1),(1067),(1067),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),"returns true if a number is actually an integer (that is, has no fractional part)",(cljs.core.truth_(cljs.pprint.integral_QMARK_)?cljs.pprint.integral_QMARK_.cljs$lang$test:null)])));})()
;
/**
 * Return the list of remainders (essentially the 'digits') of val in the given base
 */
(function (){
cljs.pprint.remainders = (function cljs$pprint$remainders(base,val){
return cljs.core.reverse(cljs.core.first(cljs.pprint.consume((function (p1__117_SHARP_){
if((p1__117_SHARP_ > (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.rem(p1__117_SHARP_,base),cljs.core.quot(p1__117_SHARP_,base)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null);
}
}),val)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.remainders;},new cljs.core.Symbol("cljs.pprint","remainders","cljs.pprint/remainders",(1708426614),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"remainders","remainders",(1829737391),null),"cljs/pprint.cljs",(18),(1),(1077),(1077),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"base","base",(1825810849),null),new cljs.core.Symbol(null,"val","val",(1769233139),null)], null)),"Return the list of remainders (essentially the 'digits') of val in the given base",(cljs.core.truth_(cljs.pprint.remainders)?cljs.pprint.remainders.cljs$lang$test:null)])));})()
;
/**
 * Return val as a string in the given base
 */
(function (){
cljs.pprint.base_str = (function cljs$pprint$base_str(base,val){
if((val === (0))){
return "0";
} else {
var xlated_val = val
;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (xlated_val){
return (function (p1__118_SHARP_){
if((p1__118_SHARP_ < (10))){
return cljs.core.char$((cljs.pprint.char_code("0") + p1__118_SHARP_));
} else {
return cljs.core.char$((cljs.pprint.char_code("a") + (p1__118_SHARP_ - (10))));
}
});})(xlated_val))
,cljs.pprint.remainders(base,val)));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.base_str;},new cljs.core.Symbol("cljs.pprint","base-str","cljs.pprint/base-str",(-1004113958),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"base-str","base-str",(-580019743),null),"cljs/pprint.cljs",(16),(1),(1089),(1089),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"base","base",(1825810849),null),new cljs.core.Symbol(null,"val","val",(1769233139),null)], null)),"Return val as a string in the given base",(cljs.core.truth_(cljs.pprint.base_str)?cljs.pprint.base_str.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.javascript_base_formats = new cljs.core.PersistentArrayMap(null, 3, [(8),"%o",(10),"%d",(16),"%x"], null); return (
new cljs.core.Var(function(){return cljs.pprint.javascript_base_formats;},new cljs.core.Symbol("cljs.pprint","javascript-base-formats","cljs.pprint/javascript-base-formats",(-477361289),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"javascript-base-formats","javascript-base-formats",(-321708792),null),"cljs/pprint.cljs",(26),(1),(1104),(1105),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.javascript_base_formats)?cljs.pprint.javascript_base_formats.cljs$lang$test:null)])));})()
;
/**
 * Return val as a string in the given base. No cljs format, so no improved performance.
 */
(function (){
cljs.pprint.opt_base_str = (function cljs$pprint$opt_base_str(base,val){
return cljs.pprint.base_str(base,val);
}); return (
new cljs.core.Var(function(){return cljs.pprint.opt_base_str;},new cljs.core.Symbol("cljs.pprint","opt-base-str","cljs.pprint/opt-base-str",(1717400769),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"opt-base-str","opt-base-str",(2132023944),null),"cljs/pprint.cljs",(20),(1),(1107),(1107),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"base","base",(1825810849),null),new cljs.core.Symbol(null,"val","val",(1769233139),null)], null)),"Return val as a string in the given base. No cljs format, so no improved performance.",(cljs.core.truth_(cljs.pprint.opt_base_str)?cljs.pprint.opt_base_str.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.group_by_STAR_ = (function cljs$pprint$group_by_STAR_(unit,lis){
return cljs.core.reverse(cljs.core.first(cljs.pprint.consume((function (x){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.seq(cljs.core.reverse(cljs.core.take.cljs$core$IFn$_invoke$arity$2(unit,x))),cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(unit,x))], null);
}),cljs.core.reverse(lis))));
}); return (
new cljs.core.Var(function(){return cljs.pprint.group_by_STAR_;},new cljs.core.Symbol("cljs.pprint","group-by*","cljs.pprint/group-by*",(595123027),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"group-by*","group-by*",(461620586),null),"cljs/pprint.cljs",(17),(1),(1112),(1112),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"unit","unit",(2015706702),null),new cljs.core.Symbol(null,"lis","lis",(649343131),null)], null)),null,(cljs.core.truth_(cljs.pprint.group_by_STAR_)?cljs.pprint.group_by_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_integer = (function cljs$pprint$format_integer(base,params,arg_navigator,offsets){
var vec__2525 = cljs.pprint.next_arg(arg_navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2525,(0),null);
var arg_navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2525,(1),null);
if(cljs.core.truth_(cljs.pprint.integral_QMARK_(arg))){
var neg_2528 = (arg < (0));
var pos_arg_2529 = ((neg_2528)?(- arg):arg);
var raw_str_2530 = cljs.pprint.opt_base_str(base,pos_arg_2529);
var group_str_2531 = (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?(function (){var groups = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (neg_2528,pos_arg_2529,raw_str_2530,vec__2525,arg,arg_navigator__$1){
return (function (p1__119_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,p1__119_SHARP_);
});})(neg_2528,pos_arg_2529,raw_str_2530,vec__2525,arg,arg_navigator__$1))
,cljs.pprint.group_by_STAR_(new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)).cljs$core$IFn$_invoke$arity$1(params),raw_str_2530));
var commas = cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(groups),new cljs.core.Keyword(null,"commachar","commachar",(652859327)).cljs$core$IFn$_invoke$arity$1(params));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.next(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(commas,groups)));
})():raw_str_2530);
var signed_str_2532 = ((neg_2528)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1("-"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(group_str_2531)].join(''):(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1("+"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(group_str_2531)].join(''):group_str_2531
));
var padded_str_2533 = (((signed_str_2532.length < new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params) - signed_str_2532.length),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(signed_str_2532)].join(''):signed_str_2532);
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([padded_str_2533], 0));
} else {
cljs.pprint.format_ascii(cljs.core.print_str,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)),(1),new cljs.core.Keyword(null,"minpad","minpad",(323570901)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"at","at",(1476951349)),true], null),cljs.pprint.init_navigator(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg], null)),null);
}

return arg_navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_integer;},new cljs.core.Symbol("cljs.pprint","format-integer","cljs.pprint/format-integer",(219485478),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-integer","format-integer",(349043949),null),"cljs/pprint.cljs",(22),(1),(1117),(1117),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"base","base",(1825810849),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"arg-navigator","arg-navigator",(1660575364),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_integer)?cljs.pprint.format_integer.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.english_cardinal_units = new cljs.core.PersistentVector(null, 20, 5, cljs.core.PersistentVector.EMPTY_NODE, ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"], null); return (
new cljs.core.Var(function(){return cljs.pprint.english_cardinal_units;},new cljs.core.Symbol("cljs.pprint","english-cardinal-units","cljs.pprint/english-cardinal-units",(140527670),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"english-cardinal-units","english-cardinal-units",(815742589),null),"cljs/pprint.cljs",(28),(1),(1147),(1148),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.english_cardinal_units)?cljs.pprint.english_cardinal_units.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.english_ordinal_units = new cljs.core.PersistentVector(null, 20, 5, cljs.core.PersistentVector.EMPTY_NODE, ["zeroth","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth"], null); return (
new cljs.core.Var(function(){return cljs.pprint.english_ordinal_units;},new cljs.core.Symbol("cljs.pprint","english-ordinal-units","cljs.pprint/english-ordinal-units",(481434877),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"english-ordinal-units","english-ordinal-units",(368378546),null),"cljs/pprint.cljs",(27),(1),(1153),(1154),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.english_ordinal_units)?cljs.pprint.english_ordinal_units.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.english_cardinal_tens = new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"], null); return (
new cljs.core.Var(function(){return cljs.pprint.english_cardinal_tens;},new cljs.core.Symbol("cljs.pprint","english-cardinal-tens","cljs.pprint/english-cardinal-tens",(-1817472294),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"english-cardinal-tens","english-cardinal-tens",(-1805473533),null),"cljs/pprint.cljs",(27),(1),(1159),(1160),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.english_cardinal_tens)?cljs.pprint.english_cardinal_tens.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.english_ordinal_tens = new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, ["","","twentieth","thirtieth","fortieth","fiftieth","sixtieth","seventieth","eightieth","ninetieth"], null); return (
new cljs.core.Var(function(){return cljs.pprint.english_ordinal_tens;},new cljs.core.Symbol("cljs.pprint","english-ordinal-tens","cljs.pprint/english-ordinal-tens",(138757361),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"english-ordinal-tens","english-ordinal-tens",(319696184),null),"cljs/pprint.cljs",(26),(1),(1163),(1164),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.english_ordinal_tens)?cljs.pprint.english_ordinal_tens.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.english_scale_numbers = new cljs.core.PersistentVector(null, 22, 5, cljs.core.PersistentVector.EMPTY_NODE, ["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion","quattuordecillion","quindecillion","sexdecillion","septendecillion","octodecillion","novemdecillion","vigintillion"], null); return (
new cljs.core.Var(function(){return cljs.pprint.english_scale_numbers;},new cljs.core.Symbol("cljs.pprint","english-scale-numbers","cljs.pprint/english-scale-numbers",(-1714335163),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"english-scale-numbers","english-scale-numbers",(-1608635508),null),"cljs/pprint.cljs",(27),(1),(1172),(1173),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.english_scale_numbers)?cljs.pprint.english_scale_numbers.cljs$lang$test:null)])));})()
;
/**
 * Convert a number less than 1000 to a cardinal english string
 */
(function (){
cljs.pprint.format_simple_cardinal = (function cljs$pprint$format_simple_cardinal(num){
var hundreds = cljs.core.quot(num,(100));
var tens = cljs.core.rem(num,(100));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((hundreds > (0)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_units,hundreds)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" hundred")].join(''):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((((hundreds > (0))) && ((tens > (0))))?" ":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((tens > (0)))?(((tens < (20)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_units,tens):(function (){var ten_digit = cljs.core.quot(tens,(10));
var unit_digit = cljs.core.rem(tens,(10));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((ten_digit > (0)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_tens,ten_digit):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((((ten_digit > (0))) && ((unit_digit > (0))))?"-":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((unit_digit > (0)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_units,unit_digit):null))].join('');
})()):null))].join('');
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_simple_cardinal;},new cljs.core.Symbol("cljs.pprint","format-simple-cardinal","cljs.pprint/format-simple-cardinal",(913288138),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-simple-cardinal","format-simple-cardinal",(1028948467),null),"cljs/pprint.cljs",(30),(1),(1180),(1180),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"num","num",(-669195096),null)], null)),"Convert a number less than 1000 to a cardinal english string",(cljs.core.truth_(cljs.pprint.format_simple_cardinal)?cljs.pprint.format_simple_cardinal.cljs$lang$test:null)])));})()
;
/**
 * Take a sequence of parts, add scale numbers (e.g., million) and combine into a string
 *   offset is a factor of 10^3 to multiply by
 */
(function (){
cljs.pprint.add_english_scales = (function cljs$pprint$add_english_scales(parts,offset){
var cnt = cljs.core.count(parts);
var acc = cljs.core.PersistentVector.EMPTY;
var pos = (cnt - (1));
var this$ = cljs.core.first(parts);
var remainder = cljs.core.next(parts);
while(true){
if((remainder == null)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(", ",acc))),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((!(cljs.core.empty_QMARK_(this$))) && (!(cljs.core.empty_QMARK_(acc))))?", ":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((!(cljs.core.empty_QMARK_(this$))) && (((pos + offset) > (0))))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(" "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_scale_numbers,(pos + offset)))].join(''):null))].join('');
} else {
var G__2534 = ((cljs.core.empty_QMARK_(this$))?acc:cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_scale_numbers,(pos + offset)))].join('')));
var G__2535 = (pos - (1));
var G__2536 = cljs.core.first(remainder);
var G__2537 = cljs.core.next(remainder);
acc = G__2534;
pos = G__2535;
this$ = G__2536;
remainder = G__2537;
continue;
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.add_english_scales;},new cljs.core.Symbol("cljs.pprint","add-english-scales","cljs.pprint/add-english-scales",(426407851),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"add-english-scales","add-english-scales",(515071458),null),"cljs/pprint.cljs",(26),(1),(1198),(1198),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parts","parts",(-1805428078),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),"Take a sequence of parts, add scale numbers (e.g., million) and combine into a string\n  offset is a factor of 10^3 to multiply by",(cljs.core.truth_(cljs.pprint.add_english_scales)?cljs.pprint.add_english_scales.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_cardinal_english = (function cljs$pprint$format_cardinal_english(params,navigator,offsets){
var vec__2541 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2541,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2541,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),arg)){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["zero"], 0));
} else {
var abs_arg_2544 = (((arg < (0)))?(- arg):arg);
var parts_2545 = cljs.pprint.remainders((1000),abs_arg_2544);
if((cljs.core.count(parts_2545) <= cljs.core.count(cljs.pprint.english_scale_numbers))){
var parts_strs_2546 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.pprint.format_simple_cardinal,parts_2545);
var full_str_2547 = cljs.pprint.add_english_scales(parts_strs_2546,(0));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((arg < (0)))?"minus ":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_str_2547)].join('')], 0));
} else {
cljs.pprint.format_integer((10),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530))," ",new cljs.core.Keyword(null,"commachar","commachar",(652859327)),",",new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(3),new cljs.core.Keyword(null,"colon","colon",(-965200945)),true], null),cljs.pprint.init_navigator(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg], null)),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),(0),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),(0),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(0)], null));
}
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_cardinal_english;},new cljs.core.Symbol("cljs.pprint","format-cardinal-english","cljs.pprint/format-cardinal-english",(1246755570),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-cardinal-english","format-cardinal-english",(1124650169),null),"cljs/pprint.cljs",(31),(1),(1221),(1221),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_cardinal_english)?cljs.pprint.format_cardinal_english.cljs$lang$test:null)])));})()
;
/**
 * Convert a number less than 1000 to a ordinal english string
 *   Note this should only be used for the last one in the sequence
 */
(function (){
cljs.pprint.format_simple_ordinal = (function cljs$pprint$format_simple_ordinal(num){
var hundreds = cljs.core.quot(num,(100));
var tens = cljs.core.rem(num,(100));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((hundreds > (0)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_units,hundreds)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" hundred")].join(''):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((((hundreds > (0))) && ((tens > (0))))?" ":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((tens > (0)))?(((tens < (20)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_ordinal_units,tens):(function (){var ten_digit = cljs.core.quot(tens,(10));
var unit_digit = cljs.core.rem(tens,(10));
if(((ten_digit > (0))) && (!((unit_digit > (0))))){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_ordinal_tens,ten_digit);
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((ten_digit > (0)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_cardinal_tens,ten_digit):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((((ten_digit > (0))) && ((unit_digit > (0))))?"-":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((unit_digit > (0)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.pprint.english_ordinal_units,unit_digit):null))].join('');
}
})()):(((hundreds > (0)))?"th":null)))].join('');
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_simple_ordinal;},new cljs.core.Symbol("cljs.pprint","format-simple-ordinal","cljs.pprint/format-simple-ordinal",(1699025669),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-simple-ordinal","format-simple-ordinal",(1812752846),null),"cljs/pprint.cljs",(29),(1),(1238),(1238),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"num","num",(-669195096),null)], null)),"Convert a number less than 1000 to a ordinal english string\n  Note this should only be used for the last one in the sequence",(cljs.core.truth_(cljs.pprint.format_simple_ordinal)?cljs.pprint.format_simple_ordinal.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_ordinal_english = (function cljs$pprint$format_ordinal_english(params,navigator,offsets){
var vec__2551 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2551,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2551,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),arg)){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["zeroth"], 0));
} else {
var abs_arg_2554 = (((arg < (0)))?(- arg):arg);
var parts_2555 = cljs.pprint.remainders((1000),abs_arg_2554);
if((cljs.core.count(parts_2555) <= cljs.core.count(cljs.pprint.english_scale_numbers))){
var parts_strs_2556 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.pprint.format_simple_cardinal,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$1(parts_2555));
var head_str_2557 = cljs.pprint.add_english_scales(parts_strs_2556,(1));
var tail_str_2558 = cljs.pprint.format_simple_ordinal(cljs.core.last(parts_2555));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((arg < (0)))?"minus ":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((!(cljs.core.empty_QMARK_(head_str_2557))) && (!(cljs.core.empty_QMARK_(tail_str_2558))))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(head_str_2557),cljs.core.str.cljs$core$IFn$_invoke$arity$1(", "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(tail_str_2558)].join(''):((!(cljs.core.empty_QMARK_(head_str_2557)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(head_str_2557),cljs.core.str.cljs$core$IFn$_invoke$arity$1("th")].join(''):tail_str_2558
)))].join('')], 0));
} else {
cljs.pprint.format_integer((10),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530))," ",new cljs.core.Keyword(null,"commachar","commachar",(652859327)),",",new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(3),new cljs.core.Keyword(null,"colon","colon",(-965200945)),true], null),cljs.pprint.init_navigator(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg], null)),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),(0),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),(0),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(0)], null));

var low_two_digits_2559 = cljs.core.rem(arg,(100));
var not_teens_2560 = (((11) < low_two_digits_2559)) || (((19) > low_two_digits_2559));
var low_digit_2561 = cljs.core.rem(low_two_digits_2559,(10));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((((low_digit_2561 === (1))) && (not_teens_2560))?"st":((((low_digit_2561 === (2))) && (not_teens_2560))?"nd":((((low_digit_2561 === (3))) && (not_teens_2560))?"rd":"th"
)))], 0));
}
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_ordinal_english;},new cljs.core.Symbol("cljs.pprint","format-ordinal-english","cljs.pprint/format-ordinal-english",(1080759511),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-ordinal-english","format-ordinal-english",(1193426460),null),"cljs/pprint.cljs",(30),(1),(1260),(1260),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_ordinal_english)?cljs.pprint.format_ordinal_english.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.old_roman_table = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["I","II","III","IIII","V","VI","VII","VIII","VIIII"], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X","XX","XXX","XXXX","L","LX","LXX","LXXX","LXXXX"], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["C","CC","CCC","CCCC","D","DC","DCC","DCCC","DCCCC"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["M","MM","MMM"], null)], null); return (
new cljs.core.Var(function(){return cljs.pprint.old_roman_table;},new cljs.core.Symbol("cljs.pprint","old-roman-table","cljs.pprint/old-roman-table",(1065314602),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"old-roman-table","old-roman-table",(874791891),null),"cljs/pprint.cljs",(21),(1),(1296),(1297),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.old_roman_table)?cljs.pprint.old_roman_table.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.new_roman_table = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["I","II","III","IV","V","VI","VII","VIII","IX"], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X","XX","XXX","XL","L","LX","LXX","LXXX","XC"], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["C","CC","CCC","CD","D","DC","DCC","DCCC","CM"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["M","MM","MMM"], null)], null); return (
new cljs.core.Var(function(){return cljs.pprint.new_roman_table;},new cljs.core.Symbol("cljs.pprint","new-roman-table","cljs.pprint/new-roman-table",(1010717852),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"new-roman-table","new-roman-table",(888621909),null),"cljs/pprint.cljs",(21),(1),(1303),(1304),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.new_roman_table)?cljs.pprint.new_roman_table.cljs$lang$test:null)])));})()
;
/**
 * Format a roman numeral using the specified look-up table
 */
(function (){
cljs.pprint.format_roman = (function cljs$pprint$format_roman(table,params,navigator,offsets){
var vec__2565 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2565,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2565,(1),null);
if((typeof arg === 'number') && ((arg > (0))) && ((arg < (4000)))){
var digits_2568 = cljs.pprint.remainders((10),arg);
var acc_2569 = cljs.core.PersistentVector.EMPTY;
var pos_2570 = (cljs.core.count(digits_2568) - (1));
var digits_2571__$1 = digits_2568;
while(true){
if(cljs.core.empty_QMARK_(digits_2571__$1)){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,acc_2569)], 0));
} else {
var digit_2572 = cljs.core.first(digits_2571__$1);
var G__2573 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),digit_2572))?acc_2569:cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc_2569,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(table,pos_2570),(digit_2572 - (1)))));
var G__2574 = (pos_2570 - (1));
var G__2575 = cljs.core.next(digits_2571__$1);
acc_2569 = G__2573;
pos_2570 = G__2574;
digits_2571__$1 = G__2575;
continue;
}
break;
}
} else {
cljs.pprint.format_integer((10),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530))," ",new cljs.core.Keyword(null,"commachar","commachar",(652859327)),",",new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(3),new cljs.core.Keyword(null,"colon","colon",(-965200945)),true], null),cljs.pprint.init_navigator(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg], null)),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),(0),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),(0),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),(0),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),(0)], null));
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_roman;},new cljs.core.Symbol("cljs.pprint","format-roman","cljs.pprint/format-roman",(1615397806),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-roman","format-roman",(1754166357),null),"cljs/pprint.cljs",(20),(1),(1310),(1310),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"table","table",(1075588491),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),"Format a roman numeral using the specified look-up table",(cljs.core.truth_(cljs.pprint.format_roman)?cljs.pprint.format_roman.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_old_roman = (function cljs$pprint$format_old_roman(params,navigator,offsets){
return cljs.pprint.format_roman(cljs.pprint.old_roman_table,params,navigator,offsets);
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_old_roman;},new cljs.core.Symbol("cljs.pprint","format-old-roman","cljs.pprint/format-old-roman",(1360793375),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-old-roman","format-old-roman",(1591023056),null),"cljs/pprint.cljs",(24),(1),(1334),(1334),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_old_roman)?cljs.pprint.format_old_roman.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_new_roman = (function cljs$pprint$format_new_roman(params,navigator,offsets){
return cljs.pprint.format_roman(cljs.pprint.new_roman_table,params,navigator,offsets);
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_new_roman;},new cljs.core.Symbol("cljs.pprint","format-new-roman","cljs.pprint/format-new-roman",(1367436567),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-new-roman","format-new-roman",(1229354844),null),"cljs/pprint.cljs",(24),(1),(1337),(1337),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_new_roman)?cljs.pprint.format_new_roman.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.special_chars = new cljs.core.PersistentArrayMap(null, 5, [(8),"Backspace",(9),"Tab",(10),"Newline",(13),"Return",(32),"Space"], null); return (
new cljs.core.Var(function(){return cljs.pprint.special_chars;},new cljs.core.Symbol("cljs.pprint","special-chars","cljs.pprint/special-chars",(1952905452),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"special-chars","special-chars",(2101219619),null),"cljs/pprint.cljs",(19),(1),(1344),(1345),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.special_chars)?cljs.pprint.special_chars.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pretty_character = (function cljs$pprint$pretty_character(params,navigator,offsets){
var vec__2579 = cljs.pprint.next_arg(navigator);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2579,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2579,(1),null);
var as_int = cljs.pprint.char_code(c);
var base_char = (as_int & (127));
var meta = (as_int & (128));
var special = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.pprint.special_chars,base_char);
if((meta > (0))){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Meta-"], 0));
} else {
}

cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(special)?special:(((base_char < (32)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Control-"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.char$((base_char + (64))))].join(''):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(base_char,(127)))?"Control-?":cljs.core.char$(base_char)
)))], 0));

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pretty_character;},new cljs.core.Symbol("cljs.pprint","pretty-character","cljs.pprint/pretty-character",(2012399240),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pretty-character","pretty-character",(1882859697),null),"cljs/pprint.cljs",(24),(1),(1347),(1347),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.pretty_character)?cljs.pprint.pretty_character.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.readable_character = (function cljs$pprint$readable_character(params,navigator,offsets){
var vec__2588 = cljs.pprint.next_arg(navigator);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2588,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2588,(1),null);
var pred__2591_2594 = cljs.core._EQ_;
var expr__2592_2595 = new cljs.core.Keyword(null,"char-format","char-format",(-1016499218)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_((pred__2591_2594.cljs$core$IFn$_invoke$arity$2 ? pred__2591_2594.cljs$core$IFn$_invoke$arity$2("o",expr__2592_2595) : pred__2591_2594.call(null,"o",expr__2592_2595)))){
cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic(true,"\\o~3, '0o",cljs.core.array_seq([cljs.pprint.char_code(c)], 0));
} else {
if(cljs.core.truth_((pred__2591_2594.cljs$core$IFn$_invoke$arity$2 ? pred__2591_2594.cljs$core$IFn$_invoke$arity$2("u",expr__2592_2595) : pred__2591_2594.call(null,"u",expr__2592_2595)))){
cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic(true,"\\u~4, '0x",cljs.core.array_seq([cljs.pprint.char_code(c)], 0));
} else {
if(cljs.core.truth_((pred__2591_2594.cljs$core$IFn$_invoke$arity$2 ? pred__2591_2594.cljs$core$IFn$_invoke$arity$2(null,expr__2592_2595) : pred__2591_2594.call(null,null,expr__2592_2595)))){
cljs.pprint.print_char(c);
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2592_2595)].join('')));
}
}
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.readable_character;},new cljs.core.Symbol("cljs.pprint","readable-character","cljs.pprint/readable-character",(972991432),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"readable-character","readable-character",(818257153),null),"cljs/pprint.cljs",(26),(1),(1361),(1361),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.readable_character)?cljs.pprint.readable_character.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.plain_character = (function cljs$pprint$plain_character(params,navigator,offsets){
var vec__2599 = cljs.pprint.next_arg(navigator);
var char$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2599,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2599,(1),null);
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([char$], 0));

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.plain_character;},new cljs.core.Symbol("cljs.pprint","plain-character","cljs.pprint/plain-character",(-1637766821),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"plain-character","plain-character",(-2027519204),null),"cljs/pprint.cljs",(23),(1),(1369),(1369),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.plain_character)?cljs.pprint.plain_character.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.abort_QMARK_ = (function cljs$pprint$abort_QMARK_(context){
var token = cljs.core.first(context);
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),token)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon-up-arrow","colon-up-arrow",(244853007)),token));
}); return (
new cljs.core.Var(function(){return cljs.pprint.abort_QMARK_;},new cljs.core.Symbol("cljs.pprint","abort?","cljs.pprint/abort?",(-1002889391),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"abort?","abort?",(-588189414),null),"cljs/pprint.cljs",(14),(1),(1376),(1376),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"context","context",(810340414),null)], null)),null,(cljs.core.truth_(cljs.pprint.abort_QMARK_)?cljs.pprint.abort_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.execute_sub_format = (function cljs$pprint$execute_sub_format(format,args,base_args){
return cljs.core.second(cljs.pprint.map_passing_context((function (element,context){
if(cljs.core.truth_(cljs.pprint.abort_QMARK_(context))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,context], null);
} else {
var vec__2608 = cljs.pprint.realize_parameter_list(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(element),context);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2608,(0),null);
var args__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2608,(1),null);
var vec__2611 = cljs.pprint.unzip_map(params);
var params__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2611,(0),null);
var offsets = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2611,(1),null);
var params__$2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(params__$1,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)),base_args);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"func","func",(-238706040)).cljs$core$IFn$_invoke$arity$1(element),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [params__$2,args__$1,offsets], null))], null);
}
}),args,format));
}); return (
new cljs.core.Var(function(){return cljs.pprint.execute_sub_format;},new cljs.core.Symbol("cljs.pprint","execute-sub-format","cljs.pprint/execute-sub-format",(-551239716),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"execute-sub-format","execute-sub-format",(-664821275),null),"cljs/pprint.cljs",(26),(1),(1381),(1381),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"base-args","base-args",(371824705),null)], null)),null,(cljs.core.truth_(cljs.pprint.execute_sub_format)?cljs.pprint.execute_sub_format.cljs$lang$test:null)])));})()
;
/**
 * Produce string parts for the mantissa (normalize 1-9) and exponent
 */
(function (){
cljs.pprint.float_parts_base = (function cljs$pprint$float_parts_base(f){
var s = clojure.string.lower_case([cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join(''));
var exploc = s.indexOf("e");
var dotloc = s.indexOf(".");
if((exploc < (0))){
if((dotloc < (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,[cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.count(s) - (1)))].join('')], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),dotloc)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(dotloc + (1))))].join(''),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((dotloc - (1)))].join('')], null);
}
} else {
if((dotloc < (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),exploc),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(exploc + (1)))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),(1))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(2),exploc))].join(''),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(exploc + (1)))], null);
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.float_parts_base;},new cljs.core.Symbol("cljs.pprint","float-parts-base","cljs.pprint/float-parts-base",(-1353423281),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"float-parts-base","float-parts-base",(-1750230906),null),"cljs/pprint.cljs",(24),(1),(1399),(1399),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",(43394975),null)], null)),"Produce string parts for the mantissa (normalize 1-9) and exponent",(cljs.core.truth_(cljs.pprint.float_parts_base)?cljs.pprint.float_parts_base.cljs$lang$test:null)])));})()
;
/**
 * Take care of leading and trailing zeros in decomposed floats
 */
(function (){
cljs.pprint.float_parts = (function cljs$pprint$float_parts(f){
var vec__2617 = cljs.pprint.float_parts_base(f);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2617,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2617,(1),null);
var m1 = cljs.pprint.rtrim(m,"0");
var m2 = cljs.pprint.ltrim(m1,"0");
var delta = (cljs.core.count(m1) - cljs.core.count(m2));
var e__$1 = ((((cljs.core.count(e) > (0))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(e,(0)),"+")))?cljs.core.subs.cljs$core$IFn$_invoke$arity$2(e,(1)):e);
if(cljs.core.empty_QMARK_(m2)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["0",(0)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [m2,(parseInt(e__$1,(10)) - delta)], null);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.float_parts;},new cljs.core.Symbol("cljs.pprint","float-parts","cljs.pprint/float-parts",(1629782111),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"float-parts","float-parts",(1718467094),null),"cljs/pprint.cljs",(19),(1),(1413),(1413),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",(43394975),null)], null)),"Take care of leading and trailing zeros in decomposed floats",(cljs.core.truth_(cljs.pprint.float_parts)?cljs.pprint.float_parts.cljs$lang$test:null)])));})()
;
/**
 * Assumption: The input string consists of one or more decimal digits,
 *   and no other characters. Return a string containing one or more
 *   decimal digits containing a decimal number one larger than the input
 *   string. The output string will always be the same length as the input
 *   string, or one character longer.
 */
(function (){
cljs.pprint.inc_s = (function cljs$pprint$inc_s(s){
var len_1 = (cljs.core.count(s) - (1));
var i = (len_1 | (0));
while(true){
if((i < (0))){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.str,"1",cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((len_1 + (1)),"0"));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("9",s.charAt(i))){
var G__2620 = (i - (1));
i = G__2620;
continue;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.str,cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),i),cljs.core.char$((cljs.pprint.char_code(s.charAt(i)) + (1))),cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((len_1 - i),"0"));

}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.inc_s;},new cljs.core.Symbol("cljs.pprint","inc-s","cljs.pprint/inc-s",(-471975637),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"inc-s","inc-s",(-353941652),null),"cljs/pprint.cljs",(13),(1),(1425),(1425),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),"Assumption: The input string consists of one or more decimal digits,\n  and no other characters. Return a string containing one or more\n  decimal digits containing a decimal number one larger than the input\n  string. The output string will always be the same length as the input\n  string, or one character longer.",(cljs.core.truth_(cljs.pprint.inc_s)?cljs.pprint.inc_s.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.round_str = (function cljs$pprint$round_str(m,e,d,w){
if(cljs.core.truth_((function (){var or__22603__auto__ = d;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return w;
}
})())){
var len = cljs.core.count(m);
var w__$1 = (cljs.core.truth_(w)?(function (){var x__23388__auto__ = (2);
var y__23389__auto__ = w;
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})():(0));
var round_pos = (cljs.core.truth_(d)?((e + d) + (1)):(((e >= (0)))?(function (){var x__23388__auto__ = (e + (1));
var y__23389__auto__ = (w__$1 - (1));
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})():(w__$1 + e)
));
var vec__2624 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(round_pos,(0)))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1("0"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(m)].join(''),(e + (1)),(1),(len + (1))], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,e,round_pos,len], null));
var m1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2624,(0),null);
var e1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2624,(1),null);
var round_pos__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2624,(2),null);
var len__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2624,(3),null);
if(cljs.core.truth_(round_pos__$1)){
if((round_pos__$1 < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["0",(0),false], null);
} else {
if((len__$1 > round_pos__$1)){
var round_char = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(m1,round_pos__$1);
var result = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(m1,(0),round_pos__$1);
if((cljs.pprint.char_code(round_char) >= cljs.pprint.char_code("5"))){
var round_up_result = cljs.pprint.inc_s(result);
var expanded = (cljs.core.count(round_up_result) > cljs.core.count(result));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((expanded)?cljs.core.subs.cljs$core$IFn$_invoke$arity$3(round_up_result,(0),(cljs.core.count(round_up_result) - (1))):round_up_result),e1,expanded], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,e1,false], null);
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,e,false], null);
}
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,e,false], null);
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,e,false], null);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.round_str;},new cljs.core.Symbol("cljs.pprint","round-str","cljs.pprint/round-str",(-191525395),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"round-str","round-str",(-35816668),null),"cljs/pprint.cljs",(17),(1),(1441),(1441),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"e","e",(-1273166571),null),new cljs.core.Symbol(null,"d","d",(-682293345),null),new cljs.core.Symbol(null,"w","w",(1994700528),null)], null)),null,(cljs.core.truth_(cljs.pprint.round_str)?cljs.pprint.round_str.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.expand_fixed = (function cljs$pprint$expand_fixed(m,e,d){
var vec__2630 = (((e < (0)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((- e) - (1)),"0"))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(m)].join(''),(-1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,e], null));
var m1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2630,(0),null);
var e1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2630,(1),null);
var len = cljs.core.count(m1);
var target_len = (cljs.core.truth_(d)?((e1 + d) + (1)):(e1 + (1)));
if((len < target_len)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(m1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((target_len - len),"0")))].join('');
} else {
return m1;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.expand_fixed;},new cljs.core.Symbol("cljs.pprint","expand-fixed","cljs.pprint/expand-fixed",(1233867645),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"expand-fixed","expand-fixed",(1087399220),null),"cljs/pprint.cljs",(20),(1),(1487),(1487),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"e","e",(-1273166571),null),new cljs.core.Symbol(null,"d","d",(-682293345),null)], null)),null,(cljs.core.truth_(cljs.pprint.expand_fixed)?cljs.pprint.expand_fixed.cljs$lang$test:null)])));})()
;
/**
 * Insert the decimal point at the right spot in the number to match an exponent
 */
(function (){
cljs.pprint.insert_decimal = (function cljs$pprint$insert_decimal(m,e){
if((e < (0))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("."),cljs.core.str.cljs$core$IFn$_invoke$arity$1(m)].join('');
} else {
var loc = (e + (1));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(m,(0),loc)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("."),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(m,loc))].join('');
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.insert_decimal;},new cljs.core.Symbol("cljs.pprint","insert-decimal","cljs.pprint/insert-decimal",(-1775580107),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"insert-decimal","insert-decimal",(-1894570294),null),"cljs/pprint.cljs",(22),(1),(1497),(1497),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"e","e",(-1273166571),null)], null)),"Insert the decimal point at the right spot in the number to match an exponent",(cljs.core.truth_(cljs.pprint.insert_decimal)?cljs.pprint.insert_decimal.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.get_fixed = (function cljs$pprint$get_fixed(m,e,d){
return cljs.pprint.insert_decimal(cljs.pprint.expand_fixed(m,e,d),e);
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_fixed;},new cljs.core.Symbol("cljs.pprint","get-fixed","cljs.pprint/get-fixed",(-1700541856),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-fixed","get-fixed",(-1846890055),null),"cljs/pprint.cljs",(17),(1),(1505),(1505),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"e","e",(-1273166571),null),new cljs.core.Symbol(null,"d","d",(-682293345),null)], null)),null,(cljs.core.truth_(cljs.pprint.get_fixed)?cljs.pprint.get_fixed.cljs$lang$test:null)])));})()
;
/**
 * Insert the decimal point at the right spot in the number to match an exponent
 */
(function (){
cljs.pprint.insert_scaled_decimal = (function cljs$pprint$insert_scaled_decimal(m,k){
if((k < (0))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("."),cljs.core.str.cljs$core$IFn$_invoke$arity$1(m)].join('');
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(m,(0),k)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("."),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(m,k))].join('');
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.insert_scaled_decimal;},new cljs.core.Symbol("cljs.pprint","insert-scaled-decimal","cljs.pprint/insert-scaled-decimal",(89995341),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"insert-scaled-decimal","insert-scaled-decimal",(1007029892),null),"cljs/pprint.cljs",(29),(1),(1508),(1508),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Symbol(null,"k","k",(-505765866),null)], null)),"Insert the decimal point at the right spot in the number to match an exponent",(cljs.core.truth_(cljs.pprint.insert_scaled_decimal)?cljs.pprint.insert_scaled_decimal.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.convert_ratio = (function cljs$pprint$convert_ratio(x){
return x;
}); return (
new cljs.core.Var(function(){return cljs.pprint.convert_ratio;},new cljs.core.Symbol("cljs.pprint","convert-ratio","cljs.pprint/convert-ratio",(-78733243),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"convert-ratio","convert-ratio",(42585660),null),"cljs/pprint.cljs",(21),(1),(1516),(1516),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),null,(cljs.core.truth_(cljs.pprint.convert_ratio)?cljs.pprint.convert_ratio.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.fixed_float = (function cljs$pprint$fixed_float(params,navigator,offsets){
var w = new cljs.core.Keyword(null,"w","w",(354169001)).cljs$core$IFn$_invoke$arity$1(params);
var d = new cljs.core.Keyword(null,"d","d",(1972142424)).cljs$core$IFn$_invoke$arity$1(params);
var vec__2645 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2645,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2645,(1),null);
var vec__2648 = (((arg < (0)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["-",(- arg)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["+",arg], null));
var sign = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2648,(0),null);
var abs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2648,(1),null);
var abs__$1 = cljs.pprint.convert_ratio(abs);
var vec__2651 = cljs.pprint.float_parts(abs__$1);
var mantissa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2651,(0),null);
var exp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2651,(1),null);
var scaled_exp = (exp + new cljs.core.Keyword(null,"k","k",(-2146297393)).cljs$core$IFn$_invoke$arity$1(params));
var add_sign = (function (){var or__22603__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (arg < (0));
}
})();
var append_zero = (cljs.core.not(d)) && (((cljs.core.count(mantissa) - (1)) <= scaled_exp));
var vec__2654 = cljs.pprint.round_str(mantissa,scaled_exp,d,(cljs.core.truth_(w)?(w - (cljs.core.truth_(add_sign)?(1):(0))):null));
var rounded_mantissa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2654,(0),null);
var scaled_exp__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2654,(1),null);
var expanded = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2654,(2),null);
var fixed_repr = cljs.pprint.get_fixed(rounded_mantissa,(cljs.core.truth_(expanded)?(scaled_exp__$1 + (1)):scaled_exp__$1),d);
var fixed_repr__$1 = (cljs.core.truth_((function (){var and__22563__auto__ = w;
if(cljs.core.truth_(and__22563__auto__)){
var and__22563__auto____$1 = d;
if(cljs.core.truth_(and__22563__auto____$1)){
return ((d >= (1))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(fixed_repr.charAt((0)),"0")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(fixed_repr.charAt((1)),".")) && ((cljs.core.count(fixed_repr) > (w - (cljs.core.truth_(add_sign)?(1):(0)))));
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
})())?cljs.core.subs.cljs$core$IFn$_invoke$arity$2(fixed_repr,(1)):fixed_repr);
var prepend_zero = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(fixed_repr__$1),".");
if(cljs.core.truth_(w)){
var len_2657 = cljs.core.count(fixed_repr__$1);
var signed_len_2658 = (cljs.core.truth_(add_sign)?(len_2657 + (1)):len_2657);
var prepend_zero_2659__$1 = (prepend_zero) && (!((signed_len_2658 >= w)));
var append_zero_2660__$1 = (append_zero) && (!((signed_len_2658 >= w)));
var full_len_2661 = (((prepend_zero_2659__$1) || (append_zero_2660__$1))?(signed_len_2658 + (1)):signed_len_2658);
if(cljs.core.truth_((function (){var and__22563__auto__ = (full_len_2661 > w);
if(and__22563__auto__){
return new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)).cljs$core$IFn$_invoke$arity$1(params);
} else {
return and__22563__auto__;
}
})())){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(w,new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)).cljs$core$IFn$_invoke$arity$1(params)))], 0));
} else {
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((w - full_len_2661),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(add_sign)?sign:null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((prepend_zero_2659__$1)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fixed_repr__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((append_zero_2660__$1)?"0":null))].join('')], 0));
}
} else {
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(add_sign)?sign:null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((prepend_zero)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fixed_repr__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((append_zero)?"0":null))].join('')], 0));
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.fixed_float;},new cljs.core.Symbol("cljs.pprint","fixed-float","cljs.pprint/fixed-float",(-1385724630),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"fixed-float","fixed-float",(-1539392659),null),"cljs/pprint.cljs",(19),(1),(1521),(1521),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.fixed_float)?cljs.pprint.fixed_float.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.exponential_float = (function cljs$pprint$exponential_float(params,navigator,offset){
var vec__2678 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2678,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2678,(1),null);
var arg__$1 = cljs.pprint.convert_ratio(arg);
var G__2684_2694 = cljs.pprint.float_parts((((arg__$1 < (0)))?(- arg__$1):arg__$1));
var vec__2685_2695 = G__2684_2694;
var mantissa_2696 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2685_2695,(0),null);
var exp_2697 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2685_2695,(1),null);
var G__2684_2698__$1 = G__2684_2694;
while(true){
var vec__2688_2699 = G__2684_2698__$1;
var mantissa_2700__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2688_2699,(0),null);
var exp_2701__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2688_2699,(1),null);
var w_2702 = new cljs.core.Keyword(null,"w","w",(354169001)).cljs$core$IFn$_invoke$arity$1(params);
var d_2703 = new cljs.core.Keyword(null,"d","d",(1972142424)).cljs$core$IFn$_invoke$arity$1(params);
var e_2704 = new cljs.core.Keyword(null,"e","e",(1381269198)).cljs$core$IFn$_invoke$arity$1(params);
var k_2705 = new cljs.core.Keyword(null,"k","k",(-2146297393)).cljs$core$IFn$_invoke$arity$1(params);
var expchar_2706 = (function (){var or__22603__auto__ = new cljs.core.Keyword(null,"exponentchar","exponentchar",(1986664222)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return "E";
}
})();
var add_sign_2707 = (function (){var or__22603__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (arg__$1 < (0));
}
})();
var prepend_zero_2708 = (k_2705 <= (0));
var scaled_exp_2709 = (exp_2701__$1 - (k_2705 - (1)));
var scaled_exp_str_2710 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.abs(scaled_exp_2709))].join('');
var scaled_exp_str_2711__$1 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(expchar_2706),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((scaled_exp_2709 < (0)))?"-":"+")),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(e_2704)?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((e_2704 - cljs.core.count(scaled_exp_str_2710)),"0")):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(scaled_exp_str_2710)].join('');
var exp_width_2712 = cljs.core.count(scaled_exp_str_2711__$1);
var base_mantissa_width_2713 = cljs.core.count(mantissa_2700__$1);
var scaled_mantissa_2714 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((- k_2705),"0"))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mantissa_2700__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(d_2703)?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((d_2703 - (base_mantissa_width_2713 - (1))) - (((k_2705 < (0)))?(- k_2705):(0))),"0")):null))].join('');
var w_mantissa_2715 = (cljs.core.truth_(w_2702)?(w_2702 - exp_width_2712):null);
var vec__2691_2716 = cljs.pprint.round_str(scaled_mantissa_2714,(0),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k_2705,(0)))?(d_2703 - (1)):(((k_2705 > (0)))?d_2703:(((k_2705 < (0)))?(d_2703 - (1)):null))),(cljs.core.truth_(w_mantissa_2715)?(w_mantissa_2715 - (cljs.core.truth_(add_sign_2707)?(1):(0))):null));
var rounded_mantissa_2717 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2691_2716,(0),null);
var __2718 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2691_2716,(1),null);
var incr_exp_2719 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2691_2716,(2),null);
var full_mantissa_2720 = cljs.pprint.insert_scaled_decimal(rounded_mantissa_2717,k_2705);
var append_zero_2721 = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k_2705,cljs.core.count(rounded_mantissa_2717))) && ((d_2703 == null));
if(cljs.core.not(incr_exp_2719)){
if(cljs.core.truth_(w_2702)){
var len_2722 = (cljs.core.count(full_mantissa_2720) + exp_width_2712);
var signed_len_2723 = (cljs.core.truth_(add_sign_2707)?(len_2722 + (1)):len_2722);
var prepend_zero_2724__$1 = (prepend_zero_2708) && (!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(signed_len_2723,w_2702)));
var full_len_2725 = ((prepend_zero_2724__$1)?(signed_len_2723 + (1)):signed_len_2723);
var append_zero_2726__$1 = (append_zero_2721) && ((full_len_2725 < w_2702));
if(cljs.core.truth_((function (){var and__22563__auto__ = (function (){var or__22603__auto__ = (full_len_2725 > w_2702);
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = e_2704;
if(cljs.core.truth_(and__22563__auto__)){
return ((exp_width_2712 - (2)) > e_2704);
} else {
return and__22563__auto__;
}
}
})();
if(cljs.core.truth_(and__22563__auto__)){
return new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)).cljs$core$IFn$_invoke$arity$1(params);
} else {
return and__22563__auto__;
}
})())){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(w_2702,new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)).cljs$core$IFn$_invoke$arity$1(params)))], 0));
} else {
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((w_2702 - full_len_2725) - ((append_zero_2726__$1)?(1):(0))),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(add_sign_2707)?(((arg__$1 < (0)))?"-":"+"):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((prepend_zero_2724__$1)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_mantissa_2720),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((append_zero_2726__$1)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(scaled_exp_str_2711__$1)].join('')], 0));
}
} else {
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(add_sign_2707)?(((arg__$1 < (0)))?"-":"+"):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((prepend_zero_2708)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_mantissa_2720),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((append_zero_2721)?"0":null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(scaled_exp_str_2711__$1)].join('')], 0));
}
} else {
var G__2727 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rounded_mantissa_2717,(exp_2701__$1 + (1))], null);
G__2684_2698__$1 = G__2727;
continue;
}
break;
}

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.exponential_float;},new cljs.core.Symbol("cljs.pprint","exponential-float","cljs.pprint/exponential-float",(-1250682590),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"exponential-float","exponential-float",(-1405284485),null),"cljs/pprint.cljs",(25),(1),(1568),(1568),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.exponential_float)?cljs.pprint.exponential_float.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.general_float = (function cljs$pprint$general_float(params,navigator,offsets){
var vec__2734 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2734,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2734,(1),null);
var arg__$1 = cljs.pprint.convert_ratio(arg);
var vec__2737 = cljs.pprint.float_parts((((arg__$1 < (0)))?(- arg__$1):arg__$1));
var mantissa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2737,(0),null);
var exp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2737,(1),null);
var w = new cljs.core.Keyword(null,"w","w",(354169001)).cljs$core$IFn$_invoke$arity$1(params);
var d = new cljs.core.Keyword(null,"d","d",(1972142424)).cljs$core$IFn$_invoke$arity$1(params);
var e = new cljs.core.Keyword(null,"e","e",(1381269198)).cljs$core$IFn$_invoke$arity$1(params);
var n = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(arg__$1,(0)))?(0):(exp + (1)));
var ee = (cljs.core.truth_(e)?(e + (2)):(4));
var ww = (cljs.core.truth_(w)?(w - ee):null);
var d__$1 = (cljs.core.truth_(d)?d:(function (){var x__23388__auto__ = cljs.core.count(mantissa);
var y__23389__auto__ = (function (){var x__23403__auto__ = n;
var y__23404__auto__ = (7);
return ((x__23403__auto__ < y__23404__auto__) ? x__23403__auto__ : y__23404__auto__);
})();
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})());
var dd = (d__$1 - n);
if((((0) <= dd)) && ((dd <= d__$1))){
var navigator__$1 = cljs.pprint.fixed_float(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"w","w",(354169001)),ww,new cljs.core.Keyword(null,"d","d",(1972142424)),dd,new cljs.core.Keyword(null,"k","k",(-2146297393)),(0),new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)),new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"at","at",(1476951349)),new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params)], null),navigator,offsets);
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(ee," "))], 0));

return navigator__$1;
} else {
return cljs.pprint.exponential_float(params,navigator,offsets);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.general_float;},new cljs.core.Symbol("cljs.pprint","general-float","cljs.pprint/general-float",(-1073206146),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"general-float","general-float",(-885976569),null),"cljs/pprint.cljs",(21),(1),(1642),(1642),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.general_float)?cljs.pprint.general_float.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.dollar_float = (function cljs$pprint$dollar_float(params,navigator,offsets){
var vec__2749 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2749,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2749,(1),null);
var vec__2752 = cljs.pprint.float_parts(Math.abs(arg));
var mantissa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2752,(0),null);
var exp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2752,(1),null);
var d = new cljs.core.Keyword(null,"d","d",(1972142424)).cljs$core$IFn$_invoke$arity$1(params);
var n = new cljs.core.Keyword(null,"n","n",(562130025)).cljs$core$IFn$_invoke$arity$1(params);
var w = new cljs.core.Keyword(null,"w","w",(354169001)).cljs$core$IFn$_invoke$arity$1(params);
var add_sign = (function (){var or__22603__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (arg < (0));
}
})();
var vec__2755 = cljs.pprint.round_str(mantissa,exp,d,null);
var rounded_mantissa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2755,(0),null);
var scaled_exp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2755,(1),null);
var expanded = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2755,(2),null);
var fixed_repr = cljs.pprint.get_fixed(rounded_mantissa,(cljs.core.truth_(expanded)?(scaled_exp + (1)):scaled_exp),d);
var full_repr = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((n - fixed_repr.indexOf(".")),"0"))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fixed_repr)].join('');
var full_len = (cljs.core.count(full_repr) + (cljs.core.truth_(add_sign)?(1):(0)));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var and__22563__auto__ = new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(and__22563__auto__)){
return add_sign;
} else {
return and__22563__auto__;
}
})())?(((arg < (0)))?"-":"+"):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((w - full_len),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var and__22563__auto__ = cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params));
if(and__22563__auto__){
return add_sign;
} else {
return and__22563__auto__;
}
})())?(((arg < (0)))?"-":"+"):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_repr)].join('')], 0));

return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.dollar_float;},new cljs.core.Symbol("cljs.pprint","dollar-float","cljs.pprint/dollar-float",(-558484038),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"dollar-float","dollar-float",(-680451101),null),"cljs/pprint.cljs",(20),(1),(1665),(1665),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.dollar_float)?cljs.pprint.dollar_float.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.choice_conditional = (function cljs$pprint$choice_conditional(params,arg_navigator,offsets){
var arg = new cljs.core.Keyword(null,"selector","selector",(762528866)).cljs$core$IFn$_invoke$arity$1(params);
var vec__2761 = (cljs.core.truth_(arg)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg,arg_navigator], null):cljs.pprint.next_arg(arg_navigator));
var arg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2761,(0),null);
var navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2761,(1),null);
var clauses = new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params);
var clause = ((((arg__$1 < (0))) || ((arg__$1 >= cljs.core.count(clauses))))?cljs.core.first(new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(params)):cljs.core.nth.cljs$core$IFn$_invoke$arity$2(clauses,arg__$1));
if(cljs.core.truth_(clause)){
return cljs.pprint.execute_sub_format(clause,navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
} else {
return navigator;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.choice_conditional;},new cljs.core.Symbol("cljs.pprint","choice-conditional","cljs.pprint/choice-conditional",(275301505),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"choice-conditional","choice-conditional",(681033432),null),"cljs/pprint.cljs",(26),(1),(1691),(1691),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"arg-navigator","arg-navigator",(1660575364),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.choice_conditional)?cljs.pprint.choice_conditional.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.boolean_conditional = (function cljs$pprint$boolean_conditional(params,arg_navigator,offsets){
var vec__2767 = cljs.pprint.next_arg(arg_navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2767,(0),null);
var navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2767,(1),null);
var clauses = new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params);
var clause = (cljs.core.truth_(arg)?cljs.core.second(clauses):cljs.core.first(clauses));
if(cljs.core.truth_(clause)){
return cljs.pprint.execute_sub_format(clause,navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
} else {
return navigator;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.boolean_conditional;},new cljs.core.Symbol("cljs.pprint","boolean-conditional","cljs.pprint/boolean-conditional",(-1211189447),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"boolean-conditional","boolean-conditional",(-1090040382),null),"cljs/pprint.cljs",(27),(1),(1703),(1703),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"arg-navigator","arg-navigator",(1660575364),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.boolean_conditional)?cljs.pprint.boolean_conditional.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.check_arg_conditional = (function cljs$pprint$check_arg_conditional(params,arg_navigator,offsets){
var vec__2773 = cljs.pprint.next_arg(arg_navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2773,(0),null);
var navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2773,(1),null);
var clauses = new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params);
var clause = (cljs.core.truth_(arg)?cljs.core.first(clauses):null);
if(cljs.core.truth_(arg)){
if(cljs.core.truth_(clause)){
return cljs.pprint.execute_sub_format(clause,arg_navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
} else {
return arg_navigator;
}
} else {
return navigator;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.check_arg_conditional;},new cljs.core.Symbol("cljs.pprint","check-arg-conditional","cljs.pprint/check-arg-conditional",(1514169856),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"check-arg-conditional","check-arg-conditional",(1393118297),null),"cljs/pprint.cljs",(29),(1),(1715),(1715),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"arg-navigator","arg-navigator",(1660575364),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.check_arg_conditional)?cljs.pprint.check_arg_conditional.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.iterate_sublist = (function cljs$pprint$iterate_sublist(params,navigator,offsets){
var max_count = new cljs.core.Keyword(null,"max-iterations","max-iterations",(2021275563)).cljs$core$IFn$_invoke$arity$1(params);
var param_clause = cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params));
var vec__2782 = ((cljs.core.empty_QMARK_(param_clause))?cljs.pprint.get_format_arg(navigator):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_clause,navigator], null));
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2782,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2782,(1),null);
var vec__2785 = cljs.pprint.next_arg(navigator__$1);
var arg_list = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2785,(0),null);
var navigator__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2785,(1),null);
var args = cljs.pprint.init_navigator(arg_list);
var count = (0);
var args__$1 = args;
var last_pos = ((-1) | (0));
while(true){
if((cljs.core.not(max_count)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(args__$1),last_pos)) && ((count > (1)))){
throw Error("%{ construct not consuming any arguments: Infinite loop!");
} else {
}

if(cljs.core.truth_((function (){var or__22603__auto__ = (cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(args__$1))) && ((cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)).cljs$core$IFn$_invoke$arity$1(params)))) || ((count > (0))));
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = max_count;
if(cljs.core.truth_(and__22563__auto__)){
return (count >= max_count);
} else {
return and__22563__auto__;
}
}
})())){
return navigator__$2;
} else {
var iter_result = cljs.pprint.execute_sub_format(clause,args__$1,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),cljs.core.first(iter_result))){
return navigator__$2;
} else {
var G__2788 = (count + (1));
var G__2789 = iter_result;
var G__2790 = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(args__$1);
count = G__2788;
args__$1 = G__2789;
last_pos = G__2790;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.iterate_sublist;},new cljs.core.Symbol("cljs.pprint","iterate-sublist","cljs.pprint/iterate-sublist",(442089011),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"iterate-sublist","iterate-sublist",(286303354),null),"cljs/pprint.cljs",(23),(1),(1732),(1732),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.iterate_sublist)?cljs.pprint.iterate_sublist.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.iterate_list_of_sublists = (function cljs$pprint$iterate_list_of_sublists(params,navigator,offsets){
var max_count = new cljs.core.Keyword(null,"max-iterations","max-iterations",(2021275563)).cljs$core$IFn$_invoke$arity$1(params);
var param_clause = cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params));
var vec__2797 = ((cljs.core.empty_QMARK_(param_clause))?cljs.pprint.get_format_arg(navigator):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_clause,navigator], null));
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2797,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2797,(1),null);
var vec__2800 = cljs.pprint.next_arg(navigator__$1);
var arg_list = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2800,(0),null);
var navigator__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2800,(1),null);
var count = (0);
var arg_list__$1 = arg_list;
while(true){
if(cljs.core.truth_((function (){var or__22603__auto__ = (cljs.core.empty_QMARK_(arg_list__$1)) && ((cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)).cljs$core$IFn$_invoke$arity$1(params)))) || ((count > (0))));
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = max_count;
if(cljs.core.truth_(and__22563__auto__)){
return (count >= max_count);
} else {
return and__22563__auto__;
}
}
})())){
return navigator__$2;
} else {
var iter_result = cljs.pprint.execute_sub_format(clause,cljs.pprint.init_navigator(cljs.core.first(arg_list__$1)),cljs.pprint.init_navigator(cljs.core.next(arg_list__$1)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon-up-arrow","colon-up-arrow",(244853007)),cljs.core.first(iter_result))){
return navigator__$2;
} else {
var G__2803 = (count + (1));
var G__2804 = cljs.core.next(arg_list__$1);
count = G__2803;
arg_list__$1 = G__2804;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.iterate_list_of_sublists;},new cljs.core.Symbol("cljs.pprint","iterate-list-of-sublists","cljs.pprint/iterate-list-of-sublists",(-1207075887),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"iterate-list-of-sublists","iterate-list-of-sublists",(-1580053016),null),"cljs/pprint.cljs",(32),(1),(1757),(1757),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.iterate_list_of_sublists)?cljs.pprint.iterate_list_of_sublists.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.iterate_main_list = (function cljs$pprint$iterate_main_list(params,navigator,offsets){
var max_count = new cljs.core.Keyword(null,"max-iterations","max-iterations",(2021275563)).cljs$core$IFn$_invoke$arity$1(params);
var param_clause = cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params));
var vec__2808 = ((cljs.core.empty_QMARK_(param_clause))?cljs.pprint.get_format_arg(navigator):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_clause,navigator], null));
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2808,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2808,(1),null);
var count = (0);
var navigator__$2 = navigator__$1;
var last_pos = ((-1) | (0));
while(true){
if((cljs.core.not(max_count)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator__$2),last_pos)) && ((count > (1)))){
throw Error("%@{ construct not consuming any arguments: Infinite loop!");
} else {
}

if(cljs.core.truth_((function (){var or__22603__auto__ = (cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator__$2))) && ((cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)).cljs$core$IFn$_invoke$arity$1(params)))) || ((count > (0))));
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = max_count;
if(cljs.core.truth_(and__22563__auto__)){
return (count >= max_count);
} else {
return and__22563__auto__;
}
}
})())){
return navigator__$2;
} else {
var iter_result = cljs.pprint.execute_sub_format(clause,navigator__$2,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),cljs.core.first(iter_result))){
return cljs.core.second(iter_result);
} else {
var G__2811 = (count + (1));
var G__2812 = iter_result;
var G__2813 = new cljs.core.Keyword(null,"pos","pos",(-864607220)).cljs$core$IFn$_invoke$arity$1(navigator__$2);
count = G__2811;
navigator__$2 = G__2812;
last_pos = G__2813;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.iterate_main_list;},new cljs.core.Symbol("cljs.pprint","iterate-main-list","cljs.pprint/iterate-main-list",(-1453679564),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"iterate-main-list","iterate-main-list",(-1604210067),null),"cljs/pprint.cljs",(25),(1),(1780),(1780),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.iterate_main_list)?cljs.pprint.iterate_main_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.iterate_main_sublists = (function cljs$pprint$iterate_main_sublists(params,navigator,offsets){
var max_count = new cljs.core.Keyword(null,"max-iterations","max-iterations",(2021275563)).cljs$core$IFn$_invoke$arity$1(params);
var param_clause = cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params));
var vec__2820 = ((cljs.core.empty_QMARK_(param_clause))?cljs.pprint.get_format_arg(navigator):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_clause,navigator], null));
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2820,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2820,(1),null);
var count = (0);
var navigator__$2 = navigator__$1;
while(true){
if(cljs.core.truth_((function (){var or__22603__auto__ = (cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator__$2))) && ((cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)).cljs$core$IFn$_invoke$arity$1(params)))) || ((count > (0))));
if(or__22603__auto__){
return or__22603__auto__;
} else {
var and__22563__auto__ = max_count;
if(cljs.core.truth_(and__22563__auto__)){
return (count >= max_count);
} else {
return and__22563__auto__;
}
}
})())){
return navigator__$2;
} else {
var vec__2823 = cljs.pprint.next_arg_or_nil(navigator__$2);
var sublist = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2823,(0),null);
var navigator__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2823,(1),null);
var iter_result = cljs.pprint.execute_sub_format(clause,cljs.pprint.init_navigator(sublist),navigator__$3);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon-up-arrow","colon-up-arrow",(244853007)),cljs.core.first(iter_result))){
return navigator__$3;
} else {
var G__2826 = (count + (1));
var G__2827 = navigator__$3;
count = G__2826;
navigator__$2 = G__2827;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.iterate_main_sublists;},new cljs.core.Symbol("cljs.pprint","iterate-main-sublists","cljs.pprint/iterate-main-sublists",(-1324721013),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"iterate-main-sublists","iterate-main-sublists",(-1204570430),null),"cljs/pprint.cljs",(29),(1),(1804),(1804),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.iterate_main_sublists)?cljs.pprint.iterate_main_sublists.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_logical_block; return (
new cljs.core.Var(function(){return cljs.pprint.format_logical_block;},new cljs.core.Symbol("cljs.pprint","format-logical-block","cljs.pprint/format-logical-block",(-1790043349),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-logical-block","format-logical-block",(-1408687662),null),"cljs/pprint.cljs",(30),(1),(1835),true,(1835),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.format_logical_block)?cljs.pprint.format_logical_block.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.justify_clauses; return (
new cljs.core.Var(function(){return cljs.pprint.justify_clauses;},new cljs.core.Symbol("cljs.pprint","justify-clauses","cljs.pprint/justify-clauses",(-110454534),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"justify-clauses","justify-clauses",(-265969117),null),"cljs/pprint.cljs",(25),(1),(1836),true,(1836),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.justify_clauses)?cljs.pprint.justify_clauses.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.logical_block_or_justify = (function cljs$pprint$logical_block_or_justify(params,navigator,offsets){
if(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)).cljs$core$IFn$_invoke$arity$1(params)))){
return (cljs.pprint.format_logical_block.cljs$core$IFn$_invoke$arity$3 ? cljs.pprint.format_logical_block.cljs$core$IFn$_invoke$arity$3(params,navigator,offsets) : cljs.pprint.format_logical_block.call(null,params,navigator,offsets));
} else {
return (cljs.pprint.justify_clauses.cljs$core$IFn$_invoke$arity$3 ? cljs.pprint.justify_clauses.cljs$core$IFn$_invoke$arity$3(params,navigator,offsets) : cljs.pprint.justify_clauses.call(null,params,navigator,offsets));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.logical_block_or_justify;},new cljs.core.Symbol("cljs.pprint","logical-block-or-justify","cljs.pprint/logical-block-or-justify",(-287393839),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"logical-block-or-justify","logical-block-or-justify",(-677914136),null),"cljs/pprint.cljs",(32),(1),(1838),(1838),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.logical_block_or_justify)?cljs.pprint.logical_block_or_justify.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.render_clauses = (function cljs$pprint$render_clauses(clauses,navigator,base_navigator){
var clauses__$1 = clauses;
var acc = cljs.core.PersistentVector.EMPTY;
var navigator__$1 = navigator;
while(true){
if(cljs.core.empty_QMARK_(clauses__$1)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,navigator__$1], null);
} else {
var clause = cljs.core.first(clauses__$1);
var vec__2832 = (function (){var sb = (new goog.string.StringBuffer());
var _STAR_out_STAR_2835 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = (new cljs.core.StringBufferWriter(sb));

try{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.pprint.execute_sub_format(clause,navigator__$1,base_navigator),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')], null);
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2835;
}})();
var iter_result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2832,(0),null);
var result_str = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2832,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),cljs.core.first(iter_result))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,cljs.core.second(iter_result)], null);
} else {
var G__2836 = cljs.core.next(clauses__$1);
var G__2837 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,result_str);
var G__2838 = iter_result;
clauses__$1 = G__2836;
acc = G__2837;
navigator__$1 = G__2838;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.render_clauses;},new cljs.core.Symbol("cljs.pprint","render-clauses","cljs.pprint/render-clauses",(417699772),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"render-clauses","render-clauses",(-516125325),null),"cljs/pprint.cljs",(22),(1),(1847),(1847),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"clauses","clauses",(-1199594528),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"base-navigator","base-navigator",(1619563041),null)], null)),null,(cljs.core.truth_(cljs.pprint.render_clauses)?cljs.pprint.render_clauses.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.justify_clauses = (function cljs$pprint$justify_clauses(params,navigator,offsets){
var vec__2852 = (function (){var temp__21890__auto__ = new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(temp__21890__auto__)){
var else$ = temp__21890__auto__;
return cljs.pprint.render_clauses(else$,navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
} else {
return null;
}
})();
var vec__2855 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2852,(0),null);
var eol_str = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2855,(0),null);
var new_navigator = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2852,(1),null);
var navigator__$1 = (function (){var or__22603__auto__ = new_navigator;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return navigator;
}
})();
var vec__2858 = (function (){var temp__21890__auto__ = new cljs.core.Keyword(null,"else-params","else-params",(-832171646)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(temp__21890__auto__)){
var p = temp__21890__auto__;
return cljs.pprint.realize_parameter_list(p,navigator__$1);
} else {
return null;
}
})();
var else_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2858,(0),null);
var new_navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2858,(1),null);
var navigator__$2 = (function (){var or__22603__auto__ = new_navigator__$1;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return navigator__$1;
}
})();
var min_remaining = (function (){var or__22603__auto__ = cljs.core.first(new cljs.core.Keyword(null,"min-remaining","min-remaining",(962687677)).cljs$core$IFn$_invoke$arity$1(else_params));
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (0);
}
})();
var max_columns = (function (){var or__22603__auto__ = cljs.core.first(new cljs.core.Keyword(null,"max-columns","max-columns",(1742323262)).cljs$core$IFn$_invoke$arity$1(else_params));
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return cljs.pprint.get_max_column(cljs.core._STAR_out_STAR_);
}
})();
var clauses = new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params);
var vec__2861 = cljs.pprint.render_clauses(clauses,navigator__$2,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
var strs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2861,(0),null);
var navigator__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2861,(1),null);
var slots = (function (){var x__23388__auto__ = (1);
var y__23389__auto__ = (((cljs.core.count(strs) - (1)) + (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?(1):(0))) + (cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?(1):(0)));
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})();
var chars = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,strs));
var mincol = new cljs.core.Keyword(null,"mincol","mincol",(1230695445)).cljs$core$IFn$_invoke$arity$1(params);
var minpad = new cljs.core.Keyword(null,"minpad","minpad",(323570901)).cljs$core$IFn$_invoke$arity$1(params);
var colinc = new cljs.core.Keyword(null,"colinc","colinc",(-584873385)).cljs$core$IFn$_invoke$arity$1(params);
var minout = (chars + (slots * minpad));
var result_columns = (((minout <= mincol))?mincol:(mincol + (colinc * ((1) + cljs.core.quot(((minout - mincol) - (1)),colinc)))));
var total_pad = (result_columns - chars);
var pad = (function (){var x__23388__auto__ = minpad;
var y__23389__auto__ = cljs.core.quot(total_pad,slots);
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})();
var extra_pad = (total_pad - (pad * slots));
var pad_str = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(pad,new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params)));
if(cljs.core.truth_((function (){var and__22563__auto__ = eol_str;
if(cljs.core.truth_(and__22563__auto__)){
return (((cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2864 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_out_STAR_) : cljs.core.deref.call(null,cljs.core._STAR_out_STAR_));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2864) : cljs.core.deref.call(null,G__2864));
})())) + min_remaining) + result_columns) > max_columns);
} else {
return and__22563__auto__;
}
})())){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([eol_str], 0));
} else {
}

var slots_2865__$1 = slots;
var extra_pad_2866__$1 = extra_pad;
var strs_2867__$1 = strs;
var pad_only_2868 = (function (){var or__22603__auto__ = new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(strs_2867__$1),(1))) && (cljs.core.not(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params)));
}
})();
while(true){
if(cljs.core.seq(strs_2867__$1)){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core.not(pad_only_2868))?cljs.core.first(strs_2867__$1):null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var or__22603__auto__ = pad_only_2868;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
var or__22603__auto____$1 = cljs.core.next(strs_2867__$1);
if(or__22603__auto____$1){
return or__22603__auto____$1;
} else {
return new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
}
}
})())?pad_str:null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((extra_pad_2866__$1 > (0)))?new cljs.core.Keyword(null,"padchar","padchar",(2018584530)).cljs$core$IFn$_invoke$arity$1(params):null))].join('')], 0));

var G__2869 = (slots_2865__$1 - (1));
var G__2870 = (extra_pad_2866__$1 - (1));
var G__2871 = (cljs.core.truth_(pad_only_2868)?strs_2867__$1:cljs.core.next(strs_2867__$1));
var G__2872 = false;
slots_2865__$1 = G__2869;
extra_pad_2866__$1 = G__2870;
strs_2867__$1 = G__2871;
pad_only_2868 = G__2872;
continue;
} else {
}
break;
}

return navigator__$3;
}); return (
new cljs.core.Var(function(){return cljs.pprint.justify_clauses;},new cljs.core.Symbol("cljs.pprint","justify-clauses","cljs.pprint/justify-clauses",(-110454534),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"justify-clauses","justify-clauses",(-265969117),null),"cljs/pprint.cljs",(23),(1),(1863),(1863),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.justify_clauses)?cljs.pprint.justify_clauses.cljs$lang$test:null)])));})()
;
/**
 * Returns a proxy that wraps writer, converting all characters to lower case
 */
(function (){
cljs.pprint.downcase_writer = (function cljs$pprint$downcase_writer(writer){
if(typeof cljs.pprint.t_cljs$pprint2879 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWriter}
*/
cljs.pprint.t_cljs$pprint2879 = (function (writer,meta2880){
this.writer = writer;
this.meta2880 = meta2880;
this.cljs$lang$protocol_mask$partition0$ = 1074135040;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint2879.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_2881,meta2880__$1){
var self__ = this;
var _2881__$1 = this;
return (new cljs.pprint.t_cljs$pprint2879(self__.writer,meta2880__$1));
});

cljs.pprint.t_cljs$pprint2879.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_2881){
var self__ = this;
var _2881__$1 = this;
return self__.meta2880;
});

cljs.pprint.t_cljs$pprint2879.prototype.cljs$core$IWriter$_flush$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._flush(self__.writer);
});

cljs.pprint.t_cljs$pprint2879.prototype.cljs$core$IWriter$_write$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__2882 = cljs.core._EQ_;
var expr__2883 = cljs.core.type(x);
if(cljs.core.truth_((pred__2882.cljs$core$IFn$_invoke$arity$2 ? pred__2882.cljs$core$IFn$_invoke$arity$2(String,expr__2883) : pred__2882.call(null,String,expr__2883)))){
var s = x;
return cljs.core._write(self__.writer,clojure.string.lower_case(s));
} else {
if(cljs.core.truth_((pred__2882.cljs$core$IFn$_invoke$arity$2 ? pred__2882.cljs$core$IFn$_invoke$arity$2(Number,expr__2883) : pred__2882.call(null,Number,expr__2883)))){
var c = x;
return cljs.core._write(self__.writer,clojure.string.lower_case(cljs.core.char$(c)));
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2883)].join('')));
}
}
});

cljs.pprint.t_cljs$pprint2879.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"meta2880","meta2880",(449502960),null)], null);
});

cljs.pprint.t_cljs$pprint2879.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint2879.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint2879";

cljs.pprint.t_cljs$pprint2879.cljs$lang$ctorPrWriter = (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint2879");
});

(function (){
cljs.pprint.__GT_t_cljs$pprint2879 = (function cljs$pprint$downcase_writer_$___GT_t_cljs$pprint2879(writer__$1,meta2880){
return (new cljs.pprint.t_cljs$pprint2879(writer__$1,meta2880));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint2879;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint2879","cljs.pprint/->t_cljs$pprint2879",(1967177012),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint2879","->t_cljs$pprint2879",(1837736907),null),"cljs/pprint.cljs",true,(3),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(1921),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"meta2880","meta2880",(449502960),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint2879)?cljs.pprint.__GT_t_cljs$pprint2879.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint2879(writer,cljs.core.PersistentArrayMap.EMPTY));
}); return (
new cljs.core.Var(function(){return cljs.pprint.downcase_writer;},new cljs.core.Symbol("cljs.pprint","downcase-writer","cljs.pprint/downcase-writer",(988013830),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"downcase-writer","downcase-writer",(37286911),null),"cljs/pprint.cljs",(23),(1),(1918),(1918),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),"Returns a proxy that wraps writer, converting all characters to lower case",(cljs.core.truth_(cljs.pprint.downcase_writer)?cljs.pprint.downcase_writer.cljs$lang$test:null)])));})()
;
/**
 * Returns a proxy that wraps writer, converting all characters to upper case
 */
(function (){
cljs.pprint.upcase_writer = (function cljs$pprint$upcase_writer(writer){
if(typeof cljs.pprint.t_cljs$pprint2891 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWriter}
*/
cljs.pprint.t_cljs$pprint2891 = (function (writer,meta2892){
this.writer = writer;
this.meta2892 = meta2892;
this.cljs$lang$protocol_mask$partition0$ = 1074135040;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint2891.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_2893,meta2892__$1){
var self__ = this;
var _2893__$1 = this;
return (new cljs.pprint.t_cljs$pprint2891(self__.writer,meta2892__$1));
});

cljs.pprint.t_cljs$pprint2891.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_2893){
var self__ = this;
var _2893__$1 = this;
return self__.meta2892;
});

cljs.pprint.t_cljs$pprint2891.prototype.cljs$core$IWriter$_flush$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._flush(self__.writer);
});

cljs.pprint.t_cljs$pprint2891.prototype.cljs$core$IWriter$_write$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__2894 = cljs.core._EQ_;
var expr__2895 = cljs.core.type(x);
if(cljs.core.truth_((pred__2894.cljs$core$IFn$_invoke$arity$2 ? pred__2894.cljs$core$IFn$_invoke$arity$2(String,expr__2895) : pred__2894.call(null,String,expr__2895)))){
var s = x;
return cljs.core._write(self__.writer,clojure.string.upper_case(s));
} else {
if(cljs.core.truth_((pred__2894.cljs$core$IFn$_invoke$arity$2 ? pred__2894.cljs$core$IFn$_invoke$arity$2(Number,expr__2895) : pred__2894.call(null,Number,expr__2895)))){
var c = x;
return cljs.core._write(self__.writer,clojure.string.upper_case(cljs.core.char$(c)));
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2895)].join('')));
}
}
});

cljs.pprint.t_cljs$pprint2891.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"meta2892","meta2892",(-333647429),null)], null);
});

cljs.pprint.t_cljs$pprint2891.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint2891.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint2891";

cljs.pprint.t_cljs$pprint2891.cljs$lang$ctorPrWriter = (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint2891");
});

(function (){
cljs.pprint.__GT_t_cljs$pprint2891 = (function cljs$pprint$upcase_writer_$___GT_t_cljs$pprint2891(writer__$1,meta2892){
return (new cljs.pprint.t_cljs$pprint2891(writer__$1,meta2892));
}); return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint2891;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint2891","cljs.pprint/->t_cljs$pprint2891",(1435483323),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint2891","->t_cljs$pprint2891",(1522964082),null),"cljs/pprint.cljs",true,(3),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(1942),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"meta2892","meta2892",(-333647429),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint2891)?cljs.pprint.__GT_t_cljs$pprint2891.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint2891(writer,cljs.core.PersistentArrayMap.EMPTY));
}); return (
new cljs.core.Var(function(){return cljs.pprint.upcase_writer;},new cljs.core.Symbol("cljs.pprint","upcase-writer","cljs.pprint/upcase-writer",(465735326),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"upcase-writer","upcase-writer",(51077317),null),"cljs/pprint.cljs",(21),(1),(1939),(1939),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),"Returns a proxy that wraps writer, converting all characters to upper case",(cljs.core.truth_(cljs.pprint.upcase_writer)?cljs.pprint.upcase_writer.cljs$lang$test:null)])));})()
;
/**
 * Capitalizes the words in a string. If first? is false, don't capitalize the
 *                                    first character of the string even if it's a letter.
 */
(function (){
cljs.pprint.capitalize_string = (function cljs$pprint$capitalize_string(s,first_QMARK_){
var f = cljs.core.first(s);
var s__$1 = (cljs.core.truth_((function (){var and__22563__auto__ = first_QMARK_;
if(cljs.core.truth_(and__22563__auto__)){
var and__22563__auto____$1 = f;
if(cljs.core.truth_(and__22563__auto____$1)){
return goog.string.isUnicodeChar(f);
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
})())?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case(f)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(1)))].join(''):s);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.first(cljs.pprint.consume(((function (f,s__$1){
return (function (s__$2){
if(cljs.core.empty_QMARK_(s__$2)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null);
} else {
var m = RegExp("\\W\\w","g").exec(s__$2);
var offset = (function (){var and__22563__auto__ = m;
if(cljs.core.truth_(and__22563__auto__)){
return (m.index + (1));
} else {
return and__22563__auto__;
}
})();
if(cljs.core.truth_(offset)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s__$2,(0),offset)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s__$2,offset)))].join(''),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s__$2,(offset + (1)))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [s__$2,null], null);
}
}
});})(f,s__$1))
,s__$1)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.capitalize_string;},new cljs.core.Symbol("cljs.pprint","capitalize-string","cljs.pprint/capitalize-string",(-142077180),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"capitalize-string","capitalize-string",(-20904497),null),"cljs/pprint.cljs",(25),(1),(1960),(1960),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"first?","first?",(662603839),null)], null)),"Capitalizes the words in a string. If first? is false, don't capitalize the\n                                      first character of the string even if it's a letter.",(cljs.core.truth_(cljs.pprint.capitalize_string)?cljs.pprint.capitalize_string.cljs$lang$test:null)])));})()
;
/**
 * Returns a proxy that wraps writer, capitalizing all words
 */
(function (){
cljs.pprint.capitalize_word_writer = (function cljs$pprint$capitalize_word_writer(writer){
var last_was_whitespace_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
if(typeof cljs.pprint.t_cljs$pprint2908 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWriter}
*/
cljs.pprint.t_cljs$pprint2908 = (function (writer,last_was_whitespace_QMARK_,meta2909){
this.writer = writer;
this.last_was_whitespace_QMARK_ = last_was_whitespace_QMARK_;
this.meta2909 = meta2909;
this.cljs$lang$protocol_mask$partition0$ = 1074135040;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint2908.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (last_was_whitespace_QMARK_){
return (function (_2910,meta2909__$1){
var self__ = this;
var _2910__$1 = this;
return (new cljs.pprint.t_cljs$pprint2908(self__.writer,self__.last_was_whitespace_QMARK_,meta2909__$1));
});})(last_was_whitespace_QMARK_))
;

cljs.pprint.t_cljs$pprint2908.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (last_was_whitespace_QMARK_){
return (function (_2910){
var self__ = this;
var _2910__$1 = this;
return self__.meta2909;
});})(last_was_whitespace_QMARK_))
;

cljs.pprint.t_cljs$pprint2908.prototype.cljs$core$IWriter$_flush$arity$1 = ((function (last_was_whitespace_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._flush(self__.writer);
});})(last_was_whitespace_QMARK_))
;

cljs.pprint.t_cljs$pprint2908.prototype.cljs$core$IWriter$_write$arity$2 = ((function (last_was_whitespace_QMARK_){
return (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__2911 = cljs.core._EQ_;
var expr__2912 = cljs.core.type(x);
if(cljs.core.truth_((pred__2911.cljs$core$IFn$_invoke$arity$2 ? pred__2911.cljs$core$IFn$_invoke$arity$2(String,expr__2912) : pred__2911.call(null,String,expr__2912)))){
var s = x;
cljs.core._write(self__.writer,cljs.pprint.capitalize_string(s.toLowerCase(),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.last_was_whitespace_QMARK_) : cljs.core.deref.call(null,self__.last_was_whitespace_QMARK_))));

if((s.length > (0))){
var G__2914 = self__.last_was_whitespace_QMARK_;
var G__2915 = (function (){var G__2916 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(cljs.core.count(s) - (1)));
return goog.string.isEmptyOrWhitespace(G__2916);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2914,G__2915) : cljs.core.reset_BANG_.call(null,G__2914,G__2915));
} else {
return null;
}
} else {
if(cljs.core.truth_((pred__2911.cljs$core$IFn$_invoke$arity$2 ? pred__2911.cljs$core$IFn$_invoke$arity$2(Number,expr__2912) : pred__2911.call(null,Number,expr__2912)))){
var c = cljs.core.char$(x);
var mod_c = (cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.last_was_whitespace_QMARK_) : cljs.core.deref.call(null,self__.last_was_whitespace_QMARK_)))?clojure.string.upper_case(c):c);
cljs.core._write(self__.writer,mod_c);

var G__2917 = self__.last_was_whitespace_QMARK_;
var G__2918 = goog.string.isEmptyOrWhitespace(c);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__2917,G__2918) : cljs.core.reset_BANG_.call(null,G__2917,G__2918));
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2912)].join('')));
}
}
});})(last_was_whitespace_QMARK_))
;

cljs.pprint.t_cljs$pprint2908.getBasis = ((function (last_was_whitespace_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"last-was-whitespace?","last-was-whitespace?",(-1073928093),null),new cljs.core.Symbol(null,"meta2909","meta2909",(1841837477),null)], null);
});})(last_was_whitespace_QMARK_))
;

cljs.pprint.t_cljs$pprint2908.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint2908.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint2908";

cljs.pprint.t_cljs$pprint2908.cljs$lang$ctorPrWriter = ((function (last_was_whitespace_QMARK_){
return (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint2908");
});})(last_was_whitespace_QMARK_))
;

(function (){
cljs.pprint.__GT_t_cljs$pprint2908 = ((function (last_was_whitespace_QMARK_){
return (function cljs$pprint$capitalize_word_writer_$___GT_t_cljs$pprint2908(writer__$1,last_was_whitespace_QMARK___$1,meta2909){
return (new cljs.pprint.t_cljs$pprint2908(writer__$1,last_was_whitespace_QMARK___$1,meta2909));
});})(last_was_whitespace_QMARK_))
; return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint2908;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint2908","cljs.pprint/->t_cljs$pprint2908",(387408450),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint2908","->t_cljs$pprint2908",(265821065),null),"cljs/pprint.cljs",true,(5),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(1987),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"last-was-whitespace?","last-was-whitespace?",(-1073928093),null),new cljs.core.Symbol(null,"meta2909","meta2909",(1841837477),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint2908)?cljs.pprint.__GT_t_cljs$pprint2908.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint2908(writer,last_was_whitespace_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
}); return (
new cljs.core.Var(function(){return cljs.pprint.capitalize_word_writer;},new cljs.core.Symbol("cljs.pprint","capitalize-word-writer","cljs.pprint/capitalize-word-writer",(58609266),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"capitalize-word-writer","capitalize-word-writer",(196688059),null),"cljs/pprint.cljs",(30),(1),(1983),(1983),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),"Returns a proxy that wraps writer, capitalizing all words",(cljs.core.truth_(cljs.pprint.capitalize_word_writer)?cljs.pprint.capitalize_word_writer.cljs$lang$test:null)])));})()
;
/**
 * Returns a proxy that wraps writer, capitalizing the first word
 */
(function (){
cljs.pprint.init_cap_writer = (function cljs$pprint$init_cap_writer(writer){
var capped = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
if(typeof cljs.pprint.t_cljs$pprint2925 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWriter}
*/
cljs.pprint.t_cljs$pprint2925 = (function (writer,capped,meta2926){
this.writer = writer;
this.capped = capped;
this.meta2926 = meta2926;
this.cljs$lang$protocol_mask$partition0$ = 1074135040;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.pprint.t_cljs$pprint2925.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (capped){
return (function (_2927,meta2926__$1){
var self__ = this;
var _2927__$1 = this;
return (new cljs.pprint.t_cljs$pprint2925(self__.writer,self__.capped,meta2926__$1));
});})(capped))
;

cljs.pprint.t_cljs$pprint2925.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (capped){
return (function (_2927){
var self__ = this;
var _2927__$1 = this;
return self__.meta2926;
});})(capped))
;

cljs.pprint.t_cljs$pprint2925.prototype.cljs$core$IWriter$_flush$arity$1 = ((function (capped){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._flush(self__.writer);
});})(capped))
;

cljs.pprint.t_cljs$pprint2925.prototype.cljs$core$IWriter$_write$arity$2 = ((function (capped){
return (function (this$,x){
var self__ = this;
var this$__$1 = this;
var pred__2928 = cljs.core._EQ_;
var expr__2929 = cljs.core.type(x);
if(cljs.core.truth_((pred__2928.cljs$core$IFn$_invoke$arity$2 ? pred__2928.cljs$core$IFn$_invoke$arity$2(String,expr__2929) : pred__2928.call(null,String,expr__2929)))){
var s = clojure.string.lower_case(x);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.capped) : cljs.core.deref.call(null,self__.capped)))){
var m = RegExp("\\S","g").exec(s);
var offset = (function (){var and__22563__auto__ = m;
if(cljs.core.truth_(and__22563__auto__)){
return m.index;
} else {
return and__22563__auto__;
}
})();
if(cljs.core.truth_(offset)){
cljs.core._write(self__.writer,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),offset)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,offset))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(offset + (1)))))].join(''));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.capped,true) : cljs.core.reset_BANG_.call(null,self__.capped,true));
} else {
return cljs.core._write(self__.writer,s);
}
} else {
return cljs.core._write(self__.writer,clojure.string.lower_case(s));
}
} else {
if(cljs.core.truth_((pred__2928.cljs$core$IFn$_invoke$arity$2 ? pred__2928.cljs$core$IFn$_invoke$arity$2(Number,expr__2929) : pred__2928.call(null,Number,expr__2929)))){
var c = cljs.core.char$(x);
if(cljs.core.truth_((function (){var and__22563__auto__ = cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.capped) : cljs.core.deref.call(null,self__.capped)));
if(and__22563__auto__){
return goog.string.isUnicodeChar(c);
} else {
return and__22563__auto__;
}
})())){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.capped,true) : cljs.core.reset_BANG_.call(null,self__.capped,true));

return cljs.core._write(self__.writer,clojure.string.upper_case(c));
} else {
return cljs.core._write(self__.writer,clojure.string.lower_case(c));
}
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__2929)].join('')));
}
}
});})(capped))
;

cljs.pprint.t_cljs$pprint2925.getBasis = ((function (capped){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"capped","capped",(-1650988402),null),new cljs.core.Symbol(null,"meta2926","meta2926",(596767079),null)], null);
});})(capped))
;

cljs.pprint.t_cljs$pprint2925.cljs$lang$type = true;

cljs.pprint.t_cljs$pprint2925.cljs$lang$ctorStr = "cljs.pprint/t_cljs$pprint2925";

cljs.pprint.t_cljs$pprint2925.cljs$lang$ctorPrWriter = ((function (capped){
return (function (this__24325__auto__,writer__24326__auto__,opt__24327__auto__){
return cljs.core._write(writer__24326__auto__,"cljs.pprint/t_cljs$pprint2925");
});})(capped))
;

(function (){
cljs.pprint.__GT_t_cljs$pprint2925 = ((function (capped){
return (function cljs$pprint$init_cap_writer_$___GT_t_cljs$pprint2925(writer__$1,capped__$1,meta2926){
return (new cljs.pprint.t_cljs$pprint2925(writer__$1,capped__$1,meta2926));
});})(capped))
; return (
new cljs.core.Var(function(){return cljs.pprint.__GT_t_cljs$pprint2925;},new cljs.core.Symbol("cljs.pprint","->t_cljs$pprint2925","cljs.pprint/->t_cljs$pprint2925",(341617883),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"protocols","protocols",(-5615896)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"factory","factory",(63933746)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"skip-protocol-flag","skip-protocol-flag",(-1426798630)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"->t_cljs$pprint2925","->t_cljs$pprint2925",(224674528),null),"cljs/pprint.cljs",true,(5),new cljs.core.Keyword(null,"positional","positional",(-203580463)),(2013),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null),new cljs.core.Symbol(null,"capped","capped",(-1650988402),null),new cljs.core.Symbol(null,"meta2926","meta2926",(596767079),null)], null)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol("cljs.core","IWithMeta","cljs.core/IWithMeta",(-1981666051),null),null,new cljs.core.Symbol("cljs.core","IMeta","cljs.core/IMeta",(-1459057517),null),null,new cljs.core.Symbol("cljs.core","IWriter","cljs.core/IWriter",(-1282590490),null),null], null), null),null,(cljs.core.truth_(cljs.pprint.__GT_t_cljs$pprint2925)?cljs.pprint.__GT_t_cljs$pprint2925.cljs$lang$test:null)])));})()
;

}

return (new cljs.pprint.t_cljs$pprint2925(writer,capped,cljs.core.PersistentArrayMap.EMPTY));
}); return (
new cljs.core.Var(function(){return cljs.pprint.init_cap_writer;},new cljs.core.Symbol("cljs.pprint","init-cap-writer","cljs.pprint/init-cap-writer",(-174279783),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"init-cap-writer","init-cap-writer",(-861558336),null),"cljs/pprint.cljs",(23),(1),(2009),(2009),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),"Returns a proxy that wraps writer, capitalizing the first word",(cljs.core.truth_(cljs.pprint.init_cap_writer)?cljs.pprint.init_cap_writer.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.modify_case = (function cljs$pprint$modify_case(make_writer,params,navigator,offsets){
var clause = cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params));
var _STAR_out_STAR_2932 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = (make_writer.cljs$core$IFn$_invoke$arity$1 ? make_writer.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_out_STAR_) : make_writer.call(null,cljs.core._STAR_out_STAR_));

try{return cljs.pprint.execute_sub_format(clause,navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_2932;
}}); return (
new cljs.core.Var(function(){return cljs.pprint.modify_case;},new cljs.core.Symbol("cljs.pprint","modify-case","cljs.pprint/modify-case",(1525491611),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"modify-case","modify-case",(1134971986),null),"cljs/pprint.cljs",(19),(1),(2044),(2044),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"make-writer","make-writer",(-1342091864),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.modify_case)?cljs.pprint.modify_case.cljs$lang$test:null)])));})()
;
/**
 * Returns the IWriter passed in wrapped in a pretty writer proxy, unless it's
 * already a pretty writer. Generally, it is unnecessary to call this function, since pprint,
 * write, and cl-format all call it if they need to. However if you want the state to be
 * preserved across calls, you will want to wrap them with this.
 * 
 * For example, when you want to generate column-aware output with multiple calls to cl-format,
 * do it like in this example:
 * 
 *  (defn print-table [aseq column-width]
 *    (binding [*out* (get-pretty-writer *out*)]
 *      (doseq [row aseq]
 *        (doseq [col row]
 *          (cl-format true "~4D~7,vT" col column-width))
 *        (prn))))
 * 
 * Now when you run:
 * 
 *  user> (print-table (map #(vector % (* % %) (* % % %)) (range 1 11)) 8)
 * 
 * It prints a table of squares and cubes for the numbers from 1 to 10:
 * 
 *     1      1       1
 *     2      4       8
 *     3      9      27
 *     4     16      64
 *     5     25     125
 *     6     36     216
 *     7     49     343
 *     8     64     512
 *     9     81     729
 *    10    100    1000
 */
(function (){
cljs.pprint.get_pretty_writer = (function cljs$pprint$get_pretty_writer(writer){
if(cljs.core.truth_(cljs.pprint.pretty_writer_QMARK_(writer))){
return writer;
} else {
return cljs.pprint.pretty_writer(writer,cljs.pprint._STAR_print_right_margin_STAR_,cljs.pprint._STAR_print_miser_width_STAR_);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.get_pretty_writer;},new cljs.core.Symbol("cljs.pprint","get-pretty-writer","cljs.pprint/get-pretty-writer",(-2019656662),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"get-pretty-writer","get-pretty-writer",(-1905834397),null),"cljs/pprint.cljs",(24),(1),(2054),(2054),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"writer","writer",(1362963291),null)], null)),"Returns the IWriter passed in wrapped in a pretty writer proxy, unless it's\nalready a pretty writer. Generally, it is unnecessary to call this function, since pprint,\nwrite, and cl-format all call it if they need to. However if you want the state to be\npreserved across calls, you will want to wrap them with this.\n\nFor example, when you want to generate column-aware output with multiple calls to cl-format,\ndo it like in this example:\n\n    (defn print-table [aseq column-width]\n      (binding [*out* (get-pretty-writer *out*)]\n        (doseq [row aseq]\n          (doseq [col row]\n            (cl-format true \"~4D~7,vT\" col column-width))\n          (prn))))\n\nNow when you run:\n\n    user> (print-table (map #(vector % (* % %) (* % % %)) (range 1 11)) 8)\n\nIt prints a table of squares and cubes for the numbers from 1 to 10:\n\n       1      1       1\n       2      4       8\n       3      9      27\n       4     16      64\n       5     25     125\n       6     36     216\n       7     49     343\n       8     64     512\n       9     81     729\n      10    100    1000",(cljs.core.truth_(cljs.pprint.get_pretty_writer)?cljs.pprint.get_pretty_writer.cljs$lang$test:null)])));})()
;
/**
 * Make a newline if *out* is not already at the beginning of the line. If *out* is
 * not a pretty writer (which keeps track of columns), this function always outputs a newline.
 */
(function (){
cljs.pprint.fresh_line = (function cljs$pprint$fresh_line(){
if(((!((cljs.core._STAR_out_STAR_ == null)))?((((cljs.core._STAR_out_STAR_.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === cljs.core._STAR_out_STAR_.cljs$core$IDeref$)))?true:(((!cljs.core._STAR_out_STAR_.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,cljs.core._STAR_out_STAR_):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,cljs.core._STAR_out_STAR_))){
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2936 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_out_STAR_) : cljs.core.deref.call(null,cljs.core._STAR_out_STAR_));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2936) : cljs.core.deref.call(null,G__2936));
})()))))){
return cljs.pprint.prn();
} else {
return null;
}
} else {
return cljs.pprint.prn();
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.fresh_line;},new cljs.core.Symbol("cljs.pprint","fresh-line","cljs.pprint/fresh-line",(-1048356440),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"fresh-line","fresh-line",(-620992529),null),"cljs/pprint.cljs",(17),(1),(2095),(2095),cljs.core.list(cljs.core.PersistentVector.EMPTY),"Make a newline if *out* is not already at the beginning of the line. If *out* is\nnot a pretty writer (which keeps track of columns), this function always outputs a newline.",(cljs.core.truth_(cljs.pprint.fresh_line)?cljs.pprint.fresh_line.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.absolute_tabulation = (function cljs$pprint$absolute_tabulation(params,navigator,offsets){
var colnum_2939 = new cljs.core.Keyword(null,"colnum","colnum",(2023796854)).cljs$core$IFn$_invoke$arity$1(params);
var colinc_2940 = new cljs.core.Keyword(null,"colinc","colinc",(-584873385)).cljs$core$IFn$_invoke$arity$1(params);
var current_2941 = cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2938 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_out_STAR_) : cljs.core.deref.call(null,cljs.core._STAR_out_STAR_));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2938) : cljs.core.deref.call(null,G__2938));
})()));
var space_count_2942 = (((current_2941 < colnum_2939))?(colnum_2939 - current_2941):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(colinc_2940,(0)))?(0):(colinc_2940 - cljs.core.rem((current_2941 - colnum_2939),colinc_2940))
));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(space_count_2942," "))], 0));

return navigator;
}); return (
new cljs.core.Var(function(){return cljs.pprint.absolute_tabulation;},new cljs.core.Symbol("cljs.pprint","absolute-tabulation","cljs.pprint/absolute-tabulation",(2128341271),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"absolute-tabulation","absolute-tabulation",(1730332638),null),"cljs/pprint.cljs",(27),(1),(2104),(2104),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.absolute_tabulation)?cljs.pprint.absolute_tabulation.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.relative_tabulation = (function cljs$pprint$relative_tabulation(params,navigator,offsets){
var colrel_2945 = new cljs.core.Keyword(null,"colnum","colnum",(2023796854)).cljs$core$IFn$_invoke$arity$1(params);
var colinc_2946 = new cljs.core.Keyword(null,"colinc","colinc",(-584873385)).cljs$core$IFn$_invoke$arity$1(params);
var start_col_2947 = (colrel_2945 + cljs.pprint.get_column(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1((function (){var G__2944 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_out_STAR_) : cljs.core.deref.call(null,cljs.core._STAR_out_STAR_));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__2944) : cljs.core.deref.call(null,G__2944));
})())));
var offset_2948 = (((colinc_2946 > (0)))?cljs.core.rem(start_col_2947,colinc_2946):(0));
var space_count_2949 = (colrel_2945 + ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),offset_2948))?(0):(colinc_2946 - offset_2948)));
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(space_count_2949," "))], 0));

return navigator;
}); return (
new cljs.core.Var(function(){return cljs.pprint.relative_tabulation;},new cljs.core.Symbol("cljs.pprint","relative-tabulation","cljs.pprint/relative-tabulation",(1279530262),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"relative-tabulation","relative-tabulation",(882707279),null),"cljs/pprint.cljs",(27),(1),(2115),(2115),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.relative_tabulation)?cljs.pprint.relative_tabulation.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.format_logical_block = (function cljs$pprint$format_logical_block(params,navigator,offsets){
var clauses = new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(params);
var clause_count = cljs.core.count(clauses);
var prefix = (((clause_count > (1)))?new cljs.core.Keyword(null,"string","string",(-1989541586)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.first(clauses)))):(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?"(":null));
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(clauses,(((clause_count > (1)))?(1):(0)));
var suffix = (((clause_count > (2)))?new cljs.core.Keyword(null,"string","string",(-1989541586)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(clauses,(2))))):(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?")":null));
var vec__2955 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2955,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2955,(1),null);
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_2958_2960 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_2959_2961 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,prefix,null,suffix);

cljs.pprint.execute_sub_format(body,cljs.pprint.init_navigator(arg),new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params));

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_2959_2961;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_2958_2960;
}}


return navigator__$1;
}); return (
new cljs.core.Var(function(){return cljs.pprint.format_logical_block;},new cljs.core.Symbol("cljs.pprint","format-logical-block","cljs.pprint/format-logical-block",(-1790043349),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"format-logical-block","format-logical-block",(-1408687662),null),"cljs/pprint.cljs",(28),(1),(2130),(2130),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.format_logical_block)?cljs.pprint.format_logical_block.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.set_indent = (function cljs$pprint$set_indent(params,navigator,offsets){
var relative_to = (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?new cljs.core.Keyword(null,"current","current",(-1088038603)):new cljs.core.Keyword(null,"block","block",(664686210)));
cljs.pprint.pprint_indent(relative_to,new cljs.core.Keyword(null,"n","n",(562130025)).cljs$core$IFn$_invoke$arity$1(params));

return navigator;
}); return (
new cljs.core.Var(function(){return cljs.pprint.set_indent;},new cljs.core.Symbol("cljs.pprint","set-indent","cljs.pprint/set-indent",(1348076569),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"set-indent","set-indent",(-1457710384),null),"cljs/pprint.cljs",(18),(1),(2148),(2148),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.set_indent)?cljs.pprint.set_indent.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.conditional_newline = (function cljs$pprint$conditional_newline(params,navigator,offsets){
var kind = (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?new cljs.core.Keyword(null,"mandatory","mandatory",(542802336)):new cljs.core.Keyword(null,"fill","fill",(883462889))):(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?new cljs.core.Keyword(null,"miser","miser",(-556060186)):new cljs.core.Keyword(null,"linear","linear",(872268697))));
cljs.pprint.pprint_newline(kind);

return navigator;
}); return (
new cljs.core.Var(function(){return cljs.pprint.conditional_newline;},new cljs.core.Symbol("cljs.pprint","conditional-newline","cljs.pprint/conditional-newline",(1128245564),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"conditional-newline","conditional-newline",(2029426629),null),"cljs/pprint.cljs",(27),(1),(2154),(2154),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"navigator","navigator",(-604431588),null),new cljs.core.Symbol(null,"offsets","offsets",(-1926880158),null)], null)),null,(cljs.core.truth_(cljs.pprint.conditional_newline)?cljs.pprint.conditional_newline.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.directive_table = cljs.core.PersistentHashMap.fromArrays(["A","S","D","B","O","X","R","P","C","F","E","G","$","%","&","|","~","\n","T","*","?","(",")","[",";","]","{","}","<",">","^","W","_","I"],[new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"A",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"minpad","minpad",(323570901)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__120_SHARP_,p2__121_SHARP_,p3__122_SHARP_){
return cljs.pprint.format_ascii(cljs.core.print_str,p1__120_SHARP_,p2__121_SHARP_,p3__122_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"S",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"minpad","minpad",(323570901)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__123_SHARP_,p2__124_SHARP_,p3__125_SHARP_){
return cljs.pprint.format_ascii(cljs.core.pr_str,p1__123_SHARP_,p2__124_SHARP_,p3__125_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"D",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [",",String], null),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__126_SHARP_,p2__127_SHARP_,p3__128_SHARP_){
return cljs.pprint.format_integer((10),p1__126_SHARP_,p2__127_SHARP_,p3__128_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"B",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [",",String], null),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__129_SHARP_,p2__130_SHARP_,p3__131_SHARP_){
return cljs.pprint.format_integer((2),p1__129_SHARP_,p2__130_SHARP_,p3__131_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"O",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [",",String], null),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__132_SHARP_,p2__133_SHARP_,p3__134_SHARP_){
return cljs.pprint.format_integer((8),p1__132_SHARP_,p2__133_SHARP_,p3__134_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"X",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [",",String], null),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (p1__135_SHARP_,p2__136_SHARP_,p3__137_SHARP_){
return cljs.pprint.format_integer((16),p1__135_SHARP_,p2__136_SHARP_,p3__137_SHARP_);
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"R",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(5),[new cljs.core.Keyword(null,"base","base",(185279322)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"commachar","commachar",(652859327)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [",",String], null),new cljs.core.Keyword(null,"commainterval","commainterval",(-1980061083)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_(cljs.core.first(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1(params)))){
return (function (p1__138_SHARP_,p2__139_SHARP_,p3__140_SHARP_){
return cljs.pprint.format_integer(new cljs.core.Keyword(null,"base","base",(185279322)).cljs$core$IFn$_invoke$arity$1(p1__138_SHARP_),p1__138_SHARP_,p2__139_SHARP_,p3__140_SHARP_);
});
} else {
if(cljs.core.truth_((function (){var and__22563__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(and__22563__auto__)){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
} else {
return and__22563__auto__;
}
})())){
return (function (p1__141_SHARP_,p2__142_SHARP_,p3__143_SHARP_){
return cljs.pprint.format_old_roman(p1__141_SHARP_,p2__142_SHARP_,p3__143_SHARP_);
});
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return (function (p1__144_SHARP_,p2__145_SHARP_,p3__146_SHARP_){
return cljs.pprint.format_new_roman(p1__144_SHARP_,p2__145_SHARP_,p3__146_SHARP_);
});
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))){
return (function (p1__147_SHARP_,p2__148_SHARP_,p3__149_SHARP_){
return cljs.pprint.format_ordinal_english(p1__147_SHARP_,p2__148_SHARP_,p3__149_SHARP_);
});
} else {
return (function (p1__150_SHARP_,p2__151_SHARP_,p3__152_SHARP_){
return cljs.pprint.format_cardinal_english(p1__150_SHARP_,p2__151_SHARP_,p3__152_SHARP_);
});

}
}
}
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"P",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,navigator,offsets){
var navigator__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params__$1))?cljs.pprint.relative_reposition(navigator,(-1)):navigator);
var strs = (cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params__$1))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["y","ies"], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["","s"], null));
var vec__2962 = cljs.pprint.next_arg(navigator__$1);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2962,(0),null);
var navigator__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2962,(1),null);
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(arg,(1)))?cljs.core.first(strs):cljs.core.second(strs))], 0));

return navigator__$2;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"C",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"char-format","char-format",(-1016499218)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.pretty_character;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.readable_character;
} else {
return cljs.pprint.plain_character;

}
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"F",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(5),[new cljs.core.Keyword(null,"w","w",(354169001)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"d","d",(1972142424)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"k","k",(-2146297393)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.fixed_float;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"E",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(7),[new cljs.core.Keyword(null,"w","w",(354169001)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"d","d",(1972142424)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"e","e",(1381269198)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"k","k",(-2146297393)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"exponentchar","exponentchar",(1986664222)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.exponential_float;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"G",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(7),[new cljs.core.Keyword(null,"w","w",(354169001)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"d","d",(1972142424)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"e","e",(1381269198)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"k","k",(-2146297393)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"overflowchar","overflowchar",(-1620088106)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null),new cljs.core.Keyword(null,"exponentchar","exponentchar",(1986664222)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.general_float;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"$",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"d","d",(1972142424)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),Number], null),new cljs.core.Keyword(null,"n","n",(562130025)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"w","w",(354169001)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.dollar_float;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"%",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"count","count",(2139924085)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,arg_navigator,offsets){
var n__26223__auto___2980 = new cljs.core.Keyword(null,"count","count",(2139924085)).cljs$core$IFn$_invoke$arity$1(params__$1);
var i_2981 = (0);
while(true){
if((i_2981 < n__26223__auto___2980)){
cljs.pprint.prn();

var G__2982 = (i_2981 + (1));
i_2981 = G__2982;
continue;
} else {
}
break;
}

return arg_navigator;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"&",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"count","count",(2139924085)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,arg_navigator,offsets){
var cnt_2983 = new cljs.core.Keyword(null,"count","count",(2139924085)).cljs$core$IFn$_invoke$arity$1(params__$1);
if((cnt_2983 > (0))){
cljs.pprint.fresh_line();
} else {
}

var n__26223__auto___2984 = (cnt_2983 - (1));
var i_2985 = (0);
while(true){
if((i_2985 < n__26223__auto___2984)){
cljs.pprint.prn();

var G__2986 = (i_2985 + (1));
i_2985 = G__2986;
continue;
} else {
}
break;
}

return arg_navigator;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"|",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"count","count",(2139924085)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,arg_navigator,offsets){
var n__26223__auto___2987 = new cljs.core.Keyword(null,"count","count",(2139924085)).cljs$core$IFn$_invoke$arity$1(params__$1);
var i_2988 = (0);
while(true){
if((i_2988 < n__26223__auto___2987)){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\f"], 0));

var G__2989 = (i_2988 + (1));
i_2988 = G__2989;
continue;
} else {
}
break;
}

return arg_navigator;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"~",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"n","n",(562130025)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,arg_navigator,offsets){
var n = new cljs.core.Keyword(null,"n","n",(562130025)).cljs$core$IFn$_invoke$arity$1(params__$1);
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n,"~"))], 0));

return arg_navigator;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"\n",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,arg_navigator,offsets){
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params__$1))){
cljs.pprint.prn();
} else {
}

return arg_navigator;
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"T",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(2),[new cljs.core.Keyword(null,"colnum","colnum",(2023796854)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return (function (p1__153_SHARP_,p2__154_SHARP_,p3__155_SHARP_){
return cljs.pprint.relative_tabulation(p1__153_SHARP_,p2__154_SHARP_,p3__155_SHARP_);
});
} else {
return (function (p1__156_SHARP_,p2__157_SHARP_,p3__158_SHARP_){
return cljs.pprint.absolute_tabulation(p1__156_SHARP_,p2__157_SHARP_,p3__158_SHARP_);
});
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"*",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"n","n",(562130025)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,navigator,offsets){
var n = new cljs.core.Keyword(null,"n","n",(562130025)).cljs$core$IFn$_invoke$arity$1(params__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params__$1))){
return cljs.pprint.absolute_reposition(navigator,n);
} else {
return cljs.pprint.relative_reposition(navigator,(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params__$1))?(- n):n));
}
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"?",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return (function (params__$1,navigator,offsets){
var vec__2965 = cljs.pprint.get_format_arg(navigator);
var subformat = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2965,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2965,(1),null);
return cljs.pprint.execute_sub_format(subformat,navigator__$1,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params__$1));
});
} else {
return (function (params__$1,navigator,offsets){
var vec__2968 = cljs.pprint.get_format_arg(navigator);
var subformat = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2968,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2968,(1),null);
var vec__2971 = cljs.pprint.next_arg(navigator__$1);
var subargs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2971,(0),null);
var navigator__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2971,(1),null);
var sub_navigator = cljs.pprint.init_navigator(subargs);
cljs.pprint.execute_sub_format(subformat,sub_navigator,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params__$1));

return navigator__$2;
});
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"(",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"right","right",(-452581833)),")",new cljs.core.Keyword(null,"allows-separator","allows-separator",(-818967742)),null,new cljs.core.Keyword(null,"else","else",(-1508377146)),null], null),new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
var mod_case_writer = (cljs.core.truth_((function (){var and__22563__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(and__22563__auto__)){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
} else {
return and__22563__auto__;
}
})())?cljs.pprint.upcase_writer:(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?cljs.pprint.capitalize_word_writer:(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?cljs.pprint.init_cap_writer:cljs.pprint.downcase_writer
)));
return ((function (mod_case_writer){
return (function (p1__159_SHARP_,p2__160_SHARP_,p3__161_SHARP_){
return cljs.pprint.modify_case(mod_case_writer,p1__159_SHARP_,p2__160_SHARP_,p3__161_SHARP_);
});
;})(mod_case_writer))
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),")",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return null;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"[",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"selector","selector",(762528866)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"right","right",(-452581833)),"]",new cljs.core.Keyword(null,"allows-separator","allows-separator",(-818967742)),true,new cljs.core.Keyword(null,"else","else",(-1508377146)),new cljs.core.Keyword(null,"last","last",(1105735132))], null),new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.boolean_conditional;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.check_arg_conditional;
} else {
return cljs.pprint.choice_conditional;

}
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),";",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(2),[new cljs.core.Keyword(null,"min-remaining","min-remaining",(962687677)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"max-columns","max-columns",(1742323262)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"separator","separator",(-1628749125)),true], null),new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return null;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"]",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return null;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"{",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"max-iterations","max-iterations",(2021275563)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"right","right",(-452581833)),"}",new cljs.core.Keyword(null,"allows-separator","allows-separator",(-818967742)),false], null),new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_((function (){var and__22563__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(and__22563__auto__)){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
} else {
return and__22563__auto__;
}
})())){
return cljs.pprint.iterate_main_sublists;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.iterate_list_of_sublists;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))){
return cljs.pprint.iterate_main_list;
} else {
return cljs.pprint.iterate_sublist;

}
}
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"}",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return null;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"<",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(4),[new cljs.core.Keyword(null,"mincol","mincol",(1230695445)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"colinc","colinc",(-584873385)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),Number], null),new cljs.core.Keyword(null,"minpad","minpad",(323570901)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null),new cljs.core.Keyword(null,"padchar","padchar",(2018584530)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ",String], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null,new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"right","right",(-452581833)),">",new cljs.core.Keyword(null,"allows-separator","allows-separator",(-818967742)),true,new cljs.core.Keyword(null,"else","else",(-1508377146)),new cljs.core.Keyword(null,"first","first",(-644103046))], null),new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.logical_block_or_justify;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),">",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return null;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"^",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(3),[new cljs.core.Keyword(null,"arg1","arg1",(951899358)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"arg2","arg2",(1729550917)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null),new cljs.core.Keyword(null,"arg3","arg3",(-1486822496)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return (function (params__$1,navigator,offsets){
var arg1 = new cljs.core.Keyword(null,"arg1","arg1",(951899358)).cljs$core$IFn$_invoke$arity$1(params__$1);
var arg2 = new cljs.core.Keyword(null,"arg2","arg2",(1729550917)).cljs$core$IFn$_invoke$arity$1(params__$1);
var arg3 = new cljs.core.Keyword(null,"arg3","arg3",(-1486822496)).cljs$core$IFn$_invoke$arity$1(params__$1);
var exit = (cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params__$1))?new cljs.core.Keyword(null,"colon-up-arrow","colon-up-arrow",(244853007)):new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)));
if(cljs.core.truth_((function (){var and__22563__auto__ = arg1;
if(cljs.core.truth_(and__22563__auto__)){
var and__22563__auto____$1 = arg2;
if(cljs.core.truth_(and__22563__auto____$1)){
return arg3;
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
})())){
if(((arg1 <= arg2)) && ((arg2 <= arg3))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [exit,navigator], null);
} else {
return navigator;
}
} else {
if(cljs.core.truth_((function (){var and__22563__auto__ = arg1;
if(cljs.core.truth_(and__22563__auto__)){
return arg2;
} else {
return and__22563__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(arg1,arg2)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [exit,navigator], null);
} else {
return navigator;
}
} else {
if(cljs.core.truth_(arg1)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(arg1,(0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [exit,navigator], null);
} else {
return navigator;
}
} else {
if((cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params__$1))?cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)).cljs$core$IFn$_invoke$arity$1(params__$1))):cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rest","rest",(-1241696419)).cljs$core$IFn$_invoke$arity$1(navigator)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [exit,navigator], null);
} else {
return navigator;
}

}
}
}
});
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"W",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null,new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
if(cljs.core.truth_((function (){var or__22603__auto__ = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params);
}
})())){
var bindings = cljs.core.concat.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(params))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"level","level",(1290497552)),null,new cljs.core.Keyword(null,"length","length",(588987862)),null], null):cljs.core.PersistentVector.EMPTY),(cljs.core.truth_(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)),true], null):cljs.core.PersistentVector.EMPTY));
return ((function (bindings){
return (function (params__$1,navigator,offsets){
var vec__2974 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2974,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2974,(1),null);
if(cljs.core.truth_(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.pprint.write,arg,bindings))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),navigator__$1], null);
} else {
return navigator__$1;
}
});
;})(bindings))
} else {
return (function (params__$1,navigator,offsets){
var vec__2977 = cljs.pprint.next_arg(navigator);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2977,(0),null);
var navigator__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2977,(1),null);
if(cljs.core.truth_(cljs.pprint.write_out(arg))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"up-arrow","up-arrow",(1705310333)),navigator__$1], null);
} else {
return navigator__$1;
}
});
}
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"_",new cljs.core.Keyword(null,"params","params",(710516235)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"at","at",(1476951349)),null,new cljs.core.Keyword(null,"colon","colon",(-965200945)),null,new cljs.core.Keyword(null,"both","both",(-393648840)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.conditional_newline;
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"directive","directive",(793559132)),"I",new cljs.core.Keyword(null,"params","params",(710516235)),(new cljs.core.PersistentArrayMap(null,(1),[new cljs.core.Keyword(null,"n","n",(562130025)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),Number], null)],null)),new cljs.core.Keyword(null,"flags","flags",(1775418075)),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colon","colon",(-965200945)),null], null), null),new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)),(function (params,offset){
return cljs.pprint.set_indent;
})], null)]); return (
new cljs.core.Var(function(){return cljs.pprint.directive_table;},new cljs.core.Symbol("cljs.pprint","directive-table","cljs.pprint/directive-table",(-1138257669),null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"file","file",(-1269645878)),"cljs/pprint.cljs",new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Keyword(null,"doc","doc",(1913296891)),null,new cljs.core.Keyword(null,"line","line",(212345235)),(2166),new cljs.core.Keyword(null,"column","column",(2078222095)),(1),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Symbol(null,"directive-table","directive-table",(-1558673742),null),new cljs.core.Keyword(null,"test","test",(577538877)),(cljs.core.truth_(cljs.pprint.directive_table)?cljs.pprint.directive_table.cljs$lang$test:null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.List.EMPTY], null)));})()
;
(function (){
cljs.pprint.param_pattern = /^([vV]|#|('.)|([+-]?\d+)|(?=,))/; return (
new cljs.core.Var(function(){return cljs.pprint.param_pattern;},new cljs.core.Symbol("cljs.pprint","param-pattern","cljs.pprint/param-pattern",(-112930823),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"param-pattern","param-pattern",(-23210622),null),"cljs/pprint.cljs",(19),(1),(2448),(2449),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.param_pattern)?cljs.pprint.param_pattern.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.special_params = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"parameter-from-args","parameter-from-args",(-758446196)),null,new cljs.core.Keyword(null,"remaining-arg-count","remaining-arg-count",(-1216589335)),null], null), null); return (
new cljs.core.Var(function(){return cljs.pprint.special_params;},new cljs.core.Symbol("cljs.pprint","special-params","cljs.pprint/special-params",(-1822548144),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"special-params","special-params",(-1809321623),null),"cljs/pprint.cljs",(20),(1),(2451),(2452),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.special_params)?cljs.pprint.special_params.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.extract_param = (function cljs$pprint$extract_param(p__2990){
var vec__2994 = p__2990;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2994,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2994,(1),null);
var saw_comma = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__2994,(2),null);
var m = (new RegExp(cljs.pprint.param_pattern.source,"g"));
var param = m.exec(s);
if(cljs.core.truth_(param)){
var token_str = cljs.core.first(param);
var remainder = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,m.lastIndex);
var new_offset = (offset + m.lastIndex);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(",",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(remainder,(0))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [token_str,offset], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [remainder,new_offset,false], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [token_str,offset], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$2(remainder,(1)),(new_offset + (1)),true], null)], null);
}
} else {
if(cljs.core.truth_(saw_comma)){
return cljs.pprint.format_error("Badly formed parameters in format directive",offset);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,offset], null)], null);
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.extract_param;},new cljs.core.Symbol("cljs.pprint","extract-param","cljs.pprint/extract-param",(1191989888),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"extract-param","extract-param",(1322730713),null),"cljs/pprint.cljs",(21),(1),(2454),(2454),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"saw-comma","saw-comma",(357939663),null)], null)], null)),null,(cljs.core.truth_(cljs.pprint.extract_param)?cljs.pprint.extract_param.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.extract_params = (function cljs$pprint$extract_params(s,offset){
return cljs.pprint.consume(cljs.pprint.extract_param,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,offset,false], null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.extract_params;},new cljs.core.Symbol("cljs.pprint","extract-params","cljs.pprint/extract-params",(301713972),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"extract-params","extract-params",(146979967),null),"cljs/pprint.cljs",(22),(1),(2468),(2468),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.extract_params)?cljs.pprint.extract_params.cljs$lang$test:null)])));})()
;
/**
 * Translate the string representation of a param to the internalized
 *                                    representation
 */
(function (){
cljs.pprint.translate_param = (function cljs$pprint$translate_param(p__2997){
var vec__3001 = p__2997;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3001,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3001,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p.length,(0)))?null:(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p.length,(1))) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["v",null,"V",null], null), null),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p,(0)))))?new cljs.core.Keyword(null,"parameter-from-args","parameter-from-args",(-758446196)):(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p.length,(1))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("#",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p,(0)))))?new cljs.core.Keyword(null,"remaining-arg-count","remaining-arg-count",(-1216589335)):(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p.length,(2))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("'",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p,(0)))))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p,(1)):parseInt(p,(10))
)))),offset], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.translate_param;},new cljs.core.Symbol("cljs.pprint","translate-param","cljs.pprint/translate-param",(709499755),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"translate-param","translate-param",(620949778),null),"cljs/pprint.cljs",(23),(1),(2471),(2471),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",(1791580836),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)], null)),"Translate the string representation of a param to the internalized\n                                      representation",(cljs.core.truth_(cljs.pprint.translate_param)?cljs.pprint.translate_param.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.flag_defs = new cljs.core.PersistentArrayMap(null, 2, [":",new cljs.core.Keyword(null,"colon","colon",(-965200945)),"@",new cljs.core.Keyword(null,"at","at",(1476951349))], null); return (
new cljs.core.Var(function(){return cljs.pprint.flag_defs;},new cljs.core.Symbol("cljs.pprint","flag-defs","cljs.pprint/flag-defs",(1748821136),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"flag-defs","flag-defs",(1635245785),null),"cljs/pprint.cljs",(15),(1),(2483),(2484),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.flag_defs)?cljs.pprint.flag_defs.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.extract_flags = (function cljs$pprint$extract_flags(s,offset){
return cljs.pprint.consume((function (p__3008){
var vec__3009 = p__3008;
var s__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3009,(0),null);
var offset__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3009,(1),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3009,(2),null);
if(cljs.core.empty_QMARK_(s__$1)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s__$1,offset__$1,flags], null)], null);
} else {
var flag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.pprint.flag_defs,cljs.core.first(s__$1));
if(cljs.core.truth_(flag)){
if(cljs.core.contains_QMARK_(flags,flag)){
return cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Flag \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(s__$1)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\" appears more than once in a directive")].join(''),offset__$1);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s__$1,(1)),(offset__$1 + (1)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(flags,flag,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,offset__$1], null))], null)], null);
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s__$1,offset__$1,flags], null)], null);
}
}
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,offset,cljs.core.PersistentArrayMap.EMPTY], null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.extract_flags;},new cljs.core.Symbol("cljs.pprint","extract-flags","cljs.pprint/extract-flags",(-470627802),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"extract-flags","extract-flags",(-628477921),null),"cljs/pprint.cljs",(21),(1),(2486),(2486),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.extract_flags)?cljs.pprint.extract_flags.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.check_flags = (function cljs$pprint$check_flags(def,flags){
var allowed = new cljs.core.Keyword(null,"flags","flags",(1775418075)).cljs$core$IFn$_invoke$arity$1(def);
if(cljs.core.truth_((function (){var and__22563__auto__ = cljs.core.not(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(allowed));
if(and__22563__auto__){
return new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(flags);
} else {
return and__22563__auto__;
}
})())){
cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"@\" is an illegal flag for format directive \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join(''),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(flags),(1)));
} else {
}

if(cljs.core.truth_((function (){var and__22563__auto__ = cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(allowed));
if(and__22563__auto__){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(flags);
} else {
return and__22563__auto__;
}
})())){
cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("\":\" is an illegal flag for format directive \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join(''),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(flags),(1)));
} else {
}

if(cljs.core.truth_((function (){var and__22563__auto__ = cljs.core.not(new cljs.core.Keyword(null,"both","both",(-393648840)).cljs$core$IFn$_invoke$arity$1(allowed));
if(and__22563__auto__){
var and__22563__auto____$1 = new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(flags);
if(cljs.core.truth_(and__22563__auto____$1)){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(flags);
} else {
return and__22563__auto____$1;
}
} else {
return and__22563__auto__;
}
})())){
return cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Cannot combine \"@\" and \":\" flags for format directive \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join(''),(function (){var x__23403__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(flags),(1));
var y__23404__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"at","at",(1476951349)).cljs$core$IFn$_invoke$arity$1(flags),(1));
return ((x__23403__auto__ < y__23404__auto__) ? x__23403__auto__ : y__23404__auto__);
})());
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.check_flags;},new cljs.core.Symbol("cljs.pprint","check-flags","cljs.pprint/check-flags",(1323990516),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"check-flags","check-flags",(1193449355),null),"cljs/pprint.cljs",(19),(1),(2501),(2501),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"def","def",(597100991),null),new cljs.core.Symbol(null,"flags","flags",(-879017694),null)], null)),null,(cljs.core.truth_(cljs.pprint.check_flags)?cljs.pprint.check_flags.cljs$lang$test:null)])));})()
;
/**
 * Takes a directive definition and the list of actual parameters and
 * a map of flags and returns a map of the parameters and flags with defaults
 * filled in. We check to make sure that there are the right types and number
 * of parameters as well.
 */
(function (){
cljs.pprint.map_params = (function cljs$pprint$map_params(def,params,flags,offset){
cljs.pprint.check_flags(def,flags);

if((cljs.core.count(params) > cljs.core.count(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(def)))){
cljs.pprint.format_error(cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic(null,"Too many parameters for directive \"~C\": ~D~:* ~[were~;was~:;were~] specified but only ~D~:* ~[are~;is~:;are~] allowed",cljs.core.array_seq([new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def),cljs.core.count(params),cljs.core.count(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(def))], 0)),cljs.core.second(cljs.core.first(params)));
} else {
}

cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (p1__162_SHARP_,p2__163_SHARP_){
var val = cljs.core.first(p1__162_SHARP_);
if(!(((val == null)) || (cljs.core.contains_QMARK_(cljs.pprint.special_params,val)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.second(cljs.core.second(p2__163_SHARP_)),cljs.core.type(val))))){
return cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Parameter "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.first(p2__163_SHARP_))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" has bad type in directive \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\": "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(val))].join(''),cljs.core.second(p1__162_SHARP_));
} else {
return null;
}
}),params,new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(def)));

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.reverse((function (){var iter__25932__auto__ = (function cljs$pprint$map_params_$_iter__3042(s__3043){
return (new cljs.core.LazySeq(null,(function (){
var s__3043__$1 = s__3043;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__3043__$1);
if(temp__21890__auto__){
var s__3043__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__3043__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__3043__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__3045 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__3044 = (0);
while(true){
if((i__3044 < size__25931__auto__)){
var vec__3060 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__3044);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3060,(0),null);
var vec__3063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3060,(1),null);
var default$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3063,(0),null);
cljs.core.chunk_append(b__3045,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [default$,offset], null)], null));

var G__3072 = (i__3044 + (1));
i__3044 = G__3072;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__3045),cljs$pprint$map_params_$_iter__3042(cljs.core.chunk_rest(s__3043__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__3045),null);
}
} else {
var vec__3066 = cljs.core.first(s__3043__$2);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3066,(0),null);
var vec__3069 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3066,(1),null);
var default$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3069,(0),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [default$,offset], null)], null),cljs$pprint$map_params_$_iter__3042(cljs.core.rest(s__3043__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__25932__auto__(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(def));
})())),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__164_SHARP_,p2__165_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc,p1__164_SHARP_,p2__165_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__166_SHARP_){
return cljs.core.first(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__166_SHARP_,(1)));
}),cljs.core.zipmap(cljs.core.keys(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(def)),params))),flags], 0));
}); return (
new cljs.core.Var(function(){return cljs.pprint.map_params;},new cljs.core.Symbol("cljs.pprint","map-params","cljs.pprint/map-params",(1832007044),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map-params","map-params",(1711082621),null),"cljs/pprint.cljs",(18),(1),(2514),(2514),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"def","def",(597100991),null),new cljs.core.Symbol(null,"params","params",(-1943919534),null),new cljs.core.Symbol(null,"flags","flags",(-879017694),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),"Takes a directive definition and the list of actual parameters and\na map of flags and returns a map of the parameters and flags with defaults\nfilled in. We check to make sure that there are the right types and number\nof parameters as well.",(cljs.core.truth_(cljs.pprint.map_params)?cljs.pprint.map_params.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.compile_directive = (function cljs$pprint$compile_directive(s,offset){
var vec__3085 = cljs.pprint.extract_params(s,offset);
var raw_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3085,(0),null);
var vec__3088 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3085,(1),null);
var rest = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3088,(0),null);
var offset__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3088,(1),null);
var vec__3091 = cljs.pprint.extract_flags(rest,offset__$1);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3091,(0),null);
var vec__3094 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3091,(1),null);
var rest__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3094,(0),null);
var offset__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3094,(1),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3094,(2),null);
var directive = cljs.core.first(rest__$1);
var def = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.pprint.directive_table,clojure.string.upper_case(directive));
var params = (cljs.core.truth_(def)?cljs.pprint.map_params(def,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.pprint.translate_param,raw_params),flags,offset__$2):null);
if(cljs.core.not(directive)){
cljs.pprint.format_error("Format string ended in the middle of a directive",offset__$2);
} else {
}

if(cljs.core.not(def)){
cljs.pprint.format_error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Directive \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(directive),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\" is undefined")].join(''),offset__$2);
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.pprint.compiled_directive(new cljs.core.Keyword(null,"generator-fn","generator-fn",(811851656)).cljs$core$IFn$_invoke$arity$1(def).call(null,params,offset__$2),def,params,offset__$2,null,null,null)),(function (){var remainder = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(rest__$1,(1));
var offset__$3 = (offset__$2 + (1));
var trim_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\n",new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(def))) && (cljs.core.not(new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(params)));
var trim_count = ((trim_QMARK_)?cljs.pprint.prefix_count(remainder,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [" ","\t"], null)):(0));
var remainder__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(remainder,trim_count);
var offset__$4 = (offset__$3 + trim_count);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [remainder__$1,offset__$4], null);
})()], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.compile_directive;},new cljs.core.Symbol("cljs.pprint","compile-directive","cljs.pprint/compile-directive",(-573498725),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"compile-directive","compile-directive",(-426089646),null),"cljs/pprint.cljs",(25),(1),(2544),(2544),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.compile_directive)?cljs.pprint.compile_directive.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.compile_raw_string = (function cljs$pprint$compile_raw_string(s,offset){
return (new cljs.pprint.compiled_directive((function (_,a,___$1){
cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s], 0));

return a;
}),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"string","string",(-1989541586)),s], null),offset,null,null,null));
}); return (
new cljs.core.Var(function(){return cljs.pprint.compile_raw_string;},new cljs.core.Symbol("cljs.pprint","compile-raw-string","cljs.pprint/compile-raw-string",(1717683231),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"compile-raw-string","compile-raw-string",(1864953382),null),"cljs/pprint.cljs",(26),(1),(2564),(2564),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null)], null)),null,(cljs.core.truth_(cljs.pprint.compile_raw_string)?cljs.pprint.compile_raw_string.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.right_bracket = (function cljs$pprint$right_bracket(this$){
return new cljs.core.Keyword(null,"right","right",(-452581833)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.right_bracket;},new cljs.core.Symbol("cljs.pprint","right-bracket","cljs.pprint/right-bracket",(-2117359522),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"right-bracket","right-bracket",(-1702579689),null),"cljs/pprint.cljs",(21),(1),(2567),(2567),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.right_bracket)?cljs.pprint.right_bracket.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.separator_QMARK_ = (function cljs$pprint$separator_QMARK_(this$){
return new cljs.core.Keyword(null,"separator","separator",(-1628749125)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.separator_QMARK_;},new cljs.core.Symbol("cljs.pprint","separator?","cljs.pprint/separator?",(412876696),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"separator?","separator?",(22210129),null),"cljs/pprint.cljs",(18),(1),(2569),(2569),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.separator_QMARK_)?cljs.pprint.separator_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.else_separator_QMARK_ = (function cljs$pprint$else_separator_QMARK_(this$){
var and__22563__auto__ = new cljs.core.Keyword(null,"separator","separator",(-1628749125)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$)));
if(cljs.core.truth_(and__22563__auto__)){
return new cljs.core.Keyword(null,"colon","colon",(-965200945)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(this$));
} else {
return and__22563__auto__;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.else_separator_QMARK_;},new cljs.core.Symbol("cljs.pprint","else-separator?","cljs.pprint/else-separator?",(-202896864),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"else-separator?","else-separator?",(-53402647),null),"cljs/pprint.cljs",(23),(1),(2571),(2571),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null)], null)),null,(cljs.core.truth_(cljs.pprint.else_separator_QMARK_)?cljs.pprint.else_separator_QMARK_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.collect_clauses; return (
new cljs.core.Var(function(){return cljs.pprint.collect_clauses;},new cljs.core.Symbol("cljs.pprint","collect-clauses","cljs.pprint/collect-clauses",(1583040189),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"collect-clauses","collect-clauses",(1453076710),null),"cljs/pprint.cljs",(25),(1),(2575),true,(2575),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.collect_clauses)?cljs.pprint.collect_clauses.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.process_bracket = (function cljs$pprint$process_bracket(this$,remainder){
var vec__3103 = (function (){var G__3106 = new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$));
var G__3107 = new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(this$);
var G__3108 = remainder;
return (cljs.pprint.collect_clauses.cljs$core$IFn$_invoke$arity$3 ? cljs.pprint.collect_clauses.cljs$core$IFn$_invoke$arity$3(G__3106,G__3107,G__3108) : cljs.pprint.collect_clauses.call(null,G__3106,G__3107,G__3108));
})();
var subex = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3103,(0),null);
var remainder__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3103,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.pprint.compiled_directive(new cljs.core.Keyword(null,"func","func",(-238706040)).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(this$),cljs.pprint.tuple_map(subex,new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(this$))], 0)),new cljs.core.Keyword(null,"offset","offset",(296498311)).cljs$core$IFn$_invoke$arity$1(this$),null,null,null)),remainder__$1], null);
}); return (
new cljs.core.Var(function(){return cljs.pprint.process_bracket;},new cljs.core.Symbol("cljs.pprint","process-bracket","cljs.pprint/process-bracket",(1995193161),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"process-bracket","process-bracket",(1906644336),null),"cljs/pprint.cljs",(23),(1),(2577),(2577),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"this","this",(1028897902),null),new cljs.core.Symbol(null,"remainder","remainder",(-1608248897),null)], null)),null,(cljs.core.truth_(cljs.pprint.process_bracket)?cljs.pprint.process_bracket.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.process_clause = (function cljs$pprint$process_clause(bracket_info,offset,remainder){
return cljs.pprint.consume((function (remainder__$1){
if(cljs.core.empty_QMARK_(remainder__$1)){
return cljs.pprint.format_error("No closing bracket found.",offset);
} else {
var this$ = cljs.core.first(remainder__$1);
var remainder__$2 = cljs.core.next(remainder__$1);
if(cljs.core.truth_(cljs.pprint.right_bracket(this$))){
return cljs.pprint.process_bracket(this$,remainder__$2);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"right","right",(-452581833)).cljs$core$IFn$_invoke$arity$1(bracket_info),new cljs.core.Keyword(null,"directive","directive",(793559132)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"right-bracket","right-bracket",(951856080)),new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(this$),null,remainder__$2], null)], null);
} else {
if(cljs.core.truth_(cljs.pprint.else_separator_QMARK_(this$))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"else","else",(-1508377146)),null,new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(this$),remainder__$2], null)], null);
} else {
if(cljs.core.truth_(cljs.pprint.separator_QMARK_(this$))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"separator","separator",(-1628749125)),null,null,remainder__$2], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$,remainder__$2], null);

}
}
}
}
}
}),remainder);
}); return (
new cljs.core.Var(function(){return cljs.pprint.process_clause;},new cljs.core.Symbol("cljs.pprint","process-clause","cljs.pprint/process-clause",(1522217507),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"process-clause","process-clause",(1105205352),null),"cljs/pprint.cljs",(22),(1),(2586),(2586),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"bracket-info","bracket-info",(40438753),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"remainder","remainder",(-1608248897),null)], null)),null,(cljs.core.truth_(cljs.pprint.process_clause)?cljs.pprint.process_clause.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.collect_clauses = (function cljs$pprint$collect_clauses(bracket_info,offset,remainder){
return cljs.core.second(cljs.pprint.consume((function (p__3119){
var vec__3120 = p__3119;
var clause_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3120,(0),null);
var saw_else = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3120,(1),null);
var remainder__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3120,(2),null);
var vec__3123 = cljs.pprint.process_clause(bracket_info,offset,remainder__$1);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3123,(0),null);
var vec__3126 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3123,(1),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3126,(0),null);
var right_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3126,(1),null);
var else_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3126,(2),null);
var remainder__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3126,(3),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,new cljs.core.Keyword(null,"right-bracket","right-bracket",(951856080)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([clause_map,cljs.core.PersistentArrayMap.createAsIfByAssoc([(cljs.core.truth_(saw_else)?new cljs.core.Keyword(null,"else","else",(-1508377146)):new cljs.core.Keyword(null,"clauses","clauses",(1454841241))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null),new cljs.core.Keyword(null,"right-params","right-params",(-1790676237)),right_params])], 0)),remainder__$2], null)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,new cljs.core.Keyword(null,"else","else",(-1508377146)))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(clause_map))){
return cljs.pprint.format_error("Two else clauses (\"~:;\") inside bracket construction.",offset);
} else {
if(cljs.core.not(new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(bracket_info))){
return cljs.pprint.format_error("An else clause (\"~:;\") is in a bracket type that doesn't support it.",offset);
} else {
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"first","first",(-644103046)),new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(bracket_info))) && (cljs.core.seq(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(clause_map)))){
return cljs.pprint.format_error("The else clause (\"~:;\") is only allowed in the first position for this directive.",offset);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"first","first",(-644103046)),new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(bracket_info))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([clause_map,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"else","else",(-1508377146)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null),new cljs.core.Keyword(null,"else-params","else-params",(-832171646)),else_params], null)], 0)),false,remainder__$2], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([clause_map,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clauses","clauses",(1454841241)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null)], null)], 0)),true,remainder__$2], null)], null);
}

}
}
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,new cljs.core.Keyword(null,"separator","separator",(-1628749125)))){
if(cljs.core.truth_(saw_else)){
return cljs.pprint.format_error("A plain clause (with \"~;\") follows an else clause (\"~:;\") inside bracket construction.",offset);
} else {
if(cljs.core.not(new cljs.core.Keyword(null,"allows-separator","allows-separator",(-818967742)).cljs$core$IFn$_invoke$arity$1(bracket_info))){
return cljs.pprint.format_error("A separator (\"~;\") is in a bracket type that doesn't support it.",offset);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([clause_map,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clauses","clauses",(1454841241)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null)], null)], 0)),false,remainder__$2], null)], null);

}
}
} else {
return null;
}
}
}
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clauses","clauses",(1454841241)),cljs.core.PersistentVector.EMPTY], null),false,remainder], null)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.collect_clauses;},new cljs.core.Symbol("cljs.pprint","collect-clauses","cljs.pprint/collect-clauses",(1583040189),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"collect-clauses","collect-clauses",(1453076710),null),"cljs/pprint.cljs",(23),(1),(2610),(2610),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"bracket-info","bracket-info",(40438753),null),new cljs.core.Symbol(null,"offset","offset",(1937029838),null),new cljs.core.Symbol(null,"remainder","remainder",(-1608248897),null)], null)),null,(cljs.core.truth_(cljs.pprint.collect_clauses)?cljs.pprint.collect_clauses.cljs$lang$test:null)])));})()
;
/**
 * Take a linearly compiled format and process the bracket directives to give it
 * the appropriate tree structure
 */
(function (){
cljs.pprint.process_nesting = (function cljs$pprint$process_nesting(format){
return cljs.core.first(cljs.pprint.consume((function (remainder){
var this$ = cljs.core.first(remainder);
var remainder__$1 = cljs.core.next(remainder);
var bracket = new cljs.core.Keyword(null,"bracket-info","bracket-info",(-1600092774)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(this$));
if(cljs.core.truth_(new cljs.core.Keyword(null,"right","right",(-452581833)).cljs$core$IFn$_invoke$arity$1(bracket))){
return cljs.pprint.process_bracket(this$,remainder__$1);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$,remainder__$1], null);
}
}),format));
}); return (
new cljs.core.Var(function(){return cljs.pprint.process_nesting;},new cljs.core.Symbol("cljs.pprint","process-nesting","cljs.pprint/process-nesting",(-1417859975),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"process-nesting","process-nesting",(-1551493728),null),"cljs/pprint.cljs",(23),(1),(2659),(2659),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null)], null)),"Take a linearly compiled format and process the bracket directives to give it\n   the appropriate tree structure",(cljs.core.truth_(cljs.pprint.process_nesting)?cljs.pprint.process_nesting.cljs$lang$test:null)])));})()
;
/**
 * Compiles format-str into a compiled format which can be used as an argument
 * to cl-format just like a plain format string. Use this function for improved
 * performance when you're using the same format string repeatedly
 */
(function (){
cljs.pprint.compile_format = (function cljs$pprint$compile_format(format_str){
var _STAR_format_str_STAR_3134 = cljs.pprint._STAR_format_str_STAR_;
cljs.pprint._STAR_format_str_STAR_ = format_str;

try{return cljs.pprint.process_nesting(cljs.core.first(cljs.pprint.consume(((function (_STAR_format_str_STAR_3134){
return (function (p__3135){
var vec__3136 = p__3135;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3136,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3136,(1),null);
if(cljs.core.empty_QMARK_(s)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,s], null);
} else {
var tilde = s.indexOf("~");
if((tilde < (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.pprint.compile_raw_string(s,offset),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",(offset + s.length)], null)], null);
} else {
if((tilde === (0))){
return cljs.pprint.compile_directive(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(1)),(offset + (1)));
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.pprint.compile_raw_string(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),tilde),offset),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,tilde),(tilde + offset)], null)], null);

}
}
}
});})(_STAR_format_str_STAR_3134))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [format_str,(0)], null))));
}finally {cljs.pprint._STAR_format_str_STAR_ = _STAR_format_str_STAR_3134;
}}); return (
new cljs.core.Var(function(){return cljs.pprint.compile_format;},new cljs.core.Symbol("cljs.pprint","compile-format","cljs.pprint/compile-format",(-1633629368),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"compile-format","compile-format",(-1771593359),null),"cljs/pprint.cljs",(22),(1),(2674),(2674),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format-str","format-str",(-1959229613),null)], null)),"Compiles format-str into a compiled format which can be used as an argument\nto cl-format just like a plain format string. Use this function for improved\nperformance when you're using the same format string repeatedly",(cljs.core.truth_(cljs.pprint.compile_format)?cljs.pprint.compile_format.cljs$lang$test:null)])));})()
;
/**
 * determine whether a given compiled format has any directives that depend on the
 * column number or pretty printing
 */
(function (){
cljs.pprint.needs_pretty = (function cljs$pprint$needs_pretty(format){
var format__$1 = format;
while(true){
if(cljs.core.empty_QMARK_(format__$1)){
return false;
} else {
if(cljs.core.truth_((function (){var or__22603__auto__ = new cljs.core.Keyword(null,"pretty","pretty",(-1916372486)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"flags","flags",(1775418075)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"def","def",(-1043430536)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(format__$1))));
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
var or__22603__auto____$1 = cljs.core.some(cljs.pprint.needs_pretty,cljs.core.first(new cljs.core.Keyword(null,"clauses","clauses",(1454841241)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(format__$1)))));
if(cljs.core.truth_(or__22603__auto____$1)){
return or__22603__auto____$1;
} else {
return cljs.core.some(cljs.pprint.needs_pretty,cljs.core.first(new cljs.core.Keyword(null,"else","else",(-1508377146)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(cljs.core.first(format__$1)))));
}
}
})())){
return true;
} else {
var G__3139 = cljs.core.next(format__$1);
format__$1 = G__3139;
continue;
}
}
break;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.needs_pretty;},new cljs.core.Symbol("cljs.pprint","needs-pretty","cljs.pprint/needs-pretty",(64088824),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"needs-pretty","needs-pretty",(949407875),null),"cljs/pprint.cljs",(20),(1),(2694),(2694),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null)], null)),"determine whether a given compiled format has any directives that depend on the\ncolumn number or pretty printing",(cljs.core.truth_(cljs.pprint.needs_pretty)?cljs.pprint.needs_pretty.cljs$lang$test:null)])));})()
;
/**
 * Executes the format with the arguments.
 */
(function (){
cljs.pprint.execute_format = (function cljs$pprint$execute_format(var_args){
var args3140 = [];
var len__26427__auto___3150 = arguments.length;
var i__26428__auto___3151 = (0);
while(true){
if((i__26428__auto___3151 < len__26427__auto___3150)){
args3140.push((arguments[i__26428__auto___3151]));

var G__3152 = (i__26428__auto___3151 + (1));
i__26428__auto___3151 = G__3152;
continue;
} else {
}
break;
}

var G__3142 = args3140.length;
switch (G__3142) {
case (3):
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case (2):
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args3140.length)].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.pprint.execute_format;},new cljs.core.Symbol("cljs.pprint","execute-format","cljs.pprint/execute-format",(1971623147),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"execute-format","execute-format",(223314476),null),"cljs/pprint.cljs",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),true,(1),(2719),(2719),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Executes the format with the arguments.",(cljs.core.truth_(cljs.pprint.execute_format)?cljs.pprint.execute_format.cljs$lang$test:null)])));})()
;

cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$3 = (function (stream,format,args){
var sb = (new goog.string.StringBuffer());
var real_stream = (((cljs.core.not(stream)) || (stream === true))?(new cljs.core.StringBufferWriter(sb)):stream);
var wrapped_stream = (cljs.core.truth_((function (){var and__22563__auto__ = cljs.pprint.needs_pretty(format);
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.not(cljs.pprint.pretty_writer_QMARK_(real_stream));
} else {
return and__22563__auto__;
}
})())?cljs.pprint.get_pretty_writer(real_stream):real_stream);
var _STAR_out_STAR_3143 = cljs.core._STAR_out_STAR_;
cljs.core._STAR_out_STAR_ = wrapped_stream;

try{try{cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(format,args);
}finally {if(!((real_stream === wrapped_stream))){
cljs.core._flush(wrapped_stream);
} else {
}
}
if(cljs.core.not(stream)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('');
} else {
if(stream === true){
return (cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')) : cljs.core._STAR_print_fn_STAR_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join('')));
} else {
return null;

}
}
}finally {cljs.core._STAR_out_STAR_ = _STAR_out_STAR_3143;
}});

cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2 = (function (format,args){
cljs.pprint.map_passing_context((function (element,context){
if(cljs.core.truth_(cljs.pprint.abort_QMARK_(context))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,context], null);
} else {
var vec__3144 = cljs.pprint.realize_parameter_list(new cljs.core.Keyword(null,"params","params",(710516235)).cljs$core$IFn$_invoke$arity$1(element),context);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3144,(0),null);
var args__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3144,(1),null);
var vec__3147 = cljs.pprint.unzip_map(params);
var params__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3147,(0),null);
var offsets = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3147,(1),null);
var params__$2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(params__$1,new cljs.core.Keyword(null,"base-args","base-args",(-1268706822)),args__$1);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"func","func",(-238706040)).cljs$core$IFn$_invoke$arity$1(element),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [params__$2,args__$1,offsets], null))], null);
}
}),args,format);

return null;
});

cljs.pprint.execute_format.cljs$lang$maxFixedArity = (3);

new cljs.core.Var(function(){return cljs.pprint.execute_format;},new cljs.core.Symbol("cljs.pprint","execute-format","cljs.pprint/execute-format",(1971623147),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"execute-format","execute-format",(223314476),null),"cljs/pprint.cljs",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),true,(1),(2719),(2719),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"stream","stream",(-1119494121),null),new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"format","format",(333606761),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Executes the format with the arguments.",(cljs.core.truth_(cljs.pprint.execute_format)?cljs.pprint.execute_format.cljs$lang$test:null)]));
(function (){
cljs.pprint.cached_compile = cljs.core.memoize(cljs.pprint.compile_format); return (
new cljs.core.Var(function(){return cljs.pprint.cached_compile;},new cljs.core.Symbol("cljs.pprint","cached-compile","cljs.pprint/cached-compile",(194847165),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"cached-compile","cached-compile",(323111910),null),"cljs/pprint.cljs",(37),(1),(2757),(2757),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.cached_compile)?cljs.pprint.cached_compile.cljs$lang$test:null)])));})()
;
/**
 * Installs a function as a new method of multimethod associated with dispatch-value. 
 */
(function (){
cljs.pprint.use_method = (function cljs$pprint$use_method(multifn,dispatch_val,func){
return cljs.core._add_method(multifn,dispatch_val,func);
}); return (
new cljs.core.Var(function(){return cljs.pprint.use_method;},new cljs.core.Symbol("cljs.pprint","use-method","cljs.pprint/use-method",(-1867903879),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"use-method","use-method",(-1737267650),null),"cljs/pprint.cljs",(18),(1),(2763),(2763),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"multifn","multifn",(-1904313150),null),new cljs.core.Symbol(null,"dispatch-val","dispatch-val",(69061000),null),new cljs.core.Symbol(null,"func","func",(1401825487),null)], null)),"Installs a function as a new method of multimethod associated with dispatch-value. ",(cljs.core.truth_(cljs.pprint.use_method)?cljs.pprint.use_method.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.reader_macros = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Symbol(null,"quote","quote",(1377916282),null),"'",new cljs.core.Symbol(null,"var","var",(870848730),null),"#'",new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",(188719157),null),"@",new cljs.core.Symbol("clojure.core","unquote","clojure.core/unquote",(843087510),null),"~",new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null),"@",new cljs.core.Symbol("cljs.core","unquote","cljs.core/unquote",(1013085760),null),"~"], null); return (
new cljs.core.Var(function(){return cljs.pprint.reader_macros;},new cljs.core.Symbol("cljs.pprint","reader-macros","cljs.pprint/reader-macros",(267165296),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"reader-macros","reader-macros",(389395641),null),"cljs/pprint.cljs",(36),(1),(2788),(2788),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.reader_macros)?cljs.pprint.reader_macros.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_reader_macro = (function cljs$pprint$pprint_reader_macro(alis){
var macro_char = (function (){var G__3155 = cljs.core.first(alis);
return (cljs.pprint.reader_macros.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.reader_macros.cljs$core$IFn$_invoke$arity$1(G__3155) : cljs.pprint.reader_macros.call(null,G__3155));
})();
if(cljs.core.truth_((function (){var and__22563__auto__ = macro_char;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(alis));
} else {
return and__22563__auto__;
}
})())){
cljs.core._write(cljs.core._STAR_out_STAR_,macro_char);

cljs.pprint.write_out(cljs.core.second(alis));

return true;
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_reader_macro;},new cljs.core.Symbol("cljs.pprint","pprint-reader-macro","cljs.pprint/pprint-reader-macro",(1517072315),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-reader-macro","pprint-reader-macro",(1117241714),null),"cljs/pprint.cljs",(27),(1),(2796),(2796),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_reader_macro)?cljs.pprint.pprint_reader_macro.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_simple_list = (function cljs$pprint$pprint_simple_list(alis){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3159_3162 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3160_3163 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

var length_count3161_3164 = (0);
var alis_3165__$1 = cljs.core.seq(alis);
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3161_3164 < cljs.core._STAR_print_length_STAR_))){
if(alis_3165__$1){
cljs.pprint.write_out(cljs.core.first(alis_3165__$1));

if(cljs.core.next(alis_3165__$1)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3166 = (length_count3161_3164 + (1));
var G__3167 = cljs.core.next(alis_3165__$1);
length_count3161_3164 = G__3166;
alis_3165__$1 = G__3167;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3160_3163;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3159_3162;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_simple_list;},new cljs.core.Symbol("cljs.pprint","pprint-simple-list","cljs.pprint/pprint-simple-list",(756939991),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-simple-list","pprint-simple-list",(635045534),null),"cljs/pprint.cljs",(26),(1),(2813),(2813),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_simple_list)?cljs.pprint.pprint_simple_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_list = (function cljs$pprint$pprint_list(alis){
if(cljs.core.not(cljs.pprint.pprint_reader_macro(alis))){
return cljs.pprint.pprint_simple_list(alis);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_list;},new cljs.core.Symbol("cljs.pprint","pprint-list","cljs.pprint/pprint-list",(-614793046),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-list","pprint-list",(-602793235),null),"cljs/pprint.cljs",(19),(1),(2823),(2823),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_list)?cljs.pprint.pprint_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_vector = (function cljs$pprint$pprint_vector(avec){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3171_3174 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3172_3175 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"[",null,"]");

var length_count3173_3176 = (0);
var aseq_3177 = cljs.core.seq(avec);
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3173_3176 < cljs.core._STAR_print_length_STAR_))){
if(aseq_3177){
cljs.pprint.write_out(cljs.core.first(aseq_3177));

if(cljs.core.next(aseq_3177)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3178 = (length_count3173_3176 + (1));
var G__3179 = cljs.core.next(aseq_3177);
length_count3173_3176 = G__3178;
aseq_3177 = G__3179;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3172_3175;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3171_3174;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_vector;},new cljs.core.Symbol("cljs.pprint","pprint-vector","cljs.pprint/pprint-vector",(1034781727),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-vector","pprint-vector",(-982077914),null),"cljs/pprint.cljs",(21),(1),(2828),(2828),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"avec","avec",(531283965),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_vector)?cljs.pprint.pprint_vector.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_array = (function (){var format_in__106__auto__ = "~<[~;~@{~w~^, ~:_~}~;]~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3180__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3180 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3181__i = 0, G__3181__a = new Array(arguments.length -  0);
while (G__3181__i < G__3181__a.length) {G__3181__a[G__3181__i] = arguments[G__3181__i + 0]; ++G__3181__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3181__a,0,null);
} 
return G__3180__delegate.call(this,args__108__auto__);};
G__3180.cljs$lang$maxFixedArity = 0;
G__3180.cljs$lang$applyTo = (function (arglist__3182){
var args__108__auto__ = cljs.core.seq(arglist__3182);
return G__3180__delegate(args__108__auto__);
});
G__3180.cljs$core$IFn$_invoke$arity$variadic = G__3180__delegate;
return G__3180;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})(); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_array;},new cljs.core.Symbol("cljs.pprint","pprint-array","cljs.pprint/pprint-array",(-1138995378),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-array","pprint-array",(-2058922617),null),"cljs/pprint.cljs",(35),(1),(2838),(2838),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_array)?cljs.pprint.pprint_array.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_map = (function cljs$pprint$pprint_map(amap){
var vec__3191 = ((!(cljs.core.record_QMARK_(amap)))?new cljs.core.Var(function(){return cljs.core.lift_ns;},new cljs.core.Symbol("cljs.core","lift-ns","cljs.core/lift-ns",(463499081),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",(770546058),null),new cljs.core.Symbol(null,"lift-ns","lift-ns",(602311926),null),"cljs/core.cljs",(15),(1),(9612),(9612),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",(-1021758608),null)], null)),"Returns [lifted-ns lifted-map] or nil if m can't be lifted.",(cljs.core.truth_(cljs.core.lift_ns)?cljs.core.lift_ns.cljs$lang$test:null)])).call(null,amap):null);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3191,(0),null);
var lift_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3191,(1),null);
var amap__$1 = (function (){var or__22603__auto__ = lift_map;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return amap;
}
})();
var prefix = (cljs.core.truth_(ns)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1("#:"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1("{")].join(''):"{");
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3194_3199 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3195_3200 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,prefix,null,"}");

var length_count3196_3201 = (0);
var aseq_3202 = cljs.core.seq(amap__$1);
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3196_3201 < cljs.core._STAR_print_length_STAR_))){
if(aseq_3202){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3197_3203 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3198_3204 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,null,null,null);

cljs.pprint.write_out(cljs.core.ffirst(aseq_3202));

cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

cljs.pprint._STAR_current_length_STAR_ = (0);

cljs.pprint.write_out(cljs.core.fnext(cljs.core.first(aseq_3202)));

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3198_3204;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3197_3203;
}}


if(cljs.core.next(aseq_3202)){
cljs.core._write(cljs.core._STAR_out_STAR_,", ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3205 = (length_count3196_3201 + (1));
var G__3206 = cljs.core.next(aseq_3202);
length_count3196_3201 = G__3205;
aseq_3202 = G__3206;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3195_3200;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3194_3199;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_map;},new cljs.core.Symbol("cljs.pprint","pprint-map","cljs.pprint/pprint-map",(1135098419),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-map","pprint-map",(988218484),null),"cljs/pprint.cljs",(18),(1),(2841),(2841),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"amap","amap",(635923055),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_map)?cljs.pprint.pprint_map.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_simple_default = (function cljs$pprint$pprint_simple_default(obj){
return cljs.core._write(cljs.core._STAR_out_STAR_,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([obj], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_simple_default;},new cljs.core.Symbol("cljs.pprint","pprint-simple-default","cljs.pprint/pprint-simple-default",(-609339822),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-simple-default","pprint-simple-default",(546430869),null),"cljs/pprint.cljs",(29),(1),(2862),(2862),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"obj","obj",(-1672671807),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_simple_default)?cljs.pprint.pprint_simple_default.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_set = (function (){var format_in__106__auto__ = "~<#{~;~@{~w~^ ~:_~}~;}~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3207__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3207 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3208__i = 0, G__3208__a = new Array(arguments.length -  0);
while (G__3208__i < G__3208__a.length) {G__3208__a[G__3208__i] = arguments[G__3208__i + 0]; ++G__3208__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3208__a,0,null);
} 
return G__3207__delegate.call(this,args__108__auto__);};
G__3207.cljs$lang$maxFixedArity = 0;
G__3207.cljs$lang$applyTo = (function (arglist__3209){
var args__108__auto__ = cljs.core.seq(arglist__3209);
return G__3207__delegate(args__108__auto__);
});
G__3207.cljs$core$IFn$_invoke$arity$variadic = G__3207__delegate;
return G__3207;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})(); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_set;},new cljs.core.Symbol("cljs.pprint","pprint-set","cljs.pprint/pprint-set",(-1762731483),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-set","pprint-set",(-1349127186),null),"cljs/pprint.cljs",(16),(1),(2866),(2866),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_set)?cljs.pprint.pprint_set.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.type_map = new cljs.core.PersistentArrayMap(null, 2, ["core$future_call","Future","core$promise","Promise"], null); return (
new cljs.core.Var(function(){return cljs.pprint.type_map;},new cljs.core.Symbol("cljs.pprint","type-map","cljs.pprint/type-map",(1041216721),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"type-map","type-map",(893688474),null),"cljs/pprint.cljs",(9),(1),(2868),(2869),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.type_map)?cljs.pprint.type_map.cljs$lang$test:null)])));})()
;
/**
 * Map ugly type names to something simpler
 */
(function (){
cljs.pprint.map_ref_type = (function cljs$pprint$map_ref_type(name){
var or__22603__auto__ = (function (){var temp__21890__auto__ = cljs.core.re_find(/^[^$]+\$[^$]+/,name);
if(cljs.core.truth_(temp__21890__auto__)){
var match = temp__21890__auto__;
return (cljs.pprint.type_map.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.type_map.cljs$core$IFn$_invoke$arity$1(match) : cljs.pprint.type_map.call(null,match));
} else {
return null;
}
})();
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return name;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.map_ref_type;},new cljs.core.Symbol("cljs.pprint","map-ref-type","cljs.pprint/map-ref-type",(-1777478668),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"map-ref-type","map-ref-type",(-305858497),null),"cljs/pprint.cljs",(20),(1),(2872),(2872),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",(-810760592),null)], null)),"Map ugly type names to something simpler",(cljs.core.truth_(cljs.pprint.map_ref_type)?cljs.pprint.map_ref_type.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_ideref = (function cljs$pprint$pprint_ideref(o){
var prefix = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("#<"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.pprint.map_ref_type(cljs.core.type(o).name)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("@"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.getUid(o)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(": ")].join('');
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3214_3218 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3215_3219 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,prefix,null,">");

cljs.pprint.pprint_indent(new cljs.core.Keyword(null,"block","block",(664686210)),(- (cljs.core.count(prefix) - (2))));

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

cljs.pprint.write_out((((function (){var and__22563__auto__ = ((!((o == null)))?((((o.cljs$lang$protocol_mask$partition1$ & (1))) || ((cljs.core.PROTOCOL_SENTINEL === o.cljs$core$IPending$)))?true:(((!o.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IPending,o):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IPending,o));
if(and__22563__auto__){
return !(cljs.core._realized_QMARK_(o));
} else {
return and__22563__auto__;
}
})())?new cljs.core.Keyword(null,"not-delivered","not-delivered",(1599158697)):(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(o) : cljs.core.deref.call(null,o))));

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3215_3219;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3214_3218;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_ideref;},new cljs.core.Symbol("cljs.pprint","pprint-ideref","cljs.pprint/pprint-ideref",(-1952492023),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-ideref","pprint-ideref",(-1834587058),null),"cljs/pprint.cljs",(21),(1),(2879),(2879),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"o","o",(290524299),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_ideref)?cljs.pprint.pprint_ideref.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_pqueue = (function (){var format_in__106__auto__ = "~<<-(~;~@{~w~^ ~_~}~;)-<~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3220__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3220 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3221__i = 0, G__3221__a = new Array(arguments.length -  0);
while (G__3221__i < G__3221__a.length) {G__3221__a[G__3221__i] = arguments[G__3221__i + 0]; ++G__3221__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3221__a,0,null);
} 
return G__3220__delegate.call(this,args__108__auto__);};
G__3220.cljs$lang$maxFixedArity = 0;
G__3220.cljs$lang$applyTo = (function (arglist__3222){
var args__108__auto__ = cljs.core.seq(arglist__3222);
return G__3220__delegate(args__108__auto__);
});
G__3220.cljs$core$IFn$_invoke$arity$variadic = G__3220__delegate;
return G__3220;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})(); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_pqueue;},new cljs.core.Symbol("cljs.pprint","pprint-pqueue","cljs.pprint/pprint-pqueue",(-127405457),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-pqueue","pprint-pqueue",(-2027890668),null),"cljs/pprint.cljs",(36),(1),(2890),(2890),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_pqueue)?cljs.pprint.pprint_pqueue.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.type_dispatcher = (function cljs$pprint$type_dispatcher(obj){
if((obj instanceof cljs.core.PersistentQueue)){
return new cljs.core.Keyword(null,"queue","queue",(1455835879));
} else {
if(((!((obj == null)))?((((obj.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === obj.cljs$core$IDeref$)))?true:(((!obj.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,obj):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,obj))){
return new cljs.core.Keyword(null,"deref","deref",(-145586795));
} else {
if((obj instanceof cljs.core.Symbol)){
return new cljs.core.Keyword(null,"symbol","symbol",(-1038572696));
} else {
if(cljs.core.seq_QMARK_(obj)){
return new cljs.core.Keyword(null,"list","list",(765357683));
} else {
if(cljs.core.map_QMARK_(obj)){
return new cljs.core.Keyword(null,"map","map",(1371690461));
} else {
if(cljs.core.vector_QMARK_(obj)){
return new cljs.core.Keyword(null,"vector","vector",(1902966158));
} else {
if(cljs.core.set_QMARK_(obj)){
return new cljs.core.Keyword(null,"set","set",(304602554));
} else {
if((obj == null)){
return null;
} else {
return new cljs.core.Keyword(null,"default","default",(-1987822328));

}
}
}
}
}
}
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.type_dispatcher;},new cljs.core.Symbol("cljs.pprint","type-dispatcher","cljs.pprint/type-dispatcher",(291155015),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"type-dispatcher","type-dispatcher",(370383372),null),"cljs/pprint.cljs",(23),(1),(2892),(2892),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"obj","obj",(-1672671807),null)], null)),null,(cljs.core.truth_(cljs.pprint.type_dispatcher)?cljs.pprint.type_dispatcher.cljs$lang$test:null)])));})()
;
if(typeof cljs.pprint.simple_dispatch !== 'undefined'){
} else {
/**
 * The pretty print dispatch function for simple data structure format.
 */
(function (){
cljs.pprint.simple_dispatch = (function (){var method_table__26238__auto__ = (function (){var G__3225 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3225) : cljs.core.atom.call(null,G__3225));
})();
var prefer_table__26239__auto__ = (function (){var G__3226 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3226) : cljs.core.atom.call(null,G__3226));
})();
var method_cache__26240__auto__ = (function (){var G__3227 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3227) : cljs.core.atom.call(null,G__3227));
})();
var cached_hierarchy__26241__auto__ = (function (){var G__3228 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3228) : cljs.core.atom.call(null,G__3228));
})();
var hierarchy__26242__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",(-1053470341)),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.pprint","simple-dispatch"),cljs.pprint.type_dispatcher,new cljs.core.Keyword(null,"default","default",(-1987822328)),hierarchy__26242__auto__,method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__));
})(); return (
new cljs.core.Var(function(){return cljs.pprint.simple_dispatch;},new cljs.core.Symbol("cljs.pprint","simple-dispatch","cljs.pprint/simple-dispatch",(1591517689),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"simple-dispatch","simple-dispatch",(623222658),null),"cljs/pprint.cljs",(26),(1),(2904),(2904),cljs.core.List.EMPTY,"The pretty print dispatch function for simple data structure format.",(cljs.core.truth_(cljs.pprint.simple_dispatch)?cljs.pprint.simple_dispatch.cljs$lang$test:null)])));})()
;
}
cljs.pprint.use_method(cljs.pprint.simple_dispatch,new cljs.core.Keyword(null,"list","list",(765357683)),cljs.pprint.pprint_list);
cljs.pprint.use_method(cljs.pprint.simple_dispatch,new cljs.core.Keyword(null,"vector","vector",(1902966158)),cljs.pprint.pprint_vector);
cljs.pprint.use_method(cljs.pprint.simple_dispatch,new cljs.core.Keyword(null,"map","map",(1371690461)),cljs.pprint.pprint_map);
cljs.pprint.use_method(cljs.pprint.simple_dispatch,new cljs.core.Keyword(null,"set","set",(304602554)),cljs.pprint.pprint_set);
cljs.pprint.use_method(cljs.pprint.simple_dispatch,null,(function (){
return cljs.core._write(cljs.core._STAR_out_STAR_,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)));
}));
cljs.pprint.use_method(cljs.pprint.simple_dispatch,new cljs.core.Keyword(null,"default","default",(-1987822328)),cljs.pprint.pprint_simple_default);
cljs.pprint.set_pprint_dispatch(cljs.pprint.simple_dispatch);
(function (){
cljs.pprint.pprint_simple_code_list; return (
new cljs.core.Var(function(){return cljs.pprint.pprint_simple_code_list;},new cljs.core.Symbol("cljs.pprint","pprint-simple-code-list","cljs.pprint/pprint-simple-code-list",(1843600142),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"declared","declared",(92336021)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-simple-code-list","pprint-simple-code-list",(1681454389),null),"cljs/pprint.cljs",(33),(1),(2921),true,(2921),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_simple_code_list)?cljs.pprint.pprint_simple_code_list.cljs$lang$test:null)])));})()
;
/**
 * Figure out which kind of brackets to use
 */
(function (){
cljs.pprint.brackets = (function cljs$pprint$brackets(form){
if(cljs.core.vector_QMARK_(form)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["[","]"], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["(",")"], null);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.brackets;},new cljs.core.Symbol("cljs.pprint","brackets","cljs.pprint/brackets",(817236814),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"brackets","brackets",(-934338431),null),"cljs/pprint.cljs",(16),(1),(2929),(2929),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"form","form",(16469056),null)], null)),"Figure out which kind of brackets to use",(cljs.core.truth_(cljs.pprint.brackets)?cljs.pprint.brackets.cljs$lang$test:null)])));})()
;
/**
 * Pretty print a single reference (import, use, etc.) from a namespace decl
 */
(function (){
cljs.pprint.pprint_ns_reference = (function cljs$pprint$pprint_ns_reference(reference){
if(cljs.core.sequential_QMARK_(reference)){
var vec__3245 = cljs.pprint.brackets(reference);
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3245,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3245,(1),null);
var vec__3248 = reference;
var seq__3249 = cljs.core.seq(vec__3248);
var first__3250 = cljs.core.first(seq__3249);
var seq__3249__$1 = cljs.core.next(seq__3249);
var keyw = first__3250;
var args = seq__3249__$1;
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3251_3261 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3252_3262 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,start,null,end);

(function (){var format_in__106__auto__ = "~w~:i";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3263__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3263 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3264__i = 0, G__3264__a = new Array(arguments.length -  0);
while (G__3264__i < G__3264__a.length) {G__3264__a[G__3264__i] = arguments[G__3264__i + 0]; ++G__3264__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3264__a,0,null);
} 
return G__3263__delegate.call(this,args__108__auto__);};
G__3263.cljs$lang$maxFixedArity = 0;
G__3263.cljs$lang$applyTo = (function (arglist__3265){
var args__108__auto__ = cljs.core.seq(arglist__3265);
return G__3263__delegate(args__108__auto__);
});
G__3263.cljs$core$IFn$_invoke$arity$variadic = G__3263__delegate;
return G__3263;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null,keyw);

var args_3266__$1 = args;
while(true){
if(cljs.core.seq(args_3266__$1)){
(function (){var format_in__106__auto__ = " ";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3267__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3267 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3268__i = 0, G__3268__a = new Array(arguments.length -  0);
while (G__3268__i < G__3268__a.length) {G__3268__a[G__3268__i] = arguments[G__3268__i + 0]; ++G__3268__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3268__a,0,null);
} 
return G__3267__delegate.call(this,args__108__auto__);};
G__3267.cljs$lang$maxFixedArity = 0;
G__3267.cljs$lang$applyTo = (function (arglist__3269){
var args__108__auto__ = cljs.core.seq(arglist__3269);
return G__3267__delegate(args__108__auto__);
});
G__3267.cljs$core$IFn$_invoke$arity$variadic = G__3267__delegate;
return G__3267;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null);

var arg_3270 = cljs.core.first(args_3266__$1);
if(cljs.core.sequential_QMARK_(arg_3270)){
var vec__3253_3271 = cljs.pprint.brackets(arg_3270);
var start_3272__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3253_3271,(0),null);
var end_3273__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3253_3271,(1),null);
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3256_3274 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3257_3275 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,start_3272__$1,null,end_3273__$1);

if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(arg_3270),(3))) && ((cljs.core.second(arg_3270) instanceof cljs.core.Keyword))){
var vec__3258_3276 = arg_3270;
var ns_3277 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3258_3276,(0),null);
var kw_3278 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3258_3276,(1),null);
var lis_3279 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3258_3276,(2),null);
(function (){var format_in__106__auto__ = "~w ~w ";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3258_3276,ns_3277,kw_3278,lis_3279,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3280__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3280 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3281__i = 0, G__3281__a = new Array(arguments.length -  0);
while (G__3281__i < G__3281__a.length) {G__3281__a[G__3281__i] = arguments[G__3281__i + 0]; ++G__3281__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3281__a,0,null);
} 
return G__3280__delegate.call(this,args__108__auto__);};
G__3280.cljs$lang$maxFixedArity = 0;
G__3280.cljs$lang$applyTo = (function (arglist__3282){
var args__108__auto__ = cljs.core.seq(arglist__3282);
return G__3280__delegate(args__108__auto__);
});
G__3280.cljs$core$IFn$_invoke$arity$variadic = G__3280__delegate;
return G__3280;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3258_3276,ns_3277,kw_3278,lis_3279,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null,ns_3277,kw_3278);

if(cljs.core.sequential_QMARK_(lis_3279)){
(function (){var format_in__106__auto__ = ((cljs.core.vector_QMARK_(lis_3279))?"~<[~;~@{~w~^ ~:_~}~;]~:>":"~<(~;~@{~w~^ ~:_~}~;)~:>");
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3258_3276,ns_3277,kw_3278,lis_3279,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3283__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3283 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3284__i = 0, G__3284__a = new Array(arguments.length -  0);
while (G__3284__i < G__3284__a.length) {G__3284__a[G__3284__i] = arguments[G__3284__i + 0]; ++G__3284__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3284__a,0,null);
} 
return G__3283__delegate.call(this,args__108__auto__);};
G__3283.cljs$lang$maxFixedArity = 0;
G__3283.cljs$lang$applyTo = (function (arglist__3285){
var args__108__auto__ = cljs.core.seq(arglist__3285);
return G__3283__delegate(args__108__auto__);
});
G__3283.cljs$core$IFn$_invoke$arity$variadic = G__3283__delegate;
return G__3283;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3258_3276,ns_3277,kw_3278,lis_3279,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null,lis_3279);
} else {
cljs.pprint.write_out(lis_3279);
}
} else {
cljs.core.apply.cljs$core$IFn$_invoke$arity$2((function (){var format_in__106__auto__ = "~w ~:i~@{~w~^ ~:_~}";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3286__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3286 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3287__i = 0, G__3287__a = new Array(arguments.length -  0);
while (G__3287__i < G__3287__a.length) {G__3287__a[G__3287__i] = arguments[G__3287__i + 0]; ++G__3287__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3287__a,0,null);
} 
return G__3286__delegate.call(this,args__108__auto__);};
G__3286.cljs$lang$maxFixedArity = 0;
G__3286.cljs$lang$applyTo = (function (arglist__3288){
var args__108__auto__ = cljs.core.seq(arglist__3288);
return G__3286__delegate(args__108__auto__);
});
G__3286.cljs$core$IFn$_invoke$arity$variadic = G__3286__delegate;
return G__3286;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3256_3274,_STAR_current_length_STAR_3257_3275,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})(),arg_3270);
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3257_3275;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3256_3274;
}}


if(cljs.core.next(args_3266__$1)){
(function (){var format_in__106__auto__ = "~_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3289__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3289 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3290__i = 0, G__3290__a = new Array(arguments.length -  0);
while (G__3290__i < G__3290__a.length) {G__3290__a[G__3290__i] = arguments[G__3290__i + 0]; ++G__3290__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3290__a,0,null);
} 
return G__3289__delegate.call(this,args__108__auto__);};
G__3289.cljs$lang$maxFixedArity = 0;
G__3289.cljs$lang$applyTo = (function (arglist__3291){
var args__108__auto__ = cljs.core.seq(arglist__3291);
return G__3289__delegate(args__108__auto__);
});
G__3289.cljs$core$IFn$_invoke$arity$variadic = G__3289__delegate;
return G__3289;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,vec__3253_3271,start_3272__$1,end_3273__$1,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null);
} else {
}
} else {
cljs.pprint.write_out(arg_3270);

if(cljs.core.next(args_3266__$1)){
(function (){var format_in__106__auto__ = "~:_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (args_3266__$1,format_in__106__auto__,cf__107__auto__,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args){
return (function() { 
var G__3292__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3292 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3293__i = 0, G__3293__a = new Array(arguments.length -  0);
while (G__3293__i < G__3293__a.length) {G__3293__a[G__3293__i] = arguments[G__3293__i + 0]; ++G__3293__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3293__a,0,null);
} 
return G__3292__delegate.call(this,args__108__auto__);};
G__3292.cljs$lang$maxFixedArity = 0;
G__3292.cljs$lang$applyTo = (function (arglist__3294){
var args__108__auto__ = cljs.core.seq(arglist__3294);
return G__3292__delegate(args__108__auto__);
});
G__3292.cljs$core$IFn$_invoke$arity$variadic = G__3292__delegate;
return G__3292;
})()
;
;})(args_3266__$1,format_in__106__auto__,cf__107__auto__,arg_3270,_STAR_current_level_STAR_3251_3261,_STAR_current_length_STAR_3252_3262,vec__3245,start,end,vec__3248,seq__3249,first__3250,seq__3249__$1,keyw,args))
})().call(null);
} else {
}
}

var G__3295 = cljs.core.next(args_3266__$1);
args_3266__$1 = G__3295;
continue;
} else {
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3252_3262;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3251_3261;
}}

return null;
} else {
return cljs.pprint.write_out(reference);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_ns_reference;},new cljs.core.Symbol("cljs.pprint","pprint-ns-reference","cljs.pprint/pprint-ns-reference",(392475554),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-ns-reference","pprint-ns-reference",(799256041),null),"cljs/pprint.cljs",(27),(1),(2936),(2936),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"reference","reference",(-71163496),null)], null)),"Pretty print a single reference (import, use, etc.) from a namespace decl",(cljs.core.truth_(cljs.pprint.pprint_ns_reference)?cljs.pprint.pprint_ns_reference.cljs$lang$test:null)])));})()
;
/**
 * The pretty print dispatch chunk for the ns macro
 */
(function (){
cljs.pprint.pprint_ns = (function cljs$pprint$pprint_ns(alis){
if(cljs.core.next(alis)){
var vec__3307 = alis;
var seq__3308 = cljs.core.seq(vec__3307);
var first__3309 = cljs.core.first(seq__3308);
var seq__3308__$1 = cljs.core.next(seq__3308);
var ns_sym = first__3309;
var first__3309__$1 = cljs.core.first(seq__3308__$1);
var seq__3308__$2 = cljs.core.next(seq__3308__$1);
var ns_name = first__3309__$1;
var stuff = seq__3308__$2;
var vec__3310 = ((typeof cljs.core.first(stuff) === 'string')?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(stuff),cljs.core.next(stuff)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,stuff], null));
var doc_str = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3310,(0),null);
var stuff__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3310,(1),null);
var vec__3313 = ((cljs.core.map_QMARK_(cljs.core.first(stuff__$1)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(stuff__$1),cljs.core.next(stuff__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,stuff__$1], null));
var attr_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3313,(0),null);
var references = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3313,(1),null);
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3316_3318 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3317_3319 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

(function (){var format_in__106__auto__ = "~w ~1I~@_~w";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references){
return (function() { 
var G__3320__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3320 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3321__i = 0, G__3321__a = new Array(arguments.length -  0);
while (G__3321__i < G__3321__a.length) {G__3321__a[G__3321__i] = arguments[G__3321__i + 0]; ++G__3321__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3321__a,0,null);
} 
return G__3320__delegate.call(this,args__108__auto__);};
G__3320.cljs$lang$maxFixedArity = 0;
G__3320.cljs$lang$applyTo = (function (arglist__3322){
var args__108__auto__ = cljs.core.seq(arglist__3322);
return G__3320__delegate(args__108__auto__);
});
G__3320.cljs$core$IFn$_invoke$arity$variadic = G__3320__delegate;
return G__3320;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references))
})().call(null,ns_sym,ns_name);

if(cljs.core.truth_((function (){var or__22603__auto__ = doc_str;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
var or__22603__auto____$1 = attr_map;
if(cljs.core.truth_(or__22603__auto____$1)){
return or__22603__auto____$1;
} else {
return cljs.core.seq(references);
}
}
})())){
(function (){var format_in__106__auto__ = "~@:_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references){
return (function() { 
var G__3323__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3323 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3324__i = 0, G__3324__a = new Array(arguments.length -  0);
while (G__3324__i < G__3324__a.length) {G__3324__a[G__3324__i] = arguments[G__3324__i + 0]; ++G__3324__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3324__a,0,null);
} 
return G__3323__delegate.call(this,args__108__auto__);};
G__3323.cljs$lang$maxFixedArity = 0;
G__3323.cljs$lang$applyTo = (function (arglist__3325){
var args__108__auto__ = cljs.core.seq(arglist__3325);
return G__3323__delegate(args__108__auto__);
});
G__3323.cljs$core$IFn$_invoke$arity$variadic = G__3323__delegate;
return G__3323;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references))
})().call(null);
} else {
}

if(cljs.core.truth_(doc_str)){
cljs.pprint.cl_format.cljs$core$IFn$_invoke$arity$variadic(true,"\"~a\"~:[~;~:@_~]",cljs.core.array_seq([doc_str,(function (){var or__22603__auto__ = attr_map;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return cljs.core.seq(references);
}
})()], 0));
} else {
}

if(cljs.core.truth_(attr_map)){
(function (){var format_in__106__auto__ = "~w~:[~;~:@_~]";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references){
return (function() { 
var G__3326__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3326 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3327__i = 0, G__3327__a = new Array(arguments.length -  0);
while (G__3327__i < G__3327__a.length) {G__3327__a[G__3327__i] = arguments[G__3327__i + 0]; ++G__3327__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3327__a,0,null);
} 
return G__3326__delegate.call(this,args__108__auto__);};
G__3326.cljs$lang$maxFixedArity = 0;
G__3326.cljs$lang$applyTo = (function (arglist__3328){
var args__108__auto__ = cljs.core.seq(arglist__3328);
return G__3326__delegate(args__108__auto__);
});
G__3326.cljs$core$IFn$_invoke$arity$variadic = G__3326__delegate;
return G__3326;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3316_3318,_STAR_current_length_STAR_3317_3319,vec__3307,seq__3308,first__3309,seq__3308__$1,ns_sym,first__3309__$1,seq__3308__$2,ns_name,stuff,vec__3310,doc_str,stuff__$1,vec__3313,attr_map,references))
})().call(null,attr_map,cljs.core.seq(references));
} else {
}

var references_3329__$1 = references;
while(true){
cljs.pprint.pprint_ns_reference(cljs.core.first(references_3329__$1));

var temp__21890__auto___3330 = cljs.core.next(references_3329__$1);
if(temp__21890__auto___3330){
var references_3331__$2 = temp__21890__auto___3330;
cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3332 = references_3331__$2;
references_3329__$1 = G__3332;
continue;
} else {
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3317_3319;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3316_3318;
}}

return null;
} else {
return cljs.pprint.write_out(alis);
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_ns;},new cljs.core.Symbol("cljs.pprint","pprint-ns","cljs.pprint/pprint-ns",(1240607735),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-ns","pprint-ns",(-1229258360),null),"cljs/pprint.cljs",(17),(1),(2970),(2970),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),"The pretty print dispatch chunk for the ns macro",(cljs.core.truth_(cljs.pprint.pprint_ns)?cljs.pprint.pprint_ns.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_hold_first = (function (){var format_in__106__auto__ = "~:<~w~^ ~@_~w~^ ~_~@{~w~^ ~_~}~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3333__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3333 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3334__i = 0, G__3334__a = new Array(arguments.length -  0);
while (G__3334__i < G__3334__a.length) {G__3334__a[G__3334__i] = arguments[G__3334__i + 0]; ++G__3334__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3334__a,0,null);
} 
return G__3333__delegate.call(this,args__108__auto__);};
G__3333.cljs$lang$maxFixedArity = 0;
G__3333.cljs$lang$applyTo = (function (arglist__3335){
var args__108__auto__ = cljs.core.seq(arglist__3335);
return G__3333__delegate(args__108__auto__);
});
G__3333.cljs$core$IFn$_invoke$arity$variadic = G__3333__delegate;
return G__3333;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})(); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_hold_first;},new cljs.core.Symbol("cljs.pprint","pprint-hold-first","cljs.pprint/pprint-hold-first",(1525159626),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-hold-first","pprint-hold-first",(1561394957),null),"cljs/pprint.cljs",(40),(1),(3001),(3001),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_hold_first)?cljs.pprint.pprint_hold_first.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.single_defn = (function cljs$pprint$single_defn(alis,has_doc_str_QMARK_){
if(cljs.core.seq(alis)){
if(cljs.core.truth_(has_doc_str_QMARK_)){
(function (){var format_in__106__auto__ = " ~_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3336__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3336 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3337__i = 0, G__3337__a = new Array(arguments.length -  0);
while (G__3337__i < G__3337__a.length) {G__3337__a[G__3337__i] = arguments[G__3337__i + 0]; ++G__3337__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3337__a,0,null);
} 
return G__3336__delegate.call(this,args__108__auto__);};
G__3336.cljs$lang$maxFixedArity = 0;
G__3336.cljs$lang$applyTo = (function (arglist__3338){
var args__108__auto__ = cljs.core.seq(arglist__3338);
return G__3336__delegate(args__108__auto__);
});
G__3336.cljs$core$IFn$_invoke$arity$variadic = G__3336__delegate;
return G__3336;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})().call(null);
} else {
(function (){var format_in__106__auto__ = " ~@_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3339__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3339 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3340__i = 0, G__3340__a = new Array(arguments.length -  0);
while (G__3340__i < G__3340__a.length) {G__3340__a[G__3340__i] = arguments[G__3340__i + 0]; ++G__3340__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3340__a,0,null);
} 
return G__3339__delegate.call(this,args__108__auto__);};
G__3339.cljs$lang$maxFixedArity = 0;
G__3339.cljs$lang$applyTo = (function (arglist__3341){
var args__108__auto__ = cljs.core.seq(arglist__3341);
return G__3339__delegate(args__108__auto__);
});
G__3339.cljs$core$IFn$_invoke$arity$variadic = G__3339__delegate;
return G__3339;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})().call(null);
}

return (function (){var format_in__106__auto__ = "~{~w~^ ~_~}";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3342__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3342 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3343__i = 0, G__3343__a = new Array(arguments.length -  0);
while (G__3343__i < G__3343__a.length) {G__3343__a[G__3343__i] = arguments[G__3343__i + 0]; ++G__3343__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3343__a,0,null);
} 
return G__3342__delegate.call(this,args__108__auto__);};
G__3342.cljs$lang$maxFixedArity = 0;
G__3342.cljs$lang$applyTo = (function (arglist__3344){
var args__108__auto__ = cljs.core.seq(arglist__3344);
return G__3342__delegate(args__108__auto__);
});
G__3342.cljs$core$IFn$_invoke$arity$variadic = G__3342__delegate;
return G__3342;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})().call(null,alis);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.single_defn;},new cljs.core.Symbol("cljs.pprint","single-defn","cljs.pprint/single-defn",(2009536012),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"single-defn","single-defn",(2021669943),null),"cljs/pprint.cljs",(19),(1),(3008),(3008),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null),new cljs.core.Symbol(null,"has-doc-str?","has-doc-str?",(504334169),null)], null)),null,(cljs.core.truth_(cljs.pprint.single_defn)?cljs.pprint.single_defn.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.multi_defn = (function cljs$pprint$multi_defn(alis,has_doc_str_QMARK_){
if(cljs.core.seq(alis)){
return (function (){var format_in__106__auto__ = " ~_~{~w~^ ~_~}";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3345__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3345 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3346__i = 0, G__3346__a = new Array(arguments.length -  0);
while (G__3346__i < G__3346__a.length) {G__3346__a[G__3346__i] = arguments[G__3346__i + 0]; ++G__3346__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3346__a,0,null);
} 
return G__3345__delegate.call(this,args__108__auto__);};
G__3345.cljs$lang$maxFixedArity = 0;
G__3345.cljs$lang$applyTo = (function (arglist__3347){
var args__108__auto__ = cljs.core.seq(arglist__3347);
return G__3345__delegate(args__108__auto__);
});
G__3345.cljs$core$IFn$_invoke$arity$variadic = G__3345__delegate;
return G__3345;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})().call(null,alis);
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.multi_defn;},new cljs.core.Symbol("cljs.pprint","multi-defn","cljs.pprint/multi-defn",(52879713),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"multi-defn","multi-defn",(200275882),null),"cljs/pprint.cljs",(18),(1),(3017),(3017),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null),new cljs.core.Symbol(null,"has-doc-str?","has-doc-str?",(504334169),null)], null)),null,(cljs.core.truth_(cljs.pprint.multi_defn)?cljs.pprint.multi_defn.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_defn = (function cljs$pprint$pprint_defn(alis){
if(cljs.core.next(alis)){
var vec__3359 = alis;
var seq__3360 = cljs.core.seq(vec__3359);
var first__3361 = cljs.core.first(seq__3360);
var seq__3360__$1 = cljs.core.next(seq__3360);
var defn_sym = first__3361;
var first__3361__$1 = cljs.core.first(seq__3360__$1);
var seq__3360__$2 = cljs.core.next(seq__3360__$1);
var defn_name = first__3361__$1;
var stuff = seq__3360__$2;
var vec__3362 = ((typeof cljs.core.first(stuff) === 'string')?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(stuff),cljs.core.next(stuff)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,stuff], null));
var doc_str = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3362,(0),null);
var stuff__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3362,(1),null);
var vec__3365 = ((cljs.core.map_QMARK_(cljs.core.first(stuff__$1)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(stuff__$1),cljs.core.next(stuff__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,stuff__$1], null));
var attr_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3365,(0),null);
var stuff__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3365,(1),null);
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3368_3370 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3369_3371 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

(function (){var format_in__106__auto__ = "~w ~1I~@_~w";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2){
return (function() { 
var G__3372__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3372 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3373__i = 0, G__3373__a = new Array(arguments.length -  0);
while (G__3373__i < G__3373__a.length) {G__3373__a[G__3373__i] = arguments[G__3373__i + 0]; ++G__3373__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3373__a,0,null);
} 
return G__3372__delegate.call(this,args__108__auto__);};
G__3372.cljs$lang$maxFixedArity = 0;
G__3372.cljs$lang$applyTo = (function (arglist__3374){
var args__108__auto__ = cljs.core.seq(arglist__3374);
return G__3372__delegate(args__108__auto__);
});
G__3372.cljs$core$IFn$_invoke$arity$variadic = G__3372__delegate;
return G__3372;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2))
})().call(null,defn_sym,defn_name);

if(cljs.core.truth_(doc_str)){
(function (){var format_in__106__auto__ = " ~_~w";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2){
return (function() { 
var G__3375__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3375 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3376__i = 0, G__3376__a = new Array(arguments.length -  0);
while (G__3376__i < G__3376__a.length) {G__3376__a[G__3376__i] = arguments[G__3376__i + 0]; ++G__3376__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3376__a,0,null);
} 
return G__3375__delegate.call(this,args__108__auto__);};
G__3375.cljs$lang$maxFixedArity = 0;
G__3375.cljs$lang$applyTo = (function (arglist__3377){
var args__108__auto__ = cljs.core.seq(arglist__3377);
return G__3375__delegate(args__108__auto__);
});
G__3375.cljs$core$IFn$_invoke$arity$variadic = G__3375__delegate;
return G__3375;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2))
})().call(null,doc_str);
} else {
}

if(cljs.core.truth_(attr_map)){
(function (){var format_in__106__auto__ = " ~_~w";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2){
return (function() { 
var G__3378__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3378 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3379__i = 0, G__3379__a = new Array(arguments.length -  0);
while (G__3379__i < G__3379__a.length) {G__3379__a[G__3379__i] = arguments[G__3379__i + 0]; ++G__3379__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3379__a,0,null);
} 
return G__3378__delegate.call(this,args__108__auto__);};
G__3378.cljs$lang$maxFixedArity = 0;
G__3378.cljs$lang$applyTo = (function (arglist__3380){
var args__108__auto__ = cljs.core.seq(arglist__3380);
return G__3378__delegate(args__108__auto__);
});
G__3378.cljs$core$IFn$_invoke$arity$variadic = G__3378__delegate;
return G__3378;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3368_3370,_STAR_current_length_STAR_3369_3371,vec__3359,seq__3360,first__3361,seq__3360__$1,defn_sym,first__3361__$1,seq__3360__$2,defn_name,stuff,vec__3362,doc_str,stuff__$1,vec__3365,attr_map,stuff__$2))
})().call(null,attr_map);
} else {
}

if(cljs.core.vector_QMARK_(cljs.core.first(stuff__$2))){
cljs.pprint.single_defn(stuff__$2,(function (){var or__22603__auto__ = doc_str;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return attr_map;
}
})());
} else {
cljs.pprint.multi_defn(stuff__$2,(function (){var or__22603__auto__ = doc_str;
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return attr_map;
}
})());

}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3369_3371;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3368_3370;
}}

return null;
} else {
return (cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1(alis) : cljs.pprint.pprint_simple_code_list.call(null,alis));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_defn;},new cljs.core.Symbol("cljs.pprint","pprint-defn","cljs.pprint/pprint-defn",(-2056151752),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-defn","pprint-defn",(-1909000449),null),"cljs/pprint.cljs",(19),(1),(3023),(3023),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_defn)?cljs.pprint.pprint_defn.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_binding_form = (function cljs$pprint$pprint_binding_form(binding_vec){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3386_3391 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3387_3392 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"[",null,"]");

var length_count3388_3393 = (0);
var binding_3394 = binding_vec;
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3388_3393 < cljs.core._STAR_print_length_STAR_))){
if(cljs.core.seq(binding_3394)){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3389_3395 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3390_3396 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,null,null,null);


cljs.pprint.write_out(cljs.core.first(binding_3394));

if(cljs.core.next(binding_3394)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"miser","miser",(-556060186)));

cljs.pprint.write_out(cljs.core.second(binding_3394));
} else {
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3390_3396;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3389_3395;
}}


if(cljs.core.next(cljs.core.rest(binding_3394))){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3397 = (length_count3388_3393 + (1));
var G__3398 = cljs.core.next(cljs.core.rest(binding_3394));
length_count3388_3393 = G__3397;
binding_3394 = G__3398;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3387_3392;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3386_3391;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_binding_form;},new cljs.core.Symbol("cljs.pprint","pprint-binding-form","cljs.pprint/pprint-binding-form",(-1869245854),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-binding-form","pprint-binding-form",(-1411584981),null),"cljs/pprint.cljs",(27),(1),(3048),(3048),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"binding-vec","binding-vec",(643890319),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_binding_form)?cljs.pprint.pprint_binding_form.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_let = (function cljs$pprint$pprint_let(alis){
var base_sym = cljs.core.first(alis);
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3401_3403 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3402_3404 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

if((cljs.core.next(alis)) && (cljs.core.vector_QMARK_(cljs.core.second(alis)))){
(function (){var format_in__106__auto__ = "~w ~1I~@_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3401_3403,_STAR_current_length_STAR_3402_3404,base_sym){
return (function() { 
var G__3405__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3405 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3406__i = 0, G__3406__a = new Array(arguments.length -  0);
while (G__3406__i < G__3406__a.length) {G__3406__a[G__3406__i] = arguments[G__3406__i + 0]; ++G__3406__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3406__a,0,null);
} 
return G__3405__delegate.call(this,args__108__auto__);};
G__3405.cljs$lang$maxFixedArity = 0;
G__3405.cljs$lang$applyTo = (function (arglist__3407){
var args__108__auto__ = cljs.core.seq(arglist__3407);
return G__3405__delegate(args__108__auto__);
});
G__3405.cljs$core$IFn$_invoke$arity$variadic = G__3405__delegate;
return G__3405;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3401_3403,_STAR_current_length_STAR_3402_3404,base_sym))
})().call(null,base_sym);

cljs.pprint.pprint_binding_form(cljs.core.second(alis));

(function (){var format_in__106__auto__ = " ~_~{~w~^ ~_~}";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3401_3403,_STAR_current_length_STAR_3402_3404,base_sym){
return (function() { 
var G__3408__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3408 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3409__i = 0, G__3409__a = new Array(arguments.length -  0);
while (G__3409__i < G__3409__a.length) {G__3409__a[G__3409__i] = arguments[G__3409__i + 0]; ++G__3409__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3409__a,0,null);
} 
return G__3408__delegate.call(this,args__108__auto__);};
G__3408.cljs$lang$maxFixedArity = 0;
G__3408.cljs$lang$applyTo = (function (arglist__3410){
var args__108__auto__ = cljs.core.seq(arglist__3410);
return G__3408__delegate(args__108__auto__);
});
G__3408.cljs$core$IFn$_invoke$arity$variadic = G__3408__delegate;
return G__3408;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3401_3403,_STAR_current_length_STAR_3402_3404,base_sym))
})().call(null,cljs.core.next(cljs.core.rest(alis)));
} else {
(cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1(alis) : cljs.pprint.pprint_simple_code_list.call(null,alis));
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3402_3404;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3401_3403;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_let;},new cljs.core.Symbol("cljs.pprint","pprint-let","cljs.pprint/pprint-let",(1171110570),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-let","pprint-let",(1525973219),null),"cljs/pprint.cljs",(18),(1),(3063),(3063),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_let)?cljs.pprint.pprint_let.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_if = (function (){var format_in__106__auto__ = "~:<~1I~w~^ ~@_~w~@{ ~_~w~}~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__){
return (function() { 
var G__3411__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3411 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3412__i = 0, G__3412__a = new Array(arguments.length -  0);
while (G__3412__i < G__3412__a.length) {G__3412__a[G__3412__i] = arguments[G__3412__i + 0]; ++G__3412__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3412__a,0,null);
} 
return G__3411__delegate.call(this,args__108__auto__);};
G__3411.cljs$lang$maxFixedArity = 0;
G__3411.cljs$lang$applyTo = (function (arglist__3413){
var args__108__auto__ = cljs.core.seq(arglist__3413);
return G__3411__delegate(args__108__auto__);
});
G__3411.cljs$core$IFn$_invoke$arity$variadic = G__3411__delegate;
return G__3411;
})()
;
;})(format_in__106__auto__,cf__107__auto__))
})(); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_if;},new cljs.core.Symbol("cljs.pprint","pprint-if","cljs.pprint/pprint-if",(1962279381),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-if","pprint-if",(1933571870),null),"cljs/pprint.cljs",(32),(1),(3077),(3077),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint.pprint_if)?cljs.pprint.pprint_if.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_cond = (function cljs$pprint$pprint_cond(alis){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3419_3424 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3420_3425 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

cljs.pprint.pprint_indent(new cljs.core.Keyword(null,"block","block",(664686210)),(1));

cljs.pprint.write_out(cljs.core.first(alis));

if(cljs.core.next(alis)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var length_count3421_3426 = (0);
var alis_3427__$1 = cljs.core.next(alis);
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3421_3426 < cljs.core._STAR_print_length_STAR_))){
if(alis_3427__$1){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3422_3428 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3423_3429 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,null,null,null);


cljs.pprint.write_out(cljs.core.first(alis_3427__$1));

if(cljs.core.next(alis_3427__$1)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"miser","miser",(-556060186)));

cljs.pprint.write_out(cljs.core.second(alis_3427__$1));
} else {
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3423_3429;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3422_3428;
}}


if(cljs.core.next(cljs.core.rest(alis_3427__$1))){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3430 = (length_count3421_3426 + (1));
var G__3431 = cljs.core.next(cljs.core.rest(alis_3427__$1));
length_count3421_3426 = G__3430;
alis_3427__$1 = G__3431;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}
} else {
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3420_3425;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3419_3424;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_cond;},new cljs.core.Symbol("cljs.pprint","pprint-cond","cljs.pprint/pprint-cond",(-1444429244),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-cond","pprint-cond",(-1859594867),null),"cljs/pprint.cljs",(19),(1),(3079),(3079),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_cond)?cljs.pprint.pprint_cond.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_condp = (function cljs$pprint$pprint_condp(alis){
if((cljs.core.count(alis) > (3))){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3437_3442 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3438_3443 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

cljs.pprint.pprint_indent(new cljs.core.Keyword(null,"block","block",(664686210)),(1));

cljs.core.apply.cljs$core$IFn$_invoke$arity$2((function (){var format_in__106__auto__ = "~w ~@_~w ~@_~w ~_";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3437_3442,_STAR_current_length_STAR_3438_3443){
return (function() { 
var G__3444__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3444 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3445__i = 0, G__3445__a = new Array(arguments.length -  0);
while (G__3445__i < G__3445__a.length) {G__3445__a[G__3445__i] = arguments[G__3445__i + 0]; ++G__3445__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3445__a,0,null);
} 
return G__3444__delegate.call(this,args__108__auto__);};
G__3444.cljs$lang$maxFixedArity = 0;
G__3444.cljs$lang$applyTo = (function (arglist__3446){
var args__108__auto__ = cljs.core.seq(arglist__3446);
return G__3444__delegate(args__108__auto__);
});
G__3444.cljs$core$IFn$_invoke$arity$variadic = G__3444__delegate;
return G__3444;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_current_level_STAR_3437_3442,_STAR_current_length_STAR_3438_3443))
})(),alis);

var length_count3439_3447 = (0);
var alis_3448__$1 = cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2((3),alis));
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3439_3447 < cljs.core._STAR_print_length_STAR_))){
if(alis_3448__$1){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3440_3449 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3441_3450 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,null,null,null);


cljs.pprint.write_out(cljs.core.first(alis_3448__$1));

if(cljs.core.next(alis_3448__$1)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"miser","miser",(-556060186)));

cljs.pprint.write_out(cljs.core.second(alis_3448__$1));
} else {
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3441_3450;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3440_3449;
}}


if(cljs.core.next(cljs.core.rest(alis_3448__$1))){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3451 = (length_count3439_3447 + (1));
var G__3452 = cljs.core.next(cljs.core.rest(alis_3448__$1));
length_count3439_3447 = G__3451;
alis_3448__$1 = G__3452;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3438_3443;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3437_3442;
}}

return null;
} else {
return (cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1(alis) : cljs.pprint.pprint_simple_code_list.call(null,alis));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_condp;},new cljs.core.Symbol("cljs.pprint","pprint-condp","cljs.pprint/pprint-condp",(799524382),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-condp","pprint-condp",(930000087),null),"cljs/pprint.cljs",(20),(1),(3099),(3099),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_condp)?cljs.pprint.pprint_condp.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint._STAR_symbol_map_STAR_ = cljs.core.PersistentArrayMap.EMPTY; return (
new cljs.core.Var(function(){return cljs.pprint._STAR_symbol_map_STAR_;},new cljs.core.Symbol("cljs.pprint","*symbol-map*","cljs.pprint/*symbol-map*",(-159172766),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*symbol-map*","*symbol-map*",(265821609),null),"cljs/pprint.cljs",(45),(1),true,(3119),(3119),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_symbol_map_STAR_)?cljs.pprint._STAR_symbol_map_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_anon_func = (function cljs$pprint$pprint_anon_func(alis){
var args = cljs.core.second(alis);
var nlis = cljs.core.first(cljs.core.rest(cljs.core.rest(alis)));
if(cljs.core.vector_QMARK_(args)){
var _STAR_symbol_map_STAR_3454 = cljs.pprint._STAR_symbol_map_STAR_;
cljs.pprint._STAR_symbol_map_STAR_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args)))?cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.first(args),"%"]):cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (_STAR_symbol_map_STAR_3454,args,nlis){
return (function (p1__167_SHARP_,p2__168_SHARP_){
return (new cljs.core.PersistentVector(null,(2),(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__167_SHARP_,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("%"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(p2__168_SHARP_)].join('')],null));
});})(_STAR_symbol_map_STAR_3454,args,nlis))
,args,cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(cljs.core.count(args) + (1))))));

try{return (function (){var format_in__106__auto__ = "~<#(~;~@{~w~^ ~_~}~;)~:>";
var cf__107__auto__ = ((typeof format_in__106__auto__ === 'string')?(cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.cached_compile.cljs$core$IFn$_invoke$arity$1(format_in__106__auto__) : cljs.pprint.cached_compile.call(null,format_in__106__auto__)):format_in__106__auto__);
return ((function (format_in__106__auto__,cf__107__auto__,_STAR_symbol_map_STAR_3454,args,nlis){
return (function() { 
var G__3455__delegate = function (args__108__auto__){
var navigator__109__auto__ = cljs.pprint.init_navigator(args__108__auto__);
return cljs.pprint.execute_format.cljs$core$IFn$_invoke$arity$2(cf__107__auto__,navigator__109__auto__);
};
var G__3455 = function (var_args){
var args__108__auto__ = null;
if (arguments.length > 0) {
var G__3456__i = 0, G__3456__a = new Array(arguments.length -  0);
while (G__3456__i < G__3456__a.length) {G__3456__a[G__3456__i] = arguments[G__3456__i + 0]; ++G__3456__i;}
  args__108__auto__ = new cljs.core.IndexedSeq(G__3456__a,0,null);
} 
return G__3455__delegate.call(this,args__108__auto__);};
G__3455.cljs$lang$maxFixedArity = 0;
G__3455.cljs$lang$applyTo = (function (arglist__3457){
var args__108__auto__ = cljs.core.seq(arglist__3457);
return G__3455__delegate(args__108__auto__);
});
G__3455.cljs$core$IFn$_invoke$arity$variadic = G__3455__delegate;
return G__3455;
})()
;
;})(format_in__106__auto__,cf__107__auto__,_STAR_symbol_map_STAR_3454,args,nlis))
})().call(null,nlis);
}finally {cljs.pprint._STAR_symbol_map_STAR_ = _STAR_symbol_map_STAR_3454;
}} else {
return (cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pprint_simple_code_list.cljs$core$IFn$_invoke$arity$1(alis) : cljs.pprint.pprint_simple_code_list.call(null,alis));
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_anon_func;},new cljs.core.Symbol("cljs.pprint","pprint-anon-func","cljs.pprint/pprint-anon-func",(314755654),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-anon-func","pprint-anon-func",(428450191),null),"cljs/pprint.cljs",(24),(1),(3121),(3121),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_anon_func)?cljs.pprint.pprint_anon_func.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_simple_code_list = (function cljs$pprint$pprint_simple_code_list(alis){
if(cljs.core.truth_(cljs.pprint.level_exceeded())){
cljs.core._write(cljs.core._STAR_out_STAR_,"#");
} else {
var _STAR_current_level_STAR_3461_3464 = cljs.pprint._STAR_current_level_STAR_;
var _STAR_current_length_STAR_3462_3465 = cljs.pprint._STAR_current_length_STAR_;
cljs.pprint._STAR_current_level_STAR_ = (cljs.pprint._STAR_current_level_STAR_ + (1));

cljs.pprint._STAR_current_length_STAR_ = (0);

try{cljs.pprint.start_block(cljs.core._STAR_out_STAR_,"(",null,")");

cljs.pprint.pprint_indent(new cljs.core.Keyword(null,"block","block",(664686210)),(1));

var length_count3463_3466 = (0);
var alis_3467__$1 = cljs.core.seq(alis);
while(true){
if((cljs.core.not(cljs.core._STAR_print_length_STAR_)) || ((length_count3463_3466 < cljs.core._STAR_print_length_STAR_))){
if(alis_3467__$1){
cljs.pprint.write_out(cljs.core.first(alis_3467__$1));

if(cljs.core.next(alis_3467__$1)){
cljs.core._write(cljs.core._STAR_out_STAR_," ");

cljs.pprint.pprint_newline(new cljs.core.Keyword(null,"linear","linear",(872268697)));

var G__3468 = (length_count3463_3466 + (1));
var G__3469 = cljs.core.next(alis_3467__$1);
length_count3463_3466 = G__3468;
alis_3467__$1 = G__3469;
continue;
} else {
}
} else {
}
} else {
cljs.core._write(cljs.core._STAR_out_STAR_,"...");
}
break;
}

cljs.pprint.end_block(cljs.core._STAR_out_STAR_);
}finally {cljs.pprint._STAR_current_length_STAR_ = _STAR_current_length_STAR_3462_3465;

cljs.pprint._STAR_current_level_STAR_ = _STAR_current_level_STAR_3461_3464;
}}

return null;
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_simple_code_list;},new cljs.core.Symbol("cljs.pprint","pprint-simple-code-list","cljs.pprint/pprint-simple-code-list",(1843600142),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-simple-code-list","pprint-simple-code-list",(1681454389),null),"cljs/pprint.cljs",(31),(1),(3143),(3143),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_simple_code_list)?cljs.pprint.pprint_simple_code_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.two_forms = (function cljs$pprint$two_forms(amap){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.identity,cljs.core.array_seq([(function (){var iter__25932__auto__ = (function cljs$pprint$two_forms_$_iter__3476(s__3477){
return (new cljs.core.LazySeq(null,(function (){
var s__3477__$1 = s__3477;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__3477__$1);
if(temp__21890__auto__){
var s__3477__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__3477__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__3477__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__3479 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__3478 = (0);
while(true){
if((i__3478 < size__25931__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__3478);
cljs.core.chunk_append(b__3479,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.first(x))),cljs.core.second(x)], null)], null));

var G__3482 = (i__3478 + (1));
i__3478 = G__3482;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__3479),cljs$pprint$two_forms_$_iter__3476(cljs.core.chunk_rest(s__3477__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__3479),null);
}
} else {
var x = cljs.core.first(s__3477__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.first(x))),cljs.core.second(x)], null)], null),cljs$pprint$two_forms_$_iter__3476(cljs.core.rest(s__3477__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__25932__auto__(amap);
})()], 0)));
}); return (
new cljs.core.Var(function(){return cljs.pprint.two_forms;},new cljs.core.Symbol("cljs.pprint","two-forms","cljs.pprint/two-forms",(-2045849317),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"two-forms","two-forms",(-1983566894),null),"cljs/pprint.cljs",(17),(1),(3156),(3156),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"amap","amap",(635923055),null)], null)),null,(cljs.core.truth_(cljs.pprint.two_forms)?cljs.pprint.two_forms.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.add_core_ns = (function cljs$pprint$add_core_ns(amap){
var core = "clojure.core";
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (core){
return (function (p1__169_SHARP_){
var vec__3486 = p1__169_SHARP_;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3486,(0),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3486,(1),null);
if(cljs.core.not((function (){var or__22603__auto__ = cljs.core.namespace(s);
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
return cljs.core.special_symbol_QMARK_(s);
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(core,cljs.core.name(s)),f], null);
} else {
return p1__169_SHARP_;
}
});})(core))
,amap));
}); return (
new cljs.core.Var(function(){return cljs.pprint.add_core_ns;},new cljs.core.Symbol("cljs.pprint","add-core-ns","cljs.pprint/add-core-ns",(1723461288),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"add-core-ns","add-core-ns",(1585316083),null),"cljs/pprint.cljs",(19),(1),(3163),(3163),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"amap","amap",(635923055),null)], null)),null,(cljs.core.truth_(cljs.pprint.add_core_ns)?cljs.pprint.add_core_ns.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint._STAR_code_table_STAR_ = cljs.pprint.two_forms(cljs.pprint.add_core_ns(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,".",".",(1975675962),null),new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null),new cljs.core.Symbol(null,"when-first","when-first",(821699168),null),new cljs.core.Symbol(null,"if","if",(1181717262),null),new cljs.core.Symbol(null,"condp","condp",(1054325175),null),new cljs.core.Symbol(null,"..","..",(-300507420),null),new cljs.core.Symbol(null,"defmacro","defmacro",(2054157304),null),new cljs.core.Symbol(null,"defn","defn",(-126010802),null),new cljs.core.Symbol(null,"loop","loop",(1244978678),null),new cljs.core.Symbol(null,"struct","struct",(325972931),null),new cljs.core.Symbol(null,"doseq","doseq",(221164135),null),new cljs.core.Symbol(null,"if-not","if-not",(-265415609),null),new cljs.core.Symbol(null,"when-not","when-not",(-1223136340),null),new cljs.core.Symbol(null,"def","def",(597100991),null),new cljs.core.Symbol(null,"when","when",(1064114221),null),new cljs.core.Symbol(null,"with-open","with-open",(172119667),null),new cljs.core.Symbol(null,"with-local-vars","with-local-vars",(837642072),null),new cljs.core.Symbol(null,"defonce","defonce",(-1681484013),null),new cljs.core.Symbol(null,"when-let","when-let",(-1383043480),null),new cljs.core.Symbol(null,"ns","ns",(2082130287),null),new cljs.core.Symbol(null,"dotimes","dotimes",(-818708397),null),new cljs.core.Symbol(null,"cond","cond",(1606708055),null),new cljs.core.Symbol(null,"let","let",(358118826),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"defn-","defn-",(1097765044),null),new cljs.core.Symbol(null,"locking","locking",(1542862874),null),new cljs.core.Symbol(null,"->","->",(-2139605430),null),new cljs.core.Symbol(null,"if-let","if-let",(1803593690),null),new cljs.core.Symbol(null,"binding","binding",(-2114503176),null),new cljs.core.Symbol(null,"struct-map","struct-map",(-1387540878),null)],[cljs.pprint.pprint_hold_first,cljs.pprint.pprint_anon_func,cljs.pprint.pprint_let,cljs.pprint.pprint_if,cljs.pprint.pprint_condp,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_defn,cljs.pprint.pprint_defn,cljs.pprint.pprint_let,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_let,cljs.pprint.pprint_if,cljs.pprint.pprint_if,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_if,cljs.pprint.pprint_let,cljs.pprint.pprint_let,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_let,cljs.pprint.pprint_ns,cljs.pprint.pprint_let,cljs.pprint.pprint_cond,cljs.pprint.pprint_let,cljs.pprint.pprint_defn,cljs.pprint.pprint_defn,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_hold_first,cljs.pprint.pprint_let,cljs.pprint.pprint_let,cljs.pprint.pprint_hold_first]))); return (
new cljs.core.Var(function(){return cljs.pprint._STAR_code_table_STAR_;},new cljs.core.Symbol("cljs.pprint","*code-table*","cljs.pprint/*code-table*",(-630997919),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"dynamic","dynamic",(704819571)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"*code-table*","*code-table*",(-987198806),null),"cljs/pprint.cljs",(45),(1),true,(3172),(3172),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.pprint._STAR_code_table_STAR_)?cljs.pprint._STAR_code_table_STAR_.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_code_list = (function cljs$pprint$pprint_code_list(alis){
if(cljs.core.not(cljs.pprint.pprint_reader_macro(alis))){
var temp__21598__auto__ = (function (){var G__3490 = cljs.core.first(alis);
return (cljs.pprint._STAR_code_table_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint._STAR_code_table_STAR_.cljs$core$IFn$_invoke$arity$1(G__3490) : cljs.pprint._STAR_code_table_STAR_.call(null,G__3490));
})();
if(cljs.core.truth_(temp__21598__auto__)){
var special_form = temp__21598__auto__;
return (special_form.cljs$core$IFn$_invoke$arity$1 ? special_form.cljs$core$IFn$_invoke$arity$1(alis) : special_form.call(null,alis));
} else {
return cljs.pprint.pprint_simple_code_list(alis);
}
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_code_list;},new cljs.core.Symbol("cljs.pprint","pprint-code-list","cljs.pprint/pprint-code-list",(227125420),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-code-list","pprint-code-list",(71484149),null),"cljs/pprint.cljs",(24),(1),(3189),(3189),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alis","alis",(1326818164),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_code_list)?cljs.pprint.pprint_code_list.cljs$lang$test:null)])));})()
;
(function (){
cljs.pprint.pprint_code_symbol = (function cljs$pprint$pprint_code_symbol(sym){
var temp__21598__auto__ = (sym.cljs$core$IFn$_invoke$arity$1 ? sym.cljs$core$IFn$_invoke$arity$1(cljs.pprint._STAR_symbol_map_STAR_) : sym.call(null,cljs.pprint._STAR_symbol_map_STAR_));
if(cljs.core.truth_(temp__21598__auto__)){
var arg_num = temp__21598__auto__;
return cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arg_num], 0));
} else {
if(cljs.core.truth_(cljs.pprint._STAR_print_suppress_namespaces_STAR_)){
return cljs.pprint.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.name(sym)], 0));
} else {
return (cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1 ? cljs.pprint.pr.cljs$core$IFn$_invoke$arity$1(sym) : cljs.pprint.pr.call(null,sym));
}
}
}); return (
new cljs.core.Var(function(){return cljs.pprint.pprint_code_symbol;},new cljs.core.Symbol("cljs.pprint","pprint-code-symbol","cljs.pprint/pprint-code-symbol",(-313011552),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"pprint-code-symbol","pprint-code-symbol",(-443533077),null),"cljs/pprint.cljs",(26),(1),(3195),(3195),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null)),null,(cljs.core.truth_(cljs.pprint.pprint_code_symbol)?cljs.pprint.pprint_code_symbol.cljs$lang$test:null)])));})()
;
if(typeof cljs.pprint.code_dispatch !== 'undefined'){
} else {
/**
 * The pretty print dispatch function for pretty printing Clojure code.
 */
(function (){
cljs.pprint.code_dispatch = (function (){var method_table__26238__auto__ = (function (){var G__3491 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3491) : cljs.core.atom.call(null,G__3491));
})();
var prefer_table__26239__auto__ = (function (){var G__3492 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3492) : cljs.core.atom.call(null,G__3492));
})();
var method_cache__26240__auto__ = (function (){var G__3493 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3493) : cljs.core.atom.call(null,G__3493));
})();
var cached_hierarchy__26241__auto__ = (function (){var G__3494 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__3494) : cljs.core.atom.call(null,G__3494));
})();
var hierarchy__26242__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",(-1053470341)),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.pprint","code-dispatch"),cljs.pprint.type_dispatcher,new cljs.core.Keyword(null,"default","default",(-1987822328)),hierarchy__26242__auto__,method_table__26238__auto__,prefer_table__26239__auto__,method_cache__26240__auto__,cached_hierarchy__26241__auto__));
})(); return (
new cljs.core.Var(function(){return cljs.pprint.code_dispatch;},new cljs.core.Symbol("cljs.pprint","code-dispatch","cljs.pprint/code-dispatch",(-423875137),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.2",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"code-dispatch","code-dispatch",(-511363514),null),"cljs/pprint.cljs",(16),(1),(3202),(3203),cljs.core.List.EMPTY,"The pretty print dispatch function for pretty printing Clojure code.",(cljs.core.truth_(cljs.pprint.code_dispatch)?cljs.pprint.code_dispatch.cljs$lang$test:null)])));})()
;
}
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"list","list",(765357683)),cljs.pprint.pprint_code_list);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"symbol","symbol",(-1038572696)),cljs.pprint.pprint_code_symbol);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"vector","vector",(1902966158)),cljs.pprint.pprint_vector);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"map","map",(1371690461)),cljs.pprint.pprint_map);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"set","set",(304602554)),cljs.pprint.pprint_set);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"queue","queue",(1455835879)),cljs.pprint.pprint_pqueue);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"deref","deref",(-145586795)),cljs.pprint.pprint_ideref);
cljs.pprint.use_method(cljs.pprint.code_dispatch,null,cljs.pprint.pr);
cljs.pprint.use_method(cljs.pprint.code_dispatch,new cljs.core.Keyword(null,"default","default",(-1987822328)),cljs.pprint.pprint_simple_default);
cljs.pprint.set_pprint_dispatch(cljs.pprint.simple_dispatch);
(function (){
cljs.pprint.add_padding = (function cljs$pprint$add_padding(width,s){
var padding = (function (){var x__23388__auto__ = (0);
var y__23389__auto__ = (width - cljs.core.count(s));
return ((x__23388__auto__ > y__23389__auto__) ? x__23388__auto__ : y__23389__auto__);
})();
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.str,clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(padding," ")),s);
}); return (
new cljs.core.Var(function(){return cljs.pprint.add_padding;},new cljs.core.Symbol("cljs.pprint","add-padding","cljs.pprint/add-padding",(769121533),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"add-padding","add-padding",(706658948),null),"cljs/pprint.cljs",(19),(1),(3297),(3297),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"width","width",(1256460050),null),new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),null,(cljs.core.truth_(cljs.pprint.add_padding)?cljs.pprint.add_padding.cljs$lang$test:null)])));})()
;
/**
 * Prints a collection of maps in a textual table. Prints table headings
 * ks, and then a line of output for each row, corresponding to the keys
 * in ks. If ks are not specified, use the keys of the first item in rows.
 */
(function (){
cljs.pprint.print_table = (function cljs$pprint$print_table(var_args){
var args3495 = [];
var len__26427__auto___3521 = arguments.length;
var i__26428__auto___3522 = (0);
while(true){
if((i__26428__auto___3522 < len__26427__auto___3521)){
args3495.push((arguments[i__26428__auto___3522]));

var G__3523 = (i__26428__auto___3522 + (1));
i__26428__auto___3522 = G__3523;
continue;
} else {
}
break;
}

var G__3497 = args3495.length;
switch (G__3497) {
case (2):
return cljs.pprint.print_table.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (1):
return cljs.pprint.print_table.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args3495.length)].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.pprint.print_table;},new cljs.core.Symbol("cljs.pprint","print-table","cljs.pprint/print-table",(-1696208156),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.3",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"print-table","print-table",(-2093158225),null),"cljs/pprint.cljs",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(3301),(3301),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),"Prints a collection of maps in a textual table. Prints table headings\n   ks, and then a line of output for each row, corresponding to the keys\n   in ks. If ks are not specified, use the keys of the first item in rows.",(cljs.core.truth_(cljs.pprint.print_table)?cljs.pprint.print_table.cljs$lang$test:null)])));})()
;

cljs.pprint.print_table.cljs$core$IFn$_invoke$arity$2 = (function (ks,rows){
var _STAR_print_newline_STAR_3498 = cljs.core._STAR_print_newline_STAR_;
try{if(cljs.core.seq(rows)){
var widths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_print_newline_STAR_3498){
return (function (k){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,cljs.core.count([cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('')),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_print_newline_STAR_3498){
return (function (p1__170_SHARP_){
return cljs.core.count([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__170_SHARP_,k))].join(''));
});})(_STAR_print_newline_STAR_3498))
,rows));
});})(_STAR_print_newline_STAR_3498))
,ks);
var spacers = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (widths,_STAR_print_newline_STAR_3498){
return (function (p1__171_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(p1__171_SHARP_,"-"));
});})(widths,_STAR_print_newline_STAR_3498))
,widths);
var fmt_row = ((function (widths,spacers,_STAR_print_newline_STAR_3498){
return (function (leader,divider,trailer,row){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(leader),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(divider,(function (){var iter__25932__auto__ = ((function (widths,spacers,_STAR_print_newline_STAR_3498){
return (function cljs$pprint$iter__3499(s__3500){
return (new cljs.core.LazySeq(null,((function (widths,spacers,_STAR_print_newline_STAR_3498){
return (function (){
var s__3500__$1 = s__3500;
while(true){
var temp__21890__auto__ = cljs.core.seq(s__3500__$1);
if(temp__21890__auto__){
var s__3500__$2 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(s__3500__$2)){
var c__25930__auto__ = cljs.core.chunk_first(s__3500__$2);
var size__25931__auto__ = cljs.core.count(c__25930__auto__);
var b__3502 = cljs.core.chunk_buffer(size__25931__auto__);
if((function (){var i__3501 = (0);
while(true){
if((i__3501 < size__25931__auto__)){
var vec__3511 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__25930__auto__,i__3501);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3511,(0),null);
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3511,(1),null);
cljs.core.chunk_append(b__3502,cljs.pprint.add_padding(width,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(col)].join('')));

var G__3525 = (i__3501 + (1));
i__3501 = G__3525;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__3502),cljs$pprint$iter__3499(cljs.core.chunk_rest(s__3500__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__3502),null);
}
} else {
var vec__3514 = cljs.core.first(s__3500__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3514,(0),null);
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3514,(1),null);
return cljs.core.cons(cljs.pprint.add_padding(width,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(col)].join('')),cljs$pprint$iter__3499(cljs.core.rest(s__3500__$2)));
}
} else {
return null;
}
break;
}
});})(widths,spacers,_STAR_print_newline_STAR_3498))
,null,null));
});})(widths,spacers,_STAR_print_newline_STAR_3498))
;
return iter__25932__auto__(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (iter__25932__auto__,widths,spacers,_STAR_print_newline_STAR_3498){
return (function (p1__172_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(row,p1__172_SHARP_);
});})(iter__25932__auto__,widths,spacers,_STAR_print_newline_STAR_3498))
,ks),widths));
})()))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(trailer)].join('');
});})(widths,spacers,_STAR_print_newline_STAR_3498))
;
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([fmt_row("| "," | "," |",cljs.core.zipmap(ks,ks))], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([fmt_row("|-","-+-","-|",cljs.core.zipmap(ks,spacers))], 0));

var seq__3517 = cljs.core.seq(rows);
var chunk__3518 = null;
var count__3519 = (0);
var i__3520 = (0);
while(true){
if((i__3520 < count__3519)){
var row = chunk__3518.cljs$core$IIndexed$_nth$arity$2(null,i__3520);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([fmt_row("| "," | "," |",row)], 0));

var G__3526 = seq__3517;
var G__3527 = chunk__3518;
var G__3528 = count__3519;
var G__3529 = (i__3520 + (1));
seq__3517 = G__3526;
chunk__3518 = G__3527;
count__3519 = G__3528;
i__3520 = G__3529;
continue;
} else {
var temp__21890__auto__ = cljs.core.seq(seq__3517);
if(temp__21890__auto__){
var seq__3517__$1 = temp__21890__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__3517__$1)){
var c__26099__auto__ = cljs.core.chunk_first(seq__3517__$1);
var G__3530 = cljs.core.chunk_rest(seq__3517__$1);
var G__3531 = c__26099__auto__;
var G__3532 = cljs.core.count(c__26099__auto__);
var G__3533 = (0);
seq__3517 = G__3530;
chunk__3518 = G__3531;
count__3519 = G__3532;
i__3520 = G__3533;
continue;
} else {
var row = cljs.core.first(seq__3517__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([fmt_row("| "," | "," |",row)], 0));

var G__3534 = cljs.core.next(seq__3517__$1);
var G__3535 = null;
var G__3536 = (0);
var G__3537 = (0);
seq__3517 = G__3534;
chunk__3518 = G__3535;
count__3519 = G__3536;
i__3520 = G__3537;
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
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_3498;
}});

cljs.pprint.print_table.cljs$core$IFn$_invoke$arity$1 = (function (rows){
return cljs.pprint.print_table.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(cljs.core.first(rows)),rows);
});

cljs.pprint.print_table.cljs$lang$maxFixedArity = (2);

new cljs.core.Var(function(){return cljs.pprint.print_table;},new cljs.core.Symbol("cljs.pprint","print-table","cljs.pprint/print-table",(-1696208156),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"added","added",(2057651688)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],["1.3",new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",(-966900911),null),new cljs.core.Symbol(null,"print-table","print-table",(-2093158225),null),"cljs/pprint.cljs",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(3301),(3301),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ks","ks",(-754231827),null),new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rows","rows",(-1804386089),null)], null)),"Prints a collection of maps in a textual table. Prints table headings\n   ks, and then a line of output for each row, corresponding to the keys\n   in ks. If ks are not specified, use the keys of the first item in rows.",(cljs.core.truth_(cljs.pprint.print_table)?cljs.pprint.print_table.cljs$lang$test:null)]));
