(function(exports) {
  'use strict';

  function Cloud(stage, type) {
    this.stage = stage;
    this.actor = document.createElement('div');
    this.actor.classList.add('cloud');
    this.stage.appendChild(this.actor);

    type = type || 'large';
    switch(type) {
      case 'small':
        this.speed = 0.06;
        this.width = 130;
        this.height = 47;
        this.actor.classList.add('small');
        break;
      case 'med':
        this.speed = 0.02;
        this.width = 200;
        this.height = 171;
        this.actor.classList.add('med');
        break;
      case 'large':
      default:
        this.speed = 0.04;
        this.width = 170;
        this.height = 100;
        this.actor.classList.add('large');
        break;
    }

    this.setStartingPosition(utils.getRandomInt(20, 680));
    this.actor.addEventListener('transitionend',
      this.setStartingPosition.bind(this, Game.width + ~~(this.width/2)));
  }

  Cloud.prototype.setStartingPosition = function(x) {
    this.actor.style.top = utils.getRandomInt(10, 300) + 'px';
    this.actor.style.transitionDuration = '0ms';
    this.actor.style.transform = 'translateX(' + x + 'px)';

    setTimeout(function() {
      var pixelsToTravel = x + this.width;
      var duration = ~~( (pixelsToTravel) / this.speed);
      this.actor.style.transitionDuration = duration + 'ms';
      this.actor.style.transform = 'translateX(-' + this.width + 'px)';
    }.bind(this), 200);
  };

  exports.Cloud = Cloud;
})(this);
