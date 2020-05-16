// Compiled by ClojureScript 1.10.597
goog.provide("reagent.impl.util");
reagent.impl.util.is_client = (((typeof window !== 'undefined')) && ((!((window.document == null)))));
reagent.impl.util._STAR_non_reactive_STAR_ = false;
reagent.impl.util.memoize_1 = (function reagent$impl$util$memoize_1(f){
var mem = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
return (function (arg){
var v = cljs.core.get.call(null,cljs.core.deref.call(null,mem),arg);
if((!((v == null)))){
return v;
} else {
var ret = f.call(null,arg);
cljs.core.swap_BANG_.call(null,mem,cljs.core.assoc,arg,ret);

return ret;
}
});
});
reagent.impl.util.dont_camel_case = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["aria",null,"data",null], null), null);
reagent.impl.util.capitalize = (function reagent$impl$util$capitalize(s){
if((cljs.core.count.call(null,s) < (2))){
return clojure.string.upper_case.call(null,s);
} else {
return [clojure.string.upper_case.call(null,cljs.core.subs.call(null,s,(0),(1))),cljs.core.subs.call(null,s,(1))].join('');
}
});
reagent.impl.util.dash_to_prop_name = (function reagent$impl$util$dash_to_prop_name(dashed){
if(typeof dashed === 'string'){
return dashed;
} else {
var name_str = cljs.core.name.call(null,dashed);
var vec__182 = clojure.string.split.call(null,name_str,/-/);
var seq__183 = cljs.core.seq.call(null,vec__182);
var first__184 = cljs.core.first.call(null,seq__183);
var seq__183__$1 = cljs.core.next.call(null,seq__183);
var start = first__184;
var parts = seq__183__$1;
if(cljs.core.truth_(reagent.impl.util.dont_camel_case.call(null,start))){
return name_str;
} else {
return cljs.core.apply.call(null,cljs.core.str,start,cljs.core.map.call(null,reagent.impl.util.capitalize,parts));
}
}
});
reagent.impl.util.dash_to_method_name = (function reagent$impl$util$dash_to_method_name(dashed){
if(typeof dashed === 'string'){
return dashed;
} else {
var name_str = cljs.core.name.call(null,dashed);
var name_str__$1 = clojure.string.replace.call(null,name_str,/(unsafe|UNSAFE)[-_]/,"UNSAFE_");
var vec__185 = clojure.string.split.call(null,name_str__$1,/-/);
var seq__186 = cljs.core.seq.call(null,vec__185);
var first__187 = cljs.core.first.call(null,seq__186);
var seq__186__$1 = cljs.core.next.call(null,seq__186);
var start = first__187;
var parts = seq__186__$1;
return cljs.core.apply.call(null,cljs.core.str,start,cljs.core.map.call(null,reagent.impl.util.capitalize,parts));
}
});
reagent.impl.util.fun_name = (function reagent$impl$util$fun_name(f){
var n = (function (){var or__10112__auto__ = ((cljs.core.fn_QMARK_.call(null,f))?(function (){var or__10112__auto__ = f.displayName;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var n = f.name;
if(((typeof n === 'string') && (cljs.core.seq.call(null,n)))){
return n;
} else {
return null;
}
}
})():false);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var or__10112__auto____$1 = (((((!((f == null))))?(((((f.cljs$lang$protocol_mask$partition1$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === f.cljs$core$INamed$))))?true:false):false))?cljs.core.name.call(null,f):false);
if(cljs.core.truth_(or__10112__auto____$1)){
return or__10112__auto____$1;
} else {
var m = cljs.core.meta.call(null,f);
if(cljs.core.map_QMARK_.call(null,m)){
return new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(m);
} else {
return null;
}
}
}
})();
if(cljs.core.truth_(n)){
return clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),"$",".");
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.Fn}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
*/
reagent.impl.util.PartialFn = (function (pfn,f,args){
this.pfn = pfn;
this.f = f;
this.args = args;
this.cljs$lang$protocol_mask$partition0$ = 6291457;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(reagent.impl.util.PartialFn.prototype.cljs$core$Fn$ = cljs.core.PROTOCOL_SENTINEL);

(reagent.impl.util.PartialFn.prototype.call = (function() {
var G__195 = null;
var G__195__1 = (function (self__){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null);
});
var G__195__2 = (function (self__,a){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a);
});
var G__195__3 = (function (self__,a,b){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b);
});
var G__195__4 = (function (self__,a,b,c){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c);
});
var G__195__5 = (function (self__,a,b,c,d){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d);
});
var G__195__6 = (function (self__,a,b,c,d,e){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e);
});
var G__195__7 = (function (self__,a,b,c,d,e,f__$1){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1);
});
var G__195__8 = (function (self__,a,b,c,d,e,f__$1,g){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g);
});
var G__195__9 = (function (self__,a,b,c,d,e,f__$1,g,h){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h);
});
var G__195__10 = (function (self__,a,b,c,d,e,f__$1,g,h,i){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i);
});
var G__195__11 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j);
});
var G__195__12 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k);
});
var G__195__13 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l);
});
var G__195__14 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m);
});
var G__195__15 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n);
});
var G__195__16 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o);
});
var G__195__17 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p);
});
var G__195__18 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q);
});
var G__195__19 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r);
});
var G__195__20 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s);
});
var G__195__21 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t);
});
var G__195__22 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
return cljs.core.apply.call(null,self__.pfn,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest);
});
G__195 = function(self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
switch(arguments.length){
case 1:
return G__195__1.call(this,self__);
case 2:
return G__195__2.call(this,self__,a);
case 3:
return G__195__3.call(this,self__,a,b);
case 4:
return G__195__4.call(this,self__,a,b,c);
case 5:
return G__195__5.call(this,self__,a,b,c,d);
case 6:
return G__195__6.call(this,self__,a,b,c,d,e);
case 7:
return G__195__7.call(this,self__,a,b,c,d,e,f__$1);
case 8:
return G__195__8.call(this,self__,a,b,c,d,e,f__$1,g);
case 9:
return G__195__9.call(this,self__,a,b,c,d,e,f__$1,g,h);
case 10:
return G__195__10.call(this,self__,a,b,c,d,e,f__$1,g,h,i);
case 11:
return G__195__11.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j);
case 12:
return G__195__12.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k);
case 13:
return G__195__13.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l);
case 14:
return G__195__14.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m);
case 15:
return G__195__15.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n);
case 16:
return G__195__16.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o);
case 17:
return G__195__17.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p);
case 18:
return G__195__18.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return G__195__19.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r);
case 20:
return G__195__20.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s);
case 21:
return G__195__21.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t);
case 22:
return G__195__22.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__195.cljs$core$IFn$_invoke$arity$1 = G__195__1;
G__195.cljs$core$IFn$_invoke$arity$2 = G__195__2;
G__195.cljs$core$IFn$_invoke$arity$3 = G__195__3;
G__195.cljs$core$IFn$_invoke$arity$4 = G__195__4;
G__195.cljs$core$IFn$_invoke$arity$5 = G__195__5;
G__195.cljs$core$IFn$_invoke$arity$6 = G__195__6;
G__195.cljs$core$IFn$_invoke$arity$7 = G__195__7;
G__195.cljs$core$IFn$_invoke$arity$8 = G__195__8;
G__195.cljs$core$IFn$_invoke$arity$9 = G__195__9;
G__195.cljs$core$IFn$_invoke$arity$10 = G__195__10;
G__195.cljs$core$IFn$_invoke$arity$11 = G__195__11;
G__195.cljs$core$IFn$_invoke$arity$12 = G__195__12;
G__195.cljs$core$IFn$_invoke$arity$13 = G__195__13;
G__195.cljs$core$IFn$_invoke$arity$14 = G__195__14;
G__195.cljs$core$IFn$_invoke$arity$15 = G__195__15;
G__195.cljs$core$IFn$_invoke$arity$16 = G__195__16;
G__195.cljs$core$IFn$_invoke$arity$17 = G__195__17;
G__195.cljs$core$IFn$_invoke$arity$18 = G__195__18;
G__195.cljs$core$IFn$_invoke$arity$19 = G__195__19;
G__195.cljs$core$IFn$_invoke$arity$20 = G__195__20;
G__195.cljs$core$IFn$_invoke$arity$21 = G__195__21;
G__195.cljs$core$IFn$_invoke$arity$22 = G__195__22;
return G__195;
})()
);

