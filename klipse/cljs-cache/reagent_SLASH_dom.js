// Compiled by ClojureScript 1.10.597
goog.provide("reagent.dom");
reagent.dom.global$module$react_dom = goog.global["ReactDOM"];
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.dissoc,container);

return reagent.dom.global$module$react_dom.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__525 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__526 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__526);

try{return reagent.dom.global$module$react_dom.render(comp.call(null),container,(function (){
var _STAR_always_update_STAR__orig_val__527 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__528 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__528);

try{cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.assoc,container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [comp,container], null));

reagent.impl.batching.flush_after_render.call(null);

if((!((callback == null)))){
return callback.call(null);
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__527);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__525);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp.call(null,comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__530 = arguments.length;
switch (G__530) {
case (2):
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.call(null,comp,container,null);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback){
reagent.ratom.flush_BANG_.call(null);

var f = (function (){
return reagent.impl.template.as_element.call(null,((cljs.core.fn_QMARK_.call(null,comp))?comp.call(null):comp));
});
return reagent.dom.render_comp.call(null,f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = (3));

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp.call(null,container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return reagent.dom.global$module$react_dom.findDOMNode(this$);
});
(reagent.impl.template.find_dom_node = reagent.dom.dom_node);
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_.call(null);

var seq__532_536 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,reagent.dom.roots)));
var chunk__533_537 = null;
var count__534_538 = (0);
var i__535_539 = (0);
while(true){
if((i__535_539 < count__534_538)){
var v_540 = cljs.core._nth.call(null,chunk__533_537,i__535_539);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_540);


var G__541 = seq__532_536;
var G__542 = chunk__533_537;
var G__543 = count__534_538;
var G__544 = (i__535_539 + (1));
seq__532_536 = G__541;
chunk__533_537 = G__542;
count__534_538 = G__543;
i__535_539 = G__544;
continue;
} else {
var temp__9646__auto___545 = cljs.core.seq.call(null,seq__532_536);
if(temp__9646__auto___545){
var seq__532_546__$1 = temp__9646__auto___545;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__532_546__$1)){
var c__11729__auto___547 = cljs.core.chunk_first.call(null,seq__532_546__$1);
var G__548 = cljs.core.chunk_rest.call(null,seq__532_546__$1);
var G__549 = c__11729__auto___547;
var G__550 = cljs.core.count.call(null,c__11729__auto___547);
var G__551 = (0);
seq__532_536 = G__548;
chunk__533_537 = G__549;
count__534_538 = G__550;
i__535_539 = G__551;
continue;
} else {
var v_552 = cljs.core.first.call(null,seq__532_546__$1);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_552);


var G__553 = cljs.core.next.call(null,seq__532_546__$1);
var G__554 = null;
var G__555 = (0);
var G__556 = (0);
seq__532_536 = G__553;
chunk__533_537 = G__554;
count__534_538 = G__555;
i__535_539 = G__556;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render.call(null);
});

