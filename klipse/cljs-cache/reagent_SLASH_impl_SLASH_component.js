// Compiled by ClojureScript 1.10.597
goog.provide("reagent.impl.component");
reagent.impl.component.global$module$react = goog.global["React"];
reagent.impl.component.shallow_obj_to_map = (function reagent$impl$component$shallow_obj_to_map(o){
var ks = cljs.core.js_keys.call(null,o);
var len = ks.length;
var m = cljs.core.PersistentArrayMap.EMPTY;
var i = (0);
while(true){
if((i < len)){
var k = (ks[i]);
var G__460 = cljs.core.assoc.call(null,m,cljs.core.keyword.call(null,k),goog.object.get(o,k));
var G__461 = (i + (1));
m = G__460;
i = G__461;
continue;
} else {
return m;
}
break;
}
});
reagent.impl.component.extract_props = (function reagent$impl$component$extract_props(v){
var p = cljs.core.nth.call(null,v,(1),null);
if(cljs.core.map_QMARK_.call(null,p)){
return p;
} else {
return null;
}
});
reagent.impl.component.extract_children = (function reagent$impl$component$extract_children(v){
var p = cljs.core.nth.call(null,v,(1),null);
var first_child = (((((p == null)) || (cljs.core.map_QMARK_.call(null,p))))?(2):(1));
if((cljs.core.count.call(null,v) > first_child)){
return cljs.core.subvec.call(null,v,first_child);
} else {
return null;
}
});
reagent.impl.component.props_argv = (function reagent$impl$component$props_argv(c,p){
var temp__9814__auto__ = p.argv;
if((temp__9814__auto__ == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c.constructor,reagent.impl.component.shallow_obj_to_map.call(null,p)], null);
} else {
var a = temp__9814__auto__;
return a;
}
});
reagent.impl.component.get_argv = (function reagent$impl$component$get_argv(c){
return reagent.impl.component.props_argv.call(null,c,c.props);
});
reagent.impl.component.get_props = (function reagent$impl$component$get_props(c){
var p = c.props;
var temp__9814__auto__ = p.argv;
if((temp__9814__auto__ == null)){
return reagent.impl.component.shallow_obj_to_map.call(null,p);
} else {
var v = temp__9814__auto__;
return reagent.impl.component.extract_props.call(null,v);
}
});
reagent.impl.component.get_children = (function reagent$impl$component$get_children(c){
var p = c.props;
var temp__9814__auto__ = p.argv;
if((temp__9814__auto__ == null)){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,reagent.impl.component.global$module$react.Children.toArray(p.children));
} else {
var v = temp__9814__auto__;
return reagent.impl.component.extract_children.call(null,v);
}
});
reagent.impl.component.reagent_class_QMARK_ = (function reagent$impl$component$reagent_class_QMARK_(c){
return ((cljs.core.fn_QMARK_.call(null,c)) && ((!(((function (){var G__463 = c;
var G__463__$1 = (((G__463 == null))?null:G__463.prototype);
if((G__463__$1 == null)){
return null;
} else {
return G__463__$1.reagentRender;
}
})() == null)))));
});
reagent.impl.component.react_class_QMARK_ = (function reagent$impl$component$react_class_QMARK_(c){
return ((cljs.core.fn_QMARK_.call(null,c)) && ((!(((function (){var G__465 = c;
var G__465__$1 = (((G__465 == null))?null:G__465.prototype);
if((G__465__$1 == null)){
return null;
} else {
return G__465__$1.render;
}
})() == null)))));
});
reagent.impl.component.reagent_component_QMARK_ = (function reagent$impl$component$reagent_component_QMARK_(c){
return (!((c.reagentRender == null)));
});
reagent.impl.component.cached_react_class = (function reagent$impl$component$cached_react_class(c){
return c.cljsReactClass;
});
reagent.impl.component.cache_react_class = (function reagent$impl$component$cache_react_class(c,constructor$){
return (c.cljsReactClass = constructor$);
});
reagent.impl.component.state_atom = (function reagent$impl$component$state_atom(this$){
var sa = this$.cljsState;
if((!((sa == null)))){
return sa;
} else {
return (this$.cljsState = reagent.ratom.atom.call(null,null));
}
});
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.component !== 'undefined') && (typeof reagent.impl.component.as_element !== 'undefined')){
} else {
reagent.impl.component.as_element = null;
}
/**
 * Calls the render function of the component `c`.  If result `res` evaluates to a:
 *   1) Vector (form-1 component) - Treats the vector as hiccup and returns
 *      a react element with a render function based on that hiccup
 *   2) Function (form-2 component) - updates the render function to `res` i.e. the internal function
 *      and calls wrap-render again (`recur`), until the render result doesn't evaluate to a function.
 *   3) Anything else - Returns the result of evaluating `c`
 */
reagent.impl.component.wrap_render = (function reagent$impl$component$wrap_render(c){
while(true){
var f = c.reagentRender;
var _ = ((cljs.core.ifn_QMARK_.call(null,f))?null:(function(){throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.call(null,f)].join(''),"\n","(cljs.core/ifn? f)"].join('')))})());
var res = ((c.cljsLegacyRender === true)?f.call(c,c):(function (){var v = reagent.impl.component.get_argv.call(null,c);
var n = cljs.core.count.call(null,v);
var G__466 = n;
switch (G__466) {
case (1):
return f.call(c);

break;
case (2):
return f.call(c,cljs.core.nth.call(null,v,(1)));

break;
case (3):
return f.call(c,cljs.core.nth.call(null,v,(1)),cljs.core.nth.call(null,v,(2)));

break;
case (4):
return f.call(c,cljs.core.nth.call(null,v,(1)),cljs.core.nth.call(null,v,(2)),cljs.core.nth.call(null,v,(3)));

break;
case (5):
return f.call(c,cljs.core.nth.call(null,v,(1)),cljs.core.nth.call(null,v,(2)),cljs.core.nth.call(null,v,(3)),cljs.core.nth.call(null,v,(4)));

break;
default:
return f.apply(c,cljs.core.into_array.call(null,v).slice((1)));

}
})());
if(cljs.core.vector_QMARK_.call(null,res)){
return reagent.impl.component.as_element.call(null,res);
} else {
if(cljs.core.ifn_QMARK_.call(null,res)){
var f__$1 = ((reagent.impl.component.reagent_class_QMARK_.call(null,res))?((function (c,f,_,res){
return (function() { 
var G__468__delegate = function (args){
return reagent.impl.component.as_element.call(null,cljs.core.apply.call(null,cljs.core.vector,res,args));
};
var G__468 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__469__i = 0, G__469__a = new Array(arguments.length -  0);
while (G__469__i < G__469__a.length) {G__469__a[G__469__i] = arguments[G__469__i + 0]; ++G__469__i;}
  args = new cljs.core.IndexedSeq(G__469__a,0,null);
} 
return G__468__delegate.call(this,args);};
G__468.cljs$lang$maxFixedArity = 0;
G__468.cljs$lang$applyTo = (function (arglist__470){
var args = cljs.core.seq(arglist__470);
return G__468__delegate(args);
});
G__468.cljs$core$IFn$_invoke$arity$variadic = G__468__delegate;
return G__468;
})()
;})(c,f,_,res))
:res);
(c.reagentRender = f__$1);

var G__471 = c;
c = G__471;
continue;
} else {
return res;

}
}
break;
}
});
reagent.impl.component.component_name = (function reagent$impl$component$component_name(c){
var G__472 = c;
var G__472__$1 = (((G__472 == null))?null:G__472.constructor);
if((G__472__$1 == null)){
return null;
} else {
return G__472__$1.displayName;
}
});
reagent.impl.component.comp_name = (function reagent$impl$component$comp_name(){
var c = reagent.impl.component._STAR_current_component_STAR_;
var n = reagent.impl.component.component_name.call(null,c);
if((!(cljs.core.empty_QMARK_.call(null,n)))){
return [" (in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),")"].join('');
} else {
return "";
}

});
reagent.impl.component.do_render = (function reagent$impl$component$do_render(c){
var _STAR_current_component_STAR__orig_val__473 = reagent.impl.component._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__474 = c;
(reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__474);

try{var ok = [false];
try{var res = reagent.impl.component.wrap_render.call(null,c);
(ok[(0)] = true);

return res;
}finally {if(cljs.core.truth_((ok[(0)]))){
} else {
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).error(["Error rendering component",reagent.impl.component.comp_name.call(null)].join(''));
} else {
}
}
}
}finally {(reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__473);
}});
reagent.impl.component.rat_opts = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-cache","no-cache",(1588056370)),true], null);
reagent.impl.component.static_fns = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",(-1408033454)),(function reagent$impl$component$render(){
var c = this;
if(reagent.impl.util._STAR_non_reactive_STAR_){
return reagent.impl.component.do_render.call(null,c);
} else {
var rat = goog.object.get(c,"cljsRatom");
reagent.impl.batching.mark_rendered.call(null,c);

if((rat == null)){
return reagent.ratom.run_in_reaction.call(null,(function (){
return reagent.impl.component.do_render.call(null,c);
}),c,"cljsRatom",reagent.impl.batching.queue_render,reagent.impl.component.rat_opts);
} else {
return rat._run(false);
}
}
})], null);
reagent.impl.component.custom_wrapper = (function reagent$impl$component$custom_wrapper(key,f){
var G__475 = key;
var G__475__$1 = (((G__475 instanceof cljs.core.Keyword))?G__475.fqn:null);
switch (G__475__$1) {
case "getDefaultProps":
throw (new Error("getDefaultProps not supported"));

break;
case "getDerivedStateFromProps":
return (function reagent$impl$component$custom_wrapper_$_getDerivedStateFromProps(props,state){
return f.call(null,(function (){var temp__9814__auto__ = props.argv;
if((temp__9814__auto__ == null)){
return props;
} else {
var a = temp__9814__auto__;
return reagent.impl.component.extract_props.call(null,a);
}
})(),state);
});

break;
case "getInitialState":
return (function reagent$impl$component$custom_wrapper_$_getInitialState(c){
return cljs.core.reset_BANG_.call(null,reagent.impl.component.state_atom.call(null,c),f.call(c,c));
});

break;
case "getSnapshotBeforeUpdate":
return (function reagent$impl$component$custom_wrapper_$_getSnapshotBeforeUpdate(oldprops,oldstate){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,oldprops),oldstate);
});

break;
case "componentWillReceiveProps":
return (function reagent$impl$component$custom_wrapper_$_componentWillReceiveProps(nextprops){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,nextprops));
});

