module.exports = function (config) {
    var root = 'run/compiled/test'; // same as :output-dir
    var junitOutputDir = process.env.CIRCLE_TEST_REPORTS || "run/compiled/test/junit";

    config.set({
        frameworks: ['cljs-test'],
        browsers: ['Chrome'],
        files: [
            root + '/../test.js', // same as :output-to
            {pattern: root + '/../test.js.map', included: false}
        ],

        client: {
            args: ['re_frame.test.runner.run']
        },

        // the default configuration
        junitReporter: {
            outputDir: junitOutputDir + '/karma', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        }
    })
};
