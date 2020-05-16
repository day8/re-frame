goog.provide("clojure.zip");
/**
 * Creates a new zipper structure. 
 * 
 *   branch? is a fn that, given a node, returns true if can have
 *   children, even if it currently doesn't.
 * 
 *   children is a fn that, given a branch node, returns a seq of its
 *   children.
 * 
 *   make-node is a fn that, given an existing node and a seq of
 *   children, returns a new branch node with the supplied children.
 *   root is the root node.
 */
(function (){
clojure.zip.zipper = (function clojure$zip$zipper(branch_QMARK_,children,make_node,root){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root,null], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("zip","branch?","zip/branch?",(-998880862)),branch_QMARK_,new cljs.core.Keyword("zip","children","zip/children",(-940194589)),children,new cljs.core.Keyword("zip","make-node","zip/make-node",(1103800591)),make_node], null));
}); return (
new cljs.core.Var(function(){return clojure.zip.zipper;},new cljs.core.Symbol("clojure.zip","zipper","clojure.zip/zipper",(-571036006),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"zipper","zipper",(-1153741331),null),"clojure/zip.cljs",(13),(1),(18),(18),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"branch?","branch?",(641208520),null),new cljs.core.Symbol(null,"children","children",(699969545),null),new cljs.core.Symbol(null,"make-node","make-node",(-1550461835),null),new cljs.core.Symbol(null,"root","root",(1191874074),null)], null)),"Creates a new zipper structure. \n\n  branch? is a fn that, given a node, returns true if can have\n  children, even if it currently doesn't.\n\n  children is a fn that, given a branch node, returns a seq of its\n  children.\n\n  make-node is a fn that, given an existing node and a seq of\n  children, returns a new branch node with the supplied children.\n  root is the root node.",(cljs.core.truth_(clojure.zip.zipper)?clojure.zip.zipper.cljs$lang$test:null)])));})()
;
/**
 * Returns a zipper for nested sequences, given a root sequence
 */
(function (){
clojure.zip.seq_zip = (function clojure$zip$seq_zip(root){
return clojure.zip.zipper(cljs.core.seq_QMARK_,cljs.core.identity,(function (node,children){
return cljs.core.with_meta(children,cljs.core.meta(node));
}),root);
}); return (
new cljs.core.Var(function(){return clojure.zip.seq_zip;},new cljs.core.Symbol("clojure.zip","seq-zip","clojure.zip/seq-zip",(-395973642),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"seq-zip","seq-zip",(-2034709283),null),"clojure/zip.cljs",(14),(1),(34),(34),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"root","root",(1191874074),null)], null)),"Returns a zipper for nested sequences, given a root sequence",(cljs.core.truth_(clojure.zip.seq_zip)?clojure.zip.seq_zip.cljs$lang$test:null)])));})()
;
/**
 * Returns a zipper for nested vectors, given a root vector
 */
(function (){
clojure.zip.vector_zip = (function clojure$zip$vector_zip(root){
return clojure.zip.zipper(cljs.core.vector_QMARK_,cljs.core.seq,(function (node,children){
return cljs.core.with_meta(cljs.core.vec(children),cljs.core.meta(node));
}),root);
}); return (
new cljs.core.Var(function(){return clojure.zip.vector_zip;},new cljs.core.Symbol("clojure.zip","vector-zip","clojure.zip/vector-zip",(986730862),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"vector-zip","vector-zip",(1075131029),null),"clojure/zip.cljs",(17),(1),(42),(42),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"root","root",(1191874074),null)], null)),"Returns a zipper for nested vectors, given a root vector",(cljs.core.truth_(clojure.zip.vector_zip)?clojure.zip.vector_zip.cljs$lang$test:null)])));})()
;
/**
 * Returns a zipper for xml elements (as from xml/parse),
 *   given a root element
 */
