// Compiled by ClojureScript 1.10.597
goog.provide("klipse_clj.repl");
if(typeof window !== "undefined") {window.cljs.user = {}};
if((typeof klipse_clj !== 'undefined') && (typeof klipse_clj.repl !== 'undefined') && (typeof klipse_clj.repl.current_ns_eval !== 'undefined')){
} else {
klipse_clj.repl.current_ns_eval = cljs.core.atom.call(null,new cljs.core.Symbol(null,"cljs.user","cljs.user",(877795071),null));
}
if((typeof klipse_clj !== 'undefined') && (typeof klipse_clj.repl !== 'undefined') && (typeof klipse_clj.repl.current_ns_compile !== 'undefined')){
} else {
klipse_clj.repl.current_ns_compile = cljs.core.atom.call(null,new cljs.core.Symbol(null,"cljs.user","cljs.user",(877795071),null));
}
klipse_clj.repl.reset_ns_eval_BANG_ = (function klipse_clj$repl$reset_ns_eval_BANG_(){
return cljs.core.reset_BANG_.call(null,klipse_clj.repl.current_ns_eval,new cljs.core.Symbol(null,"cljs.user","cljs.user",(877795071),null));
});
klipse_clj.repl.reset_ns_compile_BANG_ = (function klipse_clj$repl$reset_ns_compile_BANG_(){
return cljs.core.reset_BANG_.call(null,klipse_clj.repl.current_ns_compile,new cljs.core.Symbol(null,"cljs.user","cljs.user",(877795071),null));
});
if((typeof klipse_clj !== 'undefined') && (typeof klipse_clj.repl !== 'undefined') && (typeof klipse_clj.repl.st !== 'undefined')){
} else {
klipse_clj.repl.st = cljs.core.atom.call(null,null);
}
klipse_clj.repl.reset_state_eval_BANG_ = (function klipse_clj$repl$reset_state_eval_BANG_(){
return cljs.core.reset_BANG_.call(null,klipse_clj.repl.st,null);
});
klipse_clj.repl.st_compile = cljs.core.atom.call(null,null);
klipse_clj.repl.create_state_compile = (function klipse_clj$repl$create_state_compile(){
if((cljs.core.deref.call(null,klipse_clj.repl.st_compile) == null)){
cljs.core.reset_BANG_.call(null,klipse_clj.repl.st_compile,cljs.js.empty_state.call(null));
} else {
}

return cljs.core.deref.call(null,klipse_clj.repl.st_compile);
});
klipse_clj.repl.reset_state_compile_BANG_ = (function klipse_clj$repl$reset_state_compile_BANG_(){
return cljs.core.reset_BANG_.call(null,klipse_clj.repl.st_compile,null);
});
klipse_clj.repl.add_macros_suffix = (function klipse_clj$repl$add_macros_suffix(sym){
return cljs.core.symbol.call(null,[cljs.core.name.call(null,sym),"$macros"].join(''));
});
klipse_clj.repl.eval_form = (function klipse_clj$repl$eval_form(var_args){
var G__24 = arguments.length;
switch (G__24) {
case (1):
return klipse_clj.repl.eval_form.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return klipse_clj.repl.eval_form.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(klipse_clj.repl.eval_form.cljs$core$IFn$_invoke$arity$1 = (function (form){
return klipse_clj.repl.eval_form.call(null,cljs.core._STAR_ns_STAR_.name);
}));

(klipse_clj.repl.eval_form.cljs$core$IFn$_invoke$arity$2 = (function (form,ns){
var result = cljs.core.atom.call(null,null);
cljs.js.eval.call(null,cljs.core.deref.call(null,klipse_clj.repl.st),form,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ns","ns",(441598760)),ns,new cljs.core.Keyword(null,"context","context",(-830191113)),new cljs.core.Keyword(null,"expr","expr",(745722291)),new cljs.core.Keyword(null,"eval","eval",(-1103567905)),cljs.js.js_eval,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",(-1551927320)),true], null),(function (p__25){
var map__26 = p__25;
var map__26__$1 = (((((!((map__26 == null))))?(((((map__26.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26):map__26);
var value = cljs.core.get.call(null,map__26__$1,new cljs.core.Keyword(null,"value","value",(305978217)));
var error = cljs.core.get.call(null,map__26__$1,new cljs.core.Keyword(null,"error","error",(-978969032)));
if(cljs.core.truth_(error)){
return error;
} else {
return cljs.core.reset_BANG_.call(null,result,value);
}
}));

return cljs.core.deref.call(null,result);
}));

(klipse_clj.repl.eval_form.cljs$lang$maxFixedArity = (2));

klipse_clj.repl.def_a_var = (function klipse_clj$repl$def_a_var(var_args){
var G__30 = arguments.length;
switch (G__30) {
case (2):
return klipse_clj.repl.def_a_var.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return klipse_clj.repl.def_a_var.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(klipse_clj.repl.def_a_var.cljs$core$IFn$_invoke$arity$2 = (function (ns,name){
var temp__9646__auto__ = cljs.core.find_ns.call(null,(function (){var G__31 = ns;
if((ns instanceof cljs.core.Namespace)){
return cljs.core.ns_name.call(null,G__31);
} else {
return G__31;
}
})());
if(cljs.core.truth_(temp__9646__auto__)){
var the_ns = temp__9646__auto__;
return klipse_clj.repl.eval_form.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"def","def",(597100991),null),null,(1),null)),(new cljs.core.List(null,name,null,(1),null)))),cljs.core.ns_name.call(null,the_ns));
} else {
return null;
}
}));

(klipse_clj.repl.def_a_var.cljs$core$IFn$_invoke$arity$3 = (function (ns,name,val){
var temp__9646__auto__ = cljs.core.find_ns.call(null,(function (){var G__32 = ns;
if((ns instanceof cljs.core.Namespace)){
return cljs.core.ns_name.call(null,G__32);
} else {
return G__32;
}
})());
if(cljs.core.truth_(temp__9646__auto__)){
var the_ns = temp__9646__auto__;
return klipse_clj.repl.eval_form.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"def","def",(597100991),null),null,(1),null)),(new cljs.core.List(null,name,null,(1),null)),(new cljs.core.List(null,val,null,(1),null)))),cljs.core.ns_name.call(null,the_ns));
} else {
return null;
}
}));

(klipse_clj.repl.def_a_var.cljs$lang$maxFixedArity = (3));

/**
 * Given an analysis environment resolve a var. Analogous to
 * clojure.core/resolve
 */
klipse_clj.repl.resolve_var = (function klipse_clj$repl$resolve_var(env,sym){
if(cljs.core.map_QMARK_.call(null,env)){
} else {
throw (new Error("Assert failed: (map? env)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

try{return cljs.analyzer.resolve_var.call(null,env,sym,cljs.analyzer.confirm_var_exists_throw.call(null));
}catch (e34){var _ = e34;
return cljs.analyzer.resolve_macro_var.call(null,env,sym);
}});
klipse_clj.repl.print_value = (function klipse_clj$repl$print_value(value,opts){
return cljs.core.prn.call(null,value);
});
klipse_clj.repl.str_butlast = (function klipse_clj$repl$str_butlast(s){
return cljs.core.subs.call(null,s,(0),(cljs.core.count.call(null,s) - (1)));
});
klipse_clj.repl.format_spec = (function klipse_clj$repl$format_spec(spec,left_margin,ns){
var raw_print = (function (){var sb__12314__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__35_39 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__36_40 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__37_41 = true;
var _STAR_print_fn_STAR__temp_val__38_42 = (function (x__12315__auto__){
return sb__12314__auto__.append(x__12315__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__37_41);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__38_42);

try{klipse_clj.repl.print_value.call(null,cljs.spec.alpha.describe.call(null,spec),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("klipse-clj.repl","keyword-ns","klipse-clj.repl/keyword-ns",(614877250)),ns,new cljs.core.Keyword("klipse-clj.repl","spec?","klipse-clj.repl/spec?",(288111418)),true,new cljs.core.Keyword("klipse-clj.repl","as-code?","klipse-clj.repl/as-code?",(578894325)),true,new cljs.core.Keyword("klipse-clj.repl","term-width-adj","klipse-clj.repl/term-width-adj",(-1860761290)),(- left_margin)], null));
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__36_40);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__35_39);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__12314__auto__);
})();
return clojure.string.replace.call(null,klipse_clj.repl.str_butlast.call(null,raw_print),/\n/,cljs.core.apply.call(null,cljs.core.str,"\n",cljs.core.repeat.call(null,left_margin," ")));
});
klipse_clj.repl.drop_macros_suffix = (function klipse_clj$repl$drop_macros_suffix(ns_name){
if(clojure.string.ends_with_QMARK_.call(null,ns_name,"$macros")){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.drop_last.call(null,(7),ns_name));
} else {
return ns_name;
}
});
/**
 * Undoes the effect that wrapping a reader conditional around a defn has on a
 *   docstring.
 */
