var Base = Mocha.reporters.Base;

function clean(test) {
    return {
        title: test.title,
        fullTitle: test.fullTitle(),
        duration: test.duration,
        error: test.err
    };
}

var jsonReporter = function(runner) {
    Base.call(this, runner);

    var self = this;
    var total = runner.total;

    runner.on('start', function() {
        console.log(JSON.stringify(['start', { total: total }]));
    });

    runner.on('pass', function(test) {
        console.log(JSON.stringify(['pass', clean(test)]));
    });

    runner.on('fail', function(test, err) {
        // TODO(jlfwong): Re-enable source map support.
        // See commit 87653f1d92d852cc9ebc1570b13a5a564ff5e237
        // test.err = SourceMap.applySourceMapToError(err);
        console.log(JSON.stringify(['fail', clean(test)]));
    });

    runner.on('end', function() {
        console.log(JSON.stringify(['end', self.stats]));
    });
};
