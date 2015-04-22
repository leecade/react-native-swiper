var rebound = require('../rebound');

describe('SpringSystem', function() {
  var springSystem;

  beforeEach(function() {
    springSystem = new rebound.SpringSystem(new rebound.SimulationLooper());
    spyOn(springSystem, 'registerSpring').andCallThrough();
    spyOn(springSystem, 'activateSpring').andCallThrough();
  });

  it('creates springs and maintains a registry of springs', function() {
    var spring = springSystem.createSpring();
    expect(springSystem.getAllSprings().length).toBe(1);
    expect(springSystem.registerSpring).toHaveBeenCalledWith(spring);
  })

  it('starts out idle', function() {
    var spring = springSystem.createSpring();
    expect(springSystem.getIsIdle()).toBe(true);
  });

  it('activates when a spring is moved', function() {
    var spring = springSystem.createSpring();
    expect(springSystem.getIsIdle()).toBe(true);
    spring.setEndValue(1);
    expect(springSystem.activateSpring).toHaveBeenCalledWith(spring.getId());
  });

  it('can have listeners', function() {
    var dummyListener = {};
    springSystem.addListener(dummyListener);
    expect(springSystem.listeners.length).toBe(1);
    springSystem.removeListener(dummyListener);
    expect(springSystem.listeners.length).toBe(0);
    springSystem.addListener({});
    springSystem.addListener({});
    springSystem.addListener({});
    springSystem.addListener({});
    expect(springSystem.listeners.length).toBe(4);
    springSystem.removeAllListeners();
    expect(springSystem.listeners.length).toBe(0);
  });

  it('should call its listeners on each frame of the animation', function() {
    var looper = new rebound.SteppingSimulationLooper();
    var timestep = 16.667;
    var listener = {
      onBeforeIntegrate: function() {},
      onAfterIntegrate: function() {},
    };
    spyOn(listener, 'onBeforeIntegrate');
    spyOn(listener, 'onAfterIntegrate');

    springSystem.setLooper(looper);
    springSystem.addListener(listener);
    var spring = springSystem.createSpring();
    spring.setEndValue(1);
    looper.step(timestep);
    expect(listener.onBeforeIntegrate).toHaveBeenCalledWith(springSystem);
    expect(listener.onAfterIntegrate).toHaveBeenCalledWith(springSystem);
  });

});

