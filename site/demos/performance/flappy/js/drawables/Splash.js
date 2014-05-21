(function(exports) {
  'use strict';

  function Splash(stage) {
    this.stage = stage;
    this.actor = document.createElement('div');
    this.actor.classList.add('splash');
    this.stage.appendChild(this.actor);
    this.actor.addEventListener('transitionend', this.reset.bind(this));

    this.height = this.actor.style.height;
    this.wdith = this.actor.style.width;
  }

  Splash.prototype.play = function(y, x, finalX, speed) {
    this.actor.style.left = x + 'px';
    this.actor.style.top = y + 'px';
    this.distance = x - finalX;
    this.duration = ~~(this.distance / speed);
    this.actor.style.transitionDuration = this.duration + 'ms';
    this.actor.style.transform = 'translateX(-' + this.distance + 'px)';
  };

  Splash.prototype.reset = function() {
    this.actor.style.top = 0;
    this.actor.style.left = -this.width;
    this.actor.style.transitionDuration = '0ms';
    this.actor.style.transform = 'translate(0px, 0px)';
  };


  exports.Splash = Splash;
})(this);