(function (){
clojure.zip.xml_zip = (function clojure$zip$xml_zip(root){
return clojure.zip.zipper(cljs.core.complement(cljs.core.string_QMARK_),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.seq,new cljs.core.Keyword(null,"content","content",(15833224))),(function (node,children){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(node,new cljs.core.Keyword(null,"content","content",(15833224)),(function (){var and__22563__auto__ = children;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,children);
} else {
return and__22563__auto__;
}
})());
}),root);
}); return (
new cljs.core.Var(function(){return clojure.zip.xml_zip;},new cljs.core.Symbol("clojure.zip","xml-zip","clojure.zip/xml-zip",(-925187274),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"xml-zip","xml-zip",(-1566989793),null),"clojure/zip.cljs",(14),(1),(50),(50),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"root","root",(1191874074),null)], null)),"Returns a zipper for xml elements (as from xml/parse),\n  given a root element",(cljs.core.truth_(clojure.zip.xml_zip)?clojure.zip.xml_zip.cljs$lang$test:null)])));})()
;
/**
 * Returns the node at loc
 */
(function (){
clojure.zip.node = (function clojure$zip$node(loc){
return (loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((0)) : loc.call(null,(0)));
}); return (
new cljs.core.Var(function(){return clojure.zip.node;},new cljs.core.Symbol("clojure.zip","node","clojure.zip/node",(-1345203614),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"node","node",(-2073234571),null),"clojure/zip.cljs",(11),(1),(60),(60),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the node at loc",(cljs.core.truth_(clojure.zip.node)?clojure.zip.node.cljs$lang$test:null)])));})()
;
/**
 * Returns true if the node at loc is a branch
 */
(function (){
clojure.zip.branch_QMARK_ = (function clojure$zip$branch_QMARK_(loc){
return new cljs.core.Keyword("zip","branch?","zip/branch?",(-998880862)).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(loc)).call(null,clojure.zip.node(loc));
}); return (
new cljs.core.Var(function(){return clojure.zip.branch_QMARK_;},new cljs.core.Symbol("clojure.zip","branch?","clojure.zip/branch?",(-1006947869),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"branch?","branch?",(641208520),null),"clojure/zip.cljs",(14),(1),(64),(64),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns true if the node at loc is a branch",(cljs.core.truth_(clojure.zip.branch_QMARK_)?clojure.zip.branch_QMARK_.cljs$lang$test:null)])));})()
;
/**
 * Returns a seq of the children of node at loc, which must be a branch
 */
(function (){
clojure.zip.children = (function clojure$zip$children(loc){
if(cljs.core.truth_(clojure.zip.branch_QMARK_(loc))){
return new cljs.core.Keyword("zip","children","zip/children",(-940194589)).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(loc)).call(null,clojure.zip.node(loc));
} else {
throw "called children on a leaf node";
}
}); return (
new cljs.core.Var(function(){return clojure.zip.children;},new cljs.core.Symbol("clojure.zip","children","clojure.zip/children",(65376544),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"children","children",(699969545),null),"clojure/zip.cljs",(15),(1),(69),(69),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns a seq of the children of node at loc, which must be a branch",(cljs.core.truth_(clojure.zip.children)?clojure.zip.children.cljs$lang$test:null)])));})()
;
/**
 * Returns a new branch node, given an existing node and new
 *   children. The loc is only used to supply the constructor.
 */
(function (){
clojure.zip.make_node = (function clojure$zip$make_node(loc,node,children){
return new cljs.core.Keyword("zip","make-node","zip/make-node",(1103800591)).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(loc)).call(null,node,children);
}); return (
new cljs.core.Var(function(){return clojure.zip.make_node;},new cljs.core.Symbol("clojure.zip","make-node","clojure.zip/make-node",(-640223892),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"make-node","make-node",(-1550461835),null),"clojure/zip.cljs",(16),(1),(76),(76),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"node","node",(-2073234571),null),new cljs.core.Symbol(null,"children","children",(699969545),null)], null)),"Returns a new branch node, given an existing node and new\n  children. The loc is only used to supply the constructor.",(cljs.core.truth_(clojure.zip.make_node)?clojure.zip.make_node.cljs$lang$test:null)])));})()
;
/**
 * Returns a seq of nodes leading to this loc
 */
(function (){
clojure.zip.path = (function clojure$zip$path(loc){
return new cljs.core.Keyword(null,"pnodes","pnodes",(1739080565)).cljs$core$IFn$_invoke$arity$1((loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1))));
}); return (
new cljs.core.Var(function(){return clojure.zip.path;},new cljs.core.Symbol("clojure.zip","path","clojure.zip/path",(1758958974),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"path","path",(1452340359),null),"clojure/zip.cljs",(11),(1),(82),(82),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns a seq of nodes leading to this loc",(cljs.core.truth_(clojure.zip.path)?clojure.zip.path.cljs$lang$test:null)])));})()
;
/**
 * Returns a seq of the left siblings of this loc
 */
(function (){
clojure.zip.lefts = (function clojure$zip$lefts(loc){
return cljs.core.seq(new cljs.core.Keyword(null,"l","l",(1395893423)).cljs$core$IFn$_invoke$arity$1((loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1)))));
}); return (
new cljs.core.Var(function(){return clojure.zip.lefts;},new cljs.core.Symbol("clojure.zip","lefts","clojure.zip/lefts",(538689815),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"lefts","lefts",(1054400638),null),"clojure/zip.cljs",(12),(1),(87),(87),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns a seq of the left siblings of this loc",(cljs.core.truth_(clojure.zip.lefts)?clojure.zip.lefts.cljs$lang$test:null)])));})()
;
/**
 * Returns a seq of the right siblings of this loc
 */
(function (){
clojure.zip.rights = (function clojure$zip$rights(loc){
return new cljs.core.Keyword(null,"r","r",(-471384190)).cljs$core$IFn$_invoke$arity$1((loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1))));
}); return (
new cljs.core.Var(function(){return clojure.zip.rights;},new cljs.core.Symbol("clojure.zip","rights","clojure.zip/rights",(1361118051),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"rights","rights",(2003591322),null),"clojure/zip.cljs",(13),(1),(92),(92),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns a seq of the right siblings of this loc",(cljs.core.truth_(clojure.zip.rights)?clojure.zip.rights.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the leftmost child of the node at this loc, or
 *   nil if no children
 */
(function (){
clojure.zip.down = (function clojure$zip$down(loc){
if(cljs.core.truth_(clojure.zip.branch_QMARK_(loc))){
var vec__3651 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3651,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3651,(1),null);
var vec__3654 = clojure.zip.children(loc);
var seq__3655 = cljs.core.seq(vec__3654);
var first__3656 = cljs.core.first(seq__3655);
var seq__3655__$1 = cljs.core.next(seq__3655);
var c = first__3656;
var cnext = seq__3655__$1;
var cs = vec__3654;
if(cljs.core.truth_(cs)){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"pnodes","pnodes",(1739080565)),(cljs.core.truth_(path)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pnodes","pnodes",(1739080565)).cljs$core$IFn$_invoke$arity$1(path),node):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [node], null)),new cljs.core.Keyword(null,"ppath","ppath",(-1758182784)),path,new cljs.core.Keyword(null,"r","r",(-471384190)),cnext], null)], null),cljs.core.meta(loc));
} else {
return null;
}
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.down;},new cljs.core.Symbol("clojure.zip","down","clojure.zip/down",(1356031458),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"down","down",(-1089190199),null),"clojure/zip.cljs",(11),(1),(98),(98),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the leftmost child of the node at this loc, or\n  nil if no children",(cljs.core.truth_(clojure.zip.down)?clojure.zip.down.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the parent of the node at this loc, or nil if at
 *   the top
 */
(function (){
clojure.zip.up = (function clojure$zip$up(loc){
var vec__3662 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3662,(0),null);
var map__3665 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3662,(1),null);
var map__3665__$1 = ((((!((map__3665 == null)))?((((map__3665.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3665.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3665):map__3665);
var path = map__3665__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3665__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var ppath = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3665__$1,new cljs.core.Keyword(null,"ppath","ppath",(-1758182784)));
var pnodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3665__$1,new cljs.core.Keyword(null,"pnodes","pnodes",(1739080565)));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3665__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
var changed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3665__$1,new cljs.core.Keyword(null,"changed?","changed?",(-437828330)));
if(cljs.core.truth_(pnodes)){
var pnode = cljs.core.peek(pnodes);
return cljs.core.with_meta((cljs.core.truth_(changed_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.zip.make_node(loc,pnode,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(l,cljs.core.cons(node,r))),(function (){var and__22563__auto__ = ppath;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ppath,new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true);
} else {
return and__22563__auto__;
}
})()], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pnode,ppath], null)),cljs.core.meta(loc));
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.up;},new cljs.core.Symbol("clojure.zip","up","clojure.zip/up",(1006365229),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"up","up",(1370819414),null),"clojure/zip.cljs",(9),(1),(111),(111),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the parent of the node at this loc, or nil if at\n  the top",(cljs.core.truth_(clojure.zip.up)?clojure.zip.up.cljs$lang$test:null)])));})()
;
/**
 * zips all the way up and returns the root node, reflecting any
 *  changes.
 */
(function (){
clojure.zip.root = (function clojure$zip$root(loc){
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"end","end",(-268185958)),(loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1))))){
return clojure.zip.node(loc);
} else {
var p = clojure.zip.up(loc);
if(cljs.core.truth_(p)){
var G__3667 = p;
loc = G__3667;
continue;
} else {
return clojure.zip.node(loc);
}
}
break;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.root;},new cljs.core.Symbol("clojure.zip","root","clojure.zip/root",(-1119588559),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"root","root",(1191874074),null),"clojure/zip.cljs",(11),(1),(124),(124),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"zips all the way up and returns the root node, reflecting any\n changes.",(cljs.core.truth_(clojure.zip.root)?clojure.zip.root.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the right sibling of the node at this loc, or nil
 */
(function (){
clojure.zip.right = (function clojure$zip$right(loc){
var vec__3676 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3676,(0),null);
var map__3679 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3676,(1),null);
var map__3679__$1 = ((((!((map__3679 == null)))?((((map__3679.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3679.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3679):map__3679);
var path = map__3679__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3679__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var vec__3680 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3679__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
var seq__3681 = cljs.core.seq(vec__3680);
var first__3682 = cljs.core.first(seq__3681);
var seq__3681__$1 = cljs.core.next(seq__3681);
var r = first__3682;
var rnext = seq__3681__$1;
var rs = vec__3680;
if(cljs.core.truth_((function (){var and__22563__auto__ = path;
if(cljs.core.truth_(and__22563__auto__)){
return rs;
} else {
return and__22563__auto__;
}
})())){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [r,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(l,node),cljs.core.array_seq([new cljs.core.Keyword(null,"r","r",(-471384190)),rnext], 0))], null),cljs.core.meta(loc));
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.right;},new cljs.core.Symbol("clojure.zip","right","clojure.zip/right",(-1593586409),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"right","right",(1187949694),null),"clojure/zip.cljs",(12),(1),(135),(135),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the right sibling of the node at this loc, or nil",(cljs.core.truth_(clojure.zip.right)?clojure.zip.right.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the rightmost sibling of the node at this loc, or self
 */
(function (){
clojure.zip.rightmost = (function clojure$zip$rightmost(loc){
var vec__3689 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3689,(0),null);
var map__3692 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3689,(1),null);
var map__3692__$1 = ((((!((map__3692 == null)))?((((map__3692.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3692.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3692):map__3692);
var path = map__3692__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3692__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3692__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
if(cljs.core.truth_((function (){var and__22563__auto__ = path;
if(cljs.core.truth_(and__22563__auto__)){
return r;
} else {
return and__22563__auto__;
}
})())){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.last(r),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.conj,l,node,cljs.core.butlast(r)),cljs.core.array_seq([new cljs.core.Keyword(null,"r","r",(-471384190)),null], 0))], null),cljs.core.meta(loc));
} else {
return loc;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.rightmost;},new cljs.core.Symbol("clojure.zip","rightmost","clojure.zip/rightmost",(1799140158),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"rightmost","rightmost",(-1854156251),null),"clojure/zip.cljs",(16),(1),(142),(142),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the rightmost sibling of the node at this loc, or self",(cljs.core.truth_(clojure.zip.rightmost)?clojure.zip.rightmost.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the left sibling of the node at this loc, or nil
 */
(function (){
clojure.zip.left = (function clojure$zip$left(loc){
var vec__3699 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3699,(0),null);
var map__3702 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3699,(1),null);
var map__3702__$1 = ((((!((map__3702 == null)))?((((map__3702.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3702.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3702):map__3702);
var path = map__3702__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3702__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3702__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
if(cljs.core.truth_((function (){var and__22563__auto__ = path;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.seq(l);
} else {
return and__22563__auto__;
}
})())){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.peek(l),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.pop(l),cljs.core.array_seq([new cljs.core.Keyword(null,"r","r",(-471384190)),cljs.core.cons(node,r)], 0))], null),cljs.core.meta(loc));
} else {
return null;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.left;},new cljs.core.Symbol("clojure.zip","left","clojure.zip/left",(1740332703),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"left","left",(1241415590),null),"clojure/zip.cljs",(11),(1),(150),(150),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the left sibling of the node at this loc, or nil",(cljs.core.truth_(clojure.zip.left)?clojure.zip.left.cljs$lang$test:null)])));})()
;
/**
 * Returns the loc of the leftmost sibling of the node at this loc, or self
 */
(function (){
clojure.zip.leftmost = (function clojure$zip$leftmost(loc){
var vec__3709 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3709,(0),null);
var map__3712 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3709,(1),null);
var map__3712__$1 = ((((!((map__3712 == null)))?((((map__3712.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3712.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3712):map__3712);
var path = map__3712__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3712__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3712__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
if(cljs.core.truth_((function (){var and__22563__auto__ = path;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.seq(l);
} else {
return and__22563__auto__;
}
})())){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(l),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.PersistentVector.EMPTY,cljs.core.array_seq([new cljs.core.Keyword(null,"r","r",(-471384190)),cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.rest(l),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [node], null),cljs.core.array_seq([r], 0))], 0))], null),cljs.core.meta(loc));
} else {
return loc;
}
}); return (
new cljs.core.Var(function(){return clojure.zip.leftmost;},new cljs.core.Symbol("clojure.zip","leftmost","clojure.zip/leftmost",(-1791272498),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"leftmost","leftmost",(-1158121305),null),"clojure/zip.cljs",(15),(1),(157),(157),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns the loc of the leftmost sibling of the node at this loc, or self",(cljs.core.truth_(clojure.zip.leftmost)?clojure.zip.leftmost.cljs$lang$test:null)])));})()
;
/**
 * Inserts the item as the left sibling of the node at this loc,
 *  without moving
 */
(function (){
clojure.zip.insert_left = (function clojure$zip$insert_left(loc,item){
var vec__3719 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3719,(0),null);
var map__3722 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3719,(1),null);
var map__3722__$1 = ((((!((map__3722 == null)))?((((map__3722.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3722.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3722):map__3722);
var path = map__3722__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3722__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
if((path == null)){
throw "Insert at top";
} else {
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(l,item),cljs.core.array_seq([new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true], 0))], null),cljs.core.meta(loc));
}
}); return (
new cljs.core.Var(function(){return clojure.zip.insert_left;},new cljs.core.Symbol("clojure.zip","insert-left","clojure.zip/insert-left",(1476893044),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"insert-left","insert-left",(1917369949),null),"clojure/zip.cljs",(18),(1),(165),(165),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"item","item",(1889905329),null)], null)),"Inserts the item as the left sibling of the node at this loc,\n without moving",(cljs.core.truth_(clojure.zip.insert_left)?clojure.zip.insert_left.cljs$lang$test:null)])));})()
;
/**
 * Inserts the item as the right sibling of the node at this loc,
 *   without moving
 */
(function (){
clojure.zip.insert_right = (function clojure$zip$insert_right(loc,item){
var vec__3729 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3729,(0),null);
var map__3732 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3729,(1),null);
var map__3732__$1 = ((((!((map__3732 == null)))?((((map__3732.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3732.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3732):map__3732);
var path = map__3732__$1;
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3732__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
if((path == null)){
throw "Insert at top";
} else {
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"r","r",(-471384190)),cljs.core.cons(item,r),cljs.core.array_seq([new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true], 0))], null),cljs.core.meta(loc));
}
}); return (
new cljs.core.Var(function(){return clojure.zip.insert_right;},new cljs.core.Symbol("clojure.zip","insert-right","clojure.zip/insert-right",(194316302),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"insert-right","insert-right",(1842751767),null),"clojure/zip.cljs",(19),(1),(174),(174),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"item","item",(1889905329),null)], null)),"Inserts the item as the right sibling of the node at this loc,\n  without moving",(cljs.core.truth_(clojure.zip.insert_right)?clojure.zip.insert_right.cljs$lang$test:null)])));})()
;
/**
 * Replaces the node at this loc, without moving
 */
(function (){
clojure.zip.replace = (function clojure$zip$replace(loc,node){
var vec__3737 = loc;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3737,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3737,(1),null);
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(path,new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true)], null),cljs.core.meta(loc));
}); return (
new cljs.core.Var(function(){return clojure.zip.replace;},new cljs.core.Symbol("clojure.zip","replace","clojure.zip/replace",(413367034),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"replace","replace",(853943757),null),"clojure/zip.cljs",(14),(1),(183),(183),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"node","node",(-2073234571),null)], null)),"Replaces the node at this loc, without moving",(cljs.core.truth_(clojure.zip.replace)?clojure.zip.replace.cljs$lang$test:null)])));})()
;
/**
 * Replaces the node at this loc with the value of (f node args)
 */
