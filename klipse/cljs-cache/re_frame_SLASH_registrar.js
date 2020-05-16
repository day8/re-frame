// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.registrar");
re_frame.registrar.kinds = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"event","event",(301435442)),null,new cljs.core.Keyword(null,"fx","fx",(-1237829572)),null,new cljs.core.Keyword(null,"cofx","cofx",(2013202907)),null,new cljs.core.Keyword(null,"sub","sub",(-2093760025)),null], null), null);
re_frame.registrar.kind__GT_id__GT_handler = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
re_frame.registrar.get_handler = (function re_frame$registrar$get_handler(var_args){
var G__656 = arguments.length;
switch (G__656) {
case (1):
return re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$1 = (function (kind){
return cljs.core.get.call(null,cljs.core.deref.call(null,re_frame.registrar.kind__GT_id__GT_handler),kind);
}));

(re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2 = (function (kind,id){
return cljs.core.get.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,re_frame.registrar.kind__GT_id__GT_handler),kind),id);
}));

(re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3 = (function (kind,id,required_QMARK_){
var handler = re_frame.registrar.get_handler.call(null,kind,id);
if(re_frame.interop.debug_enabled_QMARK_){
if(cljs.core.truth_((function (){var and__10090__auto__ = required_QMARK_;
if(cljs.core.truth_(and__10090__auto__)){
return (handler == null);
} else {
return and__10090__auto__;
}
})())){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"re-frame: no",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kind),"handler registered for:",id);
} else {
}
} else {
}

return handler;
}));

(re_frame.registrar.get_handler.cljs$lang$maxFixedArity = (3));

re_frame.registrar.register_handler = (function re_frame$registrar$register_handler(kind,id,handler_fn){
if(re_frame.interop.debug_enabled_QMARK_){
if(cljs.core.truth_(re_frame.registrar.get_handler.call(null,kind,id,false))){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: overwriting",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kind),"handler for:",id);
} else {
}
} else {
}

cljs.core.swap_BANG_.call(null,re_frame.registrar.kind__GT_id__GT_handler,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kind,id], null),handler_fn);

return handler_fn;
});
re_frame.registrar.clear_handlers = (function re_frame$registrar$clear_handlers(var_args){
var G__659 = arguments.length;
switch (G__659) {
case (0):
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$0();

break;
case (1):
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.reset_BANG_.call(null,re_frame.registrar.kind__GT_id__GT_handler,cljs.core.PersistentArrayMap.EMPTY);
}));

(re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1 = (function (kind){
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,kind))){
} else {
throw (new Error("Assert failed: (kinds kind)"));
}

return cljs.core.swap_BANG_.call(null,re_frame.registrar.kind__GT_id__GT_handler,cljs.core.dissoc,kind);
}));

(re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2 = (function (kind,id){
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,kind))){
} else {
throw (new Error("Assert failed: (kinds kind)"));
}

if(cljs.core.truth_(re_frame.registrar.get_handler.call(null,kind,id))){
return cljs.core.swap_BANG_.call(null,re_frame.registrar.kind__GT_id__GT_handler,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kind], null),cljs.core.dissoc,id);
} else {
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"warn","warn",(-436710552)),"re-frame: can't clear",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kind),"handler for",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(id),". Handler not found."].join(''));
}
}));

(re_frame.registrar.clear_handlers.cljs$lang$maxFixedArity = (2));


