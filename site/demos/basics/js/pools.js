
function Pool(type, limit) {
  this.pool = [];
  for (var i = 0; i < limit; i++) {
    this.pool[i] = new type(stage, this);
  }
}

Pool.prototype.get = function() {
  var p = this.pool.pop();
  return p;
};

Pool.prototype.release = function(particle) {
  if (this.pool.indexOf(particle) !== -1) {
    return;
  }
  this.pool.push(particle);
};

function Particle(stage, pool) {
  this.stage = stage;
  this.pool = pool;
  this.el = document.createElement('div');
  this.el.classList.add('particle');
  this.stage.appendChild(this.el);
  this.el.addEventListener('transitionend', this.done.bind(this));
}

Particle.prototype.emit = function() {
  var style = window.getComputedStyle(this.stage);
  var x = (Math.random() * style.width.substr(0, style.width.length -2)) | 0;
  this.el.style.left = x + 'px';
  this.el.classList.add('fall');
}

Particle.prototype.done = function() {
  this.el.classList.remove('fall');
  this.pool.release(this);
};

function Game(stage) {
  this.stage = stage;
  this.fps = new FPS(document.getElementById('fps'));
  this.pool = new Pool(Particle, 500);

  setInterval(this.emitParticle.bind(this), 40);

  // fps
  this.lastUpdate = Date.now();
  (function go() {
    var now = Date.now();
    var delta = now - this.lastUpdate;
    this.lastUpdate = now;
    this.fps.update(delta);
    requestAnimationFrame(go.bind(this));
  }.bind(this))();
}

Game.prototype.emitParticle = function() {
  for (var i = 0; i < 10; i++) {
    var particle = this.pool.get();
    //var particle = new Particle(this.stage, this.pool);
    if (!particle) {
      return;
    }
    particle.emit();
  }
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
