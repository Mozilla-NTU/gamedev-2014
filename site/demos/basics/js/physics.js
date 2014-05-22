var TABLE_Y = window.innerHeight - 100;

function Ball(stage, x, y) {
  this.stage = stage;
  this.el = document.createElement('div');
  this.el.classList.add('soccer');
  this.stage.appendChild(this.el);
  this.x = x;
  this.y = y;

  this.vx = 200; // pixels per second
  this.vy = 0;

  this.gravity = 1000; // pixels per second squared
}

Ball.prototype.update = function (delta) {
  this.x = this.x + (this.vx * (delta / 1000));
  this.el.style.left = this.x + 'px';

  this.vy = this.vy + (this.gravity * (delta / 1000));
  this.y = this.y + (this.vy * (delta / 1000));

  if (this.y > TABLE_Y) {
    this.y = TABLE_Y;
    this.vy = -(this.vy / 1.2);
  }

  this.el.style.top = this.y + 'px';
}

function Game(stage) {
  this.stage = stage;
  this.stage.classList.add('field');
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
