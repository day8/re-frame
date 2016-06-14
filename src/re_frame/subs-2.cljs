(ns re-frame.subs2
  (:require
    [cljs.spec :as s]
    [re-frame.subs     :as subs]
    [reagent.ratom     :as ratom
     :include-macros true]))

(s/def ::args (s/cat
                :sub-name   keyword?
                :sub-fn     (s/? fn?)
                :arrow-args (s/* (s/cat :key #{:<-} :val (s/* vector?)))
                :f          fn?))

(defn- fmap
  "Returns a new version of 'm' in which f has been applied to each value.
  (fmap inc {:a 4, :b 2}) => {:a 5, :b 3}"
  [f m]
  (into {} (for [[k val] m] [k (f val)])))

(defn- make-multi-map
  "takes a squence of keys and values and makes a multimap
  also removes the spec extra-values"
  [s]
  (-> s
      (->> (group-by first)
           (fmap #(->> %
                       (map second)
                       (map :val))))))

(defn- multi-deref
  "derefs a map sequence or a singleton"
  [data]
  (cond
    (map? data)  (fmap deref data)
    (coll? data) (map deref data)
    :else @data))

(defn register-pure
  "This fn allows the user to write a 'pure' subscription
  i.e. that is a subscription that operates on the values within app-db
  rather than the atom itself
  Note there are 3 ways this function can be called

    ```(register-pure
         :test-sub
         (fn [db [_]] db))```
  In this example the entire app-db is derefed and passed to the subscription
  function as a singleton

      ```(subs/register-pure
           :a-b-sub
           (fn [q-vec d-vec]
               [(subs/subscribe [:a-sub])
                (subs/subscribe [:b-sub])]
           (fn [[a b] [_]] {:a a :b b}))```
  In this example the the first function is called with the query vector
  and the dynamic vector as arguements the return value of this function
  can be singleton reaction or a list or map of reactions. Note that `q-vec`
  and `d-vec` can be destructured and used in the subscriptions (this is the point
  actually). Again the subscriptions are derefed and passed to the subscription
  function

      ```(subs/register-pure
           :a-b-sub
           :<- [:a-sub]
           :<- [:b-sub]
           (fn [[a b] [_]] {:a a :b b}))```
  In this example the convienent syntax of `:<-` is used to cover the majority
  of cases where only a simple subscription is needed without any parameters

  "
  [& args]
  (let [conform           (s/conform ::args args)
        {:keys [sub-name
                sub-fn
                arrow-args
                f]}       conform
        arrow-subs (->> arrow-args
                        (mapcat :val))]
    (cond
      sub-fn                   ;; first case the user provides a custom sub-fn
      (subs/register
         sub-name
         (fn [db q-vec d-vec]
           (let [subscriptions (sub-fn q-vec d-vec)]    ;; this let needs to be outside the fn
             (ratom/make-reaction
               (fn [] (f (multi-deref subscriptions) q-vec d-vec))))))
      arrow-args              ;; the user uses the :<- sugar
      (subs/register
         sub-name
         (fn [db q-vec d-vec]
           (let [subscriptions (map subs/subscribe arrow-subs)]    ;; this let needs to be outside the fn
             (ratom/make-reaction
               (fn [] (f (multi-deref subscriptions) q-vec d-vec))))))
      :else
      (subs/register ;; the simple case with no subs
         sub-name
         (fn [db q-vec d-vec]
           (ratom/make-reaction (fn [] (f @db q-vec d-vec))))))))

#_(s/fdef register-pure
        :args ::args)

#_(s/instrument #'register-pure)
