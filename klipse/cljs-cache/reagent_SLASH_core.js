// Compiled by ClojureScript 1.10.597
goog.provide("reagent.core");
reagent.core.global$module$react = goog.global["React"];
reagent.core.is_client = reagent.impl.util.is_client;
/**
 * Create a native React element, by calling React.createElement directly.
 * 
 *   That means the second argument must be a javascript object (or nil), and
 *   that any Reagent hiccup forms must be processed with as-element. For example
 *   like this:
 * 
 *   ```cljs
 *   (r/create-element "div" #js{:className "foo"}
 *  "Hi " (r/as-element [:strong "world!"])
 *   ```
 * 
 *   which is equivalent to
 * 
 *   ```cljs
 *   [:div.foo "Hi" [:strong "world!"]]
 *   ```
 */
reagent.core.create_element = (function reagent$core$create_element(var_args){
var G__570 = arguments.length;
switch (G__570) {
case (1):
return reagent.core.create_element.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.core.create_element.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return reagent.core.create_element.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___572 = arguments.length;
var i__12446__auto___573 = (0);
while(true){
if((i__12446__auto___573 < len__12445__auto___572)){
args_arr__12515__auto__.push((arguments[i__12446__auto___573]));

var G__574 = (i__12446__auto___573 + (1));
i__12446__auto___573 = G__574;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((3)),(0),null));
return reagent.core.create_element.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__12516__auto__);

}
});

(reagent.core.create_element.cljs$core$IFn$_invoke$arity$1 = (function (type){
return reagent.core.create_element.call(null,type,null);
}));

(reagent.core.create_element.cljs$core$IFn$_invoke$arity$2 = (function (type,props){
if((!(cljs.core.map_QMARK_.call(null,props)))){
} else {
throw (new Error(["Assert failed: ",["Expected a JS object, not ",cljs.core.pr_str.call(null,props)].join(''),"\n","(cljs.core/not (cljs.core/map? props))"].join('')));
}

return reagent.core.global$module$react.createElement(type,props);
}));

(reagent.core.create_element.cljs$core$IFn$_invoke$arity$3 = (function (type,props,child){
if((!(cljs.core.map_QMARK_.call(null,props)))){
} else {
throw (new Error(["Assert failed: ",["Expected a JS object, not ",cljs.core.pr_str.call(null,props)].join(''),"\n","(cljs.core/not (cljs.core/map? props))"].join('')));
}

return reagent.core.global$module$react.createElement(type,props,child);
}));

(reagent.core.create_element.cljs$core$IFn$_invoke$arity$variadic = (function (type,props,child,children){
if((!(cljs.core.map_QMARK_.call(null,props)))){
} else {
throw (new Error(["Assert failed: ",["Expected a JS object, not ",cljs.core.pr_str.call(null,props)].join(''),"\n","(cljs.core/not (cljs.core/map? props))"].join('')));
}

return cljs.core.apply.call(null,reagent.core.global$module$react.createElement,type,props,child,children);
}));

/** @this {Function} */
(reagent.core.create_element.cljs$lang$applyTo = (function (seq566){
var G__567 = cljs.core.first.call(null,seq566);
var seq566__$1 = cljs.core.next.call(null,seq566);
var G__568 = cljs.core.first.call(null,seq566__$1);
var seq566__$2 = cljs.core.next.call(null,seq566__$1);
var G__569 = cljs.core.first.call(null,seq566__$2);
var seq566__$3 = cljs.core.next.call(null,seq566__$2);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__567,G__568,G__569,seq566__$3);
}));

(reagent.core.create_element.cljs$lang$maxFixedArity = (3));

/**
 * Turns a vector of Hiccup syntax into a React element. Returns form
 *   unchanged if it is not a vector.
 */
reagent.core.as_element = (function reagent$core$as_element(form){
return reagent.impl.template.as_element.call(null,form);
});
/**
 * Returns an adapter for a native React class, that may be used
 *   just like a Reagent component function or class in Hiccup forms.
 */
reagent.core.adapt_react_class = (function reagent$core$adapt_react_class(c){
if(cljs.core.truth_(c)){
} else {
throw (new Error(["Assert failed: ",["Component"," must not be nil"].join(''),"\n","c"].join('')));
}

return reagent.impl.template.adapt_react_class.call(null,c);
});
/**
 * Returns an adapter for a Reagent component, that may be used from
 *   React, for example in JSX. A single argument, props, is passed to
 *   the component, converted to a map.
 */
reagent.core.reactify_component = (function reagent$core$reactify_component(c){
if(cljs.core.truth_(c)){
} else {
throw (new Error(["Assert failed: ",["Component"," must not be nil"].join(''),"\n","c"].join('')));
}

return reagent.impl.component.reactify_component.call(null,c);
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
reagent.core.render = (function reagent$core$render(var_args){
var G__576 = arguments.length;
switch (G__576) {
case (2):
return reagent.core.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case (3):
return reagent.core.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.core.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.call(null,comp,container);
}));

(reagent.core.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback){
return reagent.dom.render.call(null,comp,container,callback);
}));

(reagent.core.render.cljs$lang$maxFixedArity = (3));

/**
 * Remove a component from the given DOM node.
 */
reagent.core.unmount_component_at_node = (function reagent$core$unmount_component_at_node(container){
return reagent.dom.unmount_component_at_node.call(null,container);
});
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
reagent.core.force_update_all = (function reagent$core$force_update_all(){
reagent.ratom.flush_BANG_.call(null);

reagent.dom.force_update_all.call(null);

return reagent.impl.batching.flush_after_render.call(null);
});
/**
 * Creates JS class based on provided Clojure map, for example:
 * 
 *   ```cljs
 *   {;; Constructor
 * :constructor (fn [this props])
 * :get-initial-state (fn [this])
 * ;; Static methods
 * :get-derived-state-from-props (fn [props state] partial-state)
 * :get-derived-state-from-error (fn [error] partial-state)
 * ;; Methods
 * :get-snapshot-before-update (fn [this old-argv new-argv] snapshot)
 * :should-component-update (fn [this old-argv new-argv])
 * :component-did-mount (fn [this])
 * :component-did-update (fn [this old-argv old-state snapshot])
 * :component-will-unmount (fn [this])
 * :component-did-catch (fn [this error info])
 * :reagent-render (fn [args....])
 * ;; Or alternatively:
 * :render (fn [this])
 * ;; Deprecated methods:
 * :UNSAFE_component-will-receive-props (fn [this new-argv])
 * :UNSAFE_component-will-update (fn [this new-argv new-state])
 * :UNSAFE_component-will-mount (fn [this])}
 *   ```
 * 
 *   Everything is optional, except either :reagent-render or :render.
 * 
 *   Map keys should use `React.Component` method names (https://reactjs.org/docs/react-component.html),
 *   and can be provided in snake-case or camelCase.
 * 
 *   State can be initialized using constructor, which matches React.Component class,
 *   or using getInitialState which matches old React createClass function and is
 *   now implemented by Reagent for compatibility.
 * 
 *   State can usually be anything, e.g. Cljs object. But if using getDerivedState
 *   methods, the state has to be plain JS object as React implementation uses
 *   Object.assign to merge partial state into the current state.
 * 
 *   React built-in static methods or properties are automatically defined as statics.
 */
reagent.core.create_class = (function reagent$core$create_class(spec){
return reagent.impl.component.create_class.call(null,spec);
});
/**
 * Returns the current React component (a.k.a `this`) in a component
 *   function.
 */
reagent.core.current_component = (function reagent$core$current_component(){
return reagent.impl.component._STAR_current_component_STAR_;
});
/**
 * Returns an atom containing a components state.
 */
reagent.core.state_atom = (function reagent$core$state_atom(this$){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

return reagent.impl.component.state_atom.call(null,this$);
});
/**
 * Returns the state of a component, as set with replace-state or set-state.
 *   Equivalent to `(deref (r/state-atom this))`
 */
reagent.core.state = (function reagent$core$state(this$){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

return cljs.core.deref.call(null,reagent.core.state_atom.call(null,this$));
});
/**
 * Set state of a component.
 *   Equivalent to `(reset! (state-atom this) new-state)`
 */
reagent.core.replace_state = (function reagent$core$replace_state(this$,new_state){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

if((((new_state == null)) || (cljs.core.map_QMARK_.call(null,new_state)))){
} else {
throw (new Error(["Assert failed: ",["Expected a valid new state, not ",cljs.core.pr_str.call(null,new_state)].join(''),"\n","(cljs.core/or (cljs.core/nil? new-state) (cljs.core/map? new-state))"].join('')));
}

return cljs.core.reset_BANG_.call(null,reagent.core.state_atom.call(null,this$),new_state);
});
/**
 * Merge component state with new-state.
 *   Equivalent to `(swap! (state-atom this) merge new-state)`
 */
reagent.core.set_state = (function reagent$core$set_state(this$,new_state){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

if((((new_state == null)) || (cljs.core.map_QMARK_.call(null,new_state)))){
} else {
throw (new Error(["Assert failed: ",["Expected a valid new state, not ",cljs.core.pr_str.call(null,new_state)].join(''),"\n","(cljs.core/or (cljs.core/nil? new-state) (cljs.core/map? new-state))"].join('')));
}

return cljs.core.swap_BANG_.call(null,reagent.core.state_atom.call(null,this$),cljs.core.merge,new_state);
});
/**
 * Force a component to re-render immediately.
 * 
 *   If the second argument is true, child components will also be
 *   re-rendered, even is their arguments have not changed.
 */
