var expect = require('expect.js'),

    StackTraceParser = require('../lib/stacktrace-parser');

describe('StackTraceParser', function() {
  var data = {
    'Chrome & Chrome Mobile & Opera': [
      {
        from: "Error: with timeout\n    at http://errwischt.com/stack_traces/test:76:15\n    at wrapped (http://errwischt.com/bandage.js:51:25)",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 76,
            column: 15 },
          { file: 'http://errwischt.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 25 }
        ]
      },
      {
        from: "Error: with timeout and named func\n    at timeoutWithName (http://errwischt.com/stack_traces/test:83:15)\n    at wrapped (http://errwischt.com/bandage.js:51:25)",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: 15 },
          { file: 'http://errwischt.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 25 }
        ]
      },
      {
        from: "TypeError: Object # has no method 'objectBreakDown'\n    at HTMLDocument. (http://errwischt.com/stack_traces/test:91:19)\n    at l (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:24882)\n    at Object.c.fireWith [as resolveWith] (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:25702)\n    at Function.x.extend.ready (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:2900)\n    at HTMLDocument.S (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:553)",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: 'HTMLDocument.',
            lineNumber: 91,
            column: 19 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'l',
            lineNumber: 4,
            column: 24882 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'Object.c.fireWith [as resolveWith]',
            lineNumber: 4,
            column: 25702 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'Function.x.extend.ready',
            lineNumber: 4,
            column: 2900 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'HTMLDocument.S',
            lineNumber: 4,
            column: 553 }
        ]
      }
    ],
    'Firefox': [
      {
        from: "timeoutWithName@http://errwischt.com/stack_traces/test:83\nwrapped@http://errwischt.com/bandage.js:51",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: null },
          { file: 'http://errwischt.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: null }
        ]
      },
      {
        from: "@http://errwischt.com/stack_traces/test:76\nwrapped@http://errwischt.com/bandage.js:51",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 76,
            column: null },
          { file: 'http://errwischt.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: null }
        ]
      },
      {
        from: "@http://errwischt.com/stack_traces/test:97\nx.Callbacks/l@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4\nx.Callbacks/c.fireWith@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4\n.ready@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4\nS@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4",
        to: [
          { file: 'http://errwischt.com/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 97,
            column: null },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'x.Callbacks/l',
            lineNumber: 4,
            column: null },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'x.Callbacks/c.fireWith',
            lineNumber: 4,
            column: null },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: '.ready',
            lineNumber: 4,
            column: null },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'S',
            lineNumber: 4,
            column: null }
        ]
      }
    ],
    'Safari': [
      {
        from: "timeoutWithName@http://bandage.local:8181/stack_traces/test:83:55\nwrapped@http://bandage.local:8181/bandage.js:51:30",
        to: [ { file: 'http://bandage.local:8181/stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: 55 },
          { file: 'http://bandage.local:8181/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 30 } ]
      },
      {
        from: "http://bandage.local:8181/stack_traces/test:76:40\nwrapped@http://bandage.local:8181/bandage.js:51:30",
        to: [ { file: 'http://bandage.local:8181/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 76,
            column: 40 },
          { file: 'http://bandage.local:8181/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 30 } ]
      },
      {
        from: "http://bandage.local:8181/stack_traces/test:97:28\nl@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:24909\nfireWith@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:50440\nready@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:2933\nS@http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:580",
        to: [ { file: 'http://bandage.local:8181/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 97,
            column: 28 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'l',
            lineNumber: 4,
            column: 24909 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'fireWith',
            lineNumber: 4,
            column: 50440 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'ready',
            lineNumber: 4,
            column: 2933 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'S',
            lineNumber: 4,
            column: 580 } ]
      }
    ],
    'JavaScriptCore': [
      {
        from: "timeoutWithName@stack_traces/test:83:55\nwrapped@bandage.js:51:30",
        to: [ { file: 'stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: 55 },
          { file: 'bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 30 } ]
      },
      {
        from: "timeoutWithName@stack_traces/test:83:55\nwrapped@42start-with-number.js:51:30",
        to: [ { file: 'stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: 55 },
          { file: '42start-with-number.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 30 } ]
      }
    ],
    'Internet Explorer': [
      {
        from: "Error: with timeout and named func\n   at timeoutWithName (http://bandage.jaz-lounge.com/stack_traces/test:83:9)\n   at wrapped (http://bandage.jaz-lounge.com/bandage.js:51:13)",
        to: [ { file: 'http://bandage.jaz-lounge.com/stack_traces/test',
            methodName: 'timeoutWithName',
            lineNumber: 83,
            column: 9 },
          { file: 'http://bandage.jaz-lounge.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 13 } ]
      },
      {
        from: "Error: with timeout\n   at Anonymous function (http://bandage.jaz-lounge.com/stack_traces/test:76:9)\n   at wrapped (http://bandage.jaz-lounge.com/bandage.js:51:13)",
        to: [ { file: 'http://bandage.jaz-lounge.com/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 76,
            column: 9 },
          { file: 'http://bandage.jaz-lounge.com/bandage.js',
            methodName: 'wrapped',
            lineNumber: 51,
            column: 13 } ]
      },
      {
        from: "TypeError: Object doesn't support property or method 'objectBreakDown'\n   at Anonymous function (http://bandage.jaz-lounge.com/stack_traces/test:91:7)\n   at l (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:24874)\n   at fireWith (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:25638)\n   at ready (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:2898)\n   at S (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js:4:551)",
        to: [ { file: 'http://bandage.jaz-lounge.com/stack_traces/test',
            methodName: '<unknown>',
            lineNumber: 91,
            column: 7 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'l',
            lineNumber: 4,
            column: 24874 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'fireWith',
            lineNumber: 4,
            column: 25638 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'ready',
            lineNumber: 4,
            column: 2898 },
          { file: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
            methodName: 'S',
            lineNumber: 4,
            column: 551 } ]
      }
    ],
    'Node.js': [
      {
        from: "ReferenceError: test is not defined\n    at repl:1:2\n    at REPLServer.self.eval (repl.js:110:21)\n    at Interface.<anonymous> (repl.js:239:12)\n    at Interface.EventEmitter.emit (events.js:95:17)\n    at emitKey (readline.js:1095:12)",
        to: [ { file: 'repl',
            methodName: '<unknown>',
            lineNumber: 1,
            column: 2 },
          { file: 'repl.js',
            methodName: 'REPLServer.self.eval',
            lineNumber: 110,
            column: 21 },
          { file: 'repl.js',
            methodName: 'Interface.<anonymous>',
            lineNumber: 239,
            column: 12 },
          { file: 'events.js',
            methodName: 'Interface.EventEmitter.emit',
            lineNumber: 95,
            column: 17 },
          { file: 'readline.js',
            methodName: 'emitKey',
            lineNumber: 1095,
            column: 12 } ]
      },
      {
        from: "ReferenceError: breakDown is not defined\n    at null._onTimeout (repl:1:25)\n    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)",
        to: [ { file: 'repl',
            methodName: 'null._onTimeout',
            lineNumber: 1,
            column: 25 },
          { file: 'timers.js',
            methodName: 'Timer.listOnTimeout [as ontimeout]',
            lineNumber: 110,
            column: 15 } ]
      }
    ]
  };

  Object.keys(data).forEach(function(browser) {
    describe('can parse stack trace of ' + browser, function() {
      data[browser].forEach(function(browserData) {
        it(browserData.from, function() {
          var result = StackTraceParser.parse(browserData.from);
          expect(result.length).to.equal(browserData.to.length);
          expect(result).to.eql(browserData.to);
        });
      });
    });
  });
});
