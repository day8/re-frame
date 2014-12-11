 (ns re-frame.history
   (:require-macros [reagent.ratom  :refer [reaction]]
                    [historian.core :refer [off-the-record]])
   (:require
     [reagent.core      :as r]
     [re-frame.db :refer [db]]
     [re-frame.handlers :refer [register-subscription register-handler]]
     [historian.core    :as    historian]
     ))


 ;; -- data  --------------------------------------------------------------------------------------

 (historian/record! db :db)
 (def undo-list (r/atom []))
 (def redo-list (r/atom []))
 (historian/replace-library!  undo-list)
 (historian/replace-prophecy! redo-list)

 (defn reset-history!
   "privileged protocol: should not be used by client code"
   []
   (historian/clear-history!)
   (historian/trigger-record!))


 ;; -- subscriptions  -----------------------------------------------------------------------------

 (register-subscription
   :undos?
   (fn
     [_ _]
     "answer true is anything is stored in the undo list"
     (reaction (> (count @undo-list) 1))))

 (register-subscription
   :redos?
   (fn
     [_ _]
     "answer true is anything is stored in the redo list"
     (reaction (> (count @redo-list) 0))))

 ;; -- event handlers  ----------------------------------------------------------------------------

 (register-handler
   :undo
   (fn
     [_ _]
     (historian/undo!))) ;; (dispatch [:undo])


 (register-handler
   :redo
   (fn
     [_ _]
     (historian/redo!))) ;; (dispatch [:undo])


  (register-handler
   :no-history-while
   (fn
     [db [_ mutation-fn]]
     (off-the-record
       (reset! db (mutation-fn @db)))))
