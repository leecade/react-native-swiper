var $module

/*
  var contextProto = this.context;
  while (contextProto = Object.getPrototypeOf(contextProto)) {
    completionGroups.push(Object.getOwnPropertyNames(contextProto));
  }
*/

function handle (data) {
  var idx      = data.idx
    , child    = data.child
    , method   = data.method
    , args     = data.args
    , callback = function () {
        var _args = Array.prototype.slice.call(arguments)
        if (_args[0] instanceof Error) {
          _args[0] = {
              '$error'  : '$error'
            , 'type'    : _args[0].constructor.name
            , 'message' : _args[0].message
            , 'stack'   : _args[0].stack
          }
        }
        process.send({ idx: idx, child: child, args: _args })
      }
    , exec

  if (method == null && typeof $module == 'function')
    exec = $module
  else if (typeof $module[method] == 'function')
    exec = $module[method]

  if (!exec)
    return console.error('NO SUCH METHOD:', method)

  exec.apply(null, args.concat([ callback ]))
}

process.on('message', function (data) {
  if (!$module) return $module = require(data.module)
  if (data == 'die') return process.exit(0)
  handle(data)
})