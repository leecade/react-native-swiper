(function () {
  var extend = rebound.util.extend;
  var bind = rebound.util.bind;
  var onFrame = rebound.util.onFrame;

  var Cascade = function(onEndListener) {
    this.springSystem = new rebound.SpringSystem(new rebound.SimulationLooper());
    this.spring = this.springSystem.createSpring(40, 4);
    this.spring.setRestSpeedThreshold = 0.5;
    this.spring.setRestDisplacementThreshold = 0.5;
    this.frames = [];
    this.players = [];
    this.currentFrame = 0;
    this.recordSpring(1);
    this.onEndListener = onEndListener;
    this._boundFrameCallback = bind(this.renderFrame, this);
  };

  extend(Cascade.prototype, {
    reset: function() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].frame = 0;
      }
      this.currentFrame = 0;
      return this;
    },

    recordSpring: function(pos) {
      this.start = this.spring.getCurrentValue();
      this.end = pos;
      this.frames = [];
      this.spring.addListener(this);
      this.spring.setEndValue(pos);
      this.spring.removeListener(this);
      return this;
    },

    onSpringUpdate: function(spring) {
      this.frames.push(spring.getCurrentValue())
    },

    addPlayer: function(fn) {
      this.players.push({frame: 0, fn: fn, pos: this.players.length});
    },

    play: function() {
      if (this.playing) {
        return;
      }
      this.reset();
      if (this.didPlayOnce) {

        var target = this.spring.getEndValue() === 1 ? 0 : 1;
        this.spring.setOvershootClampingEnabled(target === 1 ? false : true);
        this.recordSpring(target);
        this.players = this.players.reverse();
      }
      this.didPlayOnce = true;
      this.playing = true;
      this._boundFrameCallback();
    },

    renderFrame: function() {
      var toPlay = [];
      for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        if (player.frame < this.frames.length && i <= this.currentFrame) {
          toPlay.push(player);
        }
      }

      if (toPlay.length > 0) {
        for (var j = 0; j < toPlay.length; j++) {
          var _p = toPlay[j];
          var _frame = this.frames[_p.frame]
          _p.fn(
            _p.pos,
            _p.frame,
            _frame,
            this.start,
            this.end);
          _p.frame++;
        }
        this.currentFrame++;
        onFrame(this._boundFrameCallback);
      } else {
        this.playing = false;
        this.onEndListener && this.onEndListener();
      }
    }
  });


  var doit = function() {
    var container = document.getElementById('cascadeEffectExample');

    var button = document.createElement('button');
    button.innerHTML = 'Transition In';
    var movingIn = true;
    button.addEventListener('click', function() {
      button.disabled = true;
      cascade.play();
    });
    container.appendChild(button);

    var secondContainer = document.createElement('div');
    secondContainer.className = 'secondContainer';
    container.appendChild(secondContainer);

    var cascade = new Cascade(function() {
      button.disabled = false;
      if (movingIn) {
        button.innerHTML = 'Transition Out';
        movingIn = false;
      } else {
        button.innerHTML = 'Transition In';
        movingIn = true;
      }
    });

    for (var i = 0; i < 10; i++) {
      var div = document.createElement('div');
      div.className = 'cascadeRow'
      div.innerHTML = 'row ' + (i+1);
      div.style.opacity = 0;

      var r = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 9, 203, 255));
      var g = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 9, 17, 210));
      var b = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 9, 231, 0));
      div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

      container.appendChild(div);

      cascade.addPlayer(
        (function(div) {
          var clamped = false;
          var lastEnd;
          return function(idx, frame, val, start, end) {

            if (lastEnd !== end) {
              clamped = false;
            }

            var x = rebound.MathUtil.mapValueInRange(val, 0, 1, -200, 0);
            xlat(div, x, 0);
            if ((end > start && val > end) || (end < start && val < end) || clamped) {
              val = end;
              clamped = true;
            }

            div.style.opacity = val * 0.75;
            lastEnd = end;

          };
        })(div)
      );
    }

    for (var i = 0; i < 117; i++) {
      var div = document.createElement('div');
      div.className = 'dot'
      div.style.opacity = 0;
      secondContainer.appendChild(div);

      var r = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 117, 17, 0));
      var g = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 117, 148, 204));
      var b = Math.floor(rebound.MathUtil.mapValueInRange(i, 0, 117, 231, 0));
      div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

      cascade.addPlayer(
        (function(div) {
          var clamped = false;
          var lastEnd;
          return function(idx, frame, val, start, end) {

            if (lastEnd !== end) {
              clamped = false;
            }

            var y = rebound.MathUtil.mapValueInRange(val, 0, 1, 0, 0);
            var x = rebound.MathUtil.mapValueInRange(val, 0, 1, 100, 0);
            var rot = rebound.MathUtil.mapValueInRange(val, 0, 1, 190, 0);
            var scale = rebound.MathUtil.mapValueInRange(val, 0, 1, 0, 1);

            if ((end > start && val > end) || (end < start && val < end) || clamped) {
              val = end;
              clamped = true;
            }

            div.style.opacity = val * 0.5;
            xfrm(div, x, y, scale, rot);

            lastEnd = end;

          };
        })(div)
      );
    }

    setTimeout(function () {
      if (cascade.playing) {
        return;
      }
      button.disabled = true;
      cascade.play();
    }, 1000)
  };

  document.addEventListener('DOMContentLoaded', doit);
})();
