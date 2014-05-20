function Ball(stage, x, y) {
  this.stage = stage;
  this.el = document.createElement('div');
  this.el.classList.add('ball');
  this.stage.appendChild(this.el);
  this.x = x;
  this.y = y;
}

Ball.prototype.update = function (delta) {
  this.el.style.left = this.x + 'px';
  this.el.style.top = this.y + 'px';
}

function Game(stage) {
  this.stage = stage;
  this.ball = new Ball(this.stage, 10, 10);
  this.lastTick = Date.now();
  this.tick();
}

Game.prototype.tick = function() {
  var now = Date.now();
  var delta = now - this.lastTick;
  this.lastTick = now;
  this.ball.update(delta);
  requestAnimationFrame(this.tick.bind(this));
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
