// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
cljs.compiler.ns_first_segments = (function cljs$compiler$ns_first_segments(){
var get_first_ns_segment = (function cljs$compiler$ns_first_segments_$_get_first_ns_segment(ns){
return cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2([cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)].join(''),/\./));
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(get_first_ns_segment,cljs.core.keys(new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__19619 = s;
var map__19619__$1 = ((((!((map__19619 == null)))?((((map__19619.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19619.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19619):map__19619);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19619__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19619__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__19622 = info;
var map__19623 = G__19622;
var map__19623__$1 = ((((!((map__19623 == null)))?((((map__19623.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19623.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19623):map__19623);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19623__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__19622__$1 = G__19622;
while(true){
var d__$2 = d__$1;
var map__19625 = G__19622__$1;
var map__19625__$1 = ((((!((map__19625 == null)))?((((map__19625.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19625.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19625):map__19625);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19625__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__19650 = (d__$2 + (1));
var G__19651 = shadow__$1;
d__$1 = G__19650;
G__19622__$1 = G__19651;
continue;
} else {
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('')]),cljs.compiler.ns_first_segments()))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s).cljs$core$IHash$_hash$arity$1(null),cljs.compiler.shadow_depth(s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__19652){
var map__19658 = p__19652;
var map__19658__$1 = ((((!((map__19658 == null)))?((((map__19658.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19658.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19658):map__19658);
var name_var = map__19658__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19658__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19658__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),"..","_DOT__DOT_");
var map__19660 = info;
var map__19660__$1 = ((((!((map__19660 == null)))?((((map__19660.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19660.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19660):map__19660);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19660__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19660__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__19662 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace([cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)].join(''),".","$")),cljs.core.str.cljs$core$IFn$_invoke$arity$1("$"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__19662) : cljs.compiler.munge.call(null,G__19662));
})());
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if(!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(reserved,s) == null))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),cljs.core.str.cljs$core$IFn$_invoke$arity$1("$")].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var args19663 = [];
var len__10660__auto___19675 = arguments.length;
var i__10661__auto___19676 = (0);
while(true){
if((i__10661__auto___19676 < len__10660__auto___19675)){
args19663.push((arguments[i__10661__auto___19676]));

var G__19677 = (i__10661__auto___19676 + (1));
i__10661__auto___19676 = G__19677;
continue;
} else {
}
break;
}

var G__19674 = args19663.length;
switch (G__19674) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args19663.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_(s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if(!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null))){
return cljs.compiler.fn_self_name(s);
} else {
var depth = cljs.compiler.shadow_depth(s);
var code = cljs.compiler.hash_scope(s);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1("self__."),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):((!((renamed == null)))?renamed:name
));
var munged_name = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(name__$1,reserved);
if((field === true) || ((depth === (0)))){
return munged_name;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__$"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace([cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)].join(''),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace(ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved(reserved);
var ss__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(rf,clojure.string.split.cljs$core$IFn$_invoke$arity$2(ss__$1,/\./));
var ss__$3 = clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",ss__$2);
var ms = cljs.core.munge_str(ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__19682 = cp;
switch (G__19682) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if((((31) < cp)) && ((cp < (127)))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.cljs$core$IFn$_invoke$arity$2("0000",unpadded.length);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("\\u"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad),cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__19688_19692 = cljs.core.seq(s);
var chunk__19689_19693 = null;
var count__19690_19694 = (0);
var i__19691_19695 = (0);
while(true){
if((i__19691_19695 < count__19690_19694)){
var c_19696 = chunk__19689_19693.cljs$core$IIndexed$_nth$arity$2(null,i__19691_19695);
sb.append(cljs.compiler.escape_char(c_19696));

var G__19697 = seq__19688_19692;
var G__19698 = chunk__19689_19693;
var G__19699 = count__19690_19694;
var G__19700 = (i__19691_19695 + (1));
seq__19688_19692 = G__19697;
chunk__19689_19693 = G__19698;
count__19690_19694 = G__19699;
i__19691_19695 = G__19700;
continue;
} else {
var temp__6738__auto___19701 = cljs.core.seq(seq__19688_19692);
if(temp__6738__auto___19701){
var seq__19688_19702__$1 = temp__6738__auto___19701;
if(cljs.core.chunked_seq_QMARK_(seq__19688_19702__$1)){
var c__10350__auto___19703 = cljs.core.chunk_first(seq__19688_19702__$1);
var G__19704 = cljs.core.chunk_rest(seq__19688_19702__$1);
var G__19705 = c__10350__auto___19703;
var G__19706 = cljs.core.count(c__10350__auto___19703);
var G__19707 = (0);
seq__19688_19692 = G__19704;
chunk__19689_19693 = G__19705;
count__19690_19694 = G__19706;
i__19691_19695 = G__19707;
continue;
} else {
var c_19708 = cljs.core.first(seq__19688_19702__$1);
sb.append(cljs.compiler.escape_char(c_19708));

var G__19734 = cljs.core.next(seq__19688_19702__$1);
var G__19735 = null;
var G__19736 = (0);
var G__19737 = (0);
seq__19688_19692 = G__19734;
chunk__19689_19693 = G__19735;
count__19690_19694 = G__19736;
i__19691_19695 = G__19737;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("\""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join('');
});
if(typeof cljs.compiler.emit_STAR_ !== 'undefined'){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__10470__auto__ = (function (){var G__19738 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19738) : cljs.core.atom.call(null,G__19738));
})();
var prefer_table__10471__auto__ = (function (){var G__19739 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19739) : cljs.core.atom.call(null,G__19739));
})();
var method_cache__10472__auto__ = (function (){var G__19740 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19740) : cljs.core.atom.call(null,G__19740));
})();
var cached_hierarchy__10473__auto__ = (function (){var G__19741 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19741) : cljs.core.atom.call(null,G__19741));
})();
var hierarchy__10474__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__10474__auto__,method_table__10470__auto__,prefer_table__10471__auto__,method_cache__10472__auto__,cached_hierarchy__10473__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__17453__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__17453__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__19751_19760 = ast;
var map__19751_19761__$1 = ((((!((map__19751_19760 == null)))?((((map__19751_19760.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19751_19760.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19751_19760):map__19751_19760);
var env_19762 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19751_19761__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_19762))){
var map__19753_19769 = env_19762;
var map__19753_19770__$1 = ((((!((map__19753_19769 == null)))?((((map__19753_19769.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19753_19769.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19753_19769):map__19753_19769);
var line_19771 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19753_19770__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_19772 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19753_19770__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,((function (map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__){
return (function (m){
var minfo = (function (){var G__19755 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"var","var",-769682797))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19755,new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast)))].join(''));
} else {
return G__19755;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_19771 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__){
return (function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_19772)?(column_19772 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__){
return (function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
});})(minfo,map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__))
,cljs.core.sorted_map()));
});})(map__19753_19769,map__19753_19770__$1,line_19771,column_19772,map__19751_19760,map__19751_19761__$1,env_19762,val__17453__auto__))
);
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_.call(null,ast));
}finally {if((val__17453__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__10667__auto__ = [];
var len__10660__auto___19836 = arguments.length;
var i__10661__auto___19837 = (0);
while(true){
if((i__10661__auto___19837 < len__10660__auto___19836)){
args__10667__auto__.push((arguments[i__10661__auto___19837]));

var G__19838 = (i__10661__auto___19837 + (1));
i__10661__auto___19837 = G__19838;
continue;
} else {
}
break;
}

var argseq__10668__auto__ = ((((0) < args__10667__auto__.length))?(new cljs.core.IndexedSeq(args__10667__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__10668__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__19817_19839 = cljs.core.seq(xs);
var chunk__19818_19840 = null;
var count__19819_19841 = (0);
var i__19820_19842 = (0);
while(true){
if((i__19820_19842 < count__19819_19841)){
var x_19843 = chunk__19818_19840.cljs$core$IIndexed$_nth$arity$2(null,i__19820_19842);
if((x_19843 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_19843)){
cljs.compiler.emit(x_19843);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_19843)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_19843);
} else {
if(goog.isFunction(x_19843)){
(x_19843.cljs$core$IFn$_invoke$arity$0 ? x_19843.cljs$core$IFn$_invoke$arity$0() : x_19843.call(null));
} else {
var s_19856 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_19843], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__19817_19839,chunk__19818_19840,count__19819_19841,i__19820_19842,s_19856,x_19843){
return (function (p1__19812_SHARP_){
return (p1__19812_SHARP_ + cljs.core.count(s_19856));
});})(seq__19817_19839,chunk__19818_19840,count__19819_19841,i__19820_19842,s_19856,x_19843))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_19856], 0));

}
}
}
}

var G__19857 = seq__19817_19839;
var G__19858 = chunk__19818_19840;
var G__19859 = count__19819_19841;
var G__19860 = (i__19820_19842 + (1));
seq__19817_19839 = G__19857;
chunk__19818_19840 = G__19858;
count__19819_19841 = G__19859;
i__19820_19842 = G__19860;
continue;
} else {
var temp__6738__auto___19861 = cljs.core.seq(seq__19817_19839);
if(temp__6738__auto___19861){
var seq__19817_19863__$1 = temp__6738__auto___19861;
if(cljs.core.chunked_seq_QMARK_(seq__19817_19863__$1)){
var c__10350__auto___19864 = cljs.core.chunk_first(seq__19817_19863__$1);
var G__19865 = cljs.core.chunk_rest(seq__19817_19863__$1);
var G__19866 = c__10350__auto___19864;
var G__19867 = cljs.core.count(c__10350__auto___19864);
var G__19868 = (0);
seq__19817_19839 = G__19865;
chunk__19818_19840 = G__19866;
count__19819_19841 = G__19867;
i__19820_19842 = G__19868;
continue;
} else {
var x_19870 = cljs.core.first(seq__19817_19863__$1);
if((x_19870 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_19870)){
cljs.compiler.emit(x_19870);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_19870)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_19870);
} else {
if(goog.isFunction(x_19870)){
(x_19870.cljs$core$IFn$_invoke$arity$0 ? x_19870.cljs$core$IFn$_invoke$arity$0() : x_19870.call(null));
} else {
var s_19872 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_19870], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__19817_19839,chunk__19818_19840,count__19819_19841,i__19820_19842,s_19872,x_19870,seq__19817_19863__$1,temp__6738__auto___19861){
return (function (p1__19812_SHARP_){
return (p1__19812_SHARP_ + cljs.core.count(s_19872));
});})(seq__19817_19839,chunk__19818_19840,count__19819_19841,i__19820_19842,s_19872,x_19870,seq__19817_19863__$1,temp__6738__auto___19861))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_19872], 0));

}
}
}
}

var G__19880 = cljs.core.next(seq__19817_19863__$1);
var G__19881 = null;
var G__19882 = (0);
var G__19883 = (0);
seq__19817_19839 = G__19880;
chunk__19818_19840 = G__19881;
count__19819_19841 = G__19882;
i__19820_19842 = G__19883;
continue;
}
} else {
}
}
break;
}

return null;
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (0);

cljs.compiler.emits.cljs$lang$applyTo = (function (seq19813){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19813));
});

cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__10667__auto__ = [];
var len__10660__auto___19888 = arguments.length;
var i__10661__auto___19889 = (0);
while(true){
if((i__10661__auto___19889 < len__10660__auto___19888)){
args__10667__auto__.push((arguments[i__10661__auto___19889]));

var G__19890 = (i__10661__auto___19889 + (1));
i__10661__auto___19889 = G__19890;
continue;
} else {
}
break;
}