break;
case "UNSAFE_componentWillReceiveProps":
return (function reagent$impl$component$custom_wrapper_$_componentWillReceiveProps(nextprops){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,nextprops));
});

break;
case "shouldComponentUpdate":
return (function reagent$impl$component$custom_wrapper_$_shouldComponentUpdate(nextprops,nextstate){
var or__10112__auto__ = reagent.impl.util._STAR_always_update_STAR_;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var c = this;
var old_argv = c.props.argv;
var new_argv = nextprops.argv;
var noargv = (((old_argv == null)) || ((new_argv == null)));
if((f == null)){
var or__10112__auto____$1 = noargv;
if(or__10112__auto____$1){
return or__10112__auto____$1;
} else {
try{return cljs.core.not_EQ_.call(null,old_argv,new_argv);
}catch (e477){var e = e477;
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).warn(["Warning: ","Exception thrown while comparing argv's in shouldComponentUpdate: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(old_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
} else {
}

return false;
}}
} else {
if(noargv){
return f.call(c,c,reagent.impl.component.get_argv.call(null,c),reagent.impl.component.props_argv.call(null,c,nextprops));
} else {
return f.call(c,c,old_argv,new_argv);

}
}
}
});

break;
case "componentWillUpdate":
return (function reagent$impl$component$custom_wrapper_$_componentWillUpdate(nextprops,nextstate){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,nextprops),nextstate);
});

break;
case "UNSAFE_componentWillUpdate":
return (function reagent$impl$component$custom_wrapper_$_componentWillUpdate(nextprops,nextstate){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,nextprops),nextstate);
});

break;
case "componentDidUpdate":
return (function reagent$impl$component$custom_wrapper_$_componentDidUpdate(oldprops,oldstate,snapshot){
var c = this;
return f.call(c,c,reagent.impl.component.props_argv.call(null,c,oldprops),oldstate,snapshot);
});

break;
case "componentWillMount":
return (function reagent$impl$component$custom_wrapper_$_componentWillMount(){
var c = this;
return f.call(c,c);
});

break;
case "UNSAFE_componentWillMount":
return (function reagent$impl$component$custom_wrapper_$_componentWillMount(){
var c = this;
return f.call(c,c);
});

break;
case "componentDidMount":
return (function reagent$impl$component$custom_wrapper_$_componentDidMount(){
var c = this;
return f.call(c,c);
});

break;
case "componentWillUnmount":
return (function reagent$impl$component$custom_wrapper_$_componentWillUnmount(){
var c = this;
var G__478_480 = goog.object.get(c,"cljsRatom");
if((G__478_480 == null)){
} else {
reagent.ratom.dispose_BANG_.call(null,G__478_480);
}

reagent.impl.batching.mark_rendered.call(null,c);

if((f == null)){
return null;
} else {
return f.call(c,c);
}
});

break;
case "componentDidCatch":
return (function reagent$impl$component$custom_wrapper_$_componentDidCatch(error,info){
var c = this;
return f.call(c,c,error,info);
});

break;
default:
return null;

}
});
reagent.impl.component.get_wrapper = (function reagent$impl$component$get_wrapper(key,f){
var wrap = reagent.impl.component.custom_wrapper.call(null,key,f);
if(cljs.core.truth_((function (){var and__10090__auto__ = wrap;
if(cljs.core.truth_(and__10090__auto__)){
return f;
} else {
return and__10090__auto__;
}
})())){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.call(null,f)].join(''),"\n","(cljs.core/ifn? f)"].join('')));
}
} else {
}

var or__10112__auto__ = wrap;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return f;
}
});
reagent.impl.component.obligatory = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",(1795750960)),null,new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",(1573788814)),null], null);
reagent.impl.component.dash_to_method_name = reagent.impl.util.memoize_1.call(null,reagent.impl.util.dash_to_method_name);
reagent.impl.component.camelify_map_keys = (function reagent$impl$component$camelify_map_keys(fun_map){
return cljs.core.reduce_kv.call(null,(function (m,k,v){
return cljs.core.assoc.call(null,m,cljs.core.keyword.call(null,reagent.impl.component.dash_to_method_name.call(null,k)),v);
}),cljs.core.PersistentArrayMap.EMPTY,fun_map);
});
reagent.impl.component.add_obligatory = (function reagent$impl$component$add_obligatory(fun_map){
return cljs.core.merge.call(null,reagent.impl.component.obligatory,fun_map);
});
reagent.impl.component.wrap_funs = (function reagent$impl$component$wrap_funs(fmap){
var renders_481 = cljs.core.select_keys.call(null,fmap,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"render","render",(-1408033454)),new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383))], null));
var render_fun_482 = cljs.core.first.call(null,cljs.core.vals.call(null,renders_481));
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"componentFunction","componentFunction",(825866104)).cljs$core$IFn$_invoke$arity$1(fmap))){
} else {
throw (new Error(["Assert failed: ",":component-function is no longer supported, use :reagent-render instead.","\n","(not (:componentFunction fmap))"].join('')));
}

if((cljs.core.count.call(null,renders_481) > (0))){
} else {
throw (new Error(["Assert failed: ","Missing reagent-render","\n","(pos? (count renders))"].join('')));
}

if(((1) === cljs.core.count.call(null,renders_481))){
} else {
throw (new Error(["Assert failed: ","Too many render functions supplied","\n","(== 1 (count renders))"].join('')));
}

if(cljs.core.ifn_QMARK_.call(null,render_fun_482)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.call(null,render_fun_482)].join(''),"\n","(cljs.core/ifn? render-fun)"].join('')));
}


var render_fun = (function (){var or__10112__auto__ = new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)).cljs$core$IFn$_invoke$arity$1(fmap);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return new cljs.core.Keyword(null,"render","render",(-1408033454)).cljs$core$IFn$_invoke$arity$1(fmap);
}
})();
var legacy_render = (new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)).cljs$core$IFn$_invoke$arity$1(fmap) == null);
var name = (function (){var or__10112__auto__ = new cljs.core.Keyword(null,"displayName","displayName",(-809144601)).cljs$core$IFn$_invoke$arity$1(fmap);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var or__10112__auto____$1 = reagent.impl.util.fun_name.call(null,render_fun);
if(cljs.core.truth_(or__10112__auto____$1)){
return or__10112__auto____$1;
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.call(null,"reagent"));
}
}
})();
var fmap__$1 = cljs.core.reduce_kv.call(null,(function (m,k,v){
return cljs.core.assoc.call(null,m,k,reagent.impl.component.get_wrapper.call(null,k,v));
}),cljs.core.PersistentArrayMap.EMPTY,fmap);
return cljs.core.assoc.call(null,fmap__$1,new cljs.core.Keyword(null,"displayName","displayName",(-809144601)),name,new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",(-1527295613)),legacy_render,new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)),render_fun,new cljs.core.Keyword(null,"render","render",(-1408033454)),new cljs.core.Keyword(null,"render","render",(-1408033454)).cljs$core$IFn$_invoke$arity$1(reagent.impl.component.static_fns));
});
reagent.impl.component.map_to_js = (function reagent$impl$component$map_to_js(m){
return cljs.core.reduce_kv.call(null,(function (o,k,v){
var G__483 = o;
goog.object.set(G__483,cljs.core.name.call(null,k),v);

return G__483;
}),({}),m);
});
reagent.impl.component.cljsify = (function reagent$impl$component$cljsify(body){
return reagent.impl.component.wrap_funs.call(null,reagent.impl.component.add_obligatory.call(null,reagent.impl.component.camelify_map_keys.call(null,body)));
});
reagent.impl.component.built_in_static_method_names = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"childContextTypes","childContextTypes",(578717991)),new cljs.core.Keyword(null,"contextTypes","contextTypes",(-2023853910)),new cljs.core.Keyword(null,"contextType","contextType",(1033066077)),new cljs.core.Keyword(null,"getDerivedStateFromProps","getDerivedStateFromProps",(-991834739)),new cljs.core.Keyword(null,"getDerivedStateFromError","getDerivedStateFromError",(166658477))], null);
/**
 * Creates JS class based on provided Clojure map.
 * 
 *   Map keys should use `React.Component` method names (https://reactjs.org/docs/react-component.html),
 *   and can be provided in snake-case or camelCase.
 *   Constructor function is defined using key `:getInitialState`.
 * 
 *   React built-in static methods or properties are automatically defined as statics.
 */
