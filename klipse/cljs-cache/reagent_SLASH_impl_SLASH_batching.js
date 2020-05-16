// Compiled by ClojureScript 1.10.597
goog.provide("reagent.impl.batching");
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.batching !== 'undefined') && (typeof reagent.impl.batching.mount_count !== 'undefined')){
} else {
reagent.impl.batching.mount_count = (0);
}
reagent.impl.batching.next_mount_count = (function reagent$impl$batching$next_mount_count(){
return (reagent.impl.batching.mount_count = (reagent.impl.batching.mount_count + (1)));
});
reagent.impl.batching.fake_raf = (function reagent$impl$batching$fake_raf(f){
return setTimeout(f,(16));
});
reagent.impl.batching.next_tick = (((!(reagent.impl.util.is_client)))?reagent.impl.batching.fake_raf:(function (){var w = window;
var or__10112__auto__ = w.requestAnimationFrame;
if(cljs.core.truth_(or__10112__auto__)){
return or__10112__auto__;
} else {
var or__10112__auto____$1 = w.webkitRequestAnimationFrame;
if(cljs.core.truth_(or__10112__auto____$1)){
return or__10112__auto____$1;
} else {
var or__10112__auto____$2 = w.mozRequestAnimationFrame;
if(cljs.core.truth_(or__10112__auto____$2)){
return or__10112__auto____$2;
} else {
var or__10112__auto____$3 = w.msRequestAnimationFrame;
if(cljs.core.truth_(or__10112__auto____$3)){
return or__10112__auto____$3;
} else {
return reagent.impl.batching.fake_raf;
}
}
}
}
})());
reagent.impl.batching.compare_mount_order = (function reagent$impl$batching$compare_mount_order(c1,c2){
return (c1.cljsMountOrder - c2.cljsMountOrder);
});
reagent.impl.batching.run_queue = (function reagent$impl$batching$run_queue(a){
a.sort(reagent.impl.batching.compare_mount_order);

var n__12122__auto__ = a.length;
var i = (0);
while(true){
if((i < n__12122__auto__)){
var c_279 = (a[i]);
if(c_279.cljsIsDirty === true){
c_279.forceUpdate();
} else {
}

var G__280 = (i + (1));
i = G__280;
continue;
} else {
return null;
}
break;
}
});
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.batching !== 'undefined') && (typeof reagent.impl.batching.ratom_flush !== 'undefined')){
} else {
reagent.impl.batching.ratom_flush = (function reagent$impl$batching$ratom_flush(){
return null;
});
}
reagent.impl.batching.run_funs = (function reagent$impl$batching$run_funs(fs){
var n__12122__auto__ = fs.length;
var i = (0);
while(true){
if((i < n__12122__auto__)){
(fs[i]).call(null);

var G__281 = (i + (1));
i = G__281;
continue;
} else {
return null;
}
break;
}
});
reagent.impl.batching.enqueue = (function reagent$impl$batching$enqueue(queue,fs,f){
if(cljs.core.truth_(f)){
} else {
throw (new Error(["Assert failed: ",["Enqueued function"," must not be nil"].join(''),"\n","f"].join('')));
}

fs.push(f);

return queue.schedule();
});

/**
* @constructor
 * @implements {reagent.impl.batching.Object}
*/
reagent.impl.batching.RenderQueue = (function (scheduled_QMARK_){
this.scheduled_QMARK_ = scheduled_QMARK_;
});
(reagent.impl.batching.RenderQueue.prototype.flush_after_render = (function (){
var self__ = this;
var this$ = this;
var temp__9859__auto__ = this$.afterRender;
if((temp__9859__auto__ == null)){
return null;
} else {
var fs = temp__9859__auto__;
(this$.afterRender = null);

return reagent.impl.batching.run_funs.call(null,fs);
}
}));

(reagent.impl.batching.RenderQueue.prototype.queue_render = (function (c){
var self__ = this;
var this$ = this;
if((this$.componentQueue == null)){
(this$.componentQueue = []);
} else {
}

return reagent.impl.batching.enqueue.call(null,this$,this$.componentQueue,c);
}));

(reagent.impl.batching.RenderQueue.prototype.schedule = (function (){
var self__ = this;
var this$ = this;
if(self__.scheduled_QMARK_){
return null;
} else {
(self__.scheduled_QMARK_ = true);

return reagent.impl.batching.next_tick.call(null,(function (){
return this$.run_queues();
}));
}
}));