klipse_clj.repl.undo_reader_conditional_whitespace_docstring = (function klipse_clj$repl$undo_reader_conditional_whitespace_docstring(s){
if((s == null)){
return null;
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/[^\n]*\n\n?      ?\S.*/,s))){
return clojure.string.replace.call(null,s,/\n      ?/,"\n  ");
} else {
return s;
}
}
});
klipse_clj.repl.print_doc = (function klipse_clj$repl$print_doc(p__43){
var map__44 = p__43;
var map__44__$1 = (((((!((map__44 == null))))?(((((map__44.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__44.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44):map__44);
var m = map__44__$1;
var n = cljs.core.get.call(null,map__44__$1,new cljs.core.Keyword(null,"ns","ns",(441598760)));
var nm = cljs.core.get.call(null,map__44__$1,new cljs.core.Keyword(null,"name","name",(1843675177)));
cljs.core.println.call(null,"-------------------------");

var temp__9584__auto___78 = new cljs.core.Keyword(null,"spec","spec",(347520401)).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__9584__auto___78)){
var spec_79 = temp__9584__auto___78;
klipse_clj.repl.print_value.call(null,spec_79,cljs.core.PersistentArrayMap.EMPTY);
} else {
cljs.core.println.call(null,[(function (){var temp__9646__auto__ = new cljs.core.Keyword(null,"ns","ns",(441598760)).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__9646__auto__)){
var ns = temp__9646__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",(652470118)).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",(2045992350)).cljs$core$IFn$_invoke$arity$1(m))){
var seq__46_80 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",(2045992350)).cljs$core$IFn$_invoke$arity$1(m));
var chunk__47_81 = null;
var count__48_82 = (0);
var i__49_83 = (0);
while(true){
if((i__49_83 < count__48_82)){
var f_84 = cljs.core._nth.call(null,chunk__47_81,i__49_83);
cljs.core.println.call(null,"  ",f_84);


var G__85 = seq__46_80;
var G__86 = chunk__47_81;
var G__87 = count__48_82;
var G__88 = (i__49_83 + (1));
seq__46_80 = G__85;
chunk__47_81 = G__86;
count__48_82 = G__87;
i__49_83 = G__88;
continue;
} else {
var temp__9646__auto___89 = cljs.core.seq.call(null,seq__46_80);
if(temp__9646__auto___89){
var seq__46_90__$1 = temp__9646__auto___89;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__46_90__$1)){
var c__11729__auto___91 = cljs.core.chunk_first.call(null,seq__46_90__$1);
var G__92 = cljs.core.chunk_rest.call(null,seq__46_90__$1);
var G__93 = c__11729__auto___91;
var G__94 = cljs.core.count.call(null,c__11729__auto___91);
var G__95 = (0);
seq__46_80 = G__92;
chunk__47_81 = G__93;
count__48_82 = G__94;
i__49_83 = G__95;
continue;
} else {
var f_96 = cljs.core.first.call(null,seq__46_90__$1);
cljs.core.println.call(null,"  ",f_96);


var G__97 = cljs.core.next.call(null,seq__46_90__$1);
var G__98 = null;
var G__99 = (0);
var G__100 = (0);
seq__46_80 = G__97;
chunk__47_81 = G__98;
count__48_82 = G__99;
i__49_83 = G__100;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",(1661989754)).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_101 = new cljs.core.Keyword(null,"arglists","arglists",(1661989754)).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__10112__auto__ = new cljs.core.Keyword(null,"macro","macro",(-867863404)).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",(1262603725)).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_101);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",(1377916282),null),cljs.core.first.call(null,arglists_101)))?cljs.core.second.call(null,arglists_101):arglists_101));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",(-1326536374)).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",(1913296891)).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",(276297046)))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",(276297046)).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",(276297046)).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",(-867863404)).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",(347520401)).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",(1262603725)).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",(1913296891)).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",(652470118)).cljs$core$IFn$_invoke$arity$1(m))){
var seq__50_102 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",(453930866)).cljs$core$IFn$_invoke$arity$1(m));
var chunk__51_103 = null;
var count__52_104 = (0);
var i__53_105 = (0);
while(true){
if((i__53_105 < count__52_104)){
var vec__64_106 = cljs.core._nth.call(null,chunk__51_103,i__53_105);
var name_107 = cljs.core.nth.call(null,vec__64_106,(0),null);
var map__67_108 = cljs.core.nth.call(null,vec__64_106,(1),null);
var map__67_109__$1 = (((((!((map__67_108 == null))))?(((((map__67_108.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__67_108.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__67_108):map__67_108);
var doc_110 = cljs.core.get.call(null,map__67_109__$1,new cljs.core.Keyword(null,"doc","doc",(1913296891)));
var arglists_111 = cljs.core.get.call(null,map__67_109__$1,new cljs.core.Keyword(null,"arglists","arglists",(1661989754)));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_107);

cljs.core.println.call(null," ",arglists_111);

if(cljs.core.truth_(doc_110)){
cljs.core.println.call(null," ",doc_110);
} else {
}


var G__112 = seq__50_102;
var G__113 = chunk__51_103;
var G__114 = count__52_104;
var G__115 = (i__53_105 + (1));
seq__50_102 = G__112;
chunk__51_103 = G__113;
count__52_104 = G__114;
i__53_105 = G__115;
continue;
} else {
var temp__9646__auto___116 = cljs.core.seq.call(null,seq__50_102);
if(temp__9646__auto___116){
var seq__50_117__$1 = temp__9646__auto___116;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__50_117__$1)){
var c__11729__auto___118 = cljs.core.chunk_first.call(null,seq__50_117__$1);
var G__119 = cljs.core.chunk_rest.call(null,seq__50_117__$1);
var G__120 = c__11729__auto___118;
var G__121 = cljs.core.count.call(null,c__11729__auto___118);
var G__122 = (0);
seq__50_102 = G__119;
chunk__51_103 = G__120;
count__52_104 = G__121;
i__53_105 = G__122;
continue;
} else {
var vec__69_123 = cljs.core.first.call(null,seq__50_117__$1);
var name_124 = cljs.core.nth.call(null,vec__69_123,(0),null);
var map__72_125 = cljs.core.nth.call(null,vec__69_123,(1),null);
var map__72_126__$1 = (((((!((map__72_125 == null))))?(((((map__72_125.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__72_125.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__72_125):map__72_125);
var doc_127 = cljs.core.get.call(null,map__72_126__$1,new cljs.core.Keyword(null,"doc","doc",(1913296891)));
var arglists_128 = cljs.core.get.call(null,map__72_126__$1,new cljs.core.Keyword(null,"arglists","arglists",(1661989754)));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_124);

cljs.core.println.call(null," ",arglists_128);

if(cljs.core.truth_(doc_127)){
cljs.core.println.call(null," ",doc_127);
} else {
}


var G__129 = cljs.core.next.call(null,seq__50_117__$1);
var G__130 = null;
var G__131 = (0);
var G__132 = (0);
seq__50_102 = G__129;
chunk__51_103 = G__130;
count__52_104 = G__131;
i__53_105 = G__132;
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
var spec_lookup = (function (ns_suffix){
return cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_suffix)].join(''),cljs.core.name.call(null,nm)));
});
var temp__9646__auto__ = (function (){var or__10112__auto__ = spec_lookup.call(null,"");
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return spec_lookup.call(null,"$macros");
}
})();
if(cljs.core.truth_(temp__9646__auto__)){
var fnspec = temp__9646__auto__;
cljs.core.print.call(null,"Spec");

var seq__74_133 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",(1315556576)),new cljs.core.Keyword(null,"ret","ret",(-468222814)),new cljs.core.Keyword(null,"fn","fn",(-1175266204))], null));
var chunk__75_134 = null;
var count__76_135 = (0);
var i__77_136 = (0);
while(true){
if((i__77_136 < count__76_135)){
var role_137 = cljs.core._nth.call(null,chunk__75_134,i__77_136);
var temp__9646__auto___138__$1 = cljs.core.get.call(null,fnspec,role_137);
if(cljs.core.truth_(temp__9646__auto___138__$1)){
var spec_139 = temp__9646__auto___138__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role_137),":"].join(''),klipse_clj.repl.format_spec.call(null,spec_139,((3) + ((cljs.core.name.call(null,role_137)).length)),n));
} else {
}


var G__140 = seq__74_133;
var G__141 = chunk__75_134;
var G__142 = count__76_135;
var G__143 = (i__77_136 + (1));
seq__74_133 = G__140;
chunk__75_134 = G__141;
count__76_135 = G__142;
i__77_136 = G__143;
continue;
} else {
var temp__9646__auto___144__$1 = cljs.core.seq.call(null,seq__74_133);
if(temp__9646__auto___144__$1){
var seq__74_145__$1 = temp__9646__auto___144__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__74_145__$1)){
var c__11729__auto___146 = cljs.core.chunk_first.call(null,seq__74_145__$1);
var G__147 = cljs.core.chunk_rest.call(null,seq__74_145__$1);
var G__148 = c__11729__auto___146;
var G__149 = cljs.core.count.call(null,c__11729__auto___146);
var G__150 = (0);
seq__74_133 = G__147;
chunk__75_134 = G__148;
count__76_135 = G__149;
i__77_136 = G__150;
continue;
} else {
var role_151 = cljs.core.first.call(null,seq__74_145__$1);
var temp__9646__auto___152__$2 = cljs.core.get.call(null,fnspec,role_151);
if(cljs.core.truth_(temp__9646__auto___152__$2)){
var spec_153 = temp__9646__auto___152__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role_151),":"].join(''),klipse_clj.repl.format_spec.call(null,spec_153,((3) + ((cljs.core.name.call(null,role_151)).length)),n));
} else {
}


var G__154 = cljs.core.next.call(null,seq__74_145__$1);
var G__155 = null;
var G__156 = (0);
var G__157 = (0);
seq__74_133 = G__154;
chunk__75_134 = G__155;
count__76_135 = G__156;
i__77_136 = G__157;
continue;
}
} else {
}
}
break;
}

return cljs.core.println.call(null);
} else {
return null;
}
} else {
return null;
}
}
});
klipse_clj.repl.special_doc = (function klipse_clj$repl$special_doc(name_symbol){
return cljs.core.assoc.call(null,klipse_clj.repl_resources.special_doc_map.call(null,name_symbol),new cljs.core.Keyword(null,"name","name",(1843675177)),name_symbol,new cljs.core.Keyword(null,"special-form","special-form",(-1326536374)),true);
});
klipse_clj.repl.repl_special_doc = (function klipse_clj$repl$repl_special_doc(name_symbol){
return cljs.core.assoc.call(null,klipse_clj.repl_resources.repl_special_doc_map.call(null,name_symbol),new cljs.core.Keyword(null,"name","name",(1843675177)),name_symbol,new cljs.core.Keyword(null,"repl-special-function","repl-special-function",(1262603725)),true);
});
/**
 * Gets the AST for a given namespace.
 */
