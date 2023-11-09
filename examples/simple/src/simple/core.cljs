(ns simple.core
  (:require [reagent.dom.client :as rdc]
            [re-frame.core :as rf]
            [reagent.core :as r]))

(defonce root-container
  (rdc/create-root (js/document.getElementById "app")))

(rf/reg-sub :bar :-> :bar)
(rf/reg-sub :baz :-> :baz)
(rf/reg-sub :bar-or-baz? :-> :bar-or-baz?)

(rf/reg-sub :sub/bar
            :<- [:bar]
            (fn [bar _]
              (str "BAR " (gensym))))

(rf/reg-sub :sub/baz
            :<- [:baz]
            (fn [baz _]
              (str "BAZ " (gensym))))

(rf/reg-event-db
 :update
 (fn [db [_ & args]]
   (apply update db args)))

(defn bad-component
  [foo?]
  (if foo?
    @(rf/subscribe [:sub/bar])
    @(rf/subscribe [:sub/baz])))

(rf/reg-sub :foo :-> :foo)
(rf/reg-sub :boo :-> :boo)
(rf/reg-sub :sub/foo :<- [:foo] (fn [foo [_ n]] (* foo n)))

(defn another-bad-component
  [x]
  @(rf/subscribe [:sub/foo x]))

(def x (r/atom 0))
(def foo-backup (r/atom 0))

(defn ui []
  [:<>
   [:h1 "A bad component"]
   [:button {:on-click #(rf/dispatch [:update :bar-or-baz? not])}
    "Switch bar<->baz"]
   [:button {:on-click #(rf/dispatch [:update :bar not])} "Update bar!"]
   [:button {:on-click #(rf/dispatch [:update :baz not])} "Update baz!"]
   [bad-component @(rf/subscribe [:bar-or-baz?])]
   [:h1 "Another bad component"]
   [:button {:on-click #(swap! x inc)} "inc x"]
   [:button {:on-click #(do (rf/dispatch [:update :foo inc])
                            (swap! foo-backup inc))} "inc foo"]
   (str "x is " @x ". foo is " @foo-backup "...... " @x " times " @foo-backup " is ")
   [another-bad-component @x]])

(defn mount-ui
  []
  (rdc/render root-container [ui]))

(defn ^:dev/after-load clear-cache-and-render!
  []
  ;; The `:dev/after-load` metadata causes this function to be called
  ;; after shadow-cljs hot-reloads code. We force a UI update by clearing
  ;; the Reframe subscription cache.
  (rf/clear-subscription-cache!)
  (mount-ui))

(defn run               ;; Your app calls this when it starts. See shadow-cljs.edn :init-fn.
  []
  (mount-ui))                      ;; mount the application's ui into '<div id="app" />'
