# Contributing to re-frame

Thank you for taking the time to contribute!

## Support questions

The Github issues are for bug reports and feature requests only. Support requests and usage
questions should go to the re-frame [Clojure Slack channel](http://clojurians.net) or
the [ClojureScript mailing list](https://groups.google.com/forum/#!forum/clojurescript).

## Pull requests

**Create pull requests to the master branch.**

## Running tests

To run the tests, you must have recent versions of node, npm and Leiningen.

To build the tests and run them in one step via karma, just:
```sh
npm install -g karma-cli
lein ci 
```

You can also get auto compiles via:
```sh
lein watch
```
then open [http://localhost:3449/](http://localhost:3449/) in a browser for an auto-reloaded browser-based test runner.

## Pull requests for bugs

If possible provide:

* Code that fixes the bug
* Failing tests which pass with the new changes
* Improvements to documentation to make it less likely that others will run into issues (if relevant).
* Add the change to the Unreleased section of [CHANGELOG.md](docs/CHANGELOG.md)

## Pull requests for features

If possible provide:

* Code that implements the new feature
* Tests to cover the new feature including all of the code paths
* Docstrings for functions
* Documentation examples
* Add the change to the Unreleased section of [CHANGELOG.md](docs/CHANGELOG.md)

## Pull requests for docs

Please see the [docs/README.md](docs/README.md)

