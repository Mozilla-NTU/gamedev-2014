function Game(stage) {
  this.stage = stage;
  this.progress = document.getElementById('progress');

  this.willLoad = 16;
  this.loadedCount = 0;
  this.images = [];

  this.loaded = false;
  document.body.addEventListener('click', this.loadImages.bind(this));
}

Game.prototype.onLoadComplete = function() {
  this.loadedCount++;
  this.progress.style.width = (this.loadedCount / this.willLoad) * 100 + '%';
  if (this.loadedCount === this.willLoad) {
    this.addImages();
    return;
  }
}

Game.prototype.loadImages = function() {
  if (this.loaded) {
    return;
  }
  this.loaded = true;

  for (var i = 0; i < this.willLoad; i++) {
    var img = new Image();
    img.classList.add('loading');
    img.src = 'http://thecatapi.com/api/images/get?random=' + Math.random();
    this.images.push(img);
    img.onload = this.onLoadComplete.bind(this);
  }
};

Game.prototype.addImages = function() {
  this.stage.innerHTML = '';
  for (var i = 0; i < this.images.length; i++) {
    this.stage.appendChild(this.images[i]);
  }
};

window.addEventListener('DOMContentLoaded', function() {
  new Game(document.getElementById('stage'));
});
