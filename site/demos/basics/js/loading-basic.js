function Game(stage) {
  this.stage = stage;

  this.loaded = false;
  document.body.addEventListener('click', this.addImages.bind(this));
}

Game.prototype.addImages = function() {
  if (this.loaded) {
    return;
  }
  this.loaded = true;
  this.stage.innerHTML = '';
  for (var i = 0; i < 16; i++) {
    var img = new Image();
    img.classList.add('loading');
    img.src = 'http://thecatapi.com/api/images/get?random=' + Math.random();
    this.stage.appendChild(img);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
