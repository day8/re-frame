(ns re-frame.config
  "Build-time configuration for re-frame.

   `version` is a runtime-readable string identifying the deployed
   re-frame artifact, so devtools, instrumentation, and version-floor
   enforcement (e.g. re-frame-pair's `read-version-of`) can detect what
   they're running against without parsing pom.xml at runtime.

   Under CLJS this is a `goog-define`. Apps embedding re-frame can
   override at build time via shadow-cljs `:closure-defines` to bake the
   resolved git-tag version into release artifacts:

       :closure-defines {re-frame.config/version :day8.dev/git-app-version}

   Under CLJ (JVM tests / SSR), the same name resolves to a hardcoded
   def kept current via the release process. Both sides keep the same
   default so unset/un-overridden builds still report a sensible
   string rather than empty/unknown.

   Modeled on `re-com.config/version` — the same shape so version-probe
   code can read both libraries with the same global-path lookup
   (`goog.global.<lib>.config.version`).")

#?(:clj  (def version "1.4.6")
   :cljs (goog-define version "1.4.6"))
