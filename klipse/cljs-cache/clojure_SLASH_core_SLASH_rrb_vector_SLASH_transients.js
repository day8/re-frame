// Compiled by ClojureScript 1.9.542 {:static-fns true, :optimize-constants false}
goog.provide('clojure.core.rrb_vector.transients');
goog.require('cljs.core');
goog.require('clojure.core.rrb_vector.nodes');
goog.require('clojure.core.rrb_vector.trees');
clojure.core.rrb_vector.transients.ensure_editable = (function clojure$core$rrb_vector$transients$ensure_editable(edit,node){
if((node.edit === edit)){
return node;
} else {
var new_arr = cljs.core.aclone(node.arr);
if(((33) === new_arr.length)){
(new_arr[(32)] = cljs.core.aclone((new_arr[(32)])));
} else {
}

return (new cljs.core.VectorNode(edit,new_arr));
}
});
clojure.core.rrb_vector.transients.editable_root = (function clojure$core$rrb_vector$transients$editable_root(root){
return (new cljs.core.VectorNode({},cljs.core.aclone(root.arr)));
});
clojure.core.rrb_vector.transients.editable_tail = (function clojure$core$rrb_vector$transients$editable_tail(tail){
var ret = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
cljs.core.array_copy(tail,(0),ret,(0),tail.length);

return ret;
});
clojure.core.rrb_vector.transients.push_tail_BANG_ = (function clojure$core$rrb_vector$transients$push_tail_BANG_(shift,cnt,root_edit,current_node,tail_node){
var ret = clojure.core.rrb_vector.transients.ensure_editable(root_edit,current_node);
if(cljs.core.truth_(clojure.core.rrb_vector.nodes.regular_QMARK_(ret))){
var n_17729 = ret;
var shift_17730__$1 = shift;
while(true){
var arr_17731 = n_17729.arr;
var subidx_17732 = (((cnt - (1)) >> shift_17730__$1) & (31));
if((shift_17730__$1 === (5))){
(arr_17731[subidx_17732] = tail_node);
} else {
var child_17733 = (arr_17731[subidx_17732]);
if((child_17733 == null)){
(arr_17731[subidx_17732] = clojure.core.rrb_vector.trees.new_path(tail_node.arr,root_edit,(shift_17730__$1 - (5)),tail_node));
} else {
var editable_child_17734 = clojure.core.rrb_vector.transients.ensure_editable(root_edit,child_17733);
(arr_17731[subidx_17732] = editable_child_17734);

var G__17735 = editable_child_17734;
var G__17736 = (shift_17730__$1 - (5));
n_17729 = G__17735;
shift_17730__$1 = G__17736;
continue;
}
}
break;
}

return ret;
} else {
var arr = ret.arr;
var rngs = clojure.core.rrb_vector.nodes.ranges(ret);
var li = ((rngs[(32)]) - (1));
var cret = (((shift === (5)))?null:(function (){var child = clojure.core.rrb_vector.transients.ensure_editable(root_edit,(arr[li]));
var ccnt = (((li > (0)))?((rngs[li]) - (rngs[(li - (1))])):(rngs[(0)]));
if(!((ccnt === ((1) << shift)))){
var G__17724 = (shift - (5));
var G__17725 = (ccnt + (1));
var G__17726 = root_edit;
var G__17727 = child;
var G__17728 = tail_node;
return (clojure.core.rrb_vector.transients.push_tail_BANG_.cljs$core$IFn$_invoke$arity$5 ? clojure.core.rrb_vector.transients.push_tail_BANG_.cljs$core$IFn$_invoke$arity$5(G__17724,G__17725,G__17726,G__17727,G__17728) : clojure.core.rrb_vector.transients.push_tail_BANG_.call(null,G__17724,G__17725,G__17726,G__17727,G__17728));
} else {
return null;
}
})());
if(cljs.core.truth_(cret)){
(arr[li] = cret);

(rngs[li] = ((rngs[li]) + (32)));

return ret;
} else {
(arr[(li + (1))] = clojure.core.rrb_vector.trees.new_path(tail_node.arr,root_edit,(shift - (5)),tail_node));

(rngs[(li + (1))] = ((rngs[li]) + (32)));

(rngs[(32)] = ((rngs[(32)]) + (1)));

return ret;
}
}
});
clojure.core.rrb_vector.transients.pop_tail_BANG_ = (function clojure$core$rrb_vector$transients$pop_tail_BANG_(shift,cnt,root_edit,current_node){
var ret = clojure.core.rrb_vector.transients.ensure_editable(root_edit,current_node);
if(cljs.core.truth_(clojure.core.rrb_vector.nodes.regular_QMARK_(ret))){
var subidx = (((cnt - (1)) >> shift) & (31));
if((shift > (5))){
var child = (function (){var G__17749 = (shift - (5));
var G__17750 = cnt;
var G__17751 = root_edit;
var G__17752 = (ret.arr[subidx]);
return (clojure.core.rrb_vector.transients.pop_tail_BANG_.cljs$core$IFn$_invoke$arity$4 ? clojure.core.rrb_vector.transients.pop_tail_BANG_.cljs$core$IFn$_invoke$arity$4(G__17749,G__17750,G__17751,G__17752) : clojure.core.rrb_vector.transients.pop_tail_BANG_.call(null,G__17749,G__17750,G__17751,G__17752));
})();
if(((child == null)) && ((subidx === (0)))){
return null;
} else {
var arr = ret.arr;
(arr[subidx] = child);

return ret;
}
} else {
if((subidx === (0))){
return null;
} else {
var arr = ret.arr;
(arr[subidx] = null);

return ret;

}
}
} else {
var subidx = (((cnt - (1)) >> shift) & (31));
var rngs = clojure.core.rrb_vector.nodes.ranges(ret);
var subidx__$1 = (function (){var subidx__$1 = subidx;
while(true){
if(((((rngs[(subidx__$1 + (1))]) | (0)) === (0))) || ((subidx__$1 === (31)))){
return subidx__$1;
} else {
var G__17776 = (subidx__$1 + (1));
subidx__$1 = G__17776;
continue;
}
break;
}
})();
if((shift > (5))){
var child = (ret.arr[subidx__$1]);
var child_cnt = (((subidx__$1 === (0)))?(rngs[(0)]):((rngs[subidx__$1]) - (rngs[(subidx__$1 - (1))])));
var new_child = (function (){var G__17756 = (shift - (5));
var G__17757 = child_cnt;
var G__17758 = root_edit;
var G__17759 = child;
return (clojure.core.rrb_vector.transients.pop_tail_BANG_.cljs$core$IFn$_invoke$arity$4 ? clojure.core.rrb_vector.transients.pop_tail_BANG_.cljs$core$IFn$_invoke$arity$4(G__17756,G__17757,G__17758,G__17759) : clojure.core.rrb_vector.transients.pop_tail_BANG_.call(null,G__17756,G__17757,G__17758,G__17759));
})();
if(((new_child == null)) && ((subidx__$1 === (0)))){
return null;
} else {
if(cljs.core.truth_(clojure.core.rrb_vector.nodes.regular_QMARK_(child))){
var arr = ret.arr;
(rngs[subidx__$1] = ((rngs[subidx__$1]) - (32)));

(arr[subidx__$1] = new_child);

if((new_child == null)){
(rngs[(32)] = ((rngs[(32)]) - (1)));
} else {
}

return ret;
} else {
var rng = clojure.core.rrb_vector.nodes.last_range(child);
var diff = (rng - (cljs.core.truth_(new_child)?clojure.core.rrb_vector.nodes.last_range(new_child):(0)));
var arr = ret.arr;
(rngs[subidx__$1] = ((rngs[subidx__$1]) - diff));

(arr[subidx__$1] = new_child);

if((new_child == null)){
(rngs[(32)] = ((rngs[(32)]) - (1)));
} else {
}

return ret;

}
}
} else {
if((subidx__$1 === (0))){
return null;
} else {
var arr = ret.arr;
var child = (arr[subidx__$1]);
(arr[subidx__$1] = null);

(rngs[subidx__$1] = (0));

(rngs[(32)] = ((rngs[(32)]) - (1)));

return ret;

}
}
}
});
clojure.core.rrb_vector.transients.do_assoc_BANG_ = (function clojure$core$rrb_vector$transients$do_assoc_BANG_(shift,root_edit,current_node,i,val){
var ret = clojure.core.rrb_vector.transients.ensure_editable(root_edit,current_node);
if(cljs.core.truth_(clojure.core.rrb_vector.nodes.regular_QMARK_(ret))){
var shift_17797__$1 = shift;
var node_17798 = ret;
while(true){
if((shift_17797__$1 === (0))){
var arr_17799 = node_17798.arr;
(arr_17799[(i & (31))] = val);
} else {
var arr_17800 = node_17798.arr;
var subidx_17801 = ((i >> shift_17797__$1) & (31));
var child_17802 = clojure.core.rrb_vector.transients.ensure_editable(root_edit,(arr_17800[subidx_17801]));
(arr_17800[subidx_17801] = child_17802);

var G__17803 = (shift_17797__$1 - (5));
var G__17804 = child_17802;
shift_17797__$1 = G__17803;
node_17798 = G__17804;
continue;
}
break;
}
} else {
var arr_17817 = ret.arr;
var rngs_17818 = clojure.core.rrb_vector.nodes.ranges(ret);
var subidx_17819 = ((i >> shift) & (31));
var subidx_17820__$1 = (function (){var subidx__$1 = subidx_17819;
while(true){
if((i < ((rngs_17818[subidx__$1]) | (0)))){
return subidx__$1;
} else {
var G__17822 = (subidx__$1 + (1));
subidx__$1 = G__17822;
continue;
}
break;
}
})();
var i_17821__$1 = (((subidx_17820__$1 === (0)))?i:(i - (rngs_17818[(subidx_17820__$1 - (1))])));
(arr_17817[subidx_17820__$1] = (function (){var G__17792 = (shift - (5));
var G__17793 = root_edit;
var G__17794 = (arr_17817[subidx_17820__$1]);
var G__17795 = i_17821__$1;
var G__17796 = val;
return (clojure.core.rrb_vector.transients.do_assoc_BANG_.cljs$core$IFn$_invoke$arity$5 ? clojure.core.rrb_vector.transients.do_assoc_BANG_.cljs$core$IFn$_invoke$arity$5(G__17792,G__17793,G__17794,G__17795,G__17796) : clojure.core.rrb_vector.transients.do_assoc_BANG_.call(null,G__17792,G__17793,G__17794,G__17795,G__17796));
})());
}

return ret;
});
