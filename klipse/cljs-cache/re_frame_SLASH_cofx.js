// Compiled by ClojureScript 1.10.597
goog.provide("re_frame.cofx");
re_frame.cofx.kind = new cljs.core.Keyword(null,"cofx","cofx",(2013202907));
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,re_frame.cofx.kind))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
/**
 * Register the given coeffect `handler` for the given `id`, for later use
 *   within `inject-cofx`.
 * 
 *   `id` is keyword, often namespaced.
 *   `handler` is a function which takes either one or two arguements, the first of which is
 *   always `coeffects` and which returns an updated `coeffects`.
 * 
 *   See the docs for `inject-cofx` for example use.
 */
re_frame.cofx.reg_cofx = (function re_frame$cofx$reg_cofx(id,handler){
return re_frame.registrar.register_handler.call(null,re_frame.cofx.kind,id,handler);
});
/**
 * Given an `id`, and an optional, arbitrary `value`, returns an interceptor
 * whose `:before` adds to the `:coeffects` (map) by calling a pre-registered
 * 'coeffect handler' identified by the `id`.
 * 
 * The previous association of a `coeffect handler` with an `id` will have
 * happened via a call to `re-frame.core/reg-cofx` - generally on program startup.
 * 
 * Within the created interceptor, this 'looked up' `coeffect handler` will
 * be called (within the `:before`) with two arguments:
 *   - the current value of `:coeffects`
 *   - optionally, the originally supplied arbitrary `value`
 * 
 * This `coeffect handler` is expected to modify and return its first, `coeffects` argument.
 * 
 * Example Of how `inject-cofx` and `reg-cofx` work together
 * ---------------------------------------------------------
 * 
 * 1. Early in app startup, you register a `coeffect handler` for `:datetime`:
 * 
 *    (re-frame.core/reg-cofx
 *      :datetime                        ;; usage  (inject-cofx :datetime)
 *      (fn coeffect-handler
 *        [coeffect]
 *        (assoc coeffect :now (js/Date.))))   ;; modify and return first arg
 * 
 * 2. Later, add an interceptor to an -fx event handler, using `inject-cofx`:
 * 
 *    (re-frame.core/reg-event-fx        ;; we are registering an event handler
 *       :event-id
 *       [ ... (inject-cofx :datetime) ... ]    ;; <-- create an injecting interceptor
 *       (fn event-handler
 *         [coeffect event]
 *         ... in here can access (:now coeffect) to obtain current datetime ... )))
 * 
 * Background
 * ----------
 * 
 * `coeffects` are the input resources required by an event handler
 * to perform its job. The two most obvious ones are `db` and `event`.
 * But sometimes an event handler might need other resources.
 * 
 * Perhaps an event handler needs a random number or a GUID or the current
 * datetime. Perhaps it needs access to a DataScript database connection.
 * 
 * If an event handler directly accesses these resources, it stops being
 * pure and, consequently, it becomes harder to test, etc. So we don't
 * want that.
 * 
 * Instead, the interceptor created by this function is a way to 'inject'
 * 'necessary resources' into the `:coeffects` (map) subsequently given
 * to the event handler at call time.
 */
re_frame.cofx.inject_cofx = (function re_frame$cofx$inject_cofx(var_args){
var G__1124 = arguments.length;
switch (G__1124) {
case (1):
return re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$cofx$coeffects_before(context){
var temp__9584__auto__ = re_frame.registrar.get_handler.call(null,re_frame.cofx.kind,id);
if(cljs.core.truth_(temp__9584__auto__)){
var handler = temp__9584__auto__;
return cljs.core.update.call(null,context,new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),handler);
} else {
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"No cofx handler registered for",id);
}
}));
}));

(re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$2 = (function (id,value){
return re_frame.interceptor.__GT_interceptor.call(null,new cljs.core.Keyword(null,"id","id",(-1388402092)),new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),new cljs.core.Keyword(null,"before","before",(-1633692388)),(function re_frame$cofx$coeffects_before(context){
var temp__9584__auto__ = re_frame.registrar.get_handler.call(null,re_frame.cofx.kind,id);
if(cljs.core.truth_(temp__9584__auto__)){
var handler = temp__9584__auto__;
return cljs.core.update.call(null,context,new cljs.core.Keyword(null,"coeffects","coeffects",(497912985)),handler,value);
} else {
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",(-978969032)),"No cofx handler registered for",id);
}
}));
}));

(re_frame.cofx.inject_cofx.cljs$lang$maxFixedArity = (2));