var argseq__10668__auto__ = ((((0) < args__10667__auto__.length))?(new cljs.core.IndexedSeq(args__10667__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__10668__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,xs);

cljs.core.println();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__19885){
var map__19886 = p__19885;
var map__19886__$1 = ((((!((map__19886 == null)))?((((map__19886.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19886.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19886):map__19886);
var m = map__19886__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19886__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),cljs.core.array_seq([new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0)], 0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq19884){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19884));
});

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__10531__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19893_19895 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19894_19896 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19893_19895,_STAR_print_fn_STAR_19894_19896,sb__10531__auto__){
return (function (x__10532__auto__){
return sb__10531__auto__.append(x__10532__auto__);
});})(_STAR_print_newline_STAR_19893_19895,_STAR_print_fn_STAR_19894_19896,sb__10531__auto__))
;

try{cljs.compiler.emit(expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19894_19896;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19893_19895;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__10531__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__10470__auto__ = (function (){var G__19897 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19897) : cljs.core.atom.call(null,G__19897));
})();
var prefer_table__10471__auto__ = (function (){var G__19898 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19898) : cljs.core.atom.call(null,G__19898));
})();
var method_cache__10472__auto__ = (function (){var G__19899 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19899) : cljs.core.atom.call(null,G__19899));
})();
var cached_hierarchy__10473__auto__ = (function (){var G__19900 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19900) : cljs.core.atom.call(null,G__19900));
})();
var hierarchy__10474__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__10474__auto__,method_table__10470__auto__,prefer_table__10471__auto__,method_cache__10472__auto__,cached_hierarchy__10473__auto__));
})();
}
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str.cljs$core$IFn$_invoke$arity$1("failed compiling constant: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),cljs.core.str.cljs$core$IFn$_invoke$arity$1("; "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(x)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" is not a valid ClojureScript constant.")].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x)], null));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["null"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Number,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",x,")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,String,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.wrap_in_double_quotes(cljs.compiler.escape_string(x))], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Boolean,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(x)?"true":"false")], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,RegExp,(function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)].join(''))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new RegExp(\"\"))"], 0));
} else {
var vec__19915 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)].join(''));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19915,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19915,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19915,(2),null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pattern], 0));
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace(kw);
var name = cljs.core.name(kw);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Keyword("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19933_19935 = (cljs.core.truth_(ns)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1("/"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):name);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19933_19935) : cljs.compiler.emit_constant.call(null,G__19933_19935));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19934_19948 = cljs.core.hash(kw);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19934_19948) : cljs.compiler.emit_constant.call(null,G__19934_19948));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace(sym);
var name = cljs.core.name(sym);
var symstr = ((!((ns == null)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1("/"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):name);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Symbol("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(symstr) : cljs.compiler.emit_constant.call(null,symstr));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19950_19962 = cljs.core.hash(sym);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19950_19962) : cljs.compiler.emit_constant.call(null,G__19950_19962));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(null) : cljs.compiler.emit_constant.call(null,null));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__19963 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__19963) : x.call(null,G__19963));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__19976 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__19976) : x.call(null,G__19976));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_symbol(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Date,(function (date){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new Date(",date.getTime(),")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash(uuid_str),")"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"var","var",-769682797),(function (p__19985){
var map__19986 = p__19985;
var map__19986__$1 = ((((!((map__19986 == null)))?((((map__19986.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19986.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19986):map__19986);
var arg = map__19986__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19986__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19986__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19986__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name(var_name)], null));
var or__9439__auto__ = js_module_name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core.name(var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(arg))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(arg)], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__19994 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__19994);
} else {
return G__19994;
}
})()], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"var-special","var-special",1131576802),(function (p__19995){
var map__19996 = p__19995;
var map__19996__$1 = ((((!((map__19996 == null)))?((((map__19996.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19996.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19996):map__19996);
var arg = map__19996__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19996__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19996__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19996__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19996__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__19998 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__19998__$1 = ((((!((map__19998 == null)))?((((map__19998.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19998.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19998):map__19998);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19998__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"meta","meta",1499536964),(function (p__20004){
var map__20005 = p__20004;
var map__20005__$1 = ((((!((map__20005 == null)))?((((map__20005.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20005.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20005):map__20005);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20005__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20005__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20005__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.with_meta(",expr,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_((function (p1__20007_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__20007_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),keys)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count(keys)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__20008){
var map__20009 = p__20008;
var map__20009__$1 = ((((!((map__20009 == null)))?((((map__20009.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20009.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20009):map__20009);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20009__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20009__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20009__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if((cljs.core.count(keys) === (0))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.EMPTY"], 0));
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(cljs.compiler.distinct_keys_QMARK_(keys))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.createAsIfByAssoc([",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"])"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep(keys),"],[",cljs.compiler.comma_sep(vals),"])"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"list","list",765357683),(function (p__20011){
var map__20012 = p__20011;
var map__20012__$1 = ((((!((map__20012 == null)))?((((map__20012.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20012.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20012):map__20012);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20012__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20012__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.List.EMPTY"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.list(",cljs.compiler.comma_sep(items),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__20014){
var map__20015 = p__20014;
var map__20015__$1 = ((((!((map__20015 == null)))?((((map__20015.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20015.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20015):map__20015);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20015__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20015__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.EMPTY"], 0));
} else {
var cnt_20017 = cljs.core.count(items);
if((cnt_20017 < (32))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentVector(null, ",cnt_20017,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep(items),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_((function (p1__20018_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__20018_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),items)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count(items)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set","set",304602554),(function (p__20019){
var map__20020 = p__20019;
var map__20020__$1 = ((((!((map__20020 == null)))?((((map__20020.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20020.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20020):map__20020);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20020__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20020__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.EMPTY"], 0));
} else {
if(cljs.core.truth_(cljs.compiler.distinct_constants_QMARK_(items))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"))),"], null), null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.createAsIfByAssoc([",cljs.compiler.comma_sep(items),"])"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js-value","js-value",-758336661),(function (p__20022){
var map__20023 = p__20022;
var map__20023__$1 = ((((!((map__20023 == null)))?((((map__20023.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20023.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20023):map__20023);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20023__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var js_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20023__$1,new cljs.core.Keyword(null,"js-type","js-type",539386702));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20023__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(js_type,new cljs.core.Keyword(null,"object","object",1474613949))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["({"], 0));

var temp__6738__auto___20041 = cljs.core.seq(items);
if(temp__6738__auto___20041){
var items_20042__$1 = temp__6738__auto___20041;
var vec__20025_20043 = items_20042__$1;
var seq__20026_20044 = cljs.core.seq(vec__20025_20043);
var first__20027_20045 = cljs.core.first(seq__20026_20044);
var seq__20026_20046__$1 = cljs.core.next(seq__20026_20044);
var vec__20028_20047 = first__20027_20045;
var k_20048 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20028_20047,(0),null);
var v_20049 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20028_20047,(1),null);
var r_20050 = seq__20026_20046__$1;
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\"",cljs.core.name(k_20048),"\": ",v_20049], 0));

var seq__20031_20051 = cljs.core.seq(r_20050);
var chunk__20032_20052 = null;
var count__20033_20053 = (0);
var i__20034_20054 = (0);
while(true){
if((i__20034_20054 < count__20033_20053)){
var vec__20035_20055 = chunk__20032_20052.cljs$core$IIndexed$_nth$arity$2(null,i__20034_20054);
var k_20056__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20035_20055,(0),null);
var v_20057__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20035_20055,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_20056__$1),"\": ",v_20057__$1], 0));

var G__20058 = seq__20031_20051;
var G__20059 = chunk__20032_20052;
var G__20060 = count__20033_20053;
var G__20061 = (i__20034_20054 + (1));
seq__20031_20051 = G__20058;
chunk__20032_20052 = G__20059;
count__20033_20053 = G__20060;
i__20034_20054 = G__20061;
continue;
} else {
var temp__6738__auto___20062__$1 = cljs.core.seq(seq__20031_20051);
if(temp__6738__auto___20062__$1){
var seq__20031_20063__$1 = temp__6738__auto___20062__$1;
if(cljs.core.chunked_seq_QMARK_(seq__20031_20063__$1)){
var c__10350__auto___20064 = cljs.core.chunk_first(seq__20031_20063__$1);
var G__20065 = cljs.core.chunk_rest(seq__20031_20063__$1);
var G__20066 = c__10350__auto___20064;
var G__20067 = cljs.core.count(c__10350__auto___20064);
var G__20068 = (0);
seq__20031_20051 = G__20065;
chunk__20032_20052 = G__20066;
count__20033_20053 = G__20067;
i__20034_20054 = G__20068;
continue;
} else {
var vec__20038_20069 = cljs.core.first(seq__20031_20063__$1);
var k_20070__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20038_20069,(0),null);
var v_20071__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20038_20069,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_20070__$1),"\": ",v_20071__$1], 0));

var G__20072 = cljs.core.next(seq__20031_20063__$1);
var G__20073 = null;
var G__20074 = (0);
var G__20075 = (0);
seq__20031_20051 = G__20072;
chunk__20032_20052 = G__20073;
count__20033_20053 = G__20074;
i__20034_20054 = G__20075;
continue;
}
} else {
}
}
break;
}
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["[",cljs.compiler.comma_sep(items),"]"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"constant","constant",-379609303),(function (p__20076){
var map__20077 = p__20076;
var map__20077__$1 = ((((!((map__20077 == null)))?((((map__20077.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20077.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20077):map__20077);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20077__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20077__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(form) : cljs.compiler.emit_constant.call(null,form));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__20079){
var map__20082 = p__20079;
var map__20082__$1 = ((((!((map__20082 == null)))?((((map__20082.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20082.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20082):map__20082);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20082__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20082__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var and__9427__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"constant","constant",-379609303));
if(and__9427__auto__){
var and__9427__auto____$1 = form;
if(cljs.core.truth_(and__9427__auto____$1)){
return !(((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,""))) || ((typeof form === 'number') && ((form === (0)))));
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__20084){
var map__20087 = p__20084;
var map__20087__$1 = ((((!((map__20087 == null)))?((((map__20087.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20087.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20087):map__20087);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20087__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20087__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((form === false) || ((form == null)));
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__9439__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__20089){
var map__20090 = p__20089;
var map__20090__$1 = ((((!((map__20090 == null)))?((((map__20090.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20090.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20090):map__20090);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__9439__auto__ = unchecked;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.compiler.safe_test_QMARK_(env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then], 0));
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")"], 0));
} else {
if(checked){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(cljs.core.truth_(",test,")){"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(",test,"){"], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then,"} else {"], 0));

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$,"}"], 0));
}

}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"case*","case*",716180697),(function (p__20092){
var map__20093 = p__20092;
var map__20093__$1 = ((((!((map__20093 == null)))?((((map__20093.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20093.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20093):map__20093);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20093__$1,new cljs.core.Keyword(null,"v","v",21465059));
var tests = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20093__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var thens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20093__$1,new cljs.core.Keyword(null,"thens","thens",226631442));
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20093__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20093__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){"], 0));
} else {
}

var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("caseval__");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",gs,";"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch (",v,") {"], 0));

var seq__20095_20113 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(tests,thens)));
var chunk__20096_20114 = null;
var count__20097_20115 = (0);
var i__20098_20116 = (0);
while(true){
if((i__20098_20116 < count__20097_20115)){
var vec__20099_20117 = chunk__20096_20114.cljs$core$IIndexed$_nth$arity$2(null,i__20098_20116);
var ts_20118 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20099_20117,(0),null);
var then_20119 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20099_20117,(1),null);
var seq__20102_20120 = cljs.core.seq(ts_20118);
var chunk__20103_20121 = null;
var count__20104_20122 = (0);
var i__20105_20123 = (0);
while(true){
if((i__20105_20123 < count__20104_20122)){
var test_20124 = chunk__20103_20121.cljs$core$IIndexed$_nth$arity$2(null,i__20105_20123);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20124,":"], 0));

var G__20125 = seq__20102_20120;
var G__20126 = chunk__20103_20121;
var G__20127 = count__20104_20122;
var G__20128 = (i__20105_20123 + (1));
seq__20102_20120 = G__20125;
chunk__20103_20121 = G__20126;
count__20104_20122 = G__20127;
i__20105_20123 = G__20128;
continue;
} else {
var temp__6738__auto___20129 = cljs.core.seq(seq__20102_20120);
if(temp__6738__auto___20129){
var seq__20102_20130__$1 = temp__6738__auto___20129;
if(cljs.core.chunked_seq_QMARK_(seq__20102_20130__$1)){
var c__10350__auto___20131 = cljs.core.chunk_first(seq__20102_20130__$1);
var G__20132 = cljs.core.chunk_rest(seq__20102_20130__$1);
var G__20133 = c__10350__auto___20131;
var G__20134 = cljs.core.count(c__10350__auto___20131);
var G__20135 = (0);
seq__20102_20120 = G__20132;
chunk__20103_20121 = G__20133;
count__20104_20122 = G__20134;
i__20105_20123 = G__20135;
continue;
} else {
var test_20136 = cljs.core.first(seq__20102_20130__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20136,":"], 0));

var G__20137 = cljs.core.next(seq__20102_20130__$1);
var G__20138 = null;
var G__20139 = (0);
var G__20140 = (0);
seq__20102_20120 = G__20137;
chunk__20103_20121 = G__20138;
count__20104_20122 = G__20139;
i__20105_20123 = G__20140;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_20119], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_20119], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__20141 = seq__20095_20113;
var G__20142 = chunk__20096_20114;
var G__20143 = count__20097_20115;
var G__20144 = (i__20098_20116 + (1));
seq__20095_20113 = G__20141;
chunk__20096_20114 = G__20142;
count__20097_20115 = G__20143;
i__20098_20116 = G__20144;
continue;
} else {
var temp__6738__auto___20145 = cljs.core.seq(seq__20095_20113);
if(temp__6738__auto___20145){
var seq__20095_20146__$1 = temp__6738__auto___20145;
if(cljs.core.chunked_seq_QMARK_(seq__20095_20146__$1)){
var c__10350__auto___20147 = cljs.core.chunk_first(seq__20095_20146__$1);
var G__20148 = cljs.core.chunk_rest(seq__20095_20146__$1);
var G__20149 = c__10350__auto___20147;
var G__20150 = cljs.core.count(c__10350__auto___20147);
var G__20151 = (0);
seq__20095_20113 = G__20148;
chunk__20096_20114 = G__20149;
count__20097_20115 = G__20150;
i__20098_20116 = G__20151;
continue;
} else {
var vec__20106_20152 = cljs.core.first(seq__20095_20146__$1);
var ts_20153 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20106_20152,(0),null);
var then_20154 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20106_20152,(1),null);
var seq__20109_20155 = cljs.core.seq(ts_20153);
var chunk__20110_20156 = null;
var count__20111_20157 = (0);
var i__20112_20158 = (0);
while(true){
if((i__20112_20158 < count__20111_20157)){
var test_20159 = chunk__20110_20156.cljs$core$IIndexed$_nth$arity$2(null,i__20112_20158);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20159,":"], 0));

var G__20160 = seq__20109_20155;
var G__20161 = chunk__20110_20156;
var G__20162 = count__20111_20157;
var G__20163 = (i__20112_20158 + (1));
seq__20109_20155 = G__20160;
chunk__20110_20156 = G__20161;
count__20111_20157 = G__20162;
i__20112_20158 = G__20163;
continue;
} else {
var temp__6738__auto___20164__$1 = cljs.core.seq(seq__20109_20155);
if(temp__6738__auto___20164__$1){
var seq__20109_20165__$1 = temp__6738__auto___20164__$1;
if(cljs.core.chunked_seq_QMARK_(seq__20109_20165__$1)){
var c__10350__auto___20166 = cljs.core.chunk_first(seq__20109_20165__$1);
var G__20167 = cljs.core.chunk_rest(seq__20109_20165__$1);
var G__20168 = c__10350__auto___20166;
var G__20169 = cljs.core.count(c__10350__auto___20166);
var G__20170 = (0);
seq__20109_20155 = G__20167;
chunk__20110_20156 = G__20168;
count__20111_20157 = G__20169;
i__20112_20158 = G__20170;
continue;
} else {
var test_20171 = cljs.core.first(seq__20109_20165__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20171,":"], 0));

var G__20172 = cljs.core.next(seq__20109_20165__$1);
var G__20173 = null;
var G__20174 = (0);
var G__20175 = (0);
seq__20109_20155 = G__20172;
chunk__20110_20156 = G__20173;
count__20111_20157 = G__20174;
i__20112_20158 = G__20175;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_20154], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_20154], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__20176 = cljs.core.next(seq__20095_20146__$1);
var G__20177 = null;
var G__20178 = (0);
var G__20179 = (0);
seq__20095_20113 = G__20176;
chunk__20096_20114 = G__20177;
count__20097_20115 = G__20178;
i__20098_20116 = G__20179;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",default$], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default$], 0));
}
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",gs,";})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__20180){
var map__20181 = p__20180;
var map__20181__$1 = ((((!((map__20181 == null)))?((((map__20181.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20181.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20181):map__20181);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20181__$1,new cljs.core.Keyword(null,"throw","throw",-1044625833));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20181__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){throw ",throw$,"})()"], 0));
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw ",throw$,";"], 0));
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("!"),cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__20192 = env;
var G__20193 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__20192,G__20193) : cljs.compiler.resolve_type.call(null,G__20192,G__20193));
})())].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__20194 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20194,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20194,(1),null);
var ret_t = (cljs.core.truth_(rstr)?(cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,rstr) : cljs.compiler.resolve_type.call(null,env,rstr)):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (idx,vec__20194,fstr,rstr,ret_t,axstr){
return (function (p1__20183_SHARP_){
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,p1__20183_SHARP_) : cljs.compiler.resolve_type.call(null,env,p1__20183_SHARP_));
});})(idx,vec__20194,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__20197 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("function("),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(")")].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20197),cljs.core.str.cljs$core$IFn$_invoke$arity$1(":"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__20197;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__20198 = env;
var G__20199 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1)));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__20198,G__20199) : cljs.compiler.resolve_type.call(null,G__20198,G__20199));
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1("=")].join('');
} else {
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(t))))].join(''));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(ts),(1),(cljs.core.count(ts) - (1)));
var xs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(ts__$1,/\|/);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("{"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (ts__$1,xs){
return (function (p1__20200_SHARP_){
return cljs.compiler.resolve_type(env,p1__20200_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str.cljs$core$IFn$_invoke$arity$1("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__20207 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__20208 = cljs.core.seq(vec__20207);
var first__20209 = cljs.core.first(seq__20208);
var seq__20208__$1 = cljs.core.next(seq__20208);
var p = first__20209;
var first__20209__$1 = cljs.core.first(seq__20208__$1);
var seq__20208__$2 = cljs.core.next(seq__20208__$1);
var ts = first__20209__$1;
var first__20209__$2 = cljs.core.first(seq__20208__$2);
var seq__20208__$3 = cljs.core.next(seq__20208__$2);
var n = first__20209__$2;
var xs = seq__20208__$3;
if(cljs.core.truth_((function (){var and__9427__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p);
if(and__9427__auto__){
var and__9427__auto____$1 = ts;
if(cljs.core.truth_(and__9427__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__20210 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__20211 = cljs.core.seq(vec__20210);
var first__20212 = cljs.core.first(seq__20211);
var seq__20211__$1 = cljs.core.next(seq__20211);
var p = first__20212;
var first__20212__$1 = cljs.core.first(seq__20211__$1);
var seq__20211__$2 = cljs.core.next(seq__20211__$1);
var ts = first__20212__$1;
var xs = seq__20211__$2;
if(cljs.core.truth_((function (){var and__9427__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p);
if(and__9427__auto__){
var and__9427__auto____$1 = ts;
if(cljs.core.truth_(and__9427__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var args20214 = [];
var len__10660__auto___20249 = arguments.length;
var i__10661__auto___20250 = (0);
while(true){
if((i__10661__auto___20250 < len__10660__auto___20249)){
args20214.push((arguments[i__10661__auto___20250]));

var G__20251 = (i__10661__auto___20250 + (1));
i__10661__auto___20250 = G__20251;
continue;
} else {
}
break;
}

var G__20216 = args20214.length;
switch (G__20216) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args20214.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__20238 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docs,docs__$1,docs__$2){
return (function (p1__20213_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__20213_SHARP_);
} else {
return p1__20213_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines(e));
var seq__20239 = cljs.core.seq(vec__20238);
var first__20240 = cljs.core.first(seq__20239);
var seq__20239__$1 = cljs.core.next(seq__20239);
var x = first__20240;
var ys = seq__20239__$1;
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(x,"*/","* /")], 0));

var seq__20241 = cljs.core.seq(ys);
var chunk__20242 = null;
var count__20243 = (0);
var i__20244 = (0);
while(true){
if((i__20244 < count__20243)){
var next_line = chunk__20242.cljs$core$IIndexed$_nth$arity$2(null,i__20244);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__20253 = seq__20241;
var G__20254 = chunk__20242;
var G__20255 = count__20243;
var G__20256 = (i__20244 + (1));
seq__20241 = G__20253;
chunk__20242 = G__20254;
count__20243 = G__20255;
i__20244 = G__20256;
continue;
} else {
var temp__6738__auto__ = cljs.core.seq(seq__20241);
if(temp__6738__auto__){
var seq__20241__$1 = temp__6738__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20241__$1)){
var c__10350__auto__ = cljs.core.chunk_first(seq__20241__$1);
var G__20257 = cljs.core.chunk_rest(seq__20241__$1);
var G__20258 = c__10350__auto__;
var G__20259 = cljs.core.count(c__10350__auto__);
var G__20260 = (0);
seq__20241 = G__20257;
chunk__20242 = G__20258;
count__20243 = G__20259;
i__20244 = G__20260;
continue;
} else {
var next_line = cljs.core.first(seq__20241__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__20261 = cljs.core.next(seq__20241__$1);
var G__20262 = null;
var G__20263 = (0);
var G__20264 = (0);
seq__20241 = G__20261;
chunk__20242 = G__20262;
count__20243 = G__20263;
i__20244 = G__20264;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

var seq__20245_20265 = cljs.core.seq(docs__$2);
var chunk__20246_20266 = null;
var count__20247_20267 = (0);
var i__20248_20268 = (0);
while(true){
if((i__20248_20268 < count__20247_20267)){
var e_20269 = chunk__20246_20266.cljs$core$IIndexed$_nth$arity$2(null,i__20248_20268);
if(cljs.core.truth_(e_20269)){
print_comment_lines(e_20269);
} else {
}

var G__20270 = seq__20245_20265;
var G__20271 = chunk__20246_20266;
var G__20272 = count__20247_20267;
var G__20273 = (i__20248_20268 + (1));
seq__20245_20265 = G__20270;
chunk__20246_20266 = G__20271;
count__20247_20267 = G__20272;
i__20248_20268 = G__20273;
continue;
} else {
var temp__6738__auto___20274 = cljs.core.seq(seq__20245_20265);
if(temp__6738__auto___20274){
var seq__20245_20275__$1 = temp__6738__auto___20274;
if(cljs.core.chunked_seq_QMARK_(seq__20245_20275__$1)){
var c__10350__auto___20276 = cljs.core.chunk_first(seq__20245_20275__$1);
var G__20277 = cljs.core.chunk_rest(seq__20245_20275__$1);
var G__20278 = c__10350__auto___20276;
var G__20279 = cljs.core.count(c__10350__auto___20276);
var G__20280 = (0);
seq__20245_20265 = G__20277;
chunk__20246_20266 = G__20278;
count__20247_20267 = G__20279;
i__20248_20268 = G__20280;
continue;
} else {
var e_20281 = cljs.core.first(seq__20245_20275__$1);
if(cljs.core.truth_(e_20281)){
print_comment_lines(e_20281);
} else {
}

var G__20282 = cljs.core.next(seq__20245_20275__$1);
var G__20283 = null;
var G__20284 = (0);
var G__20285 = (0);
seq__20245_20265 = G__20282;
chunk__20246_20266 = G__20283;
count__20247_20267 = G__20284;
i__20248_20268 = G__20285;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" */"], 0));
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return (typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number');
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.Keyword(null,"options","options",99638489));
var and__9427__auto__ = cljs.core.some(((function (opts){
return (function (p1__20287_SHARP_){
return goog.string.startsWith(p1__20287_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__9427__auto__)){
var and__9427__auto____$1 = opts;
if(cljs.core.truth_(and__9427__auto____$1)){
var and__9427__auto____$2 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__9427__auto____$2){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)].join('')], null));
if(cljs.core.truth_(cljs.compiler.valid_define_value_QMARK_(define))){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([define], 0));
} else {
return null;
}
} else {
return and__9427__auto____$2;
}
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__20288){
var map__20289 = p__20288;
var map__20289__$1 = ((((!((map__20289 == null)))?((((map__20289.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20289.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20289):map__20289);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"export","export",214356590));
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"test","test",577538877));
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__9439__auto__ = init;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ("], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$], 0));

if(cljs.core.truth_(init)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",(function (){var temp__6736__auto__ = cljs.compiler.get_define(mname,jsdoc);
if(cljs.core.truth_(temp__6736__auto__)){
var define = temp__6736__auto__;
return define;
} else {
return init;
}
})()], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["; return ("], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"var-special","var-special",1131576802),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast], 0))], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");})()"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.exportSymbol('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(export$),"', ",mname,");"], 0));
} else {
}

if(cljs.core.truth_((function (){var and__9427__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(and__9427__auto__){
return test;
} else {
return and__9427__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
} else {
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$,".cljs$lang$test = ",test,";"], 0));
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__20291){
var map__20312 = p__20291;
var map__20312__$1 = ((((!((map__20312 == null)))?((((map__20312.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20312.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20312):map__20312);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20312__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20312__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20312__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (",arglist,"){"], 0));

var seq__20314_20332 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__20315_20333 = null;
var count__20316_20334 = (0);
var i__20317_20335 = (0);
while(true){
if((i__20317_20335 < count__20316_20334)){
var vec__20318_20336 = chunk__20315_20333.cljs$core$IIndexed$_nth$arity$2(null,i__20317_20335);
var i_20337 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20318_20336,(0),null);
var param_20338 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20318_20336,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_20338);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__20339 = seq__20314_20332;
var G__20340 = chunk__20315_20333;
var G__20341 = count__20316_20334;
var G__20342 = (i__20317_20335 + (1));
seq__20314_20332 = G__20339;
chunk__20315_20333 = G__20340;
count__20316_20334 = G__20341;
i__20317_20335 = G__20342;
continue;
} else {
var temp__6738__auto___20343 = cljs.core.seq(seq__20314_20332);
if(temp__6738__auto___20343){
var seq__20314_20344__$1 = temp__6738__auto___20343;
if(cljs.core.chunked_seq_QMARK_(seq__20314_20344__$1)){
var c__10350__auto___20345 = cljs.core.chunk_first(seq__20314_20344__$1);
var G__20346 = cljs.core.chunk_rest(seq__20314_20344__$1);
var G__20347 = c__10350__auto___20345;
var G__20348 = cljs.core.count(c__10350__auto___20345);
var G__20349 = (0);
seq__20314_20332 = G__20346;
chunk__20315_20333 = G__20347;
count__20316_20334 = G__20348;
i__20317_20335 = G__20349;
continue;
} else {
var vec__20321_20350 = cljs.core.first(seq__20314_20344__$1);
var i_20351 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20321_20350,(0),null);
var param_20352 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20321_20350,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_20352);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__20353 = cljs.core.next(seq__20314_20344__$1);
var G__20354 = null;
var G__20355 = (0);
var G__20356 = (0);
seq__20314_20332 = G__20353;
chunk__20315_20333 = G__20354;
count__20316_20334 = G__20355;
i__20317_20335 = G__20356;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count(params))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(cljs.core.butlast(params)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.rest(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__20324_20357 = cljs.core.seq(params);
var chunk__20325_20358 = null;
var count__20326_20359 = (0);
var i__20327_20360 = (0);
while(true){
if((i__20327_20360 < count__20326_20359)){
var param_20361 = chunk__20325_20358.cljs$core$IIndexed$_nth$arity$2(null,i__20327_20360);
cljs.compiler.emit(param_20361);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20361,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20362 = seq__20324_20357;
var G__20363 = chunk__20325_20358;
var G__20364 = count__20326_20359;
var G__20365 = (i__20327_20360 + (1));
seq__20324_20357 = G__20362;
chunk__20325_20358 = G__20363;
count__20326_20359 = G__20364;
i__20327_20360 = G__20365;
continue;
} else {
var temp__6738__auto___20366 = cljs.core.seq(seq__20324_20357);
if(temp__6738__auto___20366){
var seq__20324_20367__$1 = temp__6738__auto___20366;
if(cljs.core.chunked_seq_QMARK_(seq__20324_20367__$1)){
var c__10350__auto___20368 = cljs.core.chunk_first(seq__20324_20367__$1);
var G__20369 = cljs.core.chunk_rest(seq__20324_20367__$1);
var G__20370 = c__10350__auto___20368;
var G__20371 = cljs.core.count(c__10350__auto___20368);
var G__20372 = (0);
seq__20324_20357 = G__20369;
chunk__20325_20358 = G__20370;
count__20326_20359 = G__20371;
i__20327_20360 = G__20372;
continue;
} else {
var param_20373 = cljs.core.first(seq__20324_20367__$1);
cljs.compiler.emit(param_20373);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20373,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20374 = cljs.core.next(seq__20324_20367__$1);
var G__20375 = null;
var G__20376 = (0);
var G__20377 = (0);
seq__20324_20357 = G__20374;
chunk__20325_20358 = G__20375;
count__20326_20359 = G__20376;
i__20327_20360 = G__20377;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.seq(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__20328_20378 = cljs.core.seq(params);
var chunk__20329_20379 = null;
var count__20330_20380 = (0);
var i__20331_20381 = (0);
while(true){
if((i__20331_20381 < count__20330_20380)){
var param_20382 = chunk__20329_20379.cljs$core$IIndexed$_nth$arity$2(null,i__20331_20381);
cljs.compiler.emit(param_20382);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20382,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20383 = seq__20328_20378;
var G__20384 = chunk__20329_20379;
var G__20385 = count__20330_20380;
var G__20386 = (i__20331_20381 + (1));
seq__20328_20378 = G__20383;
chunk__20329_20379 = G__20384;
count__20330_20380 = G__20385;
i__20331_20381 = G__20386;
continue;
} else {
var temp__6738__auto___20387 = cljs.core.seq(seq__20328_20378);
if(temp__6738__auto___20387){
var seq__20328_20388__$1 = temp__6738__auto___20387;
if(cljs.core.chunked_seq_QMARK_(seq__20328_20388__$1)){
var c__10350__auto___20389 = cljs.core.chunk_first(seq__20328_20388__$1);
var G__20390 = cljs.core.chunk_rest(seq__20328_20388__$1);
var G__20391 = c__10350__auto___20389;
var G__20392 = cljs.core.count(c__10350__auto___20389);
var G__20393 = (0);
seq__20328_20378 = G__20390;
chunk__20329_20379 = G__20391;
count__20330_20380 = G__20392;
i__20331_20381 = G__20393;
continue;
} else {
var param_20394 = cljs.core.first(seq__20328_20388__$1);
cljs.compiler.emit(param_20394);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20394,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20395 = cljs.core.next(seq__20328_20388__$1);
var G__20396 = null;
var G__20397 = (0);
var G__20398 = (0);
seq__20328_20378 = G__20395;
chunk__20329_20379 = G__20396;
count__20330_20380 = G__20397;
i__20331_20381 = G__20398;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__20403 = cljs.core.seq(params);
var chunk__20404 = null;
var count__20405 = (0);
var i__20406 = (0);
while(true){
if((i__20406 < count__20405)){
var param = chunk__20404.cljs$core$IIndexed$_nth$arity$2(null,i__20406);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20407 = seq__20403;
var G__20408 = chunk__20404;
var G__20409 = count__20405;
var G__20410 = (i__20406 + (1));
seq__20403 = G__20407;
chunk__20404 = G__20408;
count__20405 = G__20409;
i__20406 = G__20410;
continue;
} else {
var temp__6738__auto__ = cljs.core.seq(seq__20403);
if(temp__6738__auto__){
var seq__20403__$1 = temp__6738__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20403__$1)){
var c__10350__auto__ = cljs.core.chunk_first(seq__20403__$1);
var G__20411 = cljs.core.chunk_rest(seq__20403__$1);
var G__20412 = c__10350__auto__;
var G__20413 = cljs.core.count(c__10350__auto__);
var G__20414 = (0);
seq__20403 = G__20411;
chunk__20404 = G__20412;
count__20405 = G__20413;
i__20406 = G__20414;
continue;
} else {
var param = cljs.core.first(seq__20403__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20415 = cljs.core.next(seq__20403__$1);
var G__20416 = null;
var G__20417 = (0);
var G__20418 = (0);
seq__20403 = G__20415;
chunk__20404 = G__20416;
count__20405 = G__20417;
i__20406 = G__20418;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__20419){
var map__20422 = p__20419;
var map__20422__$1 = ((((!((map__20422 == null)))?((((map__20422.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20422.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20422):map__20422);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20422__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"("], 0));

cljs.compiler.emit_fn_params(params);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if(((startslice >= (0))) && (cljs.core.integer_QMARK_(startslice))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__i")].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__a")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}"], 0));

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__20424){
var map__20435 = p__20424;
var map__20435__$1 = ((((!((map__20435 == null)))?((((map__20435.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20435.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20435):map__20435);
var f = map__20435__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20435__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

var name_20445__$1 = (function (){var or__9439__auto__ = name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_20446 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_20445__$1);
var delegate_name_20447 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_20446),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() { "], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",delegate_name_20447," = function ("], 0));

var seq__20437_20448 = cljs.core.seq(params);
var chunk__20438_20449 = null;
var count__20439_20450 = (0);
var i__20440_20451 = (0);
while(true){
if((i__20440_20451 < count__20439_20450)){
var param_20452 = chunk__20438_20449.cljs$core$IIndexed$_nth$arity$2(null,i__20440_20451);
cljs.compiler.emit(param_20452);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20452,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20453 = seq__20437_20448;
var G__20454 = chunk__20438_20449;
var G__20455 = count__20439_20450;
var G__20456 = (i__20440_20451 + (1));
seq__20437_20448 = G__20453;
chunk__20438_20449 = G__20454;
count__20439_20450 = G__20455;
i__20440_20451 = G__20456;
continue;
} else {
var temp__6738__auto___20457 = cljs.core.seq(seq__20437_20448);
if(temp__6738__auto___20457){
var seq__20437_20458__$1 = temp__6738__auto___20457;
if(cljs.core.chunked_seq_QMARK_(seq__20437_20458__$1)){
var c__10350__auto___20459 = cljs.core.chunk_first(seq__20437_20458__$1);
var G__20460 = cljs.core.chunk_rest(seq__20437_20458__$1);
var G__20461 = c__10350__auto___20459;
var G__20462 = cljs.core.count(c__10350__auto___20459);
var G__20463 = (0);
seq__20437_20448 = G__20460;
chunk__20438_20449 = G__20461;
count__20439_20450 = G__20462;
i__20440_20451 = G__20463;
continue;
} else {
var param_20464 = cljs.core.first(seq__20437_20458__$1);
cljs.compiler.emit(param_20464);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20464,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20465 = cljs.core.next(seq__20437_20458__$1);
var G__20466 = null;
var G__20467 = (0);
var G__20468 = (0);
seq__20437_20448 = G__20465;
chunk__20438_20449 = G__20466;
count__20439_20450 = G__20467;
i__20440_20451 = G__20468;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_20446," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",(cljs.core.count(params) - (1)),") {"], 0));

var a_20469 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_20469,",0,null);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["} "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name_20447,".call(this,"], 0));

var seq__20441_20470 = cljs.core.seq(params);
var chunk__20442_20471 = null;
var count__20443_20472 = (0);
var i__20444_20473 = (0);
while(true){
if((i__20444_20473 < count__20443_20472)){
var param_20474 = chunk__20442_20471.cljs$core$IIndexed$_nth$arity$2(null,i__20444_20473);
cljs.compiler.emit(param_20474);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20474,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20475 = seq__20441_20470;
var G__20476 = chunk__20442_20471;
var G__20477 = count__20443_20472;
var G__20478 = (i__20444_20473 + (1));
seq__20441_20470 = G__20475;
chunk__20442_20471 = G__20476;
count__20443_20472 = G__20477;
i__20444_20473 = G__20478;
continue;
} else {
var temp__6738__auto___20479 = cljs.core.seq(seq__20441_20470);
if(temp__6738__auto___20479){
var seq__20441_20480__$1 = temp__6738__auto___20479;
if(cljs.core.chunked_seq_QMARK_(seq__20441_20480__$1)){
var c__10350__auto___20481 = cljs.core.chunk_first(seq__20441_20480__$1);
var G__20482 = cljs.core.chunk_rest(seq__20441_20480__$1);
var G__20483 = c__10350__auto___20481;
var G__20484 = cljs.core.count(c__10350__auto___20481);
var G__20485 = (0);
seq__20441_20470 = G__20482;
chunk__20442_20471 = G__20483;
count__20443_20472 = G__20484;
i__20444_20473 = G__20485;
continue;
} else {
var param_20486 = cljs.core.first(seq__20441_20480__$1);
cljs.compiler.emit(param_20486);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20486,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20487 = cljs.core.next(seq__20441_20480__$1);
var G__20488 = null;
var G__20489 = (0);
var G__20490 = (0);
seq__20441_20470 = G__20487;
chunk__20442_20471 = G__20488;
count__20443_20472 = G__20489;
i__20444_20473 = G__20490;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20446,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20446,".cljs$lang$applyTo = "], 0));

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.Keyword(null,"name","name",1843675177),name_20445__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20446,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_20447,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_20446,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__20494){
var map__20495 = p__20494;
var map__20495__$1 = ((((!((map__20495 == null)))?((((map__20495.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20495.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20495):map__20495);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.array_seq([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20491_SHARP_){
var and__9427__auto__ = p1__20491_SHARP_;
if(cljs.core.truth_(and__9427__auto__)){
var G__20497 = new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__20491_SHARP_);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20497) : cljs.core.deref.call(null,G__20497));
} else {
return and__9427__auto__;
}
});})(map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,recur_frames)], 0)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.array_seq([loop_lets], 0)))));
if(loop_locals){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["((function (",cljs.compiler.comma_sep(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,loop_locals)),"){"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_20531__$1 = (function (){var or__9439__auto__ = name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_20532 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_20531__$1);
var maxparams_20533 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_20534 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (name_20531__$1,mname_20532,maxparams_20533,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_20532),cljs.core.str.cljs$core$IFn$_invoke$arity$1("__"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_20531__$1,mname_20532,maxparams_20533,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_20535 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (name_20531__$1,mname_20532,maxparams_20533,mmap_20534,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20492_SHARP_){
return cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__20492_SHARP_)));
});})(name_20531__$1,mname_20532,maxparams_20533,mmap_20534,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq(mmap_20534));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() {"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_20532," = null;"], 0));

var seq__20498_20536 = cljs.core.seq(ms_20535);
var chunk__20499_20537 = null;
var count__20500_20538 = (0);
var i__20501_20539 = (0);
while(true){
if((i__20501_20539 < count__20500_20538)){
var vec__20502_20540 = chunk__20499_20537.cljs$core$IIndexed$_nth$arity$2(null,i__20501_20539);
var n_20541 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20502_20540,(0),null);
var meth_20542 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20502_20540,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_20541," = "], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20542))){
cljs.compiler.emit_variadic_fn_method(meth_20542);
} else {
cljs.compiler.emit_fn_method(meth_20542);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__20543 = seq__20498_20536;
var G__20544 = chunk__20499_20537;
var G__20545 = count__20500_20538;
var G__20546 = (i__20501_20539 + (1));
seq__20498_20536 = G__20543;
chunk__20499_20537 = G__20544;
count__20500_20538 = G__20545;
i__20501_20539 = G__20546;
continue;
} else {
var temp__6738__auto___20547 = cljs.core.seq(seq__20498_20536);
if(temp__6738__auto___20547){
var seq__20498_20548__$1 = temp__6738__auto___20547;
if(cljs.core.chunked_seq_QMARK_(seq__20498_20548__$1)){
var c__10350__auto___20549 = cljs.core.chunk_first(seq__20498_20548__$1);
var G__20550 = cljs.core.chunk_rest(seq__20498_20548__$1);
var G__20551 = c__10350__auto___20549;
var G__20552 = cljs.core.count(c__10350__auto___20549);
var G__20553 = (0);
seq__20498_20536 = G__20550;
chunk__20499_20537 = G__20551;
count__20500_20538 = G__20552;
i__20501_20539 = G__20553;
continue;
} else {
var vec__20505_20554 = cljs.core.first(seq__20498_20548__$1);
var n_20555 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505_20554,(0),null);
var meth_20556 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505_20554,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_20555," = "], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20556))){
cljs.compiler.emit_variadic_fn_method(meth_20556);
} else {
cljs.compiler.emit_fn_method(meth_20556);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__20557 = cljs.core.next(seq__20498_20548__$1);
var G__20558 = null;
var G__20559 = (0);
var G__20560 = (0);
seq__20498_20536 = G__20557;
chunk__20499_20537 = G__20558;
count__20500_20538 = G__20559;
i__20501_20539 = G__20560;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_20533),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_20533)),"){"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(maxparams_20533));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = var_args;"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch(arguments.length){"], 0));

var seq__20508_20561 = cljs.core.seq(ms_20535);
var chunk__20509_20562 = null;
var count__20510_20563 = (0);
var i__20511_20564 = (0);
while(true){
if((i__20511_20564 < count__20510_20563)){
var vec__20512_20565 = chunk__20509_20562.cljs$core$IIndexed$_nth$arity$2(null,i__20511_20564);
var n_20566 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20512_20565,(0),null);
var meth_20567 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20512_20565,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20567))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_20568 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_20568," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_20569 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_20568," = new cljs.core.IndexedSeq(",a_20569,",0,null);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20566,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_20533)),(((cljs.core.count(maxparams_20533) > (1)))?", ":null),restarg_20568,");"], 0));
} else {
var pcnt_20570 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20567));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_20570,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20566,".call(this",(((pcnt_20570 === (0)))?null:cljs.core._conj((function (){var x__10373__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_20570,maxparams_20533));
return cljs.core._conj(cljs.core.List.EMPTY,x__10373__auto__);
})(),",")),");"], 0));
}

var G__20571 = seq__20508_20561;
var G__20572 = chunk__20509_20562;
var G__20573 = count__20510_20563;
var G__20574 = (i__20511_20564 + (1));
seq__20508_20561 = G__20571;
chunk__20509_20562 = G__20572;
count__20510_20563 = G__20573;
i__20511_20564 = G__20574;
continue;
} else {
var temp__6738__auto___20575 = cljs.core.seq(seq__20508_20561);
if(temp__6738__auto___20575){
var seq__20508_20576__$1 = temp__6738__auto___20575;
if(cljs.core.chunked_seq_QMARK_(seq__20508_20576__$1)){
var c__10350__auto___20577 = cljs.core.chunk_first(seq__20508_20576__$1);
var G__20578 = cljs.core.chunk_rest(seq__20508_20576__$1);
var G__20579 = c__10350__auto___20577;
var G__20580 = cljs.core.count(c__10350__auto___20577);
var G__20581 = (0);
seq__20508_20561 = G__20578;
chunk__20509_20562 = G__20579;
count__20510_20563 = G__20580;
i__20511_20564 = G__20581;
continue;
} else {
var vec__20515_20582 = cljs.core.first(seq__20508_20576__$1);
var n_20583 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20515_20582,(0),null);
var meth_20584 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20515_20582,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20584))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_20585 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_20585," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_20586 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_20585," = new cljs.core.IndexedSeq(",a_20586,",0,null);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20583,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_20533)),(((cljs.core.count(maxparams_20533) > (1)))?", ":null),restarg_20585,");"], 0));
} else {
var pcnt_20587 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20584));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_20587,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20583,".call(this",(((pcnt_20587 === (0)))?null:cljs.core._conj((function (){var x__10373__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_20587,maxparams_20533));
return cljs.core._conj(cljs.core.List.EMPTY,x__10373__auto__);
})(),",")),");"], 0));
}