reagent.impl.component.create_class = (function reagent$impl$component$create_class(body){
if(cljs.core.map_QMARK_.call(null,body)){
} else {
throw (new Error("Assert failed: (map? body)"));
}

var body__$1 = reagent.impl.component.cljsify.call(null,body);
var methods$ = reagent.impl.component.map_to_js.call(null,cljs.core.apply.call(null,cljs.core.dissoc,body__$1,new cljs.core.Keyword(null,"displayName","displayName",(-809144601)),new cljs.core.Keyword(null,"getInitialState","getInitialState",(1541760916)),new cljs.core.Keyword(null,"constructor","constructor",(-1953928811)),new cljs.core.Keyword(null,"render","render",(-1408033454)),new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)),reagent.impl.component.built_in_static_method_names));
var static_methods = reagent.impl.component.map_to_js.call(null,cljs.core.select_keys.call(null,body__$1,reagent.impl.component.built_in_static_method_names));
var display_name = new cljs.core.Keyword(null,"displayName","displayName",(-809144601)).cljs$core$IFn$_invoke$arity$1(body__$1);
var get_initial_state = new cljs.core.Keyword(null,"getInitialState","getInitialState",(1541760916)).cljs$core$IFn$_invoke$arity$1(body__$1);
var construct = new cljs.core.Keyword(null,"constructor","constructor",(-1953928811)).cljs$core$IFn$_invoke$arity$1(body__$1);
var cmp = (function (props,context,updater){
var this$ = this;
reagent.impl.component.global$module$react.Component.call(this$,props,context,updater);

if(cljs.core.truth_(construct)){
construct.call(null,this$,props);
} else {
}

if(cljs.core.truth_(get_initial_state)){
(this$.state = get_initial_state.call(null,this$));
} else {
}

(this$.cljsMountOrder = reagent.impl.batching.next_mount_count.call(null));

return this$;
});
goog.object.extend(cmp.prototype,reagent.impl.component.global$module$react.Component.prototype,methods$);

if(cljs.core.truth_(new cljs.core.Keyword(null,"render","render",(-1408033454)).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.render = new cljs.core.Keyword(null,"render","render",(-1408033454)).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.reagentRender = new cljs.core.Keyword(null,"reagentRender","reagentRender",(-358306383)).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",(-1527295613)).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.cljsLegacyRender = new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",(-1527295613)).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

goog.object.extend(cmp,reagent.impl.component.global$module$react.Component,static_methods);

if(cljs.core.truth_(display_name)){
(cmp.displayName = display_name);

(cmp.cljs$lang$ctorStr = display_name);

(cmp.cljs$lang$ctorPrWriter = (function (this$,writer,opt){
return cljs.core._write.call(null,writer,display_name);
}));
} else {
}

(cmp.cljs$lang$type = true);

(cmp.prototype.constructor = cmp);

return cmp;
});
reagent.impl.component.fn_to_class = (function reagent$impl$component$fn_to_class(f){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.call(null,f)].join(''),"\n","(cljs.core/ifn? f)"].join('')));
}

if((!((!(((reagent.impl.component.react_class_QMARK_.call(null,f)) && ((!(reagent.impl.component.reagent_class_QMARK_.call(null,f)))))))))){
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).warn(["Warning: ","Using native React classes directly in Hiccup forms ","is not supported. Use create-element or ","adapt-react-class instead: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__10112__auto__ = reagent.impl.util.fun_name.call(null,f);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return f;
}
})()),reagent.impl.component.comp_name.call(null)].join(''));
} else {
}
} else {
}

if(reagent.impl.component.reagent_class_QMARK_.call(null,f)){
return reagent.impl.component.cache_react_class.call(null,f,f);
} else {
var spec = cljs.core.meta.call(null,f);
var withrender = cljs.core.assoc.call(null,spec,new cljs.core.Keyword(null,"reagent-render","reagent-render",(-985383853)),f);
var res = reagent.impl.component.create_class.call(null,withrender);
return reagent.impl.component.cache_react_class.call(null,f,res);
}
});
reagent.impl.component.as_class = (function reagent$impl$component$as_class(tag){
var temp__9814__auto__ = reagent.impl.component.cached_react_class.call(null,tag);
if((temp__9814__auto__ == null)){
return reagent.impl.component.fn_to_class.call(null,tag);
} else {
var cached_class = temp__9814__auto__;
return cached_class;
}
});
reagent.impl.component.reactify_component = (function reagent$impl$component$reactify_component(comp){
if(reagent.impl.component.react_class_QMARK_.call(null,comp)){
return comp;
} else {
return reagent.impl.component.as_class.call(null,comp);
}
});

