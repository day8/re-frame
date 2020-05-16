#!/usr/bin/env bash

# This script uses lein to download the dependencies and build the classpath, then that
# classpath is passed into planck which will write out cache files of the required namespaces
# to the ./cljs-cache directory. This is because planck does not have any support for
# dependency resolution.

# Prime the local .m2 repository so that stdout of downloads will not be captured in the
# following CLASSPATH variable.
lein deps

CLASSPATH=`lein classpath`

planck --cache ./cljs-cache --classpath $CLASSPATH --init build-cljs-cache-for-lib-namespaces.cljs