klipse_clj.repl.get_namespace = (function klipse_clj$repl$get_namespace(ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,klipse_clj.repl.st)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)),ns], null));
});
klipse_clj.repl.get_macro_var = (function klipse_clj$repl$get_macro_var(env,sym,macros_ns){
if((macros_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? macros-ns)"));
}

var temp__9646__auto__ = (function (){var env__1__auto__ = cljs.core.deref.call(null,klipse_clj.repl.st);
var env__1__auto____$1 = ((cljs.core.map_QMARK_.call(null,env__1__auto__))?cljs.core.atom.call(null,env__1__auto__):(((((env__1__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_.call(null,cljs.core.deref.call(null,env__1__auto__)))))?env__1__auto__:(function(){throw (new Error(["Compiler environment must be a map or atom containing a map, not ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,env__1__auto__))].join('')))})()
));
var _STAR_compiler_STAR__orig_val__158 = cljs.env._STAR_compiler_STAR_;
var _STAR_compiler_STAR__temp_val__159 = env__1__auto____$1;
(cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR__temp_val__159);

try{return klipse_clj.repl.resolve_var.call(null,env,cljs.core.symbol.call(null,macros_ns,cljs.core.name.call(null,sym)));
}finally {(cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR__orig_val__158);
}})();
if(cljs.core.truth_(temp__9646__auto__)){
var macro_var = temp__9646__auto__;
return cljs.core.assoc.call(null,macro_var,new cljs.core.Keyword(null,"ns","ns",(441598760)),macros_ns);
} else {
return null;
}
});
klipse_clj.repl.get_aenv = (function klipse_clj$repl$get_aenv(){
return cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),new cljs.core.Keyword(null,"ns","ns",(441598760)),klipse_clj.repl.get_namespace.call(null,cljs.core.deref.call(null,klipse_clj.repl.current_ns_eval)),new cljs.core.Keyword(null,"context","context",(-830191113)),new cljs.core.Keyword(null,"expr","expr",(745722291)));
});
klipse_clj.repl.get_var = (function klipse_clj$repl$get_var(env,sym){
var _STAR_cljs_warning_handlers_STAR__orig_val__160 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
var _STAR_cljs_warning_handlers_STAR__temp_val__161 = null;
(cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__temp_val__161);

try{var var$ = (function (){var or__10112__auto__ = (function (){var env__1__auto__ = cljs.core.deref.call(null,klipse_clj.repl.st);
var env__1__auto____$1 = ((cljs.core.map_QMARK_.call(null,env__1__auto__))?cljs.core.atom.call(null,env__1__auto__):(((((env__1__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_.call(null,cljs.core.deref.call(null,env__1__auto__)))))?env__1__auto__:(function(){throw (new Error(["Compiler environment must be a map or atom containing a map, not ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,env__1__auto__))].join('')))})()
));
var _STAR_compiler_STAR__orig_val__164 = cljs.env._STAR_compiler_STAR_;
var _STAR_compiler_STAR__temp_val__165 = env__1__auto____$1;
(cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR__temp_val__165);

try{return klipse_clj.repl.resolve_var.call(null,env,sym);
}finally {(cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR__orig_val__164);
}})();
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var temp__9646__auto__ = sym.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,klipse_clj.repl.st)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)),cljs.core.deref.call(null,klipse_clj.repl.current_ns_eval),new cljs.core.Keyword(null,"use-macros","use-macros",(-905638393))], null)));
if(cljs.core.truth_(temp__9646__auto__)){
var macros_ns = temp__9646__auto__;
return klipse_clj.repl.get_macro_var.call(null,env,sym,macros_ns);
} else {
return null;
}
}
})();
if(cljs.core.truth_(var$)){
return cljs.core.update.call(null,(function (){var G__166 = var$;
var G__166__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"ns","ns",(441598760)).cljs$core$IFn$_invoke$arity$1(var$)))?cljs.core.assoc.call(null,G__166,new cljs.core.Keyword(null,"ns","ns",(441598760)),cljs.core.symbol.call(null,cljs.core.namespace.call(null,new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(var$)))):G__166);
if(cljs.core._EQ_.call(null,cljs.core.namespace.call(null,new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(var$)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ns","ns",(441598760)).cljs$core$IFn$_invoke$arity$1(var$)))){
return cljs.core.update.call(null,G__166__$1,new cljs.core.Keyword(null,"name","name",(1843675177)),(function (p1__1_SHARP_){
return cljs.core.symbol.call(null,cljs.core.name.call(null,p1__1_SHARP_));
}));
} else {
return G__166__$1;
}
})(),new cljs.core.Keyword(null,"ns","ns",(441598760)),cljs.core.comp.call(null,cljs.core.symbol,klipse_clj.repl.drop_macros_suffix,cljs.core.str));
} else {
return null;
}
}finally {(cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__orig_val__160);
}});
klipse_clj.repl.doc_STAR_ = (function klipse_clj$repl$doc_STAR_(name){
var temp__9584__auto__ = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"catch","catch",(-1616370245),null),new cljs.core.Symbol(null,"try","try",(-1273693247),null),new cljs.core.Symbol(null,"finally","finally",(-1065347064),null),new cljs.core.Symbol(null,"try","try",(-1273693247),null)], null).call(null,name);
if(cljs.core.truth_(temp__9584__auto__)){
var special_name = temp__9584__auto__;
return klipse_clj.repl.doc_STAR_.call(null,special_name);
} else {
if(cljs.core.truth_(klipse_clj.repl_resources.special_doc_map.call(null,name))){
return klipse_clj.repl.print_doc.call(null,klipse_clj.repl.special_doc.call(null,name));
} else {
if(cljs.core.truth_(klipse_clj.repl_resources.repl_special_doc_map.call(null,name))){
return klipse_clj.repl.print_doc.call(null,klipse_clj.repl.repl_special_doc.call(null,name));
} else {
if(cljs.core.qualified_keyword_QMARK_.call(null,name)){
return klipse_clj.repl.print_doc.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spec","spec",(347520401)),name,new cljs.core.Keyword(null,"doc","doc",(1913296891)),klipse_clj.repl.format_spec.call(null,cljs.spec.alpha.get_spec.call(null,name),(3),cljs.core.symbol.call(null,cljs.core.namespace.call(null,name)))], null));
} else {
if(cljs.core.truth_(klipse_clj.repl.get_namespace.call(null,name))){
return klipse_clj.repl.print_doc.call(null,cljs.core.select_keys.call(null,klipse_clj.repl.get_namespace.call(null,name),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"doc","doc",(1913296891))], null)));
} else {
if(cljs.core.truth_(klipse_clj.repl.get_var.call(null,klipse_clj.repl.get_aenv.call(null),name))){
return klipse_clj.repl.print_doc.call(null,(function (){var var$ = klipse_clj.repl.get_var.call(null,klipse_clj.repl.get_aenv.call(null),name);
var var$__$1 = cljs.core.assoc.call(null,var$,new cljs.core.Keyword(null,"forms","forms",(2045992350)),cljs.core.second.call(null,new cljs.core.Keyword(null,"forms","forms",(2045992350)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",(1499536964)).cljs$core$IFn$_invoke$arity$1(var$))),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.second.call(null,new cljs.core.Keyword(null,"arglists","arglists",(1661989754)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",(1499536964)).cljs$core$IFn$_invoke$arity$1(var$))));
var m = cljs.core.select_keys.call(null,var$__$1,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"forms","forms",(2045992350)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"url","url",(276297046))], null));
var m__$1 = cljs.core.update.call(null,m,new cljs.core.Keyword(null,"doc","doc",(1913296891)),klipse_clj.repl.undo_reader_conditional_whitespace_docstring);
var G__167 = cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",(1843675177))], null),cljs.core.name);
if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol-symbol","protocol-symbol",(1279552198)).cljs$core$IFn$_invoke$arity$1(var$__$1))){
return cljs.core.assoc.call(null,G__167,new cljs.core.Keyword(null,"protocol","protocol",(652470118)),true,new cljs.core.Keyword(null,"methods","methods",(453930866)),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__168){
var vec__169 = p__168;
var fname = cljs.core.nth.call(null,vec__169,(0),null);
var sigs = cljs.core.nth.call(null,vec__169,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fname,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"doc","doc",(1913296891)).cljs$core$IFn$_invoke$arity$1(klipse_clj.repl.get_var.call(null,klipse_clj.repl.get_aenv.call(null),cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ns","ns",(441598760)).cljs$core$IFn$_invoke$arity$1(var$__$1)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fname)))),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.seq.call(null,sigs)], null)], null);
}),cljs.core.get_in.call(null,var$__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"protocol-info","protocol-info",(1471745843)),new cljs.core.Keyword(null,"methods","methods",(453930866))], null)))));
} else {
return G__167;
}
})());
} else {
return null;
}
}
}
}
}
}
});
klipse_clj.repl.completion_candidates_for_ns = (function klipse_clj$repl$completion_candidates_for_ns(ns_sym,allow_private_QMARK_){
if(clojure.string.starts_with_QMARK_.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_sym),"goog")){
if(cljs.core.truth_(cljs.core.find_ns.call(null,ns_sym))){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.js_keys.call(null,goog.getObjectByName(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_sym))));
} else {
return cljs.core.PersistentVector.EMPTY;
}
} else {
return cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,cljs.core.key),cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.comp.call(null,cljs.core.filter.call(null,(cljs.core.truth_(allow_private_QMARK_)?cljs.core.identity:(function (p1__2_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"private","private",(-558947994)).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__2_SHARP_)));
}))),cljs.core.remove.call(null,(function (p1__3_SHARP_){
return new cljs.core.Keyword(null,"anonymous","anonymous",(447897231)).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__3_SHARP_));
}))),cljs.core.apply.call(null,cljs.core.merge,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"defs","defs",(1398449717)),new cljs.core.Keyword(null,"macros","macros",(811339431))).call(null,klipse_clj.repl.get_namespace.call(null,ns_sym)))));
}
});
klipse_clj.repl.completion_candidates_for_current_ns = (function klipse_clj$repl$completion_candidates_for_current_ns(){
var cur_ns = cljs.core.deref.call(null,klipse_clj.repl.current_ns_eval);
return cljs.core.into.call(null,klipse_clj.repl.completion_candidates_for_ns.call(null,cur_ns,true),cljs.core.comp.call(null,cljs.core.mapcat.call(null,cljs.core.keys),cljs.core.map.call(null,cljs.core.str)),cljs.core.juxt.call(null,new cljs.core.Keyword(null,"renames","renames",(343278368)),new cljs.core.Keyword(null,"rename-macros","rename-macros",(1076432512)),new cljs.core.Keyword(null,"uses","uses",(232664692)),new cljs.core.Keyword(null,"use-macros","use-macros",(-905638393))).call(null,klipse_clj.repl.get_namespace.call(null,cur_ns)));
});
klipse_clj.repl.is_completion_QMARK_ = (function klipse_clj$repl$is_completion_QMARK_(match_suffix,candidate){
var escaped_suffix = clojure.string.replace.call(null,match_suffix,/[-\/\\^$*+?.()|\[\]{}]/,"\\$&");
return cljs.core.re_find.call(null,(new RegExp(["^",escaped_suffix].join(''),"i")),candidate);
});
klipse_clj.repl.keyword_completions = new cljs.core.PersistentVector(null, 31, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"require","require",(-468001333)),new cljs.core.Keyword(null,"require-macros","require-macros",(707947416)),new cljs.core.Keyword(null,"import","import",(-1399500709)),new cljs.core.Keyword(null,"refer","refer",(-964295553)),new cljs.core.Keyword(null,"refer-macros","refer-macros",(-1906841953)),new cljs.core.Keyword(null,"include-macros","include-macros",(1228110289)),new cljs.core.Keyword(null,"refer-clojure","refer-clojure",(813784440)),new cljs.core.Keyword(null,"exclude","exclude",(-1230250334)),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.Keyword(null,"strs","strs",(1175537277)),new cljs.core.Keyword(null,"syms","syms",(-1575891762)),new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.Keyword(null,"pre","pre",(2118456869)),new cljs.core.Keyword(null,"post","post",(269697687)),new cljs.core.Keyword(null,"let","let",(-1282412701)),new cljs.core.Keyword(null,"when","when",(-576417306)),new cljs.core.Keyword(null,"while","while",(963117786)),new cljs.core.Keyword(null,"clj","clj",(-660495428)),new cljs.core.Keyword(null,"cljs","cljs",(1492417629)),new cljs.core.Keyword(null,"default","default",(-1987822328)),new cljs.core.Keyword(null,"else","else",(-1508377146)),new cljs.core.Keyword(null,"gen-class","gen-class",(-426712454)),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",(1310784252)),new cljs.core.Keyword(null,"req","req",(-326448303)),new cljs.core.Keyword(null,"req-un","req-un",(1074571008)),new cljs.core.Keyword(null,"opt","opt",(-794706369)),new cljs.core.Keyword(null,"opt-un","opt-un",(883442496)),new cljs.core.Keyword(null,"args","args",(1315556576)),new cljs.core.Keyword(null,"ret","ret",(-468222814)),new cljs.core.Keyword(null,"fn","fn",(-1175266204))], null);
klipse_clj.repl.namespace_completion_exclusions = new cljs.core.PersistentVector(null, 27, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"planck.from.io.aviso.ansi","planck.from.io.aviso.ansi",(2068713725),null),new cljs.core.Symbol(null,"planck.pprint.code","planck.pprint.code",(1586576325),null),new cljs.core.Symbol(null,"planck.pprint.data","planck.pprint.data",(804516122),null),new cljs.core.Symbol(null,"planck.bundle","planck.bundle",(-403959080),null),new cljs.core.Symbol(null,"planck.closure","planck.closure",(261112148),null),new cljs.core.Symbol(null,"planck.js-deps","planck.js-deps",(791456760),null),new cljs.core.Symbol(null,"planck.repl","planck.repl",(366873093),null),new cljs.core.Symbol(null,"planck.repl-resources","planck.repl-resources",(143473453),null),new cljs.core.Symbol(null,"planck.themes","planck.themes",(-2083267640),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector","clojure.core.rrb-vector",(-1155220319),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.interop","clojure.core.rrb-vector.interop",(1752227054),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.nodes","clojure.core.rrb-vector.nodes",(-1723556804),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.protocols","clojure.core.rrb-vector.protocols",(1645101092),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.rrbt","clojure.core.rrb-vector.rrbt",(1108920338),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.transients","clojure.core.rrb-vector.transients",(1281641467),null),new cljs.core.Symbol(null,"clojure.core.rrb-vector.trees","clojure.core.rrb-vector.trees",(1420144023),null),new cljs.core.Symbol(null,"cognitect.transit","cognitect.transit",(-750660177),null),new cljs.core.Symbol(null,"fipp.deque","fipp.deque",(162107275),null),new cljs.core.Symbol(null,"fipp.engine","fipp.engine",(104802855),null),new cljs.core.Symbol(null,"fipp.visit","fipp.visit",(-938866813),null),new cljs.core.Symbol(null,"lazy-map.core","lazy-map.core",(462322712),null),new cljs.core.Symbol(null,"cljs.source-map","cljs.source-map",(2108014936),null),new cljs.core.Symbol(null,"cljs.source-map.base64","cljs.source-map.base64",(-1764326399),null),new cljs.core.Symbol(null,"cljs.source-map.base64-vlq","cljs.source-map.base64-vlq",(-397707708),null),new cljs.core.Symbol(null,"cljs.tools.reader.impl.commons","cljs.tools.reader.impl.commons",(1569241026),null),new cljs.core.Symbol(null,"cljs.tools.reader.impl.utils","cljs.tools.reader.impl.utils",(1797659699),null),new cljs.core.Symbol(null,"cljs.stacktrace","cljs.stacktrace",(880035689),null)], null);
klipse_clj.repl.namespace_completion_additons = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"clojure.core","clojure.core",(-189332625),null),new cljs.core.Symbol(null,"clojure.test","clojure.test",(-699730006),null),new cljs.core.Symbol(null,"clojure.spec.alpha","clojure.spec.alpha",(369813921),null),new cljs.core.Symbol(null,"clojure.spec.test.alpha","clojure.spec.test.alpha",(-562225269),null),new cljs.core.Symbol(null,"clojure.spec.gen.alpha","clojure.spec.gen.alpha",(231332697),null),new cljs.core.Symbol(null,"clojure.pprint","clojure.pprint",(-547379114),null)], null);
/**
 * Returns a sequence of all namespaces.
 */
klipse_clj.repl.all_ns = (function klipse_clj$repl$all_ns(){
return cljs.core.keys.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.core.deref.call(null,klipse_clj.repl.st))));
});
klipse_clj.repl.current_alias_map = (function klipse_clj$repl$current_alias_map(var_args){
var G__173 = arguments.length;
switch (G__173) {
case (0):
return klipse_clj.repl.current_alias_map.cljs$core$IFn$_invoke$arity$0();

break;
case (2):
return klipse_clj.repl.current_alias_map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(klipse_clj.repl.current_alias_map.cljs$core$IFn$_invoke$arity$0 = (function (){
return klipse_clj.repl.current_alias_map.call(null,cljs.core.deref.call(null,klipse_clj.repl.current_ns_eval),cljs.core.deref.call(null,klipse_clj.repl.st));
}));

(klipse_clj.repl.current_alias_map.cljs$core$IFn$_invoke$arity$2 = (function (ns,state){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.call(null,(function (p__174){
var vec__175 = p__174;
var k = cljs.core.nth.call(null,vec__175,(0),null);
var v = cljs.core.nth.call(null,vec__175,(1),null);
return cljs.core._EQ_.call(null,k,v);
}),cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)),ns,new cljs.core.Keyword(null,"requires","requires",(-1201390927))], null)),cljs.core.get_in.call(null,cljs.core.deref.call(null,state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)),ns,new cljs.core.Keyword(null,"require-macros","require-macros",(707947416))], null)))));
}));

(klipse_clj.repl.current_alias_map.cljs$lang$maxFixedArity = (2));

klipse_clj.repl.namespace_completions = (function klipse_clj$repl$namespace_completions(){
return cljs.core.distinct.call(null,cljs.core.sort.call(null,cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.str,klipse_clj.repl.namespace_completion_additons),cljs.core.remove.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,cljs.core.str,klipse_clj.repl.namespace_completion_exclusions)),cljs.core.map.call(null,(function (p1__4_SHARP_){
return klipse_clj.repl.drop_macros_suffix.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__4_SHARP_));
}),klipse_clj.repl.all_ns.call(null))))));
});
/**
 * Expand the typed namespace symbol to a known namespace, consulting current
 *   namespace aliases if necessary.
 */
klipse_clj.repl.expand_typed_ns = (function klipse_clj$repl$expand_typed_ns(alias){
var alias__$1 = ((cljs.core.symbol_identical_QMARK_.call(null,alias,new cljs.core.Symbol(null,"clojure.core","clojure.core",(-189332625),null)))?new cljs.core.Symbol(null,"cljs.core","cljs.core",(770546058),null):alias);
var or__10112__auto__ = cljs.core.get_in.call(null,klipse_clj.repl.st,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",(-260788927)),alias__$1,new cljs.core.Keyword(null,"name","name",(1843675177))], null));
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var or__10112__auto____$1 = alias__$1.call(null,klipse_clj.repl.current_alias_map.call(null));
if(cljs.core.truth_(or__10112__auto____$1)){
return or__10112__auto____$1;
} else {
return alias__$1;
}
}
});
klipse_clj.repl.completion_candidates = (function klipse_clj$repl$completion_candidates(top_form_QMARK_,typed_ns){
return cljs.core.set.call(null,(cljs.core.truth_(typed_ns)?(function (){var expanded_ns = klipse_clj.repl.expand_typed_ns.call(null,cljs.core.symbol.call(null,typed_ns));
return cljs.core.concat.call(null,klipse_clj.repl.completion_candidates_for_ns.call(null,expanded_ns,false),klipse_clj.repl.completion_candidates_for_ns.call(null,klipse_clj.repl.add_macros_suffix.call(null,expanded_ns),false));
})():cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.str,klipse_clj.repl.keyword_completions),klipse_clj.repl.namespace_completions.call(null),cljs.core.map.call(null,(function (p1__5_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__5_SHARP_),"/"].join('');
}),cljs.core.keys.call(null,klipse_clj.repl.current_alias_map.call(null))),klipse_clj.repl.completion_candidates_for_ns.call(null,new cljs.core.Symbol(null,"cljs.core","cljs.core",(770546058),null),false),klipse_clj.repl.completion_candidates_for_ns.call(null,new cljs.core.Symbol(null,"cljs.core$macros","cljs.core$macros",(-2057787548),null),false),klipse_clj.repl.completion_candidates_for_current_ns.call(null),(cljs.core.truth_(top_form_QMARK_)?cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.str,cljs.core.keys.call(null,klipse_clj.repl_resources.special_doc_map)),cljs.core.map.call(null,cljs.core.str,cljs.core.keys.call(null,klipse_clj.repl_resources.repl_special_doc_map))):null))));
});
klipse_clj.repl.longest_common_prefix = (function klipse_clj$repl$longest_common_prefix(strings){
var minl = cljs.core.apply.call(null,cljs.core.min,cljs.core.map.call(null,cljs.core.count,strings));
var l = minl;
while(true){
if((l > (0))){
if(cljs.core.every_QMARK_.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.subs.call(null,cljs.core.first.call(null,strings),(0),l)]),cljs.core.map.call(null,((function (l,minl){
return (function (p1__6_SHARP_){
return cljs.core.subs.call(null,p1__6_SHARP_,(0),l);
});})(l,minl))
,cljs.core.rest.call(null,strings)))){
return cljs.core.subs.call(null,cljs.core.first.call(null,strings),(0),l);
} else {
var G__179 = (l - (1));
l = G__179;
continue;
}
} else {
return "";
}
break;
}
});
klipse_clj.repl.spec_registered_keywords = (function klipse_clj$repl$spec_registered_keywords(ns){
return cljs.core.eduction.call(null,cljs.core.filter.call(null,cljs.core.keyword_QMARK_),cljs.core.filter.call(null,(function (p1__7_SHARP_){
return cljs.core._EQ_.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.namespace.call(null,p1__7_SHARP_));
})),cljs.core.keys.call(null,cljs.spec.alpha.registry.call(null)));
});
klipse_clj.repl.local_keyword_str = (function klipse_clj$repl$local_keyword_str(kw){
return ["::",cljs.core.name.call(null,kw)].join('');
});
/**
 * Returns foo for ::foo, otherwise nil
 */