(reagent.impl.batching.RenderQueue.prototype.flush_before_flush = (function (){
var self__ = this;
var this$ = this;
var temp__9859__auto__ = this$.beforeFlush;
if((temp__9859__auto__ == null)){
return null;
} else {
var fs = temp__9859__auto__;
(this$.beforeFlush = null);

return reagent.impl.batching.run_funs.call(null,fs);
}
}));

(reagent.impl.batching.RenderQueue.prototype.flush_queues = (function (){
var self__ = this;
var this$ = this;
this$.flush_before_flush();

reagent.impl.batching.ratom_flush.call(null);

this$.flush_render();

return this$.flush_after_render();
}));

(reagent.impl.batching.RenderQueue.prototype.run_queues = (function (){
var self__ = this;
var this$ = this;
(self__.scheduled_QMARK_ = false);

return this$.flush_queues();
}));

(reagent.impl.batching.RenderQueue.prototype.add_before_flush = (function (f){
var self__ = this;
var this$ = this;
if((this$.beforeFlush == null)){
(this$.beforeFlush = []);
} else {
}

return reagent.impl.batching.enqueue.call(null,this$,this$.beforeFlush,f);
}));

(reagent.impl.batching.RenderQueue.prototype.add_after_render = (function (f){
var self__ = this;
var this$ = this;
if((this$.afterRender == null)){
(this$.afterRender = []);
} else {
}

return reagent.impl.batching.enqueue.call(null,this$,this$.afterRender,f);
}));

(reagent.impl.batching.RenderQueue.prototype.flush_render = (function (){
var self__ = this;
var this$ = this;
var temp__9859__auto__ = this$.componentQueue;
if((temp__9859__auto__ == null)){
return null;
} else {
var fs = temp__9859__auto__;
(this$.componentQueue = null);

return reagent.impl.batching.run_queue.call(null,fs);
}
}));

(reagent.impl.batching.RenderQueue.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"scheduled?","scheduled?",(579986609),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",(-1290361223)),new cljs.core.Symbol(null,"boolean","boolean",(-278886877),null),new cljs.core.Keyword(null,"mutable","mutable",(875778266)),true], null))], null);
}));

(reagent.impl.batching.RenderQueue.cljs$lang$type = true);

(reagent.impl.batching.RenderQueue.cljs$lang$ctorStr = "reagent.impl.batching/RenderQueue");

(reagent.impl.batching.RenderQueue.cljs$lang$ctorPrWriter = (function (this__11055__auto__,writer__11056__auto__,opt__11057__auto__){
return cljs.core._write.call(null,writer__11056__auto__,"reagent.impl.batching/RenderQueue");
}));

/**
 * Positional factory function for reagent.impl.batching/RenderQueue.
 */
reagent.impl.batching.__GT_RenderQueue = (function reagent$impl$batching$__GT_RenderQueue(scheduled_QMARK_){
return (new reagent.impl.batching.RenderQueue(scheduled_QMARK_));
});

if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.batching !== 'undefined') && (typeof reagent.impl.batching.render_queue !== 'undefined')){
} else {
reagent.impl.batching.render_queue = reagent.impl.batching.__GT_RenderQueue.call(null,false);
}
reagent.impl.batching.flush = (function reagent$impl$batching$flush(){
return reagent.impl.batching.render_queue.flush_queues();
});
reagent.impl.batching.flush_after_render = (function reagent$impl$batching$flush_after_render(){
return reagent.impl.batching.render_queue.flush_after_render();
});
reagent.impl.batching.queue_render = (function reagent$impl$batching$queue_render(c){
if(cljs.core.truth_(c.cljsIsDirty)){
return null;
} else {
(c.cljsIsDirty = true);

return reagent.impl.batching.render_queue.queue_render(c);
}
});
reagent.impl.batching.mark_rendered = (function reagent$impl$batching$mark_rendered(c){
return (c.cljsIsDirty = false);
});
reagent.impl.batching.do_before_flush = (function reagent$impl$batching$do_before_flush(f){
return reagent.impl.batching.render_queue.add_before_flush(f);
});
reagent.impl.batching.do_after_render = (function reagent$impl$batching$do_after_render(f){
return reagent.impl.batching.render_queue.add_after_render(f);
});
reagent.impl.batching.schedule = (function reagent$impl$batching$schedule(){
if(reagent.impl.batching.render_queue.scheduled_QMARK_ === false){
return reagent.impl.batching.render_queue.schedule();
} else {
return null;
}
});

