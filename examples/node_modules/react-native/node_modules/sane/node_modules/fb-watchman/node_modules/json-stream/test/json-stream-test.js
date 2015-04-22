var assert = require('assert'),
    JSONStream = require('../');

function write(stream) {
  var writes = [];
  for (var i = 1; i < arguments.length; i++) {
    writes[i - 1] = arguments[i];
  }
  writes.forEach(function (write) {
    stream.write(write);
  });
  stream.end();
}

function expect(stream, events) {
  var chunks = [], endCalled = false;
  stream.on('readable', function () {
    var chunk = stream.read();
    if (chunk) {
      chunks.push(chunk);
    }
  });
  stream.on('end', function () {
    endCalled = true;
  });
  process.on('exit', function () {
    assert.deepEqual(chunks, events);
    assert(endCalled);
  });
}

var stream = JSONStream();
expect(stream, [ { a: 42 } ]);
write(stream, '{"a": 42}\n');

stream = JSONStream();
expect(stream, [ { a: 42 } ]);
write(stream, '{"a":', '42}\n');

stream = JSONStream();
expect(stream, [ { a: 42, b: 1337 } ]);
write(stream, '{"a":', '42', ',"b": 1337', '}\n');

stream = JSONStream();
expect(stream, [ { a: 42, b: 1337 }, { hello: 'world' } ]);
write(stream, '{"a":', '42', ',"b": 1337', '}\n{"hel', 'lo": "wor', 'ld"}\n');

stream = JSONStream();
expect(stream, [ { a: 42 }, { hello: 'world' } ]);
write(stream, '{"a":', '42}\n{ blah blah blah }\n{"hel', 'lo": "wor', 'ld"}\n');

stream = JSONStream();
expect(stream, [ { a: 42 }, { hello: 'world' } ]);
write(stream, '{"a":', '42}\n{ blah blah', 'blah }\n{"hel', 'lo": "wor', 'ld"}\n');

stream = JSONStream();
expect(stream, [ { å: '⇢ utf8!', b: 1337 } ]);
write(stream, '{"å": "⇢ utf8!", "b": 1337 }\n');