(reagent.impl.util.PartialFn.prototype.apply = (function (self__,args194){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args194)));
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$0 = (function (){
var self__ = this;
var _ = this;
return self__.pfn.call(null);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$1 = (function (a){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$6 = (function (a,b,c,d,e,f__$1){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$7 = (function (a,b,c,d,e,f__$1,g){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$8 = (function (a,b,c,d,e,f__$1,g,h){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$9 = (function (a,b,c,d,e,f__$1,g,h,i){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$10 = (function (a,b,c,d,e,f__$1,g,h,i,j){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$11 = (function (a,b,c,d,e,f__$1,g,h,i,j,k){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$12 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$13 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$14 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$15 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$16 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$17 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$18 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$19 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$20 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t){
var self__ = this;
var _ = this;
return self__.pfn.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IFn$_invoke$arity$21 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
var self__ = this;
var _ = this;
return cljs.core.apply.call(null,self__.pfn,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest);
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof reagent.impl.util.PartialFn)) && (cljs.core._EQ_.call(null,self__.f,other.f)) && (cljs.core._EQ_.call(null,self__.args,other.args)));
}));

(reagent.impl.util.PartialFn.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.f,self__.args], null));
}));

(reagent.impl.util.PartialFn.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pfn","pfn",(-513383568),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null);
}));

(reagent.impl.util.PartialFn.cljs$lang$type = true);

(reagent.impl.util.PartialFn.cljs$lang$ctorStr = "reagent.impl.util/PartialFn");

(reagent.impl.util.PartialFn.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.impl.util/PartialFn");
}));

/**
 * Positional factory function for reagent.impl.util/PartialFn.
 */
reagent.impl.util.__GT_PartialFn = (function reagent$impl$util$__GT_PartialFn(pfn,f,args){
return (new reagent.impl.util.PartialFn(pfn,f,args));
});

reagent.impl.util.make_partial_fn = (function reagent$impl$util$make_partial_fn(f,args){
return reagent.impl.util.__GT_PartialFn.call(null,cljs.core.apply.call(null,cljs.core.partial,f,args),f,args);
});
reagent.impl.util.named_QMARK_ = (function reagent$impl$util$named_QMARK_(x){
return (((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol)));
});
reagent.impl.util.class_names = (function reagent$impl$util$class_names(var_args){
var G__200 = arguments.length;
switch (G__200) {
case (0):
return reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$0();

break;
case (1):
return reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___202 = arguments.length;
var i__12446__auto___203 = (0);
while(true){
if((i__12446__auto___203 < len__12445__auto___202)){
args_arr__12515__auto__.push((arguments[i__12446__auto___203]));

var G__204 = (i__12446__auto___203 + (1));
i__12446__auto___203 = G__204;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((2)),(0),null));
return reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12516__auto__);

}
});

(reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$1 = (function (class$){
if(cljs.core.coll_QMARK_.call(null,class$)){
var classes = cljs.core.keep.call(null,(function (c){
if(cljs.core.truth_(c)){
if(reagent.impl.util.named_QMARK_.call(null,c)){
return cljs.core.name.call(null,c);
} else {
return c;
}
} else {
return null;
}
}),class$);
if(cljs.core.seq.call(null,classes)){
return clojure.string.join.call(null," ",classes);
} else {
return null;
}
} else {
if(reagent.impl.util.named_QMARK_.call(null,class$)){
return cljs.core.name.call(null,class$);
} else {
return class$;
}
}
}));

(reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
if(cljs.core.truth_(a)){
if(cljs.core.truth_(b)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(reagent.impl.util.class_names.call(null,a))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reagent.impl.util.class_names.call(null,b))].join('');
} else {
return reagent.impl.util.class_names.call(null,a);
}
} else {
return reagent.impl.util.class_names.call(null,b);
}
}));

(reagent.impl.util.class_names.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,rst){
return cljs.core.reduce.call(null,reagent.impl.util.class_names,reagent.impl.util.class_names.call(null,a,b),rst);
}));

/** @this {Function} */
(reagent.impl.util.class_names.cljs$lang$applyTo = (function (seq197){
var G__198 = cljs.core.first.call(null,seq197);
var seq197__$1 = cljs.core.next.call(null,seq197);
var G__199 = cljs.core.first.call(null,seq197__$1);
var seq197__$2 = cljs.core.next.call(null,seq197__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__198,G__199,seq197__$2);
}));

(reagent.impl.util.class_names.cljs$lang$maxFixedArity = (2));

reagent.impl.util.merge_class = (function reagent$impl$util$merge_class(p1,p2){
return cljs.core.assoc.call(null,p2,new cljs.core.Keyword(null,"class","class",(-2030961996)),reagent.impl.util.class_names.call(null,new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(p1),new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(p2)));
});
reagent.impl.util.merge_style = (function reagent$impl$util$merge_style(p1,p2){
var style = (function (){var temp__9646__auto__ = new cljs.core.Keyword(null,"style","style",(-496642736)).cljs$core$IFn$_invoke$arity$1(p1);
if(cljs.core.truth_(temp__9646__auto__)){
var s1 = temp__9646__auto__;
var temp__9646__auto____$1 = new cljs.core.Keyword(null,"style","style",(-496642736)).cljs$core$IFn$_invoke$arity$1(p2);
if(cljs.core.truth_(temp__9646__auto____$1)){
var s2 = temp__9646__auto____$1;
return cljs.core.merge.call(null,s1,s2);
} else {
return null;
}
} else {
return null;
}
})();
if((style == null)){
return p2;
} else {
return cljs.core.assoc.call(null,p2,new cljs.core.Keyword(null,"style","style",(-496642736)),style);
}
});
reagent.impl.util.merge_props = (function reagent$impl$util$merge_props(var_args){
var G__209 = arguments.length;
switch (G__209) {
case (0):
return reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$0();

break;
case (1):
return reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___211 = arguments.length;
var i__12446__auto___212 = (0);
while(true){
if((i__12446__auto___212 < len__12445__auto___211)){
args_arr__12515__auto__.push((arguments[i__12446__auto___212]));

var G__213 = (i__12446__auto___212 + (1));
i__12446__auto___212 = G__213;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((2)),(0),null));
return reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12516__auto__);

}
});

(reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$1 = (function (p){
var temp__9584__auto__ = new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(p);
if(cljs.core.truth_(temp__9584__auto__)){
var c = temp__9584__auto__;
return cljs.core.assoc.call(null,p,new cljs.core.Keyword(null,"class","class",(-2030961996)),reagent.impl.util.class_names.call(null,c));
} else {
return p;
}
}));

(reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$2 = (function (p1,p2){
if((p1 == null)){
var temp__9584__auto__ = new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(p2);
if(cljs.core.truth_(temp__9584__auto__)){
var c = temp__9584__auto__;
return cljs.core.assoc.call(null,p2,new cljs.core.Keyword(null,"class","class",(-2030961996)),reagent.impl.util.class_names.call(null,c));
} else {
return p2;
}
} else {
if(cljs.core.map_QMARK_.call(null,p1)){
} else {
throw (new Error(["Assert failed: ",["Property must be a map, not ",cljs.core.pr_str.call(null,p1)].join(''),"\n","(map? p1)"].join('')));
}

return cljs.core.merge.call(null,p1,reagent.impl.util.merge_style.call(null,p1,reagent.impl.util.merge_class.call(null,p1,p2)));
}
}));

(reagent.impl.util.merge_props.cljs$core$IFn$_invoke$arity$variadic = (function (p1,p2,ps){
return cljs.core.reduce.call(null,reagent.impl.util.merge_props,reagent.impl.util.merge_props.call(null,p1,p2),ps);
}));

/** @this {Function} */
(reagent.impl.util.merge_props.cljs$lang$applyTo = (function (seq206){
var G__207 = cljs.core.first.call(null,seq206);
var seq206__$1 = cljs.core.next.call(null,seq206);
var G__208 = cljs.core.first.call(null,seq206__$1);
var seq206__$2 = cljs.core.next.call(null,seq206__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__207,G__208,seq206__$2);
}));

(reagent.impl.util.merge_props.cljs$lang$maxFixedArity = (2));

reagent.impl.util._STAR_always_update_STAR_ = false;
reagent.impl.util.force_update = (function reagent$impl$util$force_update(comp,deep){
if(cljs.core.truth_(deep)){
var _STAR_always_update_STAR__orig_val__214 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__215 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__215);

try{return comp.forceUpdate();
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__214);
}} else {
return comp.forceUpdate();
}
});

