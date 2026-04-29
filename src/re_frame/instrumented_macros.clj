(ns re-frame.instrumented-macros
  "Shared macros for the `re-frame.core-instrumented` and
   `re-frame.alpha-instrumented` namespaces. Lives in its own
   namespace (and as a `.clj` rather than a `.cljc`) because the
   CLJS analyzer needs `:require-macros` against a separate
   namespace to discover macros at expansion time — defmacro forms
   in the same `.cljc` file as their callers do not get picked up
   when the file is being analyzed for documentation generation
   with `*analyze-deps* false`.")

(defmacro defalias
  "Re-export a var from another namespace, copying its `:doc` and
   `:arglists` metadata onto the local var so the API doc generator
   sees the same documentation as the underlying var. Optional third
   arg sets `:api-docs/heading` for section grouping."
  ([sym target] `(defalias ~sym ~target nil))
  ([sym target heading]
   (let [target-meta (meta (find-var target))
         doc         (:doc target-meta)
         arglists    (:arglists target-meta)
         m           (cond-> {}
                       doc      (assoc :doc doc)
                       arglists (assoc :arglists (list 'quote arglists))
                       heading  (assoc :api-docs/heading heading))]
     `(def ~(with-meta sym m) ~target))))