klipse_clj.repl.local_keyword = (function klipse_clj$repl$local_keyword(buffer){
return cljs.core.second.call(null,cljs.core.re_find.call(null,/::([a-zA-Z-]*)$/,buffer));
});
klipse_clj.repl.local_keyword_completions = (function klipse_clj$repl$local_keyword_completions(kw_name){
var kw_source = ["::",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kw_name)].join('');
return cljs.core.clj__GT_js.call(null,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kw_source], null),cljs.core.sequence.call(null,cljs.core.comp.call(null,cljs.core.map.call(null,klipse_clj.repl.local_keyword_str),cljs.core.filter.call(null,(function (p1__8_SHARP_){
return clojure.string.starts_with_QMARK_.call(null,p1__8_SHARP_,kw_source);
}))),klipse_clj.repl.spec_registered_keywords.call(null,cljs.core.deref.call(null,klipse_clj.repl.current_ns_eval)))));
});
/**
 * Returns an array of the buffer-match-suffix, along with completions for the
 *   entered text. If one completion is returned the line should be completed to
 *   match it (in which the completion may actually only be a longest prefix from
 *   the list of candiates), otherwise the list of completions should be
 *   displayed.
 */
klipse_clj.repl.get_completions = (function klipse_clj$repl$get_completions(buffer){
if((cljs.core.deref.call(null,klipse_clj.repl.st) == null)){
return cljs.core.with_meta.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [buffer], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ready","ready",(1086465795)),false], null));
} else {
var temp__9584__auto__ = klipse_clj.repl.local_keyword.call(null,buffer);
if(cljs.core.truth_(temp__9584__auto__)){
var kw_name = temp__9584__auto__;
return klipse_clj.repl.local_keyword_completions.call(null,kw_name);
} else {
var top_form_QMARK_ = cljs.core.re_find.call(null,/^\s*\(\s*[^()\s]*$/,buffer);
var typed_ns = cljs.core.second.call(null,cljs.core.re_find.call(null,/\(*(\b[a-zA-Z0-9-.<>*=&?]+)\/[a-zA-Z0-9-]*$/,buffer));
var buffer_match_suffix = cljs.core.first.call(null,cljs.core.re_find.call(null,/:?([a-zA-Z0-9-.<>*=&?]*|^\(\/)$/,buffer));
var completions = cljs.core.sort.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,klipse_clj.repl.is_completion_QMARK_,buffer_match_suffix),klipse_clj.repl.completion_candidates.call(null,top_form_QMARK_,typed_ns)));
var common_prefix = klipse_clj.repl.longest_common_prefix.call(null,completions);
return cljs.core.with_meta.call(null,((((cljs.core.empty_QMARK_.call(null,common_prefix)) || (cljs.core._EQ_.call(null,common_prefix,buffer_match_suffix))))?cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [buffer_match_suffix], null),completions):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [buffer_match_suffix,common_prefix], null)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ready","ready",(1086465795)),true], null));
}
}
});