(function (){
clojure.zip.edit = (function clojure$zip$edit(var_args){
var args__26430__auto__ = [];
var len__26427__auto___3743 = arguments.length;
var i__26428__auto___3744 = (0);
while(true){
if((i__26428__auto___3744 < len__26427__auto___3743)){
args__26430__auto__.push((arguments[i__26428__auto___3744]));

var G__3745 = (i__26428__auto___3744 + (1));
i__26428__auto___3744 = G__3745;
continue;
} else {
}
break;
}

var argseq__26431__auto__ = ((((2) < args__26430__auto__.length))?(new cljs.core.IndexedSeq(args__26430__auto__.slice((2)),(0),null)):null);
return clojure.zip.edit.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__26431__auto__);
}); return (
new cljs.core.Var(function(){return clojure.zip.edit;},new cljs.core.Symbol("clojure.zip","edit","clojure.zip/edit",(-442418038),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"edit","edit",(-1302639),null),"clojure/zip.cljs",(11),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(189),(189),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Replaces the node at this loc with the value of (f node args)",(cljs.core.truth_(clojure.zip.edit)?clojure.zip.edit.cljs$lang$test:null)])));})()
;

clojure.zip.edit.cljs$core$IFn$_invoke$arity$variadic = (function (loc,f,args){
return clojure.zip.replace(loc,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,clojure.zip.node(loc),args));
});

clojure.zip.edit.cljs$lang$maxFixedArity = (2);

clojure.zip.edit.cljs$lang$applyTo = (function (seq3740){
var G__3741 = cljs.core.first(seq3740);
var seq3740__$1 = cljs.core.next(seq3740);
var G__3742 = cljs.core.first(seq3740__$1);
var seq3740__$2 = cljs.core.next(seq3740__$1);
return clojure.zip.edit.cljs$core$IFn$_invoke$arity$variadic(G__3741,G__3742,seq3740__$2);
});

new cljs.core.Var(function(){return clojure.zip.edit;},new cljs.core.Symbol("clojure.zip","edit","clojure.zip/edit",(-442418038),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"edit","edit",(-1302639),null),"clojure/zip.cljs",(11),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(189),(189),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"args","args",(-1338879193),null)], null)),"Replaces the node at this loc with the value of (f node args)",(cljs.core.truth_(clojure.zip.edit)?clojure.zip.edit.cljs$lang$test:null)]));
/**
 * Inserts the item as the leftmost child of the node at this loc,
 *   without moving
 */
