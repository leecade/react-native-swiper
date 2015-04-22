var mdeps = require('../');
var test = require('tape');
var through = require('through2');

test(function (t) {
    var expected = [
        __dirname + '/dotdot/index.js',
        __dirname + '/dotdot/abc/index.js'
    ];
    t.plan(expected.length);
    
    var d = mdeps();
    d.end(__dirname + '/dotdot/abc/index.js');
    
    d.pipe(through.obj(function (row, enc, next) {
        t.deepEqual(row.file, expected.shift());
        next();
    }));
});
