var assert = require('assert'),
    ReadableStream = require('stream').Readable,
    JSONStream = require('../');

var source = new ReadableStream(),
    dest = JSONStream(),
    chunks = [],
    endCalled = false;

var wantedChunks = [
  { a: 42 },
  { hello: 'world' }
];

dest.on('readable', function () {
  var chunk = dest.read();
  if (chunk) {
    chunks.push(chunk);
  }
});

dest.on('end', function () {
  endCalled = true;
});

process.on('exit', function () {
  assert.deepEqual(chunks, wantedChunks);
  assert(endCalled);
});

var source = new ReadableStream();
source._read = function () {
};
source.pipe(dest);
source.push('{"a": 4');
source.push('2}\nblah');
source.push('\n{"hello"');
source.push(': "world"}\n');
source.push(null);