(function (){
clojure.zip.insert_child = (function clojure$zip$insert_child(loc,item){
return clojure.zip.replace(loc,clojure.zip.make_node(loc,clojure.zip.node(loc),cljs.core.cons(item,clojure.zip.children(loc))));
}); return (
new cljs.core.Var(function(){return clojure.zip.insert_child;},new cljs.core.Symbol("clojure.zip","insert-child","clojure.zip/insert-child",(-210602132),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"insert-child","insert-child",(347166277),null),"clojure/zip.cljs",(19),(1),(194),(194),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"item","item",(1889905329),null)], null)),"Inserts the item as the leftmost child of the node at this loc,\n  without moving",(cljs.core.truth_(clojure.zip.insert_child)?clojure.zip.insert_child.cljs$lang$test:null)])));})()
;
/**
 * Inserts the item as the rightmost child of the node at this loc,
 *   without moving
 */
(function (){
clojure.zip.append_child = (function clojure$zip$append_child(loc,item){
return clojure.zip.replace(loc,clojure.zip.make_node(loc,clojure.zip.node(loc),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(clojure.zip.children(loc),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [item], null))));
}); return (
new cljs.core.Var(function(){return clojure.zip.append_child;},new cljs.core.Symbol("clojure.zip","append-child","clojure.zip/append-child",(-1333956306),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"append-child","append-child",(-1707191801),null),"clojure/zip.cljs",(19),(1),(200),(200),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null),new cljs.core.Symbol(null,"item","item",(1889905329),null)], null)),"Inserts the item as the rightmost child of the node at this loc,\n  without moving",(cljs.core.truth_(clojure.zip.append_child)?clojure.zip.append_child.cljs$lang$test:null)])));})()
;
/**
 * Moves to the next loc in the hierarchy, depth-first. When reaching
 *   the end, returns a distinguished loc detectable via end?. If already
 *   at the end, stays there.
 */
