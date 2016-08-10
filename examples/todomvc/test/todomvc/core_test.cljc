(ns todomvc.core-test
  (:require #?(:cljs [cljs.test :refer-macros [deftest is]]
               :clj  [clojure.test :refer [deftest is]])
            [day8.re-frame.test :as rf-test]
            [re-frame.core :as rf]
            todomvc.db
            todomvc.events
            todomvc.subs))

(deftest basic--sync
  (rf-test/run-test-sync
    (rf/dispatch-sync [:initialise-db])

    (let [showing         (rf/subscribe [:showing])
          sorted-todos    (rf/subscribe [:sorted-todos])
          todos           (rf/subscribe [:todos])
          visible-todos   (rf/subscribe [:visible-todos])
          all-complete?   (rf/subscribe [:all-complete?])
          completed-count (rf/subscribe [:completed-count])
          footer-counts   (rf/subscribe [:footer-counts])]
      (is (= :all @showing))
      (is (empty? @sorted-todos))
      (is (empty? @todos))
      (is (empty? @visible-todos))
      (is (= false (boolean @all-complete?)))
      (is (= 0 @completed-count))
      (is (= [0 0] @footer-counts))

      (rf/dispatch [:add-todo "write first test"])
      (is (= 1 (count @todos) (count @visible-todos) (count @sorted-todos)))
      (is (= 0 @completed-count))
      (is (= [1 0] @footer-counts))
      (is (= {:id 1, :title "write first test", :done false}
             (first @todos)))

      (rf/dispatch [:add-todo "write second teXt"])
      (is (= 2 (count @todos) (count @visible-todos) (count @sorted-todos)))
      (is (= 0 @completed-count))
      (is (= [2 0] @footer-counts))
      (is (= {:id 2, :title "write second teXt", :done false}
             (second @todos)))

      (rf/dispatch [:save 2 "write second test"])
      (is (= 2 (count @todos) (count @visible-todos) (count @sorted-todos)))
      (is (= 0 @completed-count))
      (is (= [2 0] @footer-counts))
      (is (= {:id 2, :title "write second test", :done false}
             (second @todos)))

      (rf/dispatch [:toggle-done 1])
      (is (= 2 (count @todos) (count @visible-todos) (count @sorted-todos)))
      (is (= 1 @completed-count))
      (is (= [1 1] @footer-counts))
      (is (= {:id 1, :title "write first test", :done true}
             (first @todos)))

      (rf/dispatch [:set-showing :active])
      (is (= :active @showing))
      (is (= 2 (count @todos) (count @sorted-todos)))
      (is (= 1 (count @visible-todos)))
      (is (= 1 @completed-count))
      (is (= [1 1] @footer-counts))
      (is (= {:id 2, :title "write second test", :done false}
             (first @visible-todos)))

      (rf/dispatch [:set-showing :done])
      (is (= :done @showing))
      (is (= 2 (count @todos) (count @sorted-todos)))
      (is (= 1 (count @visible-todos)))
      (is (= 1 @completed-count))
      (is (= [1 1] @footer-counts))
      (is (= {:id 1, :title "write first test", :done true}
             (first @visible-todos)))

      (rf/dispatch [:toggle-done 2])
      (is (= true (boolean @all-complete?))))))


(deftest basic--async
  (rf-test/run-test-async
    (rf/dispatch-sync [:initialise-db])

    (let [showing         (rf/subscribe [:showing])
          sorted-todos    (rf/subscribe [:sorted-todos])
          todos           (rf/subscribe [:todos])
          visible-todos   (rf/subscribe [:visible-todos])
          all-complete?   (rf/subscribe [:all-complete?])
          completed-count (rf/subscribe [:completed-count])
          footer-counts   (rf/subscribe [:footer-counts])]
      (is (= :all @showing))
      (is (empty? @sorted-todos))
      (is (empty? @todos))
      (is (empty? @visible-todos))
      (is (= 0 @completed-count))

      (rf/dispatch [:add-todo "write first test"])
      (rf-test/wait-for [:add-todo]
        (is (= [{:id 1, :title "write first test", :done false}] @todos))

        (rf/dispatch [:add-todo "write second teXt"])
        (rf-test/wait-for [:add-todo]
          (is (= 2 (count @todos)))
          (is (= "write second teXt" (:title (second @todos))))

          (rf/dispatch [:save 2 "write second test"])
          (rf-test/wait-for [:save]
            (is (= "write second test" (:title (second @todos))))

            (rf/dispatch [:toggle-done 1])
            (rf-test/wait-for [:toggle-done]
              (is (= true (:done (first @todos))))

              (rf/dispatch [:set-showing :active])
              (rf-test/wait-for [:set-showing]
                (is (= :active @showing))
                (is (= 1 (count @visible-todos)))
                (is (= 1 @completed-count))
                (is (= {:id 2, :title "write second test", :done false}
                       (first @visible-todos)))

                (rf/dispatch [:set-showing :done])
                (rf-test/wait-for [:set-showing]
                  (is (= :done @showing))
                  (is (= 1 (count @visible-todos)))
                  (is (= {:id 1, :title "write first test", :done true}
                         (first @visible-todos))))))))))))
