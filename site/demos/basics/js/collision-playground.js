function Collider() {
  this.balls = [];
}

Collider.prototype.addBall = function(ball) {
  this.balls.push(ball);
}

Collider.prototype.checkCollision = function() {
  for (var i = 0; i < this.balls.length; i++) {
    for (var j = i + 1; j < this.balls.length; j++) {
      var b1 = this.balls[i];
      var b2 = this.balls[j];
      var distance = Math.sqrt(Math.pow(b2.x - b1.x, 2) + Math.pow(b2.y - b1.y, 2));
      if (distance < 60) {
        b1.el.classList.add('colliding');
        b2.el.classList.add('colliding');
      }
    }
  }
};

function Ball(stage) {
  this.stage = stage;
  this.el = document.createElement('div');
  this.el.classList.add('ball');
  this.stage.appendChild(this.el);

  this.x = (Math.random() * window.innerWidth) | 0;
  this.y = (Math.random() * window.innerHeight) | 0;

  this.vx = (Math.random() * 200) | 0;
  this.vy = (Math.random() * 200) | 0;
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
  if (this.y > window.innerWidth - 60) {
    this.y = window.innerWidth - 60;
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
  this.collider = new Collider();

  this.balls = [];
  document.body.addEventListener('click', this.addBall.bind(this));

  this.lastTick = Date.now();
  this.tick();
}

Game.prototype.addBall = function() {
  var ball = new Ball(this.stage)
  this.balls.push(ball);
  this.collider.addBall(ball);
}

Game.prototype.tick = function() {
  var now = Date.now();
  var delta = now - this.lastTick;
  this.lastTick = now;
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(delta);
  }

  this.collider.checkCollision();
  requestAnimationFrame(this.tick.bind(this));
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
