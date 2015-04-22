var mdeps = require('../');
var test = require('tape');
var JSONStream = require('JSONStream');
var packer = require('browser-pack');

test('transform', function (t) {
    t.plan(3);
    var p = mdeps({
        transform: [ './tr_a.js', './tr_b.js' ],
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end(__dirname + '/files/tr_sh/main.js');
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('t', src)(t);
    });
});