describe('Spring', function() {
  var springSystem, spring;
  beforeEach(function() {
    springSystem = new rebound.SpringSystem(new rebound.SimulationLooper());
    spring = springSystem.createSpring();
  });

  it('is created at rest', function() {
    expect(spring.isAtRest()).toBe(true);
    expect(spring.getCurrentValue()).toBe(0);
    expect(spring.getEndValue()).toBe(0);
    expect(spring.getVelocity()).toBe(0);
  });

  it('can have listeners', function() {
    var dummyListener = {};
    spring.addListener(dummyListener);
    expect(spring.listeners.length).toBe(1);
    spring.removeListener(dummyListener);
    expect(spring.listeners.length).toBe(0);
    spring.addListener({});
    spring.addListener({});
    spring.addListener({});
    spring.addListener({});
    expect(spring.listeners.length).toBe(4);
    spring.removeAllListeners();
    expect(spring.listeners.length).toBe(0);
  });

  it('performs the expected numerical integration', function() {
    var expectedValues = [
      0.00009528483384916665, 0.028055130517962948, 0.09762221624500955, 0.19049729510981317,
      0.2936714067404636, 0.40497286144544664, 0.5111546203653615, 0.608094950748042,
      0.6989512644000222, 0.7763987794431019, 0.8407054339615845, 0.8958918579042241,
      0.9389972480971012, 0.9717337781699595, 0.9971592132059878, 1.0147625813663106,
      1.0262208257725207, 1.0332956493268395, 1.0364894607275925, 1.0369398983555251,
      1.035403885129236, 1.032578591121358, 1.0290563359258007, 1.0250064291810552,
      1.0209746156852837, 1.017177199769159, 1.01352576938495, 1.0103417579447809,
      1.0076425888100107, 1.0052779569597994, 1.0033901510059924, 1.0019218958288727,
      1.0007486041427742, 0.9999054758294816, 0.9993272477227115, 0.9989374541332141,
      0.9987229619135461, 0.9986362506581137, 0.9986416423402271, 0.9987133189462081,
      0.9988248788496944, 0.9989660543527678, 0.9991147367563946, 0.999260176669424,
      0.9994041755139224, 0.9995328710495801, 0.9996443410389881, 0.9997440186579756,
      0.9998252721214403, 0.9998898549593689, 0.9999427545081083, 0.9999819409115459,
      1.0000098947929037, 1
    ];

    var expectedVelocities = [
      0.22809713393833664, 3.1836279556537797, 5.189693552210269, 6.308133231261666,
      6.777680072142652, 6.779820703245073, 6.4423806169966324, 5.8988969764596115,
      5.2027207222858145, 4.464480016354999, 3.739124457374943, 3.0186340411984003,
      2.3728782790346234, 1.812176854322289, 1.3096658169399373, 0.8990634713436961,
      0.5719079083707492, 0.30321776183243665, 0.10352766527348324, -0.039503489141740795,
      -0.1423507144869582, -0.2058607850785233, -0.23984623785015569, -0.2526432950540898,
      -0.24879364530323395, -0.23414513023207698, -0.2115811308267352, -0.185501057593562,
      -0.15853434660787047, -0.13076036811539526, -0.10514546934610718, -0.08237222075625747,
      -0.06151931327812765, -0.0441214723178374, -0.029969085071624765, -0.018082334323351185,
      -0.009015079581744903, -0.0023131392365830466, 0.0027155555738820987, 0.00603264077492341,
      0.00803456840095728, 0.009095655645431211, 0.009368949074455861, 0.009106122079028167,
      0.008453224982293001, 0.007581738755800811, 0.006613800148558283, 0.005570115988782897,
      0.004574621636742495, 0.003665965171462857, 0.002814740532247959, 0.0020893441663066958,
      0.0014872204418175175, 0
    ];

    var actualValues = [], actualVelocities = [];

    var listener = {
      onSpringUpdate: function() {
        actualValues.push(spring.getCurrentValue());
        actualVelocities.push(spring.getVelocity());
      }
    };

    spyOn(listener, 'onSpringUpdate').andCallThrough();
    spring.addListener(listener);
    spring.setEndValue(1);
    expect(actualValues).toEqual(expectedValues);
    expect(actualVelocities).toEqual(expectedVelocities);
  });

  it('should not oscillate if overshoot clamping is enabled', function() {
    var actualValues = [];
    var listener = {
      onSpringUpdate: function() {
        actualValues.push(spring.getCurrentValue());
      }
    };

    spyOn(listener, 'onSpringUpdate').andCallThrough();
    spring.addListener(listener);
    spring.setOvershootClampingEnabled(true);
    spring.setEndValue(1);

    var didOscillate = false;
    var priorValue = -1;
    for (var i = 0; i < actualValues.length; i++) {
      var currentValue = actualValues[i];
      if (currentValue < priorValue) {
        didOscillate = true;
        break;
      }
      priorValue = currentValue;
    }

    expect(didOscillate).toBe(false);
  })

  it('should not oscillate if the spring has 0 tension', function() {
    var actualValues = [];
    var listener = {
      onSpringUpdate: function() {
        actualValues.push(spring.getCurrentValue());
      }
    };

    spyOn(listener, 'onSpringUpdate').andCallThrough();
    spring.addListener(listener);
    spring.setSpringConfig(rebound.SpringConfig.coastingConfigWithOrigamiFriction(7));
    spring.setVelocity(1000);

    var didOscillate = false;
    var priorValue = -1;
    for (var i = 0; i < actualValues.length; i++) {
      var currentValue = actualValues[i];
      if (currentValue < priorValue) {
        didOscillate = true;
        break;
      }
      priorValue = currentValue;
    }

    expect(didOscillate).toBe(false);
  });

  it('should be at rest after calling setCurrentValue', function() {
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring();
    spring.setEndValue(1);
    spring.setCurrentValue(-1);
    expect(spring.isAtRest()).toBe(true);
    expect(spring.getCurrentValue()).toBe(-1);
    expect(spring.getEndValue()).toBe(-1);
  });

  it('should not be at rest if the skipSetAtRest parameter is passed to setCurrentValue while moving', function() {
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring();
    spring.setEndValue(1);
    spring.setCurrentValue(-1, true);
    expect(spring.isAtRest()).toBe(false);
    expect(spring.getCurrentValue()).toBe(-1);
    expect(spring.getEndValue()).toBe(1);
  })
});

describe('Rebound Utilities', function() {
  it('should interpolate numbers in ranges', function() {
    var val = rebound.util.mapValueInRange(150, 100, 200, 0, -300);
    expect(val).toBe(-150);
  });

  it('should convert degrees to radians', function() {
    var val = rebound.util.degreesToRadians(57.29577951308232);
    expect(val).toEqual(1);
  });

  it('should convert radian to degrees', function() {
    var val = rebound.util.radiansToDegrees(1);
    expect(val).toBe(57.29577951308232);
  });

  it('should interpolate hex colors', function() {
    var middleColor = rebound.util.interpolateColor(0.5, '#ff0000', '#0000ff');
    expect(middleColor).toBe('#7f007f');
  });

  it('should interpolate hex colors with an optional input range', function() {
    var middleColor = rebound.util.interpolateColor(100, '#ff0000', '#0000ff', 0, 200);
    expect(middleColor).toBe('#7f007f');
  });

  it('should interpolate hex colors with an optional rgb return value', function() {
    var middleColor = rebound.util.interpolateColor(0.5, '#ff0000', '#0000ff', 0, 1, true);
    expect(middleColor).toBe('rgb(127,0,127)');
  });

  it('should call functions async with onFrame', function() {
    // checks for setImmediate in node
    var called = false;
    var next = function() {
      called = true;
    }
    runs(function() {
      rebound.util.onFrame(next);
    });
    waitsFor(function() {
      return called;
    }, 'next not called', 10);
    runs(function() {
      expect(called).toBe(true);
    });
  })
});

