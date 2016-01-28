(ns re-frame.test.undo
  (:require [cljs.test :refer-macros [is deftest]]
            [re-frame.undo :as undo]
            [re-frame.db :as db]
            [re-frame.core :as re-frame]))

(deftest test-undos
  ;; Create undo history
  (undo/set-max-undos! 5)
  (doseq [i (range 10)]
    (reset! db/app-db i)
    (undo/store-now! i))

  ;; Check the undo state is correct
  (is (undo/undos?))
  (is (not (undo/redos?)))
  (is (= [4 5 6 7 8 9] (undo/undo-explanations)))
  (is (= [5 6 7 8 9] @undo/undo-list))

  ;; Undo the actions
  (re-frame/dispatch-sync [:undo])
  (is (= @db/app-db 9))
  (is (undo/redos?))
  (re-frame/dispatch-sync [:undo])
  (is (= @db/app-db 8))
  (re-frame/dispatch-sync [:undo])
  (is (= @db/app-db 7))
  (re-frame/dispatch-sync [:undo])
  (is (= @db/app-db 6))
  (re-frame/dispatch-sync [:undo])
  (is (= @db/app-db 5))
  (is (not (undo/undos?)))
  (is (undo/redos?))

  ;; Redo them again
  (re-frame/dispatch-sync [:redo 5])
  (is (= @db/app-db 9))
  (is (not (undo/redos?)))
  (is (undo/undos?))
  (is (= [5 6 7 8 9] @undo/undo-list))

  ;; Clear history
  (undo/clear-history!)
  (is (not (undo/undos?)))
  (is (not (undo/redos?))))
