(function(exports) {
  'use strict';

  function ImageLoader(imagePaths) {
    this.paths = {}; // image path dictionary
    this.images = {}; // image element dictionary
    this.count = 0;

    for (var name in imagePaths) {
      this.add(name, imagePaths[name]);
    }
  }

  ImageLoader.prototype.add = function(name, path) {
    this.paths[name] = path;
    ++this.count;
  };

  ImageLoader.prototype.load = function(name, callback) {
    var image = new Image();
    image.onload = callback;
    image.src = this.paths[name];
    return image;
  };

  ImageLoader.prototype.loadAll = function(callback) {
    var loadedCount = 0;

    var callbackWhenAllLoaded = function() {
      if (++loadedCount === this.count) {
        callback && callback();
      }
    }.bind(this);

    for (var name in this.paths) {
      this.images[name] = this.load(name, callbackWhenAllLoaded);
    }
  };

  ImageLoader.prototype.get = function(name) {
    return this.images[name];
  };

  exports.ImageLoader = ImageLoader;
}(this));
