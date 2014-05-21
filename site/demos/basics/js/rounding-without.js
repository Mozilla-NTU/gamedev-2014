function Collider() {
  this.balls = [];
}

Collider.prototype.addBall = function(ball) {
  this.balls.push(ball);
}

Collider.prototype.checkCollision = function() {
  return;
  for (var i = 0; i < this.balls.length; i++) {
    for (var j = i + 1; j < this.balls.length; j++) {
      var b1 = this.balls[i];
      var b1Center = b1.getCenter();
      var b2 = this.balls[j];
      var b2Center = b2.getCenter();
      var distance = Math.sqrt(Math.pow(b2Center.x - b1Center.x, 2) + Math.pow(b2Center.y - b1Center.y, 2));
      if (distance < b1.radius + b2.radius) {
        b1.vy = -b1.vy;
        b2.vy = -b2.vy;
        b1.vx = -b1.vx;
        b2.vx = -b2.vx;
      }
    }
  }
}

function Ball(stage, image) {
  this.stage = stage;
  this.image = image;

  this.diameter = 30;
  this.radius = this.diameter / 2;

  this.x = (Math.random() * window.innerWidth) | 0;
  this.y = (Math.random() * window.innerHeight) | 0;

  this.vx = -200 + (Math.random() * 400) | 0;
  this.vy = -200 + (Math.random() * 400) | 0;

  this.width = 48;
  this.height = 48;
}

Ball.prototype.getCenter = function () {
  return {
    x: this.x + this.radius,
    y: this.y + this.radius
  };
};

Ball.prototype.update = function (delta) {
  this.x += (this.vx * delta) / 1000;
  if (this.x > stage.width) {
    this.x = stage.width;
    this.vx = -this.vx;
  } else if (this.x < 0) {
    this.x = 0;
    this.vx = -this.vx;
  }
  this.y += (this.vy * delta) / 1000;
  if (this.y > stage.height) {
    this.y = stage.height;
    this.vy = -this.vy;
  } else if (this.y < 0) {
    this.y = 0;
    this.vy = -this.vy;
  }
}

Ball.prototype.draw = function(ctx) {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

function Game(stage) {
  this.stage = stage;
  this.ctx = this.stage.getContext('2d');
  this.collider = new Collider();
  this.fps = new FPS(document.getElementById('fps'));

  this.balls = [];
  this.loaded = false;
  this.ballImage = new Image();
  this.ballImage.onload = function() { this.loaded = true; }.bind(this);
  this.ballImage.src = './img/mushroom.png';
  for (var i = 1; i < 800; i++) {
    this.addBall();
  }

  this.lastTick = Date.now();
  this.tick();
}

Game.prototype.addBall = function() {
  var ball = new Ball(this.stage, this.ballImage);
  this.balls.push(ball);
  this.collider.addBall(ball);
}

Game.prototype.tick = function() {
  requestAnimationFrame(this.tick.bind(this));
  if (!this.loaded) {
    return;
  }
  var now = Date.now();
  var delta = now - this.lastTick;
  this.lastTick = now;
  this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(delta);
    this.balls[i].draw(this.ctx);
  }
  this.collider.checkCollision();
  this.fps.update(delta);
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