(function (){
clojure.zip.next = (function clojure$zip$next(loc){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"end","end",(-268185958)),(loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1))))){
return loc;
} else {
var or__22603__auto__ = (function (){var and__22563__auto__ = clojure.zip.branch_QMARK_(loc);
if(cljs.core.truth_(and__22563__auto__)){
return clojure.zip.down(loc);
} else {
return and__22563__auto__;
}
})();
if(cljs.core.truth_(or__22603__auto__)){
return or__22603__auto__;
} else {
var or__22603__auto____$1 = clojure.zip.right(loc);
if(cljs.core.truth_(or__22603__auto____$1)){
return or__22603__auto____$1;
} else {
var p = loc;
while(true){
if(cljs.core.truth_(clojure.zip.up(p))){
var or__22603__auto____$2 = clojure.zip.right(clojure.zip.up(p));
if(cljs.core.truth_(or__22603__auto____$2)){
return or__22603__auto____$2;
} else {
var G__3746 = clojure.zip.up(p);
p = G__3746;
continue;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.zip.node(p),new cljs.core.Keyword(null,"end","end",(-268185958))], null);
}
break;
}
}
}
}
}); return (
new cljs.core.Var(function(){return clojure.zip.next;},new cljs.core.Symbol("clojure.zip","next","clojure.zip/next",(-1526224397),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"next","next",(1522830042),null),"clojure/zip.cljs",(11),(1),(206),(206),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Moves to the next loc in the hierarchy, depth-first. When reaching\n  the end, returns a distinguished loc detectable via end?. If already\n  at the end, stays there.",(cljs.core.truth_(clojure.zip.next)?clojure.zip.next.cljs$lang$test:null)])));})()
;
/**
 * Moves to the previous loc in the hierarchy, depth-first. If already
 *   at the root, returns nil.
 */
(function (){
clojure.zip.prev = (function clojure$zip$prev(loc){
var temp__21598__auto__ = clojure.zip.left(loc);
if(cljs.core.truth_(temp__21598__auto__)){
var lloc = temp__21598__auto__;
var loc__$1 = lloc;
while(true){
var temp__21598__auto____$1 = (function (){var and__22563__auto__ = clojure.zip.branch_QMARK_(loc__$1);
if(cljs.core.truth_(and__22563__auto__)){
return clojure.zip.down(loc__$1);
} else {
return and__22563__auto__;
}
})();
if(cljs.core.truth_(temp__21598__auto____$1)){
var child = temp__21598__auto____$1;
var G__3747 = clojure.zip.rightmost(child);
loc__$1 = G__3747;
continue;
} else {
return loc__$1;
}
break;
}
} else {
return clojure.zip.up(loc);
}
}); return (
new cljs.core.Var(function(){return clojure.zip.prev;},new cljs.core.Symbol("clojure.zip","prev","clojure.zip/prev",(-389017676),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"prev","prev",(43462301),null),"clojure/zip.cljs",(11),(1),(221),(221),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Moves to the previous loc in the hierarchy, depth-first. If already\n  at the root, returns nil.",(cljs.core.truth_(clojure.zip.prev)?clojure.zip.prev.cljs$lang$test:null)])));})()
;
/**
 * Returns true if loc represents the end of a depth-first walk
 */
(function (){
clojure.zip.end_QMARK_ = (function clojure$zip$end_QMARK_(loc){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"end","end",(-268185958)),(loc.cljs$core$IFn$_invoke$arity$1 ? loc.cljs$core$IFn$_invoke$arity$1((1)) : loc.call(null,(1))));
}); return (
new cljs.core.Var(function(){return clojure.zip.end_QMARK_;},new cljs.core.Symbol("clojure.zip","end?","clojure.zip/end?",(381053413),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"end?","end?",(217139918),null),"clojure/zip.cljs",(11),(1),(232),(232),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Returns true if loc represents the end of a depth-first walk",(cljs.core.truth_(clojure.zip.end_QMARK_)?clojure.zip.end_QMARK_.cljs$lang$test:null)])));})()
;
/**
 * Removes the node at loc, returning the loc that would have preceded
 *   it in a depth-first walk.
 */
(function (){
clojure.zip.remove = (function clojure$zip$remove(loc){
var vec__3753 = loc;
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3753,(0),null);
var map__3756 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__3753,(1),null);
var map__3756__$1 = ((((!((map__3756 == null)))?((((map__3756.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__3756.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__3756):map__3756);
var path = map__3756__$1;
var l = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3756__$1,new cljs.core.Keyword(null,"l","l",(1395893423)));
var ppath = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3756__$1,new cljs.core.Keyword(null,"ppath","ppath",(-1758182784)));
var pnodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3756__$1,new cljs.core.Keyword(null,"pnodes","pnodes",(1739080565)));
var rs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__3756__$1,new cljs.core.Keyword(null,"r","r",(-471384190)));
if((path == null)){
throw "Remove at top";
} else {
if((cljs.core.count(l) > (0))){
var loc__$1 = cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.peek(l),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(path,new cljs.core.Keyword(null,"l","l",(1395893423)),cljs.core.pop(l),cljs.core.array_seq([new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true], 0))], null),cljs.core.meta(loc));
while(true){
var temp__21598__auto__ = (function (){var and__22563__auto__ = clojure.zip.branch_QMARK_(loc__$1);
if(cljs.core.truth_(and__22563__auto__)){
return clojure.zip.down(loc__$1);
} else {
return and__22563__auto__;
}
})();
if(cljs.core.truth_(temp__21598__auto__)){
var child = temp__21598__auto__;
var G__3758 = clojure.zip.rightmost(child);
loc__$1 = G__3758;
continue;
} else {
return loc__$1;
}
break;
}
} else {
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.zip.make_node(loc,cljs.core.peek(pnodes),rs),(function (){var and__22563__auto__ = ppath;
if(cljs.core.truth_(and__22563__auto__)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ppath,new cljs.core.Keyword(null,"changed?","changed?",(-437828330)),true);
} else {
return and__22563__auto__;
}
})()], null),cljs.core.meta(loc));
}
}
}); return (
new cljs.core.Var(function(){return clojure.zip.remove;},new cljs.core.Symbol("clojure.zip","remove","clojure.zip/remove",(859584278),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[cljs.core.with_meta(new cljs.core.Symbol(null,"clojure.zip","clojure.zip",(1232047716),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",(1913296891)),"Functional hierarchical zipper, with navigation, editing,\n  and enumeration.  See Huet",new cljs.core.Keyword(null,"author","author",(2111686192)),"Rich Hickey"], null)),new cljs.core.Symbol(null,"remove","remove",(1509103113),null),"clojure/zip.cljs",(13),(1),(237),(237),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"loc","loc",(1056246626),null)], null)),"Removes the node at loc, returning the loc that would have preceded\n  it in a depth-first walk.",(cljs.core.truth_(clojure.zip.remove)?clojure.zip.remove.cljs$lang$test:null)])));})()
;
