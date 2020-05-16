// Compiled by ClojureScript 1.10.597
goog.provide("reagent.impl.template");
reagent.impl.template.global$module$react = goog.global["React"];
/**
 * Regular expression that parses a CSS-style id and class
 *           from a tag name.
 */
reagent.impl.template.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;

/**
* @constructor
*/
reagent.impl.template.NativeWrapper = (function (tag,id,className){
this.tag = tag;
this.id = id;
this.className = className;
});

(reagent.impl.template.NativeWrapper.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"tag","tag",(350170304),null),new cljs.core.Symbol(null,"id","id",(252129435),null),new cljs.core.Symbol(null,"className","className",(-342755530),null)], null);
}));

(reagent.impl.template.NativeWrapper.cljs$lang$type = true);

(reagent.impl.template.NativeWrapper.cljs$lang$ctorStr = "reagent.impl.template/NativeWrapper");

(reagent.impl.template.NativeWrapper.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.impl.template/NativeWrapper");
}));

/**
 * Positional factory function for reagent.impl.template/NativeWrapper.
 */
reagent.impl.template.__GT_NativeWrapper = (function reagent$impl$template$__GT_NativeWrapper(tag,id,className){
return (new reagent.impl.template.NativeWrapper(tag,id,className));
});

reagent.impl.template.hiccup_tag_QMARK_ = (function reagent$impl$template$hiccup_tag_QMARK_(x){
return ((reagent.impl.util.named_QMARK_.call(null,x)) || (typeof x === 'string'));
});
reagent.impl.template.valid_tag_QMARK_ = (function reagent$impl$template$valid_tag_QMARK_(x){
return ((reagent.impl.template.hiccup_tag_QMARK_.call(null,x)) || (cljs.core.ifn_QMARK_.call(null,x)) || ((x instanceof reagent.impl.template.NativeWrapper)));
});
reagent.impl.template.prop_name_cache = ({"class": "className", "for": "htmlFor", "charset": "charSet"});
reagent.impl.template.cache_get = (function reagent$impl$template$cache_get(o,k){
if(o.hasOwnProperty(k)){
return goog.object.get(o,k);
} else {
return null;
}
});
reagent.impl.template.cached_prop_name = (function reagent$impl$template$cached_prop_name(k){
if(reagent.impl.util.named_QMARK_.call(null,k)){
var temp__9814__auto__ = reagent.impl.template.cache_get.call(null,reagent.impl.template.prop_name_cache,cljs.core.name.call(null,k));
if((temp__9814__auto__ == null)){
var v = reagent.impl.util.dash_to_prop_name.call(null,k);
goog.object.set(reagent.impl.template.prop_name_cache,cljs.core.name.call(null,k),v);

return v;
} else {
var k_SINGLEQUOTE_ = temp__9814__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
reagent.impl.template.js_val_QMARK_ = (function reagent$impl$template$js_val_QMARK_(x){
return (!(("object" === goog.typeOf(x))));
});
reagent.impl.template.kv_conv = (function reagent$impl$template$kv_conv(o,k,v){
var G__484 = o;
goog.object.set(G__484,reagent.impl.template.cached_prop_name.call(null,k),reagent.impl.template.convert_prop_value.call(null,v));

return G__484;
});
reagent.impl.template.convert_prop_value = (function reagent$impl$template$convert_prop_value(x){
if(reagent.impl.template.js_val_QMARK_.call(null,x)){
return x;
} else {
if(reagent.impl.util.named_QMARK_.call(null,x)){
return cljs.core.name.call(null,x);
} else {
if(cljs.core.map_QMARK_.call(null,x)){
return cljs.core.reduce_kv.call(null,reagent.impl.template.kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_.call(null,x)){
return cljs.core.clj__GT_js.call(null,x);
} else {
if(cljs.core.ifn_QMARK_.call(null,x)){
return (function() { 
var G__485__delegate = function (args){
return cljs.core.apply.call(null,x,args);
};
var G__485 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__486__i = 0, G__486__a = new Array(arguments.length -  0);
while (G__486__i < G__486__a.length) {G__486__a[G__486__i] = arguments[G__486__i + 0]; ++G__486__i;}
  args = new cljs.core.IndexedSeq(G__486__a,0,null);
} 
return G__485__delegate.call(this,args);};
G__485.cljs$lang$maxFixedArity = 0;
G__485.cljs$lang$applyTo = (function (arglist__487){
var args = cljs.core.seq(arglist__487);
return G__485__delegate(args);
});
G__485.cljs$core$IFn$_invoke$arity$variadic = G__485__delegate;
return G__485;
})()
;
} else {
return cljs.core.clj__GT_js.call(null,x);

}
}
}
}
}
});
reagent.impl.template.custom_prop_name_cache = ({});
reagent.impl.template.cached_custom_prop_name = (function reagent$impl$template$cached_custom_prop_name(k){
if(reagent.impl.util.named_QMARK_.call(null,k)){
var temp__9814__auto__ = reagent.impl.template.cache_get.call(null,reagent.impl.template.custom_prop_name_cache,cljs.core.name.call(null,k));
if((temp__9814__auto__ == null)){
var v = reagent.impl.util.dash_to_prop_name.call(null,k);
goog.object.set(reagent.impl.template.custom_prop_name_cache,cljs.core.name.call(null,k),v);

return v;
} else {
var k_SINGLEQUOTE_ = temp__9814__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
reagent.impl.template.custom_kv_conv = (function reagent$impl$template$custom_kv_conv(o,k,v){
var G__488 = o;
goog.object.set(G__488,reagent.impl.template.cached_custom_prop_name.call(null,k),reagent.impl.template.convert_prop_value.call(null,v));

return G__488;
});
reagent.impl.template.convert_custom_prop_value = (function reagent$impl$template$convert_custom_prop_value(x){
if(reagent.impl.template.js_val_QMARK_.call(null,x)){
return x;
} else {
if(reagent.impl.util.named_QMARK_.call(null,x)){
return cljs.core.name.call(null,x);
} else {
if(cljs.core.map_QMARK_.call(null,x)){
return cljs.core.reduce_kv.call(null,reagent.impl.template.custom_kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_.call(null,x)){
return cljs.core.clj__GT_js.call(null,x);
} else {
if(cljs.core.ifn_QMARK_.call(null,x)){
return (function() { 
var G__489__delegate = function (args){
return cljs.core.apply.call(null,x,args);
};
var G__489 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__490__i = 0, G__490__a = new Array(arguments.length -  0);
while (G__490__i < G__490__a.length) {G__490__a[G__490__i] = arguments[G__490__i + 0]; ++G__490__i;}
  args = new cljs.core.IndexedSeq(G__490__a,0,null);
} 
return G__489__delegate.call(this,args);};
G__489.cljs$lang$maxFixedArity = 0;
G__489.cljs$lang$applyTo = (function (arglist__491){
var args = cljs.core.seq(arglist__491);
return G__489__delegate(args);
});
G__489.cljs$core$IFn$_invoke$arity$variadic = G__489__delegate;
return G__489;
})()
;
} else {
return cljs.core.clj__GT_js.call(null,x);

}
}
}
}
}
});
/**
 * Takes the id and class from tag keyword, and adds them to the
 *   other props. Parsed tag is JS object with :id and :class properties.
 */
reagent.impl.template.set_id_class = (function reagent$impl$template$set_id_class(props,id_class){
var id = id_class.id;
var class$ = id_class.className;
var G__492 = props;
var G__492__$1 = (((((!((id == null)))) && ((new cljs.core.Keyword(null,"id","id",(-1388402092)).cljs$core$IFn$_invoke$arity$1(props) == null))))?cljs.core.assoc.call(null,G__492,new cljs.core.Keyword(null,"id","id",(-1388402092)),id):G__492);
if(cljs.core.truth_(class$)){
return cljs.core.assoc.call(null,G__492__$1,new cljs.core.Keyword(null,"class","class",(-2030961996)),reagent.impl.util.class_names.call(null,class$,new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(props)));
} else {
return G__492__$1;
}
});
reagent.impl.template.convert_props = (function reagent$impl$template$convert_props(props,id_class){
var class$ = new cljs.core.Keyword(null,"class","class",(-2030961996)).cljs$core$IFn$_invoke$arity$1(props);
var props__$1 = reagent.impl.template.set_id_class.call(null,(function (){var G__493 = props;
if(cljs.core.truth_(class$)){
return cljs.core.assoc.call(null,G__493,new cljs.core.Keyword(null,"class","class",(-2030961996)),reagent.impl.util.class_names.call(null,class$));
} else {
return G__493;
}
})(),id_class);
if(cljs.core.truth_(id_class.custom)){
return reagent.impl.template.convert_custom_prop_value.call(null,props__$1);
} else {
return reagent.impl.template.convert_prop_value.call(null,props__$1);
}
});
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.template !== 'undefined') && (typeof reagent.impl.template.find_dom_node !== 'undefined')){
} else {
reagent.impl.template.find_dom_node = null;
}
reagent.impl.template.these_inputs_have_selection_api = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, ["text",null,"textarea",null,"password",null,"search",null,"tel",null,"url",null], null), null);
reagent.impl.template.has_selection_api_QMARK_ = (function reagent$impl$template$has_selection_api_QMARK_(input_type){
return cljs.core.contains_QMARK_.call(null,reagent.impl.template.these_inputs_have_selection_api,input_type);
});
reagent.impl.template.input_node_set_value = (function reagent$impl$template$input_node_set_value(node,rendered_value,dom_value,component,p__494){
var map__495 = p__494;
var map__495__$1 = (((((!((map__495 == null))))?(((((map__495.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__495.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__495):map__495);
var on_write = cljs.core.get.call(null,map__495__$1,new cljs.core.Keyword(null,"on-write","on-write",(31519475)));
if((!((((node === document.activeElement)) && (reagent.impl.template.has_selection_api_QMARK_.call(null,node.type)) && (typeof rendered_value === 'string') && (typeof dom_value === 'string'))))){
(component.cljsDOMValue = rendered_value);

(node.value = rendered_value);

if(cljs.core.fn_QMARK_.call(null,on_write)){
return on_write.call(null,rendered_value);
} else {
return null;
}
} else {
var node_value = node.value;
if(cljs.core.not_EQ_.call(null,node_value,dom_value)){
return reagent.impl.batching.do_after_render.call(null,(function (){
return reagent.impl.template.input_component_set_value.call(null,component);
}));
} else {
var existing_offset_from_end = (cljs.core.count.call(null,node_value) - node.selectionStart);
var new_cursor_offset = (cljs.core.count.call(null,rendered_value) - existing_offset_from_end);
(component.cljsDOMValue = rendered_value);

(node.value = rendered_value);

if(cljs.core.fn_QMARK_.call(null,on_write)){
on_write.call(null,rendered_value);
} else {
}

(node.selectionStart = new_cursor_offset);

return (node.selectionEnd = new_cursor_offset);
}
}
});
reagent.impl.template.input_component_set_value = (function reagent$impl$template$input_component_set_value(this$){
if(cljs.core.truth_(this$.cljsInputLive)){
(this$.cljsInputDirty = false);

var rendered_value = this$.cljsRenderedValue;
var dom_value = this$.cljsDOMValue;
var node = reagent.impl.template.find_dom_node.call(null,this$);
if(cljs.core.not_EQ_.call(null,rendered_value,dom_value)){
return reagent.impl.template.input_node_set_value.call(null,node,rendered_value,dom_value,this$,cljs.core.PersistentArrayMap.EMPTY);
} else {
return null;
}
} else {
return null;
}
});
reagent.impl.template.input_handle_change = (function reagent$impl$template$input_handle_change(this$,on_change,e){
(this$.cljsDOMValue = e.target.value);

if(cljs.core.truth_(this$.cljsInputDirty)){
} else {
(this$.cljsInputDirty = true);

reagent.impl.batching.do_after_render.call(null,(function (){
return reagent.impl.template.input_component_set_value.call(null,this$);
}));
}

return on_change.call(null,e);
});
reagent.impl.template.input_render_setup = (function reagent$impl$template$input_render_setup(this$,jsprops){
if(cljs.core.truth_((((!((jsprops == null))))?(function (){var and__10090__auto__ = jsprops.hasOwnProperty("onChange");
if(cljs.core.truth_(and__10090__auto__)){
return jsprops.hasOwnProperty("value");
} else {
return and__10090__auto__;
}
})():false))){
if(cljs.core.truth_(reagent.impl.template.find_dom_node)){
} else {
throw (new Error(["Assert failed: ","reagent.dom needs to be loaded for controlled input to work","\n","find-dom-node"].join('')));
}

var v = jsprops.value;
var value = (((v == null))?"":v);
var on_change = jsprops.onChange;
if(cljs.core.truth_(this$.cljsInputLive)){
} else {
(this$.cljsInputLive = true);

(this$.cljsDOMValue = value);
}

(this$.cljsRenderedValue = value);

delete jsprops["value"];

(jsprops.defaultValue = value);

return (jsprops.onChange = (function (p1__20_SHARP_){
return reagent.impl.template.input_handle_change.call(null,this$,on_change,p1__20_SHARP_);
}));
} else {
return null;
}
});
reagent.impl.template.input_unmount = (function reagent$impl$template$input_unmount(this$){
return (this$.cljsInputLive = null);
});
reagent.impl.template.input_component_QMARK_ = (function reagent$impl$template$input_component_QMARK_(x){
var G__497 = x;
switch (G__497) {
case "input":
case "textarea":
return true;

break;
default:
return false;

}
});
reagent.impl.template.reagent_input_class = null;
reagent.impl.template.input_spec = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display-name","display-name",(694513143)),"ReagentInput",new cljs.core.Keyword(null,"component-did-update","component-did-update",(-1468549173)),reagent.impl.template.input_component_set_value,new cljs.core.Keyword(null,"component-will-unmount","component-will-unmount",(-2058314698)),reagent.impl.template.input_unmount,new cljs.core.Keyword(null,"reagent-render","reagent-render",(-985383853)),(function (argv,component,jsprops,first_child){
var this$ = reagent.impl.component._STAR_current_component_STAR_;
reagent.impl.template.input_render_setup.call(null,this$,jsprops);

return reagent.impl.template.make_element.call(null,argv,component,jsprops,first_child);
})], null);
reagent.impl.template.reagent_input = (function reagent$impl$template$reagent_input(){
if((reagent.impl.template.reagent_input_class == null)){
(reagent.impl.template.reagent_input_class = reagent.impl.component.create_class.call(null,reagent.impl.template.input_spec));
} else {
}

return reagent.impl.template.reagent_input_class;
});

/**
* @constructor
*/
reagent.impl.template.HiccupTag = (function (tag,id,className,custom){
this.tag = tag;
this.id = id;
this.className = className;
this.custom = custom;
});

(reagent.impl.template.HiccupTag.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"tag","tag",(350170304),null),new cljs.core.Symbol(null,"id","id",(252129435),null),new cljs.core.Symbol(null,"className","className",(-342755530),null),new cljs.core.Symbol(null,"custom","custom",(1980683475),null)], null);
}));

