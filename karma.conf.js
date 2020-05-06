module.exports = function (config) {
  var root = 'run/compiled/karma/test' // same as :output-dir
  var junitOutputDir = process.env.CIRCLE_TEST_REPORTS || "run/compiled/karma/test/junit"
  if (process.env.CANARY_CLOJURESCRIPT_VERSION !== undefined) {
      var browsers = ['PhantomJS']
  } else {
      var browsers = ['ChromeHeadless']
  }

  config.set({
    frameworks: ['cljs-test'],
    browsers: browsers,
    basePath: './',
    files: [
      root + '/test.js'
    ],
    plugins: [
        'karma-cljs-test',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-junit-reporter'
    ],
    colors: true,
    logLevel: config.LOG_INFO,
    client: {
      args: ['shadow.test.karma.init'],
      singleRun: true
    },

    // the default configuration
    junitReporter: {
      outputDir: junitOutputDir + '/karma', // results will be saved as outputDir/browserName.xml
      outputFile: undefined, // if included, results will be saved as outputDir/browserName/outputFile
      suite: '' // suite will become the package name attribute in xml testsuite element
    }
  })
}
