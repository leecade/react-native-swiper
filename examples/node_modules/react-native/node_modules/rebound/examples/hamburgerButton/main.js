(function() {
  var hb = {};

  // import a couple of utils from rebound.
  var deg2rad = rebound.MathUtil.degreesToRadians;
  var mapVal = rebound.MathUtil.mapValueInRange;

  // HamburgerButton animates between a 3 bar menu icon and an X icon using a
  // Rebound spring to drive the animation. You can configure its container, size
  // and color.
  hb.HamburgerButton = function(container, size, color) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    // Configure all the styles and dimensions for the button.
    this.padding = size * 0.1;
    this.size = size - this.padding * 2;
    this.width = this.size;
    this.height = this.size;
    this.canvas.width = size;
    this.canvas.height = size;
    this.barHeight = this.size / 6;
    this.rotatedXlat = Math.sqrt((this.barHeight * this.barHeight) / 2);
    this.radius = this .size * 0.05;
    var ab = (this.width - this.rotatedXlat);
    this.rotatedWidth = Math.sqrt(ab * ab + ab * ab);
    this.color = color;

    // Clear out the target container.
    this.container = container;
    this.container.innerHTML = '';

    // Create our animation spring. Here you could also pass in a custom SpringConfig
    // if you wanted to get a more or less bouncy animation curve.
    this.springSystem = new rebound.SpringSystem();
    this.animationSpring = this.springSystem.createSpring();
    this.animationSpring.addListener(this);

    // Perform and initial render to the canvas and apend the example canvas to
    // the container.
    this.render();
    container.appendChild(this.canvas);
    this.canvas.addEventListener('click', bind(this.toggle, this));
  };

  extend(hb.HamburgerButton.prototype, {
    /**
     * Switch the spring between its open (0) and closed (1) states. This will
     * drive the spring to animate, which will trigger rendering of the component.
     */
    toggle: function() {
      if (this.animationSpring.getEndValue() === 1) {
        this.animationSpring.setEndValue(0);
      } else {
        this.animationSpring.setEndValue(1);
      }
    },

    /**
     * Listen to the spring and call render whenever it updates.
     */
    onSpringUpdate: function(spring) {
      this.render();
    },

    /**
     * This just draws a rounded rect with the configured corner radius and dimensions.
     */
    drawBar: function(width) {
      this.ctx.fillStyle = this.color;

      this.ctx.moveTo(0, 0);
      this.ctx.beginPath();
      this.ctx.moveTo(this.radius, 0);
      this.ctx.lineTo(width - this.radius, 0);
      this.ctx.quadraticCurveTo(width, 0, width, this.radius);
      this.ctx.lineTo(width, this.barHeight - this.radius);
      this.ctx.quadraticCurveTo(width, this.barHeight, width - this.radius, this.barHeight);
      this.ctx.lineTo(this.radius, this.barHeight);
      this.ctx.quadraticCurveTo(0, this.barHeight, 0, this.barHeight - this.radius);
      this.ctx.lineTo(0, this.radius);
      this.ctx.quadraticCurveTo(0, 0, this.radius, 0);
      this.ctx.closePath();
      this.ctx.fill();
    },

    /**
     * On every frame of the animation, render will draw the current state of
     * the animation based on interpolation of the springs value between 0 and 1.
     * Driving an animation off of a zero to one spring is a really simple way
     * to coordinate multiple transitions on a common animation spring.
     * `rebound.MathUtil.mapValueInRange` is helpful for converting numbers between
     * an input range and an output range.
     */
    render: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.save();
      this.ctx.translate(this.padding, this.padding);

        var xlatX, xlatY, rot, width;
        var pos = this.animationSpring.getCurrentValue();
        var val = this.animationSpring.getCurrentValue();

        xlatX = mapVal(val, 0, 1, 0, this.rotatedXlat);
        rot = mapVal(val, 0, 1, 0, 45);
        width = mapVal(val, 0, 1, this.width, this.rotatedWidth);

        // draw top bar
        this.ctx.save();
        this.ctx.translate(xlatX, 0);
        this.ctx.rotate(deg2rad(rot));
        this.drawBar(width);
        this.ctx.restore();

        // draw middle bar
        this.ctx.save();

        xlatX = mapVal(val, 0, 1, 0, this.width / 2);
        width = mapVal(val, 0, 1, this.width, 0);

        this.ctx.translate(xlatX, this.height / 2 - this.barHeight / 2);
        this.drawBar(width);
        this.ctx.restore();

        // draw bottom bar
        this.ctx.save();

        xlatY = mapVal(val, 0, 1, this.height - this.barHeight, this.height - this.rotatedXlat);
        rot = mapVal(val, 0, 1, 0, -45);
        width = mapVal(val, 0, 1, this.width, this.rotatedWidth);

        this.ctx.translate(0, xlatY);
        this.ctx.rotate(deg2rad(rot));
        this.drawBar(width);
        this.ctx.restore();

      this.ctx.restore();
    }
  });

  // Export the control.
  if (typeof exports != 'undefined') {
    extend(exports, hb);
  } else if (typeof window != 'undefined') {
    window.hamburgerButton = hb;
  }

  createHamburgerButtonExample = function(container, size, color, bgColor) {
    var ex = document.createElement('div');
    ex.className = 'example';
    container.appendChild(ex);
    ex.style.backgroundColor = bgColor;
    ex.style.opacity = 0.75;
    ex.style.marginTop = (size * -0.1) + 'px';
    new hamburgerButton.HamburgerButton(ex, size, color);
  };

  var doit = function() {
    var container = document.getElementById('hamburgerButtonExample');
    createHamburgerButtonExample(container, 200, '#1194e7');
    createHamburgerButtonExample(container, 100, '#00cc00');
    createHamburgerButtonExample(container, 50, '#cb11e7');
    createHamburgerButtonExample(container, 25, '#ffd200');
  };

  document.addEventListener('DOMContentLoaded', doit);
})();