(reagent.impl.template.HiccupTag.cljs$lang$type = true);

(reagent.impl.template.HiccupTag.cljs$lang$ctorStr = "reagent.impl.template/HiccupTag");

(reagent.impl.template.HiccupTag.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.impl.template/HiccupTag");
}));

/**
 * Positional factory function for reagent.impl.template/HiccupTag.
 */
reagent.impl.template.__GT_HiccupTag = (function reagent$impl$template$__GT_HiccupTag(tag,id,className,custom){
return (new reagent.impl.template.HiccupTag(tag,id,className,custom));
});

reagent.impl.template.parse_tag = (function reagent$impl$template$parse_tag(hiccup_tag){
var vec__499 = cljs.core.next.call(null,cljs.core.re_matches.call(null,reagent.impl.template.re_tag,cljs.core.name.call(null,hiccup_tag)));
var tag = cljs.core.nth.call(null,vec__499,(0),null);
var id = cljs.core.nth.call(null,vec__499,(1),null);
var className = cljs.core.nth.call(null,vec__499,(2),null);
var className__$1 = (((className == null))?null:clojure.string.replace.call(null,className,/\./," "));
if(cljs.core.truth_(tag)){
} else {
throw (new Error(["Assert failed: ",["Invalid tag: '",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hiccup_tag),"'",reagent.impl.component.comp_name.call(null)].join(''),"\n","tag"].join('')));
}

return reagent.impl.template.__GT_HiccupTag.call(null,tag,id,className__$1,cljs.core.not_EQ_.call(null,(-1),tag.indexOf("-")));
});
reagent.impl.template.try_get_key = (function reagent$impl$template$try_get_key(x){
try{return cljs.core.get.call(null,x,new cljs.core.Keyword(null,"key","key",(-1516042587)));
}catch (e502){var e = e502;
return null;
}});
reagent.impl.template.get_key = (function reagent$impl$template$get_key(x){
if(cljs.core.map_QMARK_.call(null,x)){
return reagent.impl.template.try_get_key.call(null,x);
} else {
return null;
}
});
reagent.impl.template.key_from_vec = (function reagent$impl$template$key_from_vec(v){
var temp__9814__auto__ = reagent.impl.template.get_key.call(null,cljs.core.meta.call(null,v));
if((temp__9814__auto__ == null)){
return reagent.impl.template.get_key.call(null,cljs.core.nth.call(null,v,(1),null));
} else {
var k = temp__9814__auto__;
return k;
}
});
reagent.impl.template.reag_element = (function reagent$impl$template$reag_element(tag,v){
var c = reagent.impl.component.as_class.call(null,tag);
var jsprops = ({});
(jsprops.argv = v);

var temp__9859__auto___503 = reagent.impl.template.key_from_vec.call(null,v);
if((temp__9859__auto___503 == null)){
} else {
var key_504 = temp__9859__auto___503;
(jsprops.key = key_504);
}

return reagent.impl.template.global$module$react.createElement(c,jsprops);
});
reagent.impl.template.fragment_element = (function reagent$impl$template$fragment_element(argv){
var props = cljs.core.nth.call(null,argv,(1),null);
var hasprops = (((props == null)) || (cljs.core.map_QMARK_.call(null,props)));
var jsprops = (function (){var or__10112__auto__ = reagent.impl.template.convert_prop_value.call(null,((hasprops)?props:null));
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((hasprops)?(1):(0)));
var temp__9859__auto___505 = reagent.impl.template.key_from_vec.call(null,argv);
if((temp__9859__auto___505 == null)){
} else {
var key_506 = temp__9859__auto___505;
(jsprops.key = key_506);
}

return reagent.impl.template.make_element.call(null,argv,reagent.impl.template.global$module$react.Fragment,jsprops,first_child);
});
reagent.impl.template.adapt_react_class = (function reagent$impl$template$adapt_react_class(c){
return reagent.impl.template.__GT_NativeWrapper.call(null,c,null,null);
});
reagent.impl.template.tag_name_cache = ({});
reagent.impl.template.cached_parse = (function reagent$impl$template$cached_parse(x){
var temp__9814__auto__ = reagent.impl.template.cache_get.call(null,reagent.impl.template.tag_name_cache,x);
if((temp__9814__auto__ == null)){
var v = reagent.impl.template.parse_tag.call(null,x);
goog.object.set(reagent.impl.template.tag_name_cache,x,v);

return v;
} else {
var s = temp__9814__auto__;
return s;
}
});
reagent.impl.template.native_element = (function reagent$impl$template$native_element(parsed,argv,first){
var component = parsed.tag;
var props = cljs.core.nth.call(null,argv,first,null);
var hasprops = (((props == null)) || (cljs.core.map_QMARK_.call(null,props)));
var jsprops = (function (){var or__10112__auto__ = reagent.impl.template.convert_props.call(null,((hasprops)?props:null),parsed);
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return ({});
}
})();
var first_child = (first + ((hasprops)?(1):(0)));
if(reagent.impl.template.input_component_QMARK_.call(null,component)){
return reagent.impl.template.as_element.call(null,cljs.core.with_meta.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template.reagent_input.call(null),argv,component,jsprops,first_child], null),cljs.core.meta.call(null,argv)));
} else {
var temp__9859__auto___507 = reagent.impl.template.get_key.call(null,cljs.core.meta.call(null,argv));
if((temp__9859__auto___507 == null)){
} else {
var key_508 = temp__9859__auto___507;
(jsprops.key = key_508);
}

return reagent.impl.template.make_element.call(null,argv,component,jsprops,first_child);
}
});
reagent.impl.template.str_coll = (function reagent$impl$template$str_coll(coll){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.walk.prewalk.call(null,(function (x){
if(cljs.core.fn_QMARK_.call(null,x)){
var n = reagent.impl.util.fun_name.call(null,x);
var G__510 = n;
if(cljs.core._EQ_.call(null,"",G__510)){
return x;
} else {
if(cljs.core._EQ_.call(null,null,G__510)){
return x;
} else {
return cljs.core.symbol.call(null,n);

}
}
} else {
return x;
}
}),coll));

});
reagent.impl.template.hiccup_err = (function reagent$impl$template$hiccup_err(var_args){
var args__12462__auto__ = [];
var len__12445__auto___513 = arguments.length;
var i__12446__auto___514 = (0);
while(true){
if((i__12446__auto___514 < len__12445__auto___513)){
args__12462__auto__.push((arguments[i__12446__auto___514]));

var G__515 = (i__12446__auto___514 + (1));
i__12446__auto___514 = G__515;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.impl.template.hiccup_err.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.impl.template.hiccup_err.cljs$core$IFn$_invoke$arity$variadic = (function (v,msg){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,msg)),": ",reagent.impl.template.str_coll.call(null,v),"\n",reagent.impl.component.comp_name.call(null)].join('');
}));