re_frame.cofx.reg_cofx.call(null,new cljs.core.Keyword(null,"db","db",(993250759)),(function re_frame$cofx$db_coeffects_handler(coeffects){
return cljs.core.assoc.call(null,coeffects,new cljs.core.Keyword(null,"db","db",(993250759)),cljs.core.deref.call(null,re_frame.db.app_db));
}));
re_frame.cofx.inject_db = re_frame.cofx.inject_cofx.call(null,new cljs.core.Keyword(null,"db","db",(993250759)));

//# sourceURL=re_frame/cofx.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVfZnJhbWUvY29meC5qcyIsInNvdXJjZXMiOlsiY29meC5jbGpzIl0sImxpbmVDb3VudCI6MTIyLCJtYXBwaW5ncyI6IjtBQVVBLHFCQUFBLHJCQUFLQTtBQUNMLG9CQUFRLEFBQUNFLG1DQUF5QkY7QUFBbEM7QUFBQSxBQUFBLE1BQUEsS0FBQUMsTUFBQTs7QUFFQTs7Ozs7Ozs7Ozt5QkFBQSx6QkFBTUUsMERBU0hDLEdBQUdDO0FBVE4sQUFVRSxPQUFDQyw4Q0FBaUJOLG1CQUFLSSxHQUFHQzs7QUFLNUIsQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBQUEsb0NBQUFFLGhFQUFNRTtBQUFOLEFBQUEsSUFBQUQsVUFBQSxBQUFBO0FBQUEsQUFBQSxRQUFBQTtLQUFBO0FBQUEsT0FBQUMsd0RBQUEsQ0FBQSxVQUFBOzs7S0FBQTtBQUFBLE9BQUFBLHdEQUFBLENBQUEsVUFBQSxNQUFBLENBQUEsVUFBQTs7OztBQUFBLE1BQUEsS0FBQVIsTUFBQSxDQUFBLDhEQUFBLEFBQUE7Ozs7O0FBQUEsQ0FBQSwwREFBQSwxREFBTVEscUVBb0RGTDtBQXBESixBQXFERSx1REFBQSxvREFBQSxnRUFBQSxwS0FBQ00sZ09BRVUseUNBQ0dDO0FBREgsQUFFRSxJQUFBQyxxQkFBaUIsQUFBQ0MseUNBQVliLG1CQUFLSTtBQUFuQyxBQUFBLG9CQUFBUTtBQUFBLGNBQUFBLFZBQVNQO0FBQVQsQUFDRSwwQ0FBQSxuQ0FBQ1MsMkJBQU9ILHdFQUFtQk47O0FBQzNCLDBDQUFBLHlEQUFBLDVGQUFDVSw2SEFBZ0RYOzs7OztBQTNEbEUsQ0FBQSwwREFBQSwxREFBTUsscUVBNERGTCxHQUFHWTtBQTVEUCxBQTZERyx1REFBQSxvREFBQSxnRUFBQSxwS0FBQ04sZ09BRVUseUNBQ0dDO0FBREgsQUFFRSxJQUFBQyxxQkFBaUIsQUFBQ0MseUNBQVliLG1CQUFLSTtBQUFuQyxBQUFBLG9CQUFBUTtBQUFBLGNBQUFBLFZBQVNQO0FBQVQsQUFDRSwwQ0FBQSxuQ0FBQ1MsMkJBQU9ILHdFQUFtQk4sUUFBUVc7O0FBQ25DLDBDQUFBLHlEQUFBLDVGQUFDRCw2SEFBZ0RYOzs7OztBQW5FbkUsQ0FBQSxvREFBQSxwREFBTUs7O0FBQU4sQUEyRUEsaUNBQUEsakNBQUNOLG1GQUVDLDZDQUNHYztBQURILEFBRUUsMkNBQUEsa0RBQUEsQUFBQUMsdEZBQUNDLDBCQUFNRixzRkFBZUc7O0FBSTFCLEFBQUtDLDBCQUFVLG9DQUFBLHBDQUFDWiIsIm5hbWVzIjpbInJlLWZyYW1lLmNvZngva2luZCIsImpzL0Vycm9yIiwicmUtZnJhbWUucmVnaXN0cmFyL2tpbmRzIiwicmUtZnJhbWUuY29meC9yZWctY29meCIsImlkIiwiaGFuZGxlciIsInJlLWZyYW1lLnJlZ2lzdHJhci9yZWdpc3Rlci1oYW5kbGVyIiwidmFyX2FyZ3MiLCJHX18xMTI0IiwicmUtZnJhbWUuY29meC9pbmplY3QtY29meCIsInJlLWZyYW1lLmludGVyY2VwdG9yLy0+aW50ZXJjZXB0b3IiLCJjb250ZXh0IiwidGVtcF9fOTU4NF9fYXV0b19fIiwicmUtZnJhbWUucmVnaXN0cmFyL2dldC1oYW5kbGVyIiwiY2xqcy5jb3JlL3VwZGF0ZSIsInJlLWZyYW1lLmxvZ2dlcnMvY29uc29sZSIsInZhbHVlIiwiY29lZmZlY3RzIiwiY2xqcy5jb3JlL2RlcmVmIiwiY2xqcy5jb3JlL2Fzc29jIiwicmUtZnJhbWUuZGIvYXBwLWRiIiwicmUtZnJhbWUuY29meC9pbmplY3QtZGIiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlLWZyYW1lLmNvZnhcbiAgKDpyZXF1aXJlXG4gICAgW3JlLWZyYW1lLmRiICAgICAgICAgICA6cmVmZXIgW2FwcC1kYl1dXG4gICAgW3JlLWZyYW1lLmludGVyY2VwdG9yICA6cmVmZXIgWy0+aW50ZXJjZXB0b3JdXVxuICAgIFtyZS1mcmFtZS5yZWdpc3RyYXIgICAgOnJlZmVyIFtnZXQtaGFuZGxlciBjbGVhci1oYW5kbGVycyByZWdpc3Rlci1oYW5kbGVyXV1cbiAgICBbcmUtZnJhbWUubG9nZ2VycyAgICAgIDpyZWZlciBbY29uc29sZV1dKSlcblxuXG47OyAtLSBSZWdpc3RyYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbihkZWYga2luZCA6Y29meClcbihhc3NlcnQgKHJlLWZyYW1lLnJlZ2lzdHJhci9raW5kcyBraW5kKSlcblxuKGRlZm4gcmVnLWNvZnhcbiAgXCJSZWdpc3RlciB0aGUgZ2l2ZW4gY29lZmZlY3QgYGhhbmRsZXJgIGZvciB0aGUgZ2l2ZW4gYGlkYCwgZm9yIGxhdGVyIHVzZVxuICB3aXRoaW4gYGluamVjdC1jb2Z4YC5cblxuICBgaWRgIGlzIGtleXdvcmQsIG9mdGVuIG5hbWVzcGFjZWQuXG4gIGBoYW5kbGVyYCBpcyBhIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGVpdGhlciBvbmUgb3IgdHdvIGFyZ3VlbWVudHMsIHRoZSBmaXJzdCBvZiB3aGljaCBpc1xuICBhbHdheXMgYGNvZWZmZWN0c2AgYW5kIHdoaWNoIHJldHVybnMgYW4gdXBkYXRlZCBgY29lZmZlY3RzYC5cblxuICBTZWUgdGhlIGRvY3MgZm9yIGBpbmplY3QtY29meGAgZm9yIGV4YW1wbGUgdXNlLlwiXG4gIFtpZCBoYW5kbGVyXVxuICAocmVnaXN0ZXItaGFuZGxlciBraW5kIGlkIGhhbmRsZXIpKVxuXG5cbjs7IC0tIEludGVyY2VwdG9yIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuKGRlZm4gaW5qZWN0LWNvZnhcbiAgXCJHaXZlbiBhbiBgaWRgLCBhbmQgYW4gb3B0aW9uYWwsIGFyYml0cmFyeSBgdmFsdWVgLCByZXR1cm5zIGFuIGludGVyY2VwdG9yXG4gICB3aG9zZSBgOmJlZm9yZWAgYWRkcyB0byB0aGUgYDpjb2VmZmVjdHNgIChtYXApIGJ5IGNhbGxpbmcgYSBwcmUtcmVnaXN0ZXJlZFxuICAgJ2NvZWZmZWN0IGhhbmRsZXInIGlkZW50aWZpZWQgYnkgdGhlIGBpZGAuXG5cbiAgIFRoZSBwcmV2aW91cyBhc3NvY2lhdGlvbiBvZiBhIGBjb2VmZmVjdCBoYW5kbGVyYCB3aXRoIGFuIGBpZGAgd2lsbCBoYXZlXG4gICBoYXBwZW5lZCB2aWEgYSBjYWxsIHRvIGByZS1mcmFtZS5jb3JlL3JlZy1jb2Z4YCAtIGdlbmVyYWxseSBvbiBwcm9ncmFtIHN0YXJ0dXAuXG5cbiAgIFdpdGhpbiB0aGUgY3JlYXRlZCBpbnRlcmNlcHRvciwgdGhpcyAnbG9va2VkIHVwJyBgY29lZmZlY3QgaGFuZGxlcmAgd2lsbFxuICAgYmUgY2FsbGVkICh3aXRoaW4gdGhlIGA6YmVmb3JlYCkgd2l0aCB0d28gYXJndW1lbnRzOlxuICAgICAtIHRoZSBjdXJyZW50IHZhbHVlIG9mIGA6Y29lZmZlY3RzYFxuICAgICAtIG9wdGlvbmFsbHksIHRoZSBvcmlnaW5hbGx5IHN1cHBsaWVkIGFyYml0cmFyeSBgdmFsdWVgXG5cbiAgIFRoaXMgYGNvZWZmZWN0IGhhbmRsZXJgIGlzIGV4cGVjdGVkIHRvIG1vZGlmeSBhbmQgcmV0dXJuIGl0cyBmaXJzdCwgYGNvZWZmZWN0c2AgYXJndW1lbnQuXG5cbiAgIEV4YW1wbGUgT2YgaG93IGBpbmplY3QtY29meGAgYW5kIGByZWctY29meGAgd29yayB0b2dldGhlclxuICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgIDEuIEVhcmx5IGluIGFwcCBzdGFydHVwLCB5b3UgcmVnaXN0ZXIgYSBgY29lZmZlY3QgaGFuZGxlcmAgZm9yIGA6ZGF0ZXRpbWVgOlxuXG4gICAgICAocmUtZnJhbWUuY29yZS9yZWctY29meFxuICAgICAgICA6ZGF0ZXRpbWUgICAgICAgICAgICAgICAgICAgICAgICA7OyB1c2FnZSAgKGluamVjdC1jb2Z4IDpkYXRldGltZSlcbiAgICAgICAgKGZuIGNvZWZmZWN0LWhhbmRsZXJcbiAgICAgICAgICBbY29lZmZlY3RdXG4gICAgICAgICAgKGFzc29jIGNvZWZmZWN0IDpub3cgKGpzL0RhdGUuKSkpKSAgIDs7IG1vZGlmeSBhbmQgcmV0dXJuIGZpcnN0IGFyZ1xuXG4gICAyLiBMYXRlciwgYWRkIGFuIGludGVyY2VwdG9yIHRvIGFuIC1meCBldmVudCBoYW5kbGVyLCB1c2luZyBgaW5qZWN0LWNvZnhgOlxuXG4gICAgICAocmUtZnJhbWUuY29yZS9yZWctZXZlbnQtZnggICAgICAgIDs7IHdlIGFyZSByZWdpc3RlcmluZyBhbiBldmVudCBoYW5kbGVyXG4gICAgICAgICA6ZXZlbnQtaWRcbiAgICAgICAgIFsgLi4uIChpbmplY3QtY29meCA6ZGF0ZXRpbWUpIC4uLiBdICAgIDs7IDwtLSBjcmVhdGUgYW4gaW5qZWN0aW5nIGludGVyY2VwdG9yXG4gICAgICAgICAoZm4gZXZlbnQtaGFuZGxlclxuICAgICAgICAgICBbY29lZmZlY3QgZXZlbnRdXG4gICAgICAgICAgIC4uLiBpbiBoZXJlIGNhbiBhY2Nlc3MgKDpub3cgY29lZmZlY3QpIHRvIG9idGFpbiBjdXJyZW50IGRhdGV0aW1lIC4uLiApKSlcblxuICAgQmFja2dyb3VuZFxuICAgLS0tLS0tLS0tLVxuXG4gICBgY29lZmZlY3RzYCBhcmUgdGhlIGlucHV0IHJlc291cmNlcyByZXF1aXJlZCBieSBhbiBldmVudCBoYW5kbGVyXG4gICB0byBwZXJmb3JtIGl0cyBqb2IuIFRoZSB0d28gbW9zdCBvYnZpb3VzIG9uZXMgYXJlIGBkYmAgYW5kIGBldmVudGAuXG4gICBCdXQgc29tZXRpbWVzIGFuIGV2ZW50IGhhbmRsZXIgbWlnaHQgbmVlZCBvdGhlciByZXNvdXJjZXMuXG5cbiAgIFBlcmhhcHMgYW4gZXZlbnQgaGFuZGxlciBuZWVkcyBhIHJhbmRvbSBudW1iZXIgb3IgYSBHVUlEIG9yIHRoZSBjdXJyZW50XG4gICBkYXRldGltZS4gUGVyaGFwcyBpdCBuZWVkcyBhY2Nlc3MgdG8gYSBEYXRhU2NyaXB0IGRhdGFiYXNlIGNvbm5lY3Rpb24uXG5cbiAgIElmIGFuIGV2ZW50IGhhbmRsZXIgZGlyZWN0bHkgYWNjZXNzZXMgdGhlc2UgcmVzb3VyY2VzLCBpdCBzdG9wcyBiZWluZ1xuICAgcHVyZSBhbmQsIGNvbnNlcXVlbnRseSwgaXQgYmVjb21lcyBoYXJkZXIgdG8gdGVzdCwgZXRjLiBTbyB3ZSBkb24ndFxuICAgd2FudCB0aGF0LlxuXG4gICBJbnN0ZWFkLCB0aGUgaW50ZXJjZXB0b3IgY3JlYXRlZCBieSB0aGlzIGZ1bmN0aW9uIGlzIGEgd2F5IHRvICdpbmplY3QnXG4gICAnbmVjZXNzYXJ5IHJlc291cmNlcycgaW50byB0aGUgYDpjb2VmZmVjdHNgIChtYXApIHN1YnNlcXVlbnRseSBnaXZlblxuICAgdG8gdGhlIGV2ZW50IGhhbmRsZXIgYXQgY2FsbCB0aW1lLlwiXG4gIChbaWRdXG4gICgtPmludGVyY2VwdG9yXG4gICAgOmlkICAgICAgOmNvZWZmZWN0c1xuICAgIDpiZWZvcmUgIChmbiBjb2VmZmVjdHMtYmVmb3JlXG4gICAgICAgICAgICAgICBbY29udGV4dF1cbiAgICAgICAgICAgICAgIChpZi1sZXQgW2hhbmRsZXIgKGdldC1oYW5kbGVyIGtpbmQgaWQpXVxuICAgICAgICAgICAgICAgICAodXBkYXRlIGNvbnRleHQgOmNvZWZmZWN0cyBoYW5kbGVyKVxuICAgICAgICAgICAgICAgICAoY29uc29sZSA6ZXJyb3IgXCJObyBjb2Z4IGhhbmRsZXIgcmVnaXN0ZXJlZCBmb3JcIiBpZCkpKSkpXG4gIChbaWQgdmFsdWVdXG4gICAoLT5pbnRlcmNlcHRvclxuICAgICA6aWQgICAgIDpjb2VmZmVjdHNcbiAgICAgOmJlZm9yZSAgKGZuIGNvZWZmZWN0cy1iZWZvcmVcbiAgICAgICAgICAgICAgICBbY29udGV4dF1cbiAgICAgICAgICAgICAgICAoaWYtbGV0IFtoYW5kbGVyIChnZXQtaGFuZGxlciBraW5kIGlkKV1cbiAgICAgICAgICAgICAgICAgICh1cGRhdGUgY29udGV4dCA6Y29lZmZlY3RzIGhhbmRsZXIgdmFsdWUpXG4gICAgICAgICAgICAgICAgICAoY29uc29sZSA6ZXJyb3IgXCJObyBjb2Z4IGhhbmRsZXIgcmVnaXN0ZXJlZCBmb3JcIiBpZCkpKSkpKVxuXG5cbjs7IC0tIEJ1aWx0aW4gQ29FZmZlY3RzIEhhbmRsZXJzICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuOzsgOmRiXG47O1xuOzsgQWRkcyB0byBjb2VmZmVjdHMgdGhlIHZhbHVlIGluIGBhcHAtZGJgLCB1bmRlciB0aGUga2V5IGA6ZGJgXG4ocmVnLWNvZnhcbiAgOmRiXG4gIChmbiBkYi1jb2VmZmVjdHMtaGFuZGxlclxuICAgIFtjb2VmZmVjdHNdXG4gICAgKGFzc29jIGNvZWZmZWN0cyA6ZGIgQGFwcC1kYikpKVxuXG5cbjs7IEJlY2F1c2UgdGhpcyBpbnRlcmNlcHRvciBpcyB1c2VkIHNvIG11Y2gsIHdlIHJlaWZ5IGl0XG4oZGVmIGluamVjdC1kYiAoaW5qZWN0LWNvZnggOmRiKSlcblxuXG4iXX0=