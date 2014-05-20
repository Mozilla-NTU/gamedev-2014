function Particle(stage) {
  this.stage = stage;
  this.el = document.createElement('div');
  this.el.classList.add('particle');
  this.stage.appendChild(this.el);
}

Particle.prototype.emit = function() {
  var style = window.getComputedStyle(this.stage);
  var x = (Math.random() * style.width.substr(0, style.width.length -2)) | 0;
  this.el.style.left = x + 'px';
  this.el.classList.add('fall');
}

function Game(stage) {
  this.stage = stage;
  this.fps = new FPS(document.getElementById('fps'));

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
    var particle = new Particle(this.stage);
    if (!particle) {
      return;
    }
    particle.emit();
  }
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