//# sourceURL=reagent/impl/util.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9pbXBsL3V0aWwuanMiLCJzb3VyY2VzIjpbInV0aWwuY2xqcyJdLCJsaW5lQ291bnQiOjcxNiwibWFwcGluZ3MiOiI7QUFHQSxBQUFLQSw4QkFBVSxFQUFLLFFBQUFDLDZCQUNBLEdBQUEsb0JBQUEsbkJBQUksQUFBWUE7QUFFcEMsNkNBQUEsN0NBQXdCQztBQU14Qiw4QkFBQSw5QkFBTUMsb0VBQVdDO0FBQWpCLEFBQ0UsSUFBTUMsTUFBSSx5QkFBQSx6QkFBQ0M7QUFBWCxBQUNFLGtCQUFLQztBQUFMLEFBQ0UsSUFBTUMsSUFBRSx3QkFBQSxBQUFBQyx4QkFBQ0Msa0RBQUtMLEtBQUlFO0FBQWxCLEFBQ0UsR0FBQSxHQUFRLE1BQUEsTEFBTUM7QUFDWkE7O0FBQ0EsSUFBTUcsTUFBSSxBQUFDUCxZQUFFRztBQUFiLEFBQ0UsQUFBQ0ssK0JBQU1QLElBQUlRLGdCQUFNTixJQUFJSTs7QUFDckJBOzs7O0FBRVosb0NBQUEsaUZBQUEsWUFBQSxqSUFBS0c7QUFFTCwrQkFBQSwvQkFBTUMsc0VBQVlDO0FBQWxCLEFBQ0UsR0FBSSxnQ0FBQSwvQkFBRyxBQUFDQywwQkFBTUQ7QUFDWixPQUFDRSxvQ0FBa0JGOztBQUNuQixRQUFLLEFBQUNFLG9DQUFrQiwyQkFBQSxJQUFBLC9CQUFDQyx5QkFBS0gsWUFBUSwyQkFBQSwzQkFBQ0cseUJBQUtIOzs7QUFFaEQsc0NBQUEsdENBQU1JLG9GQUFtQkM7QUFBekIsQUFDRSxHQUFJLE9BQVNBO0FBQ1hBOztBQUNBLElBQU1PLFdBQVMsQUFBQ0MseUJBQUtSO0lBQXJCQyxXQUNzQix3Q0FBQSx4Q0FBQ1UsK0JBQWFKO0lBRHBDTCxXQUFBLEFBQUFDLHdCQUFBRjtJQUFBRyxhQUFBLEFBQUFDLDBCQUFBSDtJQUFBQSxlQUFBLEFBQUFJLHlCQUFBSjtZQUFBRSxSQUNPSztZQURQUCxSQUNlUTtBQURmLEFBRUUsb0JBQUksQUFBQ2pCLDRDQUFnQmdCO0FBQ25CRjs7QUFDQSxPQUFDSywwQkFBTUMsY0FBSUosTUFBTSxB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LCJyZWFnZW50LmltcGwudXRpbC8qbm9uLXJlYWN0aXZlKiIsInJlYWdlbnQuaW1wbC51dGlsL21lbW9pemUtMSIsImYiLCJtZW0iLCJjbGpzLmNvcmUvYXRvbSIsImFyZyIsInYiLCJjbGpzLmNvcmUvZGVyZWYiLCJjbGpzLmNvcmUvZ2V0IiwicmV0IiwiY2xqcy5jb3JlL3N3YXAhIiwiY2xqcy5jb3JlL2Fzc29jIiwicmVhZ2VudC5pbXBsLnV0aWwvZG9udC1jYW1lbC1jYXNlIiwicmVhZ2VudC5pbXBsLnV0aWwvY2FwaXRhbGl6ZSIsInMiLCJjbGpzLmNvcmUvY291bnQiLCJjbG9qdXJlLnN0cmluZy91cHBlci1jYXNlIiwiY2xqcy5jb3JlL3N1YnMiLCJyZWFnZW50LmltcGwudXRpbC9kYXNoLXRvLXByb3AtbmFtZSIsImRhc2hlZCIsInZlY19fMTgyIiwic2VxX18xODMiLCJjbGpzLmNvcmUvc2VxIiwiZmlyc3RfXzE4NCIsImNsanMuY29yZS9maXJzdCIsImNsanMuY29yZS9uZXh0IiwibmFtZS1zdHIiLCJjbGpzLmNvcmUvbmFtZSIsInN0YXJ0IiwicGFydHMiLCJjbG9qdXJlLnN0cmluZy9zcGxpdCIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS9zdHIiLCJjbGpzLmNvcmUvbWFwIiwicmVhZ2VudC5pbXBsLnV0aWwvZGFzaC10by1tZXRob2QtbmFtZSIsInZlY19fMTg1Iiwic2VxX18xODYiLCJmaXJzdF9fMTg3IiwiY2xvanVyZS5zdHJpbmcvcmVwbGFjZSIsInJlYWdlbnQuaW1wbC51dGlsL2Z1bi1uYW1lIiwibiIsIm9yX18xMDExMl9fYXV0b19fIiwiY2xqcy5jb3JlL2ZuPyIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsIm0iLCJjbGpzLmNvcmUvbWV0YSIsImNsanMuY29yZS9tYXA/Iiwic2VsZl9fIiwiYXJnczE5NCIsImNsanMuY29yZS9hY2xvbmUiLCJ0aGlzX18xMTA1NV9fYXV0b19fIiwid3JpdGVyX18xMTA1Nl9fYXV0b19fIiwib3B0X18xMTA1N19fYXV0b19fIiwiY2xqcy5jb3JlLy13cml0ZSIsInJlYWdlbnQuaW1wbC51dGlsL1BhcnRpYWxGbiIsInJlYWdlbnQuaW1wbC51dGlsLy0+UGFydGlhbEZuIiwicGZuIiwiYXJncyIsIl8iLCJhIiwiYiIsImMiLCJkIiwiZSIsImciLCJoIiwiaSIsImoiLCJrIiwibCIsIm8iLCJwIiwicSIsInIiLCJ0IiwicmVzdCIsIm90aGVyIiwiY2xqcy5jb3JlLz0iLCJjbGpzLmNvcmUvaGFzaCIsInJlYWdlbnQuaW1wbC51dGlsL21ha2UtcGFydGlhbC1mbiIsImNsanMuY29yZS9wYXJ0aWFsIiwicmVhZ2VudC5pbXBsLnV0aWwvbmFtZWQ/IiwieCIsImNsanMuY29yZS9LZXl3b3JkIiwiY2xqcy5jb3JlL1N5bWJvbCIsInZhcl9hcmdzIiwiR19fMjAwIiwicmVhZ2VudC5pbXBsLnV0aWwvY2xhc3MtbmFtZXMiLCJhcmdzLWFycl9fMTI1MTVfX2F1dG9fXyIsImxlbl9fMTI0NDVfX2F1dG9fXyIsImlfXzEyNDQ2X19hdXRvX18iLCJhcmdzZXFfXzEyNTE2X19hdXRvX18iLCJzZXExOTciLCJHX18xOTgiLCJHX18xOTkiLCJzZWxmX18xMjQyMF9fYXV0b19fIiwiY2xhc3MiLCJjbGpzLmNvcmUvY29sbD8iLCJjbGFzc2VzIiwiY2xqcy5jb3JlL2tlZXAiLCJjbG9qdXJlLnN0cmluZy9qb2luIiwicnN0IiwiY2xqcy5jb3JlL3JlZHVjZSIsInJlYWdlbnQuaW1wbC51dGlsL21lcmdlLWNsYXNzIiwicDEiLCJwMiIsInJlYWdlbnQuaW1wbC51dGlsL21lcmdlLXN0eWxlIiwic3R5bGUiLCJ0ZW1wX185NjQ2X19hdXRvX18iLCJzMSIsInMyIiwiY2xqcy5jb3JlL21lcmdlIiwiR19fMjA5IiwicmVhZ2VudC5pbXBsLnV0aWwvbWVyZ2UtcHJvcHMiLCJzZXEyMDYiLCJHX18yMDciLCJHX18yMDgiLCJ0ZW1wX185NTg0X19hdXRvX18iLCJqcy9FcnJvciIsImNsanMuY29yZS9wci1zdHIiLCJwcyIsInJlYWdlbnQuaW1wbC51dGlsLyphbHdheXMtdXBkYXRlKiIsInJlYWdlbnQuaW1wbC51dGlsL2ZvcmNlLXVwZGF0ZSIsImNvbXAiLCJkZWVwIiwiKmFsd2F5cy11cGRhdGUqLW9yaWctdmFsX18yMTQiLCIqYWx3YXlzLXVwZGF0ZSotdGVtcC12YWxfXzIxNSIsImNsanMuY29yZS9JbmRleGVkU2VxIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZWFnZW50LmltcGwudXRpbFxuICAoOnJlcXVpcmUgW2Nsb2p1cmUuc3RyaW5nIDphcyBzdHJpbmddKSlcblxuKGRlZiBpcy1jbGllbnQgKGFuZCAoZXhpc3RzPyBqcy93aW5kb3cpXG4gICAgICAgICAgICAgICAgICAgICgtPiAoLi1kb2N1bWVudCBqcy93aW5kb3cpIG5pbD8gbm90KSkpXG5cbihkZWYgXjpkeW5hbWljIF5ib29sZWFuICpub24tcmVhY3RpdmUqIGZhbHNlKVxuXG47OzsgUHJvcHMgYWNjZXNzb3JzXG5cbjs7IE1pc2MgdXRpbGl0aWVzXG5cbihkZWZuIG1lbW9pemUtMSBbZl1cbiAgKGxldCBbbWVtIChhdG9tIHt9KV1cbiAgICAoZm4gW2FyZ11cbiAgICAgIChsZXQgW3YgKGdldCBAbWVtIGFyZyldXG4gICAgICAgIChpZi1ub3QgKG5pbD8gdilcbiAgICAgICAgICB2XG4gICAgICAgICAgKGxldCBbcmV0IChmIGFyZyldXG4gICAgICAgICAgICAoc3dhcCEgbWVtIGFzc29jIGFyZyByZXQpXG4gICAgICAgICAgICByZXQpKSkpKSlcblxuKGRlZiBkb250LWNhbWVsLWNhc2UgI3tcImFyaWFcIiBcImRhdGFcIn0pXG5cbihkZWZuIGNhcGl0YWxpemUgW3NdXG4gIChpZiAoPCAoY291bnQgcykgMilcbiAgICAoc3RyaW5nL3VwcGVyLWNhc2UgcylcbiAgICAoc3RyIChzdHJpbmcvdXBwZXItY2FzZSAoc3VicyBzIDAgMSkpIChzdWJzIHMgMSkpKSlcblxuKGRlZm4gZGFzaC10by1wcm9wLW5hbWUgW2Rhc2hlZF1cbiAgKGlmIChzdHJpbmc/IGRhc2hlZClcbiAgICBkYXNoZWRcbiAgICAobGV0IFtuYW1lLXN0ciAobmFtZSBkYXNoZWQpXG4gICAgICAgICAgW3N0YXJ0ICYgcGFydHNdIChzdHJpbmcvc3BsaXQgbmFtZS1zdHIgI1wiLVwiKV1cbiAgICAgIChpZiAoZG9udC1jYW1lbC1jYXNlIHN0YXJ0KVxuICAgICAgICBuYW1lLXN0clxuICAgICAgICAoYXBwbHkgc3RyIHN0YXJ0IChtYXAgY2FwaXRhbGl6ZSBwYXJ0cykpKSkpKVxuXG4oZGVmbiBkYXNoLXRvLW1ldGhvZC1uYW1lIFtkYXNoZWRdXG4gIChpZiAoc3RyaW5nPyBkYXNoZWQpXG4gICAgZGFzaGVkXG4gICAgKGxldCBbbmFtZS1zdHIgKG5hbWUgZGFzaGVkKVxuICAgICAgICAgIG5hbWUtc3RyIChzdHJpbmcvcmVwbGFjZSBuYW1lLXN0ciAjXCIodW5zYWZlfFVOU0FGRSlbLV9dXCIgXCJVTlNBRkVfXCIpXG4gICAgICAgICAgW3N0YXJ0ICYgcGFydHNdIChzdHJpbmcvc3BsaXQgbmFtZS1zdHIgI1wiLVwiKV1cbiAgICAgIChhcHBseSBzdHIgc3RhcnQgKG1hcCBjYXBpdGFsaXplIHBhcnRzKSkpKSlcblxuKGRlZm4gZnVuLW5hbWUgW2ZdXG4gIChsZXQgW24gKG9yIChhbmQgKGZuPyBmKVxuICAgICAgICAgICAgICAgICAgIChvciAoLi1kaXNwbGF5TmFtZSBmKVxuICAgICAgICAgICAgICAgICAgICAgICAobGV0IFtuICguLW5hbWUgZildXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGlmIChhbmQgKHN0cmluZz8gbikgKHNlcSBuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG4pKSkpXG4gICAgICAgICAgICAgIChhbmQgKGltcGxlbWVudHM/IElOYW1lZCBmKVxuICAgICAgICAgICAgICAgICAgIChuYW1lIGYpKVxuICAgICAgICAgICAgICAobGV0IFttIChtZXRhIGYpXVxuICAgICAgICAgICAgICAgIChpZiAobWFwPyBtKVxuICAgICAgICAgICAgICAgICAgKDpuYW1lIG0pKSkpXVxuICAgIChpZiBuXG4gICAgICAoc3RyaW5nL3JlcGxhY2UgKHN0ciBuKSBcIiRcIiBcIi5cIikpKSlcblxuKGRlZnR5cGUgUGFydGlhbEZuIFtwZm4gZiBhcmdzXVxuICBGblxuICBJRm5cbiAgKC1pbnZva2UgW19dXG4gICAgKHBmbikpXG4gICgtaW52b2tlIFtfIGFdXG4gICAgKHBmbiBhKSlcbiAgKC1pbnZva2UgW18gYSBiXVxuICAgIChwZm4gYSBiKSlcbiAgKC1pbnZva2UgW18gYSBiIGNdXG4gICAgKHBmbiBhIGIgYykpXG4gICgtaW52b2tlIFtfIGEgYiBjIGRdXG4gICAgKHBmbiBhIGIgYyBkKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlXVxuICAgIChwZm4gYSBiIGMgZCBlKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGZdXG4gICAgKHBmbiBhIGIgYyBkIGUgZikpXG4gICgtaW52b2tlIFtfIGEgYiBjIGQgZSBmIGddXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoXVxuICAgIChwZm4gYSBiIGMgZCBlIGYgZyBoKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGldXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSkpXG4gICgtaW52b2tlIFtfIGEgYiBjIGQgZSBmIGcgaCBpIGpdXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrXVxuICAgIChwZm4gYSBiIGMgZCBlIGYgZyBoIGkgaiBrKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGxdXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCkpXG4gICgtaW52b2tlIFtfIGEgYiBjIGQgZSBmIGcgaCBpIGogayBsIG1dXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuXVxuICAgIChwZm4gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG9dXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbykpXG4gICgtaW52b2tlIFtfIGEgYiBjIGQgZSBmIGcgaCBpIGogayBsIG0gbiBvIHBdXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxXVxuICAgIChwZm4gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxIHJdXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwIHEgcikpXG4gICgtaW52b2tlIFtfIGEgYiBjIGQgZSBmIGcgaCBpIGogayBsIG0gbiBvIHAgcSByIHNdXG4gICAgKHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwIHEgciBzKSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxIHIgcyB0XVxuICAgIChwZm4gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxIHIgcyB0KSlcbiAgKC1pbnZva2UgW18gYSBiIGMgZCBlIGYgZyBoIGkgaiBrIGwgbSBuIG8gcCBxIHIgcyB0IHJlc3RdXG4gICAgKGFwcGx5IHBmbiBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwIHEgciBzIHQgcmVzdCkpXG4gIElFcXVpdlxuICAoLWVxdWl2IFtfIF5jbGogb3RoZXJdXG4gICAgKGFuZCAoaW5zdGFuY2U/IFBhcnRpYWxGbiBvdGhlcilcbiAgICAgICAgICg9IGYgKC4tZiBvdGhlcikpXG4gICAgICAgICAoPSBhcmdzICguLWFyZ3Mgb3RoZXIpKSkpXG4gIElIYXNoXG4gICgtaGFzaCBbX10gKGhhc2ggW2YgYXJnc10pKSlcblxuKGRlZm4gbWFrZS1wYXJ0aWFsLWZuIFtmIGFyZ3NdXG4gICgtPlBhcnRpYWxGbiAoYXBwbHkgcGFydGlhbCBmIGFyZ3MpIGYgYXJncykpXG5cbihkZWZuIF5ib29sZWFuIG5hbWVkPyBbeF1cbiAgKG9yIChrZXl3b3JkPyB4KVxuICAgICAgKHN5bWJvbD8geCkpKVxuXG4oZGVmbiBjbGFzcy1uYW1lc1xuICAoW10pXG4gIChbY2xhc3NdXG4gICAoaWYgKGNvbGw/IGNsYXNzKVxuICAgICAobGV0IFtjbGFzc2VzIChrZWVwIChmbiBbY11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChpZiBjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpZiAobmFtZWQ/IGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5hbWUgYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3MpXVxuICAgICAgIChpZiAoc2VxIGNsYXNzZXMpXG4gICAgICAgICAoc3RyaW5nL2pvaW4gXCIgXCIgY2xhc3NlcykpKVxuICAgICAoaWYgKG5hbWVkPyBjbGFzcylcbiAgICAgICAobmFtZSBjbGFzcylcbiAgICAgICBjbGFzcykpKVxuICAoW2EgYl1cbiAgIChpZiBhXG4gICAgIChpZiBiXG4gICAgICAgKHN0ciAoY2xhc3MtbmFtZXMgYSkgXCIgXCIgKGNsYXNzLW5hbWVzIGIpKVxuICAgICAgIChjbGFzcy1uYW1lcyBhKSlcbiAgICAgKGNsYXNzLW5hbWVzIGIpKSlcbiAgKFthIGIgJiByc3RdXG4gICAocmVkdWNlIGNsYXNzLW5hbWVzXG4gICAgICAgICAgIChjbGFzcy1uYW1lcyBhIGIpXG4gICAgICAgICAgIHJzdCkpKVxuXG4oZGVmbi0gbWVyZ2UtY2xhc3MgW3AxIHAyXVxuICAoYXNzb2MgcDIgOmNsYXNzIChjbGFzcy1uYW1lcyAoOmNsYXNzIHAxKSAoOmNsYXNzIHAyKSkpKVxuXG4oZGVmbi0gbWVyZ2Utc3R5bGUgW3AxIHAyXVxuICAobGV0IFtzdHlsZSAod2hlbi1sZXQgW3MxICg6c3R5bGUgcDEpXVxuICAgICAgICAgICAgICAgICh3aGVuLWxldCBbczIgKDpzdHlsZSBwMildXG4gICAgICAgICAgICAgICAgICAobWVyZ2UgczEgczIpKSldXG4gICAgKGlmIChuaWw/IHN0eWxlKVxuICAgICAgcDJcbiAgICAgIChhc3NvYyBwMiA6c3R5bGUgc3R5bGUpKSkpXG5cbihkZWZuIG1lcmdlLXByb3BzXG4gIChbXSBuaWwpXG4gIDs7IE5vcm1hbGl6ZSA6Y2xhc3MgZXZlbiBpZiB0aGVyZSBhcmUgbm8gbWVyZ2luZ1xuICAoW3BdXG4gICAoaWYtbGV0IFtjICg6Y2xhc3MgcCldXG4gICAgIChhc3NvYyBwIDpjbGFzcyAoY2xhc3MtbmFtZXMgYykpXG4gICAgIHApKVxuICAoW3AxIHAyXVxuICAgKGlmIChuaWw/IHAxKVxuICAgICAoaWYtbGV0IFtjICg6Y2xhc3MgcDIpXVxuICAgICAgIChhc3NvYyBwMiA6Y2xhc3MgKGNsYXNzLW5hbWVzIGMpKVxuICAgICAgIHAyKVxuICAgICAoZG9cbiAgICAgICAoYXNzZXJ0IChtYXA/IHAxKVxuICAgICAgICAgICAgICAgKHN0ciBcIlByb3BlcnR5IG11c3QgYmUgYSBtYXAsIG5vdCBcIiAocHItc3RyIHAxKSkpXG4gICAgICAgKG1lcmdlIHAxIChtZXJnZS1zdHlsZSBwMSAobWVyZ2UtY2xhc3MgcDEgcDIpKSkpKSlcbiAgKFtwMSBwMiAmIHBzXVxuICAgKHJlZHVjZSBtZXJnZS1wcm9wcyAobWVyZ2UtcHJvcHMgcDEgcDIpIHBzKSkpXG5cbihkZWYgXjpkeW5hbWljICphbHdheXMtdXBkYXRlKiBmYWxzZSlcblxuKGRlZm4gZm9yY2UtdXBkYXRlIFteanMvUmVhY3QuQ29tcG9uZW50IGNvbXAgZGVlcF1cbiAgKGlmIGRlZXBcbiAgICAoYmluZGluZyBbKmFsd2F5cy11cGRhdGUqIHRydWVdXG4gICAgICAoLmZvcmNlVXBkYXRlIGNvbXApKVxuICAgICguZm9yY2VVcGRhdGUgY29tcCkpKVxuIl19