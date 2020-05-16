# Klipse

We use  [Klipse](https://github.com/viebel/klipse) on some of the pages in the website, so we can provide live coding. 

But, it turned out that this is not straightforward. 

## On The Page

Those markdown pages which require `klipse` should have the following metadata
placed at the top:

```
---
klipse: true
---
```

Klipse snippets need to use embedded `<code>` HTML markup in markdown so that
the appropriate class can be used for the Klipse library to identify the snippet
for evaluation.

For ClojureScript snippets use:
```
<code class="klipse-clojure">
(+ 40 2)
</code>
```

For Reagent snippets use:
```
<code class="klipse-reagent">
[some-view-fn]
</code>
```

## Configuration

`javascripts/klipse_config.js`
Config for Klipse.
Full reference at https://github.com/viebel/klipse#page-level-configuration

## Dependencies aka CLJS Analysis Cache

Klipse needs analysis cache and precompiled files provided at a known URL which
is configured by the page level setting `cached_ns_root`.

There are two distinct sets of files that need to be generated that use different
tooling:

1. namespaces bundled in [lumo](https://github.com/anmonteiro/lumo); e.g. `cljs.core`, `cljs.test`, `cljs.spec` etc.
2. namespaces not bundled in lumo or in other words library dependencies; e.g. `reagent`, `re-frame` etc.

[lumo](https://github.com/anmonteiro/lumo) is significant because it provides some customized versions of certain
core namespaces that are compatible with self-hosted ClojureScript.

Both 1. and 2. are executed via the [GitHub Actions docs workflow](https://github.com/day8/re-frame/blob/feature/mkdocs/.github/workflows/docs-workflow.yml).

These require specific tooling and versions thereof that have been built
into a [Dockerfile](https://github.com/superstructor/dockerfiles/blob/master/klipse/Dockerfile)
for use with GitHub Actions to build the cache files automatically.

The specific tools that are included are:
- [JDK](https://adoptopenjdk.net/index.html) 11
- [lumo](https://github.com/anmonteiro/lumo) 1.5.0 (newer releases do not work, yet)
- [planck](https://github.com/planck-repl/planck) 2.25.0 needs to be compiled from
  source as official binaries are only available for Ubuntu which results in large
  docker container sizes.
- [node.js](https://nodejs.org/en/) 12.16.x LTS
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- native build toolchain for npm to build native addons; e.g. gcc, make, g++ etc.
- [Clojure CLI tools](https://clojure.org/guides/getting_started)
- [Leiningen](https://leiningen.org/)

It is important to realise that the version of namespaces bundled with lumo will
be the versions depended on by that release of lumo. So to upgrade those namespaces
one needs to upgrade lumo in the [Dockerfile](https://github.com/superstructor/dockerfiles/blob/master/klipse/Dockerfile) 
then trigger the [GitHub Actions docs workflow](https://github.com/day8/re-frame/blob/feature/mkdocs/.github/workflows/docs-workflow.yml) 
in this repository to re-build the cache files. 

For anything else (e.g. re-frame) there are two files that must have a reference to the
dependency:
1. `docs/klipse/project.clj` specifies the artifact and version 
2. `docs/klipse/build-cljs-cache-for-lib-namespaces.cljs` must require the namespaces that
    you want to be built.

After committing and pushing the result [GitHub Actions docs workflow](https://github.com/day8/re-frame/blob/feature/mkdocs/.github/workflows/docs-workflow.yml) 
will build and deploy the cache files to GitHub Pages.

## NPM Dependencies aka React

Turns out, Planck is not actually compatible with vanilla NPM package require styles like
`(:require [react :as ...` which is used by recent releases of reagent. So when we upgraded reagent past
a certain point, cache files stopped being generated for Klipse.

Rather than write all the infrastructure to make that work, we preload React by including it in a normal
script tag then fool the compiler that it has been successfully required by providing empty cache files!
Surprisingly this madness actually works.

The scripts including React are in `docs/theme/main.html`.

The empty cache files that must exist are:
- `docs/klipse/cljs-cache/react.js`
- `docs/klipse/cljs-cache/react.cache.json`
- `docs/klipse/cljs-cache/react_dom.js`
- `docs/klipse/cljs-cache/react_dom.cache.json`

If we upgrade reagent we need to manually keep this React version in sync by changing the script tags!