var G__20588 = cljs.core.next(seq__20508_20576__$1);
var G__20589 = null;
var G__20590 = (0);
var G__20591 = (0);
seq__20508_20561 = G__20588;
chunk__20509_20562 = G__20589;
count__20510_20563 = G__20590;
i__20511_20564 = G__20591;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw(new Error('Invalid arity: ' + (arguments.length - 1)));"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$lang$applyTo = ",cljs.core.some(((function (name_20531__$1,mname_20532,maxparams_20533,mmap_20534,ms_20535,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20493_SHARP_){
var vec__20518 = p1__20493_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20518,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20518,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_20531__$1,mname_20532,maxparams_20533,mmap_20534,ms_20535,loop_locals,map__20495,map__20495__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_20535),".cljs$lang$applyTo;"], 0));
} else {
}

var seq__20521_20592 = cljs.core.seq(ms_20535);
var chunk__20522_20593 = null;
var count__20523_20594 = (0);
var i__20524_20595 = (0);
while(true){
if((i__20524_20595 < count__20523_20594)){
var vec__20525_20596 = chunk__20522_20593.cljs$core$IIndexed$_nth$arity$2(null,i__20524_20595);
var n_20597 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20525_20596,(0),null);
var meth_20598 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20525_20596,(1),null);
var c_20599 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20598));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20598))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$core$IFn$_invoke$arity$variadic = ",n_20597,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$core$IFn$_invoke$arity$",c_20599," = ",n_20597,";"], 0));
}