reagent.core.force_update = (function reagent$core$force_update(var_args){
var G__579 = arguments.length;
switch (G__579) {
case (1):
return reagent.core.force_update.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.core.force_update.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.core.force_update.cljs$core$IFn$_invoke$arity$1 = (function (this$){
return reagent.core.force_update.call(null,this$,false);
}));

(reagent.core.force_update.cljs$core$IFn$_invoke$arity$2 = (function (this$,deep){
reagent.ratom.flush_BANG_.call(null);

reagent.impl.util.force_update.call(null,this$,deep);

return reagent.impl.batching.flush_after_render.call(null);
}));

(reagent.core.force_update.cljs$lang$maxFixedArity = (2));

/**
 * Returns the props passed to a component.
 */
reagent.core.props = (function reagent$core$props(this$){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

return reagent.impl.component.get_props.call(null,this$);
});
/**
 * Returns the children passed to a component.
 */
reagent.core.children = (function reagent$core$children(this$){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

return reagent.impl.component.get_children.call(null,this$);
});
/**
 * Returns the entire Hiccup form passed to the component.
 */
reagent.core.argv = (function reagent$core$argv(this$){
if(reagent.impl.component.reagent_component_QMARK_.call(null,this$)){
} else {
throw (new Error(["Assert failed: ",["Expected a reagent component, not ",cljs.core.pr_str.call(null,this$)].join(''),"\n","(comp/reagent-component? this)"].join('')));
}

return reagent.impl.component.get_argv.call(null,this$);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.core.dom_node = (function reagent$core$dom_node(this$){
return reagent.dom.dom_node.call(null,this$);
});
/**
 * Function which normalizes and combines class values to a string
 * 
 *   Reagent allows classes to be defined as:
 *   - Strings
 *   - Named objects (Symbols or Keywords)
 *   - Collections of previous types
 */
reagent.core.class_names = (function reagent$core$class_names(var_args){
var G__585 = arguments.length;
switch (G__585) {
case (0):
return reagent.core.class_names.cljs$core$IFn$_invoke$arity$0();

break;
case (1):
return reagent.core.class_names.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.core.class_names.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___587 = arguments.length;
var i__12446__auto___588 = (0);
while(true){
if((i__12446__auto___588 < len__12445__auto___587)){
args_arr__12515__auto__.push((arguments[i__12446__auto___588]));

var G__589 = (i__12446__auto___588 + (1));
i__12446__auto___588 = G__589;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((2)),(0),null));
return reagent.core.class_names.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12516__auto__);

}
});

(reagent.core.class_names.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(reagent.core.class_names.cljs$core$IFn$_invoke$arity$1 = (function (class$){
return reagent.impl.util.class_names.call(null,class$);
}));

(reagent.core.class_names.cljs$core$IFn$_invoke$arity$2 = (function (class1,class2){
return reagent.impl.util.class_names.call(null,class1,class2);
}));

(reagent.core.class_names.cljs$core$IFn$_invoke$arity$variadic = (function (class1,class2,others){
return cljs.core.apply.call(null,reagent.impl.util.class_names,class1,class2,others);
}));

/** @this {Function} */
(reagent.core.class_names.cljs$lang$applyTo = (function (seq582){
var G__583 = cljs.core.first.call(null,seq582);
var seq582__$1 = cljs.core.next.call(null,seq582);
var G__584 = cljs.core.first.call(null,seq582__$1);
var seq582__$2 = cljs.core.next.call(null,seq582__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__583,G__584,seq582__$2);
}));

(reagent.core.class_names.cljs$lang$maxFixedArity = (2));

/**
 * Utility function that merges some maps, handling `:class` and `:style`.
 * 
 *   The :class value is always normalized (using `class-names`) even if no
 *   merging is done.
 */
reagent.core.merge_props = (function reagent$core$merge_props(var_args){
var G__594 = arguments.length;
switch (G__594) {
case (0):
return reagent.core.merge_props.cljs$core$IFn$_invoke$arity$0();

break;
case (1):
return reagent.core.merge_props.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case (2):
return reagent.core.merge_props.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___596 = arguments.length;
var i__12446__auto___597 = (0);
while(true){
if((i__12446__auto___597 < len__12445__auto___596)){
args_arr__12515__auto__.push((arguments[i__12446__auto___597]));

var G__598 = (i__12446__auto___597 + (1));
i__12446__auto___597 = G__598;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((2)),(0),null));
return reagent.core.merge_props.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12516__auto__);

}
});

(reagent.core.merge_props.cljs$core$IFn$_invoke$arity$0 = (function (){
return reagent.impl.util.merge_props.call(null);
}));

(reagent.core.merge_props.cljs$core$IFn$_invoke$arity$1 = (function (defaults){
return reagent.impl.util.merge_props.call(null,defaults);
}));

(reagent.core.merge_props.cljs$core$IFn$_invoke$arity$2 = (function (defaults,props){
return reagent.impl.util.merge_props.call(null,defaults,props);
}));

(reagent.core.merge_props.cljs$core$IFn$_invoke$arity$variadic = (function (defaults,props,others){
return cljs.core.apply.call(null,reagent.impl.util.merge_props,defaults,props,others);
}));

/** @this {Function} */
(reagent.core.merge_props.cljs$lang$applyTo = (function (seq591){
var G__592 = cljs.core.first.call(null,seq591);
var seq591__$1 = cljs.core.next.call(null,seq591);
var G__593 = cljs.core.first.call(null,seq591__$1);
var seq591__$2 = cljs.core.next.call(null,seq591__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__592,G__593,seq591__$2);
}));

(reagent.core.merge_props.cljs$lang$maxFixedArity = (2));

/**
 * Render dirty components immediately.
 * 
 *   Note that this may not work in event handlers, since React.js does
 *   batching of updates there.
 */
reagent.core.flush = (function reagent$core$flush(){
return reagent.impl.batching.flush.call(null);
});
/**
 * Like clojure.core/atom, except that it keeps track of derefs.
 *   Reagent components that derefs one of these are automatically
 *   re-rendered.
 */
reagent.core.atom = (function reagent$core$atom(var_args){
var G__602 = arguments.length;
switch (G__602) {
case (1):
return reagent.core.atom.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__12515__auto__ = [];
var len__12445__auto___604 = arguments.length;
var i__12446__auto___605 = (0);
while(true){
if((i__12446__auto___605 < len__12445__auto___604)){
args_arr__12515__auto__.push((arguments[i__12446__auto___605]));

var G__606 = (i__12446__auto___605 + (1));
i__12446__auto___605 = G__606;
continue;
} else {
}
break;
}

var argseq__12516__auto__ = (new cljs.core.IndexedSeq(args_arr__12515__auto__.slice((1)),(0),null));
return reagent.core.atom.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12516__auto__);

}
});

(reagent.core.atom.cljs$core$IFn$_invoke$arity$1 = (function (x){
return reagent.ratom.atom.call(null,x);
}));

(reagent.core.atom.cljs$core$IFn$_invoke$arity$variadic = (function (x,rest){
return cljs.core.apply.call(null,reagent.ratom.atom,x,rest);
}));

/** @this {Function} */
(reagent.core.atom.cljs$lang$applyTo = (function (seq600){
var G__601 = cljs.core.first.call(null,seq600);
var seq600__$1 = cljs.core.next.call(null,seq600);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__601,seq600__$1);
}));

(reagent.core.atom.cljs$lang$maxFixedArity = (1));

/**
 * Takes a function and optional arguments, and returns a derefable
 *   containing the output of that function. If the function derefs
 *   Reagent atoms (or track, etc), the value will be updated whenever
 *   the atom changes.
 * 
 *   In other words, `@(track foo bar)` will produce the same result
 *   as `(foo bar)`, but foo will only be called again when the atoms it
 *   depends on changes, and will only trigger updates of components when
 *   its result changes.
 * 
 *   track is lazy, i.e the function is only evaluated on deref.
 */
reagent.core.track = (function reagent$core$track(var_args){
var args__12462__auto__ = [];
var len__12445__auto___609 = arguments.length;
var i__12446__auto___610 = (0);
while(true){
if((i__12446__auto___610 < len__12445__auto___609)){
args__12462__auto__.push((arguments[i__12446__auto___610]));

var G__611 = (i__12446__auto___610 + (1));
i__12446__auto___610 = G__611;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.core.track.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.core.track.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return reagent.ratom.make_track.call(null,f,args);
}));

(reagent.core.track.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.core.track.cljs$lang$applyTo = (function (seq607){
var G__608 = cljs.core.first.call(null,seq607);
var seq607__$1 = cljs.core.next.call(null,seq607);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__608,seq607__$1);
}));

/**
 * An eager version of track. The function passed is called
 *   immediately, and continues to be called when needed, until stopped
 *   with dispose!.
 */
reagent.core.track_BANG_ = (function reagent$core$track_BANG_(var_args){
var args__12462__auto__ = [];
var len__12445__auto___614 = arguments.length;
var i__12446__auto___615 = (0);
while(true){
if((i__12446__auto___615 < len__12445__auto___614)){
args__12462__auto__.push((arguments[i__12446__auto___615]));

var G__616 = (i__12446__auto___615 + (1));
i__12446__auto___615 = G__616;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.core.track_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.core.track_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return reagent.ratom.make_track_BANG_.call(null,f,args);
}));

(reagent.core.track_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.core.track_BANG_.cljs$lang$applyTo = (function (seq612){
var G__613 = cljs.core.first.call(null,seq612);
var seq612__$1 = cljs.core.next.call(null,seq612);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__613,seq612__$1);
}));

/**
 * Stop the result of track! from updating.
 */
reagent.core.dispose_BANG_ = (function reagent$core$dispose_BANG_(x){
return reagent.ratom.dispose_BANG_.call(null,x);
});
/**
 * Provide a combination of value and callback, that looks like an atom.
 * 
 *   The first argument can be any value, that will be returned when the
 *   result is deref'ed.
 * 
 *   The second argument should be a function, that is called with the
 *   optional extra arguments provided to wrap, and the new value of the
 *   resulting 'atom'.
 * 
 *   Use for example like this:
 * 
 *   ```cljs
 *   (wrap (:foo @state)
 *      swap! state assoc :foo)
 *   ```
 * 
 *   Probably useful only for passing to child components.
 */
reagent.core.wrap = (function reagent$core$wrap(var_args){
var args__12462__auto__ = [];
var len__12445__auto___620 = arguments.length;
var i__12446__auto___621 = (0);
while(true){
if((i__12446__auto___621 < len__12445__auto___620)){
args__12462__auto__.push((arguments[i__12446__auto___621]));

var G__622 = (i__12446__auto___621 + (1));
i__12446__auto___621 = G__622;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.core.wrap.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.core.wrap.cljs$core$IFn$_invoke$arity$variadic = (function (value,reset_fn,args){
if(cljs.core.ifn_QMARK_.call(null,reset_fn)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.call(null,reset_fn)].join(''),"\n","(cljs.core/ifn? reset-fn)"].join('')));
}

return reagent.ratom.make_wrapper.call(null,value,reset_fn,args);
}));

