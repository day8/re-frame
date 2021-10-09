## Introduction 

This directory contains both the content and configuration for the re-frame website. 

The live, production copy of the re-frame website can be viewed here: 
https://day8.github.io/re-frame/

This document describes how the website is built and how to do work on it. 


## Built Using 

The re-frame website is largly built using a static site generator:
<https://squidfunk.github.io/mkdocs-material> which provides 
a [Material UI](https://material.io/) theme for the `mkdocs` static site generator.

The live re-frame website is built [via Github actions](https://github.com/day8/re-frame/blob/feature/mkdocs/.github/workflows/docs-workflow.yml)
which stitch together the docs, the API and the klipse artifacts.

## To Build Locally

For development purposes, you can get a hot reloading docs environment going via `docker` by using the following series of commands: 
```sh
git clone https://github.com/day8/re-frame.git
cd re-frame
```

Then build the API documentation (generally, just once):
```sh
cd docs/
clojure -m ns-to-markdown ../src/re_frame/core.cljc > api-re-frame.core.md 
```

Then switch back to the re-frame home directory to generate the rest of the docs. 
```sh
cd ..
```

If using PowerShell on Windows (and I'm told this is also the right commandline for Mac):
```sh
docker run --rm -it -p 8000:8000 -v "%cd%":/docs squidfunk/mkdocs-material:5.1.1
```
or, if you are using linux:
```sh
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material:5.1.1
```

Then, in your browser tab, load `http://localhost:8000/`. You should see the website Home page. 

You can now edit the markdown in `/docs` and your changes will be hot reloaded into the brower tab for inspection.


## Configuration

The main configuration file for the static site generator is:
`../mkdocs.yml`

In that file you can nominate navigation, fonts, extensions, etc.

## Look And Feel Adjustments 

We've made various modifications to the base template supplied by the theme ... 

Notably adds
- Google Font stylesheets
- klipse custom stylesheets and javascripts
- our own stylesheets for overriding some styles

`overrides/partials/footer.html`
Removes 'Made with Material for MkDocs' from footer.
Attribution in documentation, not footer.

`overrides/partials/nav.html`
Adds logo above left nav. (Deprecated?)

`overrides/main.html`
htmltitle block
Removes trailing dash in page title due to empty site name.

`stylesheets/re-frame.css`
Our own custom styles.

`stylesheets/codehilite-monokai.css`
Our own port of the monokai theme to codehilite.

`stylesheets/codemirror.css`
Copy of https://github.com/viebel/klipse/blob/57e5312e88425811183a838f63afd4a92077fada/dist/codemirror.css
with FiraCode removed.

Incls syntax highlighting 'theme' around lines ~100-130.

`javascripts/klipse_plugin.js`
Copy of https://github.com/viebel/klipse/blob/57e5312e88425811183a838f63afd4a92077fada/dist/klipse_plugin.js

## Using Klipse

On some pages we use klipse for live coding. 
See [`docs/klipse/README.md`](klipse/README.md).
