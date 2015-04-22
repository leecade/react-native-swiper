var example1 = function() {
  var springSystem = new rebound.SpringSystem();
  var spring = createSpring(springSystem, 40, 3);
  var springConfig = spring.getSpringConfig();
  var photo = document.getElementById('example-photo');
  spring.addListener({
    el: null,
    onSpringUpdate: function(spring) {
      this.el = this.el || photo;
      var val = spring.getCurrentValue();
      val = mapValueFromRangeToRange(val, 0, -1, 1, 0.5);
      scale(this.el, val);
    }
  });

  var scalingExample = document.getElementById('scaling-example');

  var canvas = document.getElementById('graph-canvas');
  var ctx = canvas.getContext('2d');
  var graphScale = 80;

  var graphingSpringSystemListener = new GraphingSpringSystemListener()

  drawGridLines(canvas, ctx, graphScale);

  var time = 0;

  function GraphingSpringSystemListener() {
    this.height = canvas.height;
    this.width = canvas.width;
    this.lastTime = 0;
  };

  extend(GraphingSpringSystemListener.prototype, {
    onBeforeIntegrate: function() {
    },

    onAfterIntegrate: function() {
      time+=3;
      this.graphSpring(spring, 'black');

      if (time >= 600) {
        ctx.moveTo(0, canvas.height / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGridLines(canvas, ctx, graphScale);
        time = 0;
        graphingSpringSystemListener.lastTime = time;
        done = true;
      }
      this.lastTime = time;
    },

    graphSpring: function(spring, color) {
      var x = time;
      var y = spring.getCurrentValue() * graphScale + this.height / 2;
      if (this.lastX > x) this.lastX = 1;
      ctx.beginPath();
      ctx.moveTo(this.lastTime, spring.lastY || this.height / 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
      spring.lastY = y;
    }
  });

  springSystem.addListener(graphingSpringSystemListener);

  photo.addEventListener(downEvt, function() {
    spring.setEndValue(-1);
  });

  document.body.addEventListener(upEvt, function() {
    spring.setEndValue(0);
  });

  var frictionControl = document.getElementById('friction');
  var frictionValue = document.getElementById('friction_value');
  var tensionControl = document.getElementById('tension');
  var tensionValue = document.getElementById('tension_value');


  var onFrictionChange = function() {
    springConfig.friction =
      rebound.OrigamiValueConverter.frictionFromOrigamiValue(frictionControl.value);
    frictionValue.innerHTML = frictionControl.value;
  };

  var onTensionChange = function() {
    springConfig.tension =
      rebound.OrigamiValueConverter.tensionFromOrigamiValue(tensionControl.value);
    tensionValue.innerHTML = tensionControl.value;
  };

  frictionControl.addEventListener('change', onFrictionChange);
  frictionControl.addEventListener('input', onFrictionChange);

  tensionControl.addEventListener('change', onTensionChange);
  tensionControl.addEventListener('input', onTensionChange);
};


document.addEventListener('DOMContentLoaded', example1);