//# sourceURL=klipse_clj/repl.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2xpcHNlX2Nsai9yZXBsLmpzIiwic291cmNlcyI6WyJyZXBsLmNsanMiXSwibGluZUNvdW50Ijo3OTksIm1hcHBpbmdzIjoiO0FBY0E7QUFHQSxHQUFBLFFBQUFBLHVDQUFBQyw0Q0FBQUM7QUFBQTtBQUFBLEFBQUEsQUFBa0JDLGtDQUFnQix5QkFBQSxBQUFBLHpCQUFDQzs7QUFDbkMsR0FBQSxRQUFBSix1Q0FBQUMsNENBQUFJO0FBQUE7QUFBQSxBQUFBLEFBQWtCQyxxQ0FBbUIseUJBQUEsQUFBQSx6QkFBQ0Y7O0FBRXRDLHNDQUFBLHRDQUFNRztBQUFOLEFBQ0UsdUVBQUEsQUFBQSxoRUFBQ0MsZ0NBQU9MOztBQUVWLHlDQUFBLHpDQUFNTTtBQUFOLEFBQ0UsMEVBQUEsQUFBQSxuRUFBQ0QsZ0NBQU9GOztBQUdWLEdBQUEsUUFBQU4sdUNBQUFDLDRDQUFBUztBQUFBO0FBQUEsQUFBQSxBQUFTQyxxQkFBRyx5QkFBQSx6QkFBQ1A7O0FBRWIseUNBQUEsekNBQU1RO0FBQU4sQUFDRSwwREFBQSxuREFBQ0osZ0NBQU9HOztBQUVWLEFBQUtFLDZCQUFXLHlCQUFBLHpCQUFDVDtBQUVqQix1Q0FBQSx2Q0FBTVc7QUFBTixBQUNFLEdBQU0sQ0FBQSxBQUFBRCx5REFBQSwvQkFBT0Q7QUFBYixBQUNFLEFBQUNMLGdDQUFPSywyQkFBVyxBQUFDRzs7QUFEdEI7O0FBREYsT0FBQUYsMEJBR0dEOztBQUVILDRDQUFBLDVDQUFNSTtBQUFOLEFBQ0Usa0VBQUEsM0RBQUNULGdDQUFPSzs7QUFFVixvQ0FBQSxwQ0FBT0ssZ0ZBQ0pDO0FBREgsQUFFRSxPQUFDQywyQkFBTywrQkFBQSw5QkFBSyxBQUFDQyx5QkFBS0Y7O0FBRXJCLEFBQUEsNEJBQUEsb0NBQUFHLGhFQUFNRTtBQUFOLEFBQUEsSUFBQUQsUUFBQSxBQUFBO0FBQUEsQUFBQSxRQUFBQTtLQUFBO0FBQUEsT0FBQUMsd0RBQUEsQ0FBQSxVQUFBOzs7S0FBQTtBQUFBLE9BQUFBLHdEQUFBLENBQUEsVUFBQSxNQUFB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QUFBQTVPLG5EQUFDaU8sNkVBQTBCNU87O0FBRTVDOzs7Ozs7O2tDQUFBLGxDQUFNMFAsNEVBTUhOO0FBTkgsQUFPRSxHQUFJLENBQUEsQUFBQXpPLGlEQUFBLHZCQUFPSDtBQUNULHFDQUFBLGtHQUFBLDJDQUFBLHlEQUFBLHBPQUFDbVAsaUhBQVdQOztBQUNaLElBQUFuSixxQkFBaUIsQUFBQ2tKLHdDQUFjQztBQUFoQyxBQUFBLG9CQUFBbko7QUFBQSxjQUFBQSxWQUFTcUo7QUFBVCxBQUNFLE9BQUNELG9EQUEwQkM7O0FBQzNCLElBQU12QixrQkFBVSw0QkFBQSw1QkFBQ3RJLGlEQUE4QjJKO0lBQ3pDcEIsV0FBVSxBQUFDOUcsMkJBQU8sNEJBQUEsNUJBQUN6QiwwRUFBc0QySjtBQUQvRSxBQUVFLElBQU1RLHNCQUFvQixBQUFDaEosMEJBQU0sNEJBQUEsNUJBQUNuQiw4REFBMEMySjtJQUN0RVMsY0FBb0IsQUFBQ3BDLHlCQUFLLEFBQUM5QiwyQkFBTyxBQUFDbUUsNEJBQVF2RCxxQ0FBZXFELHFCQUN4QixBQUFDOUIsZ0RBQXNCQyxnQkFBVUM7SUFDbkUrQixnQkFBYyxBQUFDM0IsZ0RBQXNCeUI7QUFIM0MsQUFJRSxnYkFBQSwyQ0FBQSx5REFBQSw3Z0JBQUNGLDhCQUNDLDZRQUFBLDNRQUFJLEVBQUksQUFBQ0ssaUNBQU9ELG9CQUNSLEFBQUM5SSx5QkFBRThJLGNBQWNILHdCQUN2Qix5QkFBQSx6QkFBQ3pFLDRHQUFNeUUsNEJBQXFCQyxnR0FDM0JELG9CQUFvQkciLCJuYW1lcyI6WyJqcy9rbGlwc2UtY2xqIiwianMva2xpcHNlLWNsai5yZXBsIiwianMva2xpcHNlLWNsai5yZXBsLmN1cnJlbnQtbnMtZXZhbCIsImtsaXBzZS1jbGoucmVwbC9jdXJyZW50LW5zLWV2YWwiLCJjbGpzLmNvcmUvYXRvbSIsImpzL2tsaXBzZS1jbGoucmVwbC5jdXJyZW50LW5zLWNvbXBpbGUiLCJrbGlwc2UtY2xqLnJlcGwvY3VycmVudC1ucy1jb21waWxlIiwia2xpcHNlLWNsai5yZXBsL3Jlc2V0LW5zLWV2YWwhIiwiY2xqcy5jb3JlL3Jlc2V0ISIsImtsaXBzZS1jbGoucmVwbC9yZXNldC1ucy1jb21waWxlISIsImpzL2tsaXBzZS1jbGoucmVwbC5zdCIsImtsaXBzZS1jbGoucmVwbC9zdCIsImtsaXBzZS1jbGoucmVwbC9yZXNldC1zdGF0ZS1ldmFsISIsImtsaXBzZS1jbGoucmVwbC9zdC1jb21waWxlIiwiY2xqcy5jb3JlL2RlcmVmIiwia2xpcHNlLWNsai5yZXBsL2NyZWF0ZS1zdGF0ZS1jb21waWxlIiwiY2xqcy5qcy9lbXB0eS1zdGF0ZSIsImtsaXBzZS1jbGoucmVwbC9yZXNldC1zdGF0ZS1jb21waWxlISIsImtsaXBzZS1jbGoucmVwbC9hZGQtbWFjcm9zLXN1ZmZpeCIsInN5bSIsImNsanMuY29yZS9zeW1ib2wiLCJjbGpzLmNvcmUvbmFtZSIsInZhcl9hcmdzIiwiR19fMjQiLCJrbGlwc2UtY2xqLnJlcGwvZXZhbC1mb3JtIiwianMvRXJyb3IiLCJmb3JtIiwiY2xqcy5jb3JlLypucyoiLCJucyIsInJlc3VsdCIsImNsanMuanMvZXZhbCIsImNsanMuanMvanMtZXZhbCIsInBfXzI1IiwibWFwX18yNiIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9oYXNoLW1hcCIsImNsanMuY29yZS9nZXQiLCJ2YWx1ZSIsImVycm9yIiwiR19fMzAiLCJrbGlwc2UtY2xqLnJlcGwvZGVmLWEtdmFyIiwibmFtZSIsInRlbXBfXzk2NDZfX2F1dG9fXyIsInRoZS1ucyIsImNsanMuY29yZS9maW5kLW5zIiwiR19fMzEiLCJjbGpzLmNvcmUvTmFtZXNwYWNlIiwiY2xqcy5jb3JlL25zLW5hbWUiLCJjbGpzLmNvcmUvc2VxdWVuY2UiLCJjbGpzLmNvcmUvY29uY2F0IiwiY2xqcy5jb3JlL0xpc3QiLCJ2YWwiLCJHX18zMiIsImtsaXBzZS1jbGoucmVwbC9yZXNvbHZlLXZhciIsImVudiIsImNsanMuY29yZS9tYXA/IiwiY2xqcy5jb3JlL1N5bWJvbCIsImUzNCIsImNsanMuYW5hbHl6ZXIvcmVzb2x2ZS12YXIiLCJjbGpzLmFuYWx5emVyL2NvbmZpcm0tdmFyLWV4aXN0cy10aHJvdyIsIl8iLCJjbGpzLmFuYWx5emVyL3Jlc29sdmUtbWFjcm8tdmFyIiwia2xpcHNlLWNsai5yZXBsL3ByaW50LXZhbHVlIiwib3B0cyIsImNsanMuY29yZS9wcm4iLCJrbGlwc2UtY2xqLnJlcGwvc3RyLWJ1dGxhc3QiLCJzIiwiY2xqcy5jb3JlL3N1YnMiLCJjbGpzLmNvcmUvY291bnQiLCJrbGlwc2UtY2xqLnJlcGwvZm9ybWF0LXNwZWMiLCJzcGVjIiwibGVmdC1tYXJnaW4iLCJyYXctcHJpbnQiLCJzYl9fMTIzMTRfX2F1dG9fXyIsImdvb2cuc3RyaW5nL1N0cmluZ0J1ZmZlciIsIipwcmludC1uZXdsaW5lKi1vcmlnLXZhbF9fMzUiLCJjbGpzLmNvcmUvKnByaW50LW5ld2xpbmUqIiwiKnByaW50LWZuKi1vcmlnLXZhbF9fMzYiLCJjbGpzLmNvcmUvKnByaW50LWZuKiIsIipwcmludC1uZXdsaW5lKi10ZW1wLXZhbF9fMzciLCIqcHJpbnQtZm4qLXRlbXAtdmFsX18zOCIsInhfXzEyMzE1X19hdXRvX18iLCJjbGpzLnNwZWMuYWxwaGEvZGVzY3JpYmUiLCJjbG9qdXJlLnN0cmluZy9yZXBsYWNlIiwiY2xqcy5jb3JlL3N0ciIsImNsanMuY29yZS9yZXBlYXQiLCJrbGlwc2UtY2xqLnJlcGwvZHJvcC1tYWNyb3Mtc3VmZml4IiwibnMtbmFtZSIsImNsb2p1cmUuc3RyaW5nL2VuZHMtd2l0aD8iLCJjbGpzLmNvcmUvZHJvcC1sYXN0Iiwia2xpcHNlLWNsai5yZXBsL3VuZG8tcmVhZGVyLWNvbmRpdGlvbmFsLXdoaXRlc3BhY2UtZG9jc3RyaW5nIiwiY2xqcy5jb3JlL3JlLWZpbmQiLCJwX180MyIsIm1hcF9fNDQiLCJrbGlwc2UtY2xqLnJlcGwvcHJpbnQtZG9jIiwibiIsIm5tIiwibSIsImNsanMuY29yZS9wcmludGxuIiwidGVtcF9fOTU4NF9fYXV0b19fIiwic2VxX180NiIsImNsanMuY29yZS9zZXEiLCJjaHVua19fNDciLCJjb3VudF9fNDgiLCJpX180OSIsImNsanMuY29yZS8tbnRoIiwiY2xqcy5jb3JlL2NodW5rZWQtc2VxPyIsImNfXzExNzI5X19hdXRvX18iLCJjbGpzLmNvcmUvY2h1bmstZmlyc3QiLCJjbGpzLmNvcmUvY2h1bmstcmVzdCIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwiZiIsImFyZ2xpc3RzIiwib3JfXzEwMTEyX19hdXRvX18iLCJjbGpzLmNvcmUvPSIsImNsanMuY29yZS9zZWNvbmQiLCJjbGpzLmNvcmUvY29udGFpbnM/Iiwic2VxX181MCIsImNodW5rX181MSIsImNvdW50X181MiIsImlfXzUzIiwidmVjX182NCIsImNsanMuY29yZS9udGgiLCJtYXBfXzY3IiwidmVjX182OSIsIm1hcF9fNzIiLCJkb2MiLCJzcGVjLWxvb2t1cCIsIm5zLXN1ZmZpeCIsImNsanMuc3BlYy5hbHBoYS9nZXQtc3BlYyIsImZuc3BlYyIsImNsanMuY29yZS9wcmludCIsInNlcV9fNzQiLCJjaHVua19fNzUiLCJjb3VudF9fNzYiLCJpX183NyIsInJvbGUiLCJrbGlwc2UtY2xqLnJlcGwvc3BlY2lhbC1kb2MiLCJuYW1lLXN5bWJvbCIsImNsanMuY29yZS9hc3NvYyIsImtsaXBzZS1jbGoucmVwbC1yZXNvdXJjZXMvc3BlY2lhbC1kb2MtbWFwIiwia2xpcHNlLWNsai5yZXBsL3JlcGwtc3BlY2lhbC1kb2MiLCJrbGlwc2UtY2xqLnJlcGwtcmVzb3VyY2VzL3JlcGwtc3BlY2lhbC1kb2MtbWFwIiwia2xpcHNlLWNsai5yZXBsL2dldC1uYW1lc3BhY2UiLCJjbGpzLmNvcmUvZ2V0LWluIiwia2xpcHNlLWNsai5yZXBsL2dldC1tYWNyby12YXIiLCJtYWNyb3MtbnMiLCJtYWNyby12YXIiLCJlbnZfXzFfX2F1dG9fXyIsImNsanMuY29yZS9BdG9tIiwiY2xqcy5jb3JlL3R5cGUiLCIqY29tcGlsZXIqLW9yaWctdmFsX18xNTgiLCJjbGpzLmVudi8qY29tcGlsZXIqIiwiKmNvbXBpbGVyKi10ZW1wLXZhbF9fMTU5Iiwia2xpcHNlLWNsai5yZXBsL2dldC1hZW52IiwiY2xqcy5hbmFseXplci9lbXB0eS1lbnYiLCJrbGlwc2UtY2xqLnJlcGwvZ2V0LXZhciIsIipjbGpzLXdhcm5pbmctaGFuZGxlcnMqLW9yaWctdmFsX18xNjAiLCIqY2xqcy13YXJuaW5nLWhhbmRsZXJzKi10ZW1wLXZhbF9fMTYxIiwiY2xqcy5hbmFseXplci8qY2xqcy13YXJuaW5nLWhhbmRsZXJzKiIsInZhciIsIipjb21waWxlciotb3JpZy12YWxfXzE2NCIsIipjb21waWxlciotdGVtcC12YWxfXzE2NSIsIkdfXzE2NiIsImNsanMuY29yZS9ub3QiLCJjbGpzLmNvcmUvbmFtZXNwYWNlIiwicDFfXzEjIiwiY2xqcy5jb3JlL3VwZGF0ZSIsImNsanMuY29yZS9jb21wIiwia2xpcHNlLWNsai5yZXBsL2RvYyoiLCJzcGVjaWFsLW5hbWUiLCJjbGpzLmNvcmUvcXVhbGlmaWVkLWtleXdvcmQ/IiwiY2xqcy5jb3JlL3NlbGVjdC1rZXlzIiwiR19fMTY3IiwiY2xqcy5jb3JlL3VwZGF0ZS1pbiIsImNsanMuY29yZS9tYXAiLCJwX18xNjgiLCJ2ZWNfXzE2OSIsImZuYW1lIiwic2lncyIsImNsanMuY29yZS9pbnRvIiwia2xpcHNlLWNsai5yZXBsL2NvbXBsZXRpb24tY2FuZGlkYXRlcy1mb3ItbnMiLCJucy1zeW0iLCJhbGxvdy1wcml2YXRlPyIsImNsb2p1cmUuc3RyaW5nL3N0YXJ0cy13aXRoPyIsImNsanMuY29yZS9qcy1rZXlzIiwianMvZ29vZyIsImNsanMuY29yZS9rZXkiLCJjbGpzLmNvcmUvZmlsdGVyIiwicDFfXzIjIiwiY2xqcy5jb3JlL2lkZW50aXR5IiwiY2xqcy5jb3JlL3ZhbCIsInAxX18zIyIsImNsanMuY29yZS9yZW1vdmUiLCJjbGpzLmNvcmUvbWVyZ2UiLCJjbGpzLmNvcmUvanV4dCIsImtsaXBzZS1jbGoucmVwbC9jb21wbGV0aW9uLWNhbmRpZGF0ZXMtZm9yLWN1cnJlbnQtbnMiLCJjdXItbnMiLCJjbGpzLmNvcmUvbWFwY2F0IiwiY2xqcy5jb3JlL2tleXMiLCJrbGlwc2UtY2xqLnJlcGwvaXMtY29tcGxldGlvbj8iLCJtYXRjaC1zdWZmaXgiLCJjYW5kaWRhdGUiLCJlc2NhcGVkLXN1ZmZpeCIsImpzL1JlZ0V4cCIsImtsaXBzZS1jbGoucmVwbC9rZXl3b3JkLWNvbXBsZXRpb25zIiwia2xpcHNlLWNsai5yZXBsL25hbWVzcGFjZS1jb21wbGV0aW9uLWV4Y2x1c2lvbnMiLCJrbGlwc2UtY2xqLnJlcGwvbmFtZXNwYWNlLWNvbXBsZXRpb24tYWRkaXRvbnMiLCJrbGlwc2UtY2xqLnJlcGwvYWxsLW5zIiwiR19fMTczIiwia2xpcHNlLWNsai5yZXBsL2N1cnJlbnQtYWxpYXMtbWFwIiwic3RhdGUiLCJwX18xNzQiLCJ2ZWNfXzE3NSIsImsiLCJ2Iiwia2xpcHNlLWNsai5yZXBsL25hbWVzcGFjZS1jb21wbGV0aW9ucyIsInAxX180IyIsImNsanMuY29yZS9zb3J0IiwiY2xqcy5jb3JlL2Rpc3RpbmN0Iiwia2xpcHNlLWNsai5yZXBsL2V4cGFuZC10eXBlZC1ucyIsImFsaWFzIiwiY2xqcy5jb3JlL3N5bWJvbC1pZGVudGljYWw/Iiwia2xpcHNlLWNsai5yZXBsL2NvbXBsZXRpb24tY2FuZGlkYXRlcyIsInRvcC1mb3JtPyIsInR5cGVkLW5zIiwiY2xqcy5jb3JlL3NldCIsImV4cGFuZGVkLW5zIiwicDFfXzUjIiwia2xpcHNlLWNsai5yZXBsL2xvbmdlc3QtY29tbW9uLXByZWZpeCIsInN0cmluZ3MiLCJtaW5sIiwiY2xqcy5jb3JlL21pbiIsImwiLCJjbGpzLmNvcmUvZXZlcnk/IiwicDFfXzYjIiwiY2xqcy5jb3JlL3Jlc3QiLCJrbGlwc2UtY2xqLnJlcGwvc3BlYy1yZWdpc3RlcmVkLWtleXdvcmRzIiwiY2xqcy5jb3JlL2VkdWN0aW9uIiwiY2xqcy5jb3JlL2tleXdvcmQ/IiwicDFfXzcjIiwiY2xqcy5zcGVjLmFscGhhL3JlZ2lzdHJ5Iiwia2xpcHNlLWNsai5yZXBsL2xvY2FsLWtleXdvcmQtc3RyIiwia3ciLCJrbGlwc2UtY2xqLnJlcGwvbG9jYWwta2V5d29yZCIsImJ1ZmZlciIsImtsaXBzZS1jbGoucmVwbC9sb2NhbC1rZXl3b3JkLWNvbXBsZXRpb25zIiwia3ctbmFtZSIsImt3LXNvdXJjZSIsImNsanMuY29yZS9jbGotPmpzIiwicDFfXzgjIiwia2xpcHNlLWNsai5yZXBsL2dldC1jb21wbGV0aW9ucyIsImNsanMuY29yZS93aXRoLW1ldGEiLCJidWZmZXItbWF0Y2gtc3VmZml4IiwiY29tcGxldGlvbnMiLCJjbGpzLmNvcmUvcGFydGlhbCIsImNvbW1vbi1wcmVmaXgiLCJjbGpzLmNvcmUvZW1wdHk/Il0sInNvdXJjZXNDb250ZW50IjpbIihucyBrbGlwc2UtY2xqLnJlcGxcbiAgKDpyZXF1aXJlLW1hY3Jvc1xuICAgIGtsaXBzZS1jbGoucmVwbFxuICAgIFtjbGpzLmVudi5tYWNyb3MgOnJlZmVyIFt3aXRoLWNvbXBpbGVyLWVudl1dKVxuICAoOnJlcXVpcmVcbiAgICBba2xpcHNlLWNsai5yZXBsLXJlc291cmNlcyA6cmVmZXIgW3JlcGwtc3BlY2lhbC1kb2MtbWFwIHNwZWNpYWwtZG9jLW1hcF1dXG4gICAgW2NsanMuYW5hbHl6ZXIgOmFzIGFuYV1cbiAgICBbY2xqcy5zcGVjLmFscGhhIDphcyBzXVxuICAgIFtjbG9qdXJlLnN0cmluZyA6YXMgc3RyaW5nXVxuICAgIFtjbGpzLmpzIDphcyBjbGpzXSkpXG5cbjs7IGNyZWF0ZSBjbGpzLnVzZXJcbjsoc2V0ISAoLi4ganMvd2luZG93IC1jbGpzIC11c2VyKSAjanMge30pXG47IHRoZSBmb2xsb3dpbmcgY29kZSBpcyBhZHZhbmNlZCBjb21waWxhdGlvbiBmcmllbmRseVxuKGpzKiBcImlmKHR5cGVvZiB3aW5kb3cgIT09IFxcXCJ1bmRlZmluZWRcXFwiKSB7d2luZG93LmNsanMudXNlciA9IHt9fVwiKVxuXG5cbihkZWZvbmNlIF46cHVibGljIGN1cnJlbnQtbnMtZXZhbCAoYXRvbSAnY2xqcy51c2VyKSlcbihkZWZvbmNlIF46cHVibGljIGN1cnJlbnQtbnMtY29tcGlsZSAoYXRvbSAnY2xqcy51c2VyKSlcblxuKGRlZm4gcmVzZXQtbnMtZXZhbCEgW11cbiAgKHJlc2V0ISBjdXJyZW50LW5zLWV2YWwgJ2NsanMudXNlcikpXG5cbihkZWZuIHJlc2V0LW5zLWNvbXBpbGUhIFtdXG4gIChyZXNldCEgY3VycmVudC1ucy1jb21waWxlICdjbGpzLnVzZXIpKVxuXG5cbihkZWZvbmNlIHN0IChhdG9tIG5pbCkpXG5cbihkZWZuIHJlc2V0LXN0YXRlLWV2YWwhIFtdXG4gIChyZXNldCEgc3QgbmlsKSlcblxuKGRlZiBzdC1jb21waWxlIChhdG9tIG5pbCkpXG5cbihkZWZuIGNyZWF0ZS1zdGF0ZS1jb21waWxlIFtdXG4gICh3aGVuIChuaWw/IEBzdC1jb21waWxlKVxuICAgIChyZXNldCEgc3QtY29tcGlsZSAoY2xqcy9lbXB0eS1zdGF0ZSkpKVxuICBAc3QtY29tcGlsZSlcblxuKGRlZm4gcmVzZXQtc3RhdGUtY29tcGlsZSEgW11cbiAgKHJlc2V0ISBzdC1jb21waWxlIG5pbCkpXG5cbihkZWZuLSBhZGQtbWFjcm9zLXN1ZmZpeFxuICBbc3ltXVxuICAoc3ltYm9sIChzdHIgKG5hbWUgc3ltKSBcIiRtYWNyb3NcIikpKVxuXG4oZGVmbiBldmFsLWZvcm1cbiAgKFtmb3JtXVxuICAgKGV2YWwtZm9ybSAoLi1uYW1lICpucyopKSlcbiAgKFtmb3JtIG5zXVxuICAgKGxldCBbcmVzdWx0IChhdG9tIG5pbCldXG4gICAgIChjbGpzL2V2YWwgQHN0IGZvcm1cbiAgICAgICAgICAgICAgICB7Om5zICAgICAgICAgICAgbnNcbiAgICAgICAgICAgICAgICAgOmNvbnRleHQgICAgICAgOmV4cHJcbiAgICAgICAgICAgICAgICAgOmV2YWwgICAgICAgICAgY2xqcy9qcy1ldmFsXG4gICAgICAgICAgICAgICAgIDpkZWYtZW1pdHMtdmFyIHRydWV9XG4gICAgICAgICAgICAgICAgKGZuIFt7OmtleXMgW3ZhbHVlIGVycm9yXX1dXG4gICAgICAgICAgICAgICAgICAoaWYgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgKHJlc2V0ISByZXN1bHQgdmFsdWUpKSkpXG4gICAgIEByZXN1bHQpKSlcblxuKGRlZm4gZGVmLWEtdmFyXG4gIChbbnMgbmFtZV1cbiAgICh3aGVuLWxldCBbdGhlLW5zIChmaW5kLW5zIChjb25kLT4gbnMgKGluc3RhbmNlPyBOYW1lc3BhY2UgbnMpIG5zLW5hbWUpKV1cbiAgICAgKGV2YWwtZm9ybSBgKGRlZiB+bmFtZSkgKG5zLW5hbWUgdGhlLW5zKSkpKVxuICAoW25zIG5hbWUgdmFsXVxuICAgKHdoZW4tbGV0IFt0aGUtbnMgKGZpbmQtbnMgKGNvbmQtPiBucyAoaW5zdGFuY2U/IE5hbWVzcGFjZSBucykgbnMtbmFtZSkpXVxuICAgICAoZXZhbC1mb3JtIGAoZGVmIH5uYW1lIH52YWwpIChucy1uYW1lIHRoZS1ucykpKSkpXG5cblxuXG5cblxuOzsgZG9jIHN0dWZmXG5cblxuKGRlZm4tIHJlc29sdmUtdmFyXG4gIFwiR2l2ZW4gYW4gYW5hbHlzaXMgZW52aXJvbm1lbnQgcmVzb2x2ZSBhIHZhci4gQW5hbG9nb3VzIHRvXG4gICBjbG9qdXJlLmNvcmUvcmVzb2x2ZVwiXG4gIFtlbnYgc3ltXVxuICB7OnByZSBbKG1hcD8gZW52KSAoc3ltYm9sPyBzeW0pXX1cbiAgKHRyeVxuICAgIChhbmEvcmVzb2x2ZS12YXIgZW52IHN5bVxuICAgICAgICAgICAgICAgICAgICAgKGFuYS9jb25maXJtLXZhci1leGlzdHMtdGhyb3cpKVxuICAgIChjYXRjaCA6ZGVmYXVsdCBfXG4gICAgICAoYW5hL3Jlc29sdmUtbWFjcm8tdmFyIGVudiBzeW0pKSkpXG5cbihkZWZuLSBwcmludC12YWx1ZVxuICBbdmFsdWUgb3B0c11cbiAgOzsgVE9ETzogZmluZCBhIGJldHRlciBpbXBsZW1lbnRhaW9uIC0gbG9vayBhdCBwbGFuY2sucmVwbFxuICAocHJuIHZhbHVlKSlcblxuXG4oZGVmbi0gc3RyLWJ1dGxhc3RcbiAgW3NdXG4gIChzdWJzIHMgMCAoZGVjIChjb3VudCBzKSkpKVxuXG4oZGVmbi0gZm9ybWF0LXNwZWNcbiAgW3NwZWMgbGVmdC1tYXJnaW4gbnNdXG4gIChsZXQgW3Jhdy1wcmludCAod2l0aC1vdXQtc3RyIChwcmludC12YWx1ZSAocy9kZXNjcmliZSBzcGVjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgezo6a2V5d29yZC1ucyAgICAgbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6OnNwZWM/ICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6OmFzLWNvZGU/ICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6OnRlcm0td2lkdGgtYWRqICgtIGxlZnQtbWFyZ2luKX0pKV1cbiAgICAoc3RyaW5nL3JlcGxhY2UgKHN0ci1idXRsYXN0IHJhdy1wcmludCkgI1wiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKGFwcGx5IHN0ciBcXG5ld2xpbmUgKHJlcGVhdCBsZWZ0LW1hcmdpbiBcIiBcIikpKSkpXG5cbihkZWZuLSBkcm9wLW1hY3Jvcy1zdWZmaXhcbiAgW25zLW5hbWVdXG4gIChpZiAoc3RyaW5nL2VuZHMtd2l0aD8gbnMtbmFtZSBcIiRtYWNyb3NcIilcbiAgICAoYXBwbHkgc3RyIChkcm9wLWxhc3QgNyBucy1uYW1lKSlcbiAgICBucy1uYW1lKSlcblxuKGRlZm4tIHVuZG8tcmVhZGVyLWNvbmRpdGlvbmFsLXdoaXRlc3BhY2UtZG9jc3RyaW5nXG4gIFwiVW5kb2VzIHRoZSBlZmZlY3QgdGhhdCB3cmFwcGluZyBhIHJlYWRlciBjb25kaXRpb25hbCBhcm91bmQgYSBkZWZuIGhhcyBvbiBhXG4gIGRvY3N0cmluZy5cIlxuICBbc11cbiAgOzsgV2UgbG9vayBmb3IgZml2ZSBzcGFjZXMgKG9yIHNpeCwgaW4gY2FzZSB0aGF0IHRoZSBkb2NzdHJpbmdcbiAgOzsgaXMgbm90IGFsaWduZWQgdW5kZXIgdGhlIGZpcnN0IHF1b3RlKSBhZnRlciB0aGUgZmlyc3QgbmV3bGluZVxuICA7OyAob3IgdHdvLCBpbiBjYXNlIHRoZSBkb2N0cmluZyBoYXMgYW4gdW5wYWRkZWQgYmxhbmsgbGluZVxuICA7OyBhZnRlciB0aGUgZmlyc3QpLCBhbmQgdGhlbiByZXBsYWNlIGFsbCBmaXZlIChvciBzaXgpIHNwYWNlc1xuICA7OyBhZnRlciBuZXdsaW5lcyB3aXRoIHR3by5cbiAgKHdoZW4tbm90IChuaWw/IHMpXG4gICAgKGlmIChyZS1maW5kICNcIlteXFxuXSpcXG5cXG4/ICAgICAgP1xcUy4qXCIgcylcbiAgICAgIChzdHJpbmcvcmVwbGFjZSBzICNcIlxcbiAgICAgID9cIiBcIlxcbiAgXCIpXG4gICAgICBzKSkpXG5cbihkZWZuLSBwcmludC1kb2MgW3tuIDpucyBubSA6bmFtZSA6YXMgbX1dXG4gIChwcmludGxuIFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxuICAoaWYtbGV0IFtzcGVjICg6c3BlYyBtKV1cbiAgICAocHJpbnQtdmFsdWUgc3BlYyB7fSlcbiAgICAocHJpbnRsbiAoc3RyICh3aGVuLWxldCBbbnMgKDpucyBtKV0gKHN0ciBucyBcIi9cIikpICg6bmFtZSBtKSkpKVxuICAod2hlbiAoOnByb3RvY29sIG0pXG4gICAgKHByaW50bG4gXCJQcm90b2NvbFwiKSlcbiAgKGNvbmRcbiAgICAoOmZvcm1zIG0pIChkb3NlcSBbZiAoOmZvcm1zIG0pXVxuICAgICAgICAgICAgICAgICAocHJpbnRsbiBcIiAgXCIgZikpXG4gICAgKDphcmdsaXN0cyBtKSAobGV0IFthcmdsaXN0cyAoOmFyZ2xpc3RzIG0pXVxuICAgICAgICAgICAgICAgICAgICAoaWYgKG9yICg6bWFjcm8gbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoOnJlcGwtc3BlY2lhbC1mdW5jdGlvbiBtKSlcbiAgICAgICAgICAgICAgICAgICAgICAocHJuIGFyZ2xpc3RzKVxuICAgICAgICAgICAgICAgICAgICAgIChwcm5cbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiAoPSAncXVvdGUgKGZpcnN0IGFyZ2xpc3RzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlY29uZCBhcmdsaXN0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnbGlzdHMpKSkpKVxuICAoaWYgKDpzcGVjaWFsLWZvcm0gbSlcbiAgICAoZG9cbiAgICAgIChwcmludGxuIFwiU3BlY2lhbCBGb3JtXCIpXG4gICAgICAocHJpbnRsbiBcIiBcIiAoOmRvYyBtKSlcbiAgICAgIChpZiAoY29udGFpbnM/IG0gOnVybClcbiAgICAgICAgKHdoZW4gKDp1cmwgbSlcbiAgICAgICAgICAocHJpbnRsbiAoc3RyIFwiXFxuICBQbGVhc2Ugc2VlIGh0dHA6Ly9jbG9qdXJlLm9yZy9cIiAoOnVybCBtKSkpKVxuICAgICAgICAocHJpbnRsbiAoc3RyIFwiXFxuICBQbGVhc2Ugc2VlIGh0dHA6Ly9jbG9qdXJlLm9yZy9zcGVjaWFsX2Zvcm1zI1wiXG4gICAgICAgICAgICAgICAgICAgICAgKDpuYW1lIG0pKSkpKVxuICAgIChkb1xuICAgICAgKHdoZW4gKDptYWNybyBtKVxuICAgICAgICAocHJpbnRsbiBcIk1hY3JvXCIpKVxuICAgICAgKHdoZW4gKDpzcGVjIG0pXG4gICAgICAgIChwcmludGxuIFwiU3BlY1wiKSlcbiAgICAgICh3aGVuICg6cmVwbC1zcGVjaWFsLWZ1bmN0aW9uIG0pXG4gICAgICAgIChwcmludGxuIFwiUkVQTCBTcGVjaWFsIEZ1bmN0aW9uXCIpKVxuICAgICAgKHByaW50bG4gXCIgXCIgKDpkb2MgbSkpXG4gICAgICAod2hlbiAoOnByb3RvY29sIG0pXG4gICAgICAgIChkb3NlcSBbW25hbWUgezprZXlzIFtkb2MgYXJnbGlzdHNdfV0gKDptZXRob2RzIG0pXVxuICAgICAgICAgIChwcmludGxuKVxuICAgICAgICAgIChwcmludGxuIFwiIFwiIG5hbWUpXG4gICAgICAgICAgKHByaW50bG4gXCIgXCIgYXJnbGlzdHMpXG4gICAgICAgICAgKHdoZW4gZG9jXG4gICAgICAgICAgICAocHJpbnRsbiBcIiBcIiBkb2MpKSkpXG4gICAgICAod2hlbiBuXG4gICAgICAgIChsZXQgW3NwZWMtbG9va3VwIChmbiBbbnMtc3VmZml4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzL2dldC1zcGVjIChzeW1ib2wgKHN0ciAobnMtbmFtZSBuKSBucy1zdWZmaXgpIChuYW1lIG5tKSkpKV1cbiAgICAgICAgICAod2hlbi1sZXQgW2Zuc3BlYyAob3IgKHNwZWMtbG9va3VwIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzcGVjLWxvb2t1cCBcIiRtYWNyb3NcIikpXVxuICAgICAgICAgICAgKHByaW50IFwiU3BlY1wiKVxuICAgICAgICAgICAgKGRvc2VxIFtyb2xlIFs6YXJncyA6cmV0IDpmbl1dXG4gICAgICAgICAgICAgICh3aGVuLWxldCBbc3BlYyAoZ2V0IGZuc3BlYyByb2xlKV1cbiAgICAgICAgICAgICAgICAocHJpbnQgKHN0ciBcIlxcbiBcIiAobmFtZSByb2xlKSBcIjpcIikgKGZvcm1hdC1zcGVjIHNwZWMgKCsgMyAoY291bnQgKG5hbWUgcm9sZSkpKSBuKSkpKVxuICAgICAgICAgICAgKHByaW50bG4pKSkpKSkpXG5cbihkZWZuLSBzcGVjaWFsLWRvY1xuICBbbmFtZS1zeW1ib2xdXG4gIChhc3NvYyAoc3BlY2lhbC1kb2MtbWFwIG5hbWUtc3ltYm9sKVxuICAgIDpuYW1lIG5hbWUtc3ltYm9sXG4gICAgOnNwZWNpYWwtZm9ybSB0cnVlKSlcblxuKGRlZm4tIHJlcGwtc3BlY2lhbC1kb2NcbiAgW25hbWUtc3ltYm9sXVxuICAoYXNzb2MgKHJlcGwtc3BlY2lhbC1kb2MtbWFwIG5hbWUtc3ltYm9sKVxuICAgIDpuYW1lIG5hbWUtc3ltYm9sXG4gICAgOnJlcGwtc3BlY2lhbC1mdW5jdGlvbiB0cnVlKSlcblxuKGRlZm4tIGdldC1uYW1lc3BhY2VcbiAgXCJHZXRzIHRoZSBBU1QgZm9yIGEgZ2l2ZW4gbmFtZXNwYWNlLlwiXG4gIFtuc11cbiAgezpwcmUgWyhzeW1ib2w/IG5zKV19XG4gIChnZXQtaW4gQEBzdCBbOjphbmEvbmFtZXNwYWNlcyBuc10pKVxuXG5cbihkZWZuLSBnZXQtbWFjcm8tdmFyXG4gIFtlbnYgc3ltIG1hY3Jvcy1uc11cbiAgezpwcmUgWyhzeW1ib2w/IG1hY3Jvcy1ucyldfVxuICAod2hlbi1sZXQgW21hY3JvLXZhciAod2l0aC1jb21waWxlci1lbnYgQHN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzb2x2ZS12YXIgZW52IChzeW1ib2wgbWFjcm9zLW5zIChuYW1lIHN5bSkpKSldXG4gICAgKGFzc29jIG1hY3JvLXZhciA6bnMgbWFjcm9zLW5zKSkpXG5cblxuKGRlZm4tIGdldC1hZW52XG4gIFtdXG4gIChhc3NvYyAoYW5hL2VtcHR5LWVudilcbiAgICA6bnMgKGdldC1uYW1lc3BhY2UgQGN1cnJlbnQtbnMtZXZhbClcbiAgICA6Y29udGV4dCA6ZXhwcikpXG5cbihkZWZuLSBnZXQtdmFyXG4gIFtlbnYgc3ltXVxuICAoYmluZGluZyBbYW5hLypjbGpzLXdhcm5pbmctaGFuZGxlcnMqIG5pbF1cbiAgICAobGV0IFt2YXIgKG9yICh3aXRoLWNvbXBpbGVyLWVudiBAc3QgKHJlc29sdmUtdmFyIGVudiBzeW0pKVxuICAgICAgICAgICAgICAgICAgKHdoZW4tbGV0IFttYWNyb3MtbnMgKHN5bSAoZ2V0LWluIEBAc3QgWzo6YW5hL25hbWVzcGFjZXMgQGN1cnJlbnQtbnMtZXZhbCA6dXNlLW1hY3Jvc10pKV1cbiAgICAgICAgICAgICAgICAgICAgKGdldC1tYWNyby12YXIgZW52IHN5bSBtYWNyb3MtbnMpKSldXG4gICAgICAod2hlbiB2YXJcbiAgICAgICAgKC0+IChjb25kLT4gdmFyXG4gICAgICAgICAgICAgICAgICAgIChub3QgKDpucyB2YXIpKVxuICAgICAgICAgICAgICAgICAgICAoYXNzb2MgOm5zIChzeW1ib2wgKG5hbWVzcGFjZSAoOm5hbWUgdmFyKSkpKVxuICAgICAgICAgICAgICAgICAgICAoPSAobmFtZXNwYWNlICg6bmFtZSB2YXIpKSAoc3RyICg6bnMgdmFyKSkpXG4gICAgICAgICAgICAgICAgICAgICh1cGRhdGUgOm5hbWUgIyhzeW1ib2wgKG5hbWUgJSkpKSlcbiAgICAgICAgICAgICh1cGRhdGUgOm5zIChjb21wIHN5bWJvbCBkcm9wLW1hY3Jvcy1zdWZmaXggc3RyKSkpKSkpKVxuXG4oZGVmbiBkb2MqXG4gIFtuYW1lXVxuICAoaWYtbGV0IFtzcGVjaWFsLW5hbWUgKCd7JiAgICAgICBmblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgdHJ5fSBuYW1lKV1cbiAgICAoZG9jKiBzcGVjaWFsLW5hbWUpXG4gICAgKGNvbmRcblxuICAgICAgKHNwZWNpYWwtZG9jLW1hcCBuYW1lKVxuICAgICAgKHByaW50LWRvYyAoc3BlY2lhbC1kb2MgbmFtZSkpXG5cbiAgICAgIChyZXBsLXNwZWNpYWwtZG9jLW1hcCBuYW1lKVxuICAgICAgKHByaW50LWRvYyAocmVwbC1zcGVjaWFsLWRvYyBuYW1lKSlcblxuICAgICAgKHF1YWxpZmllZC1rZXl3b3JkPyBuYW1lKVxuICAgICAgKHByaW50LWRvYyB7OnNwZWMgbmFtZSA6ZG9jIChmb3JtYXQtc3BlYyAocy9nZXQtc3BlYyBuYW1lKSAzIChzeW1ib2wgKG5hbWVzcGFjZSBuYW1lKSkpfSlcblxuICAgICAgKGdldC1uYW1lc3BhY2UgbmFtZSlcbiAgICAgIChwcmludC1kb2NcbiAgICAgICAgKHNlbGVjdC1rZXlzIChnZXQtbmFtZXNwYWNlIG5hbWUpIFs6bmFtZSA6ZG9jXSkpXG5cbiAgICAgIChnZXQtdmFyIChnZXQtYWVudikgbmFtZSlcbiAgICAgIChwcmludC1kb2NcbiAgICAgICAgKGxldCBbdmFyIChnZXQtdmFyIChnZXQtYWVudikgbmFtZSlcbiAgICAgICAgICAgICAgdmFyIChhc3NvYyB2YXIgOmZvcm1zICgtPiB2YXIgOm1ldGEgOmZvcm1zIHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFyZ2xpc3RzICgtPiB2YXIgOm1ldGEgOmFyZ2xpc3RzIHNlY29uZCkpXG4gICAgICAgICAgICAgIG0gICAoc2VsZWN0LWtleXMgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzpucyA6bmFtZSA6ZG9jIDpmb3JtcyA6YXJnbGlzdHMgOm1hY3JvIDp1cmxdKVxuICAgICAgICAgICAgICBtICAgKHVwZGF0ZSBtIDpkb2MgdW5kby1yZWFkZXItY29uZGl0aW9uYWwtd2hpdGVzcGFjZS1kb2NzdHJpbmcpXVxuICAgICAgICAgIChjb25kLT4gKHVwZGF0ZS1pbiBtIFs6bmFtZV0gY2xqcy5jb3JlL25hbWUpXG4gICAgICAgICAgICAgICAgICAoOnByb3RvY29sLXN5bWJvbCB2YXIpXG4gICAgICAgICAgICAgICAgICAoYXNzb2MgOnByb3RvY29sIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICA6bWV0aG9kc1xuICAgICAgICAgICAgICAgICAgICAgICAgICgtPj4gKGdldC1pbiB2YXIgWzpwcm90b2NvbC1pbmZvIDptZXRob2RzXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXAgKGZuIFtbZm5hbWUgc2lnc11dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZuYW1lIHs6ZG9jICAgICAgKDpkb2NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnZXQtdmFyIChnZXQtYWVudilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzeW1ib2wgKHN0ciAoOm5zIHZhcikpIChzdHIgZm5hbWUpKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXJnbGlzdHMgKHNlcSBzaWdzKX1dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbnRvIHt9KSkpKSkpKSkpXG5cblxuKGRlZm4tIGNvbXBsZXRpb24tY2FuZGlkYXRlcy1mb3ItbnNcbiAgW25zLXN5bSBhbGxvdy1wcml2YXRlP11cbiAgKGlmIChzdHJpbmcvc3RhcnRzLXdpdGg/IChzdHIgbnMtc3ltKSBcImdvb2dcIilcbiAgICAoaWYgKGZpbmQtbnMgbnMtc3ltKVxuICAgICAgKGludG8gW10gKGpzLWtleXMgKC5nZXRPYmplY3RCeU5hbWUganMvZ29vZyAoc3RyIG5zLXN5bSkpKSlcbiAgICAgIFtdKVxuICAgIChtYXAgKGNvbXAgc3RyIGtleSlcbiAgICAgIChpbnRvIFtdXG4gICAgICAgIChjb21wXG4gICAgICAgICAgKGZpbHRlciAoaWYgYWxsb3ctcHJpdmF0ZT9cbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlcbiAgICAgICAgICAgICAgICAgICAgIyhub3QgKDpwcml2YXRlICh2YWwgJSkpKSkpXG4gICAgICAgICAgKHJlbW92ZSAjKDphbm9ueW1vdXMgKHZhbCAlKSkpKVxuICAgICAgICAoYXBwbHkgbWVyZ2VcbiAgICAgICAgICAoKGp1eHQgOmRlZnMgOm1hY3JvcylcbiAgICAgICAgICAgKGdldC1uYW1lc3BhY2UgbnMtc3ltKSkpKSkpKVxuXG4oZGVmbi0gY29tcGxldGlvbi1jYW5kaWRhdGVzLWZvci1jdXJyZW50LW5zIFtdXG4gIChsZXQgW2N1ci1ucyBAY3VycmVudC1ucy1ldmFsXVxuICAgIChpbnRvIChjb21wbGV0aW9uLWNhbmRpZGF0ZXMtZm9yLW5zIGN1ci1ucyB0cnVlKVxuICAgICAgKGNvbXAgKG1hcGNhdCBrZXlzKSAobWFwIHN0cikpXG4gICAgICAoKGp1eHQgOnJlbmFtZXMgOnJlbmFtZS1tYWNyb3MgOnVzZXMgOnVzZS1tYWNyb3MpIChnZXQtbmFtZXNwYWNlIGN1ci1ucykpKSkpXG5cbihkZWZuLSBpcy1jb21wbGV0aW9uP1xuICBbbWF0Y2gtc3VmZml4IGNhbmRpZGF0ZV1cbiAgKGxldCBbZXNjYXBlZC1zdWZmaXggKHN0cmluZy9yZXBsYWNlIG1hdGNoLXN1ZmZpeCAjXCJbLVxcL1xcXFxeJCorPy4oKXxcXFtcXF17fV1cIiBcIlxcXFwkJlwiKV1cbiAgICAocmUtZmluZCAoanMvUmVnRXhwLiAoc3RyIFwiXlwiIGVzY2FwZWQtc3VmZml4KSBcImlcIikgY2FuZGlkYXRlKSkpXG5cbihkZWYgXjpwcml2YXRlIGtleXdvcmQtY29tcGxldGlvbnNcbiAgWzpyZXF1aXJlIDpyZXF1aXJlLW1hY3JvcyA6aW1wb3J0XG4gICA6cmVmZXIgOnJlZmVyLW1hY3JvcyA6aW5jbHVkZS1tYWNyb3NcbiAgIDpyZWZlci1jbG9qdXJlIDpleGNsdWRlXG4gICA6a2V5cyA6c3RycyA6c3ltc1xuICAgOmFzIDpvclxuICAgOnByZSA6cG9zdFxuICAgOmxldCA6d2hlbiA6d2hpbGVcbiAgIDpjbGogOmNsanNcbiAgIDpkZWZhdWx0XG4gICA6ZWxzZVxuICAgOmdlbi1jbGFzc1xuICAgOmtleXdvcmRpemUta2V5c1xuICAgOnJlcSA6cmVxLXVuIDpvcHQgOm9wdC11blxuICAgOmFyZ3MgOnJldCA6Zm5dKVxuXG4oZGVmIF46cHJpdmF0ZSBuYW1lc3BhY2UtY29tcGxldGlvbi1leGNsdXNpb25zXG4gICdbcGxhbmNrLmZyb20uaW8uYXZpc28uYW5zaVxuICAgIHBsYW5jay5wcHJpbnQuY29kZVxuICAgIHBsYW5jay5wcHJpbnQuZGF0YVxuICAgIHBsYW5jay5idW5kbGVcbiAgICBwbGFuY2suY2xvc3VyZVxuICAgIHBsYW5jay5qcy1kZXBzXG4gICAgcGxhbmNrLnJlcGxcbiAgICBwbGFuY2sucmVwbC1yZXNvdXJjZXNcbiAgICBwbGFuY2sudGhlbWVzXG4gICAgY2xvanVyZS5jb3JlLnJyYi12ZWN0b3JcbiAgICBjbG9qdXJlLmNvcmUucnJiLXZlY3Rvci5pbnRlcm9wXG4gICAgY2xvanVyZS5jb3JlLnJyYi12ZWN0b3Iubm9kZXNcbiAgICBjbG9qdXJlLmNvcmUucnJiLXZlY3Rvci5wcm90b2NvbHNcbiAgICBjbG9qdXJlLmNvcmUucnJiLXZlY3Rvci5ycmJ0XG4gICAgY2xvanVyZS5jb3JlLnJyYi12ZWN0b3IudHJhbnNpZW50c1xuICAgIGNsb2p1cmUuY29yZS5ycmItdmVjdG9yLnRyZWVzXG4gICAgY29nbml0ZWN0LnRyYW5zaXRcbiAgICBmaXBwLmRlcXVlXG4gICAgZmlwcC5lbmdpbmVcbiAgICBmaXBwLnZpc2l0XG4gICAgbGF6eS1tYXAuY29yZVxuICAgIGNsanMuc291cmNlLW1hcFxuICAgIGNsanMuc291cmNlLW1hcC5iYXNlNjRcbiAgICBjbGpzLnNvdXJjZS1tYXAuYmFzZTY0LXZscVxuICAgIGNsanMudG9vbHMucmVhZGVyLmltcGwuY29tbW9uc1xuICAgIGNsanMudG9vbHMucmVhZGVyLmltcGwudXRpbHNcbiAgICBjbGpzLnN0YWNrdHJhY2VdKVxuXG4oZGVmIF46cHJpdmF0ZSBuYW1lc3BhY2UtY29tcGxldGlvbi1hZGRpdG9uc1xuICAnW2Nsb2p1cmUuY29yZVxuICAgIGNsb2p1cmUudGVzdFxuICAgIGNsb2p1cmUuc3BlYy5hbHBoYVxuICAgIGNsb2p1cmUuc3BlYy50ZXN0LmFscGhhXG4gICAgY2xvanVyZS5zcGVjLmdlbi5hbHBoYVxuICAgIGNsb2p1cmUucHByaW50XSlcblxuKGRlZm4tIGFsbC1uc1xuICBcIlJldHVybnMgYSBzZXF1ZW5jZSBvZiBhbGwgbmFtZXNwYWNlcy5cIlxuICBbXVxuICAoa2V5cyAoOjphbmEvbmFtZXNwYWNlcyBAQHN0KSkpXG5cbihkZWZuIGN1cnJlbnQtYWxpYXMtbWFwXG4gIChbXSAoY3VycmVudC1hbGlhcy1tYXAgQGN1cnJlbnQtbnMtZXZhbCBAc3QpKVxuICAoW25zIHN0YXRlXVxuICAgKC0+PiAobWVyZ2UgKGdldC1pbiBAc3RhdGUgWzo6YW5hL25hbWVzcGFjZXMgbnMgOnJlcXVpcmVzXSlcbiAgICAgICAgICAgICAgIChnZXQtaW4gQHN0YXRlIFs6OmFuYS9uYW1lc3BhY2VzIG5zIDpyZXF1aXJlLW1hY3Jvc10pKVxuICAgICAgICAocmVtb3ZlIChmbiBbW2sgdl1dICg9IGsgdikpKVxuICAgICAgICAoaW50byB7fSkpKSlcblxuKGRlZm4tIG5hbWVzcGFjZS1jb21wbGV0aW9uc1xuICBbXVxuICAoLT4+IChhbGwtbnMpXG4gICAgKG1hcCAjKGRyb3AtbWFjcm9zLXN1ZmZpeCAoc3RyICUpKSlcbiAgICAocmVtb3ZlIChpbnRvICN7fSAobWFwIHN0ciBuYW1lc3BhY2UtY29tcGxldGlvbi1leGNsdXNpb25zKSkpXG4gICAgKGNvbmNhdCAobWFwIHN0ciBuYW1lc3BhY2UtY29tcGxldGlvbi1hZGRpdG9ucykpXG4gICAgc29ydFxuICAgIGRpc3RpbmN0KSlcblxuKGRlZm4tIGV4cGFuZC10eXBlZC1uc1xuICBcIkV4cGFuZCB0aGUgdHlwZWQgbmFtZXNwYWNlIHN5bWJvbCB0byBhIGtub3duIG5hbWVzcGFjZSwgY29uc3VsdGluZyBjdXJyZW50XG4gIG5hbWVzcGFjZSBhbGlhc2VzIGlmIG5lY2Vzc2FyeS5cIlxuICBbYWxpYXNdXG4gIChsZXQgW2FsaWFzIChpZiAoc3ltYm9sLWlkZW50aWNhbD8gYWxpYXMgJ2Nsb2p1cmUuY29yZSlcbiAgICAgICAgICAgICAgICAnY2xqcy5jb3JlXG4gICAgICAgICAgICAgICAgYWxpYXMpXVxuICAgIChvciAoZ2V0LWluIHN0IFs6Y2xqcy5hbmFseXplci9uYW1lc3BhY2VzIGFsaWFzIDpuYW1lXSlcbiAgICAgICAgKGFsaWFzIChjdXJyZW50LWFsaWFzLW1hcCkpXG4gICAgICAgIGFsaWFzKSkpXG5cblxuKGRlZm4tIGNvbXBsZXRpb24tY2FuZGlkYXRlc1xuICBbdG9wLWZvcm0/IHR5cGVkLW5zXVxuICAoc2V0IChpZiB0eXBlZC1uc1xuICAgICAgICAgKGxldCBbZXhwYW5kZWQtbnMgKGV4cGFuZC10eXBlZC1ucyAoc3ltYm9sIHR5cGVkLW5zKSldXG4gICAgICAgICAgIChjb25jYXRcbiAgICAgICAgICAgICAoY29tcGxldGlvbi1jYW5kaWRhdGVzLWZvci1ucyBleHBhbmRlZC1ucyBmYWxzZSlcbiAgICAgICAgICAgICAoY29tcGxldGlvbi1jYW5kaWRhdGVzLWZvci1ucyAoYWRkLW1hY3Jvcy1zdWZmaXggZXhwYW5kZWQtbnMpIGZhbHNlKSkpXG4gICAgICAgICAoY29uY2F0XG4gICAgICAgICAgIChtYXAgc3RyIGtleXdvcmQtY29tcGxldGlvbnMpXG4gICAgICAgICAgIChuYW1lc3BhY2UtY29tcGxldGlvbnMpXG4gICAgICAgICAgIChtYXAgIyhzdHIgJSBcIi9cIikgKGtleXMgKGN1cnJlbnQtYWxpYXMtbWFwKSkpXG4gICAgICAgICAgIChjb21wbGV0aW9uLWNhbmRpZGF0ZXMtZm9yLW5zICdjbGpzLmNvcmUgZmFsc2UpXG4gICAgICAgICAgIChjb21wbGV0aW9uLWNhbmRpZGF0ZXMtZm9yLW5zICdjbGpzLmNvcmUkbWFjcm9zIGZhbHNlKVxuICAgICAgICAgICAoY29tcGxldGlvbi1jYW5kaWRhdGVzLWZvci1jdXJyZW50LW5zKVxuICAgICAgICAgICAod2hlbiB0b3AtZm9ybT9cbiAgICAgICAgICAgICAoY29uY2F0XG4gICAgICAgICAgICAgICAobWFwIHN0ciAoa2V5cyBzcGVjaWFsLWRvYy1tYXApKVxuICAgICAgICAgICAgICAgKG1hcCBzdHIgKGtleXMgcmVwbC1zcGVjaWFsLWRvYy1tYXApKSkpKSkpKVxuXG4oZGVmbi0gbG9uZ2VzdC1jb21tb24tcHJlZml4XG4gIFtzdHJpbmdzXVxuICAobGV0IFttaW5sIChhcHBseSBtaW4gKG1hcCBjb3VudCBzdHJpbmdzKSldXG4gICAgKGxvb3AgW2wgbWlubF1cbiAgICAgIChpZiAoPiBsIDApXG4gICAgICAgIChpZiAoZXZlcnk/ICN7KHN1YnMgKGZpcnN0IHN0cmluZ3MpIDAgbCl9XG4gICAgICAgICAgICAgIChtYXAgIyhzdWJzICUgMCBsKSAocmVzdCBzdHJpbmdzKSkpXG4gICAgICAgICAgKHN1YnMgKGZpcnN0IHN0cmluZ3MpIDAgbClcbiAgICAgICAgICAocmVjdXIgKGRlYyBsKSkpXG4gICAgICAgIFwiXCIpKSkpXG5cbihkZWZuLSBzcGVjLXJlZ2lzdGVyZWQta2V5d29yZHNcbiAgW25zXVxuICAoZWR1Y3Rpb25cbiAgICAoZmlsdGVyIGtleXdvcmQ/KVxuICAgIChmaWx0ZXIgIyg9IChzdHIgbnMpIChuYW1lc3BhY2UgJSkpKVxuICAgIChrZXlzIChzL3JlZ2lzdHJ5KSkpKVxuXG4oZGVmbi0gbG9jYWwta2V5d29yZC1zdHJcbiAgW2t3XVxuICAoc3RyIFwiOjpcIiAobmFtZSBrdykpKVxuXG4oZGVmbi0gbG9jYWwta2V5d29yZFxuICBcIlJldHVybnMgZm9vIGZvciA6OmZvbywgb3RoZXJ3aXNlIG5pbFwiXG4gIFtidWZmZXJdXG4gIChzZWNvbmQgKHJlLWZpbmQgI1wiOjooW2EtekEtWi1dKikkXCIgYnVmZmVyKSkpXG5cbihkZWZuLSBsb2NhbC1rZXl3b3JkLWNvbXBsZXRpb25zXG4gIFtrdy1uYW1lXVxuICAobGV0IFtrdy1zb3VyY2UgKHN0ciBcIjo6XCIga3ctbmFtZSldXG4gICAgKGNsai0+anMgKGludG8gW2t3LXNvdXJjZV1cbiAgICAgICAgICAgICAgIChzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAoY29tcFxuICAgICAgICAgICAgICAgICAgIChtYXAgbG9jYWwta2V5d29yZC1zdHIpXG4gICAgICAgICAgICAgICAgICAgKGZpbHRlciAjKHN0cmluZy9zdGFydHMtd2l0aD8gJSBrdy1zb3VyY2UpKSlcbiAgICAgICAgICAgICAgICAgKHNwZWMtcmVnaXN0ZXJlZC1rZXl3b3JkcyBAY3VycmVudC1ucy1ldmFsKSkpKSkpXG5cbihkZWZuIGdldC1jb21wbGV0aW9uc1xuICBcIlJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGJ1ZmZlci1tYXRjaC1zdWZmaXgsIGFsb25nIHdpdGggY29tcGxldGlvbnMgZm9yIHRoZVxuICBlbnRlcmVkIHRleHQuIElmIG9uZSBjb21wbGV0aW9uIGlzIHJldHVybmVkIHRoZSBsaW5lIHNob3VsZCBiZSBjb21wbGV0ZWQgdG9cbiAgbWF0Y2ggaXQgKGluIHdoaWNoIHRoZSBjb21wbGV0aW9uIG1heSBhY3R1YWxseSBvbmx5IGJlIGEgbG9uZ2VzdCBwcmVmaXggZnJvbVxuICB0aGUgbGlzdCBvZiBjYW5kaWF0ZXMpLCBvdGhlcndpc2UgdGhlIGxpc3Qgb2YgY29tcGxldGlvbnMgc2hvdWxkIGJlXG4gIGRpc3BsYXllZC5cIlxuICBbYnVmZmVyXVxuICAoaWYgKG5pbD8gQHN0KVxuICAgICh3aXRoLW1ldGEgW2J1ZmZlcl0gezpyZWFkeSBmYWxzZX0pXG4gICAgKGlmLWxldCBba3ctbmFtZSAobG9jYWwta2V5d29yZCBidWZmZXIpXVxuICAgICAgKGxvY2FsLWtleXdvcmQtY29tcGxldGlvbnMga3ctbmFtZSlcbiAgICAgIChsZXQgW3RvcC1mb3JtPyAocmUtZmluZCAjXCJeXFxzKlxcKFxccypbXigpXFxzXSokXCIgYnVmZmVyKVxuICAgICAgICAgICAgdHlwZWQtbnMgIChzZWNvbmQgKHJlLWZpbmQgI1wiXFwoKihcXGJbYS16QS1aMC05LS48Pio9Jj9dKykvW2EtekEtWjAtOS1dKiRcIiBidWZmZXIpKV1cbiAgICAgICAgKGxldCBbYnVmZmVyLW1hdGNoLXN1ZmZpeCAoZmlyc3QgKHJlLWZpbmQgI1wiOj8oW2EtekEtWjAtOS0uPD4qPSY/XSp8XlxcKC8pJFwiIGJ1ZmZlcikpXG4gICAgICAgICAgICAgIGNvbXBsZXRpb25zICAgICAgICAgKHNvcnQgKGZpbHRlciAocGFydGlhbCBpcy1jb21wbGV0aW9uPyBidWZmZXItbWF0Y2gtc3VmZml4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbXBsZXRpb24tY2FuZGlkYXRlcyB0b3AtZm9ybT8gdHlwZWQtbnMpKSlcbiAgICAgICAgICAgICAgY29tbW9uLXByZWZpeCAobG9uZ2VzdC1jb21tb24tcHJlZml4IGNvbXBsZXRpb25zKV1cbiAgICAgICAgICAod2l0aC1tZXRhXG4gICAgICAgICAgICAoaWYgKG9yIChlbXB0eT8gY29tbW9uLXByZWZpeClcbiAgICAgICAgICAgICAgICAgICAgKD0gY29tbW9uLXByZWZpeCBidWZmZXItbWF0Y2gtc3VmZml4KSlcbiAgICAgICAgICAgICAgKGludG8gW2J1ZmZlci1tYXRjaC1zdWZmaXhdIGNvbXBsZXRpb25zKVxuICAgICAgICAgICAgICBbYnVmZmVyLW1hdGNoLXN1ZmZpeCBjb21tb24tcHJlZml4XSlcbiAgICAgICAgICAgIHs6cmVhZHkgdHJ1ZX0pKSkpKSlcbiJdfQ==