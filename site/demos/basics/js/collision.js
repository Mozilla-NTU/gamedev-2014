function Collider() {
  this.balls = [];
}

Collider.prototype.addBall = function(ball) {
  this.balls.push(ball);
}

function Ball(stage) {
  this.stage = stage;
  this.el = document.createElement('div');
  this.el.classList.add('ball');
  this.stage.appendChild(this.el);

  this.x = (Math.random() * window.innerWidth) | 0;
  this.y = (Math.random() * window.innerHeight) | 0;

  this.vx = -200 + (Math.random() * 400) | 0;
  this.vy = -200 + (Math.random() * 400) | 0;
}

Ball.prototype.update = function (delta) {
  this.x += (this.vx * delta) / 1000;
  if (this.x > window.innerWidth - 60) {
    this.x =  window.innerWidth - 60;
    this.vx = -this.vx;
  } else if (this.x < 0) {
    this.x = 0;
    this.vx = -this.vx;
  }
  this.y += (this.vy * delta) / 1000;
  if (this.y > window.innerWidth - 120) {
    this.y = window.innerWidth - 120;
    this.vy = -this.vy;
  } else if (this.y < 0) {
    this.y = 0;
    this.vy = -this.vy;
  }
  this.el.style.left = this.x + 'px';
  this.el.style.top = this.y + 'px';
}

function Game(stage) {
  this.stage = stage;

  this.balls = [];
  document.body.addEventListener('click', this.addBall.bind(this));

  this.lastTick = Date.now();
  this.tick();
}

Game.prototype.addBall = function() {
  this.balls.push(new Ball(this.stage));
}

Game.prototype.tick = function() {
  var now = Date.now();
  var delta = now - this.lastTick;
  this.lastTick = now;
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(delta);
  }
  requestAnimationFrame(this.tick.bind(this));
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