(reagent.impl.template.hiccup_err.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.impl.template.hiccup_err.cljs$lang$applyTo = (function (seq511){
var G__512 = cljs.core.first.call(null,seq511);
var seq511__$1 = cljs.core.next.call(null,seq511);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__512,seq511__$1);
}));

reagent.impl.template.vec_to_elem = (function reagent$impl$template$vec_to_elem(v){
while(true){
if((cljs.core.count.call(null,v) > (0))){
} else {
throw (new Error(["Assert failed: ",reagent.impl.template.hiccup_err.call(null,v,"Hiccup form should not be empty"),"\n","(pos? (count v))"].join('')));
}

var tag = cljs.core.nth.call(null,v,(0),null);
if(reagent.impl.template.valid_tag_QMARK_.call(null,tag)){
} else {
throw (new Error(["Assert failed: ",reagent.impl.template.hiccup_err.call(null,v,"Invalid Hiccup form"),"\n","(valid-tag? tag)"].join('')));
}

if(cljs.core.keyword_identical_QMARK_.call(null,new cljs.core.Keyword(null,"<>","<>",(1280186386)),tag)){
return reagent.impl.template.fragment_element.call(null,v);
} else {
if(reagent.impl.template.hiccup_tag_QMARK_.call(null,tag)){
var n = cljs.core.name.call(null,tag);
var pos = n.indexOf(">");
var G__516 = pos;
switch (G__516) {
case (-1):
return reagent.impl.template.native_element.call(null,reagent.impl.template.cached_parse.call(null,n),v,(1));

break;
case (0):
var component = cljs.core.nth.call(null,v,(1),null);
if(cljs.core._EQ_.call(null,">",n)){
} else {
throw (new Error(["Assert failed: ",reagent.impl.template.hiccup_err.call(null,v,"Invalid Hiccup tag"),"\n","(= \">\" n)"].join('')));
}

return reagent.impl.template.native_element.call(null,reagent.impl.template.__GT_HiccupTag.call(null,component,null,null,null),v,(2));

break;
default:
var G__518 = cljs.core.with_meta.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,n,(0),pos),cljs.core.assoc.call(null,cljs.core.with_meta.call(null,v,null),(0),cljs.core.subs.call(null,n,(pos + (1))))], null),cljs.core.meta.call(null,v));
v = G__518;
continue;

}
} else {
if((tag instanceof reagent.impl.template.NativeWrapper)){
return reagent.impl.template.native_element.call(null,tag,v,(1));
} else {
return reagent.impl.template.reag_element.call(null,tag,v);

}
}
}
break;
}
});
reagent.impl.template.as_element = (function reagent$impl$template$as_element(x){
if(reagent.impl.template.js_val_QMARK_.call(null,x)){
return x;
} else {
if(cljs.core.vector_QMARK_.call(null,x)){
return reagent.impl.template.vec_to_elem.call(null,x);
} else {
if(cljs.core.seq_QMARK_.call(null,x)){
return reagent.impl.template.expand_seq_check.call(null,x);

} else {
if(reagent.impl.util.named_QMARK_.call(null,x)){
return cljs.core.name.call(null,x);
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (2147483648))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IPrintWithWriter$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IPrintWithWriter,x):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IPrintWithWriter,x))){
return cljs.core.pr_str.call(null,x);
} else {
return x;

}
}
}
}
}
});
(reagent.impl.component.as_element = reagent.impl.template.as_element);
reagent.impl.template.expand_seq = (function reagent$impl$template$expand_seq(s){
return cljs.core.into_array.call(null,cljs.core.map.call(null,reagent.impl.template.as_element,s));
});
reagent.impl.template.expand_seq_dev = (function reagent$impl$template$expand_seq_dev(s,o){
return cljs.core.into_array.call(null,cljs.core.map.call(null,(function (val){
if(((cljs.core.vector_QMARK_.call(null,val)) && ((reagent.impl.template.key_from_vec.call(null,val) == null)))){
(o.no_key = true);
} else {
}

return reagent.impl.template.as_element.call(null,val);
}),s));
});
reagent.impl.template.expand_seq_check = (function reagent$impl$template$expand_seq_check(x){
var ctx = ({});
var vec__520 = reagent.ratom.check_derefs.call(null,(function (){
return reagent.impl.template.expand_seq_dev.call(null,x,ctx);
}));
var res = cljs.core.nth.call(null,vec__520,(0),null);
var derefed = cljs.core.nth.call(null,vec__520,(1),null);
if(cljs.core.truth_(derefed)){
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).warn(["Warning: ",reagent.impl.template.hiccup_err.call(null,x,"Reactive deref not supported in lazy seq, ","it should be wrapped in doall")].join(''));
} else {
}
} else {
}

if(cljs.core.truth_(ctx.no_key)){
if(cljs.core.truth_(reagent.debug.has_console)){
(cljs.core.truth_(reagent.debug.tracking)?reagent.debug.track_console:console).warn(["Warning: ",reagent.impl.template.hiccup_err.call(null,x,"Every element in a seq should have a unique :key")].join(''));
} else {
}
} else {
}

return res;
});
reagent.impl.template.make_element = (function reagent$impl$template$make_element(argv,component,jsprops,first_child){
var G__523 = (cljs.core.count.call(null,argv) - first_child);
switch (G__523) {
case (0):
return reagent.impl.template.global$module$react.createElement(component,jsprops);

break;
case (1):
return reagent.impl.template.global$module$react.createElement(component,jsprops,reagent.impl.template.as_element.call(null,cljs.core.nth.call(null,argv,first_child,null)));

break;
default:
return reagent.impl.template.global$module$react.createElement.apply(null,cljs.core.reduce_kv.call(null,(function (a,k,v){
if((k >= first_child)){
a.push(reagent.impl.template.as_element.call(null,v));
} else {
}

return a;
}),[component,jsprops],argv));

}
});