//# sourceURL=reagent/dom.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9kb20uanMiLCJzb3VyY2VzIjpbImRvbS5jbGpzIl0sImxpbmVDb3VudCI6MTY1LCJtYXBwaW5ncyI6Ijs7QUFPQSxHQUFBLFFBQUFBLG9DQUFBQyx3Q0FBQUM7QUFBQTtBQUFBLEFBQUEsQUFBbUJDLG9CQUFNLHlCQUFBLHpCQUFDQzs7QUFFMUIsMkJBQUEsM0JBQU9DLDhEQUFjQztBQUFyQixBQUNFLEFBQUNDLCtCQUFNSixrQkFBTUssaUJBQU9GOztBQUNwQixPQUFDRywyREFBaUNIOztBQUVwQywwQkFBQSwxQkFBT0ksNERBQWFDLEtBQUtMLFVBQVVNO0FBQW5DLEFBQ0UsSUFBQUMsMENBQVVFO0lBQVZELDBDQUFBO0FBQUEsQUFBQSwrQ0FBQUEsOUNBQVVDOztBQUFWLElBQUEsQUFDRSxPQUFDQywyQ0FBaUIsQUFBQ0wsZ0JBQU1MLFVBQ3ZCO0FBQUEsQUFDRSxJQUFBVywwQ0FBVUY7SUFBVkcsMENBQUE7QUFBQSxBQUFBLCtDQUFBQSw5Q0FBVUg7O0FBQVYsSUFBQSxBQUNFLDJFQUFBLDNFQUFDUiwrQkFBTUosa0JBQU1nQixnQkFBTWIsNkZBQVdLLEtBQUtMOztBQUNuQyxBQUFDYzs7QUFDRCxHQUFJLEdBQUEsYUFBQSxaQUFPUjtBQUNULE9BQUNBOztBQURIOztVQUhGLEFBQUEsK0NBQUFLLDlDQUFVRjs7VUFIaEIsQUFBQSwrQ0FBQUYsOUNBQVVFOztBQVNaLGtDQUFBLGxDQUFPTSw0RUFBcUJWLEtBQUtMO0FBQWpDLEFBQ0Usd0RBQUEsakRBQUNJLGtDQUFZQyxLQUFLTDs7QUFFcEIsQUFBQTs7Ozs7Ozs7O3FCQUFBLDZCQUFBZ0IsbERBQU1FO0FBQU4sQUFBQSxJQUFBRCxTQUFBLEFBQUE7QUFBQSxBQUFBLFFBQUFBO0tBQUE7QUFBQSxPQUFBQyxpREFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUE7OztLQUFBO0FBQUEsT0FBQUEsaURBQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBOzs7O0FBQUEsTUFBQSxLQUFBQyxNQUFBLENBQUEsOERBQUEsQUFBQTs7Ozs7QUFBQSxDQUFBLG1EQUFBLG5EQUFNRCw4REFRRmIsS0FBS0w7QUFSVCxBQVNHLG1EQUFBLDVDQUFDa0IsNkJBQU9iLEtBQUtMOzs7QUFUaEIsQ0FBQSxtREFBQSxuREFBTWtCLDhEQVVGYixLQUFLTCxVQUFVTTtBQVZuQixBQVdHLEFBQUNjOztBQUNELElBQU1DLElBQUU7QUFBQSxBQUNFLE9BQUNDLDJDQUFnQixFQUFJLEFBQUNDLDhCQUFJbEIsT0FBTSxBQUFDQSxnQkFBTUE7O0FBRGpELEFBRUUsT0FBQ0Qsa0NBQVlpQixFQUFFckIsVUFBVU07OztBQWQ5QixDQUFBLDZDQUFBLDdDQUFNWTs7QUFBTixBQWdCQTs7O3dDQUFBLHhDQUFNTSx3RkFFSHhCO0FBRkgsQUFHRSxPQUFDRCxtQ0FBYUM7O0FBRWhCOzs7dUJBQUEsdkJBQU15QixzREFFSEM7QUFGSCxBQUdFLE9BQUNDLGdEQUFzQkQ7O0FBRXpCLENBQU1FLHNDQUFtQkg7QUFFekI7Ozs7Ozs7Ozs7OytCQUFBLC9CQUFNSTtBQUFOLEFBV0UsQUFBQ1Q7O0FBQ0QsSUFBQVUsZUFBQSxBQUFBQyx3QkFBVSx5QkFBQSxBQUFBYyx6QkFBQ0MsbURBQU1qRDtJQUFqQm1DLGlCQUFBO0lBQUFDLGlCQUFBO0lBQUFDLGFBQUE7O0FBQUEsQUFBQSxHQUFBLEFBQUEsQ0FBQUEsYUFBQUQ7QUFBQSxZQUFBLEFBQUFFLHlCQUFBSCxlQUFBRSxoREFBUVU7QUFBUixBQUFBLEFBQ0UsQUFBQ0csMEJBQU1oQyxnQ0FBb0I2Qjs7QUFEN0I7QUFBQSxhQUFBZDthQUFBRTthQUFBQzthQUFBLENBQUFDLGFBQUE7Ozs7Ozs7QUFBQSxJQUFBRSx5QkFBQSxBQUFBTCx3QkFBQUQ7QUFBQSxBQUFBLEdBQUFNO0FBQUEsQUFBQSxJQUFBTixtQkFBQU07QUFBQSxBQUFBLEdBQUEsQUFBQUMsdUNBQUFQO0FBQUEsSUFBQVEsdUJBQUEsQUFBQUMsZ0NBQUFUO0FBQUEsQUFBQSxhQUFBLEFBQUFVLCtCQUFBVjthQUFBUTthQUFBLEFBQUFHLDBCQUFBSDthQUFBOzs7Ozs7O0FBQUEsWUFBQSxBQUFBSSwwQkFBQVosbENBQVFjO0FBQVIsQUFBQSxBQUNFLEFBQUNHLDBCQUFNaEMsZ0NBQW9CNkI7O0FBRDdCO0FBQUEsYUFBQSxBQUFBRCx5QkFBQWI7YUFBQTthQUFBO2FBQUE7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUEsT0FBQ2hCIiwibmFtZXMiOlsianMvcmVhZ2VudCIsImpzL3JlYWdlbnQuZG9tIiwianMvcmVhZ2VudC5kb20ucm9vdHMiLCJyZWFnZW50LmRvbS9yb290cyIsImNsanMuY29yZS9hdG9tIiwicmVhZ2VudC5kb20vdW5tb3VudC1jb21wIiwiY29udGFpbmVyIiwiY2xqcy5jb3JlL3N3YXAhIiwiY2xqcy5jb3JlL2Rpc3NvYyIsInJlYWdlbnQuZG9tL2dsb2JhbCRtb2R1bGUkcmVhY3RfZG9tLnVubW91bnRDb21wb25lbnRBdE5vZGUiLCJyZWFnZW50LmRvbS9yZW5kZXItY29tcCIsImNvbXAiLCJjYWxsYmFjayIsIiphbHdheXMtdXBkYXRlKi1vcmlnLXZhbF9fNTI1IiwiKmFsd2F5cy11cGRhdGUqLXRlbXAtdmFsX181MjYiLCJyZWFnZW50LmltcGwudXRpbC8qYWx3YXlzLXVwZGF0ZSoiLCJyZWFnZW50LmRvbS9nbG9iYWwkbW9kdWxlJHJlYWN0X2RvbS5yZW5kZXIiLCIqYWx3YXlzLXVwZGF0ZSotb3JpZy12YWxfXzUyNyIsIiphbHdheXMtdXBkYXRlKi10ZW1wLXZhbF9fNTI4IiwiY2xqcy5jb3JlL2Fzc29jIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2ZsdXNoLWFmdGVyLXJlbmRlciIsInJlYWdlbnQuZG9tL3JlLXJlbmRlci1jb21wb25lbnQiLCJ2YXJfYXJncyIsIkdfXzUzMCIsInJlYWdlbnQuZG9tL3JlbmRlciIsImpzL0Vycm9yIiwicmVhZ2VudC5yYXRvbS9mbHVzaCEiLCJmIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2FzLWVsZW1lbnQiLCJjbGpzLmNvcmUvZm4/IiwicmVhZ2VudC5kb20vdW5tb3VudC1jb21wb25lbnQtYXQtbm9kZSIsInJlYWdlbnQuZG9tL2RvbS1ub2RlIiwidGhpcyIsInJlYWdlbnQuZG9tL2dsb2JhbCRtb2R1bGUkcmVhY3RfZG9tLmZpbmRET01Ob2RlIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2ZpbmQtZG9tLW5vZGUiLCJyZWFnZW50LmRvbS9mb3JjZS11cGRhdGUtYWxsIiwic2VxX181MzIiLCJjbGpzLmNvcmUvc2VxIiwiY2h1bmtfXzUzMyIsImNvdW50X181MzQiLCJpX181MzUiLCJjbGpzLmNvcmUvLW50aCIsInRlbXBfXzk2NDZfX2F1dG9fXyIsImNsanMuY29yZS9jaHVua2VkLXNlcT8iLCJjX18xMTcyOV9fYXV0b19fIiwiY2xqcy5jb3JlL2NodW5rLWZpcnN0IiwiY2xqcy5jb3JlL2NodW5rLXJlc3QiLCJjbGpzLmNvcmUvY291bnQiLCJjbGpzLmNvcmUvZmlyc3QiLCJjbGpzLmNvcmUvbmV4dCIsInYiLCJjbGpzLmNvcmUvZGVyZWYiLCJjbGpzLmNvcmUvdmFscyIsImNsanMuY29yZS9hcHBseSJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgcmVhZ2VudC5kb21cbiAgKDpyZXF1aXJlIFtyZWFjdC1kb20gOmFzIHJlYWN0LWRvbV1cbiAgICAgICAgICAgIFtyZWFnZW50LmltcGwudXRpbCA6YXMgdXRpbF1cbiAgICAgICAgICAgIFtyZWFnZW50LmltcGwudGVtcGxhdGUgOmFzIHRtcGxdXG4gICAgICAgICAgICBbcmVhZ2VudC5pbXBsLmJhdGNoaW5nIDphcyBiYXRjaF1cbiAgICAgICAgICAgIFtyZWFnZW50LnJhdG9tIDphcyByYXRvbV0pKVxuXG4oZGVmb25jZSBeOnByaXZhdGUgcm9vdHMgKGF0b20ge30pKVxuXG4oZGVmbi0gdW5tb3VudC1jb21wIFtjb250YWluZXJdXG4gIChzd2FwISByb290cyBkaXNzb2MgY29udGFpbmVyKVxuICAocmVhY3QtZG9tL3VubW91bnRDb21wb25lbnRBdE5vZGUgY29udGFpbmVyKSlcblxuKGRlZm4tIHJlbmRlci1jb21wIFtjb21wIGNvbnRhaW5lciBjYWxsYmFja11cbiAgKGJpbmRpbmcgW3V0aWwvKmFsd2F5cy11cGRhdGUqIHRydWVdXG4gICAgKHJlYWN0LWRvbS9yZW5kZXIgKGNvbXApIGNvbnRhaW5lclxuICAgICAgKGZuIFtdXG4gICAgICAgIChiaW5kaW5nIFt1dGlsLyphbHdheXMtdXBkYXRlKiBmYWxzZV1cbiAgICAgICAgICAoc3dhcCEgcm9vdHMgYXNzb2MgY29udGFpbmVyIFtjb21wIGNvbnRhaW5lcl0pXG4gICAgICAgICAgKGJhdGNoL2ZsdXNoLWFmdGVyLXJlbmRlcilcbiAgICAgICAgICAoaWYgKHNvbWU/IGNhbGxiYWNrKVxuICAgICAgICAgICAgKGNhbGxiYWNrKSkpKSkpKVxuXG4oZGVmbi0gcmUtcmVuZGVyLWNvbXBvbmVudCBbY29tcCBjb250YWluZXJdXG4gIChyZW5kZXItY29tcCBjb21wIGNvbnRhaW5lciBuaWwpKVxuXG4oZGVmbiByZW5kZXJcbiAgXCJSZW5kZXIgYSBSZWFnZW50IGNvbXBvbmVudCBpbnRvIHRoZSBET00uIFRoZSBmaXJzdCBhcmd1bWVudCBtYXkgYmVcbiAgZWl0aGVyIGEgdmVjdG9yICh1c2luZyBSZWFnZW50J3MgSGljY3VwIHN5bnRheCksIG9yIGEgUmVhY3QgZWxlbWVudC5cbiAgVGhlIHNlY29uZCBhcmd1bWVudCBzaG91bGQgYmUgYSBET00gbm9kZS5cblxuICBPcHRpb25hbGx5IHRha2VzIGEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluIHBsYWNlLlxuXG4gIFJldHVybnMgdGhlIG1vdW50ZWQgY29tcG9uZW50IGluc3RhbmNlLlwiXG4gIChbY29tcCBjb250YWluZXJdXG4gICAocmVuZGVyIGNvbXAgY29udGFpbmVyIG5pbCkpXG4gIChbY29tcCBjb250YWluZXIgY2FsbGJhY2tdXG4gICAocmF0b20vZmx1c2ghKVxuICAgKGxldCBbZiAoZm4gW11cbiAgICAgICAgICAgICAodG1wbC9hcy1lbGVtZW50IChpZiAoZm4/IGNvbXApIChjb21wKSBjb21wKSkpXVxuICAgICAocmVuZGVyLWNvbXAgZiBjb250YWluZXIgY2FsbGJhY2spKSkpXG5cbihkZWZuIHVubW91bnQtY29tcG9uZW50LWF0LW5vZGVcbiAgXCJSZW1vdmUgYSBjb21wb25lbnQgZnJvbSB0aGUgZ2l2ZW4gRE9NIG5vZGUuXCJcbiAgW2NvbnRhaW5lcl1cbiAgKHVubW91bnQtY29tcCBjb250YWluZXIpKVxuXG4oZGVmbiBkb20tbm9kZVxuICBcIlJldHVybnMgdGhlIHJvb3QgRE9NIG5vZGUgb2YgYSBtb3VudGVkIGNvbXBvbmVudC5cIlxuICBbdGhpc11cbiAgKHJlYWN0LWRvbS9maW5kRE9NTm9kZSB0aGlzKSlcblxuKHNldCEgdG1wbC9maW5kLWRvbS1ub2RlIGRvbS1ub2RlKVxuXG4oZGVmbiBmb3JjZS11cGRhdGUtYWxsXG4gIFwiRm9yY2UgcmUtcmVuZGVyaW5nIG9mIGFsbCBtb3VudGVkIFJlYWdlbnQgY29tcG9uZW50cy4gVGhpcyBpc1xuICBwcm9iYWJseSBvbmx5IHVzZWZ1bCBpbiBhIGRldmVsb3BtZW50IGVudmlyb25tZW50LCB3aGVuIHlvdSB3YW50IHRvXG4gIHVwZGF0ZSBjb21wb25lbnRzIGluIHJlc3BvbnNlIHRvIHNvbWUgZHluYW1pYyBjaGFuZ2VzIHRvIGNvZGUuXG5cbiAgTm90ZSB0aGF0IGZvcmNlLXVwZGF0ZS1hbGwgbWF5IG5vdCB1cGRhdGUgcm9vdCBjb21wb25lbnRzLiBUaGlzXG4gIGhhcHBlbnMgaWYgYSBjb21wb25lbnQgJ2ZvbycgaXMgbW91bnRlZCB3aXRoIGAocmVuZGVyIFtmb29dKWAgKHNpbmNlXG4gIGZ1bmN0aW9ucyBhcmUgcGFzc2VkIGJ5IHZhbHVlLCBhbmQgbm90IGJ5IHJlZmVyZW5jZSwgaW5cbiAgQ2xvanVyZVNjcmlwdCkuIFRvIGdldCBhcm91bmQgdGhpcyB5b3UnbGwgaGF2ZSB0byBpbnRyb2R1Y2UgYSBsYXllclxuICBvZiBpbmRpcmVjdGlvbiwgZm9yIGV4YW1wbGUgYnkgdXNpbmcgYChyZW5kZXIgWyMnZm9vXSlgIGluc3RlYWQuXCJcbiAgW11cbiAgKHJhdG9tL2ZsdXNoISlcbiAgKGRvc2VxIFt2ICh2YWxzIEByb290cyldXG4gICAgKGFwcGx5IHJlLXJlbmRlci1jb21wb25lbnQgdikpXG4gIChiYXRjaC9mbHVzaC1hZnRlci1yZW5kZXIpKVxuIl19