//# sourceURL=reagent/impl/batching.js
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZ2VudC9pbXBsL2JhdGNoaW5nLmpzIiwic291cmNlcyI6WyJiYXRjaGluZy5jbGpzIl0sImxpbmVDb3VudCI6MjY1LCJtYXBwaW5ncyI6IjtBQU9BLEdBQUEsUUFBQUEsb0NBQUFDLHlDQUFBQyxrREFBQUM7QUFBQTtBQUFBLEFBQUEsb0NBQUEscENBQVNDOztBQUVULHlDQUFBLHpDQUFNQztBQUFOLEFBQ0UsUUFBTUQsb0NBQVkscUNBQUEscENBQUtBOztBQUV6QixpQ0FBQSxqQ0FBTUUsMEVBQVVDO0FBQWhCLEFBQ0Usb0JBQUEsYkFBQ0MsV0FBY0Q7O0FBRWpCLEFBQUtFLGtDQUNILEVBQUEsR0FBUUMsK0JBQ05KLCtCQUNBLGlCQUFNSyxJQUFFQztBQUFSLEFBQ0UsSUFBQUMsb0JBQUksQUFBeUJGO0FBQTdCLEFBQUEsb0JBQUFFO0FBQUFBOztBQUFBLElBQUFBLHdCQUNJLEFBQStCRjtBQURuQyxBQUFBLG9CQUFBRTtBQUFBQTs7QUFBQSxJQUFBQSx3QkFFSSxBQUE0QkY7QUFGaEMsQUFBQSxvQkFBQUU7QUFBQUE7O0FBQUEsSUFBQUEsd0JBR0ksQUFBMkJGO0FBSC9CLEFBQUEsb0JBQUFFO0FBQUFBOztBQUlJUDs7Ozs7O0FBRVYsNENBQUEsNUNBQU1RLGdHQUNFQyxHQUFRQztBQURoQixBQUVFLFFBQUcsQUFBa0JELG9CQUNsQixBQUFrQkM7O0FBRXZCLGtDQUFBLGxDQUFNQyw0RUFBV0M7QUFBakIsQUFHRSxBQUFPQSxPQUFFSjs7QUFDVCxJQUFBSyxtQkFBWSxBQUFTRDtBQUFyQixBQUFBLFFBQUEsSkFBVUU7O0FBQVYsQUFBQSxHQUFBLEtBQUFELEpBQVVDO0FBQVYsQUFDRSxJQUEwQkMsUUFBRSxDQUFNSCxFQUFFRTtBQUFwQyxBQUNFLEdBQU0sQUFBTyxBQUFlQztBQUE1QixBQUNFLEFBQWNBOztBQURoQjs7QUFGSixhQUFBLEtBQUEsSkFBVUQ7Ozs7QUFBVjs7Ozs7QUFPRixHQUFBLFFBQUFwQixvQ0FBQUMseUNBQUFDLGtEQUFBb0I7QUFB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QVVROzs7O0FBbENqQixDQUFBLDZDQUFBLDdDQUFTUTtBQUFULEFBQUEsQUFBQTs7O0FBQUEsQ0FBQSxtREFBQSxuREFBU0E7O0FBQVQsQ0FBQSxzREFBQSx0REFBU0E7O0FBQVQsQ0FBQSwyREFBQSxXQUFBSixvQkFBQUMsc0JBQUFDLGhIQUFTRTtBQUFULEFBQUEsT0FBQUQsMkJBQUFGLHNCQUFBOzs7QUFBQTs7O3lDQUFBLHpDQUFTSSwwRkFBZ0NDO0FBQXpDLEFBQUEsWUFBQUYsa0NBQXlDRTs7O0FBQWhDRixBQStDVCxHQUFBLFFBQUFqQyxvQ0FBQUMseUNBQUFDLGtEQUFBb0M7QUFBQTtBQUFBLEFBQUEsQUFBU0MscUNBQWEsaURBQUEsakRBQUNMOztBQUV2Qiw4QkFBQSw5QkFBTU07QUFBTixBQUNFLE9BQWVEOztBQUVqQiwyQ0FBQSwzQ0FBTUU7QUFBTixBQUNFLE9BQXFCRjs7QUFFdkIscUNBQUEsckNBQU1HLGtGQUFtQnJCO0FBQXpCLEFBQ0Usb0JBQVUsQUFBZUE7QUFBekI7O0FBQUEsQUFDRSxpQkFBQSxoQkFBTSxBQUFlQTs7QUFDckIsT0FBZWtCLGdEQUFhbEI7OztBQUVoQyxzQ0FBQSx0Q0FBTXNCLG9GQUFvQnRCO0FBQTFCLEFBQ0Usd0JBQUEsaEJBQU0sQUFBZUE7O0FBRXZCLHdDQUFBLHhDQUFNdUIsd0ZBQWlCckM7QUFBdkIsQUFDRSxPQUFtQmdDLG9EQUFhaEM7O0FBRWxDLHdDQUFBLHhDQUFNc0Msd0ZBQWlCdEM7QUFBdkIsQUFDRSxPQUFtQmdDLG9EQUFhaEM7O0FBRWxDLGlDQUFBLGpDQUFNdUM7QUFBTixBQUNFLEdBQU0sQUFBUSxBQUFjUDtBQUE1QixBQUNFLE9BQVdBOztBQURiIiwibmFtZXMiOlsianMvcmVhZ2VudCIsImpzL3JlYWdlbnQuaW1wbCIsImpzL3JlYWdlbnQuaW1wbC5iYXRjaGluZyIsImpzL3JlYWdlbnQuaW1wbC5iYXRjaGluZy5tb3VudC1jb3VudCIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9tb3VudC1jb3VudCIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9uZXh0LW1vdW50LWNvdW50IiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2Zha2UtcmFmIiwiZiIsImpzL3NldFRpbWVvdXQiLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvbmV4dC10aWNrIiwicmVhZ2VudC5pbXBsLnV0aWwvaXMtY2xpZW50IiwidyIsImpzL3dpbmRvdyIsIm9yX18xMDExMl9fYXV0b19fIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2NvbXBhcmUtbW91bnQtb3JkZXIiLCJjMSIsImMyIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL3J1bi1xdWV1ZSIsImEiLCJuX18xMjEyMl9fYXV0b19fIiwiaSIsImMiLCJqcy9yZWFnZW50LmltcGwuYmF0Y2hpbmcucmF0b20tZmx1c2giLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvcmF0b20tZmx1c2giLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvcnVuLWZ1bnMiLCJmcyIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9lbnF1ZXVlIiwicXVldWUiLCJqcy9FcnJvciIsInRoaXNfXzExMDU1X19hdXRvX18iLCJ3cml0ZXJfXzExMDU2X19hdXRvX18iLCJvcHRfXzExMDU3X19hdXRvX18iLCJjbGpzLmNvcmUvLXdyaXRlIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL1JlbmRlclF1ZXVlIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nLy0+UmVuZGVyUXVldWUiLCJzY2hlZHVsZWQ/IiwidGhpcyIsInRlbXBfXzk4NTlfX2F1dG9fXyIsImpzL3JlYWdlbnQuaW1wbC5iYXRjaGluZy5yZW5kZXItcXVldWUiLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvcmVuZGVyLXF1ZXVlIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2ZsdXNoIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL2ZsdXNoLWFmdGVyLXJlbmRlciIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9xdWV1ZS1yZW5kZXIiLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvbWFyay1yZW5kZXJlZCIsInJlYWdlbnQuaW1wbC5iYXRjaGluZy9kby1iZWZvcmUtZmx1c2giLCJyZWFnZW50LmltcGwuYmF0Y2hpbmcvZG8tYWZ0ZXItcmVuZGVyIiwicmVhZ2VudC5pbXBsLmJhdGNoaW5nL3NjaGVkdWxlIl0sInNvdXJjZXNDb250ZW50IjpbIihucyByZWFnZW50LmltcGwuYmF0Y2hpbmdcbiAgKDpyZWZlci1jbG9qdXJlIDpleGNsdWRlIFtmbHVzaF0pXG4gICg6cmVxdWlyZSBbcmVhZ2VudC5kZWJ1ZyA6cmVmZXItbWFjcm9zIFthc3NlcnQtc29tZV1dXG4gICAgICAgICAgICBbcmVhZ2VudC5pbXBsLnV0aWwgOnJlZmVyIFtpcy1jbGllbnRdXSkpXG5cbjs7OyBVcGRhdGUgYmF0Y2hpbmdcblxuKGRlZm9uY2UgbW91bnQtY291bnQgMClcblxuKGRlZm4gbmV4dC1tb3VudC1jb3VudCBbXVxuICAoc2V0ISBtb3VudC1jb3VudCAoaW5jIG1vdW50LWNvdW50KSkpXG5cbihkZWZuIGZha2UtcmFmIFtmXVxuICAoanMvc2V0VGltZW91dCBmIDE2KSlcblxuKGRlZiBuZXh0LXRpY2tcbiAgKGlmLW5vdCBpcy1jbGllbnRcbiAgICBmYWtlLXJhZlxuICAgIChsZXQgW3cganMvd2luZG93XVxuICAgICAgKG9yICguLXJlcXVlc3RBbmltYXRpb25GcmFtZSB3KVxuICAgICAgICAgICguLXdlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB3KVxuICAgICAgICAgICguLW1velJlcXVlc3RBbmltYXRpb25GcmFtZSB3KVxuICAgICAgICAgICguLW1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHcpXG4gICAgICAgICAgZmFrZS1yYWYpKSkpXG5cbihkZWZuIGNvbXBhcmUtbW91bnQtb3JkZXJcbiAgW15jbGogYzEgXmNsaiBjMl1cbiAgKC0gKC4tY2xqc01vdW50T3JkZXIgYzEpXG4gICAgICguLWNsanNNb3VudE9yZGVyIGMyKSkpXG5cbihkZWZuIHJ1bi1xdWV1ZSBbYV1cbiAgOzsgc29ydCBjb21wb25lbnRzIGJ5IG1vdW50IG9yZGVyLCB0byBtYWtlIHN1cmUgcGFyZW50c1xuICA7OyBhcmUgcmVuZGVyZWQgYmVmb3JlIGNoaWxkcmVuXG4gICguc29ydCBhIGNvbXBhcmUtbW91bnQtb3JkZXIpXG4gIChkb3RpbWVzIFtpIChhbGVuZ3RoIGEpXVxuICAgIChsZXQgW15qcy9SZWFjdC5Db21wb25lbnQgYyAoYWdldCBhIGkpXVxuICAgICAgKHdoZW4gKHRydWU/ICguLWNsanNJc0RpcnR5IGMpKVxuICAgICAgICAoLmZvcmNlVXBkYXRlIGMpKSkpKVxuXG5cbjs7IFNldCBmcm9tIHJhdG9tLmNsanNcbihkZWZvbmNlIHJhdG9tLWZsdXNoIChmbiBbXSkpXG5cbihkZWZuIHJ1bi1mdW5zIFtmc11cbiAgKGRvdGltZXMgW2kgKGFsZW5ndGggZnMpXVxuICAgICgoYWdldCBmcyBpKSkpKVxuXG4oZGVmbiBlbnF1ZXVlIFteY2xqIHF1ZXVlIGZzIGZdXG4gIChhc3NlcnQtc29tZSBmIFwiRW5xdWV1ZWQgZnVuY3Rpb25cIilcbiAgKC5wdXNoIGZzIGYpXG4gICguc2NoZWR1bGUgcXVldWUpKVxuXG4oZGVmdHlwZSBSZW5kZXJRdWV1ZSBbXjptdXRhYmxlIF5ib29sZWFuIHNjaGVkdWxlZD9dXG4gIE9iamVjdFxuICAoc2NoZWR1bGUgW3RoaXNdXG4gICAgKHdoZW4tbm90IHNjaGVkdWxlZD9cbiAgICAgIChzZXQhIHNjaGVkdWxlZD8gdHJ1ZSlcbiAgICAgIChuZXh0LXRpY2sgIygucnVuLXF1ZXVlcyB0aGlzKSkpKVxuXG4gIChxdWV1ZS1yZW5kZXIgW3RoaXMgY11cbiAgICAod2hlbiAobmlsPyAoLi1jb21wb25lbnRRdWV1ZSB0aGlzKSlcbiAgICAgIChzZXQhICguLWNvbXBvbmVudFF1ZXVlIHRoaXMpIChhcnJheSkpKVxuICAgIChlbnF1ZXVlIHRoaXMgKC4tY29tcG9uZW50UXVldWUgdGhpcykgYykpXG5cbiAgKGFkZC1iZWZvcmUtZmx1c2ggW3RoaXMgZl1cbiAgICAod2hlbiAobmlsPyAoLi1iZWZvcmVGbHVzaCB0aGlzKSlcbiAgICAgIChzZXQhICguLWJlZm9yZUZsdXNoIHRoaXMpIChhcnJheSkpKVxuICAgIChlbnF1ZXVlIHRoaXMgKC4tYmVmb3JlRmx1c2ggdGhpcykgZikpXG5cbiAgKGFkZC1hZnRlci1yZW5kZXIgW3RoaXMgZl1cbiAgICAod2hlbiAobmlsPyAoLi1hZnRlclJlbmRlciB0aGlzKSlcbiAgICAgIChzZXQhICguLWFmdGVyUmVuZGVyIHRoaXMpIChhcnJheSkpKVxuICAgIChlbnF1ZXVlIHRoaXMgKC4tYWZ0ZXJSZW5kZXIgdGhpcykgZikpXG5cbiAgKHJ1bi1xdWV1ZXMgW3RoaXNdXG4gICAgKHNldCEgc2NoZWR1bGVkPyBmYWxzZSlcbiAgICAoLmZsdXNoLXF1ZXVlcyB0aGlzKSlcblxuICAoZmx1c2gtYmVmb3JlLWZsdXNoIFt0aGlzXVxuICAgICh3aGVuLXNvbWUgW2ZzICguLWJlZm9yZUZsdXNoIHRoaXMpXVxuICAgICAgKHNldCEgKC4tYmVmb3JlRmx1c2ggdGhpcykgbmlsKVxuICAgICAgKHJ1bi1mdW5zIGZzKSkpXG5cbiAgKGZsdXNoLXJlbmRlciBbdGhpc11cbiAgICAod2hlbi1zb21lIFtmcyAoLi1jb21wb25lbnRRdWV1ZSB0aGlzKV1cbiAgICAgIChzZXQhICguLWNvbXBvbmVudFF1ZXVlIHRoaXMpIG5pbClcbiAgICAgIChydW4tcXVldWUgZnMpKSlcblxuICAoZmx1c2gtYWZ0ZXItcmVuZGVyIFt0aGlzXVxuICAgICh3aGVuLXNvbWUgW2ZzICguLWFmdGVyUmVuZGVyIHRoaXMpXVxuICAgICAgKHNldCEgKC4tYWZ0ZXJSZW5kZXIgdGhpcykgbmlsKVxuICAgICAgKHJ1bi1mdW5zIGZzKSkpXG5cbiAgKGZsdXNoLXF1ZXVlcyBbdGhpc11cbiAgICAoLmZsdXNoLWJlZm9yZS1mbHVzaCB0aGlzKVxuICAgIChyYXRvbS1mbHVzaClcbiAgICAoLmZsdXNoLXJlbmRlciB0aGlzKVxuICAgICguZmx1c2gtYWZ0ZXItcmVuZGVyIHRoaXMpKSlcblxuKGRlZm9uY2UgcmVuZGVyLXF1ZXVlICgtPlJlbmRlclF1ZXVlIGZhbHNlKSlcblxuKGRlZm4gZmx1c2ggW11cbiAgKC5mbHVzaC1xdWV1ZXMgcmVuZGVyLXF1ZXVlKSlcblxuKGRlZm4gZmx1c2gtYWZ0ZXItcmVuZGVyIFtdXG4gICguZmx1c2gtYWZ0ZXItcmVuZGVyIHJlbmRlci1xdWV1ZSkpXG5cbihkZWZuIHF1ZXVlLXJlbmRlciBbXmNsaiBjXVxuICAod2hlbi1ub3QgKC4tY2xqc0lzRGlydHkgYylcbiAgICAoc2V0ISAoLi1jbGpzSXNEaXJ0eSBjKSB0cnVlKVxuICAgICgucXVldWUtcmVuZGVyIHJlbmRlci1xdWV1ZSBjKSkpXG5cbihkZWZuIG1hcmstcmVuZGVyZWQgW15jbGogY11cbiAgKHNldCEgKC4tY2xqc0lzRGlydHkgYykgZmFsc2UpKVxuXG4oZGVmbiBkby1iZWZvcmUtZmx1c2ggW2ZdXG4gICguYWRkLWJlZm9yZS1mbHVzaCByZW5kZXItcXVldWUgZikpXG5cbihkZWZuIGRvLWFmdGVyLXJlbmRlciBbZl1cbiAgKC5hZGQtYWZ0ZXItcmVuZGVyIHJlbmRlci1xdWV1ZSBmKSlcblxuKGRlZm4gc2NoZWR1bGUgW11cbiAgKHdoZW4gKGZhbHNlPyAoLi1zY2hlZHVsZWQ/IHJlbmRlci1xdWV1ZSkpXG4gICAgKC5zY2hlZHVsZSByZW5kZXItcXVldWUpKSlcbiJdfQ==