//# sourceURL=reagent/impl/template.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9pbXBsL3RlbXBsYXRlLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jbGpzIl0sImxpbmVDb3VudCI6Njk1LCJtYXBwaW5ncyI6IjtBQVdBLEFBQUEsQUFHQTs7OzsrQkFBQSwvQkFFRUE7QUFFRixBQUFBOzs7Ozs7Ozs7QUFBQTtBQUFBLENBQUEsK0NBQUEsL0NBQVNLO0FBQVQsQUFBQSxBQUFBOzs7QUFBQSxDQUFBLHFEQUFBLHJEQUFTQTs7QUFBVCxDQUFBLHdEQUFBLHhEQUFTQTs7QUFBVCxDQUFBLDZEQUFBLFdBQUFKLG9CQUFBQyxzQkFBQUMsbEhBQVNFO0FBQVQsQUFBQSxPQUFBRCwyQkFBQUYsc0JBQUE7OztBQUFBOzs7MkNBQUEsM0NBQVNJLDhGQUFlQyxJQUFJQyxHQUFHQztBQUEvQixBQUFBLFlBQUFKLG9DQUF3QkUsSUFBSUMsR0FBR0M7OztBQUF0QkosQUFLVCwwQ0FBQSwxQ0FBZUssNEZBQWFDO0FBQTVCLEFBQ0UsU0FBSSxBQUFDQyx5Q0FBT0QsUUFDUixPQUFTQTs7QUFFZix5Q0FBQSx6Q0FBZUUsMEZBQVlGO0FBQTNCLEFBQ0UsU0FBSSxBQUFDRCxrREFBWUMsUUFDYixBQUFDRywrQkFBS0gsUUFDTixjQUFXTixiQUFjTTs7QUFLL0Isd0NBQUEsV0FBQSxvQkFBQSxzQkFBQSw3RkFBS0k7QUFJTCxrQ0FBQSxsQ0FBTUMsNEVBQVdDLEVBQUVDO0FBQW5CLEFBQ0UsR0FBTSxBQUEwQkQsaUJBQUVDO0FBQWxDLEFBQ0UsT0FBQ0MsZ0JBQVNGLEVBQUVDOztBQURkOzs7QUFHRix5Q0FBQSx6Q0FBTUUsMEZBQWtCRjtBQUF4QixBQUNFLEdBQUksQUFBQ04seUNBQU9NO0FBQ1YsSUFBQUcscUJBQWEsQUFBQ0wsMENBQVVELHNDQUFnQixBQUFDUSx5QkFBS0w7QUFBOUMsQUFBQSxHQUFBLENBQUFHLHNCQUFBO0FBRUUsSUFBTUcsSUFBRSxBQUFDQyw4Q0FBdUJQO0FBQWhDLEFBQ0UsQUFBQ1EsZ0JBQVNYLHNDQUFnQixBQUFDUSx5QkFB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cl9fMTEwNTZfX2F1dG9fXyIsIm9wdF9fMTEwNTdfX2F1dG9fXyIsImNsanMuY29yZS8td3JpdGUiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvTmF0aXZlV3JhcHBlciIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS8tPk5hdGl2ZVdyYXBwZXIiLCJ0YWciLCJpZCIsImNsYXNzTmFtZSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9oaWNjdXAtdGFnPyIsIngiLCJyZWFnZW50LmltcGwudXRpbC9uYW1lZD8iLCJyZWFnZW50LmltcGwudGVtcGxhdGUvdmFsaWQtdGFnPyIsImNsanMuY29yZS9pZm4/IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL3Byb3AtbmFtZS1jYWNoZSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jYWNoZS1nZXQiLCJvIiwiayIsImdvb2cub2JqZWN0L2dldCIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jYWNoZWQtcHJvcC1uYW1lIiwidGVtcF9fOTgxNF9fYXV0b19fIiwiayciLCJjbGpzLmNvcmUvbmFtZSIsInYiLCJyZWFnZW50LmltcGwudXRpbC9kYXNoLXRvLXByb3AtbmFtZSIsImdvb2cub2JqZWN0L3NldCIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9qcy12YWw/IiwiZ29vZy90eXBlT2YiLCJyZWFnZW50LmltcGwudGVtcGxhdGUva3YtY29udiIsIkdfXzQ4NCIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jb252ZXJ0LXByb3AtdmFsdWUiLCJjbGpzLmNvcmUvbWFwPyIsImNsanMuY29yZS9yZWR1Y2Uta3YiLCJjbGpzLmNvcmUvY29sbD8iLCJjbGpzLmNvcmUvY2xqLT5qcyIsImFyZ3MiLCJjbGpzLmNvcmUvYXBwbHkiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvY3VzdG9tLXByb3AtbmFtZS1jYWNoZSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jYWNoZWQtY3VzdG9tLXByb3AtbmFtZSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jdXN0b20ta3YtY29udiIsIkdfXzQ4OCIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9jb252ZXJ0LWN1c3RvbS1wcm9wLXZhbHVlIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL3NldC1pZC1jbGFzcyIsInByb3BzIiwiaWQtY2xhc3MiLCJjbGFzcyIsIkdfXzQ5MiIsImNsanMuY29yZS9hc3NvYyIsInJlYWdlbnQuaW1wbC51dGlsL2NsYXNzLW5hbWVzIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2NvbnZlcnQtcHJvcHMiLCJHX180OTMiLCJqcy9yZWFnZW50IiwianMvcmVhZ2VudC5pbXBsIiwianMvcmVhZ2VudC5pbXBsLnRlbXBsYXRlIiwianMvcmVhZ2VudC5pbXBsLnRlbXBsYXRlLmZpbmQtZG9tLW5vZGUiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvZmluZC1kb20tbm9kZSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS90aGVzZS1pbnB1dHMtaGF2ZS1zZWxlY3Rpb24tYXBpIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2hhcy1zZWxlY3Rpb24tYXBpPyIsImlucHV0LXR5cGUiLCJjbGpzLmNvcmUvY29udGFpbnM/IiwicF9fNDk0IiwibWFwX180OTUiLCJjbGpzLmNvcmUvUFJPVE9DT0xfU0VOVElORUwiLCJjbGpzLmNvcmUvaGFzaC1tYXAiLCJjbGpzLmNvcmUvZ2V0IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2lucHV0LW5vZGUtc2V0LXZhbHVlIiwibm9kZSIsInJlbmRlcmVkLXZhbHVlIiwiZG9tLXZhbHVlIiwiY29tcG9uZW50Iiwib24td3JpdGUiLCJqcy9kb2N1bWVudCIsImNsanMuY29yZS9mbj8iLCJub2RlLXZhbHVlIiwiY2xqcy5jb3JlL25vdD0iLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvZG8tYWZ0ZXItcmVuZGVyIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2lucHV0LWNvbXBvbmVudC1zZXQtdmFsdWUiLCJleGlzdGluZy1vZmZzZXQtZnJvbS1lbmQiLCJjbGpzLmNvcmUvY291bnQiLCJuZXctY3Vyc29yLW9mZnNldCIsInRoaXMiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvaW5wdXQtaGFuZGxlLWNoYW5nZSIsIm9uLWNoYW5nZSIsImUiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvaW5wdXQtcmVuZGVyLXNldHVwIiwianNwcm9wcyIsImFuZF9fMTAwOTBfX2F1dG9fXyIsImpzL0Vycm9yIiwidmFsdWUiLCJwMV9fMjAjIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2lucHV0LXVubW91bnQiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvaW5wdXQtY29tcG9uZW50PyIsIkdfXzQ5NyIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9yZWFnZW50LWlucHV0LWNsYXNzIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2lucHV0LXNwZWMiLCJhcmd2IiwiZmlyc3QtY2hpbGQiLCJyZWFnZW50LmltcGwuY29tcG9uZW50LypjdXJyZW50LWNvbXBvbmVudCoiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvbWFrZS1lbGVtZW50IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL3JlYWdlbnQtaW5wdXQiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2NyZWF0ZS1jbGFzcyIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9IaWNjdXBUYWciLCJyZWFnZW50LmltcGwudGVtcGxhdGUvLT5IaWNjdXBUYWciLCJjdXN0b20iLCJyZWFnZW50LmltcGwudGVtcGxhdGUvcGFyc2UtdGFnIiwiaGljY3VwLXRhZyIsInZlY19fNDk5IiwiY2xqcy5jb3JlL250aCIsImNsanMuY29yZS9yZS1tYXRjaGVzIiwiY2xqcy5jb3JlL25leHQiLCJjbG9qdXJlLnN0cmluZy9yZXBsYWNlIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9jb21wLW5hbWUiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvdHJ5LWdldC1rZXkiLCJlNTAyIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2dldC1rZXkiLCJyZWFnZW50LmltcGwudGVtcGxhdGUva2V5LWZyb20tdmVjIiwiY2xqcy5jb3JlL21ldGEiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvcmVhZy1lbGVtZW50IiwiYyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvYXMtY2xhc3MiLCJ0ZW1wX185ODU5X19hdXRvX18iLCJrZXkiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvZ2xvYmFsJG1vZHVsZSRyZWFjdC5jcmVhdGVFbGVtZW50IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2ZyYWdtZW50LWVsZW1lbnQiLCJoYXNwcm9wcyIsIm9yX18xMDExMl9fYXV0b19fIiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2dsb2JhbCRtb2R1bGUkcmVhY3QuRnJhZ21lbnQiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvYWRhcHQtcmVhY3QtY2xhc3MiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvdGFnLW5hbWUtY2FjaGUiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvY2FjaGVkLXBhcnNlIiwicyIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9uYXRpdmUtZWxlbWVudCIsInBhcnNlZCIsImZpcnN0IiwiY2xqcy5jb3JlL3dpdGgtbWV0YSIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9hcy1lbGVtZW50IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL3N0ci1jb2xsIiwiY29sbCIsImNsb2p1cmUud2Fsay9wcmV3YWxrIiwibiIsInJlYWdlbnQuaW1wbC51dGlsL2Z1bi1uYW1lIiwiR19fNTEwIiwiY2xqcy5jb3JlLz0iLCJjbGpzLmNvcmUvc3ltYm9sIiwidmFyX2FyZ3MiLCJhcmdzX18xMjQ2Ml9fYXV0b19fIiwibGVuX18xMjQ0NV9fYXV0b19fIiwiaV9fMTI0NDZfX2F1dG9fXyIsImFyZ3NlcV9fMTI0NjNfX2F1dG9fXyIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9oaWNjdXAtZXJyIiwic2VxNTExIiwiR19fNTEyIiwic2VsZl9fMTI0MjBfX2F1dG9fXyIsIm1zZyIsImNsanMuY29yZS9zdHIiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvdmVjLXRvLWVsZW0iLCJjbGpzLmNvcmUva2V5d29yZC1pZGVudGljYWw/IiwicG9zIiwiR19fNTE2IiwiY2xqcy5jb3JlL3N1YnMiLCJjbGpzLmNvcmUvdmVjdG9yPyIsImNsanMuY29yZS9zZXE/IiwicmVhZ2VudC5pbXBsLnRlbXBsYXRlL2V4cGFuZC1zZXEtY2hlY2siLCJjbGpzLmNvcmUvbmF0aXZlLXNhdGlzZmllcz8iLCJjbGpzLmNvcmUvSVByaW50V2l0aFdyaXRlciIsImNsanMuY29yZS9wci1zdHIiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2FzLWVsZW1lbnQiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvZXhwYW5kLXNlcSIsImNsanMuY29yZS9pbnRvLWFycmF5IiwiY2xqcy5jb3JlL21hcCIsInJlYWdlbnQuaW1wbC50ZW1wbGF0ZS9leHBhbmQtc2VxLWRldiIsInZhbCIsInZlY19fNTIwIiwiY3R4IiwicmVzIiwiZGVyZWZlZCIsInJlYWdlbnQucmF0b20vY2hlY2stZGVyZWZzIiwicmVhZ2VudC9kZWJ1ZyIsImpzL2NvbnNvbGUiLCJHX181MjMiLCJhIiwiY2xqcy5jb3JlL2ZpcnN0IiwiY2xqcy5jb3JlL0luZGV4ZWRTZXEiXSwic291cmNlc0NvbnRlbnQiOlsiKG5zIHJlYWdlbnQuaW1wbC50ZW1wbGF0ZVxuICAoOnJlcXVpcmUgW3JlYWN0IDphcyByZWFjdF1cbiAgICAgICAgICAgIFtjbG9qdXJlLnN0cmluZyA6YXMgc3RyaW5nXVxuICAgICAgICAgICAgW2Nsb2p1cmUud2FsayA6cmVmZXIgW3ByZXdhbGtdXVxuICAgICAgICAgICAgW3JlYWdlbnQuaW1wbC51dGlsIDphcyB1dGlsIDpyZWZlciBbbmFtZWQ/XV1cbiAgICAgICAgICAgIFtyZWFnZW50LmltcGwuY29tcG9uZW50IDphcyBjb21wXVxuICAgICAgICAgICAgW3JlYWdlbnQuaW1wbC5iYXRjaGluZyA6YXMgYmF0Y2hdXG4gICAgICAgICAgICBbcmVhZ2VudC5yYXRvbSA6YXMgcmF0b21dXG4gICAgICAgICAgICBbcmVhZ2VudC5kZWJ1ZyA6cmVmZXItbWFjcm9zIFtkZXY/IHdhcm5dXVxuICAgICAgICAgICAgW2dvb2cub2JqZWN0IDphcyBnb2JqXSkpXG5cbihkZWNsYXJlIGFzLWVsZW1lbnQpXG5cbjs7IEZyb20gV2VhdmVqZXN0ZXIncyBIaWNjdXAsIHZpYSBwdW1wOlxuKGRlZiBeezpkb2MgXCJSZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBwYXJzZXMgYSBDU1Mtc3R5bGUgaWQgYW5kIGNsYXNzXG4gICAgICAgICAgICAgZnJvbSBhIHRhZyBuYW1lLlwifVxuICByZS10YWcgI1wiKFteXFxzXFwuI10rKSg/OiMoW15cXHNcXC4jXSspKT8oPzpcXC4oW15cXHMjXSspKT9cIilcblxuKGRlZnR5cGUgTmF0aXZlV3JhcHBlciBbdGFnIGlkIGNsYXNzTmFtZV0pXG5cblxuOzs7IENvbW1vbiB1dGlsaXRpZXNcblxuKGRlZm4gXmJvb2xlYW4gaGljY3VwLXRhZz8gW3hdXG4gIChvciAobmFtZWQ/IHgpXG4gICAgICAoc3RyaW5nPyB4KSkpXG5cbihkZWZuIF5ib29sZWFuIHZhbGlkLXRhZz8gW3hdXG4gIChvciAoaGljY3VwLXRhZz8geClcbiAgICAgIChpZm4/IHgpXG4gICAgICAoaW5zdGFuY2U/IE5hdGl2ZVdyYXBwZXIgeCkpKVxuXG5cbjs7OyBQcm9wcyBjb252ZXJzaW9uXG5cbihkZWYgcHJvcC1uYW1lLWNhY2hlICNqc3s6Y2xhc3MgXCJjbGFzc05hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3IgXCJodG1sRm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICA6Y2hhcnNldCBcImNoYXJTZXRcIn0pXG5cbihkZWZuIGNhY2hlLWdldCBbbyBrXVxuICAod2hlbiBeYm9vbGVhbiAoLmhhc093blByb3BlcnR5IG8gaylcbiAgICAoZ29iai9nZXQgbyBrKSkpXG5cbihkZWZuIGNhY2hlZC1wcm9wLW5hbWUgW2tdXG4gIChpZiAobmFtZWQ/IGspXG4gICAgKGlmLXNvbWUgW2snIChjYWNoZS1nZXQgcHJvcC1uYW1lLWNhY2hlIChuYW1lIGspKV1cbiAgICAgIGsnXG4gICAgICAobGV0IFt2ICh1dGlsL2Rhc2gtdG8tcHJvcC1uYW1lIGspXVxuICAgICAgICAoZ29iai9zZXQgcHJvcC1uYW1lLWNhY2hlIChuYW1lIGspIHYpXG4gICAgICAgIHYpKVxuICAgIGspKVxuXG4oZGVmbiBeYm9vbGVhbiBqcy12YWw/IFt4XVxuICAobm90IChpZGVudGljYWw/IFwib2JqZWN0XCIgKGdvb2cvdHlwZU9mIHgpKSkpXG5cbihkZWNsYXJlIGNvbnZlcnQtcHJvcC12YWx1ZSlcblxuKGRlZm4ga3YtY29udiBbbyBrIHZdXG4gIChkb3RvIG9cbiAgICAoZ29iai9zZXQgKGNhY2hlZC1wcm9wLW5hbWUgaykgKGNvbnZlcnQtcHJvcC12YWx1ZSB2KSkpKVxuXG4oZGVmbiBjb252ZXJ0LXByb3AtdmFsdWUgW3hdXG4gIChjb25kIChqcy12YWw/IHgpIHhcbiAgICAgICAgKG5hbWVkPyB4KSAobmFtZSB4KVxuICAgICAgICAobWFwPyB4KSAocmVkdWNlLWt2IGt2LWNvbnYgI2pze30geClcbiAgICAgICAgKGNvbGw/IHgpIChjbGotPmpzIHgpXG4gICAgICAgIChpZm4/IHgpIChmbiBbJiBhcmdzXVxuICAgICAgICAgICAgICAgICAgIChhcHBseSB4IGFyZ3MpKVxuICAgICAgICA6ZWxzZSAoY2xqLT5qcyB4KSkpXG5cbjs7IFByZXZpb3VzIGZldyBmdW5jdGlvbnMgY29waWVkIGZvciBjdXN0b20gZWxlbWVudHMsXG47OyB3aXRob3V0IG1hcHBpbmcgZnJvbSBjbGFzcyB0byBjbGFzc05hbWUgZXRjLlxuXG4oZGVmIGN1c3RvbS1wcm9wLW5hbWUtY2FjaGUgI2pze30pXG5cbihkZWZuIGNhY2hlZC1jdXN0b20tcHJvcC1uYW1lIFtrXVxuICAoaWYgKG5hbWVkPyBrKVxuICAgIChpZi1zb21lIFtrJyAoY2FjaGUtZ2V0IGN1c3RvbS1wcm9wLW5hbWUtY2FjaGUgKG5hbWUgaykpXVxuICAgICAgaydcbiAgICAgIChsZXQgW3YgKHV0aWwvZGFzaC10by1wcm9wLW5hbWUgayldXG4gICAgICAgIChnb2JqL3NldCBjdXN0b20tcHJvcC1uYW1lLWNhY2hlIChuYW1lIGspIHYpXG4gICAgICAgIHYpKVxuICAgIGspKVxuXG4oZGVmbiBjdXN0b20ta3YtY29udiBbbyBrIHZdXG4gIChkb3RvIG9cbiAgICAoZ29iai9zZXQgKGNhY2hlZC1jdXN0b20tcHJvcC1uYW1lIGspIChjb252ZXJ0LXByb3AtdmFsdWUgdikpKSlcblxuKGRlZm4gY29udmVydC1jdXN0b20tcHJvcC12YWx1ZSBbeF1cbiAgKGNvbmQgKGpzLXZhbD8geCkgeFxuICAgICAgICAobmFtZWQ/IHgpIChuYW1lIHgpXG4gICAgICAgIChtYXA/IHgpIChyZWR1Y2Uta3YgY3VzdG9tLWt2LWNvbnYgI2pze30geClcbiAgICAgICAgKGNvbGw/IHgpIChjbGotPmpzIHgpXG4gICAgICAgIChpZm4/IHgpIChmbiBbJiBhcmdzXVxuICAgICAgICAgICAgICAgICAgIChhcHBseSB4IGFyZ3MpKVxuICAgICAgICA6ZWxzZSAoY2xqLT5qcyB4KSkpXG5cbihkZWZuIHNldC1pZC1jbGFzc1xuICBcIlRha2VzIHRoZSBpZCBhbmQgY2xhc3MgZnJvbSB0YWcga2V5d29yZCwgYW5kIGFkZHMgdGhlbSB0byB0aGVcbiAgb3RoZXIgcHJvcHMuIFBhcnNlZCB0YWcgaXMgSlMgb2JqZWN0IHdpdGggOmlkIGFuZCA6Y2xhc3MgcHJvcGVydGllcy5cIlxuICBbcHJvcHMgaWQtY2xhc3NdXG4gIChsZXQgW2lkICguLWlkIGlkLWNsYXNzKVxuICAgICAgICBjbGFzcyAoLi1jbGFzc05hbWUgaWQtY2xhc3MpXVxuICAgIChjb25kLT4gcHJvcHNcbiAgICAgIDs7IE9ubHkgdXNlIElEIGZyb20gdGFnIGtleXdvcmQgaWYgbm8gOmlkIGluIHByb3BzIGFscmVhZHlcbiAgICAgIChhbmQgKHNvbWU/IGlkKVxuICAgICAgICAgICAobmlsPyAoOmlkIHByb3BzKSkpXG4gICAgICAoYXNzb2MgOmlkIGlkKVxuXG4gICAgICA7OyBNZXJnZSBjbGFzc2VzXG4gICAgICBjbGFzc1xuICAgICAgKGFzc29jIDpjbGFzcyAodXRpbC9jbGFzcy1uYW1lcyBjbGFzcyAoOmNsYXNzIHByb3BzKSkpKSkpXG5cbihkZWZuIGNvbnZlcnQtcHJvcHMgW3Byb3BzIF5jbGogaWQtY2xhc3NdXG4gIChsZXQgW2NsYXNzICg6Y2xhc3MgcHJvcHMpXG4gICAgICAgIHByb3BzICgtPiBwcm9wc1xuICAgICAgICAgICAgICAgICAgKGNvbmQtPiBjbGFzcyAoYXNzb2MgOmNsYXNzICh1dGlsL2NsYXNzLW5hbWVzIGNsYXNzKSkpXG4gICAgICAgICAgICAgICAgICAoc2V0LWlkLWNsYXNzIGlkLWNsYXNzKSldXG4gICAgKGlmICguLWN1c3RvbSBpZC1jbGFzcylcbiAgICAgIChjb252ZXJ0LWN1c3RvbS1wcm9wLXZhbHVlIHByb3BzKVxuICAgICAgKGNvbnZlcnQtcHJvcC12YWx1ZSBwcm9wcykpKSlcblxuOzs7IFNwZWNpYWxpemF0aW9uIGZvciBpbnB1dCBjb21wb25lbnRzXG5cbjs7IFRoaXMgZ2V0cyBzZXQgZnJvbSByZWFnZW50LmRvbVxuKGRlZm9uY2UgZmluZC1kb20tbm9kZSBuaWwpXG5cbjs7IDxpbnB1dCB0eXBlPVwiPz9cIiA+XG47OyBUaGUgcHJvcGVyaXRlcyAnc2VsZWN0aW9uU3RhcnQnIGFuZCAnc2VsZWN0aW9uRW5kJyBvbmx5IGV4aXN0IG9uIHNvbWUgaW5wdXRzXG47OyBTZWU6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjZG8tbm90LWFwcGx5XG4oZGVmIHRoZXNlLWlucHV0cy1oYXZlLXNlbGVjdGlvbi1hcGkgI3tcInRleHRcIiBcInRleHRhcmVhXCIgXCJwYXNzd29yZFwiIFwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVsXCIgXCJ1cmxcIn0pXG5cbihkZWZuIF5ib29sZWFuIGhhcy1zZWxlY3Rpb24tYXBpP1xuICBbaW5wdXQtdHlwZV1cbiAgKGNvbnRhaW5zPyB0aGVzZS1pbnB1dHMtaGF2ZS1zZWxlY3Rpb24tYXBpIGlucHV0LXR5cGUpKVxuXG4oZGVjbGFyZSBpbnB1dC1jb21wb25lbnQtc2V0LXZhbHVlKVxuXG4oZGVmbiBpbnB1dC1ub2RlLXNldC12YWx1ZVxuICBbbm9kZSByZW5kZXJlZC12YWx1ZSBkb20tdmFsdWUgXmNsaiBjb21wb25lbnQgezprZXlzIFtvbi13cml0ZV19XVxuICAoaWYtbm90IChhbmQgKGlkZW50aWNhbD8gbm9kZSAoLi1hY3RpdmVFbGVtZW50IGpzL2RvY3VtZW50KSlcbiAgICAgICAgICAgIChoYXMtc2VsZWN0aW9uLWFwaT8gKC4tdHlwZSBub2RlKSlcbiAgICAgICAgICAgIChzdHJpbmc/IHJlbmRlcmVkLXZhbHVlKVxuICAgICAgICAgICAgKHN0cmluZz8gZG9tLXZhbHVlKSlcbiAgICA7OyBqdXN0IHNldCB0aGUgdmFsdWUsIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgYSBjdXJzb3JcbiAgICAoZG9cbiAgICAgIChzZXQhICguLWNsanNET01WYWx1ZSBjb21wb25lbnQpIHJlbmRlcmVkLXZhbHVlKVxuICAgICAgKHNldCEgKC4tdmFsdWUgbm9kZSkgcmVuZGVyZWQtdmFsdWUpXG4gICAgICAod2hlbiAoZm4/IG9uLXdyaXRlKVxuICAgICAgICAob24td3JpdGUgcmVuZGVyZWQtdmFsdWUpKSlcblxuICAgIDs7IFNldHRpbmcgXCJ2YWx1ZVwiIChiZWxvdykgbW92ZXMgdGhlIGN1cnNvciBwb3NpdGlvbiB0byB0aGVcbiAgICA7OyBlbmQgd2hpY2ggZ2l2ZXMgdGhlIHVzZXIgYSBqYXJyaW5nIGV4cGVyaWVuY2UuXG4gICAgOztcbiAgICA7OyBCdXQgcmVwb3NpdGlvbmluZyB0aGUgY3Vyc29yIHdpdGhpbiB0aGUgdGV4dCwgdHVybnMgb3V0IHRvXG4gICAgOzsgYmUgcXVpdGUgYSBjaGFsbGVuZ2UgYmVjYXVzZSBjaGFuZ2VzIGluIHRoZSB0ZXh0IGNhbiBiZVxuICAgIDs7IHRyaWdnZXJlZCBieSB2YXJpb3VzIGV2ZW50cyBsaWtlOlxuICAgIDs7IC0gYSB2YWxpZGF0aW9uIGZ1bmN0aW9uIHJlamVjdGluZyBhIHVzZXIgaW5wdXR0ZWQgY2hhclxuICAgIDs7IC0gdGhlIHVzZXIgZW50ZXJzIGEgbG93ZXIgY2FzZSBjaGFyLCBidXQgaXMgdHJhbnNmb3JtZWQgdG9cbiAgICA7OyAgIHVwcGVyLlxuICAgIDs7IC0gdGhlIHVzZXIgc2VsZWN0cyBtdWx0aXBsZSBjaGFycyBhbmQgZGVsZXRlcyB0ZXh0XG4gICAgOzsgLSB0aGUgdXNlciBwYXN0ZXMgaW4gbXVsdGlwbGUgY2hhcnMsIGFuZCBzb21lIG9mIHRoZW0gYXJlXG4gICAgOzsgICByZWplY3RlZCBieSBhIHZhbGlkYXRvci5cbiAgICA7OyAtIHRoZSB1c2VyIHNlbGVjdHMgbXVsdGlwbGUgY2hhcnMgYW5kIHRoZW4gdHlwZXMgaW4gYVxuICAgIDs7ICAgc2luZ2xlIG5ldyBjaGFyIHRvIHJlcGFsY2UgdGhlbSBhbGwuXG4gICAgOzsgQ29taW5nIHVwIHdpdGggYSBzYW5lIGN1cnNvciByZXBvc2l0aW9uaW5nIHN0cmF0ZWd5IGhhc24ndFxuICAgIDs7IGJlZW4gZWFzeSBBTFRIT1VHSCBpbiB0aGUgZW5kLCBpdCBraW5kYSBmZWxsIG91dCBuaWNlbHksXG4gICAgOzsgYW5kIGl0IGFwcGVhcnMgdG8gc2FuZWx5IGhhbmRsZSBhbGwgdGhlIGNhc2VzIHdlIGNvdWxkXG4gICAgOzsgdGhpbmsgb2YuXG4gICAgOzsgU28gdGhpcyBpcyBqdXN0IGEgd2FybmluZy4gVGhlIGNvZGUgYmVsb3cgaXMgc2ltcGxlXG4gICAgOzsgZW5vdWdoLCBidXQgaWYgeW91IGFyZSB0ZW1wdGVkIHRvIGNoYW5nZSBpdCwgYmUgYXdhcmUgb2ZcbiAgICA7OyBhbGwgdGhlIHNjZW5hcmlvcyB5b3UgaGF2ZSBoYW5kbGUuXG4gICAgKGxldCBbbm9kZS12YWx1ZSAoLi12YWx1ZSBub2RlKV1cbiAgICAgIChpZiAobm90PSBub2RlLXZhbHVlIGRvbS12YWx1ZSlcbiAgICAgICAgOzsgSUUgaGFzIG5vdCBub3RpZmllZCB1cyBvZiB0aGUgY2hhbmdlIHlldCwgc28gY2hlY2sgYWdhaW4gbGF0ZXJcbiAgICAgICAgKGJhdGNoL2RvLWFmdGVyLXJlbmRlciAjKGlucHV0LWNvbXBvbmVudC1zZXQtdmFsdWUgY29tcG9uZW50KSlcbiAgICAgICAgKGxldCBbZXhpc3Rpbmctb2Zmc2V0LWZyb20tZW5kICgtIChjb3VudCBub2RlLXZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoLi1zZWxlY3Rpb25TdGFydCBub2RlKSlcbiAgICAgICAgICAgICAgbmV3LWN1cnNvci1vZmZzZXQgICAgICAgICgtIChjb3VudCByZW5kZXJlZC12YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmctb2Zmc2V0LWZyb20tZW5kKV1cbiAgICAgICAgICAoc2V0ISAoLi1jbGpzRE9NVmFsdWUgY29tcG9uZW50KSByZW5kZXJlZC12YWx1ZSlcbiAgICAgICAgICAoc2V0ISAoLi12YWx1ZSBub2RlKSByZW5kZXJlZC12YWx1ZSlcbiAgICAgICAgICAod2hlbiAoZm4/IG9uLXdyaXRlKVxuICAgICAgICAgICAgKG9uLXdyaXRlIHJlbmRlcmVkLXZhbHVlKSlcbiAgICAgICAgICAoc2V0ISAoLi1zZWxlY3Rpb25TdGFydCBub2RlKSBuZXctY3Vyc29yLW9mZnNldClcbiAgICAgICAgICAoc2V0ISAoLi1zZWxlY3Rpb25FbmQgbm9kZSkgbmV3LWN1cnNvci1vZmZzZXQpKSkpKSlcblxuKGRlZm4gaW5wdXQtY29tcG9uZW50LXNldC12YWx1ZSBbXmNsaiB0aGlzXVxuICAod2hlbiAoLi1jbGpzSW5wdXRMaXZlIHRoaXMpXG4gICAgKHNldCEgKC4tY2xqc0lucHV0RGlydHkgdGhpcykgZmFsc2UpXG4gICAgKGxldCBbcmVuZGVyZWQtdmFsdWUgKC4tY2xqc1JlbmRlcmVkVmFsdWUgdGhpcylcbiAgICAgICAgICBkb20tdmFsdWUgKC4tY2xqc0RPTVZhbHVlIHRoaXMpXG4gICAgICAgICAgOzsgRGVmYXVsdCB0byB0aGUgcm9vdCBub2RlIHdpdGhpbiB0aGlzIGNvbXBvbmVudFxuICAgICAgICAgIG5vZGUgKGZpbmQtZG9tLW5vZGUgdGhpcyldXG4gICAgICAod2hlbiAobm90PSByZW5kZXJlZC12YWx1ZSBkb20tdmFsdWUpXG4gICAgICAgIChpbnB1dC1ub2RlLXNldC12YWx1ZSBub2RlIHJlbmRlcmVkLXZhbHVlIGRvbS12YWx1ZSB0aGlzIHt9KSkpKSlcblxuKGRlZm4gaW5wdXQtaGFuZGxlLWNoYW5nZSBbXmNsaiB0aGlzIG9uLWNoYW5nZSBlXVxuICAoc2V0ISAoLi1jbGpzRE9NVmFsdWUgdGhpcykgKC0+IGUgLi10YXJnZXQgLi12YWx1ZSkpXG4gIDs7IE1ha2Ugc3VyZSB0aGUgaW5wdXQgaXMgcmUtcmVuZGVyZWQsIGluIGNhc2Ugb24tY2hhbmdlXG4gIDs7IHdhbnRzIHRvIGtlZXAgdGhlIHZhbHVlIHVuY2hhbmdlZFxuICAod2hlbi1ub3QgKC4tY2xqc0lucHV0RGlydHkgdGhpcylcbiAgICAoc2V0ISAoLi1jbGpzSW5wdXREaXJ0eSB0aGlzKSB0cnVlKVxuICAgIChiYXRjaC9kby1hZnRlci1yZW5kZXIgIyhpbnB1dC1jb21wb25lbnQtc2V0LXZhbHVlIHRoaXMpKSlcbiAgKG9uLWNoYW5nZSBlKSlcblxuKGRlZm4gaW5wdXQtcmVuZGVyLXNldHVwXG4gIFteY2xqIHRoaXMgXmpzIGpzcHJvcHNdXG4gIDs7IERvbid0IHJlbHkgb24gUmVhY3QgZm9yIHVwZGF0aW5nIFwiY29udHJvbGxlZCBpbnB1dHNcIiwgc2luY2UgaXRcbiAgOzsgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBhc3luYyByZW5kZXJpbmcgKG1pc3NlcyBrZXlzdHJva2VzKS5cbiAgKHdoZW4gKGFuZCAoc29tZT8ganNwcm9wcylcbiAgICAgICAgICAgICAoLmhhc093blByb3BlcnR5IGpzcHJvcHMgXCJvbkNoYW5nZVwiKVxuICAgICAgICAgICAgICguaGFzT3duUHJvcGVydHkganNwcm9wcyBcInZhbHVlXCIpKVxuICAgIChhc3NlcnQgZmluZC1kb20tbm9kZVxuICAgICAgICAgICAgXCJyZWFnZW50LmRvbSBuZWVkcyB0byBiZSBsb2FkZWQgZm9yIGNvbnRyb2xsZWQgaW5wdXQgdG8gd29ya1wiKVxuICAgIChsZXQgW3YgKC4tdmFsdWUganNwcm9wcylcbiAgICAgICAgICB2YWx1ZSAoaWYgKG5pbD8gdikgXCJcIiB2KVxuICAgICAgICAgIG9uLWNoYW5nZSAoLi1vbkNoYW5nZSBqc3Byb3BzKV1cbiAgICAgICh3aGVuLW5vdCAoLi1jbGpzSW5wdXRMaXZlIHRoaXMpXG4gICAgICAgIDs7IHNldCBpbml0aWFsIHZhbHVlXG4gICAgICAgIChzZXQhICguLWNsanNJbnB1dExpdmUgdGhpcykgdHJ1ZSlcbiAgICAgICAgKHNldCEgKC4tY2xqc0RPTVZhbHVlIHRoaXMpIHZhbHVlKSlcbiAgICAgIChzZXQhICguLWNsanNSZW5kZXJlZFZhbHVlIHRoaXMpIHZhbHVlKVxuICAgICAgKGpzLWRlbGV0ZSBqc3Byb3BzIFwidmFsdWVcIilcbiAgICAgIChzZXQhICguLWRlZmF1bHRWYWx1ZSBqc3Byb3BzKSB2YWx1ZSlcbiAgICAgIChzZXQhICguLW9uQ2hhbmdlIGpzcHJvcHMpICMoaW5wdXQtaGFuZGxlLWNoYW5nZSB0aGlzIG9uLWNoYW5nZSAlKSkpKSlcblxuKGRlZm4gaW5wdXQtdW5tb3VudCBbXmNsaiB0aGlzXVxuICAoc2V0ISAoLi1jbGpzSW5wdXRMaXZlIHRoaXMpIG5pbCkpXG5cbihkZWZuIF5ib29sZWFuIGlucHV0LWNvbXBvbmVudD8gW3hdXG4gIChjYXNlIHhcbiAgICAoXCJpbnB1dFwiIFwidGV4dGFyZWFcIikgdHJ1ZVxuICAgIGZhbHNlKSlcblxuKGRlZiByZWFnZW50LWlucHV0LWNsYXNzIG5pbClcblxuKGRlY2xhcmUgbWFrZS1lbGVtZW50KVxuXG4oZGVmIGlucHV0LXNwZWNcbiAgezpkaXNwbGF5LW5hbWUgXCJSZWFnZW50SW5wdXRcIlxuICAgOmNvbXBvbmVudC1kaWQtdXBkYXRlIGlucHV0LWNvbXBvbmVudC1zZXQtdmFsdWVcbiAgIDpjb21wb25lbnQtd2lsbC11bm1vdW50IGlucHV0LXVubW91bnRcbiAgIDpyZWFnZW50LXJlbmRlclxuICAgKGZuIFthcmd2IGNvbXBvbmVudCBqc3Byb3BzIGZpcnN0LWNoaWxkXVxuICAgICAobGV0IFt0aGlzIGNvbXAvKmN1cnJlbnQtY29tcG9uZW50Kl1cbiAgICAgICAoaW5wdXQtcmVuZGVyLXNldHVwIHRoaXMganNwcm9wcylcbiAgICAgICAobWFrZS1lbGVtZW50IGFyZ3YgY29tcG9uZW50IGpzcHJvcHMgZmlyc3QtY2hpbGQpKSl9KVxuXG4oZGVmbiByZWFnZW50LWlucHV0XG4gIFtdXG4gICh3aGVuIChuaWw/IHJlYWdlbnQtaW5wdXQtY2xhc3MpXG4gICAgKHNldCEgcmVhZ2VudC1pbnB1dC1jbGFzcyAoY29tcC9jcmVhdGUtY2xhc3MgaW5wdXQtc3BlYykpKVxuICByZWFnZW50LWlucHV0LWNsYXNzKVxuXG5cbjs7OyBDb252ZXJzaW9uIGZyb20gSGljY3VwIGZvcm1zXG5cbihkZWZ0eXBlIEhpY2N1cFRhZyBbdGFnIGlkIGNsYXNzTmFtZSBjdXN0b21dKVxuXG4oZGVmbiBwYXJzZS10YWcgW2hpY2N1cC10YWddXG4gIChsZXQgW1t0YWcgaWQgY2xhc3NOYW1lXSAoLT4+IGhpY2N1cC10YWcgbmFtZSAocmUtbWF0Y2hlcyByZS10YWcpIG5leHQpXG4gICAgICAgIGNsYXNzTmFtZSAod2hlbi1ub3QgKG5pbD8gY2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgICAgICAoc3RyaW5nL3JlcGxhY2UgY2xhc3NOYW1lICNcIlxcLlwiIFwiIFwiKSldXG4gICAgKGFzc2VydCB0YWcgKHN0ciBcIkludmFsaWQgdGFnOiAnXCIgaGljY3VwLXRhZyBcIidcIiAoY29tcC9jb21wLW5hbWUpKSlcbiAgICAoLT5IaWNjdXBUYWcgdGFnXG4gICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICA7OyBDdXN0b20gZWxlbWVudCBuYW1lcyBtdXN0IGNvbnRhaW4gaHlwaGVuXG4gICAgICAgICAgICAgICAgIDs7IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jdXN0b20tZWxlbWVudHMvI2N1c3RvbS1lbGVtZW50cy1jb3JlLWNvbmNlcHRzXG4gICAgICAgICAgICAgICAgIChub3Q9IC0xICguaW5kZXhPZiB0YWcgXCItXCIpKSkpKVxuXG4oZGVmbiB0cnktZ2V0LWtleSBbeF1cbiAgOzsgdHJ5IGNhdGNoIHRvIGF2b2lkIGNsb2p1cmVzY3JpcHQgcGVjdWxpYXJpdHkgd2l0aFxuICA7OyBzb3J0ZWQtbWFwcyB3aXRoIGtleXMgdGhhdCBhcmUgbnVtYmVyc1xuICAodHJ5IChnZXQgeCA6a2V5KVxuICAgICAgIChjYXRjaCA6ZGVmYXVsdCBlKSkpXG5cbihkZWZuIGdldC1rZXkgW3hdXG4gICh3aGVuIChtYXA/IHgpXG4gICAgKHRyeS1nZXQta2V5IHgpKSlcblxuKGRlZm4ga2V5LWZyb20tdmVjIFt2XVxuICAoaWYtc29tZSBbayAoLT4gKG1ldGEgdikgZ2V0LWtleSldXG4gICAga1xuICAgICgtPiB2IChudGggMSBuaWwpIGdldC1rZXkpKSlcblxuKGRlZm4gcmVhZy1lbGVtZW50IFt0YWcgdl1cbiAgKGxldCBbYyAoY29tcC9hcy1jbGFzcyB0YWcpXG4gICAgICAgIGpzcHJvcHMgI2pzIHt9XVxuICAgIChzZXQhICguLWFyZ3YganNwcm9wcykgdilcbiAgICAod2hlbi1zb21lIFtrZXkgKGtleS1mcm9tLXZlYyB2KV1cbiAgICAgIChzZXQhICguLWtleSBqc3Byb3BzKSBrZXkpKVxuICAgIChyZWFjdC9jcmVhdGVFbGVtZW50IGMganNwcm9wcykpKVxuXG4oZGVmbiBmcmFnbWVudC1lbGVtZW50IFthcmd2XVxuICAobGV0IFtwcm9wcyAobnRoIGFyZ3YgMSBuaWwpXG4gICAgICAgIGhhc3Byb3BzIChvciAobmlsPyBwcm9wcykgKG1hcD8gcHJvcHMpKVxuICAgICAgICBqc3Byb3BzIChvciAoY29udmVydC1wcm9wLXZhbHVlIChpZiBoYXNwcm9wcyBwcm9wcykpXG4gICAgICAgICAgICAgICAgICAgICNqcyB7fSlcbiAgICAgICAgZmlyc3QtY2hpbGQgKCsgMSAoaWYgaGFzcHJvcHMgMSAwKSldXG4gICAgKHdoZW4tc29tZSBba2V5IChrZXktZnJvbS12ZWMgYXJndildXG4gICAgICAoc2V0ISAoLi1rZXkganNwcm9wcykga2V5KSlcbiAgICAobWFrZS1lbGVtZW50IGFyZ3YgcmVhY3QvRnJhZ21lbnQganNwcm9wcyBmaXJzdC1jaGlsZCkpKVxuXG4oZGVmbiBhZGFwdC1yZWFjdC1jbGFzc1xuICBbY11cbiAgKC0+TmF0aXZlV3JhcHBlciBjIG5pbCBuaWwpKVxuXG4oZGVmIHRhZy1uYW1lLWNhY2hlICNqc3t9KVxuXG4oZGVmbiBjYWNoZWQtcGFyc2UgW3hdXG4gIChpZi1zb21lIFtzIChjYWNoZS1nZXQgdGFnLW5hbWUtY2FjaGUgeCldXG4gICAgc1xuICAgIChsZXQgW3YgKHBhcnNlLXRhZyB4KV1cbiAgICAgIChnb2JqL3NldCB0YWctbmFtZS1jYWNoZSB4IHYpXG4gICAgICB2KSkpXG5cbihkZWZuIG5hdGl2ZS1lbGVtZW50IFtwYXJzZWQgYXJndiBmaXJzdF1cbiAgKGxldCBbY29tcG9uZW50ICguLXRhZyBwYXJzZWQpXG4gICAgICAgIHByb3BzIChudGggYXJndiBmaXJzdCBuaWwpXG4gICAgICAgIGhhc3Byb3BzIChvciAobmlsPyBwcm9wcykgKG1hcD8gcHJvcHMpKVxuICAgICAgICBqc3Byb3BzIChvciAoY29udmVydC1wcm9wcyAoaWYgaGFzcHJvcHMgcHJvcHMpIHBhcnNlZClcbiAgICAgICAgICAgICAgICAgICAgI2pzIHt9KVxuICAgICAgICBmaXJzdC1jaGlsZCAoKyBmaXJzdCAoaWYgaGFzcHJvcHMgMSAwKSldXG4gICAgKGlmIChpbnB1dC1jb21wb25lbnQ/IGNvbXBvbmVudClcbiAgICAgICgtPiBbKHJlYWdlbnQtaW5wdXQpIGFyZ3YgY29tcG9uZW50IGpzcHJvcHMgZmlyc3QtY2hpbGRdXG4gICAgICAgICAgKHdpdGgtbWV0YSAobWV0YSBhcmd2KSlcbiAgICAgICAgICBhcy1lbGVtZW50KVxuICAgICAgKGRvXG4gICAgICAgICh3aGVuLXNvbWUgW2tleSAoLT4gKG1ldGEgYXJndikgZ2V0LWtleSldXG4gICAgICAgICAgKHNldCEgKC4ta2V5IGpzcHJvcHMpIGtleSkpXG4gICAgICAgIChtYWtlLWVsZW1lbnQgYXJndiBjb21wb25lbnQganNwcm9wcyBmaXJzdC1jaGlsZCkpKSkpXG5cbihkZWZuIHN0ci1jb2xsIFtjb2xsXVxuICAoaWYgKGRldj8pXG4gICAgKHN0ciAocHJld2FsayAoZm4gW3hdXG4gICAgICAgICAgICAgICAgICAgIChpZiAoZm4/IHgpXG4gICAgICAgICAgICAgICAgICAgICAgKGxldCBbbiAodXRpbC9mdW4tbmFtZSB4KV1cbiAgICAgICAgICAgICAgICAgICAgICAgIChjYXNlIG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFwiXCIgbmlsKSB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgIChzeW1ib2wgbikpKVxuICAgICAgICAgICAgICAgICAgICAgIHgpKSBjb2xsKSlcbiAgICAoc3RyIGNvbGwpKSlcblxuKGRlZm4gaGljY3VwLWVyciBbdiAmIG1zZ11cbiAgKHN0ciAoYXBwbHkgc3RyIG1zZykgXCI6IFwiIChzdHItY29sbCB2KSBcIlxcblwiIChjb21wL2NvbXAtbmFtZSkpKVxuXG4oZGVmbiB2ZWMtdG8tZWxlbSBbdl1cbiAgKGFzc2VydCAocG9zPyAoY291bnQgdikpIChoaWNjdXAtZXJyIHYgXCJIaWNjdXAgZm9ybSBzaG91bGQgbm90IGJlIGVtcHR5XCIpKVxuICAobGV0IFt0YWcgKG50aCB2IDAgbmlsKV1cbiAgICAoYXNzZXJ0ICh2YWxpZC10YWc/IHRhZykgKGhpY2N1cC1lcnIgdiBcIkludmFsaWQgSGljY3VwIGZvcm1cIikpXG4gICAgKGNvbmRcbiAgICAgIChrZXl3b3JkLWlkZW50aWNhbD8gOjw+IHRhZylcbiAgICAgIChmcmFnbWVudC1lbGVtZW50IHYpXG5cbiAgICAgIChoaWNjdXAtdGFnPyB0YWcpXG4gICAgICAobGV0IFtuIChuYW1lIHRhZylcbiAgICAgICAgICAgIHBvcyAoLmluZGV4T2YgbiBcIj5cIildXG4gICAgICAgIChjYXNlIHBvc1xuICAgICAgICAgIC0xIChuYXRpdmUtZWxlbWVudCAoY2FjaGVkLXBhcnNlIG4pIHYgMSlcbiAgICAgICAgICAwIChsZXQgW2NvbXBvbmVudCAobnRoIHYgMSBuaWwpXVxuICAgICAgICAgICAgICA7OyBTdXBwb3J0IFs6PiBjb21wb25lbnQgLi4uXVxuICAgICAgICAgICAgICAoYXNzZXJ0ICg9IFwiPlwiIG4pIChoaWNjdXAtZXJyIHYgXCJJbnZhbGlkIEhpY2N1cCB0YWdcIikpXG4gICAgICAgICAgICAgIChuYXRpdmUtZWxlbWVudCAoLT5IaWNjdXBUYWcgY29tcG9uZW50IG5pbCBuaWwgbmlsKSB2IDIpKVxuICAgICAgICAgIDs7IFN1cHBvcnQgZXh0ZW5kZWQgaGljY3VwIHN5bnRheCwgaS5lIDpkaXYuYmFyPmEuZm9vXG4gICAgICAgICAgOzsgQXBwbHkgbWV0YWRhdGEgKGUuZy4gOmtleSkgdG8gdGhlIG91dGVybW9zdCBlbGVtZW50LlxuICAgICAgICAgIDs7IE1ldGFkYXRhIGlzIHByb2JhYmx5IHVzZWQgb25seSB3aXRoIHNlcXVlbmVjZXMsIGFuZCBpbiB0aGF0IGNhc2VcbiAgICAgICAgICA7OyBvbmx5IHRoZSBrZXkgb2YgdGhlIG91dGVybW9zdCBlbGVtZW50IG1hdHRlcnMuXG4gICAgICAgICAgKHJlY3VyICh3aXRoLW1ldGEgWyhzdWJzIG4gMCBwb3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NvYyAod2l0aC1tZXRhIHYgbmlsKSAwIChzdWJzIG4gKGluYyBwb3MpKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1ldGEgdikpKSkpXG5cbiAgICAgIChpbnN0YW5jZT8gTmF0aXZlV3JhcHBlciB0YWcpXG4gICAgICAobmF0aXZlLWVsZW1lbnQgdGFnIHYgMSlcblxuICAgICAgOmVsc2UgKHJlYWctZWxlbWVudCB0YWcgdikpKSlcblxuKGRlY2xhcmUgZXhwYW5kLXNlcSlcbihkZWNsYXJlIGV4cGFuZC1zZXEtY2hlY2spXG5cbihkZWZuIGFzLWVsZW1lbnQgW3hdXG4gIChjb25kIChqcy12YWw/IHgpIHhcbiAgICAgICAgKHZlY3Rvcj8geCkgKHZlYy10by1lbGVtIHgpXG4gICAgICAgIChzZXE/IHgpIChpZiAoZGV2PylcbiAgICAgICAgICAgICAgICAgICAoZXhwYW5kLXNlcS1jaGVjayB4KVxuICAgICAgICAgICAgICAgICAgIChleHBhbmQtc2VxIHgpKVxuICAgICAgICAobmFtZWQ/IHgpIChuYW1lIHgpXG4gICAgICAgIChzYXRpc2ZpZXM/IElQcmludFdpdGhXcml0ZXIgeCkgKHByLXN0ciB4KVxuICAgICAgICA6ZWxzZSB4KSlcblxuKHNldCEgY29tcC9hcy1lbGVtZW50IGFzLWVsZW1lbnQpXG5cbihkZWZuIGV4cGFuZC1zZXEgW3NdXG4gIChpbnRvLWFycmF5IChtYXAgYXMtZWxlbWVudCBzKSkpXG5cbihkZWZuIGV4cGFuZC1zZXEtZGV2IFtzIF5jbGogb11cbiAgKGludG8tYXJyYXkgKG1hcCAoZm4gW3ZhbF1cbiAgICAgICAgICAgICAgICAgICAgICh3aGVuIChhbmQgKHZlY3Rvcj8gdmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmlsPyAoa2V5LWZyb20tdmVjIHZhbCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAoc2V0ISAoLi1uby1rZXkgbykgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAoYXMtZWxlbWVudCB2YWwpKVxuICAgICAgICAgICAgICAgICAgIHMpKSlcblxuKGRlZm4gZXhwYW5kLXNlcS1jaGVjayBbeF1cbiAgKGxldCBbY3R4ICNqc3t9XG4gICAgICAgIFtyZXMgZGVyZWZlZF0gKHJhdG9tL2NoZWNrLWRlcmVmcyAjKGV4cGFuZC1zZXEtZGV2IHggY3R4KSldXG4gICAgKHdoZW4gZGVyZWZlZFxuICAgICAgKHdhcm4gKGhpY2N1cC1lcnIgeCBcIlJlYWN0aXZlIGRlcmVmIG5vdCBzdXBwb3J0ZWQgaW4gbGF6eSBzZXEsIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBcIml0IHNob3VsZCBiZSB3cmFwcGVkIGluIGRvYWxsXCIpKSlcbiAgICAod2hlbiAoLi1uby1rZXkgY3R4KVxuICAgICAgKHdhcm4gKGhpY2N1cC1lcnIgeCBcIkV2ZXJ5IGVsZW1lbnQgaW4gYSBzZXEgc2hvdWxkIGhhdmUgYSB1bmlxdWUgOmtleVwiKSkpXG4gICAgcmVzKSlcblxuKGRlZm4gbWFrZS1lbGVtZW50IFthcmd2IGNvbXBvbmVudCBqc3Byb3BzIGZpcnN0LWNoaWxkXVxuICAoY2FzZSAoLSAoY291bnQgYXJndikgZmlyc3QtY2hpbGQpXG4gICAgOzsgT3B0aW1pemUgY2FzZXMgb2YgemVybyBvciBvbmUgY2hpbGRcbiAgICAwIChyZWFjdC9jcmVhdGVFbGVtZW50IGNvbXBvbmVudCBqc3Byb3BzKVxuXG4gICAgMSAocmVhY3QvY3JlYXRlRWxlbWVudCBjb21wb25lbnQganNwcm9wc1xuICAgICAgICAgIChhcy1lbGVtZW50IChudGggYXJndiBmaXJzdC1jaGlsZCBuaWwpKSlcblxuICAgICguYXBwbHkgcmVhY3QvY3JlYXRlRWxlbWVudCBuaWxcbiAgICAgICAgICAgIChyZWR1Y2Uta3YgKGZuIFthIGsgdl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAod2hlbiAoPj0gayBmaXJzdC1jaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICgucHVzaCBhIChhcy1lbGVtZW50IHYpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICBhKVxuICAgICAgICAgICAgICAgICAgICAgICAjanNbY29tcG9uZW50IGpzcHJvcHNdIGFyZ3YpKSkpXG4iXX0=