var G__20600 = seq__20521_20592;
var G__20601 = chunk__20522_20593;
var G__20602 = count__20523_20594;
var G__20603 = (i__20524_20595 + (1));
seq__20521_20592 = G__20600;
chunk__20522_20593 = G__20601;
count__20523_20594 = G__20602;
i__20524_20595 = G__20603;
continue;
} else {
var temp__6738__auto___20604 = cljs.core.seq(seq__20521_20592);
if(temp__6738__auto___20604){
var seq__20521_20605__$1 = temp__6738__auto___20604;
if(cljs.core.chunked_seq_QMARK_(seq__20521_20605__$1)){
var c__10350__auto___20606 = cljs.core.chunk_first(seq__20521_20605__$1);
var G__20607 = cljs.core.chunk_rest(seq__20521_20605__$1);
var G__20608 = c__10350__auto___20606;
var G__20609 = cljs.core.count(c__10350__auto___20606);
var G__20610 = (0);
seq__20521_20592 = G__20607;
chunk__20522_20593 = G__20608;
count__20523_20594 = G__20609;
i__20524_20595 = G__20610;
continue;
} else {
var vec__20528_20611 = cljs.core.first(seq__20521_20605__$1);
var n_20612 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20528_20611,(0),null);
var meth_20613 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20528_20611,(1),null);
var c_20614 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20613));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20613))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$core$IFn$_invoke$arity$variadic = ",n_20612,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20532,".cljs$core$IFn$_invoke$arity$",c_20614," = ",n_20612,";"], 0));
}

