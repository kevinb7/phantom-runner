var path = require('path');
var childProcess = require('child_process');
var phantomjs = require("phantomjs");
var binPath = phantomjs.path;

var args = [path.join(__dirname, 'src', 'runner.js')];

childProcess.execFile(binPath, args, function(err, stdout, stderr) {
    if (err) {
        console.log('err');
    } else {
        console.log('success');
    }
});
