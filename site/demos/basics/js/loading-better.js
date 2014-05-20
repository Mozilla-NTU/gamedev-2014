function Game(stage) {
  this.stage = stage;
  this.progress = document.getElementById('progress');

  this.willLoad = 16;
  this.loadedCount = 0;
  this.images = [];

  this.loaded = false;
  document.body.addEventListener('click', this.loadImages.bind(this));
}

Game.prototype.loadImages = function() {
  if (this.loaded) {
    return;
  }
  this.loaded = true;
  this.loadNextImage();
}

Game.prototype.loadNextImage = function() {
  if (this.loadedCount === this.willLoad) {
    this.addImages();
    return;
  }
  var img = new Image();
  img.classList.add('loading');
  img.src = 'http://thecatapi.com/api/images/get?random=' + Math.random();
  this.images.push(img);

  img.onload = this.loadNextImage.bind(this);
  this.progress.style.width = (this.loadedCount / this.willLoad) * 100 + '%';
  this.loadedCount++;
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