(reagent.core.wrap.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.core.wrap.cljs$lang$applyTo = (function (seq617){
var G__618 = cljs.core.first.call(null,seq617);
var seq617__$1 = cljs.core.next.call(null,seq617);
var G__619 = cljs.core.first.call(null,seq617__$1);
var seq617__$2 = cljs.core.next.call(null,seq617__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__618,G__619,seq617__$2);
}));

/**
 * Provide a cursor into a Reagent atom.
 * 
 *   Behaves like a Reagent atom but focuses updates and derefs to
 *   the specified path within the wrapped Reagent atom. e.g.,
 * 
 *   ```cljs
 *   (let [c (cursor ra [:nested :content])]
 *  ... @c ;; equivalent to (get-in @ra [:nested :content])
 *  ... (reset! c 42) ;; equivalent to (swap! ra assoc-in [:nested :content] 42)
 *  ... (swap! c inc) ;; equivalence to (swap! ra update-in [:nested :content] inc)
 *  )
 *   ```
 * 
 *   The first parameter can also be a function, that should look
 *   something like this:
 * 
 *   ```cljs
 *   (defn set-get
 *  ([k] (get-in @state k))
 *  ([k v] (swap! state assoc-in k v)))
 *   ```
 * 
 *   The function will be called with one argument – the path passed to
 *   cursor – when the cursor is deref'ed, and two arguments (path and
 *   new value) when the cursor is modified.
 * 
 *   Given that set-get function, (and that state is a Reagent atom, or
 *   another cursor) these cursors are equivalent:
 *   `(cursor state [:foo])` and `(cursor set-get [:foo])`.
 * 
 *   Note that a cursor is lazy: its value will not change until it is
 *   used. This may be noticed with add-watch.
 */
reagent.core.cursor = (function reagent$core$cursor(src,path){
return reagent.ratom.cursor.call(null,src,path);
});
/**
 * Swaps the value of a to be `(apply f current-value-of-atom args)`.
 * 
 *   rswap! works like swap!, except that recursive calls to rswap! on
 *   the same atom are allowed – and it always returns nil.
 */
reagent.core.rswap_BANG_ = (function reagent$core$rswap_BANG_(var_args){
var args__12462__auto__ = [];
var len__12445__auto___628 = arguments.length;
var i__12446__auto___629 = (0);
while(true){
if((i__12446__auto___629 < len__12445__auto___628)){
args__12462__auto__.push((arguments[i__12446__auto___629]));

var G__630 = (i__12446__auto___629 + (1));
i__12446__auto___629 = G__630;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((2) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((2)),(0),null)):null);
return reagent.core.rswap_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__12463__auto__);
});

(reagent.core.rswap_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (a,f,args){
if((((!((a == null))))?(((((a.cljs$lang$protocol_mask$partition1$ & (16384))) || ((cljs.core.PROTOCOL_SENTINEL === a.cljs$core$IAtom$))))?true:(((!a.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IAtom,a):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IAtom,a))){
} else {
throw (new Error("Assert failed: (satisfies? IAtom a)"));
}

if(cljs.core.ifn_QMARK_.call(null,f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

if(cljs.core.truth_(a.rswapping)){
(function (){var or__10112__auto__ = a.rswapfs;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
return (a.rswapfs = []);
}
})().push((function (p1__21_SHARP_){
return cljs.core.apply.call(null,f,p1__21_SHARP_,args);
}));
} else {
(a.rswapping = true);

try{cljs.core.swap_BANG_.call(null,a,(function (state){
var s = cljs.core.apply.call(null,f,state,args);
while(true){
var temp__9814__auto__ = (function (){var G__627 = a;
var G__627__$1 = (((G__627 == null))?null:G__627.rswapfs);
if((G__627__$1 == null)){
return null;
} else {
return G__627__$1.shift();
}
})();
if((temp__9814__auto__ == null)){
return s;
} else {
var sf = temp__9814__auto__;
var G__631 = sf.call(null,s);
s = G__631;
continue;
}
break;
}
}));
}finally {(a.rswapping = false);
}}

return null;
}));

(reagent.core.rswap_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(reagent.core.rswap_BANG_.cljs$lang$applyTo = (function (seq623){
var G__624 = cljs.core.first.call(null,seq623);
var seq623__$1 = cljs.core.next.call(null,seq623);
var G__625 = cljs.core.first.call(null,seq623__$1);
var seq623__$2 = cljs.core.next.call(null,seq623__$1);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__624,G__625,seq623__$2);
}));

/**
 * Run f using requestAnimationFrame or equivalent.
 * 
 *   f will be called just before components are rendered.
 */
reagent.core.next_tick = (function reagent$core$next_tick(f){
return reagent.impl.batching.do_before_flush.call(null,f);
});
/**
 * Run f using requestAnimationFrame or equivalent.
 * 
 *   f will be called just after any queued renders in the next animation
 *   frame (and even if no renders actually occur).
 */
reagent.core.after_render = (function reagent$core$after_render(f){
return reagent.impl.batching.do_after_render.call(null,f);
});
/**
 * Works just like clojure.core/partial, but the result can be compared with =
 */
reagent.core.partial = (function reagent$core$partial(var_args){
var args__12462__auto__ = [];
var len__12445__auto___634 = arguments.length;
var i__12446__auto___635 = (0);
while(true){
if((i__12446__auto___635 < len__12445__auto___634)){
args__12462__auto__.push((arguments[i__12446__auto___635]));

var G__636 = (i__12446__auto___635 + (1));
i__12446__auto___635 = G__636;
continue;
} else {
}
break;
}

var argseq__12463__auto__ = ((((1) < args__12462__auto__.length))?(new cljs.core.IndexedSeq(args__12462__auto__.slice((1)),(0),null)):null);
return reagent.core.partial.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__12463__auto__);
});

(reagent.core.partial.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
return reagent.impl.util.make_partial_fn.call(null,f,args);
}));

(reagent.core.partial.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent.core.partial.cljs$lang$applyTo = (function (seq632){
var G__633 = cljs.core.first.call(null,seq632);
var seq632__$1 = cljs.core.next.call(null,seq632);
var self__12420__auto__ = this;
return self__12420__auto__.cljs$core$IFn$_invoke$arity$variadic(G__633,seq632__$1);
}));


