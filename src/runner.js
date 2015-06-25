var webpage = require('webpage');
var page = webpage.create();
var system = require('system');

var failures = [];
var testUrl = 'http://localhost:8000/tests/output/sql/index.html';

function runInIsolation(failure) {
    var page = webpage.create();
    var title = failure[1].title;

    page.onConsoleMessage = function(msg) {
        if (msg.charAt(0) === "[") {
            msg = JSON.parse(msg);
            //console.log(msg[0]);
            if (msg[0] === "pass") {
                system.stdout.write('.');
            } else if (msg[0] === "fail") {
                system.stdout.write('F');
                console.log(JSON.stringify(msg));
            }
        }
    };

    console.log("retrying: " + title);
    page.open(testUrl + "&grep=" + title, function(status) {
        console.log("Status: " + status);
    });
}

page.onConsoleMessage = function(msg) {
    if (msg.charAt(0) === "[") {
        msg = JSON.parse(msg);

        if (msg[0] === "pass") {
            system.stdout.write('.');
        } else if (msg[0] === "fail") {
            system.stdout.write('F');
            failures.push(msg);
        } else if (msg[0] === "end") {
            console.log("");
            failures.forEach(function (failure) {
                console.log(JSON.stringify(failure));
            });
            //failures.forEach(runInIsolation);
            phantom.exit(failures.length);
        }
    }
};

page.open(testUrl, function(status) {
    console.log("Status: " + status);
});
