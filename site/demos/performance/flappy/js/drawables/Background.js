(function(exports) {
  function Background(stage) {
    this.stage = stage;
    this.actor = document.getElementById('background');
    //setTimeout(function() {
    //  this.actor.classList.add('go');
    //}.bind(this), 200);

    //this.actor.addEventListener('transitionend', function() {
    //  this.actor.classList.toggle('go');
    //}.bind(this));
    //Drawable.call(this, ctx, image, width, height, x, y);
    //this.speed = -.02; // pixels per milisecond
    //this.lastX = this.x;
    //this.dirty = false;
  }

  Background.prototype = Object.create(Drawable.prototype);

  Background.prototype.update = function(delta, deltaAll) {
    this.x = Math.floor(deltaAll * this.speed) % this.width;
    if (this.x !== this.lastX) {
      this.dirty = true;
    }
    this.lastX = this.x;
  };

  Background.prototype.draw = function() {
    if (this.dirty) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
      this.dirty = false;
    }
  }

  exports.Background = Background;
})(this);