var G__20615 = cljs.core.next(seq__20521_20605__$1);
var G__20616 = null;
var G__20617 = (0);
var G__20618 = (0);
seq__20521_20592 = G__20615;
chunk__20522_20593 = G__20616;
count__20523_20594 = G__20617;
i__20524_20595 = G__20618;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_20532,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";})(",cljs.compiler.comma_sep(loop_locals),"))"], 0));
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"do","do",46310725),(function (p__20619){
var map__20620 = p__20619;
var map__20620__$1 = ((((!((map__20620 == null)))?((((map__20620.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20620.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20620):map__20620);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20620__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20620__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20620__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var and__9427__auto__ = statements;
if(cljs.core.truth_(and__9427__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__9427__auto__;
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__20622_20626 = cljs.core.seq(statements);
var chunk__20623_20627 = null;
var count__20624_20628 = (0);
var i__20625_20629 = (0);
while(true){
if((i__20625_20629 < count__20624_20628)){
var s_20630 = chunk__20623_20627.cljs$core$IIndexed$_nth$arity$2(null,i__20625_20629);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_20630], 0));

var G__20631 = seq__20622_20626;
var G__20632 = chunk__20623_20627;
var G__20633 = count__20624_20628;
var G__20634 = (i__20625_20629 + (1));
seq__20622_20626 = G__20631;
chunk__20623_20627 = G__20632;
count__20624_20628 = G__20633;
i__20625_20629 = G__20634;
continue;
} else {
var temp__6738__auto___20635 = cljs.core.seq(seq__20622_20626);
if(temp__6738__auto___20635){
var seq__20622_20636__$1 = temp__6738__auto___20635;
if(cljs.core.chunked_seq_QMARK_(seq__20622_20636__$1)){
var c__10350__auto___20637 = cljs.core.chunk_first(seq__20622_20636__$1);
var G__20638 = cljs.core.chunk_rest(seq__20622_20636__$1);
var G__20639 = c__10350__auto___20637;
var G__20640 = cljs.core.count(c__10350__auto___20637);
var G__20641 = (0);
seq__20622_20626 = G__20638;
chunk__20623_20627 = G__20639;
count__20624_20628 = G__20640;
i__20625_20629 = G__20641;
continue;
} else {
var s_20642 = cljs.core.first(seq__20622_20636__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_20642], 0));

var G__20643 = cljs.core.next(seq__20622_20636__$1);
var G__20644 = null;
var G__20645 = (0);
var G__20646 = (0);
seq__20622_20626 = G__20643;
chunk__20623_20627 = G__20644;
count__20624_20628 = G__20645;
i__20625_20629 = G__20646;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit(ret);

if(cljs.core.truth_((function (){var and__9427__auto__ = statements;
if(cljs.core.truth_(and__9427__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__9427__auto__;
}
})())){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__20647){
var map__20648 = p__20647;
var map__20648__$1 = ((((!((map__20648 == null)))?((((map__20648.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20648.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20648):map__20648);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20648__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20648__$1,new cljs.core.Keyword(null,"try","try",1380742522));
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20648__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20648__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20648__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__9439__auto__ = name;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["try{",try$,"}"], 0));

if(cljs.core.truth_(name)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["catch (",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"){",catch$,"}"], 0));
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"constant","constant",-379609303),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(finally$))){
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Assert failed: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1("finally block cannot contain constant"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("(not= :constant (:op finally))")].join('')));
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["finally {",finally$,"}"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([try$], 0));
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__20650,is_loop){
var map__20662 = p__20650;
var map__20662__$1 = ((((!((map__20662 == null)))?((((map__20662.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20662.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20662):map__20662);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20662__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20662__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20662__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var _STAR_lexical_renames_STAR_20664_20673 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_lexical_renames_STAR_20664_20673,context,map__20662,map__20662__$1,bindings,expr,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),cljs.core.str.cljs$core$IFn$_invoke$arity$1("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_20664_20673,context,map__20662,map__20662__$1,bindings,expr,env))
,bindings):null));

try{var seq__20665_20674 = cljs.core.seq(bindings);
var chunk__20666_20675 = null;
var count__20667_20676 = (0);
var i__20668_20677 = (0);
while(true){
if((i__20668_20677 < count__20667_20676)){
var map__20669_20678 = chunk__20666_20675.cljs$core$IIndexed$_nth$arity$2(null,i__20668_20677);
var map__20669_20679__$1 = ((((!((map__20669_20678 == null)))?((((map__20669_20678.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20669_20678.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20669_20678):map__20669_20678);
var binding_20680 = map__20669_20679__$1;
var init_20681 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20669_20679__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_20680);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_20681,";"], 0));

var G__20682 = seq__20665_20674;
var G__20683 = chunk__20666_20675;
var G__20684 = count__20667_20676;
var G__20685 = (i__20668_20677 + (1));
seq__20665_20674 = G__20682;
chunk__20666_20675 = G__20683;
count__20667_20676 = G__20684;
i__20668_20677 = G__20685;
continue;
} else {
var temp__6738__auto___20686 = cljs.core.seq(seq__20665_20674);
if(temp__6738__auto___20686){
var seq__20665_20687__$1 = temp__6738__auto___20686;
if(cljs.core.chunked_seq_QMARK_(seq__20665_20687__$1)){
var c__10350__auto___20688 = cljs.core.chunk_first(seq__20665_20687__$1);
var G__20689 = cljs.core.chunk_rest(seq__20665_20687__$1);
var G__20690 = c__10350__auto___20688;
var G__20691 = cljs.core.count(c__10350__auto___20688);
var G__20692 = (0);
seq__20665_20674 = G__20689;
chunk__20666_20675 = G__20690;
count__20667_20676 = G__20691;
i__20668_20677 = G__20692;
continue;
} else {
var map__20671_20693 = cljs.core.first(seq__20665_20687__$1);
var map__20671_20694__$1 = ((((!((map__20671_20693 == null)))?((((map__20671_20693.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20671_20693.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20671_20693):map__20671_20693);
var binding_20695 = map__20671_20694__$1;
var init_20696 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20671_20694__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_20695);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_20696,";"], 0));

var G__20697 = cljs.core.next(seq__20665_20687__$1);
var G__20698 = null;
var G__20699 = (0);
var G__20700 = (0);
seq__20665_20674 = G__20697;
chunk__20666_20675 = G__20698;
count__20667_20676 = G__20699;
i__20668_20677 = G__20700;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_20664_20673;
}
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let(ast,false);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let(ast,true);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__20701){
var map__20702 = p__20701;
var map__20702__$1 = ((((!((map__20702 == null)))?((((map__20702.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20702.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20702):map__20702);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20702__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20702__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20702__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__10460__auto___20704 = cljs.core.count(exprs);
var i_20705 = (0);
while(true){
if((i_20705 < n__10460__auto___20704)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_20705) : temps.call(null,i_20705))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_20705) : exprs.call(null,i_20705)),";"], 0));

var G__20706 = (i_20705 + (1));
i_20705 = G__20706;
continue;
} else {
}
break;
}

var n__10460__auto___20707 = cljs.core.count(exprs);
var i_20708 = (0);
while(true){
if((i_20708 < n__10460__auto___20707)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_20708) : params.call(null,i_20708)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_20708) : temps.call(null,i_20708)),";"], 0));

var G__20709 = (i_20708 + (1));
i_20708 = G__20709;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["continue;"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__20710){
var map__20711 = p__20710;
var map__20711__$1 = ((((!((map__20711 == null)))?((((map__20711.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20711.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20711):map__20711);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20711__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20711__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20711__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__20713_20721 = cljs.core.seq(bindings);
var chunk__20714_20722 = null;
var count__20715_20723 = (0);
var i__20716_20724 = (0);
while(true){
if((i__20716_20724 < count__20715_20723)){
var map__20717_20725 = chunk__20714_20722.cljs$core$IIndexed$_nth$arity$2(null,i__20716_20724);
var map__20717_20726__$1 = ((((!((map__20717_20725 == null)))?((((map__20717_20725.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20717_20725.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20717_20725):map__20717_20725);
var binding_20727 = map__20717_20726__$1;
var init_20728 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20717_20726__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_20727)," = ",init_20728,";"], 0));

var G__20729 = seq__20713_20721;
var G__20730 = chunk__20714_20722;
var G__20731 = count__20715_20723;
var G__20732 = (i__20716_20724 + (1));
seq__20713_20721 = G__20729;
chunk__20714_20722 = G__20730;
count__20715_20723 = G__20731;
i__20716_20724 = G__20732;
continue;
} else {
var temp__6738__auto___20733 = cljs.core.seq(seq__20713_20721);
if(temp__6738__auto___20733){
var seq__20713_20734__$1 = temp__6738__auto___20733;
if(cljs.core.chunked_seq_QMARK_(seq__20713_20734__$1)){
var c__10350__auto___20735 = cljs.core.chunk_first(seq__20713_20734__$1);
var G__20736 = cljs.core.chunk_rest(seq__20713_20734__$1);
var G__20737 = c__10350__auto___20735;
var G__20738 = cljs.core.count(c__10350__auto___20735);
var G__20739 = (0);
seq__20713_20721 = G__20736;
chunk__20714_20722 = G__20737;
count__20715_20723 = G__20738;
i__20716_20724 = G__20739;
continue;
} else {
var map__20719_20740 = cljs.core.first(seq__20713_20734__$1);
var map__20719_20741__$1 = ((((!((map__20719_20740 == null)))?((((map__20719_20740.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20719_20740.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20719_20740):map__20719_20740);
var binding_20742 = map__20719_20741__$1;
var init_20743 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20719_20741__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_20742)," = ",init_20743,";"], 0));

var G__20744 = cljs.core.next(seq__20713_20734__$1);
var G__20745 = null;
var G__20746 = (0);
var G__20747 = (0);
seq__20713_20721 = G__20744;
chunk__20714_20722 = G__20745;
count__20715_20723 = G__20746;
i__20716_20724 = G__20747;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str.cljs$core$IFn$_invoke$arity$1("$")].join(''));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__20750){
var map__20751 = p__20750;
var map__20751__$1 = ((((!((map__20751 == null)))?((((map__20751.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20751.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20751):map__20751);
var expr = map__20751__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20751__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20751__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20751__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__9427__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__9427__auto__){
var and__9427__auto____$1 = cljs.core.not(new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__9427__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__9427__auto__ = protocol;
if(cljs.core.truth_(and__9427__auto__)){
var and__9427__auto____$1 = tag;
if(cljs.core.truth_(and__9427__auto____$1)){
var or__9439__auto__ = (function (){var and__9427__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__9427__auto____$2){
var and__9427__auto____$3 = protocol;
if(cljs.core.truth_(and__9427__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__9427__auto____$3;
}
} else {
return and__9427__auto____$2;
}
})();
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
var and__9427__auto____$2 = (function (){var or__9439__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(or__9439__auto____$1){
return or__9439__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__9427__auto____$2)){
var or__9439__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__9439__auto____$1){
return or__9439__auto____$1;
} else {
var and__9427__auto____$3 = !(cljs.core.set_QMARK_(tag));
if(and__9427__auto____$3){
var and__9427__auto____$4 = cljs.core.not(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null,new cljs.core.Symbol(null,"object","object",-1179821820,null),null,new cljs.core.Symbol(null,"any","any",-948528346,null),null,new cljs.core.Symbol(null,"js","js",-886355190,null),null,new cljs.core.Symbol(null,"number","number",-1084057331,null),null,new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),null,new cljs.core.Symbol(null,"array","array",-440182315,null),null,new cljs.core.Symbol(null,"string","string",-349010059,null),null,new cljs.core.Symbol(null,"function","function",-486723946,null),null,new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),null], null), null).call(null,tag));
if(and__9427__auto____$4){
var temp__6738__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,tag));
if(cljs.core.truth_(temp__6738__auto__)){
var ps = temp__6738__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps.call(null,protocol));
} else {
return null;
}
} else {
return and__9427__auto____$4;
}
} else {
return and__9427__auto____$3;
}
}
} else {
return and__9427__auto____$2;
}
}
} else {
return and__9427__auto____$1;
}
} else {
return and__9427__auto__;
}
})();
var opt_not_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null)));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__9439__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__9439__auto__){
return or__9439__auto__;
} else {
var temp__6738__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)].join('');
if(cljs.core.truth_(temp__6738__auto__)){
var ns_str = temp__6738__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
}
})():null);
var keyword_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f),new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f) instanceof cljs.core.Keyword));
var vec__20753 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__9427__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__9427__auto__)){
return (arity > mfa);
} else {
return and__9427__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env){
return (function (p1__20748_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20748_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".cljs$core$IFn$_invoke$arity$"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env){
return (function (p1__20749_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20749_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20751,map__20751__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20753,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20753,(1),null);
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["!(",cljs.core.first(args),")"], 0));
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_20756 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1("$arity$"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(args),".",pimpl_20756,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_20757 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_20757,args)),(((mfa_20757 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_20757,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__9439__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
var or__9439__auto____$1 = js_QMARK_;
if(or__9439__auto____$1){
return or__9439__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if((cljs.analyzer._STAR_cljs_static_fns_STAR_) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"var","var",-769682797)))){
var fprop_20758 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(".cljs$core$IFn$_invoke$arity$"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",f__$1,fprop_20758," ? ",f__$1,fprop_20758,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")"], 0));
}

}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__20759){
var map__20760 = p__20759;
var map__20760__$1 = ((((!((map__20760 == null)))?((((map__20760.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20760.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20760):map__20760);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20760__$1,new cljs.core.Keyword(null,"ctor","ctor",1750864802));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20760__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20760__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new ",ctor,"(",cljs.compiler.comma_sep(args),"))"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__20762){
var map__20763 = p__20762;
var map__20763__$1 = ((((!((map__20763 == null)))?((((map__20763.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20763.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20763):map__20763);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20763__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20763__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20763__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target," = ",val], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps){
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set();"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.set();"], 0));
} else {
}

var seq__20777_20789 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(libs)),deps)));
var chunk__20778_20790 = null;
var count__20779_20791 = (0);
var i__20780_20792 = (0);
while(true){
if((i__20780_20792 < count__20779_20791)){
var lib_20793 = chunk__20778_20790.cljs$core$IIndexed$_nth$arity$2(null,i__20780_20792);
if(cljs.core.truth_((function (){var and__9427__auto__ = cljs.analyzer.foreign_dep_QMARK_(lib_20793);
if(and__9427__auto__){
var temp__6738__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.Keyword(null,"options","options",99638489));
if(cljs.core.truth_(temp__6738__auto__)){
var map__20783 = temp__6738__auto__;
var map__20783__$1 = ((((!((map__20783 == null)))?((((map__20783.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20783.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20783):map__20783);
var optimizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
return !(cljs.core.keyword_identical_QMARK_(optimizations,new cljs.core.Keyword(null,"none","none",1333468478)));
} else {
return null;
}
} else {
return and__9427__auto__;
}
})())){
} else {
if(cljs.core.truth_((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20793),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20793),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20793),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20793),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20793),"');"], 0));

}
}
}