//# sourceURL=reagent/core.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9jb3JlLmpzIiwic291cmNlcyI6WyJjb3JlLmNsanMiXSwibGluZUNvdW50Ijo5MjksIm1hcHBpbmdzIjoiO0FBY0EsQUFBS0EseUJBQVVDO0FBRWYsQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUFBLHNDQUFBQyxwRUFBTUU7QUFBTixBQUFBLElBQUFELFNBQUEsQUFBQTtBQUFBLEFBQUEsUUFBQUE7S0FBQTtBQUFBLE9BQUFDLDBEQUFBLENBQUEsVUFBQTs7O0tBQUE7QUFBQSxPQUFBQSwwREFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUE7OztLQUFBO0FBQUEsT0FBQUEsMERBQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBLE1BQUEsQ0FBQSxVQUFBOzs7O0FBQUEsSUFBQUMsMEJBQUE7QUFBQSxBQUFBLElBQUFDLHlCQUFBLEFBQUE7QUFBQSxBQUFBLElBQUFDLHVCQUFBOztBQUFBLEFBQUEsR0FBQSxDQUFBQSx1QkFBQUQ7QUFBQSxBQUFBLEFBQUFELDZCQUFBLENBQUEsVUFBQUU7O0FBQUEsYUFBQSxDQUFBQSx1QkFBQTs7OztBQUFBOzs7O0FBQUEsSUFBQUMsd0JBQUEsMEJBQUEsQUFBQUgsOEJBQUEsS0FBQSxJQUFBLDVEQXFwRzBEZ0o7QUFycEcxRCxBQUFBLE9BQUFqSixpRUFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUEsTUFBQSxDQUFBLFVBQUEsTUFBQUk7Ozs7O0FBQUEsQ0FBQSw0REFBQSw1REFBTUosdUVBaUJGVTtBQWpCSixBQWtCRyxrREFBQSwzQ0FBQ1Ysc0NBQWVVOzs7QUFsQm5CLENBQUEsNERBQUEsNURBQU1WLHVFQW1CRlUsS0FBS0M7QUFuQlQsQUFvQkcsR0FBQSxHQUFBLEFBQUFDLCtCQUFrQkQ7QUFBbEI7QUFBQSxBQUFBLE1BQUEsS0FBQUUsTUFBQSxDQUFBLGtCQUFBLENBQUEsNkJBQUEsQUFBQUMsNENBQUEsS0FBQSx0QkFBa0JIOzs7QUFDbEIsT0FBQ0ksK0NBQW9CTCxLQUFLQzs7O0FBckI3QixDQUFB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QUFBRSxTQUFBLDBCQUFBRCwxQkFpcUZnREc7SUFqcUZoREgsYUFBQSx5QkFBQUEsekJBa3FGa0RJO0FBbHFGbEQsQUFBQSxJQUFBdkksc0JBQUE7QUFBQSxBQUFBLE9BQUFBLHlEQUFBb0ksT0FBQUQ7OztBQUFBIiwibmFtZXMiOlsicmVhZ2VudC5jb3JlL2lzLWNsaWVudCIsInJlYWdlbnQuaW1wbC51dGlsL2lzLWNsaWVudCIsInZhcl9hcmdzIiwiR19fNTcwIiwicmVhZ2VudC5jb3JlL2NyZWF0ZS1lbGVtZW50IiwiYXJncy1hcnJfXzEyNTE1X19hdXRvX18iLCJsZW5fXzEyNDQ1X19hdXRvX18iLCJpX18xMjQ0Nl9fYXV0b19fIiwiYXJnc2VxX18xMjUxNl9fYXV0b19fIiwic2VxNTY2IiwiR19fNTY3IiwiR19fNTY4IiwiR19fNTY5Iiwic2VsZl9fMTI0MjBfX2F1dG9fXyIsInR5cGUiLCJwcm9wcyIsImNsanMuY29yZS9tYXA/IiwianMvRXJyb3IiLCJjbGpzLmNvcmUvcHItc3RyIiwicmVhZ2VudC5jb3JlL2dsb2JhbCRtb2R1bGUkcmVhY3QuY3JlYXRlRWxlbWVudCIsImNoaWxkIiwiY2hpbGRyZW4iLCJjbGpzLmNvcmUvYXBwbHkiLCJyZWFnZW50LmNvcmUvYXMtZWxlbWVudCIsImZvcm0iLCJyZWFnZW50LmltcGwudGVtcGxhdGUvYXMtZWxlbWVudCIsInJlYWdlbnQuY29yZS9hZGFwdC1yZWFjdC1jbGFzcyIsImMiLCJyZWFnZW50LmltcGwudGVtcGxhdGUvYWRhcHQtcmVhY3QtY2xhc3MiLCJyZWFnZW50LmNvcmUvcmVhY3RpZnktY29tcG9uZW50IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9yZWFjdGlmeS1jb21wb25lbnQiLCJHX181NzYiLCJyZWFnZW50LmNvcmUvcmVuZGVyIiwiY29tcCIsImNvbnRhaW5lciIsInJlYWdlbnQuZG9tL3JlbmRlciIsImNhbGxiYWNrIiwicmVhZ2VudC5jb3JlL3VubW91bnQtY29tcG9uZW50LWF0LW5vZGUiLCJyZWFnZW50LmRvbS91bm1vdW50LWNvbXBvbmVudC1hdC1ub2RlIiwicmVhZ2VudC5jb3JlL2ZvcmNlLXVwZGF0ZS1hbGwiLCJyZWFnZW50LnJhdG9tL2ZsdXNoISIsInJlYWdlbnQuZG9tL2ZvcmNlLXVwZGF0ZS1hbGwiLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvZmx1c2gtYWZ0ZXItcmVuZGVyIiwicmVhZ2VudC5jb3JlL2NyZWF0ZS1jbGFzcyIsInNwZWMiLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2NyZWF0ZS1jbGFzcyIsInJlYWdlbnQuY29yZS9jdXJyZW50LWNvbXBvbmVudCIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvKmN1cnJlbnQtY29tcG9uZW50KiIsInJlYWdlbnQuY29yZS9zdGF0ZS1hdG9tIiwidGhpcyIsInJlYWdlbnQuaW1wbC5jb21wb25lbnQvcmVhZ2VudC1jb21wb25lbnQ/IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9zdGF0ZS1hdG9tIiwicmVhZ2VudC5jb3JlL3N0YXRlIiwiY2xqcy5jb3JlL2RlcmVmIiwicmVhZ2VudC5jb3JlL3JlcGxhY2Utc3RhdGUiLCJuZXctc3RhdGUiLCJjbGpzLmNvcmUvcmVzZXQhIiwicmVhZ2VudC5jb3JlL3NldC1zdGF0ZSIsImNsanMuY29yZS9zd2FwISIsImNsanMuY29yZS9tZXJnZSIsIkdfXzU3OSIsInJlYWdlbnQuY29yZS9mb3JjZS11cGRhdGUiLCJkZWVwIiwicmVhZ2VudC5pbXBsLnV0aWwvZm9yY2UtdXBkYXRlIiwicmVhZ2VudC5jb3JlL3Byb3BzIiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9nZXQtcHJvcHMiLCJyZWFnZW50LmNvcmUvY2hpbGRyZW4iLCJyZWFnZW50LmltcGwuY29tcG9uZW50L2dldC1jaGlsZHJlbiIsInJlYWdlbnQuY29yZS9hcmd2IiwicmVhZ2VudC5pbXBsLmNvbXBvbmVudC9nZXQtYXJndiIsInJlYWdlbnQuY29yZS9kb20tbm9kZSIsInJlYWdlbnQuZG9tL2RvbS1ub2RlIiwiR19fNTg1IiwicmVhZ2VudC5jb3JlL2NsYXNzLW5hbWVzIiwic2VxNTgyIiwiR19fNTgzIiwiR19fNTg0IiwiY2xhc3MiLCJyZWFnZW50LmltcGwudXRpbC9jbGFzcy1uYW1lcyIsImNsYXNzMSIsImNsYXNzMiIsIm90aGVycyIsIkdfXzU5NCIsInJlYWdlbnQuY29yZS9tZXJnZS1wcm9wcyIsInNlcTU5MSIsIkdfXzU5MiIsIkdfXzU5MyIsInJlYWdlbnQuaW1wbC51dGlsL21lcmdlLXByb3BzIiwiZGVmYXVsdHMiLCJyZWFnZW50LmNvcmUvZmx1c2giLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvZmx1c2giLCJHX182MDIiLCJyZWFnZW50LmNvcmUvYXRvbSIsInNlcTYwMCIsIkdfXzYwMSIsIngiLCJyZWFnZW50LnJhdG9tL2F0b20iLCJyZXN0IiwiYXJnc19fMTI0NjJfX2F1dG9fXyIsImFyZ3NlcV9fMTI0NjNfX2F1dG9fXyIsInJlYWdlbnQuY29yZS90cmFjayIsInNlcTYwNyIsIkdfXzYwOCIsImYiLCJhcmdzIiwiY2xqcy5jb3JlL2lmbj8iLCJyZWFnZW50LnJhdG9tL21ha2UtdHJhY2siLCJyZWFnZW50LmNvcmUvdHJhY2shIiwic2VxNjEyIiwiR19fNjEzIiwicmVhZ2VudC5yYXRvbS9tYWtlLXRyYWNrISIsInJlYWdlbnQuY29yZS9kaXNwb3NlISIsInJlYWdlbnQucmF0b20vZGlzcG9zZSEiLCJyZWFnZW50LmNvcmUvd3JhcCIsInNlcTYxNyIsIkdfXzYxOCIsIkdfXzYxOSIsInZhbHVlIiwicmVzZXQtZm4iLCJyZWFnZW50LnJhdG9tL21ha2Utd3JhcHBlciIsInJlYWdlbnQuY29yZS9jdXJzb3IiLCJzcmMiLCJwYXRoIiwicmVhZ2VudC5yYXRvbS9jdXJzb3IiLCJyZWFnZW50LmNvcmUvcnN3YXAhIiwic2VxNjIzIiwiR19fNjI0IiwiR19fNjI1IiwiYSIsImNsanMuY29yZS9QUk9UT0NPTF9TRU5USU5FTCIsImNsanMuY29yZS9uYXRpdmUtc2F0aXNmaWVzPyIsImNsanMuY29yZS9JQXRvbSIsIm9yX18xMDExMl9fYXV0b19fIiwicDFfXzIxIyIsInN0YXRlIiwicyIsInRlbXBfXzk4MTRfX2F1dG9fXyIsInNmIiwiR19fNjI3IiwicmVhZ2VudC5jb3JlL25leHQtdGljayIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9kby1iZWZvcmUtZmx1c2giLCJyZWFnZW50LmNvcmUvYWZ0ZXItcmVuZGVyIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2RvLWFmdGVyLXJlbmRlciIsInJlYWdlbnQuY29yZS9wYXJ0aWFsIiwic2VxNjMyIiwiR19fNjMzIiwicmVhZ2VudC5pbXBsLnV0aWwvbWFrZS1wYXJ0aWFsLWZuIiwiY2xqcy5jb3JlL2ZpcnN0IiwiY2xqcy5jb3JlL25leHQiLCJjbGpzLmNvcmUvSW5kZXhlZFNlcSJdLCJzb3VyY2VzQ29udGVudCI6WyIobnMgcmVhZ2VudC5jb3JlXG4gICg6cmVxdWlyZS1tYWNyb3MgW3JlYWdlbnQuY29yZV0pXG4gICg6cmVmZXItY2xvanVyZSA6ZXhjbHVkZSBbcGFydGlhbCBhdG9tIGZsdXNoXSlcbiAgKDpyZXF1aXJlIFtyZWFjdCA6YXMgcmVhY3RdXG4gICAgICAgICAgICBbcmVhZ2VudC5pbXBsLnRlbXBsYXRlIDphcyB0bXBsXVxuICAgICAgICAgICAgW3JlYWdlbnQuaW1wbC5jb21wb25lbnQgOmFzIGNvbXBdXG4gICAgICAgICAgICBbcmVhZ2VudC5pbXBsLnV0aWwgOmFzIHV0aWxdXG4gICAgICAgICAgICBbcmVhZ2VudC5pbXBsLmJhdGNoaW5nIDphcyBiYXRjaF1cbiAgICAgICAgICAgIFtyZWFnZW50LnJhdG9tIDphcyByYXRvbV1cbiAgICAgICAgICAgIFtyZWFnZW50LmRlYnVnIDphcyBkZWIgOnJlZmVyLW1hY3JvcyBbYXNzZXJ0LXNvbWUgYXNzZXJ0LWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQtanMtb2JqZWN0IGFzc2VydC1uZXctc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LWNhbGxhYmxlXV1cbiAgICAgICAgICAgIFtyZWFnZW50LmRvbSA6YXMgZG9tXSkpXG5cbihkZWYgaXMtY2xpZW50IHV0aWwvaXMtY2xpZW50KVxuXG4oZGVmbiBjcmVhdGUtZWxlbWVudFxuICBcIkNyZWF0ZSBhIG5hdGl2ZSBSZWFjdCBlbGVtZW50LCBieSBjYWxsaW5nIFJlYWN0LmNyZWF0ZUVsZW1lbnQgZGlyZWN0bHkuXG5cbiAgVGhhdCBtZWFucyB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBqYXZhc2NyaXB0IG9iamVjdCAob3IgbmlsKSwgYW5kXG4gIHRoYXQgYW55IFJlYWdlbnQgaGljY3VwIGZvcm1zIG11c3QgYmUgcHJvY2Vzc2VkIHdpdGggYXMtZWxlbWVudC4gRm9yIGV4YW1wbGVcbiAgbGlrZSB0aGlzOlxuXG4gIGBgYGNsanNcbiAgKHIvY3JlYXRlLWVsZW1lbnQgXFxcImRpdlxcXCIgI2pzezpjbGFzc05hbWUgXFxcImZvb1xcXCJ9XG4gICAgXFxcIkhpIFxcXCIgKHIvYXMtZWxlbWVudCBbOnN0cm9uZyBcXFwid29ybGQhXFxcIl0pXG4gIGBgYFxuXG4gIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG9cblxuICBgYGBjbGpzXG4gIFs6ZGl2LmZvbyBcXFwiSGlcXFwiIFs6c3Ryb25nIFxcXCJ3b3JsZCFcXFwiXV1cbiAgYGBgXCJcbiAgKFt0eXBlXVxuICAgKGNyZWF0ZS1lbGVtZW50IHR5cGUgbmlsKSlcbiAgKFt0eXBlIHByb3BzXVxuICAgKGFzc2VydC1qcy1vYmplY3QgcHJvcHMpXG4gICAocmVhY3QvY3JlYXRlRWxlbWVudCB0eXBlIHByb3BzKSlcbiAgKFt0eXBlIHByb3BzIGNoaWxkXVxuICAgKGFzc2VydC1qcy1vYmplY3QgcHJvcHMpXG4gICAocmVhY3QvY3JlYXRlRWxlbWVudCB0eXBlIHByb3BzIGNoaWxkKSlcbiAgKFt0eXBlIHByb3BzIGNoaWxkICYgY2hpbGRyZW5dXG4gICAoYXNzZXJ0LWpzLW9iamVjdCBwcm9wcylcbiAgIChhcHBseSByZWFjdC9jcmVhdGVFbGVtZW50IHR5cGUgcHJvcHMgY2hpbGQgY2hpbGRyZW4pKSlcblxuKGRlZm4gYXMtZWxlbWVudFxuICBcIlR1cm5zIGEgdmVjdG9yIG9mIEhpY2N1cCBzeW50YXggaW50byBhIFJlYWN0IGVsZW1lbnQuIFJldHVybnMgZm9ybVxuICB1bmNoYW5nZWQgaWYgaXQgaXMgbm90IGEgdmVjdG9yLlwiXG4gIFtmb3JtXVxuICAodG1wbC9hcy1lbGVtZW50IGZvcm0pKVxuXG4oZGVmbiBhZGFwdC1yZWFjdC1jbGFzc1xuICBcIlJldHVybnMgYW4gYWRhcHRlciBmb3IgYSBuYXRpdmUgUmVhY3QgY2xhc3MsIHRoYXQgbWF5IGJlIHVzZWRcbiAganVzdCBsaWtlIGEgUmVhZ2VudCBjb21wb25lbnQgZnVuY3Rpb24gb3IgY2xhc3MgaW4gSGljY3VwIGZvcm1zLlwiXG4gIFtjXVxuICAoYXNzZXJ0LXNvbWUgYyBcIkNvbXBvbmVudFwiKVxuICAodG1wbC9hZGFwdC1yZWFjdC1jbGFzcyBjKSlcblxuKGRlZm4gcmVhY3RpZnktY29tcG9uZW50XG4gIFwiUmV0dXJucyBhbiBhZGFwdGVyIGZvciBhIFJlYWdlbnQgY29tcG9uZW50LCB0aGF0IG1heSBiZSB1c2VkIGZyb21cbiAgUmVhY3QsIGZvciBleGFtcGxlIGluIEpTWC4gQSBzaW5nbGUgYXJndW1lbnQsIHByb3BzLCBpcyBwYXNzZWQgdG9cbiAgdGhlIGNvbXBvbmVudCwgY29udmVydGVkIHRvIGEgbWFwLlwiXG4gIFtjXVxuICAoYXNzZXJ0LXNvbWUgYyBcIkNvbXBvbmVudFwiKVxuICAoY29tcC9yZWFjdGlmeS1jb21wb25lbnQgYykpXG5cbihkZWZuIHJlbmRlclxuICBcIlJlbmRlciBhIFJlYWdlbnQgY29tcG9uZW50IGludG8gdGhlIERPTS4gVGhlIGZpcnN0IGFyZ3VtZW50IG1heSBiZVxuICBlaXRoZXIgYSB2ZWN0b3IgKHVzaW5nIFJlYWdlbnQncyBIaWNjdXAgc3ludGF4KSwgb3IgYSBSZWFjdCBlbGVtZW50LlxuICBUaGUgc2Vjb25kIGFyZ3VtZW50IHNob3VsZCBiZSBhIERPTSBub2RlLlxuXG4gIE9wdGlvbmFsbHkgdGFrZXMgYSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW4gcGxhY2UuXG5cbiAgUmV0dXJucyB0aGUgbW91bnRlZCBjb21wb25lbnQgaW5zdGFuY2UuXCJcbiAgezpkZXByZWNhdGVkIFwiMC4xMC4wXCJ9XG4gIChbY29tcCBjb250YWluZXJdXG4gICAoZG9tL3JlbmRlciBjb21wIGNvbnRhaW5lcikpXG4gIChbY29tcCBjb250YWluZXIgY2FsbGJhY2tdXG4gICAoZG9tL3JlbmRlciBjb21wIGNvbnRhaW5lciBjYWxsYmFjaykpKVxuXG4oZGVmbiB1bm1vdW50LWNvbXBvbmVudC1hdC1ub2RlXG4gIFwiUmVtb3ZlIGEgY29tcG9uZW50IGZyb20gdGhlIGdpdmVuIERPTSBub2RlLlwiXG4gIHs6ZGVwcmVjYXRlZCBcIjAuMTAuMFwifVxuICBbY29udGFpbmVyXVxuICAoZG9tL3VubW91bnQtY29tcG9uZW50LWF0LW5vZGUgY29udGFpbmVyKSlcblxuKGRlZm4gZm9yY2UtdXBkYXRlLWFsbFxuICBcIkZvcmNlIHJlLXJlbmRlcmluZyBvZiBhbGwgbW91bnRlZCBSZWFnZW50IGNvbXBvbmVudHMuIFRoaXMgaXNcbiAgcHJvYmFibHkgb25seSB1c2VmdWwgaW4gYSBkZXZlbG9wbWVudCBlbnZpcm9ubWVudCwgd2hlbiB5b3Ugd2FudCB0b1xuICB1cGRhdGUgY29tcG9uZW50cyBpbiByZXNwb25zZSB0byBzb21lIGR5bmFtaWMgY2hhbmdlcyB0byBjb2RlLlxuXG4gIE5vdGUgdGhhdCBmb3JjZS11cGRhdGUtYWxsIG1heSBub3QgdXBkYXRlIHJvb3QgY29tcG9uZW50cy4gVGhpc1xuICBoYXBwZW5zIGlmIGEgY29tcG9uZW50ICdmb28nIGlzIG1vdW50ZWQgd2l0aCBgKHJlbmRlciBbZm9vXSlgIChzaW5jZVxuICBmdW5jdGlvbnMgYXJlIHBhc3NlZCBieSB2YWx1ZSwgYW5kIG5vdCBieSByZWZlcmVuY2UsIGluXG4gIENsb2p1cmVTY3JpcHQpLiBUbyBnZXQgYXJvdW5kIHRoaXMgeW91J2xsIGhhdmUgdG8gaW50cm9kdWNlIGEgbGF5ZXJcbiAgb2YgaW5kaXJlY3Rpb24sIGZvciBleGFtcGxlIGJ5IHVzaW5nIGAocmVuZGVyIFsjJ2Zvb10pYCBpbnN0ZWFkLlwiXG4gIHs6ZGVwcmVjYXRlZCBcIjAuMTAuMFwifVxuICBbXVxuICAocmF0b20vZmx1c2ghKVxuICAoZG9tL2ZvcmNlLXVwZGF0ZS1hbGwpXG4gIChiYXRjaC9mbHVzaC1hZnRlci1yZW5kZXIpKVxuXG4oZGVmbiBjcmVhdGUtY2xhc3NcbiAgXCJDcmVhdGVzIEpTIGNsYXNzIGJhc2VkIG9uIHByb3ZpZGVkIENsb2p1cmUgbWFwLCBmb3IgZXhhbXBsZTpcblxuICBgYGBjbGpzXG4gIHs7OyBDb25zdHJ1Y3RvclxuICAgOmNvbnN0cnVjdG9yIChmbiBbdGhpcyBwcm9wc10pXG4gICA6Z2V0LWluaXRpYWwtc3RhdGUgKGZuIFt0aGlzXSlcbiAgIDs7IFN0YXRpYyBtZXRob2RzXG4gICA6Z2V0LWRlcml2ZWQtc3RhdGUtZnJvbS1wcm9wcyAoZm4gW3Byb3BzIHN0YXRlXSBwYXJ0aWFsLXN0YXRlKVxuICAgOmdldC1kZXJpdmVkLXN0YXRlLWZyb20tZXJyb3IgKGZuIFtlcnJvcl0gcGFydGlhbC1zdGF0ZSlcbiAgIDs7IE1ldGhvZHNcbiAgIDpnZXQtc25hcHNob3QtYmVmb3JlLXVwZGF0ZSAoZm4gW3RoaXMgb2xkLWFyZ3YgbmV3LWFyZ3ZdIHNuYXBzaG90KVxuICAgOnNob3VsZC1jb21wb25lbnQtdXBkYXRlIChmbiBbdGhpcyBvbGQtYXJndiBuZXctYXJndl0pXG4gICA6Y29tcG9uZW50LWRpZC1tb3VudCAoZm4gW3RoaXNdKVxuICAgOmNvbXBvbmVudC1kaWQtdXBkYXRlIChmbiBbdGhpcyBvbGQtYXJndiBvbGQtc3RhdGUgc25hcHNob3RdKVxuICAgOmNvbXBvbmVudC13aWxsLXVubW91bnQgKGZuIFt0aGlzXSlcbiAgIDpjb21wb25lbnQtZGlkLWNhdGNoIChmbiBbdGhpcyBlcnJvciBpbmZvXSlcbiAgIDpyZWFnZW50LXJlbmRlciAoZm4gW2FyZ3MuLi4uXSlcbiAgIDs7IE9yIGFsdGVybmF0aXZlbHk6XG4gICA6cmVuZGVyIChmbiBbdGhpc10pXG4gICA7OyBEZXByZWNhdGVkIG1ldGhvZHM6XG4gICA6VU5TQUZFX2NvbXBvbmVudC13aWxsLXJlY2VpdmUtcHJvcHMgKGZuIFt0aGlzIG5ldy1hcmd2XSlcbiAgIDpVTlNBRkVfY29tcG9uZW50LXdpbGwtdXBkYXRlIChmbiBbdGhpcyBuZXctYXJndiBuZXctc3RhdGVdKVxuICAgOlVOU0FGRV9jb21wb25lbnQtd2lsbC1tb3VudCAoZm4gW3RoaXNdKX1cbiAgYGBgXG5cbiAgRXZlcnl0aGluZyBpcyBvcHRpb25hbCwgZXhjZXB0IGVpdGhlciA6cmVhZ2VudC1yZW5kZXIgb3IgOnJlbmRlci5cblxuICBNYXAga2V5cyBzaG91bGQgdXNlIGBSZWFjdC5Db21wb25lbnRgIG1ldGhvZCBuYW1lcyAoaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWNvbXBvbmVudC5odG1sKSxcbiAgYW5kIGNhbiBiZSBwcm92aWRlZCBpbiBzbmFrZS1jYXNlIG9yIGNhbWVsQ2FzZS5cblxuICBTdGF0ZSBjYW4gYmUgaW5pdGlhbGl6ZWQgdXNpbmcgY29uc3RydWN0b3IsIHdoaWNoIG1hdGNoZXMgUmVhY3QuQ29tcG9uZW50IGNsYXNzLFxuICBvciB1c2luZyBnZXRJbml0aWFsU3RhdGUgd2hpY2ggbWF0Y2hlcyBvbGQgUmVhY3QgY3JlYXRlQ2xhc3MgZnVuY3Rpb24gYW5kIGlzXG4gIG5vdyBpbXBsZW1lbnRlZCBieSBSZWFnZW50IGZvciBjb21wYXRpYmlsaXR5LlxuXG4gIFN0YXRlIGNhbiB1c3VhbGx5IGJlIGFueXRoaW5nLCBlLmcuIENsanMgb2JqZWN0LiBCdXQgaWYgdXNpbmcgZ2V0RGVyaXZlZFN0YXRlXG4gIG1ldGhvZHMsIHRoZSBzdGF0ZSBoYXMgdG8gYmUgcGxhaW4gSlMgb2JqZWN0IGFzIFJlYWN0IGltcGxlbWVudGF0aW9uIHVzZXNcbiAgT2JqZWN0LmFzc2lnbiB0byBtZXJnZSBwYXJ0aWFsIHN0YXRlIGludG8gdGhlIGN1cnJlbnQgc3RhdGUuXG5cbiAgUmVhY3QgYnVpbHQtaW4gc3RhdGljIG1ldGhvZHMgb3IgcHJvcGVydGllcyBhcmUgYXV0b21hdGljYWxseSBkZWZpbmVkIGFzIHN0YXRpY3MuXCJcbiAgW3NwZWNdXG4gIChjb21wL2NyZWF0ZS1jbGFzcyBzcGVjKSlcblxuXG4oZGVmbiBjdXJyZW50LWNvbXBvbmVudFxuICBcIlJldHVybnMgdGhlIGN1cnJlbnQgUmVhY3QgY29tcG9uZW50IChhLmsuYSBgdGhpc2ApIGluIGEgY29tcG9uZW50XG4gIGZ1bmN0aW9uLlwiXG4gIFtdXG4gIGNvbXAvKmN1cnJlbnQtY29tcG9uZW50KilcblxuKGRlZm4gc3RhdGUtYXRvbVxuICBcIlJldHVybnMgYW4gYXRvbSBjb250YWluaW5nIGEgY29tcG9uZW50cyBzdGF0ZS5cIlxuICBbdGhpc11cbiAgKGFzc2VydC1jb21wb25lbnQgdGhpcylcbiAgKGNvbXAvc3RhdGUtYXRvbSB0aGlzKSlcblxuKGRlZm4gc3RhdGVcbiAgXCJSZXR1cm5zIHRoZSBzdGF0ZSBvZiBhIGNvbXBvbmVudCwgYXMgc2V0IHdpdGggcmVwbGFjZS1zdGF0ZSBvciBzZXQtc3RhdGUuXG4gIEVxdWl2YWxlbnQgdG8gYChkZXJlZiAoci9zdGF0ZS1hdG9tIHRoaXMpKWBcIlxuICBbdGhpc11cbiAgKGFzc2VydC1jb21wb25lbnQgdGhpcylcbiAgKGRlcmVmIChzdGF0ZS1hdG9tIHRoaXMpKSlcblxuKGRlZm4gcmVwbGFjZS1zdGF0ZVxuICBcIlNldCBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAgRXF1aXZhbGVudCB0byBgKHJlc2V0ISAoc3RhdGUtYXRvbSB0aGlzKSBuZXctc3RhdGUpYFwiXG4gIFt0aGlzIG5ldy1zdGF0ZV1cbiAgKGFzc2VydC1jb21wb25lbnQgdGhpcylcbiAgKGFzc2VydC1uZXctc3RhdGUgbmV3LXN0YXRlKVxuICAocmVzZXQhIChzdGF0ZS1hdG9tIHRoaXMpIG5ldy1zdGF0ZSkpXG5cbihkZWZuIHNldC1zdGF0ZVxuICBcIk1lcmdlIGNvbXBvbmVudCBzdGF0ZSB3aXRoIG5ldy1zdGF0ZS5cbiAgRXF1aXZhbGVudCB0byBgKHN3YXAhIChzdGF0ZS1hdG9tIHRoaXMpIG1lcmdlIG5ldy1zdGF0ZSlgXCJcbiAgW3RoaXMgbmV3LXN0YXRlXVxuICAoYXNzZXJ0LWNvbXBvbmVudCB0aGlzKVxuICAoYXNzZXJ0LW5ldy1zdGF0ZSBuZXctc3RhdGUpXG4gIChzd2FwISAoc3RhdGUtYXRvbSB0aGlzKSBtZXJnZSBuZXctc3RhdGUpKVxuXG4oZGVmbiBmb3JjZS11cGRhdGVcbiAgXCJGb3JjZSBhIGNvbXBvbmVudCB0byByZS1yZW5kZXIgaW1tZWRpYXRlbHkuXG5cbiAgSWYgdGhlIHNlY29uZCBhcmd1bWVudCBpcyB0cnVlLCBjaGlsZCBjb21wb25lbnRzIHdpbGwgYWxzbyBiZVxuICByZS1yZW5kZXJlZCwgZXZlbiBpcyB0aGVpciBhcmd1bWVudHMgaGF2ZSBub3QgY2hhbmdlZC5cIlxuICAoW3RoaXNdXG4gICAoZm9yY2UtdXBkYXRlIHRoaXMgZmFsc2UpKVxuICAoW3RoaXMgZGVlcF1cbiAgIChyYXRvbS9mbHVzaCEpXG4gICAodXRpbC9mb3JjZS11cGRhdGUgdGhpcyBkZWVwKVxuICAgKGJhdGNoL2ZsdXNoLWFmdGVyLXJlbmRlcikpKVxuXG4oZGVmbiBwcm9wc1xuICBcIlJldHVybnMgdGhlIHByb3BzIHBhc3NlZCB0byBhIGNvbXBvbmVudC5cIlxuICBbdGhpc11cbiAgKGFzc2VydC1jb21wb25lbnQgdGhpcylcbiAgKGNvbXAvZ2V0LXByb3BzIHRoaXMpKVxuXG4oZGVmbiBjaGlsZHJlblxuICBcIlJldHVybnMgdGhlIGNoaWxkcmVuIHBhc3NlZCB0byBhIGNvbXBvbmVudC5cIlxuICBbdGhpc11cbiAgKGFzc2VydC1jb21wb25lbnQgdGhpcylcbiAgKGNvbXAvZ2V0LWNoaWxkcmVuIHRoaXMpKVxuXG4oZGVmbiBhcmd2XG4gIFwiUmV0dXJucyB0aGUgZW50aXJlIEhpY2N1cCBmb3JtIHBhc3NlZCB0byB0aGUgY29tcG9uZW50LlwiXG4gIFt0aGlzXVxuICAoYXNzZXJ0LWNvbXBvbmVudCB0aGlzKVxuICAoY29tcC9nZXQtYXJndiB0aGlzKSlcblxuKGRlZm4gZG9tLW5vZGVcbiAgXCJSZXR1cm5zIHRoZSByb290IERPTSBub2RlIG9mIGEgbW91bnRlZCBjb21wb25lbnQuXCJcbiAgezpkZXByZWNhdGVkIFwiMC4xMC4wXCJ9XG4gIFt0aGlzXVxuICAoZG9tL2RvbS1ub2RlIHRoaXMpKVxuXG4oZGVmbiBjbGFzcy1uYW1lc1xuICBcIkZ1bmN0aW9uIHdoaWNoIG5vcm1hbGl6ZXMgYW5kIGNvbWJpbmVzIGNsYXNzIHZhbHVlcyB0byBhIHN0cmluZ1xuXG4gIFJlYWdlbnQgYWxsb3dzIGNsYXNzZXMgdG8gYmUgZGVmaW5lZCBhczpcbiAgLSBTdHJpbmdzXG4gIC0gTmFtZWQgb2JqZWN0cyAoU3ltYm9scyBvciBLZXl3b3JkcylcbiAgLSBDb2xsZWN0aW9ucyBvZiBwcmV2aW91cyB0eXBlc1wiXG4gIChbXSlcbiAgKFtjbGFzc10gKHV0aWwvY2xhc3MtbmFtZXMgY2xhc3MpKVxuICAoW2NsYXNzMSBjbGFzczJdICh1dGlsL2NsYXNzLW5hbWVzIGNsYXNzMSBjbGFzczIpKVxuICAoW2NsYXNzMSBjbGFzczIgJiBvdGhlcnNdIChhcHBseSB1dGlsL2NsYXNzLW5hbWVzIGNsYXNzMSBjbGFzczIgb3RoZXJzKSkpXG5cbihkZWZuIG1lcmdlLXByb3BzXG4gIFwiVXRpbGl0eSBmdW5jdGlvbiB0aGF0IG1lcmdlcyBzb21lIG1hcHMsIGhhbmRsaW5nIGA6Y2xhc3NgIGFuZCBgOnN0eWxlYC5cblxuICBUaGUgOmNsYXNzIHZhbHVlIGlzIGFsd2F5cyBub3JtYWxpemVkICh1c2luZyBgY2xhc3MtbmFtZXNgKSBldmVuIGlmIG5vXG4gIG1lcmdpbmcgaXMgZG9uZS5cIlxuICAoW10gKHV0aWwvbWVyZ2UtcHJvcHMpKVxuICAoW2RlZmF1bHRzXSAodXRpbC9tZXJnZS1wcm9wcyBkZWZhdWx0cykpXG4gIChbZGVmYXVsdHMgcHJvcHNdICh1dGlsL21lcmdlLXByb3BzIGRlZmF1bHRzIHByb3BzKSlcbiAgKFtkZWZhdWx0cyBwcm9wcyAmIG90aGVyc10gKGFwcGx5IHV0aWwvbWVyZ2UtcHJvcHMgZGVmYXVsdHMgcHJvcHMgb3RoZXJzKSkpXG5cbihkZWZuIGZsdXNoXG4gIFwiUmVuZGVyIGRpcnR5IGNvbXBvbmVudHMgaW1tZWRpYXRlbHkuXG5cbiAgTm90ZSB0aGF0IHRoaXMgbWF5IG5vdCB3b3JrIGluIGV2ZW50IGhhbmRsZXJzLCBzaW5jZSBSZWFjdC5qcyBkb2VzXG4gIGJhdGNoaW5nIG9mIHVwZGF0ZXMgdGhlcmUuXCJcbiAgW11cbiAgKGJhdGNoL2ZsdXNoKSlcblxuOzsgUmF0b21cblxuKGRlZm4gYXRvbVxuICBcIkxpa2UgY2xvanVyZS5jb3JlL2F0b20sIGV4Y2VwdCB0aGF0IGl0IGtlZXBzIHRyYWNrIG9mIGRlcmVmcy5cbiAgUmVhZ2VudCBjb21wb25lbnRzIHRoYXQgZGVyZWZzIG9uZSBvZiB0aGVzZSBhcmUgYXV0b21hdGljYWxseVxuICByZS1yZW5kZXJlZC5cIlxuICAoW3hdIChyYXRvbS9hdG9tIHgpKVxuICAoW3ggJiByZXN0XSAoYXBwbHkgcmF0b20vYXRvbSB4IHJlc3QpKSlcblxuKGRlZm4gdHJhY2tcbiAgXCJUYWtlcyBhIGZ1bmN0aW9uIGFuZCBvcHRpb25hbCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgZGVyZWZhYmxlXG4gIGNvbnRhaW5pbmcgdGhlIG91dHB1dCBvZiB0aGF0IGZ1bmN0aW9uLiBJZiB0aGUgZnVuY3Rpb24gZGVyZWZzXG4gIFJlYWdlbnQgYXRvbXMgKG9yIHRyYWNrLCBldGMpLCB0aGUgdmFsdWUgd2lsbCBiZSB1cGRhdGVkIHdoZW5ldmVyXG4gIHRoZSBhdG9tIGNoYW5nZXMuXG5cbiAgSW4gb3RoZXIgd29yZHMsIGBAKHRyYWNrIGZvbyBiYXIpYCB3aWxsIHByb2R1Y2UgdGhlIHNhbWUgcmVzdWx0XG4gIGFzIGAoZm9vIGJhcilgLCBidXQgZm9vIHdpbGwgb25seSBiZSBjYWxsZWQgYWdhaW4gd2hlbiB0aGUgYXRvbXMgaXRcbiAgZGVwZW5kcyBvbiBjaGFuZ2VzLCBhbmQgd2lsbCBvbmx5IHRyaWdnZXIgdXBkYXRlcyBvZiBjb21wb25lbnRzIHdoZW5cbiAgaXRzIHJlc3VsdCBjaGFuZ2VzLlxuXG4gIHRyYWNrIGlzIGxhenksIGkuZSB0aGUgZnVuY3Rpb24gaXMgb25seSBldmFsdWF0ZWQgb24gZGVyZWYuXCJcbiAgW2YgJiBhcmdzXVxuICB7OnByZSBbKGlmbj8gZildfVxuICAocmF0b20vbWFrZS10cmFjayBmIGFyZ3MpKVxuXG4oZGVmbiB0cmFjayFcbiAgXCJBbiBlYWdlciB2ZXJzaW9uIG9mIHRyYWNrLiBUaGUgZnVuY3Rpb24gcGFzc2VkIGlzIGNhbGxlZFxuICBpbW1lZGlhdGVseSwgYW5kIGNvbnRpbnVlcyB0byBiZSBjYWxsZWQgd2hlbiBuZWVkZWQsIHVudGlsIHN0b3BwZWRcbiAgd2l0aCBkaXNwb3NlIS5cIlxuICBbZiAmIGFyZ3NdXG4gIHs6cHJlIFsoaWZuPyBmKV19XG4gIChyYXRvbS9tYWtlLXRyYWNrISBmIGFyZ3MpKVxuXG4oZGVmbiBkaXNwb3NlIVxuICBcIlN0b3AgdGhlIHJlc3VsdCBvZiB0cmFjayEgZnJvbSB1cGRhdGluZy5cIlxuICBbeF1cbiAgKHJhdG9tL2Rpc3Bvc2UhIHgpKVxuXG4oZGVmbiB3cmFwXG4gIFwiUHJvdmlkZSBhIGNvbWJpbmF0aW9uIG9mIHZhbHVlIGFuZCBjYWxsYmFjaywgdGhhdCBsb29rcyBsaWtlIGFuIGF0b20uXG5cbiAgVGhlIGZpcnN0IGFyZ3VtZW50IGNhbiBiZSBhbnkgdmFsdWUsIHRoYXQgd2lsbCBiZSByZXR1cm5lZCB3aGVuIHRoZVxuICByZXN1bHQgaXMgZGVyZWYnZWQuXG5cbiAgVGhlIHNlY29uZCBhcmd1bWVudCBzaG91bGQgYmUgYSBmdW5jdGlvbiwgdGhhdCBpcyBjYWxsZWQgd2l0aCB0aGVcbiAgb3B0aW9uYWwgZXh0cmEgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHdyYXAsIGFuZCB0aGUgbmV3IHZhbHVlIG9mIHRoZVxuICByZXN1bHRpbmcgJ2F0b20nLlxuXG4gIFVzZSBmb3IgZXhhbXBsZSBsaWtlIHRoaXM6XG5cbiAgYGBgY2xqc1xuICAod3JhcCAoOmZvbyBAc3RhdGUpXG4gICAgICAgIHN3YXAhIHN0YXRlIGFzc29jIDpmb28pXG4gIGBgYFxuXG4gIFByb2JhYmx5IHVzZWZ1bCBvbmx5IGZvciBwYXNzaW5nIHRvIGNoaWxkIGNvbXBvbmVudHMuXCJcbiAgW3ZhbHVlIHJlc2V0LWZuICYgYXJnc11cbiAgKGFzc2VydC1jYWxsYWJsZSByZXNldC1mbilcbiAgKHJhdG9tL21ha2Utd3JhcHBlciB2YWx1ZSByZXNldC1mbiBhcmdzKSlcblxuXG47OyBSQ3Vyc29yXG5cbihkZWZuIGN1cnNvclxuICBcIlByb3ZpZGUgYSBjdXJzb3IgaW50byBhIFJlYWdlbnQgYXRvbS5cblxuICBCZWhhdmVzIGxpa2UgYSBSZWFnZW50IGF0b20gYnV0IGZvY3VzZXMgdXBkYXRlcyBhbmQgZGVyZWZzIHRvXG4gIHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoaW4gdGhlIHdyYXBwZWQgUmVhZ2VudCBhdG9tLiBlLmcuLFxuXG4gIGBgYGNsanNcbiAgKGxldCBbYyAoY3Vyc29yIHJhIFs6bmVzdGVkIDpjb250ZW50XSldXG4gICAgLi4uIEBjIDs7IGVxdWl2YWxlbnQgdG8gKGdldC1pbiBAcmEgWzpuZXN0ZWQgOmNvbnRlbnRdKVxuICAgIC4uLiAocmVzZXQhIGMgNDIpIDs7IGVxdWl2YWxlbnQgdG8gKHN3YXAhIHJhIGFzc29jLWluIFs6bmVzdGVkIDpjb250ZW50XSA0MilcbiAgICAuLi4gKHN3YXAhIGMgaW5jKSA7OyBlcXVpdmFsZW5jZSB0byAoc3dhcCEgcmEgdXBkYXRlLWluIFs6bmVzdGVkIDpjb250ZW50XSBpbmMpXG4gICAgKVxuICBgYGBcblxuICBUaGUgZmlyc3QgcGFyYW1ldGVyIGNhbiBhbHNvIGJlIGEgZnVuY3Rpb24sIHRoYXQgc2hvdWxkIGxvb2tcbiAgc29tZXRoaW5nIGxpa2UgdGhpczpcblxuICBgYGBjbGpzXG4gIChkZWZuIHNldC1nZXRcbiAgICAoW2tdIChnZXQtaW4gQHN0YXRlIGspKVxuICAgIChbayB2XSAoc3dhcCEgc3RhdGUgYXNzb2MtaW4gayB2KSkpXG4gIGBgYFxuXG4gIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIG9uZSBhcmd1bWVudCDigJMgdGhlIHBhdGggcGFzc2VkIHRvXG4gIGN1cnNvciDigJMgd2hlbiB0aGUgY3Vyc29yIGlzIGRlcmVmJ2VkLCBhbmQgdHdvIGFyZ3VtZW50cyAocGF0aCBhbmRcbiAgbmV3IHZhbHVlKSB3aGVuIHRoZSBjdXJzb3IgaXMgbW9kaWZpZWQuXG5cbiAgR2l2ZW4gdGhhdCBzZXQtZ2V0IGZ1bmN0aW9uLCAoYW5kIHRoYXQgc3RhdGUgaXMgYSBSZWFnZW50IGF0b20sIG9yXG4gIGFub3RoZXIgY3Vyc29yKSB0aGVzZSBjdXJzb3JzIGFyZSBlcXVpdmFsZW50OlxuICBgKGN1cnNvciBzdGF0ZSBbOmZvb10pYCBhbmQgYChjdXJzb3Igc2V0LWdldCBbOmZvb10pYC5cblxuICBOb3RlIHRoYXQgYSBjdXJzb3IgaXMgbGF6eTogaXRzIHZhbHVlIHdpbGwgbm90IGNoYW5nZSB1bnRpbCBpdCBpc1xuICB1c2VkLiBUaGlzIG1heSBiZSBub3RpY2VkIHdpdGggYWRkLXdhdGNoLlwiXG4gIChbc3JjIHBhdGhdXG4gICAocmF0b20vY3Vyc29yIHNyYyBwYXRoKSkpXG5cblxuOzsgVXRpbGl0aWVzXG5cbihkZWZuIHJzd2FwIVxuICBcIlN3YXBzIHRoZSB2YWx1ZSBvZiBhIHRvIGJlIGAoYXBwbHkgZiBjdXJyZW50LXZhbHVlLW9mLWF0b20gYXJncylgLlxuXG4gIHJzd2FwISB3b3JrcyBsaWtlIHN3YXAhLCBleGNlcHQgdGhhdCByZWN1cnNpdmUgY2FsbHMgdG8gcnN3YXAhIG9uXG4gIHRoZSBzYW1lIGF0b20gYXJlIGFsbG93ZWQg4oCTIGFuZCBpdCBhbHdheXMgcmV0dXJucyBuaWwuXCJcbiAgW2EgZiAmIGFyZ3NdXG4gIHs6cHJlIFsoc2F0aXNmaWVzPyBJQXRvbSBhKVxuICAgICAgICAgKGlmbj8gZildfVxuICAoaWYgKC4tcnN3YXBwaW5nIGEpXG4gICAgKC0+IChvciAoLi1yc3dhcGZzIGEpXG4gICAgICAgICAgICAoc2V0ISAoLi1yc3dhcGZzIGEpIChhcnJheSkpKVxuICAgICAgICAoLnB1c2ggIyhhcHBseSBmICUgYXJncykpKVxuICAgIChkbyAoc2V0ISAoLi1yc3dhcHBpbmcgYSkgdHJ1ZSlcbiAgICAgICAgKHRyeSAoc3dhcCEgYSAoZm4gW3N0YXRlXVxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvb3AgW3MgKGFwcGx5IGYgc3RhdGUgYXJncyldXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChpZi1zb21lIFtzZiAoc29tZS0+IGEgLi1yc3dhcGZzIC5zaGlmdCldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlY3VyIChzZiBzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzKSkpKVxuICAgICAgICAgICAgIChmaW5hbGx5XG4gICAgICAgICAgICAgICAoc2V0ISAoLi1yc3dhcHBpbmcgYSkgZmFsc2UpKSkpKVxuICBuaWwpXG5cbihkZWZuIG5leHQtdGlja1xuICBcIlJ1biBmIHVzaW5nIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBlcXVpdmFsZW50LlxuXG4gIGYgd2lsbCBiZSBjYWxsZWQganVzdCBiZWZvcmUgY29tcG9uZW50cyBhcmUgcmVuZGVyZWQuXCJcbiAgW2ZdXG4gIChiYXRjaC9kby1iZWZvcmUtZmx1c2ggZikpXG5cbihkZWZuIGFmdGVyLXJlbmRlclxuICBcIlJ1biBmIHVzaW5nIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBlcXVpdmFsZW50LlxuXG4gIGYgd2lsbCBiZSBjYWxsZWQganVzdCBhZnRlciBhbnkgcXVldWVkIHJlbmRlcnMgaW4gdGhlIG5leHQgYW5pbWF0aW9uXG4gIGZyYW1lIChhbmQgZXZlbiBpZiBubyByZW5kZXJzIGFjdHVhbGx5IG9jY3VyKS5cIlxuICBbZl1cbiAgKGJhdGNoL2RvLWFmdGVyLXJlbmRlciBmKSlcblxuKGRlZm4gcGFydGlhbFxuICBcIldvcmtzIGp1c3QgbGlrZSBjbG9qdXJlLmNvcmUvcGFydGlhbCwgYnV0IHRoZSByZXN1bHQgY2FuIGJlIGNvbXBhcmVkIHdpdGggPVwiXG4gIFtmICYgYXJnc11cbiAgKHV0aWwvbWFrZS1wYXJ0aWFsLWZuIGYgYXJncykpXG4iXX0=