//# sourceURL=re_frame/registrar.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvcmVnaXN0cmFyLmpzIiwic291cmNlcyI6WyJyZWdpc3RyYXIuY2xqcyJdLCJsaW5lQ291bnQiOjExOCwibWFwcGluZ3MiOiI7QUFTQSwyQkFBQSxpRkFBQSw2REFBQSx5REFBQSw0REFBQSw5UkFBS0E7QUFLTCxBQUFLQyw2Q0FBbUIseUJBQUEsekJBQUNDO0FBR3pCLEFBQUEsaUNBQUEseUNBQUFDLDFFQUFNRTtBQUFOLEFBQUEsSUFBQUQsU0FBQSxBQUFBO0FBQUEsQUFBQSxRQUFBQTtLQUFBO0FBQUEsT0FBQUMsNkRBQUEsQ0FBQSxVQUFBOzs7S0FBQTtBQUFBLE9BQUFBLDZEQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQTs7O0tBQUE7QUFBQSxPQUFBQSw2REFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUE7Ozs7QUFBQSxNQUFBLEtBQUFDLE1BQUEsQ0FBQSw4REFBQSxBQUFBOzs7OztBQUFBLENBQUEsK0RBQUEsL0RBQU1ELDBFQUVGRTtBQUZKLEFBR0csK0JBQUEsQUFBQUMseEJBQUNDLGtEQUFLUiw0Q0FBa0JNOzs7QUFIM0IsQ0FBQSwrREFBQSwvREFBTUYsMEVBS0ZFLEtBQUtHO0FBTFQsK0JBTU8sd0JBQUEsQUFBQUYseEJBQUNDLGtEQUFLUiw0Q0FBa0JNLDdIQUN4QixPQUFDRSw0SEFBSUM7OztBQVBaLENBQUEsK0RBQUEsL0RBQU1MLDBFQVNGRSxLQUFLRyxHQUFHQztBQVRaLEFBVUcsSUFBTUMsVUFBUSxBQUFDUCx5Q0FBWUUsS0FBS0c7QUFBaEMsQUFDRSxHQUFNRztBQUFOLEFBQ0Usb0JBQU0saUJBQUFDLHFCQUFLSDtBQUFMLEFBQUEsb0JBQUFHO0FBQWUsbUJBQUEsWEFBTUY7O0FBQXJCRTs7O0FBQU4sQUFDRSxtQ0FBQSx5REFBQSxpRUFBQSw3SkFBQ0MsMkdBQThCLDRDQUFLUixnQ0FBZ0NHOztBQUR0RTs7QUFERjs7QUFHQUU7OztBQWRMLENBQUEseURBQUEsekRBQU1QOztBQUFOLEFBaUJBLHNDQUFBLHRDQUFNVyxvRkFDSFQsS0FBS0csR0FBR087QUFEWCxBQUVFLEdBQU1KO0FBQU4sQUFDRSxvQkFBTSxpREFBQSxqREFBQ1IseUNBQVlFLEtBQUtHO0FBQXhCLEFBQ0UsbUNBQUEsdURBQUEsMEVBQUEscEtBQUNLLGtIQUFzQyw0Q0FBS1IscUJBQXFCRzs7QUFEbkU7O0FBREY7O0FBR0EsNkZBQUEsN0ZBQUNRLCtCQUFNakIsMkNBQWtCa0Isc0dBQVVaLEtBQUtHLFdBQUlPOztBQUM1Q0E7O0FBR0YsQUFBQSxvQ0FBQSw0Q0FBQWQsaEZBQU1rQjtBQUFOLEFBQUEsSUFBQUQsU0FBQSxBQUFBO0FBQUEsQUFBQSxRQUFBQTtLQUFBO0FBQUEsT0FBQUM7OztLQUFBO0FBQUEsT0FBQUEsZ0VBQUEsQ0FBQSxVQUFBOzs7S0FBQTtBQUFBLE9BQUFBLGdFQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQTs7OztBQUFBLE1BQUEsS0FBQWYsTUFBQSxDQUFBLDhEQUFBLEFBQUE7Ozs7O0FBQUEsQ0FBQSxrRUFBQSxsRUFBTWU7QUFBTixBQUVHLGtGQUFBLDNFQUFDQyxnQ0FBT3JCOzs7QUFGWCxDQUFBLGtFQUFBLGxFQUFNb0IsNkVBSUZkO0FBSkosQUFLRyxvQkFBUSxBQUFDUCxtQ0FBTU87QUFBZjtBQUFBLEFBQUEsTUFBQSxLQUFBRCxNQUFBOzs7QUFDQSxPQUFDWSwrQkFBTWpCLDJDQUFrQnNCLGlCQUFPaEI7OztBQU5uQyxDQUFBLGtFQUFBLGxFQUFNYyw2RUFRRmQsS0FBS0c7QUFSVCxBQVNHLG9CQUFRLEFBQUNWLG1DQUFNTztBQUFmO0FBQUEsQUFBQSxNQUFBLEtBQUFELE1BQUE7OztBQUNBLG9CQUFJLEFBQUNELHlDQUFZRSxLQUFLRztBQUNwQixxR0FBQSw5RkFBQ1EsK0JBQU1qQiwyQ0FBa0J1Qix1R0FBV2pCLGFBQU1nQixpQkFBT2I7O0FBQ2pELDBDQUFBLHVEQUFBLDBFQUFBLHBLQUFDSyxrSEFBc0MsNENBQUtSLG9CQUFvQixpREFBQSxKQUFLRzs7OztBQVoxRSxDQUFBLDREQUFBLDVEQUFNVzs7QUFBTiIsIm5hbWVzIjpbInJlLWZyYW1lLnJlZ2lzdHJhci9raW5kcyIsInJlLWZyYW1lLnJlZ2lzdHJhci9raW5kLT5pZC0+aGFuZGxlciIsImNsanMuY29yZS9hdG9tIiwidmFyX2FyZ3MiLCJHX182NTYiLCJyZS1mcmFtZS5yZWdpc3RyYXIvZ2V0LWhhbmRsZXIiLCJqcy9FcnJvciIsImtpbmQiLCJjbGpzLmNvcmUvZGVyZWYiLCJjbGpzLmNvcmUvZ2V0IiwiaWQiLCJyZXF1aXJlZD8iLCJoYW5kbGVyIiwicmUtZnJhbWUuaW50ZXJvcC9kZWJ1Zy1lbmFibGVkPyIsImFuZF9fMTAwOTBfX2F1dG9fXyIsInJlLWZyYW1lLmxvZ2dlcnMvY29uc29sZSIsInJlLWZyYW1lLnJlZ2lzdHJhci9yZWdpc3Rlci1oYW5kbGVyIiwiaGFuZGxlci1mbiIsImNsanMuY29yZS9zd2FwISIsImNsanMuY29yZS9hc3NvYy1pbiIsIkdfXzY1OSIsInJlLWZyYW1lLnJlZ2lzdHJhci9jbGVhci1oYW5kbGVycyIsImNsanMuY29yZS9yZXNldCEiLCJjbGpzLmNvcmUvZGlzc29jIiwiY2xqcy5jb3JlL3VwZGF0ZS1pbiJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgcmUtZnJhbWUucmVnaXN0cmFyXG4gIFwiSW4gbWFueSBwbGFjZXMsIHJlLWZyYW1lIGFza3MgeW91IHRvIGFzc29jaWF0ZSBhbiBgaWRgIChrZXl3b3JkKVxuICB3aXRoIGEgYGhhbmRsZXJgIChmdW5jdGlvbikuICBUaGlzIG5hbWVzcGFjZSBjb250YWlucyB0aGVcbiAgY2VudHJhbCByZWdpc3RyeSBvZiBzdWNoIGFzc29jaWF0aW9ucy5cIlxuICAoOnJlcXVpcmUgIFtyZS1mcmFtZS5pbnRlcm9wIDpyZWZlciBbZGVidWctZW5hYmxlZD9dXVxuICAgICAgICAgICAgIFtyZS1mcmFtZS5sb2dnZXJzIDpyZWZlciBbY29uc29sZV1dKSlcblxuXG47OyBraW5kcyBvZiBoYW5kbGVyc1xuKGRlZiBraW5kcyAjezpldmVudCA6ZnggOmNvZnggOnN1Yn0pXG5cbjs7IFRoaXMgYXRvbSBjb250YWlucyBhIHJlZ2lzdGVyIG9mIGFsbCBoYW5kbGVycy5cbjs7IENvbnRhaW5zIGEgdHdvIGxheWVyIG1hcCwga2V5ZWQgZmlyc3QgYnkgYGtpbmRgIChvZiBoYW5kbGVyKSwgYW5kIHRoZW4gYGlkYCBvZiBoYW5kbGVyLlxuOzsgTGVhZiBub2RlcyBhcmUgaGFuZGxlcnMuXG4oZGVmIGtpbmQtPmlkLT5oYW5kbGVyICAoYXRvbSB7fSkpXG5cblxuKGRlZm4gZ2V0LWhhbmRsZXJcblxuICAoW2tpbmRdXG4gICAoZ2V0IEBraW5kLT5pZC0+aGFuZGxlciBraW5kKSlcblxuICAoW2tpbmQgaWRdXG4gICAoLT4gKGdldCBAa2luZC0+aWQtPmhhbmRsZXIga2luZClcbiAgICAgICAoZ2V0IGlkKSkpXG5cbiAgKFtraW5kIGlkIHJlcXVpcmVkP11cbiAgIChsZXQgW2hhbmRsZXIgKGdldC1oYW5kbGVyIGtpbmQgaWQpXVxuICAgICAod2hlbiBkZWJ1Zy1lbmFibGVkPyAgICAgICAgICAgICAgICAgICAgICAgICAgOzsgVGhpcyBpcyBpbiBhIHNlcGFyYXRlIGB3aGVuYCBzbyBDbG9zdXJlIERDRSBjYW4gcnVuIC4uLlxuICAgICAgICh3aGVuIChhbmQgcmVxdWlyZWQ/IChuaWw/IGhhbmRsZXIpKSAgICAgICAgOzsgLi4ub3RoZXJ3aXNlIHlvdSdkIG5lZWQgdG8gdHlwZS1oaW50IHRoZSBgYW5kYCB3aXRoIGEgXmJvb2xlYW4gZm9yIERDRS5cbiAgICAgICAgIChjb25zb2xlIDplcnJvciBcInJlLWZyYW1lOiBub1wiIChzdHIga2luZCkgXCJoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOlwiIGlkKSkpXG4gICAgIGhhbmRsZXIpKSlcblxuXG4oZGVmbiByZWdpc3Rlci1oYW5kbGVyXG4gIFtraW5kIGlkIGhhbmRsZXItZm5dXG4gICh3aGVuIGRlYnVnLWVuYWJsZWQ/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOzsgVGhpcyBpcyBpbiBhIHNlcGFyYXRlIHdoZW4gc28gQ2xvc3VyZSBEQ0UgY2FuIHJ1blxuICAgICh3aGVuIChnZXQtaGFuZGxlciBraW5kIGlkIGZhbHNlKVxuICAgICAgKGNvbnNvbGUgOndhcm4gXCJyZS1mcmFtZTogb3ZlcndyaXRpbmdcIiAoc3RyIGtpbmQpIFwiaGFuZGxlciBmb3I6XCIgaWQpKSkgICA7OyBhbGxvdyBpdCwgYnV0IHdhcm4uIEhhcHBlbnMgb24gZmlnd2hlZWwgcmVsb2Fkcy5cbiAgKHN3YXAhIGtpbmQtPmlkLT5oYW5kbGVyIGFzc29jLWluIFtraW5kIGlkXSBoYW5kbGVyLWZuKVxuICBoYW5kbGVyLWZuKSAgICA7OyBub3RlOiByZXR1cm5zIHRoZSBqdXN0IHJlZ2lzdGVyZWQgaGFuZGxlclxuXG5cbihkZWZuIGNsZWFyLWhhbmRsZXJzXG4gIChbXSAgICAgICAgICAgIDs7IGNsZWFyIGFsbCBraW5kc1xuICAgKHJlc2V0ISBraW5kLT5pZC0+aGFuZGxlciB7fSkpXG5cbiAgKFtraW5kXSAgICAgICAgOzsgY2xlYXIgYWxsIGhhbmRsZXJzIGZvciB0aGlzIGtpbmRcbiAgIChhc3NlcnQgKGtpbmRzIGtpbmQpKVxuICAgKHN3YXAhIGtpbmQtPmlkLT5oYW5kbGVyIGRpc3NvYyBraW5kKSlcblxuICAoW2tpbmQgaWRdICAgICA7OyBjbGVhciBhIHNpbmdsZSBoYW5kbGVyIGZvciBhIGtpbmRcbiAgIChhc3NlcnQgKGtpbmRzIGtpbmQpKVxuICAgKGlmIChnZXQtaGFuZGxlciBraW5kIGlkKVxuICAgICAoc3dhcCEga2luZC0+aWQtPmhhbmRsZXIgdXBkYXRlLWluIFtraW5kXSBkaXNzb2MgaWQpXG4gICAgIChjb25zb2xlIDp3YXJuIFwicmUtZnJhbWU6IGNhbid0IGNsZWFyXCIgKHN0ciBraW5kKSBcImhhbmRsZXIgZm9yXCIgKHN0ciBpZCBcIi4gSGFuZGxlciBub3QgZm91bmQuXCIpKSkpKVxuIl19