//# sourceURL=reagent/impl/component.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9pbXBsL2NvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsiY29tcG9uZW50LmNsanMiXSwibGluZUNvdW50Ijo2MjIsIm1hcHBpbmdzIjoiO0FBUUEsQUFBQSxBQUtBLDRDQUFBLDVDQUFNQSxnR0FBb0JDO0FBQTFCLEFBQ0UsSUFBTUMsS0FBRyxBQUFDQyw0QkFBUUY7SUFDWkcsTUFBSSxBQUFTRjtBQURuQixBQUVFLFFBQUEsSkFBT0c7UUFBUCxKQUNPQzs7QUFEUCxBQUVFLEdBQUksQ0FBR0EsSUFBRUY7QUFDUCxJQUFNRyxJQUFFLENBQU1MLEdBQUdJO0FBQWpCLEFBQ0UsYUFBTyxBQUFDRSwwQkFBTUgsRUFBRSxBQUFDSSw0QkFBUUYsR0FBRyxBQUFDRyxnQkFBU1QsRUFBRU07YUFDakMsS0FBQSxKQUFLRDs7Ozs7QUFDZEQ7Ozs7O0FBRVIsdUNBQUEsdkNBQU1NLHNGQUFlQztBQUFyQixBQUNFLElBQU1DLElBQUUsMEJBQUEsSUFBQSw5QkFBQ0Msd0JBQUlGO0FBQWIsQUFDRSxHQUFJLEFBQUNHLCtCQUFLRjtBQUFHQTs7QUFBYjs7O0FBRUosMENBQUEsMUNBQU1HLDRGQUFrQko7QUFBeEIsQUFDRSxJQUFNQyxJQUFFLDBCQUFBLElBQUEsOUJBQUNDLHdCQUFJRjtJQUNQSyxjQUFZLDBEQUFBLElBQUEsNURBQUksRUFBSSxNQUFBLExBQU1KLGdCQUFHLEFBQUNFLCtCQUFLRjtBQUR6QyxBQUVFLEdBQUksQ0FBRyxBQUFDSywwQkFBTU4sS0FBR0s7QUFDZixPQUFDRSwyQkFBT1AsRUFBRUs7O0FBRFo7OztBQUdKLG9DQUFBLHBDQUFNRyxnRkFBZ0NDLEVBQUVSO0FBQXhDLEFBQ0UsSUFBQVMscUJBQVksQUFBUVQ7QUFBcEIsQUFBQSxHQUFBLENBQUFTLHNCQUFBO0FBQUEsMEZBRUcsQUFBZUQsY0FBRyxBQUFDckIsb0RBQW1CYTs7QUFGekMsUUFBQVMsSkFBVUM7QUFBVixBQUNFQTs7O0FBR0osa0NBQUEsbENBQU1DLDRFQUE4Qkg7QUFBcEMsQUFD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R0FBQSxDQUFBckksc0JBQUE7QUFFRSxPQUFDZ0ksNkNBQVlLOztBQUZmLG1CQUFBckksZkFBVXNJO0FBQVYsQUFDRUE7OztBQUdKLDRDQUFBLDVDQUFNQyxnR0FBb0JDO0FBQTFCLEFBQ0UsR0FBSSxBQUFDOUgsb0RBQWE4SDtBQUNoQkE7O0FBQ0EsT0FBQ0osMENBQVNJIiwibmFtZXMiOlsicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9zaGFsbG93LW9iai10by1tYXAiLCJvIiwia3MiLCJjbGpzLmNvcmUvanMta2V5cyIsImxlbiIsIm0iLCJpIiwiayIsImNsanMuY29yZS9hc3NvYyIsImNsanMuY29yZS9rZXl3b3JkIiwiZ29vZy5vYmplY3QvZ2V0IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9leHRyYWN0LXByb3BzIiwidiIsInAiLCJjbGpzLmNvcmUvbnRoIiwiY2xqcy5jb3JlL21hcD8iLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2V4dHJhY3QtY2hpbGRyZW4iLCJmaXJzdC1jaGlsZCIsImNsanMuY29yZS9jb3VudCIsImNsanMuY29yZS9zdWJ2ZWMiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L3Byb3BzLWFyZ3YiLCJjIiwidGVtcF9fOTgxNF9fYXV0b19fIiwiYSIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvZ2V0LWFyZ3YiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2dldC1wcm9wcyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvZ2V0LWNoaWxkcmVuIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9nbG9iYWwkbW9kdWxlJHJlYWN0LkNoaWxkcmVuLnRvQXJyYXkiLCJjbGpzLmNvcmUvaW50byIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvcmVhZ2VudC1jbGFzcz8iLCJjbGpzLmNvcmUvZm4/IiwiR19fNDYzIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9yZWFjdC1jbGFzcz8iLCJHX180NjUiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L3JlYWdlbnQtY29tcG9uZW50PyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvY2FjaGVkLXJlYWN0LWNsYXNzIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9jYWNoZS1yZWFjdC1jbGFzcyIsImNvbnN0cnVjdG9yIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9zdGF0ZS1hdG9tIiwidGhpcyIsInNhIiwicmVhZ2VudC5yYXRvbS9hdG9tIiwianMvcmVhZ2VudCIsImpzL3JlYWdlbnQuaW1wbCIsImpzL3JlYWdlbnQuaW1wbC5jb21wb25lbnQiLCJqcy9yZWFnZW50LmltcGwuY29tcG9uZW50LmFzLWVsZW1lbnQiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2FzLWVsZW1lbnQiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L3dyYXAtcmVuZGVyIiwiZiIsIl8iLCJjbGpzLmNvcmUvaWZuPyIsImpzL0Vycm9yIiwiY2xqcy5jb3JlL3ByLXN0ciIsInJlcyIsIm4iLCJHX180NjYiLCJjbGpzLmNvcmUvaW50by1hcnJheSIsImNsanMuY29yZS92ZWN0b3I/IiwiYXJncyIsImNsanMuY29yZS9hcHBseSIsImNsanMuY29yZS92ZWN0b3IiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2NvbXBvbmVudC1uYW1lIiwiR19fNDcyIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9jb21wLW5hbWUiLCJyZWFnZW50LmltcGwuY29tcG9uZW50LypjdXJyZW50LWNvbXBvbmVudCoiLCJjbGpzLmNvcmUvZW1wdHk/IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9kby1yZW5kZXIiLCIqY3VycmVudC1jb21wb25lbnQqLW9yaWctdmFsX180NzMiLCIqY3VycmVudC1jb21wb25lbnQqLXRlbXAtdmFsX180NzQiLCJvayIsInJlYWdlbnQvZGVidWciLCJqcy9jb25zb2xlIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9yYXQtb3B0cyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvc3RhdGljLWZucyIsInJlYWdlbnQuaW1wbC51dGlsLypub24tcmVhY3RpdmUqIiwicmF0IiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL21hcmstcmVuZGVyZWQiLCJyZWFnZW50LnJhdG9tL3J1bi1pbi1yZWFjdGlvbiIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9xdWV1ZS1yZW5kZXIiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2N1c3RvbS13cmFwcGVyIiwia2V5IiwiR19fNDc1IiwiY2xqcy5jb3JlL0tleXdvcmQiLCJwcm9wcyIsInN0YXRlIiwiY2xqcy5jb3JlL3Jlc2V0ISIsIm9sZHByb3BzIiwib2xkc3RhdGUiLCJuZXh0cHJvcHMiLCJuZXh0c3RhdGUiLCJvcl9fMTAxMTJfX2F1dG9fXyIsInJlYWdlbnQuaW1wbC51dGlsLyphbHdheXMtdXBkYXRlKiIsIm9sZC1hcmd2IiwibmV3LWFyZ3YiLCJub2FyZ3YiLCJlNDc3IiwiY2xqcy5jb3JlL25vdD0iLCJlIiwic25hcHNob3QiLCJHX180NzgiLCJyZWFnZW50LnJhdG9tL2Rpc3Bvc2UhIiwiZXJyb3IiLCJpbmZvIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9nZXQtd3JhcHBlciIsIndyYXAiLCJhbmRfXzEwMDkwX19hdXRvX18iLCJyZWFnZW50LmltcGwuY29tcG9uZW50L29ibGlnYXRvcnkiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2Rhc2gtdG8tbWV0aG9kLW5hbWUiLCJyZWFnZW50LmltcGwudXRpbC9tZW1vaXplLTEiLCJyZWFnZW50LmltcGwudXRpbC9kYXNoLXRvLW1ldGhvZC1uYW1lIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9jYW1lbGlmeS1tYXAta2V5cyIsImZ1bi1tYXAiLCJjbGpzLmNvcmUvcmVkdWNlLWt2IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9hZGQtb2JsaWdhdG9yeSIsImNsanMuY29yZS9tZXJnZSIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvd3JhcC1mdW5zIiwiZm1hcCIsInJlbmRlcnMiLCJjbGpzLmNvcmUvc2VsZWN0LWtleXMiLCJyZW5kZXItZnVuIiwiY2xqcy5jb3JlL3ZhbHMiLCJjbGpzLmNvcmUvZmlyc3QiLCJjbGpzLmNvcmUvbm90IiwibGVnYWN5LXJlbmRlciIsIm5hbWUiLCJyZWFnZW50LmltcGwudXRpbC9mdW4tbmFtZSIsImNsanMuY29yZS9nZW5zeW0iLCJyZWFnZW50LmltcGwuY29tcG9uZW50L21hcC10by1qcyIsIkdfXzQ4MyIsImdvb2cub2JqZWN0L3NldCIsImNsanMuY29yZS9uYW1lIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9jbGpzaWZ5IiwiYm9keSIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvYnVpbHQtaW4tc3RhdGljLW1ldGhvZC1uYW1lcyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvY3JlYXRlLWNsYXNzIiwibWV0aG9kcyIsImNsanMuY29yZS9kaXNzb2MiLCJzdGF0aWMtbWV0aG9kcyIsImRpc3BsYXktbmFtZSIsImdldC1pbml0aWFsLXN0YXRlIiwiY29uc3RydWN0IiwiY21wIiwiY29udGV4dCIsInVwZGF0ZXIiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2dsb2JhbCRtb2R1bGUkcmVhY3QuQ29tcG9uZW50IiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL25leHQtbW91bnQtY291bnQiLCJnb29nLm9iamVjdC9leHRlbmQiLCJ3cml0ZXIiLCJvcHQiLCJjbGpzLmNvcmUvLXdyaXRlIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9mbi10by1jbGFzcyIsInNwZWMiLCJjbGpzLmNvcmUvbWV0YSIsIndpdGhyZW5kZXIiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2FzLWNsYXNzIiwidGFnIiwiY2FjaGVkLWNsYXNzIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9yZWFjdGlmeS1jb21wb25lbnQiLCJjb21wIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZWFnZW50LmltcGwuY29tcG9uZW50XG4gICg6cmVxdWlyZSBbZ29vZy5vYmplY3QgOmFzIGdvYmpdXG4gICAgICAgICAgICBbcmVhY3QgOmFzIHJlYWN0XVxuICAgICAgICAgICAgW3JlYWdlbnQuaW1wbC51dGlsIDphcyB1dGlsXVxuICAgICAgICAgICAgW3JlYWdlbnQuaW1wbC5iYXRjaGluZyA6YXMgYmF0Y2hdXG4gICAgICAgICAgICBbcmVhZ2VudC5yYXRvbSA6YXMgcmF0b21dXG4gICAgICAgICAgICBbcmVhZ2VudC5kZWJ1ZyA6cmVmZXItbWFjcm9zIFtkZXY/IHdhcm4gZXJyb3Igd2Fybi11bmxlc3MgYXNzZXJ0LWNhbGxhYmxlXV0pKVxuXG4oZGVjbGFyZSBeOmR5bmFtaWMgKmN1cnJlbnQtY29tcG9uZW50KilcblxuXG47OzsgQXJndiBhY2Nlc3NcblxuKGRlZm4gc2hhbGxvdy1vYmotdG8tbWFwIFtvXVxuICAobGV0IFtrcyAoanMta2V5cyBvKVxuICAgICAgICBsZW4gKGFsZW5ndGgga3MpXVxuICAgIChsb29wIFttIHt9XG4gICAgICAgICAgIGkgMF1cbiAgICAgIChpZiAoPCBpIGxlbilcbiAgICAgICAgKGxldCBbayAoYWdldCBrcyBpKV1cbiAgICAgICAgICAocmVjdXIgKGFzc29jIG0gKGtleXdvcmQgaykgKGdvYmovZ2V0IG8gaykpXG4gICAgICAgICAgICAgICAgIChpbmMgaSkpKVxuICAgICAgICBtKSkpKVxuXG4oZGVmbiBleHRyYWN0LXByb3BzIFt2XVxuICAobGV0IFtwIChudGggdiAxIG5pbCldXG4gICAgKGlmIChtYXA/IHApIHApKSlcblxuKGRlZm4gZXh0cmFjdC1jaGlsZHJlbiBbdl1cbiAgKGxldCBbcCAobnRoIHYgMSBuaWwpXG4gICAgICAgIGZpcnN0LWNoaWxkIChpZiAob3IgKG5pbD8gcCkgKG1hcD8gcCkpIDIgMSldXG4gICAgKGlmICg+IChjb3VudCB2KSBmaXJzdC1jaGlsZClcbiAgICAgIChzdWJ2ZWMgdiBmaXJzdC1jaGlsZCkpKSlcblxuKGRlZm4gcHJvcHMtYXJndiBbXmpzL1JlYWN0LkNvbXBvbmVudCBjIHBdXG4gIChpZi1zb21lIFthICguLWFyZ3YgcCldXG4gICAgYVxuICAgIFsoLi1jb25zdHJ1Y3RvciBjKSAoc2hhbGxvdy1vYmotdG8tbWFwIHApXSkpXG5cbihkZWZuIGdldC1hcmd2IFteanMvUmVhY3QuQ29tcG9uZW50IGNdXG4gIChwcm9wcy1hcmd2IGMgKC4tcHJvcHMgYykpKVxuXG4oZGVmbiBnZXQtcHJvcHMgW15qcy9SZWFjdC5Db21wb25lbnQgY11cbiAgKGxldCBbcCAoLi1wcm9wcyBjKV1cbiAgICAoaWYtc29tZSBbdiAoLi1hcmd2IHApXVxuICAgICAgKGV4dHJhY3QtcHJvcHMgdilcbiAgICAgIChzaGFsbG93LW9iai10by1tYXAgcCkpKSlcblxuKGRlZm4gZ2V0LWNoaWxkcmVuIFteanMvUmVhY3QuQ29tcG9uZW50IGNdXG4gIChsZXQgW3AgKC4tcHJvcHMgYyldXG4gICAgKGlmLXNvbWUgW3YgKC4tYXJndiBwKV1cbiAgICAgIChleHRyYWN0LWNoaWxkcmVuIHYpXG4gICAgICAoLT4+ICguLWNoaWxkcmVuIHApXG4gICAgICAgICAgIChyZWFjdC9DaGlsZHJlbi50b0FycmF5KVxuICAgICAgICAgICAoaW50byBbXSkpKSkpXG5cbihkZWZuIF5ib29sZWFuIHJlYWdlbnQtY2xhc3M/IFtjXVxuICAoYW5kIChmbj8gYylcbiAgICAgICAoc29tZT8gKHNvbWUtPiBjICguLXByb3RvdHlwZSkgKC4tcmVhZ2VudFJlbmRlcikpKSkpXG5cbihkZWZuIF5ib29sZWFuIHJlYWN0LWNsYXNzPyBbY11cbiAgKGFuZCAoZm4/IGMpXG4gICAgICAgKHNvbWU/IChzb21lLT4gYyAoLi1wcm90b3R5cGUpICguLXJlbmRlcikpKSkpXG5cbihkZWZuIF5ib29sZWFuIHJlYWdlbnQtY29tcG9uZW50PyBbXmNsaiBjXVxuICAoc29tZT8gKC4tcmVhZ2VudFJlbmRlciBjKSkpXG5cbihkZWZuIGNhY2hlZC1yZWFjdC1jbGFzcyBbXmNsaiBjXVxuICAoLi1jbGpzUmVhY3RDbGFzcyBjKSlcblxuKGRlZm4gY2FjaGUtcmVhY3QtY2xhc3MgW15jbGogYyBjb25zdHJ1Y3Rvcl1cbiAgKHNldCEgKC4tY2xqc1JlYWN0Q2xhc3MgYykgY29uc3RydWN0b3IpKVxuXG5cbjs7OyBTdGF0ZVxuXG4oZGVmbiBzdGF0ZS1hdG9tIFteY2xqIHRoaXNdXG4gIChsZXQgW3NhICguLWNsanNTdGF0ZSB0aGlzKV1cbiAgICAoaWYtbm90IChuaWw/IHNhKVxuICAgICAgc2FcbiAgICAgIChzZXQhICguLWNsanNTdGF0ZSB0aGlzKSAocmF0b20vYXRvbSBuaWwpKSkpKVxuXG47OyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5OiB0aGlzIGdldHMgc2V0IGZyb20gdGVtcGxhdGUuY2xqc1xuKGRlZm9uY2UgYXMtZWxlbWVudCBuaWwpXG5cblxuOzs7IFJlbmRlcmluZ1xuXG4oZGVmbiB3cmFwLXJlbmRlclxuICBcIkNhbGxzIHRoZSByZW5kZXIgZnVuY3Rpb24gb2YgdGhlIGNvbXBvbmVudCBgY2AuICBJZiByZXN1bHQgYHJlc2AgZXZhbHVhdGVzIHRvIGE6XG4gICAgIDEpIFZlY3RvciAoZm9ybS0xIGNvbXBvbmVudCkgLSBUcmVhdHMgdGhlIHZlY3RvciBhcyBoaWNjdXAgYW5kIHJldHVybnNcbiAgICAgICAgYSByZWFjdCBlbGVtZW50IHdpdGggYSByZW5kZXIgZnVuY3Rpb24gYmFzZWQgb24gdGhhdCBoaWNjdXBcbiAgICAgMikgRnVuY3Rpb24gKGZvcm0tMiBjb21wb25lbnQpIC0gdXBkYXRlcyB0aGUgcmVuZGVyIGZ1bmN0aW9uIHRvIGByZXNgIGkuZS4gdGhlIGludGVybmFsIGZ1bmN0aW9uXG4gICAgICAgIGFuZCBjYWxscyB3cmFwLXJlbmRlciBhZ2FpbiAoYHJlY3VyYCksIHVudGlsIHRoZSByZW5kZXIgcmVzdWx0IGRvZXNuJ3QgZXZhbHVhdGUgdG8gYSBmdW5jdGlvbi5cbiAgICAgMykgQW55dGhpbmcgZWxzZSAtIFJldHVybnMgdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGBjYFwiXG4gIFteY2xqIGNdXG4gIChsZXQgW2YgKC4tcmVhZ2VudFJlbmRlciBjKVxuICAgICAgICBfIChhc3NlcnQtY2FsbGFibGUgZilcbiAgICAgICAgOzsgY2xqc0xlZ2FjeVJlbmRlciB0ZWxscyBpZiB0aGlzIGNhbGxzIHdhcyBkZWZpbmVkXG4gICAgICAgIDs7IHVzaW5nIDpyZW5kZXIgaW5zdGVhZCBvZiA6cmVhZ2VudC1yZW5kZXJcbiAgICAgICAgOzsgaW4gdGhhdCBjYXNlLCB0aGUgOnJlbmRlciBmbiBpcyBjYWxsZWQgd2l0aCBqdXN0IGB0aGlzYCBhcyBhcmd1bWVudC5cbiAgICAgICAgcmVzIChpZiAodHJ1ZT8gKC4tY2xqc0xlZ2FjeVJlbmRlciBjKSlcbiAgICAgICAgICAgICAgKC5jYWxsIGYgYyBjKVxuICAgICAgICAgICAgICAobGV0IFt2IChnZXQtYXJndiBjKVxuICAgICAgICAgICAgICAgICAgICBuIChjb3VudCB2KV1cbiAgICAgICAgICAgICAgICAoY2FzZSBuXG4gICAgICAgICAgICAgICAgICAxICguY2FsbCBmIGMpXG4gICAgICAgICAgICAgICAgICAyICguY2FsbCBmIGMgKG50aCB2IDEpKVxuICAgICAgICAgICAgICAgICAgMyAoLmNhbGwgZiBjIChudGggdiAxKSAobnRoIHYgMikpXG4gICAgICAgICAgICAgICAgICA0ICguY2FsbCBmIGMgKG50aCB2IDEpIChudGggdiAyKSAobnRoIHYgMykpXG4gICAgICAgICAgICAgICAgICA1ICguY2FsbCBmIGMgKG50aCB2IDEpIChudGggdiAyKSAobnRoIHYgMykgKG50aCB2IDQpKVxuICAgICAgICAgICAgICAgICAgKC5hcHBseSBmIGMgKC5zbGljZSAoaW50by1hcnJheSB2KSAxKSkpKSldXG4gICAgKGNvbmRcbiAgICAgICh2ZWN0b3I/IHJlcykgKGFzLWVsZW1lbnQgcmVzKVxuICAgICAgKGlmbj8gcmVzKSAobGV0IFtmIChpZiAocmVhZ2VudC1jbGFzcz8gcmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZuIFsmIGFyZ3NdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcy1lbGVtZW50IChhcHBseSB2ZWN0b3IgcmVzIGFyZ3MpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyldXG4gICAgICAgICAgICAgICAgICAgKHNldCEgKC4tcmVhZ2VudFJlbmRlciBjKSBmKVxuICAgICAgICAgICAgICAgICAgIChyZWN1ciBjKSlcbiAgICAgIDplbHNlIHJlcykpKVxuXG4oZGVmbiBjb21wb25lbnQtbmFtZSBbY11cbiAgKHNvbWUtPiBjIC4tY29uc3RydWN0b3IgLi1kaXNwbGF5TmFtZSkpXG5cbihkZWZuIGNvbXAtbmFtZSBbXVxuICAoaWYgKGRldj8pXG4gICAgKGxldCBbYyAqY3VycmVudC1jb21wb25lbnQqXG4gICAgICAgICAgbiAoY29tcG9uZW50LW5hbWUgYyldXG4gICAgICAoaWYtbm90IChlbXB0eT8gbilcbiAgICAgICAgKHN0ciBcIiAoaW4gXCIgbiBcIilcIilcbiAgICAgICAgXCJcIikpXG4gICAgXCJcIikpXG5cbihkZWZuIGRvLXJlbmRlciBbY11cbiAgKGJpbmRpbmcgWypjdXJyZW50LWNvbXBvbmVudCogY11cbiAgICAoaWYgKGRldj8pXG4gICAgICA7OyBMb2cgZXJyb3JzLCB3aXRob3V0IHVzaW5nIHRyeS9jYXRjaCAoYW5kIG1lc3MgdXAgY2FsbCBzdGFjaylcbiAgICAgIChsZXQgW29rIChhcnJheSBmYWxzZSldXG4gICAgICAgICh0cnlcbiAgICAgICAgICAobGV0IFtyZXMgKHdyYXAtcmVuZGVyIGMpXVxuICAgICAgICAgICAgKGFzZXQgb2sgMCB0cnVlKVxuICAgICAgICAgICAgcmVzKVxuICAgICAgICAgIChmaW5hbGx5XG4gICAgICAgICAgICAod2hlbi1ub3QgKGFnZXQgb2sgMClcbiAgICAgICAgICAgICAgKGVycm9yIChzdHIgXCJFcnJvciByZW5kZXJpbmcgY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbXAtbmFtZSkpKSkpKSlcbiAgICAgICh3cmFwLXJlbmRlciBjKSkpKVxuXG5cbjs7OyBNZXRob2Qgd3JhcHBpbmdcblxuKGRlZiByYXQtb3B0cyB7Om5vLWNhY2hlIHRydWV9KVxuXG4oZGVmIHN0YXRpYy1mbnNcbiAgezpyZW5kZXJcbiAgIChmbiByZW5kZXIgW11cbiAgICAgOzsgVE9ETzogVXNlIHN0YXRpYyBwcm9wZXJ0eSBmb3IgY2xqc1JhdG9tXG4gICAgICh0aGlzLWFzIGMgKGlmIHV0aWwvKm5vbi1yZWFjdGl2ZSpcbiAgICAgICAgICAgICAgICAgIChkby1yZW5kZXIgYylcbiAgICAgICAgICAgICAgICAgIChsZXQgW15jbGogcmF0IChnb2JqL2dldCBjIFwiY2xqc1JhdG9tXCIpXVxuICAgICAgICAgICAgICAgICAgICAoYmF0Y2gvbWFyay1yZW5kZXJlZCBjKVxuICAgICAgICAgICAgICAgICAgICAoaWYgKG5pbD8gcmF0KVxuICAgICAgICAgICAgICAgICAgICAgIChyYXRvbS9ydW4taW4tcmVhY3Rpb24gIyhkby1yZW5kZXIgYykgYyBcImNsanNSYXRvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXRjaC9xdWV1ZS1yZW5kZXIgcmF0LW9wdHMpXG4gICAgICAgICAgICAgICAgICAgICAgKC5fcnVuIHJhdCBmYWxzZSkpKSkpKX0pXG5cbihkZWZuIGN1c3RvbS13cmFwcGVyIFtrZXkgZl1cbiAgKGNhc2Uga2V5XG4gICAgOmdldERlZmF1bHRQcm9wc1xuICAgICh0aHJvdyAoanMvRXJyb3IuIFwiZ2V0RGVmYXVsdFByb3BzIG5vdCBzdXBwb3J0ZWRcIikpXG5cbiAgICA6Z2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzXG4gICAgKGZuIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyBbcHJvcHMgc3RhdGVdXG4gICAgICA7OyBSZWFkIHByb3BzIGZyb20gUmVhZ2VudCBhcmd2XG4gICAgICAoLmNhbGwgZiBuaWwgKGlmLXNvbWUgW2EgKC4tYXJndiBwcm9wcyldIChleHRyYWN0LXByb3BzIGEpIHByb3BzKSBzdGF0ZSkpXG5cbiAgICA7OyBJbiBFUzYgUmVhY3QsIHRoaXMgaXMgbm93IHBhcnQgb2YgdGhlIGNvbnN0cnVjdG9yXG4gICAgOmdldEluaXRpYWxTdGF0ZVxuICAgIChmbiBnZXRJbml0aWFsU3RhdGUgW2NdXG4gICAgICAocmVzZXQhIChzdGF0ZS1hdG9tIGMpICguY2FsbCBmIGMgYykpKVxuXG4gICAgOmdldFNuYXBzaG90QmVmb3JlVXBkYXRlXG4gICAgKGZuIGdldFNuYXBzaG90QmVmb3JlVXBkYXRlIFtvbGRwcm9wcyBvbGRzdGF0ZV1cbiAgICAgICh0aGlzLWFzIGMgKC5jYWxsIGYgYyBjIChwcm9wcy1hcmd2IGMgb2xkcHJvcHMpIG9sZHN0YXRlKSkpXG5cbiAgICA7OyBEZXByZWNhdGVkIC0gd2FybmluZyBpbiAxNi45IHdpbGwgd29yayB0aHJvdWdoIDE3LnhcbiAgICA6Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1xuICAgIChmbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIFtuZXh0cHJvcHNdXG4gICAgICAodGhpcy1hcyBjICguY2FsbCBmIGMgYyAocHJvcHMtYXJndiBjIG5leHRwcm9wcykpKSlcblxuICAgIDs7IERlcHJlY2F0ZWQgLSB3aWxsIHdvcmsgaW4gMTcueFxuICAgIDpVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1xuICAgIChmbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIFtuZXh0cHJvcHNdXG4gICAgICAodGhpcy1hcyBjICguY2FsbCBmIGMgYyAocHJvcHMtYXJndiBjIG5leHRwcm9wcykpKSlcblxuICAgIDpzaG91bGRDb21wb25lbnRVcGRhdGVcbiAgICAoZm4gc2hvdWxkQ29tcG9uZW50VXBkYXRlIFtuZXh0cHJvcHMgbmV4dHN0YXRlXVxuICAgICAgKG9yIHV0aWwvKmFsd2F5cy11cGRhdGUqXG4gICAgICAgICAgKHRoaXMtYXMgY1xuICAgICAgICAgICAgICAgICAgIDs7IERvbid0IGNhcmUgYWJvdXQgbmV4dHN0YXRlIGhlcmUsIHdlIHVzZSBmb3JjZVVwZGF0ZVxuICAgICAgICAgICAgICAgICAgIDs7IHdoZW4gb25seSB3aGVuIHN0YXRlIGhhcyBjaGFuZ2VkIGFueXdheS5cbiAgICAgICAgICAgICAgICAgICAobGV0IFtvbGQtYXJndiAoLi4gYyAtcHJvcHMgLWFyZ3YpXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3LWFyZ3YgKC4tYXJndiBuZXh0cHJvcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgbm9hcmd2IChvciAobmlsPyBvbGQtYXJndikgKG5pbD8gbmV3LWFyZ3YpKV1cbiAgICAgICAgICAgICAgICAgICAgIChjb25kXG4gICAgICAgICAgICAgICAgICAgICAgIChuaWw/IGYpIChvciBub2FyZ3YgKHRyeSAobm90PSBvbGQtYXJndiBuZXctYXJndilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjYXRjaCA6ZGVmYXVsdCBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3YXJuIFwiRXhjZXB0aW9uIHRocm93biB3aGlsZSBjb21wYXJpbmcgYXJndidzIGluIHNob3VsZENvbXBvbmVudFVwZGF0ZTogXCIgb2xkLWFyZ3YgXCIgXCIgbmV3LWFyZ3YgXCIgXCIgZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgbm9hcmd2ICguY2FsbCBmIGMgYyAoZ2V0LWFyZ3YgYykgKHByb3BzLWFyZ3YgYyBuZXh0cHJvcHMpKVxuICAgICAgICAgICAgICAgICAgICAgICA6ZWxzZSAgKC5jYWxsIGYgYyBjIG9sZC1hcmd2IG5ldy1hcmd2KSkpKSkpXG5cbiAgICA7OyBEZXByZWNhdGVkIC0gd2FybmluZyBpbiAxNi45IHdpbGwgd29yayB0aHJvdWdoIDE3LnhcbiAgICA6Y29tcG9uZW50V2lsbFVwZGF0ZVxuICAgIChmbiBjb21wb25lbnRXaWxsVXBkYXRlIFtuZXh0cHJvcHMgbmV4dHN0YXRlXVxuICAgICAgKHRoaXMtYXMgYyAoLmNhbGwgZiBjIGMgKHByb3BzLWFyZ3YgYyBuZXh0cHJvcHMpIG5leHRzdGF0ZSkpKVxuXG4gICAgOzsgRGVwcmVjYXRlZCAtIHdpbGwgd29yayBpbiAxNy54XG4gICAgOlVOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlXG4gICAgKGZuIGNvbXBvbmVudFdpbGxVcGRhdGUgW25leHRwcm9wcyBuZXh0c3RhdGVdXG4gICAgICAodGhpcy1hcyBjICguY2FsbCBmIGMgYyAocHJvcHMtYXJndiBjIG5leHRwcm9wcykgbmV4dHN0YXRlKSkpXG5cbiAgICA6Y29tcG9uZW50RGlkVXBkYXRlXG4gICAgKGZuIGNvbXBvbmVudERpZFVwZGF0ZSBbb2xkcHJvcHMgb2xkc3RhdGUgc25hcHNob3RdXG4gICAgICAodGhpcy1hcyBjICguY2FsbCBmIGMgYyAocHJvcHMtYXJndiBjIG9sZHByb3BzKSBvbGRzdGF0ZSBzbmFwc2hvdCkpKVxuXG4gICAgOzsgRGVwcmVjYXRlZCAtIHdhcm5pbmcgaW4gMTYuOSB3aWxsIHdvcmsgdGhyb3VnaCAxNy54XG4gICAgOmNvbXBvbmVudFdpbGxNb3VudFxuICAgIChmbiBjb21wb25lbnRXaWxsTW91bnQgW11cbiAgICAgICh0aGlzLWFzIGMgKC5jYWxsIGYgYyBjKSkpXG5cbiAgICA7OyBEZXByZWNhdGVkIC0gd2lsbCB3b3JrIGluIDE3LnhcbiAgICA6VU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudFxuICAgIChmbiBjb21wb25lbnRXaWxsTW91bnQgW11cbiAgICAgICh0aGlzLWFzIGMgKC5jYWxsIGYgYyBjKSkpXG5cbiAgICA6Y29tcG9uZW50RGlkTW91bnRcbiAgICAoZm4gY29tcG9uZW50RGlkTW91bnQgW11cbiAgICAgICh0aGlzLWFzIGMgKC5jYWxsIGYgYyBjKSkpXG5cbiAgICA6Y29tcG9uZW50V2lsbFVubW91bnRcbiAgICAoZm4gY29tcG9uZW50V2lsbFVubW91bnQgW11cbiAgICAgICh0aGlzLWFzIGNcbiAgICAgICAgICAgICAgIChzb21lLT4gKGdvYmovZ2V0IGMgXCJjbGpzUmF0b21cIikgcmF0b20vZGlzcG9zZSEpXG4gICAgICAgICAgICAgICAoYmF0Y2gvbWFyay1yZW5kZXJlZCBjKVxuICAgICAgICAgICAgICAgKHdoZW4tbm90IChuaWw/IGYpXG4gICAgICAgICAgICAgICAgICguY2FsbCBmIGMgYykpKSlcblxuICAgIDpjb21wb25lbnREaWRDYXRjaFxuICAgIChmbiBjb21wb25lbnREaWRDYXRjaCBbZXJyb3IgaW5mb11cbiAgICAgICh0aGlzLWFzIGMgKC5jYWxsIGYgYyBjIGVycm9yIGluZm8pKSlcblxuICAgIG5pbCkpXG5cbihkZWZuIGdldC13cmFwcGVyIFtrZXkgZl1cbiAgKGxldCBbd3JhcCAoY3VzdG9tLXdyYXBwZXIga2V5IGYpXVxuICAgICh3aGVuIChhbmQgd3JhcCBmKVxuICAgICAgKGFzc2VydC1jYWxsYWJsZSBmKSlcbiAgICAob3Igd3JhcCBmKSkpXG5cbjs7IFRob3VnaCB0aGUgdmFsdWUgaXMgbmlsIGhlcmUsIHRoZSB3cmFwcGVyIGZ1bmN0aW9uIHdpbGwgYmVcbjs7IGFkZGVkIHRvIGNsYXNzIHRvIG1hbmFnZSBSZWFnZW50IHJhdG9tIGxpZmVjeWNsZS5cbihkZWYgb2JsaWdhdG9yeSB7OnNob3VsZENvbXBvbmVudFVwZGF0ZSBuaWxcbiAgICAgICAgICAgICAgICAgOmNvbXBvbmVudFdpbGxVbm1vdW50IG5pbH0pXG5cbihkZWYgZGFzaC10by1tZXRob2QtbmFtZSAodXRpbC9tZW1vaXplLTEgdXRpbC9kYXNoLXRvLW1ldGhvZC1uYW1lKSlcblxuKGRlZm4gY2FtZWxpZnktbWFwLWtleXMgW2Z1bi1tYXBdXG4gIChyZWR1Y2Uta3YgKGZuIFttIGsgdl1cbiAgICAgICAgICAgICAgIChhc3NvYyBtICgtPiBrIGRhc2gtdG8tbWV0aG9kLW5hbWUga2V5d29yZCkgdikpXG4gICAgICAgICAgICAge30gZnVuLW1hcCkpXG5cbihkZWZuIGFkZC1vYmxpZ2F0b3J5IFtmdW4tbWFwXVxuICAobWVyZ2Ugb2JsaWdhdG9yeSBmdW4tbWFwKSlcblxuKGRlZm4gd3JhcC1mdW5zIFtmbWFwXVxuICAod2hlbiAoZGV2PylcbiAgICAobGV0IFtyZW5kZXJzIChzZWxlY3Qta2V5cyBmbWFwIFs6cmVuZGVyIDpyZWFnZW50UmVuZGVyXSlcbiAgICAgICAgICByZW5kZXItZnVuICgtPiByZW5kZXJzIHZhbHMgZmlyc3QpXVxuICAgICAgKGFzc2VydCAobm90ICg6Y29tcG9uZW50RnVuY3Rpb24gZm1hcCkpIFwiOmNvbXBvbmVudC1mdW5jdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkLCB1c2UgOnJlYWdlbnQtcmVuZGVyIGluc3RlYWQuXCIpXG4gICAgICAoYXNzZXJ0IChwb3M/IChjb3VudCByZW5kZXJzKSkgXCJNaXNzaW5nIHJlYWdlbnQtcmVuZGVyXCIpXG4gICAgICAoYXNzZXJ0ICg9PSAxIChjb3VudCByZW5kZXJzKSkgXCJUb28gbWFueSByZW5kZXIgZnVuY3Rpb25zIHN1cHBsaWVkXCIpXG4gICAgICAoYXNzZXJ0LWNhbGxhYmxlIHJlbmRlci1mdW4pKSlcbiAgKGxldCBbcmVuZGVyLWZ1biAob3IgKDpyZWFnZW50UmVuZGVyIGZtYXApXG4gICAgICAgICAgICAgICAgICAgICAgICg6cmVuZGVyIGZtYXApKVxuICAgICAgICBsZWdhY3ktcmVuZGVyIChuaWw/ICg6cmVhZ2VudFJlbmRlciBmbWFwKSlcbiAgICAgICAgbmFtZSAob3IgKDpkaXNwbGF5TmFtZSBmbWFwKVxuICAgICAgICAgICAgICAgICAodXRpbC9mdW4tbmFtZSByZW5kZXItZnVuKVxuICAgICAgICAgICAgICAgICAoc3RyIChnZW5zeW0gXCJyZWFnZW50XCIpKSlcbiAgICAgICAgZm1hcCAocmVkdWNlLWt2IChmbiBbbSBrIHZdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NvYyBtIGsgKGdldC13cmFwcGVyIGsgdikpKVxuICAgICAgICAgICAgICAgICAgICAgICAge30gZm1hcCldXG4gICAgKGFzc29jIGZtYXBcbiAgICAgICAgICAgOmRpc3BsYXlOYW1lIG5hbWVcbiAgICAgICAgICAgOmNsanNMZWdhY3lSZW5kZXIgbGVnYWN5LXJlbmRlclxuICAgICAgICAgICA6cmVhZ2VudFJlbmRlciByZW5kZXItZnVuXG4gICAgICAgICAgIDpyZW5kZXIgKDpyZW5kZXIgc3RhdGljLWZucykpKSlcblxuKGRlZm4gbWFwLXRvLWpzIFttXVxuICAocmVkdWNlLWt2IChmbiBbbyBrIHZdXG4gICAgICAgICAgICAgICAoZG90byBvXG4gICAgICAgICAgICAgICAgIChnb2JqL3NldCAobmFtZSBrKSB2KSkpXG4gICAgICAgICAgICAgI2pze30gbSkpXG5cbihkZWZuIGNsanNpZnkgW2JvZHldXG4gICgtPiBib2R5XG4gICAgICBjYW1lbGlmeS1tYXAta2V5c1xuICAgICAgYWRkLW9ibGlnYXRvcnlcbiAgICAgIHdyYXAtZnVucykpXG5cbjs7IElkZWEgZnJvbTpcbjs7IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3Blc3RlcmhhenkvMmEyNWM4MmRiMDUxOWEyOGU0MTViNDA0ODFmODQ1NTRcbjs7IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3RoaGVsbGVyLzdmNTMwYjM0ZGUxYzQ0NTg5ZjRlMDY3MWUxZWY3NTMzI2ZpbGUtZXM2LWNsYXNzLWNsanMtTDE4XG5cbihkZWYgYnVpbHQtaW4tc3RhdGljLW1ldGhvZC1uYW1lc1xuICBbOmNoaWxkQ29udGV4dFR5cGVzIDpjb250ZXh0VHlwZXMgOmNvbnRleHRUeXBlXG4gICA6Z2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIDpnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3JdKVxuXG4oZGVmbiBjcmVhdGUtY2xhc3NcbiAgXCJDcmVhdGVzIEpTIGNsYXNzIGJhc2VkIG9uIHByb3ZpZGVkIENsb2p1cmUgbWFwLlxuXG4gIE1hcCBrZXlzIHNob3VsZCB1c2UgYFJlYWN0LkNvbXBvbmVudGAgbWV0aG9kIG5hbWVzIChodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtY29tcG9uZW50Lmh0bWwpLFxuICBhbmQgY2FuIGJlIHByb3ZpZGVkIGluIHNuYWtlLWNhc2Ugb3IgY2FtZWxDYXNlLlxuICBDb25zdHJ1Y3RvciBmdW5jdGlvbiBpcyBkZWZpbmVkIHVzaW5nIGtleSBgOmdldEluaXRpYWxTdGF0ZWAuXG5cbiAgUmVhY3QgYnVpbHQtaW4gc3RhdGljIG1ldGhvZHMgb3IgcHJvcGVydGllcyBhcmUgYXV0b21hdGljYWxseSBkZWZpbmVkIGFzIHN0YXRpY3MuXCJcbiAgW2JvZHldXG4gIHs6cHJlIFsobWFwPyBib2R5KV19XG4gIChsZXQgW2JvZHkgKGNsanNpZnkgYm9keSlcbiAgICAgICAgbWV0aG9kcyAobWFwLXRvLWpzIChhcHBseSBkaXNzb2MgYm9keSA6ZGlzcGxheU5hbWUgOmdldEluaXRpYWxTdGF0ZSA6Y29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmVuZGVyIDpyZWFnZW50UmVuZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbHQtaW4tc3RhdGljLW1ldGhvZC1uYW1lcykpXG4gICAgICAgIHN0YXRpYy1tZXRob2RzIChtYXAtdG8tanMgKHNlbGVjdC1rZXlzIGJvZHkgYnVpbHQtaW4tc3RhdGljLW1ldGhvZC1uYW1lcykpXG4gICAgICAgIGRpc3BsYXktbmFtZSAoOmRpc3BsYXlOYW1lIGJvZHkpXG4gICAgICAgIGdldC1pbml0aWFsLXN0YXRlICg6Z2V0SW5pdGlhbFN0YXRlIGJvZHkpXG4gICAgICAgIGNvbnN0cnVjdCAoOmNvbnN0cnVjdG9yIGJvZHkpXG4gICAgICAgIGNtcCAoZm4gW3Byb3BzIGNvbnRleHQgdXBkYXRlcl1cbiAgICAgICAgICAgICAgKHRoaXMtYXMgdGhpc1xuICAgICAgICAgICAgICAgICguY2FsbCByZWFjdC9Db21wb25lbnQgdGhpcyBwcm9wcyBjb250ZXh0IHVwZGF0ZXIpXG4gICAgICAgICAgICAgICAgKHdoZW4gY29uc3RydWN0XG4gICAgICAgICAgICAgICAgICAoY29uc3RydWN0IHRoaXMgcHJvcHMpKVxuICAgICAgICAgICAgICAgICh3aGVuIGdldC1pbml0aWFsLXN0YXRlXG4gICAgICAgICAgICAgICAgICAoc2V0ISAoLi1zdGF0ZSB0aGlzKSAoZ2V0LWluaXRpYWwtc3RhdGUgdGhpcykpKVxuICAgICAgICAgICAgICAgIChzZXQhICguLWNsanNNb3VudE9yZGVyIF5jbGogdGhpcykgKGJhdGNoL25leHQtbW91bnQtY291bnQpKVxuICAgICAgICAgICAgICAgIHRoaXMpKV1cblxuICAgIChnb2JqL2V4dGVuZCAoLi1wcm90b3R5cGUgY21wKSAoLi1wcm90b3R5cGUgcmVhY3QvQ29tcG9uZW50KSBtZXRob2RzKVxuXG4gICAgOzsgVGhlc2UgbmFtZXMgU0hPVUxEIGJlIG1hbmdsZWQgYnkgQ2xvc3VyZSBzbyB3ZSBjYW4ndCB1c2UgZ29vZy9leHRlbmRcblxuICAgICh3aGVuICg6cmVuZGVyIGJvZHkpXG4gICAgICAoc2V0ISAoLi1yZW5kZXIgXmpzICguLXByb3RvdHlwZSBjbXApKSAoOnJlbmRlciBib2R5KSkpXG5cbiAgICAod2hlbiAoOnJlYWdlbnRSZW5kZXIgYm9keSlcbiAgICAgIChzZXQhICguLXJlYWdlbnRSZW5kZXIgXmNsaiAoLi1wcm90b3R5cGUgY21wKSkgKDpyZWFnZW50UmVuZGVyIGJvZHkpKSlcblxuICAgICh3aGVuICg6Y2xqc0xlZ2FjeVJlbmRlciBib2R5KVxuICAgICAgKHNldCEgKC4tY2xqc0xlZ2FjeVJlbmRlciBeY2xqICguLXByb3RvdHlwZSBjbXApKSAoOmNsanNMZWdhY3lSZW5kZXIgYm9keSkpKVxuXG4gICAgKGdvYmovZXh0ZW5kIGNtcCByZWFjdC9Db21wb25lbnQgc3RhdGljLW1ldGhvZHMpXG5cbiAgICAod2hlbiBkaXNwbGF5LW5hbWVcbiAgICAgIChzZXQhICguLWRpc3BsYXlOYW1lIGNtcCkgZGlzcGxheS1uYW1lKVxuICAgICAgKHNldCEgKC4tY2xqcyRsYW5nJGN0b3JTdHIgY21wKSBkaXNwbGF5LW5hbWUpXG4gICAgICAoc2V0ISAoLi1jbGpzJGxhbmckY3RvclByV3JpdGVyIGNtcClcbiAgICAgICAgICAgIChmbiBbdGhpcyB3cml0ZXIgb3B0XVxuICAgICAgICAgICAgICAoY2xqcy5jb3JlLy13cml0ZSB3cml0ZXIgZGlzcGxheS1uYW1lKSkpKVxuXG4gICAgKHNldCEgKC4tY2xqcyRsYW5nJHR5cGUgY21wKSB0cnVlKVxuICAgIChzZXQhICguLiBjbXAgLXByb3RvdHlwZSAtY29uc3RydWN0b3IpIGNtcClcblxuICAgIGNtcCkpXG5cbihkZWZuIGZuLXRvLWNsYXNzIFtmXVxuICAoYXNzZXJ0LWNhbGxhYmxlIGYpXG4gICh3YXJuLXVubGVzcyAobm90IChhbmQgKHJlYWN0LWNsYXNzPyBmKVxuICAgICAgICAgICAgICAgICAgICAgICAgIChub3QgKHJlYWdlbnQtY2xhc3M/IGYpKSkpXG4gICAgICAgICAgICAgICBcIlVzaW5nIG5hdGl2ZSBSZWFjdCBjbGFzc2VzIGRpcmVjdGx5IGluIEhpY2N1cCBmb3JtcyBcIlxuICAgICAgICAgICAgICAgXCJpcyBub3Qgc3VwcG9ydGVkLiBVc2UgY3JlYXRlLWVsZW1lbnQgb3IgXCJcbiAgICAgICAgICAgICAgIFwiYWRhcHQtcmVhY3QtY2xhc3MgaW5zdGVhZDogXCIgKG9yICh1dGlsL2Z1bi1uYW1lIGYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZilcbiAgICAgICAgICAgICAgIChjb21wLW5hbWUpKVxuICAoaWYgKHJlYWdlbnQtY2xhc3M/IGYpXG4gICAgKGNhY2hlLXJlYWN0LWNsYXNzIGYgZilcbiAgICAobGV0IFtzcGVjIChtZXRhIGYpXG4gICAgICAgICAgd2l0aHJlbmRlciAoYXNzb2Mgc3BlYyA6cmVhZ2VudC1yZW5kZXIgZilcbiAgICAgICAgICByZXMgKGNyZWF0ZS1jbGFzcyB3aXRocmVuZGVyKV1cbiAgICAgIChjYWNoZS1yZWFjdC1jbGFzcyBmIHJlcykpKSlcblxuKGRlZm4gYXMtY2xhc3MgW3RhZ11cbiAgKGlmLXNvbWUgW2NhY2hlZC1jbGFzcyAoY2FjaGVkLXJlYWN0LWNsYXNzIHRhZyldXG4gICAgY2FjaGVkLWNsYXNzXG4gICAgKGZuLXRvLWNsYXNzIHRhZykpKVxuXG4oZGVmbiByZWFjdGlmeS1jb21wb25lbnQgW2NvbXBdXG4gIChpZiAocmVhY3QtY2xhc3M/IGNvbXApXG4gICAgY29tcFxuICAgIChhcy1jbGFzcyBjb21wKSkpXG4iXX0=