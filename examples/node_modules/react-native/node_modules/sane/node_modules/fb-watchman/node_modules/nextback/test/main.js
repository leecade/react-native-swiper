var nextback = require('../');
var should = require('should');
require('mocha');

describe('nextback', function() {
  it('should pass arguments correctly', function(done) {
    var fn = function(err, one, two) {
      should.not.exist(err);
      should.exist(one);
      should.exist(two);
      one.should.equal(1);
      two.should.equal(2);
      done();
    };
    nextback(fn)(null, 1, 2);
  });

  it('should run things in order', function(done) {
    var ran = false;

    var fn = function() {
      ran = true;
    };
    ran.should.equal(false);
    nextback(fn)();
    ran.should.equal(false);
    process.nextTick(function(){
      ran.should.equal(true);
      done();
    });
  });

  it('should run things in order with mutating state', function(done) {
    var o = {
      name: "todd"
    };

    var fn = function() {
      o.name.should.equal("jesse");
      done();
    };
    nextback(fn)(o);
    o.name = "jesse";
  });

  it('should run things with a given context', function(done) {
    var ctx = {
      hello: 'dude'
    };

    var fn = function(arg) {
      this.hello.should.equal('dude');
      arg.should.equal('dude');
      done();
    };

    nextback(fn).apply(ctx, ['dude']);
  });

});