var G__20794 = seq__20777_20789;
var G__20795 = chunk__20778_20790;
var G__20796 = count__20779_20791;
var G__20797 = (i__20780_20792 + (1));
seq__20777_20789 = G__20794;
chunk__20778_20790 = G__20795;
count__20779_20791 = G__20796;
i__20780_20792 = G__20797;
continue;
} else {
var temp__6738__auto___20798 = cljs.core.seq(seq__20777_20789);
if(temp__6738__auto___20798){
var seq__20777_20799__$1 = temp__6738__auto___20798;
if(cljs.core.chunked_seq_QMARK_(seq__20777_20799__$1)){
var c__10350__auto___20800 = cljs.core.chunk_first(seq__20777_20799__$1);
var G__20801 = cljs.core.chunk_rest(seq__20777_20799__$1);
var G__20802 = c__10350__auto___20800;
var G__20803 = cljs.core.count(c__10350__auto___20800);
var G__20804 = (0);
seq__20777_20789 = G__20801;
chunk__20778_20790 = G__20802;
count__20779_20791 = G__20803;
i__20780_20792 = G__20804;
continue;
} else {
var lib_20805 = cljs.core.first(seq__20777_20799__$1);
if(cljs.core.truth_((function (){var and__9427__auto__ = cljs.analyzer.foreign_dep_QMARK_(lib_20805);
if(and__9427__auto__){
var temp__6738__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.Keyword(null,"options","options",99638489));
if(cljs.core.truth_(temp__6738__auto____$1)){
var map__20787 = temp__6738__auto____$1;
var map__20787__$1 = ((((!((map__20787 == null)))?((((map__20787.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20787.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20787):map__20787);
var optimizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20787__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
return !(cljs.core.keyword_identical_QMARK_(optimizations,new cljs.core.Keyword(null,"none","none",1333468478)));
} else {
return null;
}
} else {
return and__9427__auto__;
}
})())){
} else {
if(cljs.core.truth_((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20805),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20805),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__9439__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__9439__auto__)){
return or__9439__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20805),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20805),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20805),"');"], 0));

}
}
}

