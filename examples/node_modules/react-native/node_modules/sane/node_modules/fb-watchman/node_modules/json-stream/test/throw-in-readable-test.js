var assert = require('assert'),
    JSONStream = require('../');

var stream = JSONStream();

stream.on('readable', function () {
  throw new Error('This should crash and burn.');
});

assert.throws(function () {
  stream.write('{"a":"b"}\n');
}, 'write with a throwing `readable` handler should throw');
