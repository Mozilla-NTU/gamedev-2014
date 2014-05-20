function Bird() {
  Sprite.call(this, './img/birdie.png', {
    rows: 1,
    cols: 14,
    width: 183,
    height: 168,
    sampleRate: 5
  });
}

Bird.prototype = Object.create(Sprite.prototype);

function Game(canvas, fps) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.fps = new FPS(fps);

  this.lastTick = Date.now();
  this.tracker = 0;

  this.birds = [];
  document.body.addEventListener('click', this.addBird.bind(this));

  (function go() {
    this.tick();
    this.draw();
    requestAnimationFrame(go.bind(this));
  }.bind(this))();
}

Game.prototype.addBird = function() {
  for (var i = 0; i < this.canvas.width / 90 + 3; i++) {
    for (var j = 0; j < this.canvas.height / 82 + 5; j++) {
      setTimeout(function(i, j) {
        for (var k = 0; k < 10; k++) {
          var bird = new Bird();
          bird.x = -40 + i * 70;
          bird.y = -40 + j * 70;
          bird.scaleY = .5;
          bird.scaleX = .5;
          bird.play(0);
          this.birds.push(bird);
        }
      }.bind(this, i, j), (i * 100) + (j * (i * 100)));
    }
  }
  //console.log('adding birds');
  //var x = ~~(Math.random() * this.canvas.width);
  //var y = ~~(Math.random() * this.canvas.height);
  //for (var i=0; i < 100; i++) {
  //  var bird = new Bird();
  //  bird.x = x
  //  bird.y = y;
  //  bird.play(0);
  //  this.birds.push(bird);
  //}
};

Game.prototype.draw = function() {
  this.fps.update(this.delta);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (var i=0; i<this.birds.length; i++) {
    this.birds[i].draw(this.ctx);
  }
}

Game.prototype.tick = function() {
  var now = Date.now();
  this.delta = now - this.lastTick;
  this.lastTick = now;
  this.tracker += this.delta;
  while (this.tracker > 8) {
    for (var i=0; i<this.birds.length; i++) {
      this.birds[i].tick();
    }
    this.tracker -= 8;
  }
};

window.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('stage');
  var fps = document.getElementById('fps');
  new Game(canvas, fps);
});