var G__20806 = cljs.core.next(seq__20777_20799__$1);
var G__20807 = null;
var G__20808 = (0);
var G__20809 = (0);
seq__20777_20789 = G__20806;
chunk__20778_20790 = G__20807;
count__20779_20791 = G__20808;
i__20780_20792 = G__20809;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__20810){
var map__20811 = p__20810;
var map__20811__$1 = ((((!((map__20811 == null)))?((((map__20811.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20811.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20811):map__20811);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20811__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps);

return cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__20813){
var map__20814 = p__20813;
var map__20814__$1 = ((((!((map__20814 == null)))?((((map__20814.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20814.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20814):map__20814);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20814__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('cljs.core');"], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');"], 0));
} else {
}
}

cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps);

return cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"deftype*","deftype*",-677871637),(function (p__20816){
var map__20817 = p__20816;
var map__20817__$1 = ((((!((map__20817 == null)))?((((map__20817.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20817.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20817):map__20817);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20817__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20817__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20817__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20817__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20817__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__20819_20837 = cljs.core.seq(protocols);
var chunk__20820_20838 = null;
var count__20821_20839 = (0);
var i__20822_20840 = (0);
while(true){
if((i__20822_20840 < count__20821_20839)){
var protocol_20841 = chunk__20820_20838.cljs$core$IIndexed$_nth$arity$2(null,i__20822_20840);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_20841)].join('')),"}"], 0));

var G__20842 = seq__20819_20837;
var G__20843 = chunk__20820_20838;
var G__20844 = count__20821_20839;
var G__20845 = (i__20822_20840 + (1));
seq__20819_20837 = G__20842;
chunk__20820_20838 = G__20843;
count__20821_20839 = G__20844;
i__20822_20840 = G__20845;
continue;
} else {
var temp__6738__auto___20846 = cljs.core.seq(seq__20819_20837);
if(temp__6738__auto___20846){
var seq__20819_20847__$1 = temp__6738__auto___20846;
if(cljs.core.chunked_seq_QMARK_(seq__20819_20847__$1)){
var c__10350__auto___20848 = cljs.core.chunk_first(seq__20819_20847__$1);
var G__20849 = cljs.core.chunk_rest(seq__20819_20847__$1);
var G__20850 = c__10350__auto___20848;
var G__20851 = cljs.core.count(c__10350__auto___20848);
var G__20852 = (0);
seq__20819_20837 = G__20849;
chunk__20820_20838 = G__20850;
count__20821_20839 = G__20851;
i__20822_20840 = G__20852;
continue;
} else {
var protocol_20853 = cljs.core.first(seq__20819_20847__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_20853)].join('')),"}"], 0));

var G__20854 = cljs.core.next(seq__20819_20847__$1);
var G__20855 = null;
var G__20856 = (0);
var G__20857 = (0);
seq__20819_20837 = G__20854;
chunk__20820_20838 = G__20855;
count__20821_20839 = G__20856;
i__20822_20840 = G__20857;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__20823_20858 = cljs.core.seq(fields__$1);
var chunk__20824_20859 = null;
var count__20825_20860 = (0);
var i__20826_20861 = (0);
while(true){
if((i__20826_20861 < count__20825_20860)){
var fld_20862 = chunk__20824_20859.cljs$core$IIndexed$_nth$arity$2(null,i__20826_20861);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_20862," = ",fld_20862,";"], 0));

var G__20863 = seq__20823_20858;
var G__20864 = chunk__20824_20859;
var G__20865 = count__20825_20860;
var G__20866 = (i__20826_20861 + (1));
seq__20823_20858 = G__20863;
chunk__20824_20859 = G__20864;
count__20825_20860 = G__20865;
i__20826_20861 = G__20866;
continue;
} else {
var temp__6738__auto___20867 = cljs.core.seq(seq__20823_20858);
if(temp__6738__auto___20867){
var seq__20823_20868__$1 = temp__6738__auto___20867;
if(cljs.core.chunked_seq_QMARK_(seq__20823_20868__$1)){
var c__10350__auto___20869 = cljs.core.chunk_first(seq__20823_20868__$1);
var G__20870 = cljs.core.chunk_rest(seq__20823_20868__$1);
var G__20871 = c__10350__auto___20869;
var G__20872 = cljs.core.count(c__10350__auto___20869);
var G__20873 = (0);
seq__20823_20858 = G__20870;
chunk__20824_20859 = G__20871;
count__20825_20860 = G__20872;
i__20826_20861 = G__20873;
continue;
} else {
var fld_20874 = cljs.core.first(seq__20823_20868__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_20874," = ",fld_20874,";"], 0));

var G__20875 = cljs.core.next(seq__20823_20868__$1);
var G__20876 = null;
var G__20877 = (0);
var G__20878 = (0);
seq__20823_20858 = G__20875;
chunk__20824_20859 = G__20876;
count__20825_20860 = G__20877;
i__20826_20861 = G__20878;
continue;
}
} else {
}
}
break;
}

var seq__20827_20879 = cljs.core.seq(pmasks);
var chunk__20828_20880 = null;
var count__20829_20881 = (0);
var i__20830_20882 = (0);
while(true){
if((i__20830_20882 < count__20829_20881)){
var vec__20831_20883 = chunk__20828_20880.cljs$core$IIndexed$_nth$arity$2(null,i__20830_20882);
var pno_20884 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20831_20883,(0),null);
var pmask_20885 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20831_20883,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_20884,"$ = ",pmask_20885,";"], 0));

