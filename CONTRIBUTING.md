# Contributing to re-frame

Thank you for taking the time to contribute!

## Support questions

The Github issues are for bug reports and feature requests only. Support requests and usage
questions should go to the re-frame [Clojure Slack channel](http://clojurians.net) or
the [ClojureScript mailing list](https://groups.google.com/forum/#!forum/clojurescript).

## Pull requests

**Create pull requests to the master branch.**

## Running tests

#### Via Browser/HTML

To build the tests and run them in one step, just:
```sh
lein test-once  # compiles & then opens test.html in the browser
```

You can also get auto compiles via:
```sh
lein test-auto
```
but you'll need to manually open `test/test.html` in a browser. And you'll also need to 
manually reload this page after each auto compile.

#### Via Karma

To run the tests, you must have recent versions of node, npm, Leiningen, and a C++ compiler 
toolchain installed. If you're on Linux or Mac OS X then you will be fine, 
if you're on Windows then you need to install Visual Studio Community Edition, 
and the C++ compiler dependencies.

```sh
npm install karma-cli -g # Install the Karma CLI runner
lein deps       # runs lein-npm, installs Karma & other node dependencies. Only needed the first time.
lein karma-once # to build re-frame tests
karma start     # to run the tests with an auto watcher
```

## Pull requests for bugs

If possible provide:

* Code that fixes the bug
* Failing tests which pass with the new changes
* Improvements to documentation to make it less likely that others will run into issues (if relevant).
* Add the change to the Unreleased section of [CHANGES.md](CHANGES.md)

## Pull requests for features

If possible provide:

* Code that implements the new feature
* Tests to cover the new feature including all of the code paths
* Docstrings for functions
* Documentation examples
* Add the change to the Unreleased section of [CHANGES.md](CHANGES.md)

## Pull requests for docs

* Make your documentation changes
* (Optional) Install doctoc with `npm install -g doctoc`
* (Optional) Regenerate the docs TOC with `bin/doctoc.sh` or `bin/doctoc.bat` depending on your OS
