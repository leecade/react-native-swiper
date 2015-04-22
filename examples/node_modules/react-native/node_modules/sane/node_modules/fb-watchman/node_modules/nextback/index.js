var tick = process.setImmediate || process.nextTick;

module.exports = function(callback){
  return function(){
    var self = this;
    var args = arguments;
    tick(function(){
      callback.apply(self, args);
    });
  };
};