var G__20886 = seq__20827_20879;
var G__20887 = chunk__20828_20880;
var G__20888 = count__20829_20881;
var G__20889 = (i__20830_20882 + (1));
seq__20827_20879 = G__20886;
chunk__20828_20880 = G__20887;
count__20829_20881 = G__20888;
i__20830_20882 = G__20889;
continue;
} else {
var temp__6738__auto___20890 = cljs.core.seq(seq__20827_20879);
if(temp__6738__auto___20890){
var seq__20827_20891__$1 = temp__6738__auto___20890;
if(cljs.core.chunked_seq_QMARK_(seq__20827_20891__$1)){
var c__10350__auto___20892 = cljs.core.chunk_first(seq__20827_20891__$1);
var G__20893 = cljs.core.chunk_rest(seq__20827_20891__$1);
var G__20894 = c__10350__auto___20892;
var G__20895 = cljs.core.count(c__10350__auto___20892);
var G__20896 = (0);
seq__20827_20879 = G__20893;
chunk__20828_20880 = G__20894;
count__20829_20881 = G__20895;
i__20830_20882 = G__20896;
continue;
} else {
var vec__20834_20897 = cljs.core.first(seq__20827_20891__$1);
var pno_20898 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20834_20897,(0),null);
var pmask_20899 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20834_20897,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_20898,"$ = ",pmask_20899,";"], 0));

var G__20900 = cljs.core.next(seq__20827_20891__$1);
var G__20901 = null;
var G__20902 = (0);
var G__20903 = (0);
seq__20827_20879 = G__20900;
chunk__20828_20880 = G__20901;
count__20829_20881 = G__20902;
i__20830_20882 = G__20903;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"defrecord*","defrecord*",718069562),(function (p__20904){
var map__20905 = p__20904;
var map__20905__$1 = ((((!((map__20905 == null)))?((((map__20905.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20905.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20905):map__20905);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20905__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20905__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20905__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20905__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20905__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__20907_20925 = cljs.core.seq(protocols);
var chunk__20908_20926 = null;
var count__20909_20927 = (0);
var i__20910_20928 = (0);
while(true){
if((i__20910_20928 < count__20909_20927)){
var protocol_20929 = chunk__20908_20926.cljs$core$IIndexed$_nth$arity$2(null,i__20910_20928);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_20929)].join('')),"}"], 0));

var G__20930 = seq__20907_20925;
var G__20931 = chunk__20908_20926;
var G__20932 = count__20909_20927;
var G__20933 = (i__20910_20928 + (1));
seq__20907_20925 = G__20930;
chunk__20908_20926 = G__20931;
count__20909_20927 = G__20932;
i__20910_20928 = G__20933;
continue;
} else {
var temp__6738__auto___20934 = cljs.core.seq(seq__20907_20925);
if(temp__6738__auto___20934){
var seq__20907_20935__$1 = temp__6738__auto___20934;
if(cljs.core.chunked_seq_QMARK_(seq__20907_20935__$1)){
var c__10350__auto___20936 = cljs.core.chunk_first(seq__20907_20935__$1);
var G__20937 = cljs.core.chunk_rest(seq__20907_20935__$1);
var G__20938 = c__10350__auto___20936;
var G__20939 = cljs.core.count(c__10350__auto___20936);
var G__20940 = (0);
seq__20907_20925 = G__20937;
chunk__20908_20926 = G__20938;
count__20909_20927 = G__20939;
i__20910_20928 = G__20940;
continue;
} else {
var protocol_20941 = cljs.core.first(seq__20907_20935__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_20941)].join('')),"}"], 0));

var G__20942 = cljs.core.next(seq__20907_20935__$1);
var G__20943 = null;
var G__20944 = (0);
var G__20945 = (0);
seq__20907_20925 = G__20942;
chunk__20908_20926 = G__20943;
count__20909_20927 = G__20944;
i__20910_20928 = G__20945;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__20911_20946 = cljs.core.seq(fields__$1);
var chunk__20912_20947 = null;
var count__20913_20948 = (0);
var i__20914_20949 = (0);
while(true){
if((i__20914_20949 < count__20913_20948)){
var fld_20950 = chunk__20912_20947.cljs$core$IIndexed$_nth$arity$2(null,i__20914_20949);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_20950," = ",fld_20950,";"], 0));

var G__20951 = seq__20911_20946;
var G__20952 = chunk__20912_20947;
var G__20953 = count__20913_20948;
var G__20954 = (i__20914_20949 + (1));
seq__20911_20946 = G__20951;
chunk__20912_20947 = G__20952;
count__20913_20948 = G__20953;
i__20914_20949 = G__20954;
continue;
} else {
var temp__6738__auto___20955 = cljs.core.seq(seq__20911_20946);
if(temp__6738__auto___20955){
var seq__20911_20956__$1 = temp__6738__auto___20955;
if(cljs.core.chunked_seq_QMARK_(seq__20911_20956__$1)){
var c__10350__auto___20957 = cljs.core.chunk_first(seq__20911_20956__$1);
var G__20958 = cljs.core.chunk_rest(seq__20911_20956__$1);
var G__20959 = c__10350__auto___20957;
var G__20960 = cljs.core.count(c__10350__auto___20957);
var G__20961 = (0);
seq__20911_20946 = G__20958;
chunk__20912_20947 = G__20959;
count__20913_20948 = G__20960;
i__20914_20949 = G__20961;
continue;
} else {
var fld_20962 = cljs.core.first(seq__20911_20956__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_20962," = ",fld_20962,";"], 0));

var G__20963 = cljs.core.next(seq__20911_20956__$1);
var G__20964 = null;
var G__20965 = (0);
var G__20966 = (0);
seq__20911_20946 = G__20963;
chunk__20912_20947 = G__20964;
count__20913_20948 = G__20965;
i__20914_20949 = G__20966;
continue;
}
} else {
}
}
break;
}

var seq__20915_20967 = cljs.core.seq(pmasks);
var chunk__20916_20968 = null;
var count__20917_20969 = (0);
var i__20918_20970 = (0);
while(true){
if((i__20918_20970 < count__20917_20969)){
var vec__20919_20971 = chunk__20916_20968.cljs$core$IIndexed$_nth$arity$2(null,i__20918_20970);
var pno_20972 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20919_20971,(0),null);
var pmask_20973 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20919_20971,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_20972,"$ = ",pmask_20973,";"], 0));

var G__20974 = seq__20915_20967;
var G__20975 = chunk__20916_20968;
var G__20976 = count__20917_20969;
var G__20977 = (i__20918_20970 + (1));
seq__20915_20967 = G__20974;
chunk__20916_20968 = G__20975;
count__20917_20969 = G__20976;
i__20918_20970 = G__20977;
continue;
} else {
var temp__6738__auto___20978 = cljs.core.seq(seq__20915_20967);
if(temp__6738__auto___20978){
var seq__20915_20979__$1 = temp__6738__auto___20978;
if(cljs.core.chunked_seq_QMARK_(seq__20915_20979__$1)){
var c__10350__auto___20980 = cljs.core.chunk_first(seq__20915_20979__$1);
var G__20981 = cljs.core.chunk_rest(seq__20915_20979__$1);
var G__20982 = c__10350__auto___20980;
var G__20983 = cljs.core.count(c__10350__auto___20980);
var G__20984 = (0);
seq__20915_20967 = G__20981;
chunk__20916_20968 = G__20982;
count__20917_20969 = G__20983;
i__20918_20970 = G__20984;
continue;
} else {
var vec__20922_20985 = cljs.core.first(seq__20915_20979__$1);
var pno_20986 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20922_20985,(0),null);
var pmask_20987 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20922_20985,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_20986,"$ = ",pmask_20987,";"], 0));

var G__20988 = cljs.core.next(seq__20915_20979__$1);
var G__20989 = null;
var G__20990 = (0);
var G__20991 = (0);
seq__20915_20967 = G__20988;
chunk__20916_20968 = G__20989;
count__20917_20969 = G__20990;
i__20918_20970 = G__20991;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"dot","dot",1442709401),(function (p__20992){
var map__20993 = p__20992;
var map__20993__$1 = ((((!((map__20993 == null)))?((((map__20993.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20993.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20993):map__20993);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY)], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__20995){
var map__20996 = p__20995;
var map__20996__$1 = ((((!((map__20996 == null)))?((((map__20996.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20996.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20996):map__20996);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20996__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20996__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20996__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20996__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20996__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__9427__auto__ = code;
if(cljs.core.truth_(and__9427__auto__)){
var G__20998 = clojure.string.trim(code);
var G__20999 = "/*";
return goog.string.startsWith(G__20998,G__20999);
} else {
return and__9427__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
var env__19595__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null)))], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19595__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.build_affecting_options = (function cljs$compiler$build_affecting_options(opts){
return cljs.core.select_keys(opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518),new cljs.core.Keyword(null,"elide-asserts","elide-asserts",537063272),new cljs.core.Keyword(null,"target","target",253001721)], null));
});
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('cljs.core');"], 0));

var seq__21013 = cljs.core.seq(table);
var chunk__21014 = null;
var count__21015 = (0);
var i__21016 = (0);
while(true){
if((i__21016 < count__21015)){
var vec__21017 = chunk__21014.cljs$core$IIndexed$_nth$arity$2(null,i__21016);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21017,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21017,(1),null);
var ns_21023 = cljs.core.namespace(sym);
var name_21024 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Cannot emit constant for type "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__21025 = seq__21013;
var G__21026 = chunk__21014;
var G__21027 = count__21015;
var G__21028 = (i__21016 + (1));
seq__21013 = G__21025;
chunk__21014 = G__21026;
count__21015 = G__21027;
i__21016 = G__21028;
continue;
} else {
var temp__6738__auto__ = cljs.core.seq(seq__21013);
if(temp__6738__auto__){
var seq__21013__$1 = temp__6738__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21013__$1)){
var c__10350__auto__ = cljs.core.chunk_first(seq__21013__$1);
var G__21029 = cljs.core.chunk_rest(seq__21013__$1);
var G__21030 = c__10350__auto__;
var G__21031 = cljs.core.count(c__10350__auto__);
var G__21032 = (0);
seq__21013 = G__21029;
chunk__21014 = G__21030;
count__21015 = G__21031;
i__21016 = G__21032;
continue;
} else {
var vec__21020 = cljs.core.first(seq__21013__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21020,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21020,(1),null);
var ns_21033 = cljs.core.namespace(sym);
var name_21034 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Cannot emit constant for type "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__21035 = cljs.core.next(seq__21013__$1);
var G__21036 = null;
var G__21037 = (0);
var G__21038 = (0);
seq__21013 = G__21035;
chunk__21014 = G__21036;
count__21015 = G__21037;
i__21016 = G__21038;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var args21039 = [];
var len__10660__auto___21046 = arguments.length;
var i__10661__auto___21047 = (0);
while(true){
if((i__10661__auto___21047 < len__10660__auto___21046)){
args21039.push((arguments[i__10661__auto___21047]));

var G__21048 = (i__10661__auto___21047 + (1));
i__10661__auto___21047 = G__21048;
continue;
} else {
}
break;
}

var G__21041 = args21039.length;
switch (G__21041) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args21039.length)].join('')));

}
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(cljs.core.PersistentVector.EMPTY,externs,(function (){var G__21042 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__21042) : cljs.core.atom.call(null,G__21042));
})(),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?new cljs.core.Keyword("cljs.analyzer","externs","cljs.analyzer/externs",893359239).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))):null));
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq(cljs.core.keys(externs));
while(true){
if(ks){
var k_21050 = cljs.core.first(ks);
var vec__21043_21051 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(prefix,k_21050);
var top_21052 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21043_21051,(0),null);
var prefix_SINGLEQUOTE__21053 = vec__21043_21051;
if((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_21050)) && ((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(known_externs,prefix_SINGLEQUOTE__21053) == null))){
if(!((cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(top_level) : cljs.core.deref.call(null,top_level)),top_21052)) || (cljs.core.contains_QMARK_(known_externs,top_21052)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__21053)),";"], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(top_level,cljs.core.conj,top_21052);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__21053)),";"], 0));
}
} else {
}

var m_21054 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(externs,k_21050);
if(cljs.core.empty_QMARK_(m_21054)){
} else {
cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(prefix_SINGLEQUOTE__21053,m_21054,top_level,known_externs);
}

var G__21055 = cljs.core.next(ks);
ks = G__21055;
continue;
} else {
return null;
}
break;
}
});

cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4;

