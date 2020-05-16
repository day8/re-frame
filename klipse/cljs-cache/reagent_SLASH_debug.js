// Compiled by ClojureScript 1.10.597
goog.provide("reagent.debug");
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__273__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",(-436710552))], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__273 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__274__i = 0, G__274__a = new Array(arguments.length -  0);
while (G__274__i < G__274__a.length) {G__274__a[G__274__i] = arguments[G__274__i + 0]; ++G__274__i;}
  args = new cljs.core.IndexedSeq(G__274__a,0,null);
} 
return G__273__delegate.call(this,args);};
G__273.cljs$lang$maxFixedArity = 0;
G__273.cljs$lang$applyTo = (function (arglist__275){
var args = cljs.core.seq(arglist__275);
return G__273__delegate(args);
});
G__273.cljs$core$IFn$_invoke$arity$variadic = G__273__delegate;
return G__273;
})()
);

(o.error = (function() { 
var G__276__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",(-978969032))], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__276 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__277__i = 0, G__277__a = new Array(arguments.length -  0);
while (G__277__i < G__277__a.length) {G__277__a[G__277__i] = arguments[G__277__i + 0]; ++G__277__i;}
  args = new cljs.core.IndexedSeq(G__277__a,0,null);
} 
return G__276__delegate.call(this,args);};
G__276.cljs$lang$maxFixedArity = 0;
G__276.cljs$lang$applyTo = (function (arglist__278){
var args = cljs.core.seq(arglist__278);
return G__276__delegate(args);
});
G__276.cljs$core$IFn$_invoke$arity$variadic = G__276__delegate;
return G__276;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceURL=reagent/debug.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiZGVidWcuY2xqcyJdLCJsaW5lQ291bnQiOjc0LCJtYXBwaW5ncyI6IjtBQUdBLEFBQWFBLDRCQUFZLFFBQUFDO0FBRXpCLHlCQUFBLHpCQUFjQztBQUVkLEdBQUEsUUFBQUMsb0NBQUFDLDBDQUFBQztBQUFBO0FBQUEsQUFBQSxBQUFTQyx5QkFBUyx5QkFBQSx6QkFBQ0M7O0FBRW5CLEdBQUEsUUFBQUosb0NBQUFDLDBDQUFBSTtBQUFBO0FBQUEsQUFBQSxBQUFTQyw4QkFDUCxxQkFBQSxKQUFNQztBQUFOLEFBQ0UsQ0FBTSxBQUFRQSxTQUNSO2lDQUFPQztBQUFQLEFBQ0UsaUZBQUEsbUZBQUEsN0pBQUNDLCtCQUFNTix1QkFBU08sc0tBQWtCQyxlQUFLLEFBQUNDLDBCQUFNQyxjQUFJTDs7O0lBRDdDQTs7OztFQUFBQTs7a0NBQUFBOzs7SUFBQUE7d0JBQUFBOzs7Ozs7O0FBRWIsQ0FBTSxBQUFTRCxVQUNUO2lDQUFPQztBQUFQLEFBQ0UsaUZBQUEsbUZBQUEsN0pBQUNDLCtCQUFNTix1QkFBU08sd0tBQW1CQyxlQUFLLEFBQUNDLDBCQUFNQyxjQUFJTDs7O0lBRDlDQTs7OztFQUFBQTs7a0NBQUFBOzs7SUFBQUE7d0JBQUFBOzs7Ozs7O0FBRWJEOzs7QUFFSiwrQkFBQSwvQkFBTU8sc0VBQWdCQztBQUF0QixBQUNFLDBCQUFBLHpCQUFNaEI7O0FBQ04sdURBQUEsdkRBQUNpQixnQ0FBT2I7O0FBQ1IsQUFBQ1k7O0FBQ0QsWUFBQSxBQUFBRSxSQUFNQyxrQ0FBT2Y7QUFBYixBQUNFLHVEQUFBLHZEQUFDYSxnQ0FBT2I7O0FBQ1IsMEJBQUEsekJBQU1KOztBQUNObUIiLCJuYW1lcyI6WyJyZWFnZW50LmRlYnVnL2hhcy1jb25zb2xlIiwianMvY29uc29sZSIsInJlYWdlbnQuZGVidWcvdHJhY2tpbmciLCJqcy9yZWFnZW50IiwianMvcmVhZ2VudC5kZWJ1ZyIsImpzL3JlYWdlbnQuZGVidWcud2FybmluZ3MiLCJyZWFnZW50LmRlYnVnL3dhcm5pbmdzIiwiY2xqcy5jb3JlL2F0b20iLCJqcy9yZWFnZW50LmRlYnVnLnRyYWNrLWNvbnNvbGUiLCJyZWFnZW50LmRlYnVnL3RyYWNrLWNvbnNvbGUiLCJvIiwiYXJncyIsImNsanMuY29yZS9zd2FwISIsImNsanMuY29yZS91cGRhdGUtaW4iLCJjbGpzLmNvcmUvY29uaiIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9zdHIiLCJyZWFnZW50LmRlYnVnL3RyYWNrLXdhcm5pbmdzIiwiZiIsImNsanMuY29yZS9yZXNldCEiLCJjbGpzLmNvcmUvZGVyZWYiLCJ3YXJucyJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgcmVhZ2VudC5kZWJ1Z1xuICAoOnJlcXVpcmUtbWFjcm9zIFtyZWFnZW50LmRlYnVnXSkpXG5cbihkZWYgXjpjb25zdCBoYXMtY29uc29sZSAoZXhpc3RzPyBqcy9jb25zb2xlKSlcblxuKGRlZiBeYm9vbGVhbiB0cmFja2luZyBmYWxzZSlcblxuKGRlZm9uY2Ugd2FybmluZ3MgKGF0b20gbmlsKSlcblxuKGRlZm9uY2UgdHJhY2stY29uc29sZVxuICAobGV0IFtvICNqc3t9XVxuICAgIChzZXQhICguLXdhcm4gbylcbiAgICAgICAgICAoZm4gWyYgYXJnc11cbiAgICAgICAgICAgIChzd2FwISB3YXJuaW5ncyB1cGRhdGUtaW4gWzp3YXJuXSBjb25qIChhcHBseSBzdHIgYXJncykpKSlcbiAgICAoc2V0ISAoLi1lcnJvciBvKVxuICAgICAgICAgIChmbiBbJiBhcmdzXVxuICAgICAgICAgICAgKHN3YXAhIHdhcm5pbmdzIHVwZGF0ZS1pbiBbOmVycm9yXSBjb25qIChhcHBseSBzdHIgYXJncykpKSlcbiAgICBvKSlcblxuKGRlZm4gdHJhY2std2FybmluZ3MgW2ZdXG4gIChzZXQhIHRyYWNraW5nIHRydWUpXG4gIChyZXNldCEgd2FybmluZ3MgbmlsKVxuICAoZilcbiAgKGxldCBbd2FybnMgQHdhcm5pbmdzXVxuICAgIChyZXNldCEgd2FybmluZ3MgbmlsKVxuICAgIChzZXQhIHRyYWNraW5nIGZhbHNlKVxuICAgIHdhcm5zKSlcbiJdfQ==