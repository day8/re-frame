// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('cljs.source_map.base64');
goog.require('cljs.core');
cljs.source_map.base64.chars64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
cljs.source_map.base64.char__GT_int = cljs.core.zipmap(cljs.source_map.base64.chars64,cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),(64)));
cljs.source_map.base64.int__GT_char = cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),(64)),cljs.source_map.base64.chars64);
cljs.source_map.base64.encode = (function cljs$source_map$base64$encode(n){
var e = cljs.core.find(cljs.source_map.base64.int__GT_char,n);
if(cljs.core.truth_(e)){
return cljs.core.second(e);
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Must be between 0 and 63: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')));
}
});
cljs.source_map.base64.decode = (function cljs$source_map$base64$decode(c){
var e = cljs.core.find(cljs.source_map.base64.char__GT_int,c);
if(cljs.core.truth_(e)){
return cljs.core.second(e);
} else {
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Not a valid base 64 digit: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')));
}
});
