var mdeps = require('../');
var test = require('tape');

var pkg = require('./pkg/package.json');
pkg.__dirname = __dirname + '/pkg';

test('pkg', function (t) {
    t.plan(1);
    
    var d = mdeps();
    d.on('package', function (pkg_) {
        t.deepEqual(pkg_, pkg);
    });
    d.end(__dirname + '/pkg/main.js');
    d.resume();
});
